/**
 * @description LotteryList
 * @class LotteryList
 * @author yongjin<zjut_wyj@163.com> 2015/3/27
 */
define('LotteryList', ['template/lottery_item'], function (require, exports, module) {
  var LotteryList, itemTemp, model, item, collection;
  itemTemp = require('template/lottery_item');

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
      'click .btn-img-edit': 'editImg',
      'click .moveUp': '_moveUp',
      'click .moveDown': '_moveDown'
    },
    initialize: function () {
      this._initialize({
        model: model,
        template: itemTemp,
        modelBind: true,
        beforeRender: function () {
          if (Est.isEmpty(this.model.get('remain'))){
            this.model.set('remain', this.model.get('sum'));
          }
          /*var prob = parseInt(this.model.get('prob'), 10);
          this.model.set('probcent', prob === 0 ? '100%' : (1 / prob * 100 + '%'));*/
        }
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
    events: {
      'click .tip-detail': 'tipDetail'
    },
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
    tipDetail: function () {
      Utils.dialog({
        id: 'copyDialog',
        title: '概率说明',
        width: 500,
        content: '一等奖 推荐设置【容易抽中】1-5 【较难抽中】0.1-1 【超难抽中】0.01-0.1【极难】0.001-0.01',
        hideSaveBtn: true,
        cover: true // 是否显示遮罩
      });
    },
    picInfo: function(){
      Utils.dialog({
        id: 'copyDialog',
        title: '抽奖图片制作说明',
        width: 500,
        content: '奖项顺序从上往下 按顺时钟方向设计， 最下面为奖项的最后一项<a href="http://img.jihui88.com/upload/j/j2/jihui88/picture/2015/06/16/0fb6cca9-60e5-423d-8077-ff9b6825dce7.png" target="_blank">示例下载</a>',
        hideSaveBtn: true,
        cover: true // 是否显示遮罩
      });
    },
    addOne: function () {
      this.collection.add(new model());
    },
    ltyShow: function () {
      var ctx = this;
      var showList = [
        { name: 'iphone6', prob: '0.1', level: '一等奖', sum: '1', remain: '1', info: '恭喜您， 抽中了一等奖', pic: '' },
        { name: '笔记本电脑', prob: '0.3', level: '二等奖', sum: '2', remain: '2', info: '恭喜您， 抽中了二等奖', pic: '' },
        { name: '洗衣机', prob: '0.8', level: '三等奖', sum: '3', remain: '3', info: '恭喜您， 抽中了三等奖', pic: '' },
        { name: '电饭煲', prob: '20', level: '四等奖', sum: '4', remain: '4', info: '恭喜您， 抽中了四等奖', pic: '' },
        { name: '代币券10元', prob: '50', level: '五等奖', sum: '500', remain: '500', info: '恭喜您， 抽中了五等奖', pic: '' },
        { name: '谢谢参与', prob: '90', level: '六等奖', sum: '10000', remain: '10000', info: '谢谢参与', pic: '' }
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
          _item['sort'] = _item['dx'] + 1;
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
      return result;
    }
  });
  module.exports = LotteryList;
});


