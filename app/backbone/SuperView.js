/**
 * @description 顶级父类
 * @class SuperView - 顶级父类
 * @author yongjin<zjut_wyj@163.com> 2015/1/24
 */
define('SuperView', ['jquery', 'underscore', 'backbone', 'Utils', 'HandlebarsHelper'],
  function (require, exports, module) {
    var SuperView, Backbone, Utils, HandlebarsHelper;

    Backbone = require('backbone');
    Utils = require('Utils');
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
        this._modelBinder = Backbone.ModelBinder;
        if (this.init && Est.typeOf(this.init) !== 'function')
          this._initialize(this.init);
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
                    hideSaveBtn: false, // 是否隐藏保存按钮， 默认为false
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
        options.button = options.button || [];
        if (typeof options.hideSaveBtn === 'undefined' ||
          (Est.typeOf(options.hideSaveBtn) === 'boolean' && !options.hideSaveBtn)) {
          options.button.push(
            {value: '提交', callback: function () {
              this.title('正在提交...');
              $('#' + options.moduleId + ' #submit').click();
              return false;
            }, autofocus: true});
        }
        options = Est.extend(options, {
          el: '#base_item_dialog' + options.moduleId,
          content: options.content || '<div id="' + options.moduleId + '"></div>',
          viewId: options.moduleId,
          onshow: function () {
            options.onShow && options.onShow.call(this, options);
            if (options.moduleId){
              seajs.use([options.moduleId], function (instance) {
                app.addPanel(options.moduleId, {
                  el: '#' + options.moduleId,
                  template: '<div id="base_item_dialog' + options.moduleId + '"></div>'
                }).addView(options.moduleId, new instance(options));
              });
            }
          },
          onclose: function () {
            options.onClose &&
            options.onClose.call(ctx, options);
            app.getDialogs().pop();
          }
        });
        Utils.dialog(options);
      },
      /**
       * 模型类双向绑定
       *
       * @method [private] - _modelBind
       * @private
       * @author wyj 14.12.25
       * @example
       *        this._modelBind();
       */
      _modelBind: function () {
        var ctx = this;
        this.$("input, textarea, select").each(function () {
          $(this).change(function () {
            var val, pass;
            var modelId = $(this).attr('id');
            if (modelId && modelId.indexOf('model') !== -1) {
              switch (this.type) {
                case 'radio':
                  val = $(this).is(":checked") ? $(this).val() : pass = true;
                  break;
                case 'checkbox':
                  val = $(this).is(':checked') ? (Est.isEmpty($(this).attr('true-value')) ? true : $(this).attr('true-value')) :
                    (Est.isEmpty($(this).attr('false-value')) ? false : $(this).attr('false-value'));
                  break;
                default :
                  val = $(this).val();
                  break;
              }
              if (!pass) {
                ctx.model.set(modelId.replace(/^model\d?-(.+)$/g, "$1"), val);
              }
            }
          });
        });
      },
      /**
       * 字段序列化成字符串
       * @method [public] - _stringifyJSON
       * @param array
       * @author wyj 15.1.29
       * @example
       *      this._stringify(['invite', 'message']);
       */
      _stringifyJSON: function (array) {
        var keys, result;
        Est.each(array, function (item) {
          keys = item.split('.');
          if (keys.length > 1) {
            result = Est.getValue(this.model.toJSON(), item);
            Est.setValue(this.model.toJSON(), item, JSON.stringify(result));
          } else {
            this.model.set(item, JSON.stringify(this.model.get(item)));
          }
        }, this);
      },
      /**
       * 反序列化字符串
       * @method [public] - _parseJSON
       * @param array
       * @private
       */
      _parseJSON: function (array) {
        var keys, result;
        Est.each(array, function (item) {
          keys = item.split('.');
          if (keys.length > 1) {
            result = Est.getValue(this.model.toJSON(), item);
            if (Est.typeOf(result) === 'string') {
              Est.setValue(this.model.toJSON(), item, JSON.parse(result));
            }
          } else {
            if (Est.typeOf(this.model.get(item)) === 'string') {
              this.model.set(item, JSON.parse(this.model.get(item)));
            }
          }
        }, this);
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
       * @method [private] - _initEnterEvent
       * @private
       * @author wyj 14.12.10
       */
      _initEnterEvent: function (options) {
        if (options.speed > 1 && options.enterRender) {
          this.$('input').keyup($.proxy(function (e) {
            if (e.keyCode === CONST.ENTER_KEY) {
              this.$(options.enterRender).click();
            }
          }, this));
        }
      },
      /**
       * 获取配置参数
       * @method [public] - _getOption
       * @param name
       * @return {*}
       * @author wyj 15.1.29
       */
      _getOption: function (name) {
        return this._options[name];
      },
      /**
       * 获取model值
       * @method [public] - _getValue
       * @param path
       * @author wyj 15.1.30
       * @example
       *      this._getValue('tip.name');
       */
      _getValue: function (path) {
        return Est.getValue(this.model.attributes, path);
      },
      /**
       * 设置model值
       * @method [public] - _setValue
       * @param path
       * @param val
       * @author wyj 15.1.30
       * @example
       *      this._setValue('tip.name', 'aaa');
       */
      _setValue: function (path, val) {
        Est.setValue(this.model.attributes, path, val);
      },
      /**
       * 绑定单个字段进行重渲染
       * @method [public] - _bind
       * @param array
       * @author wyj 15.2.2
       * @example
       *
       */
      _bind: function (modelId, array) {
        this.model.on('change:' + modelId, function () {
          Est.each(array, function (item) {
            var $parent = this.$(item).parent();
            var compile = HandlebarsHelper.compile($parent.html());
            $parent.html(compile(this));
          }, this);
        })
      }
    });

    module.exports = SuperView;
  });