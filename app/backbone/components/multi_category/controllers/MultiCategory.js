/**
 * Created by Administrator on 2015/5/12.
 */
define('MultiCategory', ['template/multi_category_item'], function (require, exports, module) {
  var MultiCategory, model, item, collection, itemTemp;

  itemTemp = require('template/multi_category_item');

  model = BaseModel.extend({
    defaults: Est.extend({

    }, BaseModel.prototype.defaults),
    baseId: 'id',
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
    className: 'control-group',
    events: {
      'click .product-category-delete': 'del'
    },
    initialize: function () {
      this._initialize({
        template: itemTemp,
        afterRender: function (model) {
          var ctx = this;
          ctx.change = false;

          Utils.initSelect({
            render: $('#multi-category-' + this.model.get('dx'), this.$el),
            target: $('#category' + this.model.get('dx'), this.$el),
            items: this._options.data,
            change: function (item) {
              ctx.model.set('category', item.value);
              app.getView(ctx._options.viewId).change(item, ctx.model.get('dx'));
            }
          });
        }
      });
    },
    del: function (e) {
      this._del(e, Est.proxy(function () {
        app.getView(this._options.viewId).setInputValue();
      }, this));
    },
    render: function () {
      this._render();
      console.log('机车的插件');
    }
  });

  MultiCategory = BaseList.extend({
    initialize: function () {
      this._initialize({
        model: model,
        collection: collection,
        item: item
      });
      this.$input = $(this._options.target);
    },
    events: {
      'click .product-category-add': 'categoryAdd'
    },
    change: function (item, index) {
      this.setInputValue();
      if (index == '0')
        this._options.change && this._options.change.call(this, item);
    },
    categoryAdd: function () {
      this.collection.push(new model());
    },
    setInputValue: function () {
      this.$input.val(this.getItems().join(','));
    },
    getItems: function () {
      var result = [];
      Est.each(this.collection.models, function (item) {
        !Est.isEmpty(item.get('category')) && result.push(item.get('category'))
      });
      return result;
    }
  });

  module.exports = MultiCategory;

});