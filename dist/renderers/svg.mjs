import M from "../core/qrcode.mjs";
import { escapeXml as s } from "./utils/xml.mjs";
M.registerRenderer("svg", function(n, f, b, m) {
  let e = {};
  typeof n == "object" && (e = n || {}, n = void 0);
  const d = e.id || "qrcode", $ = e.class || "qrcode", h = e.style || "";
  let t = e.cell || {};
  typeof t == "string" && (t = { color: t }), (typeof t != "object" || !t) && (t = {});
  const v = typeof e.scalable < "u" ? e.scalable : !(typeof n == "number" || typeof e.cellSize == "number" || typeof t.size == "number"), x = typeof e.crispEdges < "u" ? e.crispEdges : "auto";
  typeof n == "number" && (t.size = n), typeof t.size != "number" && (t.size = typeof e.cellSize == "number" ? e.cellSize : 1), typeof b == "string" && (t.color = b), typeof t.color != "string" && (t.color = typeof e.cellColor == "string" ? e.cellColor : "black"), typeof t.style != "string" && (t.style = ""), typeof t.class != "string" && (t.class = `${$}-cells`), typeof t.id != "string" && (t.id = `${d}-cells`), typeof f > "u" && (f = e.margin), typeof f != "number" && (f = typeof f > "u" ? t.size * 4 : 0);
  let i = e.background || {};
  typeof i == "string" && (i = { color: i }), (typeof i != "object" || !i) && (i = {}), typeof m == "string" && (i.color = m), typeof i.color != "string" && (i.color = typeof e.backgroundColor == "string" ? e.backgroundColor : "white"), typeof i.style != "string" && (i.style = ""), typeof i.class != "string" && (i.class = `${$}-background`), typeof i.id != "string" && (i.id = `${d}-background`);
  let r = typeof e.alt == "string" ? { text: e.alt } : e.alt || {};
  r.id = r.text ? r.id || `${d}-description` : null;
  let c = typeof e.title == "string" ? { text: e.title } : e.title || {};
  c.id = c.text ? c.id || `${d}-title` : null;
  const g = Number(this.getModuleCount()), l = Number(t.size), u = Number(f), p = g * l + u * 2;
  let o = "";
  const w = `l${l},0 0,${l} -${l},0 0,-${l}z `;
  o += '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"', o += v ? "" : ` width="${p}px" height="${p}px"`, o += ` viewBox="0 0 ${p} ${p}" preserveAspectRatio="xMinYMin meet" id="${s(d)}" class="${s($)}" style="${s(h)}"`, o += x === !0 || x === "auto" && Math.abs(l - Math.round(l)) < 1e-3 ? ' shape-rendering="crispEdges"' : "", o += c.text || r.text ? ` role="img" aria-labelledby="${s([c.id, r.id].join(" ").trim())}"` : "", o += ">", c.text && (o += `<title id="${s(c.id)}">${s(c.text)}</title>`), r.text && (o += `<description id="${s(r.id)}">${s(r.text)}</description>`), o += `<rect id="${s(i.id)}"${i.class ? ` class="${s(i.class)}"` : ""}${i.style ? ` style="${s(i.style)}"` : ""} width="100%" height="100%"${i.color ? ` fill="${i.color}"` : ""}/>`, o += `<path id="${s(t.id)}"${t.class ? ` class="${s(t.class)}"` : ""}${t.style ? ` style="${s(t.style)}"` : ""} d="`;
  for (let y = 0; y < g; y += 1) {
    const z = y * l + u;
    for (let a = 0; a < g; a += 1)
      if (this.isDark(y, a)) {
        const k = a * l + u;
        o += `M${k},${z}${w}`;
      }
  }
  return o += `"${t.color ? ` fill="${t.color}"` : ""}/></svg>`, o;
});
//# sourceMappingURL=svg.mjs.map
