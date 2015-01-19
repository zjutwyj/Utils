/**
 * @description 详细页
 *
 * - initialize 实现父类_initialize
 * - render 实现父类 _render
 *
 * @class BaseDetail - 详细页
 * @author yongjin<zjut_wyj@163.com> 2014.11.12
 */

define('BaseDetail', ['jquery', 'underscore', 'backbone', 'HandlebarsHelper', 'BaseUtils', 'BaseService'],
  function (require, exports, module) {
    var BaseDetail, Backbone, HandlebarsHelper, BaseUtils, BaseService;

    Backbone = require('backbone');
    HandlebarsHelper = require('HandlebarsHelper');
    BaseUtils = require('BaseUtils');
    BaseService = require('BaseService');

    BaseDetail = Backbone.View.extend({
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
       * 初始化
       *
       * @method [override] - _initialize
       * @param options
       * @author wyj 14.11.20
       * @example
       *      this._initialize({
       *         template : template, // 字符串模板
       *         model: ProductModel, // 模型类
       *         // 可选
       *         enterRender: '#submit' // 执行回车后的按钮点击的元素选择符
       *         id: ctx.model.get('id'), // 当不是以dialog形式打开的时候， 需要传递ID值
                 page: ctx._getPage() // 点击返回按钮且需要定位到第几页时， 传入page值，
                 data: {} // 附加数据  获取方法为  _data.name
       *      });
       */
      _initialize: function (options) {
        this._options = options || {};
        Est.extend(this._options, this.options);
        this.template = HandlebarsHelper.compile(options.template);
        this._initModel(options.model, this);
        if (this._options.enterRender) this._enterEvent();
      },
      /**
       * 渲染
       *
       * @method [override] - _render
       * @author wyj 14.11.20
       * @example
       *        this._render();
       */
      _render: function () {
        this.$el.append(this.template(this.model.toJSON()));
        if (window.topDialog) {
          this.$('.form-actions').hide();
        }
        setTimeout(function () {
          BaseUtils.resetIframe();
        }, 1000);
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
       * 初始化模型类 将自动判断是否有ID传递进来，
       * 若存在则从服务器端获取详细内容
       * 若为添加， 则在ctx 与模型类里设置 _isAdd = true
       *
       * @method [private] - _initModel
       * @private
       * @param model
       * @param ctx
       * @author wyj 14.11.15
       */
      _initModel: function (model, ctx) {
        ctx.passId = Est.getUrlParam('id', window.location.href) || this.options.id;
        debug(function () {
          if (!model) {
            return 'XxxDetail未找到模型类， 请检查继承BaseDetail时是否设置model参数，如XxxDetail = BaseDetail.extend({' +
              'model: XxxModel, initialize: function(){..}})';
          }
        }, {type: 'error'});
        if (!Est.isEmpty(this.passId)) {
          ctx.model = new model();
          ctx.model.set('id', ctx.passId);
          ctx.model.set('_data', ctx._options.data);
          ctx.model.fetch().done(function () {
            ctx.model.set('_isAdd', ctx._isAdd = false);
            ctx.render();
          });
        } else {
          ctx.passId = new Date().getTime();
          ctx.model = new model();
          ctx.model.set('_data', ctx._options.data);
          ctx.model.set('_isAdd', ctx._isAdd = true);
          ctx.render();
        }
      },
      /**
       * form包装器， 传递表单选择符
       *
       * @method [public] - _form
       * @param {String} formSelector 选择器
       * @return {BaseDetail}
       * @author wyj on 14.11.15
       * @example
       *        this._form('#J_Form')._validate()._init({
       *          onBeforeSave: function(){
       *            // 处理特殊字段
       *            this.model.set('taglist', Est.map(ctx.tagInstance.collection.models, function (item) {
       *              return item.get('name');
       *            }).join(','));
       *          },
       *          onAfterSave : function(response){
       *             if(response.attributes.success == false ){
       *                ctx.refreshCode();
       *                return true;
       *             }
       *            BaseUtils.tip('请验证邮箱后再登录!');
       *            window.location.href = '/member/modules/login/login.html';
       *          }
       *        });
       */
      _form: function (formSelector) {
        this.formSelector = formSelector;
        this.formElemnet = this.$(this.formSelector);
        return this;
      },
      /**
       * 启用表单验证
       *
       * @method [public] - _validate
       * @return {BaseDetail}
       * @param options [url: 远程验证地址][fields{Array}: 字段名称]
       * @author wyj 14.11.15
       * @example
       *        this._form('#J_Form')._validate({
       *            url: CONST.API + '/user/validate',
       *            fields: ['vali-username', 'vali-email'] // 注意， 字段前加vali-
       *        });
       */
      _validate: function (options) {
        var ctx = this;
        options = options || {};
        BUI.use('bui/form', function (Form) {
          ctx.formValidate = new Form.Form({
            srcNode: ctx.formSelector
          }).render();
          if (options.url && options.fields) {
            Est.each(options.fields, function (field) {
              app.addData(field, ctx.formValidate.getField(field));
              debug(function () {
                if (!ctx.formValidate.getField(field)) {
                  return '字段不匹配，检查input元素name值是否以vali-开头？';
                }
              }, {type: 'error'});
              app.getData(field).set('remote', {
                url: options.url,
                dataType: 'json',
                callback: function (data) {
                  if (data.success) {
                    return '';
                  } else {
                    return data.msg;
                  }
                }
              });
            });
          }
        });
        return this;
      },
      /**
       * 绑定提交按钮
       *
       * @method [public] - _init
       * @param options [onBeforeSave: 保存前方法] [onAfterSave: 保存后方法]
       * @author wyj 14.11.15
       * @example
       *        this._form()._validate()._init({
       *            onBeforeSave: function(){},
       *            onAfterSave: function(){}
       *        });
       */
      _init: function (options) {
        var ctx = this;
        var passed = true;
        options = options || {};
        $('#submit', this.el).on('click', function () {
          var $button = $(this);
          var preText = ctx.preText = $(this).html();
          passed = true; // 设置验证通过
          ctx.formElemnet.submit();
          $("input, textarea, select", $(ctx.formSelector)).each(function () {
            var name, val, pass;
            name = $(this).attr('name');
            if ($(this).hasClass('bui-form-field-error')) {
              passed = false;
            }
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
          if (passed) {
            if (typeof options.onBeforeSave !== 'undefined')
              options.onBeforeSave.call(ctx);
            $button.html('提交中...');
            ctx._save(function (response) {
              if (options.onAfterSave) {
                options.onAfterSave = Est.inject(options.onAfterSave, function (response) {
                  return new Est.setArguments(arguments);
                }, function (response) {
                  $button.html(preText);
                });
                options.onAfterSave.call(ctx, response);
              }
              $button.html(preText);
            });
          }
        });
      },
      /**
       * 保存结果
       *
       * @method [private] - _save
       * @private
       * @author wyj 14.11.18
       */
      _save: function (callback) {
        this._saveItem(callback);
      },
      /**
       * 保存表单
       *
       * @method [private] - _saveItem
       * @private
       * @param callback
       * @param context
       * @author wyj 14.11.15
       */
      _saveItem: function (callback, context) {
        debug('BaseDetail._saveItem');
        if (Est.isEmpty(this.model.url())){
          debug('XxxModel模型类未设置url参数！', {type: 'error'});
          return;
        }
        this.model.save(null, {
          wait: true,
          success: function (response) {
            console.log('BaseDetail._saveSuccess');
            if (top) {
              top.model = response.attributes;
            }
            if (callback && typeof callback === 'function')
              callback.call(context, response);
          }
        });
      },
      /**
       * 导航
       * @method [public] - _navigate
       * @param name
       * @author wyj 15.1.13
       */
      _navigate: function(name){
        Backbone.history.navigate(name, true);
      },
      /**
       * 重置表单
       * @method [private] - _reset
       * @private
       * @author wyj 14.11.18
       */
      _reset: function () {
        this.model.set(this.model.defaults);
      },
      /**
       * 清空视图， 并移除所有绑定的事件
       *
       * @method [public] - _empty
       * @author wyj 14.11.16
       * @example
       *      this._empty();
       */
      _empty: function () {
        this.model.off();
        this.$el.empty().off();
      },
      /**
       * 移除所有绑定的事件
       *
       * @method [private] - _close
       * @private
       * @author wyj 14.11.16
       */
      _close: function () {
        debug('BaseDetail.close');
        this.undelegateEvents();
        this.stopListening();
        this.off();
      }
    });

    module.exports = BaseDetail;
  });