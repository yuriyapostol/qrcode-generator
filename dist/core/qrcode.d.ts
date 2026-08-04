import { QRCodeFactory } from './types';
/**
 * qrcode
 * @param typeNumber 1 to 40
 * @param errorCorrectionLevel 'L','M','Q','H'
 */
declare const qrcode: QRCodeFactory;
/**
 * @param unicodeData base64 string of byte array.
 * [16bit Unicode],[16bit Bytes], ...
 * @param numChars
 */
declare const createStringToBytes: (unicodeData: string, numChars: number) => (s: string) => number[];
declare const stringToBytes: (s: string) => number[];
export default qrcode;
export { qrcode, stringToBytes, createStringToBytes, type QRCodeFactory };
