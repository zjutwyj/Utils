/**
 * @description ArrayUtils
 * @namespace ArrayUtils
 * @author yongjin on 2014/6/18
 */
QUnit.module( "【DateUtils】" );


QUnit.test("Est.dateFormat", function(assert){
    var format = Est.dateFormat('Thu Jun 19 2014 19:47:52 GMT+0800', 'yyyy-MM-dd');
    var result = '2014-06-19';
    assert.equal(format, result, 'passed!');
});