var audio;
var lotterySort = 0;
var lotteryInfo = "";
var clickType = (('ontouchend' in window)) ? 'touchend' : 'click';

/* ========================= 音乐 ===============================================================*/
var initAudio = function() {
	audio = document.getElementById('audio');
	if (Est.isEmpty(data) || Est.isEmpty(data.music)) {
		$("#musicWrap").hide();
	} else if (audio){
		muted('firefox', audio, true);
	}
}

function muted(id, obj, play) {
    var play = Est.typeOf(play) === 'undefined' ? true : play;
    if (audio && audio.muted && play) {
        // 播放音乐
        audio.muted = false;
        audio.play();
        var $parent = $("#" + id); 
        if (!$parent.hasClass("on"))
        $parent.find(".btn_music").addClass("on");
        $(obj).find(".move").html("");
    } else {
        // 关闭音乐
        audio.muted = true;
        audio.pause();
        $("#" + id).find(".btn_music").removeClass("on");
        $(obj).find(".move").html("");
    }
}

$(function() {
    initAudio();
    $("#musicWrap").click(function() {
        var ctx = this;
        muted('musicWrap', ctx);
    });
});
var video_on = false;

/* ========================= 视频 ===============================================================*/
/**
 * @description 显示视频 
 * @method showVideo
 * @param obj
 * @returns {Boolean}
 * @author wyj on 14.9.30
 */
function showVideo(obj) {
	var $parent = $(obj).parents(".video-con:first");
	var $video = $parent.find("video").get(0);
	$parent.addClass("video-cover");
	$parent.find(".img").hide();
	$parent.find(".video-hide").removeClass("video-hide");
	if (data.music && !Est.isEmpty(data.music.path))
		muted('firefox', $("#musicWrap").get(0), false);
	$video.play();
	$parent.click(function() {
		// closeVideo(this);
	});
	video_on = true;
	return false;
}
/**
 * @description 关闭视频
 * @method closeVideo
 * @param obj
 * @returns {Boolean}
 * @author wyj on 14.9.30
 */
function closeVideo(obj) {
	var $parent = $(obj).parents(".video-con:first");
	$parent.removeClass("video-cover");
	$parent.find(".img").show();
	$parent.find(".video").addClass("video-hide");
	$(obj).find("video").get(0).pause();
	video_on = true;
	return false;
}
/**
 * @description 关闭视频遮罩
 * @method removeCover
 * @param {Element} obj
 * @author wyj on 14.9.30 
 */
function removeCover(obj) {
	if (video_on) {
		// $(obj).removeClass("video-cover");
	}
	return false;
}

/* ========================= 图片上传 ===========================================================*/
/**
 * @description 设置图片预浏览
 * @method setImagePreview
 * @param obj
 * @param id
 * @author wyj on 14.9.30
 */
function setImagePreview(obj, id) {
	$(obj).parent("form").addClass("isUpdate");
	Est.imagePreview({
		inputFile : obj,
		imgNode : $("#" + id).get(0)
	})
}

/**
 * @description 图片上传
 * @method doUpload
 * @param wyId
 * @param mobile
 * @returns {Boolean}
 * @author wyj on 14.9.30
 */
