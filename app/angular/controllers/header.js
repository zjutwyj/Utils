'use strict';
/**
 * @description 头部状态栏
 * @controller NavbarCtrl
 * @param $scope
 * @param $rootScope
 * @param $location
 * @constructor
 * @author wyj on 14/6/30
 * @modified wyj on 14/6/30 [重构]
 */
app.controller('NavbarCtrl', ['$scope', '$rootScope', '$location',
    function($scope, $rootScope, $location){
        $scope.loginout = function () {
            $rootScope.logout();
        };
        $scope.toPersonal = function(){
            $location.href = "#/personal";
        };
}]);

/**
 * @description 左侧导航栏
 * @controller MenuCtrl
 * @param $scope
 * @param $rootScope
 * @param $location
 * @constructor
 * @author wyj on 14/7/11
 * @modified wyj on 14/7/11 [bulid]
 */

app.controller('MenuCtrl', ['$scope', '$rootScope',
    function($scope, $rootScope){

}]);
