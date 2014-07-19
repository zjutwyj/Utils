/**
 * @description 工厂类， 提供数组接口
 * @class factory - 工厂类
 * @author yongjin on 2014/7/3
 */

/**
 * @description 产品工厂类
 * @method [产品] - ProductFactory
 * @author wyj on 14/7/2
 * @example
 *      query : ProductFactory.query(); // 全查
 *              ProductFactory.query({page: 1, pageSize: 5}); // 分页查询
 *
 *      save : ProductFactory.save(product).then(function(data){
 *                  $rootScope.showMsg("修改成功!",{ time: 500 });
 *              }, function(){
 *                  $rootScope.showMsg("修改失败!");
 *              });
 *
 *      detail : ProductFactory.detail(product.product_id).then(function(data){
 *                  $scope.product = data;
 *              });
 *
 *      del : ProductFactory.del(product).then(function(data){ // 参数可以是ID 或 product对象 或ID数组
 *                  $rootScope.showMsg("删除成功！",1000);
 *              }, function(){
 *                  $rootScope.showMsg("删除失败！");
 *              });
 */
app.factory('ProductFactory', ['BaseFactory', function (BaseFactory) {
    return {
        query: function (params) {
            var url = params ? 'product' : 'productAll?tag=true';
            return BaseFactory.query(url, params);
        },
        save: function (target, params) {
            return BaseFactory.save(target, 'product', {
                id: 'product_id'
            }, params);
        },
        detail: function (id) {
            if (Est.typeOf(id) === 'object'){
                id = id.product_id;
            }
            return BaseFactory.detail('product', id);
        },
        del: function (id) {
            var type = Est.typeOf(id);
            switch (type){
                case 'array':
                    return BaseFactory.del('product', undefined, id);
                case 'object':
                    id = id.product_id;
            }
            return BaseFactory.del('product', id);
        }
    }
}]);

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

/**
 * @description 产品分类工厂类
 * @method [分类] - ProductCategoryFactory
 * @author wyj on 14/7/3
 * @example
 *      query : ProductCategoryFactory.query(); // 全查
 *              ProductCategoryFactory.query({page: 1, pageSize: 5}); // 分页查询
 *
 *      save : ProductCategoryFactory.save(category).then(function(data){
 *                  $rootScope.showMsg("修改成功!",{ time: 500 });
 *              }, function(){
 *                  $rootScope.showMsg("修改失败!");
 *              });
 *
 *      detail : ProductCategoryFactory.detail(category.category_id).then(function(data){
 *                  $scope.category = data;
 *              });
 *
 *      del : ProductCategoryFactory.del(category).then(function(data){ // 参数可以是ID 或 category对象 或 ID数组
 *                  $rootScope.showMsg("删除成功！",1000);
 *              }, function(){
 *                  $rootScope.showMsg("删除失败！");
 *              });
 */
app.factory('ProductCategoryFactory', ['BaseFactory', function (BaseFactory) {
    return {
        query: function (params) {
            var url = params ? 'product/category' : 'product/category';
            return BaseFactory.query(url, params);
        },
        save: function (target, params) {
            return BaseFactory.save(target, 'product/category', {
                id: 'category_id'
            }, params);
        },
        detail: function (id) {
            if (Est.typeOf(id) === 'object'){
                id = id.category_id;
            }
            return BaseFactory.detail('product/category', id);
        },
        del: function (id) {
            switch (Est.typeOf(id)){
                case 'array':
                    return BaseFactory.del('product/category', undefined, id);
                case 'object':
                    id = id.category_id;
            }
            return BaseFactory.del('product/category', id);
        }
    }
}]);
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
/**
 * @description 产品标签
 * @method [标签] - ProductTagFactory
 * @author wyj on 14/7/2
 * @example
 *      query : ProductTagFactory.query(); // 全查
 *              ProductTagFactory.query({page: 1, pageSize: 5}); // 分页查询
 *
 *      save : ProductTagFactory.save(item).then(function(data){
 *                  $rootScope.showMsg("修改成功!",{ time: 500 });
 *              }, function(){
 *                  $rootScope.showMsg("修改失败!");
 *              });
 *
 *      detail : ProductTagFactory.detail(id).then(function(data){
 *                  $scope.item = data;
 *              });
 *
 *      del : ProductTagFactory.del(item).then(function(data){ // 参数可以是ID 或 item对象 或 ID数组
 *                  $rootScope.showMsg("删除成功！",1000);
 *              }, function(){
 *                  $rootScope.showMsg("删除失败！");
 *              });
 *
 *      saveProTag : ProductTagFactory.saveProTag($scope.product.product_id, item.tag_id); // 保存产品标签
 *
 *      delProTag : ProductTagFactory.delProTag($scope.product.product_id, item.tag_id); // 删除产品标签
 */
