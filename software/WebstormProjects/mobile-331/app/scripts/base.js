!function(e,t){function n(e){return function(t){return{}.toString.call(t)=="[object "+e+"]"}}function r(){return A++}function i(e){return e.match(C)[0]}function o(e){for(e=e.replace(I,"/"),e=e.replace(k,"$1/");e.match(T);)e=e.replace(T,"/");return e}function a(e){var t=e.length-1,n=e.charAt(t);return"#"===n?e.substring(0,t):".js"===e.substring(t-2)||e.indexOf("?")>0||"/"===n?e:e+".js"}function u(e){var t=F.alias;return t&&x(t[e])?t[e]:e}function c(e){var t,n=F.paths;return n&&(t=e.match(O))&&x(n[t[1]])&&(e=n[t[1]]+t[2]),e}function s(e){var t=F.vars;return t&&e.indexOf("{")>-1&&(e=e.replace(_,function(e,n){return x(t[n])?t[n]:e})),e}function l(e){var t=F.map,n=e;if(t)for(var r=0,i=t.length;i>r;r++){var o=t[r];if(n=j(o)?o(e)||e:e.replace(o[0],o[1]),n!==e)break}return n}function f(e,t){var n,r=e.charAt(0);if(S.test(e))n=e;else if("."===r)n=o((t?i(t):F.cwd)+e);else if("/"===r){var a=F.cwd.match(L);n=a?a[0]+e.substring(1):e}else n=F.base+e;return 0===n.indexOf("//")&&(n=location.protocol+n),n}function d(e,t){if(!e)return"";e=u(e),e=c(e),e=s(e),e=a(e);var n=f(e,t);return n=l(n)}function h(e){return e.hasAttribute?e.src:e.getAttribute("src",4)}function p(e,t,n){var r=R.createElement("script");if(n){var i=j(n)?n(e):n;i&&(r.charset=i)}g(r,t,e),r.async=!0,r.src=e,B=r,H?P.insertBefore(r,H):P.appendChild(r),B=null}function g(e,t,n){function r(){e.onload=e.onerror=e.onreadystatechange=null,F.debug||P.removeChild(e),e=null,t()}var i="onload"in e;i?(e.onload=r,e.onerror=function(){D("error",{uri:n,node:e}),r()}):e.onreadystatechange=function(){/loaded|complete/.test(e.readyState)&&r()}}function v(){if(B)return B;if(U&&"interactive"===U.readyState)return U;for(var e=P.getElementsByTagName("script"),t=e.length-1;t>=0;t--){var n=e[t];if("interactive"===n.readyState)return U=n}}function m(e){var t=[];return e.replace(G,"").replace(X,function(e,n,r){r&&t.push(r)}),t}function y(e,t){this.uri=e,this.dependencies=t||[],this.exports=null,this.status=0,this._waitings={},this._remain=0}if(!e.seajs){var b=e.seajs={version:"2.3.0"},F=b.data={},w=n("Object"),x=n("String"),E=Array.isArray||n("Array"),j=n("Function"),A=0,$=F.events={};b.on=function(e,t){var n=$[e]||($[e]=[]);return n.push(t),b},b.off=function(e,t){if(!e&&!t)return $=F.events={},b;var n=$[e];if(n)if(t)for(var r=n.length-1;r>=0;r--)n[r]===t&&n.splice(r,1);else delete $[e];return b};var D=b.emit=function(e,t){var n=$[e];if(n){n=n.slice();for(var r=0,i=n.length;i>r;r++)n[r](t)}return b},C=/[^?#]*\//,I=/\/\.\//g,T=/\/[^/]+\/\.\.\//,k=/([^:/])\/+\//g,O=/^([^/:]+)(\/.+)$/,_=/{([^{]+)}/g,S=/^\/\/.|:\//,L=/^.*?\/\/.*?\//,R=document,z=location.href&&0!==location.href.indexOf("about:")?i(location.href):"",M=R.scripts,N=R.getElementById("seajsnode")||M[M.length-1],q=i(h(N)||z);b.resolve=d;var B,U,P=R.head||R.getElementsByTagName("head")[0]||R.documentElement,H=P.getElementsByTagName("base")[0];b.request=p;var V,X=/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g,G=/\\\\/g,K=b.cache={},W={},Z={},Y={},J=y.STATUS={FETCHING:1,SAVED:2,LOADING:3,LOADED:4,EXECUTING:5,EXECUTED:6};y.prototype.resolve=function(){for(var e=this,t=e.dependencies,n=[],r=0,i=t.length;i>r;r++)n[r]=y.resolve(t[r],e.uri);return n},y.prototype.load=function(){var e=this;if(!(e.status>=J.LOADING)){e.status=J.LOADING;var n=e.resolve();D("load",n);for(var r,i=e._remain=n.length,o=0;i>o;o++)r=y.get(n[o]),r.status<J.LOADED?r._waitings[e.uri]=(r._waitings[e.uri]||0)+1:e._remain--;if(0===e._remain)return e.onload(),t;var a={};for(o=0;i>o;o++)r=K[n[o]],r.status<J.FETCHING?r.fetch(a):r.status===J.SAVED&&r.load();for(var u in a)a.hasOwnProperty(u)&&a[u]()}},y.prototype.onload=function(){var e=this;e.status=J.LOADED,e.callback&&e.callback();var t,n,r=e._waitings;for(t in r)r.hasOwnProperty(t)&&(n=K[t],n._remain-=r[t],0===n._remain&&n.onload());delete e._waitings,delete e._remain},y.prototype.fetch=function(e){function n(){b.request(a.requestUri,a.onRequest,a.charset)}function r(){delete W[u],Z[u]=!0,V&&(y.save(o,V),V=null);var e,t=Y[u];for(delete Y[u];e=t.shift();)e.load()}var i=this,o=i.uri;i.status=J.FETCHING;var a={uri:o};D("fetch",a);var u=a.requestUri||o;return!u||Z[u]?(i.load(),t):W[u]?(Y[u].push(i),t):(W[u]=!0,Y[u]=[i],D("request",a={uri:o,requestUri:u,onRequest:r,charset:F.charset}),a.requested||(e?e[a.requestUri]=n:n()),t)},y.prototype.exec=function(){function e(t){return y.get(e.resolve(t)).exec()}var n=this;if(n.status>=J.EXECUTING)return n.exports;n.status=J.EXECUTING;var i=n.uri;e.resolve=function(e){return y.resolve(e,i)},e.async=function(t,n){return y.use(t,n,i+"_async_"+r()),e};var o=n.factory,a=j(o)?o(e,n.exports={},n):o;return a===t&&(a=n.exports),delete n.factory,n.exports=a,n.status=J.EXECUTED,D("exec",n),a},y.resolve=function(e,t){var n={id:e,refUri:t};return D("resolve",n),n.uri||b.resolve(n.id,t)},y.define=function(e,n,r){var i=arguments.length;1===i?(r=e,e=t):2===i&&(r=n,E(e)?(n=e,e=t):n=t),!E(n)&&j(r)&&(n=m(""+r));var o={id:e,uri:y.resolve(e),deps:n,factory:r};if(!o.uri&&R.attachEvent){var a=v();a&&(o.uri=a.src)}D("define",o),o.uri?y.save(o.uri,o):V=o},y.save=function(e,t){var n=y.get(e);n.status<J.SAVED&&(n.id=t.id||e,n.dependencies=t.deps||[],n.factory=t.factory,n.status=J.SAVED,D("save",n))},y.get=function(e,t){return K[e]||(K[e]=new y(e,t))},y.use=function(t,n,r){var i=y.get(r,E(t)?t:[t]);i.callback=function(){for(var t=[],r=i.resolve(),o=0,a=r.length;a>o;o++)t[o]=K[r[o]].exec();n&&n.apply(e,t),delete i.callback},i.load()},b.use=function(e,t){return y.use(e,t,F.cwd+"_use_"+r()),b},y.define.cmd={},e.define=y.define,b.Module=y,F.fetchedList=Z,F.cid=r,b.require=function(e){var t=y.get(y.resolve(e));return t.status<J.EXECUTING&&(t.onload(),t.exec()),t.exports},F.base=q,F.dir=q,F.cwd=z,F.charset="utf-8",b.config=function(e){for(var t in e){var n=e[t],r=F[t];if(r&&w(r))for(var i in n)r[i]=n[i];else E(r)?n=r.concat(n):"base"===t&&("/"!==n.slice(-1)&&(n+="/"),n=f(n)),F[t]=n}return D("config",e),b}}}(this),function(){function e(e){u[e.name]=e}function t(e){return e&&u.hasOwnProperty(e)}function n(e){for(var n in u)if(t(n)){var r=","+u[n].ext.join(",")+",";if(r.indexOf(","+e+",")>-1)return n}}function r(e,t){var n=a.XMLHttpRequest?new a.XMLHttpRequest:new a.ActiveXObject("Microsoft.XMLHTTP");return n.open("GET",e,!0),n.onreadystatechange=function(){if(4===n.readyState){if(n.status>399&&n.status<600)throw new Error("Could not load: "+e+", status = "+n.status);t(n.responseText)}},n.send(null)}function i(e){e&&/\S/.test(e)&&(a.execScript||function(e){(a.eval||eval).call(a,e)})(e)}function o(e){return e.replace(/(["\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")}var a=window,u={},c={};e({name:"text",ext:[".tpl",".html"],exec:function(e,t){i('define("'+e+'#", [], "'+o(t)+'")')}}),e({name:"json",ext:[".json"],exec:function(e,t){i('define("'+e+'#", [], '+t+")")}}),e({name:"handlebars",ext:[".handlebars"],exec:function(e,t){var n=['define("'+e+'#", ["handlebars"], function(require, exports, module) {','  var source = "'+o(t)+'"','  var Handlebars = require("handlebars")["default"]',"  module.exports = function(data, options) {","    options || (options = {})","    options.helpers || (options.helpers = {})","    for (var key in Handlebars.helpers) {","      options.helpers[key] = options.helpers[key] || Handlebars.helpers[key]","    }","    return Handlebars.compile(source)(data, options)","  }","})"].join("\n");i(n)}}),seajs.on("resolve",function(e){var r=e.id;if(!r)return"";var i,o;(o=r.match(/^(\w+)!(.+)$/))&&t(o[1])?(i=o[1],r=o[2]):(o=r.match(/[^?]+(\.\w+)(?:\?|#|$)/))&&(i=n(o[1])),i&&-1===r.indexOf("#")&&(r+="#");var a=seajs.resolve(r,e.refUri);i&&(c[a]=i),e.uri=a}),seajs.on("request",function(e){var t=c[e.uri];t&&(r(e.requestUri,function(n){u[t].exec(e.uri,n),e.onRequest()}),e.requested=!0)}),define("seajs/seajs-text/1.1.1/seajs-text-debug",[],{})}(),function(){"use strict";function e(e,t){this._chain=!!t,this._wrapped=e}function t(e){return e}function n(e,t,n){var r,i,o=!1,a=!1;if(null==e)return e;if(t=mn(t,n),e.length===+e.length)for(r=0,i=e.length;i>r&&(o=0===r?!0:!1,a=r===i-1?!0:!1,t(e[r],r,e,o,a)!==!1);r++);else{var u=at(e);for(r=0,i=u.length;i>r&&(o=0===r?!0:!1,a=r===u.length-1?!0:!1,t(e[u[r]],u[r],e,r,o,a)!==!1);r++);}return e}function r(e){function t(){}if(null==e)throw TypeError();if(Object.create)return Object.create(e);var n=typeof e;if("object"!==n&&"function"!==n)throw TypeError();return t.prototype=e,new t}function i(e){function t(e){if("pending"===u)return void s.push(e);var t,n="fulfilled"===u?e.onFulfilled:e.onRejected;if(null===n)return n="fulfilled"===u?e.resolve:e.reject,void n(c);try{t=n(c),e.resolve(t)}catch(r){e.reject(r)}}function r(e){if(e&&("object"==typeof e||"function"==typeof e)){var t=e.then;if("function"==typeof t)return void t.call(e,r,o)}u="fulfilled",c=e,a()}function o(e){u="rejected",c=e,a()}function a(){setTimeout(function(){n(s,function(e){t(e)})},0)}var u="pending",c=null,s=[];this.then=function(e,n){return new i(function(r,i){t({onFulfilled:e||null,onRejected:n||null,resolve:r,reject:i})})},e(r,o)}function o(e){return bn[typeof e]||bn[Yt.call(e)]||(e?"object":"null")}function a(e){if(null===e)return"null";var t=typeof e;switch(t){case"function":case"object":if(e.constructor){if(e.constructor.name)return e.constructor.name;var n=e.constructor.toString().match(/^function (.+)\(.*$/);if(n)return n[1]}return Yt.call(e).match(/^\[object (.+)\]$/)[1];default:return t}}function u(e,t){function r(e,t){return n(t,function(n){return n in e?1!==t.length?(t.shift(),r(e[n],t),!1):void(a=e[n]):!1}),a}var i,a;return arguments.length<2||"string"!==o(t)?void console.error("参数不能少于2个， 且path为字符串"):(i=t.split("."),r(e,i))}function c(e,t,r){function i(e,t,r){n(t,function(n){return n in e||(e[n]={}),1!==t.length?(t.shift(),i(e[n],t,r),!1):void(e[n]=r)})}if(arguments.length<3||"string"!==o(t))return!1;var a=t.split(".");i(e,a,r)}function s(e){var t={},n=".";for(var r in e){var i=e[r];if(!i||i.constructor!==Object&&i.constructor!==Array||l(i))t[r]=i;else{var o=s(i);for(var a in o){var u=o[a];t[r+n+a]=u}}}return t}function l(e){var t=!0;if("number"===o(e))return!1;if(!e)return t;var r=Yt.call(e),i=e.length;return"[object Array]"==r||"[object String]"==r||"[object Arguments]"==r||"[object Object]"==r&&"number"==typeof i&&gn.isFunction(e.splice)?!i:(n(e,function(){return t=!1}),t)}function f(e){return function(){return e}}function d(e){return function(t,n){e(n,t)}}function h(e,t){return null!=e&&Jt.call(e,t)}function p(e){var t,n=typeof e;return"object"==n&&null!==e?"function"==typeof(t=e.$$hashKey)?t=e.$$hashKey():void 0===t&&(t=e.$$hashKey=O()):t=e,n+":"+t}function g(e,t){t?e.$$hashKey=t:delete e.$$hashKey}function v(e,t,r){var i,a={};if("function"===o(t))for(i in e){var u=e[i];t.call(r,u,i,e)&&(a[i]=u)}else{var c=Qt.apply([],Wt.call(arguments,1));n(c,function(t){t in e&&(a[t]=e[t])})}return a}function m(e){return function(t){return t[e]}}function y(e,t){return pt(e,m(t),null)}function b(e,t){if("function"!==o(e))throw new TypeError;return setTimeout(function(){e.apply(void 0,Wt.call(arguments))},t)}function F(e){var t=on[e];if(!t.entity){for(var n=[],r=0;r<t.dependencies.length;r++)n.push(on[t.dependencies[r]].entity?on[t.dependencies[r]].entity:this.use(t.dependencies[r]));t.entity=t.factory.apply(un,n)}return t.entity}function w(e){e.length=0,sn.length<cn&&sn.push(e)}function x(e){e.array=e.cache=e.criteria=e.object=e.number=e.string=e.value=null,ln.length<cn&&ln.push(e)}function E(){return sn.pop()||[]}function j(){return ln.pop()||{array:null,cache:null,criteria:null,"false":!1,index:0,"null":!1,number:null,object:null,push:null,string:null,"true":!1,undefined:!1,value:null}}function A(e,t,r,i,a){var u=o(e);if(r){var c=r(e);if("undefined"!=typeof c)return c}if("object"!=typeof e||"null"===u)return e;switch(u){case"function":return e;case"date":return new Date(+e);case"string":return new String(e);case"regexp":c=RegExp(e.source,/\w*$/.exec(e)),c.lastIndex=e.lastIndex}var s="array"===u;if(t){var l=!i;i||(i=E()),a||(a=E());for(var f=i.length;f--;)if(i[f]===e)return a[f];c=s?Array(e.length):{}}else c=s?yt(e,0,e.length):extend({},e);return s&&(Jt.call(e,"index")&&(c.index=e.index),Jt.call(e,"input")&&(c.input=e.input)),t?(i.push(e),a.push(c),n(e,function(e,n){c[n]=A(e,t,r,i,a)}),l&&(w(i),w(a)),c):c}function $(e,t,n){return t="function"===o(t)&&vn(t,n,1),A(e,!1,t)}function D(e,t,n){return t="function"===o(t)&&vn(t,n,1),A(e,!0,t)}function C(e){this.value=[].slice.call(e)}function I(e,t,n){return function(){var r,i=!1,o=[].slice.call(arguments);return"function"==typeof t&&(r=t.apply(this,o),r instanceof gn.setArguments?o=r.value:(i=void 0!==r)&&o.push(r)),!i&&o.push(e.apply(this,o)),r="function"==typeof n?n.apply(this,o.concat(i)):void 0,void 0!==r?r:o.pop()}}function T(e,t,n){return"function"===gn.typeOf(e[t])?e[t](n):void console.log("No request handler found for "+t)}function k(e,t){var n,r=!0;switch(t){case"cellphone":n=/((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;break;case"email":n=/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;break;case"url":n=/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;break;case"number":n=/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/;break;case"digits":n=/^\d+$/}return"array"===this.typeOf(e)?this.each(e,function(e){n.test(e)||(r=!1)}):r=n.test(e),r}function O(e){var t,n=nn.length;for("undefined"===o(e)&&(e="");n;){if(n--,t=nn[n].charCodeAt(0),57==t)return nn[n]="A",e+nn.join("");if(90!=t)return nn[n]=String.fromCharCode(t+1),e+nn.join("");nn[n]="0"}return nn.unshift("0"),e+nn.join("")}function _(e){return null==e?"":e.replace(/^[^1-9]+/,"")}function S(e,t,n){var r=t.length+e.length-1;return t+new Array(n-r).join("0")+e}function L(e){return"string"===o(e)?e.toLowerCase():e}function R(e){return"string"===o(e)?e.toUpperCase():e}function z(e,t){for(var n=e,r="";t>0&&(t%2==1&&(r+=n),1!=t);)n+=n,t>>=1;return r}function M(e,t,n){return n?(n+e+n).indexOf(n+t+n)>-1:e.indexOf(t)>-1}function N(e,t,n){var r=e.substr(0,t.length);return n?r.toLowerCase()===t.toLowerCase():r===t}function q(e,t,n){var r=e.substring(e.length-t.length);return n?r.toLowerCase()===t.toLowerCase():r===t}function B(e,t){t=t?t:2;var n=new Array(t+1).join("-");return e.replace(/[^\x00-\xff]/g,n).length}function U(e,t,n){return t=t||30,n=void 0===n?"...":n,e.length>t?e.slice(0,t-n.length)+n:String(e)}function P(e,t,n){function r(e){var t=e/2|0;return t>0?t:1}if(l(e))return"";if(!(e+"").length||!t||0>=+t)return"";var t=+t,n="undefined"==typeof n?"...":n.toString(),i=this.byteLen(n);i>t&&(n="",i=0);for(var o=t-i,a=0,u=0;o>=u;){var c=r(o-u),s=this.byteLen(e.substr(a,c));if(0==s)return e;u+=s,a+=c}return e.length-a>i||this.byteLen(e.substring(a-1))>i?e.substr(0,a-1)+n:e}function H(e,t,n){var r=n?"<"+t+"[^>]*>([\\S\\s]*?)<\\/"+t+">":"</?"+t+"[^>]*>";return String(e||"").replace(new RegExp(r,"img"),"")}function V(e){return String(e||"").replace(/<script[^>]*>([\S\s]*?)<\/script>/gim,"")}function X(e){return String(e||"").replace(/<[^>]+>/gim,"")}function G(e){return e.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;").replace(/'/gm,"&#39;")}function K(e){return e=e||"",e.replace(/&amp;/gm,"&").replace(/&lt;/gm,"<").replace(/&gt;/gm,">").replace(/&quot;/gm,'"').replace(/&#([\d]+);/gm,function(e,t){return String.fromCharCode(parseInt(t,10))})}function W(e){return e.replace(/([-.*+?^${}()|[\]\/\\])/gim,"\\$1")}function Z(e,t,n,r,i,o){var a=e.toString(i||10),u="",c=t;if(o&&o.prefix&&(c=t-o.prefix.length,u=o.prefix,0>c))throw new Error("n too small");for(n=n||"0";a.length<c;)r?a+=n:a=n+a;return u+a}function Y(e,t){var n=Array.prototype.slice.call(arguments,1);return e.replace(/\\?\#{([^{}]+)\}/gm,function(e,r){if("\\"==e.charAt(0))return e.slice(1);var i=Number(r);return i>=0?n[i]:t&&void 0!==t[r]?t[r]:""})}function J(e,t){var n=/\W/.test(e)?new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+e.replace(/[\r\t\n]/g," ").split("{{").join("	").replace(/((^|}})[^\t]*)'/g,"$1\r").replace(/\t(.*?)}}/g,"',$1,'").split("	").join("');").split("}}").join("p.push('").split("\r").join("\\'")+"');}return p.join('');"):fn[e]=fn[e]||J(e);return t?n(t):n}function Q(e){for(var t=0;t<e.length;t++)if(-1===tn.indexOf(e.charAt(t))){e=e.substring(t);break}return-1===tn.indexOf(e.charAt(0))?e:""}function et(e){for(var t=e.length-1;t>=0;t--)if(-1===tn.lastIndexOf(e.charAt(t))){e=e.substring(0,t+1);break}return-1===tn.lastIndexOf(e.charAt(e.length-1))?e:""}function tt(e){if(l(e))return null;for(var t=0;t<e.length;t++)if(-1===tn.indexOf(e.charAt(t))){e=e.substring(t);break}for(t=e.length-1;t>=0;t--)if(-1===tn.lastIndexOf(e.charAt(t))){e=e.substring(0,t+1);break}return-1===tn.indexOf(e.charAt(0))?e:""}function nt(e){return e.toString().replace(/\s*/gm,"")}function rt(e){e=e.split("");for(var t="",n=e.length;n--;)t+=e[n];return t}function it(e,t){return!!e.splice(t,1).length}function ot(e,t){var n=vt(e,t);return-1!==n&&e.splice(n,1),t}function at(e){if("object"!==o(e))return[];if(en)return en(e);var t=[];for(var n in e)h(e,n)&&t.push(n);return t}function ut(e){return function(t){if(null==t)return l(e);if(t===e)return!0;for(var n in e)if(e[n]!==t[n])return!1;return!0}}function ct(e,t,r){var i=[];if(!e)return yn;var o=vn(t,r);return n(e,function(e,t,n){o(e,t,n)&&i.push(e)}),i}function st(e,t,n){var r=-1,i=e?e.length:0;for(t=vn(t,n);++r<i;)if(t(e[r],r,e))return r;return-1}function lt(e,t,r){var i={};return n(e,function(e){"undefined"!==o(e[t])&&(i[e[t]]=e[r])}),i}function ft(e,t,r){var i=[];return"object"!==o(e)?[]:(n(e,function(e,n){var o={};o[t]=n,o[r]=e,i.push(o)}),i)}function dt(e,t,n,r){if(0>t||t>e.length||0>n||n>e.length)throw new Error("method exchange: thisdx or targetdx is invalid !");var i=e[t],o=e[n],a=i,s=0;r&&"string"==typeof r.column&&(s=u(i,r.column),c(i,r.column,u(o,r.column)),c(o,r.column,s)),r&&"function"==typeof r.callback&&r.callback.apply(null,[i,o]),e[t]=o,e[n]=a}function ht(e,t,n,r){var i=[];if(n>t){for(var o=t;n-1>o;o++)dt(e,o,o+1,{column:r.column});i=e.slice(0).slice(t,n)}else{for(var o=t;o>n;o--)dt(e,o,o-1,{column:r.column});i=e.slice(0).slice(n,t+1)}"function"==typeof r.callback&&r.callback.apply(null,[i])}function pt(e,t,r){var i=[];return null===e?i:(t=vn(t,r),n(e,function(e,n,r){i.push(t(e,n,r))}),i)}function gt(e){var t,n={},r=e.split(",");for(t=0;t<r.length;t++)n[r[t]]=!0;return n}function vt(e,t){if(e.indexOf)return e.indexOf(t);for(var n=0,r=e.length;r>n;n++)if(t===e[n])return n;return-1}function mt(e,t,r){var i=-1,a="array"===o(t),u=e?e.length:0,c=Array("number"==typeof u?u:0);return a||(t=vn(t,r)),n(e,function(e,n,r){var o=c[++i]={};a?o.criteria=pt(t,function(t){return e[t]}):(o.criteria=[])[0]=t(e,n,r),o.index=i,o.value=e}),u=c.length,c.sort(function(e,t){for(var n=e.criteria,r=t.criteria,i=-1,o=n.length;++i<o;){var a=n[i],u=r[i];if(a!==u){if(a>u||"undefined"==typeof a)return 1;if(u>a||"undefined"==typeof u)return-1}}return e.index-t.index}),y(c,"value")}function yt(e,t,n){t||(t=0),"undefined"==typeof n&&(n=t<e.length-1?t+1:e.length);for(var r=-1,i=n-t||0,o=Array(0>i?0:i);++r<i;)o[r]=e[t+r];return o}function bt(e,t){if(!gn.isEmpty(e)){var n=e.substring(e.lastIndexOf(".")+1,e.length),r=e.lastIndexOf("_")>0?!0:!1;return e.substring(0,e.lastIndexOf(r?"_":"."))+"_"+t+"."+n}}function Ft(e,t,n,r,i){var o=parseInt(e,10),a=parseInt(t,10),u=parseInt(n,10),c=parseInt(r,10),i=i||!1,s={width:u,height:c,marginTop:0,marginLeft:0};if(0!=o&&0!=a){var l=u/o,f=c/a;s=!i&&l/f>1.5?{width:"auto",height:c,marginTop:0,marginLeft:Math.abs((u-o*f)/2)}:!i&&f/l>1.5?{width:u,height:"auto",marginTop:Math.abs((c-a*l)/2),marginLeft:0}:f>l?{width:o*f,height:c,marginTop:0,marginLeft:-(o*f-u)/2}:l>f?{width:u,height:a*l,marginTop:-(a*l-c)/2,marginLeft:0}:{width:u,height:c,marginTop:-(a*f-c)/2,marginLeft:-(o*f-u)/2}}return s}function wt(e){var t=e.inputFile,n=t.files,r=e.imgNode,i=0,o=null;try{if(n&&n[0])for(var a=n.length;a>i;){if(o=n[i],o.type.match("image.*")){var u=new FileReader;u.readAsDataURL(o),u.onloadend=function(){r.src=this.result}}i++}else{t.select();var c=document.selection.createRange().text,s=document.getElementById("localImag");s.style.width="96px",s.style.height="96px";try{s.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)",s.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src=c}catch(l){return alert("您上传的图片格式不正确，请重新选择!"),!1}r.style.display="none",document.selection.empty()}}catch(l){console.error(l)}return!0}function xt(e){if(!e.canvas)throw"A canvas is required";if(!e.image)throw"Image is required";var t=e.canvas,n=e.context2D,r=e.image,i=e.srcx||0,o=e.srcy||0,a=e.srcw||r.naturalWidth,u=e.srch||r.naturalHeight,c=e.desx||i,s=e.desy||o,l=e.desw||a,f=e.desh||u,d=e.auto,h=window.devicePixelRatio||1,p=n.webkitBackingStorePixelRatio||n.mozBackingStorePixelRatio||n.msBackingStorePixelRatio||n.oBackingStorePixelRatio||n.backingStorePixelRatio||1,g=h/p;if("undefined"==typeof d&&(d=!0),d&&h!==p){var v=t.width,m=t.height;t.width=v*g,t.height=m*g,t.style.width=v+"px",t.style.height=m+"px",n.scale(g,g)}n.drawImage(e.image,i,o,a,u,c,s,l,f)}function Et(e){for(var e={ow:parseFloat(e.containerWidth),cw:parseFloat(e.childWidth),cl:e.childLength,cm:parseFloat(e.childSpace),fn:e.callback},t=Math.floor((e.ow-e.cm)/(e.cw+e.cm)),n=Math.floor((e.ow-e.cw*t)/(t-1)),r=Math.ceil(e.cl/t),i=0;r>i;i++)for(var o=t*i;t*(i+1)>o;o++)o!=t*(i+1)-1?e.fn(o,n):e.fn(o,0)}function jt(e,t,n){var r={categoryId:"category_id",belongId:"belong_id",childTag:"cates",dxs:[]};if("undefined"!=typeof n&&gn.extend(r,n),"undefined"!=typeof r.dxs)for(var i=0,o=r.dxs.length;o>i;i++)t.splice(r.dxs[i],1);for(var a=0,u=e.length;u>a;a++){for(var c=e[a],s=[],l=0,f=t.length;f>l;l++){var d=t[l];c[r.categoryId]==d[r.belongId]&&s.push(d)}c[r.childTag]=s.slice(0),s.length>0?(c.hasChild=!0,jt(s,t,r)):(c.hasChild=!1,c.cates=[])}return e}function At(e,t,n){var r=t;n.top="undefined"==typeof n.top?!0:n.top;for(var i=0,o=e.length;o>i;i++){var a="";if(!n.top)for(var u=0;r>u;u++)a+="　";a+="|-",e[i][n.name]=a+e[i][n.name],e[i].hasChild&&(n.top=!1,At(e[i].cates,t=r+2,n))}return e}function $t(e){function t(e){for(var r=0,i=e.length;i>r;r++)n.push(e[r]),e[r].hasChild&&t(e[r].cates);return e}var n=[];return t(e),n}function Dt(e,t,r,i){var o=[];return n(e,function(e){e[t]===r&&o.push(e),i&&"function"===gn.typeOf(i.callback)&&i.callback.call(this,e)}),i&&"undefined"!==gn.typeOf(i.sortBy)&&(o=gn.sortBy(o,function(e){return e[i.sortBy]}),e=gn.sortBy(e,function(e){return e[i.sortBy]})),jt(o,e,i)}function Ct(e,t,n,r,i){var o=[],a=gn.filter(e,function(e){return e[t]===n});if(0===a.length)return o;o.unshift({nodeId:n,name:a[0][r]});var u=function(e,n){var a=gn.filter(e,function(e){return e[t]===n});a.length>0&&(o.unshift({nodeId:a[0][t],name:a[0][r]}),u(e,a[0][i]))};return u(e,a[0][i]),o}function It(e,t){return e%t==0?e/t:Math.floor(e/t)+1}function Tt(e,t){return e>t?Math.ceil(e/t):1}function kt(e,t,n){var e=e,r=e.length,i=new Array,o=this.getMaxPage(r,n);t=1>t?1:t,t=t>o?o:t;var a=0>(t-1)*n?0:(t-1)*n,u=0>a+n?0:a+n;u=u>r?r:a+n;for(var c=a;u>c;c++)i.push(e[c]);return i}function Ot(e,t,n){var e=parseInt(e,10),t=parseInt(t,10),r=1,i=t,o=n||11,a=[];if(t>o){var u=(o-1)/2;u>=e?(r=1,i=2*u-1):e>t-u?(r=t-2*u+2,i=t):(r=e-(u-1),i=e+(u-1))}else i=t;for(var c=r;i>=c;c++)a.push(c);return a}function _t(e,t,n){var r={area:"templates",getData:null};gn.extend(r,n),t.cache=t.cache||{},"undefined"==typeof t.cache[r.area]&&(t.cache[r.area]={});var i=t.cache[r.area][e];return i||(i=t.cache[r.area][e]=r.getData.call(null,i)),i}function St(e,t,n){var r="",i=n(e).hasClass(t),o=n(e).attr("id"),a=n(e).attr("class");return o.length>0?r="#"+o:a.length>0?r="."+n.trim(a).split(" ")[0]:(r=Lt(e),r=St(e.parentNode)+" "+r),i?r:"#"+n(e).parents(".moveChild:first").attr("id")+" "+r}function Lt(e){return e.tagName.toLowerCase()}function Rt(e){var t=document.createElement("link");t.rel="stylesheet",t.type="text/css",t.href=e,document.body.appendChild(t)}function zt(e,t){var n=e,e=e?new Date(e):new Date,r={"M+":e.getMonth()+1,"d+":e.getDate(),"h+":e.getHours(),"m+":e.getMinutes(),"s+":e.getSeconds(),"q+":Math.floor((e.getMonth()+3)/3),S:e.getMilliseconds()};if(t=t||"yyyy-MM-dd",isNaN(e.getFullYear()))t=n;else{/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(e.getFullYear()+"").substr(4-RegExp.$1.length)));try{for(var i in r)new RegExp("("+i+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?r[i]:("00"+r[i]).substr((""+r[i]).length)))}catch(o){console.log("【Error】: DateUtils.dataFormat "+o)}}return t}function Mt(e,t){var n=/^0$|^2$|^4$|^6$|^7$|^9$|^11$/.test(t)?31:/^3$|^5$|^8$|^10$/.test(t)?30:/^1$/.test(t)?e%400&&(e%4||!(e%100))?28:29:0;return n}function Nt(e){for(;e.firstChild;){var t=e.removeChild(e.firstChild);t=null}}function qt(e,t,n,r){return this.validation([e,t,n,r],"number")?{left:(parseInt(e,10)-parseInt(n,10))/2,top:(parseInt(t,10)-parseInt(r,10))/2}:{left:0,top:0}}function Bt(){var e=parseInt((/msie (\d+)/.exec(L(navigator.userAgent))||[])[1],10);return isNaN(e)&&(e=parseInt((/trident\/.*; rv:(\d+)/.exec(L(navigator.userAgent))||[])[1],10)),isNaN(e)&&(e=!1),e}function Ut(e,t){var n=new RegExp("(^|&)"+e+"=([^&]*)(&|$)");"undefined"!==o(t)&&(t=t.substring(t.indexOf("?"),t.length));var r=t||window.location.search,i=r.substr(1).match(n);return null!=i?unescape(i[2]):null}function Pt(e){var t=e;return rn=document&&document.createElement("a"),Bt()&&(rn.setAttribute("href",t),t=rn.href),rn.setAttribute("href",t),{href:rn.href,protocol:rn.protocol?rn.protocol.replace(/:$/,""):"",host:rn.host,search:rn.search?rn.search.replace(/^\?/,""):"",hash:rn.hash?rn.hash.replace(/^#/,""):"",hostname:rn.hostname,port:rn.port,pathname:"/"===rn.pathname.charAt(0)?rn.pathname:"/"+rn.pathname}}function Ht(e,t,r){function i(e){0===e.indexOf('"')&&(e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return e=decodeURIComponent(e.replace(u," "))}catch(t){}}function a(e,t){var n=i(e);return"function"===o(t)?t(n):n}var u=/\+/g;if(arguments.length>1&&"function"!==o(t)){if(r=gn.extend({},r),"number"==typeof r.expires){var c=r.expires,s=r.expires=new Date;s.setTime(+s+864e5*c)}return document.cookie=[encodeURIComponent(e),"=",encodeURIComponent(t),r.expires?"; expires="+r.expires.toUTCString():"",r.path?"; path="+r.path:"",r.domain?"; domain="+r.domain:"",r.secure?"; secure":""].join("")}var l=e?void 0:{},f=document.cookie?document.cookie.split("; "):[];return n(f,function(n){var r=n.split("="),i=decodeURIComponent(r.shift()),o=r.join("=");return e&&e===i?(l=a(o,t),!1):void(e||void 0===(o=a(o))||(l[i]=o))}),l}function Vt(e,t,n){"function"==typeof t&&(n=t,t=null),dn[e]={templateId:t,controller:n}}function Xt(){var e=location.hash.slice(1)||"/",t=dn[e];return t&&!t.templateId?t.controller?new t.controller:null:(hn=hn||document.getElementById("view"),pn&&(Object.unobserve(pn.controller,pn.render),pn=null),void(hn&&t&&t.controller&&(pn={controller:new t.controller,template:J(document.getElementById(t.templateId).innerHTML),render:function(){hn.innerHTML=this.template(this.controller)}},pn.render(),Object.observe(pn.controller,pn.render.bind(pn)))))}function Gt(e,t){window.$dashFrame||(window.$dashedFrameLeft=t("<div id='dashedFrameLeft' style='display:none;border:#2b73ba 1px dashed;background:#fff;font-size:0;overflow:hidden;zoom:1;position:absolute;z-index:400;'>&nbsp;</div>"),window.$dashedFrameTop=t("<div id='dashedFrameTop' style='display:none;border:#2b73ba 1px dashed;font-size:0;background:#fff;overflow:hidden;zoom:1;position:absolute;z-index:400;'>&nbsp;</div>"),window.$dashedFrameRight=t("<div id='dashedFrameRight' style='display:none;border:#2b73ba 1px dashed;font-size:0;background:#fff;overflow:hidden;zoom:1;position:absolute;z-index:400;'>&nbsp;</div>"),window.$dashedFrameBottom=t("<div id='dashedFrameBottom' style='display:none;border:#2b73ba 1px dashed;font-size:0;background:#fff;overflow:hidden;zoom:1;position:absolute;z-index:400;'>&nbsp;</div>"),t("body").append(window.$dashedFrameLeft),t("body").append(window.$dashedFrameTop),t("body").append(window.$dashedFrameRight),t("body").append(window.$dashedFrameBottom),window.$dashFrame=!0);var n=t(e).outerWidth(),r=t(e).outerHeight(),i=t(e).offset();window.$dashedFrameLeft.css({left:i.left,top:i.top,width:0,height:r}).show(),window.$dashedFrameTop.css({left:i.left,top:i.top,width:n,height:0}).show(),window.$dashedFrameRight.css({left:i.left+n,top:i.top,width:0,height:r}).show(),window.$dashedFrameBottom.css({left:i.left,top:i.top+r,width:n,height:0}).show()}var Kt=this,Wt=Array.prototype.slice,Zt=Array.prototype.push,Yt=Object.prototype.toString,Jt=Object.prototype.hasOwnProperty,Qt=Array.prototype.concat,en=(Array.isArray,Object.keys),tn=(Object.prototype.bind," \n\r	\f     \n               ​\u2028\u2029　"),nn=["0","0","0"],rn=null,on={},an={},un=function(){},cn=40,sn=[],ln=[],fn={},dn={},hn=null,pn=null,gn=function(t){return t&&"object"==typeof t&&"array"!==o(t)&&Jt.call(t,"_wrapped")?t:new e(t)};gn.version="1.1.0","undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=gn),exports.Est=gn):Kt.Est=gn,gn.identity=t;var vn=function(e,t,n){return null==e?gn.identity:gn.isFunction(e)?mn(e,t,n):"object"===o(e)?ut(e):"array"===o(e)?e:m(e)},mn=function(e,t,n){if(!t)return e;switch(null==n?3:n){case 1:return function(n){return e.call(t,n)};case 2:return function(n,r){return e.call(t,n,r)};case 3:return function(n,r,i){return e.call(t,n,r,i)};case 4:return function(n,r,i,o){return e.call(t,n,r,i,o)}}return function(){return e.apply(this,arguments)}};gn.each=gn.forEach=n,gn.extend=function(e){var t=e.$$hashKey;return"object"!==o(e)?e:(n(Wt.call(arguments,1),function(t){for(var n in t)e[n]=t[n]}),g(e,t),e)},gn.inherit=r,"function"!=typeof/./&&(gn.isFunction=function(e){return"function"==typeof e}),gn.functions=gn.methods=function(e){var t=[];for(var n in e)gn.isFunction(e[n])&&t.push(n);return t.sort()},gn.chain=function(t){return t=new e(t),t._chain=!0,t};var yn=function(t){return this._chain?new e(t,!0):t};gn.promise=i;var bn={undefined:"undefined",number:"number","boolean":"boolean",string:"string","[object Function]":"function","[object RegExp]":"regexp","[object Array]":"array","[object Date]":"date","[object Error]":"error","[object File]":"file","[object Blob]":"blob"};gn.typeOf=o,gn.getType=a,gn.getValue=u,gn.setValue=c,gn.objToPath=s,gn.isEmpty=l,gn.valueFn=f,gn.reverseParams=d,gn.hasKey=h,gn.hashKey=p,gn.setHashKey=g,gn.pick=v,gn.property=m,gn.pluck=y,gn.delay=b,gn.define=function(e,t,n){if("function"==typeof define&&define.amd)return define;
if(!on[e]){var r={name:e,dependencies:t,factory:n};on[e]=r}return on[e]},gn.require=function(e,t){function n(){for(var n=!0,r=0;r<e.length;r++)if(!an[e[r]]){n=!1;break}n&&t()}if("function"==typeof define&&define.amd)return require;for(var r=0;r<e.length;r++){var i=e[r];if(!an[i]){var o=document.getElementsByTagName("head")[0],a=document.createElement("script");a.type="text/javascript",a.async="true",a.src=i+".js",a.onload=function(){an[i]=!0,o.removeChild(a),n()},o.appendChild(a)}}},gn.use=F,gn.releaseArray=w,gn.releaseObject=x,gn.getArray=E,gn.getObject=j,gn.clone=$,gn.cloneDeep=D,gn.setArguments=C,gn.inject=I,gn.keyRoute=T,gn.validation=k,gn.nextUid=O,gn.encodeId=_,gn.decodeId=S,gn.lowercase=L,gn.uppercase=R,gn.repeat=z,gn.contains=M,gn.startsWidth=N,gn.endsWidth=q,gn.byteLen=B,gn.truncate=U,gn.cutByte=P,gn.stripTagName=H,gn.stripScripts=V,gn.stripTags=X,gn.escapeHTML=G,gn.unescapeHTML=K,gn.escapeRegExp=W,gn.pad=Z,gn.format=Y,gn.template=J,gn.ltrim=Q,gn.rtrim=et,gn.trim=tt,gn.deepTrim=nt,gn.reverse=rt,gn.removeAt=it,gn.arrayRemove=ot,gn.keys=at,gn.matches=ut,gn.filter=ct,gn.findIndex=st,gn.arrayToObject=lt,gn.arrayFromObject=ft,gn.arrayExchange=dt,gn.arrayInsert=ht,gn.map=pt,gn.makeMap=gt,gn.indexOf=vt,gn.sortBy=mt,gn.take=gn.arraySlice=yt,gn.picUrl=bt,gn.imageCrop=Ft,gn.imagePreview=wt,gn.drawImage=xt,gn.girdJustify=Et,gn.bulidSubNode=jt,gn.bulidSelectNode=At,gn.extendTree=$t,gn.bulidTreeNode=Dt,gn.bulidBreakNav=Ct,gn.getMaxPage=It,gn.getMaxPage_2=Tt,gn.getListByPage=kt,gn.getPaginationNumber=Ot,gn.getCache=_t,gn.getSelector=St,gn.getTagName=Lt,gn.loadCss=Rt,gn.dateFormat=zt,gn.getDays=Mt,gn.clearAllNode=Nt,gn.center=qt,gn.msie=Bt,gn.getUrlParam=Ut,gn.urlResolve=Pt,gn.cookie=Ht,gn.route=Vt,window&&window.addEventListener&&(window.addEventListener("hashchange",Xt),window.addEventListener("load",Xt)),gn.dashedFrame=Gt,gn.mixin=function(t,n){var r=gn;"boolean"!==o(n)||n||(r=t),gn.each(gn.functions(t),function(e){var n=r[e]=t[e];r.prototype[e]=function(){try{var e=[];"undefined"!=typeof this._wrapped&&e.push(this._wrapped)}catch(t){console.error("_wrapped is not defined")}return Zt.apply(e,arguments),yn.apply(this,[n.apply(r,e),r])}}),e.prototype=r.prototype,gn.extend(r.prototype,{chain:function(t,n){return t=new e(t,n),t._chain=!0,t},value:function(){return this._wrapped}})},gn.mixin(gn,!0),"function"==typeof define&&define.amd?define("Est",[],function(){return gn}):"function"==typeof define&&define.cmd?define("Est",[],function(e,t,n){n.exports=gn}):gn.define("Est",[],function(){return gn})}.call(this);var Application=function(e){this.options=e,Est.extend(this,e),this.initialize.apply(this,arguments)};Est.extend(Application.prototype,{initialize:function(){this.data={itemActiveList:[]},this.instance={},this.modules={},this.routes={},this.templates={},this.panels={},this.dialog=[],this.status={},this.cookies=[],this.models=[]},addPanel:function(e,t){var n="string"===Est.typeOf(t.cid)?!1:!0;if(n){this.removePanel(e,t);var r=$(t.template);r.addClass("__panel_"+e),$(t.el).append(r)}return this.panels[e]=t,n?this:t},panel:function(e,t){return this.addPanel(e,t)},show:function(e){this.addView(this.currentView,e)},removePanel:function(e,t){try{$.fn.off?$(".__panel_"+e,$(t.el)).off().remove():seajs.use(["jquery"],function(n){window.$=n,n(".__panel_"+e,n(t.el)).off().remove()}),delete this.panels[e]}catch(n){}},getPanel:function(e){return this.panels[e]},addView:function(e,t){return e in this.instance&&this.removeView(e),this.instance[e]=t,this.setCurrentView(e),this},add:function(e,t){return this.addView(e,t)},setCurrentView:function(e){this.currentView=e},getCurrentView:function(){return this.currentView},getView:function(e){return this.instance[e]},removeView:function(e){var t=this.getView(e);try{t&&(t._empty(),t.stopListening(),t.$el.off().remove()),delete this.instance[e]}catch(n){}return this},addDialog:function(e){return this.dialog.push(e),e},getDialogs:function(){return this.dialog},addModel:function(e){return this.models.push(e),e},getModels:function(){return this.models},emptyDialog:function(){Est.each(this.dialog,function(e){e.close&&e.close().remove()})},addData:function(e,t){e in this.data&&console.log("数据对象重复"+e),this.data[e]=t},getData:function(e){return this.data[e]},addModule:function(e,t){e in this.modules&&console.log("已存在的模块："+e),this.modules[e]=t},getModules:function(){return this.modules},addRoute:function(e,t){e in this.routes&&console.log("已存在的路由:"+e),this.routes[e]=t},getRoutes:function(){return this.routes},addTemplate:function(e,t){e in this.templates&&console.log("已存在的模板："+e),this.templates[e]=t},getTemplates:function(){return this.templates},addStatus:function(e,t){this.status[e]=t},getStatus:function(e){return this.status[e]},getAllStatus:function(){return this.status},addCookie:function(e){-1===Est.findIndex(this.cookies,e)&&this.cookies.push(e)},getCookies:function(){return this.cookies}}),window.console||(console=function(e){function t(){e&&(this.div=document.createElement("console"),this.div.id="console",this.div.style.cssText="filter:alpha(opacity=80);padding:10px;line-height:14px;position:absolute;right:0px;top:0px;width:30%;border:1px solid #ccc;background:#eee;",document.body.appendChild(this.div))}function n(){return null==r&&(r=new t),r}var r=null;return t.prototype={log:function(t){if(e){var n=document.createElement("p");n.innerHTML=t,this.div.appendChild(n)}}},n()}(!1)),function(){var e,t;!function(n,r){function i(e){return function(t){return{}.toString.call(t)=="[object "+e+"]"}}function o(){}var a=i("Function"),u={};o.prototype.exec=function(){function e(e){return o.get(e).exec()}var t=this;if(this.execed)return t.exports;this.execed=!0;var n=t.factory,i=a(n)?n(e,t.exports={},t):n;return i===r&&(i=t.exports),delete t.factory,t.exports=i,i},e=function(e,t,n){var r={id:e,deps:t,factory:n};o.save(r)},o.save=function(e){var t=o.get(e.id);t.id=e.id,t.dependencies=e.deps,t.factory=e.factory},o.get=function(e){return u[e]||(u[e]=new o)},t=function(e){var t=o.get(e);return t.execed||t.exec(),t.exports}}(this),e("bui/config",[],function(){var e=window.BUI=window.BUI||{};e.use=seajs.use,e.config=seajs.config}),t("bui/config")}();