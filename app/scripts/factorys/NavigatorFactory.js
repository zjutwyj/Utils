/**
 * @description 工厂类， 提供数组接口
 * @class factory - 工厂类
 * @author yongjin on 2014/7/3
 */
/**
 * @description 导航工厂类
 * @method [导航] - NavigatorFactory
 * @author wyj on 14/7/2
 * @example
 *      query : NavigatorFactory.query(); // 全查
 *              NavigatorFactory.query({page: 1, pageSize: 5}); // 分页查询
 *
 *      save : NavigatorFactory.save(product).then(function(data){
 *                  $rootScope.showMsg("修改成功!",{ time: 500 });
 *              }, function(){
 *                  $rootScope.showMsg("修改失败!");
 *              });
 *
 *      detail : NavigatorFactory.detail(product.product_id).then(function(data){
 *                  $scope.product = data;
 *              });
 *
 *      del : NavigatorFactory.del(product).then(function(data){ // 参数可以是ID 或 product对象 或ID数组
 *                  $rootScope.showMsg("删除成功！",1000);
 *              }, function(){
 *                  $rootScope.showMsg("删除失败！");
 *              });
 */
app.factory('NavigatorFactory', ['BaseFactory', function (BaseFactory) {
    return {
        query: function (params) {
            var url = params ? 'navigator' : 'navigator';
            return BaseFactory.query(url, params);
        },
        save: function (target, params) {
            return BaseFactory.save(target, 'navigator', {
                id: 'navigator_id'
            }, params);
        },
        detail: function (id) {
            if (Est.typeOf(id) === 'object'){
                id = id.navigator_id;
            }
            return BaseFactory.detail('navigator', id);
        },
        del: function (id) {
            var type = Est.typeOf(id);
            switch (type){
                case 'array':
                    return BaseFactory.del('navigator', undefined, id);
                case 'object':
                    id = id.product_id;
            }
            return BaseFactory.del('navigator', id);
        }
    }
}]);
