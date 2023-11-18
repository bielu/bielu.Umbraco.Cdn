(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function r(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(s){if(s.ep)return;s.ep=!0;const n=r(s);fetch(s.href,n)}})();function to(e,t){const r=Object.create(null),o=e.split(",");for(let s=0;s<o.length;s++)r[o[s]]=!0;return t?s=>!!r[s.toLowerCase()]:s=>!!r[s]}const F={},rt=[],ye=()=>{},ri=()=>!1,oi=/^on[^a-z]/,sr=e=>oi.test(e),ro=e=>e.startsWith("onUpdate:"),q=Object.assign,oo=(e,t)=>{const r=e.indexOf(t);r>-1&&e.splice(r,1)},si=Object.prototype.hasOwnProperty,U=(e,t)=>si.call(e,t),C=Array.isArray,wt=e=>ir(e)==="[object Map]",ni=e=>ir(e)==="[object Set]",S=e=>typeof e=="function",Y=e=>typeof e=="string",nr=e=>typeof e=="symbol",z=e=>e!==null&&typeof e=="object",Xs=e=>(z(e)||S(e))&&S(e.then)&&S(e.catch),ii=Object.prototype.toString,ir=e=>ii.call(e),li=e=>ir(e).slice(8,-1),ai=e=>ir(e)==="[object Object]",so=e=>Y(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,qt=to(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),lr=e=>{const t=Object.create(null);return r=>t[r]||(t[r]=e(r))},ci=/-(\w)/g,$e=lr(e=>e.replace(ci,(t,r)=>r?r.toUpperCase():"")),ui=/\B([A-Z])/g,dt=lr(e=>e.replace(ui,"-$1").toLowerCase()),ar=lr(e=>e.charAt(0).toUpperCase()+e.slice(1)),$r=lr(e=>e?`on${ar(e)}`:""),it=(e,t)=>!Object.is(e,t),wr=(e,t)=>{for(let r=0;r<e.length;r++)e[r](t)},Qt=(e,t,r)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,value:r})},fi=e=>{const t=parseFloat(e);return isNaN(t)?e:t};let Uo;const Fr=()=>Uo||(Uo=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function no(e){if(C(e)){const t={};for(let r=0;r<e.length;r++){const o=e[r],s=Y(o)?vi(o):no(o);if(s)for(const n in s)t[n]=s[n]}return t}else if(Y(e)||z(e))return e}const di=/;(?![^(]*\))/g,hi=/:([^]+)/,pi=/\/\*[^]*?\*\//g;function vi(e){const t={};return e.replace(pi,"").split(di).forEach(r=>{if(r){const o=r.split(hi);o.length>1&&(t[o[0].trim()]=o[1].trim())}}),t}function io(e){let t="";if(Y(e))t=e;else if(C(e))for(let r=0;r<e.length;r++){const o=io(e[r]);o&&(t+=o+" ")}else if(z(e))for(const r in e)e[r]&&(t+=r+" ");return t.trim()}const bi="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",_i=to(bi);function Zs(e){return!!e||e===""}let ce;class gi{constructor(t=!1){this.detached=t,this._active=!0,this.effects=[],this.cleanups=[],this.parent=ce,!t&&ce&&(this.index=(ce.scopes||(ce.scopes=[])).push(this)-1)}get active(){return this._active}run(t){if(this._active){const r=ce;try{return ce=this,t()}finally{ce=r}}}on(){ce=this}off(){ce=this.parent}stop(t){if(this._active){let r,o;for(r=0,o=this.effects.length;r<o;r++)this.effects[r].stop();for(r=0,o=this.cleanups.length;r<o;r++)this.cleanups[r]();if(this.scopes)for(r=0,o=this.scopes.length;r<o;r++)this.scopes[r].stop(!0);if(!this.detached&&this.parent&&!t){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0,this._active=!1}}}function mi(e,t=ce){t&&t.active&&t.effects.push(e)}function yi(){return ce}const lo=e=>{const t=new Set(e);return t.w=0,t.n=0,t},Qs=e=>(e.w&Re)>0,Gs=e=>(e.n&Re)>0,$i=({deps:e})=>{if(e.length)for(let t=0;t<e.length;t++)e[t].w|=Re},wi=e=>{const{deps:t}=e;if(t.length){let r=0;for(let o=0;o<t.length;o++){const s=t[o];Qs(s)&&!Gs(s)?s.delete(e):t[r++]=s,s.w&=~Re,s.n&=~Re}t.length=r}},jr=new WeakMap;let yt=0,Re=1;const kr=30;let ue;const qe=Symbol(""),Dr=Symbol("");class ao{constructor(t,r=null,o){this.fn=t,this.scheduler=r,this.active=!0,this.deps=[],this.parent=void 0,mi(this,o)}run(){if(!this.active)return this.fn();let t=ue,r=Ue;for(;t;){if(t===this)return;t=t.parent}try{return this.parent=ue,ue=this,Ue=!0,Re=1<<++yt,yt<=kr?$i(this):No(this),this.fn()}finally{yt<=kr&&wi(this),Re=1<<--yt,ue=this.parent,Ue=r,this.parent=void 0,this.deferStop&&this.stop()}}stop(){ue===this?this.deferStop=!0:this.active&&(No(this),this.onStop&&this.onStop(),this.active=!1)}}function No(e){const{deps:t}=e;if(t.length){for(let r=0;r<t.length;r++)t[r].delete(e);t.length=0}}let Ue=!0;const en=[];function ht(){en.push(Ue),Ue=!1}function pt(){const e=en.pop();Ue=e===void 0?!0:e}function oe(e,t,r){if(Ue&&ue){let o=jr.get(e);o||jr.set(e,o=new Map);let s=o.get(r);s||o.set(r,s=lo()),tn(s)}}function tn(e,t){let r=!1;yt<=kr?Gs(e)||(e.n|=Re,r=!Qs(e)):r=!e.has(ue),r&&(e.add(ue),ue.deps.push(e))}function Oe(e,t,r,o,s,n){const i=jr.get(e);if(!i)return;let c=[];if(t==="clear")c=[...i.values()];else if(r==="length"&&C(e)){const a=Number(o);i.forEach((f,h)=>{(h==="length"||!nr(h)&&h>=a)&&c.push(f)})}else switch(r!==void 0&&c.push(i.get(r)),t){case"add":C(e)?so(r)&&c.push(i.get("length")):(c.push(i.get(qe)),wt(e)&&c.push(i.get(Dr)));break;case"delete":C(e)||(c.push(i.get(qe)),wt(e)&&c.push(i.get(Dr)));break;case"set":wt(e)&&c.push(i.get(qe));break}if(c.length===1)c[0]&&Br(c[0]);else{const a=[];for(const f of c)f&&a.push(...f);Br(lo(a))}}function Br(e,t){const r=C(e)?e:[...e];for(const o of r)o.computed&&Ro(o);for(const o of r)o.computed||Ro(o)}function Ro(e,t){(e!==ue||e.allowRecurse)&&(e.scheduler?e.scheduler():e.run())}const Ei=to("__proto__,__v_isRef,__isVue"),rn=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(nr)),Ho=xi();function xi(){const e={};return["includes","indexOf","lastIndexOf"].forEach(t=>{e[t]=function(...r){const o=N(this);for(let n=0,i=this.length;n<i;n++)oe(o,"get",n+"");const s=o[t](...r);return s===-1||s===!1?o[t](...r.map(N)):s}}),["push","pop","shift","unshift","splice"].forEach(t=>{e[t]=function(...r){ht();const o=N(this)[t].apply(this,r);return pt(),o}}),e}function Ai(e){const t=N(this);return oe(t,"has",e),t.hasOwnProperty(e)}class on{constructor(t=!1,r=!1){this._isReadonly=t,this._shallow=r}get(t,r,o){const s=this._isReadonly,n=this._shallow;if(r==="__v_isReactive")return!s;if(r==="__v_isReadonly")return s;if(r==="__v_isShallow")return n;if(r==="__v_raw"&&o===(s?n?Fi:an:n?ln:nn).get(t))return t;const i=C(t);if(!s){if(i&&U(Ho,r))return Reflect.get(Ho,r,o);if(r==="hasOwnProperty")return Ai}const c=Reflect.get(t,r,o);return(nr(r)?rn.has(r):Ei(r))||(s||oe(t,"get",r),n)?c:te(c)?i&&so(r)?c:c.value:z(c)?s?cn(c):fo(c):c}}class sn extends on{constructor(t=!1){super(!1,t)}set(t,r,o,s){let n=t[r];if(At(n)&&te(n)&&!te(o))return!1;if(!this._shallow&&(!Vr(o)&&!At(o)&&(n=N(n),o=N(o)),!C(t)&&te(n)&&!te(o)))return n.value=o,!0;const i=C(t)&&so(r)?Number(r)<t.length:U(t,r),c=Reflect.set(t,r,o,s);return t===N(s)&&(i?it(o,n)&&Oe(t,"set",r,o):Oe(t,"add",r,o)),c}deleteProperty(t,r){const o=U(t,r);t[r];const s=Reflect.deleteProperty(t,r);return s&&o&&Oe(t,"delete",r,void 0),s}has(t,r){const o=Reflect.has(t,r);return(!nr(r)||!rn.has(r))&&oe(t,"has",r),o}ownKeys(t){return oe(t,"iterate",C(t)?"length":qe),Reflect.ownKeys(t)}}class Oi extends on{constructor(t=!1){super(!0,t)}set(t,r){return!0}deleteProperty(t,r){return!0}}const Pi=new sn,Ci=new Oi,Si=new sn(!0),co=e=>e,cr=e=>Reflect.getPrototypeOf(e);function Dt(e,t,r=!1,o=!1){e=e.__v_raw;const s=N(e),n=N(t);r||(it(t,n)&&oe(s,"get",t),oe(s,"get",n));const{has:i}=cr(s),c=o?co:r?vo:po;if(i.call(s,t))return c(e.get(t));if(i.call(s,n))return c(e.get(n));e!==s&&e.get(t)}function Bt(e,t=!1){const r=this.__v_raw,o=N(r),s=N(e);return t||(it(e,s)&&oe(o,"has",e),oe(o,"has",s)),e===s?r.has(e):r.has(e)||r.has(s)}function Vt(e,t=!1){return e=e.__v_raw,!t&&oe(N(e),"iterate",qe),Reflect.get(e,"size",e)}function Lo(e){e=N(e);const t=N(this);return cr(t).has.call(t,e)||(t.add(e),Oe(t,"add",e,e)),this}function Fo(e,t){t=N(t);const r=N(this),{has:o,get:s}=cr(r);let n=o.call(r,e);n||(e=N(e),n=o.call(r,e));const i=s.call(r,e);return r.set(e,t),n?it(t,i)&&Oe(r,"set",e,t):Oe(r,"add",e,t),this}function jo(e){const t=N(this),{has:r,get:o}=cr(t);let s=r.call(t,e);s||(e=N(e),s=r.call(t,e)),o&&o.call(t,e);const n=t.delete(e);return s&&Oe(t,"delete",e,void 0),n}function ko(){const e=N(this),t=e.size!==0,r=e.clear();return t&&Oe(e,"clear",void 0,void 0),r}function zt(e,t){return function(o,s){const n=this,i=n.__v_raw,c=N(i),a=t?co:e?vo:po;return!e&&oe(c,"iterate",qe),i.forEach((f,h)=>o.call(s,a(f),a(h),n))}}function Kt(e,t,r){return function(...o){const s=this.__v_raw,n=N(s),i=wt(n),c=e==="entries"||e===Symbol.iterator&&i,a=e==="keys"&&i,f=s[e](...o),h=r?co:t?vo:po;return!t&&oe(n,"iterate",a?Dr:qe),{next(){const{value:_,done:$}=f.next();return $?{value:_,done:$}:{value:c?[h(_[0]),h(_[1])]:h(_),done:$}},[Symbol.iterator](){return this}}}}function Te(e){return function(...t){return e==="delete"?!1:this}}function Ti(){const e={get(n){return Dt(this,n)},get size(){return Vt(this)},has:Bt,add:Lo,set:Fo,delete:jo,clear:ko,forEach:zt(!1,!1)},t={get(n){return Dt(this,n,!1,!0)},get size(){return Vt(this)},has:Bt,add:Lo,set:Fo,delete:jo,clear:ko,forEach:zt(!1,!0)},r={get(n){return Dt(this,n,!0)},get size(){return Vt(this,!0)},has(n){return Bt.call(this,n,!0)},add:Te("add"),set:Te("set"),delete:Te("delete"),clear:Te("clear"),forEach:zt(!0,!1)},o={get(n){return Dt(this,n,!0,!0)},get size(){return Vt(this,!0)},has(n){return Bt.call(this,n,!0)},add:Te("add"),set:Te("set"),delete:Te("delete"),clear:Te("clear"),forEach:zt(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(n=>{e[n]=Kt(n,!1,!1),r[n]=Kt(n,!0,!1),t[n]=Kt(n,!1,!0),o[n]=Kt(n,!0,!0)}),[e,r,t,o]}const[Ii,Mi,Ui,Ni]=Ti();function uo(e,t){const r=t?e?Ni:Ui:e?Mi:Ii;return(o,s,n)=>s==="__v_isReactive"?!e:s==="__v_isReadonly"?e:s==="__v_raw"?o:Reflect.get(U(r,s)&&s in o?r:o,s,n)}const Ri={get:uo(!1,!1)},Hi={get:uo(!1,!0)},Li={get:uo(!0,!1)},nn=new WeakMap,ln=new WeakMap,an=new WeakMap,Fi=new WeakMap;function ji(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function ki(e){return e.__v_skip||!Object.isExtensible(e)?0:ji(li(e))}function fo(e){return At(e)?e:ho(e,!1,Pi,Ri,nn)}function Di(e){return ho(e,!1,Si,Hi,ln)}function cn(e){return ho(e,!0,Ci,Li,an)}function ho(e,t,r,o,s){if(!z(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;const n=s.get(e);if(n)return n;const i=ki(e);if(i===0)return e;const c=new Proxy(e,i===2?o:r);return s.set(e,c),c}function ot(e){return At(e)?ot(e.__v_raw):!!(e&&e.__v_isReactive)}function At(e){return!!(e&&e.__v_isReadonly)}function Vr(e){return!!(e&&e.__v_isShallow)}function un(e){return ot(e)||At(e)}function N(e){const t=e&&e.__v_raw;return t?N(t):e}function fn(e){return Qt(e,"__v_skip",!0),e}const po=e=>z(e)?fo(e):e,vo=e=>z(e)?cn(e):e;function Bi(e){Ue&&ue&&(e=N(e),tn(e.dep||(e.dep=lo())))}function Vi(e,t){e=N(e);const r=e.dep;r&&Br(r)}function te(e){return!!(e&&e.__v_isRef===!0)}function zi(e){return te(e)?e.value:e}const Ki={get:(e,t,r)=>zi(Reflect.get(e,t,r)),set:(e,t,r,o)=>{const s=e[t];return te(s)&&!te(r)?(s.value=r,!0):Reflect.set(e,t,r,o)}};function dn(e){return ot(e)?e:new Proxy(e,Ki)}class Wi{constructor(t,r,o,s){this._setter=r,this.dep=void 0,this.__v_isRef=!0,this.__v_isReadonly=!1,this._dirty=!0,this.effect=new ao(t,()=>{this._dirty||(this._dirty=!0,Vi(this))}),this.effect.computed=this,this.effect.active=this._cacheable=!s,this.__v_isReadonly=o}get value(){const t=N(this);return Bi(t),(t._dirty||!t._cacheable)&&(t._dirty=!1,t._value=t.effect.run()),t._value}set value(t){this._setter(t)}}function qi(e,t,r=!1){let o,s;const n=S(e);return n?(o=e,s=ye):(o=e.get,s=e.set),new Wi(o,s,n||!s,r)}function Ne(e,t,r,o){let s;try{s=o?e(...o):e()}catch(n){ur(n,t,r)}return s}function he(e,t,r,o){if(S(e)){const n=Ne(e,t,r,o);return n&&Xs(n)&&n.catch(i=>{ur(i,t,r)}),n}const s=[];for(let n=0;n<e.length;n++)s.push(he(e[n],t,r,o));return s}function ur(e,t,r,o=!0){const s=t?t.vnode:null;if(t){let n=t.parent;const i=t.proxy,c=r;for(;n;){const f=n.ec;if(f){for(let h=0;h<f.length;h++)if(f[h](e,i,c)===!1)return}n=n.parent}const a=t.appContext.config.errorHandler;if(a){Ne(a,null,10,[e,i,c]);return}}Yi(e,r,s,o)}function Yi(e,t,r,o=!0){console.error(e)}let Ot=!1,zr=!1;const Q=[];let me=0;const st=[];let Ae=null,ze=0;const hn=Promise.resolve();let bo=null;function Ji(e){const t=bo||hn;return e?t.then(this?e.bind(this):e):t}function Xi(e){let t=me+1,r=Q.length;for(;t<r;){const o=t+r>>>1,s=Q[o],n=Pt(s);n<e||n===e&&s.pre?t=o+1:r=o}return t}function _o(e){(!Q.length||!Q.includes(e,Ot&&e.allowRecurse?me+1:me))&&(e.id==null?Q.push(e):Q.splice(Xi(e.id),0,e),pn())}function pn(){!Ot&&!zr&&(zr=!0,bo=hn.then(bn))}function Zi(e){const t=Q.indexOf(e);t>me&&Q.splice(t,1)}function Qi(e){C(e)?st.push(...e):(!Ae||!Ae.includes(e,e.allowRecurse?ze+1:ze))&&st.push(e),pn()}function Do(e,t=Ot?me+1:0){for(;t<Q.length;t++){const r=Q[t];r&&r.pre&&(Q.splice(t,1),t--,r())}}function vn(e){if(st.length){const t=[...new Set(st)];if(st.length=0,Ae){Ae.push(...t);return}for(Ae=t,Ae.sort((r,o)=>Pt(r)-Pt(o)),ze=0;ze<Ae.length;ze++)Ae[ze]();Ae=null,ze=0}}const Pt=e=>e.id==null?1/0:e.id,Gi=(e,t)=>{const r=Pt(e)-Pt(t);if(r===0){if(e.pre&&!t.pre)return-1;if(t.pre&&!e.pre)return 1}return r};function bn(e){zr=!1,Ot=!0,Q.sort(Gi);try{for(me=0;me<Q.length;me++){const t=Q[me];t&&t.active!==!1&&Ne(t,null,14)}}finally{me=0,Q.length=0,vn(),Ot=!1,bo=null,(Q.length||st.length)&&bn()}}function el(e,t,...r){if(e.isUnmounted)return;const o=e.vnode.props||F;let s=r;const n=t.startsWith("update:"),i=n&&t.slice(7);if(i&&i in o){const h=`${i==="modelValue"?"model":i}Modifiers`,{number:_,trim:$}=o[h]||F;$&&(s=r.map(O=>Y(O)?O.trim():O)),_&&(s=r.map(fi))}let c,a=o[c=$r(t)]||o[c=$r($e(t))];!a&&n&&(a=o[c=$r(dt(t))]),a&&he(a,e,6,s);const f=o[c+"Once"];if(f){if(!e.emitted)e.emitted={};else if(e.emitted[c])return;e.emitted[c]=!0,he(f,e,6,s)}}function _n(e,t,r=!1){const o=t.emitsCache,s=o.get(e);if(s!==void 0)return s;const n=e.emits;let i={},c=!1;if(!S(e)){const a=f=>{const h=_n(f,t,!0);h&&(c=!0,q(i,h))};!r&&t.mixins.length&&t.mixins.forEach(a),e.extends&&a(e.extends),e.mixins&&e.mixins.forEach(a)}return!n&&!c?(z(e)&&o.set(e,null),null):(C(n)?n.forEach(a=>i[a]=null):q(i,n),z(e)&&o.set(e,i),i)}function fr(e,t){return!e||!sr(t)?!1:(t=t.slice(2).replace(/Once$/,""),U(e,t[0].toLowerCase()+t.slice(1))||U(e,dt(t))||U(e,t))}let fe=null,gn=null;function Gt(e){const t=fe;return fe=e,gn=e&&e.type.__scopeId||null,t}function tl(e,t=fe,r){if(!t||e._n)return e;const o=(...s)=>{o._d&&Go(-1);const n=Gt(t);let i;try{i=e(...s)}finally{Gt(n),o._d&&Go(1)}return i};return o._n=!0,o._c=!0,o._d=!0,o}function Er(e){const{type:t,vnode:r,proxy:o,withProxy:s,props:n,propsOptions:[i],slots:c,attrs:a,emit:f,render:h,renderCache:_,data:$,setupState:O,ctx:k,inheritAttrs:T}=e;let K,J;const X=Gt(e);try{if(r.shapeFlag&4){const I=s||o;K=ge(h.call(I,I,_,n,O,$,k)),J=a}else{const I=t;K=ge(I.length>1?I(n,{attrs:a,slots:c,emit:f}):I(n,null)),J=t.props?a:rl(a)}}catch(I){xt.length=0,ur(I,e,1),K=Pe(Ct)}let Z=K;if(J&&T!==!1){const I=Object.keys(J),{shapeFlag:Se}=Z;I.length&&Se&7&&(i&&I.some(ro)&&(J=ol(J,i)),Z=lt(Z,J))}return r.dirs&&(Z=lt(Z),Z.dirs=Z.dirs?Z.dirs.concat(r.dirs):r.dirs),r.transition&&(Z.transition=r.transition),K=Z,Gt(X),K}const rl=e=>{let t;for(const r in e)(r==="class"||r==="style"||sr(r))&&((t||(t={}))[r]=e[r]);return t},ol=(e,t)=>{const r={};for(const o in e)(!ro(o)||!(o.slice(9)in t))&&(r[o]=e[o]);return r};function sl(e,t,r){const{props:o,children:s,component:n}=e,{props:i,children:c,patchFlag:a}=t,f=n.emitsOptions;if(t.dirs||t.transition)return!0;if(r&&a>=0){if(a&1024)return!0;if(a&16)return o?Bo(o,i,f):!!i;if(a&8){const h=t.dynamicProps;for(let _=0;_<h.length;_++){const $=h[_];if(i[$]!==o[$]&&!fr(f,$))return!0}}}else return(s||c)&&(!c||!c.$stable)?!0:o===i?!1:o?i?Bo(o,i,f):!0:!!i;return!1}function Bo(e,t,r){const o=Object.keys(t);if(o.length!==Object.keys(e).length)return!0;for(let s=0;s<o.length;s++){const n=o[s];if(t[n]!==e[n]&&!fr(r,n))return!0}return!1}function nl({vnode:e,parent:t},r){for(;t&&t.subTree===e;)(e=t.vnode).el=r,t=t.parent}const mn="components";function Vo(e,t){return ll(mn,e,!0,t)||e}const il=Symbol.for("v-ndc");function ll(e,t,r=!0,o=!1){const s=fe||W;if(s){const n=s.type;if(e===mn){const c=na(n,!1);if(c&&(c===t||c===$e(t)||c===ar($e(t))))return n}const i=zo(s[e]||n[e],t)||zo(s.appContext[e],t);return!i&&o?n:i}}function zo(e,t){return e&&(e[t]||e[$e(t)]||e[ar($e(t))])}const al=e=>e.__isSuspense;function cl(e,t){t&&t.pendingBranch?C(e)?t.effects.push(...e):t.effects.push(e):Qi(e)}const Wt={};function xr(e,t,r){return yn(e,t,r)}function yn(e,t,{immediate:r,deep:o,flush:s,onTrack:n,onTrigger:i}=F){var c;const a=yi()===((c=W)==null?void 0:c.scope)?W:null;let f,h=!1,_=!1;if(te(e)?(f=()=>e.value,h=Vr(e)):ot(e)?(f=()=>e,o=!0):C(e)?(_=!0,h=e.some(I=>ot(I)||Vr(I)),f=()=>e.map(I=>{if(te(I))return I.value;if(ot(I))return et(I);if(S(I))return Ne(I,a,2)})):S(e)?t?f=()=>Ne(e,a,2):f=()=>{if(!(a&&a.isUnmounted))return $&&$(),he(e,a,3,[O])}:f=ye,t&&o){const I=f;f=()=>et(I())}let $,O=I=>{$=X.onStop=()=>{Ne(I,a,4)}},k;if(Tt)if(O=ye,t?r&&he(t,a,3,[f(),_?[]:void 0,O]):f(),s==="sync"){const I=ca();k=I.__watcherHandles||(I.__watcherHandles=[])}else return ye;let T=_?new Array(e.length).fill(Wt):Wt;const K=()=>{if(X.active)if(t){const I=X.run();(o||h||(_?I.some((Se,vt)=>it(Se,T[vt])):it(I,T)))&&($&&$(),he(t,a,3,[I,T===Wt?void 0:_&&T[0]===Wt?[]:T,O]),T=I)}else X.run()};K.allowRecurse=!!t;let J;s==="sync"?J=K:s==="post"?J=()=>re(K,a&&a.suspense):(K.pre=!0,a&&(K.id=a.uid),J=()=>_o(K));const X=new ao(f,J);t?r?K():T=X.run():s==="post"?re(X.run.bind(X),a&&a.suspense):X.run();const Z=()=>{X.stop(),a&&a.scope&&oo(a.scope.effects,X)};return k&&k.push(Z),Z}function ul(e,t,r){const o=this.proxy,s=Y(e)?e.includes(".")?$n(o,e):()=>o[e]:e.bind(o,o);let n;S(t)?n=t:(n=t.handler,r=t);const i=W;at(this);const c=yn(s,n.bind(o),r);return i?at(i):Ye(),c}function $n(e,t){const r=t.split(".");return()=>{let o=e;for(let s=0;s<r.length&&o;s++)o=o[r[s]];return o}}function et(e,t){if(!z(e)||e.__v_skip||(t=t||new Set,t.has(e)))return e;if(t.add(e),te(e))et(e.value,t);else if(C(e))for(let r=0;r<e.length;r++)et(e[r],t);else if(ni(e)||wt(e))e.forEach(r=>{et(r,t)});else if(ai(e))for(const r in e)et(e[r],t);return e}function ke(e,t,r,o){const s=e.dirs,n=t&&t.dirs;for(let i=0;i<s.length;i++){const c=s[i];n&&(c.oldValue=n[i].value);let a=c.dir[o];a&&(ht(),he(a,r,8,[e.el,c,e,t]),pt())}}/*! #__NO_SIDE_EFFECTS__ */function fl(e,t){return S(e)?(()=>q({name:e.name},t,{setup:e}))():e}const Yt=e=>!!e.type.__asyncLoader,wn=e=>e.type.__isKeepAlive;function dl(e,t){En(e,"a",t)}function hl(e,t){En(e,"da",t)}function En(e,t,r=W){const o=e.__wdc||(e.__wdc=()=>{let s=r;for(;s;){if(s.isDeactivated)return;s=s.parent}return e()});if(dr(t,o,r),r){let s=r.parent;for(;s&&s.parent;)wn(s.parent.vnode)&&pl(o,t,r,s),s=s.parent}}function pl(e,t,r,o){const s=dr(t,e,o,!0);xn(()=>{oo(o[t],s)},r)}function dr(e,t,r=W,o=!1){if(r){const s=r[e]||(r[e]=[]),n=t.__weh||(t.__weh=(...i)=>{if(r.isUnmounted)return;ht(),at(r);const c=he(t,r,e,i);return Ye(),pt(),c});return o?s.unshift(n):s.push(n),n}}const Ce=e=>(t,r=W)=>(!Tt||e==="sp")&&dr(e,(...o)=>t(...o),r),vl=Ce("bm"),bl=Ce("m"),_l=Ce("bu"),gl=Ce("u"),ml=Ce("bum"),xn=Ce("um"),yl=Ce("sp"),$l=Ce("rtg"),wl=Ce("rtc");function El(e,t=W){dr("ec",e,t)}const Kr=e=>e?Rn(e)?wo(e)||e.proxy:Kr(e.parent):null,Et=q(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>Kr(e.parent),$root:e=>Kr(e.root),$emit:e=>e.emit,$options:e=>go(e),$forceUpdate:e=>e.f||(e.f=()=>_o(e.update)),$nextTick:e=>e.n||(e.n=Ji.bind(e.proxy)),$watch:e=>ul.bind(e)}),Ar=(e,t)=>e!==F&&!e.__isScriptSetup&&U(e,t),xl={get({_:e},t){const{ctx:r,setupState:o,data:s,props:n,accessCache:i,type:c,appContext:a}=e;let f;if(t[0]!=="$"){const O=i[t];if(O!==void 0)switch(O){case 1:return o[t];case 2:return s[t];case 4:return r[t];case 3:return n[t]}else{if(Ar(o,t))return i[t]=1,o[t];if(s!==F&&U(s,t))return i[t]=2,s[t];if((f=e.propsOptions[0])&&U(f,t))return i[t]=3,n[t];if(r!==F&&U(r,t))return i[t]=4,r[t];Wr&&(i[t]=0)}}const h=Et[t];let _,$;if(h)return t==="$attrs"&&oe(e,"get",t),h(e);if((_=c.__cssModules)&&(_=_[t]))return _;if(r!==F&&U(r,t))return i[t]=4,r[t];if($=a.config.globalProperties,U($,t))return $[t]},set({_:e},t,r){const{data:o,setupState:s,ctx:n}=e;return Ar(s,t)?(s[t]=r,!0):o!==F&&U(o,t)?(o[t]=r,!0):U(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(n[t]=r,!0)},has({_:{data:e,setupState:t,accessCache:r,ctx:o,appContext:s,propsOptions:n}},i){let c;return!!r[i]||e!==F&&U(e,i)||Ar(t,i)||(c=n[0])&&U(c,i)||U(o,i)||U(Et,i)||U(s.config.globalProperties,i)},defineProperty(e,t,r){return r.get!=null?e._.accessCache[t]=0:U(r,"value")&&this.set(e,t,r.value,null),Reflect.defineProperty(e,t,r)}};function Ko(e){return C(e)?e.reduce((t,r)=>(t[r]=null,t),{}):e}let Wr=!0;function Al(e){const t=go(e),r=e.proxy,o=e.ctx;Wr=!1,t.beforeCreate&&Wo(t.beforeCreate,e,"bc");const{data:s,computed:n,methods:i,watch:c,provide:a,inject:f,created:h,beforeMount:_,mounted:$,beforeUpdate:O,updated:k,activated:T,deactivated:K,beforeDestroy:J,beforeUnmount:X,destroyed:Z,unmounted:I,render:Se,renderTracked:vt,renderTriggered:Ht,errorCaptured:He,serverPrefetch:_r,expose:Le,inheritAttrs:bt,components:Lt,directives:Ft,filters:gr}=t;if(f&&Ol(f,o,null),i)for(const D in i){const H=i[D];S(H)&&(o[D]=H.bind(r))}if(s){const D=s.call(r,r);z(D)&&(e.data=fo(D))}if(Wr=!0,n)for(const D in n){const H=n[D],Fe=S(H)?H.bind(r,r):S(H.get)?H.get.bind(r,r):ye,jt=!S(H)&&S(H.set)?H.set.bind(r):ye,je=la({get:Fe,set:jt});Object.defineProperty(o,D,{enumerable:!0,configurable:!0,get:()=>je.value,set:pe=>je.value=pe})}if(c)for(const D in c)An(c[D],o,r,D);if(a){const D=S(a)?a.call(r):a;Reflect.ownKeys(D).forEach(H=>{Ml(H,D[H])})}h&&Wo(h,e,"c");function G(D,H){C(H)?H.forEach(Fe=>D(Fe.bind(r))):H&&D(H.bind(r))}if(G(vl,_),G(bl,$),G(_l,O),G(gl,k),G(dl,T),G(hl,K),G(El,He),G(wl,vt),G($l,Ht),G(ml,X),G(xn,I),G(yl,_r),C(Le))if(Le.length){const D=e.exposed||(e.exposed={});Le.forEach(H=>{Object.defineProperty(D,H,{get:()=>r[H],set:Fe=>r[H]=Fe})})}else e.exposed||(e.exposed={});Se&&e.render===ye&&(e.render=Se),bt!=null&&(e.inheritAttrs=bt),Lt&&(e.components=Lt),Ft&&(e.directives=Ft)}function Ol(e,t,r=ye){C(e)&&(e=qr(e));for(const o in e){const s=e[o];let n;z(s)?"default"in s?n=Jt(s.from||o,s.default,!0):n=Jt(s.from||o):n=Jt(s),te(n)?Object.defineProperty(t,o,{enumerable:!0,configurable:!0,get:()=>n.value,set:i=>n.value=i}):t[o]=n}}function Wo(e,t,r){he(C(e)?e.map(o=>o.bind(t.proxy)):e.bind(t.proxy),t,r)}function An(e,t,r,o){const s=o.includes(".")?$n(r,o):()=>r[o];if(Y(e)){const n=t[e];S(n)&&xr(s,n)}else if(S(e))xr(s,e.bind(r));else if(z(e))if(C(e))e.forEach(n=>An(n,t,r,o));else{const n=S(e.handler)?e.handler.bind(r):t[e.handler];S(n)&&xr(s,n,e)}}function go(e){const t=e.type,{mixins:r,extends:o}=t,{mixins:s,optionsCache:n,config:{optionMergeStrategies:i}}=e.appContext,c=n.get(t);let a;return c?a=c:!s.length&&!r&&!o?a=t:(a={},s.length&&s.forEach(f=>er(a,f,i,!0)),er(a,t,i)),z(t)&&n.set(t,a),a}function er(e,t,r,o=!1){const{mixins:s,extends:n}=t;n&&er(e,n,r,!0),s&&s.forEach(i=>er(e,i,r,!0));for(const i in t)if(!(o&&i==="expose")){const c=Pl[i]||r&&r[i];e[i]=c?c(e[i],t[i]):t[i]}return e}const Pl={data:qo,props:Yo,emits:Yo,methods:$t,computed:$t,beforeCreate:ee,created:ee,beforeMount:ee,mounted:ee,beforeUpdate:ee,updated:ee,beforeDestroy:ee,beforeUnmount:ee,destroyed:ee,unmounted:ee,activated:ee,deactivated:ee,errorCaptured:ee,serverPrefetch:ee,components:$t,directives:$t,watch:Sl,provide:qo,inject:Cl};function qo(e,t){return t?e?function(){return q(S(e)?e.call(this,this):e,S(t)?t.call(this,this):t)}:t:e}function Cl(e,t){return $t(qr(e),qr(t))}function qr(e){if(C(e)){const t={};for(let r=0;r<e.length;r++)t[e[r]]=e[r];return t}return e}function ee(e,t){return e?[...new Set([].concat(e,t))]:t}function $t(e,t){return e?q(Object.create(null),e,t):t}function Yo(e,t){return e?C(e)&&C(t)?[...new Set([...e,...t])]:q(Object.create(null),Ko(e),Ko(t??{})):t}function Sl(e,t){if(!e)return t;if(!t)return e;const r=q(Object.create(null),e);for(const o in t)r[o]=ee(e[o],t[o]);return r}function On(){return{app:null,config:{isNativeTag:ri,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Tl=0;function Il(e,t){return function(o,s=null){S(o)||(o=q({},o)),s!=null&&!z(s)&&(s=null);const n=On(),i=new WeakSet;let c=!1;const a=n.app={_uid:Tl++,_component:o,_props:s,_container:null,_context:n,_instance:null,version:ua,get config(){return n.config},set config(f){},use(f,...h){return i.has(f)||(f&&S(f.install)?(i.add(f),f.install(a,...h)):S(f)&&(i.add(f),f(a,...h))),a},mixin(f){return n.mixins.includes(f)||n.mixins.push(f),a},component(f,h){return h?(n.components[f]=h,a):n.components[f]},directive(f,h){return h?(n.directives[f]=h,a):n.directives[f]},mount(f,h,_){if(!c){const $=Pe(o,s);return $.appContext=n,h&&t?t($,f):e($,f,_),c=!0,a._container=f,f.__vue_app__=a,wo($.component)||$.component.proxy}},unmount(){c&&(e(null,a._container),delete a._container.__vue_app__)},provide(f,h){return n.provides[f]=h,a},runWithContext(f){tr=a;try{return f()}finally{tr=null}}};return a}}let tr=null;function Ml(e,t){if(W){let r=W.provides;const o=W.parent&&W.parent.provides;o===r&&(r=W.provides=Object.create(o)),r[e]=t}}function Jt(e,t,r=!1){const o=W||fe;if(o||tr){const s=o?o.parent==null?o.vnode.appContext&&o.vnode.appContext.provides:o.parent.provides:tr._context.provides;if(s&&e in s)return s[e];if(arguments.length>1)return r&&S(t)?t.call(o&&o.proxy):t}}function Ul(e,t,r,o=!1){const s={},n={};Qt(n,pr,1),e.propsDefaults=Object.create(null),Pn(e,t,s,n);for(const i in e.propsOptions[0])i in s||(s[i]=void 0);r?e.props=o?s:Di(s):e.type.props?e.props=s:e.props=n,e.attrs=n}function Nl(e,t,r,o){const{props:s,attrs:n,vnode:{patchFlag:i}}=e,c=N(s),[a]=e.propsOptions;let f=!1;if((o||i>0)&&!(i&16)){if(i&8){const h=e.vnode.dynamicProps;for(let _=0;_<h.length;_++){let $=h[_];if(fr(e.emitsOptions,$))continue;const O=t[$];if(a)if(U(n,$))O!==n[$]&&(n[$]=O,f=!0);else{const k=$e($);s[k]=Yr(a,c,k,O,e,!1)}else O!==n[$]&&(n[$]=O,f=!0)}}}else{Pn(e,t,s,n)&&(f=!0);let h;for(const _ in c)(!t||!U(t,_)&&((h=dt(_))===_||!U(t,h)))&&(a?r&&(r[_]!==void 0||r[h]!==void 0)&&(s[_]=Yr(a,c,_,void 0,e,!0)):delete s[_]);if(n!==c)for(const _ in n)(!t||!U(t,_))&&(delete n[_],f=!0)}f&&Oe(e,"set","$attrs")}function Pn(e,t,r,o){const[s,n]=e.propsOptions;let i=!1,c;if(t)for(let a in t){if(qt(a))continue;const f=t[a];let h;s&&U(s,h=$e(a))?!n||!n.includes(h)?r[h]=f:(c||(c={}))[h]=f:fr(e.emitsOptions,a)||(!(a in o)||f!==o[a])&&(o[a]=f,i=!0)}if(n){const a=N(r),f=c||F;for(let h=0;h<n.length;h++){const _=n[h];r[_]=Yr(s,a,_,f[_],e,!U(f,_))}}return i}function Yr(e,t,r,o,s,n){const i=e[r];if(i!=null){const c=U(i,"default");if(c&&o===void 0){const a=i.default;if(i.type!==Function&&!i.skipFactory&&S(a)){const{propsDefaults:f}=s;r in f?o=f[r]:(at(s),o=f[r]=a.call(null,t),Ye())}else o=a}i[0]&&(n&&!c?o=!1:i[1]&&(o===""||o===dt(r))&&(o=!0))}return o}function Cn(e,t,r=!1){const o=t.propsCache,s=o.get(e);if(s)return s;const n=e.props,i={},c=[];let a=!1;if(!S(e)){const h=_=>{a=!0;const[$,O]=Cn(_,t,!0);q(i,$),O&&c.push(...O)};!r&&t.mixins.length&&t.mixins.forEach(h),e.extends&&h(e.extends),e.mixins&&e.mixins.forEach(h)}if(!n&&!a)return z(e)&&o.set(e,rt),rt;if(C(n))for(let h=0;h<n.length;h++){const _=$e(n[h]);Jo(_)&&(i[_]=F)}else if(n)for(const h in n){const _=$e(h);if(Jo(_)){const $=n[h],O=i[_]=C($)||S($)?{type:$}:q({},$);if(O){const k=Qo(Boolean,O.type),T=Qo(String,O.type);O[0]=k>-1,O[1]=T<0||k<T,(k>-1||U(O,"default"))&&c.push(_)}}}const f=[i,c];return z(e)&&o.set(e,f),f}function Jo(e){return e[0]!=="$"}function Xo(e){const t=e&&e.toString().match(/^\s*(function|class) (\w+)/);return t?t[2]:e===null?"null":""}function Zo(e,t){return Xo(e)===Xo(t)}function Qo(e,t){return C(t)?t.findIndex(r=>Zo(r,e)):S(t)&&Zo(t,e)?0:-1}const Sn=e=>e[0]==="_"||e==="$stable",mo=e=>C(e)?e.map(ge):[ge(e)],Rl=(e,t,r)=>{if(t._n)return t;const o=tl((...s)=>mo(t(...s)),r);return o._c=!1,o},Tn=(e,t,r)=>{const o=e._ctx;for(const s in e){if(Sn(s))continue;const n=e[s];if(S(n))t[s]=Rl(s,n,o);else if(n!=null){const i=mo(n);t[s]=()=>i}}},In=(e,t)=>{const r=mo(t);e.slots.default=()=>r},Hl=(e,t)=>{if(e.vnode.shapeFlag&32){const r=t._;r?(e.slots=N(t),Qt(t,"_",r)):Tn(t,e.slots={})}else e.slots={},t&&In(e,t);Qt(e.slots,pr,1)},Ll=(e,t,r)=>{const{vnode:o,slots:s}=e;let n=!0,i=F;if(o.shapeFlag&32){const c=t._;c?r&&c===1?n=!1:(q(s,t),!r&&c===1&&delete s._):(n=!t.$stable,Tn(t,s)),i=t}else t&&(In(e,t),i={default:1});if(n)for(const c in s)!Sn(c)&&i[c]==null&&delete s[c]};function Jr(e,t,r,o,s=!1){if(C(e)){e.forEach(($,O)=>Jr($,t&&(C(t)?t[O]:t),r,o,s));return}if(Yt(o)&&!s)return;const n=o.shapeFlag&4?wo(o.component)||o.component.proxy:o.el,i=s?null:n,{i:c,r:a}=e,f=t&&t.r,h=c.refs===F?c.refs={}:c.refs,_=c.setupState;if(f!=null&&f!==a&&(Y(f)?(h[f]=null,U(_,f)&&(_[f]=null)):te(f)&&(f.value=null)),S(a))Ne(a,c,12,[i,h]);else{const $=Y(a),O=te(a);if($||O){const k=()=>{if(e.f){const T=$?U(_,a)?_[a]:h[a]:a.value;s?C(T)&&oo(T,n):C(T)?T.includes(n)||T.push(n):$?(h[a]=[n],U(_,a)&&(_[a]=h[a])):(a.value=[n],e.k&&(h[e.k]=a.value))}else $?(h[a]=i,U(_,a)&&(_[a]=i)):O&&(a.value=i,e.k&&(h[e.k]=i))};i?(k.id=-1,re(k,r)):k()}}}const re=cl;function Fl(e){return jl(e)}function jl(e,t){const r=Fr();r.__VUE__=!0;const{insert:o,remove:s,patchProp:n,createElement:i,createText:c,createComment:a,setText:f,setElementText:h,parentNode:_,nextSibling:$,setScopeId:O=ye,insertStaticContent:k}=e,T=(l,u,d,p=null,v=null,m=null,w=!1,g=null,y=!!u.dynamicChildren)=>{if(l===u)return;l&&!gt(l,u)&&(p=kt(l),pe(l,v,m,!0),l=null),u.patchFlag===-2&&(y=!1,u.dynamicChildren=null);const{type:b,ref:x,shapeFlag:E}=u;switch(b){case hr:K(l,u,d,p);break;case Ct:J(l,u,d,p);break;case Or:l==null&&X(u,d,p,w);break;case _e:Lt(l,u,d,p,v,m,w,g,y);break;default:E&1?Se(l,u,d,p,v,m,w,g,y):E&6?Ft(l,u,d,p,v,m,w,g,y):(E&64||E&128)&&b.process(l,u,d,p,v,m,w,g,y,Xe)}x!=null&&v&&Jr(x,l&&l.ref,m,u||l,!u)},K=(l,u,d,p)=>{if(l==null)o(u.el=c(u.children),d,p);else{const v=u.el=l.el;u.children!==l.children&&f(v,u.children)}},J=(l,u,d,p)=>{l==null?o(u.el=a(u.children||""),d,p):u.el=l.el},X=(l,u,d,p)=>{[l.el,l.anchor]=k(l.children,u,d,p,l.el,l.anchor)},Z=({el:l,anchor:u},d,p)=>{let v;for(;l&&l!==u;)v=$(l),o(l,d,p),l=v;o(u,d,p)},I=({el:l,anchor:u})=>{let d;for(;l&&l!==u;)d=$(l),s(l),l=d;s(u)},Se=(l,u,d,p,v,m,w,g,y)=>{w=w||u.type==="svg",l==null?vt(u,d,p,v,m,w,g,y):_r(l,u,v,m,w,g,y)},vt=(l,u,d,p,v,m,w,g)=>{let y,b;const{type:x,props:E,shapeFlag:A,transition:P,dirs:M}=l;if(y=l.el=i(l.type,m,E&&E.is,E),A&8?h(y,l.children):A&16&&He(l.children,y,null,p,v,m&&x!=="foreignObject",w,g),M&&ke(l,null,p,"created"),Ht(y,l,l.scopeId,w,p),E){for(const R in E)R!=="value"&&!qt(R)&&n(y,R,null,E[R],m,l.children,p,v,xe);"value"in E&&n(y,"value",null,E.value),(b=E.onVnodeBeforeMount)&&be(b,p,l)}M&&ke(l,null,p,"beforeMount");const L=kl(v,P);L&&P.beforeEnter(y),o(y,u,d),((b=E&&E.onVnodeMounted)||L||M)&&re(()=>{b&&be(b,p,l),L&&P.enter(y),M&&ke(l,null,p,"mounted")},v)},Ht=(l,u,d,p,v)=>{if(d&&O(l,d),p)for(let m=0;m<p.length;m++)O(l,p[m]);if(v){let m=v.subTree;if(u===m){const w=v.vnode;Ht(l,w,w.scopeId,w.slotScopeIds,v.parent)}}},He=(l,u,d,p,v,m,w,g,y=0)=>{for(let b=y;b<l.length;b++){const x=l[b]=g?Ie(l[b]):ge(l[b]);T(null,x,u,d,p,v,m,w,g)}},_r=(l,u,d,p,v,m,w)=>{const g=u.el=l.el;let{patchFlag:y,dynamicChildren:b,dirs:x}=u;y|=l.patchFlag&16;const E=l.props||F,A=u.props||F;let P;d&&De(d,!1),(P=A.onVnodeBeforeUpdate)&&be(P,d,u,l),x&&ke(u,l,d,"beforeUpdate"),d&&De(d,!0);const M=v&&u.type!=="foreignObject";if(b?Le(l.dynamicChildren,b,g,d,p,M,m):w||H(l,u,g,null,d,p,M,m,!1),y>0){if(y&16)bt(g,u,E,A,d,p,v);else if(y&2&&E.class!==A.class&&n(g,"class",null,A.class,v),y&4&&n(g,"style",E.style,A.style,v),y&8){const L=u.dynamicProps;for(let R=0;R<L.length;R++){const V=L[R],ae=E[V],Ze=A[V];(Ze!==ae||V==="value")&&n(g,V,ae,Ze,v,l.children,d,p,xe)}}y&1&&l.children!==u.children&&h(g,u.children)}else!w&&b==null&&bt(g,u,E,A,d,p,v);((P=A.onVnodeUpdated)||x)&&re(()=>{P&&be(P,d,u,l),x&&ke(u,l,d,"updated")},p)},Le=(l,u,d,p,v,m,w)=>{for(let g=0;g<u.length;g++){const y=l[g],b=u[g],x=y.el&&(y.type===_e||!gt(y,b)||y.shapeFlag&70)?_(y.el):d;T(y,b,x,null,p,v,m,w,!0)}},bt=(l,u,d,p,v,m,w)=>{if(d!==p){if(d!==F)for(const g in d)!qt(g)&&!(g in p)&&n(l,g,d[g],null,w,u.children,v,m,xe);for(const g in p){if(qt(g))continue;const y=p[g],b=d[g];y!==b&&g!=="value"&&n(l,g,b,y,w,u.children,v,m,xe)}"value"in p&&n(l,"value",d.value,p.value)}},Lt=(l,u,d,p,v,m,w,g,y)=>{const b=u.el=l?l.el:c(""),x=u.anchor=l?l.anchor:c("");let{patchFlag:E,dynamicChildren:A,slotScopeIds:P}=u;P&&(g=g?g.concat(P):P),l==null?(o(b,d,p),o(x,d,p),He(u.children,d,x,v,m,w,g,y)):E>0&&E&64&&A&&l.dynamicChildren?(Le(l.dynamicChildren,A,d,v,m,w,g),(u.key!=null||v&&u===v.subTree)&&Mn(l,u,!0)):H(l,u,d,x,v,m,w,g,y)},Ft=(l,u,d,p,v,m,w,g,y)=>{u.slotScopeIds=g,l==null?u.shapeFlag&512?v.ctx.activate(u,d,p,w,y):gr(u,d,p,v,m,w,y):Po(l,u,y)},gr=(l,u,d,p,v,m,w)=>{const g=l.component=ea(l,p,v);if(wn(l)&&(g.ctx.renderer=Xe),ta(g),g.asyncDep){if(v&&v.registerDep(g,G),!l.el){const y=g.subTree=Pe(Ct);J(null,y,u,d)}return}G(g,l,u,d,v,m,w)},Po=(l,u,d)=>{const p=u.component=l.component;if(sl(l,u,d))if(p.asyncDep&&!p.asyncResolved){D(p,u,d);return}else p.next=u,Zi(p.update),p.update();else u.el=l.el,p.vnode=u},G=(l,u,d,p,v,m,w)=>{const g=()=>{if(l.isMounted){let{next:x,bu:E,u:A,parent:P,vnode:M}=l,L=x,R;De(l,!1),x?(x.el=M.el,D(l,x,w)):x=M,E&&wr(E),(R=x.props&&x.props.onVnodeBeforeUpdate)&&be(R,P,x,M),De(l,!0);const V=Er(l),ae=l.subTree;l.subTree=V,T(ae,V,_(ae.el),kt(ae),l,v,m),x.el=V.el,L===null&&nl(l,V.el),A&&re(A,v),(R=x.props&&x.props.onVnodeUpdated)&&re(()=>be(R,P,x,M),v)}else{let x;const{el:E,props:A}=u,{bm:P,m:M,parent:L}=l,R=Yt(u);if(De(l,!1),P&&wr(P),!R&&(x=A&&A.onVnodeBeforeMount)&&be(x,L,u),De(l,!0),E&&yr){const V=()=>{l.subTree=Er(l),yr(E,l.subTree,l,v,null)};R?u.type.__asyncLoader().then(()=>!l.isUnmounted&&V()):V()}else{const V=l.subTree=Er(l);T(null,V,d,p,l,v,m),u.el=V.el}if(M&&re(M,v),!R&&(x=A&&A.onVnodeMounted)){const V=u;re(()=>be(x,L,V),v)}(u.shapeFlag&256||L&&Yt(L.vnode)&&L.vnode.shapeFlag&256)&&l.a&&re(l.a,v),l.isMounted=!0,u=d=p=null}},y=l.effect=new ao(g,()=>_o(b),l.scope),b=l.update=()=>y.run();b.id=l.uid,De(l,!0),b()},D=(l,u,d)=>{u.component=l;const p=l.vnode.props;l.vnode=u,l.next=null,Nl(l,u.props,p,d),Ll(l,u.children,d),ht(),Do(),pt()},H=(l,u,d,p,v,m,w,g,y=!1)=>{const b=l&&l.children,x=l?l.shapeFlag:0,E=u.children,{patchFlag:A,shapeFlag:P}=u;if(A>0){if(A&128){jt(b,E,d,p,v,m,w,g,y);return}else if(A&256){Fe(b,E,d,p,v,m,w,g,y);return}}P&8?(x&16&&xe(b,v,m),E!==b&&h(d,E)):x&16?P&16?jt(b,E,d,p,v,m,w,g,y):xe(b,v,m,!0):(x&8&&h(d,""),P&16&&He(E,d,p,v,m,w,g,y))},Fe=(l,u,d,p,v,m,w,g,y)=>{l=l||rt,u=u||rt;const b=l.length,x=u.length,E=Math.min(b,x);let A;for(A=0;A<E;A++){const P=u[A]=y?Ie(u[A]):ge(u[A]);T(l[A],P,d,null,v,m,w,g,y)}b>x?xe(l,v,m,!0,!1,E):He(u,d,p,v,m,w,g,y,E)},jt=(l,u,d,p,v,m,w,g,y)=>{let b=0;const x=u.length;let E=l.length-1,A=x-1;for(;b<=E&&b<=A;){const P=l[b],M=u[b]=y?Ie(u[b]):ge(u[b]);if(gt(P,M))T(P,M,d,null,v,m,w,g,y);else break;b++}for(;b<=E&&b<=A;){const P=l[E],M=u[A]=y?Ie(u[A]):ge(u[A]);if(gt(P,M))T(P,M,d,null,v,m,w,g,y);else break;E--,A--}if(b>E){if(b<=A){const P=A+1,M=P<x?u[P].el:p;for(;b<=A;)T(null,u[b]=y?Ie(u[b]):ge(u[b]),d,M,v,m,w,g,y),b++}}else if(b>A)for(;b<=E;)pe(l[b],v,m,!0),b++;else{const P=b,M=b,L=new Map;for(b=M;b<=A;b++){const se=u[b]=y?Ie(u[b]):ge(u[b]);se.key!=null&&L.set(se.key,b)}let R,V=0;const ae=A-M+1;let Ze=!1,To=0;const _t=new Array(ae);for(b=0;b<ae;b++)_t[b]=0;for(b=P;b<=E;b++){const se=l[b];if(V>=ae){pe(se,v,m,!0);continue}let ve;if(se.key!=null)ve=L.get(se.key);else for(R=M;R<=A;R++)if(_t[R-M]===0&&gt(se,u[R])){ve=R;break}ve===void 0?pe(se,v,m,!0):(_t[ve-M]=b+1,ve>=To?To=ve:Ze=!0,T(se,u[ve],d,null,v,m,w,g,y),V++)}const Io=Ze?Dl(_t):rt;for(R=Io.length-1,b=ae-1;b>=0;b--){const se=M+b,ve=u[se],Mo=se+1<x?u[se+1].el:p;_t[b]===0?T(null,ve,d,Mo,v,m,w,g,y):Ze&&(R<0||b!==Io[R]?je(ve,d,Mo,2):R--)}}},je=(l,u,d,p,v=null)=>{const{el:m,type:w,transition:g,children:y,shapeFlag:b}=l;if(b&6){je(l.component.subTree,u,d,p);return}if(b&128){l.suspense.move(u,d,p);return}if(b&64){w.move(l,u,d,Xe);return}if(w===_e){o(m,u,d);for(let E=0;E<y.length;E++)je(y[E],u,d,p);o(l.anchor,u,d);return}if(w===Or){Z(l,u,d);return}if(p!==2&&b&1&&g)if(p===0)g.beforeEnter(m),o(m,u,d),re(()=>g.enter(m),v);else{const{leave:E,delayLeave:A,afterLeave:P}=g,M=()=>o(m,u,d),L=()=>{E(m,()=>{M(),P&&P()})};A?A(m,M,L):L()}else o(m,u,d)},pe=(l,u,d,p=!1,v=!1)=>{const{type:m,props:w,ref:g,children:y,dynamicChildren:b,shapeFlag:x,patchFlag:E,dirs:A}=l;if(g!=null&&Jr(g,null,d,l,!0),x&256){u.ctx.deactivate(l);return}const P=x&1&&A,M=!Yt(l);let L;if(M&&(L=w&&w.onVnodeBeforeUnmount)&&be(L,u,l),x&6)ti(l.component,d,p);else{if(x&128){l.suspense.unmount(d,p);return}P&&ke(l,null,u,"beforeUnmount"),x&64?l.type.remove(l,u,d,v,Xe,p):b&&(m!==_e||E>0&&E&64)?xe(b,u,d,!1,!0):(m===_e&&E&384||!v&&x&16)&&xe(y,u,d),p&&Co(l)}(M&&(L=w&&w.onVnodeUnmounted)||P)&&re(()=>{L&&be(L,u,l),P&&ke(l,null,u,"unmounted")},d)},Co=l=>{const{type:u,el:d,anchor:p,transition:v}=l;if(u===_e){ei(d,p);return}if(u===Or){I(l);return}const m=()=>{s(d),v&&!v.persisted&&v.afterLeave&&v.afterLeave()};if(l.shapeFlag&1&&v&&!v.persisted){const{leave:w,delayLeave:g}=v,y=()=>w(d,m);g?g(l.el,m,y):y()}else m()},ei=(l,u)=>{let d;for(;l!==u;)d=$(l),s(l),l=d;s(u)},ti=(l,u,d)=>{const{bum:p,scope:v,update:m,subTree:w,um:g}=l;p&&wr(p),v.stop(),m&&(m.active=!1,pe(w,l,u,d)),g&&re(g,u),re(()=>{l.isUnmounted=!0},u),u&&u.pendingBranch&&!u.isUnmounted&&l.asyncDep&&!l.asyncResolved&&l.suspenseId===u.pendingId&&(u.deps--,u.deps===0&&u.resolve())},xe=(l,u,d,p=!1,v=!1,m=0)=>{for(let w=m;w<l.length;w++)pe(l[w],u,d,p,v)},kt=l=>l.shapeFlag&6?kt(l.component.subTree):l.shapeFlag&128?l.suspense.next():$(l.anchor||l.el),So=(l,u,d)=>{l==null?u._vnode&&pe(u._vnode,null,null,!0):T(u._vnode||null,l,u,null,null,null,d),Do(),vn(),u._vnode=l},Xe={p:T,um:pe,m:je,r:Co,mt:gr,mc:He,pc:H,pbc:Le,n:kt,o:e};let mr,yr;return t&&([mr,yr]=t(Xe)),{render:So,hydrate:mr,createApp:Il(So,mr)}}function De({effect:e,update:t},r){e.allowRecurse=t.allowRecurse=r}function kl(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function Mn(e,t,r=!1){const o=e.children,s=t.children;if(C(o)&&C(s))for(let n=0;n<o.length;n++){const i=o[n];let c=s[n];c.shapeFlag&1&&!c.dynamicChildren&&((c.patchFlag<=0||c.patchFlag===32)&&(c=s[n]=Ie(s[n]),c.el=i.el),r||Mn(i,c)),c.type===hr&&(c.el=i.el)}}function Dl(e){const t=e.slice(),r=[0];let o,s,n,i,c;const a=e.length;for(o=0;o<a;o++){const f=e[o];if(f!==0){if(s=r[r.length-1],e[s]<f){t[o]=s,r.push(o);continue}for(n=0,i=r.length-1;n<i;)c=n+i>>1,e[r[c]]<f?n=c+1:i=c;f<e[r[n]]&&(n>0&&(t[o]=r[n-1]),r[n]=o)}}for(n=r.length,i=r[n-1];n-- >0;)r[n]=i,i=t[i];return r}const Bl=e=>e.__isTeleport,_e=Symbol.for("v-fgt"),hr=Symbol.for("v-txt"),Ct=Symbol.for("v-cmt"),Or=Symbol.for("v-stc"),xt=[];let de=null;function Vl(e=!1){xt.push(de=e?null:[])}function zl(){xt.pop(),de=xt[xt.length-1]||null}let St=1;function Go(e){St+=e}function Kl(e){return e.dynamicChildren=St>0?de||rt:null,zl(),St>0&&de&&de.push(e),e}function Wl(e,t,r,o,s,n){return Kl(Nn(e,t,r,o,s,n,!0))}function ql(e){return e?e.__v_isVNode===!0:!1}function gt(e,t){return e.type===t.type&&e.key===t.key}const pr="__vInternal",Un=({key:e})=>e??null,Xt=({ref:e,ref_key:t,ref_for:r})=>(typeof e=="number"&&(e=""+e),e!=null?Y(e)||te(e)||S(e)?{i:fe,r:e,k:t,f:!!r}:e:null);function Nn(e,t=null,r=null,o=0,s=null,n=e===_e?0:1,i=!1,c=!1){const a={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&Un(t),ref:t&&Xt(t),scopeId:gn,slotScopeIds:null,children:r,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:n,patchFlag:o,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:fe};return c?(yo(a,r),n&128&&e.normalize(a)):r&&(a.shapeFlag|=Y(r)?8:16),St>0&&!i&&de&&(a.patchFlag>0||n&6)&&a.patchFlag!==32&&de.push(a),a}const Pe=Yl;function Yl(e,t=null,r=null,o=0,s=null,n=!1){if((!e||e===il)&&(e=Ct),ql(e)){const c=lt(e,t,!0);return r&&yo(c,r),St>0&&!n&&de&&(c.shapeFlag&6?de[de.indexOf(e)]=c:de.push(c)),c.patchFlag|=-2,c}if(ia(e)&&(e=e.__vccOpts),t){t=Jl(t);let{class:c,style:a}=t;c&&!Y(c)&&(t.class=io(c)),z(a)&&(un(a)&&!C(a)&&(a=q({},a)),t.style=no(a))}const i=Y(e)?1:al(e)?128:Bl(e)?64:z(e)?4:S(e)?2:0;return Nn(e,t,r,o,s,i,n,!0)}function Jl(e){return e?un(e)||pr in e?q({},e):e:null}function lt(e,t,r=!1){const{props:o,ref:s,patchFlag:n,children:i}=e,c=t?Zl(o||{},t):o;return{__v_isVNode:!0,__v_skip:!0,type:e.type,props:c,key:c&&Un(c),ref:t&&t.ref?r&&s?C(s)?s.concat(Xt(t)):[s,Xt(t)]:Xt(t):s,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:i,target:e.target,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==_e?n===-1?16:n|16:n,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:e.transition,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&lt(e.ssContent),ssFallback:e.ssFallback&&lt(e.ssFallback),el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce}}function Xl(e=" ",t=0){return Pe(hr,null,e,t)}function ge(e){return e==null||typeof e=="boolean"?Pe(Ct):C(e)?Pe(_e,null,e.slice()):typeof e=="object"?Ie(e):Pe(hr,null,String(e))}function Ie(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:lt(e)}function yo(e,t){let r=0;const{shapeFlag:o}=e;if(t==null)t=null;else if(C(t))r=16;else if(typeof t=="object")if(o&65){const s=t.default;s&&(s._c&&(s._d=!1),yo(e,s()),s._c&&(s._d=!0));return}else{r=32;const s=t._;!s&&!(pr in t)?t._ctx=fe:s===3&&fe&&(fe.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else S(t)?(t={default:t,_ctx:fe},r=32):(t=String(t),o&64?(r=16,t=[Xl(t)]):r=8);e.children=t,e.shapeFlag|=r}function Zl(...e){const t={};for(let r=0;r<e.length;r++){const o=e[r];for(const s in o)if(s==="class")t.class!==o.class&&(t.class=io([t.class,o.class]));else if(s==="style")t.style=no([t.style,o.style]);else if(sr(s)){const n=t[s],i=o[s];i&&n!==i&&!(C(n)&&n.includes(i))&&(t[s]=n?[].concat(n,i):i)}else s!==""&&(t[s]=o[s])}return t}function be(e,t,r,o=null){he(e,t,7,[r,o])}const Ql=On();let Gl=0;function ea(e,t,r){const o=e.type,s=(t?t.appContext:e.appContext)||Ql,n={uid:Gl++,vnode:e,type:o,parent:t,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,scope:new gi(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(s.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Cn(o,s),emitsOptions:_n(o,s),emit:null,emitted:null,propsDefaults:F,inheritAttrs:o.inheritAttrs,ctx:F,data:F,props:F,attrs:F,slots:F,refs:F,setupState:F,setupContext:null,attrsProxy:null,slotsProxy:null,suspense:r,suspenseId:r?r.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return n.ctx={_:n},n.root=t?t.root:n,n.emit=el.bind(null,n),e.ce&&e.ce(n),n}let W=null,$o,Qe,es="__VUE_INSTANCE_SETTERS__";(Qe=Fr()[es])||(Qe=Fr()[es]=[]),Qe.push(e=>W=e),$o=e=>{Qe.length>1?Qe.forEach(t=>t(e)):Qe[0](e)};const at=e=>{$o(e),e.scope.on()},Ye=()=>{W&&W.scope.off(),$o(null)};function Rn(e){return e.vnode.shapeFlag&4}let Tt=!1;function ta(e,t=!1){Tt=t;const{props:r,children:o}=e.vnode,s=Rn(e);Ul(e,r,s,t),Hl(e,o);const n=s?ra(e,t):void 0;return Tt=!1,n}function ra(e,t){const r=e.type;e.accessCache=Object.create(null),e.proxy=fn(new Proxy(e.ctx,xl));const{setup:o}=r;if(o){const s=e.setupContext=o.length>1?sa(e):null;at(e),ht();const n=Ne(o,e,0,[e.props,s]);if(pt(),Ye(),Xs(n)){if(n.then(Ye,Ye),t)return n.then(i=>{ts(e,i,t)}).catch(i=>{ur(i,e,0)});e.asyncDep=n}else ts(e,n,t)}else Hn(e,t)}function ts(e,t,r){S(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:z(t)&&(e.setupState=dn(t)),Hn(e,r)}let rs;function Hn(e,t,r){const o=e.type;if(!e.render){if(!t&&rs&&!o.render){const s=o.template||go(e).template;if(s){const{isCustomElement:n,compilerOptions:i}=e.appContext.config,{delimiters:c,compilerOptions:a}=o,f=q(q({isCustomElement:n,delimiters:c},i),a);o.render=rs(s,f)}}e.render=o.render||ye}{at(e),ht();try{Al(e)}finally{pt(),Ye()}}}function oa(e){return e.attrsProxy||(e.attrsProxy=new Proxy(e.attrs,{get(t,r){return oe(e,"get","$attrs"),t[r]}}))}function sa(e){const t=r=>{e.exposed=r||{}};return{get attrs(){return oa(e)},slots:e.slots,emit:e.emit,expose:t}}function wo(e){if(e.exposed)return e.exposeProxy||(e.exposeProxy=new Proxy(dn(fn(e.exposed)),{get(t,r){if(r in t)return t[r];if(r in Et)return Et[r](e)},has(t,r){return r in t||r in Et}}))}function na(e,t=!0){return S(e)?e.displayName||e.name:e.name||t&&e.__name}function ia(e){return S(e)&&"__vccOpts"in e}const la=(e,t)=>qi(e,t,Tt),aa=Symbol.for("v-scx"),ca=()=>Jt(aa),ua="3.3.8",fa="http://www.w3.org/2000/svg",Ke=typeof document<"u"?document:null,os=Ke&&Ke.createElement("template"),da={insert:(e,t,r)=>{t.insertBefore(e,r||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,r,o)=>{const s=t?Ke.createElementNS(fa,e):Ke.createElement(e,r?{is:r}:void 0);return e==="select"&&o&&o.multiple!=null&&s.setAttribute("multiple",o.multiple),s},createText:e=>Ke.createTextNode(e),createComment:e=>Ke.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>Ke.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,r,o,s,n){const i=r?r.previousSibling:t.lastChild;if(s&&(s===n||s.nextSibling))for(;t.insertBefore(s.cloneNode(!0),r),!(s===n||!(s=s.nextSibling)););else{os.innerHTML=o?`<svg>${e}</svg>`:e;const c=os.content;if(o){const a=c.firstChild;for(;a.firstChild;)c.appendChild(a.firstChild);c.removeChild(a)}t.insertBefore(c,r)}return[i?i.nextSibling:t.firstChild,r?r.previousSibling:t.lastChild]}},ha=Symbol("_vtc");function pa(e,t,r){const o=e[ha];o&&(t=(t?[t,...o]:[...o]).join(" ")),t==null?e.removeAttribute("class"):r?e.setAttribute("class",t):e.className=t}const va=Symbol("_vod");function ba(e,t,r){const o=e.style,s=Y(r);if(r&&!s){if(t&&!Y(t))for(const n in t)r[n]==null&&Xr(o,n,"");for(const n in r)Xr(o,n,r[n])}else{const n=o.display;s?t!==r&&(o.cssText=r):t&&e.removeAttribute("style"),va in e&&(o.display=n)}}const ss=/\s*!important$/;function Xr(e,t,r){if(C(r))r.forEach(o=>Xr(e,t,o));else if(r==null&&(r=""),t.startsWith("--"))e.setProperty(t,r);else{const o=_a(e,t);ss.test(r)?e.setProperty(dt(o),r.replace(ss,""),"important"):e[o]=r}}const ns=["Webkit","Moz","ms"],Pr={};function _a(e,t){const r=Pr[t];if(r)return r;let o=$e(t);if(o!=="filter"&&o in e)return Pr[t]=o;o=ar(o);for(let s=0;s<ns.length;s++){const n=ns[s]+o;if(n in e)return Pr[t]=n}return t}const is="http://www.w3.org/1999/xlink";function ga(e,t,r,o,s){if(o&&t.startsWith("xlink:"))r==null?e.removeAttributeNS(is,t.slice(6,t.length)):e.setAttributeNS(is,t,r);else{const n=_i(t);r==null||n&&!Zs(r)?e.removeAttribute(t):e.setAttribute(t,n?"":r)}}function ma(e,t,r,o,s,n,i){if(t==="innerHTML"||t==="textContent"){o&&i(o,s,n),e[t]=r??"";return}const c=e.tagName;if(t==="value"&&c!=="PROGRESS"&&!c.includes("-")){e._value=r;const f=c==="OPTION"?e.getAttribute("value"):e.value,h=r??"";f!==h&&(e.value=h),r==null&&e.removeAttribute(t);return}let a=!1;if(r===""||r==null){const f=typeof e[t];f==="boolean"?r=Zs(r):r==null&&f==="string"?(r="",a=!0):f==="number"&&(r=0,a=!0)}try{e[t]=r}catch{}a&&e.removeAttribute(t)}function ya(e,t,r,o){e.addEventListener(t,r,o)}function $a(e,t,r,o){e.removeEventListener(t,r,o)}const ls=Symbol("_vei");function wa(e,t,r,o,s=null){const n=e[ls]||(e[ls]={}),i=n[t];if(o&&i)i.value=o;else{const[c,a]=Ea(t);if(o){const f=n[t]=Oa(o,s);ya(e,c,f,a)}else i&&($a(e,c,i,a),n[t]=void 0)}}const as=/(?:Once|Passive|Capture)$/;function Ea(e){let t;if(as.test(e)){t={};let o;for(;o=e.match(as);)e=e.slice(0,e.length-o[0].length),t[o[0].toLowerCase()]=!0}return[e[2]===":"?e.slice(3):dt(e.slice(2)),t]}let Cr=0;const xa=Promise.resolve(),Aa=()=>Cr||(xa.then(()=>Cr=0),Cr=Date.now());function Oa(e,t){const r=o=>{if(!o._vts)o._vts=Date.now();else if(o._vts<=r.attached)return;he(Pa(o,r.value),t,5,[o])};return r.value=e,r.attached=Aa(),r}function Pa(e,t){if(C(t)){const r=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{r.call(e),e._stopped=!0},t.map(o=>s=>!s._stopped&&o&&o(s))}else return t}const cs=/^on[a-z]/,Ca=(e,t,r,o,s=!1,n,i,c,a)=>{t==="class"?pa(e,o,s):t==="style"?ba(e,r,o):sr(t)?ro(t)||wa(e,t,r,o,i):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):Sa(e,t,o,s))?ma(e,t,o,n,i,c,a):(t==="true-value"?e._trueValue=o:t==="false-value"&&(e._falseValue=o),ga(e,t,o,s))};function Sa(e,t,r,o){return o?!!(t==="innerHTML"||t==="textContent"||t in e&&cs.test(t)&&S(r)):t==="spellcheck"||t==="draggable"||t==="translate"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA"||cs.test(t)&&Y(r)?!1:t in e}const Ta=q({patchProp:Ca},da);let us;function Ia(){return us||(us=Fl(Ta))}const Ma=(...e)=>{const t=Ia().createApp(...e),{mount:r}=t;return t.mount=o=>{const s=Ua(o);if(!s)return;const n=t._component;!S(n)&&!n.render&&!n.template&&(n.template=s.innerHTML),s.innerHTML="";const i=r(s,!1,s instanceof SVGElement);return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),i},t};function Ua(e){return Y(e)?document.querySelector(e):e}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Zt=window,Eo=Zt.ShadowRoot&&(Zt.ShadyCSS===void 0||Zt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,xo=Symbol(),fs=new WeakMap;let Ln=class{constructor(t,r,o){if(this._$cssResult$=!0,o!==xo)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=r}get styleSheet(){let t=this.o;const r=this.t;if(Eo&&t===void 0){const o=r!==void 0&&r.length===1;o&&(t=fs.get(r)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&fs.set(r,t))}return t}toString(){return this.cssText}};const vr=e=>new Ln(typeof e=="string"?e:e+"",void 0,xo),Nt=(e,...t)=>{const r=e.length===1?e[0]:t.reduce((o,s,n)=>o+(i=>{if(i._$cssResult$===!0)return i.cssText;if(typeof i=="number")return i;throw Error("Value passed to 'css' function must be a 'css' function result: "+i+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+e[n+1],e[0]);return new Ln(r,e,xo)},Na=(e,t)=>{Eo?e.adoptedStyleSheets=t.map(r=>r instanceof CSSStyleSheet?r:r.styleSheet):t.forEach(r=>{const o=document.createElement("style"),s=Zt.litNonce;s!==void 0&&o.setAttribute("nonce",s),o.textContent=r.cssText,e.appendChild(o)})},ds=Eo?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let r="";for(const o of t.cssRules)r+=o.cssText;return vr(r)})(e):e;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Sr;const rr=window,hs=rr.trustedTypes,Ra=hs?hs.emptyScript:"",ps=rr.reactiveElementPolyfillSupport,Zr={toAttribute(e,t){switch(t){case Boolean:e=e?Ra:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let r=e;switch(t){case Boolean:r=e!==null;break;case Number:r=e===null?null:Number(e);break;case Object:case Array:try{r=JSON.parse(e)}catch{r=null}}return r}},Fn=(e,t)=>t!==e&&(t==t||e==e),Tr={attribute:!0,type:String,converter:Zr,reflect:!1,hasChanged:Fn},Qr="finalized";let Ge=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var r;this.finalize(),((r=this.h)!==null&&r!==void 0?r:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((r,o)=>{const s=this._$Ep(o,r);s!==void 0&&(this._$Ev.set(s,o),t.push(s))}),t}static createProperty(t,r=Tr){if(r.state&&(r.attribute=!1),this.finalize(),this.elementProperties.set(t,r),!r.noAccessor&&!this.prototype.hasOwnProperty(t)){const o=typeof t=="symbol"?Symbol():"__"+t,s=this.getPropertyDescriptor(t,o,r);s!==void 0&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,r,o){return{get(){return this[r]},set(s){const n=this[t];this[r]=s,this.requestUpdate(t,n,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||Tr}static finalize(){if(this.hasOwnProperty(Qr))return!1;this[Qr]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),t.h!==void 0&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const r=this.properties,o=[...Object.getOwnPropertyNames(r),...Object.getOwnPropertySymbols(r)];for(const s of o)this.createProperty(s,r[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const r=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const s of o)r.unshift(ds(s))}else t!==void 0&&r.push(ds(t));return r}static _$Ep(t,r){const o=r.attribute;return o===!1?void 0:typeof o=="string"?o:typeof t=="string"?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(r=>this.enableUpdating=r),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(t=this.constructor.h)===null||t===void 0||t.forEach(r=>r(this))}addController(t){var r,o;((r=this._$ES)!==null&&r!==void 0?r:this._$ES=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((o=t.hostConnected)===null||o===void 0||o.call(t))}removeController(t){var r;(r=this._$ES)===null||r===void 0||r.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,r)=>{this.hasOwnProperty(r)&&(this._$Ei.set(r,this[r]),delete this[r])})}createRenderRoot(){var t;const r=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return Na(r,this.constructor.elementStyles),r}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$ES)===null||t===void 0||t.forEach(r=>{var o;return(o=r.hostConnected)===null||o===void 0?void 0:o.call(r)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$ES)===null||t===void 0||t.forEach(r=>{var o;return(o=r.hostDisconnected)===null||o===void 0?void 0:o.call(r)})}attributeChangedCallback(t,r,o){this._$AK(t,o)}_$EO(t,r,o=Tr){var s;const n=this.constructor._$Ep(t,o);if(n!==void 0&&o.reflect===!0){const i=(((s=o.converter)===null||s===void 0?void 0:s.toAttribute)!==void 0?o.converter:Zr).toAttribute(r,o.type);this._$El=t,i==null?this.removeAttribute(n):this.setAttribute(n,i),this._$El=null}}_$AK(t,r){var o;const s=this.constructor,n=s._$Ev.get(t);if(n!==void 0&&this._$El!==n){const i=s.getPropertyOptions(n),c=typeof i.converter=="function"?{fromAttribute:i.converter}:((o=i.converter)===null||o===void 0?void 0:o.fromAttribute)!==void 0?i.converter:Zr;this._$El=n,this[n]=c.fromAttribute(r,i.type),this._$El=null}}requestUpdate(t,r,o){let s=!0;t!==void 0&&(((o=o||this.constructor.getPropertyOptions(t)).hasChanged||Fn)(this[t],r)?(this._$AL.has(t)||this._$AL.set(t,r),o.reflect===!0&&this._$El!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,o))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(r){Promise.reject(r)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((s,n)=>this[n]=s),this._$Ei=void 0);let r=!1;const o=this._$AL;try{r=this.shouldUpdate(o),r?(this.willUpdate(o),(t=this._$ES)===null||t===void 0||t.forEach(s=>{var n;return(n=s.hostUpdate)===null||n===void 0?void 0:n.call(s)}),this.update(o)):this._$Ek()}catch(s){throw r=!1,this._$Ek(),s}r&&this._$AE(o)}willUpdate(t){}_$AE(t){var r;(r=this._$ES)===null||r===void 0||r.forEach(o=>{var s;return(s=o.hostUpdated)===null||s===void 0?void 0:s.call(o)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach((r,o)=>this._$EO(o,this[o],r)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};Ge[Qr]=!0,Ge.elementProperties=new Map,Ge.elementStyles=[],Ge.shadowRootOptions={mode:"open"},ps==null||ps({ReactiveElement:Ge}),((Sr=rr.reactiveElementVersions)!==null&&Sr!==void 0?Sr:rr.reactiveElementVersions=[]).push("1.6.3");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Ir;const or=window,ct=or.trustedTypes,vs=ct?ct.createPolicy("lit-html",{createHTML:e=>e}):void 0,Gr="$lit$",Me=`lit$${(Math.random()+"").slice(9)}$`,jn="?"+Me,Ha=`<${jn}>`,Je=document,It=()=>Je.createComment(""),Mt=e=>e===null||typeof e!="object"&&typeof e!="function",kn=Array.isArray,La=e=>kn(e)||typeof(e==null?void 0:e[Symbol.iterator])=="function",Mr=`[ 	
\f\r]`,mt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,bs=/-->/g,_s=/>/g,Be=RegExp(`>|${Mr}(?:([^\\s"'>=/]+)(${Mr}*=${Mr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),gs=/'/g,ms=/"/g,Dn=/^(?:script|style|textarea|title)$/i,Bn=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),ne=Bn(1),Vn=Bn(2),ut=Symbol.for("lit-noChange"),B=Symbol.for("lit-nothing"),ys=new WeakMap,We=Je.createTreeWalker(Je,129,null,!1);function zn(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return vs!==void 0?vs.createHTML(t):t}const Fa=(e,t)=>{const r=e.length-1,o=[];let s,n=t===2?"<svg>":"",i=mt;for(let c=0;c<r;c++){const a=e[c];let f,h,_=-1,$=0;for(;$<a.length&&(i.lastIndex=$,h=i.exec(a),h!==null);)$=i.lastIndex,i===mt?h[1]==="!--"?i=bs:h[1]!==void 0?i=_s:h[2]!==void 0?(Dn.test(h[2])&&(s=RegExp("</"+h[2],"g")),i=Be):h[3]!==void 0&&(i=Be):i===Be?h[0]===">"?(i=s??mt,_=-1):h[1]===void 0?_=-2:(_=i.lastIndex-h[2].length,f=h[1],i=h[3]===void 0?Be:h[3]==='"'?ms:gs):i===ms||i===gs?i=Be:i===bs||i===_s?i=mt:(i=Be,s=void 0);const O=i===Be&&e[c+1].startsWith("/>")?" ":"";n+=i===mt?a+Ha:_>=0?(o.push(f),a.slice(0,_)+Gr+a.slice(_)+Me+O):a+Me+(_===-2?(o.push(void 0),c):O)}return[zn(e,n+(e[r]||"<?>")+(t===2?"</svg>":"")),o]};class Ut{constructor({strings:t,_$litType$:r},o){let s;this.parts=[];let n=0,i=0;const c=t.length-1,a=this.parts,[f,h]=Fa(t,r);if(this.el=Ut.createElement(f,o),We.currentNode=this.el.content,r===2){const _=this.el.content,$=_.firstChild;$.remove(),_.append(...$.childNodes)}for(;(s=We.nextNode())!==null&&a.length<c;){if(s.nodeType===1){if(s.hasAttributes()){const _=[];for(const $ of s.getAttributeNames())if($.endsWith(Gr)||$.startsWith(Me)){const O=h[i++];if(_.push($),O!==void 0){const k=s.getAttribute(O.toLowerCase()+Gr).split(Me),T=/([.?@])?(.*)/.exec(O);a.push({type:1,index:n,name:T[2],strings:k,ctor:T[1]==="."?ka:T[1]==="?"?Ba:T[1]==="@"?Va:br})}else a.push({type:6,index:n})}for(const $ of _)s.removeAttribute($)}if(Dn.test(s.tagName)){const _=s.textContent.split(Me),$=_.length-1;if($>0){s.textContent=ct?ct.emptyScript:"";for(let O=0;O<$;O++)s.append(_[O],It()),We.nextNode(),a.push({type:2,index:++n});s.append(_[$],It())}}}else if(s.nodeType===8)if(s.data===jn)a.push({type:2,index:n});else{let _=-1;for(;(_=s.data.indexOf(Me,_+1))!==-1;)a.push({type:7,index:n}),_+=Me.length-1}n++}}static createElement(t,r){const o=Je.createElement("template");return o.innerHTML=t,o}}function ft(e,t,r=e,o){var s,n,i,c;if(t===ut)return t;let a=o!==void 0?(s=r._$Co)===null||s===void 0?void 0:s[o]:r._$Cl;const f=Mt(t)?void 0:t._$litDirective$;return(a==null?void 0:a.constructor)!==f&&((n=a==null?void 0:a._$AO)===null||n===void 0||n.call(a,!1),f===void 0?a=void 0:(a=new f(e),a._$AT(e,r,o)),o!==void 0?((i=(c=r)._$Co)!==null&&i!==void 0?i:c._$Co=[])[o]=a:r._$Cl=a),a!==void 0&&(t=ft(e,a._$AS(e,t.values),a,o)),t}class ja{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var r;const{el:{content:o},parts:s}=this._$AD,n=((r=t==null?void 0:t.creationScope)!==null&&r!==void 0?r:Je).importNode(o,!0);We.currentNode=n;let i=We.nextNode(),c=0,a=0,f=s[0];for(;f!==void 0;){if(c===f.index){let h;f.type===2?h=new Rt(i,i.nextSibling,this,t):f.type===1?h=new f.ctor(i,f.name,f.strings,this,t):f.type===6&&(h=new za(i,this,t)),this._$AV.push(h),f=s[++a]}c!==(f==null?void 0:f.index)&&(i=We.nextNode(),c++)}return We.currentNode=Je,n}v(t){let r=0;for(const o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(t,o,r),r+=o.strings.length-2):o._$AI(t[r])),r++}}class Rt{constructor(t,r,o,s){var n;this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=o,this.options=s,this._$Cp=(n=s==null?void 0:s.isConnected)===null||n===void 0||n}get _$AU(){var t,r;return(r=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&r!==void 0?r:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const r=this._$AM;return r!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=ft(this,t,r),Mt(t)?t===B||t==null||t===""?(this._$AH!==B&&this._$AR(),this._$AH=B):t!==this._$AH&&t!==ut&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):La(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==B&&Mt(this._$AH)?this._$AA.nextSibling.data=t:this.$(Je.createTextNode(t)),this._$AH=t}g(t){var r;const{values:o,_$litType$:s}=t,n=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=Ut.createElement(zn(s.h,s.h[0]),this.options)),s);if(((r=this._$AH)===null||r===void 0?void 0:r._$AD)===n)this._$AH.v(o);else{const i=new ja(n,this),c=i.u(this.options);i.v(o),this.$(c),this._$AH=i}}_$AC(t){let r=ys.get(t.strings);return r===void 0&&ys.set(t.strings,r=new Ut(t)),r}T(t){kn(this._$AH)||(this._$AH=[],this._$AR());const r=this._$AH;let o,s=0;for(const n of t)s===r.length?r.push(o=new Rt(this.k(It()),this.k(It()),this,this.options)):o=r[s],o._$AI(n),s++;s<r.length&&(this._$AR(o&&o._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){var o;for((o=this._$AP)===null||o===void 0||o.call(this,!1,!0,r);t&&t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){var r;this._$AM===void 0&&(this._$Cp=t,(r=this._$AP)===null||r===void 0||r.call(this,t))}}class br{constructor(t,r,o,s,n){this.type=1,this._$AH=B,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=n,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=B}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,r=this,o,s){const n=this.strings;let i=!1;if(n===void 0)t=ft(this,t,r,0),i=!Mt(t)||t!==this._$AH&&t!==ut,i&&(this._$AH=t);else{const c=t;let a,f;for(t=n[0],a=0;a<n.length-1;a++)f=ft(this,c[o+a],r,a),f===ut&&(f=this._$AH[a]),i||(i=!Mt(f)||f!==this._$AH[a]),f===B?t=B:t!==B&&(t+=(f??"")+n[a+1]),this._$AH[a]=f}i&&!s&&this.j(t)}j(t){t===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class ka extends br{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===B?void 0:t}}const Da=ct?ct.emptyScript:"";class Ba extends br{constructor(){super(...arguments),this.type=4}j(t){t&&t!==B?this.element.setAttribute(this.name,Da):this.element.removeAttribute(this.name)}}class Va extends br{constructor(t,r,o,s,n){super(t,r,o,s,n),this.type=5}_$AI(t,r=this){var o;if((t=(o=ft(this,t,r,0))!==null&&o!==void 0?o:B)===ut)return;const s=this._$AH,n=t===B&&s!==B||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,i=t!==B&&(s===B||n);n&&this.element.removeEventListener(this.name,this,s),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var r,o;typeof this._$AH=="function"?this._$AH.call((o=(r=this.options)===null||r===void 0?void 0:r.host)!==null&&o!==void 0?o:this.element,t):this._$AH.handleEvent(t)}}class za{constructor(t,r,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){ft(this,t)}}const $s=or.litHtmlPolyfillSupport;$s==null||$s(Ut,Rt),((Ir=or.litHtmlVersions)!==null&&Ir!==void 0?Ir:or.litHtmlVersions=[]).push("2.8.0");const Ka=(e,t,r)=>{var o,s;const n=(o=r==null?void 0:r.renderBefore)!==null&&o!==void 0?o:t;let i=n._$litPart$;if(i===void 0){const c=(s=r==null?void 0:r.renderBefore)!==null&&s!==void 0?s:null;n._$litPart$=i=new Rt(t.insertBefore(It(),c),c,void 0,r??{})}return i._$AI(e),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Ur,Nr;class nt extends Ge{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,r;const o=super.createRenderRoot();return(t=(r=this.renderOptions).renderBefore)!==null&&t!==void 0||(r.renderBefore=o.firstChild),o}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ka(r,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!1)}render(){return ut}}nt.finalized=!0,nt._$litElement$=!0,(Ur=globalThis.litElementHydrateSupport)===null||Ur===void 0||Ur.call(globalThis,{LitElement:nt});const ws=globalThis.litElementPolyfillSupport;ws==null||ws({LitElement:nt});((Nr=globalThis.litElementVersions)!==null&&Nr!==void 0?Nr:globalThis.litElementVersions=[]).push("3.3.3");Nt`
  @keyframes uui-blink {
    0%,
    100% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
  }
`;vr("uui-blink 0.9s infinite both");Nt`
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
`;vr("pulse 0.8s ease-in-out infinite both");const Wa=Nt`
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
`,qa=vr("uui-horizontal-shake 600ms ease backwards"),Rr=(e,t,r=`This element has to be present for ${e.nodeName} to work appropriate.`)=>{customElements.get(t)||console.warn(`%c ${e.nodeName} requires ${t} element to be registered!`,"font-weight: bold;",r,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ya=(e,t)=>t.kind==="method"&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(r){r.createProperty(t.key,e)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){typeof t.initializer=="function"&&(this[t.key]=t.initializer.call(this))},finisher(r){r.createProperty(t.key,e)}},Ja=(e,t,r)=>{t.constructor.createProperty(r,e)};function j(e){return(t,r)=>r!==void 0?Ja(e,t,r):Ya(e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Ao(e){return j({...e,state:!0})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Xa=({finisher:e,descriptor:t})=>(r,o)=>{var s;if(o===void 0){const n=(s=r.originalKey)!==null&&s!==void 0?s:r.key,i=t!=null?{kind:"method",placement:"prototype",key:n,descriptor:t(r.key)}:{...r,key:n};return e!=null&&(i.finisher=function(c){e(c,n)}),i}{const n=r.constructor;t!==void 0&&Object.defineProperty(r,o,t(o)),e==null||e(n,o)}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Kn(e,t){return Xa({descriptor:r=>{const o={get(){var s,n;return(n=(s=this.renderRoot)===null||s===void 0?void 0:s.querySelector(e))!==null&&n!==void 0?n:null},enumerable:!0,configurable:!0};if(t){const s=typeof r=="symbol"?Symbol():"__"+r;o.get=function(){var n,i;return this[s]===void 0&&(this[s]=(i=(n=this.renderRoot)===null||n===void 0?void 0:n.querySelector(e))!==null&&i!==void 0?i:null),this[s]}}return o}})}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Hr;((Hr=window.HTMLSlotElement)===null||Hr===void 0?void 0:Hr.prototype.assignedElements)!=null;var Za=Object.defineProperty,Qa=Object.getOwnPropertyDescriptor,Es=(e,t,r,o)=>{for(var s=o>1?void 0:o?Qa(t,r):t,n=e.length-1,i;n>=0;n--)(i=e[n])&&(s=(o?i(t,r,s):i(s))||s);return o&&s&&Za(t,r,s),s};const Ga=(e,t)=>{class r extends t{constructor(){super(...arguments),this._labelSlotHasContent=!1}connectedCallback(){super.connectedCallback(),this.label||console.warn(this.tagName+" needs a `label`",this)}labelSlotChanged(s){this._labelSlotHasContent=s.target.assignedNodes({flatten:!0}).length>0}renderLabel(){return ne`
        ${this._labelSlotHasContent===!1?ne`<span class="label">${this.label}</span>`:""}
        <slot
          class="label"
          style=${this._labelSlotHasContent?"":"visibility: hidden"}
          name=${e||""}
          @slotchange=${this.labelSlotChanged}></slot>
      `}}return Es([j({type:String})],r.prototype,"label",2),Es([Ao()],r.prototype,"_labelSlotHasContent",2),r};var ec=Object.defineProperty,xs=Object.getOwnPropertySymbols,tc=Object.prototype.hasOwnProperty,rc=Object.prototype.propertyIsEnumerable,As=(e,t,r)=>t in e?ec(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,oc=(e,t)=>{for(var r in t||(t={}))tc.call(t,r)&&As(e,r,t[r]);if(xs)for(var r of xs(t))rc.call(t,r)&&As(e,r,t[r]);return e};let sc=class extends Event{constructor(t,r={}){super(t,oc({},r)),this.detail=r.detail||{}}};var nc=Object.defineProperty,Os=Object.getOwnPropertySymbols,ic=Object.prototype.hasOwnProperty,lc=Object.prototype.propertyIsEnumerable,Ps=(e,t,r)=>t in e?nc(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,Cs=(e,t)=>{for(var r in t||(t={}))ic.call(t,r)&&Ps(e,r,t[r]);if(Os)for(var r of Os(t))lc.call(t,r)&&Ps(e,r,t[r]);return e};let Wn=class extends sc{constructor(t,r={}){super(t,Cs(Cs({},{bubbles:!0,cancelable:!0}),r))}};Wn.SELECTED="selected";Wn.DESELECTED="deselected";var ac=Object.defineProperty,Ss=Object.getOwnPropertySymbols,cc=Object.prototype.hasOwnProperty,uc=Object.prototype.propertyIsEnumerable,Ts=(e,t,r)=>t in e?ac(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,fc=(e,t)=>{for(var r in t||(t={}))cc.call(t,r)&&Ts(e,r,t[r]);if(Ss)for(var r of Ss(t))uc.call(t,r)&&Ts(e,r,t[r]);return e};let qn=class extends Event{constructor(t,r={}){super(t,fc({},r)),this.detail=r.detail||{}}};var dc=Object.defineProperty,Is=Object.getOwnPropertySymbols,hc=Object.prototype.hasOwnProperty,pc=Object.prototype.propertyIsEnumerable,Ms=(e,t,r)=>t in e?dc(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,Us=(e,t)=>{for(var r in t||(t={}))hc.call(t,r)&&Ms(e,r,t[r]);if(Is)for(var r of Is(t))pc.call(t,r)&&Ms(e,r,t[r]);return e};let tt=class extends qn{constructor(t,r={}){super(t,Us(Us({},{bubbles:!0}),r))}};tt.VALID="valid";tt.INVALID="invalid";var vc=Object.defineProperty,Ns=Object.getOwnPropertySymbols,bc=Object.prototype.hasOwnProperty,_c=Object.prototype.propertyIsEnumerable,Rs=(e,t,r)=>t in e?vc(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,Hs=(e,t)=>{for(var r in t||(t={}))bc.call(t,r)&&Rs(e,r,t[r]);if(Ns)for(var r of Ns(t))_c.call(t,r)&&Rs(e,r,t[r]);return e};let Yn=class extends qn{constructor(t,r={}){super(t,Hs(Hs({},{bubbles:!0,cancelable:!0}),r))}};Yn.SELECTED="selected";Yn.DESELECTED="deselected";var gc=Object.defineProperty,mc=Object.getOwnPropertyDescriptor,Ve=(e,t,r,o)=>{for(var s=o>1?void 0:o?mc(t,r):t,n=e.length-1,i;n>=0;n--)(i=e[n])&&(s=(o?i(t,r,s):i(s))||s);return o&&s&&gc(t,r,s),s};const Jn=e=>{class t extends e{constructor(...o){super(...o),this.name="",this._validityState={},this.pristine=!0,this.required=!1,this.requiredMessage="This field is required",this.error=!1,this.errorMessage="This field is invalid",this._value="",this._form=null,this._validators=[],this._formCtrlElements=[],this._onFormSubmit=()=>{this.pristine=!1},this._internals=this.attachInternals(),this.addValidator("valueMissing",()=>this.requiredMessage,()=>this.hasAttribute("required")&&this.hasValue()===!1),this.addValidator("customError",()=>this.errorMessage,()=>this.error),this.addEventListener("blur",()=>{this.pristine=!1})}get value(){return this._value}set value(o){const s=this._value;this._value=o,"ElementInternals"in window&&"setFormValue"in window.ElementInternals.prototype&&this._internals.setFormValue(this._value),this.requestUpdate("value",s)}hasValue(){return this.value!==""}disconnectedCallback(){super.disconnectedCallback(),this._removeFormListeners()}_removeFormListeners(){this._form&&this._form.removeEventListener("submit",this._onFormSubmit)}addValidator(o,s,n){const i={flagKey:o,getMessageMethod:s,checkMethod:n};return this._validators.push(i),i}removeValidator(o){const s=this._validators.indexOf(o);s!==-1&&this._validators.splice(s,1)}addFormControlElement(o){this._formCtrlElements.push(o)}setCustomValidity(o){this._customValidityObject&&this.removeValidator(this._customValidityObject),o!=null&&o!==""&&(this._customValidityObject=this.addValidator("customError",()=>o,()=>!0)),this._runValidators()}_runValidators(){this._validityState={},this._formCtrlElements.forEach(s=>{for(const n in s.validity)n!=="valid"&&s.validity[n]&&(this._validityState[n]=!0,this._internals.setValidity(this._validityState,s.validationMessage,s))}),this._validators.forEach(s=>{s.checkMethod()&&(this._validityState[s.flagKey]=!0,this._internals.setValidity(this._validityState,s.getMessageMethod(),this.getFormElement()))});const o=Object.values(this._validityState).includes(!0);this._validityState.valid=!o,o?this.dispatchEvent(new tt(tt.INVALID)):(this._internals.setValidity({}),this.dispatchEvent(new tt(tt.VALID)))}updated(o){super.updated(o),this._runValidators()}submit(){var o;(o=this._form)==null||o.requestSubmit()}formAssociatedCallback(){this._removeFormListeners(),this._form=this._internals.form,this._form&&(this._form.hasAttribute("submit-invalid")&&(this.pristine=!1),this._form.addEventListener("submit",this._onFormSubmit))}formResetCallback(){this.pristine=!0,this.value=this.getAttribute("value")||""}checkValidity(){var o;for(const s in this._formCtrlElements)if(this._formCtrlElements[s].checkValidity()===!1)return!1;return(o=this._internals)==null?void 0:o.checkValidity()}get validity(){return this._validityState}get validationMessage(){var o;return(o=this._internals)==null?void 0:o.validationMessage}}return t.formAssociated=!0,Ve([j({type:String})],t.prototype,"name",2),Ve([j()],t.prototype,"value",1),Ve([j({type:Boolean,reflect:!0})],t.prototype,"pristine",2),Ve([j({type:Boolean,reflect:!0})],t.prototype,"required",2),Ve([j({type:String,attribute:"required-message"})],t.prototype,"requiredMessage",2),Ve([j({type:Boolean,reflect:!0})],t.prototype,"error",2),Ve([j({type:String,attribute:"error-message"})],t.prototype,"errorMessage",2),t},yc=(e,t,r)=>{let o=e;for(;o!==null;){const s=o instanceof HTMLElement&&o.hasAttribute(t)&&o.getAttribute(t)===r,n=o.querySelector(`[${t}="${r}"]`)!==null;if(s)return o;if(n)return o.querySelector(`[${t}="${r}"]`);o=o.parentElement||o.parentNode||null}return null};var $c=Object.defineProperty,wc=Object.getOwnPropertyDescriptor,Ec=(e,t,r,o)=>{for(var s=o>1?void 0:o?wc(t,r):t,n=e.length-1,i;n>=0;n--)(i=e[n])&&(s=(o?i(t,r,s):i(s))||s);return o&&s&&$c(t,r,s),s},Xn=(e,t,r)=>{if(!t.has(e))throw TypeError("Cannot "+r)},Ls=(e,t,r)=>(Xn(e,t,"read from private field"),r?r.call(e):t.get(e)),Fs=(e,t,r)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,r)},xc=(e,t,r,o)=>(Xn(e,t,"write to private field"),o?o.call(e,r):t.set(e,r),r);const Ac=e=>{var t,r;class o extends e{constructor(...n){super(...n),Fs(this,t,!1),this._togglePopover=()=>{if(!this.popoverContainerElement)return;const i=yc(this,"id",this.popoverContainerElement);i&&(Ls(this,t)?i.hidePopover():i.showPopover())},Fs(this,r,i=>{requestAnimationFrame(()=>{xc(this,t,i.detail.newState==="open")})}),this.addEventListener("uui-popover-before-toggle",Ls(this,r))}}return t=new WeakMap,r=new WeakMap,Ec([j({type:String,attribute:"popovertarget"})],o.prototype,"popoverContainerElement",2),o};function Zn(e,t){return r=>{if(e.indexOf("-")>0===!1){console.error(`${e} is not a valid custom element name. A custom element name should consist of at least two words separated by a hyphen.`);return}window.customElements.get(e)||window.customElements.define(e,r,t)}}const Oc=Vn`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
<path d="M461.884 68.14c-132.601 81.297-228.817 183.87-272.048 235.345l-105.874-82.95-46.751 37.691 182.941 186.049c31.485-80.646 131.198-238.264 252.956-350.252L461.884 68.14z"/>
</svg>`,Pc=Vn`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
<path d="M422.952 371.305L307.064 255.418l115.884-115.887-51.722-51.723L255.34 203.693 139.457 87.812l-51.726 51.719 115.885 115.885L87.731 371.305l51.726 51.721L255.344 307.14l115.884 115.882z"/>
</svg>`;/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Lr=e=>e??B;var Cc=Object.defineProperty,Sc=Object.getOwnPropertyDescriptor,we=(e,t,r,o)=>{for(var s=o>1?void 0:o?Sc(t,r):t,n=e.length-1,i;n>=0;n--)(i=e[n])&&(s=(o?i(t,r,s):i(s))||s);return o&&s&&Cc(t,r,s),s};let ie=class extends Jn(Ga("",Ac(nt))){constructor(){super(),this.type="button",this.disabled=!1,this.look="default",this.color="default",this.compact=!1,this.state=void 0,this.addEventListener("click",this._onHostClick)}getFormElement(){return this._button}_onHostClick(e){var t;if(this.disabled){e.preventDefault(),e.stopImmediatePropagation();return}if((t=this._internals)!=null&&t.form)switch(this.type){case"reset":this._internals.form.reset();break;case"button":break;default:this._internals.form.requestSubmit?this._internals.form.requestSubmit():this._internals.form.dispatchEvent(new SubmitEvent("submit"));break}this._togglePopover()}updated(e){super.updated(e),e.has("state")&&(clearTimeout(this._resetStateTimeout),(this.state==="success"||this.state==="failed")&&(this._resetStateTimeout=setTimeout(()=>this.state=void 0,2e3)))}renderState(){let e;switch(this.state){case"waiting":Rr(this,"uui-loader-circle"),e=ne`<uui-loader-circle id="loader"></uui-loader-circle>`;break;case"success":Rr(this,"uui-icon"),e=ne`<uui-icon
          name="check"
          .fallback=${Oc.strings[0]}></uui-icon>`;break;case"failed":Rr(this,"uui-icon"),e=ne`<uui-icon
          name="wrong"
          .fallback=${Pc.strings[0]}></uui-icon>`;break;default:return B}return ne`<div id="state">${e}</div>`}render(){return this.href?ne`
          <a
            id="button"
            aria-label=${this.label}
            href=${Lr(this.disabled?void 0:this.href)}
            target=${Lr(this.target||void 0)}
            rel=${Lr(this.target==="_blank"?"noopener noreferrer":void 0)}>
            ${this.renderState()} ${this.renderLabel()}
            <slot name="extra"></slot>
          </a>
        `:ne`
          <button
            id="button"
            ?disabled=${this.disabled}
            aria-label=${this.label}>
            ${this.renderState()} ${this.renderLabel()}
            <slot name="extra"></slot>
          </button>
        `}};ie.styles=[Wa,Nt`
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
        animation: ${qa};
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
    `];we([j({type:String,reflect:!0})],ie.prototype,"type",2);we([j({type:Boolean,reflect:!0})],ie.prototype,"disabled",2);we([j({reflect:!0})],ie.prototype,"look",2);we([j({reflect:!0})],ie.prototype,"color",2);we([j({type:Boolean,reflect:!0})],ie.prototype,"compact",2);we([j({type:String,reflect:!0})],ie.prototype,"state",2);we([j({type:String})],ie.prototype,"href",2);we([j({type:String})],ie.prototype,"target",2);we([Kn("#button")],ie.prototype,"_button",2);ie=we([Zn("uui-button")],ie);var Tc=Object.defineProperty,js=Object.getOwnPropertySymbols,Ic=Object.prototype.hasOwnProperty,Mc=Object.prototype.propertyIsEnumerable,ks=(e,t,r)=>t in e?Tc(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,Uc=(e,t)=>{for(var r in t||(t={}))Ic.call(t,r)&&ks(e,r,t[r]);if(js)for(var r of js(t))Mc.call(t,r)&&ks(e,r,t[r]);return e};class Oo extends Event{constructor(t,r={}){super(t,Uc({},r)),this.detail=r.detail||{}}}var Nc=Object.defineProperty,Ds=Object.getOwnPropertySymbols,Rc=Object.prototype.hasOwnProperty,Hc=Object.prototype.propertyIsEnumerable,Bs=(e,t,r)=>t in e?Nc(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,Vs=(e,t)=>{for(var r in t||(t={}))Rc.call(t,r)&&Bs(e,r,t[r]);if(Ds)for(var r of Ds(t))Hc.call(t,r)&&Bs(e,r,t[r]);return e};class Qn extends Oo{constructor(t,r={}){super(t,Vs(Vs({},{bubbles:!0}),r))}}Qn.VALID="valid";Qn.INVALID="invalid";var Lc=Object.defineProperty,zs=Object.getOwnPropertySymbols,Fc=Object.prototype.hasOwnProperty,jc=Object.prototype.propertyIsEnumerable,Ks=(e,t,r)=>t in e?Lc(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,Ws=(e,t)=>{for(var r in t||(t={}))Fc.call(t,r)&&Ks(e,r,t[r]);if(zs)for(var r of zs(t))jc.call(t,r)&&Ks(e,r,t[r]);return e};class Gn extends Oo{constructor(t,r={}){super(t,Ws(Ws({},{bubbles:!0,cancelable:!0}),r))}}Gn.SELECTED="selected";Gn.DESELECTED="deselected";var kc=Object.defineProperty,qs=Object.getOwnPropertySymbols,Dc=Object.prototype.hasOwnProperty,Bc=Object.prototype.propertyIsEnumerable,Ys=(e,t,r)=>t in e?kc(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,Js=(e,t)=>{for(var r in t||(t={}))Dc.call(t,r)&&Ys(e,r,t[r]);if(qs)for(var r of qs(t))Bc.call(t,r)&&Ys(e,r,t[r]);return e};class eo extends Oo{constructor(t,r={}){super(t,Js(Js({},{bubbles:!0}),r))}}eo.CHANGE="change";var Vc=Object.defineProperty,zc=Object.getOwnPropertyDescriptor,Ee=(e,t,r,o)=>{for(var s=o>1?void 0:o?zc(t,r):t,n=e.length-1,i;n>=0;n--)(i=e[n])&&(s=(o?i(t,r,s):i(s))||s);return o&&s&&Vc(t,r,s),s};let le=class extends Jn(nt){constructor(){super(),this.placeholder="",this.disabled=!1,this.error=!1,this.options=[],this._groups=[],this.disabledGroups="",this._disabledGroups=[],this._values=[],this.addEventListener("mousedown",()=>{this.style.setProperty("--uui-show-focus-outline","0")}),this.addEventListener("blur",()=>{this.style.setProperty("--uui-show-focus-outline","")})}focus(){this._input.focus()}click(){this._input.click()}connectedCallback(){super.connectedCallback(),this.label||console.warn(this.tagName+" needs a `label`",this)}_createDisabledGroups(){this.disabledGroups.length!==0&&(this._disabledGroups=this.disabledGroups.split(","))}_extractGroups(){this.options.length!==0&&(this._groups=Array.from(new Set(this.options.filter(e=>e.group).map(e=>e.group))))}willUpdate(e){if(e.has("options")){this._extractGroups(),this._values=this.options.map(r=>r.value);const t=this.options.find(r=>r.selected);this.value=t?t.value:""}e.has("value")&&(this.value=this._values.includes(this.value)?this.value:""),e.has("disabledGroups")&&this._createDisabledGroups()}setValue(e){e.stopPropagation();const t=e.target;e.target&&(this.value=t.value),this.dispatchEvent(new eo(eo.CHANGE,{bubbles:!0,composed:!1}))}getFormElement(){return this._input}_renderOption(e,t,r,o){return ne`<option
      value="${t}"
      ?selected=${r}
      ?disabled=${o}>
      ${e}
    </option>`}_renderGrouped(){return this._groups.length===0?B:ne`
      ${this._groups.map(e=>ne`<optgroup
            label=${e}
            ?disabled=${this._disabledGroups.some(t=>t.toLowerCase()===e.toLowerCase())}>
            ${this.options.map(t=>t.group===e?this._renderOption(t.name,t.value,t.selected,t.disabled):"")}
          </optgroup>`)}
    `}render(){return ne` <select
      id="native"
      aria-label=${this.label}
      @change=${this.setValue}
      ?disabled=${this.disabled}
      .name=${this.name}
      .value=${this.value}>
      <option disabled selected value="" hidden>${this.placeholder}</option>
      ${this._renderGrouped()}
      ${this.options.filter(e=>!e.group).map(e=>this._renderOption(e.name,e.value,e.selected,e.disabled))}
    </select>`}};le.styles=[Nt`
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
    `];Ee([j({type:String})],le.prototype,"label",2);Ee([j()],le.prototype,"placeholder",2);Ee([j({type:Boolean,reflect:!0})],le.prototype,"disabled",2);Ee([j({type:Boolean,reflect:!0})],le.prototype,"error",2);Ee([j({type:Array,attribute:!1})],le.prototype,"options",2);Ee([Ao()],le.prototype,"_groups",2);Ee([j()],le.prototype,"disabledGroups",2);Ee([Ao()],le.prototype,"_disabledGroups",2);Ee([Kn("#native")],le.prototype,"_input",2);le=Ee([Zn("uui-select")],le);const Kc=fl({__name:"App",setup(e){return(t,r)=>{const o=Vo("uui-select"),s=Vo("uui-button");return Vl(),Wl(_e,null,[Pe(o,{placeholder:"Select an CND provider or an endpoint"}),Pe(s,{look:"primary",label:"Refresh All CDNs"})],64)}}}),Wc=(e,t)=>{const r=e.__vccOpts||e;for(const[o,s]of t)r[o]=s;return r},qc=Wc(Kc,[["__scopeId","data-v-37d43424"]]);Ma(qc).mount("#app");
