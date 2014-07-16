/**
 产品管理
 @author wyj <zjut_wyj@163.com>
 @modified  wyj <2014-03-11>
 @date 2014-02-25
 **/
'use strict';

/**
 * @description 产品模块路由
 * @route product
 * @author wyj on 14/7/2
 * @modified wyj on 14/7/2 [重构]
 */
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/product_cate', {
            templateUrl: 'modules/Product/views/product_cate.html'
        })
        .when('/product_list', {
            templateUrl: 'modules/Product/views/product_list.html'
        })
        .when('/product_add', {
            templateUrl: 'modules/Product/views/product_add.html'
        }).
        when('/product_tag_add', {
            templateUrl: 'modules/Product/views/product_tag_add.html'
        }).
        when('/product_tag_list', {
            templateUrl: 'modules/Product/views/product_tag_list.html'
        }).
    when('/product_upload_excel', {
            templateUrl: 'modules/Product/views/product_upload_by_xls.html'
        });
}]);

var productCates = function (list) {
    var root = [];
    var list1 = Est.sortBy(list, function (item) {
        return item.sort;
    })
    Est.each(list1, function (item) {
        if (item['grade'] === '01') {
            root.push(item);
        }
    })
    Est.bulidSubNode(root, list);
    return root;
}

var ProCateAddModelInit = function ($scope, $modalInstance, $rootScope,category) {
    $scope.category = category;
    $scope.ok = function () {
        $modalInstance.close($scope.category);
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
    $scope.openFileDialog = function(cate){
        $rootScope.openFileDialog(function(select_list){
            $scope.category.image = select_list[0].server_path;
        });
        return false;
    }
    $scope.removePic = function(cate){
        $scope.category.image = null;
    }
}
//ProCateAddModelInit.$inject(['$scope', '$modalInstance', '$rootScope']);

var ProModelInit = function ($scope, $modalInstance, product) {
    $scope.product = product;
    $scope.ok = function () {
        $scope.product.new_cates = $scope.new_cates || '';
        $modalInstance.close($scope.product);
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}
//ProModelInit.$inject(['$scope', '$modalInstance']);

var ProSeoModelInit = function ($scope, $modalInstance, product) {
    $scope.product = product;
    $scope.ok = function () {
        $modalInstance.close($scope.product);
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}
//ProSeoModelInit.$inject(['$scope', '$modalInstance']);

var CateModelInit = function ($scope, $modalInstance, cates) {
    $scope.cates = cates;
    $scope.dialog_show = true;
    $scope.ok = function () {
        $modalInstance.close($scope.cates);
    };
    $scope.cancel = function () {
        $modalInstance.dismiss($scope.cates);
    };
}
//CateModelInit.$inject(['$scope', '$modalInstance']);

/**
 * @description 产品图片上传 [product_upload_by_xls.html]
 * @controller ProductUploadCtrl
 * @author wyj on 14/7/2
 * @modified wyj on 14/7/2 [重构]
 */
app.controller('ProductUploadCtrl', ['$scope', '$rootScope', '$http', 'API_END_POINT',
    function($scope, $rootScope, $http, API_END_POINT){
    $scope.file_path = "";
    $scope.albumId = "";
    $scope.file_desc = "";
    $scope.btn_is_true = true;
    var formDataOpt = [{
        name : 'album_id',
        value: $scope.albumId
    }];
    $scope.upload_opts = {
        autoUpload: true,
        formData :formDataOpt,
        done: function (e, data) {
            $scope.file_path = data.result[0].server_path;
            $scope.filename = data.result[0].filename;
            $scope.att_id = data.result[0].att_id;
        },
        fileuploaddone : function(){
            alert("ss");
        }
    }
    $scope.doupload = function(){
        if($scope.file_path==''){
            alert('请先上传excel');
            return ;
        }
        $scope.btn_is_true = false;
        $http.post(API_END_POINT + 'productUploadByExcel' , {
            file_path: $scope.file_path
        }).success(function (data) {
                $http.post(API_END_POINT + 'productExcelDel' , {
                    file_path: $scope.file_path,
                    att_id:$scope.att_id
                }).success(function () {
                }).error(function (data) {
                });
                $rootScope.showMsg("上传成功!");
                $scope.file_path = '';
                $scope.filename = '';
                $scope.att_id = '';
                $scope.btn_is_true = true;
            })
            .error(function (data) {
                alert("error");
                $scope.file_path = '';
                $scope.filename = '';
                $scope.att_id = '';
                $scope.btn_is_true = true;
            });
    }
}]);
