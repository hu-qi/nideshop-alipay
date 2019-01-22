import { Block, View, Navigator, Image, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './brand.scss'
var util = require('../../utils/util.js')
var api = require('../../config/api.js')
var app = Taro.getApp()

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    brandList: [],
    page: 1,
    size: 10,
    totalPages: 1
  }

  componentWillMount(options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.getBrandList()
  }

  getBrandList = () => {
    Taro.showLoading({
      title: '加载中...'
    })
    let that = this
    util
      .request(api.BrandList, { page: that.data.page, size: that.data.size })
      .then(function(res) {
        if (res.errno === 0) {
          that.setData({
            brandList: that.data.brandList.concat(res.data.data),
            totalPages: res.data.totalPages
          })
        }
        Taro.hideLoading()
      })
  }
  onReachBottom = () => {
    if (this.data.totalPages > this.data.page) {
      this.setData({
        page: this.data.page + 1
      })
    } else {
      return false
    }

    this.getBrandList()
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

  config = {}

  render() {
    const { brandList: brandList } = this.state
    return (
      <View className="container">
        <View className="brand-list">
          {brandList.map((item, index) => {
            return (
              <Navigator
                url={'../brandDetail/brandDetail?id=' + item.id}
                className="item"
                key="id"
              >
                <View className="img-bg">
                  <Image src={item.app_list_pic_url} backgroundSize="cover" />
                </View>
                <View className="txt-box">
                  <View className="line">
                    <Text className="name">{item.name}</Text>
                    <Text className="s">|</Text>
                    <Text className="price">{item.floor_price + '元起'}</Text>
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
