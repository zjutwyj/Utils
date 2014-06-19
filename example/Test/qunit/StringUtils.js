/**
 * @description StringUtils
 * @namespace StringUtils
 * @author yongjin on 2014/6/18
 */
QUnit.module( "【StringUtils】" );
QUnit.test("Zwt.lowercase('LE'); => 'le' ", function( assert ){
    var result = Zwt.lowercase('LE');
    var result2 = Zwt.lowercase('');
    assert.equal(result , 'le', "Zwt.lowercase('LE') => " + Zwt.lowercase('LE'));
    assert.equal(result2, '', "Zwt.lowercase('') => " + Zwt.lowercase(''));

    var result3 = Zwt.lowercase(null);
    assert.equal(result3, null, "Zwt.lowercase(null) => " + Zwt.lowercase(null));
});

QUnit.test('Zwt.uppercase("le"); => "LE"', function( assert ){
    var result = Zwt.uppercase('le');
    var result2 = Zwt.uppercase('');
    assert.equal(result , 'LE', 'Zwt.uppercase("le"); => ' + Zwt.uppercase("le"));
    assert.equal(result2, '', 'Zwt.uppercase(""); => "' + Zwt.uppercase('') + '"');
});

QUnit.test('Zwt.repeat("ru by",2) => "ru byru by"', function(assert){
    var result = Zwt.repeat("ru by", 2);
    assert.equal(result, 'ru byru by', ' Zwt.repeat("ru by",2) => ' + Zwt.repeat("ru by", 2));
});

QUnit.test('Zwt.contains("aaaaa", "aa") => true', function(assert){
    var result = Zwt.contains("aaaaa", "aa");
    assert.equal(result, true, 'Zwt.contains("aaaaa", "aa") => ' + Zwt.contains("aaaaa", "aa"));
});

QUnit.test("Zwt.startsWidth('aaa', 'aa', true); => true", function(assert){
    var result = Zwt.startsWidth('aaa', 'Aa', true);
    assert.equal(result, true, "Zwt.startsWidth('aaa', 'aa', true); => " +Zwt.startsWidth('aaa', 'aa', true));
    var result2 = Zwt.startsWidth('aaa', 'Aa', false);
    assert.equal(result2, false, "Zwt.startsWidth('aaa', 'Aa', false); => " + Zwt.startsWidth('aaa', 'Aa', false));
    var result3 = Zwt.startsWidth('aaa', 'Aa', true);
    assert.equal(result3, true, "Zwt.startsWidth('aaa', 'Aa', true); => " + Zwt.startsWidth('aaa', 'Aa', true));
});

QUnit.test("Zwt.endsWidth('aaa', 'aa', true); => true", function(assert){
    var result = Zwt.endsWidth('aaa', 'aa', true);
    assert.equal(result, true, "Zwt.endsWidth('aaa', 'aa', true); => " + Zwt.endsWidth('aaa', 'aa', true));
});

QUnit.test("Zwt.byteLen('sfasf我'， 2); => 7", function(assert){
    var result = Zwt.byteLen('sfasf我', 2);
    assert.equal(result, '7', "Zwt.byteLen('sfasf我', 2) => " + Zwt.byteLen('sfasf我', 2));
});

QUnit.test("Zwt.truncate('aaaaaa', 4, '...'); => a...", function(assert){
    var result = Zwt.truncate('aaaaaa', 4, '...');
    assert.equal(result, 'a...', "Zwt.truncate('aaaaaa', 4, '...'); => " + Zwt.truncate('aaaaaa', 4, '...'));
});

QUnit.test("Zwt.cutByte('aaaaa', 4, '...'); => ", function(assert){
    var result = Zwt.cutByte('aaaaa', 4, '...');
    assert.equal(result, 'a...', "Zwt.cutByte('aaaaa', 4, '...'); => " + Zwt.cutByte('aaaaa', 4, '...'));
});

