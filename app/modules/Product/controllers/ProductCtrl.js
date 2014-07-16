/**
 * @description ProductCtrl
 * @namespace ProductCtrl
 * @author yongjin on 2014/7/4
 */
/**
 * @description 产品列表
 * @controller ProductCtrl
 * @author wyj on 14/5/2
 * @modified wyj on 14/7/2 [重构]
 */
app.controller('ProductCtrl', ['$scope', '$rootScope', '$http', 'API_END_POINT', '$q', '$filter', 'ngTableParams', '$modal', 'ProductFactory', 'ProductTagFactory',
    function($scope, $rootScope, $http, API_END_POINT, $q, $filter, ngTableParams,$modal,ProductFactory, ProductTagFactory){
        $scope.search={};
        $scope.predicate = 'sort';
        $scope.tempValue = '';
        $scope.sortType = -1;
        $scope.reverse = false;
        $scope.checkAll = false;
        $scope.show_header = true;
        $scope.API_END_POINT = API_END_POINT;
        $scope.product_result_data = [];
        $scope.checkAllFn = function () {
            $scope.checkAll = !$scope.checkAll;
        }
        $scope.sort = { sortingOrder : 'sort', reverse : false };
        // 产品列表
        var promise = ProductFactory.query();
        promise.then(function(data) {
            $scope.product_result_data = data;
            $scope.tableParams = new ngTableParams({
                page: 1, count: 10,
                filter: { name: $rootScope.search_key, prodtype: '', category: '', ads: '', type: '' },
                sorting: { sort: 'desc'}
            }, {
                total: $scope.product_result_data.length,
                getData: function($defer, params) {
                    var orderedData = params.filter() ?
                        $filter('filter')($scope.product_result_data, params.filter()) :
                        $scope.product_result_data;
                    $scope.productlist = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    params.total(orderedData.length);
                    $defer.resolve($scope.productlist);
                }
            });
        }, function(data) {
            $scope.productlist = {error: '没有产品！'};
        });
        // 分页
        $scope.changePerPage = function(per_page){
            $scope.params.count(per_page);
        }
        // 刷新列表
        $scope.refreshTable = function(){
            ProductFactory.query().then(function(data){
                $scope.product_result_data = data;
                $scope.tableParams.reload();
            });
        }
        // 产品删除
        $scope.product_del = function(product,$index){
            $rootScope.open("是否删除?" ,function(){
                var p = $scope.tableParams.$params.page;
                var c = $scope.tableParams.$params.count;
                var index_ = $index;
                var p_l_index = (p-1)*c+index_;
                ProductFactory.del(product).then(function(data){
                    $rootScope.showMsg("删除成功！",1000);
                    del_index_by_id($scope,$scope.productlist[$index].product_id)
                    $scope.productlist.splice($index, 1);
                    $scope.product_result_data.splice(p_l_index,1);
                    $rootScope.addToStatic();
                }, function(){
                    $rootScope.showMsg("删除失败！");
                });
            });
        }
        //产品批量删除
        $scope.products_del = function(){
            var ids = [];
            var indexs = [];
            if(!confirm('确定要删除吗？'))
                return;
            $(".checkProducts").each(function(){
                if(this.checked==true){
                    ids.push($(this).attr("fieldValue"));
                    indexs.push($(this).attr("indexValue"));
                }
            })
            if (ids.length==0) {
                $rootScope.showMsg('您还未选中你要删除的产品！');
                return;
            }
            for (var i = 0; i < ids.length; i++){
                var p = $scope.tableParams.$params.page;
                var c = $scope.tableParams.$params.count;
                var index_ = parseInt(indexs[i]);
                var p_l_index = (p-1)*c+index_-(i);
                var this_index = (index_-i)<0?0:(index_-i);
                ProductFactory.del(ids[i]).then(function(){
                    $rootScope.addToStatic();
                }, function(){
                    $rootScope.showMsg("删除失败！");
                });
                del_index_by_id($scope,$scope.product_result_data[p_l_index].product_id)
                $scope.productlist.splice(this_index, 1);
            }
            $rootScope.showMsg("删除成功！");
            $rootScope.edited = true;
        }
        //批量修改分类
        $scope.updateAllCategory = function(){
            var ids = [];
            $(".checkProducts").each(function(){
                if(this.checked==true){
                    ids.push($(this).attr("fieldValue"));
                }
            })
            if (ids.length==0) {
                $rootScope.showMsg('您还未选中你要修改的产品！', {
                    type : 'danger'
                });
                return;
            }
            var modalInstance = $modal.open({
                templateUrl : 'modules/Product/views/product_category.html',
                controller:['$scope', '$modalInstance', '$http', 'API_END_POINT',
                    function($scope, $modalInstance, $http, API_END_POINT){
                    $http.get(API_END_POINT + 'product/category')
                        .success(function (list) {
                            $scope.cates = [];
                            var cates = productCates(list);
                            var bulid1 = function(list,zoom){
                                var z = zoom;
                                if(z==0){
                                    $scope.cates = [];
                                }
                                Est.each(list,function(item){
                                    var space = "";
                                    for(var i = 0;i<z;i++){
                                        space = space+"　";
                                    }
                                    space = space + "|-";
                                    item['name'] = space+item['name']
                                    $scope.cates.push(item);
                                    if(item.hasChild){
                                        bulid1(item.cates, zoom=z+2);
                                    }
                                });
                            }
                            bulid1(cates,0);

                        }).error(function (data) {
                        });
                    $scope.ok = function (category) {
                        $modalInstance.close(category);
                    };
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                }],
                resolve : {
                    ids: function () { return { ids: ids }; }
                }
            });
            modalInstance.result.then(function (category) {
                for(var p in ids){
                    update_category_by_id($scope,API_END_POINT,$http,ids[p],category);
                }
                $rootScope.showMsg('修改成功!');
            }, function () {
            });
        }
        var ProductCategoryCtrl1 = function($scope, $modalInstance, $http, API_END_POINT){
            $http.get(API_END_POINT + 'product/category')
                .success(function (list) {
                    $scope.cates = [];
                    var cates = productCates(list);
                    var bulid1 = function(list,zoom){
                        var z = zoom;
                        if(z==0){
                            $scope.cates = [];
                        }
                        Est.each(list,function(item){
                            var space = "";
                            for(var i = 0;i<z;i++){
                                space = space+"　";
                            }
                            space = space + "|-";
                            item['name'] = space+item['name']
                            $scope.cates.push(item);
                            if(item.hasChild){
                                bulid1(item.cates, zoom=z+2);
                            }
                        });
                    }
                    bulid1(cates,0);

                }).error(function (data) {
                });
            $scope.ok = function (category) {
                $modalInstance.close(category);
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }
        //推荐
        $scope.set_broadcast = function(product){
            if (!product.broadcast) product.proadcast = '00';
            product.broadcast = product.broadcast=='01' ? '00':'01';
            $rootScope.ajax({
                method: 'PUT',
                url: 'product/' + product.product_id,
                data: {
                    broadcast: product.broadcast
                }
            });
        }
        //排序
        var inArray = Array.prototype.indexOf ?
            function (val, arr) {
                return arr.indexOf(val)
            } :
            function (val, arr) {
                var i = arr.length;
                while (i--) {
                    if (arr[i] === val) return i;
                }
                return -1
            };
        $scope.sorts = function (column) {
            var def = $q.defer(),
                arr = [],
                sorts = [];
            angular.forEach($scope.products, function (item) {
                if (inArray(item.name, arr) === -1) {
                    arr.push(item.name);
                    sorts.push({
                        'id': item.name,
                        'title': item.name
                    });
                }
            });
            def.resolve(sorts);
            return def;
        };
        // 按某个字段排序
        $scope.sortByColum = function(name){
            $scope.sortType = $scope.sortType === -1 ? 1 : -1;
            $scope.product_result_data = Est.sortBy($scope.product_result_data, function(item){
                return name === 'sort' ? parseInt(item[name], 10) : item[name];
            });
            if ($scope.sortType === -1){
                $scope.product_result_data.reverse();
            }
            $scope.tableParams.reload();
        }
        //修改产品排序
        $scope.setSort = function (product) {
            $rootScope.ajax({
                method: 'PUT',
                url: 'product/' + product.product_id,
                data : {
                    sort: product.sort
                },
                success : function(data){
                    $rootScope.showMsg("修改成功!");
                }
            });
        }
        //查看产品
        $scope.product_view = function (product){
            var modalInstance = $modal.open({
                templateUrl: 'modules/Product/views/product_add.html',
                controller: ['$scope', '$modalInstance', 'product',function ($scope, $modalInstance, product) {
                    $scope.product = product;
                    $scope.ok = function () {
                        $scope.product.new_cates = $scope.new_cates || '';
                        $modalInstance.close($scope.product);
                    };
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                }],
                windowClass: 'product-detail-dialog',
                resolve: {
                    product: function () {
                        var deferred = $q.defer();
                        ProductFactory.detail(product.product_id).then(function(data){
                            data.thumbnail_path = pic_resize(data.pic_path,5);
                            data.dialog_show = true;
                            deferred.resolve(data);
                        }, function(data){
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    }
                }
            });
            modalInstance.result.then(function (product) {
                var new_cate = product.new_cates.length > 0 ? ","+product.new_cates.toString(",") : "";
                product.category = product.category + new_cate;
                product.detail3 = Est.arrayToObject(product.paramValues,'name','value');
                ProductFactory.save(product).then(function(data){
                    $rootScope.showMsg("修改成功!",{ time: 500 });
                    $rootScope.addToStatic();
                    $scope.refreshTable();
                }, function(){
                    $rootScope.showMsg("修改失败!");
                });
            }, function () {});
        }
        //多选框
        $scope.checkboxes = { 'checked': false, items: {} };
        $scope.$watch('checkboxes.checked', function (value) {
            angular.forEach($scope.users, function (item) {
                if (angular.isDefined(item.id)) {
                    $scope.checkboxes.items[item.id] = value;
                }
            });
        });
        // watch for data checkboxes
        $scope.$watch('checkboxes.items', function (values) {
            if (!$scope.users) return;
            var checked = 0, unchecked = 0,
                total = $scope.users.length;
            angular.forEach($scope.users, function (item) {
                checked += ($scope.checkboxes.items[item.id]) || 0;
                unchecked += (!$scope.checkboxes.items[item.id]) || 0;
            });
            if ((unchecked == 0) || (checked == 0)) {
                $scope.checkboxes.checked = (checked == total);
            }
            angular.element(document.getElementById("select_all")).prop("indeterminate", (checked != 0 && unchecked != 0));
        }, true);
        $scope.seo_edit = function(product){
            var modalInstance = $modal.open({
                templateUrl: 'modules/Product/views/product_seo.html',
                controller: ProSeoModelInit,
                resolve: {
                    product: function () {
                        var defeffed = $q.defer();
                        ProductFactory.detail(product.product_id).then(function(data){
                            data.show_header = true;
                            data.show_btn = true;
                            data.dialog_show = true;
                            defeffed.resolve(data);
                        });
                        return defeffed.promise;
                    }
                }
            });
            modalInstance.result.then(function (product) {
                ProductFactory.save(product).then(function(data){
                    $rootScope.showMsg("修改成功!");
                    $rootScope.addToStatic();
                });
            });
        }
        //选中行
        $scope.changeSelection = function (product_id,isChecked) {
            console.info(product_id+';;'+isChecked);
        };
        $scope.navType = 'pills';
        //用于select选中前的临时值
        $scope.setTempValue = function(value){
            $scope.tempValue = value;
        }
        //上移
        $scope.moveUp = function(index, isStop){
            if (!isStop){
                Est.arrayExchange($scope.productlist, index, index - 1, {
                    column : 'sort',
                    callback : function(thisNode, nextNode){
                        $scope.setSort(thisNode);
                        $scope.setSort(nextNode);
                        update_sort_by_id($scope, thisNode.product_id,thisNode.sort);
                        update_sort_by_id($scope, nextNode.product_id, nextNode.sort, true);
                    }
                });
            }
        }
        //下移
        $scope.moveDown = function(index, isStop){
            if (!isStop) {
                Est.arrayExchange($scope.productlist, index, index + 1, {
                    column : 'sort',
                    callback : function(thisNode, nextNode){
                        $scope.setSort(thisNode);
                        $scope.setSort(nextNode);
                        update_sort_by_id($scope, thisNode.product_id,thisNode.sort);
                        update_sort_by_id($scope, nextNode.product_id, nextNode.sort, true);
                    }
                });
            }
        }
        //插序
        $scope.insertSort = function(product){
            var tempList = [];
            var thisId = $scope.tempValue;
            var targetId =  product.product_id;
            //还原原始值
            product.product_id = thisId;
            var thisdx = Est.findIndex($scope.product_result_data, function(item){
                return item.product_id == thisId;
            });
            var targetdx = Est.findIndex($scope.product_result_data, function(item1){
                return item1.product_id == targetId;
            });
            Est.arrayInsert($scope.product_result_data, thisdx, targetdx, {
                column : 'sort',
                callback : function(tempList){
                    Est.each(tempList, function(product){
                        $scope.setSort(product);
                        update_sort_by_id($scope, product.product_id,product.sort);
                    });
                }
            });
            $scope.product_result_data =  Est.sortBy($scope.product_result_data, function(item) { return parseInt(item.sort)* -1; });
            $scope.tableParams.reload();
        }
        // 标签相关
        $scope.delTag = function(product_id, tag_id, tags){
            ProductTagFactory.delProTag(product_id, tag_id).then(function(){
                Est.removeAt(tags, Est.findIndex(tags, {tag_id: tag_id}));
            });
        }
        // 产品发布
        $scope.publish = function(product){
            $rootScope.showMsg('正在发布...', {time: 1000000});
            $rootScope.staticPage('product', product.product_id).then(function(flag){
                $rootScope.showMsg('发布 ' + product.name + ' 完成');
            }, function(){
                $rootScope.showMsg('发布失败， 请稍后再试');
            });
        }
    }]);


/**
 * @description 产品搜索栏下拉分类
 * @controller ProductCategoryCtrl
 * @method wyj on 14/7/2
 * @modified wyj on 14/7/2
 */
app.controller('ProductCategoryCtrl', ['$scope', '$http', 'API_END_POINT',
    function($scope, $http, API_END_POINT){
        $http.get(API_END_POINT + 'product/category')
            .success(function (list) {
                $scope.cates = [];
                var cates = productCates(list);
                var bulid1 = function(list,zoom){
                    var z = zoom;
                    if(z==0){
                        $scope.cates = [];
                    }
                    Est.each(list,function(item){
                        var space = "";
                        for(var i = 0;i<z;i++){
                            space = space+"　";
                        }
                        space = space + "|-";
                        item['name'] = space+item['name']
                        $scope.cates.push(item);
                        if(item.hasChild){
                            bulid1(item.cates, zoom=z+2);
                        }
                    });
                }
                bulid1(cates,0);
            }).error(function (data) {
            });
    }]);


function del_index_by_id($scope,id){
    var t = $scope.product_result_data;
    var index;
    for (var p in t){
        if (t[p].product_id==id){
            index=p;
            break;
        }
    }
    t.splice(index,1);
}
function update_sort_by_id($scope,product_id, sort, isSort){
    Est.filter($scope.product_result_data, {'product_id':product_id})[0]['sort'] = sort;
    if (isSort){
        $scope.product_result_data =  Est.sortBy($scope.product_result_data, function(item) { return parseInt(item.sort)* -1; });
    }
}
function update_category_by_id(product_id,category){
    $rootScope.ajax({
        method: 'PUT',
        url: 'product/' + product_id,
        data: {
            category: category
        }
    });
}
