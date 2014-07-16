/**
 * @description ProductAddCtrl
 * @namespace ProductAddCtrl
 * @author yongjin on 2014/7/4
 */
/**
 * @description 产品添加
 * @controller ProductAddCtrl
 * @author wyj on 14/7/2
 * @modified wyj on 14/7/3 [添加标签功能]
 */
app.controller('ProductAddCtrl', ['$scope', '$rootScope', '$http', 'API_END_POINT', '$q', '$modal', '$location', 'ProductFactory', 'ProductTagFactory', 'ProductCategoryFactory',
    function($scope, $rootScope, $http, API_END_POINT, $q, $modal, $location, ProductFactory, ProductTagFactory, ProductCategoryFactory) {
        $scope.tabs = [
            { title: "高级选项", content: "modules/Product/views/product_advance.html"},
            { title: "搜索引擎优化", content: "modules/Product/views/product_seo.html"}
        ];
        $scope.add_page = false;
        $scope.agrs = {};
        $scope.thisPageFlag = false;
        $scope.navType = 'pills';
        $scope.types = [ {type: 'NM',name:'普通'}, {type: 'NW', name:'新品'}, {type: 'CP', name:'精品'} ];
        $scope.loginViews = [ {val: '0' ,name : '访问者可见'}, {val: '1' ,name : '登录后可见'} ];
        $scope.adss = [ {val: '1',name:'广告产品'}, {val: '0',name:'普通产品'} ];
        var initPage = function(hasProduct){
            if (!hasProduct){
                $scope.product={type : {}}
                $scope.product.paramValues = []; // 产品参数
                $scope.new_cates = [];
                $scope.dialog_show = false;
                $scope.add_page = true;
                $scope.product.type = $scope.types[0]['type']; // 产品类型
                $scope.product.login_view = $scope.loginViews[0]['val']; // 访问者登录模式
                $scope.product.ads = $scope.adss[1]['val']; // 广告产品
                $scope.product.detail_title1 = "产品服务";
                $scope.product.detail_title2 = "产品功能";
                $scope.product.photos = []; // 产品附图
            } else {
                $scope.new_cates = $scope.product.category.split(",");
                $scope.product.category = $scope.new_cates[0];
                $scope.product.paramValues = Est.arrayFromObject(JSON.parse($scope.product.detail3), 'name','value');
                $scope.new_cates.shift();

            }
        }
        var product_id = $location.search()['product_id'];
        if ($scope.product){
            initPage(true);
        } else if(product_id){
            ProductFactory.detail(product_id).then(function(product){
                product.thumbnail_path = pic_resize(product.pic_path,5);
                product.dialog_show = true;
                $scope.product = product;
                initPage(true);
            });
        } else{
            initPage(false);
        }
        // 添加分类
        $scope.addCategory = function (cate, callback) {
            ProductCategoryFactory.save(cate).then(function(data){
                data['cates'] = [];
                data['hasChild'] = false;
                if (typeof callback === 'function') {
                    callback.call(null, data);
                }
            });
        }
        $scope.initCategory = function (list) {
            $scope.cates = [];
            var cates = productCates(list);
            var bulid = function (list, zoom) {
                var z = zoom;
                Est.each(list, function (item) {
                    var space = "";
                    for (var i = 0; i < z; i++) {
                        space = space + "　";
                    }
                    space = space + "|-";
                    item['name'] = space + item['name']
                    $scope.cates.push(item);
                    if (item.hasChild) {
                        bulid(item.cates, zoom = z + 2);
                    }
                });
            }
            bulid(cates, 0);
        }
        var initProCate = function () {
            ProductCategoryFactory.query().then(function(list){
                $scope.initCategory(list);
                if (list.length == 0) {
                    $scope.addCategory({ belong_id: '/', name: '默认分类', cdesc: '默认分类', isroot: '01', grade: '01', sort: 1 },
                        function (data) {
                            var deferred = $q.defer();
                            list.push(data);
                            $scope.initCategory(list);
                            return deferred.promise;
                        });
                }
            });
        }
        // 初始化产品分类
        initProCate();
        $scope.cate_add = function () {
            $scope.new_cates.push("");
        }
        $scope.new_cate_del = function (index) {
            $scope.new_cates.splice(index, 1);
        }
        $scope.change_new_cates = function (new_cate, index) {
            $scope.new_cates[index] = new_cate;
        }
        $scope.thisPage = function(){
            $scope.thisPageFlag = true;
        }
        // 表单提交
        $scope.submit = function () {
            var new_cate = $scope.new_cates.length > 0 ? "," + $scope.new_cates.toString(",") : "";
            $scope.product.category = $scope.product.category + new_cate;
            $scope.product.detail3 = Est.arrayToObject($scope.product.paramValues, 'name', 'value');
            if ($scope.add_page) {
                ProductFactory.save($scope.product).then(function(data){
                    $rootScope.staticPage('product_detail', data.product_id);
                    $rootScope.showMsg("添加成功!");
                    Est.each($scope.tags, function(item){
                        if (item.checked){
                            ProductTagFactory.saveProTag(data.product_id, item.tag_id);
                        }
                    });
                    if ($scope.thisPageFlag){
                        $scope.thisPageFlag = false;
                    } else{
                        $rootScope.locationUrl('/product_list', '产品管理');
                    }
                }, function(){
                    $rootScope.showMsg("添加失败!");
                });
            }
            else {
                ProductFactory.save($scope.product).then(function(data){
                    $rootScope.staticPage('product_detail', $scope.product.product_id);
                    $rootScope.showMsg("修改成功!");
                    $scope.ok($scope.product);
                }, function(){
                    $rootScope.showMsg("修改失败!");
                });
            }
        }
        // 图片上传
        $scope.openFileDialog = function (cate) {
            $rootScope.openFileDialog(function (select_list) {
                $scope.product.pic_path = select_list[0].server_path;
                $scope.product.thumbnail_path = select_list[0].thumbnail_path;
            });
            return false;
        }
        $scope.photo_hover = function (photo) {
            return photo.show_tool = !photo.show_tool;
        }
        // 删除附加图片
        $scope.photo_delete = function (photo, index, $event) {
            $scope.product.photos.splice(index, 1);
            $event.stopPropagation();
        };
        $scope.photo_move = function (photo, $index, type, $event) {
            var temp = null;
            if (type == 0) {
                temp = $scope.product.photos[$index];
                $scope.product.photos.splice($index, 1);
                $scope.product.photos.splice($index - 1, 0, temp);
            }
            else {
                temp = $scope.product.photos[$index];
                $scope.product.photos.splice($index, 1);
                $scope.product.photos.splice($index + 1, 0, temp);
            }
            $event.stopPropagation();
        }
        $scope.appendPicDialog = function () {
            $rootScope.openFileDialog(function (select_list) {
                $scope.product.photos.push(select_list[0]);
            });
            return false;
        }
        // 产品参数
        $scope.addParams = function () {
            $scope.product.paramValues.push({ name: '', value: '' });
        }
        $scope.param_delete = function (index, $event) {
            Est.removeAt($scope.product.paramValues, index);
            $event.stopPropagation();
        };
        $scope.param_move = function ($index, type, $event) {
            var dx = type == '0' ? $index - 1 : $index + 1;
            Est.arrayExchange($scope.product.paramValues, $index, dx);
            $event.stopPropagation();
        }
        $scope.cate_manage = function () {
            var modalInstance = $modal.open({
                templateUrl: 'modules/Product/views/product_cate.html',
                controller: ['$scope', '$modalInstance', 'cates', function ($scope, $modalInstance, cates) {
                    $scope.cates = cates;
                    $scope.dialog_show = true;
                    $rootScope.modalInit($scope, $modalInstance, $scope.cates);
                }],
                resolve: { cates: function () {
                    return [];
                } }
            });
            modalInstance.result.then(function (cates) {
                $scope.cates = cates;
            }, function () {
                initProCate();
            });
        }
    }]);

