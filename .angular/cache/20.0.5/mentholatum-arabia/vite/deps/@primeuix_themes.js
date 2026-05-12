import "./chunk-GOMI4DH3.js";

// node_modules/@primeuix/themes/node_modules/@primeuix/utils/dist/object/index.mjs
var oe = Object.defineProperty;
var K = Object.getOwnPropertySymbols;
var ue = Object.prototype.hasOwnProperty;
var fe = Object.prototype.propertyIsEnumerable;
var N = (e, t2, n) => t2 in e ? oe(e, t2, { enumerable: true, configurable: true, writable: true, value: n }) : e[t2] = n;
var d = (e, t2) => {
  for (var n in t2 || (t2 = {})) ue.call(t2, n) && N(e, n, t2[n]);
  if (K) for (var n of K(t2)) fe.call(t2, n) && N(e, n, t2[n]);
  return e;
};
function a(e) {
  return e == null || e === "" || Array.isArray(e) && e.length === 0 || !(e instanceof Date) && typeof e == "object" && Object.keys(e).length === 0;
}
function l(e) {
  return typeof e == "function" && "call" in e && "apply" in e;
}
function s(e) {
  return !a(e);
}
function i(e, t2 = true) {
  return e instanceof Object && e.constructor === Object && (t2 || Object.keys(e).length !== 0);
}
function $(e = {}, t2 = {}) {
  let n = d({}, e);
  return Object.keys(t2).forEach((r2) => {
    let o = r2;
    i(t2[o]) && o in e && i(e[o]) ? n[o] = $(e[o], t2[o]) : n[o] = t2[o];
  }), n;
}
function w(...e) {
  return e.reduce((t2, n, r2) => r2 === 0 ? n : $(t2, n), {});
}
function m(e, ...t2) {
  return l(e) ? e(...t2) : e;
}
function p(e, t2 = true) {
  return typeof e == "string" && (t2 || e !== "");
}
function g(e) {
  return p(e) ? e.replace(/(-|_)/g, "").toLowerCase() : e;
}
function F(e, t2 = "", n = {}) {
  let r2 = g(t2).split("."), o = r2.shift();
  if (o) {
    if (i(e)) {
      let u2 = Object.keys(e).find((f) => g(f) === o) || "";
      return F(m(e[u2], n), r2.join("."), n);
    }
    return;
  }
  return m(e, n);
}
function b(e, t2 = true) {
  return Array.isArray(e) && (t2 || e.length !== 0);
}
function _(e) {
  return s(e) && !isNaN(e);
}
function z(e, t2) {
  if (t2) {
    let n = t2.test(e);
    return t2.lastIndex = 0, n;
  }
  return false;
}
function U(...e) {
  return w(...e);
}
function G(e) {
  return e && e.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, "").replace(/ {2,}/g, " ").replace(/ ([{:}]) /g, "$1").replace(/([;,]) /g, "$1").replace(/ !/g, "!").replace(/: /g, ":").trim();
}
function ee(e) {
  return p(e) ? e.replace(/(_)/g, "-").replace(/[A-Z]/g, (t2, n) => n === 0 ? t2 : "-" + t2.toLowerCase()).toLowerCase() : e;
}

// node_modules/@primeuix/themes/node_modules/@primeuix/utils/dist/eventbus/index.mjs
function s2() {
  let r2 = /* @__PURE__ */ new Map();
  return { on(e, t2) {
    let n = r2.get(e);
    return n ? n.push(t2) : n = [t2], r2.set(e, n), this;
  }, off(e, t2) {
    let n = r2.get(e);
    return n && n.splice(n.indexOf(t2) >>> 0, 1), this;
  }, emit(e, t2) {
    let n = r2.get(e);
    n && n.forEach((i2) => {
      i2(t2);
    });
  }, clear() {
    r2.clear();
  } };
}

// node_modules/@primeuix/themes/node_modules/@primeuix/utils/dist/dom/index.mjs
function q(t2, e = {}) {
  return t2 ? `<style${Object.entries(e).reduce((o, [n, r2]) => o + ` ${n}="${r2}"`, "")}>${t2}</style>` : "";
}

