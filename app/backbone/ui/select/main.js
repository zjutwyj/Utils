/**
 * @description config
 * @namespace config
 * @author yongjin<zjut_wyj@163.com> 2014/12/11
 */
/*select*/
app.addTemplate('template/select_list', function (require, exports, module) {
  module.exports = require('common/select/views/select_list.html')
});
app.addTemplate('template/select_item', function (require, exports, module) {
  module.exports = require('common/select/views/select_item.html');
});
app.addTemplate('template/select_view', function (require, exports, module) {
  module.exports = require('common/select/views/select_view.html');
});
app.addModule('Select', 'common/select/controllers/Select.js');
/*
 'Select': 'common/select/Select.js'*/
