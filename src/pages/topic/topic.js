import {
  Block,
  View,
  ScrollView,
  Navigator,
  Image,
  Text
} from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './topic.scss'
var util = require('../../utils/util.js')
var api = require('../../config/api.js')
var app = Taro.getApp()

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    // text:"这是一个页面"
    topicList: [],
    page: 1,
    size: 10,
    count: 0,
    scrollTop: 0,
    showPage: false
  }

  componentWillMount(options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.getTopic()
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

  nextPage = event => {
    console.log()
    var that = this
    if (this.data.page + 1 > that.data.count / that.data.size) {
      return true
    }

    that.setData({
      page: parseInt(that.data.page) + 1
    })

    this.getTopic()
  }
  getTopic = () => {
    let that = this
    that.setData({
      scrollTop: 0,
      showPage: false,
      topicList: []
    })
    // 页面渲染完成
    Taro.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 2000
    })

    util
      .request(api.TopicList, { page: that.data.page, size: that.data.size })
      .then(function(res) {
        if (res.errno === 0) {
          that.setData({
            scrollTop: 0,
            topicList: res.data.data,
            showPage: true,
            count: res.data.count
          })
        }
        Taro.hideToast()
      })
  }
  prevPage = event => {
    if (this.data.page <= 1) {
      return false
    }

    var that = this
    that.setData({
      page: parseInt(that.data.page) - 1
    })
    this.getTopic()
  }
  config = {}

  render() {
    const {
      scrollTop: scrollTop,
      topicList: topicList,
      showPage: showPage,
      page: page,
      count: count,
      size: size
    } = this.state
    return (
      <View className="container">
        <ScrollView className="topic-list" scrollY="true" scrollTop={scrollTop}>
          {topicList.map((item, index) => {
            return (
              <Navigator
                className="item"
                key={item.id}
                url={'../topicDetail/topicDetail?id=' + item.id}
              >
                <Image className="img" src={item.scene_pic_url} />
                <View className="info">
                  <Text className="title">{item.title}</Text>
                  <Text className="desc">{item.subtitle}</Text>
                  <Text className="price">{item.price_info + '元起'}</Text>
                </View>
              </Navigator>
            )
          })}
          {showPage && (
            <View className="page">
              <View
                className={'prev ' + (page <= 1 ? 'disabled' : '')}
                onClick={this.prevPage}
              >
                上一页
              </View>
              <View
                className={
                  'next ' + (count / size < page + 1 ? 'disabled' : '')
                }
                onClick={this.nextPage}
              >
                下一页
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    )
  }
}

export default _C
