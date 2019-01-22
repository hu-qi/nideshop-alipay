import {
  Block,
  View,
  ScrollView,
  Text,
  Navigator,
  Image
} from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './category.scss'
var util = require('../../utils/util.js')
var api = require('../../config/api.js')

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    // text:"这是一个页面"
    navList: [],
    goodsList: [],
    id: 0,
    currentCategory: {},
    scrollLeft: 0,
    scrollTop: 0,
    scrollHeight: 0,
    page: 1,
    size: 10000
  }

  componentWillMount(options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    if (options.id) {
      that.setData({
        id: parseInt(options.id)
      })
    }

    Taro.getSystemInfo({
      success: function(res) {
        that.setData({
          scrollHeight: res.windowHeight
        })
      }
    })

    this.getCategoryInfo()
  }

  getCategoryInfo = () => {
    let that = this
    util.request(api.GoodsCategory, { id: this.data.id }).then(function(res) {
      if (res.errno == 0) {
        that.setData({
          navList: res.data.brotherCategory,
          currentCategory: res.data.currentCategory
        })

        //nav位置
        let currentIndex = 0
        let navListCount = that.data.navList.length
        for (let i = 0; i < navListCount; i++) {
          currentIndex += 1
          if (that.data.navList[i].id == that.data.id) {
            break
          }
        }
        if (currentIndex > navListCount / 2 && navListCount > 5) {
          that.setData({
            scrollLeft: currentIndex * 60
          })
        }
        that.getGoodsList()
      } else {
        //显示错误信息
      }
    })
  }

  componentDidMount() {
    // 页面渲染完成
  }

  componentDidShow() {
    // 页面显示
    console.log(1)
  }

  componentDidHide() {
    // 页面隐藏
  }

  getGoodsList = () => {
    var that = this

    util
      .request(api.GoodsList, {
        categoryId: that.data.id,
        page: that.data.page,
        size: that.data.size
      })
      .then(function(res) {
        that.setData({
          goodsList: res.data.goodsList
        })
      })
  }

  componentWillUnmount() {
    // 页面关闭
  }

  switchCate = event => {
    if (this.data.id == event.currentTarget.dataset.id) {
      return false
    }
    var that = this
    var clientX = event.detail.x
    var currentTarget = event.currentTarget
    if (clientX < 60) {
      that.setData({
        scrollLeft: currentTarget.offsetLeft - 60
      })
    } else if (clientX > 330) {
      that.setData({
        scrollLeft: currentTarget.offsetLeft
      })
    }
    this.setData({
      id: event.currentTarget.dataset.id
    })

    this.getCategoryInfo()
  }
  config = {}

  render() {
    const {
      scrollLeft: scrollLeft,
      navList: navList,
      id: id,
      scrollTop: scrollTop,
      scrollHeight: scrollHeight,
      currentCategory: currentCategory,
      goodsList: goodsList
    } = this.state
    return (
      <View className="container">
        <View className="cate-nav">
          <ScrollView
            scrollX="true"
            className="cate-nav-body"
            style="width: 750rpx;"
            scrollLeft={scrollLeft}
          >
            {navList.map((item, index) => {
              return (
                <View
                  className={'item ' + (id == item.id ? 'active' : '')}
                  data-id={item.id}
                  data-index={index}
                  onClick={this.switchCate}
                >
                  <View className="name">{item.name}</View>
                </View>
              )
            })}
          </ScrollView>
        </View>
        <ScrollView
          scrollY="true"
          scrollTop={scrollTop}
          style={'height:' + scrollHeight + ';'}
        >
          <View className="cate-item">
            <View className="h">
              <Text className="name">{currentCategory.name}</Text>
              <Text className="desc">{currentCategory.front_name}</Text>
            </View>
            <View className="b">
              {goodsList.map((iitem, iindex) => {
                return (
                  <Navigator
                    className={
                      'item ' + ((iindex + 1) % 2 == 0 ? 'item-b' : '')
                    }
                    url={'/pages/goods/goods?id=' + iitem.id}
                  >
                    <Image
                      className="img"
                      src={iitem.list_pic_url}
                      backgroundSize="cover"
                    />
                    <Text className="name">{iitem.name}</Text>
                    <Text className="price">{'￥' + iitem.retail_price}</Text>
                  </Navigator>
                )
              })}
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default _C
