/**
 * @description BaseService - 单例模式， 只创建一个实例化对象
 * @class BaseService - 数据请求
 * @author yongjin<zjut_wyj@163.com> 2015/1/26
 */
define('BaseService', ['jquery'], function (require, exports, module) {
  var BaseService;

  BaseService = function () {
    if (typeof BaseService.instance === 'object') {
      return BaseService.instance;
    }
    debug('- 创建BaseService实例');
    BaseService.instance = this;
  }

  BaseService.prototype = {
    /**
     * 基础ajax
     * @method ajax
     * @param options
     * @return {*}
     * @author wyj 15.1.26
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
     * @method initTree
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
     * @method initSelect
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
     * @method initExtend
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
     * @method initDefault
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

              rootKey: 'isroot', // 构建树时的父级字段名称
              rootValue: '01', // 父级字段值
              categoryId: 'categoryId', //分类 Id
              belongId: 'belongId', // 父类ID
              childTag: 'cates', // 子集字段名称
              sortBy: 'sort', // 根据某个字段排序

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

  module.exports = BaseService;
});