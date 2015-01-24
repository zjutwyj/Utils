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
define('BaseView', ['SuperView', 'backbone', 'HandlebarsHelper', 'BaseUtils'],
  function (require, exports, module) {
    var BaseView, SuperView, Backbone, HandlebarsHelper, BaseUtils;

    Backbone = require('backbone');
    SuperView = require('SuperView');
    HandlebarsHelper = require('HandlebarsHelper');
    BaseUtils = require('BaseUtils');

    BaseView = SuperView.extend({
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
      _initialize: function (options) {
        var model = Backbone.Model.extend({});
        this._options = options || {};
        Est.extend(this._options, this.options);
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
      _render: function () {
        this.trigger('before', this);
        this.$el.append(this.template(this.model.toJSON()));
        if (this._options.enterRender) this._enterEvent();
        this.trigger('after', this);
      },
      /**
       * 移除事件
       *
       * @method [private] - _empty
       * @private
       * @return {BaseView}
       * @author wyj 14.11.16
       */
      _empty: function () {
        debug('BaseView.remove');
        //this.model && this.model.remove();
      }
    });

    module.exports = BaseView;
  });