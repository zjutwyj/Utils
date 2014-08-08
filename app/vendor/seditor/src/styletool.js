/**
 * @description 模块样式组件
 * @author wyj on 2013/11/25
 */

var styletool = {
    styleContainer : {
        modify : false,
        curModuleId : "",
        curControl : "",
        curSelector : "",
        curPanel : "normal",
        curDrag : null,
        curIndex : 0,
        moduleStyle : {},
        cssRuleList : [],
        cssObjectList : [],
        pictures : [],
        append : '',
        javascript : '',
        css : '',
        moduleContainer : {},
        defaultStyle : {},
        styleId : '',
        containerH :280,
        rootNavList : [],
        result : '',
        treeHover : false,
        resizeHandle : [],
        StyleResFileList : []
    },
    /**
     * @description 入口
     * @method start
     * @param {String} moduleId模块Id
     * @param {Element} curSelector选择符
     * @param {JSON} result样式
     * @author wyj on 14/4/28
     * @example
     * ````styletool.start("hunk_navigator2", "#hunk_navigator2", result);
     */
    start : function( moduleId, curSelector, cssStr){
        this.styleContainer['cssStr'] = cssStr;
        this.updatePanel(moduleId,curSelector);
        this.showPanel();
    },
    updatePanel : function(moduleId, curSelector){
        this.removePanel();
        this.createPanel();
        styletool.styleContainer['curModuleId'] = moduleId;
        styletool.styleContainer['curControl'] = top.$(curSelector);
        styletool.styleContainer['curSelector'] = curSelector;
        //读取缓存数据
        if( !(moduleId in styletool.styleContainer['moduleContainer']) ){
            this.initModuleStyle();
        }
        this.doModuleStyle();
        this.init();
    },
    /**
     * 请求并过滤模块样式
     *
     * @param {String} moduleId 模块ID
     */
    initModuleStyle : function() {
        styletool.styleContainer['result'] = this.getResultByModuleId(styletool.styleContainer['curModuleId']);
        // 1.过滤模块类型
        styletool.filterResult(styletool.styleContainer['result']);
        if (!styletool.styleContainer['moduleStyle'].hasOwnProperty("styleId")) {
            styletool.setDefaultStyle();
        } else {
            styletool.setModuleStyle();
        }
        // 2.保存模型
        styletool.appendToModuleContainer();
    },
    getResultByModuleId : function(moduleId){
        var result;
        if (styletool.styleContainer[moduleId]){
            result = styletool.styleContainer[moduleId];
        } else{
            result = jQuery.parseJSON(styletool.styleContainer['cssStr']);
            styletool.styleContainer[moduleId] = result;
        }
        return result;
    },
    /**
     * 存入模块容器中
     */
    appendToModuleContainer : function(){
        var moduleObject = {
            styleId : styletool.styleContainer['styleId'],
            pictures : styletool.styleContainer['pictures'],
            append : styletool.styleContainer['append'],
            javascript : styletool.styleContainer['javascript'],
            css : styletool.styleContainer['css'],
            modify : false,
            cssRuleList : styletool.styleContainer['cssRuleList'],
            cssObjectList : styletool.styleContainer['cssObjectList']
        };
        styletool.styleContainer['moduleContainer'][styletool.styleContainer['curModuleId']] = moduleObject;
        styletool.styleContainer['result'] = '';
    },
    changePanel : function(type){
        if(typeof type != 'undefined'){
            styletool.styleContainer['curPanel'] = type;
        }
        styletool.removePanel();
        //创建面板
        styletool.createPanel();
        styletool.doModuleStyle();
        styletool.init();
        //显示
        styletool.showPanel();
    },
    showPanel : function(){
        $("#styletool").show();
        $("#styletool-canvas").show();
    },
    removePanel : function(){
        $("#styletool").empty();
        $(".jPicker").remove();
    },
    createPanel : function(){
        switch (styletool.styleContainer['curPanel']){
            case 'normal':
                styletool.createNormalPanel();
                break;
            case 'size' :
                styletool.createSizePanel();
                break;
            case 'background' :
                styletool.createBackgroundPanel();
                break;
            case 'text' :
                styletool.createTextPanel();
                break;
            case 'box' :
                styletool.createBoxPanel();
                break;
            case "hand" :
                styletool.createHandPanel();
                break;
            default :
                styletool.createSizePanel();
                break;
        }
    },
    doModuleStyle : function(){
        var $handleList = $("#styletool .global-area  .handlestyle");
        styletool.initModuleCss($handleList);
    },
    init : function(){
        var ctx = this;
        //绑定全局设置拖动控件
        $.each($('#styletool .style-rating-size'), function() {
            styletool.setSizeHandle($(this));
        });
        $.each($('#styletool .style-rating-opacity'), function() {
            styletool.setOpacityHandle($(this));
        });

        $.each($("#styletool .style-range-add"),function(){
            $(this).click(function(){
                var $handlestyle = styletool.getHandleStyle($(this));
                var num = parseInt($handlestyle.val(),10);
                $handlestyle.val(++num);
                $handlestyle.change();
            });
        });
        $.each($("#styletool .style-range-dec"),function(){
            $(this).click(function(){
                var $handlestyle = styletool.getHandleStyle($(this));
                var num = parseInt($handlestyle.val());
                $handlestyle.val(num == 0 ? num : --num);
                $handlestyle.change();
            });
        });
        //绑定输入框
        $.each($(".sample-input"),function(){
            $(this).change(function(){
                if($(this).attr("name") =='z-index'){
                    styletool.setIndexHandle($(this));
                }
                else{
                    styletool.setInputHandle($(this));
                }
            });
        });
        //绑定颜色控件
        $.each($("#styletool .style-bg-color-span,#styletool .style-border-color,#styletool .color"),function(){
            var defaultcolor = "transparent";
            var $handlestyle = styletool.getHandleStyle($(this));
            var initColor = styleutil.getRuleValue(styletool.styleContainer['cssObjectList'],$(this).attr("name"),styletool.styleContainer['curSelector'])||'transparent';
            var colorOpt ={alphaSupport : true};
            if(initColor == 'transparent'){
                var colorOpt ={alphaSupport : true,active:new $.jPicker.Color({hex:null, a:0})};
            }
            else{
                var colorOpt ={alphaSupport : true,active:new $.jPicker.Color({ hex: initColor })};
            }
            $(this).jPicker({window : {expandable : true},color : colorOpt},function(color, context){
                if(color.val('all') == null){
                    defaultcolor = "transparent";
                }
                else{
                    defaultcolor ="#" + color.val('all').hex;
                }
                styletool.updateCssObjectList(styletool.styleContainer['curSelector'], $handlestyle.attr("name"), defaultcolor);
                styletool.setSiteCss(styletool.styleContainer['curControl'], $handlestyle.attr("name"), defaultcolor);
            },function(color, context){
                defaultvalue = "transparent";
                if(color.val('all') == null){
                    defaultcolor = "transparent";
                }
                else{
                    defaultcolor ="#" + color.val('all').hex;
                }
                styletool.setSiteCss(styletool.styleContainer['curControl'], $handlestyle.attr("name"), defaultcolor);
            });
        });
        $.each($("#styletool .select"),function(){
            var _this = $(this);
            _this.change(function(){
                styletool.setSelectHandle(_this);
            });
        });
        $.each($("#styletool .checkbox"),function(){
            var _this = $(this);
            _this.click(function(){
                styletool.setCheckboxHandle(_this);
            });
        });
        $.each($("#styletool .bg-img-btn"),function(){
            var _this = $(this);
            _this.click(function(){
                var $target = $(this);
                var updateStyleCss = function(url){
                    styletool.setBackgroundHandle($target,'url('+url+')');
                    $target.parents(".handleitem:first").find(".background-image-sample").css('background-image',"url("+url+")");
                }
                art.dialog.open('/common/upload/fiy_upload.html?pageType=styletool&pic_num=1',{
                    id: 'updateStyleCss',
                    title : '选择图片',
                    init : function () {
                        var iframe = this.iframe.contentWindow;
                        iframe.updateStyleCss = updateStyleCss;
                    }
                });

            });
        });

        $.each($("#styletool .bg-image-remove-btn"),function(){
            var _this = $(this);
            _this.click(function(){
                styletool.setBackgroundHandle($(this),'none');
                $(this).parents(".handleitem:first").find(".background-image-sample").css('background-image',"url(themes/default/img/style-bg-image.gif)");
            });
        });

        /*背景位置*/
        $.each($("#styletool .style-bg-pos"),function(){
            $("span",$(this)).bind("click",function(){

                var pre = $(this).attr("class");
                $.each($(this).siblings(),function(){
                    var pre = $(this).attr("class");
                    $(this).attr("class",pre.replace(/\s+[\w|-]*/g,""));
                });
                $(this).addClass(pre + "-selected");

                //设置CSS
                styletool.updateCssObjectList(styletool.styleContainer['curSelector'], "background-position", $(this).attr("value"));
                styletool.setSiteCss(styletool.styleContainer['curControl'], "background-position",  $(this).attr("value"));
            });
        });
    },
    /**
     * 切换模块
     * @param obj 点击选中的模块
     * @return {Object} moduleId,selector
     */
    changeModule : function(obj){
        var moduleId = $(obj).parents(".moveChild:first").attr("data-piece");
        var selector = styletool.getHandleSelector(moduleId, $(obj));
        if(typeof moduleId == 'undefined'){
            moduleId = $(obj).attr("data-piece");
        }
        styletool.styleContainer['curModuleId'] = moduleId;
        styletool.styleContainer['curSelector'] = selector;
        return {
            moduleId : moduleId,
            selector : selector
        };
    },
    getHandleSelector : function(moduleId, obj){
        var selector = "";
        if(typeof moduleId == 'undefined' || moduleId == ''){
            moduleId = $(obj).attr("data-piece");
            selector = "#" + moduleId;
        }
        else{
            selector = "#" + moduleId + " " + styletool.getSelector($(obj));
        }
        return selector;
    },
    closeCanvas : function(){
        $("#styletool-canvas").hide();
    },
    /**
     * 过滤封装数据
     *
     * @param {json} result 请求内容
     */
    filterResult : function(result){
        var ctx = this;
        styletool.styleContainer.StyleResFileList = result;
        styleutil.forEach(styletool.styleContainer.StyleResFileList, function(item){
            if (item['type'] == '02'){
                styletool.styleContainer['defaultStyle'] = item;
            } else{
                styletool.styleContainer['moduleStyle'] = item;
            }
        });
    },
    /**
     * 默认模块样式
     *
     * @param {String} json 模块内容
     */
    setDefaultStyle : function(){
        styletool.filterCss(styletool.styleContainer['defaultStyle']);
        styletool.styleContainer['styleId'] = "";
    },
    /**
     * 分离样式,并存入默认容器中
     *
     * @param {Object} style模块样式
     */
    splitStyle : function(style){
        styletool.styleContainer['pictures'] = $.parseJSON(style['pictures']) || [];
        styletool.styleContainer['css'] = style['css'];
        styletool.styleContainer['js'] = style['js'];
        styletool.styleContainer['append'] = style['append'];
        styletool.styleContainer['styleId'] = style['styleId'];
    },
    filterCss : function(list){
        styletool.splitStyle(list);
        styletool.styleContainer['cssRuleList'] = styleutil.cssRuleList(styletool.styleContainer['css']);
        styletool.styleContainer['cssObjectList'] = styleutil.cssToObject(styletool.styleContainer['cssRuleList']);
    },
    setModuleStyle : function(){
        styletool.filterCss(styletool.styleContainer['moduleStyle']);
    },
    /**
     * 初始化面板CSS
     *
     * @param {Array} handList 操作控件列表
     * @info <input type="text" class="swdwd handlestyle  sdfsdf textfield ewff"  name="height"></input> handlestyle需要处理的控件，text赋值类型，height表示css值
     */
    initModuleCss : function(handleList){
        var types = ["text","textarea","select","checkbox","background-image","background-repeat","background-color","background-position","border-top","border-left","border-right","border-bottom"];
        $.each(handleList,function(){
            var check = "text",name = $(this).attr("name");
            var value = styleutil.getRuleValue(styletool.styleContainer['cssObjectList'],name,styletool.styleContainer['curSelector']);
            for(var i=0,len=types.length;i < len; i++){
                if($(this).attr("class").indexOf(types[i]) != -1){
                    check = types[i];
                    break;
                }
            }
            switch (check) {
                case "text":
                    if(name =='opacity'){
                        $(this).val(value||parseFloat(top.$(styletool.styleContainer['curSelector']).css(name))*100);
                    }
                    else if(name == 'border-radius'){
                        $(this).val(value||parseInt(top.$(styletool.styleContainer['curSelector']).css(name))||0);
                    }
                    else{
                        $(this).val( parseInt(value,10)|| styleutil.getElementSize(styletool.styleContainer['curControl'],name));
                    }
                    break;
                case "textarea":
                    break;
                case "select":
                    if(typeof value == 'undefined' || value == ''){
                        value = top.$(styletool.styleContainer['curSelector']).css(name);
                    }
                    if(typeof value != 'undefined'){
                        $("[value="+value+"]",$(this)).attr("selected","selected");
                    }
                    break;
                case "checkbox" :
                    if(value == $(this).val()){
                        $(this).attr("checked","checked");
                    }
                    break;
                case "background-color" :

                    break;
                case "background-image":
                    var img = styleutil.getRuleValue(styletool.styleContainer['cssObjectList'],$(this).attr("name"),styletool.styleContainer['curSelector'])||'url(themes/default/img/style-bg-image.gif)';
                    $(this).parents(".global-bg-upload:first").find(".background-image-sample").css('background-image',img);
                    break;
                case "background-repeat":
                    break;
                case "background-position":
                    if(typeof value != 'undefined'){
                        $("span",$(this)).filter(function(){
                            return $(this).attr("value") == value;
                        }).addClass(value.replace(" ","-")+"-selected");
                    }
                    break;
                default:
                    $(this).val(parseInt(styleutil.getRuleValue(styletool.styleContainer['cssObjectList'],$(this).attr("name"),styletool.styleContainer['curSelector']),10));
                    break;
            }

        });
    },
    createNormalPanel : function(){
        var str = "<div id=\"global-bg-conf\" class=\"global-area clearfix\">"
            +"<div class=\"global-bg-upload relative clearfix\">"
            +"<div class=\"handleitem clearfix left\">"
            +"<div id=\"global-bg-image\" class=\"background-image-sample left\" ></div>"
            +"<div class=\"left\">"
            + "<p id=\"global-bg-image-btn\" class=\"\">"
            +"<a class=\"bg-img-btn handlestyle background-image\"  name=\"background-image\" href=\"javascript:void(0);\">更改背景</a>"
            +"</p>"
            +"<p style=\"padding-left: 76px; padding-top: 11px;\">"
            +"<span class=\"\">"
            +"<a href=\"javascript:void(0);\"  id=\"global-bg-remove\" class=\"bg-image-remove-btn\"><img width=\"14\" height=\"14\" align=\"absmiddle\" src=\"themes/default/img/style-bg-remove.gif\">移除背景</a>"
            +"</span>"
            +"</p>"
            +"</div>"
            +"</div>"
            +"<p class=\"global-bg-p left\">"
            +"<span class=\"handleitem\"> <span>背景色</span> <span class=\"style-bg-color-span handlestyle background-color\"  name=\"background-color\"></span> </span>"
            +"</p>"
            +"</div>"
            +"<div id=\"global-bg-pos-area\" class=\"global-bg-pos-area\">"
            +"<div id=\"global-bg-pos\" class=\"style-bg-pos clearfix\">"
            +"<div class=\"handleitem handlestyle background-position\" name=\"background-position\">"
            +"<span class=\"top-left\" value=\"top left\">&nbsp;</span> <span class=\"top-center\" value=\"top center\">&nbsp;</span> <span class=\"top-right\" value=\"top right\">&nbsp;</span> "
            +"<span class=\"center-left\" value=\"center left\">&nbsp;</span> <span class=\"center-center\" value=\"center center\">&nbsp;</span>"
            +" <span class=\"center-right\" value=\"center right\">&nbsp;</span> <span class=\"bottom-left\" value=\"bottom left\">&nbsp;</span> <span class=\"bottom-center\" value=\"bottom center\">&nbsp;</span> <span class=\"bottom-right\" value=\"bottom right\">&nbsp;</span>"
            +"</div>"
            +"</div>"
            +"</div>"
            +"<div id=\"global-bg-repeat-area\" class=\"global-bg-repeat-area left\">"
            +"<div id=\"global-bg-repeat\" class=\"style-bg-repeat clearfix\">"
            +"<p class=\"handleitem\">"
            +"<input name=\"background-attachment\" type=\"checkbox\"  class=\"handlestyle checkbox\" default=\"scroll\" value=\"fixed\" id=\"background-attachment\">"+
            "<label  for=\"background-attachment\">背景固定</label>"+
            "</p>"+

            "<p>背景重复</p>"+
            "<div class=\"handleitem\">"+
            "<select name=\"background-repeat\"  class=\"handlestyle style-background-repeat select\">"+
            "<option value=\"repeat\">平铺</option>"+
            "<option value=\"repeat-x\">横向平铺</option>"+
            "<option value=\"repeat-y\">纵向平铺</option>"+
            "<option value=\"no-repeat\">不平铺</option>"+
            "</select>"+
            "</div>"+
            "</div>"+
            "</div>"+

            +"</div>";
        $("#styletool").append($(str));
        var sizeStr = "<div id=\"global-size-conf\" class=\"global-area clearfix\">"
            +"<div class=\"handleitem\">"
            +"<div class=\"style-label left\">宽度</div>"
            +"<div class=\"global-c style-range left\">"
            +"<div id=\"width\" class=\"style-rating-size\"></div>"
            +"</div>"
            +"<div class=\"style-range-area left clearfix\">"
            +"<input class=\"left handlestyle text\" maxval=\"1280\" type=\"text\" value=\"0\" id=\"global-range-input-width\" name=\"width\">"
            +"<div class=\"style-range-handle right\">"
            +"<p>"
            +"<img width=\"15\" height=\"8\" class=\"style-range-add\" src=\"vendor/range/themes/range-up.gif\">"
            +"</p>"
            +"<p>"
            +"<img width=\"15\" height=\"8\" class=\"style-range-dec\" src=\"vendor/range/themes/range-down.gif\">"
            +"</p>"
            +"</div>"
            +"</div>"
            +"</div>"
            +"<div class=\"handleitem\">"
            +"<div class=\"style-label left\">高度</div>"
            +"<div class=\"global-c style-range left\">"
            +"<div class=\"style-rating-size\"></div>"
            +"</div>"
            +"<div class=\"style-range-area left clearfix\">"
            +"<input class=\"left handlestyle text\" maxval=\"500\" type=\"text\"  value=\"0\" id=\"global-range-input-height\" name=\"height\">"
            +"<div class=\"style-range-handle right\">"
            +"<p>"
            +"<img width=\"15\" height=\"8\" class=\"style-range-add\" src=\"vendor/range/themes/range-up.gif\">"
            +"</p>"
            +"<p>"
            +"<img width=\"15\" height=\"8\" class=\"style-range-dec\" src=\"vendor/range/themes/range-down.gif\">"
            +"</p>"
            +"</div>"
            +"</div>"
            +"</div>"
            +"</div>";
        $("#styletool").append($(sizeStr));
        var str = "<div id=\"global-text-conf\" class=\"global-area clearfix\">"
                +"<div class=\"handleitem left\">"
                +"<div class=\"style-label left\">文字</div>"
                +"<div class=\"global-c style-range left\">"
                +"<div id=\"font-size\" class=\"style-rating-size\"></div>"
                +"</div>"
                +"<div class=\"style-range-area left clearfix\">"
                +"<input class=\"left handlestyle text\" maxval=\"50\" type=\"text\" value=\"0\"  name=\"font-size\">"
                +"<div class=\"style-range-handle right\">"
                +"<p>"
                +"<img width=\"15\" height=\"8\" class=\"style-range-add\" src=\"vendor/range/themes/range-up.gif\">"
                +"</p>"
                +"<p>"
                +"<img width=\"15\" height=\"8\" class=\"style-range-dec\" src=\"vendor/range/themes/range-down.gif\">"
                +"</p>"
                +"</div>"
                +"</div>"
                +"</div>"
                +"<div class=\"handleitem left\">"
                +"<div class=\"style-label left\">行高</div>"
                +"<div class=\"global-c style-range left\">"
                +"<div class=\"style-rating-size\"></div>"
                +"</div>"
                +"<div class=\"style-range-area left clearfix\">"
                +"<input class=\"left handlestyle text\" maxval=\"50\" type=\"text\" value=\"0\"  name=\"line-height\">"
                +"<div class=\"style-range-handle right\">"
                +"<p>"
                +"<img width=\"15\" height=\"8\" class=\"style-range-add\" src=\"vendor/range/themes/range-up.gif\">"
                +"</p>"
                +"<p>"
                +"<img width=\"15\" height=\"8\" class=\"style-range-dec\" src=\"vendor/range/themes/range-down.gif\">"
                +"</p>"
                +"</div>"
                +"</div>"
                +"</div>"

                +"</div>"

                +"<div id=\"global-talign-conf\" class=\"global-area clearfix\">"
                +"<div class=\"handleitem\">"
                +"<div class=\"style-label left\">文字对齐</div>"
                +"<div class=\"left clearfix\">"
                + "<select name=\"text-align\" class=\"handlestyle select text-align\">"
                + "<option value=\"left\">左对齐</option>"
                +"<option value=\"center\">居中对齐</option>"
                + "<option value=\"right\">右对齐</option>"
                +"</select>"
                + "</div>"
                + "</div>"

                +"<div class=\"style-label left\">文字颜色</div>"
                +"<div class=\"handleitem left space\">"
                +"<div name=\"color\" class=\"font-color handlestyle color\"></div>"
                +"</div>"
                +"<div class=\"handleitem left\">"
                +"<input name=\"font-weight\" type=\"checkbox\"  class=\"handlestyle checkbox\" default=\"normal\" value=\"bold\" id=\"font-weight\">"
                +"<label  for=\"font-weight\">粗体</label>"
                +"</div>"
                +"<div class=\"handleitem left\">"
                +"<input name=\"font-style\" type=\"checkbox\"  class=\"handlestyle checkbox\" default=\"normal\" value=\"italic\" id=\"font-style\">"
                +"<label  for=\"font-style\">斜体</label>"
                +"</div>"
                +"</div>"



            ;
        $("#styletool").append($(str));

    },
    /**
     * 创建尺寸、定位面板
     */
    createSizePanel : function(){
        var sizeStr = "<div id=\"global-size-conf\" class=\"global-area clearfix\">"
            +"<div class=\"handleitem\">"
            +"<div class=\"style-label left\">宽度</div>"
            +"<div class=\"global-c style-range left\">"
            +"<div id=\"width\" class=\"style-rating-size\"></div>"
            +"</div>"
            +"<div class=\"style-range-area left clearfix\">"
            +"<input class=\"left handlestyle text\" maxval=\"1280\" type=\"text\" value=\"0\" id=\"global-range-input-width\" name=\"width\">"
            +"<div class=\"style-range-handle right\">"
            +"<p>"
            +"<img width=\"15\" height=\"8\" class=\"style-range-add\" src=\"vendor/range/themes/range-up.gif\">"
            +"</p>"
            +"<p>"
            +"<img width=\"15\" height=\"8\" class=\"style-range-dec\" src=\"vendor/range/themes/range-down.gif\">"
            +"</p>"
            +"</div>"
            +"</div>"
            +"</div>"
            +"<div class=\"handleitem\">"
            +"<div class=\"style-label left\">高度</div>"
            +"<div class=\"global-c style-range left\">"
            +"<div class=\"style-rating-size\"></div>"
            +"</div>"
            +"<div class=\"style-range-area left clearfix\">"
            +"<input class=\"left handlestyle text\" maxval=\"500\" type=\"text\"  value=\"0\" id=\"global-range-input-height\" name=\"height\">"
            +"<div class=\"style-range-handle right\">"
            +"<p>"
            +"<img width=\"15\" height=\"8\" class=\"style-range-add\" src=\"vendor/range/themes/range-up.gif\">"
            +"</p>"
            +"<p>"
            +"<img width=\"15\" height=\"8\" class=\"style-range-dec\" src=\"vendor/range/themes/range-down.gif\">"
            +"</p>"
            +"</div>"
            +"</div>"
            +"</div>"
            +"</div>";
        $("#styletool").append($(sizeStr));
        var posStr = "<div id=\"global-pos-conf\" class=\"global-area clearfix\">"
            +"<div class=\"handleitem\">"
            +"<div class=\"style-label left\">定位模式</div>"
            +"<div class=\"left clearfix\">"
            + "<select name=\"position\" class=\"handlestyle select position\">"
            + "<option value=\"static\">静态</option>"
            +"<option value=\"relative\">相对定位</option>"
            + "<option value=\"absolute\">绝对定位</option>"
            +"</select>"
            + "</div>"
            + "</div>"

            +"<div class=\"handleitem\">"
            +"<div class=\"style-label left\">X轴</div>"
            + "<div class=\"style-range-area left clearfix\">"
            + "<input class=\"left handlestyle sample-input text\"  type=\"text\"  value=\"0\"  name=\"left\">"
            + "<div class=\"style-range-handle right\"><p><img width=\"15\" height=\"8\" src=\"vendor/range/themes/range-up.gif\" class=\"style-range-add\"></p><p><img width=\"15\" height=\"8\" src=\"vendor/range/themes/range-down.gif\" class=\"style-range-dec\"></p></div>"
            + "</div>"
            + "</div>"

            + "<div class=\"handleitem\">"
            +"<div class=\"style-label left\">Y轴</div>"
            + "<div class=\"style-range-area left clearfix\">"
            +  "<input class=\"left handlestyle sample-input text\"  type=\"text\"  value=\"0\"  name=\"top\">"
            + "<div class=\"style-range-handle right\"><p><img width=\"15\" height=\"8\" src=\"vendor/range/themes/range-up.gif\" class=\"style-range-add\"></p><p><img width=\"15\" height=\"8\" src=\"vendor/range/themes/range-down.gif\" class=\"style-range-dec\"></p></div>"
            + "</div>"
            + "</div>"

            + "</div>"

            + "<div id=\"global-float-conf\" class=\"global-area clearfix\">"
            + "<div class=\"handleitem\">"
            + "<div class=\"style-label left\">浮动模式</div>"
            + "<div class=\"left clearfix\">"
            + "<select name=\"float\" class=\"handlestyle select float\">"
            + "<option value=\"none\">无</option>"
            + "<option value=\"left\">左浮动</option>"
            + "<option value=\"right\">右浮动</option>"
            +"</select>"
            + "</div>"
            + "</div>"
            +"</div>"

            + "<div id=\"global-overflow-conf\" class=\"global-area clearfix\">"
            + "<div class=\"handleitem\">"
            + "<div class=\"style-label left\">内容溢出</div>"
            + "<div class=\"left clearfix\">"
            + "<select name=\"overflow\" class=\"handlestyle select overflow\">"
            + "<option value=\"hidden\">溢出隐藏</option>"
            + "<option value=\"visible\">溢出显示</option>"
            + "<option value=\"scroll\">滚动条</option>"
            +"</select>"
            + "</div>"
            + "</div>"
            +"</div>"

            + "<div id=\"global-index-conf\" class=\"global-area clearfix\">"
            + "<div class=\"handleitem\">"
            +"<div class=\"style-label left\">层叠顺序</div>"
            + "<div class=\"style-range-area left clearfix\">"
            +  "<input class=\"left handlestyle sample-input text\"  type=\"text\"  value=\"0\"  name=\"z-index\">"
            + "<div class=\"style-range-handle right\"><p><img width=\"15\" height=\"8\" src=\"vendor/range/themes/range-up.gif\" class=\"style-range-add\"></p><p><img width=\"15\" height=\"8\" src=\"vendor/range/themes/range-down.gif\" class=\"style-range-dec\"></p></div>"
            + "</div>"
            + "</div>"
            +"</div>"
            + "<div id=\"global-valign-conf\" class=\"global-area clearfix\">"
            + "<div class=\"handleitem\">"
            + "<div class=\"style-label left\">垂直对齐方式</div>"
            + "<div class=\"left clearfix\">"
            + "<select name=\"vertical-align\" class=\"handlestyle select vertical-align\">"
            + "<option value=\"baseline\">默认</option>"
            + "<option value=\"top\">顶端对齐</option>"
            + "<option value=\"text-top\">文字顶端对齐</option>"
            + "<option value=\"middle\">居中对齐</option>"
            + "<option value=\"text-bottom\">文字底部对齐</option>"
            + "<option value=\"bottom\">底部对齐</option>"
            + "<option value=\"sub\">文本下标对齐</option>"
            + "<option value=\"super\">文本上标对齐</option>"
            +"</select>"
            + "</div>"
            + "</div>"
            +"</div>";

        $("#styletool").append($(posStr));
    },
    /**
     * 创建背景、透明、圆角面板
     */
    createBackgroundPanel : function(){
        var opacity = "<div id=\"global-size-conf\" class=\"global-area clearfix\">"
            +"<div class=\"handleitem\">"
            +"<div class=\"style-label left\">透明</div>"
            +"<div class=\"global-c style-range left\">"
            +"<div class=\"style-rating-opacity\"></div>"
            +"</div>"
            +"<div class=\"style-range-area left clearfix\">"
            +"<input class=\"left handlestyle text\" type=\"text\" maxval=\"100\" value=\"100\" id=\"global-range-input-height\" name=\"opacity\">"
            +"<div class=\"style-range-handle right\">"
            +"<p>"
            +"<img width=\"15\" height=\"8\" class=\"style-range-add\" src=\"vendor/range/themes/range-up.gif\">"
            +"</p>"
            +"<p>"
            +"<img width=\"15\" height=\"8\" class=\"style-range-dec\" src=\"vendor/range/themes/range-down.gif\">"
            +"</p>"
            +"</div>"
            +"</div>"
            +"</div>"
            +"<div class=\"handleitem\">"
            + "<div class=\"style-label left\">圆角</div>"
            + "<div class=\"global-c style-range left\">"
            +"<div class=\"style-rating-size\"></div>"
            + "</div>"
            + "<div class=\"style-range-area left clearfix\">"
            + "<input class=\"left handlestyle text\" type=\"text\" maxval=\"50\" value=\"0\" id=\"global-range-input-height\" name=\"border-radius\">"
            +"<div class=\"style-range-handle right\">"
            + "<p>"
            +     "<img width=\"15\" height=\"8\" class=\"style-range-add\" src=\"vendor/range/themes/range-up.gif\">"
            +   "</p>"
            +  "<p>"
            +     "<img width=\"15\" height=\"8\" class=\"style-range-dec\" src=\"vendor/range/themes/range-down.gif\">"
            +    "</p>"
            +  "</div>"
            +  "</div>"
            + "</div>"
            +   "</div>";
        $("#styletool").append($(opacity));
        var str = "<div id=\"global-bg-conf\" class=\"global-area clearfix\">"
            +"<div class=\"global-bg-upload relative clearfix\">"
            +"<div class=\"handleitem clearfix left\">"
            +"<div id=\"global-bg-image\" class=\"background-image-sample left\" ></div>"
            +"<div class=\"left\">"
            + "<p id=\"global-bg-image-btn\" class=\"\">"
            +"<a class=\"bg-img-btn handlestyle background-image\"  name=\"background-image\" href=\"javascript:void(0);\">更改背景</a>"
            +"</p>"
            +"<p style=\"padding-left: 76px; padding-top: 11px;\">"
            +"<span class=\"\">"
            +"<a href=\"javascript:void(0);\"  id=\"global-bg-remove\" class=\"bg-image-remove-btn\"><img width=\"14\" height=\"14\" align=\"absmiddle\" src=\"themes/default/img/style-bg-remove.gif\">移除背景</a>"
            +"</span>"
            +"</p>"
            +"</div>"
            +"</div>"
            +"<p class=\"global-bg-p left\">"
            +"<span class=\"handleitem\"> <span>背景色</span> <span class=\"style-bg-color-span handlestyle background-color\"  name=\"background-color\"></span> </span>"
            +"</p>"
            +"</div>"
            +"<div id=\"global-bg-pos-area\" class=\"global-bg-pos-area\">"
            +"<div id=\"global-bg-pos\" class=\"style-bg-pos clearfix\">"
            +"<div class=\"handleitem handlestyle background-position\" name=\"background-position\">"
            +"<span class=\"top-left\" value=\"top left\">&nbsp;</span> <span class=\"top-center\" value=\"top center\">&nbsp;</span> <span class=\"top-right\" value=\"top right\">&nbsp;</span> "
            +"<span class=\"center-left\" value=\"center left\">&nbsp;</span> <span class=\"center-center\" value=\"center center\">&nbsp;</span>"
            +" <span class=\"center-right\" value=\"center right\">&nbsp;</span> <span class=\"bottom-left\" value=\"bottom left\">&nbsp;</span> <span class=\"bottom-center\" value=\"bottom center\">&nbsp;</span> <span class=\"bottom-right\" value=\"bottom right\">&nbsp;</span>"
            +"</div>"
            +"</div>"
            +"</div>"
            +"<div id=\"global-bg-repeat-area\" class=\"global-bg-repeat-area left\">"
            +"<div id=\"global-bg-repeat\" class=\"style-bg-repeat clearfix\">"
            +"<p class=\"handleitem\">"
            +"<input name=\"background-attachment\" type=\"checkbox\"  class=\"handlestyle checkbox\" default=\"scroll\" value=\"fixed\" id=\"background-attachment\">"+
            "<label  for=\"background-attachment\">背景固定</label>"+
            "</p>"+

            "<p>背景重复</p>"+
            "<div class=\"handleitem\">"+
            "<select name=\"background-repeat\"  class=\"handlestyle style-background-repeat select\">"+
            "<option value=\"repeat\">平铺</option>"+
            "<option value=\"repeat-x\">横向平铺</option>"+
            "<option value=\"repeat-y\">纵向平铺</option>"+
            "<option value=\"no-repeat\">不平铺</option>"+
            "</select>"+
            "</div>"+
            "</div>"+
            "</div>"+

            +"</div>";
        $("#styletool").append($(str));
    },
    /**
     * 文本、文字面板
     */
    createTextPanel : function(){
        var str = "<div id=\"global-text-conf\" class=\"global-area clearfix\">"
                +"<div class=\"handleitem left\">"
                +"<div class=\"style-label left\">文字</div>"
                +"<div class=\"global-c style-range left\">"
                +"<div id=\"font-size\" class=\"style-rating-size\"></div>"
                +"</div>"
                +"<div class=\"style-range-area left clearfix\">"
                +"<input class=\"left handlestyle text\" maxval=\"50\" type=\"text\" value=\"0\"  name=\"font-size\">"
                +"<div class=\"style-range-handle right\">"
                +"<p>"
                +"<img width=\"15\" height=\"8\" class=\"style-range-add\" src=\"vendor/range/themes/range-up.gif\">"
                +"</p>"
                +"<p>"
                +"<img width=\"15\" height=\"8\" class=\"style-range-dec\" src=\"vendor/range/themes/range-down.gif\">"
                +"</p>"
                +"</div>"
                +"</div>"
                +"</div>"
                +"<div class=\"handleitem left\">"
                +"<div class=\"style-label left\">行高</div>"
                +"<div class=\"global-c style-range left\">"
                +"<div class=\"style-rating-size\"></div>"
                +"</div>"
                +"<div class=\"style-range-area left clearfix\">"
                +"<input class=\"left handlestyle text\" maxval=\"50\" type=\"text\" value=\"0\"  name=\"line-height\">"
                +"<div class=\"style-range-handle right\">"
                +"<p>"
                +"<img width=\"15\" height=\"8\" class=\"style-range-add\" src=\"vendor/range/themes/range-up.gif\">"
                +"</p>"
                +"<p>"
                +"<img width=\"15\" height=\"8\" class=\"style-range-dec\" src=\"vendor/range/themes/range-down.gif\">"
                +"</p>"
                +"</div>"
                +"</div>"
                +"</div>"

                +"</div>"

                +"<div id=\"global-talign-conf\" class=\"global-area clearfix\">"
                +"<div class=\"handleitem\">"
                +"<div class=\"style-label left\">文字对齐</div>"
                +"<div class=\"left clearfix\">"
                + "<select name=\"text-align\" class=\"handlestyle select text-align\">"
                + "<option value=\"left\">左对齐</option>"
                +"<option value=\"center\">居中对齐</option>"
                + "<option value=\"right\">右对齐</option>"
                +"</select>"
                + "</div>"
                + "</div>"

                +"<div class=\"style-label left\">文字颜色</div>"
                +"<div class=\"handleitem left space\">"
                +"<div name=\"color\" class=\"font-color handlestyle color\"></div>"
                +"</div>"
                +"<div class=\"handleitem left\">"
                +"<input name=\"font-weight\" type=\"checkbox\"  class=\"handlestyle checkbox\" default=\"normal\" value=\"bold\" id=\"font-weight\">"
                +"<label  for=\"font-weight\">粗体</label>"
                +"</div>"
                +"<div class=\"handleitem left\">"
                +"<input name=\"font-style\" type=\"checkbox\"  class=\"handlestyle checkbox\" default=\"normal\" value=\"italic\" id=\"font-style\">"
                +"<label  for=\"font-style\">斜体</label>"
                +"</div>"
                +"</div>"

                +"<div id=\"global-space-conf\" class=\"global-area clearfix\">"
                +"<div class=\"handleitem left\">"
                +"<div class=\"style-label left\">文字间距</div>"
                +"<div class=\"global-c style-range left\">"
                +"<div class=\"style-rating-size\"></div>"
                +"</div>"
                +"<div class=\"style-range-area left clearfix\">"
                +"<input class=\"left handlestyle text\" maxval=\"10\" type=\"text\" value=\"0\"  name=\"letter-spacing\">"
                +"<div class=\"style-range-handle right\">"
                +"<p>"
                +"<img width=\"15\" height=\"8\" class=\"style-range-add\" src=\"vendor/range/themes/range-up.gif\">"
                +"</p>"
                +"<p>"
                +"<img width=\"15\" height=\"8\" class=\"style-range-dec\" src=\"vendor/range/themes/range-down.gif\">"
                +"</p>"
                +"</div>"
                +"</div>"
                +"</div>"
                +"</div>"

                +"<div id=\"global-indent-conf\" class=\"global-area clearfix\">"
                +"<div class=\"handleitem left\">"
                +"<div class=\"style-label left\">首行缩进</div>"
                +"<div class=\"global-c style-range left\">"
                +"<div class=\"style-rating-size\"></div>"
                +"</div>"
                +"<div class=\"style-range-area left clearfix\">"
                +"<input class=\"left handlestyle text\" maxval=\"20\" type=\"text\" value=\"0\"  name=\"text-indent\">"
                +"<div class=\"style-range-handle right\">"
                +"<p>"
                +"<img width=\"15\" height=\"8\" class=\"style-range-add\" src=\"vendor/range/themes/range-up.gif\">"
                +"</p>"
                +"<p>"
                +"<img width=\"15\" height=\"8\" class=\"style-range-dec\" src=\"vendor/range/themes/range-down.gif\">"
                +"</p>"
                +"</div>"
                +"</div>"
                +"</div>"
                +"</div>"

            ;
        $("#styletool").append($(str));
    },
    /**
     * 框模型面板
     */
    createBoxPanel : function(){
        //border
        var str = "<div id=\"global-border-conf\" class=\"global-area clearfix\">"
            +"<div class=\"style-border clearfix\">"
            +styletool.createBorderHtml("border-top")
            +styletool.createBorderHtml("border-right")
            +styletool.createBorderHtml("border-bottom")
            +styletool.createBorderHtml("border-left")
            +"</div></div>";
        //padding
        str += "<div id=\"global-padding-conf\" class=\"global-area clearfix\"><div class=\"style-padding clearfix\">"
            +styletool.createPaddingHtml("padding-top","上")
            +styletool.createPaddingHtml("padding-right","右")
            +styletool.createPaddingHtml("padding-bottom","下")
            +styletool.createPaddingHtml("padding-left","左")
            +"</div></div>";
        //margin
        str += "<div id=\"global-margin-conf\" class=\"global-area clearfix\"><div class=\"style-padding clearfix\">"
            +styletool.createMarginHtml("margin-top","上")
            +styletool.createMarginHtml("margin-right","右")
            +styletool.createMarginHtml("margin-bottom","下")
            +styletool.createMarginHtml("margin-left","左")
            +"</div></div>";
        $("#styletool").append($(str));
    },
    createMarginHtml : function(type,txt){
        return "<div class=\"style-margin-item left\">"
            +"<div class=\"style-border-sample space left\">"
            +"<img width=\"23\" height=\"23\" src=\"themes/default/img/style-"+type+".gif\">"
            +"</div>"
            +"<div class=\"left\" style=\"padding-left:20px;\">边距"+txt+"</div>"
            +"<div class=\"handleitem space left\" style=\"padding-left: 45px;\">"
            +"<div class=\"global-c style-range left\">"
            +"<div class=\"style-rating-size\"></div>"
            +"</div>"
            +"<div class=\"style-range-area left clearfix\">"
            +"<input class=\"left handlestyle text\" maxval=\"50\" type=\"text\"  value=\"0\" name=\""+type+"\">"
            +"<div class=\"style-range-handle right\">"
            + "<p>"
            +"<img width=\"15\" height=\"8\" class=\"style-range-add\" src=\"vendor/range/themes/range-up.gif\">"
            +"</p>"
            +"<p>"
            +"<img width=\"15\" height=\"8\" class=\"style-range-dec\" src=\"vendor/range/themes/range-down.gif\">"
            +"</p>"
            +"</div>"
            +"</div>"
            + "</div>"
            +"</div>";
    },
    createPaddingHtml : function(type,txt){
        return "<div class=\"style-padding-item left\">"
            +"<div class=\"style-border-sample space left\">"
            +"<img width=\"23\" height=\"23\" src=\"themes/default/img/style-"+type+".gif\">"
            +"</div>"
            +"<div class=\"left\" style=\"padding-left:20px;\">填充"+txt+"</div>"
            +"<div class=\"handleitem space left\" style=\"padding-left: 45px;\">"
            +"<div class=\"global-c style-range left\">"
            +"<div class=\"style-rating-size\"></div>"
            +"</div>"
            +"<div class=\"style-range-area left clearfix\">"
            +"<input class=\"left handlestyle text\" maxval=\"50\" type=\"text\"  value=\"0\" name=\""+type+"\">"
            +"<div class=\"style-range-handle right\">"
            + "<p>"
            +"<img width=\"15\" height=\"8\" class=\"style-range-add\" src=\"vendor/range/themes/range-up.gif\">"
            +"</p>"
            +"<p>"
            +"<img width=\"15\" height=\"8\" class=\"style-range-dec\" src=\"vendor/range/themes/range-down.gif\">"
            +"</p>"
            +"</div>"
            +"</div>"
            + "</div>"
            +"</div>";
    },
    createBorderHtml : function(type){
        return "<div class=\"style-border-item clearfix\">"
            +"<div class=\"style-border-sample space left\">"
            +"<img width=\"23\" height=\"23\" src=\"themes/default/img/style-"+type+".gif\">"
            +"</div>"
            +"<div class=\"handleitem space style-border-select left\">"
            +"<select name=\""+type+"-style\" class=\"handlestyle select style-border-style\">"
            +"<option value=\"none\">无</option>"
            +"<option value=\"solid\">实线</option>"
            +"<option value=\"dashed\">点</option>"
            +"<option value=\"dotted\">虚线</option>"
            +"<option value=\"double\">双倍</option>"
            + "<option value=\"groove\">凹线</option>"
            +"<option value=\"ridge\">边线</option>"
            +"</select>"
            +"</div>"
            +"<div class=\"handleitem space-m relative left\">"
            +"<div name=\""+type+"-color\" class=\"style-border-color handlestyle\"></div>"
            +"</div>"
            +"<div class=\"handleitem space\">"
            +"<div class=\"global-c style-range left\">"
            +"<div id=\"width\" class=\"style-rating-size\"></div>"
            +"</div>"
            +"<div class=\"style-range-area left clearfix\">"
            +"<input class=\"left handlestyle text\" maxval=\"50\" width=\"100\" type=\"text\" value=\"0\" name=\""+type+"-width\">"
            +"<div class=\"style-range-handle right\">"
            +"<p>"
            +"<img width=\"15\" height=\"8\" class=\"style-range-add\" src=\"vendor/range/themes/range-up.gif\">"
            +"</p>"
            +"<p>"
            +"<img width=\"15\" height=\"8\" class=\"style-range-dec\" src=\"vendor/range/themes/range-down.gif\">"
            +"</p>"
            +"</div>"
            +"</div>"
            +"</div>"
            +"</div>";
    },
    createHandPanel : function(){
        var str = "<div id=\"hand-canvas\">"
            +"<"


            +"</div>";
    },
    getRule : function(){
        var str = "", i = 0,len=styletool.styleContainer['cssRuleList'].length;
        for(i;i < len ; i++){
            //str = styleutil.split(cssRuleList[i], moduleId, )
        }
    },
    updateCss : function(handle,opts){
        $(handle).css(opts);
        for(var key in opts){
            styletool.updateCssObjectList(styletool.getHandleSelector(styletool.styleContainer['curModuleId'],handle),key,opts[key]);
        }
    },
    /**
     * 更新页面样式
     *
     * @param {Element} 拖动控件
     * @param {String} css选择符
     * @param {String} css样式
     */
    setSiteCss : function(handle,name,css){
        $(handle).css(name,css);
        if(top.WebUtils && typeof(top.WebUtils.dashedFrame) === 'function'){
            top.WebUtils.dashedFrame(handle);
        }
    },
    /**
     * 更新CSS对象
     *
     * @param {String} CSS选择符
     * @param {String} CSS值
     */
    updateCssObjectList : function(selector, name, val){
        if(typeof styletool.styleContainer['moduleContainer'][styletool.styleContainer['curModuleId']] == 'undefined'){
            //如果容器中没有相关数据则请求服务器加载数据
            styletool.initModuleStyle(styletool.styleContainer['curModuleId']);
        }
        styleutil.setRuleValue(styletool.styleContainer['moduleContainer'][styletool.styleContainer['curModuleId']]['cssObjectList'], selector, name, val);
    },
    /**
     * 获取控件
     *
     * @param {Element} 元素
     */
    getHandleStyle : function(obj){
        return $(obj).parents(".handleitem:first").find(".handlestyle");
    },
    /**
     * 初始化范围控件
     *
     * @param {Elemnet} $obj 元素
     */
    initHandlestyle : function($obj, moveFn, finishFn){
        var $handlestyle = styletool.getHandleStyle($obj);
        styleutil.range($obj, $handlestyle.val(),  $handlestyle.attr("maxval"), moveFn, finishFn);
    },
    /**
     * 为文本框绑定range控件
     *
     * @parram {Array} 文本列表
     * @param {Element} range控件
     */
    bindTextEvent : function(textList,rangeObj,moveFn, finishFn,action){
        $.each(textList,function(){
            var _this = $(this);
            _this.change(function(){
                styletool.initHandlestyle(rangeObj, moveFn, finishFn);
                if(typeof action == 'function'){
                    action();
                }
            });
            styleutil.keyEvent(_this.get(0),'onkeydown',function(keycode){
                if(keycode == 38 ){
                    _this.val(parseInt(_this.val())+1);
                    _this.change();
                }
                else if(keycode == 40){
                    _this.val(parseInt(_this.val())-1);
                    _this.change();
                }
            });
        });
    },
    /**
     * 设置width,height,padding,margin,border-width等CSS
     *
     * @param {Element} 设置元素
     */
    setSizeHandle : function($obj){
        var handleStyle = styletool.getHandleStyle($obj);

        styletool.initHandlestyle($obj, function(value) {
            handleStyle.val(value);
            styletool.setSiteCss(styletool.styleContainer['curControl'], handleStyle.attr("name"), value + "px");
        }, function(value) {
            styletool.updateCssObjectList(styletool.styleContainer['curSelector'], handleStyle.attr("name"), value + "px");
            styletool.setSiteCss(styletool.styleContainer['curControl'], handleStyle.attr("name"), value + "px");
        });

        styletool.bindTextEvent(handleStyle, $obj, function(value) {
            handleStyle.val(value);
            styletool.setSiteCss(styletool.styleContainer['curControl'], handleStyle.attr("name"), value + "px");
        }, function(value) {
            styletool.updateCssObjectList(styletool.styleContainer['curSelector'], handleStyle.attr("name"), value + "px");
            styletool.setSiteCss(styletool.styleContainer['curControl'], handleStyle.attr("name"), value + "px");
        },function(){
            styletool.updateCssObjectList(styletool.styleContainer['curSelector'], handleStyle.attr("name"), handleStyle.val() + "px");
            styletool.setSiteCss(styletool.styleContainer['curControl'], handleStyle.attr("name"), handleStyle.val() + "px");
        });
    },
    setInputHandle : function($obj){
        styletool.updateCssObjectList(styletool.styleContainer['curSelector'], $obj.attr("name"), parseInt($obj.val(),10) + "px");
        styletool.setSiteCss(styletool.styleContainer['curControl'], $obj.attr("name"), parseInt($obj.val(),10) + "px");
    },
    setIndexHandle : function($obj){
        styletool.updateCssObjectList(styletool.styleContainer['curSelector'], $obj.attr("name"), parseInt($obj.val(),10));
        styletool.setSiteCss(styletool.styleContainer['curControl'], $obj.attr("name"), parseInt($obj.val(),10));
    },
    /**
     * 设置透明度
     *
     * @param {Elemnet} 设置元素
     */
    setOpacityHandle : function($obj){
        var handleStyle = styletool.getHandleStyle($obj);

        styletool.initHandlestyle($obj, function(value) {
            handleStyle.val(value);
            styletool.setSiteCss(styletool.styleContainer['curControl'], handleStyle.attr("name"), value/100);
        }, function(value) {
            styletool.updateCssObjectList(styletool.styleContainer['curSelector'], handleStyle.attr("name"), value/100);
            styletool.setSiteCss(styletool.styleContainer['curControl'], handleStyle.attr("name"), value/100);
        });

        styletool.bindTextEvent(handleStyle, $obj, function(value) {
            handleStyle.val(value);
            styletool.setSiteCss(styletool.styleContainer['curControl'], handleStyle.attr("name"), value/100);
        }, function(value) {
            styletool.updateCssObjectList(styletool.styleContainer['curSelector'], handleStyle.attr("name"), value/100);
            styletool.setSiteCss(styletool.styleContainer['curControl'], handleStyle.attr("name"), value/100);
        },function(){
            styletool.updateCssObjectList(styletool.styleContainer['curSelector'], handleStyle.attr("name"), parseInt(handleStyle.val(),10)/100);
            styletool.setSiteCss(styletool.styleContainer['curControl'], handleStyle.attr("name"), parseInt(handleStyle.val(),10)/100);
        });
    },
    /**
     * 设置选择框
     *
     * @param {Elemnet} $obj
     */
    setSelectHandle : function($obj){
        var handleStyle = styletool.getHandleStyle($obj);
        styletool.updateCssObjectList(styletool.styleContainer['curSelector'], handleStyle.attr("name"), $("option:selected",handleStyle).val());
        styletool.setSiteCss(styletool.styleContainer['curControl'], handleStyle.attr("name"),  $("option:selected",handleStyle).val());
    },
    /**
     * 设置勾选框
     *
     * @param {Element} $obj
     */
    setCheckboxHandle : function($obj){
        var handleStyle = styletool.getHandleStyle($obj);
        var isCheck = $(handleStyle).attr("checked");
        styletool.updateCssObjectList(styletool.styleContainer['curSelector'], handleStyle.attr("name"),isCheck? handleStyle.val() : handleStyle.attr("default"));
        styletool.setSiteCss(styletool.styleContainer['curControl'],handleStyle.attr("name"),isCheck? handleStyle.val() : handleStyle.attr("default"));
    },
    /**
     * 设置背景
     *
     * @param {Elemnet} 设置元素
     */
    setBackgroundHandle : function($obj, val){
        var handleStyle = styletool.getHandleStyle($obj);
        styletool.updateCssObjectList(styletool.styleContainer['curSelector'], handleStyle.attr("name"), val);
        styletool.setSiteCss(styletool.styleContainer['curControl'], handleStyle.attr("name"),  val);
    },
    getStyle : function(){
        var curModule = styletool.styleContainer['moduleContainer'][styletool.styleContainer['curModuleId']];
        curModule['css'] = styleutil.getCssJSON(curModule['cssObjectList']);
        return {
            id:curModule['styleId'],
            moduleId : curModule['curModuleId'],
            css : curModule['css'],
            append : curModule['append'],
            javascript:curModule['javascript'],
            pictures : curModule['pictures'].join("")
        }
    },
    /**
     * 保存模块样式
     */
    saveStyle : function(){
        var curModule = styletool.styleContainer['moduleContainer'][styletool.styleContainer['curModuleId']];
        curModule['css'] = styleutil.getCssJSON(curModule['cssObjectList']);
        alert(curModule['css']);
        $.ajax({
            type:"post",
            url:"/rest/modulestyle/save",
            data:{
                id:curModule['styleId'],
                moduleId : curModule['curModuleId'],
                css : curModule['css'],
                append : curModule['append'],
                javascript:curModule['javascript'],
                pictures : curModule['pictures'].join("")
            },
            success:function(){
                art.dialog.tips("保存成功",1);
            }
        });
    },
    highlight : function(selector, type){
        var display = "block";
        if(typeof type !='undefined' && type == 'show'){
            styletool.styleContainer['treeHover'] = true;
            display = "block";
        }
        else if(styletool.styleContainer['treeHover']){
            dislay = "block";
        }
        else{
            display = "none";
        }
        var _selector = $(selector),
            width = _selector.width(),
            height = _selector.height(),
            left = parseInt(_selector.offset().left,10),
            toppos = parseInt(_selector.offset().top,10);
        var marginleft =styleutil.getElementSize( _selector,"margin-left"),
            margintop = styleutil.getElementSize( _selector,"margin-top"),
            marginright = styleutil.getElementSize( _selector,"margin-right"),
            marginbottom =styleutil.getElementSize( _selector,"margin-bottom"),
            paddingtop = styleutil.getElementSize( _selector,"padding-top"),
            paddingright = styleutil.getElementSize( _selector,"padding-right"),
            paddingbottom =styleutil.getElementSize( _selector,"padding-bottom"),
            paddingleft= styleutil.getElementSize( _selector,"padding-left"),
            bordertopwidth = styleutil.getElementSize( _selector,"border-top-width"),
            borderrightwidth = styleutil.getElementSize( _selector,"border-right-width"),
            borderbottomwidth = styleutil.getElementSize( _selector,"border-bottom-width"),
            borderleftwidth = styleutil.getElementSize( _selector,"border-left-width");
        var  left = left-  borderleftwidth - marginleft,
            toppos = toppos- bordertopwidth -margintop;

        var zIndex =styleutil.getElementSize(_selector,"z-index");
        styletool.styleContainer['highlight'] = $("#style-outer");
        if(!(styletool.styleContainer['highlight'].size() > 0)){
            styletool.styleContainer['highlight'] = $("<div id='style-outer'><div id='style-highlight' style='z-index:9001;border-style:solid;background:#214FA3;position:absolute;'><div class='style-inner' style='background:#2288cc;width:100%;height:100%;font-size:10px;'>z-index: "+zIndex+"&nbsp;</div></div></div>");
            $("body").append(styletool.styleContainer['highlight']);
        }
        styletool.styleContainer['highlight'].find("#style-highlight").css({
            width : width+ "px",
            height : height  + "px",
            'margin-top' :margintop+ "px",
            'margin-right':marginright+ "px" ,
            'margin-bottom':marginbottom + "px",
            'margin-left':marginleft+ "px" ,
            'padding-top':paddingtop+ "px",
            'padding-right':paddingright+ "px" ,
            'padding-bottom':paddingbottom+ "px" ,
            'padding-left':paddingleft+ "px" ,
            'border-top-width' : bordertopwidth+ "px",
            'border-right-width' : borderrightwidth+ "px",
            'border-bottom-width' : borderbottomwidth+ "px",
            'border-left-width' : borderleftwidth+ "px"
        });

        $(styletool.styleContainer['highlight']).css({
            opacity : 0.4,
            position:'absolute',
            'z-index' : 9000,
            'background-color' : 'yellow',
            top : toppos  +"px",
            left : left +"px",
            display : display,
            width : (width + marginleft + borderleftwidth+paddingleft + paddingright + borderrightwidth + marginright) + "px" ,
            height : (height + margintop + bordertopwidth + paddingtop + paddingbottom + borderbottomwidth + marginbottom) + "px"
        });
    },
    hidelight : function(type){
        if(typeof type != 'undefined' && type == 'tree'){
            styletool.styleContainer['treeHover'] = false;
        }
        $(styletool.styleContainer['highlight']).hide();
    },
    /**
     * 显示模块DOM目录
     *
     */
    drowDomTree : function(){
        var module = $("#" + styletool.styleContainer['curModuleId']);
        $("#dom-tree").empty().append(styletool.createDomTree(module));
    },
    createDomTree : function(parent){
        var root = $("<ul class=\"ul-navList\"></ul>"), grade = 1;
        var module = styletool.createElement(styletool.bulidItem(parent,styleutil.getTagName(parent[0]),grade))
        var sub = $("<ul class=\"grade"+(++grade)+"-ul\" style=\"\"></ul>");
        var children = parent.children();
        for(var i = 0,len = children.size();i < len ;i++){
            var curNode = children.get(i);
            $(sub).append(styletool.bulidSub(curNode,styletool.createElement(styletool.bulidItem(curNode,styleutil.getTagName(parent[0]),grade)),grade));
        }
        $(module).append(sub);
        $(root).append(module);
        return root;
    },
    bulidSub : function(parent,frameset,grade){
        var curNode = $(parent);
        grade = ++grade;
        if($(parent).children().size() > 0){
            if(grade > 5){ grade = 5;}
            var sub = $("<ul class=\"grade"+grade+"-ul\" style=\"\"></ul>");
            for(var i = 0,len = $(parent).children().size();i < len;i++){
                var obj = $(parent).children().get(i);
                var item = styletool.bulidItem(obj, styleutil.getTagName(obj), grade);
                if($(obj).children().size() > 0){
                    $(sub).append(styletool.bulidSub(obj,styletool.createElement(item),(grade+1)));
                }
                else{
                    $(sub).append(styletool.createElement(item));
                }
            }
            $(frameset).append(sub);
        }
        return frameset;
    },
    hasChildNode : function(element){
        return $(element).children().size() > 0 ? true:false;
    },
    createElement : function(item) {
        var _cls = 'button blue'+item.grade;
        var _extend = "";

        if (item.hasChild) {
            _extend = "<span class=\"open\" onclick=\"styletool.extendTree(this)\">&nbsp;</span>";
        } else {
            _extend = "<span class=\"open\" onclick=\"styletool.extendTree(this)\">&nbsp;</span>";
        }

        var str = "<li class=\"grade"+item.grade+"\"><div class=\"item-li\">" + _extend
            + "<a onmouseover=\"styletool.highlight('"+item.selector+"','show')\" onmouseout=\"styletool.hidelight('tree')\" onclick=\"styletool.treeClick(this,'"+item.curModuleId+"','"+item.selector+"')\" href=\"javascript:;\" class=\"a-btn-static " + _cls
            + "\">&lt;" + item.name +" id=\""+item['id']+"\"  class=\""+item['className']+"\"&gt;" +item['title'].substring(0,10)+ "</a></div></li>";
        return $(str);
    },
    treeClick : function(obj,moduleId,selector){
        $("#dom-tree").find(".select").removeClass("select");
        $(obj).addClass("select");
        styletool.start(moduleId,selector);
    },
    extendTree : function(obj) {
        var _cls = $(obj).hasClass("open");
        if (_cls) {
            $(obj).removeClass("open");
            $(obj).addClass("close");
            $(obj).parent().siblings("ul").hide();
        }
        else {
            $(obj).removeClass("close");
            $(obj).addClass("open");
            $(obj).parent().siblings("ul").show();
        }
    },
    bulidItem : function(node,name,grade) {
        var item = {};
        var $node =$(node);
        var title = $node.attr("title");
        item['hasChild'] = styletool.hasChildNode(node);
        item['curModuleId'] = styletool.styleContainer['curModuleId'];
        if("#" + styletool.styleContainer['curModuleId'] == styletool.getSelector(node)){
            item['selector'] = "#" + styletool.styleContainer['curModuleId']
        }
        else{
            item['selector'] = "#" + styletool.styleContainer['curModuleId'] + " " +styletool.getSelector(node);
        }
        item['name'] = name;
        item['grade'] = grade;
        if($.trim(title) !=''){
            title = "【" +title+"】";
        }
        item['title'] =title||'';
        item['className'] = $node.attr("class");
        item['id'] = $node.attr("id");
        return item;
    },
    getSelector : function(obj){
        var selector = "";
        var id = $(obj).attr("id");
        var className = $(obj).attr("class");
        if(id != '' && typeof id !='undefined'){
            selector ="#" + id;
        }
        else if(className != '' && typeof className !='undefined'){
            selector = "."+className.split(" ")[0];
        }
        else{
            selector = styleutil.getTagName(obj);
            selector = arguments.callee(obj.parentNode) + " " + selector;
        }
        return selector;
    },
    appendResizableHandle : function(obj){
        $(styletool.styleContainer['resizeHandle']).remove();
        var str = "<div class=\"style-resizable-handle style-resizable-n\"><p class=\"handle N\"></p>"
            + "</div>"
            + "<div class=\"style-resizable-handle style-resizable-s\"><p class=\"handle S\" ></p>"
            + "</div>"
            +"<div class=\"style-resizable-handle style-resizable-e\"><p class=\"handle E\"></p>"
            + "</div>"
            +"<div class=\"style-resizable-handle style-resizable-w\"><p class=\"handle W\"></p>"
            +"</div>"
            + "<div class=\"style-resizable-handle style-resizable-se\"><p class=\"handle SE\"></p>"
            + "</div>"
            +"<div class=\"style-resizable-handle style-resizable-sw\"><p class=\"handle SW\" ></p>"
            +"</div>"
            + "<div class=\"style-resizable-handle style-resizable-nw\"><p class=\"handle NW\" ></p>"
            +"</div>"
            + "<div class=\"style-resizable-handle style-resizable-ne\"><p class=\"handle NE\" ></p>"
            + "</div>";
        styletool.styleContainer['resizeHandle'] = $(str);
        styleutil.resizeable(styletool.styleContainer['resizeHandle']);
        $(obj).append(styletool.styleContainer['resizeHandle']);
    },
    /**
     * 为元素绑定可编辑
     * @param obj
     */
    bindEditable : function(obj){
        $(obj).bind("click",function(){
            styletool.editable($(this));
            return false;
        });
        $(obj).bind("dblclick",function(){
            var result = styletool.changeModule($(this));
            styletool.start(result['moduleId'], result['selector']);
            return false;
        });
    },
    editable : function(obj){
        var _this = $(obj);
        styletool.styleContainer['curDrag'] = null;
        styletool.styleContainer['curIndex'] = styleutil.getElementSize(_this,"z-index");
        var selector = styletool.changeModule(_this).selector;
        styletool.updatePanel(styletool.styleContainer['curModuleId'],styletool.styleContainer['curSelector']);
        styletool.appendResizableHandle(_this);
        var position = _this.css("position");
        if(position == 'relative'){
            styletool.styleContainer['curDrag'] = _this.drag("start", function(ev,dd){
                dd.attr =$( ev.target ).prop("className");
                dd.width = _this.width();
                dd.height = _this.height();
                dd.left = _this.offset().left;
                dd.top = _this.offset().top;
            }).drag('end',function(ev,dd){
                styletool.updateCssObjectList(selector, "width", (dd.width + dd.deltaX) +"px");
                styletool.updateCssObjectList(selector, "height", (dd.height + dd.deltaY) +"px");
                return false;
            }).drag(function(ev,dd){
                var props = {};
                if (dd.attr.indexOf("SE") > -1){
                    //右下
                    props.height = Math.max( 32, dd.height + dd.deltaY );
                    props.width = Math.max( 32, dd.width + dd.deltaX );
                }
                else if ( dd.attr.indexOf("E") > -1 ){
                    props.width = Math.max( 32, dd.width + dd.deltaX );
                }
                else if ( dd.attr.indexOf("S") > -1 ){
                    props.height = Math.max( 32, dd.height + dd.deltaY );
                }
                else if ( dd.attr.indexOf("W") > -1 ){
                    props.width = Math.max( 32, dd.width - dd.deltaX );
                    props.left = dd.originalX + dd.width - props.width;
                }
                else if ( dd.attr.indexOf("N") > -1 ){
                    props.height = Math.max( 32, dd.height - dd.deltaY );
                    props.top = dd.originalY + dd.height - props.height;
                }
                _this.css( props );
            },{handle: '.handle'});
        }
        else{
            styletool.styleContainer['curDrag'] = _this.drag("start",function( ev, dd ){
                dd.attr =$( ev.target ).prop("className");
                dd.className = "editable";
                dd.width = _this.width();
                dd.height = _this.height();
                dd.left = _this.offset().left;
                dd.top = _this.offset().top;
            }).drag("end",function( ev, dd ){
                styletool.updateCssObjectList(selector, "width", (dd.width + dd.deltaX) +"px");
                styletool.updateCssObjectList(selector, "height", (dd.height + dd.deltaY) +"px");
                styletool.updateCssObjectList(selector, "left", _this.offset().left +"px");
                styletool.updateCssObjectList(selector, "top", _this.offset().top +"px");
                return false;
            }).drag(function( ev, dd ){
                var props = {};
                if (dd.attr.indexOf("SE") > -1){
                    //右下
                    props.height = Math.max( 32, dd.height + dd.deltaY );
                    props.width = Math.max( 32, dd.width + dd.deltaX );
                }
                else if(dd.attr.indexOf("NW") > -1){
                    //左上
                    props.height = dd.height - dd.deltaY;
                    props.width = dd.width - dd.deltaX;
                    props.left = dd.left  + dd.deltaX;
                    props.top = dd.top  + dd.deltaY;
                }
                else if(dd.attr.indexOf("SW") > -1){
                    //左下
                    props.height = dd.height + dd.deltaY;
                    props.width = dd.width - dd.deltaX;
                    props.left = dd.left  + dd.deltaX;
                }
                else if(dd.attr.indexOf("NE") > -1){
                    //右上
                    props.height = dd.height - dd.deltaY ;
                    props.width = dd.width + dd.deltaX ;
                    props.top = dd.top + dd.deltaY;
                    //props.left = dd.left+ dd.deltaX;
                }
                else if ( dd.attr.indexOf("E") > -1 ){
                    props.width = Math.max( 32, dd.width + dd.deltaX );
                }
                else if ( dd.attr.indexOf("S") > -1 ){
                    props.height = Math.max( 32, dd.height + dd.deltaY );
                }
                else if ( dd.attr.indexOf("W") > -1 ){
                    props.width = Math.max( 32, dd.width - dd.deltaX );
                    props.left = dd.originalX + dd.width - props.width;
                }
                else if ( dd.attr.indexOf("N") > -1 ){
                    props.height = Math.max( 32, dd.height - dd.deltaY );
                    props.top = dd.originalY + dd.height - props.height;
                }
                else if ( dd.className.indexOf("editable") > -1 ){
                    props.top = dd.offsetY;
                    props.left = dd.offsetX;
                }
                _this.css( props );
            });
        }
        return false;
    }
};
