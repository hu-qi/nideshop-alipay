"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _class, _class2, _temp2;

var _index = require("../../../npm/_tarojs/taro-alipay/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../../npm/_tarojs/with-weapp/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var pay = require('../../../services/pay.js');

var app = _index2.default.getApp();

var _C = (_dec = (0, _index4.default)('Page'), _dec(_class = (_temp2 = _class2 = function (_Taro$Component) {
  _inherits(_C, _Taro$Component);

  function _C() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, _C);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _C.__proto__ || Object.getPrototypeOf(_C)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "anonymousState__temp2", "anonymousState__temp3", "checkedAddress", "checkedGoodsList", "couponList", "goodsTotalPrice", "freightPrice", "couponPrice", "actualPrice", "checkedCoupon", "orderTotalPrice", "addressId", "couponId"], _this.state = {
      checkedGoodsList: [],
      checkedAddress: {},
      checkedCoupon: [],
      couponList: [],
      goodsTotalPrice: 0.0, //商品总价
      freightPrice: 0.0, //快递费
      couponPrice: 0.0, //优惠券的价格
      orderTotalPrice: 0.0, //订单总价
      actualPrice: 0.0, //实际需要支付的总价
      addressId: 0,
      couponId: 0
    }, _this.getCheckoutInfo = function () {
      var that = _this;
      util.request(api.CartCheckout, {
        addressId: that.data.addressId,
        couponId: that.data.couponId
      }).then(function (res) {
        console.log(res)
        if (res.errno === 0) {
          console.log(res.data.checkedAddress);
          that.setData({
            checkedGoodsList: res.data.checkedGoodsList,
            checkedAddress: res.data.checkedAddress,
            actualPrice: res.data.actualPrice,
            checkedCoupon: res.data.checkedCoupon,
            couponList: res.data.couponList,
            couponPrice: res.data.couponPrice,
            freightPrice: res.data.freightPrice,
            goodsTotalPrice: res.data.goodsTotalPrice,
            orderTotalPrice: res.data.orderTotalPrice
          });
        } else {
          console.log('111')
          my.navigateBack({
            delta: 1
          })
        }
        _index2.default.hideLoading();
      });
    }, _this.selectAddress = function () {
      _index2.default.navigateTo({
        url: '/pages/shopping/address/address'
      });
    }, _this.addAddress = function () {
      _index2.default.navigateTo({
        url: '/pages/shopping/addressAdd/addressAdd'
      });
    }, _this.submitOrder = function () {
      if (_this.data.addressId <= 0) {
        util.showErrorToast('请选择收货地址');
        return false;
      }
      util.request(api.OrderSubmit, { addressId: _this.data.addressId, couponId: _this.data.couponId }, 'POST').then(function (res) {
        if (res.errno === 0) {
          var orderId = res.data.orderInfo.id;
          pay.payOrder(parseInt(orderId)).then(function (res) {
            if(res.resultCode == '9000'){
              _index2.default.redirectTo({
                url: '/pages/payResult/payResult?status=1&orderId=' + orderId
              });
            } else {
              _index2.default.redirectTo({
                 url: '/pages/payResult/payResult?status=0&orderId=' + orderId
              });    
            }
          }).catch(function (res) {
            _index2.default.redirectTo({
              url: '/pages/payResult/payResult?status=0&orderId=' + orderId
            });
          });
        } else {
          util.showErrorToast('下单失败');
        }
      });
    }, _this.config = {}, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(_C, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(_C.prototype.__proto__ || Object.getPrototypeOf(_C.prototype), "_constructor", this).call(this, props);
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount(options) {
      // 页面初始化 options为页面跳转所带来的参数

      try {
        var addressId = _index2.default.getStorageSync('addressId');
        if (addressId) {
          this.setData({
            addressId: addressId
          });
        }

        var couponId = _index2.default.getStorageSync('couponId');
        if (couponId) {
          this.setData({
            couponId: couponId
          });
        }
      } catch (e) {
        // Do something when catch error
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      // 页面渲染完成
    }
  }, {
    key: "componentDidShow",
    value: function componentDidShow() {
      // 页面显示
      _index2.default.showLoading({
        title: '加载中...'
      });
      this.getCheckoutInfo();
    }
  }, {
    key: "componentDidHide",
    value: function componentDidHide() {
      // 页面隐藏
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      // 页面关闭
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      ;

      var _state = this.__state,
          checkedAddress = _state.checkedAddress,
          couponList = _state.couponList,
          goodsTotalPrice = _state.goodsTotalPrice,
          freightPrice = _state.freightPrice,
          couponPrice = _state.couponPrice,
          checkedGoodsList = _state.checkedGoodsList,
          actualPrice = _state.actualPrice;

      var anonymousState__temp = checkedAddress.id > 0 ? "/static/images/address_right.png" : null;
      var anonymousState__temp2 = checkedAddress.id <= 0 ? "/static/images/address_right.png" : null;
      var anonymousState__temp3 = "/static/images/address_right.png";
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp,
        anonymousState__temp2: anonymousState__temp2,
        anonymousState__temp3: anonymousState__temp3
      });
      return this.__state;
    }
  }]);

  return _C;
}(_index2.default.Component), _class2.$$events = ["selectAddress", "addAddress", "submitOrder"], _temp2)) || _class);

exports.default = _C;

Page(require('../../../npm/_tarojs/taro-alipay/index.js').default.createComponent(_C, true));