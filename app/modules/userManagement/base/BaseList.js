/**
 * @description 基础列表视图
 * @namespace BaseList
 * @author yongjin<zjut_wyj@163.com> 2014/11/12
 */

define('BaseList', ['jquery', 'underscore', 'backbone', 'BaseUtils'],
  function (require, exports, module) {
    var BaseList, Backbone, BaseUtils;

    Backbone = require('backbone');
    BaseUtils = require('BaseUtils');

    BaseList = Backbone.View.extend({
      /**
       * 初始化
       *
       * @method [protected] - _initialize
       * @param options
       * @returns {ln.promise}
       * @private
       * @author wyj 14.11.20
       * @example
       *    var options = {
          render: '#product-list-ul',
          template: listTemp,
          model: ProductModel,
          collection: ProductCollection,
          item: ProductItem
        }
       this._initialize(options).then(function (context) {
          context._initPagination(options);
          context._load({
              beforeLoad: funciton(){
                this.setCategoryId(options.categoryId);
              }
          });
        });
       */
      _initialize: function (options) {
        return this._initCollection(options.collection, options);
      },
      /**
       * 初始化集合类
       *
       * @method [protected] - _initCollection
       * @param collection 对应的collection集合类， 如ProductCollection
       * @param options [beforeLoad: 加载数据前执行] [item: 集合单个视图] [model: 模型类]
       * @returns {ln.promise} 返回promise对象
       * @author wyj 14.11.16
       * @example
       *       this._initCollection(ProductCollection, {
                  template: viewTemp,
                  render: '#product-list-ul',
                  item: ProductItem, // item
                  model: ProductModel // model,
                  beforeLoad: function(){ // 加载数据前执行
                    this.setCategoryId(options.categoryId); // this 指向collection
                  }
               }).then(function (options) {
                  ctx.initPagination(options); // pagination init
                  ctx.load(options); // data load
              });
       */
      _initCollection: function (collection, options) {
        debug('1.ProductView._initialize');
        this._options = options || {};
        var ctx = this;
        var $q = Est.promise;
        this.dx = 0;
        this.views = [];
        this.$el.empty();
        if (this._options.template) this.$el.append($(this._options.template));
        this._data = this._options.data;
        if (this._options.enterRender) this._enterEvent();
        this.list = this._options.render ? $(this._options.render) : this.$el;
        this.allCheckbox = this.$('#toggle-all')[0];
        this._options.sortField = 'sort'; // 排序字段名称
        if (!this.collection) this.collection = new collection;
        //TODO 分类过滤
        if (this._options.subRender) this.composite = true;
        this._initItemView(this._options.item, this);
        this._initModel(this._options.model);
        this._initBind();
        if (this._options.items) {
          Est.each(this._options.items, function (item) {
            this.collection.push(new ctx.initModel(item));
          }, this);
        }
        return new $q(function (resolve) {
          resolve(ctx);
        });
      },
      /**
       * 渲染视图
       *
       * @method [protected] - _render
       * @author wyj 14.11.16
       */
      _render: function () {
        this._addAll();
        debug('BaseList._render');
      },
      /**
       * 过滤父级元素
       *
       * @method [protected] - _filterRoot
       * @private
       * @author wyj 14.12.9
       */
      _filterRoot: function () {
        var ctx = this;
        var temp = [];
        ctx.composite = false;
        ctx.collection.comparator = function (model) {
          return model.get('sort');
        }
        ctx.collection.sort();
        Est.each(ctx.collection.models, function (item) {
          temp.push({
            categoryId: item['attributes'][ctx._options.categoryId],
            belongId: item['attributes'][ctx._options.parentId]
          });
        });
        this.collection.each(function (thisModel) {
          var i = temp.length, _children = [];
          while (i > 0) {
            var item = temp[i - 1];
            if (item[ctx._options.parentId] === thisModel.get(ctx._options.categoryId)) {
              _children.unshift(item[ctx._options.categoryId]);
              temp.splice(i, 1);
            }
            i--;
          }
          thisModel.set('children', _children);
          // 添加父级元素
          if (thisModel.get('isroot') === '01') {
            ctx._addOne(thisModel);
          }
        });
        debug(ctx.collection);
      },
      /**
       * 向视图添加元素
       *
       * @method [private] - _addOne
       * @param model
       * @author wyj 14.11.16
       */
      _addOne: function (model) {
        var ctx = this;
        if (!this.filter && !this.composite) {
          model.set('dx', this.dx++);
          model.set('_options', {
            _item: ctx._options.item,
            _collection: ctx.collection,
            _subRender: ctx._options.subRender,
            _collapse: ctx._options.collapse
          });
          //app.setData('maxSort', model.get('dx') + 1);
          var itemView = new this.item({
            model: model,
            data: this._data
          });
          itemView._setInitModel(this.initModel);
          this.list.append(itemView._render().el);
          this.views.push(itemView);
        }
      },
      /**
       * 初始化分页
       *
       * @method [private] - _initPagination
       * @param options
       * @author wyj 14.11.17
       */
      _initPagination: function (options) {
        var ctx = this;
        if (ctx.collection && ctx.collection.paginationModel) {
          ctx.collection.paginationModel.on('reloadList', function (model) {
            ctx._load.call(ctx, options, model);
          });
        }
      },
      /**
       * 获取集合数据
       *
       * @method [protected] - _load
       * @param options [beforeLoad: 载入前方法][page: 当前页][pageSize: 每页显示条数]
       * @param model 分页模型类 或为全查必填
       * @author wyj 14.11.16
       * @example
       *
       */
      _load: function (options, model) {
        var ctx = this;
        var $q = Est.promise;
        options = options || {};
        return new $q(function (resolve, reject) {
          if (options.beforeLoad) {
            options.beforeLoad.call(ctx, ctx.collection);
          }
          options.page && ctx.collection.paginationModel.set('page', options.page);
          options.pageSize && ctx.collection.paginationModel.set('pageSize', options.pageSize);
          if (options.page || options.pageSize) {
            model = ctx.collection.paginationModel;
          }
          if (ctx.collection.url) {
            ctx.collection._load(ctx.collection, ctx, model).
              then(function (result) {
                if (ctx._options.subRender) {
                  ctx.composite = true;
                  ctx._filterRoot();
                }
                resolve(result);
              });
          }
        });
      },
      /**
       * 绑定事件， 如果添加事件， 重置事件
       * @method [private] - _initBind
       * @author wyj 14.11.16
       */
      _initBind: function () {
        if (this.collection) {
          //this.listenTo(this.collection, 'change:checked', this.checkSelect);
          //this.initModel.bind('change:children', this._render, this);
          this.collection.bind('add', this._addOne, this);
          this.collection.bind('reset', this._render, this);
        }
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
       * 初始化单个枚举视图
       *
       * @method [private] - _initItemView
       * @param itemView
       * @author wyj 14.11.16
       */
      _initItemView: function (itemView) {
        this.item = itemView;
      },
      /**
       * 初始化模型类, 设置index索引
       *
       * @method [private] - _initModel
       * @param model
       * @author wyj 14.11.20
       */
      _initModel: function (model) {
        this.initModel = model;
      },
      /**
       * 清空列表， 并移除所有绑定的事件
       *
       * @method [protected] - _empty
       * @author wyj 14.11.16
       */
      _empty: function () {
        this.dx = 0;
        debug('5.ProductView._empty');
        if (this.collection) {
          var len = this.collection.length;
          while (len > -1) {
            this.collection.remove(this.collection[len]);
            len--;
          }
        }
        // 设置当前页的起始索引， 如每页显示20条，第2页为20
        if (this.collection.paginationModel) {
          this.dx = this.collection.paginationModel.get('pageSize') *
            (this.collection.paginationModel.get('page') - 1);
        }
        //遍历views数组，并对每个view调用Backbone的remove
        Est.each(this.views, function (view) {
          view.off().remove();
        })
        //清空views数组，此时旧的view就变成没有任何被引用的不可达对象了
        //垃圾回收器会回收它们
        this.views = [];
        //this.list.empty();
      },
      /**
       * 添加所有元素， 相当于刷新视图
       *
       * @method [private] - _addAll
       * @author wyj 14.11.16
       */
      _addAll: function () {
        debug('ProductView._addAll');
        this._empty();
        this.collection.each(this._addOne, this);
      },
      /**
       * 搜索
       *
       * @method [protected] - _search
       * @param array
       * @param options [onBeforeAdd: 自定义过滤]
       * @author wyj 14.12.8
       * @example
       *    this._search([
       { key: 'name', value: this.searchKey },
       {key: 'prodtype', value: this.searchProdtype} ,
       {key: 'category', value: this.searchCategory},
       {key: 'loginView', value: this.searchLoginView},
       {key: 'ads', value: this.searchAds}
       ], {onBeforeAdd: function(item){
          if (pass && !Est.isEmpty(obj.value) &&
              item.attributes[obj.key].indexOf(obj.value) === -1) {
              ctx.collection.remove(item);
              pass = false;
              return false;
            }
       }});
       */
      _search: function (array, options) {
        var ctx = this;
        this.filter = true;
        options = options ||
        {onBeforeAdd: function () {
        }};
        this._load({ page: 1, pageSize: 5000 }).then(function () {
          ctx.filter = false;
          ctx._filter(array, options);
        });
      },
      /**
       * 过滤
       *
       * @method [private] - _filter
       * @param array
       * @param options
       * @private
       * @author wyj 14.12.8
       */
      _filter: function (array, options) {
        var ctx = this;
        Est.each(ctx.collection.models, function (item) {
          var pass = true;
          Est.each(array, function (obj) {
            if (pass && !Est.isEmpty(obj.value) && (!item.attributes[obj.key] ||
              item.attributes[obj.key].indexOf(obj.value) === -1)) {
              ctx.collection.remove(item);
              pass = false;
              return false;
            }
          });
          if (pass && options.onBeforeAdd) {
            options.onBeforeAdd.call(this, item);
          }
          if (pass) {
            ctx._addOne(item);
          }
        });
      },
      /**
       * 弹出查看详细信息对话框
       *
       * @method [protected] - _detail
       * @param options [title: 标题][width: 宽度][height: 高度]
       *                [url: 地址][hideSaveBtn: 隐藏保存按钮][hideResetBtn: 隐藏重置按钮]
       *                [oniframeload: 页面载入后回调， 参数为window对象]
       * @author wyj 14.11.16
       * @example
       *    this._detail({
              title: '产品添加',
              url: CONST.HOST + '/modules/product/product_detail.html?time=' + new Date().getTime()
            });
       */
      _detail: function (options) {
        debug('1.BaseList._detail');
        options = options || {};
        var ctx = this;
        seajs.use(['dialog-plus'], function (dialog) {
          window.dialog = dialog;
          var buttons = [];
          if (!options.hideSaveBtn) {
            buttons.push({
              value: '保存',
              callback: function () {
                this.title('正在提交..');
                this.iframeNode.contentWindow.$("#submit").click();
                return false;
              },
              autofocus: true
            });
          }
          if (!options.hideResetBtn) {
            buttons.push({
              value: '重置',
              callback: function () {
                this.iframeNode.contentWindow.$("#reset").click();
                return false;
              }
            });
          }
          buttons.push({ value: '关闭' });
          window.detailDialog = dialog({
            id: 'detail-dialog',
            title: options.title || '详细信息',
            height: options.height || 'auto',
            width: options.width || 850,
            url: options.url || '',
            button: buttons,
            oniframeload: function () {
              this.iframeNode.contentWindow.detailDialog = window.detailDialog;
              options.oniframeload && options.oniframeload.call(this, this.iframeNode.contentWindow);
              //this.iframeNode.contentWindow.maxSort = app.getData('maxSort');
            },
            onclose: function () {
              if (ctx._options.subRender) {
                ctx.composite = true;
              }
              ctx.collection._load(ctx.collection, ctx).
                then(function () {
                  if (ctx._options.subRender) {
                    ctx.composite = true;
                    ctx._filterRoot();
                  } else {
                    ctx._render();
                  }
                });
              this.remove();
              if (this.returnValue) {
                $('#value').html(this.returnValue);
              }
            }
          });
          window.detailDialog.showModal();
        });
      },
      /**
       * 全选checkbox选择框
       *
       * @method [protected] - _toggleAllChecked
       * @author wyj 14.11.16
       */
      _toggleAllChecked: function () {
        var checked = this.allCheckbox.checked;
        this.collection.each(function (product) {
          product.set('checked', checked);
        });
      },
      /**
       * 保存sort值
       *
       * @method [private] - _saveSort
       * @param model
       * @private
       * @author wyj 14.12.4
       */
      _saveSort: function (model) {
        var sortOpt = { id: model.get('id') }
        sortOpt[this._options.sortField || 'sort'] = model.get(this._options.sortField);
        model._saveField(sortOpt, this, { async: false, hideTip: true});
      },
      /**
       * 交换位置
       *
       * @method [private] - _exchangeOrder
       * @param original_index
       * @param new_index
       * @param options
       * @returns {BaseList}
       * @private
       * @author wyj 14.12.5
       */
      _exchangeOrder: function (original_index, new_index, options) {
        var tempObj = {}, nextObj = {};
        var temp = this.collection.at(original_index);
        var next = this.collection.at(new_index);
        // 互换dx
        var thisDx = temp.view.model.get('dx');
        var nextDx = next.view.model.get('dx');
        tempObj['dx'] = nextDx;
        nextObj['dx'] = thisDx;
        // 互换sort值
        if (options.path) {
          var thisValue = temp.view.model.get(options.path);
          var nextValue = next.view.model.get(options.path);
          tempObj[options.path] = nextValue;
          nextObj[options.path] = thisValue;
        }
        temp.view.model.set(tempObj);
        next.view.model.set(nextObj);
        // 交换model
        this.collection.models[new_index] = this.collection.models.splice(original_index, 1, this.collection.models[new_index])[0];
        // 交换位置
        if (original_index < new_index) {
          temp.view.$el.before(next.view.$el);
        } else {
          temp.view.$el.after(next.view.$el);
        }
        if (options.success) {
          options.success.call(this, temp, next);
        }
        return this
      },
      /**
       * 上移
       *
       * @method [public] - _moveUp
       * @param model
       * @private
       * @author wyj 14.12.4
       */
      _moveUp: function (model) {
        debug('_moveUp');
        var first = this.collection.indexOf(model);
        var last, parentId;
        var result = [];
        if (this._options.subRender) {
          parentId = model.get('belongId');
          this.collection.each(function (thisModel) {
            if (parentId === thisModel.get('belongId')) {
              result.push(thisModel);
            }
          });
          //TODO 找出下一个元素的索引值
          var thisDx = Est.findIndex(result, function (item) {
            return item.get('id') === model.get('id');
          });
          if (thisDx === 0) return;
          last = this.collection.indexOf(result[thisDx - 1]);
        } else {
          if (first === 0) return;
          last = first - 1;
        }
        model.stopCollapse = true;
        this._exchangeOrder(first, last, {
          path: this.sortField || 'sort',
          success: function (thisNode, nextNode) {
            if (thisNode.get('id') && nextNode.get('id')) {
              this._saveSort(thisNode);
              this._saveSort(nextNode);
              model.stopCollapse = false;
            }
          }
        });
      },
      /**
       * 下移
       *
       * @method [public] - _moveDown
       * @param model
       * @private
       * @author wyj 14.12.4
       */
      _moveDown: function (model) {
        debug('_moveDown');
        var first = this.collection.indexOf(model);
        var last, parentId;
        var result = [];
        if (this._options.subRender) {
          parentId = model.get('belongId');
          this.collection.each(function (thisModel) {
            if (parentId === thisModel.get('belongId')) {
              result.push(thisModel);
            }
          });
          //TODO 找出上一个元素的索引值
          var thisDx = Est.findIndex(result, function (item) {
            return item.get('id') === model.get('id');
          });
          if (thisDx === result.length - 1) return;
          last = this.collection.indexOf(result[thisDx + 1]);
        } else {
          if (first === this.collection.models.length - 1) return;
          last = first + 1;
        }
        model.stopCollapse = true;
        this._exchangeOrder(first, last, {
          path: this._options.sortField,
          success: function (thisNode, nextNode) {
            if (thisNode.get('id') && nextNode.get('id')) {
              this._saveSort(thisNode);
              this._saveSort(nextNode);
              model.stopCollapse = false;
            }
          }
        });
      },
      /**
       *  获取checkbox选中项
       *
       * @method [protected] - _getCheckboxIds
       * @returns {*}
       * @private
       * @author wyj 14.12.8
       */
      _getCheckboxIds: function () {
        var list = Est.pluck(Est.filter(this.collection.models, function (item) {
          return item.attributes.checked;
        }), 'id');
        if (list.length === 0) {
          BaseUtils.tip('至少选择一项');
          return;
        }
        return list;
      },
      /**
       * 设置参数
       *
       * @method [protected] - _setOption
       * @param obj
       * @returns {BaseList}
       * @private
       * @author wyj 14.12.12
       * @example
       *
       */
      _setOption: function (obj) {
        Est.extend(this._options, obj);
        return this;
      }
    });

    module.exports = BaseList;

  });