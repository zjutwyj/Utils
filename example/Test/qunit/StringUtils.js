/**
 * @description StringUtils
 * @namespace StringUtils
 * @author yongjin on 2014/6/18
 */
QUnit.module( "【StringUtils】" );
QUnit.test("Est.lowercase('LE'); => 'le' ", function( assert ){
    var result = Est.lowercase('LE');
    var result2 = Est.lowercase('');
    assert.equal(result , 'le', "Est.lowercase('LE') => " + Est.lowercase('LE'));
    assert.equal(result2, '', "Est.lowercase('') => " + Est.lowercase(''));

    var result3 = Est.lowercase(null);
    assert.equal(result3, null, "Est.lowercase(null) => " + Est.lowercase(null));
});

QUnit.test('Est.uppercase("le"); => "LE"', function( assert ){
    var result = Est.uppercase('le');
    var result2 = Est.uppercase('');
    assert.equal(result , 'LE', 'Est.uppercase("le"); => ' + Est.uppercase("le"));
    assert.equal(result2, '', 'Est.uppercase(""); => "' + Est.uppercase('') + '"');
});

QUnit.test('Est.repeat("ru by",2) => "ru byru by"', function(assert){
    var result = Est.repeat("ru by", 2);
    assert.equal(result, 'ru byru by', ' Est.repeat("ru by",2) => ' + Est.repeat("ru by", 2));
});

QUnit.test('Est.contains("aaaaa", "aa") => true', function(assert){
    var result = Est.contains("aaaaa", "aa");
    assert.equal(result, true, 'Est.contains("aaaaa", "aa") => ' + Est.contains("aaaaa", "aa"));
});

QUnit.test("Est.startsWidth('aaa', 'aa', true); => true", function(assert){
    var result = Est.startsWidth('aaa', 'Aa', true);
    assert.equal(result, true, "Est.startsWidth('aaa', 'aa', true); => " +Est.startsWidth('aaa', 'aa', true));
    var result2 = Est.startsWidth('aaa', 'Aa', false);
    assert.equal(result2, false, "Est.startsWidth('aaa', 'Aa', false); => " + Est.startsWidth('aaa', 'Aa', false));
    var result3 = Est.startsWidth('aaa', 'Aa', true);
    assert.equal(result3, true, "Est.startsWidth('aaa', 'Aa', true); => " + Est.startsWidth('aaa', 'Aa', true));
});

QUnit.test("Est.endsWidth('aaa', 'aa', true); => true", function(assert){
    var result = Est.endsWidth('aaa', 'aa', true);
    assert.equal(result, true, "Est.endsWidth('aaa', 'aa', true); => " + Est.endsWidth('aaa', 'aa', true));
});

QUnit.test("Est.byteLen('sfasf我'， 2); => 7", function(assert){
    var result = Est.byteLen('sfasf我', 2);
    assert.equal(result, '7', "Est.byteLen('sfasf我', 2) => " + Est.byteLen('sfasf我', 2));
});

QUnit.test("Est.truncate('aaaaaa', 4, '...'); => a...", function(assert){
    var result = Est.truncate('aaaaaa', 4, '...');
    assert.equal(result, 'a...', "Est.truncate('aaaaaa', 4, '...'); => " + Est.truncate('aaaaaa', 4, '...'));
});

QUnit.test("Est.cutByte('aaaaa', 4, '...'); => ", function(assert){
    var result = Est.cutByte('aaaaa', 4, '...');
    assert.equal(result, 'a...', "Est.cutByte('aaaaa', 4, '...'); => " + Est.cutByte('aaaaa', 4, '...'));
});

QUnit.test('Est.stripTagName("' +Est.unescapeHTML("&lt;script&gt;a&lt;/script&gt;") + '", "script", true)=> ', function(assert){
    var result = Est.stripTagName(Est.unescapeHTML("&lt;script&gt;a&lt;/script&gt;"), "script", true);
    assert.equal(result, '', 'Est.stripTagName("' +Est.unescapeHTML("&lt;script&gt;a&lt;/script&gt;") + '", "script", true)=> ' + Est.stripTagName(Est.unescapeHTML("&lt;script&gt;a&lt;/script&gt;"), "script", true));
    var result2 = Est.stripTagName(Est.unescapeHTML("&lt;script&gt;a&lt;/script&gt;"), "script", false);
    assert.equal(result2, 'a', 'Est.stripTagName("' +Est.unescapeHTML("&lt;script&gt;a&lt;/script&gt;") + '", "script", false)=> ' + Est.stripTagName(Est.unescapeHTML("&lt;script&gt;a&lt;/script&gt;"), "script", false));

});

