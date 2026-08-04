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

qrcode.registerRenderer('canvas', function(context : CanvasRenderingContext2D, cellSize? : number) {
  cellSize = cellSize || 2;
  const length = this.getModuleCount();
  for (let row = 0; row < length; row += 1) {
    for (let col = 0; col < length; col += 1) {
      context.fillStyle = this.isDark(row, col) ? 'black' : 'white';
      context.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
    }
  }
});
