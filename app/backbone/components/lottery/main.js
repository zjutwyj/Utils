/**
 * @description main
 * @class main
 * @author yongjin<zjut_wyj@163.com> 2015/3/25
 */
app.addModule('Lottery', 'components/lottery/controllers/Lottery.js');
app.addTemplate('template/common_lottery_view', function (require, exports, module) {
  module.exports = require('components/lottery/views/common_lottery_view.html');
});

app.addModule('LotteryList', 'components/lottery/controllers/LotteryList.js');
app.addTemplate('template/lottery_item', function (require, exports, module) {
  module.exports = require('components/lottery/views/lottery_item.html');
});
app.addModule('LotteryDraw', 'components/lottery/controllers/LotteryDraw.js');
app.addTemplate('template/common_lottery_draw', function (require, exports, module) {
  module.exports = require('components/lottery/views/common_lottery_draw.html');
});
app.addModule('rotate', 'vendor/rotate/rotate.js');
