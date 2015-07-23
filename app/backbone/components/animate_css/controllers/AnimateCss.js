/**
 * @description AnimateCss
 * @class AnimateCss
 * @author yongjin<zjut_wyj@163.com> 2015/3/25
 */
define('AnimateCss', ['template/animate_css_view'], function (require, exports, module) {
  var template = require('template/animate_css_view');
  var AnimateCss = BaseView.extend({
    events: {
      'change #model-delay': 'setDelay',
      'change #model-duration': 'setDuration',
      'change #model-count': 'setCount'
    },
    initialize: function () {
      this.options.data = this.options.data || {};
      this.curAnimate = this.options.data.animate;
      this.curDuration = this.options.data.duration;
      this.curDelay = this.options.data.delay;
      this.zIndex = this.options.data.zIndex ? parseInt(this.options.data.zIndex, 10) : 0;
      this._initialize({
        template: template
      });
      this.source = {
        bounce: { text: '上下弹跳', value: '@keyframes bounce { 0%, 20%, 53%, 80%, 100% { transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000); transform: translate3d(0,0,0); } 40%, 43% { transition-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060); transform: translate3d(0, -30px, 0); } 70% { transition-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060); transform: translate3d(0, -15px, 0); } 90% { transform: translate3d(0,-4px,0); } } .bounce { animation-name: bounce; transform-origin: center bottom; }'},
        flash: { text: '闪烁效果', value: '@keyframes flash { 0%, 50%, 100% { opacity: 1; } 25%, 75% { opacity: 0; } } .flash { animation-name: flash; }'},
        pulse: { text: '脉搏效果', value: '@keyframes pulse { 0% { transform: scale3d(1, 1, 1); } 50% { transform: scale3d(1.05, 1.05, 1.05); } 100% { transform: scale3d(1, 1, 1); } } .pulse { animation-name: pulse; }'},
        rubberBand: { text: '橡皮带伸缩', value: '@keyframes rubberBand { 0% { transform: scale3d(1, 1, 1); } 30% { transform: scale3d(1.25, 0.75, 1); } 40% { transform: scale3d(0.75, 1.25, 1); } 50% { transform: scale3d(1.15, 0.85, 1); } 65% { transform: scale3d(.95, 1.05, 1); } 75% { transform: scale3d(1.05, .95, 1); } 100% { transform: scale3d(1, 1, 1); } } .rubberBand { animation-name: rubberBand; } '},
        shake: { text: '左右摇动', value: '@keyframes shake { 0%, 100% { transform: translate3d(0, 0, 0); } 10%, 30%, 50%, 70%, 90% { transform: translate3d(-10px, 0, 0); } 20%, 40%, 60%, 80% { transform: translate3d(10px, 0, 0); } } .shake { animation-name: shake; } '},
        swing: { text: '摇摆效果', value: '@keyframes swing { 20% { transform: rotate3d(0, 0, 1, 15deg); } 40% { transform: rotate3d(0, 0, 1, -10deg); } 60% { transform: rotate3d(0, 0, 1, 5deg); } 80% { transform: rotate3d(0, 0, 1, -5deg); } 100% { transform: rotate3d(0, 0, 1, 0deg); } } .swing { transform-origin: top center; animation-name: swing; } '},
        tada: { text: '闹铃效果', value: '@keyframes tada { 0% { transform: scale3d(1, 1, 1); } 10%, 20% { transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg); } 30%, 50%, 70%, 90% { transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg); } 40%, 60%, 80% { transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg); } 100% { transform: scale3d(1, 1, 1); } } .tada { animation-name: tada; } '},
        wobble: { text: '摇晃效果', value: '@keyframes wobble { 0% { transform: none; } 15% { transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg); } 30% { transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg); } 45% { transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg); } 60% { transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg); } 75% { transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg); } 100% { transform: none; } } .wobble { animation-name: wobble; } '},
        bounceIn: { text: '弹入效果', value: '@keyframes bounceIn { 0%, 20%, 40%, 60%, 80%, 100% { transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000); } 0% { opacity: 0; transform: scale3d(.3, .3, .3); } 20% { transform: scale3d(1.1, 1.1, 1.1); } 40% { transform: scale3d(.9, .9, .9); } 60% { opacity: 1; transform: scale3d(1.03, 1.03, 1.03); } 80% { transform: scale3d(.97, .97, .97); } 100% { opacity: 1; transform: scale3d(1, 1, 1); } } .bounceIn { animation-name: bounceIn; } '},
        bounceInDown: {hide: true, text: '向下弹入', value: '@keyframes bounceInDown { 0%, 60%, 75%, 90%, 100% { transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000); } 0% { opacity: 0; transform: translate3d(0, -3000px, 0); } 60% { opacity: 1; transform: translate3d(0, 25px, 0); } 75% { transform: translate3d(0, -10px, 0); } 90% { transform: translate3d(0, 5px, 0); } 100% { transform: none; } } .bounceInDown { animation-name: bounceInDown; } '},
        bounceInLeft: {hide: true, text: '左边弹入', value: '@keyframes bounceInLeft { 0%, 60%, 75%, 90%, 100% { transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000); } 0% { opacity: 0; transform: translate3d(-3000px, 0, 0); } 60% { opacity: 1; transform: translate3d(25px, 0, 0); } 75% { transform: translate3d(-10px, 0, 0); } 90% { transform: translate3d(5px, 0, 0); } 100% { transform: none; } } .bounceInLeft { animation-name: bounceInLeft; } '},
        bounceInRight: {hide: true, text: '右边弹入', value: '@keyframes bounceInRight { 0%, 60%, 75%, 90%, 100% { transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000); } 0% { opacity: 0; transform: translate3d(3000px, 0, 0); } 60% { opacity: 1; transform: translate3d(-25px, 0, 0); } 75% { transform: translate3d(10px, 0, 0); } 90% { transform: translate3d(-5px, 0, 0); } 100% { transform: none; } } .bounceInRight { animation-name: bounceInRight; } '},
        bounceInUp: {hide: true, text: '向上弹入', value: '@keyframes bounceInUp { 0%, 60%, 75%, 90%, 100% { transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000); } 0% { opacity: 0; transform: translate3d(0, 3000px, 0); } 60% { opacity: 1; transform: translate3d(0, -20px, 0); } 75% { transform: translate3d(0, 10px, 0); } 90% { transform: translate3d(0, -5px, 0); } 100% { transform: translate3d(0, 0, 0); } } .bounceInUp { animation-name: bounceInUp; } '},
        //bounceOut: { text: '跳跃效果', value : '@keyframes bounceOut { 20% { transform: scale3d(.9, .9, .9); } 50%, 55% { opacity: 1; transform: scale3d(1.1, 1.1, 1.1); } 100% { opacity: 0; transform: scale3d(.3, .3, .3); } } .bounceOut { animation-name: bounceOut; } '},
        //bounceOutDown: { text: '跳跃效果', value : '@keyframes bounceOutDown { 20% { transform: translate3d(0, 10px, 0); } 40%, 45% { opacity: 1; transform: translate3d(0, -20px, 0); } 100% { opacity: 0; transform: translate3d(0, 2000px, 0); } } .bounceOutDown { animation-name: bounceOutDown; } '},
        //bounceOutLeft: { text: '跳跃效果', value : '@keyframes bounceOutLeft { 20% { opacity: 1; transform: translate3d(20px, 0, 0); } 100% { opacity: 0; transform: translate3d(-2000px, 0, 0); } } .bounceOutLeft { animation-name: bounceOutLeft; } '},
        //bounceOutRight: { text: '跳跃效果', value : '@keyframes bounceOutRight { 20% { opacity: 1; transform: translate3d(-20px, 0, 0); } 100% { opacity: 0; transform: translate3d(2000px, 0, 0); } } .bounceOutRight { animation-name: bounceOutRight; } '},
        //bounceOutUp: { text: '跳跃效果', value : '@keyframes bounceOutUp { 20% { transform: translate3d(0, -10px, 0); } 40%, 45% { opacity: 1; transform: translate3d(0, 20px, 0); } 100% { opacity: 0; transform: translate3d(0, -2000px, 0); } } .bounceOutUp { animation-name: bounceOutUp; } '},
        fadeIn: { text: '渐入效果', value: '@keyframes fadeIn { 0% {opacity: 0;} 100% {opacity: 1;} } .fadeIn { animation-name: fadeIn; } '},
        fadeInDown: {hide: true, text: '向下渐入', value: '@keyframes fadeInDown { 0% { opacity: 0; transform: translate3d(0, -100%, 0); } 100% { opacity: 1; transform: none; } } .fadeInDown { animation-name: fadeInDown; } '},
        fadeInDownBig: {hide: true, text: '远距离向下渐入', value: '@keyframes fadeInDownBig { 0% { opacity: 0; transform: translate3d(0, -2000px, 0); } 100% { opacity: 1; transform: none; } } .fadeInDownBig { animation-name: fadeInDownBig; } '},
        fadeInLeft: { hide: true, text: '左边渐入', value: '@keyframes fadeInLeft { 0% { opacity: 0; transform: translate3d(-100%, 0, 0); } 100% { opacity: 1; transform: none; } } .fadeInLeft { animation-name: fadeInLeft; } '},
        fadeInLeftBig: { hide: true, text: '远距离左边渐入', value: '@keyframes fadeInLeftBig { 0% { opacity: 0; transform: translate3d(-2000px, 0, 0); } 100% { opacity: 1; transform: none; } } .fadeInLeftBig { animation-name: fadeInLeftBig; } '},
        fadeInRight: {hide: true, text: '右边渐入', value: '@keyframes fadeInRight { 0% { opacity: 0; transform: translate3d(100%, 0, 0); } 100% { opacity: 1; transform: none; } } .fadeInRight { animation-name: fadeInRight; } '},
        fadeInRightBig: {hide: true, text: '远距离右边渐入', value: '@keyframes fadeInRightBig { 0% { opacity: 0; transform: translate3d(2000px, 0, 0); } 100% { opacity: 1; transform: none; } } .fadeInRightBig { animation-name: fadeInRightBig; } '},
        fadeInUp: {hide: true, text: '向上渐入', value: '@keyframes fadeInUp { 0% { opacity: 0; transform: translate3d(0, 100%, 0); } 100% { opacity: 1; transform: none; } } .fadeInUp { animation-name: fadeInUp; } '},
        fadeInUpBig: {hide: true, text: '远距离向上渐入', value: '@keyframes fadeInUpBig { 0% { opacity: 0; transform: translate3d(0, 2000px, 0); } 100% { opacity: 1; transform: none; } } .fadeInUpBig { animation-name: fadeInUpBig; } '},
        //fadeOut: { text: '跳跃效果', value : '@keyframes fadeOut { 0% {opacity: 1;} 100% {opacity: 0;} } .fadeOut { animation-name: fadeOut; } '},
        //fadeOutDown: { text: '跳跃效果', value : '@keyframes fadeOutDown { 0% { opacity: 1; } 100% { opacity: 0; transform: translate3d(0, 100%, 0); } } .fadeOutDown { animation-name: fadeOutDown; } '},
        //fadeOutDownBig: { text: '跳跃效果', value : '@keyframes fadeOutDownBig { 0% { opacity: 1; } 100% { opacity: 0; transform: translate3d(0, 2000px, 0); } } .fadeOutDownBig { animation-name: fadeOutDownBig; } '},
        //fadeOutLeft: { text: '跳跃效果', value : '@keyframes fadeOutLeft { 0% { opacity: 1; } 100% { opacity: 0; transform: translate3d(-100%, 0, 0); } } .fadeOutLeft { animation-name: fadeOutLeft; } '},
        //fadeOutLeftBig: { text: '跳跃效果', value : '@keyframes fadeOutLeftBig { 0% { opacity: 1; } 100% { opacity: 0; transform: translate3d(-2000px, 0, 0); } } .fadeOutLeftBig { animation-name: fadeOutLeftBig; } '},
        //fadeOutRight: { text: '跳跃效果', value : '@keyframes fadeOutRight { 0% { opacity: 1; } 100% { opacity: 0; transform: translate3d(100%, 0, 0); } } .fadeOutRight { animation-name: fadeOutRight; } '},
        //fadeOutRightBig:{ text: '跳跃效果', value :  '@keyframes fadeOutRightBig { 0% { opacity: 1; } 100% { opacity: 0; transform: translate3d(2000px, 0, 0); } } .fadeOutRightBig { animation-name: fadeOutRightBig; } '},
        //fadeOutUp:{ text: '跳跃效果', value :  '@keyframes fadeOutUp { 0% { opacity: 1; } 100% { opacity: 0; transform: translate3d(0, -100%, 0); } } .fadeOutUp { animation-name: fadeOutUp; } '},
        //fadeOutUpBig: { text: '跳跃效果', value : '@keyframes fadeOutUpBig { 0% { opacity: 1; } 100% { opacity: 0; transform: translate3d(0, -2000px, 0); } } .fadeOutUpBig { animation-name: fadeOutUpBig; } '},
        flip: {hide: true, text: '空翻效果', value: '@keyframes flip { 0% { transform: perspective(400px) rotate3d(0, 1, 0, -360deg); animation-timing-function: ease-out; } 40% { transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg); animation-timing-function: ease-out; } 50% { transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg); animation-timing-function: ease-in; } 80% { transform: perspective(400px) scale3d(.95, .95, .95); animation-timing-function: ease-in; } 100% { transform: perspective(400px); animation-timing-function: ease-in; } } .animated.flip { backface-visibility: visible; animation-name: flip; } '},
        flipInX: {hide: true, text: 'X轴翻入', value: '@keyframes flipInX { 0% { transform: perspective(400px) rotate3d(1, 0, 0, 90deg); transition-timing-function: ease-in; opacity: 0; } 40% { transform: perspective(400px) rotate3d(1, 0, 0, -20deg); transition-timing-function: ease-in; } 60% { transform: perspective(400px) rotate3d(1, 0, 0, 10deg); opacity: 1; } 80% { transform: perspective(400px) rotate3d(1, 0, 0, -5deg); } 100% { transform: perspective(400px); } } .flipInX { backface-visibility: visible !important; animation-name: flipInX; } '},
        flipInY: {hide: true, text: 'Y轴翻入', value: '@keyframes flipInY { 0% { transform: perspective(400px) rotate3d(0, 1, 0, 90deg); transition-timing-function: ease-in; opacity: 0; } 40% { transform: perspective(400px) rotate3d(0, 1, 0, -20deg); transition-timing-function: ease-in; } 60% { transform: perspective(400px) rotate3d(0, 1, 0, 10deg); opacity: 1; } 80% { transform: perspective(400px) rotate3d(0, 1, 0, -5deg); } 100% { transform: perspective(400px); } } .flipInY { backface-visibility: visible !important; animation-name: flipInY; } '},
        //flipOutX: { text: '跳跃效果', value : '@keyframes flipOutX { 0% { transform: perspective(400px); } 30% { transform: perspective(400px) rotate3d(1, 0, 0, -20deg); opacity: 1; } 100% { transform: perspective(400px) rotate3d(1, 0, 0, 90deg); opacity: 0; } } .flipOutX { animation-name: flipOutX; backface-visibility: visible !important; } '},
        //flipOutY: { text: '跳跃效果', value : '@keyframes flipOutY { 0% { transform: perspective(400px); } 30% { transform: perspective(400px) rotate3d(0, 1, 0, -15deg); opacity: 1; } 100% { transform: perspective(400px) rotate3d(0, 1, 0, 90deg); opacity: 0; } } .flipOutY { backface-visibility: visible !important; animation-name: flipOutY; } '},
        lightSpeedIn: {hide: true, text: '光速进入', value: '@keyframes lightSpeedIn { 0% { transform: translate3d(100%, 0, 0) skewX(-30deg); opacity: 0; } 60% { transform: skewX(20deg); opacity: 1; } 80% { transform: skewX(-5deg); opacity: 1; } 100% { transform: none; opacity: 1; } } .lightSpeedIn { animation-name: lightSpeedIn; animation-timing-function: ease-out; } '},
        //lightSpeedOut: { text: '跳跃效果', value : '@keyframes lightSpeedOut { 0% { opacity: 1; } 100% { transform: translate3d(100%, 0, 0) skewX(30deg); opacity: 0; } } .lightSpeedOut { animation-name: lightSpeedOut; animation-timing-function: ease-in; } '},
        rotateIn: {hide: true, text: '旋转效果', value: '@keyframes rotateIn { 0% { transform-origin: center; transform: rotate3d(0, 0, 1, -200deg); opacity: 0; } 100% { transform-origin: center; transform: none; opacity: 1; } } .rotateIn { animation-name: rotateIn; } '},
        rotateInDownLeft: {hide: true, text: '左下旋转', value: '@keyframes rotateInDownLeft { 0% { transform-origin: left bottom; transform: rotate3d(0, 0, 1, -45deg); opacity: 0; } 100% { transform-origin: left bottom; transform: none; opacity: 1; } } .rotateInDownLeft { animation-name: rotateInDownLeft; } '},
        rotateInDownRight: {hide: true, text: '右下旋转', value: '@keyframes rotateInDownRight { 0% { transform-origin: right bottom; transform: rotate3d(0, 0, 1, 45deg); opacity: 0; } 100% { transform-origin: right bottom; transform: none; opacity: 1; } } .rotateInDownRight { animation-name: rotateInDownRight; } '},
        rotateInUpLeft: {hide: true, text: '左上旋转', value: '@keyframes rotateInUpLeft { 0% { transform-origin: left bottom; transform: rotate3d(0, 0, 1, 45deg); opacity: 0; } 100% { transform-origin: left bottom; transform: none; opacity: 1; } } .rotateInUpLeft { animation-name: rotateInUpLeft; } '},
        rotateInUpRight: {hide: true, text: '右上旋转', value: '@keyframes rotateInUpRight { 0% { transform-origin: right bottom; transform: rotate3d(0, 0, 1, -90deg); opacity: 0; } 100% { transform-origin: right bottom; transform: none; opacity: 1; } } .rotateInUpRight { animation-name: rotateInUpRight; } '},
        //rotateOut: { text: '跳跃效果', value : '@keyframes rotateOut { 0% { transform-origin: center; opacity: 1; } 100% { transform-origin: center; transform: rotate3d(0, 0, 1, 200deg); opacity: 0; } } .rotateOut { animation-name: rotateOut; } '},
        //rotateOutDownLeft:{ text: '跳跃效果', value :  '@keyframes rotateOutDownLeft { 0% { transform-origin: left bottom; opacity: 1; } 100% { transform-origin: left bottom; transform: rotate3d(0, 0, 1, 45deg); opacity: 0; } } .rotateOutDownLeft { animation-name: rotateOutDownLeft; } '},
        //rotateOutDownRight :{ text: '跳跃效果', value :  '@keyframes rotateOutDownRight { 0% { transform-origin: right bottom; opacity: 1; } 100% { transform-origin: right bottom; transform: rotate3d(0, 0, 1, -45deg); opacity: 0; } } .rotateOutDownRight { animation-name: rotateOutDownRight; } '},
        //rotateOutUpLeft:{ text: '跳跃效果', value :  '@keyframes rotateOutUpLeft { 0% { transform-origin: left bottom; opacity: 1; } 100% { transform-origin: left bottom; transform: rotate3d(0, 0, 1, -45deg); opacity: 0; } } .rotateOutUpLeft { animation-name: rotateOutUpLeft; } '},
        //rotateOutUpRight: { text: '跳跃效果', value : '@keyframes rotateOutUpRight { 0% { transform-origin: right bottom; opacity: 1; } 100% { transform-origin: right bottom; transform: rotate3d(0, 0, 1, 90deg); opacity: 0; } } .rotateOutUpRight { animation-name: rotateOutUpRight; } '},
        slideInDown: {hide: true, text: '向下滑行', value: '@keyframes slideInDown { 0% { transform: translate3d(0, -100%, 0); visibility: visible; } 100% { transform: translate3d(0, 0, 0); } } .slideInDown { animation-name: slideInDown; } '},
        slideInLeft: {hide: true, text: '左边滑入', value: '@keyframes slideInLeft { 0% { transform: translate3d(-100%, 0, 0); visibility: visible; } 100% { transform: translate3d(0, 0, 0); } } .slideInLeft { animation-name: slideInLeft; } '},
        slideInRight: {hide: true, text: '右边滑入', value: '@keyframes slideInRight { 0% { transform: translate3d(100%, 0, 0); visibility: visible; } 100% { transform: translate3d(0, 0, 0); } } .slideInRight { animation-name: slideInRight; } '},
        slideInUp: {hide: true, text: '向滑行', value: '@keyframes slideInUp { 0% { transform: translate3d(0, 100%, 0); visibility: visible; } 100% { transform: translate3d(0, 0, 0); } } .slideInUp { animation-name: slideInUp; } '},
        //slideOutDown: { text: '跳跃效果', value : '@keyframes slideOutDown { 0% { transform: translate3d(0, 0, 0); } 100% { visibility: hidden; transform: translate3d(0, 100%, 0); } } .slideOutDown { animation-name: slideOutDown; } '},
        //slideOutLeft: { text: '跳跃效果', value : '@keyframes slideOutLeft { 0% { transform: translate3d(0, 0, 0); } 100% { visibility: hidden; transform: translate3d(-100%, 0, 0); } } .slideOutLeft { animation-name: slideOutLeft; } '},
        //slideOutRight:{ text: '跳跃效果', value :  '@keyframes slideOutRight { 0% { transform: translate3d(0, 0, 0); } 100% { visibility: hidden; transform: translate3d(100%, 0, 0); } } .slideOutRight { animation-name: slideOutRight; } '},
        //slideOutUp: { text: '跳跃效果', value : '@keyframes slideOutUp { 0% { transform: translate3d(0, 0, 0); } 100% { visibility: hidden; transform: translate3d(0, -100%, 0); } } .slideOutUp { animation-name: slideOutUp; } '},
        hinge: { text: '铰链效果', value: '@keyframes hinge { 0% { transform-origin: top left; animation-timing-function: ease-in-out; } 20%, 60% { transform: rotate3d(0, 0, 1, 80deg); transform-origin: top left; animation-timing-function: ease-in-out; } 40%, 80% { transform: rotate3d(0, 0, 1, 60deg); transform-origin: top left; animation-timing-function: ease-in-out; opacity: 1; } 100% { transform: translate3d(0, 700px, 0); opacity: 0; } } .hinge { animation-name: hinge; } '},
        rollIn: {hide: true, text: '卷入效果', value: '@keyframes rollIn { 0% { opacity: 0; transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg); } 100% { opacity: 1; transform: none; } } .rollIn { animation-name: rollIn; } '},
        //rollOut: { text: '跳跃效果', value : '@keyframes rollOut { 0% { opacity: 1; } 100% { opacity: 0; transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg); } } .rollOut { animation-name: rollOut; } '},
        zoomIn: {hide: true, text: '急速效果', value: '@keyframes zoomIn { 0% { opacity: 0; transform: scale3d(.3, .3, .3); } 50% { opacity: 1; } } .zoomIn { animation-name: zoomIn; } '},
        zoomInDown: {hide: true, text: '向下急速', value: '@keyframes zoomInDown { 0% { opacity: 0; transform: scale3d(.1, .1, .1) translate3d(0, -1000px, 0); animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190); } 60% { opacity: 1; transform: scale3d(.475, .475, .475) translate3d(0, 60px, 0); animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1); } } .zoomInDown { animation-name: zoomInDown; } '},
        zoomInLeft: {hide: true, text: '左边急速', value: '@keyframes zoomInLeft { 0% { opacity: 0; transform: scale3d(.1, .1, .1) translate3d(-1000px, 0, 0); animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190); } 60% { opacity: 1; transform: scale3d(.475, .475, .475) translate3d(10px, 0, 0); animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1); } } .zoomInLeft { animation-name: zoomInLeft; } '},
        zoomInRight: {hide: true, text: '右边急速', value: '@keyframes zoomInRight { 0% { opacity: 0; transform: scale3d(.1, .1, .1) translate3d(1000px, 0, 0); animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190); } 60% { opacity: 1; transform: scale3d(.475, .475, .475) translate3d(-10px, 0, 0); animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1); } } .zoomInRight { animation-name: zoomInRight; } '},
        zoomInUp: {hide: true, text: '向上急速', value: '@keyframes zoomInUp { 0% { opacity: 0; transform: scale3d(.1, .1, .1) translate3d(0, 1000px, 0); animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190); } 60% { opacity: 1; transform: scale3d(.475, .475, .475) translate3d(0, -60px, 0); animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1); } } .zoomInUp { animation-name: zoomInUp; } '}
        //zoomOut: { text: '跳跃效果', value : '@keyframes zoomOut { 0% { opacity: 1; } 50% { opacity: 0; transform: scale3d(.3, .3, .3); } 100% { opacity: 0; } } .zoomOut { animation-name: zoomOut; } '},
        //zoomOutDown: { text: '跳跃效果', value : '@keyframes zoomOutDown { 40% { opacity: 1; transform: scale3d(.475, .475, .475) translate3d(0, -60px, 0); animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190); } 100% { opacity: 0; transform: scale3d(.1, .1, .1) translate3d(0, 2000px, 0); transform-origin: center bottom; animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1); } } .zoomOutDown { animation-name: zoomOutDown; } '},
        //zoomOutLeft:{ text: '跳跃效果', value :  '@keyframes zoomOutLeft { 40% { opacity: 1; transform: scale3d(.475, .475, .475) translate3d(42px, 0, 0); } 100% { opacity: 0; transform: scale(.1) translate3d(-2000px, 0, 0); transform-origin: left center; } } .zoomOutLeft { animation-name: zoomOutLeft; } '},
        //zoomOutRight:{ text: '跳跃效果', value :  '@keyframes zoomOutRight { 40% { opacity: 1; transform: scale3d(.475, .475, .475) translate3d(-42px, 0, 0); } 100% { opacity: 0; transform: scale(.1) translate3d(2000px, 0, 0); transform-origin: right center; } } .zoomOutRight { animation-name: zoomOutRight; } '},
        //zoomOutUp: { text: '跳跃效果', value : '@keyframes zoomOutUp { 40% { opacity: 1; transform: scale3d(.475, .475, .475) translate3d(0, 60px, 0); animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190); } 100% { opacity: 0; transform: scale3d(.1, .1, .1) translate3d(0, -2000px, 0); transform-origin: center bottom; animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1); } } .zoomOutUp { animation-name: zoomOutUp; } '}
      };
      this.list = Est.keys(this.source);
      this.items = [
        {
          text: '关闭',
          value: '-'
        }
      ];
      Est.each(this.list, Est.proxy(function (item) {
        this.items.push({
          text: this.source[item]['text'],
          value: item,
          hide: this.source[item]['hide']
        });
      }, this));
      this.render();
    },
    // 设置延迟时间*/
    setDelay: function (e) {
      var $input = e.target ? $(e.target) : $(e.currentTarget);
      var $target = $(this.options.target, this.options.container ? $(this.options.container) : $('body'));
      $target.attr('data-delay', $input.val());
      $target.css('animation', $target.attr('data-animate') + ' ' + ($target.attr('data-duration') || 1.5) + 's ' + $input.val() + 's' + ' ' + ($target.attr('data-count') || 1));
      $target.css('-webkit-animation', $target.attr('data-animate') + ' ' + ($target.attr('data-duration') || 1.5) + 's ' + $input.val() + 's' + ' ' + ($target.attr('data-count') || 1));
      if ($target.attr('data-hide') === '1')
        $target.css('opacity', 0);
      this.doAnimate($($target).attr('data-animate'), $($target).attr('data-hide'));
      this.options.animate && this.options.animate.call(this);
    },
    // 设置动画周期*/
    setDuration: function (e) {
      var $input = e.target ? $(e.target) : $(e.currentTarget);
      var $target = $(this.options.target, this.options.container ? $(this.options.container) : $('body'));
      $target.attr('data-duration', $input.val());
      $target.css('animation', $target.attr('data-animate') + ' ' + $input.val() + 's ' + ($target.attr('data-delay') || 0) + 's' + ' ' + ($target.attr('data-count') || 1));
      $target.css('-webkit-animation', $target.attr('data-animate') + ' ' + $input.val() + 's ' + ($target.attr('data-delay') || 0) + 's' + ' ' + ($target.attr('data-count') || 1));
      $target.css('-moz-animation', $target.attr('data-animate') + ' ' + $input.val() + 's ' + ($target.attr('data-delay') || 0) + 's' + ' ' + ($target.attr('data-count') || 1));
      this.doAnimate($($target).attr('data-animate'), $($target).attr('data-hide'));
      this.options.animate && this.options.animate.call(this);
    },
    // 设置执行次数*/
    setCount: function (e) {
      var $input = e.target ? $(e.target) : $(e.currentTarget);
      var $target = $(this.options.target, this.options.container ? $(this.options.container) : $('body'));
      $target.attr('data-count', $input.val());
      $target.css('animation', $target.attr('data-animate') + ' ' + ($target.attr('data-duration') || 1.5) + 's ' + ($target.attr('data-delay') || 0) + 's' + ' ' + $input.val());
      $target.css('-webkit-animation', $target.attr('data-animate') + ' ' + ($target.attr('data-duration') || 1.5) + 's ' + ($target.attr('data-delay') || 0) + 's' + ' ' + $input.val());
      $target.css('-moz-animation', $target.attr('data-animate') + ' ' + ($target.attr('data-duration') || 1.5) + 's ' + ($target.attr('data-delay') || 0) + 's' + ' ' + $input.val());
      this.doAnimate($($target).attr('data-animate'), $($target).attr('data-hide'));
      this.options.animate && this.options.animate.call(this);
    },
    // 获取层叠顺序*/
    getZoom: function () {
      return 0;
    },
    // 获取动画样式*/
    getCss: function (name) {
      return this.source[name];
    },
    // 执行动画*/
    doAnimate: function (x, isHide) {
      if (this.options.target) {
        var $container = this.options.container ? $(this.options.container) : $('body');
        var $target = $(this.options.target, $container);
        $target.removeClass($target.attr('data-animate'));
        $target.removeClass('animated');
        $target.attr('data-hide', isHide ? '0' : '1');
        $target.css('opacity', isHide ? 0 : 1);
        $target.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
          $(this).css('opacity', 1);
          console.log('canvas-animation-start');
        });
        $target.addClass(x + ' animated');
        $target.attr('data-animate', x);
        $target.css('animation', x + ' ' + ($target.attr('data-duration') || 1.5) + 's ' + ($target.attr('data-delay') || 0) + 's' + ' ' + ($target.attr('data-count') || 1));
        $target.css('-webkit-animation', x + ' ' + ($target.attr('data-duration') || 1.5) + 's ' + ($target.attr('data-delay') || 0) + 's' + ' ' + ($target.attr('data-count') || 1));
        this.options.animate && this.options.animate.call(this, x);
        //$target.attr('data-du', x);
        //$target.attr('data-animate', x);
      } else {
        $('#animationSandbox').removeClass().addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
          $(this).removeClass();
        });
      }
    },
    // 获取当前元素的动画参数*/
    getCurAnimate: function () {
      //return this.curAnimate;
      return {
        curDuration: this.curDuration,
        curAnimate: this.curAnimate,
        curDelay: this.curDelay,
        curCount: this.curCount
      };
    },
    render: function () {
      this._render();

      this.$duration = this.$('#model-duration');
      this.$delay = this.$('#model-delay');
      this.$count = this.$('#model-count');

      this.$duration.change(Est.proxy(function () {
        this.curDuration = this.$duration.val();
      }, this));

      this.$delay.change(Est.proxy(function () {
        this.curDelay = this.$delay.val();
      }, this));

      this.$count.change(Est.proxy(function () {
        this.curCount = this.$count.val();
      }, this));

      Utils.initSelect({
        render: '#s1',
        target: '#model-animate',
        items: this.items,
        change: Est.proxy(function (item) {
          this.doAnimate(item.value, item.hide);
          this.curAnimate = item.value;
        }, this)
      });

      Utils.initNumberRange({
        render: '#zIndex',
        target: '#model-zIndex',
        viewId: 'NumberRange',
        change: Est.proxy(function (number) {
          var $container = this.options.container ? $(this.options.container) : $('body');
          var $target = $(this.options.target, $container);
          $target.attr('data-zIndex', number);
          $target.css('z-index', number);
          this.options.animate && this.options.animate.call(this, number);
        }, this)
      });
    }
  });
  module.exports = AnimateCss;
});