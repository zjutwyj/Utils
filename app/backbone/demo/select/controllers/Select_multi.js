/**
 * @description Districk
 * @namespace Districk
 * @author yongjin<zjut_wyj@163.com> 2015/1/5
 */
define('Select', ['BaseModel', 'BaseCollection', 'BaseItem', 'BaseList', 'BaseView', 'template/select_item',
    'template/select_list', 'template/select_view', 'Service'],
  function (require, exports, module) {

    var Select, model, item, collection, list;
    var BaseModel = require('BaseModel');
    var BaseCollection = require('BaseCollection');
    var BaseItem = require('BaseItem');
    var BaseList = require('BaseList');
    var itemTemp = require('template/select_item');
    var listTemp = require('template/select_list');
    var viewTemp = require('template/select_view');
    var BaseView = require('BaseView');
    var Service = require('Service');

    model = BaseModel.extend({
      defaults: Est.extend({}, BaseModel.prototype.defaults),
      initialize: function () {
        this._initialize();
      }
    });

    collection = BaseCollection.extend({
      initialize: function () {
        this._initialize({
          model: model
        });
      }
    });

    item = BaseItem.extend({
      tagName: 'li',
      className: 'bui-list-item bui-list-item-select',
      events: {
        'click .toggle': '_toggleChecked',
        'click .select-div': 'selectItem'
      },
      initialize: function () {
        this._initialize({
          template: this.options.data.tpl || itemTemp
        });
        this.model.set('text', this.model.get(this._options.data.text));
        this.model.set('value', this.model.get(this._options.data.value));
        if (this._options.data.inputValue &&
          this._options.data.inputValue.indexOf(this.model.get('value')) !== -1) {
          setTimeout(Est.proxy(function () {
            this.selectItem();
          }, this), 0);
        }
      },
      render: function () {
        this._render();
      },
      selectItem: function () {
        debug(this.model.get('text'));
        this._options.data.inputValue = this.model.get('value');
        app.getView(this._options.viewId).setInputValue(this.model.get('text'), this.model.toJSON());
        app.getView(this._options.viewId).setCurrentSelect(this.$el);
        app.getView(this._options.viewId).setSubSelect(this.model);
        app.getView(this._options.viewId).setValue();
      }
    });

    list = BaseList.extend({
      events: {
        'click .select-search': 'searchClick',
        'keyup .select-search': 'search',
        'click .select-search-btn': 'search'
      },
      initialize: function () {
        //this.clearInputValue();
        this._initialize({
          model: model,
          collection: collection,
          item: item,
          template: listTemp,
          clearDialog: false,
          enterRender: '.select-search-btn'
        });
      },
      // 搜索
      search: function (e) {
        e.stopImmediatePropagation();
        this.searchKey = Est.trim(this.$('.select-search').val());
        if (this.preSearchKey === this.searchKey) return;
        this.preSearchKey = this.searchKey;
        this.isSearch = false;
        if (!this.isSearch) {
          this.isSearch = true;
          setTimeout(Est.proxy(function () {
            if (Est.isEmpty(this.searchKey)) {
              this._load({ page: 1, pageSize: 1000 });
            } else {
              this._search({
                filter: [
                  {key: this._options.data.text, value: this.searchKey }
                ]
              });
            }
            this.isSearch = false;
          }, this), 500);
        }
      },
      searchClick: function (e) {
        e.stopImmediatePropagation();
      },
      // 清空input文本框
      clearInputValue: function () {
        this.$input.val('');
      },
      // 设置input文本框
      setInputValue: function (val, model) {
        this.$input.val(val);
        this._select = model['value'];
        this._options.change && this._options.change.call(this, model);
      },
      setInputNode: function (node) {
        this.$input = node;
      },
      setCurrentSelect: function (select) {
        if (this.$currentSelect) {
          this.$currentSelect.removeClass('bui-list-item-selected');
        }
        this.$currentSelect = select;
        this.$currentSelect.addClass('bui-list-item-selected');
      },
      setSubSelect: function (model) {
        this.empty();
      },
      empty: function () {
        if (this.sub) {
          this.sub.empty();
          this.sub = null;
        }
      },
      setValue: function () {
        if (this._options.input)
          this._options.input.val(app.getView(this._options.originId).getValue());
      },
      getValue: function () {
        if (this.sub) {
          var select = this.sub.getValue();
          if (Est.isEmpty(select)) {
            return this._select;
          }
          return select;
        } else {
          return this._select;
        }
      },
      getSelect: function () {
        return this.$('.bui-list-picker');
      }
    });

    Select = BaseView.extend({
      events: {
        'click .bui-select-input': 'showSelect',
        'click .down': 'showSelect'
      },
      initialize: function () {
        this._initialize({
          template: viewTemp
        });
        this._options.text = this._options.text || 'text';
        this._options.value = this._options.value || 'value';
        this.render();
      },
      // 初始化下拉框
      initSelect: function (items) {
        var viewId = this._options.viewId;
        app.addPanel('select-' + viewId, { el: 'body',
          template: '<div class="select-container-' + viewId + '"></div>'
        });
        this.selectNode = new list({
          el: '.select-container-' + viewId,
          viewId: 'select-list-' + viewId,
          items: items,
          originId: this._options.originId || viewId,
          target: this._options.target,
          input: this._options.input,
          change: this._options.change,
          clearDialog: false,
          speed: 1,
          data: {
            tpl: this._options.tpl,
            text: this._options.text,
            value: this._options.value,
            inputValue: this._options.inputValue,
            inputNode: this.$('.bui-select-input'),
            search: this._options.search,
            width: this._options.data.width
          },
          render: '.select-ul'
        });
        app.addView('select-list-' + viewId, this.selectNode);
        this.selectNode.setInputNode(this.$('.bui-select-input'));
        this.$select = this.selectNode.getSelect();
      },
      // 清空input文本框
      clearInputValue: function () {
        this.$buiSelectInput.val('');
      },
      // 初始化input文本框
      initInputValue: function (items) {
        var id = $(this._options.target).val();
        this.$buiSelectInput = this.$('.bui-select-input');
        Est.each(items, function (item) {
          if (id.indexOf(item[this._options.value]) !== -1) {
            var initValue = this.$buiSelectInput.val();
            this.$buiSelectInput.val((initValue.length > 0 ? initValue + ',' : '') + item[this._options.text]);
          }
        }, this)
      },
      // 显示下拉框
      showSelect: function (e) {
        $(document).click();
        e.stopImmediatePropagation();
        if (!this.selectNode) {
          this.initSelect(this._options.items);
        }
        this.$select.css({
          left: this.$('.bui-select').offset().left,
          top: this.$('.bui-select').offset().top + 31
        }).show();
        $(document).one('click', $.proxy(function () {
          this.hideSelect();
        }, this));
      },
      // 隐藏下拉框
      hideSelect: function () {
        this.$select.hide();
      },
      // 清空下拉框
      empty: function () {
        if (this.selectNode) {
          this.selectNode.empty();
        }
        this.$el.off().remove();
      },
      // 获取select值
      getValue: function () {
        if (this.selectNode) {
          return this.selectNode.getValue();
        }
      },
      // 设置input值
      setValue: function () {
        if (this._options.input) {
          this._options.input.val(this.getValue());
        }
      },
      render: function () {
        this._render();
        if (this._options.target && Est.typeOf(this._options.target) === 'string') {
          this._options.input = $(this._options.target);
          this._options.inputValue = this._options.input.val();
        }
        if (this._options.items) {
          this.initInputValue(this._options.items);
        }
      }
    });

    module.exports = Select;
  });