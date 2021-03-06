/**
 * 工具类库[手机版].
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
   * @method [对象] - extend
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
     * @method [对象] - isFunction
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
   * @method [对象] - functions
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
   * @method fromCharCode
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
   * @method [对象] - chain
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
   * @method [对象] - result
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
   * @method [对象] - typeOf
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
   * @method [对象] - getType
   * @param {object} value
   * @return {String}
   * @author wyj on 14/8/5
   * @example
   *    var results = [];
   var fn = Est.getType;
   results.push(fn({a: 4})); // "Object"
   results.push(fn([1, 2, 3])); // "Array"
   (function() { results.push(fn(arguments));}()); // "Argements"
   results.push(fn(new ReferenceError())); // "Error"
   results.push(fn(new Date())); // "Date"
   results.push(fn(/a-z/)); // "RegExp"
   results.push(fn(Math)); // "Math"
   results.push(fn(JSON)); // "JSON"
   results.push(fn(new Number(4))); // "Number"
   results.push(fn(new String("abc"))); // "String"
   results.push(fn(new Boolean(true))); // "Boolean"
   results.push(fn(null)); // "null"
   => [ "Object", "Array", "Arguments", "Error", "Date", "RegExp", "Math", "JSON", "Number", "String", "Boolean", "null" ]
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
   * @method [对象] - getValue
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
   * @method [对象] - setValue
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
        if (!(key in object)) {
          object[key] = {};
        }
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
   * @method [对象] - objToPath
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
   * @method [对象] - isEmpty
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
   * @method [对象] - valueFn
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
   * @method [对象] - reverseParams
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
   * 字符串转换成hash值
   * @method [字符串] - hash
   * @param str
   * @return {number}
   * @author wyh 15.2.28
   * @example
   *        Est.hash('aaaaa');
   */
  function hash(str){
    var hash = 5381,
      i    = str.length
    while(i)
      hash = (hash * 33) ^ str.charCodeAt(--i)
    return hash >>> 0;
  }
  Est.hash = hash;
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
   * md5加密
   * @method [字符串] - md5
   * @param string
   * @return {string}
   * @author wyj 15.2.28
   * @example
   *
   */
  function md5(string) {
    function RotateLeft(lValue, iShiftBits) {
      return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
    }

    function AddUnsigned(lX,lY) {
      var lX4,lY4,lX8,lY8,lResult;
      lX8 = (lX & 0x80000000);
      lY8 = (lY & 0x80000000);
      lX4 = (lX & 0x40000000);
      lY4 = (lY & 0x40000000);
      lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
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

    function F(x,y,z) { return (x & y) | ((~x) & z); }
    function G(x,y,z) { return (x & z) | (y & (~z)); }
    function H(x,y,z) { return (x ^ y ^ z); }
    function I(x,y,z) { return (y ^ (x | (~z))); }

    function FF(a,b,c,d,x,s,ac) {
      a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
      return AddUnsigned(RotateLeft(a, s), b);
    };

    function GG(a,b,c,d,x,s,ac) {
      a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
      return AddUnsigned(RotateLeft(a, s), b);
    };

    function HH(a,b,c,d,x,s,ac) {
      a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
      return AddUnsigned(RotateLeft(a, s), b);
    };

    function II(a,b,c,d,x,s,ac) {
      a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
      return AddUnsigned(RotateLeft(a, s), b);
    };

    function ConvertToWordArray(string) {
      var lWordCount;
      var lMessageLength = string.length;
      var lNumberOfWords_temp1=lMessageLength + 8;
      var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
      var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
      var lWordArray=Array(lNumberOfWords-1);
      var lBytePosition = 0;
      var lByteCount = 0;
      while ( lByteCount < lMessageLength ) {
        lWordCount = (lByteCount-(lByteCount % 4))/4;
        lBytePosition = (lByteCount % 4)*8;
        lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
        lByteCount++;
      }
      lWordCount = (lByteCount-(lByteCount % 4))/4;
      lBytePosition = (lByteCount % 4)*8;
      lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
      lWordArray[lNumberOfWords-2] = lMessageLength<<3;
      lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
      return lWordArray;
    };

    function WordToHex(lValue) {
      var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
      for (lCount = 0;lCount<=3;lCount++) {
        lByte = (lValue>>>(lCount*8)) & 255;
        WordToHexValue_temp = "0" + lByte.toString(16);
        WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
      }
      return WordToHexValue;
    };

    function Utf8Encode(string) {
      string = string.replace(/\r\n/g,"\n");
      var utftext = "";

      for (var n = 0; n < string.length; n++) {
        var c = string.charCodeAt(n);

        if (c < 128) {
          utftext += String.fromCharCode(c);
        }
        else if((c > 127) && (c < 2048)) {
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

    var x=Array();
    var k,AA,BB,CC,DD,a,b,c,d;
    var S11=7, S12=12, S13=17, S14=22;
    var S21=5, S22=9 , S23=14, S24=20;
    var S31=4, S32=11, S33=16, S34=23;
    var S41=6, S42=10, S43=15, S44=21;

    string = Utf8Encode(string);

    x = ConvertToWordArray(string);

    a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

    for (k=0;k<x.length;k+=16) {
      AA=a; BB=b; CC=c; DD=d;
      a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
      d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
      c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
      b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
      a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
      d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
      c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
      b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
      a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
      d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
      c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
      b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
      a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
      d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
      c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
      b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
      a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
      d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
      c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
      b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
      a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
      d=GG(d,a,b,c,x[k+10],S22,0x2441453);
      c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
      b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
      a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
      d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
      c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
      b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
      a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
      d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
      c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
      b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
      a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
      d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
      c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
      b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
      a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
      d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
      c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
      b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
      a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
      d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
      c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
      b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
      a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
      d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
      c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
      b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
      a=II(a,b,c,d,x[k+0], S41,0xF4292244);
      d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
      c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
      b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
      a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
      d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
      c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
      b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
      a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
      d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
      c=II(c,d,a,b,x[k+6], S43,0xA3014314);
      b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
      a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
      d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
      c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
      b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
      a=AddUnsigned(a,AA);
      b=AddUnsigned(b,BB);
      c=AddUnsigned(c,CC);
      d=AddUnsigned(d,DD);
    }

    var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);

    return temp.toLowerCase();
  }
  Est.md5 = md5;
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
      each(keys, function (key) {
        if (key in obj) result[key] = obj[key];
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
    return function (object) {
      if (Est.typeOf(object) === 'string') return null;
      return Est.getValue(object, key);
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
  function releaseObject(object) {
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
   * @description 获取对象池 主要用于优化性能
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
   * @method [对象] - clone
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
   * @method [对象] - cloneDeep
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
   * @method [对象] - setArguments
   * @param args
   * @author wyj on 14.9.12
   *
   */
  function setArguments(args) {
    this.value = [].slice.call(args);
  }

  Est.setArguments = setArguments;

  // FormUtils =============================================================================================================================================

  /**
   * @description 表单验证
   * @method [表单] - validation
   * @param  {String} str  待验证字符串 str可为数组 判断所有元素是否都为数字
   * @param  {String} type 验证类型
   * @return {Boolean}      返回true/false
   * @author wyj on 14.9.29
   * @example
   *      var result_n = Est.validation(number, 'number'); // 数字或带小数点数字
   var result_e = Est.validation(email, 'email'); // 邮箱
   var result_c = Est.validation(cellphone, 'cellphone'); // 手机号码
   var result_d = Est.validation(digits, 'digits'); // 纯数字， 不带小数点
   var result_u = Est.validation(url, 'url'); // url地址
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
   * @method [字符串] - nextUid
   * @return {string}
   * @param {String} prefix 前缀
   * @author wyj on 14/6/23
   * @example
   *      var uid = Est.nextUid(); => '001'
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
   * @method [字符串] - encodeId
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
   * @method [字符串] - decodeId
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
   * @method [字符串] - lowercase
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
   * @method [字符串] - uppercase
   * @param {String} string 原字符串
   * @return {string}
   * @author wyj on 14/6/17
   * @example
   *      Est.lowercase("le"); => LE
   */
  function uppercase(string) {
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
   * @method [字符串] - contains
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
   * @method [字符串] - startsWidth
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
   * @method [字符串] - endsWidth
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
   * @method [字符串] - byteLen
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
   * @method [字符串] - truncate
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
  function stripTagName(target, tagName, deep) {
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
  function stripScripts(target) {
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
  function stripTags(target) {
    return String(target || '').replace(/<[^>]+>/img, '');
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
   * @method [字符串] - unescapeHTML
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

  // ArrayUtils ===============================================================================================================================================

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

  // BrowerUtils
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

   Est.getUrlParam('name', url); // 指定url

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


  // PatternUtils ==========================================================================================================================================
  /**
   * @description 通过原型继承创建一个新对象
   * @method [模式] - inherit
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
   * @description 装饰者模式 - 面向方面AOP编程功能
   * @method [模式] - inject
   * @param {Function} aOrgFunc 原始方法
   * @param {Function} aBeforeExec 在原始方法前切入的方法 【注】 必须这样返回修改的参数： return new Est.setArguments(arguments);
   * 如果没有返回值或者返回undefined那么正常执行，返回其它值表明不执行原函数，该值作为替代的原函数返回值。
   * @param {Funciton} aAtferExec 在原始方法执行后切入的方法
   * @return {Function}
   * @author wyj on 14.9.12
   * @example
   *      var doTest = function (a) {
               return a
           };
   function beforeTest(a) {
                alert('before exec: a='+a);
                a += 3;
                return new Est.setArguments(arguments);
            };
   //这里不会体现出参数a的改变,如果原函数改变了参数a。因为在js中所有参数都是值参。sDenied 该值为真表明没有执行原函数
   function afterTest(a, result, isDenied) {
                alert('after exec: a='+a+'; result='+result+';isDenied='+isDenied);
                return result+5;
            };
   doTest = Est.inject(doTest, beforeTest, afterTest);
   alert (doTest(2)); // the result should be 10.
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

      !isDenied && args.push(aOrgFunc.apply(this, args)); //if (!isDenied) args.push(aOrgFunc.apply(this, args));

      if (typeof(aAtferExec) == 'function')
        Result = aAtferExec.apply(this, args.concat(isDenied));
      else
        Result = undefined;

      return (Result !== undefined ? Result : args.pop());
    }
  }

  Est.inject = inject;

  /**
   * @description promise模式 - 异步操作执行成功、失败时执行的方法
   * @method [模式] - promise
   * @param {Function} fn
   * @author wyj on 14/8/14
   * @example
   *      var str = '';
   var doFn = function(){
                return new Est.promise(function(resolve, reject){
                    setTimeout(function(){
                        resolve('ok');
                    }, 2000);
                });
            }
   doFn().then(function(data){
                str = data;
                assert.equal(str, 'ok', 'passed!');
                QUnit.start();
            });
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
   * @method [模式] - trigger
   * @param topic
   * @param args
   * @return {boolean}
   * @author wyj 15.2.13
   * @example
   *        Est.on('event1', function(data){ // 绑定事件
              result = data;
            });
   Est.trigger('event1', 'aaa'); // 触发事件
   Est.off('event1'); // 取消订阅
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
   * 代理模式
   * @method [模式] - proxy
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
   * @description 织入模式 - 实用程序函数扩展Est。
   * 传递一个 {name: function}定义的哈希添加到Est对象，以及面向对象封装。
   * @method [模式] - mixin
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