function doUpload(wyId, mobile) {
	$(".form-01").each(function() {
		if (!$(this).hasClass("isUpdate"))
			return;
		updateImgCount += 1;
		$(this).find('input[name=wyId]').val(wyId);
		$(this).find('input[name=mobile]').val(mobile);
		var obj = $(this);
		setTimeout(function() {
			obj.ajaxSubmit({
				type : "post",
				async : true,
				success : function(responseText, statusText, xhr, $form) { },
				error : function(result) {
					alert(result);
				}
			})
		}, 0)
	});
	return false;
}
function getObjectURL(file) {
	var url = null;
	if (window.createObjectURL != undefined) { // basic
		url = window.createObjectURL(file);
	} else if (window.URL != undefined) { // mozilla(firefox)
		url = window.URL.createObjectURL(file);
	} else if (window.webkitURL != undefined) { // webkit or chrome
		url = window.webkitURL.createObjectURL(file);
	}
	return url;
}
/* ============================================= 转发  =============================================== */
function pshow() {
	var x = $("body").width() - 40;
	var y = $("body").height() - 40;
	document.cookie = "url_cookie" + "=" + escape("?arg=" + _arg) + ";";
	location.href = "http://"+appdomain+"/wwy/forwarding?arg=" + _arg;
	if ($(".form-01").size() == 0 && Est.isEmpty(canvasSrc)) {
		location.href = "http://"+appdomain+"/wwy/forwarding?arg=" + _arg;
	} else {
		popWin.showWin(x, y, title + "_转发页面",
				"http://"+appdomain+"/wwy/forwarding?arg=" + _arg);
	}
}


function forwarding(url) {
	document.cookie = "url_cookie" + "=" + escape("?arg=" + arg) + ";";
	location.href = url;
}
function validateCellPhone(cellphone) {
	var regBox = {
		regEmail : /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,// 邮箱
		regMobile : /^0?1[3|4|5|8][0-9]\d{8}$/,
		regTel : /^0[\d]{2,3}-[\d]{7,8}$/
	}
	var mflag = regBox.regMobile.test(cellphone);
	if (!(mflag)) {
		return false;
	} else {
		return true;
	}
}


/* ============================================= 抽奖 ============================================= */

/**
 * @description 生成奖品
 * @method insertLottery
 * @param {String} wwyId
 * @param {String} mobile
 * @return
 * @authro wyj on 14.9.27
 */
var insertLottery = function(_wwyId, mobile){
	$.ajax({
		type: 'post', 
		url: '/wwy/insertLottery',
		data:{
			id: _wwyId,
			mobile: mobile
		},
		success: function(result){
			top && top.getLottery && top.getLottery(mobile, result);
		}
	});
}


/**
 * @description 抽奖前准备
 * @method beforeLottery
 * @param {Element} obj 绑定的元素
 * @returns {Boolean}
 * @author wyj on 14.9.29
 */
function beforeLottery(obj){
	if (isShare) return true;
	return Est.isEmpty(_mobile) ? enterMobileDialog(obj) : toShareWwyDialog(obj);
}


/**
 * @description 处理奖品获取结果
 * @method resolveResult
 * @param {String} result
 * @param result
 * @author wyj on 14.9.27
 */
function resolveResult(result){
	var data = $.parseJSON(Est.unescapeHTML(result));
	lotterySort = data.sort;
	lotteryInfo = data.info;
	lotyId = data.lotyId;
	drawText($('#lottery_gg'),lotteryInfo, ga_width, ga_height, ga_left, ga_top);
    console.log(data);
    isShare = true;
}

/**
 * @description 抽奖微信绑定
 * @method bindWeixinJSBridge
 * @param result
 * @author wyj on 14.9/30
 */
function bindWeixinJSBridge(result){
	var f_url = 'http://'+appdomain+'/wwy/info?arg='+result.split(";")[0];
	var u = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+appid+'&redirect_uri='+f_url+'&response_type=code&scope=snsapi_base&state=0#wechat_redirect';
	try{
		if (typeof WeixinJSBridge !== 'undefined'){
			WeixinJSBridge.on('menu:share:appmessage', function(argv){
				WeixinJSBridge.invoke('sendAppMessage',{
					"link":u,
					"img_url":sharepic,
					"desc":sharedesc,
					"title":sharetitle
				}, function(res) {
					if (res.err_msg === 'send_app_msg:ok') isShare = true;
		            if (isShare && ltyType){
		            	insertLottery(_wwyId, _mobile);
		            	$("#share-div").remove();
		            } else alert('分享未成功！错误代码：' + res.err_msg);
				})
			});
			WeixinJSBridge.on('menu:share:timeline', function(argv){
				WeixinJSBridge.invoke('shareTimeline',{
					"link":u,
					"img_url":sharepic,
					"desc":sharedesc,
					"title":sharetitle
					}, function(res) {
						if (res.err_msg === 'share_timeline:ok') isShare = true;
						if (isShare && ltyType){
			            	insertLottery(_wwyId, _mobile);
			            	$("#share-div").remove();
			            } else alert("分享未成功！错误代码：" + res.err_msg);
					})
			});
		}
	} catch(e){
		console.error("pc端无微信接口！");
	}
}

