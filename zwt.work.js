(function() {
    var root = this;
    // 系统原型方法
    var slice = Array.prototype.slice, push = Array.prototype.push, toString = Object.prototype.toString,
        hasOwnProperty   = Object.prototype.hasOwnProperty, concat = Array.prototype.concat;
    // ECMAScript 5
    var nativeIsArray = Array.isArray, nativeKeys = Object.keys, nativeBind = Object.prototype.bind;
    var whitespace = (' \t\x0B\f\xA0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000');
    // 创建Zwt对象
    var Zwt = function(a){if(a instanceof Zwt)return a;if(!(this instanceof Zwt))return new Zwt(a);this._wrapped=a};
    Zwt.version = '1.1.0';
    // 用于node.js 导出
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = Zwt;
        }
        exports.Zwt = Zwt;
    } else {
        root.Zwt = Zwt;
    }
    // 回调封装
    var createCallback = function(a,b,c){if(!b)return a;switch(c==null?3:c){case 1:return function(d){return a.call(b,d)};case 2:return function(d,e){return a.call(b,d,e)};case 3:return function(d,e,f){return a.call(b,d,e,f)};case 4:return function(d,e,f,g){return a.call(b,d,e,f,g)}};return function(){return a.apply(this,arguments)}};
    /**
     * @description 遍历数据或对象。如果传递了context参数，则把callback绑定到context对象上。
     * 如果list是数组，callback的参数是：(element, list, index, first, last)。
     * 如果list是个JavaScript对象，callback的参数是 (value, key, list, index, first, last))。返回list以方便链式调用。
     * 如果callback 返回false,则中止遍历
     * @method each
     * @param {*} obj 遍历对象
     * @param {}
     * @example
     * _.each([1, 2, 3], alert); => alerts each number in turn...
     * _.each({one: 1, two: 2, three: 3}, alert); => alerts each number value in turn...
     */
    function each(a,b,c){var d,e,f=false,g=false;if(a==null)return a;b=createCallback(b,c);if(a.length===+a.length){for(d=0,e=a.length;d<e;d++){f=d===0?true:false;g=d===e-1?true:false;if(b(a[d],a,d,f,g)===false)break}}else{var h=keys(a);for(d=0,e=h.length;d<e;d++){f=d===0?true:false;g=d===h.length-1?true:false;if(b(a[h[d]],h[d],a,d,f,g)===false)break}};return a};
    Zwt.each = Zwt.forEach = each;
    /**
     * @description 复制source对象中的所有属性覆盖到destination对象上，并且返回 destination 对象.
     * 复制是按顺序的, 所以后面的对象属性会把前面的对象属性覆盖掉(如果有重复).
     * @method extend
     * @param {Object} obj destination对象
     * @returns {Object} 返回 destination 对象
     * @author wyj on 14/5/22
     * @example
     * Zwt.extend({name: 'moe'}, {age: 50}); => {name: 'moe', age: 50}
     */
    Zwt.extend = function(a){if(typeOf(a)!=='object')return a;each(slice.call(arguments,1),function(b){for(var c in b){a[c]=b[c]}});return a};
    if (typeof /./ !== 'function') {
        /**
         * @description 如果object是一个参数对象，返回true
         * @method isFunction
         * @param {*} obj 待检测参数
         * @returns {boolean}
         * @author wyj on 14/5/22
         * @example
         * Zwt.isFunction(alert); => true
         */
        Zwt.isFunction = function(obj) {
            return typeof obj === 'function';
        };
    }
    /**
     * @description 返回一个对象里所有的方法名, 而且是已经排序的 — 也就是说, 对象里每个方法(属性值是一个函数)的名称.
     * @method functions
     * @params {Object} obj 检测对象
     * @return {Array} 返回包含方法数组
     * @author wyj on 14/5/22
     * @example
     * Zwt.functions(Zwt); => ["all", "any", "bind", "bindAll", "clone", "compact", "compose" ...
     */
    Zwt.functions = Zwt.methods = function(a){var b=[];for(var c in a){if(Zwt.isFunction(a[c]))b.push(c)};return b.sort()};
    /**
     * @description 返回一个封装的对象. 在封装的对象上调用方法会返回封装的对象本身, 直道 value 方法调用为止.
     * @method chain
     * @param obj
     * @returns {*}
     * @author wyj on 14/5/22
     * @example
     * var stooges = [{name: 'curly', age: 25}, {name: 'moe', age: 21}, {name: 'larry', age: 23}];
     * var youngest = Zwt.chain(stooges)
     * .sortBy(function(stooge){ return stooge.age; })
     * .map(function(stooge){ return stooge.name + ' is ' + stooge.age; })
     * .first()
     * .value();
     * => "moe is 21"
     */
    Zwt.chain = function(a){return Zwt(a).chain()};
    /**
     * @description 如果对象 object 中的属性 property 是函数, 则调用它, 否则, 返回它。
     * @method result
     * @param obj
     * @returns {*}
     * @author wyj on 14/5/22
     * @example
     * var object = {cheese: 'crumpets', stuff: function(){ return 'nonsense'; }};
     * Zwt.result(object, 'cheese'); => "crumpets"
     * Zwt.result(object, 'stuff'); => "nonsense"
     */
    var result = function(a){return this._chain?Zwt(a).chain():a};
    // ObjectUtils
    /**
     * @description [1]检测数据类型 [undefined][number][string][function][regexp][array][date][error]
     * @method typeOf
     * @param {*} target 检测对象
     * @returns {*|string}
     * @author wyj on 14/5/24
     * @example
     *  Zwt.typeOf(Zwt); => 'object'
     */
    function typeOf(b){var c={"undefined":"undefined","number":"number","boolean":"boolean","string":"string","[object Function]":"function","[object RegExp]":"regexp","[object Array]":"array","[object Date]":"date","[object Error]":"error"};return c[typeof b]||c[toString.call(b)]||(b?"object":"null")}
    Zwt.typeOf = typeOf;
    /**
     * @description [2]判断对象是否含有某个键 不是原型对象
     * @method hasKey
     * @param {Object} obj 检测对象
     * @param {Sting} key 检测键
     * @returns {boolean|*}
     * @author wyj on 14/5/25
     * @example
     *   var object6 = {name:1,sort:1};
     *   Zwt.hasKey(object6, 'name') => true
     */
    function hasKey(a,b){return a!=null&&hasOwnProperty.call(a,b)}
    Zwt.hasKey = hasKey;
    /**
     * @description [3]过滤对象字段
     * @method pick
     * @param {Object} obj 过滤对象
     * @param {Function} callback 回调函数
     * @param context
     * @returns {{}}
     * @author wyj on 14/5/26
     * @example
     *      var object3 = {name:'a', sort: '1', sId: '000002'};
     *      Zwt.pick(object3, ['name','sort']) =>
     *      {"name":"a","sort":"1"}
     */
    function pick(a,b,c){var d={},e;if(typeOf(b)==='function'){for(e in a){var f=a[e];if(b.call(c,f,e,a))d[e]=f}}else{var f=concat.apply([],slice.call(arguments,1));each(f,function(g){if(g in a)d[g]=a[g]})};return d}
    Zwt.pick = pick;
    /**
     * @description 避免在 ms 段时间内，多次执行func。常用 resize、scoll、mousemove等连续性事件中
     * @method delay
     * @param {Function} func 方法
     * @param {Number} ms 缓冲时间
     * @param context
     * @returns {Function}
     * @author wyj on 14/5/24
     * @example
     *     Zwt.buffer(function(){}, 5);
     */
    function delay(a,b){if(typeOf(a)!=='function'){throw new TypeError};return setTimeout(function(){a.apply(undefined,slice.call(arguments))},b)}
    Zwt.delay = delay;

    // StringUtils
    /**
     * @description 二分法将一个字符串重复自身N次
     * @method repeat
     * @param {String} target 原字符串
     * @param {Number} n 重复次数
     * @returns {String} 返回字符串
     * @author wyj on 14-04-23
     * @example
     *      Zwt.repeat('ruby', 2); => rubyruby
     */
    function repeat(a,b){var c=a,d='';while(b>0){if(b%2==1){d+=c};if(b==1){break};c+=c;b=b>>1};return d}
    Zwt.repeat = repeat;
    /**
     * @description 判定一个字符串是否包含另一个字符串
     * @method contains
     * @param {string} target 目标字符串
     * @param {string} 包含字符串
     * @param {string} 判定一个元素的className 是否包含某个特定的class
     * @return {boolean} 返回true/false
     * @author wyj on 14-04-23
     * @example
     *      Zwt.contains("aaaaa", "aa"); => true
     */
    function contains(a,b,c){return c?(c+a+c).indexOf(c+b+c)>-1:a.indexOf(b)>-1}
    Zwt.contains = contains;
    /**
     * @description 判定目标字符串是否位于原字符串的开始之处
     * @method startsWidth
     * @param {target} 原字符串
     * @param {str} 目标字符串
     * @param {boolean} 是否忽略大小写
     * @return {boolean} true/false
     * @author wyj on 14-04-23
     * @example
     *      Zwt.startsWidth('aaa', 'aa', true); => true
     */
    function startsWith(a,b,c){var d=a.substr(0,b.length);return c?d.toLowerCase()===b.toLowerCase():d===b}
    Zwt.startsWidth = startsWith;
    /**
     * @description 判定目标字符串是否位于原字符串的结束之处
     * @method endsWidth
     * @param {target} 原字符串
     * @param {str} 目标字符串
     * @param {boolean} 是否忽略大小写
     * @return {boolean} true/false
     * @author wyj on 14-04-23
     * @example
     *      Zwt.endsWidth('aaa', 'aa', true); => true
     */
    function endsWidth(a,b,c){var d=a.substring(a.length-b.length);return c?d.toLowerCase()===b.toLowerCase():d===b}
    Zwt.endsWidth = endsWidth;
    /**
     * @description 取得一个字符串所有字节的长度
     * @method byteLen
     * @param target 目标字符串
     * @param fix 汉字字节长度，如mysql存储汉字时， 是用3个字节
     * @returns {Number}
     * @author wyj on 14-04-23
     * @example
     *      Zwt.byteLen('sfasf我'， 2); => 7
     */
    function byteLen(a,b){b=b?b:2;var c=new Array(b+1).join('-');return a.replace(/[^\x00-\xff]/g,c).length}
    Zwt.byteLen = byteLen;
    /**
     * @description 对字符串进行截取处理，默认添加三个点号【版本一】
     * @method truncate
     * @param target 目标字符串
     * @param length 截取长度
     * @param truncation 结尾符号
     * @returns {string}
     * @author wyj on 14-04-23
     * @example
     *     Zwt.truncate('aaaaaa', 4, '...'); => 'aaa...'
     */
    function truncate(a,b,c){b=b||30;c=c===void(0)?'...':c;return a.length>b?(a.slice(0,b=c.length)+c):String(a)}
    Zwt.truncate = truncate;
    /**
     * @description 对字符串进行截取处理，默认添加三个点号【版本二】
     * @method cutByte
     * @param str 目标字符串
     * @param length 截取长度
     * @param truncation 结尾符号
     * @returns {string}
     * @author wyj on 14-04-25
     * @example
     *     Zwt.cutByte('aaaaaa', 4, '...'); => 'a...'
     */
    function cutByte(a,b,c){if(!(a+"").length||!b||+b<=0){return""};var b=+b,c=typeof(c)=='undefined'?"...":c.toString(),d=this.byteLen(c);if(b<d){c="";d=0};function n2(f){var g=f/2|0;return(g>0?n:1)};var e=b-d,_lenS=0,_strl=0;while(_strl<=e){var _lenS1=n2(e-_strl),f=this.byteLen(a.substr(_lenS,_lenS1));if(f==0){return a};_strl+=f;_lenS+=_lenS1};if(a.length-_lenS>d||this.byteLen(a.substring(_lenS-1))>d){return a.substr(0,_lenS-1)+c}else{return a}}
    Zwt.cutByte = cutByte;
    /**
     * @description 移除字符串中所有的script标签。弥补stripTags 方法的缺陷。此方法应在stripTags之前调用
     * @method stripScripts
     * @param {String} target 目标字符串
     * @returns {string} 返回字符串
     * @author wyj on 14/5/5
     * @example
     *     Zwt.stripScripts("a<script></script>"); => 'a'
     */
    function stripScripts(a){return String(a||'').replace(/<script[^>]*>([\S\s]*?)<\/script>/img,'')}
    Zwt.stripScripts = stripScripts;
    /**
     * @description 移除字符串中的html标签, 若字符串中有script标签，则先调用stripScripts方法
     * @method stripTags
     * @param {String} target 原字符串
     * @returns {string} 返回新字符串
     * @author wyj on 14/5/5
     * @example
     *     Zwt.stripTags('aa<div>bb</div>'); => 'aabb'
     */
    function stripTags(a){return String(a||'').replace(/<[^>]+>/img,'')}
    Zwt.stripTags = stripTags;
    /**
     * @description 替换原字符串中的“< > " '”为 “&lt;&gt;&quot;&#39;”
     * @method escapeHTML
     * @param {String} target 原字符串
     * @returns {String} 返回新字符串
     * @author wyj on 14/5/5
     * @example
     *     Zwt.escapeHTML('<'); => '&lt;'
     */
    function escapeHTML(a){return a.replace(/&/mg,'&amp;').replace(/</mg,'&lt;').replace(/>/mg,'&gt;').replace(/"/mg,'&quot;').replace(/'/mg,'&#39;')}
    Zwt.escapeHTML = escapeHTML;
    /**
     * @description 替换原字符串中的“&lt;&gt;&quot;&#39;”为 “< > " '”
     * @method unescapeHTML
     * @param {String} target 原字符串
     * @returns {String} 返回新字符串
     * @author wyj on 14/5/5
     * @example
     *     Zwt.unescapeHTML('&lt;'); => '<'
     */
    function unescapeHTML(a){return a.replace(/&amp;/mg,'&').replace(/&lt;/mg,'<').replace(/&gt;/mg,'>').replace(/&quot;/mg,'"').replace(/&#([\d]+);/mg,function($0,$1){return String.fromCharCode(parseInt($1,10))})}
    Zwt.unescapeHTML = unescapeHTML;
    /**
     * @description 将字符串安全格式化为正则表达式的源码
     * @param {String} target 原字符串
     * @returns {XML|string|void|*}
     * @author wyj on 14/5/16
     * @example
     *      Zwt.escapeRegExp('aaa/[abc]/') => aaa\/\[abc\]\/;
     */
    function escapeRegExp(a){return a.replace(/([-.*+?^${}()|[\]\/\\])/img,'\\$1')}
    Zwt.escapeRegExp = escapeRegExp;
    /**
     * @description 为字符串的某一端添加字符串。 如：005
     * @method pad
     * @param {String/Number} target 原字符串或数字
     * @param {Number} n 填充位数
     * @param {String} filling 填充字符串
     * @param {Boolean} right 在前或后补充
     * @param {Number} radix 转换进制 10进制或16进制
     * @author wyj on 14/5/5
     * @example
     *     Zwt.pad(5, 3, '0', false, 10); => '005'
     */
    function pad(a,b,c,d,e,f){var g=a.toString(e||10),h='',i=b;if(f&&f.prefix){i=b-f.prefix.length;if(i<0){throw new Error('n too small')}};c=c||'0';while(g.length<i){if(!d){g=c+g}else{g+=c}};return f.prefix+g}
    Zwt.pad = pad;
    /**
     * @description 格式化字符串，类似于模板引擎，但轻量级无逻辑
     * @param {String} str 原字符串
     * @param {Object} object 若占位符为非零整数形式即对象，则键名为点位符
     * @returns {String} 返回结果字符串
     * @author wyj on 14/5/5
     * @example
     *     Zwt.format("Result is #{0}, #{1}", 22, 23); => "Result is 22, 23"
     *     Zwt.format("#{name} is a #{sex}", {name : 'Jhon',sex : 'man'}); => "Jhon is a man"
     */
    function format(a,b){var c=Array.prototype.slice.call(arguments,1);return a.replace(/\\?\#{([^{}]+)\}/gm,function(d,e){if(d.charAt(0)=='\\')return d.slice(1);var f=Number(e);if(f>=0)return c[f];if(b&&b[e]!==void 0)return b[e];return''})}
    Zwt.format = format;
    /**
     * @description 移除字符串左端的空白
     * @method ltrim
     * @param {String} str 原字符串
     * @returns {String} 返回新字符串
     * @author wyj on 14/5/6
     * @example
     *     Zwt.ltrim('  dd    '); => 'dd    '
     */
    function ltrim(a){for(var b=0;b<a.length;b++){if(whitespace.indexOf(a.charAt(b))===-1){a=a.substring(b);break}};return whitespace.indexOf(a.charAt(0))===-1?(a):''}
    Zwt.ltrim = ltrim;
    /**
     * @description 移除字符串右端的空白
     * @method rtrim
     * @param {String} str 原字符串
     * @returns {String} 返回新字符串
     * @author wyj on 14/5/6
     * @example
     *     Zwt.rtrim('  dd    '); => '   dd'
     */
    function rtrim(a){for(var b=a.length-1;b>=0;b--){if(whitespace.lastIndexOf(a.charAt(b))===-1){a=a.substring(0,b+1);break}};return whitespace.indexOf(a.charAt(0))===-1?(a):''}
    Zwt.rtrim = rtrim;
    /**
     * @description 移除字符串两端的空白
     * @method trim
     * @param {String} str 原字符串
     * @returns {String} 返回新字符串
     * @author wyj on 14/5/6
     * @example
     *     Zwt.trim('  dd    '); => 'dd'
     */
    function trim(a){for(var b=0;b<a.length;b++){if(whitespace.indexOf(a.charAt(b))===-1){a=a.substring(b);break}};for(b=a.length-1;b>=0;b--){if(whitespace.lastIndexOf(a.charAt(b))===-1){a=a.substring(0,b+1);break}};return whitespace.indexOf(a.charAt(0))===-1?(a):''}
    Zwt.trim = trim;
    /**
     * @description 去除字符串中的所有空格
     * @method allTrim
     * @param {String} str 原字符串
     * @returns {String} 返回新字符串
     * @author wyj on 14/5/6
     * @example
     *     Zwt.allTrim('a b c'); => 'abc'
     */
    function allTrim(a){return a.toString().replace(/\s*/gm,'')}
    Zwt.allTrim = allTrim;
    // ArrayUtils
    /**
     * @description 根据索引值移除数组元素
     * @method removeAt
     * @param {Array} list 原数组
     * @param {Nubmer} index 数组索引
     * @returns {Boolean} 返回是否删除成功
     * @author wyj on 14/5/24
     * @example
     *      Zwt.removeAt(list, dx) => ;
     */
    function removeAt(a,b){return!!a.splice(b,1).length}
    Zwt.removeAt = removeAt;
    /**
     * @description 获取对象的所有KEY值
     * @method keys
     * @param {Object} obj 目标对象
     * @returns {Array}
     * @author wyj on 14/5/25
     * @example
     *   Zwt.keys({name:1,sort:1}); =>
     */
    function keys(a){if(typeOf(a)!=='object')return[];if(nativeKeys)return nativeKeys(a);var b=[];for(var c in a)if(hasKey(a,c))b.push(c);return b}
    Zwt.keys = keys;
    /**
     * @description 数组转化为object
     * @method arrayToObject
     * @param {Array} list 目标数组
     * @param {String} name key
     * @param {String} val value
     * @returns {Object} object
     * @warn 如果对象key值为数字类型， 则按数字从小到大排序
     * @author wyj on 14/5/24
     * @example
     *      var list4 = [{key:'key1',value:'value1'},{key:'key2',value:'value2'}];
     *      Zwt.arrayToObject(list4, 'key', 'value'); =>
     *      {key1: 'value1',key2: 'value2'}
     */
    function arrayToObject(a,b,c){var d={};each(a,function(e){if(typeOf(e[b])!=='undefined'){d[e[b]]=e[c]}});return d}
    Zwt.arrayToObject = arrayToObject;
    /**
     * @description 对象转化为数组
     * @mothod arrayFromObject
     * @param {Object} obj 待转化的对象
     * @returns {Array} 返回数组
     * @author wyj on 14/5/24
     * @example
     *      var object5 = {key1: 'value1',key2: 'value2'};
     *      var list5 = Zwt.arrayFromObject(object4, 'key', 'value'); =>
     *      [{key:'key1',value:'value1'},{key:'key2',value:'value2'}]
     */
    function arrayFromObject(a,b,c){var d=[];if(typeOf(a)!=='object'){return[]};each(a,function(e,f){var g={};g[b]=f;g[c]=e;d.push(g)});return d}
    Zwt.arrayFromObject = arrayFromObject;
    /**
     * @description 交换元素
     * @method arrayExchange
     * @param {Array} list 原数组
     * @param {Number} thisdx 第一个元素索引值
     * @param {Number} targetdx 第二个元素索引值
     * @param {Object} opts {String} opts.column 需要替换的列值;{Function} opts.callback(thisNode, nextNode) 回调函数 返回两个对调元素
     * @author wyj on 14/5/13
     * @example
     *  var list2 = [{name:1, sort:1},{name:2, sort:2}];
     *  Zwt.arrayExchange(list2, 0 , 1, {column:'sort',callback:function(thisNode, targetNode){}}); =>
     *  {name:2,sort:1}
     *  {name:1,sort:2}
     */
    function arrayExchange(a,b,c,d){if(b<0||b>a.length||c<0||c>a.length){throw new Error('method exchange: thisdx or targetdx is invalid !')};var e=a[b],f=a[c],g=e,h=0;if(d&&typeof d.column==='string'){h=e[d.column];e[d.column]=f[d.column];f[d.column]=h};if(d&&typeof d.callback==='function'){d.callback.apply(null,[e,f])};a[b]=f;a[c]=g}
    Zwt.arrayExchange = arrayExchange;
    /**
     * @description 数组插序
     * @method arrayInsert
     * @param {Array} list 原数组
     * @param {Number} thisdx 第一个元素索引
     * @param {Number} targetdx 第二个元素索引
     * @param {Object} opts    {String} opts.column:需要替换的列值; {Function} opts.callback(list)回调函数 返回第一个元素与第二个元素之间的所有元素
     * @author wyj on 14/5/15
     * @example
     *  var list3 = [{name:1, sort:1},{name:2, sort:2},{name:3, sort:3},{name:4, sort:4}];
     *  Zwt.arrayInsert(list3, 3 , 1, {column:'sort',callback:function(list){}}); =>
     *  {name:1,sort:1}
     *  {name:4,sort:2}
     *  {name:2,sort:3}
     *  {name:3,sort:4}
     */
    function arrayInsert(a,b,c,d){var e=[];if(b<c){for(var f=b;f<c-1;f++){arrayExchange(a,f,f+1,{column:d.column})};e=a.slice(0).slice(b,c)}else{for(var f=b;f>c;f--){arrayExchange(a,f,f-1,{column:d.column})};e=a.slice(0).slice(c,b+1)};if(typeof d.callback==='function'){d.callback.apply(null,[e])}}
    Zwt.arrayInsert = arrayInsert;
    // ImageUtils
    /**
     * @description 获取居中图片的margin值, 若图片宽高比太大，则不剪切
     * @method imageCrop
     * @param naturalW 图片宽度
     * @param naturalH 图片高度
     * @param targetW 展示框宽度
     * @param targetH 展示框高度
     * @returns {{width: *, height: *, marginTop: number, marginLeft: number}}
     * @author wyj on 14-04-24
     * @example
     *```$.each($(".imageCrop"), function(){
     *      $(this).load(function(response, status, xhr){
     *          var w = $(this).get(0).naturalWidth, h = $(this).get(0).naturalHeight;
     *          var width = $(this).attr("data-width"), height = $(this).attr("data-height");
     *          $(this).css(Zwt.imageCrop(w, h, width, height), 'fast');
     *          $(this).fadeIn('fast');
     *      });
     *  });
     */
    function imageCrop(a,b,c,d){var _w=parseInt(a,10),_h=parseInt(b,10),e=parseInt(c,10),f=parseInt(d,10);var g={width:e,height:f,marginTop:0,marginLeft:0};if(_w!=0&&_h!=0){var h=e/ _w, i = f /_h;if(h>1.5){g={width:'auto',height:f,marginTop:0,marginLeft:(f-_w)/2}}else if(i>1.5){g={width:e,height:'auto',marginTop:(f-_h)/2,marginLeft:0}}else{if(h<i){g={width:_w*i,height:f,marginTop:0,marginLeft:-(_w*i-e)/2}}else if(h>i){g={width:e,height:_h*h,marginTop:-(_h*h-f)/2,marginLeft:0}}else{g={width:e,height:f,marginTop:-(_h*i-f)/ 2, marginLeft: -(_w * i - e) /2}}}};return g}
    Zwt.imageCrop = imageCrop;

    // GirdUtils
    /**
     * @description 列表两端对齐，
     * @method girdJustify
     * @param options
     * @author wyj on 14/5/11
     * @example
     * <script type="text/javascript">
     *     var justifyCont = $("#gird");
     *     var justifylist = $("li", justifyCont);
     *     var justifyOpts = {
     *          containerWidth: justifyCont.width(), //容器总宽度
     *          childLength: justifylist.size(), //子元素个数
     *          childWidth: justifylist.eq(0).width(), // 子元素宽度
     *          childSpace: 10, //默认右边距
     *          callback: function (i, space) { // 回调函数， 执行CSS操作， i为第几个元素， space为边距
     *              justifylist.eq(i).css("margin-right", space);
     *          }
     *      };
     *  Zwt.girdJustify(justifyOpts);
     *  $(window).bind("resize", function () {
     *      justifyOpts.containerWidth = justifyCont.width();
     *      Zwt.girdJustify(justifyOpts);
     *  });
     * </script>
     */
    function girdJustify(a){var a={ow:parseFloat(a.containerWidth),cw:parseFloat(a.childWidth),cl:a.childLength,cm:parseFloat(a.childSpace),fn:a.callback};var b=Math.floor((a.ow-a.cm)/(a.cw+a.cm));var c=Math.floor((a.ow-a.cw*b)/(b-1));var d=Math.ceil(a.cl/b);for(var e=0;e<d;e++){for(var f=b*e;f<b*(e+1);f++){if(f!=(b*(e+1)-1)){a.fn(f,c)}else{a.fn(f,0)}}}}
    Zwt.girdJustify = girdJustify;
    // TreeUtils
    /**
     * @description 构建树
     * @method bulidSubNode
     * @param {Array} rootlist 根节点列表
     * @param {Array} totalList 总列表 {String}
     * @param {Object} opts {String} opts.category_id 分类Id {String} opts.belong_id 父类Id
     * @author wyj on 14/5/15
     * @example
     *  var root = [];
     *  for(var i = 0, len = list.length; i < len; i++){
     *      if(list[i]['grade'] === '01'){
     *          root.push(list[i]);
     *      }
     *  }
     *  Zwt.bulidSubNode(root, list);
     */
    function bulidSubNode(rootlist,totalList,opts){var a={category_id:'category_id',belong_id:'belong_id',child_tag:'cates',dxs:[]};if(typeof(opts)!='undefined'){Zwt.extend(a,opts)};if(typeof(a['dxs'])!=='undefined'){for(var c=0,len3=a['dxs'].length;c<len3;c++){totalList.splice(a['dxs'][c],1)}};for(var b=0,len=rootlist.length;b<len;b++){var c=rootlist[b];var d=[];for(var e=0,len1=totalList.length;e<len1;e++){var f=totalList[e];if(c[a.category_id]==f[a.belong_id]){d.push(f);}};c[a.child_tag]=d.slice(0);if(d.length>0){c.hasChild=true;arguments.callee(d,totalList,a)}else{c.hasChild=false;c.cates=[]}}}
    Zwt.bulidSubNode = bulidSubNode;
    /**
     * @description 获取select表单控件样式的树
     * @method bulidSelectNode
     * @param {Array} rootlist 根节点列表
     * @param {Number} zoom 缩进
     * @param {Object} obj {String} opts.name 字段名称
     * @author wyj on 14/5/15
     * @example
     *  Zwt.bulidSelectNode(rootlist, 2, {
     *      name : 'name'
     *  });
     */
    function bulidSelectNode(a,b,c){var d=b;for(var e=0,len=a.length;e<len;e++){var f='';for(var g=0;g<d;g++){f=f+'　'};f=f+"|-";a[e][c['name']]=f+a[e][c['name']];if(a[e].hasChild){arguments.callee(a[e].cates,b=d+2,c)}}}
    Zwt.bulidSelectNode = bulidSelectNode;
    // UrlUtils
    /**
     * @description 获取浏览器参数列表
     * @method getUrlParam
     * @param name 参数名称
     * @returns {String} 不存在返回NULL
     * @author wyj on 14-04-26
     * @example
     *      (function($, Zwt){ $.getUrlParam = Zwt.getUrlParam;})(jQuery, Zwt);
     *      console.log($.getUrlParam('name'));
     */
    function getUrlParam(a){var b=new RegExp("(^|&)"+a+"=([^&]*)(&|$)"),c=window.location.search.substr(1).match(b);if(c!=null)return unescape(c[2]);return null}
    Zwt.getUrlParam = getUrlParam;
    // PaginationUtils
    /**
     * @description 获取最大页数
     * @method getMaxPage
     * @param {number} totalCount 总条数
     * @param {number} pageSize 每页显示的条数
     * @returns {number} 返回最大页数
     * @author wyj on 14-04-26
     * @example
     * ````Zwt.getMaxPage(parseInt(50), parseInt(10)); => 5
     */
    function getMaxPage(a,b){return a%b==0?a/ pageSize : Math.floor(a/b)+1}
    Zwt.getMaxPage = getMaxPage;
    /**
     * @description 获取最大页数【版本二】
     * @method getMaxPage_2
     * @param { Number} totalCount otalCount 总条数
     * @param {Number} pageSize pageSize 每页显示的条数
     * @returns {Number} 返回最大页数
     * @author wyj on 14/04/26
     * @example
     *     Zwt.getMaxPage(parseInt(50), parseInt(10)); => 5
     */
    function getMaxPage_2(a,b){return a>b?Math.ceil(a/b):1}
    Zwt.getMaxPage_2 = getMaxPage_2;
    /**
     * @description 根据page   pageSize  截取列表
     * @method getListByPage
     * @param {Array} pageList  全部列表
     * @param page 当前页
     * @param pageSize  每页显示几条
     * @returns {Array} 返回结果集
     * @author wyj on 14-04-26
     * @example
     * ````Zwt.getListByPage(pageList, page, pageSize);
     */
    function getListByPage(a,b,c){var a=a,d=a.length,e=new Array();var f=this.getMaxPage(d,c);b=b<1?1:b;b=b>f?maxPage:b;var g=((b-1)*c<0)?0:((b-1)*c),h=(g+c)<0?0:(g+c);h=h>d?totalCount:(g+c);for(var i=g;i<h;i++){e.push(a[i])};return e}
    Zwt.getListByPage = getListByPage;
    /**
     * @description 通过当前页、总页数及显示个数获取分页数字
     * @method getPaginationNumber
     * @param {Number} page 当前页
     * @param {Number} totalPage 总页数
     * @param {Number} length 显示数
     * @returns {Array} 返回数字集
     * @example
     *     Zwt.getPaginajtionNumber(parseInt(6), parseInt(50), 9); => 3,4,5,6,7,8,9
     */
    function getPaginationNumber(a,b,c){var a=parseInt(a,10),b=parseInt(b,10),d=1,e=b,f=c||11,g=[];if(b>f){var i=(f-1)/2;if(a<=i){d=1;e=i*2-1}else if(a>b-i){d=b-i*2+2;e=b}else{d=a-(i-1);e=a+(i-1)}};for(var h=d;h<=e;h++){g.push(h)};return g}
    Zwt.getPaginationNumber = getPaginationNumber;

    // CacheUtils
    /**
     * @description 数据缓存
     * @mehtod getCache
     * @param {String} uId 唯一标识符
     * @param {Object} ctx 缓存对象
     * @param {String} options.area 缓存分区
     * @param {Object} options {Function} options.getData 获取待缓存的数据
     * @returns {*} 返回缓存数据
     * @author wyj on 14/5/3
     * @example
     *     Zwt.getCache('uId', session, {
     *          area : 'dd',
     *          getData : function(data){
     *              return cache_data;
     *          }
     *      }))
     */
    function getCache(a,b,c){var d={area:'templates',getData:null};Zwt.extend(d,c);b.cache=b.cache||{};if(typeof b.cache[d.area]==='undefined'){b.cache[d.area]={}};var e=b.cache[d.area][a];if(!e){e=b.cache[d.area][a]=d.getData.call(null,e);console.log('【Cache】data: '+a+' is cached !')};return e}
    Zwt.getCache = getCache;

    // CssUtils
    /**
     * @description 获取当前元素的css选择符，规则：父模块的ID值 + 当前元素的ID值 > class值
     * @method getSelector
     * @param {Element} target 目标元素
     * @param {String} parentClass 父模块class选择符
     * @param {Object} $  jquery对象 或 其它
     * @returns {string} 返回当前元素的选择符
     * @author wyj on 14/5/5
     * @example
     *     Zwt.getSelector($('#gird-li').get(0), 'moveChild')) => ;
     */
    function getSelector(a,b,c){var d="";var e=c(a).hasClass(b);var f=c(a).attr("id");var g=c(a).attr("class");if(f.length>0){d="#"+f}else if(g.length>0){d="."+c.trim(g).split(" ")[0]}else{d=getTagName(a);d=arguments.callee(a.parentNode)+" "+d};return e?selector:'#'+c(a).parents('.moveChild:first').attr('id')+' '+d}
    Zwt.getSelector = getSelector;
    /**
     * @description 获取元素的标签符号 , 大写的转换成小写的
     * @method getTagName
     * @param {Element} target 目标元素
     * @returns {string} 返回标签符号
     * @author wyj on 14/5/6
     * @example
     *     Zwt.getTagName(document.getElementById('a')); ==>　'div'
     */
    function getTagName(a){return a.tagName.toLowerCase()}
    Zwt.getTagName = getTagName;
    // DateUtils
    /**
     * @description 格式化时间
     * @method dateFormat
     * @param {String} date 时间
     * @param {String} fmt 格式化规则 如‘yyyy-MM-dd’
     * @returns {String} 返回格式化时间
     * @author wyj on 14/5/3
     * @example
     *     Zwt.dateFormat(new Date(), 'yyyy-MM-dd'); => '2014-05-03'
     */
    function dateFormat(a,b){var a=a?new Date(a):new Date();var c={"M+":a.getMonth()+1,"d+":a.getDate(),"h+":a.getHours(),"m+":a.getMinutes(),"s+":a.getSeconds(),"q+":Math.floor((a.getMonth()+3)/3),"S":a.getMilliseconds()};b=b||'yyyy-MM-dd';if(/(y+)/.test(b))b=b.replace(RegExp.$1,(a.getFullYear()+"").substr(4-RegExp.$1.length));try{for(var d in c){if(new RegExp("("+d+")").test(b))b=b.replace(RegExp.$1,(RegExp.$1.length==1)?(c[d]):(("00"+c[d]).substr((""+c[d]).length)))}}catch(e){console.log('【Error】: DateUtils.dataFormat '+e)};return b}
    Zwt.dateFormat = dateFormat;
    // DomUtils
    /**
     * @description 清空该元素下面的所有子节点【大数据量时】 在数据量小的情况下可以用jQuery的empty()方法
     * @param parentNode
     * @author wyj on 14-04-26
     * @warning parentNode必须为DOM对象，$('#selector').get(0);
     * @example
     * ````Zwt.clearAllNode(document.getElementById("showResFilesContent"));
     */
    function clearAllNode(a){while(a.firstChild){var b=a.removeChild(a.firstChild);b=null}}
    Zwt.clearAllNode = clearAllNode;












    /**
     * @description 实用程序函数扩展Zwt。
     * 传递一个 {name: function}定义的哈希添加到Zwt对象，以及面向对象封装。
     * @method mixin
     * @param obj
     * @author wyj on 14/5/22
     * @example
     * Zwt.mixin({
     *   capitalize: function(string) {
     *      return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
     *   }
     * });
     * Zwt("fabio").capitalize(); => "Fabio"
     */
    Zwt.mixin=function(a){Zwt.each(Zwt.functions(a),function(b){var c=Zwt[b]=a[b];Zwt.prototype[b]=function(){var d=[this._wrapped];push.apply(d,arguments);return result.call(this,c.apply(Zwt,d))}})};
    Zwt.mixin(Zwt);
    Zwt.extend(Zwt.prototype,{chain:function(){this._chain=true;return this},value:function(){return this._wrapped}});
    // request.js
    if (typeof define === 'function' && define.amd) {
        define('Zwt', [], function() {
            return Zwt;
        });
    }
}.call(this));