/**
 * @description ng-enter
 * @class directive - 指令集
 * @author yongjin on 2014/8/17
 */
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