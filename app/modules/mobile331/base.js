!function(e,t){function r(e){return function(t){return{}.toString.call(t)=="[object "+e+"]"}}function n(){return j++}function i(e){return e.match(O)[0]}function a(e){for(e=e.replace(_,"/"),e=e.replace(U,"$1/");e.match(D);)e=e.replace(D,"/");return e}function o(e){var t=e.length-1,r=e.charAt(t);return"#"===r?e.substring(0,t):".js"===e.substring(t-2)||e.indexOf("?")>0||"/"===r?e:e+".js"}function s(e){var t=E.alias;return t&&A(t[e])?t[e]:e}function u(e){var t,r=E.paths;return r&&(t=e.match(N))&&A(r[t[1]])&&(e=r[t[1]]+t[2]),e}function c(e){var t=E.vars;return t&&e.indexOf("{")>-1&&(e=e.replace(C,function(e,r){return A(t[r])?t[r]:e})),e}function f(e){var t=E.map,r=e;if(t)for(var n=0,i=t.length;i>n;n++){var a=t[n];if(r=q(a)?a(e)||e:e.replace(a[0],a[1]),r!==e)break}return r}function l(e,t){var r,n=e.charAt(0);if(G.test(e))r=e;else if("."===n)r=a((t?i(t):E.cwd)+e);else if("/"===n){var o=E.cwd.match(I);r=o?o[0]+e.substring(1):e}else r=E.base+e;return 0===r.indexOf("//")&&(r=location.protocol+r),r}function d(e,t){if(!e)return"";e=s(e),e=u(e),e=c(e),e=o(e);var r=l(e,t);return r=f(r)}function p(e){return e.hasAttribute?e.src:e.getAttribute("src",4)}function v(e,t,r){var n=k.createElement("script");if(r){var i=q(r)?r(e):r;i&&(n.charset=i)}h(n,t,e),n.async=!0,n.src=e,$=n,R?F.insertBefore(n,R):F.appendChild(n),$=null}function h(e,t,r){function n(){e.onload=e.onerror=e.onreadystatechange=null,E.debug||F.removeChild(e),e=null,t()}var i="onload"in e;i?(e.onload=n,e.onerror=function(){S("error",{uri:r,node:e}),n()}):e.onreadystatechange=function(){/loaded|complete/.test(e.readyState)&&n()}}function g(){if($)return $;if(B&&"interactive"===B.readyState)return B;for(var e=F.getElementsByTagName("script"),t=e.length-1;t>=0;t--){var r=e[t];if("interactive"===r.readyState)return B=r}}function m(e){var t=[];return e.replace(z,"").replace(V,function(e,r,n){n&&t.push(n)}),t}function y(e,t){this.uri=e,this.dependencies=t||[],this.exports=null,this.status=0,this._waitings={},this._remain=0}if(!e.seajs){var x=e.seajs={version:"2.3.0"},E=x.data={},b=r("Object"),A=r("String"),w=Array.isArray||r("Array"),q=r("Function"),j=0,T=E.events={};x.on=function(e,t){var r=T[e]||(T[e]=[]);return r.push(t),x},x.off=function(e,t){if(!e&&!t)return T=E.events={},x;var r=T[e];if(r)if(t)for(var n=r.length-1;n>=0;n--)r[n]===t&&r.splice(n,1);else delete T[e];return x};var S=x.emit=function(e,t){var r=T[e];if(r){r=r.slice();for(var n=0,i=r.length;i>n;n++)r[n](t)}return x},O=/[^?#]*\//,_=/\/\.\//g,D=/\/[^/]+\/\.\.\//,U=/([^:/])\/+\//g,N=/^([^/:]+)(\/.+)$/,C=/{([^{]+)}/g,G=/^\/\/.|:\//,I=/^.*?\/\/.*?\//,k=document,H=location.href&&0!==location.href.indexOf("about:")?i(location.href):"",L=k.scripts,X=k.getElementById("seajsnode")||L[L.length-1],M=i(p(X)||H);x.resolve=d;var $,B,F=k.head||k.getElementsByTagName("head")[0]||k.documentElement,R=F.getElementsByTagName("base")[0];x.request=v;var P,V=/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g,z=/\\\\/g,J=x.cache={},K={},Q={},W={},Y=y.STATUS={FETCHING:1,SAVED:2,LOADING:3,LOADED:4,EXECUTING:5,EXECUTED:6};y.prototype.resolve=function(){for(var e=this,t=e.dependencies,r=[],n=0,i=t.length;i>n;n++)r[n]=y.resolve(t[n],e.uri);return r},y.prototype.load=function(){var e=this;if(!(e.status>=Y.LOADING)){e.status=Y.LOADING;var r=e.resolve();S("load",r);for(var n,i=e._remain=r.length,a=0;i>a;a++)n=y.get(r[a]),n.status<Y.LOADED?n._waitings[e.uri]=(n._waitings[e.uri]||0)+1:e._remain--;if(0===e._remain)return e.onload(),t;var o={};for(a=0;i>a;a++)n=J[r[a]],n.status<Y.FETCHING?n.fetch(o):n.status===Y.SAVED&&n.load();for(var s in o)o.hasOwnProperty(s)&&o[s]()}},y.prototype.onload=function(){var e=this;e.status=Y.LOADED,e.callback&&e.callback();var t,r,n=e._waitings;for(t in n)n.hasOwnProperty(t)&&(r=J[t],r._remain-=n[t],0===r._remain&&r.onload());delete e._waitings,delete e._remain},y.prototype.fetch=function(e){function r(){x.request(o.requestUri,o.onRequest,o.charset)}function n(){delete K[s],Q[s]=!0,P&&(y.save(a,P),P=null);var e,t=W[s];for(delete W[s];e=t.shift();)e.load()}var i=this,a=i.uri;i.status=Y.FETCHING;var o={uri:a};S("fetch",o);var s=o.requestUri||a;return!s||Q[s]?(i.load(),t):K[s]?(W[s].push(i),t):(K[s]=!0,W[s]=[i],S("request",o={uri:a,requestUri:s,onRequest:n,charset:E.charset}),o.requested||(e?e[o.requestUri]=r:r()),t)},y.prototype.exec=function(){function e(t){return y.get(e.resolve(t)).exec()}var r=this;if(r.status>=Y.EXECUTING)return r.exports;r.status=Y.EXECUTING;var i=r.uri;e.resolve=function(e){return y.resolve(e,i)},e.async=function(t,r){return y.use(t,r,i+"_async_"+n()),e};var a=r.factory,o=q(a)?a(e,r.exports={},r):a;return o===t&&(o=r.exports),delete r.factory,r.exports=o,r.status=Y.EXECUTED,S("exec",r),o},y.resolve=function(e,t){var r={id:e,refUri:t};return S("resolve",r),r.uri||x.resolve(r.id,t)},y.define=function(e,r,n){var i=arguments.length;1===i?(n=e,e=t):2===i&&(n=r,w(e)?(r=e,e=t):r=t),!w(r)&&q(n)&&(r=m(""+n));var a={id:e,uri:y.resolve(e),deps:r,factory:n};if(!a.uri&&k.attachEvent){var o=g();o&&(a.uri=o.src)}S("define",a),a.uri?y.save(a.uri,a):P=a},y.save=function(e,t){var r=y.get(e);r.status<Y.SAVED&&(r.id=t.id||e,r.dependencies=t.deps||[],r.factory=t.factory,r.status=Y.SAVED,S("save",r))},y.get=function(e,t){return J[e]||(J[e]=new y(e,t))},y.use=function(t,r,n){var i=y.get(n,w(t)?t:[t]);i.callback=function(){for(var t=[],n=i.resolve(),a=0,o=n.length;o>a;a++)t[a]=J[n[a]].exec();r&&r.apply(e,t),delete i.callback},i.load()},x.use=function(e,t){return y.use(e,t,E.cwd+"_use_"+n()),x},y.define.cmd={},e.define=y.define,x.Module=y,E.fetchedList=Q,E.cid=n,x.require=function(e){var t=y.get(y.resolve(e));return t.status<Y.EXECUTING&&(t.onload(),t.exec()),t.exports},E.base=M,E.dir=M,E.cwd=H,E.charset="utf-8",x.config=function(e){for(var t in e){var r=e[t],n=E[t];if(n&&b(n))for(var i in r)n[i]=r[i];else w(n)?r=n.concat(r):"base"===t&&("/"!==r.slice(-1)&&(r+="/"),r=l(r)),E[t]=r}return S("config",e),x}}}(this),function(){function e(e){s[e.name]=e}function t(e){return e&&s.hasOwnProperty(e)}function r(e){for(var r in s)if(t(r)){var n=","+s[r].ext.join(",")+",";if(n.indexOf(","+e+",")>-1)return r}}function n(e,t){var r=o.XMLHttpRequest?new o.XMLHttpRequest:new o.ActiveXObject("Microsoft.XMLHTTP");return r.open("GET",e,!0),r.onreadystatechange=function(){if(4===r.readyState){if(r.status>399&&r.status<600)throw new Error("Could not load: "+e+", status = "+r.status);t(r.responseText)}},r.send(null)}function i(e){e&&/\S/.test(e)&&(o.execScript||function(e){(o.eval||eval).call(o,e)})(e)}function a(e){return e.replace(/(["\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")}var o=window,s={},u={};e({name:"text",ext:[".tpl",".html"],exec:function(e,t){i('define("'+e+'#", [], "'+a(t)+'")')}}),e({name:"json",ext:[".json"],exec:function(e,t){i('define("'+e+'#", [], '+t+")")}}),e({name:"handlebars",ext:[".handlebars"],exec:function(e,t){var r=['define("'+e+'#", ["handlebars"], function(require, exports, module) {','  var source = "'+a(t)+'"','  var Handlebars = require("handlebars")["default"]',"  module.exports = function(data, options) {","    options || (options = {})","    options.helpers || (options.helpers = {})","    for (var key in Handlebars.helpers) {","      options.helpers[key] = options.helpers[key] || Handlebars.helpers[key]","    }","    return Handlebars.compile(source)(data, options)","  }","})"].join("\n");i(r)}}),seajs.on("resolve",function(e){var n=e.id;if(!n)return"";var i,a;(a=n.match(/^(\w+)!(.+)$/))&&t(a[1])?(i=a[1],n=a[2]):(a=n.match(/[^?]+(\.\w+)(?:\?|#|$)/))&&(i=r(a[1])),i&&-1===n.indexOf("#")&&(n+="#");var o=seajs.resolve(n,e.refUri);i&&(u[o]=i),e.uri=o}),seajs.on("request",function(e){var t=u[e.uri];t&&(n(e.requestUri,function(r){s[t].exec(e.uri,r),e.onRequest()}),e.requested=!0)}),define("seajs/seajs-text/1.1.1/seajs-text-debug",[],{})}();var Application=function(e){this.options=e,this.initialize.apply(this,arguments)};Application.prototype={initialize:function(){this.modules={},this.status={},this.templates={}},addModule:function(e,t){e in this.modules&&console.log("已存在的模块："+e),this.modules[e]=t},getModules:function(){return this.modules},addStatus:function(e,t){this.status[e]=t},getStatus:function(e){return this.status[e]},getAllStatus:function(){return this.status},addTemplate:function(e,t){e in this.templates&&console.log("已存在的模板："+e),this.templates[e]=t},getTemplates:function(){return this.templates}},Application.each=function(e,t){var r,n;if(null==e)return e;if(e.length===+e.length)for(r=0,n=e.length;n>r&&t(e[r],r,e)!==!1;r++);else{var i=Object.keys(e);for(r=0,n=i.length;n>r&&t(e[i[r]],i[r],e,r)!==!1;r++);}return e},Application.extend=function(e){return"undefined"==typeof e?e:(Array.prototype.slice.call(arguments,1).forEach(function(t){for(var r in t)e[r]=t[r]}),e)},function(){var e,t;!function(r,n){function i(e){return function(t){return{}.toString.call(t)=="[object "+e+"]"}}function a(){}var o=i("Function"),s={};a.prototype.exec=function(){function e(e){return a.get(e).exec()}var t=this;if(this.execed)return t.exports;this.execed=!0;var r=t.factory,i=o(r)?r(e,t.exports={},t):r;return i===n&&(i=t.exports),delete t.factory,t.exports=i,i},e=function(e,t,r){var n={id:e,deps:t,factory:r};a.save(n)},a.save=function(e){var t=a.get(e.id);t.id=e.id,t.dependencies=e.deps,t.factory=e.factory},a.get=function(e){return s[e]||(s[e]=new a)},t=function(e){var t=a.get(e);return t.execed||t.exec(),t.exports}}(this)}();