/**
 * 获取抽奖信息 [当存在_mobile 且isShare为true时才生效]
 * @method getLottery
 * @param {String} mobile
 * @return {[type]} [description]
 * @author wyj on 14.9.26
 */
function getLottery(mobile, result){
	var _mobile = mobile || _mobile;
	if (!Est.isEmpty(result)){
		result !== '00' ? resolveResult(result) : isShare = false;
	} else{
		$.ajax({
			type: 'post', 
			url: '/wwy/getLottery',
			async: false,
			data:{
				id: _wwyId,
				mobile: _mobile
			},
			success: function(result){
				result !== '00' ? resolveResult(result) : isShare = false;
			}
		});
	}
}

/**
 * 绘制中奖信息
 * @method drawText
 * @param  {String} text   中奖文字
 * @param  {number} width  画布宽度
 * @param  {number} height 画布高度
 * @param  {number} left   距离左
 * @param  {number} top    距离上
 * @author wyj on 14.9.26
 */
function drawText(selecter, text, width, height, left, top){
    if (Est.isEmpty(_mobile)) return;
    $(selecter).drawcanvas({ 
    	coverType: 'text', 
    	cover: text, 
    	fontSize: 12, 
    	lineWidth: 20, 
    	fillImage: true, 
    	width: width, 
    	height: height, 
    	left: left, 
    	top: top, 
    	shaveable: false, 
    	position: 'absolute', 
    	zIndex: 98, 
    	callback: function(percent){ }, success: function(){ } });
}

/**
 * @description 中奖列表
 * @method drawLotteryList
 * @author wyj on 14.9.27
 */
function drawLotteryList(){
	var tpl = "<li>恭喜#{mobile}获得了<span style=\"color: #e12e60\">#{lotyName}</span></li>";	
	var $lotteryItemUl = $(".lottery-item-ul");
	$lotteryItemUl.empty();
	$.ajax({
		type: 'post', 
		url: '/wwy/getLotteryList',
		data:{
			id: _wwyId
		},
		success: function(result){
			var list = $.parseJSON(result);
			Est.each(list, function(item){
				item.mobile = item.mobile.replace( /(\d{3})\d{4}(\d{4})/g, '$1****$2');
				$lotteryItemUl.append($(Est.format(tpl, item)));
			});
			$lotteryItemUl.show();
		}
	});
}

/**
 * @description 显示中奖规则
 * @method drawLotteryRule
 * @author wyj on 14.10.9
 */
function drawLotteryRule(){
	var tpl = "<li>#{level}：#{name}</li>";	
	var $lotteryItemUl = $(".lty-rule .lty-rule-ul");
	$lotteryItemUl.empty();
	Est.each(ltyRule.lotteryRule.slice(0, ltyRule.lotteryRule.length -1), function(item){
		$lotteryItemUl.append(Est.format(tpl, item));
	});
}

/**
 * @description 禁止抽奖
 * @method disableLottery
 * @author wyj on 14.9.27
 */
function disableLottery(){
	isShare = false;
	lotyId = null;
}

/**
 * @description 输入手机号码对话框
 * @method enterMobileDialog
 * @param {Element} target
 * @return {Boolean} true/false
 * @author wyj on 14.9.29
 */
