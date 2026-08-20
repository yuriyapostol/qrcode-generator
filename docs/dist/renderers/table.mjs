import { registerRenderer as g } from "./utils/registry.mjs";
g("table", {
  args: [
    { name: "cellSize", type: "number" },
    { name: "margin", type: "number" },
    { name: "cellColor", type: "string" },
    { name: "backgroundColor", type: "string" }
  ],
  render: function(n) {
    let o = n.cell || {};
    typeof o == "string" && (o = { color: o }), (typeof o != "object" || !o) && (o = {}), typeof o.size != "number" && (o.size = typeof n.cellSize == "number" ? n.cellSize : 1), typeof o.color != "string" && (o.color = typeof n.cellColor == "string" ? n.cellColor : "black");
    let d = n.margin;
    typeof d != "number" && (d = typeof d > "u" ? o.size * 4 : 0);
    let l = n.background || {};
    typeof l == "string" && (l = { color: l }), (typeof l != "object" || !l) && (l = {}), typeof l.color != "string" && (l.color = typeof n.backgroundColor == "string" ? n.backgroundColor : "white");
    const t = Number(this.getModuleCount()), i = Number(o.size), r = Number(d), c = (a, p) => `<td style="border: none; border-collapse: collapse; padding: 0px; margin: 0px; width: ${a}px; height: ${p}px; background-color: ${l.color};"/>`;
    let e = `<table style="border: none; border-collapse: collapse; border-spacing: 0px; padding: 0px; margin: 0px; background-color: ${l.color};"><tbody>`;
    r > 0 && (e += "<tr>", e += c(r, r), e += `<td colspan="${t}" style="border: none; border-collapse: collapse; padding: 0px; margin: 0px; width: ${t * i}px; height: ${r}px; background-color: ${l.color};"/>`, e += c(r, r), e += "</tr>");
    for (let a = 0; a < t; a += 1) {
      e += "<tr>", r > 0 && (e += c(r, i));
      for (let p = 0; p < t; p += 1)
        e += `<td style="border: none; border-collapse: collapse; padding: 0px; margin: 0px; width: ${i}px; height: ${i}px; background-color: ${this.isDark(a, p) ? o.color : "transparent"};"/>`;
      r > 0 && (e += c(r, i)), e += "</tr>";
    }
    return r > 0 && (e += "<tr>", e += c(r, r), e += `<td colspan="${t}" style="border: none; border-collapse: collapse; padding: 0px; margin: 0px; width: ${t * i}px; height: ${r}px; background-color: ${l.color};"/>`, e += c(r, r), e += "</tr>"), e += "</tbody></table>", e;
  }
});
//# sourceMappingURL=table.mjs.map
