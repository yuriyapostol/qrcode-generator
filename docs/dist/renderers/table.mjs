import g from "../core/qrcode.mjs";
g.registerRenderer("table", function(d, p, a, b) {
  let l = {};
  typeof d == "object" && (l = d || {}, d = void 0);
  let r = l.cell || {};
  typeof r == "string" && (r = { color: r }), (typeof r != "object" || !r) && (r = {}), typeof d == "number" && (r.size = d), typeof r.size != "number" && (r.size = typeof l.cellSize == "number" ? l.cellSize : 1), typeof a == "string" && (r.color = a), typeof r.color != "string" && (r.color = typeof l.cellColor == "string" ? l.cellColor : "black"), typeof p > "u" && (p = l.margin), typeof p != "number" && (p = typeof p > "u" ? r.size * 4 : 0);
  let t = l.background || {};
  typeof t == "string" && (t = { color: t }), (typeof t != "object" || !t) && (t = {}), typeof b == "string" && (t.color = b), typeof t.color != "string" && (t.color = typeof l.backgroundColor == "string" ? l.backgroundColor : "white");
  const i = Number(this.getModuleCount()), n = Number(r.size), e = Number(p), c = (s, f) => `<td style="border: none; border-collapse: collapse; padding: 0px; margin: 0px; width: ${s}px; height: ${f}px; background-color: ${t.color};"/>`;
  let o = `<table style="border: none; border-collapse: collapse; border-spacing: 0px; padding: 0px; margin: 0px; background-color: ${t.color};"><tbody>`;
  e > 0 && (o += "<tr>", o += c(e, e), o += `<td colspan="${i}" style="border: none; border-collapse: collapse; padding: 0px; margin: 0px; width: ${i * n}px; height: ${e}px; background-color: ${t.color};"/>`, o += c(e, e), o += "</tr>");
  for (let s = 0; s < i; s += 1) {
    o += "<tr>", e > 0 && (o += c(e, n));
    for (let f = 0; f < i; f += 1)
      o += `<td style="border: none; border-collapse: collapse; padding: 0px; margin: 0px; width: ${n}px; height: ${n}px; background-color: ${this.isDark(s, f) ? r.color : "transparent"};"/>`;
    e > 0 && (o += c(e, n)), o += "</tr>";
  }
  return e > 0 && (o += "<tr>", o += c(e, e), o += `<td colspan="${i}" style="border: none; border-collapse: collapse; padding: 0px; margin: 0px; width: ${i * n}px; height: ${e}px; background-color: ${t.color};"/>`, o += c(e, e), o += "</tr>"), o += "</tbody></table>", o;
});
//# sourceMappingURL=table.mjs.map