function enterMobileDialog(target){
	// 若已分享 或已存在该对话框， 则返回
	if (isShare || $("#enter-mobile-div").size() > 0) return;
	var $tip; // 提示信息
	var pos;
	var tpl = "<div id='enter-mobile-div' class='dialog' style=''>"+
			"<div class=\"content\">"+
			"<span>请输入您的手机号码：</span>"+
			"<input name='mobile' type='number' class=\"text\" value='#{mobile}'></input><br>"+
			"<input name='submit' class=\"btn\" type='button' value='确定'></input>"+
			"<input name='cancel' class=\"btn\" type='button' value='关闭'></input>"+
			"</div>"+
		"</div>";
	var mobile = "";
	var $mobileDia = $(Est.format(tpl, {mobile: _mobile}));
	// 数字框事件绑定
	$("input[name=mobile]", $mobileDia).on("click", function(){
		if ($tip) $tip.remove();
	});
	// 确定按钮
	$("input[name=submit]", $mobileDia).on("click", function(){
		$tip = $("<div class='errTip' style='color:red;'>您输入的电话号码有误</div>");	
		var joinResult = "";
		var mobile = $.trim($(this).parents("#enter-mobile-div:first").find("input[name=mobile]").val());
		if (!Est.validation(mobile, 'cellphone')){
			if ($mobileDia.has(".errTip").size() == 0) $(this).before($tip);
			return;
		} else{
			$tip.remove();
		}
		_mobile = mobile;
		// 在服务器中生成页面
		$.ajax({
			url:"/wwy/join",
			async: true,
			data:{ mobile:_mobile, arg:_arg },
			success:function(result){
				joinResult = result;
			}
		});
		setTimeout(function(){
			joinResult = Est.isEmpty(joinResult) ? _arg : joinResult;
			bindWeixinJSBridge(joinResult);
		}, 2000);
		$mobileDia.remove();
		toShareWwyDialog();
	});
	// 取消按钮
	$("input[name=cancel]", $mobileDia).on("click", function(e){
		e.preventDefault();
		$mobileDia.remove();
	});
	$("body").append($mobileDia);
	pos =  Est.center($(window).width(), $(window).height(), $mobileDia.width(), $mobileDia.height());
	$mobileDia.css({
		left: pos.left,
		top: '20%'
	});
	// 进行抽奖
	if (!Est.isEmpty(_mobile)){
		getLottery(_mobile);
	}
	setTimeout(function(){}, 1000);
}

/**
 * @description 提示分享对话框
 * @method toShareWwyDialog
 * @param {Element} target
 * @return {Boolean} true/false
 * @author wyj on 14.9.29
 */
function toShareWwyDialog(target){
	// 若已分享 或已存在该对话框， 则返回
	if (isShare || $("#share-div").size() > 0) return;
	var $modal, pos;
	var tpl = "<div id='share-div' class=\"dialog\">"+
	"<div class=\"content\">"+
		"请点击右上角的分享按钮："+
		"<div><img height=\"25\" style=\"float:left;margin-right:5px;\" src=\"/wwy/theme1/image/ico1.jpg\" /><img height=\"25\" style=\"float:left;margin-right:5px;\" src=\"/wwy/theme1/image/ico2.jpg\" /><img  height=\"25\" style=\"float:left;margin-right:5px;\" src=\"/wwy/theme1/image/ico3.jpg\" /></div>"+
		"<div class=\"\" style=\"clear:both;\">分享你的专属页面， 分享后即可进行抽奖;<br> 每分享一个人即可获取一次抽奖机会</div>"+
		"</div>"+
	"</div>";
	$modal = $(tpl);
	$("body").append($modal);
	pos =  Est.center($(window).width(), $(window).height(), $modal.width(), $modal.height());
	$modal.css({
		left: pos.left,
		top: '20%'
	});
}

