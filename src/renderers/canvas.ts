//---------------------------------------------------------------------
//
// Canvas Render for JavaScript QR Code Generator (optional)
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

import { qrcode } from '../core/qrcode';

qrcode.registerRenderer('canvas', function(context : CanvasRenderingContext2D,
    cellSize? : number | { [key : string] : any }, margin? : number,
    cellColor? : string, backgroundColor? : string) {

  let opts : { [key : string] : any } = {};
  if (typeof cellSize === 'object') {
    opts = cellSize || {};
    cellSize = void 0;
  }

  if (typeof cellSize !== 'number') cellSize = (typeof opts.cellSize === 'number') ? opts.cellSize : 2;
  if (typeof margin === 'undefined') margin = opts.margin;
  if (typeof margin !== 'number') margin = (typeof margin === 'undefined') ? cellSize * 4 : 0;
  if (typeof cellColor !== 'string') cellColor = (typeof opts.cellColor === 'string') ? opts.cellColor : 'black';
  if (typeof backgroundColor !== 'string') {
    backgroundColor = (typeof opts.backgroundColor === 'string') ? opts.backgroundColor : 'white';
  }

  const count = Number(this.getModuleCount());
  const cellSizeValue = Number(cellSize);
  const marginSize = Number(margin);
  const size = count * cellSizeValue + marginSize * 2;

  context.fillStyle = backgroundColor;
  context.fillRect(0, 0, size, size);

  context.fillStyle = cellColor;
  for (let row = 0; row < count; row += 1) {
    const y = row * cellSizeValue + marginSize;
    for (let col = 0; col < count; col += 1) {
      if (this.isDark(row, col)) {
        context.fillRect(col * cellSizeValue + marginSize, y, cellSizeValue, cellSizeValue);
      }
    }
  }
});
