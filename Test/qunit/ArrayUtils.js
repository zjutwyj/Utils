/**
 * @description ArrayUtils
 * @namespace ArrayUtils
 * @author yongjin on 2014/6/18
 */
QUnit.module( "【ArrayUtils】" );

QUnit.test("Est.each(list1, function(item){console.log(item.name);})", function(assert){
    var list1 = [{name:1, sort:1},{name:2, sort:2}];
    var list2 = [{name:1, sort:2},{name:2, sort:3}];
    Est.each(list1, function(item){
        item.sort = item.sort + 1;
    });
    assert.deepEqual(list1, list2, "[{name:1, sort:1},{name:2, sort:2}] => [{name:1, sort:2},{name:2, sort:3}]");
});

QUnit.test("Est.arrayExchange", function(assert){
    var list1 = [{name:1, sort:1},{name:2, sort:2}];
    var list2 = [{name:2, sort:1},{name:1, sort:2}];
    Est.arrayExchange(list1, 0 , 1, {
        column : 'sort',
        callback : function(thisNode, targetNode){
        }
    });
    assert.deepEqual(list1, list2, '[{name:1, sort:1},{name:2, sort:2}] =>  [{name:2, sort:1},{name:1, sort:2}]');
});

QUnit.test("Est.arrayInsert", function(assert){
    var list1 = [{name:1, sort:1},{name:2, sort:2},{name:3, sort:3},{name:4, sort:4}];
    var list2 = [{name:1, sort:1},{name:4, sort:2},{name:2, sort:3},{name:3, sort:4}];
    Est.arrayInsert(list1, 3 , 1, {
        column : 'sort',
        callback : function(list){
        }
    });
    assert.deepEqual(list1, list2, "[{name:1, sort:1},{name:2, sort:2},{name:3, sort:3},{name:4, sort:4}] => [{name:1, sort:1},{name:4, sort:2},{name:2, sort:3},{name:3, sort:4}]");
});

QUnit.test("Est.arrayToObject", function(assert){
    var list1 = [{key:'key1',value:'value1'},{key:'key2',value:'value2'}];
    var object1 = Est.arrayToObject(list1, 'key', 'value');
    var object2 = {"key1": "value1","key2": "value2"};
    assert.deepEqual(object1, object2, "[{key:'key1',value:'value1'},{key:'key2',value:'value2'}] => {'key1': 'value1','key2': 'value2'}");
});

QUnit.test("Est.arrayFromObject", function(assert){
    var object1 = {key1: 'value1',key2: 'value2'};
    var list1 = Est.arrayFromObject(object1, 'key', 'value');
    var list2 = [ { "key": "key1", "value": "value1" }, { "key": "key2", "value": "value2" } ];
    assert.deepEqual(list1, list2, '{key1: "value1",key2: "value2"} => [ { "key": "key1", "value": "value1" }, { "key": "key2", "value": "value2" } ]');
});

QUnit.test("Est.hasKey", function(assert){
    var object1 = {name:1,sort:1};
    var result  = Est.hasKey(object1, 'name');
    assert.ok(result,'Est.hasKey(object1, "name"); => true');
});

QUnit.test("Est.makeMap", function(assert){
    var map = Est.makeMap("a,a,aa,a,ah,a");
    assert.deepEqual(map, { "a": true, "aa": true, "ah": true }, 'passed!');
});

QUnit.test("Est.indexOf", function(assert){
    var list = ['a', 'b'];
    var has = Est.indexOf(list, 'b');
    assert.equal(has, 1, "passed!");
});

QUnit.test("Est.arrayRemove", function(assert){
    var list = ['a', 'b', 'b'];
    var result = Est.arrayRemove(list, 'b');
    assert.deepEqual(list, ['a', 'b'], 'passed!');
});

QUnit.test("Est.map", function(assert){
    var list = [1, 2, 3];
    var result = Est.map(list, function(value, index, list){
        return list[index] + 1;
    });
    assert.deepEqual(result, [2, 3, 4], 'passed!');
    var result2 = Est.map({ 'one': 1, 'two': 2, 'three': 3 }, function(num) { return num * 3; });
    assert.deepEqual(result2, [3, 6, 9], 'object passed!');
    var characters = [
        { 'name': 'barney', 'age': 36 },
        { 'name': 'fred',   'age': 40 }
    ];
    var result3 = Est.map(characters, 'name');
    assert.deepEqual(result3, ['barney', 'fred'], 'passed!');
});
QUnit.test("Est.filter", function(assert){
    var list = [{"name":"aa"},{"name":"bb"},{"name":"cc"}, {"name":"bb", address:"zjut"}];
    var result = Est.filter(list, function(item){
        return item.name.indexOf('b') > -1;
    });
    assert.deepEqual(result, [ { "name": "bb" }, { "address": "zjut", "name": "bb" } ], 'passed!');
    var result2 = Est.filter(list, {"name": "bb", "address": "zjut"});
    assert.deepEqual(result2, [ { "address": "zjut", "name":  "bb" } ], "passed!");
});

QUnit.test("Est.findIndex", function(assert){
    var list = [{"name":"aa"},{"name":"bb"},{"name":"cc"}, {"name":"bb", address:"zjut"}];
    var index = Est.findIndex(list, {name: 'aa'});
    assert.equal(index, 0, 'test object : passed!');

    var index2 =  Est.findIndex(list, function(item){
        return item.name === 'aa';
    });
    assert.equal(index2, 0, 'test function: passed!');

    var index3 = Est.findIndex(list, {name:'bb', address:'zjut'});
    assert.equal(index3, 3, 'test multi params of  object : passed!');
});

QUnit.test('Est.sortBy', function(assert){
    var result = Est.sortBy([1, 2, 3], function(num) { return Math.sin(num); });
    assert.deepEqual(result, [3, 1, 2], 'passed!');
    var characters = [ { 'name': 'barney',  'age': 36 }, { 'name': 'fred',    'age': 40 }, { 'name': 'barney',  'age': 26 }, { 'name': 'fred',    'age': 30 } ];
    var result2 = Est.sortBy(characters, 'age');
    assert.deepEqual(result2, [
        { "age": 26, "name": "barney" }, { "age": 30, "name": "fred" }, { "age": 36, "name": "barney" }, { "age": 40, "name": "fred" }
    ], 'passed!');
    var result3 = Est.sortBy(characters, ['name', 'age']);
    assert.deepEqual(result3, [
        { "age": 26, "name": "barney" },{ "age": 36, "name": "barney" },  { "age": 30, "name": "fred" }, { "age": 40, "name": "fred" }
    ], 'passed!');
    var result4 = Est.sortBy(characters, ['age', 'name']);
    assert.deepEqual(result4, [ { "age": 26, "name": "barney" }, { "age": 30, "name": "fred" }, { "age": 36, "name": "barney" }, { "age": 40, "name": "fred" }
    ], 'passed!');
});