app.controller('ProductAddTagCtrl', ['$scope', '$rootScope', 'ProductTagFactory',
    function ($scope, $rootScope, ProductTagFactory) {
        ProductTagFactory.query().then(function (data) {
            $scope.tags = data;
        });
        ProductTagFactory.detail($scope.product.product_id).then(function (data) {
            $scope.proTags = data;
        });
        $scope.isChecked = function(item){
            if (Est.findIndex($scope.proTags, {tag_id: item.tag_id}) > -1) {
                item.checked = true;
                return true;
            }
        }
        // 产品标签
        $scope.addTag = function (title) {
            if (title && title.length > 0) {
                var nIndex = Est.findIndex($scope.tags, {title: title});
                if (nIndex > -1) {
                    $rootScope.showMsg("此标签已经存在！");
                    return false;
                }
                ProductTagFactory.save({ title: title }).then(function (data) {
                    data.checked = true;
                    $scope.proTags.push(data);
                    $scope.tags.push(data);
                    ProductTagFactory.saveProTag($scope.product.product_id, data.tag_id);
                    $scope.product.tagName = '';
                });
            }
        }
        $scope.saveProTag = function (item) {
            item.checked = !item.checked;
            if (Est.typeOf($scope.product.product_id) !== 'undefined') {
                if (item.checked) {
                    ProductTagFactory.saveProTag($scope.product.product_id, item.tag_id);
                } else {
                    ProductTagFactory.delProTag($scope.product.product_id, item.tag_id);
                }
            }
        }
    }])