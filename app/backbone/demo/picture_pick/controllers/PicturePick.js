/**
 * @description PicturePick
 * @namespace PicturePick
 * @author yongjin<zjut_wyj@163.com> 2014/12/19
 */
define('PicturePick', ['BaseModel', 'BaseCollection', 'BaseItem', 'BaseList', 'template/picture_pick_list', 'template/picture_pick_item', 'Utils'],
  function (require, exports, module) {
    var PicturePick, BaseModel, BaseCollection, BaseItem, BaseList, model, collection, item, itemTemp, listTemp, Utils;

    BaseModel = require('BaseModel');
    BaseList = require('BaseList');
    BaseItem = require('BaseItem');
    BaseCollection = require('BaseCollection');
    itemTemp = require('template/picture_pick_item');
    listTemp = require('template/picture_pick_list');
    Utils = require('Utils');

    model = BaseModel.extend({
      defaults: Est.extend({

      }, BaseModel.prototype.defaults),
      initialize: function () {
        this._initialize();
      }
    });

    collection = BaseCollection.extend({
      model: model,
      initialize: function () {
        this._initialize();
      }
    });

    item = BaseItem.extend({
      tagName: 'div',
      className: 'pic-item item',
      events: {
        'click .delete': '_del', // 删除
        'click .move-up': '_moveUp', // 上移
        'click .move-down': '_moveDown', // 下移
        'click .img-name': 'picUpload',
        'click .upload-local': 'picUpload',
        'click .upload-source': 'picUploadSource'
      },
      initialize: function () {
        this._initialize({
          viewId: 'picturePick',
          template: itemTemp
        });
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
          this.model.set('attId', result[0]['attId']);
          this.model.set('serverPath', result[0]['serverPath']);
          this.model.set('title', '重新上传');
          this.model.set('isAddBtn', false);
          if (!this.model.get('hasPic')) {
            this.model.set('hasPic', true);
            app.getView(this._options.viewId).addOne();
          }
        }
        window['uploadDialog'].close().remove();
      },
      picUploadSource: function () {
        this.picUpload('sourceUpload');
      },
      render: function () {
        this._render();
      }
    });

    PicturePick = BaseList.extend({
      initialize: function () {
        this._initialize({
          collection: collection,
          model: model,
          item: item,
          template: listTemp,
          checkAppend: false,
          render: this.options.render || '.photo-list',
          afterRender: function (options) {
            if (this.collection.models.length === 0 || !this.options._isAdd) {
              this.addOne();
            }
            this.collection.bind('add', this.change, this);
            this.collection.bind('reset', this.reset, this);
          }
        });
      },
      reset: function () {
        this._render();
        this._options.change && this._options.change.call(this, this._getItems());
      },
      change: function (model) {
        this._addOne(model);
        this._options.change && this._options.change.call(this, this._getItems());
      },
      addOne: function () {
        this.collection.push(new model({
          serverPath: CONST.PIC_NONE,
          attId: '',
          title: '上传图片',
          isAddBtn: true
        }));
        Utils.resetIframe();
      },
      append: function (node) {
        this.collection.add(node);
        Utils.resetIframe();
      },
      getItems: function () {
        var result = [];
        Est.each(this.collection.models, function (item) {
          if (!item.get('isAddBtn') && !Est.isEmpty(item.get('attId'))) {
            result.push({
              attId: item.get('attId'),
              serverPath: item.get('serverPath')
            });
          }
        });
        return result;
      },
      // 根据索引获取单个图片
      getItem: function (index) {
        var list = this.getItems();
        index = index || 0;
        if (list.length > index) return list[index];
        return { attId: null, serverPath: ''};
      },
      render: function () {
        this._render();
      }
    });

    module.exports = PicturePick;
  });