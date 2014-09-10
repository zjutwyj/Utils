/**
 * @description 对象继承
 * @namespace extend
 * @author yongjin on 2014/9/9
 */
(function(){
    var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
    this.Class = function(){};
    Class.extend = function(prop) {
        var _super = this.prototype;
        initializing = true;
        var prototype = new this();
        initializing = false;
        // 原型属性继承
        for (var name in prop) {
            // 检测是否覆盖已经存在的方法
            prototype[name] = typeof prop[name] == "function" &&
                typeof _super[name] == "function" && fnTest.test(prop[name]) ?
                (function(name, fn){
                    return function() {
                        var tmp = this._super;
                        // 新建一个超级父类
                        this._super = _super[name];
                        var ret = fn.apply(this, arguments);
                        this._super = tmp;
                        return ret;
                    };
                })(name, prop[name]) :
                prop[name];
        }
        // 虚拟类构造函数
        function Class() {
            // 在init方法中执行construction初始化
            if ( !initializing && this.init )
                this.init.apply(this, arguments);
        }
        Class.prototype = prototype;
        // 执行构造函数
        Class.prototype.constructor = Class;
        // 并使这个类可扩展
        Class.extend = arguments.callee;

        return Class;
    };
})();

var Person = Class.extend({
    init: function(isDancing){
        this.dancing = isDancing;
    },
    dance: function() {
        return this.dancing;
    }
});

var Ninja = Person.extend({
    init: function(){
        this._super( false );
    },

    dance: function(){
        // Call the inherited version of dance()
        return this._super();
    },
    swingSword: function(){
        return true;
    }
});

this.instance = new Ninja(true);