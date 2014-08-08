/**
 * 工具类库.
 *
 * @description 修改urlParsingNode变量 on 14/7/29
 * @class Est - 工具类库
 * @constructor Est
 */
;(function() {'use strict';
    var root = this;
    /**
     * @description 系统原型方法
     * @method [变量] - slice push toString hasOwnProperty concat
     */
    var slice = Array.prototype.slice, push = Array.prototype.push, toString = Object.prototype.toString,
        hasOwnProperty   = Object.prototype.hasOwnProperty, concat = Array.prototype.concat;
    /**
     * @description ECMAScript 5 原先方法
     * @method [变量] - nativeIsArray nativeKeys nativeBind
     */
    var nativeIsArray = Array.isArray, nativeKeys = Object.keys, nativeBind = Object.prototype.bind;
    var whitespace = ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\n\
        \u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000';
    var uid = ['0', '0', '0'];
    var urlParsingNode = null;
    /**
     * @description define
     * @method [变量] - moduleMap
     */
    var moduleMap = {};
    var fileMap = {};
    var noop = function () {};
    /**
     * @description  定义数组和对象的缓存池
     * @method [变量] - maxPoolSize arrayPool objectPool
     */
    var maxPoolSize = 40;
    var arrayPool = [], objectPool = [];

    /**
     * @description 创建Est对象
     * @method [对象] - Est
     */
    var Est = function(obj) {
        if (obj instanceof Est) return obj;
        if (!(this instanceof Est)) return new Est(obj);
        this._wrapped = obj;
    };
    Est.version = '1.1.0';
    /**
     * @description 用于node.js 导出
     * @method [模块] - exports
     */
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = Est;
        }
        exports.Est = Est;
    } else {
        root.Est = Est;
    }
    function identity(value) {
        return value;
    }
    Est.identity = identity;
    var matchCallback = function(value, context, argCount) {
        if (value == null) return Est.identity;;
        if (Est.isFunction(value)) return createCallback(value, context, argCount);
        if (typeOf(value) === 'object') return matches(value);
        if (typeOf(value) === 'array') return value;
        return property(value);
    };
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
     * 如果list是数组，callback的参数是：(element, index, list, first, last)。
     * 如果list是个JavaScript对象，callback的参数是 (value, key, list, index, first, last))。返回list以方便链式调用。
     * 如果callback 返回false,则中止遍历
     * @method [数组] - each
     * @param {Array/Object} obj 遍历对象
     * @param {Function} callback 回调函数
     * @param {Object} context 上下文
     * @return {Object}
     * @example
     *     Est.each([1, 2, 3], alert); => alerts each number in turn...
     *     Est.each({one: 1, two: 2, three: 3}, alert); => alerts each number value in turn...
     */
    function each(obj, callback, context) {
        var i, length, first = false, last = false;
        if (obj == null) return obj;
        callback = createCallback(callback, context);
        if (obj.length === +obj.length) {
            for (i = 0, length = obj.length; i < length; i++) {
                first = i === 0 ? true : false; last = i === length - 1 ? true : false;
                if (callback(obj[i], i, obj, first, last) === false) break;
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
    Est.each = Est.forEach = each;
    /**
     * @description 复制source对象中的所有属性覆盖到destination对象上，并且返回 destination 对象.
     * 复制是按顺序的, 所以后面的对象属性会把前面的对象属性覆盖掉(如果有重复).
     * @method [对象] - extend
     * @param {Object} obj destination对象
     * @return {Object} 返回 destination 对象
     * @author wyj on 14/5/22
     * @example
     *      Est.extend({name: 'moe'}, {age: 50}); => {name: 'moe', age: 50}
     */
    Est.extend = function(obj) {
        var h = obj.$$hashKey;
        if (typeOf(obj) !== 'object') return obj;
        each(slice.call(arguments, 1), function(source) {
            for (var prop in source) {
                obj[prop] = source[prop];
            }
        });
        setHashKey(obj,h);
        return obj;
    };
    /**
     * @description 通过原型继承创建一个新对象
     * @method [对象] - inherit
     * @param {Object} target 继承对象
     * @param {Object} extra 额外对象
     * @return {*}
     * @example
     *      var target = {x:'dont change me'};var newObject = Est.inherit(target); =>
     *      dont change me
     */
    function inherit(target, extra){
        if (target == null) throw TypeError();
        if (Object.create)
            return Object.create(target);
        var type = typeof target;
        if (type !== 'object' && type !== 'function') throw TypeError();
        function fn(){};
        fn.prototype = target;
        return new fn();
    }
    Est.inherit = inherit;

    if (typeof /./ !== 'function') {
        /**
         * @description 如果object是一个参数对象，返回true
         * @method [对象] - isFunction
         * @param {*} obj 待检测参数
         * @return {boolean}
         * @author wyj on 14/5/22
         * @example
         *      Est.isFunction(alert); => true
         */
        Est.isFunction = function(obj) {
            return typeof obj === 'function';
        };
    }
    /**
     * @description 返回一个对象里所有的方法名, 而且是已经排序的 — 也就是说, 对象里每个方法(属性值是一个函数)的名称.
     * @method [对象] - functions
     * @param {Object} obj 检测对象
     * @return {Array} 返回包含方法数组
     * @author wyj on 14/5/22
     * @example
     *      Est.functions(Est); => ["all", "any", "bind", "bindAll", "clone", "compact", "compose" ...
     */
    Est.functions = Est.methods = function(obj) {
        var names = [];
        for (var key in obj) {
            if (Est.isFunction(obj[key])) names.push(key);
        }
        return names.sort();
    };
    /**
     * @description 返回一个封装的对象. 在封装的对象上调用方法会返回封装的对象本身, 直道 value 方法调用为止.
     * @method [对象] - chain
     * @param obj
     * @return {*}
     * @author wyj on 14/5/22
     * @example
     *      var stooges = [{name: 'curly', age: 25}, {name: 'moe', age: 21}, {name: 'larry', age: 23}];
     *      var youngest = Est.chain(stooges)
     *          .sortBy(function(stooge){ return stooge.age; })
     *          .map(function(stooge){ return stooge.name + ' is ' + stooge.age; })
     *          .first()
     *          .value();
     *      => "moe is 21"
     */
    Est.chain = function(obj) {
        return Est(obj).chain();
    };
    /**
     * @description 如果对象 object 中的属性 property 是函数, 则调用它, 否则, 返回它。
     * @method [对象] - result
     * @param obj
     * @return {*}
     * @author wyj on 14/5/22
     * @example
     *      var object = {cheese: 'crumpets', stuff: function(){ return 'nonsense'; }};
     *      Est.result(object, 'cheese'); => "crumpets"
     *      Est.result(object, 'stuff'); => "nonsense"
     */
    var result = function(obj) {
        return this._chain ? Est(obj).chain() : obj;
    };
    /*function q(nextTick){
        var defer = function(){
            var pending = [], value, deferred;
            deferred = {
                resolve: function(val){
                    if (pending){
                        var callbacks = pending;
                        pending = undefined;
                        value = ref(val);
                        if (callbacks.length) {
                            nextTick(function() {
                                var callback;
                                for (var i = 0, ii = callbacks.length; i < ii; i++) {
                                    callback = callbacks[i];
                                    value.then(callback[0], callback[1]);
                                }
                            });
                        }
                    }
                },
                promise: {
                    then: function(callback, errback){
                        var result = defer();
                        var wrappedCallback = function(value){
                            result.resolve((Est.isFunction(callback) ? callback : function(value){
                                return value;
                            })(value));
                        };
                        var wrappedErrback = function(reason){
                            result.resolve((Est.isFunction(errback) ? errback : function(value){
                                return value;
                            })(reason));
                        }
                        if (pending){
                            pending.push([wrappedCallback, wrappedErrback]);
                        } else{
                            value.then(wrappedCallback, wrappedErrback);
                        }
                        return result.promise;
                    }
                }
            }
            return deferred;
        };
        var ref = function(value){
            if (value && Est.isFunction(value.then)) return value;
            return {
                then: function(callback) {
                    var result = defer();
                    nextTick(function() {
                        result.resolve(callback(value));
                    });
                    return result.promise;
                }
            };
        }
        return {
            defer: defer
        }
    }
    Est.q = q();*/
    // ObjectUtils
    /**
     * @description [1]检测数据类型 [undefined][number][string][function][regexp][array][date][error]
     * @method [对象] - typeOf
     * @param {*} target 检测对象
     * @return {*|string}
     * @author wyj on 14/5/24
     * @example
     *      Est.typeOf(Est); => 'object'
     */
    var _type = {"undefined" : "undefined", "number": "number", "boolean": "boolean", "string": "string",
        "[object Function]" : "function", "[object RegExp]" : "regexp", "[object Array]" : "array",
        "[object Date]" : "date", "[object Error]" : "error" ,"[object File]":"file", "[object Blob]":"blob"};
    function typeOf(target){
        return _type[typeof target] || _type[toString.call(target)] || (target ? "object" : "null");
    }
    Est.typeOf = typeOf;
    /**
   	 * @description 检测数据类型2 此版本 new Number(4) new String("abc") new Boolean(true) new ReferenceError()
     * 分别生成 Number String Boolean ReferenceError
   	 * @method [对象] - getType
   	 * @param {object} value
   	 * @return {String}
   	 * @author wyj on 14/8/5
   	 * @example
   	 * 		var results = [];
     var fn = Est.getType;
     results.push(fn({a: 4})); // "Object"
     results.push(fn([1, 2, 3])); // "Array"
     (function() { results.push(fn(arguments));}()); // "Object"
     results.push(fn(new ReferenceError())); // "ReferenceError"
     results.push(fn(new Date())); // "Date"
     results.push(fn(/a-z/)); // "RegExp"
     results.push(fn(Math)); // "Object"
     results.push(fn(JSON)); // "Object"
     results.push(fn(new Number(4))); // "Number"
     results.push(fn(new String("abc"))); // "String"
     results.push(fn(new Boolean(true))); // "Boolean"
     results.push(fn(null)); // "Null"
     => [ "Object", "Array", "Object", "ReferenceError", "Date", "RegExp", "Object", "Object", "Number", "String", "Boolean", "null" ]
   	 */
    function getType(value){
    	if (value === null) return "null";
    	var t = typeof value;
    	switch(t){
    		case "function":
    		case "object":
    			if (value.constructor){
    				if (value.constructor.name){
    					return value.constructor.name;
    				} else{
                        // /^function\s+([$_a-zA-Z][_$a-zA-Z0-9]*)\s*\(/
                        // /^\s*function[ \n\r\t]+\w/;
    					var match = value.constructor.toString().match(/^function (.+)\(.*$/);
    					if (match) return match[1];
    				}
    			}
    			return toString.call(value).match(/^\[object (.+)\]$/)[1];
    		default:
    			return t;
    	}
    }
    Est.getType = getType;
    /**
     * @description 判断是否为空 (空数组， 空对象， 空字符串， 空方法， 空参数, null, undefined)
     * @method [对象] - isEmpty
     * @param {Object} value
     * @return {boolean}
     * @author wyj on 14/6/26
     * @example
     *      Est.isEmpty(value); => false
     */
    function isEmpty(value) {
        var result = true;
        if (!value) return result;
        var className = toString.call(value),
            length = value.length;
        if ((className == '[object Array]' || className == '[object String]' || className == '[object Arguments]' ) ||
            (className == '[object Object]' && typeof length == 'number' && Est.isFunction(value.splice))) {
            return !length;
        }
        each(value, function() {
            return (result = false);
        });
        return result;
    }
    Est.isEmpty = isEmpty;
    /**
     * @description 返回值函数
     * @method [对象] - valueFn
     * @param value
     * @return {Function}
     * @author wyj on 14/6/26
     * @example
     *
     */
    function valueFn(value) {
        return function() {
            return value;
        };
    }
    Est.valueFn = valueFn;
    /**
     * @description 反转key value  用于forEach
     * @method [对象] - reverseParams
     * @param {Function} iteratorFn
     * @return {Function}
     * @author wyj on 14/6/26
     * @example
     */
    function reverseParams(iteratorFn) {
        return function(value, key) { iteratorFn(key, value); };
    }
    Est.reverseParams = reverseParams;
    /**
     * @description [2]判断对象是否含有某个键 不是原型对象
     * @method [对象] - hasKey
     * @param {Object} obj 检测对象
     * @param {Sting} key 检测键
     * @return {boolean|*}
     * @author wyj on 14/5/25
     * @example
     *      var object6 = {name:1,sort:1};
     *      Est.hasKey(object6, 'name') => true
     */
    function hasKey(obj, key) {
        return obj != null && hasOwnProperty.call(obj, key);
    }
    Est.hasKey = hasKey;
    /**
     * @description 计算hash值
     * @method [对象] - hashKey
     * @param obj
     * @return {string}
     * @author wyj on 14/6/25
     * @example
     *      var value = Est.hashKey(obj); => 'object:001'
     */
    function hashKey(obj) {
        var objType = typeof obj, key;
        if (objType == 'object' && obj !== null) {
            if (typeof (key = obj.$$hashKey) == 'function') {
                key = obj.$$hashKey();
            } else if (key === undefined) {
                key = obj.$$hashKey = nextUid();
            }
        } else {
            key = obj;
        }
        return objType + ':' + key;
    }
    Est.hashKey = hashKey;
    /**
     * @description 设置hashKey
     * @method [对象] - setHashKey
     * @param {Object} obj
     * @param {String} h
     */
    function setHashKey(obj, h) {
        if (h) {
            obj.$$hashKey = h;
        }
        else {
            delete obj.$$hashKey;
        }
    }
    Est.setHashKey = setHashKey;
    /**
     * @description [3]过滤对象字段
     * @method [对象] - pick
     * @param {Object} obj 过滤对象
     * @param {Function} callback 回调函数
     * @param context
     * @return {{}}
     * @author wyj on 14/5/26
     * @example
     *      var object3 = {name:'a', sort: '1', sId: '000002'};
     *      Est.pick(object3, ['name','sort']) =>
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
    Est.pick = pick;
    /**
     * @description 返回获取对象属性值的方法
     * @method [对象] - property
     * @param {Object} key
     * @return {Function}
     */
    function property(key) {
        return function(object) {
            return object[key];
        };
    }
    Est.property = property;
    /**
     * @description 翠取对象中key对应的值
     * @method [对象] - pluck
     * @param obj
     * @param key
     * @return {*}
     * @author wyj on 14/7/5
     * @example
     *      var characters = [ { 'name': 'barney', 'age': 36 }, { 'name': 'fred',   'age': 40 } ];
     *      var result = Est.pluck(characters, 'name'); =>
     *      [ "barney", "fred" ]
     */
    function pluck(obj, key) {
        return map(obj, property(key), null);
    };
    Est.pluck = pluck;
    /**
     * @description 避免在 ms 段时间内，多次执行func。常用 resize、scoll、mousemove等连续性事件中
     * @method [对象] - delay
     * @param {Function} func 方法
     * @param {Number} ms 缓冲时间
     * @param context
     * @return {Function}
     * @author wyj on 14/5/24
     * @example
     *     Est.buffer(function(){}, 5);
     */
    function delay(func, wait){
        if (typeOf(func) !== 'function') {
            throw new TypeError;
        }
        return setTimeout(function(){
            func.apply(undefined, slice.call(arguments));
        }, wait);
    }
    Est.delay = delay;
    /**
     * @description 模块定义 如果项目中存在require.js 则调用require.js
     * @method [对象] - define
     * @param {String} name 模块名称
     * @param {Array} dependencies 依赖模块
     * @param {Function} factory 方法
     * @return {*}
     * @author wyj on 14/6/29
     * @example
     *
     */
    Est.define = function(name, dependencies, factory) {
        if (typeof define === 'function' && define.amd) return define;
        if (!moduleMap[name]) {
            var module = {
                name: name,
                dependencies: dependencies,
                factory: factory
            };
            moduleMap[name] = module;
        }
        return moduleMap[name];
    }
    /**
     * @description 模块请求 如果项目中存在require.js 则调用require.js
     * @method [对象] - require
     * @param {String} pathArr 文件中第
     * @param {Function} callback 回调函数
     * @author wyj on 14/6/29
     * @example
     *
     */
    Est.require = function(pathArr, callback) {
        if (typeof define === 'function' && define.amd) return require;
        for (var i = 0; i < pathArr.length; i++) {
            var path = pathArr[i];
            if (!fileMap[path]) {
                var head = document.getElementsByTagName('head')[0];
                var node = document.createElement('script');
                node.type = 'text/javascript';
                node.async = 'true';
                node.src = path + '.js';
                node.onload = function () {
                    fileMap[path] = true;
                    head.removeChild(node);
                    checkAllFiles();
                };
                head.appendChild(node);
            }
        }
        function checkAllFiles() {
            var allLoaded = true;
            for (var i = 0; i < pathArr.length; i++) {
                if (!fileMap[pathArr[i]]) {
                    allLoaded = false;
                    break;
                }
            }
            if (allLoaded) {
                callback();
            }
        }
    }
    function use(name) {
        var module = moduleMap[name];
        if (!module.entity) {
            var args = [];
            for (var i=0; i<module.dependencies.length; i++) {
                if (moduleMap[module.dependencies[i]].entity) {
                    args.push(moduleMap[module.dependencies[i]].entity);
                }
                else {
                    args.push(this.use(module.dependencies[i]));
                }
            }
            module.entity = module.factory.apply(noop, args);
        }
        return module.entity;
    }
    Est.use = use;
    /**
     * @description 释放数组， 若数组池个数少于最大值， 则压入数组池以备用
     * @method [数组] - releaseArray
     * @author wyj on 14/7/1
     * @example
     *      Est.releaseArray(array);
     */
    function releaseArray(array) {
        array.length = 0;
        if (arrayPool.length < maxPoolSize) {
            arrayPool.push(array);
        }
    }
    Est.releaseArray = releaseArray;
    /**
     * @description 释放对象， 若对象池个数少于最大值， 则压入对象池以备用
     * @method [对象] - releaseObject
     * @author wyj on 14/7/1
     * @example
     *      Est.releaseObject(object);
     */
    function releaseObject(object){
        object.array = object.cache = object.criteria = object.object = object.number = object.string = object.value = null;
        if (objectPool.length < maxPoolSize) {
            objectPool.push(object);
        }
    }
    Est.releaseObject = releaseObject;
    /**
     * @description 获取数组池
     * @method [数组] - getArray
     * @return {Array}
     * @author wyj on 14/7/1
     * @example
     *      var array = Est.getArray();
     */
    function getArray() {
        return arrayPool.pop() || [];
    }
    Est.getArray = getArray;
    /**
     * @description 获取对象池
     * @method [对象] - getObject
     * @return {Object}
     * @author wyj on 14/7/1
     * @example
     *      var object = Est.getObject();
     */
    function getObject() {
        return objectPool.pop() || { 'array': null, 'cache': null, 'criteria': null, 'false': false, 'index': 0, 'null': false, 'number': null, 'object': null, 'push': null, 'string': null, 'true': false, 'undefined': false, 'value': null };
    }
    Est.getObject = getObject;

    function baseClone(value, isDeep, callback, stackA, stackB){
        //var type = getType(value);
        var type = typeOf(value);
        if (callback) {
            var result = callback(value);
            if (typeof result !==  'undefined') return result;
        }
        if (typeof value === 'object' && type !== 'null'){
            switch (type){
                case 'function':
                    return value;
                    break;
                case 'date':
                    return new Date(+value);
                    break;
                case 'string':
                    return new String(value);
                    break;
                case 'regexp':
                    result = RegExp(value.source, /\w*$/.exec(value));
                    result.lastIndex = value.lastIndex;
                    break;
            }
        } else {
            return value;
        }
        var isArr = type === 'array';
        if (isDeep){
            var initedStack = !stackA;
            stackA || (stackA = getArray());
            stackB || (stackB = getArray());
            var length = stackA.length;
            while (length--) {
                if (stackA[length] === value) {
                    return stackB[length];
                }
            }
            result = isArr ? Array(value.length) : {};
        } else{
            result = isArr ? arraySlice(value) : extend({}, value);
        }
        if (isArr) {
            if (hasOwnProperty.call(value, 'index')) {
                result.index = value.index;
            }
            if (hasOwnProperty.call(value, 'input')) {
                result.input = value.input;
            }
        }
        if (!isDeep) {
            return result;
        }
        stackA.push(value);
        stackB.push(result);
        each(value, function(target, key){
            result[key] = baseClone(target, isDeep, callback, stackA, stackB);
        });
        if (initedStack){
            releaseArray(stackA);
            releaseArray(stackB);
        }
        return result;
    }

    /**
     * @description 浅复制
     * @method [对象] - clone
     * @param value
     * @param callback
     * @param context
     * @return {*}
     * @author wyj on 14/7/6
     * @example
     *
     */
    function clone(value, callback, context){
        callback = typeOf(callback) === 'function' && matchCallback(callback, context, 1);
        return baseClone(value, false, callback);
    }
    Est.clone = clone;
    /**
     * @description 深复制
     * @method [对象] - cloneDeep
     * @param value
     * @param callback
     * @param context
     * @return {*}
     * @author wyj on 14/7/6
     * @example
     *
     */
    function cloneDeep(value, callback, context){
        callback = typeOf(callback) === 'function' && matchCallback(callback, context, 1);
        return baseClone(value, true, callback);
    }
    Est.cloneDeep = cloneDeep;

    // StringUtils =============================================================================================================================================
    /**
     * @description 产生唯一身份标识， 如'012ABC', 若为数字较容易数字溢出
     * @method [字符串] - nextUid
     * @return {string}
     * @author wyj on 14/6/23
     * @example
     *      var uid = Est.nextUid(); => '001'
     */
    function nextUid() {
        var index = uid.length, digit;
        while (index) {
            index--;
            digit = uid[index].charCodeAt(0);
            if (digit == 57 /*'9'*/) {
                uid[index] = 'A';
                return uid.join('');
            }
            if (digit == 90  /*'Z'*/) {
                uid[index] = '0';
            } else {
                uid[index] = String.fromCharCode(digit + 1);
                return uid.join('');
            }
        }
        uid.unshift('0');
        return uid.join('');
    }
    Est.nextUid = nextUid;
    /**
     * @description 转换成小写字母
     * @method [字符串] - lowercase
     * @param {String} string 原字符串
     * @return {string}
     * @author wyj on 14/6/17
     * @example
     *      Est.lowercase("LE"); => le
     */
    function lowercase(string){
        return typeOf(string) === 'string' ? string.toLowerCase() : string;
    }
    Est.lowercase = lowercase;
    /**
     * @description 转换成大写字母
     * @method [字符串] - uppercase
     * @param {String} string 原字符串
     * @return {string}
     * @author wyj on 14/6/17
     * @example
     *      Est.lowercase("le"); => LE
     */
    function uppercase(string){
        return typeOf(string) === 'string' ? string.toUpperCase() : string;
    }
    Est.uppercase = uppercase;

    /**
     * @description 二分法将一个字符串重复自身N次
     * @method [字符串] - repeat
     * @param {String} target 原字符串
     * @param {Number} n 重复次数
     * @return {String} 返回字符串
     * @author wyj on 14-04-23
     * @example
     *      Est.repeat('ruby', 2); => rubyruby
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
    Est.repeat = repeat;
    /**
     * @description 判定一个字符串是否包含另一个字符串
     * @method [字符串] - contains
     * @param {string} target 目标字符串
     * @param {string} 包含字符串
     * @param {string} 判定一个元素的className 是否包含某个特定的class
     * @return {boolean} 返回true/false
     * @author wyj on 14-04-23
     * @example
     *      Est.contains("aaaaa", "aa"); => true
     */
    function contains(target, str, separator){
        return separator ? (separator + target + separator).indexOf(separator + str + separator) > -1 : target.indexOf(str) > -1;
    }
    Est.contains = contains;
    /**
     * @description 判定目标字符串是否位于原字符串的开始之处
     * @method [字符串] - startsWidth
     * @param {target} 原字符串
     * @param {str} 目标字符串
     * @param {boolean} 是否忽略大小写
     * @return {boolean} true/false
     * @author wyj on 14-04-23
     * @example
     *      Est.startsWidth('aaa', 'aa', true); => true
     */
    function startsWith(target, str, ignorecase){
        var start_str = target.substr(0, str.length);
        return ignorecase ? start_str.toLowerCase() === str.toLowerCase() : start_str === str;
    }
    Est.startsWidth = startsWith;
    /**
     * @description 判定目标字符串是否位于原字符串的结束之处
     * @method [字符串] - endsWidth
     * @param {target} 原字符串
     * @param {str} 目标字符串
     * @param {boolean} 是否忽略大小写
     * @return {boolean} true/false
     * @author wyj on 14-04-23
     * @example
     *      Est.endsWidth('aaa', 'aa', true); => true
     */
    function endsWidth(target, str, ignorecase){
        var end_str = target.substring(target.length - str.length);
        return ignorecase ? end_str.toLowerCase() === str.toLowerCase() : end_str === str;
    }
    Est.endsWidth = endsWidth;
    /**
     * @description 取得一个字符串所有字节的长度
     * @method [字符串] - byteLen
     * @param target 目标字符串
     * @param fix 汉字字节长度，如mysql存储汉字时， 是用3个字节
     * @return {Number}
     * @author wyj on 14-04-23
     * @example
     *      Est.byteLen('sfasf我'， 2); => 7
     */
    function byteLen(target, fix){
        fix = fix ? fix : 2;
        var str = new Array(fix + 1).join('-');
        return target.replace(/[^\x00-\xff]/g, str).length;
    }
    Est.byteLen = byteLen;
    /**
     * @description 对字符串进行截取处理，默认添加三个点号【版本一】
     * @method [字符串] - truncate
     * @param target 目标字符串
     * @param length 截取长度
     * @param truncation 结尾符号
     * @return {string}
     * @author wyj on 14-04-23
     * @example
     *     Est.truncate('aaaaaa', 4, '...'); => 'aaa...'
     */
    function truncate(target, length, truncation){
        length = length || 30
        truncation = truncation === void(0) ? "..." : truncation
        return target.length > length ? target.slice(0, length - truncation.length) + truncation : String(target);
    }
    Est.truncate = truncate;
    /**
     * @description 对字符串进行截取处理，默认添加三个点号【版本二】
     * @method [字符串] - cutByte
     * @param str 目标字符串
     * @param length 截取长度
     * @param truncation 结尾符号
     * @return {string}
     * @author wyj on 14-04-25
     * @example
     *     Est.cutByte('aaaaaa', 4, '...'); => 'a...'
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
    Est.cutByte = cutByte;
    /**
     * @description 替换指定的html标签, 当第3个参数为true时， 删除该标签并删除标签里的内容
     * @method [字符串] - stripTabName
     * @param {String} target 目标字符串
     * @param {String} tagName 标签名称
     * @param {String} deep 是否删除标签内的内容
     * @return {string}
     * @author wyj on 14/6/18
     * @example
     *      Est.stripTagName("<script>a</script>", "script", true)=> ''
     *      Est.stripTagName("<script>a</script>", "script", false)=> 'a'
     */
    function stripTagName(target, tagName, deep){
        var pattern = deep ? "<" + tagName + "[^>]*>([\\S\\s]*?)<\\\/" + tagName + ">" : "<\/?" + tagName + "[^>]*>";
        return String(target || '').replace(new RegExp(pattern, 'img'), '');
    }
    Est.stripTagName = stripTagName;
    /**
     * @description 移除字符串中所有的script标签。弥补stripTags 方法的缺陷。此方法应在stripTags之前调用
     * @method [字符串] - stripScripts
     * @param {String} target 目标字符串
     * @return {string} 返回字符串
     * @author wyj on 14/5/5
     * @example
     *     Est.stripScripts("a<script></script>"); => 'a'
     */
    function stripScripts(target){
        return String(target || '').replace(/<script[^>]*>([\S\s]*?)<\/script>/img, '');
    }
    Est.stripScripts = stripScripts;
    /**
     * @description 移除字符串中的html标签, 若字符串中有script标签，则先调用stripScripts方法
     * @method [字符串] - stripTags
     * @param {String} target 原字符串
     * @return {string} 返回新字符串
     * @author wyj on 14/5/5
     * @example
     *     Est.stripTags('aa<div>bb</div>'); => 'aabb'
     */
    function stripTags(target){
        return String(target || '').replace(/<[^>]+>/img,'');
    }
    Est.stripTags = stripTags;
    /**
     * @description 替换原字符串中的“< > " '”为 “&lt;&gt;&quot;&#39;”
     * @method [字符串] - escapeHTML
     * @param {String} target 原字符串
     * @return {String} 返回新字符串
     * @author wyj on 14/5/5
     * @example
     *     Est.escapeHTML('<'); => '&lt;'
     */
    function escapeHTML(target){
        return target.replace(/&/mg, '&amp;')
            .replace(/</mg, '&lt;')
            .replace(/>/mg, '&gt;')
            .replace(/"/mg, '&quot;')
            .replace(/'/mg, '&#39;');
    }
    Est.escapeHTML = escapeHTML;
    /**
     * @description 替换原字符串中的“&lt;&gt;&quot;&#39;”为 “< > " '”
     * @method [字符串] - unescapeHTML
     * @param {String} target 原字符串
     * @return {String} 返回新字符串
     * @author wyj on 14/5/5
     * @example
     *     Est.unescapeHTML('&lt;'); => '<'
     */
    function unescapeHTML(target){
        target = target || '';
        return target.replace(/&amp;/mg, '&')
            .replace(/&lt;/mg, '<')
            .replace(/&gt;/mg, '>')
            .replace(/&quot;/mg, '"')
            .replace(/&#([\d]+);/mg, function($0, $1){
                return String.fromCharCode(parseInt($1, 10));
            });
    }
    Est.unescapeHTML = unescapeHTML;
    /**
     * @description 将字符串安全格式化为正则表达式的源码
     * @method [字符串] - escapeRegExp
     * @param {String} target 原字符串
     * @return {*}
     * @author wyj on 14/5/16
     * @example
     *      Est.escapeRegExp('aaa/[abc]/') => aaa\/\[abc\]\/;
     */
    function escapeRegExp(target){
        return target.replace(/([-.*+?^${}()|[\]\/\\])/img, '\\$1');
    }
    Est.escapeRegExp = escapeRegExp;
    /**
     * @description 为字符串的某一端添加字符串。 如：005
     * @method [字符串] - pad
     * @param {String/Number} target 原字符串或数字
     * @param {Number} n 填充位数
     * @param {String} filling 填充字符串
     * @param {Boolean} right 在前或后补充
     * @param {Number} radix 转换进制 10进制或16进制
     * @param {Object} opts {String} opts.prefix 前缀
     * @author wyj on 14/5/5
     * @example
     *      Est.pad(5, 10, '0', false, 10, {prefix:'prefix'}); => prefix0005
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
    Est.pad = pad;
    /**
     * @description 格式化字符串，类似于模板引擎，但轻量级无逻辑
     * @method [字符串] - format
     * @param {String} str 原字符串
     * @param {Object} object 若占位符为非零整数形式即对象，则键名为点位符
     * @return {String} 返回结果字符串
     * @author wyj on 14/5/5
     * @example
     *     Est.format("Result is #{0}, #{1}", 22, 23); => "Result is 22, 23"
     *     Est.format("#{name} is a #{sex}", {name : 'Jhon',sex : 'man'}); => "Jhon is a man"
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
    Est.format = format;
    /**
     * @description 移除字符串左端的空白
     * @method [字符串] - ltrim
     * @param {String} str 原字符串
     * @return {String} 返回新字符串
     * @author wyj on 14/5/6
     * @example
     *     Est.ltrim('  dd    '); => 'dd    '
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
    Est.ltrim = ltrim;
    /**
     * @description 移除字符串右端的空白
     * @method [字符串] - rtrim
     * @param {String} str 原字符串
     * @return {String} 返回新字符串
     * @author wyj on 14/5/6
     * @example
     *     Est.rtrim('  dd    '); => '   dd'
     */
    function rtrim(str){
        for(var i = str.length -1; i >= 0; i--){
            if(whitespace.lastIndexOf(str.charAt(i)) === -1){
                str = str.substring(0, i + 1);
                break;
            }
        }
        return whitespace.lastIndexOf(str.charAt(str.length-1)) === -1 ? (str) : '';
    }
    Est.rtrim = rtrim;
    /**
     * @description 移除字符串两端的空白
     * @method [字符串] - trim
     * @param {String} str 原字符串
     * @return {String} 返回新字符串
     * @author wyj on 14/5/6
     * @example
     *     Est.trim('  dd    '); => 'dd'
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
    Est.trim = trim;
    /**
     * @description 去除字符串中的所有空格
     * @method [字符串] - deepTrim
     * @param {String} str 原字符串
     * @return {String} 返回新字符串
     * @author wyj on 14/5/6
     * @example
     *     Est.allTrim('a b c'); => 'abc'
     */
    function deepTrim(str){
        return str.toString().replace(/\s*/gm, '');
    }
    Est.deepTrim = deepTrim;
    // ArrayUtils ===============================================================================================================================================
    /**
     * @description 根据索引值移除数组元素
     * @method [数组] - removeAt
     * @param {Array} list 原数组
     * @param {Nubmer} index 数组索引
     * @return {Boolean} 返回是否删除成功
     * @author wyj on 14/5/24
     * @example
     *      Est.removeAt(list, dx) => ;
     */
    function removeAt(list, index){
        return !!list.splice(index, 1).length;
    }
    Est.removeAt = removeAt;
    /**
     * @description 删除数组中的元素
     * @method [数组] - arrayRemove
     * @param {Array} array 目标数组
     * @param {*} value 删除的元素
     * @return {*}
     * @author wyj on 14/6/23
     * @example
     *      var list = ['a', 'b', 'b'];
     *      var result = Est.arrayRemove(list, 'a'); => ['a', 'b']
     */
    function arrayRemove(array, value){
        var index = indexOf(array, value);
        if (index !== -1)
            array.splice(index, 1);
        return value;
    }
    Est.arrayRemove = arrayRemove;
    /**
     * @description 获取对象的所有KEY值
     * @method [数组] - keys
     * @param {Object} obj 目标对象
     * @return {Array}
     * @author wyj on 14/5/25
     * @example
     *      Est.keys({name:1,sort:1}); =>
     */
    function keys(obj) {
        if (typeOf(obj) !== 'object') return [];
        if (nativeKeys) return nativeKeys(obj);
        var keys = [];
        for (var key in obj) if (hasKey(obj, key)) keys.push(key);
        return keys;
    }
    Est.keys = keys;
    /**
     * @description 用来辨别 给定的对象是否匹配指定键/值属性的列表
     * @method [数组] - matches
     * @param attrs
     * @return {Function}
     * @author wyj on 14/6/26
     * @example
     */
    function matches(attrs) {
        return function(obj) {
            if (obj == null) return isEmpty(attrs);
            if (obj === attrs) return true;
            for (var key in attrs) if (attrs[key] !== obj[key]) return false;
            return true;
        };
    }
    Est.matches = matches;
    /**
     * @description 数组过滤
     * @method [数组] - filter
     * @param {Array} collection 数组
     * @param {Function} callback 回调函数
     * @param args
     * @author wyj on 14/6/6
     * @example
     *      var list = [{"name":"aa"},{"name":"bb"},{"name":"cc"}, {"name":"bb", address:"zjut"}];
     *      var result = Est.filter(list, function(item){
     *          return item.name.indexOf('b') > -1;
     *      }); => [ { "name": "bb" }, { "address": "zjut", "name": "bb" } ]
     */
    function filter(collection, callback, context){
        var results = [];
        if (!collection) return result;
        var predicate = matchCallback(callback, context);
        each(collection, function(value, index, list) {
            if (predicate(value, index, list)) results.push(value);
        });
        return results;
    }
    Est.filter = filter;

    /**
     * @description 数组中查找符合条件的索引值 比较原始值用indexOf
     * @method [数组] - findIndex
     * @param array
     * @param {Function} callback 回调函数
     * @param {Object} context 上下文
     * @return {number}
     * @author wyj on 14/6/29
     * @example
     *      var list = [{"name":"aa"},{"name":"bb"},{"name":"cc"}, {"name":"bb", address:"zjut"}];
     *      var index = Est.findIndex(list, {name: 'aa'}); => 0
     *      var index2 =  Est.findIndex(list, function(item){
     *          return item.name === 'aa';
     *      }); => 0
     */
    function findIndex(array, callback, context) {
        var index = -1,
            length = array ? array.length : 0;
        callback = matchCallback(callback, context);
        while (++index < length) {
            if (callback(array[index], index, array)) {
                return index;
            }
        }
        return -1;
    }
    Est.findIndex = findIndex;


    /**
     * @description 数组转化为object 如果对象key值为数字类型， 则按数字从小到大排序
     * @method [数组] - arrayToObject
     * @param {Array} list 目标数组
     * @param {String} name key
     * @param {String} val value
     * @return {Object} object
     * @author wyj on 14/5/24
     * @example
     *      var list4 = [{key:'key1',value:'value1'},{key:'key2',value:'value2'}];
     *      Est.arrayToObject(list4, 'key', 'value'); =>
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
    Est.arrayToObject = arrayToObject;
    /**
     * @description 对象转化为数组
     * @method [数组] - arrayFromObject
     * @param {Object} obj 待转化的对象
     * @return {Array} 返回数组
     * @author wyj on 14/5/24
     * @example
     *      var obj = {key1: 'value1', key2: 'value2'};
     *      var result = Est.arrayFromObject(obj, 'key', 'value'); =>
     *      [{key: 'key1', value: 'value1'},
     *      {key: 'key2', value: 'value2'}]
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
    Est.arrayFromObject = arrayFromObject;
    /**
     * @description 交换元素
     * @method [数组] - arrayExchange
     * @param {Array} list 原数组
     * @param {Number} thisdx 第一个元素索引值
     * @param {Number} targetdx 第二个元素索引值
     * @param {Object} opts {String} opts.column 需要替换的列值;{Function} opts.callback(thisNode, nextNode) 回调函数 返回两个对调元素
     * @author wyj on 14/5/13
     * @example
     *      var list2 = [{name:1, sort:1},{name:2, sort:2}];
     *      Est.arrayExchange(list2, 0 , 1, {
     *          column:'sort',
     *          callback:function(thisNode, targetNode){
     *          }
     *       }); =>
     *      {name:2,sort:1}
     *      {name:1,sort:2}
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
    Est.arrayExchange = arrayExchange;
    /**
     * @description 数组插序
     * @method [数组] - arrayInsert
     * @param {Array} list 原数组
     * @param {Number} thisdx 第一个元素索引
     * @param {Number} targetdx 第二个元素索引
     * @param {Object} opts    {String} opts.column:需要替换的列值; {Function} opts.callback(list)回调函数 返回第一个元素与第二个元素之间的所有元素
     * @author wyj on 14/5/15
     * @example
     *          var list3 = [{name:1, sort:1},{name:2, sort:2},{name:3, sort:3},{name:4, sort:4}];
     *          Est.arrayInsert(list3, 3 , 1, {column:'sort',callback:function(list){}}); =>
     *          [{name:1,sort:1},{name:4,sort:2},{name:2,sort:3},{name:3,sort:4}]
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
    Est.arrayInsert = arrayInsert;
    /**
     * @description 遍历MAP对象
     * @method [数组] - map
     * @param {Array} obj 目标数组
     * @param callback 回调函数
     * @param context 上下文
     * @return {Array} 返回数组
     * @author wyj on 14/6/23
     * @example
     *      var list = [1, 2, 3];
     *      var result = Est.map(list, function(value, list, index){
     *      return list[index] + 1;
     *      }); => [2, 3, 4]
     */
    function map(obj, callback, context) {
        var results = [];
        if (obj === null) return results;
        callback = matchCallback(callback, context);
        each(obj, function(value, index, list) {
            results.push(callback(value, index, list));
        });
        return results;
    }
    Est.map = map;
    /**
     * @description 字符串转化成MAP对象，以逗号隔开， 用于FORM表单
     * @method [数组] - makeMap
     * @param str
     * @return {{}}
     * @author wyj on 14/6/23
     * @example
     *      var object = Est.makeMap("a, aa, aaa"); => {"a":true, "aa": true, "aaa": true}
     */
    function makeMap(str){
        var obj = {}, items = str.split(","), i;
        for ( i = 0; i < items.length; i++ )
            obj[ items[i] ] = true;
        return obj;
    }
    Est.makeMap = makeMap;
    /**
     * @description 判断元素是否存在于数组中
     * @method [数组] - indexOf
     * @param {Array} array 原型数组
     * @param {*} value 值
     * @return {Number}
     * @author wyj on 14/6/23
     * @example
     *      var list = ['a', 'b'];
     *      var has = Est.indexOf('b'); => 1
     */
    function indexOf(array, value) {
        if (array.indexOf) return array.indexOf(value);
        for (var i = 0, len = array.length; i < len; i++) {
            if (value === array[i]) return i;
        }
        return -1;
    }
    Est.indexOf = indexOf;
    /**
     * @description 数组排序
     * @method [数组] - sortBy
     * @param obj
     * @param iterator
     * @param context
     * @return {*}
     * @author wyj on 14/7/5
     * @example
     *      var result = Est.sortBy([1, 2, 3], function(num) { return Math.sin(num); }); => [3, 1, 2]
     *
     *      var characters = [ { 'name': 'barney',  'age': 36 }, { 'name': 'fred',    'age': 40 }, { 'name': 'barney',  'age': 26 }, { 'name': 'fred',    'age': 30 } ];
     *      var result2 = Est.sortBy(characters, 'age'); =>
     *      [{ "age": 26, "name": "barney" }, { "age": 30, "name": "fred" }, { "age": 36, "name": "barney" }, { "age": 40, "name": "fred" }]
     *
     *      var result3 = Est.sortBy(characters, ['name', 'age']); =>
     *      [{ "age": 26, "name": "barney" },{ "age": 36, "name": "barney" },  { "age": 30, "name": "fred" }, { "age": 40, "name": "fred" } ]
     */
    function sortBy(collection, callback, context) {
        var index = -1,
            isArr = typeOf(callback) === 'array',
            length = collection ? collection.length : 0,
            result = Array(typeof length === 'number' ? length : 0);
        if (!isArr) {
            callback = matchCallback(callback, context);
        }
        each(collection, function(value, key, collection) {
            var object = result[++index] = {};
            if (isArr) {
                object.criteria = map(callback, function(key) { return value[key]; });
            } else {
                (object.criteria = [])[0] = callback(value, key, collection);
            }
            object.index = index;
            object.value = value;
        });
        length = result.length;
        result.sort(function(left, right){
            var left_c = left.criteria,
                right_c = right.criteria,
                index = -1,
                length = left_c.length;
            while (++index < length) {
                var value = left_c[index],
                    other = right_c[index];
                if (value !== other) {
                    if (value > other || typeof value == 'undefined') {
                        return 1;
                    }
                    if (value < other || typeof other == 'undefined') {
                        return -1;
                    }
                }
            }
            return left.index - right.index;
        });
        return pluck(result, 'value');
    }
    Est.sortBy = sortBy;
    /**
     * @description 截取数组
     * @method [数组] - arraySlice
     * @param array
     * @param start
     * @param end
     * @return {*}
     * @author wyj on 14/7/7
     * @example
     *
     */
    function arraySlice(array, start, end) {
        start || (start = 0);
        if (typeof end == 'undefined') {
            end = array ? array.length : 0;
        }
        var index = -1,
            length = end - start || 0,
            result = Array(length < 0 ? 0 : length);

        while (++index < length) {
            result[index] = array[start + index];
        }
        return result;
    }
    Est.arraySlice = arraySlice;

    // ImageUtils ==============================================================================================================================================

    /**
     * @description  获取图片地址缩放等级
     * @method [图片] - picUrl
     * @param src
     * @param zoom
     * @return {string}
     * @author wyj on 14/7/25
     * @example
     *      Est.picUrl(src, 5);
     */
    function picUrl(src, zoom){
        if (!Est.isEmpty(src)){
            var type = src.substring(src.lastIndexOf(".") + 1, src.length);
            var hasZoom = src.lastIndexOf('_') > 0 ? true : false;
            return src.substring(0, src.lastIndexOf(hasZoom ? '_' : '.')) + "_" + zoom + "." + type;
        }
    }
    Est.picUrl = picUrl;

    /**
     * @description 获取居中图片的margin值, 若图片宽高比太大，则不剪切
     * @method [图片] - imageCrop
     * @param {Number} naturalW 图片宽度
     * @param {Number} naturalH 图片高度
     * @param {Number} targetW 展示框宽度
     * @param {Number} targetH 展示框高度
     * @param {Boolean} fill 是否铺满框
     * @return {{width: *, height: *, marginTop: number, marginLeft: number}}
     * @author wyj on 14-04-24
     * @example
     *      $.each($(".imageCrop"), function(){
     *          $(this).load(function(response, status, xhr){
     *              var w = $(this).get(0).naturalWidth, h = $(this).get(0).naturalHeight;
     *              var width = $(this).attr("data-width"), height = $(this).attr("data-height");
     *              $(this).css(Est.imageCrop(w, h, width, height), 'fast');
     *              $(this).fadeIn('fast');
     *          });
     *      });
     */
    function imageCrop(naturalW, naturalH, targetW, targetH, fill) {
        var _w = parseInt(naturalW, 10), _h = parseInt(naturalH, 10),
            w = parseInt(targetW, 10), h = parseInt(targetH, 10);
        var fill = fill || false;
        var res = { width: w, height: h, marginTop: 0, marginLeft: 0 }
        if (_w != 0 && _h != 0) {
            var z_w = w / _w, z_h = h / _h;
            if (!fill && (z_w / z_h) > 1.5) {
                //若高度 远远 超出 宽度
                res = { width: 'auto', height: h, marginTop: 0, marginLeft: Math.abs((w - _w * z_h) / 2) };
            } else if (!fill && (z_h / z_w) > 1.5) {
                //若宽度 远远 超出 高度
                res = { width: w, height: 'auto', marginTop: Math.abs((h - _h * z_w) / 2), marginLeft: 0 };
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
    Est.imageCrop = imageCrop;

    // GirdUtils
    /**
     * @description 列表两端对齐，
     * @method [图片] - girdJustify
     * @param options
     * @author wyj on 14/5/11
     * @example
     *      <script type="text/javascript">
     *          var justifyCont = $("#gird");
     *          var justifylist = $("li", justifyCont);
     *          var justifyOpts = {
     *                  containerWidth: justifyCont.width(), //容器总宽度
     *                  childLength: justifylist.size(), //子元素个数
     *                  childWidth: justifylist.eq(0).width(), // 子元素宽度
     *                  childSpace: 10, //默认右边距
     *                  callback: function (i, space) { // 回调函数， 执行CSS操作， i为第几个元素， space为边距
     *                      justifylist.eq(i).css("margin-right", space);
     *                  }
     *              };
     *          Est.girdJustify(justifyOpts);
     *          $(window).bind("resize", function () {
     *              justifyOpts.containerWidth = justifyCont.width();
     *              Est.girdJustify(justifyOpts);
     *          });
     *      </script>
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
    Est.girdJustify = girdJustify;
    // TreeUtils
    /**
     * @description 构建树
     * @method [树] - bulidSubNode
     * @param {Array} rootlist 根节点列表
     * @param {Array} totalList 总列表 {String}
     * @param {Object} opts {String} opts.category_id 分类Id {String} opts.belong_id 父类Id
     * @author wyj on 14/5/15
     * @example
     *      var root = [];
     *      for(var i = 0, len = list.length; i < len; i++){
     *          if(list[i]['grade'] === '01'){
     *              root.push(list[i]);
     *          }
     *      }
     *      Est.bulidSubNode(root, list, {
     *          categoryId: 'category_id', // 分类ＩＤ
     *          belongId: 'belong_id', // 父类ＩＤ
     *          childTag: 'cates', // 存放子类字段名称
     *          dxs: []
     *      });
     */
    function bulidSubNode(rootlist, totalList, opts) {
        var options = {
            categoryId: 'category_id',//分类ＩＤ
            belongId: 'belong_id',//父类ＩＤ
            childTag: 'cates',
            dxs: []
        }
        if (typeof(opts) != 'undefined') {
            Est.extend(options, opts);
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
                if (item[options.categoryId] == newResItem[options.belongId]) {
                    navlist.push(newResItem);
                    //options['dxs'].push(j);
                }
            }
            // 设置子元素
            item[options.childTag] = navlist.slice(0);
            // 判断是否有下级元素
            if (navlist.length > 0) {
                item.hasChild = true;
                bulidSubNode(navlist, totalList, options);
            } else {
                item.hasChild = false;
                item.cates = [];
            }
        }
        return rootlist;
    }
    Est.bulidSubNode = bulidSubNode;
    /**
     * @description 获取select表单控件样式的树
     * @method [树] - bulidSelectNode
     * @param {Array} rootlist 根节点列表
     * @param {Number} zoom 缩进
     * @param {Object} obj {String} opts.name 字段名称
     * @author wyj on 14/5/15
     * @example
     *      Est.bulidSelectNode(rootlist, 2, {
     *          name : 'name'
     *      });
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
                bulidSelectNode(rootlist[i].cates, zoom = z + 2, opts);
            }
        }
        return rootlist;
    }
    Est.bulidSelectNode = bulidSelectNode;
    /**
     * @description 构建树
     * @method [树] - bulidTreeNode
     * @param {Array} list
     * @param {String} name 父分类的字段名称
     * @param {String} value 值
     * @param {Object} opts 配置信息
     * @return {*}
     * @author wyj on 14/7/9
     * @example
     *      Est.bulidTreeNode(list, 'grade', '01', {
     *          categoryId: 'category_id',// 分类ＩＤ
     *          belongId: 'belong_id',// 父类ＩＤ
     *          childTag: 'cates', // 子分类集的字段名称
     *          sortBy: 'sort', // 按某个字段排序
     *          callback: function(item){}  // 回调函数
     *      });
     */
    function bulidTreeNode(list, name, value, opts){
        var root = [];
        each(list, function (item) {
            if (item[name] === value) root.push(item);
            if (opts && Est.typeOf(opts.callback) === 'function'){
                opts.callback.call(this, item);
            }
        });
        if (opts && Est.typeOf(opts.sortBy) !== 'undefined'){
            root = Est.sortBy(root, function (item) {
                return item[opts.sortBy];
            });
            list = Est.sortBy(list, function (item) {
                return item[opts.sortBy];
            });
        }
        return bulidSubNode(root, list, opts);
    }
    Est.bulidTreeNode = bulidTreeNode;

    /**
     * @description 获取面包屑导航
     * @method [树] - bulidBreakNav
     * @param {Array} list 总列表
     * @param {String} nodeId ID标识符
     * @param {String} nodeValue id值
     * @param {String} nodeLabel 名称标识符
     * @param {String} nodeParentId 父类ID标识符
     * @return {*}
     * @author wyj on 14/7/10
     * @example
     *
     *
     */
    function bulidBreakNav(list, nodeId, nodeValue, nodeLabel, nodeParentId){
        var breakNav = [];
        var result = Est.filter(list, function(item){
            return item[nodeId] === nodeValue;
        });
        if (result.length === 0) return breakNav;
        breakNav.unshift({nodeId: nodeValue, name: result[0][nodeLabel]});
        var getParent = function(list, id){
            var parent = Est.filter(list, function(item){
                return item[nodeId] === id;
            });
            if (parent.length > 0){
                breakNav.unshift({nodeId: parent[0][nodeId], name: parent[0][nodeLabel]});
                getParent(list, parent[0][nodeParentId]);
            }
        }
        getParent(list, result[0][nodeParentId]);
        return breakNav;
    }
    Est.bulidBreakNav = bulidBreakNav;

    // PaginationUtils
    /**
     * @description 获取最大页数
     * @method [分页] - getMaxPage
     * @param {number} totalCount 总条数
     * @param {number} pageSize 每页显示的条数
     * @return {number} 返回最大页数
     * @author wyj on 14-04-26
     * @example
     *      Est.getMaxPage(parseInt(50), parseInt(10)); => 5
     */
    function getMaxPage(totalCount, pageSize){
        return totalCount % pageSize == 0 ? totalCount / pageSize : Math.floor(totalCount/pageSize) + 1;
    }
    Est.getMaxPage = getMaxPage;
    /**
     * @description 获取最大页数【版本二】
     * @method [分页] - getMaxPage_2
     * @param { Number} totalCount otalCount 总条数
     * @param {Number} pageSize pageSize 每页显示的条数
     * @return {Number} 返回最大页数
     * @author wyj on 14/04/26
     * @example
     *     Est.getMaxPage(parseInt(50), parseInt(10)); => 5
     */
    function getMaxPage_2(totalCount, pageSize){
        return totalCount > pageSize ? Math.ceil(totalCount / pageSize) : 1;
    }
    Est.getMaxPage_2 = getMaxPage_2;
    /**
     * @description 根据pageList总列表， page当前页   pageSize显示条数  截取列表
     * @method [分页] - getListByPage
     * @param {Array} pageList  全部列表
     * @param page 当前页
     * @param pageSize  每页显示几条
     * @return {Array} 返回结果集
     * @author wyj on 14-04-26
     * @example
     *      Est.getListByPage(pageList, page, pageSize);
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
    Est.getListByPage = getListByPage;
    /**
     * @description 通过当前页、总页数及显示个数获取分页数字
     * @method [分页] - getPaginationNumber
     * @param {Number} page 当前页
     * @param {Number} totalPage 总页数
     * @param {Number} length 显示数
     * @return {Array} 返回数字集
     * @example
     *      Est.getPaginajtionNumber(parseInt(6), parseInt(50), 9); => 3,4,5,6,7,8,9
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
        } else{
            end = totalPage;
        }
        for (var i = start; i <= end; i++) {
            number_list.push(i);
        }
        return number_list;
    }
    Est.getPaginationNumber = getPaginationNumber;

    // CacheUtils
    /**
     * @description 数据缓存
     * @method [缓存] - getCache
     * @param {String} uId 唯一标识符
     * @param {Object} ctx 缓存对象
     * @param {String} options.area 缓存分区
     * @param {Object} options {Function} options.getData 获取待缓存的数据
     * @return {*} 返回缓存数据
     * @author wyj on 14/5/3
     * @example
     *     Est.getCache('uId', session, {
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
        Est.extend(opts, options);
        ctx.cache = ctx.cache || {};
        if ( typeof ctx.cache[opts.area] === 'undefined') { ctx.cache[opts.area] = {}; }
        var data = ctx.cache[opts.area][uId];
        if ( !data ) {
            data = ctx.cache[opts.area][uId] = opts.getData.call(null, data);
        }
        return data;
    }
    Est.getCache = getCache;

    // CssUtils
    /**
     * @description 获取当前元素的css选择符，规则：父模块的ID值 + 当前元素的ID值 > class值
     * @method [样式] - getSelector
     * @param {Element} target 目标元素
     * @param {String} parentClass 父模块class选择符
     * @param {Object} $  jquery对象 或 其它
     * @return {string} 返回当前元素的选择符
     * @author wyj on 14/5/5
     * @example
     *     Est.getSelector($('#gird-li').get(0), 'moveChild')) => ;
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
            selector = getSelector(target.parentNode) + " " + selector;
        }
        return isModule ?  selector : '#' + $(target).parents('.moveChild:first').attr('id') + ' ' + selector;
    }
    Est.getSelector = getSelector;
    /**
     * @description 获取元素的标签符号 , 大写的转换成小写的
     * @method [样式] - getTagName
     * @param {Element} target 目标元素
     * @return {string} 返回标签符号
     * @author wyj on 14/5/6
     * @example
     *     Est.getTagName(document.getElementById('a')); ==>　'div'
     */
    function getTagName(target){
        return target.tagName.toLowerCase();
    }
    Est.getTagName = getTagName;
    /**
     * @description 加载样式文件
     * @method [样式] - loadCss
     * @param url
     * @author wyj on 14/7/7
     * @example
     *
     */
    function loadCSS(url) {
        var elem = document.createElement("link");
        elem.rel = "stylesheet";
        elem.type = "text/css";
        elem.href = url;
        document.body.appendChild(elem);
   }
    Est.loadCss = loadCSS;
    // DateUtils
    /**
     * @description 格式化时间
     * @method [时间] - dateFormat
     * @param {String} date 时间
     * @param {String} fmt 格式化规则 如‘yyyy-MM-dd’
     * @return {String} 返回格式化时间
     * @author wyj on 14/5/3
     * @example
     *     Est.dateFormat(new Date(), 'yyyy-MM-dd'); => '2014-05-03'
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
    Est.dateFormat = dateFormat;
    // DomUtils
    /**
     * @description 清空该元素下面的所有子节点【大数据量时】 在数据量小的情况下可以用jQuery的empty()方法
     * parentNode必须为DOM对象，$('#selector').get(0);
     * @method [文档] - clearAllNode
     * @param parentNode
     * @return {*}
     * @author wyj on 14-04-26
     * @example
     *      Est.clearAllNode(document.getElementById("showResFilesContent"));
     */
    function clearAllNode(parentNode){
        while (parentNode.firstChild) {
            var oldNode = parentNode.removeChild(parentNode.firstChild);
            oldNode = null;
        }
    }
    Est.clearAllNode = clearAllNode;

    // BrowerUtils
    /**
     * @description 判断是否是IE浏览器，并返回版本号
     * @method [浏览器] - msie
     * @return {mise}
     * @author wyj on 14/6/17
     * @example
     *      Est.msie(); => 7
     */
    function msie(){
        var msie = parseInt((/msie (\d+)/.exec(lowercase(navigator.userAgent)) || [])[1], 10);
        if (isNaN(msie)) {
            msie = parseInt((/trident\/.*; rv:(\d+)/.exec(lowercase(navigator.userAgent)) || [])[1], 10);
        }
        if (isNaN(msie)){
            msie = false;
        }
        return msie;
    }
    Est.msie = msie;
    /**
     * @description 获取浏览器参数列表
     * @method [浏览器] - getUrlParam
     * @param {String} name 参数名称
     * @param {String} url 指定URL
     * @return {String} 不存在返回NULL
     * @author wyj on 14-04-26
     * @example
     *      (function($, Est){ $.getUrlParam = Est.getUrlParam;})(jQuery, Est);
     *      console.log($.getUrlParam('name'));
     */
    function getUrlParam(name, url){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var path = url.substring(url.indexOf('?'), url.length) || window.location.search;
        var r = path.substr(1).match(reg);
        if (r!=null) return unescape(r[2]); return null;
    }
    Est.getUrlParam = getUrlParam;
    /**
     * @description 过滤地址
     * @method [浏览器] - urlResolve
     * @param {String} url
     * @return  {*}
     * @author wyj on 14/6/26
     * @example
     *
     */
    function urlResolve(url) {
        var href = url;
        urlParsingNode = document && document.createElement("a");
        if (msie()) {
            urlParsingNode.setAttribute("href", href);
            href = urlParsingNode.href;
        }
        urlParsingNode.setAttribute('href', href);
        return {
            href: urlParsingNode.href,
            protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
            host: urlParsingNode.host,
            search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
            hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
            hostname: urlParsingNode.hostname,
            port: urlParsingNode.port,
            pathname: (urlParsingNode.pathname.charAt(0) === '/')
                ? urlParsingNode.pathname
                : '/' + urlParsingNode.pathname
        };
    }
    Est.urlResolve = urlResolve;
   	/**
     * @description 路由控制
     * @method [浏览器] - route
     * @param {Object} handle 待控制对象
     * @param {String} pathname 路由名称
     * @param {Object} response 参数
     * @author wyj on 14/8/1
     * @example
     *		var handle = {
     * 			route1: function(reponse){
	
     			},
     			route2: function(){
	
     			}
     		}
     * 		Est.route(handle, 'route1', {});
   	 */
    function route(handle, pathname, response){
        if (Est.typeOf(handle[pathname]) === 'function'){
            return handle[pathname](response);
        } else{
            console.log("No request handler found for " + pathname);
        }
    }
    Est.route = route;


    /**
     * @description 实用程序函数扩展Est。
     * 传递一个 {name: function}定义的哈希添加到Est对象，以及面向对象封装。
     * @method [对象] - mixin
     * @param obj
     * @author wyj on 14/5/22
     * @example
     *      Est.mixin({
     *          capitalize: function(string) {
     *              return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
     *          }
     *      });
     *      Est("fabio").capitalize(); => "Fabio"
     */
    Est.mixin = function(obj) {
        Est.each(Est.functions(obj), function(name) {
            var func = Est[name] = obj[name];
            Est.prototype[name] = function() {
                var args = [this._wrapped];
                push.apply(args, arguments);
                return result.call(this, func.apply(Est, args));
            };
        });
    };
    Est.mixin(Est);
    Est.extend(Est.prototype, {
        chain: function() {
            this._chain = true;
            return this;
        },
        value: function() {
            return this._wrapped;
        }
    });
    /**
     * @description For request.js
     * @method [定义] - define
     */
    if (typeof define === 'function' && define.amd) {
        define('Est', [], function() {
            return Est;
        });
    } else{
        Est.define('Est', [], function(){
            return Est;
        });
    }
}.call(this));