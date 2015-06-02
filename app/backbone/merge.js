/**
 * @description merge
 * @class merge
 * @author yongjin<zjut_wyj@163.com> 2015/6/1
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
    options.url = CONST.HOST + '/modules/upload/upload.html?albumId=' + options.albumId + '&username=' + options.username + '&replace=' + (options.replace ? '01' : '00') + '&attId=' + options.attId + '&auto=' + options.auto + '&uploadType=' + options.type + '&max=';

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
          seajs.use(['Utils'], function (Utils) {
            Utils.openUpload({
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
            });
          });
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
var BaseService = function () {
  if (typeof BaseService.instance === 'object') {
    return BaseService.instance;
  }
  debug('- 创建BaseService实例');
  BaseService.instance = this;
}
BaseService.prototype = {
  /**
   * 基础ajax
   *
   * @method ajax
   * @param options
   * @return {*}
   * @author wyj 15.1.26
   * @example
   *        new BaseService().ajax(options).done(function (result) {
                if (result.attributes) {
                  ...
                }
              });
   */
  ajax: function (options) {
    var data = Est.extend({ _method: 'GET' }, options);
    return $.ajax({
      type: 'post',
      url: options.url,
      async: false,
      data: data,
      success: function (result) {
      }
    });
  },
  /**
   * 初始化树
   *
   * @method initTree
   * @private
   * @param options
   * @param result
   * @author wyj 15.1.26
   */
  initTree: function (options, result) {
    if (options.tree) {
      result.attributes.data = Est.bulidTreeNode(result.attributes.data, options.rootKey, options.rootValue, {
        categoryId: options.categoryId,// 分类ＩＤ
        belongId: options.belongId,// 父类ＩＤ
        childTag: options.childTag, // 子分类集的字段名称
        sortBy: options.sortBy, // 按某个字段排序
        callback: function (item) {
          if (options.tree) {
            item.text = item[options.text];
            item.value = item[options.value];
          }
        }
      });
    }
  },
  /**
   * 初始化选择框
   *
   * @method initSelect
   * @private
   * @param options
   * @param result
   * @author wyj 15.1.26
   */
  initSelect: function (options, result) {
    if (options.select) {
      Est.each(result.attributes.data, function (item) {
        item.text = item[options.text];
        item.value = item[options.value];
      });
      if (options.tree) {
        result.attributes.data = Est.bulidSelectNode(result.attributes.data, 1, {
          name: 'text'
        });
      }
    }
  },
  /**
   * 初始化是否展开
   *
   * @method initExtend
   * @private
   * @param options
   * @param result
   * @author wyj 15.1.27
   */
  initExtend: function (options, result) {
    if (options.extend) {
      result.attributes.data = Est.extendTree(result.attributes.data);
    }
  },
  /**
   * 添加默认选项
   *
   * @method initDefault
   * @private
   * @param options
   * @param result
   * @author wyj 15.1.27
   */
  initDefault: function (options, result) {
    if (options.defaults && Est.typeOf(result.attributes.data) === 'array') {
      result.attributes.data.unshift({text: '请选择', value: '/'});
    }
  },
  /**
   * 基础工厂类 - 工厂模式，通过不同的url请求不同的数据
   *
   * @method factory
   * @param options
   * @return {Est.promise}
   * @author wyj 15.1.26
   * @example
   *      new BaseService().factory({
              url: '', // 请求地址
              select: true, // 是否构建下拉框
              tree: true, // 是否构建树
              extend: true, // 是否全部展开
              defaults： false, // 是否添加默认选项

              // 如果tree为true时， 表示需要构建树， 则需补充以下字段
              rootKey: 'isroot', // 构建树时的父级字段名称
              rootValue: '01', // 父级字段值
              categoryId: 'categoryId', //分类 Id
              belongId: 'belongId', // 父类ID
              childTag: 'cates', // 子集字段名称
              sortBy: 'sort', // 根据某个字段排序

              // 如果select为true时 ，表示需要构建下拉框， 则下面的text与value必填
              text: 'name', // 下拉框名称
              value: 'categoryId', // 下拉框值
            });

   */
  factory: function (options) {
    var ctx = this;
    var $q = Est.promise;
    options = Est.extend({ select: false, extend: false,
      defaults: true, tree: false }, options);
    return new $q(function (topResolve, topReject) {
      ctx.ajax(options).done(function (result) {
        if (result.attributes) {
          ctx.initTree(options, result);
          ctx.initSelect(options, result);
          ctx.initExtend(options, result);
        } else {
          result.attributes.data = [];
        }
        ctx.initDefault(options, result);
        topResolve(result.attributes.data);
      });
    });
  }
}
var SuperView = Backbone.View.extend({
  /**
   * 传递options进来
   *
   * @method [private] - constructor
   * @private
   * @param options
   * @author wyj 14.12.16
   */
  constructor: function (options) {
    this.options = options || {};
    this._modelBinder = Backbone.ModelBinder;
    if (this.init && Est.typeOf(this.init) !== 'function')
      this._initialize(this.init);
    Backbone.View.apply(this, arguments);
  },
  /**
   * 导航
   *
   * @method [导航] - _navigate ( 导航 )
   * @param name
   * @author wyj 15.1.13
   */
  _navigate: function (name, options) {
    options = options || true;
    Backbone.history.navigate(name, options);
  },
  /**
   * 静态对话框， 当你需要显示某个组件的视图但不是以iframe形式打开时
   * 对话框参数将作为模块里的options参数
   *
   * @method [对话框] - _dialog ( 静态对话框 )
   * @param options
   * @author wyj 15.1.22
   * @example
   *        this._dialog({
                    moduleId: 'SeoDetail', // 模块ID
                    title: 'Seo修改', // 对话框标题
                    id: this.model.get('id'), // 初始化模块时传入的ID， 如productId
                    width: 600, // 对话框宽度
                    height: 250, // 对话框高度
                    skin: 'form-horizontal', // className
                    hideSaveBtn: false, // 是否隐藏保存按钮， 默认为false
                    button: [ // 自定义按钮
                      {
                        value: '保存',
                        callback: function () {
                        this.title('正在提交..');
                        $("#SeoDetail" + " #submit").click(); // 弹出的对话ID选择符为moduleId值
                        return false; // 去掉此行将直接关闭对话框
                      }}
                    ],
                    onShow: function(){}, // 对话框弹出后调用
                    onClose: function(){
                        this._reload(); // 列表刷新
                        this.collection.push(Est.cloneDeep(app.getModels())); // 向列表末尾添加数据, 注意必须要深复制
                        this.model.set(app.getModels().pop()); // 修改模型类
                    }
                }, this);
   */
  _dialog: function (options, context) {
    var ctx = context || this;
    options.width = options.width || 700;
    options.cover = Est.typeOf(options.cover) === 'boolean' ? options.cover : true;
    options.button = options.button || [];
    if (typeof options.hideSaveBtn === 'undefined' ||
      (Est.typeOf(options.hideSaveBtn) === 'boolean' && !options.hideSaveBtn)) {
      options.button.push(
        {value: '提交', callback: function () {
          this.title('正在提交...');
          $('#' + options.moduleId + ' #submit').click();
          return false;
        }, autofocus: true});
    }
    options = Est.extend(options, {
      el: '#base_item_dialog' + options.moduleId,
      content: options.content || '<div id="' + options.moduleId + '"></div>',
      viewId: options.moduleId,
      onshow: function () {
        options.onShow && options.onShow.call(this, options);
        if (options.moduleId){
          seajs.use([options.moduleId], function (instance) {
            app.addPanel(options.moduleId, {
              el: '#' + options.moduleId,
              template: '<div id="base_item_dialog' + options.moduleId + '"></div>'
            }).addView(options.moduleId, new instance(options));
          });
        }
      },
      onclose: function () {
        options.onClose &&
        options.onClose.call(ctx, options);
        app.getDialogs().pop();
      }
    });
    Utils.dialog(options);
  },
  /**
   * 模型类双向绑定
   *
   * @method [private] - _modelBind
   * @private
   * @author wyj 14.12.25
   * @example
   *        this._modelBind();
   */
  _modelBind: function () {
    var ctx = this;
    this.$("input, textarea, select").each(function () {
      $(this).change(function () {
        var val, pass;
        var modelId = $(this).attr('id');
        if (modelId && modelId.indexOf('model') !== -1) {
          switch (this.type) {
            case 'radio':
              val = $(this).is(":checked") ? $(this).val() : pass = true;
              break;
            case 'checkbox':
              val = $(this).is(':checked') ? (Est.isEmpty($(this).attr('true-value')) ? true : $(this).attr('true-value')) :
                (Est.isEmpty($(this).attr('false-value')) ? false : $(this).attr('false-value'));
              break;
            default :
              val = $(this).val();
              break;
          }
          if (!pass) {
            ctx.model.set(modelId.replace(/^model\d?-(.+)$/g, "$1"), val);
          }
        }
      });
    });
  },
  /**
   * 字段序列化成字符串
   *
   * @method [模型] - _stringifyJSON ( 字段序列化成字符串 )
   * @param array
   * @author wyj 15.1.29
   * @example
   *      this._stringify(['invite', 'message']);
   */
  _stringifyJSON: function (array) {
    var keys, result;
    Est.each(array, function (item) {
      keys = item.split('.');
      if (keys.length > 1) {
        result = Est.getValue(this.model.toJSON(), item);
        Est.setValue(this.model.toJSON(), item, JSON.stringify(result));
      } else {
        this.model.set(item, JSON.stringify(this.model.get(item)));
      }
    }, this);
  },
  /**
   * 反序列化字符串
   *
   * @method [模型] - _parseJSON ( 反序列化字符串 )
   * @param array
   */
  _parseJSON: function (array) {
    var keys, result;
    Est.each(array, function (item) {
      keys = item.split('.');
      if (keys.length > 1) {
        result = Est.getValue(this.model.toJSON(), item);
        if (Est.typeOf(result) === 'string') {
          Est.setValue(this.model.toJSON(), item, JSON.parse(result));
        }
      } else {
        if (Est.typeOf(this.model.get(item)) === 'string') {
          this.model.set(item, JSON.parse(this.model.get(item)));
        }
      }
    }, this);
  },
  /**
   * 设置参数
   *
   * @method [参数] - _setOption ( 设置参数 )
   * @param obj
   * @return {BaseList}
   * @author wyj 14.12.12
   * @example
   *      app.getView('categoryList')._setOption({
       *        sortField: 'orderList'
       *      })._moveUp(this.model);
   */
  _setOption: function (obj) {
    Est.extend(this._options, obj);
    return this;
  },
  /**
   * 回车事件
   *
   * @method [private] - _initEnterEvent
   * @private
   * @author wyj 14.12.10
   */
  _initEnterEvent: function (options) {
    if (options.speed > 1 && options.enterRender) {
      this.$('input').keyup($.proxy(function (e) {
        if (e.keyCode === CONST.ENTER_KEY) {
          this.$(options.enterRender).click();
        }
      }, this));
    }
  },
  /**
   * 获取配置参数
   *
   * @method [参数] - _getOption ( 获取配置参数 )
   * @param name
   * @return {*}
   * @author wyj 15.1.29
   */
  _getOption: function (name) {
    return this._options[name];
  },
  /**
   * 获取model值
   *
   * @method [模型] - _getValue ( 获取model值 )
   * @param path
   * @author wyj 15.1.30
   * @example
   *      this._getValue('tip.name');
   */
  _getValue: function (path) {
    return Est.getValue(this.model.attributes, path);
  },
  /**
   * 设置model值
   *
   * @method [模型] - _setValue ( 设置model值 )
   * @param path
   * @param val
   * @author wyj 15.1.30
   * @example
   *      this._setValue('tip.name', 'aaa');
   */
  _setValue: function (path, val) {
    Est.setValue(this.model.attributes, path, val);
  },
  /**
   * 绑定单个字段进行重渲染
   *
   * @method [模型] - _bind ( 绑定单个字段进行重渲染 )
   * @param array
   * @author wyj 15.2.2
   * @example
   *      this._bind('name', []);
   */
  _bind: function (modelId, array) {
    this.model.on('change:' + modelId, function () {
      Est.each(array, function (item) {
        var $parent = this.$(item).parent();
        var compile = HandlebarsHelper.compile($parent.html());
        $parent.html(compile(this));
      }, this);
    })
  }
});

