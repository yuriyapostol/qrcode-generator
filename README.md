QR Code Generator
===

## Getting Started

1. Import the core module and any optional renderers or encodings you need.
2. Prepare a place holder.
3. Generate QR and render it.

```html
<script type="module">
import qrcode from './core/qrcode.mjs';
import './renderers/gif.mjs';
</script>
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
document.getElementById('placeHolder').innerHTML = qr.render('gif');
```
## API Documentation

### QRCodeFactory

#### qrcode(typeNumber, errorCorrectionLevel) => <code>QRCode</code>
Create a QRCode Object.

| Param                | Type                | Description                                    |
| ---------------------| ------------------- | ---------------------------------------------- |
| typeNumber           | <code>number</code> | Type number (1 ~ 40), or 0 for auto detection. |
| errorCorrectionLevel | <code>string</code> | Error correction level ('L', 'M', 'Q', 'H')    |

#### qrcode.registerEncoder(encoding, encoder) => <code>void</code>
Register a named text encoder for `Byte` and/or `Kanji` segments.

```javascript
qrcode.registerEncoder('UTF-8', {
  encode: function(s) { ... },
  eci: 26,
  modes: ['Byte']
});
```

#### qrcode.getEncoder(encoding) => <code>QRCodeEncoder | undefined</code>
Get a registered encoder by name.

#### qrcode.setDefaultEncoding(mode, encoding) => <code>void</code>
Set the default named encoder for `Byte` or `Kanji`.

#### qrcode.getDefaultEncoding(mode) => <code>string | undefined</code>
Get the default named encoder for `Byte` or `Kanji`.

### QRCode

#### addData(data, mode, opts) => <code>void</code>
Add a data to encode.

| Param  | Type                | Description                                                |
| ------ | ------------------- | ---------------------------------------------------------- |
| data   | <code>string</code> | string to encode                                           |
| mode   | <code>string</code> | Mode ('Numeric', 'Alphanumeric', 'Byte'(default), 'Kanji') |
| opts   | <code>object</code> | Optional segment options for `Byte` and `Kanji`            |

`opts.encoding` selects a registered encoder by name.

`opts.eci` may be:
- `true` to emit the encoder's registered ECI assignment number
- a number to emit an explicit ECI assignment number
- omitted / `false` to skip ECI

```javascript
qr.addData('Hello');
qr.addData('Hello', 'Byte', { encoding: 'UTF-8' });
qr.addData('Hello', 'Byte', { encoding: 'UTF-8', eci: true });
qr.addData('友', 'Kanji', { encoding: 'SJIS' });
```

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

#### render(renderer, ...args) => <code>any</code>
Render a QR Code with a registered renderer.
 _[Note] call make() before this function._

| Param  | Type                | Description                                           |
| ------ | ------------------- | ----------------------------------------------------- |
| renderer | <code>string</code> | Renderer name (`gif`, `svg`, `table`, `ascii`, `canvas`) |
| args   | <code>any[]</code>  | Renderer-specific positional arguments               |

#### render({ renderer, ...opts }) => <code>any</code>
Render a QR Code with renderer options passed as an object.

```javascript
qr.render('gif'); // default <img .../>
qr.render({ renderer: 'gif', tag: false }); // data:image/gif...
qr.render({ renderer: 'svg', cellSize: 2, crispEdges: 'auto' });
qr.render({ renderer: 'table', cellSize: 5, margin: 20 });
qr.render('ascii', 1, 2);
qr.render('canvas', context, 2);
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
