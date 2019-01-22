import { Block, View, Image, Text, Navigator } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './brandDetail.scss'
var util = require('../../utils/util.js')
var api = require('../../config/api.js')

var app = Taro.getApp()

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    id: 0,
    brand: {},
    goodsList: [],
    page: 1,
    size: 1000
  }

  componentWillMount(options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    that.setData({
      id: parseInt(options.id)
    })
    this.getBrand()
  }

  getBrand = () => {
    let that = this
    util.request(api.BrandDetail, { id: that.data.id }).then(function(res) {
      if (res.errno === 0) {
        that.setData({
          brand: res.data.brand
        })

        that.getGoodsList()
      }
    })
  }
  getGoodsList = () => {
    var that = this

    util
      .request(api.GoodsList, {
        brandId: that.data.id,
        page: that.data.page,
        size: that.data.size
      })
      .then(function(res) {
        if (res.errno === 0) {
          that.setData({
            goodsList: res.data.goodsList
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
    const { brand: brand, goodsList: goodsList } = this.state
    return (
      <View className="container">
        <View className="brand-info">
          <View className="name">
            <Image
              className="img"
              src={brand.app_list_pic_url}
              backgroundSize="cover"
            />
            <View className="info-box">
              <View className="info">
                <Text className="txt">{brand.name}</Text>
                <Text className="line" />
              </View>
            </View>
          </View>
          <View className="desc">{brand.simple_desc}</View>
        </View>
        <View className="cate-item">
          <View className="b">
            {goodsList.map((iitem, iindex) => {
              return (
                <Block>
                  <Navigator
                    className={'item ' + (iindex % 2 == 0 ? 'item-b' : '')}
                    url={'../goods/goods?id=' + iitem.id}
                  >
                    <Image
                      className="img"
                      src={iitem.list_pic_url}
                      backgroundSize="cover"
                    />
                    <Text className="name">{iitem.name}</Text>
                    <Text className="price">{'￥' + iitem.retail_price}</Text>
                  </Navigator>
                </Block>
              )
            })}
          </View>
        </View>
      </View>
    )
  }
}

export default _C
