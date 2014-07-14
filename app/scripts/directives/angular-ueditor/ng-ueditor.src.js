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
        $timeout(checkLoaded, 100);
    }])

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
                    var instance =UE.getEditor(attrs['id']);
                    element.bind('$destroy', function () {
                        UE.getEditor(attrs['id']).destroy();//移除编辑器
                    });
                    var setModelData = function(setPristine) {
                        var data = instance.getContent();
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
                        instance.setContent(item);
                    }
                    instance.addListener('contentChange',setModelData);
                    instance.addListener('instanceReady',function(){
                        scope.$apply(function(){
                            onUpdateModelData(true);
                        });
                    });
                    instance.addListener('customConfigLoaded', function() {
                        configLoaderDef.resolve();
                    });
                    var QQModelInit = function ($scope, $modalInstance, obj) {
                        $rootScope.qqstr = "";
                        $scope.ok = function () {
                            $modalInstance.close($rootScope.qqstr);
                        };
                        $scope.cancel = function () {
                            $modalInstance.dismiss('cancel');
                        };
                    }
                    var codeInit = function($scope,$modalInstance,obj){
                        $scope.codestr = "";
                        $scope.ok = function(str){
                            $modalInstance.close(str);
                        }
                        $scope.cancel = function(){
                            $modalInstance.dismiss('cancel');
                        }
                    }
                    instance.addListener("openDialog", function(){
                        $rootScope.openFileDialog(function(select_list){
                            instance.execCommand('insertHtml', "<img src='"+$rootScope.API_END_POINT+select_list[0].server_path+"'/>");
                        });
                        return false;
                    });
                    instance.addListener("openFlashDialog", function(){
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
                            instance.execCommand('insertHtml', str);
                        })
                        return false;
                    });
                    instance.addListener("openQQDialog", function(){
                        var qqModelInstance = $modal.open({
                            templateUrl : 'modules/Tool/views/qq.html',
                            controller: QQModelInit,
                            resolve : {
                               obj : function(){
                                   return "";
                               }
                            }
                        });
                        qqModelInstance.result.then(function(str){
                            instance.execCommand('insertHtml', str);
                        },function(){
                            //alert('openQQDialog');
                        });
                    });
                    instance.addListener('openCodeDialog', function(){
                        var codeInstance = $modal.open({
                            templateUrl : 'modules/Tool/views/qrcode.html',
                            controller : codeInit,
                            resolve : {
                                obj : function(){
                                    return "";
                                }
                            }
                        });
                        codeInstance.result.then(function(str){
                            instance.execCommand('insertHtml',str);
                        });
                    });
                    $timeout(function(){
                        instance.setContent(element.val());
                    },1000);
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