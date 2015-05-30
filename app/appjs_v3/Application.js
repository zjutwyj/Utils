/**
 * @description 手机后台
 * @class Application - 手机后台
 * @author yongjin<zjut_wyj@163.com> 2014/12/28
 */
/**
 * 调试
 *
 * @method [调试] - debug
 * @param str
 * @param options
 * @author wyj 14.12.24
 * @example
 *    debug('test');
 *    debug('test', {
 *      type: 'error' // 打印红色字体
 *    });
 *    debug(function(){
 *      return 'test';
 *    });
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
/**
 * Application
 *
 * @method [对象] - Application
 * @author wyj 15.4.24
 */
var Application = function (options) {
  this.options = options;
  this.initialize.apply(this, arguments);
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
};
Application.fromCharCode = function (code) {
  try {
    return String.fromCharCode(code);
  } catch (e) {
  }
};
Application.url = window.location.href;
Application.prototype = {
  initialize: function () {
    this.data = { itemActiveList: [] };
    this.modules = {};
    this.status = {};
    this.templates = {};
    this.cache = {};
    this.topics = {};
    this.subUid = -1;
    this.instance = {};
    this.controllers = {};
    this.isLazyLoad = false;
    this.lazyLoadCount = 0;
  },
  /**
   * 返回当前应用底层使用的是什么版本
   * @method [版本] - getAppType ( 获取版本 )
   * @return {string}
   * @author wyj 15.5.20
   */
  getAppType: function(){
    return 'appjs';
  },
  /**
   * 添加数据, 用于存放全局变量， 各个模块之间的数据通讯
   *
   * @method [数据] - addData ( 添加数据 )
   * @param {String} name 变量名称
   * @param data
   * @author wyj 14.12.28
   * @example
   *      app.addData('productList', productList);
   */
  addData: function (name, data) {
    if (name in this['data']) {
      console.log('数据对象重复' + name);
    }
    this['data'][name] = data;
  },
  /**
   * 获取数据
   *
   * @method [数据] - getData ( 获取数据 )
   * @param name
   * @return {*}
   * @author wyj 14.12.28
   * @example
   *        app.getData('productList');
   */
  getData: function (name) {
    return this['data'][name];
  },
  /**
   * 视图添加
   *
   * @method [视图] - addView ( 添加视图 )
   * @param name
   * @param instance
   * @return {*}
   * @example
   *      app.addView('productList', new ProductList());
   */
  addView: function (name, instance) {
    if (name in this['instance']) {
      this.removeView(name);
      //console.log('已存在该视图对象' + name + '， 请先移除该视图再创建, app.removeView("XxxView")');
    }
    this['instance'][name] = instance;
    this.setCurrentView(name);
    return this;
  },
  /**
   * 设置当前视图
   * @method [视图] - setCurrentView ( 设置当前视图 )
   * @param name
   * @example
   *      app.setCurrentView('list', new List());
   */
  setCurrentView: function (name) {
    this.currentView = name;
  },
  /**
   * 获取当前视图
   * @method [视图] - getCurrentView ( 获取当前视图 )
   * @return {*|Application.currentView}
   * @author wyj 15.1.9
   * @example
   *        app.getCurrentView('list');
   */
  getCurrentView: function () {
    return this.currentView;
  },
  /**
   * 获取视图
   *
   * @method [视图] - getView ( 获取视图 )
   * @param name
   * @return {*}
   * @author wyj 14.12.28
   * @example
   *        app.getView('productList');
   */
  getView: function (name) {
    return this['instance'][name];
  },
  /**
   * 视图移除， 移除视图绑定的事件及所有itemView的绑定事件,
   * 并移除所有在此视图创建的对话框
   *
   * @method [视图] - removeView ( 移除视图 )
   * @param name
   * @return {Application}
   * @example
   *        app.removeView('productList');
   */
  removeView: function (name) {
    var view = this.getView(name);
    try {
      if (view) {
        view._empty();
        view.stopListening();
        view.$el.off().remove();
      }
      delete this['instance'][name];
    } catch (e) {
    }
    return this;
  },
  /**
   * 添加控制器
   *
   * @method [控制器] - addController ( 添加控制器 )
   * @param name
   * @param fn
   * @author wyj 15.4.24
   * @example
   *    App.addController('address_area', function (page) {
          debug('【Controller】pageLoad: address_area');
          var ctx = this;
          App.initLoad(page, { transition: 'slideon-right', page: 'address_area', appShow: function (page) {
          }}, this);
          seajs.use(['AddressArea'], function (AddressArea) {
            App.addView('addressArea', new AddressArea(page, ctx))
         })
        });
   */
  addController: function (name, fn) {
    if (name in this['controllers']) debug('【Module】已存在的控制器：' + name);
    this['controllers'][name] = fn;
  },
  /**
   * 获取所有控制器
   *
   * @method [控制器] - getControllers （ 获取所有控制器 ）
   * @return {*}
   * @author wyj 15.4.24
   * @example
   */
  getControllers: function () {
    return this['controllers'];
  },
  /**
   * 添加模块 分拆seajs配置文件，
   * 实现每个模板都有自己的模块配置文件
   *
   * @method [模块] - addModule ( 添加模块 )
   * @param name
   * @param val
   * @author wyj 14.12.28
   * @example
   *        app.addModule('ProductList', '/modules/product/controllers/ProductList.js');
   */
  addModule: function (name, val) {
    if (name in this['modules']) debug('【Module】已存在的模块：' + name);
    this['modules'][name] = val;
  },
  /**
   * 获取所有模块
   *
   * @method [模块] - getModules ( 获取所有模块 )
   * @return {*}
   * @author wyj 14.12.28
   * @example
   *
   */
  getModules: function () {
    return this['modules'];
  },
  /**
   * 添加状态
   *
   * @method [状态] - addStatus ( 添加状态 )
   * @param name
   * @param value
   * @author wyj 15.4.24
   * @example
   *      App.addStatus('name', {});
   */
  addStatus: function (name, value) {
    this['status'][name] = value;
  },
  /**
   * 获取状态数据
   *
   * @method [状态] - getStatus ( 获取状态数据 )
   * @param name
   * @return {*}
   * @author wyj 15.4.24
   */
  getStatus: function (name) {
    return this['status'][name];
  },
  /**
   * 获取所有的状态数据
   *
   * @method [状态] - getAllStatus ( 获取所有状态数据 )
   * @return {{}|*|Application.status}
   * @author wyj 15.4.24
   * @example
   *      App.getAllStatus();
   */
  getAllStatus: function () {
    return this.status;
  },
  /**
   * 添加模板
   *
   * @method [模板] - addTemplate ( 添加模板 )
   * @param name
   * @param fn
   * @author wyj 15.4.25
   * @example
   *      App.addTemplate('template/product_detail', function(require, exports, module){
   *        module.exports = require('modules/product/views/product_detail.html');
   *      });
   */
  addTemplate: function (name, fn) {
    if (name in this['templates']) debug('【Template】已存在的模板：' + name);
    this['templates'][name] = fn;
  },
  /**
   * 获取模板
   *
   * @method [模板] - getTemplates ( 获取模板 )
   * @return {*}
   * @author wyj 15.4.24
   * @example
   *      App.getTemplates();
   */
  getTemplates: function () {
    return this['templates'];
  },
  /**
   * 注入时使用
   * @method [模式] - setArguments ( 设置参数 )
   * @param args
   * @author wyj 15.4.24
   * @example
   *
   */
  setArguments: function (args) {
    this.value = [].slice.call(args);
  },
  /**
   * 订阅\发布
   *
   * @method [模式] - trigger ( 订阅\发布 )
   * @param topic
   * @param args
   * @return {boolean}
   * @author wyj 15.4.24
   * @example
   *      // 注册
          App.on('addressDetailRender', function (name, areaModel) {
            model['areaPath'] = areaModel.areaPath;
            model['areaName'] = areaModel.areaName;
            render(model);
            App.initPage(page);
          });
          // 触发
          App.trigger('addressDetailRender', areaModel, function () {
          });
   */
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
  /**
   * 方法注入
   *
   * @method [模式] - inject ( AOP切面 )
   * @param aOrgFunc
   * @param aBeforeExec
   * @param aAtferExec
   * @return {Function}
   * @author wyj 15.4.24
   * @example
   *        App.back = App.inject(App.back, function (pageName, callback) {
              return new App.setArguments(arguments);
              }, function () {
            });
   */
  inject: function (aOrgFunc, aBeforeExec, aAtferExec) {
    return function () {
      var Result, isDenied = false, args = [].slice.call(arguments);
      if (typeof(aBeforeExec) == 'function') {
        Result = aBeforeExec.apply(this, args);
        if (Result instanceof App.setArguments) //(Result.constructor === Arguments)
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
  },
  /**
   * 添加缓存数据
   *
   * @method [缓存] - addCache ( 添加缓存数据 )
   * @param name
   * @param data
   * @author wyj 15.4.24
   * @example
   *    App.addCache('productList', []);
   */
  addCache: function (name, data) {
    this.cache[name] = data;
  },
  /**
   * 获取缓存数据
   *
   * @method [缓存] - getCache ( 获取缓存数据 )
   * @param name
   * @return {*}
   * @author wyj 15.4.24
   * @example
   *    App.getCache('productList');
   */
  getCache: function (name) {
    return this.cache[name];
  },
  /** 添加浏览器hash
   *
   * @method [页面] - addHash ( 添加浏览器hash )
   * @author wyj 15.4.24
   * @example
   *    App.addHash('home');
   * */
  addHash: function (name) {
    localStorage['_currentHash'] = name;
    window.location.hash = name;
  },
  /**
   * 获取当前浏览器hash值
   *
   * @method [页面] - getCurrentHansh ( 获取当前浏览器hash值 )
   * @return {*}
   * @author wyj 15.4.24
   * @example
   *      App.getCurrentHash(); => 'home'
   */
  getCurrentHash: function () {
    var _hash = localStorage['_currentHash'];
    if (_hash && _hash.indexOf('?') !== -1) _hash = _hash.substring(0, _hash.indexOf('?'));
    return _hash;
  },
  /**
   * 设置返回页面
   * @method [页面] - setBackPage ( 设置返回页面 )
   * @author wyj 15.4.24
   * @example
   *    App.setBackPage('home');
   * */
  setBackPage: function (name) {
    localStorage['backPage'] = name;
  },
  /**
   * 获取返回页面
   *
   * @method [页面] - getBackPage ( 获取返回页面 )
   * @return {*}
   * @author wyj 15.4.24
   * @example
   *    App.getBackPage(); => 'home'
   */
  getBackPage: function () {
    var backPage = localStorage['backPage'];
    var _back = backPage;
    if (backPage === 'false') _back = App._Stack.getBefore() ? App._Stack.getBefore()[0] : 'home';
    localStorage['backPage'] = false;
    return _back;
  },
  /**
   * 判断是否存在返回页面
   *
   * @method [页面] - hasBackPage ( 判断是否存在返回页面)
   * @author wyj 15.4.24
   * @example
   *      App.hasBackPage(); => true/flase
   * */
  hasBackPage: function () {
    return localStorage['backPage'];
  },
  /**
   * 清空栈, 清空所有page页面
   *
   * @method [导航] - clearStack ( 清空栈 )
   * @author wyj 15.4.24
   * @example
   *    App.clearStack();
   */
  clearStack: function () {
    App._Stack.destroy();
    if (App._CustomStack) {
      App._CustomStack.length = 0;
    } else {
      App._CustomStack = [];
    }
  },
  /**
   * 获取浏览器参数
   *
   * @method [参数] - getUrlParam ( 获取浏览器参数 )
   * @author wyj 15.4.24
   * @example
   *    App.getUrlParam('productId', location.href);
   */
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
  /**
   * 获取参数
   *
   * @method [参数] - getParams ( 获取参数 )
   * @param url
   * @return {{}}
   * @author wyj 15.4.24
   * @example
   *      App.getParams(window.location.href);
   *
   */
  getParams: function (url) {
    var params = {},
      tmp = [];
    if (typeof url !== 'undefined') {
      if (location.href.indexOf('?') < location.href.indexOf('#/')) url = url.replace('html?', '');// fix微信
      url = url.substring(url.indexOf('?'), url.length);
    }
    url.substr(1).split("&").forEach(function (item) {
      tmp = item.split("=");
      params[tmp[0]] = decodeURIComponent(tmp[1])
    });
    return params;
  },
  /**
   * 设置参数
   *
   * @method [参数] - setParams ( 设置参数 )
   * @param url
   * @author wyj 15.4.24
   * @example
   *    App.setParams(window.location.href);
   */
  setParams: function (url) {
    App.params = App.getParams(url);
    localStorage['__APPJS_PARAMS__'] = JSON.stringify(App.params);
  },
  /**
   * 自动隐藏
   *
   * @method [隐藏] - autoHide ( 自动隐藏 )
   * @author wyj 15.4.24
   * @example
   *      var $appLogo = $('#app-index-logo', $(page));
   App.autoHide(page, {
            show: function (scrollTop) { // 当页面移动顶部时
              $appLogo.removeClass('index-logo-hide');
            },
            hide: function (scrollTop) { // 当页面向下移动时
              $appLogo.addClass('index-logo-hide');
            }
        });
   */
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
  /**
   * 屏幕滚动到某处, 比如回到顶部按钮， 点击输入框
   *
   * @method [滚动] - scroll ( 屏幕滚动到某处 )
   * @author wyj 15.4.24
   * @example
   *    App.scroll(50, 5, page); // 50表示距离顶部多少， 5表示时间
   */
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
  /**
   * 图片延迟加载
   *
   * @method [加载] - initLazyLoad ( 图片延迟加载 )
   * @author wyj 15.4.24
   * @example
   *       // html
   <div id="merchants-show" class="app-lazyload">  // 这里必需加app-lazyload 且为滚动页面那个div
   <img class="lazy" data-original="{{CONST 'PIC_URL'}}{{brand_path}}" src="images/bottom-logo.png" alt="" width="284" height="347"/>
   </div>
   // js
   App.initLazyLoad(page);

   //TODO 刷新lazyload
   App.resetLazyLoad('#merchants-show', page);
   */
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
  /**
   * 重置延迟加载
   *
   * @method [加载] - resetLazyLoad ( 重置延迟加载 )
   * @param page
   * @author wyj 15.4.24
   * @example
   *        App.resetLazyLoad(page);
   */
  resetLazyLoad: function (page) {
    if ($(page).find('.lazy').size() > 0) {
      debug('【LazyLoad】resetLazyLoad');
      App.disableLazyLoad();
      App.initLazyLoad(page);
    }
  },
  /**
   * 使延迟加载失效
   *
   * @method [加载] - disableLazyLoad ( 使延迟加载失效 )
   * @author wyj 15.4.24
   * @example
   *    App.disableLazyLoad();
   */
  disableLazyLoad: function () {
    this.isLazyLoad = false;
  },
  /**
   * 判断是否正处在延迟加载中
   *
   * @method [加载] - isLazyLoad ( 判断是否正处在延迟加载中 )
   * @return {isLazyLoad}
   * @author wyj 15.4.24
   * @example
   *    App.isLazyLoad();
   */
  isLazyLoad: function () {
    return this.isLazyLoad;
  },
  /**
   * 添加加载动画
   *
   * @method [加载] - addLoading ( 添加加载动画 )
   * @author wyj 15.4.24
   * @example
   *      App.addLoading();
   */
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
  /**
   * 获取加载动画元素
   *
   * @method [加载] - getLoading ( 获取加载动画元素 )
   * @author wyj 15.4.24
   * @example
   *      App.getLoading();
   */
  getLoading: function () {
    return $('');
  },
  /**
   * 移除加载动画
   *
   * @method [加载] - removeLoading ( 移除加载动画 )
   * @author wyj 15.4.24
   * @example
   *      App.removeLoading();
   */
  removeLoading: function () {
    if (window.$loading) window.$loading.remove();
    else $('.loading').remove();
  },
  /**
   * 页面刷新
   * @method [页面] - reloadPage
   * @author wyj 15.5.28
   * @example
   *      App.reloadPage('home', page);
   */
  reloadPage: function(pageName){
    App._Stack.pop();
    App.load(pageName);
  },
  /**
   * 添加底部右侧工具栏
   *
   * @method [工具] - addTool ( 添加底部右侧工具栏 )
   * @author wyj 15.4.24
   * @example
   *    App.addTool(page, _page);
   */
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
  /**
   * 获取自定义stack, 主要用于当页面刷新时， 需要获取
   *
   * @method [导航] - getCustomPage ( 获取自定义stack )
   * @param pageName
   * @param back
   * @return {*}
   * @example
   *
   */
  getCustomPage: function (pageName, back) {
    var _has = false,
      i = App._CustomStack.length - 1;

    while (i > -1) {
      if (pageName === App._CustomStack[i][0]) {
        return App._CustomStack.splice(i, 1);
      }
      App._CustomStack.pop();
      i--;
    }
    return _has;
  },
  /**
   * 回退到进入前的页面, 并移除参数配置
   *
   * @method [导航] - goToRootPage ( 回退到进入前的页面 )
   * @author wyj 15.4.24
   * @example
   *       App.goToRootPage();
   */
  goToRootPage: function () {
    App.clearStack();
    localStorage['__APPJS_PARAMS__'] = JSON.stringify({});
    window.location.href = App.rootPage;
  },
  /**
   * 页面载入后初始化， 比如hashchange, 用户session会话， 进入前的网址记录， stacks, 参数提取
   *
   * @method [初始化] - initPageReady ( 页面载入后初始化 )
   * @author wyj 15.4.24
   * @example
   *      App.initPageReady(App);
   *
   */
  initPageReady: function (App) {
    var pageName, item;
    CONST.USER = App.getSession('__USER__');
    window.onhashchange = function () {
      try {
        debug('【Hash】onhashchange: ' + localStorage['_currentHash'] + ' -> ' + location.hash);
        var _page, item;
        //debugger
        if (localStorage['_currentHash'] && localStorage['_currentHash'] !== location.hash) {
          //if (App.pageOut) return;
          if (location.hash.length > 0) {
            _page = location.hash.substring(2, location.hash.length);
            if (App._CustomStack && App._CustomStack.length > 0) {
              item = App.getCustomPage(_page, true);
              if (item) {
                App.back(item[0][0], item[0][1]);
              } else {
                App.load(_page);
              }
              return;
            }
            if (_page === 'undefined') App.load('home');
            if (App._CustomStack.length === 0) {
              App.load(_page);
            } else {
              App.back();
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
      //debugger
      //记录进入前的页面网址
      App.rootPage = document.referrer;
      App.params = JSON.parse(localStorage['__APPJS_PARAMS__'] || '{}');
      if (location.hash.length > 0 && location.hash !== '#/home') {
        App._CustomStack = App.getRestoreStacks();
        pageName = location.hash.substring(2, location.hash.length);
        //如果带参数时
        if (location.href.indexOf('?') !== -1 && location.hash.indexOf('?') !== -1) {
          App.setParams(location.hash);
          App.load(location.hash.substring(2, location.hash.indexOf('?')));
        }
        else if (App._CustomStack && App._CustomStack.length > 0) {
          //存在CustomStack且有记录时
          item = App.getCustomPage(pageName);
          if (item) {
            App.load(item[0][0], item[0][1]);
          } else {
            App.load(pageName);
          }
        }
        else {
          App.load(pageName);
        }
      } else {
        App.load('home');
      }
    } catch (err) {
      App.load('home');
    }
  },
  /**
   * 初始化app-content容器, 当页面变长时， 需调用此方法
   *
   * @method [初始化] - initContent ( 初始化app-content容器 )
   * @param page
   * @param height
   * @author wyj 15.4.24
   * @example
   *      App.initContent(page, $topbar.size() > 0 ? $topbar.eq(0).height() : 0);
   */
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
  /**
   * 初始化事件， 形如backbone的  events: {} , 统一管理， 便于维护
   *
   * @method [初始化] - initEvents ( 初始化事件 )
   * @param page
   * @param events
   * @author wyj 15.4.24
   * @example
   *      App.initEvents(page, {
             'click .cart-clear': function () {

             }
          });
   */
  initEvents: function (page, events) {
    Application.each(events, function (fn, key) {
      var names = key.split(/\s+/);
      $(names[1], page).on(names[0], function () {
        fn && fn.apply(this, arguments);
      });
    })
  },
  /**
   * 初始化页面， 比如滚动[Scrollable]、点击按钮事件[data-target="order_list"]等等操作
   * 当app-content里的内容改变时， 需初始化下页面， 使按钮、滚动等生效
   *
   * @method [初始化] - initPage ( 初始化页面 )
   * @param page
   * @author wyj 15.4.24
   * @example
   *    App.initPage();
   */
  initPage: function (page) {
    debug('【Init】initPage');
    try {
      setTimeout(function () { // 初始化滚动
        App._Pages.fixContent(page)
      }, 0);
      setTimeout(function () { // 初始化页面
        App._Scroll.setup(page)
      }, 0);
      setTimeout(function () { // 初始化点击按钮
        //alert('initClick');
        App.initClick(page);
      }, 0);
    } catch (e) {
      debug('【Error】: App.initPage' + e);
    }
  },
  /**
   * 获取元素距离顶部的距离
   *
   * @method [样式] - getElementTop ( 获取元素距离顶部的距离 )
   * @param element
   * @return {Number|number}
   * @author wyj 15.4.24
   * @example
   *      scrollTop = App.getElementTop($(this).get(0));
   *
   */
  getElementTop: function (element) {
    var actualTop = element.offsetTop;
    var current = element.offsetParent;
    while (current !== null && (!$(current).hasClass('app-content'))) {
      actualTop += current.offsetTop;
      current = current.offsetParent;
    }
    return actualTop;
  },
  /**
   * 获取当前元素相对父元素的sffset值
   *
   * @method [样式] - offsetRelative ( 获取当前元素相对父元素的sffset值 )
   * @author wyj 15.4.24
   * @example
   *    App.offsetRelative(); => {top: 3, left: 5}
   */
  offsetRelative: function () {
    ;
    (function ($, undefined) {
      $.fn.offsetRelative = function (el) {
        var $el = $(el), o1 = this.offset(), o2 = $el.offset();
        o1.top -= o2.top - $el.scrollTop();
        o1.left -= o2.left - $el.scrollLeft();
        return o1;
      };
      $.fn.positionRelative = function (top) {
        return $(this).offsetRelative(top);
      };
    })(Zepto);
  },
  /**
   * 初始化表单元素 作用是当用户点击这个input框时， 这个框会滚动到顶部，
   * 解决部分iphone4s屏幕小看不到输入框的问题
   *
   * @method [表单] - initInput ( 初始化表单元素 )
   * @param page
   * @author wyj 15.4.24
   * @example
   *    App.initInput(page);
   */
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
            var scrollTop = 0;
            if (!$(this).offsetRelative) App.offsetRelative();
            if ($(this).offsetRelative) {
              scrollTop = $(this).offsetRelative(".app-content").top;
            } else {
              scrollTop = App.getElementTop($(this).get(0));
            }
            App.scroll(scrollTop - 90, 100, page);
            console.log(scrollTop);
          });
        });
      }, 0);
    } catch (e) {
      debug(e);
    }
  },
  /**
   * 添加session会话   登录成功后会添加__USER__ 用户信息会话， 获取：App.getSession('__USER__');
   *
   * @method [会话] - addSession ( 添加session会话 )
   * @param name
   * @param value
   * @return {*}
   * @author wyj 15.4.22
   * @example
   *      App.addSession('__USER__', {username: 'ggggfj'});
   */
  addSession: function (name, value) {
    localStorage[name] = value;
    return value;
  },
  /**
   * 读取session会话
   *
   * @method [会话] - getSession ( 读取session会话 )
   * @param name
   * @return {Object}
   * @example
   *      App.getSession('__USER__'); => {username: 'ggggfj'}
   */
  getSession: function (name) {
    return localStorage[name];
  },
  /**
   * 判断是否已经登录, 只要需要请求运程数据时都会触发此方法， 若未登录则跳转到登录页面, 可手动触发
   *
   * @method [会话] - checkLogin ( 判断是否已经登录 )
   * @return {boolean}
   * @example
   *      App.checkLogin(); => true/false
   */
  checkLogin: function () {
    //return true;
    if (!App.isLogin) {
      //查询是否已经登录
      $.ajax({
        type: 'get',
        url: CONST.API + '/shop/member/info',
        cache: true,
        async: false,
        success: function (result) {
          if (result && result.success && result.attributes) {
            App.isLogin = true;
            CONST.USER = App.addSession('__USER__', result.attributes.data);
          } else {
            App.isLogin = false;
          }
        }
      });
      if (!App.isLogin && location.hash !== '#/login') {
        App.load('login');
      } else {
        return true;
      }
    }
    return true;
  },
  /**
   * 计算hash值
   * @method [哈唏] - hash ( 计算hash值 )
   * @param str
   * @return {number}
   * @author wyj 15.4.24
   * @example
   *      App.hash('12345667'); => SDFEWFSFWEF
   */
  hash: function (str) {
    var hash = 5381,
      i = str.length

    while (i)
      hash = (hash * 33) ^ str.charCodeAt(--i)

    /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
     * integers. Since we want the results to be always positive, convert the
     * signed int to an unsigned by doing an unsigned bitshift. */
    return hash >>> 0;
  },
  /**
   * 查询数据 ， 查询成功后触发queryEvent事件
   *
   * @method [数据API] - query ( 查询数据 )
   * @param query
   * @param options
   * @return {*}
   * @author wyj 15.4.24
   * @example
   *    App.query('/shop/cartItem/list1', {
   *      cache: false, // 是否缓存数据 默认为false
   *      session: false, // 查询数据是否需要登录 false为开放API
   *      data: {}, // 表单参数
          success: function (result) {
            debugger
          }
         });
   *
   */
  query: function (query, options) {
    if (typeof options.session === 'undefined') {
      options.session = true;
    }
    if (options.session && !App.checkLogin()) return false;
    try {
      var params = '';
      if (options.data) {
        for (var key in options.data) {
          params += options.data[key];
        }
      }
      debug('【Query】:' + CONST.API + query + '?' + params);
      var cacheId = options.data ? ('_hash' + App.hash(query) + params) : '_hash' + App.hash(query);
      if (options.cache && App.getCache(cacheId)) {
        options.success && options.success.call(this, App.getCache(cacheId));
      } else {
        return $.ajax({
          type: 'get',
          url: CONST.API + query,
          data: options.data,
          success: function (result) {
            if (options.cache) App.addCache(cacheId, result);
            options.success && options.success.call(this, result);
            App.trigger('queryEvent', cacheId); // 触发事件
          }
        });
      }
    } catch (e) {
    }
  },
  /**
   * 表单提交
   * @method [数据API] - post ( 表单提交 )
   * @param options
   * @author wyj 15.4.24
   * @example
   *    App.post('/shop/order/detail', {
   *      baseId: 'orderId', // 表单ID标识
   *      async: false
   *    }, function () {
            $button.html(preText);
         });
   */
  post: function (url, options, callback) {
    $.ajax({
      type: 'post',
      url: CONST.API + url + (options.data[options.baseId] ? ('/' + options.data[options.baseId]) : ''),
      async: options.async || false,
      data: {
        model: JSON.stringify(options.data),
        _method: options.data[options.baseId] ? 'PUT' : 'POST'
      },
      success: function (response) {
        if (options.onAfterSave) {
          options.onAfterSave = Est.inject(options.onAfterSave, function (response) {
            return new Est.setArguments(arguments);
          }, function (response) {
          });
          options.onAfterSave.call(null, response);
        }
        callback && callback.call(null, response);
      }
    });
  },
  /**
   * 数据删除操作
   * @method [数据API] - del ( 数据删除操作 )
   * @author wyj 15.4.24
   * @example
   *    App.del('/shop/order/detail/001', function(result){
   *    });
   */
  del: function (url, fn) {
    $.ajax({
      type: 'post',
      url: CONST.API + url,
      data: { _method: 'DELETE' },
      success: function (result) {
        fn && fn.call(this, result);
      }
    });
  },
  /**
   * form包装器， 传递表单选择符
   *
   * @method [表单] - _form ( form包装器 )
   * @param {String} formSelector 选择器
   * @return {BaseDetail}
   * @author wyj on 14.11.15
   * @example
   *        App.form($node, { // $node为作用域
              url: '/shop/cartItem/edit', // 表单提交地址
              form: '.cart-content', // 表单选择符， 可为node元素
              submit: '.form-submit', // 提交按钮选择符， 可为node元素
              model: model, // 模型类 若内有id值， 则执行的是保存操作
              baseId: 'productId', // 模型类ID标识符
              onBeforeSave: function (model) {
                model.quantity = parseInt(model.quantity, 10);
              },
              onAfterSave: function (response) {
                if (response.attributes) {
                  $(page).find('.cart-handle-m-span').html(response.attributes.totalPrice);
                  $($node).find('.cart-handle-market').html('合计：' + response.attributes.subtotalPrice);
                }
              }
        });
   */
  form: function (page, options) {
    var passed = true,
      modelObj = {};

    options = options || {};
    options.formElemnet = typeof options.form === 'string' ?
      $(options.form, $(page)) : $(options.form);
    options.submitElement = typeof options.submit === 'string' ?
      $(options.submit, $(page)) : $(options.submit);

    options.submitElement.off().on('click', function () {
      var __model = options.model || {},
        $button = $(this),
        preText = $(this).html();

      passed = true; // 设置验证通过
      $("input, textarea, select", $(options.formElemnet)).each(function () {
        var val, pass, modelKey, modelList;
        if ($(this).hasClass('bui-form-field-error')) passed = false;
        var modelId = $(this).attr('id');
        if (modelId && modelId.indexOf('model') !== -1) {
          switch (this.type) {
            case 'radio':
              val = $(this).is(":checked") ? $(this).val() : pass = true;
              break;
            case 'checkbox':
              val = $(this).is(':checked') ? (Est.isEmpty($(this).attr('true-value')) ? true : $(this).attr('true-value')) :
                (Est.isEmpty($(this).attr('false-value')) ? false : $(this).attr('false-value'));
              break;
            default :
              val = $(this).val();
              break;
          }
          if (!pass) {
            modelKey = modelId.replace(/^model\d?-(.+)$/g, "$1");
            modelList = modelKey.split('.');
            if (modelList.length > 1) {
              Est.setValue(modelObj, modelKey, val);
              __model[modelList[0]] = modelObj[modelList[0]];
            } else {
              __model[modelList[0]] = val;
            }
          }
        }
      });
      if (passed) {
        if (typeof options.onBeforeSave !== 'undefined'){
          var beforeSaveResult = options.onBeforeSave.call(null, __model);
          if (typeof beforeSaveResult !== 'undefined' && !beforeSaveResult){
            return;
          }
        }

        $button.html('提交中...');
        options.data = __model;
        App.post(options.url, options, function () {
          $button.html(preText);
        });
      }
    });
  },
  /**
   * 模型类单向绑定
   *
   * @method [private] - modelBind ( 模型类单向绑定 )
   * @private
   * @author wyj 14.12.25
   * @example
   *        this.modelBind(page, {});
   */
  modelBind: function (page, model) {
    $("input, textarea, select", $(page)).each(function () {
      $(this).change(function () {
        var val, pass;
        var modelId = $(this).attr('id');
        if (modelId && modelId.indexOf('model') !== -1) {
          switch (this.type) {
            case 'radio':
              val = $(this).is(":checked") ? $(this).val() : pass = true;
              break;
            case 'checkbox':
              val = $(this).is(':checked') ? (Est.isEmpty($(this).attr('true-value')) ? true : $(this).attr('true-value')) :
                (Est.isEmpty($(this).attr('false-value')) ? false : $(this).attr('false-value'));
              break;
            default :
              val = $(this).val();
              break;
          }
          if (!pass)
            model[modelId.replace(/^model\d?-(.+)$/g, "$1")] = val;
        }
      });
    });
  },
  /**
   * 项目主方法 一切由此开始, 并记录App.rootPage // 进入前的网址
   * @method [Main] - initLoad ( 项目主方法 )
   * @param {DOM} page 作用域
   * @param {Object} options 配置参数
   * @param content 上下文
   * @author wyj 15.4.22
   * @example
   *      App.initLoad(page, { transition: 'slideon-right', page: 'order_cart', appShow: function (page) {
            console.log('order_cart: appShow');
          }, appReady: function(){
            console.log('order_cart: appReady');
          }}, this);
   */
  initLoad: function (page, options, context) {
    if (page) {
      App.pageOut = false;
      try {
        App.addLoading(); // 添加加载动画
        if (options.page) App.addHash('#/' + options.page); // 添加HASH
        //if (!App.checkLogin()) return false;
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
          //App.addTool(page, options.page); // 添加底部工具栏
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