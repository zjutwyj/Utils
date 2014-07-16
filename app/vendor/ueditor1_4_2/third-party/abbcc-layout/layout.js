var $$= window.parent.jQuery;
var abbcc = parent.abbcc;
var preview = $("#preview"),
	preitem = $("#preitem"),
	tmps = templates,
	currentTmp;
var initPre = function () {
	var str = "";
	for ( var i = 0, tmp; tmp = tmps[i++]; ) {
		str += '<div class="preitem" onclick="pre(' + i + ')"><img src="' + "images/" + tmp.pre + '" ' + (tmp.title ? 'alt="' + tmp.title + '" title="' + tmp.title + '"' : "") + '></div>';
	}
	preitem.html(str);
};
var pre = function ( n ) {
	var tmp = tmps[n - 1];
	currentTmp = tmp;
	clearItem();
	$(preitem.children()[n-1])
		.css("background-color","lemonChiffon")
		.css("border","#ccc 1px solid");
	preview.html(tmp.preHtml ? tmp.preHtml : "");
};
var clearItem = function () {
	var items = preitem.children();
	for ( var i = 0, item; item = items[i++]; ) {
		$(item).css( "background-color","").css("border","white 1px solid");
	}
};
function save() {
	if ( !$("#issave").is(":checked") ){
		abbcc.setSource('');
	}
	var obj = {
		html:currentTmp && currentTmp.html
	};
	callback(obj.html);
}
function save_without(){
	callback();
}
window.pre = pre;

function initBoost(){
	initPre();
	pre(2);
}  
setTimeout(initBoost,500);
