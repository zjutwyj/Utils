/**
 * @description 基础集合类
 * @class BaseCollection
 * @author yongjin<zjut_wyj@163.com> 2014/11/6
 */
define('BaseCollection', ['jquery', 'underscore', 'backbone'], function (require, exports, module) {
  var Backbone, BaseCollection, PaginationModel;

  Backbone = require('backbone');
  PaginationModel = Backbone.Model.extend({
    defaults: { page: 1, pageSize: 16, count: 0 },
    initialize: function () {
      debug('3.PaginationModel.initialize');
    }
  });

  BaseCollection = Backbone.Collection.extend({
    //localStorage: new Backbone.LocalStorage('base-collection'),
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
      Backbone.Collection.apply(this, [null, arguments]);
    },
    /**
     * 初始化
     *
     * @method [override] - _initialize
     * @author wyj 14.11.16
     * @example
     *      this._initialize();
     */
    _initialize: function () {
      debug('2.BaseCollection._initialize');
      this._baseUrl = this.url;
      if (!this.paginationModel) {
        this.paginationModel = new PaginationModel({
          page: this.options.page,
          pageSize: this.options.pageSize
        });
      }
    },
    /**
     * 处理url 与 分页
     *
     * @method [private] - _parse
     * @private
     * @param resp
     * @param xhr
     * @return {attributes.data|*}
     * @author wyj 14.11.16
     */
    parse: function (resp, xhr) {
      var ctx = this;
      if (Est.isEmpty(resp)) {
        debug(function () {
          var url = Est.typeOf(ctx.url) === 'function' ? ctx.url() : ctx.url;
          return ('服务器返回的数据为空， 点击' + url + '是否返回数据？无？ 检查XxxCollection中的url参数是否配置正确？');
        }, {type: 'error'});
        return [];
      }
      this._parsePagination(resp);
      this._parseUrl(this.paginationModel);
      //TODO this.options.pagination 防止被其它无分页的列表覆盖
      if (this.options.pagination && this.paginationModel) {
        this._paginationRender();
      }
      return resp.attributes.data;
    },
    /**
     * 处理url地址， 加上分页参数
     *
     * @method [private] - _parseUrl
     * @private
     * @param model
     * @author wyj 14.11.16
     */
    _parseUrl: function (model) {
      debug('- BaseCollection._parseUrl');
      var page = 1, pageSize = 16;
      if (model && model.get('pageSize')) {
        pageSize = model.get('pageSize');
        page = model.get('page');
      }
      if (this.options.subRender) {
        page = 1;
        pageSize = 9000;
      }
      if (typeof this.url !== 'function') {
        var end = '';
        if (!Est.isEmpty(this._itemId)) end = '/' + this._itemId;
        this.url = this._baseUrl + end + '?page=' + page + '&pageSize=' + pageSize;
      }
    },
    /**
     * 设置分页模型类
     *
     * @method [private] - _parsePagination
     * @private
     * @param resp
     * @author wyj 14.11.16
     */
    _parsePagination: function (resp) {
      debug('6.BaseCollection._parsePagination');
      resp.attributes = resp.attributes ||
      { page: 1, per_page: 10, count: 10 };
      if (this.paginationModel) {
        this.paginationModel.set('page', resp.attributes.page);
        this.paginationModel.set('pageSize', resp.attributes.per_page);
        this.paginationModel.set('count', resp.attributes.count);
      }
    },
    /**
     * 渲染分页
     *
     * @method [private] - _paginationRender
     * @private
     * @author wyj 14.11.16
     */
    _paginationRender: function () {
      var ctx = this;
      seajs.use(['Pagination'], function (Pagination) {
        if (!ctx.pagination) {
          ctx.pagination = new Pagination({
            el: "#pagination-container",
            model: ctx.paginationModel
          });
        } else {
          ctx.pagination.render();
        }
      });
    },
    /**
     * 加载列表
     *
     * @method [private] - _load
     * @private
     * @param instance 实例对象
     * @param context 上下文
     * @param model 模型类
     * @return {ln.promise} 返回promise
     * @author wyj 14.11.15
     * @example
     *      if (this.collection.url){
       *             this.collection._load(this.collection, this, model)
       *                 .then(function(result){
       *                     resolve(result);
       *                 });
       *         }
     */
    _load: function (instance, context, model) {
      debug('4.BaseCollection._load');
      //if (!Est.isEmpty(this.itemId)) this.url = this.url + '/' + this.itemId;
      this._parseUrl(model);
      return instance.fetch({success: function () {
        //resolve(instance);
        debug('5.collection reset');
        context.collection._reset();
        context._empty();
      }});
      /* var $q = Est.promise;
       return new $q(function (resolve) {

       });*/
    },
    /**
     * 设置itemId
     *
     * @method [public] - _setItemId
     * @param itemId
     * @author wyj 14.12.16
     * @example
     *        this._setItemId('Category00000000000000000032');
     */
    _setItemId: function (itemId) {
      this._itemId = itemId;
      debug('- 根据ID查列表' + this._itemId);
    },
    /**
     * 清空列表
     *
     * @method [private] - _empty
     * @private
     * @author wyj 14.11.15
     */
    _empty: function () {
      debug('BaseCollection._empty');
      if (this.collection) {
        var len = this.collection.length;
        while (len > -1) {
          this.collection.remove(this.collection[len]);
          len--;
        }
      }
    }
  });

  module.exports = BaseCollection;
});