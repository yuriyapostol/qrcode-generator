//---------------------------------------------------------------------
//
// HTML Table Renderer Extension for JavaScript QR Code Generator
//
// Copyright (c) 2025 Yuriy Apostol
// https://github.com/yuriyapostol
//
// Based on createTableTag method from original QR Code Generator for JavaScript
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

registerRenderer('table', {
  args: [
    { name: 'cellSize', type: 'number' },
    { name: 'margin', type: 'number' },
    { name: 'cellColor', type: 'string' },
    { name: 'backgroundColor', type: 'string' }
  ],
  render: function(opts : { [key : string] : any }) {

  let cell = opts.cell || {};
  if (typeof cell === 'string') cell = { color: cell };
  if (typeof cell !== 'object' || !cell) cell = {};
  if (typeof cell.size !== 'number') cell.size = (typeof opts.cellSize === 'number') ? opts.cellSize : 1;
  if (typeof cell.color !== 'string') cell.color = (typeof opts.cellColor === 'string') ? opts.cellColor : 'black';

  let margin = opts.margin;
  if (typeof margin !== 'number') margin = (typeof margin === 'undefined') ? cell.size * 4 : 0;

  let background = opts.background || {};
  if (typeof background === 'string') background = { color: background };
  if (typeof background !== 'object' || !background) background = {};
  if (typeof background.color !== 'string') {
    background.color = (typeof opts.backgroundColor === 'string') ? opts.backgroundColor : 'white';
  }

  const count = Number(this.getModuleCount());
  const cellSizeValue = Number(cell.size);
  const marginSize = Number(margin);

  const spacerCell = (width : number, height : number) =>
    `<td style="border: none; border-collapse: collapse; padding: 0px; margin: 0px; width: ${width}px; height: ${height}px; background-color: ${background.color};"/>`;

  let table = `<table style="border: none; border-collapse: collapse; border-spacing: 0px; padding: 0px; margin: 0px; background-color: ${background.color};"><tbody>`;

  if (marginSize > 0) {
    table += '<tr>';
    table += spacerCell(marginSize, marginSize);
    table += `<td colspan="${count}" style="border: none; border-collapse: collapse; padding: 0px; margin: 0px; width: ${count * cellSizeValue}px; height: ${marginSize}px; background-color: ${background.color};"/>`;
    table += spacerCell(marginSize, marginSize);
    table += '</tr>';
  }

  for (let r = 0; r < count; r += 1) {
    table += '<tr>';

    if (marginSize > 0) {
      table += spacerCell(marginSize, cellSizeValue);
    }

    for (let c = 0; c < count; c += 1) {
      table += `<td style="border: none; border-collapse: collapse; padding: 0px; margin: 0px; width: ${cellSizeValue}px; height: ${cellSizeValue}px; background-color: ${this.isDark(r, c) ? cell.color : 'transparent'};"/>`;
    }

    if (marginSize > 0) {
      table += spacerCell(marginSize, cellSizeValue);
    }

    table += '</tr>';
  }

  if (marginSize > 0) {
    table += '<tr>';
    table += spacerCell(marginSize, marginSize);
    table += `<td colspan="${count}" style="border: none; border-collapse: collapse; padding: 0px; margin: 0px; width: ${count * cellSizeValue}px; height: ${marginSize}px; background-color: ${background.color};"/>`;
    table += spacerCell(marginSize, marginSize);
    table += '</tr>';
  }

  table += '</tbody></table>';

  return table;
  }
});
