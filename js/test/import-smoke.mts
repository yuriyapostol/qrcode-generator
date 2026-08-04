import * as pkg from 'qrcode-generator';

const qrcode = pkg.default;
const named = pkg.qrcode;

const qr = qrcode(0, 'M');

qrcode.stringToBytes('abc');
qrcode.getRenderer('svg');
qrcode.getEncoder('UTF-8');
named.stringToBytes('abc');

qr.addData('hello');
qr.make();
qr.render();
