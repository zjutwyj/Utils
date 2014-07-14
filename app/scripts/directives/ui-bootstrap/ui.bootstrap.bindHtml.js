/**
 * @description ui.bootstrap.bindHtml
 * @class directive - 指令集
 * @author yongjin on 2014/7/13
 */
angular.module('ui.bootstrap.bindHtml', [])
    .directive('bindHtmlUnsafe', function () {
        return function (scope, element, attr) {
            element.addClass('ng-binding').data('$binding', attr.bindHtmlUnsafe);
            scope.$watch(attr.bindHtmlUnsafe, function bindHtmlUnsafeWatchAction(value) {
                element.html(value || '');
            });
        };
    });
