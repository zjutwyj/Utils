/**
 * @description ng-focus
 * @class directive - 指令集
 * @author yongjin on 2014/8/17
 */
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