/**
 * @description 工厂类， 提供数组接口
 * @class factory - 工厂类
 * @author yongjin on 2014/7/3
 */

/**
 * @description 登录
 * @method [帐户] - AccountFactory
 * @author wyj on 14/7/4
 * @example
 *      // 登录
 *      login : AccountFactory.login(user, params).then(function(data){
 *                  console.log('登录成功');
 *              }, function(){
 *                  console.log('登录失败');
 *              });
 *      // 退出登录
 *      logout : AccountFactory.logout().then(function(){
 *           console.log('logout success');
 *      }, function(){
 *          console.log('logout failed');
 *      });
 *      // 获取用户信息
 *      getUser : AccountFactory.getUser().then(function(data){
 *           console.log(data);
 *      }, function(){
 *          console.log('login failed');
 *      });
 *      // 保存用户信息
 *      saveUser : AccountFactory.saveUser(user).then(function(data){
 *          console.log('save success')
 *      }, function(){
 *          console.log('save failed');
 *      })
 *      // 获取公司信息
 *      getEnterprise: AccountFactory.getEnterprise().then(function(data){
 *          console.log(data);
 *      }, function(){
 *          console.log('get failed');
 *      });
 *      // 保存公司信息
 *      saveEnterprise: AccountFactory.saveEnterprise(enterprise).then(function(){
 *          console.log('save success');
 *      }, function(){
 *          console.log('save failed');
 *      });
 *      // 保存技术实力
 *      saveTechnic: AccountFactory.saveTechnic(enterprise).then(function(data){
 *          console.log(data);
 *      }, function(){
 *          console.log('save failed');
 *      })
 *      // 获取服务器状态  登录状态
 *      getState : AccountFactory.getState().then(function(data){
 *          console.log(data.isLogin);
 *      });
 *      // 保存修改密码
 *      savePassword: AccountFactory.savePassword(oldValue, newValue).then(function(data){
 *          console.log(data);
 *      })
 *      // 检查用户名是否已被注册
 *      checkUsername: AccountFactory.checkUsername(username).then(function(data){
 *              console.log('已被注册');
 *      }, function(){
 *              console.log('未被注册');
 *      })
 *      // 检查邮箱地址是否被注册
 *      checkEmail : AccountFactory.checkEmail(email).then(function(){
 *          console.log('已被注册');
 *      }, function(){
 *          console.log('未被注册');
 *      })
 *      // 检查手机号码是否被注册
 *      checkCellphone: AccountFactory.checkCellphone(phone).then(function(){
 *          console.log('已被注册');
 *      }, function(){
 *          console.log('未被注册');
 *      })
 *      // 提交注册表彰
 *      register: AccountFactory.register(user).then(function(data){
 *          console.log(data);
 *      }, function(){
 *          console.log('注册失败');
 *      })
 */
app.factory('AccountFactory', ['BaseFactory', function(BaseFactory){
    return {
        login: function (target, params) {
            return BaseFactory.save(target, 'login', {
                id: 'user_id'
            }, params);
        },
        logout: function(){
            return BaseFactory.save({}, 'logout');
        },
        getUser: function(){
            return BaseFactory.query('profile');
        },
        saveUser: function(target){
            return BaseFactory.save(target, 'profile');
        },
        getEnterprise: function(){
            return BaseFactory.query('enterprise');
        },
        saveEnterprise: function(target){
            return BaseFactory.save(target, 'enterprise');
        },
        saveTechnic: function(target){
            return BaseFactory.save(target, 'ap');
        },
        getState: function(){
            return BaseFactory.query();
        },
        savePassword: function(oldValue, newValue){
            return BaseFactory.save({ "ole_password": oldValue, "password": newValue });
        },
        checkUsername: function(username){
            return BaseFactory.save({username: username, password: "9999999999", email: "9999999999", cellphone: "9999999999"},'register?precheck=1');
        },
        checkEmail: function(email){
            return BaseFactory.save({username: "9999999999", password: "9999999999", email: email, cellphone: "9999999999"},'register?precheck=1');
        },
        checkCellphone: function(phone){
            return BaseFactory.save({username: "9999999999", password: "9999999999", email: "9999999999", cellphone: phone},'register?precheck=1');
        },
        register: function(target){
            return BaseFactory.save(target, 'register')
        }
    }
}]);
