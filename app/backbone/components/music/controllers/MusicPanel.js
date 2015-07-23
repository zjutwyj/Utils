/**
 * @description MusicPanel
 * @class MusicPanel
 * @author yongjin<zjut_wyj@163.com> 2015/6/11
 */
define('MusicPanel', ['template/music_panel', 'ItemCheck'], function (require, exports, module) {
  var MusicPanel, template, ItemCheck;

  template = require('template/music_panel');
  ItemCheck = require('ItemCheck');

  MusicPanel = BaseView.extend({
    initialize: function () {
      this._initialize({
        template: template,
        afterRender: this.afterRender
      });
      this.render();
    },
    afterRender: function () {
      this.audioPlayer = this.$('#xaudio').get(0);
      Utils.initSelect({
        render: '#music-src',
        viewId: 'musicSrc',
        target: '.music_src',
        items: app.getStatus('music'),
        change: Est.proxy(function (model) {
          if (model.value === '-') this.$('.music-src-define').show();
          else this.$('.music-src-define').hide();
          this.setMusicPanel(CONST.MUSIC_URL + '/music/' + model.value + '.mp3');
        }, this)
      });
      /*音乐图片*/
      Utils.initPicturePick({
        el: '#music_pic',
        viewId: 'wwyLeafletPicturePickMusicPanel',
        target: '.input-music-pic',
        _isAdd: this._isAdd, // 是否为添加模式
        max: 1 // 限制最大上传个数， 默认为无限
      });
      /*音乐图标选择*/
      app.addView('itemCheck', new ItemCheck({
        el: '#check-list',
        viewId: 'itemCheck',
        tpl: '<div class=""> ' +
          '<img width="100%" height="100%" data-src="{{value}}" src="http://img.jihui88.com/{{value}}" alt=""> ' +
          '<span class="check-icon x-icon x-icon-small x-icon-success"><i class="icon icon-ok icon-white"></i></span> ' +
          '</div>',
        target: '#model-pic',
        path: 'value',
        items: app.getStatus('musicIcon'),
        change: function (item) {
          //console.dir(app.getView('itemCheck')._getCheckboxIds('value'));
        }
      }));
      if (this._getValue('music.src') !== '-') {
        this.$('.music-src-define').hide();
      }
    },
    getResult: function () {
      return {
        src: this.$('#model-src').val(),
        custom: this.$('#model-custom').val(),
        pic: this.$('#model-pic').val()
      };
    },
    setMusicPanel: function (mp3Url) {
      this.audioPlayer.pause();
      if (mp3Url.length > 0) {
        this.audioPlayer.src = mp3Url;
        this.audioPlayer.load();
        this.audioPlayer.play();
        this.bMute = 0;
      } else this.bMute = 1;
    },
    render: function () {
      this._render();
    }
  });

  module.exports = MusicPanel;
});