var BaseView = SuperView.extend({
  /**
   * 初始化
   *
   * @method [初始化] - _initialize ( 初始化 )
   * @param options [template: 字符串模板][model: 实例模型]
   * @author wyj 14.11.20
   * @example
   *      this._initialize({
       *         viewId: 'productList'，
       *         template: 字符串模板，
       *         data: 对象数据
       *         // 可选
       *         enterRender: 执行回车后的按钮点击的元素选择符 如 #submit .btn-search
       *         append: false // 视图是否是追加
       *      });
   */
  _initialize: function (options) {
    this._initOptions(options);
    this._initTemplate(this._options);
    this._initModel(Backbone.Model.extend({}));
    this._initBind(this._options);
    return this;
  },
  /**
   * 初始化参数
   *
   * @method [private] - _initOptions
   * @private
   * @author wyj 15.1.12
   */
  _initOptions: function (options) {
    this._options = Est.extend(options || {}, this.options);
    this._options.data = this._options.data || {};
  },
  /**
   * 初始化模板， 若传递一个Template模板字符中进来， 则渲染页面
   *
   * @method [private] - _initTemplate
   * @private
   * @author wyj 15.1.12
   */
  _initTemplate: function (options) {
    if (options.template) {
      this.template = HandlebarsHelper.compile(options.template);
    }
  },
  /**
   * 初始化模型类, 设置index索引
   *
   * @method [private] - _initModel
   * @private
   * @param model
   * @author wyj 14.11.20
   */
  _initModel: function (model) {
    this.model = new model(this._options.data);
  },
  /**
   * 绑定事件， 如添加事件， 重置事件
   *
   * @method [private] - _initBind
   * @private
   * @author wyj 14.11.16
   */
  _initBind: function (options) {
    this.model.bind('reset', this.render, this);
    this.model.bind('change', this.render, this);
    this.model.bind('destroy', this.remove, this);
  },
  /**
   * 渲染
   *
   * @method [渲染] - _render ( 渲染 )
   * @author wyj 14.11.20
   * @example
   *        this._render();
   */
  _render: function () {
    this.trigger('before', this);
    if (this._options.append)
      this.$el.append(this.template(this.model.toJSON()));
    else
      this.$el.html(this.template(this.model.toJSON()));
    this._initEnterEvent(this._options);
    if (this._options.modelBind) this._modelBind();
    this.trigger('after', this);
    if (this._options.afterRender) {
      this._options.afterRender.call(this, this._options);
    }
    Utils.removeLoading();
  },
  /**
   * 移除事件
   *
   * @method [private] - _empty
   * @private
   * @return {BaseView}
   * @author wyj 14.11.16
   */
  _empty: function () {
    debug('BaseView.remove');
    //this.model && this.model.remove();
  }
});
var BaseModel = Backbone.Model.extend({
  defaults: { checked: false, children: [] },
  baseId: '',
  /**
   * 初始化请求连接, 判断是否为新对象， 否自动加上ID
   *
   * @method [private] - url
   * @private
   * @return {*}
   * @author wyj 14.11.16
   */
  url: function () {
    var base = this.baseUrl;
    var _url = '';
    if (!base) return '';
    if (Est.typeOf(base) === 'function')
      base = base.call(this);
    this.params = this.params ? this.params : '';
    var sep = Est.isEmpty(this.params) ? '' : '?';
    if (this.isNew() && Est.isEmpty(this.id)) return base + sep + this.params;
    _url = base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id + sep + this.params;
    debug(function () {
      return ('【Query】' + _url);
    });
    return _url;
  },
  /**
   * 模型类初始化
   *
   * @method [初始化] - _initialize ( 初始化 )
   * @author wyj 14.11.16
   * @example
   *      this._initialize();
   */
  _initialize: function (options) {
    this.validateMsg = null;
    debug('9.BaseModel._initialize');
  },
  /**
   * 过滤结果, 并提示信息对话框, 若不想提示信息可以设置hideTip为true
   *
   * @method [private] - parse
   * @private
   * @param response
   * @param options
   * @return {*}
   * @author wyj 14.11.16
   */
  parse: function (response, options) {
    var ctx = this;
    if (Est.isEmpty(response)) {
      var url = Est.typeOf(this.url) === 'function' ? this.url() : this.url;
      debug('服务器返回的数据为空， 点击' + url + '是否返回数据？无？ 检查XxxModel中的baseUrl、baseId参数是否配置正确？还无？联系王进');
      Utils.tooltip('数据异常, 稍后请重试！');
      return false;
    }
    if (response.msg && !this.hideTip) {
      var buttons = [];
      if (response.success) {
        if (ctx.isNew()) {
          buttons.push({ value: '继续添加', callback: function () {
            ctx.set('id', null);
            ctx.set(ctx.baseId, null);
          }});
        }
        buttons.push({ value: '确定', callback: function () {
          if (typeof window.topDialog != 'undefined') {
            window.topDialog.close(); // 关键性语句
            window.topDialog = null;
            $ && $(".btn-back").click();
          } else if (app.getDialogs().length > 0) {
            try {
              app.getDialogs().pop().close().remove();
            } catch (e) {
            }
          } else {
            $ && $(".btn-back").click();
          }
          this.close();
        }, autofocus: true });
      } else {
        buttons.push({ value: '确定', callback: function () {
          this.close();
        }, autofocus: true });
      }
      var d = dialog({
        title: '提示：',
        content: response.msg,
        width: 250,
        button: buttons
      }).show();
      setTimeout(function(){
        d.close().remove();
      }, 2);
    } else if(!this.hideTip){
      debug('服务器返回的msg为空! 因此无弹出框信息。 url：' + this.baseUrl);
    }
    if (Est.typeOf(response.success) === 'boolean' && !response.success) {
      ctx.attributes._response = response;
      return ctx.attributes;
    }
    if (response.attributes && response.attributes.data) {
      var keys = Est.keys(response.attributes);
      if (keys.length > 1) {
        Est.each(keys, function (item) {
          if (item !== 'data')
            response.attributes['data'][item] = response.attributes[item];
        });
      }
      response = response.attributes.data;
    }
    if (response) {
      response.id = response[ctx.baseId || 'id'];
      response.checked = false;
      response.time = new Date().getTime();
    }
    return response;
  },


  /**
   * 保存模型类
   *
   * @method [保存] - _saveField ( 保存模型类 )
   * @param keyValue
   * @param ctx
   * @param options [success: 成功回调][async: 是否异步]
   * @author wyj 14.11.16
   * @example
   *        this.model._saveField({
       *          id: thisNode.get('id'),
       *          sort: thisNode.get('sort')
       *        }, ctx, { // ctx须初始化initModel
       *          success: function(){}, // 保存成功回调
       *          async: false, // 是否同步
       *          hideTip: false // 是否隐藏提示
       *        });
   */
  _saveField: function (keyValue, ctx, options) {
    var wait = options.async || true;
    var newModel = new ctx.initModel({
      id: keyValue.id || ctx.model.get('id')
    });
    newModel.clear();
    newModel.set(keyValue);
    newModel.set('silent', true);
    if (options.hideTip) newModel.hideTip = true;
    newModel.set('editField', true);
    debug(function () {
      if (!newModel.baseUrl) return '当前模型类未找到baseUrl, 请检查XxxModel中的baseUrl';
    }, {type: 'error'});
    if (newModel.baseUrl) {
      newModel.save(null, {
        success: function (model, result) {
          if (typeof options.success != 'undefined') {
            options.success.call(ctx, keyValue, result);
          }
        }, wait: wait
      });
    }
  },
  /**
   * 获取子模型
   *
   * @method [private] - _getChildren
   * @private
   * @return {*}
   * @author wyj 14.12.18
   */
  _getChildren: function (collection) {
    return _.map(this.get('children'), function (ref) {
      // Lookup by ID in parent collection if string/num
      if (typeof(ref) == 'string' || typeof(ref) == 'number')
        return collection.get(ref);
      // Else assume its a real object
      return ref;
    });
  },
  /**
   * 隐藏保存后的提示对话框
   *
   * @method [对话框] - _hideTip ( 隐藏提示对话框 )
   * @author wyj 15.1.29
   * @example
   *      this.model._hideTip();
   */
  _hideTip: function () {
    this.hideTip = true;
  },
  /**
   * 设置checkbox选择框状态
   *
   * @method [选取] - _toggle ( 设置checkbox选择框状态 )
   * @author wyj 14.11.16
   * @example
   *      this.model._toggle();
   */
  _toggle: function () {
    this.set('checked', !this.get('checked'));
  },
  /**
   * 预处理验证， 若模型类里有silent=true字段，则取消验证
   *
   * @method [验证] - _validate ( 预处理验证 )
   * @param attributes
   * @param callback
   * @author wyj 14.11.21
   * @example
   *        validate: function (attrs) {
       *          return this._validation(attrs, function (attrs) {
       *            if (!attrs.sort || attrs.sort < 0) {
       *            this.validateMsg = "sort不能为空";
       *          }
       *         });
       *        }
   */
  _validation: function (attributes, callback) {
    if (!attributes.silent && callback) {
      callback.call(this, attributes);
    }
    return this.validateMsg;
  },
  /**
   * 获取model值
   *
   * @method [获取] - _getValue ( 获取model值 )
   * @param path
   * @author wyj 15.1.30
   * @example
   *      this._getValue('tip.name');
   */
  _getValue: function (path) {
    return Est.getValue(this.attributes, path);
  },
  /**
   * 设置model值
   *
   * @method [设置] - _setValue ( 设置model值 )
   * @param path
   * @param val
   * @author wyj 15.1.30
   * @example
   *      this._setValue('tip.name', 'aaa');
   */
  _setValue: function (path, val) {
    Est.setValue(this.attributes, path, val);
  }
});
var BaseDetail = SuperView.extend({
  /**
   * 初始化
   *
   * @method [初始化] - _initialize ( 初始化 )
   * @param options
   * @author wyj 14.11.20
   * @example
   *      this._initialize({
       *         template : template, // 字符串模板
       *         model: ProductModel, // 模型类
       *         // 可选
       *         enterRender: '#submit' // 执行回车后的按钮点击的元素选择符
       *         id: ctx.model.get('id'), // 当不是以dialog形式打开的时候， 需要传递ID值
                 page: ctx._getPage() // 点击返回按钮且需要定位到第几页时， 传入page值，
                 data: {} // 附加数据  获取方法为  _data.name
       *      });
   */
  _initialize: function (options) {
    this._initOptions(options);
    this._initTemplate(this._options);
    this._initList(this._options);
    this._initModel(options.model, this);
    this._initEnterEvent(this._options);
  },
  /**
   * 初始化参数
   *
   * @method [private] - _initOptions
   * @private
   * @author wyj 15.1.12
   */
  _initOptions: function (options) {
    this._options = Est.extend(options || {}, this.options);
    this._options.speed = this._options.speed || 9;
  },
  /**
   * 初始化模板， 若传递一个Template模板字符中进来， 则渲染页面
   *
   * @method [private] - _initTemplate
   * @private
   * @author wyj 15.1.12
   */
  _initTemplate: function (options) {
    this._data = options.data = options.data || {};
    if (options.template) {
      this.template = HandlebarsHelper.compile(options.template);
      //this.$el.append(this.template(options.data));
    }
    return this._data;
  },
  /**
   * 初始化列表视图容器
   *
   * @method [private] - _initList
   * @private
   * @author wyj 15.1.12
   */
  _initList: function (options) {
    var ctx = this;
    this.list = options.render ? this.$(options.render) : this.$el;
    if (this.list.size() === 0)
      this.list = $(options.render);
    debug(function () {
      if (!ctx.list || ctx.list.size() === 0) {
        return ('当前' + ctx.options.viewId + '视图无法找到选择符， 检查XxxDetail中的_initialize方法中是否定义render或 ' +
          '实例化对象(new XxxDetail({...}))中是否存入el; ' +
          '或template模板是否引入， 或是否是iframe对话框中未重新实例化Application对象， 或检查template模板是否存在' +
          (ctx._options.render ? ctx._options.render : ctx.el));
      }
    }, {type: 'error'});
    return this.list;
  },
  /**
   * 渲染
   *
   * @method [渲染] - _render ( 渲染 )
   * @author wyj 14.11.20
   * @example
   *        this._render();
   */
  _render: function () {
    this.list.append(this.template(this.model.toJSON()));
    if (this._options.modelBind) this._modelBind();
    if (window.topDialog) {
      this.$('.form-actions').hide();
    }
    if (this._options.afterRender) {
      this._options.afterRender.call(this, this._options);
    }
    Utils.removeLoading();
    setTimeout(function () {
      Utils.resetIframe();
    }, 1000);
  },
  /**
   * 初始化模型类 将自动判断是否有ID传递进来，
   * 若存在则从服务器端获取详细内容
   * 若为添加， 则在ctx 与模型类里设置 _isAdd = true
   *
   * @method [private] - _initModel
   * @private
   * @param model
   * @param ctx
   * @author wyj 14.11.15
   */
  _initModel: function (model, ctx) {
    ctx.passId = this.options.id || Est.getUrlParam('id', window.location.href);
    debug(function () {
      if (!model) {
        return 'XxxDetail未找到模型类， 请检查继承BaseDetail时是否设置model参数，如XxxDetail = BaseDetail.extend({' +
          'model: XxxModel, initialize: function(){..}})';
      }
    }, {type: 'error'});
    if (!Est.isEmpty(this.passId)) {
      ctx.model = new model();
      ctx.model.set('id', ctx.passId);
      ctx.model.set('_data', ctx._options.data);
      ctx.model.fetch().done(function () {
        ctx.model.set('_isAdd', ctx._isAdd = false);
        ctx.render();
      });
    } else {
      ctx.passId = new Date().getTime();
      ctx.model = new model();
      ctx.model.set('_data', ctx._options.data);
      ctx.model.set('_isAdd', ctx._isAdd = true);
      ctx.render();
    }
  },
  /**
   * form包装器， 传递表单选择符
   *
   * @method [表单] - _form ( form包装器 )
   * @param {String} formSelector 选择器
   * @return {BaseDetail}
   * @author wyj on 14.11.15
   * @example
   *        this._form('#J_Form')._validate()._init({
       *          onBeforeSave: function(){
       *            // 处理特殊字段
       *            this.model.set('taglist', Est.map(ctx.tagInstance.collection.models, function (item) {
       *              return item.get('name');
       *            }).join(','));
       *          },
       *          onAfterSave : function(response){
       *             if(response.attributes.success == false ){
       *                ctx.refreshCode();
       *                return true;
       *             }
       *            Utils.tip('请验证邮箱后再登录!');
       *            window.location.href = '/member/modules/login/login.html';
       *          }
       *        });
   */
  _form: function (formSelector) {
    this.formSelector = formSelector;
    this.formElemnet = this.$(this.formSelector);
    return this;
  },
  /**
   * 启用表单验证
   *
   * @method [表单] - _validate ( 表单验证 )
   * @return {BaseDetail}
   * @param options [url: 远程验证地址][fields{Array}: 字段名称]
   * @author wyj 14.11.15
   * @example
   *        this._form('#J_Form')._validate({
       *            url: CONST.API + '/user/validate',
       *            fields: ['vali-username', 'vali-email'] // 注意， 字段前加vali-
       *        });
   */
  _validate: function (options) {
    var ctx = this;
    options = options || {};
    BUI.use('bui/form', function (Form) {
      ctx.formValidate = new Form.Form({
        srcNode: ctx.formSelector
      }).render();
      if (options.url && options.fields) {
        Est.each(options.fields, function (field) {
          app.addData(field, ctx.formValidate.getField(field));
          debug(function () {
            if (!ctx.formValidate.getField(field)) {
              return '字段不匹配，检查input元素name值是否以vali-开头？';
            }
          }, {type: 'error'});
          app.getData(field).set('remote', {
            url: options.url,
            dataType: 'json',
            callback: function (data) {
              if (data.success) {
                return '';
              } else {
                return data.msg;
              }
            }
          });
        });
      }
    });
    return this;
  },
  /**
   * 绑定提交按钮
   *
   * @method [表单] - _init ( 绑定提交按钮 )
   * @param options [onBeforeSave: 保存前方法] [onAfterSave: 保存后方法]
   * @author wyj 14.11.15
   * @example
   *        this._form()._validate()._init({
       *            onBeforeSave: function(){},
       *            onAfterSave: function(){}
       *        });
   *
   *
   *        <input id="model-music.custom" name="music.custom" value="{{music.custom}}" type="text" class="input-large">
   *
   */
  _init: function (options) {
    var ctx = this;
    var passed = true;
    var modelObj = {};
    options = options || {};
    $('#submit', this.el).on('click', function () {
      var $button = $(this);
      var preText = ctx.preText = $(this).html();
      passed = true; // 设置验证通过
      ctx.formElemnet.submit();
      $("input, textarea, select", $(ctx.formSelector)).each(function () {
        var name, val, pass, modelKey, modelList;
        name = $(this).attr('name');
        if ($(this).hasClass('bui-form-field-error')) {
          passed = false;
        }
        var modelId = $(this).attr('id');
        if (modelId && modelId.indexOf('model') !== -1) {
          switch (this.type) {
            case 'radio':
              val = $(this).is(":checked") ? $(this).val() : pass = true;
              break;
            case 'checkbox':
              val = $(this).is(':checked') ? (Est.isEmpty($(this).attr('true-value')) ? true : $(this).attr('true-value')) :
                (Est.isEmpty($(this).attr('false-value')) ? false : $(this).attr('false-value'));
              break;
            default :
              val = $(this).val();
              break;
          }
          if (!pass) {
            modelKey = modelId.replace(/^model\d?-(.+)$/g, "$1");
            modelList = modelKey.split('.');
            if (modelList.length > 1) {
              Est.setValue(modelObj, modelKey, val);
              ctx.model.set(modelList[0], modelObj[modelList[0]]);
            } else {
              ctx.model.set(modelList[0], val);
            }
          }
        }
      });
      if (passed) {
        if (typeof options.onBeforeSave !== 'undefined')
          options.onBeforeSave.call(ctx);
        $button.html('提交中...');
        ctx._save(function (response) {
          if (options.onAfterSave) {
            options.onAfterSave = Est.inject(options.onAfterSave, function (response) {
              return new Est.setArguments(arguments);
            }, function (response) {
              $button.html(preText);
            });
            options.onAfterSave.call(ctx, response);
          }
          $button.html(preText);
        });
      }
    });
  },
  /**
   * 保存结果
   *
   * @method [private] - _save
   * @private
   * @author wyj 14.11.18
   */
  _save: function (callback) {
    this._saveItem(callback);
  },
  /**
   * 保存表单
   *
   * @method [private] - _saveItem
   * @private
   * @param callback
   * @param context
   * @author wyj 14.11.15
   */
  _saveItem: function (callback, context) {
    debug('- BaseDetail._saveItem');
    if (Est.typeOf(this.model.url) === 'string') debug('XxxModel模型类中的baseUrl未设置', {type: 'error'});
    if (Est.isEmpty(this.model.url())) {
      debug('XxxModel模型类未设置url参数！', {type: 'error'});
      return;
    }
    this.model.save(null, {
      wait: true,
      success: function (response) {
        debug('- BaseDetail._saveSuccess');
        app.addModel(Est.cloneDeep(response.attributes));
        if (top) {
          top.model = response.attributes;
        }
        if (callback && typeof callback === 'function')
          callback.call(context, response);
      }
    });
  },
  /**
   * 重置表单
   *
   * @method [表单] - _reset ( 重置表单 )
   * @author wyj 14.11.18
   */
  _reset: function () {
    this.model.set(this.model.defaults);
  },
  /**
   * 清空视图， 并移除所有绑定的事件
   *
   * @method [渲染] - _empty ( 清空视图 )
   * @author wyj 14.11.16
   * @example
   *      this._empty();
   */
  _empty: function () {
    this.model.off();
    this.$el.empty().off();
  },
  /**
   * 移除所有绑定的事件
   *
   * @method [事件] - _close ( 移除所有绑定事件 )
   * @author wyj 14.11.16
   */
  _close: function () {
    debug('- BaseDetail.close');
    this.undelegateEvents();
    this.stopListening();
    this.off();
  }
});
var PaginationModel = Backbone.Model.extend({
  defaults: { page: 1, pageSize: 16, count: 0 },
  initialize: function () {
    debug('3.PaginationModel.initialize');
  }
});
var BaseCollection = Backbone.Collection.extend({
  //localStorage: new Backbone.LocalStorage('base-collection'),
  /**
   * 传递options进来
   *
   * @method [private] - constructor
   * @private
   * @param options
   * @author wyj 14.12.16
   */
  constructor: function (options) {
    this.options = options || {};
    Backbone.Collection.apply(this, [null, arguments]);
  },
  /**
   * 初始化
   *
   * @method [初始化] - _initialize ( 初始化 )
   * @author wyj 14.11.16
   * @example
   initialize: function () {
                this._initialize();
              }
   */
  _initialize: function () {
    debug('2.BaseCollection._initialize');
    this._baseUrl = this.url;
    if (!this.paginationModel) {
      this.paginationModel = new PaginationModel({
        page: this.options.page,
        pageSize: this.options.pageSize
      });
    }
  },
  /**
   * 处理url 与 分页
   *
   * @method [private] - _parse (  )
   * @private
   * @param resp
   * @param xhr
   * @return {attributes.data|*}
   * @author wyj 14.11.16
   */
  parse: function (resp, xhr) {
    var ctx = this;
    if (Est.isEmpty(resp)) {
      debug(function () {
        var url = Est.typeOf(ctx.url) === 'function' ? ctx.url() : ctx.url;
        return ('服务器返回的数据为空， 点击' + url + '是否返回数据？无？ 检查XxxCollection中的url参数是否配置正确？');
      }, {type: 'error'});
      return [];
    }
    this._parsePagination(resp);
    this._parseUrl(this.paginationModel);
    //TODO this.options.pagination 防止被其它无分页的列表覆盖
    if (this.options.pagination && this.paginationModel) {
      this._paginationRender();
    }
    return resp.attributes.data;
  },
  /**
   * 处理url地址， 加上分页参数
   *
   * @method [private] - _parseUrl (  )
   * @private
   * @param model
   * @author wyj 14.11.16
   */
  _parseUrl: function (model) {
    debug('- BaseCollection._parseUrl');
    var page = 1, pageSize = 16;
    if (model && model.get('pageSize')) {
      pageSize = model.get('pageSize');
      page = model.get('page');
    }
    if (this.options.subRender) {
      page = 1;
      pageSize = 9000;
    }
    if (typeof this.url !== 'function') {
      var end = '';
      if (!Est.isEmpty(this._itemId)) end = '/' + this._itemId;
      this.url = this._baseUrl + end + '?page=' + page + '&pageSize=' + pageSize;
    }
  },
  /**
   * 设置分页模型类
   *
   * @method [private] - _parsePagination
   * @private
   * @param resp
   * @author wyj 14.11.16
   */
  _parsePagination: function (resp) {
    debug('6.BaseCollection._parsePagination');
    resp.attributes = resp.attributes ||
    { page: 1, per_page: 10, count: 10 };
    if (this.paginationModel) {
      this.paginationModel.set('page', resp.attributes.page);
      this.paginationModel.set('pageSize', resp.attributes.per_page);
      this.paginationModel.set('count', resp.attributes.count);
    }
  },
  /**
   * 渲染分页
   *
   * @method [private] - _paginationRender
   * @private
   * @author wyj 14.11.16
   */
  _paginationRender: function () {
    var ctx = this;
    seajs.use(['Pagination'], function (Pagination) {
      if (!ctx.pagination) {
        ctx.pagination = new Pagination({
          el: "#pagination-container",
          model: ctx.paginationModel
        });
      } else {
        ctx.pagination.render();
      }
    });
  },
  /**
   * 加载列表
   *
   * @method [集合] - _load ( 加载列表 )
   * @param instance 实例对象
   * @param context 上下文
   * @param model 模型类
   * @return {ln.promise} 返回promise
   * @author wyj 14.11.15
   * @example
   *      if (this.collection.url){
       *             this.collection._load(this.collection, this, model)
       *                 .then(function(result){
       *                     resolve(result);
       *                 });
       *         }
   */
  _load: function (instance, context, model) {
    debug('4.BaseCollection._load');
    //if (!Est.isEmpty(this.itemId)) this.url = this.url + '/' + this.itemId;
    this._parseUrl(model);
    return instance.fetch({success: function () {
      //resolve(instance);
      debug('5.collection reset');
      context.collection._reset();
      context._empty();
    }});
    /* var $q = Est.promise;
     return new $q(function (resolve) {

     });*/
  },
  /**
   * 设置itemId
   *
   * @method [分类] - _setItemId ( 设置itemId )
   * @param itemId
   * @author wyj 14.12.16
   * @example
   *        this._setItemId('Category00000000000000000032');
   */
  _setItemId: function (itemId) {
    this._itemId = itemId;
    debug('- 根据ID查列表' + this._itemId);
  },
  /**
   * 清空列表
   *
   * @method [集合] - _empty ( 清空列表 )
   * @author wyj 14.11.15
   */
  _empty: function () {
    debug('BaseCollection._empty');
    if (this.collection) {
      var len = this.collection.length;
      while (len > -1) {
        this.collection.remove(this.collection[len]);
        len--;
      }
    }
  }
});
var BaseItem = SuperView.extend({
  /**
   * 初始化, 若该视图的子元素有hover选择符， 则自动为其添加鼠标经过显示隐藏事件
   *
   * @method [初始化] - _initialize ( 初始化 )
   * @param {Object} options [template: 模板字符串]
   * @author wyj 14.11.16
   * @example
   *        this._initialize({
       *            template: itemTemp, // 模板字符串
       *            // 可选
       *            modelBind: false, // 绑定模型类， 比如文本框内容改变， 模型类相应改变; 当元素为checkbox是， 需设置true-value="01" false-value="00",
       *            若不设置默认为true/false
       *            detail: '', // 修改或添加页面地址
       *            filter: function(model){ // 过滤模型类
       *            },
       *            beforeRender: function(model){},
       *            afterRender: function(model){},
       *            enterRender: '#submit' // 执行回车后的按钮点击的元素选择符
       *        });
   */
  _initialize: function (options) {
    this._initOptions(options);
    this._initCollapse(this.model.get('_options'));
    this._initTemplate(this._options);
    this._initBind(this._options);
    this._initView(this._options);
    this._initStyle(this._options);
    this._initEnterEvent(this._options);
  },
  /**
   * 初始化参数
   *
   * @method [private] - _initOptions
   * @private
   * @author wyj 15.1.12
   */
  _initOptions: function (options) {
    this._options = Est.extend(options || {}, this.options);
  },
  /**
   * 初始化展开收缩
   *
   * @method [private] - _initCollapse
   * @param options
   * @private
   * @author wyj 15.2.14
   */
  _initCollapse: function (options) {
    if (options._speed > 1) {
      this.model.stopCollapse = false;
      this.collapsed = options ? options._extend : false;
    }
  },
  /**
   * 初始化模板， 若传递一个Template模板字符中进来， 则渲染页面
   *
   * @method [private] - _initTemplate
   * @private
   * @author wyj 15.1.12
   */
  _initTemplate: function (options) {
    if (options.template) {
      if (options.viewId) {
        if (!app.getCompileTemp(options.viewId))
          app.addCompileTemp(options.viewId, HandlebarsHelper.compile(options.template));
      } else {
        this.template = HandlebarsHelper.compile(options.template);
      }
    }
  },
  /**
   * 绑定事件， 如添加事件， 重置事件
   *
   * @method [private] - _initBind
   * @private
   * @author wyj 14.11.16
   */
  _initBind: function (options) {
    if (options.speed > 1) {
      this.model.bind('reset', this.render, this);
      this.model.bind('change', this.render, this);
      this.model.bind('destroy', this.remove, this);
    }
  },
  /**
   * 初始化视图
   *
   * @method [private] - _initView
   * @param options
   * @private
   * @author wyj 15.2.14
   */
  _initView: function (options) {
    if (options.speed > 1) {
      if (this.model.view) this.model.view.remove();
      this.model.view = this;
    }
  },
  /**
   * 初始化样式
   *
   * @method [private] - _initStyle
   * @private
   * @author wyj 15.2.14
   */
  _initStyle: function (options) {
    var ctx = this;
    if (options.speed > 1) {
      var item_id = this.model.get('id') || (this.model.get('dx') + 1) + '';
      if (this.model.get('dx') % 2 === 0) this.$el.addClass('bui-grid-row-even');
      this.$el.addClass('_item_el_' + (this.options.viewId || '') + '_' + item_id.replace(/^[^1-9]+/, ""));
      this.$el.hover(function () {
        ctx.$el.addClass('hover');
      }, function () {
        ctx.$el.removeClass('hover');
      });
    }
  },
  /**
   * 渲染
   *
   * @method [渲染] - _render ( 渲染 )
   * @return {BaseCollection}
   * @author wyj 14.11.18
   */
  _render: function () {
    debug('10.BaseItem._render');
    this._onBeforeRender();
    if (this._options && this._options.filter)
      this._options.filter.call(this, this.model);
    //TODO 添加判断是否存在this.$el debug
    //debug('BaseItem里的this.$el为空， 检查document中是否存在， 或设置传入的options.el为jquery对象(有时是DOM片段)', {type: 'error'});
    this.$el.html(this.template ? this.template(this.model.toJSON()) :
      this._options.viewId && app.getCompileTemp(this._options.viewId) && app.getCompileTemp(this._options.viewId)(this.model.toJSON()));
    if (this._options.modelBind) this._modelBind();
    //TODO 判断是否存在子元素
    var modelOptions = this.model.get('_options');
    if (modelOptions._subRender && this.model.get('children') &&

      this.model.get('children').length > 0) {
      // Build child views, insert and render each
      var ctx = this;
      var childView = null;
      var level = this.model.get('level') || 1;

      var tree = this.$(modelOptions._subRender + ':first');
      this._setupEvents(modelOptions);

      _.each(this.model._getChildren(modelOptions._collection), function (newmodel) {
        if (modelOptions._items) {
          newmodel = new modelOptions._model(newmodel);
        }
        debug(function () {
          if (Est.isEmpty(newmodel)) {
            return '相关的模型类中是否正确定义baseId？ 如拼写错误、未定义等';
          }
        }, {type: 'error'});
        newmodel.set('_options', modelOptions);
        newmodel.set('level', level + 1);

        childView = new modelOptions._item({
          model: newmodel,
          data: ctx._options._data
        });
        childView._setInitModel(ctx.initModel);
        childView._setViewId(ctx._options.viewId);
        tree.append(childView.$el);
        if (ctx._options.views) {
          ctx._options.views.push(childView);
        }
        childView._render();
      });
      /* Apply some extra styling to views with children */
      if (childView) {
        // Add bootstrap plus/minus icon
        //this.$('> .node-collapse').prepend($('<i class="icon-plus"/>'));
        // Fixup css on last item to improve look of tree
        //childView.$el.addClass('last-item').before($('<li/>').addClass('dummy-item'));
      }
    }
    this._onAfterRender();
    return this;
  },
  /**
   * 设置viewId
   *
   * @method [参数] - _setViewId ( 设置viewId )
   * @param name
   * @author wyj 14.12.20
   */
  _setViewId: function (name) {
    this._options.viewId = name;
  },
  /**
   * 设置模型类
   *
   * @method [private] - _setInitModel
   * @private
   * @param model
   * @author wyj 14.11.20
   */
  _setInitModel: function (model) {
    this.initModel = model;
  },
  /**
   * 绑定展开收缩事件
   *
   * @method [private] - _setupEvents
   * @private
   * @author wyj 14.12.9
   */
  _setupEvents: function (opts) {
    // Hack to get around event delegation not supporting ">" selector
    var that = this;
    that._toggleCollapse.call(this, opts);
    this.$(opts._collapse + ':first').click(function () {
      that._toggleCollapse.call(that, opts);
    });
  },
  /**
   * 展开收缩
   *
   * @method [private] - _toggleCollapse
   * @private
   * @author wyj 14.12.9
   */
  _toggleCollapse: function (opts) {
    var ctx = this;
    if (this.model.stopCollapse) return;
    ctx.collapsed = !ctx.collapsed;

    if (ctx.collapsed) {
      this.$(opts._collapse + ':first').removeClass('x-caret-down');
      this.$(opts._subRender + ':first').slideUp(CONST.COLLAPSE_SPEED).addClass('hide');
    }
    else {
      this.$(opts._collapse + ':first').addClass('x-caret-down');
      this.$(opts._subRender + ':first').slideDown(CONST.COLLAPSE_SPEED).removeClass('hide');
    }
  },
  /**
   * 渲染前事件
   *
   * @method [private] - _onBeforeRender
   * @private
   * @author wyj 14.12.3
   */
  _onBeforeRender: function () {
    this._options.beforeRender && this._options.beforeRender.call(this, this.model);
  },
  /**
   * 渲染后事件
   *
   * @method [private] - _onAfterRender
   * @private
   * @author wyj 14.12.3
   */
  _onAfterRender: function () {
    this._options.afterRender && this._options.afterRender.call(this, this.model);
  },
  /**
   * 移除监听
   *
   * @method [private] - _close
   * @private
   * @author wyj 14.11.16
   */
  _close: function () {
    debug('BaseItem._close');
    this.stopListening();
  },
  /**
   * 移除此模型
   *
   * @method [private] - _clear
   * @private
   * @author wyj 14.11.16
   */
  _clear: function () {
    debug('ProductItem._clear');
    this.model.destroy();
  },
  /**
   * checkbox选择框转换
   *
   * @method [选取] - _toggleChecked ( checkbox选择框转换 )
   * @author wyj 14.11.16
   * @example
   *      itemClick: function(e){
       *        e.stopImmediatePropagation();
       *        this.loadPhoto();
       *        this._toggleChecked(e);
       *      }
   */
  _toggleChecked: function (e) {
    var checked = this.model.get('checked');
    this._checkAppend = typeof this.model.get('_options')._checkAppend === 'undefined' ? true :
      this.model.get('_options')._checkAppend;
    if (!this._checkAppend){
      if (this.options.viewId){
        app.getView(this.options.viewId) && app.getView(this.options.viewId)._clearChecked();
      } else{
        debug('您当前选择的是不追加选择， 请检查XxxList的options中添加viewId?', {type: 'error'});
      }
    }
    this.model.attributes['checked']=!checked;
    if (this.model.get('checked')) {
      this._itemActive({
        add: this._checkAppend
      });
    } else {
      this.$el.removeClass('item-active');
    }
    //TODO shift + 多选
    if (e && e.shiftKey) {
      var beginDx = app.getData('curChecked');
      var endDx = this.model.collection.indexOf(this.model);
      Est.each(this.model.collection.models, function (model) {
        if (model.get('dx') > beginDx && model.get('dx') < endDx) {
          model.set('checked', true);
          model.view.$el.addClass('item-active');
        }
      });
    } else {
      app.addData('curChecked', this.model.collection.indexOf(this.model));
    }
    e && e.stopImmediatePropagation();
  },
  /**
   * 添加当前ITEM的CLASS为item-active
   *
   * @method [选取] - _itemActive ( 设置为选中状态 )
   * @param options [add: true 是否为添加模式]
   * @private
   * @author wyj 14.12.13
   * @example
   *        this._itemActive();
   */
  _itemActive: function (options) {
    options = options || {};

    var list = app.getData('itemActiveList');
    if (!options.add) {
      Est.each(list, function (selecter) {
        var node = $('.' + selecter);
        //TODO 当为单选时
        //node.find('.toggle:first').click();
        node.removeClass('item-active');
        //node.find('.toggle').click();
      });
      list.length = 0;
    }
    this.$el.addClass('item-active');

    list.push(this.$el.attr('class').replace(/^.*(_item_el_.+?)\s+.*$/g, "$1"));
  },
  /**
   * 上移
   *
   * @method [移动] - _moveUp ( 上移 )
   * @param e
   * @author wyj 14.12.14
   */
  _moveUp: function (e) {
    e.stopImmediatePropagation();
    this._itemActive();
    this.collapsed = true;
    if (!this._options.viewId) {
      debug('当前视图viewId不存在，无法完成上移操作，检查new XxxList({})options中的viewId是否定义？', { type: 'error' });
      return false;
    }
    app.getView(this._options.viewId)._moveUp(this.model);
  },
  /**
   * 下移
   *
   * @method [移动] - _moveDown ( 下移 )
   * @param e
   * @author wyj 14.12.14
   */
  _moveDown: function (e) {
    e.stopImmediatePropagation();
    this._itemActive();
    this.collapsed = true;
    if (!this._options.viewId) {
      debug('当前视图viewId不存在，无法完成下移操作，检查new XxxList({})options中的viewId是否定义？', {
        type: 'error'
      });
      return false;
    }
    app.getView(this._options.viewId)._moveDown(this.model);
  },
  /**
   * 保存sort排序
   *
   * @method [保存] - _saveSort ( 保存sort排序 )
   * @author wyj 14.12.14
   */
  _saveSort: function () {
    var ctx = this;
    var sort = this.$('.input-sort').val();
    this.model._saveField({ id: this.model.get('id'), sort: sort
    }, ctx, { success: function () {
      ctx.model.set('sort', sort);
    }, hideTip: true
    });
  },
  /**
   * 获取当前列表第几页
   *
   * @method [分页] - _getPage ( 获取当前列表第几页 )
   * @return {*}
   * @author wyj 14.12.31
   *
   */
  _getPage: function () {
    var paginationModel = this.model.collection.paginationModel;
    if (!paginationModel) return 1;
    return paginationModel.get('page');
  },
  /**
   * 显示更多按钮
   *
   * @method [渲染] _more ( 显示更多按钮 )
   * @param e
   * @author wyj 15.1.16
   */
  _more: function (e) {
    e.stopImmediatePropagation();
    this.$more = e.target ? $(e.target) : $(e.currentTarget);
    if (!this.$more.hasClass('btn-more')) this.$more = this.$more.parents('.btn-more:first');
    this.$moreOption = this.$more.parent().find('.moreOption');
    this.$icon = this.$more.find('i');
    if (this.$icon.hasClass('icon-chevron-left')) {
      this.$icon.removeClass('icon-chevron-left');
      this.$icon.addClass('icon-chevron-down');
      this.$moreOption.hide();
    } else {
      this.$icon.removeClass('icon-chevron-down');
      this.$icon.addClass('icon-chevron-left');
      this.$moreOption.show().css({
        top: this.$more.position().top,
        right: 37,
        position: 'absolute',
        background: '#fff',
        width: '100%',
        textAlign: 'right',
        "padding-bottom": 2
      });
    }
    $(window).one('click', function () {
      $('.moreOption').hide();
      $('.btn-more').find('i').removeClass('icon-chevron-left');
      $('.btn-more').find('i').addClass('icon-chevron-down');
    });
  },
  /**
   * 单个字段保存
   *
   * @method [修改] - _editField ( 单个字段保存 )
   * @param options [title: 标题][field: 字段名][target: 选择符(对话框指向于哪个元素)]
   * @return {ln.promise}
   * @author wyj 14.11.16
   * @example
   *        this._editField({
       *          title: '修改相册名称',
       *          field: 'name',
       *          target: '.album-name'
       *        });
   */
  _editField: function (options) {
    var ctx = this;
    var $q = Est.promise;
    app.getData('editFieldDialog') && app.getData('editFieldDialog').close();
    return new $q(function (resolve, reject) {
      //context.model.fetch();
      seajs.use(['dialog'], function (dialog) {
        var oldName = ctx.model.attributes[options.field];
        var d = dialog({
          title: options.title || '修改',
          content: '<input id="property-returnValue-demo" type="text" class="text" value="' + oldName + '" />',
          button: [
            {
              value: '确定',
              autofocus: true,
              callback: function () {
                var value = $('#property-returnValue-demo').val();
                this.close(value);
                this.remove();
              }}
          ]
        });
        d.addEventListener('close', function () {
          var obj = {};
          var val = ctx.model.previous(options.field);
          if (this.returnValue.length >= 1 && this.returnValue !== val) {
            obj.id = ctx.model.get('id');
            obj[options.field] = this.returnValue;
            ctx.model._saveField(obj, ctx, {
              success: function (keyValue, result) {
                ctx.model.set(keyValue);
              }
            });
            resolve(ctx, this.returnValue);
          }
        });
        d.show(ctx.$(options.target || 'div').get(0));
        app.addData('editFieldDialog', d);
      })
    });
  },
  /**
   *  删除模型类
   *
   *  @method [删除] - _del ( 删除模型类 )
   *  @author wyj 14.11.16
   */
  _del: function (e) {
    e && e.stopImmediatePropagation();
    debug('1.BaseItem._del');
    var context = this;
    app.getData('delItemDialog') && app.getData('delItemDialog').close();
    seajs.use(['Utils'], function (Utils) {
      if (context.model.get('children').length > 0) {
        Utils.comfirm({
          title: '提示',
          width: 300,
          content: '该分类下还有子分类， 请先删除！ 提示：当存在与之相关联的产品、新闻等等，也无法删除'
        });
        return;
      }
      app.addData('delItemDialog', Utils.confirm({
        title: '温馨提示',
        content: '是否删除?',
        target: context.$el.find('.delete').get(0),
        success: function (resp) {
          context.model.destroy({
            wait: true,
            error: function (model, resp) {
              var buttons = [];
              buttons.push({ value: '确定', callback: function () {
                this.close();
              }, autofocus: true });
              seajs.use(['dialog'], function (dialog) {
                dialog({
                  title: '提示：',
                  content: resp.msg,
                  width: 250,
                  button: buttons
                }).show();
              });
            }
          });
        }
      }));
    });
  },
  /**
   * 修改模型类
   *
   * @method [修改] - _edit ( 修改模型类 )
   * @param options [title: 标题][width: 宽度][height: 高度]
   *                [url: 地址][reload: 关闭后是否重新从服务器获取数据][close: 关闭回调方法]
   *                [hideSaveBtn: 隐藏保存按钮][hideResetBtn: 隐藏重置按钮][oniframeload: 页面载入后回调]
   * @author wyj 14.11.16
   */
  _edit: function (options) {
    debug('1.BaseItem._edit');
    this._itemActive();
    options = Est.extend({}, options);
    // 如果是搜索结果列表时， 使用dialog形式
    options.route = this._options.route || options.route;
    if (options.route){
      this._navigate(options.route + '/' + Est.encodeId(this.model.get('id')), true);
    } else{
      debug('【Error】XXXList中是否设置route', {type: 'error'});
    }
    /*if (!this.model.get('_isSearch') && options.route) {
     this._navigate(options.route + '/' + Est.encodeId(ctx.model.get('id')), true);
     } else {
     this._dialog({
     moduleId: 'SeoDetail', // 模块ID
     title: '修改', // 对话框标题
     id: this.model.get('id'), // 初始化模块时传入的ID
     width: 1000, // 对话框宽度
     height: 'auto', // 对话框高度
     skin: 'form-horizontal', // className
     hideSaveBtn: true, // 是否隐藏保存按钮， 默认为false
     onShow: function(){}, // 对话框弹出后调用
     onClose: function(){
     }
     }, this);
     seajs.use(['dialog-plus'], function (dialog) {
     window.dialog = dialog;
     var buttons = [];
     if (!options.hideSaveBtn) buttons.push({
     value: '保存',
     callback: function () {
     this.title(CONST.SUBMIT_TIP);
     this.iframeNode.contentWindow.$("#submit").click();
     return false;
     },
     autofocus: true
     });
     *//*if (!options.hideResetBtn) buttons.push({
     value: '重置',
     callback: function () {
     this.iframeNode.contentWindow.$("#reset").click();
     return false;
     }
     });*//*
     buttons.push({ value: '关闭' });
     window.detailDialog = dialog({
     id: 'edit-dialog',
     title: options.title || '修改',
     width: options.width || 1000,
     height: options.height || 'auto',
     url: options.url || ctx._options.detail +
     '?id=' + ctx.model.id,
     button: buttons,
     oniframeload: function () {
     var load = options.load || function () {
     };
     this.iframeNode.contentWindow.topDialog = window.detailDialog;
     //this.iframeNode.contentWindow.app = app;
     delete app.getRoutes()['index'];
     load.call(this, this.iframeNode.contentWindow);
     },
     onclose: function () {
     ctx.model.set(Est.cloneDeep(window.model));
     if (options.reload) ctx.model.fetch({
     wait: true,
     success: function () {
     ctx.model.reset && ctx.model.reset();
     }
     });
     if (options.close) options.close.call(this);
     this.remove();
     window.detailDialog = null;
     window.model = {};
     }
     });
     window.detailDialog.showModal();
     });
     }*/
  }
});
var BaseList = SuperView.extend({
  /**
   * 传递options进来
   *
   * @method [private] - constructor
   * @private
   * @param options
   * @author wyj 14.12.16
   */
  /*constructor: function (options) {
   Est.interface.implements(this, new Est.interface('BaseList', ['initialize', 'render']));
   this.constructor.__super__.constructor.apply(this, arguments);
   },*/
  /**
   * 初始化
   *
   * @method [初始化] - _initialize ( 初始化 )
   * @param options
   * @author wyj 14.11.20
   * @example
   *      this._initialize({
       *        model: ProductModel, // 模型类,
       *        collection:  ProductCollection,// 集合,
       *        item: ProductItem, // 单视图
       *        // 以下为可选
       *        template: listTemp, 字符串模板,
       *        render: '.product-list', 插入列表的容器选择符, 若为空则默认插入到$el中
       *        items: [], // 数据不是以url的形式获取时 (可选), items可为function形式传递;
       *        data: {}, // 附加的数据 BaseList、BaseView[js: this._options.data & template: {{name}}] ;
       *                     BaseItem中为[this._options.data &{{_options._data.name}}] BaseCollecton为this._options.data BaseModel为this.get('_data')
       *        append: false, // 是否是追加内容， 默认为替换
       *        checkAppend: false, // 鼠标点击checkbox， checkbox是否追加  需在BaseItem事件中添加 'click .toggle': '_toggleChecked',
       *        enterRender: (可选) 执行回车后的按钮点击的元素选择符 如 #submit .btn-search
       *        pagination: true, // 是否显示分页 view视图中相应加入<div id="pagination-container"></div>
       *        page: parseInt(Est.cookie('orderList_page')) || 1, //设置起始页 所有的分页数据都会保存到cookie中， 以viewId + '_page'格式存储， 注意cookie取的是字符串， 要转化成int
       *        pageSize: parseInt(Est.cookie('orderList_pageSize')) || 16, // 设置每页显示个数
       *        max: 5, // 限制显示个数
       *        sortField: 'sort', // 上移下移字段名称， 默认为sort
       *        itemId: 'Category_00000000000123', // 当需要根据某个ID查找列表时， 启用此参数， 方便
       *        detail: 添加页面url地址 配合route使用 主要用于搜索后打开弹出对话框 如 CONST.HOST + '/modules/product/product_detail.html'
       *        route: '#/product', // 详细页面路由  如果不是以dialog形式弹出时 ， 此项不能少   需配置路由如： app.addRoute('product/:id', function (id) {
                            productDetail(Est.decodeId(id, 'Product_', 32));
                            });
       *        filter: [ {key: 'name', value: this.searchKey }] // 过滤结果
       *        clearDialog: true, // 清除所有的对话框， 默认为true
       *        reference: this, // 对当前实例的引用
       *        beforeLoad: function(collection){ // collection载入列表前执行
       *            this.setCategoryId(options.categoryId); // collection载入后执行
       *          },
       *        afterLoad: function(){ // collection载入之后
       *            if (this.collection.models.length === 0 ||
                      !this.options._isAdd){
                      this.addOne();
                    }
       *        },
       *        beforeRender: function(thisOpts){}, // 渲染前回调
       *        afterRender: function(thisOpts){ // 渲染后回调， 包括items渲染完成
       *          if (this.collection.models.length === 0 ||
                      !this.options._isAdd){
                      this.addOne();
                    }
       *        },
       *        // 以下为树型列表时 需要的参数
       *        subRender: '.node-tree', // 下级分类的容器选择符
       *        collapse: '.node-collapse' 展开/收缩元素选择符
       *        parentId: 'belongId', // 分类 的父类ID
       *        categoryId: 'categoryId', // 分类 的当前ID
       *        rootId: 'isroot', // 一级分类字段名称
       *        rootValue: '00' // 一级分类字段值
       *        extend: true // false收缩 true为展开
       *       });
   */
  _initialize: function (options) {
    debug('1.BaseList._initialize');
    this.dx = 0;
    this.views = [];
    /*if (typeof options.clearDialog === 'undefined' || options.clearDialog) {
     app.emptyDialog();
     }*/
    /*setTimeout(function () {
     }, 50);*/
    return this._init(options.collection, options);
  },
  /**
   * 初始化集合类
   *
   * @method [private] - _init
   * @private
   * @param collection 对应的collection集合类， 如ProductCollection
   * @param options [beforeLoad: 加载数据前执行] [item: 集合单个视图] [model: 模型类]
   * @author wyj 14.11.16
   */
  _init: function (collection, options) {

    this._initOptions(options);
    this._initTemplate(this._options);
    this._initEnterEvent(this._options, this);
    this._initList(this._options);
    this._initCollection(this._options, collection);
    this._initItemView(this._options.item, this);
    this._initModel(this._options.model);
    this._initBind(this.collection);
    this._initPagination(this._options);
    this._load(this._options);
    this._finally();

    return this;
  },
  /**
   * 初始化参数
   *
   * @method [private] - _initOptions
   * @private
   * @author wyj 15.1.12
   */
  _initOptions: function (options) {
    this._options = Est.extend(options || {}, this.options);
    this._options.sortField = 'sort';
    this._options.max = this._options.max || 99999;
    this._options.speed = this._options.speed || 9;
  },
  /**
   * 初始化模板， 若传递一个Template模板字符中进来， 则渲染页面
   *
   * @method [private] - _initTemplate
   * @private
   * @author wyj 15.1.12
   */
  _initTemplate: function (options) {
    this._data = options.data = options.data || {};
    if (options.template) {
      this.template = HandlebarsHelper.compile(options.template);
      if (this._options.append)
        this.$el.append(this.template(options.data));
      else
        this.$el.html(this.template(options.data));
    }
    return this._data;
  },
  /**
   * 回车事件
   *
   * @method [private] - _initEnterEvent
   * @private
   * @author wyj 14.12.10
   */
  _initEnterEvent: function (options, ctx) {
    if (options.enterRender) {
      ctx.$('input').keyup(function (e) {
        if (e.keyCode === CONST.ENTER_KEY) {
          ctx.$(options.enterRender).click();
        }
      });
    }
  },
  /**
   * 初始化列表视图容器
   *
   * @method [private] - _initList
   * @private
   * @author wyj 15.1.12
   */
  _initList: function (options) {
    var ctx = this;
    this.list = options.render ? this.$(options.render) : this.$el;
    if (this.list.size() === 0)
      this.list = $(options.render);

    debug(function () {
      if (!ctx.list || ctx.list.size() === 0) {
        return ('当前' + ctx.options.viewId + '视图无法找到选择符， 检查XxxList中的_initialize方法中是否定义render或 ' +
          '实例化对象(new XxxList({...}))中是否存入el; ' +
          '或template模板是否引入， 或是否是iframe对话框中未重新实例化Application对象，或检查template模板是否存在' +
          (ctx._options.render ? ctx._options.render : ctx.el));
      }
    }, {type: 'error'});
    this.allCheckbox = this.$('#toggle-all')[0];

    return this.list;
  },
  /**
   * 初始化collection集合
   *
   * @method [private] - _initCollection
   * @param collection
   * @private
   */
  _initCollection: function (options, collection) {
    debug(function () {
      if (!options.model) {
        return 'XxxList中的_initialize({})参数中未添加模型类，XxxList头部是否require请求引入？ ' +
          '或检查config.js/main.js中是否配置app.addModule("XxxModel")';
      }
    }, {type: 'error'});
    if (!this.collection) this.collection = new collection(options);
    if (options.itemId) this.collection._setItemId(options.itemId);
    //TODO 分类过滤
    if (options.subRender && !(options.items)) this.composite = true;

    return this.collection;
  },
  /**
   * 初始化单个枚举视图
   *
   * @method [private] - _initItemView
   * @private
   * @param itemView
   * @author wyj 14.11.16
   */
  _initItemView: function (itemView) {
    this.item = itemView;
  },
  /**
   * 初始化模型类, 设置index索引
   *
   * @method [private] - _initModel
   * @private
   * @param model
   * @author wyj 14.11.20
   */
  _initModel: function (model) {
    this.initModel = model;
  },
  /**
   * 绑定事件， 如添加事件， 重置事件
   * @method [private] - _initBind
   * @private
   * @author wyj 14.11.16
   */
  _initBind: function (collection) {
    if (collection) {
      collection.bind('add', this._addOne, this);
      collection.bind('reset', this._render, this);
    }
  },
  /**
   * 初始化分页
   *
   * @method [private] - _initPagination
   * @param options
   * @private
   * @author wyj 14.11.17
   */
  _initPagination: function (options) {
    var ctx = this;
    if (ctx.collection && ctx.collection.paginationModel) {
      // 单一观察者模式， 监听reloadList事件
      ctx.collection.paginationModel.on('reloadList',
        function (model) {
          ctx._clear.call(ctx);
          ctx._load.call(ctx, options, model);
        });
    }
  },
  /**
   * 获取集合数据
   *
   * @method [渲染] - _load ( 获取集合数据 )
   * @param options [beforeLoad: 载入前方法][page: 当前页][pageSize: 每页显示条数]
   * @param model 分页模型类 或为全查必填
   * @author wyj 14.11.16
   * @example
   *        baseListCtx._load({
       *          page: 1,
       *          pageSize: 16,
       *          beforeLoad: function () {
       *            this.collection.setCategoryId(options.categoryId);
       *          },
       *          afterLoad: function(){
       *
       *          }
       *        }).then(function () {
       *          ctx.after();
       *        });
   */
  _load: function (options, model) {
    var ctx = this;
    options = options || this._options || {};
    this._beforeLoad(options);
    if (options.page || options.pageSize) {
      options.page && ctx.collection.paginationModel.set('page', options.page || 1);
      // 备份page
      options._page = options.page;
      options.pageSize && ctx.collection.paginationModel.set('pageSize', options.pageSize || 16);
      // 备份pageSize
      options._pageSize = options.pageSize;
      model = ctx.collection.paginationModel;
      //TODO 移除BaseList默认的page 与pageSize使每页显示条数生效
      options.page = options.pageSize = null;
    }
    //TODO 若存在items且有page与pageSize  处理静态分页
    if (this._options.items) {
      this._empty();
      this._initItems();
    }
    // page pageSize保存到cookie中
    if (this._options.viewId && ctx.collection.paginationModel &&
      ctx.collection.paginationModel.get('pageSize') < 999) {
      app.addCookie(this._options.viewId + '_page');
      Est.cookie(this._options.viewId + '_page', ctx.collection.paginationModel.get('page'));
      app.addCookie(this._options.viewId + '_pageSize');
      Est.cookie(this._options.viewId + '_pageSize', ctx.collection.paginationModel.get('pageSize'));
    }
    // 判断是否存在url
    if (ctx.collection.url && !this._options.items) {

      if (ctx._options.filter) ctx.filter = true;
      // 处理树结构
      if (ctx._options.subRender) {
        ctx.composite = true;
        ctx.collection.paginationModel.set('page', 1);
        ctx.collection.paginationModel.set('pageSize', 9000);
      }
      debug(function () {
        return ('【Query】' + (Est.typeOf(ctx.collection.url) === 'function' ? ctx.collection.url() :
          ctx.collection.url));
      });
      // 数据载入
      ctx.collection._load(ctx.collection, ctx, model).
        done(function (result) {
          /*if (ctx.options.instance)
           app.addData(ctx.options.instance, result.models);*/
          if (result.attributes.data.length === 0) {
            ctx.list.append('<div class="no-result">暂无数据</div>');
            debug(function () {
              return ('从服务器上传回来的列表为空！检查XxxCollection中是否配置url参数， 点击' +
                Est.typeOf(ctx.collection.url) === 'function' ? ctx.collection.url() :
                ctx.collection.url + '查看数据');
            });
          }
          if (ctx._options.subRender)  ctx._filterRoot();
          if (ctx._options.filter) ctx._filterCollection();

          ctx._afterLoad(options);
        });
    } else {
      ctx._afterLoad(options);
    }
  },
  /**
   * 初始化完成后执行
   *
   * @method [private] - _finally
   * @private
   */
  _finally: function () {
    if (this._options.afterRender)
      this._options.afterRender.call(this, this._options);
    Utils.removeLoading();
  },
  /**
   * 列表载入前执行
   *
   * @method [private] - _beforeLoad
   * @param options
   * @private
   */
  _beforeLoad: function (options) {
    if (options.beforeLoad)
      options.beforeLoad.call(this, this.collection);
  },
  /**
   * 列表载入后执行
   *
   * @method [private] - _afterLoad
   * @private
   */
  _afterLoad: function (options) {
    if (options.afterLoad)
      options.afterLoad.call(this, this.collection);
  },
  /**
   * 初始化items
   *
   * @method [private] - _initItems
   * @private
   * @author wyj 15.1.8
   */
  _initItems: function () {
    if (Est.typeOf(this._options.items) === 'function')
      this._options.items = this._options.items.apply(this, arguments);
    if (this._options.filter) {
      this.collection.push(this._options.items);
      this._filterCollection();
      this._options.items = Est.pluck(Est.cloneDeep(this.collection.models, function () {
      }, this), 'attributes');
    }
    if (this._options._page || this._options._pageSize) {
      this._renderListByPagination();
    } else if (!this.filter) {
      Est.each(this._options.items, function (item) {
        if (this._check()) return false;
        this.collection.push(new this.initModel(item));
      }, this);
    }
  },
  /**
   * 缓存编译模板
   *
   * @method [private] - _setTemplate
   * @private
   * @author wyj 15.2.14
   */
  _setTemplate: function (compile) {
    this.compileTemp = compile;
  },
  /**
   * 获取编译模板
   *
   * @method [private] - _getTemplate
   * @private
   * @author wyj 15.2.14
   */
  _getTemplate: function () {
    return this.compileTemp;
  },
  /**
   * 停止遍历
   *
   * @method [渲染] - _stop ( 停止遍历 )
   * @author wyj 15.1.27
   * @example
   *        this._stop();
   */
  _stop: function () {
    this.stopIterator = true;
  },
  /**
   * 检查是否停止遍历
   *
   * @method [private] - _check
   * @private
   * @return {boolean}
   * @author wyj 15.1.27
   */
  _check: function () {
    if (this.stopIterator) {
      this.stopIterator = false;
      return true;
    }
    return false;
  },
  /**
   * 渲染视图
   *
   * @method [渲染] - _render ( 渲染视图 )
   * @author wyj 14.11.16
   * @example
   *
   */
  _render: function () {
    debug('BaseList._render');
    this._addAll();
    this.trigger('after', this);
  },
  /**
   * 过滤父级元素
   *
   * @method [private] - _filterRoot
   * @private
   * @author wyj 14.12.9
   */
  _filterRoot: function () {
    var ctx = this;
    var temp = [];
    var roots = [];
    ctx.composite = false;
    /* ctx.collection.comparator = function (model) {
     return model.get('sort');
     }
     ctx.collection.sort();*/
    Est.each(ctx.collection.models, function (item) {
      debug(function () {
        if (Est.typeOf(item['attributes'][ctx._options.categoryId]) === 'undefined') {
          return '分类ID错误， 检查XxxList中的_initialize({})配置中的categoryId跟api是否一致？当前ID为' +
            ctx._options.categoryId + '点击' + ctx.collection.url + '查看API';
        }
        if (Est.typeOf(item['attributes'][ctx._options.parentId]) === 'undefined') {
          return '父分类ID错误， 检查XxxList中的_initialize({})配置中的parentId跟api是否一致？当前父ID为' +
            ctx._options.parentId + '点击' + ctx.collection.url + '查看API';
        }
      }, {type: 'error'});
      temp.push({
        categoryId: item['attributes'][ctx._options.categoryId],
        belongId: item['attributes'][ctx._options.parentId]
      });
    });
    this.collection.each(function (thisModel) {
      var i = temp.length, _children = [];
      while (i > 0) {
        var item = temp[i - 1];
        if (item.belongId === thisModel.get(ctx._options.categoryId)) {
          _children.unshift(item.categoryId);
          temp.splice(i - 1, 1);
        }
        i--;
      }
      thisModel.set('children', _children);
      // 添加父级元素
      if (thisModel.get(ctx._options.rootId) === ctx._options.rootValue) {
        thisModel.set('level', 1);
        roots.push(thisModel);
      }
    });
    Est.each(roots, function (model) {
      ctx._addOne(model);
    });
    //debug(ctx.collection);
  },
  /**
   * 向视图添加元素
   *
   * @method [private] - _addOne
   * @private
   * @param model
   * @author wyj 14.11.16
   */
  _addOne: function (model) {
    var ctx = this;
    if (!this.filter && !this.composite && this.dx < this._options.max) {
      model.set('dx', this.dx++);
      switch (this._options.speed) {
        case 1:
          model.set('_options', {});
          break;
        case 9:
          model.set('_options', {
            _speed: this._options.speed,
            _item: ctx._options.item,
            _items: ctx._options.items ? true : false,
            _model: ctx._options.model,
            _collection: Est.isEmpty(ctx._options.subRender) ? null : ctx.collection,
            _subRender: ctx._options.subRender,
            _collapse: ctx._options.collapse,
            _extend: ctx._options.extend,
            _checkAppend: ctx._options.checkAppend,
            _data: ctx.options.data || ctx._options.data
          });
      }
      //app.addData('maxSort', model.get('dx') + 1);
      var itemView = new this.item({
        model: model,
        viewId: this._options.viewId,
        speed: this._options.speed,
        data: this._data,
        detail: this._options.detail,
        route: this._options.route,
        views: this.views,
        reference: this._options.reference
      });
      itemView._setInitModel(this.initModel);
      //TODO 优先级 new对象里的viewId > _options > getCurrentView()
      itemView._setViewId(this._options.viewId || app.getCurrentView());

      this.list.append(itemView._render().el);
      this.views.push(itemView);
    }
  },
  /**
   * 刷新列表
   *
   * @method [集合] - _reload ( 刷新列表 )
   * @author wyj 15.1.24
   * @example
   *        this._reload();
   */
  _reload: function () {
    this._clear.apply(this, arguments);
    this._load();
  },
  /**
   * 过滤集合
   *
   * @method [private] - _filterCollection
   * @private
   * @author wyj 15.1.10
   */
  _filterCollection: function () {
    this._filter(this._options.filter, this._options);
  },
  /**
   * 静态分页
   *
   * @method [private] - _renderListByPagination
   * @private
   * @author wyj 15.1.8
   */
  _renderListByPagination: function () {
    this.page = this.collection.paginationModel.get('page');
    this.pageSize = this.collection.paginationModel.get('pageSize');
    this.startIndex = (this.page - 1) * this.pageSize;
    this.endIndex = this.startIndex + this.pageSize;

    for (var i = this.startIndex; i < this.endIndex; i++) {
      this.collection.push(this._options.items[i]);
    }
    // 渲染分页
    this.collection.paginationModel.set('count', this.collection.models.length);
    this.collection._paginationRender();
    return this.collection;
  },

  /**
   * 清空列表， 并移除所有绑定的事件
   *
   * @method [集合] - _empty ( 清空列表 )
   * @author wyj 14.11.16
   * @example
   *      this._empty();
   */
  _empty: function () {
    this.dx = 0;
    debug('- BaseList._empty');
    if (this.collection) {
      var len = this.collection.length;
      while (len > -1) {
        this.collection.remove(this.collection[len]);
        len--;
      }
    }
    // 设置当前页的起始索引， 如每页显示20条，第2页为20
    if (this.collection.paginationModel) {
      this.dx = (this.collection.paginationModel.get('pageSize') || 16) *
        ((this.collection.paginationModel.get('page') - 1) || 0);
    }
    //遍历views数组，并对每个view调用Backbone的remove
    Est.each(this.views, function (view) {
      view.remove().off();
    })
    //清空views数组，此时旧的view就变成没有任何被引用的不可达对象了
    //垃圾回收器会回收它们
    this.views = [];
    //this.list.empty();
    return this.collection;
  },
  /**
   * 清空DOM列表
   *
   * @method [集合] - _clear ( 清空DOM列表 )
   * @author wyj 15.1.24
   * @example
   *        this._clear();
   */
  _clear: function () {
    this._empty.call(this);
    this.list.empty();
    this.collection.models.length = 0;
  },
  /**
   * 添加所有元素， 相当于刷新视图
   *
   * @method [private] - _addAll
   * @private
   * @author wyj 14.11.16
   */
  _addAll: function () {
    debug('BaseList._addAll and call this._empty');
    this._empty();
    this.collection.each(this._addOne, this);
  },
  /**
   * 搜索
   *
   * @method [搜索] - _search ( 搜索 )
   * @param options [onBeforeAdd: 自定义过滤]
   * @author wyj 14.12.8
   * @example
   *      this._search({
       *        filter: [
       *         {key: 'name', value: this.searchKey },
       *         {key: 'prodtype', value: this.searchProdtype} ,
       *         {key: 'category', value: this.searchCategory},
       *         {key: 'loginView', value: this.searchLoginView},
       *         {key: 'ads', value: this.searchAds}
       *         ],
       *        onBeforeAdd: function(item){
       *          // 自定义过滤， 即通过上面的filter后还需要经过这一层过滤
       *          // 若通过返回true
       *          return item.attributes[obj.key].indexOf(obj.value) !== -1;
       *       }});
   */
  _search: function (options) {
    var ctx = this;
    this._clear();
    this.filter = true;
    options = Est.extend({ onBeforeAdd: function () {
    }}, options);
    this._load({ page: 1, pageSize: 5000,
      afterLoad: function () {
        ctx.filter = false;
        if (!ctx._options.items) {
          ctx._filter(options.filter || ctx._options.filter, options);
        } else {
          ctx._filterItems(options.filter || ctx._options.filter, options);
        }
      }
    });
  },
  /**
   * 过滤collection
   *
   * @method [private] - _filter
   * @param array
   * @param options
   * @private
   * @author wyj 14.12.8
   */
  _filter: function (array, options) {
    var ctx = this;
    var result = [];
    var len = ctx.collection.models.length;
    ctx.filter = false;
    while (len > 0) {
      if (this._check()) len = -1;

      var item = ctx.collection.models[len - 1];
      var pass = true;

      Est.each(array, function (obj) {
        var match = false;
        var keyval = Est.getValue(item.attributes, obj.key);

        if (Est.typeOf(obj.match) === 'regexp') {
          match = !obj.match.test(keyval);
        } else {
          match = Est.isEmpty(keyval) || (keyval.indexOf(obj.value) === -1);
        }
        if (pass && !Est.isEmpty(obj.value) && match) {
          ctx.collection.remove(item);
          pass = false;
          return false;
        }
      });
      if (pass && options.onBeforeAdd) {
        var _before_add_result = options.onBeforeAdd.call(this, item);
        if (Est.typeOf(_before_add_result) === 'boolean' && !_before_add_result){
          pass = false;
        }
      }
      if (pass) {
        result.unshift(item);
      }
      len--;
    }
    Est.each(result, function (item) {
      item.set('_isSearch', true);
      ctx._addOne(item);
    });
  },
  /**
   * 过滤items
   *
   * @method [private] - _filterItems
   * @param array
   * @param options
   * @private
   * @author wyj 14.12.8
   */
  _filterItems: function (array, options) {
    var ctx = this;
    var result = [];
    var items = Est.cloneDeep(ctx._options.items);
    var len = items.length;
    ctx.filter = false;
    while (len > 0) {
      if (this._check()) break;
      var item = items[len - 1];
      var pass = true;
      Est.each(array, function (obj) {
        var match = false;
        var keyval = Est.getValue(item, obj.key);
        if (Est.typeOf(obj.match) === 'regexp') {
          match = !obj.match.test(keyval);
        } else {
          match = Est.isEmpty(keyval) || (keyval.indexOf(obj.value) === -1);
        }
        if (pass && !Est.isEmpty(obj.value) && match) {
          items.splice(len, 1);
          pass = false;
          return false;
        }
      });
      if (pass && options.onBeforeAdd) {
        pass = options.onBeforeAdd.call(this, item);
      }
      if (pass) {
        result.unshift(item);
      }
      len--;
    }
    Est.each(result, function (item) {
      item = new ctx.initModel(item);
      item.set('_isSearch', true);
      ctx.collection.push(item);
      //ctx._addOne(item);
    });
  },
  /**
   * 弹出查看详细信息对话框
   *
   * @method [详细] - _detail ( 查看详细 )
   * @param options [title: 标题][width: 宽度][height: 高度][padding: 内补丁]
   *                [url: 地址][hideSaveBtn: 隐藏保存按钮][hideResetBtn: 隐藏重置按钮]
   *                [oniframeload: 页面载入后回调， 参数为window对象]
   * @author wyj 14.11.16
   * @example
   *      this._detail({
       *        title: '产品添加',
       *        url: CONST.HOST + '/modules/product/product_detail.html?time=' + new Date().getTime(),
       *        hideSaveBtn: true,
       *        hideResetBtn: true,
       *        end: '', // url 后附加内容 如： '$attId=' + attId
       *        load: function(win){
       *        }
       *      });
   */
  _detail: function (options) {
    debug('1.BaseList._detail');
    options = options || {};
    if (options.end) {
      options.end = '?' + options.end + '&';
    } else {
      options.end = '';
    }
    var ctx = this;
    seajs.use(['dialog-plus'], function (dialog) {
      window.dialog = dialog;
      var buttons = [];
      if (!options.hideSaveBtn) {
        buttons.push({
          value: '保存',
          callback: function () {
            this.title(CONST.SUBMIT_TIP);
            this.iframeNode.contentWindow.$("#submit").click();
            return false;
          },
          autofocus: true
        });
      }
      /* if (!options.hideResetBtn) {
       buttons.push({
       value: '重置',
       callback: function () {
       this.iframeNode.contentWindow.$("#reset").click();
       return false;
       }
       });
       }*/
      buttons.push({ value: '关闭' });
      debug(function () {
        if (Est.isEmpty(ctx._options.detail) && Est.isEmpty(options.url)) {
          return '您请求的详细页网址是：' + (options.url || ctx._options.detail + options.end) +
            '页面不显示？ 点击链接是否访问正常？检查XxxList中的_initialize配置是否设置detail参数？若正常， 忽略本信息';
        }
      }, {type: 'error'});
      window.detailDialog = dialog({
        id: 'detail-dialog',
        title: options.title || '添加',
        height: options.height || 'auto',
        width: options.width || 850,
        padding: options.padding || 0,
        url: options.url || ctx._options.detail + options.end,
        button: buttons,
        oniframeload: function () {
          this.iframeNode.contentWindow.topDialog = window.detailDialog;
          this.iframeNode.contentWindow.app = app;
          delete app.getRoutes()['index'];
          options.load && options.load.call(this, this.iframeNode.contentWindow);
          //this.iframeNode.contentWindow.maxSort = app.getData('maxSort');
        },
        onclose: function () {
          if (ctx._options.subRender) {
            ctx.composite = true;
          }
          ctx.collection._load(ctx.collection, ctx).
            then(function () {
              if (ctx._options.subRender) {
                ctx.composite = true;
                ctx._filterRoot();
              }
              /* else {
               ctx._render();
               }*/
            });
          this.remove();
          window.detailDialog = null;
          if (this.returnValue) {
            $('#value').html(this.returnValue);
          }
        }
      });
      window.detailDialog.showModal();
    });
    return false;
  },
  /**
   * 全选checkbox选择框, 只能全选中， 不能全不选中
   *
   * @method [选取] - _toggleAllChecked ( 全选checkbox选择框 )
   * @author wyj 14.11.16
   */
  _toggleAllChecked: function () {
    var checked = this.allCheckbox.checked;
    this.collection.each(function (product) {
      product.set('checked', checked);
    });
  },
  /**
   * 保存sort值
   *
   * @method [保存] - _saveSort ( 保存sort值 )
   * @param model
   * @author wyj 14.12.4
   */
  _saveSort: function (model) {
    var sortOpt = { id: model.get('id') }
    sortOpt[this._options.sortField || 'sort'] = model.get(this._options.sortField);
    model._saveField(sortOpt, this, { async: false, hideTip: true});
  },
  /**
   * 交换位置
   *
   * @method [private] - _exchangeOrder
   * @param original_index
   * @param new_index
   * @param options
   * @return {BaseList}
   * @private
   * @author wyj 14.12.5
   */
  _exchangeOrder: function (original_index, new_index, options) {
    var tempObj = {}, nextObj = {};
    var temp = this.collection.at(original_index);
    var next = this.collection.at(new_index);
    // 互换dx
    var thisDx = temp.view.model.get('dx');
    var nextDx = next.view.model.get('dx');
    tempObj['dx'] = nextDx;
    nextObj['dx'] = thisDx;
    // 互换sort值
    if (options.path) {
      var thisValue = temp.view.model.get(options.path);
      var nextValue = next.view.model.get(options.path);
      tempObj[options.path] = nextValue;
      nextObj[options.path] = thisValue;
    }
    temp.view.model.set(tempObj);
    next.view.model.set(nextObj);
    // 交换model
    this.collection.models[new_index] = this.collection.models.splice(original_index, 1, this.collection.models[new_index])[0];
    // 交换位置
    if (original_index < new_index) {
      temp.view.$el.before(next.view.$el).removeClass('hover');
    } else {
      temp.view.$el.after(next.view.$el).removeClass('hover');
    }
    if (options.success) {
      options.success.call(this, temp, next);
    }
    return this
  },
  /**
   * 上移, 默认以sort为字段进行上移操作， 如果字段不为sort， 则需重载并设置options
   *
   * @method [移动] - _moveUp ( 上移 )
   * @param model
   * @author wyj 14.12.4
   * @example
   *      app.getView('attributesList')._setOption({
       *        sortField: 'orderList'
       *      })._moveUp(this.model);
   */
  _moveUp: function (model) {
    debug('_moveUp');
    var ctx = this;
    var first = this.collection.indexOf(model);
    var last, parentId;
    var result = [];
    if (this._options.subRender) {
      parentId = model.get(this._options.parentId);
      this.collection.each(function (thisModel) {
        if (parentId === thisModel.get(ctx._options.parentId)) {
          result.push(thisModel);
        }
      });
      //TODO 找出下一个元素的索引值
      var thisDx = Est.findIndex(result, function (item) {
        return item.get('id') === model.get('id');
      });
      if (thisDx === 0) return;
      last = this.collection.indexOf(result[thisDx - 1]);
    } else {
      if (first === 0) return;
      last = first - 1;
    }
    model.stopCollapse = true;
    this._exchangeOrder(first, last, {
      path: this.sortField || 'sort',
      success: function (thisNode, nextNode) {
        if (thisNode.get('id') && nextNode.get('id')) {
          this._saveSort(thisNode);
          this._saveSort(nextNode);
          model.stopCollapse = false;
        } else {
          debug('模型类中不存在id, 检查XxxModel中的baseId是否正确？');
        }
      }
    });
  },
  /**
   * 下移
   *
   * @method [移动] - _moveDown ( 下移 )
   * @param model
   * @author wyj 14.12.4
   */
  _moveDown: function (model) {
    debug('_moveDown');
    var ctx = this;
    var first = this.collection.indexOf(model);
    var last, parentId;
    var result = [];
    if (this._options.subRender) {
      parentId = model.get(ctx._options.parentId);
      this.collection.each(function (thisModel) {
        if (parentId === thisModel.get(ctx._options.parentId)) {
          result.push(thisModel);
        }
      });
      //TODO 找出上一个元素的索引值
      var thisDx = Est.findIndex(result, function (item) {
        return item.get('id') === model.get('id');
      });
      if (thisDx === result.length - 1) return;
      last = this.collection.indexOf(result[thisDx + 1]);
    } else {
      if (first === this.collection.models.length - 1) return;
      last = first + 1;
    }
    model.stopCollapse = true;
    this._exchangeOrder(first, last, {
      path: this._options.sortField,
      success: function (thisNode, nextNode) {
        if (thisNode.get('id') && nextNode.get('id')) {
          this._saveSort(thisNode);
          this._saveSort(nextNode);
          model.stopCollapse = false;
        } else {
          debug('模型类中不存在id, 检查XxxModel中的baseId是否正确？');
        }
      }
    });
  },
  /**
   *  获取checkbox选中项所有ID值列表
   *
   * @method [选取] - _getCheckboxIds ( 获取checkbox选中项所有ID值列表 )
   * @return {*}
   * @author wyj 14.12.8
   * @example
   *      this._getCheckboxIds(); => ['id1', 'id2', 'id3', ...]
   */
  _getCheckboxIds: function (field) {
    return Est.pluck(this._getCheckedItems(), Est.isEmpty(field) ? 'id' : ('attributes.' + field));
  },
  /**
   *  获取checkbox选中项
   *
   * @method [选取] - _getCheckedItems ( 获取checkbox选中项 )
   * @return {*}
   * @author wyj 14.12.8
   * @example
   *      this._getCheckedItems(); => [{}, {}, {}, ...]
   */
  _getCheckedItems: function () {
    return Est.filter(this.collection.models, function (item) {
      return item.attributes.checked;
    });
  },
  /**
   * 转换成[{key: '', value: ''}, ... ] 数组格式 并返回
   *
   * @method [集合] - _getItems ( 获取所有列表项 )
   * @author wyj 15.1.15
   * @example
   *      app.getView('productList').getItems();
   */
  _getItems: function () {
    return Est.pluck(this.collection.models, 'attributes');
  },
  /**
   * 获取集合中某个元素
   *
   * @method [集合] - getItem ( 获取集合中某个元素 )
   * @param index
   * @return {*}
   * @author wyj 15.5.22
   */
  _getItem: function (index) {
    var list = this._getItems();
    index = index || 0;
    if (list.length > index) return list[index];
    return null;
  },
  /**
   * 向集合末尾添加元素
   *
   * @method [集合] - _add ( 向集合末尾添加元素 )
   * @author wyj 15.1.15
   * @example
   *      app.getView('productList')._add(new model());
   */
  _add: function (model) {
    this.collection.push(model);
  },
  /**
   * 批量删除， 隐藏等基础接口
   *
   * @method [批量] - _batch ( 批量删除 )
   * @param options [url: 批量请求地址] [tip: 操作成功后的消息提示]
   * @author wyj 14.12.14
   * @example
   *        this._batch({
                url: ctx.collection.batchDel,
                tip: '删除成功'
              });
   *
   */
  _batch: function (options) {
    var ctx = this;
    options = Est.extend({
      tip: '操作成功！'
    }, options);
    this.checkboxIds = this._getCheckboxIds();
    if (this.checkboxIds.length === 0) {
      Utils.tip('请至少选择一项！');
      return;
    }
    $.ajax({
      type: 'POST', async: false, url: options.url,
      data: { ids: ctx.checkboxIds.join(',') },
      success: function (result) {
        Utils.tip(options.tip);
        ctx._load();
      }
    });
  },
  /**
   * 批量删除
   *
   * @method [批量] - _batchDel ( 批量删除 )
   * @param options
   * @author wyj 14.12.14
   * @example
   *      this._batchDel({
       *        url: CONST.API + '/message/batch/del'
       *      });
   */
  _batchDel: function (options) {
    var ctx = this;
    this.checkboxIds = this._getCheckboxIds();
    if (this.checkboxIds && this.checkboxIds.length === 0) {
      Utils.tip('至少选择一项');
      return;
    }
    Utils.confirm({
      success: function () {
        ctx._batch({
          url: ctx.collection.batchDel,
          tip: '删除成功'
        });
      }
    });
  },
  /**
   * 使所有的checkbox初始化为未选择状态
   *
   * @method [选取] - _clearChecked ( 所有选取设置为未选择状态 )
   * @author wyj 14.12.14
   * @example
   *      this._clearChecked();
   */
  _clearChecked: function () {
    Est.each(this.collection.models, function (model) {
      model.attributes['checked'] = false;
    });
  }
});