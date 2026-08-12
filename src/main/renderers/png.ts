//---------------------------------------------------------------------
//
// PNG Renderer Extension for JavaScript QR Code Generator
//
// Copyright (c) 2026 Yuriy Apostol
// https://github.com/yuriyapostol
//
// Licensed under the MIT license:
//   http://www.opensource.org/licenses/mit-license.php
//
// 'QR Code' is a registered trademark of DENSO WAVE INCORPORATED.
//
//---------------------------------------------------------------------

import UPNG from '@upng/upng-js';

import { qrcode } from '../core/qrcode';

type RGBA = [number, number, number, number];

const escapeXml = function(s : string) {
  let escaped = '';
  for (let i = 0; i < s.length; i += 1) {
    const c = s.charAt(i);
    switch(c) {
    case '<': escaped += '&lt;'; break;
    case '>': escaped += '&gt;'; break;
    case '&': escaped += '&amp;'; break;
    case '"': escaped += '&quot;'; break;
    default : escaped += c; break;
    }
  }
  return escaped;
};

const encodeBase64 = function(bytes : Uint8Array) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let base64 = '';

  for (let i = 0; i < bytes.length; i += 3) {
    const byte0 = bytes[i];
    const hasByte1 = i + 1 < bytes.length;
    const hasByte2 = i + 2 < bytes.length;
    const byte1 = hasByte1 ? bytes[i + 1] : 0;
    const byte2 = hasByte2 ? bytes[i + 2] : 0;
    const chunk = (byte0 << 16) | (byte1 << 8) | byte2;

    base64 += chars.charAt((chunk >>> 18) & 0x3f);
    base64 += chars.charAt((chunk >>> 12) & 0x3f);
    base64 += hasByte1 ? chars.charAt((chunk >>> 6) & 0x3f) : '=';
    base64 += hasByte2 ? chars.charAt(chunk & 0x3f) : '=';
  }

  return base64;
};

const parseRgbaColor = function(value : string, fallback : RGBA) : RGBA {
  if (typeof value !== 'string') return fallback;

  const color = value.trim().toLowerCase();
  let match = color.match(/^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i);
  if (match) {
    const hex = match[1];
    if (hex.length === 3) {
      return [
        parseInt(hex.charAt(0) + hex.charAt(0), 16),
        parseInt(hex.charAt(1) + hex.charAt(1), 16),
        parseInt(hex.charAt(2) + hex.charAt(2), 16),
        255
      ];
    }
    if (hex.length === 4) {
      return [
        parseInt(hex.charAt(0) + hex.charAt(0), 16),
        parseInt(hex.charAt(1) + hex.charAt(1), 16),
        parseInt(hex.charAt(2) + hex.charAt(2), 16),
        parseInt(hex.charAt(3) + hex.charAt(3), 16)
      ];
    }
    if (hex.length === 6) {
      return [
        parseInt(hex.substring(0, 2), 16),
        parseInt(hex.substring(2, 4), 16),
        parseInt(hex.substring(4, 6), 16),
        255
      ];
    }
    return [
      parseInt(hex.substring(0, 2), 16),
      parseInt(hex.substring(2, 4), 16),
      parseInt(hex.substring(4, 6), 16),
      parseInt(hex.substring(6, 8), 16)
    ];
  }

  match = color.match(/^rgba?\(\s*([^)]+)\s*\)$/i);
  if (match) {
    const parts = match[1].split(',').map(part => part.trim());
    if (parts.length >= 3) {
      const parseChannel = function(channel : string) {
        if (/%$/.test(channel)) {
          const percentage = Number(channel.slice(0, -1));
          if (!Number.isFinite(percentage)) return null;
          return Math.max(0, Math.min(255, Math.round(percentage * 2.55)));
        }
        const numeric = Number(channel);
        if (!Number.isFinite(numeric)) return null;
        return Math.max(0, Math.min(255, Math.round(numeric)));
      };
      const parseAlpha = function(alpha : string) {
        if (/%$/.test(alpha)) {
          const percentage = Number(alpha.slice(0, -1));
          if (!Number.isFinite(percentage)) return null;
          return Math.max(0, Math.min(255, Math.round(percentage * 2.55)));
        }
        const numeric = Number(alpha);
        if (!Number.isFinite(numeric)) return null;
        return Math.max(0, Math.min(255, Math.round(numeric * 255)));
      };

      const rgb = parts.slice(0, 3).map(parseChannel);
      if (rgb.every(channel => channel !== null)) {
        const alpha = parts.length >= 4 ? parseAlpha(parts[3]) : 255;
        if (alpha !== null) {
          return [
            rgb[0] as number,
            rgb[1] as number,
            rgb[2] as number,
            alpha
          ];
        }
      }
    }
  }

  switch (color) {
  case 'black': return [0, 0, 0, 255];
  case 'white': return [255, 255, 255, 255];
  case 'red': return [255, 0, 0, 255];
  case 'green': return [0, 128, 0, 255];
  case 'blue': return [0, 0, 255, 255];
  case 'yellow': return [255, 255, 0, 255];
  case 'gray':
  case 'grey': return [128, 128, 128, 255];
  case 'transparent': return [0, 0, 0, 0];
  default: return fallback;
  }
};

