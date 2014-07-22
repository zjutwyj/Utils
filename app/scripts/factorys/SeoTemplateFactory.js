/**
 * @description 工厂类， 提供数组接口
 * @class factory - 工厂类
 * @author yongjin on 2014/7/3
 */

/**
 * @description SEO模板
 * @method [SEO] - SeoTemplateFactory
 * @author wyj on 14/7/9
 * @example
 *      SeoTemplateFactory.getCommon(); // 获取普通seo模板
 *      SeoTemplateFactory.getNews(); // 获取新闻seo模板
 *      SeoTemplateFactory.getProduct(); // 获取产品seo模板
 *      SeoTemplateFactory.setCommon(common); // 设置普通seo模板
 *      SeoTemplateFactory.setNews(news); // 设置新闻seo模板
 *      SeoTemplateFactory.setProduct(product); // 设置产品seo模板
 *      SeoTemplateFactory.importCommon(common); // 导入普通seo模板
 *      SeoTemplateFactory.importNews(news); // 导入新闻seo模板
 *      SeoTemplateFactory.importProduct(product); // 导入产品seo模板
 */
app.factory('SeoTemplateFactory', ['BaseFactory', function (BaseFactory) {
    return {
        getCommon: function (params) {
            return BaseFactory.query('seo/template/common', params);
        },
        getNews: function (params) {
            return BaseFactory.query('seo/template/news', params);
        },
        getProduct: function (params) {
            return BaseFactory.query('seo/template/product', params);
        },
        setCommon: function(target){
            return BaseFactory.save('seo/template/common', target);
        },
        setNews: function(target){
            return BaseFactory.save('seo/template/news', target);
        },
        setProduct: function(target){
            return BaseFactory.save('seo/template/product', target);
        },
        importCommon: function(target){
            return BaseFactory.save('seo/template/common/apply', target);
        },
        importNews: function(target){
            return BaseFactory.save('seo/template/news/apply', target);
        },
        importProduct: function(target){
            return BaseFactory.save('seo/template/product/apply', target);
        }
    }
}]);