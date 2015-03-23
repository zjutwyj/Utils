/**
 * @description config
 * @namespace config
 * @author yongjin<zjut_wyj@163.com> 2014/12/11
 */
app.addTemplate('template/tag_view', function (require, exports, module) {
  module.exports = require('common/tag/views/tag_view.html');
});
app.addTemplate('template/tag_view_item', function (require, exports, module) {
  module.exports = require('common/tag/views/tag_view_item.html');
});
app.addTemplate('template/tag_picker_item', function (require, exports, module) {
  module.exports = require('common/tag/views/tag_picker_item.html');
});
app.addModule('Tag', 'common/tag/controllers/Tag.js');
