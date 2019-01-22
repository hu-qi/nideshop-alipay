import {
  Block,
  ScrollView,
  View,
  Image,
  Input,
  Text,
  Navigator
} from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './search.scss'
var util = require('../../utils/util.js')
var api = require('../../config/api.js')

var app = Taro.getApp()

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    keywrod: '',
    searchStatus: false,
    goodsList: [],
    helpKeyword: [],
    historyKeyword: [],
    categoryFilter: false,
    currentSortType: 'default',
    currentSortOrder: '',
    filterCategory: [],
    defaultKeyword: {},
    hotKeyword: [],
    page: 1,
    size: 20,
    currentSortType: 'id',
    currentSortOrder: 'desc',
    categoryId: 0
  }
  closeSearch = () => {
    Taro.navigateBack()
  }
  clearKeyword = () => {
    this.setData({
      keyword: '',
      searchStatus: false
    })
  }

  componentWillMount() {
    this.getSearchKeyword()
  }

  getSearchKeyword = () => {
    let that = this
    util.request(api.SearchIndex).then(function(res) {
      if (res.errno === 0) {
        that.setData({
          historyKeyword: res.data.historyKeywordList,
          defaultKeyword: res.data.defaultKeyword,
          hotKeyword: res.data.hotKeywordList
        })
      }
    })
  }
  inputChange = e => {
    this.setData({
      keyword: e.detail.value,
      searchStatus: false
    })
    this.getHelpKeyword()
  }
  getHelpKeyword = () => {
    let that = this
    util
      .request(api.SearchHelper, { keyword: that.data.keyword })
      .then(function(res) {
        if (res.errno === 0) {
          that.setData({
            helpKeyword: res.data
          })
        }
      })
  }
  inputFocus = () => {
    this.setData({
      searchStatus: false,
      goodsList: []
    })

    if (this.data.keyword) {
      this.getHelpKeyword()
    }
  }
  clearHistory = () => {
    this.setData({
      historyKeyword: []
    })

    util.request(api.SearchClearHistory, {}, 'POST').then(function(res) {
      console.log('清除成功')
    })
  }
  getGoodsList = () => {
    let that = this
    util
      .request(api.GoodsList, {
        keyword: that.data.keyword,
        page: that.data.page,
        size: that.data.size,
        sort: that.data.currentSortType,
        order: that.data.currentSortOrder,
        categoryId: that.data.categoryId
      })
      .then(function(res) {
        if (res.errno === 0) {
          that.setData({
            searchStatus: true,
            categoryFilter: false,
            goodsList: res.data.data,
            filterCategory: res.data.filterCategory,
            page: res.data.currentPage,
            size: res.data.numsPerPage
          })
        }

        //重新获取关键词
        that.getSearchKeyword()
      })
  }
  onKeywordTap = event => {
    this.getSearchResult(event.target.dataset.keyword)
  }
  getSearchResult = keyword => {
    this.setData({
      keyword: keyword,
      page: 1,
      categoryId: 0,
      goodsList: []
    })

    this.getGoodsList()
  }
  openSortFilter = event => {
    let currentId = event.currentTarget.id
    switch (currentId) {
      case 'categoryFilter':
        this.setData({
          categoryFilter: !this.data.categoryFilter,
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

        this.getGoodsList()
        break
      default:
        //综合排序
        this.setData({
          currentSortType: 'default',
          currentSortOrder: 'desc',
          categoryFilter: false
        })
        this.getGoodsList()
    }
  }
  selectCategory = event => {
    let currentIndex = event.target.dataset.categoryIndex
    let filterCategory = this.data.filterCategory
    let currentCategory = null
    for (let key in filterCategory) {
      if (key == currentIndex) {
        filterCategory[key].selected = true
        currentCategory = filterCategory[key]
      } else {
        filterCategory[key].selected = false
      }
    }
    this.setData({
      filterCategory: filterCategory,
      categoryFilter: false,
      categoryId: currentCategory.id,
      page: 1,
      goodsList: []
    })
    this.getGoodsList()
  }
  onKeywordConfirm = event => {
    this.getSearchResult(event.detail.value)
  }
  config = {}

  render() {
    const {
      keyword: keyword,
      defaultKeyword: defaultKeyword,
      searchStatus: searchStatus,
      historyKeyword: historyKeyword,
      hotKeyword: hotKeyword,
      helpKeyword: helpKeyword,
      goodsList: goodsList,
      currentSortType: currentSortType,
      currentSortOrder: currentSortOrder,
      categoryFilter: categoryFilter,
      filterCategory: filterCategory
    } = this.state
    return (
      <ScrollView className="container" style="height: 100%;">
        <View className="search-header">
          <View className="input-box">
            <Image
              className="icon"
              src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/search2-2fb94833aa.png"
            />
            <Input
              name="input"
              className="keywrod"
              focus="true"
              value={keyword}
              confirmType="search"
              onInput={this.inputChange}
              onFocus={this.inputFocus}
              onConfirm={this.onKeywordConfirm}
              confirmType="search"
              placeholder={defaultKeyword.keyword}
            />
            {keyword && (
              <Image
                className="del"
                onClick={this.clearKeyword}
                src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/clearIpt-f71b83e3c2.png"
              />
            )}
          </View>
          <View className="right" onClick={this.closeSearch}>
            取消
          </View>
        </View>
        {!searchStatus && (
          <View className="no-search">
            {!keyword && historyKeyword.length && (
              <View className="serach-keywords search-history">
                <View className="h">
                  <Text className="title">历史记录</Text>
                  <Image
                    className="icon"
                    onClick={this.clearHistory}
                    src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/del1-93f0a4add4.png"
                  />
                </View>
                <View className="b">
                  {historyKeyword.map((item, index) => {
                    return (
                      <View
                        className="item"
                        onClick={this.onKeywordTap}
                        data-keyword={item}
                        hoverClass="navigator-hover"
                      >
                        {item}
                      </View>
                    )
                  })}
                </View>
              </View>
            )}
            {!keyword && (
              <View className="serach-keywords search-hot">
                <View className="h">
                  <Text className="title">热门搜索</Text>
                </View>
                <View className="b">
                  {hotKeyword.map((item, index) => {
                    return (
                      <View
                        className={
                          'item ' + (item.is_hot === 1 ? 'active' : '')
                        }
                        hoverClass="navigator-hover"
                        onClick={this.onKeywordTap}
                        data-keyword={item.keyword}
                      >
                        {item.keyword}
                      </View>
                    )
                  })}
                </View>
              </View>
            )}
            {keyword && (
              <View className="shelper-list">
                {helpKeyword.map((item, index) => {
                  return (
                    <View
                      className="item"
                      hoverClass="navigator-hover"
                      onClick={this.onKeywordTap}
                      data-keyword={item}
                    >
                      {item}
                    </View>
                  )
                })}
              </View>
            )}
          </View>
        )}
        {searchStatus && goodsList.length && (
          <View className="search-result">
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
          </View>
        )}
        {!goodsList.length && searchStatus && (
          <View className="search-result-empty">
            <Image
              className="icon"
              src="http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/noSearchResult-7572a94f32.png"
            />
            <Text className="text">您寻找的商品还未上架</Text>
          </View>
        )}
      </ScrollView>
    )
  }
}

export default _C
