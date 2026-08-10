import c from "../core/qrcode.mjs";
c.registerRenderer("canvas", function(i, t, f, s, u) {
  let e = {};
  typeof t == "object" && (e = t || {}, t = void 0), typeof t != "number" && (t = typeof e.cellSize == "number" ? e.cellSize : 2), typeof f > "u" && (f = e.margin), typeof f != "number" && (f = typeof f > "u" ? t * 4 : 0), typeof s != "string" && (s = typeof e.cellColor == "string" ? e.cellColor : "black"), typeof u != "string" && (u = typeof e.backgroundColor == "string" ? e.backgroundColor : "white");
  const y = Number(this.getModuleCount()), o = Number(t), p = Number(f), l = y * o + p * 2;
  i.fillStyle = u, i.fillRect(0, 0, l, l), i.fillStyle = s;
  for (let r = 0; r < y; r += 1) {
    const b = r * o + p;
    for (let n = 0; n < y; n += 1)
      this.isDark(r, n) && i.fillRect(n * o + p, b, o, o);
  }
});
//# sourceMappingURL=canvas.mjs.map
