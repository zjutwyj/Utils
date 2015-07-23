/**
 * @description 过滤器
 * @class filter - 过滤器
 * @author yongjin<zjut_wyj@163.com> 2015/6/22
 */

var _filter_shop = ['#/shop', '#/shop/pay_type', '#/shop/delivery_type', '#/shop/pay_type', '#/shop/pay_type_add'];
var _filter_version = {
  '00': ['#/delivery_corp', '#/member', '#/member/rank', '#/member/attr', '#/wwy', '#/wwy_invitation',
    '#/bind', '#/recruit', '#/analysis', '#/link', '#/userdefined_mobile', '#/attributes', '#/password', '#/contact', '#/tool', '#/sincerity', '#/certificate',
    '/#member_add', '#/bind', '#/member_rank_add', '#/member_attr_add', '#/link', '#/delivery_type_add', '#/static', '#/userdefined',
    '#/link_add', '#/analysis_add', '#/recruit_add', '#/bind_add', '#/analysis_add', '#/mobile', '#/analysis_add', '#/analysis_add', '#/analysis_add', '#/analysis_add'].concat(_filter_shop),
  '01': [].concat(_filter_shop),
  '02': [].concat(_filter_shop),
  '03': [].concat(_filter_shop),
  '04': [].concat(_filter_shop),
  '05': [].concat(_filter_shop),
  '06': [].concat(_filter_shop),
  '07': []
}

app.addFilter('navigator', function (name) {
  if (app.getData('user') && Est.indexOf(_filter_version[app.getData('user')['grade']], name) > -1) {
    return false;
  }
});
