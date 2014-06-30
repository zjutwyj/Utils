/**
 * @description ArrayUtils
 * @namespace ArrayUtils
 * @author yongjin on 2014/6/18
 */
QUnit.module( "【DomUtils】" );

QUnit.test("Est.clearAllNode", function(assert){
    Est.clearAllNode(document.getElementById("clearAllNodeDiv"));
    var size = $("#clearAllNodeDiv span").size();
    assert.equal(size,  0, 'passed!');
});
