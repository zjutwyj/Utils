/**
 * @description main
 * @class main
 * @author yongjin<zjut_wyj@163.com> 2015/6/12
 */
app.addModule('AnimatePanel', 'components/animate/controllers/AnimatePanel.js');
app.addTemplate('template/animate_panel', function (require, exports, module) {
  module.exports = require('components/animate/views/animate_panel.html');
});