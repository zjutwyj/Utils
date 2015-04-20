/**
 * @description main
 * @class main
 * @author yongjin<zjut_wyj@163.com> 2015/4/11
 */
app.addModule('PluginPicture', 'common/plugin_picture/controllers/PluginPicture.js');
app.addTemplate('template/plugin_picture_view', function (require, exports, module) {
  module.exports = require('common/plugin_picture/views/plugin_picture_view.html');
});