// 刮刮卡抽奖
if (ltyType === '1'){
    var image = ltyRule.lotteryImage;
    $(".zf_button").hide();
    $('#lottery_gg').drawcanvas({
        coverType: 'image',
        cover: image,
        lineWidth: 15,
        fillImage: false,
        shaveable: true,
        cbdelay: 0,
        position:'absolute',
        left: ga_left,
        top: ga_top,
        zIndex: 99,
        beforeCallback: function(){
        	if(!beforeLottery($('#lottery_gg').get(0))) return false;
        	return true;
        },
        callback: function(percent){
            if(percent > 50 && isShare){
            	if (lotyId){
					drawLotteryList();
				}
            	drawLotteryList();
            }
        },
        success: function(){
        	ga_width = parseInt(this.mask.getAttribute("width"), 10);
        	ga_height = parseInt(this.mask.getAttribute("height"), 10);
            $(this.conNode).addClass('show').on('webkitTransitionEnd', function(){ });
        }
    });
    drawLotteryList();
    drawLotteryRule();
}



// 转盘
/**
 * @desciption 画扇形
 * @method drawSector
 * @param {Canvas} canvas canvas对象
 * @param {Number} left x坐标
 * @param {Number} top y坐标
 * @param {Number} radius 半径
 * @param {Number} sdeg 起始角
 * @param {Number} edeg 终止角
 * @param {Number} color 颜色
 * @param {Number} opacity 透明度
 * @author wyj on 13.10.7
 */
function drawSector(canvas, left, top, radius, sdeg, edeg, color, opacity){
	Canvas.drawSector(canvas,  left, top, radius, sdeg, edeg, {
        before : function(){},
        after: function(ctx){
       	 ctx.globalAlpha = opacity;
       	 ctx.fillStyle = color;
       	 ctx.fill();
        }
	});
}


/**
 * @description 在圆周围画文字
 * @method drawCircleText
 * @param {Canvas} sector 画布对象
 * @param {Number} radius 半径
 * @param {Number} inner_width 最外环宽度
 * @param {Number} len 奖品个数
 * @param {Number} deg 角度
 * @param {Number} i 当前第几个
 * @param {String} name 奖品名称
 * @author wyj on 14.10.9
 */
function drawCircleText(sector, radius, inner_width, len, deg, i, name){
	var pic_w = Math.PI * (radius - inner_width) / len;
	var deg_t = i * deg + 90;
	var degree = deg_t - 360> 360 ? deg_t - 360 : deg_t;
	var location = Canvas.getCircleLocation(radius, radius, (radius - inner_width) * 0.9, degree);
	var ctx = sector.getContext('2d');
	var rotateDeg = deg * i + 90;
	rotateDeg = Canvas.getDegreeByCircle(rotateDeg, deg, i);
	ctx.save();
	ctx.beginPath();
	ctx.fillStyle = "#444";
	ctx.font="12px Arial";
	var numWidth = ctx.measureText(name).width;
	ctx.translate(location.x, location.y);
	ctx.rotate(-rotateDeg * Math.PI/180);
	ctx.fillText(name, -numWidth / 2 , 6 );
    ctx.restore();
}
/**
 * @description 画转盘上的图片
 * @method drawImage
 * @param {Number} radius 图片到圆心的半径长
 * @param {Number} inner_width 最外环宽度
 * @param {Number} len 奖品个数
 * @param {Number} deg 角度
 * @param {Number} i 当前第几个
 * @param {Number} src 图片地址
 * @author wyj on 14.10.9
 */
