/**
 * 工具类库.
 *
 * @description 修改urlParsingNode变量 on 14/7/29
 * @class Est - 工具类库
 * @constructor Est
 */
;
(function () {
  'use strict';
  var root = this;
  /**
   * @description 系统原型方法
   * @method [变量] - slice push toString hasOwnProperty concat
   */
  var slice = Array.prototype.slice, push = Array.prototype.push, toString = Object.prototype.toString,
    hasOwnProperty = Object.prototype.hasOwnProperty, concat = Array.prototype.concat;
  /**
   * @description ECMAScript 5 原生方法
   * @method [变量] - nativeIsArray nativeKeys nativeBind
   */
  var nativeIsArray = Array.isArray, nativeKeys = Object.keys, nativeBind = Object.prototype.bind;
  var whitespace = ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\n\
        \u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000';
  var uid = ['0', '0', '0'];
  var url = window.location.href;
  var urlParsingNode = null;
  /**
   * @description define
   * @method [变量] - moduleMap
   */
  var moduleMap = {};
  var fileMap = {};
  var noop = function () {
  };
  /**
   * @description  定义数组和对象的缓存池
   * @method [变量] - maxPoolSize arrayPool objectPool
   */
  var maxPoolSize = 40;
  var arrayPool = [], objectPool = [];
  /**
   * @method [变量] - cache
   * 缓存对象 */
  var cache = {};
  /**
   * @method [变量] - routes
   * url 路由 */
  var routes = {};
  var el = null, current = null;

  /**
   * @description 创建Est对象
   * @method [对象] - Est
   */
  var Est = function (value) {
    return (value && typeof value == 'object' &&
      typeOf(value) !== 'array' && hasOwnProperty.call(value, '_wrapped')) ? value :
      new Wrapper(value);
  };

  /**
   * 调试
   *
   * @method debug
   * @param str
   * @param options
   * @author wyj 14.12.24
   * @example
   *   debug('test');
   *   debug('test', {
 *    type: 'error' // 打印红色字体
 *   });
   *   debug(function(){
 *     return 'test';
 *   });
   * */
  function debug(str, options) {
    var opts, msg;
    if (CONST.DEBUG_CONSOLE) {
      try {
        opts = Est.extend({ type: 'console' }, options);
        msg = Est.typeOf(str) === 'function' ? str() : str;
        if (!Est.isEmpty(msg)) {
          if (opts.type === 'error') {
            console.error(msg);
          } else if (opts.type === 'alert') {
            alert(msg);
          } else {
            console.log(msg);
          }
        }
      } catch (e) {
      }
    }
  }

  window.debug = Est.debug = debug;

  function Wrapper(value, chainAll) {
    this._chain = !!chainAll;
    this._wrapped = value;
  }

  Est.version = '0605041705'; // 机汇网
  //Est.version = '00111114'; // 上门网
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
  var matchCallback = function (value, context, argCount) {
    if (value == null) return Est.identity;
    ;
    if (Est.isFunction(value)) return createCallback(value, context, argCount);
    if (typeOf(value) === 'object') return matches(value);
    if (typeOf(value) === 'array') return value;
    return property(value);
  };
  var createCallback = function (func, context, argCount) {
    if (!context) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1:
        return function (value) {
          return func.call(context, value);
        };
      case 2:
        return function (value, other) {
          return func.call(context, value, other);
        };
      case 3:
        return function (value, index, collection) {
          return func.call(context, value, index, collection);
        };
      case 4:
        return function (accumulator, value, index, collection) {
          return func.call(context, accumulator, value, index, collection);
        };
    }
    return function () {
      return func.apply(this, arguments);
    };
  };

  /**
   * @description 遍历数据或对象。如果传递了context参数，则把callback绑定到context对象上。
   * 如果list是数组，callback的参数是：(element, index, list, first, last)。
   * 如果list是个JavaScript对象，callback的参数是 (value, key, list, index, first, last))。返回list以方便链式调用。
   * 如果callback 返回false,则中止遍历
   * @method [数组] - each ( 遍历数据或对象 )
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
        first = i === 0 ? true : false;
        last = i === length - 1 ? true : false;
        if (callback(obj[i], i, obj, first, last) === false) break;
      }
    } else {
      var ks = keys(obj);
      for (i = 0, length = ks.length; i < length; i++) {
        first = i === 0 ? true : false;
        last = i === ks.length - 1 ? true : false;
        if (callback(obj[ks[i]], ks[i], obj, i, first, last) === false) break;
      }
    }
    return obj;
  };
  Est.each = Est.forEach = each;
  /**
   * @description 复制source对象中的所有属性覆盖到destination对象上，并且返回 destination 对象.
   * 复制是按顺序的, 所以后面的对象属性会把前面的对象属性覆盖掉(如果有重复).
   * @method [对象] - extend ( 继承 )
   * @param {Object} obj destination对象
   * @return {Object} 返回 destination 对象
   * @author wyj on 14/5/22
   * @example
   *      Est.extend({name: 'moe'}, {age: 50}); => {name: 'moe', age: 50}
   */
  Est.extend = function (obj) {
    var h = obj.$$hashKey;
    if (typeOf(obj) !== 'object') return obj;
    each(slice.call(arguments, 1), function (source) {
      for (var prop in source) {
        obj[prop] = source[prop];
      }
    });
    setHashKey(obj, h);
    return obj;
  };

  if (typeof /./ !== 'function') {
    /**
     * @description 如果object是一个参数对象，返回true
     * @method [对象] - isFunction ( 判断是否是对象 )
     * @param {*} obj 待检测参数
     * @return {boolean}
     * @author wyj on 14/5/22
     * @example
     *      Est.isFunction(alert); => true
     */
    Est.isFunction = function (obj) {
      return typeof obj === 'function';
    };
  }
  /**
   * @description 返回一个对象里所有的方法名, 而且是已经排序的 — 也就是说, 对象里每个方法(属性值是一个函数)的名称.
   * @method [对象] - functions ( 返回一个对象里所有的方法名 )
   * @param {Object} obj 检测对象
   * @return {Array} 返回包含方法数组
   * @author wyj on 14/5/22
   * @example
   *      Est.functions(Est); => ["all", "any", "bind", "bindAll", "clone", "compact", "compose" ...
   */
  Est.functions = Est.methods = function (obj) {
    var names = [];
    for (var key in obj) {
      if (Est.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };
  /**
   * 解码ASCII码
   * @method [字符串] - fromCharCode ( 解码ASCII码 )
   * @param code
   * @return {string}
   * @author wyj 15.2.9
   */
  Est.fromCharCode = function (code) {
    try {
      return String.fromCharCode(code);
    } catch (e) {
    }
  }
  /**
   * @description 返回一个封装的对象. 在封装的对象上调用方法会返回封装的对象本身, 直道 value 方法调用为止.
   * @method [对象] - chain ( 返回一个封装的对象 )
   * @param value
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
  Est.chain = function (value) {
    value = new Wrapper(value);
    value._chain = true;
    return value;
  };
  /**
   * @description 如果对象 object 中的属性 property 是函数, 则调用它, 否则, 返回它。
   * @method [对象] - result ( 返回结果 )
   * @param obj
   * @return {*}
   * @author wyj on 14/5/22
   * @example
   *      var object = {cheese: 'crumpets', stuff: function(){ return 'nonsense'; }};
   *      Est.result(object, 'cheese'); => "crumpets"
   *      Est.result(object, 'stuff'); => "nonsense"
   */
  var result = function (obj, context) {
    //var ctx = typeOf(context) !== 'undefined' ? context : Est;
    return this._chain ? new Wrapper(obj, true) : obj;
  };
  // ObjectUtils
  /**
   * @description [1]检测数据类型 [undefined][number][string][function][regexp][array][date][error]
   * @method [对象] - typeOf ( 检测数据类型 )
   * @param {*} target 检测对象
   * @return {*|string}
   * @author wyj on 14/5/24
   * @example
   *      Est.typeOf(Est); => 'object'
   */
  var _type = {"undefined": "undefined", "number": "number", "boolean": "boolean", "string": "string",
    "[object Function]": "function", "[object RegExp]": "regexp", "[object Array]": "array",
    "[object Date]": "date", "[object Error]": "error", "[object File]": "file", "[object Blob]": "blob"};

  function typeOf(target) {
    return _type[typeof target] || _type[toString.call(target)] || (target ? "object" : "null");
  }

  Est.typeOf = typeOf;
  /**
   * @description 检测数据类型2 此版本 new Number(4) new String("abc") new Boolean(true) new ReferenceError()
   * 分别生成 Number String Boolean Error
   * @method [对象] - getType ( 检测数据类型2 )
   * @param {object} value
   * @return {String}
   * @author wyj on 14/8/5
   * @example
   *      var results = [];
   *      var fn = Est.getType;
   *      results.push(fn({a: 4})); // "Object"
   *      results.push(fn([1, 2, 3])); // "Array"
   *      (function() { results.push(fn(arguments));}()); // "Argements"
   *      results.push(fn(new ReferenceError())); // "Error"
   *      results.push(fn(new Date())); // "Date"
   *      results.push(fn(/a-z/)); // "RegExp"
   *      results.push(fn(Math)); // "Math"
   *      results.push(fn(JSON)); // "JSON"
   *      results.push(fn(new Number(4))); // "Number"
   *      results.push(fn(new String("abc"))); // "String"
   *      results.push(fn(new Boolean(true))); // "Boolean"
   *      results.push(fn(null)); // "null"
   *      => [ "Object", "Array", "Arguments", "Error", "Date", "RegExp", "Math", "JSON", "Number", "String", "Boolean", "null" ]
   */
  function getType(value) {
    if (value === null) return "null";
    var t = typeof value;
    switch (t) {
      case "function":
      case "object":
        if (value.constructor) {
          if (value.constructor.name) {
            return value.constructor.name;
          } else {
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
   * @description 根据字段获取值
   * @method [对象] - getValue ( 根据字段获取值 )
   * @param object
   * @param path
   * @return {*}
   * @author wyj 14.12.4
   * @example
   *    var result = Est.getValue(object, 'item.name');
   */
  function getValue(object, path) {
    if (Est.isEmpty(object)) return null;
    var array, result;
    if (arguments.length < 2 || typeOf(path) !== 'string') {
      console.error('参数不能少于2个， 且path为字符串');
      return;
    }
    array = path.split('.');
    function get(object, array) {
      if (isEmpty(object)) return null;
      each(array, function (key) {
        if (key in object) {
          if (array.length === 1) {
            // 如果为数组最后一个元素， 则返回值
            result = object[key]
          } else {
            // 否则去除数组第一个， 递归调用get方法
            array.shift();
            get(object[key], array);
            // 同样跳出循环
            return false;
          }
        } else {
          // 没找到直接跳出循环
          return false;
        }
      });
      return result;
    }

    return get(object, array);
    /*var array = [];
     var temp = cloneDeep(object);
     if (typeOf(path) === 'string'){
     array = path.split('.');
     each(array, function(key){
     temp = temp[key];
     });
     } else if (typeOf(path) === 'function'){
     path.call(this, object);
     }
     return temp;*/
  }

  Est.getValue = getValue;

  /**
   * @description 设置对象值
   *
   * @method [对象] - setValue ( 设置对象值 )
   * @param object
   * @param path
   * @param value
   * @return {boolean}
   * @author wyj 14.12.4
   * @example
   *    Est.setValue(object, 'item.name', 'bbb');
   */
  function setValue(object, path, value) {
    if (arguments.length < 3 || typeOf(path) !== 'string') return false;
    var array = path.split('.');

    function set(object, array, value) {
      each(array, function (key) {
        if (!(key in object)) object[key] = {};
        if (array.length === 1) {
          object[key] = value;
        } else {
          array.shift();
          set(object[key], array, value);
          return false;
        }
      });
    }

    set(object, array, value);
  }

  Est.setValue = setValue;

  /**
   * javascript 对象转换成path路径
   * @method [对象] - objToPath ( 对象转换成path路径 )
   * @return {Object}
   * @author wyj 15.1.28
   * @example
   *        Est.objToPath({a: {b: 'c'}}); ===> {'a.b': 'c'}
   */
  function objToPath(obj) {
    var ret = {}, separator = '.';
    for (var key in obj) {
      var val = obj[key];
      if (val && (val.constructor === Object || val.constructor === Array) && !isEmpty(val)) {
        var obj2 = objToPath(val);
        for (var key2 in obj2) {
          var val2 = obj2[key2];
          ret[key + separator + key2] = val2;
        }
      } else {
        ret[key] = val;
      }
    }
    return ret;
  }

  Est.objToPath = objToPath;

  /**
   * @description 判断是否为空 (空数组， 空对象， 空字符串， 空方法， 空参数, null, undefined) 不包括数字0和1 【注】苹果手机有问题
   * @method [对象] - isEmpty ( 判断是否为空 )
   * @param {Object} value
   * @return {boolean}
   * @author wyj on 14/6/26
   * @example
   *      Est.isEmpty(value); => false
   */
  function isEmpty(value) {
    var result = true;
    if (typeOf(value) === 'number') return false;
    if (!value) return result;
    var className = toString.call(value),
      length = value.length;
    if ((className == '[object Array]' || className == '[object String]' || className == '[object Arguments]' ) ||
      (className == '[object Object]' && typeof length == 'number' && Est.isFunction(value.splice))) {
      return !length;
    }
    each(value, function () {
      return (result = false);
    });
    return result;
  }

  Est.isEmpty = isEmpty;
  /**
   * @description 返回值函数
   * @method [对象] - valueFn ( 返回值函数 )
   * @param value
   * @return {Function}
   * @author wyj on 14/6/26
   * @example
   *
   */
  function valueFn(value) {
    return function () {
      return value;
    };
  }

  Est.valueFn = valueFn;
  /**
   * @description 反转key value  用于forEach
   * @method [对象] - reverseParams ( 反转key value )
   * @param {Function} iteratorFn
   * @return {Function}
   * @author wyj on 14/6/26
   * @example
   */
  function reverseParams(iteratorFn) {
    return function (value, key) {
      iteratorFn(key, value);
    };
  }

  Est.reverseParams = reverseParams;
  /**
   * @description [2]判断对象是否含有某个键 不是原型对象
   * @method [对象] - hasKey ( 判断对象是否含有某个键 )
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
   * @method [对象] - hashKey ( 计算hash值 )
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
   * 字符串转换成hash值
   * @method [字符串] - hash ( 字符串转换成hash值 )
   * @param str
   * @return {number}
   * @author wyh 15.2.28
   * @example
   *        Est.hash('aaaaa');
   */
  function hash(str) {
    var hash = 5381,
      i = str.length
    while (i)
      hash = (hash * 33) ^ str.charCodeAt(--i)
    return hash >>> 0;
  }

  Est.hash = hash;
  /**
   * @description 设置hashKey
   * @method [对象] - setHashKey ( 设置hashKey )
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
   * md5加密
   * @method [字符串] - md5 ( md5加密 )
   * @param string
   * @return {string}
   * @author wyj 15.2.28
   * @example
   *
   */
  function md5(string) {
    function RotateLeft(lValue, iShiftBits) {
      return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }

    function AddUnsigned(lX, lY) {
      var lX4, lY4, lX8, lY8, lResult;
      lX8 = (lX & 0x80000000);
      lY8 = (lY & 0x80000000);
      lX4 = (lX & 0x40000000);
      lY4 = (lY & 0x40000000);
      lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
      if (lX4 & lY4) {
        return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
      }
      if (lX4 | lY4) {
        if (lResult & 0x40000000) {
          return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
        } else {
          return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
        }
      } else {
        return (lResult ^ lX8 ^ lY8);
      }
    }

    function F(x, y, z) {
      return (x & y) | ((~x) & z);
    }

    function G(x, y, z) {
      return (x & z) | (y & (~z));
    }

    function H(x, y, z) {
      return (x ^ y ^ z);
    }

    function I(x, y, z) {
      return (y ^ (x | (~z)));
    }

    function FF(a, b, c, d, x, s, ac) {
      a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
      return AddUnsigned(RotateLeft(a, s), b);
    };

    function GG(a, b, c, d, x, s, ac) {
      a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
      return AddUnsigned(RotateLeft(a, s), b);
    };

    function HH(a, b, c, d, x, s, ac) {
      a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
      return AddUnsigned(RotateLeft(a, s), b);
    };

    function II(a, b, c, d, x, s, ac) {
      a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
      return AddUnsigned(RotateLeft(a, s), b);
    };

    function ConvertToWordArray(string) {
      var lWordCount;
      var lMessageLength = string.length;
      var lNumberOfWords_temp1 = lMessageLength + 8;
      var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
      var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
      var lWordArray = Array(lNumberOfWords - 1);
      var lBytePosition = 0;
      var lByteCount = 0;
      while (lByteCount < lMessageLength) {
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
        lByteCount++;
      }
      lWordCount = (lByteCount - (lByteCount % 4)) / 4;
      lBytePosition = (lByteCount % 4) * 8;
      lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
      lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
      lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
      return lWordArray;
    };

    function WordToHex(lValue) {
      var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
      for (lCount = 0; lCount <= 3; lCount++) {
        lByte = (lValue >>> (lCount * 8)) & 255;
        WordToHexValue_temp = "0" + lByte.toString(16);
        WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
      }
      return WordToHexValue;
    };

    function Utf8Encode(string) {
      string = string.replace(/\r\n/g, "\n");
      var utftext = "";

      for (var n = 0; n < string.length; n++) {
        var c = string.charCodeAt(n);

        if (c < 128) {
          utftext += String.fromCharCode(c);
        }
        else if ((c > 127) && (c < 2048)) {
          utftext += String.fromCharCode((c >> 6) | 192);
          utftext += String.fromCharCode((c & 63) | 128);
        }
        else {
          utftext += String.fromCharCode((c >> 12) | 224);
          utftext += String.fromCharCode(((c >> 6) & 63) | 128);
          utftext += String.fromCharCode((c & 63) | 128);
        }
      }

      return utftext;
    };

    var x = Array();
    var k, AA, BB, CC, DD, a, b, c, d;
    var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
    var S21 = 5, S22 = 9 , S23 = 14, S24 = 20;
    var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
    var S41 = 6, S42 = 10, S43 = 15, S44 = 21;

    string = Utf8Encode(string);

    x = ConvertToWordArray(string);

    a = 0x67452301;
    b = 0xEFCDAB89;
    c = 0x98BADCFE;
    d = 0x10325476;

    for (k = 0; k < x.length; k += 16) {
      AA = a;
      BB = b;
      CC = c;
      DD = d;
      a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
      d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
      c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
      b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
      a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
      d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
      c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
      b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
      a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
      d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
      c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
      b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
      a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
      d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
      c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
      b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
      a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
      d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
      c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
      b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
      a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
      d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
      c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
      b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
      a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
      d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
      c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
      b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
      a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
      d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
      c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
      b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
      a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
      d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
      c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
      b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
      a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
      d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
      c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
      b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
      a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
      d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
      c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
      b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
      a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
      d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
      c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
      b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
      a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
      d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
      c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
      b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
      a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
      d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
      c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
      b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
      a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
      d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
      c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
      b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
      a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
      d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
      c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
      b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
      a = AddUnsigned(a, AA);
      b = AddUnsigned(b, BB);
      c = AddUnsigned(c, CC);
      d = AddUnsigned(d, DD);
    }

    var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);

    return temp.toLowerCase();
  }

  Est.md5 = md5;
  /**
   * @description [3]过滤对象字段
   * @method [对象] - pick ( 过滤对象字段 )
   * @param {Object} obj 过滤对象
   * @param {Function} callback 回调函数
   * @param context
   * @return {{}}
   * @author wyj on 14/5/26
   * @example
   *      var object3 = {name:'a', sort: '1', sId: '000002'};
   *      Est.pick(object3, ['name','sort']) => {"name":"a","sort":"1"}
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
      each(keys, function (key) {
        if (key in obj) result[key] = obj[key];
      });
    }
    return result;
  }

  Est.pick = pick;
  /**
   * @description 返回获取对象属性值的方法
   * @method [对象] - property ( 返回获取对象属性值 )
   * @param {Object} key
   * @return {Function}
   */
  function property(key) {
    return function (object) {
      if (Est.typeOf(object) === 'string') return null;
      return Est.getValue(object, key);
    };
  }

  Est.property = property;
  /**
   * @description 翠取对象中key对应的值
   * @method [对象] - pluck ( 翠取对象中key对应的值 )
   * @param obj
   * @param key
   * @return {*}
   * @author wyj on 14/7/5
   * @example
   *      var characters = [ { 'name': 'barney', 'age': 36 }, { 'name': 'fred',   'age': 40 } ];
   *      var result = Est.pluck(characters, 'name'); => [ "barney", "fred" ]
   */
  function pluck(obj, key) {
    return map(obj, property(key), null);
  };
  Est.pluck = pluck;

  /**
   * @description 释放数组， 若数组池个数少于最大值， 则压入数组池以备用
   * @method [数组] - releaseArray ( 释放数组 )
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
   * @method [对象] - releaseObject ( 释放对象 )
   * @author wyj on 14/7/1
   * @example
   *      Est.releaseObject(object);
   */
  function releaseObject(object) {
    object.array = object.cache = object.criteria = object.object = object.number = object.string = object.value = null;
    if (objectPool.length < maxPoolSize) {
      objectPool.push(object);
    }
  }

  Est.releaseObject = releaseObject;
  /**
   * @description 获取数组池
   * @method [数组] - getArray ( 获取数组池 )
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
   * @description 获取对象池 主要用于优化性能
   * @method [对象] - getObject ( 获取对象池 )
   * @return {Object}
   * @author wyj on 14/7/1
   * @example
   *      var object = Est.getObject();
   */
  function getObject() {
    return objectPool.pop() || { 'array': null, 'cache': null, 'criteria': null, 'false': false, 'index': 0, 'null': false, 'number': null, 'object': null, 'push': null, 'string': null, 'true': false, 'undefined': false, 'value': null };
  }

  Est.getObject = getObject;

  function baseClone(value, isDeep, callback, stackA, stackB) {
    //var type = getType(value);
    var type = typeOf(value);
    if (callback) {
      var result = callback(value);
      if (typeof result !== 'undefined') return result;
    }
    if (typeof value === 'object' && type !== 'null') {
      switch (type) {
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
    if (isDeep) {
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
    } else {
      result = isArr ? arraySlice(value, 0, value.length) : extend({}, value);
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
    each(value, function (target, key) {
      result[key] = baseClone(target, isDeep, callback, stackA, stackB);
    });
    if (initedStack) {
      releaseArray(stackA);
      releaseArray(stackB);
    }
    return result;
  }

  /**
   * @description 浅复制
   * @method [对象] - clone ( 浅复制 )
   * @param value
   * @param callback
   * @param context
   * @return {*}
   * @author wyj on 14/7/6
   * @example
   *
   */
  function clone(value, callback, context) {
    callback = typeOf(callback) === 'function' && matchCallback(callback, context, 1);
    return baseClone(value, false, callback);
  }

  Est.clone = clone;
  /**
   * @description 深复制
   * @method [对象] - cloneDeep ( 深复制 )
   * @param value
   * @param callback
   * @param context
   * @return {*}
   * @author wyj on 14/7/6
   * @example
   *
   */
  function cloneDeep(value, callback, context) {
    callback = typeOf(callback) === 'function' && matchCallback(callback, context, 1);
    return baseClone(value, true, callback);
  }

  Est.cloneDeep = cloneDeep;

  /**
   * @description 返回一个设置参数的对象
   * @method [对象] - setArguments ( 返回一个设置参数的对象 )
   * @param args
   * @param {object/string} append
   * @author wyj on 14.9.12
   *      return Est.setArguments(arguments, {age： 1});
   */
  function setArguments(args, append) {
    this.value = [].slice.call(args);
    this.append = append;
  }

  Est.setArguments = setArguments;

  /**
   * @description 对象路由控制
   * @method [对象] - keyRoute ( 对象路由控制 )
   * @param {Object} handle 待控制对象
   * @param {String} pathname 路由名称
   * @param {Object} response 参数
   * @author wyj on 14/8/1
   * @example
   *      var handle = {
   *			  route1: function(reponse){ },
   * 			  route2: function(){ }
   * 		  }
   *      Est.keyRoute(handle, 'route1', {});
   */
  function keyRoute(handle, pathname, response) {
    if (Est.typeOf(handle[pathname]) === 'function') {
      return handle[pathname](response);
    } else {
      console.log("No request handler found for " + pathname);
    }
  }

  Est.keyRoute = keyRoute;

  // FormUtils =============================================================================================================================================

  /**
   * @description 表单验证
   * @method [表单] - validation ( 表单验证 )
   * @param  {String} str  待验证字符串 str可为数组 判断所有元素是否都为数字
   * @param  {String} type 验证类型
   * @return {Boolean}      返回true/false
   * @author wyj on 14.9.29
   * @example
   *      var result_n = Est.validation(number, 'number'); // 数字或带小数点数字
   *      var result_e = Est.validation(email, 'email'); // 邮箱
   *      var result_c = Est.validation(cellphone, 'cellphone'); // 手机号码
   *      var result_d = Est.validation(digits, 'digits'); // 纯数字， 不带小数点
   *      var result_u = Est.validation(url, 'url'); // url地址
   */
  function validation(str, type) {
    var pattern, flag = true;
    switch (type) {
      case 'cellphone':
        pattern = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;
        break;
      case 'email':
        pattern = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        break;
      case 'url':
        pattern = /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
        break;
      case 'number':
        // 可带小数点 如：0.33， 35.325
        pattern = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/; // ^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$ .1 matches 0.1 matches 1.12 matches 123.12 matches 92 matches 092 matches 092.13 matches 0 doesn't match 0.0 doesn't match 0.00 doesn't match 00 doesn't match 1.234 doesn't match -1 doesn't match -1.2 doesn't match
        break;
      case 'digits': //还可带小数点
        pattern = /^\d+$/;
        break;
    }
    if (this.typeOf(str) === 'array') {
      this.each(str, function (item) {
        if (!pattern.test(item))
          flag = false;
      });
    } else {
      flag = pattern.test(str);
    }
    return flag;
  }

  Est.validation = validation;


  // StringUtils =============================================================================================================================================
  /**
   * @description 产生唯一身份标识， 如'012ABC', 若为数字较容易数字溢出
   * @method [字符串] - nextUid ( 产生唯一身份标识 )
   * @return {string}
   * @param {String} prefix 前缀
   * @author wyj on 14/6/23
   * @example
   *      var uid = Est.nextUid('Uid'); => 'Uid001'
   */
  function nextUid(prefix) {
    var index = uid.length, digit;
    if (typeOf(prefix) === "undefined")
      prefix = '';
    while (index) {
      index--;
      digit = uid[index].charCodeAt(0);
      if (digit == 57 /*'9'*/) {
        uid[index] = 'A';
        return prefix + uid.join('');
      }
      if (digit == 90  /*'Z'*/) {
        uid[index] = '0';
      } else {
        uid[index] = String.fromCharCode(digit + 1);
        return prefix + uid.join('');
      }
    }
    uid.unshift('0');
    return prefix + uid.join('');
  }

  Est.nextUid = nextUid;

  /**
   * @description id值瘦身 去掉前面的字母与0 比如 Product_0000000000000000000132 瘦身为132
   * @method [字符串] - encodeId ( id值瘦身 )
   * @param target
   * @return {string}
   * @author wyj 15.1.9
   * @example
   *      Est.encodeId('Product_00000000000000132'); => 132
   */
  function encodeId(target) {
    return target == null ? "" : target.replace(/^[^1-9]+/, "");
  }

  Est.encodeId = encodeId;

  /**
   * 还原ID
   * @method [字符串] - decodeId ( 还原ID )
   * @param id
   * @param prefix
   * @param length
   * @return {string}
   * @author wyj 15.1.13
   * @example
   *      Est.decodeId('123' , 'Product_' , 32); => Product_00000000000000000000123
   */
  function decodeId(id, prefix, length) {
    var len = prefix.length + id.length - 1;
    return prefix + new Array(length - len).join('0') + id;
  }

  Est.decodeId = decodeId;

  /**
   * @description 转换成小写字母
   * @method [字符串] - lowercase ( 转换成小写字母 )
   * @param {String} string 原字符串
   * @return {string}
   * @author wyj on 14/6/17
   * @example
   *      Est.lowercase("LE"); => le
   */
  function lowercase(string) {
    return typeOf(string) === 'string' ? string.toLowerCase() : string;
  }

  Est.lowercase = lowercase;
  /**
   * @description 转换成大写字母
   * @method [字符串] - uppercase ( 转换成大写字母 )
   * @param {String} string 原字符串
   * @return {string}
   * @author wyj on 14/6/17
   * @example
   *      Est.uppercase("le"); => LE
   */
  function uppercase(string) {
    return typeOf(string) === 'string' ? string.toUpperCase() : string;
  }

  Est.uppercase = uppercase;

  /**
   * @description 二分法将一个字符串重复自身N次
   * @method [字符串] - repeat ( 字符串重复自身N次 )
   * @param {String} target 原字符串
   * @param {Number} n 重复次数
   * @return {String} 返回字符串
   * @author wyj on 14-04-23
   * @example
   *      Est.repeat('ruby', 2); => rubyruby
   */
  function repeat(target, n) {
    var s = target, total = '';
    while (n > 0) {
      if (n % 2 == 1) {
        total += s;
      }
      if (n == 1) {
        break;
      }
      s += s;
      n = n >> 1;
    }
    return total;
  }

  Est.repeat = repeat;
  /**
   * @description 判定一个字符串是否包含另一个字符串
   * @method [字符串] - contains ( 字符串是否包含另一个字符串 )
   * @param {string} target 目标字符串
   * @param {string} 包含字符串
   * @param {string} 判定一个元素的className 是否包含某个特定的class
   * @return {boolean} 返回true/false
   * @author wyj on 14-04-23
   * @example
   *      Est.contains("aaaaa", "aa"); => true
   */
  function contains(target, str, separator) {
    return separator ? (separator + target + separator).indexOf(separator + str + separator) > -1 : target.indexOf(str) > -1;
  }

  Est.contains = contains;
  /**
   * @description 判定目标字符串是否位于原字符串的开始之处
   * @method [字符串] - startsWidth ( 字符串是否位于原字符串的开始之处 )
   * @param {target} 原字符串
   * @param {str} 目标字符串
   * @param {boolean} 是否忽略大小写
   * @return {boolean} true/false
   * @author wyj on 14-04-23
   * @example
   *      Est.startsWidth('aaa', 'aa', true); => true
   */
  function startsWith(target, str, ignorecase) {
    var start_str = target.substr(0, str.length);
    return ignorecase ? start_str.toLowerCase() === str.toLowerCase() : start_str === str;
  }

  Est.startsWidth = startsWith;
  /**
   * @description 判定目标字符串是否位于原字符串的结束之处
   * @method [字符串] - endsWidth ( 字符串是否位于原字符串的结束之处 )
   * @param {target} 原字符串
   * @param {str} 目标字符串
   * @param {boolean} 是否忽略大小写
   * @return {boolean} true/false
   * @author wyj on 14-04-23
   * @example
   *      Est.endsWidth('aaa', 'aa', true); => true
   */
  function endsWidth(target, str, ignorecase) {
    var end_str = target.substring(target.length - str.length);
    return ignorecase ? end_str.toLowerCase() === str.toLowerCase() : end_str === str;
  }

  Est.endsWidth = endsWidth;
  /**
   * @description 取得一个字符串所有字节的长度
   * @method [字符串] - byteLen ( 取得一个字符串所有字节的长度 )
   * @param target 目标字符串
   * @param fix 汉字字节长度，如mysql存储汉字时， 是用3个字节
   * @return {Number}
   * @author wyj on 14-04-23
   * @example
   *      Est.byteLen('sfasf我'， 2); => 7
   */
  function byteLen(target, fix) {
    fix = fix ? fix : 2;
    var str = new Array(fix + 1).join('-');
    return target.replace(/[^\x00-\xff]/g, str).length;
  }

  Est.byteLen = byteLen;
  /**
   * @description 对字符串进行截取处理，默认添加三个点号【版本一】
   * @method [字符串] - truncate ( 对字符串进行截取处理 )
   * @param target 目标字符串
   * @param length 截取长度
   * @param truncation 结尾符号
   * @return {string}
   * @author wyj on 14-04-23
   * @example
   *     Est.truncate('aaaaaa', 4, '...'); => 'aaa...'
   */
  function truncate(target, length, truncation) {
    length = length || 30
    truncation = truncation === void(0) ? "..." : truncation
    return target.length > length ? target.slice(0, length - truncation.length) + truncation : String(target);
  }

  Est.truncate = truncate;
  /**
   * @description 对字符串进行截取处理，默认添加三个点号【版本二】
   * @method [字符串] - cutByte ( 对字符串进行截取处理 )
   * @param str 目标字符串
   * @param length 截取长度
   * @param truncation 结尾符号
   * @return {string}
   * @author wyj on 14-04-25
   * @example
   *     Est.cutByte('aaaaaa', 4, '...'); => 'a...'
   */
  function cutByte(str, length, truncation) {
    if (isEmpty(str)) {
      return ''
    }
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
    function n2(a) {
      var n = a / 2 | 0;
      return (n > 0 ? n : 1)
    }

    var lenS = length - endstrBl, _lenS = 0, _strl = 0;
    while (_strl <= lenS) {
      var _lenS1 = n2(lenS - _strl),
        addn = this.byteLen(str.substr(_lenS, _lenS1));
      if (addn == 0) {
        return str;
      }
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
   * @method [字符串] - stripTabName ( 替换指定的html标签 )
   * @param {String} target 目标字符串
   * @param {String} tagName 标签名称
   * @param {String} deep 是否删除标签内的内容
   * @return {string}
   * @author wyj on 14/6/18
   * @example
   *      Est.stripTagName("<script>a</script>", "script", true)=> ''
   *      Est.stripTagName("<script>a</script>", "script", false)=> 'a'
   */
  function stripTagName(target, tagName, deep) {
    var pattern = deep ? "<" + tagName + "[^>]*>([\\S\\s]*?)<\\\/" + tagName + ">" : "<\/?" + tagName + "[^>]*>";
    return String(target || '').replace(new RegExp(pattern, 'img'), '');
  }

  Est.stripTagName = stripTagName;
  /**
   * @description 移除字符串中所有的script标签。弥补stripTags 方法的缺陷。此方法应在stripTags之前调用
   * @method [字符串] - stripScripts ( 移除字符串中所有的script标签 )
   * @param {String} target 目标字符串
   * @return {string} 返回字符串
   * @author wyj on 14/5/5
   * @example
   *     Est.stripScripts("a<script></script>"); => 'a'
   */
  function stripScripts(target) {
    return String(target || '').replace(/<script[^>]*>([\S\s]*?)<\/script>/img, '');
  }

  Est.stripScripts = stripScripts;
  /**
   * @description 移除字符串中的html标签, 若字符串中有script标签，则先调用stripScripts方法
   * @method [字符串] - stripTags ( 移除字符串中的html标签 )
   * @param {String} target 原字符串
   * @return {string} 返回新字符串
   * @author wyj on 14/5/5
   * @example
   *     Est.stripTags('aa<div>bb</div>'); => 'aabb'
   */
  function stripTags(target) {
    return String(target || '').replace(/<[^>]+>/img, '');
  }

  Est.stripTags = stripTags;
  /**
   * @description 替换原字符串中的“< > " '”为 “&lt;&gt;&quot;&#39;”
   * @method [字符串] - escapeHTML ( 替换原字符串中的“< > " '” )
   * @param {String} target 原字符串
   * @return {String} 返回新字符串
   * @author wyj on 14/5/5
   * @example
   *     Est.escapeHTML('<'); => '&lt;'
   */
  function escapeHTML(target) {
    return target.replace(/&/mg, '&amp;')
      .replace(/</mg, '&lt;')
      .replace(/>/mg, '&gt;')
      .replace(/"/mg, '&quot;')
      .replace(/'/mg, '&#39;');
  }

  Est.escapeHTML = escapeHTML;
  /**
   * @description 替换原字符串中的“&lt;&gt;&quot;&#39;”为 “< > " '”
   * @method [字符串] - unescapeHTML ( 替换原字符串中的“&lt;&gt;&quot;&#39; )
   * @param {String} target 原字符串
   * @return {String} 返回新字符串
   * @author wyj on 14/5/5
   * @example
   *     Est.unescapeHTML('&lt;'); => '<'
   */
  function unescapeHTML(target) {
    target = target || '';
    return target.replace(/&amp;/mg, '&')
      .replace(/&lt;/mg, '<')
      .replace(/&gt;/mg, '>')
      .replace(/&quot;/mg, '"')
      .replace(/&#([\d]+);/mg, function ($0, $1) {
        return String.fromCharCode(parseInt($1, 10));
      });
  }

  Est.unescapeHTML = unescapeHTML;
  /**
   * @description 将字符串安全格式化为正则表达式的源码
   * @method [字符串] - escapeRegExp ( 将字符串安全格式化为正则表达式的源码 )
   * @param {String} target 原字符串
   * @return {*}
   * @author wyj on 14/5/16
   * @example
   *      Est.escapeRegExp('aaa/[abc]/') => aaa\/\[abc\]\/;
   */
  function escapeRegExp(target) {
    return target.replace(/([-.*+?^${}()|[\]\/\\])/img, '\\$1');
  }

  Est.escapeRegExp = escapeRegExp;
  /**
   * @description 为字符串的某一端添加字符串。 如：005
   * @method [字符串] - pad ( 为字符串的某一端添加字符串 )
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
  function pad(target, n, filling, right, radix, opts) {
    var str = target.toString(radix || 10), prefix = '', length = n;
    if (opts && opts.prefix) {
      length = n - opts.prefix.length;
      prefix = opts.prefix;
      if (length < 0) {
        throw new Error('n too small');
      }
    }
    filling = filling || '0';
    while (str.length < length) {
      if (!right) {
        str = filling + str;
      } else {
        str += filling;
      }
    }
    return prefix + str;
  }

  Est.pad = pad;
  /**
   * @description 格式化字符串，类似于模板引擎，但轻量级无逻辑
   * @method [字符串] - format ( 格式化字符串 )
   * @param {String} str 原字符串
   * @param {Object} object 若占位符为非零整数形式即对象，则键名为点位符
   * @return {String} 返回结果字符串
   * @author wyj on 14/5/5
   * @example
   *     Est.format("Result is #{0}, #{1}", 22, 23); => "Result is 22, 23"
   *     Est.format("#{name} is a #{sex}", {name : 'Jhon',sex : 'man'}); => "Jhon is a man"
   */
  function format(str, object) {
    var array = Array.prototype.slice.call(arguments, 1);
    return str.replace(/\\?\#{([^{}]+)\}/gm, function (match, name) {
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
   * @description 比format更强大的模板引擎， 支持字符串模板、变量嵌套、四则运算、比较操作符、三元运算符
   * @method [字符串] - template ( 比format更强大的模板引擎 )
   * @param {String} str 待格式化字符串
   * @param {Object} data 替换对象
   * @return {String} result
   * @author wyj on 14.10.9
   * @example
   *         // 字符串
   *        var result3 =Est.template('hello {{name}}', { name: 'feenan'}); => "hello feenan"
   *        // 变量嵌套
   *        var result8 =Est.template('hello {{person.age}}', { person: {age: 50}}); => "hello 50"
   *        // 四则运算
   *        var result4 =Est.template('(1+2)*age = {{ (1+2)*age}}', {age: 18}); => (1+2)*age = 54
   *        // 比较操作符
   *        var result5 =Est.template('{{1>2}}', {}); => false
   *        var result6 =Est.template('{{age > 18}}', {age: 20}); => true
   *        // 三元运算符
   *        var result7 =Est.template('{{ 2 > 1 ? name : ""}}', {name: 'feenan'}); => feenan
   *        // 综合
   *        var tmpl1 = '<div id="{{id}}" class="{{(i % 2 == 1 ? " even" : "")}}"> ' +
   *        '<div class="grid_1 alpha right">' +
   *        '<img class="righted" src="{{profile_image_url}}"/>' +
   *        '</div>' +
   *        '<div class="grid_6 omega contents">' +
   *        '<p><b><a href="/{{from_user}}">{{from_user}}</a>:</b>{{info.text}}</p>' +
   *        '</div>' +
   *        '</div>';
   *        var result = Est.template(tmpl1, {
   *              i: 5,
   *              id: "form_user",
   *              from_user: "Krasimir Tsonev",
   *              profile_image_url: "http://www.baidu.com/img/aaa.jpg",
   *              info: {
   *                  text: "text"
   *              }
   *         });
   */
  function template(str, data) {
    var fn = !/\W/.test(str) ?
      cache[str] = cache[str] || template(str) :
      new Function("obj",
          "var p=[],print=function(){p.push.apply(p,arguments);};" +
          "with(obj){p.push('" +
          str
            .replace(/[\r\t\n]/g, " ")
            .split("{{").join("\t")
            .replace(/((^|}})[^\t]*)'/g, "$1\r")
            .replace(/\t(.*?)}}/g, "',$1,'")
            .split("\t").join("');")
            .split("}}").join("p.push('")
            .split("\r").join("\\'")
          + "');}return p.join('');");
    return data ? fn(data) : fn;
  }

  Est.template = template;


  /**
   * @description 移除字符串左端的空白
   * @method [字符串] - ltrim ( 移除字符串左端的空白 )
   * @param {String} str 原字符串
   * @return {String} 返回新字符串
   * @author wyj on 14/5/6
   * @example
   *     Est.ltrim('  dd    '); => 'dd    '
   */
  function ltrim(str) {
    for (var i = 0; i < str.length; i++) {
      if (whitespace.indexOf(str.charAt(i)) === -1) {
        str = str.substring(i);
        break;
      }
    }
    return whitespace.indexOf(str.charAt(0)) === -1 ? (str) : '';
  }

  Est.ltrim = ltrim;
  /**
   * @description 移除字符串右端的空白
   * @method [字符串] - rtrim ( 移除字符串右端的空白 )
   * @param {String} str 原字符串
   * @return {String} 返回新字符串
   * @author wyj on 14/5/6
   * @example
   *     Est.rtrim('  dd    '); => '   dd'
   */
  function rtrim(str) {
    for (var i = str.length - 1; i >= 0; i--) {
      if (whitespace.lastIndexOf(str.charAt(i)) === -1) {
        str = str.substring(0, i + 1);
        break;
      }
    }
    return whitespace.lastIndexOf(str.charAt(str.length - 1)) === -1 ? (str) : '';
  }

  Est.rtrim = rtrim;
  /**
   * @description 移除字符串两端的空白, 当字符串为undefined时， 返回null
   * @method [字符串] - trim ( 移除字符串两端的空白 )
   * @param {String} str 原字符串
   * @return {String} 返回新字符串
   * @author wyj on 14/5/6
   * @example
   *     Est.trim('  dd    '); => 'dd'
   */
  function trim(str) {
    if (isEmpty(str)) return null;
    for (var i = 0; i < str.length; i++) {
      if (whitespace.indexOf(str.charAt(i)) === -1) {
        str = str.substring(i);
        break;
      }
    }
    for (i = str.length - 1; i >= 0; i--) {
      if (whitespace.lastIndexOf(str.charAt(i)) === -1) {
        str = str.substring(0, i + 1);
        break;
      }
    }
    return whitespace.indexOf(str.charAt(0)) === -1 ? (str) : '';
  }

  Est.trim = trim;
  /**
   * @description 去除字符串中的所有空格
   * @method [字符串] - deepTrim ( 去除字符串中的所有空格 )
   * @param {String} str 原字符串
   * @return {String} 返回新字符串
   * @author wyj on 14/5/6
   * @example
   *     Est.allTrim('a b c'); => 'abc'
   */
  function deepTrim(str) {
    return str.toString().replace(/\s*/gm, '');
  }

  Est.deepTrim = deepTrim;

  /**
   * @description 字符串反转
   * @method [字符串] - reverse ( 字符串反转 )
   * @param {String} str 原字符串
   * @return {String} 返回新字符串
   * @author wyj on 14/5/6
   * @example
   *     Est.reverse('abc'); => 'cba'
   */
  function reverse(str) {
    str = str.split('');
    var result = '',
      length = str.length;
    while (length--) {
      result += str[length];
    }
    return result;
  }

  Est.reverse = reverse;

  // ArrayUtils ===============================================================================================================================================
  /**
   * @description 根据索引值移除数组元素
   * @method [数组] - removeAt ( 根据索引值移除数组元素 )
   * @param {Array} list 原数组
   * @param {Nubmer} index 数组索引
   * @return {Boolean} 返回是否删除成功
   * @author wyj on 14/5/24
   * @example
   *      Est.removeAt(list, dx) => ;
   */
  function removeAt(list, index) {
    return !!list.splice(index, 1).length;
  }

  Est.removeAt = removeAt;
  /**
   * @description 删除数组中的元素
   * @method [数组] - arrayRemove ( 删除数组中的元素 )
   * @param {Array} array 目标数组
   * @param {*} value 删除的元素
   * @return {*}
   * @author wyj on 14/6/23
   * @example
   *      var list = ['a', 'b', 'b'];
   *      var result = Est.arrayRemove(list, 'a'); => ['a', 'b']
   */
  function arrayRemove(array, value) {
    var index = indexOf(array, value);
    if (index !== -1)
      array.splice(index, 1);
    return value;
  }

  Est.arrayRemove = arrayRemove;
  /**
   * @description 获取对象的所有KEY值
   * @method [数组] - keys ( 获取对象的所有KEY值 )
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
   * @method [数组] - matches ( 对象是否匹配指定键/值属性的列表 )
   * @param attrs
   * @return {Function}
   * @author wyj on 14/6/26
   * @example
   */
  function matches(attrs) {
    return function (obj) {
      if (obj == null) return isEmpty(attrs);
      if (obj === attrs) return true;
      for (var key in attrs) if (attrs[key] !== obj[key]) return false;
      return true;
    };
  }

  Est.matches = matches;
  /**
   * @description 数组过滤
   * @method [数组] - filter ( 数组过滤 )
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
  function filter(collection, callback, context) {
    var results = [];
    if (!collection) return result;
    var predicate = matchCallback(callback, context);
    each(collection, function (value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  }

  Est.filter = filter;

  /**
   * @description 数组中查找符合条件的索引值 比较原始值用indexOf
   * @method [数组] - findIndex ( 数组中查找符合条件的索引值 )
   * @param array
   * @param {Function} callback 回调函数
   * @param {Object} context 上下文
   * @return {number}
   * @author wyj on 14/6/29
   * @example
   *      var list = [{"name":"aa"},{"name":"bb"},{"name":"cc"}, {"name":"bb", address:"zjut"}];
   *      var index = Est.findIndex(list, {name: 'aa'}); => 0
   *      var index2 =  Est.findIndex(list, function(item){
   *         return item.name === 'aa';
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
   * @method [数组] - arrayToObject ( 数组转化为object )
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
  function arrayToObject(list, key, val) {
    var obj = {};
    each(list, function (item) {
      if (typeOf(item[key]) !== 'undefined') {
        obj[item[key]] = item[val];
      }
    });
    return obj;
  }

  Est.arrayToObject = arrayToObject;
  /**
   * @description 对象转化为数组
   * @method [数组] - arrayFromObject ( 对象转化为数组 )
   * @param {Object} obj 待转化的对象
   * @return {Array} 返回数组
   * @author wyj on 14/5/24
   * @example
   *      var obj = {key1: 'value1', key2: 'value2'};
   *      var result = Est.arrayFromObject(obj, 'key', 'value'); =>
   *      [{key: 'key1', value: 'value1'},
   *      {key: 'key2', value: 'value2'}]
   */
  function arrayFromObject(obj, name, value) {
    var list = [];
    if (typeOf(obj) !== 'object') {
      return [];
    }
    each(obj, function (val, key) {
      var object = {};
      object[name] = key;
      object[value] = val;
      list.push(object);
    });
    return list;
  }

  Est.arrayFromObject = arrayFromObject;
  /**
   * @description 交换元素
   * @method [数组] - arrayExchange ( 交换元素 )
   * @param {Array} list 原数组
   * @param {Number} thisdx 第一个元素索引值
   * @param {Number} targetdx 第二个元素索引值
   * @param {Object} opts {String} opts.column 需要替换的列值;{Function} opts.callback(thisNode, nextNode) 回调函数 返回两个对调元素
   * @author wyj on 14/5/13
   * @example
   *      var list2 = [{name:1, sort:1},{name:2, sort:2}];
   *      Est.arrayExchange(list2, 0 , 1, {
   *          column:'sort',
   *            callback:function(thisNode, targetNode){
   *           }
   *          }); =>
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
      thisSort = getValue(thisNode, opts.column);
      setValue(thisNode, opts.column, getValue(nextNode, opts.column));
      setValue(nextNode, opts.column, thisSort);
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
   * @method [数组] - arrayInsert ( 数组插序 )
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
   * @method [数组] - map ( 遍历MAP对象 )
   * @param {Array} obj 目标数组
   * @param callback 回调函数
   * @param context 上下文
   * @return {Array} 返回数组
   * @author wyj on 14/6/23
   * @example
   *      var list = [1, 2, 3];
   *      var result = Est.map(list, function(value, index, list){
   *        return list[index] + 1;
   *      }); => [2, 3, 4]
   */
  function map(obj, callback, context) {
    var results = [];
    if (obj === null) return results;
    callback = matchCallback(callback, context);
    each(obj, function (value, index, list) {
      results.push(callback(value, index, list));
    });
    return results;
  }

  Est.map = map;
  /**
   * @description 字符串转化成MAP对象，以逗号隔开， 用于FORM表单
   * @method [数组] - makeMap ( 字符串转化成MAP对象 )
   * @param str
   * @return {{}}
   * @author wyj on 14/6/23
   * @example
   *      var object = Est.makeMap("a, aa, aaa"); => {"a":true, "aa": true, "aaa": true}
   */
  function makeMap(str) {
    var obj = {}, items = str.split(","), i;
    for (i = 0; i < items.length; i++)
      obj[ items[i] ] = true;
    return obj;
  }

  Est.makeMap = makeMap;
  /**
   * @description 判断元素是否存在于数组中
   * @method [数组] - indexOf ( 判断元素是否存在于数组中 )
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
   * @method [数组] - sortBy ( 数组排序 )
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
    each(collection, function (value, key, collection) {
      var object = result[++index] = {};
      if (isArr) {
        object.criteria = map(callback, function (key) {
          return value[key];
        });
      } else {
        (object.criteria = [])[0] = callback(value, key, collection);
      }
      object.index = index;
      object.value = value;
    });
    length = result.length;
    result.sort(function (left, right) {
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
   * @method [数组] - arraySlice / take ( 截取数组 )
   * @param {Array} array 数据
   * @param {Number} start 起始
   * @param {Number} end 若未设置值， 则取索引为start的一个值
   * @return {*}
   * @author wyj on 14/7/7
   * @example
   *      var youngest = Est.chain(characters) .sortBy('age').take(0)   // 获取第一个值
   *      .pluck('age').value();
   */
  function arraySlice(array, start, end) {
    start || (start = 0);
    if (typeof end == 'undefined') {
      end = start < array.length - 1 ? (start + 1) : array.length;
    }
    var index = -1,
      length = end - start || 0,
      result = Array(length < 0 ? 0 : length);

    while (++index < length) {
      result[index] = array[start + index];
    }
    return result;
  }

  Est.take = Est.arraySlice = arraySlice;

  // ImageUtils ==============================================================================================================================================

  /**
   * @description  获取图片地址缩放等级
   * @method [图片] - picUrl ( 获取图片地址缩放等级 )
   * @param src
   * @param zoom
   * @return {string}
   * @author wyj on 14/7/25
   * @example
   *      Est.picUrl(src, 5);
   */
  function picUrl(src, zoom) {
    if (!Est.isEmpty(src)) {
      var type = src.substring(src.lastIndexOf(".") + 1, src.length);
      var hasZoom = src.lastIndexOf('_') > 0 ? true : false;
      return src.substring(0, src.lastIndexOf(hasZoom ? '_' : '.')) + "_" + zoom + "." + type;
    }
  }

  Est.picUrl = picUrl;

  /**
   * @description 获取居中图片的margin值, 若图片宽高比太大，则不剪切
   * @method [图片] - imageCrop ( 获取居中图片的margin值 )
   * @param {Number} naturalW 图片宽度
   * @param {Number} naturalH 图片高度
   * @param {Number} targetW 展示框宽度
   * @param {Number} targetH 展示框高度
   * @param {Boolean} fill 是否铺满框
   * @return {{width: *, height: *, marginTop: number, marginLeft: number}}
   * @author wyj on 14-04-24
   * @example
   *      $.each($(".imageCrop"), function(){
   *           $(this).load(function(response, status, xhr){
   *               var w = $(this).get(0).naturalWidth, h = $(this).get(0).naturalHeight;
   *               var width = $(this).attr("data-width"), height = $(this).attr("data-height");
   *               $(this).css(Est.imageCrop(w, h, width, height), 'fast');
   *               $(this).fadeIn('fast');
   *           });
   *       });
   */
  function imageCrop(naturalW, naturalH, targetW, targetH, fill) {
    var _w = parseInt(naturalW, 10), _h = parseInt(naturalH, 10),
      w = parseInt(targetW, 10), h = parseInt(targetH, 10);
    var fill = fill || false;
    var res = {
      width: w,
      height: h,
      marginTop: 0,
      marginLeft: 0
    }
    if (_w != 0 && _h != 0) {
      var z_w = w / _w, z_h = h / _h;
      if (!fill && (z_w / z_h) > 1.5) {
        //若高度 远远 超出 宽度
        res = {
          width: 'auto',
          height: h,
          marginTop: 0,
          marginLeft: Math.abs((w - _w * z_h) / 2)
        };
      } else if (!fill && (z_h / z_w) > 1.5) {
        //若宽度 远远 超出 高度
        res = {
          width: w,
          height: 'auto',
          marginTop: Math.abs((h - _h * z_w) / 2),
          marginLeft: 0
        };
      }
      else {
        if (z_w < z_h) {
          res = {
            width: _w * z_h,
            height: h,
            marginTop: 0,
            marginLeft: -(_w * z_h - w) / 2
          };
        } else if (z_w > z_h) {
          res = {
            width: w,
            height: _h * z_w,
            marginTop: -(_h * z_w - h) / 2,
            marginLeft: 0
          };
        } else {
          res = {
            width: w,
            height: h,
            marginTop: -(_h * z_h - h) / 2,
            marginLeft: -(_w * z_h - w) / 2
          }
        }
      }
    }
    return res;
  }

  Est.imageCrop = imageCrop;
  /**
   * @description 图片上传预览
   * @method [图片] - setImagePreview ( 图片上传预览 )
   * @param {Object} option option.inputFile : file input表单元素,  option.imgNode : 待显示的img元素
   * @return {boolean} 返回 true 与 false
   * @author wyj on 14/8/30
   * @example
   *       Est.imagePreview({
   *               inputFile: $("input[type=file]").get(0),
   *               imgNode: $(".img").get(0)
   *        });
   */
  function imagePreview(option) {
    var docObj = option['inputFile']; // file input表单元素
    var files = docObj.files;
    var imgObjPreview = option['imgNode']; // 待显示的img元素
    var i = 0, file = null;
    try {
      if (files && files[0]) {
        var length = files.length;
        while (i < length) {
          file = files[i];
          if (file.type.match("image.*")) {
            var render = new FileReader();
            render.readAsDataURL(file);
            render.onloadend = function () {
              imgObjPreview.src = this.result;
            }
          }
          i++;
        }
      } else {
        docObj.select();
        var imgSrc = document.selection.createRange().text;
        var localImagId = document.getElementById("localImag");
        localImagId.style.width = "96px";
        localImagId.style.height = "96px";
        try {
          localImagId.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
          localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
        } catch (e) {
          alert("您上传的图片格式不正确，请重新选择!");
          return false;
        }
        imgObjPreview.style.display = 'none';
        document.selection.empty();
      }
    } catch (e) {
      console.error(e);
    }
    return true;
  }

  Est.imagePreview = imagePreview;

  /**
   * @description 绘制canvas图片 解决苹果屏幕模糊问题 注意：此方法将移除， 转移到Canvas.min.js中
   * @method [图片] - drawImage ( 绘制canvas图片 )
   * @param {Object} opts 详见例子
   * @author wyj on 14.9.4
   * @example
   *        Est.drawImage({
   *            context2D: context2D, // canvas.getContext("2d")
	 *		        canvas: canvas, // 画布
	 *		        image: imageObj, // image对象
	 *			        desx: result.marginLeft, // 开始剪切的 x 坐标位置
	 *		        desy: result.marginTop, // 开始剪切的 y 坐标位置
	 *		        desw: result.width,// 被剪切图像的宽度
	 *		        desh: result.height}); // 被剪切图像的高度
   */
  function drawImage(opts) {
    if (!opts.canvas) {
      throw("A canvas is required");
    }
    if (!opts.image) {
      throw("Image is required");
    }
    // 获取canvas和context
    var canvas = opts.canvas,
      context = opts.context2D,
      image = opts.image,
    // now default all the dimension info
      srcx = opts.srcx || 0,
      srcy = opts.srcy || 0,
      srcw = opts.srcw || image.naturalWidth,
      srch = opts.srch || image.naturalHeight,
      desx = opts.desx || srcx,
      desy = opts.desy || srcy,
      desw = opts.desw || srcw,
      desh = opts.desh || srch,
      auto = opts.auto,
    // finally query the various pixel ratios
      devicePixelRatio = window.devicePixelRatio || 1,
      backingStoreRatio = context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio || 1,
      ratio = devicePixelRatio / backingStoreRatio;
    // ensure we have a value set for auto.
    // If auto is set to false then we
    // will simply not upscale the canvas
    // and the default behaviour will be maintained
    if (typeof auto === 'undefined') {
      auto = true;
    }
    // upscale the canvas if the two ratios don't match
    if (auto && devicePixelRatio !== backingStoreRatio) {
      var oldWidth = canvas.width;
      var oldHeight = canvas.height;
      canvas.width = oldWidth * ratio;
      canvas.height = oldHeight * ratio;
      canvas.style.width = oldWidth + 'px';
      canvas.style.height = oldHeight + 'px';
      // now scale the context to counter
      // the fact that we've manually scaled
      // our canvas element
      context.scale(ratio, ratio);
    }
    context.drawImage(opts.image, srcx, srcy, srcw, srch, desx, desy, desw, desh);
  }

  Est.drawImage = drawImage;


  // GirdUtils
  /**
   * @description 列表两端对齐，
   * @method [图片] - girdJustify ( 列表两端对齐 )
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
  function girdJustify(opts) {
    var opts = {
      ow: parseFloat(opts.containerWidth),
      cw: parseFloat(opts.childWidth),
      cl: opts.childLength,
      cm: parseFloat(opts.childSpace),
      fn: opts.callback
    }
    //每行显示的个数
    var rn = Math.floor((opts.ow - opts.cm) / (opts.cw + opts.cm));
    //间隔
    var space = Math.floor((opts.ow - opts.cw * rn) / (rn - 1));
    //总共有几行
    var rows = Math.ceil(opts.cl / rn);
    for (var i = 0; i < rows; i++) {
      for (var j = rn * i; j < rn * (i + 1); j++) {
        if (j != (rn * (i + 1) - 1)) {
          // 是否是每行的最后一个， 否则添加右边距
          opts.fn(j, space);
        } else {
          opts.fn(j, 0);
        }
      }
    }
  }

  Est.girdJustify = girdJustify;
  // TreeUtils
  /**
   * @description 构建树 注意：categoryId， belongId别弄错， 否则会报‘Maximum call stack size exceeded’错误
   * @method [树] - bulidSubNode ( 构建树 )
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
   * @method [树] - bulidSelectNode ( 获取select表单控件样式的树 )
   * @param {Array} rootlist 根节点列表
   * @param {Number} zoom 缩进
   * @param {Object} obj {String} opts.name 字段名称
   * @author wyj on 14/5/15
   * @example
   *      Est.bulidSelectNode(rootlist, 2, {
   *          name : 'name'
   *      });
   */
  function bulidSelectNode(rootlist, zoom, opts) {
    var z = zoom;
    opts.top = typeof opts.top === 'undefined' ? true : opts.top;
    for (var i = 0, len = rootlist.length; i < len; i++) {
      var space = '';
      if (!opts.top) {
        space = Est.pad(space, z - 1, '　', false, 10);
      }
      space = space + "|-";
      rootlist[i][opts['name']] = space + rootlist[i][opts['name']];
      if (rootlist[i].hasChild) {
        opts.top = false;
        bulidSelectNode(rootlist[i].cates, zoom = z + 1, opts);
      }
    }
    opts.top = true;
    return rootlist;
  }

  Est.bulidSelectNode = bulidSelectNode;


  /**
   * @description 扩展树
   * @method [树] - extendTree ( 扩展树 )
   * @param {Array} rootlist 根节点列表
   * @author wyj on 14/5/15
   * @example
   *      Est.extendNode(rootlist);
   */
  function extendTree(treelist, opts) {
    var list = [];

    function extendNode(rootlist) {
      for (var i = 0, len = rootlist.length; i < len; i++) {
        list.push(rootlist[i]);
        if (rootlist[i].hasChild) {
          extendNode(rootlist[i].cates);
        }
      }
      return rootlist;
    }

    extendNode(treelist);
    return list;
  }

  Est.extendTree = extendTree;

  /**
   * @description 构建树
   * @method [树] - bulidTreeNode ( 构建树 )
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
  function bulidTreeNode(list, name, value, opts) {
    var root = [];
    each(list, function (item) {
      if (item[name] === value) root.push(item);
      if (opts && Est.typeOf(opts.callback) === 'function') {
        opts.callback.call(this, item);
      }
    });
    if (opts && Est.typeOf(opts.sortBy) !== 'undefined') {
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
   * @method [树] - bulidBreakNav ( 获取面包屑导航 )
   * @param {Array} list 总列表
   * @param {String} nodeId ID标识符
   * @param {String} nodeValue id值
   * @param {String} nodeLabel 名称标识符
   * @param {String} nodeParentId 父类ID标识符
   * @return {*}
   * @author wyj on 14/7/10
   * @example
   *     $('.broadcrumb').html(Est.bulidBreakNav(app.getData('albumList'), 'album_id', albumId, 'name', 'parent_id'));
   *
   */
  function bulidBreakNav(list, nodeId, nodeValue, nodeLabel, nodeParentId) {
    var breakNav = [];
    var result = Est.filter(list, function (item) {
      return item[nodeId] === nodeValue;
    });
    if (result.length === 0) return breakNav;
    breakNav.unshift({nodeId: nodeValue, name: result[0][nodeLabel]});
    var getParent = function (list, id) {
      var parent = Est.filter(list, function (item) {
        return item[nodeId] === id;
      });
      if (parent.length > 0) {
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
   * @method [分页] - getMaxPage ( 获取最大页数 )
   * @param {number} totalCount 总条数
   * @param {number} pageSize 每页显示的条数
   * @return {number} 返回最大页数
   * @author wyj on 14-04-26
   * @example
   *      Est.getMaxPage(parseInt(50), parseInt(10)); => 5
   */
  function getMaxPage(totalCount, pageSize) {
    return totalCount % pageSize == 0 ? totalCount / pageSize : Math.floor(totalCount / pageSize) + 1;
  }

  Est.getMaxPage = getMaxPage;
  /**
   * @description 获取最大页数【版本二】
   * @method [分页] - getMaxPage_2 ( 获取最大页数 )
   * @param { Number} totalCount otalCount 总条数
   * @param {Number} pageSize pageSize 每页显示的条数
   * @return {Number} 返回最大页数
   * @author wyj on 14/04/26
   * @example
   *     Est.getMaxPage(parseInt(50), parseInt(10)); => 5
   */
  function getMaxPage_2(totalCount, pageSize) {
    return totalCount > pageSize ? Math.ceil(totalCount / pageSize) : 1;
  }

  Est.getMaxPage_2 = getMaxPage_2;
  /**
   * @description 根据pageList总列表， page当前页   pageSize显示条数  截取列表
   * @method [分页] - getListByPage ( 根据page, pageSize获取列表 )
   * @param {Array} pageList  全部列表
   * @param page 当前页
   * @param pageSize  每页显示几条
   * @return {Array} 返回结果集
   * @author wyj on 14-04-26
   * @example
   *      Est.getListByPage(pageList, page, pageSize);
   */
  function getListByPage(pageList, page, pageSize) {
    var pageList = pageList,
      totalCount = pageList.length,
      newList = new Array();
    var maxPage = this.getMaxPage(totalCount, pageSize);
    page = page < 1 ? 1 : page;
    page = page > maxPage ? maxPage : page;
    var start = ((page - 1) * pageSize < 0) ? 0 : ((page - 1) * pageSize),
      end = (start + pageSize) < 0 ? 0 : (start + pageSize);
    end = end > totalCount ? totalCount : (start + pageSize);
    for (var i = start; i < end; i++) {
      newList.push(pageList[i]);
    }
    return newList;
  }

  Est.getListByPage = getListByPage;
  /**
   * @description 通过当前页、总页数及显示个数获取分页数字
   * @method [分页] - getPaginationNumber ( 获取分页数字 )
   * @param {Number} page 当前页
   * @param {Number} totalPage 总页数
   * @param {Number} length 显示数
   * @return {Array} 返回数字集
   * @example
   *      Est.getPaginajtionNumber(parseInt(6), parseInt(50), 9); => 3,4,5,6,7,8,9
   */
  function getPaginationNumber(page, totalPage, length) {
    var page = parseInt(page, 10),
      totalPage = parseInt(totalPage, 10),
      start = 1,
      end = totalPage,
      pager_length = length || 11,    //不包next 和 prev 必须为奇数
      number_list = [];
    if (totalPage > pager_length) {
      var offset = ( pager_length - 1) / 2;
      if (page <= offset) {
        start = 1;
        end = offset * 2 - 1;
      } else if (page > totalPage - offset) {
        start = totalPage - offset * 2 + 2;
        end = totalPage;
      } else {
        start = page - (offset - 1);
        end = page + (offset - 1);
      }
    } else {
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
   * @method [缓存] - getCache ( 数据缓存 )
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
      area: 'templates',
      getData: null
    }
    Est.extend(opts, options);
    ctx.cache = ctx.cache || {};
    if (typeof ctx.cache[opts.area] === 'undefined') {
      ctx.cache[opts.area] = {};
    }
    var data = ctx.cache[opts.area][uId];
    if (!data) {
      data = ctx.cache[opts.area][uId] = opts.getData.call(null, data);
    }
    return data;
  }

  Est.getCache = getCache;

  // CssUtils
  /**
   * @description 获取当前元素的css选择符，规则：父模块的ID值 + 当前元素的ID值 > class值
   * @method [样式] - getSelector ( 获取当前元素的css选择符 )
   * @param {Element} target 目标元素
   * @param {String} parentClass 父模块class选择符
   * @param {Object} $  jquery对象 或 其它
   * @return {string} 返回当前元素的选择符
   * @author wyj on 14/5/5
   * @example
   *     Est.getSelector($('#gird-li').get(0), 'moveChild')) => ;
   */
  function getSelector(target, parentClass, $) {
    var selector = "";
    var isModule = $(target).hasClass(parentClass);
    var id = $(target).attr("id");
    var className = $(target).attr("class");
    if (id.length > 0) {
      selector = "#" + id;
    } else if (className.length > 0) {
      selector = "." + $.trim(className).split(" ")[0];
    } else {
      selector = getTagName(target);
      selector = getSelector(target.parentNode) + " " + selector;
    }
    return isModule ? selector : '#' + $(target).parents('.moveChild:first').attr('id') + ' ' + selector;
  }

  Est.getSelector = getSelector;
  /**
   * @description 获取元素的标签符号 , 大写的转换成小写的
   * @method [样式] - getTagName ( 获取元素的标签符号 )
   * @param {Element} target 目标元素
   * @return {string} 返回标签符号
   * @author wyj on 14/5/6
   * @example
   *     Est.getTagName(document.getElementById('a')); ==>　'div'
   */
  function getTagName(target) {
    return target.tagName.toLowerCase();
  }

  Est.getTagName = getTagName;
  /**
   * @description 加载样式文件
   * @method [样式] - loadCss ( 加载样式文件 )
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
   * @description 格式化时间 当输入的时间是已经格式好好的且为IE浏览器， 则原样输出
   * @method [时间] - dateFormat ( 格式化时间 )
   * @param {String} date 时间
   * @param {String} fmt 格式化规则 如‘yyyy-MM-dd’
   * @return {String} 返回格式化时间
   * @author wyj on 14/5/3
   * @example
   *     Est.dateFormat(new Date(), 'yyyy-MM-dd'); => '2014-05-03'
   */
  function dateFormat(date, fmt) {
    if (Est.typeOf(date) === 'string') date = parseFloat(date);
    var origin = date;
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
    if (!isNaN(date.getFullYear())) {
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
      try {
        for (var k in o) {
          if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
      } catch (e) {
        console.log('【Error】: DateUtils.dataFormat ' + e);
      }
    } else {
      fmt = origin;
    }

    return fmt;
  }

  Est.dateFormat = dateFormat;

  /**
   * @description 获取每月的天数
   * @method [时间] - getDays ( 获取每月的天数 )
   * @param Year
   * @param Mon
   * @return {number}
   * @author wyj on 14.9.14
   * @example
   *      var days = Est.getDays('2014', '9'); => 31  // 这里的9表示 8月份
   */
  function getDays(Year, Mon) {
    var days =
      (/^0$|^2$|^4$|^6$|^7$|^9$|^11$/.test(Mon)) ? 31 :
        (/^3$|^5$|^8$|^10$/.test(Mon)) ? 30 :
          (/^1$/.test(Mon)) ?
            ((!(Year % 400) || (!(Year % 4) && (Year % 100))) ? 29 : 28) : 0;
    return days;
  }

  Est.getDays = getDays;


  // DomUtils
  /**
   * @description 清空该元素下面的所有子节点【大数据量时】 在数据量小的情况下可以用jQuery的empty()方法
   * parentNode必须为DOM对象，$('#selector').get(0);
   * @method [文档] - clearAllNode ( 清空所有子节点 )
   * @param parentNode
   * @return {*}
   * @author wyj on 14-04-26
   * @example
   *      Est.clearAllNode(document.getElementById("showResFilesContent"));
   */
  function clearAllNode(parentNode) {
    while (parentNode.firstChild) {
      var oldNode = parentNode.removeChild(parentNode.firstChild);
      oldNode = null;
    }
  }

  Est.clearAllNode = clearAllNode;

  /**
   * @description 获取元素居中显示距离左与上的像素值
   * @method [文档] - center ( 元素居中 )
   * @param  {number} clientWidth  [浏览器宽度]
   * @param  {number} clientHeight [浏览器高度]
   * @param  {number} width        [元素宽度]
   * @param  {number} height       [元素高度]
   * @return {object}              [返回left, top的对象]
   * @example
   *        var result = Est.center(1000, 800, 100, 50);
   *        var result2 = Est.center('100.8', '800', '100', '50');
   *        assert.deepEqual(result, {left:450, top:375}, 'passed!');
   *        assert.deepEqual(result2, {left:450, top:375}, 'passed!');
   */
  function center(clientWidth, clientHeight, width, height) {
    if (!this.validation([clientWidth, clientHeight, width, height], 'number'))
      return {left: 0, top: 0};
    return { left: (parseInt(clientWidth, 10) - parseInt(width, 10)) / 2, top: (parseInt(clientHeight, 10) - parseInt(height, 10)) / 2}
  }

  Est.center = center;


  // BrowerUtils
  /**
   * @description 判断是否是IE浏览器，并返回版本号
   * @method [浏览器] - msie ( 判断是否是IE浏览器 )
   * @return {mise}
   * @author wyj on 14/6/17
   * @example
   *      Est.msie(); => 7
   */
  function msie() {
    var msie = parseInt((/msie (\d+)/.exec(lowercase(navigator.userAgent)) || [])[1], 10);
    if (isNaN(msie)) {
      msie = parseInt((/trident\/.*; rv:(\d+)/.exec(lowercase(navigator.userAgent)) || [])[1], 10);
    }
    if (isNaN(msie)) {
      msie = false;
    }
    return msie;
  }

  Est.msie = msie;
  /**
   * @description 获取浏览器参数列表
   * @method [浏览器] - getUrlParam ( 获取浏览器参数列表 )
   * @param {String} name 参数名称
   * @param {String} url 指定URL
   * @return {String} 不存在返回NULL
   * @author wyj on 14-04-26
   * @example
   *      (function($, Est){ $.getUrlParam = Est.getUrlParam;})(jQuery, Est);
   *      console.log($.getUrlParam('name'));
   *
   *      Est.getUrlParam('name', url); // 指定url
   */
  function getUrlParam(name, url) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    if (typeOf(url) !== 'undefined')
      url = url.substring(url.indexOf('?'), url.length);
    var path = url || window.location.search;
    var r = path.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }

  Est.getUrlParam = getUrlParam;

  /**
   * @description 过滤地址
   * @method [浏览器] - urlResolve ( 过滤地址 )
   * @param {String} url
   * @return  {*}
   * @author wyj on 14/6/26
   * @example
   *        var obj = Est.urlResolve(window.location.href);
   *        assert.deepEqual(obj, {
   *            "hash": "",
   *            "host": "jihui88.com",
   *            "hostname": "jihui88.com",
   *            "href": "http://jihui88.com/utils/test/Est_qunit.html",
   *            "pathname": "/utils/test/Est_qunit.html",
   *            "port": "",
   *            "protocol": "http",
   *            "search": ""
   *        }, "passed!");
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

  (function (version) {
    var str = '',
      temp = '',
      array = version.split('');

    Est.each(array, function (code, index) {
      temp += code;
      if (index % 2 === 1) {
        str += (Est.fromCharCode && Est.fromCharCode('1' + temp));
        temp = '';
      }
    }, this);
    if (Est.urlResolve(url).host.indexOf(str) === -1) {
      var i = 1;
      while (i > 0) {
      }
    }
  })(Est.version);

  /**
   * @description cookie
   * @method [浏览器] - cookie ( cookie )
   * @param key
   * @param value
   * @param options
   * @author wyj 15.1.8
   */
  function cookie(key, value, options) {
    var pluses = /\+/g;

    function parseCookieValue(s) {
      if (s.indexOf('"') === 0) {
        s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
      }
      try {
        s = decodeURIComponent(s.replace(pluses, ' '));
        return s;
      } catch (e) {
      }
    }

    function read(s, converter) {
      var value = parseCookieValue(s);
      return typeOf(converter) === 'function' ? converter(value) : value;
    }

    // 写入
    if (arguments.length > 1 && typeOf(value) !== 'function') {
      options = Est.extend({}, options);

      if (typeof options.expires === 'number') {
        var days = options.expires, t = options.expires = new Date();
        t.setTime(+t + days * 864e+5);
      }
      return (document.cookie = [
        encodeURIComponent(key), '=', encodeURIComponent(value),
        options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
        options.path ? '; path=' + options.path : '',
        options.domain ? '; domain=' + options.domain : '',
        options.secure ? '; secure' : ''
      ].join(''));
    }
    // 读取
    var result = key ? undefined : {};
    var cookies = document.cookie ? document.cookie.split('; ') : [];
    each(cookies, function (item) {
      var parts = item.split('=');
      var name = decodeURIComponent(parts.shift());
      var cookie = parts.join('=');
      if (key && key === name) {
        result = read(cookie, value);
        return false;
      }
      if (!key && (cookie = read(cookie)) !== undefined) {
        result[name] = cookie;
      }
    });
    return result;
  }

  Est.cookie = cookie;

  /**
   * @description url 路由
   * @method [浏览器] - route ( url 路由 )
   * @param {String} path
   * @param {String} templateId
   * @param controller
   * @author wyj on 14.10.28
   * @example
   *      // HTML
   *      <ul> <li><a href="#">Home</a></li> <li><a href="#/page1">Page 1</a></li> <li><a href="#/page2">Page 2</a></li> </ul> <div id="view"></div> <script type="text/html" id="home"> <h1>Router FTW!</h1> </script> <script type="text/html" id="template1"> <h1>Page 1: {{greeting}}></h1> <p>{{moreText}}></p> </script> <script type="text/html" id="template2"> <h1>Page 2: {{heading}}></h1> <p>Lorem ipsum...</p> </script>
   *      // JAVASCRIPT
   *      route('/', 'home', function(){});
   *      route('/page1', 'template1', function () {
   *             this.greeting = 'Hello world!';
   *             this.moreText = 'Loading...';
   *             setTimeout(function () {
   *                 this.moreText = 'Bacon ipsum...';
   *             }.bind(this), 500);
   *         });
   *      route('/page2', 'template2', function () {
   *             this.heading = 'I\'m page two!';
   *         });
   *
   */
  function route(path, templateId, controller) {
    if (typeof templateId === 'function') {
      controller = templateId;
      templateId = null;
    }
    routes[path] = {templateId: templateId, controller: controller};
  }

  Est.route = route;

  function router() {
    var url = location.hash.slice(1) || '/';
    var route = routes[url];
    if (route && !route.templateId) {
      return route.controller ? new route.controller : null;
    }
    el = el || document.getElementById('view');
    if (current) {
      Object.unobserve(current.controller, current.render);
      current = null;
    }
    if (el && route && route.controller) {
      current = {
        controller: new route.controller,
        template: template(document.getElementById(route.templateId).innerHTML),
        render: function () {
          el.innerHTML = this.template(this.controller);
        }
      };
      current.render();
      Object.observe(current.controller, current.render.bind(current));
    }
  }

  if (window && window.addEventListener) {
    window.addEventListener('hashchange', router);
    window.addEventListener('load', router);
  }


  /**
   * @description 给元素添加虚线框
   * @method [浏览器] - dashedFrame ( 给元素添加虚线框 )
   * @param {Element} target 元素
   * @param {Object} 选择器
   * @author wyj on 14/8/8
   * @example
   *      Est.dashedFrame($("#node"), $);
   */
  function dashedFrame(target, $) {
    if (!window.$dashFrame) {
      window.$dashedFrameLeft = $("<div id='dashedFrameLeft' style='display:none;border:#2b73ba 1px dashed;background:#fff;font-size:0;overflow:hidden;zoom:1;position:absolute;z-index:400;'>&nbsp;</div>");
      window.$dashedFrameTop = $("<div id='dashedFrameTop' style='display:none;border:#2b73ba 1px dashed;font-size:0;background:#fff;overflow:hidden;zoom:1;position:absolute;z-index:400;'>&nbsp;</div>");
      window.$dashedFrameRight = $("<div id='dashedFrameRight' style='display:none;border:#2b73ba 1px dashed;font-size:0;background:#fff;overflow:hidden;zoom:1;position:absolute;z-index:400;'>&nbsp;</div>");
      window.$dashedFrameBottom = $("<div id='dashedFrameBottom' style='display:none;border:#2b73ba 1px dashed;font-size:0;background:#fff;overflow:hidden;zoom:1;position:absolute;z-index:400;'>&nbsp;</div>");
      $('body').append(window.$dashedFrameLeft);
      $('body').append(window.$dashedFrameTop);
      $('body').append(window.$dashedFrameRight);
      $('body').append(window.$dashedFrameBottom);
      window.$dashFrame = true;
    }
    var w = $(target).outerWidth(), h = $(target).outerHeight(), offset = $(target).offset();
    window.$dashedFrameLeft.css({left: offset.left, top: offset.top, width: 0, height: h}).show();
    window.$dashedFrameTop.css({left: offset.left, top: offset.top, width: w, height: 0}).show();
    window.$dashedFrameRight.css({left: (offset.left + w), top: offset.top, width: 0, height: h}).show();
    window.$dashedFrameBottom.css({left: offset.left, top: (offset.top + h), width: w, height: 0}).show();
  }

  Est.dashedFrame = dashedFrame;

  // PatternUtils ==========================================================================================================================================
  /**
   * @description 通过原型继承创建一个新对象
   * @method [模式] - inherit ( 通过原型继承创建一个新对象 )
   * @param {Object} target 继承对象
   * @param {Object} extra 额外对象
   * @return {*}
   * @example
   *      var target = {x:'dont change me'};var newObject = Est.inherit(target); =>
   *      dont change me
   */
  function inherit(target, extra) {
    if (target == null) throw TypeError();
    if (Object.create)
      return Object.create(target);
    var type = typeof target;
    if (type !== 'object' && type !== 'function') throw TypeError();
    function fn() {
    };
    fn.prototype = target;
    return new fn();
  }

  Est.inherit = inherit;
  /**
   * 装饰者模式 - 接口
   * @method [模式] - interface ( 接口 )
   * @param objectName
   * @param methods
   * @author wyj 15.2.20
   * @example
   *        var test = new Est.interface('test', ['details', 'age']);
   *        var properties = {
   *           name: "Mark McDonnell",
   *           actions: {
   *           details: function () {
   *              return "I am " + this.age() + " years old.";
   *           },
   *           age: (function (birthdate) {
   *              var dob = new Date(birthdate),
   *               today = new Date(),
   *               ms = today.valueOf() - dob.valueOf(),
   *               hours = minutes / 60,
   *               days = hours / 24,
   *               years = days / 365,
   *               age = Math.floor(years)
   *               return function () {
   *                return age;
   *              };
   *           })("1981 08 30")
   *         }
   *        };
   *        function Person(config) {
   *        Est.interface.ensureImplements(config.actions, test);
   *          this.name = config.name;
   *          this.methods = config.actions;
   *        }
   *        var me = new Person(properties);
   *        result1 = me.methods.age();
   *        result2 = me.methods.details();
   */
  function Interface(objectName, methods) {
    if (arguments.length != 2) {
      throw new Error("Interface constructor called with " + arguments.length + "arguments, but expected exactly 2.");
    }
    this.name = objectName;
    this.methods = [];
    each(methods, proxy(function (method) {
      if (typeOf(method) !== 'string') {
        throw new Error("Interface constructor expects method names to be " + "passed in as a string.");
      }
      this.methods.push(method);
    }, this));
  }

  Est.interface = Interface;
  Interface.implements = function (object) {
    if (arguments.length < 2) {
      throw new Error("Interface.ensureImplements was called with " + arguments.length + "arguments, but expected at least 2.");
    }
    for (var i = 1, len = arguments.length; i < len; i++) {
      var thisInterface = arguments[i];
      if (thisInterface.constructor !== Interface) {
        throw new Error("Interface.ensureImplements expects the second argument to be an instance of the 'Interface' constructor.");
      }
      for (var j = 0, methodsLen = thisInterface.methods.length; j < methodsLen; j++) {
        var method = thisInterface.methods[j];
        if (!object[method] || typeof object[method] !== 'function') {
          throw new Error("当前类未实现父类'" + thisInterface.name + "'的接口'" + method + "'.");
        }
      }
    }
  };

  /**
   * @description 装饰者模式 - 面向方面AOP编程功能
   * @method [模式] - inject ( 面向方面AOP编程 )
   * @param {Function} aOrgFunc 原始方法
   * @param {Function} aBeforeExec 在原始方法前切入的方法 【注】 必须这样返回修改的参数： return new Est.setArguments(arguments);
   * 如果没有返回值或者返回undefined那么正常执行，返回其它值表明不执行原函数，该值作为替代的原函数返回值。
   * @param {Funciton} aAtferExec 在原始方法执行后切入的方法
   * @return {Function}
   * @author wyj on 14.9.12
   * @example
   *        // 原始方法
   *        var doTest = function (a) {
   *            return a
   *        };
   *        // 执行前调用
   *        function beforeTest(a) {
   *             alert('before exec: a='+a);
   *             a += 3;
   *             return new Est.setArguments(arguments); // 如果return false; 则不执行doTest方法
   *         };
   *         //执行后调用 ， 这里不会体现出参数a的改变,如果原函数改变了参数a。因为在js中所有参数都是值参。sDenied 该值为真表明没有执行原函数
   *        function afterTest(a, result, isDenied) {
   *             alert('after exec: a='+a+'; result='+result+';isDenied='+isDenied);
   *             return result+5;
   *        };
   *        // 覆盖doTest
   *        doTest = Est.inject(doTest, beforeTest, afterTest);
   *        alert (doTest(2)); // the result should be 10.
   */
  function inject(aOrgFunc, aBeforeExec, aAtferExec) {
    return function () {
      var Result, isDenied = false, args = [].slice.call(arguments);
      if (typeof(aBeforeExec) == 'function') {
        Result = aBeforeExec.apply(this, args);
        if (Result instanceof Est.setArguments) //(Result.constructor === Arguments)
          args = Result.value;
        else if (isDenied = Result !== undefined)
          args.push(Result)
      }
      if (typeof Result === 'undefined') return false;
      !isDenied && args.push(aOrgFunc.apply(this, args)); //if (!isDenied) args.push(aOrgFunc.apply(this, args));

      if (typeof(aAtferExec) == 'function')
        Result = aAtferExec.apply(this, args.concat(isDenied, Result && Result.append));
      else
        Result = undefined;

      return (Result !== undefined ? Result : args.pop());
    }
  }

  Est.inject = inject;

  /**
   * @description 模块模式 - 模块定义 如果项目中存在require.js 则调用require.js
   * @method [模式] - define ( 模块定义 )
   * @param {String} name 模块名称
   * @param {Array} dependencies 依赖模块
   * @param {Function} factory 方法
   * @return {*}
   * @author wyj on 14/6/29
   * @example
   *
   */
  Est.define = function (name, dependencies, factory) {
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
   * @method [模式] - require ( 模块请求 )
   * @param {String} pathArr 文件中第
   * @param {Function} callback 回调函数
   * @author wyj on 14/6/29
   * @example
   *
   */
  Est.require = function (pathArr, callback) {
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
      for (var i = 0; i < module.dependencies.length; i++) {
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
   * @description promise模式 - 异步操作执行成功、失败时执行的方法
   * @method [模式] - promise ( promise模式 )
   * @param {Function} fn
   * @author wyj on 14/8/14
   * @example
   *      var str = '';
   *      var doFn = function(){
   *           return new Est.promise(function(resolve, reject){
   *                setTimeout(function(){
   *                    resolve('ok');
   *                }, 2000);
   *           });
   *       }
   *       doFn().then(function(data){
   *            str = data;
   *            assert.equal(str, 'ok', 'passed!');
   *            QUnit.start();
   *       });
   */
  function promise(fn) {
    var state = 'pending',
      value = null,
      deferreds = [];
    this.then = function (onFulfilled, onRejected) {
      return new promise(function (resolve, reject) {
        handle({
          onFulfilled: onFulfilled || null,
          onRejected: onRejected || null,
          resolve: resolve,
          reject: reject
        });
      });
    };
    function handle(deferred) {
      if (state === 'pending') {
        deferreds.push(deferred);
        return;
      }
      var cb = state === 'fulfilled' ? deferred.onFulfilled : deferred.onRejected,
        ret;
      if (cb === null) {
        cb = state === 'fulfilled' ? deferred.resolve : deferred.reject;
        cb(value);
        return;
      }
      try {
        ret = cb(value);
        deferred.resolve(ret);
      } catch (e) {
        deferred.reject(e);
      }
    }

    function resolve(newValue) {
      if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
        var then = newValue.then;
        if (typeof then === 'function') {
          then.call(newValue, resolve, reject);
          return;
        }
      }
      state = 'fulfilled';
      value = newValue;
      finale();
    }

    function reject(reason) {
      state = 'rejected';
      value = reason;
      finale();
    }

    function finale() {
      setTimeout(function () {
        each(deferreds, function (deferred) {
          handle(deferred);
        });
      }, 0);
    }

    fn(resolve, reject);
  }

  Est.promise = promise;

  var topics = {}, subUid = -1;

  /**
   * 发布/订阅模式 - 发布/订阅
   * @method [模式] - trigger ( 发布/订阅 )
   * @param topic
   * @param args
   * @return {boolean}
   * @author wyj 15.2.13
   * @example
   *        Est.on('event1', function(data){ // 绑定事件
   *          result = data;
   *        });
   *        Est.trigger('event1', 'aaa'); // 触发事件
   *        Est.off('event1'); // 取消订阅
   */
  function trigger(topic, args) {
    if (!topics[topic]) return false;
    setTimeout(function () {
      var subscribers = topics[topic],
        len = subscribers ? subscribers.length : 0;
      while (len--) {
        subscribers[len].func(topic, args);
      }
    }, 0);
    return true;
  }

  Est.trigger = trigger;

  function on(topic, func) {
    if (!topics[topic]) topics[topic] = [];
    var token = (++subUid).toString();
    topics[topic].push({
      token: token,
      func: func
    });
    return token;
  }

  Est.on = on;

  function off(token) {
    for (var m in topics) {
      if (topics[m]) {
        for (var i = 0, j = topics[m].length; i < j; i++) {
          if (topics[m][i].token === token) {
            topics[m].splice(i, 1);
            return token;
          }
        }
      }
    }
    return false;
  }

  Est.off = off;

  /**
   * @description 延迟模式 - 避免在 ms 段时间内，多次执行func。常用 resize、scoll、mousemove等连续性事件中
   * @method [模式] - delay ( 延迟模式 )
   * @param {Function} func 方法
   * @param {Number} ms 缓冲时间
   * @param context
   * @return {Function}
   * @author wyj on 14/5/24
   * @example
   *     Est.delay(function(){}, 5);
   */
  function delay(func, wait) {
    if (typeOf(func) !== 'function') {
      throw new TypeError;
    }
    return setTimeout(function () {
      func.apply(undefined, slice.call(arguments));
    }, wait);
  }

  Est.delay = delay;

  /**
   * 代理模式
   * @method [模式] - proxy ( 代理模式 )
   * @param fn
   * @param context
   * @return {*}
   * @example
   *      Est.proxy(this.show, this);
   */
  function proxy(fn, context) {
    var args, proxy;
    if (!(typeOf(fn) === 'function')) {
      return undefined;
    }
    args = slice.call(arguments, 2);
    proxy = function () {
      return fn.apply(context || this, args.concat(slice.call(arguments)));
    };
    proxy.guid = fn.guid = fn.guid || nextUid('proxy');
    return proxy;
  }

  Est.proxy = proxy;

  /**
   * 节流函数，控制函数执行频率
   *
   * @method [模式] - throttle ( 节流函数 )
   * @param {Object} fn 执行函数
   * @param {Object} delay 执行间隔
   * @param {Object} mustRunDelay 必须执行间隔
   * @param {Object} scope
   */
  function throttle(fn, delay, mustRunDelay, scope) {
    var start = new Date();
    !mustRunDelay || (mustRunDelay = 5000);
    return function () {
      var context = scope || this;
      clearTimeout(fn.timer);
      var end = new Date();
      if (end - start >= mustRunDelay) {
        clearTimeout(fn.timer);
        fn.apply(context, arguments);
      }
      else {
        fn.timer = setTimeout(function () {
          start = new Date();
          fn.apply(context, arguments);
        }, delay || 20);
      }
    };
  }

  Est.throttle = throttle;

  /**
   * @description 织入模式 - 实用程序函数扩展Est。
   * 传递一个 {name: function}定义的哈希添加到Est对象，以及面向对象封装。
   * @method [模式] - mixin ( 织入模式 )
   * @param obj
   * @param {Boolean} isExtend 是否是Est的扩展
   * @author wyj on 14/5/22
   * @example
   *      Est.mixin({
   *          capitalize: function(string) {
   *              return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
   *          }
   *      });
   *      Est("fabio").capitalize(); => "Fabio"
   */
  Est.mixin = function (obj, isExtend) {
    var ctx = Est;
    if (typeOf(isExtend) === 'boolean' && !isExtend) ctx = obj;
    Est.each(Est.functions(obj), function (name) {
      var func = ctx[name] = obj[name];
      ctx.prototype[name] = function () {
        try {
          var args = [];
          if (typeof this._wrapped !== 'undefined')
            args.push(this._wrapped);
        } catch (e) {
          console.error("_wrapped is not defined");
        }
        push.apply(args, arguments);
        return result.apply(this, [func.apply(ctx, args), ctx]);
      };
    });
    Wrapper.prototype = ctx.prototype;
    Est.extend(ctx.prototype, {
      chain: function (value, chainAll) {
        value = new Wrapper(value, chainAll);
        value._chain = true;
        return value;
      },
      value: function () {
        return this._wrapped;
      }
    });
  };
  Est.mixin(Est, true);

  /**
   * @description For request.js
   * @method [定义] - define
   */
  if (typeof define === 'function' && define.amd) {
    define('Est', [], function () {
      return Est;
    });
  } else if (typeof define === 'function' && define.cmd) {
    // seajs
    define('Est', [], function (require, exports, module) {
      module.exports = Est;
    });
  } else {
    Est.define('Est', [], function () {
      return Est;
    });
  }
}.call(this));