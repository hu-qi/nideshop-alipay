"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _class, _class2, _temp2;

var _index = require("../../npm/_tarojs/taro-alipay/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../npm/_tarojs/with-weapp/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var util = require('../../utils/util.js');
var api = require('../../config/api.js');

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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _C.__proto__ || Object.getPrototypeOf(_C)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["cartGoods", "isEditCart", "checkedAllStatus", "cartTotal", "editCartList"], _this.state = {
      cartGoods: [],
      cartTotal: {
        goodsCount: 0,
        goodsAmount: 0.0,
        checkedGoodsCount: 0,
        checkedGoodsAmount: 0.0
      },
      isEditCart: false,
      checkedAllStatus: true,
      editCartList: []
    }, _this.getCartList = function () {
      var that = _this;
      util.request(api.CartList).then(function (res) {
        if (res.errno === 0) {
          console.log(res.data);
          that.setData({
            cartGoods: res.data.cartList,
            cartTotal: res.data.cartTotal
          });
        }

        that.setData({
          checkedAllStatus: that.isCheckedAll()
        });
      });
    }, _this.isCheckedAll = function () {
      //判断购物车商品已全选
      return _this.data.cartGoods.every(function (element, index, array) {
        if (element.checked == true) {
          return true;
        } else {
          return false;
        }
      });
    }, _this.checkedItem = function (event) {
      var itemIndex = event.target.dataset.itemIndex;
      var that = _this;

      if (!_this.data.isEditCart) {
        util.request(api.CartChecked, {
          productIds: that.data.cartGoods[itemIndex].product_id,
          isChecked: that.data.cartGoods[itemIndex].checked ? 0 : 1
        }, 'POST').then(function (res) {
          if (res.errno === 0) {
            console.log(res.data);
            that.setData({
              cartGoods: res.data.cartList,
              cartTotal: res.data.cartTotal
            });
          }

          that.setData({
            checkedAllStatus: that.isCheckedAll()
          });
        });
      } else {
        //编辑状态
        var tmpCartData = _this.data.cartGoods.map(function (element, index, array) {
          if (index == itemIndex) {
            element.checked = !element.checked;
          }

          return element;
        });

        that.setData({
          cartGoods: tmpCartData,
          checkedAllStatus: that.isCheckedAll(),
          'cartTotal.checkedGoodsCount': that.getCheckedGoodsCount()
        });
      }
    }, _this.getCheckedGoodsCount = function () {
      var checkedGoodsCount = 0;
      _this.data.cartGoods.forEach(function (v) {
        if (v.checked === true) {
          checkedGoodsCount += v.number;
        }
      });
      console.log(checkedGoodsCount);
      return checkedGoodsCount;
    }, _this.checkedAll = function () {
      var that = _this;

      if (!_this.data.isEditCart) {
        var productIds = _this.data.cartGoods.map(function (v) {
          return v.product_id;
        });
        util.request(api.CartChecked, {
          productIds: productIds.join(','),
          isChecked: that.isCheckedAll() ? 0 : 1
        }, 'POST').then(function (res) {
          if (res.errno === 0) {
            console.log(res.data);
            that.setData({
              cartGoods: res.data.cartList,
              cartTotal: res.data.cartTotal
            });
          }

          that.setData({
            checkedAllStatus: that.isCheckedAll()
          });
        });
      } else {
        //编辑状态
        var checkedAllStatus = that.isCheckedAll();
        var tmpCartData = _this.data.cartGoods.map(function (v) {
          v.checked = !checkedAllStatus;
          return v;
        });

        that.setData({
          cartGoods: tmpCartData,
          checkedAllStatus: that.isCheckedAll(),
          'cartTotal.checkedGoodsCount': that.getCheckedGoodsCount()
        });
      }
    }, _this.editCart = function () {
      var that = _this;
      if (_this.data.isEditCart) {
        _this.getCartList();
        _this.setData({
          isEditCart: !_this.data.isEditCart
        });
      } else {
        //编辑状态
        var tmpCartList = _this.data.cartGoods.map(function (v) {
          v.checked = false;
          return v;
        });
        _this.setData({
          editCartList: _this.data.cartGoods,
          cartGoods: tmpCartList,
          isEditCart: !_this.data.isEditCart,
          checkedAllStatus: that.isCheckedAll(),
          'cartTotal.checkedGoodsCount': that.getCheckedGoodsCount()
        });
      }
    }, _this.updateCart = function (productId, goodsId, number, id) {
      var that = _this;

      util.request(api.CartUpdate, {
        productId: productId,
        goodsId: goodsId,
        number: number,
        id: id
      }, 'POST').then(function (res) {
        if (res.errno === 0) {
          console.log(res.data);
          that.setData({
            //cartGoods: res.data.cartList,
            //cartTotal: res.data.cartTotal
          });
        }

        that.setData({
          checkedAllStatus: that.isCheckedAll()
        });
      });
    }, _this.cutNumber = function (event) {
      var itemIndex = event.target.dataset.itemIndex;
      var cartItem = _this.data.cartGoods[itemIndex];
      var number = cartItem.number - 1 > 1 ? cartItem.number - 1 : 1;
      cartItem.number = number;
      _this.setData({
        cartGoods: _this.data.cartGoods
      });
      _this.updateCart(cartItem.product_id, cartItem.goods_id, number, cartItem.id);
    }, _this.addNumber = function (event) {
      var itemIndex = event.target.dataset.itemIndex;
      var cartItem = _this.data.cartGoods[itemIndex];
      var number = cartItem.number + 1;
      cartItem.number = number;
      _this.setData({
        cartGoods: _this.data.cartGoods
      });
      _this.updateCart(cartItem.product_id, cartItem.goods_id, number, cartItem.id);
    }, _this.checkoutOrder = function () {
      //获取已选择的商品
      var that = _this;

      var checkedGoods = _this.data.cartGoods.filter(function (element, index, array) {
        if (element.checked == true) {
          return true;
        } else {
          return false;
        }
      });

      if (checkedGoods.length <= 0) {
        return false;
      }

      _index2.default.navigateTo({
        url: '../shopping/checkout/checkout'
      });
    }, _this.deleteCart = function () {
      //获取已选择的商品
      var that = _this;

      var productIds = _this.data.cartGoods.filter(function (element, index, array) {
        if (element.checked == true) {
          return true;
        } else {
          return false;
        }
      });

      if (productIds.length <= 0) {
        return false;
      }

      productIds = productIds.map(function (element, index, array) {
        if (element.checked == true) {
          return element.product_id;
        }
      });

      util.request(api.CartDelete, {
        productIds: productIds.join(',')
      }, 'POST').then(function (res) {
        if (res.errno === 0) {
          console.log(res.data);
          var cartList = res.data.cartList.map(function (v) {
            console.log(v);
            v.checked = false;
            return v;
          });

          that.setData({
            cartGoods: cartList,
            cartTotal: res.data.cartTotal
          });
        }

        that.setData({
          checkedAllStatus: that.isCheckedAll()
        });
      });
    }, _this.config = {
      backgroundColor: '#f4f4f4'
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
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
      this.getCartList();
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
          cartGoods = _state.cartGoods,
          isEditCart = _state.isEditCart,
          checkedAllStatus = _state.checkedAllStatus,
          cartTotal = _state.cartTotal;

      Object.assign(this.__state, {});
      return this.__state;
    }
  }]);

  return _C;
}(_index2.default.Component), _class2.$$events = ["checkedItem", "cutNumber", "addNumber", "checkedAll", "editCart", "deleteCart", "checkoutOrder"], _temp2)) || _class);

exports.default = _C;

Page(require('../../npm/_tarojs/taro-alipay/index.js').default.createComponent(_C, true));