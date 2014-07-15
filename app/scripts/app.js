/**
 * @description 存在于$rootScope中的通用方法
 * @class $rootScope - ng 通用方法集
 * @author wyj on 14/7/15
 */

'use strict';
var app = angular.module('angularOneApp', [
    'ngCookies',
    'ngRoute',
    'ngAPI',
    'ngTable',
    'ngUeditor',
    'ui.bootstrap.treeview',
    'blueimp.fileupload',
    'ui.nestedSortable',
    'ui.bootstrap.tabs',
    'ui.bootstrap.modal',
    'ui.bootstrap.tooltip'
])
.constant('HOST', 'http://example.com:9004')
.constant('API_END_POINT', 'http://example.com:9004/api/')
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
app.run(['$route', '$rootScope', '$http', '$timeout', '$location', 'API_END_POINT','WEB_DESIGN_URL', 'WEBSITE_URL','MOBILE_DESIGN_URL', '$q', '$modal',
    function($route, $rootScope, $http, $timeout, $location, API_END_POINT,WEB_DESIGN_URL, WEBSITE_URL,MOBILE_DESIGN_URL, $q, $modal){
        $rootScope.API_END_POINT = API_END_POINT;
        $rootScope.MOBILE_DESIGN_URL = MOBILE_DESIGN_URL;
        $rootScope.WEB_DESIGN = false; // 是否是设计模式
        $rootScope.WEB_DESIGN_URL = WEB_DESIGN_URL;
        $rootScope.WEBSITE_URL = WEBSITE_URL;

        $rootScope.preLoaded = true;
        $rootScope.edited = false;
        $rootScope.editNum = 0;
        $rootScope.alerts = [];
        $rootScope.search_key = '';
        $rootScope.ueContainer = {};
        $rootScope.staticContainer = { product: [], news: [] };
        $rootScope.closeAlert = function (index) {
            $rootScope.alerts.splice(index, 1);
        };
        /**
         * @description 提示消息
         * @method showMsg
         * @param {String} msg 提示内容
         * @param {Object} opts 配置信息
         * @author wyj on 14/7/15
         * @example
         *      $rootScope.showMsg("修改成功!", { time: 500 }); // 0.5秒后关闭 默认2秒后关闭
         */
        $rootScope.showMsg = function (msg, opts) {
            var opts = opts || {};
            var time = opts.time || 2000;
            $rootScope.alerts.length = 0;
            $rootScope.alerts.push({
                type : opts.type || '',
                msg: msg
            });
            $timeout(function () {
                $rootScope.closeAlert(0);
            }, time);
        };
        // js跳转url
        /**
         * @description js跳转url
         * @method jumpUrl
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
         * @method locationUrl
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
        /**
         * @description 消息提示框  比如删除前提示  产品添加成功后提示
         * @method open
         * @param {String} msg 提示内容
         * @param {Function} action 提示成功后操作
         * @param {Object} opts 配置信息
         * @author wyj on 14/7/15
         * @example
         *      普通: $rootScope.open('修改失败,原密码错误!');
         *      复杂：$rootScope.open("是否删除?" ,function(){
         *          。。。
         *      }， {ok: '确定', cancel: '取消'});
         */
        $rootScope.open = function (msg, action, opts) {
            var modalInstance = $modal.open({
                templateUrl: 'templates/msg/msg.html',
                controller: ['$scope', '$modalInstance', 'item',function($scope, $modalInstance, item){
                    $scope.ok_text = "确定";
                    $scope.cancel_text = "关闭";
                    $scope.msg = item.msg;
                    if (item.opts) {
                        if (item.opts.ok) {
                            $scope.show_ok = true;
                            $scope.ok_text = item.opts.ok;
                        }
                        if (item.opts.cancel) {
                            $scope.show_cancel = true;
                            $scope.cancel_text = item.opts.cancel;
                        }
                    } else {
                        $scope.show_ok = true;
                        $scope.show_cancel = true;
                    }
                    $scope.ok = function () {
                        $modalInstance.close($scope.msg);
                    };
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                    if (typeof (item.action) !== 'undefined' && typeof (item.action) !== 'function') {
                        $timeout(function () {
                            $scope.cancel();
                        }, item.action);
                    }
                }],
                resolve: {
                    item: function () {
                        return {
                            msg: msg,
                            action: action,
                            opts: opts
                        };
                    }
                }
            });
            modalInstance.result.then(function (msg) {
                if (typeof (action) === 'function') action(msg);
            });
        };
        /**
         * @description 通用弹出对话框 初始化
         * @method modalInit
         * @param {Object} $scope 作用域
         * @param {Object} $modalInstance 对话框实例对象
         * @param {Object} item 传递的数据  可以是object, 或数值
         * @author wyj on 14/7/15
         * @example
         *      var modalInstance = $modal.open({
         *          templateUrl: 'modules/Upload/views/copy_src.html',
         *          controller: ['$scope', '$modalInstance', function($scope, $modalInstance){
         *              $scope.pic = pic;
         *              $rootScope.modalInit($scope, $modalInstance, $scope.pic);
         *          }],
         *          windowClass : 'pic-upload-dialog',
         *          resolve: { pic: function () { return pic; } }
         *      });
         *  modalInstance.result.then(function () {
         *          $rootScope.showMsg('复制成功');
         *      });
         */
        $rootScope.modalInit = function($scope, $modalInstance, item){
            $scope.ok = function(){
                $modalInstance.close(item);
            }
            $scope.cancel = function(){
                $modalInstance.dismiss('cancel');
            }
        }
        /**
         * @description 通用搜索方法 默认跳转到产品列表页面
         * @method search
         * @param {String} search_key 搜索关键词
         * @param {String} url 跳转地址
         * @author wyj on 14/7/15
         * @example
         *      <input type="text" ng-model="search_key" tooltip="按回车查询" ng-enter="search(search_key, '/product_list')" placeholder="Search ..." class="nav-search-input" id="nav-search-input" autocomplete="off" />
         */
        $rootScope.search = function(search_key, url){
            var url = url || '/product_list';
            $rootScope.search_key = search_key;
            $location.path(url);
            $route.reload();
        }
        /**
         * @description 任务指示跳转
         * @method editTask
         * @param {String} url 跳转URL
         * @param {String} title 标题
         * @param task 任务
         * @author wyj on 14/7/15
         * @example
         *      <span ng-hide="enterprise.logo" ng-click="editTask('/entinfo', '公司资料', 'logo')">设置</span>
         */
        $rootScope.editTask = function(url, title, task){
            $rootScope.task = task;
            $rootScope.locationUrl(url, title);
        }

        $rootScope.ajax = function(opts){
            var successFn = opts.success || function(){};
            var errorFn = opts.error || function(){};
            $http({
                method: opts.method || 'POST',
                data: opts.data || {},
                url: API_END_POINT + opts.url
            }).success(successFn).error(errorFn);
            $rootScope.staticPage();
        }

        // 静态化相关
        /**
         * @description 添加到静态化列表
         * @method addToStatic
         * @param {String} 静态化页面， 目录支持product, news
         * @param {String} 静态化产品或新闻ID值
         * @author wyj on 14/7/15
         * @example
         *      $rootScope.addToStatic('product', 'Product_00000000000000000321');
         *      $rootScope.doStatic(); // 执行静态化
         */
        $rootScope.addToStatic = function(page, item_id){
            if (Est.typeOf(page) !== 'undefined'){
                $rootScope.staticContainer[page].push(item_id);
            }
            if ($rootScope.sessionuser.grade === '02'){
                $rootScope.edited = true;
                $rootScope.editNum += 1;
            }
        }
        /**
         * @description 执行静态化程序
         * @method doStatic
         * @author wyj on 14/7/15
         * @example
         *      $rootScope.doStatic();
         */
        $rootScope.doStatic = function(){
            Est.each($rootScope.staticContainer, function(value, key){
                var name = key;
                Est.each(value, function(item_id){
                    $rootScope.staticPage(name, item_id);
                });
            });
            $rootScope.showMsg('静态化完毕');
        }

        /**
         * @description 静态化详细页面
         * @method staticPage
         * @param {String} page news 或 product
         * @param {String} item_id id值
         * @author wyj on 14/7/15
         * @example
         *      $rootScope.staticPage('product', 'Product_00000000000000021');
         */
        $rootScope.staticPage = function(page, item_id){
            var deferred = $q.defer();
            $.ajax({
                url : '/views/static/page',
                type : 'post',
                async : true,
                data : JSON.stringify({"page" : page, "item_id": item_id}),
                success : function (data){
                    deferred.resolve(data);
                },
                error: function(data){
                    deferred.reject(data);
                }
            });
            return deferred.promise;
        }
        /**
         * @description 部分静态化  比如导航页面， 分类页面
         * @method staticPart
         * @author wyj on 14/7/15
         * @example
         *      $rootScope.staticPart();
         */
        $rootScope.staticPart = function(){
            $.ajax({
                url: '/views/static/part',
                type: 'post',
                success: function(){ }
            });
            $rootScope.edited = false;
            $rootScope.editNum = 0;
            $rootScope.showMsg('正在静态化...', {time: 3000});
        }

        /**
         * @description nestedSortable option配置
         * @method NestedSortableOption
         * @param $scope
         * @param category_id 分类ID
         * @param belong_id 父类ID
         * @param grade 父元素值  比如00
         * @param bulidCate 树构建器
         * @author wyj on 14/7/15
         * @example
         *       $scope.options = $rootScope.NestedSortableOption($scope, 'category_id', 'belong_id', 'grade', bulidCate);
         */
        $rootScope.NestedSortableOption = function($scope, category_id, belong_id, grade, bulidCate){
            return {
                accept: function (data, sourceItemScope, targetScope) {
                    return true;
                },
                orderChanged: function (scope, sourceItem, sourceIndex, destIndex) {
                    dIndex = destIndex == 0 ? destIndex : destIndex - 1;
                    var sIndex = Est.findIndex($scope.list, function(item){
                        return item.category_id == sourceItem.category_id;
                    });
                    var dIndex = Est.findIndex($scope.list, function(item){
                        return item.category_id == scope.sortableModelValue[dIndex][category_id];
                    });
                    dIndex = destIndex == 0 ? 0 : dIndex + 1;
                    if(destIndex == 0 && scope.parentItemScope()){
                        dIndex =   Est.findIndex($scope.list, function(item){
                            return item.category_id == scope.sortableModelValue[1][category_id];
                        });
                    }
                    Est.arrayInsert($scope.list, sIndex, dIndex, {
                        column : 'sort',
                        callback : function(tempList){
                            Est.each(tempList, function(item){
                                $scope.updateSort(item);
                            });
                        }
                    });
                    $scope.cates = bulidCate($scope.list);
                },
                itemClicked: function (sourceItem) {
                },
                itemRemoved: function (scope, modelData, sourceIndex) {
                    $scope.sIndex = Est.findIndex($scope.list, function(item){
                        return item.category_id == modelData.category_id;
                    });
                },
                itemAdded: function (scope, modelData, destIndex) {
                    if (destIndex !== 0){
                        // 添加的元素不是第一个元素
                        $scope.dIndex = Est.findIndex($scope.list, function(item){
                            return item.category_id == scope.sortableModelValue[destIndex - 1][category_id];
                        }) + 1;
                        // 更新grade 与 parent_id值
                        modelData.grade = scope.sortableModelValue[destIndex - 1][grade];
                        modelData.belong_id = scope.sortableModelValue[destIndex - 1][belong_id];
                    } else if(scope.sortableModelValue.length == 1){
                        // 添加的元素为第一个元素 且 目标元素不存在子分类
                        $scope.dIndex = Est.findIndex($scope.list, function(item){
                            return item.category_id == scope.parentItemScope().itemData()[category_id];
                        }) + 1;
                        modelData.grade = Est.pad(scope.level(), 2, '0', false, 10);
                        modelData.belong_id = scope.parentItemScope().itemData()[category_id];
                    } else{
                        // 添加的元素为第一个元素，且目标元素存在子分类
                        $scope.dIndex = Est.findIndex($scope.list, function(item){
                            return item.category_id == scope.sortableModelValue[destIndex + 1][category_id];
                        }) + 1;
                        // 更新grade 与 parent_id值 为下一个元素的值
                        modelData.grade = scope.sortableModelValue[destIndex + 1][grade];
                        modelData.belong_id = scope.sortableModelValue[destIndex + 1][belong_id];
                    }
                    $scope.updateSort(modelData);
                    // 插入序操作
                    Est.arrayInsert($scope.list, $scope.sIndex, $scope.dIndex, {
                        column : 'sort',
                        callback : function(tempList){
                            Est.each(tempList, function(item){
                                $scope.updateSort(item);
                            });
                        }
                    });
                    // 重新渲染树结构
                    $scope.cates = bulidCate($scope.list);
                },
                itemMoved: function (sourceScope, modelData, sourceIndex, destScope, destIndex) {
                }
            }
        }
}]);
app.run(["$templateCache", function($templateCache) {
    $templateCache.put("custom/pager",
            "<div class=\"list-footer-tool clearfix\">"
            +"<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" style=\"table-layout:auto;\" class=\"ui-pg-table\">"
            +"<tbody>"
            +"<tr >"
            +"<td id=\"first_grid-pager\" ng-show=\"pages.length > 2\" ng-class=\"{'ui-state-disabled': !pages[0]['active']}\" class=\"ui-pg-button ui-corner-all\" style=\" cursor: default;\">"
            +"<span class=\"ui-icon icon-double-angle-left bigger-140\" ng-click=\"params.page(1)\"></span>"
            +"</td>"

            +"<td id=\"prev_grid-pager\" ng-class=\"{'ui-state-disabled': !pages[0]['active']}\" class=\"ui-pg-button ui-corner-all\" style=\"cursor: default;\">"
            +"<span class=\"ui-icon icon-angle-left bigger-140\" ng-repeat=\"page in pages\" ng-show=\"page.type == 'prev'\" ng-click=\"params.page(page.number)\"></span>"
            +"</td>"

            +"<td class=\"ui-pg-button ui-state-disabled\" style=\"width: 4px; cursor: default;\">"
            +"<span class=\"ui-separator\"></span>"
            +"</td>"

            +"<td dir=\"ltr\" ng-show=\"pages.length > 2\">"
            +"<span ng-repeat=\"page in pages\" ng-show=\"!page.active && (page.type != 'first') && (page.type != 'last')\" class=\"ui-pg-input\">{{page.number}}</span> / <span id=\"sp_1_grid-pager\">{{pages.length == 1 ? 1 : (pages.length-2)}}页, 共{{params.total()}}个</span>&nbsp;&nbsp;&nbsp;"
            +"<input  class=\"ui-pg-input\" type=\"text\" size=\"2\" maxlength=\"7\" ng-init=\"gotopage=1\" tooltip=\"按回车跳转\"  ng-model=\"gotopage\" ng-enter=\"params.page(gotopage)\" role=\"textbox\">"
            +"</td>"

            +"<td class=\"ui-pg-button ui-state-disabled\" style=\"width: 4px; cursor: default;\">"
            +"<span class=\"ui-separator\"></span>"
            +"</td>"

            +"<td id=\"next_grid-pager\" ng-class=\"{'ui-state-disabled': !pages[pages.length-1]['active']}\" class=\"ui-pg-button ui-corner-all\" style=\"cursor: default;\">"
            +"<span class=\"ui-icon icon-angle-right bigger-140\" ng-repeat=\"page in pages\" ng-show=\"page.type == 'next'\" ng-click=\"params.page(page.number)\"></span>"
            +"</td>"

            +"<td id=\"last_grid-pager\" ng-show=\"pages.length > 2\" ng-class=\"{'ui-state-disabled': !pages[pages.length-1]['active']}\" class=\"ui-pg-button ui-corner-all\" style=\"cursor: default;\">" +
            "<span class=\"ui-icon icon-double-angle-right bigger-140\" data-page=\"{{pages.length}}\" ng-click=\"params.page(pages.length -2)\"></span>" +
            "</td>"

            +"</tr>"
            +"</tbody>"
            +"</table>"

            +"<span ng-show=\"pages.length < 2\">1 / 1页</span>"

            +"<span class=\"btn-group  hidden-xs\" style=\"position:absolute;right:5px;top:2px;\">"
            +"<button type=\"button\" ng-class=\"{'active':params.count() == 10}\" ng-click=\"params.count(10)\" class=\"btn btn-default\">10 </button>"
            +"<button type=\"button\" ng-class=\"{'active':params.count() == 25}\" ng-click=\"params.count(25)\" class=\"btn btn-default\">25 </button>"
            +"<button type=\"button\" ng-class=\"{'active':params.count() == 50}\" ng-click=\"params.count(50)\" class=\"btn btn-default\">50 </button>"
            +"<button type=\"button\" ng-class=\"{'active':params.count() == 100}\" ng-click=\"params.count(100)\" class=\"btn btn-default\">100 </button>"+
            "</span>"

            +"</div>");
}]);
