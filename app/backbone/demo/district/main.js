/**
 * @description main
 * @namespace main
 * @author yongjin<zjut_wyj@163.com> 2015/1/5
 */
app.addModule('District', 'common/district/District.js');
app.addTemplate('template/district_list', function(require, exports, module){
  module.exports = require('common/district/views/district_list.html');
});
app.addTemplate('template/district_item', function(require, exports, module){
  module.exports = require('common/district/views/district_item.html');
});
app.addTemplate('template/district_view', function(require, exports, module){
  module.exports = require('common/district/views/district_view.html');
});