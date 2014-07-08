/**
 * @description main
 * @namespace main
 * @author yongjin on 2014/7/7
 */
requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        app: 'js'
    }
});


define(function (require) {
    alert('a');
});


