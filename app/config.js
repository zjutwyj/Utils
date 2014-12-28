/**
 * @description config
 * @namespace config
 * @author yongjin on 2014/7/18
 */

/**
 * seajs 配置
 * */
seajs.config({

  // Sea.js 的基础路径
  base: CONST.HOST,

  // 别名配置
  alias: Est.extend({
    'jquery': 'vendor/jquery/jquery-1.10.2.js',
    'underscore': 'vendor/underscore/underscore-debug.js',
    'backbone': 'vendor/backbone/backbone-debug.js',
    'localStorage': 'vendor/backbone/backbone.localStorage-debug.js',
    'dialog': 'vendor/artDialog_v6/dialog.js',
    'dialog-plus': 'vendor/artDialog_v6/dialog-plus.js',
    'xheditor': 'vendor/xheditor/xheditor.js',
    'marionette': 'vendor/backbone/backbone.marionette.js',
    'handlebars': 'vendor/handlebars/handlebars-debug.js',
    'HandlebarsHelper': 'scripts/helper/HandlebarsHelper.js',
    'BaseView': 'lib/BaseView.js',
    'BaseCollection': 'lib/BaseCollection.js',
    'BaseModel': 'lib/BaseModel.js',
    'BaseItem': 'lib/BaseItem.js',
    'BaseDetail': 'lib/BaseDetail.js',
    'BaseList': 'lib/BaseList.js',
    'BaseUtils': 'lib/BaseUtils.js',
    'BaseService': 'scripts/service/BaseService.js',
    'BaseComposite': 'lib/BaseComposite.js'
  }, app.getModules()),

  // 路径配置
  paths: {
    bui: CONST.HOST + '/vendor/bui'
  },

  // 变量配置
  vars: {
    'locale': 'zh-cn'
  },

  // 映射配置
  map: [
    [/lib\/(.*).js/, CONST.LIB_FORDER + '/$1.js'], //['.js', '-min.js'] ,
    [ /^(.*\.(?:css|js))(.*)$/i, '$1?' + CONST.APP_VERSION]
  ],

  // 调试模式
  debug: Est.typeOf(CONST.DEBUG_SEAJS) === 'undefined' ? false :
    CONST.DEBUG_SEAJS,

  // 文件编码
  charset: 'utf-8'
});

/**
 * 注册模板
 * */
Est.each(app.getTemplates(), function (value, key) {
  define(key, value);
});

/**
 * 路由
 * */
seajs.use(['jquery', 'underscore', 'backbone'],
  function ($, _, Backbone) {
    var b_routes = { routes: { '': 'index'}, defaults: function () {
      //$(document.body).append("This route is not hanled.. you tried to access: " + other);
    } };
    Est.each(app.getRoutes(), function (value, key) {
      var fnName = key.replace(/\//g, '');
      b_routes.routes[key] = fnName;
      b_routes[fnName] = value;
    });
    var router = Backbone.Router.extend(b_routes);
    new router();
    Backbone.history.start();
  });

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
    opts = Est.extend({ type: 'console' }, options);
    msg = Est.typeOf(str) === 'function' ? str() : str;
    if (!Est.isEmpty(msg)) {
      if (opts.type === 'error'){
        console.error(msg);
      } else{
        console.log(msg);
      }
    }
  }
};