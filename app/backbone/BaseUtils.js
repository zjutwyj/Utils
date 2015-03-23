/**
 * @description BaseUtils
 * @class BaseUtils - 工具类
 * @author yongjin<zjut_wyj@163.com> 2015/1/27
 */
define('BaseUtils', [], function (require, exports, module) {

  var BaseUtils = {
    /**
     * 初始化选择框
     * @method initSelect
     * @param options
     * @author wyj 15.1.27
     * @example
     *      BaseUtils.initSelect({
            render: '#select',  // 渲染区域
            target: '#model-categoryId', // 目标input元素
            text: 'name', // 名称字段
            value: 'categoryId', // 值字段
            items: app.getData('product_category_list'), // 列表
            search: true, // 是否显示搜索框
            change: function (ev) { // select事件
                console.log(ev);
            }
        });
     */
    initSelect: function (options) {
      var tagId = options.viewId || Est.nextUid('select');
      options = Est.extend({
        el: '.' + tagId,
        viewId: tagId,
        data: {
          width: options.width || 150
        } }, options);
      seajs.use(['Select'], function (Select) {
        options.el = '.' + tagId;
        app.addPanel(tagId, {
          el: options.render,
          template: '<div class="select-inner ' + tagId + '"></div>'
        }).addView(tagId, new Select(options));
      });

      // bui select
      /*var $q = Est.promise;
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
       });*/
    },
    /**
     * 初始化下拉框
     * @method initDropDown
     * @param options
     * @author wyj 15.2.17
     * @example
     *      BaseUtils.initDropDown({
            target: '#drop-down-content', // 显示下拉框的触发按钮
            height: 250, // 默认为auto
            width: 150, // 默认为auto
            //overflowX: 'auto', // 默认为hidden
            content: $('#template-drop-down').html(), // 显示内容
            callback: function (options) { // 下拉框渲染完成后的回调函数
                setTimeout(function(){
                    app.getView(options.dropDownId).reflesh(function () { // 刷新
                        this._options.items = ['111']; // 重新设置options参数里的items
                    });
                    app.getView(options.dropDownId).hide(); // dropDownId 为当前下拉框的viewId
                }, 1000);
            }
        });
     BaseUtils.initDropDown({
            target: '#drop-down-module-id',
            moduleId: 'AttributesAdd',
            items: ['111', '222', '333'],
            callback: function(options){
                setTimeout(function(){
                    app.getView(options.dropDownId).hide();
                }, 1000);
            }
        });
     */
    initDropDown: function (options) {
      seajs.use(['DropDown'], function (DropDown) {
        var viewId = Est.nextUid('dropDown');
        var isDropDown = false;
        $(options.target).click(function (e) {
          if (!isDropDown) {
            app.addPanel(viewId, { el: 'body',
              template: '<div class="drop-down-container-' + viewId + '"></div>'
            }).addView(viewId, new DropDown(Est.extend(options, {
              el: '.drop-down-container-' + viewId,
              viewId: viewId,
              data: {
                width: options.width || 'auto',
                height: options.height || 'auto',
                overflowX: options.overflowX || 'hidden'
              }
            })));
            app.getView(viewId).show(e);
            isDropDown = true;
          } else {
            app.getView(viewId).show(e);
          }
        });
      });
    },
    /**
     * 初始化级联地区
     *
     * @method [地区] - initDistrict
     * @author wyj 15.1.6
     * @example
     *        BaseUtils.initDistrict({
                 id: 'district1' ,// 必填
                 render: '#district-container', // 目标选择符
                 target: '#model-dist',
                 path: '...',
                 url: CONST.API + '/shop/receiver/list' // 自定义请求地址
               });
     */
    initDistrict: function (options) {
      seajs.use(['District'], function (District) {
        app.addPanel(options.id, {
          el: options.render,
          template: '<div class="district-inner ' + options.id + '"></div>'
        });
        app.addView(options.id, new District({
          el: '.' + options.id,
          viewId: options.id,
          target: options.render, // target为需要渲染到的目标元素中
          input: options.target, // input 为绑定的input元素
          path: options.path,
          addressUrl: options.url
        }));
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
     *      Utils.openUpload({
       *       albumId: app.getData('curAlbumId'),
       *       username: app.getData('user').username, // 必填
       *       auto: true,
       *       oniframeload: function(){
       *         this.iframeNode.contentWindow.uploadCallback = doResult;
       *       }
       *      });
     *      // 图片替换
     *      Utils.openUpload({
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
     *      Utils.openUpload({
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
      if (typeof options === 'undefined') console.error('图片上传配置不能为空');

      options = Est.extend({ title: '上传图片', width: 650, height: 350, albumId: '', padding: 5, username: '', attId: '', auto: false, replace: false, type: 'local' }, options);
      options.url = CONST.HOST + '/modules/upload/upload.html?albumId=' + options.albumId + '&username=' + options.username + '&replace=' + (options.replace ? '01' : '00') + '&attId=' + options.attId + '&auto=' + options.auto + '&uploadType=' + options.type + '&max=';

      return options;
    },
    /**
     * 初始化编辑器
     *
     * @method [表单] - initEditor
     * @param options
     * @author wyj 14.12.18
     * @example
     *      Utils.initEditor({
       *        render: '.ckeditor'
       *      });
     */
    initEditor: function (options) {
      var allPlugin = {
        contact: {
          c: 'xheContact',
          t: '插入联系方式',
          e: function () {
            var _this = this;
            _this.showIframeModal('插入联系方式',
                CONST.DOMAIN + '/user_v2/enterprise/updateuser/getUserBySession',
              function (v) {
                _this.loadBookmark();
                _this.pasteHTML(v);
              }, 700, 510);
          }
        },
        abbccMap: {
          c: 'xheBtnMap',
          t: '选择Google/Baidu地圖',
          e: function () {
            var _this = this;
            _this.showIframeModal('选择Google/Baidu地圖',
                CONST.HOST + '/vendor/xheditor/xheditor-tools/abbcc-map/index.html',
              function (v) {
                _this.loadBookmark();
                _this.pasteHTML(v);
              }, 700, 510);
          }
        },
        abbccLayout: {
          c: 'xheBtnLayout',
          t: '选择模版',
          e: function () {
            var _this = this;
            _this.showIframeModal('选择模版',
                CONST.HOST + '/vendor/xheditor/xheditor-tools/abbcc-layout/index.html',
              function (v) {
                _this.loadBookmark();
                _this.pasteHTML(v);
              }, 660, 500);
          }
        },
        abbccQrcode: {
          c: 'xheBtnQrcode',
          t: '生成二维码',
          e: function () {
            var _this = this;
            _this.showIframeModal('生成二维码',
                CONST.HOST + '/vendor/xheditor/xheditor-tools/abbcc-qrcode/index.html',
              function (v) {
                _this.loadBookmark();
                _this.pasteHTML(v);
              }, 800, 300);
          }
        },
        abbccImages: {
          c: 'xheIcon xheBtnImg',
          t: '选择图片',
          s: 'ctrl+8',
          e: function () {
            var _this = this;
            _this.showIframeModal('选择图片',
                CONST.DOMAIN + '/common/picUpload/upload.jsp?pageType=xheditor',
              function (v) {
                _this.loadBookmark();
                _this.pasteHTML(v);
              }, 800, 550);
          }
        },
        abbccFlash: {
          c: 'xheIcon xheBtnFlash',
          t: '选择flash',
          s: 'ctrl+7',
          e: function () {
            var _this = this;
            _this.showIframeModal('选择flash',
              '/user/album/albumshowFlashPage?pageType=xheditor',
              function (v) {
                _this.loadBookmark();
                _this.pasteHTML(v);
              }, 600, 300);
          }
        },
        abbccQQ: {
          c: 'xheBtnQQ',
          t: '选择QQ/MSN/Skype/阿里旺旺/淘宝旺旺',
          s: 'ctrl+9',
          e: function () {
            var _this = this;
            _this.showIframeModal('选择QQ/MSN/Skype/阿里旺旺/淘宝旺旺',
                CONST.DOMAIN + '/user_v2/qq/index.jsp',
              function (v) {
                _this.loadBookmark();
                _this.pasteHTML(v);
              }, 600, 300);
          }
        }

      };
      seajs.use(['xheditor'], function (xheditor) {
        function startEditor(obj) {
          $(obj).xheditor(
            {
              plugins: allPlugin,
              tools: 'Preview,Fullscreen,Source,|,contact,abbccQQ,abbccMap,abbccLayout,abbccQrcode,|,Table,abbccImages,abbccFlash,Media,|,FontColor,BackColor,|,Align,Underline,Italic,Bold,|,FontSize,Fontface,|,Link,Unlink',
              skin: 'vista',
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
              height: 400,
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
     * 初始化复制按钮
     *
     * @method [复制] - initCopy
     * @param selecter
     * @param options
     * @author wyj 14.12.18
     * @example
     *        Utils.initCopy('#photo-copy-dialog', {
       *           success: function(){
       *             window.copyDialog.close();
       *           }
       *         });
     *
     */
    initCopy: function (selecter, options, callback) {
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
            callback.call(this, event.data['text/plain']);
            console.log('Copied text to clipboard: ' + event.data['text/plain']);
            options.success && options.success.call(this, event.data['text/plain']);
          });
        });
        client.on('error', function (event) {
          // console.log( 'ZeroClipboard error of type "' + event.name + '": ' + event.message );
          ZeroClipboard.destroy();
          options.failed && options.failed.call(this, event.message);
        });
      });
    },
    /**
     * 调用方法 - 命令模式[说明， 只有在需要记录日志，撤销、恢复操作等功能时调用该方法]
     * @method [调用] - execute
     * @param name
     * @return {*}
     * @author wyj 15.2.15
     * @example
     *      BaseUtils.execute( "initSelect", {
     *        ...
     *      }, this);
     */
    execute: function (name) {
      debug('- 调用工具类方法：' + name);
      return BaseUtils[name] && BaseUtils[name].apply(BaseUtils, [].slice.call(arguments, 1));
    }
  }

  module.exports = BaseUtils;
});