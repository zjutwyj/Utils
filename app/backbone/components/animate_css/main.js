/**
 * @description main
 * @class main
 * @author yongjin<zjut_wyj@163.com> 2015/3/25
 */
app.addModule('AnimateCss', 'components/animate_css/controllers/AnimateCss.js');
app.addTemplate('template/animate_css_view', function (require, exports, module) {
  module.exports = require('components/animate_css/views/animate_css_view.html');
});