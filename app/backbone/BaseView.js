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
define('BaseView', ['SuperView', 'backbone', 'HandlebarsHelper'],
  function (require, exports, module) {
    var BaseView, SuperView, Backbone, HandlebarsHelper;

    Backbone = require('backbone');
    SuperView = require('SuperView');
    HandlebarsHelper = require('HandlebarsHelper');

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
        this._initOptions(options);
        this._initTemplate(this._options);
        this._initModel(Backbone.Model.extend({}));
        return this;
      },
      /**
       * 初始化参数
       * @method _initOptions
       * @private
       * @author wyj 15.1.12
       */
      _initOptions: function (options) {
        this._options = Est.extend(options || {}, this.options);
        this._options.data = this._options.data || {};
      },
      /**
       * 初始化模板， 若传递一个Template模板字符中进来， 则渲染页面
       * @method _initTemplate
       * @private
       * @author wyj 15.1.12
       */
      _initTemplate: function (options) {
        if (options.template) {
          this.template = HandlebarsHelper.compile(options.template);
        }
      },
      /**
       * 初始化模型类, 设置index索引
       *
       * @method [private] - _initModel
       * @private
       * @param model
       * @author wyj 14.11.20
       */
      _initModel: function (model) {
        this.model = new model(this._options.data);
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
        this.$el.append(this.template(this._options.data));
        this._initEnterEvent(this._options);
        this.trigger('after', this);
        if (this._options.afterRender) {
          this._options.afterRender.call(this, this._options);
        }
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