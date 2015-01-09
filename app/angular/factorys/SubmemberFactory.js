/**
 * @description 工厂类， 提供数组接口
 * @class factory - 工厂类
 * @author yongjin on 2014/7/3
 */

/**
 * @description 二级会员
 * @method [会员] - SubmemberFactory
 * @author wyj on 14/7/4
 * @example
 *      query : SubmemberFactory.query(); // 全查
 *              SubmemberFactory.query({page: 1, pageSize: 5}); // 分页查询
 *
 *      save : SubmemberFactory.save(albumId, item).then(function(data){
 *                  $rootScope.showMsg("修改成功!",{ time: 500 });
 *              }, function(){
 *                  $rootScope.showMsg("修改失败!");
 *              });
 *
 *      detail : SubmemberFactory.detail(id).then(function(data){
 *                  $scope.item = data;
 *              });
 *
 *      del : SubmemberFactory.del(albumId, item).then(function(data){ // 参数可以是ID 或 item对象 或 ID数组
 *                  $rootScope.showMsg("删除成功！",1000);
 *              }, function(){
 *                  $rootScope.showMsg("删除失败！");
 *              });
 */
app.factory('SubmemberFactory', ['BaseFactory', function(BaseFactory){
    return {
        query: function (params) {
            var url = params ? 'submember' : 'submember';
            return BaseFactory.query(url, params);
        },
        save: function (target, params) {
            return BaseFactory.save(target, 'submember', {
                id: 'member_id'
            }, params);
        },
        detail: function (id) {
            if (Est.typeOf(id) === 'object'){
                id = id.member_id;
            }
            return BaseFactory.detail('submember', id);
        },
        del: function (id) {
            switch (Est.typeOf(id)){
                case 'array':
                    return BaseFactory.del('submember', undefined, id);
                case 'object':
                    id = id.member_id;
            }
            return BaseFactory.del('submember', id);
        }
    }
}]);