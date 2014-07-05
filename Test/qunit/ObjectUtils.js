/**
 * @description ArrayUtils
 * @namespace ArrayUtils
 * @author yongjin on 2014/6/18
 */
QUnit.module( "【ObjectUtils】" );

QUnit.test("Est.pick", function(assert){
    var object1 = {name:'a', sort: '1', sId: '000002'};
    var object2 = Est.pick(object1, ['name', 'sort']);
    var object3 = {name:'a', sort:'1'};
    assert.deepEqual(object2, object3, "{name:'a', sort: '1', sId: '000002'} => {name:'a', sort:'1'}");
})

QUnit.test("Est.inherit", function(assert){
    var target = {x: 'dont change me'};
    var newObject = Est.inherit(target);

    assert.equal(newObject.x, target.x , "newObject inherit from target!");
});

QUnit.test("Est.typeOf", function(assert){
    var obj = {};
    var type = Est.typeOf(obj);
    assert.equal(type, 'object', 'passed!');
});

QUnit.test("Est.hasKey", function(assert){
    var obj = {
        name: 1
    };
    var has = Est.hasKey(obj, 'name');
    assert.equal(has, true, 'passed!');
});

QUnit.test("Est.hashKey", function(assert){
    var obj = {};
    var value = Est.hashKey(obj);
    assert.equal(value, 'object:003', "passed!");
});

QUnit.test("Est.isEmpty", function(assert){
    var obj = {};
    var result = Est.isEmpty(obj);
    assert.ok(result, "passed!");
    var list = [];
    var result2 = Est.isEmpty(list);
    assert.ok(result2, "passed!");
    var str = '';
    var result3 = Est.isEmpty(str);
    assert.ok(result3, "passed!");
    var fn = function(){}
    var result4 = Est.isEmpty(fn);
    assert.ok(result4, "passed!");
    var obj1 = {name:1};
    var result5 = Est.isEmpty(obj1);
    assert.ok(!result5, "passed!");
});

QUnit.test("Est.define", function(assert){
    var result = 2;
    Est.define('moduleA', [], function(){
        return {
            getData: function(){
                return 1;
            }
        }
    });
    Est.define('moduleB', ['moduleA'], function(moduleA){
        result = moduleA.getData();
        return {
            getResult : function(){
                return result;
            }
        }
    });
    Est.define('moduleC', ['moduleB', 'Est'], function(mod, utils){
        var result = utils.pad(mod.getResult(), 5, '0', false);
        console.log(result);
    });
    Est.use('moduleC');
    assert.equal(result, 1, 'passed!');
});

QUnit.test('Est.pluck', function(assert){
    var characters = [
        { 'name': 'barney', 'age': 36 },
        { 'name': 'fred',   'age': 40 }
    ];
    var result = Est.pluck(characters, 'name');
    assert.deepEqual(result, [ "barney", "fred" ], 'passed!');
});