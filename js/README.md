QR Code Generator
===

## Getting Started

1. Include qrcode.js in your html.
2. Prepare a place holder.
3. Generate QR and render it.

```html
<script type="text/javascript" src="qrcode.js"></script>
```
```html
<div id="placeHolder"></div>
```
```javascript
var typeNumber = 4;
var errorCorrectionLevel = 'L';
var qr = qrcode(typeNumber, errorCorrectionLevel);
qr.addData('Hi!');
qr.make();
document.getElementById('placeHolder').innerHTML = qr.toString('gif');
```
## API Documentation

### QRCodeFactory

#### qrcode(typeNumber, errorCorrectionLevel) => <code>QRCode</code>
Create a QRCode Object.

| Param                | Type                | Description                                    |
| ---------------------| ------------------- | ---------------------------------------------- |
| typeNumber           | <code>number</code> | Type number (1 ~ 40), or 0 for auto detection. |
| errorCorrectionLevel | <code>string</code> | Error correction level ('L', 'M', 'Q', 'H')    |

#### qrcode.stringToBytes(s) : <code>number[]</code>
Encodes a string into an array of number(byte) using any charset.
This function is used by internal.
Overwrite this function to encode using a multibyte charset.

| Param  | Type                | Description      |
| ------ | ------------------- | ---------------- |
| s      | <code>string</code> | string to encode |

### QRCode

#### addData(data, mode) => <code>void</code>
Add a data to encode.

| Param  | Type                | Description                                                |
| ------ | ------------------- | ---------------------------------------------------------- |
| data   | <code>string</code> | string to encode                                           |
| mode   | <code>string</code> | Mode ('Numeric', 'Alphanumeric', 'Byte'(default), 'Kanji') |

#### make() => <code>void</code>
Make a QR Code.

#### getModuleCount() => <code>number</code>
The number of modules(cells) for each orientation.
_[Note] call make() before this function._

#### isDark(row, col) => <code>boolean</code>
The module at row and col is dark or not.
_[Note] call make() before this function._

| Param | Type                | Description         |
| ----- | ------------------- | ------------------- |
| row   | <code>number</code> | 0 ~ moduleCount - 1 |
| col   | <code>number</code> | 0 ~ moduleCount - 1 |

#### toString(format, ...args) => <code>string</code>
Render a QR Code with a registered formatter.
 _[Note] call make() before this function._

| Param  | Type                | Description                                           |
| ------ | ------------------- | ----------------------------------------------------- |
| format | <code>string</code> | Formatter name (`gif`, `svg`, `table`, `ascii`)      |
| args   | <code>any[]</code>  | Formatter-specific positional arguments              |

#### toString({ format, ...opts }) => <code>string</code>
Render a QR Code with formatter options passed as an object.

```javascript
qr.toString('gif'); // default <img .../>
qr.toString({ format: 'gif', tag: false }); // data:image/gif...
qr.toString({ format: 'svg', cellSize: 2, crispEdges: 'auto' });
qr.toString({ format: 'table', cellSize: 5, margin: 20 });
qr.toString('ascii', 1, 2);
```

#### SVG Formatter Options

| Param         | Type                 | Description           |
| ------------- | -------------------- | --------------------- |
| opts          | <code>object</code>  | default: {}           |
| opts.cellSize | <code>number</code>  | default: 2            |
| opts.margin   | <code>number</code>  | default: cellSize * 4 |
| opts.scalable | <code>boolean</code> | default: false        |
| opts.crispEdges | <code>boolean</code> \| <code>'auto'</code> | default: auto; applies <code>crispEdges</code> automatically for whole-number <code>cellSize</code> values |

#### toCanvas(context, cellSize) => <code>void</code>

--

This implementation is based on JIS X 0510:1999.

The word 'QR Code' is registered trademark of DENSO WAVE INCORPORATED
<br/>http://www.denso-wave.com/qrcode/faqpatent-e.html
