/**
 * @description 路由
 * @class route
 * @author yongjin<zjut_wyj@163.com> 2015/6/22
 */
if (app.getAppType && app.getAppType() === 'backbone' && typeof Backbone !== 'undefined') {
  var b_routes = { routes: { '': 'index'}, defaults: function () {
    //$(document.body).append("This route is not hanled.. you tried to access: " + other);
  } };
  Est.each(app.getRoutes(), function (value, key) {
    var fnName = key.replace(/\//g, '');
    b_routes.routes[key] = fnName;
    b_routes[fnName] = Est.inject(value, function (id, callback, pass) {
      var pass = true;
      app.emptyDialog();
      Est.each(App.getFilters('navigator'), Est.proxy(function (fn) {
        var result = fn.apply(this, ['#/' + key]);
        if (Est.typeOf(result) !== 'undefined' && !result) {
          return pass = false;
        }
      }, this));
      if (!pass) return false;
      return new Est.setArguments(arguments, pass);
    }, function (id, callback) {
      if (!arguments[arguments.length - 1]) {
        Utils.removeLoading();
        Utils.confirm({
          title: '请升级版本',
          content: '请升级您的版本， 前往查看所有版本 ?',
          success: function () {
            Backbone.history.navigate('index', true);
            window.open("http://www.jihui88.com/marketing_website.html");
          },
          cancel: function () {
            Backbone.history.navigate('index', true);
          }
        });
      }
    });
  });
}