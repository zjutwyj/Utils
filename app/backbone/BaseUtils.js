/**
 * @description BaseUtils
 * @class BaseUtils
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
     *
     */
    initSelect: function (options, context) {
      var tagId = Est.nextUid('select');
      options = Est.extend({
        el: '.' + tagId,
        viewId: tagId,
        data: {
          width: options.width || 150
        } }, options);
      seajs.use(['Select'], function (Select) {
        app.addPanel(tagId, {
          el: options.render,
          template: '<div class="select-inner ' + tagId + '"></div>'
        }).addView(tagId, new Select(options));
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
    }
  }

  module.exports = BaseUtils;
});