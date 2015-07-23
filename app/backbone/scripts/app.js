/**
 * @description 应用程序创建
 * @class app
 * @author yongjin<zjut_wyj@163.com> 2015/2/5
 */

/**
 * 应用程序创建
 * */
if (typeof app === 'undefined') {
  App = app = new Application(CONST);
}
// 是否登录可见
app.addStatus('loginViewList', [
  {text: '访问者可见', value: '0'},
  {text: '登录后可见', value: '1'}
]);
// 广告产品
app.addStatus('adsList', [
  {text: '是否广告产品？', value: ''},
  {text: '是', value: '1'},
  {text: '否', value: '0'}
]);
// 产品属性
app.addStatus('productType', [
  {text: '请选择', value: ''},
  {text: '新品', value: 'NW'},
  {text: '精品', value: 'CP'}
]);
// 域名绑定类型
app.addStatus('bindTypeList', [
  {text: '域名', value: 'D'},
  {text: '地址', value: 'A'},
  {text: '图片', value: 'I'},
  {text: '手机', value: 'M'}
]);
// 第三方统计类型
app.addStatus('analysisTypeList', [
  {text: '请选择', value: ''},
  {text: '百度', value: 'BAIDU'},
  {text: '中国站长', value: 'CNZZ'},
  {text: 'LA51', value: '51La'},
  {text: '谷歌', value: 'GOOGLE'},
  {text: 'GoStats', value: 'GoStats'},
  {text: '其它', value: 'OTHER'}
]);
// 微传单 切换
app.addStatus('yywSwitch', [
  {text: '关闭', value: '00'},
  {text: '左右翻屏', value: '01'},
  {text: '上下翻屏', value: '02'},
  {text: '斜切翻屏', value: '03'}
]);
// 重量单位
app.addStatus('weightUnit', [
  {text: '克', value: 'g'},
  {text: '千克', value: 'kg'},
  {text: '吨', value: 't'}
]);
// 配送方式
app.addStatus('deliveryMethod', [
  {text: '先付款后发货', value: 'deliveryAgainstPayment'},
  {text: '货到付款', value: 'cashOnDelivery'}
]);
// 支付方式(管理员自己设置的支付方式)
app.addStatus('paymentType', [
  { text: '预存款支付', value: 'deposit' },
  { text: '在线充值', value: 'recharge' },
  { text: '线下支付', value: 'offline' },
  { text: '在线支付', value: 'online' }
]);
// 支付配置类型(管理员跟银行的关系)
app.addStatus('paymentConfigType', [
  {text: '预存款', value: 'deposit'},
  {text: '线下支付', value: 'offline'},
  {text: '支付宝', value: 'alipay'},
  {text: '微信支付', value: 'wxpay'}
]);
// 证书类型
app.addStatus('certType', [
  {text: '请选择分类', value: ''},
  {text: '基本证书', value: '01'},
  {text: '税务登记证', value: '07'},
  {text: '荣誉证书', value: '04'},
  {text: '营业执照', value: '06'},
  {text: '组织机构代码证', value: '08'},
  {text: '实地认证', value: '09'},
  {text: '其它证书', value: '05'}
]);
// 新闻类型 图片
app.addStatus('ImageNews', [
  {text: '全部', value: ''},
  {text: '是', value: '01'},
  {text: '否', value: '00'}
]);
// 新闻类型 滚动
app.addStatus('RollingNews', [
  {text: '全部', value: ''},
  {text: '是', value: '01'},
  {text: '否', value: '00'}
]);
// 新闻类型 置顶
app.addStatus('TopNews', [
  {text: '全部', value: ''},
  {text: '是', value: '01'},
  {text: '否', value: '00'}
]);
// 新闻状态 显示/隐藏
app.addStatus('newsState', [
  {text: '全部', value: ''},
  {text: '显示', value: '01'},
  {text: '隐藏', value: '00'}
]);
// 属性类型
app.addStatus('attributeType', [
  {text: '文本', value: 'text'},
  {text: '数字', value: 'number'},
  {text: '字母', value: 'alphaint'},
  {text: '单选项', value: 'select'},
  {text: '多选项', value: 'checkbox'},
  {text: '日期', value: 'date'}
]);
// 付款状态
app.addStatus('paymentStatus', [
  {text: '请选择', value: '', html: '-'},
  {text: '未支付', value: 'unpaid', html: '<span style="color: red;">未支付</span>'},
  {text: '部分支付', value: 'partPayment', html: '<span style="color: orange;">部分支付</span>'},
  {text: '已支付', value: 'paid', html: '<span style="color: green;">已支付</span>'},
  {text: '部分退款', value: 'partRefund', html: '<span style="color: orange;">部分退款</span>'},
  {text: '全额退款', value: 'refunded', html: '<span style="color: #000000;">全额退款</span>'}
]);

// 配送状态
app.addStatus('shippingStatus', [
  {text: '请选择', value: '', html: '-'},
  {text: '未发货', value: 'unshipped', html: '<span style="color: red;">未发货</span>'},
  {text: '部分发贫', value: 'partShipped', html: '<span style="color: orange;">部分发贫</span>'},
  {text: '已发货', value: 'shipped', html: '<span style="color: green;">已发货</span>'},
  {text: '部分退货', value: 'partReshiped', html: '<span style="color: black;">部分退货</span>'},
  {text: '已退货', value: 'reshiped', html: '<span style="color: black;">已退货</span>'}
]);

