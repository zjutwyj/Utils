/**
 * @description main
 * @class main
 * @author yongjin<zjut_wyj@163.com> 2015/3/23
 */
app.addModule('Editor', 'common/ck_editor/controllers/Editor.js');
app.addTemplate('template/editor_view', function (require, exports, module) {
  module.exports = require('common/ck_editor/views/editor_view.html');
});