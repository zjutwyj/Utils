/**
 * @description filter-state
 * @class filters - 过滤器
 * @author yongjin on 2014/8/17
 */
/**
 * @description 产品、新闻等审核状态
 * @method [审核] - state
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
 * @method [证书] - certType
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
 * @method [证书] - certState
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