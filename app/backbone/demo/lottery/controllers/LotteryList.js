/**
 * @description LotteryList
 * @class LotteryList
 * @author yongjin<zjut_wyj@163.com> 2015/3/27
 */
define('LotteryList', ['BaseModel', 'BaseCollection', 'BaseItem', 'BaseList', 'template/lottery_item', 'Utils'], function (require, exports, module) {
  var LotteryList, BaseModel, Utils, BaseCollection, BaseItem, BaseList, itemTemp, model, item, collection;
  BaseModel = require('BaseModel');
  BaseCollection = require('BaseCollection');
  BaseItem = require('BaseItem');
  BaseList = require('BaseList');
  itemTemp = require('template/lottery_item');
  Utils = require('Utils');

  model = BaseModel.extend({
    defaults: Est.extend({
      name: '',
      prob: '',
      level: '',
      sum: '',
      remain: '',
      info: '',
      pic: ''
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
    tagName: 'tr',
    className: 'bui-grid-row bui-grid-row-odd bui-grid-row-hover',
    events: {
      'click .delete': '_del',
      'click .btn-img-edit': 'editImg'
    },
    initialize: function () {
      this._initialize({
        model: model,
        template: itemTemp,
        modelBind: true
      });
    },
    editImg: function (type) {
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
            ctx.model.set('pic', result[0]['serverPath'])
          };
        },
        success: function () {
          var result = this.iframeNode.contentWindow.app.getView('picSource').getItems();
          ctx.model.set('pic', result[0]['serverPath'])
        }
      });
    },
    render: function () {
      this._render();
    }
  });

  LotteryList = BaseList.extend({
    initialize: function () {
      this._initialize({
        model: model,
        collection: collection,
        item: item,
        clearDialog: false,
        afterLoad: function () {
          if (this.collection.models.length === 0) {
            this.addOne();
          }
        }
      });
    },
    render: function () {
      this._render();
    },
    addOne: function () {
      this.collection.add(new model());
    },
    ltyShow: function () {
      var ctx = this;
      var showList = [
        { name: 'iphone6', prob: '500', level: '一等奖', sum: '1', remain: '1', info: '恭喜您， 抽中了一等奖', pic: '' },
        { name: '笔记本电脑', prob: '300', level: '二等奖', sum: '2', remain: '2', info: '恭喜您， 抽中了二等奖', pic: '' },
        { name: '洗衣机', prob: '100', level: '三等奖', sum: '3', remain: '3', info: '恭喜您， 抽中了三等奖', pic: '' },
        { name: '电饭煲', prob: '50', level: '四等奖', sum: '4', remain: '4', info: '恭喜您， 抽中了四等奖', pic: '' },
        { name: '代币券10元', prob: '10', level: '五等奖', sum: '500', remain: '500', info: '恭喜您， 抽中了五等奖', pic: '' },
        { name: '谢谢参与', prob: '0', level: '0', sum: '0', remain: '0', info: '谢谢参与', pic: '' },
      ];
      this._empty();
      ctx.collection.models.length = 0;
      Est.each(showList, function (item) {
        ctx.collection.add(new model(item));
      });
    },
    getItems: function () {
      var result = [];
      Est.each(this.collection.models, function (item) {
        if (!Est.isEmpty(item.get('name'))) {
          var _item = Est.cloneDeep(item.attributes);
          delete _item['checked'];
          delete _item['children'];
          delete _item['dx'];
          delete _item['_options'];
          delete _item['_items'];
          delete _item['_collection'];
          delete _item['_data'];
          result.push(_item);
        }
      });
      /* result = Est.sortBy(result, function(item){
       return parseInt(item['prob'], 10);
       });*/
      return result;
    }
  });
  module.exports = LotteryList;
});


