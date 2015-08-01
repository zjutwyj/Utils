/**
 * @description main
 * @namespace main
 * @author yongjin<zjut_wyj@163.com> 2014/12/26
 */
app.addModule('SeoModel', 'models/SeoModel.js');
app.addModule('SeoDetail', 'components/seo/controllers/SeoDetail.js');
app.addModule('SeoMobileDetail', 'components/seo/controllers/SeoMobileDetail.js');
app.addTemplate('template/seo_detail', function(require, exports, module){
  module.exports = require('components/seo/views/seo_detail.html');
});