/**
 * @description 基础模型类
 * @namespace BaseModel
 * @author yongjin<zjut_wyj@163.com> 2014/11/10
 */
define('BaseModel', ['jquery', 'underscore', 'backbone', 'dialog'],
  function (require, exports, module) {
    var Backbone, dialog, BaseModel;

    Backbone = require('backbone');
    dialog = require('dialog');

    BaseModel = Backbone.Model.extend({
      defaults: { checked: false, children: [] },
      baseId: '',
      /**
       * 初始化请求连接, 判断是否为新对象， 否自动加上ID
       *
       * @method [private] - url
       * @returns {*}
       * @author wyj 14.11.16
       */
      url: function () {
        var base = this.baseUrl;
        if (this.isNew() && !this.id) return base;
        return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id;
      },
      /**
       * 模型类初始化
       *
       * @method [protected] - _initialize
       * @author wyj 14.11.16
       */
      _initialize: function () {
        this.validateMsg = null;
        debug('10.BaseModel._initialize [add to collection] or 3.[add to detail]');
      },
      /**
       * 过滤结果, 并提示信息对话框, 若不想提示信息可以设置hideTip为true
       *
       * @method [private] - parse
       * @param response
       * @param options
       * @returns {*}
       * @author wyj 14.11.16
       */
      parse: function (response, options) {
        var ctx = this;
        if (response.msg && !this.hideTip) {
          var buttons = [];
          if (response.success) {
            buttons.push({ value: '继续添加', callback: function () {
              ctx.set('id', null);
              ctx.set(ctx.baseId, null);
            }});
            buttons.push({ value: '确定', callback: function () {
              if (typeof window.detailDialog != 'undefined') {
                window.detailDialog.close(); // 关键性语句
              }
              this.close();
            }, autofocus: true });
          } else {
            buttons.push({ value: '确定', callback: function () {
              this.close();
            }, autofocus: true });
          }
          dialog({
            title: '提示：',
            content: response.msg,
            width: 250,
            button: buttons
          }).show();
        }
        if (response.attributes) {
          response = response.attributes.data;
        }
        response.id = response[ctx.baseId];
        response.checked = false;
        response.time = new Date().getTime();
        return response;
      },
      /**
       * 保存模型类
       *
       * @method [public] - saveField
       * @param keyValue
       * @param ctx
       * @param options [success: 成功回调][async: 是否异步]
       * @author wyj 14.11.16
       * @example
       *    this.model._saveField({
              id: thisNode.get('id'),
              sort: thisNode.get('sort')
            }, ctx, { // ctx须初始化initModel
            success: function(){},
            async: false
            });
       */
      _saveField: function (keyValue, ctx, options) {
        var wait = options.async || true;
        var newModel = new ctx.initModel({
          id: keyValue.id || ctx.model.get('id')
        });
        newModel.clear();
        newModel.set(keyValue);
        newModel.set('silent', true);
        if (options.hideTip){
          newModel.hideTip = true;
        }
        newModel.set('editField', true);
        newModel.save(null, {
          success: function (model, result) {
            if (typeof options.success != 'undefined') {
              options.success.call(ctx, keyValue, result);
            }
          }, wait: wait
        });
      },
      /**
       * 获取子模型
       * @returns {*}
       */
      _getChildren: function(collection) {
        return _.map(this.get('children'), function(ref) {
          // Lookup by ID in parent collection if string/num
          if (typeof(ref) == 'string' || typeof(ref) == 'number')
            return collection.get(ref);
          // Else assume its a real object
          return ref;
        });
      },
      /**
       * checkbox选择框
       *
       * @method [public] - toggle
       * @author wyj 14.11.16
       */
      _toggle: function () {
        this.set('checked', !this.get('checked'));
      },
      /**
       * 预处理验证， 若模型类里有silent=true字段，则取消验证
       *
       * @method [protected] - _validate
       * @param attributes
       * @param callback
       * @private
       * @author wyj 14.11.21
       */
      _validation: function(attributes, callback){
        if (!attributes.silent && callback) {
            callback.call(this, attributes);
        }
        return this.validateMsg;
      }
    });

    module.exports = BaseModel;
  });