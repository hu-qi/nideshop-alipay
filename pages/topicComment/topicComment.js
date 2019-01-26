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

var app = _index2.default.getApp();
var util = require('../../utils/util.js');

var api = require('../../config/api.js');

var _C = (_dec = (0, _index4.default)('Page'), _dec(_class = (_temp2 = _class2 = function (_Taro$Component) {
  _inherits(_C, _Taro$Component);

  function _C() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, _C);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _C.__proto__ || Object.getPrototypeOf(_C)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["comments", "allCommentList", "picCommentList", "typeId", "valueId", "showType", "allCount", "hasPicCount", "allPage", "picPage", "size"], _this.state = {
      comments: [],
      allCommentList: [],
      picCommentList: [],
      typeId: 0,
      valueId: 0,
      showType: 0,
      allCount: 0,
      hasPicCount: 0,
      allPage: 1,
      picPage: 1,
      size: 20
    }, _this.getCommentCount = function () {
      var that = _this;
      util.request(api.CommentCount, {
        valueId: that.data.valueId,
        typeId: that.data.typeId
      }).then(function (res) {
        if (res.errno === 0) {
          that.setData({
            allCount: res.data.allCount,
            hasPicCount: res.data.hasPicCount
          });
        }
      });
    }, _this.getCommentList = function () {
      var that = _this;
      util.request(api.CommentList, {
        valueId: that.data.valueId,
        typeId: that.data.typeId,
        size: that.data.size,
        page: that.data.showType == 0 ? that.data.allPage : that.data.picPage,
        showType: that.data.showType
      }).then(function (res) {
        if (res.errno === 0) {
          if (that.data.showType == 0) {
            that.setData({
              allCommentList: that.data.allCommentList.concat(res.data.data),
              allPage: res.data.currentPage,
              comments: that.data.allCommentList.concat(res.data.data)
            });
          } else {
            that.setData({
              picCommentList: that.data.picCommentList.concat(res.data.data),
              picPage: res.data.currentPage,
              comments: that.data.picCommentList.concat(res.data.data)
            });
          }
        }
      });
    }, _this.switchTab = function () {
      _this.setData({
        showType: _this.data.showType == 1 ? 0 : 1
      });

      _this.getCommentList();
    }, _this.onReachBottom = function () {
      console.log('onPullDownRefresh');
      if (_this.data.showType == 0) {
        if (_this.data.allCount / _this.data.size < _this.data.allPage) {
          return false;
        }

        _this.setData({
          allPage: _this.data.allPage + 1
        });
      } else {
        if (_this.data.hasPicCount / _this.data.size < _this.data.picPage) {
          return false;
        }

        _this.setData({
          picPage: _this.data.picPage + 1
        });
      }

      _this.getCommentList();
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
      this.setData({
        typeId: options.typeId,
        valueId: options.valueId
      });
      this.getCommentCount();
      this.getCommentList();
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

      var comments = this.__state.comments;

      Object.assign(this.__state, {});
      return this.__state;
    }
  }]);

  return _C;
}(_index2.default.Component), _class2.$$events = [], _temp2)) || _class);

exports.default = _C;

Page(require('../../npm/_tarojs/taro-alipay/index.js').default.createComponent(_C, true));