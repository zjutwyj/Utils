/**
 * @description PhotoSwipeView
 * @class PhotoSwipeView
 * @author yongjin<zjut_wyj@163.com> 2015/4/9
 */
define('PhotoSwipeView', ['BaseView','Utils', 'PicturePick', 'template/photo_swipe_view'], function (require, exports, module) {
  var PhotoSwipeView, BaseView, template, PicturePick, Utils;

  BaseView = require('BaseView');
  template = require('template/photo_swipe_view');
  PicturePick = require('PicturePick');
  Utils = require('Utils');

  PhotoSwipeView = BaseView.extend({
    initialize: function(){
      this._initialize({
        template: template
      });
      this.render();
    },
    render: function(){
      this._render();

      Utils.initPicturePick({
        el: '#photo-swipe',
        viewId: 'photoSwipeViewPicturePick',
        _isAdd: this._isAdd, // 是否为添加模式
        max: 15, // 限制最大上传个数， 默认为无限
        items: this._isAdd ? [] : [
          {
            attId: this.model.get('wyId'),
            serverPath: this._getValue('music.pic'),
            title: '上传图片',
            hasPic: true,
            isAddBtn: false
          }
        ]
      });

    }
  });

  module.exports = PhotoSwipeView;
});