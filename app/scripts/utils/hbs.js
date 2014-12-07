'use strict';
/**
 * Created by yongjin on 14-3-27.
 */
var hbs = require('koa-hbs'),
    _ = require('lodash');

/**
 * 比较
 * @author wyj
 * @time 2014-03-27
 * @example
 *      {{#compare ../page '!==' this}}danaiPageNum{{else}}active{{/compare}}
 */
Handlebars.registerHelper('compare', function (v1, operator, v2, options) {
    if (arguments.length < 3)
        throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
    try {
        switch (operator.toString()) {
            case '==':
                return (v1 == v2) ? options.fn(this) :
                    options.inverse(this);
            case '!=':
                return (v1 != v2) ? options.fn(this) :
                    options.inverse(this);
            case '===':
                return (v1 === v2) ? options.fn(this) :
                    options.inverse(this);
            case '!==':
                return (v1 !== v2) ? options.fn(this) :
                    options.inverse(this);
            case '<':
                return (v1 < v2) ? options.fn(this) :
                    options.inverse(this);
            case '<=':
                return (v1 <= v2) ? options.fn(this) :
                    options.inverse(this);
            case '>':
                return (v1 > v2) ? options.fn(this) :
                    options.inverse(this);
            case '>=':
                return (v1 >= v2) ? options.fn(this) :
                    options.inverse(this);
            case '&&':
                return (v1 && v2) ? options.fn(this) :
                    options.inverse(this);
            case '||':
                return (v1 || v2) ? options.fn(this) :
                    options.inverse(this);
            default:
                return options.inverse(this);
        }
    } catch (e) {
        console.log('【Errow】: hbs.compare v1=' + v1 + ';v2=' + v2 + e);
    }
});

/**
 * 货币单位
 * @author wyj
 * @time 2014-03-27
 */
hbs.registerHelper('decimal', function (number) {
    return formatDecimal(number);
});

/**
 * 旺铺分页
 * @author wyj
 * @time 2014-03-27
 */
hbs.registerHelper('pagination', function (page, totalPage, block) {
    var accum = '';
    var length = null;
    var page = parseInt(page, 10),
        totalPage = parseInt(totalPage, 10),
        start = 1,
        end = totalPage,
        pager_length = length || 11,    //不包next 和 prev 必须为奇数
        number_list = [];
    if ( totalPage > pager_length ){
        var offset = ( pager_length - 1) / 2;
        if (page <= offset){
            start = 1;
            end = offset * 2 - 1;
        } else if(page > totalPage - offset){
            start = totalPage - offset * 2  +2;
            end = totalPage;
        } else{
            start = page - (offset - 1);
            end = page + (offset -1);
        }
    }
    for (var i = start; i <= end; i++) {
        number_list.push(i);
    }
    for (var i = 0, len = number_list.length; i < len; i++) {
        accum += block.fn(number_list[i]);
    }
    return accum;
});

/**
 * 遍历数字
 * @author wyj
 * @time 2014-03-27
 */
hbs.registerHelper('eachNumber', function ( from, to, incr, block ) {
    var accum = '';
    if ( arguments.length == 2 ) {
        block = to;
        to = from;
        from = 0;
        incr = 1;
    }
    else if ( arguments.length == 3 ) {
        block = incr;
        incr = 1;
    }
    for ( var i = from; i <= to; i += incr ){
        accum += block.fn( i );
    }
    return accum;
});

/**
 * 时间格式化
 * @author wyj
 * @time 2014-03-27
 */
