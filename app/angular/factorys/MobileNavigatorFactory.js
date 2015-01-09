/**
 * @description 工厂类， 提供数组接口
 * @class factory - 工厂类
 * @author yongjin on 2014/7/3
 */
/**
 * @description 手机导航工厂类
 * @method [导航] - MobileNavigatorFactory
 * @author wyj on 14/7/2
 * @example
 *      query : MobileNavigatorFactory.query(); // 全查
 *              MobileNavigatorFactory.query({page: 1, pageSize: 5}); // 分页查询
 *
 *      save : MobileNavigatorFactory.save(product).then(function(data){
 *                  $rootScope.showMsg("修改成功!",{ time: 500 });
 *              }, function(){
 *                  $rootScope.showMsg("修改失败!");
 *              });
 *
 *      detail : MobileNavigatorFactory.detail(product.product_id).then(function(data){
 *                  $scope.product = data;
 *              });
 *
 *      del : MobileNavigatorFactory.del(product).then(function(data){ // 参数可以是ID 或 product对象 或ID数组
 *                  $rootScope.showMsg("删除成功！",1000);
 *              }, function(){
 *                  $rootScope.showMsg("删除失败！");
 *              });
 */
app.factory('MobileNavigatorFactory', ['BaseFactory', function (BaseFactory) {
    return {
        query: function (params) {
            var url = params ? 'mnavigator' : 'mnavigator';
            return BaseFactory.query(url, params);
        },
        save: function (target, params) {
            return BaseFactory.save(target, 'mnavigator', {
                id: 'navigator_id'
            }, params);
        },
        detail: function (id) {
            if (Est.typeOf(id) === 'object'){
                id = id.navigator_id;
            }
            return BaseFactory.detail('mnavigator', id);
        },
        del: function (id) {
            var type = Est.typeOf(id);
            switch (type){
                case 'array':
                    return BaseFactory.del('mnavigator', undefined, id);
                case 'object':
                    id = id.product_id;
            }
            return BaseFactory.del('mnavigator', id);
        }
    }
}]);
