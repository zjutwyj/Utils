/**
 * @description DesignFactory
 * @class factory - 工厂类
 * @author yongjin on 2014/8/27
 */
/**
 * @description 外观设计API
 * @method [外观设计] - DesignFactory
 * @author wyj on 14/8/27
 */
app.factory('DesignFactory', ['BaseFactory', '$q', '$http','API_END_POINT',
    function(BaseFactory, $q, $http, API_END_POINT){
        return {
            page: function (page, params) {
                var deferred = $q.defer();
                var page = page ? "/" + page : "";
                $http({ method: 'GET', url: API_END_POINT + "page" + page, params: params }).
                    success(function (data, status, headers, config) { deferred.resolve(data); }).
                    error(function (data, status, headers, config) {
                        deferred.reject(data);
                    });
                return deferred.promise;
            },
            layout: function(){
                var deferred = $q.defer();
                BaseFactory.query('layout').then(function(data){
                    deferred.resolve(data);
                });
                return deferred.promise;
            },
            userdefined: function(){
                var deferred = $q.defer();
                BaseFactory.query('layout/userdefined').then(function(data){
                    deferred.resolve(data);
                });
                return deferred.promise;
            }
        }
    }]);