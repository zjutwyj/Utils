/**
 * @description LotteryDraw
 * @class LotteryDraw
 * @author yongjin<zjut_wyj@163.com> 2015/3/25
 */
define('LotteryDraw', ['Canvas', 'template/common_lottery_draw', 'rotate'], function (require, exports, module) {
  var LotteryDraw, Canvas, template, rotate;

  Canvas = require('Canvas');
  template = require('template/common_lottery_draw');
  rotate = require('rotate');

  LotteryDraw = BaseView.extend({
    initialize: function () {
      this.options.data = this.options.data || {};
      this.drawId = this.options.data.drawId = Est.nextUid('lottery-draw');
      this._initialize({
        template: template
      });
      this._mobile = this.options.mobile;
      this._wwyId = this.options._wwyId;
      this.ltyRule = this.options.ltyRule;
      this.ltyType = this.options.ltyType;
      this._args = this.options.wwyId_;

      this.sharepic = CONST.PIC_URL + '/' + this.options.sharepic; // 微信分享图片
      this.sharetitle = this.options.sharetitle; // 分享标题
      this.desc = this.sharedesc = this.options.sharedesc; // 分享描述

      this.isShare = false;
      this.lotyId = null;
      this.lotterySort = 0;
      this.lotteryInfo = "";
      this.$shareModal = null;
      this.openid = this.options.openid;
      this.clickType = (('ontouchend' in window)) ? 'touchend' : 'click';

      this.ga_width = 0;
      this.ga_height = 0;

      this.render();
    },
    /**刮刮卡*/
    card: function () {
      var ctx = this;
      var image = this.ltyRule.lotteryImage;
      this.a_width = '100%';
      this.ga_height = '100%';

      var imageInstance = new Image();
      imageInstance.onload = function () {
        ctx.ga_width = this.naturalWidth;
        ctx.ga_height = this.naturalHeight;
        $('.lottery-container').css({
          width: '100%',
          height: '100%'
        });

        ctx.$('#' + ctx.drawId).drawcanvas({
          coverType: 'image',
          cover: CONST.PIC_URL + '/' + image,
          lineWidth: 15,
          fillImage: false,
          shaveable: true,
          cbdelay: 0,
          width: ctx.ga_width,
          height: ctx.ga_height,
          position: 'absolute',
          left: 0,
          top: 0,
          zIndex: 99,
          beforeCallback: Est.proxy(function () {
            if (ctx.options.showMobileDialog) return false;
            if (!ctx.beforeLottery(ctx.$('#' + ctx.drawId).get(0))) return false;
            return true;
          }, ctx),
          callback: function (percent) {
            if (percent > 50 && ctx.isShare) {
              if (ctx.lotyId) {
                //ctx.drawLotteryList();
              }
              //ctx.drawLotteryList();
            }
          },
          success: function () {
            //ga_width = parseInt(this.mask.getAttribute("width"), 10);
            //ga_height = parseInt(this.mask.getAttribute("height"), 10);
            //$(this.conNode).addClass('show').on('webkitTransitionEnd', function () {
            //});
          }
        });
        //ctx.drawLotteryList();
        ctx.drawLotteryRule();
      }
      imageInstance.src = CONST.PIC_URL + '/' + image;
    },
    /**转盘*/
    wheel: function () {
      var ctx = this;
      try {
        var origin_width = this.$el.width();
        var origin_height = this.$el.height();
        var $parent = this.$el.parents('.module-content:first');
        $parent.css({
          width: '100%',
          height: 'auto'
        });
        this.$el.find('#' + this.drawId).append('<div class="rotate" data-spm="1" style=""> <div class="rotate-bg" style=""> <img width="100%"  src="' + CONST.HOST + '/images/rotate.gif"> </div> <div class="rotate-start" data-ga="抽奖.页面主题.开始抽奖" data-spm-click="gostr=/aliyun;locaid=d20149" data-spm-anchor-id="5176.100003.1.d20149"> <img width="63%" src="' + CONST.HOST + '/images/rotate_p.png" id="J_startBtn"> </div> </div>');
        if (this.ltyRule.lotteryImage !== CONST.PIC_NONE){
          this.$(".rotate-bg img:first").attr("src", CONST.PIC_URL + '/' + this.ltyRule.lotteryImage);
        }
        var rules = this.ltyRule.lotteryRule;
        var len = rules.length;
        var deg = Math.round(360 / len);

        /*if (this.ltyRule.customImage !== '01' && this.ltyRule.lotteryImage === CONST.PIC_NONE) {
          var colors = ['#FECB03', '#2FB753', '#6B3983', '#DE47CD', '#A33EE5', '#2E9CD9', '#E73EAA', '#2FB753', '#FECB03', '#6B3983', '#A33EE5', '#DE47CD', '#2E9CD9', '#E73EAA'];
          var $rotateBg = this.$(".rotate .rotate-bg");
          var width = $rotateBg.width();
          var radius = width / 2;
          var inner_width = 9;
          var color = null;
          var step = 0;

          var $sector = $("<canvas id='sector'></canvas>");
          $sector.attr({"width": width, "height": width});
          $sector.css({ position: 'absolute', left: 0, top: 0, 'z-index': 97});
          $rotateBg.append($sector);
          // 画扇形
          var sector = $sector.get(0);
          this.drawSector(sector, radius, radius, radius - inner_width, 0, 360, '#fff', 1);
          for (var i = 0; i < len; i++) {
            color = i % 2 === 0 ? '#e6e4db' : colors[Math.ceil(i / 2)];
            this.drawSector(sector, radius, radius, radius - inner_width, i * deg + 90 - deg / 2, (i + 1) * deg + 90 - deg / 2, color, 0.6);
            this.drawSector(sector, radius, radius, (radius - inner_width) * 0.8, i * deg + 90 - deg / 2, (i + 1) * deg + 90 - deg / 2, color, 0.75);
            this.drawSector(sector, radius, radius, (radius - inner_width) * 0.75, i * deg + 90 - deg / 2, (i + 1) * deg + 90 - deg / 2, color, 1);
          }
          Est.each(rules, function (item, i) {
            // 奖品图片
            if (item.pic && item.pic.length > 0) {
              ctx.drawImage(radius, inner_width, len, deg, i + 1, item.pic);
            }
            // 奖品名称
            ctx.drawCircleText(sector, radius, inner_width, len, deg, i + 1, item.name);
          });
        }*/
        this.$(".rotate-start").bind(this.clickType, function (event) {
          event.stopPropagation();
          event.preventDefault();
          //alert('rotate-click');
          if (!ctx.beforeLottery(ctx.$('.rotate-start').get(0))) return false;
          //alert('rotate_001');
          if (!Est.isEmpty(ctx._mobile) && ctx.isShare) {
            //alert('rotate_002');
            var _deg = deg * ctx.lotterySort;
            ctx.$("#J_startBtn").stopRotate(), ctx.$("#J_startBtn").rotate({
              angle: 0,
              duration: 4e3,
              animateTo: _deg + 5400,
              callback: function () {
                //alert('rotate_003');
                var dialogTpl = "<div id='okDialog' class='dialog'><div class=\"content\">#{info}<br><input name='ok' class=\"ok btn\" type='button' value='确定' /></div></div>";
                //if (ctx.lotyId) ctx.drawLotteryList();
                ctx.disableLottery();
                ctx.lotterySort = len;
                var $node = $(Est.format(dialogTpl, {
                  info: ctx.lotteryInfo
                }));
                $node.find(".ok").click(function () {
                  $(this).parents(".dialog:first").remove();
                });
                $("body").append($node);
                $node.css(Est.center($(window).width(), $(window).height(), $node.width(), $node.height()));
                //alert(lotteryInfo);
              }
            })
          } else {
            alert("请先转发并发享， 再抽奖");
            return false;
          }
        });
        ctx.$el.find("#sector").css({
          width: '100%'
        });
        try{
          var win_h = $(window).width();
          var percent = origin_width * 100 / win_h;
          $parent.css({
            width: percent + '%',
            height: 'auto'
          });
        }catch(e){

        }
        //ctx.drawLotteryList();
      } catch (e) {
        //alert('error');
      }
    },
    /**摇一摇*/
    shake: function () {
      var ctx = this;
      var ga_width = '100%';
      var ga_height = '100%';
      var image = CONST.PIC_URL + '/' + this.ltyRule.lotteryImage;

      var imageInstance = new Image();
      imageInstance.onload = function () {
        var $parent = ctx.$el.parents('.module-content:first');
        ga_width = this.naturalWidth;
        ga_height = this.naturalHeight;
        $parent.css({
          width: ga_width,
          height: ga_height
        });
        ctx.$('.lottery-container').css({
          width: '100%'
        });
        ctx.$('#' + ctx.drawId).drawcanvas({
          coverType: 'image',
          cover: image,
          shaveable: false,
          fillImage: true,
          width: 100,
          height: 100,
          position: 'absolute',
          left: 0,
          top: 0,
          zIndex: 99,
          success: function () {
            $(this.conNode).addClass('show');
            if (window.DeviceMotionEvent) {
              var speed = 25;
              var x = y = z = lastX = lastY = lastZ = 0;
              window.addEventListener('devicemotion', function () {

                var acceleration = event.accelerationIncludingGravity;
                x = acceleration.x;
                y = acceleration.y;
                if (Math.abs(x - lastX) > speed || Math.abs(y - lastY) > speed) {
                  if (!ctx.beforeLottery($("#lottery_swing").get(0))) return false;
                  if (!ctx.isShare) {
                    alert("请先转发并发享， 再摇奖");
                  } else {
                    // 显示抽奖结果
                    //drawText($('#lottery_swing'), lotteryInfo, ga_width, ga_height, 0, 0);
                    //alert(ctx.lotteryInfo);
                    if (ctx.lotyId) {
                      //ctx.drawLotteryList();
                    }
                    ctx.disableLottery();
                  }
                }
                lastX = x;
                lastY = y;
              }, false);
            }
          }
        });
        //ctx.drawLotteryList();
        ctx.drawLotteryRule();
      }
      imageInstance.src = image;
    },
    // 画扇形
    drawSector: function (canvas, left, top, radius, sdeg, edeg, color, opacity) {
      Canvas.drawSector(canvas, left, top, radius, sdeg, edeg, {
        before: function () {
        },
        after: function (ctx) {
          ctx.globalAlpha = opacity;
          ctx.fillStyle = color;
          ctx.fill();
        }
      });
    },
    // 在圆周围画文字
    drawCircleText: function (sector, radius, inner_width, len, deg, i, name) {
      var pic_w = Math.PI * (radius - inner_width) / len;
      var deg_t = i * deg + 90;
      var degree = deg_t - 360 > 360 ? deg_t - 360 : deg_t;
      var location = Canvas.getCircleLocation(radius, radius, (radius - inner_width) * 0.9, degree);
      var ctx = sector.getContext('2d');
      var rotateDeg = deg * i + 90;
      rotateDeg = Canvas.getDegreeByCircle(rotateDeg, deg, i);
      ctx.save();
      ctx.beginPath();
      ctx.fillStyle = "#444";
      ctx.font = "12px Arial";
      var numWidth = ctx.measureText(name).width;
      ctx.translate(location.x, location.y);
      ctx.rotate(-rotateDeg * Math.PI / 180);
      ctx.fillText(name, -numWidth / 2, 6);
      ctx.restore();
    },
    //抽奖前准备
    beforeLottery: function (obj) {
      if (this.isShare) return true;
      return Est.isEmpty(this._mobile) ? this.enterMobileDialog(obj) : this.toShareWwyDialog(obj);
    },
    //中奖列表
    drawLotteryList: function () {
      var tpl = "<li>恭喜#{mobile}获得了<span style=\"color: #e12e60\">#{lotyName}</span></li>";
      var $lotteryItemUl = $(".lottery-item-ul");
      $lotteryItemUl.empty();
      $.ajax({
        type: 'post',
        url: '/wwy/getLotteryList',
        data: {
          id: this._wwyId
        },
        success: function (result) {
          if (Est.isEmpty(result)) return;
          var list = $.parseJSON(result);
          Est.each(list, function (item) {
            item.mobile = item.mobile.replace(/(\d{3})\d{4}(\d{4})/g, '$1****$2');
            $lotteryItemUl.append($(Est.format(tpl, item)));
          });
          $lotteryItemUl.show();
        }
      });
    },
    /*输入手机号码对话框*/
    enterMobileDialog: function (target) {
      var ctx = this;
      // 若已分享 或已存在该对话框， 则返回
      if (this.isShare || $("#enter-mobile-div").size() > 0) return;
      var $tip; // 提示信息
      var pos;
      var tpl = "<div id='enter-mobile-div' class='dialog' style=''>" +
        "<div class=\"content\">" +
        "<span>请输入您的手机号码：</span>" +
        "<input name='mobile' type='number' class=\"text\" value='#{mobile}'/><br>" +
        "<input name='submit' class=\"btn\" type='button' value='确定'/>" +
        "<input name='cancel' class=\"btn\" type='button' value='关闭'/>" +
        "</div>" +
        "</div>";
      var mobile = "";
      var $mobileDia = $(Est.format(tpl, {mobile: this._mobile}));
      // 数字框事件绑定
      $("input[name=mobile]", $mobileDia).on("click", function () {
        if ($tip) $tip.remove();
      });
      // 确定按钮
      $("input[name=submit]", $mobileDia).on("click", function () {
        $tip = $("<div class='errTip' style='color:red;'>您输入的电话号码有误</div>");
        var joinResult = "";
        var mobile = $.trim($(this).parents("#enter-mobile-div:first").find("input[name=mobile]").val());
        if (!Est.validation(mobile, 'cellphone')) {
          if ($mobileDia.has(".errTip").size() == 0) $(this).before($tip);
          return;
        } else {
          $tip.remove();
        }
        ctx._mobile = mobile;
        // 在服务器中生成页面
        $.ajax({
          url: "/wwy/join",
          async: true,
          data: { mobile: ctx._mobile, arg: ctx._arg },
          success: function (result) {
            joinResult = result;
          }
        });
        setTimeout(function () {
          joinResult = Est.isEmpty(joinResult) ? ctx._arg : joinResult;
          ctx.bindWeixinJSBridge(joinResult);
        }, 2000);
        $mobileDia.remove();
        ctx.toShareWwyDialog();
      });
      // 取消按钮
      $("input[name=cancel]", $mobileDia).on("click", function (e) {
        e.preventDefault();
        $mobileDia.remove();
      });
      $("body").append($mobileDia);
      pos = Est.center($(window).width(), $(window).height(), $mobileDia.width(), $mobileDia.height());
      $mobileDia.css({
        left: pos.left,
        top: '20%'
      });
      // 进行抽奖
      if (!Est.isEmpty(ctx._mobile)) {
        ctx.getLottery(ctx._mobile);
      }
      setTimeout(function () {
      }, 1000);
    },
    /**
     * @description 处理奖品获取结果
     * @method resolveResult
     * @param {String} result
     * @param result
     * @author wyj on 14.9.27
     */
    resolveResult: function (result) {
      if (Est.isEmpty(result)) {
        return false;
      }
      var data = $.parseJSON(Est.unescapeHTML(result));
      this.lotterySort = data.sort;
      //alert(this.lotterySort);
      this.lotteryInfo = data.info;
      this.lotyId = data.lotyId;
      if ($('#lottery_gg canvas').size() > 1) {
        this.rebulidLottery(this.$('#lottery_gg'));
      }
      this.drawText($('#lottery_gg'), this.lotteryInfo, this.ga_width, this.ga_height, 0, 0);
      this.isShare = true;
    },
    /**
     * @description 重绘刮刮卡
     * @method rebulidLottery
     * @param canvas
     * @author wyj on 14.10.10
     */
    rebulidLottery: function (node) {
      var image = this.ltyRule.lotteryImage;
      $(node).empty();
      this.$('#lottery_gg').drawcanvas({
        coverType: 'image',
        cover: image,
        lineWidth: 15,
        fillImage: false,
        shaveable: true,
        cbdelay: 0,
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 99
      });
    },
    /*获取抽奖信息 [当存在_mobile 且isShare为true时才生效]*/
    getLottery: function (mobile, result) {
      var ctx = this;
      //alert('getLottery:' + result);
      if (!Est.isEmpty(result)) {
        //alert('getLottery' + result);
        result !== '00' ? this.resolveResult(result) : this.isShare = false;
      } else {
        //alert('getLottery empty' + result);
        $.ajax({
          type: 'post',
          url: '/wwy/getLottery',
          async: false,
          data: {
            id: this._wwyId,
            mobile: mobile || this._mobile
          },
          success: function (result) {
            //alert('getLottery_result:' + result);
            result !== '00' ? ctx.resolveResult(result) : ctx.isShare = false;
          }
        });
      }
    },
    // 显示中奖规则
    drawLotteryRule: function () {
      var tpl = "<li>#{level}：#{name}</li>";
      var $lotteryItemUl = $(".lty-rule .lty-rule-ul");
      $lotteryItemUl.empty();
      Est.each(this.ltyRule.lotteryRule.slice(0, this.ltyRule.lotteryRule.length - 1), function (item) {
        $lotteryItemUl.append(Est.format(tpl, item));
      });
    },
    /*禁止抽奖*/
    disableLottery: function () {
      this.isShare = false;
      this.lotyId = null;
    },
    /**
     * @description 显示信息对话框
     * @method info
     * @param info
     * @author wyj on 14.10.10
     */
    info: function (info, options) {
      var opts = {
        time: null
      }
      Est.extend(opts, options);
      var dialogTpl = "<div id='okDialog' class='dialog'><div class=\"content\">#{info}<br><input name='ok' class=\"ok btn\" type='button' value='确定' /></div></div>";
      var $node = $(Est.format(dialogTpl, {
        info: info
      }));
      var $ok = $node.find(".ok");
      $ok.click(function () {
        $(this).parents(".dialog:first").remove();
      });
      $("body").append($node);
      $node.css(Est.center($(window).width(), $(window).height(), $node.width(), $node.height()));

      if (opts.time) {
        setTimeout(function () {
          $ok.click();
        }, time);
      }

    },
    /*提示分享对话框*/
    toShareWwyDialog: function (target) {
      // 若已分享 或已存在该对话框， 则返回
      if (this.isShare || $("#share-div").size() > 0) return;
      var $modal, pos;
      var tpl = "<div id='share-div' class=\"dialog\">" +
        "<div class=\"content\">" +
        "请点击右上角的分享按钮：" +
        "<div><img height=\"25\" style=\"float:left;margin-right:5px;\" src=\"/wwy/theme1/image/ico1.jpg\" /><img height=\"25\" style=\"float:left;margin-right:5px;\" src=\"/wwy/theme1/image/ico2.jpg\" /><img  height=\"25\" style=\"float:left;margin-right:5px;\" src=\"/wwy/theme1/image/ico3.jpg\" /></div>" +
        "<div class=\"\" style=\"clear:both;\">分享你的专属页面， 分享后即可进行抽奖;<br> 每分享一个人即可获取一次抽奖机会</div>" +
        "<div class=\"close\" style=\"position:absolute;right:5px;top:5px;font-size:1em;cursor:pointer;\">×</div>" +
        "</div>" +
        "</div>";
      this.$shareModal = $modal = $(tpl);
      $(".close", $modal).click(function () {
        $("#share-div").remove();
      });
      $("body").append($modal);
      pos = Est.center($(window).width(), $(window).height(), $modal.width(), $modal.height());
      $modal.css({
        left: pos.left,
        top: '20%'
      });
    },
    /*抽奖微信绑定*/
    bindWeixinJSBridge: function (result) {
      var ctx = this;
      //var f_url = 'http://www.jihui88.com/wwy/info?arg=' + result.split(";")[0];
      var f_url = location.href;
      var u = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + f_url + '&response_type=code&scope=snsapi_base&state=0#wechat_redirect';
      try {
        if (typeof WeixinJSBridge !== 'undefined') {
          wx.onMenuShareTimeline({
            link: u,
            desc: ctx.sharedesc,
            imgUrl: ctx.sharepic,
            title: ctx.sharetitle,
            success: function () {
              // 用户确认分享后执行的回调函数
              ctx.isShare = true;
              alert('timeline');
              if (ctx.ltyType) {
                ctx.$shareModal.remove();
                ctx.insertLottery(ctx._wwyId, ctx._mobile);
              } else {
                info('分享未成功！', {
                  time: 2000
                });
              }
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          });
          wx.onMenuShareAppMessage({
            link: u,
            desc: ctx.sharedesc,
            imgUrl: ctx.sharepic,
            title: ctx.sharetitle,
            success: function () {
              // 用户确认分享后执行的回调函数
              alert('message: _wwyId' + ctx._wwyId + ', _mobile:' + ctx._mobile);
              ctx.isShare = true;
              if (ctx.ltyType) {
                ctx.$shareModal.remove();
                ctx.insertLottery(ctx._wwyId, ctx._mobile);
              } else {
                info('分享未成功！', {
                  time: 2000
                });
              }
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
              //alert('11');
            }
          });
        }
      } catch (e) {
        console.error("pc端无微信接口！");
      }
    },
    /*生成奖品*/
    insertLottery: function (_wwyId, mobile) {
      var ctx = this;
     // alert('insertLlottery: _wwyId:' + _wwyId);
     // alert('insertLottery' + mobile + '_wwyId' + _wwyId);
      $.ajax({
        type: 'post',
        url: '/wwy/insertLottery',
        data: {
          id: _wwyId,
          mobile: mobile,
          openid: this.openid
        },
        success: function (result) {
          //alert('insertLotterySuccess' + result);
          if (result == '0') {
            alert('您已经抽过一次奖了');
            return false;
          }
          //alert('top' + result);
          ctx.getLottery && ctx.getLottery(mobile, result);
        }
      });
    },
    render: function () {
      this._render();
      //$('.lottery-container').html('');
      switch (this.ltyType) {
        case '1':
          this.card();
          break;
        case '2':
          this.wheel();
          break;
        case '3':
          this.shake();
          break;
        default:
          this.card();
          break;
      }
    }
  });

  module.exports = LotteryDraw;
});