import{o as X,_ as H,b as Q}from"../chunks/preload-helper.Bgkgd2nS.js";import{t as O,a as E}from"../chunks/disclose-version.C6SromsU.js";import{P as B,al as tt,_ as at,B as z,X as I,Y as D,Z as rt,am as et,E as it,an as st,ao as ot,ag as nt,m as dt,t as lt,v as vt,w as k,y,x as U,i as q,ap as W,F as Z,z as ct,A as g,W as pt}from"../chunks/runtime.BjLxFjMF.js";import{a as ft,s as j}from"../chunks/render.CtR3asT7.js";import{i as K}from"../chunks/if.C9UW97Ar.js";import{s as ut,e as N,i as P,b as _t,r as ht}from"../chunks/map.DMOfOm_X.js";import{d as mt}from"../chunks/events.BBSx2ZVx.js";import"../chunks/entry.DHC2SN4l.js";const gt=()=>performance.now(),F={tick:a=>requestAnimationFrame(a),now:()=>gt(),tasks:new Set};function V(a){F.tasks.forEach(t=>{t.c(a)||(F.tasks.delete(t),t.f())}),F.tasks.size!==0&&F.tick(V)}function bt(a){let t;return F.tasks.size===0&&F.tick(V),{promise:new Promise(e=>{F.tasks.add(t={c:a,f:e})}),abort(){F.tasks.delete(t)}}}function A(a,t){a.dispatchEvent(new CustomEvent(t))}function yt(a){if(a==="float")return"cssFloat";if(a==="offset")return"cssOffset";if(a.startsWith("--"))return a;const t=a.split("-");return t.length===1?t[0]:t[0]+t.slice(1).map(e=>e[0].toUpperCase()+e.slice(1)).join("")}function Y(a){const t={},e=a.split(";");for(const i of e){const[c,v]=i.split(":");if(!c||v===void 0)break;const p=yt(c.trim());t[p]=v.trim()}return t}const wt=a=>a;function G(a,t,e,i){var c=(a&et)!==0,v="both",p,w=t.inert,f,s;function o(){var r=rt,l=B;I(null),D(null);try{return p??(p=e()(t,(i==null?void 0:i())??{},{direction:v}))}finally{I(r),D(l)}}var x={is_global:c,in(){t.inert=w,A(t,"introstart"),f=R(t,o(),s,1,()=>{A(t,"introend"),f==null||f.abort(),f=p=void 0})},out(r){t.inert=!0,A(t,"outrostart"),s=R(t,o(),f,0,()=>{A(t,"outroend"),r==null||r()})},stop:()=>{f==null||f.abort(),s==null||s.abort()}},h=B;if((h.transitions??(h.transitions=[])).push(x),ft){var $=c;if(!$){for(var n=h.parent;n&&n.f&it;)for(;(n=n.parent)&&!(n.f&st););$=!n||(n.f&ot)!==0}$&&nt(()=>{dt(()=>x.in())})}}function R(a,t,e,i,c){var v=i===1;if(tt(t)){var p,w=!1;return at(()=>{if(!w){var l=t({direction:v?"in":"out"});p=R(a,l,e,i,c)}}),{abort:()=>{w=!0,p==null||p.abort()},deactivate:()=>p.deactivate(),reset:()=>p.reset(),t:()=>p.t()}}if(e==null||e.deactivate(),!(t!=null&&t.duration))return c(),{abort:z,deactivate:z,reset:z,t:()=>i};const{delay:f=0,css:s,tick:o,easing:x=wt}=t;var h=[];if(v&&e===void 0&&(o&&o(0,1),s)){var $=Y(s(0,1));h.push($,$)}var n=()=>1-i,r=a.animate(h,{duration:f});return r.onfinish=()=>{var l=(e==null?void 0:e.t())??1-i;e==null||e.abort();var d=i-l,m=t.duration*Math.abs(d),u=[];if(m>0){if(s)for(var b=Math.ceil(m/16.666666666666668),T=0;T<=b;T+=1){var C=l+d*x(T/b),M=s(C,1-C);u.push(Y(M))}n=()=>{var _=r.currentTime;return l+d*x(_/m)},o&&bt(()=>{if(r.playState!=="running")return!1;var _=n();return o(_,1-_),!0})}r=a.animate(u,{duration:m,fill:"forwards"}),r.onfinish=()=>{n=()=>i,o==null||o(i,1-i),c()}},{abort:()=>{r&&(r.cancel(),r.effect=null,r.onfinish=z)},deactivate:()=>{c=z},reset:()=>{i===0&&(o==null||o(1,0))},t:()=>n()}}function xt(a){const t=a-1;return t*t*t+1}function J(a,{delay:t=0,duration:e=400,easing:i=xt,axis:c="y"}={}){const v=getComputedStyle(a),p=+v.opacity,w=c==="y"?"height":"width",f=parseFloat(v[w]),s=c==="y"?["top","bottom"]:["left","right"],o=s.map(d=>`${d[0].toUpperCase()}${d.slice(1)}`),x=parseFloat(v[`padding${o[0]}`]),h=parseFloat(v[`padding${o[1]}`]),$=parseFloat(v[`margin${o[0]}`]),n=parseFloat(v[`margin${o[1]}`]),r=parseFloat(v[`border${o[0]}Width`]),l=parseFloat(v[`border${o[1]}Width`]);return{delay:t,duration:e,easing:i,css:d=>`overflow: hidden;opacity: ${Math.min(d*20,1)*p};${w}: ${d*f}px;padding-${s[0]}: ${d*x}px;padding-${s[1]}: ${d*h}px;margin-${s[0]}: ${d*$}px;margin-${s[1]}: ${d*n}px;border-${s[0]}-width: ${d*r}px;border-${s[1]}-width: ${d*l}px;`}}var $t=O("<li> </li>"),Tt=O('<div class="h-full w-80 space-y-8 text-nowrap bg-white p-4 shadow"><div class="space-y-2 leading-none"><h1 class="text-xl font-bold">Order #1234</h1> <div class="space-y-2 rounded bg-black/20 p-3 leading-none"><div class="space-y-1"><p>Start:</p> <p>End:</p></div> <ul class="mt-2 list-inside list-disc space-y-1 pl-2 leading-none"></ul></div> <button class="rounded bg-blue-700 p-4 text-white">Accept Order</button></div></div>'),kt=O('<div class="space-y-1 rounded bg-blue-700 p-3 leading-none text-white"><p>Orderer:</p> <p>Start:</p> <p>End:</p></div>'),Et=O('<p class="text-center font-bold m-3">You have no orders to fufil, <br> accept one from below</p>'),Ft=O('<div class="space-y-1 rounded bg-black/20 p-3"><p>Orderer:</p> <p>Start:</p> <p>End:</p></div>'),Ot=O('<p class="text-center font-bold">No orders nearby</p>'),Ct=O('<div class="h-full w-80 space-y-8 overflow-y-auto text-nowrap bg-white p-4 shadow"><div class="space-y-2 leading-none"><h1 class="text-xl font-bold">My Orders</h1> <!></div> <div class="space-y-3 leading-none"><h1 class="text-xl font-bold">Suggested Orders</h1> <div><input class="w-full" type="range" min="1" max="50"> <p> </p></div> <!></div></div>'),St=(a,t)=>{Z(t,!q(t))},zt=O('<div class="size-full"></div> <div class="absolute inset-y-0 left-0"><!></div> <div class="absolute inset-y-0 right-0"><!> <button class="absolute left-0 top-4 -translate-x-full rounded-l bg-blue-700 p-2 text-white"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M4 18q-.425 0-.712-.288T3 17t.288-.712T4 16h16q.425 0 .713.288T21 17t-.288.713T20 18zm0-5q-.425 0-.712-.288T3 12t.288-.712T4 11h16q.425 0 .713.288T21 12t-.288.713T20 13zm0-5q-.425 0-.712-.288T3 7t.288-.712T4 6h16q.425 0 .713.288T21 7t-.288.713T20 8z"></path></svg></button></div>',1);function It(a,t){lt(t,!0);let e,i,c=W(10),v=!1,p=W(!1);X(async()=>{const n=await H(()=>import("../chunks/index.B1X_Juiv.js"),[],import.meta.url),{Loader:r}=n,l=new r({apiKey:"AIzaSyDB8EtJ3vK8gwJgTgjeNyvDLkUOYnal1GM",libraries:["maps","marker"]}),{Map:d}=await l.importLibrary("maps"),{Marker:m}=await l.importLibrary("marker");i=new d(e,{center:{lat:0,lng:0},disableDefaultUI:!0,styles:ut,zoom:1}),navigator.geolocation&&navigator.geolocation.getCurrentPosition(({coords:{latitude:u,longitude:b}})=>{i.setCenter({lat:u,lng:b}),i.setZoom(16),new m({map:i,position:{lat:u,lng:b}})}),fetch("http://localhost:3000/requests",{redirect:"error"}).then(u=>u.json()).then(u=>{console.log(u)}).catch(()=>{window.location="http://localhost:3000/login"})});var w=zt(),f=vt(w);Q(f,n=>e=n,()=>e);var s=k(f,2),o=y(s);K(o,()=>v,n=>{var r=Tt(),l=y(r),d=k(y(l),2),m=k(y(d),2);N(m,20,()=>[1,2,3],P,(u,b)=>{var T=$t(),C=y(T,!0);g(T),U(()=>j(C,b)),E(u,T)}),g(m),g(d),pt(2),g(l),g(r),G(3,r,()=>J,()=>({axis:"x"})),E(n,r)}),g(s);var x=k(s,2),h=y(x);K(h,()=>q(p),n=>{var r=Ct(),l=y(r),d=k(y(l),2);N(d,16,()=>[1,2,3],P,(_,S)=>{var L=kt();E(_,L)},_=>{var S=Et();E(_,S)}),g(l);var m=k(l,2),u=k(y(m),2),b=y(u);ht(b);var T=k(b,2),C=y(T);g(T),g(u);var M=k(u,2);N(M,16,()=>[1,2,3],P,(_,S)=>{var L=Ft();E(_,L)},_=>{var S=Ot();E(_,S)}),g(m),g(r),U(()=>j(C,`Range: ${q(c)??""}km`)),_t(b,()=>q(c),_=>Z(c,_)),G(3,r,()=>J,()=>({axis:"x"})),E(n,r)});var $=k(h,2);$.__click=[St,p],g(x),E(a,w),ct()}mt(["click"]);export{It as component};
