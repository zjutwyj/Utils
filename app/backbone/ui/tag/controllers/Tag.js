/**
 * @description 标签
 * @namespace Tag
 * @author yongjin on 2014/11/18
 */

define('Tag', ['template/tag_view', 'template/tag_picker_item'],
  function (require, exports, module) {
    var Tag, TagList, TagItem, model, collection, item, tagView, tagPickerItem, RecTag, recItem;

    tagView = require('template/tag_view');
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
          CONST.SEP + this.tagType + '/detail/' + this.itemId + '/tag?pageSize=1000' : this.tagType ?
          CONST.API + '/tag/' + this.tagType + '?pageSize=1000' : CONST.API + '';
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


    /*下拉单视图*/
    TagItem = BaseItem.extend({
      tagName: 'li',
      className: 'bui-list-item bui-list-item-select',
      events: {
        'click .district-div': 'select',
        'click .delete': '_del',
        'mouseover .bui-list-item': 'mouseover',
        'mouseout .bui-list-item': 'mouseout',
        'click .edit': 'editName'
      },
      initialize: function () {
        this._initialize({
          viewId : 'tagList',
          template: tagPickerItem
        });
      },
      editName: function (e) {
        e.stopImmediatePropagation();
        this._editField({
          target: '.edit',
          title: '修改属性名称',
          field: 'name'
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
          viewId : 'tagList',
          item: TagItem,
          model: model,
          clearDialog: false,
          beforeLoad: function () {
            this._clear();
            this.collection.setTagType(options.tagType || 'product');
          }
        });
        return this;
      },
      render: function () {
        this._render();
      }
    });

    recItem = BaseItem.extend({
      events: {
        'click .rec-tag-a': 'add'
      },
      tagName: 'span',
      className: 'rec-tag-name',
      initialize: function () {
        this._initialize({
          template: '<a href="javascript:;" class="rec-tag-a">{{name}}&nbsp;&nbsp;&nbsp;</a>'
        });
      },
      // 添加推荐标签
      add: function () {
        app.getView(this._options.data.reference).initTagList(this.model.get('name'))
          .then(Est.proxy(function (tagId) {
            app.getView(this._options.data.reference).insert(this.model.get('name'), tagId);
          }, this));
      },
      render: function () {
        this._render();
      }
    });
    // 推荐标签
    RecTag = BaseList.extend({
      initialize: function () {
        this._initialize({
          model: model,
          collection: collection,
          item: recItem,
          items: [
            {name: '最新'},
            {name: '热卖'},
            {name: '推荐'},
            {name: '置顶'},
            {name: '促销'},
            {name: '打折'}
          ],
          clearDialog: false
        });
      }
    });


    /*组件单视图*/
    item = BaseItem.extend({
      tagName: 'li',
      className: 'bui-list-item',
      events: {
        'click span': '_del'
      },
      initialize: function () {
        this._initialize({
          template: '{{name}} <span class="{{id}}" style="cursor:pointer;">×</span>'
        });
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
          },
          afterRender: function () {
            var recTag = app.addView('recTag', new RecTag({
              viewId: 'recTag',
              data: {
                reference: this._options.viewId
              },
              el: '.rec-tag-span'
            }));
            this.recTag = recTag;
          }
        });
        // 输入框
        this.$input = this.$(".tag-combox-input");
        this.$inputHid = this.$(".tag-combox-input-hid");
        this.$picker = this.$("#tag-list-picker");

        return this;
      },
      // 文本框获取焦点
      focus: function (e) {
        this.$('.tag-combox-input').focus();
        this.showPicker(e);
      },
      // 添加标签
      add: function (e) {
        if (e.keyCode === CONST.ENTER_KEY) {
          var name = this.$input.val();
          this.initTagList(name).then(Est.proxy(function (tagId) {
            this.insert(name, tagId);
          }, this));
        }
      },
      // 初始化标签
      initTagList: function (name) {
        return new Est.promise(Est.proxy(function (resolve, reject) {
          // 用于判断是否存在tagList, 分别作相应处理
          if (!this.tagList) {
            this.getTagList(Est.proxy(function (collection) { // 用于获取标签列表
              resolve(this.findTagIdByName(collection.models, name));
            }, this));
          } else {
            // 若存在tagList, 直接调用现存的标签列表
            resolve(this.findTagIdByName(this.tagList.collection.models, name));
          }
        }, this));
      },
      // 获取标签列表
      getTagList: function (callback) {
        var opts = Est.cloneDeep(this.options);
        delete opts.el;
        opts.afterLoad = callback;
        delete opts.item;
        opts.viewId = 'tagList';
        this.tagList = new TagList(opts);
      },
      // 获取标签Id
      findTagIdByName: function (models, name) {
        var index = Est.findIndex(models, function (model) {
          return model.get('name') === name;
        });
        if (index !== -1) {
          return this.tagList.collection.models[index].get('tagId');
        }
      },
      // 回车输入
      addHid: function () {
        this.insert(this.$inputHid.val(), this.$inputHid.attr('tagid'));
        this.$input.attr('tagId', '');
      },
      // 基础插入方法
      insert: function (inputVal, tagId) {
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
        // 新建模型类
        newModel = new model({
          name: inputVal,
          tagId: tagId
        });
        // 保存模型类
        newModel.save(null, {
          wait: true,
          success: Est.proxy(function () {
            this.collection.push(newModel);
            this.tagList = null;
          }, this)
        });
        this.$input.val('');
        this.hidePicker();
      },
      // 隐藏下拉框
      hidePicker: function () {
        $("#tag-list-picker").hide();
      },
      // 显示下拉框
      showPicker: function (e) {
        e.stopImmediatePropagation();
        if (!this.tagList) this.initTagList();
        this.$picker.css({
          left: this.$input.position().left,
          top: this.$input.position().top + 37
        }).show();
        $(document).one('click', Est.proxy(function () {
          this.hidePicker();
        }, this));
      }
    });

    module.exports = Tag;
  })
;
