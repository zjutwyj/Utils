/**
 * @description Seo
 * @namespace Seo
 * @author yongjin<zjut_wyj@163.com> 2014/12/26
 */
define('SeoMobileDetail', ['SeoMobileModel', 'template/seo_detail'], function (require, exports, module) {
  var SeoMobileDetail, SeoMobileModel, template;

  SeoMobileModel = require('SeoMobileModel');
  template = require('template/seo_detail');

  SeoMobileDetail = BaseDetail.extend({
    events: {},
    initialize: function () {
      this._initialize({
        template: template,
        model: SeoMobileModel
      });
    },
    render: function () {
      this._render();
      this.model.hideOkBtn = true;
      this._form('#J_Form')._validate()._init({});
      return this;
    }
  });

  module.exports = SeoMobileDetail;
});