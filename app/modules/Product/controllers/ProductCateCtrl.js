/**
 * @description ProductCateCtrl
 * @namespace ProductCateCtrl
 * @author yongjin on 2014/7/4
 */
/**
 * @description 产品分类
 * @controller ProductCateCtrl
 * @author wyj on 14/7/2
 * @modified wyj on 14/7/2 [重构]
 */
app.controller('ProductCateCtrl', ['$scope', '$rootScope', '$http', '$modal', 'API_END_POINT', '$q', 'ProductCategoryFactory',
    function ($scope, $rootScope, $http, $modal, API_END_POINT, $q, ProductCategoryFactory) {
        var maxSort = 0;
        var modelcolum = ['category_id', 'belong_id', 'name', 'cdesc', 'grade', 'isroot', 'isdisplay', 'state', 'image', 'key', 'alias', 'sort', 'seo_title', 'seo_keywords', 'seo_description', 'adcontent'];
        $scope.cates = [];
        $scope.list = [];
        $scope.selectedItem = {};
        $scope.isChange = false;
        $scope.options = $rootScope.NestedSortableOption($scope, 'category_id', 'belong_id', 'grade', bulidCate);
        // 分类删除
        var remove = function (cate, scope) {
            if (cate.hasChild) {
                $rootScope.open("该分类存在子分类，点确定将删除该分类下的所有分类！", function () {},
                    { ok: "确定", cancel: "关闭" });
            }
            $rootScope.open("是否删除?", function () {
                ProductCategoryFactory.del(cate).then(function (data) {
                    var dx = Est.findIndex($scope.list, function (item) {
                        return item.category_id == cate.category_id;
                    });
                    $scope.list.splice(dx, 1);
                    $scope.cates = bulidCate($scope.list);
                    $rootScope.addToStatic();
                });
            });
        }
        // 分类添加
        var add = function (cate, belong_id) {
            cate.belong_id = belong_id;
            ProductCategoryFactory.save(cate).then(function (data) {
                $rootScope.addToStatic();
            });
        }
        var bulidCate = function (list, isSort) {
            var root = [];
            //get the root element
            Est.each(list, function (item) {
                var sort = parseInt(item.sort);
                item.sort = sort;
                if (sort > maxSort) {
                    maxSort = sort;
                }
                if (item['grade'] === '01') {
                    root.push(item);
                }
            });
            // 上移下移需重新排序， 拖放无需再排序
            if (isSort) {
                root = Est.sortBy(root, function (item) {
                    return item.sort;
                })
                list = Est.sortBy(list, function (item) {
                    return item.sort;
                })
            }
            Est.bulidSubNode(root, list);
            return root;
        }
        $scope.addCategory = function (cate, callback) {
            ProductCategoryFactory.save(cate).then(function (data) {
                data['cates'] = [];
                data['hasChild'] = false;
                if (typeof callback === 'function') {
                    callback.call(null, data);
                }
            });
        }
        // 分类列表
        ProductCategoryFactory.query().then(function(data){
            maxSort = data.length;
            $scope.cates = bulidCate(data);
            $scope.list = data;
            if(maxSort == 0){
                $scope.addCategory({ belong_id: '/', name: '默认分类', cdesc: '默认分类', isroot: '01', grade: '01', sort: ++maxSort },
                    function(data){
                        var deferred = $q.defer();
                        $scope.list.push(data);
                        $scope.cates = bulidCate($scope.list);
                        return deferred.promise;
                    });
            }
        });
        //　分类添加
        $scope.add = function (cate,scope) {
            var isroot = '00', belong_id = null, grade = null;
            if (typeof(cate) === 'undefined') {
                isroot = '01';
                grade = '01';
                belong_id = '/';
            } else {
                belong_id = cate.category_id;
                grade = Est.pad(parseInt(cate.grade, 10) +1, 2, '0', false, 10);
                if (grade === '05') return;
            }
            var modalInstance = $modal.open({
                templateUrl: 'modules/Product/views/product_cate_add.html',
                controller: ['$scope', '$modalInstance', '$rootScope', 'category', function ($scope, $modalInstance, $rootScope,category) {
                    $scope.category = category;
                    $rootScope.modalInit($scope, $modalInstance, $scope.category);
                    $scope.openFileDialog = function(){
                        $rootScope.openFileDialog(function(select_list){
                            $scope.category.image = select_list[0].server_path;
                        });
                        return false;
                    }
                    $scope.removePic = function(cate){
                        $scope.category.image = null;
                    }
                }],
                resolve: {
                    category: function () {
                        return { belong_id: belong_id, name: '', cdesc: '', isroot: isroot, grade: grade, sort: ++maxSort };
                    }
                }
            });
            modalInstance.result.then(function (category) {
                var data = Est.pick(category,modelcolum);
                ProductCategoryFactory.save(data).then(function(data){
                    data['cates'] = [];
                    if (typeof(cate) === 'undefined') {
                        data['hasChild'] = false;
                        $scope.cates.push(data);
                    } else {
                        var itemData = scope.itemData();
                        itemData.cates.push(data);
                        itemData.hasChild = true;
                    }
                    $scope.list.push(data);
                    $rootScope.showMsg("添加成功!");
                    $rootScope.addToStatic();
                });
            });
            return false;
        };
        //　分类修改
        $scope.edit = function (cate) {
            var modalInstance = $modal.open({
                templateUrl: 'modules/Product/views/product_cate_add.html',
                controller:['$scope', '$modalInstance', '$rootScope', 'category', function ($scope, $modalInstance, $rootScope,category) {
                    $scope.category = category;
                    $rootScope.modalInit($scope, $modalInstance, $scope.category);
                    $scope.openFileDialog = function(){
                        $rootScope.openFileDialog(function(select_list){
                            $scope.category.image = select_list[0].server_path;
                        });
                        return false;
                    }
                    $scope.removePic = function(cate){
                        $scope.category.image = null;
                    }
                }],
                resolve: {
                    category: function () {
                        var deferred = $q.defer();
                        ProductCategoryFactory.detail(cate.category_id).then(function(data){
                            deferred.resolve(data);
                        });
                        return deferred.promise;
                    }
                }
            });
            modalInstance.result.then(function (category) {
                var data = Est.pick(category, modelcolum);
                ProductCategoryFactory.save(data).then(function(cate){
                    cate.name = category.name;
                    cate.isdisplay = category.isdisplay;
                    $rootScope.showMsg("修改成功!");
                })
            }, function () {
            });
            return false;
        };

        // 分类图片
        $scope.editPic = function(cate){
            var modalInstance = $modal.open({
                templateUrl: 'modules/Product/views/product_cate_pic.html',
                controller: ['$scope', '$modalInstance', '$rootScope','category',function ($scope, $modalInstance, $rootScope,category) {
                    $scope.category = category;
                    $rootScope.modalInit($scope, $modalInstance, $scope.category);
                    $scope.openFileDialog = function(cate){
                        $rootScope.openFileDialog(function(select_list){
                            $scope.category.image = select_list[0].server_path;
                        });
                        return false;
                    }
                    $scope.removePic = function(cate){
                        $scope.category.image = null;
                    }
                }],
                resolve: {
                    category: function () {
                        var deferred = $q.defer();
                        ProductCategoryFactory.detail(cate.category_id).then(function(data){
                            deferred.resolve(data);
                        });
                        return deferred.promise;
                    }
                }
            });
            modalInstance.result.then(function (category) {
                var data = Est.pick(category, modelcolum);
                ProductCategoryFactory.save(data).then(function(data){
                    cate.image = category.image;
                    $rootScope.showMsg("修改成功!");
                });
            });
            return false;
        }
        $scope.editAdPic = function(cate){
            var modalInstance = $modal.open({
                templateUrl: 'modules/Product/views/product_cate_adcontent.html',
                controller: ['$scope', '$modalInstance', '$rootScope', 'category', function ($scope, $modalInstance, $rootScope,category) {
                    $scope.category = category;
                    $rootScope.modalInit($scope, $modalInstance, $scope.category);
                    $scope.openFileDialog = function(){
                        $rootScope.openFileDialog(function(select_list){
                            $scope.category.image = select_list[0].server_path;
                        });
                        return false;
                    }
                    $scope.removePic = function(cate){
                        $scope.category.image = null;
                    }
                }],
                windowClass: 'product-detail-dialog',
                resolve: {
                    category: function () {
                        var deferred = $q.defer();
                        ProductCategoryFactory.detail(cate.category_id).then(function(data){
                            deferred.resolve(data);
                        });
                        return deferred.promise;
                    }
                }
            });
            modalInstance.result.then(function (category) {
                var data = Est.pick(category, modelcolum);
                ProductCategoryFactory.save(data).then(function(data){
                    cate.adcontent = category.adcontent;
                    $rootScope.showMsg('修改成功！');
                    $rootScope.addToStatic();
                });
            });
            return false;
        }
        // 分类删除
        $scope.del = function (cate, scope) {
            remove(cate, scope);
            return false;
        };
        // ＳＥＯ修改
        $scope.seo = function (cate) {
            var modalInstance = $modal.open({
                templateUrl: 'modules/Product/views/product_cate_seo.html',
                controller: ['$scope', '$modalInstance', '$rootScope', 'category', function ($scope, $modalInstance, $rootScope,category) {
                    $scope.category = category;
                    $rootScope.modalInit($scope, $modalInstance, $scope.category);
                    $scope.openFileDialog = function(){
                        $rootScope.openFileDialog(function(select_list){
                            $scope.category.image = select_list[0].server_path;
                        });
                        return false;
                    }
                    $scope.removePic = function(cate){
                        $scope.category.image = null;
                    }
                }],
                resolve: {
                    category: function () {
                        var deferred = $q.defer();
                        ProductCategoryFactory.detail(cate.category_id).then(function(data){
                            deferred.resolve(data);
                        });
                        return deferred.promise;
                    }
                }
            });
            modalInstance.result.then(function (category) {
                var data = Est.pick(category, modelcolum);
                ProductCategoryFactory.save(data).then(function(data){
                    $rootScope.showMsg('修改成功！');
                });
            });
            return false;
        };
        // 是否显示
        $scope.display = function (cate) {
            cate.isdisplay = cate.isdisplay === '1' ? '0' : '1';
            var data = Est.pick(cate, modelcolum);
            ProductCategoryFactory.save(data).then(function(data){
            }, function(){
                $rootScope.showMsg('设置未成功', { type: 'danger' })
            });
        };
        // watch for sort
        $scope.updateSort = function (cate) {
            var data = Est.pick(cate, modelcolum);
            ProductCategoryFactory.save(data);
        }
        // 上移
        $scope.moveUp = function(index, isStop, cate){
            if (isStop){ return;}
            var dx = index - 1,
                grade = cate.grade || 'null',
                thisId = cate.category_id;
            if (cate.grade == '01'){
                Est.arrayExchange($scope.cates, index, dx, {
                    column : 'sort',
                    callback : function(thisNode, nextNode){
                        $scope.updateSort(thisNode);
                        $scope.updateSort(nextNode);
                    }
                });
            } else{
                index = Est.findIndex($scope.list, function(item){
                    return item.category_id == thisId;
                });
                dx = index  - 1;
                while($scope.list[dx]['grade'] !== grade && dx > 0){
                    dx--;
                }
                Est.arrayExchange($scope.list, index, dx, {
                    column : 'sort',
                    callback : function(thisNode, nextNode){
                        $scope.updateSort(thisNode);
                        $scope.updateSort(nextNode);
                        $scope.cates = bulidCate($scope.list, true);
                    }
                });
            }

        }
        // 下移
        $scope.moveDown = function(index, isStop, cate){
            if (isStop){
                return;
            }
            var dx = index + 1,
                grade = cate.grade || 'null',
                thisId = cate.category_id,
                maxdx = $scope.list.length -1;
            if (cate.grade == '01'){
                Est.arrayExchange($scope.cates, index, dx, {
                    column : 'sort',
                    callback : function(thisNode, nextNode){
                        $scope.updateSort(thisNode);
                        $scope.updateSort(nextNode);
                    }
                });
            } else{
                index = Est.findIndex($scope.list, function(item){
                    return item.category_id == thisId;
                });
                dx = index + 1;
                while($scope.list[dx]['grade'] !== grade && dx < maxdx){
                    dx++;
                }
                Est.arrayExchange($scope.list, index, dx, {
                    column : 'sort',
                    callback : function(thisNode, nextNode){
                        $scope.updateSort(thisNode);
                        $scope.updateSort(nextNode);
                        $scope.cates = bulidCate($scope.list, true);
                    }
                });
            }
        }
    }]);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/product_cate_v2',{
        templateUrl: 'modules/Product/views/product_cate_v2.html'
    });
}]);
/**
 * @description 产品分类第二版
 * @author wyj on 14/7/16
 */
