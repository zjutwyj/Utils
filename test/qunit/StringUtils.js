/**
 * @description StringUtils
 * @namespace StringUtils
 * @author yongjin on 2014/6/18
 */
QUnit.module("【StringUtils】");
QUnit.test("Est.lowercase('LE'); => 'le' ", function (assert) {
  var result = Est.lowercase('LE');
  var result2 = Est.lowercase('');
  assert.equal(result, 'le', "Est.lowercase('LE') => " + Est.lowercase('LE'));
  assert.equal(result2, '', "Est.lowercase('') => " + Est.lowercase(''));

  var result3 = Est.lowercase(null);
  assert.equal(result3, null, "Est.lowercase(null) => " + Est.lowercase(null));
});

QUnit.test('Est.uppercase("le"); => "LE"', function (assert) {
  var result = Est.uppercase('le');
  var result2 = Est.uppercase('');
  assert.equal(result, 'LE', 'Est.uppercase("le"); => ' + Est.uppercase("le"));
  assert.equal(result2, '', 'Est.uppercase(""); => "' + Est.uppercase('') + '"');
});

QUnit.test('Est.repeat("ru by",2) => "ru byru by"', function (assert) {
  var result = Est.repeat("ru by", 2);
  assert.equal(result, 'ru byru by', ' Est.repeat("ru by",2) => ' + Est.repeat("ru by", 2));
});

QUnit.test('Est.contains("aaaaa", "aa") => true', function (assert) {
  var result = Est.contains("aaaaa", "aa");
  assert.equal(result, true, 'Est.contains("aaaaa", "aa") => ' + Est.contains("aaaaa", "aa"));
});

QUnit.test("Est.startsWidth('aaa', 'aa', true); => true", function (assert) {
  var result = Est.startsWidth('aaa', 'Aa', true);
  assert.equal(result, true, "Est.startsWidth('aaa', 'aa', true); => " + Est.startsWidth('aaa', 'aa', true));
  var result2 = Est.startsWidth('aaa', 'Aa', false);
  assert.equal(result2, false, "Est.startsWidth('aaa', 'Aa', false); => " + Est.startsWidth('aaa', 'Aa', false));
  var result3 = Est.startsWidth('aaa', 'Aa', true);
  assert.equal(result3, true, "Est.startsWidth('aaa', 'Aa', true); => " + Est.startsWidth('aaa', 'Aa', true));
});

QUnit.test("Est.endsWidth('aaa', 'aa', true); => true", function (assert) {
  var result = Est.endsWidth('aaa', 'aa', true);
  assert.equal(result, true, "Est.endsWidth('aaa', 'aa', true); => " + Est.endsWidth('aaa', 'aa', true));
});

QUnit.test("Est.byteLen('sfasf我'， 2); => 7", function (assert) {
  var result = Est.byteLen('sfasf我', 2);
  assert.equal(result, '7', "Est.byteLen('sfasf我', 2) => " + Est.byteLen('sfasf我', 2));
});

QUnit.test("Est.truncate('aaaaaa', 4, '...'); => a...", function (assert) {
  var result = Est.truncate('aaaaaa', 4, '...');
  assert.equal(result, 'a...', "Est.truncate('aaaaaa', 4, '...'); => " + Est.truncate('aaaaaa', 4, '...'));
});

QUnit.test("Est.cutByte('aaaaa', 4, '...'); => ", function (assert) {
  var result = Est.cutByte('aaaaa', 4, '...');
  assert.equal(result, 'a...', "Est.cutByte('aaaaa', 4, '...'); => " + Est.cutByte('aaaaa', 4, '...'));
});