// node_modules/@primeuix/themes/node_modules/@primeuix/utils/dist/zindex/index.mjs
function g2() {
  let r2 = [], i2 = (e, n, t2 = 999) => {
    let s4 = u2(e, n, t2), o = s4.value + (s4.key === e ? 0 : t2) + 1;
    return r2.push({ key: e, value: o }), o;
  }, d3 = (e) => {
    r2 = r2.filter((n) => n.value !== e);
  }, a3 = (e, n) => u2(e, n).value, u2 = (e, n, t2 = 0) => [...r2].reverse().find((s4) => n ? true : s4.key === e) || { key: e, value: t2 }, l2 = (e) => e && parseInt(e.style.zIndex, 10) || 0;
  return { get: l2, set: (e, n, t2) => {
    n && (n.style.zIndex = String(i2(e, true, t2)));
  }, clear: (e) => {
    e && (d3(l2(e)), e.style.zIndex = "");
  }, getCurrent: (e) => a3(e, true) };
}
var x = g2();

// node_modules/@primeuix/themes/node_modules/@primeuix/styled/dist/index.mjs
var Qe = Object.defineProperty;
var Ye = Object.defineProperties;
var et = Object.getOwnPropertyDescriptors;
var F2 = Object.getOwnPropertySymbols;
var fe2 = Object.prototype.hasOwnProperty;
var ye = Object.prototype.propertyIsEnumerable;
var he = (e, t2, r2) => t2 in e ? Qe(e, t2, { enumerable: true, configurable: true, writable: true, value: r2 }) : e[t2] = r2;
var d2 = (e, t2) => {
  for (var r2 in t2 || (t2 = {})) fe2.call(t2, r2) && he(e, r2, t2[r2]);
  if (F2) for (var r2 of F2(t2)) ye.call(t2, r2) && he(e, r2, t2[r2]);
  return e;
};
var _2 = (e, t2) => Ye(e, et(t2));
var b2 = (e, t2) => {
  var r2 = {};
  for (var s4 in e) fe2.call(e, s4) && t2.indexOf(s4) < 0 && (r2[s4] = e[s4]);
  if (e != null && F2) for (var s4 of F2(e)) t2.indexOf(s4) < 0 && ye.call(e, s4) && (r2[s4] = e[s4]);
  return r2;
};
function Se(...e) {
  return w(...e);
}
var st = s2();
var R = st;
var v = /{([^}]*)}/g;
var lt = /(\d+\s+[\+\-\*\/]\s+\d+)/g;
var ct = /var\([^)]+\)/g;
function Vt(e) {
  return p(e) ? e.replace(/[A-Z]/g, (t2, r2) => r2 === 0 ? t2 : "." + t2.toLowerCase()).toLowerCase() : e;
}
function Et(e, t2) {
  b(e) ? e.push(...t2 || []) : i(e) && Object.assign(e, t2);
}
function ke(e) {
  return i(e) && e.hasOwnProperty("$value") && e.hasOwnProperty("$type") ? e.$value : e;
}
function Lt(e, t2 = "") {
  return ["opacity", "z-index", "line-height", "font-weight", "flex", "flex-grow", "flex-shrink", "order"].some((s4) => t2.endsWith(s4)) ? e : `${e}`.trim().split(" ").map((a3) => _(a3) ? `${a3}px` : a3).join(" ");
}
function mt(e) {
  return e.replaceAll(/ /g, "").replace(/[^\w]/g, "-");
}
function Q(e = "", t2 = "") {
  return mt(`${p(e, false) && p(t2, false) ? `${e}-` : e}${t2}`);
}
function ne(e = "", t2 = "") {
  return `--${Q(e, t2)}`;
}
function dt(e = "") {
  let t2 = (e.match(/{/g) || []).length, r2 = (e.match(/}/g) || []).length;
  return (t2 + r2) % 2 !== 0;
}
function Y(e, t2 = "", r2 = "", s4 = [], o) {
  if (p(e)) {
    let a3 = e.trim();
    if (dt(a3)) return;
    if (z(a3, v)) {
      let n = a3.replaceAll(v, (l2) => {
        let c = l2.replace(/{|}/g, "").split(".").filter((m2) => !s4.some((u2) => z(m2, u2)));
        return `var(${ne(r2, ee(c.join("-")))}${s(o) ? `, ${o}` : ""})`;
      });
      return z(n.replace(ct, "0"), lt) ? `calc(${n})` : n;
    }
    return a3;
  } else if (_(e)) return e;
}
function Mt(e = {}, t2) {
  if (p(t2)) {
    let r2 = t2.trim();
    return z(r2, v) ? r2.replaceAll(v, (s4) => F(e, s4.replace(/{|}/g, ""))) : r2;
  } else if (_(t2)) return t2;
}
function _e(e, t2, r2) {
  p(t2, false) && e.push(`${t2}:${r2};`);
}
function T(e, t2) {
  return e ? `${e}{${t2}}` : "";
}
function oe2(e, t2) {
  if (e.indexOf("dt(") === -1) return e;
  function r2(n, l2) {
    let i2 = [], c = 0, m2 = "", u2 = null, p2 = 0;
    for (; c <= n.length; ) {
      let h = n[c];
      if ((h === '"' || h === "'" || h === "`") && n[c - 1] !== "\\" && (u2 = u2 === h ? null : h), !u2 && (h === "(" && p2++, h === ")" && p2--, (h === "," || c === n.length) && p2 === 0)) {
        let y = m2.trim();
        y.startsWith("dt(") ? i2.push(oe2(y, l2)) : i2.push(s4(y)), m2 = "", c++;
        continue;
      }
      h !== void 0 && (m2 += h), c++;
    }
    return i2;
  }
  function s4(n) {
    let l2 = n[0];
    if ((l2 === '"' || l2 === "'" || l2 === "`") && n[n.length - 1] === l2) return n.slice(1, -1);
    let i2 = Number(n);
    return isNaN(i2) ? n : i2;
  }
  let o = [], a3 = [];
  for (let n = 0; n < e.length; n++) if (e[n] === "d" && e.slice(n, n + 3) === "dt(") a3.push(n), n += 2;
  else if (e[n] === ")" && a3.length > 0) {
    let l2 = a3.pop();
    a3.length === 0 && o.push([l2, n]);
  }
  if (!o.length) return e;
  for (let n = o.length - 1; n >= 0; n--) {
    let [l2, i2] = o[n], c = e.slice(l2 + 3, i2), m2 = r2(c, t2), u2 = t2(...m2);
    e = e.slice(0, l2) + u2 + e.slice(i2 + 1);
  }
  return e;
}
function be(e) {
  return e.length === 4 ? `#${e[1]}${e[1]}${e[2]}${e[2]}${e[3]}${e[3]}` : e;
}
function $e(e) {
  let t2 = parseInt(e.substring(1), 16), r2 = t2 >> 16 & 255, s4 = t2 >> 8 & 255, o = t2 & 255;
  return { r: r2, g: s4, b: o };
}
function ut(e, t2, r2) {
  return `#${e.toString(16).padStart(2, "0")}${t2.toString(16).padStart(2, "0")}${r2.toString(16).padStart(2, "0")}`;
}
var A = (e, t2, r2) => {
  e = be(e), t2 = be(t2);
  let a3 = (r2 / 100 * 2 - 1 + 1) / 2, n = 1 - a3, l2 = $e(e), i2 = $e(t2), c = Math.round(l2.r * a3 + i2.r * n), m2 = Math.round(l2.g * a3 + i2.g * n), u2 = Math.round(l2.b * a3 + i2.b * n);
  return ut(c, m2, u2);
};
var ae = (e, t2) => A("#000000", e, t2);
var ie = (e, t2) => A("#ffffff", e, t2);
var Re = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
var gt = (e) => {
  if (z(e, v)) {
    let t2 = e.replace(/{|}/g, "");
    return Re.reduce((r2, s4) => (r2[s4] = `{${t2}.${s4}}`, r2), {});
  }
  return typeof e == "string" ? Re.reduce((t2, r2, s4) => (t2[r2] = s4 <= 5 ? ie(e, (5 - s4) * 19) : ae(e, (s4 - 5) * 15), t2), {}) : e;
};
var tr = (e) => {
  var a3;
  let t2 = g3.getTheme(), r2 = le(t2, e, void 0, "variable"), s4 = (a3 = r2 == null ? void 0 : r2.match(/--[\w-]+/g)) == null ? void 0 : a3[0], o = le(t2, e, void 0, "value");
  return { name: s4, variable: r2, value: o };
};
var P = (...e) => le(g3.getTheme(), ...e);
var le = (e = {}, t2, r2, s4) => {
  if (t2) {
    let { variable: o, options: a3 } = g3.defaults || {}, { prefix: n, transform: l2 } = (e == null ? void 0 : e.options) || a3 || {}, i2 = z(t2, v) ? t2 : `{${t2}}`;
    return s4 === "value" || a(s4) && l2 === "strict" ? g3.getTokenValue(t2) : Y(i2, void 0, n, [o.excludedKeyRegex], r2);
  }
  return "";
};
function ar(e, ...t2) {
  if (e instanceof Array) {
    let r2 = e.reduce((s4, o, a3) => {
      var n;
      return s4 + o + ((n = m(t2[a3], { dt: P })) != null ? n : "");
    }, "");
    return oe2(r2, P);
  }
  return m(e, { dt: P });
}
var O = (e = {}) => {
  let { preset: t2, options: r2 } = e;
  return { preset(s4) {
    return t2 = t2 ? U(t2, s4) : s4, this;
  }, options(s4) {
    return r2 = r2 ? d2(d2({}, r2), s4) : s4, this;
  }, primaryPalette(s4) {
    let { semantic: o } = t2 || {};
    return t2 = _2(d2({}, t2), { semantic: _2(d2({}, o), { primary: s4 }) }), this;
  }, surfacePalette(s4) {
    var i2, c;
    let { semantic: o } = t2 || {}, a3 = s4 && Object.hasOwn(s4, "light") ? s4.light : s4, n = s4 && Object.hasOwn(s4, "dark") ? s4.dark : s4, l2 = { colorScheme: { light: d2(d2({}, (i2 = o == null ? void 0 : o.colorScheme) == null ? void 0 : i2.light), !!a3 && { surface: a3 }), dark: d2(d2({}, (c = o == null ? void 0 : o.colorScheme) == null ? void 0 : c.dark), !!n && { surface: n }) } };
    return t2 = _2(d2({}, t2), { semantic: d2(d2({}, o), l2) }), this;
  }, define({ useDefaultPreset: s4 = false, useDefaultOptions: o = false } = {}) {
    return { preset: s4 ? g3.getPreset() : t2, options: o ? g3.getOptions() : r2 };
  }, update({ mergePresets: s4 = true, mergeOptions: o = true } = {}) {
    let a3 = { preset: s4 ? U(g3.getPreset(), t2) : t2, options: o ? d2(d2({}, g3.getOptions()), r2) : r2 };
    return g3.setTheme(a3), a3;
  }, use(s4) {
    let o = this.define(s4);
    return g3.setTheme(o), o;
  } };
};
function ce(e, t2 = {}) {
  let r2 = g3.defaults.variable, { prefix: s4 = r2.prefix, selector: o = r2.selector, excludedKeyRegex: a3 = r2.excludedKeyRegex } = t2, n = [], l2 = [], i2 = [{ node: e, path: s4 }];
  for (; i2.length; ) {
    let { node: m2, path: u2 } = i2.pop();
    for (let p2 in m2) {
      let h = m2[p2], y = ke(h), x2 = z(p2, a3) ? Q(u2) : Q(u2, ee(p2));
      if (i(y)) i2.push({ node: y, path: x2 });
      else {
        let k = ne(x2), w2 = Y(y, x2, s4, [a3]);
        _e(l2, k, w2);
        let $2 = x2;
        s4 && $2.startsWith(s4 + "-") && ($2 = $2.slice(s4.length + 1)), n.push($2.replace(/-/g, "."));
      }
    }
  }
  let c = l2.join("");
  return { value: l2, tokens: n, declarations: c, css: T(o, c) };
}
var S = { regex: { rules: { class: { pattern: /^\.([a-zA-Z][\w-]*)$/, resolve(e) {
  return { type: "class", selector: e, matched: this.pattern.test(e.trim()) };
} }, attr: { pattern: /^\[(.*)\]$/, resolve(e) {
  return { type: "attr", selector: `:root${e}`, matched: this.pattern.test(e.trim()) };
} }, media: { pattern: /^@media (.*)$/, resolve(e) {
  return { type: "media", selector: e, matched: this.pattern.test(e.trim()) };
} }, system: { pattern: /^system$/, resolve(e) {
  return { type: "system", selector: "@media (prefers-color-scheme: dark)", matched: this.pattern.test(e.trim()) };
} }, custom: { resolve(e) {
  return { type: "custom", selector: e, matched: true };
} } }, resolve(e) {
  let t2 = Object.keys(this.rules).filter((r2) => r2 !== "custom").map((r2) => this.rules[r2]);
  return [e].flat().map((r2) => {
    var s4;
    return (s4 = t2.map((o) => o.resolve(r2)).find((o) => o.matched)) != null ? s4 : this.rules.custom.resolve(r2);
  });
} }, _toVariables(e, t2) {
  return ce(e, { prefix: t2 == null ? void 0 : t2.prefix });
}, getCommon({ name: e = "", theme: t2 = {}, params: r2, set: s4, defaults: o }) {
  var w2, $2, j, V, D, z2, E;
  let { preset: a3, options: n } = t2, l2, i2, c, m2, u2, p2, h;
  if (s(a3) && n.transform !== "strict") {
    let { primitive: L, semantic: te, extend: re } = a3, y = te || {}, { colorScheme: K2 } = y, M = b2(y, ["colorScheme"]), N2 = re || {}, { colorScheme: X } = N2, B = b2(N2, ["colorScheme"]), x2 = K2 || {}, { dark: G2 } = x2, I = b2(x2, ["dark"]), k = X || {}, { dark: U2 } = k, H = b2(k, ["dark"]), W = s(L) ? this._toVariables({ primitive: L }, n) : {}, q2 = s(M) ? this._toVariables({ semantic: M }, n) : {}, Z = s(I) ? this._toVariables({ light: I }, n) : {}, de = s(G2) ? this._toVariables({ dark: G2 }, n) : {}, ue2 = s(B) ? this._toVariables({ semantic: B }, n) : {}, pe = s(H) ? this._toVariables({ light: H }, n) : {}, ge = s(U2) ? this._toVariables({ dark: U2 }, n) : {}, [Le, Me] = [(w2 = W.declarations) != null ? w2 : "", W.tokens], [Ae, je] = [($2 = q2.declarations) != null ? $2 : "", q2.tokens || []], [De, ze] = [(j = Z.declarations) != null ? j : "", Z.tokens || []], [Ke, Xe] = [(V = de.declarations) != null ? V : "", de.tokens || []], [Be, Ge] = [(D = ue2.declarations) != null ? D : "", ue2.tokens || []], [Ie, Ue] = [(z2 = pe.declarations) != null ? z2 : "", pe.tokens || []], [He, We] = [(E = ge.declarations) != null ? E : "", ge.tokens || []];
    l2 = this.transformCSS(e, Le, "light", "variable", n, s4, o), i2 = Me;
    let qe = this.transformCSS(e, `${Ae}${De}`, "light", "variable", n, s4, o), Ze = this.transformCSS(e, `${Ke}`, "dark", "variable", n, s4, o);
    c = `${qe}${Ze}`, m2 = [.../* @__PURE__ */ new Set([...je, ...ze, ...Xe])];
    let Fe = this.transformCSS(e, `${Be}${Ie}color-scheme:light`, "light", "variable", n, s4, o), Je = this.transformCSS(e, `${He}color-scheme:dark`, "dark", "variable", n, s4, o);
    u2 = `${Fe}${Je}`, p2 = [.../* @__PURE__ */ new Set([...Ge, ...Ue, ...We])], h = m(a3.css, { dt: P });
  }
  return { primitive: { css: l2, tokens: i2 }, semantic: { css: c, tokens: m2 }, global: { css: u2, tokens: p2 }, style: h };
}, getPreset({ name: e = "", preset: t2 = {}, options: r2, params: s4, set: o, defaults: a3, selector: n }) {
  var y, N2, x2;
  let l2, i2, c;
  if (s(t2) && r2.transform !== "strict") {
    let k = e.replace("-directive", ""), m2 = t2, { colorScheme: w2, extend: $2, css: j } = m2, V = b2(m2, ["colorScheme", "extend", "css"]), u2 = $2 || {}, { colorScheme: D } = u2, z2 = b2(u2, ["colorScheme"]), p2 = w2 || {}, { dark: E } = p2, L = b2(p2, ["dark"]), h = D || {}, { dark: te } = h, re = b2(h, ["dark"]), K2 = s(V) ? this._toVariables({ [k]: d2(d2({}, V), z2) }, r2) : {}, M = s(L) ? this._toVariables({ [k]: d2(d2({}, L), re) }, r2) : {}, X = s(E) ? this._toVariables({ [k]: d2(d2({}, E), te) }, r2) : {}, [B, G2] = [(y = K2.declarations) != null ? y : "", K2.tokens || []], [I, U2] = [(N2 = M.declarations) != null ? N2 : "", M.tokens || []], [H, W] = [(x2 = X.declarations) != null ? x2 : "", X.tokens || []], q2 = this.transformCSS(k, `${B}${I}`, "light", "variable", r2, o, a3, n), Z = this.transformCSS(k, H, "dark", "variable", r2, o, a3, n);
    l2 = `${q2}${Z}`, i2 = [.../* @__PURE__ */ new Set([...G2, ...U2, ...W])], c = m(j, { dt: P });
  }
  return { css: l2, tokens: i2, style: c };
}, getPresetC({ name: e = "", theme: t2 = {}, params: r2, set: s4, defaults: o }) {
  var i2;
  let { preset: a3, options: n } = t2, l2 = (i2 = a3 == null ? void 0 : a3.components) == null ? void 0 : i2[e];
  return this.getPreset({ name: e, preset: l2, options: n, params: r2, set: s4, defaults: o });
}, getPresetD({ name: e = "", theme: t2 = {}, params: r2, set: s4, defaults: o }) {
  var c, m2;
  let a3 = e.replace("-directive", ""), { preset: n, options: l2 } = t2, i2 = ((c = n == null ? void 0 : n.components) == null ? void 0 : c[a3]) || ((m2 = n == null ? void 0 : n.directives) == null ? void 0 : m2[a3]);
  return this.getPreset({ name: a3, preset: i2, options: l2, params: r2, set: s4, defaults: o });
}, applyDarkColorScheme(e) {
  return !(e.darkModeSelector === "none" || e.darkModeSelector === false);
}, getColorSchemeOption(e, t2) {
  var r2;
  return this.applyDarkColorScheme(e) ? this.regex.resolve(e.darkModeSelector === true ? t2.options.darkModeSelector : (r2 = e.darkModeSelector) != null ? r2 : t2.options.darkModeSelector) : [];
}, getLayerOrder(e, t2 = {}, r2, s4) {
  let { cssLayer: o } = t2;
  return o ? `@layer ${m(o.order || o.name || "primeui", r2)}` : "";
}, getCommonStyleSheet({ name: e = "", theme: t2 = {}, params: r2, props: s4 = {}, set: o, defaults: a3 }) {
  let n = this.getCommon({ name: e, theme: t2, params: r2, set: o, defaults: a3 }), l2 = Object.entries(s4).reduce((i2, [c, m2]) => i2.push(`${c}="${m2}"`) && i2, []).join(" ");
  return Object.entries(n || {}).reduce((i2, [c, m2]) => {
    if (i(m2) && Object.hasOwn(m2, "css")) {
      let u2 = G(m2.css), p2 = `${c}-variables`;
      i2.push(`<style type="text/css" data-primevue-style-id="${p2}" ${l2}>${u2}</style>`);
    }
    return i2;
  }, []).join("");
}, getStyleSheet({ name: e = "", theme: t2 = {}, params: r2, props: s4 = {}, set: o, defaults: a3 }) {
  var c;
  let n = { name: e, theme: t2, params: r2, set: o, defaults: a3 }, l2 = (c = e.includes("-directive") ? this.getPresetD(n) : this.getPresetC(n)) == null ? void 0 : c.css, i2 = Object.entries(s4).reduce((m2, [u2, p2]) => m2.push(`${u2}="${p2}"`) && m2, []).join(" ");
  return l2 ? `<style type="text/css" data-primevue-style-id="${e}-variables" ${i2}>${G(l2)}</style>` : "";
}, createTokens(e = {}, t2, r2 = "", s4 = "", o = {}) {
  return {};
}, getTokenValue(e, t2, r2) {
  var l2;
  let o = ((i2) => i2.split(".").filter((m2) => !z(m2.toLowerCase(), r2.variable.excludedKeyRegex)).join("."))(t2), a3 = t2.includes("colorScheme.light") ? "light" : t2.includes("colorScheme.dark") ? "dark" : void 0, n = [(l2 = e[o]) == null ? void 0 : l2.computed(a3)].flat().filter((i2) => i2);
  return n.length === 1 ? n[0].value : n.reduce((i2 = {}, c) => {
    let p2 = c, { colorScheme: m2 } = p2, u2 = b2(p2, ["colorScheme"]);
    return i2[m2] = u2, i2;
  }, void 0);
}, getSelectorRule(e, t2, r2, s4) {
  return r2 === "class" || r2 === "attr" ? T(s(t2) ? `${e}${t2},${e} ${t2}` : e, s4) : T(e, T(t2 != null ? t2 : ":root", s4));
}, transformCSS(e, t2, r2, s4, o = {}, a3, n, l2) {
  if (s(t2)) {
    let { cssLayer: i2 } = o;
    if (s4 !== "style") {
      let c = this.getColorSchemeOption(o, n);
      t2 = r2 === "dark" ? c.reduce((m2, { type: u2, selector: p2 }) => (s(p2) && (m2 += p2.includes("[CSS]") ? p2.replace("[CSS]", t2) : this.getSelectorRule(p2, l2, u2, t2)), m2), "") : T(l2 != null ? l2 : ":root", t2);
    }
    if (i2) {
      let c = { name: "primeui", order: "primeui" };
      i(i2) && (c.name = m(i2.name, { name: e, type: s4 })), s(c.name) && (t2 = T(`@layer ${c.name}`, t2), a3 == null || a3.layerNames(c.name));
    }
    return t2;
  }
  return "";
} };
var g3 = { defaults: { variable: { prefix: "p", selector: ":root", excludedKeyRegex: /^(primitive|semantic|components|directives|variables|colorscheme|light|dark|common|root|states|extend|css)$/gi }, options: { prefix: "p", darkModeSelector: "system", cssLayer: false } }, _theme: void 0, _layerNames: /* @__PURE__ */ new Set(), _loadedStyleNames: /* @__PURE__ */ new Set(), _loadingStyles: /* @__PURE__ */ new Set(), _tokens: {}, update(e = {}) {
  let { theme: t2 } = e;
  t2 && (this._theme = _2(d2({}, t2), { options: d2(d2({}, this.defaults.options), t2.options) }), this._tokens = S.createTokens(this.preset, this.defaults), this.clearLoadedStyleNames());
}, get theme() {
  return this._theme;
}, get preset() {
  var e;
  return ((e = this.theme) == null ? void 0 : e.preset) || {};
}, get options() {
  var e;
  return ((e = this.theme) == null ? void 0 : e.options) || {};
}, get tokens() {
  return this._tokens;
}, getTheme() {
  return this.theme;
}, setTheme(e) {
  this.update({ theme: e }), R.emit("theme:change", e);
}, getPreset() {
  return this.preset;
}, setPreset(e) {
  this._theme = _2(d2({}, this.theme), { preset: e }), this._tokens = S.createTokens(e, this.defaults), this.clearLoadedStyleNames(), R.emit("preset:change", e), R.emit("theme:change", this.theme);
}, getOptions() {
  return this.options;
}, setOptions(e) {
  this._theme = _2(d2({}, this.theme), { options: e }), this.clearLoadedStyleNames(), R.emit("options:change", e), R.emit("theme:change", this.theme);
}, getLayerNames() {
  return [...this._layerNames];
}, setLayerNames(e) {
  this._layerNames.add(e);
}, getLoadedStyleNames() {
  return this._loadedStyleNames;
}, isStyleNameLoaded(e) {
  return this._loadedStyleNames.has(e);
}, setLoadedStyleName(e) {
  this._loadedStyleNames.add(e);
}, deleteLoadedStyleName(e) {
  this._loadedStyleNames.delete(e);
}, clearLoadedStyleNames() {
  this._loadedStyleNames.clear();
}, getTokenValue(e) {
  return S.getTokenValue(this.tokens, e, this.defaults);
}, getCommon(e = "", t2) {
  return S.getCommon({ name: e, theme: this.theme, params: t2, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } });
}, getComponent(e = "", t2) {
  let r2 = { name: e, theme: this.theme, params: t2, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } };
  return S.getPresetC(r2);
}, getDirective(e = "", t2) {
  let r2 = { name: e, theme: this.theme, params: t2, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } };
  return S.getPresetD(r2);
}, getCustomPreset(e = "", t2, r2, s4) {
  let o = { name: e, preset: t2, options: this.options, selector: r2, params: s4, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } };
  return S.getPreset(o);
}, getLayerOrderCSS(e = "") {
  return S.getLayerOrder(e, this.options, { names: this.getLayerNames() }, this.defaults);
}, transformCSS(e = "", t2, r2 = "style", s4) {
  return S.transformCSS(e, t2, s4, r2, this.options, { layerNames: this.setLayerNames.bind(this) }, this.defaults);
}, getCommonStyleSheet(e = "", t2, r2 = {}) {
  return S.getCommonStyleSheet({ name: e, theme: this.theme, params: t2, props: r2, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } });
}, getStyleSheet(e, t2, r2 = {}) {
  return S.getStyleSheet({ name: e, theme: this.theme, params: t2, props: r2, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } });
}, onStyleMounted(e) {
  this._loadingStyles.add(e);
}, onStyleUpdated(e) {
  this._loadingStyles.add(e);
}, onStyleLoaded(e, { name: t2 }) {
  this._loadingStyles.size && (this._loadingStyles.delete(t2), R.emit(`theme:${t2}:load`, e), !this._loadingStyles.size && R.emit("theme:load"));
} };
function we(...e) {
  let t2 = w(g3.getPreset(), ...e);
  return g3.setPreset(t2), t2;
}
function Ce(e) {
  return O().primaryPalette(e).update().preset;
}
function Oe(e) {
  return O().surfacePalette(e).update().preset;
}
function Ve(...e) {
  let t2 = w(...e);
  return g3.setPreset(t2), t2;
}
function Ee(e) {
  return O(e).update({ mergePresets: false });
}
var me = class {
  constructor({ attrs: t2 } = {}) {
    this._styles = /* @__PURE__ */ new Map(), this._attrs = t2 || {};
  }
  get(t2) {
    return this._styles.get(t2);
  }
  has(t2) {
    return this._styles.has(t2);
  }
  delete(t2) {
    this._styles.delete(t2);
  }
  clear() {
    this._styles.clear();
  }
  add(t2, r2) {
    if (s(r2)) {
      let s4 = { name: t2, css: r2, attrs: this._attrs, markup: q(r2, this._attrs) };
      this._styles.set(t2, _2(d2({}, s4), { element: this.createStyleElement(s4) }));
    }
  }
  update() {
  }
  getStyles() {
    return this._styles;
  }
  getAllCSS() {
    return [...this._styles.values()].map((t2) => t2.css).filter(String);
  }
  getAllMarkup() {
    return [...this._styles.values()].map((t2) => t2.markup).filter(String);
  }
  getAllElements() {
    return [...this._styles.values()].map((t2) => t2.element);
  }
  createStyleElement(t2 = {}) {
  }
};
var vt = me;

