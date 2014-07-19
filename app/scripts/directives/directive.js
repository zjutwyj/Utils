/**
 * @description directive
 * @class directive - 指令集
 * @author yongjin on 2014/7/3
 */
/**
 * @description 时间选择器
 * @method [时间] - datetimepicker
 * @author wyj on 14/3/11
 * @example
 *      <input datetimepicker="" class="form-control" ng-model="enterprise.reg_time" type="text">
 **/
app.directive('datetimepicker', function() {
    return {
        restrict: 'A',
        require : 'ngModel',
        link : function (scope, element, attrs, ngModelCtrl) {
            element.datepicker({
                language : 'zh-CN',
                dateFormat:'dd-MM-yy',
                autoclose: true,
                todayHighlight: true,
                todayBtn: true,
                onSelect:function (date) {
                    scope.$apply(function () {
                        ngModelCtrl.$setViewValue(date);
                    });
                }
            });
        }
    }
});

/**
 * @description 图片等比例居中显示, data-width data-height 显示的长与宽，
 * data-fill 为false时， 图片居中显示
 * @method [图片] - imgcrop
 * @author wyj on 14/3/11
 * @example
 *      <img imgcrop data-width='80' data-height="80"  data-fill="true" ng-src="">
 **/
app.directive('imgcrop', function () {
    return {
        link: function(scope, element, attrs) {
            var fill = attrs.fill === 'true' ? true : false;
            var w = attrs.width, h = attrs.height;
            element.bind("load" , function(e){
                var _w = element[0].naturalWidth,
                    _h = element[0].naturalHeight;
                element.css(Est.imageCrop( _w, _h, w, h, fill));
            });
        }
    }
});

/**
 * @description 点击编辑
 * @method [编辑] - clickToEdit
 * @author wyj <zjut_wyj@163.com>
 * @example
 *      <div click-to-edit="location.state"></div>
 **/
app.directive("clickToEdit", function() {
    var editorTemplate = '<div class="click-to-edit">' +
        '<div ng-hide="view.editorEnabled">' +
        '{{value}} ' +
        '<a ng-click="enableEditor()">编辑</a>' +
        '</div>' +
        '<div ng-show="view.editorEnabled">' +
        '<input ng-model="view.editableValue">' +
        '<a ng-click="save()">保存</a>' +
        ' or ' +
        '<a ng-click="disableEditor()">取消</a>.' +
        '</div>' +
        '</div>';
    return {
        restrict: "A",
        replace: true,
        template: editorTemplate,
        scope: {
            value: "=clickToEdit"
        },
        controller: function($scope) {
            $scope.view = {
                editableValue: $scope.value,
                editorEnabled: false
            };
            $scope.enableEditor = function() {
                $scope.view.editorEnabled = true;
                $scope.view.editableValue = $scope.value;
            };
            $scope.disableEditor = function() {
                $scope.view.editorEnabled = false;
            };
            $scope.save = function() {
                $scope.value = $scope.view.editableValue;
                $scope.disableEditor();
            };
        }
    };
});
/**
 * @description flash
 * @method [Flash] - embedSrc
 * @author wyj on 14;5/21
 * @example
 *      <embed width="105" height="105" allowscriptaccess="always" wmode="transparent" embed-src="{{API_END_POINT}}{{pic.server_path}}" />
 */
app.directive('embedSrc', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var current = element;
            scope.$watch(function() { return attrs.embedSrc; }, function () {
                var clone = element.clone().attr('src', attrs.embedSrc);
                current.replaceWith(clone);
                current = clone;
            });
        }
    };
});



/**
 * @description 回车事件
 * @method [事件] - ngEnter
 * @author wyj on 14;5/21
 * @example
 *      <input  class="ui-pg-input" type="text" size="2" maxlength="7" ng-init="gotopage=1" tooltip="按回车跳转"  ng-model="gotopage" ng-enter="params.page(gotopage)" role="textbox">
 */
app.directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if(event.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter, {'event': event});
                });
                event.preventDefault();
            }
        });
    };
});
/**
 * @description 获取焦点
 * @method [事件] - focus
 * @author wyj on 14/7/10
 * @example
 *      <input type="button" focus >
 */
app.directive('focus', function(){
    return {
        link:function(scope, elements, attrs, controller){
            elements[0].focus();
        }
    }
});

/**
 * @description 格式化输入的内容 number 格式化数字 1200 => 1,200，
 * price 格式化价格 1200 => 1,200， phone 格式化固定电话 057512345678 => 0575-12345678
 * @method [格式化] - format
 * @author wyj on 14;5/21
 * @example
 *      <input ng-model="user.phone"  name="phone" format="phone" ng-required="requireTel"
 *          ng-pattern="phoneNumberPattern"  class="form-control"  id="phone"  placeholder="0571-12345678">
 */
