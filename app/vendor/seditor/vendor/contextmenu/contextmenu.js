(function ($) {
    var menu, shadow, trigger, content, hash, currentTarget;
    var defaults = {
        eventPosX: 'pageX',
        eventPosY: 'pageY',
        shadow : true,
        onContextMenu: null,
        onShowMenu: null,
        target : window
    };
    $.fn.contextMenu = function (id, options) {
        if (!menu) {                                      // Create singleton menu
            menu = $('<div id="jqContextMenu" class="jqContextMenu"></div>')
                .hide()
                .css({position: 'absolute', zIndex: '500'})
                .appendTo('body')
                .bind('click', function (e) {
                    e.stopPropagation();
                });
        }
        if (!shadow) {
            shadow = $('<div></div>')
                .css({backgroundColor: '#000', position: 'absolute', opacity: 0.2, zIndex: 499})
                .appendTo('body')
                .hide();
        }
        hash = hash || [];
        hash.push({
            id: id,
            bindings: options.bindings || {},
            shadow: options.shadow || options.shadow === false ? options.shadow : defaults.shadow,
            onContextMenu: options.onContextMenu || defaults.onContextMenu,
            onShowMenu: options.onShowMenu || defaults.onShowMenu,
            eventPosX: options.eventPosX || defaults.eventPosX,
            eventPosY: options.eventPosY || defaults.eventPosY,
            target : options.target || defaults.target
        });

        var index = hash.length - 1;
        $(this).bind('contextmenu', function (e) {
            // Check if onContextMenu() defined
            var bShowContext = (!!hash[index].onContextMenu) ? hash[index].onContextMenu(e) : true;
            if (bShowContext) display(index, this, e, options);
            return false;
        });
        return this;
    };
    var getContextMenu = function(target){
        var hasSEdit = $(target).hasClass('sEdit');
        var hasIEdit = $(target).hasClass('iEdit');
        var hasTEdit = $(target).hasClass('tEdit');
        var hasPEdit = $(target).hasClass('pEdit');
        var hasNEdit = $(target).hasClass('nEdit');
        var $menu = $('<div class="contextMenu" id="moduleMenu"><ul></ul></div>');
        if(hasIEdit){
            $('ul',$menu).append('<li id="iEdit">编辑图片</li>');
        }
        if(hasTEdit){
            $('ul',$menu).append('<li id="tEdit">编辑文字</li>');
        }
        if (hasPEdit){
            $('ul',$menu).append('<li id="pEdit">编辑产品</li>');
        }
        if (hasNEdit){
            $('ul', $menu).append('<li id="nEdit">编辑新闻</li>');
        }
        if(hasSEdit){
            $('ul',$menu).append('<li id="sEdit">编辑样式</li>');
        }
        //$('ul',$menu).append('<li id="aEdit">添加内容</li>');
        return $menu;
    }
    function display(index, trigger, e, options) {
        var cur = hash[index];
        content = getContextMenu(options.target);
        content.addClass('menuStyle').find('li').addClass('itemStyle').hover(
            function () {
                $(this).addClass('itemHoverStyle');
            },
            function () {
                $(this).removeClass('itemHoverStyle');
            }
        ).find('img').css({verticalAlign: 'middle', paddingRight: '2px'});

        // Send the content to the menu
        menu.html(content);

        // if there's an onShowMenu, run it now -- must run after content has been added
        // if you try to alter the content variable before the menu.html(), IE6 has issues
        // updating the content
        if (!!cur.onShowMenu) menu = cur.onShowMenu(e, menu);

        $.each(cur.bindings, function (id, func) {
            $('#' + id, menu).bind('click', function (e) {
                hide();
                func(trigger, currentTarget);
            });
        });

        menu.css({'left': e[cur.eventPosX], 'top': e[cur.eventPosY]}).show();
        if (cur.shadow) shadow.css({width: menu.width(), height: menu.height(), left: e.pageX + 2, top: e.pageY + 2}).show();
        $(document).one('click', hide);
    }

    function hide() {
        menu.hide();
        shadow.hide();
    }

    // Apply defaults
    $.contextMenu = {
        defaults: function (userDefaults) {
            $.each(userDefaults, function (i, val) {
                if (typeof val == 'object' && defaults[i]) {
                    $.extend(defaults[i], val);
                }
                else defaults[i] = val;
            });
        }
    };

})(jQuery);

$(function () {
    $('div.contextMenu').hide();
});