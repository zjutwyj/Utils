/**
 * @description ArrayUtils
 * @namespace ArrayUtils
 * @author yongjin on 2014/6/18
 */
QUnit.module( "【BrowerUtils】" );

QUnit.test("Est.msie", function(assert){
    var result = Est.msie();
    assert.equal(result, false, "passed!");
});
QUnit.test("Est.getUrlParam", function(assert){
    var url = "http://www.zket.net?name=zjut";
    var name = Est.getUrlParam('name', url);
    var result = 'zjut';
    assert.equal(name, result, "passed!");
});
QUnit.test("Est.urlResolve", function(assert){
    var obj = Est.urlResolve(window.location.href);
    assert.deepEqual(obj, {
        "hash": "",
        "host": "localhost:63342",
        "hostname": "localhost",
        "href": "http://localhost:63342/Utils/test/Est_qunit.html",
        "pathname": "/Utils/test/Est_qunit.html",
        "port": "63342",
        "protocol": "http",
        "search": ""
    }, "passed!");
});

QUnit.test('Est.keyRoute', function(assert){
    var piece = {
        "route1": function(data){
            return "route1" + data;
        },
        "route2": function(data){
            return "route2" + data;
        }
    }
    var result = Est.keyRoute(piece, "route2", "route");
    assert.equal(result, 'route2route', 'passed');
});