app.directive('format', ['$filter', function ($filter) {
    return {
        require: '?ngModel',
        link: function (scope, elem, attrs, ctrl) {
            if (!ctrl) return;
            ctrl.$formatters.unshift(function (a) {
                return $filter('number')(ctrl.$modelValue)
            });
            ctrl.$parsers.unshift(function (viewValue) {
                switch(attrs.format){
                    case 'number' :
                        var number = viewValue.replace(/\D/g,'');
                        elem.val($filter('number')(number));
                        return number;
                        break;
                    case 'phone' :
                        var phone = viewValue.replace(/^(\d{3,4})-?(\d{7,9})$/g, '$1-$2');
                        elem.val(phone);
                        return phone;
                        break;
                    case 'price' :
                        var price = viewValue.replace(/[^\d|\-+|\.+]/g, '');
                        elem.val($filter('number')(price));
                        return price;
                        break;
                }
            });
        }
    };
}]);
/**
 * @description 复制到剪切板
 * @method [剪切] - clipboard
 * @author wyj on 14/7/10
 * @example
 *      <button id="copy-button" data-clipboard-text="Copy Me!" title="Click to copy me.">Copy to Clipboard</button>
 */
app.directive('clipboard', ['$rootScope',function($rootScope){
    return function(scope, element, attrs){
        var client = new ZeroClipboard( element, {
            moviePath: "vendor/zeroclipboard/ZeroClipboard.swf"
        } );
        client.on( "mousedown", function(client) {
            client.on( "complete", function(client, args) {
                if (scope.ok){
                    scope.ok();
                } else{
                    $rootScope.showMsg('复制成功');
                }
            } );
        } );
    }
}]);

/**
 * @description 显示加载中...
 * @method [加载] - loading
 * @author wyj on 14/7/12
 * @example
 *      <div loading>loading...</div>
 */
app.directive('loading', ['$rootScope', function($rootScope){
    return {
        link : function(scope, element, attrs){
            element.addClass('hide');
            $rootScope.$on('$routeChangeStart', function(){
                element.removeClass('hide');
            });
            $rootScope.$on('$routeChangeSuccess', function(){
                element.addClass('hide');
            });
        }
    }
}]);


/*app.directive('treeInclude', ['$window', function(){
    return {
        restrict: "AE",
        templateUrl: "cates_renderer_v2.html"
    }
}]);*/


/*

app.controller('ngTreeCtrl', ['$scope',function($scope){
    $scope.sortableElement = null;
    $scope.sortableModelValue = null;
    $scope.callbacks = null;
    $scope.items = [];
    $scope.initSortable = function(element) {
        $scope.sortableElement = element;
    };
    $scope.insertSortableItem = function(index, itemModelData) {
        $scope.sortableModelValue.splice(index, 0, itemModelData);
        $scope.$apply();
    };
    $scope.initSubItemElement = function(subElement) {
        subElement.parentScope = $scope;
    };
    $scope.parentItemScope = function() {
        return $scope.sortableElement.parentItemScope;
    };
    $scope.level = function() {
        var parentItem = $scope.parentItemScope();
        if (parentItem) {
            return parentItem.level() + 1;
        }
        return 1;
    };
}]);
app.controller('ngTreeItemCtrl', ['$scope', '$attrs', function($scope, $attrs){
    $scope.sortableItemElement = null;
    $scope.subSortableElement = null;

    $scope.initItem = function(element) {
        $scope.sortableItemElement = element;
        $scope.initSubItemElement(element);
        $scope.items.splice($scope.$index, 0, $scope);
        element.attr('sortable-elment-type', 'item');
    };
    var subLevel = 0;
    var countSubLevel = function(scope) {
        var count = 0;
        for (var i = 0; i < scope.items.length; i++) {
            var itemSub = scope.items[i].subScope();
            if (itemSub) {
                count = 1;
                countSubLevel(itemSub);
            }
        }
        subLevel += count;
    };
    $scope.setSubSortableElement = function(subElement){
        $scope.subSortableElement = subElement;
        if (subElement) {
            subElement.parentItemScope = $scope;
        }
    };

    $scope.parentScope = function() {
        return $scope.sortableItemElement.parentScope;
    };

    $scope.subScope = function() {
        if (!$scope.subSortableElement) {
            return null;
        }
        var subScope = $scope.subSortableElement.scope();
        if (subScope && !subScope.sortableModelValue) {
            // has no children data
            subScope = null;
        }
        return subScope;
    };

}]);
app.directive('ngTree', [, function(){
    return {
        require: ['ngModel', '?^ngTreeItem'],
        restrict: 'A',
        scope: true,
        controller: 'ngTreeCtrl',
        link: function(scope, element, attrs, controllersArr){
            var ngModel = controllersArr[0];
            var itemCtrl = controllersArr[1];
            scope.initSortable(element);
            if (itemCtrl) { // if it has a parent, link it with parent
                scope.setSubSortableElement(element);
            }
            if (ngModel) {
                ngModel.$render = function() {
                    scope.sortableModelValue = ngModel.$modelValue;
                };
            }
            scope.$watch(attrs.ngTree, function(newVal, oldVal){
                angular.forEach(newVal, function(value, key){
                    if (callbacks[key]) {
                        if (typeof value === "function") {
                            callbacks[key] = value;
                        }
                    }
                });
                scope.callbacks = callbacks;
            }, true);
            element.on('$destroy', function() {
                if (itemCtrl) { // if it was removed, unlink to parent
                    scope.setSubSortableElement(null);
                    element.parentItemScope = null;
                }
            });
        }
    }
}]);

app.directive('ngTreeItem', ['$window', function(){
    return {
        require: '^ngTree',
        restrict: 'A',
        controller: 'ngTreeItemCtrl',
        link: function(scope, element, attrs){
            scope.initItem(element);
        }
    }
}]);

*/


