/**
 * @description app
 * @namespace app
 * @author yongjin<zjut_wyj@163.com> 2014/12/7
 */
// 所有实例化对象的容器
var Application = function (options) {
  this.options = options;
  Est.extend(this, options);
  this.initialize.apply(this, arguments);
};
Est.extend(Application.prototype, {
  initialize: function () {
    this.data = { itemActiveList: [] };
    this.instance = {};
    this.modules = {};
    this.routes = {};
    this.templates = {};
    this.evet = {};
    this.panel = {};
  },
  addPanel: function (name, options) {
    if (name in this['panel']) {
      console.log('已存在该面板：' + name);
      return this;
    }
    this.panel[name] = $(options.el || '#jhw-main').append($(options.template));
    return this;
  },
  getPanel: function(name){
    return this.panel[name];
  },
  getEvet: function (name) {
    return this.evet[name];
  },
  setEvet: function (name, val) {
    this['evet'][name] = val;
  },
  getView: function (name) {
    return this['instance'][name];
  },
  addView: function (name, instance) {
    if (name in this['instance']) { console.log('实例化对象重复' + name); }
    this['instance'][name] = instance;
    return instance;
  },
  hasView: function (name) {
    return name in this['instance'];
  },
  removeView: function (name) {
    var view = this.getView(name);
    if (view){
      view.$el.empty().off();
      view.stopListening();
    }
    delete this['instance'][name];
    return this;
  },
  emptyView: function () {
    Est.each(this['instance'], function (key) {
      debug(key);
    });
    this['instance'] = {};
  },
  setData: function (name, data) {
    if (name in this['data']) {
      console.log('数据对象重复' + name);
    }
    this['data'][name] = data;
  },
  hasData: function (name) {
    return name in this['data'];
  },
  getData: function (name) {
    return this['data'][name];
  },
  removeData: function (name) {
    delete this[name];
  },
  addModule: function (name, val) {
    if (name in this['modules']) {
      console.log('已存在的模块：' + name);
    }
    this['modules'][name] = val;
  },
  getModules: function () {
    return this['modules'];
  },
  addRoute: function (name, fn) {
    if (name in this['routes']) {
      console.log('已存在的路由:' + name);
    }
    this['routes'][name] = fn;
  },
  getRoutes: function () {
    return this['routes'];
  },
  addTemplate: function (name, fn) {
    if (name in this['templates']) {
      console.log('已存在的模板：' + name);
    }
    this['templates'][name] = fn;
  },
  getTemplates: function () {
    return this['templates'];
  }
});
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
   */
  var define;
  var require;
  (function (global, undefined) {

    /**
     * util-lang.js - The minimal language enhancement
     */

    function isType(type) {
      return function (obj) {
        return {}.toString.call(obj) == "[object " + type + "]"
      }
    }

    var isFunction = isType("Function")
    /**
     * module.js - The core of module loader
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
