/**
 * @description 编辑样式及右键菜单
 * @author wyj on 14/5/5
 */
var picDialog;
var openPicDialog = function(url){
    picDialog = art.dialog.open(url,{
        title : '选择图片'
    });
}
var CssUtils = {
    /**
     * @description 获取当前元素的css选择符，规则：父模块的ID值 + 当前元素的ID值 > class值
     * @param {Element} target 目标元素
     * @param {String} parentClass 父模块class选择符
     * @returns {string} 返回当前元素的选择符
     * @author wyj on 14/5/5
     * @example
     *     CssUtils.getSelector(document.getElementById('a', 'moveChild'));
     */
    getSelector : function(target, parentClass){
        var selector = "";
        var isModule = $(target).hasClass(parentClass);
        var id = $(target).attr("id");
        var className = $(target).attr("class");
        if (id.length > 0){
            selector ="#" + id;
        } else if(className.length > 0){
            selector = "."+ $.trim(className).split(" ")[0];
        } else{
            selector = CssUtils.getTagName(target);
            selector = arguments.callee(target.parentNode) + " " + selector;
        }
        return isModule ?  selector : '#' + $(target).parents('.moveChild:first').attr('id') + ' ' + selector;
    },
    getTagName : function(target){
        return target.tagName.toLowerCase();
    }
};
var WebUtils = {
    /**
     * @description 虚线框
     * @method dashedFrame
     * @param {Element/jQuery} target 目标元素
     * @author wyj on 14/5/5
     * @example
     *     WebUtils.dashedFrame(document.getElementById('aaa'));
     */
    dashedFrame: function (target) {
        if (!window.$dashFrame) {
            window.$dashedFrameLeft = $("<div id='dashedFrameLeft' style='display:none;border:#2b73ba 1px dashed;background:#fff;font-size:0;overflow:hidden;zoom:1;position:absolute;z-index:400;'>&nbsp;</div>");
            window.$dashedFrameTop = $("<div id='dashedFrameTop' style='display:none;border:#2b73ba 1px dashed;font-size:0;background:#fff;overflow:hidden;zoom:1;position:absolute;z-index:400;'>&nbsp;</div>");
            window.$dashedFrameRight = $("<div id='dashedFrameRight' style='display:none;border:#2b73ba 1px dashed;font-size:0;background:#fff;overflow:hidden;zoom:1;position:absolute;z-index:400;'>&nbsp;</div>");
            window.$dashedFrameBottom = $("<div id='dashedFrameBottom' style='display:none;border:#2b73ba 1px dashed;font-size:0;background:#fff;overflow:hidden;zoom:1;position:absolute;z-index:400;'>&nbsp;</div>");
            $('body').append(window.$dashedFrameLeft); $('body').append(window.$dashedFrameTop); $('body').append(window.$dashedFrameRight);$('body').append(window.$dashedFrameBottom);
            window.$dashFrame = true;
        }
        var w = $(target).outerWidth(), h = $(target).outerHeight(), offset = $(target).offset();
        window.$dashedFrameLeft.css({left: offset.left, top: offset.top, width: 0, height: h}).show();
        window.$dashedFrameTop.css({left: offset.left, top: offset.top, width: w, height: 0}).show();
        window.$dashedFrameRight.css({left: (offset.left + w), top: offset.top, width: 0, height: h}).show();
        window.$dashedFrameBottom.css({left: offset.left, top: (offset.top + h), width: w, height: 0}).show();
    }
}
//服务器数据
var laytheme = {
    style : {
        groupStyle : ''
    }
}
var sEditFn = function(target){
    var isModule = $(target).hasClass('moveChild');
    var selector = CssUtils.getSelector(target, 'moveChild');
    var moduleId = isModule ? $(target).attr('id') : $(target).parents('.moveChild:first').attr('id');
    dialog({
        title: '设置样式',
        url: '../index.html',
        width:750,
        height:333,
        padding:0,
        oniframeload: function(){
            var iframe = this.iframeNode.contentWindow;
            var result =  '[{"append" : "","css" : "'+laytheme.style['groupStyle']+'","enterpriseId" : "","javascript" : "","moduleId" : "","pictures" : "","styleId" : "","type" : "02"} ]';
            iframe.seditor.start(moduleId, selector, result);
        },
        onshow: function(){

        },
        onclose: function(){
            var iframe_page = this.iframeNode.contentWindow;
            var data = iframe_page.seditor.getStyle();
            laytheme.style['groupStyle'] = data.css;
            $("#result-div").html(data.css);
        }
    }).show(target);
}
var contextMenuItem = {
    'hunk_navigator_two' : {
        'sEdit' : function(target){
            sEditFn(target);
        }
    }
}
$(function(){
    $('.sEdit').each(function(){
        var ctx = $(this);
        var dataPiece = ctx.parents('.moveChild:first').attr('data-piece');
        ctx.contextMenu('moduleMenu',{
            target : ctx,
            bindings:contextMenuItem[dataPiece]
        });
        ctx.hover(function(){
            WebUtils.dashedFrame($(this));
        });
    });
});