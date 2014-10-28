/**
 * 画图工具类库.
 *
 * @description 创建 on 14.10.6
 * @class Canvas - 画图工具类库
 * @constructor Canvas
 */
;
(function () {'use strict';
    var root = this;
    /**
     * @description 创建Canvas对象
     * @method [对象] - Canvas
     */
    var Canvas = function (value) {
        return (value && typeof value == 'object' && Est.typeOf(value) !== 'array' && Object.prototype.hasOwnProperty.call(value, '_wrapped')) ? value : new Wrapper(value);
    };
    function Wrapper(value, chainAll) {
        this._chain = !!chainAll;
        this._wrapped = value;
    }
    Canvas.version = '1.1.0';
    /**
     * @description 用于node.js 导出
     * @method [模块] - exports
     */
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = Canvas;
        }
        exports.Canvas = Canvas;
    } else {
        root.Canvas = Canvas;
    }
    /**
     * @description 创建元素
     * @method [文档] - createElement
     * @param  {String} tag   标签名称
     * @param  {Object} attrs 属性
     * @return {Element}       元素
     * @author wyj on 14.10.7
     * @example
     *     var attrs = {
     *         style: "position:absolute;"
     *         width: 50,
     *         height: 50
     *     }
     *     var node = Canvas.createElement('canvas', attrs);
     */
    function createElement(tag, attrs) {
        var node = document.createElement(tag);
        for (var key in attrs)
            node.setAttribute(key, attrs[key]);
        return node
    }
    Canvas.createElement = createElement;
    /**
     * @description 清空画布
     * @method [清除] - clearRect
     * @param  {Canvas} canvas 画布对象
     * @param  {Number} left   
     * @param  {Number} top    
     * @param  {Number} width  
     * @param  {Number} height 
     * @return {context} 
     * @author wyj on 14.10.10       
     */
    function clearRect(canvas, left, top, width, height){
       var context = canvas.getContext("2d");
       context.clearRect(left, top, width, height);
       return context; 
    }
    Canvas.clearRect = clearRect;
    /**
     * @description 绘制canvas图片 解决苹果屏幕模糊问题
     * @method [图片] - drawImage
     * @param {Object} opts 详见例子
     * @author wyj on 14.9.4
     * @example
     * Canvas.drawImage({
				canvas: canvas, // 画布
				image: imageObj, // image对象
				desx: result.marginLeft, // 开始剪切的 x 坐标位置
				desy: result.marginTop, // 开始剪切的 y 坐标位置
				desw: result.width,// 被剪切图像的宽度
				desh: result.height,// 被剪切图像的高度
				srcx: 100,  // 画布x位置
				srcy: 0, // 画布y位置
				srcw: 50, // 画布宽度
				srch:50 // 画布高度
				});
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
            context = opts.canvas.getContext("2d"),
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
            opacity = opts.opacity || 1,
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
        context.globalAlpha = opacity;
        context.drawImage(opts.image, srcx, srcy, srcw, srch, desx, desy, desw, desh);
    }
    Canvas.drawImage = drawImage;
    /**
     * @description 绘制文字
     * @method [文字] - drawText
     * @param  {Canvas} canvas canvas对象
     * @param {String} text 文字
     * @param  {Object} options   配置属性
     * @return {context}        ctx
     * @author wyj on 14.10.6
     * @example
     *
     */
    function drawText(canvas, text, options) {
        this.canvas = canvas || document.getElementById("canvas");
        if (Est.isEmpty(this.canvas)) throw new Error("canvas is required");
        this.opts = {
            fillStyle: '#000',
            fontSize: '12',
            fontWeight: 'Bold',
            textAlign: 'center',
            before: function () {
            },
            after: function () {
            }
        }
        Est.extend(this.opts, options);
        var ctx = this.canvas.getContext("2d");
        this.opts.before.call(ctx);
        // 保存当前环境的状态
        ctx.save();
        //设置或返回用于填充绘画的颜色、渐变或模式
        ctx.fillStyle = this.opts.fillStyle;
        ctx.fillRect(ctx.left, ctx.top, this.canvas.width, this.canvas.height);
        // 返回之前保存过的路径状态和属性
        ctx.restore();
        ctx.save();
        ctx.font = this.opts.fontWeight + " " + this.opts.fontSize + "px Arial";
        ctx.textAlign = this.opts.textAlign;
        ctx.fillText(text, this.canvas.width / 2, this.canvas.height / 2 + this.opts.fontSize / 2);
        ctx.restore();
        this.opts.after.call(null, ctx);
        return ctx;
    }
    Canvas.drawText = drawText;
    /**
     * @description 画扇形
     * @method [扇形] - drawSector
     * @param {Canvas} canvas canvas对象
     * @param {Number} x 起始x轴坐标
     * @param {Number} y 起始y轴坐标
     * @param {Number} radius 圆的半径
     * @param {Number} sDeg 起始角度值，以弧度计。（弧的圆形的三点钟位置是 0 度）。
     * @param {Number} eDeg 结束角度值
     * @param {Object} options options.before 绘制前调用函数; options.after 绘制后调用函数
     * @return {canvas} canvas
     * @author wyj on 14.10.6
     * @example
     *      var canvas = document.getElementById('cvs');
     *      Canvas.drawSector(canvas, 100, 100, 80, 30*deg, 111*deg, {
     *          before : function(){},
     *          after: function(ctx){
     *              ctx.fillStyle = "#f00";
     *              ctx.fill();
     *          }
     *      });
     */
    function drawSector(canvas, x, y, radius, sDeg, eDeg, options) {
        this.canvas = canvas || document.getElementById("canvas");
        if (Est.isEmpty(this.canvas))throw new Error("canvas is required");
        this.opts = {
            before: function () {
            },
            after: function () {
            }
        }
        Est.extend(this.opts, options);
        if (Est.typeOf(this.opts.before) === 'function') this.opts.before.call(null, ctx);
        var deg = Math.PI / 180;
        sDeg = sDeg * deg;
        eDeg = eDeg * deg;

        var ctx = this.canvas.getContext("2d");
        // 初始保存
        ctx.save();
        // 位移到目录
        ctx.translate(x, y);
        ctx.beginPath();
        // 画出圆弧
        ctx.arc(0, 0, radius, sDeg, eDeg);
        // 再次保存以备旋转
        ctx.save();
        // 旋转至起始角度
        ctx.rotate(eDeg);
        // 移动到终点，准备连接终点与圆心
        ctx.moveTo(radius, 0);
        // 连接到圆心
        ctx.lineTo(0, 0);
        // 还原
        ctx.restore();
        // 旋转至起点角度
        ctx.rotate(sDeg);
        // 从圆心连接到起点 closePath: 使封闭
        ctx.lineTo(radius, 0);
        ctx.closePath();
        // 还原到最初保存的状态
        ctx.restore();
        if (Est.typeOf(this.opts.after) === 'function') {
            this.opts.after.call(null, ctx);
        }
        return ctx;
    }
    Canvas.drawSector = drawSector;
    /**
     * @description 旋转画布
     * @method [旋转] - drawRotated
     * @param  {Canvas}   canvas   [description]
     * @param  {Bumber}   degrees  [description]
     * @param  {Function} callback [description]
     * @return            [description]
     * @author wyj on 14.10.7
     */
    function drawRotated(canvas, degrees, callback) {
        var context = canvas.getContext("2d");
        // save the unrotated context of the canvas so we can restore it later
        // the alternative is to untranslate & unrotate after drawing
        context.save();
        // move to the center of the canvas
        context.translate(canvas.width / 2, canvas.height / 2);
        // rotate the canvas to the specified degrees
        context.rotate(degrees * Math.PI / 180);
        if (typeof callback !== 'undefined')
            callback.call(context);
        // we’re done with the rotating so restore the unrotated context
        context.restore();
    }
    Canvas.drawRotated = drawRotated;
    /**
     * @description 获取圆上某点 水平与圆心平行的夹角， 类似于转盘外侧的文字
     * @method [角度] - getDegreeByCircle
     * @param {Number} rotateDeg 以x轴为起点所占有的角度值
     * @param {Number} deg 总共有几等份
     * @param {Nubmer} dx 当前第几个
     * @return {Number} 返回结果
     * @author wyj on 14.10.8
     * @example
     *
     */
    function getDegreeByCircle(rotateDeg, deg, dx) {
        if (rotateDeg > 90 && rotateDeg < 180) {
            rotateDeg = 180 - dx * deg;
        } else if (rotateDeg > 180 && rotateDeg < 270) {
            rotateDeg = -deg * dx - 180;
        }
        else if (rotateDeg > 270 && rotateDeg < 360) {
            rotateDeg = 180 - deg * dx;
        }
        else if (rotateDeg > 360 && rotateDeg < 450) {
            var deg_p = rotateDeg - 360;
            rotateDeg = 90 - rotateDeg;
        }
        else if (rotateDeg > 450 && rotateDeg < 640) {
            rotateDeg = 90 + deg / 2;
        }
        switch (rotateDeg) {
            case 0:
                rotateDeg = -90;
                break;
            case 90:
                rotateDeg = -90;
                break;
            case 180:
                rotateDeg = +90;
                break;
            case 270:
                rotateDeg = 0;
                break;
            case 360:
                rotateDeg = -90;
                break;
            case 450:
                rotateDeg = -360;
                break;
        }
        return rotateDeg;
    }
    Canvas.getDegreeByCircle = getDegreeByCircle;
    /**
     * @description 计算半径为radius的点在圆中的坐标
     * @method [位置] - getCircleLocation
     * @param {number} centerX 中心点x坐标
     * @param {number} centerY 中心点y坐标
     * @param {number} radius 圆半径
     * @param {number} degree 角度值 0 - 360
     * @return {{x: *, y: *}}
     * @author wyj on 14.10.7
     * @example
     *      var pos = Canvas.getCircleLocation(centerX, centerY, radius, degree);
     *      console.log(pos.x);
     *      console.log(pos.y);
     */
    function getCircleLocation(centerX, centerY, radius, degree) {
        var posX, posY;
        switch (degree) {
            case 180:
                posX = centerX - radius;
                posY = centerY;
                break;
            case 0:
                posX = centerX + radius;
                posY = centerY;
                break;
            case 90:
                posX = centerX;
                posY = centerY + radius;
                break;
            case 270:
                posX = centerX;
                posY = centerY - radius;
                break;
            default :
                degree = Math.PI / 180 * degree;
                posX = centerX + radius * Math.cos(degree);
                posY = centerY + radius * Math.sin(degree);
        }
        return {
            x: posX,
            y: posY
        }
    }
    Canvas.getCircleLocation = getCircleLocation;
    Est.mixin(Canvas, false);
    /**
     * @description For request.js
     * @method [定义] - define
     */
    if (typeof define === 'function' && define.amd) {
        define('Canvas', [], function () {
            return Canvas;
        });
    }
}.call(this));