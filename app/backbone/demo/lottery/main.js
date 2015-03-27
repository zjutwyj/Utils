/**
 * @description main
 * @class main
 * @author yongjin<zjut_wyj@163.com> 2015/3/25
 */
app.addModule('Lottery', 'common/lottery/controllers/Lottery.js');
app.addTemplate('template/common_lottery_view', function (require, exports, module) {
  module.exports = require('common/lottery/views/common_lottery_view.html');
});

app.addModule('LotteryList', 'common/lottery/controllers/LotteryList.js');
app.addTemplate('template/lottery_item', function (require, exports, module) {
  module.exports = require('common/lottery/views/lottery_item.html');
});