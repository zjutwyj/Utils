/**
 * @description ArrayUtils
 * @namespace ArrayUtils
 * @author yongjin on 2014/6/18
 */
QUnit.module( "【UrlUtils】" );

QUnit.test("Zwt.getUrlParam", function(assert){
    var url = "http://www.zket.net?name=zjut";
    var name = Zwt.getUrlParam('name', url);
    var result = 'zjut';
    assert.equal(name, result, "passed!");
});