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
  type QRCodeRenderOptions,
  type QRCodeRenderer,
  type QRCodeRendererArgument,
  type QRCodeRendererOptions,
  type QRCodeRendererSpec
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

const normalizeOutputName = function(output : string) {
  return output.toLowerCase() === 'dataurl' ? 'dataUrl' : output;
};

const applyRendererToken = function(opts : QRCodeRendererOptions, token : string) {
  const lower = token.toLowerCase();
  if (lower === 'dataurl' || lower === 'html' || lower === 'element' ||
      lower === 'canvas' || lower === 'file') {
    opts.output = normalizeOutputName(token);
    return;
  }
  if (lower === 'img' || lower === 'image') {
    opts.output = 'html';
    opts.tagName = 'img';
    return;
  }
  opts.output = token;
};

const parseRendererSpec = function(rendererSpec : QRCodeRendererSpec) {
  if (typeof rendererSpec === 'string') {
    const parts = rendererSpec.split(':');
    const opts : QRCodeRendererOptions = {};
    parts.slice(1).forEach(part => {
      if (part) applyRendererToken(opts, part);
    });
    return { name: parts[0], opts };
  }

  if (isPlainObject(rendererSpec)) {
    const { renderer, type, ...opts } = rendererSpec;
    return { name: renderer || type, opts };
  }

  return { name: void 0, opts: {} };
};

const getTargetTagName = function(target : any) {
  return (typeof target?.tagName === 'string') ? target.tagName.toLowerCase() : void 0;
};

const readTargetAttribute = function(target : any, name : string) {
  if (typeof target?.getAttribute !== 'function') return void 0;
  const value = target.getAttribute(name);
  return value === null ? void 0 : value;
};

const readNumberTargetAttribute = function(target : any, name : string) {
  const value = readTargetAttribute(target, name);
  if (typeof value === 'undefined' || value === '') return void 0;
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : void 0;
};

const readBooleanOrNumberTargetAttribute = function(target : any, name : string) {
  const value = readTargetAttribute(target, name);
  if (typeof value === 'undefined' || value === '') return void 0;
  const lower = value.toLowerCase();
  if (lower === 'true') return true;
  if (lower === 'false') return false;
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : value;
};

const parseJsonAttribute = function(target : any, name : string) {
  const value = readTargetAttribute(target, name);
  if (typeof value === 'undefined' || value === '') return void 0;
  return JSON.parse(value);
};

const getQRCodeAttributeName = function(name : string) {
  return `data-qrcode-${name}`;
};

const getTargetRendererOptions = function(target : any) {
  const opts : QRCodeRendererOptions = {};
  if (!target) return opts;

  const tagName = getTargetTagName(target);
  if (tagName) opts.tagName = tagName;

  const renderer = readTargetAttribute(target, getQRCodeAttributeName('renderer'));
  const output = readTargetAttribute(target, getQRCodeAttributeName('output'));
  const tagNameAttr = readTargetAttribute(target, getQRCodeAttributeName('tag-name'));
  const cellSize = readNumberTargetAttribute(target, getQRCodeAttributeName('cell-size'));
  const margin = readNumberTargetAttribute(target, getQRCodeAttributeName('margin'));
  const cellColor = readTargetAttribute(target, getQRCodeAttributeName('cell-color'));
  const backgroundColor = readTargetAttribute(target, getQRCodeAttributeName('background-color'));
  const alt = readTargetAttribute(target, 'alt');
  const title = readTargetAttribute(target, 'title');

  if (renderer) {
    const parsedRenderer = parseRendererSpec(renderer);
    if (parsedRenderer.name) opts.renderer = parsedRenderer.name;
    Object.assign(opts, parsedRenderer.opts);
  }
  if (output) opts.output = normalizeOutputName(output);
  if (tagNameAttr) opts.tagName = tagNameAttr;
  if (typeof cellSize === 'number') opts.cellSize = cellSize;
  if (typeof margin === 'number') opts.margin = margin;
  if (cellColor) opts.cellColor = cellColor;
  if (backgroundColor) opts.backgroundColor = backgroundColor;
  if (alt) opts.alt = alt;
  if (title) opts.title = title;

  if (!opts.renderer && tagName === 'canvas') opts.renderer = 'canvas';
  if (!opts.renderer && tagName === 'img') opts.renderer = 'png';
  if (!opts.output && tagName === 'canvas') opts.output = 'canvas';
  if (!opts.output && tagName === 'img') opts.output = 'element';
  if (!opts.context && tagName === 'canvas' && typeof target.getContext === 'function') {
    opts.context = target.getContext('2d');
  }

  return opts;
};

