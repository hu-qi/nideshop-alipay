import { Block, View, Navigator, Image, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './order.scss'
var util = require('../../../utils/util.js')
var api = require('../../../config/api.js')

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    orderList: []
  }

  componentWillMount(options) {
    // 页面初始化 options为页面跳转所带来的参数

    this.getOrderList()
  }

  getOrderList = () => {
    let that = this
    util.request(api.OrderList).then(function(res) {
      if (res.errno === 0) {
        console.log(res.data)
        that.setData({
          orderList: res.data.data
        })
      }
    })
  }
  payOrder = () => {
    Taro.redirectTo({
      url: '/pages/pay/pay'
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
    const { orderList: orderList } = this.state
    return (
      <View className="container">
        <View className="orders">
          {orderList.map((item, index) => {
            return (
              <Navigator
                url={'../orderDetail/orderDetail?id=' + item.id}
                className="order"
                key={item.id}
              >
                <View className="h">
                  <View className="l">{'订单编号：' + item.order_sn}</View>
                  <View className="r">{item.order_status_text}</View>
                </View>
                {item.goodsList.map((gitem, index) => {
                  return (
                    <View className="goods" key={gitem.id}>
                      <View className="img">
                        <Image src={gitem.list_pic_url} />
                      </View>
                      <View className="info">
                        <Text className="name">{gitem.goods_name}</Text>
                        <Text className="number">
                          {'共' + gitem.number + '件商品'}
                        </Text>
                      </View>
                      <View className="status" />
                    </View>
                  )
                })}
                <View className="b">
                  <View className="l">{'实付：￥' + item.actual_price}</View>
                  <View className="r">
                    {item.handleOption.pay && (
                      <Button
                        className="btn"
                        data-order-index={index}
                        onClick={this.payOrder}
                      >
                        去付款
                      </Button>
                    )}
                  </View>
                </View>
              </Navigator>
            )
          })}
        </View>
      </View>
    )
  }
}

export default _C
