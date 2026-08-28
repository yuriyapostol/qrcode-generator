import a from "../../core/qrcode.mjs";
const v = {}, f = function(e) {
  if (typeof e != "object" || e === null) return !1;
  const n = Object.getPrototypeOf(e);
  return n === Object.prototype || n === null;
}, C = function(e, n) {
  const t = f(e) ? { ...e } : {};
  return typeof n == "string" ? t.color = n : f(n) && Object.assign(t, n), t;
}, y = function(e, n) {
  return f(e[n]) || (e[n] = {}), e[n];
}, k = function(e, n, t) {
  if (n !== "renderer") {
    if (n === "cell" || n === "background") {
      e[n] = C(e[n], t), n === "cell" ? (typeof e.cell.size == "number" && (e.cellSize = e.cell.size), typeof e.cell.color == "string" && (e.cellColor = e.cell.color)) : typeof e.background.color == "string" && (e.backgroundColor = e.background.color);
      return;
    }
    e[n] = t, n === "cellSize" && typeof t == "number" ? y(e, "cell").size = t : n === "cellColor" && typeof t == "string" ? y(e, "cell").color = t : n === "backgroundColor" && typeof t == "string" && (y(e, "background").color = t);
  }
}, R = function(e, n) {
  Object.keys(n).forEach((t) => {
    k(e, t, n[t]);
  });
}, j = function(e) {
  return e.toLowerCase() === "dataurl" ? "dataUrl" : e;
}, A = function(e, n) {
  const t = n.toLowerCase();
  if (t === "dataurl" || t === "html" || t === "element" || t === "canvas" || t === "file") {
    e.output = j(n);
    return;
  }
  if (t === "img" || t === "image") {
    e.output = "html", e.tagName = "img";
    return;
  }
  e.output = n;
}, O = function(e) {
  if (typeof e == "string") {
    const n = e.split(":"), t = {};
    return n.slice(1).forEach((r) => {
      r && A(t, r);
    }), { name: n[0], opts: t };
  }
  if (f(e)) {
    const { renderer: n, type: t, ...r } = e;
    return { name: n || t, opts: r };
  }
  return { name: void 0, opts: {} };
}, w = function(e) {
  return typeof e?.tagName == "string" ? e.tagName.toLowerCase() : void 0;
}, u = function(e, n) {
  if (typeof e?.getAttribute != "function") return;
  const t = e.getAttribute(n);
  return t === null ? void 0 : t;
}, N = function(e, n) {
  const t = u(e, n);
  if (typeof t > "u" || t === "") return;
  const r = Number(t);
  return Number.isFinite(r) ? r : void 0;
}, L = function(e, n) {
  const t = u(e, n);
  if (typeof t > "u" || t === "") return;
  const r = t.toLowerCase();
  if (r === "true") return !0;
  if (r === "false") return !1;
  const o = Number(t);
  return Number.isFinite(o) ? o : t;
}, S = function(e, n) {
  const t = u(e, n);
  if (!(typeof t > "u" || t === ""))
    return JSON.parse(t);
}, s = function(e) {
  return `data-qrcode-${e}`;
}, z = function(e) {
  const n = {};
  if (!e) return n;
  const t = w(e);
  t && (n.tagName = t);
  const r = u(e, s("renderer")), o = u(e, s("output")), c = u(e, s("tag-name")), l = N(e, s("cell-size")), i = N(e, s("margin")), d = u(e, s("cell-color")), p = u(e, s("background-color")), m = u(e, "alt"), b = u(e, "title");
  if (r) {
    const g = O(r);
    g.name && (n.renderer = g.name), Object.assign(n, g.opts);
  }
  return o && (n.output = j(o)), c && (n.tagName = c), typeof l == "number" && (n.cellSize = l), typeof i == "number" && (n.margin = i), d && (n.cellColor = d), p && (n.backgroundColor = p), m && (n.alt = m), b && (n.title = b), !n.renderer && t === "canvas" && (n.renderer = "canvas"), !n.renderer && t === "img" && (n.renderer = "png"), !n.output && t === "canvas" && (n.output = "canvas"), !n.output && t === "img" && (n.output = "element"), !n.context && t === "canvas" && typeof e.getContext == "function" && (n.context = e.getContext("2d")), n;
}, h = function(e) {
  const n = {};
  if (!e) return n;
  const t = N(e, s("type-number")), r = u(e, s("error-correction-level")), o = u(e, s("value")) || u(e, s("data")), c = u(e, s("mode")), l = u(e, s("encoding")), i = L(e, s("eci")), d = S(e, s("segments"));
  return typeof t == "number" && (n.typeNumber = t), r && (n.errorCorrectionLevel = r), d ? n.data = d : typeof o == "string" && (n.data = o), c && (n.mode = c), (l || typeof i < "u") && (n.opts = {}, l && (n.opts.encoding = l), typeof i < "u" && (n.opts.eci = i)), n;
}, T = function(e, n) {
  return !e.type || e.type === "any" ? !0 : e.type === "object" ? typeof n == "object" && n !== null : typeof n === e.type;
}, x = function(e, n, t) {
  for (let r = 0; r < e.length; r += 1)
    if (typeof n[e[r].name] > "u" && T(e[r], t))
      return e[r];
  return null;
}, E = function(e, n, t, r) {
  const o = { renderer: e }, c = n.args || [];
  return r && R(o, r), t.forEach((l) => {
    const i = x(c, o, l);
    if (f(l) && !i?.positionalOnly) {
      R(o, l);
      return;
    }
    i && k(o, i.name, l);
  }), typeof o.cell == "string" || f(o.cell) ? o.cell = C(void 0, o.cell) : f(o.cell) || (o.cell = {}), typeof o.background == "string" || f(o.background) ? o.background = C(void 0, o.background) : f(o.background) || (o.background = {}), typeof o.cellSize == "number" && typeof o.cell.size != "number" && (o.cell.size = o.cellSize), typeof o.cell.size == "number" && typeof o.cellSize != "number" && (o.cellSize = o.cell.size), typeof o.cellColor == "string" && typeof o.cell.color != "string" && (o.cell.color = o.cellColor), typeof o.cell.color == "string" && typeof o.cellColor != "string" && (o.cellColor = o.cell.color), typeof o.backgroundColor == "string" && typeof o.background.color != "string" && (o.background.color = o.backgroundColor), typeof o.background.color == "string" && typeof o.backgroundColor != "string" && (o.backgroundColor = o.background.color), o;
}, Q = function(e, n) {
  e.render = function(t, ...r) {
    let o, c;
    if (typeof t == "string") {
      const i = O(t);
      o = i.name, c = i.opts;
    } else if (f(t) && t?.renderer) {
      const i = t, { renderer: d, ...p } = i, m = O(d), b = z(p.target);
      o = m.name || b.renderer, c = { ...b, ...m.opts, ...p };
    } else if (f(t)) {
      const i = t, d = z(i.target);
      o = d.renderer, c = { ...d, ...i };
    }
    if (!o) return "[QRCode Object]";
    const l = n.getRenderer(o);
    if (!l)
      throw "unknown renderer: " + o;
    return e.make(), l.render.call(e, E(o, l, r, c));
  };
};
a.registerRenderer = function(e, n) {
  v[e] = n;
};
a.getRenderer = function(e) {
  return v[e];
};
a.render = function(e) {
  const t = { ...h(e?.target), ...e || {} }, r = typeof t.typeNumber == "number" ? t.typeNumber : 0, o = t.errorCorrectionLevel || "L", c = a(r, o);
  if (typeof t.data == "string")
    c.addData(t.data, t.mode, t.opts);
  else if (Array.isArray(t.data))
    c.addData(t.data);
  else
    throw "data is required";
  return c.render(t);
};
a.use(Q);
const D = a.registerRenderer, F = a.getRenderer;
export {
  F as getRenderer,
  D as registerRenderer
};
//# sourceMappingURL=registry.mjs.map