QUnit.test('Est.stripTagName("' + Est.unescapeHTML("&lt;script&gt;a&lt;/script&gt;") + '", "script", true)=> ', function (assert) {
  var result = Est.stripTagName(Est.unescapeHTML("&lt;script&gt;a&lt;/script&gt;"), "script", true);
  assert.equal(result, '', 'Est.stripTagName("' + Est.unescapeHTML("&lt;script&gt;a&lt;/script&gt;") + '", "script", true)=> ' + Est.stripTagName(Est.unescapeHTML("&lt;script&gt;a&lt;/script&gt;"), "script", true));
  var result2 = Est.stripTagName(Est.unescapeHTML("&lt;script&gt;a&lt;/script&gt;"), "script", false);
  assert.equal(result2, 'a', 'Est.stripTagName("' + Est.unescapeHTML("&lt;script&gt;a&lt;/script&gt;") + '", "script", false)=> ' + Est.stripTagName(Est.unescapeHTML("&lt;script&gt;a&lt;/script&gt;"), "script", false));

});

QUnit.test('Est.stripTags("<div>aadivbb</div>"); => ', function (assert) {
  var result = Est.stripTags("<div>aadivbb</div>");
  assert.equal(result, 'aadivbb', 'Est.stripTags("<div>aadivbb</div>"); => ' + Est.stripTags("<div>aadivbb</div>"));
});

QUnit.test("Est.escapeHTML('<'); => ", function (assert) {
  var result = Est.escapeHTML('<');
  assert.equal(result, '&lt;', "Est.escapeHTML('<'); => " + Est.escapeHTML('<'));
});

QUnit.test("Est.unescapeHTML('&lt;'); => ", function (assert) {
  var result = Est.unescapeHTML('&lt;');
  assert.equal(result, "<", "Est.unescapeHTML('&lt;'); => " + Est.unescapeHTML('&lt;'));
});

QUnit.test("Est.escapeRegExp('aaa/[abc]/'); => ", function (assert) {
  var result = Est.escapeRegExp('aaa/[abc]/');
  assert.equal(result, "aaa\\/\\[abc\\]\\/", "Est.escapeRegExp('aaa/[abc]/'); => " + Est.escapeRegExp('aaa/[abc]/'));
});

QUnit.test("Est.pad(5, 10, '0', false, 10, {prefix:'prefix'}); => ", function (assert) {
  var result = Est.pad(5, 10, '0', false, 10, {prefix: 'prefix'});
  assert.equal(result, 'prefix0005', "Est.pad(5, 10, '0', false, 10, {prefix:'prefix'}); => " + Est.pad(5, 10, '0', false, 10, {prefix: 'prefix'}));
});

QUnit.test("Est.format('Result is #{0}, #{1}', 22, 23); => ", function (assert) {
  var result = Est.format('Result is #{0}, #{1}', 22, 23);
  assert.equal(result, 'Result is 22, 23', "Est.format('Result is #{0}, #{1}', 22, 23); => " + Est.format('Result is #{0}, #{1}', 22, 23));
});

QUnit.test("Est.format('#{name} is a #{sex}', {name : 'Jhon',sex : 'man'}); => ", function (assert) {
  var result = Est.format('#{name} is a #{sex}', {name: 'Jhon', sex: 'man'});
  assert.equal(result, 'Jhon is a man', "Est.format('#{name} is a #{sex}', {name : 'Jhon',sex : 'man'}); => " + Est.format('#{name} is a #{sex}', {name: 'Jhon', sex: 'man'}));
});

