/**
 * @description select
 * @namespace select
 * @author yongjin<zjut_wyj@163.com> 2014/12/8
 */
define('Select', ['BaseModel', 'BaseCollection', 'BaseItem', 'BaseList', 'template/select_list', 'template/select_item'],
  function (require, exports, module) {
    var BaseModel, BaseCollection, BaseItem, BaseList, Select, item,model, collection, templateList, templateItem;

    BaseModel = require('BaseModel');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');
    templateItem = require('template/select_item');
    templateList = require('template/select_list');

    model = BaseModel.extend({
      defaults: {
        text: '-请选择分类-',
        value: '/'
      },
      initialize: function(){
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
      tagName: 'li',
      className: 'bui-list-item',
      initialize: function () {
        this._initialize({
          template: templateItem
        });
        this._onAfterRender = function(){

        }
      },
      render: function(){
        this._render();
      }
    });

    Select = BaseList.extend({
      events: {
      },
      initialize: function(options){
        this.options = options || {};
        this._initialize({
          template: templateList,
          model: model,
          item: item,
          collection: collection,
          render: '.bui-select-list-ul',
          items: this.options.items
        });
        return this;
      },
      render: function(){
        this._render();
      },
      add: function () {
        this.collection.push(new model());
        if (typeof this.options.add !== 'undefined') {
          this.options.add.call(this);
        }
      },
      remove: function () {
        this.collection.pop();
        this._render();
      },
      getItems: function () {
        // 转换成[{key: '', value: ''}, ... ] 数组格式
        return Est.pluck(this.collection.models, 'attributes');
      }
    });

    module.exports = Select;
  });