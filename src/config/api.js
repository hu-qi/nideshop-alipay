const ApiRootUrl = 'https://nideshop-api.fashaoge.com/api/'

module.exports = {
  IndexUrl: 'https://nideshop-api.fashaoge.com/api/index/index', //首页数据接口
  CatalogList: 'https://nideshop-api.fashaoge.com/api/catalog/index', //分类目录全部分类数据接口
  CatalogCurrent: 'https://nideshop-api.fashaoge.com/api/catalog/current', //分类目录当前分类数据接口

  AuthLoginByWeixin: 'https://nideshop-api.fashaoge.com/api/auth/loginByWeixin', //微信登录

  GoodsCount: 'https://nideshop-api.fashaoge.com/api/goods/count', //统计商品总数
  GoodsList: 'https://nideshop-api.fashaoge.com/api/goods/list', //获得商品列表
  GoodsCategory: 'https://nideshop-api.fashaoge.com/api/goods/category', //获得分类数据
  GoodsDetail: 'https://nideshop-api.fashaoge.com/api/goods/detail', //获得商品的详情
  GoodsNew: 'https://nideshop-api.fashaoge.com/api/goods/new', //新品
  GoodsHot: 'https://nideshop-api.fashaoge.com/api/goods/hot', //热门
  GoodsRelated: 'https://nideshop-api.fashaoge.com/api/goods/related', //商品详情页的关联商品（大家都在看）

  BrandList: 'https://nideshop-api.fashaoge.com/api/brand/list', //品牌列表
  BrandDetail: 'https://nideshop-api.fashaoge.com/api/brand/detail', //品牌详情

  CartList: 'https://nideshop-api.fashaoge.com/api/cart/index', //获取购物车的数据
  CartAdd: 'https://nideshop-api.fashaoge.com/api/cart/add', // 添加商品到购物车
  CartUpdate: 'https://nideshop-api.fashaoge.com/api/cart/update', // 更新购物车的商品
  CartDelete: 'https://nideshop-api.fashaoge.com/api/cart/delete', // 删除购物车的商品
  CartChecked: 'https://nideshop-api.fashaoge.com/api/cart/checked', // 选择或取消选择商品
  CartGoodsCount: 'https://nideshop-api.fashaoge.com/api/cart/goodscount', // 获取购物车商品件数
  CartCheckout: 'https://nideshop-api.fashaoge.com/api/cart/checkout', // 下单前信息确认

  OrderSubmit: 'https://nideshop-api.fashaoge.com/api/order/submit', // 提交订单
  PayPrepayId: 'https://nideshop-api.fashaoge.com/api/pay/prepay', //获取微信统一下单prepay_id

  CollectList: 'https://nideshop-api.fashaoge.com/api/collect/list', //收藏列表
  CollectAddOrDelete:
    'https://nideshop-api.fashaoge.com/api/collect/addordelete', //添加或取消收藏

  CommentList: 'https://nideshop-api.fashaoge.com/api/comment/list', //评论列表
  CommentCount: 'https://nideshop-api.fashaoge.com/api/comment/count', //评论总数
  CommentPost: 'https://nideshop-api.fashaoge.com/api/comment/post', //发表评论

  TopicList: 'https://nideshop-api.fashaoge.com/api/topic/list', //专题列表
  TopicDetail: 'https://nideshop-api.fashaoge.com/api/topic/detail', //专题详情
  TopicRelated: 'https://nideshop-api.fashaoge.com/api/topic/related', //相关专题

  SearchIndex: 'https://nideshop-api.fashaoge.com/api/search/index', //搜索页面数据
  SearchResult: 'https://nideshop-api.fashaoge.com/api/search/result', //搜索数据
  SearchHelper: 'https://nideshop-api.fashaoge.com/api/search/helper', //搜索帮助
  SearchClearHistory:
    'https://nideshop-api.fashaoge.com/api/search/clearhistory', //搜索帮助

  AddressList: 'https://nideshop-api.fashaoge.com/api/address/list', //收货地址列表
  AddressDetail: 'https://nideshop-api.fashaoge.com/api/address/detail', //收货地址详情
  AddressSave: 'https://nideshop-api.fashaoge.com/api/address/save', //保存收货地址
  AddressDelete: 'https://nideshop-api.fashaoge.com/api/address/delete', //保存收货地址

  RegionList: 'https://nideshop-api.fashaoge.com/api/region/list', //获取区域列表

  OrderList: 'https://nideshop-api.fashaoge.com/api/order/list', //订单列表
  OrderDetail: 'https://nideshop-api.fashaoge.com/api/order/detail', //订单详情
  OrderCancel: 'https://nideshop-api.fashaoge.com/api/order/cancel', //取消订单
  OrderExpress: 'https://nideshop-api.fashaoge.com/api/order/express', //物流详情

  FootprintList: 'https://nideshop-api.fashaoge.com/api/footprint/list', //足迹列表
  FootprintDelete: 'https://nideshop-api.fashaoge.com/api/footprint/delete' //删除足迹
}
