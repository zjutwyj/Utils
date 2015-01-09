/**
 * @description 工厂类， 提供数组接口
 * @class factory - 工厂类
 * @author yongjin on 2014/7/3
 */

/**
 * @description 产品标签
 * @method [标签] - ProductTagFactory
 * @author wyj on 14/7/2
 * @example
 *      query : ProductTagFactory.query(); // 全查
 *              ProductTagFactory.query({page: 1, pageSize: 5}); // 分页查询
 *
 *      save : ProductTagFactory.save(item).then(function(data){
 *                  $rootScope.showMsg("修改成功!",{ time: 500 });
 *              }, function(){
 *                  $rootScope.showMsg("修改失败!");
 *              });
 *
 *      detail : ProductTagFactory.detail(id).then(function(data){
 *                  $scope.item = data;
 *              });
 *
 *      del : ProductTagFactory.del(item).then(function(data){ // 参数可以是ID 或 item对象 或 ID数组
 *                  $rootScope.showMsg("删除成功！",1000);
 *              }, function(){
 *                  $rootScope.showMsg("删除失败！");
 *              });
 *
 *      saveProTag : ProductTagFactory.saveProTag($scope.product.product_id, item.tag_id); // 保存产品标签
 *
 *      delProTag : ProductTagFactory.delProTag($scope.product.product_id, item.tag_id); // 删除产品标签
 */
app.factory('ProductTagFactory', ['BaseFactory', function (BaseFactory) {
    return {
        query: function (params) {
            var url = params ? 'product/tag' : 'product/tag';
            return BaseFactory.query(url, params);
        },
        detail: function (id) {
            if (Est.typeOf(id) === 'object'){
                id = id.tag_id;
            }
            return BaseFactory.query('product/' + id + '/tag');
        },
        save: function (target, params) {
            return BaseFactory.save(target, 'product/tag', {
                id: 'tag_id'
            }, params);
        },
        del: function (id) {
            switch (Est.typeOf(id)){
                case 'array':
                    return BaseFactory.del('product/tag', undefined, id);
                case 'object':
                    id = id.category_id;
            }
            return BaseFactory.del('product/tag', id);
        },
        saveProTag: function (product_id, tag_id, params) {
            return BaseFactory.save({
                product_id: product_id,
                tag_id: tag_id
            }, '/product/' + product_id + '/tag', {}, params);
        },
        delProTag: function (product_id, tag_id) {
            var tag_id = Est.typeOf(tag_id) === 'object' ? tag_id.tag_id : tag_id;
            return BaseFactory.del('product/' + product_id + '/tag/' + tag_id);
        }
    };
}]);