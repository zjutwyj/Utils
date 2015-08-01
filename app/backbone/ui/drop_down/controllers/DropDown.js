/**
 * @description DropDown
 * @class DropDown
 * @author yongjin<zjut_wyj@163.com> 2015/1/27
 */
define('DropDown', ['template/drop_down_view'], function (require, exports, module) {
  var DropDown, template;

  template = require('template/drop_down_view');

  DropDown = BaseView.extend({
    events: {
      'click .bui-list-picker': 'preventDefault'
    },
    initialize: function () {
      this._initialize({
        template: template
      });
      this.hasContent = false;
      this._options.data.width = this._options.data.width ? (Est.typeOf(this._options.data.width) === 'string' ? this._options.data.width : this._options.data.width + 'px') : 'auto';
      this._options.data.height = this._options.data.height ? (Est.typeOf(this._options.data.height) === 'string' ? this._options.data.height : this._options.data.height + 'px') : 'auto';
      this.render();
    },
    /**
     * 初始化DOM元素
     */
    init: function () {
      this.$picker = this.$('.bui-list-picker');
      this.$target = $(this._options.target);
      this.$content = this.$('.bui-select-list');
    },
    /**
     * 阻止点击下拉框触发关闭事件
     * @param e
     */
    preventDefault: function (e) {
      e.stopImmediatePropagation();
      this.bindCloseEvent();
    },
    /**
     * 绑定关闭事件
     */
    bindCloseEvent: function () {
      $(document).one('click', Est.proxy(this.hide, this));
    },
    /**
     * 显示下拉框
     * @param e
     */
    show: function (event) {
      //event && event.stopImmediatePropagation();
      $(document).click();
      this.$picker.css({
        left: this._options.mouseFollow ? event.pageX + 1 : this.$target.offset().left,
        top: this._options.mouseFollow ? event.pageY + 1 : this.$target.offset().top + 31
      }).show();
      !this.hasContent && this.initContent();
      this.bindCloseEvent();
      return this;
    },
    close: function(){
      this.hide();
      return this;
    },
    remove: function(){
      this.$picker.off().remove();
    },
    /**
     * 刷新视图
     * @param callback
     */
    reflesh: function (callback) {
      this.hasContent = false;
      callback && callback.call(this, this._options);
      this.show();
    },
    /**
     * 初始化下拉框内容
     */
    initContent: function () {
      this.hasContent = true;
      if (this._options.content) {
        this.$content.html(this._options.content);
        this._options.dropDownId = this._options.viewId;
        this._options.callback && this._options.callback.call(this, this._options);
      } else if (this._options.moduleId) {
        //TODO moduleId
        if (Est.typeOf(this._options.moduleId) === 'string') {
          seajs.use([this._options.moduleId], Est.proxy(function (instance) {
            this.doRender(instance);
          }, this));
        } else {
          this.doRender(this._options.moduleId);
        }
      }
    },
    doRender: function (instance) {
      this.viewId = Est.typeOf(this._options.moduleId) === 'string' ? this.viewId : Est.nextUid('DropDown');
      delete this._options.template;
      this.$content.html('');
      // jquery对象无法通过Est.each遍历， 需备份到this._target,
      // 再移除target, 待克隆完成后把target添加到参数中
      if (this._options.target && Est.typeOf(this._options.target) !== 'String') {
        this._target = this._options.target;
        delete this._options.target;
      }
      app.addView(this.viewId, new instance(Est.extend(Est.cloneDeep(this._options), {
        el: this.$content,
        dropDownId: this._options.viewId,
        viewId: this.viewId,
        afterRender: this._options.callback,
        target: this._target
      })));
    },
    /**
     * 隐藏下拉框
     */
    hide: function () {
      this.$picker.hide();
    },
    /**
     * 清空下拉框
     */
    empty: function () {
      this.$el.off().remove();
    },
    render: function () {
      this._render();
      this.init();
    }
  });

  module.exports = DropDown;
});