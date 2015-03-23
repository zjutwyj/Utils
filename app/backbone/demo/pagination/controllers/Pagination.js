/**
 * @description Pagination
 * @namespace Pagination
 * @author yongjin on 2014/11/6
 */
define('Pagination', ['jquery', 'underscore', 'backbone', 'HandlebarsHelper', 'template/pagination'],
  function (require, exports, module) {
    var Backbone, HandlebarsHelper, Pagination, template;

    Backbone = require('backbone');
    HandlebarsHelper = require('HandlebarsHelper');
    template = require('template/pagination') || 'pagination.html[404]';

    //分页模板
    var Pagination = Backbone.View.extend({
      tagName: "div",
      events: {
        'change .per_page_show': 'changePerPage',
        'click .reload': 'reload',
        'click .pageTo':'pageTo'
      },
      template: HandlebarsHelper.compile(template),
      initialize: function () {
        debug('7.Pagination.initialize');
        if (!this.model.get('page')) this.model.set('page', 1);
        if (!this.model.get('count')) this.model.set('count', 0);
        if (!this.model.get('pageSize')) this.model.set('pageSize', 16);
        this.render();
      },
      render: function () {
        debug('8.Pagination.render');
        var ctx = this;

        this.model.set('totalPage', Est.getMaxPage(this.model.get('count'), this.model.get('pageSize')));
        var $html = $(this.template(this.model.toJSON()));

        $(".danaiPageNum", $html).bind('click', function () {
          var num = $(this).attr('data-page');
          ctx.toPage(num);
        });

        this.$el.html($html);
        this.$select = this.$('.per_page_show');
        return this;
      },
      changePerPage: function(){
        // 默认从第一页开始
        this.model.set('page', 1);
        this.model.set('pageSize', this.$select.val());
        this.model.trigger('reloadList', this.model);
      },
      toPage: function (num) {
        if (parseInt(num, 10) > this.model.get('totalPage') || parseInt(num, 10) < 1) return;
        this.model.set('page', parseInt(num, 10));
        this.model.trigger('reloadList', this.model);
      },
      reload: function(){
        this.model.trigger('reloadList', this.model);
      },
      pageTo: function(){
        var page = parseInt(Est.trim(this.$('.input-pageTo').val()), 10);
        if (page > this.model.get('totalPage') || page < 1) return;
        if (Est.isEmpty(page)) return;
        this.model.set('page', page);
        this.model.trigger('reloadList', this.model);
      }
    });
    module.exports = Pagination;
  });
