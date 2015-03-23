/**
 * @description PaginationModel
 * @namespace PaginationModel
 * @author yongjin on 2014/11/6
 */
define('PaginationModel', ['jquery', 'underscore', 'backbone'],
  function (require, exports, module) {

    var PaginationModel, Backbone;
    Backbone = require('backbone');

    PaginationModel = Backbone.Model.extend({
      defaults: { page: 1, pageSize: 16, count: 0 },
      initialize: function () {
        debug('3.PaginationModel.initialize');
      }
    });
    module.exports = PaginationModel;
  });