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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _C.__proto__ || Object.getPrototypeOf(_C)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["brand", "goodsList", "id", "page", "size"], _this.state = {
      id: 0,
      brand: {},
      goodsList: [],
      page: 1,
      size: 1000
    }, _this.getBrand = function () {
      var that = _this;
      util.request(api.BrandDetail, { id: that.data.id }).then(function (res) {
        if (res.errno === 0) {
          that.setData({
            brand: res.data.brand
          });

          that.getGoodsList();
        }
      });
    }, _this.getGoodsList = function () {
      var that = _this;

      util.request(api.GoodsList, {
        brandId: that.data.id,
        page: that.data.page,
        size: that.data.size
      }).then(function (res) {
        if (res.errno === 0) {
          that.setData({
            goodsList: res.data.goodsList
          });
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
      var that = this;
      that.setData({
        id: parseInt(options.id)
      });
      this.getBrand();
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
          brand = _state.brand,
          goodsList = _state.goodsList;

      Object.assign(this.__state, {});
      return this.__state;
    }
  }]);

  return _C;
}(_index2.default.Component), _class2.$$events = [], _temp2)) || _class);

exports.default = _C;

Page(require('../../npm/_tarojs/taro-alipay/index.js').default.createComponent(_C, true));