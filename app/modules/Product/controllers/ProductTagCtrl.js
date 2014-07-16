/**
 * @description ProductCategoryCtrl
 * @namespace ProductCategoryCtrl
 * @author yongjin on 2014/7/4
 */
/**
 * @description 产品标签
 * @controller ProductTagCtrl
 * @author wyj on 14/7/2
 * @modified wyj on 14/7/2 [重构]
 */
app.controller('ProductTagCtrl', ['$scope', '$rootScope', '$http', 'API_END_POINT', 'ngTableParams', '$modal', 'ProductTagFactory', '$filter',
    function($scope, $rootScope, $http, API_END_POINT, ngTableParams, $modal, ProductTagFactory, $filter){
        // 全选
        $scope.checkAllFn = function () {
            $scope.checkAll = !$scope.checkAll;
        }
        // 列表
        var promise = ProductTagFactory.query();
        promise.then(function (data) {
            $scope.product_tag_result_data = data;
            $scope.tableParams = new ngTableParams({
                page: 1, count: 10,
                filter: { title: $rootScope.search_key },
                sorting: { sort: 'desc' }
            }, {
                total: $scope.product_tag_result_data.length,
                getData: function ($defer, params) {
                    var orderedData = params.filter() ?
                        $filter('filter')($scope.product_tag_result_data, params.filter()) :
                        $scope.product_tag_result_data;
                    $scope.productTaglist = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    params.total(orderedData.length);
                    $defer.resolve($scope.productTaglist);
                }
            });
        }, function (data) {
            $scope.productTaglist = {error: '没有标签！'};
        });
        // 分页
        $scope.changePerPage = function (per_page) {
            $scope.params.count(per_page);
        }
        // 删除
        $scope.removeTag = function (tag, $index) {
            $rootScope.open("是否删除？", function () {
                var p_l_index = Est.findIndex($scope.product_tag_result_data, {
                    tag_id: tag.tag_id
                });
                ProductTagFactory.del(tag.tag_id).then(function(data){
                    $rootScope.showMsg('删除成功！');
                    $scope.product_tag_result_data.splice(p_l_index, 1);
                    $scope.tableParams.reload();
                });
            });
        }
        var ProTagAddModelInit = function ($scope, $modalInstance, tag) {
            $scope.tag = tag;
            $scope.ok = function () {
                $modalInstance.close($scope.tag);
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }
        // 判断名称是否存在
        var fNameExist = function(sName){
            var nIndex = Est.findIndex($scope.product_tag_result_data, {title: sName});
            return nIndex !== -1 ? true : false;
        }
        //　添加或修改
        $scope.addTag = function (oTag) {
            var bIsEdit = oTag ? true : false;
            oTag = oTag || {title: ''};
            var modalInstance = $modal.open({
                templateUrl: 'modules/Product/views/product_tag_add.html',
                controller: ['$scope', '$modalInstance', 'tag',function ($scope, $modalInstance, tag) {
                    $scope.tag = tag;
                   $rootScope.modalInit($scope.tag);
                }],
                resolve: {
                    tag: function () {
                        return Est.cloneDeep(oTag);
                    }
                }
            });
            modalInstance.result.then(function (oTagN) {
                if (fNameExist(oTagN.title)) {
                    $rootScope.open("此标签名称已存在！");
                    return;
                }
                ProductTagFactory.save(oTagN).then(function(data){
                    if (!bIsEdit) {
                        $scope.product_tag_result_data.unshift(data);
                        $rootScope.showMsg("添加成功！");
                    } else {
                        oTag = oTagN;
                        $rootScope.showMsg("修改成功！");
                    }
                    $scope.refreshTable();
                });
            }, function () {
            });
            return false;
        };
        // 刷新列表
        $scope.refreshTable = function(){
            ProductTagFactory.query().then(function(data){
                $scope.product_tag_result_data = data;
                $scope.tableParams.reload();
            });
        }
        // 排序
        $scope.setSort = function (oTag) {
            $http.put(API_END_POINT + 'product/tag/' + oTag.tag_id, {sort: oTag.sort}).success(function () {
                $rootScope.showMsg('修改成功！');
            });
        }
        $scope.update_sort_by_id = function ($scope, tag_id, sort, isSort) {
            Est.filter($scope.product_tag_result_data, {'tag_id': tag_id})[0]['sort'] = sort;
            if (isSort) {
                $scope.product_tag_result_data = Est.sortBy($scope.product_tag_result_data, function (item) {
                    return parseInt(item.sort) * -1;
                });
            }
        }
        // 上移
        $scope.moveUp = function (index, isStop) {
            if (!isStop) {
                Est.arrayExchange($scope.productTaglist, index, index - 1, {
                    column: 'sort',
                    callback: function (thisNode, nextNode) {
                        $scope.setSort(thisNode);
                        $scope.setSort(nextNode);
                        $scope.update_sort_by_id($scope, thisNode.tag_id, thisNode.sort);
                        $scope.update_sort_by_id($scope, nextNode.tag_id, nextNode.sort, true);
                    }
                });
            }
        }
        // 下移
        $scope.moveDown = function (index, isStop) {
            if (!isStop) {
                Est.arrayExchange($scope.productTaglist, index, index + 1, {
                    column: 'sort',
                    callback: function (thisNode, nextNode) {
                        $scope.setSort(thisNode);
                        $scope.setSort(nextNode);
                        $scope.update_sort_by_id($scope, thisNode.tag_id, thisNode.sort);
                        $scope.update_sort_by_id($scope, nextNode.tag_id, nextNode.sort, true);
                    }
                });
            }
        }
    }]);