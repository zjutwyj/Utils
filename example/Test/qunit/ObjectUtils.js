/**
 * @description ArrayUtils
 * @namespace ArrayUtils
 * @author yongjin on 2014/6/18
 */
QUnit.module( "【ObjectUtils】" );

QUnit.test("Zwt.pick", function(assert){
    var object1 = {name:'a', sort: '1', sId: '000002'};
    var object2 = Zwt.pick(object1, ['name', 'sort']);
    var object3 = {name:'a', sort:'1'};
    assert.deepEqual(object2, object3, "{name:'a', sort: '1', sId: '000002'} => {name:'a', sort:'1'}");
})

QUnit.test("Zwt.inherit", function(assert){
    var target = {x: 'dont change me'};
    var newObject = Zwt.inherit(target);

    assert.equal(newObject.x, target.x , "newObject inherit from target!");
});