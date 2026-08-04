const W = {}, q = {}, tt = {}, k = function(r, A) {
  let p = r;
  const i = j[A];
  let g = null, a = 0, n = null;
  const s = [], u = function(e, l) {
    a = p * 4 + 17, g = (function(t) {
      const c = new Array(t);
      for (let o = 0; o < t; o += 1) {
        c[o] = new Array(t);
        for (let w = 0; w < t; w += 1)
          c[o][w] = null;
      }
      return c;
    })(a), h(0, 0), h(a - 7, 0), h(0, a - 7), f(), d(), v(e, l), p >= 7 && T(e), n == null && (n = _(p, i, s)), J(n, l);
  }, h = function(e, l) {
    for (let t = -1; t <= 7; t += 1)
      if (!(e + t <= -1 || a <= e + t))
        for (let c = -1; c <= 7; c += 1)
          l + c <= -1 || a <= l + c || (0 <= t && t <= 6 && (c == 0 || c == 6) || 0 <= c && c <= 6 && (t == 0 || t == 6) || 2 <= t && t <= 4 && 2 <= c && c <= 4 ? g[e + t][l + c] = !0 : g[e + t][l + c] = !1);
  }, U = function() {
    let e = 0, l = 0;
    for (let t = 0; t < 8; t += 1) {
      u(!0, t);
      const c = x.getLostPoint(F);
      (t == 0 || e > c) && (e = c, l = t);
    }
    return l;
  }, d = function() {
    for (let e = 8; e < a - 8; e += 1)
      g[e][6] == null && (g[e][6] = e % 2 == 0);
    for (let e = 8; e < a - 8; e += 1)
      g[6][e] == null && (g[6][e] = e % 2 == 0);
  }, f = function() {
    const e = x.getPatternPosition(p);
    for (let l = 0; l < e.length; l += 1)
      for (let t = 0; t < e.length; t += 1) {
        const c = e[l], o = e[t];
        if (g[c][o] == null)
          for (let w = -2; w <= 2; w += 1)
            for (let L = -2; L <= 2; L += 1)
              w == -2 || w == 2 || L == -2 || L == 2 || w == 0 && L == 0 ? g[c + w][o + L] = !0 : g[c + w][o + L] = !1;
      }
  }, T = function(e) {
    const l = x.getBCHTypeNumber(p);
    for (let t = 0; t < 18; t += 1) {
      const c = !e && (l >> t & 1) == 1;
      g[Math.floor(t / 3)][t % 3 + a - 8 - 3] = c;
    }
    for (let t = 0; t < 18; t += 1) {
      const c = !e && (l >> t & 1) == 1;
      g[t % 3 + a - 8 - 3][Math.floor(t / 3)] = c;
    }
  }, v = function(e, l) {
    const t = i << 3 | l, c = x.getBCHTypeInfo(t);
    for (let o = 0; o < 15; o += 1) {
      const w = !e && (c >> o & 1) == 1;
      o < 6 ? g[o][8] = w : o < 8 ? g[o + 1][8] = w : g[a - 15 + o][8] = w;
    }
    for (let o = 0; o < 15; o += 1) {
      const w = !e && (c >> o & 1) == 1;
      o < 8 ? g[8][a - o - 1] = w : o < 9 ? g[8][15 - o - 1 + 1] = w : g[8][15 - o - 1] = w;
    }
    g[a - 8][8] = !e;
  }, J = function(e, l) {
    let t = -1, c = a - 1, o = 7, w = 0;
    const L = x.getMaskFunction(l);
    for (let P = a - 1; P > 0; P -= 2)
      for (P == 6 && (P -= 1); ; ) {
        for (let R = 0; R < 2; R += 1)
          if (g[c][P - R] == null) {
            let m = !1;
            w < e.length && (m = (e[w] >>> o & 1) == 1), L(c, P - R) && (m = !m), g[c][P - R] = m, o -= 1, o == -1 && (w += 1, o = 7);
          }
        if (c += t, c < 0 || a <= c) {
          c -= t, t = -t;
          break;
        }
      }
  }, E = function(e, l) {
    let t = 0, c = 0, o = 0;
    const w = new Array(l.length), L = new Array(l.length);
    for (let D = 0; D < l.length; D += 1) {
      const C = l[D].dataCount, G = l[D].totalCount - C;
      c = Math.max(c, C), o = Math.max(o, G), w[D] = new Array(C);
      for (let N = 0; N < w[D].length; N += 1)
        w[D][N] = 255 & e.getBuffer()[N + t];
      t += C;
      const Y = x.getErrorCorrectPolynomial(G), $ = K(w[D], Y.getLength() - 1).mod(Y);
      L[D] = new Array(Y.getLength() - 1);
      for (let N = 0; N < L[D].length; N += 1) {
        const X = N + $.getLength() - L[D].length;
        L[D][N] = X >= 0 ? $.getAt(X) : 0;
      }
    }
    let P = 0;
    for (let D = 0; D < l.length; D += 1)
      P += l[D].totalCount;
    const R = new Array(P);
    let m = 0;
    for (let D = 0; D < c; D += 1)
      for (let C = 0; C < l.length; C += 1)
        D < w[C].length && (R[m] = w[C][D], m += 1);
    for (let D = 0; D < o; D += 1)
      for (let C = 0; C < l.length; C += 1)
        D < L[C].length && (R[m] = L[C][D], m += 1);
    return R;
  }, _ = function(e, l, t) {
    const c = Z.getRSBlocks(e, l), o = z();
    for (let L = 0; L < t.length; L += 1) {
      const P = t[L];
      o.put(P.getMode(), 4), P.getMode() !== y.MODE_ECI && o.put(P.getLength(), x.getLengthInBits(P.getMode(), e)), P.write(o);
    }
    let w = 0;
    for (let L = 0; L < c.length; L += 1)
      w += c[L].dataCount;
    if (o.getLengthInBits() > w * 8)
      throw "code length overflow. (" + o.getLengthInBits() + ">" + w * 8 + ")";
    for (o.getLengthInBits() + 4 <= w * 8 && o.put(0, 4); o.getLengthInBits() % 8 != 0; )
      o.putBit(!1);
    for (; !(o.getLengthInBits() >= w * 8 || (o.put(236, 8), o.getLengthInBits() >= w * 8)); )
      o.put(17, 8);
    return E(o, c);
  }, I = function(e, l) {
    if (typeof l?.encoding == "string")
      return l.encoding;
    const t = k.getDefaultEncoding(e);
    if (typeof t == "string")
      return t;
    if (e === "Byte" && k.getEncoder("UTF-8"))
      return "UTF-8";
    if (e === "Kanji" && k.getEncoder("SJIS"))
      return "SJIS";
  }, Q = function(e, l) {
    const t = I(e, l);
    if (!t)
      return;
    const c = k.getEncoder(t);
    if (!c)
      throw "unknown encoding: " + t;
    if (c.modes && c.modes.indexOf(e) < 0)
      throw "encoding not supported for mode: " + e + "/" + t;
    return c;
  }, b = function(e, l) {
    let t;
    if (typeof e?.eci == "number")
      t = e.eci;
    else if (e?.eci === !0 && (t = l.eci, typeof t != "number"))
      throw "eci not supported for encoding";
    typeof t == "number" && s.push(rt(t));
  }, F = {
    addData: function(e, l, t) {
      l = l || "Byte";
      let c = null;
      switch (l) {
        case "Numeric":
          if (typeof t < "u")
            throw "options not supported for mode:" + l;
          c = nt(e);
          break;
        case "Alphanumeric":
          if (typeof t < "u")
            throw "options not supported for mode:" + l;
          c = et(e);
          break;
        case "Byte": {
          const o = Q("Byte", t);
          if (o)
            b(t, o), c = V(e, o.encode);
          else {
            if (typeof t?.eci < "u")
              throw "eci not supported without encoding";
            c = V(e);
          }
          break;
        }
        case "Kanji": {
          const o = Q("Kanji", t);
          if (!o)
            throw "sjis not supported.";
          b(t, o), c = ot(e, o.encode);
          break;
        }
        default:
          throw "mode:" + l;
      }
      s.push(c), n = null;
    },
    isDark: function(e, l) {
      if (e < 0 || a <= e || l < 0 || a <= l)
        throw e + "," + l;
      return g[e][l];
    },
    getModuleCount: function() {
      return a;
    },
    make: function() {
      if (p < 1) {
        let e = 1;
        for (; e < 40; e++) {
          const l = Z.getRSBlocks(e, i), t = z();
          for (let o = 0; o < s.length; o++) {
            const w = s[o];
            t.put(w.getMode(), 4), w.getMode() !== y.MODE_ECI && t.put(w.getLength(), x.getLengthInBits(w.getMode(), e)), w.write(t);
          }
          let c = 0;
          for (let o = 0; o < l.length; o++)
            c += l[o].dataCount;
          if (t.getLengthInBits() <= c * 8)
            break;
        }
        p = e;
      }
      u(!1, U());
    },
    render: function(e, ...l) {
      let t, c = l;
      if (typeof e == "string")
        t = e;
      else if (typeof e == "object" && e?.renderer) {
        const { renderer: w, ...L } = e;
        t = w, c = [L];
      }
      if (!t) return "[QRCode Object]";
      const o = k.getRenderer(t);
      if (!o)
        throw "unknown renderer: " + t;
      return o.apply(F, c);
    }
  };
  return F;
};
k.registerEncoder = function(r, A) {
  q[r] = A;
};
k.getEncoder = function(r) {
  return q[r];
};
k.setDefaultEncoding = function(r, A) {
  if (!k.getEncoder(A))
    throw "unknown encoding: " + A;
  tt[r] = A;
};
k.getDefaultEncoding = function(r) {
  return tt[r];
};
k.registerRenderer = function(r, A) {
  W[r] = A;
};
k.getRenderer = function(r) {
  return W[r];
};
k.stringToBytes = function(r) {
  const A = [];
  for (let M = 0; M < r.length; M += 1) {
    const B = r.charCodeAt(M);
    A.push(B & 255);
  }
  return A;
};
const y = {
  MODE_NUMBER: 1,
  MODE_ALPHA_NUM: 2,
  MODE_8BIT_BYTE: 4,
  MODE_ECI: 7,
  MODE_KANJI: 8
}, j = {
  L: 1,
  M: 0,
  Q: 3,
  H: 2
}, O = {
  PATTERN000: 0,
  PATTERN001: 1,
  PATTERN010: 2,
  PATTERN011: 3,
  PATTERN100: 4,
  PATTERN101: 5,
  PATTERN110: 6,
  PATTERN111: 7
}, x = /* @__PURE__ */ (function() {
  const r = [
    [],
    [6, 18],
    [6, 22],
    [6, 26],
    [6, 30],
    [6, 34],
    [6, 22, 38],
    [6, 24, 42],
    [6, 26, 46],
    [6, 28, 50],
    [6, 30, 54],
    [6, 32, 58],
    [6, 34, 62],
    [6, 26, 46, 66],
    [6, 26, 48, 70],
    [6, 26, 50, 74],
    [6, 30, 54, 78],
    [6, 30, 56, 82],
    [6, 30, 58, 86],
    [6, 34, 62, 90],
    [6, 28, 50, 72, 94],
    [6, 26, 50, 74, 98],
    [6, 30, 54, 78, 102],
    [6, 28, 54, 80, 106],
    [6, 32, 58, 84, 110],
    [6, 30, 58, 86, 114],
    [6, 34, 62, 90, 118],
    [6, 26, 50, 74, 98, 122],
    [6, 30, 54, 78, 102, 126],
    [6, 26, 52, 78, 104, 130],
    [6, 30, 56, 82, 108, 134],
    [6, 34, 60, 86, 112, 138],
    [6, 30, 58, 86, 114, 142],
    [6, 34, 62, 90, 118, 146],
    [6, 30, 54, 78, 102, 126, 150],
    [6, 24, 50, 76, 102, 128, 154],
    [6, 28, 54, 80, 106, 132, 158],
    [6, 32, 58, 84, 110, 136, 162],
    [6, 26, 54, 82, 110, 138, 166],
    [6, 30, 58, 86, 114, 142, 170]
  ], A = 1335, M = 7973, B = 21522, p = function(d) {
    let f = 0;
    for (; d != 0; )
      f += 1, d >>>= 1;
    return f;
  };
  return {
    getBCHTypeInfo: function(d) {
      let f = d << 10;
      for (; p(f) - p(A) >= 0; )
        f ^= A << p(f) - p(A);
      return (d << 10 | f) ^ B;
    },
    getBCHTypeNumber: function(d) {
      let f = d << 12;
      for (; p(f) - p(M) >= 0; )
        f ^= M << p(f) - p(M);
      return d << 12 | f;
    },
    getPatternPosition: function(d) {
      return r[d - 1];
    },
    getMaskFunction: function(d) {
      switch (d) {
        case O.PATTERN000:
          return function(f, T) {
            return (f + T) % 2 == 0;
          };
        case O.PATTERN001:
          return function(f, T) {
            return f % 2 == 0;
          };
        case O.PATTERN010:
          return function(f, T) {
            return T % 3 == 0;
          };
        case O.PATTERN011:
          return function(f, T) {
            return (f + T) % 3 == 0;
          };
        case O.PATTERN100:
          return function(f, T) {
            return (Math.floor(f / 2) + Math.floor(T / 3)) % 2 == 0;
          };
        case O.PATTERN101:
          return function(f, T) {
            return f * T % 2 + f * T % 3 == 0;
          };
        case O.PATTERN110:
          return function(f, T) {
            return (f * T % 2 + f * T % 3) % 2 == 0;
          };
        case O.PATTERN111:
          return function(f, T) {
            return (f * T % 3 + (f + T) % 2) % 2 == 0;
          };
        default:
          throw "bad maskPattern:" + d;
      }
    },
    getErrorCorrectPolynomial: function(d) {
      let f = K([1], 0);
      for (let T = 0; T < d; T += 1)
        f = f.multiply(K([1, S.gexp(T)], 0));
      return f;
    },
    getLengthInBits: function(d, f) {
      if (1 <= f && f < 10)
        switch (d) {
          case y.MODE_NUMBER:
            return 10;
          case y.MODE_ALPHA_NUM:
            return 9;
          case y.MODE_8BIT_BYTE:
            return 8;
          case y.MODE_KANJI:
            return 8;
          default:
            throw "mode:" + d;
        }
      else if (f < 27)
        switch (d) {
          case y.MODE_NUMBER:
            return 12;
          case y.MODE_ALPHA_NUM:
            return 11;
          case y.MODE_8BIT_BYTE:
            return 16;
          case y.MODE_KANJI:
            return 10;
          default:
            throw "mode:" + d;
        }
      else if (f < 41)
        switch (d) {
          case y.MODE_NUMBER:
            return 14;
          case y.MODE_ALPHA_NUM:
            return 13;
          case y.MODE_8BIT_BYTE:
            return 16;
          case y.MODE_KANJI:
            return 12;
          default:
            throw "mode:" + d;
        }
      else
        throw "type:" + f;
    },
    getLostPoint: function(d) {
      const f = d.getModuleCount();
      let T = 0;
      for (let E = 0; E < f; E += 1)
        for (let _ = 0; _ < f; _ += 1) {
          let I = 0;
          const Q = d.isDark(E, _);
          for (let b = -1; b <= 1; b += 1)
            if (!(E + b < 0 || f <= E + b))
              for (let H = -1; H <= 1; H += 1)
                _ + H < 0 || f <= _ + H || b == 0 && H == 0 || Q == d.isDark(E + b, _ + H) && (I += 1);
          I > 5 && (T += 3 + I - 5);
        }
      for (let E = 0; E < f - 1; E += 1)
        for (let _ = 0; _ < f - 1; _ += 1) {
          let I = 0;
          d.isDark(E, _) && (I += 1), d.isDark(E + 1, _) && (I += 1), d.isDark(E, _ + 1) && (I += 1), d.isDark(E + 1, _ + 1) && (I += 1), (I == 0 || I == 4) && (T += 3);
        }
      for (let E = 0; E < f; E += 1)
        for (let _ = 0; _ < f - 6; _ += 1)
          d.isDark(E, _) && !d.isDark(E, _ + 1) && d.isDark(E, _ + 2) && d.isDark(E, _ + 3) && d.isDark(E, _ + 4) && !d.isDark(E, _ + 5) && d.isDark(E, _ + 6) && (T += 40);
      for (let E = 0; E < f; E += 1)
        for (let _ = 0; _ < f - 6; _ += 1)
          d.isDark(_, E) && !d.isDark(_ + 1, E) && d.isDark(_ + 2, E) && d.isDark(_ + 3, E) && d.isDark(_ + 4, E) && !d.isDark(_ + 5, E) && d.isDark(_ + 6, E) && (T += 40);
      let v = 0;
      for (let E = 0; E < f; E += 1)
        for (let _ = 0; _ < f; _ += 1)
          d.isDark(_, E) && (v += 1);
      const J = Math.abs(100 * v / f / f - 50) / 5;
      return T += J * 10, T;
    }
  };
})(), S = (function() {
  const r = new Array(256), A = new Array(256);
  for (let i = 0; i < 8; i += 1)
    r[i] = 1 << i;
  for (let i = 8; i < 256; i += 1)
    r[i] = r[i - 4] ^ r[i - 5] ^ r[i - 6] ^ r[i - 8];
  for (let i = 0; i < 255; i += 1)
    A[r[i]] = i;
  return {
    glog: function(i) {
      if (i < 1)
        throw "glog(" + i + ")";
      return A[i];
    },
    gexp: function(i) {
      for (; i < 0; )
        i += 255;
      for (; i >= 256; )
        i -= 255;
      return r[i];
    }
  };
})(), K = function(r, A) {
  if (typeof r.length > "u")
    throw r.length + "/" + A;
  const M = (function() {
    let n = 0;
    for (; n < r.length && r[n] == 0; )
      n += 1;
    const s = new Array(r.length - n + A);
    for (let u = 0; u < r.length - n; u += 1)
      s[u] = r[u + n];
    return s;
  })(), a = {
    getAt: function(n) {
      return M[n];
    },
    getLength: function() {
      return M.length;
    },
    multiply: function(n) {
      const s = new Array(a.getLength() + n.getLength() - 1);
      for (let u = 0; u < a.getLength(); u += 1)
        for (let h = 0; h < n.getLength(); h += 1)
          s[u + h] ^= S.gexp(S.glog(a.getAt(u)) + S.glog(n.getAt(h)));
      return K(s, 0);
    },
    mod: function(n) {
      if (a.getLength() - n.getLength() < 0)
        return a;
      const s = S.glog(a.getAt(0)) - S.glog(n.getAt(0)), u = new Array(a.getLength());
      for (let h = 0; h < a.getLength(); h += 1)
        u[h] = a.getAt(h);
      for (let h = 0; h < n.getLength(); h += 1)
        u[h] ^= S.gexp(S.glog(n.getAt(h)) + s);
      return K(u, 0).mod(n);
    }
  };
  return a;
}, Z = /* @__PURE__ */ (function() {
  const r = [
    // L
    // M
    // Q
    // H
    // 1
    [1, 26, 19],
    [1, 26, 16],
    [1, 26, 13],
    [1, 26, 9],
    // 2
    [1, 44, 34],
    [1, 44, 28],
    [1, 44, 22],
    [1, 44, 16],
    // 3
    [1, 70, 55],
    [1, 70, 44],
    [2, 35, 17],
    [2, 35, 13],
    // 4
    [1, 100, 80],
    [2, 50, 32],
    [2, 50, 24],
    [4, 25, 9],
    // 5
    [1, 134, 108],
    [2, 67, 43],
    [2, 33, 15, 2, 34, 16],
    [2, 33, 11, 2, 34, 12],
    // 6
    [2, 86, 68],
    [4, 43, 27],
    [4, 43, 19],
    [4, 43, 15],
    // 7
    [2, 98, 78],
    [4, 49, 31],
    [2, 32, 14, 4, 33, 15],
    [4, 39, 13, 1, 40, 14],
    // 8
    [2, 121, 97],
    [2, 60, 38, 2, 61, 39],
    [4, 40, 18, 2, 41, 19],
    [4, 40, 14, 2, 41, 15],
    // 9
    [2, 146, 116],
    [3, 58, 36, 2, 59, 37],
    [4, 36, 16, 4, 37, 17],
    [4, 36, 12, 4, 37, 13],
    // 10
    [2, 86, 68, 2, 87, 69],
    [4, 69, 43, 1, 70, 44],
    [6, 43, 19, 2, 44, 20],
    [6, 43, 15, 2, 44, 16],
    // 11
    [4, 101, 81],
    [1, 80, 50, 4, 81, 51],
    [4, 50, 22, 4, 51, 23],
    [3, 36, 12, 8, 37, 13],
    // 12
    [2, 116, 92, 2, 117, 93],
    [6, 58, 36, 2, 59, 37],
    [4, 46, 20, 6, 47, 21],
    [7, 42, 14, 4, 43, 15],
    // 13
    [4, 133, 107],
    [8, 59, 37, 1, 60, 38],
    [8, 44, 20, 4, 45, 21],
    [12, 33, 11, 4, 34, 12],
    // 14
    [3, 145, 115, 1, 146, 116],
    [4, 64, 40, 5, 65, 41],
    [11, 36, 16, 5, 37, 17],
    [11, 36, 12, 5, 37, 13],
    // 15
    [5, 109, 87, 1, 110, 88],
    [5, 65, 41, 5, 66, 42],
    [5, 54, 24, 7, 55, 25],
    [11, 36, 12, 7, 37, 13],
    // 16
    [5, 122, 98, 1, 123, 99],
    [7, 73, 45, 3, 74, 46],
    [15, 43, 19, 2, 44, 20],
    [3, 45, 15, 13, 46, 16],
    // 17
    [1, 135, 107, 5, 136, 108],
    [10, 74, 46, 1, 75, 47],
    [1, 50, 22, 15, 51, 23],
    [2, 42, 14, 17, 43, 15],
    // 18
    [5, 150, 120, 1, 151, 121],
    [9, 69, 43, 4, 70, 44],
    [17, 50, 22, 1, 51, 23],
    [2, 42, 14, 19, 43, 15],
    // 19
    [3, 141, 113, 4, 142, 114],
    [3, 70, 44, 11, 71, 45],
    [17, 47, 21, 4, 48, 22],
    [9, 39, 13, 16, 40, 14],
    // 20
    [3, 135, 107, 5, 136, 108],
    [3, 67, 41, 13, 68, 42],
    [15, 54, 24, 5, 55, 25],
    [15, 43, 15, 10, 44, 16],
    // 21
    [4, 144, 116, 4, 145, 117],
    [17, 68, 42],
    [17, 50, 22, 6, 51, 23],
    [19, 46, 16, 6, 47, 17],
    // 22
    [2, 139, 111, 7, 140, 112],
    [17, 74, 46],
    [7, 54, 24, 16, 55, 25],
    [34, 37, 13],
    // 23
    [4, 151, 121, 5, 152, 122],
    [4, 75, 47, 14, 76, 48],
    [11, 54, 24, 14, 55, 25],
    [16, 45, 15, 14, 46, 16],
    // 24
    [6, 147, 117, 4, 148, 118],
    [6, 73, 45, 14, 74, 46],
    [11, 54, 24, 16, 55, 25],
    [30, 46, 16, 2, 47, 17],
    // 25
    [8, 132, 106, 4, 133, 107],
    [8, 75, 47, 13, 76, 48],
    [7, 54, 24, 22, 55, 25],
    [22, 45, 15, 13, 46, 16],
    // 26
    [10, 142, 114, 2, 143, 115],
    [19, 74, 46, 4, 75, 47],
    [28, 50, 22, 6, 51, 23],
    [33, 46, 16, 4, 47, 17],
    // 27
    [8, 152, 122, 4, 153, 123],
    [22, 73, 45, 3, 74, 46],
    [8, 53, 23, 26, 54, 24],
    [12, 45, 15, 28, 46, 16],
    // 28
    [3, 147, 117, 10, 148, 118],
    [3, 73, 45, 23, 74, 46],
    [4, 54, 24, 31, 55, 25],
    [11, 45, 15, 31, 46, 16],
    // 29
    [7, 146, 116, 7, 147, 117],
    [21, 73, 45, 7, 74, 46],
    [1, 53, 23, 37, 54, 24],
    [19, 45, 15, 26, 46, 16],
    // 30
    [5, 145, 115, 10, 146, 116],
    [19, 75, 47, 10, 76, 48],
    [15, 54, 24, 25, 55, 25],
    [23, 45, 15, 25, 46, 16],
    // 31
    [13, 145, 115, 3, 146, 116],
    [2, 74, 46, 29, 75, 47],
    [42, 54, 24, 1, 55, 25],
    [23, 45, 15, 28, 46, 16],
    // 32
    [17, 145, 115],
    [10, 74, 46, 23, 75, 47],
    [10, 54, 24, 35, 55, 25],
    [19, 45, 15, 35, 46, 16],
    // 33
    [17, 145, 115, 1, 146, 116],
    [14, 74, 46, 21, 75, 47],
    [29, 54, 24, 19, 55, 25],
    [11, 45, 15, 46, 46, 16],
    // 34
    [13, 145, 115, 6, 146, 116],
    [14, 74, 46, 23, 75, 47],
    [44, 54, 24, 7, 55, 25],
    [59, 46, 16, 1, 47, 17],
    // 35
    [12, 151, 121, 7, 152, 122],
    [12, 75, 47, 26, 76, 48],
    [39, 54, 24, 14, 55, 25],
    [22, 45, 15, 41, 46, 16],
    // 36
    [6, 151, 121, 14, 152, 122],
    [6, 75, 47, 34, 76, 48],
    [46, 54, 24, 10, 55, 25],
    [2, 45, 15, 64, 46, 16],
    // 37
    [17, 152, 122, 4, 153, 123],
    [29, 74, 46, 14, 75, 47],
    [49, 54, 24, 10, 55, 25],
    [24, 45, 15, 46, 46, 16],
    // 38
    [4, 152, 122, 18, 153, 123],
    [13, 74, 46, 32, 75, 47],
    [48, 54, 24, 14, 55, 25],
    [42, 45, 15, 32, 46, 16],
    // 39
    [20, 147, 117, 4, 148, 118],
    [40, 75, 47, 7, 76, 48],
    [43, 54, 24, 22, 55, 25],
    [10, 45, 15, 67, 46, 16],
    // 40
    [19, 148, 118, 6, 149, 119],
    [18, 75, 47, 31, 76, 48],
    [34, 54, 24, 34, 55, 25],
    [20, 45, 15, 61, 46, 16]
  ], A = function(i, g) {
    return {
      totalCount: i,
      dataCount: g
    };
  }, M = function(i, g) {
    switch (g) {
      case j.L:
        return r[(i - 1) * 4 + 0];
      case j.M:
        return r[(i - 1) * 4 + 1];
      case j.Q:
        return r[(i - 1) * 4 + 2];
      case j.H:
        return r[(i - 1) * 4 + 3];
      default:
        return;
    }
  };
  return {
    getRSBlocks: function(i, g) {
      const a = M(i, g);
      if (typeof a > "u")
        throw "bad rs block @ typeNumber:" + i + "/errorCorrectionLevel:" + g;
      const n = a.length / 3, s = [];
      for (let u = 0; u < n; u += 1) {
        const h = a[u * 3 + 0], U = a[u * 3 + 1], d = a[u * 3 + 2];
        for (let f = 0; f < h; f += 1)
          s.push(A(U, d));
      }
      return s;
    }
  };
})(), z = function() {
  const r = [];
  let A = 0;
  const a = {
    getBuffer: function() {
      return r;
    },
    getAt: function(n) {
      const s = Math.floor(n / 8);
      return (r[s] >>> 7 - n % 8 & 1) == 1;
    },
    put: function(n, s) {
      for (let u = 0; u < s; u += 1)
        a.putBit((n >>> s - u - 1 & 1) == 1);
    },
    getLengthInBits: function() {
      return A;
    },
    putBit: function(n) {
      const s = Math.floor(A / 8);
      r.length <= s && r.push(0), n && (r[s] |= 128 >>> A % 8), A += 1;
    }
  };
  return a;
}, nt = function(r) {
  const A = y.MODE_NUMBER, M = r, B = function() {
    return A;
  }, p = function() {
    return M.length;
  }, i = function(s) {
    const u = M;
    let h = 0;
    for (; h + 2 < u.length; )
      s.put(g(u.substring(h, h + 3)), 10), h += 3;
    h < u.length && (u.length - h == 1 ? s.put(g(u.substring(h, h + 1)), 4) : u.length - h == 2 && s.put(g(u.substring(h, h + 2)), 7));
  }, g = function(s) {
    let u = 0;
    for (let h = 0; h < s.length; h += 1)
      u = u * 10 + a(s.charAt(h));
    return u;
  }, a = function(s) {
    if ("0" <= s && s <= "9")
      return s.charCodeAt(0) - 48;
    throw "illegal char :" + s;
  };
  return { getMode: B, getLength: p, write: i };
}, et = function(r) {
  const A = y.MODE_ALPHA_NUM, M = r, B = function() {
    return A;
  }, p = function() {
    return M.length;
  }, i = function(n) {
    const s = M;
    let u = 0;
    for (; u + 1 < s.length; )
      n.put(
        g(s.charAt(u)) * 45 + g(s.charAt(u + 1)),
        11
      ), u += 2;
    u < s.length && n.put(g(s.charAt(u)), 6);
  }, g = function(n) {
    if ("0" <= n && n <= "9")
      return n.charCodeAt(0) - 48;
    if ("A" <= n && n <= "Z")
      return n.charCodeAt(0) - 65 + 10;
    switch (n) {
      case " ":
        return 36;
      case "$":
        return 37;
      case "%":
        return 38;
      case "*":
        return 39;
      case "+":
        return 40;
      case "-":
        return 41;
      case ".":
        return 42;
      case "/":
        return 43;
      case ":":
        return 44;
      default:
        throw "illegal char :" + n;
    }
  };
  return { getMode: B, getLength: p, write: i };
}, V = function(r, A) {
  const M = y.MODE_8BIT_BYTE, B = (A || k.stringToBytes)(r);
  return { getMode: function() {
    return M;
  }, getLength: function() {
    return B.length;
  }, write: function(n) {
    for (let s = 0; s < B.length; s += 1)
      n.put(B[s], 8);
  } };
}, ot = function(r, A) {
  const M = y.MODE_KANJI;
  (function(n, s) {
    const u = A(n);
    if (u.length != 2 || (u[0] << 8 | u[1]) != s)
      throw "sjis not supported.";
  })("友", 38726);
  const B = A(r);
  return { getMode: function() {
    return M;
  }, getLength: function() {
    return ~~(B.length / 2);
  }, write: function(n) {
    const s = B;
    let u = 0;
    for (; u + 1 < s.length; ) {
      let h = (255 & s[u]) << 8 | 255 & s[u + 1];
      if (33088 <= h && h <= 40956)
        h -= 33088;
      else if (57408 <= h && h <= 60351)
        h -= 49472;
      else
        throw "illegal char at " + (u + 1) + "/" + h;
      h = (h >>> 8 & 255) * 192 + (h & 255), n.put(h, 13), u += 2;
    }
    if (u < s.length)
      throw "illegal char at " + (u + 1);
  } };
}, rt = function(r) {
  const A = y.MODE_ECI;
  if (r < 0 || r > 999999)
    throw "bad eci assignment number: " + r;
  return { getMode: function() {
    return A;
  }, getLength: function() {
    return 0;
  }, write: function(i) {
    r < 128 ? i.put(r, 8) : r < 16384 ? i.put(32768 | r, 16) : i.put(12582912 | r, 24);
  } };
}, it = function(r) {
  const A = r;
  let M = 0, B = 0, p = 0;
  const i = function() {
    for (; p < 8; ) {
      if (M >= A.length) {
        if (p == 0)
          return -1;
        throw "unexpected end of file./" + p;
      }
      const s = A.charAt(M);
      if (M += 1, s == "=")
        return p = 0, -1;
      if (s.match(/^\s$/))
        continue;
      B = B << 6 | g(s.charCodeAt(0)), p += 6;
    }
    const n = B >>> p - 8 & 255;
    return p -= 8, n;
  }, g = function(n) {
    if (65 <= n && n <= 90)
      return n - 65;
    if (97 <= n && n <= 122)
      return n - 97 + 26;
    if (48 <= n && n <= 57)
      return n - 48 + 52;
    if (n == 43)
      return 62;
    if (n == 47)
      return 63;
    throw "c:" + n;
  };
  return { read: i };
}, gt = function(r, A) {
  const M = (function() {
    const p = it(r), i = function() {
      const n = p.read();
      if (n == -1) throw "eof";
      return n;
    };
    let g = 0;
    const a = {};
    for (; ; ) {
      const n = p.read();
      if (n == -1) break;
      const s = i(), u = i(), h = i(), U = String.fromCharCode(n << 8 | s), d = u << 8 | h;
      a[U] = d, g += 1;
    }
    if (g != A)
      throw g + " != " + A;
    return a;
  })(), B = 63;
  return function(p) {
    const i = [];
    for (let g = 0; g < p.length; g += 1) {
      const a = p.charCodeAt(g);
      if (a < 128)
        i.push(a);
      else {
        const n = M[p.charAt(g)];
        typeof n == "number" ? (n & 255) == n ? i.push(n) : (i.push(n >>> 8), i.push(n & 255)) : i.push(B);
      }
    }
    return i;
  };
}, at = k.stringToBytes;
export {
  gt as createStringToBytes,
  k as default,
  k as qrcode,
  at as stringToBytes
};
//# sourceMappingURL=qrcode.mjs.map
