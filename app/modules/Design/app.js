/**
 * @description 存在于$rootScope中的通用方法
 * @class $rootScope - ng 通用方法集
 * @author wyj on 14/8/26
 */
// app.js
// create our angular app and inject ngAnimate and ui-router
// =============================================================================
var msie = Est.msie();
var modules = [ 'ui.router', 'ngRoute', 'ngCookies', 'ngUeditor','ui.bootstrap.tabs', 'ui.bootstrap.modal', 'ui.bootstrap.tooltip'];
if (msie === 7 || msie === 6){
    modules = ['ui.router', 'ngRoute', 'ngUeditor','ui.bootstrap.tabs', 'ui.bootstrap.modal', 'ui.bootstrap.tooltip'];
}
var app = angular.module('DesignApp', modules);
angular.module('ie7support', []).config(['$sceProvider', function($sceProvider) {
    // Completely disable SCE to support IE7.
}]);
app.run(['$rootScope','$location' , function($rootScope, $location){
    /**
     * @description js跳转url
     * @method [跳转] - jumpUrl
     * @param {String} url 跳转网址
     * @param {Boolean} target 是否打开新窗口
     * @author wyj on 14/7/15
     * @example
     *      $rootScope.jumpUrl('http://www.jihui88.com', true);
     */
    $rootScope.jumpUrl = function (url, target){
        if (typeof target !== 'undefined' && target){
            open(url);
        } else{
            location.href = url;
        }
    }
    /**
     * @description augular url跳转
     * @method [跳转] - locationUrl
     * @param {Stirng} url 待跳转URL
     * @param {String} page 说明
     * @author wyj on 14/7/15
     * @example
     *      $rootScope.locationUrl('/product_list', '产品');
     */
    $rootScope.locationUrl = function(url,page){
        $rootScope.search_key = '';
        $rootScope.current_page = page;
        $location.path(url);
    }
}]);

