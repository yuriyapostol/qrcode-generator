const W = {}, q = {}, tt = [], nt = [], y = function(r, _) {
  let w = r;
  const o = K[_];
  let a = null, g = 0, t = null;
  const s = [], u = function(e, l) {
    g = w * 4 + 17, a = (function(n) {
      const c = new Array(n);
      for (let i = 0; i < n; i += 1) {
        c[i] = new Array(n);
        for (let A = 0; A < n; A += 1)
          c[i][A] = null;
      }
      return c;
    })(g), h(0, 0), h(g - 7, 0), h(0, g - 7), f(), d(), j(e, l), w >= 7 && T(e), t == null && (t = p(w, o, s)), F(t, l);
  }, h = function(e, l) {
    for (let n = -1; n <= 7; n += 1)
      if (!(e + n <= -1 || g <= e + n))
        for (let c = -1; c <= 7; c += 1)
          l + c <= -1 || g <= l + c || (0 <= n && n <= 6 && (c == 0 || c == 6) || 0 <= c && c <= 6 && (n == 0 || n == 6) || 2 <= n && n <= 4 && 2 <= c && c <= 4 ? a[e + n][l + c] = !0 : a[e + n][l + c] = !1);
  }, U = function() {
    let e = 0, l = 0;
    for (let n = 0; n < 8; n += 1) {
      u(!0, n);
      const c = x.getLostPoint(J);
      (n == 0 || e > c) && (e = c, l = n);
    }
    return l;
  }, d = function() {
    for (let e = 8; e < g - 8; e += 1)
      a[e][6] == null && (a[e][6] = e % 2 == 0);
    for (let e = 8; e < g - 8; e += 1)
      a[6][e] == null && (a[6][e] = e % 2 == 0);
  }, f = function() {
    const e = x.getPatternPosition(w);
    for (let l = 0; l < e.length; l += 1)
      for (let n = 0; n < e.length; n += 1) {
        const c = e[l], i = e[n];
        if (a[c][i] == null)
          for (let A = -2; A <= 2; A += 1)
            for (let L = -2; L <= 2; L += 1)
              A == -2 || A == 2 || L == -2 || L == 2 || A == 0 && L == 0 ? a[c + A][i + L] = !0 : a[c + A][i + L] = !1;
      }
  }, T = function(e) {
    const l = x.getBCHTypeNumber(w);
    for (let n = 0; n < 18; n += 1) {
      const c = !e && (l >> n & 1) == 1;
      a[Math.floor(n / 3)][n % 3 + g - 8 - 3] = c;
    }
    for (let n = 0; n < 18; n += 1) {
      const c = !e && (l >> n & 1) == 1;
      a[n % 3 + g - 8 - 3][Math.floor(n / 3)] = c;
    }
  }, j = function(e, l) {
    const n = o << 3 | l, c = x.getBCHTypeInfo(n);
    for (let i = 0; i < 15; i += 1) {
      const A = !e && (c >> i & 1) == 1;
      i < 6 ? a[i][8] = A : i < 8 ? a[i + 1][8] = A : a[g - 15 + i][8] = A;
    }
    for (let i = 0; i < 15; i += 1) {
      const A = !e && (c >> i & 1) == 1;
      i < 8 ? a[8][g - i - 1] = A : i < 9 ? a[8][15 - i - 1 + 1] = A : a[8][15 - i - 1] = A;
    }
    a[g - 8][8] = !e;
  }, F = function(e, l) {
    let n = -1, c = g - 1, i = 7, A = 0;
    const L = x.getMaskFunction(l);
    for (let k = g - 1; k > 0; k -= 2)
      for (k == 6 && (k -= 1); ; ) {
        for (let m = 0; m < 2; m += 1)
          if (a[c][k - m] == null) {
            let N = !1;
            A < e.length && (N = (e[A] >>> i & 1) == 1), L(c, k - m) && (N = !N), a[c][k - m] = N, i -= 1, i == -1 && (A += 1, i = 7);
          }
        if (c += n, c < 0 || g <= c) {
          c -= n, n = -n;
          break;
        }
      }
  }, E = function(e, l) {
    let n = 0, c = 0, i = 0;
    const A = new Array(l.length), L = new Array(l.length);
    for (let D = 0; D < l.length; D += 1) {
      const C = l[D].dataCount, G = l[D].totalCount - C;
      c = Math.max(c, C), i = Math.max(i, G), A[D] = new Array(C);
      for (let R = 0; R < A[D].length; R += 1)
        A[D][R] = 255 & e.getBuffer()[R + n];
      n += C;
      const Y = x.getErrorCorrectPolynomial(G), $ = v(A[D], Y.getLength() - 1).mod(Y);
      L[D] = new Array(Y.getLength() - 1);
      for (let R = 0; R < L[D].length; R += 1) {
        const X = R + $.getLength() - L[D].length;
        L[D][R] = X >= 0 ? $.getAt(X) : 0;
      }
    }
    let k = 0;
    for (let D = 0; D < l.length; D += 1)
      k += l[D].totalCount;
    const m = new Array(k);
    let N = 0;
    for (let D = 0; D < c; D += 1)
      for (let C = 0; C < l.length; C += 1)
        D < A[C].length && (m[N] = A[C][D], N += 1);
    for (let D = 0; D < i; D += 1)
      for (let C = 0; C < l.length; C += 1)
        D < L[C].length && (m[N] = L[C][D], N += 1);
    return m;
  }, p = function(e, l, n) {
    const c = Z.getRSBlocks(e, l), i = z();
    for (let L = 0; L < n.length; L += 1) {
      const k = n[L];
      i.put(k.getMode(), 4), k.getMode() !== P.MODE_ECI && i.put(k.getLength(), x.getLengthInBits(k.getMode(), e)), k.write(i);
    }
    let A = 0;
    for (let L = 0; L < c.length; L += 1)
      A += c[L].dataCount;
    if (i.getLengthInBits() > A * 8)
      throw "code length overflow. (" + i.getLengthInBits() + ">" + A * 8 + ")";
    for (i.getLengthInBits() + 4 <= A * 8 && i.put(0, 4); i.getLengthInBits() % 8 != 0; )
      i.putBit(!1);
    for (; !(i.getLengthInBits() >= A * 8 || (i.put(236, 8), i.getLengthInBits() >= A * 8)); )
      i.put(17, 8);
    return E(i, c);
  }, I = function(e, l) {
    if (typeof l?.encoding == "string")
      return l.encoding;
    const n = y.getDefaultEncoding(e);
    if (typeof n == "string")
      return n;
    if (e === "Byte" && y.getEncoder("UTF-8"))
      return "UTF-8";
    if (e === "Kanji" && y.getEncoder("SJIS"))
      return "SJIS";
  }, Q = function(e, l) {
    const n = I(e, l);
    if (!n)
      return;
    const c = y.getEncoder(n);
    if (!c)
      throw "unknown encoding: " + n;
    if (c.modes && c.modes.indexOf(e) < 0)
      throw "encoding not supported for mode: " + e + "/" + n;
    return c;
  }, b = function(e, l) {
    let n;
    if (typeof e?.eci == "number")
      n = e.eci;
    else if (e?.eci === !0 && (n = l.eci, typeof n != "number"))
      throw "eci not supported for encoding";
    typeof n == "number" && s.push(it(n));
  }, J = {
    addData: function(e, l, n) {
      l = l || "Byte";
      let c = null;
      switch (l) {
        case "Numeric":
          if (typeof n < "u")
            throw "options not supported for mode:" + l;
          c = et(e);
          break;
        case "Alphanumeric":
          if (typeof n < "u")
            throw "options not supported for mode:" + l;
          c = ot(e);
          break;
        case "Byte": {
          const i = Q("Byte", n);
          if (i)
            b(n, i), c = V(e, i.encode);
          else {
            if (typeof n?.eci < "u")
              throw "eci not supported without encoding";
            c = V(e);
          }
          break;
        }
        case "Kanji": {
          const i = Q("Kanji", n);
          if (!i)
            throw "sjis not supported.";
          b(n, i), c = rt(e, i.encode);
          break;
        }
        default:
          throw "mode:" + l;
      }
      s.push(c), t = null;
    },
    isDark: function(e, l) {
      if (e < 0 || g <= e || l < 0 || g <= l)
        throw e + "," + l;
      return a[e][l];
    },
    getModuleCount: function() {
      return g;
    },
    make: function() {
      if (w < 1) {
        let e = 1;
        for (; e < 40; e++) {
          const l = Z.getRSBlocks(e, o), n = z();
          for (let i = 0; i < s.length; i++) {
            const A = s[i];
            n.put(A.getMode(), 4), A.getMode() !== P.MODE_ECI && n.put(A.getLength(), x.getLengthInBits(A.getMode(), e)), A.write(n);
          }
          let c = 0;
          for (let i = 0; i < l.length; i++)
            c += l[i].dataCount;
          if (n.getLengthInBits() <= c * 8)
            break;
        }
        w = e;
      }
      u(!1, U());
    }
  };
  return tt.forEach((e) => {
    e(J, y);
  }), nt.push(J), J;
};
y.registerEncoder = function(r, _) {
  W[r] = _;
};
y.getEncoder = function(r) {
  return W[r];
};
y.setDefaultEncoding = function(r, _) {
  if (!y.getEncoder(_))
    throw "unknown encoding: " + _;
  q[r] = _;
};
y.getDefaultEncoding = function(r) {
  return q[r];
};
y.use = function(r) {
  tt.push(r), nt.forEach((_) => {
    r(_, y);
  });
};
y.stringToBytes = function(r) {
  const _ = [];
  for (let M = 0; M < r.length; M += 1) {
    const B = r.charCodeAt(M);
    _.push(B & 255);
  }
  return _;
};
const P = {
  MODE_NUMBER: 1,
  MODE_ALPHA_NUM: 2,
  MODE_8BIT_BYTE: 4,
  MODE_ECI: 7,
  MODE_KANJI: 8
}, K = {
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
  ], _ = 1335, M = 7973, B = 21522, w = function(d) {
    let f = 0;
    for (; d != 0; )
      f += 1, d >>>= 1;
    return f;
  };
  return {
    getBCHTypeInfo: function(d) {
      let f = d << 10;
      for (; w(f) - w(_) >= 0; )
        f ^= _ << w(f) - w(_);
      return (d << 10 | f) ^ B;
    },
    getBCHTypeNumber: function(d) {
      let f = d << 12;
      for (; w(f) - w(M) >= 0; )
        f ^= M << w(f) - w(M);
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
      let f = v([1], 0);
      for (let T = 0; T < d; T += 1)
        f = f.multiply(v([1, S.gexp(T)], 0));
      return f;
    },
    getLengthInBits: function(d, f) {
      if (1 <= f && f < 10)
        switch (d) {
          case P.MODE_NUMBER:
            return 10;
          case P.MODE_ALPHA_NUM:
            return 9;
          case P.MODE_8BIT_BYTE:
            return 8;
          case P.MODE_KANJI:
            return 8;
          default:
            throw "mode:" + d;
        }
      else if (f < 27)
        switch (d) {
          case P.MODE_NUMBER:
            return 12;
          case P.MODE_ALPHA_NUM:
            return 11;
          case P.MODE_8BIT_BYTE:
            return 16;
          case P.MODE_KANJI:
            return 10;
          default:
            throw "mode:" + d;
        }
      else if (f < 41)
        switch (d) {
          case P.MODE_NUMBER:
            return 14;
          case P.MODE_ALPHA_NUM:
            return 13;
          case P.MODE_8BIT_BYTE:
            return 16;
          case P.MODE_KANJI:
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
        for (let p = 0; p < f; p += 1) {
          let I = 0;
          const Q = d.isDark(E, p);
          for (let b = -1; b <= 1; b += 1)
            if (!(E + b < 0 || f <= E + b))
              for (let H = -1; H <= 1; H += 1)
                p + H < 0 || f <= p + H || b == 0 && H == 0 || Q == d.isDark(E + b, p + H) && (I += 1);
          I > 5 && (T += 3 + I - 5);
        }
      for (let E = 0; E < f - 1; E += 1)
        for (let p = 0; p < f - 1; p += 1) {
          let I = 0;
          d.isDark(E, p) && (I += 1), d.isDark(E + 1, p) && (I += 1), d.isDark(E, p + 1) && (I += 1), d.isDark(E + 1, p + 1) && (I += 1), (I == 0 || I == 4) && (T += 3);
        }
      for (let E = 0; E < f; E += 1)
        for (let p = 0; p < f - 6; p += 1)
          d.isDark(E, p) && !d.isDark(E, p + 1) && d.isDark(E, p + 2) && d.isDark(E, p + 3) && d.isDark(E, p + 4) && !d.isDark(E, p + 5) && d.isDark(E, p + 6) && (T += 40);
      for (let E = 0; E < f; E += 1)
        for (let p = 0; p < f - 6; p += 1)
          d.isDark(p, E) && !d.isDark(p + 1, E) && d.isDark(p + 2, E) && d.isDark(p + 3, E) && d.isDark(p + 4, E) && !d.isDark(p + 5, E) && d.isDark(p + 6, E) && (T += 40);
      let j = 0;
      for (let E = 0; E < f; E += 1)
        for (let p = 0; p < f; p += 1)
          d.isDark(p, E) && (j += 1);
      const F = Math.abs(100 * j / f / f - 50) / 5;
      return T += F * 10, T;
    }
  };
})(), S = (function() {
  const r = new Array(256), _ = new Array(256);
  for (let o = 0; o < 8; o += 1)
    r[o] = 1 << o;
  for (let o = 8; o < 256; o += 1)
    r[o] = r[o - 4] ^ r[o - 5] ^ r[o - 6] ^ r[o - 8];
  for (let o = 0; o < 255; o += 1)
    _[r[o]] = o;
  return {
    glog: function(o) {
      if (o < 1)
        throw "glog(" + o + ")";
      return _[o];
    },
    gexp: function(o) {
      for (; o < 0; )
        o += 255;
      for (; o >= 256; )
        o -= 255;
      return r[o];
    }
  };
})(), v = function(r, _) {
  if (typeof r.length > "u")
    throw r.length + "/" + _;
  const M = (function() {
    let t = 0;
    for (; t < r.length && r[t] == 0; )
      t += 1;
    const s = new Array(r.length - t + _);
    for (let u = 0; u < r.length - t; u += 1)
      s[u] = r[u + t];
    return s;
  })(), g = {
    getAt: function(t) {
      return M[t];
    },
    getLength: function() {
      return M.length;
    },
    multiply: function(t) {
      const s = new Array(g.getLength() + t.getLength() - 1);
      for (let u = 0; u < g.getLength(); u += 1)
        for (let h = 0; h < t.getLength(); h += 1)
          s[u + h] ^= S.gexp(S.glog(g.getAt(u)) + S.glog(t.getAt(h)));
      return v(s, 0);
    },
    mod: function(t) {
      if (g.getLength() - t.getLength() < 0)
        return g;
      const s = S.glog(g.getAt(0)) - S.glog(t.getAt(0)), u = new Array(g.getLength());
      for (let h = 0; h < g.getLength(); h += 1)
        u[h] = g.getAt(h);
      for (let h = 0; h < t.getLength(); h += 1)
        u[h] ^= S.gexp(S.glog(t.getAt(h)) + s);
      return v(u, 0).mod(t);
    }
  };
  return g;
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
  ], _ = function(o, a) {
    return {
      totalCount: o,
      dataCount: a
    };
  }, M = function(o, a) {
    switch (a) {
      case K.L:
        return r[(o - 1) * 4 + 0];
      case K.M:
        return r[(o - 1) * 4 + 1];
      case K.Q:
        return r[(o - 1) * 4 + 2];
      case K.H:
        return r[(o - 1) * 4 + 3];
      default:
        return;
    }
  };
  return {
    getRSBlocks: function(o, a) {
      const g = M(o, a);
      if (typeof g > "u")
        throw "bad rs block @ typeNumber:" + o + "/errorCorrectionLevel:" + a;
      const t = g.length / 3, s = [];
      for (let u = 0; u < t; u += 1) {
        const h = g[u * 3 + 0], U = g[u * 3 + 1], d = g[u * 3 + 2];
        for (let f = 0; f < h; f += 1)
          s.push(_(U, d));
      }
      return s;
    }
  };
})(), z = function() {
  const r = [];
  let _ = 0;
  const g = {
    getBuffer: function() {
      return r;
    },
    getAt: function(t) {
      const s = Math.floor(t / 8);
      return (r[s] >>> 7 - t % 8 & 1) == 1;
    },
    put: function(t, s) {
      for (let u = 0; u < s; u += 1)
        g.putBit((t >>> s - u - 1 & 1) == 1);
    },
    getLengthInBits: function() {
      return _;
    },
    putBit: function(t) {
      const s = Math.floor(_ / 8);
      r.length <= s && r.push(0), t && (r[s] |= 128 >>> _ % 8), _ += 1;
    }
  };
  return g;
}, et = function(r) {
  const _ = P.MODE_NUMBER, M = r, B = function() {
    return _;
  }, w = function() {
    return M.length;
  }, o = function(s) {
    const u = M;
    let h = 0;
    for (; h + 2 < u.length; )
      s.put(a(u.substring(h, h + 3)), 10), h += 3;
    h < u.length && (u.length - h == 1 ? s.put(a(u.substring(h, h + 1)), 4) : u.length - h == 2 && s.put(a(u.substring(h, h + 2)), 7));
  }, a = function(s) {
    let u = 0;
    for (let h = 0; h < s.length; h += 1)
      u = u * 10 + g(s.charAt(h));
    return u;
  }, g = function(s) {
    if ("0" <= s && s <= "9")
      return s.charCodeAt(0) - 48;
    throw "illegal char :" + s;
  };
  return { getMode: B, getLength: w, write: o };
}, ot = function(r) {
  const _ = P.MODE_ALPHA_NUM, M = r, B = function() {
    return _;
  }, w = function() {
    return M.length;
  }, o = function(t) {
    const s = M;
    let u = 0;
    for (; u + 1 < s.length; )
      t.put(
        a(s.charAt(u)) * 45 + a(s.charAt(u + 1)),
        11
      ), u += 2;
    u < s.length && t.put(a(s.charAt(u)), 6);
  }, a = function(t) {
    if ("0" <= t && t <= "9")
      return t.charCodeAt(0) - 48;
    if ("A" <= t && t <= "Z")
      return t.charCodeAt(0) - 65 + 10;
    switch (t) {
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
        throw "illegal char :" + t;
    }
  };
  return { getMode: B, getLength: w, write: o };
}, V = function(r, _) {
  const M = P.MODE_8BIT_BYTE, B = (_ || y.stringToBytes)(r);
  return { getMode: function() {
    return M;
  }, getLength: function() {
    return B.length;
  }, write: function(t) {
    for (let s = 0; s < B.length; s += 1)
      t.put(B[s], 8);
  } };
}, rt = function(r, _) {
  const M = P.MODE_KANJI;
  (function(t, s) {
    const u = _(t);
    if (u.length != 2 || (u[0] << 8 | u[1]) != s)
      throw "sjis not supported.";
  })("友", 38726);
  const B = _(r);
  return { getMode: function() {
    return M;
  }, getLength: function() {
    return ~~(B.length / 2);
  }, write: function(t) {
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
      h = (h >>> 8 & 255) * 192 + (h & 255), t.put(h, 13), u += 2;
    }
    if (u < s.length)
      throw "illegal char at " + (u + 1);
  } };
}, it = function(r) {
  const _ = P.MODE_ECI;
  if (r < 0 || r > 999999)
    throw "bad eci assignment number: " + r;
  return { getMode: function() {
    return _;
  }, getLength: function() {
    return 0;
  }, write: function(o) {
    r < 128 ? o.put(r, 8) : r < 16384 ? o.put(32768 | r, 16) : o.put(12582912 | r, 24);
  } };
}, ct = function(r) {
  const _ = r;
  let M = 0, B = 0, w = 0;
  const o = function() {
    for (; w < 8; ) {
      if (M >= _.length) {
        if (w == 0)
          return -1;
        throw "unexpected end of file./" + w;
      }
      const s = _.charAt(M);
      if (M += 1, s == "=")
        return w = 0, -1;
      if (s.match(/^\s$/))
        continue;
      B = B << 6 | a(s.charCodeAt(0)), w += 6;
    }
    const t = B >>> w - 8 & 255;
    return w -= 8, t;
  }, a = function(t) {
    if (65 <= t && t <= 90)
      return t - 65;
    if (97 <= t && t <= 122)
      return t - 97 + 26;
    if (48 <= t && t <= 57)
      return t - 48 + 52;
    if (t == 43)
      return 62;
    if (t == 47)
      return 63;
    throw "c:" + t;
  };
  return { read: o };
}, at = function(r, _) {
  const M = (function() {
    const w = ct(r), o = function() {
      const t = w.read();
      if (t == -1) throw "eof";
      return t;
    };
    let a = 0;
    const g = {};
    for (; ; ) {
      const t = w.read();
      if (t == -1) break;
      const s = o(), u = o(), h = o(), U = String.fromCharCode(t << 8 | s), d = u << 8 | h;
      g[U] = d, a += 1;
    }
    if (a != _)
      throw a + " != " + _;
    return g;
  })(), B = 63;
  return function(w) {
    const o = [];
    for (let a = 0; a < w.length; a += 1) {
      const g = w.charCodeAt(a);
      if (g < 128)
        o.push(g);
      else {
        const t = M[w.charAt(a)];
        typeof t == "number" ? (t & 255) == t ? o.push(t) : (o.push(t >>> 8), o.push(t & 255)) : o.push(B);
      }
    }
    return o;
  };
}, gt = y.stringToBytes;
export {
  at as createStringToBytes,
  y as default,
  y as qrcode,
  gt as stringToBytes
};
//# sourceMappingURL=qrcode.mjs.map
