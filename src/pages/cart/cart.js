import { Block, View, Image, Text, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './cart.scss'
var util = require('../../utils/util.js')
var api = require('../../config/api.js')

var app = Taro.getApp()

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    cartGoods: [],
    cartTotal: {
      goodsCount: 0,
      goodsAmount: 0.0,
      checkedGoodsCount: 0,
      checkedGoodsAmount: 0.0
    },
    isEditCart: false,
    checkedAllStatus: true,
    editCartList: []
  }

  componentWillMount(options) {
    // 页面初始化 options为页面跳转所带来的参数
  }

  componentDidMount() {
    // 页面渲染完成
  }

  componentDidShow() {
    // 页面显示
    this.getCartList()
  }

  componentDidHide() {
    // 页面隐藏
  }

  componentWillUnmount() {
    // 页面关闭
  }

  getCartList = () => {
    let that = this
    util.request(api.CartList).then(function(res) {
      if (res.errno === 0) {
        console.log(res.data)
        that.setData({
          cartGoods: res.data.cartList,
          cartTotal: res.data.cartTotal
        })
      }

      that.setData({
        checkedAllStatus: that.isCheckedAll()
      })
    })
  }
  isCheckedAll = () => {
    //判断购物车商品已全选
    return this.data.cartGoods.every(function(element, index, array) {
      if (element.checked == true) {
        return true
      } else {
        return false
      }
    })
  }
  checkedItem = event => {
    let itemIndex = event.target.dataset.itemIndex
    let that = this

    if (!this.data.isEditCart) {
      util
        .request(
          api.CartChecked,
          {
            productIds: that.data.cartGoods[itemIndex].product_id,
            isChecked: that.data.cartGoods[itemIndex].checked ? 0 : 1
          },
          'POST'
        )
        .then(function(res) {
          if (res.errno === 0) {
            console.log(res.data)
            that.setData({
              cartGoods: res.data.cartList,
              cartTotal: res.data.cartTotal
            })
          }

          that.setData({
            checkedAllStatus: that.isCheckedAll()
          })
        })
    } else {
      //编辑状态
      let tmpCartData = this.data.cartGoods.map(function(
        element,
        index,
        array
      ) {
        if (index == itemIndex) {
          element.checked = !element.checked
        }

        return element
      })

      that.setData({
        cartGoods: tmpCartData,
        checkedAllStatus: that.isCheckedAll(),
        'cartTotal.checkedGoodsCount': that.getCheckedGoodsCount()
      })
    }
  }
  getCheckedGoodsCount = () => {
    let checkedGoodsCount = 0
    this.data.cartGoods.forEach(function(v) {
      if (v.checked === true) {
        checkedGoodsCount += v.number
      }
    })
    console.log(checkedGoodsCount)
    return checkedGoodsCount
  }
  checkedAll = () => {
    let that = this

    if (!this.data.isEditCart) {
      var productIds = this.data.cartGoods.map(function(v) {
        return v.product_id
      })
      util
        .request(
          api.CartChecked,
          {
            productIds: productIds.join(','),
            isChecked: that.isCheckedAll() ? 0 : 1
          },
          'POST'
        )
        .then(function(res) {
          if (res.errno === 0) {
            console.log(res.data)
            that.setData({
              cartGoods: res.data.cartList,
              cartTotal: res.data.cartTotal
            })
          }

          that.setData({
            checkedAllStatus: that.isCheckedAll()
          })
        })
    } else {
      //编辑状态
      let checkedAllStatus = that.isCheckedAll()
      let tmpCartData = this.data.cartGoods.map(function(v) {
        v.checked = !checkedAllStatus
        return v
      })

      that.setData({
        cartGoods: tmpCartData,
        checkedAllStatus: that.isCheckedAll(),
        'cartTotal.checkedGoodsCount': that.getCheckedGoodsCount()
      })
    }
  }
  editCart = () => {
    var that = this
    if (this.data.isEditCart) {
      this.getCartList()
      this.setData({
        isEditCart: !this.data.isEditCart
      })
    } else {
      //编辑状态
      let tmpCartList = this.data.cartGoods.map(function(v) {
        v.checked = false
        return v
      })
      this.setData({
        editCartList: this.data.cartGoods,
        cartGoods: tmpCartList,
        isEditCart: !this.data.isEditCart,
        checkedAllStatus: that.isCheckedAll(),
        'cartTotal.checkedGoodsCount': that.getCheckedGoodsCount()
      })
    }
  }
  updateCart = (productId, goodsId, number, id) => {
    let that = this

    util
      .request(
        api.CartUpdate,
        {
          productId: productId,
          goodsId: goodsId,
          number: number,
          id: id
        },
        'POST'
      )
      .then(function(res) {
        if (res.errno === 0) {
          console.log(res.data)
          that.setData({
            //cartGoods: res.data.cartList,
            //cartTotal: res.data.cartTotal
          })
        }

        that.setData({
          checkedAllStatus: that.isCheckedAll()
        })
      })
  }
  cutNumber = event => {
    let itemIndex = event.target.dataset.itemIndex
    let cartItem = this.data.cartGoods[itemIndex]
    let number = cartItem.number - 1 > 1 ? cartItem.number - 1 : 1
    cartItem.number = number
    this.setData({
      cartGoods: this.data.cartGoods
    })
    this.updateCart(cartItem.product_id, cartItem.goods_id, number, cartItem.id)
  }
  addNumber = event => {
    let itemIndex = event.target.dataset.itemIndex
    let cartItem = this.data.cartGoods[itemIndex]
    let number = cartItem.number + 1
    cartItem.number = number
    this.setData({
      cartGoods: this.data.cartGoods
    })
    this.updateCart(cartItem.product_id, cartItem.goods_id, number, cartItem.id)
  }
  checkoutOrder = () => {
    //获取已选择的商品
    let that = this

    var checkedGoods = this.data.cartGoods.filter(function(
      element,
      index,
      array
    ) {
      if (element.checked == true) {
        return true
      } else {
        return false
      }
    })

    if (checkedGoods.length <= 0) {
      return false
    }

    Taro.navigateTo({
      url: '../shopping/checkout/checkout'
    })
  }
  deleteCart = () => {
    //获取已选择的商品
    let that = this

    let productIds = this.data.cartGoods.filter(function(
      element,
      index,
      array
    ) {
      if (element.checked == true) {
        return true
      } else {
        return false
      }
    })

    if (productIds.length <= 0) {
      return false
    }

    productIds = productIds.map(function(element, index, array) {
      if (element.checked == true) {
        return element.product_id
      }
    })

    util
      .request(
        api.CartDelete,
        {
          productIds: productIds.join(',')
        },
        'POST'
      )
      .then(function(res) {
        if (res.errno === 0) {
          console.log(res.data)
          let cartList = res.data.cartList.map(v => {
            console.log(v)
            v.checked = false
            return v
          })

          that.setData({
            cartGoods: cartList,
            cartTotal: res.data.cartTotal
          })
        }

        that.setData({
          checkedAllStatus: that.isCheckedAll()
        })
      })
  }
  config = {
    backgroundColor: '#f4f4f4'
  }

  render() {
    const {
      cartGoods: cartGoods,
      isEditCart: isEditCart,
      checkedAllStatus: checkedAllStatus,
      cartTotal: cartTotal
    } = this.state
    return (
      <View className="container">
        <View className="service-policy">
          <View className="item">30天无忧退货</View>
          <View className="item">48小时快速退款</View>
          <View className="item">满88元免邮费</View>
        </View>
        {cartGoods.length <= 0 && (
          <View className="no-cart">
            <View className="c">
              <Image src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/noCart-a8fe3f12e5.png" />
              <Text>去添加点什么吧</Text>
            </View>
          </View>
        )}
        {cartGoods.length > 0 && (
          <View className="cart-view">
            <View className="list">
              <View className="group-item">
                <View className="goods">
                  {cartGoods.map((item, index) => {
                    return (
                      <View
                        className={'item ' + (isEditCart ? 'edit' : '')}
                        key={item.id}
                      >
                        <View
                          className={
                            'checkbox ' + (item.checked ? 'checked' : '')
                          }
                          onClick={this.checkedItem}
                          data-item-index={index}
                        />
                        <View className="cart-goods">
                          <Image className="img" src={item.list_pic_url} />
                          <View className="info">
                            <View className="t">
                              <Text className="name">{item.goods_name}</Text>
                              <Text className="num">{'x' + item.number}</Text>
                            </View>
                            <View className="attr">
                              {(isEditCart ? '已选择:' : '') +
                                item.goods_specifition_name_value}
                            </View>
                            <View className="b">
                              <Text className="price">
                                {'￥' + item.retail_price}
                              </Text>
                              <View className="selnum">
                                <View
                                  className="cut"
                                  onClick={this.cutNumber}
                                  data-item-index={index}
                                >
                                  -
                                </View>
                                <Input
                                  value={item.number}
                                  className="number"
                                  disabled="true"
                                  type="number"
                                />
                                <View
                                  className="add"
                                  onClick={this.addNumber}
                                  data-item-index={index}
                                >
                                  +
                                </View>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    )
                  })}
                </View>
              </View>
              {/* <view class="group-item">
                                                <view class="header">
                                                    <view class="promotion">
                                                        <text class="tag">满赠</text>
                                                        <text class="txt">再加26元, 3件赠1件蔓越莓干</text>
                                                        <image class="icon" src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/go-b67cb9718d.png"></image>
                                                    </view>
                                                    <view class="get">领赠品</view>                
                                                </view>
                                                <view class="goods">
                                                    <view class="item">
                                                        <view class="checkbox" ></view>
                                                        <view class="cart-goods">
                                                            <image class="img" src="http://yanxuan.nosdn.127.net/04e05e9de3a471b1f6479dd137b459a8.png"></image>
                                                            <view class="info">
                                                                <view class="t">
                                                                    <text class="name">秋冬保暖加厚细羊毛被</text>
                                                                    <text class="num">x1</text>
                                                                </view>
                                                                <view class="attr">220*240cm</view>
                                                                <view class="b">
                                                                    <text class="price">￥199.99</text>
                                                                    <view class="open">优惠活动</view>
                                                                </view>
                                                            </view>
                                                        </view>
                                                    </view>
                                                </view>
                                            </view> */}
            </View>
            <View className="cart-bottom">
              <View
                className={'checkbox ' + (checkedAllStatus ? 'checked' : '')}
                onClick={this.checkedAll}
              >
                {'全选(' + cartTotal.checkedGoodsCount + ')'}
              </View>
              <View className="total">
                {!isEditCart ? '￥' + cartTotal.checkedGoodsAmount : ''}
              </View>
              <View className="delete" onClick={this.editCart}>
                {!isEditCart ? '编辑' : '完成'}
              </View>
              {isEditCart && (
                <View className="checkout" onClick={this.deleteCart}>
                  删除所选
                </View>
              )}
              {!isEditCart && (
                <View className="checkout" onClick={this.checkoutOrder}>
                  下单
                </View>
              )}
            </View>
          </View>
        )}
      </View>
    )
  }
}

export default _C
