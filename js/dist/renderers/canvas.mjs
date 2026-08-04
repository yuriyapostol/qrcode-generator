import s from "../core/qrcode.mjs";
s.registerRenderer("canvas", function(f, t) {
  t = t || 2;
  const n = this.getModuleCount();
  for (let r = 0; r < n; r += 1)
    for (let o = 0; o < n; o += 1)
      f.fillStyle = this.isDark(r, o) ? "black" : "white", f.fillRect(o * t, r * t, t, t);
});
//# sourceMappingURL=canvas.mjs.map
