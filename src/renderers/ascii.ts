//---------------------------------------------------------------------
//
// ASCII Renderer Extension for JavaScript QR Code Generator
//
// Copyright (c) 2026 Yuriy Apostol
// https://github.com/yuriyapostol
//
// Based on createASCII method from original QR Code Generator for JavaScript
//   Copyright (c) 2009 Kazuhiko Arase
//   http://www.d-project.com/
//
// Licensed under the MIT license:
//   http://www.opensource.org/licenses/mit-license.php
//
// 'QR Code' is a registered trademark of DENSO WAVE INCORPORATED.
//
//---------------------------------------------------------------------

import { registerRenderer } from './utils/registry';

registerRenderer('ascii', {
  args: [
    { name: 'cellSize', type: 'number' },
    { name: 'margin', type: 'number' }
  ],
  render: function(opts : { [key : string] : any }) {

  let cellSize = opts.cellSize;
  let margin = opts.margin;
  cellSize = cellSize || 1;

  if (cellSize < 2) {
    cellSize = 1;
    margin = (typeof margin == 'undefined') ? cellSize * 2 : margin;
    const cellSizeValue = Number(cellSize);
    const marginSize = Number(margin);
    const moduleCount = Number((this as any).getModuleCount());

    const size = moduleCount * cellSizeValue + marginSize * 2;
    const min = marginSize;
    const max = size - marginSize;

    let y : number, x : number, r1 : number, r2 : number, p : string;

    const blocks : { [key : string] : string } = {
      '██': '█',
      '█ ': '▀',
      ' █': '▄',
      '  ': ' '
    };

    const blocksLastLineNoMargin : { [key : string] : string } = {
      '██': '▀',
      '█ ': '▀',
      ' █': ' ',
      '  ': ' '
    };

    let ascii = '';
    for (y = 0; y < size; y += 2) {
      r1 = Math.floor((y - min) / cellSizeValue);
      r2 = Math.floor((y + 1 - min) / cellSizeValue);
      for (x = 0; x < size; x += 1) {
        p = '█';

        if (min <= x && x < max && min <= y && y < max &&
            this.isDark(r1, Math.floor((x - min) / cellSizeValue))) {
          p = ' ';
        }

        if (min <= x && x < max && min <= y + 1 && y + 1 < max &&
            this.isDark(r2, Math.floor((x - min) / cellSizeValue))) {
          p += ' ';
        } else {
          p += '█';
        }

        ascii += (marginSize < 1 && y + 1 >= max) ? blocksLastLineNoMargin[p] : blocks[p];
      }

      ascii += '\n';
    }

    if (size % 2 && marginSize > 0) {
      return ascii.substring(0, ascii.length - size - 1) + Array(size + 1).join('▀');
    }

    return ascii.substring(0, ascii.length - 1);
  }

  cellSize -= 1;
  margin = (typeof margin == 'undefined') ? cellSize * 2 : margin;
  const cellSizeValue = Number(cellSize);
  const marginSize = Number(margin);
  const moduleCount = Number((this as any).getModuleCount());

  const size = moduleCount * cellSizeValue + marginSize * 2;
  const min = marginSize;
  const max = size - marginSize;

  let y : number, x : number, r : number, p : number;

  const white = Array(cellSize + 1).join('██');
  const black = Array(cellSize + 1).join('  ');

  let ascii = '';
  let line = '';
  for (y = 0; y < size; y += 1) {
    r = Math.floor((y - min) / cellSizeValue);
    line = '';
    for (x = 0; x < size; x += 1) {
      p = 1;

      if (min <= x && x < max && min <= y && y < max &&
          this.isDark(r, Math.floor((x - min) / cellSizeValue))) {
        p = 0;
      }

      line += p ? white : black;
    }

    for (r = 0; r < cellSize; r += 1) {
      ascii += line + '\n';
    }
  }

  return ascii.substring(0, ascii.length - 1);
  }
});
