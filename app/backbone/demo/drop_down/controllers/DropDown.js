/**
 * @description DropDown
 * @class DropDown
 * @author yongjin<zjut_wyj@163.com> 2015/1/27
 */
define('DropDown', ['BaseView'], function (require, exports, module) {
  var DropDown, BaseView;

  BaseView = require('BaseView');

  DropDown = BaseView.extend({
    initialize: function () {
      this._initialize({
        template: ''
      });
      this.render();
    },
    render: function () {
      this._render();
    }
  });

  module.exports = DropDown;
});