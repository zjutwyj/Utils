/**
 * @description 工厂类， 提供数组接口
 * @class factory - 工厂类
 * @author yongjin on 2014/7/3
 */


/**
 * @description 招聘
 * @method [招聘] - RecruitFactory
 * @author wyj on 14/7/4
 * @example
 *      query : RecruitFactory.query(); // 全查
 *              RecruitFactory.query({page: 1, pageSize: 5}); // 分页查询
 *
 *      save : RecruitFactory.save(albumId, item).then(function(data){
 *                  $rootScope.showMsg("修改成功!",{ time: 500 });
 *              }, function(){
 *                  $rootScope.showMsg("修改失败!");
 *              });
 *
 *      detail : RecruitFactory.detail(id).then(function(data){
 *                  $scope.item = data;
 *              });
 *
 *      del : RecruitFactory.del(albumId, item).then(function(data){ // 参数可以是ID 或 item对象 或 ID数组
 *                  $rootScope.showMsg("删除成功！",1000);
 *              }, function(){
 *                  $rootScope.showMsg("删除失败！");
 *              });
 */
app.factory('RecruitFactory', ['BaseFactory', function(BaseFactory){
    return {
        query: function (params) {
            var url = params ? 'job' : 'job';
            return BaseFactory.query(url, params);
        },
        save: function (target, params) {
            return BaseFactory.save(target, 'job', {
                id: 'job_id'
            }, params);
        },
        detail: function (id) {
            if (Est.typeOf(id) === 'object'){
                id = id.job_id;
            }
            return BaseFactory.detail('job', id);
        },
        del: function (id) {
            switch (Est.typeOf(id)){
                case 'array':
                    return BaseFactory.del('job', undefined, id);
                case 'object':
                    id = id.job_id;
            }
            return BaseFactory.del('job', id);
        }
    }
}]);
