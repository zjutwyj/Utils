/**
 * Created by Administrator on 2015/5/12.
 */
app.addModule('MultiCategory', 'components/multi_category/controllers/MultiCategory.js');
app.addTemplate('template/multi_category_item', function(require, exports, module){
  module.exports = require('components/multi_category/views/multi_category_item.html');
});

