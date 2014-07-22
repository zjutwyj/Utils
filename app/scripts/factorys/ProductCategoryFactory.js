/**
 * @description 工厂类， 提供数组接口
 * @class factory - 工厂类
 * @author yongjin on 2014/7/3
 */

/**
 * @description 产品分类工厂类
 * @method [分类] - ProductCategoryFactory
 * @author wyj on 14/7/3
 * @example
 *      query : ProductCategoryFactory.query(); // 全查
 *              ProductCategoryFactory.query({page: 1, pageSize: 5}); // 分页查询
 *
 *      save : ProductCategoryFactory.save(category).then(function(data){
 *                  $rootScope.showMsg("修改成功!",{ time: 500 });
 *              }, function(){
 *                  $rootScope.showMsg("修改失败!");
 *              });
 *
 *      detail : ProductCategoryFactory.detail(category.category_id).then(function(data){
 *                  $scope.category = data;
 *              });
 *
 *      del : ProductCategoryFactory.del(category).then(function(data){ // 参数可以是ID 或 category对象 或 ID数组
 *                  $rootScope.showMsg("删除成功！",1000);
 *              }, function(){
 *                  $rootScope.showMsg("删除失败！");
 *              });
 */
app.factory('ProductCategoryFactory', ['BaseFactory', function (BaseFactory) {
    return {
        query: function (params) {
            var url = params ? 'product/category' : 'product/category';
            return BaseFactory.query(url, params);
        },
        save: function (target, params) {
            return BaseFactory.save(target, 'product/category', {
                id: 'category_id'
            }, params);
        },
        detail: function (id) {
            if (Est.typeOf(id) === 'object'){
                id = id.category_id;
            }
            return BaseFactory.detail('product/category', id);
        },
        del: function (id) {
            switch (Est.typeOf(id)){
                case 'array':
                    return BaseFactory.del('product/category', undefined, id);
                case 'object':
                    id = id.category_id;
            }
            return BaseFactory.del('product/category', id);
        }
    }
}]);