/**
 * @description 标签
 * @namespace Tag
 * @author yongjin on 2014/11/18
 */

define('Tag', ['jquery', 'BaseModel', 'BaseCollection', 'BaseItem', 'BaseList',
    'template/tag_view', 'template/tag_view_item', 'template/tag_picker_item'],
  function (require, exports, module) {
    var Tag, TagList, TagItem, BaseModel, BaseCollection, BaseItem, BaseList,
      model, collection, item, tagView, tagViewItem, tagPickerItem;

    BaseModel = require('BaseModel');
    BaseCollection = require('BaseCollection');
    BaseItem = require('BaseItem');
    BaseList = require('BaseList');
    tagView = require('template/tag_view');
    tagViewItem = require('template/tag_view_item');
    tagPickerItem = require('template/tag_picker_item');

    model = BaseModel.extend({
      baseId: 'tagId',
      defaults: Est.extend({
        name: '默认标签'
      }, BaseModel.prototype.defaults),
      url: function () {
        return CONST.API + '/tag/detail' + (model.itemId ? '/' + model.itemId : '') +
          (this.id ? '/' + this.id : '');
      },
      initialize: function () {
        this.hideTip = true;
      }
    });

    collection = BaseCollection.extend({
      model: model,
      url: function () {
        return this.itemId ? CONST.API +
          CONST.SEP + this.tagType + '/detail/' + this.itemId + '/tag?pageSize=1000' :
          CONST.API + '/tag/' + this.tagType + '?pageSize=1000';
      },
      initialize: function () {
        this._initialize();
      },
      setItemId: function (itemId) {
        this.itemId = itemId;
      },
      setTagType: function (tagType) {
        this.tagType = tagType;
      }
    });

    item = BaseItem.extend({
      tagName: 'li',
      className: 'bui-list-item',
      events: {
        'click span': '_del'
      },
      initialize: function () {
        this._initialize({
          template: tagViewItem
        });
      }
    });

    TagItem = BaseItem.extend({
      tagName: 'li',
      className: 'bui-list-item bui-list-item-select',
      events: {
        'click .district-div': 'select',
        'mouseover .bui-list-item': 'mouseover',
        'mouseout .bui-list-item': 'mouseout'
      },
      initialize: function () {
        this._initialize({
          template: tagPickerItem
        });
      },
      select: function () {
        if (!this.$inputHid) this.$inputHid = $(".tag-combox-input-hid");
        this.$inputHid.attr('tagid', this.model.get('id'));
        this.$inputHid.val(this.model.get('name')).click();
        $("#tag-list-picker").hide();
      },
      mouseover: function () {
        this.$el.addClass('bui-list-item-hover');
      },
      mouseout: function () {
        this.$el.removeClass('bui-list-item-hover');
      }
    });
    TagList = BaseList.extend({
      initialize: function (options) {
        this.el = '#tag-list-picker';
        this._initialize({
          render: '#tag-list-picker-ul',
          collection: collection,
          item: TagItem,
          model: model,
          clearDialog: false,
          beforeLoad: function () {
            this.collection.setTagType(options.tagType || 'product');
          }
        });
        return this;
      },
      render: function () {
        this._render();
      }
    });

    Tag = BaseList.extend({
      events: {
        'keyup .tag-combox-input': 'add',
        'click .tag-combox-input': 'showPicker',
        'click .tag-combox-input-hid': 'addHid',
        'click .bui-combox': 'focus'
      },
      initialize: function (options) {
        this.options = options || {};
        model.itemId = options.itemId || null;
        options._isAdd = options._isAdd || false;
        // 初始化容器
        this._initialize({
          collection: collection,
          template: tagView,
          render: '#tag-list-ul',
          item: item,
          model: model,
          clearDialog: false,
          beforeLoad: function () {
            if (!options._isAdd) {
              this.collection.setItemId(options.itemId || null);
              this.collection.setTagType(options.tagType || 'product');
            }
          }
        });
        // 输入框
        this.$input = this.$(".tag-combox-input");
        this.$inputHid = this.$(".tag-combox-input-hid");
        this.$picker = this.$("#tag-list-picker");

        return this;
      },
      focus: function (e) {
        this.$('.tag-combox-input').focus();
        this.showPicker(e);
      },
      setOption: function (options) {

      },
      add: function (e) {
        if (e.keyCode === CONST.ENTER_KEY) {
          this.insert(this.$input.val());

        }
        return false;
      },
      addHid: function () {
        this.insert(this.$inputHid.val(), this.$inputHid.attr('tagid'));
        this.$input.attr('tagId', '');
      },
      insert: function (inputVal, tagId) {
        var ctx = this;
        var newModel, filter;

        if (Est.isEmpty(Est.trim(inputVal))) return;
        filter = this.collection.filter(function (model) {
          return model.get('name') === inputVal;
        });
        if (filter.length > 0) {
          filter[0].view.$el.addClass('bui-list-item-active');
          setTimeout(function () {
            filter[0].view.$el.removeClass('bui-list-item-active');
          }, 800);
          this.$input.val('');
          return;
        }
        newModel = new model({
          name: inputVal,
          tagId: tagId
        });
        newModel.save(null, {
          wait: true,
          success: function () {
            ctx.collection.push(newModel);
            ctx.tagList = null;
          }
        });
        this.$input.val('');
        this.hidePicker();
      },
      hidePicker: function () {
        $("#tag-list-picker").hide();
      },
      showPicker: function (e) {
        var ctx = this;
        e.stopImmediatePropagation();
        if (!this.tagList) {
          var opts = Est.cloneDeep(this.options);
          opts.el = null;
          this.tagList = new TagList(opts);
        }
        this.$picker.css({
          left: this.$input.position().left,
          top: this.$input.position().top + 37
        }).show();
        $(document).one('click', function () {
          ctx.hidePicker();
        });
      }
    });

    module.exports = Tag;
  });
