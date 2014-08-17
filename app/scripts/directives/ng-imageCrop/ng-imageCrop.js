/**
 * @description ng-imgCrop
 * @class directive - 指令集
 * @author yongjin on 2014/8/17
 */
/**
 * @description 图片等比例居中显示, data-width data-height 显示的长与宽，
 * data-fill 为false时， 图片居中显示
 * @method [图片] - imageCrop
 * @author wyj on 14/3/11
 * @example
 *      <img imageCrop data-width='80' data-height="80"  data-fill="true" ng-src="">
 **/
app.directive('imageCrop', function () {
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