/**
 * @description 集合中的单个视图
 *
 *  - tagName
 *  - className (可选)
 *  - events: {
 *        'click .toggle': '_toggleChecked', // 全选
 *        'click .edit': '_edit', // 编辑
 *        'click .delete': '_del', // 删除
 *        'click .move-up': '_moveUp', // 上移
 *        'click .move-down': '_moveDown', // 下移
 *        'change .input-sort': '_saveSort' // 保存sort 注： 当字段不为sort时， 此方法不适用， 参照AttributesList中的changeSort方法
 *       }
 *  - initialize 实现父类_initialize   _onAfterRender (可选) ：渲染后执行的方法
 *  - render 实现父类_render
 *
 * @class BaseItem - 集合中的单个视图
 * @author yongjin<zjut_wyj@163.com> 2014.11.11
 */
define('BaseItem', ['SuperView', 'dialog', 'HandlebarsHelper', 'BaseUtils'],
  function (require, exports, module) {
    var SuperView, dialog, BaseItem, HandlebarsHelper, BaseUtils;

    dialog = require('dialog');
    SuperView = require('SuperView');
    HandlebarsHelper = require('HandlebarsHelper');
    BaseUtils = require('BaseUtils');

    BaseItem = SuperView.extend({
      /**
       * 初始化, 若该视图的子元素有hover选择符， 则自动为其添加鼠标经过显示隐藏事件
       *
       * @method [override] - _initialize
       * @param {Object} options [template: 模板字符串]
       * @author wyj 14.11.16
       * @example
       *        this._initialize({
       *            template: itemTemp, // 模板字符串
       *            // 可选
       *            modelBind: false, // 绑定模型类， 比如文本框内容改变， 模型类相应改变; 当元素为checkbox是， 需设置true-value="01" false-value="00",
       *            若不设置默认为true/false
       *            detail: '', // 修改或添加页面地址
       *            filter: function(model){ // 过滤模型类
       *            },
       *            enterRender: '#submit' // 执行回车后的按钮点击的元素选择符
       *        });
       */
      _initialize: function (options) {
        var ctx = this;
        this._options = options || {};
        this.model.stopCollapse = false;

        /* debug(function () {
         if (ctx.model instanceof Backbone.Model) {
         return 'XxxCollection中缺少model参数， 请检查是否加入model? 当前视图为： '+ ctx.options.viewId;
         }
         }, {type: 'error'});*/
        Est.extend(this._options, this.options);
        this.collapsed = this.model.get('_options') ? this.model.get('_options')._extend : false;
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
        var item_id = this.model.get('id') || '';

        this.$el.addClass('_item_el_' + item_id.replace(/^[^1-9]+/, ""));
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
       * @method [override] - _render
       * @return {BaseCollection}
       * @author wyj 14.11.18
       */
      _render: function () {
        debug('10.BaseItem._render');
        this._onBeforeRender();
        if (this._options && this._options.filter)
          this._options.filter.call(this, this.model);
        this.$el.html(this.template(this.model.toJSON()));
        if (this._options.modelBind) this._modelBind();
        //TODO
        var modelOptions = this.model.get('_options');
        if (modelOptions._subRender && this.model.get('children') &&

          this.model.get('children').length > 0) {
          // Build child views, insert and render each
          var ctx = this;
          var childView = null;
          var level = this.model.get('level') || 1;

          var tree = this.$(modelOptions._subRender + ':first');
          this._setupEvents(modelOptions);

          _.each(this.model._getChildren(modelOptions._collection), function (newmodel) {
            if (modelOptions._items) {
              newmodel = new modelOptions._model(newmodel);
            }
            debug(function () {
              if (Est.isEmpty(newmodel)) {
                return '相关的模型类中是否正确定义baseId？ 如拼写错误、未定义等';
              }
            }, {type: 'error'});
            newmodel.set('_options', modelOptions);
            newmodel.set('level', level + 1);

            childView = new modelOptions._item({
              model: newmodel,
              data: ctx._options._data
            });
            childView._setInitModel(ctx.initModel);
            childView._setViewId(ctx._options.viewId);
            tree.append(childView.$el);
            if (ctx._options.views) {
              ctx._options.views.push(childView);
            }
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
       * 设置viewId
       *
       * @method [private] - _setViewId
       * @private
       * @param name
       * @private
       * @author wyj 14.12.20
       */
      _setViewId: function (name) {
        this._options.viewId = name;
      },
      /**
       * 设置模型类
       * @method [private] - _setInitModel
       * @private
       * @param model
       * @author wyj 14.11.20
       */
      _setInitModel: function (model) {
        this.initModel = model;
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
        that._toggleCollapse.call(this, opts);
        this.$(opts._collapse + ':first').click(function () {
          that._toggleCollapse.call(that, opts);
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
        var ctx = this;
        if (this.model.stopCollapse) return;
        ctx.collapsed = !ctx.collapsed;

        if (ctx.collapsed) {
          this.$(opts._collapse + ':first').removeClass('x-caret-down');
          this.$(opts._subRender + ':first').slideUp(CONST.COLLAPSE_SPEED).addClass('hide');
        }
        else {
          this.$(opts._collapse + ':first').addClass('x-caret-down');
          this.$(opts._subRender + ':first').slideDown(CONST.COLLAPSE_SPEED).removeClass('hide');
        }
      },
      /**
       * 渲染前事件
       *
       * @method [private] - _onBeforeRender
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
       * @method [private] - _onAfterRender
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
       * @method [private] - _close
       * @private
       * @author wyj 14.11.16
       */
      _close: function () {
        debug('BaseItem._close');
        this.stopListening();
      },
      /**
       * 移除此模型
       *
       * @method [private] - _clear
       * @private
       * @author wyj 14.11.16
       */
      _clear: function () {
        debug('ProductItem._clear');
        this.model.destroy();
      },
      /**
       * checkbox选择框转换
       *
       * @method [public] - _toggleChecked
       * @author wyj 14.11.16
       * @example
       *      itemClick: function(e){
       *        e.stopImmediatePropagation();
       *        this.loadPhoto();
       *        this._toggleChecked(e);
       *      }
       */
      _toggleChecked: function (e) {
        this._checkAppend = typeof this.model.get('_options')._checkAppend === 'undefined' ? true :
          this.model.get('_options')._checkAppend
        this.model.set('checked', this._checkAppend ? !this.model.get('checked') : true);

        if (this.model.get('checked')) {
          this._itemActive({
            add: this._checkAppend
          });
        } else {
          this.$el.removeClass('item-active');
        }
        //TODO shift + 多选
        if (e.shiftKey) {
          var beginDx = app.getData('curChecked');
          var endDx = this.model.collection.indexOf(this.model);
          Est.each(this.model.collection.models, function (model) {
            if (model.get('dx') > beginDx && model.get('dx') < endDx) {
              model.set('checked', true);
              model.view.$el.addClass('item-active');
            }
          });
        } else {
          app.addData('curChecked', this.model.collection.indexOf(this.model));
        }
        e && e.stopImmediatePropagation();
      },
      /**
       * 添加当前ITEM的CLASS为item-active
       *
       * @method [public] - _itemActive
       * @param options [add: true 是否为添加模式]
       * @private
       * @author wyj 14.12.13
       * @example
       *        this._itemActive();
       */
      _itemActive: function (options) {
        options = options || {};

        var list = app.getData('itemActiveList');
        if (!options.add) {
          Est.each(list, function (selecter) {
            var node = $('.' + selecter);
            //TODO 当为单选时
            //node.find('.toggle:first').click();
            node.removeClass('item-active');
          });
          list.length = 0;
        }
        this.$el.addClass('item-active');

        list.push(this.$el.attr('class').replace(/^.*(_item_el_.+?)\s+.*$/g, "$1"));
      },
      /**
       * 上移
       *
       * @method [private] - _moveUp
       * @private
       * @param e
       * @author wyj 14.12.14
       */
      _moveUp: function (e) {
        e.stopImmediatePropagation();
        this._itemActive();
        this.collapsed = true;
        if (!this._options.viewId) {
          debug('当前视图viewId不存在，无法完成上移操作，检查new XxxList({})options中的viewId是否定义？', { type: 'error' });
          return false;
        }
        app.getView(this._options.viewId)._moveUp(this.model);
      },
      /**
       * 下移
       *
       * @method [private] - _moveDown
       * @param e
       * @private
       * @author wyj 14.12.14
       */
      _moveDown: function (e) {
        e.stopImmediatePropagation();
        this._itemActive();
        this.collapsed = true;
        if (!this._options.viewId) {
          debug('当前视图viewId不存在，无法完成下移操作，检查new XxxList({})options中的viewId是否定义？', {
            type: 'error'
          });
          return false;
        }
        app.getView(this._options.viewId)._moveDown(this.model);
      },
      /**
       * 保存sort排序
       *
       * @method [private] - _saveSort
       * @private
       * @author wyj 14.12.14
       */
      _saveSort: function () {
        var ctx = this;
        var sort = this.$('.input-sort').val();
        this.model._saveField({ id: this.model.get('id'), sort: sort
        }, ctx, { success: function () {
          ctx.model.set('sort', sort);
        }, hideTip: true
        });
      },
      /**
       * 获取当前列表第几页
       *
       * @method [public] - _getPage
       * @return {*}
       * @author wyj 14.12.31
       *
       */
      _getPage: function () {
        var paginationModel = this.model.collection.paginationModel;
        if (!paginationModel) return 1;
        return paginationModel.get('page');
      },
      /**
       * 显示更多按钮
       * @method [public] _more
       * @param e
       * @author wyj 15.1.16
       */
      _more: function (e) {
        e.stopImmediatePropagation();
        this.$more = e.target ? $(e.target) : $(e.currentTarget);
        if (!this.$more.hasClass('btn-more')) this.$more = this.$more.parents('.btn-more:first');
        this.$moreOption = this.$more.parent().find('.moreOption');
        this.$icon = this.$more.find('i');
        if (this.$icon.hasClass('icon-chevron-left')) {
          this.$icon.removeClass('icon-chevron-left');
          this.$icon.addClass('icon-chevron-down');
          this.$moreOption.hide();
        } else {
          this.$icon.removeClass('icon-chevron-down');
          this.$icon.addClass('icon-chevron-left');
          this.$moreOption.show().css({
            top: this.$more.position().top,
            right: 37,
            position: 'absolute',
            background: '#fff',
            width: '100%',
            textAlign: 'right',
            "padding-bottom": 2
          });
        }
        $(window).one('click', function () {
          $('.moreOption').hide();
          $('.btn-more').find('i').removeClass('icon-chevron-left');
          $('.btn-more').find('i').addClass('icon-chevron-down');
        });
      },
      /**
       * 单个字段保存
       *
       * @method [public] - _editField
       * @param options [title: 标题][field: 字段名][target: 选择符(对话框指向于哪个元素)]
       * @return {ln.promise}
       * @author wyj 14.11.16
       * @example
       *        this._editField({
       *          title: '修改相册名称',
       *          field: 'name',
       *          target: '.album-name'
       *        });
       */
      _editField: function (options) {
        var ctx = this;
        var $q = Est.promise;
        app.getData('editFieldDialog') && app.getData('editFieldDialog').close();
        return new $q(function (resolve, reject) {
          //context.model.fetch();
          var dialog = require('dialog');
          var oldName = ctx.model.attributes[options.field];
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
            var val = ctx.model.previous(options.field);
            if (this.returnValue.length >= 1 && this.returnValue !== val) {
              obj.id = ctx.model.get('id');
              obj[options.field] = this.returnValue;
              ctx.model._saveField(obj, ctx, {
                success: function (keyValue, result) {
                  ctx.model.set(keyValue);
                }
              });
              resolve(ctx, this.returnValue);
            }
          });
          d.show(ctx.$(options.target || 'div').get(0));
          app.addData('editFieldDialog', d);
        });
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
       *  删除模型类
       *
       *  @method [private] - _del
       *  @private
       *  @author wyj 14.11.16
       */
      _del: function (e) {
        e && e.stopImmediatePropagation();
        debug('1.BaseItem._del');
        var context = this;
        app.getData('delItemDialog') && app.getData('delItemDialog').close();
        if (this.model.get('children').length > 0) {
          BaseUtils.comfirm({
            title: '提示',
            width: 300,
            content: '该分类下还有子分类， 请先删除！ 提示：当存在与之相关联的产品、新闻等等，也无法删除'
          });
          return;
        }
        app.addData('delItemDialog', BaseUtils.comfirm({
          title: '温馨提示',
          content: '是否删除?',
          target: context.$el.find('.delete').get(0),
          success: function () {
            context.model.destroy({
              wait: true
            });
          }
        }));
      },
      /**
       * 修改模型类
       *
       * @method [private] - _edit
       * @private
       * @param options [title: 标题][width: 宽度][height: 高度]
       *                [url: 地址][reload: 关闭后是否重新从服务器获取数据][close: 关闭回调方法]
       *                [hideSaveBtn: 隐藏保存按钮][hideResetBtn: 隐藏重置按钮][oniframeload: 页面载入后回调]
       * @author wyj 14.11.16
       */
      _edit: function (options) {
        debug('1.BaseItem._edit');
        var ctx = this;
        this._itemActive();
        options = Est.extend({}, options);
        // 如果是搜索结果列表时， 使用dialog形式
        options.route = ctx._options.route || options.route;
        if (!this.model.get('_isSearch') && options.route) {
          this._navigate(options.route + '/' + Est.encodeId(ctx.model.get('id')), true);
        } else {
          seajs.use(['dialog-plus'], function (dialog) {
            window.dialog = dialog;
            var buttons = [];
            if (!options.hideSaveBtn) buttons.push({
              value: '保存',
              callback: function () {
                this.title(CONST.SUBMIT_TIP);
                this.iframeNode.contentWindow.$("#submit").click();
                return false;
              },
              autofocus: true
            });
            /*if (!options.hideResetBtn) buttons.push({
             value: '重置',
             callback: function () {
             this.iframeNode.contentWindow.$("#reset").click();
             return false;
             }
             });*/
            buttons.push({ value: '关闭' });
            window.detailDialog = dialog({
              id: 'edit-dialog',
              title: options.title || '修改',
              width: options.width || 1000,
              height: options.height || 'auto',
              url: options.url || ctx._options.detail +
                '?id=' + ctx.model.id,
              button: buttons,
              oniframeload: function () {
                var load = options.load || function () {
                };
                this.iframeNode.contentWindow.topDialog = window.detailDialog;
                this.iframeNode.contentWindow.app = app;
                delete app.getRoutes()['index'];
                load.call(this, this.iframeNode.contentWindow);
                //BaseUtils.resetIframe('');
              },
              onclose: function () {
                ctx.model.set(Est.cloneDeep(window.model));
                if (options.reload) ctx.model.fetch({
                  wait: true,
                  success: function () {
                    ctx.model.reset && ctx.model.reset();
                  }
                });
                if (options.close) options.close.call(this);
                this.remove();
                window.detailDialog = null;
                window.model = {};
              }
            });
            window.detailDialog.showModal();
          });
        }
      }
    });

    module.exports = BaseItem;
  });