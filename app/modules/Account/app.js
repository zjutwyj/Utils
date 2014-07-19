/**
 * @description 存在于$rootScope中的通用方法
 * @class $rootScope - ng 通用方法集
 * @author wyj on 14/7/15
 */
// app.js
// create our angular app and inject ngAnimate and ui-router
// =============================================================================
var msie = Est.msie();
var modules = [ 'ui.router', 'ngRoute', 'ngAnimate'];
if (msie === 7 || msie === 6){
    modules = ['ui.router', 'ngRoute'];
}
var app = angular.module('AccountApp', modules)
    .constant('HOST', 'http://example.com:9007')
    .constant('API_END_POINT', 'http://example.com:9007/api/')
    .constant('SOURCE_URL', 'http://agent.example.com/')
    .constant('MOBILE_DESIGN_URL', 'http://mviews.example.com:4002')
    .constant('WEB_DESIGN_URL', 'http://views.example.com:4000')
    .constant('WEBSITE_URL', 'http://example.com:9006/')
    .config(['$sceProvider', '$sceDelegateProvider', '$httpProvider', 'SOURCE_URL', 'API_END_POINT',
        function ($sceProvider,$sceDelegateProvider,$httpProvider,SOURCE_URL, API_END_POINT) {
            $sceProvider.enabled(false);
            $sceDelegateProvider.resourceUrlWhitelist(['self',API_END_POINT + '**',SOURCE_URL + '**']);
            $sceDelegateProvider.resourceUrlBlacklist([]);
            $httpProvider.defaults.withCredentials = true;
        }]);
angular.module('ie7support', []).config(['$sceProvider', function($sceProvider) {
    // Completely disable SCE to support IE7.
}]);
app.run(['$route', '$rootScope', '$http', '$timeout', '$location', 'API_END_POINT','WEB_DESIGN_URL', 'WEBSITE_URL','MOBILE_DESIGN_URL', '$q',
    function($route, $rootScope, $http, $timeout, $location, API_END_POINT,WEB_DESIGN_URL, WEBSITE_URL,MOBILE_DESIGN_URL, $q){
        $rootScope.API_END_POINT = API_END_POINT;
        $rootScope.MOBILE_DESIGN_URL = MOBILE_DESIGN_URL;
        $rootScope.WEB_DESIGN = false; // 是否是设计模式
        $rootScope.WEB_DESIGN_URL = WEB_DESIGN_URL;
        $rootScope.WEBSITE_URL = WEBSITE_URL;
        $rootScope.closeAlert = function (index) {
            $rootScope.alerts.splice(index, 1);
        };
        $rootScope.showMsg = function(msg){
            alert(msg);
        }
        /**
         * @description 跳转到邮箱页面
         * @method [邮箱] - toMail
         * @param val
         * @author wyj on 14/7/19
         * @example
         *      $rootScope.toMail('zjut_wyj@163.com');
         */
        $rootScope.toMail = function(val){
            var houzhui = val.split('@')[1]; //后缀名
            if (houzhui.indexOf("gmail") != -1) { //谷歌
                window.open("http://mail.google.com");
            }
            else if (houzhui.indexOf("hotmail") != -1 || houzhui.indexOf("msn") != -1) {//微软
                window.open("http://mail.live.com");
            } else {
                window.open("http://mail." +houzhui);
            }
        }
    }]);

