import { registerRenderer as Re } from "./utils/registry.mjs";
import { parseRgbaColor as ge } from "./utils/color.mjs";
import { escapeXml as be } from "./utils/xml.mjs";
var Xt = {}, Bt = {}, jt = {}, pe;
function Te() {
  if (pe) return jt;
  pe = 1;
  const j = 4, rt = 0, ft = 1, L = 2;
  function N(e) {
    let I = e.length;
    for (; --I >= 0; )
      e[I] = 0;
  }
  const C = 0, V = 1, Q = 2, tt = 3, it = 258, i = 29, E = 256, h = E + 1 + i, w = 30, H = 19, G = 2 * h + 1, K = 15, z = 16, X = 7, W = 256, A = 16, M = 17, c = 18, o = (
    /* extra bits for each length code */
    new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0])
  ), R = (
    /* extra bits for each distance code */
    new Uint8Array([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13])
  ), k = (
    /* extra bits for each bit length code */
    new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7])
  ), $ = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), r = 512, l = new Array((h + 2) * 2);
  N(l);
  const _ = new Array(w * 2);
  N(_);
  const f = new Array(r);
  N(f);
  const s = new Array(it - tt + 1);
  N(s);
  const g = new Array(i);
  N(g);
  const b = new Array(w);
  N(b);
  function p(e, I, D, q, P) {
    this.static_tree = e, this.extra_bits = I, this.extra_base = D, this.elems = q, this.max_length = P, this.has_stree = e && e.length;
  }
  let a, u, d;
  function S(e, I) {
    this.dyn_tree = e, this.max_code = 0, this.stat_desc = I;
  }
  const T = (e) => e < 256 ? f[e] : f[256 + (e >>> 7)], F = (e, I) => {
    e.pending_buf[e.pending++] = I & 255, e.pending_buf[e.pending++] = I >>> 8 & 255;
  }, Z = (e, I, D) => {
    e.bi_valid > z - D ? (e.bi_buf |= I << e.bi_valid & 65535, F(e, e.bi_buf), e.bi_buf = I >> z - e.bi_valid, e.bi_valid += D - z) : (e.bi_buf |= I << e.bi_valid & 65535, e.bi_valid += D);
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
    e.bi_valid === 16 ? (F(e, e.bi_buf), e.bi_buf = 0, e.bi_valid = 0) : e.bi_valid >= 8 && (e.pending_buf[e.pending++] = e.bi_buf & 255, e.bi_buf >>= 8, e.bi_valid -= 8);
  }, dt = (e, I) => {
    const D = I.dyn_tree, q = I.max_code, P = I.stat_desc.static_tree, J = I.stat_desc.has_stree, O = I.stat_desc.extra_bits, lt = I.stat_desc.extra_base, mt = I.stat_desc.max_length;
    let ut, pt, At, ot, Rt, Tt, It = 0;
    for (ot = 0; ot <= K; ot++)
      e.bl_count[ot] = 0;
    for (D[e.heap[e.heap_max] * 2 + 1] = 0, ut = e.heap_max + 1; ut < G; ut++)
      pt = e.heap[ut], ot = D[D[pt * 2 + 1] * 2 + 1] + 1, ot > mt && (ot = mt, It++), D[pt * 2 + 1] = ot, !(pt > q) && (e.bl_count[ot]++, Rt = 0, pt >= lt && (Rt = O[pt - lt]), Tt = D[pt * 2], e.opt_len += Tt * (ot + Rt), J && (e.static_len += Tt * (P[pt * 2 + 1] + Rt)));
    if (It !== 0) {
      do {
        for (ot = mt - 1; e.bl_count[ot] === 0; )
          ot--;
        e.bl_count[ot]--, e.bl_count[ot + 1] += 2, e.bl_count[mt]--, It -= 2;
      } while (It > 0);
      for (ot = mt; ot !== 0; ot--)
        for (pt = e.bl_count[ot]; pt !== 0; )
          At = e.heap[--ut], !(At > q) && (D[At * 2 + 1] !== ot && (e.opt_len += (ot - D[At * 2 + 1]) * D[At * 2], D[At * 2 + 1] = ot), pt--);
    }
  }, nt = (e, I, D) => {
    const q = new Array(K + 1);
    let P = 0, J, O;
    for (J = 1; J <= K; J++)
      P = P + D[J - 1] << 1, q[J] = P;
    for (O = 0; O <= I; O++) {
      let lt = e[O * 2 + 1];
      lt !== 0 && (e[O * 2] = B(q[lt]++, lt));
    }
  }, ht = () => {
    let e, I, D, q, P;
    const J = new Array(K + 1);
    for (D = 0, q = 0; q < i - 1; q++)
      for (g[q] = D, e = 0; e < 1 << o[q]; e++)
        s[D++] = q;
    for (s[D - 1] = q, P = 0, q = 0; q < 16; q++)
      for (b[q] = P, e = 0; e < 1 << R[q]; e++)
        f[P++] = q;
    for (P >>= 7; q < w; q++)
      for (b[q] = P << 7, e = 0; e < 1 << R[q] - 7; e++)
        f[256 + P++] = q;
    for (I = 0; I <= K; I++)
      J[I] = 0;
    for (e = 0; e <= 143; )
      l[e * 2 + 1] = 8, e++, J[8]++;
    for (; e <= 255; )
      l[e * 2 + 1] = 9, e++, J[9]++;
    for (; e <= 279; )
      l[e * 2 + 1] = 7, e++, J[7]++;
    for (; e <= 287; )
      l[e * 2 + 1] = 8, e++, J[8]++;
    for (nt(l, h + 1, J), e = 0; e < w; e++)
      _[e * 2 + 1] = 5, _[e * 2] = B(e, 5);
    a = new p(l, o, E + 1, h, K), u = new p(_, R, 0, w, K), d = new p(new Array(0), k, 0, H, X);
  }, at = (e) => {
    let I;
    for (I = 0; I < h; I++)
      e.dyn_ltree[I * 2] = 0;
    for (I = 0; I < w; I++)
      e.dyn_dtree[I * 2] = 0;
    for (I = 0; I < H; I++)
      e.bl_tree[I * 2] = 0;
    e.dyn_ltree[W * 2] = 1, e.opt_len = e.static_len = 0, e.sym_next = e.matches = 0;
  }, yt = (e) => {
    e.bi_valid > 8 ? F(e, e.bi_buf) : e.bi_valid > 0 && (e.pending_buf[e.pending++] = e.bi_buf), e.bi_buf = 0, e.bi_valid = 0;
  }, xt = (e, I, D, q) => {
    const P = I * 2, J = D * 2;
    return e[P] < e[J] || e[P] === e[J] && q[I] <= q[D];
  }, gt = (e, I, D) => {
    const q = e.heap[D];
    let P = D << 1;
    for (; P <= e.heap_len && (P < e.heap_len && xt(I, e.heap[P + 1], e.heap[P], e.depth) && P++, !xt(I, q, e.heap[P], e.depth)); )
      e.heap[D] = e.heap[P], D = P, P <<= 1;
    e.heap[D] = q;
  }, Dt = (e, I, D) => {
    let q, P, J = 0, O, lt;
    if (e.sym_next !== 0)
      do
        q = e.pending_buf[e.sym_buf + J++] & 255, q += (e.pending_buf[e.sym_buf + J++] & 255) << 8, P = e.pending_buf[e.sym_buf + J++], q === 0 ? U(e, P, I) : (O = s[P], U(e, O + E + 1, I), lt = o[O], lt !== 0 && (P -= g[O], Z(e, P, lt)), q--, O = T(q), U(e, O, D), lt = R[O], lt !== 0 && (q -= b[O], Z(e, q, lt)));
      while (J < e.sym_next);
    U(e, W, I);
  }, zt = (e, I) => {
    const D = I.dyn_tree, q = I.stat_desc.static_tree, P = I.stat_desc.has_stree, J = I.stat_desc.elems;
    let O, lt, mt = -1, ut;
    for (e.heap_len = 0, e.heap_max = G, O = 0; O < J; O++)
      D[O * 2] !== 0 ? (e.heap[++e.heap_len] = mt = O, e.depth[O] = 0) : D[O * 2 + 1] = 0;
    for (; e.heap_len < 2; )
      ut = e.heap[++e.heap_len] = mt < 2 ? ++mt : 0, D[ut * 2] = 1, e.depth[ut] = 0, e.opt_len--, P && (e.static_len -= q[ut * 2 + 1]);
    for (I.max_code = mt, O = e.heap_len >> 1; O >= 1; O--)
      gt(e, D, O);
    ut = J;
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
    ], dt(e, I), nt(D, mt, e.bl_count);
  }, Mt = (e, I, D) => {
    let q, P = -1, J, O = I[1], lt = 0, mt = 7, ut = 4;
    for (O === 0 && (mt = 138, ut = 3), I[(D + 1) * 2 + 1] = 65535, q = 0; q <= D; q++)
      J = O, O = I[(q + 1) * 2 + 1], !(++lt < mt && J === O) && (lt < ut ? e.bl_tree[J * 2] += lt : J !== 0 ? (J !== P && e.bl_tree[J * 2]++, e.bl_tree[A * 2]++) : lt <= 10 ? e.bl_tree[M * 2]++ : e.bl_tree[c * 2]++, lt = 0, P = J, O === 0 ? (mt = 138, ut = 3) : J === O ? (mt = 6, ut = 3) : (mt = 7, ut = 4));
  }, Et = (e, I, D) => {
    let q, P = -1, J, O = I[1], lt = 0, mt = 7, ut = 4;
    for (O === 0 && (mt = 138, ut = 3), q = 0; q <= D; q++)
      if (J = O, O = I[(q + 1) * 2 + 1], !(++lt < mt && J === O)) {
        if (lt < ut)
          do
            U(e, J, e.bl_tree);
          while (--lt !== 0);
        else J !== 0 ? (J !== P && (U(e, J, e.bl_tree), lt--), U(e, A, e.bl_tree), Z(e, lt - 3, 2)) : lt <= 10 ? (U(e, M, e.bl_tree), Z(e, lt - 3, 3)) : (U(e, c, e.bl_tree), Z(e, lt - 11, 7));
        lt = 0, P = J, O === 0 ? (mt = 138, ut = 3) : J === O ? (mt = 6, ut = 3) : (mt = 7, ut = 4);
      }
  }, $t = (e) => {
    let I;
    for (Mt(e, e.dyn_ltree, e.l_desc.max_code), Mt(e, e.dyn_dtree, e.d_desc.max_code), zt(e, e.bl_desc), I = H - 1; I >= 3 && e.bl_tree[$[I] * 2 + 1] === 0; I--)
      ;
    return e.opt_len += 3 * (I + 1) + 5 + 5 + 4, I;
  }, kt = (e, I, D, q) => {
    let P;
    for (Z(e, I - 257, 5), Z(e, D - 1, 5), Z(e, q - 4, 4), P = 0; P < q; P++)
      Z(e, e.bl_tree[$[P] * 2 + 1], 3);
    Et(e, e.dyn_ltree, I - 1), Et(e, e.dyn_dtree, D - 1);
  }, Zt = (e) => {
    let I = 4093624447, D;
    for (D = 0; D <= 31; D++, I >>>= 1)
      if (I & 1 && e.dyn_ltree[D * 2] !== 0)
        return rt;
    if (e.dyn_ltree[18] !== 0 || e.dyn_ltree[20] !== 0 || e.dyn_ltree[26] !== 0)
      return ft;
    for (D = 32; D < E; D++)
      if (e.dyn_ltree[D * 2] !== 0)
        return ft;
    return rt;
  };
  let bt = !1;
  const St = (e) => {
    bt || (ht(), bt = !0), e.l_desc = new S(e.dyn_ltree, a), e.d_desc = new S(e.dyn_dtree, u), e.bl_desc = new S(e.bl_tree, d), e.bi_buf = 0, e.bi_valid = 0, at(e);
  }, ct = (e, I, D, q) => {
    Z(e, (C << 1) + (q ? 1 : 0), 3), yt(e), F(e, D), F(e, ~D), D && e.pending_buf.set(e.window.subarray(I, I + D), e.pending), e.pending += D;
  }, Lt = (e) => {
    Z(e, V << 1, 3), U(e, W, l), m(e);
  }, qt = (e, I, D, q) => {
    let P, J, O = 0;
    e.level > 0 ? (e.strm.data_type === L && (e.strm.data_type = Zt(e)), zt(e, e.l_desc), zt(e, e.d_desc), O = $t(e), P = e.opt_len + 3 + 7 >>> 3, J = e.static_len + 3 + 7 >>> 3, J <= P && (P = J)) : P = J = D + 5, D + 4 <= P && I !== -1 ? ct(e, I, D, q) : e.strategy === j || J === P ? (Z(e, (V << 1) + (q ? 1 : 0), 3), Dt(e, l, _)) : (Z(e, (Q << 1) + (q ? 1 : 0), 3), kt(e, e.l_desc.max_code + 1, e.d_desc.max_code + 1, O + 1), Dt(e, e.dyn_ltree, e.dyn_dtree)), at(e), q && yt(e);
  }, Ct = (e, I, D) => (e.pending_buf[e.sym_buf + e.sym_next++] = I, e.pending_buf[e.sym_buf + e.sym_next++] = I >> 8, e.pending_buf[e.sym_buf + e.sym_next++] = D, I === 0 ? e.dyn_ltree[D * 2]++ : (e.matches++, I--, e.dyn_ltree[(s[D] + E + 1) * 2]++, e.dyn_dtree[T(I) * 2]++), e.sym_next === e.sym_end);
  return jt._tr_init = St, jt._tr_stored_block = ct, jt._tr_flush_block = qt, jt._tr_tally = Ct, jt._tr_align = Lt, jt;
}
var ie, we;
function Ze() {
  return we || (we = 1, ie = (rt, ft, L, N) => {
    let C = rt & 65535 | 0, V = rt >>> 16 & 65535 | 0, Q = 0;
    for (; L !== 0; ) {
      Q = L > 2e3 ? 2e3 : L, L -= Q;
      do
        C = C + ft[N++] | 0, V = V + C | 0;
      while (--Q);
      C %= 65521, V %= 65521;
    }
    return C | V << 16 | 0;
  }), ie;
}
var le, me;
function Ie() {
  if (me) return le;
  me = 1;
  const j = () => {
    let L, N = [];
    for (var C = 0; C < 256; C++) {
      L = C;
      for (var V = 0; V < 8; V++)
        L = L & 1 ? 3988292384 ^ L >>> 1 : L >>> 1;
      N[C] = L;
    }
    return N;
  }, rt = new Uint32Array(j());
  return le = (L, N, C, V) => {
    const Q = rt, tt = V + C;
    L ^= -1;
    for (let it = V; it < tt; it++)
      L = L >>> 8 ^ Q[(L ^ N[it]) & 255];
    return L ^ -1;
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
  const { _tr_init: j, _tr_stored_block: rt, _tr_flush_block: ft, _tr_tally: L, _tr_align: N } = Te(), C = Ze(), V = Ie(), Q = Ue(), {
    Z_NO_FLUSH: tt,
    Z_PARTIAL_FLUSH: it,
    Z_FULL_FLUSH: i,
    Z_FINISH: E,
    Z_BLOCK: h,
    Z_OK: w,
    Z_STREAM_END: H,
    Z_STREAM_ERROR: G,
    Z_DATA_ERROR: K,
    Z_BUF_ERROR: z,
    Z_DEFAULT_COMPRESSION: X,
    Z_FILTERED: W,
    Z_HUFFMAN_ONLY: A,
    Z_RLE: M,
    Z_FIXED: c,
    Z_DEFAULT_STRATEGY: o,
    Z_UNKNOWN: R,
    Z_DEFLATED: k
  } = he(), $ = 9, r = 15, l = 8, s = 256 + 1 + 29, g = 30, b = 19, p = 2 * s + 1, a = 15, u = 3, d = 258, S = d + u + 1, T = 32, F = 42, Z = 57, U = 69, B = 73, m = 91, dt = 103, nt = 113, ht = 666, at = 1, yt = 2, xt = 3, gt = 4, Dt = 3, zt = (t, x) => (t.msg = Q[x], x), Mt = (t) => t * 2 - (t > 4 ? 9 : 0), Et = (t) => {
    let x = t.length;
    for (; --x >= 0; )
      t[x] = 0;
  }, $t = (t) => {
    let x, n, v, y = t.w_size;
    x = t.hash_size, v = x;
    do
      n = t.head[--v], t.head[v] = n >= y ? n - y : 0;
    while (--x);
    x = y, v = x;
    do
      n = t.prev[--v], t.prev[v] = n >= y ? n - y : 0;
    while (--x);
  };
  let kt = (t, x, n) => (x << t.hash_shift ^ n) & t.hash_mask;
  const Zt = (t, x) => {
    let n;
    if (t.legacy_hash)
      n = t.ins_h = kt(t, t.ins_h, t.window[x + u - 1]);
    else {
      const y = t.window, Y = y[x] | y[x + 1] << 8 | y[x + 2] << 16 | y[x + 3] << 24;
      n = t.ins_h = Math.imul(Y, 66521) + 66521 >>> 16 & t.hash_mask;
    }
    const v = t.prev[x & t.w_mask] = t.head[n];
    return t.head[n] = x, v;
  }, bt = (t) => {
    const x = t.state;
    let n = x.pending;
    n > t.avail_out && (n = t.avail_out), n !== 0 && (t.output.set(x.pending_buf.subarray(x.pending_out, x.pending_out + n), t.next_out), t.next_out += n, x.pending_out += n, t.total_out += n, t.avail_out -= n, x.pending -= n, x.pending === 0 && (x.pending_out = 0));
  }, St = (t, x) => {
    ft(t, t.block_start >= 0 ? t.block_start : -1, t.strstart - t.block_start, x), t.block_start = t.strstart, bt(t.strm);
  }, ct = (t, x) => {
    t.pending_buf[t.pending++] = x;
  }, Lt = (t, x) => {
    t.pending_buf[t.pending++] = x >>> 8 & 255, t.pending_buf[t.pending++] = x & 255;
  }, qt = (t, x, n, v) => {
    let y = t.avail_in;
    return y > v && (y = v), y === 0 ? 0 : (t.avail_in -= y, x.set(t.input.subarray(t.next_in, t.next_in + y), n), t.state.wrap === 1 ? t.adler = C(t.adler, x, y, n) : t.state.wrap === 2 && (t.adler = V(t.adler, x, y, n)), t.next_in += y, t.total_in += y, y);
  }, Ct = (t, x) => {
    let n = t.max_chain_length, v = t.strstart, y, Y, _t = t.prev_length, vt = t.nice_match;
    const et = t.strstart > t.w_size - S ? t.strstart - (t.w_size - S) : 0, wt = t.window, Gt = t.w_mask, ne = t.prev, Jt = t.strstart + d;
    let Ot = wt[v + _t - 1], Nt = wt[v + _t];
    t.prev_length >= t.good_match && (n >>= 2), vt > t.lookahead && (vt = t.lookahead);
    do
      if (y = x, !(wt[y + _t] !== Nt || wt[y + _t - 1] !== Ot || wt[y] !== wt[v] || wt[++y] !== wt[v + 1])) {
        v += 2, y++;
        do
          ;
        while (wt[++v] === wt[++y] && wt[++v] === wt[++y] && wt[++v] === wt[++y] && wt[++v] === wt[++y] && wt[++v] === wt[++y] && wt[++v] === wt[++y] && wt[++v] === wt[++y] && wt[++v] === wt[++y] && v < Jt);
        if (Y = d - (Jt - v), v = Jt - d, Y > _t) {
          if (t.match_start = x, _t = Y, Y >= vt)
            break;
          Ot = wt[v + _t - 1], Nt = wt[v + _t];
        }
      }
    while ((x = ne[x & Gt]) > et && --n !== 0);
    return _t <= t.lookahead ? _t : t.lookahead;
  }, e = (t) => {
    const x = t.w_size;
    let n, v, y;
    do {
      if (v = t.window_size - t.lookahead - t.strstart, t.strstart >= x + (x - S) && (t.window.set(t.window.subarray(x, x + x - v), 0), t.match_start -= x, t.strstart -= x, t.block_start -= x, t.insert > t.strstart && (t.insert = t.strstart), $t(t), v += x), t.strm.avail_in === 0)
        break;
      if (n = qt(t.strm, t.window, t.strstart + t.lookahead, v), t.lookahead += n, t.legacy_hash) {
        if (t.lookahead + t.insert >= u)
          for (y = t.strstart - t.insert, t.ins_h = t.window[y], t.ins_h = kt(t, t.ins_h, t.window[y + 1]); t.insert && (Zt(t, y), y++, t.insert--, !(t.lookahead + t.insert < u)); )
            ;
      } else if (t.lookahead + t.insert > u)
        for (y = t.strstart - t.insert; t.insert && (Zt(t, y), y++, t.insert--, !(t.lookahead + t.insert <= u)); )
          ;
    } while (t.lookahead < S && t.strm.avail_in !== 0);
  }, I = (t, x) => {
    let n = t.pending_buf_size - 5 > t.w_size ? t.w_size : t.pending_buf_size - 5, v, y, Y, _t = 0, vt = t.strm.avail_in;
    do {
      if (v = 65535, Y = t.bi_valid + 42 >> 3, t.strm.avail_out < Y || (Y = t.strm.avail_out - Y, y = t.strstart - t.block_start, v > y + t.strm.avail_in && (v = y + t.strm.avail_in), v > Y && (v = Y), v < n && (v === 0 && x !== E || x === tt || v !== y + t.strm.avail_in)))
        break;
      _t = x === E && v === y + t.strm.avail_in ? 1 : 0, rt(t, 0, 0, _t), t.pending_buf[t.pending - 4] = v, t.pending_buf[t.pending - 3] = v >> 8, t.pending_buf[t.pending - 2] = ~v, t.pending_buf[t.pending - 1] = ~v >> 8, bt(t.strm), y && (y > v && (y = v), t.strm.output.set(t.window.subarray(t.block_start, t.block_start + y), t.strm.next_out), t.strm.next_out += y, t.strm.avail_out -= y, t.strm.total_out += y, t.block_start += y, v -= y), v && (qt(t.strm, t.strm.output, t.strm.next_out, v), t.strm.next_out += v, t.strm.avail_out -= v, t.strm.total_out += v);
    } while (_t === 0);
    return vt -= t.strm.avail_in, vt && (vt >= t.w_size ? (t.matches = 2, t.window.set(t.strm.input.subarray(t.strm.next_in - t.w_size, t.strm.next_in), 0), t.strstart = t.w_size, t.insert = t.strstart) : (t.window_size - t.strstart <= vt && (t.strstart -= t.w_size, t.window.set(t.window.subarray(t.w_size, t.w_size + t.strstart), 0), t.matches < 2 && t.matches++, t.insert > t.strstart && (t.insert = t.strstart)), t.window.set(t.strm.input.subarray(t.strm.next_in - vt, t.strm.next_in), t.strstart), t.strstart += vt, t.insert += vt > t.w_size - t.insert ? t.w_size - t.insert : vt), t.block_start = t.strstart), t.high_water < t.strstart && (t.high_water = t.strstart), _t ? gt : x !== tt && x !== E && t.strm.avail_in === 0 && t.strstart === t.block_start ? yt : (Y = t.window_size - t.strstart, t.strm.avail_in > Y && t.block_start >= t.w_size && (t.block_start -= t.w_size, t.strstart -= t.w_size, t.window.set(t.window.subarray(t.w_size, t.w_size + t.strstart), 0), t.matches < 2 && t.matches++, Y += t.w_size, t.insert > t.strstart && (t.insert = t.strstart)), Y > t.strm.avail_in && (Y = t.strm.avail_in), Y && (qt(t.strm, t.window, t.strstart, Y), t.strstart += Y, t.insert += Y > t.w_size - t.insert ? t.w_size - t.insert : Y), t.high_water < t.strstart && (t.high_water = t.strstart), Y = t.bi_valid + 42 >> 3, Y = t.pending_buf_size - Y > 65535 ? 65535 : t.pending_buf_size - Y, n = Y > t.w_size ? t.w_size : Y, y = t.strstart - t.block_start, (y >= n || (y || x === E) && x !== tt && t.strm.avail_in === 0 && y <= Y) && (v = y > Y ? Y : y, _t = x === E && t.strm.avail_in === 0 && v === y ? 1 : 0, rt(t, t.block_start, v, _t), t.block_start += v, bt(t.strm)), _t ? xt : at);
  }, D = (t, x) => {
    let n, v;
    for (; ; ) {
      if (t.lookahead < S) {
        if (e(t), t.lookahead < S && x === tt)
          return at;
        if (t.lookahead === 0)
          break;
      }
      if (n = 0, t.lookahead >= u && (n = Zt(t, t.strstart)), n !== 0 && t.strstart - n <= t.w_size - S && (t.match_length = Ct(t, n)), t.match_length >= u)
        if (v = L(t, t.strstart - t.match_start, t.match_length - u), t.lookahead -= t.match_length, t.match_length <= t.max_lazy_match && t.lookahead >= u) {
          t.match_length--;
          do
            t.strstart++, n = Zt(t, t.strstart);
          while (--t.match_length !== 0);
          t.strstart++;
        } else
          t.strstart += t.match_length, t.match_length = 0, t.legacy_hash && (t.ins_h = t.window[t.strstart], t.ins_h = kt(t, t.ins_h, t.window[t.strstart + 1]));
      else
        v = L(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++;
      if (v && (St(t, !1), t.strm.avail_out === 0))
        return at;
    }
    return t.insert = t.strstart < u - 1 ? t.strstart : u - 1, x === E ? (St(t, !0), t.strm.avail_out === 0 ? xt : gt) : t.sym_next && (St(t, !1), t.strm.avail_out === 0) ? at : yt;
  }, q = (t, x) => {
    let n, v, y;
    for (; ; ) {
      if (t.lookahead < S) {
        if (e(t), t.lookahead < S && x === tt)
          return at;
        if (t.lookahead === 0)
          break;
      }
      if (n = 0, t.lookahead >= u && (n = Zt(t, t.strstart)), t.prev_length = t.match_length, t.prev_match = t.match_start, t.match_length = u - 1, n !== 0 && t.prev_length < t.max_lazy_match && t.strstart - n <= t.w_size - S && (t.match_length = Ct(t, n), t.match_length <= 5 && (t.strategy === W || t.match_length === u && t.strstart - t.match_start > 4096) && (t.match_length = u - 1)), t.prev_length >= u && t.match_length <= t.prev_length) {
        y = t.strstart + t.lookahead - u, v = L(t, t.strstart - 1 - t.prev_match, t.prev_length - u), t.lookahead -= t.prev_length - 1, t.prev_length -= 2;
        do
          ++t.strstart <= y && (n = Zt(t, t.strstart));
        while (--t.prev_length !== 0);
        if (t.match_available = 0, t.match_length = u - 1, t.strstart++, v && (St(t, !1), t.strm.avail_out === 0))
          return at;
      } else if (t.match_available) {
        if (v = L(t, 0, t.window[t.strstart - 1]), v && St(t, !1), t.strstart++, t.lookahead--, t.strm.avail_out === 0)
          return at;
      } else
        t.match_available = 1, t.strstart++, t.lookahead--;
    }
    return t.match_available && (v = L(t, 0, t.window[t.strstart - 1]), t.match_available = 0), t.insert = t.strstart < u - 1 ? t.strstart : u - 1, x === E ? (St(t, !0), t.strm.avail_out === 0 ? xt : gt) : t.sym_next && (St(t, !1), t.strm.avail_out === 0) ? at : yt;
  }, P = (t, x) => {
    let n, v, y, Y;
    const _t = t.window;
    for (; ; ) {
      if (t.lookahead <= d) {
        if (e(t), t.lookahead <= d && x === tt)
          return at;
        if (t.lookahead === 0)
          break;
      }
      if (t.match_length = 0, t.lookahead >= u && t.strstart > 0 && (y = t.strstart - 1, v = _t[y], v === _t[++y] && v === _t[++y] && v === _t[++y])) {
        Y = t.strstart + d;
        do
          ;
        while (v === _t[++y] && v === _t[++y] && v === _t[++y] && v === _t[++y] && v === _t[++y] && v === _t[++y] && v === _t[++y] && v === _t[++y] && y < Y);
        t.match_length = d - (Y - y), t.match_length > t.lookahead && (t.match_length = t.lookahead);
      }
      if (t.match_length >= u ? (n = L(t, 1, t.match_length - u), t.lookahead -= t.match_length, t.strstart += t.match_length, t.match_length = 0) : (n = L(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++), n && (St(t, !1), t.strm.avail_out === 0))
        return at;
    }
    return t.insert = 0, x === E ? (St(t, !0), t.strm.avail_out === 0 ? xt : gt) : t.sym_next && (St(t, !1), t.strm.avail_out === 0) ? at : yt;
  }, J = (t, x) => {
    let n;
    for (; ; ) {
      if (t.lookahead === 0 && (e(t), t.lookahead === 0)) {
        if (x === tt)
          return at;
        break;
      }
      if (t.match_length = 0, n = L(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++, n && (St(t, !1), t.strm.avail_out === 0))
        return at;
    }
    return t.insert = 0, x === E ? (St(t, !0), t.strm.avail_out === 0 ? xt : gt) : t.sym_next && (St(t, !1), t.strm.avail_out === 0) ? at : yt;
  };
  function O(t, x, n, v, y) {
    this.good_length = t, this.max_lazy = x, this.nice_length = n, this.max_chain = v, this.func = y;
  }
  const lt = [
    /*      good lazy nice chain */
    new O(0, 0, 0, 0, I),
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
    this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = k, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.legacy_hash = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new Uint16Array(p * 2), this.dyn_dtree = new Uint16Array((2 * g + 1) * 2), this.bl_tree = new Uint16Array((2 * b + 1) * 2), Et(this.dyn_ltree), Et(this.dyn_dtree), Et(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new Uint16Array(a + 1), this.heap = new Uint16Array(2 * s + 1), Et(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new Uint16Array(2 * s + 1), Et(this.depth), this.sym_buf = 0, this.lit_bufsize = 0, this.sym_next = 0, this.sym_end = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
  }
  const pt = (t) => {
    if (!t)
      return 1;
    const x = t.state;
    return !x || x.strm !== t || x.status !== F && //#ifdef GZIP
    x.status !== Z && //#endif
    x.status !== U && x.status !== B && x.status !== m && x.status !== dt && x.status !== nt && x.status !== ht ? 1 : 0;
  }, At = (t) => {
    if (pt(t))
      return zt(t, G);
    t.total_in = t.total_out = 0, t.data_type = R;
    const x = t.state;
    return x.pending = 0, x.pending_out = 0, x.wrap < 0 && (x.wrap = -x.wrap), x.status = //#ifdef GZIP
    x.wrap === 2 ? Z : (
      //#endif
      x.wrap ? F : nt
    ), t.adler = x.wrap === 2 ? 0 : 1, x.last_flush = -2, j(x), w;
  }, ot = (t) => {
    const x = At(t);
    return x === w && mt(t.state), x;
  }, Rt = (t, x) => pt(t) || t.state.wrap !== 2 ? G : (t.state.gzhead = x, w), Tt = (t, x, n, v, y, Y, _t) => {
    if (!t)
      return G;
    let vt = 1;
    if (x === X && (x = 6), v < 0 ? (vt = 0, v = -v) : v > 15 && (vt = 2, v -= 16), y < 1 || y > $ || n !== k || v < 8 || v > 15 || x < 0 || x > 9 || Y < 0 || Y > c || v === 8 && vt !== 1)
      return zt(t, G);
    v === 8 && (v = 9);
    const et = new ut();
    return t.state = et, et.strm = t, et.status = F, et.wrap = vt, et.gzhead = null, et.w_bits = v, et.w_size = 1 << et.w_bits, et.w_mask = et.w_size - 1, et.legacy_hash = _t ? 1 : 0, et.hash_bits = y + 7, !et.legacy_hash && et.hash_bits < 15 && (et.hash_bits = 15), et.hash_size = 1 << et.hash_bits, et.hash_mask = et.hash_size - 1, et.hash_shift = ~~((et.hash_bits + u - 1) / u), et.window = new Uint8Array(et.w_size * 2), et.head = new Uint16Array(et.hash_size), et.prev = new Uint16Array(et.w_size), et.lit_bufsize = 1 << y + 6, et.pending_buf_size = et.lit_bufsize * 4, et.pending_buf = new Uint8Array(et.pending_buf_size), et.sym_buf = et.lit_bufsize, et.sym_end = (et.lit_bufsize - 1) * 3, et.level = x, et.strategy = Y, et.method = n, ot(t);
  }, It = (t, x) => Tt(t, x, k, r, l, o), Ut = (t, x) => {
    if (pt(t) || x > h || x < 0)
      return t ? zt(t, G) : G;
    const n = t.state;
    if (!t.output || t.avail_in !== 0 && !t.input || n.status === ht && x !== E)
      return zt(t, t.avail_out === 0 ? z : G);
    const v = n.last_flush;
    if (n.last_flush = x, n.pending !== 0) {
      if (bt(t), t.avail_out === 0)
        return n.last_flush = -1, w;
    } else if (t.avail_in === 0 && Mt(x) <= Mt(v) && x !== E)
      return zt(t, z);
    if (n.status === ht && t.avail_in !== 0)
      return zt(t, z);
    if (n.status === F && n.wrap === 0 && (n.status = nt), n.status === F) {
      let y = k + (n.w_bits - 8 << 4) << 8, Y = -1;
      if (n.strategy >= A || n.level < 2 ? Y = 0 : n.level < 6 ? Y = 1 : n.level === 6 ? Y = 2 : Y = 3, y |= Y << 6, n.strstart !== 0 && (y |= T), y += 31 - y % 31, Lt(n, y), n.strstart !== 0 && (Lt(n, t.adler >>> 16), Lt(n, t.adler & 65535)), t.adler = 1, n.status = nt, bt(t), n.pending !== 0)
        return n.last_flush = -1, w;
    }
    if (n.status === Z) {
      if (t.adler = 0, ct(n, 31), ct(n, 139), ct(n, 8), n.gzhead)
        ct(
          n,
          (n.gzhead.text ? 1 : 0) + (n.gzhead.hcrc ? 2 : 0) + (n.gzhead.extra ? 4 : 0) + (n.gzhead.name ? 8 : 0) + (n.gzhead.comment ? 16 : 0)
        ), ct(n, n.gzhead.time & 255), ct(n, n.gzhead.time >> 8 & 255), ct(n, n.gzhead.time >> 16 & 255), ct(n, n.gzhead.time >> 24 & 255), ct(n, n.level === 9 ? 2 : n.strategy >= A || n.level < 2 ? 4 : 0), ct(n, n.gzhead.os & 255), n.gzhead.extra && n.gzhead.extra.length && (ct(n, n.gzhead.extra.length & 255), ct(n, n.gzhead.extra.length >> 8 & 255)), n.gzhead.hcrc && (t.adler = V(t.adler, n.pending_buf, n.pending, 0)), n.gzindex = 0, n.status = U;
      else if (ct(n, 0), ct(n, 0), ct(n, 0), ct(n, 0), ct(n, 0), ct(n, n.level === 9 ? 2 : n.strategy >= A || n.level < 2 ? 4 : 0), ct(n, Dt), n.status = nt, bt(t), n.pending !== 0)
        return n.last_flush = -1, w;
    }
    if (n.status === U) {
      if (n.gzhead.extra) {
        let y = n.pending, Y = (n.gzhead.extra.length & 65535) - n.gzindex;
        for (; n.pending + Y > n.pending_buf_size; ) {
          let vt = n.pending_buf_size - n.pending;
          if (n.pending_buf.set(n.gzhead.extra.subarray(n.gzindex, n.gzindex + vt), n.pending), n.pending = n.pending_buf_size, n.gzhead.hcrc && n.pending > y && (t.adler = V(t.adler, n.pending_buf, n.pending - y, y)), n.gzindex += vt, bt(t), n.pending !== 0)
            return n.last_flush = -1, w;
          y = 0, Y -= vt;
        }
        let _t = new Uint8Array(n.gzhead.extra);
        n.pending_buf.set(_t.subarray(n.gzindex, n.gzindex + Y), n.pending), n.pending += Y, n.gzhead.hcrc && n.pending > y && (t.adler = V(t.adler, n.pending_buf, n.pending - y, y)), n.gzindex = 0;
      }
      n.status = B;
    }
    if (n.status === B) {
      if (n.gzhead.name) {
        let y = n.pending, Y;
        do {
          if (n.pending === n.pending_buf_size) {
            if (n.gzhead.hcrc && n.pending > y && (t.adler = V(t.adler, n.pending_buf, n.pending - y, y)), bt(t), n.pending !== 0)
              return n.last_flush = -1, w;
            y = 0;
          }
          n.gzindex < n.gzhead.name.length ? Y = n.gzhead.name.charCodeAt(n.gzindex++) & 255 : Y = 0, ct(n, Y);
        } while (Y !== 0);
        n.gzhead.hcrc && n.pending > y && (t.adler = V(t.adler, n.pending_buf, n.pending - y, y)), n.gzindex = 0;
      }
      n.status = m;
    }
    if (n.status === m) {
      if (n.gzhead.comment) {
        let y = n.pending, Y;
        do {
          if (n.pending === n.pending_buf_size) {
            if (n.gzhead.hcrc && n.pending > y && (t.adler = V(t.adler, n.pending_buf, n.pending - y, y)), bt(t), n.pending !== 0)
              return n.last_flush = -1, w;
            y = 0;
          }
          n.gzindex < n.gzhead.comment.length ? Y = n.gzhead.comment.charCodeAt(n.gzindex++) & 255 : Y = 0, ct(n, Y);
        } while (Y !== 0);
        n.gzhead.hcrc && n.pending > y && (t.adler = V(t.adler, n.pending_buf, n.pending - y, y));
      }
      n.status = dt;
    }
    if (n.status === dt) {
      if (n.gzhead.hcrc) {
        if (n.pending + 2 > n.pending_buf_size && (bt(t), n.pending !== 0))
          return n.last_flush = -1, w;
        ct(n, t.adler & 255), ct(n, t.adler >> 8 & 255), t.adler = 0;
      }
      if (n.status = nt, bt(t), n.pending !== 0)
        return n.last_flush = -1, w;
    }
    if (t.avail_in !== 0 || n.lookahead !== 0 || x !== tt && n.status !== ht) {
      let y = n.level === 0 ? I(n, x) : n.strategy === A ? J(n, x) : n.strategy === M ? P(n, x) : lt[n.level].func(n, x);
      if ((y === xt || y === gt) && (n.status = ht), y === at || y === xt)
        return t.avail_out === 0 && (n.last_flush = -1), w;
      if (y === yt && (x === it ? N(n) : x !== h && (rt(n, 0, 0, !1), x === i && (Et(n.head), n.lookahead === 0 && (n.strstart = 0, n.block_start = 0, n.insert = 0))), bt(t), t.avail_out === 0))
        return n.last_flush = -1, w;
    }
    return x !== E ? w : n.wrap <= 0 ? H : (n.wrap === 2 ? (ct(n, t.adler & 255), ct(n, t.adler >> 8 & 255), ct(n, t.adler >> 16 & 255), ct(n, t.adler >> 24 & 255), ct(n, t.total_in & 255), ct(n, t.total_in >> 8 & 255), ct(n, t.total_in >> 16 & 255), ct(n, t.total_in >> 24 & 255)) : (Lt(n, t.adler >>> 16), Lt(n, t.adler & 65535)), bt(t), n.wrap > 0 && (n.wrap = -n.wrap), n.pending !== 0 ? w : H);
  }, st = (t) => {
    if (pt(t))
      return G;
    const x = t.state.status;
    return t.state = null, x === nt ? zt(t, K) : w;
  }, Ft = (t, x) => {
    let n = x.length;
    if (pt(t))
      return G;
    const v = t.state, y = v.wrap;
    if (y === 2 || y === 1 && v.status !== F || v.lookahead)
      return G;
    if (y === 1 && (t.adler = C(t.adler, x, n, 0)), v.wrap = 0, n >= v.w_size) {
      y === 0 && (Et(v.head), v.strstart = 0, v.block_start = 0, v.insert = 0);
      let et = new Uint8Array(v.w_size);
      et.set(x.subarray(n - v.w_size, n), 0), x = et, n = v.w_size;
    }
    const Y = t.avail_in, _t = t.next_in, vt = t.input;
    for (t.avail_in = n, t.next_in = 0, t.input = x, e(v); v.lookahead >= u; ) {
      let et = v.strstart, wt = v.lookahead - (u - 1);
      do
        Zt(v, et), et++;
      while (--wt);
      v.strstart = et, v.lookahead = u - 1, e(v);
    }
    return v.strstart += v.lookahead, v.block_start = v.strstart, v.insert = v.lookahead, v.lookahead = 0, v.match_length = v.prev_length = u - 1, v.match_available = 0, t.next_in = _t, t.input = vt, t.avail_in = Y, v.wrap = y, w;
  };
  return Bt.deflateInit = It, Bt.deflateInit2 = Tt, Bt.deflateReset = ot, Bt.deflateResetKeep = At, Bt.deflateSetHeader = Rt, Bt.deflate = Ut, Bt.deflateEnd = st, Bt.deflateSetDictionary = Ft, Bt.deflateInfo = "pako deflate (from Nodeca project)", Bt;
}
var ae = {}, ze;
function De() {
  if (ze) return ae;
  ze = 1;
  const j = (rt, ft) => Object.prototype.hasOwnProperty.call(rt, ft);
  return ae.assign = function(rt) {
    const ft = Array.prototype.slice.call(arguments, 1);
    for (; ft.length; ) {
      const L = ft.shift();
      if (L) {
        if (typeof L != "object")
          throw new TypeError(L + "must be non-object");
        for (const N in L)
          j(L, N) && (rt[N] = L[N]);
      }
    }
    return rt;
  }, ae.flattenChunks = (rt) => {
    let ft = 0;
    for (let N = 0, C = rt.length; N < C; N++)
      ft += rt[N].length;
    const L = new Uint8Array(ft);
    for (let N = 0, C = 0, V = rt.length; N < V; N++) {
      let Q = rt[N];
      L.set(Q, C), C += Q.length;
    }
    return L;
  }, ae;
}
var ee = {}, Ee;
function Me() {
  if (Ee) return ee;
  Ee = 1;
  let j = !0;
  try {
    String.fromCharCode.apply(null, new Uint8Array(1));
  } catch {
    j = !1;
  }
  const rt = new Uint8Array(256);
  for (let L = 0; L < 256; L++)
    rt[L] = L >= 252 ? 6 : L >= 248 ? 5 : L >= 240 ? 4 : L >= 224 ? 3 : L >= 192 ? 2 : 1;
  rt[254] = rt[255] = 1, ee.string2buf = (L) => {
    if (typeof TextEncoder == "function" && TextEncoder.prototype.encode)
      return new TextEncoder().encode(L);
    let N, C, V, Q, tt, it = L.length, i = 0;
    for (Q = 0; Q < it; Q++)
      C = L.charCodeAt(Q), (C & 64512) === 55296 && Q + 1 < it && (V = L.charCodeAt(Q + 1), (V & 64512) === 56320 && (C = 65536 + (C - 55296 << 10) + (V - 56320), Q++)), i += C < 128 ? 1 : C < 2048 ? 2 : C < 65536 ? 3 : 4;
    for (N = new Uint8Array(i), tt = 0, Q = 0; tt < i; Q++)
      C = L.charCodeAt(Q), (C & 64512) === 55296 && Q + 1 < it && (V = L.charCodeAt(Q + 1), (V & 64512) === 56320 && (C = 65536 + (C - 55296 << 10) + (V - 56320), Q++)), C < 128 ? N[tt++] = C : C < 2048 ? (N[tt++] = 192 | C >>> 6, N[tt++] = 128 | C & 63) : C < 65536 ? (N[tt++] = 224 | C >>> 12, N[tt++] = 128 | C >>> 6 & 63, N[tt++] = 128 | C & 63) : (N[tt++] = 240 | C >>> 18, N[tt++] = 128 | C >>> 12 & 63, N[tt++] = 128 | C >>> 6 & 63, N[tt++] = 128 | C & 63);
    return N;
  };
  const ft = (L, N) => {
    if (N < 65534 && L.subarray && j)
      return String.fromCharCode.apply(null, L.length === N ? L : L.subarray(0, N));
    let C = "";
    for (let V = 0; V < N; V++)
      C += String.fromCharCode(L[V]);
    return C;
  };
  return ee.buf2string = (L, N) => {
    const C = N || L.length;
    if (typeof TextDecoder == "function" && TextDecoder.prototype.decode)
      return new TextDecoder().decode(L.subarray(0, N));
    let V, Q;
    const tt = new Array(C * 2);
    for (Q = 0, V = 0; V < C; ) {
      let it = L[V++];
      if (it < 128) {
        tt[Q++] = it;
        continue;
      }
      let i = rt[it];
      if (i > 4) {
        tt[Q++] = 65533, V += i - 1;
        continue;
      }
      for (it &= i === 2 ? 31 : i === 3 ? 15 : 7; i > 1 && V < C; )
        it = it << 6 | L[V++] & 63, i--;
      if (i > 1) {
        tt[Q++] = 65533;
        continue;
      }
      it < 65536 ? tt[Q++] = it : (it -= 65536, tt[Q++] = 55296 | it >> 10 & 1023, tt[Q++] = 56320 | it & 1023);
    }
    return ft(tt, Q);
  }, ee.utf8border = (L, N) => {
    N = N || L.length, N > L.length && (N = L.length);
    let C = N - 1;
    for (; C >= 0 && (L[C] & 192) === 128; )
      C--;
    return C < 0 || C === 0 ? N : C + rt[L[C]] > N ? C : N;
  }, ee;
}
var _e, Ae;
function Ce() {
  if (Ae) return _e;
  Ae = 1;
  function j() {
    this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
  }
  return _e = j, _e;
}
var ke;
function Fe() {
  if (ke) return Xt;
  ke = 1;
  const j = Le(), rt = De(), ft = Me(), L = Ue(), N = Ce(), C = Object.prototype.toString, {
    Z_NO_FLUSH: V,
    Z_SYNC_FLUSH: Q,
    Z_FULL_FLUSH: tt,
    Z_FINISH: it,
    Z_OK: i,
    Z_STREAM_END: E,
    Z_DEFAULT_COMPRESSION: h,
    Z_DEFAULT_STRATEGY: w,
    Z_DEFLATED: H
  } = he(), G = {
    level: h,
    method: H,
    chunkSize: 16384,
    windowBits: 15,
    memLevel: 8,
    strategy: w,
    legacyHash: !0
  };
  function K(A) {
    this.options = rt.assign({}, G, A || {});
    let M = this.options;
    M.raw && M.windowBits > 0 ? M.windowBits = -M.windowBits : M.gzip && M.windowBits > 0 && M.windowBits < 16 && (M.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new N(), this.strm.avail_out = 0;
    let c = j.deflateInit2(
      this.strm,
      M.level,
      M.method,
      M.windowBits,
      M.memLevel,
      M.strategy,
      M.legacyHash
    );
    if (c !== i)
      throw new Error(L[c]);
    if (M.header && j.deflateSetHeader(this.strm, M.header), M.dictionary) {
      let o;
      if (typeof M.dictionary == "string" ? o = ft.string2buf(M.dictionary) : C.call(M.dictionary) === "[object ArrayBuffer]" ? o = new Uint8Array(M.dictionary) : o = M.dictionary, c = j.deflateSetDictionary(this.strm, o), c !== i)
        throw new Error(L[c]);
      this._dict_set = !0;
    }
  }
  K.prototype.push = function(A, M) {
    const c = this.strm, o = this.options.chunkSize;
    let R, k;
    if (this.ended)
      return !1;
    for (M === ~~M ? k = M : k = M === !0 ? it : V, typeof A == "string" ? c.input = ft.string2buf(A) : C.call(A) === "[object ArrayBuffer]" ? c.input = new Uint8Array(A) : c.input = A, c.next_in = 0, c.avail_in = c.input.length; ; ) {
      if (c.avail_out === 0 && (c.output = new Uint8Array(o), c.next_out = 0, c.avail_out = o), (k === Q || k === tt) && c.avail_out <= 6) {
        this.onData(c.output.subarray(0, c.next_out)), c.avail_out = 0;
        continue;
      }
      if (R = j.deflate(c, k), R === E)
        return c.next_out > 0 && this.onData(c.output.subarray(0, c.next_out)), R = j.deflateEnd(this.strm), this.onEnd(R), this.ended = !0, R === i;
      if (c.avail_out === 0) {
        this.onData(c.output);
        continue;
      }
      if (k > 0 && c.next_out > 0) {
        this.onData(c.output.subarray(0, c.next_out)), c.avail_out = 0;
        continue;
      }
      if (c.avail_in === 0) break;
    }
    return !0;
  }, K.prototype.onData = function(A) {
    this.chunks.push(A);
  }, K.prototype.onEnd = function(A) {
    A === i && (this.result = rt.flattenChunks(this.chunks)), this.chunks = [], this.err = A, this.msg = this.strm.msg;
  };
  function z(A, M) {
    const c = new K(M);
    if (c.push(A, !0), c.err)
      throw c.msg || L[c.err];
    return c.result;
  }
  function X(A, M) {
    return M = M || {}, M.raw = !0, z(A, M);
  }
  function W(A, M) {
    return M = M || {}, M.gzip = !0, z(A, M);
  }
  return Xt.Deflate = K, Xt.deflate = z, Xt.deflateRaw = X, Xt.gzip = W, Xt.constants = he(), Xt;
}
var He = Fe(), Se = { deflate: He.deflate }, Ht = (function() {
  var j = { nextZero: function(i, E) {
    for (; i[E] != 0; ) E++;
    return E;
  }, readUshort: function(i, E) {
    return i[E] << 8 | i[E + 1];
  }, writeUshort: function(i, E, h) {
    i[E] = h >> 8 & 255, i[E + 1] = 255 & h;
  }, readUint: function(i, E) {
    return 16777216 * i[E] + (i[E + 1] << 16 | i[E + 2] << 8 | i[E + 3]);
  }, writeUint: function(i, E, h) {
    i[E] = h >> 24 & 255, i[E + 1] = h >> 16 & 255, i[E + 2] = h >> 8 & 255, i[E + 3] = 255 & h;
  }, readASCII: function(i, E, h) {
    for (var w = "", H = 0; H < h; H++) w += String.fromCharCode(i[E + H]);
    return w;
  }, writeASCII: function(i, E, h) {
    for (var w = 0; w < h.length; w++) i[E + w] = h.charCodeAt(w);
  }, readBytes: function(i, E, h) {
    for (var w = [], H = 0; H < h; H++) w.push(i[E + H]);
    return w;
  }, pad: function(i) {
    return i.length < 2 ? "0" + i : i;
  }, readUTF8: function(i, E, h) {
    for (var w, H = "", G = 0; G < h; G++) H += "%" + j.pad(i[E + G].toString(16));
    try {
      w = decodeURIComponent(H);
    } catch {
      return j.readASCII(i, E, h);
    }
    return w;
  } };
  function rt(i, E, h, w) {
    var H = E * h, G = C(w), K = Math.ceil(E * G / 8), z = new Uint8Array(4 * H), X = new Uint32Array(z.buffer), W = w.ctype, A = w.depth, M = j.readUshort;
    if (W == 6) {
      var c = H << 2;
      if (A == 8) for (var o = 0; o < c; o += 4) z[o] = i[o], z[o + 1] = i[o + 1], z[o + 2] = i[o + 2], z[o + 3] = i[o + 3];
      if (A == 16) for (o = 0; o < c; o++) z[o] = i[o << 1];
    } else if (W == 2) {
      var R = w.tabs.tRNS;
      if (R == null) {
        if (A == 8) for (o = 0; o < H; o++) {
          var k = 3 * o;
          X[o] = 255 << 24 | i[k + 2] << 16 | i[k + 1] << 8 | i[k];
        }
        if (A == 16) for (o = 0; o < H; o++)
          k = 6 * o, X[o] = 255 << 24 | i[k + 4] << 16 | i[k + 2] << 8 | i[k];
      } else {
        var $ = R[0], r = R[1], l = R[2];
        if (A == 8) for (o = 0; o < H; o++) {
          var _ = o << 2;
          k = 3 * o, X[o] = 255 << 24 | i[k + 2] << 16 | i[k + 1] << 8 | i[k], i[k] == $ && i[k + 1] == r && i[k + 2] == l && (z[_ + 3] = 0);
        }
        if (A == 16) for (o = 0; o < H; o++)
          _ = o << 2, k = 6 * o, X[o] = 255 << 24 | i[k + 4] << 16 | i[k + 2] << 8 | i[k], M(i, k) == $ && M(i, k + 2) == r && M(i, k + 4) == l && (z[_ + 3] = 0);
      }
    } else if (W == 3) {
      var f = w.tabs.PLTE, s = w.tabs.tRNS, g = s ? s.length : 0;
      if (A == 1) for (var b = 0; b < h; b++) {
        var p = b * K, a = b * E;
        for (o = 0; o < E; o++) {
          _ = a + o << 2;
          var u = 3 * (d = i[p + (o >> 3)] >> 7 - (7 & o) & 1);
          z[_] = f[u], z[_ + 1] = f[u + 1], z[_ + 2] = f[u + 2], z[_ + 3] = d < g ? s[d] : 255;
        }
      }
      if (A == 2) for (b = 0; b < h; b++) for (p = b * K, a = b * E, o = 0; o < E; o++)
        _ = a + o << 2, u = 3 * (d = i[p + (o >> 2)] >> 6 - ((3 & o) << 1) & 3), z[_] = f[u], z[_ + 1] = f[u + 1], z[_ + 2] = f[u + 2], z[_ + 3] = d < g ? s[d] : 255;
      if (A == 4) for (b = 0; b < h; b++) for (p = b * K, a = b * E, o = 0; o < E; o++)
        _ = a + o << 2, u = 3 * (d = i[p + (o >> 1)] >> 4 - ((1 & o) << 2) & 15), z[_] = f[u], z[_ + 1] = f[u + 1], z[_ + 2] = f[u + 2], z[_ + 3] = d < g ? s[d] : 255;
      if (A == 8) for (o = 0; o < H; o++) {
        var d;
        _ = o << 2, u = 3 * (d = i[o]), z[_] = f[u], z[_ + 1] = f[u + 1], z[_ + 2] = f[u + 2], z[_ + 3] = d < g ? s[d] : 255;
      }
    } else if (W == 4) {
      if (A == 8) for (o = 0; o < H; o++) {
        _ = o << 2;
        var S = i[T = o << 1];
        z[_] = S, z[_ + 1] = S, z[_ + 2] = S, z[_ + 3] = i[T + 1];
      }
      if (A == 16) for (o = 0; o < H; o++) {
        var T;
        _ = o << 2, S = i[T = o << 2], z[_] = S, z[_ + 1] = S, z[_ + 2] = S, z[_ + 3] = i[T + 2];
      }
    } else if (W == 0) for ($ = w.tabs.tRNS ? w.tabs.tRNS : -1, b = 0; b < h; b++) {
      var F = b * K, Z = b * E;
      if (A == 1) for (var U = 0; U < E; U++) {
        var B = (S = 255 * (i[F + (U >>> 3)] >>> 7 - (7 & U) & 1)) == 255 * $ ? 0 : 255;
        X[Z + U] = B << 24 | S << 16 | S << 8 | S;
      }
      else if (A == 2) for (U = 0; U < E; U++)
        B = (S = 85 * (i[F + (U >>> 2)] >>> 6 - ((3 & U) << 1) & 3)) == 85 * $ ? 0 : 255, X[Z + U] = B << 24 | S << 16 | S << 8 | S;
      else if (A == 4) for (U = 0; U < E; U++)
        B = (S = 17 * (i[F + (U >>> 1)] >>> 4 - ((1 & U) << 2) & 15)) == 17 * $ ? 0 : 255, X[Z + U] = B << 24 | S << 16 | S << 8 | S;
      else if (A == 8) for (U = 0; U < E; U++)
        B = (S = i[F + U]) == $ ? 0 : 255, X[Z + U] = B << 24 | S << 16 | S << 8 | S;
      else if (A == 16) for (U = 0; U < E; U++)
        S = i[F + (U << 1)], B = M(i, F + (U << 1)) == $ ? 0 : 255, X[Z + U] = B << 24 | S << 16 | S << 8 | S;
    }
    return z;
  }
  function ft(i, E, h, w) {
    var H = C(i), G = Math.ceil(h * H / 8), K = new Uint8Array((G + 1 + i.interlace) * w);
    return E = i.tabs.CgBI ? N(E, K) : L(E, K), i.interlace == 0 ? E = V(E, i, 0, h, w) : i.interlace == 1 && (E = (function(z, X) {
      for (var W = X.width, A = X.height, M = C(X), c = M >> 3, o = Math.ceil(W * M / 8), R = new Uint8Array(A * o), k = 0, $ = [0, 0, 4, 0, 2, 0, 1], r = [0, 4, 0, 2, 0, 1, 0], l = [8, 8, 8, 4, 4, 2, 2], _ = [8, 8, 4, 4, 2, 2, 1], f = 0; f < 7; ) {
        for (var s = l[f], g = _[f], b = 0, p = 0, a = $[f]; a < A; ) a += s, p++;
        for (var u = r[f]; u < W; ) u += g, b++;
        var d = Math.ceil(b * M / 8);
        V(z, X, k, b, p);
        for (var S = 0, T = $[f]; T < A; ) {
          for (var F = r[f], Z = k + S * d << 3; F < W; ) {
            var U;
            if (M == 1 && (U = (U = z[Z >> 3]) >> 7 - (7 & Z) & 1, R[T * o + (F >> 3)] |= U << 7 - (7 & F)), M == 2 && (U = (U = z[Z >> 3]) >> 6 - (7 & Z) & 3, R[T * o + (F >> 2)] |= U << 6 - ((3 & F) << 1)), M == 4 && (U = (U = z[Z >> 3]) >> 4 - (7 & Z) & 15, R[T * o + (F >> 1)] |= U << 4 - ((1 & F) << 2)), M >= 8) for (var B = T * o + F * c, m = 0; m < c; m++) R[B + m] = z[(Z >> 3) + m];
            Z += M, F += g;
          }
          S++, T += s;
        }
        b * p != 0 && (k += p * (1 + d)), f += 1;
      }
      return R;
    })(E, i)), E;
  }
  function L(i, E) {
    return N(new Uint8Array(i.buffer, 2, i.length - 6), E);
  }
  var N = (function() {
    var i, E, h = (i = Uint16Array, E = Uint32Array, { m: new i(16), v: new i(16), d: [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], o: [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 999, 999, 999], z: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0], B: new i(32), p: [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 65535, 65535], w: [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0], h: new E(32), g: new i(512), s: [], A: new i(32), t: [], k: new i(32768), c: [], a: [], n: new i(32768), e: [], C: new i(512), b: [], i: new i(32768), r: new E(286), f: new E(30), l: new E(19), u: new E(15e3), q: new i(65536), j: new i(32768) });
    function w(c, o) {
      for (var R, k, $, r, l = c.length, _ = h.v, f = 0; f <= o; f++) _[f] = 0;
      for (f = 1; f < l; f += 2) _[c[f]]++;
      var s = h.m;
      for (R = 0, _[0] = 0, k = 1; k <= o; k++) R = R + _[k - 1] << 1, s[k] = R;
      for ($ = 0; $ < l; $ += 2) (r = c[$ + 1]) != 0 && (c[$] = s[r], s[r]++);
    }
    function H(c, o, R) {
      for (var k = c.length, $ = h.i, r = 0; r < k; r += 2) if (c[r + 1] != 0) for (var l = r >> 1, _ = c[r + 1], f = l << 4 | _, s = o - _, g = c[r] << s, b = g + (1 << s); g != b; )
        R[$[g] >>> 15 - o] = f, g++;
    }
    function G(c, o) {
      for (var R = h.i, k = 15 - o, $ = 0; $ < c.length; $ += 2) {
        var r = c[$] << o - c[$ + 1];
        c[$] = R[r] >>> k;
      }
    }
    function K(c, o, R) {
      return (c[o >>> 3] | c[1 + (o >>> 3)] << 8) >>> (7 & o) & (1 << R) - 1;
    }
    function z(c, o, R) {
      return (c[o >>> 3] | c[1 + (o >>> 3)] << 8 | c[2 + (o >>> 3)] << 16) >>> (7 & o) & (1 << R) - 1;
    }
    function X(c, o) {
      return (c[o >>> 3] | c[1 + (o >>> 3)] << 8 | c[2 + (o >>> 3)] << 16) >>> (7 & o);
    }
    function W(c, o) {
      var R = c.length;
      if (o <= R) return c;
      var k = new Uint8Array(Math.max(R << 1, o));
      return k.set(c, 0), k;
    }
    function A(c, o, R, k, $, r) {
      for (var l = 0; l < R; ) {
        var _ = c[X(k, $) & o];
        $ += 15 & _;
        var f = _ >>> 4;
        if (f <= 15) r[l] = f, l++;
        else {
          var s = 0, g = 0;
          f == 16 ? (g = 3 + K(k, $, 2), $ += 2, s = r[l - 1]) : f == 17 ? (g = 3 + K(k, $, 3), $ += 3) : f == 18 && (g = 11 + K(k, $, 7), $ += 7);
          for (var b = l + g; l < b; ) r[l] = s, l++;
        }
      }
      return $;
    }
    function M(c, o, R, k) {
      for (var $ = 0, r = 0, l = k.length >>> 1; r < R; ) {
        var _ = c[r + o];
        k[r << 1] = 0, k[1 + (r << 1)] = _, _ > $ && ($ = _), r++;
      }
      for (; r < l; ) k[r << 1] = 0, k[1 + (r << 1)] = 0, r++;
      return $;
    }
    return (function() {
      for (var c = 0; c < 32768; c++) {
        var o = c;
        o = (4278255360 & (o = (4042322160 & (o = (3435973836 & (o = (2863311530 & o) >>> 1 | (1431655765 & o) << 1)) >>> 2 | (858993459 & o) << 2)) >>> 4 | (252645135 & o) << 4)) >>> 8 | (16711935 & o) << 8, h.i[c] = (o >>> 16 | o << 16) >>> 17;
      }
      function R(k, $, r) {
        for (; $-- != 0; ) k.push(0, r);
      }
      for (c = 0; c < 32; c++) h.B[c] = h.o[c] << 3 | h.z[c], h.h[c] = h.p[c] << 4 | h.w[c];
      R(h.s, 144, 8), R(h.s, 112, 9), R(h.s, 24, 7), R(h.s, 8, 8), w(h.s, 9), H(h.s, 9, h.g), G(h.s, 9), R(h.t, 32, 5), w(h.t, 5), H(h.t, 5, h.A), G(h.t, 5), R(h.b, 19, 0), R(h.c, 286, 0), R(h.e, 30, 0), R(h.a, 320, 0);
    })(), function(c, o) {
      var R, k, $ = Uint8Array, r = 0, l = 0, _ = 0, f = 0, s = 0, g = 0, b = 0, p = 0, a = 0;
      if (c[0] == 3 && c[1] == 0) return o || new $(0);
      var u = o == null;
      for (u && (o = new $(c.length >>> 2 << 3)); r == 0; ) if (r = z(c, a, 1), l = z(c, a + 1, 2), a += 3, l != 0) {
        if (u && (o = W(o, p + (1 << 17))), l == 1 && (R = h.g, k = h.A, g = 511, b = 31), l == 2) {
          _ = K(c, a, 5) + 257, f = K(c, a + 5, 5) + 1, s = K(c, a + 10, 4) + 4, a += 14;
          for (var d = 1, S = 0; S < 38; S += 2) h.b[S] = 0, h.b[S + 1] = 0;
          for (S = 0; S < s; S++) {
            var T = K(c, a + 3 * S, 3);
            h.b[1 + (h.d[S] << 1)] = T, T > d && (d = T);
          }
          a += 3 * s, w(h.b, d), H(h.b, d, h.C), R = h.k, k = h.n, a = A(h.C, (1 << d) - 1, _ + f, c, a, h.a);
          var F = M(h.a, 0, _, h.c);
          g = (1 << F) - 1;
          var Z = M(h.a, _, f, h.e);
          b = (1 << Z) - 1, w(h.c, F), H(h.c, F, R), w(h.e, Z), H(h.e, Z, k);
        }
        for (; ; ) {
          var U = R[X(c, a) & g];
          a += 15 & U;
          var B = U >>> 4;
          if (!(B >>> 8)) o[p++] = B;
          else {
            if (B == 256) break;
            var m = p + B - 254;
            if (B > 264) {
              var dt = h.B[B - 257];
              m = p + (dt >>> 3) + K(c, a, 7 & dt), a += 7 & dt;
            }
            var nt = k[X(c, a) & b];
            a += 15 & nt;
            var ht = nt >>> 4, at = h.h[ht], yt = (at >>> 4) + z(c, a, 15 & at);
            for (a += 15 & at, u && (o = W(o, p + (1 << 17))); p < m; ) o[p] = o[p++ - yt], o[p] = o[p++ - yt], o[p] = o[p++ - yt], o[p] = o[p++ - yt];
            p = m;
          }
        }
      } else {
        7 & a && (a += 8 - (7 & a));
        var xt = 4 + (a >>> 3), gt = c[xt - 4] | c[xt - 3] << 8;
        u && (o = W(o, p + gt)), o.set(new $(c.buffer, c.byteOffset + xt, gt), p), a = xt + gt << 3, p += gt;
      }
      return o.length == p ? o : o.slice(0, p);
    };
  })();
  function C(i) {
    return [1, null, 3, 1, 2, null, 4][i.ctype] * i.depth;
  }
  function V(i, E, h, w, H) {
    var G = C(E), K = Math.ceil(w * G / 8);
    G = Math.ceil(G / 8);
    var z, X, W = i[h], A = 0;
    if (W > 1 && (i[h] = [0, 0, 1][W - 2]), W == 3) for (A = G; A < K; A++) i[A + 1] = i[A + 1] + (i[A + 1 - G] >>> 1) & 255;
    for (var M = 0; M < H; M++) if (A = 0, (W = i[(X = (z = h + M * K) + M + 1) - 1]) == 0) for (; A < K; A++) i[z + A] = i[X + A];
    else if (W == 1) {
      for (; A < G; A++) i[z + A] = i[X + A];
      for (; A < K; A++) i[z + A] = i[X + A] + i[z + A - G];
    } else if (W == 2) for (; A < K; A++) i[z + A] = i[X + A] + i[z + A - K];
    else if (W == 3) {
      for (; A < G; A++) i[z + A] = i[X + A] + (i[z + A - K] >>> 1);
      for (; A < K; A++) i[z + A] = i[X + A] + (i[z + A - K] + i[z + A - G] >>> 1);
    } else {
      for (; A < G; A++) i[z + A] = i[X + A] + Q(0, i[z + A - K], 0);
      for (; A < K; A++) i[z + A] = i[X + A] + Q(i[z + A - G], i[z + A - K], i[z + A - G - K]);
    }
    return i;
  }
  function Q(i, E, h) {
    var w = i + E - h, H = w - i, G = w - E, K = w - h;
    return H * H <= G * G && H * H <= K * K ? i : G * G <= K * K ? E : h;
  }
  function tt(i, E, h) {
    h.width = j.readUint(i, E), E += 4, h.height = j.readUint(i, E), E += 4, h.depth = i[E], E++, h.ctype = i[E], E++, h.compress = i[E], E++, h.filter = i[E], E++, h.interlace = i[E], E++;
  }
  function it(i, E, h, w, H, G, K, z, X) {
    for (var W = Math.min(E, H), A = Math.min(h, G), M = 0, c = 0, o = 0; o < A; o++) for (var R = 0; R < W; R++) if (K >= 0 && z >= 0 ? (M = o * E + R << 2, c = (z + o) * H + K + R << 2) : (M = (-z + o) * E - K + R << 2, c = o * H + R << 2), X == 0) w[c] = i[M], w[c + 1] = i[M + 1], w[c + 2] = i[M + 2], w[c + 3] = i[M + 3];
    else if (X == 1) {
      var k = i[M + 3] * 0.00392156862745098, $ = i[M] * k, r = i[M + 1] * k, l = i[M + 2] * k, _ = w[c + 3] * (1 / 255), f = w[c] * _, s = w[c + 1] * _, g = w[c + 2] * _, b = 1 - k, p = k + _ * b, a = p == 0 ? 0 : 1 / p;
      w[c + 3] = 255 * p, w[c + 0] = ($ + f * b) * a, w[c + 1] = (r + s * b) * a, w[c + 2] = (l + g * b) * a;
    } else if (X == 2)
      k = i[M + 3], $ = i[M], r = i[M + 1], l = i[M + 2], _ = w[c + 3], f = w[c], s = w[c + 1], g = w[c + 2], k == _ && $ == f && r == s && l == g ? (w[c] = 0, w[c + 1] = 0, w[c + 2] = 0, w[c + 3] = 0) : (w[c] = $, w[c + 1] = r, w[c + 2] = l, w[c + 3] = k);
    else if (X == 3) {
      if (k = i[M + 3], $ = i[M], r = i[M + 1], l = i[M + 2], _ = w[c + 3], f = w[c], s = w[c + 1], g = w[c + 2], k == _ && $ == f && r == s && l == g) continue;
      if (k < 220 && _ > 20) return !1;
    }
    return !0;
  }
  return { decode: function(i) {
    for (var E, h = new Uint8Array(i), w = 8, H = j, G = H.readUshort, K = H.readUint, z = { tabs: {}, frames: [] }, X = new Uint8Array(h.length), W = 0, A = 0, M = [137, 80, 78, 71, 13, 10, 26, 10], c = 0; c < 8; c++) if (h[c] != M[c]) throw "The input is not a PNG file!";
    for (; w < h.length; ) {
      var o = H.readUint(h, w);
      w += 4;
      var R = H.readASCII(h, w, 4);
      if (w += 4, R == "IHDR") tt(h, w, z);
      else if (R == "iCCP") {
        for (var k = w; h[k] != 0; ) k++;
        H.readASCII(h, w, k - w), h[k + 1];
        var $ = h.slice(k + 2, w + o), r = null;
        try {
          r = L($);
        } catch {
          r = N($);
        }
        z.tabs[R] = r;
      } else if (R == "CgBI") z.tabs[R] = h.slice(w, w + 4);
      else if (R == "IDAT") {
        for (c = 0; c < o; c++) X[W + c] = h[w + c];
        W += o;
      } else if (R == "acTL") z.tabs[R] = { num_frames: K(h, w), num_plays: K(h, w + 4) }, E = new Uint8Array(h.length);
      else if (R == "fcTL") {
        var l;
        A != 0 && ((l = z.frames[z.frames.length - 1]).data = ft(z, E.slice(0, A), l.rect.width, l.rect.height), A = 0);
        var _ = { x: K(h, w + 12), y: K(h, w + 16), width: K(h, w + 4), height: K(h, w + 8) }, f = G(h, w + 22);
        f = G(h, w + 20) / (f == 0 ? 100 : f);
        var s = { rect: _, delay: Math.round(1e3 * f), dispose: h[w + 24], blend: h[w + 25] };
        z.frames.push(s);
      } else if (R == "fdAT") {
        for (c = 0; c < o - 4; c++) E[A + c] = h[w + c + 4];
        A += o - 4;
      } else if (R == "pHYs") z.tabs[R] = [H.readUint(h, w), H.readUint(h, w + 4), h[w + 8]];
      else if (R == "cHRM")
        for (z.tabs[R] = [], c = 0; c < 8; c++) z.tabs[R].push(H.readUint(h, w + 4 * c));
      else if (R == "tEXt" || R == "zTXt") {
        z.tabs[R] == null && (z.tabs[R] = {});
        var g = H.nextZero(h, w), b = H.readASCII(h, w, g - w), p = w + o - g - 1;
        if (R == "tEXt") d = H.readASCII(h, g + 1, p);
        else {
          var a = L(h.slice(g + 2, g + 2 + p));
          d = H.readUTF8(a, 0, a.length);
        }
        z.tabs[R][b] = d;
      } else if (R == "iTXt") {
        z.tabs[R] == null && (z.tabs[R] = {}), g = 0, k = w, g = H.nextZero(h, k), b = H.readASCII(h, k, g - k);
        var u = h[k = g + 1];
        h[k + 1], k += 2, g = H.nextZero(h, k), H.readASCII(h, k, g - k), k = g + 1, g = H.nextZero(h, k), H.readUTF8(h, k, g - k);
        var d;
        p = o - ((k = g + 1) - w), u == 0 ? d = H.readUTF8(h, k, p) : (a = L(h.slice(k, k + p)), d = H.readUTF8(a, 0, a.length)), z.tabs[R][b] = d;
      } else if (R == "PLTE") z.tabs[R] = H.readBytes(h, w, o);
      else if (R == "hIST") {
        var S = z.tabs.PLTE.length / 3;
        for (z.tabs[R] = [], c = 0; c < S; c++) z.tabs[R].push(G(h, w + 2 * c));
      } else if (R == "tRNS") z.ctype == 3 ? z.tabs[R] = H.readBytes(h, w, o) : z.ctype == 0 ? z.tabs[R] = G(h, w) : z.ctype == 2 && (z.tabs[R] = [G(h, w), G(h, w + 2), G(h, w + 4)]);
      else if (R == "gAMA") z.tabs[R] = H.readUint(h, w) / 1e5;
      else if (R == "sRGB") z.tabs[R] = h[w];
      else if (R == "bKGD") z.ctype == 0 || z.ctype == 4 ? z.tabs[R] = [G(h, w)] : z.ctype == 2 || z.ctype == 6 ? z.tabs[R] = [G(h, w), G(h, w + 2), G(h, w + 4)] : z.ctype == 3 && (z.tabs[R] = h[w]);
      else if (R == "IEND") break;
      w += o, H.readUint(h, w), w += 4;
    }
    return A != 0 && ((l = z.frames[z.frames.length - 1]).data = ft(z, E.slice(0, A), l.rect.width, l.rect.height)), z.data = ft(z, X, z.width, z.height), delete z.compress, delete z.interlace, delete z.filter, z;
  }, toRGBA8: function(i) {
    var E = i.width, h = i.height;
    if (i.tabs.acTL == null) return [rt(i.data, E, h, i).buffer];
    var w = [];
    i.frames[0].data == null && (i.frames[0].data = i.data);
    for (var H = E * h * 4, G = new Uint8Array(H), K = new Uint8Array(H), z = new Uint8Array(H), X = 0; X < i.frames.length; X++) {
      var W = i.frames[X], A = W.rect.x, M = W.rect.y, c = W.rect.width, o = W.rect.height, R = rt(W.data, c, o, i);
      if (X != 0) for (var k = 0; k < H; k++) z[k] = G[k];
      if (W.blend == 0 ? it(R, c, o, G, E, h, A, M, 0) : W.blend == 1 && it(R, c, o, G, E, h, A, M, 1), w.push(G.buffer.slice(0)), W.dispose != 0) {
        if (W.dispose == 1) it(K, c, o, G, E, h, A, M, 0);
        else if (W.dispose == 2) for (k = 0; k < H; k++) G[k] = z[k];
      }
    }
    return w;
  }, _paeth: Q, _copyTile: it, _bin: j };
})();
(function() {
  var j = Ht._copyTile, rt = Ht._bin, ft = Ht._paeth, L = { table: (function() {
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
  function N(r, l, _, f) {
    l[_] += r[0] * f >> 4, l[_ + 1] += r[1] * f >> 4, l[_ + 2] += r[2] * f >> 4, l[_ + 3] += r[3] * f >> 4;
  }
  function C(r) {
    return Math.max(0, Math.min(255, r));
  }
  function V(r, l) {
    var _ = r[0] - l[0], f = r[1] - l[1], s = r[2] - l[2], g = r[3] - l[3];
    return _ * _ + f * f + s * s + g * g;
  }
  function Q(r, l, _, f, s, g, b) {
    b == null && (b = 1);
    for (var p = f.length, a = [], u = 0; u < p; u++) {
      var d = f[u];
      a.push([d >>> 0 & 255, d >>> 8 & 255, d >>> 16 & 255, d >>> 24 & 255]);
    }
    for (u = 0; u < p; u++) for (var S = 4294967295, T = 0, F = 0; F < p; F++) {
      var Z = V(a[u], a[F]);
      F != u && Z < S && (S = Z, T = F);
    }
    var U = new Uint32Array(s.buffer), B = new Int16Array(l * _ * 4), m = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
    for (u = 0; u < m.length; u++) m[u] = 255 * ((m[u] + 0.5) / 16 - 0.5);
    for (var dt = 0; dt < _; dt++) for (var nt = 0; nt < l; nt++) {
      var ht;
      u = 4 * (dt * l + nt), b != 2 ? ht = [C(r[u] + B[u]), C(r[u + 1] + B[u + 1]), C(r[u + 2] + B[u + 2]), C(r[u + 3] + B[u + 3])] : (Z = m[4 * (3 & dt) + (3 & nt)], ht = [C(r[u] + Z), C(r[u + 1] + Z), C(r[u + 2] + Z), C(r[u + 3] + Z)]), T = 0;
      var at = 16777215;
      for (F = 0; F < p; F++) {
        var yt = V(ht, a[F]);
        yt < at && (at = yt, T = F);
      }
      var xt = a[T], gt = [ht[0] - xt[0], ht[1] - xt[1], ht[2] - xt[2], ht[3] - xt[3]];
      b == 1 && (nt != l - 1 && N(gt, B, u + 4, 7), dt != _ - 1 && (nt != 0 && N(gt, B, u + 4 * l - 4, 3), N(gt, B, u + 4 * l, 5), nt != l - 1 && N(gt, B, u + 4 * l + 4, 1))), g[u >> 2] = T, U[u >> 2] = f[T];
    }
  }
  function tt(r, l, _, f, s) {
    s == null && (s = {});
    var g, b = L.crc, p = rt.writeUint, a = rt.writeUshort, u = rt.writeASCII, d = 8, S = r.frames.length > 1, T = !1, F = 33 + (S ? 20 : 0);
    if (s.sRGB != null && (F += 13), s.pHYs != null && (F += 21), s.iCCP != null && (F += 21 + (g = Se.deflate(s.iCCP)).length + 4), r.ctype == 3) {
      for (var Z = r.plte.length, U = 0; U < Z; U++) r.plte[U] >>> 24 != 255 && (T = !0);
      F += 8 + 3 * Z + 4 + (T ? 8 + 1 * Z + 4 : 0);
    }
    for (var B = 0; B < r.frames.length; B++)
      S && (F += 38), F += (zt = r.frames[B]).cimg.length + 12, B != 0 && (F += 4);
    F += 12;
    var m = new Uint8Array(F), dt = [137, 80, 78, 71, 13, 10, 26, 10];
    for (U = 0; U < 8; U++) m[U] = dt[U];
    if (p(m, d, 13), u(m, d += 4, "IHDR"), p(m, d += 4, l), p(m, d += 4, _), m[d += 4] = r.depth, m[++d] = r.ctype, m[++d] = 0, m[++d] = 0, m[++d] = 0, p(m, ++d, b(m, d - 17, 17)), d += 4, s.sRGB != null && (p(m, d, 1), u(m, d += 4, "sRGB"), m[d += 4] = s.sRGB, p(m, ++d, b(m, d - 5, 5)), d += 4), s.iCCP != null) {
      var nt = 13 + g.length;
      p(m, d, nt), u(m, d += 4, "iCCP"), u(m, d += 4, "ICC profile"), d += 11, d += 2, m.set(g, d), p(m, d += g.length, b(m, d - (nt + 4), nt + 4)), d += 4;
    }
    if (s.pHYs != null && (p(m, d, 9), u(m, d += 4, "pHYs"), p(m, d += 4, s.pHYs[0]), p(m, d += 4, s.pHYs[1]), m[d += 4] = s.pHYs[2], p(m, ++d, b(m, d - 13, 13)), d += 4), S && (p(m, d, 8), u(m, d += 4, "acTL"), p(m, d += 4, r.frames.length), p(m, d += 4, s.loop != null ? s.loop : 0), p(m, d += 4, b(m, d - 12, 12)), d += 4), r.ctype == 3) {
      for (p(m, d, 3 * (Z = r.plte.length)), u(m, d += 4, "PLTE"), d += 4, U = 0; U < Z; U++) {
        var ht = 3 * U, at = r.plte[U], yt = 255 & at, xt = at >>> 8 & 255, gt = at >>> 16 & 255;
        m[d + ht + 0] = yt, m[d + ht + 1] = xt, m[d + ht + 2] = gt;
      }
      if (p(m, d += 3 * Z, b(m, d - 3 * Z - 4, 3 * Z + 4)), d += 4, T) {
        for (p(m, d, Z), u(m, d += 4, "tRNS"), d += 4, U = 0; U < Z; U++) m[d + U] = r.plte[U] >>> 24 & 255;
        p(m, d += Z, b(m, d - Z - 4, Z + 4)), d += 4;
      }
    }
    var Dt = 0;
    for (B = 0; B < r.frames.length; B++) {
      var zt = r.frames[B];
      S && (p(m, d, 26), u(m, d += 4, "fcTL"), p(m, d += 4, Dt++), p(m, d += 4, zt.rect.width), p(m, d += 4, zt.rect.height), p(m, d += 4, zt.rect.x), p(m, d += 4, zt.rect.y), a(m, d += 4, f[B]), a(m, d += 2, 1e3), m[d += 2] = zt.dispose, m[++d] = zt.blend, p(m, ++d, b(m, d - 30, 30)), d += 4);
      var Mt = zt.cimg;
      p(m, d, (Z = Mt.length) + (B == 0 ? 0 : 4));
      var Et = d += 4;
      u(m, d, B == 0 ? "IDAT" : "fdAT"), d += 4, B != 0 && (p(m, d, Dt++), d += 4), m.set(Mt, d), p(m, d += Z, b(m, Et, d - Et)), d += 4;
    }
    return p(m, d, 0), u(m, d += 4, "IEND"), p(m, d += 4, b(m, d - 4, 4)), d += 4, m.buffer;
  }
  function it(r, l, _) {
    for (var f = 0; f < r.frames.length; f++) {
      var s = r.frames[f];
      s.rect.width;
      var g = s.rect.height, b = new Uint8Array(g * s.bpl + g);
      s.cimg = w(s.img, g, s.bpp, s.bpl, b, l, _);
    }
  }
  function i(r, l, _, f, s) {
    for (var g = s[0], b = s[1], p = s[2], a = s[3], u = s[4], d = s[5], S = 6, T = 8, F = 255, Z = 0; Z < r.length; Z++) for (var U = new Uint8Array(r[Z]), B = U.length, m = 0; m < B; m += 4) F &= U[m + 3];
    var dt = F != 255, nt = (function(pt, At, ot, Rt, Tt, It) {
      for (var Ut = [], st = 0; st < pt.length; st++) {
        var Ft, t = new Uint8Array(pt[st]), x = new Uint32Array(t.buffer), n = 0, v = 0, y = At, Y = ot, _t = Rt ? 1 : 0;
        if (st != 0) {
          for (var vt = It || Rt || st == 1 || Ut[st - 2].dispose != 0 ? 1 : 2, et = 0, wt = 1e9, Gt = 0; Gt < vt; Gt++) {
            for (var ne = new Uint8Array(pt[st - 1 - Gt]), Jt = new Uint32Array(pt[st - 1 - Gt]), Ot = At, Nt = ot, Vt = -1, Qt = -1, Kt = 0; Kt < ot; Kt++) for (var Yt = 0; Yt < At; Yt++)
              x[te = Kt * At + Yt] != Jt[te] && (Yt < Ot && (Ot = Yt), Yt > Vt && (Vt = Yt), Kt < Nt && (Nt = Kt), Kt > Qt && (Qt = Kt));
            Vt == -1 && (Ot = Nt = Vt = Qt = 0), Tt && (1 & ~Ot || Ot--, 1 & ~Nt || Nt--);
            var ce = (Vt - Ot + 1) * (Qt - Nt + 1);
            ce < wt && (wt = ce, et = Gt, n = Ot, v = Nt, y = Vt - Ot + 1, Y = Qt - Nt + 1);
          }
          ne = new Uint8Array(pt[st - 1 - et]), et == 1 && (Ut[st - 1].dispose = 2), Ft = new Uint8Array(y * Y * 4), j(ne, At, ot, Ft, y, Y, -n, -v, 0), (_t = j(t, At, ot, Ft, y, Y, -n, -v, 3) ? 1 : 0) == 1 ? h(t, At, ot, Ft, { x: n, y: v, width: y, height: Y }) : j(t, At, ot, Ft, y, Y, -n, -v, 0);
        } else Ft = t.slice(0);
        Ut.push({ rect: { x: n, y: v, width: y, height: Y }, img: Ft, blend: _t, dispose: 0 });
      }
      if (Rt) {
        for (st = 0; st < Ut.length; st++)
          if ((re = Ut[st]).blend != 1) {
            var Wt = re.rect, Pt = Ut[st - 1].rect, de = Math.min(Wt.x, Pt.x), ue = Math.min(Wt.y, Pt.y), se = { x: de, y: ue, width: Math.max(Wt.x + Wt.width, Pt.x + Pt.width) - de, height: Math.max(Wt.y + Wt.height, Pt.y + Pt.height) - ue };
            Ut[st - 1].dispose = 1, st - 1 != 0 && E(pt, At, ot, Ut, st - 1, se, Tt), E(pt, At, ot, Ut, st, se, Tt);
          }
      }
      if (pt.length != 1) for (var te = 0; te < Ut.length; te++) {
        var re;
        (re = Ut[te]).rect.width * re.rect.height;
      }
      return Ut;
    })(r, l, _, g, b, p), ht = {}, at = [], yt = [];
    if (f != 0) {
      var xt = [];
      for (m = 0; m < nt.length; m++) xt.push(nt[m].img.buffer);
      var gt = (function(pt) {
        for (var At = 0, ot = 0; ot < pt.length; ot++) At += pt[ot].byteLength;
        var Rt = new Uint8Array(At), Tt = 0;
        for (ot = 0; ot < pt.length; ot++) {
          for (var It = new Uint8Array(pt[ot]), Ut = It.length, st = 0; st < Ut; st += 4) {
            var Ft = It[st], t = It[st + 1], x = It[st + 2], n = It[st + 3];
            n == 0 && (Ft = t = x = 0), Rt[Tt + st] = Ft, Rt[Tt + st + 1] = t, Rt[Tt + st + 2] = x, Rt[Tt + st + 3] = n;
          }
          Tt += Ut;
        }
        return Rt.buffer;
      })(xt), Dt = G(gt, f);
      for (m = 0; m < Dt.plte.length; m++) at.push(Dt.plte[m].est.rgba);
      var zt = 0;
      for (m = 0; m < nt.length; m++) {
        var Mt = (kt = nt[m]).img.length, Et = new Uint8Array(Dt.inds.buffer, zt >> 2, Mt >> 2);
        yt.push(Et);
        var $t = new Uint8Array(Dt.abuf, zt, Mt);
        d && Q(kt.img, kt.rect.width, kt.rect.height, at, $t, Et), kt.img.set($t), zt += Mt;
      }
    } else for (Z = 0; Z < nt.length; Z++) {
      var kt = nt[Z], Zt = new Uint32Array(kt.img.buffer), bt = kt.rect.width;
      for (B = Zt.length, Et = new Uint8Array(B), yt.push(Et), m = 0; m < B; m++) {
        var St = Zt[m];
        if (m != 0 && St == Zt[m - 1]) Et[m] = Et[m - 1];
        else if (m > bt && St == Zt[m - bt]) Et[m] = Et[m - bt];
        else {
          var ct = ht[St];
          if (ct == null && (ht[St] = ct = at.length, at.push(St), at.length >= 300)) break;
          Et[m] = ct;
        }
      }
    }
    var Lt = at.length;
    for (Lt <= 256 && u == 0 && (T = Lt <= 2 ? 1 : Lt <= 4 ? 2 : Lt <= 16 ? 4 : 8, T = Math.max(T, a)), Z = 0; Z < nt.length; Z++) {
      (kt = nt[Z]).rect.x, kt.rect.y, bt = kt.rect.width;
      var qt = kt.rect.height, Ct = kt.img;
      new Uint32Array(Ct.buffer);
      var e = 4 * bt, I = 4;
      if (Lt <= 256 && u == 0) {
        e = Math.ceil(T * bt / 8);
        for (var D = new Uint8Array(e * qt), q = yt[Z], P = 0; P < qt; P++) {
          m = P * e;
          var J = P * bt;
          if (T == 8) for (var O = 0; O < bt; O++) D[m + O] = q[J + O];
          else if (T == 4) for (O = 0; O < bt; O++) D[m + (O >> 1)] |= q[J + O] << 4 - 4 * (1 & O);
          else if (T == 2) for (O = 0; O < bt; O++) D[m + (O >> 2)] |= q[J + O] << 6 - 2 * (3 & O);
          else if (T == 1) for (O = 0; O < bt; O++) D[m + (O >> 3)] |= q[J + O] << 7 - 1 * (7 & O);
        }
        Ct = D, S = 3, I = 1;
      } else if (dt == 0 && nt.length == 1) {
        D = new Uint8Array(bt * qt * 3);
        var lt = bt * qt;
        for (m = 0; m < lt; m++) {
          var mt = 3 * m, ut = 4 * m;
          D[mt] = Ct[ut], D[mt + 1] = Ct[ut + 1], D[mt + 2] = Ct[ut + 2];
        }
        Ct = D, S = 2, I = 3, e = 3 * bt;
      }
      kt.img = Ct, kt.bpl = e, kt.bpp = I;
    }
    return { ctype: S, depth: T, plte: at, frames: nt };
  }
  function E(r, l, _, f, s, g, b) {
    for (var p = Uint8Array, a = Uint32Array, u = new p(r[s - 1]), d = new a(r[s - 1]), S = s + 1 < r.length ? new p(r[s + 1]) : null, T = new p(r[s]), F = new a(T.buffer), Z = l, U = _, B = -1, m = -1, dt = 0; dt < g.height; dt++) for (var nt = 0; nt < g.width; nt++) {
      var ht = g.x + nt, at = g.y + dt, yt = at * l + ht, xt = F[yt];
      xt == 0 || f[s - 1].dispose == 0 && d[yt] == xt && (S == null || S[4 * yt + 3] != 0) || (ht < Z && (Z = ht), ht > B && (B = ht), at < U && (U = at), at > m && (m = at));
    }
    B == -1 && (Z = U = B = m = 0), b && (1 & ~Z || Z--, 1 & ~U || U--), g = { x: Z, y: U, width: B - Z + 1, height: m - U + 1 };
    var gt = f[s];
    gt.rect = g, gt.blend = 1, gt.img = new Uint8Array(g.width * g.height * 4), f[s - 1].dispose == 0 ? (j(u, l, _, gt.img, g.width, g.height, -g.x, -g.y, 0), h(T, l, _, gt.img, g)) : j(T, l, _, gt.img, g.width, g.height, -g.x, -g.y, 0);
  }
  function h(r, l, _, f, s) {
    j(r, l, _, f, s.width, s.height, -s.x, -s.y, 2);
  }
  function w(r, l, _, f, s, g, b) {
    var p, a = [], u = [0, 1, 2, 3, 4];
    g != -1 ? u = [g] : (l * f > 5e5 || _ == 1) && (u = [0]), b && (p = { level: 0 });
    for (var d = s.length > 1e7 && window.UZIP != null ? window.UZIP : Se, S = 0; S < u.length; S++) {
      for (var T = 0; T < l; T++) H(s, r, T, f, _, u[S]);
      a.push(d.deflate(s, p));
    }
    var F, Z = 1e9;
    for (S = 0; S < a.length; S++) a[S].length < Z && (F = S, Z = a[S].length);
    return a[F];
  }
  function H(r, l, _, f, s, g) {
    var b = _ * f, p = b + _;
    if (r[p] = g, p++, g == 0) if (f < 500) for (var a = 0; a < f; a++) r[p + a] = l[b + a];
    else r.set(new Uint8Array(l.buffer, b, f), p);
    else if (g == 1) {
      for (a = 0; a < s; a++) r[p + a] = l[b + a];
      for (a = s; a < f; a++) r[p + a] = l[b + a] - l[b + a - s] + 256 & 255;
    } else if (_ == 0) {
      for (a = 0; a < s; a++) r[p + a] = l[b + a];
      if (g == 2) for (a = s; a < f; a++) r[p + a] = l[b + a];
      if (g == 3) for (a = s; a < f; a++) r[p + a] = l[b + a] - (l[b + a - s] >> 1) + 256 & 255;
      if (g == 4) for (a = s; a < f; a++) r[p + a] = l[b + a] - ft(l[b + a - s], 0, 0) + 256 & 255;
    } else {
      if (g == 2) for (a = 0; a < f; a++) r[p + a] = l[b + a] + 256 - l[b + a - f] & 255;
      if (g == 3) {
        for (a = 0; a < s; a++) r[p + a] = l[b + a] + 256 - (l[b + a - f] >> 1) & 255;
        for (a = s; a < f; a++) r[p + a] = l[b + a] + 256 - (l[b + a - f] + l[b + a - s] >> 1) & 255;
      }
      if (g == 4) {
        for (a = 0; a < s; a++) r[p + a] = l[b + a] + 256 - ft(0, l[b + a - f], 0) & 255;
        for (a = s; a < f; a++) r[p + a] = l[b + a] + 256 - ft(l[b + a - s], l[b + a - f], l[b + a - s - f]) & 255;
      }
    }
  }
  function G(r, l, _) {
    for (var f = new Uint8Array(r), s = f.slice(0), g = new Uint32Array(s.buffer), b = W(s, l), p = b[0], a = b[1], u = a.length, d = new Uint32Array(u), S = new Uint8Array(d.buffer), T = 0; T < u; T++) d[T] = a[T].est.rgba;
    var F, Z = f.length, U = new Uint8Array(Z >> 2);
    if (u <= 60) X(f, U, S), K(U, g, d);
    else if (f.length < 32e6) for (T = 0; T < Z; T += 4)
      F = A(p, B = f[T] * (1 / 255), m = f[T + 1] * (1 / 255), dt = f[T + 2] * (1 / 255), nt = f[T + 3] * (1 / 255)), U[T >> 2] = F.ind, g[T >> 2] = F.est.rgba;
    else for (T = 0; T < Z; T += 4) {
      var B = f[T] * 0.00392156862745098, m = f[T + 1] * (1 / 255), dt = f[T + 2] * (1 / 255), nt = f[T + 3] * (1 / 255);
      for (F = p; F.left; ) F = M(F.est, B, m, dt, nt) <= 0 ? F.left : F.right;
      U[T >> 2] = F.ind, g[T >> 2] = F.est.rgba;
    }
    if (_ || f.length * u < 4e7) {
      var ht = 1e9;
      for (T = 0; T < 10; T++) {
        var at = z(f, U, S);
        if (at / ht > 0.997) break;
        ht = at;
      }
      for (T = 0; T < u; T++) a[T].est.rgba = d[T];
      K(U, g, d);
    }
    return { abuf: s.buffer, inds: U, plte: a };
  }
  function K(r, l, _) {
    for (var f = 0; f < r.length; f++) l[f] = _[r[f]];
  }
  function z(r, l, _) {
    return (function(f, s, g) {
      for (var b = g.length >>> 2, p = new Uint32Array(4 * b), a = new Uint32Array(b), u = 0; u < f.length; u += 4) {
        var d = s[u >>> 2], S = 4 * d;
        a[d]++, p[S] += f[u], p[S + 1] += f[u + 1], p[S + 2] += f[u + 2], p[S + 3] += f[u + 3];
      }
      for (u = 0; u < g.length; u++) g[u] = Math.round(p[u] / a[u >>> 2]);
    })(r, l, _), X(r, l, _);
  }
  function X(r, l, _) {
    for (var f = 0, s = _.length >>> 2, g = [], b = 0; b < s; b++) {
      for (var p = _[U = 4 * b], a = _[U + 1], u = _[U + 2], d = _[U + 3], S = 0, T = 1e9, F = 0; F < s; F++) if (b != F) {
        var Z = 4 * F;
        (ht = (B = p - _[Z]) * B + (m = a - _[Z + 1]) * m + (dt = u - _[Z + 2]) * dt + (nt = d - _[Z + 3]) * nt) < T && (T = ht, S = F);
      }
      g[b] = 0.5 * Math.sqrt(T), g[b] = g[b] * g[b];
    }
    for (b = 0; b < r.length; b += 4) {
      var U, B, m, dt, nt;
      if (p = r[b], a = r[b + 1], u = r[b + 2], d = r[b + 3], (T = (B = p - _[U = 4 * (S = l[b >>> 2])]) * B + (m = a - _[U + 1]) * m + (dt = u - _[U + 2]) * dt + (nt = d - _[U + 3]) * nt) > g[S]) for (F = 0; F < s; F++) {
        var ht;
        if ((ht = (B = p - _[U = 4 * F]) * B + (m = a - _[U + 1]) * m + (dt = u - _[U + 2]) * dt + (nt = d - _[U + 3]) * nt) < T && (S = F, (T = ht) < g[F])) break;
      }
      l[b >>> 2] = S, f += T;
    }
    return f / (r.length >>> 2);
  }
  function W(r, l, _) {
    _ == null && (_ = 1e-4);
    var f = new Uint32Array(r.buffer), s = { i0: 0, i1: r.length, bst: null, est: null, tdst: 0, left: null, right: null };
    s.bst = R(r, s.i0, s.i1), s.est = k(s.bst);
    for (var g = [s]; g.length < l; ) {
      for (var b = 0, p = 0, a = 0; a < g.length; a++) g[a].est.L > b && (b = g[a].est.L, p = a);
      if (b < _) break;
      var u = g[p], d = c(r, f, u.i0, u.i1, u.est.e, u.est.eMq255);
      if (u.i0 >= d || u.i1 <= d) u.est.L = 0;
      else {
        var S = { i0: u.i0, i1: d, bst: null, est: null, tdst: 0, left: null, right: null };
        S.bst = R(r, S.i0, S.i1), S.est = k(S.bst);
        var T = { i0: d, i1: u.i1, bst: null, est: null, tdst: 0, left: null, right: null };
        for (T.bst = { R: [], m: [], N: u.bst.N - S.bst.N }, a = 0; a < 16; a++) T.bst.R[a] = u.bst.R[a] - S.bst.R[a];
        for (a = 0; a < 4; a++) T.bst.m[a] = u.bst.m[a] - S.bst.m[a];
        T.est = k(T.bst), u.left = S, u.right = T, g[p] = S, g.push(T);
      }
    }
    for (g.sort((function(F, Z) {
      return Z.bst.N - F.bst.N;
    })), a = 0; a < g.length; a++) g[a].ind = a;
    return [s, g];
  }
  function A(r, l, _, f, s) {
    if (r.left == null) return r.tdst = (function(d, S, T, F, Z) {
      var U = S - d[0], B = T - d[1], m = F - d[2], dt = Z - d[3];
      return U * U + B * B + m * m + dt * dt;
    })(r.est.q, l, _, f, s), r;
    var g = M(r.est, l, _, f, s), b = r.left, p = r.right;
    g > 0 && (b = r.right, p = r.left);
    var a = A(b, l, _, f, s);
    if (a.tdst <= g * g) return a;
    var u = A(p, l, _, f, s);
    return u.tdst < a.tdst ? u : a;
  }
  function M(r, l, _, f, s) {
    var g = r.e;
    return g[0] * l + g[1] * _ + g[2] * f + g[3] * s - r.eMq;
  }
  function c(r, l, _, f, s, g) {
    for (f -= 4; _ < f; ) {
      for (; o(r, _, s) <= g; ) _ += 4;
      for (; o(r, f, s) > g; ) f -= 4;
      if (_ >= f) break;
      var b = l[_ >> 2];
      l[_ >> 2] = l[f >> 2], l[f >> 2] = b, _ += 4, f -= 4;
    }
    for (; o(r, _, s) > g; ) _ -= 4;
    return _ + 4;
  }
  function o(r, l, _) {
    return r[l] * _[0] + r[l + 1] * _[1] + r[l + 2] * _[2] + r[l + 3] * _[3];
  }
  function R(r, l, _) {
    for (var f = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], s = [0, 0, 0, 0], g = _ - l >> 2, b = l; b < _; b += 4) {
      var p = r[b] * 0.00392156862745098, a = r[b + 1] * (1 / 255), u = r[b + 2] * (1 / 255), d = r[b + 3] * (1 / 255);
      s[0] += p, s[1] += a, s[2] += u, s[3] += d, f[0] += p * p, f[1] += p * a, f[2] += p * u, f[3] += p * d, f[5] += a * a, f[6] += a * u, f[7] += a * d, f[10] += u * u, f[11] += u * d, f[15] += d * d;
    }
    return f[4] = f[1], f[8] = f[2], f[9] = f[6], f[12] = f[3], f[13] = f[7], f[14] = f[11], { R: f, m: s, N: g };
  }
  function k(r) {
    var l = r.R, _ = r.m, f = r.N, s = _[0], g = _[1], b = _[2], p = _[3], a = f == 0 ? 0 : 1 / f, u = [l[0] - s * s * a, l[1] - s * g * a, l[2] - s * b * a, l[3] - s * p * a, l[4] - g * s * a, l[5] - g * g * a, l[6] - g * b * a, l[7] - g * p * a, l[8] - b * s * a, l[9] - b * g * a, l[10] - b * b * a, l[11] - b * p * a, l[12] - p * s * a, l[13] - p * g * a, l[14] - p * b * a, l[15] - p * p * a], d = u, S = $, T = [Math.random(), Math.random(), Math.random(), Math.random()], F = 0, Z = 0;
    if (f != 0) for (var U = 0; U < 16 && (T = S.multVec(d, T), Z = Math.sqrt(S.dot(T, T)), T = S.sml(1 / Z, T), !(U != 0 && Math.abs(Z - F) < 1e-9)); U++) F = Z;
    var B = [s * a, g * a, b * a, p * a];
    return { Cov: u, q: B, e: T, L: F, eMq255: S.dot(S.sml(255, B), T), eMq: S.dot(T, B), rgba: (Math.round(255 * B[3]) << 24 | Math.round(255 * B[2]) << 16 | Math.round(255 * B[1]) << 8 | Math.round(255 * B[0])) >>> 0 };
  }
  var $ = { multVec: function(r, l) {
    return [r[0] * l[0] + r[1] * l[1] + r[2] * l[2] + r[3] * l[3], r[4] * l[0] + r[5] * l[1] + r[6] * l[2] + r[7] * l[3], r[8] * l[0] + r[9] * l[1] + r[10] * l[2] + r[11] * l[3], r[12] * l[0] + r[13] * l[1] + r[14] * l[2] + r[15] * l[3]];
  }, dot: function(r, l) {
    return r[0] * l[0] + r[1] * l[1] + r[2] * l[2] + r[3] * l[3];
  }, sml: function(r, l) {
    return [r * l[0], r * l[1], r * l[2], r * l[3]];
  } };
  Ht.encode = function(r, l, _, f, s, g, b) {
    f == null && (f = 0), b == null && (b = !1);
    var p = i(r, l, _, f, [!1, !1, !1, 0, b, !1]);
    return it(p, -1), tt(p, l, _, s, g);
  }, Ht.encodeLL = function(r, l, _, f, s, g, b, p) {
    for (var a = { ctype: 0 + (f == 1 ? 0 : 2) + (s == 0 ? 0 : 4), depth: g, frames: [] }, u = (f + s) * g, d = u * l, S = 0; S < r.length; S++) a.frames.push({ rect: { x: 0, y: 0, width: l, height: _ }, img: new Uint8Array(r[S]), blend: 0, dispose: 1, bpp: Math.ceil(u / 8), bpl: Math.ceil(d / 8) });
    return it(a, 0, !0), tt(a, l, _, b, p);
  }, Ht.encode.compress = i, Ht.encode.dither = Q, Ht.quantize = G, Ht.quantize.findNearest = X, Ht.quantize.getKDtree = W, Ht.quantize.getNearest = A;
})();
const Oe = function(j) {
  const rt = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  let ft = "";
  for (let L = 0; L < j.length; L += 3) {
    const N = j[L], C = L + 1 < j.length, V = L + 2 < j.length, Q = C ? j[L + 1] : 0, tt = V ? j[L + 2] : 0, it = N << 16 | Q << 8 | tt;
    ft += rt.charAt(it >>> 18 & 63), ft += rt.charAt(it >>> 12 & 63), ft += C ? rt.charAt(it >>> 6 & 63) : "=", ft += V ? rt.charAt(it & 63) : "=";
  }
  return ft;
}, Ne = function(j, rt, ft, L, N) {
  const C = new Uint8Array(j * rt * 4);
  for (let tt = 0; tt < rt; tt += 1)
    for (let it = 0; it < j; it += 1) {
      const i = (tt * j + it) * 4, E = N(it, tt) ? ft : L;
      C[i] = E[0], C[i + 1] = E[1], C[i + 2] = E[2], C[i + 3] = E[3];
    }
  const V = Ht.encode([C.buffer], j, rt, 0);
  return "data:image/png;base64," + Oe(new Uint8Array(V));
};
Re("png", {
  args: [
    { name: "cellSize", type: "number" },
    { name: "margin", type: "number" },
    { name: "cellColor", type: "string" },
    { name: "backgroundColor", type: "string" }
  ],
  render: function(j) {
    const rt = typeof j.output == "string" ? j.output.toLowerCase() : void 0;
    let ft = rt === "dataurl" || j.tag === !1 ? !1 : typeof j.tagName == "string" ? j.tagName : j.tag === !0 || typeof j.tag > "u" ? "img" : j.tag, L = j.cellSize, N = j.margin, C = j.cellColor, V = j.backgroundColor;
    typeof L != "number" && (L = typeof j.cellSize == "number" ? j.cellSize : 2), typeof N > "u" && (N = j.margin), typeof N != "number" && (N = typeof N > "u" ? L * 4 : 0), typeof C != "string" && (C = j.cellColor), typeof V != "string" && (V = j.backgroundColor);
    const Q = typeof j.alt == "string" ? j.alt : void 0, tt = typeof j.title == "string" ? j.title : void 0, it = ge(typeof C == "string" ? C : "black", [0, 0, 0, 255]), i = ge(typeof V == "string" ? V : "white", [255, 255, 255, 255]), E = Number(L), h = Number(N), H = Number(this.getModuleCount()) * E + h * 2, G = h, K = H - h, z = Ne(H, H, it, i, (W, A) => {
      if (G <= W && W < K && G <= A && A < K) {
        const M = Math.floor((W - G) / E), c = Math.floor((A - G) / E);
        return this.isDark(c, M);
      }
      return !1;
    });
    if (ft === !1)
      return z;
    if (ft = typeof ft == "string" ? ft : "img", rt === "element") {
      const W = j.target || (typeof document < "u" ? document.createElement(ft) : null);
      return W ? (W.setAttribute("src", z), W.setAttribute("width", String(H)), W.setAttribute("height", String(H)), Q && W.setAttribute("alt", Q), tt && W.setAttribute("title", tt), W) : z;
    }
    let X = "";
    return X += "<" + ft, X += ' src="', X += z, X += '"', X += ' width="', X += H, X += '"', X += ' height="', X += H, X += '"', Q && (X += ' alt="', X += be(Q), X += '"'), tt && (X += ' title="', X += be(tt), X += '"'), X += "/>", X;
  }
});
//# sourceMappingURL=png.mjs.map
