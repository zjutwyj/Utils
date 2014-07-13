/**
 * @description factory
 * @namespace factory
 * @author yongjin on 2014/7/3
 */

/**
 * @description 基础工厂类
 * @factory BaseFactory
 * @author wyj on 14/7/3
 * @modified wyj on 14/7/3 [bulid]
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
 * @factory ProductFactory
 * @author wyj on 14/7/2
 * @modified wyj on 14/7/2 [添加注释]
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
            var id = Est.typeOf(id) === 'object' ? id.product_id : id;
            return BaseFactory.del('product', id);
        }
    }
}]);

/**
 * @description 新闻工厂类
 * @factory NewsFactory
 * @author wyj on 14/7/2
 * @modified wyj on 14/7/2 [添加注释]
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
            var id = Est.typeOf(id) === 'object' ? id.news_id : id;
            return BaseFactory.del('news', id);
        }
    }
}]);

/**
 * @description 产品分类工厂类
 * @factory ProductCategoryFactory
 * @author wyj on 14/7/3
 * @modified wyj on 14/7/3 [bulid]
 */
app.factory('ProductCategoryFactory', ['BaseFactory', function (BaseFactory) {
    return {
        query: function () {
            return BaseFactory.query('product/category');
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
            var id = Est.typeOf(id) === 'object' ? id.category_id : id;
            return BaseFactory.del('product/category', id);
        }
    }
}]);
/**
 * @description 新闻分类工厂类
 * @factory NewsCategoryFactory
 * @author wyj on 14/7/3
 * @modified wyj on 14/7/3 [bulid]
 */
app.factory('NewsCategoryFactory', ['BaseFactory', function (BaseFactory) {
    return {
        query: function () {
            return BaseFactory.query('news/category');
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
            var id = Est.typeOf(id) === 'object' ? id.category_id : id;
            return BaseFactory.del('news/category', id);
        }
    }
}]);
/**
 * @description 产品标签
 * @factory ProductTagFactory
 * @author wyj on 14/7/2
 * @modified wyj on 14/7/2 [创建]
 */
app.factory('ProductTagFactory', ['BaseFactory', function (BaseFactory) {
    return {
        query: function () {
            return BaseFactory.query('product/tag');
        },
        queryById: function (id) {
            return BaseFactory.query('product/' + id + '/tag');
        },
        save: function (target, params) {
            return BaseFactory.save(target, 'product/tag', {
                id: 'tag_id'
            }, params);
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
 * @factory AlbumFactory
 * @author wyj on 14/7/8
 * @modified wyj on 14/7/8 [创建]
 */
app.factory('AlbumFactory', ['BaseFactory', function(BaseFactory){
    return {
        query: function(){
            return BaseFactory.query('album');
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
            var id = Est.typeOf(id) === 'object' ? id.album_id : id;
            return BaseFactory.del('album', id);
        }
    }
}]);
/**
 * @description 图片
 * @factory PictureFactory
 * @author wyj on 14/7/9
 * @modified wyj on 14/7/9 [创建]
 */
app.factory('PictureFactory', ['BaseFactory', function(BaseFactory){
    return {
        query: function(id, params){
            var params = Est.typeOf(params) === 'undefined' ? '' : params;
            return BaseFactory.query('album/' + id + '/att' + params);
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

