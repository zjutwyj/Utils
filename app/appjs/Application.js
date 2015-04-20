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
/** 应该程序*/
var Application = function (options) {
  this.options = options;
  this.initialize.apply(this, arguments);
};
/** 版本号 */
Application.version = '00111114';
/** 静态方法 */
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
};
Application.fromCharCode = function (code) {
  try {
    return String.fromCharCode(code);
  } catch (e) {
  }
};
Application.url = window.location.href;
/** 动态方法 */
Application.prototype = {
  initialize: function () {
    this.modules = {};
    this.status = {};
    this.templates = {};
    this.cache = {};
    this.topics = {};
    this.subUid = -1;
    this.isLazyLoad = false;
    this.lazyLoadCount = 0;
  },
  /** 模块相关 */
  addModule: function (name, val) {
    if (name in this['modules']) debug('【Module】已存在的模块：' + name);
    this['modules'][name] = val;
  },
  getModules: function () {
    return this['modules'];
  },
  /** 状态相关 */
  addStatus: function (name, value) {
    this['status'][name] = value;
  },
  getStatus: function (name) {
    return this['status'][name];
  },
  getAllStatus: function () {
    return this.status;
  },
  /** 模板相关 */
  addTemplate: function (name, fn) {
    if (name in this['templates']) debug('【Template】已存在的模板：' + name);
    this['templates'][name] = fn;
  },
  getTemplates: function () {
    return this['templates'];
  },
  /** 订阅\发布 */
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
  /** 缓存相关 */
  addCache: function (name, data) {
    this.cache[name] = data;
  },
  getCache: function (name) {
    return this.cache[name];
  },
  /** hash相关 */
  addHash: function (name) {
    localStorage['_currentHash'] = name;
    window.location.hash = name;
  },
  getCurrentHash: function () {
    var _hash = localStorage['_currentHash'];
    if (_hash && _hash.indexOf('?') !== -1) _hash = _hash.substring(0, _hash.indexOf('?'));
    return _hash;
  },
  /** 页面返回相关 */
  setBackPage: function (name) {
    localStorage['backPage'] = name;
  },
  getBackPage: function () {
    var backPage = localStorage['backPage'];
    var _back = backPage;
    if (backPage === 'false') _back = App._Stack.getBefore() ? App._Stack.getBefore()[0] : 'home';
    localStorage['backPage'] = false;
    return _back;
  },
  hasBackPage: function () {
    return localStorage['backPage'];
  },
  cleanStack: function () {
    App._Stack.destroy();
    App._CustomStack.length = 0;
  },
  /** 文档渲染 */
  render: function (options) {
    options = Application.extend({ empty: false }, options);
    var $container = $(options.render, $(options.page || 'body'));
    var view = options.handlebars.compile(options.template || $container.html());
    if (options.empty) $container.empty();
    var $node = $(view(options.data));
    if (options.callback) options.callback.call(null, $node);
    $container.append($node);
  },
  /** 获取浏览器参数 */
  getUrlParam: function (name, url) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    if (typeof url !== 'undefined') {
      if (location.href.indexOf('?') < location.href.indexOf('#/')) url = url.replace('html?', '');
      url = url.substring(url.indexOf('?'), url.length);
    }
    var path = url || window.location.search;
    var r = path.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  },
  /** 自动隐藏 */
  autoHide: function (page, options) {
    debug('【Util】App.autoHide:');
    try {
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
    } catch (e) {
      debug('【Error】' + e);
    }
  },
  /** 屏幕滚动 */
  scroll: function (scrollTo, time, page) {
    debug('【Util】App.scroll:' + scrollTo);
    try {
      var $appContent = $('.app-content', $(page));
      var scrollFrom = parseInt($appContent.scrollTop()), i = 0, runEvery = 5;
      scrollTo = parseInt(scrollTo);
      time /= runEvery;
      var interval = setInterval(function () {
        i++;
        $appContent.scrollTop((scrollTo - scrollFrom) / time * i + scrollFrom);
        if (i >= time) clearInterval(interval);
      }, runEvery);
    } catch (e) {
      debug('【Error】' + e);
    }
  },
  /** 图片延迟加载 */
  initLazyLoad: function (page) {
    var ctx = this;
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
              var Module = seajs.Module;
              var url = seajs.resolve('LazyLoad');
              try {
                delete Module.cache[url];
              } catch (e) {
                delete seajs.cache[url];
              }
              if (ctx.lazyLoadCount === 10) {
                window.location.reload();
                return;
              } else {
                ctx.lazyLoadCount++;
                setTimeout(function () {
                  App.resetLazyLoad(page)
                }, 50)
              }
              debug('【Error】: lazyload is not find !');
            }
          });
        } else {
          debug('【LazyLoad】initLazyLoad');
          $lazyList.lazyload({
            container: appContent
          });
        }
      }, 0);
    }
  },
  resetLazyLoad: function (page) {
    if ($(page).find('.lazy').size() > 0) {
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
  },
  /** 添加加载动画 */
  addLoading: function () {
    try {
      if (window.$loading) window.$loading.remove();
      window.$loading = $('<div class="loading"></div>');
      $('body').append(window.$loading);
    } catch (e) {
      debug('【Error】' + e);
    }
    return window.$loading;
  },
  getLoading: function () {
    return $('');
  },
  removeLoading: function () {
    if (window.$loading) window.$loading.remove();
    else $('.loading').remove();
  },
  /** 添加底部右侧工具栏 */
  addTool: function (page, _page) {
    try {
      if (window.$tool) window.$tool.remove();
      window.$tool = $(App.$tool.clone());
      window.$tool.css('display', 'blcok');
      window.$tool.find('.tool-reflesh').attr('data-page', _page);
      window.$tool.find('.tool-totop').off().on('click', function (e) {
        e.preventDefault();
        App.scroll(0, 100, page);
        return false;
      });
      window.$tool.find('.tool-reflesh').off().on('click', function (e) {
        e.preventDefault();
        if ($(this).attr('data-page').length > 0) {
          var _data = App._Stack.getLast();
          App._Stack.pop();
          //App.load($(this).attr('data-page').replace(/^(.+)\?.*$/g, '$1'));
          App.load(_data[0], _data[3]);
        } else {
          window.location.reload();
        }
        return false;
      });
      if (window.$tool.find('.tool-reflesh').attr('data-page') === 'home') window.$tool.find('.tool-back').remove();
      window.$tool.find('.tool-back').off().on('click', function (e) {
        e.preventDefault();
        App.back(App.getBackPage);
        return false;
      });
      $(page).append(window.$tool);
    } catch (e) {
    }
    return window.$tool;
  },
  /** 页面初始化相关 */
  initPageReady: function (App) {
    window.onhashchange = function () {
      try {
        debug('【Hash】onhashchange: ' + localStorage['_currentHash'] + ' -> ' + location.hash);
        if (localStorage['_currentHash']) {
          if (localStorage['_currentHash'] === location.hash) return;
          if (location.hash.length > 0) {
            var _page = location.hash.substring(2, location.hash.length);
            if (App._CustomStack && App._CustomStack.length > 0) {
              var item = App._CustomStack.pop();
              /*if (App._CustomStack.length > 0 && (App._CustomStack[App._CustomStack.length - 1][0] === item[0])){
               item = App._CustomStack[App._CustomStack.length - 2];
               }*/
              App.load(item[0], item[1]);
              return;
            }
            if (_page === 'undefined') App.load('home');
            var $back = $('.app-back');
            if ($back.size() > 0) {
              $back.click();
            } else {
              debug('【Hash】size stack is 0');
              App.load('home');
            }
          }
        }
      } catch (e) {
        App._Stack.destroy();
        App.load('home');
      }
    }
    App.enableDragTransition();
    try {
      if (location.hash.length > 0 && location.hash !== '#/home') {
        App._CustomStack = App._Stack.getRestoreStacks();
        if (location.href.indexOf('?') !== -1 && location.hash.indexOf('?') !== -1) {
          App.load(location.hash.substring(2, location.hash.indexOf('?')));
        }
       /* else if (location.hash.length > 0 && location.hash.indexOf('?') === -1){
          App.load(location.hash.substring(2, location.hash.length - 1));
        }*/
        else if (App._CustomStack.length === 0) {
          App.load('home');
        }
        else {
          var item = App._CustomStack.pop();
          App.load(item[0], item[1]);
        }
        //App.restore({ maxAge: 5 * 60 * 1000 });
      } else {
        App._Stack.destroy();
        App.load('home');
      }
    } catch (err) {
      App._Stack.destroy();
      App.load('home');
    }
  },
  initContent: function (page, height) {
    try {
      $(page).find('.app-content').height($(window).height() - (height || 0));
      $(page).on('appShow', function () {
        $(page).find('.app-content').height($(window).height() - (height || 0));
      });
    } catch (e) {
      debug('【Error】App.initContent' + e);
    }
  },
  initPage: function (page) {
    try {
      setTimeout(function () { // 初始化滚动
        App._Pages.fixContent(page)
      }, 0);
      setTimeout(function () { // 初始化页面
        App._Scroll.setup(page)
      }, 0);
      setTimeout(function () { // 初始化点击按钮
        App.initClick(page);
      }, 300);
      setTimeout(function () {
        var $content = $(page).find('.app-content');
        if ($content.height() > $(window).height()) {
          var $topbar = $(page).find('.app-topbar');
          App.initContent(page, $topbar.size() > 0 ? $topbar.eq(0).height() : 0);
        }
      }, 5000);
    } catch (e) {
      debug('【Error】: App.initPage' + e);
    }
  },
  getElementTop: function (element) {
    var actualTop = element.offsetTop;
    var current = element.offsetParent;
    while (current !== null && (!$(current).hasClass('app-content'))) {
      actualTop += current.offsetTop;
      current = current.offsetParent;
    }
    return actualTop;
  },
  offsetRelative: function(){
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
  },
  initInput: function (page) {
    try {
      setTimeout(function () {
        var $content = $(page).find('.app-content');
        var $input = $('input, textarea', $content);
        var $topbar = $('.app-topbar');
        var $bottom = $('.app-bottombar');
        $input.each(function () {
          $(this).off('click').on('click', function () {
            $topbar.removeClass('brand-top-auto-hide');
            $bottom.removeClass('brand-bottom-auto-show');
            //var scrollTop = App.getElementTop($(this).get(0));
            var scrollTop =  0;
            if (!$(this).offsetRelative) App.offsetRelative();
            if ($(this).offsetRelative){
              scrollTop = $(this).offsetRelative(".app-content").top;
            } else{
              scrollTop = App.getElementTop($(this).get(0));
            }
            App.scroll(scrollTop - 90, 100, page);
            console.log(scrollTop);
          });
        });
      }, 1000);
    } catch (e) {
      debug(e);
    }

  },

  /** 项目主方法 一切由此开始*/
  initLoad: function (page, options, context) {
    if (page) {
      try {
        App.addLoading(); // 添加加载动画
        if (options.page) App.addHash('#/' + options.page); // 添加HASH
        // show
        $(page).on('appForward', function () {
          setTimeout(function () {
            App.removeLoading();
          }, 500);
          options.appForward && options.appForward.call(context, page);
        });
        $(page).on('appLayout', function () {
          options.appLayout && options.appLayout.call(context, page);
        });
        $(page).on('appShow', function () {
          debug('【Init】appShow');
          debug('【Stack】Stack size: ' + App._Stack.size());
          //App.addTool(page, options.page); // 添加底部工具栏
          options.appShow && options.appShow.call(context, page);
        });
        $(page).on('appReady', function () {
          debug('【Init】appReady');
          App.removeLoading(); // 移除加载动画
          App.initPage(page); // 初始化页面
          App.addTool(page, options.page); // 添加底部工具栏
          App.initInput(page);
          App.off('queryEvent'); // 移除queryEvent订阅
          App.on('queryEvent', function (data) { // 添加queryEvent订阅
            debug('【QueryTrigger】');
            App.initPage(page); // 初始化页面
          })
          options.appReady && options.appReady.call(context, page);
        });

        /* 页面返回相关事件 */
        $(page).on('appBeforeBack', function () {
          options.appBeforeBack && options.appBeforeBack.call(context, page);
        });
        $(page).on('appBack', function () {
          options.appBack && options.appBack.call(context, page);
        });
        $(page).on('appHide', function () {
          App.removeLoading();
          options.appHide && options.appHide.call(context, page);
        });
        $(page).on('appDestroy', function () {
          App.removeLoading();
          options.appDestroy && options.appDestroy.call(context, page);
        });
        if (options && options.transition) {
          context && (context.transition = options.transition);
        }
      } catch (e) {
        debug('【Error】' + e);
      }
    }
  }
};