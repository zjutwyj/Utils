/**
 * @description 工厂类， 提供数组接口
 * @class factory - 工厂类
 * @author yongjin on 2014/7/3
 */


/**
 * @description 证书
 * @method [证书] - CertificateFactory
 * @author wyj on 14/7/4
 * @example
 *      query : CertificateFactory.query(); // 全查
 *              CertificateFactory.query({page: 1, pageSize: 5}); // 分页查询
 *
 *      save : CertificateFactory.save(albumId, item).then(function(data){
 *                  $rootScope.showMsg("修改成功!",{ time: 500 });
 *              }, function(){
 *                  $rootScope.showMsg("修改失败!");
 *              });
 *
 *      detail : CertificateFactory.detail(id).then(function(data){
 *                  $scope.item = data;
 *              });
 *
 *      del : CertificateFactory.del(albumId, item).then(function(data){ // 参数可以是ID 或 item对象 或 ID数组
 *                  $rootScope.showMsg("删除成功！",1000);
 *              }, function(){
 *                  $rootScope.showMsg("删除失败！");
 *              });
 */
app.factory('CertificateFactory', ['BaseFactory', function(BaseFactory){
    return {
        query: function (params) {
            var url = params ? 'certificate' : 'certificate';
            return BaseFactory.query(url, params);
        },
        save: function (target, params) {
            return BaseFactory.save(target, 'certificate', {
                id: 'certificate_id'
            }, params);
        },
        detail: function (id) {
            if (Est.typeOf(id) === 'object'){
                id = id.certificate_id;
            }
            return BaseFactory.detail('certificate', id);
        },
        del: function (id) {
            switch (Est.typeOf(id)){
                case 'array':
                    return BaseFactory.del('certificate', undefined, id);
                case 'object':
                    id = id.certificate_id;
            }
            return BaseFactory.del('certificate', id);
        }
    }
}]);