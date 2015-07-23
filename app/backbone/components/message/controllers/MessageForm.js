/**
 * @description MessageForm
 * @class MessageForm
 * @author yongjin<zjut_wyj@163.com> 2015/3/24
 */
define('MessageForm', ['template/common_message_view'], function (require, exports, module) {
  var MessageForm, template;

  template = require('template/common_message_view');

  MessageForm = BaseView.extend({
    events: {
      'click input[type=checkbox]': 'showItem'
    },
    initialize: function () {
      this._initialize({
        template: template
      });
      this.render();
    },
    showItem: function (e) {
      var $target = e.target ? $(e.target) : $(e.currentTarget);
      var id = $target.attr('data-target');
      if ($target.attr('checked')) {
        this.$itemContainer.find('#item-' + id).removeClass('item-removed').show();
      } else {
        this.$itemContainer.find('#item-' + id).addClass('item-removed').hide();
      }
    },
    getContent: function () {
      var $msgCont = this.$('.message-content');
      $msgCont.find('.item-removed').remove();
      return $msgCont.html();
    },
    render: function () {
      this._render();
      this.$itemContainer = this.$('.message-content');
    }
  });

  module.exports = MessageForm;
});