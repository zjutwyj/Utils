/**
 * @description main
 * @class main
 * @author yongjin<zjut_wyj@163.com> 2015/6/11
 */
app.addModule('MusicPanel', 'components/music/controllers/MusicPanel.js');
app.addTemplate('template/music_panel', function (require, exports, module) {
  module.exports = require('components/music/views/music_panel.html');
});