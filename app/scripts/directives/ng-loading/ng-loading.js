/**
 * @description ng-loading
 * @class directive - 指令集
 * @author yongjin on 2014/8/17
 */

/**
 * @description 显示加载中...
 * @method [加载] - loading
 * @author wyj on 14/7/12
 * @example
 *      <div loading>loading...</div>
 */
app.directive('loading', ['$rootScope', function($rootScope){
    return {
        link : function(scope, element, attrs){
            element.addClass('hide');
            $rootScope.$on('$routeChangeStart', function(){
                element.removeClass('hide');
            });
            $rootScope.$on('$routeChangeSuccess', function(){
                element.addClass('hide');
            });
        }
    }
}]);