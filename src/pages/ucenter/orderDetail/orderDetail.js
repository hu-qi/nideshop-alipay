import { Block, View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './orderDetail.scss'
var util = require('../../../utils/util.js')
var api = require('../../../config/api.js')

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    orderId: 0,
    orderInfo: {},
    orderGoods: [],
    handleOption: {}
  }

  componentWillMount(options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      orderId: options.id
    })
    this.getOrderDetail()
  }

  getOrderDetail = () => {
    let that = this
    util
      .request(api.OrderDetail, {
        orderId: that.data.orderId
      })
      .then(function(res) {
        if (res.errno === 0) {
          console.log(res.data)
          that.setData({
            orderInfo: res.data.orderInfo,
            orderGoods: res.data.orderGoods,
            handleOption: res.data.handleOption
          })
          //that.payTimer();
        }
      })
  }
  payTimer = () => {
    let that = this
    let orderInfo = that.data.orderInfo

    setInterval(() => {
      console.log(orderInfo)
      orderInfo.add_time -= 1
      that.setData({
        orderInfo: orderInfo
      })
    }, 1000)
  }
  payOrder = () => {
    let that = this
    util
      .request(api.PayPrepayId, {
        orderId: that.data.orderId || 15
      })
      .then(function(res) {
        if (res.errno === 0) {
          const payParam = res.data
          Taro.requestPayment({
            timeStamp: payParam.timeStamp,
            nonceStr: payParam.nonceStr,
            package: payParam.package,
            signType: payParam.signType,
            paySign: payParam.paySign,
            success: function(res) {
              console.log(res)
            },
            fail: function(res) {
              console.log(res)
            }
          })
        }
      })
  }

  componentDidMount() {
    // 页面渲染完成
  }

  componentDidShow() {
    // 页面显示
  }

  componentDidHide() {
    // 页面隐藏
  }

  componentWillUnmount() {
    // 页面关闭
  }

  config = {}

  render() {
    const { orderInfo: orderInfo, orderGoods: orderGoods } = this.state
    return (
      <View className="container">
        <View className="order-info">
          <View className="item-a">{'下单时间：' + orderInfo.add_time}</View>
          <View className="item-b">{'订单编号：' + orderInfo.order_sn}</View>
          <View className="item-c">
            <View className="l">
              实付：
              <Text className="cost">{'￥' + orderInfo.actual_price}</Text>
            </View>
            <View className="r">
              <View className="btn" onClick={this.cancelOrder}>
                取消订单
              </View>
              <View className="btn active" onClick={this.payOrder}>
                去付款
              </View>
            </View>
          </View>
        </View>
        <View className="order-goods">
          <View className="h">
            <View className="label">商品信息</View>
            <View className="status">{orderInfo.order_status_text}</View>
          </View>
          <View className="goods">
            {orderGoods.map((item, index) => {
              return (
                <View className="item" key={item.id}>
                  <View className="img">
                    <Image src={item.list_pic_url} />
                  </View>
                  <View className="info">
                    <View className="t">
                      <Text className="name">{item.goods_name}</Text>
                      <Text className="number">{'x' + item.number}</Text>
                    </View>
                    <View className="attr">
                      {item.goods_specifition_name_value}
                    </View>
                    <View className="price">{'￥' + item.retail_price}</View>
                  </View>
                </View>
              )
            })}
          </View>
        </View>
        <View className="order-bottom">
          <View className="address">
            <View className="t">
              <Text className="name">{orderInfo.consignee}</Text>
              <Text className="mobile">{orderInfo.mobile}</Text>
            </View>
            <View className="b">
              {orderInfo.full_region + orderInfo.address}
            </View>
          </View>
          <View className="total">
            <View className="t">
              <Text className="label">商品合计：</Text>
              <Text className="txt">{'￥' + orderInfo.goods_price}</Text>
            </View>
            <View className="t">
              <Text className="label">运费：</Text>
              <Text className="txt">{'￥' + orderInfo.freight_price}</Text>
            </View>
          </View>
          <View className="pay-fee">
            <Text className="label">实付：</Text>
            <Text className="txt">{'￥' + orderInfo.actual_price}</Text>
          </View>
        </View>
      </View>
    )
  }
}

export default _C
