import {
  Block,
  View,
  Swiper,
  SwiperItem,
  Navigator,
  Image,
  Text,
  ScrollView
} from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'
const util = require('../../utils/util.js')
const api = require('../../config/api.js')
const user = require('../../services/user.js')

//获取应用实例
const app = Taro.getApp()

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    newGoods: [],
    hotGoods: [],
    topics: [],
    brands: [],
    floorGoods: [],
    banner: [],
    channel: []
  }
  onShareAppMessage = () => {
    return {
      title: 'NideShop',
      desc: '仿网易严选微信小程序商城',
      path: '/pages/index/index'
    }
  }
  getIndexData = () => {
    let that = this
    util.request(api.IndexUrl).then(function(res) {
      if (res.errno === 0) {
        that.setData({
          newGoods: res.data.newGoodsList,
          hotGoods: res.data.hotGoodsList,
          topics: res.data.topicList,
          brand: res.data.brandList,
          floorGoods: res.data.categoryList,
          banner: res.data.banner,
          channel: res.data.channel
        })
      }
    })
  }

  componentWillMount(options) {
    this.getIndexData()
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
    const {
      banner: banner,
      channel: channel,
      brand: brand,
      newGoods: newGoods,
      hotGoods: hotGoods,
      topics: topics,
      floorGoods: floorGoods
    } = this.state
    return (
      <Block>
        {/* index.wxml */}
        <View className="container">
          <Swiper
            className="banner"
            indicatorDots="true"
            autoplay="true"
            interval="3000"
            duration="1000"
          >
            {banner.map((item, index) => {
              return (
                <SwiperItem key={item.id}>
                  <Navigator url={item.link}>
                    <Image src={item.image_url} backgroundSize="cover" />
                  </Navigator>
                </SwiperItem>
              )
            })}
          </Swiper>
          <View className="m-menu">
            {channel.map((item, index) => {
              return (
                <Navigator className="item" url={item.url} key={item.id}>
                  <Image src={item.icon_url} backgroundSize="cover" />
                  <Text>{item.name}</Text>
                </Navigator>
              )
            })}
          </View>
          <View className="a-section a-brand">
            <View className="h">
              <Navigator url="../brand/brand">
                <Text className="txt">品牌制造商直供</Text>
              </Navigator>
            </View>
            <View className="b">
              {brand.map((item, index) => {
                return (
                  <View className="item item-1" key="item.id">
                    <Navigator
                      url={'/pages/brandDetail/brandDetail?id=' + item.id}
                    >
                      <View className="wrap">
                        <Image
                          className="img"
                          src={item.new_pic_url}
                          mode="aspectFill"
                        />
                        <View className="mt">
                          <Text className="brand">{item.name}</Text>
                          <Text className="price">{item.floor_price}</Text>
                          <Text className="unit">元起</Text>
                        </View>
                      </View>
                    </Navigator>
                  </View>
                )
              })}
            </View>
          </View>
          {newGoods.length > 0 && (
            <View className="a-section a-new">
              <View className="h">
                <View>
                  <Navigator url="../newGoods/newGoods">
                    <Text className="txt">周一周四 · 新品首发</Text>
                  </Navigator>
                </View>
              </View>
              <View className="b">
                {newGoods.map((item, index) => {
                  return (
                    <View className="item" key={item.id}>
                      <Navigator url={'../goods/goods?id=' + item.id}>
                        <Image
                          className="img"
                          src={item.list_pic_url}
                          backgroundSize="cover"
                        />
                        <Text className="name">{item.name}</Text>
                        <Text className="price">
                          {'￥' + item.retail_price}
                        </Text>
                      </Navigator>
                    </View>
                  )
                })}
              </View>
            </View>
          )}
          {hotGoods.length > 0 && (
            <View className="a-section a-popular">
              <View className="h">
                <View>
                  <Navigator url="../hotGoods/hotGoods">
                    <Text className="txt">人气推荐</Text>
                  </Navigator>
                </View>
              </View>
              <View className="b">
                {hotGoods.map((item, index) => {
                  return (
                    <View className="item" key={item.id}>
                      <Navigator url={'/pages/goods/goods?id=' + item.id}>
                        <Image
                          className="img"
                          src={item.list_pic_url}
                          backgroundSize="cover"
                        />
                        <View className="right">
                          <View className="text">
                            <Text className="name">{item.name}</Text>
                            <Text className="desc">{item.goods_brief}</Text>
                            <Text className="price">
                              {'￥' + item.retail_price}
                            </Text>
                          </View>
                        </View>
                      </Navigator>
                    </View>
                  )
                })}
              </View>
            </View>
          )}
          {topics.length > 0 && (
            <View className="a-section a-topic">
              <View className="h">
                <View>
                  <Navigator url="../topic/topic" openType="switchTab">
                    <Text className="txt">专题精选</Text>
                  </Navigator>
                </View>
              </View>
              <View className="b">
                <ScrollView scrollX="true" className="list">
                  {topics.map((item, index) => {
                    return (
                      <View className="item" key={item.id}>
                        <Navigator
                          url={'../topicDetail/topicDetail?id=' + item.id}
                        >
                          <Image
                            className="img"
                            src={item.scene_pic_url}
                            backgroundSize="cover"
                          />
                          <View className="np">
                            <Text className="name">{item.title}</Text>
                            <Text className="price">
                              {'￥' + item.price_info + '元起'}
                            </Text>
                          </View>
                          <Text className="desc">{item.subtitle}</Text>
                        </Navigator>
                      </View>
                    )
                  })}
                </ScrollView>
              </View>
            </View>
          )}
          {floorGoods.map((item, index) => {
            return (
              <View className="good-grid" key={item.id}>
                <View className="h">
                  <View>
                    <Text>{item.name}</Text>
                  </View>
                </View>
                <View className="b">
                  {item.goodsList.map((iitem, iindex) => {
                    return (
                      <Block key={iitem.id}>
                        <View
                          className={
                            'item ' + (iindex % 2 == 0 ? '' : 'item-b')
                          }
                        >
                          <Navigator
                            url={'../goods/goods?id=' + iitem.id}
                            className="a"
                          >
                            <Image
                              className="img"
                              src={iitem.list_pic_url}
                              backgroundSize="cover"
                            />
                            <Text className="name">{iitem.name}</Text>
                            <Text className="price">
                              {'￥' + iitem.retail_price}
                            </Text>
                          </Navigator>
                        </View>
                      </Block>
                    )
                  })}
                  <View className="item item-b item-more">
                    <Navigator
                      url={'/pages/category/category?id=' + item.id}
                      className="more-a"
                    >
                      <View className="txt">{'更多' + item.name + '好物'}</View>
                      <Image
                        className="icon"
                        src={require('../../static/images/icon_go_more.png')}
                        backgroundSize="cover"
                      />
                    </Navigator>
                  </View>
                </View>
              </View>
            )
          })}
        </View>
      </Block>
    )
  }
}

export default _C
