(function($){
    function DrawCanvans(el, opts) {
        this.conNode = el;
        this.background = null;
        this.backCtx = null;
        this.mask = null;
        this.maskCtx = null;
        this.lottery = null;
        this.lotteryType = "image";
        this.cover = opts.cover || "#000";
        this.coverType = opts.coverType;
        this.width = opts.width || null;
        this.height = opts.height || null;
        this.fillImage = opts.fillImage || false;
        this.marginLeft = opts.marginLeft || 0;
        this.marginTop = opts.marginTop || 0;
        this.lastPosition = null;
        this.lineWidth = opts.lineWidth || 50;
        this.beforeCallback = opts.beforeCallback || null; // 刮前回调函数
        this.drawPercentCallback = opts.callback; // 刮时回调函数
        this.success = opts.success || function(){};
        this.cbdelay = opts.cbdelay || 0;
        this.vail = !1;
        this.zIndex = opts.zIndex || 20;
        this.shaveable = opts.shaveable || false;
        this.left = opts.left || 0;
        this.top = opts.top || 0;
        this.fontSize = opts.fontSize || 12;
        this.position = opts.position || 'fixed';
    }
    DrawCanvans.prototype = {
        createElement: function(tag, attrs) {
            var node = document.createElement(tag);
            for (var key in attrs)
                node.setAttribute(key, attrs[key]);
            return node
        },
        getTransparentPercent: function(canvas, width, height) {
            var imageData = canvas.getImageData(0, 0, width, height);
            var data = imageData.data;
            var list = [];
            for (var i = 0, len = data.length; len > i; i += 4) {
                // 以4个为一个像素点， 分别为red,green,blue,和alpha
                var alpha = data[i + 3];
                if (128 > alpha){
                    list.push(i);
                }
            }
            return (100 * (list.length / (data.length / 4))).toFixed(2)
        },
        resizeCanvas: function(canvas, width, height, left, top) {
        	left = left || 0; top = top || 0;
            canvas.width = width, canvas.height = height, canvas.getContext("2d").clearRect(left, top, width, height)
        },
        resizeCanvas_w: function(canvas, width, height, left, top) {
        	left = left || 0; top = top || 0;
            canvas.width = width, canvas.height = height, canvas.getContext("2d").clearRect(left, top, width, height), this.vail ? this.drawMask() : this.drawMask()
        },
        drawPoint:function(left, top) {
        	var $mask = $(this.mask);
        	var offset = $mask.offset();
        	$mask.css('margin-right', $(this.mask).css('margin-right') == "0px" ? "1px" : "0px");
            this.maskCtx.beginPath();
            this.maskCtx.arc(left - offset.left, top - offset.top, this.lineWidth, 0, 2 * Math.PI);
            this.maskCtx.fill();
            this.maskCtx.beginPath();
            this.maskCtx.lineWidth = this.lineWidth * 2;
            this.maskCtx.lineCap = this.maskCtx.lineJoin = "round";
            this.lastPosition && this.maskCtx.moveTo(this.lastPosition[0], this.lastPosition[1]);
            this.maskCtx.lineTo(left - this.left, top - this.top);
            this.maskCtx.stroke();
            this.lastPosition = [ left - this.left, top - this.top ];
            this.mask.style.zIndex = this.zIndex + 1;
        },
        bindEvent: function() {
            var ctx = this, mobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()), clickType = mobile ? "touchstart" : "mousedown", moveType = mobile ? "touchmove" : "mousemove";
            if (mobile){
                ctx.conNode.addEventListener("touchmove", function(ctx) {
                    flag && ctx.preventDefault();
                    ctx.cancelable ? ctx.preventDefault() : window.event.returnValue = false
                }, false);
                ctx.conNode.addEventListener("touchend", function() {
                    flag = false;
                    var percent = ctx.getTransparentPercent(ctx.maskCtx, ctx.width, ctx.height);
                    if ("function" == typeof ctx.drawPercentCallback){
                        ctx.timeFlag = setTimeout(function(){
                            ctx.drawPercentCallback.call(ctx.mask, percent);
                        }, ctx.cbdelay);
                    }
                }, false);
            }
            else {
                var flag = !1;
                ctx.conNode.addEventListener("mouseup", function(event) {
                    event.preventDefault(), flag = !1;
                    var percent = ctx.getTransparentPercent(ctx.maskCtx, ctx.width, ctx.height);
                    if("function" == typeof ctx.drawPercentCallback){
                        ctx.timeFlag = setTimeout(function(){
                            ctx.drawPercentCallback.call(ctx.mask, percent);
                        }, ctx.cbdelay);
                    }
                }, !1)
            }
            this.mask.addEventListener(clickType, function(e) {
                if (Est.typeOf(ctx.beforeCallback) === 'function'){
                    if (!ctx.beforeCallback()) return;
                }
                if (ctx.timeFlag)
                    clearTimeout(ctx.timeFlag);
                e.preventDefault(), flag = true;
                var pageX = mobile ? e.touches[0].pageX : e.pageX || e.x;
                var pageY = mobile ? e.touches[0].pageY : e.pageY || e.y;
                console.log(pageX+ "," + pageY);
                ctx.drawPoint(pageX, pageY, flag)
            }, false);
            this.mask.addEventListener(moveType, function(e) {
            	if (e.preventDefault(), !flag)
                    return false;
                e.preventDefault();
            	if (Est.typeOf(ctx.beforeCallback) === 'function'){
            		if(!ctx.beforeCallback()) return;
                }
                var pageX = mobile ? e.touches[0].pageX : e.pageX || e.x;
                var pageY = mobile ? e.touches[0].pageY : e.pageY || e.y;
                ctx.drawPoint(pageX, pageY, flag);
            }, false)
        },
        drawMask: function() {
            var ctx = this;
            if ("text" == this.coverType){
                this.resizeCanvas(ctx.mask, ctx.width, ctx.height, ctx.left, ctx.top); // 清除填充的内容
                this.maskCtx.save(); // 保存当前环境的状态
                this.maskCtx.fillStyle = "#FFF"; // 设置或返回用于填充绘画的颜色、渐变或模式
                this.maskCtx.fillRect(ctx.left, ctx.top, this.width, this.height);
                this.maskCtx.restore(); // 返回之前保存过的路径状态和属性
                this.maskCtx.save(); 
                this.maskCtx.font = "Bold " + this.fontSize + "px Arial";
                this.maskCtx.textAlign = "center";
                this.maskCtx.fillStyle = "#F60";
                this.maskCtx.fillText(this.cover, this.width / 2, this.height / 2 + this.fontSize / 2);
                this.maskCtx.restore();
                this.success.call(this);
            }
            else if ("color" == this.coverType){
                ctx.resizeCanvas(ctx.mask, ctx.width, ctx.height, ctx.left, ctx.top);
                this.maskCtx.fillStyle = this.cover;
                this.maskCtx.fillRect(0, 0, this.width, this.height);
                this.maskCtx.globalCompositeOperation = "destination-out";
                this.success.call(this);
            }
            else if ("image" == this.coverType) {
                var image = new Image;
                image.onload = function() {
                    ctx.resizeCanvas(ctx.mask, ctx.width, ctx.height, ctx.left, ctx.top),
                        /android/i.test(navigator.userAgent.toLowerCase()),
                        ctx.maskCtx.globalAlpha = .98,
                        this.width = ctx.width || this.naturalWidth,
                        this.height = ctx.height || this.naturalHeight;
                    if (!ctx.width || !ctx.height){
                    	ctx.mask.setAttribute("width", this.width);
                    	ctx.mask.setAttribute("height", this.height);
                    }
                    if (ctx.fillImage){
                        var result = Est.imageCrop(this.naturalWidth, this.naturalHeight, this.width, this.height, true);
                        //e.resizeCanvas(e.background, e.width, e.height), 
                        Est.drawImage({
                            context2D: ctx.maskCtx,
                            canvas : ctx.mask,
                            image : this,
                            desx : result.marginLeft,
                            desy :  result.marginTop,
                            desw : result.width,
                            desh : result.height
                        });
                    } else{
                        ctx.maskCtx.drawImage(this,ctx.marginLeft, ctx.marginTop, this.width, this.height);
                    }
                    var t = 50, n = $("#ca-tips").val(), i = ctx.maskCtx.createLinearGradient(0, 0, this.width, 0);
                    i.addColorStop("0", "#fff");
                    i.addColorStop("1.0", "#000");
                    if(ctx.vail){
                        ctx.maskCtx.font = "Bold " + t + "px Arial";
                        ctx.maskCtx.textAlign = "left";
                        ctx.maskCtx.fillStyle = i;
                        ctx.maskCtx.fillText(n, ctx.width / 2 - ctx.maskCtx.measureText(n).width / 2, 100);
                        ctx.maskCtx.globalAlpha = 1;
                    }
                    ctx.maskCtx.globalCompositeOperation = "destination-out";
                    ctx.success.call(ctx);
                }, image.src = this.cover
            }

        },
        init: function(target, lotteryType) {
            var style1 = {style: "position:"+this.position+";left:" + this.left + "px;top:" + this.top + "px;width:"+this.width+"px;height:"+this.height+"px;background-color:transparent;"};
            var style2 = {style: "position:"+this.position+";left:"+ this.left + "px;top:" + this.top + "px;width:"+this.width+"px;height:"+this.height+"px;background-color:transparent;"};
            if (target){
                this.lottery = target;
                this.lottery.width = this.width;
                this.lottery.height = this.height;
                this.lotteryType = lotteryType || "image";
                this.vail = !0;
            }
            if (this.vail){
                this.background = this.background || this.createElement("canvas", style1);
            }
            this.mask = this.mask || this.createElement("canvas", style2);
            this.mask.style.zIndex = this.zIndex;
            if (!this.conNode.innerHTML.replace(/[\w\W]| /g, "")){
                this.vail && this.conNode.appendChild(this.background);
                this.conNode.appendChild(this.mask);
                if (this.shaveable){
                    this.bindEvent();
                }
            }
            this.vail && (console.log(14),this.backCtx = this.backCtx || this.background.getContext("2d"));
            this.maskCtx = this.maskCtx || this.mask.getContext("2d");
            this.vail ? this.drawMask() : this.drawMask();
        }
    }

    if (window.jQuery || window.Zepto) {
        (function($){
            $.fn.drawcavans = function(opts){
                return this.each(function(){
                    $(this).data('drawcanvas', new DrawCanvans(this, opts).init());
                });
            }
        })(window.jQuery || window.Zepto)
    }
})(jQuery);