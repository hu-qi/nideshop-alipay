import { Block, View, Navigator, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './payResult.scss'
var util = require('../../utils/util.js')
var api = require('../../config/api.js')
const pay = require('../../services/pay.js')

var app = Taro.getApp()

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    status: false,
    orderId: 0
  }

  componentWillMount(options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      orderId: options.orderId || 24,
      status: options.status
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

  payOrder = () => {
    pay
      .payOrder(parseInt(this.data.orderId))
      .then(res => {
        this.setData({
          status: true
        })
      })
      .catch(res => {
        util.showErrorToast('支付失败')
      })
  }
  config = {
    navigationBarTitleText: '付款结果',
    navigationBarBackgroundColor: '#fafafa'
  }

  render() {
    const { status: status } = this.state
    return (
      <View className="container">
        <View className="pay-result">
          {status == true && (
            <View className="success">
              <View className="msg">付款成功</View>
              <View className="btns">
                <Navigator
                  className="btn"
                  url="/pages/ucenter/order/order"
                  openType="redirect"
                >
                  查看订单
                </Navigator>
                <Navigator
                  className="btn"
                  url="/pages/index/index"
                  openType="switchTab"
                >
                  继续逛
                </Navigator>
              </View>
            </View>
          )}
          {status != true && (
            <View className="error">
              <View className="msg">付款失败</View>
              <View className="tips">
                <View className="p">
                  请在<Text className="time">1小时</Text>内完成付款
                </View>
                <View className="p">否则订单将会被系统取消</View>
              </View>
              <View className="btns">
                <Navigator
                  className="btn"
                  url="/pages/ucenter/order/order"
                  openType="redirect"
                >
                  查看订单
                </Navigator>
                <View className="btn" onClick={this.payOrder}>
                  重新付款
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    )
  }
}

export default _C
