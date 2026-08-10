import x from "../core/qrcode.mjs";
const S = function(a) {
  let r = "";
  for (let n = 0; n < a.length; n += 1) {
    const i = a.charAt(n);
    switch (i) {
      case "<":
        r += "&lt;";
        break;
      case ">":
        r += "&gt;";
        break;
      case "&":
        r += "&amp;";
        break;
      case '"':
        r += "&quot;";
        break;
      default:
        r += i;
        break;
    }
  }
  return r;
}, _ = function() {
  const a = [], r = {
    writeByte(n) {
      a.push(n & 255);
    },
    writeShort(n) {
      r.writeByte(n), r.writeByte(n >>> 8);
    },
    writeBytes(n, i, e) {
      i = i || 0, e = e || n.length;
      for (let l = 0; l < e; l += 1)
        r.writeByte(n[l + i]);
    },
    writeString(n) {
      for (let i = 0; i < n.length; i += 1)
        r.writeByte(n.charCodeAt(i));
    },
    toByteArray() {
      return a;
    }
  };
  return r;
}, I = function() {
  let a = 0, r = 0, n = 0, i = "";
  const e = function(o) {
    if (o < 26) return 65 + o;
    if (o < 52) return 97 + (o - 26);
    if (o < 62) return 48 + (o - 52);
    if (o == 62) return 43;
    if (o == 63) return 47;
    throw "n:" + o;
  }, l = function(o) {
    i += String.fromCharCode(e(o & 63));
  };
  return {
    writeByte(o) {
      for (a = a << 8 | o & 255, r += 8, n += 1; r >= 6; )
        l(a >>> r - 6), r -= 6;
    },
    flush() {
      if (r > 0 && (l(a << 6 - r), a = 0, r = 0), n % 3 != 0) {
        const o = 3 - n % 3;
        for (let h = 0; h < o; h += 1)
          i += "=";
      }
    },
    toString() {
      return i;
    }
  };
}, C = function(a, r) {
  if (typeof a != "string") return r;
  const n = a.trim().toLowerCase();
  let i = n.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (i) {
    const e = i[1];
    return e.length === 3 ? [
      parseInt(e.charAt(0) + e.charAt(0), 16),
      parseInt(e.charAt(1) + e.charAt(1), 16),
      parseInt(e.charAt(2) + e.charAt(2), 16)
    ] : [
      parseInt(e.substring(0, 2), 16),
      parseInt(e.substring(2, 4), 16),
      parseInt(e.substring(4, 6), 16)
    ];
  }
  if (i = n.match(/^rgba?\(\s*([^)]+)\s*\)$/i), i) {
    const e = i[1].split(",").map((l) => l.trim());
    if (e.length >= 3) {
      const l = function(h) {
        if (/%$/.test(h)) {
          const y = Number(h.slice(0, -1));
          return Number.isFinite(y) ? Math.max(0, Math.min(255, Math.round(y * 2.55))) : null;
        }
        const m = Number(h);
        return Number.isFinite(m) ? Math.max(0, Math.min(255, Math.round(m))) : null;
      }, o = e.slice(0, 3).map(l);
      if (o.every((h) => h !== null))
        return o;
    }
  }
  switch (n) {
    case "black":
      return [0, 0, 0];
    case "white":
      return [255, 255, 255];
    case "red":
      return [255, 0, 0];
    case "green":
      return [0, 128, 0];
    case "blue":
      return [0, 0, 255];
    case "yellow":
      return [255, 255, 0];
    case "gray":
    case "grey":
      return [128, 128, 128];
    case "transparent":
      return [255, 255, 255];
    default:
      return r;
  }
}, M = function(a, r, n, i) {
  const e = a, l = r, o = new Array(a * r), h = {
    setPixel(t, c, s) {
      o[c * e + t] = s;
    },
    write(t) {
      t.writeString("GIF87a"), t.writeShort(e), t.writeShort(l), t.writeByte(128), t.writeByte(0), t.writeByte(0), t.writeByte(n[0]), t.writeByte(n[1]), t.writeByte(n[2]), t.writeByte(i[0]), t.writeByte(i[1]), t.writeByte(i[2]), t.writeString(","), t.writeShort(0), t.writeShort(0), t.writeShort(e), t.writeShort(l), t.writeByte(0);
      const c = 2, s = g(c);
      t.writeByte(c);
      let u = 0;
      for (; s.length - u > 255; )
        t.writeByte(255), t.writeBytes(s, u, 255), u += 255;
      t.writeByte(s.length - u), t.writeBytes(s, u, s.length - u), t.writeByte(0), t.writeString(";");
    }
  }, m = function(t) {
    let c = 0, s = 0;
    return {
      write(u, w) {
        if (u >>> w)
          throw "length over";
        for (; c + w >= 8; )
          t.writeByte(255 & (u << c | s)), w -= 8 - c, u >>>= 8 - c, s = 0, c = 0;
        s = u << c | s, c = c + w;
      },
      flush() {
        c > 0 && t.writeByte(s);
      }
    };
  }, y = function() {
    const t = {};
    let c = 0;
    return {
      add(s) {
        if (typeof t[s] < "u")
          throw "dup key:" + s;
        t[s] = c, c += 1;
      },
      size() {
        return c;
      },
      indexOf(s) {
        return t[s];
      },
      contains(s) {
        return typeof t[s] < "u";
      }
    };
  }, g = function(t) {
    const c = 1 << t, s = (1 << t) + 1;
    let u = t + 1;
    const w = y();
    for (let p = 0; p < c; p += 1)
      w.add(String.fromCharCode(p));
    w.add(String.fromCharCode(c)), w.add(String.fromCharCode(s));
    const B = _(), f = m(B);
    f.write(c, u);
    let b = 0, d = String.fromCharCode(o[b]);
    for (b += 1; b < o.length; ) {
      const p = String.fromCharCode(o[b]);
      b += 1, w.contains(d + p) ? d = d + p : (f.write(w.indexOf(d), u), w.size() < 4095 && (w.size() == 1 << u && (u += 1), w.add(d + p)), d = p);
    }
    return f.write(w.indexOf(d), u), f.write(s, u), f.flush(), B.toByteArray();
  };
  return h;
}, O = function(a, r, n, i, e) {
  const l = M(a, r, n, i);
  for (let y = 0; y < r; y += 1)
    for (let g = 0; g < a; g += 1)
      l.setPixel(g, y, e(g, y));
  const o = _();
  l.write(o);
  const h = I(), m = o.toByteArray();
  for (let y = 0; y < m.length; y += 1)
    h.writeByte(m[y]);
  return h.flush(), "data:image/gif;base64," + h;
};
x.registerRenderer("gif", function(a, r, n, i) {
  let e = {};
  typeof a == "object" && (e = a || {}, a = void 0);
  let l = e.tag === !1 ? !1 : e.tag === !0 || typeof e.tag > "u" ? "img" : e.tag;
  typeof a != "number" && (a = typeof e.cellSize == "number" ? e.cellSize : 2), typeof r > "u" && (r = e.margin), typeof r != "number" && (r = typeof r > "u" ? a * 4 : 0), typeof n != "string" && (n = e.cellColor), typeof i != "string" && (i = e.backgroundColor);
  const o = typeof e.alt == "string" ? e.alt : void 0, h = typeof e.title == "string" ? e.title : void 0, m = C(typeof n == "string" ? n : "black", [0, 0, 0]), y = C(typeof i == "string" ? i : "white", [255, 255, 255]), g = Number(a), t = Number(r), s = Number(this.getModuleCount()) * g + t * 2, u = t, w = s - t, B = O(s, s, m, y, (b, d) => {
    if (u <= b && b < w && u <= d && d < w) {
      const p = Math.floor((b - u) / g), A = Math.floor((d - u) / g);
      return this.isDark(A, p) ? 0 : 1;
    }
    return 1;
  });
  if (l === !1)
    return B;
  l = typeof l == "string" ? l : "img";
  let f = "";
  return f += "<" + l, f += ' src="', f += B, f += '"', f += ' width="', f += s, f += '"', f += ' height="', f += s, f += '"', o && (f += ' alt="', f += S(o), f += '"'), h && (f += ' title="', f += S(h), f += '"'), f += "/>", f;
});
//# sourceMappingURL=gif.mjs.map
