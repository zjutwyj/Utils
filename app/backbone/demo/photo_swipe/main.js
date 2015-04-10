/**
 * @description main
 * @class main
 * @author yongjin<zjut_wyj@163.com> 2015/4/9
 */
app.addModule('PhotoSwipeView', 'common/photo_swipe/controllers/PhotoSwipeView.js');
app.addTemplate('template/photo_swipe_view', function (require, exports, module) {
  module.exports = require('common/photo_swipe/views/photo_swipe_view.html');
});