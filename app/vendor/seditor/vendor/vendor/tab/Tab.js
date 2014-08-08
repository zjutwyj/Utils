(function(window, undefined) {
	var document = window.document;
	var Tab = function(selector1, selector2, selector3, selector4, opts) {
		return new Tab.self.init(selector1, selector2, selector3, selector4,
				opts);
	};
	Tab.self = Tab.prototype = {
		setOptions : function(opts) {
			this.opts = {
				time : 500,// 延时时间
				container : "body",// 初始化默认容器
				eventIn : "mouseover",// 定义鼠标移入事件
				eventOut : "mouseout",// 定义鼠标移出事件
				select : "selected",// 初始化当前选择项
				unselect : ""// 初始化未选择项
			};
			// 扩展参数值
			this.argExtend(this.opts, opts || {});
		},
		argExtend : function(destination, source) {
			for ( var property in source) {
				destination[property] = source[property];
			}
			return destination;
		},
		init : function(selector1, selector2, selector3, selector4, opts) {
			this.selector1 = selector1;
			this.selector2 = selector2;
			this.selector3 = selector3;
			this.selector4 = selector4;
			this.setOptions(opts);
			this.set();
		},
		set : function() {
			this.elem = this.tag(this.selector2, this.id(this.selector1));
			this.tabs = this.getElementsByClassName(this.id(this.selector3), this.selector4);
			
			this.listNum = this.elem.length;
			this.tabNum = this.tabs.length;
			for ( var i = 0; i < this.listNum; i++) {
				this.addEventHandler(this.elem[i], this.opts.eventIn,
						(function(t, i) {
							return function() {
								t.tagDelay(i);
							};
						})(this, i));
				if (this.opts.eventIn != "click") {
					this.addEventHandler(this.elem[i], this.opts.eventOut,
							(function(t, i) {
								return function() {
									t.clearTimeout(t.elem[i].out);
								};
							})(this, i));
				}
			}
		},
		tagDelay : function(i) {
			this.elem[i].out = setTimeout((function(t) {
				return function() {
					for ( var j = 0; j < t.tabNum; j++) {
						if (i == j) {
							t.tabs[j].style.display = "block";
							t.elem[j].className = t.opts.select;
						} else {
							t.tabs[j].style.display = "none";
							t.elem[j].className = t.opts.unselect;
						}
					}
				};
			})(this), this.opts.time);
		},
		clearTimeout : function(time) {
			clearTimeout(time);
		},
		getElementsByClassName:function(node, classname) {
			if (node.getElementsByClassName) {
				return node.getElementsByClassName(classname);
			} else {
				var results = new Array();
				var elems = node.getElementsByTagName("*");
				for ( var i = 0, len = elems.length; i < len; i++) {
					if (elems[i].className.indexOf(classname) != -1) {
						results[results.length] = elems[i];
					}
				}
				return results;
			}
		},
		tag : function(name, elem) {
			return (elem || document).getElementsByTagName(name);
		},
		id : function(name) {
			return document.getElementById(name);
		},
		first : function(elem) {
			elem = elem.firstChild;
			return elem && elem.nodeType == 1 ? elem : this.next(elem);
		},
		next : function(elem) {
			do {
				elem = elem.nextSibling;
			} while (elem && elem.nodeType != 1);
			return elem;
		},
		addEventHandler : function(oTarget, sEventType, fnHandler) {
			if (oTarget.addEventListener) {
				oTarget.addEventListener(sEventType, fnHandler, false);
			} else if (oTarget.attachEvent) {
				oTarget.attachEvent("on" + sEventType, fnHandler);
			} else {
				oTarget["on" + sEventType] = fnHandler;
			}
		}
	};
	Tab.self.init.prototype = Tab.self;
	window.Tab = Tab;
})(window);