const getTargetQRCodeOptions = function(target : any) {
  const opts : QRCodeRenderOptions = {};
  if (!target) return opts;

  const typeNumber = readNumberTargetAttribute(target, getQRCodeAttributeName('type-number'));
  const errorCorrectionLevel = readTargetAttribute(target, getQRCodeAttributeName('error-correction-level'));
  const value = readTargetAttribute(target, getQRCodeAttributeName('value')) || readTargetAttribute(target, getQRCodeAttributeName('data'));
  const mode = readTargetAttribute(target, getQRCodeAttributeName('mode'));
  const encoding = readTargetAttribute(target, getQRCodeAttributeName('encoding'));
  const eci = readBooleanOrNumberTargetAttribute(target, getQRCodeAttributeName('eci'));
  const segments = parseJsonAttribute(target, getQRCodeAttributeName('segments'));

  if (typeof typeNumber === 'number') opts.typeNumber = typeNumber as QRCodeRenderOptions['typeNumber'];
  if (errorCorrectionLevel) opts.errorCorrectionLevel = errorCorrectionLevel as QRCodeRenderOptions['errorCorrectionLevel'];
  if (segments) opts.data = segments;
  else if (typeof value === 'string') opts.data = value;
  if (mode) opts.mode = mode as QRCodeRenderOptions['mode'];
  if (encoding || typeof eci !== 'undefined') {
    opts.opts = {};
    if (encoding) opts.opts.encoding = encoding;
    if (typeof eci !== 'undefined') opts.opts.eci = eci as any;
  }

  return opts;
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
  qr.render = function(renderer_or_opts? : QRCodeRendererSpec | { renderer?: QRCodeRendererSpec, target?: any, [key: string] : any }, ...args : any[]) {
    let rendererName;
    let renderOpts : QRCodeRendererOptions | undefined;
    if (typeof renderer_or_opts === 'string') {
      const parsed = parseRendererSpec(renderer_or_opts);
      rendererName = parsed.name;
      renderOpts = parsed.opts;
    }
    else if (isPlainObject(renderer_or_opts) && renderer_or_opts?.renderer) {
      const input = renderer_or_opts as { renderer: QRCodeRendererSpec, target?: any, [key: string] : any };
      const { renderer: objectRenderer, ...objectOpts } = input;
      const parsed = parseRendererSpec(objectRenderer);
      const targetOpts = getTargetRendererOptions(objectOpts.target);
      rendererName = parsed.name || targetOpts.renderer;
      renderOpts = { ...targetOpts, ...parsed.opts, ...objectOpts };
    }
    else if (isPlainObject(renderer_or_opts)) {
      const input = renderer_or_opts as { target?: any, [key: string] : any };
      const targetOpts = getTargetRendererOptions(input.target);
      rendererName = targetOpts.renderer;
      renderOpts = { ...targetOpts, ...input };
    }
    if (!rendererName) return '[QRCode Object]';
    const renderer = factory.getRenderer(rendererName);
    if (!renderer) {
      throw 'unknown renderer: ' + rendererName;
    }
    qr.make();
    return renderer.render.call(qr, normalizeRendererOptions(rendererName, renderer, args, renderOpts));
  };

};

(qrcode as QRCodeFactory).registerRenderer = function(name : string, renderer : QRCodeRenderer) {
  renderers[name] = renderer;
};

(qrcode as QRCodeFactory).getRenderer = function(name : string) {
  return renderers[name];
};

(qrcode as QRCodeFactory).render = function(opts : QRCodeRenderOptions) {
  const targetOpts = getTargetQRCodeOptions(opts?.target);
  const renderOpts = { ...targetOpts, ...(opts || {}) };
  const typeNumber = (typeof renderOpts.typeNumber === 'number') ? renderOpts.typeNumber : 0;
  const errorCorrectionLevel = renderOpts.errorCorrectionLevel || 'L';
  const qr = (qrcode as QRCodeFactory)(typeNumber as any, errorCorrectionLevel);

  if (typeof renderOpts.data === 'string') {
    qr.addData(renderOpts.data, renderOpts.mode, renderOpts.opts);
  }
  else if (Array.isArray(renderOpts.data)) {
    qr.addData(renderOpts.data);
  }
  else {
    throw 'data is required';
  }

  return qr.render(renderOpts);
};

qrcode.use(installRendererApi);

export const registerRenderer = (qrcode as QRCodeFactory).registerRenderer;
export const getRenderer = (qrcode as QRCodeFactory).getRenderer;
