/**
 * @description PicturePick
 * @namespace PicturePick
 * @author yongjin<zjut_wyj@163.com> 2014/12/19
 */
define('PicturePick', ['template/picture_pick_list', 'template/picture_pick_item'],
  function (require, exports, module) {
    var PicturePick, model, collection, item, itemTemp, listTemp;

    itemTemp = require('template/picture_pick_item');
    listTemp = require('template/picture_pick_list');

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
        'click .upload-source': 'picUploadSource',
        'click .image': 'picUpload'
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
              if (result.length > 1) {
                app.getView(ctx._options.viewId).addItems(result);
              }
              ctx.addItems(result);
              app.getView(ctx._options.viewId).change();
              if (ctx.options.data.target) {
                $(ctx.options.data.target).val(result[0].serverPath);
              }
            };
          },
          success: function () {
            var result = this.iframeNode.contentWindow.app.getView('picSource').getItems();
            if (result.length > 1) {
              app.getView(ctx._options.viewId).addItems(result);
            }
            ctx.addItems(result);
            app.getView(ctx._options.viewId).change();
            if (ctx.options.data.target) {
              $(ctx.options.data.target).val(result[0].serverPath);
            }
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
            if (!app.getView(this._options.viewId)) {
              debug('未定义viewId');
            } else {
              app.getView(this._options.viewId).addOne();
            }
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
        this.options.data = this.options.data || {};
        if (this.options.target) {
          // 判断是否存在target, 若存在， 设置data以便item中可以获取，
          // 并获取隐藏域的值并设置items
          this.options.data.target = this.options.target;
          this.options.items = [];
          this.inputVal = $(this.options.target).val();
          Est.each(this.inputVal.split(','), Est.proxy(function (item) {
            this.options.items.push({ attId: '1',
              serverPath: item,
              title: '重新上传',
              hasPic: true,
              isAddBtn: false
            });
          }, this));
        }
        // 调用父类初始化方法
        this._initialize({
          collection: collection,
          model: model,
          item: item,
          template: listTemp,
          checkAppend: false,
          clearDialog: false,
          render: this.options.render || '.photo-list',
          afterRender: function (options) {
            this.addOne();
            this.collection.bind('add', this.change, this);
            this.collection.bind('reset', this.reset, this);
          }
        });
      },
      reset: function () {
        this._render();
        this._options.change && this._options.change.call(this, this._getItems());
      },
      change: function () {
        this._options.change && this._options.change.call(this, this._getItems());
      },
      addItems: function (list) {
        Est.each(list, Est.proxy(function (item, index) {
          if (index > 0) {
            var newModel = new model();
            newModel.set('attId', item['attId']);
            newModel.set('serverPath', item['serverPath']);
            newModel.set('title', '重新上传');
            newModel.set('isAddBtn', false);
            this.collection.push(newModel);
          }
        }, this));
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