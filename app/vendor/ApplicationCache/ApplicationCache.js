// 检查更新离线缓存清单
if(window.applicationCache){
    window.applicationCache.addEventListener('updateready', function(e) {
        if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
            applicationCache.swapCache();
            console.log("已更新至最新版本");
            if (confirm('已更新至最新版本， 确认重新载入页面')) {
                window.location.reload();
            }
        } else {
        }
    }, false);
    // 错误处理
    window.applicationCache.addEventListener('error', function(e) {
        // nothing to do
        return false;
    }, false);
}