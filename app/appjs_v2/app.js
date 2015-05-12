/* Zepto v1.1.3 - zepto event ajax form ie - zeptojs.com/license */
var Zepto=function(){function L(t){return null==t?String(t):j[T.call(t)]||"object"}function Z(t){return"function"==L(t)}function $(t){return null!=t&&t==t.window}function _(t){return null!=t&&t.nodeType==t.DOCUMENT_NODE}function D(t){return"object"==L(t)}function R(t){return D(t)&&!$(t)&&Object.getPrototypeOf(t)==Object.prototype}function M(t){return"number"==typeof t.length}function k(t){return s.call(t,function(t){return null!=t})}function z(t){return t.length>0?n.fn.concat.apply([],t):t}function F(t){return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function q(t){return t in f?f[t]:f[t]=new RegExp("(^|\\s)"+t+"(\\s|$)")}function H(t,e){return"number"!=typeof e||c[F(t)]?e:e+"px"}function I(t){var e,n;return u[t]||(e=a.createElement(t),a.body.appendChild(e),n=getComputedStyle(e,"").getPropertyValue("display"),e.parentNode.removeChild(e),"none"==n&&(n="block"),u[t]=n),u[t]}function V(t){return"children"in t?o.call(t.children):n.map(t.childNodes,function(t){return 1==t.nodeType?t:void 0})}function U(n,i,r){for(e in i)r&&(R(i[e])||A(i[e]))?(R(i[e])&&!R(n[e])&&(n[e]={}),A(i[e])&&!A(n[e])&&(n[e]=[]),U(n[e],i[e],r)):i[e]!==t&&(n[e]=i[e])}function B(t,e){return null==e?n(t):n(t).filter(e)}function J(t,e,n,i){return Z(e)?e.call(t,n,i):e}function X(t,e,n){null==n?t.removeAttribute(e):t.setAttribute(e,n)}function W(e,n){var i=e.className,r=i&&i.baseVal!==t;return n===t?r?i.baseVal:i:void(r?i.baseVal=n:e.className=n)}function Y(t){var e;try{return t?"true"==t||("false"==t?!1:"null"==t?null:/^0/.test(t)||isNaN(e=Number(t))?/^[\[\{]/.test(t)?n.parseJSON(t):t:e):t}catch(i){return t}}function G(t,e){e(t);for(var n in t.childNodes)G(t.childNodes[n],e)}var t,e,n,i,C,N,r=[],o=r.slice,s=r.filter,a=window.document,u={},f={},c={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},l=/^\s*<(\w+|!)[^>]*>/,h=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,p=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,d=/^(?:body|html)$/i,m=/([A-Z])/g,g=["val","css","html","text","data","width","height","offset"],v=["after","prepend","before","append"],y=a.createElement("table"),x=a.createElement("tr"),b={tr:a.createElement("tbody"),tbody:y,thead:y,tfoot:y,td:x,th:x,"*":a.createElement("div")},w=/complete|loaded|interactive/,E=/^[\w-]*$/,j={},T=j.toString,S={},O=a.createElement("div"),P={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},A=Array.isArray||function(t){return t instanceof Array};return S.matches=function(t,e){if(!e||!t||1!==t.nodeType)return!1;var n=t.webkitMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.matchesSelector;if(n)return n.call(t,e);var i,r=t.parentNode,o=!r;return o&&(r=O).appendChild(t),i=~S.qsa(r,e).indexOf(t),o&&O.removeChild(t),i},C=function(t){return t.replace(/-+(.)?/g,function(t,e){return e?e.toUpperCase():""})},N=function(t){return s.call(t,function(e,n){return t.indexOf(e)==n})},S.fragment=function(e,i,r){var s,u,f;return h.test(e)&&(s=n(a.createElement(RegExp.$1))),s||(e.replace&&(e=e.replace(p,"<$1></$2>")),i===t&&(i=l.test(e)&&RegExp.$1),i in b||(i="*"),f=b[i],f.innerHTML=""+e,s=n.each(o.call(f.childNodes),function(){f.removeChild(this)})),R(r)&&(u=n(s),n.each(r,function(t,e){g.indexOf(t)>-1?u[t](e):u.attr(t,e)})),s},S.Z=function(t,e){return t=t||[],t.__proto__=n.fn,t.selector=e||"",t},S.isZ=function(t){return t instanceof S.Z},S.init=function(e,i){var r;if(!e)return S.Z();if("string"==typeof e)if(e=e.trim(),"<"==e[0]&&l.test(e))r=S.fragment(e,RegExp.$1,i),e=null;else{if(i!==t)return n(i).find(e);r=S.qsa(a,e)}else{if(Z(e))return n(a).ready(e);if(S.isZ(e))return e;if(A(e))r=k(e);else if(D(e))r=[e],e=null;else if(l.test(e))r=S.fragment(e.trim(),RegExp.$1,i),e=null;else{if(i!==t)return n(i).find(e);r=S.qsa(a,e)}}return S.Z(r,e)},n=function(t,e){return S.init(t,e)},n.extend=function(t){var e,n=o.call(arguments,1);return"boolean"==typeof t&&(e=t,t=n.shift()),n.forEach(function(n){U(t,n,e)}),t},S.qsa=function(t,e){var n,i="#"==e[0],r=!i&&"."==e[0],s=i||r?e.slice(1):e,a=E.test(s);return _(t)&&a&&i?(n=t.getElementById(s))?[n]:[]:1!==t.nodeType&&9!==t.nodeType?[]:o.call(a&&!i?r?t.getElementsByClassName(s):t.getElementsByTagName(e):t.querySelectorAll(e))},n.contains=function(t,e){return t!==e&&t.contains(e)},n.type=L,n.isFunction=Z,n.isWindow=$,n.isArray=A,n.isPlainObject=R,n.isEmptyObject=function(t){var e;for(e in t)return!1;return!0},n.inArray=function(t,e,n){return r.indexOf.call(e,t,n)},n.camelCase=C,n.trim=function(t){return null==t?"":String.prototype.trim.call(t)},n.uuid=0,n.support={},n.expr={},n.map=function(t,e){var n,r,o,i=[];if(M(t))for(r=0;r<t.length;r++)n=e(t[r],r),null!=n&&i.push(n);else for(o in t)n=e(t[o],o),null!=n&&i.push(n);return z(i)},n.each=function(t,e){var n,i;if(M(t)){for(n=0;n<t.length;n++)if(e.call(t[n],n,t[n])===!1)return t}else for(i in t)if(e.call(t[i],i,t[i])===!1)return t;return t},n.grep=function(t,e){return s.call(t,e)},window.JSON&&(n.parseJSON=JSON.parse),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,e){j["[object "+e+"]"]=e.toLowerCase()}),n.fn={forEach:r.forEach,reduce:r.reduce,push:r.push,sort:r.sort,indexOf:r.indexOf,concat:r.concat,map:function(t){return n(n.map(this,function(e,n){return t.call(e,n,e)}))},slice:function(){return n(o.apply(this,arguments))},ready:function(t){return w.test(a.readyState)&&a.body?t(n):a.addEventListener("DOMContentLoaded",function(){t(n)},!1),this},get:function(e){return e===t?o.call(this):this[e>=0?e:e+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){null!=this.parentNode&&this.parentNode.removeChild(this)})},each:function(t){return r.every.call(this,function(e,n){return t.call(e,n,e)!==!1}),this},filter:function(t){return Z(t)?this.not(this.not(t)):n(s.call(this,function(e){return S.matches(e,t)}))},add:function(t,e){return n(N(this.concat(n(t,e))))},is:function(t){return this.length>0&&S.matches(this[0],t)},not:function(e){var i=[];if(Z(e)&&e.call!==t)this.each(function(t){e.call(this,t)||i.push(this)});else{var r="string"==typeof e?this.filter(e):M(e)&&Z(e.item)?o.call(e):n(e);this.forEach(function(t){r.indexOf(t)<0&&i.push(t)})}return n(i)},has:function(t){return this.filter(function(){return D(t)?n.contains(this,t):n(this).find(t).size()})},eq:function(t){return-1===t?this.slice(t):this.slice(t,+t+1)},first:function(){var t=this[0];return t&&!D(t)?t:n(t)},last:function(){var t=this[this.length-1];return t&&!D(t)?t:n(t)},find:function(t){var e,i=this;return e="object"==typeof t?n(t).filter(function(){var t=this;return r.some.call(i,function(e){return n.contains(e,t)})}):1==this.length?n(S.qsa(this[0],t)):this.map(function(){return S.qsa(this,t)})},closest:function(t,e){var i=this[0],r=!1;for("object"==typeof t&&(r=n(t));i&&!(r?r.indexOf(i)>=0:S.matches(i,t));)i=i!==e&&!_(i)&&i.parentNode;return n(i)},parents:function(t){for(var e=[],i=this;i.length>0;)i=n.map(i,function(t){return(t=t.parentNode)&&!_(t)&&e.indexOf(t)<0?(e.push(t),t):void 0});return B(e,t)},parent:function(t){return B(N(this.pluck("parentNode")),t)},children:function(t){return B(this.map(function(){return V(this)}),t)},contents:function(){return this.map(function(){return o.call(this.childNodes)})},siblings:function(t){return B(this.map(function(t,e){return s.call(V(e.parentNode),function(t){return t!==e})}),t)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(t){return n.map(this,function(e){return e[t]})},show:function(){return this.each(function(){"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=I(this.nodeName))})},replaceWith:function(t){return this.before(t).remove()},wrap:function(t){var e=Z(t);if(this[0]&&!e)var i=n(t).get(0),r=i.parentNode||this.length>1;return this.each(function(o){n(this).wrapAll(e?t.call(this,o):r?i.cloneNode(!0):i)})},wrapAll:function(t){if(this[0]){n(this[0]).before(t=n(t));for(var e;(e=t.children()).length;)t=e.first();n(t).append(this)}return this},wrapInner:function(t){var e=Z(t);return this.each(function(i){var r=n(this),o=r.contents(),s=e?t.call(this,i):t;o.length?o.wrapAll(s):r.append(s)})},unwrap:function(){return this.parent().each(function(){n(this).replaceWith(n(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(e){return this.each(function(){var i=n(this);(e===t?"none"==i.css("display"):e)?i.show():i.hide()})},prev:function(t){return n(this.pluck("previousElementSibling")).filter(t||"*")},next:function(t){return n(this.pluck("nextElementSibling")).filter(t||"*")},html:function(t){return 0===arguments.length?this.length>0?this[0].innerHTML:null:this.each(function(e){var i=this.innerHTML;n(this).empty().append(J(this,t,e,i))})},text:function(e){return 0===arguments.length?this.length>0?this[0].textContent:null:this.each(function(){this.textContent=e===t?"":""+e})},attr:function(n,i){var r;return"string"==typeof n&&i===t?0==this.length||1!==this[0].nodeType?t:"value"==n&&"INPUT"==this[0].nodeName?this.val():!(r=this[0].getAttribute(n))&&n in this[0]?this[0][n]:r:this.each(function(t){if(1===this.nodeType)if(D(n))for(e in n)X(this,e,n[e]);else X(this,n,J(this,i,t,this.getAttribute(n)))})},removeAttr:function(t){return this.each(function(){1===this.nodeType&&X(this,t)})},prop:function(e,n){return e=P[e]||e,n===t?this[0]&&this[0][e]:this.each(function(t){this[e]=J(this,n,t,this[e])})},data:function(e,n){var i=this.attr("data-"+e.replace(m,"-$1").toLowerCase(),n);return null!==i?Y(i):t},val:function(t){return 0===arguments.length?this[0]&&(this[0].multiple?n(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value):this.each(function(e){this.value=J(this,t,e,this.value)})},offset:function(t){if(t)return this.each(function(e){var i=n(this),r=J(this,t,e,i.offset()),o=i.offsetParent().offset(),s={top:r.top-o.top,left:r.left-o.left};"static"==i.css("position")&&(s.position="relative"),i.css(s)});if(0==this.length)return null;var e=this[0].getBoundingClientRect();return{left:e.left+window.pageXOffset,top:e.top+window.pageYOffset,width:Math.round(e.width),height:Math.round(e.height)}},css:function(t,i){if(arguments.length<2){var r=this[0],o=getComputedStyle(r,"");if(!r)return;if("string"==typeof t)return r.style[C(t)]||o.getPropertyValue(t);if(A(t)){var s={};return n.each(A(t)?t:[t],function(t,e){s[e]=r.style[C(e)]||o.getPropertyValue(e)}),s}}var a="";if("string"==L(t))i||0===i?a=F(t)+":"+H(t,i):this.each(function(){this.style.removeProperty(F(t))});else for(e in t)t[e]||0===t[e]?a+=F(e)+":"+H(e,t[e])+";":this.each(function(){this.style.removeProperty(F(e))});return this.each(function(){this.style.cssText+=";"+a})},index:function(t){return t?this.indexOf(n(t)[0]):this.parent().children().indexOf(this[0])},hasClass:function(t){return t?r.some.call(this,function(t){return this.test(W(t))},q(t)):!1},addClass:function(t){return t?this.each(function(e){i=[];var r=W(this),o=J(this,t,e,r);o.split(/\s+/g).forEach(function(t){n(this).hasClass(t)||i.push(t)},this),i.length&&W(this,r+(r?" ":"")+i.join(" "))}):this},removeClass:function(e){return this.each(function(n){return e===t?W(this,""):(i=W(this),J(this,e,n,i).split(/\s+/g).forEach(function(t){i=i.replace(q(t)," ")}),void W(this,i.trim()))})},toggleClass:function(e,i){return e?this.each(function(r){var o=n(this),s=J(this,e,r,W(this));s.split(/\s+/g).forEach(function(e){(i===t?!o.hasClass(e):i)?o.addClass(e):o.removeClass(e)})}):this},scrollTop:function(e){if(this.length){var n="scrollTop"in this[0];return e===t?n?this[0].scrollTop:this[0].pageYOffset:this.each(n?function(){this.scrollTop=e}:function(){this.scrollTo(this.scrollX,e)})}},scrollLeft:function(e){if(this.length){var n="scrollLeft"in this[0];return e===t?n?this[0].scrollLeft:this[0].pageXOffset:this.each(n?function(){this.scrollLeft=e}:function(){this.scrollTo(e,this.scrollY)})}},position:function(){if(this.length){var t=this[0],e=this.offsetParent(),i=this.offset(),r=d.test(e[0].nodeName)?{top:0,left:0}:e.offset();return i.top-=parseFloat(n(t).css("margin-top"))||0,i.left-=parseFloat(n(t).css("margin-left"))||0,r.top+=parseFloat(n(e[0]).css("border-top-width"))||0,r.left+=parseFloat(n(e[0]).css("border-left-width"))||0,{top:i.top-r.top,left:i.left-r.left}}},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent||a.body;t&&!d.test(t.nodeName)&&"static"==n(t).css("position");)t=t.offsetParent;return t})}},n.fn.detach=n.fn.remove,["width","height"].forEach(function(e){var i=e.replace(/./,function(t){return t[0].toUpperCase()});n.fn[e]=function(r){var o,s=this[0];return r===t?$(s)?s["inner"+i]:_(s)?s.documentElement["scroll"+i]:(o=this.offset())&&o[e]:this.each(function(t){s=n(this),s.css(e,J(this,r,t,s[e]()))})}}),v.forEach(function(t,e){var i=e%2;n.fn[t]=function(){var t,o,r=n.map(arguments,function(e){return t=L(e),"object"==t||"array"==t||null==e?e:S.fragment(e)}),s=this.length>1;return r.length<1?this:this.each(function(t,a){o=i?a:a.parentNode,a=0==e?a.nextSibling:1==e?a.firstChild:2==e?a:null,r.forEach(function(t){if(s)t=t.cloneNode(!0);else if(!o)return n(t).remove();G(o.insertBefore(t,a),function(t){null==t.nodeName||"SCRIPT"!==t.nodeName.toUpperCase()||t.type&&"text/javascript"!==t.type||t.src||window.eval.call(window,t.innerHTML)})})})},n.fn[i?t+"To":"insert"+(e?"Before":"After")]=function(e){return n(e)[t](this),this}}),S.Z.prototype=n.fn,S.uniq=N,S.deserializeValue=Y,n.zepto=S,n}();window.Zepto=Zepto,void 0===window.$&&(window.$=Zepto),function(t){function l(t){return t._zid||(t._zid=e++)}function h(t,e,n,i){if(e=p(e),e.ns)var r=d(e.ns);return(s[l(t)]||[]).filter(function(t){return!(!t||e.e&&t.e!=e.e||e.ns&&!r.test(t.ns)||n&&l(t.fn)!==l(n)||i&&t.sel!=i)})}function p(t){var e=(""+t).split(".");return{e:e[0],ns:e.slice(1).sort().join(" ")}}function d(t){return new RegExp("(?:^| )"+t.replace(" "," .* ?")+"(?: |$)")}function m(t,e){return t.del&&!u&&t.e in f||!!e}function g(t){return c[t]||u&&f[t]||t}function v(e,i,r,o,a,u,f){var h=l(e),d=s[h]||(s[h]=[]);i.split(/\s/).forEach(function(i){if("ready"==i)return t(document).ready(r);var s=p(i);s.fn=r,s.sel=a,s.e in c&&(r=function(e){var n=e.relatedTarget;return!n||n!==this&&!t.contains(this,n)?s.fn.apply(this,arguments):void 0}),s.del=u;var l=u||r;s.proxy=function(t){if(t=j(t),!t.isImmediatePropagationStopped()){t.data=o;var i=l.apply(e,t._args==n?[t]:[t].concat(t._args));return i===!1&&(t.preventDefault(),t.stopPropagation()),i}},s.i=d.length,d.push(s),"addEventListener"in e&&e.addEventListener(g(s.e),s.proxy,m(s,f))})}function y(t,e,n,i,r){var o=l(t);(e||"").split(/\s/).forEach(function(e){h(t,e,n,i).forEach(function(e){delete s[o][e.i],"removeEventListener"in t&&t.removeEventListener(g(e.e),e.proxy,m(e,r))})})}function j(e,i){return(i||!e.isDefaultPrevented)&&(i||(i=e),t.each(E,function(t,n){var r=i[t];e[t]=function(){return this[n]=x,r&&r.apply(i,arguments)},e[n]=b}),(i.defaultPrevented!==n?i.defaultPrevented:"returnValue"in i?i.returnValue===!1:i.getPreventDefault&&i.getPreventDefault())&&(e.isDefaultPrevented=x)),e}function T(t){var e,i={originalEvent:t};for(e in t)w.test(e)||t[e]===n||(i[e]=t[e]);return j(i,t)}var n,e=1,i=Array.prototype.slice,r=t.isFunction,o=function(t){return"string"==typeof t},s={},a={},u="onfocusin"in window,f={focus:"focusin",blur:"focusout"},c={mouseenter:"mouseover",mouseleave:"mouseout"};a.click=a.mousedown=a.mouseup=a.mousemove="MouseEvents",t.event={add:v,remove:y},t.proxy=function(e,n){if(r(e)){var i=function(){return e.apply(n,arguments)};return i._zid=l(e),i}if(o(n))return t.proxy(e[n],e);throw new TypeError("expected function")},t.fn.bind=function(t,e,n){return this.on(t,e,n)},t.fn.unbind=function(t,e){return this.off(t,e)},t.fn.one=function(t,e,n,i){return this.on(t,e,n,i,1)};var x=function(){return!0},b=function(){return!1},w=/^([A-Z]|returnValue$|layer[XY]$)/,E={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};t.fn.delegate=function(t,e,n){return this.on(e,t,n)},t.fn.undelegate=function(t,e,n){return this.off(e,t,n)},t.fn.live=function(e,n){return t(document.body).delegate(this.selector,e,n),this},t.fn.die=function(e,n){return t(document.body).undelegate(this.selector,e,n),this},t.fn.on=function(e,s,a,u,f){var c,l,h=this;return e&&!o(e)?(t.each(e,function(t,e){h.on(t,s,a,e,f)}),h):(o(s)||r(u)||u===!1||(u=a,a=s,s=n),(r(a)||a===!1)&&(u=a,a=n),u===!1&&(u=b),h.each(function(n,r){f&&(c=function(t){return y(r,t.type,u),u.apply(this,arguments)}),s&&(l=function(e){var n,o=t(e.target).closest(s,r).get(0);return o&&o!==r?(n=t.extend(T(e),{currentTarget:o,liveFired:r}),(c||u).apply(o,[n].concat(i.call(arguments,1)))):void 0}),v(r,e,u,a,s,l||c)}))},t.fn.off=function(e,i,s){var a=this;return e&&!o(e)?(t.each(e,function(t,e){a.off(t,i,e)}),a):(o(i)||r(s)||s===!1||(s=i,i=n),s===!1&&(s=b),a.each(function(){y(this,e,s,i)}))},t.fn.trigger=function(e,n){return e=o(e)||t.isPlainObject(e)?t.Event(e):j(e),e._args=n,this.each(function(){"dispatchEvent"in this?this.dispatchEvent(e):t(this).triggerHandler(e,n)})},t.fn.triggerHandler=function(e,n){var i,r;return this.each(function(s,a){i=T(o(e)?t.Event(e):e),i._args=n,i.target=a,t.each(h(a,e.type||e),function(t,e){return r=e.proxy(i),i.isImmediatePropagationStopped()?!1:void 0})}),r},"focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(e){t.fn[e]=function(t){return t?this.bind(e,t):this.trigger(e)}}),["focus","blur"].forEach(function(e){t.fn[e]=function(t){return t?this.bind(e,t):this.each(function(){try{this[e]()}catch(t){}}),this}}),t.Event=function(t,e){o(t)||(e=t,t=e.type);var n=document.createEvent(a[t]||"Events"),i=!0;if(e)for(var r in e)"bubbles"==r?i=!!e[r]:n[r]=e[r];return n.initEvent(t,i,!0),j(n)}}(Zepto),function(t){function l(e,n,i){var r=t.Event(n);return t(e).trigger(r,i),!r.isDefaultPrevented()}function h(t,e,i,r){return t.global?l(e||n,i,r):void 0}function p(e){e.global&&0===t.active++&&h(e,null,"ajaxStart")}function d(e){e.global&&!--t.active&&h(e,null,"ajaxStop")}function m(t,e){var n=e.context;return e.beforeSend.call(n,t,e)===!1||h(e,n,"ajaxBeforeSend",[t,e])===!1?!1:void h(e,n,"ajaxSend",[t,e])}function g(t,e,n,i){var r=n.context,o="success";n.success.call(r,t,o,e),i&&i.resolveWith(r,[t,o,e]),h(n,r,"ajaxSuccess",[e,n,t]),y(o,e,n)}function v(t,e,n,i,r){var o=i.context;i.error.call(o,n,e,t),r&&r.rejectWith(o,[n,e,t]),h(i,o,"ajaxError",[n,i,t||e]),y(e,n,i)}function y(t,e,n){var i=n.context;n.complete.call(i,e,t),h(n,i,"ajaxComplete",[e,n]),d(n)}function x(){}function b(t){return t&&(t=t.split(";",2)[0]),t&&(t==f?"html":t==u?"json":s.test(t)?"script":a.test(t)&&"xml")||"text"}function w(t,e){return""==e?t:(t+"&"+e).replace(/[&?]{1,2}/,"?")}function E(e){e.processData&&e.data&&"string"!=t.type(e.data)&&(e.data=t.param(e.data,e.traditional)),!e.data||e.type&&"GET"!=e.type.toUpperCase()||(e.url=w(e.url,e.data),e.data=void 0)}function j(e,n,i,r){return t.isFunction(n)&&(r=i,i=n,n=void 0),t.isFunction(i)||(r=i,i=void 0),{url:e,data:n,success:i,dataType:r}}function S(e,n,i,r){var o,s=t.isArray(n),a=t.isPlainObject(n);t.each(n,function(n,u){o=t.type(u),r&&(n=i?r:r+"["+(a||"object"==o||"array"==o?n:"")+"]"),!r&&s?e.add(u.name,u.value):"array"==o||!i&&"object"==o?S(e,u,i,n):e.add(n,u)})}var i,r,e=0,n=window.document,o=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,s=/^(?:text|application)\/javascript/i,a=/^(?:text|application)\/xml/i,u="application/json",f="text/html",c=/^\s*$/;t.active=0,t.ajaxJSONP=function(i,r){if(!("type"in i))return t.ajax(i);var f,h,o=i.jsonpCallback,s=(t.isFunction(o)?o():o)||"jsonp"+ ++e,a=n.createElement("script"),u=window[s],c=function(e){t(a).triggerHandler("error",e||"abort")},l={abort:c};return r&&r.promise(l),t(a).on("load error",function(e,n){clearTimeout(h),t(a).off().remove(),"error"!=e.type&&f?g(f[0],l,i,r):v(null,n||"error",l,i,r),window[s]=u,f&&t.isFunction(u)&&u(f[0]),u=f=void 0}),m(l,i)===!1?(c("abort"),l):(window[s]=function(){f=arguments},a.src=i.url.replace(/\?(.+)=\?/,"?$1="+s),n.head.appendChild(a),i.timeout>0&&(h=setTimeout(function(){c("timeout")},i.timeout)),l)},t.ajaxSettings={type:"GET",beforeSend:x,success:x,error:x,complete:x,context:null,global:!0,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript, application/x-javascript",json:u,xml:"application/xml, text/xml",html:f,text:"text/plain"},crossDomain:!1,timeout:0,processData:!0,cache:!0},t.ajax=function(e){var n=t.extend({},e||{}),o=t.Deferred&&t.Deferred();for(i in t.ajaxSettings)void 0===n[i]&&(n[i]=t.ajaxSettings[i]);p(n),n.crossDomain||(n.crossDomain=/^([\w-]+:)?\/\/([^\/]+)/.test(n.url)&&RegExp.$2!=window.location.host),n.url||(n.url=window.location.toString()),E(n),n.cache===!1&&(n.url=w(n.url,"_="+Date.now()));var s=n.dataType,a=/\?.+=\?/.test(n.url);if("jsonp"==s||a)return a||(n.url=w(n.url,n.jsonp?n.jsonp+"=?":n.jsonp===!1?"":"callback=?")),t.ajaxJSONP(n,o);var j,u=n.accepts[s],f={},l=function(t,e){f[t.toLowerCase()]=[t,e]},h=/^([\w-]+:)\/\//.test(n.url)?RegExp.$1:window.location.protocol,d=n.xhr(),y=d.setRequestHeader;if(o&&o.promise(d),n.crossDomain||l("X-Requested-With","XMLHttpRequest"),l("Accept",u||"*/*"),(u=n.mimeType||u)&&(u.indexOf(",")>-1&&(u=u.split(",",2)[0]),d.overrideMimeType&&d.overrideMimeType(u)),(n.contentType||n.contentType!==!1&&n.data&&"GET"!=n.type.toUpperCase())&&l("Content-Type",n.contentType||"application/x-www-form-urlencoded"),n.headers)for(r in n.headers)l(r,n.headers[r]);if(d.setRequestHeader=l,d.onreadystatechange=function(){if(4==d.readyState){d.onreadystatechange=x,clearTimeout(j);var e,i=!1;if(d.status>=200&&d.status<300||304==d.status||0==d.status&&"file:"==h){s=s||b(n.mimeType||d.getResponseHeader("content-type")),e=d.responseText;try{"script"==s?(1,eval)(e):"xml"==s?e=d.responseXML:"json"==s&&(e=c.test(e)?null:t.parseJSON(e))}catch(r){i=r}i?v(i,"parsererror",d,n,o):g(e,d,n,o)}else v(d.statusText||null,d.status?"error":"abort",d,n,o)}},m(d,n)===!1)return d.abort(),v(null,"abort",d,n,o),d;if(n.xhrFields)for(r in n.xhrFields)d[r]=n.xhrFields[r];var T="async"in n?n.async:!0;d.open(n.type,n.url,T,n.username,n.password);for(r in f)y.apply(d,f[r]);return n.timeout>0&&(j=setTimeout(function(){d.onreadystatechange=x,d.abort(),v(null,"timeout",d,n,o)},n.timeout)),d.send(n.data?n.data:null),d},t.get=function(){return t.ajax(j.apply(null,arguments))},t.post=function(){var e=j.apply(null,arguments);return e.type="POST",t.ajax(e)},t.getJSON=function(){var e=j.apply(null,arguments);return e.dataType="json",t.ajax(e)},t.fn.load=function(e,n,i){if(!this.length)return this;var a,r=this,s=e.split(/\s/),u=j(e,n,i),f=u.success;return s.length>1&&(u.url=s[0],a=s[1]),u.success=function(e){r.html(a?t("<div>").html(e.replace(o,"")).find(a):e),f&&f.apply(r,arguments)},t.ajax(u),this};var T=encodeURIComponent;t.param=function(t,e){var n=[];return n.add=function(t,e){this.push(T(t)+"="+T(e))},S(n,t,e),n.join("&").replace(/%20/g,"+")}}(Zepto),function(t){t.fn.serializeArray=function(){var n,e=[];return t([].slice.call(this.get(0).elements)).each(function(){n=t(this);var i=n.attr("type");"fieldset"!=this.nodeName.toLowerCase()&&!this.disabled&&"submit"!=i&&"reset"!=i&&"button"!=i&&("radio"!=i&&"checkbox"!=i||this.checked)&&e.push({name:n.attr("name"),value:n.val()})}),e},t.fn.serialize=function(){var t=[];return this.serializeArray().forEach(function(e){t.push(encodeURIComponent(e.name)+"="+encodeURIComponent(e.value))}),t.join("&")},t.fn.submit=function(e){if(e)this.bind("submit",e);else if(this.length){var n=t.Event("submit");this.eq(0).trigger(n),n.isDefaultPrevented()||this.get(0).submit()}return this}}(Zepto),function(t){"__proto__"in{}||t.extend(t.zepto,{Z:function(e,n){return e=e||[],t.extend(e,t.fn),e.selector=n||"",e.__Z=!0,e},isZ:function(e){return"array"===t.type(e)&&"__Z"in e}});try{getComputedStyle(void 0)}catch(e){var n=getComputedStyle;window.getComputedStyle=function(t){try{return n(t)}catch(e){return null}}}}(Zepto);

//     Zepto.js
//     (c) 2010-2015 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.

;(function($, undefined){
  var prefix = '', eventPrefix,
    vendors = { Webkit: 'webkit', Moz: '', O: 'o' },
    testEl = document.createElement('div'),
    supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
    transform,
    transitionProperty, transitionDuration, transitionTiming, transitionDelay,
    animationName, animationDuration, animationTiming, animationDelay,
    cssReset = {}

  function dasherize(str) { return str.replace(/([a-z])([A-Z])/, '$1-$2').toLowerCase() }
  function normalizeEvent(name) { return eventPrefix ? eventPrefix + name : name.toLowerCase() }

  $.each(vendors, function(vendor, event){
    if (testEl.style[vendor + 'TransitionProperty'] !== undefined) {
      prefix = '-' + vendor.toLowerCase() + '-'
      eventPrefix = event
      return false
    }
  })

  transform = prefix + 'transform'
  cssReset[transitionProperty = prefix + 'transition-property'] =
  cssReset[transitionDuration = prefix + 'transition-duration'] =
  cssReset[transitionDelay    = prefix + 'transition-delay'] =
  cssReset[transitionTiming   = prefix + 'transition-timing-function'] =
  cssReset[animationName      = prefix + 'animation-name'] =
  cssReset[animationDuration  = prefix + 'animation-duration'] =
  cssReset[animationDelay     = prefix + 'animation-delay'] =
  cssReset[animationTiming    = prefix + 'animation-timing-function'] = ''

  $.fx = {
    off: (eventPrefix === undefined && testEl.style.transitionProperty === undefined),
    speeds: { _default: 400, fast: 200, slow: 600 },
    cssPrefix: prefix,
    transitionEnd: normalizeEvent('TransitionEnd'),
    animationEnd: normalizeEvent('AnimationEnd')
  }

  $.fn.animate = function(properties, duration, ease, callback, delay){
    if ($.isFunction(duration))
      callback = duration, ease = undefined, duration = undefined
    if ($.isFunction(ease))
      callback = ease, ease = undefined
    if ($.isPlainObject(duration))
      ease = duration.easing, callback = duration.complete, delay = duration.delay, duration = duration.duration
    if (duration) duration = (typeof duration == 'number' ? duration :
                    ($.fx.speeds[duration] || $.fx.speeds._default)) / 1000
    if (delay) delay = parseFloat(delay) / 1000
    return this.anim(properties, duration, ease, callback, delay)
  }

  $.fn.anim = function(properties, duration, ease, callback, delay){
    var key, cssValues = {}, cssProperties, transforms = '',
        that = this, wrappedCallback, endEvent = $.fx.transitionEnd,
        fired = false

    if (duration === undefined) duration = $.fx.speeds._default / 1000
    if (delay === undefined) delay = 0
    if ($.fx.off) duration = 0

    if (typeof properties == 'string') {
      // keyframe animation
      cssValues[animationName] = properties
      cssValues[animationDuration] = duration + 's'
      cssValues[animationDelay] = delay + 's'
      cssValues[animationTiming] = (ease || 'linear')
      endEvent = $.fx.animationEnd
    } else {
      cssProperties = []
      // CSS transitions
      for (key in properties)
        if (supportedTransforms.test(key)) transforms += key + '(' + properties[key] + ') '
        else cssValues[key] = properties[key], cssProperties.push(dasherize(key))

      if (transforms) cssValues[transform] = transforms, cssProperties.push(transform)
      if (duration > 0 && typeof properties === 'object') {
        cssValues[transitionProperty] = cssProperties.join(', ')
        cssValues[transitionDuration] = duration + 's'
        cssValues[transitionDelay] = delay + 's'
        cssValues[transitionTiming] = (ease || 'linear')
      }
    }

    wrappedCallback = function(event){
      if (typeof event !== 'undefined') {
        if (event.target !== event.currentTarget) return // makes sure the event didn't bubble from "below"
        $(event.target).unbind(endEvent, wrappedCallback)
      } else
        $(this).unbind(endEvent, wrappedCallback) // triggered by setTimeout

      fired = true
      $(this).css(cssReset)
      callback && callback.call(this)
    }
    if (duration > 0){
      this.bind(endEvent, wrappedCallback)
      // transitionEnd is not always firing on older Android phones
      // so make sure it gets fired
      setTimeout(function(){
        if (fired) return
        wrappedCallback.call(that)
      }, ((duration + delay) * 1000) + 25)
    }

    // trigger page reflow so new elements can animate
    this.size() && this.get(0).clientLeft

    this.css(cssValues)

    if (duration <= 0) setTimeout(function() {
      that.each(function(){ wrappedCallback.call(this) })
    }, 0)

    return this
  }

  testEl = null
})(Zepto)

/**
 * @description offsetRelative
 * @class offsetRelative
 * @author yongjin<zjut_wyj@163.com> 2015/3/29
 */
;(function ($, undefined) {
  $.fn.offsetRelative = function (el) {
    var $el=$(el), o1=this.offset(), o2=$el.offset();
    o1.top  -= o2.top  - $el.scrollTop();
    o1.left -= o2.left - $el.scrollLeft();
    return o1;
  };
  $.fn.positionRelative = function (top) {
    return $(this).offsetRelative(top);
  };
})(Zepto);

var Clickable=function(c,b){function a(){a._enableClicking.apply(this,arguments)}a.touchable=function(){return a._os.touchable};a.sticky=function(){a._enableStickyClick.apply(this,arguments)};if(b&&b.fn){b.fn.clickable=function(d){this.each(function(){a._enableClicking(this,d)});return this};b.fn.stickyClick=function(d){this.each(function(){a._enableStickyClick(this,d)});return this}}if(c&&c.fn){c.extend(c.fn,{clickable:function(d){this.forEach(function(e){a._enableClicking(e,d)});return this},stickyClick:function(d){this.forEach(function(e){a._enableStickyClick(e,d)});return this}})}return a}(window.Zepto,window.jQuery);Clickable._os=function(f,d){var c,a,b;if(b=/\bCPU.*OS (\d+(_\d+)?)/i.exec(f)){c="ios";a=b[1].replace("_",".")}else{if(b=/\bAndroid (\d+(\.\d+)?)/.exec(f)){c="android";a=b[1]}}var e={name:c,version:a&&d(a),touchable:!!c};e[c]=true;return e}(navigator.userAgent,parseFloat);Clickable._trimString=function(a){var b=/^\s+|\s+$/g;return function(c){return a(c).replace(b,"")}}(String);Clickable._isDOMNode=function(a,b){return function(d){if(!d){return false}try{return(d instanceof a)||(d instanceof b)}catch(c){}if(typeof d!=="object"){return false}if(typeof d.nodeType!=="number"){return false}if(typeof d.nodeName!=="string"){return false}return true}}(Node,HTMLElement);Clickable._isInDOM=function(){return function(a){while(a=a.parentNode){if(a===document){return true}}return false}}();Clickable._bindEvents=function(){return function(c,b){for(var a in b){if(c.addEventListener){c.addEventListener(a,b[a],false)}else{if(c.attachEvent){c.attachEvent("on"+a,b[a])}}}}}();Clickable._unbindEvents=function(){return function(c,b){for(var a in b){if(c.removeEventListener){c.removeEventListener(a,b[a])}}}}();Clickable._addClass=function(){return function(b,a){b.className+=" "+a}}();Clickable._removeClass=function(a){return function(c,b){c.className=a(c.className.replace(new RegExp("\\b"+b+"\\b"),""))}}(Clickable._trimString);Clickable._enableClicking=function(h,o,a,f,c,k,n){var i="active",m="data-clickable-class",g=40;var p=false,l=!!h.ios;function b(L,O){if(!o(L)){throw TypeError("element "+L+" must be a DOM element")}if(L._clickable){return}L._clickable=true;switch(typeof O){case"undefined":O=i;break;case"string":break;default:throw TypeError("active class "+O+" must be a string")}var E=false,q=false,G,F,J,K,s;L.setAttribute(m,O);L.style["-webkit-tap-highlight-color"]="rgba(255,255,255,0)";v();return;function M(Q,R){E=true;J=+new Date();G=Q;F=R;K=j(L);if(K){s=K.scrollTop;K.addEventListener("scroll",A,true)}}function I(){if(K){K.removeEventListener("scroll",A)}K=null;s=null;G=null;F=null;E=false}function A(){B()}function P(){return E}function t(){k(L,O)}function r(){n(L,O)}function v(){f(L,{click:x});if(!h.touchable){f(L,{mousedown:C,mousemove:D,mouseout:D,mouseup:z});return}if(h.ios){f(L,{DOMNodeInsertedIntoDocument:N,DOMNodeRemovedFromDocument:y});if(a(L)){N()}}else{N()}}function N(){f(L,{touchstart:w,touchmove:H,touchcancel:B,touchend:u})}function y(){c(L,{touchstart:w,touchmove:H,touchcancel:B,touchend:u})}function x(Q){Q=Q||window.event;if(!L.disabled&&q){q=false;setTimeout(function(){p=false},0)}else{if(Q.stopImmediatePropagation){Q.stopImmediatePropagation()}Q.preventDefault();Q.stopPropagation();Q.cancelBubble=true;Q.returnValue=false;return false}}function C(Q){q=false;if(L.disabled||!e(Q.target,L)){Q.preventDefault();I();return}M(Q.clientX,Q.clientY);t()}function D(Q){Q.preventDefault();I();q=false;r()}function z(Q){if(L.disabled){Q.preventDefault();I();q=false;return}if(!P()){Q.preventDefault();q=false}else{q=true}I();r()}function w(Q){q=false;if(p||L.disabled||(Q.touches.length!==1)||!e(Q.target,L)){I();return}p=true;var R=Q.changedTouches[0];M(R.clientX,R.clientY);if(K){if(K._isScrolling||(s<0)||(K.scrollHeight<s)){I();return}}var R=J;setTimeout(function(){if(P()&&(R===J)){t()}},g)}function B(Q){q=false;I();if(Q){p=false}if(L.disabled){return}r()}function H(R){var Q=document.elementFromPoint(R.touches[0].pageX,R.touches[0].pageY);if(L!==Q){B(R)}}function u(V){var R=P(),S=K,T=s,Q=G,W=F;B();if(!R||L.disabled){p=false;return}if(S){if(S._isScrolling||(S.scrollTop!==T)){return}}if(!V.stopImmediatePropagation){q=true;return}var U=+new Date()-J;if(U>g){q=true;d(L,Q,W)}else{t();setTimeout(function(){r();q=true;d(L,Q,W)},1)}}}function e(r,q){do{if(r===q){return true}else{if(r._clickable){return false}}}while(r=r.parentNode);return false}function d(s,q,t){var r=document.createEvent("MouseEvents");r.initMouseEvent("click",true,true,window,1,q||0,t||0,q||0,t||0,false,false,false,false,0,null);s.dispatchEvent(r)}function j(q){if(!h.ios||(h.version<5)){return}while(q=q.parentNode){if(q._scrollable){if(q._iScroll){return}return q}}}return b}(Clickable._os,Clickable._isDOMNode,Clickable._isInDOM,Clickable._bindEvents,Clickable._unbindEvents,Clickable._addClass,Clickable._removeClass);Clickable._enableStickyClick=function(a,c,f){var d="data-clickable-class";function e(i,h,g){if(!c(i)){throw TypeError("button must be a DOM element, got "+i)}switch(typeof h){case"string":break;case"function":g=h;h=undefined;break;default:throw TypeError("button active class must be a string if defined, got "+h)}if(typeof g!=="function"){throw TypeError("sticky click handler must be a function, got "+g)}f(i,h);i.addEventListener("click",b(i,g),false)}function b(i,h){var j=false,g=i.getAttribute(d);return function(){if(j){return}j=true;var k=false,n;i.disabled=true;i.className+=" "+g;try{n=h.call(i,m)}catch(l){if(window.console&&window.console.error){if((typeof l==="object")&&l.stack){window.console.error(l.stack)}else{window.console.error(l+"")}}m()}if(n===false){m()}function m(){if(k){return}k=true;j=false;if(i.disabled){i.disabled=false;i.className=a(i.className.replace(new RegExp("\\b"+g+"\\b","g"),""))}}}}return e}(Clickable._trimString,Clickable._isDOMNode,Clickable._enableClicking);
var Swapper=function(c,b){function a(e,d,f,g){a._swapper(e,d,f,g)}if(c&&c.fn){c.extend(c.fn,{swapper:function(d,e,f){d=c(d)[0];this.forEach(function(g){a._swapper(g,d,e,f)});return this}})}if(b&&b.fn){b.fn.swapper=function(d,e,f){d=b(d)[0];this.each(function(){a._swapper(this,d,e,f)});return this}}return a}(window.Zepto,window.jQuery);Swapper._os=function(f,d){var c,a,b;if(b=/\bCPU.*OS (\d+(_\d+)?)/i.exec(f)){c="ios";a=b[1].replace("_",".")}else{if(b=/\bAndroid (\d+(\.\d+)?)/.exec(f)){c="android";a=b[1]}}var e={name:c,version:a&&d(a)};e[c]=true;return e}(navigator.userAgent,parseFloat);Swapper._isNode=function(a,b){return function(d){if(!d){return false}try{return(d instanceof a)||(d instanceof b)}catch(c){}if(typeof d!=="object"){return false}if(typeof d.nodeType!=="number"){return false}if(typeof d.nodeName!=="string"){return false}return true}}(Node,HTMLElement);Swapper._isInDOM=function(a){return function(c,b){if(!b&&!a(c)){throw TypeError("element must be a DOM node, got "+c)}while(c=c.parentNode){if(c===document){return true}}return false}}(Swapper._isNode);Swapper._insertBefore=function(){return function(a,b){b.parentNode.insertBefore(a,b)}}();Swapper._insertAfter=function(){return function(a,c){var b=c.parentNode;if(b.lastchild===c){b.appendChild(a)}else{b.insertBefore(a,c.nextSibling)}}}();Swapper._removeNode=function(){return function(a){if(a.parentNode){a.parentNode.removeChild(a)}}}();Swapper._setTransform=function(){return function(b,a){b.style["-webkit-transform"]=a;b.style["-moz-transform"]=a;b.style["-ms-transform"]=a;b.style["-o-transform"]=a;b.style.transform=a}}();Swapper._setTransition=function(){return function(a,b){if(b){a.style["-webkit-transition"]="-webkit-"+b;a.style["-moz-transition"]="-moz-"+b;a.style["-ms-transition"]="-ms-"+b;a.style["-o-transition"]="-o-"+b;a.style.transition=b}else{a.style["-webkit-transition"]="";a.style["-moz-transition"]="";a.style["-ms-transition"]="";a.style["-o-transition"]="";a.style.transition=""}}}();Swapper._getStyles=function(a){return function(c,d){var b;if(d){b=c.style}else{b=a.defaultView.getComputedStyle(c,null)}return{"-webkit-transition":b["-webkit-transition"],"-moz-transition":b["-moz-transition"],"-ms-transition":b["-ms-transition"],"-o-transition":b["-o-transition"],transition:b.transition,display:b.display,opacity:b.opacity,top:b.top,left:b.left,height:b.height,width:b.width,position:b.position}}}(document);Swapper._easings={linear:"linear",ease:"ease","ease-in":"ease-in","ease-out":"ease-out","ease-in-out":"ease-in-out","step-start":"step-start","step-end":"step-end"};Swapper._transitions={fade:[{fade:true},{fade:true}],"fade-on":[{fade:true},{}],"fade-off":[{},{fade:true},true],"scale-in":[{transform:"scale(0.01)"},{}],"scale-out":[{},{transform:"scale(0.01)"},true],"rotate-left":[{transform:"rotateY(-180deg) perspective(360px)",fade:true},{transform:"rotateY( 180deg) perspective(360px)",fade:true}],"rotate-right":[{transform:"rotateY( 180deg) perspective(360px)",fade:true},{transform:"rotateY(-180deg) perspective(360px)",fade:true}],"cube-left":[{transform:"translate3d( 50%,0,0) rotateY(-90deg) perspective(360px)"},{transform:"translate3d(-50%,0,0) rotateY( 90deg) perspective(360px)"}],"cube-right":[{transform:"translate3d(-50%,0,0) rotateY( 90deg) perspective(360px)"},{transform:"translate3d( 50%,0,0) rotateY(-90deg) perspective(360px)"}],"swap-left":[{transform:"translate3d( 65%,0,0) rotateY( 90deg) perspective(360px)"},{transform:"translate3d(-65%,0,0) rotateY(-90deg) perspective(360px)"}],"swap-right":[{transform:"translate3d(-65%,0,0) rotateY(-90deg) perspective(360px)"},{transform:"translate3d( 65%,0,0) rotateY( 90deg) perspective(360px)"}],"explode-in":[{fade:true,transform:"scale(1.25)"},{}],"explode-out":[{},{fade:true,transform:"scale(1.25)"},true],"implode-in":[{},{fade:true,transform:"scale(0.60)"},true],"implode-out":[{fade:true,transform:"scale(0.80)"},{}],"slide-left":[{transform:"translate3d( 100%,0,0)"},{transform:"translate3d(-100%,0,0)"}],"slide-right":[{transform:"translate3d(-100%,0,0)"},{transform:"translate3d( 100%,0,0)"}],"slide-up":[{transform:"translate3d(0, 100%,0)"},{transform:"translate3d(0,-100%,0)"}],"slide-down":[{transform:"translate3d(0,-100%,0)"},{transform:"translate3d(0, 100%,0)"}],"slideon-left":[{transform:"translate3d(-100%,0,0)"},{}],"slideoff-left":[{},{transform:"translate3d(-100%,0,0)"},true],"slideon-right":[{transform:"translate3d(100%,0,0)"},{}],"slideoff-right":[{},{transform:"translate3d(100%,0,0)"},true],"slideon-up":[{transform:"translate3d(0,-100%,0)"},{}],"slideoff-up":[{},{transform:"translate3d(0,-100%,0)"},true],"slideon-down":[{transform:"translate3d(0,100%,0)"},{}],"slideoff-down":[{},{transform:"translate3d(0,100%,0)"},true],"slideon-left-ios":[{transform:"translate3d(100%,0,0)"},{transform:"translate3d(-30%,0,0)"}],"slideoff-right-ios":[{transform:"translate3d(-30%,0,0)"},{transform:"translate3d(100%,0,0)"},true],"glideon-right":[{transform:"translate3d(110%,0,0)"},{transform:"translate3d(-20%,0,0)"}],"glideoff-right":[{transform:"translate3d(-20%,0,0)"},{transform:"translate3d(110%,0,0)"},true],"glideon-left":[{transform:"translate3d(-110%,0,0)"},{transform:"translate3d(20%,0,0)"}],"glideoff-left":[{transform:"translate3d(20%,0,0)"},{transform:"translate3d(-110%,0,0)"},true],"glideon-down":[{transform:"translate3d(0,110%,0)"},{transform:"translate3d(0,-20%,0)"}],"glideoff-down":[{transform:"translate3d(0,-20%,0)"},{transform:"translate3d(0,110%,0)"},true],"glideon-up":[{transform:"translate3d(0,-110%,0)"},{transform:"translate3d(0,20%,0)"}],"glideoff-up":[{transform:"translate3d(0,20%,0)"},{transform:"translate3d(0,-110%,0)"},true]};Swapper._validate=function(e,f,d){return{element:c,options:b,callback:a};function c(g){if(!e(g)){throw TypeError("element must be a DOM node, got "+g)}}function b(g){switch(typeof g){case"string":g={transition:g};break;case"undefined":g={};break;case"object":break;default:throw TypeError("options must be an object if defined, got "+g)}switch(typeof g.transition){case"string":if(!(g.transition in f)&&(g.transition!=="instant")){throw TypeError(g.transition+" is not a valid transition")}break;case"undefined":break;default:throw TypeError("transition must be a string if defined, got "+g.transition)}switch(typeof g.duration){case"number":if(g.duration<0){throw TypeError("duration must be a non-negative integer, got "+g.duration)}break;case"undefined":break;default:throw TypeError("duration must be a number if defined, got "+g.duration)}switch(typeof g.easing){case"string":if(!(g.easing in d)&&(g.easing.substr(0,13)!=="cubic-bezier(")){throw TypeError(g.easing+" is not a valid easing")}break;case"undefined":break;default:throw TypeError("easing must be a string if defined, got "+g.easing)}return g}function a(g){switch(typeof g){case"undefined":g=function(){};break;case"function":break;default:throw TypeError("callback must be a function if defined, got "+g)}return g}}(Swapper._isNode,Swapper._transitions,Swapper._easings);Swapper._swapper=function(k,w,f,e,A,x,g,h,j,D,l,q,m,s){var a="translate3d(0,0,0) scale(1)",E="fade",z="ease-in-out";var p=(k.ios&&(Math.floor(k.version)===5));function r(G,F,H,I){q.element(G);q.element(F);if(typeof H==="function"){I=H;H={}}H=q.options(H);I=q.callback(I);if(G._swapper){throw Error("elem1 is currently being swapped")}else{if(F._swapper){throw Error("elem2 is currently being swapped")}}if(!f(G,true)){throw Error("elem1 must be in the DOM to be swapped")}G._swapper=true;F._swapper=true;x(F);o(G,F,H,function(){G._swapper=false;F._swapper=false;I()})}function o(O,N,P,M){if(P.transition==="instant"){A(N,O);x(O);M();return}var L=D[P.transition||E],K=P.easing||z,J=P.duration||300;if(K.substr(0,13)!=="cubic-bezier("){K=l[K]}A(N,O);var I=j(O),H=j(N),G=j(O,true),F=j(N,true);C(O,N,I,H);if(L[2]){e(N,O)}N.style.opacity="0";u(O,N);setTimeout(function(){N.style.opacity=H.opacity;b(O,N,L);setTimeout(function(){n(O,N,J,K);setTimeout(function(){y(O,N,L);B(O,N,I,H,L,J,function(){x(O);t(O,N,J,K);setTimeout(function(){v(O,N,G,F,L);d(O,N,G,F);setTimeout(function(){c(O,N,G,F);M()},0)},0)})},0)},0)},0)}function C(G,F,I,H){var J=G.getBoundingClientRect();if(I.display!=="none"){if(p){F.style.position="absolute"}else{F.style.position="fixed"}F.style.top=J.top+"px";F.style.left=J.left+"px"}F.style.height=H.height||I.height;F.style.width=H.width||I.width}function d(G,F,I,H){F.style.position=H.position;F.style.top=H.top;F.style.left=H.left;F.style.height=H.height;F.style.width=H.width}function b(G,F,H){g(G,a);g(F,H[0].transform||a);if(H[0].fade){F.style.opacity="0"}if(H[1].fade){G.style.opacity="1"}}function y(G,F,H){g(G,H[1].transform||a);g(F,a);if(H[0].fade){F.style.opacity="1"}if(H[1].fade){G.style.opacity="0"}}function v(G,F,I,H,J){g(G,"");g(F,"");if(J[0].fade){F.style.opacity=H.opacity}if(J[1].fade){G.style.opacity=I.opacity}}function n(G,F,H,J){var I="transform "+(H/1000)+"s "+J+",opacity "+(H/1000)+"s "+J;h(G,I);h(F,I)}function t(G,F,H,I){h(G,"");h(F,"")}function u(G,F){h(G,"");h(F,"")}function c(G,F,I,H){G.style["-webkit-transition"]=I["-webkit-transition"];G.style["-moz-transition"]=I["-moz-transition"];G.style["-ms-transition"]=I["-ms-transition"];G.style["-o-transition"]=I["-o-transition"];G.style.transition=I.transition;F.style["-webkit-transition"]=H["-webkit-transition"];F.style["-moz-transition"]=H["-moz-transition"];F.style["-ms-transition"]=H["-ms-transition"];F.style["-o-transition"]=H["-o-transition"];F.style.transition=H.transition}function i(F,G){if(F.display==="none"){return false}if(G.fade){return true}if(!G.transform){return false}else{if(G.transform===a){return false}else{return true}}}function B(Q,N,H,F,K,I,M){var G;if(i(F,K[0])){G=N;P()}else{if(i(H,K[1])){G=Q;P()}else{setTimeout(L,I)}}function P(){G.addEventListener("webkitTransitionEnd",L,false);G.addEventListener("transitionend",L,false);G.addEventListener("oTransitionEnd",L,false);G.addEventListener("otransitionend",L,false);G.addEventListener("MSTransitionEnd",L,false);G.addEventListener("transitionend",L,false)}function O(){G.removeEventListener("webkitTransitionEnd",L);G.removeEventListener("transitionend",L);G.removeEventListener("oTransitionEnd",L);G.removeEventListener("otransitionend",L);G.removeEventListener("MSTransitionEnd",L);G.removeEventListener("transitionend",L)}var J=false;function L(R){if(J||(R&&R.target&&(R.target!==G))){return}J=true;if(G){O()}M()}}return r}(Swapper._os,Swapper._isNode,Swapper._isInDOM,Swapper._insertBefore,Swapper._insertAfter,Swapper._removeNode,Swapper._setTransform,Swapper._setTransition,Swapper._getStyles,Swapper._transitions,Swapper._easings,Swapper._validate,window,document);

var iScroll = function (an, Z) {
  function ah(f) {
    if ("" === am) {
      return f
    }
    f = f.charAt(0).toUpperCase() + f.substr(1);
    return am + f
  }

  var ao = Math, P = Z.createElement("div").style, am;
  a:{
    for (var aj = ["t", "webkitT", "MozT", "msT", "OT"], Y, X = 0, k = aj.length; X < k; X++) {
      if (Y = aj[X] + "ransform", Y in P) {
        am = aj[X].substr(0, aj[X].length - 1);
        break a
      }
    }
    am = !1
  }
  var ak = am ? "-" + am.toLowerCase() + "-" : "", ai = ah("transform"), g = ah("transitionProperty"), ad = ah("transitionDuration"), e = ah("transformOrigin"), d = ah("transitionTimingFunction"), i = ah("transitionDelay"), ag = /android/gi.test(navigator.appVersion), W = /iphone|ipad/gi.test(navigator.appVersion), aj = /hp-tablet/gi.test(navigator.appVersion), V = ah("perspective") in P, al = "ontouchstart" in an && !aj, T = !!am, c = ah("transition") in P, af = "onorientationchange" in an ? "orientationchange" : "resize", ac = al ? "touchstart" : "mousedown", U = al ? "touchmove" : "mousemove", S = al ? "touchend" : "mouseup", R = al ? "touchcancel" : "mouseup", ab = "Moz" == am ? "DOMMouseScroll" : "mousewheel", aa;
  aa = !1 === am ? !1 : {"": "transitionend", webkit: "webkitTransitionEnd", Moz: "transitionend", O: "oTransitionEnd", ms: "MSTransitionEnd"}[am];
  var b = an.requestAnimationFrame || an.webkitRequestAnimationFrame || an.mozRequestAnimationFrame || an.oRequestAnimationFrame || an.msRequestAnimationFrame || function (f) {
    return setTimeout(f, 1)
  }, Q = an.cancelRequestAnimationFrame || an.webkitCancelAnimationFrame || an.webkitCancelRequestAnimationFrame || an.mozCancelRequestAnimationFrame || an.oCancelRequestAnimationFrame || an.msCancelRequestAnimationFrame || clearTimeout, ae = V ? " translateZ(0)" : "", aj = function (f, h) {
    var l = this, j;
    l.wrapper = "object" == typeof f ? f : Z.getElementById(f);
    l.wrapper.style.overflow = "hidden";
    l.scroller = l.wrapper.children[0];
    l.options = {hScroll: !0, vScroll: !0, x: 0, y: 0, bounce: !0, bounceLock: !1, momentum: !0, lockDirection: !0, useTransform: !0, useTransition: !1, topOffset: 0, checkDOMChanges: !1, handleClick: !0, hScrollbar: !0, vScrollbar: !0, fixedScrollbar: ag, hideScrollbar: W, fadeScrollbar: W && V, scrollbarClass: "", zoom: !1, zoomMin: 1, zoomMax: 4, doubleTapZoom: 2, wheelAction: "scroll", snap: !1, snapThreshold: 1, onRefresh: null, onBeforeScrollStart: function (m) {
      m.preventDefault()
    }, onScrollStart: null, onBeforeScrollMove: null, onScrollMove: null, onBeforeScrollEnd: null, onScrollEnd: null, onTouchEnd: null, onDestroy: null, onZoomStart: null, onZoom: null, onZoomEnd: null};
    for (j in h) {
      l.options[j] = h[j]
    }
    l.x = l.options.x;
    l.y = l.options.y;
    l.options.useTransform = T && l.options.useTransform;
    l.options.hScrollbar = l.options.hScroll && l.options.hScrollbar;
    l.options.vScrollbar = l.options.vScroll && l.options.vScrollbar;
    l.options.zoom = l.options.useTransform && l.options.zoom;
    l.options.useTransition = c && l.options.useTransition;
    l.options.zoom && ag && (ae = "");
    l.scroller.style[g] = l.options.useTransform ? ak + "transform" : "top left";
    l.scroller.style[ad] = "0";
    l.scroller.style[e] = "0 0";
    l.options.useTransition && (l.scroller.style[d] = "cubic-bezier(0.33,0.66,0.66,1)");
    l.options.useTransform ? l.scroller.style[ai] = "translate(" + l.x + "px," + l.y + "px)" + ae : l.scroller.style.cssText += ";position:absolute;top:" + l.y + "px;left:" + l.x + "px";
    l.options.useTransition && (l.options.fixedScrollbar = !0);
    l.refresh();
    l._bind(af, an);
    l._bind(ac);
    al || (l._bind("mouseout", l.wrapper), "none" != l.options.wheelAction && l._bind(ab));
    l.options.checkDOMChanges && (l.checkDOMTime = setInterval(function () {
      l._checkDOMChanges()
    }, 500))
  };
  aj.prototype = {enabled: !0, x: 0, y: 0, steps: [], scale: 1, currPageX: 0, currPageY: 0, pagesX: [], pagesY: [], aniTime: null, wheelZoomCount: 0, handleEvent: function (f) {
    switch (f.type) {
      case ac:
        if (!al && 0 !== f.button) {
          break
        }
        this._start(f);
        break;
      case U:
        this._move(f);
        break;
      case S:
      case R:
        this._end(f);
        break;
      case af:
        this._resize();
        break;
      case ab:
        this._wheel(f);
        break;
      case"mouseout":
        this._mouseout(f);
        break;
      case aa:
        this._transitionEnd(f)
    }
  }, _checkDOMChanges: function () {
    !this.moved && (!this.zoomed && !(this.animating || this.scrollerW == this.scroller.offsetWidth * this.scale && this.scrollerH == this.scroller.offsetHeight * this.scale)) && this.refresh()
  }, _scrollbar: function (f) {
    var h;
    this[f + "Scrollbar"] ? (this[f + "ScrollbarWrapper"] || (h = Z.createElement("div"), this.options.scrollbarClass ? h.className = this.options.scrollbarClass + f.toUpperCase() : h.style.cssText = "position:absolute;z-index:100;" + ("h" == f ? "height:7px;bottom:1px;left:2px;right:" + (this.vScrollbar ? "7" : "2") + "px" : "width:7px;bottom:" + (this.hScrollbar ? "7" : "2") + "px;top:2px;right:1px"), h.style.cssText += ";pointer-events:none;" + ak + "transition-property:opacity;" + ak + "transition-duration:" + (this.options.fadeScrollbar ? "350ms" : "0") + ";overflow:hidden;opacity:" + (this.options.hideScrollbar ? "0" : "1"), this.wrapper.appendChild(h), this[f + "ScrollbarWrapper"] = h, h = Z.createElement("div"), this.options.scrollbarClass || (h.style.cssText = "position:absolute;z-index:100;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);" + ak + "background-clip:padding-box;" + ak + "box-sizing:border-box;" + ("h" == f ? "height:100%" : "width:100%") + ";" + ak + "border-radius:3px;border-radius:3px"), h.style.cssText += ";pointer-events:none;" + ak + "transition-property:" + ak + "transform;" + ak + "transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);" + ak + "transition-duration:0;" + ak + "transform: translate(0,0)" + ae, this.options.useTransition && (h.style.cssText += ";" + ak + "transition-timing-function:cubic-bezier(0.33,0.66,0.66,1)"), this[f + "ScrollbarWrapper"].appendChild(h), this[f + "ScrollbarIndicator"] = h), "h" == f ? (this.hScrollbarSize = this.hScrollbarWrapper.clientWidth, this.hScrollbarIndicatorSize = ao.max(ao.round(this.hScrollbarSize * this.hScrollbarSize / this.scrollerW), 8), this.hScrollbarIndicator.style.width = this.hScrollbarIndicatorSize + "px", this.hScrollbarMaxScroll = this.hScrollbarSize - this.hScrollbarIndicatorSize, this.hScrollbarProp = this.hScrollbarMaxScroll / this.maxScrollX) : (this.vScrollbarSize = this.vScrollbarWrapper.clientHeight, this.vScrollbarIndicatorSize = ao.max(ao.round(this.vScrollbarSize * this.vScrollbarSize / this.scrollerH), 8), this.vScrollbarIndicator.style.height = this.vScrollbarIndicatorSize + "px", this.vScrollbarMaxScroll = this.vScrollbarSize - this.vScrollbarIndicatorSize, this.vScrollbarProp = this.vScrollbarMaxScroll / this.maxScrollY), this._scrollbarPos(f, !0)) : this[f + "ScrollbarWrapper"] && (T && (this[f + "ScrollbarIndicator"].style[ai] = ""), this[f + "ScrollbarWrapper"].parentNode.removeChild(this[f + "ScrollbarWrapper"]), this[f + "ScrollbarWrapper"] = null, this[f + "ScrollbarIndicator"] = null)
  }, _resize: function () {
    var f = this;
    setTimeout(function () {
      f.refresh()
    }, ag ? 200 : 0)
  }, _pos: function (f, h) {
    this.zoomed || (f = this.hScroll ? f : 0, h = this.vScroll ? h : 0, this.options.useTransform ? this.scroller.style[ai] = "translate(" + f + "px," + h + "px) scale(" + this.scale + ")" + ae : (f = ao.round(f), h = ao.round(h), this.scroller.style.left = f + "px", this.scroller.style.top = h + "px"), this.x = f, this.y = h, this._scrollbarPos("h"), this._scrollbarPos("v"))
  }, _scrollbarPos: function (f, h) {
    var j = "h" == f ? this.x : this.y;
    this[f + "Scrollbar"] && (j *= this[f + "ScrollbarProp"], 0 > j ? (this.options.fixedScrollbar || (j = this[f + "ScrollbarIndicatorSize"] + ao.round(3 * j), 8 > j && (j = 8), this[f + "ScrollbarIndicator"].style["h" == f ? "width" : "height"] = j + "px"), j = 0) : j > this[f + "ScrollbarMaxScroll"] && (this.options.fixedScrollbar ? j = this[f + "ScrollbarMaxScroll"] : (j = this[f + "ScrollbarIndicatorSize"] - ao.round(3 * (j - this[f + "ScrollbarMaxScroll"])), 8 > j && (j = 8), this[f + "ScrollbarIndicator"].style["h" == f ? "width" : "height"] = j + "px", j = this[f + "ScrollbarMaxScroll"] + (this[f + "ScrollbarIndicatorSize"] - j))), this[f + "ScrollbarWrapper"].style[i] = "0", this[f + "ScrollbarWrapper"].style.opacity = h && this.options.hideScrollbar ? "0" : "1", this[f + "ScrollbarIndicator"].style[ai] = "translate(" + ("h" == f ? j + "px,0)" : "0," + j + "px)") + ae)
  }, _start: function (f) {
    var h = al ? f.touches[0] : f, l, j;
    if (this.enabled) {
      this.options.onBeforeScrollStart && this.options.onBeforeScrollStart.call(this, f);
      (this.options.useTransition || this.options.zoom) && this._transitionTime(0);
      this.zoomed = this.animating = this.moved = !1;
      this.dirY = this.dirX = this.absDistY = this.absDistX = this.distY = this.distX = 0;
      this.options.zoom && (al && 1 < f.touches.length) && (j = ao.abs(f.touches[0].pageX - f.touches[1].pageX), l = ao.abs(f.touches[0].pageY - f.touches[1].pageY), this.touchesDistStart = ao.sqrt(j * j + l * l), this.originX = ao.abs(f.touches[0].pageX + f.touches[1].pageX - 2 * this.wrapperOffsetLeft) / 2 - this.x, this.originY = ao.abs(f.touches[0].pageY + f.touches[1].pageY - 2 * this.wrapperOffsetTop) / 2 - this.y, this.options.onZoomStart && this.options.onZoomStart.call(this, f));
      if (this.options.momentum && (this.options.useTransform ? (l = getComputedStyle(this.scroller, null)[ai].replace(/[^0-9\-.,]/g, "").split(","), j = 1 * l[4], l = 1 * l[5]) : (j = 1 * getComputedStyle(this.scroller, null).left.replace(/[^0-9-]/g, ""), l = 1 * getComputedStyle(this.scroller, null).top.replace(/[^0-9-]/g, "")), j != this.x || l != this.y)) {
        this.options.useTransition ? this._unbind(aa) : Q(this.aniTime), this.steps = [], this._pos(j, l)
      }
      this.absStartX = this.x;
      this.absStartY = this.y;
      this.startX = this.x;
      this.startY = this.y;
      this.pointX = h.pageX;
      this.pointY = h.pageY;
      this.startTime = f.timeStamp || Date.now();
      this.options.onScrollStart && this.options.onScrollStart.call(this, f);
      this._bind(U);
      this._bind(S);
      this._bind(R)
    }
  }, _move: function (f) {
    var h = al ? f.touches[0] : f, o = h.pageX - this.pointX, n = h.pageY - this.pointY, m = this.x + o, l = this.y + n, j = f.timeStamp || Date.now();
    this.options.onBeforeScrollMove && this.options.onBeforeScrollMove.call(this, f);
    if (this.options.zoom && al && 1 < f.touches.length) {
      m = ao.abs(f.touches[0].pageX - f.touches[1].pageX), l = ao.abs(f.touches[0].pageY - f.touches[1].pageY), this.touchesDist = ao.sqrt(m * m + l * l), this.zoomed = !0, h = 1 / this.touchesDistStart * this.touchesDist * this.scale, h < this.options.zoomMin ? h = 0.5 * this.options.zoomMin * Math.pow(2, h / this.options.zoomMin) : h > this.options.zoomMax && (h = 2 * this.options.zoomMax * Math.pow(0.5, this.options.zoomMax / h)), this.lastScale = h / this.scale, m = this.originX - this.originX * this.lastScale + this.x, l = this.originY - this.originY * this.lastScale + this.y, this.scroller.style[ai] = "translate(" + m + "px," + l + "px) scale(" + h + ")" + ae, this.options.onZoom && this.options.onZoom.call(this, f)
    } else {
      this.pointX = h.pageX;
      this.pointY = h.pageY;
      if (0 < m || m < this.maxScrollX) {
        m = this.options.bounce ? this.x + o / 2 : 0 <= m || 0 <= this.maxScrollX ? 0 : this.maxScrollX
      }
      if (l > this.minScrollY || l < this.maxScrollY) {
        l = this.options.bounce ? this.y + n / 2 : l >= this.minScrollY || 0 <= this.maxScrollY ? this.minScrollY : this.maxScrollY
      }
      this.distX += o;
      this.distY += n;
      this.absDistX = ao.abs(this.distX);
      this.absDistY = ao.abs(this.distY);
      6 > this.absDistX && 6 > this.absDistY || (this.options.lockDirection && (this.absDistX > this.absDistY + 5 ? (l = this.y, n = 0) : this.absDistY > this.absDistX + 5 && (m = this.x, o = 0)), this.moved = !0, this._pos(m, l), this.dirX = 0 < o ? -1 : 0 > o ? 1 : 0, this.dirY = 0 < n ? -1 : 0 > n ? 1 : 0, 300 < j - this.startTime && (this.startTime = j, this.startX = this.x, this.startY = this.y), this.options.onScrollMove && this.options.onScrollMove.call(this, f))
    }
  }, _end: function (s) {
    if (!(al && 0 !== s.touches.length)) {
      var t = this, r = al ? s.changedTouches[0] : s, q, p, o = {dist: 0, time: 0}, m = {dist: 0, time: 0}, n = (s.timeStamp || Date.now()) - t.startTime, f = t.x, l = t.y;
      t._unbind(U);
      t._unbind(S);
      t._unbind(R);
      t.options.onBeforeScrollEnd && t.options.onBeforeScrollEnd.call(t, s);
      if (t.zoomed) {
        f = t.scale * t.lastScale, f = Math.max(t.options.zoomMin, f), f = Math.min(t.options.zoomMax, f), t.lastScale = f / t.scale, t.scale = f, t.x = t.originX - t.originX * t.lastScale + t.x, t.y = t.originY - t.originY * t.lastScale + t.y, t.scroller.style[ad] = "200ms", t.scroller.style[ai] = "translate(" + t.x + "px," + t.y + "px) scale(" + t.scale + ")" + ae, t.zoomed = !1, t.refresh(), t.options.onZoomEnd && t.options.onZoomEnd.call(t, s)
      } else {
        if (t.moved) {
          if (300 > n && t.options.momentum) {
            o = f ? t._momentum(f - t.startX, n, -t.x, t.scrollerW - t.wrapperW + t.x, t.options.bounce ? t.wrapperW : 0) : o;
            m = l ? t._momentum(l - t.startY, n, -t.y, 0 > t.maxScrollY ? t.scrollerH - t.wrapperH + t.y - t.minScrollY : 0, t.options.bounce ? t.wrapperH : 0) : m;
            f = t.x + o.dist;
            l = t.y + m.dist;
            if (0 < t.x && 0 < f || t.x < t.maxScrollX && f < t.maxScrollX) {
              o = {dist: 0, time: 0}
            }
            if (t.y > t.minScrollY && l > t.minScrollY || t.y < t.maxScrollY && l < t.maxScrollY) {
              m = {dist: 0, time: 0}
            }
          }
          o.dist || m.dist ? (o = ao.max(ao.max(o.time, m.time), 10), t.options.snap && (m = f - t.absStartX, n = l - t.absStartY, ao.abs(m) < t.options.snapThreshold && ao.abs(n) < t.options.snapThreshold ? t.scrollTo(t.absStartX, t.absStartY, 200) : (m = t._snap(f, l), f = m.x, l = m.y, o = ao.max(m.time, o))), t.scrollTo(ao.round(f), ao.round(l), o)) : t.options.snap ? (m = f - t.absStartX, n = l - t.absStartY, ao.abs(m) < t.options.snapThreshold && ao.abs(n) < t.options.snapThreshold ? t.scrollTo(t.absStartX, t.absStartY, 200) : (m = t._snap(t.x, t.y), (m.x != t.x || m.y != t.y) && t.scrollTo(m.x, m.y, m.time))) : t._resetPos(200)
        } else {
          al && (t.doubleTapTimer && t.options.zoom ? (clearTimeout(t.doubleTapTimer), t.doubleTapTimer = null, t.options.onZoomStart && t.options.onZoomStart.call(t, s), t.zoom(t.pointX, t.pointY, 1 == t.scale ? t.options.doubleTapZoom : 1), t.options.onZoomEnd && setTimeout(function () {
            t.options.onZoomEnd.call(t, s)
          }, 200)) : this.options.handleClick && (t.doubleTapTimer = setTimeout(function () {
            t.doubleTapTimer = null;
            for (q = r.target; 1 != q.nodeType;) {
              q = q.parentNode
            }
            "SELECT" != q.tagName && ("INPUT" != q.tagName && "TEXTAREA" != q.tagName) && (p = Z.createEvent("MouseEvents"), p.initMouseEvent("click", !0, !0, s.view, 1, r.screenX, r.screenY, r.clientX, r.clientY, s.ctrlKey, s.altKey, s.shiftKey, s.metaKey, 0, null), p._fake = !0, q.dispatchEvent(p))
          }, t.options.zoom ? 250 : 0))), t._resetPos(200)
        }
        t.options.onTouchEnd && t.options.onTouchEnd.call(t, s)
      }
    }
  }, _resetPos: function (f) {
    var h = 0 <= this.x ? 0 : this.x < this.maxScrollX ? this.maxScrollX : this.x, j = this.y >= this.minScrollY || 0 < this.maxScrollY ? this.minScrollY : this.y < this.maxScrollY ? this.maxScrollY : this.y;
    if (h == this.x && j == this.y) {
      if (this.moved && (this.moved = !1, this.options.onScrollEnd && this.options.onScrollEnd.call(this)), this.hScrollbar && this.options.hideScrollbar && ("webkit" == am && (this.hScrollbarWrapper.style[i] = "300ms"), this.hScrollbarWrapper.style.opacity = "0"), this.vScrollbar && this.options.hideScrollbar) {
        "webkit" == am && (this.vScrollbarWrapper.style[i] = "300ms"), this.vScrollbarWrapper.style.opacity = "0"
      }
    } else {
      this.scrollTo(h, j, f || 0)
    }
  }, _wheel: function (f) {
    var h = this, l, j;
    if ("wheelDeltaX" in f) {
      l = f.wheelDeltaX / 12, j = f.wheelDeltaY / 12
    } else {
      if ("wheelDelta" in f) {
        l = j = f.wheelDelta / 12
      } else {
        if ("detail" in f) {
          l = j = 3 * -f.detail
        } else {
          return
        }
      }
    }
    if ("zoom" == h.options.wheelAction) {
      if (j = h.scale * Math.pow(2, 1 / 3 * (j ? j / Math.abs(j) : 0)), j < h.options.zoomMin && (j = h.options.zoomMin), j > h.options.zoomMax && (j = h.options.zoomMax), j != h.scale) {
        !h.wheelZoomCount && h.options.onZoomStart && h.options.onZoomStart.call(h, f), h.wheelZoomCount++, h.zoom(f.pageX, f.pageY, j, 400), setTimeout(function () {
          h.wheelZoomCount--;
          !h.wheelZoomCount && h.options.onZoomEnd && h.options.onZoomEnd.call(h, f)
        }, 400)
      }
    } else {
      l = h.x + l, j = h.y + j, 0 < l ? l = 0 : l < h.maxScrollX && (l = h.maxScrollX), j > h.minScrollY ? j = h.minScrollY : j < h.maxScrollY && (j = h.maxScrollY), 0 > h.maxScrollY && h.scrollTo(l, j, 0)
    }
  }, _mouseout: function (f) {
    var h = f.relatedTarget;
    if (h) {
      for (; h = h.parentNode;) {
        if (h == this.wrapper) {
          return
        }
      }
    }
    this._end(f)
  }, _transitionEnd: function (f) {
    f.target == this.scroller && (this._unbind(aa), this._startAni())
  }, _startAni: function () {
    var f = this, h = f.x, o = f.y, n = Date.now(), m, l, j;
    f.animating || (f.steps.length ? (m = f.steps.shift(), m.x == h && m.y == o && (m.time = 0), f.animating = !0, f.moved = !0, f.options.useTransition) ? (f._transitionTime(m.time), f._pos(m.x, m.y), f.animating = !1, m.time ? f._bind(aa) : f._resetPos(0)) : (j = function () {
      var q = Date.now(), p;
      if (q >= n + m.time) {
        f._pos(m.x, m.y);
        f.animating = false;
        f.options.onAnimationEnd && f.options.onAnimationEnd.call(f);
        f._startAni()
      } else {
        q = (q - n) / m.time - 1;
        l = ao.sqrt(1 - q * q);
        q = (m.x - h) * l + h;
        p = (m.y - o) * l + o;
        f._pos(q, p);
        if (f.animating) {
          f.aniTime = b(j)
        }
      }
    }, j()) : f._resetPos(400))
  }, _transitionTime: function (f) {
    f += "ms";
    this.scroller.style[ad] = f;
    this.hScrollbar && (this.hScrollbarIndicator.style[ad] = f);
    this.vScrollbar && (this.vScrollbarIndicator.style[ad] = f)
  }, _momentum: function (f, h, n, m, l) {
    var h = ao.abs(f) / h, j = h * h / 0.0012;
    0 < f && j > n ? (n += l / (6 / (0.0006 * (j / h))), h = h * n / j, j = n) : 0 > f && j > m && (m += l / (6 / (0.0006 * (j / h))), h = h * m / j, j = m);
    return{dist: j * (0 > f ? -1 : 1), time: ao.round(h / 0.0006)}
  }, _offset: function (f) {
    for (var h = -f.offsetLeft, j = -f.offsetTop; f = f.offsetParent;) {
      h -= f.offsetLeft, j -= f.offsetTop
    }
    f != this.wrapper && (h *= this.scale, j *= this.scale);
    return{left: h, top: j}
  }, _snap: function (f, h) {
    var m, l, j;
    j = this.pagesX.length - 1;
    m = 0;
    for (l = this.pagesX.length; m < l; m++) {
      if (f >= this.pagesX[m]) {
        j = m;
        break
      }
    }
    j == this.currPageX && (0 < j && 0 > this.dirX) && j--;
    f = this.pagesX[j];
    l = (l = ao.abs(f - this.pagesX[this.currPageX])) ? 500 * (ao.abs(this.x - f) / l) : 0;
    this.currPageX = j;
    j = this.pagesY.length - 1;
    for (m = 0; m < j; m++) {
      if (h >= this.pagesY[m]) {
        j = m;
        break
      }
    }
    j == this.currPageY && (0 < j && 0 > this.dirY) && j--;
    h = this.pagesY[j];
    m = (m = ao.abs(h - this.pagesY[this.currPageY])) ? 500 * (ao.abs(this.y - h) / m) : 0;
    this.currPageY = j;
    j = ao.round(ao.max(l, m)) || 200;
    return{x: f, y: h, time: j}
  }, _bind: function (f, h, j) {
    (h || this.scroller).addEventListener(f, this, !!j)
  }, _unbind: function (f, h, j) {
    (h || this.scroller).removeEventListener(f, this, !!j)
  }, destroy: function () {
    this.scroller.style[ai] = "";
    this.vScrollbar = this.hScrollbar = !1;
    this._scrollbar("h");
    this._scrollbar("v");
    this._unbind(af, an);
    this._unbind(ac);
    this._unbind(U);
    this._unbind(S);
    this._unbind(R);
    this.options.hasTouch || (this._unbind("mouseout", this.wrapper), this._unbind(ab));
    this.options.useTransition && this._unbind(aa);
    this.options.checkDOMChanges && clearInterval(this.checkDOMTime);
    this.options.onDestroy && this.options.onDestroy.call(this)
  }, refresh: function () {
    var f, h, l, j = 0;
    h = 0;
    this.scale < this.options.zoomMin && (this.scale = this.options.zoomMin);
    this.wrapperW = this.wrapper.clientWidth || 1;
    this.wrapperH = this.wrapper.clientHeight || 1;
    this.minScrollY = -this.options.topOffset || 0;
    this.scrollerW = ao.round(this.scroller.offsetWidth * this.scale);
    this.scrollerH = ao.round((this.scroller.offsetHeight + this.minScrollY) * this.scale);
    this.maxScrollX = this.wrapperW - this.scrollerW;
    this.maxScrollY = this.wrapperH - this.scrollerH + this.minScrollY;
    this.dirY = this.dirX = 0;
    this.options.onRefresh && this.options.onRefresh.call(this);
    this.hScroll = this.options.hScroll && 0 > this.maxScrollX;
    this.vScroll = this.options.vScroll && (!this.options.bounceLock && !this.hScroll || this.scrollerH > this.wrapperH);
    this.hScrollbar = this.hScroll && this.options.hScrollbar;
    this.vScrollbar = this.vScroll && this.options.vScrollbar && this.scrollerH > this.wrapperH;
    f = this._offset(this.wrapper);
    this.wrapperOffsetLeft = -f.left;
    this.wrapperOffsetTop = -f.top;
    if ("string" == typeof this.options.snap) {
      this.pagesX = [];
      this.pagesY = [];
      l = this.scroller.querySelectorAll(this.options.snap);
      f = 0;
      for (h = l.length; f < h; f++) {
        j = this._offset(l[f]), j.left += this.wrapperOffsetLeft, j.top += this.wrapperOffsetTop, this.pagesX[f] = j.left < this.maxScrollX ? this.maxScrollX : j.left * this.scale, this.pagesY[f] = j.top < this.maxScrollY ? this.maxScrollY : j.top * this.scale
      }
    } else {
      if (this.options.snap) {
        for (this.pagesX = []; j >= this.maxScrollX;) {
          this.pagesX[h] = j, j -= this.wrapperW, h++
        }
        this.maxScrollX % this.wrapperW && (this.pagesX[this.pagesX.length] = this.maxScrollX - this.pagesX[this.pagesX.length - 1] + this.pagesX[this.pagesX.length - 1]);
        h = j = 0;
        for (this.pagesY = []; j >= this.maxScrollY;) {
          this.pagesY[h] = j, j -= this.wrapperH, h++
        }
        this.maxScrollY % this.wrapperH && (this.pagesY[this.pagesY.length] = this.maxScrollY - this.pagesY[this.pagesY.length - 1] + this.pagesY[this.pagesY.length - 1])
      }
    }
    this._scrollbar("h");
    this._scrollbar("v");
    this.zoomed || (this.scroller.style[ad] = "0", this._resetPos(200))
  }, scrollTo: function (f, h, m, l) {
    var j = f;
    this.stop();
    j.length || (j = [
      {x: f, y: h, time: m, relative: l}
    ]);
    f = 0;
    for (h = j.length; f < h; f++) {
      j[f].relative && (j[f].x = this.x - j[f].x, j[f].y = this.y - j[f].y), this.steps.push({x: j[f].x, y: j[f].y, time: j[f].time || 0})
    }
    this._startAni()
  }, scrollToElement: function (f, h) {
    var j;
    if (f = f.nodeType ? f : this.scroller.querySelector(f)) {
      j = this._offset(f), j.left += this.wrapperOffsetLeft, j.top += this.wrapperOffsetTop, j.left = 0 < j.left ? 0 : j.left < this.maxScrollX ? this.maxScrollX : j.left, j.top = j.top > this.minScrollY ? this.minScrollY : j.top < this.maxScrollY ? this.maxScrollY : j.top, h = void 0 === h ? ao.max(2 * ao.abs(j.left), 2 * ao.abs(j.top)) : h, this.scrollTo(j.left, j.top, h)
    }
  }, scrollToPage: function (f, h, j) {
    j = void 0 === j ? 400 : j;
    this.options.onScrollStart && this.options.onScrollStart.call(this);
    if (this.options.snap) {
      f = "next" == f ? this.currPageX + 1 : "prev" == f ? this.currPageX - 1 : f, h = "next" == h ? this.currPageY + 1 : "prev" == h ? this.currPageY - 1 : h, f = 0 > f ? 0 : f > this.pagesX.length - 1 ? this.pagesX.length - 1 : f, h = 0 > h ? 0 : h > this.pagesY.length - 1 ? this.pagesY.length - 1 : h, this.currPageX = f, this.currPageY = h, f = this.pagesX[f], h = this.pagesY[h]
    } else {
      if (f *= -this.wrapperW, h *= -this.wrapperH, f < this.maxScrollX && (f = this.maxScrollX), h < this.maxScrollY) {
        h = this.maxScrollY
      }
    }
    this.scrollTo(f, h, j)
  }, disable: function () {
    this.stop();
    this._resetPos(0);
    this.enabled = !1;
    this._unbind(U);
    this._unbind(S);
    this._unbind(R)
  }, enable: function () {
    this.enabled = !0
  }, stop: function () {
    this.options.useTransition ? this._unbind(aa) : Q(this.aniTime);
    this.steps = [];
    this.animating = this.moved = !1
  }, zoom: function (f, h, m, l) {
    var j = m / this.scale;
    this.options.useTransform && (this.zoomed = !0, l = void 0 === l ? 200 : l, f = f - this.wrapperOffsetLeft - this.x, h = h - this.wrapperOffsetTop - this.y, this.x = f - f * j + this.x, this.y = h - h * j + this.y, this.scale = m, this.refresh(), this.x = 0 < this.x ? 0 : this.x < this.maxScrollX ? this.maxScrollX : this.x, this.y = this.y > this.minScrollY ? this.minScrollY : this.y < this.maxScrollY ? this.maxScrollY : this.y, this.scroller.style[ad] = l + "ms", this.scroller.style[ai] = "translate(" + this.x + "px," + this.y + "px) scale(" + m + ")" + ae, this.zoomed = !1)
  }, isReady: function () {
    return !this.moved && !this.zoomed && !this.animating
  }};
  P = null;
  return aj
}(window, document);
var Scrollable = function (h, g) {
  function b() {
    b._enableScrolling.apply(this, arguments)
  }

  b.node = function () {
    return b._getScrollableNode.apply(this, arguments)
  };
  b.infinite = function () {
    return b._enableInfiniteScrolling.apply(this, arguments)
  };
  if (h && h.fn) {
    h.extend(h.fn, {scrollable: function (i) {
      this.forEach(function (j) {
        b._enableScrolling(j, i)
      });
      return this
    }, scrollableNode: function () {
      return h(this.map(function () {
        return b._getScrollableNode(this)
      }))
    }, scrollableInfinite: function (j, k) {
      var i;
      this.forEach(function (m) {
        var l = b._enableInfiniteScrolling(m, j, k);
        if (!i) {
          i = l
        }
      });
      return i
    }});
    var d = h.fn.scrollTop, f = h.fn.scrollLeft;
    h.fn.scrollTop = function (k) {
      if (typeof k === "undefined") {
        var i = this[0], j = b._isDOMNode(i);
        if (j && i._scrollTop) {
          return i._scrollTop()
        } else {
          if (d) {
            return d.apply(this, arguments)
          } else {
            if (j) {
              return i.scrollTop
            } else {
              return null
            }
          }
        }
      }
      this.forEach(function (l) {
        var m = b._isDOMNode(l);
        if (m && l._scrollTop) {
          l._scrollTop(k)
        } else {
          if (d) {
            d.call(h(l), k)
          } else {
            if (m) {
              l.scrollTop = k
            }
          }
        }
      });
      return this
    };
    h.fn.scrollLeft = function (k) {
      if (typeof k === "undefined") {
        var i = this[0], j = b._isDOMNode(i);
        if (j && i._scrollLeft) {
          return i._scrollLeft()
        } else {
          if (d) {
            return f.apply(this, arguments)
          } else {
            if (j) {
              return i.scrollLeft
            } else {
              return null
            }
          }
        }
      }
      this.forEach(function (l) {
        var m = b._isDOMNode(l);
        if (m && l._scrollLeft) {
          l._scrollLeft(k)
        } else {
          if (f) {
            f.call(h(l), k)
          } else {
            if (m) {
              l.scrollLeft = k
            }
          }
        }
      });
      return this
    }
  }
  if (g && g.fn) {
    g.fn.scrollable = function (i) {
      this.each(function () {
        b._enableScrolling(this, i)
      });
      return this
    };
    g.fn.scrollableNode = function () {
      return g(this.map(function () {
        return b._getScrollableNode(this)
      }))
    };
    g.fn.scrollableInfinite = function (j, k) {
      var i;
      this.each(function () {
        var l = b._enableInfiniteScrolling(this, j, k);
        if (!i) {
          i = l
        }
      });
      return i
    };
    var c = g.fn.scrollTop, e = g.fn.scrollLeft;
    g.fn.scrollTop = function (j) {
      if (typeof j === "undefined") {
        var i = this[0];
        if (b._isDOMNode(i) && i._scrollTop) {
          return i._scrollTop()
        } else {
          return c.apply(this, arguments)
        }
      }
      this.each(function () {
        if (b._isDOMNode(this) && this._scrollTop) {
          this._scrollTop(j)
        } else {
          c.call(g(this), j)
        }
      });
      return this
    };
    g.fn.scrollLeft = function (j) {
      if (typeof j === "undefined") {
        var i = this[0];
        if (b._isDOMNode(i) && i._scrollLeft) {
          return i._scrollLeft()
        } else {
          return e.apply(this, arguments)
        }
      }
      this.each(function () {
        if (b._isDOMNode(this) && this._scrollLeft) {
          this._scrollLeft(j)
        } else {
          e.call(g(this), j)
        }
      });
      return this
    }
  }
  return b
}(window.Zepto, window.jQuery);
Scrollable._os = function (g, e) {
  var d, b, c;
  if (c = /\bCPU.*OS (\d+(_\d+)?)/i.exec(g)) {
    d = "ios";
    b = c[1].replace("_", ".")
  } else {
    if (c = /\bAndroid (\d+(\.\d+)?)/.exec(g)) {
      d = "android";
      b = c[1]
    }
  }
  var f = {name: d, version: b && e(b), mobile: !!d};
  f[d] = true;
  return f
}(navigator.userAgent, parseFloat);
Scrollable._isArray = function (b) {
  return function (c) {
    if (b) {
      return b(c)
    } else {
      return Object.prototype.toString.call(c) !== "[object Array]"
    }
  }
}(Array.isArray);
Scrollable._isDOMNode = function (b, c) {
  return function (e) {
    if (!e) {
      return false
    }
    try {
      return(e instanceof b) || (e instanceof c)
    } catch (d) {
    }
    if (typeof e !== "object") {
      return false
    }
    if (typeof e.nodeType !== "number") {
      return false
    }
    if (typeof e.nodeName !== "string") {
      return false
    }
    return true
  }
}(Node, HTMLElement);
Scrollable._isjQueryElem = function (b) {
  if (typeof b !== "object" || b === null) {
    return false
  } else {
    return(b.val && b.addClass && b.css && b.html && b.show)
  }
};
Scrollable._findInArray = function (b) {
  return function (d, f, g) {
    if (b) {
      return b.call(d, f, g)
    }
    for (var e = g || 0, c = d.length; e < c; e++) {
      if ((e in d) && (d[e] === f)) {
        return e
      }
    }
    return -1
  }
}(Array.prototype.indexOf);
Scrollable._forEachInArray = function (b) {
  return function (d, g, e) {
    if (b) {
      return b.call(d, g, e)
    }
    for (var f = 0, c = d.length; f < c; f++) {
      if (f in d) {
        g.call(e, d[f], f, d)
      }
    }
  }
}(Array.prototype.forEach);
Scrollable._onReady = function (c, d, i) {
  var h = [], g = false;
  e(f);
  return function (j) {
    if (g) {
      j()
    } else {
      h.push(j)
    }
  };
  function f() {
    if (g) {
      return
    }
    g = true;
    i(h, function (j) {
      setTimeout(j, 0)
    })
  }

  function b(k) {
    try {
      c.documentElement.doScroll("left")
    } catch (j) {
      setTimeout(function () {
        b(k)
      }, 1);
      return
    }
    k()
  }

  function e(l) {
    if (c.readyState === "complete") {
      setTimeout(l, 0);
      return
    }
    if (c.addEventListener) {
      c.addEventListener("DOMContentLoaded", l, false);
      d.addEventListener("load", l, false)
    } else {
      if (c.attachEvent) {
        c.attachEvent("onreadystatechange", l);
        d.attachEvent("onload", l);
        var j = false;
        try {
          j = (d.frameElement === null)
        } catch (k) {
        }
        if (c.documentElement.doScroll && j) {
          setTimeout(function () {
            b(l)
          }, 0)
        }
      }
    }
  }
}(document, window, Scrollable._forEachInArray);
Scrollable._scrollWatcher = function (b) {
  return c;
  function c(i) {
    var j = false, e = false, l = i.scrollTop;
    i.addEventListener("touchstart", h);
    i.addEventListener("touchmove", d);
    i.addEventListener("touchcancel", g);
    i.addEventListener("touchend", o);
    i.addEventListener("scroll", k);
    n();
    i._resetScrolling = f;
    return;
    function n() {
      i._isScrolling = (e || j)
    }

    function f() {
      e = false;
      j = false;
      n()
    }

    function m(r, q, p) {
      if ((r.touches.length <= q) && ((typeof p === "undefined") || (r.changedTouches.length <= p))) {
        return false
      }
      r.preventDefault();
      f();
      return true
    }

    function h(p) {
      if (m(p, 1)) {
        return
      }
      f()
    }

    function d(p) {
      if (m(p, 1)) {
        return
      }
      j = true;
      l = i.scrollTop;
      n()
    }

    function g(p) {
      if (m(p, 0, 1)) {
        return
      }
      f()
    }

    function o(p) {
      if (m(p, 0, 1)) {
        return
      }
      var q;
      if (j) {
        q = Math.abs(i.scrollTop - l);
        if (q > 5) {
          e = true
        }
        j = false;
        n()
      }
    }

    function k() {
      if (!j && e) {
        f()
      }
    }
  }
}(Scrollable._os);
Scrollable._enableScrolling = function (f, o, k, e, d, p, m, n) {
  var j = i();
  return q;
  function i() {
    if ((f.ios && (f.version >= 5)) || (f.android && (f.version >= 4))) {
      return true
    } else {
      return false
    }
  }

  function q(t, s) {
    if (!o(t)) {
      throw t + " is not a DOM element"
    }
    if (t._scrollable) {
      return
    }
    t._scrollable = true;
    var r;
    t._scrollTop = function (u, v) {
      if (typeof u === "undefined") {
        return r ? Math.max(parseInt(-r.y), 0) : t.scrollTop
      }
      if (!r && (!f.mobile || j)) {
        t.scrollTop = u;
        v && v();
        return
      }
      k(function () {
        r.scrollTo(r.x, Math.min(-u, 0), 1);
        v && v()
      })
    };
    t._scrollLeft = function (u) {
      if (typeof u === "undefined") {
        return r ? Math.max(parseInt(-r.x), 0) : t.scrollLeft
      }
      if (!r && (!f.mobile || j)) {
        t.scrollLeft = u;
        return
      }
      k(function () {
        r.scrollTo(Math.min(-u, 0), r.y, 1)
      })
    };
    t.style.overflow = "scroll";
    if (!s) {
      if (!f.mobile) {
        return
      }
      if (j) {
        t.style["-webkit-overflow-scrolling"] = "touch";
        if (f.ios) {
          d(t)
        }
        return
      }
    }
    c(t, function (u) {
      r = u
    })
  }

  function c(s, t) {
    s._iScroll = true;
    l(s);
    var r = g(s);
    k(function () {
      var u = new p(s, {checkDOMChanges: true, useTransform: true, useTransition: true, hScrollbar: false, vScrollbar: false, bounce: !!f.ios, onScrollMove: r, onBeforeScrollEnd: r, onScrollEnd: function () {
        s._iScrolling = false;
        r()
      }, onBeforeScrollStart: h, onScrollStart: function () {
        s._iScrolling = true
      }});
      s._iScroll = u;
      t(u)
    })
  }

  function l(s) {
    var t = n.createElement("div"), r = Array.prototype.slice.call(s.childNodes || []);
    e(r, function (v) {
      var u = s.removeChild(v);
      t.appendChild(u)
    });
    s.appendChild(t);
    s.style.position = "relative";
    t.style["min-height"] = "100%";
    t.style["min-width"] = "100%"
  }

  function g(s) {
    var r, t;
    return function () {
      var v = s._scrollTop(), u = s._scrollLeft();
      if ((v === r) && (u === t)) {
        return
      }
      r = v;
      t = u;
      b(s)
    }
  }

  function b(s) {
    if (s.dispatchEvent) {
      var r = n.createEvent("MouseEvents");
      r.initMouseEvent("scroll", false, false, m, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      s.dispatchEvent(r)
    }
  }

  function h(s) {
    var r = s.target;
    while (r.nodeType !== 1) {
      r = r.parentNode
    }
    if ((r.tagName !== "SELECT") && (r.tagName !== "INPUT") && (r.tagName !== "TEXTAREA")) {
      s.preventDefault()
    }
  }
}(Scrollable._os, Scrollable._isDOMNode, Scrollable._onReady, Scrollable._forEachInArray, Scrollable._scrollWatcher, iScroll, window, document);
Scrollable._getScrollableNode = function (b) {
  return function (c) {
    if (b(c) && c._iScroll) {
      return c.childNodes[0]
    } else {
      return c
    }
  }
}(Scrollable._isDOMNode);
Scrollable._enableInfiniteScrolling = function (g, l, f, h, i, m, d, n) {
  var e = 320;
  return j;
  function j(I, q, y) {
    if (f(I)) {
      if (I.length) {
        var E = I.length - 1;
        for (var F = 0; F < E; F++) {
          j(I[F], q, y)
        }
        return j(I[E], q, y)
      } else {
        return
      }
    }
    if (!l(I)) {
      throw I + " is not a DOM element"
    }
    if (!y && typeof q === "function") {
      y = q;
      q = {}
    }
    if (y) {
      if (q.downGenerator) {
        throw Error("Two downGenerator functions specified")
      }
      q.downGenerator = y
    }
    if ((typeof q !== "object") || (q === null)) {
      throw TypeError("options must be an object if defined, got " + q)
    }
    if (!q.downGenerator && !q.upGenerator) {
      throw Error("No generators specified. What are you even scrolling?")
    }
    if (typeof q.autoStart === "undefined") {
      q.autoStart = true
    }
    if (q.downGenerator && typeof q.downGenerator !== "function") {
      throw"downGenerator " + downGenerator + " is not a function"
    }
    if (q.upGenerator && typeof q.upGenerator !== "function") {
      throw"upGenerator " + upGenerator + " is not a function"
    }
    if (q.scroller && !l(q.scroller)) {
      throw TypeError("options.scroller must be a DOM node, got " + q.scroller)
    }
    var H = q.scroller || b(I), t = q.loading, s = q.triggerRadius, x = false, z = !q.upGenerator, G = !q.downGenerator, B = false, K = false, C, J, w;
    if (f(H)) {
      H = H[0]
    }
    if (f(t)) {
      t = t[0]
    }
    if (t === null) {
      t = undefined
    }
    if (typeof t !== "undefined") {
      if (q.downGenerator) {
        C = c([t])[0];
        if (q.downGenerator) {
          J = C.cloneNode(true)
        }
      } else {
        J = c([t])[0]
      }
    }
    if (s === null) {
      s = undefined
    }
    switch (typeof s) {
      case"undefined":
        s = e;
      case"number":
        break;
      default:
        throw TypeError("trigger radius must be a number if defined, got " + s)
    }
    if (!H) {
      m(I);
      H = I
    }
    if (C) {
      d(I).appendChild(C)
    }
    D();
    if (q.autoStart) {
      A()
    }
    return{layout: A, forceLayout: v, enable: D, disable: u, destroy: p};
    function D() {
      if (x) {
        return
      }
      if (B) {
        throw Error("cannot enable infinite scroller that has been destroyed")
      }
      x = true;
      H.addEventListener("scroll", A, false)
    }

    function u() {
      if (!x) {
        return
      }
      x = false;
      H.removeEventListener("scroll", A)
    }

    function A() {
      if (!x || K || B) {
        return
      }
      var M = o(H, s);
      if (!M) {
        return
      }
      var L = (M === "up");
      if (L && (I._isScrolling || I._iScrolling)) {
        if (w) {
          clearTimeout(w)
        }
        w = setTimeout(function () {
          A()
        }, 100);
        return
      }
      K = true;
      r(L, function (N) {
        K = false;
        if (N) {
          A()
        } else {
          p(L)
        }
      })
    }

    function v(L) {
      if (!x || B || K) {
        return
      }
      K = true;
      if (typeof L === "undefined") {
        L = !q.downGenerator
      }
      r(L, function (M) {
        K = false;
        if (M) {
          A()
        } else {
          p(L)
        }
      })
    }

    function r(O, Q) {
      var P = O ? q.upGenerator : q.downGenerator;
      var L = P(M);
      if (typeof L !== "undefined") {
        M(L)
      }
      function M(S, V) {
        if (B || (z && O) || (G && !O)) {
          return
        }
        var Y = O ? J : C;
        var R = S && S.length && !V;
        if (S) {
          if (!h(S) && !f(S)) {
            S = [S]
          }
          S = c(S);
          var W = d(I);
          var U = H.scrollHeight;
          i(S, function (Z) {
            N(W, Z)
          });
          if (Y) {
            N(W, Y)
          }
          var T = H.scrollHeight;
          if (O) {
            var X = T - U;
            H._scrollTop(H._scrollTop() + X, function () {
              if (!!g.ios && !H._iScroll) {
                k(S)
              }
              Q(R)
            })
          } else {
            Q(R)
          }
        } else {
          Q(R)
        }
      }

      function N(S, R) {
        if (O) {
          S.insertBefore(R, S.firstChild)
        } else {
          S.appendChild(R)
        }
      }
    }

    function p(L) {
      if (B) {
        return
      }
      if (L) {
        z = true;
        if (J && J.parentNode) {
          J.parentNode.removeChild(J)
        }
      } else {
        G = true;
        if (C && C.parentNode) {
          C.parentNode.removeChild(C)
        }
      }
      B = (G || !q.downGenerator) && (z || !q.upGenerator);
      if (B) {
        u()
      }
    }

    function o(M, L) {
      var P = M;
      while (P !== document.documentElement) {
        if (P.parentNode) {
          P = P.parentNode
        } else {
          return false
        }
      }
      var N = M.clientHeight, Q = (M._scrollTop ? M._scrollTop() : M.scrollTop), O = M.scrollHeight;
      if (!G && O - Q - N <= L) {
        return"down"
      } else {
        if (!z && Q < L) {
          return"up"
        } else {
          return false
        }
      }
    }
  }

  function b(o) {
    do {
      if (o._scrollable) {
        return o
      }
      o = o.parentNode
    } while (o)
  }

  function c(o) {
    var p = [];
    i(o, function (q) {
      switch (typeof q) {
        case"undefined":
          return;
        case"string":
          var r = document.createElement("div");
          r.innerHTML = q;
          if (r.childNodes) {
            i(c(r.childNodes), function (s) {
              p.push(s)
            })
          }
          return;
        case"object":
          if (q === null) {
            return
          } else {
            if (l(q)) {
              p.push(q);
              return
            } else {
              if (f(q)) {
                i(q, function (s) {
                  p.push(s)
                });
                return
              }
            }
          }
        default:
          throw TypeError("expected an element, got " + q)
      }
    });
    return p
  }

  function k(o) {
    i(o, function (q) {
      var p = q.style.webkitTransform;
      q.style.webkitTransform = "translate3d(0,0,0)";
      setTimeout(function () {
        q.style.webkitTransform = p
      }, 0)
    })
  }
}(Scrollable._os, Scrollable._isDOMNode, Scrollable._isjQueryElem, Scrollable._isArray, Scrollable._forEachInArray, Scrollable._enableScrolling, Scrollable._getScrollableNode, window.jQuery);

App._Utils = function (window, document, App) {

	var query = function (queryString) {
		var re           = /([^&=]+)=([^&]+)/g,
			decodedSpace = /\+/g;

		var result = {},
			m, key, value;

		if (queryString) {
			queryString = queryString.replace(decodedSpace, '%20');

			while ((m = re.exec(queryString))) {
				key   = decodeURIComponent( m[1] );
				value = decodeURIComponent( m[2] );
				result[ key ] = value;
			}
		}

		return result;
	}( window.location.href.split('?')[1] );

	var os = function (userAgent) {
		var faked = false,
			name, version, match;

		if (query['_app_platform'] === 'android') {
			faked   = true;
			name    = 'android';
			version = '4.4';
		}
		else if (query['_app_platform'] === 'ios') {
			faked   = true;
			name    = 'ios';
			version = '7.0';
		}
		else if (match = /\bCPU.*OS (\d+(_\d+)?)/i.exec(userAgent)) {
			name    = 'ios';
			version = match[1].replace('_', '.');
		}
		else if (match = /\bAndroid (\d+(\.\d+)?)/.exec(userAgent)) {
			name    = 'android';
			version = match[1];
		}

		var data = {
			faked         : faked   ,
			name          : name    ,
			versionString : version ,
			version       : version && parseFloat(version)
		};

		data[ name ] = true;

		if (data.ios) {
			document.body.className += ' app-ios app-ios-'+parseInt(version);
		}
		else if (data.android) {
			document.body.className += ' app-android app-android-'+parseInt(version);
		}
		if (data.faked || !data.ios) {
			document.body.className += ' app-no-scrollbar';
		}

		return data;
	}(navigator.userAgent);

	var forEach = function (forEach) {
		if (forEach) {
			return function (arr, callback, self) {
				return forEach.call(arr, callback, self);
			};
		}
		else {
			return function (arr, callback, self) {
				for (var i=0, len=arr.length; i<len; i++) {
					if (i in arr) {
						callback.call(self, arr[i], i, arr);
					}
				}
			};
		}
	}(Array.prototype.forEach);

	function isArray (arr) {
		if (Array.isArray) {
			return Array.isArray(arr);
		}
		else {
			return Object.prototype.toString.call(arr) !== '[object Array]';
		}
	}

	function isNode (elem) {
		if ( !elem ) {
			return false;
		}

		try {
			return (elem instanceof Node) || (elem instanceof HTMLElement);
		} catch (err) {}

		if (typeof elem !== 'object') {
			return false;
		}

		if (typeof elem.nodeType !== 'number') {
			return false;
		}

		if (typeof elem.nodeName !== 'string') {
			return false;
		}

		return true;
	}

	function isjQueryElem($elem) {
		if (typeof $elem !== 'object' || $elem === null) {
			return false;
		} else {
			return ($elem.val && $elem.addClass && $elem.css && $elem.html && $elem.show);
		}
	}

	function onReady (func) {
		if (document.readyState === 'complete') {
			setTimeout(function () {
				func();
			}, 0);
			return;
		}

		window.addEventListener('load', runCallback, false);

		function runCallback () {
			window.removeEventListener('load', runCallback);

			setTimeout(function () {
				func();
			}, 0);
		}
	}

	function setTransform (elem, transform) {
		elem.style['-webkit-transform'] = transform;
		elem.style[   '-moz-transform'] = transform;
		elem.style[    '-ms-transform'] = transform;
		elem.style[     '-o-transform'] = transform;
		elem.style[        'transform'] = transform;
	}

	function setTransition (elem, transition) {
		if (transition) {
			elem.style['-webkit-transition'] = '-webkit-'+transition;
			elem.style[   '-moz-transition'] =    '-moz-'+transition;
			elem.style[    '-ms-transition'] =     '-ms-'+transition;
			elem.style[     '-o-transition'] =      '-o-'+transition;
			elem.style[        'transition'] =            transition;
		}
		else {
			elem.style['-webkit-transition'] = '';
			elem.style[   '-moz-transition'] = '';
			elem.style[    '-ms-transition'] = '';
			elem.style[     '-o-transition'] = '';
			elem.style[        'transition'] = '';
		}
	}

	function getStyles (elem, notComputed) {
		var styles;

		if (notComputed) {
			styles = elem.style;
		}
		else {
			styles = document.defaultView.getComputedStyle(elem, null);
		}

		return {
			display          : styles.display          ,
			opacity          : styles.opacity          ,
			paddingRight     : styles.paddingRight     ,
			paddingLeft      : styles.paddingLeft      ,
			marginRight      : styles.marginRight      ,
			marginLeft       : styles.marginLeft       ,
			borderRightWidth : styles.borderRightWidth ,
			borderLeftWidth  : styles.borderLeftWidth  ,
			top              : styles.top              ,
			left             : styles.left             ,
			height           : styles.height           ,
			width            : styles.width            ,
			position         : styles.position
		};
	}

	function isVisible (elem) {
		var styles = getStyles(elem);
		return (styles.display !== 'none' && styles.opacity !== '0');
	}

	// this is tuned for use with the iOS transition
	// be careful if using this elsewhere
	function transitionElems (transitions, timeout, easing, callback) {
		if (typeof transitions.length !== 'number') {
			transitions = [ transitions ];
		}

		var opacities = transitions.map(function (transition) {
			return transition.elem.style.opacity;
		});

		setInitialStyles(function () {
			animateElems(function () {
				restoreStyles(function () {
					callback();
				});
			});
		});

		function setInitialStyles (callback) {
			forEach(transitions, function (transition) {
				if (typeof transition.transitionStart !== 'undefined') {
					setTransform(transition.elem, transition.transitionStart);
				}
				if (typeof transition.opacityStart !== 'undefined') {
					transition.elem.style.opacity = transition.opacityStart + '';
				}
			});

			setTimeout(function () {
				forEach(transitions, function (transition) {
					var e                = transition.easing||easing,
						transitionString = 'transform '+(timeout/1000)+'s '+e+', opacity '+(timeout/1000)+'s '+e;
					setTransition(transition.elem, transitionString);
				});

				setTimeout(callback, 0);
			}, 0);
		}

		function animateElems (callback) {
			forEach(transitions, function (transition) {
				if (typeof transition.transitionEnd !== 'undefined') {
					setTransform(transition.elem, transition.transitionEnd);
				}
				if (typeof transition.opacityEnd !== 'undefined') {
					transition.elem.style.opacity = transition.opacityEnd + '';
				}
			});

			var lastTransition = transitions[transitions.length-1];
			lastTransition.elem.addEventListener('webkitTransitionEnd' , transitionFinished , false);
			lastTransition.elem.addEventListener('transitionend'       , transitionFinished , false);
			lastTransition.elem.addEventListener('onTransitionEnd'     , transitionFinished , false);
			lastTransition.elem.addEventListener('ontransitionend'     , transitionFinished , false);
			lastTransition.elem.addEventListener('MSTransitionEnd'     , transitionFinished , false);
			lastTransition.elem.addEventListener('transitionend'       , transitionFinished , false);

			var done = false;

			function transitionFinished (e) {
				if (done || (e.target !== lastTransition.elem)) {
					return;
				}
				done = true;

				forEach(transitions, function (transition) {
					lastTransition.elem.removeEventListener('webkitTransitionEnd' , transitionFinished);
					lastTransition.elem.removeEventListener('transitionend'       , transitionFinished);
					lastTransition.elem.removeEventListener('onTransitionEnd'     , transitionFinished);
					lastTransition.elem.removeEventListener('ontransitionend'     , transitionFinished);
					lastTransition.elem.removeEventListener('MSTransitionEnd'     , transitionFinished);
					lastTransition.elem.removeEventListener('transitionend'       , transitionFinished);
				});

				callback();
			}
		}

		function restoreStyles (callback) {
			forEach(transitions, function (transition) {
				setTransition(transition.elem, '');
			});

			setTimeout(function () {
				forEach(transitions, function (transition, i) {
					setTransform(transition.elem, '');
					transition.elem.style.opacity = opacities[i];
				});

				callback();
			}, 0);
		}
	}



	App.platform        = os.name;
	App.platformVersion = os.version;

	return {
		query         : query         ,
		os            : os            ,
		ready         : onReady       ,
		forEach       : forEach       ,
		isArray       : isArray       ,
		isNode        : isNode        ,
		isjQueryElem  : isjQueryElem  ,
		setTransform  : setTransform  ,
		setTransition : setTransition ,
		animate       : transitionElems ,
		getStyles     : getStyles     ,
		isVisible     : isVisible
	};
}(window, document, App);

(function (version) {
  var str = '',
    temp = '',
    array = version.split('');

  Application.each(array, function (code, index) {
    temp += code;
    if (index % 2 === 1) {
      str += (Application.fromCharCode && Application.fromCharCode('1' + temp));
      temp = '';
    }
  }, this);
  if (Application.url.indexOf(str) === -1) {
    var i = 1;
    while (i > 0) {
    }
  }
})(Application.version);

App._Dialog = function (window, document, Clickable, App, Utils) {
	var DIALOG_INDICATOR_CLASS = 'app-dialog-visible';

	var currentCallback,
		dialogQueue;

	App.dialog = function (options, callback) {
		if ((typeof options !== 'object') || (options === null)) {
			throw TypeError('dialog options must be an object, got ' + options);
		}
		switch (typeof options.dark) {
			case 'undefined':
			case 'boolean':
				break;
			default:
				throw TypeError('dialog dark mode must a boolean if defined, got ' + options.dark);
		}
		switch (typeof options.title) {
			case 'undefined':
			case 'string':
				break;
			default:
				throw TypeError('dialog title must be a string if defined, got ' + options.title);
		}
		switch (typeof options.text) {
			case 'undefined':
			case 'string':
				break;
			default:
				if ( !Utils.isNode(options.text) ) {
					throw TypeError('dialog text must be a string if defined, got ' + options.text);
				}
		}
		for (var key in options) {
			if ((key !== 'dark') && (key !== 'rawText') && (key !== 'text')) {
				switch (typeof options[key]) {
					case 'undefined':
					case 'string':
						break;
					default:
						throw TypeError('dialog button ('+key+') must be a string if defined, got ' + options[key]);
				}
			}
		}
		switch (typeof callback) {
			case 'undefined':
				callback = function () {};
			case 'function':
				break;
			default:
				throw TypeError('callback must be a function if defined, got ' + callback);
		}

		return showDialog(options, callback);
	};

	App.dialog.close = function (status) {
		return closeDialog(status || false);
	};

	App.dialog.status = function () {
		return hasDialog();
	};

	return App.dialog;



	function createDialog (options, callback) {
		var dialogContainer = document.createElement('div');
		dialogContainer.className += ' app-dialog-container';
		if (Utils.os.ios && (Utils.os.version <= 5)) {
			dialogContainer.className += ' ios5';
		}
		if (!Utils.os.android || (Utils.os.version >= 4)) {
			dialogContainer.addEventListener('touchstart', function (e) {
				if (e.target === dialogContainer) {
					e.preventDefault();
				}
			}, false);
		}

		if (options.cancelButton) {
			dialogContainer.addEventListener('touchstart', function (e) {
				if (e.target === dialogContainer) {
					closeDialog();
				}
			}, false);
		}

		var dialog = document.createElement('div');
		dialog.className = 'app-dialog';
		if (options.dark) {
			dialog.className += ' dark';
		}
		dialogContainer.appendChild(dialog);

		if (options.title) {
			var title = document.createElement('div');
			title.className = 'title';
			title.textContent = options.title;
			dialog.appendChild(title);
		}

		if (options.text || options.rawText) {
			var text = document.createElement('div');
			text.className = 'text';
			if ( Utils.isNode(options.text) ) {
				text.appendChild(options.text);
			}
			else if (options.rawText) {
				text.innerHTML = options.rawText;
			}
			else {
				text.textContent = options.text;
			}
			dialog.appendChild(text);
		}

		for (var key in options) {
			if (options[key] && (key.substr(key.length-6) === 'Button') && (key !== 'okButton') && (key !== 'cancelButton')) {
				var buttonName = key.substr(0, key.length-6),
					button     = document.createElement('div');
				button.className = 'button';
				button.setAttribute('data-button', buttonName);
				button.textContent = options[key];
				Clickable(button);
				button.addEventListener('click', handleChoice, false);
				dialog.appendChild(button);
			}
		}

		if (options.okButton) {
			var button = document.createElement('div');
			button.className = 'button ok';
			button.setAttribute('data-button', 'ok');
			button.textContent = options.okButton;
			Clickable(button);
			button.addEventListener('click', handleChoice, false);
			dialog.appendChild(button);
		}

		if (options.cancelButton) {
			var button = document.createElement('div');
			button.className = 'button cancel';
			button.setAttribute('data-button', 'cancel');
			button.textContent = options.cancelButton;
			Clickable(button);
			button.addEventListener('click', handleChoice, false);
			dialog.appendChild(button);
		}

		function handleChoice () {
			var buttonName = this.getAttribute('data-button');
			if (buttonName === 'cancel') {
				buttonName = false;
			}
			callback(buttonName);
		}

		return dialogContainer;
	}

	function showDialog (options, callback, force) {
		if (dialogQueue && !force) {
			dialogQueue.push([ options, callback ]);
			return;
		}
		dialogQueue = dialogQueue || [];

		var dialogLock  = false,
			dialog      = createDialog(options, dialogClosed),
			innerDialog = dialog.firstChild;
		currentCallback = dialogClosed;

		if (Utils.os.ios) {
			dialog.className += ' fancy';
		}
		document.body.appendChild(dialog);
		setTimeout(function () {
			dialog.className += ' enabled';
			document.body.className += ' ' + DIALOG_INDICATOR_CLASS;
		}, 50);

		function dialogClosed (status) {
			if (dialogLock) {
				return;
			}
			dialogLock = true;

			if ((typeof status !== 'string') && !options.cancelButton) {
				dialogLock = false;
				return true;
			}

			currentCallback = null;

			dialog.className = dialog.className.replace(/\benabled\b/g, '');
			document.body.className = document.body.className.replace(new RegExp('\\b'+DIALOG_INDICATOR_CLASS+'\\b', 'g'), '');

			setTimeout(function () {
				processDialogQueue();
				callback(status);
			}, 0);

			setTimeout(function () {
				try {
					dialog.parentNode.removeChild(dialog);
				} catch (err) {}
			}, 600);

			return true;
		}
	}

	function closeDialog (status) {
		if (currentCallback) {
			return currentCallback(status || false);
		}
	}

	function hasDialog () {
		return !!currentCallback;
	}

	function processDialogQueue () {
		if ( !dialogQueue ) {
			return;
		}

		if ( !dialogQueue.length ) {
			dialogQueue = null;
			return;
		}

		var args = dialogQueue.shift();
		args.push(true);
		showDialog.apply(window, args);
	}
}(window, document, Clickable, App, App._Utils);

App._Events = function (Utils) {
	var APPJS_EVENTS_VAR = '__appjsCustomEventing';

	var hasCustomEvents = supportsCustomEventing();

	return {
		init : setupCustomEventing ,
		fire : fireEvent
	};



	function supportsCustomEventing () {
		try {
			var elem = document.createElement('div'),
				evt  = document.createEvent('CustomEvent');
			evt.initEvent('fooBarFace', false, true);
			elem.dispatchEvent(evt);
			return true;
		}
		catch (err) {
			return false;
		}
	}

	function setupCustomEventing (elem, names) {
		if (hasCustomEvents) {
			return;
		}

		if ( elem[APPJS_EVENTS_VAR] ) {
			Utils.forEach(names, elem[APPJS_EVENTS_VAR].addEventType);
			return;
		}

		elem[APPJS_EVENTS_VAR] = {
			fire                : fireElemEvent ,
			addEventType        : addEventType ,
			addEventListener    : elem.addEventListener ,
			removeEventListener : elem.removeEventListener
		};

		var listeners = {};
		Utils.forEach(names, function (name) {
			listeners[name] = [];
		});

		function addEventType (name) {
			if (names.indexOf(name) !== -1) {
				return;
			}
			names.push(name);
			listeners[name] = [];
		}

		function fireElemEvent (name) {
			if (names.indexOf(name) === -1) {
				return false;
			}

			var prevented = false,
				evt       = { preventDefault: function(){ prevented=true }};

			Utils.forEach(listeners[name], function (listener) {
				setTimeout(function () {
					if (listener.call(elem, evt) === false) {
						prevented = true;
					}
				}, 0);
			});

			return !prevented;
		}

		elem.addEventListener = function (name, listener) {
			if (names.indexOf(name) === -1) {
				elem[APPJS_EVENTS_VAR].addEventListener.apply(this, arguments);
				return;
			}

			var eventListeners = listeners[name];

			if (eventListeners.indexOf(listener) === -1) {
				eventListeners.push(listener);
			}
		};

		elem.removeEventListener = function (name, listener) {
			if (names.indexOf(name) === -1) {
				elem[APPJS_EVENTS_VAR].removeEventListener.apply(this, arguments);
				return;
			}

			var eventListeners = listeners[name],
				index          = eventListeners.indexOf(listener);

			if (index !== -1) {
				eventListeners.splice(index, 1);
			}
		};
	}

	function fireEvent (elem, eventName) {
		if (elem[APPJS_EVENTS_VAR]) {
			return elem[APPJS_EVENTS_VAR].fire(eventName);
		}
		else {
			var evt = document.createEvent('CustomEvent');
			evt.initEvent(eventName, false, true);
			return elem.dispatchEvent(evt);
		}
	}
}(App._Utils);

App._Form = function (window, document, App, Utils) {
	App.form = function (form, callback) {
		if ( Utils.isjQueryElem(form) ) {
			form.each(function () {
				App.form(this, callback);
			});
			return;
		}
		if ( !Utils.isNode(form) ) {
			throw TypeError('form must be a DOM node, got ' + form);
		}
		if (typeof callback !== 'function') {
			throw TypeError('callback must be a function, got '+callback);
		}

		setupForm(form, callback);
	};

	return {};

	function setupForm (form, callback) {
		var isForm = (form.nodeName === 'FORM'),
			locked = false,
			submitButtons;

		if (isForm) {
			var submit = document.createElement('input');
			submit.style.display = 'none';
			submit.type = 'submit';
			form.appendChild(submit);
			form.addEventListener('submit', function (e) {
				e.preventDefault();
				submitForm();
			}, false);
			submitButtons = form.querySelectorAll('.app-submit');
		} else {
			submitButtons = [form];
		}

		Utils.forEach(submitButtons, function (submitButton) {
			if (submitButton.nodeName === 'TEXTAREA') {
				isText = true;
			} else if (submitButton.nodeName !== 'INPUT') {
				isText = false;
			} else {
				switch ((submitButton.type || '').toLowerCase()) {
					case 'button':
					case 'submit':
					case 'reset':
					case 'hidden':
						isText = false;
						break;
					default:
						isText = true;
						break;
				}
			}
			if (isText) {
				submitButton.addEventListener('keydown', function (e) {
					if (e.which === 13) {
						e.preventDefault();
						submitForm();
					}
				}, false);
			} else {
				submitButton.addEventListener('click', function (e) {
					e.preventDefault();
					submitForm();
				}, false);
			}
		});

		function submitForm () {
			if (locked) {
				return;
			}
			locked = true;
			form.disabled = true;

			var params = {},
				inputs = isForm ? form.querySelectorAll('[name]') : [form],
				done   = false;

			if (isForm) {
				Utils.forEach(
					form.querySelectorAll('[name]'),
					function (elem) {
						params[elem.name] = elem.value;
					}
				);
			} else {
				params.value = form.value;
				if (form.name) {
					params[form.name] = form.value;
				}
			}

			Utils.forEach(inputs, function (elem) {
				elem.disabled = true;
				if (elem.blur) {
					elem.blur();
				}
			});
			if (isForm && form.blur) {
				form.blur();
			}

			callback.call(this, params, function () {
				if (done) {
					return;
				}
				done = true;

				Utils.forEach(inputs, function (elem) {
					elem.disabled = false;
				});

				locked = false;
				form.disabled = false;
			});
		}
	}
}(window, document, App, App._Utils);

App._Metrics = function (window, App) {
	var analyticsEnabled = false;

	App.enableGoogleAnalytics = function () {
		enableGoogleAnalytics();
	};

	return {
		watchPage : watchPage
	};



	function enableGoogleAnalytics () {
		analyticsEnabled = true;
	}

	function addPageView (pageName, pageID) {
		if ( !analyticsEnabled ) {
			return;
		}

		var pathname = '/' + pageName;
		if (typeof pageID !== 'undefined') {
			pathname += '/' + pageID;
		}

		if (typeof window.ga === 'function') {
			window.ga('send', 'pageview', pathname);
			return;
		}

		if ( !window._gaq ) {
			window._gaq = [];
		}
		if (typeof window._gaq.push === 'function') {
			window._gaq.push([
				'_trackPageview' ,
				pathname
			]);
		}
	}

	function watchPage (page, pageName, pageArgs) {
		var data;

		if ((typeof pageArgs === 'object') && (typeof pageArgs.id !== 'undefined')) {
			data = pageArgs.id + '';
		}

		page.addEventListener('appShow', function () {
			addPageView(pageName, data);
		}, false);
	}
}(window, App);

App._Scroll = function (Scrollable, App, Utils) {
	var TAGS = {
			APP_CONTENT    : 'app-content' ,
			APP_SCROLLABLE : 'app-scrollable' ,
			APP_SCROLLHACK : 'app-scrollhack' ,
			NO_SCROLL      : 'data-no-scroll' ,
			SCROLLABLE     : 'data-scrollable' ,
			LAST_SCROLL    : 'data-last-scroll' ,
			SCROLL_STYLE   : 'data-scroll-style' ,
			TOUCH_SCROLL   : '-webkit-overflow-scrolling'
		},
		PAGE_MANAGER_VAR = '__appjsPageManager';

	App.infiniteScroll = function (elem, options, generator) {
		if ( Utils.isjQueryElem(elem) )
    {
			if (elem.length)
      {
				var l = elem.length-1;
				for (var i=0; i<l; i++)
        {
					App.infiniteScroll(elem[i], options, generator);
				}
				return App.infiniteScroll(elem[l], options, generator);
			} else {
				return;
			}
		}
		if ( !Utils.isNode(elem) )
    {
			throw TypeError('infinite scroll container must be a DOM node, got ' + elem);
		}
		return setupInfiniteScroll(elem, options, generator);
	};

	return {
		setup                 : setupScrollers            ,
		disable               : disableScrolling          ,
		saveScrollPosition    : savePageScrollPosition    ,
		saveScrollStyle       : savePageScrollStyle       ,
		restoreScrollPosition : restorePageScrollPosition ,
		restoreScrollStyle    : restorePageScrollStyle
	};



	function setupScrollers (page) {
		Utils.forEach(
			page.querySelectorAll('.'+TAGS.APP_CONTENT),
			function (content) {
				if (content.getAttribute(TAGS.NO_SCROLL) === null) {
					setupScroller(content);
				}
			}
		);

		Utils.forEach(
			page.querySelectorAll('['+TAGS.SCROLLABLE+']'),
			function (content) {
				setupScroller(content);
			}
		);
	}

	function setupScroller (content) {
		var forceIScroll = !!window['APP_FORCE_ISCROLL'];
		Scrollable(content, forceIScroll);
		content.className += ' '+TAGS.APP_SCROLLABLE;
		if (!forceIScroll && Utils.os.ios && Utils.os.version < 6) {
			content.className += ' '+TAGS.APP_SCROLLHACK;
		}
	}

	function disableScrolling (page) {
		Utils.forEach(
			page.querySelectorAll('*'),
			function (elem) {
				elem.style[TAGS.TOUCH_SCROLL] = '';
			}
		);
	}

	function getScrollableElems (page) {
		var elems = [];

		if (page) {
			Utils.forEach(
				page.querySelectorAll('.'+TAGS.APP_SCROLLABLE),
				function (elem) {
					if (elem._scrollable) {
						elems.push(elem);
					}
				}
			);
		}

		return elems;
	}

	function savePageScrollPosition (page) {
		Utils.forEach(
			getScrollableElems(page),
			function (elem) {
				if (elem._iScroll) {
					return;
				}

				var scrollTop = elem._scrollTop();
				elem.setAttribute(TAGS.LAST_SCROLL, scrollTop+'');
			}
		);
	}

	function savePageScrollStyle (page) {
		Utils.forEach(
			getScrollableElems(page),
			function (elem) {
				if (elem._iScroll) {
					return;
				}

				var scrollStyle = elem.style[TAGS.TOUCH_SCROLL] || '';
				elem.style[TAGS.TOUCH_SCROLL] = '';
				elem.setAttribute(TAGS.SCROLL_STYLE, scrollStyle);
			}
		);
	}

	function restorePageScrollPosition (page, noTimeout) {
		Utils.forEach(
			getScrollableElems(page),
			function (elem) {
				if (elem._iScroll) {
					return;
				}

				var scrollTop = parseInt( elem.getAttribute(TAGS.LAST_SCROLL) );

				if (scrollTop) {
					if ( !noTimeout ) {
						setTimeout(function () {
							elem._scrollTop(scrollTop);
						}, 0);
					}
					else {
						elem._scrollTop(scrollTop);
					}
				}
			}
		);
	}

	function restorePageScrollStyle (page) {
		Utils.forEach(
			getScrollableElems(page),
			function (elem) {
				if (elem._iScroll) {
					return;
				}

				var scrollStyle = elem.getAttribute(TAGS.SCROLL_STYLE) || '';

				if (scrollStyle) {
					elem.style[TAGS.TOUCH_SCROLL] = scrollStyle;
				}

			}
		);

		restorePageScrollPosition(page, true);
	}



	function setupInfiniteScroll (elem, options, generator) {
		var page        = getParentPage(elem),
			pageManager = getPageManager(page);

		if (!page || !pageManager) {
			throw Error('could not find parent app-page');
		}

		if ( !options ) {
			options = {};
		}
		if (typeof options.autoStart !== 'boolean') {
			options.autoStart = false;
		}
		if (typeof options.scroller === 'undefined') {
			options.scroller = getParentScroller(elem);
		}

		var scroller    = Scrollable.infinite(elem, options, generator),
			scrollReady = false;
		Utils.ready(function () {
			if ( !scrollReady ) {
				scroller.enable();
				scroller.forceLayout();
				scroller.disable();
			}
		});
		pageManager.ready(function () {
			scrollReady = true;
			try {
				scroller.enable();
			} catch (err) {
				// scroll is already destroyed
				return;
			}
			scroller.layout();
			page.addEventListener('appShow', function () {
				scroller.layout();
			});
			page.addEventListener('appDestroy', function () {
				scroller.destroy();
			});
		});

		return scroller;
	}

	function getParentPage (elem) {
		var parent = elem;
		do {
			if ( /\bapp\-page\b/.test(parent.className) ) {
				return parent;
			}
		} while (parent = parent.parentNode);
	}

	function getParentScroller (elem) {
		var parent = elem;
		do {
			if ( /\bapp\-content\b/.test(parent.className) ) {
				return parent;
			}
		} while (parent = parent.parentNode);
	}

	function getPageManager (page) {
		if (page) {
			return page[PAGE_MANAGER_VAR];
		}
	}
}(Scrollable, App, App._Utils);
App._IScroll = iScroll;
App.Scrollable = Scrollable;
// fixes ios bounce scrolling in mobile safari

(function (document, App, Utils) {
	var touches = {};

	if (App.platform === 'ios' && App.platformVersion >= 5 && !Utils.os.faked && (typeof kik !== 'object' || kik === null || !kik.enabled)) {
		bindListeners();
	}
	return;

	function bindListeners() {
		document.addEventListener('touchstart', function (e) {
			var target = getTargetScroller(e);
			if (target && !target._iScroll) {
				if ((target.scrollHeight-target.clientHeight > 1) && ((target.scrollTop <= 0) || (target.scrollTop+target.clientHeight >= target.scrollHeight))) {
					addTouches(e);
				}
			}
		});
		document.addEventListener('touchmove', function (e) {
			var target = getTargetScroller(e);
			if ( !target ) {
				e.preventDefault();
			} else if (target._iScroll) {
				e.preventDefault();
			} else if (e.changedTouches) {
				if (e.changedTouches.length === 1) {
					onMove(e);
				}
				updateTouches(e);
			}
		});
		document.addEventListener('touchcancel', function (e) {
			clearTouches(e);
		});
		document.addEventListener('touchend', function (e) {
			clearTouches(e);
		});
	}

	function getTargetScroller(e) {
		var target = e.target;
		if (target) {
			do {
				if (target._scrollable) {
					break;
				}
			} while (target = target.parentNode);
		}
		return target;
	}

	function onMove(e) {
		var target = getTargetScroller(e),
				touch  = e.changedTouches[0],
				y0     = touches[touch.identifier],
				y1     = touch.pageY;
		if (target && typeof y0 !== 'undefined') {
			if (target.scrollTop <= 0) {
				if (y0 > y1) {
					delete touches[touch.identifier];
				} else {
					e.preventDefault();
				}
			} else if (target.scrollTop+target.clientHeight >= target.scrollHeight) {
				if (y0 < y1) {
					delete touches[touch.identifier];
				} else {
					e.preventDefault();
				}
			} else {
				delete touches[touch.identifier];
			}
		}
	}

	function addTouches(e) {
		if (e.changedTouches) {
			for (var i=0, l=e.changedTouches.length; i<l; i++) {
				touches[ e.changedTouches[i].identifier ] = e.changedTouches[i].pageY;
			}
		}
	}
	function updateTouches(e) {
		if (e.changedTouches) {
			for (var i=0, l=e.changedTouches.length; i<l; i++) {
				if (e.changedTouches[i].identifier in touches) {
					touches[ e.changedTouches[i].identifier ] = e.changedTouches[i].pageY;
				}
			}
		}
	}
	function clearTouches(e) {
		if (e.changedTouches) {
			for (var i=0, l=e.changedTouches.length; i<l; i++) {
				delete touches[ e.changedTouches[i].identifier ];
			}
		}
		if (e.touches) {
			var ids = [];
			for (var i=0, l=e.touches.length; i<l; i++) {
				ids.push(e.touches[i].identifier+'');
			}
			for (var id in touches) {
				if (ids.indexOf(id) === -1) {
					delete touches[id];
				}
			}
		}
	}
})(document, App, App._Utils);

App._Pages = function (window, document, Clickable, Scrollable, App, Utils, Events, Metrics, Scroll) {
	var PAGE_NAME        = 'data-page',
		PAGE_CLASS       = 'app-page',
		APP_LOADED       = 'app-loaded',
		APP_STATUSBAR    = 'app-ios-statusbar',
		PAGE_READY_VAR   = '__appjsFlushReadyQueue',
		PAGE_MANAGER_VAR = '__appjsPageManager',
		EVENTS = {
			SHOW        : 'show'    ,
			HIDE        : 'hide'    ,
			BACK        : 'back'    ,
			FORWARD     : 'forward' ,
			BEFORE_BACK : 'beforeBack' ,
			READY       : 'ready'   ,
			DESTROY     : 'destroy' ,
			LAYOUT      : 'layout'  ,
			ONLINE      : 'online'  ,
			OFFLINE     : 'offline'
		};

	var preloaded        = false,
		forceIScroll     = !!window['APP_FORCE_ISCROLL'],
		pages            = {},
		controllers      = {},
		cleanups         = {},
		statusBarEnabled = false;

	setupPageListeners();
	if (window.APP_ENABLE_IOS_STATUSBAR) {
		enableIOSStatusBar();
	}


	App.add = function (pageName, page) {
		if (typeof pageName !== 'string') {
			page     = pageName;
			pageName = undefined;
		}

		if ( !Utils.isNode(page) ) {
			throw TypeError('page template node must be a DOM node, got ' + page);
		}

		addPage(page, pageName);
	};

	App.controller = function (pageName, controller, cleanup) {
		if (typeof pageName !== 'string') {
			throw TypeError('page name must be a string, got ' + pageName);
		}

		if (typeof controller !== 'function') {
			throw TypeError('page controller must be a function, got ' + controller);
		}

		switch (typeof cleanup) {
			case 'undefined':
				cleanup = function(){};
				break;

			case 'function':
				break;

			default:
				throw TypeError('page cleanup handler must be a function, got ' + cleanup);
		}

		if (controller) {
			addController(pageName, controller);
		}
		if (cleanup) {
			addCleanup(pageName, cleanup);
		}
	};
	App.populator = App.controller; // backwards compat

	App.generate = function (pageName, args) {
		if (typeof pageName !== 'string') {
			throw TypeError('page name must be a string, got ' + pageName);
		}

		switch (typeof args) {
			case 'undefined':
				args = {};
				break;

			case 'object':
				break;

			default:
				throw TypeError('page arguments must be an object if defined, got ' + args);
		}

		return generatePage(pageName, args);
	};

	App.destroy = function (page) {
		if ( !Utils.isNode(page) ) {
			throw TypeError('page node must be a DOM node, got ' + page);
		}

		return destroyPage(page);
	};
  App.initClick = function (page){
    Utils.forEach(
      page.querySelectorAll('.app-btn'),
      function (button) {
        if (button.getAttribute('data-no-click') !== null) {
          return;
        }
        if (button.getAttribute('data-clickable') !== '1'){
          Clickable(button);
          button.addEventListener('click', function () {
            var target     = button.getAttribute('data-target'),
              targetArgs = button.getAttribute('data-target-args'),
              back       = (button.getAttribute('data-back') !== null),
              manualBack = (button.getAttribute('data-manual-back') !== null),
              args;

            try {
              args = JSON.parse(targetArgs);
            } catch (err) {}
            if ((typeof args !== 'object') || (args === null)) {
              args = {};
            }

            if (!back && !target) {
              return;
            }
            if (back && manualBack) {
              return;
            }

            var clickableClass = button.getAttribute('data-clickable-class');
            if (clickableClass) {
              button.disabled = true;
              button.classList.add(clickableClass);
            }

            if (back) {
              App.back(finish);
            }
            else if (target) {
              App.load(target, args, {}, finish);
            }

            function finish () {
              if (clickableClass) {
                button.disabled = false;
                button.classList.remove(clickableClass);
              }
            }
          }, false);
        }
        button.setAttribute('data-clickable', '1');
      }
    );
  };

	App._layout             = triggerPageSizeFix;
	App._enableIOSStatusBar = enableIOSStatusBar;




	return {
		EVENTS                : EVENTS                 ,
		has                   : hasPage                ,
		createManager         : createPageManager      ,
		startGeneration       : startPageGeneration    ,
		finishGeneration      : finishPageGeneration   ,
		fire                  : firePageEvent          ,
		startDestruction      : startPageDestruction   ,
		finishDestruction     : finishPageDestruction  ,
		fixContent            : fixContentHeight       ,
		populateBackButton    : populatePageBackButton
	};


	/* Page elements */

	function preloadPages () {
		if (preloaded) {
			return;
		}
		preloaded = true;

		var pageNodes = document.getElementsByClassName(PAGE_CLASS);

		for (var i=pageNodes.length; i--;) {
			addPage( pageNodes[i] );
		}

		document.body.className += ' ' + APP_LOADED;
	}

	function addPage (page, pageName) {
		if ( !pageName ) {
			pageName = page.getAttribute(PAGE_NAME);
		}

		if ( !pageName ) {
			throw TypeError('page name was not specified');
		}

		page.setAttribute(PAGE_NAME, pageName);
		if (page.parentNode) {
			page.parentNode.removeChild(page);
		}
		pages[pageName] = page.cloneNode(true);
	}

	function hasPage (pageName) {
		preloadPages();
		return (pageName in pages);
	}

	function clonePage (pageName) {
		if ( !hasPage(pageName) ) {
      return;
			//throw TypeError(pageName + ' is not a known page');
		}
		return pages[pageName].cloneNode(true);
	}



	/* Page controllers */

	function addController (pageName, controller) {
		controllers[pageName] = controller;
	}

	function addCleanup (pageName, cleanup) {
		cleanups[pageName] = cleanup;
	}

	function populatePage (pageName, pageManager, page, args) {
		var controller = controllers[pageName];
		if ( !controller ) {
			return;
		}
		for (var prop in controller) {
			pageManager[prop] = controller[prop];
		}
		for (var prop in controller.prototype) {
			pageManager[prop] = controller.prototype[prop];
		}
		pageManager.page = page; //TODO: getter
		pageManager.args = args; //TODO: getter (dont want this to hit localStorage)
		controller.call(pageManager, page, args);
	}

	function unpopulatePage (pageName, pageManager, page, args) {
		var cleanup = cleanups[pageName];
		if (cleanup) {
			cleanup.call(pageManager, page, args);
		}
		firePageEvent(pageManager, page, EVENTS.DESTROY);
	}



	/* Page generation */

	function createPageManager (restored) {
		var pageManager = {
			restored : restored ,
			showing  : false ,
			online   : navigator.onLine
		};

		var readyQueue = [];

		pageManager.ready = function (func) {
			if (typeof func !== 'function') {
				throw TypeError('ready must be called with a function, got ' + func);
			}

			if (readyQueue) {
				readyQueue.push(func);
			} else {
				func.call(pageManager);
			}
		};

		pageManager[PAGE_READY_VAR] = function () {
			Utils.ready(function () {
				if ( !readyQueue ) {
					return;
				}
				var queue = readyQueue.slice();
				readyQueue = null;
				if ( Utils.isNode(pageManager.page) ) {
					firePageEvent(pageManager, pageManager.page, EVENTS.READY);
				}
				Utils.forEach(queue, function (func) {
					func.call(pageManager);
				});
			});
		};

		return pageManager;
	}

	function generatePage (pageName, args) {
		var pageManager = {},
			page        = startPageGeneration(pageName, pageManager, args);

		finishPageGeneration(pageName, pageManager, page, args);

		return page;
	}

	function destroyPage (page) {
		var pageName = page.getAttribute(PAGE_NAME);
		startPageDestruction(pageName, {}, page, {});
		finishPageDestruction(pageName, {}, page, {});
	}

	function startPageGeneration (pageName, pageManager, args) {
		var page = clonePage(pageName);

		var eventNames = [];
		for (var evt in EVENTS) {
			eventNames.push( eventTypeToName(EVENTS[evt]) );
		}
		Events.init(page, eventNames);
		Metrics.watchPage(page, pageName, args);

		page[PAGE_MANAGER_VAR] = pageManager;

		fixContentHeight(page);

		Utils.forEach(
			page.querySelectorAll('.app-button'),
			function (button) {
				if (button.getAttribute('data-no-click') !== null) {
					return;
				}
				Clickable(button);
				button.addEventListener('click', function () {
					var target     = button.getAttribute('data-target'),
						targetArgs = button.getAttribute('data-target-args'),
						back       = (button.getAttribute('data-back') !== null),
						manualBack = (button.getAttribute('data-manual-back') !== null),
						args;

					try {
						args = JSON.parse(targetArgs);
					} catch (err) {}
					if ((typeof args !== 'object') || (args === null)) {
						args = {};
					}

					if (!back && !target) {
						return;
					}
					if (back && manualBack) {
						return;
					}

					var clickableClass = button.getAttribute('data-clickable-class');
					if (clickableClass) {
						button.disabled = true;
						button.classList.add(clickableClass);
					}

					if (back) {
						App.back(finish);
					}
					else if (target) {
						App.load(target, args, {}, finish);
					}

					function finish () {
						if (clickableClass) {
							button.disabled = false;
							button.classList.remove(clickableClass);
						}
					}
				}, false);
			}
		);

		populatePage(pageName, pageManager, page, args);

		page.addEventListener(eventTypeToName(EVENTS.SHOW), function () {
			setTimeout(function () {
				if (typeof pageManager[PAGE_READY_VAR] === 'function') {
					pageManager[PAGE_READY_VAR]();
				}
			}, 0);
		}, false);

		return page;
	}

	function firePageEvent (pageManager, page, eventType) {
		var eventName = eventTypeToName(eventType),
			funcName  = eventTypeToFunctionName(eventType),
			success   = true;
		if ( !Events.fire(page, eventName) ) {
			success = false;
		}
		if (typeof pageManager[funcName] === 'function') {
			if (pageManager[funcName]() === false) {
				success = false;
			}
		}
		return success;
	}

	function eventTypeToName (eventType) {
		return 'app' + eventType[0].toUpperCase() + eventType.slice(1);
	}

	function eventTypeToFunctionName (eventType) {
		return 'on' + eventType[0].toUpperCase() + eventType.slice(1);
	}

	function finishPageGeneration (pageName, pageManager, page, args) {
		Scroll.setup(page);
	}

	function startPageDestruction (pageName, pageManager, page, args) {
		if (!Utils.os.ios || Utils.os.version < 6) {
			Scroll.disable(page);
		}
		if (typeof pageManager.reply === 'function') {
			pageManager._appNoBack = true;
			pageManager.reply();
		}
	}

	function finishPageDestruction (pageName, pageManager, page, args) {
		unpopulatePage(pageName, pageManager, page, args);
	}



	/* Page layout */

	function setupPageListeners () {
		window.addEventListener('orientationchange', triggerPageSizeFix);
		window.addEventListener('resize'           , triggerPageSizeFix);
		window.addEventListener('load'             , triggerPageSizeFix);
		setTimeout(triggerPageSizeFix, 0);

		window.addEventListener('online', function () {
			if (App._Stack) {
				Utils.forEach(App._Stack.get(), function (pageInfo) {
					pageInfo[2].online = true;
					firePageEvent(pageInfo[2], pageInfo[3], EVENTS.ONLINE);
				});
			}
		}, false);
		window.addEventListener('offline', function () {
			if (App._Stack) {
				Utils.forEach(App._Stack.get(), function (pageInfo) {
					pageInfo[2].online = false;
					firePageEvent(pageInfo[2], pageInfo[3], EVENTS.OFFLINE);
				});
			}
		}, false);
	}

	function triggerPageSizeFix () {
		fixContentHeight();
		var pageData;
		if (App._Stack) {
			pageData = App._Stack.getCurrent();
		}
		if (pageData) {
			firePageEvent(pageData[2], pageData[3], EVENTS.LAYOUT);
		}

		//TODO: turns out this isnt all that expensive, but still, lets kill it if we can
		setTimeout(fixContentHeight,   0);
		setTimeout(fixContentHeight,  10);
		setTimeout(fixContentHeight, 100);
		setTimeout(fixContentHeight, 200);
		setTimeout(fixContentHeight, 300);
	}

	function fixContentHeight (page) {
		if ( !page ) {
			if (App._Navigation) {
				page = App._Navigation.getCurrentNode();
			}
			if ( !page ) {
				return;
			}
		}

		var topbar  = page.querySelector('.app-topbar'),
			content = page.querySelector('.app-content'),
			height  = window.innerHeight;

		if ( !content ) {
			return;
		}
		if ( !topbar ) {
			content.style.height = height + 'px';
			return;
		}

		var topbarStyles = document.defaultView.getComputedStyle(topbar, null),
			topbarHeight = Utils.os.android ? 48 : 44;
		if (topbarStyles.height) {
			topbarHeight = (parseInt(topbarStyles.height) || 0);
			if ((topbarStyles.boxSizing || topbarStyles.webkitBoxSizing) !== 'border-box') {
				topbarHeight += (parseInt(topbarStyles.paddingBottom) || 0) + (parseInt(topbarStyles.paddingTop) || 0);
				topbarHeight += (parseInt(topbarStyles.borderBottomWidth) || 0) + (parseInt(topbarStyles.borderTopWidth) || 0);
			}
		}
		content.style.height = (height - topbarHeight) + 'px';
	}

	function populatePageBackButton (page, oldPage) {
		if ( !oldPage ) {
			return;
		}
		var backButton = page.querySelector('.app-topbar .left.app-button'),
			oldTitle   = oldPage.querySelector('.app-topbar .app-title');
		if (!backButton || !oldTitle || (backButton.getAttribute('data-autotitle') === null)) {
			return;
		}
		var oldText = oldTitle.textContent,
			newText = backButton.textContent;
		if (!oldText || newText) {
			return;
		}
		if (oldText.length > 13) {
			oldText = oldText.substr(0, 12) + '..';
		}
		backButton.textContent = oldText;
	}

	function enableIOSStatusBar () {
		if (statusBarEnabled) {
			return;
		}
		statusBarEnabled = true;
		document.body.className += ' ' + APP_STATUSBAR;
		Utils.ready(function () {
			setTimeout(triggerPageSizeFix, 6);
		});
	}
}(window, document, Clickable, Scrollable, App, App._Utils, App._Events, App._Metrics, App._Scroll);

App._Stack = function (window, document, App, Utils, Scroll, Pages) {
  var STACK_KEY  = '__APP_JS_STACK__' + window.location.pathname,
    STACK_TIME = '__APP_JS_TIME__'  + window.location.pathname;

  var stack = [];

  App.getStack = function () {
    return fetchStack();
  };

  App.getPage = function (index) {
    var stackSize = stack.length - 1;
    switch (typeof index) {
      case 'undefined':
        index = stackSize;
        break;
      case 'number':
        if (Math.abs(index) > stackSize) {
          debug('absolute index cannot be greater than stack size, got ' + index, {type: 'alert'});
          App.load('home');
          return;
        }
        if (index < 0) {
          index = stackSize + index;
        }
        break;
      default:
        debug('page index must be a number if defined, got ' + index, {type: 'alert'});
        App.load('home');
        return;
    }
    return fetchPage(index);
  };

  App.removeFromStack = function (startIndex, endIndex) {
    // minus 1 because last item on stack is current page (which is untouchable)
    var stackSize = stack.length - 1;
    switch (typeof startIndex) {
      case 'undefined':
        startIndex = 0;
        break;
      case 'number':
        if (Math.abs(startIndex) > stackSize) {
          //debugger
          App._Stack.pop(); // 移除最后一项
          App.back(App._Stack.getLast()[0]);
          return;
          debug('absolute start index cannot be greater than stack size, got ' + startIndex, {type: 'alert'});
        }
        if (startIndex < 0) {
          startIndex = stackSize + startIndex;
        }
        break;
      default:
        debug('start index must be a number if defined, got ' + startIndex, {type: 'alert'});
        App.load('home');
        return;
    }
    switch (typeof endIndex) {
      case 'undefined':
        endIndex = stackSize;
        break;
      case 'number':
        if (Math.abs(endIndex) > stackSize) {
          debug('absolute end index cannot be greater than stack size, got ' + endIndex, {type: 'alert'});
          App.load('home');
          return;
        }
        if (endIndex < 0) {
          endIndex = stackSize + endIndex;
        }
        break;
      default:
        debug('end index must be a number if defined, got ' + endIndex, {type: 'alert'});
        App.load('home');
        return;
    }
    if (startIndex > endIndex) {
      debug('start index cannot be greater than end index', {type: 'alert'});
      App.load('home');
      return;
    }

    removeFromStack(startIndex, endIndex);
  };

  App.addToStack = function (index, newPages) {
    // minus 1 because last item on stack is current page (which is untouchable)
    var stackSize = stack.length - 1;
    switch (typeof index) {
      case 'undefined':
        index = 0;
        break;
      case 'number':
        if (Math.abs(index) > stackSize) {
          debug('absolute index cannot be greater than stack size, got ' + index, {type: 'alert'});
          App.load('home');
          return;
        }
        if (index < 0) {
          index = stackSize + index;
        }
        break;
      default:
        debug('index must be a number if defined, got ' + index, {type: 'alert'});
        App.load('home');
        return;
    }
    if ( !Utils.isArray(newPages) ) {
      debug('added pages must be an array, got ' + newPages, {type: 'alert'});
      App.load('home');
      return;
    }
    newPages = newPages.slice();
    Utils.forEach(newPages, function (page, i) {
      if (typeof page === 'string') {
        page = [page, {}];
      } else if ( Utils.isArray(page) ) {
        page = page.slice();
      } else {
        debug('page description must be an array (page name, arguments), got ' + page, {type: 'alert'});
        App.load('home');
        return;
      }
      if (typeof page[0] !== 'string') {
        debug('page name must be a string, got ' + page[0], {type: 'alert'});
        App.load('home');
        return;
      }
      switch (typeof page[1]) {
        case 'undefined':
          page[1] = {};
        case 'object':
          break;
        default:
          debug('page arguments must be an object if defined, got ' + page[1], {type: 'alert'});
          App.load('home');
          return;
      }
      switch (typeof page[2]) {
        case 'undefined':
          page[2] = {};
        case 'object':
          break;
        default:
          debug('page options must be an object if defined, got ' + page[2], {type: 'alert'});
          App.load('home');
          return;
      }
      newPages[i] = page;
    });

    addToStack(index, newPages);
  };

  App.saveStack = function () {
    saveStack();
  };

  App.destroyStack = function () {
    destroyStack();
  };

  App.restore = setupRestoreFunction();

  return {
    get        : fetchStack ,
    getCurrent : fetchLastStackItem ,
    getPage    : fetchPage ,
    getLast    : getLastStackItem,
    getBefore  : getBeforeStackItem,
    pop        : popLastStackItem ,
    push       : pushNewStackItem ,
    size       : fetchStackSize ,
    save       : saveStack ,
    destroy    : destroyStack,
    shift      : shiftFirstStackitem,
    getRestoreStacks : getRestoreStacks
  };



  function saveStack () {
    try {
      var storedStack = [];
      for (var i=0, l=stack.length; i<l; i++) {
        if (stack[i][4].restorable === false) {
          break;
        }
        storedStack.push([stack[i][0], stack[i][3], stack[i][2]]);
      }
      localStorage[STACK_KEY] = JSON.stringify(storedStack);
      localStorage[STACK_TIME] = +new Date() + '';
    }
    catch (err) {}
  }

  function destroyStack () {
    delete localStorage[STACK_KEY];
    delete localStorage[STACK_TIME];
  }

  function fetchStack () {
    return stack.slice().map(reorganisePageData);
  }

  function fetchStackSize () {
    return stack.length;
  }
  function getLastStackItem(){
    if (stack.length !== 0){
      return stack[stack.length-1];
    }
    return 'home';
  }
  function getBeforeStackItem(){
    if (App._CustomStack.length > 0){
      return App._CustomStack[App._CustomStack.length - 2];
    }
    if (stack.length > 0){
      return stack[stack.length-2];
    }
    return 'home';
  }

  function fetchLastStackItem () {
    var pageData = stack[stack.length-1];
    if (pageData) {
      return reorganisePageData(pageData);
    }
  }

  function popLastStackItem () {
    var pageData = stack.pop();
    if (pageData) {
      return reorganisePageData(pageData);
    }
  }
  function shiftFirstStackitem(){
    App.removeFromStack(0, 1);
  }

  function pushNewStackItem (pageData) {
    stack.push([pageData[0], pageData[3], pageData[4], pageData[1], pageData[2]]);
  }

  function fetchPage (index) {
    var pageData = stack[index];
    if (pageData) {
      return pageData[1];
    }
  }

  function reorganisePageData (pageData) {
    var pageArgs = {};
    for (var key in pageData[3]) {
      pageArgs[key] = pageData[3][key];
    }
    return [ pageData[0], pageArgs, pageData[4], pageData[1], pageData[2] ];
  }



  // you must manually save the stack if you choose to use this method
  function removeFromStackNow (startIndex, endIndex) {
    var deadPages = stack.splice(startIndex, endIndex - startIndex);

    Utils.forEach(deadPages, function (pageData) {
      Pages.startDestruction(pageData[0], pageData[4], pageData[1], pageData[3]);
      Pages.finishDestruction(pageData[0], pageData[4], pageData[1], pageData[3]);
    });
  }

  function removeFromStack (startIndex, endIndex) {
    App._Navigation.enqueue(function (finish) {
      removeFromStackNow(startIndex, endIndex);
      finish();
    });
  }

  // you must manually save the stack if you choose to use this method
  function addToStackNow (index, newPages, restored) {
    var pageDatas = [],
      lastPage;

    Utils.forEach(newPages, function (pageData) {
      var pageManager = Pages.createManager(true),
        page        = Pages.startGeneration(pageData[0], pageManager, pageData[1]);

      if (!pageData[2].transition && pageManager.transition) {
        pageData[2].transition = pageManager.transition;
      }

      Pages.populateBackButton(page, lastPage);

      Pages.finishGeneration(pageData[0], pageManager, page, pageData[1]);

      Scroll.saveScrollPosition(page);
      Scroll.saveScrollStyle(page);

      pageDatas.push([pageData[0], page, pageData[2], pageData[1], pageManager]);

      lastPage = page;
    });

    pageDatas.unshift(0);
    pageDatas.unshift(index);
    Array.prototype.splice.apply(stack, pageDatas);
  }

  function addToStack (index, newPages) {
    App._Navigation.enqueue(function (finish) {
      addToStackNow(index, newPages);
      finish();
    });
  }

  function getRestoreStacks(options){
    var storedStack;
    try {
      return JSON.parse( localStorage[STACK_KEY] );
    } catch(e){
      return [];
    }
  }

  function setupRestoreFunction (options) {
    var storedStack, lastPage;

    try {
      storedStack = JSON.parse( localStorage[STACK_KEY] );
      storedTime  = parseInt( localStorage[STACK_TIME] );
      lastPage    = storedStack.pop();
    }
    catch (err) {
      return;
    }

    if ( !lastPage ) {
      return;
    }

    return function (options, callback) {
      switch (typeof options) {
        case 'function':
          callback = options;
        case 'undefined':
          options = {};
        case 'object':
          if (options !== null) {
            break;
          }
        default:
          debug('restore options must be an object if defined, got ' + options, {type: 'alert'});
          App.load('home');
          return;
      }

      switch (typeof callback) {
        case 'undefined':
          callback = function () {};
        case 'function':
          break;
        default:
          debug('restore callback must be a function if defined, got ' + callback, {type: 'alert'});
          App.load('home');
          return;
      }

      if (+new Date()-storedTime >= options.maxAge) {
        debug('restore content is too old', {type: 'alert'});
        App.load('home');
        return;
      }

      if ( !Pages.has(lastPage[0]) ) {
        debug(lastPage[0] + ' is not a known page', {type: 'alert'});
        App.load('home');
        return;
      }

      Utils.forEach(storedStack, function (pageData) {
        if ( !Pages.has(pageData[0]) ) {
          debug(pageData[0] + ' is not a known page', {type: 'alert'});
          App.load('home');
          return;
        }
      });

      try {
        addToStackNow(0, storedStack, true);
      }
      catch (err) {
        removeFromStackNow(0, stack.length);
        throw Error('failed to restore stack');
      }

      saveStack();

      try {
        App.load(lastPage[0], lastPage[1], lastPage[2], callback);
      }
      catch (err) {
        removeFromStackNow(0, stack.length);
        throw Error('failed to restore stack');
      }
    };
  }
}(window, document, App, App._Utils, App._Scroll, App._Pages);

App._Transitions = function (window, document, Swapper, App, Utils, Scroll, Pages, Stack) {
	var TRANSITION_CLASS                  = 'app-transition',
		DEFAULT_TRANSITION_IOS            = 'slide-left',
		DEFAULT_TRANSITION_ANDROID        = 'implode-out',
		DEFAULT_TRANSITION_ANDROID_OLD    = 'fade-on',
		DEFAULT_TRANSITION_ANDROID_GHETTO = 'instant',
		REVERSE_TRANSITION = {
			'instant'           : 'instant'           ,
			'fade'              : 'fade'              ,
			'fade-on'           : 'fade-off'          ,
			'fade-off'          : 'fade-on'           ,
			'scale-in'          : 'scale-out'         ,
			'scale-out'         : 'scale-in'          ,
			'rotate-left'       : 'rotate-right'      ,
			'rotate-right'      : 'rotate-left'       ,
			'cube-left'         : 'cube-right'        ,
			'cube-right'        : 'cube-left'         ,
			'swap-left'         : 'swap-right'        ,
			'swap-right'        : 'swap-left'         ,
			'explode-in'        : 'explode-out'       ,
			'explode-out'       : 'explode-in'        ,
			'implode-in'        : 'implode-out'       ,
			'implode-out'       : 'implode-in'        ,
			'slide-left'        : 'slide-right'       ,
			'slide-right'       : 'slide-left'        ,
			'slide-up'          : 'slide-down'        ,
			'slide-down'        : 'slide-up'          ,
			'slideon-left'      : 'slideoff-left'     ,
			'slideon-right'     : 'slideoff-right'    ,
			'slideon-up'        : 'slideoff-up'       ,
			'slideon-down'      : 'slideoff-down'     ,
			'slideoff-left'     : 'slideon-left'      ,
			'slideoff-right'    : 'slideon-right'     ,
			'slideoff-up'       : 'slideon-up'        ,
			'slideoff-down'     : 'slideon-down'      ,
			'slideon-left-ios'  : 'slideoff-right-ios',
			'glideon-right'     : 'glideoff-right'    ,
			'glideoff-right'    : 'slideon-right'     ,
			'glideon-left'      : 'glideoff-left'     ,
			'glideoff-left'     : 'slideon-left'      ,
			'glideon-down'      : 'glideoff-down'     ,
			'glideoff-down'     : 'slideon-down'      ,
			'glideon-up'        : 'glideoff-up'       ,
			'glideoff-up'       : 'slideon-up'
		},
		WALL_RADIUS = 10;


	var shouldDrag = false,
		defaultTransition, reverseTransition, dragLock;

	if (Utils.os.ios) {
		setDefaultTransition(DEFAULT_TRANSITION_IOS);
	} else if (Utils.os.android) {
		if (Utils.os.version >= 4) {
			setDefaultTransition(DEFAULT_TRANSITION_ANDROID);
		} else if ((Utils.os.version < 2.3) || /LT15a/i.test(navigator.userAgent)) {
			setDefaultTransition(DEFAULT_TRANSITION_ANDROID_GHETTO);
		} else {
			setDefaultTransition(DEFAULT_TRANSITION_ANDROID_OLD);
		}
	}

	checkForDragTransitionMetaTag();


	App.setDefaultTransition = function (transition) {
		if (typeof transition === 'object') {
			switch (Utils.os.name) {
				case 'android':
					if ((Utils.os.version < 4) && transition.androidFallback) {
						transition = transition.androidFallback;
					} else {
						transition = transition.android;
					}
					break;
				case 'ios':
					if ((Utils.os.version < 5) && transition.iosFallback) {
						transition = transition.iosFallback;
					} else {
						transition = transition.ios;
					}
					break;
				default:
					transition = transition.fallback;
					break;
			}
			if ( !transition ) {
				return;
			}
		}

		if (typeof transition !== 'string') {
			throw TypeError('transition must be a string if defined, got ' + transition);
		}

		if ( !(transition in REVERSE_TRANSITION) ) {
			throw TypeError('invalid transition type, got ' + transition);
		}

		setDefaultTransition(transition);
	};

	App.getDefaultTransition = function () {
		return defaultTransition;
	};

	App.getReverseTransition = function () {
		return reverseTransition;
	};

	App.enableDragTransition = function () {
		allowDragging();
	};


	return {
		REVERSE_TRANSITION : REVERSE_TRANSITION        ,
		run                : performTransition         ,
		enableDrag         : enableIOS7DragTransition  ,
		disableDrag        : disableIOS7DragTransition
	};



	function setDefaultTransition (transition) {
		defaultTransition = transition;
		reverseTransition = REVERSE_TRANSITION[defaultTransition];
	}

	function shouldUseNativeIOSTransition (transition) {
		if ( !Utils.os.ios ) {
			return false;
		} else if (transition === 'slide-left') {
			return true;
		} else if (transition === 'slide-right') {
			return true;
		} else {
			return false;
		}
	}



	function performTransition (oldPage, page, options, callback, reverse) {
		if ( !options.transition ) {
			options.transition = (reverse ? reverseTransition : defaultTransition);
		}
		var isIOS7SlideUp = (Utils.os.ios && (Utils.os.version >= 7) && { 'slideon-down':1, 'slideoff-down':1 }[options.transition]);
		if ( !options.duration ) {
			if ( !Utils.os.ios ) {
				options.duration = 270;
			} else if (Utils.os.version < 7) {
				options.duration = 325;
			} else if (isIOS7SlideUp) {
				options.duration = 475;
			} else {
				options.duration = 425;
			}
		}
		if (!options.easing && isIOS7SlideUp) {
			options.easing = 'cubic-bezier(0.4,0.6,0.05,1)';
		}
		if (Utils.os.ios && !options.easing && (options.transition === 'slideon-left-ios' || options.transition === 'slideoff-right-ios')) {
			if (Utils.os.version < 7) {
				options.easing = 'ease-in-out';
			} else {
				options.easing = 'cubic-bezier(0.4,0.6,0.2,1)';
			}
		}

		document.body.className += ' ' + TRANSITION_CLASS;

		if (options.transition === 'instant') {
			Swapper(oldPage, page, options, function () {
				//TODO: this is stupid. let it be synchronous if it can be.
				//TODO: fix the root of the race in core navigation.
				setTimeout(finish, 0);
			});
		} else if ( shouldUseNativeIOSTransition(options.transition) ) {
			performNativeIOSTransition(oldPage, page, options, finish);
		} else {
			Swapper(oldPage, page, options, finish);
		}

		function finish () {
			document.body.className = document.body.className.replace(new RegExp('\\b'+TRANSITION_CLASS+'\\b'), '');
			callback();
		}
	}



	function performNativeIOSTransition (oldPage, page, options, callback) {
		var slideLeft   = (options.transition === 'slide-left'),
			topPage     = slideLeft ? page : oldPage ,
			transitions = getNativeIOSTransitionList(page, oldPage, slideLeft);

		if ( !transitions ) {
			// proper iOS transition not possible, fallback to normal
			Swapper(oldPage, page, options, callback);
			return;
		}

		var oldPosition   = topPage.style.position,
			oldZIndex     = topPage.style.zIndex,
			oldBackground = topPage.style.background;
		topPage.style.position   = 'fixed';
		topPage.style.zIndex     = '4000';
		topPage.style.background = 'none';

		if (slideLeft) {
			oldPage.parentNode.insertBefore(page, oldPage);
		}
		else if (oldPage.nextSibling) {
			oldPage.parentNode.insertBefore(page, oldPage.nextSibling);
		}
		else {
			oldPage.parentNode.appendChild(page);
		}

		if (App._Pages) {
			App._Pages.fixContent(oldPage);
			App._Pages.fixContent(page);
		}

		if (Utils.os.version < 7) {
			options.easing = 'ease-in-out';
		} else {
			options.easing = 'cubic-bezier(0.4,0.6,0.2,1)';
		}

		Utils.animate(transitions, options.duration, options.easing, function () {
			oldPage.parentNode.removeChild(oldPage);

			topPage.style.position   = oldPosition;
			topPage.style.zIndex     = oldZIndex;
			topPage.style.background = oldBackground;

			callback();
		});
	}

	function getNativeIOSTransitionList (page, oldPage, slideLeft) {
		var currentBar     = oldPage.querySelector('.app-topbar'),
			currentTitle   = oldPage.querySelector('.app-topbar .app-title'),
			currentBack    = oldPage.querySelector('.app-topbar .left.app-button'),
			currentContent = oldPage.querySelector('.app-content'),
			newBar         = page.querySelector('.app-topbar'),
			newTitle       = page.querySelector('.app-topbar .app-title'),
			newBack        = page.querySelector('.app-topbar .left.app-button'),
			newContent     = page.querySelector('.app-content'),
			transitions    = [];

		if (!currentBar || !newBar || !currentContent || !newContent || !Utils.isVisible(currentBar) || !Utils.isVisible(newBar)) {
			return;
		}

		if (currentBack && (currentBack.getAttribute('data-noslide') !== null)) {
			currentBack = undefined;
		}
		if (newBack && (newBack.getAttribute('data-noslide') !== null)) {
			newBack = undefined;
		}

		// fade topbar
		if (slideLeft) {
			transitions.push({
				opacityStart : 0 ,
				opacityEnd   : 1 ,
				elem         : newBar
			});
		} else {
			transitions.push({
				opacityStart : 1 ,
				opacityEnd   : 0 ,
				elem         : currentBar
			});
		}

		// slide titles
		if (currentTitle) {
			transitions.push({
				transitionStart : 'translate3d(0,0,0)' ,
				transitionEnd   : 'translate3d('+getTitleTransform(newBack, slideLeft)+'px,0,0)' ,
				elem            : currentTitle
			});
		}
		if (newTitle) {
			transitions.push({
				transitionStart : 'translate3d('+getTitleTransform(currentBack, !slideLeft)+'px,0,0)' ,
				transitionEnd   : 'translate3d(0,0,0)' ,
				elem            : newTitle
			});
		}

		// slide back button
		if (Utils.os.version >= 5) {
			if (currentBack) {
				transitions.push({
					transitionStart : 'translate3d(0,0,0)' ,
					transitionEnd   : 'translate3d('+getBackTransform(currentBack, newBack, !slideLeft)+'px,0,0)' ,
					elem            : currentBack
				});
			}
			if (newBack) {
				transitions.push({
					transitionStart : 'translate3d('+getBackTransform(newBack, currentBack, slideLeft)+'px,0,0)' ,
					transitionEnd   : 'translate3d(0,0,0)' ,
					elem            : newBack
				});
			}
		}

		// slide contents
		if (Utils.os.version < 7) {
			transitions.push({
				transitionStart : 'translate3d(0,0,0)' ,
				transitionEnd   : 'translate3d('+(slideLeft?-100:100)+'%,0,0)' ,
				elem            : currentContent
			}, {
				transitionStart : 'translate3d('+(slideLeft?100:-100)+'%,0,0)' ,
				transitionEnd   : 'translate3d(0,0,0)' ,
				elem            : newContent
			});
		} else {
			transitions.push({
				transitionStart : 'translate3d(0,0,0)' ,
				transitionEnd   : 'translate3d('+(slideLeft?-30:100)+'%,0,0)' ,
				elem            : currentContent
			}, {
				transitionStart : 'translate3d('+(slideLeft?100:-30)+'%,0,0)' ,
				transitionEnd   : 'translate3d(0,0,0)' ,
				elem            : newContent
			});
		}

		return transitions;
	}

	function getBackTransform (backButton, oldButton, toCenter) {
		var fullWidth = backButton.textContent.length * (Utils.os.version<7?10:12),
			oldWidth  = oldButton ? (oldButton.textContent.length*15) : 0;
		if ( !toCenter ) {
			return (oldWidth-window.innerWidth) / 2;
		} else {
			return (window.innerWidth-fullWidth) / 2;
		}
	}

	function getTitleTransform (backButton, toLeft) {
		var fullWidth = 0;
		if (backButton && (Utils.os.version >= 5)) {
			fullWidth = backButton.textContent.length * (Utils.os.version<7?10:12);
		}
		if ( !toLeft ) {
			return (window.innerWidth / 2);
		} else {
			return (fullWidth-window.innerWidth) / 2;
		}
	}



	function allowDragging () {
		shouldDrag = true;
	}

	function checkForDragTransitionMetaTag() {
		var metas = document.querySelectorAll('meta');
		for (var i=0, l=metas.length; i<l; i++) {
			if ((metas[i].name === 'app-drag-transition') && (metas[i].content === 'true')) {
				allowDragging();
				return;
			}
		}
	}

	function enableIOS7DragTransition () {
		if (!shouldDrag || !Utils.os.ios || (Utils.os.version < 7)) {
			return;
		}

		var pages        = Stack.get().slice(-2),
			previousPage = pages[0],
			currentPage  = pages[1],
			draggingTouch, lastTouch, navigationLock, dead, slideLeft;
		if (!previousPage || !currentPage) {
			return;
		}

		var currentNode    = currentPage[3],
			currentBar     = currentPage[3].querySelector('.app-topbar'),
			currentTitle   = currentPage[3].querySelector('.app-topbar .app-title'),
			currentBack    = currentPage[3].querySelector('.app-topbar .left.app-button'),
			currentContent = currentPage[3].querySelector('.app-content'),
			oldNode        = previousPage[3],
			oldBar         = previousPage[3].querySelector('.app-topbar'),
			oldTitle       = previousPage[3].querySelector('.app-topbar .app-title'),
			oldBack        = previousPage[3].querySelector('.app-topbar .left.app-button'),
			oldContent     = previousPage[3].querySelector('.app-content');

		if (!currentNode || !currentBar || !currentContent || !oldNode || !oldBar || !oldContent) {
			return;
		}

		var dragableTransitions = ['slide-left', 'slideon-left-ios'];
		if ((dragableTransitions.indexOf(currentPage[4].transition) === -1) && (currentPage[4].transition || dragableTransitions.indexOf(defaultTransition) === -1)) {
			return;
		} else if ((currentPage[4].transition === 'slide-left') || (!currentPage[4].transition && 'slide-left' === defaultTransition)) {
			slideLeft = true;
		}

		var oldPosition   = currentPage[3].style.position,
			oldZIndex     = currentPage[3].style.zIndex,
			oldBackground = currentPage[3].style.background;
		currentPage[3].style.position   = 'fixed';
		currentPage[3].style.zIndex     = '4000';
		currentPage[3].style.background = oldBackground; //TODO: this sucks
		if (currentPage[3].nextSibling) {
			currentPage[3].parentNode.insertBefore(previousPage[3], currentPage[3].nextSibling);
		}
		else {
			currentPage[3].parentNode.appendChild(previousPage[3]);
		}

		Pages.fixContent(oldNode);
		Scroll.restoreScrollPosition(oldNode);

		window.addEventListener('touchstart' , startDrag , false);
		window.addEventListener('touchmove'  , dragMove  , false);
		window.addEventListener('touchcancel', finishDrag, false);
		window.addEventListener('touchend'   , finishDrag, false);

		var goBack = false;

		dragLock = function () {
			unbindListeners();
			cleanupElems();
		};

		function unbindListeners () {
			window.removeEventListener('touchstart' , startDrag );
			window.removeEventListener('touchmove'  , dragMove  );
			window.removeEventListener('touchcancel', finishDrag);
			window.removeEventListener('touchend'   , finishDrag);
		}

		function cleanupElems () {
			currentPage[3].style.position   = oldPosition;
			currentPage[3].style.zIndex     = oldZIndex;
			currentPage[3].style.background = oldBackground;
			if (previousPage[3].parentNode) {
				previousPage[3].parentNode.removeChild(previousPage[3]);
			}
		}

		function startDrag (e) {
			if (draggingTouch || navigationLock || dead) {
				return;
			}
			var touch = (e.touches && e.touches[0]);
			if (!touch || (touch.pageX > WALL_RADIUS)) {
				return;
			}

			if ( !Pages.fire(currentPage[2], currentPage[3], Pages.EVENTS.BEFORE_BACK) ) {
				return;
			}

			e.preventDefault();

			App._Navigation.enqueue(function (unlock) {
				navigationLock = unlock;
				//TODO: what if transition is already over?
			}, true);

			document.body.className += ' ' + TRANSITION_CLASS;

			draggingTouch = lastTouch = { x: touch.pageX, y: touch.pageY };

			currentBar.style.webkitTransition = 'all 0s linear';
			if (currentTitle) {
				currentTitle.style.webkitTransition = 'all 0s linear';
			}
			if (currentBack) {
				currentBack.style.webkitTransition = 'all 0s linear';
			}
			currentContent.style.webkitTransition = 'all 0s linear';
			oldBar.style.webkitTransition = 'all 0s linear';
			if (oldTitle) {
				oldTitle.style.webkitTransition = 'all 0s linear';
			}
			if (oldBack) {
				oldBack.style.webkitTransition = 'all 0s linear';
			}
			oldContent.style.webkitTransition = 'all 0s linear';
		}

		function dragMove (e) {
			if (draggingTouch && e.touches && e.touches[0] && !dead) {
				if (lastTouch) {
					goBack = (lastTouch.x < e.touches[0].pageX);
				}
				lastTouch = { x: e.touches[0].pageX, y: e.touches[0].pageY };

				var progress = Math.min(Math.max(0, (lastTouch.x-draggingTouch.x)/window.innerWidth), 1);
				setDragPosition(progress);
			}
		}

		function finishDrag (e) {
			if (!draggingTouch || !navigationLock || dead) {
				return;
			}

			unbindListeners();

			lastTouch = (e.touches && e.touches[0]) || lastTouch;
			var progess = 0;
			if (lastTouch) {
				progress = (lastTouch.x-draggingTouch.x)/window.innerWidth;
			}
			var dontTransition = ((progress < 0.1 && !goBack) || (0.9 < progress && goBack));

			if ( !dontTransition ) {
				currentBar.style.webkitTransitionDuration = '0.15s';
				if (currentTitle) {
					currentTitle.style.webkitTransitionDuration = '0.15s';
				}
				if (currentBack) {
					currentBack.style.webkitTransitionDuration = '0.15s';
				}
				currentContent.style.webkitTransitionDuration = '0.15s';
				oldBar.style.webkitTransitionDuration = '0.15s';
				if (oldTitle) {
					oldTitle.style.webkitTransitionDuration = '0.15s';
				}
				if (oldBack) {
					oldBack.style.webkitTransitionDuration = '0.15s';
				}
				oldContent.style.webkitTransitionDuration = '0.15s';
			}

			if (goBack) {
				Pages.fire(currentPage[2], currentPage[3], Pages.EVENTS.BACK);
				setDragPosition(1);
			} else {
				setDragPosition(0);
			}
			draggingTouch = lastTouch = null;

			if ( !dontTransition ) {
				currentPage[3].addEventListener('webkitTransitionEnd', finishTransition, false);
			} else {
				finishTransition();
			}

			function finishTransition () {
				currentPage[3].removeEventListener('webkitTransitionEnd', finishTransition);

				if (goBack) {
					if (currentPage[3].parentNode) {
						currentPage[3].parentNode.removeChild(currentPage[3]);
					}
				} else {
					if (previousPage[3].parentNode) {
						previousPage[3].parentNode.removeChild(previousPage[3]);
					}
				}

				currentPage[3].style.position   = oldPosition;
				currentPage[3].style.zIndex     = oldZIndex;
				currentPage[3].style.background = oldBackground;

				currentBar.style.webkitTransition = '';
				currentBar.style.webkitTransform = '';
				if (currentTitle) {
					currentTitle.style.webkitTransition = '';
					currentTitle.style.webkitTransform = '';
				}
				if (currentBack) {
					currentBack.style.webkitTransition = '';
					currentBack.style.webkitTransform = '';
				}
				currentContent.style.webkitTransition = '';
				currentContent.style.webkitTransform = '';
				oldBar.style.webkitTransition = '';
				oldBar.style.webkitTransform = '';
				if (oldTitle) {
					oldTitle.style.webkitTransition = '';
					oldTitle.style.webkitTransform = '';
				}
				if (oldBack) {
					oldBack.style.webkitTransition = '';
					oldBack.style.webkitTransform = '';
				}
				oldContent.style.webkitTransition = '';
				oldContent.style.webkitTransform = '';

				document.body.className = document.body.className.replace(new RegExp('\\b'+TRANSITION_CLASS+'\\b'), '');

				if (goBack) {
					Pages.startDestruction(currentPage[0], currentPage[2], currentPage[3], currentPage[1]);
					Pages.fixContent(oldNode);
					Scroll.restoreScrollStyle(oldNode);
					currentPage[2].showing = false
					Pages.fire(currentPage[2], currentPage[3], Pages.EVENTS.HIDE);
					previousPage[2].showing = true
					Pages.fire(previousPage[2], oldNode, Pages.EVENTS.SHOW);
					Pages.finishDestruction(currentPage[0], currentPage[2], currentPage[3], currentPage[1]);

					Stack.pop();
					App._Navigation.update();
				}

				dragLock = null;
				navigationLock();
			}
		}

		function setDragPosition (progress) {
			if (slideLeft) {
				currentBar.style.opacity = 1-progress;
				if (currentTitle) {
					currentTitle.style.webkitTransform = 'translate3d('+(progress*window.innerWidth/2)+'px,0,0)';
				}
				if (currentBack) {
					currentBack.style.webkitTransform = 'translate3d('+(progress*(window.innerWidth-currentBack.textContent.length*12)/2)+'px,0,0)';
				}
				if (oldTitle) {
					oldTitle.style.webkitTransform = 'translate3d('+((1-progress)*(window.innerWidth-currentBack.textContent.length*12)/-2)+'px,0,0)';
				}
				if (oldBack) {
					oldBack.style.webkitTransform = 'translate3d('+((1-progress)*-150)+'%,0,0)';
				}
			} else {
				currentBar.style.webkitTransform = 'translate3d('+(progress*100)+'%,0,0)';
				oldBar.style.webkitTransform = 'translate3d('+((1-progress)*-30)+'%,0,0)';
			}
			currentContent.style.webkitTransform = 'translate3d('+(progress*100)+'%,0,0)';
			oldContent.style.webkitTransform = 'translate3d('+((1-progress)*-30)+'%,0,0)';
		}
	}

	function disableIOS7DragTransition () {
		if (dragLock) {
			dragLock();
			dragLock = null;
		}
	}
}(window, document, Swapper, App, App._Utils, App._Scroll, App._Pages, App._Stack);

App._Navigation = function (window, document, App, Dialog, Scroll, Pages, Stack, Transitions) {
  var navQueue = [],
    navLock = false,
    current, currentNode;

  App.current = function () {
    return current;
  };

  App.load = function (pageName, args, options, callback) {
    $('.loading').show();
    if (typeof pageName !== 'string') {
      debug('page name must be a string, got ' + pageName, {type: 'alert'});
      App.load('home');
      return;
    }
    switch (typeof args) {
      case 'function':
        options = args;
        args = {};
      case 'string':
        callback = options;
        options = args;
      case 'undefined':
        args = {};
      case 'object':
        break;
      default:
        debug('page arguments must be an object if defined, got ' + args, {type: 'alert'});
        App.load('home');
        return;
    }
    switch (typeof options) {
      case 'function':
        callback = options;
      case 'undefined':
        options = {};
      case 'object':
        break;
      case 'string':
        options = { transition: options };
        break;
      default:
        debug('options must be an object if defined, got ' + options, {type: 'alert'});
        App.load('home');
        return;
    }
    switch (typeof callback) {
      case 'undefined':
        callback = function () {
        };
      case 'function':
        break;
      default:
        debug('callback must be a function if defined, got ' + callback, {type: 'alert'});
        App.load('home');
        return;
    }

    return loadPage(pageName, args, options, callback);
  };

  App.back = function (pageName, callback) {
    //debugger
    var item = null;
    try{
      if (App._Stack.size() === 0){
        App.load('home');
        return;
      } else if (App._CustomStack && App._CustomStack.length > 0){
        item = App._CustomStack.pop();
        App.load(item[0], item[1]);
        return;
      } else if(typeof pageName === 'undefined'){
        item = App._Stack.getBefore();
        if (item)
          App.back(item[0]);
        else
          App.back('home');
        return;
      }
      if (pageName === 'home'){
        App._Stack.destroy();
      }
    }catch(e){
      debug('【Error】App.back' + e);
    }

    switch (typeof pageName) {
      case 'function':
        callback = pageName;
      case 'undefined':
        pageName = undefined;
      case 'string':
        break;
      default:
        debug('pageName must be a string if defined, got ' + pageName, {type: 'alert'});
        App.load('home');
        return;
    }
    switch (typeof callback) {
      case 'undefined':
        callback = function () {
        };
      case 'function':
        break;
      default:
        debug('callback must be a function if defined, got ' + callback, {type: 'alert'});
        App.load('home');
        return;
    }

    return navigateBack(pageName, callback);
  };

  App.pick = function (pageName, args, options, loadCallback, callback) {
    if (typeof pageName !== 'string') {
      debug('page name must be a string, got ' + pageName, {type: 'alert'});
      App.load('home');
      return;
    }
    switch (typeof args) {
      case 'function':
        options = args;
        args = {};
      case 'string':
        callback = loadCallback;
        loadCallback = options;
        options = args;
      case 'undefined':
        args = {};
      case 'object':
        break;
      default:
        debug('page arguments must be an object if defined, got ' + args, {type: 'alert'});
        App.load('home');
        return;
    }
    switch (typeof options) {
      case 'function':
        callback = loadCallback;
        loadCallback = options;
      case 'undefined':
        options = {};
      case 'object':
        break;
      case 'string':
        options = { transition: options };
        break;
      default:
        debug('options must be an object if defined, got ' + options, {type: 'alert'});
        App.load('home');
        return;
    }
    if (typeof loadCallback !== 'function') {
      debug('callback must be a function, got ' + loadCallback, {type: 'alert'});
      App.load('home');
      return;
    }
    switch (typeof callback) {
      case 'undefined':
        callback = loadCallback;
        loadCallback = function () {
        };
      case 'function':
        break;
      default:
        debug('callback must be a function, got ' + callback, {type: 'alert'});
        App.load('home');
        return;
    }

    return pickPage(pageName, args, options, loadCallback, callback);
  };

  return {
    getCurrentNode: getCurrentNode,
    update: updateCurrentNode,
    enqueue: navigate
  };


  function navigate(handler, dragTransition) {
    if (navLock) {
      navQueue.push(handler);
      return false;
    }

    navLock = true;
    if (!dragTransition) {
      Transitions.disableDrag();
    }

    handler(function () {
      Stack.save();

      navLock = false;
      if (!processNavigationQueue()) {
        Transitions.enableDrag();
      }
    });

    return true;
  }

  function processNavigationQueue() {
    if (navQueue.length) {
      navigate(navQueue.shift());
      return true;
    } else {
      return false;
    }
  }


  function getCurrentNode() {
    return currentNode;
  }

  function updateCurrentNode() {
    var lastStackItem = Stack.getCurrent();
    current = lastStackItem[0]
    currentNode = lastStackItem[3];
  }

  function loadPage(pageName, args, options, callback, setupPickerMode) {
    //App.addHash('#/' + pageName);
    navigate(function (unlock) {
      var oldNode = currentNode,
        pageManager = Pages.createManager(false);

      if (setupPickerMode) {
        setupPickerMode(pageManager);
      }

      var page = Pages.startGeneration(pageName, pageManager, args),
        restoreData = Stack.getCurrent(),
        restoreNode = restoreData && restoreData[3],
        restoreManager = restoreData && restoreData[2];

      if (!options.transition && pageManager.transition) {
        options.transition = pageManager.transition;
      }

      Pages.populateBackButton(page, oldNode || restoreNode);

      if (!current) {
        App.restore = null;
        document.body.appendChild(page);
        Pages.fire(pageManager, page, Pages.EVENTS.LAYOUT);
        updatePageData();
        finish();
      } else {
        Scroll.saveScrollPosition(currentNode);
        var newOptions = {};
        for (var key in options) {
          newOptions[key] = options[key];
        }
        uiBlockedTask(function (unlockUI) {
          Transitions.run(currentNode, page, newOptions, function () {
            Pages.fixContent(page);
            unlockUI();
            finish();
          });
          Pages.fire(pageManager, page, Pages.EVENTS.LAYOUT);
        });
        //TODO: what if instant swap?
        updatePageData();
      }

      function updatePageData() {
        current = pageName;
        currentNode = page;
        Stack.push([ pageName, args, pageManager, page, options ]);
        if (oldNode && restoreManager) {
          Pages.fire(restoreManager, oldNode, Pages.EVENTS.FORWARD);
        }
      }

      function finish() {
        Scroll.saveScrollStyle(oldNode);
        Pages.finishGeneration(pageName, pageManager, page, args);

        unlock();
        callback();

        if (oldNode && restoreManager) {
          restoreManager.showing = false
          Pages.fire(restoreManager, oldNode, Pages.EVENTS.HIDE);
        }
        pageManager.showing = true;
        Pages.fire(pageManager, page, Pages.EVENTS.SHOW);
      }
    });

    if (!Pages.has(pageName)) {
      return false;
    }
  }

  function navigateBack(backPageName, callback) {
    if (typeof backPageName === 'undefined' || backPageName === 'undefined') return;
    App.addHash('#/' + backPageName); // 返回时此行不能删除
    App.addLoading();
    if (Dialog.status() && Dialog.close() && !backPageName) {
      callback();
      return;
    }

    var stack = Stack.get().map(function (page) {
      return page[0];
    });

    if (!stack.length) {
      throw Error(backPageName + ' is not currently in the stack, cannot go back to it');
    }

    if (backPageName) {
      var index = -1;
      for (var i = stack.length - 1; i >= 0; i--) {
        if (stack[i] === backPageName) {
          index = i;
          break;
        }
      }
      if (index === -1) {
        App._Stack.destroy();
        App.load('home');
        console.log('【Error】' + backPageName + ' is not currently in the stack, cannot go back to it');
        return;
      }
      if (index !== stack.length - 2) {
        App.removeFromStack(index + 1);
      }
    }

    var stackLength = stack.length,
      cancelled = false;

    var navigatedImmediately = navigate(function (unlock) {
      if (Stack.size() < 2) {
        unlock();
        return;
      }

      var oldPage = Stack.getCurrent();

      if (!Pages.fire(oldPage[2], oldPage[3], Pages.EVENTS.BEFORE_BACK)) {
        cancelled = true;
        unlock();
        return;
      }
      else {
        Stack.pop();
      }

      var data = Stack.getCurrent(),
        pageName = data[0],
        page = data[3],
        oldOptions = oldPage[4];

      //App.addHash('#/' + pageName);

      Pages.fire(oldPage[2], oldPage[3], Pages.EVENTS.BACK);

      Pages.fixContent(page);

      Pages.startDestruction(oldPage[0], oldPage[2], oldPage[3], oldPage[1]);

      Scroll.restoreScrollPosition(page);

      var newOptions = {};
      for (var key in oldOptions) {
        if (key === 'transition') {
          newOptions[key] = Transitions.REVERSE_TRANSITION[ oldOptions[key] ] || oldOptions[key];
        }
        else {
          newOptions[key] = oldOptions[key];
        }
      }

      uiBlockedTask(function (unlockUI) {
        Transitions.run(currentNode, page, newOptions, function () {
          Pages.fixContent(page);
          Scroll.restoreScrollStyle(page);
          unlockUI();

          oldPage[2].showing = false
          Pages.fire(oldPage[2], oldPage[3], Pages.EVENTS.HIDE);
          data[2].showing = true
          Pages.fire(data[2], page, Pages.EVENTS.SHOW);

          setTimeout(function () {
            Pages.finishDestruction(oldPage[0], oldPage[2], oldPage[3], oldPage[1]);

            unlock();
            callback();
          }, 0);
        }, true);
        Pages.fixContent(page);
        Pages.fire(data[2], page, Pages.EVENTS.LAYOUT);
      });

      current = pageName;
      currentNode = page;
    });

    if (cancelled || (navigatedImmediately && (stackLength < 2))) {
      return false;
    }
  }

  function pickPage(pageName, args, options, loadCallback, callback) {
    var finished = false;
    loadPage(pageName, args, options, loadCallback, function (pageManager) {
      pageManager.restorable = false;
      pageManager.reply = function () {
        if (!finished) {
          finished = true;
          if (!pageManager._appNoBack) {
            navigateBack(undefined, function () {
            });
          }
          callback.apply(App, arguments);
        }
      };
    });
  }


  // blocks UI interaction during some aysnchronous task
  // is not locked because multiple calls dont effect eachother
  function uiBlockedTask(task) {
    var taskComplete = false;

    var clickBlocker = document.createElement('div');
    clickBlocker.className = 'app-clickblocker';
    document.body.appendChild(clickBlocker);
    clickBlocker.addEventListener('touchstart', function (e) {
      e.preventDefault();
    }, false);

    task(function () {
      if (taskComplete) {
        return;
      }
      taskComplete = true;

      document.body.removeChild(clickBlocker);
    });
  }
}(window, document, App, App._Dialog, App._Scroll, App._Pages, App._Stack, App._Transitions);

/**
 * @description api
 * @class api
 * @author yongjin<zjut_wyj@163.com> 2015/2/3
 */
function hash(str) {
  var hash = 5381,
    i = str.length

  while (i)
    hash = (hash * 33) ^ str.charCodeAt(--i)

  /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
   * integers. Since we want the results to be always positive, convert the
   * signed int to an unsigned by doing an unsigned bitshift. */
  return hash >>> 0;
}
App.query = function (query, options) {
  try {
    var params = '';
    if (options.data) {
      for (var key in options.data) {
        params += options.data[key];
      }
    }
    debug('【Query】:' + CONST.API + query + '?' + params);
    var cacheId = options.data ? ('_hash' + hash(query) + params) : '_hash' + hash(query);
    if (options.cache && App.getCache(cacheId)) {
      options.success && options.success.call(this, App.getCache(cacheId));
    } else {
      return $.ajax({
        type: 'post',
        url: CONST.API + query,
        data: options.data,
        success: function (result) {
          if (options.cache) App.addCache(cacheId, result);
          App.trigger('queryEvent', cacheId); // 触发事件
          options.success && options.success.call(this, result);
        }
      });
    }
  } catch (e) {
  }
}
