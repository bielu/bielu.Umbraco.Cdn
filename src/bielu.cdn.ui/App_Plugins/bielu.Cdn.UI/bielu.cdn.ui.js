var Uc = Object.defineProperty;
var Hc = (t, r, s) => r in t ? Uc(t, r, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[r] = s;
var Lc = (t, r) => () => (r || t((r = { exports: {} }).exports, r), r.exports);
var J = (t, r, s) => (Hc(t, typeof r != "symbol" ? r + "" : r, s), s);
var Cy = Lc((Fy, Qs) => {
  /**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  const Fs = window, qo = Fs.ShadowRoot && (Fs.ShadyCSS === void 0 || Fs.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Jo = Symbol(), tl = /* @__PURE__ */ new WeakMap();
  let Ma = class {
    constructor(r, s, n) {
      if (this._$cssResult$ = !0, n !== Jo)
        throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = r, this.t = s;
    }
    get styleSheet() {
      let r = this.o;
      const s = this.t;
      if (qo && r === void 0) {
        const n = s !== void 0 && s.length === 1;
        n && (r = tl.get(s)), r === void 0 && ((this.o = r = new CSSStyleSheet()).replaceSync(this.cssText), n && tl.set(s, r));
      }
      return r;
    }
    toString() {
      return this.cssText;
    }
  };
  const vn = (t) => new Ma(typeof t == "string" ? t : t + "", void 0, Jo), Hr = (t, ...r) => {
    const s = t.length === 1 ? t[0] : r.reduce((n, o, i) => n + ((l) => {
      if (l._$cssResult$ === !0)
        return l.cssText;
      if (typeof l == "number")
        return l;
      throw Error("Value passed to 'css' function must be a 'css' function result: " + l + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
    })(o) + t[i + 1], t[0]);
    return new Ma(s, t, Jo);
  }, Wc = (t, r) => {
    qo ? t.adoptedStyleSheets = r.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet) : r.forEach((s) => {
      const n = document.createElement("style"), o = Fs.litNonce;
      o !== void 0 && n.setAttribute("nonce", o), n.textContent = s.cssText, t.appendChild(n);
    });
  }, rl = qo ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((r) => {
    let s = "";
    for (const n of r.cssRules)
      s += n.cssText;
    return vn(s);
  })(t) : t;
  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  var Kn;
  const Xs = window, sl = Xs.trustedTypes, jc = sl ? sl.emptyScript : "", nl = Xs.reactiveElementPolyfillSupport, vo = { toAttribute(t, r) {
    switch (r) {
      case Boolean:
        t = t ? jc : null;
        break;
      case Object:
      case Array:
        t = t == null ? t : JSON.stringify(t);
    }
    return t;
  }, fromAttribute(t, r) {
    let s = t;
    switch (r) {
      case Boolean:
        s = t !== null;
        break;
      case Number:
        s = t === null ? null : Number(t);
        break;
      case Object:
      case Array:
        try {
          s = JSON.parse(t);
        } catch {
          s = null;
        }
    }
    return s;
  } }, Ca = (t, r) => r !== t && (r == r || t == t), qn = { attribute: !0, type: String, converter: vo, reflect: !1, hasChanged: Ca }, go = "finalized";
  let Or = class extends HTMLElement {
    constructor() {
      super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = !1, this.hasUpdated = !1, this._$El = null, this._$Eu();
    }
    static addInitializer(r) {
      var s;
      this.finalize(), ((s = this.h) !== null && s !== void 0 ? s : this.h = []).push(r);
    }
    static get observedAttributes() {
      this.finalize();
      const r = [];
      return this.elementProperties.forEach((s, n) => {
        const o = this._$Ep(n, s);
        o !== void 0 && (this._$Ev.set(o, n), r.push(o));
      }), r;
    }
    static createProperty(r, s = qn) {
      if (s.state && (s.attribute = !1), this.finalize(), this.elementProperties.set(r, s), !s.noAccessor && !this.prototype.hasOwnProperty(r)) {
        const n = typeof r == "symbol" ? Symbol() : "__" + r, o = this.getPropertyDescriptor(r, n, s);
        o !== void 0 && Object.defineProperty(this.prototype, r, o);
      }
    }
    static getPropertyDescriptor(r, s, n) {
      return { get() {
        return this[s];
      }, set(o) {
        const i = this[r];
        this[s] = o, this.requestUpdate(r, i, n);
      }, configurable: !0, enumerable: !0 };
    }
    static getPropertyOptions(r) {
      return this.elementProperties.get(r) || qn;
    }
    static finalize() {
      if (this.hasOwnProperty(go))
        return !1;
      this[go] = !0;
      const r = Object.getPrototypeOf(this);
      if (r.finalize(), r.h !== void 0 && (this.h = [...r.h]), this.elementProperties = new Map(r.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
        const s = this.properties, n = [...Object.getOwnPropertyNames(s), ...Object.getOwnPropertySymbols(s)];
        for (const o of n)
          this.createProperty(o, s[o]);
      }
      return this.elementStyles = this.finalizeStyles(this.styles), !0;
    }
    static finalizeStyles(r) {
      const s = [];
      if (Array.isArray(r)) {
        const n = new Set(r.flat(1 / 0).reverse());
        for (const o of n)
          s.unshift(rl(o));
      } else
        r !== void 0 && s.push(rl(r));
      return s;
    }
    static _$Ep(r, s) {
      const n = s.attribute;
      return n === !1 ? void 0 : typeof n == "string" ? n : typeof r == "string" ? r.toLowerCase() : void 0;
    }
    _$Eu() {
      var r;
      this._$E_ = new Promise((s) => this.enableUpdating = s), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), (r = this.constructor.h) === null || r === void 0 || r.forEach((s) => s(this));
    }
    addController(r) {
      var s, n;
      ((s = this._$ES) !== null && s !== void 0 ? s : this._$ES = []).push(r), this.renderRoot !== void 0 && this.isConnected && ((n = r.hostConnected) === null || n === void 0 || n.call(r));
    }
    removeController(r) {
      var s;
      (s = this._$ES) === null || s === void 0 || s.splice(this._$ES.indexOf(r) >>> 0, 1);
    }
    _$Eg() {
      this.constructor.elementProperties.forEach((r, s) => {
        this.hasOwnProperty(s) && (this._$Ei.set(s, this[s]), delete this[s]);
      });
    }
    createRenderRoot() {
      var r;
      const s = (r = this.shadowRoot) !== null && r !== void 0 ? r : this.attachShadow(this.constructor.shadowRootOptions);
      return Wc(s, this.constructor.elementStyles), s;
    }
    connectedCallback() {
      var r;
      this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (r = this._$ES) === null || r === void 0 || r.forEach((s) => {
        var n;
        return (n = s.hostConnected) === null || n === void 0 ? void 0 : n.call(s);
      });
    }
    enableUpdating(r) {
    }
    disconnectedCallback() {
      var r;
      (r = this._$ES) === null || r === void 0 || r.forEach((s) => {
        var n;
        return (n = s.hostDisconnected) === null || n === void 0 ? void 0 : n.call(s);
      });
    }
    attributeChangedCallback(r, s, n) {
      this._$AK(r, n);
    }
    _$EO(r, s, n = qn) {
      var o;
      const i = this.constructor._$Ep(r, n);
      if (i !== void 0 && n.reflect === !0) {
        const l = (((o = n.converter) === null || o === void 0 ? void 0 : o.toAttribute) !== void 0 ? n.converter : vo).toAttribute(s, n.type);
        this._$El = r, l == null ? this.removeAttribute(i) : this.setAttribute(i, l), this._$El = null;
      }
    }
    _$AK(r, s) {
      var n;
      const o = this.constructor, i = o._$Ev.get(r);
      if (i !== void 0 && this._$El !== i) {
        const l = o.getPropertyOptions(i), a = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((n = l.converter) === null || n === void 0 ? void 0 : n.fromAttribute) !== void 0 ? l.converter : vo;
        this._$El = i, this[i] = a.fromAttribute(s, l.type), this._$El = null;
      }
    }
    requestUpdate(r, s, n) {
      let o = !0;
      r !== void 0 && (((n = n || this.constructor.getPropertyOptions(r)).hasChanged || Ca)(this[r], s) ? (this._$AL.has(r) || this._$AL.set(r, s), n.reflect === !0 && this._$El !== r && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(r, n))) : o = !1), !this.isUpdatePending && o && (this._$E_ = this._$Ej());
    }
    async _$Ej() {
      this.isUpdatePending = !0;
      try {
        await this._$E_;
      } catch (s) {
        Promise.reject(s);
      }
      const r = this.scheduleUpdate();
      return r != null && await r, !this.isUpdatePending;
    }
    scheduleUpdate() {
      return this.performUpdate();
    }
    performUpdate() {
      var r;
      if (!this.isUpdatePending)
        return;
      this.hasUpdated, this._$Ei && (this._$Ei.forEach((o, i) => this[i] = o), this._$Ei = void 0);
      let s = !1;
      const n = this._$AL;
      try {
        s = this.shouldUpdate(n), s ? (this.willUpdate(n), (r = this._$ES) === null || r === void 0 || r.forEach((o) => {
          var i;
          return (i = o.hostUpdate) === null || i === void 0 ? void 0 : i.call(o);
        }), this.update(n)) : this._$Ek();
      } catch (o) {
        throw s = !1, this._$Ek(), o;
      }
      s && this._$AE(n);
    }
    willUpdate(r) {
    }
    _$AE(r) {
      var s;
      (s = this._$ES) === null || s === void 0 || s.forEach((n) => {
        var o;
        return (o = n.hostUpdated) === null || o === void 0 ? void 0 : o.call(n);
      }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(r)), this.updated(r);
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
    shouldUpdate(r) {
      return !0;
    }
    update(r) {
      this._$EC !== void 0 && (this._$EC.forEach((s, n) => this._$EO(n, this[n], s)), this._$EC = void 0), this._$Ek();
    }
    updated(r) {
    }
    firstUpdated(r) {
    }
  };
  Or[go] = !0, Or.elementProperties = /* @__PURE__ */ new Map(), Or.elementStyles = [], Or.shadowRootOptions = { mode: "open" }, nl == null || nl({ ReactiveElement: Or }), ((Kn = Xs.reactiveElementVersions) !== null && Kn !== void 0 ? Kn : Xs.reactiveElementVersions = []).push("1.6.3");
  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  var Jn;
  const en = window, Ir = en.trustedTypes, ol = Ir ? Ir.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, yo = "$lit$", Ft = `lit$${(Math.random() + "").slice(9)}$`, ka = "?" + Ft, zc = `<${ka}>`, cr = document, as = () => cr.createComment(""), us = (t) => t === null || typeof t != "object" && typeof t != "function", Pa = Array.isArray, Bc = (t) => Pa(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", Zn = `[ 	
\f\r]`, Kr = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, il = /-->/g, ll = />/g, Kt = RegExp(`>|${Zn}(?:([^\\s"'>=/]+)(${Zn}*=${Zn}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), al = /'/g, ul = /"/g, Ta = /^(?:script|style|textarea|title)$/i, Aa = (t) => (r, ...s) => ({ _$litType$: t, strings: r, values: s }), Me = Aa(1), Va = Aa(2), Rr = Symbol.for("lit-noChange"), ue = Symbol.for("lit-nothing"), cl = /* @__PURE__ */ new WeakMap(), er = cr.createTreeWalker(cr, 129, null, !1);
  function Ia(t, r) {
    if (!Array.isArray(t) || !t.hasOwnProperty("raw"))
      throw Error("invalid template strings array");
    return ol !== void 0 ? ol.createHTML(r) : r;
  }
  const Gc = (t, r) => {
    const s = t.length - 1, n = [];
    let o, i = r === 2 ? "<svg>" : "", l = Kr;
    for (let a = 0; a < s; a++) {
      const u = t[a];
      let d, p, h = -1, _ = 0;
      for (; _ < u.length && (l.lastIndex = _, p = l.exec(u), p !== null); )
        _ = l.lastIndex, l === Kr ? p[1] === "!--" ? l = il : p[1] !== void 0 ? l = ll : p[2] !== void 0 ? (Ta.test(p[2]) && (o = RegExp("</" + p[2], "g")), l = Kt) : p[3] !== void 0 && (l = Kt) : l === Kt ? p[0] === ">" ? (l = o ?? Kr, h = -1) : p[1] === void 0 ? h = -2 : (h = l.lastIndex - p[2].length, d = p[1], l = p[3] === void 0 ? Kt : p[3] === '"' ? ul : al) : l === ul || l === al ? l = Kt : l === il || l === ll ? l = Kr : (l = Kt, o = void 0);
      const $ = l === Kt && t[a + 1].startsWith("/>") ? " " : "";
      i += l === Kr ? u + zc : h >= 0 ? (n.push(d), u.slice(0, h) + yo + u.slice(h) + Ft + $) : u + Ft + (h === -2 ? (n.push(void 0), a) : $);
    }
    return [Ia(t, i + (t[s] || "<?>") + (r === 2 ? "</svg>" : "")), n];
  };
  class cs {
    constructor({ strings: r, _$litType$: s }, n) {
      let o;
      this.parts = [];
      let i = 0, l = 0;
      const a = r.length - 1, u = this.parts, [d, p] = Gc(r, s);
      if (this.el = cs.createElement(d, n), er.currentNode = this.el.content, s === 2) {
        const h = this.el.content, _ = h.firstChild;
        _.remove(), h.append(..._.childNodes);
      }
      for (; (o = er.nextNode()) !== null && u.length < a; ) {
        if (o.nodeType === 1) {
          if (o.hasAttributes()) {
            const h = [];
            for (const _ of o.getAttributeNames())
              if (_.endsWith(yo) || _.startsWith(Ft)) {
                const $ = p[l++];
                if (h.push(_), $ !== void 0) {
                  const W = o.getAttribute($.toLowerCase() + yo).split(Ft), F = /([.?@])?(.*)/.exec($);
                  u.push({ type: 1, index: i, name: F[2], strings: W, ctor: F[1] === "." ? qc : F[1] === "?" ? Zc : F[1] === "@" ? Qc : gn });
                } else
                  u.push({ type: 6, index: i });
              }
            for (const _ of h)
              o.removeAttribute(_);
          }
          if (Ta.test(o.tagName)) {
            const h = o.textContent.split(Ft), _ = h.length - 1;
            if (_ > 0) {
              o.textContent = Ir ? Ir.emptyScript : "";
              for (let $ = 0; $ < _; $++)
                o.append(h[$], as()), er.nextNode(), u.push({ type: 2, index: ++i });
              o.append(h[_], as());
            }
          }
        } else if (o.nodeType === 8)
          if (o.data === ka)
            u.push({ type: 2, index: i });
          else {
            let h = -1;
            for (; (h = o.data.indexOf(Ft, h + 1)) !== -1; )
              u.push({ type: 7, index: i }), h += Ft.length - 1;
          }
        i++;
      }
    }
    static createElement(r, s) {
      const n = cr.createElement("template");
      return n.innerHTML = r, n;
    }
  }
  function Yr(t, r, s = t, n) {
    var o, i, l, a;
    if (r === Rr)
      return r;
    let u = n !== void 0 ? (o = s._$Co) === null || o === void 0 ? void 0 : o[n] : s._$Cl;
    const d = us(r) ? void 0 : r._$litDirective$;
    return (u == null ? void 0 : u.constructor) !== d && ((i = u == null ? void 0 : u._$AO) === null || i === void 0 || i.call(u, !1), d === void 0 ? u = void 0 : (u = new d(t), u._$AT(t, s, n)), n !== void 0 ? ((l = (a = s)._$Co) !== null && l !== void 0 ? l : a._$Co = [])[n] = u : s._$Cl = u), u !== void 0 && (r = Yr(t, u._$AS(t, r.values), u, n)), r;
  }
  class Kc {
    constructor(r, s) {
      this._$AV = [], this._$AN = void 0, this._$AD = r, this._$AM = s;
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    u(r) {
      var s;
      const { el: { content: n }, parts: o } = this._$AD, i = ((s = r == null ? void 0 : r.creationScope) !== null && s !== void 0 ? s : cr).importNode(n, !0);
      er.currentNode = i;
      let l = er.nextNode(), a = 0, u = 0, d = o[0];
      for (; d !== void 0; ) {
        if (a === d.index) {
          let p;
          d.type === 2 ? p = new Es(l, l.nextSibling, this, r) : d.type === 1 ? p = new d.ctor(l, d.name, d.strings, this, r) : d.type === 6 && (p = new Xc(l, this, r)), this._$AV.push(p), d = o[++u];
        }
        a !== (d == null ? void 0 : d.index) && (l = er.nextNode(), a++);
      }
      return er.currentNode = cr, i;
    }
    v(r) {
      let s = 0;
      for (const n of this._$AV)
        n !== void 0 && (n.strings !== void 0 ? (n._$AI(r, n, s), s += n.strings.length - 2) : n._$AI(r[s])), s++;
    }
  }
  class Es {
    constructor(r, s, n, o) {
      var i;
      this.type = 2, this._$AH = ue, this._$AN = void 0, this._$AA = r, this._$AB = s, this._$AM = n, this.options = o, this._$Cp = (i = o == null ? void 0 : o.isConnected) === null || i === void 0 || i;
    }
    get _$AU() {
      var r, s;
      return (s = (r = this._$AM) === null || r === void 0 ? void 0 : r._$AU) !== null && s !== void 0 ? s : this._$Cp;
    }
    get parentNode() {
      let r = this._$AA.parentNode;
      const s = this._$AM;
      return s !== void 0 && (r == null ? void 0 : r.nodeType) === 11 && (r = s.parentNode), r;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(r, s = this) {
      r = Yr(this, r, s), us(r) ? r === ue || r == null || r === "" ? (this._$AH !== ue && this._$AR(), this._$AH = ue) : r !== this._$AH && r !== Rr && this._(r) : r._$litType$ !== void 0 ? this.g(r) : r.nodeType !== void 0 ? this.$(r) : Bc(r) ? this.T(r) : this._(r);
    }
    k(r) {
      return this._$AA.parentNode.insertBefore(r, this._$AB);
    }
    $(r) {
      this._$AH !== r && (this._$AR(), this._$AH = this.k(r));
    }
    _(r) {
      this._$AH !== ue && us(this._$AH) ? this._$AA.nextSibling.data = r : this.$(cr.createTextNode(r)), this._$AH = r;
    }
    g(r) {
      var s;
      const { values: n, _$litType$: o } = r, i = typeof o == "number" ? this._$AC(r) : (o.el === void 0 && (o.el = cs.createElement(Ia(o.h, o.h[0]), this.options)), o);
      if (((s = this._$AH) === null || s === void 0 ? void 0 : s._$AD) === i)
        this._$AH.v(n);
      else {
        const l = new Kc(i, this), a = l.u(this.options);
        l.v(n), this.$(a), this._$AH = l;
      }
    }
    _$AC(r) {
      let s = cl.get(r.strings);
      return s === void 0 && cl.set(r.strings, s = new cs(r)), s;
    }
    T(r) {
      Pa(this._$AH) || (this._$AH = [], this._$AR());
      const s = this._$AH;
      let n, o = 0;
      for (const i of r)
        o === s.length ? s.push(n = new Es(this.k(as()), this.k(as()), this, this.options)) : n = s[o], n._$AI(i), o++;
      o < s.length && (this._$AR(n && n._$AB.nextSibling, o), s.length = o);
    }
    _$AR(r = this._$AA.nextSibling, s) {
      var n;
      for ((n = this._$AP) === null || n === void 0 || n.call(this, !1, !0, s); r && r !== this._$AB; ) {
        const o = r.nextSibling;
        r.remove(), r = o;
      }
    }
    setConnected(r) {
      var s;
      this._$AM === void 0 && (this._$Cp = r, (s = this._$AP) === null || s === void 0 || s.call(this, r));
    }
  }
  class gn {
    constructor(r, s, n, o, i) {
      this.type = 1, this._$AH = ue, this._$AN = void 0, this.element = r, this.name = s, this._$AM = o, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = ue;
    }
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(r, s = this, n, o) {
      const i = this.strings;
      let l = !1;
      if (i === void 0)
        r = Yr(this, r, s, 0), l = !us(r) || r !== this._$AH && r !== Rr, l && (this._$AH = r);
      else {
        const a = r;
        let u, d;
        for (r = i[0], u = 0; u < i.length - 1; u++)
          d = Yr(this, a[n + u], s, u), d === Rr && (d = this._$AH[u]), l || (l = !us(d) || d !== this._$AH[u]), d === ue ? r = ue : r !== ue && (r += (d ?? "") + i[u + 1]), this._$AH[u] = d;
      }
      l && !o && this.j(r);
    }
    j(r) {
      r === ue ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, r ?? "");
    }
  }
  class qc extends gn {
    constructor() {
      super(...arguments), this.type = 3;
    }
    j(r) {
      this.element[this.name] = r === ue ? void 0 : r;
    }
  }
  const Jc = Ir ? Ir.emptyScript : "";
  class Zc extends gn {
    constructor() {
      super(...arguments), this.type = 4;
    }
    j(r) {
      r && r !== ue ? this.element.setAttribute(this.name, Jc) : this.element.removeAttribute(this.name);
    }
  }
  class Qc extends gn {
    constructor(r, s, n, o, i) {
      super(r, s, n, o, i), this.type = 5;
    }
    _$AI(r, s = this) {
      var n;
      if ((r = (n = Yr(this, r, s, 0)) !== null && n !== void 0 ? n : ue) === Rr)
        return;
      const o = this._$AH, i = r === ue && o !== ue || r.capture !== o.capture || r.once !== o.once || r.passive !== o.passive, l = r !== ue && (o === ue || i);
      i && this.element.removeEventListener(this.name, this, o), l && this.element.addEventListener(this.name, this, r), this._$AH = r;
    }
    handleEvent(r) {
      var s, n;
      typeof this._$AH == "function" ? this._$AH.call((n = (s = this.options) === null || s === void 0 ? void 0 : s.host) !== null && n !== void 0 ? n : this.element, r) : this._$AH.handleEvent(r);
    }
  }
  class Xc {
    constructor(r, s, n) {
      this.element = r, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = n;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(r) {
      Yr(this, r);
    }
  }
  const dl = en.litHtmlPolyfillSupport;
  dl == null || dl(cs, Es), ((Jn = en.litHtmlVersions) !== null && Jn !== void 0 ? Jn : en.litHtmlVersions = []).push("2.8.0");
  const ed = (t, r, s) => {
    var n, o;
    const i = (n = s == null ? void 0 : s.renderBefore) !== null && n !== void 0 ? n : r;
    let l = i._$litPart$;
    if (l === void 0) {
      const a = (o = s == null ? void 0 : s.renderBefore) !== null && o !== void 0 ? o : null;
      i._$litPart$ = l = new Es(r.insertBefore(as(), a), a, void 0, s ?? {});
    }
    return l._$AI(t), l;
  };
  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  var Qn, Xn;
  class rr extends Or {
    constructor() {
      super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
    }
    createRenderRoot() {
      var r, s;
      const n = super.createRenderRoot();
      return (r = (s = this.renderOptions).renderBefore) !== null && r !== void 0 || (s.renderBefore = n.firstChild), n;
    }
    update(r) {
      const s = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(r), this._$Do = ed(s, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      var r;
      super.connectedCallback(), (r = this._$Do) === null || r === void 0 || r.setConnected(!0);
    }
    disconnectedCallback() {
      var r;
      super.disconnectedCallback(), (r = this._$Do) === null || r === void 0 || r.setConnected(!1);
    }
    render() {
      return Rr;
    }
  }
  rr.finalized = !0, rr._$litElement$ = !0, (Qn = globalThis.litElementHydrateSupport) === null || Qn === void 0 || Qn.call(globalThis, { LitElement: rr });
  const fl = globalThis.litElementPolyfillSupport;
  fl == null || fl({ LitElement: rr });
  ((Xn = globalThis.litElementVersions) !== null && Xn !== void 0 ? Xn : globalThis.litElementVersions = []).push("3.3.3");
  Hr`
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
  vn("uui-blink 0.9s infinite both");
  Hr`
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
  vn(
    "pulse 0.8s ease-in-out infinite both"
  );
  const td = Hr`
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
`, rd = vn(
    "uui-horizontal-shake 600ms ease backwards"
  ), eo = (t, r, s = `This element has to be present for ${t.nodeName} to work appropriate.`) => {
    customElements.get(r) || console.warn(
      `%c ${t.nodeName} requires ${r} element to be registered!`,
      "font-weight: bold;",
      s,
      t
    );
  };
  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  const sd = (t, r) => r.kind === "method" && r.descriptor && !("value" in r.descriptor) ? { ...r, finisher(s) {
    s.createProperty(r.key, t);
  } } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: r.key, initializer() {
    typeof r.initializer == "function" && (this[r.key] = r.initializer.call(this));
  }, finisher(s) {
    s.createProperty(r.key, t);
  } }, nd = (t, r, s) => {
    r.constructor.createProperty(s, t);
  };
  function te(t) {
    return (r, s) => s !== void 0 ? nd(t, r, s) : sd(t, r);
  }
  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  function Zo(t) {
    return te({ ...t, state: !0 });
  }
  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  const od = ({ finisher: t, descriptor: r }) => (s, n) => {
    var o;
    if (n === void 0) {
      const i = (o = s.originalKey) !== null && o !== void 0 ? o : s.key, l = r != null ? { kind: "method", placement: "prototype", key: i, descriptor: r(s.key) } : { ...s, key: i };
      return t != null && (l.finisher = function(a) {
        t(a, i);
      }), l;
    }
    {
      const i = s.constructor;
      r !== void 0 && Object.defineProperty(s, n, r(n)), t == null || t(i, n);
    }
  };
  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  function Ra(t, r) {
    return od({ descriptor: (s) => {
      const n = { get() {
        var o, i;
        return (i = (o = this.renderRoot) === null || o === void 0 ? void 0 : o.querySelector(t)) !== null && i !== void 0 ? i : null;
      }, enumerable: !0, configurable: !0 };
      if (r) {
        const o = typeof s == "symbol" ? Symbol() : "__" + s;
        n.get = function() {
          var i, l;
          return this[o] === void 0 && (this[o] = (l = (i = this.renderRoot) === null || i === void 0 ? void 0 : i.querySelector(t)) !== null && l !== void 0 ? l : null), this[o];
        };
      }
      return n;
    } });
  }
  /**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  var to;
  ((to = window.HTMLSlotElement) === null || to === void 0 ? void 0 : to.prototype.assignedElements) != null;
  var id = Object.defineProperty, ld = Object.getOwnPropertyDescriptor, hl = (t, r, s, n) => {
    for (var o = n > 1 ? void 0 : n ? ld(r, s) : r, i = t.length - 1, l; i >= 0; i--)
      (l = t[i]) && (o = (n ? l(r, s, o) : l(o)) || o);
    return n && o && id(r, s, o), o;
  };
  const ad = (t, r) => {
    class s extends r {
      constructor() {
        super(...arguments), this._labelSlotHasContent = !1;
      }
      connectedCallback() {
        super.connectedCallback(), this.label || console.warn(this.tagName + " needs a `label`", this);
      }
      labelSlotChanged(o) {
        this._labelSlotHasContent = o.target.assignedNodes({ flatten: !0 }).length > 0;
      }
      /**
       * Call in the mixed element to render the label template. It contains a slot. This is optional.
       * @method renderLabel
       * @returns {TemplateResult}
       */
      renderLabel() {
        return Me`
        ${this._labelSlotHasContent === !1 ? Me`<span class="label">${this.label}</span>` : ""}
        <slot
          class="label"
          style=${this._labelSlotHasContent ? "" : "visibility: hidden"}
          name=${t || ""}
          @slotchange=${this.labelSlotChanged}></slot>
      `;
      }
    }
    return hl([
      te({ type: String })
    ], s.prototype, "label", 2), hl([
      Zo()
    ], s.prototype, "_labelSlotHasContent", 2), s;
  };
  var ud = Object.defineProperty, pl = Object.getOwnPropertySymbols, cd = Object.prototype.hasOwnProperty, dd = Object.prototype.propertyIsEnumerable, ml = (t, r, s) => r in t ? ud(t, r, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[r] = s, fd = (t, r) => {
    for (var s in r || (r = {}))
      cd.call(r, s) && ml(t, s, r[s]);
    if (pl)
      for (var s of pl(r))
        dd.call(r, s) && ml(t, s, r[s]);
    return t;
  };
  let hd = class extends Event {
    constructor(r, s = {}) {
      super(r, fd({}, s)), this.detail = s.detail || {};
    }
  };
  var pd = Object.defineProperty, _l = Object.getOwnPropertySymbols, md = Object.prototype.hasOwnProperty, _d = Object.prototype.propertyIsEnumerable, vl = (t, r, s) => r in t ? pd(t, r, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[r] = s, gl = (t, r) => {
    for (var s in r || (r = {}))
      md.call(r, s) && vl(t, s, r[s]);
    if (_l)
      for (var s of _l(r))
        _d.call(r, s) && vl(t, s, r[s]);
    return t;
  };
  let Ya = class extends hd {
    constructor(r, s = {}) {
      super(r, gl(gl({}, { bubbles: !0, cancelable: !0 }), s));
    }
  };
  Ya.SELECTED = "selected";
  Ya.DESELECTED = "deselected";
  var vd = Object.defineProperty, yl = Object.getOwnPropertySymbols, gd = Object.prototype.hasOwnProperty, yd = Object.prototype.propertyIsEnumerable, bl = (t, r, s) => r in t ? vd(t, r, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[r] = s, bd = (t, r) => {
    for (var s in r || (r = {}))
      gd.call(r, s) && bl(t, s, r[s]);
    if (yl)
      for (var s of yl(r))
        yd.call(r, s) && bl(t, s, r[s]);
    return t;
  };
  let Fa = class extends Event {
    constructor(r, s = {}) {
      super(r, bd({}, s)), this.detail = s.detail || {};
    }
  };
  var Ed = Object.defineProperty, El = Object.getOwnPropertySymbols, wd = Object.prototype.hasOwnProperty, Od = Object.prototype.propertyIsEnumerable, wl = (t, r, s) => r in t ? Ed(t, r, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[r] = s, Ol = (t, r) => {
    for (var s in r || (r = {}))
      wd.call(r, s) && wl(t, s, r[s]);
    if (El)
      for (var s of El(r))
        Od.call(r, s) && wl(t, s, r[s]);
    return t;
  };
  let Dr = class extends Fa {
    constructor(r, s = {}) {
      super(r, Ol(Ol({}, { bubbles: !0 }), s));
    }
  };
  Dr.VALID = "valid";
  Dr.INVALID = "invalid";
  var Nd = Object.defineProperty, Nl = Object.getOwnPropertySymbols, Sd = Object.prototype.hasOwnProperty, Dd = Object.prototype.propertyIsEnumerable, Sl = (t, r, s) => r in t ? Nd(t, r, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[r] = s, Dl = (t, r) => {
    for (var s in r || (r = {}))
      Sd.call(r, s) && Sl(t, s, r[s]);
    if (Nl)
      for (var s of Nl(r))
        Dd.call(r, s) && Sl(t, s, r[s]);
    return t;
  };
  let Ua = class extends Fa {
    constructor(r, s = {}) {
      super(r, Dl(Dl({}, { bubbles: !0, cancelable: !0 }), s));
    }
  };
  Ua.SELECTED = "selected";
  Ua.DESELECTED = "deselected";
  var $d = Object.defineProperty, xd = Object.getOwnPropertyDescriptor, qt = (t, r, s, n) => {
    for (var o = n > 1 ? void 0 : n ? xd(r, s) : r, i = t.length - 1, l; i >= 0; i--)
      (l = t[i]) && (o = (n ? l(r, s, o) : l(o)) || o);
    return n && o && $d(r, s, o), o;
  };
  const Ha = (t) => {
    class r extends t {
      constructor(...n) {
        super(...n), this.name = "", this._validityState = {}, this.pristine = !0, this.required = !1, this.requiredMessage = "This field is required", this.error = !1, this.errorMessage = "This field is invalid", this._value = "", this._form = null, this._validators = [], this._formCtrlElements = [], this._onFormSubmit = () => {
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
      set value(n) {
        const o = this._value;
        this._value = n, "ElementInternals" in window && //@ts-ignore
        "setFormValue" in window.ElementInternals.prototype && this._internals.setFormValue(this._value), this.requestUpdate("value", o);
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
      addValidator(n, o, i) {
        const l = {
          flagKey: n,
          getMessageMethod: o,
          checkMethod: i
        };
        return this._validators.push(l), l;
      }
      removeValidator(n) {
        const o = this._validators.indexOf(n);
        o !== -1 && this._validators.splice(o, 1);
      }
      /**
       * @method addFormControlElement
       * @description Important notice if adding a native form control then ensure that its value and thereby validity is updated when value is changed from the outside.
       * @param element {NativeFormControlElement} - element to validate and include as part of this form association.
       */
      addFormControlElement(n) {
        this._formCtrlElements.push(n);
      }
      /**
       * @method setCustomValidity
       * @description Set custom validity state, set to empty string to remove the custom message.
       * @param message {string} - The message to be shown
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/setCustomValidity|HTMLObjectElement:setCustomValidity}
       */
      setCustomValidity(n) {
        this._customValidityObject && this.removeValidator(this._customValidityObject), n != null && n !== "" && (this._customValidityObject = this.addValidator(
          "customError",
          () => n,
          () => !0
        )), this._runValidators();
      }
      _runValidators() {
        this._validityState = {}, this._formCtrlElements.forEach((o) => {
          for (const i in o.validity)
            i !== "valid" && o.validity[i] && (this._validityState[i] = !0, this._internals.setValidity(
              this._validityState,
              o.validationMessage,
              o
            ));
        }), this._validators.forEach((o) => {
          o.checkMethod() && (this._validityState[o.flagKey] = !0, this._internals.setValidity(
            this._validityState,
            o.getMessageMethod(),
            this.getFormElement()
          ));
        });
        const n = Object.values(this._validityState).includes(!0);
        this._validityState.valid = !n, n ? this.dispatchEvent(
          new Dr(Dr.INVALID)
        ) : (this._internals.setValidity({}), this.dispatchEvent(new Dr(Dr.VALID)));
      }
      updated(n) {
        super.updated(n), this._runValidators();
      }
      submit() {
        var n;
        (n = this._form) == null || n.requestSubmit();
      }
      formAssociatedCallback() {
        this._removeFormListeners(), this._form = this._internals.form, this._form && (this._form.hasAttribute("submit-invalid") && (this.pristine = !1), this._form.addEventListener("submit", this._onFormSubmit));
      }
      formResetCallback() {
        this.pristine = !0, this.value = this.getAttribute("value") || "";
      }
      checkValidity() {
        var n;
        for (const o in this._formCtrlElements)
          if (this._formCtrlElements[o].checkValidity() === !1)
            return !1;
        return (n = this._internals) == null ? void 0 : n.checkValidity();
      }
      // https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/validity
      get validity() {
        return this._validityState;
      }
      get validationMessage() {
        var n;
        return (n = this._internals) == null ? void 0 : n.validationMessage;
      }
    }
    return r.formAssociated = !0, qt([
      te({ type: String })
    ], r.prototype, "name", 2), qt([
      te()
    ], r.prototype, "value", 1), qt([
      te({ type: Boolean, reflect: !0 })
    ], r.prototype, "pristine", 2), qt([
      te({ type: Boolean, reflect: !0 })
    ], r.prototype, "required", 2), qt([
      te({ type: String, attribute: "required-message" })
    ], r.prototype, "requiredMessage", 2), qt([
      te({ type: Boolean, reflect: !0 })
    ], r.prototype, "error", 2), qt([
      te({ type: String, attribute: "error-message" })
    ], r.prototype, "errorMessage", 2), r;
  }, Md = (t, r, s) => {
    let n = t;
    for (; n !== null; ) {
      const o = n instanceof HTMLElement && n.hasAttribute(r) && n.getAttribute(r) === s, i = n.querySelector(`[${r}="${s}"]`) !== null;
      if (o)
        return n;
      if (i)
        return n.querySelector(
          `[${r}="${s}"]`
        );
      n = n.parentElement || n.parentNode || null;
    }
    return null;
  };
  var Cd = Object.defineProperty, kd = Object.getOwnPropertyDescriptor, Pd = (t, r, s, n) => {
    for (var o = n > 1 ? void 0 : n ? kd(r, s) : r, i = t.length - 1, l; i >= 0; i--)
      (l = t[i]) && (o = (n ? l(r, s, o) : l(o)) || o);
    return n && o && Cd(r, s, o), o;
  }, La = (t, r, s) => {
    if (!r.has(t))
      throw TypeError("Cannot " + s);
  }, $l = (t, r, s) => (La(t, r, "read from private field"), s ? s.call(t) : r.get(t)), xl = (t, r, s) => {
    if (r.has(t))
      throw TypeError("Cannot add the same private member more than once");
    r instanceof WeakSet ? r.add(t) : r.set(t, s);
  }, Td = (t, r, s, n) => (La(t, r, "write to private field"), n ? n.call(t, s) : r.set(t, s), s);
  const Ad = (t) => {
    var r, s;
    class n extends t {
      constructor(...i) {
        super(...i), xl(this, r, !1), this._togglePopover = () => {
          if (!this.popoverContainerElement)
            return;
          const l = Md(
            this,
            "id",
            this.popoverContainerElement
          );
          l && ($l(this, r) ? (
            // @ts-ignore - This is part of the new popover API, but typescript doesn't recognize it yet.
            l.hidePopover()
          ) : (
            // @ts-ignore - This is part of the new popover API, but typescript doesn't recognize it yet.
            l.showPopover()
          ));
        }, xl(this, s, (l) => {
          requestAnimationFrame(() => {
            Td(this, r, l.detail.newState === "open");
          });
        }), this.addEventListener("uui-popover-before-toggle", $l(this, s));
      }
    }
    return r = /* @__PURE__ */ new WeakMap(), s = /* @__PURE__ */ new WeakMap(), Pd([
      te({ type: String, attribute: "popovertarget" })
    ], n.prototype, "popoverContainerElement", 2), n;
  };
  function Qo(t, r) {
    return (s) => {
      if (t.indexOf("-") > 0 === !1) {
        console.error(
          `${t} is not a valid custom element name. A custom element name should consist of at least two words separated by a hyphen.`
        );
        return;
      }
      window.customElements.get(t) || window.customElements.define(t, s, r);
    };
  }
  const Vd = Va`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
<path d="M461.884 68.14c-132.601 81.297-228.817 183.87-272.048 235.345l-105.874-82.95-46.751 37.691 182.941 186.049c31.485-80.646 131.198-238.264 252.956-350.252L461.884 68.14z"/>
</svg>`, Id = Va`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
<path d="M422.952 371.305L307.064 255.418l115.884-115.887-51.722-51.723L255.34 203.693 139.457 87.812l-51.726 51.719 115.885 115.885L87.731 371.305l51.726 51.721L255.344 307.14l115.884 115.882z"/>
</svg>`;
  /**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  const ro = (t) => t ?? ue;
  var Rd = Object.defineProperty, Yd = Object.getOwnPropertyDescriptor, ft = (t, r, s, n) => {
    for (var o = n > 1 ? void 0 : n ? Yd(r, s) : r, i = t.length - 1, l; i >= 0; i--)
      (l = t[i]) && (o = (n ? l(r, s, o) : l(o)) || o);
    return n && o && Rd(r, s, o), o;
  };
  let Ye = class extends Ha(
    ad("", Ad(rr))
  ) {
    constructor() {
      super(), this.type = "button", this.disabled = !1, this.look = "default", this.color = "default", this.compact = !1, this.state = void 0, this.addEventListener("click", this._onHostClick);
    }
    getFormElement() {
      return this._button;
    }
    _onHostClick(t) {
      var r;
      if (this.disabled) {
        t.preventDefault(), t.stopImmediatePropagation();
        return;
      }
      if ((r = this._internals) != null && r.form)
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
          eo(this, "uui-loader-circle"), t = Me`<uui-loader-circle id="loader"></uui-loader-circle>`;
          break;
        case "success":
          eo(this, "uui-icon"), t = Me`<uui-icon
          name="check"
          .fallback=${Vd.strings[0]}></uui-icon>`;
          break;
        case "failed":
          eo(this, "uui-icon"), t = Me`<uui-icon
          name="wrong"
          .fallback=${Id.strings[0]}></uui-icon>`;
          break;
        default:
          return ue;
      }
      return Me`<div id="state">${t}</div>`;
    }
    render() {
      return this.href ? Me`
          <a
            id="button"
            aria-label=${this.label}
            href=${ro(this.disabled ? void 0 : this.href)}
            target=${ro(this.target || void 0)}
            rel=${ro(
        this.target === "_blank" ? "noopener noreferrer" : void 0
      )}>
            ${this.renderState()} ${this.renderLabel()}
            <slot name="extra"></slot>
          </a>
        ` : Me`
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
  Ye.styles = [
    td,
    Hr`
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
        animation: ${rd};
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
  ft([
    te({ type: String, reflect: !0 })
  ], Ye.prototype, "type", 2);
  ft([
    te({ type: Boolean, reflect: !0 })
  ], Ye.prototype, "disabled", 2);
  ft([
    te({ reflect: !0 })
  ], Ye.prototype, "look", 2);
  ft([
    te({ reflect: !0 })
  ], Ye.prototype, "color", 2);
  ft([
    te({ type: Boolean, reflect: !0 })
  ], Ye.prototype, "compact", 2);
  ft([
    te({ type: String, reflect: !0 })
  ], Ye.prototype, "state", 2);
  ft([
    te({ type: String })
  ], Ye.prototype, "href", 2);
  ft([
    te({ type: String })
  ], Ye.prototype, "target", 2);
  ft([
    Ra("#button")
  ], Ye.prototype, "_button", 2);
  Ye = ft([
    Qo("uui-button")
  ], Ye);
  var Fd = Object.defineProperty, Ml = Object.getOwnPropertySymbols, Ud = Object.prototype.hasOwnProperty, Hd = Object.prototype.propertyIsEnumerable, Cl = (t, r, s) => r in t ? Fd(t, r, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[r] = s, Ld = (t, r) => {
    for (var s in r || (r = {}))
      Ud.call(r, s) && Cl(t, s, r[s]);
    if (Ml)
      for (var s of Ml(r))
        Hd.call(r, s) && Cl(t, s, r[s]);
    return t;
  };
  class Xo extends Event {
    constructor(r, s = {}) {
      super(r, Ld({}, s)), this.detail = s.detail || {};
    }
  }
  var Wd = Object.defineProperty, kl = Object.getOwnPropertySymbols, jd = Object.prototype.hasOwnProperty, zd = Object.prototype.propertyIsEnumerable, Pl = (t, r, s) => r in t ? Wd(t, r, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[r] = s, Tl = (t, r) => {
    for (var s in r || (r = {}))
      jd.call(r, s) && Pl(t, s, r[s]);
    if (kl)
      for (var s of kl(r))
        zd.call(r, s) && Pl(t, s, r[s]);
    return t;
  };
  class Wa extends Xo {
    constructor(r, s = {}) {
      super(r, Tl(Tl({}, { bubbles: !0 }), s));
    }
  }
  Wa.VALID = "valid";
  Wa.INVALID = "invalid";
  var Bd = Object.defineProperty, Al = Object.getOwnPropertySymbols, Gd = Object.prototype.hasOwnProperty, Kd = Object.prototype.propertyIsEnumerable, Vl = (t, r, s) => r in t ? Bd(t, r, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[r] = s, Il = (t, r) => {
    for (var s in r || (r = {}))
      Gd.call(r, s) && Vl(t, s, r[s]);
    if (Al)
      for (var s of Al(r))
        Kd.call(r, s) && Vl(t, s, r[s]);
    return t;
  };
  class ja extends Xo {
    constructor(r, s = {}) {
      super(r, Il(Il({}, { bubbles: !0, cancelable: !0 }), s));
    }
  }
  ja.SELECTED = "selected";
  ja.DESELECTED = "deselected";
  var qd = Object.defineProperty, Rl = Object.getOwnPropertySymbols, Jd = Object.prototype.hasOwnProperty, Zd = Object.prototype.propertyIsEnumerable, Yl = (t, r, s) => r in t ? qd(t, r, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[r] = s, Fl = (t, r) => {
    for (var s in r || (r = {}))
      Jd.call(r, s) && Yl(t, s, r[s]);
    if (Rl)
      for (var s of Rl(r))
        Zd.call(r, s) && Yl(t, s, r[s]);
    return t;
  };
  class bo extends Xo {
    constructor(r, s = {}) {
      super(r, Fl(Fl({}, { bubbles: !0 }), s));
    }
  }
  bo.CHANGE = "change";
  var Qd = Object.defineProperty, Xd = Object.getOwnPropertyDescriptor, ht = (t, r, s, n) => {
    for (var o = n > 1 ? void 0 : n ? Xd(r, s) : r, i = t.length - 1, l; i >= 0; i--)
      (l = t[i]) && (o = (n ? l(r, s, o) : l(o)) || o);
    return n && o && Qd(r, s, o), o;
  };
  let Fe = class extends Ha(rr) {
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
        this._extractGroups(), this._values = this.options.map((s) => s.value);
        const r = this.options.find((s) => s.selected);
        this.value = r ? r.value : "";
      }
      t.has("value") && (this.value = this._values.includes(this.value) ? this.value : ""), t.has("disabledGroups") && this._createDisabledGroups();
    }
    setValue(t) {
      t.stopPropagation();
      const r = t.target;
      t.target && (this.value = r.value), this.dispatchEvent(
        new bo(bo.CHANGE, {
          bubbles: !0,
          composed: !1
        })
      );
    }
    getFormElement() {
      return this._input;
    }
    _renderOption(t, r, s, n) {
      return Me`<option
      value="${r}"
      ?selected=${s}
      ?disabled=${n}>
      ${t}
    </option>`;
    }
    _renderGrouped() {
      return this._groups.length === 0 ? ue : Me`
      ${this._groups.map(
        (t) => Me`<optgroup
            label=${t}
            ?disabled=${this._disabledGroups.some(
          (r) => r.toLowerCase() === t.toLowerCase()
        )}>
            ${this.options.map(
          (r) => r.group === t ? this._renderOption(
            r.name,
            r.value,
            r.selected,
            r.disabled
          ) : ""
        )}
          </optgroup>`
      )}
    `;
    }
    render() {
      return Me` <select
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
  Fe.styles = [
    Hr`
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
  ht([
    te({ type: String })
  ], Fe.prototype, "label", 2);
  ht([
    te()
  ], Fe.prototype, "placeholder", 2);
  ht([
    te({ type: Boolean, reflect: !0 })
  ], Fe.prototype, "disabled", 2);
  ht([
    te({ type: Boolean, reflect: !0 })
  ], Fe.prototype, "error", 2);
  ht([
    te({ type: Array, attribute: !1 })
  ], Fe.prototype, "options", 2);
  ht([
    Zo()
  ], Fe.prototype, "_groups", 2);
  ht([
    te()
  ], Fe.prototype, "disabledGroups", 2);
  ht([
    Zo()
  ], Fe.prototype, "_disabledGroups", 2);
  ht([
    Ra("#native")
  ], Fe.prototype, "_input", 2);
  Fe = ht([
    Qo("uui-select")
  ], Fe);
  var ef = Object.defineProperty, tf = Object.getOwnPropertyDescriptor, ei = (t, r, s, n) => {
    for (var o = n > 1 ? void 0 : n ? tf(r, s) : r, i = t.length - 1, l; i >= 0; i--)
      (l = t[i]) && (o = (n ? l(r, s, o) : l(o)) || o);
    return n && o && ef(r, s, o), o;
  };
  const rf = (t, r, s) => Math.min(Math.max(t, r), s);
  let ds = class extends rr {
    constructor() {
      super(...arguments), this._progress = 0, this._animationDuration = 1;
    }
    get progress() {
      return this._progress;
    }
    set progress(t) {
      const r = this._progress;
      this._progress = rf(t, 0, 100), this.requestUpdate("progress", r);
    }
    get animationDuration() {
      return this._animationDuration;
    }
    set animationDuration(t) {
      const r = this._animationDuration;
      this._animationDuration = t >= 0 ? t : 1, this.requestUpdate("animationDuration", r);
    }
    render() {
      return Me`
      ${this.progress ? Me`<div
            id="bar"
            style="max-width: ${this.progress.toString()}%;"></div>` : ""}
      <div
        id="bar-anim"
        class=${this.progress ? "" : "animate"}
        style="animation-duration: ${this.animationDuration}s"></div>
      <div id="bar-background"></div>
    `;
    }
  };
  ds.styles = [
    Hr`
      :host {
        position: relative;
        display: block;
        width: 100%;
        height: 4px;
        overflow: hidden;
        color: var(--uui-color-default,#1b264f);
      }

      #bar,
      #bar-anim,
      #bar-background {
        position: absolute;
        inset: 0; /* top, left, bottom and right = 0*/
        height: 100%;
      }

      #bar-background,
      #bar {
        background: currentColor;
      }

      #bar {
        transition: max-width 120ms ease;
      }

      #bar-background {
        opacity: 0.3;
      }

      #bar-anim {
        transform: scaleX(0.4);
        animation: bar-loading 1s infinite linear;
        background: linear-gradient(
          -90deg,
          white 0%,
          white 25%,
          transparent 100%
        );
      }

      #bar-anim.animate {
        background: linear-gradient(
          -90deg,
          currentColor 0%,
          currentColor 25%,
          transparent 100%
        );
      }

      @keyframes bar-loading {
        0% {
          transform-origin: -175% 0%;
        }
        100% {
          transform-origin: 175% 0%;
        }
      }
    `
  ];
  ei([
    te({ type: Number })
  ], ds.prototype, "progress", 1);
  ei([
    te({ type: Number })
  ], ds.prototype, "animationDuration", 1);
  ds = ei([
    Qo("uui-loader-bar")
  ], ds);
  function Lr(t, r) {
    const s = /* @__PURE__ */ Object.create(null), n = t.split(",");
    for (let o = 0; o < n.length; o++)
      s[n[o]] = !0;
    return r ? (o) => !!s[o.toLowerCase()] : (o) => !!s[o];
  }
  const Z = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, Cr = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], _e = () => {
  }, za = () => !1, sf = /^on[^a-z]/, Wr = (t) => sf.test(t), Fr = (t) => t.startsWith("onUpdate:"), ie = Object.assign, ti = (t, r) => {
    const s = t.indexOf(r);
    s > -1 && t.splice(s, 1);
  }, nf = Object.prototype.hasOwnProperty, H = (t, r) => nf.call(t, r), T = Array.isArray, kr = (t) => bn(t) === "[object Map]", of = (t) => bn(t) === "[object Set]", A = (t) => typeof t == "function", de = (t) => typeof t == "string", yn = (t) => typeof t == "symbol", re = (t) => t !== null && typeof t == "object", ri = (t) => (re(t) || A(t)) && A(t.then) && A(t.catch), lf = Object.prototype.toString, bn = (t) => lf.call(t), si = (t) => bn(t).slice(8, -1), af = (t) => bn(t) === "[object Object]", ni = (t) => de(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, Us = /* @__PURE__ */ Lr(
    // the leading comma is intentional so empty string "" is also included
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  ), uf = /* @__PURE__ */ Lr(
    "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
  ), En = (t) => {
    const r = /* @__PURE__ */ Object.create(null);
    return (s) => r[s] || (r[s] = t(s));
  }, cf = /-(\w)/g, Ae = En((t) => t.replace(cf, (r, s) => s ? s.toUpperCase() : "")), df = /\B([A-Z])/g, Te = En(
    (t) => t.replace(df, "-$1").toLowerCase()
  ), dr = En((t) => t.charAt(0).toUpperCase() + t.slice(1)), It = En((t) => t ? `on${dr(t)}` : ""), fr = (t, r) => !Object.is(t, r), qr = (t, r) => {
    for (let s = 0; s < t.length; s++)
      t[s](r);
  }, tn = (t, r, s) => {
    Object.defineProperty(t, r, {
      configurable: !0,
      enumerable: !1,
      value: s
    });
  }, ff = (t) => {
    const r = parseFloat(t);
    return isNaN(r) ? t : r;
  }, Ul = (t) => {
    const r = de(t) ? Number(t) : NaN;
    return isNaN(r) ? t : r;
  };
  let Hl;
  const rn = () => Hl || (Hl = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
  function oi(t) {
    if (T(t)) {
      const r = {};
      for (let s = 0; s < t.length; s++) {
        const n = t[s], o = de(n) ? _f(n) : oi(n);
        if (o)
          for (const i in o)
            r[i] = o[i];
      }
      return r;
    } else if (de(t) || re(t))
      return t;
  }
  const hf = /;(?![^(]*\))/g, pf = /:([^]+)/, mf = /\/\*[^]*?\*\//g;
  function _f(t) {
    const r = {};
    return t.replace(mf, "").split(hf).forEach((s) => {
      if (s) {
        const n = s.split(pf);
        n.length > 1 && (r[n[0].trim()] = n[1].trim());
      }
    }), r;
  }
  function ii(t) {
    let r = "";
    if (de(t))
      r = t;
    else if (T(t))
      for (let s = 0; s < t.length; s++) {
        const n = ii(t[s]);
        n && (r += n + " ");
      }
    else if (re(t))
      for (const s in t)
        t[s] && (r += s + " ");
    return r.trim();
  }
  const vf = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", gf = /* @__PURE__ */ Lr(vf);
  function Ba(t) {
    return !!t || t === "";
  }
  const yf = (t, r) => r.endsWith("Modifiers") && !Wr(r) && e._isCE;
  function Eo(t, ...r) {
    console.warn(`[Vue warn] ${t}`, ...r);
  }
  let je;
  class bf {
    constructor(r = !1) {
      this.detached = r, this._active = !0, this.effects = [], this.cleanups = [], this.parent = je, !r && je && (this.index = (je.scopes || (je.scopes = [])).push(
        this
      ) - 1);
    }
    get active() {
      return this._active;
    }
    run(r) {
      if (this._active) {
        const s = je;
        try {
          return je = this, r();
        } finally {
          je = s;
        }
      } else
        process.env.NODE_ENV !== "production" && Eo("cannot run an inactive effect scope.");
    }
    /**
     * This should only be called on non-detached scopes
     * @internal
     */
    on() {
      je = this;
    }
    /**
     * This should only be called on non-detached scopes
     * @internal
     */
    off() {
      je = this.parent;
    }
    stop(r) {
      if (this._active) {
        let s, n;
        for (s = 0, n = this.effects.length; s < n; s++)
          this.effects[s].stop();
        for (s = 0, n = this.cleanups.length; s < n; s++)
          this.cleanups[s]();
        if (this.scopes)
          for (s = 0, n = this.scopes.length; s < n; s++)
            this.scopes[s].stop(!0);
        if (!this.detached && this.parent && !r) {
          const o = this.parent.scopes.pop();
          o && o !== this && (this.parent.scopes[this.index] = o, o.index = this.index);
        }
        this.parent = void 0, this._active = !1;
      }
    }
  }
  function Ef(t, r = je) {
    r && r.active && r.effects.push(t);
  }
  function wf() {
    return je;
  }
  const fs = (t) => {
    const r = new Set(t);
    return r.w = 0, r.n = 0, r;
  }, Ga = (t) => (t.w & zt) > 0, Ka = (t) => (t.n & zt) > 0, Of = ({ deps: t }) => {
    if (t.length)
      for (let r = 0; r < t.length; r++)
        t[r].w |= zt;
  }, Nf = (t) => {
    const { deps: r } = t;
    if (r.length) {
      let s = 0;
      for (let n = 0; n < r.length; n++) {
        const o = r[n];
        Ga(o) && !Ka(o) ? o.delete(t) : r[s++] = o, o.w &= ~zt, o.n &= ~zt;
      }
      r.length = s;
    }
  }, wo = /* @__PURE__ */ new WeakMap();
  let es = 0, zt = 1;
  const Oo = 30;
  let Ne;
  const sr = Symbol(process.env.NODE_ENV !== "production" ? "iterate" : ""), No = Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
  class li {
    constructor(r, s = null, n) {
      this.fn = r, this.scheduler = s, this.active = !0, this.deps = [], this.parent = void 0, Ef(this, n);
    }
    run() {
      if (!this.active)
        return this.fn();
      let r = Ne, s = Wt;
      for (; r; ) {
        if (r === this)
          return;
        r = r.parent;
      }
      try {
        return this.parent = Ne, Ne = this, Wt = !0, zt = 1 << ++es, es <= Oo ? Of(this) : Ll(this), this.fn();
      } finally {
        es <= Oo && Nf(this), zt = 1 << --es, Ne = this.parent, Wt = s, this.parent = void 0, this.deferStop && this.stop();
      }
    }
    stop() {
      Ne === this ? this.deferStop = !0 : this.active && (Ll(this), this.onStop && this.onStop(), this.active = !1);
    }
  }
  function Ll(t) {
    const { deps: r } = t;
    if (r.length) {
      for (let s = 0; s < r.length; s++)
        r[s].delete(t);
      r.length = 0;
    }
  }
  let Wt = !0;
  const qa = [];
  function pr() {
    qa.push(Wt), Wt = !1;
  }
  function mr() {
    const t = qa.pop();
    Wt = t === void 0 ? !0 : t;
  }
  function ve(t, r, s) {
    if (Wt && Ne) {
      let n = wo.get(t);
      n || wo.set(t, n = /* @__PURE__ */ new Map());
      let o = n.get(s);
      o || n.set(s, o = fs());
      const i = process.env.NODE_ENV !== "production" ? { effect: Ne, target: t, type: r, key: s } : void 0;
      So(o, i);
    }
  }
  function So(t, r) {
    let s = !1;
    es <= Oo ? Ka(t) || (t.n |= zt, s = !Ga(t)) : s = !t.has(Ne), s && (t.add(Ne), Ne.deps.push(t), process.env.NODE_ENV !== "production" && Ne.onTrack && Ne.onTrack(
      ie(
        {
          effect: Ne
        },
        r
      )
    ));
  }
  function ct(t, r, s, n, o, i) {
    const l = wo.get(t);
    if (!l)
      return;
    let a = [];
    if (r === "clear")
      a = [...l.values()];
    else if (s === "length" && T(t)) {
      const d = Number(n);
      l.forEach((p, h) => {
        (h === "length" || !yn(h) && h >= d) && a.push(p);
      });
    } else
      switch (s !== void 0 && a.push(l.get(s)), r) {
        case "add":
          T(t) ? ni(s) && a.push(l.get("length")) : (a.push(l.get(sr)), kr(t) && a.push(l.get(No)));
          break;
        case "delete":
          T(t) || (a.push(l.get(sr)), kr(t) && a.push(l.get(No)));
          break;
        case "set":
          kr(t) && a.push(l.get(sr));
          break;
      }
    const u = process.env.NODE_ENV !== "production" ? { target: t, type: r, key: s, newValue: n, oldValue: o, oldTarget: i } : void 0;
    if (a.length === 1)
      a[0] && (process.env.NODE_ENV !== "production" ? $r(a[0], u) : $r(a[0]));
    else {
      const d = [];
      for (const p of a)
        p && d.push(...p);
      process.env.NODE_ENV !== "production" ? $r(fs(d), u) : $r(fs(d));
    }
  }
  function $r(t, r) {
    const s = T(t) ? t : [...t];
    for (const n of s)
      n.computed && Wl(n, r);
    for (const n of s)
      n.computed || Wl(n, r);
  }
  function Wl(t, r) {
    (t !== Ne || t.allowRecurse) && (process.env.NODE_ENV !== "production" && t.onTrigger && t.onTrigger(ie({ effect: t }, r)), t.scheduler ? t.scheduler() : t.run());
  }
  const Sf = /* @__PURE__ */ Lr("__proto__,__v_isRef,__isVue"), Ja = new Set(
    /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(yn)
  ), jl = /* @__PURE__ */ Df();
  function Df() {
    const t = {};
    return ["includes", "indexOf", "lastIndexOf"].forEach((r) => {
      t[r] = function(...s) {
        const n = Y(this);
        for (let i = 0, l = this.length; i < l; i++)
          ve(n, "get", i + "");
        const o = n[r](...s);
        return o === -1 || o === !1 ? n[r](...s.map(Y)) : o;
      };
    }), ["push", "pop", "shift", "unshift", "splice"].forEach((r) => {
      t[r] = function(...s) {
        pr();
        const n = Y(this)[r].apply(this, s);
        return mr(), n;
      };
    }), t;
  }
  function $f(t) {
    const r = Y(this);
    return ve(r, "has", t), r.hasOwnProperty(t);
  }
  class Za {
    constructor(r = !1, s = !1) {
      this._isReadonly = r, this._shallow = s;
    }
    get(r, s, n) {
      const o = this._isReadonly, i = this._shallow;
      if (s === "__v_isReactive")
        return !o;
      if (s === "__v_isReadonly")
        return o;
      if (s === "__v_isShallow")
        return i;
      if (s === "__v_raw" && n === (o ? i ? nu : su : i ? ru : tu).get(r))
        return r;
      const l = T(r);
      if (!o) {
        if (l && H(jl, s))
          return Reflect.get(jl, s, n);
        if (s === "hasOwnProperty")
          return $f;
      }
      const a = Reflect.get(r, s, n);
      return (yn(s) ? Ja.has(s) : Sf(s)) || (o || ve(r, "get", s), i) ? a : pe(a) ? l && ni(s) ? a : a.value : re(a) ? o ? ou(a) : ui(a) : a;
    }
  }
  class Qa extends Za {
    constructor(r = !1) {
      super(!1, r);
    }
    set(r, s, n, o) {
      let i = r[s];
      if (Bt(i) && pe(i) && !pe(n))
        return !1;
      if (!this._shallow && (!sn(n) && !Bt(n) && (i = Y(i), n = Y(n)), !T(r) && pe(i) && !pe(n)))
        return i.value = n, !0;
      const l = T(r) && ni(s) ? Number(s) < r.length : H(r, s), a = Reflect.set(r, s, n, o);
      return r === Y(o) && (l ? fr(n, i) && ct(r, "set", s, n, i) : ct(r, "add", s, n)), a;
    }
    deleteProperty(r, s) {
      const n = H(r, s), o = r[s], i = Reflect.deleteProperty(r, s);
      return i && n && ct(r, "delete", s, void 0, o), i;
    }
    has(r, s) {
      const n = Reflect.has(r, s);
      return (!yn(s) || !Ja.has(s)) && ve(r, "has", s), n;
    }
    ownKeys(r) {
      return ve(
        r,
        "iterate",
        T(r) ? "length" : sr
      ), Reflect.ownKeys(r);
    }
  }
  class Xa extends Za {
    constructor(r = !1) {
      super(!0, r);
    }
    set(r, s) {
      return process.env.NODE_ENV !== "production" && Eo(
        `Set operation on key "${String(s)}" failed: target is readonly.`,
        r
      ), !0;
    }
    deleteProperty(r, s) {
      return process.env.NODE_ENV !== "production" && Eo(
        `Delete operation on key "${String(s)}" failed: target is readonly.`,
        r
      ), !0;
    }
  }
  const xf = /* @__PURE__ */ new Qa(), Mf = /* @__PURE__ */ new Xa(), Cf = /* @__PURE__ */ new Qa(
    !0
  ), kf = /* @__PURE__ */ new Xa(!0), ai = (t) => t, wn = (t) => Reflect.getPrototypeOf(t);
  function ks(t, r, s = !1, n = !1) {
    t = t.__v_raw;
    const o = Y(t), i = Y(r);
    s || (fr(r, i) && ve(o, "get", r), ve(o, "get", i));
    const { has: l } = wn(o), a = n ? ai : s ? ci : hs;
    if (l.call(o, r))
      return a(t.get(r));
    if (l.call(o, i))
      return a(t.get(i));
    t !== o && t.get(r);
  }
  function Ps(t, r = !1) {
    const s = this.__v_raw, n = Y(s), o = Y(t);
    return r || (fr(t, o) && ve(n, "has", t), ve(n, "has", o)), t === o ? s.has(t) : s.has(t) || s.has(o);
  }
  function Ts(t, r = !1) {
    return t = t.__v_raw, !r && ve(Y(t), "iterate", sr), Reflect.get(t, "size", t);
  }
  function zl(t) {
    t = Y(t);
    const r = Y(this);
    return wn(r).has.call(r, t) || (r.add(t), ct(r, "add", t, t)), this;
  }
  function Bl(t, r) {
    r = Y(r);
    const s = Y(this), { has: n, get: o } = wn(s);
    let i = n.call(s, t);
    i ? process.env.NODE_ENV !== "production" && eu(s, n, t) : (t = Y(t), i = n.call(s, t));
    const l = o.call(s, t);
    return s.set(t, r), i ? fr(r, l) && ct(s, "set", t, r, l) : ct(s, "add", t, r), this;
  }
  function Gl(t) {
    const r = Y(this), { has: s, get: n } = wn(r);
    let o = s.call(r, t);
    o ? process.env.NODE_ENV !== "production" && eu(r, s, t) : (t = Y(t), o = s.call(r, t));
    const i = n ? n.call(r, t) : void 0, l = r.delete(t);
    return o && ct(r, "delete", t, void 0, i), l;
  }
  function Kl() {
    const t = Y(this), r = t.size !== 0, s = process.env.NODE_ENV !== "production" ? kr(t) ? new Map(t) : new Set(t) : void 0, n = t.clear();
    return r && ct(t, "clear", void 0, void 0, s), n;
  }
  function As(t, r) {
    return function(n, o) {
      const i = this, l = i.__v_raw, a = Y(l), u = r ? ai : t ? ci : hs;
      return !t && ve(a, "iterate", sr), l.forEach((d, p) => n.call(o, u(d), u(p), i));
    };
  }
  function Vs(t, r, s) {
    return function(...n) {
      const o = this.__v_raw, i = Y(o), l = kr(i), a = t === "entries" || t === Symbol.iterator && l, u = t === "keys" && l, d = o[t](...n), p = s ? ai : r ? ci : hs;
      return !r && ve(
        i,
        "iterate",
        u ? No : sr
      ), {
        // iterator protocol
        next() {
          const { value: h, done: _ } = d.next();
          return _ ? { value: h, done: _ } : {
            value: a ? [p(h[0]), p(h[1])] : p(h),
            done: _
          };
        },
        // iterable protocol
        [Symbol.iterator]() {
          return this;
        }
      };
    };
  }
  function At(t) {
    return function(...r) {
      if (process.env.NODE_ENV !== "production") {
        const s = r[0] ? `on key "${r[0]}" ` : "";
        console.warn(
          `${dr(t)} operation ${s}failed: target is readonly.`,
          Y(this)
        );
      }
      return t === "delete" ? !1 : t === "clear" ? void 0 : this;
    };
  }
  function Pf() {
    const t = {
      get(i) {
        return ks(this, i);
      },
      get size() {
        return Ts(this);
      },
      has: Ps,
      add: zl,
      set: Bl,
      delete: Gl,
      clear: Kl,
      forEach: As(!1, !1)
    }, r = {
      get(i) {
        return ks(this, i, !1, !0);
      },
      get size() {
        return Ts(this);
      },
      has: Ps,
      add: zl,
      set: Bl,
      delete: Gl,
      clear: Kl,
      forEach: As(!1, !0)
    }, s = {
      get(i) {
        return ks(this, i, !0);
      },
      get size() {
        return Ts(this, !0);
      },
      has(i) {
        return Ps.call(this, i, !0);
      },
      add: At("add"),
      set: At("set"),
      delete: At("delete"),
      clear: At("clear"),
      forEach: As(!0, !1)
    }, n = {
      get(i) {
        return ks(this, i, !0, !0);
      },
      get size() {
        return Ts(this, !0);
      },
      has(i) {
        return Ps.call(this, i, !0);
      },
      add: At("add"),
      set: At("set"),
      delete: At("delete"),
      clear: At("clear"),
      forEach: As(!0, !0)
    };
    return ["keys", "values", "entries", Symbol.iterator].forEach((i) => {
      t[i] = Vs(
        i,
        !1,
        !1
      ), s[i] = Vs(
        i,
        !0,
        !1
      ), r[i] = Vs(
        i,
        !1,
        !0
      ), n[i] = Vs(
        i,
        !0,
        !0
      );
    }), [
      t,
      s,
      r,
      n
    ];
  }
  const [
    Tf,
    Af,
    Vf,
    If
  ] = /* @__PURE__ */ Pf();
  function On(t, r) {
    const s = r ? t ? If : Vf : t ? Af : Tf;
    return (n, o, i) => o === "__v_isReactive" ? !t : o === "__v_isReadonly" ? t : o === "__v_raw" ? n : Reflect.get(
      H(s, o) && o in n ? s : n,
      o,
      i
    );
  }
  const Rf = {
    get: /* @__PURE__ */ On(!1, !1)
  }, Yf = {
    get: /* @__PURE__ */ On(!1, !0)
  }, Ff = {
    get: /* @__PURE__ */ On(!0, !1)
  }, Uf = {
    get: /* @__PURE__ */ On(!0, !0)
  };
  function eu(t, r, s) {
    const n = Y(s);
    if (n !== s && r.call(t, n)) {
      const o = si(t);
      console.warn(
        `Reactive ${o} contains both the raw and reactive versions of the same object${o === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
      );
    }
  }
  const tu = /* @__PURE__ */ new WeakMap(), ru = /* @__PURE__ */ new WeakMap(), su = /* @__PURE__ */ new WeakMap(), nu = /* @__PURE__ */ new WeakMap();
  function Hf(t) {
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
  function Lf(t) {
    return t.__v_skip || !Object.isExtensible(t) ? 0 : Hf(si(t));
  }
  function ui(t) {
    return Bt(t) ? t : Nn(
      t,
      !1,
      xf,
      Rf,
      tu
    );
  }
  function Wf(t) {
    return Nn(
      t,
      !1,
      Cf,
      Yf,
      ru
    );
  }
  function ou(t) {
    return Nn(
      t,
      !0,
      Mf,
      Ff,
      su
    );
  }
  function ts(t) {
    return Nn(
      t,
      !0,
      kf,
      Uf,
      nu
    );
  }
  function Nn(t, r, s, n, o) {
    if (!re(t))
      return process.env.NODE_ENV !== "production" && console.warn(`value cannot be made reactive: ${String(t)}`), t;
    if (t.__v_raw && !(r && t.__v_isReactive))
      return t;
    const i = o.get(t);
    if (i)
      return i;
    const l = Lf(t);
    if (l === 0)
      return t;
    const a = new Proxy(
      t,
      l === 2 ? n : s
    );
    return o.set(t, a), a;
  }
  function nr(t) {
    return Bt(t) ? nr(t.__v_raw) : !!(t && t.__v_isReactive);
  }
  function Bt(t) {
    return !!(t && t.__v_isReadonly);
  }
  function sn(t) {
    return !!(t && t.__v_isShallow);
  }
  function Do(t) {
    return nr(t) || Bt(t);
  }
  function Y(t) {
    const r = t && t.__v_raw;
    return r ? Y(r) : t;
  }
  function iu(t) {
    return tn(t, "__v_skip", !0), t;
  }
  const hs = (t) => re(t) ? ui(t) : t, ci = (t) => re(t) ? ou(t) : t;
  function lu(t) {
    Wt && Ne && (t = Y(t), process.env.NODE_ENV !== "production" ? So(t.dep || (t.dep = fs()), {
      target: t,
      type: "get",
      key: "value"
    }) : So(t.dep || (t.dep = fs())));
  }
  function au(t, r) {
    t = Y(t);
    const s = t.dep;
    s && (process.env.NODE_ENV !== "production" ? $r(s, {
      target: t,
      type: "set",
      key: "value",
      newValue: r
    }) : $r(s));
  }
  function pe(t) {
    return !!(t && t.__v_isRef === !0);
  }
  function jf(t) {
    return zf(t, !1);
  }
  function zf(t, r) {
    return pe(t) ? t : new Bf(t, r);
  }
  class Bf {
    constructor(r, s) {
      this.__v_isShallow = s, this.dep = void 0, this.__v_isRef = !0, this._rawValue = s ? r : Y(r), this._value = s ? r : hs(r);
    }
    get value() {
      return lu(this), this._value;
    }
    set value(r) {
      const s = this.__v_isShallow || sn(r) || Bt(r);
      r = s ? r : Y(r), fr(r, this._rawValue) && (this._rawValue = r, this._value = s ? r : hs(r), au(this, r));
    }
  }
  function Gf(t) {
    return pe(t) ? t.value : t;
  }
  const Kf = {
    get: (t, r, s) => Gf(Reflect.get(t, r, s)),
    set: (t, r, s, n) => {
      const o = t[r];
      return pe(o) && !pe(s) ? (o.value = s, !0) : Reflect.set(t, r, s, n);
    }
  };
  function uu(t) {
    return nr(t) ? t : new Proxy(t, Kf);
  }
  class qf {
    constructor(r, s, n, o) {
      this._setter = s, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this._dirty = !0, this.effect = new li(r, () => {
        this._dirty || (this._dirty = !0, au(this));
      }), this.effect.computed = this, this.effect.active = this._cacheable = !o, this.__v_isReadonly = n;
    }
    get value() {
      const r = Y(this);
      return lu(r), (r._dirty || !r._cacheable) && (r._dirty = !1, r._value = r.effect.run()), r._value;
    }
    set value(r) {
      this._setter(r);
    }
  }
  function Jf(t, r, s = !1) {
    let n, o;
    const i = A(t);
    i ? (n = t, o = process.env.NODE_ENV !== "production" ? () => {
      console.warn("Write operation failed: computed value is readonly");
    } : _e) : (n = t.get, o = t.set);
    const l = new qf(n, o, i || !o, s);
    return process.env.NODE_ENV !== "production" && r && !s && (l.effect.onTrack = r.onTrack, l.effect.onTrigger = r.onTrigger), l;
  }
  const or = [];
  function Hs(t) {
    or.push(t);
  }
  function Ls() {
    or.pop();
  }
  function O(t, ...r) {
    if (process.env.NODE_ENV === "production")
      return;
    pr();
    const s = or.length ? or[or.length - 1].component : null, n = s && s.appContext.config.warnHandler, o = Zf();
    if (n)
      St(
        n,
        s,
        11,
        [
          t + r.join(""),
          s && s.proxy,
          o.map(
            ({ vnode: i }) => `at <${kn(s, i.type)}>`
          ).join(`
`),
          o
        ]
      );
    else {
      const i = [`[Vue warn]: ${t}`, ...r];
      o.length && i.push(`
`, ...Qf(o)), console.warn(...i);
    }
    mr();
  }
  function Zf() {
    let t = or[or.length - 1];
    if (!t)
      return [];
    const r = [];
    for (; t; ) {
      const s = r[0];
      s && s.vnode === t ? s.recurseCount++ : r.push({
        vnode: t,
        recurseCount: 0
      });
      const n = t.component && t.component.parent;
      t = n && n.vnode;
    }
    return r;
  }
  function Qf(t) {
    const r = [];
    return t.forEach((s, n) => {
      r.push(...n === 0 ? [] : [`
`], ...Xf(s));
    }), r;
  }
  function Xf({ vnode: t, recurseCount: r }) {
    const s = r > 0 ? `... (${r} recursive calls)` : "", n = t.component ? t.component.parent == null : !1, o = ` at <${kn(
      t.component,
      t.type,
      n
    )}`, i = ">" + s;
    return t.props ? [o, ...eh(t.props), i] : [o + i];
  }
  function eh(t) {
    const r = [], s = Object.keys(t);
    return s.slice(0, 3).forEach((n) => {
      r.push(...cu(n, t[n]));
    }), s.length > 3 && r.push(" ..."), r;
  }
  function cu(t, r, s) {
    return de(r) ? (r = JSON.stringify(r), s ? r : [`${t}=${r}`]) : typeof r == "number" || typeof r == "boolean" || r == null ? s ? r : [`${t}=${r}`] : pe(r) ? (r = cu(t, Y(r.value), !0), s ? r : [`${t}=Ref<`, r, ">"]) : A(r) ? [`${t}=fn${r.name ? `<${r.name}>` : ""}`] : (r = Y(r), s ? r : [`${t}=`, r]);
  }
  const di = {
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
  function St(t, r, s, n) {
    let o;
    try {
      o = n ? t(...n) : t();
    } catch (i) {
      Sn(i, r, s);
    }
    return o;
  }
  function Ke(t, r, s, n) {
    if (A(t)) {
      const i = St(t, r, s, n);
      return i && ri(i) && i.catch((l) => {
        Sn(l, r, s);
      }), i;
    }
    const o = [];
    for (let i = 0; i < t.length; i++)
      o.push(Ke(t[i], r, s, n));
    return o;
  }
  function Sn(t, r, s, n = !0) {
    const o = r ? r.vnode : null;
    if (r) {
      let i = r.parent;
      const l = r.proxy, a = process.env.NODE_ENV !== "production" ? di[s] : s;
      for (; i; ) {
        const d = i.ec;
        if (d) {
          for (let p = 0; p < d.length; p++)
            if (d[p](t, l, a) === !1)
              return;
        }
        i = i.parent;
      }
      const u = r.appContext.config.errorHandler;
      if (u) {
        St(
          u,
          null,
          10,
          [t, l, a]
        );
        return;
      }
    }
    th(t, s, o, n);
  }
  function th(t, r, s, n = !0) {
    if (process.env.NODE_ENV !== "production") {
      const o = di[r];
      if (s && Hs(s), O(`Unhandled error${o ? ` during execution of ${o}` : ""}`), s && Ls(), n)
        throw t;
      console.error(t);
    } else
      console.error(t);
  }
  let ps = !1, $o = !1;
  const ge = [];
  let lt = 0;
  const Pr = [];
  let ot = null, Rt = 0;
  const du = /* @__PURE__ */ Promise.resolve();
  let fi = null;
  const rh = 100;
  function fu(t) {
    const r = fi || du;
    return t ? r.then(this ? t.bind(this) : t) : r;
  }
  function sh(t) {
    let r = lt + 1, s = ge.length;
    for (; r < s; ) {
      const n = r + s >>> 1, o = ge[n], i = ms(o);
      i < t || i === t && o.pre ? r = n + 1 : s = n;
    }
    return r;
  }
  function Dn(t) {
    (!ge.length || !ge.includes(
      t,
      ps && t.allowRecurse ? lt + 1 : lt
    )) && (t.id == null ? ge.push(t) : ge.splice(sh(t.id), 0, t), hu());
  }
  function hu() {
    !ps && !$o && ($o = !0, fi = du.then(_u));
  }
  function nh(t) {
    const r = ge.indexOf(t);
    r > lt && ge.splice(r, 1);
  }
  function pu(t) {
    T(t) ? Pr.push(...t) : (!ot || !ot.includes(
      t,
      t.allowRecurse ? Rt + 1 : Rt
    )) && Pr.push(t), hu();
  }
  function ql(t, r = ps ? lt + 1 : 0) {
    for (process.env.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()); r < ge.length; r++) {
      const s = ge[r];
      if (s && s.pre) {
        if (process.env.NODE_ENV !== "production" && hi(t, s))
          continue;
        ge.splice(r, 1), r--, s();
      }
    }
  }
  function mu(t) {
    if (Pr.length) {
      const r = [...new Set(Pr)];
      if (Pr.length = 0, ot) {
        ot.push(...r);
        return;
      }
      for (ot = r, process.env.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()), ot.sort((s, n) => ms(s) - ms(n)), Rt = 0; Rt < ot.length; Rt++)
        process.env.NODE_ENV !== "production" && hi(t, ot[Rt]) || ot[Rt]();
      ot = null, Rt = 0;
    }
  }
  const ms = (t) => t.id == null ? 1 / 0 : t.id, oh = (t, r) => {
    const s = ms(t) - ms(r);
    if (s === 0) {
      if (t.pre && !r.pre)
        return -1;
      if (r.pre && !t.pre)
        return 1;
    }
    return s;
  };
  function _u(t) {
    $o = !1, ps = !0, process.env.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()), ge.sort(oh);
    const r = process.env.NODE_ENV !== "production" ? (s) => hi(t, s) : _e;
    try {
      for (lt = 0; lt < ge.length; lt++) {
        const s = ge[lt];
        if (s && s.active !== !1) {
          if (process.env.NODE_ENV !== "production" && r(s))
            continue;
          St(s, null, 14);
        }
      }
    } finally {
      lt = 0, ge.length = 0, mu(t), ps = !1, fi = null, (ge.length || Pr.length) && _u(t);
    }
  }
  function hi(t, r) {
    if (!t.has(r))
      t.set(r, 1);
    else {
      const s = t.get(r);
      if (s > rh) {
        const n = r.ownerInstance, o = n && Ni(n.type);
        return O(
          `Maximum recursive updates exceeded${o ? ` in component <${o}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`
        ), !0;
      } else
        t.set(r, s + 1);
    }
  }
  let ir = !1;
  const Nr = /* @__PURE__ */ new Set();
  process.env.NODE_ENV !== "production" && (rn().__VUE_HMR_RUNTIME__ = {
    createRecord: so(vu),
    rerender: so(ah),
    reload: so(uh)
  });
  const hr = /* @__PURE__ */ new Map();
  function ih(t) {
    const r = t.type.__hmrId;
    let s = hr.get(r);
    s || (vu(r, t.type), s = hr.get(r)), s.instances.add(t);
  }
  function lh(t) {
    hr.get(t.type.__hmrId).instances.delete(t);
  }
  function vu(t, r) {
    return hr.has(t) ? !1 : (hr.set(t, {
      initialDef: ns(r),
      instances: /* @__PURE__ */ new Set()
    }), !0);
  }
  function ns(t) {
    return Wu(t) ? t.__vccOpts : t;
  }
  function ah(t, r) {
    const s = hr.get(t);
    s && (s.initialDef.render = r, [...s.instances].forEach((n) => {
      r && (n.render = r, ns(n.type).render = r), n.renderCache = [], ir = !0, n.update(), ir = !1;
    }));
  }
  function uh(t, r) {
    const s = hr.get(t);
    if (!s)
      return;
    r = ns(r), Jl(s.initialDef, r);
    const n = [...s.instances];
    for (const o of n) {
      const i = ns(o.type);
      Nr.has(i) || (i !== s.initialDef && Jl(i, r), Nr.add(i)), o.appContext.propsCache.delete(o.type), o.appContext.emitsCache.delete(o.type), o.appContext.optionsCache.delete(o.type), o.ceReload ? (Nr.add(i), o.ceReload(r.styles), Nr.delete(i)) : o.parent ? Dn(o.parent.update) : o.appContext.reload ? o.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
        "[HMR] Root or manually mounted instance modified. Full reload required."
      );
    }
    pu(() => {
      for (const o of n)
        Nr.delete(
          ns(o.type)
        );
    });
  }
  function Jl(t, r) {
    ie(t, r);
    for (const s in t)
      s !== "__file" && !(s in r) && delete t[s];
  }
  function so(t) {
    return (r, s) => {
      try {
        return t(r, s);
      } catch (n) {
        console.error(n), console.warn(
          "[HMR] Something went wrong during Vue component hot-reload. Full reload required."
        );
      }
    };
  }
  let at, rs = [], xo = !1;
  function ws(t, ...r) {
    at ? at.emit(t, ...r) : xo || rs.push({ event: t, args: r });
  }
  function gu(t, r) {
    var s, n;
    at = t, at ? (at.enabled = !0, rs.forEach(({ event: o, args: i }) => at.emit(o, ...i)), rs = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
    window.HTMLElement && // also exclude jsdom
    !((n = (s = window.navigator) == null ? void 0 : s.userAgent) != null && n.includes("jsdom")) ? ((r.__VUE_DEVTOOLS_HOOK_REPLAY__ = r.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((i) => {
      gu(i, r);
    }), setTimeout(() => {
      at || (r.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, xo = !0, rs = []);
    }, 3e3)) : (xo = !0, rs = []);
  }
  function ch(t, r) {
    ws("app:init", t, r, {
      Fragment: it,
      Text: Os,
      Comment: qe,
      Static: Gs
    });
  }
  function dh(t) {
    ws("app:unmount", t);
  }
  const fh = /* @__PURE__ */ pi(
    "component:added"
    /* COMPONENT_ADDED */
  ), yu = /* @__PURE__ */ pi(
    "component:updated"
    /* COMPONENT_UPDATED */
  ), hh = /* @__PURE__ */ pi(
    "component:removed"
    /* COMPONENT_REMOVED */
  ), ph = (t) => {
    at && typeof at.cleanupBuffer == "function" && // remove the component if it wasn't buffered
    !at.cleanupBuffer(t) && hh(t);
  };
  function pi(t) {
    return (r) => {
      ws(
        t,
        r.appContext.app,
        r.uid,
        r.parent ? r.parent.uid : void 0,
        r
      );
    };
  }
  const mh = /* @__PURE__ */ bu(
    "perf:start"
    /* PERFORMANCE_START */
  ), _h = /* @__PURE__ */ bu(
    "perf:end"
    /* PERFORMANCE_END */
  );
  function bu(t) {
    return (r, s, n) => {
      ws(t, r.appContext.app, r.uid, r, s, n);
    };
  }
  function vh(t, r, s) {
    ws(
      "component:emit",
      t.appContext.app,
      t,
      r,
      s
    );
  }
  function Eu(t, r, ...s) {
    if (t.isUnmounted)
      return;
    const n = t.vnode.props || Z;
    if (process.env.NODE_ENV !== "production") {
      const {
        emitsOptions: p,
        propsOptions: [h]
      } = t;
      if (p)
        if (!(r in p))
          (!h || !(It(r) in h)) && O(
            `Component emitted event "${r}" but it is neither declared in the emits option nor as an "${It(r)}" prop.`
          );
        else {
          const _ = p[r];
          A(_) && (_(...s) || O(
            `Invalid event arguments: event validation failed for event "${r}".`
          ));
        }
    }
    let o = s;
    const i = r.startsWith("update:"), l = i && r.slice(7);
    if (l && l in n) {
      const p = `${l === "modelValue" ? "model" : l}Modifiers`, { number: h, trim: _ } = n[p] || Z;
      _ && (o = s.map(($) => de($) ? $.trim() : $)), h && (o = s.map(ff));
    }
    if (process.env.NODE_ENV !== "production" && vh(t, r, o), process.env.NODE_ENV !== "production") {
      const p = r.toLowerCase();
      p !== r && n[It(p)] && O(
        `Event "${p}" is emitted in component ${kn(
          t,
          t.type
        )} but the handler is registered for "${r}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${Te(r)}" instead of "${r}".`
      );
    }
    let a, u = n[a = It(r)] || // also try camelCase event handler (#2249)
    n[a = It(Ae(r))];
    !u && i && (u = n[a = It(Te(r))]), u && Ke(
      u,
      t,
      6,
      o
    );
    const d = n[a + "Once"];
    if (d) {
      if (!t.emitted)
        t.emitted = {};
      else if (t.emitted[a])
        return;
      t.emitted[a] = !0, Ke(
        d,
        t,
        6,
        o
      );
    }
  }
  function wu(t, r, s = !1) {
    const n = r.emitsCache, o = n.get(t);
    if (o !== void 0)
      return o;
    const i = t.emits;
    let l = {}, a = !1;
    if (!A(t)) {
      const u = (d) => {
        const p = wu(d, r, !0);
        p && (a = !0, ie(l, p));
      };
      !s && r.mixins.length && r.mixins.forEach(u), t.extends && u(t.extends), t.mixins && t.mixins.forEach(u);
    }
    return !i && !a ? (re(t) && n.set(t, null), null) : (T(i) ? i.forEach((u) => l[u] = null) : ie(l, i), re(t) && n.set(t, l), l);
  }
  function $n(t, r) {
    return !t || !Wr(r) ? !1 : (r = r.slice(2).replace(/Once$/, ""), H(t, r[0].toLowerCase() + r.slice(1)) || H(t, Te(r)) || H(t, r));
  }
  let Ce = null, xn = null;
  function nn(t) {
    const r = Ce;
    return Ce = t, xn = t && t.type.__scopeId || null, r;
  }
  function gh(t) {
    xn = t;
  }
  function yh() {
    xn = null;
  }
  function bh(t, r = Ce, s) {
    if (!r || t._n)
      return t;
    const n = (...o) => {
      n._d && ua(-1);
      const i = nn(r);
      let l;
      try {
        l = t(...o);
      } finally {
        nn(i), n._d && ua(1);
      }
      return process.env.NODE_ENV !== "production" && yu(r), l;
    };
    return n._n = !0, n._c = !0, n._d = !0, n;
  }
  let Mo = !1;
  function on() {
    Mo = !0;
  }
  function no(t) {
    const {
      type: r,
      vnode: s,
      proxy: n,
      withProxy: o,
      props: i,
      propsOptions: [l],
      slots: a,
      attrs: u,
      emit: d,
      render: p,
      renderCache: h,
      data: _,
      setupState: $,
      ctx: W,
      inheritAttrs: F
    } = t;
    let le, fe;
    const Xe = nn(t);
    process.env.NODE_ENV !== "production" && (Mo = !1);
    try {
      if (s.shapeFlag & 4) {
        const V = o || n, _t = process.env.NODE_ENV !== "production" && $.__isScriptSetup ? new Proxy(V, {
          get(tt, Le, ke) {
            return O(
              `Property '${String(
                Le
              )}' was accessed via 'this'. Avoid using 'this' in templates.`
            ), Reflect.get(tt, Le, ke);
          }
        }) : V;
        le = ze(
          p.call(
            _t,
            V,
            h,
            i,
            $,
            _,
            W
          )
        ), fe = u;
      } else {
        const V = r;
        process.env.NODE_ENV !== "production" && u === i && on(), le = ze(
          V.length > 1 ? V(
            i,
            process.env.NODE_ENV !== "production" ? {
              get attrs() {
                return on(), u;
              },
              slots: a,
              emit: d
            } : { attrs: u, slots: a, emit: d }
          ) : V(
            i,
            null
            /* we know it doesn't need it */
          )
        ), fe = r.props ? u : wh(u);
      }
    } catch (V) {
      os.length = 0, Sn(V, t, 1), le = Re(qe);
    }
    let G = le, et;
    if (process.env.NODE_ENV !== "production" && le.patchFlag > 0 && le.patchFlag & 2048 && ([G, et] = Eh(le)), fe && F !== !1) {
      const V = Object.keys(fe), { shapeFlag: _t } = G;
      if (V.length) {
        if (_t & 7)
          l && V.some(Fr) && (fe = Oh(
            fe,
            l
          )), G = Gt(G, fe);
        else if (process.env.NODE_ENV !== "production" && !Mo && G.type !== qe) {
          const tt = Object.keys(u), Le = [], ke = [];
          for (let vt = 0, kt = tt.length; vt < kt; vt++) {
            const We = tt[vt];
            Wr(We) ? Fr(We) || Le.push(We[2].toLowerCase() + We.slice(3)) : ke.push(We);
          }
          ke.length && O(
            `Extraneous non-props attributes (${ke.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes.`
          ), Le.length && O(
            `Extraneous non-emits event listeners (${Le.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`
          );
        }
      }
    }
    return s.dirs && (process.env.NODE_ENV !== "production" && !Zl(G) && O(
      "Runtime directive used on component with non-element root node. The directives will not function as intended."
    ), G = Gt(G), G.dirs = G.dirs ? G.dirs.concat(s.dirs) : s.dirs), s.transition && (process.env.NODE_ENV !== "production" && !Zl(G) && O(
      "Component inside <Transition> renders non-element root node that cannot be animated."
    ), G.transition = s.transition), process.env.NODE_ENV !== "production" && et ? et(G) : le = G, nn(Xe), le;
  }
  const Eh = (t) => {
    const r = t.children, s = t.dynamicChildren, n = Ou(r);
    if (!n)
      return [t, void 0];
    const o = r.indexOf(n), i = s ? s.indexOf(n) : -1, l = (a) => {
      r[o] = a, s && (i > -1 ? s[i] = a : a.patchFlag > 0 && (t.dynamicChildren = [...s, a]));
    };
    return [ze(n), l];
  };
  function Ou(t) {
    let r;
    for (let s = 0; s < t.length; s++) {
      const n = t[s];
      if (bi(n)) {
        if (n.type !== qe || n.children === "v-if") {
          if (r)
            return;
          r = n;
        }
      } else
        return;
    }
    return r;
  }
  const wh = (t) => {
    let r;
    for (const s in t)
      (s === "class" || s === "style" || Wr(s)) && ((r || (r = {}))[s] = t[s]);
    return r;
  }, Oh = (t, r) => {
    const s = {};
    for (const n in t)
      (!Fr(n) || !(n.slice(9) in r)) && (s[n] = t[n]);
    return s;
  }, Zl = (t) => t.shapeFlag & 7 || t.type === qe;
  function Nh(t, r, s) {
    const { props: n, children: o, component: i } = t, { props: l, children: a, patchFlag: u } = r, d = i.emitsOptions;
    if (process.env.NODE_ENV !== "production" && (o || a) && ir || r.dirs || r.transition)
      return !0;
    if (s && u >= 0) {
      if (u & 1024)
        return !0;
      if (u & 16)
        return n ? Ql(n, l, d) : !!l;
      if (u & 8) {
        const p = r.dynamicProps;
        for (let h = 0; h < p.length; h++) {
          const _ = p[h];
          if (l[_] !== n[_] && !$n(d, _))
            return !0;
        }
      }
    } else
      return (o || a) && (!a || !a.$stable) ? !0 : n === l ? !1 : n ? l ? Ql(n, l, d) : !0 : !!l;
    return !1;
  }
  function Ql(t, r, s) {
    const n = Object.keys(r);
    if (n.length !== Object.keys(t).length)
      return !0;
    for (let o = 0; o < n.length; o++) {
      const i = n[o];
      if (r[i] !== t[i] && !$n(s, i))
        return !0;
    }
    return !1;
  }
  function Sh({ vnode: t, parent: r }, s) {
    for (; r && r.subTree === t; )
      (t = r.vnode).el = s, r = r.parent;
  }
  const Co = "components";
  function oo(t, r) {
    return $h(Co, t, !0, r) || t;
  }
  const Dh = Symbol.for("v-ndc");
  function $h(t, r, s = !0, n = !1) {
    const o = Ce || he;
    if (o) {
      const i = o.type;
      if (t === Co) {
        const a = Ni(
          i,
          !1
          /* do not include inferred name to avoid breaking existing code */
        );
        if (a && (a === r || a === Ae(r) || a === dr(Ae(r))))
          return i;
      }
      const l = (
        // local registration
        // check instance[type] first which is resolved for options API
        Xl(o[t] || i[t], r) || // global registration
        Xl(o.appContext[t], r)
      );
      if (!l && n)
        return i;
      if (process.env.NODE_ENV !== "production" && s && !l) {
        const a = t === Co ? `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.` : "";
        O(`Failed to resolve ${t.slice(0, -1)}: ${r}${a}`);
      }
      return l;
    } else
      process.env.NODE_ENV !== "production" && O(
        `resolve${dr(t.slice(0, -1))} can only be used in render() or setup().`
      );
  }
  function Xl(t, r) {
    return t && (t[r] || t[Ae(r)] || t[dr(Ae(r))]);
  }
  const xh = (t) => t.__isSuspense;
  function Mh(t, r) {
    r && r.pendingBranch ? T(t) ? r.effects.push(...t) : r.effects.push(t) : pu(t);
  }
  const Is = {};
  function Ws(t, r, s) {
    return process.env.NODE_ENV !== "production" && !A(r) && O(
      "`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature."
    ), Nu(t, r, s);
  }
  function Nu(t, r, { immediate: s, deep: n, flush: o, onTrack: i, onTrigger: l } = Z) {
    var a;
    process.env.NODE_ENV !== "production" && !r && (s !== void 0 && O(
      'watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'
    ), n !== void 0 && O(
      'watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'
    ));
    const u = (V) => {
      O(
        "Invalid watch source: ",
        V,
        "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
      );
    }, d = wf() === ((a = he) == null ? void 0 : a.scope) ? he : null;
    let p, h = !1, _ = !1;
    if (pe(t) ? (p = () => t.value, h = sn(t)) : nr(t) ? (p = () => t, n = !0) : T(t) ? (_ = !0, h = t.some((V) => nr(V) || sn(V)), p = () => t.map((V) => {
      if (pe(V))
        return V.value;
      if (nr(V))
        return xr(V);
      if (A(V))
        return St(V, d, 2);
      process.env.NODE_ENV !== "production" && u(V);
    })) : A(t) ? r ? p = () => St(t, d, 2) : p = () => {
      if (!(d && d.isUnmounted))
        return $ && $(), Ke(
          t,
          d,
          3,
          [W]
        );
    } : (p = _e, process.env.NODE_ENV !== "production" && u(t)), r && n) {
      const V = p;
      p = () => xr(V());
    }
    let $, W = (V) => {
      $ = G.onStop = () => {
        St(V, d, 4), $ = G.onStop = void 0;
      };
    }, F;
    if (vs)
      if (W = _e, r ? s && Ke(r, d, 3, [
        p(),
        _ ? [] : void 0,
        W
      ]) : p(), o === "sync") {
        const V = Yp();
        F = V.__watcherHandles || (V.__watcherHandles = []);
      } else
        return _e;
    let le = _ ? new Array(t.length).fill(Is) : Is;
    const fe = () => {
      if (G.active)
        if (r) {
          const V = G.run();
          (n || h || (_ ? V.some((_t, tt) => fr(_t, le[tt])) : fr(V, le))) && ($ && $(), Ke(r, d, 3, [
            V,
            // pass undefined as the old value when it's changed for the first time
            le === Is ? void 0 : _ && le[0] === Is ? [] : le,
            W
          ]), le = V);
        } else
          G.run();
    };
    fe.allowRecurse = !!r;
    let Xe;
    o === "sync" ? Xe = fe : o === "post" ? Xe = () => $e(fe, d && d.suspense) : (fe.pre = !0, d && (fe.id = d.uid), Xe = () => Dn(fe));
    const G = new li(p, Xe);
    process.env.NODE_ENV !== "production" && (G.onTrack = i, G.onTrigger = l), r ? s ? fe() : le = G.run() : o === "post" ? $e(
      G.run.bind(G),
      d && d.suspense
    ) : G.run();
    const et = () => {
      G.stop(), d && d.scope && ti(d.scope.effects, G);
    };
    return F && F.push(et), et;
  }
  function Ch(t, r, s) {
    const n = this.proxy, o = de(t) ? t.includes(".") ? Su(n, t) : () => n[t] : t.bind(n, n);
    let i;
    A(r) ? i = r : (i = r.handler, s = r);
    const l = he;
    Ur(this);
    const a = Nu(o, i.bind(n), s);
    return l ? Ur(l) : ar(), a;
  }
  function Su(t, r) {
    const s = r.split(".");
    return () => {
      let n = t;
      for (let o = 0; o < s.length && n; o++)
        n = n[s[o]];
      return n;
    };
  }
  function xr(t, r) {
    if (!re(t) || t.__v_skip || (r = r || /* @__PURE__ */ new Set(), r.has(t)))
      return t;
    if (r.add(t), pe(t))
      xr(t.value, r);
    else if (T(t))
      for (let s = 0; s < t.length; s++)
        xr(t[s], r);
    else if (of(t) || kr(t))
      t.forEach((s) => {
        xr(s, r);
      });
    else if (af(t))
      for (const s in t)
        xr(t[s], r);
    return t;
  }
  function Du(t) {
    uf(t) && O("Do not use built-in directive ids as custom directive id: " + t);
  }
  function Jt(t, r, s, n) {
    const o = t.dirs, i = r && r.dirs;
    for (let l = 0; l < o.length; l++) {
      const a = o[l];
      i && (a.oldValue = i[l].value);
      let u = a.dir[n];
      u && (pr(), Ke(u, s, 8, [
        t.el,
        a,
        t,
        r
      ]), mr());
    }
  }
  /*! #__NO_SIDE_EFFECTS__ */
  // @__NO_SIDE_EFFECTS__
  function mi(t, r) {
    return A(t) ? (
      // #8326: extend call and options.name access are considered side-effects
      // by Rollup, so we have to wrap it in a pure-annotated IIFE.
      ie({ name: t.name }, r, { setup: t })
    ) : t;
  }
  const js = (t) => !!t.type.__asyncLoader, _i = (t) => t.type.__isKeepAlive;
  function kh(t, r) {
    $u(t, "a", r);
  }
  function Ph(t, r) {
    $u(t, "da", r);
  }
  function $u(t, r, s = he) {
    const n = t.__wdc || (t.__wdc = () => {
      let o = s;
      for (; o; ) {
        if (o.isDeactivated)
          return;
        o = o.parent;
      }
      return t();
    });
    if (Mn(r, n, s), s) {
      let o = s.parent;
      for (; o && o.parent; )
        _i(o.parent.vnode) && Th(n, r, s, o), o = o.parent;
    }
  }
  function Th(t, r, s, n) {
    const o = Mn(
      r,
      t,
      n,
      !0
      /* prepend */
    );
    xu(() => {
      ti(n[r], o);
    }, s);
  }
  function Mn(t, r, s = he, n = !1) {
    if (s) {
      const o = s[t] || (s[t] = []), i = r.__weh || (r.__weh = (...l) => {
        if (s.isUnmounted)
          return;
        pr(), Ur(s);
        const a = Ke(r, s, t, l);
        return ar(), mr(), a;
      });
      return n ? o.unshift(i) : o.push(i), i;
    } else if (process.env.NODE_ENV !== "production") {
      const o = It(di[t].replace(/ hook$/, ""));
      O(
        `${o} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`
      );
    }
  }
  const xt = (t) => (r, s = he) => (
    // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
    (!vs || t === "sp") && Mn(t, (...n) => r(...n), s)
  ), Ah = xt("bm"), Vh = xt("m"), Ih = xt("bu"), Rh = xt("u"), Yh = xt("bum"), xu = xt("um"), Fh = xt("sp"), Uh = xt(
    "rtg"
  ), Hh = xt(
    "rtc"
  );
  function Lh(t, r = he) {
    Mn("ec", t, r);
  }
  const ko = (t) => t ? Hu(t) ? Oi(t) || t.proxy : ko(t.parent) : null, lr = (
    // Move PURE marker to new line to workaround compiler discarding it
    // due to type annotation
    /* @__PURE__ */ ie(/* @__PURE__ */ Object.create(null), {
      $: (t) => t,
      $el: (t) => t.vnode.el,
      $data: (t) => t.data,
      $props: (t) => process.env.NODE_ENV !== "production" ? ts(t.props) : t.props,
      $attrs: (t) => process.env.NODE_ENV !== "production" ? ts(t.attrs) : t.attrs,
      $slots: (t) => process.env.NODE_ENV !== "production" ? ts(t.slots) : t.slots,
      $refs: (t) => process.env.NODE_ENV !== "production" ? ts(t.refs) : t.refs,
      $parent: (t) => ko(t.parent),
      $root: (t) => ko(t.root),
      $emit: (t) => t.emit,
      $options: (t) => gi(t),
      $forceUpdate: (t) => t.f || (t.f = () => Dn(t.update)),
      $nextTick: (t) => t.n || (t.n = fu.bind(t.proxy)),
      $watch: (t) => Ch.bind(t)
    })
  ), vi = (t) => t === "_" || t === "$", io = (t, r) => t !== Z && !t.__isScriptSetup && H(t, r), Mu = {
    get({ _: t }, r) {
      const { ctx: s, setupState: n, data: o, props: i, accessCache: l, type: a, appContext: u } = t;
      if (process.env.NODE_ENV !== "production" && r === "__isVue")
        return !0;
      let d;
      if (r[0] !== "$") {
        const $ = l[r];
        if ($ !== void 0)
          switch ($) {
            case 1:
              return n[r];
            case 2:
              return o[r];
            case 4:
              return s[r];
            case 3:
              return i[r];
          }
        else {
          if (io(n, r))
            return l[r] = 1, n[r];
          if (o !== Z && H(o, r))
            return l[r] = 2, o[r];
          if (
            // only cache other properties when instance has declared (thus stable)
            // props
            (d = t.propsOptions[0]) && H(d, r)
          )
            return l[r] = 3, i[r];
          if (s !== Z && H(s, r))
            return l[r] = 4, s[r];
          Po && (l[r] = 0);
        }
      }
      const p = lr[r];
      let h, _;
      if (p)
        return r === "$attrs" ? (ve(t, "get", r), process.env.NODE_ENV !== "production" && on()) : process.env.NODE_ENV !== "production" && r === "$slots" && ve(t, "get", r), p(t);
      if (
        // css module (injected by vue-loader)
        (h = a.__cssModules) && (h = h[r])
      )
        return h;
      if (s !== Z && H(s, r))
        return l[r] = 4, s[r];
      if (
        // global properties
        _ = u.config.globalProperties, H(_, r)
      )
        return _[r];
      process.env.NODE_ENV !== "production" && Ce && (!de(r) || // #1091 avoid internal isRef/isVNode checks on component instance leading
      // to infinite warning loop
      r.indexOf("__v") !== 0) && (o !== Z && vi(r[0]) && H(o, r) ? O(
        `Property ${JSON.stringify(
          r
        )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
      ) : t === Ce && O(
        `Property ${JSON.stringify(r)} was accessed during render but is not defined on instance.`
      ));
    },
    set({ _: t }, r, s) {
      const { data: n, setupState: o, ctx: i } = t;
      return io(o, r) ? (o[r] = s, !0) : process.env.NODE_ENV !== "production" && o.__isScriptSetup && H(o, r) ? (O(`Cannot mutate <script setup> binding "${r}" from Options API.`), !1) : n !== Z && H(n, r) ? (n[r] = s, !0) : H(t.props, r) ? (process.env.NODE_ENV !== "production" && O(`Attempting to mutate prop "${r}". Props are readonly.`), !1) : r[0] === "$" && r.slice(1) in t ? (process.env.NODE_ENV !== "production" && O(
        `Attempting to mutate public property "${r}". Properties starting with $ are reserved and readonly.`
      ), !1) : (process.env.NODE_ENV !== "production" && r in t.appContext.config.globalProperties ? Object.defineProperty(i, r, {
        enumerable: !0,
        configurable: !0,
        value: s
      }) : i[r] = s, !0);
    },
    has({
      _: { data: t, setupState: r, accessCache: s, ctx: n, appContext: o, propsOptions: i }
    }, l) {
      let a;
      return !!s[l] || t !== Z && H(t, l) || io(r, l) || (a = i[0]) && H(a, l) || H(n, l) || H(lr, l) || H(o.config.globalProperties, l);
    },
    defineProperty(t, r, s) {
      return s.get != null ? t._.accessCache[r] = 0 : H(s, "value") && this.set(t, r, s.value, null), Reflect.defineProperty(t, r, s);
    }
  };
  process.env.NODE_ENV !== "production" && (Mu.ownKeys = (t) => (O(
    "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
  ), Reflect.ownKeys(t)));
  function Wh(t) {
    const r = {};
    return Object.defineProperty(r, "_", {
      configurable: !0,
      enumerable: !1,
      get: () => t
    }), Object.keys(lr).forEach((s) => {
      Object.defineProperty(r, s, {
        configurable: !0,
        enumerable: !1,
        get: () => lr[s](t),
        // intercepted by the proxy so no need for implementation,
        // but needed to prevent set errors
        set: _e
      });
    }), r;
  }
  function jh(t) {
    const {
      ctx: r,
      propsOptions: [s]
    } = t;
    s && Object.keys(s).forEach((n) => {
      Object.defineProperty(r, n, {
        enumerable: !0,
        configurable: !0,
        get: () => t.props[n],
        set: _e
      });
    });
  }
  function zh(t) {
    const { ctx: r, setupState: s } = t;
    Object.keys(Y(s)).forEach((n) => {
      if (!s.__isScriptSetup) {
        if (vi(n[0])) {
          O(
            `setup() return property ${JSON.stringify(
              n
            )} should not start with "$" or "_" which are reserved prefixes for Vue internals.`
          );
          return;
        }
        Object.defineProperty(r, n, {
          enumerable: !0,
          configurable: !0,
          get: () => s[n],
          set: _e
        });
      }
    });
  }
  function ea(t) {
    return T(t) ? t.reduce(
      (r, s) => (r[s] = null, r),
      {}
    ) : t;
  }
  function Bh() {
    const t = /* @__PURE__ */ Object.create(null);
    return (r, s) => {
      t[s] ? O(`${r} property "${s}" is already defined in ${t[s]}.`) : t[s] = r;
    };
  }
  let Po = !0;
  function Gh(t) {
    const r = gi(t), s = t.proxy, n = t.ctx;
    Po = !1, r.beforeCreate && ta(r.beforeCreate, t, "bc");
    const {
      // state
      data: o,
      computed: i,
      methods: l,
      watch: a,
      provide: u,
      inject: d,
      // lifecycle
      created: p,
      beforeMount: h,
      mounted: _,
      beforeUpdate: $,
      updated: W,
      activated: F,
      deactivated: le,
      beforeDestroy: fe,
      beforeUnmount: Xe,
      destroyed: G,
      unmounted: et,
      render: V,
      renderTracked: _t,
      renderTriggered: tt,
      errorCaptured: Le,
      serverPrefetch: ke,
      // public API
      expose: vt,
      inheritAttrs: kt,
      // assets
      components: We,
      directives: Ms,
      filters: Ji
    } = r, Pt = process.env.NODE_ENV !== "production" ? Bh() : null;
    if (process.env.NODE_ENV !== "production") {
      const [j] = t.propsOptions;
      if (j)
        for (const z in j)
          Pt("Props", z);
    }
    if (d && Kh(d, n, Pt), l)
      for (const j in l) {
        const z = l[j];
        A(z) ? (process.env.NODE_ENV !== "production" ? Object.defineProperty(n, j, {
          value: z.bind(s),
          configurable: !0,
          enumerable: !0,
          writable: !0
        }) : n[j] = z.bind(s), process.env.NODE_ENV !== "production" && Pt("Methods", j)) : process.env.NODE_ENV !== "production" && O(
          `Method "${j}" has type "${typeof z}" in the component definition. Did you reference the function correctly?`
        );
      }
    if (o) {
      process.env.NODE_ENV !== "production" && !A(o) && O(
        "The data option must be a function. Plain object usage is no longer supported."
      );
      const j = o.call(s, s);
      if (process.env.NODE_ENV !== "production" && ri(j) && O(
        "data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>."
      ), !re(j))
        process.env.NODE_ENV !== "production" && O("data() should return an object.");
      else if (t.data = ui(j), process.env.NODE_ENV !== "production")
        for (const z in j)
          Pt("Data", z), vi(z[0]) || Object.defineProperty(n, z, {
            configurable: !0,
            enumerable: !0,
            get: () => j[z],
            set: _e
          });
    }
    if (Po = !0, i)
      for (const j in i) {
        const z = i[j], rt = A(z) ? z.bind(s, s) : A(z.get) ? z.get.bind(s, s) : _e;
        process.env.NODE_ENV !== "production" && rt === _e && O(`Computed property "${j}" has no getter.`);
        const jn = !A(z) && A(z.set) ? z.set.bind(s) : process.env.NODE_ENV !== "production" ? () => {
          O(
            `Write operation failed: computed property "${j}" is readonly.`
          );
        } : _e, Br = Ip({
          get: rt,
          set: jn
        });
        Object.defineProperty(n, j, {
          enumerable: !0,
          configurable: !0,
          get: () => Br.value,
          set: (gr) => Br.value = gr
        }), process.env.NODE_ENV !== "production" && Pt("Computed", j);
      }
    if (a)
      for (const j in a)
        Cu(a[j], n, s, j);
    if (u) {
      const j = A(u) ? u.call(s) : u;
      Reflect.ownKeys(j).forEach((z) => {
        ep(z, j[z]);
      });
    }
    p && ta(p, t, "c");
    function Se(j, z) {
      T(z) ? z.forEach((rt) => j(rt.bind(s))) : z && j(z.bind(s));
    }
    if (Se(Ah, h), Se(Vh, _), Se(Ih, $), Se(Rh, W), Se(kh, F), Se(Ph, le), Se(Lh, Le), Se(Hh, _t), Se(Uh, tt), Se(Yh, Xe), Se(xu, et), Se(Fh, ke), T(vt))
      if (vt.length) {
        const j = t.exposed || (t.exposed = {});
        vt.forEach((z) => {
          Object.defineProperty(j, z, {
            get: () => s[z],
            set: (rt) => s[z] = rt
          });
        });
      } else
        t.exposed || (t.exposed = {});
    V && t.render === _e && (t.render = V), kt != null && (t.inheritAttrs = kt), We && (t.components = We), Ms && (t.directives = Ms);
  }
  function Kh(t, r, s = _e) {
    T(t) && (t = To(t));
    for (const n in t) {
      const o = t[n];
      let i;
      re(o) ? "default" in o ? i = zs(
        o.from || n,
        o.default,
        !0
        /* treat default function as factory */
      ) : i = zs(o.from || n) : i = zs(o), pe(i) ? Object.defineProperty(r, n, {
        enumerable: !0,
        configurable: !0,
        get: () => i.value,
        set: (l) => i.value = l
      }) : r[n] = i, process.env.NODE_ENV !== "production" && s("Inject", n);
    }
  }
  function ta(t, r, s) {
    Ke(
      T(t) ? t.map((n) => n.bind(r.proxy)) : t.bind(r.proxy),
      r,
      s
    );
  }
  function Cu(t, r, s, n) {
    const o = n.includes(".") ? Su(s, n) : () => s[n];
    if (de(t)) {
      const i = r[t];
      A(i) ? Ws(o, i) : process.env.NODE_ENV !== "production" && O(`Invalid watch handler specified by key "${t}"`, i);
    } else if (A(t))
      Ws(o, t.bind(s));
    else if (re(t))
      if (T(t))
        t.forEach((i) => Cu(i, r, s, n));
      else {
        const i = A(t.handler) ? t.handler.bind(s) : r[t.handler];
        A(i) ? Ws(o, i, t) : process.env.NODE_ENV !== "production" && O(`Invalid watch handler specified by key "${t.handler}"`, i);
      }
    else
      process.env.NODE_ENV !== "production" && O(`Invalid watch option: "${n}"`, t);
  }
  function gi(t) {
    const r = t.type, { mixins: s, extends: n } = r, {
      mixins: o,
      optionsCache: i,
      config: { optionMergeStrategies: l }
    } = t.appContext, a = i.get(r);
    let u;
    return a ? u = a : !o.length && !s && !n ? u = r : (u = {}, o.length && o.forEach(
      (d) => ln(u, d, l, !0)
    ), ln(u, r, l)), re(r) && i.set(r, u), u;
  }
  function ln(t, r, s, n = !1) {
    const { mixins: o, extends: i } = r;
    i && ln(t, i, s, !0), o && o.forEach(
      (l) => ln(t, l, s, !0)
    );
    for (const l in r)
      if (n && l === "expose")
        process.env.NODE_ENV !== "production" && O(
          '"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.'
        );
      else {
        const a = qh[l] || s && s[l];
        t[l] = a ? a(t[l], r[l]) : r[l];
      }
    return t;
  }
  const qh = {
    data: ra,
    props: sa,
    emits: sa,
    // objects
    methods: ss,
    computed: ss,
    // lifecycle
    beforeCreate: Oe,
    created: Oe,
    beforeMount: Oe,
    mounted: Oe,
    beforeUpdate: Oe,
    updated: Oe,
    beforeDestroy: Oe,
    beforeUnmount: Oe,
    destroyed: Oe,
    unmounted: Oe,
    activated: Oe,
    deactivated: Oe,
    errorCaptured: Oe,
    serverPrefetch: Oe,
    // assets
    components: ss,
    directives: ss,
    // watch
    watch: Zh,
    // provide / inject
    provide: ra,
    inject: Jh
  };
  function ra(t, r) {
    return r ? t ? function() {
      return ie(
        A(t) ? t.call(this, this) : t,
        A(r) ? r.call(this, this) : r
      );
    } : r : t;
  }
  function Jh(t, r) {
    return ss(To(t), To(r));
  }
  function To(t) {
    if (T(t)) {
      const r = {};
      for (let s = 0; s < t.length; s++)
        r[t[s]] = t[s];
      return r;
    }
    return t;
  }
  function Oe(t, r) {
    return t ? [...new Set([].concat(t, r))] : r;
  }
  function ss(t, r) {
    return t ? ie(/* @__PURE__ */ Object.create(null), t, r) : r;
  }
  function sa(t, r) {
    return t ? T(t) && T(r) ? [.../* @__PURE__ */ new Set([...t, ...r])] : ie(
      /* @__PURE__ */ Object.create(null),
      ea(t),
      ea(r ?? {})
    ) : r;
  }
  function Zh(t, r) {
    if (!t)
      return r;
    if (!r)
      return t;
    const s = ie(/* @__PURE__ */ Object.create(null), t);
    for (const n in r)
      s[n] = Oe(t[n], r[n]);
    return s;
  }
  function ku() {
    return {
      app: null,
      config: {
        isNativeTag: za,
        performance: !1,
        globalProperties: {},
        optionMergeStrategies: {},
        errorHandler: void 0,
        warnHandler: void 0,
        compilerOptions: {}
      },
      mixins: [],
      components: {},
      directives: {},
      provides: /* @__PURE__ */ Object.create(null),
      optionsCache: /* @__PURE__ */ new WeakMap(),
      propsCache: /* @__PURE__ */ new WeakMap(),
      emitsCache: /* @__PURE__ */ new WeakMap()
    };
  }
  let Qh = 0;
  function Xh(t, r) {
    return function(n, o = null) {
      A(n) || (n = ie({}, n)), o != null && !re(o) && (process.env.NODE_ENV !== "production" && O("root props passed to app.mount() must be an object."), o = null);
      const i = ku();
      process.env.NODE_ENV !== "production" && Object.defineProperty(i.config, "unwrapInjectedRef", {
        get() {
          return !0;
        },
        set() {
          O(
            "app.config.unwrapInjectedRef has been deprecated. 3.3 now always unwraps injected refs in Options API."
          );
        }
      });
      const l = /* @__PURE__ */ new WeakSet();
      let a = !1;
      const u = i.app = {
        _uid: Qh++,
        _component: n,
        _props: o,
        _container: null,
        _context: i,
        _instance: null,
        version: ha,
        get config() {
          return i.config;
        },
        set config(d) {
          process.env.NODE_ENV !== "production" && O(
            "app.config cannot be replaced. Modify individual options instead."
          );
        },
        use(d, ...p) {
          return l.has(d) ? process.env.NODE_ENV !== "production" && O("Plugin has already been applied to target app.") : d && A(d.install) ? (l.add(d), d.install(u, ...p)) : A(d) ? (l.add(d), d(u, ...p)) : process.env.NODE_ENV !== "production" && O(
            'A plugin must either be a function or an object with an "install" function.'
          ), u;
        },
        mixin(d) {
          return i.mixins.includes(d) ? process.env.NODE_ENV !== "production" && O(
            "Mixin has already been applied to target app" + (d.name ? `: ${d.name}` : "")
          ) : i.mixins.push(d), u;
        },
        component(d, p) {
          return process.env.NODE_ENV !== "production" && Fo(d, i.config), p ? (process.env.NODE_ENV !== "production" && i.components[d] && O(`Component "${d}" has already been registered in target app.`), i.components[d] = p, u) : i.components[d];
        },
        directive(d, p) {
          return process.env.NODE_ENV !== "production" && Du(d), p ? (process.env.NODE_ENV !== "production" && i.directives[d] && O(`Directive "${d}" has already been registered in target app.`), i.directives[d] = p, u) : i.directives[d];
        },
        mount(d, p, h) {
          if (a)
            process.env.NODE_ENV !== "production" && O(
              "App has already been mounted.\nIf you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. `const createMyApp = () => createApp(App)`"
            );
          else {
            process.env.NODE_ENV !== "production" && d.__vue_app__ && O(
              "There is already an app instance mounted on the host container.\n If you want to mount another app on the same host container, you need to unmount the previous app by calling `app.unmount()` first."
            );
            const _ = Re(n, o);
            return _.appContext = i, process.env.NODE_ENV !== "production" && (i.reload = () => {
              t(Gt(_), d, h);
            }), p && r ? r(_, d) : t(_, d, h), a = !0, u._container = d, d.__vue_app__ = u, process.env.NODE_ENV !== "production" && (u._instance = _.component, ch(u, ha)), Oi(_.component) || _.component.proxy;
          }
        },
        unmount() {
          a ? (t(null, u._container), process.env.NODE_ENV !== "production" && (u._instance = null, dh(u)), delete u._container.__vue_app__) : process.env.NODE_ENV !== "production" && O("Cannot unmount an app that is not mounted.");
        },
        provide(d, p) {
          return process.env.NODE_ENV !== "production" && d in i.provides && O(
            `App already provides property with key "${String(d)}". It will be overwritten with the new value.`
          ), i.provides[d] = p, u;
        },
        runWithContext(d) {
          an = u;
          try {
            return d();
          } finally {
            an = null;
          }
        }
      };
      return u;
    };
  }
  let an = null;
  function ep(t, r) {
    if (!he)
      process.env.NODE_ENV !== "production" && O("provide() can only be used inside setup().");
    else {
      let s = he.provides;
      const n = he.parent && he.parent.provides;
      n === s && (s = he.provides = Object.create(n)), s[t] = r;
    }
  }
  function zs(t, r, s = !1) {
    const n = he || Ce;
    if (n || an) {
      const o = n ? n.parent == null ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : an._context.provides;
      if (o && t in o)
        return o[t];
      if (arguments.length > 1)
        return s && A(r) ? r.call(n && n.proxy) : r;
      process.env.NODE_ENV !== "production" && O(`injection "${String(t)}" not found.`);
    } else
      process.env.NODE_ENV !== "production" && O("inject() can only be used inside setup() or functional components.");
  }
  function tp(t, r, s, n = !1) {
    const o = {}, i = {};
    tn(i, Cn, 1), t.propsDefaults = /* @__PURE__ */ Object.create(null), Pu(t, r, o, i);
    for (const l in t.propsOptions[0])
      l in o || (o[l] = void 0);
    process.env.NODE_ENV !== "production" && Au(r || {}, o, t), s ? t.props = n ? o : Wf(o) : t.type.props ? t.props = o : t.props = i, t.attrs = i;
  }
  function rp(t) {
    for (; t; ) {
      if (t.type.__hmrId)
        return !0;
      t = t.parent;
    }
  }
  function sp(t, r, s, n) {
    const {
      props: o,
      attrs: i,
      vnode: { patchFlag: l }
    } = t, a = Y(o), [u] = t.propsOptions;
    let d = !1;
    if (
      // always force full diff in dev
      // - #1942 if hmr is enabled with sfc component
      // - vite#872 non-sfc component used by sfc component
      !(process.env.NODE_ENV !== "production" && rp(t)) && (n || l > 0) && !(l & 16)
    ) {
      if (l & 8) {
        const p = t.vnode.dynamicProps;
        for (let h = 0; h < p.length; h++) {
          let _ = p[h];
          if ($n(t.emitsOptions, _))
            continue;
          const $ = r[_];
          if (u)
            if (H(i, _))
              $ !== i[_] && (i[_] = $, d = !0);
            else {
              const W = Ae(_);
              o[W] = Ao(
                u,
                a,
                W,
                $,
                t,
                !1
                /* isAbsent */
              );
            }
          else
            $ !== i[_] && (i[_] = $, d = !0);
        }
      }
    } else {
      Pu(t, r, o, i) && (d = !0);
      let p;
      for (const h in a)
        (!r || // for camelCase
        !H(r, h) && // it's possible the original props was passed in as kebab-case
        // and converted to camelCase (#955)
        ((p = Te(h)) === h || !H(r, p))) && (u ? s && // for camelCase
        (s[h] !== void 0 || // for kebab-case
        s[p] !== void 0) && (o[h] = Ao(
          u,
          a,
          h,
          void 0,
          t,
          !0
          /* isAbsent */
        )) : delete o[h]);
      if (i !== a)
        for (const h in i)
          (!r || !H(r, h)) && (delete i[h], d = !0);
    }
    d && ct(t, "set", "$attrs"), process.env.NODE_ENV !== "production" && Au(r || {}, o, t);
  }
  function Pu(t, r, s, n) {
    const [o, i] = t.propsOptions;
    let l = !1, a;
    if (r)
      for (let u in r) {
        if (Us(u))
          continue;
        const d = r[u];
        let p;
        o && H(o, p = Ae(u)) ? !i || !i.includes(p) ? s[p] = d : (a || (a = {}))[p] = d : $n(t.emitsOptions, u) || (!(u in n) || d !== n[u]) && (n[u] = d, l = !0);
      }
    if (i) {
      const u = Y(s), d = a || Z;
      for (let p = 0; p < i.length; p++) {
        const h = i[p];
        s[h] = Ao(
          o,
          u,
          h,
          d[h],
          t,
          !H(d, h)
        );
      }
    }
    return l;
  }
  function Ao(t, r, s, n, o, i) {
    const l = t[s];
    if (l != null) {
      const a = H(l, "default");
      if (a && n === void 0) {
        const u = l.default;
        if (l.type !== Function && !l.skipFactory && A(u)) {
          const { propsDefaults: d } = o;
          s in d ? n = d[s] : (Ur(o), n = d[s] = u.call(
            null,
            r
          ), ar());
        } else
          n = u;
      }
      l[
        0
        /* shouldCast */
      ] && (i && !a ? n = !1 : l[
        1
        /* shouldCastTrue */
      ] && (n === "" || n === Te(s)) && (n = !0));
    }
    return n;
  }
  function Tu(t, r, s = !1) {
    const n = r.propsCache, o = n.get(t);
    if (o)
      return o;
    const i = t.props, l = {}, a = [];
    let u = !1;
    if (!A(t)) {
      const p = (h) => {
        u = !0;
        const [_, $] = Tu(h, r, !0);
        ie(l, _), $ && a.push(...$);
      };
      !s && r.mixins.length && r.mixins.forEach(p), t.extends && p(t.extends), t.mixins && t.mixins.forEach(p);
    }
    if (!i && !u)
      return re(t) && n.set(t, Cr), Cr;
    if (T(i))
      for (let p = 0; p < i.length; p++) {
        process.env.NODE_ENV !== "production" && !de(i[p]) && O("props must be strings when using array syntax.", i[p]);
        const h = Ae(i[p]);
        na(h) && (l[h] = Z);
      }
    else if (i) {
      process.env.NODE_ENV !== "production" && !re(i) && O("invalid props options", i);
      for (const p in i) {
        const h = Ae(p);
        if (na(h)) {
          const _ = i[p], $ = l[h] = T(_) || A(_) ? { type: _ } : ie({}, _);
          if ($) {
            const W = ia(Boolean, $.type), F = ia(String, $.type);
            $[
              0
              /* shouldCast */
            ] = W > -1, $[
              1
              /* shouldCastTrue */
            ] = F < 0 || W < F, (W > -1 || H($, "default")) && a.push(h);
          }
        }
      }
    }
    const d = [l, a];
    return re(t) && n.set(t, d), d;
  }
  function na(t) {
    return t[0] !== "$" ? !0 : (process.env.NODE_ENV !== "production" && O(`Invalid prop name: "${t}" is a reserved property.`), !1);
  }
  function Vo(t) {
    const r = t && t.toString().match(/^\s*(function|class) (\w+)/);
    return r ? r[2] : t === null ? "null" : "";
  }
  function oa(t, r) {
    return Vo(t) === Vo(r);
  }
  function ia(t, r) {
    return T(r) ? r.findIndex((s) => oa(s, t)) : A(r) && oa(r, t) ? 0 : -1;
  }
  function Au(t, r, s) {
    const n = Y(r), o = s.propsOptions[0];
    for (const i in o) {
      let l = o[i];
      l != null && np(
        i,
        n[i],
        l,
        !H(t, i) && !H(t, Te(i))
      );
    }
  }
  function np(t, r, s, n) {
    const { type: o, required: i, validator: l, skipCheck: a } = s;
    if (i && n) {
      O('Missing required prop: "' + t + '"');
      return;
    }
    if (!(r == null && !i)) {
      if (o != null && o !== !0 && !a) {
        let u = !1;
        const d = T(o) ? o : [o], p = [];
        for (let h = 0; h < d.length && !u; h++) {
          const { valid: _, expectedType: $ } = ip(r, d[h]);
          p.push($ || ""), u = _;
        }
        if (!u) {
          O(lp(t, r, p));
          return;
        }
      }
      l && !l(r) && O('Invalid prop: custom validator check failed for prop "' + t + '".');
    }
  }
  const op = /* @__PURE__ */ Lr(
    "String,Number,Boolean,Function,Symbol,BigInt"
  );
  function ip(t, r) {
    let s;
    const n = Vo(r);
    if (op(n)) {
      const o = typeof t;
      s = o === n.toLowerCase(), !s && o === "object" && (s = t instanceof r);
    } else
      n === "Object" ? s = re(t) : n === "Array" ? s = T(t) : n === "null" ? s = t === null : s = t instanceof r;
    return {
      valid: s,
      expectedType: n
    };
  }
  function lp(t, r, s) {
    if (s.length === 0)
      return `Prop type [] for prop "${t}" won't match anything. Did you mean to use type Array instead?`;
    let n = `Invalid prop: type check failed for prop "${t}". Expected ${s.map(dr).join(" | ")}`;
    const o = s[0], i = si(r), l = la(r, o), a = la(r, i);
    return s.length === 1 && aa(o) && !ap(o, i) && (n += ` with value ${l}`), n += `, got ${i} `, aa(i) && (n += `with value ${a}.`), n;
  }
  function la(t, r) {
    return r === "String" ? `"${t}"` : r === "Number" ? `${Number(t)}` : `${t}`;
  }
  function aa(t) {
    return ["string", "number", "boolean"].some((s) => t.toLowerCase() === s);
  }
  function ap(...t) {
    return t.some((r) => r.toLowerCase() === "boolean");
  }
  const Vu = (t) => t[0] === "_" || t === "$stable", yi = (t) => T(t) ? t.map(ze) : [ze(t)], up = (t, r, s) => {
    if (r._n)
      return r;
    const n = bh((...o) => (process.env.NODE_ENV !== "production" && he && O(
      `Slot "${t}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`
    ), yi(r(...o))), s);
    return n._c = !1, n;
  }, Iu = (t, r, s) => {
    const n = t._ctx;
    for (const o in t) {
      if (Vu(o))
        continue;
      const i = t[o];
      if (A(i))
        r[o] = up(o, i, n);
      else if (i != null) {
        process.env.NODE_ENV !== "production" && O(
          `Non-function value encountered for slot "${o}". Prefer function slots for better performance.`
        );
        const l = yi(i);
        r[o] = () => l;
      }
    }
  }, Ru = (t, r) => {
    process.env.NODE_ENV !== "production" && !_i(t.vnode) && O(
      "Non-function value encountered for default slot. Prefer function slots for better performance."
    );
    const s = yi(r);
    t.slots.default = () => s;
  }, cp = (t, r) => {
    if (t.vnode.shapeFlag & 32) {
      const s = r._;
      s ? (t.slots = Y(r), tn(r, "_", s)) : Iu(
        r,
        t.slots = {}
      );
    } else
      t.slots = {}, r && Ru(t, r);
    tn(t.slots, Cn, 1);
  }, dp = (t, r, s) => {
    const { vnode: n, slots: o } = t;
    let i = !0, l = Z;
    if (n.shapeFlag & 32) {
      const a = r._;
      a ? process.env.NODE_ENV !== "production" && ir ? (ie(o, r), ct(t, "set", "$slots")) : s && a === 1 ? i = !1 : (ie(o, r), !s && a === 1 && delete o._) : (i = !r.$stable, Iu(r, o)), l = r;
    } else
      r && (Ru(t, r), l = { default: 1 });
    if (i)
      for (const a in o)
        !Vu(a) && l[a] == null && delete o[a];
  };
  function Io(t, r, s, n, o = !1) {
    if (T(t)) {
      t.forEach(
        (_, $) => Io(
          _,
          r && (T(r) ? r[$] : r),
          s,
          n,
          o
        )
      );
      return;
    }
    if (js(n) && !o)
      return;
    const i = n.shapeFlag & 4 ? Oi(n.component) || n.component.proxy : n.el, l = o ? null : i, { i: a, r: u } = t;
    if (process.env.NODE_ENV !== "production" && !a) {
      O(
        "Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function."
      );
      return;
    }
    const d = r && r.r, p = a.refs === Z ? a.refs = {} : a.refs, h = a.setupState;
    if (d != null && d !== u && (de(d) ? (p[d] = null, H(h, d) && (h[d] = null)) : pe(d) && (d.value = null)), A(u))
      St(u, a, 12, [l, p]);
    else {
      const _ = de(u), $ = pe(u);
      if (_ || $) {
        const W = () => {
          if (t.f) {
            const F = _ ? H(h, u) ? h[u] : p[u] : u.value;
            o ? T(F) && ti(F, i) : T(F) ? F.includes(i) || F.push(i) : _ ? (p[u] = [i], H(h, u) && (h[u] = p[u])) : (u.value = [i], t.k && (p[t.k] = u.value));
          } else
            _ ? (p[u] = l, H(h, u) && (h[u] = l)) : $ ? (u.value = l, t.k && (p[t.k] = l)) : process.env.NODE_ENV !== "production" && O("Invalid template ref type:", u, `(${typeof u})`);
        };
        l ? (W.id = -1, $e(W, s)) : W();
      } else
        process.env.NODE_ENV !== "production" && O("Invalid template ref type:", u, `(${typeof u})`);
    }
  }
  let Jr, Ut;
  function bt(t, r) {
    t.appContext.config.performance && un() && Ut.mark(`vue-${r}-${t.uid}`), process.env.NODE_ENV !== "production" && mh(t, r, un() ? Ut.now() : Date.now());
  }
  function Et(t, r) {
    if (t.appContext.config.performance && un()) {
      const s = `vue-${r}-${t.uid}`, n = s + ":end";
      Ut.mark(n), Ut.measure(
        `<${kn(t, t.type)}> ${r}`,
        s,
        n
      ), Ut.clearMarks(s), Ut.clearMarks(n);
    }
    process.env.NODE_ENV !== "production" && _h(t, r, un() ? Ut.now() : Date.now());
  }
  function un() {
    return Jr !== void 0 || (typeof window < "u" && window.performance ? (Jr = !0, Ut = window.performance) : Jr = !1), Jr;
  }
  function fp() {
    const t = [];
    if (process.env.NODE_ENV !== "production" && t.length) {
      const r = t.length > 1;
      console.warn(
        `Feature flag${r ? "s" : ""} ${t.join(", ")} ${r ? "are" : "is"} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`
      );
    }
  }
  const $e = Mh;
  function hp(t) {
    return pp(t);
  }
  function pp(t, r) {
    fp();
    const s = rn();
    s.__VUE__ = !0, process.env.NODE_ENV !== "production" && gu(s.__VUE_DEVTOOLS_GLOBAL_HOOK__, s);
    const {
      insert: n,
      remove: o,
      patchProp: i,
      createElement: l,
      createText: a,
      createComment: u,
      setText: d,
      setElementText: p,
      parentNode: h,
      nextSibling: _,
      setScopeId: $ = _e,
      insertStaticContent: W
    } = t, F = (c, f, m, v = null, g = null, w = null, S = !1, E = null, N = process.env.NODE_ENV !== "production" && ir ? !1 : !!f.dynamicChildren) => {
      if (c === f)
        return;
      c && !Zr(c, f) && (v = Cs(c), Tt(c, g, w, !0), c = null), f.patchFlag === -2 && (N = !1, f.dynamicChildren = null);
      const { type: y, ref: C, shapeFlag: M } = f;
      switch (y) {
        case Os:
          le(c, f, m, v);
          break;
        case qe:
          fe(c, f, m, v);
          break;
        case Gs:
          c == null ? Xe(f, m, v, S) : process.env.NODE_ENV !== "production" && G(c, f, m, S);
          break;
        case it:
          Ms(
            c,
            f,
            m,
            v,
            g,
            w,
            S,
            E,
            N
          );
          break;
        default:
          M & 1 ? _t(
            c,
            f,
            m,
            v,
            g,
            w,
            S,
            E,
            N
          ) : M & 6 ? Ji(
            c,
            f,
            m,
            v,
            g,
            w,
            S,
            E,
            N
          ) : M & 64 || M & 128 ? y.process(
            c,
            f,
            m,
            v,
            g,
            w,
            S,
            E,
            N,
            yr
          ) : process.env.NODE_ENV !== "production" && O("Invalid VNode type:", y, `(${typeof y})`);
      }
      C != null && g && Io(C, c && c.ref, w, f || c, !f);
    }, le = (c, f, m, v) => {
      if (c == null)
        n(
          f.el = a(f.children),
          m,
          v
        );
      else {
        const g = f.el = c.el;
        f.children !== c.children && d(g, f.children);
      }
    }, fe = (c, f, m, v) => {
      c == null ? n(
        f.el = u(f.children || ""),
        m,
        v
      ) : f.el = c.el;
    }, Xe = (c, f, m, v) => {
      [c.el, c.anchor] = W(
        c.children,
        f,
        m,
        v,
        c.el,
        c.anchor
      );
    }, G = (c, f, m, v) => {
      if (f.children !== c.children) {
        const g = _(c.anchor);
        V(c), [f.el, f.anchor] = W(
          f.children,
          m,
          g,
          v
        );
      } else
        f.el = c.el, f.anchor = c.anchor;
    }, et = ({ el: c, anchor: f }, m, v) => {
      let g;
      for (; c && c !== f; )
        g = _(c), n(c, m, v), c = g;
      n(f, m, v);
    }, V = ({ el: c, anchor: f }) => {
      let m;
      for (; c && c !== f; )
        m = _(c), o(c), c = m;
      o(f);
    }, _t = (c, f, m, v, g, w, S, E, N) => {
      S = S || f.type === "svg", c == null ? tt(
        f,
        m,
        v,
        g,
        w,
        S,
        E,
        N
      ) : vt(
        c,
        f,
        g,
        w,
        S,
        E,
        N
      );
    }, tt = (c, f, m, v, g, w, S, E) => {
      let N, y;
      const { type: C, props: M, shapeFlag: P, transition: I, dirs: L } = c;
      if (N = c.el = l(
        c.type,
        w,
        M && M.is,
        M
      ), P & 8 ? p(N, c.children) : P & 16 && ke(
        c.children,
        N,
        null,
        v,
        g,
        w && C !== "foreignObject",
        S,
        E
      ), L && Jt(c, null, v, "created"), Le(N, c, c.scopeId, S, v), M) {
        for (const Q in M)
          Q !== "value" && !Us(Q) && i(
            N,
            Q,
            null,
            M[Q],
            w,
            c.children,
            v,
            g,
            gt
          );
        "value" in M && i(N, "value", null, M.value), (y = M.onVnodeBeforeMount) && nt(y, v, c);
      }
      process.env.NODE_ENV !== "production" && (Object.defineProperty(N, "__vnode", {
        value: c,
        enumerable: !1
      }), Object.defineProperty(N, "__vueParentComponent", {
        value: v,
        enumerable: !1
      })), L && Jt(c, null, v, "beforeMount");
      const ee = mp(g, I);
      ee && I.beforeEnter(N), n(N, f, m), ((y = M && M.onVnodeMounted) || ee || L) && $e(() => {
        y && nt(y, v, c), ee && I.enter(N), L && Jt(c, null, v, "mounted");
      }, g);
    }, Le = (c, f, m, v, g) => {
      if (m && $(c, m), v)
        for (let w = 0; w < v.length; w++)
          $(c, v[w]);
      if (g) {
        let w = g.subTree;
        if (process.env.NODE_ENV !== "production" && w.patchFlag > 0 && w.patchFlag & 2048 && (w = Ou(w.children) || w), f === w) {
          const S = g.vnode;
          Le(
            c,
            S,
            S.scopeId,
            S.slotScopeIds,
            g.parent
          );
        }
      }
    }, ke = (c, f, m, v, g, w, S, E, N = 0) => {
      for (let y = N; y < c.length; y++) {
        const C = c[y] = E ? Yt(c[y]) : ze(c[y]);
        F(
          null,
          C,
          f,
          m,
          v,
          g,
          w,
          S,
          E
        );
      }
    }, vt = (c, f, m, v, g, w, S) => {
      const E = f.el = c.el;
      let { patchFlag: N, dynamicChildren: y, dirs: C } = f;
      N |= c.patchFlag & 16;
      const M = c.props || Z, P = f.props || Z;
      let I;
      m && Zt(m, !1), (I = P.onVnodeBeforeUpdate) && nt(I, m, f, c), C && Jt(f, c, m, "beforeUpdate"), m && Zt(m, !0), process.env.NODE_ENV !== "production" && ir && (N = 0, S = !1, y = null);
      const L = g && f.type !== "foreignObject";
      if (y ? (kt(
        c.dynamicChildren,
        y,
        E,
        m,
        v,
        L,
        w
      ), process.env.NODE_ENV !== "production" && Bs(c, f)) : S || rt(
        c,
        f,
        E,
        null,
        m,
        v,
        L,
        w,
        !1
      ), N > 0) {
        if (N & 16)
          We(
            E,
            f,
            M,
            P,
            m,
            v,
            g
          );
        else if (N & 2 && M.class !== P.class && i(E, "class", null, P.class, g), N & 4 && i(E, "style", M.style, P.style, g), N & 8) {
          const ee = f.dynamicProps;
          for (let Q = 0; Q < ee.length; Q++) {
            const ce = ee[Q], De = M[ce], br = P[ce];
            (br !== De || ce === "value") && i(
              E,
              ce,
              De,
              br,
              g,
              c.children,
              m,
              v,
              gt
            );
          }
        }
        N & 1 && c.children !== f.children && p(E, f.children);
      } else
        !S && y == null && We(
          E,
          f,
          M,
          P,
          m,
          v,
          g
        );
      ((I = P.onVnodeUpdated) || C) && $e(() => {
        I && nt(I, m, f, c), C && Jt(f, c, m, "updated");
      }, v);
    }, kt = (c, f, m, v, g, w, S) => {
      for (let E = 0; E < f.length; E++) {
        const N = c[E], y = f[E], C = (
          // oldVNode may be an errored async setup() component inside Suspense
          // which will not have a mounted element
          N.el && // - In the case of a Fragment, we need to provide the actual parent
          // of the Fragment itself so it can move its children.
          (N.type === it || // - In the case of different nodes, there is going to be a replacement
          // which also requires the correct parent container
          !Zr(N, y) || // - In the case of a component, it could contain anything.
          N.shapeFlag & 70) ? h(N.el) : (
            // In other cases, the parent container is not actually used so we
            // just pass the block element here to avoid a DOM parentNode call.
            m
          )
        );
        F(
          N,
          y,
          C,
          null,
          v,
          g,
          w,
          S,
          !0
        );
      }
    }, We = (c, f, m, v, g, w, S) => {
      if (m !== v) {
        if (m !== Z)
          for (const E in m)
            !Us(E) && !(E in v) && i(
              c,
              E,
              m[E],
              null,
              S,
              f.children,
              g,
              w,
              gt
            );
        for (const E in v) {
          if (Us(E))
            continue;
          const N = v[E], y = m[E];
          N !== y && E !== "value" && i(
            c,
            E,
            y,
            N,
            S,
            f.children,
            g,
            w,
            gt
          );
        }
        "value" in v && i(c, "value", m.value, v.value);
      }
    }, Ms = (c, f, m, v, g, w, S, E, N) => {
      const y = f.el = c ? c.el : a(""), C = f.anchor = c ? c.anchor : a("");
      let { patchFlag: M, dynamicChildren: P, slotScopeIds: I } = f;
      process.env.NODE_ENV !== "production" && // #5523 dev root fragment may inherit directives
      (ir || M & 2048) && (M = 0, N = !1, P = null), I && (E = E ? E.concat(I) : I), c == null ? (n(y, m, v), n(C, m, v), ke(
        f.children,
        m,
        C,
        g,
        w,
        S,
        E,
        N
      )) : M > 0 && M & 64 && P && // #2715 the previous fragment could've been a BAILed one as a result
      // of renderSlot() with no valid children
      c.dynamicChildren ? (kt(
        c.dynamicChildren,
        P,
        m,
        g,
        w,
        S,
        E
      ), process.env.NODE_ENV !== "production" ? Bs(c, f) : (
        // #2080 if the stable fragment has a key, it's a <template v-for> that may
        //  get moved around. Make sure all root level vnodes inherit el.
        // #2134 or if it's a component root, it may also get moved around
        // as the component is being moved.
        (f.key != null || g && f === g.subTree) && Bs(
          c,
          f,
          !0
          /* shallow */
        )
      )) : rt(
        c,
        f,
        m,
        C,
        g,
        w,
        S,
        E,
        N
      );
    }, Ji = (c, f, m, v, g, w, S, E, N) => {
      f.slotScopeIds = E, c == null ? f.shapeFlag & 512 ? g.ctx.activate(
        f,
        m,
        v,
        S,
        N
      ) : Pt(
        f,
        m,
        v,
        g,
        w,
        S,
        N
      ) : Se(c, f, N);
    }, Pt = (c, f, m, v, g, w, S) => {
      const E = c.component = Dp(
        c,
        v,
        g
      );
      if (process.env.NODE_ENV !== "production" && E.type.__hmrId && ih(E), process.env.NODE_ENV !== "production" && (Hs(c), bt(E, "mount")), _i(c) && (E.ctx.renderer = yr), process.env.NODE_ENV !== "production" && bt(E, "init"), Mp(E), process.env.NODE_ENV !== "production" && Et(E, "init"), E.asyncDep) {
        if (g && g.registerDep(E, j), !c.el) {
          const N = E.subTree = Re(qe);
          fe(null, N, f, m);
        }
        return;
      }
      j(
        E,
        c,
        f,
        m,
        g,
        w,
        S
      ), process.env.NODE_ENV !== "production" && (Ls(), Et(E, "mount"));
    }, Se = (c, f, m) => {
      const v = f.component = c.component;
      if (Nh(c, f, m))
        if (v.asyncDep && !v.asyncResolved) {
          process.env.NODE_ENV !== "production" && Hs(f), z(v, f, m), process.env.NODE_ENV !== "production" && Ls();
          return;
        } else
          v.next = f, nh(v.update), v.update();
      else
        f.el = c.el, v.vnode = f;
    }, j = (c, f, m, v, g, w, S) => {
      const E = () => {
        if (c.isMounted) {
          let { next: C, bu: M, u: P, parent: I, vnode: L } = c, ee = C, Q;
          process.env.NODE_ENV !== "production" && Hs(C || c.vnode), Zt(c, !1), C ? (C.el = L.el, z(c, C, S)) : C = L, M && qr(M), (Q = C.props && C.props.onVnodeBeforeUpdate) && nt(Q, I, C, L), Zt(c, !0), process.env.NODE_ENV !== "production" && bt(c, "render");
          const ce = no(c);
          process.env.NODE_ENV !== "production" && Et(c, "render");
          const De = c.subTree;
          c.subTree = ce, process.env.NODE_ENV !== "production" && bt(c, "patch"), F(
            De,
            ce,
            // parent may have changed if it's in a teleport
            h(De.el),
            // anchor may have changed if it's in a fragment
            Cs(De),
            c,
            g,
            w
          ), process.env.NODE_ENV !== "production" && Et(c, "patch"), C.el = ce.el, ee === null && Sh(c, ce.el), P && $e(P, g), (Q = C.props && C.props.onVnodeUpdated) && $e(
            () => nt(Q, I, C, L),
            g
          ), process.env.NODE_ENV !== "production" && yu(c), process.env.NODE_ENV !== "production" && Ls();
        } else {
          let C;
          const { el: M, props: P } = f, { bm: I, m: L, parent: ee } = c, Q = js(f);
          if (Zt(c, !1), I && qr(I), !Q && (C = P && P.onVnodeBeforeMount) && nt(C, ee, f), Zt(c, !0), M && Gn) {
            const ce = () => {
              process.env.NODE_ENV !== "production" && bt(c, "render"), c.subTree = no(c), process.env.NODE_ENV !== "production" && Et(c, "render"), process.env.NODE_ENV !== "production" && bt(c, "hydrate"), Gn(
                M,
                c.subTree,
                c,
                g,
                null
              ), process.env.NODE_ENV !== "production" && Et(c, "hydrate");
            };
            Q ? f.type.__asyncLoader().then(
              // note: we are moving the render call into an async callback,
              // which means it won't track dependencies - but it's ok because
              // a server-rendered async wrapper is already in resolved state
              // and it will never need to change.
              () => !c.isUnmounted && ce()
            ) : ce();
          } else {
            process.env.NODE_ENV !== "production" && bt(c, "render");
            const ce = c.subTree = no(c);
            if (c && c.parent && !(c.parent.type.__asyncLoader && c.parent.isCE)) {
              const De = c.isCEChild && c.type.styles || null;
              c.addCEChildStyle && De && c.addCEChildStyle(De, c);
            }
            process.env.NODE_ENV !== "production" && Et(c, "render"), process.env.NODE_ENV !== "production" && bt(c, "patch"), F(
              null,
              ce,
              m,
              v,
              c,
              g,
              w
            ), process.env.NODE_ENV !== "production" && Et(c, "patch"), f.el = ce.el;
          }
          if (L && $e(L, g), !Q && (C = P && P.onVnodeMounted)) {
            const ce = f;
            $e(
              () => nt(C, ee, ce),
              g
            );
          }
          (f.shapeFlag & 256 || ee && js(ee.vnode) && ee.vnode.shapeFlag & 256) && c.a && $e(c.a, g), c.isMounted = !0, process.env.NODE_ENV !== "production" && fh(c), f = m = v = null;
        }
      }, N = c.effect = new li(
        E,
        () => Dn(y),
        c.scope
        // track it in component's effect scope
      ), y = c.update = () => N.run();
      y.id = c.uid, Zt(c, !0), process.env.NODE_ENV !== "production" && (N.onTrack = c.rtc ? (C) => qr(c.rtc, C) : void 0, N.onTrigger = c.rtg ? (C) => qr(c.rtg, C) : void 0, y.ownerInstance = c), y();
    }, z = (c, f, m) => {
      f.component = c;
      const v = c.vnode.props;
      c.vnode = f, c.next = null, sp(c, f.props, v, m), dp(c, f.children, m), pr(), ql(), mr();
    }, rt = (c, f, m, v, g, w, S, E, N = !1) => {
      const y = c && c.children, C = c ? c.shapeFlag : 0, M = f.children, { patchFlag: P, shapeFlag: I } = f;
      if (P > 0) {
        if (P & 128) {
          Br(
            y,
            M,
            m,
            v,
            g,
            w,
            S,
            E,
            N
          );
          return;
        } else if (P & 256) {
          jn(
            y,
            M,
            m,
            v,
            g,
            w,
            S,
            E,
            N
          );
          return;
        }
      }
      I & 8 ? (C & 16 && gt(y, g, w), M !== y && p(m, M)) : C & 16 ? I & 16 ? Br(
        y,
        M,
        m,
        v,
        g,
        w,
        S,
        E,
        N
      ) : gt(y, g, w, !0) : (C & 8 && p(m, ""), I & 16 && ke(
        M,
        m,
        v,
        g,
        w,
        S,
        E,
        N
      ));
    }, jn = (c, f, m, v, g, w, S, E, N) => {
      c = c || Cr, f = f || Cr;
      const y = c.length, C = f.length, M = Math.min(y, C);
      let P;
      for (P = 0; P < M; P++) {
        const I = f[P] = N ? Yt(f[P]) : ze(f[P]);
        F(
          c[P],
          I,
          m,
          null,
          g,
          w,
          S,
          E,
          N
        );
      }
      y > C ? gt(
        c,
        g,
        w,
        !0,
        !1,
        M
      ) : ke(
        f,
        m,
        v,
        g,
        w,
        S,
        E,
        N,
        M
      );
    }, Br = (c, f, m, v, g, w, S, E, N) => {
      let y = 0;
      const C = f.length;
      let M = c.length - 1, P = C - 1;
      for (; y <= M && y <= P; ) {
        const I = c[y], L = f[y] = N ? Yt(f[y]) : ze(f[y]);
        if (Zr(I, L))
          F(
            I,
            L,
            m,
            null,
            g,
            w,
            S,
            E,
            N
          );
        else
          break;
        y++;
      }
      for (; y <= M && y <= P; ) {
        const I = c[M], L = f[P] = N ? Yt(f[P]) : ze(f[P]);
        if (Zr(I, L))
          F(
            I,
            L,
            m,
            null,
            g,
            w,
            S,
            E,
            N
          );
        else
          break;
        M--, P--;
      }
      if (y > M) {
        if (y <= P) {
          const I = P + 1, L = I < C ? f[I].el : v;
          for (; y <= P; )
            F(
              null,
              f[y] = N ? Yt(f[y]) : ze(f[y]),
              m,
              L,
              g,
              w,
              S,
              E,
              N
            ), y++;
        }
      } else if (y > P)
        for (; y <= M; )
          Tt(c[y], g, w, !0), y++;
      else {
        const I = y, L = y, ee = /* @__PURE__ */ new Map();
        for (y = L; y <= P; y++) {
          const we = f[y] = N ? Yt(f[y]) : ze(f[y]);
          we.key != null && (process.env.NODE_ENV !== "production" && ee.has(we.key) && O(
            "Duplicate keys found during update:",
            JSON.stringify(we.key),
            "Make sure keys are unique."
          ), ee.set(we.key, y));
        }
        let Q, ce = 0;
        const De = P - L + 1;
        let br = !1, Qi = 0;
        const Gr = new Array(De);
        for (y = 0; y < De; y++)
          Gr[y] = 0;
        for (y = I; y <= M; y++) {
          const we = c[y];
          if (ce >= De) {
            Tt(we, g, w, !0);
            continue;
          }
          let st;
          if (we.key != null)
            st = ee.get(we.key);
          else
            for (Q = L; Q <= P; Q++)
              if (Gr[Q - L] === 0 && Zr(we, f[Q])) {
                st = Q;
                break;
              }
          st === void 0 ? Tt(we, g, w, !0) : (Gr[st - L] = y + 1, st >= Qi ? Qi = st : br = !0, F(
            we,
            f[st],
            m,
            null,
            g,
            w,
            S,
            E,
            N
          ), ce++);
        }
        const Xi = br ? _p(Gr) : Cr;
        for (Q = Xi.length - 1, y = De - 1; y >= 0; y--) {
          const we = L + y, st = f[we], el = we + 1 < C ? f[we + 1].el : v;
          Gr[y] === 0 ? F(
            null,
            st,
            m,
            el,
            g,
            w,
            S,
            E,
            N
          ) : br && (Q < 0 || y !== Xi[Q] ? gr(st, m, el, 2) : Q--);
        }
      }
    }, gr = (c, f, m, v, g = null) => {
      const { el: w, type: S, transition: E, children: N, shapeFlag: y } = c;
      if (y & 6) {
        gr(c.component.subTree, f, m, v);
        return;
      }
      if (y & 128) {
        c.suspense.move(f, m, v);
        return;
      }
      if (y & 64) {
        S.move(c, f, m, yr);
        return;
      }
      if (S === it) {
        n(w, f, m);
        for (let M = 0; M < N.length; M++)
          gr(N[M], f, m, v);
        n(c.anchor, f, m);
        return;
      }
      if (S === Gs) {
        et(c, f, m);
        return;
      }
      if (v !== 2 && y & 1 && E)
        if (v === 0)
          E.beforeEnter(w), n(w, f, m), $e(() => E.enter(w), g);
        else {
          const { leave: M, delayLeave: P, afterLeave: I } = E, L = () => n(w, f, m), ee = () => {
            M(w, () => {
              L(), I && I();
            });
          };
          P ? P(w, L, ee) : ee();
        }
      else
        n(w, f, m);
    }, Tt = (c, f, m, v = !1, g = !1) => {
      const {
        type: w,
        props: S,
        ref: E,
        children: N,
        dynamicChildren: y,
        shapeFlag: C,
        patchFlag: M,
        dirs: P
      } = c;
      if (E != null && Io(E, null, m, c, !0), C & 256) {
        f.ctx.deactivate(c);
        return;
      }
      const I = C & 1 && P, L = !js(c);
      let ee;
      if (L && (ee = S && S.onVnodeBeforeUnmount) && nt(ee, f, c), C & 6)
        c.component.isCEChild && c.component.removeCEChildStyle && c.component.removeCEChildStyle(
          c.component.type.styles,
          c.component.uid
        ), Fc(c.component, m, v);
      else {
        if (C & 128) {
          c.suspense.unmount(m, v);
          return;
        }
        I && Jt(c, null, f, "beforeUnmount"), C & 64 ? c.type.remove(
          c,
          f,
          m,
          g,
          yr,
          v
        ) : y && // #1153: fast path should not be taken for non-stable (v-for) fragments
        (w !== it || M > 0 && M & 64) ? gt(
          y,
          f,
          m,
          !1,
          !0
        ) : (w === it && M & 384 || !g && C & 16) && gt(N, f, m), v && zn(c);
      }
      (L && (ee = S && S.onVnodeUnmounted) || I) && $e(() => {
        ee && nt(ee, f, c), I && Jt(c, null, f, "unmounted");
      }, m);
    }, zn = (c) => {
      const { type: f, el: m, anchor: v, transition: g } = c;
      if (f === it) {
        process.env.NODE_ENV !== "production" && c.patchFlag > 0 && c.patchFlag & 2048 && g && !g.persisted ? c.children.forEach((S) => {
          S.type === qe ? o(S.el) : zn(S);
        }) : Yc(m, v);
        return;
      }
      if (f === Gs) {
        V(c);
        return;
      }
      const w = () => {
        o(m), g && !g.persisted && g.afterLeave && g.afterLeave();
      };
      if (c.shapeFlag & 1 && g && !g.persisted) {
        const { leave: S, delayLeave: E } = g, N = () => S(m, w);
        E ? E(c.el, w, N) : N();
      } else
        w();
    }, Yc = (c, f) => {
      let m;
      for (; c !== f; )
        m = _(c), o(c), c = m;
      o(f);
    }, Fc = (c, f, m) => {
      process.env.NODE_ENV !== "production" && c.type.__hmrId && lh(c);
      const { bum: v, scope: g, update: w, subTree: S, um: E } = c;
      v && qr(v), g.stop(), w && (w.active = !1, Tt(S, c, f, m)), E && $e(E, f), $e(() => {
        c.isUnmounted = !0;
      }, f), f && f.pendingBranch && !f.isUnmounted && c.asyncDep && !c.asyncResolved && c.suspenseId === f.pendingId && (f.deps--, f.deps === 0 && f.resolve()), process.env.NODE_ENV !== "production" && ph(c);
    }, gt = (c, f, m, v = !1, g = !1, w = 0) => {
      for (let S = w; S < c.length; S++)
        Tt(c[S], f, m, v, g);
    }, Cs = (c) => c.shapeFlag & 6 ? Cs(c.component.subTree) : c.shapeFlag & 128 ? c.suspense.next() : _(c.anchor || c.el), Zi = (c, f, m) => {
      c == null ? f._vnode && Tt(f._vnode, null, null, !0) : F(f._vnode || null, c, f, null, null, null, m), ql(), mu(), f._vnode = c;
    }, yr = {
      p: F,
      um: Tt,
      m: gr,
      r: zn,
      mt: Pt,
      mc: ke,
      pc: rt,
      pbc: kt,
      n: Cs,
      o: t
    };
    let Bn, Gn;
    return r && ([Bn, Gn] = r(
      yr
    )), {
      render: Zi,
      hydrate: Bn,
      createApp: Xh(Zi, Bn)
    };
  }
  function Zt({ effect: t, update: r }, s) {
    t.allowRecurse = r.allowRecurse = s;
  }
  function mp(t, r) {
    return (!t || t && !t.pendingBranch) && r && !r.persisted;
  }
  function Bs(t, r, s = !1) {
    const n = t.children, o = r.children;
    if (T(n) && T(o))
      for (let i = 0; i < n.length; i++) {
        const l = n[i];
        let a = o[i];
        a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = o[i] = Yt(o[i]), a.el = l.el), s || Bs(l, a)), a.type === Os && (a.el = l.el), process.env.NODE_ENV !== "production" && a.type === qe && !a.el && (a.el = l.el);
      }
  }
  function _p(t) {
    const r = t.slice(), s = [0];
    let n, o, i, l, a;
    const u = t.length;
    for (n = 0; n < u; n++) {
      const d = t[n];
      if (d !== 0) {
        if (o = s[s.length - 1], t[o] < d) {
          r[n] = o, s.push(n);
          continue;
        }
        for (i = 0, l = s.length - 1; i < l; )
          a = i + l >> 1, t[s[a]] < d ? i = a + 1 : l = a;
        d < t[s[i]] && (i > 0 && (r[n] = s[i - 1]), s[i] = n);
      }
    }
    for (i = s.length, l = s[i - 1]; i-- > 0; )
      s[i] = l, l = r[l];
    return s;
  }
  const vp = (t) => t.__isTeleport, it = Symbol.for("v-fgt"), Os = Symbol.for("v-txt"), qe = Symbol.for("v-cmt"), Gs = Symbol.for("v-stc"), os = [];
  let Be = null;
  function Ro(t = !1) {
    os.push(Be = t ? null : []);
  }
  function gp() {
    os.pop(), Be = os[os.length - 1] || null;
  }
  let _s = 1;
  function ua(t) {
    _s += t;
  }
  function yp(t) {
    return t.dynamicChildren = _s > 0 ? Be || Cr : null, gp(), _s > 0 && Be && Be.push(t), t;
  }
  function Yo(t, r, s, n, o, i) {
    return yp(
      _r(
        t,
        r,
        s,
        n,
        o,
        i,
        !0
        /* isBlock */
      )
    );
  }
  function bi(t) {
    return t ? t.__v_isVNode === !0 : !1;
  }
  function Zr(t, r) {
    return process.env.NODE_ENV !== "production" && r.shapeFlag & 6 && Nr.has(r.type) ? (t.shapeFlag &= -257, r.shapeFlag &= -513, !1) : t.type === r.type && t.key === r.key;
  }
  const bp = (...t) => Fu(
    ...t
  ), Cn = "__vInternal", Yu = ({ key: t }) => t ?? null, Ks = ({
    ref: t,
    ref_key: r,
    ref_for: s
  }) => (typeof t == "number" && (t = "" + t), t != null ? de(t) || pe(t) || A(t) ? { i: Ce, r: t, k: r, f: !!s } : t : null);
  function _r(t, r = null, s = null, n = 0, o = null, i = t === it ? 0 : 1, l = !1, a = !1) {
    const u = {
      __v_isVNode: !0,
      __v_skip: !0,
      type: t,
      props: r,
      key: r && Yu(r),
      ref: r && Ks(r),
      scopeId: xn,
      slotScopeIds: null,
      children: s,
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
      shapeFlag: i,
      patchFlag: n,
      dynamicProps: o,
      dynamicChildren: null,
      appContext: null,
      ctx: Ce
    };
    return a ? (Ei(u, s), i & 128 && t.normalize(u)) : s && (u.shapeFlag |= de(s) ? 8 : 16), process.env.NODE_ENV !== "production" && u.key !== u.key && O("VNode created with invalid key (NaN). VNode type:", u.type), _s > 0 && // avoid a block node from tracking itself
    !l && // has current parent block
    Be && // presence of a patch flag indicates this node needs patching on updates.
    // component nodes also should always be patched, because even if the
    // component doesn't need to update, it needs to persist the instance on to
    // the next vnode so that it can be properly unmounted later.
    (u.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
    // vnode should not be considered dynamic due to handler caching.
    u.patchFlag !== 32 && Be.push(u), u;
  }
  const Re = process.env.NODE_ENV !== "production" ? bp : Fu;
  function Fu(t, r = null, s = null, n = 0, o = null, i = !1) {
    if ((!t || t === Dh) && (process.env.NODE_ENV !== "production" && !t && O(`Invalid vnode type when creating vnode: ${t}.`), t = qe), bi(t)) {
      const a = Gt(
        t,
        r,
        !0
        /* mergeRef: true */
      );
      return s && Ei(a, s), _s > 0 && !i && Be && (a.shapeFlag & 6 ? Be[Be.indexOf(t)] = a : Be.push(a)), a.patchFlag |= -2, a;
    }
    if (Wu(t) && (t = t.__vccOpts), r) {
      r = Ep(r);
      let { class: a, style: u } = r;
      a && !de(a) && (r.class = ii(a)), re(u) && (Do(u) && !T(u) && (u = ie({}, u)), r.style = oi(u));
    }
    const l = de(t) ? 1 : xh(t) ? 128 : vp(t) ? 64 : re(t) ? 4 : A(t) ? 2 : 0;
    return process.env.NODE_ENV !== "production" && l & 4 && Do(t) && (t = Y(t), O(
      "Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
      `
Component that was made reactive: `,
      t
    )), _r(
      t,
      r,
      s,
      n,
      o,
      l,
      i,
      !0
    );
  }
  function Ep(t) {
    return t ? Do(t) || Cn in t ? ie({}, t) : t : null;
  }
  function Gt(t, r, s = !1) {
    const { props: n, ref: o, patchFlag: i, children: l } = t, a = r ? Op(n || {}, r) : n;
    return {
      __v_isVNode: !0,
      __v_skip: !0,
      type: t.type,
      props: a,
      key: a && Yu(a),
      ref: r && r.ref ? (
        // #2078 in the case of <component :is="vnode" ref="extra"/>
        // if the vnode itself already has a ref, cloneVNode will need to merge
        // the refs so the single vnode can be set on multiple refs
        s && o ? T(o) ? o.concat(Ks(r)) : [o, Ks(r)] : Ks(r)
      ) : o,
      scopeId: t.scopeId,
      slotScopeIds: t.slotScopeIds,
      children: process.env.NODE_ENV !== "production" && i === -1 && T(l) ? l.map(Uu) : l,
      target: t.target,
      targetAnchor: t.targetAnchor,
      staticCount: t.staticCount,
      shapeFlag: t.shapeFlag,
      // if the vnode is cloned with extra props, we can no longer assume its
      // existing patch flag to be reliable and need to add the FULL_PROPS flag.
      // note: preserve flag for fragments since they use the flag for children
      // fast paths only.
      patchFlag: r && t.type !== it ? i === -1 ? 16 : i | 16 : i,
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
      ssContent: t.ssContent && Gt(t.ssContent),
      ssFallback: t.ssFallback && Gt(t.ssFallback),
      el: t.el,
      anchor: t.anchor,
      ctx: t.ctx,
      ce: t.ce
    };
  }
  function Uu(t) {
    const r = Gt(t);
    return T(t.children) && (r.children = t.children.map(Uu)), r;
  }
  function wp(t = " ", r = 0) {
    return Re(Os, null, t, r);
  }
  function ze(t) {
    return t == null || typeof t == "boolean" ? Re(qe) : T(t) ? Re(
      it,
      null,
      // #3666, avoid reference pollution when reusing vnode
      t.slice()
    ) : typeof t == "object" ? Yt(t) : Re(Os, null, String(t));
  }
  function Yt(t) {
    return t.el === null && t.patchFlag !== -1 || t.memo ? t : Gt(t);
  }
  function Ei(t, r) {
    let s = 0;
    const { shapeFlag: n } = t;
    if (r == null)
      r = null;
    else if (T(r))
      s = 16;
    else if (typeof r == "object")
      if (n & 65) {
        const o = r.default;
        o && (o._c && (o._d = !1), Ei(t, o()), o._c && (o._d = !0));
        return;
      } else {
        s = 32;
        const o = r._;
        !o && !(Cn in r) ? r._ctx = Ce : o === 3 && Ce && (Ce.slots._ === 1 ? r._ = 1 : (r._ = 2, t.patchFlag |= 1024));
      }
    else
      A(r) ? (r = { default: r, _ctx: Ce }, s = 32) : (r = String(r), n & 64 ? (s = 16, r = [wp(r)]) : s = 8);
    t.children = r, t.shapeFlag |= s;
  }
  function Op(...t) {
    const r = {};
    for (let s = 0; s < t.length; s++) {
      const n = t[s];
      for (const o in n)
        if (o === "class")
          r.class !== n.class && (r.class = ii([r.class, n.class]));
        else if (o === "style")
          r.style = oi([r.style, n.style]);
        else if (Wr(o)) {
          const i = r[o], l = n[o];
          l && i !== l && !(T(i) && i.includes(l)) && (r[o] = i ? [].concat(i, l) : l);
        } else
          o !== "" && (r[o] = n[o]);
    }
    return r;
  }
  function nt(t, r, s, n = null) {
    Ke(t, r, 7, [
      s,
      n
    ]);
  }
  const Np = ku();
  let Sp = 0;
  function Dp(t, r, s) {
    const n = t.type, o = (r ? r.appContext : t.appContext) || Np, i = {
      isCEChild: r && (r.isCE || r.isCEChild),
      addCEChildStyle: r && r.addCEChildStyle ? r.addCEChildStyle : null,
      removeCEChildStyle: r && r.removeCEChildStyle ? r.removeCEChildStyle : null,
      cecStyleIds: null,
      uid: Sp++,
      vnode: t,
      type: n,
      parent: r,
      appContext: o,
      root: null,
      // to be immediately set
      next: null,
      subTree: null,
      // will be set synchronously right after creation
      effect: null,
      update: null,
      // will be set synchronously right after creation
      scope: new bf(
        !0
        /* detached */
      ),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: r ? r.provides : Object.create(o.provides),
      accessCache: null,
      renderCache: [],
      // local resolved assets
      components: null,
      directives: null,
      // resolved props and emits options
      propsOptions: Tu(n, o),
      emitsOptions: wu(n, o),
      // emit
      emit: null,
      // to be set immediately
      emitted: null,
      // props default value
      propsDefaults: Z,
      // inheritAttrs
      inheritAttrs: n.inheritAttrs,
      // state
      ctx: Z,
      data: Z,
      props: Z,
      attrs: Z,
      slots: Z,
      refs: Z,
      setupState: Z,
      setupContext: null,
      attrsProxy: null,
      slotsProxy: null,
      // suspense related
      suspense: s,
      suspenseId: s ? s.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      // lifecycle hooks
      // not using enums here because it results in computed properties
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null
    };
    return process.env.NODE_ENV !== "production" ? i.ctx = Wh(i) : i.ctx = { _: i }, i.root = r ? r.root : i, i.emit = Eu.bind(null, i), t.ce && t.ce(i), i;
  }
  let he = null;
  const $p = () => he || Ce;
  let wi, Er, ca = "__VUE_INSTANCE_SETTERS__";
  (Er = rn()[ca]) || (Er = rn()[ca] = []), Er.push((t) => he = t), wi = (t) => {
    Er.length > 1 ? Er.forEach((r) => r(t)) : Er[0](t);
  };
  const Ur = (t) => {
    wi(t), t.scope.on();
  }, ar = () => {
    he && he.scope.off(), wi(null);
  }, xp = /* @__PURE__ */ Lr("slot,component");
  function Fo(t, r) {
    const s = r.isNativeTag || za;
    (xp(t) || s(t)) && O(
      "Do not use built-in or reserved HTML elements as component id: " + t
    );
  }
  function Hu(t) {
    return t.vnode.shapeFlag & 4;
  }
  let vs = !1;
  function Mp(t, r = !1) {
    vs = r;
    const { props: s, children: n } = t.vnode, o = Hu(t);
    tp(t, s, o, r), cp(t, n);
    const i = o ? Cp(t, r) : void 0;
    return vs = !1, i;
  }
  function Cp(t, r) {
    var s;
    const n = t.type;
    if (process.env.NODE_ENV !== "production") {
      if (n.name && Fo(n.name, t.appContext.config), n.components) {
        const i = Object.keys(n.components);
        for (let l = 0; l < i.length; l++)
          Fo(i[l], t.appContext.config);
      }
      if (n.directives) {
        const i = Object.keys(n.directives);
        for (let l = 0; l < i.length; l++)
          Du(i[l]);
      }
      n.compilerOptions && kp() && O(
        '"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.'
      );
    }
    t.accessCache = /* @__PURE__ */ Object.create(null), t.proxy = iu(new Proxy(t.ctx, Mu)), process.env.NODE_ENV !== "production" && jh(t);
    const { setup: o } = n;
    if (o) {
      const i = t.setupContext = o.length > 1 ? Tp(t) : null;
      Ur(t), pr();
      const l = St(
        o,
        t,
        0,
        [process.env.NODE_ENV !== "production" ? ts(t.props) : t.props, i]
      );
      if (mr(), ar(), ri(l)) {
        if (l.then(ar, ar), r)
          return l.then((a) => {
            da(t, a, r);
          }).catch((a) => {
            Sn(a, t, 0);
          });
        if (t.asyncDep = l, process.env.NODE_ENV !== "production" && !t.suspense) {
          const a = (s = n.name) != null ? s : "Anonymous";
          O(
            `Component <${a}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`
          );
        }
      } else
        da(t, l, r);
    } else
      Lu(t, r);
  }
  function da(t, r, s) {
    A(r) ? t.type.__ssrInlineRender ? t.ssrRender = r : t.render = r : re(r) ? (process.env.NODE_ENV !== "production" && bi(r) && O(
      "setup() should not return VNodes directly - return a render function instead."
    ), process.env.NODE_ENV !== "production" && (t.devtoolsRawSetupState = r), t.setupState = uu(r), process.env.NODE_ENV !== "production" && zh(t)) : process.env.NODE_ENV !== "production" && r !== void 0 && O(
      `setup() should return an object. Received: ${r === null ? "null" : typeof r}`
    ), Lu(t, s);
  }
  let Uo;
  const kp = () => !Uo;
  function Lu(t, r, s) {
    const n = t.type;
    if (!t.render) {
      if (!r && Uo && !n.render) {
        const o = n.template || gi(t).template;
        if (o) {
          process.env.NODE_ENV !== "production" && bt(t, "compile");
          const { isCustomElement: i, compilerOptions: l } = t.appContext.config, { delimiters: a, compilerOptions: u } = n, d = ie(
            ie(
              {
                isCustomElement: i,
                delimiters: a
              },
              l
            ),
            u
          );
          n.render = Uo(o, d), process.env.NODE_ENV !== "production" && Et(t, "compile");
        }
      }
      t.render = n.render || _e;
    }
    {
      Ur(t), pr();
      try {
        Gh(t);
      } finally {
        mr(), ar();
      }
    }
    process.env.NODE_ENV !== "production" && !n.render && t.render === _e && !r && (n.template ? O(
      'Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".'
      /* should not happen */
    ) : O("Component is missing template or render function."));
  }
  function fa(t) {
    return t.attrsProxy || (t.attrsProxy = new Proxy(
      t.attrs,
      process.env.NODE_ENV !== "production" ? {
        get(r, s) {
          return on(), ve(t, "get", "$attrs"), r[s];
        },
        set() {
          return O("setupContext.attrs is readonly."), !1;
        },
        deleteProperty() {
          return O("setupContext.attrs is readonly."), !1;
        }
      } : {
        get(r, s) {
          return ve(t, "get", "$attrs"), r[s];
        }
      }
    ));
  }
  function Pp(t) {
    return t.slotsProxy || (t.slotsProxy = new Proxy(t.slots, {
      get(r, s) {
        return ve(t, "get", "$slots"), r[s];
      }
    }));
  }
  function Tp(t) {
    const r = (s) => {
      if (process.env.NODE_ENV !== "production" && (t.exposed && O("expose() should be called only once per setup()."), s != null)) {
        let n = typeof s;
        n === "object" && (T(s) ? n = "array" : pe(s) && (n = "ref")), n !== "object" && O(
          `expose() should be passed a plain object, received ${n}.`
        );
      }
      t.exposed = s || {};
    };
    return process.env.NODE_ENV !== "production" ? Object.freeze({
      get attrs() {
        return fa(t);
      },
      get slots() {
        return Pp(t);
      },
      get emit() {
        return (s, ...n) => t.emit(s, ...n);
      },
      expose: r
    }) : {
      get attrs() {
        return fa(t);
      },
      slots: t.slots,
      emit: t.emit,
      expose: r
    };
  }
  function Oi(t) {
    if (t.exposed)
      return t.exposeProxy || (t.exposeProxy = new Proxy(uu(iu(t.exposed)), {
        get(r, s) {
          if (s in r)
            return r[s];
          if (s in lr)
            return lr[s](t);
        },
        has(r, s) {
          return s in r || s in lr;
        }
      }));
  }
  const Ap = /(?:^|[-_])(\w)/g, Vp = (t) => t.replace(Ap, (r) => r.toUpperCase()).replace(/[-_]/g, "");
  function Ni(t, r = !0) {
    return A(t) ? t.displayName || t.name : t.name || r && t.__name;
  }
  function kn(t, r, s = !1) {
    let n = Ni(r);
    if (!n && r.__file) {
      const o = r.__file.match(/([^/\\]+)\.\w+$/);
      o && (n = o[1]);
    }
    if (!n && t && t.parent) {
      const o = (i) => {
        for (const l in i)
          if (i[l] === r)
            return l;
      };
      n = o(
        t.components || t.parent.type.components
      ) || o(t.appContext.components);
    }
    return n ? Vp(n) : s ? "App" : "Anonymous";
  }
  function Wu(t) {
    return A(t) && "__vccOpts" in t;
  }
  const Ip = (t, r) => Jf(t, r, vs), Rp = Symbol.for("v-scx"), Yp = () => {
    {
      const t = zs(Rp);
      return t || process.env.NODE_ENV !== "production" && O(
        "Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."
      ), t;
    }
  };
  function lo(t) {
    return !!(t && t.__v_isShallow);
  }
  function Fp() {
    if (process.env.NODE_ENV === "production" || typeof window > "u")
      return;
    const t = { style: "color:#3ba776" }, r = { style: "color:#0b1bc9" }, s = { style: "color:#b62e24" }, n = { style: "color:#9d288c" }, o = {
      header(h) {
        return re(h) ? h.__isVue ? ["div", t, "VueInstance"] : pe(h) ? [
          "div",
          {},
          ["span", t, p(h)],
          "<",
          a(h.value),
          ">"
        ] : nr(h) ? [
          "div",
          {},
          ["span", t, lo(h) ? "ShallowReactive" : "Reactive"],
          "<",
          a(h),
          `>${Bt(h) ? " (readonly)" : ""}`
        ] : Bt(h) ? [
          "div",
          {},
          ["span", t, lo(h) ? "ShallowReadonly" : "Readonly"],
          "<",
          a(h),
          ">"
        ] : null : null;
      },
      hasBody(h) {
        return h && h.__isVue;
      },
      body(h) {
        if (h && h.__isVue)
          return [
            "div",
            {},
            ...i(h.$)
          ];
      }
    };
    function i(h) {
      const _ = [];
      h.type.props && h.props && _.push(l("props", Y(h.props))), h.setupState !== Z && _.push(l("setup", h.setupState)), h.data !== Z && _.push(l("data", Y(h.data)));
      const $ = u(h, "computed");
      $ && _.push(l("computed", $));
      const W = u(h, "inject");
      return W && _.push(l("injected", W)), _.push([
        "div",
        {},
        [
          "span",
          {
            style: n.style + ";opacity:0.66"
          },
          "$ (internal): "
        ],
        ["object", { object: h }]
      ]), _;
    }
    function l(h, _) {
      return _ = ie({}, _), Object.keys(_).length ? [
        "div",
        { style: "line-height:1.25em;margin-bottom:0.6em" },
        [
          "div",
          {
            style: "color:#476582"
          },
          h
        ],
        [
          "div",
          {
            style: "padding-left:1.25em"
          },
          ...Object.keys(_).map(($) => [
            "div",
            {},
            ["span", n, $ + ": "],
            a(_[$], !1)
          ])
        ]
      ] : ["span", {}];
    }
    function a(h, _ = !0) {
      return typeof h == "number" ? ["span", r, h] : typeof h == "string" ? ["span", s, JSON.stringify(h)] : typeof h == "boolean" ? ["span", n, h] : re(h) ? ["object", { object: _ ? Y(h) : h }] : ["span", s, String(h)];
    }
    function u(h, _) {
      const $ = h.type;
      if (A($))
        return;
      const W = {};
      for (const F in h.ctx)
        d($, F, _) && (W[F] = h.ctx[F]);
      return W;
    }
    function d(h, _, $) {
      const W = h[$];
      if (T(W) && W.includes(_) || re(W) && _ in W || h.extends && d(h.extends, _, $) || h.mixins && h.mixins.some((F) => d(F, _, $)))
        return !0;
    }
    function p(h) {
      return lo(h) ? "ShallowRef" : h.effect ? "ComputedRef" : "Ref";
    }
    window.devtoolsFormatters ? window.devtoolsFormatters.push(o) : window.devtoolsFormatters = [o];
  }
  const ha = "3.3.9", Vt = /* @__PURE__ */ new Map(), Up = "http://www.w3.org/2000/svg", Xt = typeof document < "u" ? document : null, pa = Xt && /* @__PURE__ */ Xt.createElement("template"), Hp = {
    insert: (t, r, s) => {
      r.insertBefore(t, s || null);
    },
    remove: (t) => {
      const r = t.parentNode;
      r && r.removeChild(t);
    },
    createElement: (t, r, s, n) => {
      const o = r ? Xt.createElementNS(Up, t) : Xt.createElement(t, s ? { is: s } : void 0);
      return t === "select" && n && n.multiple != null && o.setAttribute("multiple", n.multiple), o;
    },
    createText: (t) => Xt.createTextNode(t),
    createComment: (t) => Xt.createComment(t),
    setText: (t, r) => {
      t.nodeValue = r;
    },
    setElementText: (t, r) => {
      t.textContent = r;
    },
    parentNode: (t) => t.parentNode,
    nextSibling: (t) => t.nextSibling,
    querySelector: (t) => Xt.querySelector(t),
    setScopeId(t, r) {
      t.setAttribute(r, "");
    },
    // __UNSAFE__
    // Reason: innerHTML.
    // Static content here can only come from compiled templates.
    // As long as the user only uses trusted templates, this is safe.
    insertStaticContent(t, r, s, n, o, i) {
      const l = s ? s.previousSibling : r.lastChild;
      if (o && (o === i || o.nextSibling))
        for (; r.insertBefore(o.cloneNode(!0), s), !(o === i || !(o = o.nextSibling)); )
          ;
      else {
        pa.innerHTML = n ? `<svg>${t}</svg>` : t;
        const a = pa.content;
        if (n) {
          const u = a.firstChild;
          for (; u.firstChild; )
            a.appendChild(u.firstChild);
          a.removeChild(u);
        }
        r.insertBefore(a, s);
      }
      return [
        // first
        l ? l.nextSibling : r.firstChild,
        // last
        s ? s.previousSibling : r.lastChild
      ];
    }
  }, Lp = Symbol("_vtc");
  function Wp(t, r, s) {
    const n = t[Lp];
    n && (r = (r ? [r, ...n] : [...n]).join(" ")), r == null ? t.removeAttribute("class") : s ? t.setAttribute("class", r) : t.className = r;
  }
  const jp = Symbol("_vod");
  function zp(t, r, s) {
    const n = t.style, o = de(s);
    if (s && !o) {
      if (r && !de(r))
        for (const i in r)
          s[i] == null && Ho(n, i, "");
      for (const i in s)
        Ho(n, i, s[i]);
    } else {
      const i = n.display;
      o ? r !== s && (n.cssText = s) : r && t.removeAttribute("style"), jp in t && (n.display = i);
    }
  }
  const Bp = /[^\\];\s*$/, ma = /\s*!important$/;
  function Ho(t, r, s) {
    if (T(s))
      s.forEach((n) => Ho(t, r, n));
    else if (s == null && (s = ""), process.env.NODE_ENV !== "production" && Bp.test(s) && O(
      `Unexpected semicolon at the end of '${r}' style value: '${s}'`
    ), r.startsWith("--"))
      t.setProperty(r, s);
    else {
      const n = Gp(t, r);
      ma.test(s) ? t.setProperty(
        Te(n),
        s.replace(ma, ""),
        "important"
      ) : t[n] = s;
    }
  }
  const _a = ["Webkit", "Moz", "ms"], ao = {};
  function Gp(t, r) {
    const s = ao[r];
    if (s)
      return s;
    let n = Ae(r);
    if (n !== "filter" && n in t)
      return ao[r] = n;
    n = dr(n);
    for (let o = 0; o < _a.length; o++) {
      const i = _a[o] + n;
      if (i in t)
        return ao[r] = i;
    }
    return r;
  }
  const va = "http://www.w3.org/1999/xlink";
  function Kp(t, r, s, n, o) {
    if (n && r.startsWith("xlink:"))
      s == null ? t.removeAttributeNS(va, r.slice(6, r.length)) : t.setAttributeNS(va, r, s);
    else {
      const i = gf(r);
      s == null || i && !Ba(s) ? t.removeAttribute(r) : t.setAttribute(r, i ? "" : s);
    }
  }
  function qp(t, r, s, n, o, i, l) {
    if (r === "innerHTML" || r === "textContent") {
      n && l(n, o, i), t[r] = s ?? "";
      return;
    }
    const a = t.tagName;
    if (r === "value" && a !== "PROGRESS" && // custom elements may use _value internally
    !a.includes("-")) {
      t._value = s;
      const d = a === "OPTION" ? t.getAttribute("value") : t.value, p = s ?? "";
      d !== p && (t.value = p), s == null && t.removeAttribute(r);
      return;
    }
    let u = !1;
    if (s === "" || s == null) {
      const d = typeof t[r];
      d === "boolean" ? s = Ba(s) : s == null && d === "string" ? (s = "", u = !0) : d === "number" && (s = 0, u = !0);
    }
    try {
      t[r] = s;
    } catch (d) {
      process.env.NODE_ENV !== "production" && !u && O(
        `Failed setting prop "${r}" on <${a.toLowerCase()}>: value ${s} is invalid.`,
        d
      );
    }
    u && t.removeAttribute(r);
  }
  function Jp(t, r, s, n) {
    t.addEventListener(r, s, n);
  }
  function Zp(t, r, s, n) {
    t.removeEventListener(r, s, n);
  }
  const ga = Symbol("_vei");
  function Qp(t, r, s, n, o = null) {
    const i = t[ga] || (t[ga] = {}), l = i[r];
    if (n && l)
      l.value = n;
    else {
      const [a, u] = Xp(r);
      if (n) {
        const d = i[r] = rm(n, o);
        Jp(t, a, d, u);
      } else
        l && (Zp(t, a, l, u), i[r] = void 0);
    }
  }
  const ya = /(?:Once|Passive|Capture)$/;
  function Xp(t) {
    let r;
    if (ya.test(t)) {
      r = {};
      let n;
      for (; n = t.match(ya); )
        t = t.slice(0, t.length - n[0].length), r[n[0].toLowerCase()] = !0;
    }
    return [t[2] === ":" ? t.slice(3) : Te(t.slice(2)), r];
  }
  let uo = 0;
  const em = /* @__PURE__ */ Promise.resolve(), tm = () => uo || (em.then(() => uo = 0), uo = Date.now());
  function rm(t, r) {
    const s = (n) => {
      if (!n._vts)
        n._vts = Date.now();
      else if (n._vts <= s.attached)
        return;
      Ke(
        sm(n, s.value),
        r,
        5,
        [n]
      );
    };
    return s.value = t, s.attached = tm(), s;
  }
  function sm(t, r) {
    if (T(r)) {
      const s = t.stopImmediatePropagation;
      return t.stopImmediatePropagation = () => {
        s.call(t), t._stopped = !0;
      }, r.map((n) => (o) => !o._stopped && n && n(o));
    } else
      return r;
  }
  const ba = /^on[a-z]/, nm = (t, r, s, n, o = !1, i, l, a, u) => {
    r === "class" ? Wp(t, n, o) : r === "style" ? zp(t, s, n) : yf(t, r) ? t._VModelEmits[r] = n : Wr(r) ? (Fr(r) || Qp(t, r, s, n, l), Fr(r) && t._isCE && (t._VModelEmits[r] = n)) : (r[0] === "." ? (r = r.slice(1), !0) : r[0] === "^" ? (r = r.slice(1), !1) : om(t, r, n, o)) ? qp(
      t,
      r,
      n,
      i,
      l,
      a,
      u
    ) : (r === "true-value" ? t._trueValue = n : r === "false-value" && (t._falseValue = n), Kp(t, r, n, o));
  };
  function om(t, r, s, n) {
    return n ? !!(r === "innerHTML" || r === "textContent" || r in t && ba.test(r) && A(s)) : r === "spellcheck" || r === "draggable" || r === "translate" || r === "form" || r === "list" && t.tagName === "INPUT" || r === "type" && t.tagName === "TEXTAREA" || ba.test(r) && de(s) ? !1 : r in t;
  }
  /*! #__NO_SIDE_EFFECTS__ */
  // @__NO_SIDE_EFFECTS__
  function ju(t, r) {
    const s = /* @__PURE__ */ mi(t);
    class n extends Si {
      constructor(i) {
        super(s, i, r);
      }
    }
    return n.def = s, n;
  }
  const im = typeof HTMLElement < "u" ? HTMLElement : class {
  };
  class Si extends im {
    constructor(r, s = {}, n) {
      super(), this._childStylesAnchor = null, this._isCE = !0, this._VModelEmits = {}, this._def = r, this._props = s, this._instance = null, this._connected = !1, this._resolved = !1, this._numberProps = null, this._ob = null, this.shadowRoot && n ? n(this._createVNode(), this.shadowRoot) : (process.env.NODE_ENV !== "production" && this.shadowRoot && O(
        "Custom element has pre-rendered declarative shadow root but is not defined as hydratable. Use `defineSSRCustomElement`."
      ), this.attachShadow({ mode: "open" }), this._def.__asyncLoader || this._resolveProps(this._def));
    }
    connectedCallback() {
      this._connected = !0, this._instance || (this._resolved ? this._update() : this._resolveDef());
    }
    disconnectedCallback() {
      this._connected = !1, this._ob && (this._ob.disconnect(), this._ob = null), fu(() => {
        this._connected || (wa(null, this.shadowRoot), this._instance = null);
      });
    }
    /**
     * resolve inner component definition (handle possible async component)
     */
    _resolveDef() {
      this._resolved = !0;
      for (let n = 0; n < this.attributes.length; n++)
        this._setAttr(this.attributes[n].name);
      this._ob = new MutationObserver((n) => {
        for (const o of n)
          this._setAttr(o.attributeName);
      }), this._ob.observe(this, { attributes: !0 });
      const r = (n, o = !1) => {
        const { props: i, styles: l } = n;
        let a;
        if (i && !T(i))
          for (const u in i) {
            const d = i[u];
            (d === Number || d && d.type === Number) && (u in this._props && (this._props[u] = Ul(this._props[u])), (a || (a = /* @__PURE__ */ Object.create(null)))[Ae(u)] = !0);
          }
        this._numberProps = a, o && this._resolveProps(n), this._applyStyles(l), this._update();
      }, s = this._def.__asyncLoader;
      s ? s().then((n) => r(n, !0)) : r(this._def);
    }
    _resolveProps(r) {
      const { props: s } = r, n = T(s) ? s : Object.keys(s || {});
      for (const o of Object.keys(this))
        o[0] !== "_" && n.includes(o) && this._setProp(o, this[o], !0, !1);
      for (const o of n.map(Ae))
        Object.defineProperty(this, o, {
          get() {
            return this._getProp(o);
          },
          set(i) {
            this._setProp(o, i);
          }
        });
    }
    _setAttr(r) {
      let s = this.getAttribute(r);
      const n = Ae(r);
      this._numberProps && this._numberProps[n] && (s = Ul(s)), this._setProp(n, s, !1);
    }
    /**
     * @internal
     */
    _getProp(r) {
      return this._props[r];
    }
    /**
     * @internal
     */
    _setProp(r, s, n = !0, o = !0) {
      s !== this._props[r] && (this._props[r] = s, o && this._instance && this._update(), n && (s === !0 ? this.setAttribute(Te(r), "") : typeof s == "string" || typeof s == "number" ? this.setAttribute(Te(r), s + "") : s || this.removeAttribute(Te(r))));
    }
    _update() {
      wa(this._createVNode(), this.shadowRoot);
    }
    _createVNode() {
      const r = Re(this._def, ie({}, this._props, this._VModelEmits));
      return this._instance || (r.ce = (s) => {
        this._instance = s, s.addCEChildStyle = this._addChildStyles.bind(this), s.removeCEChildStyle = this._removeChildStyles.bind(this), s.isCE = !0, process.env.NODE_ENV !== "production" && (s.ceReload = (i) => {
          this._styles && (this._styles.forEach((l) => this.shadowRoot.removeChild(l)), this._styles.length = 0), this._applyStyles(i), this._instance = null, this._update();
        });
        const n = (i, l) => {
          this.dispatchEvent(
            new CustomEvent(i, {
              detail: l
            })
          );
        };
        s.emit = (i, ...l) => {
          const a = It(i);
          if (Fr(a)) {
            Eu(s, i, ...l);
            return;
          }
          n(i, l), Te(i) !== i && n(Te(i), l);
        };
        let o = this;
        for (; o = o && (o.parentNode || o.host); )
          if (o instanceof Si) {
            s.parent = o._instance, s.provides = o._instance.provides;
            break;
          }
      }), r;
    }
    _applyStyles(r) {
      r && r.forEach((s) => {
        const n = document.createElement("style");
        n.textContent = s, this.shadowRoot.appendChild(n), this._childStylesAnchor = n, process.env.NODE_ENV !== "production" && (this._styles || (this._styles = [])).push(n);
      });
    }
    _addChildStyles(r, s) {
      if (r) {
        const n = r.join(), o = `__${this._instance.uid}`;
        let i = /* @__PURE__ */ new Set();
        if (Vt.has(n) && (i = Vt.get(n), i.has(o))) {
          i.add(o), Vt.set(n, i);
          return;
        }
        i.add(o), Vt.set(n, i);
        const l = `data-v-ce-${s.uid}`;
        r.forEach((a, u) => {
          const d = document.createElement("style");
          d.textContent = a, d.setAttribute(l, ""), this._childStylesAnchor ? this.shadowRoot.insertBefore(
            d,
            this._childStylesAnchor
          ) : this.shadowRoot.appendChild(d), this._childStylesAnchor = d, (this._styles || (this._styles = [])).push(d);
        });
      }
    }
    _removeChildStyles(r, s) {
      if (r) {
        const n = r.join();
        let o = /* @__PURE__ */ new Set();
        if (Vt.has(n)) {
          const i = `__${this._instance.uid}`;
          if (o = Vt.get(n), o.delete(i), o.size === 0) {
            const l = this.shadowRoot.querySelectorAll(`[data-v-ce-${s}]`);
            l.length > 0 && l.forEach((u) => this.shadowRoot.removeChild(u));
            const a = this.shadowRoot.querySelectorAll("style");
            this._childStylesAnchor = a.length > 0 ? a[a.length - 1] : void 0, Vt.delete(n);
          } else
            Vt.set(n, o);
        }
      }
    }
  }
  function lm(t = "$style") {
    {
      const r = $p();
      if (!r)
        return process.env.NODE_ENV !== "production" && O("useCssModule must be called inside setup()"), Z;
      const s = r.type.__cssModules;
      if (!s)
        return process.env.NODE_ENV !== "production" && O("Current instance does not have CSS modules injected."), Z;
      const n = s[t];
      return n || (process.env.NODE_ENV !== "production" && O(`Current instance does not have CSS module named "${t}".`), Z);
    }
  }
  const am = /* @__PURE__ */ ie({ patchProp: nm }, Hp);
  let Ea;
  function um() {
    return Ea || (Ea = hp(am));
  }
  const wa = (...t) => {
    um().render(...t);
  };
  function cm() {
    Fp();
  }
  process.env.NODE_ENV !== "production" && cm();
  //! moment.js
  //! version : 2.29.4
  //! authors : Tim Wood, Iskren Chernev, Moment.js contributors
  //! license : MIT
  //! momentjs.com
  var zu;
  function D() {
    return zu.apply(null, arguments);
  }
  function dm(t) {
    zu = t;
  }
  function Je(t) {
    return t instanceof Array || Object.prototype.toString.call(t) === "[object Array]";
  }
  function ur(t) {
    return t != null && Object.prototype.toString.call(t) === "[object Object]";
  }
  function K(t, r) {
    return Object.prototype.hasOwnProperty.call(t, r);
  }
  function Di(t) {
    if (Object.getOwnPropertyNames)
      return Object.getOwnPropertyNames(t).length === 0;
    var r;
    for (r in t)
      if (K(t, r))
        return !1;
    return !0;
  }
  function xe(t) {
    return t === void 0;
  }
  function $t(t) {
    return typeof t == "number" || Object.prototype.toString.call(t) === "[object Number]";
  }
  function Ns(t) {
    return t instanceof Date || Object.prototype.toString.call(t) === "[object Date]";
  }
  function Bu(t, r) {
    var s = [], n, o = t.length;
    for (n = 0; n < o; ++n)
      s.push(r(t[n], n));
    return s;
  }
  function Ht(t, r) {
    for (var s in r)
      K(r, s) && (t[s] = r[s]);
    return K(r, "toString") && (t.toString = r.toString), K(r, "valueOf") && (t.valueOf = r.valueOf), t;
  }
  function pt(t, r, s, n) {
    return _c(t, r, s, n, !0).utc();
  }
  function fm() {
    return {
      empty: !1,
      unusedTokens: [],
      unusedInput: [],
      overflow: -2,
      charsLeftOver: 0,
      nullInput: !1,
      invalidEra: null,
      invalidMonth: null,
      invalidFormat: !1,
      userInvalidated: !1,
      iso: !1,
      parsedDateParts: [],
      era: null,
      meridiem: null,
      rfc2822: !1,
      weekdayMismatch: !1
    };
  }
  function R(t) {
    return t._pf == null && (t._pf = fm()), t._pf;
  }
  var Lo;
  Array.prototype.some ? Lo = Array.prototype.some : Lo = function(t) {
    var r = Object(this), s = r.length >>> 0, n;
    for (n = 0; n < s; n++)
      if (n in r && t.call(this, r[n], n, r))
        return !0;
    return !1;
  };
  function $i(t) {
    if (t._isValid == null) {
      var r = R(t), s = Lo.call(r.parsedDateParts, function(o) {
        return o != null;
      }), n = !isNaN(t._d.getTime()) && r.overflow < 0 && !r.empty && !r.invalidEra && !r.invalidMonth && !r.invalidWeekday && !r.weekdayMismatch && !r.nullInput && !r.invalidFormat && !r.userInvalidated && (!r.meridiem || r.meridiem && s);
      if (t._strict && (n = n && r.charsLeftOver === 0 && r.unusedTokens.length === 0 && r.bigHour === void 0), Object.isFrozen == null || !Object.isFrozen(t))
        t._isValid = n;
      else
        return n;
    }
    return t._isValid;
  }
  function Pn(t) {
    var r = pt(NaN);
    return t != null ? Ht(R(r), t) : R(r).userInvalidated = !0, r;
  }
  var Oa = D.momentProperties = [], co = !1;
  function xi(t, r) {
    var s, n, o, i = Oa.length;
    if (xe(r._isAMomentObject) || (t._isAMomentObject = r._isAMomentObject), xe(r._i) || (t._i = r._i), xe(r._f) || (t._f = r._f), xe(r._l) || (t._l = r._l), xe(r._strict) || (t._strict = r._strict), xe(r._tzm) || (t._tzm = r._tzm), xe(r._isUTC) || (t._isUTC = r._isUTC), xe(r._offset) || (t._offset = r._offset), xe(r._pf) || (t._pf = R(r)), xe(r._locale) || (t._locale = r._locale), i > 0)
      for (s = 0; s < i; s++)
        n = Oa[s], o = r[n], xe(o) || (t[n] = o);
    return t;
  }
  function Ss(t) {
    xi(this, t), this._d = new Date(t._d != null ? t._d.getTime() : NaN), this.isValid() || (this._d = /* @__PURE__ */ new Date(NaN)), co === !1 && (co = !0, D.updateOffset(this), co = !1);
  }
  function Ze(t) {
    return t instanceof Ss || t != null && t._isAMomentObject != null;
  }
  function Gu(t) {
    D.suppressDeprecationWarnings === !1 && typeof console < "u" && console.warn && console.warn("Deprecation warning: " + t);
  }
  function Ue(t, r) {
    var s = !0;
    return Ht(function() {
      if (D.deprecationHandler != null && D.deprecationHandler(null, t), s) {
        var n = [], o, i, l, a = arguments.length;
        for (i = 0; i < a; i++) {
          if (o = "", typeof arguments[i] == "object") {
            o += `
[` + i + "] ";
            for (l in arguments[0])
              K(arguments[0], l) && (o += l + ": " + arguments[0][l] + ", ");
            o = o.slice(0, -2);
          } else
            o = arguments[i];
          n.push(o);
        }
        Gu(
          t + `
Arguments: ` + Array.prototype.slice.call(n).join("") + `
` + new Error().stack
        ), s = !1;
      }
      return r.apply(this, arguments);
    }, r);
  }
  var Na = {};
  function Ku(t, r) {
    D.deprecationHandler != null && D.deprecationHandler(t, r), Na[t] || (Gu(r), Na[t] = !0);
  }
  D.suppressDeprecationWarnings = !1;
  D.deprecationHandler = null;
  function mt(t) {
    return typeof Function < "u" && t instanceof Function || Object.prototype.toString.call(t) === "[object Function]";
  }
  function hm(t) {
    var r, s;
    for (s in t)
      K(t, s) && (r = t[s], mt(r) ? this[s] = r : this["_" + s] = r);
    this._config = t, this._dayOfMonthOrdinalParseLenient = new RegExp(
      (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source
    );
  }
  function Wo(t, r) {
    var s = Ht({}, t), n;
    for (n in r)
      K(r, n) && (ur(t[n]) && ur(r[n]) ? (s[n] = {}, Ht(s[n], t[n]), Ht(s[n], r[n])) : r[n] != null ? s[n] = r[n] : delete s[n]);
    for (n in t)
      K(t, n) && !K(r, n) && ur(t[n]) && (s[n] = Ht({}, s[n]));
    return s;
  }
  function Mi(t) {
    t != null && this.set(t);
  }
  var jo;
  Object.keys ? jo = Object.keys : jo = function(t) {
    var r, s = [];
    for (r in t)
      K(t, r) && s.push(r);
    return s;
  };
  var pm = {
    sameDay: "[Today at] LT",
    nextDay: "[Tomorrow at] LT",
    nextWeek: "dddd [at] LT",
    lastDay: "[Yesterday at] LT",
    lastWeek: "[Last] dddd [at] LT",
    sameElse: "L"
  };
  function mm(t, r, s) {
    var n = this._calendar[t] || this._calendar.sameElse;
    return mt(n) ? n.call(r, s) : n;
  }
  function dt(t, r, s) {
    var n = "" + Math.abs(t), o = r - n.length, i = t >= 0;
    return (i ? s ? "+" : "" : "-") + Math.pow(10, Math.max(0, o)).toString().substr(1) + n;
  }
  var Ci = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, Rs = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, fo = {}, Tr = {};
  function k(t, r, s, n) {
    var o = n;
    typeof n == "string" && (o = function() {
      return this[n]();
    }), t && (Tr[t] = o), r && (Tr[r[0]] = function() {
      return dt(o.apply(this, arguments), r[1], r[2]);
    }), s && (Tr[s] = function() {
      return this.localeData().ordinal(
        o.apply(this, arguments),
        t
      );
    });
  }
  function _m(t) {
    return t.match(/\[[\s\S]/) ? t.replace(/^\[|\]$/g, "") : t.replace(/\\/g, "");
  }
  function vm(t) {
    var r = t.match(Ci), s, n;
    for (s = 0, n = r.length; s < n; s++)
      Tr[r[s]] ? r[s] = Tr[r[s]] : r[s] = _m(r[s]);
    return function(o) {
      var i = "", l;
      for (l = 0; l < n; l++)
        i += mt(r[l]) ? r[l].call(o, t) : r[l];
      return i;
    };
  }
  function qs(t, r) {
    return t.isValid() ? (r = qu(r, t.localeData()), fo[r] = fo[r] || vm(r), fo[r](t)) : t.localeData().invalidDate();
  }
  function qu(t, r) {
    var s = 5;
    function n(o) {
      return r.longDateFormat(o) || o;
    }
    for (Rs.lastIndex = 0; s >= 0 && Rs.test(t); )
      t = t.replace(
        Rs,
        n
      ), Rs.lastIndex = 0, s -= 1;
    return t;
  }
  var gm = {
    LTS: "h:mm:ss A",
    LT: "h:mm A",
    L: "MM/DD/YYYY",
    LL: "MMMM D, YYYY",
    LLL: "MMMM D, YYYY h:mm A",
    LLLL: "dddd, MMMM D, YYYY h:mm A"
  };
  function ym(t) {
    var r = this._longDateFormat[t], s = this._longDateFormat[t.toUpperCase()];
    return r || !s ? r : (this._longDateFormat[t] = s.match(Ci).map(function(n) {
      return n === "MMMM" || n === "MM" || n === "DD" || n === "dddd" ? n.slice(1) : n;
    }).join(""), this._longDateFormat[t]);
  }
  var bm = "Invalid date";
  function Em() {
    return this._invalidDate;
  }
  var wm = "%d", Om = /\d{1,2}/;
  function Nm(t) {
    return this._ordinal.replace("%d", t);
  }
  var Sm = {
    future: "in %s",
    past: "%s ago",
    s: "a few seconds",
    ss: "%d seconds",
    m: "a minute",
    mm: "%d minutes",
    h: "an hour",
    hh: "%d hours",
    d: "a day",
    dd: "%d days",
    w: "a week",
    ww: "%d weeks",
    M: "a month",
    MM: "%d months",
    y: "a year",
    yy: "%d years"
  };
  function Dm(t, r, s, n) {
    var o = this._relativeTime[s];
    return mt(o) ? o(t, r, s, n) : o.replace(/%d/i, t);
  }
  function $m(t, r) {
    var s = this._relativeTime[t > 0 ? "future" : "past"];
    return mt(s) ? s(r) : s.replace(/%s/i, r);
  }
  var is = {};
  function be(t, r) {
    var s = t.toLowerCase();
    is[s] = is[s + "s"] = is[r] = t;
  }
  function He(t) {
    return typeof t == "string" ? is[t] || is[t.toLowerCase()] : void 0;
  }
  function ki(t) {
    var r = {}, s, n;
    for (n in t)
      K(t, n) && (s = He(n), s && (r[s] = t[n]));
    return r;
  }
  var Ju = {};
  function Ee(t, r) {
    Ju[t] = r;
  }
  function xm(t) {
    var r = [], s;
    for (s in t)
      K(t, s) && r.push({ unit: s, priority: Ju[s] });
    return r.sort(function(n, o) {
      return n.priority - o.priority;
    }), r;
  }
  function Tn(t) {
    return t % 4 === 0 && t % 100 !== 0 || t % 400 === 0;
  }
  function Ie(t) {
    return t < 0 ? Math.ceil(t) || 0 : Math.floor(t);
  }
  function U(t) {
    var r = +t, s = 0;
    return r !== 0 && isFinite(r) && (s = Ie(r)), s;
  }
  function jr(t, r) {
    return function(s) {
      return s != null ? (Zu(this, t, s), D.updateOffset(this, r), this) : cn(this, t);
    };
  }
  function cn(t, r) {
    return t.isValid() ? t._d["get" + (t._isUTC ? "UTC" : "") + r]() : NaN;
  }
  function Zu(t, r, s) {
    t.isValid() && !isNaN(s) && (r === "FullYear" && Tn(t.year()) && t.month() === 1 && t.date() === 29 ? (s = U(s), t._d["set" + (t._isUTC ? "UTC" : "") + r](
      s,
      t.month(),
      Fn(s, t.month())
    )) : t._d["set" + (t._isUTC ? "UTC" : "") + r](s));
  }
  function Mm(t) {
    return t = He(t), mt(this[t]) ? this[t]() : this;
  }
  function Cm(t, r) {
    if (typeof t == "object") {
      t = ki(t);
      var s = xm(t), n, o = s.length;
      for (n = 0; n < o; n++)
        this[s[n].unit](t[s[n].unit]);
    } else if (t = He(t), mt(this[t]))
      return this[t](r);
    return this;
  }
  var Qu = /\d/, Ve = /\d\d/, Xu = /\d{3}/, Pi = /\d{4}/, An = /[+-]?\d{6}/, ne = /\d\d?/, ec = /\d\d\d\d?/, tc = /\d\d\d\d\d\d?/, Vn = /\d{1,3}/, Ti = /\d{1,4}/, In = /[+-]?\d{1,6}/, zr = /\d+/, Rn = /[+-]?\d+/, km = /Z|[+-]\d\d:?\d\d/gi, Yn = /Z|[+-]\d\d(?::?\d\d)?/gi, Pm = /[+-]?\d+(\.\d{1,3})?/, Ds = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, dn;
  dn = {};
  function x(t, r, s) {
    dn[t] = mt(r) ? r : function(n, o) {
      return n && s ? s : r;
    };
  }
  function Tm(t, r) {
    return K(dn, t) ? dn[t](r._strict, r._locale) : new RegExp(Am(t));
  }
  function Am(t) {
    return Pe(
      t.replace("\\", "").replace(
        /\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
        function(r, s, n, o, i) {
          return s || n || o || i;
        }
      )
    );
  }
  function Pe(t) {
    return t.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  }
  var zo = {};
  function X(t, r) {
    var s, n = r, o;
    for (typeof t == "string" && (t = [t]), $t(r) && (n = function(i, l) {
      l[r] = U(i);
    }), o = t.length, s = 0; s < o; s++)
      zo[t[s]] = n;
  }
  function $s(t, r) {
    X(t, function(s, n, o, i) {
      o._w = o._w || {}, r(s, o._w, o, i);
    });
  }
  function Vm(t, r, s) {
    r != null && K(zo, t) && zo[t](r, s._a, s, t);
  }
  var ye = 0, Ot = 1, ut = 2, me = 3, Ge = 4, Nt = 5, tr = 6, Im = 7, Rm = 8;
  function Ym(t, r) {
    return (t % r + r) % r;
  }
  var ae;
  Array.prototype.indexOf ? ae = Array.prototype.indexOf : ae = function(t) {
    var r;
    for (r = 0; r < this.length; ++r)
      if (this[r] === t)
        return r;
    return -1;
  };
  function Fn(t, r) {
    if (isNaN(t) || isNaN(r))
      return NaN;
    var s = Ym(r, 12);
    return t += (r - s) / 12, s === 1 ? Tn(t) ? 29 : 28 : 31 - s % 7 % 2;
  }
  k("M", ["MM", 2], "Mo", function() {
    return this.month() + 1;
  });
  k("MMM", 0, 0, function(t) {
    return this.localeData().monthsShort(this, t);
  });
  k("MMMM", 0, 0, function(t) {
    return this.localeData().months(this, t);
  });
  be("month", "M");
  Ee("month", 8);
  x("M", ne);
  x("MM", ne, Ve);
  x("MMM", function(t, r) {
    return r.monthsShortRegex(t);
  });
  x("MMMM", function(t, r) {
    return r.monthsRegex(t);
  });
  X(["M", "MM"], function(t, r) {
    r[Ot] = U(t) - 1;
  });
  X(["MMM", "MMMM"], function(t, r, s, n) {
    var o = s._locale.monthsParse(t, n, s._strict);
    o != null ? r[Ot] = o : R(s).invalidMonth = t;
  });
  var Fm = "January_February_March_April_May_June_July_August_September_October_November_December".split(
    "_"
  ), rc = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), sc = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, Um = Ds, Hm = Ds;
  function Lm(t, r) {
    return t ? Je(this._months) ? this._months[t.month()] : this._months[(this._months.isFormat || sc).test(r) ? "format" : "standalone"][t.month()] : Je(this._months) ? this._months : this._months.standalone;
  }
  function Wm(t, r) {
    return t ? Je(this._monthsShort) ? this._monthsShort[t.month()] : this._monthsShort[sc.test(r) ? "format" : "standalone"][t.month()] : Je(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone;
  }
  function jm(t, r, s) {
    var n, o, i, l = t.toLocaleLowerCase();
    if (!this._monthsParse)
      for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], n = 0; n < 12; ++n)
        i = pt([2e3, n]), this._shortMonthsParse[n] = this.monthsShort(
          i,
          ""
        ).toLocaleLowerCase(), this._longMonthsParse[n] = this.months(i, "").toLocaleLowerCase();
    return s ? r === "MMM" ? (o = ae.call(this._shortMonthsParse, l), o !== -1 ? o : null) : (o = ae.call(this._longMonthsParse, l), o !== -1 ? o : null) : r === "MMM" ? (o = ae.call(this._shortMonthsParse, l), o !== -1 ? o : (o = ae.call(this._longMonthsParse, l), o !== -1 ? o : null)) : (o = ae.call(this._longMonthsParse, l), o !== -1 ? o : (o = ae.call(this._shortMonthsParse, l), o !== -1 ? o : null));
  }
  function zm(t, r, s) {
    var n, o, i;
    if (this._monthsParseExact)
      return jm.call(this, t, r, s);
    for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), n = 0; n < 12; n++) {
      if (o = pt([2e3, n]), s && !this._longMonthsParse[n] && (this._longMonthsParse[n] = new RegExp(
        "^" + this.months(o, "").replace(".", "") + "$",
        "i"
      ), this._shortMonthsParse[n] = new RegExp(
        "^" + this.monthsShort(o, "").replace(".", "") + "$",
        "i"
      )), !s && !this._monthsParse[n] && (i = "^" + this.months(o, "") + "|^" + this.monthsShort(o, ""), this._monthsParse[n] = new RegExp(i.replace(".", ""), "i")), s && r === "MMMM" && this._longMonthsParse[n].test(t))
        return n;
      if (s && r === "MMM" && this._shortMonthsParse[n].test(t))
        return n;
      if (!s && this._monthsParse[n].test(t))
        return n;
    }
  }
  function nc(t, r) {
    var s;
    if (!t.isValid())
      return t;
    if (typeof r == "string") {
      if (/^\d+$/.test(r))
        r = U(r);
      else if (r = t.localeData().monthsParse(r), !$t(r))
        return t;
    }
    return s = Math.min(t.date(), Fn(t.year(), r)), t._d["set" + (t._isUTC ? "UTC" : "") + "Month"](r, s), t;
  }
  function oc(t) {
    return t != null ? (nc(this, t), D.updateOffset(this, !0), this) : cn(this, "Month");
  }
  function Bm() {
    return Fn(this.year(), this.month());
  }
  function Gm(t) {
    return this._monthsParseExact ? (K(this, "_monthsRegex") || ic.call(this), t ? this._monthsShortStrictRegex : this._monthsShortRegex) : (K(this, "_monthsShortRegex") || (this._monthsShortRegex = Um), this._monthsShortStrictRegex && t ? this._monthsShortStrictRegex : this._monthsShortRegex);
  }
  function Km(t) {
    return this._monthsParseExact ? (K(this, "_monthsRegex") || ic.call(this), t ? this._monthsStrictRegex : this._monthsRegex) : (K(this, "_monthsRegex") || (this._monthsRegex = Hm), this._monthsStrictRegex && t ? this._monthsStrictRegex : this._monthsRegex);
  }
  function ic() {
    function t(l, a) {
      return a.length - l.length;
    }
    var r = [], s = [], n = [], o, i;
    for (o = 0; o < 12; o++)
      i = pt([2e3, o]), r.push(this.monthsShort(i, "")), s.push(this.months(i, "")), n.push(this.months(i, "")), n.push(this.monthsShort(i, ""));
    for (r.sort(t), s.sort(t), n.sort(t), o = 0; o < 12; o++)
      r[o] = Pe(r[o]), s[o] = Pe(s[o]);
    for (o = 0; o < 24; o++)
      n[o] = Pe(n[o]);
    this._monthsRegex = new RegExp("^(" + n.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp(
      "^(" + s.join("|") + ")",
      "i"
    ), this._monthsShortStrictRegex = new RegExp(
      "^(" + r.join("|") + ")",
      "i"
    );
  }
  k("Y", 0, 0, function() {
    var t = this.year();
    return t <= 9999 ? dt(t, 4) : "+" + t;
  });
  k(0, ["YY", 2], 0, function() {
    return this.year() % 100;
  });
  k(0, ["YYYY", 4], 0, "year");
  k(0, ["YYYYY", 5], 0, "year");
  k(0, ["YYYYYY", 6, !0], 0, "year");
  be("year", "y");
  Ee("year", 1);
  x("Y", Rn);
  x("YY", ne, Ve);
  x("YYYY", Ti, Pi);
  x("YYYYY", In, An);
  x("YYYYYY", In, An);
  X(["YYYYY", "YYYYYY"], ye);
  X("YYYY", function(t, r) {
    r[ye] = t.length === 2 ? D.parseTwoDigitYear(t) : U(t);
  });
  X("YY", function(t, r) {
    r[ye] = D.parseTwoDigitYear(t);
  });
  X("Y", function(t, r) {
    r[ye] = parseInt(t, 10);
  });
  function ls(t) {
    return Tn(t) ? 366 : 365;
  }
  D.parseTwoDigitYear = function(t) {
    return U(t) + (U(t) > 68 ? 1900 : 2e3);
  };
  var lc = jr("FullYear", !0);
  function qm() {
    return Tn(this.year());
  }
  function Jm(t, r, s, n, o, i, l) {
    var a;
    return t < 100 && t >= 0 ? (a = new Date(t + 400, r, s, n, o, i, l), isFinite(a.getFullYear()) && a.setFullYear(t)) : a = new Date(t, r, s, n, o, i, l), a;
  }
  function gs(t) {
    var r, s;
    return t < 100 && t >= 0 ? (s = Array.prototype.slice.call(arguments), s[0] = t + 400, r = new Date(Date.UTC.apply(null, s)), isFinite(r.getUTCFullYear()) && r.setUTCFullYear(t)) : r = new Date(Date.UTC.apply(null, arguments)), r;
  }
  function fn(t, r, s) {
    var n = 7 + r - s, o = (7 + gs(t, 0, n).getUTCDay() - r) % 7;
    return -o + n - 1;
  }
  function ac(t, r, s, n, o) {
    var i = (7 + s - n) % 7, l = fn(t, n, o), a = 1 + 7 * (r - 1) + i + l, u, d;
    return a <= 0 ? (u = t - 1, d = ls(u) + a) : a > ls(t) ? (u = t + 1, d = a - ls(t)) : (u = t, d = a), {
      year: u,
      dayOfYear: d
    };
  }
  function ys(t, r, s) {
    var n = fn(t.year(), r, s), o = Math.floor((t.dayOfYear() - n - 1) / 7) + 1, i, l;
    return o < 1 ? (l = t.year() - 1, i = o + Dt(l, r, s)) : o > Dt(t.year(), r, s) ? (i = o - Dt(t.year(), r, s), l = t.year() + 1) : (l = t.year(), i = o), {
      week: i,
      year: l
    };
  }
  function Dt(t, r, s) {
    var n = fn(t, r, s), o = fn(t + 1, r, s);
    return (ls(t) - n + o) / 7;
  }
  k("w", ["ww", 2], "wo", "week");
  k("W", ["WW", 2], "Wo", "isoWeek");
  be("week", "w");
  be("isoWeek", "W");
  Ee("week", 5);
  Ee("isoWeek", 5);
  x("w", ne);
  x("ww", ne, Ve);
  x("W", ne);
  x("WW", ne, Ve);
  $s(
    ["w", "ww", "W", "WW"],
    function(t, r, s, n) {
      r[n.substr(0, 1)] = U(t);
    }
  );
  function Zm(t) {
    return ys(t, this._week.dow, this._week.doy).week;
  }
  var Qm = {
    dow: 0,
    // Sunday is the first day of the week.
    doy: 6
    // The week that contains Jan 6th is the first week of the year.
  };
  function Xm() {
    return this._week.dow;
  }
  function e_() {
    return this._week.doy;
  }
  function t_(t) {
    var r = this.localeData().week(this);
    return t == null ? r : this.add((t - r) * 7, "d");
  }
  function r_(t) {
    var r = ys(this, 1, 4).week;
    return t == null ? r : this.add((t - r) * 7, "d");
  }
  k("d", 0, "do", "day");
  k("dd", 0, 0, function(t) {
    return this.localeData().weekdaysMin(this, t);
  });
  k("ddd", 0, 0, function(t) {
    return this.localeData().weekdaysShort(this, t);
  });
  k("dddd", 0, 0, function(t) {
    return this.localeData().weekdays(this, t);
  });
  k("e", 0, 0, "weekday");
  k("E", 0, 0, "isoWeekday");
  be("day", "d");
  be("weekday", "e");
  be("isoWeekday", "E");
  Ee("day", 11);
  Ee("weekday", 11);
  Ee("isoWeekday", 11);
  x("d", ne);
  x("e", ne);
  x("E", ne);
  x("dd", function(t, r) {
    return r.weekdaysMinRegex(t);
  });
  x("ddd", function(t, r) {
    return r.weekdaysShortRegex(t);
  });
  x("dddd", function(t, r) {
    return r.weekdaysRegex(t);
  });
  $s(["dd", "ddd", "dddd"], function(t, r, s, n) {
    var o = s._locale.weekdaysParse(t, n, s._strict);
    o != null ? r.d = o : R(s).invalidWeekday = t;
  });
  $s(["d", "e", "E"], function(t, r, s, n) {
    r[n] = U(t);
  });
  function s_(t, r) {
    return typeof t != "string" ? t : isNaN(t) ? (t = r.weekdaysParse(t), typeof t == "number" ? t : null) : parseInt(t, 10);
  }
  function n_(t, r) {
    return typeof t == "string" ? r.weekdaysParse(t) % 7 || 7 : isNaN(t) ? null : t;
  }
  function Ai(t, r) {
    return t.slice(r, 7).concat(t.slice(0, r));
  }
  var o_ = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), uc = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), i_ = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), l_ = Ds, a_ = Ds, u_ = Ds;
  function c_(t, r) {
    var s = Je(this._weekdays) ? this._weekdays : this._weekdays[t && t !== !0 && this._weekdays.isFormat.test(r) ? "format" : "standalone"];
    return t === !0 ? Ai(s, this._week.dow) : t ? s[t.day()] : s;
  }
  function d_(t) {
    return t === !0 ? Ai(this._weekdaysShort, this._week.dow) : t ? this._weekdaysShort[t.day()] : this._weekdaysShort;
  }
  function f_(t) {
    return t === !0 ? Ai(this._weekdaysMin, this._week.dow) : t ? this._weekdaysMin[t.day()] : this._weekdaysMin;
  }
  function h_(t, r, s) {
    var n, o, i, l = t.toLocaleLowerCase();
    if (!this._weekdaysParse)
      for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], n = 0; n < 7; ++n)
        i = pt([2e3, 1]).day(n), this._minWeekdaysParse[n] = this.weekdaysMin(
          i,
          ""
        ).toLocaleLowerCase(), this._shortWeekdaysParse[n] = this.weekdaysShort(
          i,
          ""
        ).toLocaleLowerCase(), this._weekdaysParse[n] = this.weekdays(i, "").toLocaleLowerCase();
    return s ? r === "dddd" ? (o = ae.call(this._weekdaysParse, l), o !== -1 ? o : null) : r === "ddd" ? (o = ae.call(this._shortWeekdaysParse, l), o !== -1 ? o : null) : (o = ae.call(this._minWeekdaysParse, l), o !== -1 ? o : null) : r === "dddd" ? (o = ae.call(this._weekdaysParse, l), o !== -1 || (o = ae.call(this._shortWeekdaysParse, l), o !== -1) ? o : (o = ae.call(this._minWeekdaysParse, l), o !== -1 ? o : null)) : r === "ddd" ? (o = ae.call(this._shortWeekdaysParse, l), o !== -1 || (o = ae.call(this._weekdaysParse, l), o !== -1) ? o : (o = ae.call(this._minWeekdaysParse, l), o !== -1 ? o : null)) : (o = ae.call(this._minWeekdaysParse, l), o !== -1 || (o = ae.call(this._weekdaysParse, l), o !== -1) ? o : (o = ae.call(this._shortWeekdaysParse, l), o !== -1 ? o : null));
  }
  function p_(t, r, s) {
    var n, o, i;
    if (this._weekdaysParseExact)
      return h_.call(this, t, r, s);
    for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), n = 0; n < 7; n++) {
      if (o = pt([2e3, 1]).day(n), s && !this._fullWeekdaysParse[n] && (this._fullWeekdaysParse[n] = new RegExp(
        "^" + this.weekdays(o, "").replace(".", "\\.?") + "$",
        "i"
      ), this._shortWeekdaysParse[n] = new RegExp(
        "^" + this.weekdaysShort(o, "").replace(".", "\\.?") + "$",
        "i"
      ), this._minWeekdaysParse[n] = new RegExp(
        "^" + this.weekdaysMin(o, "").replace(".", "\\.?") + "$",
        "i"
      )), this._weekdaysParse[n] || (i = "^" + this.weekdays(o, "") + "|^" + this.weekdaysShort(o, "") + "|^" + this.weekdaysMin(o, ""), this._weekdaysParse[n] = new RegExp(i.replace(".", ""), "i")), s && r === "dddd" && this._fullWeekdaysParse[n].test(t))
        return n;
      if (s && r === "ddd" && this._shortWeekdaysParse[n].test(t))
        return n;
      if (s && r === "dd" && this._minWeekdaysParse[n].test(t))
        return n;
      if (!s && this._weekdaysParse[n].test(t))
        return n;
    }
  }
  function m_(t) {
    if (!this.isValid())
      return t != null ? this : NaN;
    var r = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
    return t != null ? (t = s_(t, this.localeData()), this.add(t - r, "d")) : r;
  }
  function __(t) {
    if (!this.isValid())
      return t != null ? this : NaN;
    var r = (this.day() + 7 - this.localeData()._week.dow) % 7;
    return t == null ? r : this.add(t - r, "d");
  }
  function v_(t) {
    if (!this.isValid())
      return t != null ? this : NaN;
    if (t != null) {
      var r = n_(t, this.localeData());
      return this.day(this.day() % 7 ? r : r - 7);
    } else
      return this.day() || 7;
  }
  function g_(t) {
    return this._weekdaysParseExact ? (K(this, "_weekdaysRegex") || Vi.call(this), t ? this._weekdaysStrictRegex : this._weekdaysRegex) : (K(this, "_weekdaysRegex") || (this._weekdaysRegex = l_), this._weekdaysStrictRegex && t ? this._weekdaysStrictRegex : this._weekdaysRegex);
  }
  function y_(t) {
    return this._weekdaysParseExact ? (K(this, "_weekdaysRegex") || Vi.call(this), t ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (K(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = a_), this._weekdaysShortStrictRegex && t ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex);
  }
  function b_(t) {
    return this._weekdaysParseExact ? (K(this, "_weekdaysRegex") || Vi.call(this), t ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (K(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = u_), this._weekdaysMinStrictRegex && t ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex);
  }
  function Vi() {
    function t(p, h) {
      return h.length - p.length;
    }
    var r = [], s = [], n = [], o = [], i, l, a, u, d;
    for (i = 0; i < 7; i++)
      l = pt([2e3, 1]).day(i), a = Pe(this.weekdaysMin(l, "")), u = Pe(this.weekdaysShort(l, "")), d = Pe(this.weekdays(l, "")), r.push(a), s.push(u), n.push(d), o.push(a), o.push(u), o.push(d);
    r.sort(t), s.sort(t), n.sort(t), o.sort(t), this._weekdaysRegex = new RegExp("^(" + o.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp(
      "^(" + n.join("|") + ")",
      "i"
    ), this._weekdaysShortStrictRegex = new RegExp(
      "^(" + s.join("|") + ")",
      "i"
    ), this._weekdaysMinStrictRegex = new RegExp(
      "^(" + r.join("|") + ")",
      "i"
    );
  }
  function Ii() {
    return this.hours() % 12 || 12;
  }
  function E_() {
    return this.hours() || 24;
  }
  k("H", ["HH", 2], 0, "hour");
  k("h", ["hh", 2], 0, Ii);
  k("k", ["kk", 2], 0, E_);
  k("hmm", 0, 0, function() {
    return "" + Ii.apply(this) + dt(this.minutes(), 2);
  });
  k("hmmss", 0, 0, function() {
    return "" + Ii.apply(this) + dt(this.minutes(), 2) + dt(this.seconds(), 2);
  });
  k("Hmm", 0, 0, function() {
    return "" + this.hours() + dt(this.minutes(), 2);
  });
  k("Hmmss", 0, 0, function() {
    return "" + this.hours() + dt(this.minutes(), 2) + dt(this.seconds(), 2);
  });
  function cc(t, r) {
    k(t, 0, 0, function() {
      return this.localeData().meridiem(
        this.hours(),
        this.minutes(),
        r
      );
    });
  }
  cc("a", !0);
  cc("A", !1);
  be("hour", "h");
  Ee("hour", 13);
  function dc(t, r) {
    return r._meridiemParse;
  }
  x("a", dc);
  x("A", dc);
  x("H", ne);
  x("h", ne);
  x("k", ne);
  x("HH", ne, Ve);
  x("hh", ne, Ve);
  x("kk", ne, Ve);
  x("hmm", ec);
  x("hmmss", tc);
  x("Hmm", ec);
  x("Hmmss", tc);
  X(["H", "HH"], me);
  X(["k", "kk"], function(t, r, s) {
    var n = U(t);
    r[me] = n === 24 ? 0 : n;
  });
  X(["a", "A"], function(t, r, s) {
    s._isPm = s._locale.isPM(t), s._meridiem = t;
  });
  X(["h", "hh"], function(t, r, s) {
    r[me] = U(t), R(s).bigHour = !0;
  });
  X("hmm", function(t, r, s) {
    var n = t.length - 2;
    r[me] = U(t.substr(0, n)), r[Ge] = U(t.substr(n)), R(s).bigHour = !0;
  });
  X("hmmss", function(t, r, s) {
    var n = t.length - 4, o = t.length - 2;
    r[me] = U(t.substr(0, n)), r[Ge] = U(t.substr(n, 2)), r[Nt] = U(t.substr(o)), R(s).bigHour = !0;
  });
  X("Hmm", function(t, r, s) {
    var n = t.length - 2;
    r[me] = U(t.substr(0, n)), r[Ge] = U(t.substr(n));
  });
  X("Hmmss", function(t, r, s) {
    var n = t.length - 4, o = t.length - 2;
    r[me] = U(t.substr(0, n)), r[Ge] = U(t.substr(n, 2)), r[Nt] = U(t.substr(o));
  });
  function w_(t) {
    return (t + "").toLowerCase().charAt(0) === "p";
  }
  var O_ = /[ap]\.?m?\.?/i, N_ = jr("Hours", !0);
  function S_(t, r, s) {
    return t > 11 ? s ? "pm" : "PM" : s ? "am" : "AM";
  }
  var fc = {
    calendar: pm,
    longDateFormat: gm,
    invalidDate: bm,
    ordinal: wm,
    dayOfMonthOrdinalParse: Om,
    relativeTime: Sm,
    months: Fm,
    monthsShort: rc,
    week: Qm,
    weekdays: o_,
    weekdaysMin: i_,
    weekdaysShort: uc,
    meridiemParse: O_
  }, oe = {}, Qr = {}, bs;
  function D_(t, r) {
    var s, n = Math.min(t.length, r.length);
    for (s = 0; s < n; s += 1)
      if (t[s] !== r[s])
        return s;
    return n;
  }
  function Sa(t) {
    return t && t.toLowerCase().replace("_", "-");
  }
  function $_(t) {
    for (var r = 0, s, n, o, i; r < t.length; ) {
      for (i = Sa(t[r]).split("-"), s = i.length, n = Sa(t[r + 1]), n = n ? n.split("-") : null; s > 0; ) {
        if (o = Un(i.slice(0, s).join("-")), o)
          return o;
        if (n && n.length >= s && D_(i, n) >= s - 1)
          break;
        s--;
      }
      r++;
    }
    return bs;
  }
  function x_(t) {
    return t.match("^[^/\\\\]*$") != null;
  }
  function Un(t) {
    var r = null, s;
    if (oe[t] === void 0 && typeof Qs < "u" && Qs && Qs.exports && x_(t))
      try {
        r = bs._abbr, s = require, s("./locale/" + t), jt(r);
      } catch {
        oe[t] = null;
      }
    return oe[t];
  }
  function jt(t, r) {
    var s;
    return t && (xe(r) ? s = Mt(t) : s = Ri(t, r), s ? bs = s : typeof console < "u" && console.warn && console.warn(
      "Locale " + t + " not found. Did you forget to load it?"
    )), bs._abbr;
  }
  function Ri(t, r) {
    if (r !== null) {
      var s, n = fc;
      if (r.abbr = t, oe[t] != null)
        Ku(
          "defineLocaleOverride",
          "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
        ), n = oe[t]._config;
      else if (r.parentLocale != null)
        if (oe[r.parentLocale] != null)
          n = oe[r.parentLocale]._config;
        else if (s = Un(r.parentLocale), s != null)
          n = s._config;
        else
          return Qr[r.parentLocale] || (Qr[r.parentLocale] = []), Qr[r.parentLocale].push({
            name: t,
            config: r
          }), null;
      return oe[t] = new Mi(Wo(n, r)), Qr[t] && Qr[t].forEach(function(o) {
        Ri(o.name, o.config);
      }), jt(t), oe[t];
    } else
      return delete oe[t], null;
  }
  function M_(t, r) {
    if (r != null) {
      var s, n, o = fc;
      oe[t] != null && oe[t].parentLocale != null ? oe[t].set(Wo(oe[t]._config, r)) : (n = Un(t), n != null && (o = n._config), r = Wo(o, r), n == null && (r.abbr = t), s = new Mi(r), s.parentLocale = oe[t], oe[t] = s), jt(t);
    } else
      oe[t] != null && (oe[t].parentLocale != null ? (oe[t] = oe[t].parentLocale, t === jt() && jt(t)) : oe[t] != null && delete oe[t]);
    return oe[t];
  }
  function Mt(t) {
    var r;
    if (t && t._locale && t._locale._abbr && (t = t._locale._abbr), !t)
      return bs;
    if (!Je(t)) {
      if (r = Un(t), r)
        return r;
      t = [t];
    }
    return $_(t);
  }
  function C_() {
    return jo(oe);
  }
  function Yi(t) {
    var r, s = t._a;
    return s && R(t).overflow === -2 && (r = s[Ot] < 0 || s[Ot] > 11 ? Ot : s[ut] < 1 || s[ut] > Fn(s[ye], s[Ot]) ? ut : s[me] < 0 || s[me] > 24 || s[me] === 24 && (s[Ge] !== 0 || s[Nt] !== 0 || s[tr] !== 0) ? me : s[Ge] < 0 || s[Ge] > 59 ? Ge : s[Nt] < 0 || s[Nt] > 59 ? Nt : s[tr] < 0 || s[tr] > 999 ? tr : -1, R(t)._overflowDayOfYear && (r < ye || r > ut) && (r = ut), R(t)._overflowWeeks && r === -1 && (r = Im), R(t)._overflowWeekday && r === -1 && (r = Rm), R(t).overflow = r), t;
  }
  var k_ = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, P_ = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, T_ = /Z|[+-]\d\d(?::?\d\d)?/, Ys = [
    ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
    ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
    ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
    ["GGGG-[W]WW", /\d{4}-W\d\d/, !1],
    ["YYYY-DDD", /\d{4}-\d{3}/],
    ["YYYY-MM", /\d{4}-\d\d/, !1],
    ["YYYYYYMMDD", /[+-]\d{10}/],
    ["YYYYMMDD", /\d{8}/],
    ["GGGG[W]WWE", /\d{4}W\d{3}/],
    ["GGGG[W]WW", /\d{4}W\d{2}/, !1],
    ["YYYYDDD", /\d{7}/],
    ["YYYYMM", /\d{6}/, !1],
    ["YYYY", /\d{4}/, !1]
  ], ho = [
    ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
    ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
    ["HH:mm:ss", /\d\d:\d\d:\d\d/],
    ["HH:mm", /\d\d:\d\d/],
    ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
    ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
    ["HHmmss", /\d\d\d\d\d\d/],
    ["HHmm", /\d\d\d\d/],
    ["HH", /\d\d/]
  ], A_ = /^\/?Date\((-?\d+)/i, V_ = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/, I_ = {
    UT: 0,
    GMT: 0,
    EDT: -4 * 60,
    EST: -5 * 60,
    CDT: -5 * 60,
    CST: -6 * 60,
    MDT: -6 * 60,
    MST: -7 * 60,
    PDT: -7 * 60,
    PST: -8 * 60
  };
  function hc(t) {
    var r, s, n = t._i, o = k_.exec(n) || P_.exec(n), i, l, a, u, d = Ys.length, p = ho.length;
    if (o) {
      for (R(t).iso = !0, r = 0, s = d; r < s; r++)
        if (Ys[r][1].exec(o[1])) {
          l = Ys[r][0], i = Ys[r][2] !== !1;
          break;
        }
      if (l == null) {
        t._isValid = !1;
        return;
      }
      if (o[3]) {
        for (r = 0, s = p; r < s; r++)
          if (ho[r][1].exec(o[3])) {
            a = (o[2] || " ") + ho[r][0];
            break;
          }
        if (a == null) {
          t._isValid = !1;
          return;
        }
      }
      if (!i && a != null) {
        t._isValid = !1;
        return;
      }
      if (o[4])
        if (T_.exec(o[4]))
          u = "Z";
        else {
          t._isValid = !1;
          return;
        }
      t._f = l + (a || "") + (u || ""), Ui(t);
    } else
      t._isValid = !1;
  }
  function R_(t, r, s, n, o, i) {
    var l = [
      Y_(t),
      rc.indexOf(r),
      parseInt(s, 10),
      parseInt(n, 10),
      parseInt(o, 10)
    ];
    return i && l.push(parseInt(i, 10)), l;
  }
  function Y_(t) {
    var r = parseInt(t, 10);
    return r <= 49 ? 2e3 + r : r <= 999 ? 1900 + r : r;
  }
  function F_(t) {
    return t.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
  }
  function U_(t, r, s) {
    if (t) {
      var n = uc.indexOf(t), o = new Date(
        r[0],
        r[1],
        r[2]
      ).getDay();
      if (n !== o)
        return R(s).weekdayMismatch = !0, s._isValid = !1, !1;
    }
    return !0;
  }
  function H_(t, r, s) {
    if (t)
      return I_[t];
    if (r)
      return 0;
    var n = parseInt(s, 10), o = n % 100, i = (n - o) / 100;
    return i * 60 + o;
  }
  function pc(t) {
    var r = V_.exec(F_(t._i)), s;
    if (r) {
      if (s = R_(
        r[4],
        r[3],
        r[2],
        r[5],
        r[6],
        r[7]
      ), !U_(r[1], s, t))
        return;
      t._a = s, t._tzm = H_(r[8], r[9], r[10]), t._d = gs.apply(null, t._a), t._d.setUTCMinutes(t._d.getUTCMinutes() - t._tzm), R(t).rfc2822 = !0;
    } else
      t._isValid = !1;
  }
  function L_(t) {
    var r = A_.exec(t._i);
    if (r !== null) {
      t._d = /* @__PURE__ */ new Date(+r[1]);
      return;
    }
    if (hc(t), t._isValid === !1)
      delete t._isValid;
    else
      return;
    if (pc(t), t._isValid === !1)
      delete t._isValid;
    else
      return;
    t._strict ? t._isValid = !1 : D.createFromInputFallback(t);
  }
  D.createFromInputFallback = Ue(
    "value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
    function(t) {
      t._d = /* @__PURE__ */ new Date(t._i + (t._useUTC ? " UTC" : ""));
    }
  );
  function Sr(t, r, s) {
    return t ?? r ?? s;
  }
  function W_(t) {
    var r = new Date(D.now());
    return t._useUTC ? [
      r.getUTCFullYear(),
      r.getUTCMonth(),
      r.getUTCDate()
    ] : [r.getFullYear(), r.getMonth(), r.getDate()];
  }
  function Fi(t) {
    var r, s, n = [], o, i, l;
    if (!t._d) {
      for (o = W_(t), t._w && t._a[ut] == null && t._a[Ot] == null && j_(t), t._dayOfYear != null && (l = Sr(t._a[ye], o[ye]), (t._dayOfYear > ls(l) || t._dayOfYear === 0) && (R(t)._overflowDayOfYear = !0), s = gs(l, 0, t._dayOfYear), t._a[Ot] = s.getUTCMonth(), t._a[ut] = s.getUTCDate()), r = 0; r < 3 && t._a[r] == null; ++r)
        t._a[r] = n[r] = o[r];
      for (; r < 7; r++)
        t._a[r] = n[r] = t._a[r] == null ? r === 2 ? 1 : 0 : t._a[r];
      t._a[me] === 24 && t._a[Ge] === 0 && t._a[Nt] === 0 && t._a[tr] === 0 && (t._nextDay = !0, t._a[me] = 0), t._d = (t._useUTC ? gs : Jm).apply(
        null,
        n
      ), i = t._useUTC ? t._d.getUTCDay() : t._d.getDay(), t._tzm != null && t._d.setUTCMinutes(t._d.getUTCMinutes() - t._tzm), t._nextDay && (t._a[me] = 24), t._w && typeof t._w.d < "u" && t._w.d !== i && (R(t).weekdayMismatch = !0);
    }
  }
  function j_(t) {
    var r, s, n, o, i, l, a, u, d;
    r = t._w, r.GG != null || r.W != null || r.E != null ? (i = 1, l = 4, s = Sr(
      r.GG,
      t._a[ye],
      ys(se(), 1, 4).year
    ), n = Sr(r.W, 1), o = Sr(r.E, 1), (o < 1 || o > 7) && (u = !0)) : (i = t._locale._week.dow, l = t._locale._week.doy, d = ys(se(), i, l), s = Sr(r.gg, t._a[ye], d.year), n = Sr(r.w, d.week), r.d != null ? (o = r.d, (o < 0 || o > 6) && (u = !0)) : r.e != null ? (o = r.e + i, (r.e < 0 || r.e > 6) && (u = !0)) : o = i), n < 1 || n > Dt(s, i, l) ? R(t)._overflowWeeks = !0 : u != null ? R(t)._overflowWeekday = !0 : (a = ac(s, n, o, i, l), t._a[ye] = a.year, t._dayOfYear = a.dayOfYear);
  }
  D.ISO_8601 = function() {
  };
  D.RFC_2822 = function() {
  };
  function Ui(t) {
    if (t._f === D.ISO_8601) {
      hc(t);
      return;
    }
    if (t._f === D.RFC_2822) {
      pc(t);
      return;
    }
    t._a = [], R(t).empty = !0;
    var r = "" + t._i, s, n, o, i, l, a = r.length, u = 0, d, p;
    for (o = qu(t._f, t._locale).match(Ci) || [], p = o.length, s = 0; s < p; s++)
      i = o[s], n = (r.match(Tm(i, t)) || [])[0], n && (l = r.substr(0, r.indexOf(n)), l.length > 0 && R(t).unusedInput.push(l), r = r.slice(
        r.indexOf(n) + n.length
      ), u += n.length), Tr[i] ? (n ? R(t).empty = !1 : R(t).unusedTokens.push(i), Vm(i, n, t)) : t._strict && !n && R(t).unusedTokens.push(i);
    R(t).charsLeftOver = a - u, r.length > 0 && R(t).unusedInput.push(r), t._a[me] <= 12 && R(t).bigHour === !0 && t._a[me] > 0 && (R(t).bigHour = void 0), R(t).parsedDateParts = t._a.slice(0), R(t).meridiem = t._meridiem, t._a[me] = z_(
      t._locale,
      t._a[me],
      t._meridiem
    ), d = R(t).era, d !== null && (t._a[ye] = t._locale.erasConvertYear(d, t._a[ye])), Fi(t), Yi(t);
  }
  function z_(t, r, s) {
    var n;
    return s == null ? r : t.meridiemHour != null ? t.meridiemHour(r, s) : (t.isPM != null && (n = t.isPM(s), n && r < 12 && (r += 12), !n && r === 12 && (r = 0)), r);
  }
  function B_(t) {
    var r, s, n, o, i, l, a = !1, u = t._f.length;
    if (u === 0) {
      R(t).invalidFormat = !0, t._d = /* @__PURE__ */ new Date(NaN);
      return;
    }
    for (o = 0; o < u; o++)
      i = 0, l = !1, r = xi({}, t), t._useUTC != null && (r._useUTC = t._useUTC), r._f = t._f[o], Ui(r), $i(r) && (l = !0), i += R(r).charsLeftOver, i += R(r).unusedTokens.length * 10, R(r).score = i, a ? i < n && (n = i, s = r) : (n == null || i < n || l) && (n = i, s = r, l && (a = !0));
    Ht(t, s || r);
  }
  function G_(t) {
    if (!t._d) {
      var r = ki(t._i), s = r.day === void 0 ? r.date : r.day;
      t._a = Bu(
        [r.year, r.month, s, r.hour, r.minute, r.second, r.millisecond],
        function(n) {
          return n && parseInt(n, 10);
        }
      ), Fi(t);
    }
  }
  function K_(t) {
    var r = new Ss(Yi(mc(t)));
    return r._nextDay && (r.add(1, "d"), r._nextDay = void 0), r;
  }
  function mc(t) {
    var r = t._i, s = t._f;
    return t._locale = t._locale || Mt(t._l), r === null || s === void 0 && r === "" ? Pn({ nullInput: !0 }) : (typeof r == "string" && (t._i = r = t._locale.preparse(r)), Ze(r) ? new Ss(Yi(r)) : (Ns(r) ? t._d = r : Je(s) ? B_(t) : s ? Ui(t) : q_(t), $i(t) || (t._d = null), t));
  }
  function q_(t) {
    var r = t._i;
    xe(r) ? t._d = new Date(D.now()) : Ns(r) ? t._d = new Date(r.valueOf()) : typeof r == "string" ? L_(t) : Je(r) ? (t._a = Bu(r.slice(0), function(s) {
      return parseInt(s, 10);
    }), Fi(t)) : ur(r) ? G_(t) : $t(r) ? t._d = new Date(r) : D.createFromInputFallback(t);
  }
  function _c(t, r, s, n, o) {
    var i = {};
    return (r === !0 || r === !1) && (n = r, r = void 0), (s === !0 || s === !1) && (n = s, s = void 0), (ur(t) && Di(t) || Je(t) && t.length === 0) && (t = void 0), i._isAMomentObject = !0, i._useUTC = i._isUTC = o, i._l = s, i._i = t, i._f = r, i._strict = n, K_(i);
  }
  function se(t, r, s, n) {
    return _c(t, r, s, n, !1);
  }
  var J_ = Ue(
    "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
    function() {
      var t = se.apply(null, arguments);
      return this.isValid() && t.isValid() ? t < this ? this : t : Pn();
    }
  ), Z_ = Ue(
    "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
    function() {
      var t = se.apply(null, arguments);
      return this.isValid() && t.isValid() ? t > this ? this : t : Pn();
    }
  );
  function vc(t, r) {
    var s, n;
    if (r.length === 1 && Je(r[0]) && (r = r[0]), !r.length)
      return se();
    for (s = r[0], n = 1; n < r.length; ++n)
      (!r[n].isValid() || r[n][t](s)) && (s = r[n]);
    return s;
  }
  function Q_() {
    var t = [].slice.call(arguments, 0);
    return vc("isBefore", t);
  }
  function X_() {
    var t = [].slice.call(arguments, 0);
    return vc("isAfter", t);
  }
  var ev = function() {
    return Date.now ? Date.now() : +/* @__PURE__ */ new Date();
  }, Xr = [
    "year",
    "quarter",
    "month",
    "week",
    "day",
    "hour",
    "minute",
    "second",
    "millisecond"
  ];
  function tv(t) {
    var r, s = !1, n, o = Xr.length;
    for (r in t)
      if (K(t, r) && !(ae.call(Xr, r) !== -1 && (t[r] == null || !isNaN(t[r]))))
        return !1;
    for (n = 0; n < o; ++n)
      if (t[Xr[n]]) {
        if (s)
          return !1;
        parseFloat(t[Xr[n]]) !== U(t[Xr[n]]) && (s = !0);
      }
    return !0;
  }
  function rv() {
    return this._isValid;
  }
  function sv() {
    return Qe(NaN);
  }
  function Hn(t) {
    var r = ki(t), s = r.year || 0, n = r.quarter || 0, o = r.month || 0, i = r.week || r.isoWeek || 0, l = r.day || 0, a = r.hour || 0, u = r.minute || 0, d = r.second || 0, p = r.millisecond || 0;
    this._isValid = tv(r), this._milliseconds = +p + d * 1e3 + // 1000
    u * 6e4 + // 1000 * 60
    a * 1e3 * 60 * 60, this._days = +l + i * 7, this._months = +o + n * 3 + s * 12, this._data = {}, this._locale = Mt(), this._bubble();
  }
  function Js(t) {
    return t instanceof Hn;
  }
  function Bo(t) {
    return t < 0 ? Math.round(-1 * t) * -1 : Math.round(t);
  }
  function nv(t, r, s) {
    var n = Math.min(t.length, r.length), o = Math.abs(t.length - r.length), i = 0, l;
    for (l = 0; l < n; l++)
      (s && t[l] !== r[l] || !s && U(t[l]) !== U(r[l])) && i++;
    return i + o;
  }
  function gc(t, r) {
    k(t, 0, 0, function() {
      var s = this.utcOffset(), n = "+";
      return s < 0 && (s = -s, n = "-"), n + dt(~~(s / 60), 2) + r + dt(~~s % 60, 2);
    });
  }
  gc("Z", ":");
  gc("ZZ", "");
  x("Z", Yn);
  x("ZZ", Yn);
  X(["Z", "ZZ"], function(t, r, s) {
    s._useUTC = !0, s._tzm = Hi(Yn, t);
  });
  var ov = /([\+\-]|\d\d)/gi;
  function Hi(t, r) {
    var s = (r || "").match(t), n, o, i;
    return s === null ? null : (n = s[s.length - 1] || [], o = (n + "").match(ov) || ["-", 0, 0], i = +(o[1] * 60) + U(o[2]), i === 0 ? 0 : o[0] === "+" ? i : -i);
  }
  function Li(t, r) {
    var s, n;
    return r._isUTC ? (s = r.clone(), n = (Ze(t) || Ns(t) ? t.valueOf() : se(t).valueOf()) - s.valueOf(), s._d.setTime(s._d.valueOf() + n), D.updateOffset(s, !1), s) : se(t).local();
  }
  function Go(t) {
    return -Math.round(t._d.getTimezoneOffset());
  }
  D.updateOffset = function() {
  };
  function iv(t, r, s) {
    var n = this._offset || 0, o;
    if (!this.isValid())
      return t != null ? this : NaN;
    if (t != null) {
      if (typeof t == "string") {
        if (t = Hi(Yn, t), t === null)
          return this;
      } else
        Math.abs(t) < 16 && !s && (t = t * 60);
      return !this._isUTC && r && (o = Go(this)), this._offset = t, this._isUTC = !0, o != null && this.add(o, "m"), n !== t && (!r || this._changeInProgress ? Ec(
        this,
        Qe(t - n, "m"),
        1,
        !1
      ) : this._changeInProgress || (this._changeInProgress = !0, D.updateOffset(this, !0), this._changeInProgress = null)), this;
    } else
      return this._isUTC ? n : Go(this);
  }
  function lv(t, r) {
    return t != null ? (typeof t != "string" && (t = -t), this.utcOffset(t, r), this) : -this.utcOffset();
  }
  function av(t) {
    return this.utcOffset(0, t);
  }
  function uv(t) {
    return this._isUTC && (this.utcOffset(0, t), this._isUTC = !1, t && this.subtract(Go(this), "m")), this;
  }
  function cv() {
    if (this._tzm != null)
      this.utcOffset(this._tzm, !1, !0);
    else if (typeof this._i == "string") {
      var t = Hi(km, this._i);
      t != null ? this.utcOffset(t) : this.utcOffset(0, !0);
    }
    return this;
  }
  function dv(t) {
    return this.isValid() ? (t = t ? se(t).utcOffset() : 0, (this.utcOffset() - t) % 60 === 0) : !1;
  }
  function fv() {
    return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
  }
  function hv() {
    if (!xe(this._isDSTShifted))
      return this._isDSTShifted;
    var t = {}, r;
    return xi(t, this), t = mc(t), t._a ? (r = t._isUTC ? pt(t._a) : se(t._a), this._isDSTShifted = this.isValid() && nv(t._a, r.toArray()) > 0) : this._isDSTShifted = !1, this._isDSTShifted;
  }
  function pv() {
    return this.isValid() ? !this._isUTC : !1;
  }
  function mv() {
    return this.isValid() ? this._isUTC : !1;
  }
  function yc() {
    return this.isValid() ? this._isUTC && this._offset === 0 : !1;
  }
  var _v = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/, vv = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
  function Qe(t, r) {
    var s = t, n = null, o, i, l;
    return Js(t) ? s = {
      ms: t._milliseconds,
      d: t._days,
      M: t._months
    } : $t(t) || !isNaN(+t) ? (s = {}, r ? s[r] = +t : s.milliseconds = +t) : (n = _v.exec(t)) ? (o = n[1] === "-" ? -1 : 1, s = {
      y: 0,
      d: U(n[ut]) * o,
      h: U(n[me]) * o,
      m: U(n[Ge]) * o,
      s: U(n[Nt]) * o,
      ms: U(Bo(n[tr] * 1e3)) * o
      // the millisecond decimal point is included in the match
    }) : (n = vv.exec(t)) ? (o = n[1] === "-" ? -1 : 1, s = {
      y: Qt(n[2], o),
      M: Qt(n[3], o),
      w: Qt(n[4], o),
      d: Qt(n[5], o),
      h: Qt(n[6], o),
      m: Qt(n[7], o),
      s: Qt(n[8], o)
    }) : s == null ? s = {} : typeof s == "object" && ("from" in s || "to" in s) && (l = gv(
      se(s.from),
      se(s.to)
    ), s = {}, s.ms = l.milliseconds, s.M = l.months), i = new Hn(s), Js(t) && K(t, "_locale") && (i._locale = t._locale), Js(t) && K(t, "_isValid") && (i._isValid = t._isValid), i;
  }
  Qe.fn = Hn.prototype;
  Qe.invalid = sv;
  function Qt(t, r) {
    var s = t && parseFloat(t.replace(",", "."));
    return (isNaN(s) ? 0 : s) * r;
  }
  function Da(t, r) {
    var s = {};
    return s.months = r.month() - t.month() + (r.year() - t.year()) * 12, t.clone().add(s.months, "M").isAfter(r) && --s.months, s.milliseconds = +r - +t.clone().add(s.months, "M"), s;
  }
  function gv(t, r) {
    var s;
    return t.isValid() && r.isValid() ? (r = Li(r, t), t.isBefore(r) ? s = Da(t, r) : (s = Da(r, t), s.milliseconds = -s.milliseconds, s.months = -s.months), s) : { milliseconds: 0, months: 0 };
  }
  function bc(t, r) {
    return function(s, n) {
      var o, i;
      return n !== null && !isNaN(+n) && (Ku(
        r,
        "moment()." + r + "(period, number) is deprecated. Please use moment()." + r + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
      ), i = s, s = n, n = i), o = Qe(s, n), Ec(this, o, t), this;
    };
  }
  function Ec(t, r, s, n) {
    var o = r._milliseconds, i = Bo(r._days), l = Bo(r._months);
    t.isValid() && (n = n ?? !0, l && nc(t, cn(t, "Month") + l * s), i && Zu(t, "Date", cn(t, "Date") + i * s), o && t._d.setTime(t._d.valueOf() + o * s), n && D.updateOffset(t, i || l));
  }
  var yv = bc(1, "add"), bv = bc(-1, "subtract");
  function wc(t) {
    return typeof t == "string" || t instanceof String;
  }
  function Ev(t) {
    return Ze(t) || Ns(t) || wc(t) || $t(t) || Ov(t) || wv(t) || t === null || t === void 0;
  }
  function wv(t) {
    var r = ur(t) && !Di(t), s = !1, n = [
      "years",
      "year",
      "y",
      "months",
      "month",
      "M",
      "days",
      "day",
      "d",
      "dates",
      "date",
      "D",
      "hours",
      "hour",
      "h",
      "minutes",
      "minute",
      "m",
      "seconds",
      "second",
      "s",
      "milliseconds",
      "millisecond",
      "ms"
    ], o, i, l = n.length;
    for (o = 0; o < l; o += 1)
      i = n[o], s = s || K(t, i);
    return r && s;
  }
  function Ov(t) {
    var r = Je(t), s = !1;
    return r && (s = t.filter(function(n) {
      return !$t(n) && wc(t);
    }).length === 0), r && s;
  }
  function Nv(t) {
    var r = ur(t) && !Di(t), s = !1, n = [
      "sameDay",
      "nextDay",
      "lastDay",
      "nextWeek",
      "lastWeek",
      "sameElse"
    ], o, i;
    for (o = 0; o < n.length; o += 1)
      i = n[o], s = s || K(t, i);
    return r && s;
  }
  function Sv(t, r) {
    var s = t.diff(r, "days", !0);
    return s < -6 ? "sameElse" : s < -1 ? "lastWeek" : s < 0 ? "lastDay" : s < 1 ? "sameDay" : s < 2 ? "nextDay" : s < 7 ? "nextWeek" : "sameElse";
  }
  function Dv(t, r) {
    arguments.length === 1 && (arguments[0] ? Ev(arguments[0]) ? (t = arguments[0], r = void 0) : Nv(arguments[0]) && (r = arguments[0], t = void 0) : (t = void 0, r = void 0));
    var s = t || se(), n = Li(s, this).startOf("day"), o = D.calendarFormat(this, n) || "sameElse", i = r && (mt(r[o]) ? r[o].call(this, s) : r[o]);
    return this.format(
      i || this.localeData().calendar(o, this, se(s))
    );
  }
  function $v() {
    return new Ss(this);
  }
  function xv(t, r) {
    var s = Ze(t) ? t : se(t);
    return this.isValid() && s.isValid() ? (r = He(r) || "millisecond", r === "millisecond" ? this.valueOf() > s.valueOf() : s.valueOf() < this.clone().startOf(r).valueOf()) : !1;
  }
  function Mv(t, r) {
    var s = Ze(t) ? t : se(t);
    return this.isValid() && s.isValid() ? (r = He(r) || "millisecond", r === "millisecond" ? this.valueOf() < s.valueOf() : this.clone().endOf(r).valueOf() < s.valueOf()) : !1;
  }
  function Cv(t, r, s, n) {
    var o = Ze(t) ? t : se(t), i = Ze(r) ? r : se(r);
    return this.isValid() && o.isValid() && i.isValid() ? (n = n || "()", (n[0] === "(" ? this.isAfter(o, s) : !this.isBefore(o, s)) && (n[1] === ")" ? this.isBefore(i, s) : !this.isAfter(i, s))) : !1;
  }
  function kv(t, r) {
    var s = Ze(t) ? t : se(t), n;
    return this.isValid() && s.isValid() ? (r = He(r) || "millisecond", r === "millisecond" ? this.valueOf() === s.valueOf() : (n = s.valueOf(), this.clone().startOf(r).valueOf() <= n && n <= this.clone().endOf(r).valueOf())) : !1;
  }
  function Pv(t, r) {
    return this.isSame(t, r) || this.isAfter(t, r);
  }
  function Tv(t, r) {
    return this.isSame(t, r) || this.isBefore(t, r);
  }
  function Av(t, r, s) {
    var n, o, i;
    if (!this.isValid())
      return NaN;
    if (n = Li(t, this), !n.isValid())
      return NaN;
    switch (o = (n.utcOffset() - this.utcOffset()) * 6e4, r = He(r), r) {
      case "year":
        i = Zs(this, n) / 12;
        break;
      case "month":
        i = Zs(this, n);
        break;
      case "quarter":
        i = Zs(this, n) / 3;
        break;
      case "second":
        i = (this - n) / 1e3;
        break;
      case "minute":
        i = (this - n) / 6e4;
        break;
      case "hour":
        i = (this - n) / 36e5;
        break;
      case "day":
        i = (this - n - o) / 864e5;
        break;
      case "week":
        i = (this - n - o) / 6048e5;
        break;
      default:
        i = this - n;
    }
    return s ? i : Ie(i);
  }
  function Zs(t, r) {
    if (t.date() < r.date())
      return -Zs(r, t);
    var s = (r.year() - t.year()) * 12 + (r.month() - t.month()), n = t.clone().add(s, "months"), o, i;
    return r - n < 0 ? (o = t.clone().add(s - 1, "months"), i = (r - n) / (n - o)) : (o = t.clone().add(s + 1, "months"), i = (r - n) / (o - n)), -(s + i) || 0;
  }
  D.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
  D.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
  function Vv() {
    return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
  }
  function Iv(t) {
    if (!this.isValid())
      return null;
    var r = t !== !0, s = r ? this.clone().utc() : this;
    return s.year() < 0 || s.year() > 9999 ? qs(
      s,
      r ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"
    ) : mt(Date.prototype.toISOString) ? r ? this.toDate().toISOString() : new Date(this.valueOf() + this.utcOffset() * 60 * 1e3).toISOString().replace("Z", qs(s, "Z")) : qs(
      s,
      r ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ"
    );
  }
  function Rv() {
    if (!this.isValid())
      return "moment.invalid(/* " + this._i + " */)";
    var t = "moment", r = "", s, n, o, i;
    return this.isLocal() || (t = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone", r = "Z"), s = "[" + t + '("]', n = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY", o = "-MM-DD[T]HH:mm:ss.SSS", i = r + '[")]', this.format(s + n + o + i);
  }
  function Yv(t) {
    t || (t = this.isUtc() ? D.defaultFormatUtc : D.defaultFormat);
    var r = qs(this, t);
    return this.localeData().postformat(r);
  }
  function Fv(t, r) {
    return this.isValid() && (Ze(t) && t.isValid() || se(t).isValid()) ? Qe({ to: this, from: t }).locale(this.locale()).humanize(!r) : this.localeData().invalidDate();
  }
  function Uv(t) {
    return this.from(se(), t);
  }
  function Hv(t, r) {
    return this.isValid() && (Ze(t) && t.isValid() || se(t).isValid()) ? Qe({ from: this, to: t }).locale(this.locale()).humanize(!r) : this.localeData().invalidDate();
  }
  function Lv(t) {
    return this.to(se(), t);
  }
  function Oc(t) {
    var r;
    return t === void 0 ? this._locale._abbr : (r = Mt(t), r != null && (this._locale = r), this);
  }
  var Nc = Ue(
    "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
    function(t) {
      return t === void 0 ? this.localeData() : this.locale(t);
    }
  );
  function Sc() {
    return this._locale;
  }
  var hn = 1e3, Ar = 60 * hn, pn = 60 * Ar, Dc = (365 * 400 + 97) * 24 * pn;
  function Vr(t, r) {
    return (t % r + r) % r;
  }
  function $c(t, r, s) {
    return t < 100 && t >= 0 ? new Date(t + 400, r, s) - Dc : new Date(t, r, s).valueOf();
  }
  function xc(t, r, s) {
    return t < 100 && t >= 0 ? Date.UTC(t + 400, r, s) - Dc : Date.UTC(t, r, s);
  }
  function Wv(t) {
    var r, s;
    if (t = He(t), t === void 0 || t === "millisecond" || !this.isValid())
      return this;
    switch (s = this._isUTC ? xc : $c, t) {
      case "year":
        r = s(this.year(), 0, 1);
        break;
      case "quarter":
        r = s(
          this.year(),
          this.month() - this.month() % 3,
          1
        );
        break;
      case "month":
        r = s(this.year(), this.month(), 1);
        break;
      case "week":
        r = s(
          this.year(),
          this.month(),
          this.date() - this.weekday()
        );
        break;
      case "isoWeek":
        r = s(
          this.year(),
          this.month(),
          this.date() - (this.isoWeekday() - 1)
        );
        break;
      case "day":
      case "date":
        r = s(this.year(), this.month(), this.date());
        break;
      case "hour":
        r = this._d.valueOf(), r -= Vr(
          r + (this._isUTC ? 0 : this.utcOffset() * Ar),
          pn
        );
        break;
      case "minute":
        r = this._d.valueOf(), r -= Vr(r, Ar);
        break;
      case "second":
        r = this._d.valueOf(), r -= Vr(r, hn);
        break;
    }
    return this._d.setTime(r), D.updateOffset(this, !0), this;
  }
  function jv(t) {
    var r, s;
    if (t = He(t), t === void 0 || t === "millisecond" || !this.isValid())
      return this;
    switch (s = this._isUTC ? xc : $c, t) {
      case "year":
        r = s(this.year() + 1, 0, 1) - 1;
        break;
      case "quarter":
        r = s(
          this.year(),
          this.month() - this.month() % 3 + 3,
          1
        ) - 1;
        break;
      case "month":
        r = s(this.year(), this.month() + 1, 1) - 1;
        break;
      case "week":
        r = s(
          this.year(),
          this.month(),
          this.date() - this.weekday() + 7
        ) - 1;
        break;
      case "isoWeek":
        r = s(
          this.year(),
          this.month(),
          this.date() - (this.isoWeekday() - 1) + 7
        ) - 1;
        break;
      case "day":
      case "date":
        r = s(this.year(), this.month(), this.date() + 1) - 1;
        break;
      case "hour":
        r = this._d.valueOf(), r += pn - Vr(
          r + (this._isUTC ? 0 : this.utcOffset() * Ar),
          pn
        ) - 1;
        break;
      case "minute":
        r = this._d.valueOf(), r += Ar - Vr(r, Ar) - 1;
        break;
      case "second":
        r = this._d.valueOf(), r += hn - Vr(r, hn) - 1;
        break;
    }
    return this._d.setTime(r), D.updateOffset(this, !0), this;
  }
  function zv() {
    return this._d.valueOf() - (this._offset || 0) * 6e4;
  }
  function Bv() {
    return Math.floor(this.valueOf() / 1e3);
  }
  function Gv() {
    return new Date(this.valueOf());
  }
  function Kv() {
    var t = this;
    return [
      t.year(),
      t.month(),
      t.date(),
      t.hour(),
      t.minute(),
      t.second(),
      t.millisecond()
    ];
  }
  function qv() {
    var t = this;
    return {
      years: t.year(),
      months: t.month(),
      date: t.date(),
      hours: t.hours(),
      minutes: t.minutes(),
      seconds: t.seconds(),
      milliseconds: t.milliseconds()
    };
  }
  function Jv() {
    return this.isValid() ? this.toISOString() : null;
  }
  function Zv() {
    return $i(this);
  }
  function Qv() {
    return Ht({}, R(this));
  }
  function Xv() {
    return R(this).overflow;
  }
  function eg() {
    return {
      input: this._i,
      format: this._f,
      locale: this._locale,
      isUTC: this._isUTC,
      strict: this._strict
    };
  }
  k("N", 0, 0, "eraAbbr");
  k("NN", 0, 0, "eraAbbr");
  k("NNN", 0, 0, "eraAbbr");
  k("NNNN", 0, 0, "eraName");
  k("NNNNN", 0, 0, "eraNarrow");
  k("y", ["y", 1], "yo", "eraYear");
  k("y", ["yy", 2], 0, "eraYear");
  k("y", ["yyy", 3], 0, "eraYear");
  k("y", ["yyyy", 4], 0, "eraYear");
  x("N", Wi);
  x("NN", Wi);
  x("NNN", Wi);
  x("NNNN", dg);
  x("NNNNN", fg);
  X(
    ["N", "NN", "NNN", "NNNN", "NNNNN"],
    function(t, r, s, n) {
      var o = s._locale.erasParse(t, n, s._strict);
      o ? R(s).era = o : R(s).invalidEra = t;
    }
  );
  x("y", zr);
  x("yy", zr);
  x("yyy", zr);
  x("yyyy", zr);
  x("yo", hg);
  X(["y", "yy", "yyy", "yyyy"], ye);
  X(["yo"], function(t, r, s, n) {
    var o;
    s._locale._eraYearOrdinalRegex && (o = t.match(s._locale._eraYearOrdinalRegex)), s._locale.eraYearOrdinalParse ? r[ye] = s._locale.eraYearOrdinalParse(t, o) : r[ye] = parseInt(t, 10);
  });
  function tg(t, r) {
    var s, n, o, i = this._eras || Mt("en")._eras;
    for (s = 0, n = i.length; s < n; ++s) {
      switch (typeof i[s].since) {
        case "string":
          o = D(i[s].since).startOf("day"), i[s].since = o.valueOf();
          break;
      }
      switch (typeof i[s].until) {
        case "undefined":
          i[s].until = 1 / 0;
          break;
        case "string":
          o = D(i[s].until).startOf("day").valueOf(), i[s].until = o.valueOf();
          break;
      }
    }
    return i;
  }
  function rg(t, r, s) {
    var n, o, i = this.eras(), l, a, u;
    for (t = t.toUpperCase(), n = 0, o = i.length; n < o; ++n)
      if (l = i[n].name.toUpperCase(), a = i[n].abbr.toUpperCase(), u = i[n].narrow.toUpperCase(), s)
        switch (r) {
          case "N":
          case "NN":
          case "NNN":
            if (a === t)
              return i[n];
            break;
          case "NNNN":
            if (l === t)
              return i[n];
            break;
          case "NNNNN":
            if (u === t)
              return i[n];
            break;
        }
      else if ([l, a, u].indexOf(t) >= 0)
        return i[n];
  }
  function sg(t, r) {
    var s = t.since <= t.until ? 1 : -1;
    return r === void 0 ? D(t.since).year() : D(t.since).year() + (r - t.offset) * s;
  }
  function ng() {
    var t, r, s, n = this.localeData().eras();
    for (t = 0, r = n.length; t < r; ++t)
      if (s = this.clone().startOf("day").valueOf(), n[t].since <= s && s <= n[t].until || n[t].until <= s && s <= n[t].since)
        return n[t].name;
    return "";
  }
  function og() {
    var t, r, s, n = this.localeData().eras();
    for (t = 0, r = n.length; t < r; ++t)
      if (s = this.clone().startOf("day").valueOf(), n[t].since <= s && s <= n[t].until || n[t].until <= s && s <= n[t].since)
        return n[t].narrow;
    return "";
  }
  function ig() {
    var t, r, s, n = this.localeData().eras();
    for (t = 0, r = n.length; t < r; ++t)
      if (s = this.clone().startOf("day").valueOf(), n[t].since <= s && s <= n[t].until || n[t].until <= s && s <= n[t].since)
        return n[t].abbr;
    return "";
  }
  function lg() {
    var t, r, s, n, o = this.localeData().eras();
    for (t = 0, r = o.length; t < r; ++t)
      if (s = o[t].since <= o[t].until ? 1 : -1, n = this.clone().startOf("day").valueOf(), o[t].since <= n && n <= o[t].until || o[t].until <= n && n <= o[t].since)
        return (this.year() - D(o[t].since).year()) * s + o[t].offset;
    return this.year();
  }
  function ag(t) {
    return K(this, "_erasNameRegex") || ji.call(this), t ? this._erasNameRegex : this._erasRegex;
  }
  function ug(t) {
    return K(this, "_erasAbbrRegex") || ji.call(this), t ? this._erasAbbrRegex : this._erasRegex;
  }
  function cg(t) {
    return K(this, "_erasNarrowRegex") || ji.call(this), t ? this._erasNarrowRegex : this._erasRegex;
  }
  function Wi(t, r) {
    return r.erasAbbrRegex(t);
  }
  function dg(t, r) {
    return r.erasNameRegex(t);
  }
  function fg(t, r) {
    return r.erasNarrowRegex(t);
  }
  function hg(t, r) {
    return r._eraYearOrdinalRegex || zr;
  }
  function ji() {
    var t = [], r = [], s = [], n = [], o, i, l = this.eras();
    for (o = 0, i = l.length; o < i; ++o)
      r.push(Pe(l[o].name)), t.push(Pe(l[o].abbr)), s.push(Pe(l[o].narrow)), n.push(Pe(l[o].name)), n.push(Pe(l[o].abbr)), n.push(Pe(l[o].narrow));
    this._erasRegex = new RegExp("^(" + n.join("|") + ")", "i"), this._erasNameRegex = new RegExp("^(" + r.join("|") + ")", "i"), this._erasAbbrRegex = new RegExp("^(" + t.join("|") + ")", "i"), this._erasNarrowRegex = new RegExp(
      "^(" + s.join("|") + ")",
      "i"
    );
  }
  k(0, ["gg", 2], 0, function() {
    return this.weekYear() % 100;
  });
  k(0, ["GG", 2], 0, function() {
    return this.isoWeekYear() % 100;
  });
  function Ln(t, r) {
    k(0, [t, t.length], 0, r);
  }
  Ln("gggg", "weekYear");
  Ln("ggggg", "weekYear");
  Ln("GGGG", "isoWeekYear");
  Ln("GGGGG", "isoWeekYear");
  be("weekYear", "gg");
  be("isoWeekYear", "GG");
  Ee("weekYear", 1);
  Ee("isoWeekYear", 1);
  x("G", Rn);
  x("g", Rn);
  x("GG", ne, Ve);
  x("gg", ne, Ve);
  x("GGGG", Ti, Pi);
  x("gggg", Ti, Pi);
  x("GGGGG", In, An);
  x("ggggg", In, An);
  $s(
    ["gggg", "ggggg", "GGGG", "GGGGG"],
    function(t, r, s, n) {
      r[n.substr(0, 2)] = U(t);
    }
  );
  $s(["gg", "GG"], function(t, r, s, n) {
    r[n] = D.parseTwoDigitYear(t);
  });
  function pg(t) {
    return Mc.call(
      this,
      t,
      this.week(),
      this.weekday(),
      this.localeData()._week.dow,
      this.localeData()._week.doy
    );
  }
  function mg(t) {
    return Mc.call(
      this,
      t,
      this.isoWeek(),
      this.isoWeekday(),
      1,
      4
    );
  }
  function _g() {
    return Dt(this.year(), 1, 4);
  }
  function vg() {
    return Dt(this.isoWeekYear(), 1, 4);
  }
  function gg() {
    var t = this.localeData()._week;
    return Dt(this.year(), t.dow, t.doy);
  }
  function yg() {
    var t = this.localeData()._week;
    return Dt(this.weekYear(), t.dow, t.doy);
  }
  function Mc(t, r, s, n, o) {
    var i;
    return t == null ? ys(this, n, o).year : (i = Dt(t, n, o), r > i && (r = i), bg.call(this, t, r, s, n, o));
  }
  function bg(t, r, s, n, o) {
    var i = ac(t, r, s, n, o), l = gs(i.year, 0, i.dayOfYear);
    return this.year(l.getUTCFullYear()), this.month(l.getUTCMonth()), this.date(l.getUTCDate()), this;
  }
  k("Q", 0, "Qo", "quarter");
  be("quarter", "Q");
  Ee("quarter", 7);
  x("Q", Qu);
  X("Q", function(t, r) {
    r[Ot] = (U(t) - 1) * 3;
  });
  function Eg(t) {
    return t == null ? Math.ceil((this.month() + 1) / 3) : this.month((t - 1) * 3 + this.month() % 3);
  }
  k("D", ["DD", 2], "Do", "date");
  be("date", "D");
  Ee("date", 9);
  x("D", ne);
  x("DD", ne, Ve);
  x("Do", function(t, r) {
    return t ? r._dayOfMonthOrdinalParse || r._ordinalParse : r._dayOfMonthOrdinalParseLenient;
  });
  X(["D", "DD"], ut);
  X("Do", function(t, r) {
    r[ut] = U(t.match(ne)[0]);
  });
  var Cc = jr("Date", !0);
  k("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
  be("dayOfYear", "DDD");
  Ee("dayOfYear", 4);
  x("DDD", Vn);
  x("DDDD", Xu);
  X(["DDD", "DDDD"], function(t, r, s) {
    s._dayOfYear = U(t);
  });
  function wg(t) {
    var r = Math.round(
      (this.clone().startOf("day") - this.clone().startOf("year")) / 864e5
    ) + 1;
    return t == null ? r : this.add(t - r, "d");
  }
  k("m", ["mm", 2], 0, "minute");
  be("minute", "m");
  Ee("minute", 14);
  x("m", ne);
  x("mm", ne, Ve);
  X(["m", "mm"], Ge);
  var Og = jr("Minutes", !1);
  k("s", ["ss", 2], 0, "second");
  be("second", "s");
  Ee("second", 15);
  x("s", ne);
  x("ss", ne, Ve);
  X(["s", "ss"], Nt);
  var Ng = jr("Seconds", !1);
  k("S", 0, 0, function() {
    return ~~(this.millisecond() / 100);
  });
  k(0, ["SS", 2], 0, function() {
    return ~~(this.millisecond() / 10);
  });
  k(0, ["SSS", 3], 0, "millisecond");
  k(0, ["SSSS", 4], 0, function() {
    return this.millisecond() * 10;
  });
  k(0, ["SSSSS", 5], 0, function() {
    return this.millisecond() * 100;
  });
  k(0, ["SSSSSS", 6], 0, function() {
    return this.millisecond() * 1e3;
  });
  k(0, ["SSSSSSS", 7], 0, function() {
    return this.millisecond() * 1e4;
  });
  k(0, ["SSSSSSSS", 8], 0, function() {
    return this.millisecond() * 1e5;
  });
  k(0, ["SSSSSSSSS", 9], 0, function() {
    return this.millisecond() * 1e6;
  });
  be("millisecond", "ms");
  Ee("millisecond", 16);
  x("S", Vn, Qu);
  x("SS", Vn, Ve);
  x("SSS", Vn, Xu);
  var Lt, kc;
  for (Lt = "SSSS"; Lt.length <= 9; Lt += "S")
    x(Lt, zr);
  function Sg(t, r) {
    r[tr] = U(("0." + t) * 1e3);
  }
  for (Lt = "S"; Lt.length <= 9; Lt += "S")
    X(Lt, Sg);
  kc = jr("Milliseconds", !1);
  k("z", 0, 0, "zoneAbbr");
  k("zz", 0, 0, "zoneName");
  function Dg() {
    return this._isUTC ? "UTC" : "";
  }
  function $g() {
    return this._isUTC ? "Coordinated Universal Time" : "";
  }
  var b = Ss.prototype;
  b.add = yv;
  b.calendar = Dv;
  b.clone = $v;
  b.diff = Av;
  b.endOf = jv;
  b.format = Yv;
  b.from = Fv;
  b.fromNow = Uv;
  b.to = Hv;
  b.toNow = Lv;
  b.get = Mm;
  b.invalidAt = Xv;
  b.isAfter = xv;
  b.isBefore = Mv;
  b.isBetween = Cv;
  b.isSame = kv;
  b.isSameOrAfter = Pv;
  b.isSameOrBefore = Tv;
  b.isValid = Zv;
  b.lang = Nc;
  b.locale = Oc;
  b.localeData = Sc;
  b.max = Z_;
  b.min = J_;
  b.parsingFlags = Qv;
  b.set = Cm;
  b.startOf = Wv;
  b.subtract = bv;
  b.toArray = Kv;
  b.toObject = qv;
  b.toDate = Gv;
  b.toISOString = Iv;
  b.inspect = Rv;
  typeof Symbol < "u" && Symbol.for != null && (b[Symbol.for("nodejs.util.inspect.custom")] = function() {
    return "Moment<" + this.format() + ">";
  });
  b.toJSON = Jv;
  b.toString = Vv;
  b.unix = Bv;
  b.valueOf = zv;
  b.creationData = eg;
  b.eraName = ng;
  b.eraNarrow = og;
  b.eraAbbr = ig;
  b.eraYear = lg;
  b.year = lc;
  b.isLeapYear = qm;
  b.weekYear = pg;
  b.isoWeekYear = mg;
  b.quarter = b.quarters = Eg;
  b.month = oc;
  b.daysInMonth = Bm;
  b.week = b.weeks = t_;
  b.isoWeek = b.isoWeeks = r_;
  b.weeksInYear = gg;
  b.weeksInWeekYear = yg;
  b.isoWeeksInYear = _g;
  b.isoWeeksInISOWeekYear = vg;
  b.date = Cc;
  b.day = b.days = m_;
  b.weekday = __;
  b.isoWeekday = v_;
  b.dayOfYear = wg;
  b.hour = b.hours = N_;
  b.minute = b.minutes = Og;
  b.second = b.seconds = Ng;
  b.millisecond = b.milliseconds = kc;
  b.utcOffset = iv;
  b.utc = av;
  b.local = uv;
  b.parseZone = cv;
  b.hasAlignedHourOffset = dv;
  b.isDST = fv;
  b.isLocal = pv;
  b.isUtcOffset = mv;
  b.isUtc = yc;
  b.isUTC = yc;
  b.zoneAbbr = Dg;
  b.zoneName = $g;
  b.dates = Ue(
    "dates accessor is deprecated. Use date instead.",
    Cc
  );
  b.months = Ue(
    "months accessor is deprecated. Use month instead",
    oc
  );
  b.years = Ue(
    "years accessor is deprecated. Use year instead",
    lc
  );
  b.zone = Ue(
    "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
    lv
  );
  b.isDSTShifted = Ue(
    "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
    hv
  );
  function xg(t) {
    return se(t * 1e3);
  }
  function Mg() {
    return se.apply(null, arguments).parseZone();
  }
  function Pc(t) {
    return t;
  }
  var q = Mi.prototype;
  q.calendar = mm;
  q.longDateFormat = ym;
  q.invalidDate = Em;
  q.ordinal = Nm;
  q.preparse = Pc;
  q.postformat = Pc;
  q.relativeTime = Dm;
  q.pastFuture = $m;
  q.set = hm;
  q.eras = tg;
  q.erasParse = rg;
  q.erasConvertYear = sg;
  q.erasAbbrRegex = ug;
  q.erasNameRegex = ag;
  q.erasNarrowRegex = cg;
  q.months = Lm;
  q.monthsShort = Wm;
  q.monthsParse = zm;
  q.monthsRegex = Km;
  q.monthsShortRegex = Gm;
  q.week = Zm;
  q.firstDayOfYear = e_;
  q.firstDayOfWeek = Xm;
  q.weekdays = c_;
  q.weekdaysMin = f_;
  q.weekdaysShort = d_;
  q.weekdaysParse = p_;
  q.weekdaysRegex = g_;
  q.weekdaysShortRegex = y_;
  q.weekdaysMinRegex = b_;
  q.isPM = w_;
  q.meridiem = S_;
  function mn(t, r, s, n) {
    var o = Mt(), i = pt().set(n, r);
    return o[s](i, t);
  }
  function Tc(t, r, s) {
    if ($t(t) && (r = t, t = void 0), t = t || "", r != null)
      return mn(t, r, s, "month");
    var n, o = [];
    for (n = 0; n < 12; n++)
      o[n] = mn(t, n, s, "month");
    return o;
  }
  function zi(t, r, s, n) {
    typeof t == "boolean" ? ($t(r) && (s = r, r = void 0), r = r || "") : (r = t, s = r, t = !1, $t(r) && (s = r, r = void 0), r = r || "");
    var o = Mt(), i = t ? o._week.dow : 0, l, a = [];
    if (s != null)
      return mn(r, (s + i) % 7, n, "day");
    for (l = 0; l < 7; l++)
      a[l] = mn(r, (l + i) % 7, n, "day");
    return a;
  }
  function Cg(t, r) {
    return Tc(t, r, "months");
  }
  function kg(t, r) {
    return Tc(t, r, "monthsShort");
  }
  function Pg(t, r, s) {
    return zi(t, r, s, "weekdays");
  }
  function Tg(t, r, s) {
    return zi(t, r, s, "weekdaysShort");
  }
  function Ag(t, r, s) {
    return zi(t, r, s, "weekdaysMin");
  }
  jt("en", {
    eras: [
      {
        since: "0001-01-01",
        until: 1 / 0,
        offset: 1,
        name: "Anno Domini",
        narrow: "AD",
        abbr: "AD"
      },
      {
        since: "0000-12-31",
        until: -1 / 0,
        offset: 1,
        name: "Before Christ",
        narrow: "BC",
        abbr: "BC"
      }
    ],
    dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
    ordinal: function(t) {
      var r = t % 10, s = U(t % 100 / 10) === 1 ? "th" : r === 1 ? "st" : r === 2 ? "nd" : r === 3 ? "rd" : "th";
      return t + s;
    }
  });
  D.lang = Ue(
    "moment.lang is deprecated. Use moment.locale instead.",
    jt
  );
  D.langData = Ue(
    "moment.langData is deprecated. Use moment.localeData instead.",
    Mt
  );
  var yt = Math.abs;
  function Vg() {
    var t = this._data;
    return this._milliseconds = yt(this._milliseconds), this._days = yt(this._days), this._months = yt(this._months), t.milliseconds = yt(t.milliseconds), t.seconds = yt(t.seconds), t.minutes = yt(t.minutes), t.hours = yt(t.hours), t.months = yt(t.months), t.years = yt(t.years), this;
  }
  function Ac(t, r, s, n) {
    var o = Qe(r, s);
    return t._milliseconds += n * o._milliseconds, t._days += n * o._days, t._months += n * o._months, t._bubble();
  }
  function Ig(t, r) {
    return Ac(this, t, r, 1);
  }
  function Rg(t, r) {
    return Ac(this, t, r, -1);
  }
  function $a(t) {
    return t < 0 ? Math.floor(t) : Math.ceil(t);
  }
  function Yg() {
    var t = this._milliseconds, r = this._days, s = this._months, n = this._data, o, i, l, a, u;
    return t >= 0 && r >= 0 && s >= 0 || t <= 0 && r <= 0 && s <= 0 || (t += $a(Ko(s) + r) * 864e5, r = 0, s = 0), n.milliseconds = t % 1e3, o = Ie(t / 1e3), n.seconds = o % 60, i = Ie(o / 60), n.minutes = i % 60, l = Ie(i / 60), n.hours = l % 24, r += Ie(l / 24), u = Ie(Vc(r)), s += u, r -= $a(Ko(u)), a = Ie(s / 12), s %= 12, n.days = r, n.months = s, n.years = a, this;
  }
  function Vc(t) {
    return t * 4800 / 146097;
  }
  function Ko(t) {
    return t * 146097 / 4800;
  }
  function Fg(t) {
    if (!this.isValid())
      return NaN;
    var r, s, n = this._milliseconds;
    if (t = He(t), t === "month" || t === "quarter" || t === "year")
      switch (r = this._days + n / 864e5, s = this._months + Vc(r), t) {
        case "month":
          return s;
        case "quarter":
          return s / 3;
        case "year":
          return s / 12;
      }
    else
      switch (r = this._days + Math.round(Ko(this._months)), t) {
        case "week":
          return r / 7 + n / 6048e5;
        case "day":
          return r + n / 864e5;
        case "hour":
          return r * 24 + n / 36e5;
        case "minute":
          return r * 1440 + n / 6e4;
        case "second":
          return r * 86400 + n / 1e3;
        case "millisecond":
          return Math.floor(r * 864e5) + n;
        default:
          throw new Error("Unknown unit " + t);
      }
  }
  function Ug() {
    return this.isValid() ? this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + U(this._months / 12) * 31536e6 : NaN;
  }
  function Ct(t) {
    return function() {
      return this.as(t);
    };
  }
  var Hg = Ct("ms"), Lg = Ct("s"), Wg = Ct("m"), jg = Ct("h"), zg = Ct("d"), Bg = Ct("w"), Gg = Ct("M"), Kg = Ct("Q"), qg = Ct("y");
  function Jg() {
    return Qe(this);
  }
  function Zg(t) {
    return t = He(t), this.isValid() ? this[t + "s"]() : NaN;
  }
  function vr(t) {
    return function() {
      return this.isValid() ? this._data[t] : NaN;
    };
  }
  var Qg = vr("milliseconds"), Xg = vr("seconds"), ey = vr("minutes"), ty = vr("hours"), ry = vr("days"), sy = vr("months"), ny = vr("years");
  function oy() {
    return Ie(this.days() / 7);
  }
  var wt = Math.round, Mr = {
    ss: 44,
    // a few seconds to seconds
    s: 45,
    // seconds to minute
    m: 45,
    // minutes to hour
    h: 22,
    // hours to day
    d: 26,
    // days to month/week
    w: null,
    // weeks to month
    M: 11
    // months to year
  };
  function iy(t, r, s, n, o) {
    return o.relativeTime(r || 1, !!s, t, n);
  }
  function ly(t, r, s, n) {
    var o = Qe(t).abs(), i = wt(o.as("s")), l = wt(o.as("m")), a = wt(o.as("h")), u = wt(o.as("d")), d = wt(o.as("M")), p = wt(o.as("w")), h = wt(o.as("y")), _ = i <= s.ss && ["s", i] || i < s.s && ["ss", i] || l <= 1 && ["m"] || l < s.m && ["mm", l] || a <= 1 && ["h"] || a < s.h && ["hh", a] || u <= 1 && ["d"] || u < s.d && ["dd", u];
    return s.w != null && (_ = _ || p <= 1 && ["w"] || p < s.w && ["ww", p]), _ = _ || d <= 1 && ["M"] || d < s.M && ["MM", d] || h <= 1 && ["y"] || ["yy", h], _[2] = r, _[3] = +t > 0, _[4] = n, iy.apply(null, _);
  }
  function ay(t) {
    return t === void 0 ? wt : typeof t == "function" ? (wt = t, !0) : !1;
  }
  function uy(t, r) {
    return Mr[t] === void 0 ? !1 : r === void 0 ? Mr[t] : (Mr[t] = r, t === "s" && (Mr.ss = r - 1), !0);
  }
  function cy(t, r) {
    if (!this.isValid())
      return this.localeData().invalidDate();
    var s = !1, n = Mr, o, i;
    return typeof t == "object" && (r = t, t = !1), typeof t == "boolean" && (s = t), typeof r == "object" && (n = Object.assign({}, Mr, r), r.s != null && r.ss == null && (n.ss = r.s - 1)), o = this.localeData(), i = ly(this, !s, n, o), s && (i = o.pastFuture(+this, i)), o.postformat(i);
  }
  var po = Math.abs;
  function wr(t) {
    return (t > 0) - (t < 0) || +t;
  }
  function Wn() {
    if (!this.isValid())
      return this.localeData().invalidDate();
    var t = po(this._milliseconds) / 1e3, r = po(this._days), s = po(this._months), n, o, i, l, a = this.asSeconds(), u, d, p, h;
    return a ? (n = Ie(t / 60), o = Ie(n / 60), t %= 60, n %= 60, i = Ie(s / 12), s %= 12, l = t ? t.toFixed(3).replace(/\.?0+$/, "") : "", u = a < 0 ? "-" : "", d = wr(this._months) !== wr(a) ? "-" : "", p = wr(this._days) !== wr(a) ? "-" : "", h = wr(this._milliseconds) !== wr(a) ? "-" : "", u + "P" + (i ? d + i + "Y" : "") + (s ? d + s + "M" : "") + (r ? p + r + "D" : "") + (o || n || t ? "T" : "") + (o ? h + o + "H" : "") + (n ? h + n + "M" : "") + (t ? h + l + "S" : "")) : "P0D";
  }
  var B = Hn.prototype;
  B.isValid = rv;
  B.abs = Vg;
  B.add = Ig;
  B.subtract = Rg;
  B.as = Fg;
  B.asMilliseconds = Hg;
  B.asSeconds = Lg;
  B.asMinutes = Wg;
  B.asHours = jg;
  B.asDays = zg;
  B.asWeeks = Bg;
  B.asMonths = Gg;
  B.asQuarters = Kg;
  B.asYears = qg;
  B.valueOf = Ug;
  B._bubble = Yg;
  B.clone = Jg;
  B.get = Zg;
  B.milliseconds = Qg;
  B.seconds = Xg;
  B.minutes = ey;
  B.hours = ty;
  B.days = ry;
  B.weeks = oy;
  B.months = sy;
  B.years = ny;
  B.humanize = cy;
  B.toISOString = Wn;
  B.toString = Wn;
  B.toJSON = Wn;
  B.locale = Oc;
  B.localeData = Sc;
  B.toIsoString = Ue(
    "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
    Wn
  );
  B.lang = Nc;
  k("X", 0, 0, "unix");
  k("x", 0, 0, "valueOf");
  x("x", Rn);
  x("X", Pm);
  X("X", function(t, r, s) {
    s._d = new Date(parseFloat(t) * 1e3);
  });
  X("x", function(t, r, s) {
    s._d = new Date(U(t));
  });
  //! moment.js
  D.version = "2.29.4";
  dm(se);
  D.fn = b;
  D.min = Q_;
  D.max = X_;
  D.now = ev;
  D.utc = pt;
  D.unix = xg;
  D.months = Cg;
  D.isDate = Ns;
  D.locale = jt;
  D.invalid = Pn;
  D.duration = Qe;
  D.isMoment = Ze;
  D.weekdays = Pg;
  D.parseZone = Mg;
  D.localeData = Mt;
  D.isDuration = Js;
  D.monthsShort = kg;
  D.weekdaysMin = Ag;
  D.defineLocale = Ri;
  D.updateLocale = M_;
  D.locales = C_;
  D.weekdaysShort = Tg;
  D.normalizeUnits = He;
  D.relativeTimeRounding = ay;
  D.relativeTimeThreshold = uy;
  D.calendarFormat = Sv;
  D.prototype = b;
  D.HTML5_FMT = {
    DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
    // <input type="datetime-local" />
    DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
    // <input type="datetime-local" step="1" />
    DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
    // <input type="datetime-local" step="0.001" />
    DATE: "YYYY-MM-DD",
    // <input type="date" />
    TIME: "HH:mm",
    // <input type="time" />
    TIME_SECONDS: "HH:mm:ss",
    // <input type="time" step="1" />
    TIME_MS: "HH:mm:ss.SSS",
    // <input type="time" step="0.001" />
    WEEK: "GGGG-[W]WW",
    // <input type="week" />
    MONTH: "YYYY-MM"
    // <input type="month" />
  };
  class dy {
    constructor(r, s) {
      J(this, "http");
      J(this, "baseUrl");
      J(this, "jsonParseReviver");
      this.http = s || window, this.baseUrl = r ?? "";
    }
    getAuditHistory() {
      let r = this.baseUrl + "/cdn/api/management/GetAuditHistory";
      r = r.replace(/[?&]$/, "");
      let s = {
        method: "GET",
        headers: {
          Accept: "application/json"
        }
      };
      return this.http.fetch(r, s).then((n) => this.processGetAuditHistory(n));
    }
    processGetAuditHistory(r) {
      const s = r.status;
      let n = {};
      r.headers && r.headers.forEach && r.headers.forEach((i, l) => n[l] = i);
      let o = [];
      return s === 200 ? r.text().then((i) => {
        let l = null, a = i === "" ? null : mo(i, this.jsonParseReviver);
        if (Array.isArray(a)) {
          l = [];
          for (let u of a)
            l.push(Bi.fromJS(u, o));
        } else
          l = null;
        return l;
      }) : s !== 200 && s !== 204 ? r.text().then((i) => _o("An unexpected server error occurred.", s, i, n)) : Promise.resolve(null);
    }
    getProviders(r) {
      let s = this.baseUrl + "/cdn/api/management/GetProviders?";
      if (r === null)
        throw new Error("The parameter 'id' cannot be null.");
      r !== void 0 && (s += "id=" + encodeURIComponent("" + r) + "&"), s = s.replace(/[?&]$/, "");
      let n = {
        method: "GET",
        headers: {
          Accept: "application/json"
        }
      };
      return this.http.fetch(s, n).then((o) => this.processGetProviders(o));
    }
    processGetProviders(r) {
      const s = r.status;
      let n = {};
      r.headers && r.headers.forEach && r.headers.forEach((i, l) => n[l] = i);
      let o = [];
      return s === 200 ? r.text().then((i) => {
        let l = null, a = i === "" ? null : mo(i, this.jsonParseReviver);
        if (Array.isArray(a)) {
          l = [];
          for (let u of a)
            l.push(Gi.fromJS(u, o));
        } else
          l = null;
        return l;
      }) : s !== 200 && s !== 204 ? r.text().then((i) => _o("An unexpected server error occurred.", s, i, n)) : Promise.resolve(null);
    }
    refreshForNode(r, s, n) {
      let o = this.baseUrl + "/cdn/api/management/RefreshForNode?";
      if (r == null)
        throw new Error("The parameter 'id' must be defined and cannot be null.");
      o += "id=" + encodeURIComponent("" + r) + "&", s != null && (o += "providerId=" + encodeURIComponent("" + s) + "&"), n != null && (o += "domain=" + encodeURIComponent("" + n) + "&"), o = o.replace(/[?&]$/, "");
      let i = {
        method: "GET",
        headers: {
          Accept: "application/json"
        }
      };
      return this.http.fetch(o, i).then((l) => this.processRefreshForNode(l));
    }
    processRefreshForNode(r) {
      const s = r.status;
      let n = {};
      r.headers && r.headers.forEach && r.headers.forEach((i, l) => n[l] = i);
      let o = [];
      return s === 200 ? r.text().then((i) => {
        let l = null, a = i === "" ? null : mo(i, this.jsonParseReviver);
        return l = a ? Ki.fromJS(a, o) : null, l;
      }) : s !== 200 && s !== 204 ? r.text().then((i) => _o("An unexpected server error occurred.", s, i, n)) : Promise.resolve(null);
    }
  }
  class Bi {
    constructor(r) {
      J(this, "name");
      J(this, "date");
      J(this, "message");
      J(this, "details");
      J(this, "username");
      if (r)
        for (var s in r)
          r.hasOwnProperty(s) && (this[s] = r[s]);
    }
    init(r, s) {
      r && (this.name = r.name !== void 0 ? r.name : null, this.date = r.date ? (void 0)(r.date.toString()) : null, this.message = r.message !== void 0 ? r.message : null, this.details = r.details !== void 0 ? r.details : null, this.username = r.username !== void 0 ? r.username : null);
    }
    static fromJS(r, s) {
      return r = typeof r == "object" ? r : {}, xs(r, s, Bi);
    }
    toJSON(r) {
      return r = typeof r == "object" ? r : {}, r.name = this.name !== void 0 ? this.name : null, r.date = this.date ? this.date.toISOString(!0) : null, r.message = this.message !== void 0 ? this.message : null, r.details = this.details !== void 0 ? this.details : null, r.username = this.username !== void 0 ? this.username : null, r;
    }
  }
  class Gi {
    constructor(r) {
      J(this, "id");
      J(this, "name");
      J(this, "supportedHostnames");
      J(this, "nodeId");
      if (r)
        for (var s in r)
          r.hasOwnProperty(s) && (this[s] = r[s]);
    }
    init(r, s) {
      if (r) {
        if (this.id = r.id !== void 0 ? r.id : null, this.name = r.name !== void 0 ? r.name : null, Array.isArray(r.supportedHostnames)) {
          this.supportedHostnames = [];
          for (let n of r.supportedHostnames)
            this.supportedHostnames.push(n);
        } else
          this.supportedHostnames = null;
        this.nodeId = r.nodeId !== void 0 ? r.nodeId : null;
      }
    }
    static fromJS(r, s) {
      return r = typeof r == "object" ? r : {}, xs(r, s, Gi);
    }
    toJSON(r) {
      if (r = typeof r == "object" ? r : {}, r.id = this.id !== void 0 ? this.id : null, r.name = this.name !== void 0 ? this.name : null, Array.isArray(this.supportedHostnames)) {
        r.supportedHostnames = [];
        for (let s of this.supportedHostnames)
          r.supportedHostnames.push(s);
      }
      return r.nodeId = this.nodeId !== void 0 ? this.nodeId : null, r;
    }
  }
  class Ki {
    constructor(r) {
      J(this, "success");
      J(this, "message");
      J(this, "details");
      J(this, "errors");
      J(this, "exception");
      J(this, "messageType");
      if (r)
        for (var s in r)
          r.hasOwnProperty(s) && (this[s] = r[s]);
    }
    init(r, s) {
      if (r) {
        if (this.success = r.success !== void 0 ? r.success : null, this.message = r.message !== void 0 ? r.message : null, this.details = r.details !== void 0 ? r.details : null, Array.isArray(r.errors)) {
          this.errors = [];
          for (let n of r.errors)
            this.errors.push(qi.fromJS(n, s));
        } else
          this.errors = null;
        this.exception = r.exception ? _n.fromJS(r.exception, s) : null, this.messageType = r.messageType !== void 0 ? r.messageType : null;
      }
    }
    static fromJS(r, s) {
      return r = typeof r == "object" ? r : {}, xs(r, s, Ki);
    }
    toJSON(r) {
      if (r = typeof r == "object" ? r : {}, r.success = this.success !== void 0 ? this.success : null, r.message = this.message !== void 0 ? this.message : null, r.details = this.details !== void 0 ? this.details : null, Array.isArray(this.errors)) {
        r.errors = [];
        for (let s of this.errors)
          r.errors.push(s == null ? void 0 : s.toJSON());
      }
      return r.exception = this.exception ? this.exception.toJSON() : null, r.messageType = this.messageType !== void 0 ? this.messageType : null, r;
    }
  }
  class qi {
    constructor(r) {
      J(this, "code");
      J(this, "message");
      if (r)
        for (var s in r)
          r.hasOwnProperty(s) && (this[s] = r[s]);
    }
    init(r, s) {
      r && (this.code = r.code !== void 0 ? r.code : null, this.message = r.message !== void 0 ? r.message : null);
    }
    static fromJS(r, s) {
      return r = typeof r == "object" ? r : {}, xs(r, s, qi);
    }
    toJSON(r) {
      return r = typeof r == "object" ? r : {}, r.code = this.code !== void 0 ? this.code : null, r.message = this.message !== void 0 ? this.message : null, r;
    }
  }
  class _n {
    constructor(r) {
      J(this, "message");
      J(this, "innerException");
      J(this, "source");
      J(this, "stackTrace");
      if (r)
        for (var s in r)
          r.hasOwnProperty(s) && (this[s] = r[s]);
    }
    init(r, s) {
      r && (this.message = r.Message !== void 0 ? r.Message : null, this.innerException = r.InnerException ? _n.fromJS(r.InnerException, s) : null, this.source = r.Source !== void 0 ? r.Source : null, this.stackTrace = r.StackTrace !== void 0 ? r.StackTrace : null);
    }
    static fromJS(r, s) {
      return r = typeof r == "object" ? r : {}, xs(r, s, _n);
    }
    toJSON(r) {
      return r = typeof r == "object" ? r : {}, r.Message = this.message !== void 0 ? this.message : null, r.InnerException = this.innerException ? this.innerException.toJSON() : null, r.Source = this.source !== void 0 ? this.source : null, r.StackTrace = this.stackTrace !== void 0 ? this.stackTrace : null, r;
    }
  }
  function mo(t, r) {
    t = JSON.parse(t, r);
    var s = {}, n = [];
    t = function o(i, l, a) {
      if (typeof i != "object" || !i)
        return i;
      if ("$ref" in i) {
        let d = i.$ref;
        if (d in s)
          return s[d];
        n.push([a, l, d]);
        return;
      } else if ("$id" in i) {
        let d = i.$id;
        delete i.$id, "$values" in i && (i = i.$values), s[d] = i;
      }
      if (Array.isArray(i))
        i = i.map((d, p) => o(d, p, i));
      else
        for (var u in i)
          i.hasOwnProperty(u) && i[u] && typeof i[u] == "object" && (i[u] = o(i[u], u, i));
      return i;
    }(t);
    for (let o = 0; o < n.length; o++) {
      const i = n[o];
      i[0][i[1]] = s[i[2]];
    }
    return t;
  }
  function xs(t, r, s) {
    if (r || (r = []), !t)
      return null;
    const n = "__mappingIndex";
    if (t[n])
      return r[t[n]].target;
    t[n] = r.length;
    let o = new s();
    return r.push({ source: t, target: o }), o.init(t, r), o;
  }
  class fy extends Error {
    constructor(s, n, o, i, l) {
      super();
      J(this, "message");
      J(this, "status");
      J(this, "response");
      J(this, "headers");
      J(this, "result");
      J(this, "isApiException", !0);
      this.message = s, this.status = n, this.response = o, this.headers = i, this.result = l;
    }
    static isApiException(s) {
      return s.isApiException === !0;
    }
  }
  function _o(t, r, s, n, o) {
    throw o ?? new fy(t, r, s, n, null);
  }
  const xa = {
    managmentApiClient: new dy()
  }, hy = /* @__PURE__ */ mi({
    name: "RefreshNode",
    created: function() {
    },
    mounted: function() {
      console.log("mounted"), this.fetchData();
    },
    data() {
      return {
        loading: !0,
        message: "test",
        providers: [],
        currentDomain: "",
        currentProvider: ""
      };
    },
    methods: {
      async selectProvider(t) {
        console.log(t.target), console.log(t.target.id), t.target.id == "providers" && (this.currentDomains.length = 0, this.currentProvider = t.target.value, this.domains.forEach((r) => {
          r.group === this.currentProvider && this.currentDomains.push(r);
        }), console.log(this.currentDomains));
      },
      async selectDomain(t) {
        t.target.id == "domains" && (this.currentDomain = t.target.value, console.log("test"), console.log(this.currentDomain));
      },
      async sendData() {
        console.log("send");
        var t = xa.managmentApiClient;
        t.refreshForNode(this.nodeId, this.currentProvider, this.currentDomain).then((r) => {
          console.log(r), console.log(this.currentDomain, this.currentProvider), this.$emit("refrehsNodeSubmit", r.data);
        });
      },
      async fetchData() {
        var t = xa.managmentApiClient;
        t.getProviders(this.nodeId).then((r) => {
          console.log(r), r == null || r.forEach((s) => {
            var n, o;
            (n = this.providers) == null || n.push({ name: s.name ?? "", value: s.id ?? "", group: s.name ?? "", selected: !1 }), (o = s.supportedHostnames) == null || o.forEach((i) => {
              var l, a;
              (l = this.domains) == null || l.push({ name: i ?? "", value: i ?? "", group: s.name ?? "", selected: !1 }), (a = this.currentDomains) == null || a.push({ name: i ?? "", value: i ?? "", group: s.name ?? "", selected: !1 });
            });
          }), this.loading = !1, console.log(this.providers), console.log(this.loading);
        });
      }
    },
    emits: {
      refrehsNodeSubmit: (t) => (console.log("emit"), console.log(t), !0)
    },
    // type inference enabled
    props: {
      loading: {
        type: Boolean,
        default: !0
      },
      nodeId: {
        type: Number,
        default: -1
      },
      message: String,
      providers: {
        type: Array,
        default: () => []
      },
      currentDomains: {
        type: Array,
        default: () => []
      },
      domains: {
        type: Array,
        default: () => []
      }
    },
    setup: function(t) {
      t.message, console.log("Setup props:", t);
      const r = jf("providers");
      Ws(r, (s, n) => {
        console.log(
          "Watch props.selected function called with args:",
          s,
          n
        );
      }, { deep: !0, immediate: !0 });
    }
  }), py = ".umb-pane[data-v-b4a0a327]{margin:15px 20px 20px}.spacer[data-v-b4a0a327]{margin-top:20px}", Ic = (t, r) => {
    const s = t.__vccOpts || t;
    for (const [n, o] of r)
      s[n] = o;
    return s;
  }, Rc = (t) => (gh("data-v-b4a0a327"), t = t(), yh(), t), my = { key: 0 }, _y = {
    key: 1,
    class: "umb-dialog-body"
  }, vy = { class: "umb-pane" }, gy = /* @__PURE__ */ Rc(() => /* @__PURE__ */ _r("div", { class: "spacer" }, null, -1)), yy = /* @__PURE__ */ Rc(() => /* @__PURE__ */ _r("div", { class: "spacer" }, null, -1));
  function by(t, r, s, n, o, i) {
    const l = oo("uui-loader-bar"), a = oo("uui-select"), u = oo("uui-button");
    return t.loading ? (Ro(), Yo("div", my, [
      Re(l, {
        animationDuration: "1.5",
        style: { color: "black" }
      })
    ])) : (Ro(), Yo("div", _y, [
      _r("div", vy, [
        Re(a, {
          placeholder: "Select an CND provider or an endpoint",
          options: t.providers,
          id: "providers",
          onChange: t.selectProvider
        }, null, 8, ["options", "onChange"]),
        gy,
        Re(a, {
          placeholder: "Select an domain for provider",
          options: t.currentDomains,
          id: "domains",
          onChange: t.selectDomain
        }, null, 8, ["options", "onChange"]),
        yy,
        Re(u, {
          look: "primary",
          label: "Refresh All CDNs",
          onClick: t.sendData
        }, null, 8, ["onClick"])
      ])
    ]));
  }
  const Ey = /* @__PURE__ */ Ic(hy, [["render", by], ["styles", [py]], ["__scopeId", "data-v-b4a0a327"]]), wy = /* @__PURE__ */ mi({
    name: "CdnDashboard",
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
  }), Oy = /* @__PURE__ */ _r("h1", null, "CDN Dashboard", -1), Ny = /* @__PURE__ */ _r("p", null, "CDN Dashboard", -1), Sy = [
    Oy,
    Ny
  ];
  function Dy(t, r, s, n, o, i) {
    return Ro(), Yo("div", null, Sy);
  }
  const $y = /* @__PURE__ */ Ic(wy, [["render", Dy]]), xy = /* @__PURE__ */ ju(Ey), My = /* @__PURE__ */ ju($y);
  window.customElements.define("refresh-node", xy);
  window.customElements.define("cdn-dashboard", My);
  lm();
});
export default Cy();
