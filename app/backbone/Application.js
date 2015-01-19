/**
 * @description 应用程序管理器
 * @class Application - 应用程序管理器
 * @author yongjin<zjut_wyj@163.com> 2014/12/28
 */
var Application = function (options) {
  this.options = options;
  Est.extend(this, options);
  this.initialize.apply(this, arguments);
};
Est.extend(Application.prototype, {
  initialize: function () {
    this.data = {
      itemActiveList: []
    };
    this.instance = {};
    this.modules = {};
    this.routes = {};
    this.templates = {};
    this.panels = {};
    this.dialog = [];
    this.status = {};
    this.cookies = [];
  },
  /**
   * 添加面板
   *
   * @method [面板] - addPanel
   * @param name
   * @param options
   * @return {Application}
   * @example
   *        app.addPanel('product', new Panel());
   *        app.addPanel('product', {
   *          el: '#product-panel',
   *          template: '<div clas="product-panel-inner"></div>'
   *        }).addView('aliPay', new AlipayView({
   *          el: '.product-panel-inner',
   *          viewId: 'alipayView'
   *        }));
   */
  addPanel: function (name, panel) {
    var isObject = Est.typeOf(panel.cid) === 'string' ? false : true;
    if (isObject) {
      this.removePanel(name, panel);
      var $template = $(panel.template);
      $template.addClass('__panel_' + name);
      $(panel.el).append($template);
    }
    this.panels[name] = panel;
    return isObject ? this : panel;
  },
  panel: function (name, panel) {
    return this.addPanel(name, panel);
  },
  /**
   * 显示视图
   *
   * @method [面板] - show
   * @param view
   * @author wyj 14.12.29
   */
  show: function (view) {
    this.addView(this.currentView, view);
  },
  /**
   * 移除面板
   *
   * @method [面板] - removePanel
   * @param name
   * @author wyj 14.12.29
   */
  removePanel: function (name, panel) {
    $('.__panel_' + name, $(panel['el'])).off().remove();
    delete this.panels[name];
  },
  /**
   * 获取面板
   *
   * @method [面板] - getPanel
   * @param name
   * @return {*}
   * @author wyj 14.12.28
   * @example
   *      app.getPanelf('panel');
   */
  getPanel: function (name) {
    return this.panels[name];
  },
  /**
   * 视图添加
   *
   * @method [视图] - addView
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
  add: function (name, instance) {
    return this.addView(name, instance);
  },
  /**
   * 设置当前视图
   * @method [视图] - setCurrentView
   * @param name
   * @example
   *      app.setCurrentView('list', new List());
   */
  setCurrentView: function (name) {
    this.currentView = name;
  },
  /**
   * 获取当前视图
   * @method [视图] - getCurrentView
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
   * @method [视图] - getView
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
   * @method [视图] - removeView
   * @param name
   * @return {Application}
   * @example
   *        app.removeView('productList');
   */
  removeView: function (name) {
    var view = this.getView(name);
    if (view) {
      view._empty();
      view.stopListening();
      view.$el.off().remove();
    }
    delete this['instance'][name];
    return this;
  },
  /**
   * 添加对话框
   *
   * @method [对话框] - addDailog
   * @param dialog
   * @return {*}
   * @example
   *      app.addDialog('productDialog', dialog);
   */
  addDialog: function (dialog) {
    this.dialog.push(dialog);
    return dialog;
  },
  /**
   * 清空所有对话框, 当切换页面时移除所有对话框
   *
   * @method [对话框] - emptyDialog
   * @author wyj 14.12.28
   * @example
   *      app.emptyDialog();
   */
  emptyDialog: function () {
    Est.each(this.dialog, function (item) {
      if (item.close) {
        item.close().remove();
      }
    });
  },
  /**
   * 添加数据
   *
   * @method [数据] - addData
   * @param name
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
   * @method [数据] - getData
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
   * 添加模板 分拆seajs配置文件，
   * 实现每个模板都有自己的模块配置文件
   *
   * @method [模块] - addModule
   * @param name
   * @param val
   * @author wyj 14.12.28
   * @example
   *        app.addModule('ProductList', '/modules/product/controllers/ProductList.js');
   */
  addModule: function (name, val) {
    if (name in this['modules']) {
      console.log('已存在的模块：' + name);
    }
    this['modules'][name] = val;
  },
  /**
   * 获取所有模块
   *
   * @method [模块] - getModules
   * @return {*}
   * @author wyj 14.12.28
   * @example
   *
   */
  getModules: function () {
    return this['modules'];
  },
  /**
   * 添加路由
   *
   * @method [路由] - addRoute
   * @param name
   * @param fn
   * @author wyj 14.12.28
   * @example
   *      app.addRoute('product', function(){
   *          seajs.use(['ProductList'], function(ProductList){
   *          });
   *      });
   */
  addRoute: function (name, fn) {
    if (name in this['routes']) {
      console.log('已存在的路由:' + name);
    }
    this['routes'][name] = fn;
  },
  /**
   * 获取所有路由
   *
   * @method [路由] - getRoutes
   * @return {*}
   * @author wyj 14.12.28
   *
   */
  getRoutes: function () {
    return this['routes'];
  },
  /**
   * 添加模板, 目前无法解决seajs的实时获取问题
   *
   * @method [模板] - addTemplate
   * @param name
   * @param fn
   * @author wyj 14.12.28
   * @example
   *        app.addTemplate('template/photo_item', function (require, exports, module) {
              module.exports = require('modules/album/views/photo_item.html');
            });
   */
  addTemplate: function (name, fn) {
    if (name in this['templates']) {
      console.log('已存在的模板：' + name);
    }
    this['templates'][name] = fn;
  },
  /**
   * 获取所有模板
   *
   * @method [模板] - getTemplates
   * @return {*}
   * @author wyj 14.12.28
   * @example
   *        app.getTemplates();
   */
  getTemplates: function () {
    return this['templates'];
  },
  /**
   * 添加状态数据
   *
   * @method [状态] - addStatus
   * @param name
   * @param value
   * @author wyj 15.1.7
   */
  addStatus: function (name, value) {
    this['status'][name] = value;
  },
  /**
   * 获取状态数据
   *
   * @method [状态] - getStatus
   * @param name
   * @param value
   * @author wyj 15.1.7
   */
  getStatus: function (name) {
    return this['status'][name];
  },
  /**
   * 获取所有状态数据
   * @method [状态] - getAllStatus
   * @return {{}|*|Application.status}
   * @author wyj 15.1.9
   */
  getAllStatus: function () {
    return this.status;
  },
  /**
   * 缓存cookie
   * @method [cookie] - addCookie
   * @author wyj 15.1.13
   */
  addCookie: function(name){
    if (Est.findIndex(this.cookies, name) !== -1){
      return;
    }
    this.cookies.push(name);
  },
  /**
   * 获取所有保存的cookie
   * @method [cookie] - getCookies
   * @return {Array}
   * @author wyj 15.1.13
   */
  getCookies: function(){
    return this.cookies;
  }
});
/**
 * 解决ie6无console问题
 * @method console
 * @private
 * */
if (!window.console) {
  console = (function (debug) {
    var instance = null;

    function Constructor() {
      if (debug) {
        this.div = document.createElement("console");
        this.div.id = "console";
        this.div.style.cssText = "filter:alpha(opacity=80);padding:10px;line-height:14px;position:absolute;right:0px;top:0px;width:30%;border:1px solid #ccc;background:#eee;";
        document.body.appendChild(this.div);
      }
    }

    Constructor.prototype = {
      log: function (str) {
        if (debug) {
          var p = document.createElement("p");
          p.innerHTML = str;
          this.div.appendChild(p);
        }
      }
    }
    function getInstance() {
      if (instance == null) {
        instance = new Constructor();
      }
      return instance;
    }

    return getInstance();
  })(false)
}
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
  define("bui/config", [], function (require, exports, module) {
    //from seajs
    var BUI = window.BUI = window.BUI || {};
    BUI.use = seajs.use;
    BUI.config = seajs.config;
  });
  require("bui/config");
})();
