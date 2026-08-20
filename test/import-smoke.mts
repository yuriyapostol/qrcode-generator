import qrcode, { qrcode as named } from 'qrcode-generator';
import 'qrcode-generator/renderers/svg';

const qr = qrcode(0, 'M');

qrcode.stringToBytes('abc');
qrcode.getRenderer('svg');
qrcode.getEncoder('UTF-8');
named.stringToBytes('abc');

qr.addData('hello');
qr.make();
qr.render();
