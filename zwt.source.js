(function() {
    var root = this;
    // 系统原型方法
    var slice = Array.prototype.slice, push = Array.prototype.push, toString = Object.prototype.toString,
        hasOwnProperty   = Object.prototype.hasOwnProperty, concat = Array.prototype.concat;
    // ECMAScript 5
    var nativeIsArray = Array.isArray, nativeKeys = Object.keys, nativeBind = Object.prototype.bind;
    var whitespace = ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\n\
        \u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000';
    // 创建Zwt对象
    var Zwt = function(obj) {
        if (obj instanceof Zwt) return obj;
        if (!(this instanceof Zwt)) return new Zwt(obj);
        this._wrapped = obj;
    };
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
    var createCallback = function(func, context, argCount) {
        if (!context) return func;
        switch (argCount == null ? 3 : argCount) {
            case 1: return function(value) {
                return func.call(context, value);
            };
            case 2: return function(value, other) {
                return func.call(context, value, other);
            };
            case 3: return function(value, index, collection) {
                return func.call(context, value, index, collection);
            };
            case 4: return function(accumulator, value, index, collection) {
                return func.call(context, accumulator, value, index, collection);
            };
        }
        return function() {
            return func.apply(this, arguments);
        };
    };

    /**
     * @description 遍历数据或对象。如果传递了context参数，则把callback绑定到context对象上。
     * 如果list是数组，callback的参数是：(element, list, index, first, last)。
     * 如果list是个JavaScript对象，callback的参数是 (value, key, list, index, first, last))。返回list以方便链式调用。
     * 如果callback 返回false,则中止遍历
     * @method each
     * @param {*} obj 遍历对象
     * @param {}
     * @example
     * Zwt.each([1, 2, 3], alert); => alerts each number in turn...
     * Zwt.each({one: 1, two: 2, three: 3}, alert); => alerts each number value in turn...
     */
    function each(obj, callback, context) {
        var i, length, first = false, last = false;
        if (obj == null) return obj;
        callback = createCallback(callback, context);
        if (obj.length === +obj.length) {
            for (i = 0, length = obj.length; i < length; i++) {
                first = i === 0 ? true : false; last = i === length - 1 ? true : false;
                if (callback(obj[i], obj, i, first, last) === false) break;
            }
        } else {
            var ks = keys(obj);
            for (i = 0, length = ks.length; i < length; i++) {
                first = i === 0 ? true : false; last = i === ks.length - 1 ? true : false;
                if (callback(obj[ks[i]], ks[i], obj, i, first, last) === false) break;
            }
        }
        return obj;
    };
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
    Zwt.extend = function(obj) {
        if (typeOf(obj) !== 'object') return obj;
        each(slice.call(arguments, 1), function(source) {
            for (var prop in source) {
                obj[prop] = source[prop];
            }
        });
        return obj;
    };
    /**
     * @description 通过原型继承创建一个新对象
     * @method inherit
     * @param {Object} target 继承对象
     * @returns {*}
     * @example
     * var target = {x:'dont change me'};var newObject = Zwt.inherit(target); =>  index.html:140
     * dont change me
     */
    function inherit(target){
        if (target == null) throw TypeError();
        if (Object.create)
            return Object.create(target);
        var type = typeof target;
        if (type !== 'object' && type !== 'function') throw TypeError();
        function fn(){};
        fn.prototype = target;
        return new fn();
    }
    Zwt.inherit = inherit;

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
    Zwt.functions = Zwt.methods = function(obj) {
        var names = [];
        for (var key in obj) {
            if (Zwt.isFunction(obj[key])) names.push(key);
        }
        return names.sort();
    };
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
    Zwt.chain = function(obj) {
        return Zwt(obj).chain();
    };
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
    var result = function(obj) {
        return this._chain ? Zwt(obj).chain() : obj;
    };
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
    function typeOf(target){
        var _type = {"undefined" : "undefined", "number": "number", "boolean": "boolean", "string": "string",
            "[object Function]" : "function", "[object RegExp]" : "regexp", "[object Array]" : "array",
            "[object Date]" : "date", "[object Error]" : "error" };
        return _type[typeof target] || _type[toString.call(target)] || (target ? "object" : "null");
    }
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
    function hasKey(obj, key) {
        return obj != null && hasOwnProperty.call(obj, key);
    }
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
    function pick(obj, callback, context) {
        var result = {}, key;
        if (typeOf(callback) === 'function') {
            for (key in obj) {
                var value = obj[key];
                if (callback.call(context, value, key, obj)) result[key] = value;
            }
        } else {
            var keys = concat.apply([], slice.call(arguments, 1));
            each(keys, function(key){
                if(key in obj) result[key] = obj[key];
            });
        }
        return result;
    }
    Zwt.pick = pick;

    /**
     * @description 获取对象属性值
     * @param key
     * @returns {Function}
     */
    function property(key) {
        return function(object) {
            return object[key];
        };
    }
    Zwt.property = property;

    function adapter(obj, context, argCount) {
        if (obj == null) { return function(obj) {return obj;};}
        if (typeOf(obj) === 'function') return createCallback(obj, context, argCount);
        //if (typeOf(obj) === 'object') return _.matches(obj);
        return property(obj);
    }
    Zwt.adapter = adapter;
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
    function delay(func, wait){
        if (typeOf(func) !== 'function') {
            throw new TypeError;
        }
        return setTimeout(function(){
            func.apply(undefined, slice.call(arguments));
        }, wait);
    }
    Zwt.delay = delay;

    // StringUtils =============================================================================================================================================
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
     function repeat(target, n){
        var s = target, total = '';
        while ( n > 0 ){
            if (n % 2 == 1){ total += s; }
            if (n == 1){ break; }
            s += s;
            n = n >> 1;
        }
        return total;
    }
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
    function contains(target, str, separator){
        return separator ? (separator + target + separator).indexOf(separator + str + separator) > -1 : target.indexOf(str) > -1;
    }
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
    function startsWith(target, str, ignorecase){
        var start_str = target.substr(0, str.length);
        return ignorecase ? start_str.toLowerCase() === str.toLowerCase() : start_str === str;
    }
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
    function endsWidth(target, str, ignorecase){
        var end_str = target.substring(target.length - str.length);
        return ignorecase ? end_str.toLowerCase() === str.toLowerCase() : end_str === str;
    }
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
    function byteLen(target, fix){
        fix = fix ? fix : 2;
        var str = new Array(fix + 1).join('-');
        return target.replace(/[^\x00-\xff]/g, str).length;
    }
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
    function truncate(target, length, truncation){
        length = length || 30;
        truncation = truncation === void(0) ? '...' : truncation;
        return target.length > length ? (target.slice(0, length = truncation.length) + truncation) : String(target);
    }
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
    function cutByte(str, length, truncation) {
        //提前判断str和length
        if (!(str + "").length || !length || +length <= 0) {
            return "";
        }
        var length = +length,
            truncation = typeof(truncation) == 'undefined' ? "..." : truncation.toString(),
            endstrBl = this.byteLen(truncation);
        if (length < endstrBl) {
            truncation = "";
            endstrBl = 0;
        }
        //用于二分法查找
        function n2(a) {var n = a / 2 | 0;return (n > 0 ? n : 1)}
        var lenS = length - endstrBl, _lenS = 0, _strl = 0;
        while (_strl <= lenS) {
            var _lenS1 = n2(lenS - _strl),
                addn = this.byteLen(str.substr(_lenS, _lenS1));
            if (addn == 0) { return str; }
            _strl += addn;
            _lenS += _lenS1;
        }
        if (str.length - _lenS > endstrBl || this.byteLen(str.substring(_lenS - 1)) > endstrBl) {
            return str.substr(0, _lenS - 1) + truncation
        } else {
            return str;
        }
    }
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
    function stripScripts(target){
        return String(target || '').replace(/<script[^>]*>([\S\s]*?)<\/script>/img, '');
    }
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
    function stripTags(target){
        return String(target || '').replace(/<[^>]+>/img,'');
    }
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
    function escapeHTML(target){
        return target.replace(/&/mg, '&amp;')
            .replace(/</mg, '&lt;')
            .replace(/>/mg, '&gt;')
            .replace(/"/mg, '&quot;')
            .replace(/'/mg, '&#39;');
    }
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
    function unescapeHTML(target){
        return target.replace(/&amp;/mg, '&')
            .replace(/&lt;/mg, '<')
            .replace(/&gt;/mg, '>')
            .replace(/&quot;/mg, '"')
            .replace(/&#([\d]+);/mg, function($0, $1){
                return String.fromCharCode(parseInt($1, 10));
            });
    }
    Zwt.unescapeHTML = unescapeHTML;
    /**
     * @description 将字符串安全格式化为正则表达式的源码
     * @param {String} target 原字符串
     * @returns {XML|string|void|*}
     * @author wyj on 14/5/16
     * @example
     *      Zwt.escapeRegExp('aaa/[abc]/') => aaa\/\[abc\]\/;
     */
    function escapeRegExp(target){
        return target.replace(/([-.*+?^${}()|[\]\/\\])/img, '\\$1');
    }
    Zwt.escapeRegExp = escapeRegExp;
    /**
     * @description 为字符串的某一端添加字符串。 如：005
     * @method pad
     * @param {String/Number} target 原字符串或数字
     * @param {Number} n 填充位数
     * @param {String} filling 填充字符串
     * @param {Boolean} right 在前或后补充
     * @param {Number} radix 转换进制 10进制或16进制
     * @param {Object} opts {String} opts.prefix 前缀
     * @author wyj on 14/5/5
     * @example
     *     Zwt.pad(5, 10, '0', false, 10, {prefix:'prefix'}); => prefix0005
     */
    function pad(target, n, filling, right, radix, opts){
        var str = target.toString(radix || 10), prefix = '', length = n;
        if (opts && opts.prefix){
            length = n - opts.prefix.length;
            prefix = opts.prefix;
            if (length < 0){throw new Error('n too small');}
        }
        filling = filling || '0';
        while (str.length < length){
            if (!right){
                str = filling + str;
            } else{
                str += filling;
            }
        }
        return prefix + str;
    }
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
    function format(str, object){
        var array = Array.prototype.slice.call(arguments, 1);
        return str.replace(/\\?\#{([^{}]+)\}/gm, function(match, name){
            if (match.charAt(0) == '\\')
                return match.slice(1);
            var index = Number(name);
            if (index >= 0)
                return array[index];
            if (object && object[name] !== void 0)
                return object[name];
            return '';
        });
    }
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
    function ltrim(str){
        for(var i = 0; i < str.length; i++){
            if(whitespace.indexOf(str.charAt(i)) === -1){
                str = str.substring(i);
                break;
            }
        }
        return whitespace.indexOf(str.charAt(0)) === -1 ? (str) : '';
    }
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
    function rtrim(str){
        for(var i = str.length -1; i >= 0; i--){
            if(whitespace.lastIndexOf(str.charAt(i)) === -1){
                str = str.substring(0, i + 1);
                break;
            }
        }
        return whitespace.indexOf(str.charAt(0)) === -1 ? (str) : '';
    }
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
    function trim(str){
        for(var i = 0; i < str.length; i++){
            if(whitespace.indexOf(str.charAt(i)) === -1){
                str = str.substring(i);
                break;
            }
        }
        for(i = str.length -1; i >= 0; i--){
            if(whitespace.lastIndexOf(str.charAt(i)) === -1){
                str = str.substring(0, i + 1);
                break;
            }
        }
        return whitespace.indexOf(str.charAt(0)) === -1 ? (str) : '';
    }
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
    function allTrim(str){
        return str.toString().replace(/\s*/gm, '');
    }
    Zwt.allTrim = allTrim;
    // ArrayUtils ===============================================================================================================================================
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
    function removeAt(list, index){
        return !!list.splice(index, 1).length;
    }
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
    function keys(obj) {
        if (typeOf(obj) !== 'object') return [];
        if (nativeKeys) return nativeKeys(obj);
        var keys = [];
        for (var key in obj) if (hasKey(obj, key)) keys.push(key);
        return keys;
    }
    Zwt.keys = keys;
    /**
     * @description 数组过滤
     * @method filter
     * @param {Array} collection 数组
     * @param {Function} callback 回调函数
     * @param args
     * @author wyj on 14/6/6
     * @example
     *
     *
     */
    function filter(collection, callback, thisArgs){
        var result = [];
        if (!collection) return result;



        predicate = lookupIterator(predicate, context);
        each(collection, function(value, index, list) {
            if (predicate(value, index, list)) results.push(value);
        });
        return result;
    }
    Zwt.filter = filter;


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
    function arrayToObject(list, key, val){
        var obj = {};
        each(list, function(item){
            if(typeOf(item[key]) !== 'undefined'){
                obj[item[key]] = item[val];
            }
        });
        return obj;
    }
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
    function arrayFromObject(obj, name, value){
        var list = [];
        if(typeOf(obj) !== 'object'){
            return [];
        }
        each(obj, function(val, key){
            var object = {};
            object[name] = key; object[value] = val;
            list.push(object);
        });
        return list;
    }
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
    function arrayExchange(list, thisdx, targetdx, opts) {
        if (thisdx < 0 || thisdx > list.length || targetdx < 0 || targetdx > list.length) {
            throw new Error('method exchange: thisdx or targetdx is invalid !');
        }
        var thisNode = list[thisdx],
            nextNode = list[targetdx],
            temp = thisNode,
            thisSort = 0;
        // 更换列值
        if (opts && typeof opts.column === 'string') {
            thisSort = thisNode[opts.column];
            thisNode[opts.column] = nextNode[opts.column];
            nextNode[opts.column] = thisSort;
        }
        // 更新数据
        if (opts && typeof opts.callback === 'function') {
            opts.callback.apply(null, [thisNode, nextNode]);
        }
        // 替换位置
        list[thisdx] = nextNode;
        list[targetdx] = temp;
    }
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
    function arrayInsert(list, thisdx, targetdx, opts) {
        var tempList = []; // 用于存放改变过的值
        if (thisdx < targetdx) {
            for (var i = thisdx; i < targetdx - 1; i++) {
                arrayExchange(list, i, i + 1, {
                    column: opts.column
                });
            }
            tempList = list.slice(0).slice(thisdx, targetdx);
        } else {
            for (var i = thisdx; i > targetdx; i--) {
                arrayExchange(list, i, i - 1, {
                    column: opts.column
                });
            }
            tempList = list.slice(0).slice(targetdx, thisdx + 1);
        }
        if (typeof opts.callback === 'function') {
            opts.callback.apply(null, [tempList]);
        }
    }
    Zwt.arrayInsert = arrayInsert;


    // ImageUtils ==============================================================================================================================================
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
    function imageCrop(naturalW, naturalH, targetW, targetH) {
        var _w = parseInt(naturalW, 10), _h = parseInt(naturalH, 10),
            w = parseInt(targetW, 10), h = parseInt(targetH, 10);
        var res = { width: w, height: h, marginTop: 0, marginLeft: 0 }
        if (_w != 0 && _h != 0) {
            var z_w = w / _w, z_h = h / _h;
            if (z_w > 1.5) {
                //若高度 远远 超出 宽度
                res = { width: 'auto', height: h, marginTop: 0, marginLeft: (h - _w) / 2 };
            } else if (z_h > 1.5) {
                //若宽度 远远 超出 高度
                res = { width: w, height: 'auto', marginTop: (h - _h) / 2, marginLeft: 0 };
            }
            else {
                if (z_w < z_h) {
                    res = { width: _w * z_h, height: h, marginTop: 0, marginLeft: -(_w * z_h - w) / 2 };
                } else if (z_w > z_h) {
                    res = { width: w, height: _h * z_w, marginTop: -(_h * z_w - h) / 2, marginLeft: 0 };
                } else {
                    res = { width: w, height: h, marginTop: -(_h * z_h - h) / 2, marginLeft: -(_w * z_h - w) / 2 }
                }
            }
        }
        return res;
    }
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
    function girdJustify(opts){
        var opts = {
            ow : parseFloat(opts.containerWidth),
            cw : parseFloat(opts.childWidth),
            cl : opts.childLength,
            cm : parseFloat(opts.childSpace),
            fn : opts.callback
        }
        //每行显示的个数
        var rn = Math.floor((opts.ow - opts.cm) / (opts.cw + opts.cm));
        //间隔
        var space = Math.floor((opts.ow - opts.cw * rn) / (rn - 1));
        //总共有几行
        var rows = Math.ceil(opts.cl / rn);
        for ( var i = 0; i < rows; i++) {
            for ( var j = rn * i; j < rn * (i + 1); j++) {
                if (j != (rn * (i + 1) - 1)) {
                    // 是否是每行的最后一个， 否则添加右边距
                    opts.fn(j, space);
                } else{
                    opts.fn(j, 0);
                }
            }
        }
    }
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
    function bulidSubNode(rootlist, totalList, opts) {
        var options = {
            category_id: 'category_id',//分类ＩＤ
            belong_id: 'belong_id',//父类ＩＤ
            child_tag: 'cates',
            dxs: []
        }
        if (typeof(opts) != 'undefined') {
            Zwt.extend(options, opts);
        }
        if (typeof(options['dxs']) !== 'undefined') {
            for (var k = 0 , len3 = options['dxs'].length; k < len3; k++) {
                totalList.splice(options['dxs'][k], 1);
            }
        }
        for (var i = 0, len = rootlist.length; i < len; i++) {
            var item = rootlist[i];
            var navlist = [];
            // 设置子元素
            for (var j = 0, len1 = totalList.length; j < len1; j++) {
                var newResItem = totalList[j];
                if (item[options.category_id] == newResItem[options.belong_id]) {
                    navlist.push(newResItem);
                    //options['dxs'].push(j);
                }
            }
            // 设置子元素
            item[options.child_tag] = navlist.slice(0);
            // 判断是否有下级元素
            if (navlist.length > 0) {
                item.hasChild = true;
                arguments.callee(navlist, totalList, options);
            } else {
                item.hasChild = false;
                item.cates = [];
            }
        }
    }
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
    function  bulidSelectNode(rootlist, zoom, opts) {
        var z = zoom;
        for (var i = 0, len = rootlist.length; i < len; i++) {
            var space = '';
            for (var j = 0; j < z; j++) {
                space = space + '　';
            }
            space = space + "|-";
            rootlist[i][opts['name']] = space + rootlist[i][opts['name']];
            if (rootlist[i].hasChild) {
                arguments.callee(rootlist[i].cates, zoom = z + 2, opts);
            }
        }
    }
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
    function getUrlParam(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"),
            r = window.location.search.substr(1).match(reg);
        if (r!=null) return unescape(r[2]); return null;
    }
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
    function getMaxPage(totalCount, pageSize){
        return totalCount % pageSize == 0 ? totalCount / pageSize : Math.floor(totalCount/pageSize) + 1;
    }
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
    function getMaxPage_2(totalCount, pageSize){
        return totalCount > pageSize ? Math.ceil(totalCount / pageSize) : 1;
    }
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
    function getListByPage(pageList, page, pageSize){
        var pageList = pageList,
            totalCount = pageList.length,
            newList = new Array();
        var maxPage = this.getMaxPage(totalCount, pageSize);
        page = page < 1 ? 1 : page;
        page = page > maxPage ? maxPage : page;
        var start = ((page - 1) * pageSize < 0) ? 0 : ((page - 1) * pageSize),
            end = (start + pageSize) < 0 ? 0 : (start + pageSize);
        end = end > totalCount ? totalCount : (start + pageSize);
        for(var i = start; i < end ; i++){
            newList.push(pageList[i]);
        }
        return newList;
    }
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
    function getPaginationNumber(page, totalPage, length){
        var page = parseInt(page, 10),
            totalPage = parseInt(totalPage, 10),
            start = 1,
            end = totalPage,
            pager_length = length || 11,    //不包next 和 prev 必须为奇数
            number_list = [];
        if ( totalPage > pager_length ){
            var offset = ( pager_length - 1) / 2;
            if (page <= offset){
                start = 1;
                end = offset * 2 - 1;
            } else if(page > totalPage - offset){
                start = totalPage - offset * 2  +2;
                end = totalPage;
            } else{
                start = page - (offset - 1);
                end = page + (offset -1);
            }
        }
        for (var i = start; i <= end; i++) {
            number_list.push(i);
        }
        return number_list;
    }
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
    function getCache(uId, ctx, options) {
        var opts = {
            area : 'templates',
            getData : null
        }
        Zwt.extend(opts, options);
        ctx.cache = ctx.cache || {};
        if ( typeof ctx.cache[opts.area] === 'undefined') { ctx.cache[opts.area] = {}; }
        var data = ctx.cache[opts.area][uId];
        if ( !data ) {
            data = ctx.cache[opts.area][uId] = opts.getData.call(null, data);
            console.log('【Cache】data: '+uId + ' is cached !');
        }
        return data;
    }
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
    function getSelector(target, parentClass, $){
        var selector = "";
        var isModule = $(target).hasClass(parentClass);
        var id = $(target).attr("id");
        var className = $(target).attr("class");
        if (id.length > 0){
            selector ="#" + id;
        } else if(className.length > 0){
            selector = "."+ $.trim(className).split(" ")[0];
        } else{
            selector = getTagName(target);
            selector = arguments.callee(target.parentNode) + " " + selector;
        }
        return isModule ?  selector : '#' + $(target).parents('.moveChild:first').attr('id') + ' ' + selector;
    }
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
    function getTagName(target){
        return target.tagName.toLowerCase();
    }
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
    function dateFormat(date, fmt){
        var date = date ? new Date(date) : new Date();
        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        fmt = fmt || 'yyyy-MM-dd';
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        try{
            for (var k in o){
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }catch(e){
            console.log('【Error】: DateUtils.dataFormat ' + e);
        }
        return fmt;
    }
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
    function clearAllNode(parentNode){
        while (parentNode.firstChild) {
            var oldNode = parentNode.removeChild(parentNode.firstChild);
            oldNode = null;
        }
    }
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
    Zwt.mixin = function(obj) {
        Zwt.each(Zwt.functions(obj), function(name) {
            var func = Zwt[name] = obj[name];
            Zwt.prototype[name] = function() {
                var args = [this._wrapped];
                push.apply(args, arguments);
                return result.call(this, func.apply(Zwt, args));
            };
        });
    };
    Zwt.mixin(Zwt);
    Zwt.extend(Zwt.prototype, {
        chain: function() {
            this._chain = true;
            return this;
        },
        value: function() {
            return this._wrapped;
        }
    });
    // request.js
    if (typeof define === 'function' && define.amd) {
        define('Zwt', [], function() {
            return Zwt;
        });
    }
}.call(this));