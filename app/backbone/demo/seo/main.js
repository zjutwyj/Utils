/**
 * @description main
 * @namespace main
 * @author yongjin<zjut_wyj@163.com> 2014/12/26
 */
app.addModule('SeoDetail', 'common/seo/SeoDetail.js');
app.addModule('SeoModel', 'models/SeoModel.js');
app.addModule('SeoMobileDetail', 'common/seo/SeoMobileDetail.js');
app.addTemplate('template/seo_detail', function(require, exports, module){
  module.exports = require('common/seo/views/seo_detail.html');
});