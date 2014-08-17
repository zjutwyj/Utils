/**
 * @description ng-datetimepicker
 * @class directive - 指令集
 * @author yongjin on 2014/8/17
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