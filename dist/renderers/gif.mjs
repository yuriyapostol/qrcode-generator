import x from "../core/qrcode.mjs";
import { parseRgbColor as S } from "./utils/color.mjs";
import { escapeXml as C } from "./utils/xml.mjs";
const _ = function() {
  const a = [], r = {
    writeByte(o) {
      a.push(o & 255);
    },
    writeShort(o) {
      r.writeByte(o), r.writeByte(o >>> 8);
    },
    writeBytes(o, w, i) {
      w = w || 0, i = i || o.length;
      for (let y = 0; y < i; y += 1)
        r.writeByte(o[y + w]);
    },
    writeString(o) {
      for (let w = 0; w < o.length; w += 1)
        r.writeByte(o.charCodeAt(w));
    },
    toByteArray() {
      return a;
    }
  };
  return r;
}, A = function() {
  let a = 0, r = 0, o = 0, w = "";
  const i = function(n) {
    if (n < 26) return 65 + n;
    if (n < 52) return 97 + (n - 26);
    if (n < 62) return 48 + (n - 52);
    if (n == 62) return 43;
    if (n == 63) return 47;
    throw "n:" + n;
  }, y = function(n) {
    w += String.fromCharCode(i(n & 63));
  };
  return {
    writeByte(n) {
      for (a = a << 8 | n & 255, r += 8, o += 1; r >= 6; )
        y(a >>> r - 6), r -= 6;
    },
    flush() {
      if (r > 0 && (y(a << 6 - r), a = 0, r = 0), o % 3 != 0) {
        const n = 3 - o % 3;
        for (let h = 0; h < n; h += 1)
          w += "=";
      }
    },
    toString() {
      return w;
    }
  };
}, L = function(a, r, o, w) {
  const i = a, y = r, n = new Array(a * r), h = {
    setPixel(t, f, e) {
      n[f * i + t] = e;
    },
    write(t) {
      t.writeString("GIF87a"), t.writeShort(i), t.writeShort(y), t.writeByte(128), t.writeByte(0), t.writeByte(0), t.writeByte(o[0]), t.writeByte(o[1]), t.writeByte(o[2]), t.writeByte(w[0]), t.writeByte(w[1]), t.writeByte(w[2]), t.writeString(","), t.writeShort(0), t.writeShort(0), t.writeShort(i), t.writeShort(y), t.writeByte(0);
      const f = 2, e = g(f);
      t.writeByte(f);
      let c = 0;
      for (; e.length - c > 255; )
        t.writeByte(255), t.writeBytes(e, c, 255), c += 255;
      t.writeByte(e.length - c), t.writeBytes(e, c, e.length - c), t.writeByte(0), t.writeString(";");
    }
  }, p = function(t) {
    let f = 0, e = 0;
    return {
      write(c, l) {
        if (c >>> l)
          throw "length over";
        for (; f + l >= 8; )
          t.writeByte(255 & (c << f | e)), l -= 8 - f, c >>>= 8 - f, e = 0, f = 0;
        e = c << f | e, f = f + l;
      },
      flush() {
        f > 0 && t.writeByte(e);
      }
    };
  }, d = function() {
    const t = {};
    let f = 0;
    return {
      add(e) {
        if (typeof t[e] < "u")
          throw "dup key:" + e;
        t[e] = f, f += 1;
      },
      size() {
        return f;
      },
      indexOf(e) {
        return t[e];
      },
      contains(e) {
        return typeof t[e] < "u";
      }
    };
  }, g = function(t) {
    const f = 1 << t, e = (1 << t) + 1;
    let c = t + 1;
    const l = d();
    for (let B = 0; B < f; B += 1)
      l.add(String.fromCharCode(B));
    l.add(String.fromCharCode(f)), l.add(String.fromCharCode(e));
    const b = _(), s = p(b);
    s.write(f, c);
    let m = 0, u = String.fromCharCode(n[m]);
    for (m += 1; m < n.length; ) {
      const B = String.fromCharCode(n[m]);
      m += 1, l.contains(u + B) ? u = u + B : (s.write(l.indexOf(u), c), l.size() < 4095 && (l.size() == 1 << c && (c += 1), l.add(u + B)), u = B);
    }
    return s.write(l.indexOf(u), c), s.write(e, c), s.flush(), b.toByteArray();
  };
  return h;
}, R = function(a, r, o, w, i) {
  const y = L(a, r, o, w);
  for (let d = 0; d < r; d += 1)
    for (let g = 0; g < a; g += 1)
      y.setPixel(g, d, i(g, d));
  const n = _();
  y.write(n);
  const h = A(), p = n.toByteArray();
  for (let d = 0; d < p.length; d += 1)
    h.writeByte(p[d]);
  return h.flush(), "data:image/gif;base64," + h;
};
x.registerRenderer("gif", function(a, r, o, w) {
  let i = {};
  typeof a == "object" && (i = a || {}, a = void 0);
  let y = i.tag === !1 ? !1 : i.tag === !0 || typeof i.tag > "u" ? "img" : i.tag;
  typeof a != "number" && (a = typeof i.cellSize == "number" ? i.cellSize : 2), typeof r > "u" && (r = i.margin), typeof r != "number" && (r = typeof r > "u" ? a * 4 : 0), typeof o != "string" && (o = i.cellColor), typeof w != "string" && (w = i.backgroundColor);
  const n = typeof i.alt == "string" ? i.alt : void 0, h = typeof i.title == "string" ? i.title : void 0, p = S(typeof o == "string" ? o : "black", [0, 0, 0]), d = S(typeof w == "string" ? w : "white", [255, 255, 255]), g = Number(a), t = Number(r), e = Number(this.getModuleCount()) * g + t * 2, c = t, l = e - t, b = R(e, e, p, d, (m, u) => {
    if (c <= m && m < l && c <= u && u < l) {
      const B = Math.floor((m - c) / g), O = Math.floor((u - c) / g);
      return this.isDark(O, B) ? 0 : 1;
    }
    return 1;
  });
  if (y === !1)
    return b;
  y = typeof y == "string" ? y : "img";
  let s = "";
  return s += "<" + y, s += ' src="', s += b, s += '"', s += ' width="', s += e, s += '"', s += ' height="', s += e, s += '"', n && (s += ' alt="', s += C(n), s += '"'), h && (s += ' title="', s += C(h), s += '"'), s += "/>", s;
});
//# sourceMappingURL=gif.mjs.map
