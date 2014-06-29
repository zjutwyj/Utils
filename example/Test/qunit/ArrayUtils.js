/**
 * @description ArrayUtils
 * @namespace ArrayUtils
 * @author yongjin on 2014/6/18
 */
QUnit.module( "【ArrayUtils】" );

QUnit.test("Zwt.each(list1, function(item){console.log(item.name);})", function(assert){
    var list1 = [{name:1, sort:1},{name:2, sort:2}];
    var list2 = [{name:1, sort:2},{name:2, sort:3}];
    Zwt.each(list1, function(item){
        item.sort = item.sort + 1;
    });
    assert.deepEqual(list1, list2, "[{name:1, sort:1},{name:2, sort:2}] => [{name:1, sort:2},{name:2, sort:3}]");
});

QUnit.test("Zwt.arrayExchange", function(assert){
    var list1 = [{name:1, sort:1},{name:2, sort:2}];
    var list2 = [{name:2, sort:1},{name:1, sort:2}];
    Zwt.arrayExchange(list1, 0 , 1, {
        column : 'sort',
        callback : function(thisNode, targetNode){
        }
    });
    assert.deepEqual(list1, list2, '[{name:1, sort:1},{name:2, sort:2}] =>  [{name:2, sort:1},{name:1, sort:2}]');
});

QUnit.test("Zwt.arrayInsert", function(assert){
    var list1 = [{name:1, sort:1},{name:2, sort:2},{name:3, sort:3},{name:4, sort:4}];
    var list2 = [{name:1, sort:1},{name:4, sort:2},{name:2, sort:3},{name:3, sort:4}];
    Zwt.arrayInsert(list1, 3 , 1, {
        column : 'sort',
        callback : function(list){
        }
    });
    assert.deepEqual(list1, list2, "[{name:1, sort:1},{name:2, sort:2},{name:3, sort:3},{name:4, sort:4}] => [{name:1, sort:1},{name:4, sort:2},{name:2, sort:3},{name:3, sort:4}]");
});

QUnit.test("Zwt.arrayToObject", function(assert){
    var list1 = [{key:'key1',value:'value1'},{key:'key2',value:'value2'}];
    var object1 = Zwt.arrayToObject(list1, 'key', 'value');
    var object2 = {"key1": "value1","key2": "value2"};
    assert.deepEqual(object1, object2, "[{key:'key1',value:'value1'},{key:'key2',value:'value2'}] => {'key1': 'value1','key2': 'value2'}");
});

QUnit.test("Zwt.arrayFromObject", function(assert){
    var object1 = {key1: 'value1',key2: 'value2'};
    var list1 = Zwt.arrayFromObject(object1, 'key', 'value');
    var list2 = [ { "key": "key1", "value": "value1" }, { "key": "key2", "value": "value2" } ];
    assert.deepEqual(list1, list2, '{key1: "value1",key2: "value2"} => [ { "key": "key1", "value": "value1" }, { "key": "key2", "value": "value2" } ]');
});

QUnit.test("Zwt.hasKey", function(assert){
    var object1 = {name:1,sort:1};
    var result  = Zwt.hasKey(object1, 'name');
    assert.ok(result,'Zwt.hasKey(object1, "name"); => true');
});

QUnit.test("Zwt.makeMap", function(assert){
    var map = Zwt.makeMap("a,a,aa,a,ah,a");
    assert.deepEqual(map, { "a": true, "aa": true, "ah": true }, 'passed!');
});

QUnit.test("Zwt.indexOf", function(assert){
    var list = ['a', 'b'];
    var has = Zwt.indexOf(list, 'b');
    assert.equal(has, 1, "passed!");
});

QUnit.test("Zwt.arrayRemove", function(assert){
    var list = ['a', 'b', 'b'];
    var result = Zwt.arrayRemove(list, 'b');
    assert.deepEqual(list, ['a', 'b'], 'passed!');
});

QUnit.test("Zwt.map", function(assert){
    var list = [1, 2, 3];
    var result = Zwt.map(list, function(value, list, index){
        return list[index] + 1;
    });
    assert.deepEqual(result, [2, 3, 4], 'passed!');
});
QUnit.test("Zwt.filter", function(assert){
    var list = [{"name":"aa"},{"name":"bb"},{"name":"cc"}, {"name":"bb", address:"zjut"}];
    var result = Zwt.filter(list, function(item){
        return item.name.indexOf('b') > -1;
    });
    assert.deepEqual(result, [ { "name": "bb" }, { "address": "zjut", "name": "bb" } ], 'passed!');
    var result2 = Zwt.filter(list, {"name": "bb", "address": "zjut"});
    assert.deepEqual(result2, [ { "address": "zjut", "name":  "bb" } ], "passed!");
});

QUnit.test("Zwt.findIndex", function(assert){
    var list = [{"name":"aa"},{"name":"bb"},{"name":"cc"}, {"name":"bb", address:"zjut"}];
    var index = Zwt.findIndex(list, {name: 'aa'});
    assert.equal(index, 0, 'test object : passed!');

    var index2 =  Zwt.findIndex(list, function(item){
        return item.name === 'aa';
    });
    assert.equal(index2, 0, 'test function: passed!');

    var index3 = Zwt.findIndex(list, {name:'bb', address:'zjut'});
    assert.equal(index3, 3, 'test multi params of  object : passed!');
});