/**
 * @description main
 * @class main
 * @author yongjin<zjut_wyj@163.com> 2015/3/24
 */
app.addModule('MessageForm', 'common/message/controllers/MessageForm.js');
app.addTemplate('template/common_message_view', function (require, exports, module) {
  module.exports = require('common/message/views/common_message_view.html');
});