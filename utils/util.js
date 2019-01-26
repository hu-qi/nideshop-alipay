'use strict';

var _index = require('../npm/_tarojs/taro-alipay/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) {console.log(obj); return obj && obj.__esModule ? obj : { default: obj }; }

var api = require('../config/api.js');

function formatTime(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}

function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
}

/**
 * 封封微信的的request
 */
function request(url) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';

  return new Promise(function (resolve, reject) {
    _index2.default.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/json',
        'X-Nideshop-Token': _index2.default.getStorageSync('token'),
        'X-Nideshop-UserId': _index2.default.getStorageSync('userId')
      },
      success: function success(res) {
        console.log('success');
        console.log(res)
        if (res.statusCode == 200) {
          if (res.data.errno == 401) {
            //需要登录后才可以操作
            
            var code = null;
            // return login().then(function (res) {
            //   code = res.code;
            //   return getUserInfo();
            // }).then(function (userInfo) {
            //   //登录远程服务器
            //   request(api.AuthLoginByWeixin, { code: code, userInfo: userInfo }, 'POST').then(function (res) {
            //     if (res.errno === 0) {
            //       //存储用户信息
            //       _index2.default.setStorageSync('userInfo', res.data.userInfo);
            //       _index2.default.setStorageSync('token', res.data.token);

            //       resolve(res);
            //     } else {
            //       reject(res);
            //     }
            //   }).catch(function (err) {
            //     reject(err);
            //   });
            // }).catch(function (err) {
            //   reject(err);
            // });
         return  _login().then((res) => {
           if (res.authCode) {
             // 认证成功
             // 调用自己的服务端接口，让服务端进行后端的授权认证，并且种session，需要解决跨域问题
             my.httpRequest({
               url: api.AuthLoginByAlipay, // 该url是自己的服务地址，实现的功能是服务端拿到authcode去开放平台进行token验证
               data: {
                 authcode: res.authCode
               },
               success: (res) => {
                 // 授权成功并且服务器端登录成功
                 console.log(res)
                 if (res.status === 200 && res.data.msg === 'success' ) {
                   _index2.default.setStorageSync('userId', res.data.result.userId);
                   _index2.default.setStorageSync('token', res.data.result.accessToken);
                   my.getAuthUserInfo({
                     success: (userInfo) => {
                       console.log(userInfo)
                       _index2.default.setStorageSync('userInfo', userInfo);
                        resolve(res.data);
                     }
                   });
                 }
               },
               fail: (err) => {
                 // 根据自己的业务场景来进行错误处理
                 console.log('err')
                 console.log(err)
               },
             });
           } else{
             reject(res);
           }
         }) 
        } else {
            resolve(res.data);
          }
        } else {
          reject(res.errMsg);
        }
      },
      fail: function fail(err) {
        reject(err);
        console.log('failed');
      }
    });
  });
}

function get(url) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return request(url, data, 'GET');
}

function post(url) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return request(url, data, 'POST');
}

/**
 * 检查微信会话是否过期
 */
function checkSession() {
  return new Promise(function (resolve, reject) {
    _index2.default.checkSession({
      success: function success() {
        resolve(true);
      },
      fail: function fail() {
        reject(false);
      }
    });
  });
}

/**
 * 调用微信登录
 */
function login() {
  return new Promise(function (resolve, reject) {
    _index2.default.login({
      success: function success(res) {
        if (res.code) {
          resolve(res.code);
        } else {
          reject(res);
        }
      },
      fail: function fail(err) {
        reject(err);
      }
    });
  });
}

/**
 * 调用支付宝登录
 */
function _login() {
  return new Promise(function (resolve, reject) {
     my.getAuthCode({
        scopes: 'auth_user', // 主动授权（弹框）：auth_user，静默授权（不弹框）：auth_base
        success: (res) => {
          if (res.authCode) {
            resolve(res);
          } else {
            reject(res);
          }
        },
        fail: (err) => {
          reject(err);
        }
     })
  });
}

function getUserInfo() {
  return new Promise(function (resolve, reject) {
    _index2.default.getUserInfo({
      withCredentials: true,
      success: function success(res) {
        if (res.detail.errMsg === 'getUserInfo:ok') {
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail: function fail(err) {
        reject(err);
      }
    });
  });
}

function redirect(url) {
  //判断页面是否需要登录
  {
    _index2.default.redirectTo({
      url: url
    });
  }
}

function showErrorToast(msg) {
  _index2.default.showToast({
    title: msg,
    image: '/static/images/icon_error.png'
  });
}

module.exports = {
  formatTime: formatTime,
  request: request,
  get: get,
  post: post,
  redirect: redirect,
  showErrorToast: showErrorToast,
  checkSession: checkSession,
  login: login,
  _login: _login,
  getUserInfo: getUserInfo
};