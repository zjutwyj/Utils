/**
 * @description api
 * @class api
 * @author yongjin<zjut_wyj@163.com> 2015/2/3
 */
function hash(str) {
  var hash = 5381,
    i = str.length

  while (i)
    hash = (hash * 33) ^ str.charCodeAt(--i)

  /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
   * integers. Since we want the results to be always positive, convert the
   * signed int to an unsigned by doing an unsigned bitshift. */
  return hash >>> 0;
}
App.query = function (query, options) {
  if (typeof options.session === 'undefined'){
    options.session = true;
  }
  if (options.session && !App.checkLogin()) return false;
  try {
    var params = '';
    if (options.data) {
      for (var key in options.data) {
        params += options.data[key];
      }
    }
    debug('【Query】:' + CONST.API + query + '?' + params);
    var cacheId = options.data ? ('_hash' + hash(query) + params) : '_hash' + hash(query);
    if (options.cache && App.getCache(cacheId)) {
      options.success && options.success.call(this, App.getCache(cacheId));
    } else {
      return $.ajax({
        type: 'get',
        url: CONST.API + query,
        data: options.data,
        success: function (result) {
          if (options.cache) App.addCache(cacheId, result);
          options.success && options.success.call(this, result);
          App.trigger('queryEvent', cacheId); // 触发事件
        }
      });
    }
  } catch (e) {
  }
}
App.del = function(url, options){
  $.ajax({
    type: 'post',
    url: CONST.API + url,
    data: options.data,
    success: function (result) {
      options.success && options.success.call(this, result);
    }
  });
}
