/**
 * @description 工厂类， 提供数组接口
 * @class factory - 工厂类
 * @author yongjin on 2014/7/3
 */

/**
 * @description 相册
 * @method [相册] - AlbumFactory
 * @author wyj on 14/7/8
 * @example
 *      query : AlbumFactory.query(); // 全查
 *              AlbumFactory.query({page: 1, pageSize: 5}); // 分页查询
 *
 *      save : AlbumFactory.save(item).then(function(data){
 *                  $rootScope.showMsg("修改成功!",{ time: 500 });
 *              }, function(){
 *                  $rootScope.showMsg("修改失败!");
 *              });
 *
 *      detail : AlbumFactory.detail(id).then(function(data){
 *                  $scope.item = data;
 *              });
 *
 *      del : AlbumFactory.del(item).then(function(data){ // 参数可以是ID 或 item对象 或 ID数组
 *                  $rootScope.showMsg("删除成功！",1000);
 *              }, function(){
 *                  $rootScope.showMsg("删除失败！");
 *              });
 */
app.factory('AlbumFactory', ['BaseFactory', function(BaseFactory){
    return {
        query: function(params){
            var url = params ? 'album' : 'album';
            return BaseFactory.query(url, params);
        },
        detail: function(id){
            if (Est.typeOf(id) === 'object'){
                id = id.album_id;
            }
            return BaseFactory.detail('album', id);
        },
        save: function (target, params) {
            return BaseFactory.save(target, 'album', {
                id: 'album_id'
            }, params);
        },
        del: function (id) {
            switch (Est.typeOf(id)){
                case 'array':
                    return BaseFactory.del('album', undefined, id);
                case 'object':
                    id = id.album_id;
            }
            return BaseFactory.del('album', id);
        }
    }
}]);