/**
 * @description Lottery
 * @class Lottery
 * @author yongjin<zjut_wyj@163.com> 2015/3/25
 */
define('Lottery', ['LotteryList', 'PicturePick', 'template/common_lottery_view'], function (require, exports, module) {
  var Lottery, template, LotteryList, PicturePick;

  template = require('template/common_lottery_view');
  LotteryList = require('LotteryList');
  PicturePick = require('PicturePick');

  Lottery = BaseView.extend({
    events: {
      'click .lty-add': 'ltyAdd',
      'click .lty-show': 'ltyShow',
      'click .btn-lty-result': 'viewLottery',
      'click .tip-detail': 'tipDetail',
      'click .pic-info': 'picInfo',
      'click input[name=ltyType]': 'setLotteryBg'
    },
    initialize: function () {
      this.options.data = this.options.data || {};
      this.ltyObj = { lotteryImage: '', lotteryRule: [] };
      if (this.options.model.get('ltyRule')) {
        this.ltyObj = $.parseJSON(Est.unescapeHTML(this.options.model.get('ltyRule')));
      }
      Est.extend(this.options.data, {
        lotteryImage: Est.isEmpty(this.options.data.lotteryImage) ? CONST.PIC_NONE : this.ltyObj.lotteryImage,
        ltyType: this.model.get('ltyType') === '0' ? '2' : this.model.get('ltyType'),
        showLotteryResult: this.ltyObj['showLotteryResult'] ? this.ltyObj['showLotteryResult'] : '00',
        lotteryTime: this.ltyObj['lotteryTime'] ? this.ltyObj['lotteryTime'] : '00',
        startTime: this.ltyObj['startTime'] ? this.ltyObj['startTime'] : '',
        endTime: this.ltyObj['endTime'] ? this.ltyObj['endTime'] : ''
      });
      this._initialize({
        template: template,
        modelBind: true
      });
      this.render();
      this.tipDetail();
    },
    picInfo: function () {
      app.getView('lotteryList').picInfo();
    },
    getShowLotteryResult: function () {
      return this.model.get('showLotteryResult');
    },
    getLotteryTime: function () {
      return this.model.get('lotteryTime');
    },
    getStartTime: function () {
      return this.model.get('startTime');
    },
    getEndTime: function () {
      return this.model.get('endTime');
    },
    tipDetail: function () {
      app.getView('lotteryList').tipDetail();
    },
    ltyAdd: function () {
      app.getView('lotteryList').addOne();
    },
    // 查看抽奖记录
    viewLottery: function () {
      window.open('#/wwy_detail/' + this._options.wwyId + '/lottery');
    },
    ltyShow: function () {
      app.getView('lotteryList').ltyShow();
    },
    getContent: function () {
      var showLotteryResult = this.model.get('showLotteryResult') === '01' ? 'block' : 'none';
      return '<div class="lottery-container" style="width: 100%;">' +
        '</div><div class="lottery-item-ul" style="width: 98%; min-height: 100px;background: #fff;border: 1px solid #dfdfdf;opacity: 0.7;padding: 1%;display:' + showLotteryResult + ';">' +
        '<span style="padding: 20px;">抽奖结果列表显示区</span>' +
        '</div>';
    },
    getLotteryRule: function () {
      return app.getView('lotteryList').getItems();
    },
    getLotteryType: function () {
      return this.$('input[name=ltyType]:checked').val();
    },
    getLotteryImage: function () {
      var list = app.getView('lotteryPicturePick').getItems();
      return list.length > 0 ? list[0]['serverPath'] : '';
    },
    setLotteryBg: function () {

    },
    initDate: function () {
      Utils.initDate({
        render: '.calendar-startTime',
        showTime: true,
        target: '#model-startTime'
      });
      Utils.initDate({
        render: '.calendar-endTime',
        showTime: true,
        target: '#model-endTime'
      });
    },
    render: function () {
      this._render();
      debugger
      this._watch(['#model0-lotteryTime', '#model1-lotteryTime', '#model-startTime', '#model-endTime'], '#lotteryTime',
        function () {
          this.initDate();
        });
      // 抽奖图片
      var pic_list = [];
      if (typeof this._options._isAdd !== 'undefined' && !this._options._isAdd) {
        pic_list.push({
          attId: '1',
          serverPath: this._options.lotteryImage ? this._options.lotteryImage.replace(CONST.PIC_URL, '') : CONST.PIC_NONE,
          title: '重新上传',
          hasPic: true,
          isAddBtn: false
        });
      } else {
        pic_list.push({
          attId: '1',
          serverPath: this.options.data.lotteryImage,
          title: '重新上传',
          hasPic: true,
          isAddBtn: false
        });
      }
      this.initDate();
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
      if (this.ltyObj['lotteryRule'].length === 0) {
        this.ltyShow();
      }
    }

  });

  module.exports = Lottery;
});