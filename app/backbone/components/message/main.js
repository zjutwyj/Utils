/**
 * @description main
 * @class main
 * @author yongjin<zjut_wyj@163.com> 2015/3/24
 */
app.addModule('MessageForm', 'components/message/controllers/MessageForm.js');
app.addTemplate('template/common_message_view', function (require, exports, module) {
  module.exports = require('components/message/views/common_message_view.html');
});