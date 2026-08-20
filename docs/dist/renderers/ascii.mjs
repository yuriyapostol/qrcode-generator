import { registerRenderer as L } from "./utils/registry.mjs";
L("ascii", {
  args: [
    { name: "cellSize", type: "number" },
    { name: "margin", type: "number" }
  ],
  render: function(S) {
    let e = S.cellSize, o = S.margin;
    if (e = e || 1, e < 2) {
      e = 1, o = typeof o > "u" ? e * 2 : o;
      const m = Number(e), f = Number(o), l = Number(this.getModuleCount()) * m + f * 2, r = f, g = l - f;
      let t, n, p, C, u;
      const A = {
        "██": "█",
        "█ ": "▀",
        " █": "▄",
        "  ": " "
      }, D = {
        "██": "▀",
        "█ ": "▀",
        " █": " ",
        "  ": " "
      };
      let a = "";
      for (t = 0; t < l; t += 2) {
        for (p = Math.floor((t - r) / m), C = Math.floor((t + 1 - r) / m), n = 0; n < l; n += 1)
          u = "█", r <= n && n < g && r <= t && t < g && this.isDark(p, Math.floor((n - r) / m)) && (u = " "), r <= n && n < g && r <= t + 1 && t + 1 < g && this.isDark(C, Math.floor((n - r) / m)) ? u += " " : u += "█", a += f < 1 && t + 1 >= g ? D[u] : A[u];
        a += `
`;
      }
      return l % 2 && f > 0 ? a.substring(0, a.length - l - 1) + Array(l + 1).join("▀") : a.substring(0, a.length - 1);
    }
    e -= 1, o = typeof o > "u" ? e * 2 : o;
    const b = Number(e), d = Number(o), y = Number(this.getModuleCount()) * b + d * 2, h = d, k = y - d;
    let i, s, c, z;
    const x = Array(e + 1).join("██"), j = Array(e + 1).join("  ");
    let M = "", N = "";
    for (i = 0; i < y; i += 1) {
      for (c = Math.floor((i - h) / b), N = "", s = 0; s < y; s += 1)
        z = 1, h <= s && s < k && h <= i && i < k && this.isDark(c, Math.floor((s - h) / b)) && (z = 0), N += z ? x : j;
      for (c = 0; c < e; c += 1)
        M += N + `
`;
    }
    return M.substring(0, M.length - 1);
  }
});
//# sourceMappingURL=ascii.mjs.map
