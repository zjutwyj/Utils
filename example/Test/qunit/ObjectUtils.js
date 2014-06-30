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

QUnit.test("Zwt.typeOf", function(assert){
    var obj = {};
    var type = Zwt.typeOf(obj);
    assert.equal(type, 'object', 'passed!');
});

QUnit.test("Zwt.hasKey", function(assert){
    var obj = {
        name: 1
    };
    var has = Zwt.hasKey(obj, 'name');
    assert.equal(has, true, 'passed!');
});

QUnit.test("Zwt.hashKey", function(assert){
    var obj = {};
    var value = Zwt.hashKey(obj);
    assert.equal(value, 'object:003', "passed!");
});

QUnit.test("Zwt.isEmpty", function(assert){
    var obj = {};
    var result = Zwt.isEmpty(obj);
    assert.ok(result, "passed!");
    var list = [];
    var result2 = Zwt.isEmpty(list);
    assert.ok(result2, "passed!");
    var str = '';
    var result3 = Zwt.isEmpty(str);
    assert.ok(result3, "passed!");
    var fn = function(){}
    var result4 = Zwt.isEmpty(fn);
    assert.ok(result4, "passed!");
    var obj1 = {name:1};
    var result5 = Zwt.isEmpty(obj1);
    assert.ok(!result5, "passed!");
});

QUnit.test("Zwt.define", function(assert){
    var result = 2;
    Zwt.define('moduleA', [], function(){
        return {
            getData: function(){
                return 1;
            }
        }
    });
    Zwt.define('moduleB', ['moduleA'], function(moduleA){
        result = moduleA.getData();
        return {
            getResult : function(){
                return result;
            }
        }
    });
    Zwt.define('moduleC', ['moduleB', 'Zwt'], function(mod, utils){
        var result = utils.pad(mod.getResult(), 5, '0', false);
        console.log(result);
    });
    Zwt.use('moduleC');
    assert.equal(result, 1, 'passed!');
});