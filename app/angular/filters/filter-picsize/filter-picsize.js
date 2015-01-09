/**
 * @description filter-picsize
 * @class filters - 过滤器
 * @author yongjin on 2014/8/17
 */
/**
 * @description 获取尺寸为3的图片， pic4 获取尺寸为4的图片， 以此类推
 * pic3 : 800*800; pic4 : 300*300; pic5 : 160*160; pic6 : 40*40; pic7 : 500*500; pic8 : 80*80
 * @method [图片] - pic3
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