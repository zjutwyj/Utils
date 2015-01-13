/**
 * @description Seo
 * @namespace Seo
 * @author yongjin<zjut_wyj@163.com> 2014/12/26
 */
define('SeoDetail', ['BaseDetail', 'SeoModel'], function (require, exports, module) {
  var SeoDetail, BaseDetail, SeoModel;

  BaseDetail = require('BaseDetail');
  SeoModel = require('SeoModel');

  SeoDetail = BaseDetail.extend({
    events: {},
    initialize: function(){
      this._initialize({
        template: $('#template-seo').html(),
        model: SeoModel
      });
    },
    render: function(){
      this._render();
      this._form('#J_Form')._validate()._init({});
      return this;
    }
  });

  module.exports = SeoDetail;
});