import { registerRenderer as y } from "./utils/registry.mjs";
y("canvas", {
  args: [
    { name: "context", type: "object", positionalOnly: !0 },
    { name: "cellSize", type: "number" },
    { name: "margin", type: "number" },
    { name: "cellColor", type: "string" },
    { name: "backgroundColor", type: "string" }
  ],
  render: function(e) {
    const l = e.context;
    let t = e.cellSize, r = e.margin, c = e.cellColor, a = e.backgroundColor;
    typeof t != "number" && (t = typeof e.cellSize == "number" ? e.cellSize : 2), typeof r > "u" && (r = e.margin), typeof r != "number" && (r = typeof r > "u" ? t * 4 : 0), typeof c != "string" && (c = typeof e.cellColor == "string" ? e.cellColor : "black"), typeof a != "string" && (a = typeof e.backgroundColor == "string" ? e.backgroundColor : "white");
    const f = Number(this.getModuleCount()), n = Number(t), u = Number(r), g = f * n + u * 2;
    l.fillStyle = a, l.fillRect(0, 0, g, g), l.fillStyle = c;
    for (let o = 0; o < f; o += 1) {
      const m = o * n + u;
      for (let i = 0; i < f; i += 1)
        this.isDark(o, i) && l.fillRect(i * n + u, m, n, n);
    }
    return e.target || l.canvas || l;
  }
});
//# sourceMappingURL=canvas.mjs.map