hbs.registerHelper('dateFormat', function (date, fmt, options) {
    var date = date ? new Date(date) : new Date();
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    try{
        for (var k in o){
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }catch(e){
        console.log('【Error】: hbs.dataFormat ' + e);
    }

    return fmt;
});

/**
 * 图片尺寸
 * @author wyj
 * @time 2014-03-31
 */
hbs.registerHelper('picUrl', function (src, number, opts) {
    var url = src;
    if (arguments.length < 3) {
        return number.hash.baseUrl + src || 'upload/no-pic.jpg';
    }
    if (src == null || src.length == 0){
        return "";
    }
    var url2 = url.substring(url.lastIndexOf(".") + 1, url.length);
    url = url.substring(0, url.lastIndexOf(".")) + "_" + number + "." + url2;
    return url ? (opts.hash.baseUrl + url) : '';
});

/**
 * 解码
 * @author wyj
 * @time 2014-03-27
 */
hbs.registerHelper('decodeURI', function (str, opts) {
    if (str == null || str.length == 0){
        return "";
    }
    return new hbs.handlebars.SafeString(decodeURI(str));
});

/**
 * 是否相等
 * @author wyj
 * @time 2014-03-25
 */
hbs.registerHelper('equal', function (v1, v2, options) {
    if (v1 === v2) {
        return options.fn(this);
    }
    else {
        return options.inverse(this);
    }
});

/**
 * 不相等
 * @author wyj
 * @time 2014-03-25
 */
hbs.registerHelper('notequal', function (v1, v2, options) {
    if (v1 !== v2) {
        return options.fn(this);
    }
    else {
        return options.inverse(this);
    }
});

/**
 * 判断是否是循环中的最后一行
 * @author wyj
 * @time 2014-03-25
 */
hbs.registerHelper('isLast', function (options) {
    return options.data.last;
});

/**
 * 自定义中得到下个id所在的数字
 * @author wj
 * @time 2014-03-25
 */
hbs.registerHelper('nextIdNum', function (v1, options) {
    return parseInt(v1.substring(12)) + 1;
});

/**
 * 序列化JSON对象
 * @author wyj
 * @time 2014-03-25
 */
hbs.registerHelper('json', function (obj) {
    return JSON.stringify(obj);
});

/**
 * 序列化JSON对象(去除[])
 * @author wyj
 * @time 2014-03-25
 */
hbs.registerHelper('toJSON', function (obj) {
    var str = JSON.stringify(obj);
    return str.substring(1, str.length - 1);
});

/**
 * 动态载入模板
 * @author wyj
 * @time 2014-03-26
 */
hbs.registerHelper('include', function (context, $, opts) {
    var path = context, pass_data={};
    if (opts.hash) {
        if (opts.hash.prefix) {
            path = opts.hash.prefix + path;
        }
        for (var property in opts.hash) {
            $[property] = opts.hash[property];
            pass_data.$ = $;
        }
    }
    var source = hbs.handlebars.partials[path],
        template = hbs.handlebars.compile(source + '');
    return new hbs.handlebars.SafeString(template(pass_data));
});

/**
 * 两数相加
 * @author wyj
 * @time 2014-03-27
 */
hbs.registerHelper('add', function (num1, num2, opts) {
    return parseInt(num1, 10) + parseInt(num2, 10);
});

/**
 * 旺铺高级选项分页
 * @author wyj
 * @time 2014-03-27
 */
hbs.registerHelper('pagesize', function (num) {
    return num ? num : 16;
});

/**
 * 产品详细页链接
 * @author wyj
 * @time 2014-03-27
 */
hbs.registerHelper('hpd',  function (productId, $, options) {
    try{
        if ($.maintainable) {
            return "product_detail?item_id=" + productId;
        }
        else {
            return "product-detail-" + productId.replace(/^[^1-9]+/, "") + ".html"
        }
    }catch(e){
        console.log('【Error】：hbs.registerHelper -> hpd ,page: '+ options.hash.page || 'hnd'+ '; errorDetail:' + e);
    }
});

/**
 * 新闻详细页链接
 * @author wyj
 * @time 2014-03-27
 */
hbs.registerHelper('hnd',  function (newsId,$, options) {
    try{
        if ($.maintainable) {
            return "news_detail?item_id=" + newsId;
        }
        else {
            return "news-detail-" + newsId.replace(/^[^1-9]+/, "") + ".html"
        }
    }catch(e){
        console.log('【Error】：hbs.registerHelper -> hnd ,page: '+ options.hash.page || 'hnd'+ '; errorDetail:' + e);
    }
});

/**
 * 相册详细页链接
 * @author wyj
 * @time 2014-03-27
 */
hbs.registerHelper('had',  function (albumId,$, options) {
    try{
        if ($.maintainable) {
            return "album_detail?item_id=" + albumId;
        }
        else {
            return "album-detail-" + albumId.replace(/^[^1-9]+/, "") + ".html"
        }
    }catch(e){
        console.log('【Error】：hbs.registerHelper -> had ,page: '+ options.hash.page || 'hnd'+ '; errorDetail:' + e);
    }

});

/**
 * 缩略ID值
 * @author wyj
 * @time 2014-03-27
 */
hbs.registerHelper('id2', function (id) {
    return id == null ? "" : id.replace(/^[^1-9]+/, "")
});

var empty = function (x) {
    if (!x) {
        return true;
    } else if (x == null) {
        return true;
    } else if (x == undefined) {
        return true;
    } else if (x === undefined) {
        return true;
    } else if (typeof x == 'undefined') {
        return true;
    } else if (x === '') {
        return true;
    } else if (x.length == 0) {
        return true;
    } else if (!x.length) {
        return true;
    } else {
        return false;
    }
};

/**
 * 判断是否为空
 * @author wyj
 * @time 2014-03-31
 */
hbs.registerHelper('empty', function (x, options) {
    if (empty(x)) {
        return options.fn(this);
    }
    else {
        return options.inverse(this);
    }
});

/**
 * 判断是否不为空
 * @author wyj
 * @time 2014-03-31
 */
hbs.registerHelper('notEmpty', function (x, options) {
    if (!empty(x)) {
        return options.fn(this);
    }
    else {
        return options.inverse(this);
    }
});

hbs.registerHelper('showEdit', function($, tag, options){
    return $.maintainable ? tag : '';
});

hbs.registerHelper('sEdit', function($, options){
    return $.maintainable ? 'sEdit' : '';
});

hbs.registerHelper('iEdit', function($, options){
   return $.maintainable ? 'iEdit' : ''
});

hbs.registerHelper('tEdit', function($, options){
   return $.maintainable ? 'tEdit' : '';
});

hbs.registerHelper('unescapeHTML', function(target, options){
    var target = target || '';
        return target.replace(/&amp;/mg, '&')
            .replace(/&lt;/mg, '<')
            .replace(/&gt;/mg, '>')
            .replace(/&quot;/mg, '"')
            .replace(/&#([\d]+);/mg, function($0, $1){
                return String.fromCharCode(parseInt($1, 10));
            });
});

module.exports = hbs;
