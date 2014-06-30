/**
 * @description angular源码学习
 * @namespace angular
 * @author yongjin on 2014/6/16
 */
;
(function (window, document, undefined) {
    'use strict';
    var utils = window.Est, // 工具类
        jqLite = window.jQuery, // Dom操作类
        angularModule,
        angular = window.angular || (window.angular = {});

    // angular初始化 =========================== 1267 =====================================
    function angularInit(element, bootstrap) {
        var appElement = element, module;
        var elements = jqLite('div[ng-app], html[ng-app], body[ng-app]');
        if (elements.size() > 0){
            appElement = elements.get(0);
            module = jqLite(appElement).attr('ng-app');
        }
        bootstrap(appElement, module ? [module] : []);
    }
    // 引导程序 ================================== 1365 ===================================
    function bootstrap(element, modules) {
        var doBootstrap = function() {
            element = jqLite(element);
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
            utils.forEach(extraModules, function(module) {
                modules.push(module);
            });
            doBootstrap();
        };
    }
    // 绑定各类插件 =========================== 1414 ======================================
    function bindPlugin(){
        utils.extend(jQuery.fn, {
            //TODO scope isolateScope controller, injector, inheritedData
            scope: JQLitePrototype.scope,
            isolateScope: JQLitePrototype.isolateScope,
            controller: JQLitePrototype.controller,
            injector: JQLitePrototype.injector,
            inheritedData: JQLitePrototype.inheritedData
        });
        angular.element = jqLite; // 供指令调用
    }
    // 模块加载器 ============ 1530 =======================================================
    function setupModuleLoader(window) {
        function ensure(obj, name, factory) {
            return obj[name] || (obj[name] = factory());
        }
        var angular = ensure(window, 'angular', Object);
        return ensure(angular, 'module', function() {
            var modules = {};
            return function module(name, requires, configFn) {
                var assertNotHasOwnProperty = function(name, context) {
                    if (name === 'hasOwnProperty') {
                        throw Error('badname: hasOwnProperty is not a valid name ' + context);
                    }
                };
                assertNotHasOwnProperty(name, 'module');
                if (requires && modules.hasOwnProperty(name)) {
                    modules[name] = null;
                }
                return ensure(modules, name, function() {
                    if (!requires) {
                        throw Error('nomod:Module ' + name + ' is not available! You either misspelled ' +
                            'the module name or forgot to load it. If registering a module ensure that you ' +
                            'specify the dependencies as the second argument.');
                    }
                    var invokeQueue = [];
                    var runBlocks = [];
                    var config = invokeLater('$injector', 'invoke');
                    var moduleInstance = {
                        _invokeQueue: invokeQueue,
                        _runBlocks: runBlocks,
                        requires: requires,
                        name: name,
                        provider: invokeLater('$provide', 'provider'),
                        factory: invokeLater('$provide', 'factory'),
                        service: invokeLater('$provide', 'service'),
                        value: invokeLater('$provide', 'value'),
                        constant: invokeLater('$provide', 'constant', 'unshift'),
                        animation: invokeLater('$animateProvider', 'register'),
                        filter: invokeLater('$filterProvider', 'register'),
                        controller: invokeLater('$controllerProvider', 'register'),
                        directive: invokeLater('$compileProvider', 'directive'),
                        config: config,
                        run: function(block) {
                            runBlocks.push(block);
                            return this;
                        }
                    };
                    if (configFn) {
                        config(configFn);
                    }
                    return  moduleInstance;
                    function invokeLater(provider, method, insertMethod) {
                        return function() {
                            invokeQueue[insertMethod || 'push']([provider, method, arguments]);
                            return moduleInstance;
                        };
                    }
                });
            };
        });
    }
    // tool ===============================================================================
    var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
    var MOZ_HACK_REGEXP = /^moz([A-Z])/;
    var PREFIX_REGEXP = /^(x[\:\-_]|data[\:\-_])/i;
    function noop() {} noop.$inject = [];
    function camelCase(name) {
        return name.
            replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
                return offset ? letter.toUpperCase() : letter;
            }).
            replace(MOZ_HACK_REGEXP, 'Moz$1');
    }
    function directiveNormalize(name) {
        return camelCase(name.replace(PREFIX_REGEXP, ''));
    }
    function assertArg(arg, name, reason) {
        if (!arg) {
            throw Error('areq Argument is');
        }
        return arg;
    }
    function assertArgFn(arg, name, acceptArrayAnnotation) {
        if (acceptArrayAnnotation && utils.typeOf === 'array') {
            arg = arg[arg.length - 1];
        }
        assertArg(utils.typeOf(arg) === 'function', name, 'not a function, got ' +
            (arg && typeof arg == 'object' ? arg.constructor.name || 'Object' : typeof arg));
        return arg;
    }
    // angular自己实现的DOM操作类 =============== 2230 ==================================
    function JQLite(element) { }
    var JQLitePrototype = JQLite.prototype = { };
    // hashMap对象 ====================== 3006 ==================================
    function HashMap(array){
        utils.forEach(array, this.put, this);
    }
    HashMap.prototype = {
        put: function(key, value) {
            this[utils.hashKey(key)] = value;
        },
        get: function(key) {
            return this[utils.hashKey(key)];
        },
        remove: function(key) {
            var value = this[key = utils.hashKey(key)];
            delete this[key];
            return value;
        }
    };
    // 注解 ====================================== 3099 =======================================
    var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
    var FN_ARG_SPLIT = /,/;
    var FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;
    var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    function annotate(fn) {
        var $inject, fnText, argDecl, last;
        if (typeof fn == 'function') {
            if (!($inject = fn.$inject)) {
                $inject = [];
                if (fn.length) {
                    fnText = fn.toString().replace(STRIP_COMMENTS, '');
                    argDecl = fnText.match(FN_ARGS);
                    utils.forEach(argDecl[1].split(FN_ARG_SPLIT), function(arg){
                        arg.replace(FN_ARG, function(all, underscore, name){
                            $inject.push(name);
                        });
                    });
                }
                fn.$inject = $inject;
            }
        } else if (utils.typeOf(fn) === 'array') {
            last = fn.length - 1;
            assertArgFn(fn[last], 'fn');
            $inject = fn.slice(0, last);
        } else {
            assertArgFn(fn, 'fn', true);
        }
        return $inject;
    }
    // 依赖注入 ============================ 3625 ====================================
    function createInjector(modulesToLoad) {
        var INSTANTIATING = {},
            providerSuffix = 'Provider',
            path = [],
            loadedModules = new HashMap(),
            providerCache = {
                $provide: {
                    provider: supportObject(provider)
                    // TODO provider factory service constant value decorator
                }
            },
            providerInjector = (providerCache.$injector = createInternalInjector(providerCache, function() {
                throw Error('unpr : Unknown provider: ' + path.join(' <- '));
            })),
            instanceCache = {},
            instanceInjector = (instanceCache.$injector = createInternalInjector(instanceCache, function(servicename) {
                var provider = providerInjector.get(servicename + providerSuffix);
                return instanceInjector.invoke(provider.$get, provider);
            }));
        utils.forEach(loadModules(modulesToLoad), function(fn) {
            instanceInjector.invoke(fn || noop);
        });
        return instanceInjector;
        // 载入模块
        function loadModules(modulesToLoad){
            var runBlocks = [], moduleFn, invokeQueue, i, ii;
            utils.forEach(modulesToLoad, function(module) {
                if (loadedModules.get(module)) return;
                loadedModules.put(module, true);
                try {
                    if (utils.typeOf(module) === 'string') {
                        moduleFn = angularModule(module);
                        runBlocks = runBlocks.concat(loadModules(moduleFn.requires)).concat(moduleFn._runBlocks);
                        for(invokeQueue = moduleFn._invokeQueue, i = 0, ii = invokeQueue.length; i < ii; i++) {
                            var invokeArgs = invokeQueue[i],
                                provider = providerInjector.get(invokeArgs[0]);

                            provider[invokeArgs[1]].apply(provider, invokeArgs[2]);
                        }
                    } else if (utils.typeOf(module) === 'function') {
                        runBlocks.push(providerInjector.invoke(module));
                    } else if (utils.typeOf(module) === 'array') {
                        runBlocks.push(providerInjector.invoke(module));
                    } else {
                        assertArgFn(module, 'module');
                    }
                } catch (e) {
                    if (utils.typeOf(module) === 'array') {
                        module = module[module.length - 1];
                    }
                    if (e.message && e.stack && e.stack.indexOf(e.message) == -1) {
                        e = e.message + '\n' + e.stack;
                    }
                    throw Error('modulerr ： Failed to instantiate module ' + module);
                }
            });
            return runBlocks;
        }
        // 内部依赖注入器
        function createInternalInjector(cache, factory) {
            function getService(serviceName) {
                if (cache.hasOwnProperty(serviceName)) {
                    if (cache[serviceName] === INSTANTIATING) {
                        throw Error('cdep: Circular dependency found: ', path.join(' <- '));
                    }
                    return cache[serviceName];
                } else {
                    try {
                        path.unshift(serviceName);
                        cache[serviceName] = INSTANTIATING;
                        return cache[serviceName] = factory(serviceName);
                    } catch (err) {
                        if (cache[serviceName] === INSTANTIATING) {
                            delete cache[serviceName];
                        }
                        throw err;
                    } finally {
                        path.shift();
                    }
                }
            }
            // 调用
            function invoke(fn, self, locals){
                var args = [], $inject = annotate(fn), length, i, key;
                for(i = 0, length = $inject.length; i < length; i++) {
                    key = $inject[i];
                    if (typeof key !== 'string') {
                        throw Error('itkn : Incorrect injection token! Expected service name as string, got ' + key);
                    }
                    args.push(locals && locals.hasOwnProperty(key) ? locals[key] : getService(key));
                }
                if (!fn.$inject) {
                    fn = fn[length];
                }
                return fn.apply(self, args);
            }
            function instantiate(Type, locals) {
                var Constructor = function() {}, instance, returnedValue;
                Constructor.prototype = (utils.typeOf(Type) === 'array' ? Type[Type.length - 1] : Type).prototype;
                instance = new Constructor();
                returnedValue = invoke(Type, instance, locals);
                return utils.typeOf(returnedValue) === 'object' || utils.typeOf(returnedValue) === 'function' ? returnedValue : instance;
            }
            return {
                invoke: invoke,
                instantiate: instantiate,
                get: getService,
                annotate: annotate,
                has: function(name) {
                    return providerCache.hasOwnProperty(name + providerSuffix) || cache.hasOwnProperty(name);
                }
            };
        }
        function supportObject(delegate) {
            return function(key, value) {
                if (utils.typeOf(key) === 'object') {
                    utils.each(key, function(delegate){
                        return function(key, value){
                            delegate(key, value);
                        }
                    });
                } else {
                    return delegate(key, value);
                }
            };
        }
        function provider(name, provider_) {
            if (name === 'hasOwnProperty') {
                throw Error('badName : hasOwnProperty is not a valid service name');
            }
            if (utils.typeOf(provider_) === 'function' || utils.typeOf(provider_) === 'array') {
                provider_ = providerInjector.instantiate(provider_);
            }
            if (!provider_.$get) {
                throw Error('pget : Provider  must define $get factory method.');
            }
            return providerCache[name + providerSuffix] = provider_;
        }
    }
    // ================================= Provider ===============================
    function $LocaleProvider(){
        this.$get = function() {
            return {
                id: 'en-us',
                NUMBER_FORMATS: {
                    DECIMAL_SEP: '.',
                    GROUP_SEP: ',',
                    PATTERNS: [
                        { // Decimal Pattern
                            minInt: 1,
                            minFrac: 0,
                            maxFrac: 3,
                            posPre: '',
                            posSuf: '',
                            negPre: '-',
                            negSuf: '',
                            gSize: 3,
                            lgSize: 3
                        },{ //Currency Pattern
                            minInt: 1,
                            minFrac: 2,
                            maxFrac: 2,
                            posPre: '\u00A4',
                            posSuf: '',
                            negPre: '(\u00A4',
                            negSuf: ')',
                            gSize: 3,
                            lgSize: 3
                        }
                    ],
                    CURRENCY_SYM: '$'
                },
                DATETIME_FORMATS: {
                    MONTH:
                        'January,February,March,April,May,June,July,August,September,October,November,December'
                            .split(','),
                    SHORTMONTH:  'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(','),
                    DAY: 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday'.split(','),
                    SHORTDAY: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat'.split(','),
                    AMPMS: ['AM','PM'],
                    medium: 'MMM d, y h:mm:ss a',
                    short: 'M/d/yy h:mm a',
                    fullDate: 'EEEE, MMMM d, y',
                    longDate: 'MMMM d, y',
                    mediumDate: 'MMM d, y',
                    shortDate: 'M/d/yy',
                    mediumTime: 'h:mm:ss a',
                    shortTime: 'h:mm a'
                },
                pluralCat: function(num) {
                    if (num === 1) {
                        return 'one';
                    }
                    return 'other';
                }
            };
        };
    }
    function $$SanitizeUriProvider() {
        // 清除链接和图片地址. 用于 $compile 和 $sanitize.12518
        var aHrefSanitizationWhitelist = /^\s*(https?|ftp|mailto|tel|file):/,
            imgSrcSanitizationWhitelist = /^\s*(https?|ftp|file):|data:image\//;
        this.aHrefSanitizationWhitelist = function(regexp) {
            if (utils.typeOf(regexp) !== 'undefined') {
                aHrefSanitizationWhitelist = regexp;
                return this;
            }
            return aHrefSanitizationWhitelist;
        };
        this.imgSrcSanitizationWhitelist = function(regexp) {
            if (utils.typeOf(regexp) !== 'undefined') {
                imgSrcSanitizationWhitelist = regexp;
                return this;
            }
            return imgSrcSanitizationWhitelist;
        };
        this.$get = function() {
            return function sanitizeUri(uri, isImage) {
                var regex = isImage ? imgSrcSanitizationWhitelist : aHrefSanitizationWhitelist;
                var normalizedVal = utils.urlResolve(uri).href;
                    if (normalizedVal !== '' && !normalizedVal.match(regex)) {
                        return 'unsafe:'+normalizedVal;
                    }
                return uri;
            };
        };
    }
    var $AnimateProvider = ['$provide', function($provide) {
        this.$$selectors = {};
        this.register = function(name, factory) {
            var key = name + '-animation';
            if (name && name.charAt(0) != '.') throw Error('notcsel : Expecting class selector starting with ');
            this.$$selectors[name.substr(1)] = key;
            $provide.factory(key, factory);
        };
        this.classNameFilter = function(expression) {
            if(arguments.length === 1) {
                this.$$classNameFilter = (expression instanceof RegExp) ? expression : null;
            }
            return this.$$classNameFilter;
        };
        this.$get = ['$timeout', '$$asyncCallback', function($timeout, $$asyncCallback) {
            function async(fn) {
                fn && $$asyncCallback(fn);
            }
            /**
             *
             * @ngdoc service
             * @name $animate
             * @description The $animate service provides rudimentary DOM manipulation functions to
             * insert, remove and move elements within the DOM, as well as adding and removing classes.
             * This service is the core service used by the ngAnimate $animator service which provides
             * high-level animation hooks for CSS and JavaScript.
             *
             * $animate is available in the AngularJS core, however, the ngAnimate module must be included
             * to enable full out animation support. Otherwise, $animate will only perform simple DOM
             * manipulation operations.
             *
             * To learn more about enabling animation support, click here to visit the {@link ngAnimate
     * ngAnimate module page} as well as the {@link ngAnimate.$animate ngAnimate $animate service
     * page}.
             */
            return {

                /**
                 *
                 * @ngdoc method
                 * @name $animate#enter
                 * @function
                 * @description Inserts the element into the DOM either after the `after` element or within
                 *   the `parent` element. Once complete, the done() callback will be fired (if provided).
                 * @param {DOMElement} element the element which will be inserted into the DOM
                 * @param {DOMElement} parent the parent element which will append the element as
                 *   a child (if the after element is not present)
                 * @param {DOMElement} after the sibling element which will append the element
                 *   after itself
                 * @param {Function=} done callback function that will be called after the element has been
                 *   inserted into the DOM
                 */
                enter : function(element, parent, after, done) {
                    if (after) {
                        after.after(element);
                    } else {
                        if (!parent || !parent[0]) {
                            parent = after.parent();
                        }
                        parent.append(element);
                    }
                    async(done);
                },

                /**
                 *
                 * @ngdoc method
                 * @name $animate#leave
                 * @function
                 * @description Removes the element from the DOM. Once complete, the done() callback will be
                 *   fired (if provided).
                 * @param {DOMElement} element the element which will be removed from the DOM
                 * @param {Function=} done callback function that will be called after the element has been
                 *   removed from the DOM
                 */
                leave : function(element, done) {
                    element.remove();
                    async(done);
                },

                /**
                 *
                 * @ngdoc method
                 * @name $animate#move
                 * @function
                 * @description Moves the position of the provided element within the DOM to be placed
                 * either after the `after` element or inside of the `parent` element. Once complete, the
                 * done() callback will be fired (if provided).
                 *
                 * @param {DOMElement} element the element which will be moved around within the
                 *   DOM
                 * @param {DOMElement} parent the parent element where the element will be
                 *   inserted into (if the after element is not present)
                 * @param {DOMElement} after the sibling element where the element will be
                 *   positioned next to
                 * @param {Function=} done the callback function (if provided) that will be fired after the
                 *   element has been moved to its new position
                 */
                move : function(element, parent, after, done) {
                    // Do not remove element before insert. Removing will cause data associated with the
                    // element to be dropped. Insert will implicitly do the remove.
                    this.enter(element, parent, after, done);
                },

                /**
                 *
                 * @ngdoc method
                 * @name $animate#addClass
                 * @function
                 * @description Adds the provided className CSS class value to the provided element. Once
                 * complete, the done() callback will be fired (if provided).
                 * @param {DOMElement} element the element which will have the className value
                 *   added to it
                 * @param {string} className the CSS class which will be added to the element
                 * @param {Function=} done the callback function (if provided) that will be fired after the
                 *   className value has been added to the element
                 */
                addClass : function(element, className, done) {
                    className = isString(className) ?
                        className :
                        isArray(className) ? className.join(' ') : '';
                    forEach(element, function (element) {
                        jqLiteAddClass(element, className);
                    });
                    async(done);
                },

                /**
                 *
                 * @ngdoc method
                 * @name $animate#removeClass
                 * @function
                 * @description Removes the provided className CSS class value from the provided element.
                 * Once complete, the done() callback will be fired (if provided).
                 * @param {DOMElement} element the element which will have the className value
                 *   removed from it
                 * @param {string} className the CSS class which will be removed from the element
                 * @param {Function=} done the callback function (if provided) that will be fired after the
                 *   className value has been removed from the element
                 */
                removeClass : function(element, className, done) {
                    className = isString(className) ?
                        className :
                        isArray(className) ? className.join(' ') : '';
                    forEach(element, function (element) {
                        jqLiteRemoveClass(element, className);
                    });
                    async(done);
                },

                /**
                 *
                 * @ngdoc method
                 * @name $animate#setClass
                 * @function
                 * @description Adds and/or removes the given CSS classes to and from the element.
                 * Once complete, the done() callback will be fired (if provided).
                 * @param {DOMElement} element the element which will it's CSS classes changed
                 *   removed from it
                 * @param {string} add the CSS classes which will be added to the element
                 * @param {string} remove the CSS class which will be removed from the element
                 * @param {Function=} done the callback function (if provided) that will be fired after the
                 *   CSS classes have been set on the element
                 */
                setClass : function(element, add, remove, done) {
                    forEach(element, function (element) {
                        jqLiteAddClass(element, add);
                        jqLiteRemoveClass(element, remove);
                    });
                    async(done);
                },

                enabled : noop
            };
        }];
    }];
    $CompileProvider.$inject = ['$provide', '$$sanitizeUriProvider'];
    function $CompileProvider($provide, $$sanitizeUriProvider) {
        var hasDirectives = {},
            Suffix = 'Directive',
            COMMENT_DIRECTIVE_REGEXP = /^\s*directive\:\s*([\d\w\-_]+)\s+(.*)$/,
            CLASS_DIRECTIVE_REGEXP = /(([\d\w\-_]+)(?:\:([^;]+))?;?)/,
            TABLE_CONTENT_REGEXP = /^<\s*(tr|th|td|thead|tbody|tfoot)(\s+[^>]*)?>/i;

        var EVENT_HANDLER_ATTR_REGEXP = /^(on[a-z]+|formaction)$/;
        this.directive = function registerDirective(name, directiveFactory) {
            if (name === 'hasOwnProperty') {
                throw Error('badname hasOwnProperty is not a valid name');
            }
            if (utils.typeOf(name) === 'string') {
                assertArg(directiveFactory, 'directiveFactory');
                if (!hasDirectives.hasOwnProperty(name)) {
                    hasDirectives[name] = [];
                    $provide.factory(name + Suffix, ['$injector',
                        function($injector) {
                            var directives = [];
                            utils.forEach(hasDirectives[name], function(directiveFactory, index) {
                                try {
                                    var directive = $injector.invoke(directiveFactory);
                                    if (utils.typeOf(directive) === 'function') {
                                        directive = { compile: utils.valueFn(directive) };
                                    } else if (!directive.compile && directive.link) {
                                        directive.compile = utils.valueFn(directive.link);
                                    }
                                    directive.priority = directive.priority || 0;
                                    directive.index = index;
                                    directive.name = directive.name || name;
                                    directive.require = directive.require || (directive.controller && directive.name);
                                    directive.restrict = directive.restrict || 'A';
                                    directives.push(directive);
                                } catch (e) {
                                    console.error(e);
                                }
                            });
                            return directives;
                        }]);
                }
                hasDirectives[name].push(directiveFactory);
            } else {
                utils.forEach(name, utils.reverseParams(registerDirective));
            }
            return this;
        };
        this.aHrefSanitizationWhitelist = function(regexp) {
            if (utils.typeOf(regexp) !== 'undefined') {
                $$sanitizeUriProvider.aHrefSanitizationWhitelist(regexp);
                return this;
            } else {
                return $$sanitizeUriProvider.aHrefSanitizationWhitelist();
            }
        };
        this.imgSrcSanitizationWhitelist = function(regexp) {
            if (utils.typeOf(regexp) !== 'undefined') {
                $$sanitizeUriProvider.imgSrcSanitizationWhitelist(regexp);
                return this;
            } else {
                return $$sanitizeUriProvider.imgSrcSanitizationWhitelist();
            }
        };
        this.$get = [
            '$injector', '$interpolate', '$exceptionHandler', '$http', '$templateCache', '$parse',
            '$controller', '$rootScope', '$document', '$sce', '$animate', '$$sanitizeUri',
            function($injector,   $interpolate,   $exceptionHandler,   $http,   $templateCache,   $parse,
                     $controller,   $rootScope,   $document,   $sce,   $animate,   $$sanitizeUri) {
                var Attributes = function(element, attr) {
                    this.$$element = element;
                    this.$attr = attr || {};
                };
                Attributes.prototype = {
                    $normalize: directiveNormalize,
                    $addClass : function(classVal) {
                        if(classVal && classVal.length > 0) {
                            $animate.addClass(this.$$element, classVal);
                        }
                    },
                    $removeClass : function(classVal) {
                        if(classVal && classVal.length > 0) {
                            $animate.removeClass(this.$$element, classVal);
                        }
                    },

                    /**
                     * @ngdoc method
                     * @name $compile.directive.Attributes#$updateClass
                     * @function
                     *
                     * @description
                     * Adds and removes the appropriate CSS class values to the element based on the difference
                     * between the new and old CSS class values (specified as newClasses and oldClasses).
                     *
                     * @param {string} newClasses The current CSS className value
                     * @param {string} oldClasses The former CSS className value
                     */
                    $updateClass : function(newClasses, oldClasses) {
                        var toAdd = tokenDifference(newClasses, oldClasses);
                        var toRemove = tokenDifference(oldClasses, newClasses);

                        if(toAdd.length === 0) {
                            $animate.removeClass(this.$$element, toRemove);
                        } else if(toRemove.length === 0) {
                            $animate.addClass(this.$$element, toAdd);
                        } else {
                            $animate.setClass(this.$$element, toAdd, toRemove);
                        }
                    },

                    /**
                     * Set a normalized attribute on the element in a way such that all directives
                     * can share the attribute. This function properly handles boolean attributes.
                     * @param {string} key Normalized key. (ie ngAttribute)
                     * @param {string|boolean} value The value to set. If `null` attribute will be deleted.
                     * @param {boolean=} writeAttr If false, does not write the value to DOM element attribute.
                     *     Defaults to true.
                     * @param {string=} attrName Optional none normalized name. Defaults to key.
                     */
                    $set: function(key, value, writeAttr, attrName) {
                        // TODO: decide whether or not to throw an error if "class"
                        //is set through this function since it may cause $updateClass to
                        //become unstable.

                        var booleanKey = getBooleanAttrName(this.$$element[0], key),
                            normalizedVal,
                            nodeName;

                        if (booleanKey) {
                            this.$$element.prop(key, value);
                            attrName = booleanKey;
                        }

                        this[key] = value;

                        // translate normalized key to actual key
                        if (attrName) {
                            this.$attr[key] = attrName;
                        } else {
                            attrName = this.$attr[key];
                            if (!attrName) {
                                this.$attr[key] = attrName = snake_case(key, '-');
                            }
                        }

                        nodeName = nodeName_(this.$$element);

                        // sanitize a[href] and img[src] values
                        if ((nodeName === 'A' && key === 'href') ||
                            (nodeName === 'IMG' && key === 'src')) {
                            this[key] = value = $$sanitizeUri(value, key === 'src');
                        }

                        if (writeAttr !== false) {
                            if (value === null || value === undefined) {
                                this.$$element.removeAttr(attrName);
                            } else {
                                this.$$element.attr(attrName, value);
                            }
                        }

                        // fire observers
                        var $$observers = this.$$observers;
                        $$observers && forEach($$observers[key], function(fn) {
                            try {
                                fn(value);
                            } catch (e) {
                                $exceptionHandler(e);
                            }
                        });
                    },


                    /**
                     * @ngdoc method
                     * @name $compile.directive.Attributes#$observe
                     * @function
                     *
                     * @description
                     * Observes an interpolated attribute.
                     *
                     * The observer function will be invoked once during the next `$digest` following
                     * compilation. The observer is then invoked whenever the interpolated value
                     * changes.
                     *
                     * @param {string} key Normalized key. (ie ngAttribute) .
                     * @param {function(interpolatedValue)} fn Function that will be called whenever
                     the interpolated value of the attribute changes.
                     *        See the {@link guide/directive#Attributes Directives} guide for more info.
                     * @returns {function()} the `fn` parameter.
                     */
                    $observe: function(key, fn) {
                        var attrs = this,
                            $$observers = (attrs.$$observers || (attrs.$$observers = {})),
                            listeners = ($$observers[key] || ($$observers[key] = []));

                        listeners.push(fn);
                        $rootScope.$evalAsync(function() {
                            if (!listeners.$$inter) {
                                // no one registered attribute interpolation function, so lets call it manually
                                fn(attrs[key]);
                            }
                        });
                        return fn;
                    }
                };

                var startSymbol = $interpolate.startSymbol(),
                    endSymbol = $interpolate.endSymbol(),
                    denormalizeTemplate = (startSymbol == '{{' || endSymbol  == '}}')
                        ? identity
                        : function denormalizeTemplate(template) {
                        return template.replace(/\{\{/g, startSymbol).replace(/}}/g, endSymbol);
                    },
                    NG_ATTR_BINDING = /^ngAttr[A-Z]/;


                return compile;

                //================================

                function compile($compileNodes, transcludeFn, maxPriority, ignoreDirective,
                                 previousCompileContext) {
                    if (!($compileNodes instanceof jqLite)) {
                        // jquery always rewraps, whereas we need to preserve the original selector so that we can
                        // modify it.
                        $compileNodes = jqLite($compileNodes);
                    }
                    // We can not compile top level text elements since text nodes can be merged and we will
                    // not be able to attach scope data to them, so we will wrap them in <span>
                    forEach($compileNodes, function(node, index){
                        if (node.nodeType == 3 /* text node */ && node.nodeValue.match(/\S+/) /* non-empty */ ) {
                            $compileNodes[index] = node = jqLite(node).wrap('<span></span>').parent()[0];
                        }
                    });
                    var compositeLinkFn =
                        compileNodes($compileNodes, transcludeFn, $compileNodes,
                            maxPriority, ignoreDirective, previousCompileContext);
                    safeAddClass($compileNodes, 'ng-scope');
                    return function publicLinkFn(scope, cloneConnectFn, transcludeControllers){
                        assertArg(scope, 'scope');
                        // important!!: we must call our jqLite.clone() since the jQuery one is trying to be smart
                        // and sometimes changes the structure of the DOM.
                        var $linkNode = cloneConnectFn
                            ? JQLitePrototype.clone.call($compileNodes) // IMPORTANT!!!
                            : $compileNodes;

                        forEach(transcludeControllers, function(instance, name) {
                            $linkNode.data('$' + name + 'Controller', instance);
                        });

                        // Attach scope only to non-text nodes.
                        for(var i = 0, ii = $linkNode.length; i<ii; i++) {
                            var node = $linkNode[i],
                                nodeType = node.nodeType;
                            if (nodeType === 1 /* element */ || nodeType === 9 /* document */) {
                                $linkNode.eq(i).data('$scope', scope);
                            }
                        }

                        if (cloneConnectFn) cloneConnectFn($linkNode, scope);
                        if (compositeLinkFn) compositeLinkFn(scope, $linkNode, $linkNode);
                        return $linkNode;
                    };
                }

                function safeAddClass($element, className) {
                    try {
                        $element.addClass(className);
                    } catch(e) {
                        // ignore, since it means that we are trying to set class on
                        // SVG element, where class name is read-only.
                    }
                }

                /**
                 * Compile function matches each node in nodeList against the directives. Once all directives
                 * for a particular node are collected their compile functions are executed. The compile
                 * functions return values - the linking functions - are combined into a composite linking
                 * function, which is the a linking function for the node.
                 *
                 * @param {NodeList} nodeList an array of nodes or NodeList to compile
                 * @param {function(angular.Scope, cloneAttachFn=)} transcludeFn A linking function, where the
                 *        scope argument is auto-generated to the new child of the transcluded parent scope.
                 * @param {DOMElement=} $rootElement If the nodeList is the root of the compilation tree then
                 *        the rootElement must be set the jqLite collection of the compile root. This is
                 *        needed so that the jqLite collection items can be replaced with widgets.
                 * @param {number=} maxPriority Max directive priority.
                 * @returns {Function} A composite linking function of all of the matched directives or null.
                 */
                function compileNodes(nodeList, transcludeFn, $rootElement, maxPriority, ignoreDirective,
                                      previousCompileContext) {
                    var linkFns = [],
                        attrs, directives, nodeLinkFn, childNodes, childLinkFn, linkFnFound;

                    for (var i = 0; i < nodeList.length; i++) {
                        attrs = new Attributes();

                        // we must always refer to nodeList[i] since the nodes can be replaced underneath us.
                        directives = collectDirectives(nodeList[i], [], attrs, i === 0 ? maxPriority : undefined,
                            ignoreDirective);

                        nodeLinkFn = (directives.length)
                            ? applyDirectivesToNode(directives, nodeList[i], attrs, transcludeFn, $rootElement,
                            null, [], [], previousCompileContext)
                            : null;

                        if (nodeLinkFn && nodeLinkFn.scope) {
                            safeAddClass(jqLite(nodeList[i]), 'ng-scope');
                        }

                        childLinkFn = (nodeLinkFn && nodeLinkFn.terminal ||
                            !(childNodes = nodeList[i].childNodes) ||
                            !childNodes.length)
                            ? null
                            : compileNodes(childNodes,
                            nodeLinkFn ? nodeLinkFn.transclude : transcludeFn);

                        linkFns.push(nodeLinkFn, childLinkFn);
                        linkFnFound = linkFnFound || nodeLinkFn || childLinkFn;
                        //use the previous context only for the first element in the virtual group
                        previousCompileContext = null;
                    }

                    // return a linking function if we have found anything, null otherwise
                    return linkFnFound ? compositeLinkFn : null;

                    function compositeLinkFn(scope, nodeList, $rootElement, boundTranscludeFn) {
                        var nodeLinkFn, childLinkFn, node, $node, childScope, childTranscludeFn, i, ii, n;

                        // copy nodeList so that linking doesn't break due to live list updates.
                        var nodeListLength = nodeList.length,
                            stableNodeList = new Array(nodeListLength);
                        for (i = 0; i < nodeListLength; i++) {
                            stableNodeList[i] = nodeList[i];
                        }

                        for(i = 0, n = 0, ii = linkFns.length; i < ii; n++) {
                            node = stableNodeList[n];
                            nodeLinkFn = linkFns[i++];
                            childLinkFn = linkFns[i++];
                            $node = jqLite(node);

                            if (nodeLinkFn) {
                                if (nodeLinkFn.scope) {
                                    childScope = scope.$new();
                                    $node.data('$scope', childScope);
                                } else {
                                    childScope = scope;
                                }
                                childTranscludeFn = nodeLinkFn.transclude;
                                if (childTranscludeFn || (!boundTranscludeFn && transcludeFn)) {
                                    nodeLinkFn(childLinkFn, childScope, node, $rootElement,
                                        createBoundTranscludeFn(scope, childTranscludeFn || transcludeFn)
                                    );
                                } else {
                                    nodeLinkFn(childLinkFn, childScope, node, $rootElement, boundTranscludeFn);
                                }
                            } else if (childLinkFn) {
                                childLinkFn(scope, node.childNodes, undefined, boundTranscludeFn);
                            }
                        }
                    }
                }

                function createBoundTranscludeFn(scope, transcludeFn) {
                    return function boundTranscludeFn(transcludedScope, cloneFn, controllers) {
                        var scopeCreated = false;

                        if (!transcludedScope) {
                            transcludedScope = scope.$new();
                            transcludedScope.$$transcluded = true;
                            scopeCreated = true;
                        }

                        var clone = transcludeFn(transcludedScope, cloneFn, controllers);
                        if (scopeCreated) {
                            clone.on('$destroy', bind(transcludedScope, transcludedScope.$destroy));
                        }
                        return clone;
                    };
                }

                /**
                 * Looks for directives on the given node and adds them to the directive collection which is
                 * sorted.
                 *
                 * @param node Node to search.
                 * @param directives An array to which the directives are added to. This array is sorted before
                 *        the function returns.
                 * @param attrs The shared attrs object which is used to populate the normalized attributes.
                 * @param {number=} maxPriority Max directive priority.
                 */
                function collectDirectives(node, directives, attrs, maxPriority, ignoreDirective) {
                    var nodeType = node.nodeType,
                        attrsMap = attrs.$attr,
                        match,
                        className;

                    switch(nodeType) {
                        case 1: /* Element */
                            // use the node name: <directive>
                            addDirective(directives,
                                directiveNormalize(nodeName_(node).toLowerCase()), 'E', maxPriority, ignoreDirective);

                            // iterate over the attributes
                            for (var attr, name, nName, ngAttrName, value, nAttrs = node.attributes,
                                     j = 0, jj = nAttrs && nAttrs.length; j < jj; j++) {
                                var attrStartName = false;
                                var attrEndName = false;

                                attr = nAttrs[j];
                                if (!msie || msie >= 8 || attr.specified) {
                                    name = attr.name;
                                    // support ngAttr attribute binding
                                    ngAttrName = directiveNormalize(name);
                                    if (NG_ATTR_BINDING.test(ngAttrName)) {
                                        name = snake_case(ngAttrName.substr(6), '-');
                                    }

                                    var directiveNName = ngAttrName.replace(/(Start|End)$/, '');
                                    if (ngAttrName === directiveNName + 'Start') {
                                        attrStartName = name;
                                        attrEndName = name.substr(0, name.length - 5) + 'end';
                                        name = name.substr(0, name.length - 6);
                                    }

                                    nName = directiveNormalize(name.toLowerCase());
                                    attrsMap[nName] = name;
                                    attrs[nName] = value = trim(attr.value);
                                    if (getBooleanAttrName(node, nName)) {
                                        attrs[nName] = true; // presence means true
                                    }
                                    addAttrInterpolateDirective(node, directives, value, nName);
                                    addDirective(directives, nName, 'A', maxPriority, ignoreDirective, attrStartName,
                                        attrEndName);
                                }
                            }

                            // use class as directive
                            className = node.className;
                            if (isString(className) && className !== '') {
                                while (match = CLASS_DIRECTIVE_REGEXP.exec(className)) {
                                    nName = directiveNormalize(match[2]);
                                    if (addDirective(directives, nName, 'C', maxPriority, ignoreDirective)) {
                                        attrs[nName] = trim(match[3]);
                                    }
                                    className = className.substr(match.index + match[0].length);
                                }
                            }
                            break;
                        case 3: /* Text Node */
                            addTextInterpolateDirective(directives, node.nodeValue);
                            break;
                        case 8: /* Comment */
                            try {
                                match = COMMENT_DIRECTIVE_REGEXP.exec(node.nodeValue);
                                if (match) {
                                    nName = directiveNormalize(match[1]);
                                    if (addDirective(directives, nName, 'M', maxPriority, ignoreDirective)) {
                                        attrs[nName] = trim(match[2]);
                                    }
                                }
                            } catch (e) {
                                // turns out that under some circumstances IE9 throws errors when one attempts to read
                                // comment's node value.
                                // Just ignore it and continue. (Can't seem to reproduce in test case.)
                            }
                            break;
                    }

                    directives.sort(byPriority);
                    return directives;
                }

                /**
                 * Given a node with an directive-start it collects all of the siblings until it finds
                 * directive-end.
                 * @param node
                 * @param attrStart
                 * @param attrEnd
                 * @returns {*}
                 */
                function groupScan(node, attrStart, attrEnd) {
                    var nodes = [];
                    var depth = 0;
                    if (attrStart && node.hasAttribute && node.hasAttribute(attrStart)) {
                        var startNode = node;
                        do {
                            if (!node) {
                                throw $compileMinErr('uterdir',
                                    "Unterminated attribute, found '{0}' but no matching '{1}' found.",
                                    attrStart, attrEnd);
                            }
                            if (node.nodeType == 1 /** Element **/) {
                                if (node.hasAttribute(attrStart)) depth++;
                                if (node.hasAttribute(attrEnd)) depth--;
                            }
                            nodes.push(node);
                            node = node.nextSibling;
                        } while (depth > 0);
                    } else {
                        nodes.push(node);
                    }

                    return jqLite(nodes);
                }

                /**
                 * Wrapper for linking function which converts normal linking function into a grouped
                 * linking function.
                 * @param linkFn
                 * @param attrStart
                 * @param attrEnd
                 * @returns {Function}
                 */
                function groupElementsLinkFnWrapper(linkFn, attrStart, attrEnd) {
                    return function(scope, element, attrs, controllers, transcludeFn) {
                        element = groupScan(element[0], attrStart, attrEnd);
                        return linkFn(scope, element, attrs, controllers, transcludeFn);
                    };
                }

                /**
                 * Once the directives have been collected, their compile functions are executed. This method
                 * is responsible for inlining directive templates as well as terminating the application
                 * of the directives if the terminal directive has been reached.
                 *
                 * @param {Array} directives Array of collected directives to execute their compile function.
                 *        this needs to be pre-sorted by priority order.
                 * @param {Node} compileNode The raw DOM node to apply the compile functions to
                 * @param {Object} templateAttrs The shared attribute function
                 * @param {function(angular.Scope, cloneAttachFn=)} transcludeFn A linking function, where the
                 *                                                  scope argument is auto-generated to the new
                 *                                                  child of the transcluded parent scope.
                 * @param {JQLite} jqCollection If we are working on the root of the compile tree then this
                 *                              argument has the root jqLite array so that we can replace nodes
                 *                              on it.
                 * @param {Object=} originalReplaceDirective An optional directive that will be ignored when
                 *                                           compiling the transclusion.
                 * @param {Array.<Function>} preLinkFns
                 * @param {Array.<Function>} postLinkFns
                 * @param {Object} previousCompileContext Context used for previous compilation of the current
                 *                                        node
                 * @returns {Function} linkFn
                 */
                function applyDirectivesToNode(directives, compileNode, templateAttrs, transcludeFn,
                                               jqCollection, originalReplaceDirective, preLinkFns, postLinkFns,
                                               previousCompileContext) {
                    previousCompileContext = previousCompileContext || {};

                    var terminalPriority = -Number.MAX_VALUE,
                        newScopeDirective,
                        controllerDirectives = previousCompileContext.controllerDirectives,
                        newIsolateScopeDirective = previousCompileContext.newIsolateScopeDirective,
                        templateDirective = previousCompileContext.templateDirective,
                        nonTlbTranscludeDirective = previousCompileContext.nonTlbTranscludeDirective,
                        hasTranscludeDirective = false,
                        hasElementTranscludeDirective = previousCompileContext.hasElementTranscludeDirective,
                        $compileNode = templateAttrs.$$element = jqLite(compileNode),
                        directive,
                        directiveName,
                        $template,
                        replaceDirective = originalReplaceDirective,
                        childTranscludeFn = transcludeFn,
                        linkFn,
                        directiveValue;

                    // executes all directives on the current element
                    for(var i = 0, ii = directives.length; i < ii; i++) {
                        directive = directives[i];
                        var attrStart = directive.$$start;
                        var attrEnd = directive.$$end;

                        // collect multiblock sections
                        if (attrStart) {
                            $compileNode = groupScan(compileNode, attrStart, attrEnd);
                        }
                        $template = undefined;

                        if (terminalPriority > directive.priority) {
                            break; // prevent further processing of directives
                        }

                        if (directiveValue = directive.scope) {
                            newScopeDirective = newScopeDirective || directive;

                            // skip the check for directives with async templates, we'll check the derived sync
                            // directive when the template arrives
                            if (!directive.templateUrl) {
                                assertNoDuplicate('new/isolated scope', newIsolateScopeDirective, directive,
                                    $compileNode);
                                if (isObject(directiveValue)) {
                                    newIsolateScopeDirective = directive;
                                }
                            }
                        }

                        directiveName = directive.name;

                        if (!directive.templateUrl && directive.controller) {
                            directiveValue = directive.controller;
                            controllerDirectives = controllerDirectives || {};
                            assertNoDuplicate("'" + directiveName + "' controller",
                                controllerDirectives[directiveName], directive, $compileNode);
                            controllerDirectives[directiveName] = directive;
                        }

                        if (directiveValue = directive.transclude) {
                            hasTranscludeDirective = true;

                            // Special case ngIf and ngRepeat so that we don't complain about duplicate transclusion.
                            // This option should only be used by directives that know how to safely handle element transclusion,
                            // where the transcluded nodes are added or replaced after linking.
                            if (!directive.$$tlb) {
                                assertNoDuplicate('transclusion', nonTlbTranscludeDirective, directive, $compileNode);
                                nonTlbTranscludeDirective = directive;
                            }

                            if (directiveValue == 'element') {
                                hasElementTranscludeDirective = true;
                                terminalPriority = directive.priority;
                                $template = groupScan(compileNode, attrStart, attrEnd);
                                $compileNode = templateAttrs.$$element =
                                    jqLite(document.createComment(' ' + directiveName + ': ' +
                                        templateAttrs[directiveName] + ' '));
                                compileNode = $compileNode[0];
                                replaceWith(jqCollection, jqLite(sliceArgs($template)), compileNode);

                                childTranscludeFn = compile($template, transcludeFn, terminalPriority,
                                        replaceDirective && replaceDirective.name, {
                                        // Don't pass in:
                                        // - controllerDirectives - otherwise we'll create duplicates controllers
                                        // - newIsolateScopeDirective or templateDirective - combining templates with
                                        //   element transclusion doesn't make sense.
                                        //
                                        // We need only nonTlbTranscludeDirective so that we prevent putting transclusion
                                        // on the same element more than once.
                                        nonTlbTranscludeDirective: nonTlbTranscludeDirective
                                    });
                            } else {
                                $template = jqLite(jqLiteClone(compileNode)).contents();
                                $compileNode.empty(); // clear contents
                                childTranscludeFn = compile($template, transcludeFn);
                            }
                        }

                        if (directive.template) {
                            assertNoDuplicate('template', templateDirective, directive, $compileNode);
                            templateDirective = directive;

                            directiveValue = (isFunction(directive.template))
                                ? directive.template($compileNode, templateAttrs)
                                : directive.template;

                            directiveValue = denormalizeTemplate(directiveValue);

                            if (directive.replace) {
                                replaceDirective = directive;
                                $template = directiveTemplateContents(directiveValue);
                                compileNode = $template[0];

                                if ($template.length != 1 || compileNode.nodeType !== 1) {
                                    throw $compileMinErr('tplrt',
                                        "Template for directive '{0}' must have exactly one root element. {1}",
                                        directiveName, '');
                                }

                                replaceWith(jqCollection, $compileNode, compileNode);

                                var newTemplateAttrs = {$attr: {}};

                                // combine directives from the original node and from the template:
                                // - take the array of directives for this element
                                // - split it into two parts, those that already applied (processed) and those that weren't (unprocessed)
                                // - collect directives from the template and sort them by priority
                                // - combine directives as: processed + template + unprocessed
                                var templateDirectives = collectDirectives(compileNode, [], newTemplateAttrs);
                                var unprocessedDirectives = directives.splice(i + 1, directives.length - (i + 1));

                                if (newIsolateScopeDirective) {
                                    markDirectivesAsIsolate(templateDirectives);
                                }
                                directives = directives.concat(templateDirectives).concat(unprocessedDirectives);
                                mergeTemplateAttributes(templateAttrs, newTemplateAttrs);

                                ii = directives.length;
                            } else {
                                $compileNode.html(directiveValue);
                            }
                        }

                        if (directive.templateUrl) {
                            assertNoDuplicate('template', templateDirective, directive, $compileNode);
                            templateDirective = directive;

                            if (directive.replace) {
                                replaceDirective = directive;
                            }

                            nodeLinkFn = compileTemplateUrl(directives.splice(i, directives.length - i), $compileNode,
                                templateAttrs, jqCollection, childTranscludeFn, preLinkFns, postLinkFns, {
                                    controllerDirectives: controllerDirectives,
                                    newIsolateScopeDirective: newIsolateScopeDirective,
                                    templateDirective: templateDirective,
                                    nonTlbTranscludeDirective: nonTlbTranscludeDirective
                                });
                            ii = directives.length;
                        } else if (directive.compile) {
                            try {
                                linkFn = directive.compile($compileNode, templateAttrs, childTranscludeFn);
                                if (isFunction(linkFn)) {
                                    addLinkFns(null, linkFn, attrStart, attrEnd);
                                } else if (linkFn) {
                                    addLinkFns(linkFn.pre, linkFn.post, attrStart, attrEnd);
                                }
                            } catch (e) {
                                $exceptionHandler(e, startingTag($compileNode));
                            }
                        }

                        if (directive.terminal) {
                            nodeLinkFn.terminal = true;
                            terminalPriority = Math.max(terminalPriority, directive.priority);
                        }

                    }

                    nodeLinkFn.scope = newScopeDirective && newScopeDirective.scope === true;
                    nodeLinkFn.transclude = hasTranscludeDirective && childTranscludeFn;
                    previousCompileContext.hasElementTranscludeDirective = hasElementTranscludeDirective;

                    // might be normal or delayed nodeLinkFn depending on if templateUrl is present
                    return nodeLinkFn;

                    ////////////////////

                    function addLinkFns(pre, post, attrStart, attrEnd) {
                        if (pre) {
                            if (attrStart) pre = groupElementsLinkFnWrapper(pre, attrStart, attrEnd);
                            pre.require = directive.require;
                            if (newIsolateScopeDirective === directive || directive.$$isolateScope) {
                                pre = cloneAndAnnotateFn(pre, {isolateScope: true});
                            }
                            preLinkFns.push(pre);
                        }
                        if (post) {
                            if (attrStart) post = groupElementsLinkFnWrapper(post, attrStart, attrEnd);
                            post.require = directive.require;
                            if (newIsolateScopeDirective === directive || directive.$$isolateScope) {
                                post = cloneAndAnnotateFn(post, {isolateScope: true});
                            }
                            postLinkFns.push(post);
                        }
                    }


                    function getControllers(require, $element, elementControllers) {
                        var value, retrievalMethod = 'data', optional = false;
                        if (isString(require)) {
                            while((value = require.charAt(0)) == '^' || value == '?') {
                                require = require.substr(1);
                                if (value == '^') {
                                    retrievalMethod = 'inheritedData';
                                }
                                optional = optional || value == '?';
                            }
                            value = null;

                            if (elementControllers && retrievalMethod === 'data') {
                                value = elementControllers[require];
                            }
                            value = value || $element[retrievalMethod]('$' + require + 'Controller');

                            if (!value && !optional) {
                                throw $compileMinErr('ctreq',
                                    "Controller '{0}', required by directive '{1}', can't be found!",
                                    require, directiveName);
                            }
                            return value;
                        } else if (isArray(require)) {
                            value = [];
                            forEach(require, function(require) {
                                value.push(getControllers(require, $element, elementControllers));
                            });
                        }
                        return value;
                    }


                    function nodeLinkFn(childLinkFn, scope, linkNode, $rootElement, boundTranscludeFn) {
                        var attrs, $element, i, ii, linkFn, controller, isolateScope, elementControllers = {}, transcludeFn;

                        if (compileNode === linkNode) {
                            attrs = templateAttrs;
                        } else {
                            attrs = shallowCopy(templateAttrs, new Attributes(jqLite(linkNode), templateAttrs.$attr));
                        }
                        $element = attrs.$$element;

                        if (newIsolateScopeDirective) {
                            var LOCAL_REGEXP = /^\s*([@=&])(\??)\s*(\w*)\s*$/;
                            var $linkNode = jqLite(linkNode);

                            isolateScope = scope.$new(true);

                            if (templateDirective && (templateDirective === newIsolateScopeDirective.$$originalDirective)) {
                                $linkNode.data('$isolateScope', isolateScope) ;
                            } else {
                                $linkNode.data('$isolateScopeNoTemplate', isolateScope);
                            }



                            safeAddClass($linkNode, 'ng-isolate-scope');

                            forEach(newIsolateScopeDirective.scope, function(definition, scopeName) {
                                var match = definition.match(LOCAL_REGEXP) || [],
                                    attrName = match[3] || scopeName,
                                    optional = (match[2] == '?'),
                                    mode = match[1], // @, =, or &
                                    lastValue,
                                    parentGet, parentSet, compare;

                                isolateScope.$$isolateBindings[scopeName] = mode + attrName;

                                switch (mode) {

                                    case '@':
                                        attrs.$observe(attrName, function(value) {
                                            isolateScope[scopeName] = value;
                                        });
                                        attrs.$$observers[attrName].$$scope = scope;
                                        if( attrs[attrName] ) {
                                            // If the attribute has been provided then we trigger an interpolation to ensure
                                            // the value is there for use in the link fn
                                            isolateScope[scopeName] = $interpolate(attrs[attrName])(scope);
                                        }
                                        break;

                                    case '=':
                                        if (optional && !attrs[attrName]) {
                                            return;
                                        }
                                        parentGet = $parse(attrs[attrName]);
                                        if (parentGet.literal) {
                                            compare = equals;
                                        } else {
                                            compare = function(a,b) { return a === b; };
                                        }
                                        parentSet = parentGet.assign || function() {
                                            // reset the change, or we will throw this exception on every $digest
                                            lastValue = isolateScope[scopeName] = parentGet(scope);
                                            throw $compileMinErr('nonassign',
                                                "Expression '{0}' used with directive '{1}' is non-assignable!",
                                                attrs[attrName], newIsolateScopeDirective.name);
                                        };
                                        lastValue = isolateScope[scopeName] = parentGet(scope);
                                        isolateScope.$watch(function parentValueWatch() {
                                            var parentValue = parentGet(scope);
                                            if (!compare(parentValue, isolateScope[scopeName])) {
                                                // we are out of sync and need to copy
                                                if (!compare(parentValue, lastValue)) {
                                                    // parent changed and it has precedence
                                                    isolateScope[scopeName] = parentValue;
                                                } else {
                                                    // if the parent can be assigned then do so
                                                    parentSet(scope, parentValue = isolateScope[scopeName]);
                                                }
                                            }
                                            return lastValue = parentValue;
                                        }, null, parentGet.literal);
                                        break;

                                    case '&':
                                        parentGet = $parse(attrs[attrName]);
                                        isolateScope[scopeName] = function(locals) {
                                            return parentGet(scope, locals);
                                        };
                                        break;

                                    default:
                                        throw $compileMinErr('iscp',
                                                "Invalid isolate scope definition for directive '{0}'." +
                                                " Definition: {... {1}: '{2}' ...}",
                                            newIsolateScopeDirective.name, scopeName, definition);
                                }
                            });
                        }
                        transcludeFn = boundTranscludeFn && controllersBoundTransclude;
                        if (controllerDirectives) {
                            forEach(controllerDirectives, function(directive) {
                                var locals = {
                                    $scope: directive === newIsolateScopeDirective || directive.$$isolateScope ? isolateScope : scope,
                                    $element: $element,
                                    $attrs: attrs,
                                    $transclude: transcludeFn
                                }, controllerInstance;

                                controller = directive.controller;
                                if (controller == '@') {
                                    controller = attrs[directive.name];
                                }

                                controllerInstance = $controller(controller, locals);
                                // For directives with element transclusion the element is a comment,
                                // but jQuery .data doesn't support attaching data to comment nodes as it's hard to
                                // clean up (http://bugs.jquery.com/ticket/8335).
                                // Instead, we save the controllers for the element in a local hash and attach to .data
                                // later, once we have the actual element.
                                elementControllers[directive.name] = controllerInstance;
                                if (!hasElementTranscludeDirective) {
                                    $element.data('$' + directive.name + 'Controller', controllerInstance);
                                }

                                if (directive.controllerAs) {
                                    locals.$scope[directive.controllerAs] = controllerInstance;
                                }
                            });
                        }

                        // PRELINKING
                        for(i = 0, ii = preLinkFns.length; i < ii; i++) {
                            try {
                                linkFn = preLinkFns[i];
                                linkFn(linkFn.isolateScope ? isolateScope : scope, $element, attrs,
                                        linkFn.require && getControllers(linkFn.require, $element, elementControllers), transcludeFn);
                            } catch (e) {
                                $exceptionHandler(e, startingTag($element));
                            }
                        }

                        // RECURSION
                        // We only pass the isolate scope, if the isolate directive has a template,
                        // otherwise the child elements do not belong to the isolate directive.
                        var scopeToChild = scope;
                        if (newIsolateScopeDirective && (newIsolateScopeDirective.template || newIsolateScopeDirective.templateUrl === null)) {
                            scopeToChild = isolateScope;
                        }
                        childLinkFn && childLinkFn(scopeToChild, linkNode.childNodes, undefined, boundTranscludeFn);

                        // POSTLINKING
                        for(i = postLinkFns.length - 1; i >= 0; i--) {
                            try {
                                linkFn = postLinkFns[i];
                                linkFn(linkFn.isolateScope ? isolateScope : scope, $element, attrs,
                                        linkFn.require && getControllers(linkFn.require, $element, elementControllers), transcludeFn);
                            } catch (e) {
                                $exceptionHandler(e, startingTag($element));
                            }
                        }

                        // This is the function that is injected as `$transclude`.
                        function controllersBoundTransclude(scope, cloneAttachFn) {
                            var transcludeControllers;

                            // no scope passed
                            if (arguments.length < 2) {
                                cloneAttachFn = scope;
                                scope = undefined;
                            }

                            if (hasElementTranscludeDirective) {
                                transcludeControllers = elementControllers;
                            }

                            return boundTranscludeFn(scope, cloneAttachFn, transcludeControllers);
                        }
                    }
                }

                function markDirectivesAsIsolate(directives) {
                    // mark all directives as needing isolate scope.
                    for (var j = 0, jj = directives.length; j < jj; j++) {
                        directives[j] = inherit(directives[j], {$$isolateScope: true});
                    }
                }

                /**
                 * looks up the directive and decorates it with exception handling and proper parameters. We
                 * call this the boundDirective.
                 *
                 * @param {string} name name of the directive to look up.
                 * @param {string} location The directive must be found in specific format.
                 *   String containing any of theses characters:
                 *
                 *   * `E`: element name
                 *   * `A': attribute
                 *   * `C`: class
                 *   * `M`: comment
                 * @returns {boolean} true if directive was added.
                 */
                function addDirective(tDirectives, name, location, maxPriority, ignoreDirective, startAttrName,
                                      endAttrName) {
                    if (name === ignoreDirective) return null;
                    var match = null;
                    if (hasDirectives.hasOwnProperty(name)) {
                        for(var directive, directives = $injector.get(name + Suffix),
                                i = 0, ii = directives.length; i<ii; i++) {
                            try {
                                directive = directives[i];
                                if ( (maxPriority === undefined || maxPriority > directive.priority) &&
                                    directive.restrict.indexOf(location) != -1) {
                                    if (startAttrName) {
                                        directive = inherit(directive, {$$start: startAttrName, $$end: endAttrName});
                                    }
                                    tDirectives.push(directive);
                                    match = directive;
                                }
                            } catch(e) { $exceptionHandler(e); }
                        }
                    }
                    return match;
                }


                /**
                 * When the element is replaced with HTML template then the new attributes
                 * on the template need to be merged with the existing attributes in the DOM.
                 * The desired effect is to have both of the attributes present.
                 *
                 * @param {object} dst destination attributes (original DOM)
                 * @param {object} src source attributes (from the directive template)
                 */
                function mergeTemplateAttributes(dst, src) {
                    var srcAttr = src.$attr,
                        dstAttr = dst.$attr,
                        $element = dst.$$element;

                    // reapply the old attributes to the new element
                    forEach(dst, function(value, key) {
                        if (key.charAt(0) != '$') {
                            if (src[key]) {
                                value += (key === 'style' ? ';' : ' ') + src[key];
                            }
                            dst.$set(key, value, true, srcAttr[key]);
                        }
                    });

                    // copy the new attributes on the old attrs object
                    forEach(src, function(value, key) {
                        if (key == 'class') {
                            safeAddClass($element, value);
                            dst['class'] = (dst['class'] ? dst['class'] + ' ' : '') + value;
                        } else if (key == 'style') {
                            $element.attr('style', $element.attr('style') + ';' + value);
                            dst['style'] = (dst['style'] ? dst['style'] + ';' : '') + value;
                            // `dst` will never contain hasOwnProperty as DOM parser won't let it.
                            // You will get an "InvalidCharacterError: DOM Exception 5" error if you
                            // have an attribute like "has-own-property" or "data-has-own-property", etc.
                        } else if (key.charAt(0) != '$' && !dst.hasOwnProperty(key)) {
                            dst[key] = value;
                            dstAttr[key] = srcAttr[key];
                        }
                    });
                }


                function directiveTemplateContents(template) {
                    var type;
                    template = trim(template);
                    if ((type = TABLE_CONTENT_REGEXP.exec(template))) {
                        type = type[1].toLowerCase();
                        var table = jqLite('<table>' + template + '</table>');
                        if (/(thead|tbody|tfoot)/.test(type)) {
                            return table.children(type);
                        }
                        table = table.children('tbody');
                        if (type === 'tr') {
                            return table.children('tr');
                        }
                        return table.children('tr').contents();
                    }
                    return jqLite('<div>' +
                        template +
                        '</div>').contents();
                }


                function compileTemplateUrl(directives, $compileNode, tAttrs,
                                            $rootElement, childTranscludeFn, preLinkFns, postLinkFns, previousCompileContext) {
                    var linkQueue = [],
                        afterTemplateNodeLinkFn,
                        afterTemplateChildLinkFn,
                        beforeTemplateCompileNode = $compileNode[0],
                        origAsyncDirective = directives.shift(),
                    // The fact that we have to copy and patch the directive seems wrong!
                        derivedSyncDirective = extend({}, origAsyncDirective, {
                            templateUrl: null, transclude: null, replace: null, $$originalDirective: origAsyncDirective
                        }),
                        templateUrl = (isFunction(origAsyncDirective.templateUrl))
                            ? origAsyncDirective.templateUrl($compileNode, tAttrs)
                            : origAsyncDirective.templateUrl;

                    $compileNode.empty();

                    $http.get($sce.getTrustedResourceUrl(templateUrl), {cache: $templateCache}).
                        success(function(content) {
                            var compileNode, tempTemplateAttrs, $template, childBoundTranscludeFn;

                            content = denormalizeTemplate(content);

                            if (origAsyncDirective.replace) {
                                $template = directiveTemplateContents(content);
                                compileNode = $template[0];

                                if ($template.length != 1 || compileNode.nodeType !== 1) {
                                    throw $compileMinErr('tplrt',
                                        "Template for directive '{0}' must have exactly one root element. {1}",
                                        origAsyncDirective.name, templateUrl);
                                }

                                tempTemplateAttrs = {$attr: {}};
                                replaceWith($rootElement, $compileNode, compileNode);
                                var templateDirectives = collectDirectives(compileNode, [], tempTemplateAttrs);

                                if (isObject(origAsyncDirective.scope)) {
                                    markDirectivesAsIsolate(templateDirectives);
                                }
                                directives = templateDirectives.concat(directives);
                                mergeTemplateAttributes(tAttrs, tempTemplateAttrs);
                            } else {
                                compileNode = beforeTemplateCompileNode;
                                $compileNode.html(content);
                            }

                            directives.unshift(derivedSyncDirective);

                            afterTemplateNodeLinkFn = applyDirectivesToNode(directives, compileNode, tAttrs,
                                childTranscludeFn, $compileNode, origAsyncDirective, preLinkFns, postLinkFns,
                                previousCompileContext);
                            forEach($rootElement, function(node, i) {
                                if (node == compileNode) {
                                    $rootElement[i] = $compileNode[0];
                                }
                            });
                            afterTemplateChildLinkFn = compileNodes($compileNode[0].childNodes, childTranscludeFn);


                            while(linkQueue.length) {
                                var scope = linkQueue.shift(),
                                    beforeTemplateLinkNode = linkQueue.shift(),
                                    linkRootElement = linkQueue.shift(),
                                    boundTranscludeFn = linkQueue.shift(),
                                    linkNode = $compileNode[0];

                                if (beforeTemplateLinkNode !== beforeTemplateCompileNode) {
                                    var oldClasses = beforeTemplateLinkNode.className;

                                    if (!(previousCompileContext.hasElementTranscludeDirective &&
                                        origAsyncDirective.replace)) {
                                        // it was cloned therefore we have to clone as well.
                                        linkNode = jqLiteClone(compileNode);
                                    }

                                    replaceWith(linkRootElement, jqLite(beforeTemplateLinkNode), linkNode);

                                    // Copy in CSS classes from original node
                                    safeAddClass(jqLite(linkNode), oldClasses);
                                }
                                if (afterTemplateNodeLinkFn.transclude) {
                                    childBoundTranscludeFn = createBoundTranscludeFn(scope, afterTemplateNodeLinkFn.transclude);
                                } else {
                                    childBoundTranscludeFn = boundTranscludeFn;
                                }
                                afterTemplateNodeLinkFn(afterTemplateChildLinkFn, scope, linkNode, $rootElement,
                                    childBoundTranscludeFn);
                            }
                            linkQueue = null;
                        }).
                        error(function(response, code, headers, config) {
                            throw $compileMinErr('tpload', 'Failed to load template: {0}', config.url);
                        });

                    return function delayedNodeLinkFn(ignoreChildLinkFn, scope, node, rootElement, boundTranscludeFn) {
                        if (linkQueue) {
                            linkQueue.push(scope);
                            linkQueue.push(node);
                            linkQueue.push(rootElement);
                            linkQueue.push(boundTranscludeFn);
                        } else {
                            afterTemplateNodeLinkFn(afterTemplateChildLinkFn, scope, node, rootElement, boundTranscludeFn);
                        }
                    };
                }


                /**
                 * Sorting function for bound directives.
                 */
                function byPriority(a, b) {
                    var diff = b.priority - a.priority;
                    if (diff !== 0) return diff;
                    if (a.name !== b.name) return (a.name < b.name) ? -1 : 1;
                    return a.index - b.index;
                }


                function assertNoDuplicate(what, previousDirective, directive, element) {
                    if (previousDirective) {
                        throw $compileMinErr('multidir', 'Multiple directives [{0}, {1}] asking for {2} on: {3}',
                            previousDirective.name, directive.name, what, startingTag(element));
                    }
                }


                function addTextInterpolateDirective(directives, text) {
                    var interpolateFn = $interpolate(text, true);
                    if (interpolateFn) {
                        directives.push({
                            priority: 0,
                            compile: valueFn(function textInterpolateLinkFn(scope, node) {
                                var parent = node.parent(),
                                    bindings = parent.data('$binding') || [];
                                bindings.push(interpolateFn);
                                safeAddClass(parent.data('$binding', bindings), 'ng-binding');
                                scope.$watch(interpolateFn, function interpolateFnWatchAction(value) {
                                    node[0].nodeValue = value;
                                });
                            })
                        });
                    }
                }


                function getTrustedContext(node, attrNormalizedName) {
                    if (attrNormalizedName == "srcdoc") {
                        return $sce.HTML;
                    }
                    var tag = nodeName_(node);
                    // maction[xlink:href] can source SVG.  It's not limited to <maction>.
                    if (attrNormalizedName == "xlinkHref" ||
                        (tag == "FORM" && attrNormalizedName == "action") ||
                        (tag != "IMG" && (attrNormalizedName == "src" ||
                            attrNormalizedName == "ngSrc"))) {
                        return $sce.RESOURCE_URL;
                    }
                }


                function addAttrInterpolateDirective(node, directives, value, name) {
                    var interpolateFn = $interpolate(value, true);

                    // no interpolation found -> ignore
                    if (!interpolateFn) return;


                    if (name === "multiple" && nodeName_(node) === "SELECT") {
                        throw $compileMinErr("selmulti",
                            "Binding to the 'multiple' attribute is not supported. Element: {0}",
                            startingTag(node));
                    }

                    directives.push({
                        priority: 100,
                        compile: function() {
                            return {
                                pre: function attrInterpolatePreLinkFn(scope, element, attr) {
                                    var $$observers = (attr.$$observers || (attr.$$observers = {}));

                                    if (EVENT_HANDLER_ATTR_REGEXP.test(name)) {
                                        throw $compileMinErr('nodomevents',
                                                "Interpolations for HTML DOM event attributes are disallowed.  Please use the " +
                                                "ng- versions (such as ng-click instead of onclick) instead.");
                                    }

                                    // we need to interpolate again, in case the attribute value has been updated
                                    // (e.g. by another directive's compile function)
                                    interpolateFn = $interpolate(attr[name], true, getTrustedContext(node, name));

                                    // if attribute was updated so that there is no interpolation going on we don't want to
                                    // register any observers
                                    if (!interpolateFn) return;

                                    // TODO(i): this should likely be attr.$set(name, iterpolateFn(scope) so that we reset the
                                    // actual attr value
                                    attr[name] = interpolateFn(scope);
                                    ($$observers[name] || ($$observers[name] = [])).$$inter = true;
                                    (attr.$$observers && attr.$$observers[name].$$scope || scope).
                                        $watch(interpolateFn, function interpolateFnWatchAction(newValue, oldValue) {
                                            //special case for class attribute addition + removal
                                            //so that class changes can tap into the animation
                                            //hooks provided by the $animate service. Be sure to
                                            //skip animations when the first digest occurs (when
                                            //both the new and the old values are the same) since
                                            //the CSS classes are the non-interpolated values
                                            if(name === 'class' && newValue != oldValue) {
                                                attr.$updateClass(newValue, oldValue);
                                            } else {
                                                attr.$set(name, newValue);
                                            }
                                        });
                                }
                            };
                        }
                    });
                }


                /**
                 * This is a special jqLite.replaceWith, which can replace items which
                 * have no parents, provided that the containing jqLite collection is provided.
                 *
                 * @param {JqLite=} $rootElement The root of the compile tree. Used so that we can replace nodes
                 *                               in the root of the tree.
                 * @param {JqLite} elementsToRemove The jqLite element which we are going to replace. We keep
                 *                                  the shell, but replace its DOM node reference.
                 * @param {Node} newNode The new DOM node.
                 */
                function replaceWith($rootElement, elementsToRemove, newNode) {
                    var firstElementToRemove = elementsToRemove[0],
                        removeCount = elementsToRemove.length,
                        parent = firstElementToRemove.parentNode,
                        i, ii;

                    if ($rootElement) {
                        for(i = 0, ii = $rootElement.length; i < ii; i++) {
                            if ($rootElement[i] == firstElementToRemove) {
                                $rootElement[i++] = newNode;
                                for (var j = i, j2 = j + removeCount - 1,
                                         jj = $rootElement.length;
                                     j < jj; j++, j2++) {
                                    if (j2 < jj) {
                                        $rootElement[j] = $rootElement[j2];
                                    } else {
                                        delete $rootElement[j];
                                    }
                                }
                                $rootElement.length -= removeCount - 1;
                                break;
                            }
                        }
                    }

                    if (parent) {
                        parent.replaceChild(newNode, firstElementToRemove);
                    }
                    var fragment = document.createDocumentFragment();
                    fragment.appendChild(firstElementToRemove);
                    newNode[jqLite.expando] = firstElementToRemove[jqLite.expando];
                    for (var k = 1, kk = elementsToRemove.length; k < kk; k++) {
                        var element = elementsToRemove[k];
                        jqLite(element).remove(); // must do this way to clean up expando
                        fragment.appendChild(element);
                        delete elementsToRemove[k];
                    }

                    elementsToRemove[0] = newNode;
                    elementsToRemove.length = 1;
                }


                function cloneAndAnnotateFn(fn, annotation) {
                    return extend(function() { return fn.apply(null, arguments); }, fn, annotation);
                }
            }];
    }
    function $CacheFactoryProvider() {
        this.$get = function() {
            var caches = {};
            function cacheFactory(cacheId, options) {
                if (cacheId in caches) {
                    throw Error('$cacheFactory iid, CacheId '+cacheId+' is already taken!');
                }
                var size = 0,
                    stats = utils.extend({}, options, {id: cacheId}),
                    data = {},
                    capacity = (options && options.capacity) || Number.MAX_VALUE,
                    lruHash = {},
                    freshEnd = null,
                    staleEnd = null;
                return caches[cacheId] = {
                    put: function(key, value) {
                        if (capacity < Number.MAX_VALUE) {
                            var lruEntry = lruHash[key] || (lruHash[key] = {key: key});
                            refresh(lruEntry);
                        }
                        if (utils.typeOf(value) === 'undefined') return;
                        if (!(key in data)) size++;
                        data[key] = value;
                        if (size > capacity) {
                            this.remove(staleEnd.key);
                        }
                        return value;
                    },
                    get: function(key) {
                        if (capacity < Number.MAX_VALUE) {
                            var lruEntry = lruHash[key];
                            if (!lruEntry) return;
                            refresh(lruEntry);
                        }
                        return data[key];
                    },
                    remove: function(key) {
                        if (capacity < Number.MAX_VALUE) {
                            var lruEntry = lruHash[key];
                            if (!lruEntry) return;
                            if (lruEntry == freshEnd) freshEnd = lruEntry.p;
                            if (lruEntry == staleEnd) staleEnd = lruEntry.n;
                            link(lruEntry.n,lruEntry.p);
                            delete lruHash[key];
                        }
                        delete data[key];
                        size--;
                    },
                    removeAll: function() {
                        data = {};
                        size = 0;
                        lruHash = {};
                        freshEnd = staleEnd = null;
                    },
                    destroy: function() {
                        data = null;
                        stats = null;
                        lruHash = null;
                        delete caches[cacheId];
                    },
                    info: function() {
                        return extend({}, stats, {size: size});
                    }
                };
                function refresh(entry) {
                    if (entry != freshEnd) {
                        if (!staleEnd) {
                            staleEnd = entry;
                        } else if (staleEnd == entry) {
                            staleEnd = entry.n;
                        }
                        link(entry.n, entry.p);
                        link(entry, freshEnd);
                        freshEnd = entry;
                        freshEnd.n = null;
                    }
                }
                function link(nextEntry, prevEntry) {
                    if (nextEntry != prevEntry) {
                        if (nextEntry) nextEntry.p = prevEntry; //p stands for previous, 'prev' didn't minify
                        if (prevEntry) prevEntry.n = nextEntry; //n stands for next, 'next' didn't minify
                    }
                }
            }
            cacheFactory.info = function() {
                var info = {};
                utils.forEach(caches, function(cache, cacheId) {
                    info[cacheId] = cache.info();
                });
                return info;
            };
            cacheFactory.get = function(cacheId) {
                return caches[cacheId];
            };
            return cacheFactory;
        };
    }






    // 程序入口 ========================= 21159 ===========================================
    bindPlugin();
    //TODO 21169 初始化angular框架， 配置模块， 挂载angular对象
    angularModule = setupModuleLoader(window);
    try {
        angularModule('ngLocale');
    } catch (e) {
        angularModule('ngLocale', []).provider('$locale', $LocaleProvider);
    }
    angularModule('ng', ['ngLocale'], ['$provide',
        function ngModule($provide) {
            $provide.provider({
                $$sanitizeUri: $$SanitizeUriProvider
            });
            $provide.provider('$compile', $CompileProvider).
                directive({
                    //TODO directives
                    ngBind: ngBindHtmlDirective
                })
            $provide.provider({
                // TODO
                $anchorScroll: $AnchorScrollProvider

            });
        }
    ]);
    // 使用angular框架， 初始化（扫描）document中， 相应的节点
    jqLite(document).ready(function() {
        angularInit(document, bootstrap);
    });
})(window, document);