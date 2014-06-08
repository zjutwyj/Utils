/**
 * @description 页面工具集
 * @namespace WebUtils
 * @author wyj on 14/5/5
 */

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