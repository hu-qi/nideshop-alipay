import { Block, View, Image, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './address.scss'
var util = require('../../../utils/util.js')
var api = require('../../../config/api.js')
var app = Taro.getApp()

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    addressList: []
  }

  componentWillMount(options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.getAddressList()
  }

  componentDidMount() {
    // 页面渲染完成
  }

  componentDidShow() {
    // 页面显示
  }

  getAddressList = () => {
    let that = this
    util.request(api.AddressList).then(function(res) {
      if (res.errno === 0) {
        that.setData({
          addressList: res.data
        })
      }
    })
  }
  addressAddOrUpdate = event => {
    console.log(event)
    Taro.navigateTo({
      url:
        '/pages/shopping/addressAdd/addressAdd?id=' +
        event.currentTarget.dataset.addressId
    })
  }
  selectAddress = event => {
    console.log(event.currentTarget.dataset.addressId)

    try {
      Taro.setStorageSync('addressId', event.currentTarget.dataset.addressId)
    } catch (e) {}

    //选择该收货地址
    Taro.redirectTo({
      url: '/pages/shopping/checkout/checkout'
    })
  }

  componentDidHide() {
    // 页面隐藏
  }

  componentWillUnmount() {
    // 页面关闭
  }

  config = {}

  render() {
    const { addressList: addressList } = this.state
    return (
      <View className="container">
        {addressList.length > 0 && (
          <View className="address-list">
            {addressList.map((item, index) => {
              return (
                <View
                  className="item"
                  key={item.id}
                  onClick={this.selectAddress}
                  data-address-id={item.id}
                >
                  <View className="l">
                    <View className="name">{item.name}</View>
                    {item.is_default && <View className="default">默认</View>}
                  </View>
                  <View className="c">
                    <View className="mobile">{item.mobile}</View>
                    <View className="address">
                      {item.full_region + item.address}
                    </View>
                  </View>
                  <View className="r">
                    <Image
                      onClick={this.addressAddOrUpdate}
                      data-address-id={item.id}
                      className="del"
                      src="http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/address-edit-7fee7b0d63.png"
                    />
                  </View>
                </View>
              )
            })}
          </View>
        )}
        {addressList.length <= 0 && (
          <View className="empty-view">
            <Image
              className="icon"
              src="http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/noAddress-26d570cefa.png"
            />
            <Text className="text">收货地址在哪里</Text>
          </View>
        )}
        <View
          className="add-address"
          onClick={this.addressAddOrUpdate}
          data-address-id="0"
        >
          新建
        </View>
      </View>
    )
  }
}

export default _C
