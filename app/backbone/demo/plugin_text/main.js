/**
 * @description main
 * @class main
 * @author yongjin<zjut_wyj@163.com> 2015/4/11
 */
app.addModule('PluginText', 'common/plugin_text/controllers/PluginText.js');
app.addTemplate('template/plugin_text_view', function (require, exports, module) {
  module.exports = require('common/plugin_text/views/plugin_text_view.html');
});