app.factory('ProductTagFactory', ['BaseFactory', function (BaseFactory) {
    return {
        query: function (params) {
            var url = params ? 'product/tag' : 'product/tag';
            return BaseFactory.query(url, params);
        },
        detail: function (id) {
            if (Est.typeOf(id) === 'object'){
                id = id.tag_id;
            }
            return BaseFactory.query('product/' + id + '/tag');
        },
        save: function (target, params) {
            return BaseFactory.save(target, 'product/tag', {
                id: 'tag_id'
            }, params);
        },
        del: function (id) {
            switch (Est.typeOf(id)){
                case 'array':
                    return BaseFactory.del('product/tag', undefined, id);
                case 'object':
                    id = id.category_id;
            }
            return BaseFactory.del('product/tag', id);
        },
        saveProTag: function (product_id, tag_id, params) {
            return BaseFactory.save({
                product_id: product_id,
                tag_id: tag_id
            }, '/product/' + product_id + '/tag', {}, params);
        },
        delProTag: function (product_id, tag_id) {
            var tag_id = Est.typeOf(tag_id) === 'object' ? tag_id.tag_id : tag_id;
            return BaseFactory.del('product/' + product_id + '/tag/' + tag_id);
        }
    };
}]);
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

/**
 * @description 消息
 * @method [消息] - MessageFactory
 * @author wyj on 14/7/4
 * @example
 *      query : MessageFactory.query(); // 全查
 *              MessageFactory.query({page: 1, pageSize: 5}); // 分页查询
 *
 *      save : MessageFactory.save(albumId, item).then(function(data){
 *                  $rootScope.showMsg("修改成功!",{ time: 500 });
 *              }, function(){
 *                  $rootScope.showMsg("修改失败!");
 *              });
 *
 *      detail : MessageFactory.detail(id).then(function(data){
 *                  $scope.item = data;
 *              });
 *
 *      del : MessageFactory.del(albumId, item).then(function(data){ // 参数可以是ID 或 item对象 或 ID数组
 *                  $rootScope.showMsg("删除成功！",1000);
 *              }, function(){
 *                  $rootScope.showMsg("删除失败！");
 *              });
 */
app.factory('MessageFactory', ['BaseFactory', function(BaseFactory){
    return {
        query: function (params) {
            var url = params ? 'message' : 'message';
            return BaseFactory.query(url, params);
        },
        save: function (target, params) {
            return BaseFactory.save(target, 'message', {
                id: 'message_id'
            }, params);
        },
        detail: function (id) {
            if (Est.typeOf(id) === 'object'){
                id = id.message_id;
            }
            return BaseFactory.detail('message', id);
        },
        del: function (id) {
            switch (Est.typeOf(id)){
                case 'array':
                    return BaseFactory.del('message', undefined, id);
                case 'object':
                    id = id.message_id;
            }
            return BaseFactory.del('message', id);
        }
    }
}]);

/**
 * @description 供求
 * @method [供求] - SupplyFactory
 * @author wyj on 14/7/4
 * @example
 *      query : SupplyFactory.query(); // 全查
 *              SupplyFactory.query({page: 1, pageSize: 5}); // 分页查询
 *
 *      save : SupplyFactory.save(albumId, item).then(function(data){
 *                  $rootScope.showMsg("修改成功!",{ time: 500 });
 *              }, function(){
 *                  $rootScope.showMsg("修改失败!");
 *              });
 *
 *      detail : SupplyFactory.detail(id).then(function(data){
 *                  $scope.item = data;
 *              });
 *
 *      del : SupplyFactory.del(albumId, item).then(function(data){ // 参数可以是ID 或 item对象 或 ID数组
 *                  $rootScope.showMsg("删除成功！",1000);
 *              }, function(){
 *                  $rootScope.showMsg("删除失败！");
 *              });
 */
app.factory('SupplyFactory', ['BaseFactory', function(BaseFactory){
    return {
        query: function (params) {
            var url = params ? 'supply' : 'supply';
            return BaseFactory.query(url, params);
        },
        save: function (target, params) {
            return BaseFactory.save(target, 'supply', {
                id: 'supply_id'
            }, params);
        },
        detail: function (id) {
            if (Est.typeOf(id) === 'object'){
                id = id.supply_id;
            }
            return BaseFactory.detail('supply', id);
        },
        del: function (id) {
            switch (Est.typeOf(id)){
                case 'array':
                    return BaseFactory.del('supply', undefined, id);
                case 'object':
                    id = id.supply_id;
            }
            return BaseFactory.del('supply', id);
        }
    }
}]);
