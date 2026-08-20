QR Code Generator
===

This project started as a fork of [kazuhikoarase/qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator). Two pull requests were submitted back to the original repository. The main changes there focused on moving renderers into optional plugins and expanding QR code appearance customization while preserving compatibility with the original API.

At the time the fork was separated from the original repository, both pull requests were still open, and further work needed to continue without waiting on upstream decisions. Because of that, development continues here independently, and legacy compatibility helpers from the original API have already been removed. See [Migration from Legacy API](#migration-from-legacy-api).

## Getting Started

1. Import the package and any optional renderers or encodings you need.
2. Prepare a place holder.
3. Generate QR and render it.

```html
<script type="module">
import qrcode from 'qrcode-generator';
import 'qrcode-generator/renderers/gif';
import 'qrcode-generator/renderers/png';
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

Optional modules:

- `qrcode-generator/renderers/gif`
- `qrcode-generator/renderers/png`
- `qrcode-generator/renderers/svg`
- `qrcode-generator/renderers/table`
- `qrcode-generator/renderers/ascii`
- `qrcode-generator/renderers/canvas`
- `qrcode-generator/encodings/utf8`
- `qrcode-generator/encodings/sjis`

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

`render(...)`, `registerRenderer(...)`, and `getRenderer(...)` are installed by
importing any optional renderer. The base core module does not load renderer
registry code until a renderer module is imported.

| Param  | Type                | Description                                           |
| ------ | ------------------- | ----------------------------------------------------- |
| renderer | <code>string</code> | Renderer name (`gif`, `png`, `svg`, `table`, `ascii`, `canvas`) |
| args   | <code>any[]</code>  | Renderer-specific positional arguments and option objects |

#### render({ renderer, ...opts }) => <code>any</code>
Render a QR Code with renderer options passed as an object.

Renderer options can be passed as a single object or mixed into any positional
argument slot. Plain objects are merged into renderer options; simple values are
assigned to the next positional parameter for that renderer. `opts.cell` and
`opts.background` may be objects or color strings. `cellSize`/`cellColor` and
`backgroundColor` are aliases for `cell.size`/`cell.color` and
`background.color`.

```javascript
qr.render('gif'); // default <img .../>
qr.render({ renderer: 'gif', tag: false }); // data:image/gif...
qr.render({ renderer: 'png', tag: false }); // data:image/png...
qr.render('gif', 4, 12, '#182126', '#f4efe7');
qr.render({ renderer: 'gif', cellSize: 4, margin: 12, cellColor: '#182126', backgroundColor: '#f4efe7' });
qr.render('svg', 12, 24, { cell: '#777', background: '#fff' });
qr.render({ renderer: 'svg', cellSize: 2, crispEdges: 'auto' });
qr.render({ renderer: 'svg', cell: { size: 2, color: '#111' }, background: { color: '#fff' } });
qr.render({ renderer: 'table', cellSize: 5, margin: 20 });
qr.render('ascii', 1, 2);
qr.render('canvas', context, 2);
qr.render('canvas', context, { cell: { size: 6, color: '#111' }, margin: 12, background: '#eee' });
```

#### SVG Formatter Options

| Param | Type | Description |
| ----- | ---- | ----------- |
| opts | <code>object</code> | default: `{}` |
| opts.id | <code>string</code> | SVG root id, default: `qrcode` |
| opts.class | <code>string</code> | SVG root class, default: `qrcode` |
| opts.style | <code>string</code> | SVG root inline style, default: `''` |
| opts.cellSize | <code>number</code> | Shortcut for `opts.cell.size`, default: `1` |
| opts.margin | <code>number</code> | default: `cellSize * 4` |
| opts.cellColor | <code>string</code> | Shortcut for `opts.cell.color`, default: `black` |
| opts.backgroundColor | <code>string</code> | Shortcut for `opts.background.color`, default: `white` |
| opts.scalable | <code>boolean</code> | When `true`, omits fixed `width`/`height`; default depends on whether a fixed cell size is provided |
| opts.crispEdges | <code>boolean</code> \| <code>'auto'</code> | default: `auto`; applies `shape-rendering="crispEdges"` automatically for whole-number cell sizes |
| opts.cell | <code>object</code> \| <code>string</code> | Cell styling options; string value is treated as `color` |
| opts.cell.size | <code>number</code> | Cell size, default: `opts.cellSize` or `1` |
| opts.cell.color | <code>string</code> | Cell color, default: `opts.cellColor` or `black` |
| opts.cell.style | <code>string</code> | Inline style for the `<path>` with QR cells |
| opts.cell.class | <code>string</code> | Class for the `<path>` with QR cells, default: `${class}-cells` |
| opts.cell.id | <code>string</code> | Id for the `<path>` with QR cells, default: `${id}-cells` |
| opts.background | <code>object</code> \| <code>string</code> | Background styling options; string value is treated as `color` |
| opts.background.color | <code>string</code> | Background color, default: `opts.backgroundColor` or `white` |
| opts.background.style | <code>string</code> | Inline style for the background `<rect>` |
| opts.background.class | <code>string</code> | Class for the background `<rect>`, default: `${class}-background` |
| opts.background.id | <code>string</code> | Id for the background `<rect>`, default: `${id}-background` |
| opts.title | <code>object</code> \| <code>string</code> | Optional SVG `<title>`; string value is treated as `text` |
| opts.title.text | <code>string</code> | Text content for `<title>` |
| opts.title.id | <code>string</code> | Id for `<title>`, default: `${id}-title` when title text is present |
| opts.alt | <code>object</code> \| <code>string</code> | Optional SVG `<description>`; string value is treated as `text` |
| opts.alt.text | <code>string</code> | Text content for `<description>` |
| opts.alt.id | <code>string</code> | Id for `<description>`, default: `${id}-description` when description text is present |

#### GIF Renderer Options

`gif` uses the same positional color arguments as other visual renderers: `cellSize`, `margin`, `cellColor`, `backgroundColor`. HTML-specific `alt` and `title` are available through the options object form.

| Param | Type | Description |
| ----- | ---- | ----------- |
| cellSize | <code>number</code> | Positional cell size |
| margin | <code>number</code> | Positional outer margin |
| cellColor | <code>string</code> | Positional dark cell color |
| backgroundColor | <code>string</code> | Positional background color |
| opts.cellSize | <code>number</code> | Cell size, default: `2` |
| opts.margin | <code>number</code> | Outer margin, default: `cellSize * 4` |
| opts.cellColor | <code>string</code> | Dark cell color in GIF palette, default: `black` |
| opts.backgroundColor | <code>string</code> | Background color in GIF palette, default: `white` |
| opts.alt | <code>string</code> | `alt` attribute for HTML output |
| opts.title | <code>string</code> | `title` attribute for HTML output |
| opts.tag | <code>boolean</code> \| <code>string</code> | `false` for data URL, `true`/`undefined` for `<img>`, or custom tag name |

```javascript
qr.render('gif', 4, 12, '#182126', '#f4efe7');
qr.render({ renderer: 'gif', tag: false, cellColor: '#182126', backgroundColor: '#f4efe7' });
qr.render({
  renderer: 'gif',
  cellSize: 4,
  margin: 12,
  cellColor: '#182126',
  backgroundColor: 'rgb(244, 239, 231)',
  alt: 'GIF QR',
  title: 'GIF QR'
});
```

#### PNG Renderer Options

`png` mirrors the `gif` renderer API and emits `data:image/png` output or an HTML image tag. The encoder determines the effective palette automatically from the rendered pixels.

| Param | Type | Description |
| ----- | ---- | ----------- |
| cellSize | <code>number</code> | Positional cell size |
| margin | <code>number</code> | Positional outer margin |
| cellColor | <code>string</code> | Positional dark cell color |
| backgroundColor | <code>string</code> | Positional background color |
| opts.cellSize | <code>number</code> | Cell size, default: `2` |
| opts.margin | <code>number</code> | Outer margin, default: `cellSize * 4` |
| opts.cellColor | <code>string</code> | Dark cell color, default: `black` |
| opts.backgroundColor | <code>string</code> | Background color, default: `white` |
| opts.alt | <code>string</code> | `alt` attribute for HTML output |
| opts.title | <code>string</code> | `title` attribute for HTML output |
| opts.tag | <code>boolean</code> \| <code>string</code> | `false` for data URL, `true`/`undefined` for `<img>`, or custom tag name |

```javascript
qr.render('png', 4, 12, '#182126', '#f4efe7');
qr.render({ renderer: 'png', tag: false });
qr.render({
  renderer: 'png',
  cellSize: 4,
  margin: 12,
  cellColor: 'rgba(24, 33, 38, 0.75)',
  backgroundColor: 'transparent',
  alt: 'PNG QR',
  title: 'PNG QR'
});
```

#### Canvas Renderer Options

`canvas` accepts either positional args or an options object after `context`.

| Param | Type | Description |
| ----- | ---- | ----------- |
| context | <code>CanvasRenderingContext2D</code> | Target 2D context |
| cellSize | <code>number</code> | Cell size, default: `2` |
| margin | <code>number</code> | Outer margin, default: `cellSize * 4` |
| cellColor | <code>string</code> | Dark cell color, default: `black` |
| backgroundColor | <code>string</code> | Background color, default: `white` |

```javascript
qr.render('canvas', context, 2, 8, '#000', '#fff');
qr.render('canvas', context, {
  cell: { size: 2, color: '#000' },
  margin: 8,
  background: '#fff'
});
```

## Migration from Legacy API

Legacy rendering helpers from the original API are no longer available in this project. Use `render(...)` with optional renderer plugins instead.

```javascript
// Before
qr.renderTo2dContext(context, 2);
qr.createDataURL(2, 4, '#182126', '#f4efe7');
qr.createImgTag(2, 4, '#182126', '#f4efe7');
qr.createSvgTag(2, 4);
qr.createTableTag(5, 20);
qr.createASCII(1, 2);

// After
qr.render('canvas', context, 2);
qr.render({ renderer: 'gif', cellSize: 2, margin: 4, cellColor: '#182126', backgroundColor: '#f4efe7', tag: false });
qr.render('gif', 2, 4, '#182126', '#f4efe7');
qr.render('svg', 2, 4);
qr.render('table', 5, 20);
qr.render('ascii', 1, 2);
```

--

This implementation is based on JIS X 0510:1999.

The word 'QR Code' is registered trademark of DENSO WAVE INCORPORATED
<br/>http://www.denso-wave.com/qrcode/faqpatent-e.html