app.controller('ProductCateCtrlV2', ['$scope', '$rootScope','ProductCategoryFactory',
    function ($scope, $rootScope, ProductCategoryFactory){
        var maxSort = 0;
        var modelcolum = ['category_id', 'belong_id', 'name', 'cdesc', 'grade', 'isroot', 'isdisplay', 'state', 'image', 'key', 'alias', 'sort', 'seo_title', 'seo_keywords', 'seo_description', 'adcontent'];
        $scope.cates = [];
        $scope.list = [];
        $scope.selectedItem = {};
        $scope.isChange = false;
        $scope.extend = function(cate){
            cate.extend = !cate.extend;
        };
        // 构建树
        $scope.bulidCate = function (list, isSort) {
            return Est.bulidTreeNode(list, 'grade', '01', {
                callback: function(item){
                    item.sort = parseInt(item.sort);
                    if (item.sort > maxSort) maxSort = item.sort;
                },
                sortBy: isSort ? 'sort' : undefined
            });
        }
        // 分类列表
        ProductCategoryFactory.query().then(function(data){
            maxSort = data.length;
            $scope.cates = $scope.bulidCate(data);
            $scope.list = data;
            if (maxSort == 0){
                $scope.addCategory({ belong_id: '/', name: '默认分类', cdesc: '默认分类', isroot: '01', grade: '01', sort: ++maxSort },
                    function(data){
                        var deferred = $q.defer();
                        $scope.list.push(data);
                        $scope.cates = $scope.bulidCate(data);
                        return deferred.promise;
                    });
            }
        });
}]);