QUnit.test("Est.template", function (assert) {
  // 字符串
  var result3 = Est.template('hello {{name}}', { name: 'feenan'});
  assert.equal(result3, "hello feenan", "字符串模板 测试通过");

  // 变量嵌套
  var result8 = Est.template('hello {{person.age}}', { person: {age: 50}});
  assert.equal(result8, "hello 50", "变量嵌套 测试通过");

  // 四则运算
  var result4 = Est.template('(1+2)*age = {{ (1+2)*age}}', {age: 18});
  assert.equal(result4, "(1+2)*age = 54", "四则运算测试通过");

  // 比较操作符
  var result5 = Est.template('{{1>2}}', {}); // false
  assert.equal(result5, "false", "比较操作符1测试通过");
  var result6 = Est.template('{{age > 18}}', {age: 20}); // true
  assert.equal(result6, "true", "比较操作符2测试通过");

  // 三元运算符
  var result7 = Est.template('{{ 2 > 1 ? name : ""}}', {name: 'feenan'}); // feenan
  assert.equal(result7, "feenan", "三元运算符测试通过");

  // 综合
  var tmpl1 = '<div id="{{id}}" class="{{(i % 2 == 1 ? " even" : "")}}"> ' +
    '<div class="grid_1 alpha right">' +
    '<img class="righted" src="{{profile_image_url}}"/>' +
    '</div>' +
    '<div class="grid_6 omega contents">' +
    '<p><b><a href="/{{from_user}}">{{from_user}}</a>:</b>{{info.text}}</p>' +
    '</div>' +
    '</div>';
  var result = Est.template(tmpl1, {
    i: 5,
    id: "form_user",
    from_user: "Krasimir Tsonev",
    profile_image_url: "http://www.baidu.com/img/aaa.jpg",
    info: {
      text: "text"
    }
  });
  assert.equal(result, "<div id=\"form_user\" class=\" even\"> " +
    "<div class=\"grid_1 alpha right\">" +
    "<img class=\"righted\" src=\"http://www.baidu.com/img/aaa.jpg\"/>" +
    "</div>" +
    "<div class=\"grid_6 omega contents\">" +
    "<p><b><a href=\"/Krasimir Tsonev\">Krasimir Tsonev</a>:</b>text</p>" +
    "</div>" +
    "</div>", '综合1 测试通过!');

  // 可读性差 放弃
  /*var tmpl2 = '{{ for ( var i = 0; i < users.length; i++ ) { }}' +
   '<li><a href="{{=users[i].url}}">{{=users[i].name}}</a></li>'+
   '{{ } }}';
   var result2 = Est.$template(tmpl2, {
   users : [{ name: "user1", url: "url1" }, { name: "user2", url: "url2" }, { name: "user3", url: "url3" }, { name: "user4", url: "url4" }, { name: "user5", url: "url5" }]
   });
   assert.equal(result2, "<li><a href=\"url1\">user1</a></li>" +
   "<li><a href=\"url2\">user2</a></li>" +
   "<li><a href=\"url3\">user3</a></li>" +
   "<li><a href=\"url4\">user4</a></li>" +
   "<li><a href=\"url5\">user5</a></li>", "for 嵌套测试通过!");*/


});


QUnit.test("Est.ltrim('  dd    '); => ", function (assert) {
  var result = Est.ltrim('  dd    ');
  assert.equal(result, 'dd    ', "Est.ltrim('  dd    '); => " + Est.ltrim('  dd    '));
});

QUnit.test("Est.rtrim('  dd    '); => ", function (assert) {
  var result = Est.rtrim('  dd    ');
  assert.equal(result, '  dd', "Est.rtrim('  dd    '); => " + Est.rtrim('  dd    '));
});
QUnit.test("Est.trim('  dd    '); => ", function (assert) {
  var result = Est.trim('  dd    ');
  assert.equal(result, 'dd', "Est.trim('  dd    '); => " + Est.trim('  dd    '));
  var name;
  var result2 = Est.trim(name);
  assert.equal(result2, null , 'passed');
});
QUnit.test("Est.deepTrim('a b c'); => ", function (assert) {
  var result = Est.deepTrim('a b c');
  assert.equal(result, 'abc', "Est.deepTrim('a b c'); => " + Est.deepTrim('a b c'));
});

QUnit.test("Est.nextUid()", function (assert) {
  var result = Est.nextUid();
  assert.equal(result, '002', result);
  var result2 = Est.nextUid();
  assert.equal(result2, '003', result2);
});
QUnit.test("Est.reverse", function (assert) {
  var result = Est.reverse("abc");
  assert.equal(result, 'cba', 'passed!');
});