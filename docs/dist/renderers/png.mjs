import { registerRenderer as Re } from "./utils/registry.mjs";
import { parseRgbaColor as ge } from "./utils/color.mjs";
import { escapeXml as be } from "./utils/xml.mjs";
var Xt = {}, Bt = {}, jt = {}, pe;
function Te() {
  if (pe) return jt;
  pe = 1;
  const X = 4, J = 0, ot = 1, I = 2;
  function B(e) {
    let L = e.length;
    for (; --L >= 0; )
      e[L] = 0;
  }
  const C = 0, V = 1, et = 2, rt = 3, it = 258, i = 29, E = 256, c = E + 1 + i, g = 30, H = 19, G = 2 * c + 1, K = 15, m = 16, P = 7, Q = 256, A = 16, M = 17, h = 18, o = (
    /* extra bits for each length code */
    new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0])
  ), R = (
    /* extra bits for each distance code */
    new Uint8Array([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13])
  ), k = (
    /* extra bits for each bit length code */
    new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7])
  ), j = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), r = 512, l = new Array((c + 2) * 2);
  B(l);
  const _ = new Array(g * 2);
  B(_);
  const f = new Array(r);
  B(f);
  const s = new Array(it - rt + 1);
  B(s);
  const b = new Array(i);
  B(b);
  const p = new Array(g);
  B(p);
  function w(e, L, D, q, $) {
    this.static_tree = e, this.extra_bits = L, this.extra_base = D, this.elems = q, this.max_length = $, this.has_stree = e && e.length;
  }
  let a, u, d;
  function S(e, L) {
    this.dyn_tree = e, this.max_code = 0, this.stat_desc = L;
  }
  const T = (e) => e < 256 ? f[e] : f[256 + (e >>> 7)], F = (e, L) => {
    e.pending_buf[e.pending++] = L & 255, e.pending_buf[e.pending++] = L >>> 8 & 255;
  }, Z = (e, L, D) => {
    e.bi_valid > m - D ? (e.bi_buf |= L << e.bi_valid & 65535, F(e, e.bi_buf), e.bi_buf = L >> m - e.bi_valid, e.bi_valid += D - m) : (e.bi_buf |= L << e.bi_valid & 65535, e.bi_valid += D);
  }, U = (e, L, D) => {
    Z(
      e,
      D[L * 2],
      D[L * 2 + 1]
      /*.Len*/
    );
  }, N = (e, L) => {
    let D = 0;
    do
      D |= e & 1, e >>>= 1, D <<= 1;
    while (--L > 0);
    return D >>> 1;
  }, x = (e) => {
    e.bi_valid === 16 ? (F(e, e.bi_buf), e.bi_buf = 0, e.bi_valid = 0) : e.bi_valid >= 8 && (e.pending_buf[e.pending++] = e.bi_buf & 255, e.bi_buf >>= 8, e.bi_valid -= 8);
  }, dt = (e, L) => {
    const D = L.dyn_tree, q = L.max_code, $ = L.stat_desc.static_tree, W = L.stat_desc.has_stree, O = L.stat_desc.extra_bits, lt = L.stat_desc.extra_base, mt = L.stat_desc.max_length;
    let ut, pt, At, ft, Rt, Tt, It = 0;
    for (ft = 0; ft <= K; ft++)
      e.bl_count[ft] = 0;
    for (D[e.heap[e.heap_max] * 2 + 1] = 0, ut = e.heap_max + 1; ut < G; ut++)
      pt = e.heap[ut], ft = D[D[pt * 2 + 1] * 2 + 1] + 1, ft > mt && (ft = mt, It++), D[pt * 2 + 1] = ft, !(pt > q) && (e.bl_count[ft]++, Rt = 0, pt >= lt && (Rt = O[pt - lt]), Tt = D[pt * 2], e.opt_len += Tt * (ft + Rt), W && (e.static_len += Tt * ($[pt * 2 + 1] + Rt)));
    if (It !== 0) {
      do {
        for (ft = mt - 1; e.bl_count[ft] === 0; )
          ft--;
        e.bl_count[ft]--, e.bl_count[ft + 1] += 2, e.bl_count[mt]--, It -= 2;
      } while (It > 0);
      for (ft = mt; ft !== 0; ft--)
        for (pt = e.bl_count[ft]; pt !== 0; )
          At = e.heap[--ut], !(At > q) && (D[At * 2 + 1] !== ft && (e.opt_len += (ft - D[At * 2 + 1]) * D[At * 2], D[At * 2 + 1] = ft), pt--);
    }
  }, nt = (e, L, D) => {
    const q = new Array(K + 1);
    let $ = 0, W, O;
    for (W = 1; W <= K; W++)
      $ = $ + D[W - 1] << 1, q[W] = $;
    for (O = 0; O <= L; O++) {
      let lt = e[O * 2 + 1];
      lt !== 0 && (e[O * 2] = N(q[lt]++, lt));
    }
  }, ht = () => {
    let e, L, D, q, $;
    const W = new Array(K + 1);
    for (D = 0, q = 0; q < i - 1; q++)
      for (b[q] = D, e = 0; e < 1 << o[q]; e++)
        s[D++] = q;
    for (s[D - 1] = q, $ = 0, q = 0; q < 16; q++)
      for (p[q] = $, e = 0; e < 1 << R[q]; e++)
        f[$++] = q;
    for ($ >>= 7; q < g; q++)
      for (p[q] = $ << 7, e = 0; e < 1 << R[q] - 7; e++)
        f[256 + $++] = q;
    for (L = 0; L <= K; L++)
      W[L] = 0;
    for (e = 0; e <= 143; )
      l[e * 2 + 1] = 8, e++, W[8]++;
    for (; e <= 255; )
      l[e * 2 + 1] = 9, e++, W[9]++;
    for (; e <= 279; )
      l[e * 2 + 1] = 7, e++, W[7]++;
    for (; e <= 287; )
      l[e * 2 + 1] = 8, e++, W[8]++;
    for (nt(l, c + 1, W), e = 0; e < g; e++)
      _[e * 2 + 1] = 5, _[e * 2] = N(e, 5);
    a = new w(l, o, E + 1, c, K), u = new w(_, R, 0, g, K), d = new w(new Array(0), k, 0, H, P);
  }, at = (e) => {
    let L;
    for (L = 0; L < c; L++)
      e.dyn_ltree[L * 2] = 0;
    for (L = 0; L < g; L++)
      e.dyn_dtree[L * 2] = 0;
    for (L = 0; L < H; L++)
      e.bl_tree[L * 2] = 0;
    e.dyn_ltree[Q * 2] = 1, e.opt_len = e.static_len = 0, e.sym_next = e.matches = 0;
  }, yt = (e) => {
    e.bi_valid > 8 ? F(e, e.bi_buf) : e.bi_valid > 0 && (e.pending_buf[e.pending++] = e.bi_buf), e.bi_buf = 0, e.bi_valid = 0;
  }, xt = (e, L, D, q) => {
    const $ = L * 2, W = D * 2;
    return e[$] < e[W] || e[$] === e[W] && q[L] <= q[D];
  }, gt = (e, L, D) => {
    const q = e.heap[D];
    let $ = D << 1;
    for (; $ <= e.heap_len && ($ < e.heap_len && xt(L, e.heap[$ + 1], e.heap[$], e.depth) && $++, !xt(L, q, e.heap[$], e.depth)); )
      e.heap[D] = e.heap[$], D = $, $ <<= 1;
    e.heap[D] = q;
  }, Dt = (e, L, D) => {
    let q, $, W = 0, O, lt;
    if (e.sym_next !== 0)
      do
        q = e.pending_buf[e.sym_buf + W++] & 255, q += (e.pending_buf[e.sym_buf + W++] & 255) << 8, $ = e.pending_buf[e.sym_buf + W++], q === 0 ? U(e, $, L) : (O = s[$], U(e, O + E + 1, L), lt = o[O], lt !== 0 && ($ -= b[O], Z(e, $, lt)), q--, O = T(q), U(e, O, D), lt = R[O], lt !== 0 && (q -= p[O], Z(e, q, lt)));
      while (W < e.sym_next);
    U(e, Q, L);
  }, zt = (e, L) => {
    const D = L.dyn_tree, q = L.stat_desc.static_tree, $ = L.stat_desc.has_stree, W = L.stat_desc.elems;
    let O, lt, mt = -1, ut;
    for (e.heap_len = 0, e.heap_max = G, O = 0; O < W; O++)
      D[O * 2] !== 0 ? (e.heap[++e.heap_len] = mt = O, e.depth[O] = 0) : D[O * 2 + 1] = 0;
    for (; e.heap_len < 2; )
      ut = e.heap[++e.heap_len] = mt < 2 ? ++mt : 0, D[ut * 2] = 1, e.depth[ut] = 0, e.opt_len--, $ && (e.static_len -= q[ut * 2 + 1]);
    for (L.max_code = mt, O = e.heap_len >> 1; O >= 1; O--)
      gt(e, D, O);
    ut = W;
    do
      O = e.heap[
        1
        /*SMALLEST*/
      ], e.heap[
        1
        /*SMALLEST*/
      ] = e.heap[e.heap_len--], gt(
        e,
        D,
        1
        /*SMALLEST*/
      ), lt = e.heap[
        1
        /*SMALLEST*/
      ], e.heap[--e.heap_max] = O, e.heap[--e.heap_max] = lt, D[ut * 2] = D[O * 2] + D[lt * 2], e.depth[ut] = (e.depth[O] >= e.depth[lt] ? e.depth[O] : e.depth[lt]) + 1, D[O * 2 + 1] = D[lt * 2 + 1] = ut, e.heap[
        1
        /*SMALLEST*/
      ] = ut++, gt(
        e,
        D,
        1
        /*SMALLEST*/
      );
    while (e.heap_len >= 2);
    e.heap[--e.heap_max] = e.heap[
      1
      /*SMALLEST*/
    ], dt(e, L), nt(D, mt, e.bl_count);
  }, Mt = (e, L, D) => {
    let q, $ = -1, W, O = L[1], lt = 0, mt = 7, ut = 4;
    for (O === 0 && (mt = 138, ut = 3), L[(D + 1) * 2 + 1] = 65535, q = 0; q <= D; q++)
      W = O, O = L[(q + 1) * 2 + 1], !(++lt < mt && W === O) && (lt < ut ? e.bl_tree[W * 2] += lt : W !== 0 ? (W !== $ && e.bl_tree[W * 2]++, e.bl_tree[A * 2]++) : lt <= 10 ? e.bl_tree[M * 2]++ : e.bl_tree[h * 2]++, lt = 0, $ = W, O === 0 ? (mt = 138, ut = 3) : W === O ? (mt = 6, ut = 3) : (mt = 7, ut = 4));
  }, Et = (e, L, D) => {
    let q, $ = -1, W, O = L[1], lt = 0, mt = 7, ut = 4;
    for (O === 0 && (mt = 138, ut = 3), q = 0; q <= D; q++)
      if (W = O, O = L[(q + 1) * 2 + 1], !(++lt < mt && W === O)) {
        if (lt < ut)
          do
            U(e, W, e.bl_tree);
          while (--lt !== 0);
        else W !== 0 ? (W !== $ && (U(e, W, e.bl_tree), lt--), U(e, A, e.bl_tree), Z(e, lt - 3, 2)) : lt <= 10 ? (U(e, M, e.bl_tree), Z(e, lt - 3, 3)) : (U(e, h, e.bl_tree), Z(e, lt - 11, 7));
        lt = 0, $ = W, O === 0 ? (mt = 138, ut = 3) : W === O ? (mt = 6, ut = 3) : (mt = 7, ut = 4);
      }
  }, $t = (e) => {
    let L;
    for (Mt(e, e.dyn_ltree, e.l_desc.max_code), Mt(e, e.dyn_dtree, e.d_desc.max_code), zt(e, e.bl_desc), L = H - 1; L >= 3 && e.bl_tree[j[L] * 2 + 1] === 0; L--)
      ;
    return e.opt_len += 3 * (L + 1) + 5 + 5 + 4, L;
  }, kt = (e, L, D, q) => {
    let $;
    for (Z(e, L - 257, 5), Z(e, D - 1, 5), Z(e, q - 4, 4), $ = 0; $ < q; $++)
      Z(e, e.bl_tree[j[$] * 2 + 1], 3);
    Et(e, e.dyn_ltree, L - 1), Et(e, e.dyn_dtree, D - 1);
  }, Zt = (e) => {
    let L = 4093624447, D;
    for (D = 0; D <= 31; D++, L >>>= 1)
      if (L & 1 && e.dyn_ltree[D * 2] !== 0)
        return J;
    if (e.dyn_ltree[18] !== 0 || e.dyn_ltree[20] !== 0 || e.dyn_ltree[26] !== 0)
      return ot;
    for (D = 32; D < E; D++)
      if (e.dyn_ltree[D * 2] !== 0)
        return ot;
    return J;
  };
  let bt = !1;
  const St = (e) => {
    bt || (ht(), bt = !0), e.l_desc = new S(e.dyn_ltree, a), e.d_desc = new S(e.dyn_dtree, u), e.bl_desc = new S(e.bl_tree, d), e.bi_buf = 0, e.bi_valid = 0, at(e);
  }, ct = (e, L, D, q) => {
    Z(e, (C << 1) + (q ? 1 : 0), 3), yt(e), F(e, D), F(e, ~D), D && e.pending_buf.set(e.window.subarray(L, L + D), e.pending), e.pending += D;
  }, Lt = (e) => {
    Z(e, V << 1, 3), U(e, Q, l), x(e);
  }, qt = (e, L, D, q) => {
    let $, W, O = 0;
    e.level > 0 ? (e.strm.data_type === I && (e.strm.data_type = Zt(e)), zt(e, e.l_desc), zt(e, e.d_desc), O = $t(e), $ = e.opt_len + 3 + 7 >>> 3, W = e.static_len + 3 + 7 >>> 3, W <= $ && ($ = W)) : $ = W = D + 5, D + 4 <= $ && L !== -1 ? ct(e, L, D, q) : e.strategy === X || W === $ ? (Z(e, (V << 1) + (q ? 1 : 0), 3), Dt(e, l, _)) : (Z(e, (et << 1) + (q ? 1 : 0), 3), kt(e, e.l_desc.max_code + 1, e.d_desc.max_code + 1, O + 1), Dt(e, e.dyn_ltree, e.dyn_dtree)), at(e), q && yt(e);
  }, Ct = (e, L, D) => (e.pending_buf[e.sym_buf + e.sym_next++] = L, e.pending_buf[e.sym_buf + e.sym_next++] = L >> 8, e.pending_buf[e.sym_buf + e.sym_next++] = D, L === 0 ? e.dyn_ltree[D * 2]++ : (e.matches++, L--, e.dyn_ltree[(s[D] + E + 1) * 2]++, e.dyn_dtree[T(L) * 2]++), e.sym_next === e.sym_end);
  return jt._tr_init = St, jt._tr_stored_block = ct, jt._tr_flush_block = qt, jt._tr_tally = Ct, jt._tr_align = Lt, jt;
}
var ie, we;
function Ze() {
  return we || (we = 1, ie = (J, ot, I, B) => {
    let C = J & 65535 | 0, V = J >>> 16 & 65535 | 0, et = 0;
    for (; I !== 0; ) {
      et = I > 2e3 ? 2e3 : I, I -= et;
      do
        C = C + ot[B++] | 0, V = V + C | 0;
      while (--et);
      C %= 65521, V %= 65521;
    }
    return C | V << 16 | 0;
  }), ie;
}
var le, me;
function Ie() {
  if (me) return le;
  me = 1;
  const X = () => {
    let I, B = [];
    for (var C = 0; C < 256; C++) {
      I = C;
      for (var V = 0; V < 8; V++)
        I = I & 1 ? 3988292384 ^ I >>> 1 : I >>> 1;
      B[C] = I;
    }
    return B;
  }, J = new Uint32Array(X());
  return le = (I, B, C, V) => {
    const et = J, rt = V + C;
    I ^= -1;
    for (let it = V; it < rt; it++)
      I = I >>> 8 ^ et[(I ^ B[it]) & 255];
    return I ^ -1;
  }, le;
}
var fe, xe;
function Ue() {
  return xe || (xe = 1, fe = {
    2: "need dictionary",
    /* Z_NEED_DICT       2  */
    1: "stream end",
    /* Z_STREAM_END      1  */
    0: "",
    /* Z_OK              0  */
    "-1": "file error",
    /* Z_ERRNO         (-1) */
    "-2": "stream error",
    /* Z_STREAM_ERROR  (-2) */
    "-3": "data error",
    /* Z_DATA_ERROR    (-3) */
    "-4": "insufficient memory",
    /* Z_MEM_ERROR     (-4) */
    "-5": "buffer error",
    /* Z_BUF_ERROR     (-5) */
    "-6": "incompatible version"
    /* Z_VERSION_ERROR (-6) */
  }), fe;
}
var oe, ye;
function he() {
  return ye || (ye = 1, oe = {
    /* Allowed flush values; see deflate() and inflate() below for details */
    Z_NO_FLUSH: 0,
    Z_PARTIAL_FLUSH: 1,
    Z_SYNC_FLUSH: 2,
    Z_FULL_FLUSH: 3,
    Z_FINISH: 4,
    Z_BLOCK: 5,
    Z_TREES: 6,
    /* Return codes for the compression/decompression functions. Negative values
    * are errors, positive values are used for special but normal events.
    */
    Z_OK: 0,
    Z_STREAM_END: 1,
    Z_NEED_DICT: 2,
    Z_ERRNO: -1,
    Z_STREAM_ERROR: -2,
    Z_DATA_ERROR: -3,
    Z_MEM_ERROR: -4,
    Z_BUF_ERROR: -5,
    //Z_VERSION_ERROR: -6,
    /* compression levels */
    Z_NO_COMPRESSION: 0,
    Z_BEST_SPEED: 1,
    Z_BEST_COMPRESSION: 9,
    Z_DEFAULT_COMPRESSION: -1,
    Z_FILTERED: 1,
    Z_HUFFMAN_ONLY: 2,
    Z_RLE: 3,
    Z_FIXED: 4,
    Z_DEFAULT_STRATEGY: 0,
    /* Possible values of the data_type field (though see inflate()) */
    Z_BINARY: 0,
    Z_TEXT: 1,
    //Z_ASCII:                1, // = Z_TEXT (deprecated)
    Z_UNKNOWN: 2,
    /* The deflate compression method */
    Z_DEFLATED: 8
    //Z_NULL:                 null // Use -1 or null inline, depending on var type
  }), oe;
}
var ve;
function Le() {
  if (ve) return Bt;
  ve = 1;
  const { _tr_init: X, _tr_stored_block: J, _tr_flush_block: ot, _tr_tally: I, _tr_align: B } = Te(), C = Ze(), V = Ie(), et = Ue(), {
    Z_NO_FLUSH: rt,
    Z_PARTIAL_FLUSH: it,
    Z_FULL_FLUSH: i,
    Z_FINISH: E,
    Z_BLOCK: c,
    Z_OK: g,
    Z_STREAM_END: H,
    Z_STREAM_ERROR: G,
    Z_DATA_ERROR: K,
    Z_BUF_ERROR: m,
    Z_DEFAULT_COMPRESSION: P,
    Z_FILTERED: Q,
    Z_HUFFMAN_ONLY: A,
    Z_RLE: M,
    Z_FIXED: h,
    Z_DEFAULT_STRATEGY: o,
    Z_UNKNOWN: R,
    Z_DEFLATED: k
  } = he(), j = 9, r = 15, l = 8, s = 256 + 1 + 29, b = 30, p = 19, w = 2 * s + 1, a = 15, u = 3, d = 258, S = d + u + 1, T = 32, F = 42, Z = 57, U = 69, N = 73, x = 91, dt = 103, nt = 113, ht = 666, at = 1, yt = 2, xt = 3, gt = 4, Dt = 3, zt = (t, y) => (t.msg = et[y], y), Mt = (t) => t * 2 - (t > 4 ? 9 : 0), Et = (t) => {
    let y = t.length;
    for (; --y >= 0; )
      t[y] = 0;
  }, $t = (t) => {
    let y, n, z, v = t.w_size;
    y = t.hash_size, z = y;
    do
      n = t.head[--z], t.head[z] = n >= v ? n - v : 0;
    while (--y);
    y = v, z = y;
    do
      n = t.prev[--z], t.prev[z] = n >= v ? n - v : 0;
    while (--y);
  };
  let kt = (t, y, n) => (y << t.hash_shift ^ n) & t.hash_mask;
  const Zt = (t, y) => {
    let n;
    if (t.legacy_hash)
      n = t.ins_h = kt(t, t.ins_h, t.window[y + u - 1]);
    else {
      const v = t.window, Y = v[y] | v[y + 1] << 8 | v[y + 2] << 16 | v[y + 3] << 24;
      n = t.ins_h = Math.imul(Y, 66521) + 66521 >>> 16 & t.hash_mask;
    }
    const z = t.prev[y & t.w_mask] = t.head[n];
    return t.head[n] = y, z;
  }, bt = (t) => {
    const y = t.state;
    let n = y.pending;
    n > t.avail_out && (n = t.avail_out), n !== 0 && (t.output.set(y.pending_buf.subarray(y.pending_out, y.pending_out + n), t.next_out), t.next_out += n, y.pending_out += n, t.total_out += n, t.avail_out -= n, y.pending -= n, y.pending === 0 && (y.pending_out = 0));
  }, St = (t, y) => {
    ot(t, t.block_start >= 0 ? t.block_start : -1, t.strstart - t.block_start, y), t.block_start = t.strstart, bt(t.strm);
  }, ct = (t, y) => {
    t.pending_buf[t.pending++] = y;
  }, Lt = (t, y) => {
    t.pending_buf[t.pending++] = y >>> 8 & 255, t.pending_buf[t.pending++] = y & 255;
  }, qt = (t, y, n, z) => {
    let v = t.avail_in;
    return v > z && (v = z), v === 0 ? 0 : (t.avail_in -= v, y.set(t.input.subarray(t.next_in, t.next_in + v), n), t.state.wrap === 1 ? t.adler = C(t.adler, y, v, n) : t.state.wrap === 2 && (t.adler = V(t.adler, y, v, n)), t.next_in += v, t.total_in += v, v);
  }, Ct = (t, y) => {
    let n = t.max_chain_length, z = t.strstart, v, Y, _t = t.prev_length, vt = t.nice_match;
    const tt = t.strstart > t.w_size - S ? t.strstart - (t.w_size - S) : 0, wt = t.window, Gt = t.w_mask, ne = t.prev, Jt = t.strstart + d;
    let Ot = wt[z + _t - 1], Nt = wt[z + _t];
    t.prev_length >= t.good_match && (n >>= 2), vt > t.lookahead && (vt = t.lookahead);
    do
      if (v = y, !(wt[v + _t] !== Nt || wt[v + _t - 1] !== Ot || wt[v] !== wt[z] || wt[++v] !== wt[z + 1])) {
        z += 2, v++;
        do
          ;
        while (wt[++z] === wt[++v] && wt[++z] === wt[++v] && wt[++z] === wt[++v] && wt[++z] === wt[++v] && wt[++z] === wt[++v] && wt[++z] === wt[++v] && wt[++z] === wt[++v] && wt[++z] === wt[++v] && z < Jt);
        if (Y = d - (Jt - z), z = Jt - d, Y > _t) {
          if (t.match_start = y, _t = Y, Y >= vt)
            break;
          Ot = wt[z + _t - 1], Nt = wt[z + _t];
        }
      }
    while ((y = ne[y & Gt]) > tt && --n !== 0);
    return _t <= t.lookahead ? _t : t.lookahead;
  }, e = (t) => {
    const y = t.w_size;
    let n, z, v;
    do {
      if (z = t.window_size - t.lookahead - t.strstart, t.strstart >= y + (y - S) && (t.window.set(t.window.subarray(y, y + y - z), 0), t.match_start -= y, t.strstart -= y, t.block_start -= y, t.insert > t.strstart && (t.insert = t.strstart), $t(t), z += y), t.strm.avail_in === 0)
        break;
      if (n = qt(t.strm, t.window, t.strstart + t.lookahead, z), t.lookahead += n, t.legacy_hash) {
        if (t.lookahead + t.insert >= u)
          for (v = t.strstart - t.insert, t.ins_h = t.window[v], t.ins_h = kt(t, t.ins_h, t.window[v + 1]); t.insert && (Zt(t, v), v++, t.insert--, !(t.lookahead + t.insert < u)); )
            ;
      } else if (t.lookahead + t.insert > u)
        for (v = t.strstart - t.insert; t.insert && (Zt(t, v), v++, t.insert--, !(t.lookahead + t.insert <= u)); )
          ;
    } while (t.lookahead < S && t.strm.avail_in !== 0);
  }, L = (t, y) => {
    let n = t.pending_buf_size - 5 > t.w_size ? t.w_size : t.pending_buf_size - 5, z, v, Y, _t = 0, vt = t.strm.avail_in;
    do {
      if (z = 65535, Y = t.bi_valid + 42 >> 3, t.strm.avail_out < Y || (Y = t.strm.avail_out - Y, v = t.strstart - t.block_start, z > v + t.strm.avail_in && (z = v + t.strm.avail_in), z > Y && (z = Y), z < n && (z === 0 && y !== E || y === rt || z !== v + t.strm.avail_in)))
        break;
      _t = y === E && z === v + t.strm.avail_in ? 1 : 0, J(t, 0, 0, _t), t.pending_buf[t.pending - 4] = z, t.pending_buf[t.pending - 3] = z >> 8, t.pending_buf[t.pending - 2] = ~z, t.pending_buf[t.pending - 1] = ~z >> 8, bt(t.strm), v && (v > z && (v = z), t.strm.output.set(t.window.subarray(t.block_start, t.block_start + v), t.strm.next_out), t.strm.next_out += v, t.strm.avail_out -= v, t.strm.total_out += v, t.block_start += v, z -= v), z && (qt(t.strm, t.strm.output, t.strm.next_out, z), t.strm.next_out += z, t.strm.avail_out -= z, t.strm.total_out += z);
    } while (_t === 0);
    return vt -= t.strm.avail_in, vt && (vt >= t.w_size ? (t.matches = 2, t.window.set(t.strm.input.subarray(t.strm.next_in - t.w_size, t.strm.next_in), 0), t.strstart = t.w_size, t.insert = t.strstart) : (t.window_size - t.strstart <= vt && (t.strstart -= t.w_size, t.window.set(t.window.subarray(t.w_size, t.w_size + t.strstart), 0), t.matches < 2 && t.matches++, t.insert > t.strstart && (t.insert = t.strstart)), t.window.set(t.strm.input.subarray(t.strm.next_in - vt, t.strm.next_in), t.strstart), t.strstart += vt, t.insert += vt > t.w_size - t.insert ? t.w_size - t.insert : vt), t.block_start = t.strstart), t.high_water < t.strstart && (t.high_water = t.strstart), _t ? gt : y !== rt && y !== E && t.strm.avail_in === 0 && t.strstart === t.block_start ? yt : (Y = t.window_size - t.strstart, t.strm.avail_in > Y && t.block_start >= t.w_size && (t.block_start -= t.w_size, t.strstart -= t.w_size, t.window.set(t.window.subarray(t.w_size, t.w_size + t.strstart), 0), t.matches < 2 && t.matches++, Y += t.w_size, t.insert > t.strstart && (t.insert = t.strstart)), Y > t.strm.avail_in && (Y = t.strm.avail_in), Y && (qt(t.strm, t.window, t.strstart, Y), t.strstart += Y, t.insert += Y > t.w_size - t.insert ? t.w_size - t.insert : Y), t.high_water < t.strstart && (t.high_water = t.strstart), Y = t.bi_valid + 42 >> 3, Y = t.pending_buf_size - Y > 65535 ? 65535 : t.pending_buf_size - Y, n = Y > t.w_size ? t.w_size : Y, v = t.strstart - t.block_start, (v >= n || (v || y === E) && y !== rt && t.strm.avail_in === 0 && v <= Y) && (z = v > Y ? Y : v, _t = y === E && t.strm.avail_in === 0 && z === v ? 1 : 0, J(t, t.block_start, z, _t), t.block_start += z, bt(t.strm)), _t ? xt : at);
  }, D = (t, y) => {
    let n, z;
    for (; ; ) {
      if (t.lookahead < S) {
        if (e(t), t.lookahead < S && y === rt)
          return at;
        if (t.lookahead === 0)
          break;
      }
      if (n = 0, t.lookahead >= u && (n = Zt(t, t.strstart)), n !== 0 && t.strstart - n <= t.w_size - S && (t.match_length = Ct(t, n)), t.match_length >= u)
        if (z = I(t, t.strstart - t.match_start, t.match_length - u), t.lookahead -= t.match_length, t.match_length <= t.max_lazy_match && t.lookahead >= u) {
          t.match_length--;
          do
            t.strstart++, n = Zt(t, t.strstart);
          while (--t.match_length !== 0);
          t.strstart++;
        } else
          t.strstart += t.match_length, t.match_length = 0, t.legacy_hash && (t.ins_h = t.window[t.strstart], t.ins_h = kt(t, t.ins_h, t.window[t.strstart + 1]));
      else
        z = I(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++;
      if (z && (St(t, !1), t.strm.avail_out === 0))
        return at;
    }
    return t.insert = t.strstart < u - 1 ? t.strstart : u - 1, y === E ? (St(t, !0), t.strm.avail_out === 0 ? xt : gt) : t.sym_next && (St(t, !1), t.strm.avail_out === 0) ? at : yt;
  }, q = (t, y) => {
    let n, z, v;
    for (; ; ) {
      if (t.lookahead < S) {
        if (e(t), t.lookahead < S && y === rt)
          return at;
        if (t.lookahead === 0)
          break;
      }
      if (n = 0, t.lookahead >= u && (n = Zt(t, t.strstart)), t.prev_length = t.match_length, t.prev_match = t.match_start, t.match_length = u - 1, n !== 0 && t.prev_length < t.max_lazy_match && t.strstart - n <= t.w_size - S && (t.match_length = Ct(t, n), t.match_length <= 5 && (t.strategy === Q || t.match_length === u && t.strstart - t.match_start > 4096) && (t.match_length = u - 1)), t.prev_length >= u && t.match_length <= t.prev_length) {
        v = t.strstart + t.lookahead - u, z = I(t, t.strstart - 1 - t.prev_match, t.prev_length - u), t.lookahead -= t.prev_length - 1, t.prev_length -= 2;
        do
          ++t.strstart <= v && (n = Zt(t, t.strstart));
        while (--t.prev_length !== 0);
        if (t.match_available = 0, t.match_length = u - 1, t.strstart++, z && (St(t, !1), t.strm.avail_out === 0))
          return at;
      } else if (t.match_available) {
        if (z = I(t, 0, t.window[t.strstart - 1]), z && St(t, !1), t.strstart++, t.lookahead--, t.strm.avail_out === 0)
          return at;
      } else
        t.match_available = 1, t.strstart++, t.lookahead--;
    }
    return t.match_available && (z = I(t, 0, t.window[t.strstart - 1]), t.match_available = 0), t.insert = t.strstart < u - 1 ? t.strstart : u - 1, y === E ? (St(t, !0), t.strm.avail_out === 0 ? xt : gt) : t.sym_next && (St(t, !1), t.strm.avail_out === 0) ? at : yt;
  }, $ = (t, y) => {
    let n, z, v, Y;
    const _t = t.window;
    for (; ; ) {
      if (t.lookahead <= d) {
        if (e(t), t.lookahead <= d && y === rt)
          return at;
        if (t.lookahead === 0)
          break;
      }
      if (t.match_length = 0, t.lookahead >= u && t.strstart > 0 && (v = t.strstart - 1, z = _t[v], z === _t[++v] && z === _t[++v] && z === _t[++v])) {
        Y = t.strstart + d;
        do
          ;
        while (z === _t[++v] && z === _t[++v] && z === _t[++v] && z === _t[++v] && z === _t[++v] && z === _t[++v] && z === _t[++v] && z === _t[++v] && v < Y);
        t.match_length = d - (Y - v), t.match_length > t.lookahead && (t.match_length = t.lookahead);
      }
      if (t.match_length >= u ? (n = I(t, 1, t.match_length - u), t.lookahead -= t.match_length, t.strstart += t.match_length, t.match_length = 0) : (n = I(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++), n && (St(t, !1), t.strm.avail_out === 0))
        return at;
    }
    return t.insert = 0, y === E ? (St(t, !0), t.strm.avail_out === 0 ? xt : gt) : t.sym_next && (St(t, !1), t.strm.avail_out === 0) ? at : yt;
  }, W = (t, y) => {
    let n;
    for (; ; ) {
      if (t.lookahead === 0 && (e(t), t.lookahead === 0)) {
        if (y === rt)
          return at;
        break;
      }
      if (t.match_length = 0, n = I(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++, n && (St(t, !1), t.strm.avail_out === 0))
        return at;
    }
    return t.insert = 0, y === E ? (St(t, !0), t.strm.avail_out === 0 ? xt : gt) : t.sym_next && (St(t, !1), t.strm.avail_out === 0) ? at : yt;
  };
  function O(t, y, n, z, v) {
    this.good_length = t, this.max_lazy = y, this.nice_length = n, this.max_chain = z, this.func = v;
  }
  const lt = [
    /*      good lazy nice chain */
    new O(0, 0, 0, 0, L),
    /* 0 store only */
    new O(4, 4, 8, 4, D),
    /* 1 max speed, no lazy matches */
    new O(4, 5, 16, 8, D),
    /* 2 */
    new O(4, 6, 32, 32, D),
    /* 3 */
    new O(4, 4, 16, 16, q),
    /* 4 lazy matches */
    new O(8, 16, 32, 32, q),
    /* 5 */
    new O(8, 16, 128, 128, q),
    /* 6 */
    new O(8, 32, 128, 256, q),
    /* 7 */
    new O(32, 128, 258, 1024, q),
    /* 8 */
    new O(32, 258, 258, 4096, q)
    /* 9 max compression */
  ], mt = (t) => {
    t.window_size = 2 * t.w_size, Et(t.head), t.max_lazy_match = lt[t.level].max_lazy, t.good_match = lt[t.level].good_length, t.nice_match = lt[t.level].nice_length, t.max_chain_length = lt[t.level].max_chain, t.strstart = 0, t.block_start = 0, t.lookahead = 0, t.insert = 0, t.match_length = t.prev_length = u - 1, t.match_available = 0, t.ins_h = 0;
  };
  function ut() {
    this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = k, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.legacy_hash = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new Uint16Array(w * 2), this.dyn_dtree = new Uint16Array((2 * b + 1) * 2), this.bl_tree = new Uint16Array((2 * p + 1) * 2), Et(this.dyn_ltree), Et(this.dyn_dtree), Et(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new Uint16Array(a + 1), this.heap = new Uint16Array(2 * s + 1), Et(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new Uint16Array(2 * s + 1), Et(this.depth), this.sym_buf = 0, this.lit_bufsize = 0, this.sym_next = 0, this.sym_end = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
  }
  const pt = (t) => {
    if (!t)
      return 1;
    const y = t.state;
    return !y || y.strm !== t || y.status !== F && //#ifdef GZIP
    y.status !== Z && //#endif
    y.status !== U && y.status !== N && y.status !== x && y.status !== dt && y.status !== nt && y.status !== ht ? 1 : 0;
  }, At = (t) => {
    if (pt(t))
      return zt(t, G);
    t.total_in = t.total_out = 0, t.data_type = R;
    const y = t.state;
    return y.pending = 0, y.pending_out = 0, y.wrap < 0 && (y.wrap = -y.wrap), y.status = //#ifdef GZIP
    y.wrap === 2 ? Z : (
      //#endif
      y.wrap ? F : nt
    ), t.adler = y.wrap === 2 ? 0 : 1, y.last_flush = -2, X(y), g;
  }, ft = (t) => {
    const y = At(t);
    return y === g && mt(t.state), y;
  }, Rt = (t, y) => pt(t) || t.state.wrap !== 2 ? G : (t.state.gzhead = y, g), Tt = (t, y, n, z, v, Y, _t) => {
    if (!t)
      return G;
    let vt = 1;
    if (y === P && (y = 6), z < 0 ? (vt = 0, z = -z) : z > 15 && (vt = 2, z -= 16), v < 1 || v > j || n !== k || z < 8 || z > 15 || y < 0 || y > 9 || Y < 0 || Y > h || z === 8 && vt !== 1)
      return zt(t, G);
    z === 8 && (z = 9);
    const tt = new ut();
    return t.state = tt, tt.strm = t, tt.status = F, tt.wrap = vt, tt.gzhead = null, tt.w_bits = z, tt.w_size = 1 << tt.w_bits, tt.w_mask = tt.w_size - 1, tt.legacy_hash = _t ? 1 : 0, tt.hash_bits = v + 7, !tt.legacy_hash && tt.hash_bits < 15 && (tt.hash_bits = 15), tt.hash_size = 1 << tt.hash_bits, tt.hash_mask = tt.hash_size - 1, tt.hash_shift = ~~((tt.hash_bits + u - 1) / u), tt.window = new Uint8Array(tt.w_size * 2), tt.head = new Uint16Array(tt.hash_size), tt.prev = new Uint16Array(tt.w_size), tt.lit_bufsize = 1 << v + 6, tt.pending_buf_size = tt.lit_bufsize * 4, tt.pending_buf = new Uint8Array(tt.pending_buf_size), tt.sym_buf = tt.lit_bufsize, tt.sym_end = (tt.lit_bufsize - 1) * 3, tt.level = y, tt.strategy = Y, tt.method = n, ft(t);
  }, It = (t, y) => Tt(t, y, k, r, l, o), Ut = (t, y) => {
    if (pt(t) || y > c || y < 0)
      return t ? zt(t, G) : G;
    const n = t.state;
    if (!t.output || t.avail_in !== 0 && !t.input || n.status === ht && y !== E)
      return zt(t, t.avail_out === 0 ? m : G);
    const z = n.last_flush;
    if (n.last_flush = y, n.pending !== 0) {
      if (bt(t), t.avail_out === 0)
        return n.last_flush = -1, g;
    } else if (t.avail_in === 0 && Mt(y) <= Mt(z) && y !== E)
      return zt(t, m);
    if (n.status === ht && t.avail_in !== 0)
      return zt(t, m);
    if (n.status === F && n.wrap === 0 && (n.status = nt), n.status === F) {
      let v = k + (n.w_bits - 8 << 4) << 8, Y = -1;
      if (n.strategy >= A || n.level < 2 ? Y = 0 : n.level < 6 ? Y = 1 : n.level === 6 ? Y = 2 : Y = 3, v |= Y << 6, n.strstart !== 0 && (v |= T), v += 31 - v % 31, Lt(n, v), n.strstart !== 0 && (Lt(n, t.adler >>> 16), Lt(n, t.adler & 65535)), t.adler = 1, n.status = nt, bt(t), n.pending !== 0)
        return n.last_flush = -1, g;
    }
    if (n.status === Z) {
      if (t.adler = 0, ct(n, 31), ct(n, 139), ct(n, 8), n.gzhead)
        ct(
          n,
          (n.gzhead.text ? 1 : 0) + (n.gzhead.hcrc ? 2 : 0) + (n.gzhead.extra ? 4 : 0) + (n.gzhead.name ? 8 : 0) + (n.gzhead.comment ? 16 : 0)
        ), ct(n, n.gzhead.time & 255), ct(n, n.gzhead.time >> 8 & 255), ct(n, n.gzhead.time >> 16 & 255), ct(n, n.gzhead.time >> 24 & 255), ct(n, n.level === 9 ? 2 : n.strategy >= A || n.level < 2 ? 4 : 0), ct(n, n.gzhead.os & 255), n.gzhead.extra && n.gzhead.extra.length && (ct(n, n.gzhead.extra.length & 255), ct(n, n.gzhead.extra.length >> 8 & 255)), n.gzhead.hcrc && (t.adler = V(t.adler, n.pending_buf, n.pending, 0)), n.gzindex = 0, n.status = U;
      else if (ct(n, 0), ct(n, 0), ct(n, 0), ct(n, 0), ct(n, 0), ct(n, n.level === 9 ? 2 : n.strategy >= A || n.level < 2 ? 4 : 0), ct(n, Dt), n.status = nt, bt(t), n.pending !== 0)
        return n.last_flush = -1, g;
    }
    if (n.status === U) {
      if (n.gzhead.extra) {
        let v = n.pending, Y = (n.gzhead.extra.length & 65535) - n.gzindex;
        for (; n.pending + Y > n.pending_buf_size; ) {
          let vt = n.pending_buf_size - n.pending;
          if (n.pending_buf.set(n.gzhead.extra.subarray(n.gzindex, n.gzindex + vt), n.pending), n.pending = n.pending_buf_size, n.gzhead.hcrc && n.pending > v && (t.adler = V(t.adler, n.pending_buf, n.pending - v, v)), n.gzindex += vt, bt(t), n.pending !== 0)
            return n.last_flush = -1, g;
          v = 0, Y -= vt;
        }
        let _t = new Uint8Array(n.gzhead.extra);
        n.pending_buf.set(_t.subarray(n.gzindex, n.gzindex + Y), n.pending), n.pending += Y, n.gzhead.hcrc && n.pending > v && (t.adler = V(t.adler, n.pending_buf, n.pending - v, v)), n.gzindex = 0;
      }
      n.status = N;
    }
    if (n.status === N) {
      if (n.gzhead.name) {
        let v = n.pending, Y;
        do {
          if (n.pending === n.pending_buf_size) {
            if (n.gzhead.hcrc && n.pending > v && (t.adler = V(t.adler, n.pending_buf, n.pending - v, v)), bt(t), n.pending !== 0)
              return n.last_flush = -1, g;
            v = 0;
          }
          n.gzindex < n.gzhead.name.length ? Y = n.gzhead.name.charCodeAt(n.gzindex++) & 255 : Y = 0, ct(n, Y);
        } while (Y !== 0);
        n.gzhead.hcrc && n.pending > v && (t.adler = V(t.adler, n.pending_buf, n.pending - v, v)), n.gzindex = 0;
      }
      n.status = x;
    }
    if (n.status === x) {
      if (n.gzhead.comment) {
        let v = n.pending, Y;
        do {
          if (n.pending === n.pending_buf_size) {
            if (n.gzhead.hcrc && n.pending > v && (t.adler = V(t.adler, n.pending_buf, n.pending - v, v)), bt(t), n.pending !== 0)
              return n.last_flush = -1, g;
            v = 0;
          }
          n.gzindex < n.gzhead.comment.length ? Y = n.gzhead.comment.charCodeAt(n.gzindex++) & 255 : Y = 0, ct(n, Y);
        } while (Y !== 0);
        n.gzhead.hcrc && n.pending > v && (t.adler = V(t.adler, n.pending_buf, n.pending - v, v));
      }
      n.status = dt;
    }
    if (n.status === dt) {
      if (n.gzhead.hcrc) {
        if (n.pending + 2 > n.pending_buf_size && (bt(t), n.pending !== 0))
          return n.last_flush = -1, g;
        ct(n, t.adler & 255), ct(n, t.adler >> 8 & 255), t.adler = 0;
      }
      if (n.status = nt, bt(t), n.pending !== 0)
        return n.last_flush = -1, g;
    }
    if (t.avail_in !== 0 || n.lookahead !== 0 || y !== rt && n.status !== ht) {
      let v = n.level === 0 ? L(n, y) : n.strategy === A ? W(n, y) : n.strategy === M ? $(n, y) : lt[n.level].func(n, y);
      if ((v === xt || v === gt) && (n.status = ht), v === at || v === xt)
        return t.avail_out === 0 && (n.last_flush = -1), g;
      if (v === yt && (y === it ? B(n) : y !== c && (J(n, 0, 0, !1), y === i && (Et(n.head), n.lookahead === 0 && (n.strstart = 0, n.block_start = 0, n.insert = 0))), bt(t), t.avail_out === 0))
        return n.last_flush = -1, g;
    }
    return y !== E ? g : n.wrap <= 0 ? H : (n.wrap === 2 ? (ct(n, t.adler & 255), ct(n, t.adler >> 8 & 255), ct(n, t.adler >> 16 & 255), ct(n, t.adler >> 24 & 255), ct(n, t.total_in & 255), ct(n, t.total_in >> 8 & 255), ct(n, t.total_in >> 16 & 255), ct(n, t.total_in >> 24 & 255)) : (Lt(n, t.adler >>> 16), Lt(n, t.adler & 65535)), bt(t), n.wrap > 0 && (n.wrap = -n.wrap), n.pending !== 0 ? g : H);
  }, st = (t) => {
    if (pt(t))
      return G;
    const y = t.state.status;
    return t.state = null, y === nt ? zt(t, K) : g;
  }, Ft = (t, y) => {
    let n = y.length;
    if (pt(t))
      return G;
    const z = t.state, v = z.wrap;
    if (v === 2 || v === 1 && z.status !== F || z.lookahead)
      return G;
    if (v === 1 && (t.adler = C(t.adler, y, n, 0)), z.wrap = 0, n >= z.w_size) {
      v === 0 && (Et(z.head), z.strstart = 0, z.block_start = 0, z.insert = 0);
      let tt = new Uint8Array(z.w_size);
      tt.set(y.subarray(n - z.w_size, n), 0), y = tt, n = z.w_size;
    }
    const Y = t.avail_in, _t = t.next_in, vt = t.input;
    for (t.avail_in = n, t.next_in = 0, t.input = y, e(z); z.lookahead >= u; ) {
      let tt = z.strstart, wt = z.lookahead - (u - 1);
      do
        Zt(z, tt), tt++;
      while (--wt);
      z.strstart = tt, z.lookahead = u - 1, e(z);
    }
    return z.strstart += z.lookahead, z.block_start = z.strstart, z.insert = z.lookahead, z.lookahead = 0, z.match_length = z.prev_length = u - 1, z.match_available = 0, t.next_in = _t, t.input = vt, t.avail_in = Y, z.wrap = v, g;
  };
  return Bt.deflateInit = It, Bt.deflateInit2 = Tt, Bt.deflateReset = ft, Bt.deflateResetKeep = At, Bt.deflateSetHeader = Rt, Bt.deflate = Ut, Bt.deflateEnd = st, Bt.deflateSetDictionary = Ft, Bt.deflateInfo = "pako deflate (from Nodeca project)", Bt;
}
var ae = {}, ze;
function De() {
  if (ze) return ae;
  ze = 1;
  const X = (J, ot) => Object.prototype.hasOwnProperty.call(J, ot);
  return ae.assign = function(J) {
    const ot = Array.prototype.slice.call(arguments, 1);
    for (; ot.length; ) {
      const I = ot.shift();
      if (I) {
        if (typeof I != "object")
          throw new TypeError(I + "must be non-object");
        for (const B in I)
          X(I, B) && (J[B] = I[B]);
      }
    }
    return J;
  }, ae.flattenChunks = (J) => {
    let ot = 0;
    for (let B = 0, C = J.length; B < C; B++)
      ot += J[B].length;
    const I = new Uint8Array(ot);
    for (let B = 0, C = 0, V = J.length; B < V; B++) {
      let et = J[B];
      I.set(et, C), C += et.length;
    }
    return I;
  }, ae;
}
var ee = {}, Ee;
function Me() {
  if (Ee) return ee;
  Ee = 1;
  let X = !0;
  try {
    String.fromCharCode.apply(null, new Uint8Array(1));
  } catch {
    X = !1;
  }
  const J = new Uint8Array(256);
  for (let I = 0; I < 256; I++)
    J[I] = I >= 252 ? 6 : I >= 248 ? 5 : I >= 240 ? 4 : I >= 224 ? 3 : I >= 192 ? 2 : 1;
  J[254] = J[255] = 1, ee.string2buf = (I) => {
    if (typeof TextEncoder == "function" && TextEncoder.prototype.encode)
      return new TextEncoder().encode(I);
    let B, C, V, et, rt, it = I.length, i = 0;
    for (et = 0; et < it; et++)
      C = I.charCodeAt(et), (C & 64512) === 55296 && et + 1 < it && (V = I.charCodeAt(et + 1), (V & 64512) === 56320 && (C = 65536 + (C - 55296 << 10) + (V - 56320), et++)), i += C < 128 ? 1 : C < 2048 ? 2 : C < 65536 ? 3 : 4;
    for (B = new Uint8Array(i), rt = 0, et = 0; rt < i; et++)
      C = I.charCodeAt(et), (C & 64512) === 55296 && et + 1 < it && (V = I.charCodeAt(et + 1), (V & 64512) === 56320 && (C = 65536 + (C - 55296 << 10) + (V - 56320), et++)), C < 128 ? B[rt++] = C : C < 2048 ? (B[rt++] = 192 | C >>> 6, B[rt++] = 128 | C & 63) : C < 65536 ? (B[rt++] = 224 | C >>> 12, B[rt++] = 128 | C >>> 6 & 63, B[rt++] = 128 | C & 63) : (B[rt++] = 240 | C >>> 18, B[rt++] = 128 | C >>> 12 & 63, B[rt++] = 128 | C >>> 6 & 63, B[rt++] = 128 | C & 63);
    return B;
  };
  const ot = (I, B) => {
    if (B < 65534 && I.subarray && X)
      return String.fromCharCode.apply(null, I.length === B ? I : I.subarray(0, B));
    let C = "";
    for (let V = 0; V < B; V++)
      C += String.fromCharCode(I[V]);
    return C;
  };
  return ee.buf2string = (I, B) => {
    const C = B || I.length;
    if (typeof TextDecoder == "function" && TextDecoder.prototype.decode)
      return new TextDecoder().decode(I.subarray(0, B));
    let V, et;
    const rt = new Array(C * 2);
    for (et = 0, V = 0; V < C; ) {
      let it = I[V++];
      if (it < 128) {
        rt[et++] = it;
        continue;
      }
      let i = J[it];
      if (i > 4) {
        rt[et++] = 65533, V += i - 1;
        continue;
      }
      for (it &= i === 2 ? 31 : i === 3 ? 15 : 7; i > 1 && V < C; )
        it = it << 6 | I[V++] & 63, i--;
      if (i > 1) {
        rt[et++] = 65533;
        continue;
      }
      it < 65536 ? rt[et++] = it : (it -= 65536, rt[et++] = 55296 | it >> 10 & 1023, rt[et++] = 56320 | it & 1023);
    }
    return ot(rt, et);
  }, ee.utf8border = (I, B) => {
    B = B || I.length, B > I.length && (B = I.length);
    let C = B - 1;
    for (; C >= 0 && (I[C] & 192) === 128; )
      C--;
    return C < 0 || C === 0 ? B : C + J[I[C]] > B ? C : B;
  }, ee;
}
var _e, Ae;
function Ce() {
  if (Ae) return _e;
  Ae = 1;
  function X() {
    this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
  }
  return _e = X, _e;
}
var ke;
function Fe() {
  if (ke) return Xt;
  ke = 1;
  const X = Le(), J = De(), ot = Me(), I = Ue(), B = Ce(), C = Object.prototype.toString, {
    Z_NO_FLUSH: V,
    Z_SYNC_FLUSH: et,
    Z_FULL_FLUSH: rt,
    Z_FINISH: it,
    Z_OK: i,
    Z_STREAM_END: E,
    Z_DEFAULT_COMPRESSION: c,
    Z_DEFAULT_STRATEGY: g,
    Z_DEFLATED: H
  } = he(), G = {
    level: c,
    method: H,
    chunkSize: 16384,
    windowBits: 15,
    memLevel: 8,
    strategy: g,
    legacyHash: !0
  };
  function K(A) {
    this.options = J.assign({}, G, A || {});
    let M = this.options;
    M.raw && M.windowBits > 0 ? M.windowBits = -M.windowBits : M.gzip && M.windowBits > 0 && M.windowBits < 16 && (M.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new B(), this.strm.avail_out = 0;
    let h = X.deflateInit2(
      this.strm,
      M.level,
      M.method,
      M.windowBits,
      M.memLevel,
      M.strategy,
      M.legacyHash
    );
    if (h !== i)
      throw new Error(I[h]);
    if (M.header && X.deflateSetHeader(this.strm, M.header), M.dictionary) {
      let o;
      if (typeof M.dictionary == "string" ? o = ot.string2buf(M.dictionary) : C.call(M.dictionary) === "[object ArrayBuffer]" ? o = new Uint8Array(M.dictionary) : o = M.dictionary, h = X.deflateSetDictionary(this.strm, o), h !== i)
        throw new Error(I[h]);
      this._dict_set = !0;
    }
  }
  K.prototype.push = function(A, M) {
    const h = this.strm, o = this.options.chunkSize;
    let R, k;
    if (this.ended)
      return !1;
    for (M === ~~M ? k = M : k = M === !0 ? it : V, typeof A == "string" ? h.input = ot.string2buf(A) : C.call(A) === "[object ArrayBuffer]" ? h.input = new Uint8Array(A) : h.input = A, h.next_in = 0, h.avail_in = h.input.length; ; ) {
      if (h.avail_out === 0 && (h.output = new Uint8Array(o), h.next_out = 0, h.avail_out = o), (k === et || k === rt) && h.avail_out <= 6) {
        this.onData(h.output.subarray(0, h.next_out)), h.avail_out = 0;
        continue;
      }
      if (R = X.deflate(h, k), R === E)
        return h.next_out > 0 && this.onData(h.output.subarray(0, h.next_out)), R = X.deflateEnd(this.strm), this.onEnd(R), this.ended = !0, R === i;
      if (h.avail_out === 0) {
        this.onData(h.output);
        continue;
      }
      if (k > 0 && h.next_out > 0) {
        this.onData(h.output.subarray(0, h.next_out)), h.avail_out = 0;
        continue;
      }
      if (h.avail_in === 0) break;
    }
    return !0;
  }, K.prototype.onData = function(A) {
    this.chunks.push(A);
  }, K.prototype.onEnd = function(A) {
    A === i && (this.result = J.flattenChunks(this.chunks)), this.chunks = [], this.err = A, this.msg = this.strm.msg;
  };
  function m(A, M) {
    const h = new K(M);
    if (h.push(A, !0), h.err)
      throw h.msg || I[h.err];
    return h.result;
  }
  function P(A, M) {
    return M = M || {}, M.raw = !0, m(A, M);
  }
  function Q(A, M) {
    return M = M || {}, M.gzip = !0, m(A, M);
  }
  return Xt.Deflate = K, Xt.deflate = m, Xt.deflateRaw = P, Xt.gzip = Q, Xt.constants = he(), Xt;
}
var He = Fe(), Se = { deflate: He.deflate }, Ht = (function() {
  var X = { nextZero: function(i, E) {
    for (; i[E] != 0; ) E++;
    return E;
  }, readUshort: function(i, E) {
    return i[E] << 8 | i[E + 1];
  }, writeUshort: function(i, E, c) {
    i[E] = c >> 8 & 255, i[E + 1] = 255 & c;
  }, readUint: function(i, E) {
    return 16777216 * i[E] + (i[E + 1] << 16 | i[E + 2] << 8 | i[E + 3]);
  }, writeUint: function(i, E, c) {
    i[E] = c >> 24 & 255, i[E + 1] = c >> 16 & 255, i[E + 2] = c >> 8 & 255, i[E + 3] = 255 & c;
  }, readASCII: function(i, E, c) {
    for (var g = "", H = 0; H < c; H++) g += String.fromCharCode(i[E + H]);
    return g;
  }, writeASCII: function(i, E, c) {
    for (var g = 0; g < c.length; g++) i[E + g] = c.charCodeAt(g);
  }, readBytes: function(i, E, c) {
    for (var g = [], H = 0; H < c; H++) g.push(i[E + H]);
    return g;
  }, pad: function(i) {
    return i.length < 2 ? "0" + i : i;
  }, readUTF8: function(i, E, c) {
    for (var g, H = "", G = 0; G < c; G++) H += "%" + X.pad(i[E + G].toString(16));
    try {
      g = decodeURIComponent(H);
    } catch {
      return X.readASCII(i, E, c);
    }
    return g;
  } };
  function J(i, E, c, g) {
    var H = E * c, G = C(g), K = Math.ceil(E * G / 8), m = new Uint8Array(4 * H), P = new Uint32Array(m.buffer), Q = g.ctype, A = g.depth, M = X.readUshort;
    if (Q == 6) {
      var h = H << 2;
      if (A == 8) for (var o = 0; o < h; o += 4) m[o] = i[o], m[o + 1] = i[o + 1], m[o + 2] = i[o + 2], m[o + 3] = i[o + 3];
      if (A == 16) for (o = 0; o < h; o++) m[o] = i[o << 1];
    } else if (Q == 2) {
      var R = g.tabs.tRNS;
      if (R == null) {
        if (A == 8) for (o = 0; o < H; o++) {
          var k = 3 * o;
          P[o] = 255 << 24 | i[k + 2] << 16 | i[k + 1] << 8 | i[k];
        }
        if (A == 16) for (o = 0; o < H; o++)
          k = 6 * o, P[o] = 255 << 24 | i[k + 4] << 16 | i[k + 2] << 8 | i[k];
      } else {
        var j = R[0], r = R[1], l = R[2];
        if (A == 8) for (o = 0; o < H; o++) {
          var _ = o << 2;
          k = 3 * o, P[o] = 255 << 24 | i[k + 2] << 16 | i[k + 1] << 8 | i[k], i[k] == j && i[k + 1] == r && i[k + 2] == l && (m[_ + 3] = 0);
        }
        if (A == 16) for (o = 0; o < H; o++)
          _ = o << 2, k = 6 * o, P[o] = 255 << 24 | i[k + 4] << 16 | i[k + 2] << 8 | i[k], M(i, k) == j && M(i, k + 2) == r && M(i, k + 4) == l && (m[_ + 3] = 0);
      }
    } else if (Q == 3) {
      var f = g.tabs.PLTE, s = g.tabs.tRNS, b = s ? s.length : 0;
      if (A == 1) for (var p = 0; p < c; p++) {
        var w = p * K, a = p * E;
        for (o = 0; o < E; o++) {
          _ = a + o << 2;
          var u = 3 * (d = i[w + (o >> 3)] >> 7 - (7 & o) & 1);
          m[_] = f[u], m[_ + 1] = f[u + 1], m[_ + 2] = f[u + 2], m[_ + 3] = d < b ? s[d] : 255;
        }
      }
      if (A == 2) for (p = 0; p < c; p++) for (w = p * K, a = p * E, o = 0; o < E; o++)
        _ = a + o << 2, u = 3 * (d = i[w + (o >> 2)] >> 6 - ((3 & o) << 1) & 3), m[_] = f[u], m[_ + 1] = f[u + 1], m[_ + 2] = f[u + 2], m[_ + 3] = d < b ? s[d] : 255;
      if (A == 4) for (p = 0; p < c; p++) for (w = p * K, a = p * E, o = 0; o < E; o++)
        _ = a + o << 2, u = 3 * (d = i[w + (o >> 1)] >> 4 - ((1 & o) << 2) & 15), m[_] = f[u], m[_ + 1] = f[u + 1], m[_ + 2] = f[u + 2], m[_ + 3] = d < b ? s[d] : 255;
      if (A == 8) for (o = 0; o < H; o++) {
        var d;
        _ = o << 2, u = 3 * (d = i[o]), m[_] = f[u], m[_ + 1] = f[u + 1], m[_ + 2] = f[u + 2], m[_ + 3] = d < b ? s[d] : 255;
      }
    } else if (Q == 4) {
      if (A == 8) for (o = 0; o < H; o++) {
        _ = o << 2;
        var S = i[T = o << 1];
        m[_] = S, m[_ + 1] = S, m[_ + 2] = S, m[_ + 3] = i[T + 1];
      }
      if (A == 16) for (o = 0; o < H; o++) {
        var T;
        _ = o << 2, S = i[T = o << 2], m[_] = S, m[_ + 1] = S, m[_ + 2] = S, m[_ + 3] = i[T + 2];
      }
    } else if (Q == 0) for (j = g.tabs.tRNS ? g.tabs.tRNS : -1, p = 0; p < c; p++) {
      var F = p * K, Z = p * E;
      if (A == 1) for (var U = 0; U < E; U++) {
        var N = (S = 255 * (i[F + (U >>> 3)] >>> 7 - (7 & U) & 1)) == 255 * j ? 0 : 255;
        P[Z + U] = N << 24 | S << 16 | S << 8 | S;
      }
      else if (A == 2) for (U = 0; U < E; U++)
        N = (S = 85 * (i[F + (U >>> 2)] >>> 6 - ((3 & U) << 1) & 3)) == 85 * j ? 0 : 255, P[Z + U] = N << 24 | S << 16 | S << 8 | S;
      else if (A == 4) for (U = 0; U < E; U++)
        N = (S = 17 * (i[F + (U >>> 1)] >>> 4 - ((1 & U) << 2) & 15)) == 17 * j ? 0 : 255, P[Z + U] = N << 24 | S << 16 | S << 8 | S;
      else if (A == 8) for (U = 0; U < E; U++)
        N = (S = i[F + U]) == j ? 0 : 255, P[Z + U] = N << 24 | S << 16 | S << 8 | S;
      else if (A == 16) for (U = 0; U < E; U++)
        S = i[F + (U << 1)], N = M(i, F + (U << 1)) == j ? 0 : 255, P[Z + U] = N << 24 | S << 16 | S << 8 | S;
    }
    return m;
  }
  function ot(i, E, c, g) {
    var H = C(i), G = Math.ceil(c * H / 8), K = new Uint8Array((G + 1 + i.interlace) * g);
    return E = i.tabs.CgBI ? B(E, K) : I(E, K), i.interlace == 0 ? E = V(E, i, 0, c, g) : i.interlace == 1 && (E = (function(m, P) {
      for (var Q = P.width, A = P.height, M = C(P), h = M >> 3, o = Math.ceil(Q * M / 8), R = new Uint8Array(A * o), k = 0, j = [0, 0, 4, 0, 2, 0, 1], r = [0, 4, 0, 2, 0, 1, 0], l = [8, 8, 8, 4, 4, 2, 2], _ = [8, 8, 4, 4, 2, 2, 1], f = 0; f < 7; ) {
        for (var s = l[f], b = _[f], p = 0, w = 0, a = j[f]; a < A; ) a += s, w++;
        for (var u = r[f]; u < Q; ) u += b, p++;
        var d = Math.ceil(p * M / 8);
        V(m, P, k, p, w);
        for (var S = 0, T = j[f]; T < A; ) {
          for (var F = r[f], Z = k + S * d << 3; F < Q; ) {
            var U;
            if (M == 1 && (U = (U = m[Z >> 3]) >> 7 - (7 & Z) & 1, R[T * o + (F >> 3)] |= U << 7 - (7 & F)), M == 2 && (U = (U = m[Z >> 3]) >> 6 - (7 & Z) & 3, R[T * o + (F >> 2)] |= U << 6 - ((3 & F) << 1)), M == 4 && (U = (U = m[Z >> 3]) >> 4 - (7 & Z) & 15, R[T * o + (F >> 1)] |= U << 4 - ((1 & F) << 2)), M >= 8) for (var N = T * o + F * h, x = 0; x < h; x++) R[N + x] = m[(Z >> 3) + x];
            Z += M, F += b;
          }
          S++, T += s;
        }
        p * w != 0 && (k += w * (1 + d)), f += 1;
      }
      return R;
    })(E, i)), E;
  }
  function I(i, E) {
    return B(new Uint8Array(i.buffer, 2, i.length - 6), E);
  }
  var B = (function() {
    var i, E, c = (i = Uint16Array, E = Uint32Array, { m: new i(16), v: new i(16), d: [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], o: [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 999, 999, 999], z: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0], B: new i(32), p: [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 65535, 65535], w: [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0], h: new E(32), g: new i(512), s: [], A: new i(32), t: [], k: new i(32768), c: [], a: [], n: new i(32768), e: [], C: new i(512), b: [], i: new i(32768), r: new E(286), f: new E(30), l: new E(19), u: new E(15e3), q: new i(65536), j: new i(32768) });
    function g(h, o) {
      for (var R, k, j, r, l = h.length, _ = c.v, f = 0; f <= o; f++) _[f] = 0;
      for (f = 1; f < l; f += 2) _[h[f]]++;
      var s = c.m;
      for (R = 0, _[0] = 0, k = 1; k <= o; k++) R = R + _[k - 1] << 1, s[k] = R;
      for (j = 0; j < l; j += 2) (r = h[j + 1]) != 0 && (h[j] = s[r], s[r]++);
    }
    function H(h, o, R) {
      for (var k = h.length, j = c.i, r = 0; r < k; r += 2) if (h[r + 1] != 0) for (var l = r >> 1, _ = h[r + 1], f = l << 4 | _, s = o - _, b = h[r] << s, p = b + (1 << s); b != p; )
        R[j[b] >>> 15 - o] = f, b++;
    }
    function G(h, o) {
      for (var R = c.i, k = 15 - o, j = 0; j < h.length; j += 2) {
        var r = h[j] << o - h[j + 1];
        h[j] = R[r] >>> k;
      }
    }
    function K(h, o, R) {
      return (h[o >>> 3] | h[1 + (o >>> 3)] << 8) >>> (7 & o) & (1 << R) - 1;
    }
    function m(h, o, R) {
      return (h[o >>> 3] | h[1 + (o >>> 3)] << 8 | h[2 + (o >>> 3)] << 16) >>> (7 & o) & (1 << R) - 1;
    }
    function P(h, o) {
      return (h[o >>> 3] | h[1 + (o >>> 3)] << 8 | h[2 + (o >>> 3)] << 16) >>> (7 & o);
    }
    function Q(h, o) {
      var R = h.length;
      if (o <= R) return h;
      var k = new Uint8Array(Math.max(R << 1, o));
      return k.set(h, 0), k;
    }
    function A(h, o, R, k, j, r) {
      for (var l = 0; l < R; ) {
        var _ = h[P(k, j) & o];
        j += 15 & _;
        var f = _ >>> 4;
        if (f <= 15) r[l] = f, l++;
        else {
          var s = 0, b = 0;
          f == 16 ? (b = 3 + K(k, j, 2), j += 2, s = r[l - 1]) : f == 17 ? (b = 3 + K(k, j, 3), j += 3) : f == 18 && (b = 11 + K(k, j, 7), j += 7);
          for (var p = l + b; l < p; ) r[l] = s, l++;
        }
      }
      return j;
    }
    function M(h, o, R, k) {
      for (var j = 0, r = 0, l = k.length >>> 1; r < R; ) {
        var _ = h[r + o];
        k[r << 1] = 0, k[1 + (r << 1)] = _, _ > j && (j = _), r++;
      }
      for (; r < l; ) k[r << 1] = 0, k[1 + (r << 1)] = 0, r++;
      return j;
    }
    return (function() {
      for (var h = 0; h < 32768; h++) {
        var o = h;
        o = (4278255360 & (o = (4042322160 & (o = (3435973836 & (o = (2863311530 & o) >>> 1 | (1431655765 & o) << 1)) >>> 2 | (858993459 & o) << 2)) >>> 4 | (252645135 & o) << 4)) >>> 8 | (16711935 & o) << 8, c.i[h] = (o >>> 16 | o << 16) >>> 17;
      }
      function R(k, j, r) {
        for (; j-- != 0; ) k.push(0, r);
      }
      for (h = 0; h < 32; h++) c.B[h] = c.o[h] << 3 | c.z[h], c.h[h] = c.p[h] << 4 | c.w[h];
      R(c.s, 144, 8), R(c.s, 112, 9), R(c.s, 24, 7), R(c.s, 8, 8), g(c.s, 9), H(c.s, 9, c.g), G(c.s, 9), R(c.t, 32, 5), g(c.t, 5), H(c.t, 5, c.A), G(c.t, 5), R(c.b, 19, 0), R(c.c, 286, 0), R(c.e, 30, 0), R(c.a, 320, 0);
    })(), function(h, o) {
      var R, k, j = Uint8Array, r = 0, l = 0, _ = 0, f = 0, s = 0, b = 0, p = 0, w = 0, a = 0;
      if (h[0] == 3 && h[1] == 0) return o || new j(0);
      var u = o == null;
      for (u && (o = new j(h.length >>> 2 << 3)); r == 0; ) if (r = m(h, a, 1), l = m(h, a + 1, 2), a += 3, l != 0) {
        if (u && (o = Q(o, w + (1 << 17))), l == 1 && (R = c.g, k = c.A, b = 511, p = 31), l == 2) {
          _ = K(h, a, 5) + 257, f = K(h, a + 5, 5) + 1, s = K(h, a + 10, 4) + 4, a += 14;
          for (var d = 1, S = 0; S < 38; S += 2) c.b[S] = 0, c.b[S + 1] = 0;
          for (S = 0; S < s; S++) {
            var T = K(h, a + 3 * S, 3);
            c.b[1 + (c.d[S] << 1)] = T, T > d && (d = T);
          }
          a += 3 * s, g(c.b, d), H(c.b, d, c.C), R = c.k, k = c.n, a = A(c.C, (1 << d) - 1, _ + f, h, a, c.a);
          var F = M(c.a, 0, _, c.c);
          b = (1 << F) - 1;
          var Z = M(c.a, _, f, c.e);
          p = (1 << Z) - 1, g(c.c, F), H(c.c, F, R), g(c.e, Z), H(c.e, Z, k);
        }
        for (; ; ) {
          var U = R[P(h, a) & b];
          a += 15 & U;
          var N = U >>> 4;
          if (!(N >>> 8)) o[w++] = N;
          else {
            if (N == 256) break;
            var x = w + N - 254;
            if (N > 264) {
              var dt = c.B[N - 257];
              x = w + (dt >>> 3) + K(h, a, 7 & dt), a += 7 & dt;
            }
            var nt = k[P(h, a) & p];
            a += 15 & nt;
            var ht = nt >>> 4, at = c.h[ht], yt = (at >>> 4) + m(h, a, 15 & at);
            for (a += 15 & at, u && (o = Q(o, w + (1 << 17))); w < x; ) o[w] = o[w++ - yt], o[w] = o[w++ - yt], o[w] = o[w++ - yt], o[w] = o[w++ - yt];
            w = x;
          }
        }
      } else {
        7 & a && (a += 8 - (7 & a));
        var xt = 4 + (a >>> 3), gt = h[xt - 4] | h[xt - 3] << 8;
        u && (o = Q(o, w + gt)), o.set(new j(h.buffer, h.byteOffset + xt, gt), w), a = xt + gt << 3, w += gt;
      }
      return o.length == w ? o : o.slice(0, w);
    };
  })();
  function C(i) {
    return [1, null, 3, 1, 2, null, 4][i.ctype] * i.depth;
  }
  function V(i, E, c, g, H) {
    var G = C(E), K = Math.ceil(g * G / 8);
    G = Math.ceil(G / 8);
    var m, P, Q = i[c], A = 0;
    if (Q > 1 && (i[c] = [0, 0, 1][Q - 2]), Q == 3) for (A = G; A < K; A++) i[A + 1] = i[A + 1] + (i[A + 1 - G] >>> 1) & 255;
    for (var M = 0; M < H; M++) if (A = 0, (Q = i[(P = (m = c + M * K) + M + 1) - 1]) == 0) for (; A < K; A++) i[m + A] = i[P + A];
    else if (Q == 1) {
      for (; A < G; A++) i[m + A] = i[P + A];
      for (; A < K; A++) i[m + A] = i[P + A] + i[m + A - G];
    } else if (Q == 2) for (; A < K; A++) i[m + A] = i[P + A] + i[m + A - K];
    else if (Q == 3) {
      for (; A < G; A++) i[m + A] = i[P + A] + (i[m + A - K] >>> 1);
      for (; A < K; A++) i[m + A] = i[P + A] + (i[m + A - K] + i[m + A - G] >>> 1);
    } else {
      for (; A < G; A++) i[m + A] = i[P + A] + et(0, i[m + A - K], 0);
      for (; A < K; A++) i[m + A] = i[P + A] + et(i[m + A - G], i[m + A - K], i[m + A - G - K]);
    }
    return i;
  }
  function et(i, E, c) {
    var g = i + E - c, H = g - i, G = g - E, K = g - c;
    return H * H <= G * G && H * H <= K * K ? i : G * G <= K * K ? E : c;
  }
  function rt(i, E, c) {
    c.width = X.readUint(i, E), E += 4, c.height = X.readUint(i, E), E += 4, c.depth = i[E], E++, c.ctype = i[E], E++, c.compress = i[E], E++, c.filter = i[E], E++, c.interlace = i[E], E++;
  }
  function it(i, E, c, g, H, G, K, m, P) {
    for (var Q = Math.min(E, H), A = Math.min(c, G), M = 0, h = 0, o = 0; o < A; o++) for (var R = 0; R < Q; R++) if (K >= 0 && m >= 0 ? (M = o * E + R << 2, h = (m + o) * H + K + R << 2) : (M = (-m + o) * E - K + R << 2, h = o * H + R << 2), P == 0) g[h] = i[M], g[h + 1] = i[M + 1], g[h + 2] = i[M + 2], g[h + 3] = i[M + 3];
    else if (P == 1) {
      var k = i[M + 3] * 0.00392156862745098, j = i[M] * k, r = i[M + 1] * k, l = i[M + 2] * k, _ = g[h + 3] * (1 / 255), f = g[h] * _, s = g[h + 1] * _, b = g[h + 2] * _, p = 1 - k, w = k + _ * p, a = w == 0 ? 0 : 1 / w;
      g[h + 3] = 255 * w, g[h + 0] = (j + f * p) * a, g[h + 1] = (r + s * p) * a, g[h + 2] = (l + b * p) * a;
    } else if (P == 2)
      k = i[M + 3], j = i[M], r = i[M + 1], l = i[M + 2], _ = g[h + 3], f = g[h], s = g[h + 1], b = g[h + 2], k == _ && j == f && r == s && l == b ? (g[h] = 0, g[h + 1] = 0, g[h + 2] = 0, g[h + 3] = 0) : (g[h] = j, g[h + 1] = r, g[h + 2] = l, g[h + 3] = k);
    else if (P == 3) {
      if (k = i[M + 3], j = i[M], r = i[M + 1], l = i[M + 2], _ = g[h + 3], f = g[h], s = g[h + 1], b = g[h + 2], k == _ && j == f && r == s && l == b) continue;
      if (k < 220 && _ > 20) return !1;
    }
    return !0;
  }
  return { decode: function(i) {
    for (var E, c = new Uint8Array(i), g = 8, H = X, G = H.readUshort, K = H.readUint, m = { tabs: {}, frames: [] }, P = new Uint8Array(c.length), Q = 0, A = 0, M = [137, 80, 78, 71, 13, 10, 26, 10], h = 0; h < 8; h++) if (c[h] != M[h]) throw "The input is not a PNG file!";
    for (; g < c.length; ) {
      var o = H.readUint(c, g);
      g += 4;
      var R = H.readASCII(c, g, 4);
      if (g += 4, R == "IHDR") rt(c, g, m);
      else if (R == "iCCP") {
        for (var k = g; c[k] != 0; ) k++;
        H.readASCII(c, g, k - g), c[k + 1];
        var j = c.slice(k + 2, g + o), r = null;
        try {
          r = I(j);
        } catch {
          r = B(j);
        }
        m.tabs[R] = r;
      } else if (R == "CgBI") m.tabs[R] = c.slice(g, g + 4);
      else if (R == "IDAT") {
        for (h = 0; h < o; h++) P[Q + h] = c[g + h];
        Q += o;
      } else if (R == "acTL") m.tabs[R] = { num_frames: K(c, g), num_plays: K(c, g + 4) }, E = new Uint8Array(c.length);
      else if (R == "fcTL") {
        var l;
        A != 0 && ((l = m.frames[m.frames.length - 1]).data = ot(m, E.slice(0, A), l.rect.width, l.rect.height), A = 0);
        var _ = { x: K(c, g + 12), y: K(c, g + 16), width: K(c, g + 4), height: K(c, g + 8) }, f = G(c, g + 22);
        f = G(c, g + 20) / (f == 0 ? 100 : f);
        var s = { rect: _, delay: Math.round(1e3 * f), dispose: c[g + 24], blend: c[g + 25] };
        m.frames.push(s);
      } else if (R == "fdAT") {
        for (h = 0; h < o - 4; h++) E[A + h] = c[g + h + 4];
        A += o - 4;
      } else if (R == "pHYs") m.tabs[R] = [H.readUint(c, g), H.readUint(c, g + 4), c[g + 8]];
      else if (R == "cHRM")
        for (m.tabs[R] = [], h = 0; h < 8; h++) m.tabs[R].push(H.readUint(c, g + 4 * h));
      else if (R == "tEXt" || R == "zTXt") {
        m.tabs[R] == null && (m.tabs[R] = {});
        var b = H.nextZero(c, g), p = H.readASCII(c, g, b - g), w = g + o - b - 1;
        if (R == "tEXt") d = H.readASCII(c, b + 1, w);
        else {
          var a = I(c.slice(b + 2, b + 2 + w));
          d = H.readUTF8(a, 0, a.length);
        }
        m.tabs[R][p] = d;
      } else if (R == "iTXt") {
        m.tabs[R] == null && (m.tabs[R] = {}), b = 0, k = g, b = H.nextZero(c, k), p = H.readASCII(c, k, b - k);
        var u = c[k = b + 1];
        c[k + 1], k += 2, b = H.nextZero(c, k), H.readASCII(c, k, b - k), k = b + 1, b = H.nextZero(c, k), H.readUTF8(c, k, b - k);
        var d;
        w = o - ((k = b + 1) - g), u == 0 ? d = H.readUTF8(c, k, w) : (a = I(c.slice(k, k + w)), d = H.readUTF8(a, 0, a.length)), m.tabs[R][p] = d;
      } else if (R == "PLTE") m.tabs[R] = H.readBytes(c, g, o);
      else if (R == "hIST") {
        var S = m.tabs.PLTE.length / 3;
        for (m.tabs[R] = [], h = 0; h < S; h++) m.tabs[R].push(G(c, g + 2 * h));
      } else if (R == "tRNS") m.ctype == 3 ? m.tabs[R] = H.readBytes(c, g, o) : m.ctype == 0 ? m.tabs[R] = G(c, g) : m.ctype == 2 && (m.tabs[R] = [G(c, g), G(c, g + 2), G(c, g + 4)]);
      else if (R == "gAMA") m.tabs[R] = H.readUint(c, g) / 1e5;
      else if (R == "sRGB") m.tabs[R] = c[g];
      else if (R == "bKGD") m.ctype == 0 || m.ctype == 4 ? m.tabs[R] = [G(c, g)] : m.ctype == 2 || m.ctype == 6 ? m.tabs[R] = [G(c, g), G(c, g + 2), G(c, g + 4)] : m.ctype == 3 && (m.tabs[R] = c[g]);
      else if (R == "IEND") break;
      g += o, H.readUint(c, g), g += 4;
    }
    return A != 0 && ((l = m.frames[m.frames.length - 1]).data = ot(m, E.slice(0, A), l.rect.width, l.rect.height)), m.data = ot(m, P, m.width, m.height), delete m.compress, delete m.interlace, delete m.filter, m;
  }, toRGBA8: function(i) {
    var E = i.width, c = i.height;
    if (i.tabs.acTL == null) return [J(i.data, E, c, i).buffer];
    var g = [];
    i.frames[0].data == null && (i.frames[0].data = i.data);
    for (var H = E * c * 4, G = new Uint8Array(H), K = new Uint8Array(H), m = new Uint8Array(H), P = 0; P < i.frames.length; P++) {
      var Q = i.frames[P], A = Q.rect.x, M = Q.rect.y, h = Q.rect.width, o = Q.rect.height, R = J(Q.data, h, o, i);
      if (P != 0) for (var k = 0; k < H; k++) m[k] = G[k];
      if (Q.blend == 0 ? it(R, h, o, G, E, c, A, M, 0) : Q.blend == 1 && it(R, h, o, G, E, c, A, M, 1), g.push(G.buffer.slice(0)), Q.dispose != 0) {
        if (Q.dispose == 1) it(K, h, o, G, E, c, A, M, 0);
        else if (Q.dispose == 2) for (k = 0; k < H; k++) G[k] = m[k];
      }
    }
    return g;
  }, _paeth: et, _copyTile: it, _bin: X };
})();
(function() {
  var X = Ht._copyTile, J = Ht._bin, ot = Ht._paeth, I = { table: (function() {
    for (var r = new Uint32Array(256), l = 0; l < 256; l++) {
      for (var _ = l, f = 0; f < 8; f++) 1 & _ ? _ = 3988292384 ^ _ >>> 1 : _ >>>= 1;
      r[l] = _;
    }
    return r;
  })(), update: function(r, l, _, f) {
    for (var s = 0; s < f; s++) r = I.table[255 & (r ^ l[_ + s])] ^ r >>> 8;
    return r;
  }, crc: function(r, l, _) {
    return 4294967295 ^ I.update(4294967295, r, l, _);
  } };
  function B(r, l, _, f) {
    l[_] += r[0] * f >> 4, l[_ + 1] += r[1] * f >> 4, l[_ + 2] += r[2] * f >> 4, l[_ + 3] += r[3] * f >> 4;
  }
  function C(r) {
    return Math.max(0, Math.min(255, r));
  }
  function V(r, l) {
    var _ = r[0] - l[0], f = r[1] - l[1], s = r[2] - l[2], b = r[3] - l[3];
    return _ * _ + f * f + s * s + b * b;
  }
  function et(r, l, _, f, s, b, p) {
    p == null && (p = 1);
    for (var w = f.length, a = [], u = 0; u < w; u++) {
      var d = f[u];
      a.push([d >>> 0 & 255, d >>> 8 & 255, d >>> 16 & 255, d >>> 24 & 255]);
    }
    for (u = 0; u < w; u++) for (var S = 4294967295, T = 0, F = 0; F < w; F++) {
      var Z = V(a[u], a[F]);
      F != u && Z < S && (S = Z, T = F);
    }
    var U = new Uint32Array(s.buffer), N = new Int16Array(l * _ * 4), x = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
    for (u = 0; u < x.length; u++) x[u] = 255 * ((x[u] + 0.5) / 16 - 0.5);
    for (var dt = 0; dt < _; dt++) for (var nt = 0; nt < l; nt++) {
      var ht;
      u = 4 * (dt * l + nt), p != 2 ? ht = [C(r[u] + N[u]), C(r[u + 1] + N[u + 1]), C(r[u + 2] + N[u + 2]), C(r[u + 3] + N[u + 3])] : (Z = x[4 * (3 & dt) + (3 & nt)], ht = [C(r[u] + Z), C(r[u + 1] + Z), C(r[u + 2] + Z), C(r[u + 3] + Z)]), T = 0;
      var at = 16777215;
      for (F = 0; F < w; F++) {
        var yt = V(ht, a[F]);
        yt < at && (at = yt, T = F);
      }
      var xt = a[T], gt = [ht[0] - xt[0], ht[1] - xt[1], ht[2] - xt[2], ht[3] - xt[3]];
      p == 1 && (nt != l - 1 && B(gt, N, u + 4, 7), dt != _ - 1 && (nt != 0 && B(gt, N, u + 4 * l - 4, 3), B(gt, N, u + 4 * l, 5), nt != l - 1 && B(gt, N, u + 4 * l + 4, 1))), b[u >> 2] = T, U[u >> 2] = f[T];
    }
  }
  function rt(r, l, _, f, s) {
    s == null && (s = {});
    var b, p = I.crc, w = J.writeUint, a = J.writeUshort, u = J.writeASCII, d = 8, S = r.frames.length > 1, T = !1, F = 33 + (S ? 20 : 0);
    if (s.sRGB != null && (F += 13), s.pHYs != null && (F += 21), s.iCCP != null && (F += 21 + (b = Se.deflate(s.iCCP)).length + 4), r.ctype == 3) {
      for (var Z = r.plte.length, U = 0; U < Z; U++) r.plte[U] >>> 24 != 255 && (T = !0);
      F += 8 + 3 * Z + 4 + (T ? 8 + 1 * Z + 4 : 0);
    }
    for (var N = 0; N < r.frames.length; N++)
      S && (F += 38), F += (zt = r.frames[N]).cimg.length + 12, N != 0 && (F += 4);
    F += 12;
    var x = new Uint8Array(F), dt = [137, 80, 78, 71, 13, 10, 26, 10];
    for (U = 0; U < 8; U++) x[U] = dt[U];
    if (w(x, d, 13), u(x, d += 4, "IHDR"), w(x, d += 4, l), w(x, d += 4, _), x[d += 4] = r.depth, x[++d] = r.ctype, x[++d] = 0, x[++d] = 0, x[++d] = 0, w(x, ++d, p(x, d - 17, 17)), d += 4, s.sRGB != null && (w(x, d, 1), u(x, d += 4, "sRGB"), x[d += 4] = s.sRGB, w(x, ++d, p(x, d - 5, 5)), d += 4), s.iCCP != null) {
      var nt = 13 + b.length;
      w(x, d, nt), u(x, d += 4, "iCCP"), u(x, d += 4, "ICC profile"), d += 11, d += 2, x.set(b, d), w(x, d += b.length, p(x, d - (nt + 4), nt + 4)), d += 4;
    }
    if (s.pHYs != null && (w(x, d, 9), u(x, d += 4, "pHYs"), w(x, d += 4, s.pHYs[0]), w(x, d += 4, s.pHYs[1]), x[d += 4] = s.pHYs[2], w(x, ++d, p(x, d - 13, 13)), d += 4), S && (w(x, d, 8), u(x, d += 4, "acTL"), w(x, d += 4, r.frames.length), w(x, d += 4, s.loop != null ? s.loop : 0), w(x, d += 4, p(x, d - 12, 12)), d += 4), r.ctype == 3) {
      for (w(x, d, 3 * (Z = r.plte.length)), u(x, d += 4, "PLTE"), d += 4, U = 0; U < Z; U++) {
        var ht = 3 * U, at = r.plte[U], yt = 255 & at, xt = at >>> 8 & 255, gt = at >>> 16 & 255;
        x[d + ht + 0] = yt, x[d + ht + 1] = xt, x[d + ht + 2] = gt;
      }
      if (w(x, d += 3 * Z, p(x, d - 3 * Z - 4, 3 * Z + 4)), d += 4, T) {
        for (w(x, d, Z), u(x, d += 4, "tRNS"), d += 4, U = 0; U < Z; U++) x[d + U] = r.plte[U] >>> 24 & 255;
        w(x, d += Z, p(x, d - Z - 4, Z + 4)), d += 4;
      }
    }
    var Dt = 0;
    for (N = 0; N < r.frames.length; N++) {
      var zt = r.frames[N];
      S && (w(x, d, 26), u(x, d += 4, "fcTL"), w(x, d += 4, Dt++), w(x, d += 4, zt.rect.width), w(x, d += 4, zt.rect.height), w(x, d += 4, zt.rect.x), w(x, d += 4, zt.rect.y), a(x, d += 4, f[N]), a(x, d += 2, 1e3), x[d += 2] = zt.dispose, x[++d] = zt.blend, w(x, ++d, p(x, d - 30, 30)), d += 4);
      var Mt = zt.cimg;
      w(x, d, (Z = Mt.length) + (N == 0 ? 0 : 4));
      var Et = d += 4;
      u(x, d, N == 0 ? "IDAT" : "fdAT"), d += 4, N != 0 && (w(x, d, Dt++), d += 4), x.set(Mt, d), w(x, d += Z, p(x, Et, d - Et)), d += 4;
    }
    return w(x, d, 0), u(x, d += 4, "IEND"), w(x, d += 4, p(x, d - 4, 4)), d += 4, x.buffer;
  }
  function it(r, l, _) {
    for (var f = 0; f < r.frames.length; f++) {
      var s = r.frames[f];
      s.rect.width;
      var b = s.rect.height, p = new Uint8Array(b * s.bpl + b);
      s.cimg = g(s.img, b, s.bpp, s.bpl, p, l, _);
    }
  }
  function i(r, l, _, f, s) {
    for (var b = s[0], p = s[1], w = s[2], a = s[3], u = s[4], d = s[5], S = 6, T = 8, F = 255, Z = 0; Z < r.length; Z++) for (var U = new Uint8Array(r[Z]), N = U.length, x = 0; x < N; x += 4) F &= U[x + 3];
    var dt = F != 255, nt = (function(pt, At, ft, Rt, Tt, It) {
      for (var Ut = [], st = 0; st < pt.length; st++) {
        var Ft, t = new Uint8Array(pt[st]), y = new Uint32Array(t.buffer), n = 0, z = 0, v = At, Y = ft, _t = Rt ? 1 : 0;
        if (st != 0) {
          for (var vt = It || Rt || st == 1 || Ut[st - 2].dispose != 0 ? 1 : 2, tt = 0, wt = 1e9, Gt = 0; Gt < vt; Gt++) {
            for (var ne = new Uint8Array(pt[st - 1 - Gt]), Jt = new Uint32Array(pt[st - 1 - Gt]), Ot = At, Nt = ft, Vt = -1, Qt = -1, Kt = 0; Kt < ft; Kt++) for (var Yt = 0; Yt < At; Yt++)
              y[te = Kt * At + Yt] != Jt[te] && (Yt < Ot && (Ot = Yt), Yt > Vt && (Vt = Yt), Kt < Nt && (Nt = Kt), Kt > Qt && (Qt = Kt));
            Vt == -1 && (Ot = Nt = Vt = Qt = 0), Tt && (1 & ~Ot || Ot--, 1 & ~Nt || Nt--);
            var ce = (Vt - Ot + 1) * (Qt - Nt + 1);
            ce < wt && (wt = ce, tt = Gt, n = Ot, z = Nt, v = Vt - Ot + 1, Y = Qt - Nt + 1);
          }
          ne = new Uint8Array(pt[st - 1 - tt]), tt == 1 && (Ut[st - 1].dispose = 2), Ft = new Uint8Array(v * Y * 4), X(ne, At, ft, Ft, v, Y, -n, -z, 0), (_t = X(t, At, ft, Ft, v, Y, -n, -z, 3) ? 1 : 0) == 1 ? c(t, At, ft, Ft, { x: n, y: z, width: v, height: Y }) : X(t, At, ft, Ft, v, Y, -n, -z, 0);
        } else Ft = t.slice(0);
        Ut.push({ rect: { x: n, y: z, width: v, height: Y }, img: Ft, blend: _t, dispose: 0 });
      }
      if (Rt) {
        for (st = 0; st < Ut.length; st++)
          if ((re = Ut[st]).blend != 1) {
            var Wt = re.rect, Pt = Ut[st - 1].rect, de = Math.min(Wt.x, Pt.x), ue = Math.min(Wt.y, Pt.y), se = { x: de, y: ue, width: Math.max(Wt.x + Wt.width, Pt.x + Pt.width) - de, height: Math.max(Wt.y + Wt.height, Pt.y + Pt.height) - ue };
            Ut[st - 1].dispose = 1, st - 1 != 0 && E(pt, At, ft, Ut, st - 1, se, Tt), E(pt, At, ft, Ut, st, se, Tt);
          }
      }
      if (pt.length != 1) for (var te = 0; te < Ut.length; te++) {
        var re;
        (re = Ut[te]).rect.width * re.rect.height;
      }
      return Ut;
    })(r, l, _, b, p, w), ht = {}, at = [], yt = [];
    if (f != 0) {
      var xt = [];
      for (x = 0; x < nt.length; x++) xt.push(nt[x].img.buffer);
      var gt = (function(pt) {
        for (var At = 0, ft = 0; ft < pt.length; ft++) At += pt[ft].byteLength;
        var Rt = new Uint8Array(At), Tt = 0;
        for (ft = 0; ft < pt.length; ft++) {
          for (var It = new Uint8Array(pt[ft]), Ut = It.length, st = 0; st < Ut; st += 4) {
            var Ft = It[st], t = It[st + 1], y = It[st + 2], n = It[st + 3];
            n == 0 && (Ft = t = y = 0), Rt[Tt + st] = Ft, Rt[Tt + st + 1] = t, Rt[Tt + st + 2] = y, Rt[Tt + st + 3] = n;
          }
          Tt += Ut;
        }
        return Rt.buffer;
      })(xt), Dt = G(gt, f);
      for (x = 0; x < Dt.plte.length; x++) at.push(Dt.plte[x].est.rgba);
      var zt = 0;
      for (x = 0; x < nt.length; x++) {
        var Mt = (kt = nt[x]).img.length, Et = new Uint8Array(Dt.inds.buffer, zt >> 2, Mt >> 2);
        yt.push(Et);
        var $t = new Uint8Array(Dt.abuf, zt, Mt);
        d && et(kt.img, kt.rect.width, kt.rect.height, at, $t, Et), kt.img.set($t), zt += Mt;
      }
    } else for (Z = 0; Z < nt.length; Z++) {
      var kt = nt[Z], Zt = new Uint32Array(kt.img.buffer), bt = kt.rect.width;
      for (N = Zt.length, Et = new Uint8Array(N), yt.push(Et), x = 0; x < N; x++) {
        var St = Zt[x];
        if (x != 0 && St == Zt[x - 1]) Et[x] = Et[x - 1];
        else if (x > bt && St == Zt[x - bt]) Et[x] = Et[x - bt];
        else {
          var ct = ht[St];
          if (ct == null && (ht[St] = ct = at.length, at.push(St), at.length >= 300)) break;
          Et[x] = ct;
        }
      }
    }
    var Lt = at.length;
    for (Lt <= 256 && u == 0 && (T = Lt <= 2 ? 1 : Lt <= 4 ? 2 : Lt <= 16 ? 4 : 8, T = Math.max(T, a)), Z = 0; Z < nt.length; Z++) {
      (kt = nt[Z]).rect.x, kt.rect.y, bt = kt.rect.width;
      var qt = kt.rect.height, Ct = kt.img;
      new Uint32Array(Ct.buffer);
      var e = 4 * bt, L = 4;
      if (Lt <= 256 && u == 0) {
        e = Math.ceil(T * bt / 8);
        for (var D = new Uint8Array(e * qt), q = yt[Z], $ = 0; $ < qt; $++) {
          x = $ * e;
          var W = $ * bt;
          if (T == 8) for (var O = 0; O < bt; O++) D[x + O] = q[W + O];
          else if (T == 4) for (O = 0; O < bt; O++) D[x + (O >> 1)] |= q[W + O] << 4 - 4 * (1 & O);
          else if (T == 2) for (O = 0; O < bt; O++) D[x + (O >> 2)] |= q[W + O] << 6 - 2 * (3 & O);
          else if (T == 1) for (O = 0; O < bt; O++) D[x + (O >> 3)] |= q[W + O] << 7 - 1 * (7 & O);
        }
        Ct = D, S = 3, L = 1;
      } else if (dt == 0 && nt.length == 1) {
        D = new Uint8Array(bt * qt * 3);
        var lt = bt * qt;
        for (x = 0; x < lt; x++) {
          var mt = 3 * x, ut = 4 * x;
          D[mt] = Ct[ut], D[mt + 1] = Ct[ut + 1], D[mt + 2] = Ct[ut + 2];
        }
        Ct = D, S = 2, L = 3, e = 3 * bt;
      }
      kt.img = Ct, kt.bpl = e, kt.bpp = L;
    }
    return { ctype: S, depth: T, plte: at, frames: nt };
  }
  function E(r, l, _, f, s, b, p) {
    for (var w = Uint8Array, a = Uint32Array, u = new w(r[s - 1]), d = new a(r[s - 1]), S = s + 1 < r.length ? new w(r[s + 1]) : null, T = new w(r[s]), F = new a(T.buffer), Z = l, U = _, N = -1, x = -1, dt = 0; dt < b.height; dt++) for (var nt = 0; nt < b.width; nt++) {
      var ht = b.x + nt, at = b.y + dt, yt = at * l + ht, xt = F[yt];
      xt == 0 || f[s - 1].dispose == 0 && d[yt] == xt && (S == null || S[4 * yt + 3] != 0) || (ht < Z && (Z = ht), ht > N && (N = ht), at < U && (U = at), at > x && (x = at));
    }
    N == -1 && (Z = U = N = x = 0), p && (1 & ~Z || Z--, 1 & ~U || U--), b = { x: Z, y: U, width: N - Z + 1, height: x - U + 1 };
    var gt = f[s];
    gt.rect = b, gt.blend = 1, gt.img = new Uint8Array(b.width * b.height * 4), f[s - 1].dispose == 0 ? (X(u, l, _, gt.img, b.width, b.height, -b.x, -b.y, 0), c(T, l, _, gt.img, b)) : X(T, l, _, gt.img, b.width, b.height, -b.x, -b.y, 0);
  }
  function c(r, l, _, f, s) {
    X(r, l, _, f, s.width, s.height, -s.x, -s.y, 2);
  }
  function g(r, l, _, f, s, b, p) {
    var w, a = [], u = [0, 1, 2, 3, 4];
    b != -1 ? u = [b] : (l * f > 5e5 || _ == 1) && (u = [0]), p && (w = { level: 0 });
    for (var d = s.length > 1e7 && window.UZIP != null ? window.UZIP : Se, S = 0; S < u.length; S++) {
      for (var T = 0; T < l; T++) H(s, r, T, f, _, u[S]);
      a.push(d.deflate(s, w));
    }
    var F, Z = 1e9;
    for (S = 0; S < a.length; S++) a[S].length < Z && (F = S, Z = a[S].length);
    return a[F];
  }
  function H(r, l, _, f, s, b) {
    var p = _ * f, w = p + _;
    if (r[w] = b, w++, b == 0) if (f < 500) for (var a = 0; a < f; a++) r[w + a] = l[p + a];
    else r.set(new Uint8Array(l.buffer, p, f), w);
    else if (b == 1) {
      for (a = 0; a < s; a++) r[w + a] = l[p + a];
      for (a = s; a < f; a++) r[w + a] = l[p + a] - l[p + a - s] + 256 & 255;
    } else if (_ == 0) {
      for (a = 0; a < s; a++) r[w + a] = l[p + a];
      if (b == 2) for (a = s; a < f; a++) r[w + a] = l[p + a];
      if (b == 3) for (a = s; a < f; a++) r[w + a] = l[p + a] - (l[p + a - s] >> 1) + 256 & 255;
      if (b == 4) for (a = s; a < f; a++) r[w + a] = l[p + a] - ot(l[p + a - s], 0, 0) + 256 & 255;
    } else {
      if (b == 2) for (a = 0; a < f; a++) r[w + a] = l[p + a] + 256 - l[p + a - f] & 255;
      if (b == 3) {
        for (a = 0; a < s; a++) r[w + a] = l[p + a] + 256 - (l[p + a - f] >> 1) & 255;
        for (a = s; a < f; a++) r[w + a] = l[p + a] + 256 - (l[p + a - f] + l[p + a - s] >> 1) & 255;
      }
      if (b == 4) {
        for (a = 0; a < s; a++) r[w + a] = l[p + a] + 256 - ot(0, l[p + a - f], 0) & 255;
        for (a = s; a < f; a++) r[w + a] = l[p + a] + 256 - ot(l[p + a - s], l[p + a - f], l[p + a - s - f]) & 255;
      }
    }
  }
  function G(r, l, _) {
    for (var f = new Uint8Array(r), s = f.slice(0), b = new Uint32Array(s.buffer), p = Q(s, l), w = p[0], a = p[1], u = a.length, d = new Uint32Array(u), S = new Uint8Array(d.buffer), T = 0; T < u; T++) d[T] = a[T].est.rgba;
    var F, Z = f.length, U = new Uint8Array(Z >> 2);
    if (u <= 60) P(f, U, S), K(U, b, d);
    else if (f.length < 32e6) for (T = 0; T < Z; T += 4)
      F = A(w, N = f[T] * (1 / 255), x = f[T + 1] * (1 / 255), dt = f[T + 2] * (1 / 255), nt = f[T + 3] * (1 / 255)), U[T >> 2] = F.ind, b[T >> 2] = F.est.rgba;
    else for (T = 0; T < Z; T += 4) {
      var N = f[T] * 0.00392156862745098, x = f[T + 1] * (1 / 255), dt = f[T + 2] * (1 / 255), nt = f[T + 3] * (1 / 255);
      for (F = w; F.left; ) F = M(F.est, N, x, dt, nt) <= 0 ? F.left : F.right;
      U[T >> 2] = F.ind, b[T >> 2] = F.est.rgba;
    }
    if (_ || f.length * u < 4e7) {
      var ht = 1e9;
      for (T = 0; T < 10; T++) {
        var at = m(f, U, S);
        if (at / ht > 0.997) break;
        ht = at;
      }
      for (T = 0; T < u; T++) a[T].est.rgba = d[T];
      K(U, b, d);
    }
    return { abuf: s.buffer, inds: U, plte: a };
  }
  function K(r, l, _) {
    for (var f = 0; f < r.length; f++) l[f] = _[r[f]];
  }
  function m(r, l, _) {
    return (function(f, s, b) {
      for (var p = b.length >>> 2, w = new Uint32Array(4 * p), a = new Uint32Array(p), u = 0; u < f.length; u += 4) {
        var d = s[u >>> 2], S = 4 * d;
        a[d]++, w[S] += f[u], w[S + 1] += f[u + 1], w[S + 2] += f[u + 2], w[S + 3] += f[u + 3];
      }
      for (u = 0; u < b.length; u++) b[u] = Math.round(w[u] / a[u >>> 2]);
    })(r, l, _), P(r, l, _);
  }
  function P(r, l, _) {
    for (var f = 0, s = _.length >>> 2, b = [], p = 0; p < s; p++) {
      for (var w = _[U = 4 * p], a = _[U + 1], u = _[U + 2], d = _[U + 3], S = 0, T = 1e9, F = 0; F < s; F++) if (p != F) {
        var Z = 4 * F;
        (ht = (N = w - _[Z]) * N + (x = a - _[Z + 1]) * x + (dt = u - _[Z + 2]) * dt + (nt = d - _[Z + 3]) * nt) < T && (T = ht, S = F);
      }
      b[p] = 0.5 * Math.sqrt(T), b[p] = b[p] * b[p];
    }
    for (p = 0; p < r.length; p += 4) {
      var U, N, x, dt, nt;
      if (w = r[p], a = r[p + 1], u = r[p + 2], d = r[p + 3], (T = (N = w - _[U = 4 * (S = l[p >>> 2])]) * N + (x = a - _[U + 1]) * x + (dt = u - _[U + 2]) * dt + (nt = d - _[U + 3]) * nt) > b[S]) for (F = 0; F < s; F++) {
        var ht;
        if ((ht = (N = w - _[U = 4 * F]) * N + (x = a - _[U + 1]) * x + (dt = u - _[U + 2]) * dt + (nt = d - _[U + 3]) * nt) < T && (S = F, (T = ht) < b[F])) break;
      }
      l[p >>> 2] = S, f += T;
    }
    return f / (r.length >>> 2);
  }
  function Q(r, l, _) {
    _ == null && (_ = 1e-4);
    var f = new Uint32Array(r.buffer), s = { i0: 0, i1: r.length, bst: null, est: null, tdst: 0, left: null, right: null };
    s.bst = R(r, s.i0, s.i1), s.est = k(s.bst);
    for (var b = [s]; b.length < l; ) {
      for (var p = 0, w = 0, a = 0; a < b.length; a++) b[a].est.L > p && (p = b[a].est.L, w = a);
      if (p < _) break;
      var u = b[w], d = h(r, f, u.i0, u.i1, u.est.e, u.est.eMq255);
      if (u.i0 >= d || u.i1 <= d) u.est.L = 0;
      else {
        var S = { i0: u.i0, i1: d, bst: null, est: null, tdst: 0, left: null, right: null };
        S.bst = R(r, S.i0, S.i1), S.est = k(S.bst);
        var T = { i0: d, i1: u.i1, bst: null, est: null, tdst: 0, left: null, right: null };
        for (T.bst = { R: [], m: [], N: u.bst.N - S.bst.N }, a = 0; a < 16; a++) T.bst.R[a] = u.bst.R[a] - S.bst.R[a];
        for (a = 0; a < 4; a++) T.bst.m[a] = u.bst.m[a] - S.bst.m[a];
        T.est = k(T.bst), u.left = S, u.right = T, b[w] = S, b.push(T);
      }
    }
    for (b.sort((function(F, Z) {
      return Z.bst.N - F.bst.N;
    })), a = 0; a < b.length; a++) b[a].ind = a;
    return [s, b];
  }
  function A(r, l, _, f, s) {
    if (r.left == null) return r.tdst = (function(d, S, T, F, Z) {
      var U = S - d[0], N = T - d[1], x = F - d[2], dt = Z - d[3];
      return U * U + N * N + x * x + dt * dt;
    })(r.est.q, l, _, f, s), r;
    var b = M(r.est, l, _, f, s), p = r.left, w = r.right;
    b > 0 && (p = r.right, w = r.left);
    var a = A(p, l, _, f, s);
    if (a.tdst <= b * b) return a;
    var u = A(w, l, _, f, s);
    return u.tdst < a.tdst ? u : a;
  }
  function M(r, l, _, f, s) {
    var b = r.e;
    return b[0] * l + b[1] * _ + b[2] * f + b[3] * s - r.eMq;
  }
  function h(r, l, _, f, s, b) {
    for (f -= 4; _ < f; ) {
      for (; o(r, _, s) <= b; ) _ += 4;
      for (; o(r, f, s) > b; ) f -= 4;
      if (_ >= f) break;
      var p = l[_ >> 2];
      l[_ >> 2] = l[f >> 2], l[f >> 2] = p, _ += 4, f -= 4;
    }
    for (; o(r, _, s) > b; ) _ -= 4;
    return _ + 4;
  }
  function o(r, l, _) {
    return r[l] * _[0] + r[l + 1] * _[1] + r[l + 2] * _[2] + r[l + 3] * _[3];
  }
  function R(r, l, _) {
    for (var f = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], s = [0, 0, 0, 0], b = _ - l >> 2, p = l; p < _; p += 4) {
      var w = r[p] * 0.00392156862745098, a = r[p + 1] * (1 / 255), u = r[p + 2] * (1 / 255), d = r[p + 3] * (1 / 255);
      s[0] += w, s[1] += a, s[2] += u, s[3] += d, f[0] += w * w, f[1] += w * a, f[2] += w * u, f[3] += w * d, f[5] += a * a, f[6] += a * u, f[7] += a * d, f[10] += u * u, f[11] += u * d, f[15] += d * d;
    }
    return f[4] = f[1], f[8] = f[2], f[9] = f[6], f[12] = f[3], f[13] = f[7], f[14] = f[11], { R: f, m: s, N: b };
  }
  function k(r) {
    var l = r.R, _ = r.m, f = r.N, s = _[0], b = _[1], p = _[2], w = _[3], a = f == 0 ? 0 : 1 / f, u = [l[0] - s * s * a, l[1] - s * b * a, l[2] - s * p * a, l[3] - s * w * a, l[4] - b * s * a, l[5] - b * b * a, l[6] - b * p * a, l[7] - b * w * a, l[8] - p * s * a, l[9] - p * b * a, l[10] - p * p * a, l[11] - p * w * a, l[12] - w * s * a, l[13] - w * b * a, l[14] - w * p * a, l[15] - w * w * a], d = u, S = j, T = [Math.random(), Math.random(), Math.random(), Math.random()], F = 0, Z = 0;
    if (f != 0) for (var U = 0; U < 16 && (T = S.multVec(d, T), Z = Math.sqrt(S.dot(T, T)), T = S.sml(1 / Z, T), !(U != 0 && Math.abs(Z - F) < 1e-9)); U++) F = Z;
    var N = [s * a, b * a, p * a, w * a];
    return { Cov: u, q: N, e: T, L: F, eMq255: S.dot(S.sml(255, N), T), eMq: S.dot(T, N), rgba: (Math.round(255 * N[3]) << 24 | Math.round(255 * N[2]) << 16 | Math.round(255 * N[1]) << 8 | Math.round(255 * N[0])) >>> 0 };
  }
  var j = { multVec: function(r, l) {
    return [r[0] * l[0] + r[1] * l[1] + r[2] * l[2] + r[3] * l[3], r[4] * l[0] + r[5] * l[1] + r[6] * l[2] + r[7] * l[3], r[8] * l[0] + r[9] * l[1] + r[10] * l[2] + r[11] * l[3], r[12] * l[0] + r[13] * l[1] + r[14] * l[2] + r[15] * l[3]];
  }, dot: function(r, l) {
    return r[0] * l[0] + r[1] * l[1] + r[2] * l[2] + r[3] * l[3];
  }, sml: function(r, l) {
    return [r * l[0], r * l[1], r * l[2], r * l[3]];
  } };
  Ht.encode = function(r, l, _, f, s, b, p) {
    f == null && (f = 0), p == null && (p = !1);
    var w = i(r, l, _, f, [!1, !1, !1, 0, p, !1]);
    return it(w, -1), rt(w, l, _, s, b);
  }, Ht.encodeLL = function(r, l, _, f, s, b, p, w) {
    for (var a = { ctype: 0 + (f == 1 ? 0 : 2) + (s == 0 ? 0 : 4), depth: b, frames: [] }, u = (f + s) * b, d = u * l, S = 0; S < r.length; S++) a.frames.push({ rect: { x: 0, y: 0, width: l, height: _ }, img: new Uint8Array(r[S]), blend: 0, dispose: 1, bpp: Math.ceil(u / 8), bpl: Math.ceil(d / 8) });
    return it(a, 0, !0), rt(a, l, _, p, w);
  }, Ht.encode.compress = i, Ht.encode.dither = et, Ht.quantize = G, Ht.quantize.findNearest = P, Ht.quantize.getKDtree = Q, Ht.quantize.getNearest = A;
})();
const Oe = function(X) {
  const J = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  let ot = "";
  for (let I = 0; I < X.length; I += 3) {
    const B = X[I], C = I + 1 < X.length, V = I + 2 < X.length, et = C ? X[I + 1] : 0, rt = V ? X[I + 2] : 0, it = B << 16 | et << 8 | rt;
    ot += J.charAt(it >>> 18 & 63), ot += J.charAt(it >>> 12 & 63), ot += C ? J.charAt(it >>> 6 & 63) : "=", ot += V ? J.charAt(it & 63) : "=";
  }
  return ot;
}, Ne = function(X, J, ot, I, B) {
  const C = new Uint8Array(X * J * 4);
  for (let rt = 0; rt < J; rt += 1)
    for (let it = 0; it < X; it += 1) {
      const i = (rt * X + it) * 4, E = B(it, rt) ? ot : I;
      C[i] = E[0], C[i + 1] = E[1], C[i + 2] = E[2], C[i + 3] = E[3];
    }
  const V = Ht.encode([C.buffer], X, J, 0);
  return "data:image/png;base64," + Oe(new Uint8Array(V));
};
Re("png", {
  args: [
    { name: "cellSize", type: "number" },
    { name: "margin", type: "number" },
    { name: "cellColor", type: "string" },
    { name: "backgroundColor", type: "string" }
  ],
  render: function(X) {
    let J = X.tag === !1 ? !1 : X.tag === !0 || typeof X.tag > "u" ? "img" : X.tag, ot = X.cellSize, I = X.margin, B = X.cellColor, C = X.backgroundColor;
    typeof ot != "number" && (ot = typeof X.cellSize == "number" ? X.cellSize : 2), typeof I > "u" && (I = X.margin), typeof I != "number" && (I = typeof I > "u" ? ot * 4 : 0), typeof B != "string" && (B = X.cellColor), typeof C != "string" && (C = X.backgroundColor);
    const V = typeof X.alt == "string" ? X.alt : void 0, et = typeof X.title == "string" ? X.title : void 0, rt = ge(typeof B == "string" ? B : "black", [0, 0, 0, 255]), it = ge(typeof C == "string" ? C : "white", [255, 255, 255, 255]), i = Number(ot), E = Number(I), g = Number(this.getModuleCount()) * i + E * 2, H = E, G = g - E, K = Ne(g, g, rt, it, (P, Q) => {
      if (H <= P && P < G && H <= Q && Q < G) {
        const A = Math.floor((P - H) / i), M = Math.floor((Q - H) / i);
        return this.isDark(M, A);
      }
      return !1;
    });
    if (J === !1)
      return K;
    J = typeof J == "string" ? J : "img";
    let m = "";
    return m += "<" + J, m += ' src="', m += K, m += '"', m += ' width="', m += g, m += '"', m += ' height="', m += g, m += '"', V && (m += ' alt="', m += be(V), m += '"'), et && (m += ' title="', m += be(et), m += '"'), m += "/>", m;
  }
});
//# sourceMappingURL=png.mjs.map
