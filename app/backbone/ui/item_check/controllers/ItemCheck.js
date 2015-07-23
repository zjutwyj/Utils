/**
 * @description 样式选择
 * @class ItemCheck
 * @author yongjin<zjut_wyj@163.com> 2015/4/8
 */
define('ItemCheck', [], function (require, exports, module) {
  var ItemCheck, model, collection, item;

  model = BaseModel.extend({
    baseId: 'id',
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
    className: 'item-check',
    events: {
      'click .toggle': 'toggleChecked'
    },
    initialize: function () {
      this._initialize({
        template: '<div class="toggle">' + this.options.data.template + '<span class="check-icon x-icon x-icon-small x-icon-info"><i class="icon icon-ok icon-white"></i></span></div>',
        afterRender: function () {
          if (this.options.data.cur !== '-' && this.options.data.cur === this._getValue(this.options.data.path)) {
            this._toggleChecked();
          }
        }
      });
    },
    toggleChecked: function (e) {
      this._toggleChecked(e);
      $(this._options.data.target).val(this.model.get('value'));
      this.options.data.change.call(this, this.model.attributes);
    },
    render: function () {
      this._render.apply(this, arguments);
    }
  });

  ItemCheck = BaseList.extend({
    initialize: function () {
      this.targetVal = $(this.options.target).val();
      this.options.data = Est.extend(this.options.data || {}, {
        template: this.options.tpl || '<span>{{text}}</span>',
        change: this.options.change || function () {
        },
        cur: this.options.cur || (Est.isEmpty(this.targetVal) ? '-' : this.targetVal),
        path: this.options.path || 'value',
        target: this.options.target
      });
      this._initialize({
        model: model,
        collection: collection,
        item: item,
        checkAppend: false
      });
    }
  });

  module.exports = ItemCheck;
});