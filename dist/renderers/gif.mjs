import { registerRenderer as O } from "./utils/registry.mjs";
import { parseRgbColor as C } from "./utils/color.mjs";
import { escapeXml as p } from "./utils/xml.mjs";
const _ = function() {
  const t = [], n = {
    writeByte(o) {
      t.push(o & 255);
    },
    writeShort(o) {
      n.writeByte(o), n.writeByte(o >>> 8);
    },
    writeBytes(o, l, w) {
      l = l || 0, w = w || o.length;
      for (let a = 0; a < w; a += 1)
        n.writeByte(o[a + l]);
    },
    writeString(o) {
      for (let l = 0; l < o.length; l += 1)
        n.writeByte(o.charCodeAt(l));
    },
    toByteArray() {
      return t;
    }
  };
  return n;
}, x = function() {
  let t = 0, n = 0, o = 0, l = "";
  const w = function(i) {
    if (i < 26) return 65 + i;
    if (i < 52) return 97 + (i - 26);
    if (i < 62) return 48 + (i - 52);
    if (i == 62) return 43;
    if (i == 63) return 47;
    throw "n:" + i;
  }, a = function(i) {
    l += String.fromCharCode(w(i & 63));
  };
  return {
    writeByte(i) {
      for (t = t << 8 | i & 255, n += 8, o += 1; n >= 6; )
        a(t >>> n - 6), n -= 6;
    },
    flush() {
      if (n > 0 && (a(t << 6 - n), t = 0, n = 0), o % 3 != 0) {
        const i = 3 - o % 3;
        for (let d = 0; d < i; d += 1)
          l += "=";
      }
    },
    toString() {
      return l;
    }
  };
}, A = function(t, n, o, l) {
  const w = t, a = n, i = new Array(t * n), d = {
    setPixel(e, c, r) {
      i[c * w + e] = r;
    },
    write(e) {
      e.writeString("GIF87a"), e.writeShort(w), e.writeShort(a), e.writeByte(128), e.writeByte(0), e.writeByte(0), e.writeByte(o[0]), e.writeByte(o[1]), e.writeByte(o[2]), e.writeByte(l[0]), e.writeByte(l[1]), e.writeByte(l[2]), e.writeString(","), e.writeShort(0), e.writeShort(0), e.writeShort(w), e.writeShort(a), e.writeByte(0);
      const c = 2, r = m(c);
      e.writeByte(c);
      let s = 0;
      for (; r.length - s > 255; )
        e.writeByte(255), e.writeBytes(r, s, 255), s += 255;
      e.writeByte(r.length - s), e.writeBytes(r, s, r.length - s), e.writeByte(0), e.writeString(";");
    }
  }, B = function(e) {
    let c = 0, r = 0;
    return {
      write(s, y) {
        if (s >>> y)
          throw "length over";
        for (; c + y >= 8; )
          e.writeByte(255 & (s << c | r)), y -= 8 - c, s >>>= 8 - c, r = 0, c = 0;
        r = s << c | r, c = c + y;
      },
      flush() {
        c > 0 && e.writeByte(r);
      }
    };
  }, g = function() {
    const e = {};
    let c = 0;
    return {
      add(r) {
        if (typeof e[r] < "u")
          throw "dup key:" + r;
        e[r] = c, c += 1;
      },
      size() {
        return c;
      },
      indexOf(r) {
        return e[r];
      },
      contains(r) {
        return typeof e[r] < "u";
      }
    };
  }, m = function(e) {
    const c = 1 << e, r = (1 << e) + 1;
    let s = e + 1;
    const y = g();
    for (let h = 0; h < c; h += 1)
      y.add(String.fromCharCode(h));
    y.add(String.fromCharCode(c)), y.add(String.fromCharCode(r));
    const S = _(), f = B(S);
    f.write(c, s);
    let b = 0, u = String.fromCharCode(i[b]);
    for (b += 1; b < i.length; ) {
      const h = String.fromCharCode(i[b]);
      b += 1, y.contains(u + h) ? u = u + h : (f.write(y.indexOf(u), s), y.size() < 4095 && (y.size() == 1 << s && (s += 1), y.add(u + h)), u = h);
    }
    return f.write(y.indexOf(u), s), f.write(r, s), f.flush(), S.toByteArray();
  };
  return d;
}, L = function(t, n, o, l, w) {
  const a = A(t, n, o, l);
  for (let g = 0; g < n; g += 1)
    for (let m = 0; m < t; m += 1)
      a.setPixel(m, g, w(m, g));
  const i = _();
  a.write(i);
  const d = x(), B = i.toByteArray();
  for (let g = 0; g < B.length; g += 1)
    d.writeByte(B[g]);
  return d.flush(), "data:image/gif;base64," + d;
};
O("gif", {
  args: [
    { name: "cellSize", type: "number" },
    { name: "margin", type: "number" },
    { name: "cellColor", type: "string" },
    { name: "backgroundColor", type: "string" }
  ],
  render: function(t) {
    let n = t.tag === !1 ? !1 : t.tag === !0 || typeof t.tag > "u" ? "img" : t.tag, o = t.cellSize, l = t.margin, w = t.cellColor, a = t.backgroundColor;
    typeof o != "number" && (o = typeof t.cellSize == "number" ? t.cellSize : 2), typeof l > "u" && (l = t.margin), typeof l != "number" && (l = typeof l > "u" ? o * 4 : 0), typeof w != "string" && (w = t.cellColor), typeof a != "string" && (a = t.backgroundColor);
    const i = typeof t.alt == "string" ? t.alt : void 0, d = typeof t.title == "string" ? t.title : void 0, B = C(typeof w == "string" ? w : "black", [0, 0, 0]), g = C(typeof a == "string" ? a : "white", [255, 255, 255]), m = Number(o), e = Number(l), r = Number(this.getModuleCount()) * m + e * 2, s = e, y = r - e, S = L(r, r, B, g, (b, u) => {
      if (s <= b && b < y && s <= u && u < y) {
        const h = Math.floor((b - s) / m), z = Math.floor((u - s) / m);
        return this.isDark(z, h) ? 0 : 1;
      }
      return 1;
    });
    if (n === !1)
      return S;
    n = typeof n == "string" ? n : "img";
    let f = "";
    return f += "<" + n, f += ' src="', f += S, f += '"', f += ' width="', f += r, f += '"', f += ' height="', f += r, f += '"', i && (f += ' alt="', f += p(i), f += '"'), d && (f += ' title="', f += p(d), f += '"'), f += "/>", f;
  }
});
//# sourceMappingURL=gif.mjs.map
