/**
 * @description BaseDetail
 * @namespace BaseDetail
 * @author yongjin<zjut_wyj@163.com> 2014.11.12
 */

define('BaseDetail', ['jquery', 'underscore', 'backbone', 'HandlebarsHelper', 'BaseUtils'],
  function (require, exports, module) {
    var BaseDetail, Backbone, HandlebarsHelper, BaseUtils;

    Backbone = require('backbone');
    HandlebarsHelper = require('HandlebarsHelper');
    BaseUtils = require('BaseUtils');

    BaseDetail = Backbone.View.extend({
      /**
       * 初始化
       *
       * @method [protected] - _initialize
       * @param options
       * @private
       * @author wyj 14.11.20
       * @example
       *    this._initialize({
              template : template,
              model: ProductModel
        });
       */
      _initialize: function (options) {
        this._options = options || {};
        this.template = HandlebarsHelper.compile(options.template);
        this._initModel(options.model, this);
        if (this._options.enterRender) this._enterEvent();
      },
      /**
       * 渲染
       *
       * @method [protected] - _render
       * @private
       * @author wyj 14.11.20
       */
      _render: function () {
        var before = app.getEvet('before') || function () { };
        var after = app.getEvet('after') || function () { };
        before.call(this, arguments);
        this.$el.html(this.template(this.model.toJSON()));
        after.call(this, arguments);
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
       * 初始化模型类 将自动判断是否有ID传递进来，
       * 若存在则从服务器端获取详细内容
       * 若为添加， 则在ctx 与模型类里设置 _isAdd = true
       *
       * @method [protected] - _initModel
       * @param model
       * @param ctx
       * @author wyj 14.11.15
       */
      _initModel: function (model, ctx) {
        ctx.passId = Est.getUrlParam('id', window.location.href);
        if (!Est.isEmpty(this.passId)) {
          ctx.model = new model();
          ctx.model.set('id', ctx.passId);
          ctx.model.fetch().done(function () {
            ctx.model.set('_isAdd', ctx._isAdd = false);
            ctx.render()._resetIframe();
          });
        } else {
          ctx.passId = new Date().getTime();
          ctx.model = new model();
          ctx.model.set('_isAdd', ctx._isAdd = true);
          ctx.render()._resetIframe();
        }
      },
      /**
       * form包装器， 传递表单选择符
       *
       * @method [protected] - _form
       * @param {String} formSelector 选择器
       * @returns {BaseDetail}
       * @author wyj on 14.11.15
       * @example
       *    this._form('#J_Form')._validate()._init({
              onBeforeSave: function(){
                // 处理特殊字段
                this.model.set('taglist', Est.map(ctx.tagInstance.collection.models, function (item) {
                  return item.get('name');
                }).join(','));
              },
              onAfterSave: function(response){

              }
            });
       */
      _form: function (formSelector) {
        this.formSelector = formSelector;
        this.formElemnet = this.$(this.formSelector);
        return this;
      },
      /**
       * 启用表单验证
       *
       * @method [protected] - _validate
       * @returns {BaseDetail}
       * @param options [url: 远程验证地址][fields{Array}: 字段名称]
       * @author wyj 14.11.15
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
              app.setData(field, ctx.formValidate.getField(field));
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
       * @method [protected] - _init
       * @param options [onBeforeSave: 保存前方法] [onAfterSave: 保存后方法]
       * @author wyj 14.11.15
       */
      _init: function (options) {
        var ctx = this;
        var passed = true;
        options = options || {};
        $('#submit', this.el).on('click', function () {
          passed = true; // 设置验证通过
          ctx.formElemnet.submit();
          $("input, textarea, select", $(ctx.formSelector)).each(function () {
            var name, val, pass;
            name = $(this).attr('name');
            if ($(this).hasClass('bui-form-field-error')) {
              passed = false;
            }
            var modelId = $(this).attr('id');
            if (modelId && modelId.indexOf('model') !== -1 && !Est.isEmpty(name)) {
              switch (this.type) {
                case 'radio':
                  val = $(this).is(":checked") ? $(this).val() : pass = true;
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
          if (typeof options.onBeforeSave !== 'undefined')
            options.onBeforeSave.call(ctx);
          if (passed) {
            ctx._save(options.onAfterSave ||
              function () {
              });
          }
        });
      },
      /**
       * 保存结果
       *
       * @method [protected] - _save
       * @author wyj 14.11.18
       */
      _save: function (callback) {
        this._saveItem(callback);
      },
      /**
       * 保存表单
       *
       * @method [private] - _saveItem
       * @param callback
       * @param context
       * @author wyj 14.11.15
       */
      _saveItem: function (callback, context) {
        debug('BaseDetail._saveItem');
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
       * 获取产品分类
       *
       * @method [protected] - _getProductCategory
       * @param options select 转换成select形式，extend 转换成列表形式
       * @returns {ln.promise}
       * @author wyj 14.11.15
       */
      _getProductCategory: function (options) {
        return BaseUtils.getProductCategory(options);
      },
      _getNewsCategory: function (options) {
        return BaseUtils.getNewsCategory(options);
      },
      /**
       * 下拉框初始化
       *
       * @method [protected] - _initSelect
       * @param options  [target 文本框ID] [render 渲染ID] [itemId ID标识] [width 宽度] [items 数组]
       * @returns {ln.promise} 返回promise
       * @author wyj 14.11.15
       */
      _initSelect: function (options) {
        return BaseUtils.initSelect(options);
      },
      /**
       * 时间选择
       *
       * @method [protected] - _initDate
       * @param options [render 控件选择符] [showTime 是否显示时间]
       * @author wyj 14.11.19
       * @example
       *    this._initDate({
       *      render: '.calendar',
       *      showTime: false
       *    });
       */
      _initDate: function (options) {
        return BaseUtils.initDate(options);
      },
      /**
       * 标签选择框
       *
       * @method [protected] - _initCombox
       * @param options
       * @returns {ln.promise}
       * @author wyj 14.11.17
       * @example
       *      this.initCombox({
                    render: '#tag',
                    target: '#model-tag',
                    items: [ '选项一', '选项二', '选项三', '选项四' ]
                });
       */
      _initCombox: function (options) {
        return BaseUtils.initCombox(options);
      },
      /**
       * 初始化编辑器
       *
       * @method [protected] - _initEditor
       * @author wyj 14.11.15
       */
      _initEditor: function (options) {
        return BaseUtils.initEditor(options);
      },
      /**
       * 重置表单
       * @method [protected] - _reset
       * @author wyj 14.11.18
       */
      _reset: function () {
        this.model.set(this.model.defaults);
      },
      /**
       * 重置对话框高度
       * @method [protected] - _resetIframe
       * @author wyj 14.11.16
       */
      _resetIframe: function () {
        BaseUtils.resetIframe();
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
    })
    ;

    module.exports = BaseDetail;
  })
;