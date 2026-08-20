import f from "../../core/qrcode.mjs";
const b = {}, t = function(o) {
  if (typeof o != "object" || o === null) return !1;
  const n = Object.getPrototypeOf(o);
  return n === Object.prototype || n === null;
}, d = function(o, n) {
  const r = t(o) ? { ...o } : {};
  return typeof n == "string" ? r.color = n : t(n) && Object.assign(r, n), r;
}, u = function(o, n) {
  return t(o[n]) || (o[n] = {}), o[n];
}, g = function(o, n, r) {
  if (n !== "renderer") {
    if (n === "cell" || n === "background") {
      o[n] = d(o[n], r), n === "cell" ? (typeof o.cell.size == "number" && (o.cellSize = o.cell.size), typeof o.cell.color == "string" && (o.cellColor = o.cell.color)) : typeof o.background.color == "string" && (o.backgroundColor = o.background.color);
      return;
    }
    o[n] = r, n === "cellSize" && typeof r == "number" ? u(o, "cell").size = r : n === "cellColor" && typeof r == "string" ? u(o, "cell").color = r : n === "backgroundColor" && typeof r == "string" && (u(o, "background").color = r);
  }
}, p = function(o, n) {
  Object.keys(n).forEach((r) => {
    g(o, r, n[r]);
  });
}, R = function(o, n) {
  return !o.type || o.type === "any" ? !0 : o.type === "object" ? typeof n == "object" && n !== null : typeof n === o.type;
}, m = function(o, n, r) {
  for (let l = 0; l < o.length; l += 1)
    if (typeof n[o[l].name] > "u" && R(o[l], r))
      return o[l];
  return null;
}, z = function(o, n, r, l) {
  const e = { renderer: o }, s = n.args || [];
  return l && p(e, l), r.forEach((c) => {
    const i = m(s, e, c);
    if (t(c) && !i?.positionalOnly) {
      p(e, c);
      return;
    }
    i && g(e, i.name, c);
  }), typeof e.cell == "string" || t(e.cell) ? e.cell = d(void 0, e.cell) : t(e.cell) || (e.cell = {}), typeof e.background == "string" || t(e.background) ? e.background = d(void 0, e.background) : t(e.background) || (e.background = {}), typeof e.cellSize == "number" && typeof e.cell.size != "number" && (e.cell.size = e.cellSize), typeof e.cell.size == "number" && typeof e.cellSize != "number" && (e.cellSize = e.cell.size), typeof e.cellColor == "string" && typeof e.cell.color != "string" && (e.cell.color = e.cellColor), typeof e.cell.color == "string" && typeof e.cellColor != "string" && (e.cellColor = e.cell.color), typeof e.backgroundColor == "string" && typeof e.background.color != "string" && (e.background.color = e.backgroundColor), typeof e.background.color == "string" && typeof e.backgroundColor != "string" && (e.backgroundColor = e.background.color), e;
}, C = function(o, n) {
  o.render = function(r, ...l) {
    let e, s;
    if (typeof r == "string")
      e = r;
    else if (typeof r == "object" && r?.renderer) {
      const { renderer: i, ...y } = r;
      e = i, s = y;
    }
    if (!e) return "[QRCode Object]";
    const c = n.getRenderer(e);
    if (!c)
      throw "unknown renderer: " + e;
    return c.render.call(o, z(e, c, l, s));
  };
};
f.registerRenderer = function(o, n) {
  b[o] = n;
};
f.getRenderer = function(o) {
  return b[o];
};
f.use(C);
const j = f.registerRenderer, k = f.getRenderer;
export {
  k as getRenderer,
  j as registerRenderer
};
//# sourceMappingURL=registry.mjs.map