// node_modules/@primeuix/themes/dist/index.mjs
var t = (...t2) => Se(...t2);
var a2 = (...t2) => we(...t2);
var r = (t2) => Ce(t2);
var s3 = (t2) => Oe(t2);
var u = (...t2) => Ve(...t2);
var P2 = (theme) => Ee(theme);
export {
  tr as $dt,
  O as $t,
  lt as CALC_REGEX,
  v as EXPR_REGEX,
  vt as StyleSheet,
  g3 as Theme,
  R as ThemeService,
  S as ThemeUtils,
  ct as VAR_REGEX,
  ar as css,
  t as definePreset,
  P as dt,
  le as dtwt,
  oe2 as evaluateDtExpressions,
  Mt as getComputedValue,
  T as getRule,
  ne as getVariableName,
  Y as getVariableValue,
  dt as hasOddBraces,
  Et as merge,
  A as mix,
  gt as palette,
  _e as setProperty,
  ae as shade,
  ie as tint,
  mt as toNormalizePrefix,
  Q as toNormalizeVariable,
  Vt as toTokenKey,
  Lt as toUnit,
  ke as toValue,
  ce as toVariables,
  a2 as updatePreset,
  r as updatePrimaryPalette,
  s3 as updateSurfacePalette,
  u as usePreset,
  P2 as useTheme
};
//# sourceMappingURL=@primeuix_themes.js.map
