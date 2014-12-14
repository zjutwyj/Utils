/**
 * @description 基础工具类
 * @namespace BaseUtils
 * @author yongjin<zjut_wyj@163.com> 2014/12/2
 */

define('BaseUtils', ['jquery', 'HandlebarsHelper'],
  function (require, exports, module) {
    var BaseUtils, HandlebarsHelper;

    HandlebarsHelper = require('HandlebarsHelper');

    BaseUtils = {
      initSelect: function (options) {
        var $q = Est.promise;
        return new $q(function (resove, reject) {
          var container = {};
          var target = options.target || '#category';
          var render = options.render || '#s1';
          var itemId = options.itemId || 'categoryId';
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
                options.change.call(this, ev.item[itemId]);
              resove(ev.item[itemId]);
            });
          });
        });
      },
      getProductCategory: function (options) {
        debug('getProductCategory');
        var $q = Est.promise;
        return new $q(function (topResolve, topReject) {
          options.select = options ? options.select ? true : false : false;
          options.extend = options ? options.extend ? true : false : false;
          var getCategory = function () {
            return new $q(function (resolve, reject) {
              $.ajax({
                type: 'post',
                url: CONST.API + '/category/product?pageSize=1000',
                async: false,
                data: {
                  _method: 'GET'
                },
                success: function (result) {
                  resolve(result);
                }
              });
            });
          };
          getCategory().then(function (result) {
            if (result.attributes) {
              result.attributes.data = Est.bulidTreeNode(result.attributes.data, 'grade', '00', {
                categoryId: 'categoryId',// 分类ＩＤ
                belongId: 'belongId',// 父类ＩＤ
                childTag: 'cates', // 子分类集的字段名称
                sortBy: 'sort', // 按某个字段排序
                callback: function (item) {
                  item.text = item.name;
                  item.value = item.categoryId;
                }
              });
              if (options.select) {
                result.attributes.data = Est.bulidSelectNode(result.attributes.data, 1, {
                  name: 'text'
                });
              }
              if (options.extend) {
                result.attributes.data = Est.extendTree(result.attributes.data);
              }
            } else {
              result.attributes.data = [];
            }
            result.attributes.data.unshift({text: '请选择分类', value: '/'});
            topResolve(result.attributes.data);
          });
        });
      },
      getNewsCategory: function (options) {
        debug('getNewsCategory');
        return new Est.promise(function (async, topReject) {
          options.select = options ? options.select ? true : false : false;
          options.extend = options ? options.extend ? true : false : false;
          var getCategory = function () {
            return new Est.promise(function (resolve, reject) {
              $.ajax({
                type: 'post',
                url: CONST.API + '/category/news?pageSize=1000',
                async: false,
                data: {
                  _method: 'GET'
                },
                success: function (result) {
                  resolve(result);
                }
              });
            });
          };
          getCategory().then(function (result) {
            if (result.attributes) {
              result.attributes.data = Est.bulidTreeNode(result.attributes.data, 'grade', '01', {
                categoryId: 'categoryId',// 分类ＩＤ
                belongId: 'belongId',// 父类ＩＤ
                childTag: 'cates', // 子分类集的字段名称
                sortBy: 'sort', // 按某个字段排序
                callback: function (item) {
                  item.text = item.name;
                  item.value = item.categoryId;
                }
              });
              if (options.select) {
                result.attributes.data = Est.bulidSelectNode(result.attributes.data, 1, {
                  name: 'text'
                });
              }
              if (options.extend) {
                result.attributes.data = Est.extendTree(result.attributes.data);
              }
            } else {
              result.attributes.data = [];
            }
            result.attributes.data.unshift({text: '请选择分类', value: '/'});
            async(result.attributes.data);
          });
        });
      },
      initDate: function (options) {
        BUI.use('bui/calendar', function (Calendar) {
          new Calendar.DatePicker({
            trigger: options.render || '.calendar',
            showTime: options.showTime || false,
            autoRender: true
          });
        });
      },
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
      tip: function (msg, options) {
        options = options || {time: 2000, title: '提示信息：'};
        seajs.use(['dialog-plus'], function (dialog) {
          window.dialog = dialog;
          window.tipsDialog = dialog({
            id: 'tip-dialog',
            title: options.title,
            width: 200,
            content: msg
          }).show();
          setTimeout(function () {
            window.tipsDialog.close();
          }, options.time);
        });
      },
      /**
       * 确认框， 比如删除操作
       *
       * @method [public] - comfirm
       * @param options [title: 标题][content: 内容][success: 成功回调]
       * @author wyj 14.12.8
       * @example
       *
       */
      comfirm: function (opts) {
        var options = {
          title: '提示',
          content: '是否删除！',
          success: function () {
          },
          target: null
        };
        Est.extend(options, opts);
        seajs.use(['dialog-plus'], function (dialog) {
          dialog({
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
                  this.close();
                }
              }
            ]
          }).show(options.target);
        });
      },
      logout: function () {
        $.ajax({
          type: 'GET',
          async: false,
          url: CONST.API + '/user/logout',
          success: function () {
            window.location.href = CONST.HOST + '/modules/login/login.html';
          }
        });
      },
      /**
       * 重置对话框高度
       * @method [protected] - _resetIframe
       * @author wyj 14.11.16
       */
      resetIframe: function () {
        try {
          if (window.detailDialog && window.detailDialog.height) {
            window.detailDialog.height($(document).height());
            window.detailDialog.reset();
          }
        } catch (e) {
          console.error('【error】: BaseDetail.resetIframe' + e);
        }
      }
    };

    module.exports = BaseUtils;
  }
);