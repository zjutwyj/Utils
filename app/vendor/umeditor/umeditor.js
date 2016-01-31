/*!
 * UEditor Mini版本
 * version: 1.2.2
 * build: Wed Mar 19 2014 17:14:25 GMT+0800 (中国标准时间)
 */

(function($){







/**
 * 全屏组件
 */




UM.registerUI('forecolor backcolor', function( name ) {
    function getCurrentColor() {
        return domUtils.getComputedStyle( $colorLabel[0], 'background-color' );
    }

    var me = this,
        $colorPickerWidget = null,
        $colorLabel = null,
        $btn = null;

    //querycommand
    this.addListener('selectionchange', function(){

        var state = this.queryCommandState( name );
        $btn.edui().disabled( state == -1 ).active( state == 1 );

    });

    $btn = $.eduicolorsplitbutton({
        icon: name,
        caret: true,
        name: name,
        title: me.getLang("labelMap")[name],
        click: function() {
            me.execCommand( name, getCurrentColor() );
        }
    });

    $colorLabel = $btn.edui().colorLabel();

    $colorPickerWidget = $.eduicolorpicker({
        name: name,
        lang_clearColor: me.getLang('clearColor') || '',
        lang_themeColor: me.getLang('themeColor') || '',
        lang_standardColor: me.getLang('standardColor') || ''
    })
        .on('pickcolor', function( evt, color ){
            window.setTimeout( function(){
                $colorLabel.css("backgroundColor", color);
                me.execCommand( name, color );
            }, 0 );
        })
        .on('show',function(){
            UM.setActiveWidget( colorPickerWidget.root() );
        }).css('zIndex',me.getOpt('zIndex') + 1);

    $btn.edui().on('arrowclick',function(){
        if(!$colorPickerWidget.parent().length){
            me.$container.find('.edui-dialog-container').append($colorPickerWidget);
        }
        $colorPickerWidget.edui().show($btn,{
            caretDir:"down",
            offsetTop:-5,
            offsetLeft:8,
            caretLeft:11,
            caretTop:-8
        });
        UM.setTopEditor(me);
    }).register('click', $btn, function () {
            $colorPickerWidget.edui().hide()
        });

    return $btn;

});

})(jQuery)