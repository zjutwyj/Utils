/**
 * @description ArrayUtils
 * @namespace ArrayUtils
 * @author yongjin on 2014/6/18
 */
QUnit.module( "【CssUtils】" );

QUnit.test("Zwt.getSelector", function(assert){
    var selector = Zwt.getSelector($('#qunit').get(0), 'moveChild', $);
    assert.equal(selector, '#wide_product #qunit', 'passed!');
});