function drawImage(radius, inner_width, len, deg, i, src){
	var pic_w = Math.PI * (radius - inner_width) * 0.6 / len;
	var deg_t = i * deg + 90;
	var degree = deg_t - 360> 360 ? deg_t - 360 : deg_t;
	var location = Canvas.getCircleLocation(radius, radius, (radius - inner_width) * 0.8 / 2 + 70 * 0.3, degree);
	var style = {
		style: "position:absolute;;left:"+ (location.x - pic_w / 2) + "px;top:" + (location.y - pic_w / 2) + "px;background-color:transparent;z-index:98;",
		width: pic_w,
		height: pic_w,
		sort: i
	};
	var canvas = Canvas.createElement("canvas", style);
	$(".rotate .rotate-bg").append($(canvas));
	var image = new Image();
	image.onload = function(){
		var result = Est.imageCrop(this.naturalWidth, this.naturalHeight, pic_w, pic_w, true);
		Canvas.drawImage({
			canvas: canvas,
			image: image,
			desx: result.marginLeft,
			desy: result.marginTop,
			desw: result.width,
			desh: result.height,
			opacity: 0.85
		});
	}
	image.src = src;
}


if (ltyType === '2'){
	$(".zf_button").hide();
	$(".rotate-bg img:first").attr("src", ltyRule.lotteryImage);
	var rules = ltyRule.lotteryRule;
	var len = rules.length;
	var deg = Math.round(360 / len);
	
	if (ltyRule.customImage !== '01'){
		var colors = ['#FECB03', '#2FB753', '#6B3983', '#DE47CD', '#A33EE5', '#2E9CD9', '#E73EAA', '#2FB753', '#FECB03', '#6B3983', '#A33EE5', '#DE47CD', '#2E9CD9', '#E73EAA'];
		var $rotateBg = $(".rotate .rotate-bg");
		var width = $rotateBg.width();
		var radius = width / 2;
		var inner_width = 9;
		var color = null;
		var step = 0;
		
		var $sector = $("<canvas id='sector'></canvas>");
		$sector.attr({"width": width, "height": width});
		$sector.css({ position:'absolute', left: 0, top: 0, 'z-index': 97});
		$rotateBg.append($sector);
		
		// 画扇形
		var sector = $sector.get(0);
		drawSector(sector,  radius, radius, radius - inner_width, 0, 360, '#fff', 1);
		for (var i = 0; i < len; i++){
			color = i % 2 === 0 ? '#e6e4db' : colors[Math.ceil(i / 2)];
			drawSector(sector,  radius, radius, radius - inner_width, i * deg + 90 - deg / 2, (i +1) * deg + 90 - deg / 2, color, 0.6);
			drawSector(sector,  radius, radius, (radius - inner_width) * 0.8, i * deg + 90 - deg / 2, (i +1) * deg + 90 - deg / 2, color, 0.75);
			drawSector(sector,  radius, radius, (radius - inner_width) * 0.75, i * deg + 90 - deg / 2, (i +1) * deg + 90 - deg / 2, color, 1);
		}
		Est.each(rules, function(item, i){
			// 奖品图片
			drawImage(radius, inner_width, len, deg,i + 1, item.pic);
			// 奖品名称
			drawCircleText(sector, radius, inner_width, len, deg, i + 1, item.name);
		});
	}
	
	$(".rotate-start").bind(clickType, function(event){
		event.stopPropagation(); event.preventDefault();
		//shared('13588506961');
		if(!beforeLottery($('.rotate-start').get(0))) return false;
		if (!Est.isEmpty(_mobile) && isShare){
			var _deg = deg * lotterySort;
			$("#J_startBtn").stopRotate(), $("#J_startBtn").rotate({
				angle: 0,
				duration: 4e3,
				animateTo: _deg + 5400,
				callback: function() {
					var dialogTpl = "<div id='okDialog' class='dialog'><div class=\"content\">#{info}<br><input name='ok' class=\"ok btn\" type='button' value='确定'></input></div></div>";
					if (lotyId) drawLotteryList();
					disableLottery();
					lotterySort = len;
					var $node = $(Est.format(dialogTpl, {
						info: lotteryInfo
					}));
					$node.find(".ok").click(function(){
						$(this).parents(".dialog:first").remove();
					});
					$("body").append($node);
					$node.css(Est.center($(window).width(), $(window).height(), $node.width(), $node.height()));
					//alert(lotteryInfo);
				}
			})
		} else{
			alert("请先转发并发享， 再抽奖"); return false;
		}
	});
	drawLotteryList();
}
if (ltyType === '3'){
	$(".zf_button").hide();
	var image = ltyRule.lotteryImage;
    $('#lottery_swing').drawcanvas({
        coverType: 'image',
        cover: image,
        shaveable: false,
        fillImage: true,
        width: ga_width,
        height: ga_height,
        position:'absolute',
        left: swing_left,
        top:swing_top,
        zIndex: 99,
        success: function(){
            $(this.conNode).addClass('show');
            if (window.DeviceMotionEvent) {
            	var speed = 25;
            	var x = y = z = lastX = lastY = lastZ = 0;
            	window.addEventListener('devicemotion', function(){
            		
            		var acceleration =event.accelerationIncludingGravity;
            		x = acceleration.x;
            		y = acceleration.y;
            		if(Math.abs(x-lastX) > speed || Math.abs(y-lastY) > speed) {
            			if(!beforeLottery($("#lottery_swing").get(0))) return false;
            			if (!isShare){
                    		alert("请先转发并发享， 再摇奖");
                    	} else{
                    		// 显示抽奖结果
                			//drawText($('#lottery_swing'), lotteryInfo, ga_width, ga_height, 0, 0);
                			alert(lotteryInfo);
                			if (lotyId){
        						drawLotteryList();
        					}
                			disableLottery();
                    	}
            		}
            		lastX = x;
            		lastY = y;
            	}, false);
            }
        }
    });
    drawLotteryList();
    drawLotteryRule();
}