QUnit.test('Zwt.stripTagName("' +Zwt.unescapeHTML("&lt;script&gt;a&lt;/script&gt;") + '", "script", true)=> ', function(assert){
    var result = Zwt.stripTagName(Zwt.unescapeHTML("&lt;script&gt;a&lt;/script&gt;"), "script", true);
    assert.equal(result, '', 'Zwt.stripTagName("' +Zwt.unescapeHTML("&lt;script&gt;a&lt;/script&gt;") + '", "script", true)=> ' + Zwt.stripTagName(Zwt.unescapeHTML("&lt;script&gt;a&lt;/script&gt;"), "script", true));
    var result2 = Zwt.stripTagName(Zwt.unescapeHTML("&lt;script&gt;a&lt;/script&gt;"), "script", false);
    assert.equal(result2, 'a', 'Zwt.stripTagName("' +Zwt.unescapeHTML("&lt;script&gt;a&lt;/script&gt;") + '", "script", false)=> ' + Zwt.stripTagName(Zwt.unescapeHTML("&lt;script&gt;a&lt;/script&gt;"), "script", false));

});

QUnit.test('Zwt.stripTags("<div>aadivbb</div>"); => ', function(assert){
    var result = Zwt.stripTags("<div>aadivbb</div>");
    assert.equal(result, 'aadivbb', 'Zwt.stripTags("<div>aadivbb</div>"); => ' + Zwt.stripTags("<div>aadivbb</div>"));
});

QUnit.test("Zwt.escapeHTML('<'); => " , function(assert){
    var result = Zwt.escapeHTML('<');
    assert.equal(result, '&lt;', "Zwt.escapeHTML('<'); => " + Zwt.escapeHTML('<'));
});

QUnit.test("Zwt.unescapeHTML('&lt;'); => " , function(assert){
    var result = Zwt.unescapeHTML('&lt;');
    assert.equal(result, "<", "Zwt.unescapeHTML('&lt;'); => " + Zwt.unescapeHTML('&lt;'));
});

QUnit.test("Zwt.escapeRegExp('aaa/[abc]/'); => " , function(assert){
    var result = Zwt.escapeRegExp('aaa/[abc]/');
    assert.equal(result, "aaa\\/\\[abc\\]\\/", "Zwt.escapeRegExp('aaa/[abc]/'); => " + Zwt.escapeRegExp('aaa/[abc]/'));
});

QUnit.test("Zwt.pad(5, 10, '0', false, 10, {prefix:'prefix'}); => " , function(assert){
    var result = Zwt.pad(5, 10, '0', false, 10, {prefix:'prefix'});
    assert.equal(result, 'prefix0005', "Zwt.pad(5, 10, '0', false, 10, {prefix:'prefix'}); => " + Zwt.pad(5, 10, '0', false, 10, {prefix:'prefix'}));
});

QUnit.test("Zwt.format('Result is #{0}, #{1}', 22, 23); => " , function(assert){
    var result = Zwt.format('Result is #{0}, #{1}', 22, 23);
    assert.equal(result, 'Result is 22, 23', "Zwt.format('Result is #{0}, #{1}', 22, 23); => " + Zwt.format('Result is #{0}, #{1}', 22, 23));
});

QUnit.test("Zwt.format('#{name} is a #{sex}', {name : 'Jhon',sex : 'man'}); => " , function(assert){
    var result = Zwt.format('#{name} is a #{sex}', {name : 'Jhon',sex : 'man'});
    assert.equal(result, 'Jhon is a man', "Zwt.format('#{name} is a #{sex}', {name : 'Jhon',sex : 'man'}); => " + Zwt.format('#{name} is a #{sex}', {name : 'Jhon',sex : 'man'}));
});

QUnit.test("Zwt.ltrim('  dd    '); => ", function(assert){
    var result = Zwt.ltrim('  dd    ');
    assert.equal(result, 'dd    ', "Zwt.ltrim('  dd    '); => " + Zwt.ltrim('  dd    '));
});

QUnit.test("Zwt.rtrim('  dd    '); => " , function(assert){
    var result = Zwt.rtrim('  dd    ');
    assert.equal(result, '  dd', "Zwt.rtrim('  dd    '); => " + Zwt.rtrim('  dd    '));
});
QUnit.test("Zwt.trim('  dd    '); => " , function(assert){
    var result = Zwt.trim('  dd    ');
    assert.equal(result, 'dd', "Zwt.trim('  dd    '); => " + Zwt.trim('  dd    '));
});
QUnit.test("Zwt.deepTrim('a b c'); => ", function(assert){
    var result = Zwt.deepTrim('a b c');
    assert.equal(result,'abc', "Zwt.deepTrim('a b c'); => " + Zwt.deepTrim('a b c'));
});

