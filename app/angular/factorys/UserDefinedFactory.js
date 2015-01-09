/**
 * @description 工厂类， 提供数组接口
 * @class factory - 工厂类
 * @author yongjin on 2014/7/3
 */

/**
 * @description 自定义模块
 * @method [自定义] - UserDefinedFactory
 * @author wyj on 14/7/9
 * @example
 *      query : UserDefinedFactory.query(); // 全查
 *              UserDefinedFactory.query({page: 1, pageSize: 5}); // 分页查询
 *
 *      save : UserDefinedFactory.save(albumId, item).then(function(data){
 *                  $rootScope.showMsg("修改成功!",{ time: 500 });
 *              }, function(){
 *                  $rootScope.showMsg("修改失败!");
 *              });
 *
 *      detail : UserDefinedFactory.detail(id).then(function(data){
 *                  $scope.item = data;
 *              });
 *
 *      del : UserDefinedFactory.del(albumId, item).then(function(data){ // 参数可以是ID 或 item对象 或 ID数组
 *                  $rootScope.showMsg("删除成功！",1000);
 *              }, function(){
 *                  $rootScope.showMsg("删除失败！");
 *              });
 */
app.factory('UserDefinedFactory', ['BaseFactory', function (BaseFactory) {
    return {
        query: function (params) {
            var url = params ? 'userdefined' : 'userdefined';
            return BaseFactory.query(url, params);
        },
        save: function (target, params) {
            return BaseFactory.save(target, 'userdefined', {
                id: 'userdefined_id'
            }, params);
        },
        detail: function (id) {
            if (Est.typeOf(id) === 'object'){
                id = id.userdefined_id;
            }
            return BaseFactory.detail('userdefined', id);
        },
        del: function (id) {
            var type = Est.typeOf(id);
            switch (type){
                case 'array':
                    return BaseFactory.del('userdefined', undefined, id);
                case 'object':
                    id = id.userdefined_id;
            }
            return BaseFactory.del('userdefined', id);
        }
    }
}]);
