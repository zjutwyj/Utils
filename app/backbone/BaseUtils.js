/**
 * @description BaseUtils
 * @class BaseUtils - 底层工具类
 * @author yongjin<zjut_wyj@163.com> 2015/1/27
 */
var BaseUtils = {
  /**
   * 初始化选择框
   *
   * @method [表单] - initSelect ( 初始化选择框 )
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
   *
   * @method [表单] - initDropDown ( 初始化下拉框 )
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
   * @method [地区] - initDistrict ( 初始化级联地区 )
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
        width: 100,
        addressUrl: options.url
      }));
    });
  },
  /**
   * 图片上传
   *
   * @method [上传] - initUpload ( 图片上传 )
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
   *      // 图片替换 主要用于图片空间里的图片替换操作
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
                type: type, // [local / source]打开的窗口类型， 如上传、资源库
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
    options.url = CONST.HOST + '/upload.html?albumId=' + options.albumId + '&username=' + options.username + '&replace=' + (options.replace ? '01' : '00') + '&attId=' + options.attId + '&auto=' + options.auto + '&uploadType=' + options.type + '&max=';

    return options;
  },
  /**
   * 初始化编辑器
   *
   * @method [表单] - initEditor ( 初始化编辑器 )
   * @param options
   * @author wyj 14.12.18
   * @example
   *      BaseUtils.initEditor({
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
          BaseUtils.initIframeDialog(BaseUtils.openUpload({
            id: 'uploadDialog',
            type: '',
            albumId: app.getData('curAlbumId'),
            username: app.getData('user') && app.getData('user').username,
            auto: true,
            oniframeload: function () {
              this.iframeNode.contentWindow.uploadCallback = function (result) {
                _this.loadBookmark();
                _this.pasteHTML("<img src='" + CONST.PIC_URL + '/' + result[0]['serverPath'] + "'/>");
              };
            },
            success: function () {
              var result = this.iframeNode.contentWindow.app.getView('picSource').getItems();
              _this.loadBookmark();
              _this.pasteHTML("<img src='" + CONST.PIC_URL + '/' + result[0]['serverPath'] + "'/>");
            }
          }));

          /*seajs.use(['Utils'], function (Utils) {
           Utils.openUpload();
           });*/
          /*  _this.showIframeModal('选择图片',
           CONST.DOMAIN + '/common/picUpload/upload.jsp?pageType=xheditor',
           function (v) {
           _this.loadBookmark();
           _this.pasteHTML(v);
           }, 800, 550);*/
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
        try {
          var editor = $(obj).xheditor(
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
        } catch (e) {
          debug(e);
        }
        if (options.viewId) {
          app.addView(options.viewId, editor);
        }
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
   * @method [复制] - initCopy ( 初始化复制按钮 )
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
   * 初始化拖动
   *
   * @method [拖放] - initDrag ( 初始化拖动 )
   * @param options
   * @author wyj 15.03.24
   * @example
   *     BaseUtils.initDrag({
        render: '.drag',
        resize: true, // 是否启用缩放
        dragend: function (ev, dd) { // 拖放结束后执行
          $(this).css({
            left: ((dd.offsetX * 100) / 320) + '%',
            top: ((dd.offsetY * 100) / 480) + '%',
            width: ($(this).width() * 100) / 320 + '%',
            height: ($(this).height() * 100) / 480 + '%'
          });
        },
        resizeend: function(ev, dd){ // 缩放结束后执行
          $(this).css({
            width: ($(this).width() * 100) / 320 + '%',
            height: ($(this).height() * 100) / 480 + '%'
          });
        },
        callback: function (ev, dd) {
        }
      });
   */
  initDrag: function (options) {
    seajs.use(['jquery', 'drag'], function ($, drag) {
      var _resize = false;
      $(options.render).click(function () {
        var $dragSelected = $(options.render + '.drag-selected');
        $dragSelected.removeClass('drag-selected');
        $('.drag-handle', $dragSelected).off().remove();
        $(this).addClass("drag-selected");
        options.click && options.click.call(this);
      })
        .drag("init", function () {
          if (!$(this).hasClass('lock')) {
            for (var name in CKEDITOR.instances) {
              CKEDITOR.instances[name].destroy()
            }
          }
          if ($(this).hasClass('lock')) return false;
          if ($(this).is('.drag-selected'))
            return $('.drag-selected');
        }).drag('start', function (ev, dd) {
          if (!$(this).hasClass('drag-selected')) {
            $(this).append('<div class="drag-handle NE"></div> <div class="drag-handle NN"></div> <div class="drag-handle NW"></div> <div class="drag-handle WW">' +
              '</div> <div class="drag-handle EE"></div> <div class="drag-handle SW"></div> <div class="drag-handle SS"></div> <div class="drag-handle SE"></div>');
            $(this).addClass("drag-selected");
          }
          dd.attr = $(ev.target).prop("className");
          dd.width = $(this).width();
          dd.height = $(this).height();
          options.dragstart && options.dragstart.apply(this, [ev, dd]);
        }).drag(function (ev, dd) {
          var props = {};
          _resize = false;
          if ($(this).hasClass('lock')) return false;
          if (options.resize) {
            debug('resize');
            if (dd.attr.indexOf("E") > -1) {
              _resize = true;
              props.width = Math.max(1, dd.width + dd.deltaX);
            }
            if (dd.attr.indexOf("S") > -1) {
              _resize = true;
              props.height = Math.max(1, dd.height + dd.deltaY);
            }
            if (dd.attr.indexOf("W") > -1) {
              _resize = true;
              props.width = Math.max(1, dd.width - dd.deltaX);
              props.left = dd.originalX + dd.width - props.width;
            }
            if (dd.attr.indexOf("N") > -1) {
              _resize = true;
              props.height = Math.max(1, dd.height - dd.deltaY);
              props.top = dd.originalY + dd.height - props.height;
            }
          }
          if (!_resize) {
            props.top = dd.offsetY;
            props.left = dd.offsetX;
          }
          $(this).css(props);
          if (!_resize) {
            options.callback && options.callback.apply(this, [ev, dd]);
          }
        }, { relative: true}).drag('dragend', function (ev, dd) {
          if ($(this).hasClass('lock')) return false;
          if (!_resize) {
            debug('resize end');
            options.dragend && options.dragend.apply(this, [ev, dd]);
          } else {
            options.resizeend && options.resizeend.apply(this, [ev, dd]);
          }
        });
    });
  },
  /**
   * 初始化缩放
   *
   * @method [缩放] - initResize ( 初始化缩放 )
   * @param optoins
   * @author wyj 15.03.24
   * @example
   *      BaseUtils.initResize({
     *        render: 'img',
     *        callback: function(ev, dd){}
     *      });
   */
  initResize: function (options) {
    seajs.use(['drag'], function (drag) {
      $(options.render).drag("start", function (ev, dd) {
        dd.width = $(this).width();
        dd.height = $(this).height();
        options.dragstart && options.dragstart.apply(this, [ev, dd]);
      }).drag(function (ev, dd) {
        $(this).css({
          width: Math.max(20, dd.width + dd.deltaX),
          height: Math.max(20, dd.height + dd.deltaY)
        });
        options.callback && options.callback.apply(this, [ev, dd]);
      }, { relative: true, handle: '.drag-handle'}).drag('dragend', function (ev, dd) {
        options.dragend && options.dragend.apply(this, [ev, dd]);
      });
    });
  },
  /**
   * 对话框
   *
   * @method [对话框] - dialog
   * @param options [title: ][width: ][height: ][target: ][success: 确定按钮回调]
   * @author wyj 14.12.18
   * @example
   *      BaseUtils.initDialog({
       *         id: 'copyDialog',
       *         title: '复制图片',
       *         target: '.btn-email-bind',
       *         width: 800,
       *         hideCloseBtn: false, // 是否隐藏关闭按钮
       *         content: this.copyDetail({
       *           filename: this.model.get('filename'),
       *           serverPath: this.model.get('serverPath')
       *         }),
       *         cover: true, // 是否显示遮罩
       *         load: function(){
       *           ...base.js
       *         },
       *         success: function(){
       *           this.close();
       *         }
       *       });
   */
  initDialog: function (options) {
    var button = options.button || [];
    seajs.use(['dialog-plus'], function (dialog) {
      if (options.success) {
        button.push({ value: '确定', autofocus: true,
          callback: function () {
            options.success.apply(this, arguments);
          }
        });
      }
      if (!options.hideCloseBtn) {
        button.push({
          value: '关闭',
          callback: function () {
            this.close().remove();
          } });
      }
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
        try {
          this.iframeNode.contentWindow.topDialog = thisDialog;
          this.iframeNode.contentWindow.app = app;
          delete app.getRoutes()['index'];
        } catch (e) {
        }
        if (typeof options.load === 'function') {
          options.load.call(this, arguments);
        }
      }
      if (options.cover) {
        app.addDialog(dialog(options), options.id).showModal(options.target);
      } else {
        app.addDialog(dialog(options), options.id).show(options.target);
      }
    });
  },
  /**
   * 打开iframe对话框
   *
   * @method [对话框] - iframeDialog
   * @param options [url: ''] [title: 标题][width: ][height: ][success: 确定按钮成功回调方法][target:　绑定到对象]
   * @author wyj 14.12.15
   * @example
   *      BaseUtils.initIframeDialog({
       *         title: '黑名单',
       *         url: CONST.DOMAIN + '/user/blacklist/view',
       *         width: 500,
       *         target: '.name',
       *         success: function(){
       *             this.title(CONST.SUBMIT_TIP);
       *             this.iframeNode.contentWindow.$("#submit").click();
       *             return false;
       *         }
       *       });
   */
  initIframeDialog: function (options) {
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
   * 提示信息
   *
   * @method [对话框] - initTip
   * @param msg
   * @param options
   * @author wyj 14.12.18
   * @example
   *      BaseUtils.initTip('提示内容', {
       *        time: 1000,
       *        title: '温馨提示'
       *      });
   */
  initTip: function (msg, options) {
    options = options || {time: 3000, title: '提示信息：'};
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
   * 确认框， 比如删除操作
   *
   * @method [对话框] - initConfirm
   * @param opts [title: 标题][content: 内容][success: 成功回调]
   * @author wyj 14.12.8
   * @example
   *      BaseUtils.initConfirm({
       *        title: '提示',
       *        target: this.$('.name').get(0),
       *        content: '是否删除?',
       *        success: function(){
       *          ...
       *        }
       *      });
   */
  initConfirm: function (opts) {
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
        width: options.width || 200,
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
   * 添加加载动画
   * @method [加载] - addLoading
   * @param optoins
   * @author wyj 15.04.08
   * @example
   *      BaseUtils.addLoading();
   */
  addLoading: function (options) {
    try {
      if (window.$loading) window.$loading.remove();
      window.$loading = $('<div class="loading"></div>');
      $('body').append(window.$loading);
    } catch (e) {
      debug('【Error】' + e);
    }
    return window.$loading;
  },
  /**
   * 移除加载动画
   * @method [加载] - removeLoading
   * @author wyj 15.04.08
   * @example
   *      BaseUtils.removeLoading();
   */
  removeLoading: function () {
    if (window.$loading) window.$loading.remove();
    else $('.loading').remove();
  },
  /**
   * input鼠标点击提示
   *
   * @method [提示] - initTooltip
   * @param msg
   * @param options
   * @author wyj 14.12.24
   * @example
   *        this.$('input, textarea').each(function(){
       *          var title = $(this).attr('title');
       *          if (title){
       *            $(this).click(function(){
       *            BaseUtils.initTooltip(title, {
       *              align: 'right',
       *              target: $(this).get(0)
       *            });
       *          });
       *          }
       *        });
   */
  initTooltip: function (msg, options) {
    options = Est.extend({
      id: Est.nextUid('dialog'),
      content: msg,
      time: 4000,
      align: 'right',
      padding: 5
    }, options);
    seajs.use(['dialog-plus'], function (dialog) {
      window.tooltipDialog && window.tooltipDialog.close();
      window.tooltipDialog = app.addDialog(dialog(options)).show(options.target);
      setTimeout(function () {
        window.tooltipDialog.close().remove();
      }, options.time);
    });
  },
  /**
   * 调用方法 - 命令模式[说明， 只有在需要记录日志，撤销、恢复操作等功能时调用该方法]
   *
   * @method [调用] - execute ( 调用方法 )
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
