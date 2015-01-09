/**
 * @description 基础工具类
 * @class BaseUtils - 工具类
 * @author yongjin<zjut_wyj@163.com> 2014/12/2
 */

define('BaseUtils', ['jquery', 'HandlebarsHelper'],
  function (require, exports, module) {
    var BaseUtils, HandlebarsHelper;

    HandlebarsHelper = require('HandlebarsHelper');

    BaseUtils = {
      /**
       * 初始化选择框
       *
       * @method [表单] - initSelect
       * @param options [target: '#category'  input元素选择符][render: '#s1' 渲染到哪个DIV下]
       * [itemId: 'value' 相应ID][width: 宽度][items: [] 列表][change: 选项改变回调方法]
       * @return {Est.promise}
       * @author wyj 14.12.18
       * @example
       *      BaseUtils.initSelect({
       *         render: '#s1',
       *         target: '#model-parentId',
       *         items: [],
       *         change: function(changeId){
       *           console.log(changeId);
       *         }
       *       }).then(function(itemId){
       *          console.log(itemId);
       *       });
       */
      initSelect: function (options) {
        var $q = Est.promise;
        return new $q(function (resove, reject) {
          var container = {};
          var target = options.target || '#category';
          var render = options.render || '#s1';
          var itemId = options.itemId || 'value';
          var width = options.width || '150';
          var items = options.items || [];
          BUI.use('bui/select', function (Select) {
            container[render] = new Select.Select({
              render: render,
              valueField: target,
              width: width,
              items: items
            });
            container[render].render();
            container[render].on('change', function (ev) {
              $(target).val(Est.trim(ev.item[itemId]));
              if (typeof options.change !== 'undefined')
                options.change.call(this, ev.item[itemId], ev);
              resove(ev.item[itemId]);
            });
          });
        });
      },
      /**
       * 初始化级联地区
       *
       * @method [地区] - initDistrict
       * @author wyj 15.1.6
       * @example
               BaseUtils.initDistrict({
                 id: 'district1' ,// 必填
                 target: '#district-container', // 目标选择符
                 path: '...'
               });
       */
      initDistrict: function (options) {
        seajs.use(['District'], function (District) {
          app.addPanel(options.id, {
            el: options.target,
            template: '<div class="district-inner ' + options.id + '"></div>'
          });
          app.addView(options.id, new District({
            el: '.' + options.id,
            viewId: options.id,
            target: options.target,
            path: options.path
          }));
        });
      },
      /**
       * 初始化tab选项卡
       *
       * @method [选项卡] - initTab
       * @param options
       * @author wyj 14.12.24
       * @example
       *        BaseUtils.initTab({
       *          render: '#tab',
       *          elCls: 'nav-tabs',
       *          panelContainer: '#panel',
       *          autoRender: true,
       *          children: [
       *            {title: '常规', value: '1', selected: true},
       *            {title: '产品描述', value: '2'},
       *            {title: '产品属性', value: '3'},
       *            {title: '商城属性', value: '4'},
       *            {title: '产品标签', value: '5'},
       *            {title: '搜索引擎优化', value: '6'}
       *          ]
       *        });
       */
      initTab: function (options) {
        BUI.use(['bui/tab', 'bui/mask'], function (Tab) {
          var tab = new Tab.TabPanel(options);
          tab.on('selectedchange', function (ev) {
            BaseUtils.resetIframe();
          });
        });
      },
      /**
       * 图片上传
       *
       * @method [上传] - initUpload
       * @param options [render:　选择符][context: 上下文]
       * @author wyj 14.12.17
       * @example
       *      // 图片添加
       *      BaseUtils.openUpload({
       *       albumId: app.getData('curAlbumId'),
       *       username: app.getData('user').username, // 必填
       *       auto: true,
       *       oniframeload: function(){
       *         this.iframeNode.contentWindow.uploadCallback = doResult;
       *       }
       *      });
       *      // 图片替换
       *      BaseUtils.openUpload({
       *        id: 'replaceDialog' + id,
       *        title: '图片替换',
       *        albumId: app.getData('curAlbumId'), // 必填
       *        username: app.getData('user').username, // 必填
       *        replace: true, // 必填
       *        attId: this.model.get('attId'), // 必填
       *        oniframeload: function () {
       *          this.iframeNode.contentWindow.uploadCallback = function (results) { // results返回结果
       *          ctx.model.set('uploadTime', new Date().getTime());
       *          window['replaceDialog' + id].close().remove();
       *          };
       *        }
       *      });
       *      // 选取图片
       *      BaseUtils.openUpload({
                id: 'uploadDialog',
                type: type,
                albumId: app.getData('curAlbumId'),
                username: app.getData('user') && app.getData('user').username,
                auto: true,
                oniframeload: function(){
                  this.iframeNode.contentWindow.uploadCallback = function(result){
                    ctx.addItems(result);
                  };
                },
                success: function(){
                  var result = this.iframeNode.contentWindow.app.getView('picSource').getItems();
                  ctx.addItems(result);
                }
              });
       */
      openUpload: function (options) {
        if (typeof options === 'undefined') {
          console.error('图片上传配置不能为空');
        }
        options = Est.extend({
          title: '上传图片',
          width: 650,
          height: 350,
          albumId: '',
          padding: 5,
          username: '',
          attId: '',
          auto: false,
          replace: false,
          type: 'local'
        }, options);
        options.url = CONST.HOST + '/modules/upload/upload.html?albumId=' + options.albumId + '&username=' + options.username + '&replace=' + (options.replace ? '01' : '00') + '&attId=' + options.attId + '&auto=' + options.auto + '&uploadType=' + options.type + '&max=';
        this.iframeDialog(options);
      },
      /**
       * 初始化日期选择器
       *
       * @method [表单] - initDate
       * @param options [render: 选择符][showTime: true/false 是否显示时间]
       * @author wyj 14.12.17
       * @example
       *      BaseUtils.initDate({
       *         render: '.calendar',
       *         showTime: false
       *       });
       */
      initDate: function (options) {
        BUI.use('bui/calendar', function (Calendar) {
          new Calendar.DatePicker({
            trigger: options.render || '.calendar',
            showTime: options.showTime || false,
            autoRender: true
          });
        });
      },
      /**
       * 初始化多标签
       *
       * @method [表单] - initCombox
       * @param options
       * @return {Est.promise}
       * @author wyj 14.12.17
       * @example
       *      BaseUtils.initCombox({
       *         render: '#tag',
       *         target: '#model-tag',
       *         itemId: 'categoryId'
       *           items: [ '选项一', '选项二', '选项三', '选项四' ]
       *       });
       */
      initCombox: function (options) {
        var $q = Est.promise;
        return new $q(function (resolve, reject) {
          var container = {};
          var target = options.target || '#category';
          var render = options.render || '#s1';
          var itemId = options.itemId || 'categoryId';
          var width = options.width || '500';
          var items = options.items || [];
          BUI.use('bui/select', function (Select) {
            container[render] = new Select.Combox({
              render: render,
              showTag: true,
              valueField: target,
              elCls: 'bui-tag-follow',
              width: width,
              items: items
            });
            container[render].render();
            /*container[render].on('change', function (ev) {
             //$(target).val($(target)Est.trim(ev.item[itemId]));
             if (typeof options.change !== 'undefined')
             options.change.call(this, ev.item[itemId]);
             });*/
          });
        });
      },
      /**
       * 初始化编辑器
       *
       * @method [表单] - initEditor
       * @param options
       * @author wyj 14.12.18
       * @example
       *      BaseUtils.initEditor({
       *        render: '.ckeditor'
       *      });
       */
      initEditor: function (options) {
        seajs.use(['xheditor'], function (xheditor) {
          function startEditor(obj) {
            $(obj).xheditor(
              {
                tools: 'Preview,Fullscreen,Source,|,contact,abbccQQ,abbccMap,abbccLayout,abbccQrcode,|,Table,abbccImages,abbccFlash,Media,|,FontColor,BackColor,|,Align,Underline,Italic,Bold,|,FontSize,Fontface,|,Link,Unlink',
                layerShadow: 2,
                html5Upload: false,
                upBtnText: '浏览',
                upLinkExt: 'jpg,png,bmp',
                upImgUrl: '/fileUpload/uploadByJson',
                upFlashUrl: '/fileUpload/uploadByJson',
                upMediaUrl: '/fileUpload/uploadByJson',
                upFlashExt: "swf",
                upMediaExt: 'wmv,avi,wma,mp3,mid',
                linkTag: true,
                internalScript: true,
                inlineScript: true
              });
          }

          $(function () {
            $(options.render || '.ckeditor').each(function () {
              startEditor($(this));
            });

          });
        });
      },
      /**
       * 提示信息
       *
       * @method [对话框] - tip
       * @param msg
       * @param options
       * @author wyj 14.12.18
       * @example
       *      BaseUtils.tip('提示内容', {
       *        time: 1000,
       *        title: '温馨提示'
       *      });
       */
      tip: function (msg, options) {
        options = options || {time: 2000, title: '提示信息：'};
        seajs.use(['dialog-plus'], function (dialog) {
          window.tipsDialog = app.addDialog(dialog({
            id: 'tip-dialog' + Est.nextUid(),
            title: options.title,
            width: 200,
            content: msg
          })).show();
          setTimeout(function () {
            window.tipsDialog.close().remove();
          }, options.time);
        });
      },
      /**
       * input鼠标点击提示
       *
       * @method [提示] - tooltip
       * @param msg
       * @param options
       * @author wyj 14.12.24
       * @example
       *        this.$('input, textarea').each(function(){
       *          var title = $(this).attr('title');
       *          if (title){
       *            $(this).click(function(){
       *            BaseUtils.tooltip(title, {
       *              align: 'right',
       *              target: $(this).get(0)
       *            });
       *          });
       *          }
       *        });
       */
      tooltip: function (msg, options) {
        options = Est.extend({
          id: 'dialog' + Est.nextUid(),
          content: msg,
          time: 4000,
          align: 'right',
          padding: 5
        }, options);
        seajs.use(['dialog-plus'], function (dialog) {
          window.tooltipDialog = app.addDialog(dialog(options)).show(options.target);
          setTimeout(function () {
            window.tooltipDialog.close().remove();
          }, options.time);
        });
      },
      /**
       * 确认框， 比如删除操作
       *
       * @method [对话框] - comfirm
       * @param opts [title: 标题][content: 内容][success: 成功回调]
       * @author wyj 14.12.8
       * @example
       *      BaseUtils.comfirm({
       *        title: '提示',
       *        target: this.$('.name').get(0),
       *        content: '是否删除?',
       *        success: function(){
       *          ...
       *        }
       *      });
       */
      comfirm: function (opts) {
        var options = {
          title: '温馨提示：',
          content: '是否删除！',
          success: function () {
          },
          target: null
        };
        Est.extend(options, opts);
        seajs.use(['dialog-plus'], function (dialog) {
          window.comfirmDialog = app.addDialog(dialog({
            id: 'dialog' + Est.nextUid(),
            title: options.title,
            content: options.content,
            width: 150,
            button: [
              {
                value: '确定',
                autofocus: true,
                callback: function () {
                  options.success.call(this);
                }},
              {
                value: '取消',
                callback: function () {
                  window.comfirmDialog.close().remove();
                }
              }
            ]
          })).show(options.target);
        });
      },
      /**
       * 重置对话框高度
       * @method [对话框] - resetIframe
       * @author wyj 14.11.16
       * @example
       *      BaseUtils.resetIframe(dialog);
       */
      resetIframe: function (dialog) {
        var height = $(document).height();
        var dialog = dialog || window.topDialog || window.detailDialog;
        if (!dialog) {
          debug('未找到需要重置高度的对话框！');
        }
        try {
          if (dialog && dialog.height) {
            dialog.height(height);
            dialog.reset();
          }
        } catch (e) {
          console.error('【error】: BaseDetail.resetIframe' + e);
        }
      },
      /**
       * 对话框
       *
       * @method [对话框] - dialog
       * @param options [title: ][width: ][height: ][target: ][success: 确定按钮回调]
       * @author wyj 14.12.18
       * @example
       *      BaseUtils.dialog({
       *         id: 'copyDialog',
       *         title: '复制图片',
       *         target: '.btn-email-bind',
       *         width: 800,
       *         content: this.copyDetail({
       *           filename: this.model.get('filename'),
       *           serverPath: this.model.get('serverPath')
       *         }),
       *         load: function(){
       *           ...base.js
       *         },
       *         success: function(){
       *           this.close();
       *         }
       *       });
       */
      dialog: function (options) {
        var button = options.button || [];
        seajs.use(['dialog-plus'], function (dialog) {
          var thisDialog = {};
          if (options.success) {
            button.push({ value: '确定', autofocus: true,
              callback: function () {
                options.success.apply(this, arguments);
              }
            });
          }
          button.push({
            value: '关闭',
            callback: function () {
              this.close().remove();
            } });
          options = Est.extend({
            id: 'dialog' + Est.nextUid(),
            title: '对话框',
            width: 150, content: '',
            button: button
          }, options);
          if (options.target) {
            options.target = $(options.target).get(0);
          }
          options.oniframeload = function () {
            this.iframeNode.contentWindow.topDialog = thisDialog;
            this.iframeNode.contentWindow.app = app;
            if (typeof options.load === 'function') {
              options.load.call(this, arguments);
            }
          }
          thisDialog = app.addDialog(dialog(options)).show(options.target);
        });
      },
      /**
       * 打开iframe对话框
       *
       * @method [对话框] - iframeDialog
       * @param options [url: ''] [title: 标题][width: ][height: ][success: 确定按钮成功回调方法][target:　绑定到对象]
       * @author wyj 14.12.15
       * @example
       *      BaseUtils.iframeDialog({
       *         title: '黑名单',
       *         url: CONST.DOMAIN + '/user/blacklist/view',
       *         width: 500,
       *         target: '.name',
       *         success: function(){
       *             this.title('提交中..');
       *             this.iframeNode.contentWindow.$("#submit").click();
       *             return false;
       *         }
       *       });
       */
      iframeDialog: function (options) {
        var button = [];
        if (options.success) {
          button.push({
            value: '确定',
            autofocus: true,
            callback: function () {
              options.success.call(this);
            }});
        }
        button.push({
          value: '关闭',
          callback: function () {
            this.close().remove();
          }
        });
        options = Est.extend({
          id: 'dialog',
          title: '窗口',
          url: '',
          width: 150,
          height: 'auto',
          target: null,
          button: button
        }, options);
        seajs.use(['dialog-plus'], function (dialog) {
          window[options.id ||
            'iframeDialog'] = dialog(options).show(options.target);
        });
      },
      /**
       * 初始化复制按钮
       *
       * @method [复制] - initCopy
       * @param selecter
       * @param options
       * @author wyj 14.12.18
       * @example
       *        BaseUtils.initCopy('#photo-copy-dialog', {
       *           success: function(){
       *             window.copyDialog.close();
       *           }
       *         });
       *
       */
      initCopy: function (selecter, options) {
        var ctx = this;
        seajs.use(['ZeroClipboard'], function (ZeroClipboard) {
          var client = new ZeroClipboard($(selecter).get(0), {
            moviePath: CONST.HOST + "/swf/ZeroClipboard.swf"
          });
          client.on('ready', function (event) {
            // console.log( 'movie is loaded' );
            client.on('copy', function (event) {
              event.clipboardData.setData('text/plain', options.callback ||
                $(event.target).attr('data-clipboard-text'));
            });
            client.on('aftercopy', function (event) {
              ctx.tip('复制成功', {
                time: 1000
              });
              console.log('Copied text to clipboard: ' +
                event.data['text/plain']);
              options.success && options.success.call(this, event.data['text/plain']);
            });
          });
          client.on('error', function (event) {
            // console.log( 'ZeroClipboard error of type "' + event.name + '": ' + event.message );
            ZeroClipboard.destroy();
            options.failed && options.failed.call(this, event.message);
          });
        });
      }
    };

    module.exports = BaseUtils;
  }
);