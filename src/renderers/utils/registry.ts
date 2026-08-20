//---------------------------------------------------------------------
//
// Renderer registry support for JavaScript QR Code Generator
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

import { qrcode } from '../../core/qrcode';
import {
  type QRCode,
  type QRCodeFactory,
  type QRCodeRenderer,
  type QRCodeRendererArgument,
  type QRCodeRendererOptions
} from '../../core/types';

const renderers : Record<string, QRCodeRenderer> = {};

const isPlainObject = function(value : any) {
  if (typeof value !== 'object' || value === null) return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
};

const mergeStyleOption = function(current : any, incoming : any) {
  const style = isPlainObject(current) ? { ...current } : {};
  if (typeof incoming === 'string') {
    style.color = incoming;
  }
  else if (isPlainObject(incoming)) {
    Object.assign(style, incoming);
  }
  return style;
};

const getStyleOption = function(target : QRCodeRendererOptions, key : 'cell' | 'background') {
  if (!isPlainObject(target[key])) target[key] = {};
  return target[key];
};

const setRendererOption = function(target : QRCodeRendererOptions, key : string, value : any) {
  if (key === 'renderer') return;

  if (key === 'cell' || key === 'background') {
    target[key] = mergeStyleOption(target[key], value);
    if (key === 'cell') {
      if (typeof target.cell.size === 'number') target.cellSize = target.cell.size;
      if (typeof target.cell.color === 'string') target.cellColor = target.cell.color;
    }
    else if (typeof target.background.color === 'string') {
      target.backgroundColor = target.background.color;
    }
    return;
  }

  target[key] = value;

  if (key === 'cellSize' && typeof value === 'number') {
    getStyleOption(target, 'cell').size = value;
  }
  else if (key === 'cellColor' && typeof value === 'string') {
    getStyleOption(target, 'cell').color = value;
  }
  else if (key === 'backgroundColor' && typeof value === 'string') {
    getStyleOption(target, 'background').color = value;
  }
};

const mergeRendererOptions = function(target : QRCodeRendererOptions, source : { [key : string] : any }) {
  Object.keys(source).forEach(key => {
    setRendererOption(target, key, source[key]);
  });
};

const isRendererArgumentCompatible = function(arg : QRCodeRendererArgument, value : any) {
  if (!arg.type || arg.type === 'any') return true;
  if (arg.type === 'object') return typeof value === 'object' && value !== null;
  return typeof value === arg.type;
};

const getNextRendererArgument = function(rendererArgs : QRCodeRendererArgument[],
    opts : QRCodeRendererOptions, value : any) {
  for (let i = 0; i < rendererArgs.length; i += 1) {
    if (typeof opts[rendererArgs[i].name] === 'undefined' &&
        isRendererArgumentCompatible(rendererArgs[i], value)) {
      return rendererArgs[i];
    }
  }
  return null;
};

const normalizeRendererOptions = function(rendererName : string,
    renderer : QRCodeRenderer, args : any[], baseOpts? : QRCodeRendererOptions) {
  const opts : QRCodeRendererOptions = { renderer: rendererName };
  const rendererArgs = renderer.args || [];

  if (baseOpts) mergeRendererOptions(opts, baseOpts);

  args.forEach(arg => {
    const rendererArg = getNextRendererArgument(rendererArgs, opts, arg);
    if (isPlainObject(arg) && !rendererArg?.positionalOnly) {
      mergeRendererOptions(opts, arg);
      return;
    }
    if (rendererArg) {
      setRendererOption(opts, rendererArg.name, arg);
    }
  });

  if (typeof opts.cell === 'string' || isPlainObject(opts.cell)) {
    opts.cell = mergeStyleOption(void 0, opts.cell);
  }
  else if (!isPlainObject(opts.cell)) {
    opts.cell = {};
  }

  if (typeof opts.background === 'string' || isPlainObject(opts.background)) {
    opts.background = mergeStyleOption(void 0, opts.background);
  }
  else if (!isPlainObject(opts.background)) {
    opts.background = {};
  }

  if (typeof opts.cellSize === 'number' && typeof opts.cell.size !== 'number') {
    opts.cell.size = opts.cellSize;
  }
  if (typeof opts.cell.size === 'number' && typeof opts.cellSize !== 'number') {
    opts.cellSize = opts.cell.size;
  }
  if (typeof opts.cellColor === 'string' && typeof opts.cell.color !== 'string') {
    opts.cell.color = opts.cellColor;
  }
  if (typeof opts.cell.color === 'string' && typeof opts.cellColor !== 'string') {
    opts.cellColor = opts.cell.color;
  }
  if (typeof opts.backgroundColor === 'string' && typeof opts.background.color !== 'string') {
    opts.background.color = opts.backgroundColor;
  }
  if (typeof opts.background.color === 'string' && typeof opts.backgroundColor !== 'string') {
    opts.backgroundColor = opts.background.color;
  }

  return opts;
};

const installRendererApi = function(qr : QRCode, factory : QRCodeFactory) {
  qr.render = function(renderer_or_opts? : string | { renderer: string, [key: string] : any }, ...args : any[]) {
    let rendererName;
    let renderOpts : QRCodeRendererOptions | undefined;
    if (typeof renderer_or_opts === 'string') {
      rendererName = renderer_or_opts;
    }
    else if (typeof renderer_or_opts === 'object' && renderer_or_opts?.renderer) {
      const { renderer: objectRenderer, ...objectOpts } = renderer_or_opts;
      rendererName = objectRenderer;
      renderOpts = objectOpts;
    }
    if (!rendererName) return '[QRCode Object]';
    const renderer = factory.getRenderer(rendererName);
    if (!renderer) {
      throw 'unknown renderer: ' + rendererName;
    }
    return renderer.render.call(qr, normalizeRendererOptions(rendererName, renderer, args, renderOpts));
  };
};

(qrcode as QRCodeFactory).registerRenderer = function(name : string, renderer : QRCodeRenderer) {
  renderers[name] = renderer;
};

(qrcode as QRCodeFactory).getRenderer = function(name : string) {
  return renderers[name];
};

qrcode.use(installRendererApi);

export const registerRenderer = (qrcode as QRCodeFactory).registerRenderer;
export const getRenderer = (qrcode as QRCodeFactory).getRenderer;
