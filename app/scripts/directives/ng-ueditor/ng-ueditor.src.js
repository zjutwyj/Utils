/**
 * @description angular-ui
 * @class directive - 指令集
 */
(function(angular, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['angular', 'ueditor'], function(angular) {
            return factory(angular);
        });
    } else {
        return factory(angular);
    }
}(angular || null, function(angular) {
    var app = angular.module('ngUeditor', []);
    var $defer, loaded = false;
    app.run(['$q', '$timeout', function($q, $timeout) {
        $defer = $q.defer();

        if (angular.isUndefined(UE)) {
            throw new Error('UE not found');
        }
        UE.disableAutoInline = true;
        function checkLoaded() {
            if (UE) {
                loaded = true;
                $defer.resolve();
            } else {
                checkLoaded();
            }
        }
        checkLoaded();
        $timeout(checkLoaded, 500);
    }])

    /**
     * @description 百度编辑器
     * @method [编辑器] - ueditor
     * @author wyj on 14/7/18
     * @example
     *      <textarea name="proddesc" id="productContent" ueditor  ng-model="product.proddesc"></textarea>
     */
    app.directive('ueditor', ['$timeout', '$q','$modal','$rootScope', function ($timeout, $q, $modal, $rootScope) {
        'use strict';
        return {
            restrict: 'AC',
            require: ['ngModel', '^?form'],
            scope: false,
            link: function (scope, element, attrs, ctrls) {
                var ngModel = ctrls[0];
                var form    = ctrls[1] || null;
                var EMPTY_HTML = '<p></p>',
                    isTextarea = element[0].tagName.toLowerCase() == 'textarea',
                    data = [],
                    isReady = false;
                if (!isTextarea) {
                    element.attr('contenteditable', true);
                }
                var onLoad = function () {
                    var id = attrs['id'];
                    try{
                        if (!$rootScope.ueContainer) $rootScope.ueContainer = {};
                        $rootScope.ueContainer[id] =UE.getEditor(id);
                    } catch(e){
                        console.error(e);
                    }
                    element.bind('$destroy', function () {
                        $rootScope.ueContainer[id].destroy();//移除编辑器
                    });
                    var setModelData = function(setPristine) {
                        var data = $rootScope.ueContainer[id].getContent();
                        if (data == EMPTY_HTML) {
                            data = null;
                        }
                        $timeout(function () { // for key up event
                            ngModel.$setViewValue(data);
                            (setPristine === true && form) && form.$setPristine();
                        }, 0);
                    }, onUpdateModelData = function(setPristine) {
                        if (!data.length) { return; }
                        var item = data.pop() || EMPTY_HTML;
                        isReady = false;
                        $rootScope.ueContainer[id].setContent(item);
                    }
                    $rootScope.ueContainer[id].addListener('contentChange',setModelData);
                    $rootScope.ueContainer[id].addListener('instanceReady',function(){
                        scope.$apply(function(){
                            onUpdateModelData(true);
                        });
                    });
                    $rootScope.ueContainer[id].addListener('customConfigLoaded', function() {
                        configLoaderDef.resolve();
                    });
                    $rootScope.ueContainer[id].addListener("openDialog", function(){
                        $rootScope.openFileDialog(function(select_list){
                            $rootScope.ueContainer[id].execCommand('insertHtml', "<img src='"+$rootScope.API_END_POINT+select_list[0].server_path+"'/>");
                        });
                        return false;
                    });
                    $rootScope.ueContainer[id].addListener("openFlashDialog", function(){
                        $rootScope.openFlashDialog(function(select_list){
                            var str = '',
                                src = $rootScope.API_END_POINT + select_list[0].server_path;
                            if(src.indexOf(".flv")>-1){
                                str = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0"  width="78" height="80">'+
                                    '<param name="movie" value="http://img.jihui88.com/vcastr22.swf?vcastr_file='+src+'&LogoText=&IsAutoPlay=0">'+
                                    '<param name="quality" value="high">'+
                                    '<param name="wmode" value="transparent" />'+
                                    '<param name="allowFullScreen" value="true" />'+
                                    '<embed src="http://img.jihui88.com/vcastr22.swf?vcastr_file='+src+'&LogoText=&IsAutoPlay=0" allowFullScreen="true" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="78" height="80"></embed>'+
                                    '</object>';
                            }
                            else{
                                str = "<embed width=\"78\" height=\"80\" allowscriptaccess=\"always\" wmode=\"transparent\" src=\""+src+"\">";
                            }
                            $rootScope.ueContainer[id].execCommand('insertHtml', str);
                        })
                        return false;
                    });
                    $rootScope.ueContainer[id].addListener("openQQDialog", function(){
                        var qqModelInstance = $modal.open({
                            templateUrl : 'modules/Tool/views/qq.html',
                            controller: ['$scope', '$modalInstance', 'obj', function ($scope, $modalInstance, obj) {
                                $rootScope.qqstr = "";
                                $rootScope.modalInit($scope, $modalInstance, $scope.qqstr);
                            }],
                            resolve : {
                               obj : function(){ return ""; }
                            }
                        });
                        qqModelInstance.result.then(function(str){
                            $rootScope.ueContainer[id].execCommand('insertHtml', $rootScope.qqstr);
                        });
                    });
                    $rootScope.ueContainer[id].addListener('openCodeDialog', function(){
                        var codeInstance = $modal.open({
                            templateUrl : 'modules/Tool/views/qrcode.html',
                            controller : ['$scope', '$modalInstance', 'obj', function($scope, $modalInstance, obj){
                                $scope.codestr = "";
                                $rootScope.modalInit($scope, $modalInstance, $scope.codestr);
                            }],
                            resolve : {
                                obj : function(){ return ""; }
                            }
                        });
                        codeInstance.result.then(function(str){
                            $rootScope.ueContainer[id].execCommand('insertHtml',$rootScope.codestr);
                        });
                    });
                    /*$rootScope.ueContainer[id].ready(function(){
                        this.setContent(element.val(0));
                        this.setHeight(320);
                    });*/

                    $timeout(function(){
                            $rootScope.ueContainer[id].setContent(element.val());
                            // 设置高度
                            $rootScope.ueContainer[id].setHeight(320);
                    },1500);
                    /*var safeApply = function(scope, fn) {
                        (scope.$$phase || scope.$root.$$phase) ? fn() : scope.$apply(fn);
                    }
                    var instanceReady = function(){
                        if(typeof(instance) != 'Object'){
                            safeApply(scope,function(){
                                onUpdateModelData(true);
                            });
                        }
                        else{
                            instanceReady();
                        }
                    }
                    $timeout(function(){
                       instanceReady();
                    },100);*/
                    ngModel.$render = function() {
                        if (ngModel.$viewValue === undefined) {
                            ngModel.$setViewValue(null);
                            ngModel.$viewValue = null;
                        }
                        data.push(ngModel.$viewValue);
                        if (isReady) {
                            onUpdateModelData();
                        }
                    };
                };
                if (UE) {
                    loaded = true;
                }
                if (loaded) {
                    onLoad();
                } else {
                    $defer.promise.then(onLoad);
                }
            }
        };
    }]);
    return app;
}));