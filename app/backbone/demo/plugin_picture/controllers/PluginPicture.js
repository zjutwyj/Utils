/**
 * @description PluginPicture
 * @class PluginPicture
 * @author yongjin<zjut_wyj@163.com> 2015/4/11
 */
define('PluginPicture', ['BaseView', 'template/plugin_picture_view', 'Utils'], function (require, exports, module) {
  var PluginPicture, template, BaseView  ,Utils;

  BaseView = require('BaseView');
  template = require('template/plugin_picture_view');
  Utils = require('Utils');

  PluginPicture = BaseView.extend({
    events: {
      'click .picUpload': 'picUpload',
      'click .button' : 'getContent'
    },
    initialize: function () {
      this.options.data = this.options.data || {};
      this.options.data.src = this.options.src;
      this.options.data.link = this.options.link;
      this.options.data.linkType= this.options.linkType;
      this.options.data.alt = this.options.alt;

      this._initialize({
        template: template,
        modelBind : true
      });
      this.render();
    },
    getContent: function () {
      if(this.model.get('link') == null || this.model.get('link') == ''){
        return '<img src="'+CONST.PIC_URL+"/"+this.model.get('src')+'" alt="'+this.model.get('alt')+'"/>';
      }
      return '<a href="'+this.model.get('link')+'" target="'+this.model.get('linkType')+'"><img src="'+CONST.PIC_URL+"/"+this.model.get('src')+'" alt="'+this.model.get('alt')+'"/></a>';
    },
    picUpload: function (type) {
      var ctx = this;
      type = type || 'local';
      Utils.openUpload({
        id: 'uploadDialog',
        type: type,
        albumId: app.getData('curAlbumId'),
        username: app.getData('user') && app.getData('user').username,
        auto: true,
        oniframeload: function () {
          this.iframeNode.contentWindow.uploadCallback = function (result) {
            ctx.addItems(result);
            if (ctx.options.data.target) {
              $(ctx.options.data.target).val(result[0].serverPath);
            }
          };
        },
        success: function () {
          var result = this.iframeNode.contentWindow.app.getView('picSource').getItems();
          ctx.addItems(result);
        }
      });
    },
    addItems: function (result) {
      if (result.length > 0) {
        this.model.set('src',result[0]['serverPath']);
      }
      window['uploadDialog'].close().remove();
    },
    render: function () {
      this._render();
    }
  });

  module.exports = PluginPicture;
});