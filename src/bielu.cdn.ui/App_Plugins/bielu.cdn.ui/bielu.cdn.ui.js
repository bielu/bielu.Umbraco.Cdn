/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const He = window, Pt = He.ShadowRoot && (He.ShadyCSS === void 0 || He.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, xt = Symbol(), qt = /* @__PURE__ */ new WeakMap();
let Yr = class {
  constructor(e, r, o) {
    if (this._$cssResult$ = !0, o !== xt)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = r;
  }
  get styleSheet() {
    let e = this.o;
    const r = this.t;
    if (Pt && e === void 0) {
      const o = r !== void 0 && r.length === 1;
      o && (e = qt.get(r)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), o && qt.set(r, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Je = (t) => new Yr(typeof t == "string" ? t : t + "", void 0, xt), Ae = (t, ...e) => {
  const r = t.length === 1 ? t[0] : e.reduce((o, n, s) => o + ((i) => {
    if (i._$cssResult$ === !0)
      return i.cssText;
    if (typeof i == "number")
      return i;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + i + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + t[s + 1], t[0]);
  return new Yr(r, t, xt);
}, en = (t, e) => {
  Pt ? t.adoptedStyleSheets = e.map((r) => r instanceof CSSStyleSheet ? r : r.styleSheet) : e.forEach((r) => {
    const o = document.createElement("style"), n = He.litNonce;
    n !== void 0 && o.setAttribute("nonce", n), o.textContent = r.cssText, t.appendChild(o);
  });
}, Wt = Pt ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let r = "";
  for (const o of e.cssRules)
    r += o.cssText;
  return Je(r);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var et;
const ze = window, Gt = ze.trustedTypes, tn = Gt ? Gt.emptyScript : "", Jt = ze.reactiveElementPolyfillSupport, pt = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? tn : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let r = t;
  switch (e) {
    case Boolean:
      r = t !== null;
      break;
    case Number:
      r = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        r = JSON.parse(t);
      } catch {
        r = null;
      }
  }
  return r;
} }, Xr = (t, e) => e !== t && (e == e || t == t), tt = { attribute: !0, type: String, converter: pt, reflect: !1, hasChanged: Xr }, ft = "finalized";
let le = class extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = !1, this.hasUpdated = !1, this._$El = null, this._$Eu();
  }
  static addInitializer(e) {
    var r;
    this.finalize(), ((r = this.h) !== null && r !== void 0 ? r : this.h = []).push(e);
  }
  static get observedAttributes() {
    this.finalize();
    const e = [];
    return this.elementProperties.forEach((r, o) => {
      const n = this._$Ep(o, r);
      n !== void 0 && (this._$Ev.set(n, o), e.push(n));
    }), e;
  }
  static createProperty(e, r = tt) {
    if (r.state && (r.attribute = !1), this.finalize(), this.elementProperties.set(e, r), !r.noAccessor && !this.prototype.hasOwnProperty(e)) {
      const o = typeof e == "symbol" ? Symbol() : "__" + e, n = this.getPropertyDescriptor(e, o, r);
      n !== void 0 && Object.defineProperty(this.prototype, e, n);
    }
  }
  static getPropertyDescriptor(e, r, o) {
    return { get() {
      return this[r];
    }, set(n) {
      const s = this[e];
      this[r] = n, this.requestUpdate(e, s, o);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) || tt;
  }
  static finalize() {
    if (this.hasOwnProperty(ft))
      return !1;
    this[ft] = !0;
    const e = Object.getPrototypeOf(this);
    if (e.finalize(), e.h !== void 0 && (this.h = [...e.h]), this.elementProperties = new Map(e.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const r = this.properties, o = [...Object.getOwnPropertyNames(r), ...Object.getOwnPropertySymbols(r)];
      for (const n of o)
        this.createProperty(n, r[n]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), !0;
  }
  static finalizeStyles(e) {
    const r = [];
    if (Array.isArray(e)) {
      const o = new Set(e.flat(1 / 0).reverse());
      for (const n of o)
        r.unshift(Wt(n));
    } else
      e !== void 0 && r.push(Wt(e));
    return r;
  }
  static _$Ep(e, r) {
    const o = r.attribute;
    return o === !1 ? void 0 : typeof o == "string" ? o : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  _$Eu() {
    var e;
    this._$E_ = new Promise((r) => this.enableUpdating = r), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), (e = this.constructor.h) === null || e === void 0 || e.forEach((r) => r(this));
  }
  addController(e) {
    var r, o;
    ((r = this._$ES) !== null && r !== void 0 ? r : this._$ES = []).push(e), this.renderRoot !== void 0 && this.isConnected && ((o = e.hostConnected) === null || o === void 0 || o.call(e));
  }
  removeController(e) {
    var r;
    (r = this._$ES) === null || r === void 0 || r.splice(this._$ES.indexOf(e) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((e, r) => {
      this.hasOwnProperty(r) && (this._$Ei.set(r, this[r]), delete this[r]);
    });
  }
  createRenderRoot() {
    var e;
    const r = (e = this.shadowRoot) !== null && e !== void 0 ? e : this.attachShadow(this.constructor.shadowRootOptions);
    return en(r, this.constructor.elementStyles), r;
  }
  connectedCallback() {
    var e;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$ES) === null || e === void 0 || e.forEach((r) => {
      var o;
      return (o = r.hostConnected) === null || o === void 0 ? void 0 : o.call(r);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$ES) === null || e === void 0 || e.forEach((r) => {
      var o;
      return (o = r.hostDisconnected) === null || o === void 0 ? void 0 : o.call(r);
    });
  }
  attributeChangedCallback(e, r, o) {
    this._$AK(e, o);
  }
  _$EO(e, r, o = tt) {
    var n;
    const s = this.constructor._$Ep(e, o);
    if (s !== void 0 && o.reflect === !0) {
      const i = (((n = o.converter) === null || n === void 0 ? void 0 : n.toAttribute) !== void 0 ? o.converter : pt).toAttribute(r, o.type);
      this._$El = e, i == null ? this.removeAttribute(s) : this.setAttribute(s, i), this._$El = null;
    }
  }
  _$AK(e, r) {
    var o;
    const n = this.constructor, s = n._$Ev.get(e);
    if (s !== void 0 && this._$El !== s) {
      const i = n.getPropertyOptions(s), a = typeof i.converter == "function" ? { fromAttribute: i.converter } : ((o = i.converter) === null || o === void 0 ? void 0 : o.fromAttribute) !== void 0 ? i.converter : pt;
      this._$El = s, this[s] = a.fromAttribute(r, i.type), this._$El = null;
    }
  }
  requestUpdate(e, r, o) {
    let n = !0;
    e !== void 0 && (((o = o || this.constructor.getPropertyOptions(e)).hasChanged || Xr)(this[e], r) ? (this._$AL.has(e) || this._$AL.set(e, r), o.reflect === !0 && this._$El !== e && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(e, o))) : n = !1), !this.isUpdatePending && n && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = !0;
    try {
      await this._$E_;
    } catch (r) {
      Promise.reject(r);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var e;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((n, s) => this[s] = n), this._$Ei = void 0);
    let r = !1;
    const o = this._$AL;
    try {
      r = this.shouldUpdate(o), r ? (this.willUpdate(o), (e = this._$ES) === null || e === void 0 || e.forEach((n) => {
        var s;
        return (s = n.hostUpdate) === null || s === void 0 ? void 0 : s.call(n);
      }), this.update(o)) : this._$Ek();
    } catch (n) {
      throw r = !1, this._$Ek(), n;
    }
    r && this._$AE(o);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var r;
    (r = this._$ES) === null || r === void 0 || r.forEach((o) => {
      var n;
      return (n = o.hostUpdated) === null || n === void 0 ? void 0 : n.call(o);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$EC !== void 0 && (this._$EC.forEach((r, o) => this._$EO(o, this[o], r)), this._$EC = void 0), this._$Ek();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
le[ft] = !0, le.elementProperties = /* @__PURE__ */ new Map(), le.elementStyles = [], le.shadowRootOptions = { mode: "open" }, Jt == null || Jt({ ReactiveElement: le }), ((et = ze.reactiveElementVersions) !== null && et !== void 0 ? et : ze.reactiveElementVersions = []).push("1.6.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var rt;
const Le = window, fe = Le.trustedTypes, Yt = fe ? fe.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, ht = "$lit$", F = `lit$${(Math.random() + "").slice(9)}$`, Zr = "?" + F, rn = `<${Zr}>`, ne = document, we = () => ne.createComment(""), Se = (t) => t === null || typeof t != "object" && typeof t != "function", Qr = Array.isArray, on = (t) => Qr(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", ot = `[ 	
\f\r]`, be = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Xt = /-->/g, Zt = />/g, J = RegExp(`>|${ot}(?:([^\\s"'>=/]+)(${ot}*=${ot}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Qt = /'/g, er = /"/g, eo = /^(?:script|style|textarea|title)$/i, to = (t) => (e, ...r) => ({ _$litType$: t, strings: e, values: r }), C = to(1), ro = to(2), he = Symbol.for("lit-noChange"), m = Symbol.for("lit-nothing"), tr = /* @__PURE__ */ new WeakMap(), X = ne.createTreeWalker(ne, 129, null, !1);
function oo(t, e) {
  if (!Array.isArray(t) || !t.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return Yt !== void 0 ? Yt.createHTML(e) : e;
}
const nn = (t, e) => {
  const r = t.length - 1, o = [];
  let n, s = e === 2 ? "<svg>" : "", i = be;
  for (let a = 0; a < r; a++) {
    const c = t[a];
    let u, p, l = -1, d = 0;
    for (; d < c.length && (i.lastIndex = d, p = i.exec(c), p !== null); )
      d = i.lastIndex, i === be ? p[1] === "!--" ? i = Xt : p[1] !== void 0 ? i = Zt : p[2] !== void 0 ? (eo.test(p[2]) && (n = RegExp("</" + p[2], "g")), i = J) : p[3] !== void 0 && (i = J) : i === J ? p[0] === ">" ? (i = n ?? be, l = -1) : p[1] === void 0 ? l = -2 : (l = i.lastIndex - p[2].length, u = p[1], i = p[3] === void 0 ? J : p[3] === '"' ? er : Qt) : i === er || i === Qt ? i = J : i === Xt || i === Zt ? i = be : (i = J, n = void 0);
    const f = i === J && t[a + 1].startsWith("/>") ? " " : "";
    s += i === be ? c + rn : l >= 0 ? (o.push(u), c.slice(0, l) + ht + c.slice(l) + F + f) : c + F + (l === -2 ? (o.push(void 0), a) : f);
  }
  return [oo(t, s + (t[r] || "<?>") + (e === 2 ? "</svg>" : "")), o];
};
class Oe {
  constructor({ strings: e, _$litType$: r }, o) {
    let n;
    this.parts = [];
    let s = 0, i = 0;
    const a = e.length - 1, c = this.parts, [u, p] = nn(e, r);
    if (this.el = Oe.createElement(u, o), X.currentNode = this.el.content, r === 2) {
      const l = this.el.content, d = l.firstChild;
      d.remove(), l.append(...d.childNodes);
    }
    for (; (n = X.nextNode()) !== null && c.length < a; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) {
          const l = [];
          for (const d of n.getAttributeNames())
            if (d.endsWith(ht) || d.startsWith(F)) {
              const f = p[i++];
              if (l.push(d), f !== void 0) {
                const S = n.getAttribute(f.toLowerCase() + ht).split(F), $ = /([.?@])?(.*)/.exec(f);
                c.push({ type: 1, index: s, name: $[2], strings: S, ctor: $[1] === "." ? an : $[1] === "?" ? cn : $[1] === "@" ? un : Ye });
              } else
                c.push({ type: 6, index: s });
            }
          for (const d of l)
            n.removeAttribute(d);
        }
        if (eo.test(n.tagName)) {
          const l = n.textContent.split(F), d = l.length - 1;
          if (d > 0) {
            n.textContent = fe ? fe.emptyScript : "";
            for (let f = 0; f < d; f++)
              n.append(l[f], we()), X.nextNode(), c.push({ type: 2, index: ++s });
            n.append(l[d], we());
          }
        }
      } else if (n.nodeType === 8)
        if (n.data === Zr)
          c.push({ type: 2, index: s });
        else {
          let l = -1;
          for (; (l = n.data.indexOf(F, l + 1)) !== -1; )
            c.push({ type: 7, index: s }), l += F.length - 1;
        }
      s++;
    }
  }
  static createElement(e, r) {
    const o = ne.createElement("template");
    return o.innerHTML = e, o;
  }
}
function ve(t, e, r = t, o) {
  var n, s, i, a;
  if (e === he)
    return e;
  let c = o !== void 0 ? (n = r._$Co) === null || n === void 0 ? void 0 : n[o] : r._$Cl;
  const u = Se(e) ? void 0 : e._$litDirective$;
  return (c == null ? void 0 : c.constructor) !== u && ((s = c == null ? void 0 : c._$AO) === null || s === void 0 || s.call(c, !1), u === void 0 ? c = void 0 : (c = new u(t), c._$AT(t, r, o)), o !== void 0 ? ((i = (a = r)._$Co) !== null && i !== void 0 ? i : a._$Co = [])[o] = c : r._$Cl = c), c !== void 0 && (e = ve(t, c._$AS(t, e.values), c, o)), e;
}
class sn {
  constructor(e, r) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = r;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    var r;
    const { el: { content: o }, parts: n } = this._$AD, s = ((r = e == null ? void 0 : e.creationScope) !== null && r !== void 0 ? r : ne).importNode(o, !0);
    X.currentNode = s;
    let i = X.nextNode(), a = 0, c = 0, u = n[0];
    for (; u !== void 0; ) {
      if (a === u.index) {
        let p;
        u.type === 2 ? p = new Pe(i, i.nextSibling, this, e) : u.type === 1 ? p = new u.ctor(i, u.name, u.strings, this, e) : u.type === 6 && (p = new dn(i, this, e)), this._$AV.push(p), u = n[++c];
      }
      a !== (u == null ? void 0 : u.index) && (i = X.nextNode(), a++);
    }
    return X.currentNode = ne, s;
  }
  v(e) {
    let r = 0;
    for (const o of this._$AV)
      o !== void 0 && (o.strings !== void 0 ? (o._$AI(e, o, r), r += o.strings.length - 2) : o._$AI(e[r])), r++;
  }
}
class Pe {
  constructor(e, r, o, n) {
    var s;
    this.type = 2, this._$AH = m, this._$AN = void 0, this._$AA = e, this._$AB = r, this._$AM = o, this.options = n, this._$Cp = (s = n == null ? void 0 : n.isConnected) === null || s === void 0 || s;
  }
  get _$AU() {
    var e, r;
    return (r = (e = this._$AM) === null || e === void 0 ? void 0 : e._$AU) !== null && r !== void 0 ? r : this._$Cp;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const r = this._$AM;
    return r !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = r.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, r = this) {
    e = ve(this, e, r), Se(e) ? e === m || e == null || e === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : e !== this._$AH && e !== he && this._(e) : e._$litType$ !== void 0 ? this.g(e) : e.nodeType !== void 0 ? this.$(e) : on(e) ? this.T(e) : this._(e);
  }
  k(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  $(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.k(e));
  }
  _(e) {
    this._$AH !== m && Se(this._$AH) ? this._$AA.nextSibling.data = e : this.$(ne.createTextNode(e)), this._$AH = e;
  }
  g(e) {
    var r;
    const { values: o, _$litType$: n } = e, s = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = Oe.createElement(oo(n.h, n.h[0]), this.options)), n);
    if (((r = this._$AH) === null || r === void 0 ? void 0 : r._$AD) === s)
      this._$AH.v(o);
    else {
      const i = new sn(s, this), a = i.u(this.options);
      i.v(o), this.$(a), this._$AH = i;
    }
  }
  _$AC(e) {
    let r = tr.get(e.strings);
    return r === void 0 && tr.set(e.strings, r = new Oe(e)), r;
  }
  T(e) {
    Qr(this._$AH) || (this._$AH = [], this._$AR());
    const r = this._$AH;
    let o, n = 0;
    for (const s of e)
      n === r.length ? r.push(o = new Pe(this.k(we()), this.k(we()), this, this.options)) : o = r[n], o._$AI(s), n++;
    n < r.length && (this._$AR(o && o._$AB.nextSibling, n), r.length = n);
  }
  _$AR(e = this._$AA.nextSibling, r) {
    var o;
    for ((o = this._$AP) === null || o === void 0 || o.call(this, !1, !0, r); e && e !== this._$AB; ) {
      const n = e.nextSibling;
      e.remove(), e = n;
    }
  }
  setConnected(e) {
    var r;
    this._$AM === void 0 && (this._$Cp = e, (r = this._$AP) === null || r === void 0 || r.call(this, e));
  }
}
class Ye {
  constructor(e, r, o, n, s) {
    this.type = 1, this._$AH = m, this._$AN = void 0, this.element = e, this.name = r, this._$AM = n, this.options = s, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = m;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e, r = this, o, n) {
    const s = this.strings;
    let i = !1;
    if (s === void 0)
      e = ve(this, e, r, 0), i = !Se(e) || e !== this._$AH && e !== he, i && (this._$AH = e);
    else {
      const a = e;
      let c, u;
      for (e = s[0], c = 0; c < s.length - 1; c++)
        u = ve(this, a[o + c], r, c), u === he && (u = this._$AH[c]), i || (i = !Se(u) || u !== this._$AH[c]), u === m ? e = m : e !== m && (e += (u ?? "") + s[c + 1]), this._$AH[c] = u;
    }
    i && !n && this.j(e);
  }
  j(e) {
    e === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class an extends Ye {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === m ? void 0 : e;
  }
}
const ln = fe ? fe.emptyScript : "";
class cn extends Ye {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    e && e !== m ? this.element.setAttribute(this.name, ln) : this.element.removeAttribute(this.name);
  }
}
class un extends Ye {
  constructor(e, r, o, n, s) {
    super(e, r, o, n, s), this.type = 5;
  }
  _$AI(e, r = this) {
    var o;
    if ((e = (o = ve(this, e, r, 0)) !== null && o !== void 0 ? o : m) === he)
      return;
    const n = this._$AH, s = e === m && n !== m || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== m && (n === m || s);
    s && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var r, o;
    typeof this._$AH == "function" ? this._$AH.call((o = (r = this.options) === null || r === void 0 ? void 0 : r.host) !== null && o !== void 0 ? o : this.element, e) : this._$AH.handleEvent(e);
  }
}
class dn {
  constructor(e, r, o) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = r, this.options = o;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    ve(this, e);
  }
}
const rr = Le.litHtmlPolyfillSupport;
rr == null || rr(Oe, Pe), ((rt = Le.litHtmlVersions) !== null && rt !== void 0 ? rt : Le.litHtmlVersions = []).push("2.8.0");
const pn = (t, e, r) => {
  var o, n;
  const s = (o = r == null ? void 0 : r.renderBefore) !== null && o !== void 0 ? o : e;
  let i = s._$litPart$;
  if (i === void 0) {
    const a = (n = r == null ? void 0 : r.renderBefore) !== null && n !== void 0 ? n : null;
    s._$litPart$ = i = new Pe(e.insertBefore(we(), a), a, void 0, r ?? {});
  }
  return i._$AI(t), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var nt, st;
class de extends le {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e, r;
    const o = super.createRenderRoot();
    return (e = (r = this.renderOptions).renderBefore) !== null && e !== void 0 || (r.renderBefore = o.firstChild), o;
  }
  update(e) {
    const r = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = pn(r, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) === null || e === void 0 || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) === null || e === void 0 || e.setConnected(!1);
  }
  render() {
    return he;
  }
}
de.finalized = !0, de._$litElement$ = !0, (nt = globalThis.litElementHydrateSupport) === null || nt === void 0 || nt.call(globalThis, { LitElement: de });
const or = globalThis.litElementPolyfillSupport;
or == null || or({ LitElement: de });
((st = globalThis.litElementVersions) !== null && st !== void 0 ? st : globalThis.litElementVersions = []).push("3.3.3");
Ae`
  @keyframes uui-blink {
    0%,
    100% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
  }
`;
Je("uui-blink 0.9s infinite both");
Ae`
  @keyframes pulse {
    0% {
      -webkit-transform: translate(-50%, -50%) scale(0.2);
      transform: translate(-50%, -50%) scale(0.2);
      opacity: 0.9;
    }
    80% {
      -webkit-transform: translate(-50%, -50%) scale(1.2);
      transform: translate(-50%, -50%) scale(1.2);
      opacity: 0;
    }
    100% {
      -webkit-transform: translate(-50%, -50%) scale(2.2);
      transform: translate(-50%, -50%) scale(2.2);
      opacity: 0;
    }
  }
`;
Je(
  "pulse 0.8s ease-in-out infinite both"
);
const fn = Ae`
  @keyframes uui-horizontal-shake {
    10%,
    90% {
      transform: translateX(-1px);
    }

    20%,
    80% {
      transform: translateX(1px);
    }

    30%,
    50%,
    70% {
      transform: translateX(-2px);
    }

    40%,
    60% {
      transform: translateX(2px);
    }
  }
`, hn = Je(
  "uui-horizontal-shake 600ms ease backwards"
), it = (t, e, r = `This element has to be present for ${t.nodeName} to work appropriate.`) => {
  customElements.get(e) || console.warn(
    `%c ${t.nodeName} requires ${e} element to be registered!`,
    "font-weight: bold;",
    r,
    t
  );
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const vn = (t, e) => e.kind === "method" && e.descriptor && !("value" in e.descriptor) ? { ...e, finisher(r) {
  r.createProperty(e.key, t);
} } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e.key, initializer() {
  typeof e.initializer == "function" && (this[e.key] = e.initializer.call(this));
}, finisher(r) {
  r.createProperty(e.key, t);
} }, _n = (t, e, r) => {
  e.constructor.createProperty(r, t);
};
function _(t) {
  return (e, r) => r !== void 0 ? _n(t, e, r) : vn(t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Ct(t) {
  return _({ ...t, state: !0 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const bn = ({ finisher: t, descriptor: e }) => (r, o) => {
  var n;
  if (o === void 0) {
    const s = (n = r.originalKey) !== null && n !== void 0 ? n : r.key, i = e != null ? { kind: "method", placement: "prototype", key: s, descriptor: e(r.key) } : { ...r, key: s };
    return t != null && (i.finisher = function(a) {
      t(a, s);
    }), i;
  }
  {
    const s = r.constructor;
    e !== void 0 && Object.defineProperty(r, o, e(o)), t == null || t(s, o);
  }
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function no(t, e) {
  return bn({ descriptor: (r) => {
    const o = { get() {
      var n, s;
      return (s = (n = this.renderRoot) === null || n === void 0 ? void 0 : n.querySelector(t)) !== null && s !== void 0 ? s : null;
    }, enumerable: !0, configurable: !0 };
    if (e) {
      const n = typeof r == "symbol" ? Symbol() : "__" + r;
      o.get = function() {
        var s, i;
        return this[n] === void 0 && (this[n] = (i = (s = this.renderRoot) === null || s === void 0 ? void 0 : s.querySelector(t)) !== null && i !== void 0 ? i : null), this[n];
      };
    }
    return o;
  } });
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var at;
((at = window.HTMLSlotElement) === null || at === void 0 ? void 0 : at.prototype.assignedElements) != null;
var mn = Object.defineProperty, gn = Object.getOwnPropertyDescriptor, nr = (t, e, r, o) => {
  for (var n = o > 1 ? void 0 : o ? gn(e, r) : e, s = t.length - 1, i; s >= 0; s--)
    (i = t[s]) && (n = (o ? i(e, r, n) : i(n)) || n);
  return o && n && mn(e, r, n), n;
};
const $n = (t, e) => {
  class r extends e {
    constructor() {
      super(...arguments), this._labelSlotHasContent = !1;
    }
    connectedCallback() {
      super.connectedCallback(), this.label || console.warn(this.tagName + " needs a `label`", this);
    }
    labelSlotChanged(n) {
      this._labelSlotHasContent = n.target.assignedNodes({ flatten: !0 }).length > 0;
    }
    /**
     * Call in the mixed element to render the label template. It contains a slot. This is optional.
     * @method renderLabel
     * @returns {TemplateResult}
     */
    renderLabel() {
      return C`
        ${this._labelSlotHasContent === !1 ? C`<span class="label">${this.label}</span>` : ""}
        <slot
          class="label"
          style=${this._labelSlotHasContent ? "" : "visibility: hidden"}
          name=${t || ""}
          @slotchange=${this.labelSlotChanged}></slot>
      `;
    }
  }
  return nr([
    _({ type: String })
  ], r.prototype, "label", 2), nr([
    Ct()
  ], r.prototype, "_labelSlotHasContent", 2), r;
};
var yn = Object.defineProperty, sr = Object.getOwnPropertySymbols, En = Object.prototype.hasOwnProperty, wn = Object.prototype.propertyIsEnumerable, ir = (t, e, r) => e in t ? yn(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, Sn = (t, e) => {
  for (var r in e || (e = {}))
    En.call(e, r) && ir(t, r, e[r]);
  if (sr)
    for (var r of sr(e))
      wn.call(e, r) && ir(t, r, e[r]);
  return t;
};
let On = class extends Event {
  constructor(e, r = {}) {
    super(e, Sn({}, r)), this.detail = r.detail || {};
  }
};
var Nn = Object.defineProperty, ar = Object.getOwnPropertySymbols, An = Object.prototype.hasOwnProperty, Pn = Object.prototype.propertyIsEnumerable, lr = (t, e, r) => e in t ? Nn(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, cr = (t, e) => {
  for (var r in e || (e = {}))
    An.call(e, r) && lr(t, r, e[r]);
  if (ar)
    for (var r of ar(e))
      Pn.call(e, r) && lr(t, r, e[r]);
  return t;
};
let so = class extends On {
  constructor(e, r = {}) {
    super(e, cr(cr({}, { bubbles: !0, cancelable: !0 }), r));
  }
};
so.SELECTED = "selected";
so.DESELECTED = "deselected";
var xn = Object.defineProperty, ur = Object.getOwnPropertySymbols, Cn = Object.prototype.hasOwnProperty, Vn = Object.prototype.propertyIsEnumerable, dr = (t, e, r) => e in t ? xn(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, In = (t, e) => {
  for (var r in e || (e = {}))
    Cn.call(e, r) && dr(t, r, e[r]);
  if (ur)
    for (var r of ur(e))
      Vn.call(e, r) && dr(t, r, e[r]);
  return t;
};
let io = class extends Event {
  constructor(e, r = {}) {
    super(e, In({}, r)), this.detail = r.detail || {};
  }
};
var Tn = Object.defineProperty, pr = Object.getOwnPropertySymbols, Rn = Object.prototype.hasOwnProperty, Dn = Object.prototype.propertyIsEnumerable, fr = (t, e, r) => e in t ? Tn(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, hr = (t, e) => {
  for (var r in e || (e = {}))
    Rn.call(e, r) && fr(t, r, e[r]);
  if (pr)
    for (var r of pr(e))
      Dn.call(e, r) && fr(t, r, e[r]);
  return t;
};
let ce = class extends io {
  constructor(e, r = {}) {
    super(e, hr(hr({}, { bubbles: !0 }), r));
  }
};
ce.VALID = "valid";
ce.INVALID = "invalid";
var Mn = Object.defineProperty, vr = Object.getOwnPropertySymbols, Un = Object.prototype.hasOwnProperty, Hn = Object.prototype.propertyIsEnumerable, _r = (t, e, r) => e in t ? Mn(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, br = (t, e) => {
  for (var r in e || (e = {}))
    Un.call(e, r) && _r(t, r, e[r]);
  if (vr)
    for (var r of vr(e))
      Hn.call(e, r) && _r(t, r, e[r]);
  return t;
};
let ao = class extends io {
  constructor(e, r = {}) {
    super(e, br(br({}, { bubbles: !0, cancelable: !0 }), r));
  }
};
ao.SELECTED = "selected";
ao.DESELECTED = "deselected";
var jn = Object.defineProperty, kn = Object.getOwnPropertyDescriptor, Y = (t, e, r, o) => {
  for (var n = o > 1 ? void 0 : o ? kn(e, r) : e, s = t.length - 1, i; s >= 0; s--)
    (i = t[s]) && (n = (o ? i(e, r, n) : i(n)) || n);
  return o && n && jn(e, r, n), n;
};
const lo = (t) => {
  class e extends t {
    constructor(...o) {
      super(...o), this.name = "", this._validityState = {}, this.pristine = !0, this.required = !1, this.requiredMessage = "This field is required", this.error = !1, this.errorMessage = "This field is invalid", this._value = "", this._form = null, this._validators = [], this._formCtrlElements = [], this._onFormSubmit = () => {
        this.pristine = !1;
      }, this._internals = this.attachInternals(), this.addValidator(
        "valueMissing",
        () => this.requiredMessage,
        () => this.hasAttribute("required") && this.hasValue() === !1
      ), this.addValidator(
        "customError",
        () => this.errorMessage,
        () => this.error
      ), this.addEventListener("blur", () => {
        this.pristine = !1;
      });
    }
    // Do not 'reflect' as the attribute is used as fallback.
    get value() {
      return this._value;
    }
    set value(o) {
      const n = this._value;
      this._value = o, "ElementInternals" in window && //@ts-ignore
      "setFormValue" in window.ElementInternals.prototype && this._internals.setFormValue(this._value), this.requestUpdate("value", n);
    }
    /**
     * Determn wether this FormControl has a value.
     * @method hasValue
     * @returns {boolean}
     */
    hasValue() {
      return this.value !== "";
    }
    disconnectedCallback() {
      super.disconnectedCallback(), this._removeFormListeners();
    }
    _removeFormListeners() {
      this._form && this._form.removeEventListener("submit", this._onFormSubmit);
    }
    /**
     * Add validator, to validate this Form Control.
     * See https://developer.mozilla.org/en-US/docs/Web/API/ValidityState for available Validator FlagTypes.
     *
     * @example
     * this.addValidator(
     *  'tooLong',
     *  () => 'This input contains too many characters',
     *  () => this._value.length > 10
     * );
     * @method hasValue
     * @param {FlagTypes} flagKey the type of validation.
     * @param {method} getMessageMethod method to retrieve relevant message. Is executed every time the validator is re-executed.
     * @param {method} checkMethod method to determine if this validator should invalidate this form control. Return true if this should prevent submission.
     */
    addValidator(o, n, s) {
      const i = {
        flagKey: o,
        getMessageMethod: n,
        checkMethod: s
      };
      return this._validators.push(i), i;
    }
    removeValidator(o) {
      const n = this._validators.indexOf(o);
      n !== -1 && this._validators.splice(n, 1);
    }
    /**
     * @method addFormControlElement
     * @description Important notice if adding a native form control then ensure that its value and thereby validity is updated when value is changed from the outside.
     * @param element {NativeFormControlElement} - element to validate and include as part of this form association.
     */
    addFormControlElement(o) {
      this._formCtrlElements.push(o);
    }
    /**
     * @method setCustomValidity
     * @description Set custom validity state, set to empty string to remove the custom message.
     * @param message {string} - The message to be shown
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/setCustomValidity|HTMLObjectElement:setCustomValidity}
     */
    setCustomValidity(o) {
      this._customValidityObject && this.removeValidator(this._customValidityObject), o != null && o !== "" && (this._customValidityObject = this.addValidator(
        "customError",
        () => o,
        () => !0
      )), this._runValidators();
    }
    _runValidators() {
      this._validityState = {}, this._formCtrlElements.forEach((n) => {
        for (const s in n.validity)
          s !== "valid" && n.validity[s] && (this._validityState[s] = !0, this._internals.setValidity(
            this._validityState,
            n.validationMessage,
            n
          ));
      }), this._validators.forEach((n) => {
        n.checkMethod() && (this._validityState[n.flagKey] = !0, this._internals.setValidity(
          this._validityState,
          n.getMessageMethod(),
          this.getFormElement()
        ));
      });
      const o = Object.values(this._validityState).includes(!0);
      this._validityState.valid = !o, o ? this.dispatchEvent(
        new ce(ce.INVALID)
      ) : (this._internals.setValidity({}), this.dispatchEvent(new ce(ce.VALID)));
    }
    updated(o) {
      super.updated(o), this._runValidators();
    }
    submit() {
      var o;
      (o = this._form) == null || o.requestSubmit();
    }
    formAssociatedCallback() {
      this._removeFormListeners(), this._form = this._internals.form, this._form && (this._form.hasAttribute("submit-invalid") && (this.pristine = !1), this._form.addEventListener("submit", this._onFormSubmit));
    }
    formResetCallback() {
      this.pristine = !0, this.value = this.getAttribute("value") || "";
    }
    checkValidity() {
      var o;
      for (const n in this._formCtrlElements)
        if (this._formCtrlElements[n].checkValidity() === !1)
          return !1;
      return (o = this._internals) == null ? void 0 : o.checkValidity();
    }
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/validity
    get validity() {
      return this._validityState;
    }
    get validationMessage() {
      var o;
      return (o = this._internals) == null ? void 0 : o.validationMessage;
    }
  }
  return e.formAssociated = !0, Y([
    _({ type: String })
  ], e.prototype, "name", 2), Y([
    _()
  ], e.prototype, "value", 1), Y([
    _({ type: Boolean, reflect: !0 })
  ], e.prototype, "pristine", 2), Y([
    _({ type: Boolean, reflect: !0 })
  ], e.prototype, "required", 2), Y([
    _({ type: String, attribute: "required-message" })
  ], e.prototype, "requiredMessage", 2), Y([
    _({ type: Boolean, reflect: !0 })
  ], e.prototype, "error", 2), Y([
    _({ type: String, attribute: "error-message" })
  ], e.prototype, "errorMessage", 2), e;
}, zn = (t, e, r) => {
  let o = t;
  for (; o !== null; ) {
    const n = o instanceof HTMLElement && o.hasAttribute(e) && o.getAttribute(e) === r, s = o.querySelector(`[${e}="${r}"]`) !== null;
    if (n)
      return o;
    if (s)
      return o.querySelector(
        `[${e}="${r}"]`
      );
    o = o.parentElement || o.parentNode || null;
  }
  return null;
};
var Ln = Object.defineProperty, Fn = Object.getOwnPropertyDescriptor, Bn = (t, e, r, o) => {
  for (var n = o > 1 ? void 0 : o ? Fn(e, r) : e, s = t.length - 1, i; s >= 0; s--)
    (i = t[s]) && (n = (o ? i(e, r, n) : i(n)) || n);
  return o && n && Ln(e, r, n), n;
}, co = (t, e, r) => {
  if (!e.has(t))
    throw TypeError("Cannot " + r);
}, mr = (t, e, r) => (co(t, e, "read from private field"), r ? r.call(t) : e.get(t)), gr = (t, e, r) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, r);
}, Kn = (t, e, r, o) => (co(t, e, "write to private field"), o ? o.call(t, r) : e.set(t, r), r);
const qn = (t) => {
  var e, r;
  class o extends t {
    constructor(...s) {
      super(...s), gr(this, e, !1), this._togglePopover = () => {
        if (!this.popoverContainerElement)
          return;
        const i = zn(
          this,
          "id",
          this.popoverContainerElement
        );
        i && (mr(this, e) ? (
          // @ts-ignore - This is part of the new popover API, but typescript doesn't recognize it yet.
          i.hidePopover()
        ) : (
          // @ts-ignore - This is part of the new popover API, but typescript doesn't recognize it yet.
          i.showPopover()
        ));
      }, gr(this, r, (i) => {
        requestAnimationFrame(() => {
          Kn(this, e, i.detail.newState === "open");
        });
      }), this.addEventListener("uui-popover-before-toggle", mr(this, r));
    }
  }
  return e = /* @__PURE__ */ new WeakMap(), r = /* @__PURE__ */ new WeakMap(), Bn([
    _({ type: String, attribute: "popovertarget" })
  ], o.prototype, "popoverContainerElement", 2), o;
};
function uo(t, e) {
  return (r) => {
    if (t.indexOf("-") > 0 === !1) {
      console.error(
        `${t} is not a valid custom element name. A custom element name should consist of at least two words separated by a hyphen.`
      );
      return;
    }
    window.customElements.get(t) || window.customElements.define(t, r, e);
  };
}
const Wn = ro`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
<path d="M461.884 68.14c-132.601 81.297-228.817 183.87-272.048 235.345l-105.874-82.95-46.751 37.691 182.941 186.049c31.485-80.646 131.198-238.264 252.956-350.252L461.884 68.14z"/>
</svg>`, Gn = ro`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
<path d="M422.952 371.305L307.064 255.418l115.884-115.887-51.722-51.723L255.34 203.693 139.457 87.812l-51.726 51.719 115.885 115.885L87.731 371.305l51.726 51.721L255.344 307.14l115.884 115.882z"/>
</svg>`;
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const lt = (t) => t ?? m;
var Jn = Object.defineProperty, Yn = Object.getOwnPropertyDescriptor, j = (t, e, r, o) => {
  for (var n = o > 1 ? void 0 : o ? Yn(e, r) : e, s = t.length - 1, i; s >= 0; s--)
    (i = t[s]) && (n = (o ? i(e, r, n) : i(n)) || n);
  return o && n && Jn(e, r, n), n;
};
let V = class extends lo(
  $n("", qn(de))
) {
  constructor() {
    super(), this.type = "button", this.disabled = !1, this.look = "default", this.color = "default", this.compact = !1, this.state = void 0, this.addEventListener("click", this._onHostClick);
  }
  getFormElement() {
    return this._button;
  }
  _onHostClick(t) {
    var e;
    if (this.disabled) {
      t.preventDefault(), t.stopImmediatePropagation();
      return;
    }
    if ((e = this._internals) != null && e.form)
      switch (this.type) {
        case "reset":
          this._internals.form.reset();
          break;
        case "button":
          break;
        default:
          this._internals.form.requestSubmit ? this._internals.form.requestSubmit() : this._internals.form.dispatchEvent(new SubmitEvent("submit"));
          break;
      }
    this._togglePopover();
  }
  // Reset the state after 2sec if it is 'success' or 'failed'.
  updated(t) {
    super.updated(t), t.has("state") && (clearTimeout(this._resetStateTimeout), (this.state === "success" || this.state === "failed") && (this._resetStateTimeout = setTimeout(
      () => this.state = void 0,
      2e3
    )));
  }
  renderState() {
    let t;
    switch (this.state) {
      case "waiting":
        it(this, "uui-loader-circle"), t = C`<uui-loader-circle id="loader"></uui-loader-circle>`;
        break;
      case "success":
        it(this, "uui-icon"), t = C`<uui-icon
          name="check"
          .fallback=${Wn.strings[0]}></uui-icon>`;
        break;
      case "failed":
        it(this, "uui-icon"), t = C`<uui-icon
          name="wrong"
          .fallback=${Gn.strings[0]}></uui-icon>`;
        break;
      default:
        return m;
    }
    return C`<div id="state">${t}</div>`;
  }
  render() {
    return this.href ? C`
          <a
            id="button"
            aria-label=${this.label}
            href=${lt(this.disabled ? void 0 : this.href)}
            target=${lt(this.target || void 0)}
            rel=${lt(
      this.target === "_blank" ? "noopener noreferrer" : void 0
    )}>
            ${this.renderState()} ${this.renderLabel()}
            <slot name="extra"></slot>
          </a>
        ` : C`
          <button
            id="button"
            ?disabled=${this.disabled}
            aria-label=${this.label}>
            ${this.renderState()} ${this.renderLabel()}
            <slot name="extra"></slot>
          </button>
        `;
  }
};
V.styles = [
  fn,
  Ae`
      :host {
        position: relative;
        display: inline-flex;
        margin-left: calc(var(--uui-button-merge-border-left, 0) * -1px);
        --uui-button-padding-left-factor: 3;
        --uui-button-padding-right-factor: 3;
        --uui-button-padding-top-factor: 1;
        --uui-button-padding-bottom-factor: 1;

        min-height: var(--uui-button-height, var(--uui-size-11,33px));
        max-height: 100%;
        cursor: pointer;

        text-align: center;
        font-size: var(--uui-button-font-size, inherit);
        font-weight: var(--uui-button-font-weight, 500);
        transition: background-color 80ms, border-color 80ms, color 80ms;
      }

      :host([compact]) {
        --uui-button-padding-left-factor: 1;
        --uui-button-padding-right-factor: 1;
        --uui-button-padding-top-factor: 0;
        --uui-button-padding-bottom-factor: 0;
      }

      .label {
        line-height: normal; /** needed to reset 'a > span' */
        display: block;
        transition: opacity 120ms;
      }
      :host([state]:not([state=''])) .label {
        opacity: 0;
      }

      #state {
        position: absolute;
        opacity: 0;
        animation-name: fadeIn;
        animation-delay: 40ms;
        animation-duration: 360ms;
        animation-fill-mode: forwards;
        display: flex;
        justify-content: center;
        width: 100%;
        height: 100%;
        align-items: center;
      }

      #button {
        width: 100%;
        background-color: transparent;
        color: inherit;
        font-size: inherit;
        border-radius: inherit;
        font-family: inherit;
        font-weight: inherit;
        text-align: inherit;
        border: none;
        cursor: inherit;

        display: inline-flex;
        align-items: center;
        justify-content: var(--uui-button-content-align, center);

        /* for anchor tag: */
        text-decoration: none;
        color: currentColor;
        line-height: inherit;

        border-width: var(--uui-button-border-width, 1px);
        border-style: solid;
        border-radius: var(
          --uui-button-border-radius,
          var(--uui-border-radius,3px)
        );
        cursor: pointer;

        padding: calc(var(--uui-size-2,6px) * var(--uui-button-padding-top-factor))
          calc(var(--uui-size-2,6px) * var(--uui-button-padding-right-factor))
          calc(var(--uui-size-2,6px) * var(--uui-button-padding-bottom-factor))
          calc(var(--uui-size-2,6px) * var(--uui-button-padding-left-factor));

        box-shadow: none;
      }
      button[disabled]:active,
      a:not([href]):active {
        animation: ${hn};
      }
      #icon-check,
      #icon-wrong {
        fill: currentColor;
        display: grid;
        place-items: center;
        width: 1.5em;
      }

      #loader {
        font-size: 1.5em;
      }
      :host([look]:not([look=''])) #loader {
        color: inherit;
      }

      /* ANIMATIONS */
      @keyframes fadeIn {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }

      @keyframes fadeOut {
        0% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }

      /* edge case for default color */
      :host(:not([color]):not([look='primary'])),
      :host([color='']:not([look='primary'])),
      :host([color='default']:not([look='primary'])) {
        --uui-button-contrast-hover: var(--uui-color-default-emphasis,#3544b1);
      }

      :host([color='warning'][look='outline']) #button,
      :host([color='warning'][look='placeholder']) #button {
        --uui-button-contrast-hover: var(--color-standalone);
      }

      /** Button color attribute: */
      #button {
        --color: var(--uui-color-default,#1b264f);
        --color-standalone: var(--uui-color-default-standalone,rgb(28, 35, 59));
        --color-emphasis: var(--uui-color-default-emphasis,#3544b1);
        --color-contrast: var(--uui-color-default-contrast,#fff);
      }
      :host([color='positive']) #button {
        --color: var(--uui-color-positive,#1f9554);
        --color-standalone: var(--uui-color-positive-standalone,#19864a);
        --color-emphasis: var(--uui-color-positive-emphasis,#2ca964);
        --color-contrast: var(--uui-color-positive-contrast,#fff);
      }
      :host([color='warning']) #button {
        --color: var(--uui-color-warning,#fbd142);
        --color-standalone: var(--uui-color-warning-standalone,#a17700);
        --color-emphasis: var(--uui-color-warning-emphasis,rgb(251, 224, 101));
        --color-contrast: var(--uui-color-warning-contrast,#000);
      }
      :host([color='danger']) #button {
        --color: var(--uui-color-danger,#d42054);
        --color-standalone: var(--uui-color-danger-standalone,rgb(191, 33, 78));
        --color-emphasis: var(--uui-color-danger-emphasis,rgb(226, 60, 107));
        --color-contrast: var(--uui-color-danger-contrast,white);
      }
      :host([disabled]) #button {
        --color: var(--uui-color-disabled,#f3f3f5);
        --color-standalone: var(--uui-color-disabled-contrast,#c4c4c4);
        --color-emphasis: var(--uui-color-disabled,#f3f3f5);
        --color-contrast: var(--uui-color-disabled-contrast,#c4c4c4);

        cursor: default;
      }

      /** Button look attribute: */
      /* DEFAULT */
      #button {
        background-color: var(--uui-button-background-color, transparent);
        color: var(--uui-button-contrast, var(--color-standalone));
        border-color: var(--uui-button-border-color, transparent);
      }
      :host(:not([disabled]):hover) #button {
        background-color: var(
          --uui-button-background-color-hover,
          var(--uui-color-surface-emphasis,rgb(250, 250, 250))
        );
        color: var(--uui-button-contrast-hover, var(--color-standalone));
        border-color: var(--uui-button-border-color-hover, transparent);
      }
      :host([disabled]) #button {
        background-color: var(
          --uui-button-background-color-disabled,
          transparent
        );
        color: var(--uui-button-contrast-disabled, var(--color-contrast));
        border-color: var(--uui-button-border-color-disabled, transparent);
      }

      /* PRIMARY */
      :host([look='primary']) #button {
        background-color: var(--uui-button-background-color, var(--color));
        color: var(--uui-button-contrast, var(--color-contrast));
        border-color: var(--uui-button-border-color, transparent);

        /* special for primary: */
        font-weight: var(--uui-button-font-weight, 700);
      }
      :host([look='primary']:hover) #button {
        background-color: var(
          --uui-button-background-color-hover,
          var(--color-emphasis)
        );
        color: var(--uui-button-contrast-hover, var(--color-contrast));
        border-color: var(--uui-button-border-color-hover, transparent);
      }
      :host([look='primary'][disabled]) #button {
        background-color: var(
          --uui-button-background-color-disabled,
          var(--color)
        );
        color: var(--uui-button-contrast-disabled, var(--color-contrast));
        border-color: var(--uui-button-border-color-disabled, var(--color));
      }
      /* SECONDARY */
      :host([look='secondary']) #button {
        background-color: var(
          --uui-button-background-color,
          var(--uui-color-surface-alt,#f3f3f5)
        );
        color: var(--uui-button-contrast, var(--color-standalone));
        border-color: var(--uui-button-border-color, transparent);

        /* special for secondary: */
        font-weight: var(--uui-button-font-weight, 700);
      }
      :host([look='secondary']:hover) #button {
        background-color: var(
          --uui-button-background-color-hover,
          var(--uui-color-surface-emphasis,rgb(250, 250, 250))
        );
        color: var(--uui-button-contrast-hover, var(--color-standalone));
        border-color: var(--uui-button-border-color-hover, transparent);
      }
      :host([look='secondary'][disabled]) #button {
        background-color: var(
          --uui-button-background-color-disabled,
          var(--color)
        );
        color: var(--uui-button-contrast-disabled, var(--color-contrast));
        border-color: var(--uui-button-border-color-disabled, var(--color));
      }

      /* OUTLINE */
      :host([look='outline']) #button {
        background-color: var(--uui-button-background-color, transparent);
        color: var(--uui-button-contrast, var(--color-standalone));
        border-color: var(
          --uui-button-border-color,
          var(--uui-color-border-standalone,#c2c2c2)
        );

        /* special for outline: */
        font-weight: var(--uui-button-font-weight, 700);
      }
      :host([look='outline']:not([disabled]):hover) #button {
        background-color: var(--uui-button-background-color-hover, transparent);
        color: var(--uui-button-contrast-hover, var(--color-standalone));
        border-color: var(--uui-button-border-color-hover);
      }
      :host([look='outline'][disabled]) #button {
        background-color: var(
          --uui-button-background-color-disabled,
          transparent
        );
        color: var(--uui-button-contrast-disabled, var(--color-standalone));
        border-color: var(
          --uui-button-border-color-disabled,
          var(--color-standalone)
        );
      }

      /* PLACEHOLDER */
      :host([look='placeholder']) #button {
        border-style: dashed;
        background-color: var(--uui-button-background-color, transparent);
        color: var(--uui-button-contrast, var(--color-standalone));
        border-color: var(
          --uui-button-border-color,
          var(--uui-color-border-standalone,#c2c2c2)
        );
      }
      :host([look='placeholder']:not([disabled]):hover) #button {
        background-color: var(--uui-button-background-color-hover, transparent);
        color: var(--uui-button-contrast-hover, var(--color-standalone));
        border-color: var(--uui-button-border-color-hover);
      }
      :host([look='placeholder'][disabled]) #button {
        background-color: var(
          --uui-button-background-color-disabled,
          var(--color)
        );
        color: var(--uui-button-contrast-disabled, var(--color-standalone));
        border-color: var(
          --uui-button-border-color-disabled,
          var(--color-standalone)
        );
      }
    `
];
j([
  _({ type: String, reflect: !0 })
], V.prototype, "type", 2);
j([
  _({ type: Boolean, reflect: !0 })
], V.prototype, "disabled", 2);
j([
  _({ reflect: !0 })
], V.prototype, "look", 2);
j([
  _({ reflect: !0 })
], V.prototype, "color", 2);
j([
  _({ type: Boolean, reflect: !0 })
], V.prototype, "compact", 2);
j([
  _({ type: String, reflect: !0 })
], V.prototype, "state", 2);
j([
  _({ type: String })
], V.prototype, "href", 2);
j([
  _({ type: String })
], V.prototype, "target", 2);
j([
  no("#button")
], V.prototype, "_button", 2);
V = j([
  uo("uui-button")
], V);
var Xn = Object.defineProperty, $r = Object.getOwnPropertySymbols, Zn = Object.prototype.hasOwnProperty, Qn = Object.prototype.propertyIsEnumerable, yr = (t, e, r) => e in t ? Xn(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, es = (t, e) => {
  for (var r in e || (e = {}))
    Zn.call(e, r) && yr(t, r, e[r]);
  if ($r)
    for (var r of $r(e))
      Qn.call(e, r) && yr(t, r, e[r]);
  return t;
};
class Vt extends Event {
  constructor(e, r = {}) {
    super(e, es({}, r)), this.detail = r.detail || {};
  }
}
var ts = Object.defineProperty, Er = Object.getOwnPropertySymbols, rs = Object.prototype.hasOwnProperty, os = Object.prototype.propertyIsEnumerable, wr = (t, e, r) => e in t ? ts(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, Sr = (t, e) => {
  for (var r in e || (e = {}))
    rs.call(e, r) && wr(t, r, e[r]);
  if (Er)
    for (var r of Er(e))
      os.call(e, r) && wr(t, r, e[r]);
  return t;
};
class po extends Vt {
  constructor(e, r = {}) {
    super(e, Sr(Sr({}, { bubbles: !0 }), r));
  }
}
po.VALID = "valid";
po.INVALID = "invalid";
var ns = Object.defineProperty, Or = Object.getOwnPropertySymbols, ss = Object.prototype.hasOwnProperty, is = Object.prototype.propertyIsEnumerable, Nr = (t, e, r) => e in t ? ns(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, Ar = (t, e) => {
  for (var r in e || (e = {}))
    ss.call(e, r) && Nr(t, r, e[r]);
  if (Or)
    for (var r of Or(e))
      is.call(e, r) && Nr(t, r, e[r]);
  return t;
};
class fo extends Vt {
  constructor(e, r = {}) {
    super(e, Ar(Ar({}, { bubbles: !0, cancelable: !0 }), r));
  }
}
fo.SELECTED = "selected";
fo.DESELECTED = "deselected";
var as = Object.defineProperty, Pr = Object.getOwnPropertySymbols, ls = Object.prototype.hasOwnProperty, cs = Object.prototype.propertyIsEnumerable, xr = (t, e, r) => e in t ? as(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, Cr = (t, e) => {
  for (var r in e || (e = {}))
    ls.call(e, r) && xr(t, r, e[r]);
  if (Pr)
    for (var r of Pr(e))
      cs.call(e, r) && xr(t, r, e[r]);
  return t;
};
class vt extends Vt {
  constructor(e, r = {}) {
    super(e, Cr(Cr({}, { bubbles: !0 }), r));
  }
}
vt.CHANGE = "change";
var us = Object.defineProperty, ds = Object.getOwnPropertyDescriptor, k = (t, e, r, o) => {
  for (var n = o > 1 ? void 0 : o ? ds(e, r) : e, s = t.length - 1, i; s >= 0; s--)
    (i = t[s]) && (n = (o ? i(e, r, n) : i(n)) || n);
  return o && n && us(e, r, n), n;
};
let I = class extends lo(de) {
  constructor() {
    super(), this.placeholder = "", this.disabled = !1, this.error = !1, this.options = [], this._groups = [], this.disabledGroups = "", this._disabledGroups = [], this._values = [], this.addEventListener("mousedown", () => {
      this.style.setProperty("--uui-show-focus-outline", "0");
    }), this.addEventListener("blur", () => {
      this.style.setProperty("--uui-show-focus-outline", "");
    });
  }
  /**
   * This method enables <label for="..."> to focus the select
   */
  focus() {
    this._input.focus();
  }
  /**
   * This method enables <label for="..."> to open the select
   */
  click() {
    this._input.click();
  }
  connectedCallback() {
    super.connectedCallback(), this.label || console.warn(this.tagName + " needs a `label`", this);
  }
  _createDisabledGroups() {
    this.disabledGroups.length !== 0 && (this._disabledGroups = this.disabledGroups.split(","));
  }
  _extractGroups() {
    this.options.length !== 0 && (this._groups = Array.from(
      new Set(
        this.options.filter((t) => t.group).map((t) => t.group)
      )
    ));
  }
  willUpdate(t) {
    if (t.has("options")) {
      this._extractGroups(), this._values = this.options.map((r) => r.value);
      const e = this.options.find((r) => r.selected);
      this.value = e ? e.value : "";
    }
    t.has("value") && (this.value = this._values.includes(this.value) ? this.value : ""), t.has("disabledGroups") && this._createDisabledGroups();
  }
  setValue(t) {
    t.stopPropagation();
    const e = t.target;
    t.target && (this.value = e.value), this.dispatchEvent(
      new vt(vt.CHANGE, {
        bubbles: !0,
        composed: !1
      })
    );
  }
  getFormElement() {
    return this._input;
  }
  _renderOption(t, e, r, o) {
    return C`<option
      value="${e}"
      ?selected=${r}
      ?disabled=${o}>
      ${t}
    </option>`;
  }
  _renderGrouped() {
    return this._groups.length === 0 ? m : C`
      ${this._groups.map(
      (t) => C`<optgroup
            label=${t}
            ?disabled=${this._disabledGroups.some(
        (e) => e.toLowerCase() === t.toLowerCase()
      )}>
            ${this.options.map(
        (e) => e.group === t ? this._renderOption(
          e.name,
          e.value,
          e.selected,
          e.disabled
        ) : ""
      )}
          </optgroup>`
    )}
    `;
  }
  render() {
    return C` <select
      id="native"
      aria-label=${this.label}
      @change=${this.setValue}
      ?disabled=${this.disabled}
      .name=${this.name}
      .value=${this.value}>
      <option disabled selected value="" hidden>${this.placeholder}</option>
      ${this._renderGrouped()}
      ${this.options.filter((t) => !t.group).map(
      (t) => this._renderOption(
        t.name,
        t.value,
        t.selected,
        t.disabled
      )
    )}
    </select>`;
  }
};
I.styles = [
  Ae`
      :host {
        position: relative;
        font-family: inherit;
      }

      #native {
        display: inline-block;
        font-family: inherit;
        font-size: var(--uui-select-font-size, var(--uui-size-5,15px));
        height: var(--uui-select-height, var(--uui-size-11,33px));
        width: 100%;
        padding: var(--uui-select-padding-y, var(--uui-size-1,3px))
          var(--uui-select-padding-x, var(--uui-size-2,6px));
        color: currentColor;
        border-radius: 0;
        box-sizing: border-box;
        background-color: transparent;
        border: 1px solid
          var(--uui-select-border-color, var(--uui-color-border,#d8d7d9));
        transition: all 150ms ease;
      }

      #native:focus {
        outline: calc(2px * var(--uui-show-focus-outline, 1)) solid
          var(--uui-color-focus,#3879ff);
      }

      #native[disabled] {
        cursor: not-allowed;
        background-color: var(
          --uui-select-disabled-background-color,
          var(--uui-color-disabled,#f3f3f5)
        );
      }

      #native:hover {
        border: 1px solid
          var(--uui-select-border-color-hover, var(--uui-color-border-emphasis,#a1a1a1));
      }

      option:checked {
        background: var(
          --uui-select-selected-option-background-color,
          var(--uui-color-selected,#3544b1)
        );
        color: var(
          --uui-select-selected-option-color,
          var(--uui-color-selected-contrast,#fff)
        );
      }

      /* TODO: a proper focus style has to be implemented. it needs it's own variables */
      #native:focus {
        outline-color: var(--uui-select-outline-color, var(--uui-color-focus,#3879ff));
      }

      #caret {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
      }

      :host([error]) #native {
        border: 1px solid var(--uui-color-danger-standalone,rgb(191, 33, 78));
      }

      :host([error]) #native[disabled] {
        border: 1px solid var(--uui-color-danger-standalone,rgb(191, 33, 78));
      }
    `
];
k([
  _({ type: String })
], I.prototype, "label", 2);
k([
  _()
], I.prototype, "placeholder", 2);
k([
  _({ type: Boolean, reflect: !0 })
], I.prototype, "disabled", 2);
k([
  _({ type: Boolean, reflect: !0 })
], I.prototype, "error", 2);
k([
  _({ type: Array, attribute: !1 })
], I.prototype, "options", 2);
k([
  Ct()
], I.prototype, "_groups", 2);
k([
  _()
], I.prototype, "disabledGroups", 2);
k([
  Ct()
], I.prototype, "_disabledGroups", 2);
k([
  no("#native")
], I.prototype, "_input", 2);
I = k([
  uo("uui-select")
], I);
function ps(t, e) {
  const r = /* @__PURE__ */ Object.create(null), o = t.split(",");
  for (let n = 0; n < o.length; n++)
    r[o[n]] = !0;
  return e ? (n) => !!r[n.toLowerCase()] : (n) => !!r[n];
}
const H = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, fs = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], ho = () => {
}, hs = /^on[^a-z]/, vs = (t) => hs.test(t), R = Object.assign, _s = (t, e) => {
  const r = t.indexOf(e);
  r > -1 && t.splice(r, 1);
}, bs = Object.prototype.hasOwnProperty, g = (t, e) => bs.call(t, e), v = Array.isArray, Z = (t) => Ze(t) === "[object Map]", vo = (t) => Ze(t) === "[object Set]", y = (t) => typeof t == "function", T = (t) => typeof t == "string", Xe = (t) => typeof t == "symbol", w = (t) => t !== null && typeof t == "object", ms = (t) => (w(t) || y(t)) && y(t.then) && y(t.catch), _o = Object.prototype.toString, Ze = (t) => _o.call(t), bo = (t) => Ze(t).slice(8, -1), mo = (t) => Ze(t) === "[object Object]", It = (t) => T(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, go = (t) => {
  const e = /* @__PURE__ */ Object.create(null);
  return (r) => e[r] || (e[r] = t(r));
}, gs = /-(\w)/g, Fe = go((t) => t.replace(gs, (e, r) => r ? r.toUpperCase() : "")), Be = go((t) => t.charAt(0).toUpperCase() + t.slice(1)), _e = (t, e) => !Object.is(t, e), $s = (t, e, r) => {
  Object.defineProperty(t, e, {
    configurable: !0,
    enumerable: !1,
    value: r
  });
};
let Vr;
const _t = () => Vr || (Vr = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Tt(t) {
  if (v(t)) {
    const e = {};
    for (let r = 0; r < t.length; r++) {
      const o = t[r], n = T(o) ? Ss(o) : Tt(o);
      if (n)
        for (const s in n)
          e[s] = n[s];
    }
    return e;
  } else if (T(t) || w(t))
    return t;
}
const ys = /;(?![^(]*\))/g, Es = /:([^]+)/, ws = /\/\*[^]*?\*\//g;
function Ss(t) {
  const e = {};
  return t.replace(ws, "").split(ys).forEach((r) => {
    if (r) {
      const o = r.split(Es);
      o.length > 1 && (e[o[0].trim()] = o[1].trim());
    }
  }), e;
}
function Rt(t) {
  let e = "";
  if (T(t))
    e = t;
  else if (v(t))
    for (let r = 0; r < t.length; r++) {
      const o = Rt(t[r]);
      o && (e += o + " ");
    }
  else if (w(t))
    for (const r in t)
      t[r] && (e += r + " ");
  return e.trim();
}
const Os = (t) => T(t) ? t : t == null ? "" : v(t) || w(t) && (t.toString === _o || !y(t.toString)) ? JSON.stringify(t, $o, 2) : String(t), $o = (t, e) => e && e.__v_isRef ? $o(t, e.value) : Z(e) ? {
  [`Map(${e.size})`]: [...e.entries()].reduce((r, [o, n]) => (r[`${o} =>`] = n, r), {})
} : vo(e) ? {
  [`Set(${e.size})`]: [...e.values()]
} : w(e) && !v(e) && !mo(e) ? String(e) : e;
function Ir(t, ...e) {
  console.warn(`[Vue warn] ${t}`, ...e);
}
let yo;
function Ns(t, e = yo) {
  e && e.active && e.effects.push(t);
}
function As() {
  return yo;
}
const bt = (t) => {
  const e = new Set(t);
  return e.w = 0, e.n = 0, e;
}, Eo = (t) => (t.w & W) > 0, wo = (t) => (t.n & W) > 0, Ps = ({ deps: t }) => {
  if (t.length)
    for (let e = 0; e < t.length; e++)
      t[e].w |= W;
}, xs = (t) => {
  const { deps: e } = t;
  if (e.length) {
    let r = 0;
    for (let o = 0; o < e.length; o++) {
      const n = e[o];
      Eo(n) && !wo(n) ? n.delete(t) : e[r++] = n, n.w &= ~W, n.n &= ~W;
    }
    e.length = r;
  }
}, mt = /* @__PURE__ */ new WeakMap();
let ge = 0, W = 1;
const gt = 30;
let N;
const Q = Symbol(process.env.NODE_ENV !== "production" ? "iterate" : ""), $t = Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
class Cs {
  constructor(e, r = null, o) {
    this.fn = e, this.scheduler = r, this.active = !0, this.deps = [], this.parent = void 0, Ns(this, o);
  }
  run() {
    if (!this.active)
      return this.fn();
    let e = N, r = ee;
    for (; e; ) {
      if (e === this)
        return;
      e = e.parent;
    }
    try {
      return this.parent = N, N = this, ee = !0, W = 1 << ++ge, ge <= gt ? Ps(this) : Tr(this), this.fn();
    } finally {
      ge <= gt && xs(this), W = 1 << --ge, N = this.parent, ee = r, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    N === this ? this.deferStop = !0 : this.active && (Tr(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function Tr(t) {
  const { deps: e } = t;
  if (e.length) {
    for (let r = 0; r < e.length; r++)
      e[r].delete(t);
    e.length = 0;
  }
}
let ee = !0;
const So = [];
function Oo() {
  So.push(ee), ee = !1;
}
function No() {
  const t = So.pop();
  ee = t === void 0 ? !0 : t;
}
function P(t, e, r) {
  if (ee && N) {
    let o = mt.get(t);
    o || mt.set(t, o = /* @__PURE__ */ new Map());
    let n = o.get(r);
    n || o.set(r, n = bt());
    const s = process.env.NODE_ENV !== "production" ? { effect: N, target: t, type: e, key: r } : void 0;
    Vs(n, s);
  }
}
function Vs(t, e) {
  let r = !1;
  ge <= gt ? wo(t) || (t.n |= W, r = !Eo(t)) : r = !t.has(N), r && (t.add(N), N.deps.push(t), process.env.NODE_ENV !== "production" && N.onTrack && N.onTrack(
    R(
      {
        effect: N
      },
      e
    )
  ));
}
function q(t, e, r, o, n, s) {
  const i = mt.get(t);
  if (!i)
    return;
  let a = [];
  if (e === "clear")
    a = [...i.values()];
  else if (r === "length" && v(t)) {
    const u = Number(o);
    i.forEach((p, l) => {
      (l === "length" || !Xe(l) && l >= u) && a.push(p);
    });
  } else
    switch (r !== void 0 && a.push(i.get(r)), e) {
      case "add":
        v(t) ? It(r) && a.push(i.get("length")) : (a.push(i.get(Q)), Z(t) && a.push(i.get($t)));
        break;
      case "delete":
        v(t) || (a.push(i.get(Q)), Z(t) && a.push(i.get($t)));
        break;
      case "set":
        Z(t) && a.push(i.get(Q));
        break;
    }
  const c = process.env.NODE_ENV !== "production" ? { target: t, type: e, key: r, newValue: o, oldValue: n, oldTarget: s } : void 0;
  if (a.length === 1)
    a[0] && (process.env.NODE_ENV !== "production" ? Ce(a[0], c) : Ce(a[0]));
  else {
    const u = [];
    for (const p of a)
      p && u.push(...p);
    process.env.NODE_ENV !== "production" ? Ce(bt(u), c) : Ce(bt(u));
  }
}
function Ce(t, e) {
  const r = v(t) ? t : [...t];
  for (const o of r)
    o.computed && Rr(o, e);
  for (const o of r)
    o.computed || Rr(o, e);
}
function Rr(t, e) {
  (t !== N || t.allowRecurse) && (process.env.NODE_ENV !== "production" && t.onTrigger && t.onTrigger(R({ effect: t }, e)), t.scheduler ? t.scheduler() : t.run());
}
const Is = /* @__PURE__ */ ps("__proto__,__v_isRef,__isVue"), Ao = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(Xe)
), Dr = /* @__PURE__ */ Ts();
function Ts() {
  const t = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((e) => {
    t[e] = function(...r) {
      const o = h(this);
      for (let s = 0, i = this.length; s < i; s++)
        P(o, "get", s + "");
      const n = o[e](...r);
      return n === -1 || n === !1 ? o[e](...r.map(h)) : n;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
    t[e] = function(...r) {
      Oo();
      const o = h(this)[e].apply(this, r);
      return No(), o;
    };
  }), t;
}
function Rs(t) {
  const e = h(this);
  return P(e, "has", t), e.hasOwnProperty(t);
}
class Po {
  constructor(e = !1, r = !1) {
    this._isReadonly = e, this._shallow = r;
  }
  get(e, r, o) {
    const n = this._isReadonly, s = this._shallow;
    if (r === "__v_isReactive")
      return !n;
    if (r === "__v_isReadonly")
      return n;
    if (r === "__v_isShallow")
      return s;
    if (r === "__v_raw" && o === (n ? s ? To : Io : s ? Ws : Vo).get(e))
      return e;
    const i = v(e);
    if (!n) {
      if (i && g(Dr, r))
        return Reflect.get(Dr, r, o);
      if (r === "hasOwnProperty")
        return Rs;
    }
    const a = Reflect.get(e, r, o);
    return (Xe(r) ? Ao.has(r) : Is(r)) || (n || P(e, "get", r), s) ? a : A(a) ? i && It(r) ? a : a.value : w(a) ? n ? Do(a) : Ro(a) : a;
  }
}
class Ds extends Po {
  constructor(e = !1) {
    super(!1, e);
  }
  set(e, r, o, n) {
    let s = e[r];
    if (se(s) && A(s) && !A(o))
      return !1;
    if (!this._shallow && (!yt(o) && !se(o) && (s = h(s), o = h(o)), !v(e) && A(s) && !A(o)))
      return s.value = o, !0;
    const i = v(e) && It(r) ? Number(r) < e.length : g(e, r), a = Reflect.set(e, r, o, n);
    return e === h(n) && (i ? _e(o, s) && q(e, "set", r, o, s) : q(e, "add", r, o)), a;
  }
  deleteProperty(e, r) {
    const o = g(e, r), n = e[r], s = Reflect.deleteProperty(e, r);
    return s && o && q(e, "delete", r, void 0, n), s;
  }
  has(e, r) {
    const o = Reflect.has(e, r);
    return (!Xe(r) || !Ao.has(r)) && P(e, "has", r), o;
  }
  ownKeys(e) {
    return P(
      e,
      "iterate",
      v(e) ? "length" : Q
    ), Reflect.ownKeys(e);
  }
}
class xo extends Po {
  constructor(e = !1) {
    super(!0, e);
  }
  set(e, r) {
    return process.env.NODE_ENV !== "production" && Ir(
      `Set operation on key "${String(r)}" failed: target is readonly.`,
      e
    ), !0;
  }
  deleteProperty(e, r) {
    return process.env.NODE_ENV !== "production" && Ir(
      `Delete operation on key "${String(r)}" failed: target is readonly.`,
      e
    ), !0;
  }
}
const Ms = /* @__PURE__ */ new Ds(), Us = /* @__PURE__ */ new xo(), Hs = /* @__PURE__ */ new xo(!0), Dt = (t) => t, Qe = (t) => Reflect.getPrototypeOf(t);
function Ve(t, e, r = !1, o = !1) {
  t = t.__v_raw;
  const n = h(t), s = h(e);
  r || (_e(e, s) && P(n, "get", e), P(n, "get", s));
  const { has: i } = Qe(n), a = o ? Dt : r ? jt : Ht;
  if (i.call(n, e))
    return a(t.get(e));
  if (i.call(n, s))
    return a(t.get(s));
  t !== n && t.get(e);
}
function Ie(t, e = !1) {
  const r = this.__v_raw, o = h(r), n = h(t);
  return e || (_e(t, n) && P(o, "has", t), P(o, "has", n)), t === n ? r.has(t) : r.has(t) || r.has(n);
}
function Te(t, e = !1) {
  return t = t.__v_raw, !e && P(h(t), "iterate", Q), Reflect.get(t, "size", t);
}
function Mr(t) {
  t = h(t);
  const e = h(this);
  return Qe(e).has.call(e, t) || (e.add(t), q(e, "add", t, t)), this;
}
function Ur(t, e) {
  e = h(e);
  const r = h(this), { has: o, get: n } = Qe(r);
  let s = o.call(r, t);
  s ? process.env.NODE_ENV !== "production" && Co(r, o, t) : (t = h(t), s = o.call(r, t));
  const i = n.call(r, t);
  return r.set(t, e), s ? _e(e, i) && q(r, "set", t, e, i) : q(r, "add", t, e), this;
}
function Hr(t) {
  const e = h(this), { has: r, get: o } = Qe(e);
  let n = r.call(e, t);
  n ? process.env.NODE_ENV !== "production" && Co(e, r, t) : (t = h(t), n = r.call(e, t));
  const s = o ? o.call(e, t) : void 0, i = e.delete(t);
  return n && q(e, "delete", t, void 0, s), i;
}
function jr() {
  const t = h(this), e = t.size !== 0, r = process.env.NODE_ENV !== "production" ? Z(t) ? new Map(t) : new Set(t) : void 0, o = t.clear();
  return e && q(t, "clear", void 0, void 0, r), o;
}
function Re(t, e) {
  return function(o, n) {
    const s = this, i = s.__v_raw, a = h(i), c = e ? Dt : t ? jt : Ht;
    return !t && P(a, "iterate", Q), i.forEach((u, p) => o.call(n, c(u), c(p), s));
  };
}
function De(t, e, r) {
  return function(...o) {
    const n = this.__v_raw, s = h(n), i = Z(s), a = t === "entries" || t === Symbol.iterator && i, c = t === "keys" && i, u = n[t](...o), p = r ? Dt : e ? jt : Ht;
    return !e && P(
      s,
      "iterate",
      c ? $t : Q
    ), {
      // iterator protocol
      next() {
        const { value: l, done: d } = u.next();
        return d ? { value: l, done: d } : {
          value: a ? [p(l[0]), p(l[1])] : p(l),
          done: d
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function z(t) {
  return function(...e) {
    if (process.env.NODE_ENV !== "production") {
      const r = e[0] ? `on key "${e[0]}" ` : "";
      console.warn(
        `${Be(t)} operation ${r}failed: target is readonly.`,
        h(this)
      );
    }
    return t === "delete" ? !1 : this;
  };
}
function js() {
  const t = {
    get(s) {
      return Ve(this, s);
    },
    get size() {
      return Te(this);
    },
    has: Ie,
    add: Mr,
    set: Ur,
    delete: Hr,
    clear: jr,
    forEach: Re(!1, !1)
  }, e = {
    get(s) {
      return Ve(this, s, !1, !0);
    },
    get size() {
      return Te(this);
    },
    has: Ie,
    add: Mr,
    set: Ur,
    delete: Hr,
    clear: jr,
    forEach: Re(!1, !0)
  }, r = {
    get(s) {
      return Ve(this, s, !0);
    },
    get size() {
      return Te(this, !0);
    },
    has(s) {
      return Ie.call(this, s, !0);
    },
    add: z("add"),
    set: z("set"),
    delete: z("delete"),
    clear: z("clear"),
    forEach: Re(!0, !1)
  }, o = {
    get(s) {
      return Ve(this, s, !0, !0);
    },
    get size() {
      return Te(this, !0);
    },
    has(s) {
      return Ie.call(this, s, !0);
    },
    add: z("add"),
    set: z("set"),
    delete: z("delete"),
    clear: z("clear"),
    forEach: Re(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((s) => {
    t[s] = De(
      s,
      !1,
      !1
    ), r[s] = De(
      s,
      !0,
      !1
    ), e[s] = De(
      s,
      !1,
      !0
    ), o[s] = De(
      s,
      !0,
      !0
    );
  }), [
    t,
    r,
    e,
    o
  ];
}
const [
  ks,
  zs,
  Ls,
  Fs
] = /* @__PURE__ */ js();
function Mt(t, e) {
  const r = e ? t ? Fs : Ls : t ? zs : ks;
  return (o, n, s) => n === "__v_isReactive" ? !t : n === "__v_isReadonly" ? t : n === "__v_raw" ? o : Reflect.get(
    g(r, n) && n in o ? r : o,
    n,
    s
  );
}
const Bs = {
  get: /* @__PURE__ */ Mt(!1, !1)
}, Ks = {
  get: /* @__PURE__ */ Mt(!0, !1)
}, qs = {
  get: /* @__PURE__ */ Mt(!0, !0)
};
function Co(t, e, r) {
  const o = h(r);
  if (o !== r && e.call(t, o)) {
    const n = bo(t);
    console.warn(
      `Reactive ${n} contains both the raw and reactive versions of the same object${n === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const Vo = /* @__PURE__ */ new WeakMap(), Ws = /* @__PURE__ */ new WeakMap(), Io = /* @__PURE__ */ new WeakMap(), To = /* @__PURE__ */ new WeakMap();
function Gs(t) {
  switch (t) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Js(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : Gs(bo(t));
}
function Ro(t) {
  return se(t) ? t : Ut(
    t,
    !1,
    Ms,
    Bs,
    Vo
  );
}
function Do(t) {
  return Ut(
    t,
    !0,
    Us,
    Ks,
    Io
  );
}
function Me(t) {
  return Ut(
    t,
    !0,
    Hs,
    qs,
    To
  );
}
function Ut(t, e, r, o, n) {
  if (!w(t))
    return process.env.NODE_ENV !== "production" && console.warn(`value cannot be made reactive: ${String(t)}`), t;
  if (t.__v_raw && !(e && t.__v_isReactive))
    return t;
  const s = n.get(t);
  if (s)
    return s;
  const i = Js(t);
  if (i === 0)
    return t;
  const a = new Proxy(
    t,
    i === 2 ? o : r
  );
  return n.set(t, a), a;
}
function te(t) {
  return se(t) ? te(t.__v_raw) : !!(t && t.__v_isReactive);
}
function se(t) {
  return !!(t && t.__v_isReadonly);
}
function yt(t) {
  return !!(t && t.__v_isShallow);
}
function Et(t) {
  return te(t) || se(t);
}
function h(t) {
  const e = t && t.__v_raw;
  return e ? h(e) : t;
}
function Ys(t) {
  return $s(t, "__v_skip", !0), t;
}
const Ht = (t) => w(t) ? Ro(t) : t, jt = (t) => w(t) ? Do(t) : t;
function A(t) {
  return !!(t && t.__v_isRef === !0);
}
function Xs(t) {
  return A(t) ? t.value : t;
}
const Zs = {
  get: (t, e, r) => Xs(Reflect.get(t, e, r)),
  set: (t, e, r, o) => {
    const n = t[e];
    return A(n) && !A(r) ? (n.value = r, !0) : Reflect.set(t, e, r, o);
  }
};
function Qs(t) {
  return te(t) ? t : new Proxy(t, Zs);
}
const re = [];
function ei(t) {
  re.push(t);
}
function ti() {
  re.pop();
}
function E(t, ...e) {
  if (process.env.NODE_ENV === "production")
    return;
  Oo();
  const r = re.length ? re[re.length - 1].component : null, o = r && r.appContext.config.warnHandler, n = ri();
  if (o)
    oe(
      o,
      r,
      11,
      [
        t + e.join(""),
        r && r.proxy,
        n.map(
          ({ vnode: s }) => `at <${Yo(r, s.type)}>`
        ).join(`
`),
        n
      ]
    );
  else {
    const s = [`[Vue warn]: ${t}`, ...e];
    n.length && s.push(`
`, ...oi(n)), console.warn(...s);
  }
  No();
}
function ri() {
  let t = re[re.length - 1];
  if (!t)
    return [];
  const e = [];
  for (; t; ) {
    const r = e[0];
    r && r.vnode === t ? r.recurseCount++ : e.push({
      vnode: t,
      recurseCount: 0
    });
    const o = t.component && t.component.parent;
    t = o && o.vnode;
  }
  return e;
}
function oi(t) {
  const e = [];
  return t.forEach((r, o) => {
    e.push(...o === 0 ? [] : [`
`], ...ni(r));
  }), e;
}
function ni({ vnode: t, recurseCount: e }) {
  const r = e > 0 ? `... (${e} recursive calls)` : "", o = t.component ? t.component.parent == null : !1, n = ` at <${Yo(
    t.component,
    t.type,
    o
  )}`, s = ">" + r;
  return t.props ? [n, ...si(t.props), s] : [n + s];
}
function si(t) {
  const e = [], r = Object.keys(t);
  return r.slice(0, 3).forEach((o) => {
    e.push(...Mo(o, t[o]));
  }), r.length > 3 && e.push(" ..."), e;
}
function Mo(t, e, r) {
  return T(e) ? (e = JSON.stringify(e), r ? e : [`${t}=${e}`]) : typeof e == "number" || typeof e == "boolean" || e == null ? r ? e : [`${t}=${e}`] : A(e) ? (e = Mo(t, h(e.value), !0), r ? e : [`${t}=Ref<`, e, ">"]) : y(e) ? [`${t}=fn${e.name ? `<${e.name}>` : ""}`] : (e = h(e), r ? e : [`${t}=`, e]);
}
const Uo = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  0: "setup function",
  1: "render function",
  2: "watcher getter",
  3: "watcher callback",
  4: "watcher cleanup function",
  5: "native event handler",
  6: "component event handler",
  7: "vnode hook",
  8: "directive hook",
  9: "transition hook",
  10: "app errorHandler",
  11: "app warnHandler",
  12: "ref function",
  13: "async component loader",
  14: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function oe(t, e, r, o) {
  let n;
  try {
    n = o ? t(...o) : t();
  } catch (s) {
    Ho(s, e, r);
  }
  return n;
}
function wt(t, e, r, o) {
  if (y(t)) {
    const s = oe(t, e, r, o);
    return s && ms(s) && s.catch((i) => {
      Ho(i, e, r);
    }), s;
  }
  const n = [];
  for (let s = 0; s < t.length; s++)
    n.push(wt(t[s], e, r, o));
  return n;
}
function Ho(t, e, r, o = !0) {
  const n = e ? e.vnode : null;
  if (e) {
    let s = e.parent;
    const i = e.proxy, a = process.env.NODE_ENV !== "production" ? Uo[r] : r;
    for (; s; ) {
      const u = s.ec;
      if (u) {
        for (let p = 0; p < u.length; p++)
          if (u[p](t, i, a) === !1)
            return;
      }
      s = s.parent;
    }
    const c = e.appContext.config.errorHandler;
    if (c) {
      oe(
        c,
        null,
        10,
        [t, i, a]
      );
      return;
    }
  }
  ii(t, r, n, o);
}
function ii(t, e, r, o = !0) {
  if (process.env.NODE_ENV !== "production") {
    const n = Uo[e];
    if (r && ei(r), E(`Unhandled error${n ? ` during execution of ${n}` : ""}`), r && ti(), o)
      throw t;
    console.error(t);
  } else
    console.error(t);
}
let Ke = !1, St = !1;
const D = [];
let B = 0;
const pe = [];
let U = null, L = 0;
const jo = /* @__PURE__ */ Promise.resolve();
let kt = null;
const ai = 100;
function li(t) {
  const e = kt || jo;
  return t ? e.then(this ? t.bind(this) : t) : e;
}
function ci(t) {
  let e = B + 1, r = D.length;
  for (; e < r; ) {
    const o = e + r >>> 1, n = D[o], s = Ne(n);
    s < t || s === t && n.pre ? e = o + 1 : r = o;
  }
  return e;
}
function zt(t) {
  (!D.length || !D.includes(
    t,
    Ke && t.allowRecurse ? B + 1 : B
  )) && (t.id == null ? D.push(t) : D.splice(ci(t.id), 0, t), ko());
}
function ko() {
  !Ke && !St && (St = !0, kt = jo.then(Lo));
}
function zo(t) {
  v(t) ? pe.push(...t) : (!U || !U.includes(
    t,
    t.allowRecurse ? L + 1 : L
  )) && pe.push(t), ko();
}
function ui(t) {
  if (pe.length) {
    const e = [...new Set(pe)];
    if (pe.length = 0, U) {
      U.push(...e);
      return;
    }
    for (U = e, process.env.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()), U.sort((r, o) => Ne(r) - Ne(o)), L = 0; L < U.length; L++)
      process.env.NODE_ENV !== "production" && Fo(t, U[L]) || U[L]();
    U = null, L = 0;
  }
}
const Ne = (t) => t.id == null ? 1 / 0 : t.id, di = (t, e) => {
  const r = Ne(t) - Ne(e);
  if (r === 0) {
    if (t.pre && !e.pre)
      return -1;
    if (e.pre && !t.pre)
      return 1;
  }
  return r;
};
function Lo(t) {
  St = !1, Ke = !0, process.env.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()), D.sort(di);
  const e = process.env.NODE_ENV !== "production" ? (r) => Fo(t, r) : ho;
  try {
    for (B = 0; B < D.length; B++) {
      const r = D[B];
      if (r && r.active !== !1) {
        if (process.env.NODE_ENV !== "production" && e(r))
          continue;
        oe(r, null, 14);
      }
    }
  } finally {
    B = 0, D.length = 0, ui(t), Ke = !1, kt = null, (D.length || pe.length) && Lo(t);
  }
}
function Fo(t, e) {
  if (!t.has(e))
    t.set(e, 1);
  else {
    const r = t.get(e);
    if (r > ai) {
      const o = e.ownerInstance, n = o && Kt(o.type);
      return E(
        `Maximum recursive updates exceeded${n ? ` in component <${n}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`
      ), !0;
    } else
      t.set(e, r + 1);
  }
}
const me = /* @__PURE__ */ new Set();
process.env.NODE_ENV !== "production" && (_t().__VUE_HMR_RUNTIME__ = {
  createRecord: ct(pi),
  rerender: ct(fi),
  reload: ct(hi)
});
const qe = /* @__PURE__ */ new Map();
function pi(t, e) {
  return qe.has(t) ? !1 : (qe.set(t, {
    initialDef: ye(e),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function ye(t) {
  return Xo(t) ? t.__vccOpts : t;
}
function fi(t, e) {
  const r = qe.get(t);
  r && (r.initialDef.render = e, [...r.instances].forEach((o) => {
    e && (o.render = e, ye(o.type).render = e), o.renderCache = [], o.update();
  }));
}
function hi(t, e) {
  const r = qe.get(t);
  if (!r)
    return;
  e = ye(e), kr(r.initialDef, e);
  const o = [...r.instances];
  for (const n of o) {
    const s = ye(n.type);
    me.has(s) || (s !== r.initialDef && kr(s, e), me.add(s)), n.appContext.propsCache.delete(n.type), n.appContext.emitsCache.delete(n.type), n.appContext.optionsCache.delete(n.type), n.ceReload ? (me.add(s), n.ceReload(e.styles), me.delete(s)) : n.parent ? zt(n.parent.update) : n.appContext.reload ? n.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    );
  }
  zo(() => {
    for (const n of o)
      me.delete(
        ye(n.type)
      );
  });
}
function kr(t, e) {
  R(t, e);
  for (const r in t)
    r !== "__file" && !(r in e) && delete t[r];
}
function ct(t) {
  return (e, r) => {
    try {
      return t(e, r);
    } catch (o) {
      console.error(o), console.warn(
        "[HMR] Something went wrong during Vue component hot-reload. Full reload required."
      );
    }
  };
}
let K = null, vi = null;
const Ot = "components";
function zr(t, e) {
  return bi(Ot, t, !0, e) || t;
}
const _i = Symbol.for("v-ndc");
function bi(t, e, r = !0, o = !1) {
  const n = ie;
  if (n) {
    const s = n.type;
    if (t === Ot) {
      const a = Kt(
        s,
        !1
        /* do not include inferred name to avoid breaking existing code */
      );
      if (a && (a === e || a === Fe(e) || a === Be(Fe(e))))
        return s;
    }
    const i = (
      // local registration
      // check instance[type] first which is resolved for options API
      Lr(n[t] || s[t], e) || // global registration
      Lr(n.appContext[t], e)
    );
    if (!i && o)
      return s;
    if (process.env.NODE_ENV !== "production" && r && !i) {
      const a = t === Ot ? `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.` : "";
      E(`Failed to resolve ${t.slice(0, -1)}: ${e}${a}`);
    }
    return i;
  } else
    process.env.NODE_ENV !== "production" && E(
      `resolve${Be(t.slice(0, -1))} can only be used in render() or setup().`
    );
}
function Lr(t, e) {
  return t && (t[e] || t[Fe(e)] || t[Be(Fe(e))]);
}
const mi = (t) => t.__isSuspense;
function gi(t, e) {
  e && e.pendingBranch ? v(t) ? e.effects.push(...t) : e.effects.push(t) : zo(t);
}
const Ue = {};
function $i(t, e, { immediate: r, deep: o, flush: n, onTrack: s, onTrigger: i } = H) {
  var a;
  process.env.NODE_ENV !== "production" && !e && (r !== void 0 && E(
    'watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'
  ), o !== void 0 && E(
    'watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'
  ));
  const c = (b) => {
    E(
      "Invalid watch source: ",
      b,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, u = As() === ((a = ie) == null ? void 0 : a.scope) ? ie : null;
  let p, l = !1, d = !1;
  if (A(t) ? (p = () => t.value, l = yt(t)) : te(t) ? (p = () => t, o = !0) : v(t) ? (d = !0, l = t.some((b) => te(b) || yt(b)), p = () => t.map((b) => {
    if (A(b))
      return b.value;
    if (te(b))
      return ue(b);
    if (y(b))
      return oe(b, u, 2);
    process.env.NODE_ENV !== "production" && c(b);
  })) : y(t) ? e ? p = () => oe(t, u, 2) : p = () => {
    if (!(u && u.isUnmounted))
      return f && f(), wt(
        t,
        u,
        3,
        [S]
      );
  } : (p = ho, process.env.NODE_ENV !== "production" && c(t)), e && o) {
    const b = p;
    p = () => ue(b());
  }
  let f, S = (b) => {
    f = x.onStop = () => {
      oe(b, u, 4);
    };
  }, $ = d ? new Array(t.length).fill(Ue) : Ue;
  const G = () => {
    if (x.active)
      if (e) {
        const b = x.run();
        (o || l || (d ? b.some((Zo, Qo) => _e(Zo, $[Qo])) : _e(b, $))) && (f && f(), wt(e, u, 3, [
          b,
          // pass undefined as the old value when it's changed for the first time
          $ === Ue ? void 0 : d && $[0] === Ue ? [] : $,
          S
        ]), $ = b);
      } else
        x.run();
  };
  G.allowRecurse = !!e;
  let xe;
  n === "sync" ? xe = G : n === "post" ? xe = () => Wr(G, u && u.suspense) : (G.pre = !0, u && (G.id = u.uid), xe = () => zt(G));
  const x = new Cs(p, xe);
  return process.env.NODE_ENV !== "production" && (x.onTrack = s, x.onTrigger = i), e ? r ? G() : $ = x.run() : n === "post" ? Wr(
    x.run.bind(x),
    u && u.suspense
  ) : x.run(), () => {
    x.stop(), u && u.scope && _s(u.scope.effects, x);
  };
}
function yi(t, e, r) {
  const o = this.proxy, n = T(t) ? t.includes(".") ? Ei(o, t) : () => o[t] : t.bind(o, o);
  let s;
  y(e) ? s = e : (s = e.handler, r = e);
  const i = ie;
  Jr(this);
  const a = $i(n, s.bind(o), r);
  return i ? Jr(i) : zi(), a;
}
function Ei(t, e) {
  const r = e.split(".");
  return () => {
    let o = t;
    for (let n = 0; n < r.length && o; n++)
      o = o[r[n]];
    return o;
  };
}
function ue(t, e) {
  if (!w(t) || t.__v_skip || (e = e || /* @__PURE__ */ new Set(), e.has(t)))
    return t;
  if (e.add(t), A(t))
    ue(t.value, e);
  else if (v(t))
    for (let r = 0; r < t.length; r++)
      ue(t[r], e);
  else if (vo(t) || Z(t))
    t.forEach((r) => {
      ue(r, e);
    });
  else if (mo(t))
    for (const r in t)
      ue(t[r], e);
  return t;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function wi(t, e) {
  return y(t) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    /* @__PURE__ */ (() => R({ name: t.name }, e, { setup: t }))()
  ) : t;
}
const Nt = (t) => t ? Li(t) ? Fi(t) || t.proxy : Nt(t.parent) : null, Ee = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ R(/* @__PURE__ */ Object.create(null), {
    $: (t) => t,
    $el: (t) => t.vnode.el,
    $data: (t) => t.data,
    $props: (t) => process.env.NODE_ENV !== "production" ? Me(t.props) : t.props,
    $attrs: (t) => process.env.NODE_ENV !== "production" ? Me(t.attrs) : t.attrs,
    $slots: (t) => process.env.NODE_ENV !== "production" ? Me(t.slots) : t.slots,
    $refs: (t) => process.env.NODE_ENV !== "production" ? Me(t.refs) : t.refs,
    $parent: (t) => Nt(t.parent),
    $root: (t) => Nt(t.root),
    $emit: (t) => t.emit,
    $options: (t) => Ni(t),
    $forceUpdate: (t) => t.f || (t.f = () => zt(t.update)),
    $nextTick: (t) => t.n || (t.n = li.bind(t.proxy)),
    $watch: (t) => yi.bind(t)
  })
), Si = (t) => t === "_" || t === "$", ut = (t, e) => t !== H && !t.__isScriptSetup && g(t, e), Oi = {
  get({ _: t }, e) {
    const { ctx: r, setupState: o, data: n, props: s, accessCache: i, type: a, appContext: c } = t;
    if (process.env.NODE_ENV !== "production" && e === "__isVue")
      return !0;
    let u;
    if (e[0] !== "$") {
      const f = i[e];
      if (f !== void 0)
        switch (f) {
          case 1:
            return o[e];
          case 2:
            return n[e];
          case 4:
            return r[e];
          case 3:
            return s[e];
        }
      else {
        if (ut(o, e))
          return i[e] = 1, o[e];
        if (n !== H && g(n, e))
          return i[e] = 2, n[e];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (u = t.propsOptions[0]) && g(u, e)
        )
          return i[e] = 3, s[e];
        if (r !== H && g(r, e))
          return i[e] = 4, r[e];
        i[e] = 0;
      }
    }
    const p = Ee[e];
    let l, d;
    if (p)
      return e === "$attrs" ? (P(t, "get", e), process.env.NODE_ENV !== "production" && void 0) : process.env.NODE_ENV !== "production" && e === "$slots" && P(t, "get", e), p(t);
    if (
      // css module (injected by vue-loader)
      (l = a.__cssModules) && (l = l[e])
    )
      return l;
    if (r !== H && g(r, e))
      return i[e] = 4, r[e];
    if (
      // global properties
      d = c.config.globalProperties, g(d, e)
    )
      return d[e];
    process.env.NODE_ENV !== "production" && K && (!T(e) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    e.indexOf("__v") !== 0) && (n !== H && Si(e[0]) && g(n, e) ? E(
      `Property ${JSON.stringify(
        e
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : t === K && E(
      `Property ${JSON.stringify(e)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: t }, e, r) {
    const { data: o, setupState: n, ctx: s } = t;
    return ut(n, e) ? (n[e] = r, !0) : process.env.NODE_ENV !== "production" && n.__isScriptSetup && g(n, e) ? (E(`Cannot mutate <script setup> binding "${e}" from Options API.`), !1) : o !== H && g(o, e) ? (o[e] = r, !0) : g(t.props, e) ? (process.env.NODE_ENV !== "production" && E(`Attempting to mutate prop "${e}". Props are readonly.`), !1) : e[0] === "$" && e.slice(1) in t ? (process.env.NODE_ENV !== "production" && E(
      `Attempting to mutate public property "${e}". Properties starting with $ are reserved and readonly.`
    ), !1) : (process.env.NODE_ENV !== "production" && e in t.appContext.config.globalProperties ? Object.defineProperty(s, e, {
      enumerable: !0,
      configurable: !0,
      value: r
    }) : s[e] = r, !0);
  },
  has({
    _: { data: t, setupState: e, accessCache: r, ctx: o, appContext: n, propsOptions: s }
  }, i) {
    let a;
    return !!r[i] || t !== H && g(t, i) || ut(e, i) || (a = s[0]) && g(a, i) || g(o, i) || g(Ee, i) || g(n.config.globalProperties, i);
  },
  defineProperty(t, e, r) {
    return r.get != null ? t._.accessCache[e] = 0 : g(r, "value") && this.set(t, e, r.value, null), Reflect.defineProperty(t, e, r);
  }
};
process.env.NODE_ENV !== "production" && (Oi.ownKeys = (t) => (E(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(t)));
function Fr(t) {
  return v(t) ? t.reduce(
    (e, r) => (e[r] = null, e),
    {}
  ) : t;
}
function Ni(t) {
  const e = t.type, { mixins: r, extends: o } = e, {
    mixins: n,
    optionsCache: s,
    config: { optionMergeStrategies: i }
  } = t.appContext, a = s.get(e);
  let c;
  return a ? c = a : !n.length && !r && !o ? c = e : (c = {}, n.length && n.forEach(
    (u) => We(c, u, i, !0)
  ), We(c, e, i)), w(e) && s.set(e, c), c;
}
function We(t, e, r, o = !1) {
  const { mixins: n, extends: s } = e;
  s && We(t, s, r, !0), n && n.forEach(
    (i) => We(t, i, r, !0)
  );
  for (const i in e)
    if (o && i === "expose")
      process.env.NODE_ENV !== "production" && E(
        '"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.'
      );
    else {
      const a = Ai[i] || r && r[i];
      t[i] = a ? a(t[i], e[i]) : e[i];
    }
  return t;
}
const Ai = {
  data: Br,
  props: qr,
  emits: qr,
  // objects
  methods: $e,
  computed: $e,
  // lifecycle
  beforeCreate: O,
  created: O,
  beforeMount: O,
  mounted: O,
  beforeUpdate: O,
  updated: O,
  beforeDestroy: O,
  beforeUnmount: O,
  destroyed: O,
  unmounted: O,
  activated: O,
  deactivated: O,
  errorCaptured: O,
  serverPrefetch: O,
  // assets
  components: $e,
  directives: $e,
  // watch
  watch: xi,
  // provide / inject
  provide: Br,
  inject: Pi
};
function Br(t, e) {
  return e ? t ? function() {
    return R(
      y(t) ? t.call(this, this) : t,
      y(e) ? e.call(this, this) : e
    );
  } : e : t;
}
function Pi(t, e) {
  return $e(Kr(t), Kr(e));
}
function Kr(t) {
  if (v(t)) {
    const e = {};
    for (let r = 0; r < t.length; r++)
      e[t[r]] = t[r];
    return e;
  }
  return t;
}
function O(t, e) {
  return t ? [...new Set([].concat(t, e))] : e;
}
function $e(t, e) {
  return t ? R(/* @__PURE__ */ Object.create(null), t, e) : e;
}
function qr(t, e) {
  return t ? v(t) && v(e) ? [.../* @__PURE__ */ new Set([...t, ...e])] : R(
    /* @__PURE__ */ Object.create(null),
    Fr(t),
    Fr(e ?? {})
  ) : e;
}
function xi(t, e) {
  if (!t)
    return e;
  if (!e)
    return t;
  const r = R(/* @__PURE__ */ Object.create(null), t);
  for (const o in e)
    r[o] = O(t[o], e[o]);
  return r;
}
const Wr = gi, Ci = (t) => t.__isTeleport, Lt = Symbol.for("v-fgt"), Vi = Symbol.for("v-txt"), Ii = Symbol.for("v-cmt"), je = [];
let M = null;
function Ti(t = !1) {
  je.push(M = t ? null : []);
}
function Ri() {
  je.pop(), M = je[je.length - 1] || null;
}
function Di(t) {
  return t.dynamicChildren = M || fs, Ri(), M && M.push(t), t;
}
function Mi(t, e, r, o, n, s) {
  return Di(
    qo(
      t,
      e,
      r,
      o,
      n,
      s,
      !0
      /* isBlock */
    )
  );
}
function Ui(t) {
  return t ? t.__v_isVNode === !0 : !1;
}
const Hi = (...t) => Wo(
  ...t
), Bo = "__vInternal", Ko = ({ key: t }) => t ?? null, ke = ({
  ref: t,
  ref_key: e,
  ref_for: r
}) => (typeof t == "number" && (t = "" + t), t != null ? T(t) || A(t) || y(t) ? { i: K, r: t, k: e, f: !!r } : t : null);
function qo(t, e = null, r = null, o = 0, n = null, s = t === Lt ? 0 : 1, i = !1, a = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t,
    props: e,
    key: e && Ko(e),
    ref: e && ke(e),
    scopeId: vi,
    slotScopeIds: null,
    children: r,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: s,
    patchFlag: o,
    dynamicProps: n,
    dynamicChildren: null,
    appContext: null,
    ctx: K
  };
  return a ? (Ft(c, r), s & 128 && t.normalize(c)) : r && (c.shapeFlag |= T(r) ? 8 : 16), process.env.NODE_ENV !== "production" && c.key !== c.key && E("VNode created with invalid key (NaN). VNode type:", c.type), // avoid a block node from tracking itself
  !i && // has current parent block
  M && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && M.push(c), c;
}
const At = process.env.NODE_ENV !== "production" ? Hi : Wo;
function Wo(t, e = null, r = null, o = 0, n = null, s = !1) {
  if ((!t || t === _i) && (process.env.NODE_ENV !== "production" && !t && E(`Invalid vnode type when creating vnode: ${t}.`), t = Ii), Ui(t)) {
    const a = Ge(
      t,
      e,
      !0
      /* mergeRef: true */
    );
    return r && Ft(a, r), !s && M && (a.shapeFlag & 6 ? M[M.indexOf(t)] = a : M.push(a)), a.patchFlag |= -2, a;
  }
  if (Xo(t) && (t = t.__vccOpts), e) {
    e = ji(e);
    let { class: a, style: c } = e;
    a && !T(a) && (e.class = Rt(a)), w(c) && (Et(c) && !v(c) && (c = R({}, c)), e.style = Tt(c));
  }
  const i = T(t) ? 1 : mi(t) ? 128 : Ci(t) ? 64 : w(t) ? 4 : y(t) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && Et(t) && (t = h(t), E(
    "Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    t
  )), qo(
    t,
    e,
    r,
    o,
    n,
    i,
    s,
    !0
  );
}
function ji(t) {
  return t ? Et(t) || Bo in t ? R({}, t) : t : null;
}
function Ge(t, e, r = !1) {
  const { props: o, ref: n, patchFlag: s, children: i } = t, a = e ? ki(o || {}, e) : o;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t.type,
    props: a,
    key: a && Ko(a),
    ref: e && e.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      r && n ? v(n) ? n.concat(ke(e)) : [n, ke(e)] : ke(e)
    ) : n,
    scopeId: t.scopeId,
    slotScopeIds: t.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && s === -1 && v(i) ? i.map(Go) : i,
    target: t.target,
    targetAnchor: t.targetAnchor,
    staticCount: t.staticCount,
    shapeFlag: t.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: e && t.type !== Lt ? s === -1 ? 16 : s | 16 : s,
    dynamicProps: t.dynamicProps,
    dynamicChildren: t.dynamicChildren,
    appContext: t.appContext,
    dirs: t.dirs,
    transition: t.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: t.component,
    suspense: t.suspense,
    ssContent: t.ssContent && Ge(t.ssContent),
    ssFallback: t.ssFallback && Ge(t.ssFallback),
    el: t.el,
    anchor: t.anchor,
    ctx: t.ctx,
    ce: t.ce
  };
}
function Go(t) {
  const e = Ge(t);
  return v(t.children) && (e.children = t.children.map(Go)), e;
}
function Jo(t = " ", e = 0) {
  return At(Vi, null, t, e);
}
function Ft(t, e) {
  let r = 0;
  const { shapeFlag: o } = t;
  if (e == null)
    e = null;
  else if (v(e))
    r = 16;
  else if (typeof e == "object")
    if (o & 65) {
      const n = e.default;
      n && (n._c && (n._d = !1), Ft(t, n()), n._c && (n._d = !0));
      return;
    } else {
      r = 32;
      const n = e._;
      !n && !(Bo in e) ? e._ctx = K : n === 3 && K && (K.slots._ === 1 ? e._ = 1 : (e._ = 2, t.patchFlag |= 1024));
    }
  else
    y(e) ? (e = { default: e, _ctx: K }, r = 32) : (e = String(e), o & 64 ? (r = 16, e = [Jo(e)]) : r = 8);
  t.children = e, t.shapeFlag |= r;
}
function ki(...t) {
  const e = {};
  for (let r = 0; r < t.length; r++) {
    const o = t[r];
    for (const n in o)
      if (n === "class")
        e.class !== o.class && (e.class = Rt([e.class, o.class]));
      else if (n === "style")
        e.style = Tt([e.style, o.style]);
      else if (vs(n)) {
        const s = e[n], i = o[n];
        i && s !== i && !(v(s) && s.includes(i)) && (e[n] = s ? [].concat(s, i) : i);
      } else
        n !== "" && (e[n] = o[n]);
  }
  return e;
}
let ie = null, Bt, ae, Gr = "__VUE_INSTANCE_SETTERS__";
(ae = _t()[Gr]) || (ae = _t()[Gr] = []), ae.push((t) => ie = t), Bt = (t) => {
  ae.length > 1 ? ae.forEach((e) => e(t)) : ae[0](t);
};
const Jr = (t) => {
  Bt(t), t.scope.on();
}, zi = () => {
  ie && ie.scope.off(), Bt(null);
};
function Li(t) {
  return t.vnode.shapeFlag & 4;
}
function Fi(t) {
  if (t.exposed)
    return t.exposeProxy || (t.exposeProxy = new Proxy(Qs(Ys(t.exposed)), {
      get(e, r) {
        if (r in e)
          return e[r];
        if (r in Ee)
          return Ee[r](t);
      },
      has(e, r) {
        return r in e || r in Ee;
      }
    }));
}
const Bi = /(?:^|[-_])(\w)/g, Ki = (t) => t.replace(Bi, (e) => e.toUpperCase()).replace(/[-_]/g, "");
function Kt(t, e = !0) {
  return y(t) ? t.displayName || t.name : t.name || e && t.__name;
}
function Yo(t, e, r = !1) {
  let o = Kt(e);
  if (!o && e.__file) {
    const n = e.__file.match(/([^/\\]+)\.\w+$/);
    n && (o = n[1]);
  }
  if (!o && t && t.parent) {
    const n = (s) => {
      for (const i in s)
        if (s[i] === e)
          return i;
    };
    o = n(
      t.components || t.parent.type.components
    ) || n(t.appContext.components);
  }
  return o ? Ki(o) : r ? "App" : "Anonymous";
}
function Xo(t) {
  return y(t) && "__vccOpts" in t;
}
function dt(t) {
  return !!(t && t.__v_isShallow);
}
function qi() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const t = { style: "color:#3ba776" }, e = { style: "color:#0b1bc9" }, r = { style: "color:#b62e24" }, o = { style: "color:#9d288c" }, n = {
    header(l) {
      return w(l) ? l.__isVue ? ["div", t, "VueInstance"] : A(l) ? [
        "div",
        {},
        ["span", t, p(l)],
        "<",
        a(l.value),
        ">"
      ] : te(l) ? [
        "div",
        {},
        ["span", t, dt(l) ? "ShallowReactive" : "Reactive"],
        "<",
        a(l),
        `>${se(l) ? " (readonly)" : ""}`
      ] : se(l) ? [
        "div",
        {},
        ["span", t, dt(l) ? "ShallowReadonly" : "Readonly"],
        "<",
        a(l),
        ">"
      ] : null : null;
    },
    hasBody(l) {
      return l && l.__isVue;
    },
    body(l) {
      if (l && l.__isVue)
        return [
          "div",
          {},
          ...s(l.$)
        ];
    }
  };
  function s(l) {
    const d = [];
    l.type.props && l.props && d.push(i("props", h(l.props))), l.setupState !== H && d.push(i("setup", l.setupState)), l.data !== H && d.push(i("data", h(l.data)));
    const f = c(l, "computed");
    f && d.push(i("computed", f));
    const S = c(l, "inject");
    return S && d.push(i("injected", S)), d.push([
      "div",
      {},
      [
        "span",
        {
          style: o.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: l }]
    ]), d;
  }
  function i(l, d) {
    return d = R({}, d), Object.keys(d).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        l
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(d).map((f) => [
          "div",
          {},
          ["span", o, f + ": "],
          a(d[f], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function a(l, d = !0) {
    return typeof l == "number" ? ["span", e, l] : typeof l == "string" ? ["span", r, JSON.stringify(l)] : typeof l == "boolean" ? ["span", o, l] : w(l) ? ["object", { object: d ? h(l) : l }] : ["span", r, String(l)];
  }
  function c(l, d) {
    const f = l.type;
    if (y(f))
      return;
    const S = {};
    for (const $ in l.ctx)
      u(f, $, d) && (S[$] = l.ctx[$]);
    return S;
  }
  function u(l, d, f) {
    const S = l[f];
    if (v(S) && S.includes(d) || w(S) && d in S || l.extends && u(l.extends, d, f) || l.mixins && l.mixins.some(($) => u($, d, f)))
      return !0;
  }
  function p(l) {
    return dt(l) ? "ShallowRef" : l.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(n) : window.devtoolsFormatters = [n];
}
function Wi() {
  qi();
}
process.env.NODE_ENV !== "production" && Wi();
const Gi = /* @__PURE__ */ wi({
  name: "RefreshNode",
  data() {
    return {
      message: "Hello Vue 3 + TypeScript + Vite"
    };
  },
  // type inference enabled
  props: {
    message: String
  },
  setup(t) {
    t.message;
  }
}), Ji = (t, e) => {
  const r = t.__vccOpts || t;
  for (const [o, n] of e)
    r[o] = n;
  return r;
};
function Yi(t, e, r, o, n, s) {
  const i = zr("uui-select"), a = zr("uui-button");
  return Ti(), Mi(Lt, null, [
    Jo(Os(t.message) + " ", 1),
    At(i, { placeholder: "Select an CND provider or an endpoint" }),
    At(a, {
      look: "primary",
      label: "Refresh All CDNs"
    })
  ], 64);
}
const Xi = /* @__PURE__ */ Ji(Gi, [["render", Yi], ["__scopeId", "data-v-b8f70d8e"]]), ia = {
  extends: Xi
};
export {
  ia as default
};
