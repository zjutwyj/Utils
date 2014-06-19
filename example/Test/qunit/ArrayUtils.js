/**
 * @description ArrayUtils
 * @namespace ArrayUtils
 * @author yongjin on 2014/6/18
 */
QUnit.module( "【ArrayUtils】" );

QUnit.test("Zwt.each(list1, function(item){console.log(item.name);})", function(assert){
    var list1 = [{name:1, sort:1},{name:2, sort:2}];
    var result = '';
    Zwt.each(list1, function(item){
        result += (item.name);
        });
    assert.equal(result, '12', "var list1 = [{name:1, sort:1},{name:2, sort:2}];Zwt.each(list1, function(item){result+=item.names;}); => 12");
});