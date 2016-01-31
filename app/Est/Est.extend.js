
  /**
   * @description 模块模式 - 模块定义 如果项目中存在require.js 则调用require.js
   * @method [模式] - define ( 模块定义 )
   * @param {String} name 模块名称
   * @param {Array} dependencies 依赖模块
   * @param {Function} factory 方法
   * @return {*}
   * @author wyj on 14/6/29
   * @example
   *
   */
  Est.define = function (name, dependencies, factory) {
    if (typeof define === 'function' && define.amd) return define;
    if (!moduleMap[name]) {
      var module = {
        name: name,
        dependencies: dependencies,
        factory: factory
      };
      moduleMap[name] = module;
    }
    return moduleMap[name];
  }

/**
   * @description 模块请求 如果项目中存在require.js 则调用require.js
   * @method [模式] - require ( 模块请求 )
   * @param {String} pathArr 文件中第
   * @param {Function} callback 回调函数
   * @author wyj on 14/6/29
   * @example
   *
   */
  Est.require = function (pathArr, callback) {
    if (typeof define === 'function' && define.amd) return require;
    for (var i = 0; i < pathArr.length; i++) {
      var path = pathArr[i];
      if (!fileMap[path]) {
        var head = document.getElementsByTagName('head')[0];
        var node = document.createElement('script');
        node.type = 'text/javascript';
        node.async = 'true';
        node.src = path + '.js';
        node.onload = function () {
          fileMap[path] = true;
          head.removeChild(node);
          checkAllFiles();
        };
        head.appendChild(node);
      }
    }
    function checkAllFiles() {
      var allLoaded = true;
      for (var i = 0; i < pathArr.length; i++) {
        if (!fileMap[pathArr[i]]) {
          allLoaded = false;
          break;
        }
      }
      if (allLoaded) {
        callback();
      }
    }
  }
  function use(name) {
    var module = moduleMap[name];
    if (!module.entity) {
      var args = [];
      for (var i = 0; i < module.dependencies.length; i++) {
        if (moduleMap[module.dependencies[i]].entity) {
          args.push(moduleMap[module.dependencies[i]].entity);
        }
        else {
          args.push(this.use(module.dependencies[i]));
        }
      }
      module.entity = module.factory.apply(noop, args);
    }
    return module.entity;
  }

  Est.use = use;


    /**
   * 装饰者模式 - 接口
   * @method [模式] - interface ( 接口 )
   * @param objectName
   * @param methods
   * @author wyj 15.2.20
   * @example
   *        var test = new Est.interface('test', ['details', 'age']);
   *        var properties = {
   *           name: "Mark McDonnell",
   *           actions: {
   *           details: function () {
   *              return "I am " + this.age() + " years old.";
   *           },
   *           age: (function (birthdate) {
   *              var dob = new Date(birthdate),
   *               today = new Date(),
   *               ms = today.valueOf() - dob.valueOf(),
   *               hours = minutes / 60,
   *               days = hours / 24,
   *               years = days / 365,
   *               age = Math.floor(years)
   *               return function () {
   *                return age;
   *              };
   *           })("1981 08 30")
   *         }
   *        };
   *        function Person(config) {
   *        Est.interface.ensureImplements(config.actions, test);
   *          this.name = config.name;
   *          this.methods = config.actions;
   *        }
   *        var me = new Person(properties);
   *        result1 = me.methods.age();
   *        result2 = me.methods.details();
   */
  function Interface(objectName, methods) {
    if (arguments.length != 2) {
      throw new Error("Interface constructor called with " + arguments.length + "arguments, but expected exactly 2.");
    }
    this.name = objectName;
    this.methods = [];
    each(methods, proxy(function (method) {
      if (typeOf(method) !== 'string') {
        throw new Error("Interface constructor expects method names to be " + "passed in as a string.");
      }
      this.methods.push(method);
    }, this));
  }

  Est.interface = Interface;
  Interface.implements = function (object) {
    if (arguments.length < 2) {
      throw new Error("Interface.ensureImplements was called with " + arguments.length + "arguments, but expected at least 2.");
    }
    for (var i = 1, len = arguments.length; i < len; i++) {
      var thisInterface = arguments[i];
      if (thisInterface.constructor !== Interface) {
        throw new Error("Interface.ensureImplements expects the second argument to be an instance of the 'Interface' constructor.");
      }
      for (var j = 0, methodsLen = thisInterface.methods.length; j < methodsLen; j++) {
        var method = thisInterface.methods[j];
        if (!object[method] || typeof object[method] !== 'function') {
          throw new Error("not extend super implememnt'" + thisInterface.name + "''" + method + "'.");
        }
      }
    }
  };

    /**
   * @description 通过原型继承创建一个新对象
   * @method [模式] - inherit ( 通过原型继承创建一个新对象 )
   * @param {Object} target 继承对象
   * @param {Object} extra 额外对象
   * @return {*}
   * @example
   *      var target = {x:'dont change me'};var newObject = Est.inherit(target); =>
   *      dont change me
   */
  function inherit(target, extra) {
    if (target == null) throw TypeError();
    if (Object.create)
      return Object.create(target);
    var type = typeof target;
    if (type !== 'object' && type !== 'function') throw TypeError();
    function fn() {
    };
    fn.prototype = target;
    return new fn();
  }

  Est.inherit = inherit;


    /**
   * @description 给元素添加虚线框
   * @method [浏览器] - dashedFrame ( 给元素添加虚线框 )
   * @param {Element} target 元素
   * @param {Object} 选择器
   * @author wyj on 14/8/8
   * @example
   *      Est.dashedFrame($("#node"), $);
   */
  function dashedFrame(target, $) {
    if (!window.$dashFrame) {
      window.$dashedFrameLeft = $("<div id='dashedFrameLeft' style='display:none;border:#2b73ba 1px dashed;background:#fff;font-size:0;overflow:hidden;zoom:1;position:absolute;z-index:400;'>&nbsp;</div>");
      window.$dashedFrameTop = $("<div id='dashedFrameTop' style='display:none;border:#2b73ba 1px dashed;font-size:0;background:#fff;overflow:hidden;zoom:1;position:absolute;z-index:400;'>&nbsp;</div>");
      window.$dashedFrameRight = $("<div id='dashedFrameRight' style='display:none;border:#2b73ba 1px dashed;font-size:0;background:#fff;overflow:hidden;zoom:1;position:absolute;z-index:400;'>&nbsp;</div>");
      window.$dashedFrameBottom = $("<div id='dashedFrameBottom' style='display:none;border:#2b73ba 1px dashed;font-size:0;background:#fff;overflow:hidden;zoom:1;position:absolute;z-index:400;'>&nbsp;</div>");
      $('body').append(window.$dashedFrameLeft);
      $('body').append(window.$dashedFrameTop);
      $('body').append(window.$dashedFrameRight);
      $('body').append(window.$dashedFrameBottom);
      window.$dashFrame = true;
    }
    var w = $(target).outerWidth(), h = $(target).outerHeight(), offset = $(target).offset();
    window.$dashedFrameLeft.css({left: offset.left, top: offset.top, width: 0, height: h}).show();
    window.$dashedFrameTop.css({left: offset.left, top: offset.top, width: w, height: 0}).show();
    window.$dashedFrameRight.css({left: (offset.left + w), top: offset.top, width: 0, height: h}).show();
    window.$dashedFrameBottom.css({left: offset.left, top: (offset.top + h), width: w, height: 0}).show();
  }

  Est.dashedFrame = dashedFrame;

  /**
   * @description url 路由
   * @method [浏览器] - route ( url 路由 )
   * @param {String} path
   * @param {String} templateId
   * @param controller
   * @author wyj on 14.10.28
   * @example
   *      // HTML
   *      <ul> <li><a href="#">Home</a></li> <li><a href="#/page1">Page 1</a></li> <li><a href="#/page2">Page 2</a></li> </ul> <div id="view"></div> <script type="text/html" id="home"> <h1>Router FTW!</h1> </script> <script type="text/html" id="template1"> <h1>Page 1: {{greeting}}></h1> <p>{{moreText}}></p> </script> <script type="text/html" id="template2"> <h1>Page 2: {{heading}}></h1> <p>Lorem ipsum...</p> </script>
   *      // JAVASCRIPT
   *      route('/', 'home', function(){});
   *      route('/page1', 'template1', function () {
   *             this.greeting = 'Hello world!';
   *             this.moreText = 'Loading...';
   *             setTimeout(function () {
   *                 this.moreText = 'Bacon ipsum...';
   *             }.bind(this), 500);
   *         });
   *      route('/page2', 'template2', function () {
   *             this.heading = 'I\'m page two!';
   *         });
   *
   */
  function route(path, templateId, controller) {
    if (typeof templateId === 'function') {
      controller = templateId;
      templateId = null;
    }
    routes[path] = {templateId: templateId, controller: controller};
  }

  Est.route = route;

  function router() {
    var url = location.hash.slice(1) || '/';
    var route = routes[url];
    if (route && !route.templateId) {
      return route.controller ? new route.controller : null;
    }
    el = el || document.getElementById('view');
    if (current) {
      Object.unobserve(current.controller, current.render);
      current = null;
    }
    if (el && route && route.controller) {
      current = {
        controller: new route.controller,
        template: template(document.getElementById(route.templateId).innerHTML),
        render: function () {
          el.innerHTML = this.template(this.controller);
        }
      };
      current.render();
      Object.observe(current.controller, current.render.bind(current));
    }
  }

  if (window && window.addEventListener) {
    window.addEventListener('hashchange', router);
    window.addEventListener('load', router);
  }
 /**
   * @description 清空该元素下面的所有子节点【大数据量时】 在数据量小的情况下可以用jQuery的empty()方法
   * parentNode必须为DOM对象，$('#selector').get(0);
   * @method [文档] - clearAllNode ( 清空所有子节点 )
   * @param parentNode
   * @return {*}
   * @author wyj on 14-04-26
   * @example
   *      Est.clearAllNode(document.getElementById("showResFilesContent"));
   */
  function clearAllNode(parentNode) {
    while (parentNode.firstChild) {
      var oldNode = parentNode.removeChild(parentNode.firstChild);
      oldNode = null;
    }
  }

  Est.clearAllNode = clearAllNode;

  /**
   * @description 延迟模式 - 避免在 ms 段时间内，多次执行func。常用 resize、scoll、mousemove等连续性事件中
   * @method [模式] - delay ( 延迟模式 )
   * @param {Function} func 方法
   * @param {Number} ms 缓冲时间
   * @param context
   * @return {Function}
   * @author wyj on 14/5/24
   * @example
   *     Est.delay(function(){}, 5);
   */
  function delay(func, wait) {
    if (typeOf(func) !== 'function') {
      throw new TypeError;
    }
    return setTimeout(function () {
      func.apply(undefined, slice.call(arguments));
    }, wait);
  }

  Est.delay = delay;



 /**
   * @description 获取每月的天数
   * @method [时间] - getDays ( 获取每月的天数 )
   * @param Year
   * @param Mon
   * @return {number}
   * @author wyj on 14.9.14
   * @example
   *      var days = Est.getDays('2014', '9'); => 31  // 这里的9表示 8月份
   */
  function getDays(Year, Mon) {
    var days =
      (/^0$|^2$|^4$|^6$|^7$|^9$|^11$/.test(Mon)) ? 31 :
        (/^3$|^5$|^8$|^10$/.test(Mon)) ? 30 :
          (/^1$/.test(Mon)) ?
            ((!(Year % 400) || (!(Year % 4) && (Year % 100))) ? 29 : 28) : 0;
    return days;
  }

  Est.getDays = getDays;
    /**
   * @description 加载样式文件
   * @method [样式] - loadCss ( 加载样式文件 )
   * @param url
   * @author wyj on 14/7/7
   * @example
   *
   */
  function loadCSS(url) {
    var elem = document.createElement("link");
    elem.rel = "stylesheet";
    elem.type = "text/css";
    elem.href = url;
    document.body.appendChild(elem);
  }

  Est.loadCss = loadCSS;
    /**
   * @description 获取元素的标签符号 , 大写的转换成小写的
   * @method [样式] - getTagName ( 获取元素的标签符号 )
   * @param {Element} target 目标元素
   * @return {string} 返回标签符号
   * @author wyj on 14/5/6
   * @example
   *     Est.getTagName(document.getElementById('a')); ==>　'div'
   */
  function getTagName(target) {
    return target.tagName.toLowerCase();
  }

  Est.getTagName = getTagName;
    /**
   * @description 获取当前元素的css选择符，规则：父模块的ID值 + 当前元素的ID值 > class值
   * @method [样式] - getSelector ( 获取当前元素的css选择符 )
   * @param {Element} target 目标元素
   * @param {String} parentClass 父模块class选择符
   * @param {Object} $  jquery对象 或 其它
   * @return {string} 返回当前元素的选择符
   * @author wyj on 14/5/5
   * @example
   *     Est.getSelector($('#gird-li').get(0), 'moveChild')) => ;
   */
  function getSelector(target, parentClass, $) {
    var selector = "";
    var isModule = $(target).hasClass(parentClass);
    var id = $(target).attr("id");
    var className = $(target).attr("class");
    if (id.length > 0) {
      selector = "#" + id;
    } else if (className.length > 0) {
      selector = "." + $.trim(className).split(" ")[0];
    } else {
      selector = getTagName(target);
      selector = getSelector(target.parentNode) + " " + selector;
    }
    return isModule ? selector : '#' + $(target).parents('.moveChild:first').attr('id') + ' ' + selector;
  }

  Est.getSelector = getSelector;

    // CacheUtils
  /**
   * @description 数据缓存
   * @method [缓存] - getCache ( 数据缓存 )
   * @param {String} uId 唯一标识符
   * @param {Object} ctx 缓存对象
   * @param {String} options.area 缓存分区
   * @param {Object} options {Function} options.getData 获取待缓存的数据
   * @return {*} 返回缓存数据
   * @author wyj on 14/5/3
   * @example
   *     Est.getCache('uId', session, {
   *          area : 'dd',
   *          getData : function(data){
   *              return cache_data;
   *          }
   *      }))
   */
  function getCache(uId, ctx, options) {
    var opts = {
      area: 'templates',
      getData: null
    }
    Est.extend(opts, options);
    ctx.cache = ctx.cache || {};
    if (typeof ctx.cache[opts.area] === 'undefined') {
      ctx.cache[opts.area] = {};
    }
    var data = ctx.cache[opts.area][uId];
    if (!data) {
      data = ctx.cache[opts.area][uId] = opts.getData.call(null, data);
    }
    return data;
  }

  Est.getCache = getCache;
    // GirdUtils
  /**
   * @description 列表两端对齐，
   * @method [图片] - girdJustify ( 列表两端对齐 )
   * @param options
   * @author wyj on 14/5/11
   * @example
   *      <script type="text/javascript">
   *          var justifyCont = $("#gird");
   *          var justifylist = $("li", justifyCont);
   *          var justifyOpts = {
   *                  containerWidth: justifyCont.width(), //容器总宽度
   *                  childLength: justifylist.size(), //子元素个数
   *                  childWidth: justifylist.eq(0).width(), // 子元素宽度
   *                  childSpace: 10, //默认右边距
   *                  callback: function (i, space) { // 回调函数， 执行CSS操作， i为第几个元素， space为边距
   *                      justifylist.eq(i).css("margin-right", space);
   *                  }
   *              };
   *          Est.girdJustify(justifyOpts);
   *          $(window).bind("resize", function () {
   *              justifyOpts.containerWidth = justifyCont.width();
   *              Est.girdJustify(justifyOpts);
   *          });
   *      </script>
   */
  function girdJustify(opts) {
    var opts = {
      ow: parseFloat(opts.containerWidth),
      cw: parseFloat(opts.childWidth),
      cl: opts.childLength,
      cm: parseFloat(opts.childSpace),
      fn: opts.callback
    };
    //每行显示的个数
    var rn = Math.floor((opts.ow - opts.cm) / (opts.cw + opts.cm));
    //间隔
    var space = Math.floor((opts.ow - opts.cw * rn) / (rn - 1));
    //总共有几行
    var rows = Math.ceil(opts.cl / rn);
    for (var i = 0; i < rows; i++) {
      for (var j = rn * i; j < rn * (i + 1); j++) {
        if (j != (rn * (i + 1) - 1)) {
          // 是否是每行的最后一个， 否则添加右边距
          opts.fn(j, space);
        } else {
          opts.fn(j, 0);
        }
      }
    }
  }

  Est.girdJustify = girdJustify;

    /**
   * @description 绘制canvas图片 解决苹果屏幕模糊问题 注意：此方法将移除， 转移到Canvas.min.js中
   * @method [图片] - drawImage ( 绘制canvas图片 )
   * @param {Object} opts 详见例子
   * @author wyj on 14.9.4
   * @example
   *        Est.drawImage({
   *            context2D: context2D, // canvas.getContext("2d")
   *            canvas: canvas, // 画布
   *            image: imageObj, // image对象
   *              desx: result.marginLeft, // 开始剪切的 x 坐标位置
   *            desy: result.marginTop, // 开始剪切的 y 坐标位置
   *            desw: result.width,// 被剪切图像的宽度
   *            desh: result.height}); // 被剪切图像的高度
   */
  function drawImage(opts) {
    if (!opts.canvas) {
      throw("A canvas is required");
    }
    if (!opts.image) {
      throw("Image is required");
    }
    // 获取canvas和context
    var canvas = opts.canvas,
      context = opts.context2D,
      image = opts.image,
    // now default all the dimension info
      srcx = opts.srcx || 0,
      srcy = opts.srcy || 0,
      srcw = opts.srcw || image.naturalWidth,
      srch = opts.srch || image.naturalHeight,
      desx = opts.desx || srcx,
      desy = opts.desy || srcy,
      desw = opts.desw || srcw,
      desh = opts.desh || srch,
      auto = opts.auto,
    // finally query the various pixel ratios
      devicePixelRatio = window.devicePixelRatio || 1,
      backingStoreRatio = context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio || 1,
      ratio = devicePixelRatio / backingStoreRatio;
    // ensure we have a value set for auto.
    // If auto is set to false then we
    // will simply not upscale the canvas
    // and the default behaviour will be maintained
    if (typeof auto === 'undefined') {
      auto = true;
    }
    // upscale the canvas if the two ratios don't match
    if (auto && devicePixelRatio !== backingStoreRatio) {
      var oldWidth = canvas.width;
      var oldHeight = canvas.height;
      canvas.width = oldWidth * ratio;
      canvas.height = oldHeight * ratio;
      canvas.style.width = oldWidth + 'px';
      canvas.style.height = oldHeight + 'px';
      // now scale the context to counter
      // the fact that we've manually scaled
      // our canvas element
      context.scale(ratio, ratio);
    }
    context.drawImage(opts.image, srcx, srcy, srcw, srch, desx, desy, desw, desh);
  }

  Est.drawImage = drawImage;

    /**
   * @description 图片上传预览
   * @method [图片] - setImagePreview ( 图片上传预览 )
   * @param {Object} option option.inputFile : file input表单元素,  option.imgNode : 待显示的img元素
   * @return {boolean} 返回 true 与 false
   * @author wyj on 14/8/30
   * @example
   *       Est.imagePreview({
   *               inputFile: $("input[type=file]").get(0),
   *               imgNode: $(".img").get(0)
   *        });
   */
  function imagePreview(option) {
    var docObj = option.inputFile; // file input表单元素
    var files = docObj.files;
    var imgObjPreview = option.imgNode; // 待显示的img元素
    var i = 0, file = null;
    try {
      if (files && files[0]) {
        var length = files.length;
        while (i < length) {
          file = files[i];
          if (file.type.match("image.*")) {
            var render = new FileReader();
            render.readAsDataURL(file);
            render.onloadend = function () {
              imgObjPreview.src = this.result;
            };
          }
          i++;
        }
      } else {
        docObj.select();
        var imgSrc = document.selection.createRange().text;
        var localImagId = document.getElementById("localImag");
        localImagId.style.width = "96px";
        localImagId.style.height = "96px";
        try {
          localImagId.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
          localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
        } catch (e) {
          alert("您上传的图片格式不正确，请重新选择!");
          return false;
        }
        imgObjPreview.style.display = 'none';
        document.selection.empty();
      }
    } catch (e) {
      console.error(e);
    }
    return true;
  }

  Est.imagePreview = imagePreview;

   /**
   * @description 获取居中图片的margin值, 若图片宽高比太大，则不剪切
   * @method [图片] - imageCrop ( 获取居中图片的margin值 )
   * @param {Number} naturalW 图片宽度
   * @param {Number} naturalH 图片高度
   * @param {Number} targetW 展示框宽度
   * @param {Number} targetH 展示框高度
   * @param {Boolean} fill 是否铺满框
   * @return {{width: *, height: *, marginTop: number, marginLeft: number}}
   * @author wyj on 14-04-24
   * @example
   *      $.each($(".imageCrop"), function(){
   *           $(this).load(function(response, status, xhr){
   *               var w = $(this).get(0).naturalWidth, h = $(this).get(0).naturalHeight;
   *               var width = $(this).attr("data-width"), height = $(this).attr("data-height");
   *               $(this).css(Est.imageCrop(w, h, width, height), 'fast');
   *               $(this).fadeIn('fast');
   *           });
   *       });
   */
  function imageCrop(naturalW, naturalH, targetW, targetH, fill) {
    var _w = parseInt(naturalW, 10), _h = parseInt(naturalH, 10),
      w = parseInt(targetW, 10), h = parseInt(targetH, 10);
    var fill = fill || false;
    var res = {
      width: w,
      height: h,
      marginTop: 0,
      marginLeft: 0
    };
    if (_w != 0 && _h != 0) {
      var z_w = w / _w, z_h = h / _h;
      if (!fill && (z_w / z_h) > 1.5) {
        //若高度 远远 超出 宽度
        res = {
          width: 'auto',
          height: h,
          marginTop: 0,
          marginLeft: Math.abs((w - _w * z_h) / 2)
        };
      } else if (!fill && (z_h / z_w) > 1.5) {
        //若宽度 远远 超出 高度
        res = {
          width: w,
          height: 'auto',
          marginTop: Math.abs((h - _h * z_w) / 2),
          marginLeft: 0
        };
      }
      else {
        if (z_w < z_h) {
          res = {
            width: _w * z_h,
            height: h,
            marginTop: 0,
            marginLeft: -(_w * z_h - w) / 2
          };
        } else if (z_w > z_h) {
          res = {
            width: w,
            height: _h * z_w,
            marginTop: -(_h * z_w - h) / 2,
            marginLeft: 0
          };
        } else {
          res = {
            width: w,
            height: h,
            marginTop: -(_h * z_h - h) / 2,
            marginLeft: -(_w * z_h - w) / 2
          };
        }
      }
    }
    return res;
  }

  Est.imageCrop = imageCrop;

   // ImageUtils ==============================================================================================================================================

  /**
   * @description  获取图片地址缩放等级
   * @method [图片] - picUrl ( 获取图片地址缩放等级 )
   * @param src
   * @param zoom
   * @return {string}
   * @author wyj on 14/7/25
   * @example
   *      Est.picUrl(src, 5);
   */
  function picUrl(src, zoom) {
    if (!Est.isEmpty(src)) {
      var type = src.substring(src.lastIndexOf(".") + 1, src.length);
      var hasZoom = src.lastIndexOf('_') > 0 ? true : false;
      return src.substring(0, src.lastIndexOf(hasZoom ? '_' : '.')) + "_" + zoom + "." + type;
    }
  }

  Est.picUrl = picUrl;
    /**
   * @description 字符串转化成MAP对象，以逗号隔开， 用于FORM表单
   * @method [数组] - makeMap ( 字符串转化成MAP对象 )
   * @param str
   * @return {{}}
   * @author wyj on 14/6/23
   * @example
   *      var object = Est.makeMap("a, aa, aaa"); => {"a":true, "aa": true, "aaa": true}
   */
  function makeMap(str) {
    var obj = {}, items = str.split(","), i;
    for (i = 0; i < items.length; i++)
      obj[ items[i] ] = true;
    return obj;
  }

  Est.makeMap = makeMap;
    /**
   * @description 删除数组中的元素
   * @method [数组] - arrayRemove ( 删除数组中的元素 )
   * @param {Array} array 目标数组
   * @param {*} value 删除的元素
   * @return {*}
   * @author wyj on 14/6/23
   * @example
   *      var list = ['a', 'b', 'b'];
   *      var result = Est.arrayRemove(list, 'a'); => ['a', 'b']
   */
  function arrayRemove(array, value) {
    var index = indexOf(array, value);
    if (index !== -1)
      array.splice(index, 1);
    return value;
  }

  Est.arrayRemove = arrayRemove;