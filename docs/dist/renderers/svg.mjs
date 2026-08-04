import M from "../core/qrcode.mjs";
M.registerRenderer("svg", function(n, c, k, m) {
  let i = {};
  typeof n == "object" && (i = n || {}, n = void 0);
  const p = i.id || "qrcode", a = i.class || "qrcode", h = i.style || "";
  let t = i.cell || {};
  typeof t == "string" && (t = { fill: t }), (typeof t != "object" || !t) && (t = {});
  const v = typeof i.scalable < "u" ? i.scalable : !(typeof n == "number" || typeof i.cellSize == "number" || typeof t.size == "number"), x = typeof i.crispEdges < "u" ? i.crispEdges : "auto";
  typeof n == "number" && (t.size = n), typeof t.size != "number" && (t.size = typeof i.cellSize == "number" ? i.cellSize : 1), typeof k == "string" && (t.fill = k), typeof t.fill != "string" && (t.fill = typeof i.cellColor == "string" ? i.cellColor : "black"), typeof t.stroke != "string" && (t.stroke = "none"), typeof t.style != "string" && (t.style = ""), typeof t.class != "string" && (t.class = `${a}-cells`), typeof t.id != "string" && (t.id = `${p}-cells`), typeof c > "u" && (c = i.margin), typeof c != "number" && (c = typeof c > "u" ? t.size * 4 : 0);
  let e = i.background || {};
  typeof e == "string" && (e = { fill: e }), (typeof e != "object" || !e) && (e = {}), typeof m == "string" && (e.fill = m), typeof e.fill != "string" && (e.fill = typeof i.backgroundColor == "string" ? i.backgroundColor : "white"), typeof e.stroke != "string" && (e.stroke = "none"), typeof e.style != "string" && (e.style = ""), typeof e.class != "string" && (e.class = `${a}-background`), typeof e.id != "string" && (e.id = `${p}-background`);
  let r = typeof i.alt == "string" ? { text: i.alt } : i.alt || {};
  r.id = r.text ? r.id || `${p}-description` : null;
  let f = typeof i.title == "string" ? { text: i.title } : i.title || {};
  f.id = f.text ? f.id || `${p}-title` : null;
  const s = (d) => d.replace(
    /[<>&"]/g,
    (b) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" })[b]
  ), g = Number(this.getModuleCount()), o = Number(t.size), u = Number(c), y = g * o + u * 2;
  let l = "";
  const w = `l${o},0 0,${o} -${o},0 0,-${o}z `;
  l += '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"', l += v ? "" : ` width="${y}px" height="${y}px"`, l += ` viewBox="0 0 ${y} ${y}" preserveAspectRatio="xMinYMin meet" id="${s(p)}" class="${s(a)}" style="${s(h)}"`, l += x === !0 || x === "auto" && Math.abs(o - Math.round(o)) < 1e-3 ? ' shape-rendering="crispEdges"' : "", l += f.text || r.text ? ` role="img" aria-labelledby="${s([f.id, r.id].join(" ").trim())}"` : "", l += ">", f.text && (l += `<title id="${s(f.id)}">${s(f.text)}</title>`), r.text && (l += `<description id="${s(r.id)}">${s(r.text)}</description>`), l += `<rect id="${s(e.id)}"${e.class ? ` class="${s(e.class)}"` : ""}${e.style ? ` style="${s(e.style)}"` : ""} width="100%" height="100%"${e.fill ? ` fill="${e.fill}"` : ""}${e.stroke ? ` stroke="${e.stroke}"` : ""}/>`, l += `<path id="${s(t.id)}"${t.class ? ` class="${s(t.class)}"` : ""}${t.style ? ` style="${s(t.style)}"` : ""} d="`;
  for (let d = 0; d < g; d += 1) {
    const b = d * o + u;
    for (let $ = 0; $ < g; $ += 1)
      if (this.isDark(d, $)) {
        const z = $ * o + u;
        l += `M${z},${b}${w}`;
      }
  }
  return l += `"${t.fill ? ` fill="${t.fill}"` : ""}${t.stroke ? ` stroke="${t.stroke}"` : ""}/></svg>`, l;
});
//# sourceMappingURL=svg.mjs.map
