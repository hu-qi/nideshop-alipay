'use strict';

var _index = require('../npm/_tarojs/taro-alipay/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 用户相关服务
 */

var util = require('../utils/util.js');
var api = require('../config/api.js');

/**
 * 调用微信登录
 */
function loginByWeixin() {
  var code = null;
  return new Promise(function (resolve, reject) {
    return util.login().then(function (res) {
      code = res.code;
      return util.getUserInfo();
    }).then(function (userInfo) {
      //登录远程服务器
      util.request(api.AuthLoginByWeixin, { code: code, userInfo: userInfo }, 'POST').then(function (res) {
        if (res.errno === 0) {
          //存储用户信息
          _index2.default.setStorageSync('userInfo', res.data.userInfo);
          _index2.default.setStorageSync('token', res.data.token);

          resolve(res);
        } else {
          reject(res);
        }
      }).catch(function (err) {
        reject(err);
      });
    }).catch(function (err) {
      reject(err);
    });
  });
}

/**
 * 判断用户是否登录
 */
function checkLogin() {
  return new Promise(function (resolve, reject) {
    if (_index2.default.getStorageSync('userInfo') && _index2.default.getStorageSync('token')) {
      util.checkSession().then(function () {
        resolve(true);
      }).catch(function () {
        reject(false);
      });
    } else {
      reject(false);
    }
  });
}

module.exports = {
  loginByWeixin: loginByWeixin,
  checkLogin: checkLogin
};