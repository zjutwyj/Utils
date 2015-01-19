/**
 * @description Districk
 * @namespace Districk
 * @author yongjin<zjut_wyj@163.com> 2015/1/5
 */
define('District', ['BaseModel', 'BaseCollection', 'BaseItem', 'BaseList', 'BaseView', 'template/district_item',
    'template/district_list', 'template/district_view', 'BaseService'],
  function (require, exports, module) {

    var District, model, item, collection, list;
    var BaseModel = require('BaseModel');
    var BaseCollection = require('BaseCollection');
    var BaseItem = require('BaseItem');
    var BaseList = require('BaseList');
    var itemTemp = require('template/district_item');
    var listTemp = require('template/district_list');
    var viewTemp = require('template/district_view');
    var BaseView = require('BaseView');
    var BaseService = require('BaseService');

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
        'click .district-div': 'selectItem'
      },
      initialize: function () {
        this._initialize({
          template: itemTemp
        });
        if (this._options.data.path &&
          this._options.data.path.indexOf(this.model.get('areaId')) !== -1) {
          var ctx = this;
          setTimeout(function () {
            ctx.selectItem();
          }, 0);
          //this.$el.addClass('bui-list-item-selected');
          //this._options.data.inputNode.val(this.model.get('name'));
        }
      },
      render: function () {
        this._render();
      },
      selectItem: function () {
        debug(this.model.get('name'));
        app.getView(this._options.viewId).setInputValue(this.model.get('name'), this.model.get('path'));
        app.getView(this._options.viewId).setCurrentSelect(this.$el);
        app.getView(this._options.viewId).setSubSelect(this.model);
        app.getView(this._options.viewId).setDistrict();
      }
    });

    list = BaseList.extend({
      initialize: function () {
        this._initialize({
          model: model,
          collection: collection,
          item: item,
          template: listTemp,
          render: '.district-ul'
        });
      },
      setInputValue: function (val, path) {
        this.$input.val(val);
        this._district = path;
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
        if (model.get('children').length > 0) {
          debug(model.get('children').length);
          //TODO 二级地区
          $('.sub-district-inner' + this._options.viewId, $(this._options.target)).off().remove();
          app.addPanel('sub-district' + this._options.viewId, {
            el: this._options.target,
            template: '<div class="district-inner sub-district-inner' +
              this._options.viewId + '"></div>'
          });
          this.sub = new District({
            el: '.sub-district-inner' + this._options.viewId,
            items: model.get('children'),
            viewId: 'sub-' + this._options.viewId,
            originId: this._options.originId,
            target: this._options.target,
            input: this._options.input,
            path: this._data.path
          });
          app.addView('sub-' + this._options.viewId, this.sub);
        }
      },
      empty: function () {
        if (this.sub) {
          this.sub.empty();
          this.sub = null;
        }
      },
      setDistrict: function () {
        if (this._options.input)
          this._options.input.val(app.getView(this._options.originId).getDistrict());
      },
      getDistrict: function () {
        if (this.sub) {
          var district = this.sub.getDistrict();
          if (Est.isEmpty(district)) {
            return this._district;
          }
          return district;
        } else {
          return this._district;
        }
      },
      getSelect: function () {
        return this.$('.bui-list-picker');
      },
      render: function () {
        this._render();
      }
    });

    District = BaseView.extend({
      events: {
        'click .bui-select-input': 'showSelect',
        'click .down': 'showSelect'
      },
      initialize: function () {
        this._initialize({
          template: viewTemp
        });
        this.render();
      },
      showSelect: function (e) {
        var ctx = this;
        $(document).click();
        e.stopImmediatePropagation();
        this.$select.css({
          left: this.$('.bui-select').offset().left,
          top: this.$('.bui-select').offset().top + 30
        }).show();
        $(document).one('click', function () {
          ctx.hideSelect();
        });
      },
      empty: function () {
        if (this.selectNode) {
          this.selectNode.empty();
        }
        this.$el.off().remove();
      },
      hideSelect: function () {
        this.$select.hide();
      },
      initSelect: function (items) {
        var viewId = this._options.viewId;
        app.addPanel('select-' + viewId, { el: 'body',
          template: '<div class="select-container-' + viewId + '"></div>'
        })
        this.selectNode = new list({
          el: '.select-container-' + viewId,
          items: items,
          viewId: 'select-list-' + viewId,
          originId: this._options.originId || viewId,
          target: this._options.target,
          input: this._options.input,
          data: {
            path: this._options.path,
            inputNode: this.$('.bui-select-input')
          }
        });
        app.addView('select-list-' + viewId, this.selectNode);
        this.selectNode.setInputNode(this.$('.bui-select-input'));
        this.$select = this.selectNode.getSelect();
      },
      render: function () {
        var ctx = this;
        this._render();
        if (this._options.input && Est.typeOf(this._options.input) === 'string') {
          this._options.input = $(this._options.input);
          this._options.path = this._options.input.val();
        }
        if (this._options.items) {
          ctx.initSelect(this._options.items);
        } else {
          BaseService.getAreaList(this._options.addressUrl).then(function (result) {
            var items = Est.bulidTreeNode(result, 'level', 0, {
              categoryId: 'areaId',// 分类ＩＤ
              belongId: 'belongId',// 父类ＩＤ
              childTag: 'children', // 子分类集的字段名称
              callback: function (item) {
              }  // 回调函数
            });
            ctx.initSelect(items);
          });
        }
      },
      getDistrict: function () {
        if (this.selectNode) {
          return this.selectNode.getDistrict();
        }
      },
      setDistrict: function () {
        if (this._options.input)
          this._options.input.val(this.getDistrict());
      }
    });

    module.exports = District;
  });