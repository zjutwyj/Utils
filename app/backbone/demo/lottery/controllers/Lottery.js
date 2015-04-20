/**
 * @description Lottery
 * @class Lottery
 * @author yongjin<zjut_wyj@163.com> 2015/3/25
 */
define('Lottery', ['BaseView', 'LotteryList', 'PicturePick', 'template/common_lottery_view', 'Utils'], function (require, exports, module) {
  var Lottery, template, BaseView, LotteryList, PicturePick, Utils;

  BaseView = require('BaseView');
  template = require('template/common_lottery_view');
  LotteryList = require('LotteryList');
  PicturePick = require('PicturePick');
  Utils = require('Utils');

  Lottery = BaseView.extend({
    events: {
      'click .lty-add': 'ltyAdd',
      'click .lty-show': 'ltyShow',
      'click input[name=ltyType]': 'setLotteryBg'
    },
    initialize: function(){
      this.options.data = this.options.data || {};
      this.ltyObj = {
        lotteryImage: '',
        lotteryRule: []
      };
      if (this.options.model.get('ltyRule')) {
        this.ltyObj = $.parseJSON(Est.unescapeHTML(this.options.model.get('ltyRule')));
      }
      Est.extend(this.options.data, {
        lotteryImage: this.ltyObj.lotteryImage,
        ltyType: this.model.get('ltyType')
      });
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
      return '<div class="lottery-container" style="width: 100%; height: 100%;"></div>';
    },
    getLotteryRule: function(){
      return app.getView('lotteryList').getItems();
    },
    getLotteryType: function(){
      return this.$('input[name=ltyType]:checked').val();
    },
    getLotteryImage: function(){
      var list = app.getView('lotteryPicturePick').getItems();
      return list.length > 0 ? list[0]['serverPath'] : '';
    },
    setLotteryBg: function(){

    },
    render: function(){
      this._render();
      // 抽奖图片
      var pic_list = [];
      pic_list.push({
        attId: '1',
        serverPath: this.options.data.lotteryImage,
        title: '重新上传',
        hasPic: true,
        isAddBtn: false
      });
      app.addView('lotteryPicturePick', new PicturePick({
        el: '#common-lottery-picture-pick',
        viewId: 'lotteryPicturePick',
        _isAdd: true, // 是否为添加模式
        items: pic_list, // 初始化数据
        max: 1
      }));

      app.addView('lotteryList', new LotteryList({
        el: '#lty-tbody',
        viewId: 'lotteryList',
        _isAdd: this._isAdd,
        items: this.ltyObj['lotteryRule'],
        max: 10
      }));
      if (this.ltyObj['lotteryRule'].length === 0 ){
        this.ltyShow();
      }
      Utils.confirm({
        id: 'lottery-info',
        title: '说明',
        content: '概率值越大， 被抽中的概率越小，0表示必中，10000表示基本抽不中。具体参考推荐设置'
      });
    }

  });

  module.exports = Lottery;
});