/**
 * 模拟分享按钮
 * @param mobile
 */
function shared(mobile){
	_mobile = mobile, isShare = true, insertLottery(_wwyId, _mobile);
	$("#share-div").remove();
	return true;
}

/* ==================================================== 隐藏选项 ================================================ */

// 隐藏分享
if (data && data.hidShare) {
	$("#section19").insertAfter($("#fullpage")).hide();
}

// 隐藏转发
if (data && data.hidZf) {
	$("#section21").insertAfter($("#fullpage")).hide();
}

/* ===================================================== 刮刮卡 ================================================= */
canvasSrc = $("#lottery").attr("data-src");
var canvas = null;
var context2D = null;
var width = 0;
var height = 0;

/**
 * 获取屏幕尺寸
 * @method getClientSize
 * @author wyj on 14.9.16
 */
function getClientSize(){
    var height_o = "innerHeight" in window ? window.innerHeight: document.documentElement.offsetHeight;
    var width_o = "innerWidth" in window ? window.innerWidth : document.documentElement.offsetWidth;
    height = Math.max($(window).height(), height_o);
    width = Math.max($(window).width(), width_o);
}
getClientSize();

// 首屏刮刮卡
if (!Est.isEmpty(canvasSrc)) {
	/*canvas = document.getElementById("canvas");
	context2D = canvas.getContext("2d");*/
	var array_paint = [];
	// 刮开层使用图片
	getClientSize();

    $('#lottery').drawcanvas({
        coverType: 'image',
        cover: "/wwy/img/" + canvasSrc,
        lineWidth: 20,
        fillImage: true,
        width: width,
        height: height,
        shaveable: true,
        cbdelay:10,
        zIndex: 9999999,
        callback: function(percent){
            console.log(percent);
            if(percent > 30){
            	// 刮开后加载fullpage
                $('#fullpage').fullpage({
                    scrollingSpeed : 450,
                    afterRender : function() {
                        $("#fullpage .tip").remove();
                    }
                });
                $(this).parent().removeClass('show').on('webkitTransitionEnd', function(){
                    $(this).hide();
                });
            }
        },
        success: function(){
            setTimeout(function(){
                $(".loading").remove();
            }, 1000);
            $(this.conNode).addClass('show').on('webkitTransitionEnd', function(){

            });
        }
    });
}




