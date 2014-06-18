(function () {
    var root = this;
    var slice = Array.prototype.slice, push = Array.prototype.push, toString = Object.prototype.toString, hasOwnProperty = Object.prototype.hasOwnProperty, concat = Array.prototype.concat;
    var nativeIsArray = Array.isArray, nativeKeys = Object.keys, nativeBind = Object.prototype.bind;
    var whitespace = '\n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\n\
\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000';
    var Zwt = function (obj) {
        if (obj instanceof Zwt)return obj;
        if (!(this instanceof Zwt))return new Zwt(obj);
        this._wrapped = obj
    };
    Zwt.version = '1.1.0';
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = Zwt
        }
        exports.Zwt = Zwt
    } else {
        root.Zwt = Zwt
    }
    var createCallback = function (func, context, argCount) {
        if (!context)return func;
        switch (argCount == null ? 3 : argCount) {
            case 1:
                return function (value) {
                    return func.call(context, value)
                };
            case 2:
                return function (value, other) {
                    return func.call(context, value, other)
                };
            case 3:
                return function (value, index, collection) {
                    return func.call(context, value, index, collection)
                };
            case 4:
                return function (accumulator, value, index, collection) {
                    return func.call(context, accumulator, value, index, collection)
                }
        }
        return function () {
            return func.apply(this, arguments)
        }
    };

    function each(obj, callback, context) {
        var i, length, first = false, last = false;
        if (obj == null)return obj;
        callback = createCallback(callback, context);
        if (obj.length === +obj.length) {
            for (i = 0, length = obj.length; i < length; i++) {
                first = i === 0 ? true : false;
                last = i === length - 1 ? true : false;
                if (callback(obj[i], obj, i, first, last) === false)break
            }
        } else {
            var ks = keys(obj);
            for (i = 0, length = ks.length; i < length; i++) {
                first = i === 0 ? true : false;
                last = i === ks.length - 1 ? true : false;
                if (callback(obj[ks[i]], ks[i], obj, i, first, last) === false)break
            }
        }
        return obj
    };
    Zwt.each = Zwt.forEach = each;
    Zwt.extend = function (obj) {
        if (typeOf(obj) !== 'object')return obj;
        each(slice.call(arguments, 1), function (source) {
            for (var prop in source) {
                obj[prop] = source[prop]
            }
        });
        return obj
    };
    function inherit(target) {
        if (target == null)throw TypeError();
        if (Object.create)return Object.create(target);
        var type = typeof target;
        if (type !== 'object' && type !== 'function')throw TypeError();
        function fn() {
        };
        fn.prototype = target;
        return new fn()
    }

    Zwt.inherit = inherit;
    if (typeof/./ !== 'function') {
        Zwt.isFunction = function (obj) {
            return typeof obj === 'function'
        }
    }
    Zwt.functions = Zwt.methods = function (obj) {
        var names = [];
        for (var key in obj) {
            if (Zwt.isFunction(obj[key]))names.push(key)
        }
        return names.sort()
    };
    Zwt.chain = function (obj) {
        return Zwt(obj).chain()
    };
    var result = function (obj) {
        return this._chain ? Zwt(obj).chain() : obj
    };

    function typeOf(target) {
        var _type = {"undefined": "undefined", "number": "number", "boolean": "boolean", "string": "string", "[object Function]": "function", "[object RegExp]": "regexp", "[object Array]": "array", "[object Date]": "date", "[object Error]": "error"};
        return _type[typeof target] || _type[toString.call(target)] || (target ? "object" : "null")
    }

    Zwt.typeOf = typeOf;
    function hasKey(obj, key) {
        return obj != null && hasOwnProperty.call(obj, key)
    }

    Zwt.hasKey = hasKey;
    function pick(obj, callback, context) {
        var result = {}, key;
        if (typeOf(callback) === 'function') {
            for (key in obj) {
                var value = obj[key];
                if (callback.call(context, value, key, obj))result[key] = value
            }
        } else {
            var keys = concat.apply([], slice.call(arguments, 1));
            each(keys, function (key) {
                if (key in obj)result[key] = obj[key]
            })
        }
        return result
    }

    Zwt.pick = pick;
    function property(key) {
        return function (object) {
            return object[key]
        }
    }

    Zwt.property = property;
    function adapter(obj, context, argCount) {
        if (obj == null) {
            return function (obj) {
                return obj
            }
        }
        if (typeOf(obj) === 'function')return createCallback(obj, context, argCount);
        return property(obj)
    }

    Zwt.adapter = adapter;
    function delay(func, wait) {
        if (typeOf(func) !== 'function') {
            throw new TypeError
        }
        return setTimeout(function () {
            func.apply(undefined, slice.call(arguments))
        }, wait)
    }

    Zwt.delay = delay;
    function lowercase(string) {
        return typeOf(string) === 'string' ? string.toLowerCase() : string
    }

    Zwt.lowercase = lowercase;
    function uppercase(string) {
        return typeOf(string) === 'string' ? string.toUpperCase() : string
    }

    Zwt.uppercase = uppercase;
    function repeat(target, n) {
        var s = target, total = '';
        while (n > 0) {
            if (n % 2 == 1) {
                total += s
            }
            if (n == 1) {
                break
            }
            s += s;
            n = n >> 1
        }
        return total
    }

    Zwt.repeat = repeat;
    function contains(target, str, separator) {
        return separator ? (separator + target + separator).indexOf(separator + str + separator) > -1 : target.indexOf(str) > -1
    }

    Zwt.contains = contains;
    function startsWith(target, str, ignorecase) {
        var start_str = target.substr(0, str.length);
        return ignorecase ? start_str.toLowerCase() === str.toLowerCase() : start_str === str
    }

    Zwt.startsWidth = startsWith;
    function endsWidth(target, str, ignorecase) {
        var end_str = target.substring(target.length - str.length);
        return ignorecase ? end_str.toLowerCase() === str.toLowerCase() : end_str === str
    }

    Zwt.endsWidth = endsWidth;
    function byteLen(target, fix) {
        fix = fix ? fix : 2;
        var str = new Array(fix + 1).join('-');
        return target.replace(/[^\x00-\xff]/g, str).length
    }

    Zwt.byteLen = byteLen;
    function truncate(target, length, truncation) {
        length = length || 30;
        truncation = truncation === void(0) ? '...' : truncation;
        return target.length > length ? (target.slice(0, length = truncation.length) + truncation) : String(target)
    }

    Zwt.truncate = truncate;
    function cutByte(str, length, truncation) {
        if (!(str + "").length || !length || +length <= 0) {
            return""
        }
        var length = +length, truncation = typeof(truncation) == 'undefined' ? "..." : truncation.toString(), endstrBl = this.byteLen(truncation);
        if (length < endstrBl) {
            truncation = "";
            endstrBl = 0
        }
        function n2(a) {
            var n = a / 2 | 0;
            return(n > 0 ? n : 1)
        }

        var lenS = length - endstrBl, _lenS = 0, _strl = 0;
        while (_strl <= lenS) {
            var _lenS1 = n2(lenS - _strl), addn = this.byteLen(str.substr(_lenS, _lenS1));
            if (addn == 0) {
                return str
            }
            _strl += addn;
            _lenS += _lenS1
        }
        if (str.length - _lenS > endstrBl || this.byteLen(str.substring(_lenS - 1)) > endstrBl) {
            return str.substr(0, _lenS - 1) + truncation
        } else {
            return str
        }
    }

    Zwt.cutByte = cutByte;
    function stripTagName(target, tagName, deep) {
        var pattern = deep ? "<" + tagName + "[^>]*>([\\S\\s]*?)<\\\/" + tagName + ">" : "<\/?" + tagName + "[^>]*>";
        return String(target || '').replace(new RegExp(pattern, 'img'), '')
    }

    Zwt.stripTagName = stripTagName;
    function stripScripts(target) {
        return String(target || '').replace(/<script[^>]*>([\S\s]*?)<\/script>/img, '')
    }

    Zwt.stripScripts = stripScripts;
    function stripTags(target) {
        return String(target || '').replace(/<[^>]+>/img, '')
    }

    Zwt.stripTags = stripTags;
    function escapeHTML(target) {
        return target.replace(/&/mg, '&amp;').replace(/</mg, '&lt;').replace(/>/mg, '&gt;').replace(/"/mg, '&quot;').replace(/'/mg, '&#39;')
    }

    Zwt.escapeHTML = escapeHTML;
    function unescapeHTML(target) {
        return target.replace(/&amp;/mg, '&').replace(/&lt;/mg, '<').replace(/&gt;/mg, '>').replace(/&quot;/mg, '"').replace(/&#([\d]+);/mg, function ($0, $1) {
            return String.fromCharCode(parseInt($1, 10))
        })
    }

    Zwt.unescapeHTML = unescapeHTML;
    function escapeRegExp(target) {
        return target.replace(/([-.*+?^${}()|[\]\/\\])/img, '\\$1')
    }

    Zwt.escapeRegExp = escapeRegExp;
    function pad(target, n, filling, right, radix, opts) {
        var str = target.toString(radix || 10), prefix = '', length = n;
        if (opts && opts.prefix) {
            length = n - opts.prefix.length;
            prefix = opts.prefix;
            if (length < 0) {
                throw new Error('n too small')
            }
        }
        filling = filling || '0';
        while (str.length < length) {
            if (!right) {
                str = filling + str
            } else {
                str += filling
            }
        }
        return prefix + str
    }

    Zwt.pad = pad;
    function format(str, object) {
        var array = Array.prototype.slice.call(arguments, 1);
        return str.replace(/\\?\#{([^{}]+)\}/gm, function (match, name) {
            if (match.charAt(0) == '\\')return match.slice(1);
            var index = Number(name);
            if (index >= 0)return array[index];
            if (object && object[name] !== void 0)return object[name];
            return''
        })
    }

    Zwt.format = format;
    function ltrim(str) {
        for (var i = 0; i < str.length; i++) {
            if (whitespace.indexOf(str.charAt(i)) === -1) {
                str = str.substring(i);
                break
            }
        }
        return whitespace.indexOf(str.charAt(0)) === -1 ? (str) : ''
    }

    Zwt.ltrim = ltrim;
    function rtrim(str) {
        for (var i = str.length - 1; i >= 0; i--) {
            if (whitespace.lastIndexOf(str.charAt(i)) === -1) {
                str = str.substring(0, i + 1);
                break
            }
        }
        return whitespace.indexOf(str.charAt(0)) === -1 ? (str) : ''
    }

    Zwt.rtrim = rtrim;
    function trim(str) {
        for (var i = 0; i < str.length; i++) {
            if (whitespace.indexOf(str.charAt(i)) === -1) {
                str = str.substring(i);
                break
            }
        }
        for (i = str.length - 1; i >= 0; i--) {
            if (whitespace.lastIndexOf(str.charAt(i)) === -1) {
                str = str.substring(0, i + 1);
                break
            }
        }
        return whitespace.indexOf(str.charAt(0)) === -1 ? (str) : ''
    }

    Zwt.trim = trim;
    function allTrim(str) {
        return str.toString().replace(/\s*/gm, '')
    }

    Zwt.allTrim = allTrim;
    function removeAt(list, index) {
        return!!list.splice(index, 1).length
    }

    Zwt.removeAt = removeAt;
    function keys(obj) {
        if (typeOf(obj) !== 'object')return[];
        if (nativeKeys)return nativeKeys(obj);
        var keys = [];
        for (var key in obj)if (hasKey(obj, key))keys.push(key);
        return keys
    }

    Zwt.keys = keys;
    function filter(collection, callback, thisArgs) {
        var result = [];
        if (!collection)return result;
        predicate = lookupIterator(predicate, context);
        each(collection, function (value, index, list) {
            if (predicate(value, index, list))results.push(value)
        });
        return result
    }

    Zwt.filter = filter;
    function arrayToObject(list, key, val) {
        var obj = {};
        each(list, function (item) {
            if (typeOf(item[key]) !== 'undefined') {
                obj[item[key]] = item[val]
            }
        });
        return obj
    }

    Zwt.arrayToObject = arrayToObject;
    function arrayFromObject(obj, name, value) {
        var list = [];
        if (typeOf(obj) !== 'object') {
            return[]
        }
        each(obj, function (val, key) {
            var object = {};
            object[name] = key;
            object[value] = val;
            list.push(object)
        });
        return list
    }

    Zwt.arrayFromObject = arrayFromObject;
    function arrayExchange(list, thisdx, targetdx, opts) {
        if (thisdx < 0 || thisdx > list.length || targetdx < 0 || targetdx > list.length) {
            throw new Error('method exchange: thisdx or targetdx is invalid !')
        }
        var thisNode = list[thisdx], nextNode = list[targetdx], temp = thisNode, thisSort = 0;
        if (opts && typeof opts.column === 'string') {
            thisSort = thisNode[opts.column];
            thisNode[opts.column] = nextNode[opts.column];
            nextNode[opts.column] = thisSort
        }
        if (opts && typeof opts.callback === 'function') {
            opts.callback.apply(null, [thisNode, nextNode])
        }
        list[thisdx] = nextNode;
        list[targetdx] = temp
    }

    Zwt.arrayExchange = arrayExchange;
    function arrayInsert(list, thisdx, targetdx, opts) {
        var tempList = [];
        if (thisdx < targetdx) {
            for (var i = thisdx; i < targetdx - 1; i++) {
                arrayExchange(list, i, i + 1, {column: opts.column})
            }
            tempList = list.slice(0).slice(thisdx, targetdx)
        } else {
            for (var i = thisdx; i > targetdx; i--) {
                arrayExchange(list, i, i - 1, {column: opts.column})
            }
            tempList = list.slice(0).slice(targetdx, thisdx + 1)
        }
        if (typeof opts.callback === 'function') {
            opts.callback.apply(null, [tempList])
        }
    }

    Zwt.arrayInsert = arrayInsert;
    function imageCrop(naturalW, naturalH, targetW, targetH) {
        var _w = parseInt(naturalW, 10), _h = parseInt(naturalH, 10), w = parseInt(targetW, 10), h = parseInt(targetH, 10);
        var res = {width: w, height: h, marginTop: 0, marginLeft: 0}
        if (_w != 0 && _h != 0) {
            var z_w = w / _w, z_h = h / _h;
            if (z_w > 1.5) {
                res = {width: 'auto', height: h, marginTop: 0, marginLeft: (h - _w) / 2}
            } else if (z_h > 1.5) {
                res = {width: w, height: 'auto', marginTop: (h - _h) / 2, marginLeft: 0}
            } else {
                if (z_w < z_h) {
                    res = {width: _w * z_h, height: h, marginTop: 0, marginLeft: -(_w * z_h - w) / 2}
                } else if (z_w > z_h) {
                    res = {width: w, height: _h * z_w, marginTop: -(_h * z_w - h) / 2, marginLeft: 0}
                } else {
                    res = {width: w, height: h, marginTop: -(_h * z_h - h) / 2, marginLeft: -(_w * z_h - w) / 2}
                }
            }
        }
        return res
    }

    Zwt.imageCrop = imageCrop;
    function girdJustify(opts) {
        var opts = {ow: parseFloat(opts.containerWidth), cw: parseFloat(opts.childWidth), cl: opts.childLength, cm: parseFloat(opts.childSpace), fn: opts.callback}
        var rn = Math.floor((opts.ow - opts.cm) / (opts.cw + opts.cm));
        var space = Math.floor((opts.ow - opts.cw * rn) / (rn - 1));
        var rows = Math.ceil(opts.cl / rn);
        for (var i = 0; i < rows; i++) {
            for (var j = rn * i; j < rn * (i + 1); j++) {
                if (j != (rn * (i + 1) - 1)) {
                    opts.fn(j, space)
                } else {
                    opts.fn(j, 0)
                }
            }
        }
    }

    Zwt.girdJustify = girdJustify;
    function bulidSubNode(rootlist, totalList, opts) {
        var options = {category_id: 'category_id', belong_id: 'belong_id', child_tag: 'cates', dxs: []}
        if (typeof(opts) != 'undefined') {
            Zwt.extend(options, opts)
        }
        if (typeof(options['dxs']) !== 'undefined') {
            for (var k = 0, len3 = options['dxs'].length; k < len3; k++) {
                totalList.splice(options['dxs'][k], 1)
            }
        }
        for (var i = 0, len = rootlist.length; i < len; i++) {
            var item = rootlist[i];
            var navlist = [];
            for (var j = 0, len1 = totalList.length; j < len1; j++) {
                var newResItem = totalList[j];
                if (item[options.category_id] == newResItem[options.belong_id]) {
                    navlist.push(newResItem)
                }
            }
            item[options.child_tag] = navlist.slice(0);
            if (navlist.length > 0) {
                item.hasChild = true;
                arguments.callee(navlist, totalList, options)
            } else {
                item.hasChild = false;
                item.cates = []
            }
        }
    }

    Zwt.bulidSubNode = bulidSubNode;
    function bulidSelectNode(rootlist, zoom, opts) {
        var z = zoom;
        for (var i = 0, len = rootlist.length; i < len; i++) {
            var space = '';
            for (var j = 0; j < z; j++) {
                space = space + '　'
            }
            space = space + "|-";
            rootlist[i][opts['name']] = space + rootlist[i][opts['name']];
            if (rootlist[i].hasChild) {
                arguments.callee(rootlist[i].cates, zoom = z + 2, opts)
            }
        }
    }

    Zwt.bulidSelectNode = bulidSelectNode;
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"), r = window.location.search.substr(1).match(reg);
        if (r != null)return unescape(r[2]);
        return null
    }

    Zwt.getUrlParam = getUrlParam;
    function getMaxPage(totalCount, pageSize) {
        return totalCount % pageSize == 0 ? totalCount / pageSize : Math.floor(totalCount / pageSize) + 1
    }

    Zwt.getMaxPage = getMaxPage;
    function getMaxPage_2(totalCount, pageSize) {
        return totalCount > pageSize ? Math.ceil(totalCount / pageSize) : 1
    }

    Zwt.getMaxPage_2 = getMaxPage_2;
    function getListByPage(pageList, page, pageSize) {
        var pageList = pageList, totalCount = pageList.length, newList = new Array();
        var maxPage = this.getMaxPage(totalCount, pageSize);
        page = page < 1 ? 1 : page;
        page = page > maxPage ? maxPage : page;
        var start = ((page - 1) * pageSize < 0) ? 0 : ((page - 1) * pageSize), end = (start + pageSize) < 0 ? 0 : (start + pageSize);
        end = end > totalCount ? totalCount : (start + pageSize);
        for (var i = start; i < end; i++) {
            newList.push(pageList[i])
        }
        return newList
    }

    Zwt.getListByPage = getListByPage;
    function getPaginationNumber(page, totalPage, length) {
        var page = parseInt(page, 10), totalPage = parseInt(totalPage, 10), start = 1, end = totalPage, pager_length = length || 11, number_list = [];
        if (totalPage > pager_length) {
            var offset = (pager_length - 1) / 2;
            if (page <= offset) {
                start = 1;
                end = offset * 2 - 1
            } else if (page > totalPage - offset) {
                start = totalPage - offset * 2 + 2;
                end = totalPage
            } else {
                start = page - (offset - 1);
                end = page + (offset - 1)
            }
        }
        for (var i = start; i <= end; i++) {
            number_list.push(i)
        }
        return number_list
    }

    Zwt.getPaginationNumber = getPaginationNumber;
    function getCache(uId, ctx, options) {
        var opts = {area: 'templates', getData: null}
        Zwt.extend(opts, options);
        ctx.cache = ctx.cache || {};
        if (typeof ctx.cache[opts.area] === 'undefined') {
            ctx.cache[opts.area] = {}
        }
        var data = ctx.cache[opts.area][uId];
        if (!data) {
            data = ctx.cache[opts.area][uId] = opts.getData.call(null, data);
            console.log('【Cache】data: ' + uId + ' is cached !')
        }
        return data
    }

    Zwt.getCache = getCache;
    function getSelector(target, parentClass, $) {
        var selector = "";
        var isModule = $(target).hasClass(parentClass);
        var id = $(target).attr("id");
        var className = $(target).attr("class");
        if (id.length > 0) {
            selector = "#" + id
        } else if (className.length > 0) {
            selector = "." + $.trim(className).split(" ")[0]
        } else {
            selector = getTagName(target);
            selector = arguments.callee(target.parentNode) + " " + selector
        }
        return isModule ? selector : '#' + $(target).parents('.moveChild:first').attr('id') + ' ' + selector
    }

    Zwt.getSelector = getSelector;
    function getTagName(target) {
        return target.tagName.toLowerCase()
    }

    Zwt.getTagName = getTagName;
    function dateFormat(date, fmt) {
        var date = date ? new Date(date) : new Date();
        var o = {"M+": date.getMonth() + 1, "d+": date.getDate(), "h+": date.getHours(), "m+": date.getMinutes(), "s+": date.getSeconds(), "q+": Math.floor((date.getMonth() + 3) / 3), "S": date.getMilliseconds()};
        fmt = fmt || 'yyyy-MM-dd';
        if (/(y+)/.test(fmt))fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        try {
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(fmt))fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
            }
        } catch (e) {
            console.log('【Error】: DateUtils.dataFormat ' + e)
        }
        return fmt
    }

    Zwt.dateFormat = dateFormat;
    function clearAllNode(parentNode) {
        while (parentNode.firstChild) {
            var oldNode = parentNode.removeChild(parentNode.firstChild);
            oldNode = null
        }
    }

    Zwt.clearAllNode = clearAllNode;
    function msie() {
        var msie = parseInt((/msie (\d+)/.exec(lowercase(navigator.userAgent)) || [])[1], 10);
        if (isNaN(msie)) {
            msie = parseInt((/trident\/.*; rv:(\d+)/.exec(lowercase(navigator.userAgent)) || [])[1], 10)
        }
        if (isNaN(msie)) {
            msie = false
        }
        return msie
    }

    Zwt.msie = msie;
    Zwt.mixin = function (obj) {
        Zwt.each(Zwt.functions(obj), function (name) {
            var func = Zwt[name] = obj[name];
            Zwt.prototype[name] = function () {
                var args = [this._wrapped];
                push.apply(args, arguments);
                return result.call(this, func.apply(Zwt, args))
            }
        })
    };
    Zwt.mixin(Zwt);
    Zwt.extend(Zwt.prototype, {chain: function () {
        this._chain = true;
        return this
    }, value: function () {
        return this._wrapped
    }});
    if (typeof define === 'function' && define.amd) {
        define('Zwt', [], function () {
            return Zwt
        })
    }
}.call(this));