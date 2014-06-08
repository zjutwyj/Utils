/**
 * @description zuizi
 * @namespace zuizi
 * @author yongjin on 2014/5/23
 */
"use strict";
var preSaleAppService = angular.module("preSale.services", ["ngResource"]),
    preSaleAppController = angular.module("preSale.controllers", []),
    preSaleAppDirective = angular.module("preSale.directives", []),
    preSaleAppTools = angular.module("preSale.tools", []),
    preSaleAppPlugins = angular.module("preSale.plugins", []),
    preSale = angular.module("preSale", ["ngAnimate", "ngRoute", "ngCookies", "preSale.filters", "preSale.services", "preSale.directives", "preSale.controllers", "preSale.tools", "preSale.plugins", "analytics"]);
preSale.config(["$routeProvider", "$httpProvider", "PagemapProvider",
    function(a, b, c) {
        b.defaults.headers.common = {},
            b.defaults.headers.post = {},
            b.defaults.headers.put = {},
            b.defaults.headers.patch = {};
        var d = c.template;
        a.when("/", {
            templateUrl: d.page.phone,
            controller: "PhoneCtrl",
            title: "选择规格"
        }),
            a.when("/phone", {
                templateUrl: d.page.phone,
                controller: "PhoneCtrl",
                title: "选择规格"
            }),
            a.when("/phone/:action", {
                templateUrl: d.page.phone,
                controller: "PhoneCtrl",
                title: "选择规格"
            }),
            a.when("/accessories/:orderID", {
                templateUrl: d.page.accessories,
                controller: "PhoneFittingCtrl",
                resolve: {
                    curOrder: ["$location", "$cookieStore", "$route",
                        function(a, b, c) {
                            var d = b.get(c.current.params.orderID) || {};
                            return d.id ? d: void a.path("/")
                        }]
                },
                userRequired: !0,
                title: "选择服务"
            }),
            a.when("/checkout/:orderID", {
                templateUrl: d.page.checkout,
                controller: "OrderCheckoutCtrl",
                resolve: {
                    addresses: ["DeliveryAddressService",
                        function(a) {
                            return a.getList()
                        }],
                    curOrder: ["$location", "$cookieStore", "$route", "OrderService",
                        function(a, b, c) {
                            var d = b.get(c.current.params.orderID) || {};
                            return d.id ? (d.isTempOrder = !0, d) : void a.path("/")
                        }]
                },
                userRequired: !0,
                title: "填写订单"
            }),
            a.when("/confirm/:orderID", {
                templateUrl: d.page.confirm,
                controller: "OrderConfirmCtrl",
                resolve: {
                    curOrder: ["$location", "OrderService", "$route",
                        function(a, b, c) {
                            return b.getCurOrder(c.current.params.orderID).then(function(b) {
                                    return b.distribution_status < 2 && b.status < 2 ? b: (a.path("/"), !1)
                                },
                                function() {
                                    return a.path("/"),
                                        !1
                                })
                        }]
                },
                userRequired: !0,
                title: "现在支付"
            }),
            a.when("/payment/:status", {
                templateUrl: d.page.payResult,
                controller: "PayResultCtrl",
                title: "支付结果"
            }),
            a.when("/order/list/", {
                templateUrl: d.page.orderList,
                controller: "OrderCtrl",
                resolve: {
                    addresses: ["DeliveryAddressService",
                        function(a) {
                            return a.getList()
                        }],
                    orders: ["OrderService",
                        function(a) {
                            return a.getList()
                        }]
                },
                userRequired: !0,
                title: "我的订单"
            }),
            a.when("/pay/:orderID/:type/:channel/:money/", {
                templateUrl: d.page.home,
                controller: "PayCtrl",
                resolve: {
                    payInfo: ["$route",
                        function(a) {
                            return {
                                order_id: a.current.params.orderID,
                                pay_type: a.current.params.type,
                                pay_channel_type: a.current.params.channel,
                                pay_money: a.current.params.money
                            }
                        }]
                },
                title: "订单支付"
            }),
            a.when("/faq/:category/:detail", {
                templateUrl: "partials/faq.html",
                controller: "FaqCtrl",
                title: "FAQ"
            }),
            a.when("/error/500", {
                templateUrl: d.page.error500,
                controller: "ServiceStatusCtrl",
                title: "服务器错误"
            }),
            a.when("/error/404", {
                templateUrl: d.page.error404,
                controller: "ServiceStatusCtrl",
                title: "未找到页面"
            }),
            a.otherwise({
                redirectTo: "/error/404"
            })
    }]).run(["$document", "$rootScope", "$location", "$route", "UserService", "ToolDate",
    function(a, b, c, d, e) {
        b.$on("$routeChangeStart",
            function(a, d) {
                if (b.flagInit) {
                    var f = d.$$route && d.$$route.userRequired;
                    f && !e.logined && c.path("/")
                }
            }),
            b.$on("$routeChangeSuccess",
                function() {
                    a.scrollTop(0),
                        b.title = d.current.title
                })
    }]),
    angular.module("preSale.filters", []).filter("interpolate", ["version",
        function(a) {
            return function(b) {
                return String(b).replace(/\%VERSION\%/gm, a)
            }
        }]).filter("dateNum", [function() {
        return function(a) {
            new Date(1e3 * a);
            return a
        }
    }]).filter("realTime", ["ToolDate",
        function(a) {
            return function(b) {
                var c = b ? b: "",
                    d = a.realtime(c);
                return d
            }
        }]).filter("remainingTime", ["ToolDate",
        function(a) {
            return function(b) {
                var c = b ? b: "",
                    d = a.remainingtime(c);
                return d
            }
        }]).filter("rmb",
        function() {
            return function(a, b) {
                var c = a + "",
                    d = c,
                    e = "";
                if (c.match(/[^\d\.]/)) return a;
                c.match(/\./) && (d = c.replace(/\..*$/gi, ""), e = c.replace(/^[^\.]+\.?/gi, ""));
                for (var f = d.split("").reverse(), g = [], h = 0; h < f.length; h++) h % 3 == 0 && g.push(","),
                    g.push(f[h]);
                var i = "￥" + g.reverse().join("").replace(/\,$/gi, "");
                return b && (i = i + "." + ("" == e ? "00": e)),
                    i
            }
        }).filter("deliveryTime",
        function() {
            return function(a) {
                var b = "我们将在 2014 年 " + a + " 月" + (a > 9 ? "后": "开始") + "陆续发货";
                return b
            }
        }).filter("payStatus",
        function() {
            return function(a) {
                var b = "未支付";
                return 1 == a && (b = "已支付"),
                    b
            }
        }).filter("codeTelephone",
        function() {
            return function(a) {
                var b = "";
                return a && (a = "" + a, b = a.replace(/^(\d{3})\d{5}/g,
                    function(a, b) {
                        return b + "*****"
                    })),
                    b
            }
        }).filter("codeEmail",
        function() {
            return function(a) {
                var b = "";
                return a && (a = "" + a, b = a.replace(/^([\S]{2})([^@]+)\@([^\.]+)\.([^\.]+)$/g,
                    function(a, b, c, d, e) {
                        return b + "***@***." + e
                    })),
                    b
            }
        }).filter("emailLocation", ["MainConfig",
            function(a) {
                return function(b) {
                    var c = "";
                    return b && (b = "" + b, c = b.replace(/^.+\@/g, ""), c = a.mailUrl[c] ? a.mailUrl[c] : "http://mail." + c),
                        c
                }
            }]).filter("remainTime",
        function() {
            return function(a, b) {
                var c = "";
                if (a = "" + a, a.match(/^\d+$/)) switch (b) {
                    case "number":
                        return Math.floor(a / 1e3);
                    default:
                        return new date(a)
                }
                return c
            }
        }),
    preSaleAppTools.factory("ToolGetTemplate", ["$q", "$http", "$templateCache",
        function(a, b, c) {
            return function(d) {
                if (!d.template && !d.templateUrl) throw new Error("dose not has template or templateUrl");
                return d.template ? a.when(d.template) : b.get(d.templateUrl, {
                    cache: c
                }).then(function(a) {
                    return a.data
                })
            }
        }]).factory("ToolStackedMap", [function() {
        return {
            createMap: function() {
                var a = [];
                return {
                    add: function(b, c) {
                        a.push({
                            key: b,
                            value: c
                        })
                    },
                    get: function(b) {
                        for (var c = 0; c < a.length; c++) if (b == a[c].key) return a[c]
                    },
                    keys: function() {
                        for (var b = [], c = 0; c < a.length; c++) b.push(a[c].key);
                        return b
                    },
                    top: function() {
                        return a[a.length - 1]
                    },
                    remove: function(b) {
                        for (var c = -1, d = 0; d < a.length; d++) if (b == a[d].key) {
                            c = d;
                            break
                        }
                        return a.splice(c, 1)[0]
                    },
                    removeTop: function() {
                        return a.splice(a.length - 1, 1)[0]
                    },
                    moveTop: function(b) {
                        for (var c, d = -1, e = 0; e < a.length; e++) if (b == a[e].key) {
                            d = e,
                                c = a[e];
                            break
                        }
                        return a.splice(d, 1),
                            a.push(c),
                            a[a.length - 1]
                    },
                    length: function() {
                        return a.length
                    }
                }
            }
        }
    }]).factory("ToolArray", [function() {
        return {
            isHave: function(a, b, c) {
                var d = !1;
                return void 0 != c && jQuery.each(a,
                    function(a, e) {
                        return e[c] && e[c] == b ? (d = !0, !1) : void 0
                    }),
                    d
            },
            remove: function(a, b, c) {
                var d = !1,
                    e = 0;
                return void 0 != c && (jQuery.each(a,
                    function(a, f) {
                        return f[c] && f[c] == b ? (d = !0, e = a, !1) : void 0
                    }), d) ? a.splice(e, 1)[0] : null
            },
            getArrayBykey: function(a, b, c) {
                var d = "";
                return $.each(a,
                    function(a, e) {
                        return e[c] && e[c] == b ? (d = e, !1) : void 0
                    }),
                    d
            }
        }
    }]).factory("ToolDate", [function() {
        var a = {
            extendDate: function(a) {
                var a = $.extend({
                        days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                        daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                        daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
                        months: ["1 月", "2 月", "3 月", "4 月", "5 月", "6 月", "7 月", "8 月", "9 月", "10 月", "11 月", "12 月"],
                        monthsShort: ["1 月", "2 月", "3 月", "4 月", "5 月", "6 月", "7 月", "8 月", "9 月", "10 月", "11 月", "12 月"],
                        weekMin: "wk"
                    },
                    a);
                Date.prototype.tempDate || (Date.prototype.tempDate = null, Date.prototype.months = a.months, Date.prototype.monthsShort = a.monthsShort, Date.prototype.days = a.days, Date.prototype.daysShort = a.daysShort, Date.prototype.getMonthName = function(a) {
                    return this[a ? "months": "monthsShort"][this.getMonth()]
                },
                    Date.prototype.getDayName = function(a) {
                        return this[a ? "days": "daysShort"][this.getDay()]
                    },
                    Date.prototype.addDays = function(a) {
                        this.setDate(this.getDate() + a),
                            this.tempDate = this.getDate()
                    },
                    Date.prototype.addMonths = function(a) {
                        null == this.tempDate && (this.tempDate = this.getDate()),
                            this.setDate(1),
                            this.setMonth(this.getMonth() + a),
                            this.setDate(Math.min(this.tempDate, this.getMaxDays()))
                    },
                    Date.prototype.addYears = function(a) {
                        null == this.tempDate && (this.tempDate = this.getDate()),
                            this.setDate(1),
                            this.setFullYear(this.getFullYear() + a),
                            this.setDate(Math.min(this.tempDate, this.getMaxDays()))
                    },
                    Date.prototype.getMaxDays = function() {
                        var a,
                            b = new Date(Date.parse(this)),
                            c = 28;
                        for (a = b.getMonth(), c = 28; b.getMonth() == a;) c++,
                            b.setDate(c);
                        return c - 1
                    },
                    Date.prototype.getFirstDay = function() {
                        var a = new Date(Date.parse(this));
                        return a.setDate(1),
                            a.getDay()
                    },
                    Date.prototype.getWeekNumber = function() {
                        var a = new Date(this);
                        a.setDate(a.getDate() - (a.getDay() + 6) % 7 + 3);
                        var b = a.valueOf();
                        return a.setMonth(0),
                            a.setDate(4),
                            Math.round((b - a.valueOf()) / 6048e5) + 1
                    },
                    Date.prototype.getDayOfYear = function() {
                        var a = new Date(this.getFullYear(), this.getMonth(), this.getDate(), 0, 0, 0),
                            b = new Date(this.getFullYear(), 0, 0, 0, 0, 0),
                            c = a - b;
                        return Math.floor(c / 24 * 60 * 60 * 1e3)
                    })
            },
            formatDate: function(a, b) {
                var c = a.getMonth(),
                    d = a.getDate(),
                    e = a.getFullYear(),
                    f = (a.getWeekNumber(), a.getDay()),
                    g = a.getHours(),
                    h = g >= 12,
                    i = h ? g - 12: g,
                    j = a.getDayOfYear();
                0 == i && (i = 12);
                for (var k, l = a.getMinutes(), m = a.getSeconds(), n = b.split(""), o = 0; o < n.length; o++) {
                    switch (k = n[o], n[o]) {
                        case "a":
                            k = a.getDayName();
                            break;
                        case "A":
                            k = a.getDayName(!0);
                            break;
                        case "b":
                            k = a.getMonthName();
                            break;
                        case "B":
                            k = a.getMonthName(!0);
                            break;
                        case "C":
                            k = 1 + Math.floor(e / 100);
                            break;
                        case "d":
                            k = 10 > d ? "0" + d: d;
                            break;
                        case "e":
                            k = d;
                            break;
                        case "H":
                            k = 10 > g ? "0" + g: g;
                            break;
                        case "I":
                            k = 10 > i ? "0" + i: i;
                            break;
                        case "j":
                            k = 100 > j ? 10 > j ? "00" + j: "0" + j: j;
                            break;
                        case "k":
                            k = g;
                            break;
                        case "l":
                            k = i;
                            break;
                        case "m":
                            k = 9 > c ? "0" + (1 + c) : 1 + c;
                            break;
                        case "M":
                            k = 10 > l ? "0" + l: l;
                            break;
                        case "p":
                        case "P":
                            k = h ? "PM": "AM";
                            break;
                        case "s":
                            k = Math.floor(a.getTime() / 1e3);
                            break;
                        case "S":
                            k = 10 > m ? "0" + m: m;
                            break;
                        case "u":
                            k = f + 1;
                            break;
                        case "w":
                            k = f;
                            break;
                        case "y":
                            k = ("" + e).substr(2, 2);
                            break;
                        case "Y":
                            k = e
                    }
                    n[o] = k
                }
                return n.join("")
            },
            agotime: function(a) {
                var b = this,
                    c = 1e3 * Date.parse(new Date),
                    d = new Date,
                    e = b.formatDate(d, "Ymd"),
                    f = a,
                    g = new Date(f),
                    h = b.formatDate(g, "Ymd"),
                    i = new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1),
                    j = (Date.parse(i), b.formatDate(i, "Ymd")),
                    k = c - f,
                    l = g.getHours() < 10 ? "0" + g.getHours() : g.getHours(),
                    m = g.getMinutes() < 10 ? "0" + g.getMinutes() : g.getMinutes(),
                    n = g.getDate() < 10 ? "0" + g.getDate() : g.getDate();
                return 0 >= k ? "刚刚": 6e4 > k ? Math.floor(k / 1e3) + " 秒之前": 36e5 > k ? Math.floor(k / 6e4) + " 分钟之前": e == h ? "今天 " + l + ":" + m: j == h ? "昨天 " + l + ":" + m: d.getFullYear() == g.getFullYear() ? g.getMonthName() + n + "日 " + l + ":" + m: g.getFullYear() + "年" + g.getMonthName() + g.getDate() + "日"
            },
            realtime: function(a) {
                var b = Math.floor(a / 24 / 60 / 60),
                    c = a - 24 * b * 60 * 60,
                    d = Math.floor(c / 60 / 60),
                    e = c - 60 * d * 60,
                    f = Math.floor(e / 60),
                    g = e - 60 * f,
                    h = b > 0 ? " " + b + " 天": "",
                    i = d > 0 || b > 0 ? " " + d + " 小时": "",
                    j = f > 0 || b > 0 || d > 0 ? " " + f + " 分钟": "",
                    k = " " + g + " 秒";
                return h + i + j + k
            },
            remainingtime: function(a) {
                var b = this,
                    c = Math.floor(Date.parse(new Date) / 1e3),
                    d = a,
                    e = Math.abs(c - d);
                return b.realtime(e)
            }
        };
        return a.extendDate(),
            a
    }]).factory("CustomerService", [function() {
        return {
            open: function() {
                var a = decodeURIComponent(arguments[0] || "http://chat10.live800.com/live800/chatClient/chatbox.jsp?companyID=376704&configID=185120&jid=4594069570"),
                    b = arguments[1] || "_blank",
                    c = arguments[2] || 800,
                    d = arguments[3] || 600,
                    e = "directories=no, titlebar=no, toolbar=no, location=no, status=no, menubar=no, scrollbars=no, resizable=no, top=200, left=200, width= " + c + ", height=" + d,
                    f = arguments[4] || !0;
                window.open(a, b, e, f)
            }
        }
    }]),
    preSaleAppPlugins.constant("PluginAnimate", {
        dialogCurover: function(a) {
            Modernizr.opacity ? (a.targetPanel.css("opacity", "0").show({
                duration: 500,
                easing: "easeOutQuart"
            }).animate({
                    opacity: "1"
                },
                300), a.dialog.find(".animate-layer").animate({
                    height: a.conHeight + "px"
                },
                {
                    duration: 500,
                    easing: "easeOutQuart"
                }), a.dialog.animate({
                    "margin-top": "-" + a.dialogTop + "px"
                },
                {
                    duration: 500,
                    easing: "easeOutQuart"
                })) : (a.dialog.find(".animate-layer").css({
                height: a.conHeight + "px"
            }), a.dialog.css({
                "margin-top": "-" + a.dialogTop + "px"
            }), a.targetPanel.show())
        },
        openUpdatePanel: function(a) {
            var b = a.closest(".sub-title"),
                c = a.closest(".order-info-wrapper"),
                d = b.next(".order-animate-box"),
                e = d.find(".sub-info"),
                f = d.find(".order-update-form"),
                g = 0,
                h = d.height(),
                i = "invoiceForm" == d.attr("ng-Form") ? !0: !1;
            d.data("height", h),
                a.hide(),
                g = i ? c.find(".js-address-update-panel").is(":hidden") ? c.innerHeight() + 83: c.innerHeight() : c.find(".js-invoice-update-panel").is(":hidden") ? c.innerHeight() + 195: c.innerHeight() + 112,
                Modernizr.opacity ? (c.animate({
                        height: g
                    },
                    {
                        duration: 500,
                        easing: "easeOutQuart"
                    }), e.animate({
                        opacity: 0
                    },
                    {
                        duration: 500,
                        easing: "easeOutQuart",
                        complete: function() {
                            e.hide()
                        }
                    }), d.animate({
                        height: f.innerHeight() + 2
                    },
                    {
                        duration: 500,
                        easing: "easeOutQuart",
                        complete: function() {
                            f.css({
                                opacity: 0
                            }).show().animate({
                                    opacity: 1
                                },
                                {
                                    duration: 500,
                                    easing: "easeOutQuart"
                                })
                        }
                    })) : (c.height(g), e.hide(), d.height(f.innerHeight() + 2), f.show())
        },
        closeUpdatePanel: function(a) {
            var b = a.closest(".order-animate-box"),
                c = a.closest(".order-info-wrapper"),
                d = b.prev(".sub-title"),
                e = d.find(".small-gray-btn"),
                f = b.find(".sub-info"),
                g = b.find(".order-update-form"),
                h = 0,
                i = b.data("height"),
                j = "invoiceForm" == b.attr("ng-Form") ? !0: !1;
            h = j ? c.find(".js-address-update-panel").is(":hidden") ? c.innerHeight() - 83: c.innerHeight() : c.find(".js-invoice-update-panel").is(":hidden") ? c.innerHeight() - 195: c.innerHeight() - 112,
                g.find(".module-form-item-wrapper").trigger("clearError"),
                Modernizr.opacity ? (c.animate({
                        height: h
                    },
                    {
                        duration: 500,
                        easing: "easeOutQuart"
                    }), g.hide().css("opacity", 0), b.animate({
                        height: i
                    },
                    {
                        duration: 500,
                        easing: "easeOutQuart",
                        complete: function() {
                            f.show().animate({
                                    opacity: 1
                                },
                                {
                                    duration: 300,
                                    easing: "easeOutQuart"
                                })
                        }
                    })) : (c.height(h), g.hide(), b.height(i), f.show()),
                e.show()
        }
    }).directive("draggable",
        function(a) {
            var b = 0,
                c = 0,
                d = 0,
                e = 0;
            return function(f, g) {
                function h(a) {
                    a.preventDefault(),
                        d = a.pageX - b,
                        e = a.pageY - c,
                        j.css({
                            top: e + "px",
                            left: d + "px"
                        })
                }
                function i() {
                    a.unbind("mousemove", h),
                        a.unbind("mouseup", i)
                }
                var j = g;
                g.bind("mousedown",
                    function(f) {
                        f.preventDefault(),
                            b = f.pageX - d,
                            c = f.pageY - e,
                            a.bind("mousemove", h),
                            a.bind("mouseup", i)
                    })
            }
        }).directive("dialogWindow", ["$rootScope", "$document", "$timeout", "Pagemap",
            function(a, b, c, d) {
                return {
                    restrict: "A",
                    templateUrl: d.dialog.layout,
                    replace: !0,
                    link: function() {}
                }
            }]).factory("PluginDialog", ["$rootScope", "$compile", "$timeout", "$document", "ToolGetTemplate", "ToolStackedMap", "Pagemap", "MainConfig",
            function(a, b, c, d, e, f, g) {
                var h = {
                        isLayer: !0,
                        isCenter: !1,
                        title: "标题",
                        dialogClass: "",
                        messageClass: "",
                        doneText: "确定",
                        cancelText: "取消",
                        templateUrl: "",
                        hasBtn: !0,
                        hasCancel: !0,
                        autoReset: !1,
                        params: {},
                        openFun: null,
                        closeFun: null
                    },
                    i = f.createMap(),
                    j = angular.element("body"),
                    k = angular.element('<div class="module-dialog-layer"></div>');
                j.append(k),
                    k.on("click",
                        function() {
                            d.find(".module-dialog .dialog-close").trigger("click")
                        });
                var l = {
                    showList: [],
                    create: function(c) {
                        var d = this,
                            e = angular.extend({},
                                h, c),
                            f = (e.scope || a).$new();
                        f.config = e,
                            f.config.__index = i.length(),
                            f.config = angular.extend(f.config, e.params);
                        var g = angular.element("<div dialog-window></div>");
                        e.controller && g.attr("ng-controller", e.controller);
                        var k = b(g)(f);
                        j.append(k),
                            i.add(e.mark, {
                                option: e,
                                dom: k,
                                scope: f,
                                isShow: !1
                            });
                        var l = i.top(),
                            m = f.defHideDialog;
                        f.defHideDialog = function() {
                            angular.isFunction(m) ? m() : n.hide(l)
                        },
                            f.hideDialog = function() {
                                n.hide(l)
                            },
                            f.closeDialog = function() {
                                n.close(l)
                            };
                        var n = {
                            dialog: l,
                            setScope: function(a) {
                                var b = void 0 === a(l.value.scope) ? {}: a(l.value.scope);
                                return d._setScope(l, b),
                                    this
                            },
                            positionCenter: function() {
                                return d._positionCenter(l),
                                    this
                            },
                            show: function(a, b) {
                                angular.isFunction(e.openFun) && e.openFun(f, a, b),
                                    d._show(l)
                            },
                            hide: function(a) {
                                angular.isFunction(e.closeFun) && e.closeFun(f, a),
                                    d._hide(l)
                            },
                            close: function(a) {
                                angular.isFunction(e.closeFun) && e.closeFun(f, a),
                                    d._close(l)
                            },
                            remove: function(a) {
                                angular.isFunction(e.closeFun) && e.closeFun(f, a),
                                    d._remove(l)
                            },
                            doAction: function(a) {
                                return angular.isFunction(a) && a(f, l.value.dom),
                                    this
                            }
                        };
                        return n
                    },
                    _setScope: function(a, b) {
                        angular.extend(a.value.scope, b)
                    },
                    _positionCenter: function(a) {
                        var b = a.value.dom,
                            c = b.width(),
                            d = b.height();
                        b.css({
                            position: "fixed",
                            top: "50%",
                            left: "50%",
                            margin: "-" + d / 2 + "px 0 0 -" + c / 2 + "px"
                        })
                    },
                    _show: function(a) {
                        var b = this,
                            d = a.value.dom;
                        a.value.isShow || (a.value.isShow = !0, b.showList.push(a), c(function() {
                            a.value.isCenter && b._positionCenter(a),
                                a.value.option.isLayer && k.show(),
                                d.show(),
                                Modernizr.opacity && (a.value.option.isLayer && k.css("opacity", 0).animate({
                                    opacity: "0.618"
                                },
                                200), d.css("opacity", 0).animate({
                                    opacity: 1
                                },
                                200)),
                                d.find("input:visible").first().focus()
                        }))
                    },
                    _hide: function(a, c) {
                        var d = this,
                            e = a.value.dom;
                        a.value.isShow && (d.showList.pop(), !d.showList.length && k.hide(), Modernizr.opacity ? e.animate({
                                opacity: "0"
                            },
                            200).hide(0,
                            function() {
                                a.value.isShow = !1,
                                    $(this).removeClass("fadeOutUp"),
                                    a.value.option.autoReset && b(a.value.dom)(a.value.scope),
                                    angular.isFunction(c) && c()
                            }) : (e.hide(), a.value.isShow = !1, a.value.option.autoReset && b(a.value.dom)(a.value.scope), angular.isFunction(c) && c()))
                    },
                    _close: function(a) {
                        var b = this;
                        b._hide(a,
                            function() {
                                a.value.dom.remove(),
                                    a.value.scope.$destroy(),
                                    i.remove(a.key)
                            })
                    },
                    _remove: function(a) {
                        var b = this;
                        a.value.isShow ? b._close(a) : (a.value.dom.remove(), a.value.scope.$destroy(), i.remove(a.key))
                    },
                    confirm: function(b) {
                        var e = this,
                            f = angular.extend({},
                                h, {
                                    message: "",
                                    title: "提示"
                                },
                                b, {
                                    mark: "dialogDefaultConfirm",
                                    templateUrl: g.dialog.message,
                                    dialogClass: "module-dialog-confirm",
                                    params: {
                                        __index: 1001,
                                        notWarning: b.notWarning
                                    }
                                }),
                            i = (f.scope || a).$new();
                        i.message = f.message,
                            f.dialogClass = f.dialogClass + " " + f.messageClass,
                            i.dialogDoneFn = function() {
                                angular.isFunction(f.ok) && f.ok(k)
                            };
                        var j = function() {
                            angular.isFunction(f.cancel) && f.cancel(),
                                k.close()
                        };
                        i.dialogCancelFn = j,
                            i.defHideDialog = j,
                            f.scope = i;
                        var k = e.create(f);
                        return c(function() {
                            d.find(".module-dialog:visible").find(".dialog-close").click(),
                                k.show()
                        }),
                            k
                    },
                    message: function(b) {
                        var e = this,
                            f = angular.extend({},
                                h, {
                                    message: "",
                                    title: "提示"
                                },
                                b, {
                                    mark: "dialogDefaultMessage",
                                    templateUrl: g.dialog.message,
                                    dialogClass: "module-dialog-confirm",
                                    hasCancel: !1,
                                    params: {
                                        __index: 1002
                                    }
                                }),
                            i = (f.scope || a).$new();
                        i.message = f.message,
                            f.dialogClass = f.dialogClass + " " + f.messageClass,
                            i.dialogDoneFn = function() {
                                angular.isFunction(f.ok) ? f.ok(j) : j.close()
                            },
                            i.dialogCancelFn = i.dialogDoneFn,
                            i.defHideDialog = i.dialogDoneFn,
                            f.scope = i;
                        var j = e.create(f);
                        return c(function() {
                            d.find(".module-dialog:visible").find(".dialog-close").click(),
                                j.show()
                        }),
                            j
                    }
                };
                return d.on("keydown",
                    function(a) {
                        if (l.showList.length) {
                            var b = l.showList[l.showList.length - 1];
                            if (27 == a.which) b.value.scope.defHideDialog();
                            else if (13 != a.which || "dialogDefaultMessage" != b.value.option.mark && "dialogDefaultConfirm" != b.value.option.mark) {
                                if (8 == a.which && 0 == $("input:focus").length) return ! 1
                            } else b.value.scope.dialogDoneFn()
                        }
                    }).on("mousewheel",
                    function() {
                        return l.showList.length ? !1: void 0
                    }),
                    l
            }]).factory("PluginScrollbar", [function() {
            var a = {
                    frame: null,
                    wrapper: null,
                    container: null,
                    scrollbar: null,
                    block: null,
                    wrapperHeight: null,
                    containerHeight: null,
                    scrollbarRevise: null
                },
                b = {
                    init: function(b) {
                        var c,
                            d = angular.extend({},
                                a, b),
                            e = d.frame,
                            f = d.wrapper,
                            g = d.container,
                            h = d.scrollbar,
                            i = d.block,
                            j = Math.floor(d.wrapperHeight) || 0,
                            k = Math.floor(d.containerHeight) || 0,
                            l = Math.floor(d.scrollbarRevise) || 0,
                            m = j - l,
                            n = 0,
                            o = 0,
                            p = 30,
                            q = 1;
                        "static" == f.css("position") && f.css("position", "relative"),
                            "static" == g.css("position") && g.css("position", "absolute"),
                            (c = e.data("hamster")) || (c = Hamster(e[0]), e.data("hamster", c)),
                            c.wheel(function(a) {
                                r.move(a.deltaY < 0 ? p: -p)
                            }),
                            i.on("mousedown",
                                function(a) {
                                    a.preventDefault();
                                    var b = i.position().top,
                                        c = a.pageY,
                                        d = 0;
                                    $(document).on("mousemove",
                                        function(a) {
                                            a.preventDefault(),
                                                d = Math.floor(b + a.pageY) - c,
                                                d = d >= 0 ? d >= o ? o: d: 0,
                                                i.css("top", d),
                                                n = d / j * k,
                                                g.css("top", -n)
                                        }).on("mouseup",
                                        function() {
                                            $(this).off("mousemove")
                                        })
                                });
                        var r = {
                            isRun: !1,
                            reset: function(a, b) {
                                var c = this;
                                return a && (j = Math.floor(a)),
                                    b && (k = Math.floor(b)),
                                        k > j ? (c.isRun = !0, h.height(m), q = j / k, i.height(m * q), o = m - m * q, p = .2 * o, h.show(), i.position().top > o && c.scrollTop(o)) : (c.scrollTop(0), c.isRun = !1, h.hide()),
                                    this
                            },
                            move: function(a) {
                                if (!this.isRun) return ! 1;
                                var b = i.position().top,
                                    c = b - a;
                                c = 0 > c ? 0: c > o ? o: c,
                                    i.css("top", c),
                                    n = c / m * k,
                                    g.css("top", -n)
                            },
                            scrollTop: function() {
                                var a = arguments[0];
                                if (void 0 == a) return i.css("top");
                                if ("number" == typeof a) {
                                    var b = a * q,
                                        c = o / q,
                                        d = a > c ? c: a;
                                    b = b > o ? o: b,
                                        i.animate({
                                                top: b
                                            },
                                            400),
                                        g.animate({
                                                top: -d
                                            },
                                            400)
                                }
                            }
                        };
                        return r.reset(),
                            r
                    }
                };
            return b
        }]),
    preSaleAppDirective.directive("appVersion", ["version",
        function(a) {
            return function(b, c) {
                c.text(a)
            }
        }]).directive("getLoadingView", ["ToolGetTemplate",
        function(a) {
            return {
                restrict: "A",
                link: function(b, c, d) {
                    c.html($.loader),
                        d.$observe("url",
                            function(b) {
                                b && a({
                                    templateUrl: b
                                }).then(function(a) {
                                    c.html(a)
                                })
                            })
                }
            }
        }]).directive("ieSelectFix", [function() {
        return {
            restrict: "A",
            require: "select",
            link: function(a, b, c) {
                var d = document.attachEvent;
                if (d) {
                    var e = b[0];
                    a.$watch(c.ieSelectFix,
                        function() {
                            var a = document.createElement("option");
                            e.add(a, null),
                                e.remove(e.options.length - 1)
                        })
                }
            }
        }
    }]).directive("returnTop", [function() {
        return {
            restrict: "A",
            link: function(a, b) {
                var c = b.find(".return-top");
                $(window).scroll(function() {
                    $(window).scrollTop() > 600 ? c.animate({
                            bottom: "10px"
                        },
                        {
                            queue: !1,
                            duration: 200
                        }) : c.animate({
                            bottom: "-40px"
                        },
                        {
                            queue: !1,
                            duration: 200
                        })
                }),
                    b.on("click", ".return-top",
                        function() {
                            $("html,body").animate({
                                    scrollTop: $("body").offset().top
                                },
                                {
                                    queue: !1,
                                    duration: 1e3,
                                    easing: "easeOutQuart"
                                })
                        })
            }
        }
    }]).directive("addCustomServiceModule", ["CustomerService",
        function(a) {
            return {
                restrict: "A",
                link: function(b, c, d) {
                    c.append("<a>" + d.label + "</a>"),
                        c.find("a").on("click",
                            function(b) {
                                b.preventDefault(),
                                    a.open()
                            })
                }
            }
        }]).directive("selectAfter", [function() {
        return function(a, b) {
            navigator.userAgent.toUpperCase().match(/chrome|safari/gi) || b.remove()
        }
    }]).directive("hoverclass", [function() {
        return function(a, b) {
            b.bind("mouseenter",
                function() {
                    b.addClass("hover")
                }),
                b.bind("mouseleave",
                    function() {
                        b.removeClass("hover")
                    })
        }
    }]).directive("commonVerifyCode", ["MainConfig",
        function(a) {
            return {
                restrict: "A",
                template: "<img />",
                replace: !0,
                link: function(b, c, d) {
                    var e = d.custom ? d.url + "?": a.baseUrl + d.url + "&";
                    c.closest(".verify-tips").on("click",
                        function() {
                            c.attr("src", e + (new Date).getTime())
                        }),
                        d.$observe("url",
                            function() {
                                e = d.custom ? d.url + "?": a.baseUrl + d.url + "&",
                                    c.attr("src", e)
                            }),
                            void 0 != d.time ? d.$observe("time",
                        function(a) {
                            c.attr("src", e + a)
                        }) : e && c.attr("src", e + (new Date).getTime())
                }
            }
        }]).directive("toggleSlideDown", [function() {
        return {
            restrict: "A",
            link: function(a, b, c) {
                c.$observe("show",
                    function(a) {
                        "true" == a ? Modernizr.opacity ? b.animate({
                                opacity: "1"
                            },
                            200,
                            function() {
                                b.find("input").focus()
                            }) : (b.show(), b.find("input").focus()) : Modernizr.opacity ? b.animate({
                                opacity: "0"
                            },
                            200) : b.hide()
                    })
            }
        }
    }]).directive("uiScroll", ["$compile", "$timeout", "PluginScrollbar",
        function(a, b, c) {
            return {
                restrict: "A",
                link: function(a, b, d) {
                    var e = b.find(".js-scroll-wrapper"),
                        f = e.find(".js-scroll-container"),
                        g = b.find(".js-scroll-sidebar"),
                        h = g.find(".js-scroll-block"),
                        i = d.scrollWrapperHeight,
                        j = d.scrollContainerHeight,
                        k = d.scrollRevise,
                        l = c.init({
                            frame: b,
                            wrapper: e,
                            container: f,
                            scrollbar: g,
                            block: h,
                            wrapperHeight: i,
                            containerHeight: j,
                            scrollbarRevise: k || 20
                        });
                    b.data("ui-scroll", l)
                }
            }
        }]).directive("loadingBtn", ["MainConfig",
        function() {
            return {
                restrict: "A",
                scope: {
                    method: "="
                },
                link: function(a, b) {
                    var c = b.children(),
                        d = jQuery('<img src="' + CDN_HOST + 'img/loading-blue.gif" class="btn-loading" alt="正在加载中" />'),
                        e = c.html();
                    b.on("click",
                        function() {
                            if (b.hasClass("js-loading")) return ! 1;
                            b.addClass("js-loading"),
                                c.html(""),
                                c.append(d);
                            var f = a.method();
                            f && f["finally"] ? f["finally"](function() {
                                b.removeClass("js-loading"),
                                    c.html(e)
                            }) : (b.removeClass("js-loading"), c.html(e))
                        })
                }
            }
        }]).directive("uiRadio", ["$compile",
        function(a) {
            return {
                restrict: "A",
                require: "ngModel",
                link: function(b, c, d) {
                    var e = d.checkClass || "checked",
                        f = d.ngModel,
                        g = angular.element('<span class="' + d["class"] + '" data-name="' + f + '" ng-class="{ \'' + d.checkClass + "' : " + d.ngModel + " == '" + d.value + "' }\"><a></a></span>");
                    g = a(g)(b),
                        c.hide().after(g),
                        g.on("click",
                            function() {
                                g.hasClass(e) || ($('[data-name="' + f + '"]').removeClass(e), g.addClass(e), b.$apply(function() {
                                    b[d.ngModel] = d.value
                                }))
                            }),
                        c.on("change",
                            function() {
                                var a = $(this).next();
                                a.hasClass(e) || a.trigger("click")
                            })
                }
            }
        }]).directive("uiCheckbox", ["$compile",
        function(a) {
            return {
                restrict: "A",
                require: "?ngModel",
                link: function(b, c, d, e) {
                    var f = d.checkClass || "checked",
                        g = angular.element('<sapn class="' + d["class"] + '" ng-class="{ \'' + d.checkClass + "' : " + d.ngModel + " == '" + d.value + "' }\"><a></a></sapn>");
                    g = a(g)(b),
                        c.hide().after(g),
                        g.on("click",
                            function() {
                                g.hasClass(f) || b.$apply(function() {
                                    e.$setViewValue(d.value)
                                })
                            }),
                        c.on("change",
                            function() {
                                angular.element(this).prop("checked") && b.$apply(function() {
                                    e.$setViewValue(d.value)
                                })
                            })
                }
            }
        }]).directive("uiText", ["$compile",
        function() {
            return {
                restrict: "A",
                require: "ngModel",
                link: function(a, b) {
                    b.on("focus",
                        function() {
                            b.addClass("input-focused")
                        }),
                        b.on("blur",
                            function() {
                                b.removeClass("input-focused")
                            })
                }
            }
        }]).directive("uiSelect", ["$document", "$compile", "$timeout", "Pagemap",
        function(a, b, c, d) {
            return {
                restrict: "A",
                templateUrl: d.directive.uiSelect,
                transclude: !0,
                require: "ngModel",
                scope: {
                    options: "=options",
                    value: "=value",
                    label: "=label"
                },
                link: function(b, d, e, f) {
                    d.addClass(e["class"]);
                    var g = d.find("ul"),
                        h = function(a, c) {
                            b.showText = c,
                                b.$apply(function() {
                                    f.$setViewValue(a)
                                }),
                                e.ngChange && b.$eval(e.ngChange)
                        };
                    if (d.on("click", ".show-text",
                        function() {
                            g.is(":hidden") && (d.addClass("input-select-focused"), g.slideDown("fast",
                                function() {
                                    a.one("click",
                                        function() {
                                            g.slideUp(),
                                                d.removeClass("input-select-focused")
                                        })
                                }))
                        }).on("click", ".select-option",
                        function() {
                            var a = angular.element(this),
                                b = "" === a.data("value") ? "": a.data("value") + "_" + a.text();
                            h(b, a.text())
                        }), b.showText = g.children().first().text(), b.value && b.label) {
                        var i = b.value + "_" + b.label,
                            j = b.label;
                        c(function() {
                            h(i, j)
                        })
                    }
                    b.$watch("options",
                        function() {
                            b.showText = g.children().first().text()
                        })
                }
            }
        }]),
    preSale.animation(".animateView",
        function() {
            return {
                enter: function(a, b) {
                    angular.element(a).css({
                        opacity: 0
                    }),
                        angular.element(a).animate({
                                opacity: 1
                            },
                            b)
                },
                leave: function(a, b) {
                    b()
                }
            }
        }).animation(".fadeView",
        function() {
            return {
                enter: function(a, b) {
                    angular.element(a).css({
                        opacity: 0
                    }),
                        angular.element(a).animate({
                                opacity: "1"
                            },
                            {
                                duration: 500,
                                easing: "easeOutQuart"
                            },
                            b)
                },
                leave: function(a, b) {
                    b()
                }
            }
        }),
    preSaleAppService.constant("VerifyTextConfig", {
        inputWrapperCssName: "module-form-item-wrapper",
        inputSmallCssName: "small-item",
        inputWrapperErrorCssName: "module-form-error-wrapper",
        inputSmallErrorCssName: "module-small-error-wrapper",
        inputWrapperDom: ".module-form-item-wrapper",
        inputDom: ".module-form-item-wrapper input",
        labelDom: "i",
        tipsDom: ".verify-tips",
        successDom: ".verify-success",
        errorDom: ".verify-error"
    }).constant("VerifyConfig", {
        required: {
            reg: /[^\s|.]/,
            withName: !0,
            msg: "必填"
        },
        selectRequired: {
            reg: /[^\s|.]/,
            withName: !0,
            msg: "必填"
        },
        linkRequired: {
            withName: !0,
            msg: "必填"
        },
        numOrEn: {
            reg: /^[0-9a-zA-Z]+$/,
            msg: "只能是英文或者数字"
        },
        errorStr: {
            reg: /^[^\&\<\>]*$/,
            msg: "包含非法字符"
        },
        maxlength: {
            withName: !0,
            msg: "过长"
        },
        email: {
            reg: /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/,
            msg: "邮箱格式错误"
        },
        testEmail: {
            msg: "邮箱已被使用"
        },
        nullOrEmail: {
            reg: /^.{0}$|^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/,
            msg: "邮箱格式错误"
        },
        mobile: {
            reg: /^1[3|4|5|7|8]\d{9}$/,
            msg: "手机号码格式错误"
        },
        password: {
            reg: /^[\w\\\[\]\:\^\-~!@#$%&*()-+={}|;'",.\/<>?]{6,16}$/
        },
        testMobile: {
            msg: "手机号已被使用"
        },
        nullOrMobile: {
            reg: /^.{0}$|^1[3|4|5|7|8]\d{9}$/,
            msg: "手机号码格式错误"
        },
        zip: {
            reg: /^\d{6}$/,
            msg: "邮编格式错误"
        },
        nullOrTelephoneArea: {
            reg: /^.{0}$|^0\d{2,3}$/,
            msg: "格式错误"
        },
        nullOrTelephone: {
            reg: /^.{0}$|^[1-9][0-9]{6,7}$/,
            msg: "格式错误"
        },
        username: {
            msg: "用户名格式错误"
        },
        notExist: {
            withName: !0,
            msg: "不存在"
        },
        passwordError: {
            msg: "密码错误"
        },
        passwordMatch: {
            msg: "密码不一致"
        },
        customError: {}
    }).factory("VerifyAction", ["VerifyConfig", "$document", "VerifyTextConfig", "MainConfig",
        function(a, b, c) {
            return {
                doVerify: function(d, e) {
                    var f = !0,
                        e = e || b.find("[ng-form=" + d.$name + "]") || b.find("form[name=" + d.$name + "]");
                    return Modernizr.opacity ? e.find(c.inputDom).siblings(c.errorDom).css("opacity", 0) : e.find(c.inputDom).siblings(c.errorDom).hide(),
                        e.find(c.inputDom).closest(c.inputWrapperDom).removeClass(c.inputWrapperErrorCssName),
                        jQuery.each(d.$error,
                            function(b, d) {
                                d && (f = !1, jQuery.each(d,
                                    function(b, d) {
                                        var f = e.find("[name=" + d.$name + "]:visible"),
                                            g = f.closest(c.inputWrapperDom);
                                        d.$invalid && !d.ignore && (Modernizr.opacity ? f.siblings(c.successDom).animate({
                                                opacity: "0"
                                            },
                                            300) : f.siblings(c.successDom).hide(), jQuery.each(d.$error,
                                            function(b, d) {
                                                if (d) {
                                                    if (a[b]) {
                                                        var e = f.data("verifyName") && a[b].withName ? f.data("verifyName") + a[b].msg: a[b].msg;
                                                        f.siblings(c.errorDom).text(e)
                                                    } else f.siblings(c.errorDom).text("格式错误");
                                                    return ! 1
                                                }
                                            }), Modernizr.opacity ? (g.css("opacity", 1), f.siblings(c.errorDom).animate({
                                                opacity: "1"
                                            },
                                            300)) : f.siblings(c.errorDom).show(), g.addClass(g.hasClass(c.inputSmallCssName) ? c.inputSmallErrorCssName: c.inputWrapperErrorCssName))
                                    }))
                            }),
                        1 == e.find("." + c.inputWrapperErrorCssName).length && e.find("." + c.inputWrapperErrorCssName + ":first input").closest("." + c.inputWrapperErrorCssName).stop(!0).animate({
                            left: "-15px"
                        },
                        50).animate({
                            left: "20px"
                        },
                        80).animate({
                            left: "-10px"
                        },
                        80).animate({
                            left: "5px"
                        },
                        80).animate({
                            left: "0px"
                        },
                        80),
                        1 == e.find("." + c.inputSmallErrorCssName).length && e.find("." + c.inputSmallErrorCssName + ":first input").closest("." + c.inputSmallErrorCssName).stop(!0).animate({
                            left: "-15px"
                        },
                        50).animate({
                            left: "20px"
                        },
                        80).animate({
                            left: "-10px"
                        },
                        80).animate({
                            left: "5px"
                        },
                        80).animate({
                            left: "0px"
                        },
                        80),
                        e.find("." + c.inputWrapperErrorCssName + ":first input").focus(),
                        e.find("." + c.inputWrapperErrorCssName + ":first select").focus(),
                        e.find("." + c.inputSmallErrorCssName + ":first input").focus(),
                        e.find("." + c.inputSmallErrorCssName + ":first select").focus(),
                        f
                },
                doCustomError: function(a, d, e, f) {
                    var f = f || b.find("[ng-form=" + a.$name + "]") || b.find("form[name=" + a.$name + "]"),
                        g = f.find("[name=" + d.$name + "]:visible"),
                        h = g.closest(c.inputWrapperDom);
                    g.siblings(c.errorDom).text(e),
                        Modernizr.opacity ? (h.css("opacity", 1), g.siblings(c.errorDom).animate({
                                opacity: "1"
                            },
                            300)) : g.siblings(c.errorDom).show(),
                        h.addClass(h.hasClass(c.inputSmallCssName) ? c.inputSmallErrorCssName: c.inputWrapperErrorCssName),
                        h.is(":animated") || h.animate({
                            left: "-15px"
                        },
                        50).animate({
                            left: "20px"
                        },
                        80).animate({
                            left: "-10px"
                        },
                        80).animate({
                            left: "5px"
                        },
                        80).animate({
                            left: "0px"
                        },
                        80)
                },
                addCustomError: function() {
                    a.customError = {
                        withName: !0,
                        msg: "fuck world"
                    }
                },
                checkErrNumber: function(a, b) {
                    var c,
                        d = 0;
                    a.errAnimation = {},
                        angular.forEach(b.$error,
                            function(b) {
                                angular.forEach(b,
                                    function(b) { (a.captchaNeeded || "captcha" != b.$name) && b.$invalid && (c = [b.$name], d++)
                                    })
                            }),
                        1 == d && (a.errAnimation[c] = !0)
                }
            }
        }]),
    preSaleAppDirective.directive("onlynumber",
        function() {
            return function(a, b) {
                b.bind("keydown",
                    function(a) {
                        var b = a.keyCode;
                        return b > 47 && 58 > b || b > 94 && 106 > b || 8 == b ? void 0: !1
                    })
            }
        }).directive("verifySelect", ["VerifyConfig", "$timeout",
            function(a, b) {
                return {
                    restrict: "A",
                    require: "ngModel",
                    link: function(a, c, d, e) {
                        b(function() {
                            "0" == e.$viewValue || void 0 == e.$viewValue ? e.$setValidity("selectRequired", !1) : (c.closest(".select-item").removeClass("module-small-error-wrapper"), e.$setValidity("selectRequired", !0))
                        }),
                            e.$parsers.push(function(a) {
                                return a = void 0 === a ? 0: a,
                                        0 != a ? (c.closest(".select-item").removeClass("module-small-error-wrapper"), e.$setValidity("selectRequired", !0)) : e.$setValidity("selectRequired", !1),
                                    a
                            }),
                            a.$watch(d.ngModel,
                                function(a) {
                                    0 != a ? (c.closest(".select-item").removeClass("module-small-error-wrapper"), e.$setValidity("selectRequired", !0)) : e.$setValidity("selectRequired", !1)
                                },
                                !0)
                    }
                }
            }]).directive("verifyUsername", ["VerifyConfig",
            function(a) {
                return {
                    restrict: "A",
                    require: "ngModel",
                    link: function(b, c, d, e) {
                        e.$parsers.push(function(b) {
                            return b = b ? b: "",
                                    b.match(a.mobile.reg) || b.match(a.email.reg) ? e.$setValidity("username", !0) : e.$setValidity("username", !1),
                                b
                        })
                    }
                }
            }]).directive("verifyTestEmail", ["UserService", "VerifyConfig", "VerifyTextConfig",
            function(a, b, c) {
                return {
                    restrict: "A",
                    require: "ngModel",
                    link: function(b, d, e, f) {
                        d.on("blur",
                            function() {
                                f.$error.required || f.$error.email || a.testEmail(f.$viewValue).then(function() {
                                        d.parent().find(c.successDom).animate({
                                                opacity: "1"
                                            },
                                            300),
                                            f.$setValidity("testEmail", !0)
                                    },
                                    function() {
                                        f.$setValidity("testEmail", !1)
                                    })
                            })
                    }
                }
            }]).directive("verifyTestMobile", ["UserService", "VerifyConfig", "VerifyTextConfig",
            function(a, b, c) {
                return {
                    restrict: "A",
                    require: "ngModel",
                    link: function(b, d, e, f) {
                        f.$parsers.push(function(a) {
                            return a
                        }),
                            d.on("blur",
                                function() {
                                    f.$error.required || f.$error.mobile || a.testMobile(f.$viewValue).then(function() {
                                            d.parent().find(c.successDom).animate({
                                                    opacity: "1"
                                                },
                                                300),
                                                f.$setValidity("testMobile", !0)
                                        },
                                        function() {
                                            f.$setValidity("testMobile", !1)
                                        })
                                })
                    }
                }
            }]).directive("verifyRepeatPassowrd", ["$timeout", "VerifyConfig",
            function(a) {
                return {
                    restrict: "A",
                    require: ["ngModel", "^form"],
                    link: function(b, c, d, e) {
                        a(function() {
                            var a = e[0],
                                b = e[1],
                                f = b[d.otherPwd],
                                g = c.closest("[ng-form=" + b.$name + "]") || c.closest("form[name=" + b.$name + "]"),
                                h = g.find("[name=" + d.otherPwd + "]");
                            a.$parsers.push(function(b) {
                                return b = b ? b: "",
                                        b == h.val() ? (a.$setValidity("passwordMatch", !0), f.$setValidity("passwordMatch", !0)) : (a.$setValidity("passwordMatch", !1), f.$setValidity("passwordMatch", !1)),
                                    b
                            })
                        })
                    }
                }
            }]).directive("verifyLinkRequired", ["$timeout", "VerifyConfig",
            function(a) {
                return {
                    restrict: "A",
                    require: ["ngModel", "^form"],
                    link: function(b, c, d, e) {
                        a(function() {
                            var a = e[0],
                                b = e[1],
                                f = b[d.otherInput],
                                g = c.closest("[ng-form=" + b.$name + "]") || c.closest("form[name=" + b.$name + "]"),
                                h = g.find("[name=" + a.$name + "]"),
                                i = g.find("[name=" + d.otherInput + "]");
                            h.on("blur",
                                function() {
                                    var b = jQuery.trim(h.val()),
                                        c = jQuery.trim(i.val());
                                    b && c || b == c && "" == b ? (a.$setValidity("linkRequired", !0), f.$setValidity("linkRequired", !0)) : ("" == b && a.$setValidity("linkRequired", !1), "" == c && f.$setValidity("linkRequired", !1))
                                })
                        })
                    }
                }
            }]).directive("verifyMobile", ["$timeout", "VerifyConfig",
            function(a, b) {
                return {
                    restrict: "A",
                    require: "^form",
                    link: function(c, d, e, f) {
                        a(function() {
                            var a = f[d.attr("name")];
                            a.$parsers.push(function(c) {
                                return c = c ? c: "",
                                    c.match(b.mobile.reg) ? a.$setValidity("mobile", !0) : a.$setValidity("mobile", !1),
                                    c
                            })
                        })
                    }
                }
            }]).directive("verifyByConfig", ["$timeout", "VerifyConfig",
            function(a, b) {
                return {
                    restrict: "A",
                    require: "^form",
                    link: function(a, c, d, e) {
                        var f = d.verifyFilter;
                        if (!f) return ! 1;
                        var g = f.split("|");
                        c.on("blur",
                            function() {
                                var a = e[c.attr("name")],
                                    d = c.val();
                                jQuery.each(g,
                                    function(c, e) {
                                        b[e] && b[e].reg && (d.match(b[e].reg) ? a.$setValidity(e, !0) : a.$setValidity(e, !1))
                                    })
                            })
                    }
                }
            }]).directive("verifyText", ["VerifyConfig",
            function(a) {
                return {
                    restrict: "A",
                    require: "ngModel",
                    link: function(b, c, d, e) {
                        e.$parsers.push(function(b) {
                            return e.$invalid && jQuery.each(e.$error,
                                function(b, d) {
                                    return d ? (c.siblings(".directive-verify-error").text(a[b] ? "required" == b ? c.data("verifyName") + a.required.msg: a[b].msg: "格式错误"), !1) : void 0
                                }),
                                b
                        })
                    }
                }
            }]).directive("verifyReset", ["VerifyTextConfig", "MainConfig",
            function(a) {
                return {
                    restrict: "A",
                    require: "form",
                    link: function(b, c, d) {
                        d.$observe("submitted",
                            function(b) {
                                "false" == b && (Modernizr.opacity ? c.find(a.inputDom).siblings(a.errorDom).css("opacity", 0).parent(a.inputWrapperDom).css("opacity", .62).removeClass(a.inputWrapperErrorCssName) : c.find(a.inputDom).siblings(a.errorDom).hide().parent(a.inputWrapperDom).removeClass(a.inputWrapperErrorCssName))
                            })
                    }
                }
            }]).directive("verifyForm", ["$document", "$compile", "$timeout", "VerifyTextConfig", "MainConfig",
            function(a, b, c, d) {
                return {
                    restrict: "A",
                    require: "?form",
                    link: function(b, e, f, g) {
                        var h = [],
                            i = function(a) {
                                Modernizr.opacity ? a.animate({
                                        opacity: "1"
                                    },
                                    {
                                        queue: !1
                                    },
                                    300) : a.show()
                            },
                            j = function(a, b) {
                                a.siblings(d.labelDom).show(),
                                    Modernizr.opacity && b.animate({
                                        opacity: "0.62"
                                    },
                                    {
                                        queue: !1
                                    },
                                    300)
                            },
                            k = function(b) {
                                var c = jQuery(this),
                                    f = c.closest(d.inputWrapperDom);
                                if (i(f), "focusin" == b.type) {
                                    var g = f.next(d.tipsDom);
                                    f.addClass("module-form-item-shadow"),
                                        e.find(d.tipsDom).not(g).fadeOut(),
                                        g.fadeIn(200,
                                            function() {
                                                a.off("click", m),
                                                    a.on("click", m)
                                            })
                                }
                            },
                            l = function(a) {
                                var b = jQuery(this),
                                    c = b.closest(d.inputWrapperDom);
                                "" != b.val() || b.is(":focus") || c.hasClass(d.inputWrapperErrorCssName) || c.hasClass(d.inputSmallErrorCssName) || j(b, c),
                                    "" != b.val() && (Modernizr.opacity && b.closest(d.inputWrapperDom).css({
                                    opacity: "1"
                                }), b.siblings(d.labelDom).hide()),
                                    "focusout" == a.type && c.removeClass("module-form-item-shadow")
                            },
                            m = function(b) {
                                var c = b.target;
                                1 != $(c).closest(".js-verify-item-row").length && (e.find(d.tipsDom).fadeOut(200), a.off("click", m))
                            };
                        e.on("reset", d.inputWrapperDom,
                            function() {
                                "" != jQuery(this).find("input").val() ? jQuery(this).find("input").siblings(d.labelDom).show() : Modernizr.opacity ? jQuery(this).find("input").siblings(d.successDom).css({
                                    opacity: "0"
                                }) : jQuery(this).find("input").siblings(d.successDom).hide(),
                                    Modernizr.opacity ? jQuery(this).find("input").siblings(d.errorDom).css({
                                        opacity: "0"
                                    }) : jQuery(this).find("input").siblings(d.errorDom).hide(),
                                    jQuery(this).removeClass(d.inputWrapperErrorCssName),
                                    jQuery(this).removeClass(d.inputSmallErrorCssName),
                                    Modernizr.opacity && "" != jQuery(this).find("input").val() && jQuery(this).css({
                                    opacity: "0.62"
                                })
                            }).on("clearError", d.inputWrapperDom,
                            function() {
                                Modernizr.opacity ? jQuery(this).find("input").siblings(d.errorDom).css({
                                    opacity: "0"
                                }) : jQuery(this).find("input").siblings(d.errorDom).hide(),
                                    jQuery(this).removeClass(d.inputWrapperErrorCssName),
                                    jQuery(this).removeClass(d.inputSmallErrorCssName)
                            }).on("click", d.inputWrapperDom,
                            function() {
                                jQuery(this).find("input").focus()
                            }).on("mouseenter focus select", d.inputDom, k).on("mouseleave blur doVerify", d.inputDom, l).on("keydown", d.inputDom,
                            function() {
                                jQuery(this).siblings(d.labelDom).hide()
                            }).on("keyup", d.inputDom,
                            function(a) {
                                h.push((new Date).getTime()); {
                                    var b = jQuery(this),
                                        c = b.val();
                                    h[h.length - 1]
                                }
                                b.closest(d.inputWrapperDom).removeClass(b.closest(d.inputWrapperDom).hasClass(d.inputSmallCssName) ? d.inputSmallErrorCssName: d.inputWrapperErrorCssName),
                                    Modernizr.opacity ? b.siblings(d.errorDom).animate({
                                            opacity: "0"
                                        },
                                        300) : b.siblings(d.errorDom).hide(),
                                    c || b.siblings(d.labelDom).show(),
                                    13 == a.which && e.find(".js-quick-form-btn").click()
                            }),
                            c(function() {
                                e.find(d.inputDom).each(function() {
                                    var a = jQuery(this),
                                        b = jQuery.trim(a.val());
                                    b && (a.closest(d.inputWrapperDom).css({
                                        opacity: "1"
                                    }), a.siblings(d.labelDom).hide())
                                })
                            })
                    }
                }
            }]),
    preSaleAppDirective.directive("scrollBar", ["$document", "$window", "$timeout",
        function(a, b, c) {
            return function() {
                c(function() {
                    function a() {
                        var a = $(this).scrollTop();
                        a > b ? $(".product-summary-primary").hasClass("product-fixed") || ($(".js-fitting-fix-bar").show(), $(".product-summary-primary").addClass("product-fixed"), $(".product-summary-bg").show(), $(".product-summary-bg").animate({
                                opacity: "1"
                            },
                            {
                                queue: !1,
                                duration: 200
                            })) : $(".product-summary-primary").hasClass("product-fixed") && ($(".product-summary-primary").removeClass("product-fixed"), $(".product-summary-bg").animate({
                                opacity: "0"
                            },
                            {
                                queue: !1,
                                duration: 200
                            }).hide())
                    }
                    $(".js-fitting-fix-bar").hide();
                    var b = $(".js-fixed-contrast").offset().top;
                    $(window).off("scroll", a).on("scroll", a)
                })
            }
        }]).directive("phoneGallery", ["$document", "$timeout",
        function(a, b) {
            return {
                restrict: "A",
                link: function(a, c) {
                    b(function() {
                        var a = c.find(".gallery-prev-btn"),
                            b = c.find(".gallery-next-btn"),
                            d = c.find(".product-gallery li").size(),
                            e = d,
                            f = 0,
                            g = null,
                            h = function() {
                                null != g && clearTimeout(g),
                                    g = setTimeout(function() {
                                            var a = (f - 0 + 1) % e;
                                            c.find(".dot-nav-gallery ul li[data-index=" + a + "]").trigger("choose"),
                                                h()
                                        },
                                        5e3)
                            },
                            i = function() {
                                clearTimeout(g)
                            };
                        if ($(".dot-nav-gallery ul").html('<li data-index="0" class="active"><a></a></li>'), d > 0) {
                            for (var j = 0; d - 1 > j; j++) {
                                var k = '<li data-index="' + (parseInt(j) + 1) + '"><a></a></li>';
                                c.find(".dot-nav-gallery ul").append(k)
                            }
                            h()
                        }
                        c.on("click choose", ".dot-nav-gallery ul li",
                            function() {
                                var a = jQuery(this).attr("data-index");
                                a != f && (i(), Modernizr.opacity ? (c.find('.product-gallery li[data-index="' + f + '"]').animate({
                                        opacity: "0"
                                    },
                                    {
                                        queue: !1,
                                        duration: 1e3
                                    }), c.find('.product-gallery li[data-index="' + a + '"]').animate({
                                        opacity: "1"
                                    },
                                    {
                                        queue: !1,
                                        duration: 1e3
                                    })) : (c.find(".product-gallery li[data-index=" + f + "]").hide(), c.find(".product-gallery li[data-index=" + a + "]").show()), f = a, c.find(".dot-nav-gallery ul li").removeClass("active"), jQuery(this).addClass("active"), h())
                            }),
                            Modernizr.opacity ? c.find(".product-gallery li").not(":first").css({
                                opacity: "0"
                            }) : c.find(".product-gallery li").not(":first").hide(),
                            c.on("mouseenter",
                                function() {
                                    i(),
                                        a.show(),
                                        b.show()
                                }).on("mouseleave",
                                function() {
                                    h(),
                                        a.hide(),
                                        b.hide()
                                }),
                            a.on("click",
                                function() {
                                    var a = (f - 1) % e;
                                    a = 0 > a ? e - 1: a,
                                        c.find(".dot-nav-gallery ul li[data-index=" + a + "]").trigger("choose")
                                }),
                            b.on("click",
                                function() {
                                    var a = (f - 0 + 1) % e;
                                    c.find(".dot-nav-gallery ul li[data-index=" + a + "]").trigger("choose")
                                })
                    }),
                        a.$watch("curPhoneImages",
                            function(a) {
                                for (var b = 0; 4 > b; b++) c.find(".product-gallery li:eq(" + b + ")").html('<img src="' + a[b] + '" />')
                            })
                }
            }
        }]).directive("fittingGallery", [function() {
        return {
            restrict: "A",
            link: function(a, b) {
                var c = b.find(".prod-gallery-list"),
                    d = c.find(".img-cover"),
                    e = c.find(".img-pos"),
                    f = b.find(".prod-gallery-thumbnails");
                f.on("click", "li",
                    function() {
                        var a = jQuery(this);
                        if (a.hasClass("selected")) return ! 1;
                        f.find(".selected").removeClass("selected"),
                            a.addClass("selected");
                        var b = a.index();
                        c.children().eq(b).show().animate({
                                opacity: "1"
                            },
                            {
                                queue: !1,
                                duration: 500,
                                easing: "easeOutQuart"
                            }).siblings().animate({
                                opacity: "0"
                            },
                            {
                                queue: !1,
                                duration: 500,
                                easing: "easeOutQuart"
                            }),
                            0 == b && (d.hide().css({
                            opacity: "0"
                        }), e.hide().css({
                            left: "135px",
                            opacity: "0"
                        }), d.show().animate({
                                opacity: "1"
                            },
                            {
                                queue: !1,
                                duration: 500,
                                easing: "easeOutQuart"
                            }), e.show().animate({
                                opacity: "1",
                                left: "115px"
                            },
                            {
                                queue: !1,
                                duration: 500,
                                easing: "easeOutQuart"
                            }))
                    })
            }
        }
    }]).directive("chooseNoPhone", ["$timeout", "$document",
        function(a, b) {
            return {
                restrict: "A",
                link: function(a, c) {
                    function d(a) {
                        var e = a.target;
                        1 != $(e).closest(".not-tips").length && (c.find(".not-tips").fadeOut(200), b.off("click", d))
                    }
                    c.on("click",
                        function() {
                            var a = c.find(".not-tips");
                            a.fadeIn(200,
                                function() {
                                    b.off("click", d),
                                        b.on("click", d)
                                })
                        })
                }
            }
        }]).directive("chooseFitting", ["$timeout",
        function() {
            return {
                restrict: "A",
                link: function(a, b) {
                    var c = b.closest(".prod-box"),
                        d = c.find(".prod-gallery-thumbnails").children();
                    b.on("click", ".prod-selection li",
                        function() {
                            var b = jQuery(this);
                            if (b.hasClass("selected")) return ! 1;
                            var c = b.closest(".prod-selection"),
                                e = c.data("images");
                            if (c.find(".selected").removeClass("selected"), b.addClass("selected"), b.hasClass("last")) a.$apply(function() {
                                a.resetCart(e ? "fittingNormal": "fittingAnther")
                            });
                            else {
                                var f = a.fittingList[b.index()],
                                    g = (new Date).getTime(),
                                    h = {};
                                e ? (a.isFittingBase = !1, a.fitting = f, h.type = "fittingNormal", h.time = a.cartMap.fittingNormal ? a.cartMap.fittingNormal.time: g, a.cartMap.fittingNormal = angular.extend(h, f), d.first().removeClass("selected").click()) : (h.type = "fittingAnther", h.time = a.cartMap.fittingAnther ? a.cartMap.fittingAnther.time: g, a.cartMap.fittingAnther = angular.extend(h, f)),
                                    a.addCart(h)
                            }
                            a.$apply(function() {
                                a.countCart()
                            })
                        }),
                        a.resetCallback.fittingNormal = function() {
                            var c = b.find('.prod-selection[data-images="true"]');
                            c.find(".selected").removeClass("selected"),
                                c.find(".last").addClass("selected"),
                                a.chooseBaseFittging()
                        },
                        a.resetCallback.fittingAnther = function() {
                            var a = b.find('.prod-selection[data-images="false"]');
                            a.find(".selected").removeClass("selected"),
                                a.find(".last").addClass("selected")
                        }
                }
            }
        }]).directive("toggleFittingOther", [function() {
        return {
            restrict: "A",
            link: function(a, b) {
                b.on("click", ".prod-selection-more .selection-title",
                    function(b) {
                        return b.preventDefault(),
                            a.cartMap.fittingAnther ? !1: (jQuery(this).hasClass("selection-title-on") ? jQuery(this).siblings(".prod-selection").animate({
                                    opacity: "0"
                                },
                                {
                                    queue: !1,
                                    duration: 500,
                                    easing: "easeOutQuart"
                                }) : jQuery(this).siblings(".prod-selection").animate({
                                    opacity: "1"
                                },
                                {
                                    queue: !1,
                                    duration: 500,
                                    easing: "easeOutQuart"
                                }), jQuery(this).toggleClass("selection-title-on"), void jQuery(this).siblings(".prod-selection").slideToggle({
                                queue: !1,
                                duration: 500,
                                easing: "easeOutQuart"
                            }))
                    })
            }
        }
    }]).directive("fittingCartResult", [function() {
        return {
            restrict: "A",
            link: function(a, b, c) {
                var d = (b.closest(".prod-box"), b.find(".null-result")),
                    e = b.find(".js-phone-cart"),
                    f = 0,
                    g = 62,
                    h = 43;
                b.on("click", ".delete",
                    function() {
                        var b = jQuery(this).closest("li");
                        a.$apply(function() {
                            a.resetCart(b.data("type")),
                                a.countCart()
                        })
                    }),
                    c.$observe("cartNum",
                        function(a) {
                            return 0 == a && a == f ? !1: void(1 == a && 0 == f || 0 == a && 1 == f ? b.animate({
                                    height: 0
                                },
                                {
                                    queue: !1,
                                    duration: 500,
                                    easing: "easeOutQuart",
                                    complete: function() {
                                        a > 0 && 0 == f && (d.hide(), e.show()),
                                            0 == a && f > 0 && (d.show(), e.hide()),
                                            b.animate({
                                                    height: 0 == a ? g: h + 36 * a
                                                },
                                                {
                                                    queue: !1,
                                                    duration: 500,
                                                    easing: "easeOutQuart"
                                                }),
                                            f = a
                                    }
                                }) : (b.animate({
                                    height: h + 36 * a
                                },
                                {
                                    queue: !1,
                                    duration: 500,
                                    easing: "easeOutQuart"
                                }), f = a))
                        })
            }
        }
    }]),
    preSaleAppDirective.directive("showAccountDropMenu", [function() {
        return {
            restrict: "A",
            link: function(a, b) {
                b.on("click",
                    function() {
                        var a = b.closest(".header-account-wrapper"),
                            c = a.find(".white-drop-menu"),
                            d = a.find(".animate-link");
                        c.is(":hidden") && (c.show().animate({
                                opacity: "1"
                            },
                            200,
                            function() {
                                jQuery(document).one("click",
                                    function() {
                                        d.removeClass("animate-hold-link").animate({
                                                right: "19px"
                                            },
                                            {
                                                duration: 200,
                                                easing: "easeOutQuart"
                                            }),
                                            c.animate({
                                                    opacity: "0"
                                                },
                                                200,
                                                function() {
                                                    c.hide()
                                                })
                                    })
                            }), d.addClass("animate-hold-link").animate({
                                right: "75px"
                            },
                            {
                                duration: 200,
                                easing: "easeOutQuart"
                            }))
                    }),
                    b.next(".icon-arrow").on("click",
                        function() {
                            b.click()
                        }),
                    b.prev(".holder-link").on("click",
                        function() {
                            b.click()
                        })
            }
        }
    }]).directive("showLanguageDropMenu", [function() {
        return {
            restrict: "A",
            link: function(a, b) {
                b.on("click",
                    function() {
                        var a = b.closest(".header-language-wrapper"),
                            c = a.find(".white-drop-menu"),
                            d = a.find(".animate-link");
                        c.is(":hidden") && (d.addClass("animate-hold-link"), c.show().animate({
                                opacity: "1"
                            },
                            200,
                            function() {
                                jQuery(document).one("click",
                                    function() {
                                        d.removeClass("animate-hold-link"),
                                            c.animate({
                                                    opacity: "0"
                                                },
                                                200,
                                                function() {
                                                    c.hide()
                                                })
                                    })
                            }))
                    }),
                    b.next(".icon-arrow").on("click",
                        function() {
                            b.click()
                        })
            }
        }
    }]).directive("showWeixinCode", [function() {
        return {
            restrict: "A",
            link: function(a, b) {
                b.on("click",
                    function() {
                        var a = b.find(".dimensional-code");
                        a.is(":hidden") && (b.addClass("hold"), a.show().animate({
                                opacity: "1"
                            },
                            200,
                            function() {
                                jQuery(document).one("click",
                                    function() {
                                        a.animate({
                                                opacity: "0"
                                            },
                                            200,
                                            function() {
                                                b.removeClass("hold"),
                                                    a.hide()
                                            })
                                    })
                            }))
                    })
            }
        }
    }]).directive("showAccountDialog", ["$rootScope", "UserService",
        function(a, b) {
            return {
                restrict: "A",
                link: function(c, d) {
                    d.on("click",
                        function() {
                            b.getInfo().then(function() {
                                a.accountDialog().show()
                            })
                        })
                }
            }
        }]).directive("showLoginDialog", ["$rootScope", "$timeout", "UserService",
        function(a, b, c) {
            return {
                restrict: "A",
                link: function(b, d) {
                    d.on("click",
                        function() {
                            c.getInfo().then(function() {},
                                function() {
                                    a.loginDialog.setScope(function(a) {
                                        return angular.extend(a.config, {
                                            title: "登录账户",
                                            type: "login",
                                            regType: "email",
                                            dialogWidth: "436px",
                                            dialogMargin: "-215px 0 0 -218px",
                                            conHeight: {
                                                height: "362px"
                                            }
                                        }),
                                            a
                                    }).show(function() {},
                                        !0)
                                })
                        })
                }
            }
        }]).directive("showRegisterDialog", ["$rootScope", "$timeout",
        function(a) {
            return {
                restrict: "A",
                link: function(b, c) {
                    c.on("click",
                        function() {
                            a.loginDialog.setScope(function(a) {
                                return angular.extend(a.config, {
                                    title: "注册",
                                    type: "register",
                                    dialogWidth: "436px",
                                    dialogMargin: "-290px 0 0 -218px",
                                    conHeight: {
                                        height: "520px"
                                    }
                                }),
                                    a
                            }).show(function() {},
                                !0)
                        })
                }
            }
        }]).directive("doLogout", ["UserService", "PluginDialog",
        function(a, b) {
            return {
                restrict: "A",
                link: function(c, d) {
                    d.on("click",
                        function() {
                            b.confirm({
                                title: "退出登录",
                                message: "确定退出登录吗？",
                                ok: function(b) {
                                    a.logout().then(function() {
                                        b.close(),
                                            c.$emit("user:pushLogout")
                                    })
                                },
                                cancel: function() {}
                            })
                        })
                }
            }
        }]).directive("doLogin", ["$rootScope", "$timeout", "UserService", "VerifyAction",
        function(a, b, c, d) {
            return {
                restrict: "A",
                require: "^form",
                link: function(e, f, g, h) {
                    var i = f.closest(".module-popup"),
                        j = f.closest(".dialog-inner");
                    f.on("click",
                        function() {
                            if (j = f.closest(".dialog-inner"), d.doVerify(h), e.loginForm.$valid) {
                                var b = {
                                    passport: e.loginFormData.username,
                                    password: e.loginFormData.password
                                };
                                e.showVerify && (b.code = e.loginFormData.verify),
                                    c.login(b).then(function() {
                                            e.$emit("user:pushDoLoginAction"),
                                                a.loginDialog.hide()
                                        },
                                        function(a) {
                                            return a.errInfo ? ((a.errInfo[1036] || a.errInfo[1040] || a.errInfo[1042] || a.errInfo[1043] || a.errInfo[1017]) && (e.showVerify = !0, a.data.captcha && (e.verifySrc = a.data.captcha)), a.errInfo[1017] && d.doCustomError(e.loginForm, "verify", a.errInfo[1017], j), a.errInfo[1036] && d.doCustomError(e.loginForm, "verify", a.errInfo[1036], j), a.errInfo[1037] && d.doCustomError(e.loginForm, e.loginForm.password, a.errInfo[1037], j), a.errInfo[1038] && d.doCustomError(e.loginForm, e.loginForm.username, a.errInfo[1038], j), a.errInfo[1039] && d.doCustomError(e.loginForm, e.loginForm.password, a.errInfo[1039], j), a.errInfo[1040] && d.doCustomError(e.loginForm, "verify", a.errInfo[1040], j), a.errInfo[1041] && d.doCustomError(e.loginForm, e.loginForm.username, "密码错误", j), a.errInfo[1042] && d.doCustomError(e.loginForm, e.loginForm.password, a.errInfo[1042], j), void(a.errInfo[1043] && d.doCustomError(e.loginForm, "verify", a.errInfo[1043], j))) : void 0
                                        })
                            }
                        }),
                        g.$observe("wrong",
                            function(a) {
                                i = f.closest(".module-popup"),
                                    j = f.closest(".dialog-inner"),
                                    a && (f.hasClass("login-guestbox") ? i.animate({
                                        height: "430px",
                                        "margin-top": "-215px"
                                    },
                                    {
                                        duration: 500,
                                        easing: "easeOutQuart"
                                    }) : i.animate({
                                        "margin-top": "-251px"
                                    },
                                    {
                                        duration: 500,
                                        easing: "easeOutQuart"
                                    }), j.find(".js-verify-item-row").is(":hidden") && (j.find(".js-verify-item-row").hide().slideDown({
                                    duration: 500,
                                    easing: "easeOutQuart"
                                }), j.find(".js-verify-item-wrapper").animate({
                                        opacity: "0.62"
                                    },
                                    {
                                        duration: 500,
                                        easing: "easeOutQuart"
                                    }), f.closest(".animate-layer").animate({
                                        height: "434px"
                                    },
                                    {
                                        duration: 500,
                                        easing: "easeOutQuart"
                                    }), b(function() {
                                        j.find(".js-verify-item-wrapper").find("input").val("").focus()
                                    },
                                    100)))
                            })
                }
            }
        }]).directive("doEmailRegister", ["$timeout", "VerifyAction",
        function(a, b) {
            return {
                restrict: "A",
                require: "^form",
                link: function(a, c, d, e) {
                    c.closest(".module-popup"),
                        c.closest(".reg-box");
                    c.on("click",
                        function() {
                            b.doVerify(e)
                        })
                }
            }
        }]).directive("doPhoneRegister", ["$timeout", "VerifyAction",
        function(a, b) {
            return {
                restrict: "A",
                require: "^form",
                link: function(a, c, d, e) {
                    c.closest(".module-popup"),
                        c.closest(".reg-box");
                    c.on("click",
                        function() {
                            b.doVerify(e)
                        })
                }
            }
        }]).directive("registerTab", ["$timeout", "VerifyAction",
        function() {
            return {
                restrict: "A",
                link: function(a, b) {
                    var c = b.closest(".module-dialog"),
                        d = b.closest(".dialog-con"),
                        e = d.find(".reg-normal"),
                        f = d.find(".reg-mobile");
                    b.on("click", "li.mail-reg",
                        function() {
                            e.hide(),
                                f.show(),
                                e.fadeIn(200),
                                f.fadeOut(200)
                        }).on("click", "li.mobile-reg",
                        function() {
                            e.find(".pwd-repeat").animate({
                                    height: "0px",
                                    opacity: "0"
                                },
                                {
                                    duration: 500,
                                    easing: "easeOutQuart"
                                }),
                                c.animate({
                                        "margin-top": "-251px"
                                    },
                                    {
                                        duration: 500,
                                        easing: "easeOutQuart"
                                    }),
                                c.find(".animate-layer").animate({
                                        height: "434px"
                                    },
                                    {
                                        duration: 500,
                                        easing: "easeOutQuart"
                                    }),
                                e.fadeOut(200),
                                f.fadeIn(200)
                        })
                }
            }
        }]).directive("linkRegister", ["$timeout", "PluginAnimate",
        function(a, b) {
            return {
                restrict: "A",
                link: function(a, c) {
                    var d = c.closest(".module-dialog"),
                        e = d.find(".loginform"),
                        f = d.find(".guest-loginform"),
                        g = d.find(".regform");
                    c.on("click",
                        function() {
                            g.hide(),
                                e.hide(),
                                f.hide(),
                                d.find(".animate-layer").width("436px"),
                                d.css({
                                    width: "436px",
                                    margin: "-215px 0 0 -218px"
                                }),
                                a.captchaNeeded = !1,
                                b.dialogCurover({
                                    dialog: d,
                                    targetPanel: g,
                                    conHeight: 520,
                                    dialogTop: 290
                                }),
                                $(".regform").find("[name=mobile]").focus()
                        })
                }
            }
        }]).directive("linkGuestMobile", ["$timeout", "PluginAnimate",
        function(a, b) {
            return {
                restrict: "A",
                link: function(a, c) {
                    var d = c.closest(".module-dialog"),
                        e = d.find(".guest-loginform"),
                        f = d.find(".guest-mobileform");
                    c.on("click",
                        function() {
                            f.hide(),
                                e.hide(),
                                d.find(".animate-layer").width("436px"),
                                d.css({
                                    width: "436px",
                                    margin: "-215px 0 0 -218px"
                                }),
                                b.dialogCurover({
                                    dialog: d,
                                    targetPanel: f,
                                    conHeight: 520,
                                    dialogTop: 290
                                }),
                                $(".guest-mobileform").find("[name=mobile]").focus()
                        })
                }
            }
        }]).directive("linkForget", ["$timeout", "$compile", "MainService", "ToolGetTemplate", "PluginAnimate",
        function(a, b, c, d, e) {
            return {
                restrict: "A",
                link: function(a, f) {
                    var g = f.closest(".module-popup"),
                        h = g.find(".popup-con"),
                        i = a.$parent;
                    f.on("click",
                        function() {
                            c.appendLoading(h),
                                d({
                                    templateUrl: "partials/forget-password.html"
                                }).then(function(a) {
                                    c.removeLoading(h),
                                        a = b(a)(i),
                                        h.append(a),
                                        h.find(".loginform").hide(),
                                        e.dialogCurover({
                                            dialog: g,
                                            targetPanel: h.find(".typeuserid"),
                                            conHeight: 254,
                                            dialogTop: 163
                                        })
                                })
                        })
                }
            }
        }]).directive("linkChooseForgetType", ["$timeout", "$compile", "ToolGetTemplate", "MainService", "UserService", "VerifyAction", "PluginAnimate",
        function(a, b, c, d, e, f, g) {
            return {
                restrict: "A",
                require: "^form",
                link: function(a, b, c, d) {
                    b.on("click",
                        function() {
                            var c = b.closest(".module-popup"),
                                h = c.find(".popup-con"),
                                i = f.doVerify(d);
                            d.username.$setValidity("notExist", !0),
                                i && e.forgetVerifyName(a.forgetFormData).then(function(b) {
                                    a.forgetType = "chooseType",
                                        a.forgetFormData.chooseType = b.email ? "email": "mobile";
                                    var d = 0;
                                    b.emailType && (a.hasEmailType = b.emailType, a.forgetFormData.email = b.email, d++),
                                        b.mobileType && (a.hasMobileType = b.mobileType, a.forgetFormData.mobile = b.mobile, d++),
                                        b.questionType && (a.hasQuestionType = b.questionType, d++);
                                    var e = 137 + 50 * d,
                                        f = 103 + 25 * d;
                                    h.find(".choose-forget-wrapper").hide().css("opacity", "0"),
                                        g.dialogCurover({
                                            dialog: c,
                                            targetPanel: h.find(".choose-forget-wrapper"),
                                            conHeight: e,
                                            dialogTop: f
                                        })
                                },
                                function() {
                                    d.username.$setValidity("notExist", !1),
                                        f.doVerify(d)
                                })
                        })
                }
            }
        }]).directive("linkForgetType", ["$timeout", "$compile", "ToolGetTemplate", "MainService", "UserService", "VerifyAction", "PluginAnimate",
        function(a, b, c, d, e, f, g) {
            return {
                restrict: "A",
                link: function(a, b) {
                    b.on("click",
                        function() {
                            var c,
                                d,
                                e,
                                f = b.closest(".module-popup"),
                                h = f.find(".popup-con"),
                                i = h.find(".choose-forget-wrapper");
                            switch (a.forgetFormData.chooseType) {
                                case "email":
                                    c = h.find(".forget-type-email-wrapper"),
                                        d = 327,
                                        e = 198;
                                    break;
                                case "mobile":
                                    c = h.find(".forget-type-mobile-wrapper"),
                                        d = 440,
                                        e = 255;
                                    break;
                                case "question":
                                    c = h.find(".forget-type-question-wrapper"),
                                        d = 363,
                                        e = 216;
                                    break;
                                default:
                                    c = h.find(".forget-type-email-wrapper"),
                                        d = 327,
                                        e = 198
                            }
                            i.hide(),
                                c.hide().css("opacity", "0"),
                                g.dialogCurover({
                                    dialog: f,
                                    targetPanel: c,
                                    conHeight: d,
                                    dialogTop: e
                                })
                        })
                }
            }
        }]).directive("linkLogin", ["$timeout", "PluginAnimate",
        function(a, b) {
            return {
                restrict: "A",
                link: function(a, c) {
                    var d = c.closest(".module-dialog"),
                        e = d.find(".loginform"),
                        f = d.find(".regform");
                    c.on("click",
                        function() {
                            e.hide(),
                                f.hide(),
                                b.dialogCurover({
                                    dialog: d,
                                    targetPanel: e,
                                    conHeight: 362,
                                    dialogTop: 215
                                }),
                                $(".loginform").find("[name=username]").focus(),
                                a.needRePassword = !1,
                                $(".loginverifylabel").animate({
                                        height: "0px",
                                        opacity: "0"
                                    },
                                    {
                                        duration: 500,
                                        easing: "easeOutQuart"
                                    })
                        })
                }
            }
        }]).directive("passwordWrap", [function() {
        return {
            restrict: "A",
            link: function(a, b) {
                var c = (b.find(".js-reg-pwd"), b.find(".js-reg-repwd")),
                    d = c.closest(".js-reg-repwd-wrap"),
                    e = b.closest(".module-dialog");
                b.on("focus", ".js-reg-pwd",
                    function() {
                        d.is(":hidden") && d.show().css("height", 0),
                            d.animate({
                                    height: "50px",
                                    opacity: "1"
                                },
                                {
                                    duration: 500,
                                    easing: "easeOutQuart"
                                }),
                            e.animate({
                                    "margin-top": "-282px"
                                },
                                {
                                    duration: 500,
                                    easing: "easeOutQuart"
                                }),
                            e.find(".animate-layer").animate({
                                    height: "525px"
                                },
                                {
                                    duration: 500,
                                    easing: "easeOutQuart"
                                })
                    })
            }
        }
    }]).directive("resetPassword", ["MainService", "UserService", "VerifyAction", "PluginAnimate",
        function(a, b, c, d) {
            return {
                restrict: "A",
                require: "^form",
                link: function(e, f, g, h) {
                    f.on("click",
                        function() {
                            var g = f.closest(".module-popup"),
                                i = g.find(".popup-con"),
                                j = i.find(".forget-reset-wrapper"),
                                k = c.doVerify(h);
                            h.allowReset && k && (a.appendLoading(i), b.resetPassword({
                                password: e.forgetFormData.resetPassword
                            }).then(function() {
                                    a.removeLoading(i),
                                        e.forgetType = "resetSuccess",
                                        j.hide(),
                                        d.dialogCurover({
                                            dialog: g,
                                            targetPanel: g.find(".forget-reset-success-wrapper"),
                                            conHeight: 321,
                                            dialogTop: 195
                                        })
                                },
                                function() {
                                    a.removeLoading(i)
                                }))
                        })
                }
            }
        }]).directive("forgetVerifyStep", ["$rootScope", "$timeout", "$compile", "ToolGetTemplate", "MainService", "UserService", "VerifyAction", "PluginAnimate",
        function(a, b, c, d, e, f, g, h) {
            return {
                restrict: "A",
                require: "^form",
                link: function(b, c, d, i) {
                    c.on("click",
                        function() {
                            var d = c.closest(".module-popup"),
                                j = d.find(".popup-con"),
                                k = j.find(".forget-type-mobile-wrapper"),
                                l = j.find(".forget-reset-wrapper"),
                                m = 261,
                                n = 165,
                                o = "重置密码",
                                p = {},
                                q = g.doVerify(i);
                            "question" == b.forgetType && (k = j.find(".forget-type-question-wrapper")),
                                q && (e.appendLoading(j), f.forgetVerifyStep(p).then(function() {
                                    b.forgetResetForm.allowReset = !0,
                                        a.loginDialog.setScope(function(a) {
                                            return angular.extend(a.config, {
                                                title: o,
                                                dialogWidth: "436px",
                                                dialogMargin: "-215px 0 0 -218px"
                                            }),
                                                a
                                        }),
                                        e.removeLoading(j),
                                        b.forgetType = "reset",
                                        k.hide(),
                                        l.hide().css("opacity", "0"),
                                        h.dialogCurover({
                                            dialog: d,
                                            targetPanel: l,
                                            conHeight: m,
                                            dialogTop: n
                                        })
                                },
                                function() {
                                    e.removeLoading(j)
                                }))
                        })
                }
            }
        }]),
    preSaleAppDirective.directive("iFocus", [function() {
        var a = "i-focused";
        return {
            restrict: "A",
            require: "ngModel",
            link: function(b, c, d, e) {
                e.$focused = !1,
                    c.bind("focus",
                        function() {
                            c.addClass(a),
                                b.$apply(function() {
                                    e.$focused = !0
                                })
                        }).bind("blur",
                        function() {
                            c.removeClass(a),
                                b.$apply(function() {
                                    e.$focused = !1
                                })
                        })
            }
        }
    }]).directive("iBlur", [function() {
        var a = "i-blurred";
        return {
            restrict: "A",
            require: "ngModel",
            link: function(b, c, d, e) {
                e.$blurred = !1,
                    c.on("keydown",
                        function() {
                            c.removeClass(a),
                                b.$apply(function() {
                                    e.$blurred = !1
                                })
                        }).on("blur",
                        function() {
                            c.addClass(a),
                                b.$apply(function() {
                                    e.$blurred = !0
                                })
                        }),
                    b.$watch("submitted",
                        function() {
                            1 == b.submitted && (e.$blurred = !0)
                        })
            }
        }
    }]).directive("iInput",
        function() {
            return {
                restrict: "A",
                require: "ngModel",
                link: function(a, b, c, d) {
                    b.on("focus",
                        function() {
                            $(this).parents(".module-form-item-wrapper").animate({
                                    opacity: 1
                                },
                                {
                                    queue: !1,
                                    duration: 300
                                }).addClass("module-form-item-shadow")
                        }),
                        b.on("blur",
                            function() {
                                $(this).val() || ($(this).prev("i").show(), $(this).parents(".module-form-item-wrapper").animate({
                                        opacity: .62
                                    },
                                    {
                                        queue: !1,
                                        duration: 300
                                    })),
                                    $(this).parents(".module-form-item-wrapper").removeClass("module-form-item-shadow")
                            }),
                        b.on("keydown input",
                            function(b) {
                                13 != b.which && (a.submitted = !1, a.errAnimation = {},
                                    d.$setValidity("nameValid", !0), d.$setValidity("passwordValid", !0), d.$setValidity("captchaValid", !0), d.$setValidity("mobileRegistered", !0), d.$setValidity("emailRegistered", !0), d.$setValidity("captchaReload", !0)),
                                    $(this).prev("i").hide()
                            })
                }
            }
        }).directive("iUsername", ["VerifyConfig",
            function(a) {
                return {
                    restrict: "A",
                    require: "ngModel",
                    link: function(b, c, d, e) {
                        e.$parsers.push(function(b) {
                            return b = b || "",
                                    !b || a.email.reg.test(b) || a.mobile.reg.test(b) ? (e.$setValidity(e.$name, !0), b) : void e.$setValidity(e.$name, !1)
                        })
                    }
                }
            }]).directive("iPassword", ["VerifyConfig",
            function(a) {
                return {
                    restrict: "A",
                    require: "ngModel",
                    link: function(b, c, d, e) {
                        e.$parsers.push(function(b) {
                            return b = b || "",
                                    !b || a.password.reg.test(b) ? (e.$setValidity(e.$name, !0), b) : void e.$setValidity(e.$name, !1)
                        })
                    }
                }
            }]).directive("iMobile", ["VerifyConfig",
            function(a) {
                return {
                    restrict: "A",
                    require: "ngModel",
                    link: function(b, c, d, e) {
                        e.$parsers.push(function(b) {
                            return b = b || "",
                                    !b || a.mobile.reg.test(b) ? (e.$setValidity(e.$name, !0), b) : void e.$setValidity(e.$name, !1)
                        })
                    }
                }
            }]).directive("iMail", ["VerifyConfig",
            function(a) {
                return {
                    restrict: "A",
                    require: "ngModel",
                    link: function(b, c, d, e) {
                        e.$parsers.push(function(b) {
                            return b = b || "",
                                    !b || a.email.reg.test(b) ? (e.$setValidity(e.$name, !0), b) : void e.$setValidity(e.$name, !1)
                        })
                    }
                }
            }]).directive("iRepassword", ["VerifyConfig",
            function() {
                return {
                    restrict: "A",
                    require: "ngModel",
                    link: function(a, b, c, d) {
                        a.$watch(function() {
                                return ! a.user.repassword || a.user.password == a.user.repassword
                            },
                            function(a) {
                                return a ? (d.$setValidity(d.$name, !0), a) : void d.$setValidity(d.$name, !1)
                            })
                    }
                }
            }]).directive("iShow", ["$timeout",
            function(a) {
                return {
                    restrict: "A",
                    link: function(b, c, d) {
                        b.$watch(d.iShow,
                            function(b) {
                                b ? a(function() {
                                        jQuery.support.opacity ? c.stop().show().animate({
                                                opacity: 1
                                            },
                                            {
                                                queue: !1,
                                                duration: 290
                                            }) : c.stop().show()
                                    },
                                    10) : a(function() {
                                        jQuery.support.opacity ? c.stop().animate({
                                                opacity: 0
                                            },
                                            {
                                                duration: 290,
                                                done: function() {
                                                    c.hide()
                                                }
                                            }) : c.stop().hide()
                                    },
                                    10)
                            },
                            !0)
                    }
                }
            }]).directive("iFade", ["$timeout",
            function(a) {
                return {
                    restrict: "A",
                    link: function(b, c, d) {
                        b.$watch(d.iFade,
                            function(b) {
                                b ? a(function() {
                                        c.fadeIn(200)
                                    },
                                    10) : a(function() {
                                        c.fadeOut(200)
                                    },
                                    10)
                            },
                            !0)
                    }
                }
            }]).directive("slideDown", ["$timeout",
            function(a) {
                return {
                    restrict: "A",
                    link: function(b, c, d) {
                        b.$watch(d.slideDown,
                            function(b) {
                                if (b) {
                                    var d = c.closest(".module-dialog");
                                    if (c.hasClass("pwd-repeat")) return d.animate({
                                            "margin-top": "-327px"
                                        },
                                        {
                                            duration: 500,
                                            easing: "easeOutQuart"
                                        }),
                                        c.hide().slideDown({
                                            duration: 500,
                                            easing: "easeOutQuart"
                                        }),
                                        void c.closest(".animate-layer").animate({
                                                height: "585px"
                                            },
                                            {
                                                duration: 500,
                                                easing: "easeOutQuart"
                                            }).css("overflow", "visible");
                                    c.hasClass("verify2") ? (d.animate({
                                            "margin-top": "-251px"
                                        },
                                        {
                                            duration: 500,
                                            easing: "easeOutQuart"
                                        }), c.hide().slideDown({
                                        duration: 500,
                                        easing: "easeOutQuart"
                                    }), c.closest(".animate-layer").animate({
                                            height: "434px"
                                        },
                                        {
                                            duration: 500,
                                            easing: "easeOutQuart"
                                        })) : c.hasClass("verify3") ? (d.animate({
                                            "margin-top": "-251px"
                                        },
                                        {
                                            duration: 500,
                                            easing: "easeOutQuart"
                                        }), c.hide().slideDown({
                                        duration: 500,
                                        easing: "easeOutQuart"
                                    }), c.closest(".animate-layer").animate({
                                            height: "524px"
                                        },
                                        {
                                            duration: 500,
                                            easing: "easeOutQuart"
                                        })) : (d.animate({
                                            "margin-top": "-215px"
                                        },
                                        {
                                            duration: 500,
                                            easing: "easeOutQuart"
                                        }), c.hide().slideDown({
                                        duration: 500,
                                        easing: "easeOutQuart"
                                    }), c.closest(".animate-layer").animate({
                                            height: "370px"
                                        },
                                        {
                                            duration: 500,
                                            easing: "easeOutQuart"
                                        })),
                                        a(function() {
                                                c.find("input").val("").focus()
                                            },
                                            500)
                                } else c.hide()
                            })
                    }
                }
            }]).directive("iAnimation", [function() {
            return {
                restrict: "A",
                link: function(a, b, c) {
                    a.$watch(c.iAnimation,
                        function(c) {
                            c && (b.stop(!0).animate({
                                    left: "-15px"
                                },
                                50).animate({
                                    left: "20px"
                                },
                                80).animate({
                                    left: "-10px"
                                },
                                80).animate({
                                    left: "5px"
                                },
                                80).animate({
                                    left: "0px"
                                },
                                80), a.animationTip && (a.animationTip = !1))
                        })
                }
            }
        }]).directive("iEnter", [function() {
            return function(a, b, c) {
                b.bind("keydown keypress",
                    function(b) {
                        13 == b.which && (a.$apply(function() {
                            a.$eval(c.iEnter, {
                                event: b
                            })
                        }), b.preventDefault())
                    })
            }
        }]).directive("limitLength", [function() {
            return {
                restrict: "A",
                require: "ngModel",
                link: function(a, b, c, d) {
                    d.$parsers.push(function(a) {
                        return a && a.length != +c.limitLength ? void d.$setValidity("limitlength", !1) : (d.$setValidity("limitlength", !0), a)
                    })
                }
            }
        }]).directive("inputRadius", [function() {
            return {
                restrict: "A",
                link: function(a, b) {
                    b.find(".verify-error").on("click",
                        function() {
                            b.find("input").focus()
                        }),
                        jQuery.support.leadingWhitespace || b.find(":first").before('<div class="radius-left"></div><div class="radius-center"></div><div class="radius-right"></div>')
                }
            }
        }]).directive("btnRadius", [function() {
            return {
                restrict: "A",
                link: function(a, b) {
                    b.find(":first").before('<div class="radius-left"></div><div class="radius-right"></div>')
                }
            }
        }]).directive("iLabel", [function() {
            return {
                restrict: "A",
                link: function(a, b, c) {
                    b.on("click",
                        function() {
                            $(c.iLabel).focus()
                        })
                }
            }
        }]).directive("iCheck", [function() {
            return {
                restrict: "A",
                scope: {
                    checkCallBack: "="
                },
                require: "ngModel",
                link: function(a, b, c, d) {
                    b.on("blur",
                        function() {
                            a.$apply(function() {
                                d.$viewValue && d.$valid && a.checkCallBack()
                            })
                        })
                }
            }
        }]),
    preSaleAppDirective.directive("deliveryAddressForm", ["$route", "$compile", "$timeout", "DeliveryAddressService", "OrderService", "ToolArray", "PluginDialog", "Pagemap", "MainConfig",
        function(a, b, c, d, e, f, g, h, i) {
            return {
                restrict: "A",
                templateUrl: h.directive.addressForm,
                transclude: !0,
                scope: {
                    singleAddress: "="
                },
                name: "ModuleAddressForm",
                controller: ["$scope", "$element", "$attrs", "$transclude",
                    function(b) {
                        b.initArea = function() {
                            d.getAllProvince().then(function(a) {
                                    b.dataProvince = a,
                                        b.singleAddress.province_code || (b.singleAddress.province_code = a[0].area_id),
                                        b.changeProvince()
                                },
                                function() {})
                        },
                            b.changeProvince = function() {
                                a.current.params.orderID,
                                    a.current.loadedTemplateUrl;
                                b.singleAddress.province = f.getArrayBykey(d.areaProvince, b.singleAddress.province_code, "area_id").area_name,
                                    d.getCity(b.singleAddress.province_code).then(function(a) {
                                            b.dataCity = a,
                                                b.singleAddress.city_code && f.isHave(a, b.singleAddress.city_code, "area_id") || (b.singleAddress.city_code = a[0].area_id),
                                                b.changeCity()
                                        },
                                        function() {})
                            },
                            b.changeCity = function() {
                                var c = a.current.params.orderID,
                                    j = a.current.loadedTemplateUrl;
                                b.singleAddress.city = f.getArrayBykey(d.areaCity, b.singleAddress.city_code, "area_id").area_name,
                                    0 != g.showList.length || !j.match(/checkout/) || e.addressTips[c] || "0" == b.singleAddress.city_code || i.cityWhiteMap[b.singleAddress.city_code] || (e.addressTips[c] = !0, g.create({
                                    mark: "addressError",
                                    controller: "DialogErrorCtrl",
                                    dialogClass: "module-dialog-error",
                                    title: "提示信息",
                                    templateUrl: h.dialog.addressError,
                                    hasBtn: !1
                                }).show()),
                                    d.getDistrict(b.singleAddress.city_code).then(function(a) {
                                            b.dataDistrict = a,
                                                b.singleAddress.district_code && f.isHave(a, b.singleAddress.district_code, "area_id") || (b.singleAddress.district_code = a[0].area_id)
                                        },
                                        function() {})
                            },
                            b.changeDistrict = function() {
                                b.singleAddress.district = f.getArrayBykey(d.areaDistrict, b.singleAddress.district_code, "area_id").area_name
                            },
                            b.$watch("singleAddress.init",
                                function(a) {
                                    a && b.initArea()
                                },
                                !0)
                    }],
                link: function(a, b) {
                    b.addClass("address-form fn-clear"),
                        c(function() {
                            b.find("input").trigger("doVerify")
                        })
                }
            }
        }]).directive("openAddressDialog", ["$rootScope", "$timeout", "DeliveryAddressService", "PluginDialog",
        function(a, b, c, d) {
            return {
                restrict: "A",
                link: function(b, e, f) {
                    var g = {};
                    e.on("click",
                        function() {
                            "orderEdit" != f.manageType ? c.getList().then(function() {
                                switch (f.manageType) {
                                    case "manage":
                                        g = c.addresses.length ? {
                                            title: "管理收货地址",
                                            type: "list"
                                        }: {
                                            title: "添加收货地址",
                                            type: "add",
                                            singleAddress: angular.extend({},
                                                {
                                                    init: !0
                                                })
                                        };
                                        break;
                                    case "choose":
                                        if (!c.addresses.length) return d.message({
                                            message: "您的送货地址列表为空"
                                        }),
                                            !1;
                                        g = {
                                            title: "选择收货地址",
                                            type: "choose",
                                            orderIndex: b.$parent.$parent.$index
                                        }
                                }
                                g.manageType = f.manageType,
                                    a.openAddressDialog().setScope(function(a) {
                                        return angular.extend(a.config, g),
                                            a
                                    }).show()
                            }) : (g = {
                                title: "修改收货信息",
                                type: "edit",
                                singleAddress: angular.extend({},
                                    b.address, {
                                        _index: b.$index,
                                        init: !0
                                    })
                            },
                                g.manageType = f.manageType, a.openAddressDialog().setScope(function(a) {
                                return angular.extend(a.config, g),
                                    a
                            }).show())
                        })
                }
            }
        }]).directive("dialogLinkAddAddress", ["VerifyAction", "PluginAnimate", "PluginDialog", "DeliveryAddressService",
        function(a, b, c) {
            return {
                restrict: "A",
                link: function(a, d) {
                    d.on("click",
                        function() {
                            var e = d.closest(".module-dialog"),
                                f = e.find(".dialog-con"),
                                g = f.find(".js-address-list"),
                                h = f.find(".js-address-add");
                            return g.find(".address-list-item:visible").length >= 10 ? (c.message({
                                message: "最多只能有10个收货地址"
                            }), !1) : (a.$apply(function() {
                                a.config.type = "add",
                                    a.config.title = "添加收货地址",
                                    a.$parent.singleAddress.init = !0,
                                    h.find(".module-form-item-wrapper").trigger("reset")
                            }), h.hide(), g.show(), g.hide(), void b.dialogCurover({
                                dialog: e,
                                targetPanel: h,
                                conHeight: 470,
                                dialogTop: 265
                            }))

                        })
                }
            }
        }]).directive("dialogRemoveAddressBtn", ["$timeout", "$document", "PluginAnimate", "DeliveryAddressService",
        function(a, b, c, d) {
            return {
                restrict: "A",
                link: function(c, e) {
                    e.on("click",
                        function() {
                            if (e.hasClass("delete-address-on")) {
                                var f = e.closest(".js-address-list"),
                                    g = f.data("ui-scroll");
                                d.removeAddress(c.address.id).then(function() {
                                        c.$index;
                                        e.closest(".address-list-item").slideUp({
                                            duration: 200,
                                            easing: "easeOutQuart",
                                            complete: function() {
                                                c.$apply(function() {}),
                                                    a(function() {
                                                        var a = f.find(".js-scroll-container").innerHeight() - 0;
                                                        g.reset(void 0, a)
                                                    })
                                            }
                                        })
                                    },
                                    function() {})
                            } else e.addClass("delete-address-on"),
                                e.find("b").animate({
                                        opacity: "0"
                                    },
                                    {
                                        duration: 200,
                                        easing: "easeOutQuart"
                                    }),
                                e.animate({
                                        width: "61px"
                                    },
                                    {
                                        duration: 200,
                                        easing: "easeOutQuart"
                                    }),
                                e.find("i").css({
                                    width: "61px"
                                }).animate({
                                        opacity: "1"
                                    },
                                    {
                                        duration: 300,
                                        easing: "easeOutQuart",
                                        complete: function() {
                                            b.one("click",
                                                function() {
                                                    e.removeClass("delete-address-on"),
                                                        e.find("b").animate({
                                                                opacity: "1"
                                                            },
                                                            {
                                                                duration: 200,
                                                                easing: "easeOutQuart"
                                                            }),
                                                        e.animate({
                                                                width: "26px"
                                                            },
                                                            {
                                                                duration: 200,
                                                                easing: "easeOutQuart"
                                                            }),
                                                        e.find("i").css({
                                                            width: "26px"
                                                        }).animate({
                                                                opacity: "0"
                                                            },
                                                            {
                                                                duration: 300,
                                                                easing: "easeOutQuart"
                                                            })
                                                })
                                        }
                                    })
                        })
                }
            }
        }]).directive("dialogEditAddressBtn", ["$timeout", "PluginAnimate", "DeliveryAddressService",
        function(a) {
            return {
                restrict: "A",
                link: function(b, c) {
                    c.on("click",
                        function() {
                            var d = c.closest(".address-list-item"),
                                e = c.closest(".js-address-list"),
                                f = e.data("ui-scroll"),
                                g = e.find(".js-scroll-container").innerHeight() - 0,
                                h = c.closest("table").hide(),
                                i = h.siblings(".add-address-form"),
                                j = d.position().top - 20;
                            b.backAddress = angular.extend({},
                                b.address, {
                                    init: !1
                                }),
                                b.$apply(function() {
                                    b.address.init = !0
                                }),
                                d.animate({
                                        height: "305px"
                                    },
                                    {
                                        duration: 600,
                                        easing: "easeOutQuart",
                                        complete: function() {
                                            Modernizr.opacity ? i.css("opacity", 0).show().animate({
                                                    opacity: 1
                                                },
                                                {
                                                    duration: 1e3,
                                                    easing: "easeOutQuart"
                                                }).find("input:first").focus() : i.show().find("input:first").focus(),
                                                a(function() {
                                                    i.find(".module-form-item-wrapper").trigger("clearError")
                                                })
                                        }
                                    }),
                                f.reset(void 0, g + 309).scrollTop(j)
                        })
                }
            }
        }]).directive("dialogSaveListAddress", ["VerifyAction", "PluginAnimate", "DeliveryAddressService",
        function(a, b, c) {
            return {
                restrict: "A",
                link: function(b, d, e) {
                    d.on("click",
                        function() {
                            var f = d.closest(".address-list-item"),
                                g = d.closest(".js-address-list"),
                                h = g.data("ui-scroll"),
                                i = g.find(".js-scroll-container").innerHeight() - 0,
                                j = f.find("table"),
                                k = f.position().top - 20,
                                l = a.doVerify(b[e.formName]);
                            l && c.updateAddress(b.singleAddress).then(function(a) {
                                c.addresses.splice(b.$index, 1, a),
                                    b.address = a,
                                    b.singleAddress = a,
                                    j.siblings(".add-address-form").hide(),
                                    f.animate({
                                            height: "75px"
                                        },
                                        {
                                            duration: 600,
                                            easing: "easeOutQuart",
                                            complete: function() {
                                                j.show(),
                                                    Modernizr.opacity && j.animate({
                                                        opacity: 1
                                                    },
                                                    {
                                                        duration: 1e3,
                                                        easing: "easeOutQuart"
                                                    })
                                            }
                                        }),
                                    h.reset(void 0, i - 230),
                                    h.scrollTop(h.isRun ? k: 0)
                            })
                        })
                }
            }
        }]).directive("dialogCancelListAddress", ["VerifyAction", "PluginAnimate", "DeliveryAddressService",
        function() {
            return {
                restrict: "A",
                link: function(a, b) {
                    b.on("click",
                        function() {
                            a.$apply(function() {
                                a.address = a.backAddress,
                                    a.singleAddress = a.backAddress
                            });
                            var c = b.closest(".address-list-item"),
                                d = b.closest(".js-address-list"),
                                e = d.data("ui-scroll"),
                                f = d.find(".js-scroll-container").innerHeight() - 0,
                                g = c.find("table"),
                                h = c.position().top - 20;
                            g.siblings(".add-address-form").hide(),
                                c.animate({
                                        height: "75px"
                                    },
                                    {
                                        duration: 600,
                                        easing: "easeOutQuart",
                                        complete: function() {
                                            g.show(),
                                                Modernizr.opacity && g.animate({
                                                    opacity: 1
                                                },
                                                {
                                                    duration: 1e3,
                                                    easing: "easeOutQuart"
                                                })
                                        }
                                    }),
                                e.reset(void 0, f - 230),
                                e.scrollTop(e.isRun ? h: 0)
                        })
                }
            }
        }]).directive("dialogSaveSingleAddress", ["$timeout", "$rootScope", "$route", "VerifyAction", "PluginAnimate", "DeliveryAddressService", "OrderService", "PluginDialog", "MainConfig", "Pagemap",
        function(a, b, c, d, e, f, g, h, i, j) {
            return {
                restrict: "A",
                link: function(b, k, l) {
                    k.on("click",
                        function() {
                            var m = k.closest(".module-dialog"),
                                n = m.find(".dialog-con"),
                                o = n.find(".js-address-list"),
                                p = n.find(".js-address-add"),
                                q = b.config.manageType,
                                r = d.doVerify(b[l.formName]);
                            if (r) {
                                {
                                    b.config.type
                                }
                                switch (q) {
                                    case "manage":
                                        f.addAddress(b.singleAddress).then(function(c) {
                                                f.addresses.unshift(c),
                                                    b.config.type = "list",
                                                    b.config.title = "管理收货地址",
                                                    a(function() {
                                                        var a = o.find(".js-scroll-container").innerHeight();
                                                        o.data("ui-scroll").reset(void 0, a).scrollTop(0)
                                                    }),
                                                    b.resetAddress(),
                                                    o.hide().css("opacity", "0"),
                                                    p.show(),
                                                    p.animate({
                                                            opacity: "0"
                                                        },
                                                        300,
                                                        function() {
                                                            p.hide().css({
                                                                opacity: "1"
                                                            })
                                                        }),
                                                    p.find("input:text").trigger("reset"),
                                                    e.dialogCurover({
                                                        dialog: m,
                                                        targetPanel: o,
                                                        conHeight: 470,
                                                        dialogTop: 265
                                                    })
                                            },
                                            function() {});
                                        break;
                                    case "orderEdit":
                                        f.updateAddress(b.singleAddress).then(function(d) {
                                                f.addresses.splice(b.singleAddress._index, 1, d),
                                                    b.closeDialog();
                                                var e = c.current.params.orderID,
                                                    k = c.current.loadedTemplateUrl;
                                                0 != h.showList.length || !k.match(/checkout/) || g.addressTips[e] || i.cityWhiteMap[b.singleAddress.city_code] || a(function() {
                                                    g.addressTips[e] = !0,
                                                        h.create({
                                                            mark: "addressError",
                                                            controller: "DialogErrorCtrl",
                                                            dialogClass: "module-dialog-error",
                                                            title: "提示信息",
                                                            templateUrl: j.dialog.addressError,
                                                            hasBtn: !1
                                                        }).show()
                                                })
                                            },
                                            function() {})
                                }
                            }
                        })
                }
            }
        }]).directive("dialogCancelSingleAddress", ["$rootScope", "VerifyAction", "PluginAnimate", "DeliveryAddressService",
        function(a, b, c, d) {
            return {
                restrict: "A",
                link: function(a, b) {
                    b.on("click",
                        function() {
                            {
                                var e = b.closest(".module-dialog"),
                                    f = e.find(".dialog-con"),
                                    g = f.find(".js-address-list"),
                                    h = f.find(".js-address-add"),
                                    i = a.config.manageType;
                                a.config.type
                            }
                            switch (i) {
                                case "manage":
                                    d.addresses.length ? (a.$apply(function() {
                                        a.config.type = "list",
                                            a.config.title = "管理收货地址",
                                            a.resetAddress(),
                                            h.find("input:text").trigger("reset")
                                    }), g.hide(), h.show(), Modernizr.opacity ? h.animate({
                                            opacity: "0"
                                        },
                                        300,
                                        function() {
                                            h.hide().css({
                                                opacity: "1"
                                            })
                                        }) : h.hide(), c.dialogCurover({
                                        dialog: e,
                                        targetPanel: g,
                                        conHeight: 470,
                                        dialogTop: 265
                                    })) : a.closeDialog();
                                    break;
                                case "orderEdit":
                                    a.closeDialog()
                            }
                        })
                }
            }
        }]).directive("dialogChooseAddressBtn", ["$rootScope", "VerifyAction", "PluginAnimate", "DeliveryAddressService",
        function() {
            return {
                restrict: "A",
                link: function(a, b) {
                    b.on("click",
                        function() {
                            var b = {
                                index: a.config.orderIndex,
                                address: a.address
                            };
                            a.$emit("order:chooseAddress", b),
                                a.closeDialog()
                        })
                }
            }
        }]),
    preSaleAppDirective.directive("showMobileCodeDialog", ["$rootScope",
        function(a) {
            return {
                restrict: "A",
                link: function(b, c) {
                    c.on("click",
                        function() {
                            a.mobileCodeDialog().show()
                        })
                }
            }
        }]).directive("verifyMobileCodeBtn", ["OrderService", "VerifyAction",
        function(a, b) {
            return {
                restrict: "A",
                require: "^form",
                link: function(c, d, e, f) {
                    d.on("click",
                        function() {
                            var e = d.closest(".module-dialog"),
                                g = e.find(".js-test-mobile-code-wrapper"),
                                h = e.find(".js-use-mobile-code-wrapper"),
                                i = e.find(".js-invalid-mobile-code-wrapper"),
                                j = b.doVerify(f);
                            j && a.verifyMobileCode(c.mobileCode, c.mobileCodeVerify).then(function(a) {
                                    c.$parent.phone = a.phone,
                                        c.$parent.discountAmount = a.money,
                                        g.fadeOut(300,
                                            function() {
                                                h.fadeIn(300)
                                            })
                                },
                                function(a) {
                                    a.errInfo[1017] && (b.doCustomError(f, f.verify, "不正确"), e.find('[name="verify"]').val("").focus()),
                                        a.errInfo[1006] && (Modernizr.opacity ? g.fadeOut(300,
                                        function() {
                                            i.fadeIn(300)
                                        }) : (g.hide(), i.show()))
                                })["finally"](function() {
                                c.$parent.time = (new Date).getTime()
                            })
                        })
                }
            }
        }]).directive("returnMobileCodeBtn", [function() {
        return {
            restrict: "A",
            link: function(a, b) {
                b.on("click",
                    function() {
                        var c = b.closest(".module-dialog"),
                            d = c.find(".js-test-mobile-code-wrapper"),
                            e = c.find(".js-invalid-mobile-code-wrapper");
                        a.$apply(function() {
                            a.mobileCode = "",
                                a.mobileCodeVerify = ""
                        }),
                            c.find("input").trigger("reset"),
                            Modernizr.opacity ? e.fadeOut(300,
                                function() {
                                    d.fadeIn(300)
                                }) : (e.hide(), d.show())
                    })
            }
        }
    }]),
    preSaleAppDirective.directive("createOrder", ["$location", "OrderService",
        function(a, b) {
            return {
                restrict: "A",
                link: function(c, d) {
                    d.on("click",
                        function() {
                            b.createTempOrder("1").then(function(b) {
                                b.canBuy && a.path("/checkout/" + b.id)
                            })
                        })
                }
            }
        }]).directive("singleOrderItem", ["$rootScope", "$timeout", "$filter", "ModelOrder", "UserService", "OrderService", "VerifyAction", "Pagemap", "ToolDate", "PluginAnimate", "PluginDialog",
        function(a, b, c, d, e, f, g, h, i, j, k) {
            return {
                restrict: "A",
                templateUrl: h.directive.orderStatus,
                transclude: !0,
                scope: {
                    processStatus: "=",
                    orderStatus: "=",
                    payType: "=",
                    order: "=",
                    addresses: "="
                },
                controller: ["$scope", "$element", "$attrs", "$transclude",
                    function(d, e) {
                        var j = 4,
                            l = d.order.create_time;
                        1 == d.order.pay_type && d.orderStatus < 4 && (j = 5),
                            d.step = j,
                            d.width = 930 / j,
                            d.strRemainingTime = "";
                        var m = d.order.now_time,
                            n = function() {
                                var a = 864e5 - (m - l);
                                m += 1e3,
                                        a > 0 ? (d.strRemainingTime = i.realtime(a / 1e3), b(function() {
                                        n()
                                    },
                                    1e3)) : (e.closest(".gray-box").find(".confirm-last").click(), b(function() {
                                        d.isCancel = !0,
                                            d.canCancel = !1,
                                            d.canUpdate = !1,
                                            d.isNormalProcess = !1,
                                            d.orderStatus = 5,
                                            d.orderStatusLabel = "订单已关闭",
                                            d.order.end_time = d.order.create_time - 0 + 864e5,
                                            d.isNormalCancel = !0,
                                            e.find(".js-trigger-update-btn").remove()
                                    },
                                    700))
                            };
                        0 == d.orderStatus && n();
                        var o = 1 == d.order.pay_type ? d.processStatus: d.processStatus - 1 > 0 ? d.processStatus - 1: 0;
                        switch (d.processWidth = o * d.width, d.isCancel = d.orderStatus < 4 ? !1: !0, d.isNormalProcess = d.orderStatus < 3, d.isNormalCancel = 5 == d.orderStatus && 0 == d.order.refund_status, d.isRefundCancel = d.orderStatus > 3 && d.processStatus > 0, d.isRefundCancel && (d.processWidth = 5 == d.orderStatus ? j * d.width: 0 == d.order.refund_status ? 2 * d.width: 3 * d.width), d.orderStatus) {
                            case "3":
                                d.orderStatusLabel = "交易成功";
                                break;
                            case "4":
                                switch (d.order.refund_status) {
                                    case "0":
                                        d.orderStatusLabel = "提交退款申请，正在审核";
                                        break;
                                    case "1":
                                        d.orderStatusLabel = "退款申请已审核，正在退款"
                                }
                                break;
                            case "5":
                                d.orderStatusLabel = d.isNormalCancel ? "已取消订单": "订单已关闭";
                                break;
                            default:
                                if (!d.isCancel) switch (d.processStatus) {
                                    case "0":
                                        d.orderStatusLabel = 1 == d.order.pay_type ? "已下单，等待支付预付款 ￥300": "已下单，等待付款 " + c("rmb")(d.order.order_amount);
                                        break;
                                    case "1":
                                        d.orderStatusLabel = "等待补齐余款 ￥" + (100 * d.order.order_amount - 100 * d.order.real_amount) / 100;
                                        break;
                                    case "2":
                                        d.orderStatusLabel = "已付款，等待发货";
                                        break;
                                    case "3":
                                        d.orderStatusLabel = "配货中";
                                        break;
                                    case "4":
                                        d.orderStatusLabel = "已发货，等待收货";
                                        break;
                                    case "5":
                                        d.orderStatusLabel = "交易成功"
                                }
                        }
                        d.canCancel = d.processStatus < 3 && d.orderStatus < 3,
                            d.canUpdate = d.processStatus < 3 && d.orderStatus < 4,
                            d.singleAddress = {
                                order_id: d.order.order_id,
                                accept_name: d.order.accept_name,
                                mobile: d.order.mobile,
                                area_code: d.order.area_code,
                                telphone: d.order.telphone,
                                province: d.order.province,
                                province_code: d.order.province_code,
                                city: d.order.city,
                                city_code: d.order.city_code,
                                district: d.order.district,
                                district_code: d.order.district_code,
                                street: d.order.street,
                                floor: d.order.floor,
                                post_code: d.order.post_code
                            },
                            d.baseAddress = {},
                            d.invoiceData = {
                                order_id: d.order.order_id,
                                invoice: 1,
                                invoice_type: d.order.invoice_type,
                                invoice_title: d.order.invoice_title
                            },
                            d.baseInvoice = {},
                            d.mobileData = {
                                order_id: d.order.order_id,
                                notice_mobile: d.order.notice_mobile
                            },
                            d.baseMobile = "";
                        var p = function(b) {
                            f.canUpdate().then(function(a) {
                                    a && b()
                                },
                                function(c) {
                                    c.errInfo[1e3] || k.create({
                                        mark: "verifyUpdate",
                                        controller: "DialogVerifyUpdateCtrl",
                                        dialogClass: "module-dialog-verify-update",
                                        title: "安全验证",
                                        templateUrl: h.dialog.verifyUpdate,
                                        hasBtn: !1,
                                        autoReset: !0,
                                        params: {
                                            type: "mobile",
                                            label: c.data.cellphone
                                        },
                                        openFun: function(b, c) {
                                            a.competenceCallback.push(c)
                                        },
                                        closeFun: function() {
                                            a.competenceCallback.pop()
                                        }
                                    }).show(b)
                                })
                        };
                        d.cancelOrder = function() {
                            p(function() {
                                k.confirm({
                                    message: "取消订单，会使您本次的订单排队失效，是否确认取消订单",
                                    messageClass: "high-warning",
                                    ok: function(a) {
                                        f.cancelOrder(d.order.order_id).then(function(a) {
                                            0 == d.orderStatus && e.closest(".gray-box").find(".confirm-last").click(),
                                                b(function() {
                                                        d.canCancel = !1,
                                                            d.canUpdate = !1,
                                                            d.isCancel = !0,
                                                            d.isNormalProcess = !1,
                                                                d.orderStatus > 0 ? (d.step = 4, d.width = 930 / d.step, d.orderStatus = 4, d.refund_status = 0, d.isRefundCancel = !0, d.processWidth = 2 * d.width, d.orderStatusLabel = "退款申请已提交，请等待", d.order.cancel_time = 1e3 * a.time) : (d.orderStatus = 5, d.isNormalCancel = !0, d.orderStatusLabel = "已取消订单", d.order.end_time = 1e3 * a.time),
                                                            e.find(".js-trigger-update-btn").remove()
                                                    },
                                                    700)
                                        }),
                                            a.close()
                                    }
                                })
                            })
                        },
                            d.updateAddress = {
                                open: function(a) {
                                    p(function() {
                                        b(function() {
                                            d.singleAddress.init = !0
                                        }),
                                            d.baseAddress = angular.copy(d.singleAddress),
                                            a()
                                    })
                                },
                                update: function(a, b) {
                                    var c = g.doVerify(d.addressForm, b);
                                    c && f.updateOrderAddress(d.singleAddress).then(function(b) {
                                        angular.extend(d.singleAddress, b),
                                            a()
                                    })
                                },
                                cancel: function(a) {
                                    d.$apply(function() {
                                        d.singleAddress = d.baseAddress
                                    }),
                                        a()
                                }
                            },
                            d.updateInvoice = {
                                open: function(a) {
                                    d.baseInvoice = angular.copy(d.invoiceData),
                                        a()
                                },
                                update: function(a, b) {
                                    0 == d.invoiceData.invoice_type && (d.invoiceData.invoice_title = "", d.$$childTail.invoiceForm.invoiceDetail.$setValidity("required", !0));
                                    var c = g.doVerify(d.invoiceForm, b);
                                    c && f.updateOrderInvoice(d.invoiceData).then(function(b) {
                                        d.invoiceData.invoice_title = b.invoice_title,
                                            a()
                                    })
                                },
                                cancel: function(a) {
                                    d.$apply(function() {
                                        d.invoiceData = d.baseInvoice
                                    }),
                                        a()
                                }
                            },
                            d.updateMobile = {
                                open: function(a) {
                                    d.baseMobile = angular.copy(d.mobileData),
                                        a()
                                },
                                update: function(a, b) {
                                    var c = g.doVerify(d.mobileForm, b);
                                    c && f.updateOrderMobile(d.mobileData).then(function(b) {
                                        angular.extend(d.mobileData, b),
                                            a()
                                    })
                                },
                                cancel: function(a) {
                                    d.$apply(function() {
                                        d.mobileData = d.baseMobile
                                    }),
                                        a()
                                }
                            },
                            d.chooseInvoice = function(a) {
                                b(function() {
                                    d.invoiceData.invoice_type = a,
                                            1 == a ? (d.invoiceData.invoice_title = "", d.$$childTail.invoiceForm.invoiceDetail.$setValidity("required", !1)) : (d.invoiceData.invoice_title = "", d.$$childTail.invoiceForm.invoiceDetail.$setValidity("required", !0), g.doVerify(d.$$childTail.invoiceForm))
                                })
                            },
                            d.$on("order:pushChooseAddress",
                                function(a, b) {
                                    d.$parent.$index == b.index && (d.$apply(function() {
                                        d.singleAddress = angular.copy(b.address),
                                            d.singleAddress.order_id = d.order.order_id
                                    }), d.singleAddress.init = !0)
                                })
                    }],
                link: function(a, b) {
                    b.on("click", ".js-trigger-update-btn",
                        function() {
                            var b = jQuery(this),
                                c = a.$eval(b.data("method"));
                            c(function() {
                                j.openUpdatePanel(b)
                            })
                        }),
                        b.on("click", ".js-close-update-btn",
                            function() {
                                var b = jQuery(this),
                                    c = a.$eval(b.data("method"));
                                c(function() {
                                        j.closeUpdatePanel(b)
                                    },
                                    b.closest(".order-update-form"))
                            })
                }
            }
        }]).directive("chooseAddress", ["$document", "$timeout",
        function(a, b) {
            return function(a, c) {
                b(function() {
                    c.on("mousedown",
                        function() {
                            var a = angular.element(this);
                            a.css({
                                background: "#e6e7e8"
                            }),
                                $(document).one("mouseup",
                                    function() {
                                        a.attr({
                                            style: ""
                                        })
                                    })
                        })
                })
            }
        }]).directive("choosePayType", ["$timeout",
        function(a) {
            return {
                restrict: "A",
                link: function(b, c) {
                    c.on("click", ".payment-title",
                        function() {
                            var b = jQuery(this).closest(".module-payment-wrapper");
                            if (b.find(".payment-container").is(":visible")) return ! 1;
                            var d = c.closest(".dialog-inner"),
                                e = d.data("ui-scroll"),
                                f = b.siblings(".module-payment-wrapper");
                            Modernizr.opacity ? (c.find(".payment-inner").animate({
                                    opacity: "0"
                                },
                                {
                                    duration: 500,
                                    easing: "easeOutQuart"
                                }), f.find(".payment-container").slideUp({
                                duration: 500,
                                easing: "easeOutQuart"
                            }), b.find(".payment-inner").animate({
                                    opacity: "1"
                                },
                                {
                                    duration: 500,
                                    easing: "easeOutQuart"
                                }), b.find(".payment-container").slideDown({
                                duration: 500,
                                easing: "easeOutQuart"
                            })) : (f.find(".payment-container").hide(), b.find(".payment-container").show()),
                                a(function() {
                                        var a = d.find(".js-scroll-container").innerHeight() - 0;
                                        e && e.reset(void 0, a)
                                    },
                                    500)
                        })
                }
            }
        }]).directive("toggleOrderInfo", [function() {
        return {
            restrict: "A",
            link: function(a, b) {
                b.on("click",
                    function() {
                        var a = jQuery(this),
                            b = a.find(".confirm-info"),
                            c = a.next(".order-info-wrapper"),
                            d = 0;
                        return c.is(":animated") ? !1: (d = 0 != c.height() ? c.height() : c.data("height"), c.data("height", d), void(a.hasClass("opened") ? (b.text("显示订单详情"), a.removeClass("opened"), Modernizr.opacity ? c.animate({
                                height: 0,
                                opacity: 0
                            },
                            {
                                duration: 600,
                                easing: "easeOutQuart"
                            }) : c.hide()) : (b.text("隐藏订单详情"), a.addClass("opened"), c.show(), Modernizr.opacity && c.css({
                            height: 0,
                            opacity: 0
                        }).animate({
                                height: d,
                                opacity: 1
                            },
                            {
                                duration: 700,
                                easing: "easeOutQuart"
                            }))))
                    })
            }
        }
    }]).directive("cancelOrder", ["OrderService", "PluginDialog",
        function(a, b) {
            return {
                restrict: "A",
                link: function(c, d) {
                    d.on("click",
                        function() {
                            b.confirm({
                                message: "确认取消订单么",
                                ok: function(d) {
                                    a.cancelOrder(c.orderId).then(function() {
                                            c.order.orderStatus = "9",
                                                d.close()
                                        },
                                        function() {
                                            b.message({
                                                message: "支付出现错误，请重新尝试"
                                            })
                                        })
                                }
                            })
                        })
                }
            }
        }]).directive("doPayment", ["$window", "OrderService", "MainConfig", "Pagemap", "PluginDialog",
        function(a, b, c, d, e) {
            return {
                restrict: "A",
                scope: {
                    payOrder: "="
                },
                link: function(b, f) {
                    f.on("click",
                        function() {
                            var f = angular.extend({},
                                    b.payOrder),
                                g = {
                                    mark: "payment",
                                    controller: "DialogPaymentCtrl",
                                    dialogClass: "module-popup-payment",
                                    title: "支付",
                                    templateUrl: d.dialog.payment,
                                    hasBtn: !1,
                                    params: {
                                        orderID: b.orderId,
                                        type: f.distribution_status < 1 ? "paymentConfirm": "paymentType",
                                        conHeight: {
                                            height: f.distribution_status < 1 ? "257px": "437px"
                                        },
                                        autoLinkTime: 60,
                                        orderInfo: f
                                    }
                                };
                            e.create(g).show();
                            var h = 2;
                            1 == f.pay_type && f.pay_status < 1 && (h = 1);
                            var i = (100 * f.order_amount - 100 * f.real_amount) / 100;
                            if (f.distribution_status < 1) {
                                var j = f.bank ? "&bank=" + f.bank: "",
                                    k = f.ped_cnt ? "&ped_cnt=" + f.ped_cnt: "",
                                    l = k ? k: j;
                                a.open(c.paymentUrl + "pay/pay&order_id=" + f.order_id + "&pay_type=" + h + "&pay_channel_type=" + f.pay_channel_type + l + "&pay_money=" + i)
                            }
                        })
                }
            }
        }]).directive("dialogDoPaymentComplete", ["OrderService", "PluginDialog", "PluginAnimate",
        function(a, b, c) {
            return {
                restrict: "A",
                link: function(b, d) {
                    var e = d.closest(".module-dialog"),
                        f = e.find(".payment"),
                        g = e.find(".payment-complete");
                    d.on("click",
                        function() {
                            a.isPaymentComplete(b.$parent.orderInfo.order_id).then(function(a) {
                                    a > b.orderInfo.pay_status ? (b.config.paymentFail = !1, b.config.title = "完成支付") : (b.config.paymentFail = !0, b.config.title = "支付失败"),
                                        b.config.type = "paymentComplete",
                                        f.hide(),
                                        g.hide(),
                                        c.dialogCurover({
                                            dialog: e,
                                            targetPanel: g,
                                            conHeight: 471,
                                            dialogTop: 270
                                        }),
                                        b.doAutoLink()
                                },
                                function() {
                                    b.defHideDialog()
                                })
                        })
                }
            }
        }]).directive("dialogDoPaymentType", ["OrderService", "PluginDialog", "PluginAnimate",
        function(a, b, c) {
            return {
                restrict: "A",
                link: function(a, b) {
                    var d = b.closest(".module-dialog"),
                        e = d.find(".payment"),
                        f = d.find(".payment-type");
                    b.on("click",
                        function() {
                            var b = f.data("ui-scroll");
                            b.scrollTop(0),
                                a.$apply(function() {
                                    a.config.title = "选择支付方式",
                                        a.config.type = "paymentType",
                                        a.choosePayType("online")
                                }),
                                e.hide(),
                                f.hide(),
                                c.dialogCurover({
                                    dialog: d,
                                    targetPanel: f,
                                    conHeight: 437,
                                    dialogTop: 253
                                })
                        })
                }
            }
        }]).directive("dialogDoPaymentNow", ["$window", "OrderService", "MainConfig", "PluginDialog", "PluginAnimate",
        function(a, b, c, d, e) {
            return {
                restrict: "A",
                link: function(b, d) {
                    var f = d.closest(".module-dialog"),
                        g = f.find(".payment"),
                        h = f.find(".payment-type");
                    d.on("click",
                        function() {
                            var d = b.orderInfo,
                                i = 2;
                            1 == d.pay_type && d.pay_status < 1 && (i = 1);
                            var j = (100 * d.order_amount - 100 * d.real_amount) / 100,
                                k = /^.*\_/gi;
                            delete d.bank,
                                delete d.ped_cnt,
                                "string" == typeof d.pay_channel_type && d.pay_channel_type.match(k) && ("installment" == b.payMenuType ? (d.ped_cnt = d.pay_channel_type.replace(k, ""), d.pay_channel_type = 4) : (d.bank = d.pay_channel_type.replace(k, ""), d.pay_channel_type = 5));
                            var l = d.bank ? "&bank=" + d.bank: "",
                                m = d.ped_cnt ? "&ped_cnt=" + d.ped_cnt: "",
                                n = m ? m: l;
                            a.open(c.paymentUrl + "pay/pay&order_id=" + d.order_id + "&pay_type=" + i + "&pay_channel_type=" + d.pay_channel_type + n + "&pay_money=" + j),
                                h.hide(),
                                b.config.type = "paymentConfirm",
                                g.hide(),
                                e.dialogCurover({
                                    dialog: f,
                                    targetPanel: g,
                                    conHeight: 257,
                                    dialogTop: 163
                                })
                        })
                }
            }
        }]).directive("openUpdateOrderAddressBtn", ["OrderService", "PluginAnimate",
        function(a, b) {
            return {
                restrict: "A",
                link: function(a, c) {
                    c.on("click",
                        function() {
                            b.openUpdatePanel(c)
                        })
                }
            }
        }]).directive("updateOrderAddressBtn", ["OrderService", "PluginAnimate",
        function(a, b) {
            return {
                restrict: "A",
                link: function(a, c) {
                    c.on("click",
                        function() {
                            b.closeUpdatePanel(c)
                        })
                }
            }
        }]).directive("openUpdateOrderInvoiceBtn", ["OrderService", "PluginAnimate",
        function(a, b) {
            return {
                restrict: "A",
                link: function(a, c) {
                    c.on("click",
                        function() {
                            b.openUpdatePanel(c)
                        })
                }
            }
        }]).directive("updateOrderInvoiceBtn", ["OrderService", "PluginDialog",
        function() {
            return {
                restrict: "A",
                link: function(a, b) {
                    b.on("click",
                        function() {
                            var a = b.closest(".other-order-info"),
                                c = a.find(".user-order-info-pm").height() + 60,
                                d = a.find(".order-form-verify").is(":hidden"),
                                e = a.find(".order-form-verify-success").is(":hidden"),
                                f = a,
                                g = a.find(".order-form-receipt-success");
                            d && e && f.animate({
                                    height: c,
                                    opacity: "1"
                                },
                                {
                                    queue: !1
                                },
                                {
                                    duration: 500,
                                    easing: "easeOutQuart"
                                }),
                                e && 0 == d && f.animate({
                                    height: "700px",
                                    opacity: "1"
                                },
                                {
                                    queue: !1
                                },
                                {
                                    duration: 500,
                                    easing: "easeOutQuart"
                                }),
                                d && 0 == e && f.animate({
                                    height: "960px",
                                    opacity: "1"
                                },
                                {
                                    queue: !1
                                },
                                {
                                    duration: 500,
                                    easing: "easeOutQuart"
                                }),
                                g.css({
                                    display: "none"
                                }).animate({
                                    opacity: "0"
                                }),
                                g.parent(".receipt-order-info").find(".stitle").find(".edit-receipt-box").show()
                        })
                }
            }
        }]).directive("confirmScrollFixbar", ["$document", "$timeout",
        function(a, b) {
            return function() {
                b(function() {
                    function a() {
                        var a = $(this).scrollTop(),
                            b = $(".page-confirm-fixbar");
                        a > 695 ? b.is(":hidden") && (Modernizr.opacity ? (b.css({
                            opacity: "0"
                        }).show(), b.animate({
                                opacity: "1"
                            },
                            {
                                queue: !1,
                                duration: 200
                            })) : b.show()) : b.is(":visible") && (Modernizr.opacity ? b.css({
                            opacity: "0"
                        }).hide() : b.hide())
                    }
                    $(window).off("scroll", a).on("scroll", a)
                })
            }
        }]),
    preSaleAppService.constant("MainConfig", {
        baseUrl: "index.php?r=",
        secureUrl: "https://account.smartisan.com/v2/",
        paymentUrl: "https://payment.smartisan.com/index.php?r=",
        errorMap: {
            1e3: "未登录",
            1001: "邮箱格式有误",
            1002: "收货人格式有误",
            1003: "手机格式有误",
            1004: "区号和固定电话不能只填写一个",
            1005: "省市区代码不能为空",
            1006: "优先购买码不存在或已使用",
            1007: "邮政编码格式有误",
            1008: "收货地址不能为空",
            1009: "短信通知手机格式有误",
            1010: "发票抬头格式有误",
            1011: "超过用户最大保存订单数",
            1012: "超过用户最大保存地址数",
            1013: "优先购买码不能为空",
            1014: "无权限修改",
            1015: "未知错误",
            1016: "数据库操作失败",
            1017: "验证码不正确",
            1018: "参数错误",
            1019: "手机和固定电话不能都为空",
            1020: "区号格式有误",
            1021: "固定电话格式有误",
            1022: "优先购买码过期",
            1023: "已完款",
            1024: "预付款已完款",
            1025: "全款订单",
            1026: "预付款订单",
            1027: "支付金额有误",
            1028: "发送失败",
            1029: "订单ID有误",
            1030: "用户账号格式有误",
            1031: "用户ID不存在",
            1032: "地址不存在或已删除",
            1033: "下单失败，请重新下单",
            1034: "手机已注册",
            1035: "邮箱已注册",
            1036: "验证码格式不正确",
            1037: "密码格式有误",
            1038: "passpost格式有误",
            1039: "密码错误有误",
            1040: "需要刷新验证码",
            1041: "用户不存在",
            1042: "密码错误 并且需要验证码",
            1043: "需要验证码",
            1044: "服务器异常"
        },
        singleErrorMap: {
            1036: "验证码格式不正确",
            1037: "密码格式有误",
            1038: "passpost格式有误",
            1039: "密码错误有误",
            1040: "需要刷新验证码",
            1041: "用户不存在",
            1042: "密码错误 并且需要验证码",
            1043: "需要验证码",
            1006: "优先购买码不存在或已使用",
            1017: "验证码不正确",
            1014: "无权限修改"
        },
        accountError: {
            SYSTEM_MAINTENANCE: 1,
            LOGIC_ERROR: 2,
            FS_READ_ERROR: 3,
            FS_WRITE_ERROR: 4,
            DB_CONNECT_ERROR: 5,
            DB_QUERY_ERROR: 6,
            CACHE_CONNECT_ERROR: 7,
            CACHE_QUERY_ERROR: 8,
            ILLEGAL_TICKET: 1601,
            INVALID_TICKET: 1602,
            ILLEGAL_UID: 1101,
            ILLEGAL_PASSWORD: 1102,
            ILLEGAL_AVATAR: 1103,
            ILLEGAL_SECQUES: 1104,
            ILLEGAL_SECANS: 1105,
            INVALID_UID: 1106,
            INVALID_PASSWORD: 1107,
            INVALID_SECANS: 1108,
            ALIAS_REQUIRED: 1109,
            PASSWORD_REQUIRED: 1110,
            ILLEGAL_ALIAS: 1201,
            INVALID_ALIAS: 1202,
            REGISTERED_ALIAS: 1203,
            ILLEGAL_CELLPHONE: 1204,
            INVALID_CELLPHONE: 1205,
            REGISTERED_CELLPHONE: 1206,
            ILLEGAL_EMAIL: 1207,
            INVALID_EMAIL: 1208,
            REGISTERED_EMAIL: 1209,
            ILLEGAL_NICKNAME: 1210,
            INVALID_NICKNAME: 1211,
            REGISTERED_NICKNAME: 1212,
            ILLEGAL_VCODE: 1301,
            INVALID_VCODE: 1302,
            VCODE_TOO_OFTEN: 1304,
            CAPTCHA_REQUIRED: 1502,
            ILLEGAL_TOKEN: 1401,
            INVALID_TOKEN: 1402,
            UNAUTHORIZED: 1701,
            REFRECH_VCODE: 1303,
            FAILED_LOGIN_LIMIT: 1501
        },
        isError: function(a, b, c) {
            0 == a.code ? b(a.data) : c(a)
        },
        commonAjaxError: function(a, b, c, d, e, f, g) {
            var h = this;
            if ("number" == typeof b && (b + "").match(/^4|5/)) return window.location.href = "http://www.smartisan.com/#/error/" + b,
                f(function() {
                    $(document).find(".module-dialog:visible").find(".dialog-close").click()
                }),
                !1;
            if (b.errInfo[1015] || b.errInfo[1016] || b.errInfo[1044]) return e.path("error/500"),
                f(function() {
                    $(document).find(".module-dialog:visible").find(".dialog-close").click()
                }),
                !1;
            if (b.errInfo[1e3] && a.loginDialog) return a.loginDialog.setScope(function(a) {
                return angular.extend(a.config, {
                    title: "登录账户",
                    type: "login",
                    regType: "email",
                    dialogWidth: "436px",
                    dialogMargin: "-215px 0 0 -218px",
                    conHeight: {
                        height: "362px"
                    }
                }),
                    a
            }).show(function() {
                g.reload()
            }),
                !1;
            if (1 == b.code) {
                var i = (b.code, b.errInfo),
                    j = !0,
                    k = "未知错误";
                return jQuery.each(i,
                    function(a, b) {
                        return a in h.singleErrorMap ? (j = !1, !1) : void(k = b)
                    }),
                    j && d.message({
                    message: k
                }),
                    !1
            }
        },
        isNormalBrowser: function() {
            return window.Worker ? !0: !1
        },
        mailUrl: {
            "163.com": "http://mail.163.com/",
            "126.com": "http://mail.126.com/",
            "139.com": "http://mail.10086.cn/",
            "sina.com": "http://mail.sina.com.cn/",
            "sina.cn": "http://mail.sina.com.cn/",
            "qq.com": "https://mail.qq.com/",
            "sohu.com": "http://mail.sohu.com/",
            "gmail.com": "https://www.gmail.com/",
            "yahoo.com": "https://login.yahoo.com/",
            "21cn.com": "http://mail.21cn.com/",
            "aliyun.com": "https://mail.aliyun.com/",
            "outlook.com": "https://login.live.com/",
            "yeah.net": "http://www.yeah.net/",
            "sogou.com": "http://mail.sogou.com/",
            "189.cn": "http://webmail9.189.cn/webmail/",
            "cntv.cn": "http://mail.cntv.cn/",
            "tianya.cn": "http://mail.tianya.cn/",
            "hainan.net": "http://mail.tianya.cn/",
            "hotmail.com": "https://www.hotmail.com/"
        },
        cityWhiteMap: {
            110100: !0,
            110200: !0,
            120100: !0,
            120200: !0,
            310100: !0,
            310200: !0,
            500100: !0,
            500200: !0,
            130100: !0,
            140100: !0,
            210100: !0,
            220100: !0,
            230100: !0,
            320100: !0,
            330100: !0,
            340100: !0,
            350100: !0,
            360100: !0,
            370100: !0,
            410100: !0,
            440100: !0,
            430100: !0,
            420100: !0,
            460100: !0,
            510100: !0,
            520100: !0,
            530100: !0,
            610100: !0,
            620100: !0,
            630100: !0,
            150100: !0,
            450100: !0,
            640100: !0,
            440300: !0,
            450300: !0,
            210200: !0,
            370200: !0,
            350200: !0,
            330200: !0,
            330300: !0
        }
    }).factory("MainService", ["$route", "$rootScope", "$timeout", "$http", "$q", "$location", "MainConfig", "PluginDialog",
        function(a, b, c, d, e, f, g, h) {
            var i = {
                isLogin: function() {
                    return b.logined
                },
                ajax: function(i) {
                    var j = this,
                        k = e.defer(),
                        l = {
                            method: i.type || "get",
                            url: g.baseUrl + i.url,
                            data: i.data || {}
                        };
                    "get" == l.method && (l.params = l.data),
                        "post" == l.method && (l.headers = {
                        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                    },
                        l.data = j.jsonToValue(l.data)),
                        i.params && (l.params = i.params),
                        i.cache && (l.cache = i.cache),
                        i.timeout && (l.timeout = i.timeout),
                        i.headers && (l.headers = i.headers);
                    var m = function() {
                            angular.isFunction(i.beforeAjax) && i.beforeAjax()
                        },
                        n = function() {
                            angular.isFunction(i.complete) && i.complete()
                        },
                        o = function(a) {
                            var b = angular.isFunction(i.success) ? i.success(a) : void 0;
                            b = void 0 === b ? a: b,
                                k.resolve(b)
                        },
                        p = function(a) {
                            var b = angular.isFunction(i.error) ? i.error(a) : void 0,
                                c = !0;
                            return b === !1 && (c = !1),
                                b = void 0 === b || b === !1 ? a: b,
                                k.reject(b),
                                c ? b: !1
                        };
                    return m(),
                        d(l).success(function(d, e) {
                            n(d),
                                g.isError(d,
                                    function(a) {
                                        o(a)
                                    },
                                    function(i) {
                                        var j = p(i);
                                        j !== !1 && g.commonAjaxError(b, d, e, h, f, c, a)
                                    })
                        }).error(function(d, e) {
                            return l.url.match(/account\/user/) ? !1: (n(e), g.commonAjaxError(b, e, d, h, f, c, a), void k.reject({
                                errInfo: "error"
                            }))
                        }),
                        k.promise
                },
                jsonp: function(a) {
                    var b = g.secureUrl + a.url,
                        c = e.defer();
                    return b += this.jsonpValue(a.data),
                        d.jsonp(b).success(function(b) {
                            0 == b.errno ? c.resolve(a.success(b)) : b.errno <= 900 ? window.location.href = "http://www.smartisan.com/#/error/500": c.reject(a.error(b))
                        }).error(function(a, b) {
                            return "number" == typeof b && (b + "").match(/^4|5/) ? (window.location.href = "http://www.smartisan.com/#/error/" + response, !1) : void c.reject("网络异常!")
                        }),
                        c.promise
                },
                jsonToValue: function(a) {
                    var b = "";
                    if ("object" == typeof a) {
                        var c = [];
                        for (var d in a) c.push(d + "=" + a[d]);
                        b = c.join("&")
                    } else b = a;
                    return b
                },
                jsonpValue: function(a) {
                    var b = "callback=JSON_CALLBACK";
                    for (var c in a) b += "&data" + c + "=" + escape(a[c]);
                    return b
                },
                appendLoading: function(a) {
                    var b = a || jQuery("body"),
                        c = b.find(".loader");
                    c.length ? c.show() : b.append('<div class="loader"></div>')
                },
                removeLoading: function(a) {
                    var b = a || jQuery("body");
                    b.find(".loader").hide()
                }
            };
            return i
        }]),
    preSaleAppService.factory("UserService", ["$rootScope", "$cookieStore", "$http", "$q", "$timeout", "MainService",
        function(a, b, c, d, e, f) {
            var g = {
                logined: !1,
                info: {},
                testEmail: function(a) {
                    return f.ajax({
                        type: "post",
                        url: "Account/checkEmail",
                        data: {
                            email: a
                        },
                        success: function(a) {
                            return a
                        },
                        error: function() {
                            return ! 1
                        }
                    })
                },
                sendEmail: function() {
                    return f.ajax({
                        type: "post",
                        url: "Account/sendEmail"
                    })
                },
                testMobile: function(a) {
                    return f.ajax({
                        type: "post",
                        url: "Account/checkMobile",
                        data: {
                            mobile: a
                        },
                        success: function(a) {
                            return a
                        },
                        error: function() {
                            return ! 1
                        }
                    })
                },
                sendMobileCaptcha: function(a) {
                    return f.jsonp({
                        data: a,
                        url: "cellphone/?m=post&",
                        success: function(a) {
                            return a
                        },
                        error: function(a) {
                            return a
                        }
                    })
                },
                testMobileCode: function(a) {
                    return f.ajax({
                        type: "post",
                        url: "Account/verityMessage",
                        data: a,
                        success: function(a) {
                            return a
                        },
                        error: function() {
                            return ! 1
                        }
                    })
                },
                register: function(a) {
                    var b = this;
                    return f.jsonp({
                        data: a,
                        url: "users/?m=post&",
                        success: function(a) {
                            return b.logined = !0,
                                a
                        },
                        error: function(a) {
                            return a
                        }
                    })
                },
                getRegisterCode: function() {
                    return f.ajax({
                        type: "post",
                        url: "Account/sendMessage",
                        data: {
                            mobile: mobile
                        }
                    })
                },
                getMobileCode: function(a) {
                    return f.ajax({
                        type: "post",
                        url: "Account/sendMessage",
                        data: {
                            mobile: a
                        },
                        success: function(a) {
                            return a
                        },
                        error: function(a) {
                            return a
                        }
                    })
                },
                login: function(a) {
                    var b = this;
                    return f.jsonp({
                        data: a,
                        url: "session/?m=post&",
                        success: function(a) {
                            return b.logined = !0,
                                a
                        },
                        error: function(a) {
                            return a
                        }
                    })
                },
                getInfo: function() {
                    var b = this;
                    return f.ajax({
                        type: "post",
                        url: "account/user",
                        success: function(a) {
                            return b.setInfo(a),
                                b.logined = !0,
                                a
                        },
                        error: function() {
                            return a.logined = !1,
                                b.logined = !1,
                                !1
                        }
                    })
                },
                setInfo: function(a) {
                    var b = this;
                    b.info = a,
                        b.info.userLabel = a.nickname ? a.nickname: a.email ? a.email: a.cellphone
                },
                logout: function() {
                    var a = this;
                    return f.jsonp({
                        url: "session/?m=delete&",
                        success: function(b) {
                            return a.logined = !1,
                                a.info = {},
                                b
                        },
                        error: function(b) {
                            return a.logined = !1,
                                a.info = {},
                                b
                        }
                    })
                },
                isLogined: function() {
                    var a = this;
                    return a.logined ? !0: !1
                },
                loginHttp: function(b) {
                    var c = this;
                    c.logined ? "function" == typeof b && b(c.info) : a.loginDialog && e(function() {
                        $(document).find(".module-dialog:visible").find(".dialog-close").click(),
                            a.loginDialog.setScope(function(a) {
                                return angular.extend(a.config, {
                                    title: "登录账户",
                                    type: "guest",
                                    regType: "mail",
                                    dialogWidth: "704px",
                                    dialogMargin: "-190px 0 0 -352px",
                                    conHeight: {
                                        width: "704px",
                                        height: "300px"
                                    }
                                }),
                                    a
                            }).show(b)
                    })
                }
            };
            return g
        }]),
    preSaleAppService.factory("DeliveryAddressService", ["$http", "$q", "MainService",
        function(a, b, c) {
            var d = {
                addresses: [],
                defaultAddress: [],
                areaProvince: null,
                areaCity: null,
                areaDistrict: null,
                getAllProvince: function() {
                    var a = this;
                    if (a.areaProvince) {
                        var d = b.defer();
                        return d.resolve(a.areaProvince),
                            d.promise
                    }
                    return c.ajax({
                        type: "post",
                        url: "Areas/Province",
                        success: function(b) {
                            return a.areaProvince = b,
                                a.areaProvince.unshift({
                                    area_id: 0,
                                    area_name: "请选择"
                                }),
                                a.areaProvince
                        },
                        error: function(a) {
                            return a
                        }
                    })
                },
                getCity: function(a) {
                    var d = this;
                    if (0 == a) {
                        d.areaCity = [];
                        var e = b.defer();
                        return e.resolve([{
                            area_id: 0,
                            area_name: "请选择"
                        }]),
                            e.promise
                    }
                    return c.ajax({
                        type: "post",
                        url: "Areas/city",
                        data: {
                            province_id: a
                        },
                        success: function(a) {
                            return a.unshift({
                                area_id: 0,
                                area_name: "请选择"
                            }),
                                d.areaCity = a,
                                a
                        },
                        error: function(a) {
                            return a
                        }
                    })
                },
                getDistrict: function(a) {
                    var d = this;
                    if (0 == a) {
                        d.areaDistrict = [];
                        var e = b.defer();
                        return e.resolve([{
                            area_id: 0,
                            area_name: "请选择"
                        }]),
                            e.promise
                    }
                    return c.ajax({
                        type: "post",
                        url: "Areas/area",
                        data: {
                            city_id: a
                        },
                        success: function(a) {
                            return a.unshift({
                                area_id: 0,
                                area_name: "请选择"
                            }),
                                d.areaDistrict = a,
                                a
                        },
                        error: function(a) {
                            return a
                        }
                    })
                },
                getList: function() {
                    var a = this;
                    return c.ajax({
                        type: "post",
                        url: "address/list",
                        success: function(b) {
                            var c = b.list;
                            return a.addresses = c,
                                a.addresses
                        },
                        error: function(a) {
                            return a
                        }
                    })
                },
                addAddress: function(a) {
                    return c.ajax({
                        type: "post",
                        url: "address/add",
                        data: a,
                        success: function(a) {
                            return a
                        },
                        error: function(a) {
                            return a
                        }
                    })
                },
                removeAddress: function(a) {
                    return c.ajax({
                        type: "post",
                        url: "address/del",
                        data: {
                            id: a
                        },
                        success: function(a) {
                            return a
                        },
                        error: function(a) {
                            return a
                        }
                    })
                },
                updateAddress: function(a) {
                    return c.ajax({
                        type: "post",
                        url: "address/edit",
                        data: a,
                        success: function(a) {
                            return a
                        },
                        error: function(a) {
                            return a
                        }
                    })
                }
            };
            return d
        }]),
    preSaleAppService.factory("OrderService", ["$http", "$cookieStore", "$location", "MainService", "UserService", "ModelPhone", "ModelOrder",
        function(a, b, c, d, e, f, g) {
            var h = {
                orders: [],
                addressTips: {},
                verifyMobileCode: function(a, b) {
                    return d.ajax({
                        type: "post",
                        url: "Cdkey/Verify",
                        data: {
                            cdkey_code: a,
                            captcha_code: b
                        },
                        success: function(a) {
                            return angular.extend(a, {
                                phone: f.phones[a.pre_goods_id]
                            }),
                                a
                        }
                    })
                },
                useMobileCode: function(a) {
                    return d.ajax({
                        type: "post",
                        url: "Preorder/CdkCreate",
                        data: {
                            cdkey_code: a
                        }
                    })
                },
                createTempOrder: function(a, c, f) {
                    var g = "o" + (new Date).getTime(),
                        h = {
                            id: g,
                            mobile_id: a,
                            pay_type: 1,
                            discount_amount: f ? f: 0
                        };
                    return c ? (h.cdkey_code = c, h.pay_type = 2, b.put(g, h), {
                        canBuy: !0,
                        id: g
                    }) : d.ajax({
                        type: "post",
                        url: "preorder/Verifyordernum",
                        success: function(a) {
                            return b.put(g, h),
                                e.logined = !0,
                            {
                                canBuy: a,
                                id: g
                            }
                        },
                        error: function(a) {
                            return a.errInfo[1e3] ? !1: void 0
                        }
                    })
                },
                completeTempOrder: function(a) {
                    var c = b.get(a.id) || {};
                    return c.id ? (angular.extend(c, a), b.put(c.id, c), !0) : !1
                },
                getList: function() {
                    return d.ajax({
                        type: "post",
                        url: "Preorder/Orderlist",
                        success: function(a) {
                            return g.parseOrderList(a.list)
                        }
                    })
                },
                createOrder: function(a) {
                    var c = a.id;
                    return delete a.isTempOrder,
                        delete a.id,
                        d.ajax({
                            type: "post",
                            url: "Preorder/Create",
                            data: a,
                            success: function(a) {
                                b.get(c) || {};
                                return b.remove(c),
                                    a
                            }
                        })
                },
                getCurOrder: function(a) {
                    return d.ajax({
                        type: "post",
                        url: "Preorder/Orderdetail",
                        data: {
                            order_id: a
                        },
                        success: function(a) {
                            return g.parseOrder(a)
                        }
                    })
                },
                updateOrder: function(a) {
                    return d.ajax({
                        type: "post",
                        url: "Preorder/Append",
                        data: a
                    })
                },
                updateOrderAddress: function(a) {
                    return d.ajax({
                        type: "post",
                        url: "Preorder/Editaddress",
                        data: a
                    })
                },
                canUpdate: function() {
                    return d.ajax({
                        type: "post",
                        url: "Preorder/Verifyeditauth"
                    })
                },
                sendVerifyMessage: function(a) {
                    return d.ajax({
                        type: "post",
                        url: "Preorder/Sendmessage",
                        data: {
                            send_type: a
                        }
                    })
                },
                verifyMessage: function(a) {
                    return d.ajax({
                        type: "post",
                        url: "Preorder/Verifymessage",
                        data: {
                            verify_content: a
                        },
                        error: function(a) {
                            return a.errInfo[1017] ? !1: void 0

                        }
                    })
                },
                updateOrderInvoice: function(a) {
                    return d.ajax({
                        type: "post",
                        url: "Preorder/Editinvoice",
                        data: a
                    })
                },
                updateOrderMobile: function(a) {
                    return d.ajax({
                        type: "post",
                        url: "Preorder/Noticemobile",
                        data: a
                    })
                },
                payOrder: function(a) {
                    return d.ajax({
                        type: "post",
                        url: "pay/pay",
                        data: a
                    })
                },
                cancelOrder: function(a) {
                    return d.ajax({
                        type: "post",
                        url: "Preorder/Cancelorder",
                        data: {
                            order_id: a
                        }
                    })
                },
                isPaymentComplete: function(a) {
                    return d.ajax({
                        type: "post",
                        url: "preorder/getOrderStatus",
                        data: {
                            order_id: a
                        }
                    })
                }
            };
            return h
        }]),
    preSaleAppService.factory("PhoneService", ["$http", "MainService", "UserService", "ModelPhone",
        function(a, b, c, d) {
            var e = {
                curPhone: null,
                canBuy: function() {
                    return b.ajax({
                        type: "post",
                        url: "preorder/Verifyordernum",
                        success: function() {
                            c.logined = !0
                        }
                    })
                },
                getMobileVerifyCode: function() {
                    return b.ajax({
                        type: "post",
                        url: "captcha/show",
                        success: function() {}
                    })
                },
                getPreDeliveryTime: function(a) {
                    var c = {};
                    return a && (c.cdkey = a),
                        b.ajax({
                            type: "post",
                            data: c,
                            url: "Preorder/getPreDeliveryTime"
                        })
                },
                getList: function() {
                    return d.phones
                }
            };
            return e
        }]),
    preSaleAppService.provider("Pagemap", [function() {
        var a = {
            html4: {
                page: {
                    home: "partials/hack-home.html",
                    phone: "partials/hack-phone.html",
                    accessories: "partials/hack-phone-fitting.html",
                    checkout: "partials/hack-order-checkout.html",
                    confirm: "partials/hack-order-confirm.html",
                    orderList: "partials/hack-order-list.html"
                },
                dialog: {
                    layout: "template/hack-dialog.html",
                    message: "template/dialog-message.html",
                    login: "partials/hack-dialog-user-login.html",
                    mobileCode: "partials/hack-dialog-mobile-code.html",
                    address: "partials/hack-dialog-address.html",
                    account: "partials/hack-dialog-account.html",
                    verifyUpdate: "partials/hack-dialog-verify-update.html",
                    payment: "partials/hack-dialog-payment.html",
                    confirmOrder: "partials/dialog-confirm-order.html",
                    addressError: "partials/dialog-error.html"
                }
            },
            html5: {
                page: {
                    home: "partials/home.html?" + TIMESTAMP,
                    phone: "partials/phone.html?" + TIMESTAMP,
                    accessories: "partials/phone-fitting.html?" + TIMESTAMP,
                    checkout: "partials/order-checkout.html?" + TIMESTAMP,
                    confirm: "partials/order-confirm.html?" + TIMESTAMP,
                    orderList: "partials/order-list.html?" + TIMESTAMP,
                    payResult: "partials/order-pay-result.html?" + TIMESTAMP,
                    error404: "partials/404.html?" + TIMESTAMP,
                    error500: "partials/500.html?" + TIMESTAMP
                },
                dialog: {
                    layout: "template/dialog.html?" + TIMESTAMP,
                    message: "template/dialog-message.html?" + TIMESTAMP,
                    login: "partials/dialog-user-login.html?" + TIMESTAMP,
                    mobileCode: "partials/dialog-mobile-code.html?" + TIMESTAMP,
                    address: "partials/dialog-address.html?" + TIMESTAMP,
                    account: "partials/dialog-account.html?" + TIMESTAMP,
                    verifyUpdate: "partials/dialog-verify-update.html?" + TIMESTAMP,
                    payment: "partials/dialog-payment.html?" + TIMESTAMP,
                    confirmOrder: "partials/dialog-confirm-order.html?" + TIMESTAMP,
                    addressError: "partials/dialog-error.html?" + TIMESTAMP
                },
                directive: {
                    addressForm: "partials/address-form.html?" + TIMESTAMP,
                    orderStatus: "partials/order-status-process.html?" + TIMESTAMP,
                    uiSelect: "template/ui-select.html?" + TIMESTAMP
                },
                faq: {
                    order: {
                        title: "订单帮助",
                        titleCss: "order-help",
                        list: {
                            "pay-question": {
                                name: "支付问题",
                                content: "partials/faq-pay-question.html"
                            },
                            refund: {
                                name: "退货及退款须知",
                                content: "partials/faq-pay-refund.html"
                            }
                        }
                    }
                }
            },
            template: {},
            chooseTemplate: function() {
                this.template = this.html5
            },
            $get: function() {
                return this.template
            }
        };
        return a.chooseTemplate(),
            a
    }]),
    preSaleAppService.constant("DataPayment", {
        installment: [{
            id: "4_3",
            period: "3",
            fee: "3.9",
            monthFee: "1.3"
        },
            {
                id: "4_6",
                period: "6",
                fee: "4.8",
                monthFee: "0.8"
            },
            {
                id: "4_12",
                period: "12",
                fee: "7.2",
                monthFee: "0.6"
            },
            {
                id: "4_18",
                period: "18",
                fee: "10.8",
                monthFee: "0.6"
            },
            {
                id: "4_24",
                period: "24",
                fee: "14.4",
                monthFee: "0.6"
            }]
    }),
    preSaleAppService.constant("DataMobile", {
        phones: [{
            id: "100000001",
            name: "Smartisan T1 黑色 16GB",
            capacity: "16GB",
            price: "3000",
            color: "2",
            colorLabel: "黑色",
            image: CDN_HOST + "pic/s03.png",
            inventory: !0,
            storeNums: 1e4
        },
            {
                id: "100000002",
                name: "Smartisan T1 黑色 32GB",
                capacity: "32GB",
                price: "3150",
                color: "2",
                colorLabel: "黑色",
                image: CDN_HOST + "pic/s03.png",
                inventory: !0,
                storeNums: 1e4
            }],
        phoneImages: {
            1: [CDN_HOST + "pic/phone_white_1.png", CDN_HOST + "pic/phone_white_2.png", CDN_HOST + "pic/phone_white_3.png"],
            2: [CDN_HOST + "pic/phone_black_1.png", CDN_HOST + "pic/phone_black_2.png", CDN_HOST + "pic/phone_black_3.png", CDN_HOST + "pic/phone_black_4.png"]
        },
        fitting: {
            list: [{
                id: 7,
                name: "150%电池背壳(亮灰色)",
                color: "lightgray",
                colorLabel: "亮灰色",
                price: 99,
                thumbnail: ["pic/thumber-img.png", "pic/thumber-img.png", "pic/thumber-img.png"],
                images: ["pic/pm-phone-white-01.png", "pic/pm-phone-white-02.png", "pic/pm-phone-white-01.png"],
                radioImg: "pic/feature-selection-img-01.png",
                prod: "pic/pm-case-lightgray.png"
            },
                {
                    id: 8,
                    name: "150%电池背壳(深灰色)",
                    color: "darkgray",
                    colorLabel: "深灰色",
                    price: 99,
                    thumbnail: ["pic/thumber-img.png", "pic/thumber-img.png", "pic/thumber-img.png"],
                    images: ["pic/pm-phone-white-01.png", "pic/pm-phone-white-02.png", "pic/pm-phone-white-01.png"],
                    radioImg: "pic/feature-selection-img-02.png",
                    prod: "pic/pm-case-darkgray.png"
                },
                {
                    id: 9,
                    name: "150%电池背壳(绿色)",
                    color: "green",
                    colorLabel: "绿色",
                    price: 99,
                    thumbnail: ["pic/thumber-img.png", "pic/thumber-img.png", "pic/thumber-img.png"],
                    images: ["pic/pm-phone-white-01.png", "pic/pm-phone-white-02.png", "pic/pm-phone-white-01.png"],
                    radioImg: "pic/feature-selection-img-03.png",
                    prod: "pic/pm-case-green.png"
                },
                {
                    id: 10,
                    name: "150%电池背壳(蓝色)",
                    color: "blue",
                    colorLabel: "蓝色",
                    price: 99,
                    thumbnail: ["pic/thumber-img.png", "pic/thumber-img.png", "pic/thumber-img.png"],
                    images: ["pic/pm-phone-white-01.png", "pic/pm-phone-white-02.png", "pic/pm-phone-white-01.png"],
                    radioImg: "pic/feature-selection-img-04.png",
                    prod: "pic/pm-case-blue.png"
                },
                {
                    id: 11,
                    name: "150%电池背壳(粉色)",
                    color: "pink",
                    colorLabel: "粉色",
                    price: 99,
                    thumbnail: ["pic/thumber-img.png", "pic/thumber-img.png", "pic/thumber-img.png"],
                    images: ["pic/pm-phone-white-01.png", "pic/pm-phone-white-02.png", "pic/pm-phone-white-01.png"],
                    radioImg: "pic/feature-selection-img-05.png",
                    prod: "pic/pm-case-black.png"
                },
                {
                    id: 12,
                    name: "150%电池背壳(红色)",
                    color: "red",
                    colorLabel: "红色",
                    price: 99,
                    thumbnail: ["pic/thumber-img.png", "pic/thumber-img.png", "pic/thumber-img.png"],
                    images: ["pic/pm-phone-white-01.png", "pic/pm-phone-white-02.png", "pic/pm-phone-white-01.png"],
                    radioImg: "pic/feature-selection-img-06.png",
                    prod: "pic/pm-case-red.png"
                },
                {
                    id: 13,
                    name: "150%电池背壳(黄色)",
                    color: "yellow",
                    colorLabel: "黄色",
                    price: 99,
                    thumbnail: ["pic/thumber-img.png", "pic/thumber-img.png", "pic/thumber-img.png"],
                    images: ["pic/pm-phone-white-01.png", "pic/pm-phone-white-02.png", "pic/pm-phone-white-01.png"],
                    radioImg: "pic/feature-selection-img-07.png",
                    prod: "pic/pm-case-yellow.png"
                }],
            base: {
                thumbnail: ["pic/thumber-img.png", "pic/thumber-img.png", "pic/thumber-img.png"],
                images: ["pic/pm-phone-white-01.png", "pic/pm-phone-white-02.png", "pic/pm-phone-white-01.png"],
                prod: "pic/pm-case-green.png"
            }
        },
        service: {
            safety1: {
                id: "100000101",
                name: "意外保修服务",
                price: "200",
                img: CDN_HOST + "pic/04.png"
            },
            safety2: {
                id: "100000102",
                name: "延长保修服务",
                price: "200",
                img: CDN_HOST + "pic/05.png"
            }
        }
    }).factory("ModelPhone", ["DataMobile",
        function(a) {
            var b = {
                basePhones: [],
                phones: {},
                fittings: {},
                colorType: {},
                defaultColor: "2",
                images: a.phoneImages,
                service: a.service,
                parseBaseData: function() {
                    var b = this,
                        c = [].concat(a.phones),
                        d = [].concat(a.fitting.list);
                    b.basePhones = a.phones,
                        jQuery.each(c,
                            function(a, c) {
                                b.phones[c.id] = c,
                                    b.colorType[c.color] || (b.colorType[c.color] = []),
                                    b.colorType[c.color].push(c)
                            }),
                        jQuery.each(d,
                            function(a, c) {
                                b.fittings[c.id] = c
                            })
                }
            };
            return b.parseBaseData(),
                b
        }]),
    preSaleAppService.factory("ModelOrder", ["ModelPhone",
        function(a) {
            var b = {
                parseOrder: function(b) {
                    var c = angular.extend({},
                        b);
                    switch (c.pay_type) {
                        case "1":
                            c.orderPayText = 0 == c.pay_status ? "现在付款": "补齐余款";
                            break;
                        case "2":
                            c.orderPayText = "现在付款"
                    }
                    return c.carts = [],
                        c.goods.constructor === Array && c.goods.length && jQuery.each(c.goods,
                        function(b, d) {
                            var e = {
                                is_mobile: d.is_mobile,
                                goods_nums: d.goods_nums
                            };
                            if (1 == d.is_mobile) {
                                var f = 0;
                                e.prod = angular.extend({},
                                    a.phones[d.goods_id]),
                                    e.service = [],
                                    f += e.prod.price - 0,
                                    1 == d.safety1 && (e.service.push(a.service.safety1), f += a.service.safety2.price - 0),
                                    1 == d.safety2 && (e.service.push(a.service.safety2), f += a.service.safety2.price - 0),
                                    e.prod.total = f
                            } else e.prod = a.fittings[d.goods_id],
                                e.prod.total = e.prod.price;
                            c.carts.push(e)
                        }),
                        c.create_time = 1e3 * c.create_time,
                        c.now_time = 1e3 * c.now_time,
                        c.pre_pay_time = 0 == c.pre_pay_time ? "": 1e3 * c.pre_pay_time,
                        c.pay_time = 0 == c.pay_time ? "": 1e3 * c.pay_time,
                        c.distribution_time = 0 == c.distribution_time ? "": 1e3 * c.distribution_time,
                        c.deliver_time = 0 == c.deliver_time ? "": 1e3 * c.deliver_time,
                        c.cancel_time = 0 == c.cancel_time ? "": 1e3 * c.cancel_time,
                        c.audit_completed_time = 0 == c.audit_completed_time ? "": 1e3 * c.audit_completed_time,
                        c.end_time = 0 == c.end_time ? "": 1e3 * c.end_time,
                        c
                },
                parseOrderList: function(a) {
                    var b = this,
                        c = [];
                    if (a.constructor === Array && a.length) {
                        var d = [].concat(a);
                        jQuery.each(d,
                            function(a, d) {
                                c.push(b.parseOrder(d))
                            })
                    }
                    return c
                }
            };
            return b
        }]),
    preSaleAppService.factory("PhoneParseDataService", [function() {
        var a = {
            parseInventory: function() {
                return ! 0
            }
        };
        return a
    }]),
    preSaleAppController.controller("DialogAccountCtrl", ["$rootScope", "$scope", "UserService",
        function(a, b, c) {
            b.defHideDialog = function() {
                b.closeDialog()
            },
                b.info = c.info,
                b.sended = !1,
                    b.info.email && "0" == b.info.email_active ? b.isVerifyEmail = !0: (b.isVerifyEmail = !1, b.emailOpeationLabel = b.info.email ? "修改": "立即绑定"),
                b.cellphoneOpeationLabel = b.info.cellphone_active ? "修改": "立即验证",
                b.questionOpeationLabel = b.info.secques_active ? "修改": "立即设置",
                b.sendEmail = function() {
                    b.sended = !0,
                        c.sendEmail()
                }
        }]),
    preSaleAppController.controller("DialogUserLoginCtrl", ["$timeout", "$location", "$rootScope", "$scope", "UserService", "VerifyAction",
        function(a, b, c, d, e, f) {
            d.defHideDialog = function() {
                d.hideDialog()
            },
                d.doEmailRegister = function() {
                    var a = d.$$childHead;
                    a.registerMailForm.$valid && e.register(d.registerEmailFormData).then(function() {
                            d.$emit("user:pushDoLoginAction"),
                                d.defHideDialog()
                        },
                        function() {
                            f.doVerify(a.registerMailForm)
                        })
                },
                d.linkRegister = function() {
                    var a = d.$$childHead.$$childHead;
                    d.config.title = "注册",
                        d.config.type = "register",
                        d.config.regType = "email",
                        a.loginForm.errorNum = 0,
                        a.showVerify = !1
                },
                d.linkLogin = function() {
                    d.config.title = "登录账户",
                        d.config.type = "login"
                },
                d.returnHome = function() {
                    d.defHideDialog(),
                        b.path("/")
                }
        }]),
    preSaleAppController.controller("DialogDeliveryAddressCtrl", ["$scope", "DeliveryAddressService", "PluginDialog",
        function(a, b) {
            a.service = b,
                a.singleAddress = {},
                a.config.singleAddress && (a.singleAddress = a.config.singleAddress),
                a.defHideDialog = function() {
                    b.getList(),
                        a.closeDialog()
                },
                a.flagDialogChange = !1,
                a.resetAddress = function() {
                    a.singleAddress = {
                        init: !1
                    }
                },
                a.$watch("$parent.config.flagEdit",
                    function(b) {
                        b && (a.singleAddress = a.$parent.config.singleAddress, a.resetForm = !0)
                    },
                    !0)
        }]),
    preSaleAppController.controller("DialogMobileCodeCtrl", ["$rootScope", "$scope", "$location", "$timeout", "UserService", "OrderService", "PluginDialog",
        function(a, b, c, d, e, f) {
            b.mobileCode = "",
                b.mobileCodeVerify = "",
                b.phone = {},
                b.discountAmount = "",
                b.time = (new Date).getTime(),
                b.defHideDialog = function() {
                    b.closeDialog()
                },
                b.useCode = function() {
                    var g = f.createTempOrder(b.phone.id, b.$$childTail.mobileCode, b.discountAmount);
                    g.canBuy && (b.closeDialog(), e.getInfo().then(function() {
                            c.path("accessories/" + g.id)
                        },
                        function() {
                            a.loginDialog && d(function() {
                                a.loginDialog.setScope(function(a) {
                                    return angular.extend(a.config, {
                                        title: "登录账户",
                                        type: "guest",
                                        regType: "mail",
                                        dialogWidth: "704px",
                                        dialogMargin: "-190px 0 0 -352px",
                                        conHeight: {
                                            width: "704px",
                                            height: "300px"
                                        }
                                    }),
                                        a
                                }).show(function() {
                                    c.path("accessories/" + g.id)
                                })
                            })
                        }))
                }
        }]),
    preSaleAppController.controller("DialogPaymentCtrl", ["$route", "$scope", "$timeout", "$location", "$window", "PluginDialog", "DataPayment",
        function(a, b, c, d, e, f, g) {
            b.dataInstallment = g.installment,
                b.payMenuType = "online",
                b.orderInfo = angular.extend({},
                    b.config.orderInfo),
                b.orderInfo.pay_channel_type = 1,
                b.total = (100 * b.orderInfo.order_amount - 100 * b.orderInfo.real_amount) / 100,
                b.canInstallment = 1 == b.orderInfo.pay_type && b.orderInfo.distribution_status > 0 || 2 == b.orderInfo.pay_type,
                b.orderInfo.payAmount = 1 == b.orderInfo.pay_type ? 0 == b.orderInfo.status ? "300": b.orderInfo.order_amount - b.orderInfo.real_amount: b.orderInfo.order_amount,
                b.choosePayType = function(a) {
                    b.payMenuType = a,
                        b.$$childTail.payMenuType = a,
                        b.orderInfo.pay_channel_type = "online" == a ? 1: "4_1"
                };
            var h = !1;
            b.defHideDialog = function() {
                h = !0,
                    b.closeDialog()
            },
                b.autoLinkTime = 30;
            var i = function() {
                c(function() {
                        0 == b.autoLinkTime ? b.linkOrderList() : (b.autoLinkTime--, i())
                    },
                    1e3)
            };
            b.doAutoLink = function() {
                i()
            },
                b.linkOrderList = function() {
                    return h ? !1: (h = !0, a.current.loadedTemplateUrl.match(/confirm/) ? d.path("order/list/") : a.reload(), void b.closeDialog())
                },
                b.linkFaq = function() {
                    return h ? !1: (h = !0, e.open(), d.path("faq/order/pay-question"), void b.closeDialog())
                },
                b.chooseOnline = function(a) {
                    c(function() {
                        b.orderInfo.pay_channel_type = a
                    })
                }
        }]),
    preSaleAppController.controller("DialogVerifyUpdateCtrl", ["$timeout", "$scope", "OrderService", "VerifyAction", "PluginDialog",
        function(a, b, c, d) {
            b.defHideDialog = function() {
                b.closeDialog()
            },
                b.verifyData = {
                    label: b.config.label,
                    verify: "",
                    type: "mobile" == b.config.type ? 0: 1
                },
                b.waitCode = !1,
                b.waitCodeTime = 60;
            var e = function() {
                a(function() {
                        b.waitCodeTime--,
                                0 == b.waitCodeTime ? (b.waitCodeTime = 60, b.waitCode = !1) : e()
                    },
                    1e3)
            };
            b.sendMessage = function() {
                c.sendVerifyMessage(b.verifyData.type).then(function() {
                    b.waitCode = !0,
                        e()
                })
            },
                b.verifyMessage = function() {
                    var a = d.doVerify(b.$$childTail.verifyUpdateForm);
                    a && c.verifyMessage(b.verifyData.verify).then(function() {
                            b.$emit("order:pushDoCompetenceAction"),
                                b.closeDialog()
                        },
                        function(a) {
                            a.errInfo[1017] && d.doCustomError(b.$$childTail.verifyUpdateForm, b.$$childTail.verifyUpdateForm.verify, a.errInfo[1017])
                        })
                }
        }]),
    preSaleAppController.controller("DialogConfirmOrderCtrl", ["$location", "$scope", "OrderService",
        function(a, b, c) {
            b.defHideDialog = function() {
                b.closeDialog()
            },
                b.confirmOrder = function() {
                    c.createOrder(b.config.params.orderInfo).then(function(c) {
                        b.closeDialog(),
                            a.path("/confirm/" + c.order_id)
                    })
                }
        }]),
    preSaleAppController.controller("DialogErrorCtrl", ["$location", "$scope", "OrderService",
        function(a, b) {
            b.defHideDialog = function() {
                b.closeDialog()
            }
        }]),
    preSaleAppController.controller("MainCtrl", ["$rootScope", "$route", "$scope", "$location", "MainService", "UserService", "Pagemap", "PluginDialog", "ModelPhone",
        function(a, b, c, d, e, f, g, h) {
            c.UserService = f,
                a.userSetDialog = {},
                a.flagInit = !1,
                f.getInfo().then(function(c) {
                        a.flagInit = !0,
                            c || b.current.$$route.userRequired && d.path("/")
                    },
                    function() {
                        a.flagInit = !0,
                            b.current.$$route.userRequired && d.path("/")
                    }),
                a.loginCallback = [],
                a.competenceCallback = [],
                a.loginDialog = h.create({
                    mark: "login",
                    controller: "DialogUserLoginCtrl",
                    dialogClass: "module-dialog-user",
                    title: "登录账户",
                    templateUrl: g.dialog.login,
                    hasBtn: !1,
                    autoReset: !0,
                    params: {
                        type: "login",
                        __index: 1e3
                    },
                    openFun: function(b, c, d) {
                        d && c(b),
                            a.loginCallback.push(c)
                    },
                    closeFun: function() {
                        a.loginCallback.pop()
                    }
                }),
                a.mobileCodeDialog = function() {
                    return h.create({
                        mark: "mobileCode",
                        controller: "DialogMobileCodeCtrl",
                        dialogClass: "module-dialog-mobile-code",
                        title: "优先购买码",
                        templateUrl: g.dialog.mobileCode,
                        hasBtn: !1,
                        autoReset: !0,
                        params: {
                            type: "code"
                        },
                        openFun: function() {},
                        closeFun: function() {}
                    })
                },
                a.openAddressDialog = function() {
                    return h.create({
                        mark: "address",
                        controller: "DialogDeliveryAddressCtrl",
                        dialogClass: "module-dialog-address",
                        title: "管理收货地址",
                        templateUrl: g.dialog.address,
                        hasBtn: !1,
                        autoReset: !0,
                        params: {
                            type: "manage",
                            flagEdit: !1
                        },
                        openFun: function() {},
                        closeFun: function() {}
                    })
                },
                a.accountDialog = function() {
                    return h.create({
                        mark: "account",
                        controller: "DialogAccountCtrl",
                        dialogClass: "module-popup-account",
                        title: "账户设置",
                        templateUrl: g.dialog.account,
                        hasBtn: !1,
                        autoReset: !0,
                        params: {
                            type: "manage"
                        },
                        openFun: function() {},
                        closeFun: function() {}
                    })
                },
                a.$on("user:pushDoLoginAction",
                    function(b) {
                        var c = a.loginCallback.pop();
                        angular.isFunction(c) && c(b)
                    }),
                a.$on("user:pushLogout",
                    function() {
                        b.current.$$route.userRequired && d.path("/")
                    }),
                a.$on("order:chooseAddress",
                    function(a, b) {
                        c.$broadcast("order:pushChooseAddress", b)
                    }),
                a.$on("order:pushDoCompetenceAction",
                    function(b) {
                        var c = a.competenceCallback.pop();
                        angular.isFunction(c) && c(b)
                    })
        }]),
    preSaleAppController.controller("ServiceStatusCtrl", ["$location", "$scope", "$timeout",
        function(a, b, c) {
            var d = !1;
            b.autoLinkTime = 10;
            var e = function() {
                c(function() {
                        return a.$$path.match(/error/) ? void(0 == b.autoLinkTime ? b.linkHome() : (b.autoLinkTime--, e())) : !1
                    },
                    1e3)
            };
            b.linkHome = function() {
                return d ? !1: (d = !0, void a.path("/"))
            },
                e()
        }]),
    preSaleAppController.controller("PhoneCtrl", ["$route", "$rootScope", "$scope", "$filter", "$location", "PhoneService", "UserService", "OrderService", "ModelPhone", "PluginDialog",
        function(a, b, c, d, e, f, g, h, i, j) {
            if (c.modelPhone = i, c.curPhoneIndex = 0, c.curPhoneInfo = {},
                c.curPhones = [], c.curPhoneImages = [], c.loading = null, c.updatePhoneInfo = function(a) {
                c.curPhoneInfo.id = a.id,
                    c.curPhoneInfo.color = a.color,
                    c.curPhoneInfo.colorLabel = a.colorLabel,
                    c.curPhoneInfo.capacity = a.capacity,
                    c.curPhoneInfo.total = a.price,
                    c.curPhoneInfo.image = a.image
            },
                c.choosePhoneType = function(a) {
                    return c.curPhoneInfo.type == a ? !1: (c.curPhoneInfo.type = a, c.curPhones = i.colorType[a], c.curPhoneImages = i.images[a], c.curPhoneIndex = 0, void c.updatePhoneInfo(c.curPhones[0]))
                },
                c.choosePhoneIndex = function(a, b) {
                    return b.inventory ? (c.curPhoneIndex = a, void c.updatePhoneInfo(b)) : !1
                },
                c.createOrder = function() {
                    return f.curPhone = c.curPhoneInfo,
                        h.createTempOrder(c.curPhoneInfo.id).then(function(a) {
                                a.canBuy ? e.path("accessories/" + a.id) : j.confirm({
                                    title: "预计发货时间",
                                    message: "根据目前的预订人数，您的当前订单预计将于 2014 年 10 月后陆续发货，是否继续？",
                                    notWarning: !0,
                                    ok: function(b) {
                                        b.close(),
                                            e.path("accessories/" + a.id)
                                    }
                                })
                            },
                            function(a) {
                                a.errInfo[1e3] && b.loginDialog.setScope(function(a) {
                                    return angular.extend(a.config, {
                                        title: "登录账户",
                                        type: "guest",
                                        regType: "mail",
                                        dialogWidth: "704px",
                                        dialogMargin: "-190px 0 0 -352px",
                                        conHeight: {
                                            width: "704px",
                                            height: "300px"
                                        }
                                    }),
                                        a
                                }).show(function() {
                                    c.createOrder()
                                })
                            })
                },
                c.choosePhoneType(i.defaultColor), a.current.params.action) {
                var k = a.current.params.action;
                switch (k) {
                    case "login":
                        g.getInfo().then(function() {},
                            function() {
                                b.loginDialog.setScope(function(a) {
                                    return angular.extend(a.config, {
                                        title: "登录账户",
                                        type: "login",
                                        regType: "email",
                                        dialogWidth: "436px",
                                        dialogMargin: "-215px 0 0 -218px",
                                        conHeight: {
                                            height: "362px"
                                        }
                                    }),
                                        a
                                }).show()
                            });
                        break;
                    case "register":
                        b.loginDialog.setScope(function(a) {
                            return angular.extend(a.config, {
                                title: "注册",
                                type: "register",
                                dialogWidth: "436px",
                                dialogMargin: "-290px 0 0 -218px",
                                conHeight: {
                                    height: "520px"
                                }
                            }),
                                a
                        }).show();
                        break;
                    case "code":
                        b.mobileCodeDialog().show()
                }
            }
        }]),
    preSaleAppController.controller("PhoneFittingCtrl", ["$scope", "$timeout", "$location", "curOrder", "UserService", "OrderService", "ModelPhone", "DataMobile", "PluginDialog", "ToolArray",
        function(a, b, c, d, e, f, g, h, i, j) {
            var k = h.fitting.base;
            a.discountAmount = d.discount_amount ? d.discount_amount: 0,
                a.hasDiscount = 0 != d.discount_amount && "0.00" != d.discount_amount ? !0: !1,
                a.phone = g.phones[d.mobile_id],
                a.phonePrice = a.phone.price - 0 - a.discountAmount,
                a.fittingList = h.fitting.list,
                a.fitting = k,
                a.isFittingBase = !0,
                a.dataServiceNormal = g.service.safety1,
                a.dataServiceOther = g.service.safety2,
                a.cartNum = 0,
                a.cartTotal = a.phonePrice,
                a.cartMap = {},
                a.cartList = [],
                a.serviceNormal = 0,
                a.serviceAnther = 0,
                a.resetCallback = {},
                a.countCart = function() {
                    var c = 0,
                        d = 0;
                    jQuery.each(a.cartMap,
                        function(a, b) {
                            c++,
                                d += b.price - 0
                        }),
                        a.cartNum = c,
                        a.cartTotal = a.phonePrice + d,
                        a.updateTotal = !0,
                        b(function() {
                                a.updateTotal = !1
                            },
                            200),
                        b(function() {
                                a.updateTotal = !0
                            },
                            400),
                        b(function() {
                                a.updateTotal = !1
                            },
                            600)
                },
                a.chooseBaseFittging = function() {
                    a.isFittingBase = !0,
                        a.fitting = k
                },
                a.addCart = function(b) {
                    j.remove(a.cartList, b.type, "type"),
                        a.cartList.push(b)
                },
                a.resetCart = function(b) {
                    delete a.cartMap[b],
                        "function" == typeof a.resetCallback[b] && a.resetCallback[b](),
                        j.remove(a.cartList, b, "type")
                },
                a.resetCallback.serviceNormal = function() {
                    a.serviceNormal = 0
                },
                a.resetCallback.serviceAnther = function() {
                    a.serviceAnther = 0
                },
                a.chooseService = function(b, c) {
                    1 == c ? "serviceNormal" == b ? (a.cartMap.serviceNormal = angular.extend({
                            type: "serviceNormal"
                        },
                        g.service.safety1), a.addCart(a.cartMap.serviceNormal), a.serviceNormal = 1) : (a.cartMap.serviceAnther = angular.extend({
                            type: "serviceAnther"
                        },
                        g.service.safety2), a.addCart(a.cartMap.serviceAnther), a.serviceAnther = 1) : a.resetCart(b),
                        a.countCart()
                },
                a.completeTempOrder = function() {
                    var b = {
                            id: d.id,
                            mobile_id: d.mobile_id,
                            order_amount: a.cartTotal,
                            mobile_shell1: a.cartMap.fittingNormal && a.cartMap.fittingNormal.id || 0,
                            mobile_shell2: a.cartMap.fittingAnther && a.cartMap.fittingAnther.id || 0,
                            safety1: a.cartMap.serviceNormal && a.cartMap.serviceNormal.id || 0,
                            safety2: a.cartMap.serviceAnther && a.cartMap.serviceAnther.id || 0
                        },
                        c = f.completeTempOrder(b);
                    c ? e.loginHttp(function() {
                        window.location.href = "#/checkout/" + d.id
                    }) : i.message({
                        message: "操作失败，请重新尝试。"
                    })
                }
        }]),
    preSaleAppController.controller("LoginCtrl", ["$scope", "$rootScope", "$http", "$location", "$document", "MainConfig", "UserService", "VerifyAction",
        function(a, b, c, d, e, f, g, h) {
            b.dialogTitle = "登录账户",
                a.submitted = !1,
                a.login = {};
            var i = {};
            a.$watch("submitted",
                function(b) {
                    b && h.checkErrNumber(a, a.loginForm)
                }),
                a.loginFn = function() {
                    if (a.loginForm.username.$invalid || a.loginForm.password.$invalid || a.captchaNeeded && a.loginForm.captcha.$invalid) return void(a.submitted = !0);
                    a.login.uid = void 0;
                    var c = {
                        "[username]": a.loginForm.username.$modelValue,
                        "[password]": a.loginForm.password.$modelValue
                    };
                    a.captchaNeeded && (c["[captcha]"] = a.captcha),
                        $(".loading").show(),
                        a.clicked = !0,
                        g.login(c).then(function() {
                                a.$emit("user:pushDoLoginAction"),
                                    b.loginDialog.hide(),
                                    $(".loading").hide(),
                                    a.clicked = !1,
                                    g.getInfo()
                            },
                            function(b) {
                                switch (b.errno) {
                                    case f.accountError.ILLEGAL_PASSWORD:
                                    case f.accountError.INVALID_PASSWORD:
                                        i = a.loginForm.password,
                                            i.$setValidity("passwordValid", !1);
                                        break;
                                    case f.accountError.INVALID_CELLPHONE:
                                    case f.accountError.INVALID_UID:
                                    case f.accountError.INVALID_EMAIL:
                                        i = a.loginForm.username,
                                            i.$setValidity("nameValid", !1);
                                        break;
                                    case f.accountError.ILLEGAL_VCODE:
                                    case f.accountError.INVALID_VCODE:
                                        i = a.loginForm.captcha,
                                            i.$setValidity("captchaValid", !1),
                                            $("#captcha1").focus();
                                        break;
                                    case f.accountError.CAPTCHA_REQUIRED:
                                        a.captchaNeeded = !0,
                                            a.login.loginCaptchaUrl = b.data.captcha,
                                            a.login.oldLoginCaptchaUrl = b.data.captcha,
                                            a.login.uid = b.data.uid,
                                            $("#captcha1").focus();
                                        break;
                                    case f.accountError.REFRECH_VCODE:
                                        a.reloadCaptcha(),
                                            i = a.loginForm.captcha,
                                            i.$setValidity("captchaValid", !1),
                                            $("#captcha1").focus();
                                        break;
                                    case f.accountError.FAILED_LOGIN_LIMIT:
                                        i = a.loginForm.password,
                                            i.$setValidity("passwordValid", !1),
                                            a.captchaNeeded = !0,
                                            a.login.loginCaptchaUrl = b.data.captcha,
                                            a.login.oldLoginCaptchaUrl = b.data.captcha,
                                            a.login.uid = b.data.uid,
                                            $("#captcha1").focus()
                                }
                                $(".loading").hide(),
                                    a.clicked = !1,
                                    a.submitted = !0
                            })
                },
                a.toRegister = function() {
                    a.config.title = "注册"
                },
                a.reloadCaptcha = function() {
                    var b = a.login.oldLoginCaptchaUrl;
                    b = b.lastIndexOf("?") > 0 ? b + "&" + +new Date: b + "?" + +new Date,
                        a.login.loginCaptchaUrl = b
                };
            var j = 0,
                k = function(b) {
                    var c = b.target;
                    1 != $(c).closest(".js-verify-item-row").length && (a.$apply(function() {
                        a.captchaShow = !1
                    }), 1 == j && (e.off("click", k), j--))
                };
            a.showCaptcha = function() {
                a.captchaShow = !0,
                    0 == j && (e.on("click", k), j++)
            }
        }]),
    preSaleAppController.controller("GuestLoginCtrl", ["$scope", "$rootScope", "$http", "$location", "$document", "MainConfig", "UserService", "VerifyAction",
        function(a, b, c, d, e, f, g, h) {
            b.dialogTitle = "登录账户",
                a.submitted = !1,
                a.login = {};
            var i = {};
            a.$watch("submitted",
                function(b) {
                    b && h.checkErrNumber(a, a.guestLoginForm)
                }),
                a.loginFn = function() {
                    if (a.guestLoginForm.username.$invalid || a.guestLoginForm.password.$invalid) return void(a.submitted = !0);
                    a.login.uid = void 0;
                    var c = {
                        "[username]": a.guestLoginForm.username.$modelValue,
                        "[password]": a.guestLoginForm.password.$modelValue
                    };
                    a.captchaNeeded && (c["[captcha]"] = a.captcha),
                        $(".loading").show(),
                        a.clicked = !0,
                        g.login(c).then(function() {
                                a.$emit("user:pushDoLoginAction"),
                                    b.loginDialog.hide(),
                                    $(".loading").hide(),
                                    a.clicked = !1,
                                    g.getInfo()
                            },
                            function(b) {
                                switch (b.errno) {
                                    case f.accountError.ILLEGAL_PASSWORD:
                                    case f.accountError.INVALID_PASSWORD:
                                        i = a.guestLoginForm.password,
                                            i.$setValidity("passwordValid", !1);
                                        break;
                                    case f.accountError.INVALID_CELLPHONE:
                                    case f.accountError.INVALID_UID:
                                    case f.accountError.INVALID_EMAIL:
                                        i = a.guestLoginForm.username,
                                            i.$setValidity("nameValid", !1);
                                        break;
                                    case f.accountError.ILLEGAL_VCODE:
                                    case f.accountError.INVALID_VCODE:
                                        i = a.guestLoginForm.captcha,
                                            i.$setValidity("captchaValid", !1),
                                            $("#captcha2").focus();
                                        break;
                                    case f.accountError.CAPTCHA_REQUIRED:
                                        a.captchaNeeded = !0,
                                            a.login.loginCaptchaUrl = b.data.captcha,
                                            a.login.oldLoginCaptchaUrl = b.data.captcha,
                                            a.login.uid = b.data.uid,
                                            $("#captcha2").focus();
                                        break;
                                    case f.accountError.REFRECH_VCODE:
                                        a.reloadCaptcha(),
                                            i = a.guestLoginForm.captcha,
                                            i.$setValidity("captchaValid", !1),
                                            $("#captcha2").focus();
                                        break;
                                    case f.accountError.FAILED_LOGIN_LIMIT:
                                        i = a.guestLoginForm.password,
                                            i.$setValidity("passwordValid", !1),
                                            a.captchaNeeded = !0,
                                            a.login.loginCaptchaUrl = b.data.captcha,
                                            a.login.oldLoginCaptchaUrl = b.data.captcha,
                                            a.login.uid = b.data.uid,
                                            $("#captcha2").focus()
                                }
                                a.submitted = !0,
                                    $(".loading").hide(),
                                    a.clicked = !1
                            })
                },
                a.toRegister = function() {
                    a.config.title = "注册"
                },
                a.reloadCaptcha = function() {
                    var b = a.login.oldLoginCaptchaUrl;
                    b = b.lastIndexOf("?") > 0 ? b + "&" + +new Date: b + "?" + +new Date,
                        a.login.loginCaptchaUrl = b
                };
            var j = 0,
                k = function(b) {
                    var c = b.target;
                    1 != $(c).closest(".js-verify-item-row").length && (a.$apply(function() {
                        a.captchaShow = !1
                    }), 1 == j && (e.un("click", k), j--))
                };
            a.showCaptcha = function() {
                a.captchaShow = !0,
                    0 == j && (e.on("click", k), j++)
            }
        }]),
    preSaleAppController.controller("RegisterCtrl", ["$scope", "$rootScope", "$http", "$location", "$timeout", "$interval", "$document", "MainConfig", "UserService", "VerifyAction",
        function(a, b, c, d, e, f, g, h, i, j) {
            b.dialogTitle = "注册",
                a.submitted = !1,
                a.showBtn = !0,
                a.user = {},
                a.captchaUrl = "https://account.smartisan.com/v2/session/captcha/",
                a.agreed = !1;
            var k = {};
            a.$watch("submitted",
                function(b) {
                    b && j.checkErrNumber(a, a.registerMobileForm)
                }),
                a.register = function() {
                    return a.agreed ? a.registerMobileForm.$invalid ? void(a.submitted = !0) : ($(".loading").show(), a.clicked = !0, void i.register({
                        "[user][cellphone]": a.registerMobileForm.mobile.$modelValue,
                        "[user][email]": a.registerMobileForm.mail.$modelValue,
                        "[ext][cellphone_code]": a.registerMobileForm.verification.$modelValue,
                        "[user][password]": a.registerMobileForm.repassword.$modelValue
                    }).then(function() {
                            a.$emit("user:pushDoLoginAction"),
                                $(".loading").hide(),
                                a.clicked = !1,
                                b.loginDialog.hide()
                        },
                        function(b) {
                            switch ($(".loading").hide(), a.clicked = !1, b.errno) {
                                case h.accountError.REGISTERED_CELLPHONE:
                                    k = a.registerMobileForm.mobile,
                                        k.$setValidity("mobileRegistered", !1);
                                    break;
                                case h.accountError.INVALID_VCODE:
                                    k = a.registerMobileForm.verification,
                                        k.$setValidity("captchaValid", !1);
                                    break;
                                case h.accountError.REFRECH_VCODE:
                                    k = a.registerMobileForm.verification,
                                        k.$setValidity("captchaReload", !1);
                                    break;
                                case h.accountError.REGISTERED_EMAIL:
                                    k = a.registerMobileForm.mail,
                                        k.$setValidity("emailRegistered", !1)
                            }
                            a.submitted = !0
                        })) : void(a.animationTip = !0)
                };
            var l = function() {
                var b = 60;
                a.timer = b,
                    a.showBtn = !1,
                    f(function() {
                            a.timer--
                        },
                        1e3, b).then(function() {
                            a.showBtn = !0
                        })
            };
            a.resend = function() {
                if (a.captchaSubmitted = !0, !a.registerMobileForm.mobile.$invalid && !a.registerMobileForm.captcha.$invalid) {
                    var b = {
                        "[cellphone]": a.registerMobileForm.mobile.$modelValue,
                        "[captcha]": a.captcha
                    };
                    i.sendMobileCaptcha(b).then(function() {
                            l(),
                                a.captchaSubmitted = !1
                        },
                        function(b) {
                            switch (a.captchaSubmitted = !1, b.errno) {
                                case h.accountError.REGISTERED_CELLPHONE:
                                    k = a.registerMobileForm.mobile,
                                        k.$setValidity("mobileRegistered", !1);
                                    break;
                                case h.accountError.ILLEGAL_VCODE:
                                case h.accountError.INVALID_VCODE:
                                    k = a.registerMobileForm.captcha,
                                        k.$setValidity("captchaValid", !1);
                                    break;
                                case h.accountError.CAPTCHA_REQUIRED:
                                    a.captchaUrl = b.data.captcha,
                                        $("#captcha3").focus();
                                    break;
                                case h.accountError.REFRECH_VCODE:
                                    a.reloadCaptcha(),
                                        k = a.registerMobileForm.captcha,
                                        k.$setValidity("captchaValid", !1);
                                    break;
                                case h.accountError.VCODE_TOO_OFTEN:
                                    l()
                            }
                        })
                }
            },
                a.reloadCaptcha = function() {
                    var b = a.captchaUrl;
                    b = b.lastIndexOf("?") > 0 ? b + "&" + +new Date: b + "?" + +new Date,
                        a.captchaUrl = b
                },
                a.reloadCaptcha(),
                a.checkMobile = function() {
                    i.testMobile(a.registerMobileForm.mobile.$modelValue).then(function() {},
                        function(b) {
                            for (var c in b.errInfo) if (b.errInfo.hasOwnProperty(c)) {
                                b.errno = +c;
                                break
                            }
                            1034 == b.errno ? (k = a.registerMobileForm.mobile, k.$setValidity("mobileRegistered", !1)) : 1003 == b.errno && (k = a.registerMobileForm.mobile, k.$setValidity("mobile", !1))
                        })
                },
                a.checkMobileCaptcha = function() {
                    return a.registerMobileForm.mobile.$invalid ? (k = a.registerMobileForm.verification, void k.$setValidity("captchaValid", !1)) : void i.testMobileCode({
                        mobile: a.registerMobileForm.mobile.$modelValue,
                        code: a.registerMobileForm.verification.$modelValue
                    }).then(function() {},
                        function(b) {
                            for (var c in b.errInfo) if (b.errInfo.hasOwnProperty(c)) {
                                b.errno = +c;
                                break
                            }
                            1017 == b.errno || 1036 == b.errno ? (k = a.registerMobileForm.verification, k.$setValidity("captchaValid", !1)) : 1040 == b.errno && (k = a.registerMobileForm.verification, k.$setValidity("captchaReload", !1))
                        })
                },
                a.checkMail = function() {
                    i.testEmail(a.registerMobileForm.mail.$modelValue).then(function() {},
                        function(b) {
                            for (var c in b.errInfo) if (b.errInfo.hasOwnProperty(c)) {
                                b.errno = +c;
                                break
                            }
                            1035 == b.errno ? (k = a.registerMobileForm.mail, k.$setValidity("emailRegistered", !1)) : 1001 == b.errno && (k = a.registerMobileForm.mail, k.$setValidity("mail", !1))
                        })
                },
                a.toLogin = function() {
                    a.config.title = "登录账户"
                };
            var m = 0,
                n = function(b) {
                    var c = b.target;
                    1 != $(c).closest(".js-verify-item-row").length && (a.$apply(function() {
                        a.captchaShow = !1
                    }), 1 == m && (g.off("click", n), m--))
                };
            a.showCaptcha = function() {
                a.captchaShow = !0,
                    0 == m && (g.on("click", n), m++)
            }
        }]),
    preSaleAppController.controller("GuestRegisterCtrl", ["$scope", "$rootScope", "$http", "$location", "$timeout", "$interval", "$document", "MainConfig", "UserService", "VerifyAction",
        function(a, b, c, d, e, f, g, h, i, j) {
            b.dialogTitle = "注册",
                a.submitted = !1,
                a.showBtn = !0,
                a.user = {},
                a.captchaUrl = "https://account.smartisan.com/v2/session/captcha/",
                a.agreed = !0;
            var k = {};
            a.$watch("submitted",
                function(b) {
                    b && j.checkErrNumber(a, a.mobileForm)
                }),
                a.register = function() {
                    return a.mobileForm.$invalid ? void(a.submitted = !0) : ($(".loading").show(), a.clicked = !0, void i.register({
                        "[user][cellphone]": a.mobileForm.mobile.$modelValue,
                        "[ext][cellphone_code]": a.mobileForm.verification.$modelValue
                    }).then(function() {
                            $(".loading").hide(),
                                a.clicked = !1,
                                a.$emit("user:pushDoLoginAction"),
                                b.loginDialog.hide()
                        },
                        function(b) {
                            switch ($(".loading").hide(), a.clicked = !1, b.errno) {
                                case h.accountError.REGISTERED_CELLPHONE:
                                    k = a.mobileForm.mobile,
                                        k.$setValidity("mobileRegistered", !1);
                                    break;
                                case h.accountError.INVALID_VCODE:
                                    k = a.mobileForm.verification,
                                        k.$setValidity("captchaValid", !1);
                                    break;
                                case h.accountError.REFRECH_VCODE:
                                    k = a.mobileForm.verification,
                                        k.$setValidity("captchaReload", !1)
                            }
                            a.submitted = !0
                        }))
                };
            var l = function() {
                var b = 60;
                a.timer = b,
                    a.showBtn = !1,
                    f(function() {
                            a.timer--
                        },
                        1e3, b).then(function() {
                            a.showBtn = !0
                        })
            };
            a.resend = function() {
                if (a.captchaSubmitted = !0, !a.mobileForm.mobile.$invalid && !a.mobileForm.captcha.$invalid) {
                    var b = {
                        "[cellphone]": a.mobileForm.mobile.$modelValue,
                        "[captcha]": a.captcha
                    };
                    i.sendMobileCaptcha(b).then(function() {
                            l(),
                                a.captchaSubmitted = !1
                        },
                        function(b) {
                            switch (a.captchaSubmitted = !1, b.errno) {
                                case h.accountError.REGISTERED_CELLPHONE:
                                    k = a.mobileForm.mobile,
                                        k.$setValidity("mobileRegistered", !1);
                                    break;
                                case h.accountError.ILLEGAL_VCODE:
                                case h.accountError.INVALID_VCODE:
                                    k = a.mobileForm.captcha,
                                        k.$setValidity("captchaValid", !1);
                                    break;
                                case h.accountError.CAPTCHA_REQUIRED:
                                    a.captchaUrl = b.data.captcha,
                                        $("#captcha4").focus();
                                    break;
                                case h.accountError.REFRECH_VCODE:
                                    a.reloadCaptcha(),
                                        k = a.mobileForm.captcha,
                                        k.$setValidity("captchaValid", !1);
                                    break;
                                case h.accountError.VCODE_TOO_OFTEN:
                                    l()
                            }
                        })
                }
            },
                a.reloadCaptcha = function() {
                    var b = a.captchaUrl;
                    b = b.lastIndexOf("?") > 0 ? b + "&" + +new Date: b + "?" + +new Date,
                        a.captchaUrl = b
                },
                a.reloadCaptcha(),
                a.checkMobile = function() {
                    i.testMobile(a.mobileForm.mobile.$modelValue).then(function() {},
                        function(b) {
                            for (var c in b.errInfo) if (b.errInfo.hasOwnProperty(c)) {
                                b.errno = +c;
                                break
                            }
                            1034 == b.errno ? (k = a.mobileForm.mobile, k.$setValidity("mobileRegistered", !1)) : 1003 == b.errno && (k = a.mobileForm.mobile, k.$setValidity("mobile", !1))
                        })
                },
                a.checkMobileCaptcha = function() {
                    return a.mobileForm.mobile.$invalid ? (k = a.mobileForm.verification, void k.$setValidity("captchaValid", !1)) : void i.testMobileCode({
                        mobile: a.mobileForm.mobile.$modelValue,
                        code: a.mobileForm.verification.$modelValue
                    }).then(function() {},
                        function(b) {
                            for (var c in b.errInfo) if (b.errInfo.hasOwnProperty(c)) {
                                b.errno = +c;
                                break
                            }
                            1017 == b.errno || 1036 == b.errno ? (k = a.mobileForm.verification, k.$setValidity("captchaValid", !1)) : 1040 == b.errno && (k = a.mobileForm.verification, k.$setValidity("captchaReload", !1))
                        })
                };
            var m = 0,
                n = function(b) {
                    var c = b.target;
                    1 != $(c).closest(".js-verify-item-row").length && (a.$apply(function() {
                        a.captchaShow = !1
                    }), 1 == m && (g.off("click", n), m--))
                };
            a.showCaptcha = function() {
                a.captchaShow = !0,
                    0 == m && (g.on("click", n), m++)

            }
        }]),
    preSaleAppController.controller("OrderCheckoutCtrl", ["$route", "$routeParams", "$rootScope", "$scope", "$timeout", "$location", "addresses", "DeliveryAddressService", "curOrder", "ModelPhone", "OrderService", "DataPayment", "PluginDialog", "VerifyAction", "Pagemap", "MainConfig",
        function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
            d.curOrder = i,
                d.mobile = j.phones[i.mobile_id],
                d.isTempOrder = i.isTempOrder,
                d.DeliveryAddressService = h,
                d.addressType = "input",
                d.addressBtnText = "选择已有地址",
                d.singleAddress = {
                    init: !0
                },
                d.dataInstallment = l.installment,
                d.payMenuType = "online",
                d.canInstallment = 2 == i.pay_type;
            var q = {},
                r = 0,
                s = a.current.params.orderID,
                t = a.current.loadedTemplateUrl;
            d.chooseAddress = function(a, b) {
                d.curOrder.address_id = a.id,
                    r = b,
                    0 != m.showList.length || !t.match(/checkout/) || k.addressTips[s] || p.cityWhiteMap[a.city_code] || e(function() {
                    k.addressTips[s] = !0,
                        m.create({
                            mark: "addressError",
                            controller: "DialogErrorCtrl",
                            dialogClass: "module-dialog-error",
                            title: "提示信息",
                            templateUrl: o.dialog.addressError,
                            hasBtn: !1
                        }).show()
                })
            },
                h.addresses.length && (q = h.addresses[0], d.chooseAddress(h.addresses[0], 0)),
                i.isTempOrder ? (d.curOrder.invoice_type = 0, d.curOrder.invoice_title = "", h.addresses.length ? (d.addressType = "list", d.addressBtnText = "使用新地址") : d.addressBtnText = "选择已有地址") : (d.addressBtnText = "选择已有地址", d.curOrder.order_id = i.id, delete d.curOrder.id, d.canChooseAddress = h.addresses.length ? !0: !1, d.singleAddress = {
                    accept_name: i.accept_name,
                    area_code: i.area_code,
                    telphone: i.telphone,
                    province_code: i.province_code,
                    city_code: i.city_code,
                    district_code: i.district_code,
                    street: i.street,
                    floor: i.floor,
                    post_code: i.post_code
                },
                    d.curOrder.notice_mobile = ""),
                d.choosePayType = function(a) {
                    d.payMenuType = a,
                        d.$$childTail.payMenuType = a,
                        d.curOrder.pay_channel_type = "online" == a ? 1: "4_1"
                },
                d.chooseOnline = function(a) {
                    e(function() {
                        d.curOrder.pay_channel_type = a
                    })
                },
                d.chooseInvoice = function(a) {
                    e(function() {
                        d.curOrder.invoice_type = a,
                                1 == a ? (d.curOrder.invoice_title = "", d.attachedForm.invoiceDetail.$setValidity("required", !1)) : (d.curOrder.invoice_title = "", d.attachedForm.invoiceDetail.$setValidity("required", !0))
                    })
                },
                d.toggleAddressType = function() {
                    if ("input" == d.addressType) d.addressBtnText = i.isTempOrder ? "使用新地址": "返回修改地址",
                        d.addressType = "list";
                    else {
                        if (h.addresses.length > 9) return m.confirm({
                            message: "您的收货地址数量已满，是否前去管理您的收货地址",
                            ok: function(a) {
                                c.openAddressDialog().setScope(function(a) {
                                    return angular.extend(a.config, {
                                        title: "管理收货地址",
                                        type: "list"
                                    }),
                                        a
                                }).show(),
                                    a.close()
                            }
                        }),
                            !1;
                        d.addressBtnText = "选择已有地址",
                            d.addressType = "input"
                    }
                };
            var u = function() {
                var a = angular.extend({
                            cdkey_code: ""
                        },
                        d.curOrder),
                    b = /^.*\_/gi;
                "string" == typeof a.pay_channel_type && a.pay_channel_type.match(b) && ("installment" == d.payMenuType ? (a.ped_cnt = a.pay_channel_type.replace(b, ""), a.pay_channel_type = 4) : (a.bank = a.pay_channel_type.replace(b, ""), a.pay_channel_type = 5)),
                    a.isTempOrder ? m.create({
                        mark: "confirmOrder",
                        controller: "DialogConfirmOrderCtrl",
                        dialogClass: "module-dialog-confirm-order",
                        title: "确认信息",
                        templateUrl: o.dialog.confirmOrder,
                        hasBtn: !1,
                        params: {
                            orderInfo: a
                        }
                    }).show() : k.updateOrder(a).then(function(a) {
                        f.path("/confirm/" + a.order_id)
                    })
            };
            d.saveOrder = function() {
                if (0 == d.curOrder.invoice_type && d.attachedForm.invoiceDetail.$setValidity("required", !0), n.doVerify(d.attachedForm)) if ("list" == d.addressType) d.curOrder.address_id ? (q = h.addresses[r], d.curOrder.accept_name = q.accept_name, d.curOrder.mobile = q.mobile, d.curOrder.area_code = q.area_code, d.curOrder.telphone = q.telphone, d.curOrder.province_code = q.province_code, d.curOrder.province = q.province, d.curOrder.city_code = q.city_code, d.curOrder.city = q.city, d.curOrder.district_code = q.district_code, d.curOrder.district = q.district, d.curOrder.street = q.street, d.curOrder.floor = q.floor, d.curOrder.post_code = q.post_code, u()) : m.message({
                    message: "请选择送货地址或者填写新的送货地址"
                });
                else {
                    var a = d.addressForm,
                        b = n.doVerify(a);
                    b && (d.curOrder.address_id = 0, angular.extend(d.curOrder, d.singleAddress), u())
                }
            },
                d.$watch("DeliveryAddressService.addresses.length",
                    function(a) {
                        0 == a ? (d.addressType = "input", d.canChooseAddress = !1) : d.canChooseAddress = !0
                    },
                    !0)
        }]),
    preSaleAppController.controller("OrderConfirmCtrl", ["$routeParams", "$scope", "$location", "curOrder", "DataPayment", "OrderService", "ToolArray",
        function(a, b, c, d, e, f, g) {
            b.curOrder = d,
                b.orderId = d.id,
                b.installmentLabel = "",
                "4" == d.pay_channel_type && (b.installmentLabel = "1" == d.ped_cnt ? "全款支付": "费率为 " + g.getArrayBykey(e.installment, d.ped_cnt, "period").fee + "%")
        }]),
    preSaleAppController.controller("OrderCtrl", ["$routeParams", "$scope", "addresses", "orders", "ToolDate",
        function(a, b, c, d) {
            b.orders = d,
                b.addresses = c
        }]),
    preSaleAppController.controller("PayCtrl", ["$scope", "payInfo", "OrderService",
        function(a, b, c) {
            angular.extend(b, {
                pay_money: .01
            }),
                c.payOrder(b)
        }]),
    preSaleAppController.controller("PayResultCtrl", ["$routeParams", "$location", "$scope", "$timeout",
        function(a, b, c, d) {
            c.success = "success" == a.status ? !0: !1;
            var e = !1;
            c.autoLinkTime = 10;
            var f = function() {
                d(function() {
                        return b.$$path.match(/payment/) ? void(0 == c.autoLinkTime ? c.linkOrderList() : (c.autoLinkTime--, f())) : !1
                    },
                    1e3)
            };
            c.linkOrderList = function() {
                return e ? !1: (e = !0, void b.path("/order/list"))
            },
                c.linkFaq = function() {
                    return e ? !1: (e = !0, b.path("faq/order/pay-question"), void c.closeDialog())
                },
                f()
        }]),
    preSaleAppController.controller("FaqCtrl", ["$routeParams", "$location", "$scope", "$timeout", "Pagemap",
        function(a, b, c, d, e) {
            c.categoryKey = a.category,
                c.categoryMap = e.faq[c.categoryKey],
                c.chooseDetail = function(a) {
                    var d = c.categoryMap.list[a];
                    d ? (c.detailKey = a, c.curDetailTitle = d.name, c.curDetailContent = d.content) : b.path("error/404")
                },
                c.chooseDetail(a.detail)
        }]),
    angular.module("analytics", []).run(["$rootScope", "Analytics",
        function(a, b) { !
            function(a, b, c, d, e, f, g) {
                a.GoogleAnalyticsObject = e,
                    a[e] = a[e] ||
                        function() { (a[e].q = a[e].q || []).push(arguments)
                        },
                    a[e].l = 1 * new Date,
                    f = b.createElement(c),
                    g = b.getElementsByTagName(c)[0],
                    f.async = 1,
                    f.src = d,
                    g.parentNode.insertBefore(f, g)
            } (window, document, "script", "//www.google-analytics.com/analytics.js", "ga"),
            ga("create", "UA-49819160-1", "smartisan.com"),
            ga("require", "linkid", "linkid.js"),
            a.$on("$viewContentLoaded", b.track)
        }]).service("Analytics", ["$rootScope", "$window", "$location", "$routeParams",
        function(a, b, c, d) {
            var e = function() {
                    var a = f(c.path(), d);
                    b.ga("send", "pageview", {
                        page: a
                    })
                },
                f = function(a, b) {
                    for (var c in b) {
                        var d = "/" + b[c];
                        a = a.replace(d, "")
                    }
                    var e = decodeURIComponent($.param(b));
                    return "" === e ? a: a + "?" + e
                };
            return {
                track: e
            }
        }]);