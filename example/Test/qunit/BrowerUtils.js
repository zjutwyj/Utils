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