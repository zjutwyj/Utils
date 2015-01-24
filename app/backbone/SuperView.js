/**
 * @description 顶级父类
 * @class SuperView
 * @author yongjin<zjut_wyj@163.com> 2015/1/24
 */
define('SuperView', ['jquery', 'underscore', 'backbone', 'BaseUtils', 'HandlebarsHelper'],
  function (require, exports, module) {
    var SuperView, Backbone, BaseUtils, HandlebarsHelper;

    Backbone = require('backbone');
    BaseUtils = require('BaseUtils');
    HandlebarsHelper = require('HandlebarsHelper');

    SuperView = Backbone.View.extend({
      /**
       * 传递options进来
       *
       * @method [private] - constructor
       * @private
       * @param options
       * @author wyj 14.12.16
       */
      constructor: function (options) {
        this.options = options || {};
        Backbone.View.apply(this, arguments);
      },
      /**
       * 导航
       * @method [public] - _navigate
       * @param name
       * @author wyj 15.1.13
       */
      _navigate: function (name, options) {
        options = options || true;
        Backbone.history.navigate(name, options);
      },
      /**
       * 静态对话框， 当你需要显示某个组件的视图但不是以iframe形式打开时
       * @method [public] - _dialog
       * @param options
       * @author wyj 15.1.22
       * @example
       *        this._dialog({
                    moduleId: 'SeoDetail', // 模块ID
                    title: 'Seo修改', // 对话框标题
                    id: this.model.get('id'), // 初始化模块时传入的ID
                    width: 600, // 对话框宽度
                    height: 250, // 对话框高度
                    skin: 'form-horizontal', // className
                    button: [ // 自定义按钮
                      {
                        value: '保存',
                        callback: function () {
                        this.title('正在提交..');
                        $("#SeoDetail" + " #submit").click(); // 弹出的对话ID选择符为moduleId值
                        return false; // 去掉此行将直接关闭对话框
                      }}
                    ],
                    onShow: function(){}, // 对话框弹出后调用
                    onClose: function(){
                        this._reload(); // 列表刷新
                        this.collection.push(Est.cloneDeep(app.getModels())); // 向列表末尾添加数据, 注意必须要深复制
                        this.model.set(app.getModels().pop()); // 修改模型类
                    }
                }, this);
       */
      _dialog: function (options, context) {
        var ctx = context || this;
        options.width = options.width || 700;
        options.cover = Est.typeOf(options.cover) === 'boolean' ? options.cover : true;
        options.button = options.button || [
          {value: '保存', callback: function () {
            this.title('正在保存...');
            $('#' + options.moduleId + ' #submit').click();
            return false;
          }, autofocus: true}
        ];
        options = Est.extend(options, {
          el: '#base_item_dialog' + options.moduleId,
          content: '<div id="' + options.moduleId + '"></div>',
          viewId: options.moduleId,
          onshow: function () {
            options.onShow && options.onShow.call(this, options);
            seajs.use([options.moduleId], function (instance) {
              app.addPanel(options.moduleId, {
                el: '#' + options.moduleId,
                template: '<div id="base_item_dialog' + options.moduleId + '"></div>'
              }).addView(options.moduleId, new instance(options));
            });
          },
          onclose: function () {
            options.onClose &&
            options.onClose.call(ctx, options);
            app.getDialogs().pop();
          }
        });
        BaseUtils.dialog(options);
      },
      /**
       * 设置参数
       *
       * @method [public] - _setOption
       * @param obj
       * @return {BaseList}
       * @author wyj 14.12.12
       * @example
       *      app.getView('categoryList')._setOption({
       *        sortField: 'orderList'
       *      })._moveUp(this.model);
       */
      _setOption: function (obj) {
        Est.extend(this._options, obj);
        return this;
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
      }
    });

    module.exports = SuperView;
  });