QUnit.test('Est.stripTags("<div>aadivbb</div>"); => ', function(assert){
    var result = Est.stripTags("<div>aadivbb</div>");
    assert.equal(result, 'aadivbb', 'Est.stripTags("<div>aadivbb</div>"); => ' + Est.stripTags("<div>aadivbb</div>"));
});

QUnit.test("Est.escapeHTML('<'); => " , function(assert){
    var result = Est.escapeHTML('<');
    assert.equal(result, '&lt;', "Est.escapeHTML('<'); => " + Est.escapeHTML('<'));
});

QUnit.test("Est.unescapeHTML('&lt;'); => " , function(assert){
    var result = Est.unescapeHTML('&lt;');
    assert.equal(result, "<", "Est.unescapeHTML('&lt;'); => " + Est.unescapeHTML('&lt;'));
});

QUnit.test("Est.escapeRegExp('aaa/[abc]/'); => " , function(assert){
    var result = Est.escapeRegExp('aaa/[abc]/');
    assert.equal(result, "aaa\\/\\[abc\\]\\/", "Est.escapeRegExp('aaa/[abc]/'); => " + Est.escapeRegExp('aaa/[abc]/'));
});

QUnit.test("Est.pad(5, 10, '0', false, 10, {prefix:'prefix'}); => " , function(assert){
    var result = Est.pad(5, 10, '0', false, 10, {prefix:'prefix'});
    assert.equal(result, 'prefix0005', "Est.pad(5, 10, '0', false, 10, {prefix:'prefix'}); => " + Est.pad(5, 10, '0', false, 10, {prefix:'prefix'}));
});

QUnit.test("Est.format('Result is #{0}, #{1}', 22, 23); => " , function(assert){
    var result = Est.format('Result is #{0}, #{1}', 22, 23);
    assert.equal(result, 'Result is 22, 23', "Est.format('Result is #{0}, #{1}', 22, 23); => " + Est.format('Result is #{0}, #{1}', 22, 23));
});

QUnit.test("Est.format('#{name} is a #{sex}', {name : 'Jhon',sex : 'man'}); => " , function(assert){
    var result = Est.format('#{name} is a #{sex}', {name : 'Jhon',sex : 'man'});
    assert.equal(result, 'Jhon is a man', "Est.format('#{name} is a #{sex}', {name : 'Jhon',sex : 'man'}); => " + Est.format('#{name} is a #{sex}', {name : 'Jhon',sex : 'man'}));
});

QUnit.test("Est.ltrim('  dd    '); => ", function(assert){
    var result = Est.ltrim('  dd    ');
    assert.equal(result, 'dd    ', "Est.ltrim('  dd    '); => " + Est.ltrim('  dd    '));
});

QUnit.test("Est.rtrim('  dd    '); => " , function(assert){
    var result = Est.rtrim('  dd    ');
    assert.equal(result, '  dd', "Est.rtrim('  dd    '); => " + Est.rtrim('  dd    '));
});
QUnit.test("Est.trim('  dd    '); => " , function(assert){
    var result = Est.trim('  dd    ');
    assert.equal(result, 'dd', "Est.trim('  dd    '); => " + Est.trim('  dd    '));
});
QUnit.test("Est.deepTrim('a b c'); => ", function(assert){
    var result = Est.deepTrim('a b c');
    assert.equal(result,'abc', "Est.deepTrim('a b c'); => " + Est.deepTrim('a b c'));
});

QUnit.test("Est.nextUid()", function(assert){
    var result = Est.nextUid();
    assert.equal(result, '001', result);
    var result2 = Est.nextUid();
    assert.equal(result2, '002', result2);
});
