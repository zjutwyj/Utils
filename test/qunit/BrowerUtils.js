/**
 * @description ArrayUtils
 * @namespace ArrayUtils
 * @author yongjin on 2014/6/18
 */
QUnit.module("【BrowerUtils】");

QUnit.test("Est.msie", function(assert) {
  var result = Est.msie();
  assert.equal(result, false, "passed!");
});
QUnit.test("Est.getUrlParam", function(assert) {
  var url = "http://www.zket.net?name=zjut";
  var name = Est.getUrlParam('name', url);
  var result = 'zjut';
  assert.equal(name, result, "passed!");
});
QUnit.test("Est.urlResolve", function(assert) {
  var obj = Est.urlResolve(window.location.href);
  assert.deepEqual(obj, {
    "hash": "",
    "host": "jihui88.com",
    "hostname": "jihui88.com",
    "href": "http://jihui88.com/utils/test/Est_qunit.html",
    "pathname": "/utils/test/Est_qunit.html",
    "port": "",
    "protocol": "http",
    "search": ""
  }, "passed!");
});

QUnit.test('Est.keyRoute', function(assert) {
  var piece = {
    "route1": function(data) {
      return "route1" + data;
    },
    "route2": function(data) {
      return "route2" + data;
    }
  }
  var result = Est.keyRoute(piece, "route2", "route");
  assert.equal(result, 'route2route', 'passed');
});
QUnit.test('Est.cookie', function(assert) {
  Est.cookie('name', 'value');
  assert.equal(Est.cookie('name'), 'value', 'passed');
});

QUnit.test('Est.setUrlParam', function(assert) {
  var url = "http://www.jihui88.com/wcd/html/78.html";
  url = Est.setUrlParam('belongId', '008', url);
  assert.equal(url, 'http://www.jihui88.com/wcd/html/78.html?belongId=008', 'passed');

  url = Est.setUrlParam('code', 'DFEWFGEWFWEF', url);
  assert.equal(url, 'http://www.jihui88.com/wcd/html/78.html?belongId=008&code=DFEWFGEWFWEF', 'passed');

  url = Est.setUrlParam('belongId', '009', url);
  assert.equal(url, 'http://www.jihui88.com/wcd/html/78.html?belongId=009&code=DFEWFGEWFWEF', 'passed');

});
