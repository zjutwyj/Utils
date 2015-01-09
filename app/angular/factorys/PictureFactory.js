/**
 * @description 工厂类， 提供数组接口
 * @class factory - 工厂类
 * @author yongjin on 2014/7/3
 */

/**
 * @description 图片
 * @method [图片] - PictureFactory
 * @author wyj on 14/7/9
 * @example
 *      query : PictureFactory.query(); // 全查
 *              ProductTagFactory.query({page: 1, pageSize: 5}); // 分页查询
 *
 *      save : PictureFactory.save(albumId, item).then(function(data){
 *                  $rootScope.showMsg("修改成功!",{ time: 500 });
 *              }, function(){
 *                  $rootScope.showMsg("修改失败!");
 *              });
 *
 *      detail : PictureFactory.detail(id).then(function(data){
 *                  $scope.item = data;
 *              });
 *
 *      del : PictureFactory.del(albumId, item).then(function(data){ // 参数可以是ID 或 item对象 或 ID数组
 *                  $rootScope.showMsg("删除成功！",1000);
 *              }, function(){
 *                  $rootScope.showMsg("删除失败！");
 *              });
 */
app.factory('PictureFactory', ['BaseFactory', function(BaseFactory){
    return {
        query: function(id, params){
            var params = Est.typeOf(params) === 'undefined' ? '' : params;
            return BaseFactory.query('album/' + id + '/att', params);
        },
        detail: function(id){
            if (Est.typeOf(id) === 'object'){
                id = id.att_id;
            }
            return BaseFactory.detail('album/att', id);
        },
        del: function(albumId, id){
            switch (Est.typeOf(id)){
                case 'array':
                    return BaseFactory.del('album/att', undefined, albumId);
                case 'object':
                    id = id.att_id;
            }
            return BaseFactory.del('album/' + albumId + '/att/' + id);
        },
        save: function(albumId, target, params){
            return BaseFactory.save(target, '/album/' + albumId + '/att',{
                id: 'att_id'
            }, params);
        }
    }
}]);