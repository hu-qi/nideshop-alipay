import { Block, View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './pay.scss'
var app = Taro.getApp()
var util = require('../../utils/util.js')
var api = require('../../config/api.js')

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    orderId: 0,
    actualPrice: 0.0
  }

  componentWillMount(options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      orderId: options.orderId,
      actualPrice: options.actualPrice
    })
  }

  componentDidMount() {}

  componentDidShow() {
    // 页面显示
  }

  componentDidHide() {
    // 页面隐藏
  }

  componentWillUnmount() {
    // 页面关闭
  }

  requestPayParam = () => {
    let that = this
    util
      .request(api.PayPrepayId, { orderId: that.data.orderId, payType: 1 })
      .then(function(res) {
        if (res.errno === 0) {
          let payParam = res.data
          Taro.requestPayment({
            timeStamp: payParam.timeStamp,
            nonceStr: payParam.timeStamp,
            package: payParam.nonceStr,
            signType: payParam.signType,
            paySign: payParam.paySign,
            success: function(res) {
              Taro.redirectTo({
                url: '/pages/payResult/payResult?status=true'
              })
            },
            fail: function(res) {
              Taro.redirectTo({
                url: '/pages/payResult/payResult?status=false'
              })
            }
          })
        }
      })
  }
  startPay = () => {
    this.requestPayParam()
  }
  config = {
    navigationBarTitleText: '支付订单'
  }

  render() {
    const { actualPrice: actualPrice } = this.state
    return (
      <View className="container">
        <View className="total">
          <View className="label">订单金额</View>
          <View className="txt">{actualPrice + '元'}</View>
        </View>
        <View className="pay-list">
          <View className="h">请选择支付方式</View>
          <View className="b">
            {/* <view class="item">
                                                                                                                                                                                                                                                           <view class="checkbox checked"></view>
                                                                                                                                                                                                                                                           <view class="icon-alipay"></view>
                                                                                                                                                                                                                                                           <view class="name">支付宝</view>
                                                                                                                                                                                                                                                       </view>
                                                                                                                                                                                                                                                       <view class="item">
                                                                                                                                                                                                                                                           <view class="checkbox"></view>
                                                                                                                                                                                                                                                           <view class="icon-net"></view>
                                                                                                                                                                                                                                                           <view class="name">网易支付</view>
                                                                                                                                                                                                                                                       </view> */}
            <View className="item">
              <View className="checkbox checked" />
              <Image
                src={require('../../static/images/wxpay.png')}
                className="icon"
              />
              <View className="name">微信支付</View>
            </View>
          </View>
        </View>
        <View className="tips">
          小程序只支持微信支付，如需其它支付方式，请在网页版支付
        </View>
        <View className="pay-btn" onClick={this.startPay}>
          确定
        </View>
      </View>
    )
  }
}

export default _C
