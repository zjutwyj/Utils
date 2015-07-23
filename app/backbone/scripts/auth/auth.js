/**
 * @description 用户登录
 * @class auth
 * @author yongjin<zjut_wyj@163.com> 2015/7/9
 */
seajs.use(['UserModel', 'IndexCtrl'], function (UserModel, IndexCtrl) {
  Service.initUser(UserModel).done(function (result) {
    var router = Backbone.Router.extend(b_routes);
    new router();
    Backbone.history.start();
    new IndexCtrl();
  });
});