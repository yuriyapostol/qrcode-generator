import V from "../core/qrcode.mjs";
V.registerRenderer("ascii", function(o, r) {
  if (o = o || 1, o < 2) {
    o = 1, r = typeof r > "u" ? o * 2 : r;
    const h = Number(o), b = Number(r), i = Number(this.getModuleCount()) * h + b * 2, s = b, d = i - b;
    let t, n, p, x, f;
    const D = {
      "██": "█",
      "█ ": "▀",
      " █": "▄",
      "  ": " "
    }, L = {
      "██": "▀",
      "█ ": "▀",
      " █": " ",
      "  ": " "
    };
    let a = "";
    for (t = 0; t < i; t += 2) {
      for (p = Math.floor((t - s) / h), x = Math.floor((t + 1 - s) / h), n = 0; n < i; n += 1)
        f = "█", s <= n && n < d && s <= t && t < d && this.isDark(p, Math.floor((n - s) / h)) && (f = " "), s <= n && n < d && s <= t + 1 && t + 1 < d && this.isDark(x, Math.floor((n - s) / h)) ? f += " " : f += "█", a += b < 1 && t + 1 >= d ? L[f] : D[f];
      a += `
`;
    }
    return i % 2 && b > 0 ? a.substring(0, a.length - i - 1) + Array(i + 1).join("▀") : a.substring(0, a.length - 1);
  }
  o -= 1, r = typeof r > "u" ? o * 2 : r;
  const l = Number(o), M = Number(r), y = Number(this.getModuleCount()) * l + M * 2, m = M, g = y - M;
  let e, u, c, N;
  const j = Array(o + 1).join("██"), A = Array(o + 1).join("  ");
  let k = "", C = "";
  for (e = 0; e < y; e += 1) {
    for (c = Math.floor((e - m) / l), C = "", u = 0; u < y; u += 1)
      N = 1, m <= u && u < g && m <= e && e < g && this.isDark(c, Math.floor((u - m) / l)) && (N = 0), C += N ? j : A;
    for (c = 0; c < o; c += 1)
      k += C + `
`;
  }
  return k.substring(0, k.length - 1);
});
//# sourceMappingURL=ascii.mjs.map
