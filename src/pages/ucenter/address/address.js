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
        '/pages/ucenter/addressAdd/addressAdd?id=' +
        event.currentTarget.dataset.addressId
    })
  }
  deleteAddress = event => {
    console.log(event.target)
    let that = this
    Taro.showModal({
      title: '',
      content: '确定要删除地址？',
      success: function(res) {
        if (res.confirm) {
          let addressId = event.target.dataset.addressId
          util
            .request(api.AddressDelete, { id: addressId }, 'POST')
            .then(function(res) {
              if (res.errno === 0) {
                that.getAddressList()
              }
            })
          console.log('用户点击确定')
        }
      }
    })
    return false
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
                  onClick={this.addressAddOrUpdate}
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
                      onClick={this.deleteAddress}
                      data-address-id={item.id}
                      className="del"
                      src={require('../../../static/images/del-address.png')}
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
