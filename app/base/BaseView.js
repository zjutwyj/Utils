/**
 * @description 普通视图
 *
 *  - el: 目标元素Id 如 "#jhw-main"
 *  - initialize 实现父类_initialize
 *  - render 实现父类_render
 *  - 事件
 *      var panel = new Panel();
 *      panel.on('after', function(){
 *        this.albumList = app.addView('albumList', new AlbumList());
 *        this.photoList = app.addView('photoList', new PhotoList());
 *      });
 *      panel.render(); // 渲染
 *
 * @class BaseView - 普通视图
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
       * @method [override] - _initialize
       * @param options [template: 字符串模板][model: 实例模型]
       * @author wyj 14.11.20
       * @example
       *      this._initialize({
       *         viewId: 'productList'，
       *         template: 字符串模板，
       *         data: 对象数据
       *         // 可选
       *         enterRender: 执行回车后的按钮点击的元素选择符 如 #submit .btn-search
       *      });
       */
      _initialize: function(options){
        var model = Backbone.Model.extend({});
        this._options = options || {};
        this._options.data = this._options.data || {};
        this.template = HandlebarsHelper.compile(this._options.template);
        this.model = new model(this._options.data);
        return this;
      },
      /**
       * 渲染
       *
       * @method [override] - _render
       * @private
       * @author wyj 14.11.20
       * @example
       *        this._render();
       */
      _render: function(){
        this.trigger('before', this);
        this.$el.html(this.template(this.model.toJSON()));
        if (this._options.enterRender) this._enterEvent();
        this.trigger('after', this);
      },
      /**
       * 回车事件
       *
       * @method [private] - _enterEvent
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
       * 移除模型类
       *
       * @method [private] - _remove
       * @return {BaseDetail}
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
       * @method [private] - _close
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