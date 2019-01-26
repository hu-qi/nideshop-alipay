'use strict';

var _index = require('../npm/_tarojs/taro-alipay/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 支付相关服务
 */

var util = require('../utils/util.js');
var api = require('../config/api.js');

/**
 * 判断用户是否登录
 */
function payOrder(orderId) {
  return new Promise(function (resolve, reject) {
    util.request(api.PayPrepayId, {
      orderId: orderId
    }).then(function (res) {
      console.log(res);
      if (res.errno === 0) {
        var tradeNo = res.data.tradeNo;
          if (tradeNo) {
            my.tradePay({
              tradeNO: tradeNo,  
              success: function(res) {
                // console.log('支付成功')
                // console.log(res)
                // my.alert({
                //   content: JSON.stringify(res),
                // });
                resolve(res);
              },
              fail: function(res) {
                console.log('支付失败')
                // my.alert({
                //   content: JSON.stringify(res),
                // });
                reject(res);
              },
            });
          } else{
            if(res.data.code == '40004'){
              util.request(api.UpdatedPay, {
              orderId: parseInt(orderId),
              payStatus: 1
              }).then(res => {
                console.log(res)
                resolve({resultCode: '9000'});
              }).catch(err => {
                console.log(err)
                resolve({resultCode: '9000'});
              })
            } else {
              reject(res)
            }
          }
      } else {
        reject(res);
      }
    });
  });
}

module.exports = {
  payOrder: payOrder
};