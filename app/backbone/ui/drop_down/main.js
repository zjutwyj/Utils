/**
 * @description main
 * @class main
 * @author yongjin<zjut_wyj@163.com> 2015/1/27
 */
app.addModule('DropDown', 'ui/drop_down/controllers/DropDown.js');

app.addTemplate('template/drop_down_view', function (require, exports, module) {
  module.exports = require('ui/drop_down/views/drop_down_view.html');
});