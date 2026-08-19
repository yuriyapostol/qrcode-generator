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
import { parseRgbaColor, type RGBA } from './utils/color';
import { escapeXml } from './utils/xml';

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

const createDataURL = function(width : number, height : number,
    foreground : RGBA, background : RGBA,
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

  const png = UPNG.encode([rgba.buffer], width, height, 0);
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
  const foreground = parseRgbaColor((typeof cellColor === 'string') ? cellColor : 'black', [0, 0, 0, 255]);
  const background = parseRgbaColor((typeof backgroundColor === 'string') ? backgroundColor : 'white', [255, 255, 255, 255]);
  const cellSizeValue = Number(cellSize);
  const marginSize = Number(margin);
  const moduleCount = Number((this as any).getModuleCount());

  const size = moduleCount * cellSizeValue + marginSize * 2;
  const min = marginSize;
  const max = size - marginSize;

  const dataURL = createDataURL(size, size, foreground, background, (x, y) => {
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
