/**
 * @description QrCode
 * @class QrCode
 * @author yongjin<zjut_wyj@163.com> 2015/1/30
 */
define('QrCode', ['BaseView'], function (require, exports, module) {
  var QrCode, BaseView;

  BaseView = require('BaseView');

  QrCode = BaseView.extend({
    initialize: function () {
      this.options.width = this.options.width || 250;
      this.options.url = this.options.url || CONST.DOMAIN;
      this._initialize({
        template: '<img src="http://qr.liantu.com/api.php?w=' + this.options.width + '&text="' + this.options.url + '">'
      });
      this.render();
    },
    render: function () {
      this._render();
    }
  });

  module.exports = QrCode;
});