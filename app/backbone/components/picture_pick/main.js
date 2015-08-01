/**
 * @description main
 * @namespace main
 * @author yongjin<zjut_wyj@163.com> 2014/12/19
 */
app.addModule('PicturePick', 'components/picture_pick/controllers/PicturePick.js');
app.addTemplate('template/picture_pick_list', function(require, exports, module){
  module.exports = require('components/picture_pick/views/picture_pick_list.html');
});
app.addTemplate('template/picture_pick_item', function(require, exports, module){
  module.exports = require('components/picture_pick/views/picture_pick_item.html');
});

