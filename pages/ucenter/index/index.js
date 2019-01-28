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
var user = require('../../../services/user.js');
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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _C.__proto__ || Object.getPrototypeOf(_C)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "userInfo", "showLoginDialog"], _this.state = {
      userInfo: {},
      showLoginDialog: false
    }, _this.onShow =  function () {
      console.log(1)
    },
    _this.onUserInfoClick = function () {
      if (!_index2.default.getStorageSync('token')) {
        _this.showLoginDialog();
      }
    }, _this.showLoginDialog = function () {
      _this.setData({
        showLoginDialog: true
      });
    }, _this.onCloseLoginDialog = function () {
      _this.setData({
        showLoginDialog: false
      });
    }, _this.onDialogBody = function () {
      // 阻止冒泡
    }, _this.onWechatLogin = function (e) {
      if (e.detail.errMsg !== 'getUserInfo:ok') {
        if (e.detail.errMsg === 'getUserInfo:fail auth deny') {
          return false;
        }
        _index2.default.showToast({
          title: '微信登录失败'
        });
        return false;
      }
      util.login().then(function (res) {
        return util.request(api.AuthLoginByWeixin, {
          code: res,
          userInfo: e.detail
        }, 'POST');
      }).then(function (res) {
        console.log(res);
        if (res.errno !== 0) {
          _index2.default.showToast({
            title: '微信登录失败'
          });
          return false;
        }
        // 设置用户信息
        _this.setData({
          userInfo: res.data.userInfo,
          showLoginDialog: false
        });
        app.globalData.userInfo = res.data.userInfo;
        app.globalData.token = res.data.token;
        _index2.default.setStorageSync('userInfo', JSON.stringify(res.data.userInfo));
        _index2.default.setStorageSync('token', res.data.token);
      }).catch(function (err) {
        console.log(err);
      });
    }, _this.onAlipayLogin = function (e) {
      console.log(e)
      // if (e.detail.errMsg !== 'getUserInfo:ok') {
      //   if (e.detail.errMsg === 'getUserInfo:fail auth deny') {
      //     return false;
      //   }
      //   _index2.default.showToast({
      //     title: '微信登录失败'
      //   });
      //   return false;
      // }
      util._login().then(function (res) {
        console.log(res)
        if (res.authCode) {
          my.httpRequest({
            url: api.AuthLoginByAlipay, // 该url是自己的服务地址，实现的功能是服务端拿到authcode去开放平台进行token验证
            data: {
              authcode: res.authCode
            },
            success: (res) => {
              // 授权成功并且服务器端登录成功
              console.log(res.data.result)
              if (res.status === 200 && res.data.msg === 'success' ) {
                _index2.default.setStorageSync('userId', res.data.result.userId);
                _index2.default.setStorageSync('token', res.data.result.accessToken);
                my.getAuthUserInfo({
                  success: (userInfo) => {
                    console.log(userInfo)
                    // 设置用户信息
                    _this.setData({
                      userInfo: userInfo,
                      showLoginDialog: false
                    });
                    app.globalData.userInfo = userInfo;
                    app.globalData.token = res.data.result.accessToken;
                    _index2.default.setStorageSync('userInfo', JSON.stringify(userInfo));
                  }
                });
              } else {
                _index2.default.showToast({
                  title: '登录失败:网络失败'
                });
                return false;
              }
            },
            fail: (err) => {
              // 根据自己的业务场景来进行错误处理
              console.log(err)
              _index2.default.showToast({
                title: '登录失败'
              });
              return false;
            },
          })
        } else {
          _index2.default.showToast({
            title: '授权失败'
          })
        }
      }).catch(function (err) {
        console.log(err);
         _index2.default.showToast({
          title: '授权失败'
        })
      });
    },  _this.onOrderInfoClick = function (event) {
      _index2.default.navigateTo({
        url: '/pages/ucenter/order/order'
      });
    }, _this.callPhone = function() {
        my.makePhoneCall({ number: '02037268390' });
    },_this.onSectionItemClick = function (event) {}, _this.exitLogin = function () {
      _index2.default.showModal({
        title: '',
        confirmColor: '#b4282d',
        content: '退出登录？',
        success: function success(res) {
          if (res.confirm) {
            _index2.default.removeStorageSync('token');
            _index2.default.removeStorageSync('userInfo');
            _index2.default.switchTab({
              url: '/pages/index/index'
            });
          }
        }
      });
    }, _this.config = {
      navigationBarBackgroundColor: '#333',
      navigationBarTitleText: '我的',
      navigationBarTextStyle: 'white',
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
    value: function componentDidMount() {}
  }, {
    key: "componentDidShow",
    value: function componentDidShow() {
      let userInfo = typeof _index2.default.getStorageSync('userInfo') == 'string' ?  JSON.parse(_index2.default.getStorageSync('userInfo')) : _index2.default.getStorageSync('userInfo')
      this.setData({
        userInfo: userInfo ? userInfo : app.globalData.userInfo
      });
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
          userInfo = _state.userInfo,
          showLoginDialog = _state.showLoginDialog;

      var anonymousState__temp = "/static/images/address_right.png";
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp
      });
      return this.__state;
    }
  }]);

  return _C;
}(_index2.default.Component), _class2.$$events = ["onUserInfoClick", "onCloseLoginDialog", "onDialogBody", "onWechatLogin", "onAlipayLogin", "callPhone"], _temp2)) || _class);

exports.default = _C;

Page(require('../../../npm/_tarojs/taro-alipay/index.js').default.createComponent(_C, true));