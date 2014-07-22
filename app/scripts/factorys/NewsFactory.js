/**
 * @description 工厂类， 提供数组接口
 * @class factory - 工厂类
 * @author yongjin on 2014/7/3
 */
/**
 * @description 新闻工厂类
 * @method [新闻] - NewsFactory
 * @author wyj on 14/7/2
 * @example
 *      query : NewsFactory.query(); // 全查
 *              NewsFactory.query({page: 1, pageSize: 5}); // 分页查询
 *
 *      save : NewsFactory.save(news).then(function(data){
 *                  $rootScope.showMsg("修改成功!",{ time: 500 });
 *              }, function(){
 *                  $rootScope.showMsg("修改失败!");
 *              });
 *
 *      detail : NewsFactory.detail(news.news_id).then(function(data){
 *                  $scope.news = data;
 *              });
 *
 *      del : NewsFactory.del(news).then(function(data){ // 参数可以是ID 或 news对象 或 ID数组
 *                  $rootScope.showMsg("删除成功！",1000);
 *              }, function(){
 *                  $rootScope.showMsg("删除失败！");
 *              });
 */
app.factory('NewsFactory', ['BaseFactory', function (BaseFactory) {
    return {
        query: function (params) {
            var url = params ? 'news' : 'newsAll?tag=true';
            return BaseFactory.query(url, params);
        },
        save: function (target, params) {
            return BaseFactory.save(target, 'news', {
                id: 'news_id'
            }, params);
        },
        detail: function (id) {
            if (Est.typeOf(id) === 'object'){
                id = id.news_id;
            }
            return BaseFactory.detail('news', id);
        },
        del: function (id) {
            var type = Est.typeOf(id);
            switch (type){
                case 'array':
                    return BaseFactory.del('news', undefined, id);
                case 'object':
                    id = id.news_id;
            }
            return BaseFactory.del('news', id);
        }
    }
}]);
