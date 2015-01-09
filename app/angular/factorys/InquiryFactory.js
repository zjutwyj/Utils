/**
 * @description 工厂类， 提供数组接口
 * @class factory - 工厂类
 * @author yongjin on 2014/7/3
 */



/**
 * @description 询盘
 * @method [询盘] - InquiryFactory
 * @author wyj on 14/7/4
 * @example
 *      query : InquiryFactory.query(); // 全查
 *              InquiryFactory.query({page: 1, pageSize: 5}); // 分页查询
 *
 *      save : InquiryFactory.save(albumId, item).then(function(data){
 *                  $rootScope.showMsg("修改成功!",{ time: 500 });
 *              }, function(){
 *                  $rootScope.showMsg("修改失败!");
 *              });
 *
 *      detail : InquiryFactory.detail(id).then(function(data){
 *                  $scope.item = data;
 *              });
 *
 *      del : InquiryFactory.del(albumId, item).then(function(data){ // 参数可以是ID 或 item对象 或 ID数组
 *                  $rootScope.showMsg("删除成功！",1000);
 *              }, function(){
 *                  $rootScope.showMsg("删除失败！");
 *              });
 */
app.factory('InquiryFactory', ['BaseFactory', function(BaseFactory){
    return {
        query: function (params) {
            var url = params ? 'inquiry' : 'inquiry';
            return BaseFactory.query(url, params);
        },
        save: function (target, params) {
            return BaseFactory.save(target, 'inquiry', {
                id: 'inquiry_id'
            }, params);
        },
        detail: function (id) {
            if (Est.typeOf(id) === 'object'){
                id = id.inquiry_id;
            }
            return BaseFactory.detail('inquiry', id);
        },
        del: function (id) {
            switch (Est.typeOf(id)){
                case 'array':
                    return BaseFactory.del('inquiry', undefined, id);
                case 'object':
                    id = id.inquiry_id;
            }
            return BaseFactory.del('inquiry', id);
        }
    }
}]);