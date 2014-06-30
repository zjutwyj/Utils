/**
 * @description ArrayUtils
 * @namespace ArrayUtils
 * @author yongjin on 2014/6/18
 */
QUnit.module( "【ImageUtils】" );


$.each($(".imageCrop"), function () {
    $(this).load(function (response, status, xhr) {
        var w = $(this).get(0).naturalWidth, h = $(this).get(0).naturalHeight;
        var width = $(this).attr("data-width"), height = $(this).attr("data-height");
        $(this).css(Est.imageCrop(w, h, width, height), 'fast');
        $(this).fadeIn('fast');
    });
});