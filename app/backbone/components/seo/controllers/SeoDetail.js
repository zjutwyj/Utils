/**
 * @description Seo
 * @namespace Seo
 * @author yongjin<zjut_wyj@163.com> 2014/12/26
 */
define('SeoDetail', ['SeoModel', 'template/seo_detail'],
  function (require, exports, module) {
    var SeoDetail, SeoModel, template;

    SeoModel = require('SeoModel');
    template = require('template/seo_detail');

    SeoDetail = BaseDetail.extend({
      events: {},
      initialize: function () {
        this._initialize({
          template: template,
          model: SeoModel
        });
      },
      render: function () {
        this._render();
        this.model.hideOkBtn = true;
        this._form('#J_Form')._validate()._init({});
        return this;
      }
    });

    module.exports = SeoDetail;
  });