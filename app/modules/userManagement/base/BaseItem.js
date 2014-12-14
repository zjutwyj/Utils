/**
 * @description 集合中的单个视图
 * @namespace BaseItem
 * @author yongjin<zjut_wyj@163.com> 2014.11.11
 */
define('BaseItem', ['jquery', 'underscore', 'backbone', 'dialog', 'HandlebarsHelper'],
  function (require, exports, module) {
    var Backbone, dialog, BaseItem, HandlebarsHelper;

    Backbone = require('backbone');
    dialog = require('dialog');
    HandlebarsHelper = require('HandlebarsHelper');

    BaseItem = Backbone.View.extend({
      /**
       * 初始化, 若该视图的子元素有hover选择符， 则自动为其添加鼠标经过显示隐藏事件
       *
       * @method [protected] - _initialize
       * @param {Object} options [template: 模板字符串]
       * @author wyj 14.11.16
       * @example
       *    initialize: function () {
              this._initialize({ template: itemTemp });
            },
       */
      _initialize: function (options) {
        var ctx = this;
        this._options = options || {};
        this.model.stopCollapse = false;
        this.collapsed = true;
        if (this._options.template) {
          this.template = HandlebarsHelper.compile(this._options.template);
        }
        this.model.bind('reset', this.render, this);
        this.model.bind('change', this.render, this);
        this.model.bind('destroy', this.remove, this);
        if (this.model.view) this.model.view.remove();
        this.model.view = this;
        if (this.model.get('dx') % 2 === 0) {
          this.$el.addClass('bui-grid-row-even');
        }
        this.$el.addClass('_item_el_' +
          this.model.get('id').replace(/^[^1-9]+/, ""));
        this.$el.hover(function () {
          ctx.$el.addClass('hover');
        }, function () {
          ctx.$el.removeClass('hover');
        });
        if (this._options.enterRender) this._enterEvent();
      },
      /**
       * 渲染
       *
       * @method [protected] - _render
       * @returns {BaseCollection}
       * @author wyj 14.11.18
       */
      _render: function () {
        debug('11.ProductItem._render [item display]');
        this._onBeforeRender();
        this.$el.html(this.template(this.model.toJSON()));
        //TODO
        var modelOptions = this.model.get('_options');
        if (modelOptions._subRender && this.model.get('children') &&
          this.model.get('children').length > 0) {
          // Build child views, insert and render each
          var ctx = this;
          var childView = null;
          var tree = this.$(modelOptions._subRender + ':first');
          this._setupEvents(modelOptions);
          _.each(this.model._getChildren(modelOptions._collection), function (newmodel) {
            newmodel.set('_options', modelOptions);
            childView = new modelOptions._item({
              model: newmodel,
              data: ctx._options._data
            });
            childView._setInitModel(ctx.initModel);
            tree.append(childView.$el);
            childView._render();
          });
          /* Apply some extra styling to views with children */
          if (childView) {
            // Add bootstrap plus/minus icon
            //this.$('> .node-collapse').prepend($('<i class="icon-plus"/>'));
            // Fixup css on last item to improve look of tree
            //childView.$el.addClass('last-item').before($('<li/>').addClass('dummy-item'));
          }
        }
        this._onAfterRender();
        return this;
      },
      /**
       * 设置模型类
       * @method [private] - _setInitModel
       * @param model
       * @author wyj 14.11.20
       */
      _setInitModel: function (model) {
        this.initModel = model;
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
       * 绑定展开收缩事件
       *
       * @method [private] - _setupEvents
       * @private
       * @author wyj 14.12.9
       */
      _setupEvents: function (opts) {
        // Hack to get around event delegation not supporting ">" selector
        var that = this;
        that._toggleCollapse(opts);
        this.$(opts._collapse + ':first').click(function () {
          return that._toggleCollapse(opts);
        });
      },
      /**
       * 展开收缩
       *
       * @method [private] - _toggleCollapse
       * @private
       * @author wyj 14.12.9
       */
      _toggleCollapse: function (opts) {
        if (this.model.stopCollapse) return;
        this.collapsed = !this.collapsed;
        if (this.collapsed) {
          this.$(opts._collapse + ':first').removeClass('x-caret-down');
          this.$(opts._subRender + ':first').slideUp(CONST.COLLAPSE_SPEED);
        }
        else {
          this.$(opts._collapse + ':first').addClass('x-caret-down');
          this.$(opts._subRender + ':first').slideDown(CONST.COLLAPSE_SPEED);
        }
      },
      /**
       * 渲染前事件
       *
       * @method [protected] - _onBeforeRender
       * @private
       * @author wyj 14.12.3
       */
      _onBeforeRender: function () {
        return new Est.promise(function (resolve) {

        });
      },
      /**
       * 渲染后事件
       *
       * @method [protected] - _onAfterRender
       * @private
       * @author wyj 14.12.3
       */
      _onAfterRender: function () {
        return new Est.promise(function (resolve) {

        });
      },
      /**
       * 移除监听
       *
       * @method [protected] - _close
       * @author wyj 14.11.16
       */
      _close: function () {
        debug('BaseItem._close');
        this.stopListening();
      },
      /**
       * 移除此模型
       *
       * @method [protected] - _clear
       * @author wyj 14.11.16
       */
      _clear: function () {
        debug('ProductItem._clear');
        this.model.destroy();
      },
      /**
       * checkbox选择框转换
       *
       * @method [protected] - _toggleChecked
       * @author wyj 14.11.16
       */
      _toggleChecked: function () {
        this.model.set('checked', !this.model.get('checked'));
        if (this.model.get('checked')){
          this._itemActive({
            add: true
          });
        } else { this.$el.removeClass('item-active'); }
      },
      /**
       * 添加当前ITEM的CLASS为item-active
       *
       * @method [protected] - _itemActive
       * @param options [add: true 是否为添加模式]
       * @private
       * @author wyj 14.12.13
       */
      _itemActive: function(options){
        options = options || {};
        var list = app.getData('itemActiveList');
        if (!options.add){
          Est.each(list, function(selecter){
            $('.' + selecter).removeClass('item-active');
          }); list.length = 0;
        }
        this.$el.addClass('item-active');
        list.push(this.$el.attr('class').replace(/^.*(_item_el_.+?)\s+.*$/g, "$1"));
      },
      /**
       * 单个字段保存
       *
       * @method [protected] - _editField
       * @param options [title: 标题][field: 字段名][target: 选择符(对话框指向于哪个元素)]
       * @param context
       * @returns {ln.promise}
       * @author wyj 14.11.16
       */
      _editField: function (options, context) {
        var $q = Est.promise;
        return new $q(function (resolve, reject) {
          //context.model.fetch();
          var dialog = require('dialog');
          var oldName = context.model.attributes[options.field];
          var d = dialog({
            title: options.title || '修改',
            content: '<input id="property-returnValue-demo" type="text" class="text" value="' + oldName + '" />',
            button: [
              {
                value: '确定',
                autofocus: true,
                callback: function () {
                  var value = $('#property-returnValue-demo').val();
                  this.close(value);
                  this.remove();
                }}
            ]
          });
          d.addEventListener('close', function () {
            var obj = {};
            var val = context.model.previous(options.field);
            if (this.returnValue.length >= 1 && this.returnValue !== val) {
              obj.id = context.model.get('id');
              obj[options.field] = this.returnValue;
              context.model._saveField(obj, context, {
                success: function (keyValue, result) {
                  context.model.set(keyValue);
                }
              });
              resolve(context, this.returnValue);
            }
          });
          d.show(context.$(options.target || 'div').get(0));
        });
      },
      /**
       *  删除模型类
       *
       *  @method [protected] - _del
       *  @author wyj 14.11.16
       */
      _del: function (e) {
        e.stopImmediatePropagation();
        debug('1.BaseItem._del');
        var context = this;
        seajs.use(['dialog-plus'], function (dialog) {
          dialog({
            title: '提示',
            content: '是否删除！',
            width: 150,
            button: [
              {
                value: '确定',
                autofocus: true,
                callback: function () {
                  context.model.destroy();
                }},
              {
                value: '取消',
                callback: function () {
                  this.close();
                }
              }
            ]
          }).show(context.$el.find('.delete').get(0));
        });
      },
      /**
       * 修改模型类
       *
       * @method [protected] - _edit
       * @param options [title: 标题][width: 宽度][height: 高度]
       *                [url: 地址][reload: 关闭后是否重新从服务器获取数据][close: 关闭回调方法]
       *                [hideSaveBtn: 隐藏保存按钮][hideResetBtn: 隐藏重置按钮][oniframeload: 页面载入后回调]
       * @author wyj 14.11.16
       */
      _edit: function (options) {
        debug('1.BaseItem._edit');
        var ctx = this;
        this._itemActive();
        seajs.use(['dialog-plus'], function (dialog) {
          window.dialog = dialog;
          var buttons = [];
          if (!options.hideSaveBtn) buttons.push({
            value: '保存',
            callback: function () {
              this.title('正在提交..');
              this.iframeNode.contentWindow.$("#submit").click();
              return false;
            },
            autofocus: true
          });
          if (!options.hideResetBtn) buttons.push({
            value: '重置',
            callback: function () {
              this.iframeNode.contentWindow.$("#reset").click();
              return false;
            }
          });
          buttons.push({ value: '关闭' });
          window.detailDialog = dialog({
            id: 'edit-dialog',
            title: options.title || '提示',
            width: options.width || 850,
            height: options.height || 'auto',
            url: options.url,
            button: buttons,
            oniframeload: function () {
              var load = options.oniframeload || function(){};
              this.iframeNode.contentWindow.detailDialog = window.detailDialog;
              load.call(this, this.iframeNode.contentWindow);
            },
            onclose: function () {
              ctx.model.set(Est.cloneDeep(window.model));
              if (options.reload) ctx.model.fetch();
              if (options.close) options.close.call(this);
              this.remove();
              window.model = {};
            }
          });
          window.detailDialog.showModal();
        });
      }
    });

    module.exports = BaseItem;
  });