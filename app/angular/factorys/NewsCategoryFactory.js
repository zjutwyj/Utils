/**
 * @description 工厂类， 提供数组接口
 * @class factory - 工厂类
 * @author yongjin on 2014/7/3
 */

/**
 * @description 新闻分类工厂类
 * @method [分类] - NewsCategoryFactory
 * @author wyj on 14/7/3
 * @example
 *      query : NewsCategoryFactory.query(); // 全查
 *              NewsCategoryFactory.query({page: 1, pageSize: 5}); // 分页查询
 *
 *      save : NewsCategoryFactory.save(category).then(function(data){
 *                  $rootScope.showMsg("修改成功!",{ time: 500 });
 *              }, function(){
 *                  $rootScope.showMsg("修改失败!");
 *              });
 *
 *      detail : NewsCategoryFactory.detail(category.category_id).then(function(data){
 *                  $scope.category = data;
 *              });
 *
 *      del : NewsCategoryFactory.del(category).then(function(data){ // 参数可以是ID 或 category对象 或 ID数组
 *                  $rootScope.showMsg("删除成功！",1000);
 *              }, function(){
 *                  $rootScope.showMsg("删除失败！");
 *              });
 */
app.factory('NewsCategoryFactory', ['BaseFactory', function (BaseFactory) {
    return {
        query: function (params) {
            var url = params ? 'news/category' : 'news/category';
            return BaseFactory.query(url, params);
        },
        save: function (target, params) {
            return BaseFactory.save(target, 'news/category', {
                id: 'category_id'
            }, params);
        },
        detail: function (id) {
            if (Est.typeOf(id) === 'object'){
                id = id.category_id;
            }
            return BaseFactory.detail('news/category', id);
        },
        del: function (id) {
            switch (Est.typeOf(id)){
                case 'array':
                    return BaseFactory.del('news/category', undefined, id);
                case 'object':
                    id = id.category_id;
            }
            return BaseFactory.del('news/category', id);
        }
    }
}]);