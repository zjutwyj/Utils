/**
 * @description filter-characters
 * @class filters - 过滤器
 * @author yongjin on 2014/8/17
 */
/**
 * @description 字符串截取
 * @method [字符] - characters
 * @author wyj on 14;5/21
 * @example
 *      <a ng-if="!product.$edit"  href="javascript:;" ng-click="product_view(product)" style="color:#333;">{{product.name | characters:25}}</a>
 */
app.filter('characters', function () {
    return function (input, chars, breakOnWord) {
        if (isNaN(chars)) return input;
        if (chars <= 0) return '';
        if (input && input.length > chars) {
            input = input.substring(0, chars);
            if (!breakOnWord) {
                var lastspace = input.lastIndexOf(' ');
                if (lastspace !== -1) {
                    input = input.substr(0, lastspace);
                }
            } else {
                while (input.charAt(input.length - 1) === ' ') {
                    input = input.substr(0, input.length - 1);
                }
            }
            return input + '...';
        }
        return input;
    };
});