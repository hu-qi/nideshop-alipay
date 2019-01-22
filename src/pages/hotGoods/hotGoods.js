import { Block, View, Image, Text, Navigator } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './hotGoods.scss'
var util = require('../../utils/util.js')
var api = require('../../config/api.js')
var app = Taro.getApp()

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    bannerInfo: {
      img_url: '',
      name: ''
    },
    categoryFilter: false,
    filterCategory: [],
    goodsList: [],
    categoryId: 0,
    currentSortType: 'default',
    currentSortOrder: 'desc',
    page: 1,
    size: 1000
  }
  getData = () => {
    let that = this
    util.request(api.GoodsHot).then(function(res) {
      if (res.errno === 0) {
        that.setData({
          bannerInfo: res.data.bannerInfo
        })
        that.getGoodsList()
      }
    })
  }
  getGoodsList = () => {
    var that = this

    util
      .request(api.GoodsList, {
        isHot: 1,
        page: that.data.page,
        size: that.data.size,
        order: that.data.currentSortOrder,
        sort: that.data.currentSortType,
        categoryId: that.data.categoryId
      })
      .then(function(res) {
        if (res.errno === 0) {
          that.setData({
            goodsList: res.data.goodsList,
            filterCategory: res.data.filterCategory
          })
        }
      })
  }

  componentWillMount(options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.getData()
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

  openSortFilter = event => {
    let currentId = event.currentTarget.id
    switch (currentId) {
      case 'categoryFilter':
        this.setData({
          categoryFilter: !this.data.categoryFilter,
          currentSortType: 'category',
          currentSortOrder: 'asc'
        })
        break
      case 'priceSort':
        let tmpSortOrder = 'asc'
        if (this.data.currentSortOrder == 'asc') {
          tmpSortOrder = 'desc'
        }
        this.setData({
          currentSortType: 'price',
          currentSortOrder: tmpSortOrder,
          categoryFilter: false
        })

        this.getData()
        break
      default:
        //综合排序
        this.setData({
          currentSortType: 'default',
          currentSortOrder: 'desc',
          categoryFilter: false
        })
        this.getData()
    }
  }
  selectCategory = event => {
    let currentIndex = event.target.dataset.categoryIndex
    this.setData({
      categoryFilter: false,
      categoryId: this.data.filterCategory[currentIndex].id
    })
    this.getData()
  }
  config = {}

  render() {
    const {
      bannerInfo: bannerInfo,
      currentSortType: currentSortType,
      currentSortOrder: currentSortOrder,
      categoryFilter: categoryFilter,
      filterCategory: filterCategory,
      goodsList: goodsList
    } = this.state
    return (
      <View className="container">
        <View className="brand-info">
          <View className="name">
            <Image
              className="img"
              src={bannerInfo.img_url}
              backgroundSize="cover"
            />
            <View className="info-box">
              <View className="info">
                <Text className="txt">{bannerInfo.name}</Text>
                <Text className="line" />
              </View>
            </View>
          </View>
        </View>
        <View className="sort">
          <View className="sort-box">
            <View
              className={
                'item ' + (currentSortType == 'default' ? 'active' : '')
              }
              onClick={this.openSortFilter}
              id="defaultSort"
            >
              <Text className="txt">综合</Text>
            </View>
            <View
              className={
                'item by-price ' +
                (currentSortType == 'price' ? 'active' : '') +
                ' ' +
                (currentSortOrder == 'asc' ? 'asc' : 'desc')
              }
              onClick={this.openSortFilter}
              id="priceSort"
            >
              <Text className="txt">价格</Text>
            </View>
            <View
              className={
                'item ' + (currentSortType == 'category' ? 'active' : '')
              }
              onClick={this.openSortFilter}
              id="categoryFilter"
            >
              <Text className="txt">分类</Text>
            </View>
          </View>
          <View className="sort-box-category" wx-if={categoryFilter}>
            {filterCategory.map((item, index) => {
              return (
                <View
                  className={'item ' + (item.checked ? 'active' : '')}
                  key={'cate-' + item.id}
                  data-category-index={index}
                  onClick={this.selectCategory}
                >
                  {item.name}
                </View>
              )
            })}
          </View>
        </View>
        <View className="cate-item">
          <View className="b">
            {goodsList.map((iitem, iindex) => {
              return (
                <Block key="unique">
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
