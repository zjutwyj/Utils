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
.constant('HOST', 'example.com')
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
        $rootScope.closeAlert = function (index) {
            $rootScope.alerts.splice(index, 1);
        };
        // 提示信息
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
        $rootScope.jumpUrl = function (url, target){
            if (typeof target !== 'undefined' && target){
                open(url);
            } else{
                location.href = url;
            }
        }
        // ng跳转url
        $rootScope.locationUrl = function(url,page){
            $rootScope.search_key = '';
            $rootScope.current_page = page;
            $location.path(url);
        }
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
        $rootScope.modalInit = function($scope, $modalInstance, item){
            $scope.ok = function(){
                $modalInstance.close(item);
            }
            $scope.cancel = function(){
                $modalInstance.dismiss('cancel');
            }
        }
        $rootScope.search = function(search_key, url){
            var url = url || '/product_list';
            $rootScope.search_key = search_key;
            $location.path(url);
            $route.reload();
        }
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

        $rootScope.staticPage = function(){
            if ($rootScope.sessionuser.grade === '02'){
                $rootScope.edited = true;
                $rootScope.editNum += 1;
            }
        }
        $rootScope.static_page = function(page, item_id){
            $.ajax({
                url : '/views/static/page',
                type : 'post',
                async : true,
                data : JSON.stringify({"page" : page, "item_id": item_id}),
                success : function (){}
            });
        }
        $rootScope.static_part = function(){
            $.ajax({
                url: '/views/static/part',
                type: 'post',
                success: function(){ }
            });
            $rootScope.edited = false;
            $rootScope.editNum = 0;
            $rootScope.showMsg('正在静态化...', {time: 3000});
        }
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
