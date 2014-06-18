/**
 * @description angular重构   移除工具类和DOM操作， 通过外导入
 * @namespace angular
 * @author yongjin on 2014/6/16
 */
;
(function (window, document, undefined) {
    'use strict';
    var utils, // 工具类
        jqLite, // Dom操作类
        angular = window.angular || (window.angular = {}),
        uid = ['0', '0', '0'];

    // 1267
    function angularInit(element, bootstrap) {
        var appElement = element, module;
        var elements = jqLite('div[ng-app], html[ng-app], body[ng-app]');
        if (elements.size() > 0){
            appElement = elements.get(0);
            module = jqLite(appElement).attr('ng-app');
        }
        bootstrap(appElement, module ? [module] : []);
    }
    // 1365
    function bootstrap(element, modules) {
        var doBootstrap = function() {
            element = jqLite(element);

            if (element.injector()) {
                var tag = (element[0] === document) ? 'document' : startingTag(element);
                throw ngMinErr('btstrpd', "App Already Bootstrapped with this Element '{0}'", tag);
            }

            modules = modules || [];
            modules.unshift(['$provide', function($provide) {
                $provide.value('$rootElement', element);
            }]);
            modules.unshift('ng');
            var injector = createInjector(modules);
            injector.invoke(['$rootScope', '$rootElement', '$compile', '$injector', '$animate',
                    function(scope, element, compile, injector, animate) {
                        scope.$apply(function() {
                            element.data('$injector', injector);
                            compile(element)(scope);
                        });
                    }]
            );
            return injector;
        };

        var NG_DEFER_BOOTSTRAP = /^NG_DEFER_BOOTSTRAP!/;

        if (window && !NG_DEFER_BOOTSTRAP.test(window.name)) {
            return doBootstrap();
        }

        window.name = window.name.replace(NG_DEFER_BOOTSTRAP, '');
        angular.resumeBootstrap = function(extraModules) {
            forEach(extraModules, function(module) {
                modules.push(module);
            });
            doBootstrap();
        };
    }
    // 2230 angular自己实现的DOM操作类
    function JQLite(element) {

    }
    var JQLitePrototype = JQLite.prototype = {

    };

    // 3659
    function supportObject(delegate) {
        return function(key, value) {
            if (utils.typeOf(key) === 'object') {
                utils.each(key, reverseParams(delegate));
            } else {
                return delegate(key, value);
            }
        };
    }


    // 1414
    // 绑定各类插件
    function bindPlugin(){
        jqLite = window.jQuery;
        utils = window.Zwt;
        utils.extend(jQuery.fn, {
            scope: JQLitePrototype.scope,
            isolateScope: JQLitePrototype.isolateScope,
            controller: JQLitePrototype.controller,
            injector: JQLitePrototype.injector,
            inheritedData: JQLitePrototype.inheritedData
        });
        angular.element = jqLite; // 供指令调用
    }
    // 程序入口
    bindPlugin();
    jqLite(document).ready(function() {
        angularInit(document, bootstrap);
    });


})(window, document);