const createDataURL = function(width : number, height : number,
    foreground : RGBA, background : RGBA,
    colors : number,
    getPixel : (x : number, y : number) => boolean) {
  const rgba = new Uint8Array(width * height * 4);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const offset = (y * width + x) * 4;
      const color = getPixel(x, y) ? foreground : background;
      rgba[offset] = color[0];
      rgba[offset + 1] = color[1];
      rgba[offset + 2] = color[2];
      rgba[offset + 3] = color[3];
    }
  }

  const png = UPNG.encode([rgba.buffer], width, height, colors);
  const base64 = encodeBase64(new Uint8Array(png));
  return 'data:image/png;base64,' + base64;
};

qrcode.registerRenderer('png', function(cellSize? : number | { [key : string] : any },
    margin? : number, cellColor? : string, backgroundColor? : string) {

  let opts : { [key : string] : any } = {};
  if (typeof cellSize === 'object') {
    opts = cellSize || {};
    cellSize = void 0;
  }

  let tag = (opts.tag === false) ? false : (opts.tag === true || typeof opts.tag === 'undefined' ? 'img' : opts.tag);
  if (typeof cellSize !== 'number') cellSize = (typeof opts.cellSize === 'number') ? opts.cellSize : 2;
  if (typeof margin === 'undefined') margin = opts.margin;
  if (typeof margin !== 'number') margin = (typeof margin === 'undefined') ? cellSize * 4 : 0;
  if (typeof cellColor !== 'string') cellColor = opts.cellColor;
  if (typeof backgroundColor !== 'string') backgroundColor = opts.backgroundColor;
  const alt = (typeof opts.alt === 'string') ? opts.alt : void 0;
  const title = (typeof opts.title === 'string') ? opts.title : void 0;
  const colors = Math.max(0, Math.round(typeof opts.colors === 'number' ? opts.colors : 2));
  const foreground = parseRgbaColor((typeof cellColor === 'string') ? cellColor : 'black', [0, 0, 0, 255]);
  const background = parseRgbaColor((typeof backgroundColor === 'string') ? backgroundColor : 'white', [255, 255, 255, 255]);
  const cellSizeValue = Number(cellSize);
  const marginSize = Number(margin);
  const moduleCount = Number((this as any).getModuleCount());

  const size = moduleCount * cellSizeValue + marginSize * 2;
  const min = marginSize;
  const max = size - marginSize;

  const dataURL = createDataURL(size, size, foreground, background, colors, (x, y) => {
    if (min <= x && x < max && min <= y && y < max) {
      const c = Math.floor((x - min) / cellSizeValue);
      const r = Math.floor((y - min) / cellSizeValue);
      return this.isDark(r, c);
    }
    return false;
  });

  if (tag === false) {
    return dataURL;
  }

  tag = (typeof tag === 'string') ? tag : 'img';

  let html = '';
  html += '<' + tag;
  html += '\u0020src="';
  html += dataURL;
  html += '"';
  html += '\u0020width="';
  html += size;
  html += '"';
  html += '\u0020height="';
  html += size;
  html += '"';
  if (alt) {
    html += '\u0020alt="';
    html += escapeXml(alt);
    html += '"';
  }
  if (title) {
    html += '\u0020title="';
    html += escapeXml(title);
    html += '"';
  }
  html += '/>';

  return html;
});
