import { Block, View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './checkout.scss'
var util = require('../../../utils/util.js')
var api = require('../../../config/api.js')
const pay = require('../../../services/pay.js')

var app = Taro.getApp()

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    checkedGoodsList: [],
    checkedAddress: {},
    checkedCoupon: [],
    couponList: [],
    goodsTotalPrice: 0.0, //商品总价
    freightPrice: 0.0, //快递费
    couponPrice: 0.0, //优惠券的价格
    orderTotalPrice: 0.0, //订单总价
    actualPrice: 0.0, //实际需要支付的总价
    addressId: 0,
    couponId: 0
  }

  componentWillMount(options) {
    // 页面初始化 options为页面跳转所带来的参数

    try {
      var addressId = Taro.getStorageSync('addressId')
      if (addressId) {
        this.setData({
          addressId: addressId
        })
      }

      var couponId = Taro.getStorageSync('couponId')
      if (couponId) {
        this.setData({
          couponId: couponId
        })
      }
    } catch (e) {
      // Do something when catch error
    }
  }

  getCheckoutInfo = () => {
    let that = this
    util
      .request(api.CartCheckout, {
        addressId: that.data.addressId,
        couponId: that.data.couponId
      })
      .then(function(res) {
        if (res.errno === 0) {
          console.log(res.data)
          that.setData({
            checkedGoodsList: res.data.checkedGoodsList,
            checkedAddress: res.data.checkedAddress,
            actualPrice: res.data.actualPrice,
            checkedCoupon: res.data.checkedCoupon,
            couponList: res.data.couponList,
            couponPrice: res.data.couponPrice,
            freightPrice: res.data.freightPrice,
            goodsTotalPrice: res.data.goodsTotalPrice,
            orderTotalPrice: res.data.orderTotalPrice
          })
        }
        Taro.hideLoading()
      })
  }
  selectAddress = () => {
    Taro.navigateTo({
      url: '/pages/shopping/address/address'
    })
  }
  addAddress = () => {
    Taro.navigateTo({
      url: '/pages/shopping/addressAdd/addressAdd'
    })
  }

  componentDidMount() {
    // 页面渲染完成
  }

  componentDidShow() {
    // 页面显示
    Taro.showLoading({
      title: '加载中...'
    })
    this.getCheckoutInfo()
  }

  componentDidHide() {
    // 页面隐藏
  }

  componentWillUnmount() {
    // 页面关闭
  }

  submitOrder = () => {
    if (this.data.addressId <= 0) {
      util.showErrorToast('请选择收货地址')
      return false
    }
    util
      .request(
        api.OrderSubmit,
        { addressId: this.data.addressId, couponId: this.data.couponId },
        'POST'
      )
      .then(res => {
        if (res.errno === 0) {
          const orderId = res.data.orderInfo.id
          pay
            .payOrder(parseInt(orderId))
            .then(res => {
              Taro.redirectTo({
                url: '/pages/payResult/payResult?status=1&orderId=' + orderId
              })
            })
            .catch(res => {
              Taro.redirectTo({
                url: '/pages/payResult/payResult?status=0&orderId=' + orderId
              })
            })
        } else {
          util.showErrorToast('下单失败')
        }
      })
  }
  config = {}

  render() {
    const {
      checkedAddress: checkedAddress,
      couponList: couponList,
      goodsTotalPrice: goodsTotalPrice,
      freightPrice: freightPrice,
      couponPrice: couponPrice,
      checkedGoodsList: checkedGoodsList,
      actualPrice: actualPrice
    } = this.state
    return (
      <View className="container">
        <View className="address-box">
          {checkedAddress.id > 0 && (
            <View className="address-item" onClick={this.selectAddress}>
              <View className="l">
                <Text className="name">{checkedAddress.name}</Text>
                {checkedAddress.is_default === 1 && (
                  <Text className="default">默认</Text>
                )}
              </View>
              <View className="m">
                <Text className="mobile">{checkedAddress.mobile}</Text>
                <Text className="address">
                  {checkedAddress.full_region + checkedAddress.address}
                </Text>
              </View>
              <View className="r">
                <Image
                  src={require('../../../static/images/address_right.png')}
                />
              </View>
            </View>
          )}
          {checkedAddress.id <= 0 && (
            <View
              className="address-item address-empty"
              onClick={this.addAddress}
            >
              <View className="m">还没有收货地址，去添加</View>
              <View className="r">
                <Image
                  src={require('../../../static/images/address_right.png')}
                />
              </View>
            </View>
          )}
        </View>
        <View className="coupon-box">
          <View className="coupon-item">
            <View className="l">
              <Text className="name">请选择优惠券</Text>
              <Text className="txt">{couponList.length + '张'}</Text>
            </View>
            <View className="r">
              <Image
                src={require('../../../static/images/address_right.png')}
              />
            </View>
          </View>
        </View>
        <View className="order-box">
          <View className="order-item">
            <View className="l">
              <Text className="name">商品合计</Text>
            </View>
            <View className="r">
              <Text className="txt">{'￥' + goodsTotalPrice}</Text>
            </View>
          </View>
          <View className="order-item">
            <View className="l">
              <Text className="name">运费</Text>
            </View>
            <View className="r">
              <Text className="txt">{'￥' + freightPrice}</Text>
            </View>
          </View>
          <View className="order-item no-border">
            <View className="l">
              <Text className="name">优惠券</Text>
            </View>
            <View className="r">
              <Text className="txt">{'-￥' + couponPrice}</Text>
            </View>
          </View>
        </View>
        <View className="goods-items">
          {checkedGoodsList.map((item, index) => {
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
                  <View className="m">{item.goods_specifition_name_value}</View>
                  <View className="b">{'￥' + item.retail_price}</View>
                </View>
              </View>
            )
          })}
        </View>
        <View className="order-total">
          <View className="l">{'实付：￥' + actualPrice}</View>
          <View className="r" onClick={this.submitOrder}>
            去付款
          </View>
        </View>
      </View>
    )
  }
}

export default _C
