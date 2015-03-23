/**
 * @description 应用程序管理器
 * @class Application - 应用程序管理器
 * @author yongjin<zjut_wyj@163.com> 2014/12/28
 */
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
window.debug = function (str, options) {
  var opts, msg;
  if (CONST.DEBUG_CONSOLE) {
    try {
      opts = Application.extend({ type: 'console' }, options);
      msg = typeof str == 'function' ? str() : str;
      if (msg && msg.length > 0) {
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
};
var Application = function (options) {
  this.options = options;
  this.initialize.apply(this, arguments);
};
Application.prototype = {
  initialize: function () {
    this.modules = {};
    this.status = {};
    this.templates = {};
    this.cache = {};
    this.topics = {};
    this.subUid = -1;
    this.isLazyLoad = false;
  },
  addModule: function (name, val) {
    if (name in this['modules']) {
      debug('【Module】已存在的模块：' + name);
    }
    this['modules'][name] = val;
  },
  getModules: function () {
    return this['modules'];
  },
  addStatus: function (name, value) {
    this['status'][name] = value;
  },
  getStatus: function (name) {
    return this['status'][name];
  },
  getAllStatus: function () {
    return this.status;
  },
  addTemplate: function (name, fn) {
    if (name in this['templates']) {
      debug('【Template】已存在的模板：' + name);
    }
    this['templates'][name] = fn;
  },
  getTemplates: function () {
    return this['templates'];
  },
  trigger: function (topic, args) {
    var ctx = this;
    if (!this.topics[topic]) return false;
    setTimeout(function () {
      var subscribers = ctx.topics[topic],
        len = subscribers ? subscribers.length : 0;
      while (len--) {
        subscribers[len].func(topic, args);
      }
    }, 0);
    return true;
  },
  on: function (topic, func) {
    if (!this.topics[topic]) this.topics[topic] = [];
    var token = (++this.subUid).toString();
    this.topics[topic].push({
      token: token,
      func: func
    });
    return token;
  },
  off: function (token) {
    for (var m in this.topics) {
      if (this.topics[m]) {
        for (var i = 0, j = this.topics[m].length; i < j; i++) {
          if (this.topics[m][i].token === token) {
            this.topics[m].splice(i, 1);
            return token;
          }
        }
      }
    }
    return false;
  },
  autoHide: function (page, options) {
    debug('【Util】App.autoHide:');
    var $appContent = $('.app-content', $(page));
    var isHide = false;
    $('.app-content', $(page)).get(0) &&
    $('.app-content', $(page)).get(0).addEventListener("scroll", function (event) {
      var scrollTop = $appContent.scrollTop();
      if (scrollTop > 0 && !isHide) {
        isHide = true;
        options.hide && options.hide.call(this, scrollTop);
      } else if (scrollTop === 0 && isHide) {
        isHide = false
        options.show && options.show.call(this, scrollTop);
      }
    });
  },
  scroll: function (scrollTo, time, page) {
    debug('【Util】App.scroll:' + scrollTo);
    var $appContent = $('.app-content', $(page));
    var scrollFrom = parseInt($appContent.scrollTop()),
      i = 0,
      runEvery = 5; // run every 5ms
    scrollTo = parseInt(scrollTo);
    time /= runEvery;
    var interval = setInterval(function () {
      i++;
      $appContent.scrollTop((scrollTo - scrollFrom) / time * i + scrollFrom);
      if (i >= time) {
        clearInterval(interval);
      }
    }, runEvery);
  },
  addLoading: function () {
    if (window.$loading) window.$loading.remove();
    window.$loading = $('<div class="loading"></div>');
    $('body').append(window.$loading);
    return window.$loading;
  },
  getLoading: function () {
    return $('');
  },
  removeLoading: function () {
    if (window.$loading) window.$loading.remove();
    else $('.loading').remove();
  },
  initLazyLoad: function (page) {
    if (!this.isLazyLoad) {
      this.isLazyLoad = true;
      setTimeout(function () {
        var appContent = $('.app-content', $(page));
        var $lazyList = $('.lazy', $(appContent));
        if ($lazyList.size() > 0 && !$lazyList.lazyload) {
          seajs.use(['LazyLoad'], function (lazyload) {
            try {
              seajs.require('LazyLoad');
              $lazyList.lazyload({
                container: appContent
              });
              debug('【LazyLoad】initLazyLoad');
            } catch (e) {
              debug('【Error】: lazyload is not find !');
            }
          });
        } else {
          debug('【LazyLoad】initLazyLoad');
          $lazyList.lazyload({
            container: appContent
          });
        }
      }, 100);
    }
  },
  resetLazyLoad: function (render, page) {
    if ($(render, $(page)).find('.lazy').size() > 0) {
      debug('【LazyLoad】resetLazyLoad');
      App.disableLazyLoad();
      App.initLazyLoad(page);
    }
  },
  disableLazyLoad: function () {
    this.isLazyLoad = false;
  },
  isLazyLoad: function () {
    return this.isLazyLoad;
  }
};
Application.version = '0605041705';
Application.each = function (obj, callback, context) {
  var i, length;
  if (obj == null) return obj;
  if (obj.length === +obj.length) {
    for (i = 0, length = obj.length; i < length; i++) {
      if (callback(obj[i], i, obj) === false) break;
    }
  } else {
    var ks = Object.keys(obj);
    for (i = 0, length = ks.length; i < length; i++) {
      if (callback(obj[ks[i]], ks[i], obj, i) === false) break;
    }
  }
  return obj;
};
Application.extend = function (obj) {
  if (typeof obj === 'undefined') return obj;
  Array.prototype.slice.call(arguments, 1).forEach(function (source) {
    for (var prop in source) {
      obj[prop] = source[prop];
    }
  });
  return obj;
};
Application.getValue = function (object, path) {
  var array, result;
  if (arguments.length < 2 || typeof path !== 'string') {
    console.error('参数不能少于2个， 且path为字符串');
    return;
  }
  array = path.split('.');
  function get(object, array) {
    Application.each(array, function (key) {
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
}
Application.url = window.location.href;

Application.fromCharCode = function (code) {
  try {
    return String.fromCharCode(code);
  } catch (e) {
  }
}
  /*window.addEventListener( "load", function() {
   FastClick.attach( document.body );
   }, false );*/
;
(function () {
  /**
   * Sea.js mini 2.3.0 | seajs.org/LICENSE.md
   * @method seajs
   * @private
   */
  var define;
  var require;
  (function (global, undefined) {
    /**
     * util-lang.js - The minimal language enhancement
     * @method isType
     * @private
     */
    function isType(type) {
      return function (obj) {
        return {}.toString.call(obj) == "[object " + type + "]"
      }
    }

    var isFunction = isType("Function")
    /**
     * module.js - The core of module loader
     * @method Module
     * @private
     */
    var cachedMods = {}

    function Module() {
    }

    // Execute a module
    Module.prototype.exec = function () {
      var mod = this
      // When module is executed, DO NOT execute it again. When module
      // is being executed, just return `module.exports` too, for avoiding
      // circularly calling
      if (this.execed) {
        return mod.exports
      }
      this.execed = true;

      function require(id) {
        return Module.get(id).exec()
      }

      // Exec factory
      var factory = mod.factory
      var exports = isFunction(factory) ? factory(require, mod.exports = {}, mod) : factory
      if (exports === undefined) {
        exports = mod.exports
      }
      // Reduce memory leak
      delete mod.factory
      mod.exports = exports
      return exports
    }
    // Define a module
    define = function (id, deps, factory) {
      var meta = {
        id: id,
        deps: deps,
        factory: factory
      }
      Module.save(meta)
    }
    // Save meta data to cachedMods
    Module.save = function (meta) {
      var mod = Module.get(meta.id)
      mod.id = meta.id
      mod.dependencies = meta.deps
      mod.factory = meta.factory
    }
    // Get an existed module or create a new one
    Module.get = function (id) {
      return cachedMods[id] || (cachedMods[id] = new Module())
    }
    // Public API
    require = function (id) {
      var mod = Module.get(id)
      if (!mod.execed) {
        mod.exec()
      }
      return mod.exports
    }
  })(this);
})();
