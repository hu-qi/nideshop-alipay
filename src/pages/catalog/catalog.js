import {
  Block,
  View,
  Navigator,
  Image,
  Text,
  ScrollView
} from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './catalog.scss'
var util = require('../../utils/util.js')
var api = require('../../config/api.js')

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    navList: [],
    categoryList: [],
    currentCategory: {},
    scrollLeft: 0,
    scrollTop: 0,
    goodsCount: 0,
    scrollHeight: 0
  }

  componentWillMount(options) {
    this.getCatalog()
  }

  getCatalog = () => {
    //CatalogList
    let that = this
    Taro.showLoading({
      title: '加载中...'
    })
    util.request(api.CatalogList).then(function(res) {
      that.setData({
        navList: res.data.categoryList,
        currentCategory: res.data.currentCategory
      })
      Taro.hideLoading()
    })
    util.request(api.GoodsCount).then(function(res) {
      that.setData({
        goodsCount: res.data.goodsCount
      })
    })
  }
  getCurrentCategory = id => {
    let that = this
    util.request(api.CatalogCurrent, { id: id }).then(function(res) {
      that.setData({
        currentCategory: res.data.currentCategory
      })
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

  getList = () => {
    var that = this
    util
      .request(
        api.ApiRootUrl + 'api/catalog/' + that.data.currentCategory.cat_id
      )
      .then(function(res) {
        that.setData({
          categoryList: res.data
        })
      })
  }
  switchCate = event => {
    var that = this
    var currentTarget = event.currentTarget
    if (this.data.currentCategory.id == event.currentTarget.dataset.id) {
      return false
    }

    this.getCurrentCategory(event.currentTarget.dataset.id)
  }
  config = {}

  render() {
    const {
      goodsCount: goodsCount,
      currentCategory: currentCategory,
      navList: navList
    } = this.state
    return (
      <View className="container">
        <View className="search">
          <Navigator url="/pages/search/search" className="input">
            <Image className="icon" />
            <Text className="txt">
              {'商品搜索, 共' + goodsCount + '款好物'}
            </Text>
          </Navigator>
        </View>
        <View className="catalog">
          <ScrollView className="nav" scrollY="true">
            {navList.map((item, index) => {
              return (
                <View
                  className={
                    'item ' + (currentCategory.id == item.id ? 'active' : '')
                  }
                  data-id={item.id}
                  data-index={index}
                  onClick={this.switchCate}
                >
                  {item.name}
                </View>
              )
            })}
          </ScrollView>
          <ScrollView className="cate" scrollY="true">
            <Navigator url="url" className="banner">
              <Image className="image" src={currentCategory.wap_banner_url} />
              <View className="txt">{currentCategory.front_name}</View>
            </Navigator>
            <View className="hd">
              <Text className="line" />
              <Text className="txt">{currentCategory.name + '分类'}</Text>
              <Text className="line" />
            </View>
            <View className="bd">
              {currentCategory.subCategoryList.map((item, index) => {
                return (
                  <Navigator
                    url={'/pages/category/category?id=' + item.id}
                    className={'item ' + ((index + 1) % 3 == 0 ? 'last' : '')}
                  >
                    <Image className="icon" src={item.wap_banner_url} />
                    <Text className="txt">{item.name}</Text>
                  </Navigator>
                )
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }
}

export default _C
