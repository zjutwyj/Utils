/**
 * @description ng-format
 * @class directive - 指令集
 * @author yongjin on 2014/8/17
 */
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
