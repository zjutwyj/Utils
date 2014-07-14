/**
 * @description 过滤器
 * @class filters - 过滤器
 * @author yongjin on 2014/7/3
 */
/**
 * @description 产品、新闻等审核状态
 * @method [product] - state
 * @author wyj on 14;5/28
 * @example
 *      <td data-title="'State'">{{product.state | state}}</td>
 */
app.filter('state', function () {
    var stateFilter = function (input) {
        switch (input) {
            case '01':
                return '已发布';
            case '00':
                return '未发布';
            default:
                return '审核未通过';
        }
    };
    return stateFilter;
});
/**
 * @description 证书类型
 * @method [certificate] - certType
 * @author wyj on 14/7/14
 * @example
 *      <td data-title="'State'">{{cert.type | certType}}</td>
 */
app.filter('certType', function(){
    return function(input){
        switch (input){
            case '01':
                return '基本证书';
            case '02':
                return '一般证书';
            case '03':
                return '税务证书';
            case '04':
                return '荣誉证书';
            default :
                return '其它证书';
        }
    }
});
/**
 * @description 证书审核状态
 * @method [certificate] - certState
 * @author wyj on 14/7/14
 * @example
 *      <td data-title="'State'">{{cert.state | certState}}</td>
 */
app.filter('certState', function(){
    return function(input){
        switch (input){
            case '00':
                return '未审核';
            case '01':
                return '已审核';
            default :
                return '未审核';
        }
    }
});

/**
 * @description 字符串截取
 * @method [string] - characters
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
/**
 * @description 获取尺寸为3的图片， pic4 获取尺寸为4的图片， 以此类推
 * pic3 : 800*800; pic4 : 300*300; pic5 : 160*160; pic6 : 40*40; pic7 : 500*500; pic8 : 80*80
 * @method [image] - pic3
 * @author wyj on 14/7/9
 * @example
 *      <img imgcrop data-width='150' data-height="150" data-fill="true" ng-src="{{API_END_POINT}}{{pic.thumbnail_path | pic3}}" alt="{{pic.filename}}">
 */
app.filter('pic3', function(){
    return function(input){
        return Est.picUrl(input, 3);
    }
});
app.filter('pic4', function(){
    return function(input){
        return Est.picUrl(input, 4);
    }
});
app.filter('pic5', function(){
    return function(input){
        return Est.picUrl(input, 5);
    }
});
app.filter('pic6', function(){
    return function(input){
        return Est.picUrl(input, 6);
    }
});
app.filter('pic7', function(){
    return function(input){
        return Est.picUrl(input, 7);
    }
});
app.filter('pic8', function(){
    return function(input){
        return Est.picUrl(input, 8);
    }
});