import { registerRenderer as O } from "./utils/registry.mjs";
import { parseRgbColor as C } from "./utils/color.mjs";
import { escapeXml as p } from "./utils/xml.mjs";
const _ = function() {
  const e = [], a = {
    writeByte(i) {
      e.push(i & 255);
    },
    writeShort(i) {
      a.writeByte(i), a.writeByte(i >>> 8);
    },
    writeBytes(i, c, g) {
      c = c || 0, g = g || i.length;
      for (let y = 0; y < g; y += 1)
        a.writeByte(i[y + c]);
    },
    writeString(i) {
      for (let c = 0; c < i.length; c += 1)
        a.writeByte(i.charCodeAt(c));
    },
    toByteArray() {
      return e;
    }
  };
  return a;
}, x = function() {
  let e = 0, a = 0, i = 0, c = "";
  const g = function(r) {
    if (r < 26) return 65 + r;
    if (r < 52) return 97 + (r - 26);
    if (r < 62) return 48 + (r - 52);
    if (r == 62) return 43;
    if (r == 63) return 47;
    throw "n:" + r;
  }, y = function(r) {
    c += String.fromCharCode(g(r & 63));
  };
  return {
    writeByte(r) {
      for (e = e << 8 | r & 255, a += 8, i += 1; a >= 6; )
        y(e >>> a - 6), a -= 6;
    },
    flush() {
      if (a > 0 && (y(e << 6 - a), e = 0, a = 0), i % 3 != 0) {
        const r = 3 - i % 3;
        for (let d = 0; d < r; d += 1)
          c += "=";
      }
    },
    toString() {
      return c;
    }
  };
}, L = function(e, a, i, c) {
  const g = e, y = a, r = new Array(e * a), d = {
    setPixel(t, n, l) {
      r[n * g + t] = l;
    },
    write(t) {
      t.writeString("GIF87a"), t.writeShort(g), t.writeShort(y), t.writeByte(128), t.writeByte(0), t.writeByte(0), t.writeByte(i[0]), t.writeByte(i[1]), t.writeByte(i[2]), t.writeByte(c[0]), t.writeByte(c[1]), t.writeByte(c[2]), t.writeString(","), t.writeShort(0), t.writeShort(0), t.writeShort(g), t.writeShort(y), t.writeByte(0);
      const n = 2, l = B(n);
      t.writeByte(n);
      let o = 0;
      for (; l.length - o > 255; )
        t.writeByte(255), t.writeBytes(l, o, 255), o += 255;
      t.writeByte(l.length - o), t.writeBytes(l, o, l.length - o), t.writeByte(0), t.writeString(";");
    }
  }, b = function(t) {
    let n = 0, l = 0;
    return {
      write(o, s) {
        if (o >>> s)
          throw "length over";
        for (; n + s >= 8; )
          t.writeByte(255 & (o << n | l)), s -= 8 - n, o >>>= 8 - n, l = 0, n = 0;
        l = o << n | l, n = n + s;
      },
      flush() {
        n > 0 && t.writeByte(l);
      }
    };
  }, w = function() {
    const t = {};
    let n = 0;
    return {
      add(l) {
        if (typeof t[l] < "u")
          throw "dup key:" + l;
        t[l] = n, n += 1;
      },
      size() {
        return n;
      },
      indexOf(l) {
        return t[l];
      },
      contains(l) {
        return typeof t[l] < "u";
      }
    };
  }, B = function(t) {
    const n = 1 << t, l = (1 << t) + 1;
    let o = t + 1;
    const s = w();
    for (let m = 0; m < n; m += 1)
      s.add(String.fromCharCode(m));
    s.add(String.fromCharCode(n)), s.add(String.fromCharCode(l));
    const S = _(), h = b(S);
    h.write(n, o);
    let f = 0, u = String.fromCharCode(r[f]);
    for (f += 1; f < r.length; ) {
      const m = String.fromCharCode(r[f]);
      f += 1, s.contains(u + m) ? u = u + m : (h.write(s.indexOf(u), o), s.size() < 4095 && (s.size() == 1 << o && (o += 1), s.add(u + m)), u = m);
    }
    return h.write(s.indexOf(u), o), h.write(l, o), h.flush(), S.toByteArray();
  };
  return d;
}, N = function(e, a, i, c, g) {
  const y = L(e, a, i, c);
  for (let w = 0; w < a; w += 1)
    for (let B = 0; B < e; B += 1)
      y.setPixel(B, w, g(B, w));
  const r = _();
  y.write(r);
  const d = x(), b = r.toByteArray();
  for (let w = 0; w < b.length; w += 1)
    d.writeByte(b[w]);
  return d.flush(), "data:image/gif;base64," + d;
};
O("gif", {
  args: [
    { name: "cellSize", type: "number" },
    { name: "margin", type: "number" },
    { name: "cellColor", type: "string" },
    { name: "backgroundColor", type: "string" }
  ],
  render: function(e) {
    const a = typeof e.output == "string" ? e.output.toLowerCase() : void 0;
    let i = a === "dataurl" || e.tag === !1 ? !1 : typeof e.tagName == "string" ? e.tagName : e.tag === !0 || typeof e.tag > "u" ? "img" : e.tag, c = e.cellSize, g = e.margin, y = e.cellColor, r = e.backgroundColor;
    typeof c != "number" && (c = typeof e.cellSize == "number" ? e.cellSize : 2), typeof g > "u" && (g = e.margin), typeof g != "number" && (g = typeof g > "u" ? c * 4 : 0), typeof y != "string" && (y = e.cellColor), typeof r != "string" && (r = e.backgroundColor);
    const d = typeof e.alt == "string" ? e.alt : void 0, b = typeof e.title == "string" ? e.title : void 0, w = C(typeof y == "string" ? y : "black", [0, 0, 0]), B = C(typeof r == "string" ? r : "white", [255, 255, 255]), t = Number(c), n = Number(g), o = Number(this.getModuleCount()) * t + n * 2, s = n, S = o - n, h = N(o, o, w, B, (u, m) => {
      if (s <= u && u < S && s <= m && m < S) {
        const z = Math.floor((u - s) / t), A = Math.floor((m - s) / t);
        return this.isDark(A, z) ? 0 : 1;
      }
      return 1;
    });
    if (i === !1)
      return h;
    if (i = typeof i == "string" ? i : "img", a === "element") {
      const u = e.target || (typeof document < "u" ? document.createElement(i) : null);
      return u ? (u.setAttribute("src", h), u.setAttribute("width", String(o)), u.setAttribute("height", String(o)), d && u.setAttribute("alt", d), b && u.setAttribute("title", b), u) : h;
    }
    let f = "";
    return f += "<" + i, f += ' src="', f += h, f += '"', f += ' width="', f += o, f += '"', f += ' height="', f += o, f += '"', d && (f += ' alt="', f += p(d), f += '"'), b && (f += ' title="', f += p(b), f += '"'), f += "/>", f;
  }
});
//# sourceMappingURL=gif.mjs.map
