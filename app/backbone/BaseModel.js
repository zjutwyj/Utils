/**
 * @description 模型类
 *
 *    - initialize 实现父类_initialize
 *    - defaults (可选) 默认值  如 Est.extend({}, BaseModel.prototype.defaults);
 *    - baseId (可选) ID标识符 如 productId
 *    - baseUrl (可选) 服务器交互地址
 *    - params (可选) 附加参数 如  mobile=true&type=01
 *    - validate (可选) 当需要实现单个字段保存时， 需要调用父类_validation, 参照ProductModel
 *
 * @class BaseModel - 模型类
 * @author yongjin<zjut_wyj@163.com> 2014/11/10
 */


var BaseModel = Backbone.Model.extend({
  defaults: { checked: false, children: [] },
  baseId: '',
  /**
   * 初始化请求连接, 判断是否为新对象， 否自动加上ID
   *
   * @method [private] - url
   * @private
   * @return {*}
   * @author wyj 14.11.16
   */
  url: function () {
    var base = this.baseUrl;
    var _url = '';
    if (!base) return '';
    if (Est.typeOf(base) === 'function')
      base = base.call(this);
    this.params = this.params ? this.params : '';
    var sep = Est.isEmpty(this.params) ? '' : '?';
    if (this.isNew() && Est.isEmpty(this.id)) return base + sep + this.params;
    _url = base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id + sep + this.params;
    debug(function () {
      return ('【Query】' + _url);
    });
    return _url;
  },
  /**
   * 模型类初始化
   *
   * @method [初始化] - _initialize ( 初始化 )
   * @author wyj 14.11.16
   * @example
   *      this._initialize();
   */
  _initialize: function (options) {
    this.validateMsg = null;
    debug('9.BaseModel._initialize ' + this.baseId);
  },
  /**
   * 过滤结果, 并提示信息对话框, 若不想提示信息可以设置hideTip为true
   * this.model.hideTip = true; // 无提示信息弹出框
   * this.model.hideOkBtn = true; // 隐藏保存按钮
   * this.model.autoHide = true; // 自动隐藏提示信息
   *
   * @method [private] - parse
   * @private
   * @param response
   * @param options
   * @return {*}
   * @author wyj 14.11.16
   */
  parse: function (response, options) {
    var ctx = this, buttons = [],
      _isNew = false;
    if ('msg' in response) Utils.removeLoading();

    if (Est.isEmpty(response)) {
      var url = Est.typeOf(this.url) === 'function' ? this.url() : this.url;
      debug('服务器返回的数据为空， 点击' + url + '是否返回数据？无？ 检查XxxModel中的baseUrl、baseId参数是否配置正确？还无？联系王进');
      BaseUtils.initTooltip('数据异常, 稍后请重试！');
      return false;
    }
    if (response.msg && !this.hideTip) {

      if (response.success) {
        if (ctx.isNew() && !this.autoHide) {
          buttons.push({ value: '继续添加', callback: function () {
            ctx.set('id', null);
            ctx.set(ctx.baseId, null);
          }});
          _isNew = true;
        }
        !this.hideOkBtn && buttons.push({ value: '确定', callback: function () {
          if (typeof window.topDialog != 'undefined') {
            window.topDialog.close(); // 关键性语句
            window.topDialog = null;
            $ && $(".btn-back").click();
          } else if (app.getDialogs().length > 0) {
            try {
              app.getDialogs().pop().close().remove();
              $ && $(".btn-back").click();
            } catch (e) {
            }
          }
          this.close();
        }, autofocus: true });
      } else {
        buttons.push({ value: '确定', callback: function () {
          this.close();
        }, autofocus: true });
      }
      Est.trigger('_dialog_submit_callback');
      var dialog_msg = BaseUtils.initDialog({
        id: 'dialog_msg',
        title: '提示：',
        content: response.msg,
        width: 250,
        button: buttons
      });
      setTimeout(function () {
        app.getDialog('dialog_msg') && (ctx.autoHide || !_isNew) &&
        app.getDialog('dialog_msg').close().remove();
      }, 2000);
    } else if ('msg' in response && Est.isEmpty(response.msg)) {
      debug('服务器返回的msg为空! 因此无弹出框信息。 url：' + this.baseUrl);
    }
    if (Est.typeOf(response.success) === 'boolean' && !response.success) {
      ctx.attributes._response = response;
      return ctx.attributes;
    }
    if (response.attributes && response.attributes.data) {
      var keys = Est.keys(response.attributes);
      if (keys.length > 1) {
        Est.each(keys, function (item) {
          if (item !== 'data')
            response.attributes['data'][item] = response.attributes[item];
        });
      }
      response = response.attributes.data;
    }
    if (response) {
      response.id = response[ctx.baseId || 'id'];
      response.checked = false;
      response.time = new Date().getTime();
    }
    return response;
  },


  /**
   * 保存模型类
   *
   * @method [保存] - _saveField ( 保存模型类 )
   * @param keyValue
   * @param ctx
   * @param options [success: 成功回调][async: 是否异步]
   * @author wyj 14.11.16
   * @example
   *        this.model._saveField({
       *          id: thisNode.get('id'),
       *          sort: thisNode.get('sort')
       *        }, ctx, { // ctx须初始化initModel
       *          success: function(){}, // 保存成功回调
       *          async: false, // 是否同步
       *          hideTip: false // 是否隐藏提示
       *          hideOkBtn: false // 是否隐藏确定按钮
       *        });
   */
  _saveField: function (keyValue, ctx, options) {
    var wait = options.async || true;
    var newModel = new ctx.initModel({
      id: keyValue.id || ctx.model.get('id')
    });
    newModel.clear();
    newModel.set(keyValue);
    newModel.set('silent', true);
    if (options.hideTip) newModel.hideTip = true;
    newModel.hideOkBtn = true;
    newModel.set('editField', true);
    debug(function () {
      if (!newModel.baseUrl) return '当前模型类未找到baseUrl, 请检查XxxModel中的baseUrl';
    }, {type: 'error'});
    if (newModel.baseUrl) {
      newModel.save(null, {
        success: function (model, result) {
          if (typeof options.success != 'undefined') {
            options.success.call(ctx, keyValue, result);
          }
        }, wait: wait
      });
    }
  },
  /**
   * 获取子模型
   *
   * @method [private] - _getChildren
   * @private
   * @return {*}
   * @author wyj 14.12.18
   */
  _getChildren: function (collection) {
    return _.map(this.get('children'), function (ref) {
      // Lookup by ID in parent collection if string/num
      if (typeof(ref) == 'string' || typeof(ref) == 'number')
        return collection.get(ref);
      // Else assume its a real object
      return ref;
    });
  },
  /**
   * 隐藏保存后的提示对话框
   *
   * @method [对话框] - _hideTip ( 隐藏提示对话框 )
   * @author wyj 15.1.29
   * @example
   *      this.model._hideTip();
   */
  _hideTip: function () {
    this.hideTip = true;
  },
  /**
   * 设置checkbox选择框状态
   *
   * @method [选取] - _toggle ( 设置checkbox选择框状态 )
   * @author wyj 14.11.16
   * @example
   *      this.model._toggle();
   */
  _toggle: function () {
    this.set('checked', !this.get('checked'));
  },
  /**
   * 预处理验证， 若模型类里有silent=true字段，则取消验证
   *
   * @method [验证] - _validate ( 预处理验证 )
   * @param attributes
   * @param callback
   * @author wyj 14.11.21
   * @example
   *        validate: function (attrs) {
       *          return this._validation(attrs, function (attrs) {
       *            if (!attrs.sort || attrs.sort < 0) {
       *            this.validateMsg = "sort不能为空";
       *          }
       *         });
       *        }
   */
  _validation: function (attributes, callback) {
    if (!attributes.silent && callback) {
      callback.call(this, attributes);
    }
    return this.validateMsg;
  },
  /**
   * 获取model值
   *
   * @method [获取] - _getValue ( 获取model值 )
   * @param path
   * @author wyj 15.1.30
   * @example
   *      this._getValue('tip.name');
   */
  _getValue: function (path) {
    return Est.getValue(this.attributes, path);
  },
  /**
   * 设置model值
   *
   * @method [设置] - _setValue ( 设置model值 )
   * @param path
   * @param val
   * @author wyj 15.1.30
   * @example
   *      this._setValue('tip.name', 'aaa');
   */
  _setValue: function (path, val) {
    Est.setValue(this.attributes, path, val);
  }
});
