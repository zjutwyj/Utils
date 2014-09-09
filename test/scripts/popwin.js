// 通用的弹层插件
//Power By 小新不坏
//QQ:34542928
//Blog:http://www.idboke.com
var popWin = {
    scrolling: 'yes',
    //是否显示滚动条 no,yes,auto

int: function() {
        this.mouseClose();
        this.closeMask();
        //this.mouseDown();

    },

showWin: function(width, height, title, src) {
        var iframeHeight = height - 52;
        var marginLeft = width / 2;
        var marginTop = height / 2;
        var inntHtml = '';
        inntHtml += '<div id="mask" style="width:100%; height:100%; position:fixed; top:0; left:0; z-inde:1999;background:#cccccc; filter:alpha(opacity=50); -moz-opacity:0.5; -khtml-opacity: 0.5; opacity:0.5;"></div>'
        inntHtml += '<div id="maskTop" style="width: ' + width + 'px; height: ' + height + 'px; border: #999999 1px solid; background: #fff; color: #333; position: fixed; top: 50%; left: 50%; margin-left: -' + marginLeft + 'px; margin-top: -' + marginTop + 'px; z-index: 2999; filter: progid:DXImageTransform.Microsoft.Shadow(color=#909090,direction=120,strength=4); -moz-box-shadow: 2px 2px 10px #909090; -webkit-box-shadow: 2px 2px 10px #909090; box-shadow: 2px 2px 10px #909090;">'
        inntHtml += '<div id="maskTitle" style="height: 50px; line-height: 50px; font-family: Microsoft Yahei; font-size: 100%; color: #333333; padding-left: 20px; background-image: url(/wwy/theme1/image/close.png); border-bottom: 1px solid #999999; position: relative;">'
        inntHtml += '' + title + ''
        inntHtml += '<div id="popWinClose" style="width: 28px; z-index:999999; height: 28px; cursor: pointer; position: absolute; top: 8px; right: 8px; background-image: url(/wwy/theme1/image/close.png);"></div>'
        inntHtml += '</div>'
        inntHtml += '<iframe width="' + width + '" height="' + iframeHeight + '" frameborder="0" scrolling="' + this.scrolling + '" src="' + src + '"></iframe>';

        $("body").append(inntHtml);
        this.int();


    },

mouseClose: function() {
        $("#popWinClose").on('mouseenter', 
        function() {
            $(this).css("background-image", "url(/wwy/theme1/image/close.png)");

        });

        $("#popWinClose").on('mouseleave', 
        function() {
            $(this).css("background-image", "url(/wwy/theme1/image/close.png)");

        });

    },

closeMask: function() {
        $("#popWinClose").on('click', 
        function() {
            $("#mask,#maskTop").fadeOut(function() {
                $(this).remove();

            });

        });

    }

/*mouseDown : function(){
		var dragging = false;
		var iX, iY;
		//var elmen = $("div#maskTop");
		$("#maskTop").on('mousedown' , function(e){
			dragging = true;
                iX = e.clientX - this.offsetLeft;
                iY = e.clientY - this.offsetTop;
                this.setCapture && this.setCapture();
                return false;
		});
		document.onmousemove = function(e) {
                if (dragging) {
                var e = e || window.event;
                var oX = e.clientX - iX;
                var oY = e.clientY - iY;
                $("#maskTop").css({"left":oX + "px", "top":oY + "px"});
                return false;
                }
            };
            $(document).mouseup(function(e) {
                dragging = false;
                $("#maskTop")[0].releaseCapture();
                e.cancelBubble = true;
            })
	},*/

};