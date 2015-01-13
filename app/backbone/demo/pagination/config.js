/**
 * @description config
 * @namespace config
 * @author yongjin<zjut_wyj@163.com> 2014/12/11
 */
app.addTemplate('template/pagination', function (require, exports, module) {
  module.exports = require('common/pagination/pagination.html');
});
app.addModule('Pagination', 'common/pagination/Pagination.js');
app.addModule('PaginationModel', 'common/pagination/PaginationModel.js');

