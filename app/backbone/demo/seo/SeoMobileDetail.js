/**
 * @description Seo
 * @namespace Seo
 * @author yongjin<zjut_wyj@163.com> 2014/12/26
 */
define('SeoMobileDetail', ['BaseDetail', 'SeoMobileModel'], function (require, exports, module) {
  var SeoMobileDetail, BaseDetail, SeoMobileModel;

  BaseDetail = require('BaseDetail');
  SeoMobileModel = require('SeoMobileModel');

  SeoMobileDetail = BaseDetail.extend({
    events: {},
    initialize: function(){
      this._initialize({
        template: $('#template-seo').html(),
        model: SeoMobileModel
      });
    },
    render: function(){
      this._render();
      this._form('#J_Form')._validate()._init({});
      return this;
    }
  });

  module.exports = SeoMobileDetail;
});