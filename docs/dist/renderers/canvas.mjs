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
    const r = e.context;
    let o = e.cellSize, l = e.margin, c = e.cellColor, f = e.backgroundColor;
    typeof o != "number" && (o = typeof e.cellSize == "number" ? e.cellSize : 2), typeof l > "u" && (l = e.margin), typeof l != "number" && (l = typeof l > "u" ? o * 4 : 0), typeof c != "string" && (c = typeof e.cellColor == "string" ? e.cellColor : "black"), typeof f != "string" && (f = typeof e.backgroundColor == "string" ? e.backgroundColor : "white");
    const a = Number(this.getModuleCount()), n = Number(o), u = Number(l), m = a * n + u * 2;
    r.fillStyle = f, r.fillRect(0, 0, m, m), r.fillStyle = c;
    for (let t = 0; t < a; t += 1) {
      const g = t * n + u;
      for (let i = 0; i < a; i += 1)
        this.isDark(t, i) && r.fillRect(i * n + u, g, n, n);
    }
  }
});
//# sourceMappingURL=canvas.mjs.map
