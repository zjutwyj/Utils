/**
 * @description 编辑器
 * @class Editor
 * @author yongjin<zjut_wyj@163.com> 2015/3/23
 */
define('Editor', ['BaseView', 'Utils', 'template/editor_view'], function (require, exports, module) {
  var Editor, BaseView, Utils, template;

  BaseView = require('BaseView');
  template = require('template/editor_view');
  Utils = require('Utils');

  Editor = BaseView.extend({
    initialize: function(){
      this._initialize({
        template: template
      });
      this.render();
    },
    // 使编辑器获取焦点
    focus: function(){
      app.getView('common_ck_editor').focus();
    },
    // 获取编辑器源代码
    getSource: function(){
      return app.getView('common_ck_editor').getSource();
    },
    setSource: function(content){
      app.getView('common_ck_editor').setSource(content);
    },
    render: function(){
      this._render();
      if (this.options.content)
        this.$('.ckeditor').html(this.options.html);
      // 编辑器
      Utils.initEditor({
        render: '.ckeditor',
        viewId: 'common_ck_ditor'
      });
    }
  });

  module.exports = Editor;
});