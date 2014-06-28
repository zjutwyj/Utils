/**
 * @description ArrayUtils
 * @namespace ArrayUtils
 * @author yongjin on 2014/6/18
 */
QUnit.module( "【BrowerUtils】" );

QUnit.test("Zwt.msie", function(assert){
    var result = Zwt.msie();
    assert.equal(result, false, "passed!");
});
QUnit.test("Zwt.getUrlParam", function(assert){
    var url = "http://www.zket.net?name=zjut";
    var name = Zwt.getUrlParam('name', url);
    var result = 'zjut';
    assert.equal(name, result, "passed!");
});
QUnit.test("Zwt.urlResolve", function(assert){
    var obj = Zwt.urlResolve(window.location.href);
    assert.deepEqual(obj, {
        "hash": "",
        "host": "localhost:63342",
        "hostname": "localhost",
        "href": "http://localhost:63342/Utils/example/Test/qunit.html",
        "pathname": "/Utils/example/Test/qunit.html",
        "port": "63342",
        "protocol": "http",
        "search": ""
    }, "passed!");
});