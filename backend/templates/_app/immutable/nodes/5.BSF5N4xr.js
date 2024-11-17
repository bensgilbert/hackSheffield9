import{g as W}from"../chunks/entry.DHC2SN4l.js";import{o as Y,_ as X,b as z}from"../chunks/preload-helper.Bgkgd2nS.js";import{t as A,a as P}from"../chunks/disclose-version.C6SromsU.js";import"../chunks/legacy.BRyyC5zr.js";import{t as Z,i as o,U as p,V as I,F as c,y as i,w as n,z as ee,A as l,W as T}from"../chunks/runtime.BjLxFjMF.js";import{e as S}from"../chunks/events.BBSx2ZVx.js";import{s as te,e as oe,b as E,i as ae,r as L}from"../chunks/map.DMOfOm_X.js";import{p as re}from"../chunks/event-modifiers.CWmzcjye.js";import{i as se}from"../chunks/lifecycle.B2pusBrv.js";function ie(){W("/makerequest")}const ye=Object.freeze(Object.defineProperty({__proto__:null,load:ie},Symbol.toStringTag,{value:"Module"}));var ne=A('<div class="flex items-center space-x-2 mt-2"><input type="text" placeholder="Item name" required class="w-2/3 p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"> <input type="number" placeholder="Quantity" min="1" required class="w-1/3 p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"> <button type="button" class="text-red-500 hover:text-red-700">Remove</button></div>'),le=A('<div class="container mx-auto p-4 relative"><div class="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 w-4/5"><input type="text" placeholder="Search for a location" class="w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></div> <div class="relative"><div class="h-[400px] w-full rounded-md bg-gray-300"></div> <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20" style="pointer-events: none"><img src="/location-icon.png" alt="Map Pin" class="w-5 h-5"></div></div> <div class="mt-4"><form class="space-y-4"><div><label for="time" class="block text-sm font-medium text-gray-700">Delivery Time</label> <input type="time" id="time" required class="mt-1 w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></div> <div><label for="items" class="block text-sm font-medium text-gray-700">Items</label> <!> <button type="button" class="mt-2 text-indigo-500 hover:text-indigo-700">Add Item</button></div> <button type="submit" class="mt-4 w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700">Submit Request</button></form></div></div>');function _e(j,C){Z(C,!1);let g=p(),u,d=p(),m={lat:13.736717,lng:100.523186},v=!1;Y(()=>{G()});async function G(){const e=await X(()=>import("../chunks/index.B1X_Juiv.js"),[],import.meta.url),{Loader:r}=e,t=new r({apiKey:"AIzaSyDB8EtJ3vK8gwJgTgjeNyvDLkUOYnal1GM",version:"weekly",libraries:["places","maps"]});try{await t.load(),B()}catch(s){console.error("Error loading Google Maps",s)}}function B(){const e=window.google,r={center:m,zoom:12,disableDefaultUI:!0,gestureHandling:"greedy",styles:te};u=new e.maps.Map(o(g),r),J(e),u.addListener("idle",()=>{if(!v){const t=u.getCenter();m={lat:t.lat(),lng:t.lng()},K(e)}})}function J(e){const r=new e.maps.places.Autocomplete(o(d),{types:["geocode"],componentRestrictions:{country:"uk"}});r.addListener("place_changed",()=>{const t=r.getPlace();if(t.geometry&&t.geometry.location){v=!0;const s=t.geometry.location;u.setCenter(s),m={lat:s.lat(),lng:s.lng()},v=!1}else alert("No location details available for the selected place.")})}function K(e){new e.maps.Geocoder().geocode({location:m},(t,s)=>{s==="OK"&&t[0]?I(d,o(d).value=t[0].formatted_address):console.error("Error finding address: ",s)})}let f=p(""),a=p([{name:"",quantity:1}]);function N(){c(a,[...o(a),{name:"",quantity:1}])}function U(e){c(a,o(a).filter((r,t)=>t!==e))}async function $(){const e={time:o(f),items:o(a),location:m};try{(await fetch("/makeRequest",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).ok?alert("Request submitted successfully!"):console.error("Failed to submit request")}catch(r){console.error("Error submitting request: ",r)}}se();var b=le(),y=i(b),F=i(y);z(F,e=>c(d,e),()=>o(d)),l(y);var _=n(y,2),V=i(_);z(V,e=>c(g,e),()=>o(g)),T(2),l(_);var M=n(_,2),h=i(M),w=i(h),O=n(i(w),2);L(O),l(w);var D=n(w,2),R=n(i(D),2);oe(R,1,()=>o(a),ae,(e,r,t)=>{var s=ne(),x=i(s);L(x);var q=n(x,2);L(q);var Q=n(q,2);l(s),E(x,()=>o(a)[t].name,k=>I(a,o(a)[t].name=k)),E(q,()=>o(a)[t].quantity,k=>I(a,o(a)[t].quantity=k)),S("click",Q,()=>U(t)),P(e,s)});var H=n(R,2);l(D),T(2),l(h),l(M),l(b),E(O,()=>o(f),e=>c(f,e)),S("click",H,N),S("submit",h,re($)),P(j,b),ee()}export{_e as component,ye as universal};
