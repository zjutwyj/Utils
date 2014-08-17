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
        var client = new ZeroClipboard( element, {
            moviePath: "swf/ZeroClipboard.swf"
        } );
        client.on( "mousedown", function(client) {
            client.on( "complete", function(client, args) {
                if (scope.ok){
                    scope.ok();
                } else{
                    $rootScope.showMsg('复制成功');
                }
            } );
        } );
    }
}]);