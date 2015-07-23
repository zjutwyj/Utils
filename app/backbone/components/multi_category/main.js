/**
 * Created by Administrator on 2015/5/12.
 */
app.addModule('MultiCategory', 'common/multi_category/controllers/MultiCategory.js');
app.addTemplate('template/multi_category_item', function(require, exports, module){
  module.exports = require('common/multi_category/views/multi_category_item.html');
});

