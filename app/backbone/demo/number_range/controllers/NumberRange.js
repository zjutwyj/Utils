/**
 * @description NumberRange
 * @class NumberRange
 * @author yongjin<zjut_wyj@163.com> 2015/4/10
 */
define('NumberRange', ['BaseView'], function (require, exports, module) {
  var NumberRange, BaseView;

  BaseView = require('BaseView');

  NumberRange = BaseView.extend({
    events: {
      'click .btn-number-minus': 'minus',
      'click .btn-number-plus': 'plus',
      'change .input-sort': 'inputChange'
    },
    initialize: function () {
      this.number = this.options.number || 0;
      this.options.data = this.options.data || {};
      if (this.options.target) {
        this.options.data.number = parseInt($(this.options.target).val(), 10);
      } else {
        this.options.data.number = this.options.number;
      }
      this._initialize({
        template: '<span class="x-icon x-icon-small x-icon-info btn-number-minus pointer"> <i class="icon icon-white icon-minus-mini pointer"></i> </span> <input type="text" value="{{number}}" class="input-sort"/> <span class="x-icon x-icon-small x-icon-info btn-number-plus pointer"> <i class="icon icon-white icon-plus-mini pointer"></i> </span>'
      });
      this.render();
    },
    minus: function () {
      if (parseInt(this.model.get('number'), 10) === 0) return;
      this.model.set('number', parseInt(this.model.get('number'), 10) - 1);
      this.setInputValue();
    },
    plus: function () {
      this.model.set('number', parseInt(this.model.get('number'), 10) + 1)
      this.setInputValue();
    },
    setInputValue: function () {
      if (this.options.target) {
        $(this.options.target).val(this.model.get('number'));
      }
      if (this.options.change) this.options.change.call(this, this.model.get('number'));
    },
    inputChange: function () {
      this.model.set('number', parseInt(this.$('.input-sort').val(), 10));
      if (this.options.change) this.options.change.call(this, this.model.get('number'));
    },
    render: function () {
      this._render();
    }
  });

  module.exports = NumberRange;
});