/**
 * @description 工厂类， 提供数组接口
 * @class factory - 工厂类
 * @author yongjin on 2014/7/3
 */
/**
 * @description 统计分析工厂类
 * @method [统计] - AnalysisFactory
 * @author wyj on 14/7/2
 * @example
 *      query : AnalysisFactory.query(); // 全查
 *              AnalysisFactory.query({page: 1, pageSize: 5}); // 分页查询
 *
 *      save : AnalysisFactory.save(product).then(function(data){
 *                  $rootScope.showMsg("修改成功!",{ time: 500 });
 *              }, function(){
 *                  $rootScope.showMsg("修改失败!");
 *              });
 *
 *      detail : AnalysisFactory.detail(product.product_id).then(function(data){
 *                  $scope.product = data;
 *              });
 *
 *      del : AnalysisFactory.del(product).then(function(data){ // 参数可以是ID 或 product对象 或ID数组
 *                  $rootScope.showMsg("删除成功！",1000);
 *              }, function(){
 *                  $rootScope.showMsg("删除失败！");
 *              });
 */
app.factory('AnalysisFactory', ['BaseFactory', function (BaseFactory) {
    return {
        query: function (params) {
            var url = params ? 'seo/analysis' : 'seo/analysis';
            return BaseFactory.query(url, params);
        },
        save: function (target, params) {
            return BaseFactory.save(target, 'seo/analysis', {
                id: 'analysis_id'
            }, params);
        },
        detail: function (id) {
            if (Est.typeOf(id) === 'object'){
                id = id.analysis_id;
            }
            return BaseFactory.detail('seo/analysis', id);
        },
        del: function (id) {
            var type = Est.typeOf(id);
            switch (type){
                case 'array':
                    return BaseFactory.del('seo/analysis', undefined, id);
                case 'object':
                    id = id.analysis_id;
            }
            return BaseFactory.del('seo/analysis', id);
        }
    }
}]);
