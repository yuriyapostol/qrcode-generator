
import { qrcode } from '../dist/core/qrcode.mjs';
import '../dist/renderers/gif.mjs';
import '../dist/renderers/png.mjs';
import '../dist/renderers/ascii.mjs';
import '../dist/renderers/table.mjs';
import '../dist/renderers/svg.mjs';
import '../dist/renderers/canvas.mjs';
import { overview as test } from './test-impl.js';

test(qrcode);