// 订单状态
app.addStatus('orderStatus', [
  {text: '请选择', value: '', html: '-'},
  {text: '未处理', value: 'unprocessed', html: '<span style="color: red;">未处理</span>'},
  {text: '已处理', value: 'processed', html: '<span style="color: green;">已处理</span>'},
  {text: '已完成', value: 'completed', html: '<span style="color: #239AFF;">已完成</span>'},
  {text: '已作废', value: 'invalid', html: '<span style="color: gray;">已作废</span>'}
]);
// 订单日志状态
app.addStatus('orderLogType', [
  {text: '请选择', value: '', html: '-'},
  {text: '订单创建', value: 'create'},
  {text: '订单修改', value: 'modify'},
  {text: '订单支付', value: 'payment'},
  {text: '订单退款', value: 'refund'},
  {text: '订单发货', value: 'shipping'},
  {text: '订单退货', value: 'reship'},
  {text: '订单完成', value: 'completed'},
  {text: '订单作废', value: 'invlid'}
]);
// 审核状态
app.addStatus('state', [
  {text: '已审核 ', value: '01', html: '<span style="color: green;">已审核</span>'},
  {text: '未审核 ', value: '00', html: '<span style="color: gray;">未审核</span>'},
  {text: '审核未通过 ', value: '02', html: '<span style="color: red;">审核未通过</span>'}
]);
// 审核状态
app.addStatus('distributionState', [
  {text: '已审核 ', value: '01', html: '<span style="color: green;">已审核</span>'},
  {text: '未审核 ', value: '00', html: '<span style="color: gray;">未审核</span>'},
  {text: '审核未通过 ', value: '02', html: '<span style="color: red;">审核未通过</span>'},
  {text: '已删除 ', value: '03', html: '<span style="color: red;">已删除</span>'},
  {text: '已锁定 ', value: '04', html: '<span style="color: red;">已锁定</span>'}
]);
// 经营模式
app.addStatus('businessType', [
  {text: '生产加工', value: '00'},
  {text: '经营批发', value: '01'},
  {text: '招商代理', value: '02'},
  {text: '商业服务', value: '03'},
  {text: '以上都不是', value: '04'}
]);

// 企业类型
app.addStatus('enterpriseType', [
  {text: '个人用户', value: '00'},
  {text: '企业单位', value: '01'},
  {text: '个体经营', value: '02'},
  {text: '事业单位或者团体', value: '03'}
]);

// 充值方式
app.addStatus('depositType', [
  {text: '会员充值', value: 'memberRecharge'},
  {text: '会员支付', value: 'memberPayment'},
  {text: '后台代支付', value: 'adminRecharge'},
  {text: '后台代扣费', value: 'adminChargeback'},
  {text: '后台代充值', value: 'adminPayment'},
  {text: '后台退款', value: 'adminRefund'}
]);


// 音乐地址
app.addStatus('music', [
  {text: '无音乐', value: '-'},
  {text: '新年財神到 (30S).mp3', value: 'xncsd'},
  {text: '恭喜發財舞曲 (30S).mp3', value: 'gxfcwq'},
  {text: '舞龍鳳 (30S).mp3', value: 'wlf'},
  {text: '花與夢', value: 'hxm'},
  {text: '邂逅', value: 'xg'},
  {text: 'This Ring', value: 'This Ring'},
  {text: 'Canon in D Serenade', value: 'Canon in D Serenade'},
  {text: "She's A Rocket", value: "She's A Rocket"},
  {text: 'Russian Wedding', value: 'Russian Wedding'},
  {text: 'Spring Vivaldi', value: 'Spring Vivaldi'},
  {text: 'The Four Seasons(Winter)', value: 'The Four Seasons(Winter)'},
  {text: 'The Swan', value: 'The Swan'},
  {text: 'Wedding March', value: 'Wedding March'},
  {text: 'Marry_You', value: 'Marry_You'},
  {text: "50's stories", value: "50's stories"},
  {text: 'American Rodeo', value: 'American Rodeo'},
  {text: 'Canon in D major for Strings', value: 'Canon in D major for Strings'},
  {text: 'Dance with Me', value: 'Dance with Me'},
  {text: 'Fit To Be Tied-Band', value: 'Fit To Be Tied-Band'},
  {text: 'Jesu Joy', value: 'Jesu Joy'},
  {text: 'Marry_You', value: 'Marry_You'},
  {text: 'Make It Last', value: 'Make It Last'},
  {text: 'Ode To Joy', value: 'Ode To Joy'}
]);

// 音乐图标
app.addStatus('musicIcon', [
  { text: 'a', value: 'upload/j/j2/jihui88/picture/2015/04/02/d6b66a9f-6662-4670-9353-0a1075b16f6a.png' },
  { text: 'b', value: 'upload/j/j2/jihui88/picture/2015/04/07/985cff05-0f26-48d2-b146-4a12b3bf9e82.png' },
  { text: 'c', value: 'upload/j/j2/jihui88/picture/2015/04/09/e56b7fd6-7b1b-4e39-bb70-ad4b80be8208.png' }
]);

// 字體位置
app.addStatus('eLocationType', [
  {text: '左上角', value: 'NorthWest'},
  {text: '正上方', value: 'North'},
  {text: '右上角', value: 'NorthEast'},
  {text: '左居中', value: 'West'},
  {text: '中间', value: 'Center'},
  {text: '右居中', value: 'East'},
  {text: '左下角', value: 'SouthWest'},
  {text: '正下方', value: 'South'},
  {text: '右下角', value: 'SouthEast'}

]);

// 分销状态
app.addStatus('distributionType', [
  {text: '按销量排行', value: 'number'},
  {text: '按金额排行', value: 'price'}
]);

// 货币符号
app.addStatus('currencyType', [
  {text: '元', value: '￥'},
  {text: '美元', value: '$'}
]);

window.app = window.App = app;
