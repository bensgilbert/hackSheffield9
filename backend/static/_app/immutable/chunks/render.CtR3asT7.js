import{G as m,I as L,J as O,K as b,L as p,e as h,s as R,c as D,M as V,N as H,O as M,a as Y,t as C,g as P,h as E,P as $,f as u,z as j,Q as k,R as z,S as G,T as J}from"./runtime.BjLxFjMF.js";import{h as v,a as K,r as N}from"./events.BBSx2ZVx.js";import{b as Q}from"./disclose-version.C6SromsU.js";const W=["touchstart","touchmove"];function q(t){return W.includes(t)}let S=!0;function Z(t,e){var n=e==null?"":typeof e=="object"?e+"":e;n!==(t.__t??(t.__t=t.nodeValue))&&(t.__t=n,t.nodeValue=n==null?"":n+"")}function B(t,e){return A(t,e)}function x(t,e){m(),e.intro=e.intro??!1;const n=e.target,_=E,l=u;try{for(var r=L(n);r&&(r.nodeType!==8||r.data!==O);)r=b(r);if(!r)throw p;h(!0),R(r),D();const d=A(t,{...e,anchor:r});if(u===null||u.nodeType!==8||u.data!==k)throw z(),p;return h(!1),d}catch(d){if(d===p)return e.recover===!1&&G(),m(),J(n),h(!1),B(t,e);throw d}finally{h(_),R(l)}}const i=new Map;function A(t,{target:e,anchor:n,props:_={},events:l,context:r,intro:d=!0}){m();var y=new Set,g=o=>{for(var a=0;a<o.length;a++){var s=o[a];if(!y.has(s)){y.add(s);var f=q(s);e.addEventListener(s,v,{passive:f});var w=i.get(s);w===void 0?(document.addEventListener(s,v,{passive:f}),i.set(s,1)):i.set(s,w+1)}}};g(V(K)),N.add(g);var c=void 0,I=H(()=>{var o=n??e.appendChild(M());return Y(()=>{if(r){C({});var a=P;a.c=r}l&&(_.$$events=l),E&&Q(o,null),S=d,c=t(o,_)||{},S=!0,E&&($.nodes_end=u),r&&j()}),()=>{var f;for(var a of y){e.removeEventListener(a,v);var s=i.get(a);--s===0?(document.removeEventListener(a,v),i.delete(a)):i.set(a,s)}N.delete(g),T.delete(c),o!==n&&((f=o.parentNode)==null||f.removeChild(o))}});return T.set(c,I),c}let T=new WeakMap;function ee(t){const e=T.get(t);e&&e()}export{S as a,x as h,B as m,Z as s,ee as u};