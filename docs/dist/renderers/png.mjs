import Re from "../core/qrcode.mjs";
import { parseRgbaColor as ge } from "./utils/color.mjs";
import { escapeXml as pe } from "./utils/xml.mjs";
var Xt = {}, Bt = {}, jt = {}, be;
function Te() {
  if (be) return jt;
  be = 1;
  const P = 4, J = 0, ot = 1, L = 2;
  function H(e) {
    let I = e.length;
    for (; --I >= 0; )
      e[I] = 0;
  }
  const F = 0, $ = 1, et = 2, rt = 3, it = 258, i = 29, E = 256, c = E + 1 + i, g = 30, O = 19, G = 2 * c + 1, K = 15, x = 16, W = 7, Q = 256, A = 16, M = 17, h = 18, o = (
    /* extra bits for each length code */
    new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0])
  ), R = (
    /* extra bits for each distance code */
    new Uint8Array([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13])
  ), k = (
    /* extra bits for each bit length code */
    new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7])
  ), X = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), r = 512, l = new Array((c + 2) * 2);
  H(l);
  const _ = new Array(g * 2);
  H(_);
  const f = new Array(r);
  H(f);
  const s = new Array(it - rt + 1);
  H(s);
  const p = new Array(i);
  H(p);
  const b = new Array(g);
  H(b);
  function w(e, I, D, q, j) {
    this.static_tree = e, this.extra_bits = I, this.extra_base = D, this.elems = q, this.max_length = j, this.has_stree = e && e.length;
  }
  let a, u, d;
  function S(e, I) {
    this.dyn_tree = e, this.max_code = 0, this.stat_desc = I;
  }
  const T = (e) => e < 256 ? f[e] : f[256 + (e >>> 7)], C = (e, I) => {
    e.pending_buf[e.pending++] = I & 255, e.pending_buf[e.pending++] = I >>> 8 & 255;
  }, Z = (e, I, D) => {
    e.bi_valid > x - D ? (e.bi_buf |= I << e.bi_valid & 65535, C(e, e.bi_buf), e.bi_buf = I >> x - e.bi_valid, e.bi_valid += D - x) : (e.bi_buf |= I << e.bi_valid & 65535, e.bi_valid += D);
  }, U = (e, I, D) => {
    Z(
      e,
      D[I * 2],
      D[I * 2 + 1]
      /*.Len*/
    );
  }, B = (e, I) => {
    let D = 0;
    do
      D |= e & 1, e >>>= 1, D <<= 1;
    while (--I > 0);
    return D >>> 1;
  }, m = (e) => {
    e.bi_valid === 16 ? (C(e, e.bi_buf), e.bi_buf = 0, e.bi_valid = 0) : e.bi_valid >= 8 && (e.pending_buf[e.pending++] = e.bi_buf & 255, e.bi_buf >>= 8, e.bi_valid -= 8);
  }, dt = (e, I) => {
    const D = I.dyn_tree, q = I.max_code, j = I.stat_desc.static_tree, V = I.stat_desc.has_stree, N = I.stat_desc.extra_bits, lt = I.stat_desc.extra_base, xt = I.stat_desc.max_length;
    let ut, bt, At, ft, Rt, Tt, It = 0;
    for (ft = 0; ft <= K; ft++)
      e.bl_count[ft] = 0;
    for (D[e.heap[e.heap_max] * 2 + 1] = 0, ut = e.heap_max + 1; ut < G; ut++)
      bt = e.heap[ut], ft = D[D[bt * 2 + 1] * 2 + 1] + 1, ft > xt && (ft = xt, It++), D[bt * 2 + 1] = ft, !(bt > q) && (e.bl_count[ft]++, Rt = 0, bt >= lt && (Rt = N[bt - lt]), Tt = D[bt * 2], e.opt_len += Tt * (ft + Rt), V && (e.static_len += Tt * (j[bt * 2 + 1] + Rt)));
    if (It !== 0) {
      do {
        for (ft = xt - 1; e.bl_count[ft] === 0; )
          ft--;
        e.bl_count[ft]--, e.bl_count[ft + 1] += 2, e.bl_count[xt]--, It -= 2;
      } while (It > 0);
      for (ft = xt; ft !== 0; ft--)
        for (bt = e.bl_count[ft]; bt !== 0; )
          At = e.heap[--ut], !(At > q) && (D[At * 2 + 1] !== ft && (e.opt_len += (ft - D[At * 2 + 1]) * D[At * 2], D[At * 2 + 1] = ft), bt--);
    }
  }, nt = (e, I, D) => {
    const q = new Array(K + 1);
    let j = 0, V, N;
    for (V = 1; V <= K; V++)
      j = j + D[V - 1] << 1, q[V] = j;
    for (N = 0; N <= I; N++) {
      let lt = e[N * 2 + 1];
      lt !== 0 && (e[N * 2] = B(q[lt]++, lt));
    }
  }, ht = () => {
    let e, I, D, q, j;
    const V = new Array(K + 1);
    for (D = 0, q = 0; q < i - 1; q++)
      for (p[q] = D, e = 0; e < 1 << o[q]; e++)
        s[D++] = q;
    for (s[D - 1] = q, j = 0, q = 0; q < 16; q++)
      for (b[q] = j, e = 0; e < 1 << R[q]; e++)
        f[j++] = q;
    for (j >>= 7; q < g; q++)
      for (b[q] = j << 7, e = 0; e < 1 << R[q] - 7; e++)
        f[256 + j++] = q;
    for (I = 0; I <= K; I++)
      V[I] = 0;
    for (e = 0; e <= 143; )
      l[e * 2 + 1] = 8, e++, V[8]++;
    for (; e <= 255; )
      l[e * 2 + 1] = 9, e++, V[9]++;
    for (; e <= 279; )
      l[e * 2 + 1] = 7, e++, V[7]++;
    for (; e <= 287; )
      l[e * 2 + 1] = 8, e++, V[8]++;
    for (nt(l, c + 1, V), e = 0; e < g; e++)
      _[e * 2 + 1] = 5, _[e * 2] = B(e, 5);
    a = new w(l, o, E + 1, c, K), u = new w(_, R, 0, g, K), d = new w(new Array(0), k, 0, O, W);
  }, at = (e) => {
    let I;
    for (I = 0; I < c; I++)
      e.dyn_ltree[I * 2] = 0;
    for (I = 0; I < g; I++)
      e.dyn_dtree[I * 2] = 0;
    for (I = 0; I < O; I++)
      e.bl_tree[I * 2] = 0;
    e.dyn_ltree[Q * 2] = 1, e.opt_len = e.static_len = 0, e.sym_next = e.matches = 0;
  }, vt = (e) => {
    e.bi_valid > 8 ? C(e, e.bi_buf) : e.bi_valid > 0 && (e.pending_buf[e.pending++] = e.bi_buf), e.bi_buf = 0, e.bi_valid = 0;
  }, mt = (e, I, D, q) => {
    const j = I * 2, V = D * 2;
    return e[j] < e[V] || e[j] === e[V] && q[I] <= q[D];
  }, gt = (e, I, D) => {
    const q = e.heap[D];
    let j = D << 1;
    for (; j <= e.heap_len && (j < e.heap_len && mt(I, e.heap[j + 1], e.heap[j], e.depth) && j++, !mt(I, q, e.heap[j], e.depth)); )
      e.heap[D] = e.heap[j], D = j, j <<= 1;
    e.heap[D] = q;
  }, Dt = (e, I, D) => {
    let q, j, V = 0, N, lt;
    if (e.sym_next !== 0)
      do
        q = e.pending_buf[e.sym_buf + V++] & 255, q += (e.pending_buf[e.sym_buf + V++] & 255) << 8, j = e.pending_buf[e.sym_buf + V++], q === 0 ? U(e, j, I) : (N = s[j], U(e, N + E + 1, I), lt = o[N], lt !== 0 && (j -= p[N], Z(e, j, lt)), q--, N = T(q), U(e, N, D), lt = R[N], lt !== 0 && (q -= b[N], Z(e, q, lt)));
      while (V < e.sym_next);
    U(e, Q, I);
  }, zt = (e, I) => {
    const D = I.dyn_tree, q = I.stat_desc.static_tree, j = I.stat_desc.has_stree, V = I.stat_desc.elems;
    let N, lt, xt = -1, ut;
    for (e.heap_len = 0, e.heap_max = G, N = 0; N < V; N++)
      D[N * 2] !== 0 ? (e.heap[++e.heap_len] = xt = N, e.depth[N] = 0) : D[N * 2 + 1] = 0;
    for (; e.heap_len < 2; )
      ut = e.heap[++e.heap_len] = xt < 2 ? ++xt : 0, D[ut * 2] = 1, e.depth[ut] = 0, e.opt_len--, j && (e.static_len -= q[ut * 2 + 1]);
    for (I.max_code = xt, N = e.heap_len >> 1; N >= 1; N--)
      gt(e, D, N);
    ut = V;
    do
      N = e.heap[
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
      ], e.heap[--e.heap_max] = N, e.heap[--e.heap_max] = lt, D[ut * 2] = D[N * 2] + D[lt * 2], e.depth[ut] = (e.depth[N] >= e.depth[lt] ? e.depth[N] : e.depth[lt]) + 1, D[N * 2 + 1] = D[lt * 2 + 1] = ut, e.heap[
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
    ], dt(e, I), nt(D, xt, e.bl_count);
  }, Mt = (e, I, D) => {
    let q, j = -1, V, N = I[1], lt = 0, xt = 7, ut = 4;
    for (N === 0 && (xt = 138, ut = 3), I[(D + 1) * 2 + 1] = 65535, q = 0; q <= D; q++)
      V = N, N = I[(q + 1) * 2 + 1], !(++lt < xt && V === N) && (lt < ut ? e.bl_tree[V * 2] += lt : V !== 0 ? (V !== j && e.bl_tree[V * 2]++, e.bl_tree[A * 2]++) : lt <= 10 ? e.bl_tree[M * 2]++ : e.bl_tree[h * 2]++, lt = 0, j = V, N === 0 ? (xt = 138, ut = 3) : V === N ? (xt = 6, ut = 3) : (xt = 7, ut = 4));
  }, Et = (e, I, D) => {
    let q, j = -1, V, N = I[1], lt = 0, xt = 7, ut = 4;
    for (N === 0 && (xt = 138, ut = 3), q = 0; q <= D; q++)
      if (V = N, N = I[(q + 1) * 2 + 1], !(++lt < xt && V === N)) {
        if (lt < ut)
          do
            U(e, V, e.bl_tree);
          while (--lt !== 0);
        else V !== 0 ? (V !== j && (U(e, V, e.bl_tree), lt--), U(e, A, e.bl_tree), Z(e, lt - 3, 2)) : lt <= 10 ? (U(e, M, e.bl_tree), Z(e, lt - 3, 3)) : (U(e, h, e.bl_tree), Z(e, lt - 11, 7));
        lt = 0, j = V, N === 0 ? (xt = 138, ut = 3) : V === N ? (xt = 6, ut = 3) : (xt = 7, ut = 4);
      }
  }, $t = (e) => {
    let I;
    for (Mt(e, e.dyn_ltree, e.l_desc.max_code), Mt(e, e.dyn_dtree, e.d_desc.max_code), zt(e, e.bl_desc), I = O - 1; I >= 3 && e.bl_tree[X[I] * 2 + 1] === 0; I--)
      ;
    return e.opt_len += 3 * (I + 1) + 5 + 5 + 4, I;
  }, kt = (e, I, D, q) => {
    let j;
    for (Z(e, I - 257, 5), Z(e, D - 1, 5), Z(e, q - 4, 4), j = 0; j < q; j++)
      Z(e, e.bl_tree[X[j] * 2 + 1], 3);
    Et(e, e.dyn_ltree, I - 1), Et(e, e.dyn_dtree, D - 1);
  }, Zt = (e) => {
    let I = 4093624447, D;
    for (D = 0; D <= 31; D++, I >>>= 1)
      if (I & 1 && e.dyn_ltree[D * 2] !== 0)
        return J;
    if (e.dyn_ltree[18] !== 0 || e.dyn_ltree[20] !== 0 || e.dyn_ltree[26] !== 0)
      return ot;
    for (D = 32; D < E; D++)
      if (e.dyn_ltree[D * 2] !== 0)
        return ot;
    return J;
  };
  let pt = !1;
  const St = (e) => {
    pt || (ht(), pt = !0), e.l_desc = new S(e.dyn_ltree, a), e.d_desc = new S(e.dyn_dtree, u), e.bl_desc = new S(e.bl_tree, d), e.bi_buf = 0, e.bi_valid = 0, at(e);
  }, ct = (e, I, D, q) => {
    Z(e, (F << 1) + (q ? 1 : 0), 3), vt(e), C(e, D), C(e, ~D), D && e.pending_buf.set(e.window.subarray(I, I + D), e.pending), e.pending += D;
  }, Lt = (e) => {
    Z(e, $ << 1, 3), U(e, Q, l), m(e);
  }, qt = (e, I, D, q) => {
    let j, V, N = 0;
    e.level > 0 ? (e.strm.data_type === L && (e.strm.data_type = Zt(e)), zt(e, e.l_desc), zt(e, e.d_desc), N = $t(e), j = e.opt_len + 3 + 7 >>> 3, V = e.static_len + 3 + 7 >>> 3, V <= j && (j = V)) : j = V = D + 5, D + 4 <= j && I !== -1 ? ct(e, I, D, q) : e.strategy === P || V === j ? (Z(e, ($ << 1) + (q ? 1 : 0), 3), Dt(e, l, _)) : (Z(e, (et << 1) + (q ? 1 : 0), 3), kt(e, e.l_desc.max_code + 1, e.d_desc.max_code + 1, N + 1), Dt(e, e.dyn_ltree, e.dyn_dtree)), at(e), q && vt(e);
  }, Ft = (e, I, D) => (e.pending_buf[e.sym_buf + e.sym_next++] = I, e.pending_buf[e.sym_buf + e.sym_next++] = I >> 8, e.pending_buf[e.sym_buf + e.sym_next++] = D, I === 0 ? e.dyn_ltree[D * 2]++ : (e.matches++, I--, e.dyn_ltree[(s[D] + E + 1) * 2]++, e.dyn_dtree[T(I) * 2]++), e.sym_next === e.sym_end);
  return jt._tr_init = St, jt._tr_stored_block = ct, jt._tr_flush_block = qt, jt._tr_tally = Ft, jt._tr_align = Lt, jt;
}
var ie, we;
function Ze() {
  return we || (we = 1, ie = (J, ot, L, H) => {
    let F = J & 65535 | 0, $ = J >>> 16 & 65535 | 0, et = 0;
    for (; L !== 0; ) {
      et = L > 2e3 ? 2e3 : L, L -= et;
      do
        F = F + ot[H++] | 0, $ = $ + F | 0;
      while (--et);
      F %= 65521, $ %= 65521;
    }
    return F | $ << 16 | 0;
  }), ie;
}
var le, xe;
function Ie() {
  if (xe) return le;
  xe = 1;
  const P = () => {
    let L, H = [];
    for (var F = 0; F < 256; F++) {
      L = F;
      for (var $ = 0; $ < 8; $++)
        L = L & 1 ? 3988292384 ^ L >>> 1 : L >>> 1;
      H[F] = L;
    }
    return H;
  }, J = new Uint32Array(P());
  return le = (L, H, F, $) => {
    const et = J, rt = $ + F;
    L ^= -1;
    for (let it = $; it < rt; it++)
      L = L >>> 8 ^ et[(L ^ H[it]) & 255];
    return L ^ -1;
  }, le;
}
var fe, me;
function Ue() {
  return me || (me = 1, fe = {
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
var oe, ve;
function he() {
  return ve || (ve = 1, oe = {
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
var ye;
function Le() {
  if (ye) return Bt;
  ye = 1;
  const { _tr_init: P, _tr_stored_block: J, _tr_flush_block: ot, _tr_tally: L, _tr_align: H } = Te(), F = Ze(), $ = Ie(), et = Ue(), {
    Z_NO_FLUSH: rt,
    Z_PARTIAL_FLUSH: it,
    Z_FULL_FLUSH: i,
    Z_FINISH: E,
    Z_BLOCK: c,
    Z_OK: g,
    Z_STREAM_END: O,
    Z_STREAM_ERROR: G,
    Z_DATA_ERROR: K,
    Z_BUF_ERROR: x,
    Z_DEFAULT_COMPRESSION: W,
    Z_FILTERED: Q,
    Z_HUFFMAN_ONLY: A,
    Z_RLE: M,
    Z_FIXED: h,
    Z_DEFAULT_STRATEGY: o,
    Z_UNKNOWN: R,
    Z_DEFLATED: k
  } = he(), X = 9, r = 15, l = 8, s = 256 + 1 + 29, p = 30, b = 19, w = 2 * s + 1, a = 15, u = 3, d = 258, S = d + u + 1, T = 32, C = 42, Z = 57, U = 69, B = 73, m = 91, dt = 103, nt = 113, ht = 666, at = 1, vt = 2, mt = 3, gt = 4, Dt = 3, zt = (t, v) => (t.msg = et[v], v), Mt = (t) => t * 2 - (t > 4 ? 9 : 0), Et = (t) => {
    let v = t.length;
    for (; --v >= 0; )
      t[v] = 0;
  }, $t = (t) => {
    let v, n, z, y = t.w_size;
    v = t.hash_size, z = v;
    do
      n = t.head[--z], t.head[z] = n >= y ? n - y : 0;
    while (--v);
    v = y, z = v;
    do
      n = t.prev[--z], t.prev[z] = n >= y ? n - y : 0;
    while (--v);
  };
  let kt = (t, v, n) => (v << t.hash_shift ^ n) & t.hash_mask;
  const Zt = (t, v) => {
    let n;
    if (t.legacy_hash)
      n = t.ins_h = kt(t, t.ins_h, t.window[v + u - 1]);
    else {
      const y = t.window, Y = y[v] | y[v + 1] << 8 | y[v + 2] << 16 | y[v + 3] << 24;
      n = t.ins_h = Math.imul(Y, 66521) + 66521 >>> 16 & t.hash_mask;
    }
    const z = t.prev[v & t.w_mask] = t.head[n];
    return t.head[n] = v, z;
  }, pt = (t) => {
    const v = t.state;
    let n = v.pending;
    n > t.avail_out && (n = t.avail_out), n !== 0 && (t.output.set(v.pending_buf.subarray(v.pending_out, v.pending_out + n), t.next_out), t.next_out += n, v.pending_out += n, t.total_out += n, t.avail_out -= n, v.pending -= n, v.pending === 0 && (v.pending_out = 0));
  }, St = (t, v) => {
    ot(t, t.block_start >= 0 ? t.block_start : -1, t.strstart - t.block_start, v), t.block_start = t.strstart, pt(t.strm);
  }, ct = (t, v) => {
    t.pending_buf[t.pending++] = v;
  }, Lt = (t, v) => {
    t.pending_buf[t.pending++] = v >>> 8 & 255, t.pending_buf[t.pending++] = v & 255;
  }, qt = (t, v, n, z) => {
    let y = t.avail_in;
    return y > z && (y = z), y === 0 ? 0 : (t.avail_in -= y, v.set(t.input.subarray(t.next_in, t.next_in + y), n), t.state.wrap === 1 ? t.adler = F(t.adler, v, y, n) : t.state.wrap === 2 && (t.adler = $(t.adler, v, y, n)), t.next_in += y, t.total_in += y, y);
  }, Ft = (t, v) => {
    let n = t.max_chain_length, z = t.strstart, y, Y, _t = t.prev_length, yt = t.nice_match;
    const tt = t.strstart > t.w_size - S ? t.strstart - (t.w_size - S) : 0, wt = t.window, Gt = t.w_mask, ne = t.prev, Jt = t.strstart + d;
    let Ot = wt[z + _t - 1], Nt = wt[z + _t];
    t.prev_length >= t.good_match && (n >>= 2), yt > t.lookahead && (yt = t.lookahead);
    do
      if (y = v, !(wt[y + _t] !== Nt || wt[y + _t - 1] !== Ot || wt[y] !== wt[z] || wt[++y] !== wt[z + 1])) {
        z += 2, y++;
        do
          ;
        while (wt[++z] === wt[++y] && wt[++z] === wt[++y] && wt[++z] === wt[++y] && wt[++z] === wt[++y] && wt[++z] === wt[++y] && wt[++z] === wt[++y] && wt[++z] === wt[++y] && wt[++z] === wt[++y] && z < Jt);
        if (Y = d - (Jt - z), z = Jt - d, Y > _t) {
          if (t.match_start = v, _t = Y, Y >= yt)
            break;
          Ot = wt[z + _t - 1], Nt = wt[z + _t];
        }
      }
    while ((v = ne[v & Gt]) > tt && --n !== 0);
    return _t <= t.lookahead ? _t : t.lookahead;
  }, e = (t) => {
    const v = t.w_size;
    let n, z, y;
    do {
      if (z = t.window_size - t.lookahead - t.strstart, t.strstart >= v + (v - S) && (t.window.set(t.window.subarray(v, v + v - z), 0), t.match_start -= v, t.strstart -= v, t.block_start -= v, t.insert > t.strstart && (t.insert = t.strstart), $t(t), z += v), t.strm.avail_in === 0)
        break;
      if (n = qt(t.strm, t.window, t.strstart + t.lookahead, z), t.lookahead += n, t.legacy_hash) {
        if (t.lookahead + t.insert >= u)
          for (y = t.strstart - t.insert, t.ins_h = t.window[y], t.ins_h = kt(t, t.ins_h, t.window[y + 1]); t.insert && (Zt(t, y), y++, t.insert--, !(t.lookahead + t.insert < u)); )
            ;
      } else if (t.lookahead + t.insert > u)
        for (y = t.strstart - t.insert; t.insert && (Zt(t, y), y++, t.insert--, !(t.lookahead + t.insert <= u)); )
          ;
    } while (t.lookahead < S && t.strm.avail_in !== 0);
  }, I = (t, v) => {
    let n = t.pending_buf_size - 5 > t.w_size ? t.w_size : t.pending_buf_size - 5, z, y, Y, _t = 0, yt = t.strm.avail_in;
    do {
      if (z = 65535, Y = t.bi_valid + 42 >> 3, t.strm.avail_out < Y || (Y = t.strm.avail_out - Y, y = t.strstart - t.block_start, z > y + t.strm.avail_in && (z = y + t.strm.avail_in), z > Y && (z = Y), z < n && (z === 0 && v !== E || v === rt || z !== y + t.strm.avail_in)))
        break;
      _t = v === E && z === y + t.strm.avail_in ? 1 : 0, J(t, 0, 0, _t), t.pending_buf[t.pending - 4] = z, t.pending_buf[t.pending - 3] = z >> 8, t.pending_buf[t.pending - 2] = ~z, t.pending_buf[t.pending - 1] = ~z >> 8, pt(t.strm), y && (y > z && (y = z), t.strm.output.set(t.window.subarray(t.block_start, t.block_start + y), t.strm.next_out), t.strm.next_out += y, t.strm.avail_out -= y, t.strm.total_out += y, t.block_start += y, z -= y), z && (qt(t.strm, t.strm.output, t.strm.next_out, z), t.strm.next_out += z, t.strm.avail_out -= z, t.strm.total_out += z);
    } while (_t === 0);
    return yt -= t.strm.avail_in, yt && (yt >= t.w_size ? (t.matches = 2, t.window.set(t.strm.input.subarray(t.strm.next_in - t.w_size, t.strm.next_in), 0), t.strstart = t.w_size, t.insert = t.strstart) : (t.window_size - t.strstart <= yt && (t.strstart -= t.w_size, t.window.set(t.window.subarray(t.w_size, t.w_size + t.strstart), 0), t.matches < 2 && t.matches++, t.insert > t.strstart && (t.insert = t.strstart)), t.window.set(t.strm.input.subarray(t.strm.next_in - yt, t.strm.next_in), t.strstart), t.strstart += yt, t.insert += yt > t.w_size - t.insert ? t.w_size - t.insert : yt), t.block_start = t.strstart), t.high_water < t.strstart && (t.high_water = t.strstart), _t ? gt : v !== rt && v !== E && t.strm.avail_in === 0 && t.strstart === t.block_start ? vt : (Y = t.window_size - t.strstart, t.strm.avail_in > Y && t.block_start >= t.w_size && (t.block_start -= t.w_size, t.strstart -= t.w_size, t.window.set(t.window.subarray(t.w_size, t.w_size + t.strstart), 0), t.matches < 2 && t.matches++, Y += t.w_size, t.insert > t.strstart && (t.insert = t.strstart)), Y > t.strm.avail_in && (Y = t.strm.avail_in), Y && (qt(t.strm, t.window, t.strstart, Y), t.strstart += Y, t.insert += Y > t.w_size - t.insert ? t.w_size - t.insert : Y), t.high_water < t.strstart && (t.high_water = t.strstart), Y = t.bi_valid + 42 >> 3, Y = t.pending_buf_size - Y > 65535 ? 65535 : t.pending_buf_size - Y, n = Y > t.w_size ? t.w_size : Y, y = t.strstart - t.block_start, (y >= n || (y || v === E) && v !== rt && t.strm.avail_in === 0 && y <= Y) && (z = y > Y ? Y : y, _t = v === E && t.strm.avail_in === 0 && z === y ? 1 : 0, J(t, t.block_start, z, _t), t.block_start += z, pt(t.strm)), _t ? mt : at);
  }, D = (t, v) => {
    let n, z;
    for (; ; ) {
      if (t.lookahead < S) {
        if (e(t), t.lookahead < S && v === rt)
          return at;
        if (t.lookahead === 0)
          break;
      }
      if (n = 0, t.lookahead >= u && (n = Zt(t, t.strstart)), n !== 0 && t.strstart - n <= t.w_size - S && (t.match_length = Ft(t, n)), t.match_length >= u)
        if (z = L(t, t.strstart - t.match_start, t.match_length - u), t.lookahead -= t.match_length, t.match_length <= t.max_lazy_match && t.lookahead >= u) {
          t.match_length--;
          do
            t.strstart++, n = Zt(t, t.strstart);
          while (--t.match_length !== 0);
          t.strstart++;
        } else
          t.strstart += t.match_length, t.match_length = 0, t.legacy_hash && (t.ins_h = t.window[t.strstart], t.ins_h = kt(t, t.ins_h, t.window[t.strstart + 1]));
      else
        z = L(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++;
      if (z && (St(t, !1), t.strm.avail_out === 0))
        return at;
    }
    return t.insert = t.strstart < u - 1 ? t.strstart : u - 1, v === E ? (St(t, !0), t.strm.avail_out === 0 ? mt : gt) : t.sym_next && (St(t, !1), t.strm.avail_out === 0) ? at : vt;
  }, q = (t, v) => {
    let n, z, y;
    for (; ; ) {
      if (t.lookahead < S) {
        if (e(t), t.lookahead < S && v === rt)
          return at;
        if (t.lookahead === 0)
          break;
      }
      if (n = 0, t.lookahead >= u && (n = Zt(t, t.strstart)), t.prev_length = t.match_length, t.prev_match = t.match_start, t.match_length = u - 1, n !== 0 && t.prev_length < t.max_lazy_match && t.strstart - n <= t.w_size - S && (t.match_length = Ft(t, n), t.match_length <= 5 && (t.strategy === Q || t.match_length === u && t.strstart - t.match_start > 4096) && (t.match_length = u - 1)), t.prev_length >= u && t.match_length <= t.prev_length) {
        y = t.strstart + t.lookahead - u, z = L(t, t.strstart - 1 - t.prev_match, t.prev_length - u), t.lookahead -= t.prev_length - 1, t.prev_length -= 2;
        do
          ++t.strstart <= y && (n = Zt(t, t.strstart));
        while (--t.prev_length !== 0);
        if (t.match_available = 0, t.match_length = u - 1, t.strstart++, z && (St(t, !1), t.strm.avail_out === 0))
          return at;
      } else if (t.match_available) {
        if (z = L(t, 0, t.window[t.strstart - 1]), z && St(t, !1), t.strstart++, t.lookahead--, t.strm.avail_out === 0)
          return at;
      } else
        t.match_available = 1, t.strstart++, t.lookahead--;
    }
    return t.match_available && (z = L(t, 0, t.window[t.strstart - 1]), t.match_available = 0), t.insert = t.strstart < u - 1 ? t.strstart : u - 1, v === E ? (St(t, !0), t.strm.avail_out === 0 ? mt : gt) : t.sym_next && (St(t, !1), t.strm.avail_out === 0) ? at : vt;
  }, j = (t, v) => {
    let n, z, y, Y;
    const _t = t.window;
    for (; ; ) {
      if (t.lookahead <= d) {
        if (e(t), t.lookahead <= d && v === rt)
          return at;
        if (t.lookahead === 0)
          break;
      }
      if (t.match_length = 0, t.lookahead >= u && t.strstart > 0 && (y = t.strstart - 1, z = _t[y], z === _t[++y] && z === _t[++y] && z === _t[++y])) {
        Y = t.strstart + d;
        do
          ;
        while (z === _t[++y] && z === _t[++y] && z === _t[++y] && z === _t[++y] && z === _t[++y] && z === _t[++y] && z === _t[++y] && z === _t[++y] && y < Y);
        t.match_length = d - (Y - y), t.match_length > t.lookahead && (t.match_length = t.lookahead);
      }
      if (t.match_length >= u ? (n = L(t, 1, t.match_length - u), t.lookahead -= t.match_length, t.strstart += t.match_length, t.match_length = 0) : (n = L(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++), n && (St(t, !1), t.strm.avail_out === 0))
        return at;
    }
    return t.insert = 0, v === E ? (St(t, !0), t.strm.avail_out === 0 ? mt : gt) : t.sym_next && (St(t, !1), t.strm.avail_out === 0) ? at : vt;
  }, V = (t, v) => {
    let n;
    for (; ; ) {
      if (t.lookahead === 0 && (e(t), t.lookahead === 0)) {
        if (v === rt)
          return at;
        break;
      }
      if (t.match_length = 0, n = L(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++, n && (St(t, !1), t.strm.avail_out === 0))
        return at;
    }
    return t.insert = 0, v === E ? (St(t, !0), t.strm.avail_out === 0 ? mt : gt) : t.sym_next && (St(t, !1), t.strm.avail_out === 0) ? at : vt;
  };
  function N(t, v, n, z, y) {
    this.good_length = t, this.max_lazy = v, this.nice_length = n, this.max_chain = z, this.func = y;
  }
  const lt = [
    /*      good lazy nice chain */
    new N(0, 0, 0, 0, I),
    /* 0 store only */
    new N(4, 4, 8, 4, D),
    /* 1 max speed, no lazy matches */
    new N(4, 5, 16, 8, D),
    /* 2 */
    new N(4, 6, 32, 32, D),
    /* 3 */
    new N(4, 4, 16, 16, q),
    /* 4 lazy matches */
    new N(8, 16, 32, 32, q),
    /* 5 */
    new N(8, 16, 128, 128, q),
    /* 6 */
    new N(8, 32, 128, 256, q),
    /* 7 */
    new N(32, 128, 258, 1024, q),
    /* 8 */
    new N(32, 258, 258, 4096, q)
    /* 9 max compression */
  ], xt = (t) => {
    t.window_size = 2 * t.w_size, Et(t.head), t.max_lazy_match = lt[t.level].max_lazy, t.good_match = lt[t.level].good_length, t.nice_match = lt[t.level].nice_length, t.max_chain_length = lt[t.level].max_chain, t.strstart = 0, t.block_start = 0, t.lookahead = 0, t.insert = 0, t.match_length = t.prev_length = u - 1, t.match_available = 0, t.ins_h = 0;
  };
  function ut() {
    this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = k, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.legacy_hash = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new Uint16Array(w * 2), this.dyn_dtree = new Uint16Array((2 * p + 1) * 2), this.bl_tree = new Uint16Array((2 * b + 1) * 2), Et(this.dyn_ltree), Et(this.dyn_dtree), Et(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new Uint16Array(a + 1), this.heap = new Uint16Array(2 * s + 1), Et(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new Uint16Array(2 * s + 1), Et(this.depth), this.sym_buf = 0, this.lit_bufsize = 0, this.sym_next = 0, this.sym_end = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
  }
  const bt = (t) => {
    if (!t)
      return 1;
    const v = t.state;
    return !v || v.strm !== t || v.status !== C && //#ifdef GZIP
    v.status !== Z && //#endif
    v.status !== U && v.status !== B && v.status !== m && v.status !== dt && v.status !== nt && v.status !== ht ? 1 : 0;
  }, At = (t) => {
    if (bt(t))
      return zt(t, G);
    t.total_in = t.total_out = 0, t.data_type = R;
    const v = t.state;
    return v.pending = 0, v.pending_out = 0, v.wrap < 0 && (v.wrap = -v.wrap), v.status = //#ifdef GZIP
    v.wrap === 2 ? Z : (
      //#endif
      v.wrap ? C : nt
    ), t.adler = v.wrap === 2 ? 0 : 1, v.last_flush = -2, P(v), g;
  }, ft = (t) => {
    const v = At(t);
    return v === g && xt(t.state), v;
  }, Rt = (t, v) => bt(t) || t.state.wrap !== 2 ? G : (t.state.gzhead = v, g), Tt = (t, v, n, z, y, Y, _t) => {
    if (!t)
      return G;
    let yt = 1;
    if (v === W && (v = 6), z < 0 ? (yt = 0, z = -z) : z > 15 && (yt = 2, z -= 16), y < 1 || y > X || n !== k || z < 8 || z > 15 || v < 0 || v > 9 || Y < 0 || Y > h || z === 8 && yt !== 1)
      return zt(t, G);
    z === 8 && (z = 9);
    const tt = new ut();
    return t.state = tt, tt.strm = t, tt.status = C, tt.wrap = yt, tt.gzhead = null, tt.w_bits = z, tt.w_size = 1 << tt.w_bits, tt.w_mask = tt.w_size - 1, tt.legacy_hash = _t ? 1 : 0, tt.hash_bits = y + 7, !tt.legacy_hash && tt.hash_bits < 15 && (tt.hash_bits = 15), tt.hash_size = 1 << tt.hash_bits, tt.hash_mask = tt.hash_size - 1, tt.hash_shift = ~~((tt.hash_bits + u - 1) / u), tt.window = new Uint8Array(tt.w_size * 2), tt.head = new Uint16Array(tt.hash_size), tt.prev = new Uint16Array(tt.w_size), tt.lit_bufsize = 1 << y + 6, tt.pending_buf_size = tt.lit_bufsize * 4, tt.pending_buf = new Uint8Array(tt.pending_buf_size), tt.sym_buf = tt.lit_bufsize, tt.sym_end = (tt.lit_bufsize - 1) * 3, tt.level = v, tt.strategy = Y, tt.method = n, ft(t);
  }, It = (t, v) => Tt(t, v, k, r, l, o), Ut = (t, v) => {
    if (bt(t) || v > c || v < 0)
      return t ? zt(t, G) : G;
    const n = t.state;
    if (!t.output || t.avail_in !== 0 && !t.input || n.status === ht && v !== E)
      return zt(t, t.avail_out === 0 ? x : G);
    const z = n.last_flush;
    if (n.last_flush = v, n.pending !== 0) {
      if (pt(t), t.avail_out === 0)
        return n.last_flush = -1, g;
    } else if (t.avail_in === 0 && Mt(v) <= Mt(z) && v !== E)
      return zt(t, x);
    if (n.status === ht && t.avail_in !== 0)
      return zt(t, x);
    if (n.status === C && n.wrap === 0 && (n.status = nt), n.status === C) {
      let y = k + (n.w_bits - 8 << 4) << 8, Y = -1;
      if (n.strategy >= A || n.level < 2 ? Y = 0 : n.level < 6 ? Y = 1 : n.level === 6 ? Y = 2 : Y = 3, y |= Y << 6, n.strstart !== 0 && (y |= T), y += 31 - y % 31, Lt(n, y), n.strstart !== 0 && (Lt(n, t.adler >>> 16), Lt(n, t.adler & 65535)), t.adler = 1, n.status = nt, pt(t), n.pending !== 0)
        return n.last_flush = -1, g;
    }
    if (n.status === Z) {
      if (t.adler = 0, ct(n, 31), ct(n, 139), ct(n, 8), n.gzhead)
        ct(
          n,
          (n.gzhead.text ? 1 : 0) + (n.gzhead.hcrc ? 2 : 0) + (n.gzhead.extra ? 4 : 0) + (n.gzhead.name ? 8 : 0) + (n.gzhead.comment ? 16 : 0)
        ), ct(n, n.gzhead.time & 255), ct(n, n.gzhead.time >> 8 & 255), ct(n, n.gzhead.time >> 16 & 255), ct(n, n.gzhead.time >> 24 & 255), ct(n, n.level === 9 ? 2 : n.strategy >= A || n.level < 2 ? 4 : 0), ct(n, n.gzhead.os & 255), n.gzhead.extra && n.gzhead.extra.length && (ct(n, n.gzhead.extra.length & 255), ct(n, n.gzhead.extra.length >> 8 & 255)), n.gzhead.hcrc && (t.adler = $(t.adler, n.pending_buf, n.pending, 0)), n.gzindex = 0, n.status = U;
      else if (ct(n, 0), ct(n, 0), ct(n, 0), ct(n, 0), ct(n, 0), ct(n, n.level === 9 ? 2 : n.strategy >= A || n.level < 2 ? 4 : 0), ct(n, Dt), n.status = nt, pt(t), n.pending !== 0)
        return n.last_flush = -1, g;
    }
    if (n.status === U) {
      if (n.gzhead.extra) {
        let y = n.pending, Y = (n.gzhead.extra.length & 65535) - n.gzindex;
        for (; n.pending + Y > n.pending_buf_size; ) {
          let yt = n.pending_buf_size - n.pending;
          if (n.pending_buf.set(n.gzhead.extra.subarray(n.gzindex, n.gzindex + yt), n.pending), n.pending = n.pending_buf_size, n.gzhead.hcrc && n.pending > y && (t.adler = $(t.adler, n.pending_buf, n.pending - y, y)), n.gzindex += yt, pt(t), n.pending !== 0)
            return n.last_flush = -1, g;
          y = 0, Y -= yt;
        }
        let _t = new Uint8Array(n.gzhead.extra);
        n.pending_buf.set(_t.subarray(n.gzindex, n.gzindex + Y), n.pending), n.pending += Y, n.gzhead.hcrc && n.pending > y && (t.adler = $(t.adler, n.pending_buf, n.pending - y, y)), n.gzindex = 0;
      }
      n.status = B;
    }
    if (n.status === B) {
      if (n.gzhead.name) {
        let y = n.pending, Y;
        do {
          if (n.pending === n.pending_buf_size) {
            if (n.gzhead.hcrc && n.pending > y && (t.adler = $(t.adler, n.pending_buf, n.pending - y, y)), pt(t), n.pending !== 0)
              return n.last_flush = -1, g;
            y = 0;
          }
          n.gzindex < n.gzhead.name.length ? Y = n.gzhead.name.charCodeAt(n.gzindex++) & 255 : Y = 0, ct(n, Y);
        } while (Y !== 0);
        n.gzhead.hcrc && n.pending > y && (t.adler = $(t.adler, n.pending_buf, n.pending - y, y)), n.gzindex = 0;
      }
      n.status = m;
    }
    if (n.status === m) {
      if (n.gzhead.comment) {
        let y = n.pending, Y;
        do {
          if (n.pending === n.pending_buf_size) {
            if (n.gzhead.hcrc && n.pending > y && (t.adler = $(t.adler, n.pending_buf, n.pending - y, y)), pt(t), n.pending !== 0)
              return n.last_flush = -1, g;
            y = 0;
          }
          n.gzindex < n.gzhead.comment.length ? Y = n.gzhead.comment.charCodeAt(n.gzindex++) & 255 : Y = 0, ct(n, Y);
        } while (Y !== 0);
        n.gzhead.hcrc && n.pending > y && (t.adler = $(t.adler, n.pending_buf, n.pending - y, y));
      }
      n.status = dt;
    }
    if (n.status === dt) {
      if (n.gzhead.hcrc) {
        if (n.pending + 2 > n.pending_buf_size && (pt(t), n.pending !== 0))
          return n.last_flush = -1, g;
        ct(n, t.adler & 255), ct(n, t.adler >> 8 & 255), t.adler = 0;
      }
      if (n.status = nt, pt(t), n.pending !== 0)
        return n.last_flush = -1, g;
    }
    if (t.avail_in !== 0 || n.lookahead !== 0 || v !== rt && n.status !== ht) {
      let y = n.level === 0 ? I(n, v) : n.strategy === A ? V(n, v) : n.strategy === M ? j(n, v) : lt[n.level].func(n, v);
      if ((y === mt || y === gt) && (n.status = ht), y === at || y === mt)
        return t.avail_out === 0 && (n.last_flush = -1), g;
      if (y === vt && (v === it ? H(n) : v !== c && (J(n, 0, 0, !1), v === i && (Et(n.head), n.lookahead === 0 && (n.strstart = 0, n.block_start = 0, n.insert = 0))), pt(t), t.avail_out === 0))
        return n.last_flush = -1, g;
    }
    return v !== E ? g : n.wrap <= 0 ? O : (n.wrap === 2 ? (ct(n, t.adler & 255), ct(n, t.adler >> 8 & 255), ct(n, t.adler >> 16 & 255), ct(n, t.adler >> 24 & 255), ct(n, t.total_in & 255), ct(n, t.total_in >> 8 & 255), ct(n, t.total_in >> 16 & 255), ct(n, t.total_in >> 24 & 255)) : (Lt(n, t.adler >>> 16), Lt(n, t.adler & 65535)), pt(t), n.wrap > 0 && (n.wrap = -n.wrap), n.pending !== 0 ? g : O);
  }, st = (t) => {
    if (bt(t))
      return G;
    const v = t.state.status;
    return t.state = null, v === nt ? zt(t, K) : g;
  }, Ct = (t, v) => {
    let n = v.length;
    if (bt(t))
      return G;
    const z = t.state, y = z.wrap;
    if (y === 2 || y === 1 && z.status !== C || z.lookahead)
      return G;
    if (y === 1 && (t.adler = F(t.adler, v, n, 0)), z.wrap = 0, n >= z.w_size) {
      y === 0 && (Et(z.head), z.strstart = 0, z.block_start = 0, z.insert = 0);
      let tt = new Uint8Array(z.w_size);
      tt.set(v.subarray(n - z.w_size, n), 0), v = tt, n = z.w_size;
    }
    const Y = t.avail_in, _t = t.next_in, yt = t.input;
    for (t.avail_in = n, t.next_in = 0, t.input = v, e(z); z.lookahead >= u; ) {
      let tt = z.strstart, wt = z.lookahead - (u - 1);
      do
        Zt(z, tt), tt++;
      while (--wt);
      z.strstart = tt, z.lookahead = u - 1, e(z);
    }
    return z.strstart += z.lookahead, z.block_start = z.strstart, z.insert = z.lookahead, z.lookahead = 0, z.match_length = z.prev_length = u - 1, z.match_available = 0, t.next_in = _t, t.input = yt, t.avail_in = Y, z.wrap = y, g;
  };
  return Bt.deflateInit = It, Bt.deflateInit2 = Tt, Bt.deflateReset = ft, Bt.deflateResetKeep = At, Bt.deflateSetHeader = Rt, Bt.deflate = Ut, Bt.deflateEnd = st, Bt.deflateSetDictionary = Ct, Bt.deflateInfo = "pako deflate (from Nodeca project)", Bt;
}
var ae = {}, ze;
function De() {
  if (ze) return ae;
  ze = 1;
  const P = (J, ot) => Object.prototype.hasOwnProperty.call(J, ot);
  return ae.assign = function(J) {
    const ot = Array.prototype.slice.call(arguments, 1);
    for (; ot.length; ) {
      const L = ot.shift();
      if (L) {
        if (typeof L != "object")
          throw new TypeError(L + "must be non-object");
        for (const H in L)
          P(L, H) && (J[H] = L[H]);
      }
    }
    return J;
  }, ae.flattenChunks = (J) => {
    let ot = 0;
    for (let H = 0, F = J.length; H < F; H++)
      ot += J[H].length;
    const L = new Uint8Array(ot);
    for (let H = 0, F = 0, $ = J.length; H < $; H++) {
      let et = J[H];
      L.set(et, F), F += et.length;
    }
    return L;
  }, ae;
}
var ee = {}, Ee;
function Me() {
  if (Ee) return ee;
  Ee = 1;
  let P = !0;
  try {
    String.fromCharCode.apply(null, new Uint8Array(1));
  } catch {
    P = !1;
  }
  const J = new Uint8Array(256);
  for (let L = 0; L < 256; L++)
    J[L] = L >= 252 ? 6 : L >= 248 ? 5 : L >= 240 ? 4 : L >= 224 ? 3 : L >= 192 ? 2 : 1;
  J[254] = J[255] = 1, ee.string2buf = (L) => {
    if (typeof TextEncoder == "function" && TextEncoder.prototype.encode)
      return new TextEncoder().encode(L);
    let H, F, $, et, rt, it = L.length, i = 0;
    for (et = 0; et < it; et++)
      F = L.charCodeAt(et), (F & 64512) === 55296 && et + 1 < it && ($ = L.charCodeAt(et + 1), ($ & 64512) === 56320 && (F = 65536 + (F - 55296 << 10) + ($ - 56320), et++)), i += F < 128 ? 1 : F < 2048 ? 2 : F < 65536 ? 3 : 4;
    for (H = new Uint8Array(i), rt = 0, et = 0; rt < i; et++)
      F = L.charCodeAt(et), (F & 64512) === 55296 && et + 1 < it && ($ = L.charCodeAt(et + 1), ($ & 64512) === 56320 && (F = 65536 + (F - 55296 << 10) + ($ - 56320), et++)), F < 128 ? H[rt++] = F : F < 2048 ? (H[rt++] = 192 | F >>> 6, H[rt++] = 128 | F & 63) : F < 65536 ? (H[rt++] = 224 | F >>> 12, H[rt++] = 128 | F >>> 6 & 63, H[rt++] = 128 | F & 63) : (H[rt++] = 240 | F >>> 18, H[rt++] = 128 | F >>> 12 & 63, H[rt++] = 128 | F >>> 6 & 63, H[rt++] = 128 | F & 63);
    return H;
  };
  const ot = (L, H) => {
    if (H < 65534 && L.subarray && P)
      return String.fromCharCode.apply(null, L.length === H ? L : L.subarray(0, H));
    let F = "";
    for (let $ = 0; $ < H; $++)
      F += String.fromCharCode(L[$]);
    return F;
  };
  return ee.buf2string = (L, H) => {
    const F = H || L.length;
    if (typeof TextDecoder == "function" && TextDecoder.prototype.decode)
      return new TextDecoder().decode(L.subarray(0, H));
    let $, et;
    const rt = new Array(F * 2);
    for (et = 0, $ = 0; $ < F; ) {
      let it = L[$++];
      if (it < 128) {
        rt[et++] = it;
        continue;
      }
      let i = J[it];
      if (i > 4) {
        rt[et++] = 65533, $ += i - 1;
        continue;
      }
      for (it &= i === 2 ? 31 : i === 3 ? 15 : 7; i > 1 && $ < F; )
        it = it << 6 | L[$++] & 63, i--;
      if (i > 1) {
        rt[et++] = 65533;
        continue;
      }
      it < 65536 ? rt[et++] = it : (it -= 65536, rt[et++] = 55296 | it >> 10 & 1023, rt[et++] = 56320 | it & 1023);
    }
    return ot(rt, et);
  }, ee.utf8border = (L, H) => {
    H = H || L.length, H > L.length && (H = L.length);
    let F = H - 1;
    for (; F >= 0 && (L[F] & 192) === 128; )
      F--;
    return F < 0 || F === 0 ? H : F + J[L[F]] > H ? F : H;
  }, ee;
}
var _e, Ae;
function Fe() {
  if (Ae) return _e;
  Ae = 1;
  function P() {
    this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
  }
  return _e = P, _e;
}
var ke;
function Ce() {
  if (ke) return Xt;
  ke = 1;
  const P = Le(), J = De(), ot = Me(), L = Ue(), H = Fe(), F = Object.prototype.toString, {
    Z_NO_FLUSH: $,
    Z_SYNC_FLUSH: et,
    Z_FULL_FLUSH: rt,
    Z_FINISH: it,
    Z_OK: i,
    Z_STREAM_END: E,
    Z_DEFAULT_COMPRESSION: c,
    Z_DEFAULT_STRATEGY: g,
    Z_DEFLATED: O
  } = he(), G = {
    level: c,
    method: O,
    chunkSize: 16384,
    windowBits: 15,
    memLevel: 8,
    strategy: g,
    legacyHash: !0
  };
  function K(A) {
    this.options = J.assign({}, G, A || {});
    let M = this.options;
    M.raw && M.windowBits > 0 ? M.windowBits = -M.windowBits : M.gzip && M.windowBits > 0 && M.windowBits < 16 && (M.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new H(), this.strm.avail_out = 0;
    let h = P.deflateInit2(
      this.strm,
      M.level,
      M.method,
      M.windowBits,
      M.memLevel,
      M.strategy,
      M.legacyHash
    );
    if (h !== i)
      throw new Error(L[h]);
    if (M.header && P.deflateSetHeader(this.strm, M.header), M.dictionary) {
      let o;
      if (typeof M.dictionary == "string" ? o = ot.string2buf(M.dictionary) : F.call(M.dictionary) === "[object ArrayBuffer]" ? o = new Uint8Array(M.dictionary) : o = M.dictionary, h = P.deflateSetDictionary(this.strm, o), h !== i)
        throw new Error(L[h]);
      this._dict_set = !0;
    }
  }
  K.prototype.push = function(A, M) {
    const h = this.strm, o = this.options.chunkSize;
    let R, k;
    if (this.ended)
      return !1;
    for (M === ~~M ? k = M : k = M === !0 ? it : $, typeof A == "string" ? h.input = ot.string2buf(A) : F.call(A) === "[object ArrayBuffer]" ? h.input = new Uint8Array(A) : h.input = A, h.next_in = 0, h.avail_in = h.input.length; ; ) {
      if (h.avail_out === 0 && (h.output = new Uint8Array(o), h.next_out = 0, h.avail_out = o), (k === et || k === rt) && h.avail_out <= 6) {
        this.onData(h.output.subarray(0, h.next_out)), h.avail_out = 0;
        continue;
      }
      if (R = P.deflate(h, k), R === E)
        return h.next_out > 0 && this.onData(h.output.subarray(0, h.next_out)), R = P.deflateEnd(this.strm), this.onEnd(R), this.ended = !0, R === i;
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
  function x(A, M) {
    const h = new K(M);
    if (h.push(A, !0), h.err)
      throw h.msg || L[h.err];
    return h.result;
  }
  function W(A, M) {
    return M = M || {}, M.raw = !0, x(A, M);
  }
  function Q(A, M) {
    return M = M || {}, M.gzip = !0, x(A, M);
  }
  return Xt.Deflate = K, Xt.deflate = x, Xt.deflateRaw = W, Xt.gzip = Q, Xt.constants = he(), Xt;
}
var He = Ce(), Se = { deflate: He.deflate }, Ht = (function() {
  var P = { nextZero: function(i, E) {
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
    for (var g = "", O = 0; O < c; O++) g += String.fromCharCode(i[E + O]);
    return g;
  }, writeASCII: function(i, E, c) {
    for (var g = 0; g < c.length; g++) i[E + g] = c.charCodeAt(g);
  }, readBytes: function(i, E, c) {
    for (var g = [], O = 0; O < c; O++) g.push(i[E + O]);
    return g;
  }, pad: function(i) {
    return i.length < 2 ? "0" + i : i;
  }, readUTF8: function(i, E, c) {
    for (var g, O = "", G = 0; G < c; G++) O += "%" + P.pad(i[E + G].toString(16));
    try {
      g = decodeURIComponent(O);
    } catch {
      return P.readASCII(i, E, c);
    }
    return g;
  } };
  function J(i, E, c, g) {
    var O = E * c, G = F(g), K = Math.ceil(E * G / 8), x = new Uint8Array(4 * O), W = new Uint32Array(x.buffer), Q = g.ctype, A = g.depth, M = P.readUshort;
    if (Q == 6) {
      var h = O << 2;
      if (A == 8) for (var o = 0; o < h; o += 4) x[o] = i[o], x[o + 1] = i[o + 1], x[o + 2] = i[o + 2], x[o + 3] = i[o + 3];
      if (A == 16) for (o = 0; o < h; o++) x[o] = i[o << 1];
    } else if (Q == 2) {
      var R = g.tabs.tRNS;
      if (R == null) {
        if (A == 8) for (o = 0; o < O; o++) {
          var k = 3 * o;
          W[o] = 255 << 24 | i[k + 2] << 16 | i[k + 1] << 8 | i[k];
        }
        if (A == 16) for (o = 0; o < O; o++)
          k = 6 * o, W[o] = 255 << 24 | i[k + 4] << 16 | i[k + 2] << 8 | i[k];
      } else {
        var X = R[0], r = R[1], l = R[2];
        if (A == 8) for (o = 0; o < O; o++) {
          var _ = o << 2;
          k = 3 * o, W[o] = 255 << 24 | i[k + 2] << 16 | i[k + 1] << 8 | i[k], i[k] == X && i[k + 1] == r && i[k + 2] == l && (x[_ + 3] = 0);
        }
        if (A == 16) for (o = 0; o < O; o++)
          _ = o << 2, k = 6 * o, W[o] = 255 << 24 | i[k + 4] << 16 | i[k + 2] << 8 | i[k], M(i, k) == X && M(i, k + 2) == r && M(i, k + 4) == l && (x[_ + 3] = 0);
      }
    } else if (Q == 3) {
      var f = g.tabs.PLTE, s = g.tabs.tRNS, p = s ? s.length : 0;
      if (A == 1) for (var b = 0; b < c; b++) {
        var w = b * K, a = b * E;
        for (o = 0; o < E; o++) {
          _ = a + o << 2;
          var u = 3 * (d = i[w + (o >> 3)] >> 7 - (7 & o) & 1);
          x[_] = f[u], x[_ + 1] = f[u + 1], x[_ + 2] = f[u + 2], x[_ + 3] = d < p ? s[d] : 255;
        }
      }
      if (A == 2) for (b = 0; b < c; b++) for (w = b * K, a = b * E, o = 0; o < E; o++)
        _ = a + o << 2, u = 3 * (d = i[w + (o >> 2)] >> 6 - ((3 & o) << 1) & 3), x[_] = f[u], x[_ + 1] = f[u + 1], x[_ + 2] = f[u + 2], x[_ + 3] = d < p ? s[d] : 255;
      if (A == 4) for (b = 0; b < c; b++) for (w = b * K, a = b * E, o = 0; o < E; o++)
        _ = a + o << 2, u = 3 * (d = i[w + (o >> 1)] >> 4 - ((1 & o) << 2) & 15), x[_] = f[u], x[_ + 1] = f[u + 1], x[_ + 2] = f[u + 2], x[_ + 3] = d < p ? s[d] : 255;
      if (A == 8) for (o = 0; o < O; o++) {
        var d;
        _ = o << 2, u = 3 * (d = i[o]), x[_] = f[u], x[_ + 1] = f[u + 1], x[_ + 2] = f[u + 2], x[_ + 3] = d < p ? s[d] : 255;
      }
    } else if (Q == 4) {
      if (A == 8) for (o = 0; o < O; o++) {
        _ = o << 2;
        var S = i[T = o << 1];
        x[_] = S, x[_ + 1] = S, x[_ + 2] = S, x[_ + 3] = i[T + 1];
      }
      if (A == 16) for (o = 0; o < O; o++) {
        var T;
        _ = o << 2, S = i[T = o << 2], x[_] = S, x[_ + 1] = S, x[_ + 2] = S, x[_ + 3] = i[T + 2];
      }
    } else if (Q == 0) for (X = g.tabs.tRNS ? g.tabs.tRNS : -1, b = 0; b < c; b++) {
      var C = b * K, Z = b * E;
      if (A == 1) for (var U = 0; U < E; U++) {
        var B = (S = 255 * (i[C + (U >>> 3)] >>> 7 - (7 & U) & 1)) == 255 * X ? 0 : 255;
        W[Z + U] = B << 24 | S << 16 | S << 8 | S;
      }
      else if (A == 2) for (U = 0; U < E; U++)
        B = (S = 85 * (i[C + (U >>> 2)] >>> 6 - ((3 & U) << 1) & 3)) == 85 * X ? 0 : 255, W[Z + U] = B << 24 | S << 16 | S << 8 | S;
      else if (A == 4) for (U = 0; U < E; U++)
        B = (S = 17 * (i[C + (U >>> 1)] >>> 4 - ((1 & U) << 2) & 15)) == 17 * X ? 0 : 255, W[Z + U] = B << 24 | S << 16 | S << 8 | S;
      else if (A == 8) for (U = 0; U < E; U++)
        B = (S = i[C + U]) == X ? 0 : 255, W[Z + U] = B << 24 | S << 16 | S << 8 | S;
      else if (A == 16) for (U = 0; U < E; U++)
        S = i[C + (U << 1)], B = M(i, C + (U << 1)) == X ? 0 : 255, W[Z + U] = B << 24 | S << 16 | S << 8 | S;
    }
    return x;
  }
  function ot(i, E, c, g) {
    var O = F(i), G = Math.ceil(c * O / 8), K = new Uint8Array((G + 1 + i.interlace) * g);
    return E = i.tabs.CgBI ? H(E, K) : L(E, K), i.interlace == 0 ? E = $(E, i, 0, c, g) : i.interlace == 1 && (E = (function(x, W) {
      for (var Q = W.width, A = W.height, M = F(W), h = M >> 3, o = Math.ceil(Q * M / 8), R = new Uint8Array(A * o), k = 0, X = [0, 0, 4, 0, 2, 0, 1], r = [0, 4, 0, 2, 0, 1, 0], l = [8, 8, 8, 4, 4, 2, 2], _ = [8, 8, 4, 4, 2, 2, 1], f = 0; f < 7; ) {
        for (var s = l[f], p = _[f], b = 0, w = 0, a = X[f]; a < A; ) a += s, w++;
        for (var u = r[f]; u < Q; ) u += p, b++;
        var d = Math.ceil(b * M / 8);
        $(x, W, k, b, w);
        for (var S = 0, T = X[f]; T < A; ) {
          for (var C = r[f], Z = k + S * d << 3; C < Q; ) {
            var U;
            if (M == 1 && (U = (U = x[Z >> 3]) >> 7 - (7 & Z) & 1, R[T * o + (C >> 3)] |= U << 7 - (7 & C)), M == 2 && (U = (U = x[Z >> 3]) >> 6 - (7 & Z) & 3, R[T * o + (C >> 2)] |= U << 6 - ((3 & C) << 1)), M == 4 && (U = (U = x[Z >> 3]) >> 4 - (7 & Z) & 15, R[T * o + (C >> 1)] |= U << 4 - ((1 & C) << 2)), M >= 8) for (var B = T * o + C * h, m = 0; m < h; m++) R[B + m] = x[(Z >> 3) + m];
            Z += M, C += p;
          }
          S++, T += s;
        }
        b * w != 0 && (k += w * (1 + d)), f += 1;
      }
      return R;
    })(E, i)), E;
  }
  function L(i, E) {
    return H(new Uint8Array(i.buffer, 2, i.length - 6), E);
  }
  var H = (function() {
    var i, E, c = (i = Uint16Array, E = Uint32Array, { m: new i(16), v: new i(16), d: [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], o: [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 999, 999, 999], z: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0], B: new i(32), p: [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 65535, 65535], w: [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0], h: new E(32), g: new i(512), s: [], A: new i(32), t: [], k: new i(32768), c: [], a: [], n: new i(32768), e: [], C: new i(512), b: [], i: new i(32768), r: new E(286), f: new E(30), l: new E(19), u: new E(15e3), q: new i(65536), j: new i(32768) });
    function g(h, o) {
      for (var R, k, X, r, l = h.length, _ = c.v, f = 0; f <= o; f++) _[f] = 0;
      for (f = 1; f < l; f += 2) _[h[f]]++;
      var s = c.m;
      for (R = 0, _[0] = 0, k = 1; k <= o; k++) R = R + _[k - 1] << 1, s[k] = R;
      for (X = 0; X < l; X += 2) (r = h[X + 1]) != 0 && (h[X] = s[r], s[r]++);
    }
    function O(h, o, R) {
      for (var k = h.length, X = c.i, r = 0; r < k; r += 2) if (h[r + 1] != 0) for (var l = r >> 1, _ = h[r + 1], f = l << 4 | _, s = o - _, p = h[r] << s, b = p + (1 << s); p != b; )
        R[X[p] >>> 15 - o] = f, p++;
    }
    function G(h, o) {
      for (var R = c.i, k = 15 - o, X = 0; X < h.length; X += 2) {
        var r = h[X] << o - h[X + 1];
        h[X] = R[r] >>> k;
      }
    }
    function K(h, o, R) {
      return (h[o >>> 3] | h[1 + (o >>> 3)] << 8) >>> (7 & o) & (1 << R) - 1;
    }
    function x(h, o, R) {
      return (h[o >>> 3] | h[1 + (o >>> 3)] << 8 | h[2 + (o >>> 3)] << 16) >>> (7 & o) & (1 << R) - 1;
    }
    function W(h, o) {
      return (h[o >>> 3] | h[1 + (o >>> 3)] << 8 | h[2 + (o >>> 3)] << 16) >>> (7 & o);
    }
    function Q(h, o) {
      var R = h.length;
      if (o <= R) return h;
      var k = new Uint8Array(Math.max(R << 1, o));
      return k.set(h, 0), k;
    }
    function A(h, o, R, k, X, r) {
      for (var l = 0; l < R; ) {
        var _ = h[W(k, X) & o];
        X += 15 & _;
        var f = _ >>> 4;
        if (f <= 15) r[l] = f, l++;
        else {
          var s = 0, p = 0;
          f == 16 ? (p = 3 + K(k, X, 2), X += 2, s = r[l - 1]) : f == 17 ? (p = 3 + K(k, X, 3), X += 3) : f == 18 && (p = 11 + K(k, X, 7), X += 7);
          for (var b = l + p; l < b; ) r[l] = s, l++;
        }
      }
      return X;
    }
    function M(h, o, R, k) {
      for (var X = 0, r = 0, l = k.length >>> 1; r < R; ) {
        var _ = h[r + o];
        k[r << 1] = 0, k[1 + (r << 1)] = _, _ > X && (X = _), r++;
      }
      for (; r < l; ) k[r << 1] = 0, k[1 + (r << 1)] = 0, r++;
      return X;
    }
    return (function() {
      for (var h = 0; h < 32768; h++) {
        var o = h;
        o = (4278255360 & (o = (4042322160 & (o = (3435973836 & (o = (2863311530 & o) >>> 1 | (1431655765 & o) << 1)) >>> 2 | (858993459 & o) << 2)) >>> 4 | (252645135 & o) << 4)) >>> 8 | (16711935 & o) << 8, c.i[h] = (o >>> 16 | o << 16) >>> 17;
      }
      function R(k, X, r) {
        for (; X-- != 0; ) k.push(0, r);
      }
      for (h = 0; h < 32; h++) c.B[h] = c.o[h] << 3 | c.z[h], c.h[h] = c.p[h] << 4 | c.w[h];
      R(c.s, 144, 8), R(c.s, 112, 9), R(c.s, 24, 7), R(c.s, 8, 8), g(c.s, 9), O(c.s, 9, c.g), G(c.s, 9), R(c.t, 32, 5), g(c.t, 5), O(c.t, 5, c.A), G(c.t, 5), R(c.b, 19, 0), R(c.c, 286, 0), R(c.e, 30, 0), R(c.a, 320, 0);
    })(), function(h, o) {
      var R, k, X = Uint8Array, r = 0, l = 0, _ = 0, f = 0, s = 0, p = 0, b = 0, w = 0, a = 0;
      if (h[0] == 3 && h[1] == 0) return o || new X(0);
      var u = o == null;
      for (u && (o = new X(h.length >>> 2 << 3)); r == 0; ) if (r = x(h, a, 1), l = x(h, a + 1, 2), a += 3, l != 0) {
        if (u && (o = Q(o, w + (1 << 17))), l == 1 && (R = c.g, k = c.A, p = 511, b = 31), l == 2) {
          _ = K(h, a, 5) + 257, f = K(h, a + 5, 5) + 1, s = K(h, a + 10, 4) + 4, a += 14;
          for (var d = 1, S = 0; S < 38; S += 2) c.b[S] = 0, c.b[S + 1] = 0;
          for (S = 0; S < s; S++) {
            var T = K(h, a + 3 * S, 3);
            c.b[1 + (c.d[S] << 1)] = T, T > d && (d = T);
          }
          a += 3 * s, g(c.b, d), O(c.b, d, c.C), R = c.k, k = c.n, a = A(c.C, (1 << d) - 1, _ + f, h, a, c.a);
          var C = M(c.a, 0, _, c.c);
          p = (1 << C) - 1;
          var Z = M(c.a, _, f, c.e);
          b = (1 << Z) - 1, g(c.c, C), O(c.c, C, R), g(c.e, Z), O(c.e, Z, k);
        }
        for (; ; ) {
          var U = R[W(h, a) & p];
          a += 15 & U;
          var B = U >>> 4;
          if (!(B >>> 8)) o[w++] = B;
          else {
            if (B == 256) break;
            var m = w + B - 254;
            if (B > 264) {
              var dt = c.B[B - 257];
              m = w + (dt >>> 3) + K(h, a, 7 & dt), a += 7 & dt;
            }
            var nt = k[W(h, a) & b];
            a += 15 & nt;
            var ht = nt >>> 4, at = c.h[ht], vt = (at >>> 4) + x(h, a, 15 & at);
            for (a += 15 & at, u && (o = Q(o, w + (1 << 17))); w < m; ) o[w] = o[w++ - vt], o[w] = o[w++ - vt], o[w] = o[w++ - vt], o[w] = o[w++ - vt];
            w = m;
          }
        }
      } else {
        7 & a && (a += 8 - (7 & a));
        var mt = 4 + (a >>> 3), gt = h[mt - 4] | h[mt - 3] << 8;
        u && (o = Q(o, w + gt)), o.set(new X(h.buffer, h.byteOffset + mt, gt), w), a = mt + gt << 3, w += gt;
      }
      return o.length == w ? o : o.slice(0, w);
    };
  })();
  function F(i) {
    return [1, null, 3, 1, 2, null, 4][i.ctype] * i.depth;
  }
  function $(i, E, c, g, O) {
    var G = F(E), K = Math.ceil(g * G / 8);
    G = Math.ceil(G / 8);
    var x, W, Q = i[c], A = 0;
    if (Q > 1 && (i[c] = [0, 0, 1][Q - 2]), Q == 3) for (A = G; A < K; A++) i[A + 1] = i[A + 1] + (i[A + 1 - G] >>> 1) & 255;
    for (var M = 0; M < O; M++) if (A = 0, (Q = i[(W = (x = c + M * K) + M + 1) - 1]) == 0) for (; A < K; A++) i[x + A] = i[W + A];
    else if (Q == 1) {
      for (; A < G; A++) i[x + A] = i[W + A];
      for (; A < K; A++) i[x + A] = i[W + A] + i[x + A - G];
    } else if (Q == 2) for (; A < K; A++) i[x + A] = i[W + A] + i[x + A - K];
    else if (Q == 3) {
      for (; A < G; A++) i[x + A] = i[W + A] + (i[x + A - K] >>> 1);
      for (; A < K; A++) i[x + A] = i[W + A] + (i[x + A - K] + i[x + A - G] >>> 1);
    } else {
      for (; A < G; A++) i[x + A] = i[W + A] + et(0, i[x + A - K], 0);
      for (; A < K; A++) i[x + A] = i[W + A] + et(i[x + A - G], i[x + A - K], i[x + A - G - K]);
    }
    return i;
  }
  function et(i, E, c) {
    var g = i + E - c, O = g - i, G = g - E, K = g - c;
    return O * O <= G * G && O * O <= K * K ? i : G * G <= K * K ? E : c;
  }
  function rt(i, E, c) {
    c.width = P.readUint(i, E), E += 4, c.height = P.readUint(i, E), E += 4, c.depth = i[E], E++, c.ctype = i[E], E++, c.compress = i[E], E++, c.filter = i[E], E++, c.interlace = i[E], E++;
  }
  function it(i, E, c, g, O, G, K, x, W) {
    for (var Q = Math.min(E, O), A = Math.min(c, G), M = 0, h = 0, o = 0; o < A; o++) for (var R = 0; R < Q; R++) if (K >= 0 && x >= 0 ? (M = o * E + R << 2, h = (x + o) * O + K + R << 2) : (M = (-x + o) * E - K + R << 2, h = o * O + R << 2), W == 0) g[h] = i[M], g[h + 1] = i[M + 1], g[h + 2] = i[M + 2], g[h + 3] = i[M + 3];
    else if (W == 1) {
      var k = i[M + 3] * 0.00392156862745098, X = i[M] * k, r = i[M + 1] * k, l = i[M + 2] * k, _ = g[h + 3] * (1 / 255), f = g[h] * _, s = g[h + 1] * _, p = g[h + 2] * _, b = 1 - k, w = k + _ * b, a = w == 0 ? 0 : 1 / w;
      g[h + 3] = 255 * w, g[h + 0] = (X + f * b) * a, g[h + 1] = (r + s * b) * a, g[h + 2] = (l + p * b) * a;
    } else if (W == 2)
      k = i[M + 3], X = i[M], r = i[M + 1], l = i[M + 2], _ = g[h + 3], f = g[h], s = g[h + 1], p = g[h + 2], k == _ && X == f && r == s && l == p ? (g[h] = 0, g[h + 1] = 0, g[h + 2] = 0, g[h + 3] = 0) : (g[h] = X, g[h + 1] = r, g[h + 2] = l, g[h + 3] = k);
    else if (W == 3) {
      if (k = i[M + 3], X = i[M], r = i[M + 1], l = i[M + 2], _ = g[h + 3], f = g[h], s = g[h + 1], p = g[h + 2], k == _ && X == f && r == s && l == p) continue;
      if (k < 220 && _ > 20) return !1;
    }
    return !0;
  }
  return { decode: function(i) {
    for (var E, c = new Uint8Array(i), g = 8, O = P, G = O.readUshort, K = O.readUint, x = { tabs: {}, frames: [] }, W = new Uint8Array(c.length), Q = 0, A = 0, M = [137, 80, 78, 71, 13, 10, 26, 10], h = 0; h < 8; h++) if (c[h] != M[h]) throw "The input is not a PNG file!";
    for (; g < c.length; ) {
      var o = O.readUint(c, g);
      g += 4;
      var R = O.readASCII(c, g, 4);
      if (g += 4, R == "IHDR") rt(c, g, x);
      else if (R == "iCCP") {
        for (var k = g; c[k] != 0; ) k++;
        O.readASCII(c, g, k - g), c[k + 1];
        var X = c.slice(k + 2, g + o), r = null;
        try {
          r = L(X);
        } catch {
          r = H(X);
        }
        x.tabs[R] = r;
      } else if (R == "CgBI") x.tabs[R] = c.slice(g, g + 4);
      else if (R == "IDAT") {
        for (h = 0; h < o; h++) W[Q + h] = c[g + h];
        Q += o;
      } else if (R == "acTL") x.tabs[R] = { num_frames: K(c, g), num_plays: K(c, g + 4) }, E = new Uint8Array(c.length);
      else if (R == "fcTL") {
        var l;
        A != 0 && ((l = x.frames[x.frames.length - 1]).data = ot(x, E.slice(0, A), l.rect.width, l.rect.height), A = 0);
        var _ = { x: K(c, g + 12), y: K(c, g + 16), width: K(c, g + 4), height: K(c, g + 8) }, f = G(c, g + 22);
        f = G(c, g + 20) / (f == 0 ? 100 : f);
        var s = { rect: _, delay: Math.round(1e3 * f), dispose: c[g + 24], blend: c[g + 25] };
        x.frames.push(s);
      } else if (R == "fdAT") {
        for (h = 0; h < o - 4; h++) E[A + h] = c[g + h + 4];
        A += o - 4;
      } else if (R == "pHYs") x.tabs[R] = [O.readUint(c, g), O.readUint(c, g + 4), c[g + 8]];
      else if (R == "cHRM")
        for (x.tabs[R] = [], h = 0; h < 8; h++) x.tabs[R].push(O.readUint(c, g + 4 * h));
      else if (R == "tEXt" || R == "zTXt") {
        x.tabs[R] == null && (x.tabs[R] = {});
        var p = O.nextZero(c, g), b = O.readASCII(c, g, p - g), w = g + o - p - 1;
        if (R == "tEXt") d = O.readASCII(c, p + 1, w);
        else {
          var a = L(c.slice(p + 2, p + 2 + w));
          d = O.readUTF8(a, 0, a.length);
        }
        x.tabs[R][b] = d;
      } else if (R == "iTXt") {
        x.tabs[R] == null && (x.tabs[R] = {}), p = 0, k = g, p = O.nextZero(c, k), b = O.readASCII(c, k, p - k);
        var u = c[k = p + 1];
        c[k + 1], k += 2, p = O.nextZero(c, k), O.readASCII(c, k, p - k), k = p + 1, p = O.nextZero(c, k), O.readUTF8(c, k, p - k);
        var d;
        w = o - ((k = p + 1) - g), u == 0 ? d = O.readUTF8(c, k, w) : (a = L(c.slice(k, k + w)), d = O.readUTF8(a, 0, a.length)), x.tabs[R][b] = d;
      } else if (R == "PLTE") x.tabs[R] = O.readBytes(c, g, o);
      else if (R == "hIST") {
        var S = x.tabs.PLTE.length / 3;
        for (x.tabs[R] = [], h = 0; h < S; h++) x.tabs[R].push(G(c, g + 2 * h));
      } else if (R == "tRNS") x.ctype == 3 ? x.tabs[R] = O.readBytes(c, g, o) : x.ctype == 0 ? x.tabs[R] = G(c, g) : x.ctype == 2 && (x.tabs[R] = [G(c, g), G(c, g + 2), G(c, g + 4)]);
      else if (R == "gAMA") x.tabs[R] = O.readUint(c, g) / 1e5;
      else if (R == "sRGB") x.tabs[R] = c[g];
      else if (R == "bKGD") x.ctype == 0 || x.ctype == 4 ? x.tabs[R] = [G(c, g)] : x.ctype == 2 || x.ctype == 6 ? x.tabs[R] = [G(c, g), G(c, g + 2), G(c, g + 4)] : x.ctype == 3 && (x.tabs[R] = c[g]);
      else if (R == "IEND") break;
      g += o, O.readUint(c, g), g += 4;
    }
    return A != 0 && ((l = x.frames[x.frames.length - 1]).data = ot(x, E.slice(0, A), l.rect.width, l.rect.height)), x.data = ot(x, W, x.width, x.height), delete x.compress, delete x.interlace, delete x.filter, x;
  }, toRGBA8: function(i) {
    var E = i.width, c = i.height;
    if (i.tabs.acTL == null) return [J(i.data, E, c, i).buffer];
    var g = [];
    i.frames[0].data == null && (i.frames[0].data = i.data);
    for (var O = E * c * 4, G = new Uint8Array(O), K = new Uint8Array(O), x = new Uint8Array(O), W = 0; W < i.frames.length; W++) {
      var Q = i.frames[W], A = Q.rect.x, M = Q.rect.y, h = Q.rect.width, o = Q.rect.height, R = J(Q.data, h, o, i);
      if (W != 0) for (var k = 0; k < O; k++) x[k] = G[k];
      if (Q.blend == 0 ? it(R, h, o, G, E, c, A, M, 0) : Q.blend == 1 && it(R, h, o, G, E, c, A, M, 1), g.push(G.buffer.slice(0)), Q.dispose != 0) {
        if (Q.dispose == 1) it(K, h, o, G, E, c, A, M, 0);
        else if (Q.dispose == 2) for (k = 0; k < O; k++) G[k] = x[k];
      }
    }
    return g;
  }, _paeth: et, _copyTile: it, _bin: P };
})();
(function() {
  var P = Ht._copyTile, J = Ht._bin, ot = Ht._paeth, L = { table: (function() {
    for (var r = new Uint32Array(256), l = 0; l < 256; l++) {
      for (var _ = l, f = 0; f < 8; f++) 1 & _ ? _ = 3988292384 ^ _ >>> 1 : _ >>>= 1;
      r[l] = _;
    }
    return r;
  })(), update: function(r, l, _, f) {
    for (var s = 0; s < f; s++) r = L.table[255 & (r ^ l[_ + s])] ^ r >>> 8;
    return r;
  }, crc: function(r, l, _) {
    return 4294967295 ^ L.update(4294967295, r, l, _);
  } };
  function H(r, l, _, f) {
    l[_] += r[0] * f >> 4, l[_ + 1] += r[1] * f >> 4, l[_ + 2] += r[2] * f >> 4, l[_ + 3] += r[3] * f >> 4;
  }
  function F(r) {
    return Math.max(0, Math.min(255, r));
  }
  function $(r, l) {
    var _ = r[0] - l[0], f = r[1] - l[1], s = r[2] - l[2], p = r[3] - l[3];
    return _ * _ + f * f + s * s + p * p;
  }
  function et(r, l, _, f, s, p, b) {
    b == null && (b = 1);
    for (var w = f.length, a = [], u = 0; u < w; u++) {
      var d = f[u];
      a.push([d >>> 0 & 255, d >>> 8 & 255, d >>> 16 & 255, d >>> 24 & 255]);
    }
    for (u = 0; u < w; u++) for (var S = 4294967295, T = 0, C = 0; C < w; C++) {
      var Z = $(a[u], a[C]);
      C != u && Z < S && (S = Z, T = C);
    }
    var U = new Uint32Array(s.buffer), B = new Int16Array(l * _ * 4), m = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
    for (u = 0; u < m.length; u++) m[u] = 255 * ((m[u] + 0.5) / 16 - 0.5);
    for (var dt = 0; dt < _; dt++) for (var nt = 0; nt < l; nt++) {
      var ht;
      u = 4 * (dt * l + nt), b != 2 ? ht = [F(r[u] + B[u]), F(r[u + 1] + B[u + 1]), F(r[u + 2] + B[u + 2]), F(r[u + 3] + B[u + 3])] : (Z = m[4 * (3 & dt) + (3 & nt)], ht = [F(r[u] + Z), F(r[u + 1] + Z), F(r[u + 2] + Z), F(r[u + 3] + Z)]), T = 0;
      var at = 16777215;
      for (C = 0; C < w; C++) {
        var vt = $(ht, a[C]);
        vt < at && (at = vt, T = C);
      }
      var mt = a[T], gt = [ht[0] - mt[0], ht[1] - mt[1], ht[2] - mt[2], ht[3] - mt[3]];
      b == 1 && (nt != l - 1 && H(gt, B, u + 4, 7), dt != _ - 1 && (nt != 0 && H(gt, B, u + 4 * l - 4, 3), H(gt, B, u + 4 * l, 5), nt != l - 1 && H(gt, B, u + 4 * l + 4, 1))), p[u >> 2] = T, U[u >> 2] = f[T];
    }
  }
  function rt(r, l, _, f, s) {
    s == null && (s = {});
    var p, b = L.crc, w = J.writeUint, a = J.writeUshort, u = J.writeASCII, d = 8, S = r.frames.length > 1, T = !1, C = 33 + (S ? 20 : 0);
    if (s.sRGB != null && (C += 13), s.pHYs != null && (C += 21), s.iCCP != null && (C += 21 + (p = Se.deflate(s.iCCP)).length + 4), r.ctype == 3) {
      for (var Z = r.plte.length, U = 0; U < Z; U++) r.plte[U] >>> 24 != 255 && (T = !0);
      C += 8 + 3 * Z + 4 + (T ? 8 + 1 * Z + 4 : 0);
    }
    for (var B = 0; B < r.frames.length; B++)
      S && (C += 38), C += (zt = r.frames[B]).cimg.length + 12, B != 0 && (C += 4);
    C += 12;
    var m = new Uint8Array(C), dt = [137, 80, 78, 71, 13, 10, 26, 10];
    for (U = 0; U < 8; U++) m[U] = dt[U];
    if (w(m, d, 13), u(m, d += 4, "IHDR"), w(m, d += 4, l), w(m, d += 4, _), m[d += 4] = r.depth, m[++d] = r.ctype, m[++d] = 0, m[++d] = 0, m[++d] = 0, w(m, ++d, b(m, d - 17, 17)), d += 4, s.sRGB != null && (w(m, d, 1), u(m, d += 4, "sRGB"), m[d += 4] = s.sRGB, w(m, ++d, b(m, d - 5, 5)), d += 4), s.iCCP != null) {
      var nt = 13 + p.length;
      w(m, d, nt), u(m, d += 4, "iCCP"), u(m, d += 4, "ICC profile"), d += 11, d += 2, m.set(p, d), w(m, d += p.length, b(m, d - (nt + 4), nt + 4)), d += 4;
    }
    if (s.pHYs != null && (w(m, d, 9), u(m, d += 4, "pHYs"), w(m, d += 4, s.pHYs[0]), w(m, d += 4, s.pHYs[1]), m[d += 4] = s.pHYs[2], w(m, ++d, b(m, d - 13, 13)), d += 4), S && (w(m, d, 8), u(m, d += 4, "acTL"), w(m, d += 4, r.frames.length), w(m, d += 4, s.loop != null ? s.loop : 0), w(m, d += 4, b(m, d - 12, 12)), d += 4), r.ctype == 3) {
      for (w(m, d, 3 * (Z = r.plte.length)), u(m, d += 4, "PLTE"), d += 4, U = 0; U < Z; U++) {
        var ht = 3 * U, at = r.plte[U], vt = 255 & at, mt = at >>> 8 & 255, gt = at >>> 16 & 255;
        m[d + ht + 0] = vt, m[d + ht + 1] = mt, m[d + ht + 2] = gt;
      }
      if (w(m, d += 3 * Z, b(m, d - 3 * Z - 4, 3 * Z + 4)), d += 4, T) {
        for (w(m, d, Z), u(m, d += 4, "tRNS"), d += 4, U = 0; U < Z; U++) m[d + U] = r.plte[U] >>> 24 & 255;
        w(m, d += Z, b(m, d - Z - 4, Z + 4)), d += 4;
      }
    }
    var Dt = 0;
    for (B = 0; B < r.frames.length; B++) {
      var zt = r.frames[B];
      S && (w(m, d, 26), u(m, d += 4, "fcTL"), w(m, d += 4, Dt++), w(m, d += 4, zt.rect.width), w(m, d += 4, zt.rect.height), w(m, d += 4, zt.rect.x), w(m, d += 4, zt.rect.y), a(m, d += 4, f[B]), a(m, d += 2, 1e3), m[d += 2] = zt.dispose, m[++d] = zt.blend, w(m, ++d, b(m, d - 30, 30)), d += 4);
      var Mt = zt.cimg;
      w(m, d, (Z = Mt.length) + (B == 0 ? 0 : 4));
      var Et = d += 4;
      u(m, d, B == 0 ? "IDAT" : "fdAT"), d += 4, B != 0 && (w(m, d, Dt++), d += 4), m.set(Mt, d), w(m, d += Z, b(m, Et, d - Et)), d += 4;
    }
    return w(m, d, 0), u(m, d += 4, "IEND"), w(m, d += 4, b(m, d - 4, 4)), d += 4, m.buffer;
  }
  function it(r, l, _) {
    for (var f = 0; f < r.frames.length; f++) {
      var s = r.frames[f];
      s.rect.width;
      var p = s.rect.height, b = new Uint8Array(p * s.bpl + p);
      s.cimg = g(s.img, p, s.bpp, s.bpl, b, l, _);
    }
  }
  function i(r, l, _, f, s) {
    for (var p = s[0], b = s[1], w = s[2], a = s[3], u = s[4], d = s[5], S = 6, T = 8, C = 255, Z = 0; Z < r.length; Z++) for (var U = new Uint8Array(r[Z]), B = U.length, m = 0; m < B; m += 4) C &= U[m + 3];
    var dt = C != 255, nt = (function(bt, At, ft, Rt, Tt, It) {
      for (var Ut = [], st = 0; st < bt.length; st++) {
        var Ct, t = new Uint8Array(bt[st]), v = new Uint32Array(t.buffer), n = 0, z = 0, y = At, Y = ft, _t = Rt ? 1 : 0;
        if (st != 0) {
          for (var yt = It || Rt || st == 1 || Ut[st - 2].dispose != 0 ? 1 : 2, tt = 0, wt = 1e9, Gt = 0; Gt < yt; Gt++) {
            for (var ne = new Uint8Array(bt[st - 1 - Gt]), Jt = new Uint32Array(bt[st - 1 - Gt]), Ot = At, Nt = ft, Vt = -1, Qt = -1, Kt = 0; Kt < ft; Kt++) for (var Yt = 0; Yt < At; Yt++)
              v[te = Kt * At + Yt] != Jt[te] && (Yt < Ot && (Ot = Yt), Yt > Vt && (Vt = Yt), Kt < Nt && (Nt = Kt), Kt > Qt && (Qt = Kt));
            Vt == -1 && (Ot = Nt = Vt = Qt = 0), Tt && (1 & ~Ot || Ot--, 1 & ~Nt || Nt--);
            var ce = (Vt - Ot + 1) * (Qt - Nt + 1);
            ce < wt && (wt = ce, tt = Gt, n = Ot, z = Nt, y = Vt - Ot + 1, Y = Qt - Nt + 1);
          }
          ne = new Uint8Array(bt[st - 1 - tt]), tt == 1 && (Ut[st - 1].dispose = 2), Ct = new Uint8Array(y * Y * 4), P(ne, At, ft, Ct, y, Y, -n, -z, 0), (_t = P(t, At, ft, Ct, y, Y, -n, -z, 3) ? 1 : 0) == 1 ? c(t, At, ft, Ct, { x: n, y: z, width: y, height: Y }) : P(t, At, ft, Ct, y, Y, -n, -z, 0);
        } else Ct = t.slice(0);
        Ut.push({ rect: { x: n, y: z, width: y, height: Y }, img: Ct, blend: _t, dispose: 0 });
      }
      if (Rt) {
        for (st = 0; st < Ut.length; st++)
          if ((re = Ut[st]).blend != 1) {
            var Wt = re.rect, Pt = Ut[st - 1].rect, de = Math.min(Wt.x, Pt.x), ue = Math.min(Wt.y, Pt.y), se = { x: de, y: ue, width: Math.max(Wt.x + Wt.width, Pt.x + Pt.width) - de, height: Math.max(Wt.y + Wt.height, Pt.y + Pt.height) - ue };
            Ut[st - 1].dispose = 1, st - 1 != 0 && E(bt, At, ft, Ut, st - 1, se, Tt), E(bt, At, ft, Ut, st, se, Tt);
          }
      }
      if (bt.length != 1) for (var te = 0; te < Ut.length; te++) {
        var re;
        (re = Ut[te]).rect.width * re.rect.height;
      }
      return Ut;
    })(r, l, _, p, b, w), ht = {}, at = [], vt = [];
    if (f != 0) {
      var mt = [];
      for (m = 0; m < nt.length; m++) mt.push(nt[m].img.buffer);
      var gt = (function(bt) {
        for (var At = 0, ft = 0; ft < bt.length; ft++) At += bt[ft].byteLength;
        var Rt = new Uint8Array(At), Tt = 0;
        for (ft = 0; ft < bt.length; ft++) {
          for (var It = new Uint8Array(bt[ft]), Ut = It.length, st = 0; st < Ut; st += 4) {
            var Ct = It[st], t = It[st + 1], v = It[st + 2], n = It[st + 3];
            n == 0 && (Ct = t = v = 0), Rt[Tt + st] = Ct, Rt[Tt + st + 1] = t, Rt[Tt + st + 2] = v, Rt[Tt + st + 3] = n;
          }
          Tt += Ut;
        }
        return Rt.buffer;
      })(mt), Dt = G(gt, f);
      for (m = 0; m < Dt.plte.length; m++) at.push(Dt.plte[m].est.rgba);
      var zt = 0;
      for (m = 0; m < nt.length; m++) {
        var Mt = (kt = nt[m]).img.length, Et = new Uint8Array(Dt.inds.buffer, zt >> 2, Mt >> 2);
        vt.push(Et);
        var $t = new Uint8Array(Dt.abuf, zt, Mt);
        d && et(kt.img, kt.rect.width, kt.rect.height, at, $t, Et), kt.img.set($t), zt += Mt;
      }
    } else for (Z = 0; Z < nt.length; Z++) {
      var kt = nt[Z], Zt = new Uint32Array(kt.img.buffer), pt = kt.rect.width;
      for (B = Zt.length, Et = new Uint8Array(B), vt.push(Et), m = 0; m < B; m++) {
        var St = Zt[m];
        if (m != 0 && St == Zt[m - 1]) Et[m] = Et[m - 1];
        else if (m > pt && St == Zt[m - pt]) Et[m] = Et[m - pt];
        else {
          var ct = ht[St];
          if (ct == null && (ht[St] = ct = at.length, at.push(St), at.length >= 300)) break;
          Et[m] = ct;
        }
      }
    }
    var Lt = at.length;
    for (Lt <= 256 && u == 0 && (T = Lt <= 2 ? 1 : Lt <= 4 ? 2 : Lt <= 16 ? 4 : 8, T = Math.max(T, a)), Z = 0; Z < nt.length; Z++) {
      (kt = nt[Z]).rect.x, kt.rect.y, pt = kt.rect.width;
      var qt = kt.rect.height, Ft = kt.img;
      new Uint32Array(Ft.buffer);
      var e = 4 * pt, I = 4;
      if (Lt <= 256 && u == 0) {
        e = Math.ceil(T * pt / 8);
        for (var D = new Uint8Array(e * qt), q = vt[Z], j = 0; j < qt; j++) {
          m = j * e;
          var V = j * pt;
          if (T == 8) for (var N = 0; N < pt; N++) D[m + N] = q[V + N];
          else if (T == 4) for (N = 0; N < pt; N++) D[m + (N >> 1)] |= q[V + N] << 4 - 4 * (1 & N);
          else if (T == 2) for (N = 0; N < pt; N++) D[m + (N >> 2)] |= q[V + N] << 6 - 2 * (3 & N);
          else if (T == 1) for (N = 0; N < pt; N++) D[m + (N >> 3)] |= q[V + N] << 7 - 1 * (7 & N);
        }
        Ft = D, S = 3, I = 1;
      } else if (dt == 0 && nt.length == 1) {
        D = new Uint8Array(pt * qt * 3);
        var lt = pt * qt;
        for (m = 0; m < lt; m++) {
          var xt = 3 * m, ut = 4 * m;
          D[xt] = Ft[ut], D[xt + 1] = Ft[ut + 1], D[xt + 2] = Ft[ut + 2];
        }
        Ft = D, S = 2, I = 3, e = 3 * pt;
      }
      kt.img = Ft, kt.bpl = e, kt.bpp = I;
    }
    return { ctype: S, depth: T, plte: at, frames: nt };
  }
  function E(r, l, _, f, s, p, b) {
    for (var w = Uint8Array, a = Uint32Array, u = new w(r[s - 1]), d = new a(r[s - 1]), S = s + 1 < r.length ? new w(r[s + 1]) : null, T = new w(r[s]), C = new a(T.buffer), Z = l, U = _, B = -1, m = -1, dt = 0; dt < p.height; dt++) for (var nt = 0; nt < p.width; nt++) {
      var ht = p.x + nt, at = p.y + dt, vt = at * l + ht, mt = C[vt];
      mt == 0 || f[s - 1].dispose == 0 && d[vt] == mt && (S == null || S[4 * vt + 3] != 0) || (ht < Z && (Z = ht), ht > B && (B = ht), at < U && (U = at), at > m && (m = at));
    }
    B == -1 && (Z = U = B = m = 0), b && (1 & ~Z || Z--, 1 & ~U || U--), p = { x: Z, y: U, width: B - Z + 1, height: m - U + 1 };
    var gt = f[s];
    gt.rect = p, gt.blend = 1, gt.img = new Uint8Array(p.width * p.height * 4), f[s - 1].dispose == 0 ? (P(u, l, _, gt.img, p.width, p.height, -p.x, -p.y, 0), c(T, l, _, gt.img, p)) : P(T, l, _, gt.img, p.width, p.height, -p.x, -p.y, 0);
  }
  function c(r, l, _, f, s) {
    P(r, l, _, f, s.width, s.height, -s.x, -s.y, 2);
  }
  function g(r, l, _, f, s, p, b) {
    var w, a = [], u = [0, 1, 2, 3, 4];
    p != -1 ? u = [p] : (l * f > 5e5 || _ == 1) && (u = [0]), b && (w = { level: 0 });
    for (var d = s.length > 1e7 && window.UZIP != null ? window.UZIP : Se, S = 0; S < u.length; S++) {
      for (var T = 0; T < l; T++) O(s, r, T, f, _, u[S]);
      a.push(d.deflate(s, w));
    }
    var C, Z = 1e9;
    for (S = 0; S < a.length; S++) a[S].length < Z && (C = S, Z = a[S].length);
    return a[C];
  }
  function O(r, l, _, f, s, p) {
    var b = _ * f, w = b + _;
    if (r[w] = p, w++, p == 0) if (f < 500) for (var a = 0; a < f; a++) r[w + a] = l[b + a];
    else r.set(new Uint8Array(l.buffer, b, f), w);
    else if (p == 1) {
      for (a = 0; a < s; a++) r[w + a] = l[b + a];
      for (a = s; a < f; a++) r[w + a] = l[b + a] - l[b + a - s] + 256 & 255;
    } else if (_ == 0) {
      for (a = 0; a < s; a++) r[w + a] = l[b + a];
      if (p == 2) for (a = s; a < f; a++) r[w + a] = l[b + a];
      if (p == 3) for (a = s; a < f; a++) r[w + a] = l[b + a] - (l[b + a - s] >> 1) + 256 & 255;
      if (p == 4) for (a = s; a < f; a++) r[w + a] = l[b + a] - ot(l[b + a - s], 0, 0) + 256 & 255;
    } else {
      if (p == 2) for (a = 0; a < f; a++) r[w + a] = l[b + a] + 256 - l[b + a - f] & 255;
      if (p == 3) {
        for (a = 0; a < s; a++) r[w + a] = l[b + a] + 256 - (l[b + a - f] >> 1) & 255;
        for (a = s; a < f; a++) r[w + a] = l[b + a] + 256 - (l[b + a - f] + l[b + a - s] >> 1) & 255;
      }
      if (p == 4) {
        for (a = 0; a < s; a++) r[w + a] = l[b + a] + 256 - ot(0, l[b + a - f], 0) & 255;
        for (a = s; a < f; a++) r[w + a] = l[b + a] + 256 - ot(l[b + a - s], l[b + a - f], l[b + a - s - f]) & 255;
      }
    }
  }
  function G(r, l, _) {
    for (var f = new Uint8Array(r), s = f.slice(0), p = new Uint32Array(s.buffer), b = Q(s, l), w = b[0], a = b[1], u = a.length, d = new Uint32Array(u), S = new Uint8Array(d.buffer), T = 0; T < u; T++) d[T] = a[T].est.rgba;
    var C, Z = f.length, U = new Uint8Array(Z >> 2);
    if (u <= 60) W(f, U, S), K(U, p, d);
    else if (f.length < 32e6) for (T = 0; T < Z; T += 4)
      C = A(w, B = f[T] * (1 / 255), m = f[T + 1] * (1 / 255), dt = f[T + 2] * (1 / 255), nt = f[T + 3] * (1 / 255)), U[T >> 2] = C.ind, p[T >> 2] = C.est.rgba;
    else for (T = 0; T < Z; T += 4) {
      var B = f[T] * 0.00392156862745098, m = f[T + 1] * (1 / 255), dt = f[T + 2] * (1 / 255), nt = f[T + 3] * (1 / 255);
      for (C = w; C.left; ) C = M(C.est, B, m, dt, nt) <= 0 ? C.left : C.right;
      U[T >> 2] = C.ind, p[T >> 2] = C.est.rgba;
    }
    if (_ || f.length * u < 4e7) {
      var ht = 1e9;
      for (T = 0; T < 10; T++) {
        var at = x(f, U, S);
        if (at / ht > 0.997) break;
        ht = at;
      }
      for (T = 0; T < u; T++) a[T].est.rgba = d[T];
      K(U, p, d);
    }
    return { abuf: s.buffer, inds: U, plte: a };
  }
  function K(r, l, _) {
    for (var f = 0; f < r.length; f++) l[f] = _[r[f]];
  }
  function x(r, l, _) {
    return (function(f, s, p) {
      for (var b = p.length >>> 2, w = new Uint32Array(4 * b), a = new Uint32Array(b), u = 0; u < f.length; u += 4) {
        var d = s[u >>> 2], S = 4 * d;
        a[d]++, w[S] += f[u], w[S + 1] += f[u + 1], w[S + 2] += f[u + 2], w[S + 3] += f[u + 3];
      }
      for (u = 0; u < p.length; u++) p[u] = Math.round(w[u] / a[u >>> 2]);
    })(r, l, _), W(r, l, _);
  }
  function W(r, l, _) {
    for (var f = 0, s = _.length >>> 2, p = [], b = 0; b < s; b++) {
      for (var w = _[U = 4 * b], a = _[U + 1], u = _[U + 2], d = _[U + 3], S = 0, T = 1e9, C = 0; C < s; C++) if (b != C) {
        var Z = 4 * C;
        (ht = (B = w - _[Z]) * B + (m = a - _[Z + 1]) * m + (dt = u - _[Z + 2]) * dt + (nt = d - _[Z + 3]) * nt) < T && (T = ht, S = C);
      }
      p[b] = 0.5 * Math.sqrt(T), p[b] = p[b] * p[b];
    }
    for (b = 0; b < r.length; b += 4) {
      var U, B, m, dt, nt;
      if (w = r[b], a = r[b + 1], u = r[b + 2], d = r[b + 3], (T = (B = w - _[U = 4 * (S = l[b >>> 2])]) * B + (m = a - _[U + 1]) * m + (dt = u - _[U + 2]) * dt + (nt = d - _[U + 3]) * nt) > p[S]) for (C = 0; C < s; C++) {
        var ht;
        if ((ht = (B = w - _[U = 4 * C]) * B + (m = a - _[U + 1]) * m + (dt = u - _[U + 2]) * dt + (nt = d - _[U + 3]) * nt) < T && (S = C, (T = ht) < p[C])) break;
      }
      l[b >>> 2] = S, f += T;
    }
    return f / (r.length >>> 2);
  }
  function Q(r, l, _) {
    _ == null && (_ = 1e-4);
    var f = new Uint32Array(r.buffer), s = { i0: 0, i1: r.length, bst: null, est: null, tdst: 0, left: null, right: null };
    s.bst = R(r, s.i0, s.i1), s.est = k(s.bst);
    for (var p = [s]; p.length < l; ) {
      for (var b = 0, w = 0, a = 0; a < p.length; a++) p[a].est.L > b && (b = p[a].est.L, w = a);
      if (b < _) break;
      var u = p[w], d = h(r, f, u.i0, u.i1, u.est.e, u.est.eMq255);
      if (u.i0 >= d || u.i1 <= d) u.est.L = 0;
      else {
        var S = { i0: u.i0, i1: d, bst: null, est: null, tdst: 0, left: null, right: null };
        S.bst = R(r, S.i0, S.i1), S.est = k(S.bst);
        var T = { i0: d, i1: u.i1, bst: null, est: null, tdst: 0, left: null, right: null };
        for (T.bst = { R: [], m: [], N: u.bst.N - S.bst.N }, a = 0; a < 16; a++) T.bst.R[a] = u.bst.R[a] - S.bst.R[a];
        for (a = 0; a < 4; a++) T.bst.m[a] = u.bst.m[a] - S.bst.m[a];
        T.est = k(T.bst), u.left = S, u.right = T, p[w] = S, p.push(T);
      }
    }
    for (p.sort((function(C, Z) {
      return Z.bst.N - C.bst.N;
    })), a = 0; a < p.length; a++) p[a].ind = a;
    return [s, p];
  }
  function A(r, l, _, f, s) {
    if (r.left == null) return r.tdst = (function(d, S, T, C, Z) {
      var U = S - d[0], B = T - d[1], m = C - d[2], dt = Z - d[3];
      return U * U + B * B + m * m + dt * dt;
    })(r.est.q, l, _, f, s), r;
    var p = M(r.est, l, _, f, s), b = r.left, w = r.right;
    p > 0 && (b = r.right, w = r.left);
    var a = A(b, l, _, f, s);
    if (a.tdst <= p * p) return a;
    var u = A(w, l, _, f, s);
    return u.tdst < a.tdst ? u : a;
  }
  function M(r, l, _, f, s) {
    var p = r.e;
    return p[0] * l + p[1] * _ + p[2] * f + p[3] * s - r.eMq;
  }
  function h(r, l, _, f, s, p) {
    for (f -= 4; _ < f; ) {
      for (; o(r, _, s) <= p; ) _ += 4;
      for (; o(r, f, s) > p; ) f -= 4;
      if (_ >= f) break;
      var b = l[_ >> 2];
      l[_ >> 2] = l[f >> 2], l[f >> 2] = b, _ += 4, f -= 4;
    }
    for (; o(r, _, s) > p; ) _ -= 4;
    return _ + 4;
  }
  function o(r, l, _) {
    return r[l] * _[0] + r[l + 1] * _[1] + r[l + 2] * _[2] + r[l + 3] * _[3];
  }
  function R(r, l, _) {
    for (var f = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], s = [0, 0, 0, 0], p = _ - l >> 2, b = l; b < _; b += 4) {
      var w = r[b] * 0.00392156862745098, a = r[b + 1] * (1 / 255), u = r[b + 2] * (1 / 255), d = r[b + 3] * (1 / 255);
      s[0] += w, s[1] += a, s[2] += u, s[3] += d, f[0] += w * w, f[1] += w * a, f[2] += w * u, f[3] += w * d, f[5] += a * a, f[6] += a * u, f[7] += a * d, f[10] += u * u, f[11] += u * d, f[15] += d * d;
    }
    return f[4] = f[1], f[8] = f[2], f[9] = f[6], f[12] = f[3], f[13] = f[7], f[14] = f[11], { R: f, m: s, N: p };
  }
  function k(r) {
    var l = r.R, _ = r.m, f = r.N, s = _[0], p = _[1], b = _[2], w = _[3], a = f == 0 ? 0 : 1 / f, u = [l[0] - s * s * a, l[1] - s * p * a, l[2] - s * b * a, l[3] - s * w * a, l[4] - p * s * a, l[5] - p * p * a, l[6] - p * b * a, l[7] - p * w * a, l[8] - b * s * a, l[9] - b * p * a, l[10] - b * b * a, l[11] - b * w * a, l[12] - w * s * a, l[13] - w * p * a, l[14] - w * b * a, l[15] - w * w * a], d = u, S = X, T = [Math.random(), Math.random(), Math.random(), Math.random()], C = 0, Z = 0;
    if (f != 0) for (var U = 0; U < 16 && (T = S.multVec(d, T), Z = Math.sqrt(S.dot(T, T)), T = S.sml(1 / Z, T), !(U != 0 && Math.abs(Z - C) < 1e-9)); U++) C = Z;
    var B = [s * a, p * a, b * a, w * a];
    return { Cov: u, q: B, e: T, L: C, eMq255: S.dot(S.sml(255, B), T), eMq: S.dot(T, B), rgba: (Math.round(255 * B[3]) << 24 | Math.round(255 * B[2]) << 16 | Math.round(255 * B[1]) << 8 | Math.round(255 * B[0])) >>> 0 };
  }
  var X = { multVec: function(r, l) {
    return [r[0] * l[0] + r[1] * l[1] + r[2] * l[2] + r[3] * l[3], r[4] * l[0] + r[5] * l[1] + r[6] * l[2] + r[7] * l[3], r[8] * l[0] + r[9] * l[1] + r[10] * l[2] + r[11] * l[3], r[12] * l[0] + r[13] * l[1] + r[14] * l[2] + r[15] * l[3]];
  }, dot: function(r, l) {
    return r[0] * l[0] + r[1] * l[1] + r[2] * l[2] + r[3] * l[3];
  }, sml: function(r, l) {
    return [r * l[0], r * l[1], r * l[2], r * l[3]];
  } };
  Ht.encode = function(r, l, _, f, s, p, b) {
    f == null && (f = 0), b == null && (b = !1);
    var w = i(r, l, _, f, [!1, !1, !1, 0, b, !1]);
    return it(w, -1), rt(w, l, _, s, p);
  }, Ht.encodeLL = function(r, l, _, f, s, p, b, w) {
    for (var a = { ctype: 0 + (f == 1 ? 0 : 2) + (s == 0 ? 0 : 4), depth: p, frames: [] }, u = (f + s) * p, d = u * l, S = 0; S < r.length; S++) a.frames.push({ rect: { x: 0, y: 0, width: l, height: _ }, img: new Uint8Array(r[S]), blend: 0, dispose: 1, bpp: Math.ceil(u / 8), bpl: Math.ceil(d / 8) });
    return it(a, 0, !0), rt(a, l, _, b, w);
  }, Ht.encode.compress = i, Ht.encode.dither = et, Ht.quantize = G, Ht.quantize.findNearest = W, Ht.quantize.getKDtree = Q, Ht.quantize.getNearest = A;
})();
const Oe = function(P) {
  const J = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  let ot = "";
  for (let L = 0; L < P.length; L += 3) {
    const H = P[L], F = L + 1 < P.length, $ = L + 2 < P.length, et = F ? P[L + 1] : 0, rt = $ ? P[L + 2] : 0, it = H << 16 | et << 8 | rt;
    ot += J.charAt(it >>> 18 & 63), ot += J.charAt(it >>> 12 & 63), ot += F ? J.charAt(it >>> 6 & 63) : "=", ot += $ ? J.charAt(it & 63) : "=";
  }
  return ot;
}, Ne = function(P, J, ot, L, H) {
  const F = new Uint8Array(P * J * 4);
  for (let rt = 0; rt < J; rt += 1)
    for (let it = 0; it < P; it += 1) {
      const i = (rt * P + it) * 4, E = H(it, rt) ? ot : L;
      F[i] = E[0], F[i + 1] = E[1], F[i + 2] = E[2], F[i + 3] = E[3];
    }
  const $ = Ht.encode([F.buffer], P, J, 0);
  return "data:image/png;base64," + Oe(new Uint8Array($));
};
Re.registerRenderer("png", function(P, J, ot, L) {
  let H = {};
  typeof P == "object" && (H = P || {}, P = void 0);
  let F = H.tag === !1 ? !1 : H.tag === !0 || typeof H.tag > "u" ? "img" : H.tag;
  typeof P != "number" && (P = typeof H.cellSize == "number" ? H.cellSize : 2), typeof J > "u" && (J = H.margin), typeof J != "number" && (J = typeof J > "u" ? P * 4 : 0), typeof ot != "string" && (ot = H.cellColor), typeof L != "string" && (L = H.backgroundColor);
  const $ = typeof H.alt == "string" ? H.alt : void 0, et = typeof H.title == "string" ? H.title : void 0, rt = ge(typeof ot == "string" ? ot : "black", [0, 0, 0, 255]), it = ge(typeof L == "string" ? L : "white", [255, 255, 255, 255]), i = Number(P), E = Number(J), g = Number(this.getModuleCount()) * i + E * 2, O = E, G = g - E, K = Ne(g, g, rt, it, (W, Q) => {
    if (O <= W && W < G && O <= Q && Q < G) {
      const A = Math.floor((W - O) / i), M = Math.floor((Q - O) / i);
      return this.isDark(M, A);
    }
    return !1;
  });
  if (F === !1)
    return K;
  F = typeof F == "string" ? F : "img";
  let x = "";
  return x += "<" + F, x += ' src="', x += K, x += '"', x += ' width="', x += g, x += '"', x += ' height="', x += g, x += '"', $ && (x += ' alt="', x += pe($), x += '"'), et && (x += ' title="', x += pe(et), x += '"'), x += "/>", x;
});
//# sourceMappingURL=png.mjs.map