$(function() {
	$(".forward-btn").click(function() {
		pshow();
	});

	$("#mainMessageForm")
			.submit(
					function() {
						if ($(".title").val() == '') {
							$(".error_span").html("姓名不能为空");
							return false;
						}
						if ($(".email").length != 0 && $(".email").val() == '') {
							$(".error_span").html("邮箱不能为空");
							return false;
						}
						if ($(".phone").length != 0 && $(".phone").val() == '') {
							$(".error_span").html("电话不能为空");
							return false;
						}
						if ($(".entName").length != 0
								&& $(".entName").val() == '') {
							$(".error_span").html("公司名称不能为空");
							return false;
						}
						if ($(".job").length != 0 && $(".job").val() == '') {
							$(".error_span").html("职务不能为空");
							return false;
						}
						if ($("#join_cont").length != 0
								&& $("#join_cont").val() == '') {
							$(".error_span").html("留言内容不能为空");
							return false;
						}
						if ($("#join_mobile").length != 0
								&& $("#join_mobile").val() == '') {
							$(".error_span").html('电话号码输入错误!');
							return false;
						}
						if ($("#join_mobile").length != 0
								&& $("#join_mobile").val().length < 5) {
							$(".error_span").html('电话号码输入错误!');
							return false;
						}
						$(".error_span").html("");
						$
								.ajax({
									url : "/wwy/msg/send",
									data : {
										title : $(".t_before").val(),
										name : $(".title").val() == undefined ? ''
												: $(".title").val(),
										email : $(".email").val() == undefined ? ''
												: $(".email").val(),
										phone : $(".phone").val() == undefined ? ''
												: $(".phone").val(),
										entName : $(".entName").val() == undefined ? ''
												: $(".entName").val(),
										job : $(".job").val() == undefined ? ''
												: $(".job").val(),
										mobile : $("#join_mobile").val() == undefined ? ''
												: $("#join_mobile").val(),
										content : $("#join_cont").val() == undefined ? ''
												: $("#join_cont").val(),
										wwyId : _wwyId,
										enterpriseId : enterpriseId,
										openid:openid
									},
									success : function() {
										$(".error_span").html('发送成功!');
										$('#mainMessageForm')[0].reset();
										setTimeout(function() {
											$(".error_span").html('');
										}, 3000);
									}
								})
						return false;

					})
});
$(function() {
	var _infoId = _infoId;
	var _wyId = _wwyId;
	setTimeout(function() {
		$.ajax({
			url : "/wwy/saveBySecond",
			data : {
				wyId : _wyId,
				infoId : _infoId,
				time : "5"
			}
		})
	}, 5000);
	setTimeout(function() {
		$.ajax({
			url : "/wwy/saveBySecond",
			data : {
				wyId : _wyId,
				infoId : _infoId,
				time : "10"
			}
		})
	}, 10000);
});

$(function() {
	setTimeout(function() {
		$("#fullpage .tip").remove();
	}, 3000);
	$('#image').css({
		height : height + 'px',
		width : width + 'px'
	})
	if (Est.isEmpty(canvasSrc)) {
		$('#fullpage').fullpage({
			scrollingSpeed : 450,
			afterRender : function() {
				$(".loading").remove();
				$("#fullpage .tip").remove();
			}
		});
	}
});

function orientationChange() {
	switch (window.orientation) {
	case 0: // Portrait
	case 180: // Upside-down Portrait
	// Javascript to setup Portrait view
		break;
	case -90: // Landscape: turned 90 degrees counter-clockwise
	case 90: // Landscape: turned 90 degrees clockwise
	// Javascript to steup Landscape view
		break;
	}
}
window.addEventListener("onorientationchange" in window ? "orientationchange"
		: "resize", orientationChange, false);