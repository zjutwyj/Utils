/**
 * @description ng-embedSrc
 * @class directive - 指令集
 * @author yongjin on 2014/8/17
 */
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