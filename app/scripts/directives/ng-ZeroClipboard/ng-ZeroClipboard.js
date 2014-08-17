/**
 * @description ng-ZeroClipboard
 * @class directive - 指令集
 * @author yongjin on 2014/8/17
 */
/**
 * @description 复制到剪切板
 * @method [剪切] - clipboard
 * @author wyj on 14/7/10
 * @example
 *      <button id="copy-button" data-clipboard-text="Copy Me!" title="Click to copy me.">Copy to Clipboard</button>
 */
app.directive('clipboard', ['$rootScope',function($rootScope){
    return function(scope, element, attrs){
        ZeroClipboard.config( { swfPath: "swf/ZeroClipboard.swf" } );
        var client = new ZeroClipboard( element, {
            moviePath: "swf/ZeroClipboard.swf"
        } );
        client.on( 'ready', function(event) {
            client.on( 'aftercopy', function(event) {
                if (scope.ok){
                    scope.ok();
                } else{
                    $rootScope.showMsg('复制成功');
                }
            } );
        } );
        client.on( 'error', function(event) {
            ZeroClipboard.destroy();
        } );
    }
}]);