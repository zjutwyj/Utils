/**
 * @description 文本编辑组件
 * @class PluginText
 * @author yongjin<zjut_wyj@163.com> 2015/4/11
 */
define('PluginText', ['BaseView', 'template/plugin_text_view'], function (require, exports, module) {
  var PluginText, template, BaseView;

  template = require('template/plugin_text_view');
  BaseView = require('BaseView');

  PluginText = BaseView.extend({
    initialize: function () {
      this._initialize({
        template: template
      });
      this.render();
    },
    getText: function () {
      return 'done';
    },
    render: function () {
      this._render();
    }
  });

  module.exports = PluginText;
});