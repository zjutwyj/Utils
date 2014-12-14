/**
 * @description BaseComposite
 * @namespace BaseComposite
 * @author yongjin<zjut_wyj@163.com> 2014/12/9
 */
define('BaseComposite', ['BaseCollection'], function (require, exports, module) {
  var BaseComposite, BaseCollection;

  BaseCollection = require('BaseCollection');

  BaseComposite = BaseCollection.extend({
    _initialize: function () {
      this._parseUrl();
    },
    parse: function (resp, xhr) {
      this._parseUrl();
      return resp.attributes.data;
    },
    /**
     * 处理url地址， 全查
     *
     * @method [private] - _parseUrl
     * @param model
     * @author wyj 14.11.16
     */
    _parseUrl: function (model) {
      if (typeof this.url !== 'function') {
        this.url = this.url.substring(0, this.url.indexOf('?') > -1 ?
          this.url.lastIndexOf("?") :
          this.url.length) + '?page=1&pageSize=5000';
      }
    },
    _load: function (instance, context, model) {
      var $q = Est.promise;
      return new $q(function (resolve) {
        return instance.fetch({success: function () {
          resolve(instance);
          context.collection._reset();
          context._empty();
        }});
      });
    }
  });

  module.exports = BaseComposite;

});
