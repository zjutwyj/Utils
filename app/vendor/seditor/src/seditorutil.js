var seditorutil = {
    isIE : function(){
        var msie6=false;var msie7=false;var msie8 = false;
        if($.browser.msie){
            if($.browser.version=="6.0")
                msie6 = true;
            else if($.browser.version=="7.0")
                msie7 = true;
            else if($.browser.version == '8.0')
                msie8 = true;
        }
        msieLow=msie6||msie7||msie8;
        return msieLow;
    },
    addEvent : function(obj, eventName, eventFunc) {
        if (obj.attachEvent) { // IE
            obj.attachEvent(eventName, eventFunc);
        } else if (obj.addEventListener) { // FF Gecko / W3C
            var eventName2 = eventName.toString().replace(/on(.*)/i, '$1'); // 正则过滤第1个on
            obj.addEventListener(eventName2, eventFunc, false); // fslse为倒序执行事件
        } else {
            obj[eventName] = eventFunc;
        }
    } ,
    getEvent : function(event){
        if(!event){
            event = window.event;
            event.target = event.srcElement;
            event.layerX = event.offsetX;
            event.layerY = event.offsetY;
            event.stopProgressive = function(event){
                event.cancelBubble = true;
            };
            event.buttonValue = function(event){
                return event.button==1?0:event.button == 4?1:2;
            }
        }
        event.pageX = event.pageX || event.clientX + document.documentElement.scrollLeft + document.body.scrollLeft;
        event.pageY = event.pageY || event.clientY + document.documentElement.scrollTop + document.body.scrollTop;
        return event;
    },
    keyEvent : function(obj, type, fn){
        seditorutil.addEvent(obj,type,function(event){
            fn.call(null,seditorutil.getEvent(event).keyCode);
        });
    },
    request : function(paras) {
        var url = location.href;
        var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
        var paraObj = {};
        for(var i = 0,len = paraString.length ; i<len; i++){
            var j = paraString[i];
            paraObj[j.substring(0, j.indexOf("="))] = j.substring(j
                .indexOf("=") + 1, j.length);
        }
        var returnValue = paraObj[paras];
        if (typeof (returnValue) == "undefined") {
            return "";
        } else {
            return returnValue;
        }
    },
    findClosing : function(text, character, from) {
        var end = text.indexOf(character, from);
        if (end == -1)
            throw new Error("Missing closing '" + character + "'");
        else
            return end;
    },
    cssRuleList : function(text,startreg,endreg){
        var fragments = [];
        return seditorutil.splitCss(text, "{", "}");
    },
    splitCss : function(text, startsep, endsep){
        var pos = 0, poss = 0, fragments = [], selector;
        while(pos < text.length){
            if (text.charAt(pos) == startsep) {
                selector = text.slice(poss,pos);
                var end = seditorutil.findClosing(text, endsep, pos + 1);
                fragments.push(selector.replace(/^[\n\s]*/g,'') + text.slice(pos, end+1));
                pos = poss = end + 1;
            } else {
                pos++;
            }
        }
        return fragments;
    },
    split : function(text,startsep,endsep) {
        var pos = 0, fragments = [], len = text.length;
        while (pos < len) {
            if (text.charAt(pos) == startsep) {
                var end = seditorutil.findClosing(text, endsep, pos + 1);
                fragments.push(text.slice(pos + 1, end));
                pos = end + 1;
            } else {
                pos++;
            }
        }
        return fragments;
    },
    toCssJSON : function(style) {
        var array = [];
        for ( var key in style) {
            var arr = [];
            for ( var k in style[key]) {
                arr.push(k + ":" + style[key][k]);
            }
            array.push(key + "{" + arr.join(";") + "}");
        }
        return array.join("");
    },
    getCssJSON : function(cssObjectList){
        var array = [];
        seditorutil.forEach(cssObjectList, function(element){
            var arr = [];
            for(var key in element.style){
                arr.push(key + ":" + element['style'][key]);
            }
            array.push(element['selector'] +"{"+arr.join(";")+"}");
        });
        return array.join(" ");
    },
    jsonToCSS : function(str){
        var item = {},itemlist = [];
        itemlist = str.split(";");
        seditorutil.forEach(itemlist, function(element){
            if($.trim(element) != ''){
                var s = element.split(":"),
                    val = s[1];
                for(var i = 2,len = s.length; i < len; i++){
                    val = val + (':' + s[i]);
                }
                item[$.trim(s[0])] = $.trim(val);
            }
        });
        return item;
    },
    cssToObject : function(list){
        var arr = [];
        seditorutil.forEach(list, function(element){
            var item = {};
            var style = seditorutil.split(element, "{", "}")[0];
            var selector = element.substring(0,element.indexOf("{"));
            item['selector'] = $.trim(selector);
            item['style'] = seditorutil.jsonToCSS(style.replace(/{(.*)}/g,'$1'));
            arr.push(item);
        });
        return arr;
    },
    forEach : function(array, action) {
        for ( var i = 0, len = array.length; i < len; i++)
            action(array[i]);
    },
    reduce : function(list, fn){
        seditorutil.forEach(list,function(element){
            fn.apply(null, arguments);
        });
    },

    getRuleValue : function(list,name,selector){
        var val = "";
        seditorutil.forEach(list, function(element){
            if(element['selector'] == selector){
                val = element['style'][name];
            }
        });
        return val;
    },
    setRuleValue : function(list, selector, name, val){
        var has = false;
        seditorutil.reduce(list, function(element){
            if(element['selector'] == selector){
                element['style'][name] = val;
                has = true;
            }
        });
        if(!has){
            seditorutil.appendRule(list, selector, name, val);
        }
    },
    appendRule : function(list, selector, name, value) {
        var item = {};
        item['selector'] =  selector;
        item['style'] = {};
        item['style'][name] = value;
        list.push(item);
    },
    hasSelect : function(list, selector) {
        // 判断是否存在选择符，若存在则返回该对象
        var obj;
        seditorutil.forEach(list, function(element) {
            if (element['selector'] == selector) {
                obj = element;
            }
            return obj;
        });
    },
    dialog:function(url,options){
        art.dialog.open(url,options);
    },
    range : function(obj, defaultValue, maxval, moveCallback, finishedCallback){
        var opts = {
            maxval : parseInt(maxval, 10),
            interval : 1,
            defaultValue : parseInt(defaultValue, 10)
        };
        if(typeof moveCallback == 'function'){
            opts['moveCallback'] = moveCallback;
        }
        if(typeof finishedCallback == 'function'){
            opts['finishedCallback'] = finishedCallback;
        }
        $(obj).slidy(opts);
    },
    resizeable : function(list, callback){
        $.each(list, function(){
            var width,height,posX,posY;
            $(this).mousedown(function(mouse){
                width = $(this).width();
                height = $(this).height();
                posX = parseInt(mouse.pageX,10);
                posY = parseInt(mouse.pageY,10);
            });
        });
    },
    scale: function (o, width, height, callback) {
        o.onmousedown = function (a) {
            var d = document;
            if (!a)a = window.event;
            if (!a.pageX)a.pageX = a.clientX;
            if (!a.pageY)a.pageY = a.clientY;
            var x = a.pageX, y = a.pageY;
            if (o.setCapture)
                o.setCapture();
            else if (window.captureEvents)
                window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
            d.onmousemove = function (a) {
                if (!a)a = window.event;
                if (!a.pageX)a.pageX = a.clientX;
                if (!a.pageY)a.pageY = a.clientY;
                var tx = a.pageX - x, ty = a.pageY - y;
                if (typeof callback !== "function") {
                    callback = false;
                }
                if (callback) {
                    callback(width + tx, height + ty);
                }
            };
            d.onmouseup = function () {
                if (o.releaseCapture)
                    o.releaseCapture();
                else if (window.captureEvents)
                    window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
                d.onmousemove = null;
                d.onmouseup = null;
            };
        };
    },
     drag : function(o,target){
    o.onmousedown=function(a){
        var d=document;if(!a)a=window.event;
        var x=a.layerX?a.layerX:a.offsetX,y=a.layerY?a.layerY:a.offsetY;
        if(o.setCapture)
            o.setCapture();
        else if(window.captureEvents)
            window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
        d.onmousemove=function(a){
            if(!a)a=window.event;
            if(!a.pageX)a.pageX=a.clientX;
            if(!a.pageY)a.pageY=a.clientY;
            var tx=a.pageX-x,ty=a.pageY-y;

            if(target){
                    target.style.left=tx+"px";
                    target.style.top=ty+"px";
            }else{
                    o.style.left=tx+"px";
                    o.style.top=ty+"px";
            }
        };
        d.onmouseup=function(){
            if(o.releaseCapture)
                o.releaseCapture();
            else if(window.captureEvents)
                window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
            d.onmousemove=null;
            d.onmouseup=null;
        };
    };
},
    scaleable : function(obj, callback, opts){
        seditorutil.scale(obj, $(obj).width(), $(obj).height(), callback);
    },
    getTagName : function(obj){
        return obj.tagName.toLowerCase();
    },
    clearAllNode:function(parentNode){
        while (parentNode.firstChild) {
            var oldNode = parentNode.removeChild(parentNode.firstChild);
            oldNode = null;
        }
    },
    getElementSize : function(obj, type){
        var size = $(obj).css(type);
        if(size == 'auto' || size == 'medium' ||size == '' ||size =='normal'){
            size = 0;
        }
        return parseInt(size, 10);
    }

};