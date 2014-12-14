/**
 * @description BaseView
 * @namespace BaseView
 * @author yongjin<zjut_wyj@163.com> 2014/12/8
 */
define('BaseView', ['jquery', 'underscore', 'backbone', 'HandlebarsHelper'],
  function (require, exports, module) {
    var BaseView, Backbone, HandlebarsHelper;

    Backbone = require('backbone');
    HandlebarsHelper = require('HandlebarsHelper');

    BaseView = Backbone.View.extend({
      /**
       * 初始化
       *
       * @method [protected] - _initialize
       * @param options [template: 字符串模板][model: 实例模型]
       * @author wyj 14.11.20
       * @example
       *    this._initialize({
              template : template,
              model: new Model()
        });
       */
      _initialize: function(options){
        var model = Backbone.Model.extend({});
        this._options = options || {};
        this._options.data = this._options.data || {};
        this.template = HandlebarsHelper.compile(this._options.template);
        this.model = new model(this._options.data);
        if (this._options.enterRender) this._enterEvent();
        return this;
      },
      /**
       * 渲染
       *
       * @method [protected] - _render
       * @private
       * @author wyj 14.11.20
       */
      _render: function(){
        this.$el.html(this.template(this.model.toJSON()));
      },
      /**
       * 回车事件
       *
       * @method [protected] - _enterEvent
       * @private
       * @author wyj 14.12.10
       */
      _enterEvent: function () {
        var ctx = this;
        if (!this._options.enterRender) return;
        this.$('input').keyup(function (e) {
          if (e.keyCode === CONST.ENTER_KEY) {
            ctx.$(ctx._options.enterRender).click();
          }
        });
      },
      /**
       * 重置对话框高度
       * @method [protected] - _resetIframe
       * @author wyj 14.11.16
       */
      _resetIframe: function () {
        try {
          if (window.detailDialog && window.detailDialog.height){
            window.detailDialog.height($(document).height());
            window.detailDialog.reset();
          }
        } catch (e) {
          console.error('【error】: BaseDetail.resetIframe' + e);
        }
      },
      /**
       * 移除模型类
       *
       * @method [protected] - _remove
       * @returns {BaseDetail}
       * @author wyj 14.11.16
       */
      _remove: function () {
        debug('BaseDetail.remove');
        this.model.destroy();
        this.model = null;
        return this;
      },
      /**
       * 移除所有绑定的事件
       *
       * @method [protected] - _close
       * @author wyj 14.11.16
       */
      _close: function () {
        debug('BaseDetail.close');
        this.undelegateEvents();
        this.stopListening();
        this.off();
      }
    });

    module.exports = BaseView;

  });