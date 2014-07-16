/**
 * @description gallery
 * @namespace gallery
 * @author yongjin on 2014/7/8
 */

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/gallery_list', {
        templateUrl: 'modules/Upload/views/gallery_v2.html'
    });
}]);

app.controller('GalleryCtrl', ['$scope', '$rootScope',function($scope, $rootScope){
    $scope.roleList2 = [
        { "roleName" : "User", "roleId" : "role1","collapsed" : true, "children" : [
            { "roleName" : "subUser1", "roleId" : "role11", "collapsed" : true, "children" : [] },
            { "roleName" : "subUser2", "roleId" : "role12", "collapsed" : true, "children" : [
                { "roleName" : "subUser2-1", "roleId" : "role121","collapsed" : true, "children" : [
                    { "roleName" : "subUser2-1-1", "roleId" : "role1211","collapsed" : true, "children" : [] },
                    { "roleName" : "subUser2-1-2", "roleId" : "role1212","collapsed" : true, "children" : [] }
                ]}
            ]}
        ]},

        { "roleName" : "Admin", "roleId" : "role2","collapsed" : true, "children" : [
            { "roleName" : "subAdmin1", "roleId" : "role11", "collapsed" : true, "children" : [] },
            { "roleName" : "subAdmin2", "roleId" : "role12","collapsed" : true, "children" : [
                { "roleName" : "subAdmin2-1", "roleId" : "role121","collapsed" : true, "children" : [
                    { "roleName" : "subAdmin2-1-1", "roleId" : "role1211","collapsed" : true, "children" : [] },
                    { "roleName" : "subAdmin2-1-2", "roleId" : "role1212","collapsed" : true, "children" : [] }
                ]}
            ]}
        ]},

        { "roleName" : "Guest", "roleId" : "role3","collapsed" : true, "children" : [
            { "roleName" : "subGuest1", "roleId" : "role11","collapsed" : true, "children" : [] },
            { "roleName" : "subGuest2", "roleId" : "role12", "collapsed" : true, "children" : [
                { "roleName" : "subGuest2-1", "roleId" : "role121", "collapsed" : true,"children" : [
                    { "roleName" : "subGuest2-1-1", "roleId" : "role1211","collapsed" : true, "children" : [] },
                    { "roleName" : "subGuest2-1-2", "roleId" : "role1212", "collapsed" : true,"children" : [] }
                ]}
            ]}
        ]}
    ];
}]);