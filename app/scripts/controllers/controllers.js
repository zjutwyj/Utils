"use strict";
app.config(["$routeProvider", function (e) {
    e.when("/personal", {templateUrl: "modules/Account/views/personal.html"}).when("/entinfo", {templateUrl: "modules/Account/views/ent.html"}).when("/password", {templateUrl: "modules/Account/views/password.html"})
}]), app.controller("UserInfoCtrl", ["$scope", "$rootScope", function (e, n) {
    e.submit = function () {
        n.ajax({method: "PUT", url: "profile", data: n.sessionuser, success: function () {
            n.showMsg("修改成功!", {time: 500})
        }})
    }
}]), app.controller("WhMemberCtrl", ["$scope", "$http", "API_END_POINT", "$rootScope", function (e, n, t, r) {
    e.whmember = r.whmember, void 0 == e.whmember && n.get(t + "whmember").success(function (n) {
        if (void 0 == n) {
            var t = r.sessionuser, s = r.enterprise;
            n = {name: t.name, entname: s.name, phone: t.phone}
        }
        e.whmember = n
    }).error(function (n) {
        var t = r.sessionuser, s = r.enterprise;
        n = {name: t.name, entname: s.name, phone: t.phone}, e.whmember = n
    }), e.submitWhMember = function () {
        var s = e.whmember.member_id;
        void 0 == s ? n.post(t + "whmember", e.whmember).success(function (n) {
            r.showMsg("修改成功", {time: 500}), e.whmember.member_id = n.member_id
        }).error(function () {
        }) : n.put(t + "whmember", e.whmember).success(function () {
            r.showMsg("修改成功", {time: 500})
        }).error(function () {
        })
    }
}]), app.controller("passwordCtrl", ["$scope", "$rootScope", "$http", "API_END_POINT", function (e, n, t, r) {
    e.submitPassword = function () {
        return e.new_password1 != e.new_password2 ? void alert("两次密码输入不一样") : void t.put(r + "profile/password", {old_password: e.old_password, password: e.new_password1}).success(function () {
            n.open("修改成功!")
        }).error(function () {
            n.open("修改失败,原密码错误!")
        })
    }
}]), app.controller("EntInfoCtrl", ["$scope", "$http", "API_END_POINT", "$rootScope", function (e, n, t, r) {
    e.enterprise = r.enterprise;
    var s = [
        {name: "安全、防护"},
        {name: "办公、文教"},
        {name: "包装"},
        {name: "传媒、广电"},
        {name: "代理"},
        {name: "电工电器"},
        {name: "电子元器件"},
        {name: "二手设备转让"},
        {name: "纺织、皮革"},
        {name: "服饰"},
        {name: "服装"},
        {name: "化工"},
        {name: "环保"},
        {name: "机械及行业设备"},
        {name: "加工"},
        {name: "家居用品"},
        {name: "家用电器"},
        {name: "建筑、建材"},
        {name: "交通运输"},
        {name: "精细化学品"},
        {name: "库存积压"},
        {name: "礼品、工艺品、饰品"},
        {name: "能源"},
        {name: "农业"},
        {name: "汽摩及配件"},
        {name: "商务服务"},
        {name: "食品、饮料"},
        {name: "数码、电脑"},
        {name: "通信产品"},
        {name: "玩具"},
        {name: "五金、工具"},
        {name: "项目合作"},
        {name: "橡塑"},
        {name: "冶金矿产"},
        {name: "医药、保养"},
        {name: "仪器仪表"},
        {name: "印刷"},
        {name: "运动、休闲"},
        {name: "照明工业"},
        {name: "纸业"},
        {name: "原材料"},
        {name: "安防"},
        {name: "加工定制"},
        {name: "物流招聘"},
        {name: "展会广告"}
    ], o = [
        {name: "生产加工"},
        {name: "经营批发"},
        {name: "招商代理"},
        {name: "商业服务"},
        {name: "其它"}
    ], i = [
        {name: "个人用户"},
        {name: "企业单位"},
        {name: "个体经营"},
        {name: "事业单位或者团体"}
    ];
    e.industryOption = s, e.businessTypeOption = o, e.entTypeOption = i, e.industrySelect = "展会广告", void 0 == e.enterprise && n.get(t + "enterprise").success(function (n) {
        e.enterprise = n
    }).error(function () {
    }), e.tabs = [
        {title: "公司简介", content: "modules/Account/views/enterpriseinfo.html"},
        {title: "技术实力", content: "modules/Account/views/technic.html"},
        {title: "网络工商标识", content: "modules/Account/views/gsbs.html"}
    ], e.navType = "pills", e.openDateTimePick = function (n) {
        n.preventDefault(), n.stopPropagation(), e.opened = !0
    }, e.editorOptions = {language: "zh-cn"}, n.get(t + "ap").success(function (n) {
        e.technic = n
    }).error(function () {
    }), e.submitTechnic = function () {
        r.ajax({method: "PUT", url: "ap", data: e.technic, success: function () {
            r.open("修改成功")
        }})
    }, e.submitGsbs = function () {
        r.ajax({method: "PUT", url: "enterprise", data: e.enterprise, success: function () {
            r.enterprise = e.enterprise, r.open("修改成功")
        }})
    }, e.submitInfo = function () {
        r.ajax({method: "PUT", url: "enterprise", data: e.enterprise, success: function () {
            r.enterprise = e.enterprise, r.open("修改成功")
        }})
    }, e.submitEnt = function () {
        r.ajax({method: "PUT", url: "enterprise", data: e.enterprise, success: function () {
            r.enterprise = e.enterprise, r.open("修改成功")
        }})
    }, e.openFileDialog = function () {
        return r.openFileDialog(function (n) {
            e.enterprise.logo = n[0].server_path, r.enterprise.logo = n[0].server_path
        }), !1
    }
}]), app.config(["$routeProvider", function (e) {
    e.when("/login", {templateUrl: "modules/Account/views/login.html", controller: "LoginCtrl", title: "用户登录"})
}]), app.controller("LoginCtrl", ["$scope", "$rootScope", "$location", "$http", "API_END_POINT", function (e, n, t, r, s) {
    e.user = {username: "", password: ""}, n.isLogin && t.path("/"), e.submit = function () {
        r.post(s + "login", e.user).success(function () {
            t.path("/"), n.showMsg("登录成功！"), t.reload()
        }).error(function (e) {
            n.showMsg(e.err || "用户名或密码错误！", {type: "danger"})
        })
    }
}]), app.config(["$routeProvider", function (e) {
    e.when("/register", {templateUrl: "modules/Account/views/register.html"}).when("/register_pass", {templateUrl: "modules/Account/views/register_pass.html"}).when("/register_result", {templateUrl: "modules/Account/views/register_result.html"})
}]), app.controller("RegisterCtrl", ["$scope", "$rootScope", "$http", "$location", "$q", "API_END_POINT", function (e, n, t, r, s, o) {
    e.usernameRegisted = !1, e.emailRegisted = !1, e.cellphoneRegisted = !1, e.user = {email: ""}, e.checkUser = function () {
        t.post(o + "register?precheck=1", {username: e.user.username, password: "9999999999", email: "9999999999", cellphone: "9999999999"}).success(function () {
            e.usernameRegisted = !1
        }).error(function () {
            e.usernameRegisted = !0
        })
    }, e.checkEmail = function () {
        t.post(o + "register?precheck=1", {username: "9999999999", password: "9999999999", email: e.user.email, cellphone: "9999999999"}).success(function () {
            e.emailRegisted = !1
        }).error(function () {
            e.emailRegisted = !0
        })
    }, e.checkCellphone = function () {
        t.post(o + "register?precheck=1", {username: "9999999999", password: "9999999999", email: e.user.email, cellphone: "9999999999"}).success(function () {
            e.cellphoneRegisted = !1
        }).error(function () {
            e.cellphoneRegisted = !0
        })
    }, e.submit = function () {
        t.post(o + "register?precheck=1", {username: e.user.username, password: "9999999999", email: "9999999999", cellphone: "9999999999"}).success(function () {
            t.post(o + "register?precheck=1", {username: "9999999999", password: "9999999999", email: e.user.email, cellphone: "9999999999"}).success(function () {
                t.post(o + "register?precheck=1", {username: "9999999999", password: "9999999999", email: "9999999999", cellphone: e.user.cellphone}).success(function () {
                    n.done = !1, t.post(o + "register", e.user, {withCredentials: !0}).success(function () {
                        n.done = !0, n.showMsg("注册成功！"), n.register_email = e.user.email, r.path("/register_pass"), $(".form-horizontal").reset()
                    }).error(function (e) {
                        n.done = !0, n.showMsg(e.err || "illegal request", {type: "danger"})
                    })
                }).error(function () {
                    n.showMsg("手机号码已被注册！")
                })
            }).error(function () {
                n.showMsg("email已被注册！")
            })
        }).error(function () {
            n.showMsg("用户名已被注册")
        })
    }, e.toLogin = function () {
        r.path("/login")
    }, e.tomail = function (e) {
        var n = e.split("@")[1];
        window.open(-1 != n.indexOf("gmail") ? "http://mail.google.com" : -1 != n.indexOf("hotmail") || -1 != n.indexOf("msn") ? "http://mail.live.com" : "http://mail." + n)
    }, e.phoneNumberPattern = function () {
        var n = /^\d{3,4}-?\d{7,9}$/;
        return{test: function (t) {
            return e.requireTel === !1 ? !0 : n.test(t)
        }}
    }()
}]);