/**
 * @description 工厂类， 提供数组接口
 * @class factory - 工厂类
 * @author yongjin on 2014/7/3
 */

/**
 * @description 基础工厂类， 提供四个方法 ，分别为query[查询], detail[详细], save[保存或添加], del[删除]
 * @method BaseFactory
 * @author wyj on 14/7/3
 * @example
 *      query : BaseFactory.query('product', params);
 *
 *      detail : BaseFactory.detail('product', id);
 *
 *      save : BaseFactory.save({product_id:'Product_000000001', name: 'aaa'}, 'product', {
 *              id: 'product_id'
 *          }, params);
 *
 *      del : BaseFactory.del('product', id);
 */
app.factory('BaseFactory', ['$http', '$q', 'API_END_POINT',
    function ($http, $q, API_END_POINT) {
        return {
            query: function (url, params) {
                var deferred = $q.defer();
                $http({ method: 'GET', url: API_END_POINT + url, params: params }).
                    success(function (data, status, headers, config) { deferred.resolve(data); }).
                    error(function (data, status, headers, config) {
                        deferred.reject(data);
                    });
                return deferred.promise;
            },
            detail: function (url, id) {
                var deferred = $q.defer();
                $http.get(API_END_POINT + url + '/' + id).
                    success(function (data, status, headers, config) {
                        deferred.resolve(data);
                    }).
                    error(function (data, status, headers, config) {
                        deferred.reject(data);
                    });
                return deferred.promise;
            },
            save: function (oTarget, url, opts, params) {
                var deferred = $q.defer();
                var bIsEdit = opts ? opts.id ? oTarget[opts.id] ? true : false : false : false;
                var sMethod = bIsEdit ? 'PUT' : 'POST';
                var sId = bIsEdit ? '/' + oTarget[opts.id] : '';
                $http({ method: sMethod, url: API_END_POINT + url + sId, data: oTarget, params: params}).
                    success(function (data, status, headers, config) {
                        deferred.resolve(data);
                    }).
                    error(function (data, status, headers, config) {
                        deferred.reject(data);
                    });
                return deferred.promise;
            },
            del: function (url, id, data) {
                var deferred = $q.defer();
                var id = Est.typeOf(id) === 'undefined' ? '' : '/' + id;
                $http({ method: 'DELETE', url: API_END_POINT + url + id, data: data}).
                    success(function (data, status, headers, config) {
                        deferred.resolve(data);
                    }).
                    error(function (data, status, headers, config) {
                        deferred.reject(data);
                    });
                ;
                return deferred.promise;
            }
        };
    }]);

/**
 * @description 产品工厂类
 * @method ProductFactory
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
            return BaseFactory.detail('product', id);
        },
        del: function (id) {
            if (Est.typeOf(id) === 'array'){
                return BaseFactory.del('product', undefined, id);
            }
            var id = Est.typeOf(id) === 'object' ? id.product_id : id;
            return BaseFactory.del('product', id);
        }
    }
}]);

/**
 * @description 新闻工厂类
 * @method NewsFactory
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
            return BaseFactory.detail('news', id);
        },
        del: function (id) {
            if (Est.typeOf(id) === 'array'){
                return BaseFactory.del('news', undefined, id);
            }
            var id = Est.typeOf(id) === 'object' ? id.news_id : id;
            return BaseFactory.del('news', id);
        }
    }
}]);

/**
 * @description 产品分类工厂类
 * @method ProductCategoryFactory
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
            return BaseFactory.detail('product/category', id);
        },
        del: function (id) {
            if (Est.typeOf(id) === 'array'){
                return BaseFactory.del('product/category', undefined, id);
            }
            var id = Est.typeOf(id) === 'object' ? id.category_id : id;
            return BaseFactory.del('product/category', id);
        }
    }
}]);
/**
 * @description 新闻分类工厂类
 * @method NewsCategoryFactory
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
            return BaseFactory.detail('news/category', id);
        },
        del: function (id) {
            if (Est.typeOf(id) === 'array'){
                return BaseFactory.del('news/category', undefined, id);
            }
            var id = Est.typeOf(id) === 'object' ? id.category_id : id;
            return BaseFactory.del('news/category', id);
        }
    }
}]);
/**
 * @description 产品标签
 * @method ProductTagFactory
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
            return BaseFactory.query('product/' + id + '/tag');
        },
        save: function (target, params) {
            return BaseFactory.save(target, 'product/tag', {
                id: 'tag_id'
            }, params);
        },
        del: function (id) {
            if (Est.typeOf(id) === 'array'){
                return BaseFactory.del('product/tag', undefined, id);
            }
            var id = Est.typeOf(id) === 'object' ? id.category_id : id;
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
 * @method AlbumFactory
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
            return BaseFactory.detail('album', id);
        },
        save: function (target, params) {
            return BaseFactory.save(target, 'album', {
                id: 'album_id'
            }, params);
        },
        del: function (id) {
            if (Est.typeOf(id) === 'array'){
                return BaseFactory.del('album', undefined, id);
            }
            var id = Est.typeOf(id) === 'object' ? id.album_id : id;
            return BaseFactory.del('album', id);
        }
    }
}]);
/**
 * @description 图片
 * @method PictureFactory
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
            return BaseFactory.query('album/' + id + '/att' + params);
        },
        detail: function(id){
            return BaseFactory.detail('album/att', id);
        },
        del: function(albumId, id){
            if (Est.typeOf(albumId) === 'array'){
                return BaseFactory.del('album/att', undefined, albumId);
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

