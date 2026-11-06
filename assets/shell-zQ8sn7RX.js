let f, A, u;
let __tla = (async () => {
  const E = "/assets/shell_bg-Xk9vdw7n.wasm", M = async (r = {}, e) => {
    let n;
    if (e.startsWith("data:")) {
      const _ = e.replace(/^data:.*?base64,/, "");
      let o;
      if (typeof Buffer == "function" && typeof Buffer.from == "function") o = Buffer.from(_, "base64");
      else if (typeof atob == "function") {
        const i = atob(_);
        o = new Uint8Array(i.length);
        for (let s = 0; s < i.length; s++) o[s] = i.charCodeAt(s);
      } else throw new Error("Cannot decode base64-encoded data URL");
      n = await WebAssembly.instantiate(o, r);
    } else {
      const _ = await fetch(e), o = _.headers.get("Content-Type") || "";
      if ("instantiateStreaming" in WebAssembly && o.startsWith("application/wasm")) n = await WebAssembly.instantiateStreaming(_, r);
      else {
        const i = await _.arrayBuffer();
        n = await WebAssembly.instantiate(i, r);
      }
    }
    return n.instance.exports;
  };
  f = class {
    static __wrap(e) {
      const n = Object.create(f.prototype);
      return n.__wbg_ptr = e, T.register(n, n.__wbg_ptr, n), n;
    }
    __destroy_into_raw() {
      const e = this.__wbg_ptr;
      return this.__wbg_ptr = 0, T.unregister(this), e;
    }
    free() {
      const e = this.__destroy_into_raw();
      t.__wbg_outcome_free(e, 0);
    }
    get command() {
      let e, n;
      try {
        const _ = t.__wbg_get_outcome_command(this.__wbg_ptr);
        return e = _[0], n = _[1], a(_[0], _[1]);
      } finally {
        t.__wbindgen_free(e, n, 1);
      }
    }
    get kind() {
      let e, n;
      try {
        const _ = t.__wbg_get_outcome_kind(this.__wbg_ptr);
        return e = _[0], n = _[1], a(_[0], _[1]);
      } finally {
        t.__wbindgen_free(e, n, 1);
      }
    }
    get log() {
      const e = t.__wbg_get_outcome_log(this.__wbg_ptr);
      var n = v(e[0], e[1]);
      return t.__wbindgen_free(e[0], e[1] * 4, 4), n;
    }
    get path() {
      let e, n;
      try {
        const _ = t.__wbg_get_outcome_path(this.__wbg_ptr);
        return e = _[0], n = _[1], a(_[0], _[1]);
      } finally {
        t.__wbindgen_free(e, n, 1);
      }
    }
    set command(e) {
      const n = c(e, t.__wbindgen_malloc, t.__wbindgen_realloc), _ = g;
      t.__wbg_set_outcome_command(this.__wbg_ptr, n, _);
    }
    set kind(e) {
      const n = c(e, t.__wbindgen_malloc, t.__wbindgen_realloc), _ = g;
      t.__wbg_set_outcome_kind(this.__wbg_ptr, n, _);
    }
    set log(e) {
      const n = C(e, t.__wbindgen_malloc), _ = g;
      t.__wbg_set_outcome_log(this.__wbg_ptr, n, _);
    }
    set path(e) {
      const n = c(e, t.__wbindgen_malloc, t.__wbindgen_realloc), _ = g;
      t.__wbg_set_outcome_path(this.__wbg_ptr, n, _);
    }
  };
  Symbol.dispose && (f.prototype[Symbol.dispose] = f.prototype.free);
  A = class {
    __destroy_into_raw() {
      const e = this.__wbg_ptr;
      return this.__wbg_ptr = 0, F.unregister(this), e;
    }
    free() {
      const e = this.__destroy_into_raw();
      t.__wbg_shell_free(e, 0);
    }
    begin_transition() {
      return t.shell_begin_transition(this.__wbg_ptr) !== 0;
    }
    close_prompt() {
      return t.shell_close_prompt(this.__wbg_ptr) !== 0;
    }
    command_list() {
      let e, n;
      try {
        const _ = t.shell_command_list(this.__wbg_ptr);
        return e = _[0], n = _[1], a(_[0], _[1]);
      } finally {
        t.__wbindgen_free(e, n, 1);
      }
    }
    end_transition() {
      t.shell_end_transition(this.__wbg_ptr);
    }
    execute(e, n) {
      let _, o, i, s;
      try {
        _ = c(e, t.__wbindgen_malloc, t.__wbindgen_realloc), o = g, i = S(n) ? 0 : c(n, t.__wbindgen_malloc, t.__wbindgen_realloc), s = g;
      } catch (b) {
        throw i && t.__wbindgen_free(i, s * 1, 1), _ && t.__wbindgen_free(_, o * 1, 1), b;
      }
      const l = t.shell_execute(this.__wbg_ptr, _, o, i, s);
      return f.__wrap(l);
    }
    ghost(e, n) {
      let _, o, i, s;
      try {
        _ = c(e, t.__wbindgen_malloc, t.__wbindgen_realloc), o = g, i = S(n) ? 0 : c(n, t.__wbindgen_malloc, t.__wbindgen_realloc), s = g;
      } catch (z) {
        throw i && t.__wbindgen_free(i, s * 1, 1), _ && t.__wbindgen_free(_, o * 1, 1), z;
      }
      const l = t.shell_ghost(this.__wbg_ptr, _, o, i, s);
      let b;
      return l[0] !== 0 && (b = a(l[0], l[1]), t.__wbindgen_free(l[0], l[1] * 1, 1)), b;
    }
    history_next() {
      const e = t.shell_history_next(this.__wbg_ptr);
      let n;
      return e[0] !== 0 && (n = a(e[0], e[1]), t.__wbindgen_free(e[0], e[1] * 1, 1)), n;
    }
    history_prev() {
      const e = t.shell_history_prev(this.__wbg_ptr);
      let n;
      return e[0] !== 0 && (n = a(e[0], e[1]), t.__wbindgen_free(e[0], e[1] * 1, 1)), n;
    }
    is_transitioning() {
      return t.shell_is_transitioning(this.__wbg_ptr) !== 0;
    }
    log_for_route(e) {
      const n = c(e, t.__wbindgen_malloc, t.__wbindgen_realloc), _ = g, o = t.shell_log_for_route(this.__wbg_ptr, n, _);
      var i = v(o[0], o[1]);
      return t.__wbindgen_free(o[0], o[1] * 4, 4), i;
    }
    constructor() {
      const e = t.shell_new();
      return this.__wbg_ptr = e, F.register(this, this.__wbg_ptr, this), this;
    }
    open_prompt() {
      return t.shell_open_prompt(this.__wbg_ptr) !== 0;
    }
    route_for_path(e) {
      let n, _;
      try {
        const o = c(e, t.__wbindgen_malloc, t.__wbindgen_realloc), i = g, s = t.shell_route_for_path(this.__wbg_ptr, o, i);
        return n = s[0], _ = s[1], a(s[0], s[1]);
      } finally {
        t.__wbindgen_free(n, _, 1);
      }
    }
    suggest(e) {
      const n = c(e, t.__wbindgen_malloc, t.__wbindgen_realloc), _ = g, o = t.shell_suggest(this.__wbg_ptr, n, _);
      var i = v(o[0], o[1]);
      return t.__wbindgen_free(o[0], o[1] * 4, 4), i;
    }
  };
  Symbol.dispose && (A.prototype[Symbol.dispose] = A.prototype.free);
  u = class {
    static __wrap(e) {
      const n = Object.create(u.prototype);
      return n.__wbg_ptr = e, W.register(n, n.__wbg_ptr, n), n;
    }
    __destroy_into_raw() {
      const e = this.__wbg_ptr;
      return this.__wbg_ptr = 0, W.unregister(this), e;
    }
    free() {
      const e = this.__destroy_into_raw();
      t.__wbg_suggestion_free(e, 0);
    }
    get name() {
      let e, n;
      try {
        const _ = t.__wbg_get_suggestion_name(this.__wbg_ptr);
        return e = _[0], n = _[1], a(_[0], _[1]);
      } finally {
        t.__wbindgen_free(e, n, 1);
      }
    }
    get tag() {
      let e, n;
      try {
        const _ = t.__wbg_get_suggestion_tag(this.__wbg_ptr);
        return e = _[0], n = _[1], a(_[0], _[1]);
      } finally {
        t.__wbindgen_free(e, n, 1);
      }
    }
    set name(e) {
      const n = c(e, t.__wbindgen_malloc, t.__wbindgen_realloc), _ = g;
      t.__wbg_set_suggestion_name(this.__wbg_ptr, n, _);
    }
    set tag(e) {
      const n = c(e, t.__wbindgen_malloc, t.__wbindgen_realloc), _ = g;
      t.__wbg_set_suggestion_tag(this.__wbg_ptr, n, _);
    }
  };
  Symbol.dispose && (u.prototype[Symbol.dispose] = u.prototype.free);
  function U(r, e) {
    const n = e, _ = typeof n == "string" ? n : void 0;
    var o = S(_) ? 0 : c(_, t.__wbindgen_malloc, t.__wbindgen_realloc), i = g;
    y().setInt32((r >>> 0) + 4, i, true), y().setInt32((r >>> 0) + 0, o, true);
  }
  function k(r, e) {
    throw new Error(a(r, e));
  }
  function D(r) {
    return u.__wrap(r);
  }
  function O(r, e) {
    return a(r, e);
  }
  function j() {
    const r = t.__wbindgen_externrefs;
    r.set(0, void 0), r.set(1024, void 0), r.set(1025, null), r.set(1026, true), r.set(1027, false);
  }
  const T = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((r) => t.__wbg_outcome_free(r, 1)), F = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((r) => t.__wbg_shell_free(r, 1)), W = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((r) => t.__wbg_suggestion_free(r, 1));
  function B(r) {
    const e = t.__externref_table_alloc();
    return t.__wbindgen_externrefs.set(e, r), e;
  }
  function v(r, e) {
    r = r >>> 0;
    const n = y(), _ = [];
    for (let o = r; o < r + 4 * e; o += 4) _.push(t.__wbindgen_externrefs.get(n.getUint32(o, true)));
    return t.__externref_drop_slice(r, e), _;
  }
  let d = null;
  function y() {
    return (d === null || d.buffer.detached === true || d.buffer.detached === void 0 && d.buffer !== t.memory.buffer) && (d = new DataView(t.memory.buffer)), d;
  }
  function a(r, e) {
    return r = r >>> 0, L(p().subarray(r, r + e));
  }
  let h = null;
  function p() {
    return (h === null || h.byteLength === 0) && (h = new Uint8Array(t.memory.buffer)), h;
  }
  function S(r) {
    return r == null;
  }
  function C(r, e) {
    const n = e(r.length * 4, 4) >>> 0;
    for (let _ = 0; _ < r.length; _++) {
      const o = B(r[_]);
      y().setUint32(n + 4 * _, o, true);
    }
    return g = r.length, n;
  }
  function c(r, e, n) {
    if (n === void 0) {
      const l = w.encode(r), b = e(l.length, 1) >>> 0;
      return p().subarray(b, b + l.length).set(l), g = l.length, b;
    }
    let _ = r.length, o = e(_, 1) >>> 0;
    const i = p();
    let s = 0;
    for (; s < _; s++) {
      const l = r.charCodeAt(s);
      if (l > 127) break;
      i[o + s] = l;
    }
    if (s !== _) {
      s !== 0 && (r = r.slice(s)), o = n(o, _, _ = s + r.length * 3, 1) >>> 0;
      const l = p().subarray(o + s, o + _), b = w.encodeInto(r, l);
      s += b.written, o = n(o, _, s, 1) >>> 0;
    }
    return g = s, o;
  }
  let m = new TextDecoder("utf-8", {
    ignoreBOM: true
  });
  m.decode();
  const I = 2146435072;
  let x = 0;
  function L(r) {
    return x += r.length, x >= I && (m = new TextDecoder("utf-8", {
      ignoreBOM: true
    }), m.decode(), x = r.length), m.decode(r);
  }
  const w = new TextEncoder();
  "encodeInto" in w || (w.encodeInto = function(r, e) {
    const n = w.encode(r);
    return e.set(n), {
      read: r.length,
      written: n.length
    };
  });
  let g = 0, t;
  function V(r) {
    t = r;
  }
  URL = globalThis.URL;
  const J = await M({
    "./shell_bg.js": {
      __wbg_suggestion_new: D,
      __wbg___wbindgen_throw_4c88d8bf264fd984: k,
      __wbg___wbindgen_string_get_7ce8eee7fd327545: U,
      __wbindgen_init_externref_table: j,
      __wbindgen_generic_0000000000000001: O
    }
  }, E), { memory: N, __wbg_get_outcome_command: X, __wbg_get_outcome_kind: P, __wbg_get_outcome_log: Y, __wbg_get_outcome_path: $, __wbg_get_suggestion_name: q, __wbg_get_suggestion_tag: G, __wbg_outcome_free: H, __wbg_set_outcome_command: K, __wbg_set_outcome_kind: Q, __wbg_set_outcome_log: Z, __wbg_set_outcome_path: ee, __wbg_set_suggestion_name: te, __wbg_set_suggestion_tag: _e, __wbg_shell_free: ne, __wbg_suggestion_free: re, shell_begin_transition: oe, shell_close_prompt: se, shell_command_list: ie, shell_end_transition: le, shell_execute: ge, shell_ghost: ce, shell_history_next: ae, shell_history_prev: be, shell_is_transitioning: de, shell_log_for_route: we, shell_new: fe, shell_open_prompt: ue, shell_route_for_path: he, shell_suggest: pe, __abort_handler: me, __instance_terminated: ye, __wbindgen_malloc: xe, __wbindgen_realloc: ve, __wbindgen_free: Se, __wbindgen_externrefs: Ae, __externref_drop_slice: Te, __externref_table_alloc: Fe, __wbindgen_start: R } = J, We = Object.freeze(Object.defineProperty({
    __proto__: null,
    __abort_handler: me,
    __externref_drop_slice: Te,
    __externref_table_alloc: Fe,
    __instance_terminated: ye,
    __wbg_get_outcome_command: X,
    __wbg_get_outcome_kind: P,
    __wbg_get_outcome_log: Y,
    __wbg_get_outcome_path: $,
    __wbg_get_suggestion_name: q,
    __wbg_get_suggestion_tag: G,
    __wbg_outcome_free: H,
    __wbg_set_outcome_command: K,
    __wbg_set_outcome_kind: Q,
    __wbg_set_outcome_log: Z,
    __wbg_set_outcome_path: ee,
    __wbg_set_suggestion_name: te,
    __wbg_set_suggestion_tag: _e,
    __wbg_shell_free: ne,
    __wbg_suggestion_free: re,
    __wbindgen_externrefs: Ae,
    __wbindgen_free: Se,
    __wbindgen_malloc: xe,
    __wbindgen_realloc: ve,
    __wbindgen_start: R,
    memory: N,
    shell_begin_transition: oe,
    shell_close_prompt: se,
    shell_command_list: ie,
    shell_end_transition: le,
    shell_execute: ge,
    shell_ghost: ce,
    shell_history_next: ae,
    shell_history_prev: be,
    shell_is_transitioning: de,
    shell_log_for_route: we,
    shell_new: fe,
    shell_open_prompt: ue,
    shell_route_for_path: he,
    shell_suggest: pe
  }, Symbol.toStringTag, {
    value: "Module"
  }));
  V(We);
  R();
})();
export {
  f as Outcome,
  A as Shell,
  u as Suggestion,
  __tla
};
