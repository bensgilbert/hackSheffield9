import{W as m,X as S,Y as D,Z as H,_ as g,O as h,N,K as I,$ as L,a0 as V,a1 as Y,H as C,p as $,c as k,J as E,C as M,P as u,k as P,a2 as W,a3 as j,a4 as J,a5 as K}from"./runtime.BWfRYliX.js";import{h as v,b as X,r as R}from"./events.CHO8LOBA.js";import{b as Z}from"./disclose-version.DqJhXajo.js";const q=["touchstart","touchmove"];function z(t){return q.includes(t)}let b=!0;function U(t,e){var n=e==null?"":typeof e=="object"?e+"":e;n!==(t.__t??(t.__t=t.nodeValue))&&(t.__t=n,t.nodeValue=n==null?"":n+"")}function B(t,e){return A(t,e)}function x(t,e){m(),e.intro=e.intro??!1;const n=e.target,_=E,l=u;try{for(var a=S(n);a&&(a.nodeType!==8||a.data!==D);)a=H(a);if(!a)throw g;h(!0),N(a),I();const d=A(t,{...e,anchor:a});if(u===null||u.nodeType!==8||u.data!==W)throw j(),g;return h(!1),d}catch(d){if(d===g)return e.recover===!1&&J(),m(),K(n),h(!1),B(t,e);throw d}finally{h(_),N(l)}}const i=new Map;function A(t,{target:e,anchor:n,props:_={},events:l,context:a,intro:d=!0}){m();var y=new Set,p=o=>{for(var r=0;r<o.length;r++){var s=o[r];if(!y.has(s)){y.add(s);var f=z(s);e.addEventListener(s,v,{passive:f});var T=i.get(s);T===void 0?(document.addEventListener(s,v,{passive:f}),i.set(s,1)):i.set(s,T+1)}}};p(L(X)),R.add(p);var c=void 0,O=V(()=>{var o=n??e.appendChild(Y());return C(()=>{if(a){$({});var r=k;r.c=a}l&&(_.$$events=l),E&&Z(o,null),b=d,c=t(o,_)||{},b=!0,E&&(M.nodes_end=u),a&&P()}),()=>{var f;for(var r of y){e.removeEventListener(r,v);var s=i.get(r);--s===0?(document.removeEventListener(r,v),i.delete(r)):i.set(r,s)}R.delete(p),w.delete(c),o!==n&&((f=o.parentNode)==null||f.removeChild(o))}});return w.set(c,O),c}let w=new WeakMap;function ee(t){const e=w.get(t);e&&e()}export{b as a,x as h,B as m,U as s,ee as u};
