'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('./npm/_tarojs/taro-alipay/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _App = function (_Taro$Component) {
  _inherits(_App, _Taro$Component);

  function _App() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, _App);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _App.__proto__ || Object.getPrototypeOf(_App)).call.apply(_ref, [this].concat(args))), _this), _this.globalData = {
      userInfo: {
        nickname: '点击登录',
        avatar: 'http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png'
      },
      token: ''
    }, _this.config = {
      pages: ['pages/index/index', 'pages/catalog/catalog', 'pages/newGoods/newGoods', 'pages/hotGoods/hotGoods', 'pages/ucenter/address/address', 'pages/ucenter/addressAdd/addressAdd', 'pages/ucenter/footprint/footprint', 'pages/ucenter/order/order', 'pages/ucenter/orderDetail/orderDetail', 'pages/ucenter/express/express', 'pages/ucenter/feedback/feedback', 'pages/ucenter/coupon/coupon', 'pages/ucenter/collect/collect', 'pages/auth/login/login', 'pages/auth/register/register', 'pages/auth/reset/reset', 'pages/pay/pay', 'pages/payResult/payResult', 'pages/ucenter/index/index', 'pages/topic/topic', 'pages/comment/comment', 'pages/commentPost/commentPost', 'pages/topicComment/topicComment', 'pages/brand/brand', 'pages/brandDetail/brandDetail', 'pages/search/search', 'pages/category/category', 'pages/cart/cart', 'pages/shopping/checkout/checkout', 'pages/shopping/address/address', 'pages/shopping/addressAdd/addressAdd', 'pages/goods/goods', 'pages/topicDetail/topicDetail'],
      window: {
        backgroundTextStyle: 'dark',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: '仿网易严选',
        navigationBarTextStyle: 'black',
        enablePullDownRefresh: true
      },
      tabBar: {
        backgroundColor: '#fafafa',
        borderStyle: 'white',
        selectedColor: '#b4282d',
        color: '#666',
        list: [{
          pagePath: 'pages/index/index',
          iconPath: 'static/images/ic_menu_choice_nor.png',
          selectedIconPath: 'static/images/ic_menu_choice_pressed.png',
          text: '首页'
        }, {
          pagePath: 'pages/topic/topic',
          iconPath: 'static/images/ic_menu_topic_nor.png',
          selectedIconPath: 'static/images/ic_menu_topic_pressed.png',
          text: '专题'
        }, {
          pagePath: 'pages/catalog/catalog',
          iconPath: 'static/images/ic_menu_sort_nor.png',
          selectedIconPath: 'static/images/ic_menu_sort_pressed.png',
          text: '分类'
        }, {
          pagePath: 'pages/cart/cart',
          iconPath: 'static/images/ic_menu_shoping_nor.png',
          selectedIconPath: 'static/images/ic_menu_shoping_pressed.png',
          text: '购物车'
        }, {
          pagePath: 'pages/ucenter/index/index',
          iconPath: 'static/images/ic_menu_me_nor.png',
          selectedIconPath: 'static/images/ic_menu_me_pressed.png',
          text: '我的'
        }]
      },
      networkTimeout: {
        request: 10000,
        downloadFile: 10000
      },
      debug: true
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(_App, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.$app.globalData = this.globalData;

      try {
        this.globalData.userInfo = _index2.default.getStorageSync('userInfo');
        this.globalData.token = _index2.default.getStorageSync('token');
      } catch (e) {
        console.log(e);
      }
    }
  }, {
    key: '_createData',
    value: function _createData() {}
  }]);

  return _App;
}(_index2.default.Component);

exports.default = App;

App(require('./npm/_tarojs/taro-alipay/index.js').default.createApp(_App));
_index2.default.initPxTransform({
  "designWidth": 750,
  "deviceRatio": {
    "640": 1.17,
    "750": 1,
    "828": 0.905
  }
});