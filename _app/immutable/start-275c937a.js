import{_ as G,H as fe,R as De,e as Fe}from"./chunks/index-c0762a73.js";import{S as Je,i as Ge,s as He,a as Me,e as C,c as xe,b as H,g as ne,t as B,d as re,f as z,h as K,j as We,o as he,k as Xe,l as Ye,m as Qe,n as ue,p as N,q as Ze,r as et,u as tt,v as x,w as we,x as W,y as X,z as Te}from"./chunks/index-5d48ae39.js";import{g as Ne,f as Ve,s as J,a as me,i as nt}from"./chunks/singletons-2824f59b.js";import{s as rt}from"./chunks/paths-140d6fc1.js";function at(a,e){return a==="/"||e==="ignore"?a:e==="never"?a.endsWith("/")?a.slice(0,-1):a:e==="always"&&!a.endsWith("/")?a+"/":a}function st(a){for(const e in a)a[e]=a[e].replace(/%23/g,"#").replace(/%3[Bb]/g,";").replace(/%2[Cc]/g,",").replace(/%2[Ff]/g,"/").replace(/%3[Ff]/g,"?").replace(/%3[Aa]/g,":").replace(/%40/g,"@").replace(/%26/g,"&").replace(/%3[Dd]/g,"=").replace(/%2[Bb]/g,"+").replace(/%24/g,"$");return a}const ot=["href","pathname","search","searchParams","toString","toJSON"];function it(a,e){const t=new URL(a);for(const o of ot){let i=t[o];Object.defineProperty(t,o,{get(){return e(),i},enumerable:!0,configurable:!0})}return t[Symbol.for("nodejs.util.inspect.custom")]=(o,i,u)=>u(a,i),lt(t),t}function lt(a){Object.defineProperty(a,"hash",{get(){throw new Error("Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead")}})}function ct(a){let e=5381,t=a.length;if(typeof a=="string")for(;t;)e=e*33^a.charCodeAt(--t);else for(;t;)e=e*33^a[--t];return(e>>>0).toString(36)}const ye=window.fetch;window.fetch=(a,e)=>{if((a instanceof Request?a.method:(e==null?void 0:e.method)||"GET")!=="GET"){const o=new URL(a instanceof Request?a.url:a.toString(),document.baseURI).href;te.delete(o)}return ye(a,e)};const te=new Map;function ft(a,e,t){let i=`script[data-sveltekit-fetched][data-url=${JSON.stringify(typeof a=="string"?a:a.url)}]`;t&&typeof t.body=="string"&&(i+=`[data-hash="${ct(t.body)}"]`);const u=document.querySelector(i);if(u!=null&&u.textContent){const{body:r,...l}=JSON.parse(u.textContent),w=u.getAttribute("data-ttl");return w&&te.set(e,{body:r,init:l,ttl:1e3*Number(w)}),Promise.resolve(new Response(r,l))}return ye(a,t)}function ut(a,e){const t=te.get(a);if(t){if(performance.now()<t.ttl)return new Response(t.body,t.init);te.delete(a)}return ye(a,e)}const dt=/^(\.\.\.)?(\w+)(?:=(\w+))?$/;function pt(a){const e=[],t=[];let o=!0;if(/\]\[/.test(a))throw new Error(`Invalid route ${a} \u2014 parameters must be separated`);if(qe("[",a)!==qe("]",a))throw new Error(`Invalid route ${a} \u2014 brackets are unbalanced`);return{pattern:a===""?/^\/$/:new RegExp(`^${a.split(/(?:\/|$)/).filter(ht).map((u,r,l)=>{const w=decodeURIComponent(u),p=/^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(w);if(p)return e.push(p[1]),t.push(p[2]),"(?:/(.*))?";const b=r===l.length-1;return w&&"/"+w.split(/\[(.+?)\]/).map((S,E)=>{if(E%2){const F=dt.exec(S);if(!F)throw new Error(`Invalid param: ${S}. Params and matcher names can only have underscores and alphanumeric characters.`);const[,O,T,V]=F;return e.push(T),t.push(V),O?"(.*?)":"([^/]+?)"}return b&&S.includes(".")&&(o=!1),S.normalize().replace(/%5[Bb]/g,"[").replace(/%5[Dd]/g,"]").replace(/#/g,"%23").replace(/\?/g,"%3F").replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}).join("")}).join("")}${o?"/?":""}$`),names:e,types:t}}function ht(a){return!/^\([^)]+\)$/.test(a)}function mt(a,e,t,o){const i={};for(let u=0;u<e.length;u+=1){const r=e[u],l=t[u],w=a[u+1]||"";if(l){const p=o[l];if(!p)throw new Error(`Missing "${l}" param matcher`);if(!p(w))return}i[r]=w}return i}function qe(a,e){let t=0;for(let o=0;o<e.length;o+=1)e[o]===a&&(t+=1);return t}function _t(a,e,t,o){const i=new Set(e);return Object.entries(t).map(([l,[w,p,b]])=>{const{pattern:S,names:E,types:F}=pt(l),O={id:l,exec:T=>{const V=S.exec(T);if(V)return mt(V,E,F,o)},errors:[1,...b||[]].map(T=>a[T]),layouts:[0,...p||[]].map(r),leaf:u(w)};return O.errors.length=O.layouts.length=Math.max(O.errors.length,O.layouts.length),O});function u(l){const w=l<0;return w&&(l=~l),[w,a[l]]}function r(l){return l===void 0?l:[i.has(l),a[l]]}}function gt(a){let e,t,o;var i=a[0][0];function u(r){return{props:{data:r[1],errors:r[3]}}}return i&&(e=new i(u(a))),{c(){e&&x(e.$$.fragment),t=C()},l(r){e&&we(e.$$.fragment,r),t=C()},m(r,l){e&&W(e,r,l),H(r,t,l),o=!0},p(r,l){const w={};if(l&2&&(w.data=r[1]),l&8&&(w.errors=r[3]),i!==(i=r[0][0])){if(e){ne();const p=e;B(p.$$.fragment,1,0,()=>{X(p,1)}),re()}i?(e=new i(u(r)),x(e.$$.fragment),z(e.$$.fragment,1),W(e,t.parentNode,t)):e=null}else i&&e.$set(w)},i(r){o||(e&&z(e.$$.fragment,r),o=!0)},o(r){e&&B(e.$$.fragment,r),o=!1},d(r){r&&K(t),e&&X(e,r)}}}function wt(a){let e,t,o;var i=a[0][0];function u(r){return{props:{data:r[1],errors:r[3],$$slots:{default:[yt]},$$scope:{ctx:r}}}}return i&&(e=new i(u(a))),{c(){e&&x(e.$$.fragment),t=C()},l(r){e&&we(e.$$.fragment,r),t=C()},m(r,l){e&&W(e,r,l),H(r,t,l),o=!0},p(r,l){const w={};if(l&2&&(w.data=r[1]),l&8&&(w.errors=r[3]),l&525&&(w.$$scope={dirty:l,ctx:r}),i!==(i=r[0][0])){if(e){ne();const p=e;B(p.$$.fragment,1,0,()=>{X(p,1)}),re()}i?(e=new i(u(r)),x(e.$$.fragment),z(e.$$.fragment,1),W(e,t.parentNode,t)):e=null}else i&&e.$set(w)},i(r){o||(e&&z(e.$$.fragment,r),o=!0)},o(r){e&&B(e.$$.fragment,r),o=!1},d(r){r&&K(t),e&&X(e,r)}}}function yt(a){let e,t,o;var i=a[0][1];function u(r){return{props:{data:r[2],errors:r[3]}}}return i&&(e=new i(u(a))),{c(){e&&x(e.$$.fragment),t=C()},l(r){e&&we(e.$$.fragment,r),t=C()},m(r,l){e&&W(e,r,l),H(r,t,l),o=!0},p(r,l){const w={};if(l&4&&(w.data=r[2]),l&8&&(w.errors=r[3]),i!==(i=r[0][1])){if(e){ne();const p=e;B(p.$$.fragment,1,0,()=>{X(p,1)}),re()}i?(e=new i(u(r)),x(e.$$.fragment),z(e.$$.fragment,1),W(e,t.parentNode,t)):e=null}else i&&e.$set(w)},i(r){o||(e&&z(e.$$.fragment,r),o=!0)},o(r){e&&B(e.$$.fragment,r),o=!1},d(r){r&&K(t),e&&X(e,r)}}}function Ce(a){let e,t=a[5]&&Be(a);return{c(){e=Xe("div"),t&&t.c(),this.h()},l(o){e=Ye(o,"DIV",{id:!0,"aria-live":!0,"aria-atomic":!0,style:!0});var i=Qe(e);t&&t.l(i),i.forEach(K),this.h()},h(){ue(e,"id","svelte-announcer"),ue(e,"aria-live","assertive"),ue(e,"aria-atomic","true"),N(e,"position","absolute"),N(e,"left","0"),N(e,"top","0"),N(e,"clip","rect(0 0 0 0)"),N(e,"clip-path","inset(50%)"),N(e,"overflow","hidden"),N(e,"white-space","nowrap"),N(e,"width","1px"),N(e,"height","1px")},m(o,i){H(o,e,i),t&&t.m(e,null)},p(o,i){o[5]?t?t.p(o,i):(t=Be(o),t.c(),t.m(e,null)):t&&(t.d(1),t=null)},d(o){o&&K(e),t&&t.d()}}}function Be(a){let e;return{c(){e=Ze(a[6])},l(t){e=et(t,a[6])},m(t,o){H(t,e,o)},p(t,o){o&64&&tt(e,t[6])},d(t){t&&K(e)}}}function bt(a){let e,t,o,i,u;const r=[wt,gt],l=[];function w(b,S){return b[0][1]?0:1}e=w(a),t=l[e]=r[e](a);let p=a[4]&&Ce(a);return{c(){t.c(),o=Me(),p&&p.c(),i=C()},l(b){t.l(b),o=xe(b),p&&p.l(b),i=C()},m(b,S){l[e].m(b,S),H(b,o,S),p&&p.m(b,S),H(b,i,S),u=!0},p(b,[S]){let E=e;e=w(b),e===E?l[e].p(b,S):(ne(),B(l[E],1,1,()=>{l[E]=null}),re(),t=l[e],t?t.p(b,S):(t=l[e]=r[e](b),t.c()),z(t,1),t.m(o.parentNode,o)),b[4]?p?p.p(b,S):(p=Ce(b),p.c(),p.m(i.parentNode,i)):p&&(p.d(1),p=null)},i(b){u||(z(t),u=!0)},o(b){B(t),u=!1},d(b){l[e].d(b),b&&K(o),p&&p.d(b),b&&K(i)}}}function vt(a,e,t){let{stores:o}=e,{page:i}=e,{components:u}=e,{data_0:r=null}=e,{data_1:l=null}=e,{errors:w}=e;We(o.page.notify);let p=!1,b=!1,S=null;return he(()=>{const E=o.page.subscribe(()=>{p&&(t(5,b=!0),t(6,S=document.title||"untitled page"))});return t(4,p=!0),E}),a.$$set=E=>{"stores"in E&&t(7,o=E.stores),"page"in E&&t(8,i=E.page),"components"in E&&t(0,u=E.components),"data_0"in E&&t(1,r=E.data_0),"data_1"in E&&t(2,l=E.data_1),"errors"in E&&t(3,w=E.errors)},a.$$.update=()=>{a.$$.dirty&384&&o.page.set(i)},[u,r,l,w,p,b,S,o,i]}class kt extends Je{constructor(e){super(),Ge(this,e,vt,bt,He,{stores:7,page:8,components:0,data_0:1,data_1:2,errors:3})}}const Et={},ae=[()=>G(()=>import("./chunks/0-3064a0d1.js"),["chunks/0-3064a0d1.js","components/pages/_layout.svelte-843020e9.js","assets/_layout-ad17970d.css","chunks/index-5d48ae39.js","chunks/masthead.module-a817179b.js","assets/masthead-0eceb451.css","chunks/paths-f25f3c46.js","chunks/Link-765aaf47.js","chunks/paths-140d6fc1.js","chunks/stores-c66a64f7.js","chunks/singletons-2824f59b.js"],import.meta.url),()=>G(()=>import("./chunks/1-5098bdb7.js"),["chunks/1-5098bdb7.js","components/error.svelte-5f04d8eb.js","chunks/index-5d48ae39.js","chunks/stores-c66a64f7.js","chunks/singletons-2824f59b.js","chunks/paths-140d6fc1.js"],import.meta.url),()=>G(()=>import("./chunks/2-7f4f26a3.js"),["chunks/2-7f4f26a3.js","components/pages/_page.svelte-e97d9fe9.js","assets/_page-3b884912.css","chunks/index-5d48ae39.js","chunks/paths-140d6fc1.js","chunks/slidy-846fa4c5.js","assets/slidy-7984d972.css","chunks/masthead.module-a817179b.js","assets/masthead-0eceb451.css","chunks/Header-e9e8fd7f.js","chunks/paths-f25f3c46.js","chunks/Link-765aaf47.js"],import.meta.url),()=>G(()=>import("./chunks/3-d9087336.js"),["chunks/3-d9087336.js","components/pages/docs/_page.svelte-17e4e0f5.js","assets/_page-b2768e6e.css","chunks/index-5d48ae39.js","chunks/paths-140d6fc1.js","chunks/stores-c66a64f7.js","chunks/singletons-2824f59b.js","chunks/masthead.module-a817179b.js","assets/masthead-0eceb451.css","chunks/Header-e9e8fd7f.js","chunks/Link-765aaf47.js"],import.meta.url),()=>G(()=>import("./chunks/4-307f9f9d.js"),["chunks/4-307f9f9d.js","chunks/_page-f5aaf677.js","chunks/index-c0762a73.js","components/pages/docs/_section_/_page.svelte-4f9de9a7.js","assets/_page-1e3ea2c9.css","chunks/index-5d48ae39.js","chunks/paths-140d6fc1.js","chunks/masthead.module-a817179b.js","assets/masthead-0eceb451.css","chunks/Header-e9e8fd7f.js","chunks/Link-765aaf47.js"],import.meta.url),()=>G(()=>import("./chunks/5-a9b6c25b.js"),["chunks/5-a9b6c25b.js","components/pages/playground/_page.svelte-3e33593c.js","assets/_page-cdd662b1.css","chunks/index-5d48ae39.js","chunks/slidy-846fa4c5.js","assets/slidy-7984d972.css"],import.meta.url)],Rt=[],St={"":[2],docs:[3],playground:[5],"docs/[section]":[4]},Lt="/__data.js",Ke="sveltekit:scroll",q="sveltekit:index",de=_t(ae,Rt,St,Et),_e=ae[0],ge=ae[1];_e();ge();let Q={};try{Q=JSON.parse(sessionStorage[Ke])}catch{}function pe(a){Q[a]=me()}function $t({target:a,base:e,trailing_slash:t}){var je;const o=[],i={id:null,promise:null},u={before_navigate:[],after_navigate:[]};let r={branch:[],error:null,session_id:0,url:null},l=!1,w=!0,p=!1,b=1,S=null,E=!1,F,O=(je=history.state)==null?void 0:je[q];O||(O=Date.now(),history.replaceState({...history.state,[q]:O},"",location.href));const T=Q[O];T&&(history.scrollRestoration="manual",scrollTo(T.x,T.y));let V=!1,M,be;function ve(){if(!S){const n=new URL(location.href);S=Promise.resolve().then(async()=>{await Re(n,[]),S=null,E=!1})}return S}async function ke(n,{noscroll:f=!1,replaceState:d=!1,keepfocus:s=!1,state:c={}},v){return typeof n=="string"&&(n=new URL(n,Ne(document))),ie({url:n,scroll:f?me():null,keepfocus:s,redirect_chain:v,details:{state:c,replaceState:d},accepted:()=>{},blocked:()=>{},type:"goto"})}async function Ee(n){const f=Pe(n);if(!f)throw new Error("Attempted to prefetch a URL that does not belong to this app");return i.promise=$e(f),i.id=f.id,i.promise}async function Re(n,f,d,s){var R,k;const c=Pe(n),v=be={};let _=c&&await $e(c);if(!_&&n.origin===location.origin&&n.pathname===location.pathname&&(_=await ee({status:404,error:new Error(`Not found: ${n.pathname}`),url:n,routeId:null})),!_)return await Y(n),!1;if(n=(c==null?void 0:c.url)||n,be!==v)return!1;if(o.length=0,_.type==="redirect")if(f.length>10||f.includes(n.pathname))_=await ee({status:500,error:new Error("Redirect loop"),url:n,routeId:null});else return ke(new URL(_.location,n).href,{},[...f,n.pathname]),!1;else((k=(R=_.props)==null?void 0:R.page)==null?void 0:k.status)>=400&&await J.updated.check()&&await Y(n);if(p=!0,d&&d.details){const{details:h}=d,y=h.replaceState?0:1;h.state[q]=O+=y,history[h.replaceState?"replaceState":"pushState"](h.state,"",n)}if(l?(r=_.state,_.props.page&&(_.props.page.url=n),F.$set(_.props)):Se(_),d){const{scroll:h,keepfocus:y}=d;if(!y){const P=document.body,A=P.getAttribute("tabindex");P.tabIndex=-1,P.focus({preventScroll:!0}),setTimeout(()=>{var $;($=getSelection())==null||$.removeAllRanges()}),A!==null?P.setAttribute("tabindex",A):P.removeAttribute("tabindex")}if(await Te(),w){const P=n.hash&&document.getElementById(n.hash.slice(1));h?scrollTo(h.x,h.y):P?P.scrollIntoView():scrollTo(0,0)}}else await Te();i.promise=null,i.id=null,w=!0,_.props.page&&(M=_.props.page),s&&s(),p=!1}function Se(n){r=n.state;const f=document.querySelector("style[data-sveltekit]");f&&f.remove(),M=n.props.page,F=new kt({target:a,props:{...n.props,stores:J},hydrate:!0});const d={from:null,to:new URL(location.href),type:"load"};u.after_navigate.forEach(s=>s(d)),l=!0}async function Z({url:n,params:f,branch:d,status:s,error:c,routeId:v,validation_errors:_}){var A;const R=d.filter(Boolean),k={type:"loaded",state:{url:n,params:f,branch:d,error:c,session_id:b},props:{components:R.map($=>$.node.component),errors:_}};let h={},y=!M;for(let $=0;$<R.length;$+=1){const j=R[$];h={...h,...j.data},(y||!r.branch.some(m=>m===j))&&(k.props[`data_${$}`]=h,y=y||Object.keys((A=j.data)!=null?A:{}).length>0)}if(y||(y=Object.keys(M.data).length!==Object.keys(h).length),!r.url||n.href!==r.url.href||r.error!==c||y){k.props.page={error:c,params:f,routeId:v,status:s,url:n,data:y?h:M.data};const $=(j,m)=>{Object.defineProperty(k.props.page,j,{get:()=>{throw new Error(`$page.${j} has been replaced by $page.url.${m}`)}})};$("origin","origin"),$("path","pathname"),$("query","searchParams")}return k}async function se({loader:n,parent:f,url:d,params:s,routeId:c,server_data_node:v}){var h,y,P,A,$;let _=null;const R={dependencies:new Set,params:new Set,parent:!1,url:!1},k=await n();if((h=k.shared)!=null&&h.load){let j=function(...g){for(const L of g){const{href:U}=new URL(L,d);R.dependencies.add(U)}};const m={};for(const g in s)Object.defineProperty(m,g,{get(){return R.params.add(g),s[g]},enumerable:!0});const I={routeId:c,params:m,data:(y=v==null?void 0:v.data)!=null?y:null,url:it(d,()=>{R.url=!0}),async fetch(g,L){let U;typeof g=="string"?U=g:(U=g.url,L={body:g.method==="GET"||g.method==="HEAD"?void 0:await g.blob(),cache:g.cache,credentials:g.credentials,headers:g.headers,integrity:g.integrity,keepalive:g.keepalive,method:g.method,mode:g.mode,redirect:g.redirect,referrer:g.referrer,referrerPolicy:g.referrerPolicy,signal:g.signal,...L});const D=new URL(U,d).href;return j(D),l?ut(D,L):ft(U,D,L)},setHeaders:()=>{},depends:j,parent(){return R.parent=!0,f()}};Object.defineProperties(I,{props:{get(){throw new Error("@migration task: Replace `props` with `data` stuff https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693")},enumerable:!1},session:{get(){throw new Error("session is no longer available. See https://github.com/sveltejs/kit/discussions/5883")},enumerable:!1},stuff:{get(){throw new Error("@migration task: Remove stuff https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693")},enumerable:!1}}),_=(P=await k.shared.load.call(null,I))!=null?P:null}return{node:k,loader:n,server:v,shared:(A=k.shared)!=null&&A.load?{type:"data",data:_,uses:R}:null,data:($=_!=null?_:v==null?void 0:v.data)!=null?$:null}}function Le(n,f,d){if(E)return!0;if(!d)return!1;if(d.parent&&f||n.url&&d.url)return!0;for(const s of n.params)if(d.params.has(s))return!0;for(const s of d.dependencies)if(o.some(c=>c(new URL(s))))return!0;return!1}function oe(n,f){var d,s;return(n==null?void 0:n.type)==="data"?{type:"data",data:n.data,uses:{dependencies:new Set((d=n.uses.dependencies)!=null?d:[]),params:new Set((s=n.uses.params)!=null?s:[]),parent:!!n.uses.parent,url:!!n.uses.url}}:(n==null?void 0:n.type)==="skip"&&f!=null?f:null}async function $e({id:n,url:f,params:d,route:s}){if(i.id===n&&i.promise)return i.promise;const{errors:c,layouts:v,leaf:_}=s,R=r.url&&{url:n!==r.url.pathname+r.url.search,params:Object.keys(d).filter(m=>r.params[m]!==d[m])},k=[...v,_];c.forEach(m=>m==null?void 0:m().catch(()=>{})),k.forEach(m=>m==null?void 0:m[1]().catch(()=>{}));let h=null;const y=k.reduce((m,I,g)=>{var D;const L=r.branch[g],U=!!(I!=null&&I[0])&&((L==null?void 0:L.loader)!==I[1]||Le(R,m.some(Boolean),(D=L.server)==null?void 0:D.uses));return m.push(U),m},[]);if(y.some(Boolean)){try{h=await ze(f,y)}catch(m){return ee({status:500,error:m,url:f,routeId:s.id})}if(h.type==="redirect")return h}const P=h==null?void 0:h.nodes;let A=!1;const $=k.map(async(m,I)=>{var le,Ae;if(!m)return;const g=r.branch[I],L=(le=P==null?void 0:P[I])!=null?le:null;if((!L||L.type==="skip")&&m[1]===(g==null?void 0:g.loader)&&!Le(R,A,(Ae=g.shared)==null?void 0:Ae.uses))return g;if(A=!0,(L==null?void 0:L.type)==="error")throw L.httperror?Fe(L.httperror.status,L.httperror.message):L.error;return se({loader:m[1],url:f,params:d,routeId:s.id,parent:async()=>{var Ue;const Ie={};for(let ce=0;ce<I;ce+=1)Object.assign(Ie,(Ue=await $[ce])==null?void 0:Ue.data);return Ie},server_data_node:oe(L,g==null?void 0:g.server)})});for(const m of $)m.catch(()=>{});const j=[];for(let m=0;m<k.length;m+=1)if(k[m])try{j.push(await $[m])}catch(I){const g=I;if(g instanceof De)return{type:"redirect",location:g.location};const L=I instanceof fe?I.status:500;for(;m--;)if(c[m]){let U,D=m;for(;!j[D];)D-=1;try{return U={node:await c[m](),loader:c[m],data:{},server:null,shared:null},await Z({url:f,params:d,branch:j.slice(0,D+1).concat(U),status:L,error:g,routeId:s.id})}catch{continue}}await Y(f);return}else j.push(void 0);return await Z({url:f,params:d,branch:j,status:200,error:null,routeId:s.id})}async function ee({status:n,error:f,url:d,routeId:s}){var h;const c={},v=await _e();let _=null;if(v.server)try{const y=await ze(d,[!0]);if(y.type!=="data"||y.nodes[0]&&y.nodes[0].type!=="data")throw 0;_=(h=y.nodes[0])!=null?h:null}catch{await Y(d);return}const R=await se({loader:_e,url:d,params:c,routeId:s,parent:()=>Promise.resolve({}),server_data_node:oe(_)}),k={node:await ge(),loader:ge,shared:null,server:null,data:null};return await Z({url:d,params:c,branch:[R,k],status:n,error:f,routeId:s})}function Pe(n){if(Oe(n))return;const f=decodeURI(n.pathname.slice(e.length)||"/");for(const d of de){const s=d.exec(f);if(s){const c=new URL(n.origin+at(n.pathname,t)+n.search+n.hash);return{id:c.pathname+c.search,route:d,params:st(s),url:c}}}}function Oe(n){return n.origin!==location.origin||!n.pathname.startsWith(e)}async function ie({url:n,scroll:f,keepfocus:d,redirect_chain:s,details:c,type:v,delta:_,accepted:R,blocked:k}){let h=!1;const y={from:r.url,to:n,type:v};_!==void 0&&(y.delta=_);const P={...y,cancel:()=>{h=!0}};if(u.before_navigate.forEach(A=>A(P)),h){k();return}pe(O),R(),l&&J.navigating.set(y),await Re(n,s,{scroll:f,keepfocus:d,details:c},()=>{u.after_navigate.forEach(A=>A(y)),J.navigating.set(null)})}function Y(n){return location.href=n.href,new Promise(()=>{})}return{after_navigate:n=>{he(()=>(u.after_navigate.push(n),()=>{const f=u.after_navigate.indexOf(n);u.after_navigate.splice(f,1)}))},before_navigate:n=>{he(()=>(u.before_navigate.push(n),()=>{const f=u.before_navigate.indexOf(n);u.before_navigate.splice(f,1)}))},disable_scroll_handling:()=>{(p||!l)&&(w=!1)},goto:(n,f={})=>ke(n,f,[]),invalidate:n=>{if(n===void 0)throw new Error("`invalidate()` (with no arguments) has been replaced by `invalidateAll()`");if(typeof n=="function")o.push(n);else{const{href:f}=new URL(n,location.href);o.push(d=>d.href===f)}return ve()},invalidateAll:()=>(E=!0,ve()),prefetch:async n=>{const f=new URL(n,Ne(document));await Ee(f)},prefetch_routes:async n=>{const d=(n?de.filter(s=>n.some(c=>s.exec(c))):de).map(s=>Promise.all([...s.layouts,s.leaf].map(c=>c==null?void 0:c[1]())));await Promise.all(d)},_start_router:()=>{history.scrollRestoration="manual",addEventListener("beforeunload",s=>{let c=!1;const v={from:r.url,to:null,type:"unload",cancel:()=>c=!0};u.before_navigate.forEach(_=>_(v)),c?(s.preventDefault(),s.returnValue=""):history.scrollRestoration="auto"}),addEventListener("visibilitychange",()=>{if(document.visibilityState==="hidden"){pe(O);try{sessionStorage[Ke]=JSON.stringify(Q)}catch{}}});const n=s=>{const{url:c,options:v}=Ve(s);if(c&&v.prefetch===""){if(Oe(c))return;Ee(c)}};let f;const d=s=>{clearTimeout(f),f=setTimeout(()=>{var c;(c=s.target)==null||c.dispatchEvent(new CustomEvent("sveltekit:trigger_prefetch",{bubbles:!0}))},20)};addEventListener("touchstart",n),addEventListener("mousemove",d),addEventListener("sveltekit:trigger_prefetch",n),addEventListener("click",s=>{if(s.button||s.which!==1||s.metaKey||s.ctrlKey||s.shiftKey||s.altKey||s.defaultPrevented)return;const{a:c,url:v,options:_}=Ve(s);if(!c||!v)return;const R=c instanceof SVGAElement;if(!R&&!(v.protocol==="https:"||v.protocol==="http:"))return;const k=(c.getAttribute("rel")||"").split(/\s+/);if(c.hasAttribute("download")||k.includes("external")||_.reload===""||(R?c.target.baseVal:c.target))return;const[h,y]=v.href.split("#");if(y!==void 0&&h===location.href.split("#")[0]){V=!0,pe(O),J.page.set({...M,url:v}),J.page.notify();return}ie({url:v,scroll:_.noscroll===""?me():null,keepfocus:!1,redirect_chain:[],details:{state:{},replaceState:v.href===location.href},accepted:()=>s.preventDefault(),blocked:()=>s.preventDefault(),type:"link"})}),addEventListener("popstate",s=>{if(s.state){if(s.state[q]===O)return;const c=s.state[q]-O;ie({url:new URL(location.href),scroll:Q[s.state[q]],keepfocus:!1,redirect_chain:[],details:null,accepted:()=>{O=s.state[q]},blocked:()=>{history.go(-c)},type:"popstate",delta:c})}}),addEventListener("hashchange",()=>{V&&(V=!1,history.replaceState({...history.state,[q]:++O},"",location.href))});for(const s of document.querySelectorAll("link"))s.rel==="icon"&&(s.href=s.href);addEventListener("pageshow",s=>{s.persisted&&J.navigating.set(null)})},_hydrate:async({status:n,error:f,node_ids:d,params:s,routeId:c,data:v,errors:_})=>{const R=new URL(location.href);let k;try{const h=d.map(async(y,P)=>{const A=v[P];return se({loader:ae[y],url:R,params:s,routeId:c,parent:async()=>{const $={};for(let j=0;j<P;j+=1)Object.assign($,(await h[j]).data);return $},server_data_node:oe(A)})});k=await Z({url:R,params:s,branch:await Promise.all(h),status:n,error:f!=null&&f.__is_http_error?new fe(f.status,f.message):f,validation_errors:_,routeId:c})}catch(h){const y=h;if(y instanceof De){await Y(new URL(h.location,location.href));return}k=await ee({status:y instanceof fe?y.status:500,error:y,url:R,routeId:c})}Se(k)}}}let Pt=1;async function ze(a,e){const t=new URL(a);t.pathname=a.pathname.replace(/\/$/,"")+Lt,t.searchParams.set("__invalid",e.map(i=>i?"y":"n").join("")),t.searchParams.set("__id",String(Pt++)),await G(()=>import(t.href),[],import.meta.url);const o=window.__sveltekit_data;return delete window.__sveltekit_data,o}async function Ut({env:a,hydrate:e,paths:t,target:o,trailing_slash:i}){rt(t);const u=$t({target:o,base:t.base,trailing_slash:i});nt({client:u}),e?await u._hydrate(e):u.goto(location.href,{replaceState:!0}),u._start_router()}export{Ut as start};