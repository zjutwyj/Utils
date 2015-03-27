/**
 * @description Lottery
 * @class Lottery
 * @author yongjin<zjut_wyj@163.com> 2015/3/25
 */
define('Lottery', ['BaseView', 'LotteryList', 'template/common_lottery_view'], function (require, exports, module) {
  var Lottery, template, BaseView, LotteryList;

  BaseView = require('BaseView');
  template = require('template/common_lottery_view');
  LotteryList = require('LotteryList');

  Lottery = BaseView.extend({
    events: {
      'click .lty-add': 'ltyAdd',
      'click .lty-show': 'ltyShow'
    },
    initialize: function(){
      this._initialize({
        template: template
      });
      this.render();
    },
    ltyAdd: function () {
      app.getView('lotteryList').addOne();
    },
    ltyShow: function () {
      app.getView('lotteryList').ltyShow();
    },
    getContent: function(){
      return '<div >Lottery</div>';
    },
    render: function(){
      this._render();
      // 抽奖
      var ltyObj = {
        lotteryImage: '',
        lotteryRule: []
      };
      if (this.options.model.get('ltyRule')) {
        ltyObj = $.parseJSON(Est.unescapeHTML(this.options.model.get('ltyRule')));
      }
      this.model.set('lotteryImage', ltyObj['lotteryImage']);
      app.addView('lotteryList', new LotteryList({
        el: '#lty-tbody',
        viewId: 'lotteryList',
        _isAdd: this._isAdd,
        items: ltyObj['lotteryRule'],
        max: 10
      }));

    }

  });

  module.exports = Lottery;
});