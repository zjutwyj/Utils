/**
 * @description BaseDetail
 * @class BaseDetail - 详细页面
 * @author yongjin<zjut_wyj@163.com> 2014.11.12
 */
define('BaseDetail', ['SuperView', 'HandlebarsHelper', 'Utils', 'Service'],
  function (require, exports, module) {
    var BaseDetail, SuperView, HandlebarsHelper, Utils, Service;

    SuperView = require('SuperView');
    HandlebarsHelper = require('HandlebarsHelper');
    Utils = require('Utils');
    Service = require('Service');

    BaseDetail = SuperView.extend({
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
        this._initOptions(options);
        this._initTemplate(this._options);
        this._initList(this._options);
        this._initModel(options.model, this);
        this._initEnterEvent(this._options);
      },
      /**
       * 初始化参数
       * @method _initOptions
       * @private
       * @author wyj 15.1.12
       */
      _initOptions: function (options) {
        this._options = Est.extend(options || {}, this.options);
        this._options.speed = this._options.speed || 9;
      },
      /**
       * 初始化模板， 若传递一个Template模板字符中进来， 则渲染页面
       * @method _initTemplate
       * @private
       * @author wyj 15.1.12
       */
      _initTemplate: function (options) {
        this._data = options.data = options.data || {};
        if (options.template) {
          this.template = HandlebarsHelper.compile(options.template);
          //this.$el.append(this.template(options.data));
        }
        return this._data;
      },
      /**
       * 初始化列表视图容器
       * @method _initList
       * @private
       * @author wyj 15.1.12
       */
      _initList: function (options) {
        var ctx = this;
        this.list = options.render ? this.$(options.render) : this.$el;
        if (this.list.size() === 0)
          this.list = $(options.render);
        debug(function () {
          if (!ctx.list || ctx.list.size() === 0) {
            return ('当前' + ctx.options.viewId + '视图无法找到选择符， 检查XxxDetail中的_initialize方法中是否定义render或 ' +
              '实例化对象(new XxxDetail({...}))中是否存入el; ' +
              '或template模板是否引入， 或是否是iframe对话框中未重新实例化Application对象， 或检查template模板是否存在' +
              (ctx._options.render ? ctx._options.render : ctx.el));
          }
        }, {type: 'error'});
        return this.list;
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
        this.list.append(this.template(this.model.toJSON()));
        if (this._options.modelBind) this._modelBind();
        if (window.topDialog) {
          this.$('.form-actions').hide();
        }
        if (this._options.afterRender) {
          this._options.afterRender.call(this, this._options);
        }
        setTimeout(function () {
          Utils.resetIframe();
        }, 1000);
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
        ctx.passId = this.options.id || Est.getUrlParam('id', window.location.href);
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
       *            Utils.tip('请验证邮箱后再登录!');
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
        var modelObj = {};
        options = options || {};
        $('#submit', this.el).on('click', function () {
          var $button = $(this);
          var preText = ctx.preText = $(this).html();
          passed = true; // 设置验证通过
          ctx.formElemnet.submit();
          $("input, textarea, select", $(ctx.formSelector)).each(function () {
            var name, val, pass, modelKey, modelList;
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
                modelKey = modelId.replace(/^model\d?-(.+)$/g, "$1");
                modelList = modelKey.split('.');
                if (modelList.length > 1) {
                  Est.setValue(modelObj, modelKey, val);
                  ctx.model.set(modelList[0], modelObj[modelList[0]]);
                } else {
                  ctx.model.set(modelList[0], val);
                }
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
        debug('- BaseDetail._saveItem');
        if (Est.isEmpty(this.model.url())) {
          debug('XxxModel模型类未设置url参数！', {type: 'error'});
          return;
        }
        this.model.save(null, {
          wait: true,
          success: function (response) {
            debug('- BaseDetail._saveSuccess');
            app.addModel(Est.cloneDeep(response.attributes));
            if (top) {
              top.model = response.attributes;
            }
            if (callback && typeof callback === 'function')
              callback.call(context, response);
          }
        });
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
        debug('- BaseDetail.close');
        this.undelegateEvents();
        this.stopListening();
        this.off();
      }
    });

    module.exports = BaseDetail;
  });