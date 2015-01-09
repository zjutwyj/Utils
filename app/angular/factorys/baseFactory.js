/**
 * @description 工厂类， 提供数组接口
 * @class factory - 工厂类
 * @author yongjin on 2014/7/3
 */

/**
 * @description 基础工厂类， 提供四个方法 ，分别为query[查询], detail[详细], save[保存或添加], del[删除]
 * @method [基础] - BaseFactory
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
app.factory('BaseFactory', ['$rootScope', '$http', '$q', 'API_END_POINT',
    function ($rootScope, $http, $q, API_END_POINT) {
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
            },
            app: function(){
                var deferred = $q.defer();
                $http.get(API_END_POINT).success(function (data) {
                    deferred.resolve(data);
                }).error(function (data) {
                    deferred.reject(data);
                    deferred.resolve('network is not fine');
                    $rootScope.isLogin = false;
                    $location.path('/login');
                });
                return deferred.promise;
            }
        };
}]);