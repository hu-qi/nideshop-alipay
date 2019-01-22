import { Block, View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './collect.scss'
var util = require('../../../utils/util.js')
var api = require('../../../config/api.js')

var app = Taro.getApp()

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    typeId: 0,
    collectList: []
  }
  getCollectList = () => {
    let that = this
    util
      .request(api.CollectList, { typeId: that.data.typeId })
      .then(function(res) {
        if (res.errno === 0) {
          console.log(res.data)
          that.setData({
            collectList: res.data.data
          })
        }
      })
  }

  componentWillMount(options) {
    this.getCollectList()
  }

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {
    // 页面隐藏
  }

  componentWillUnmount() {
    // 页面关闭
  }

  openGoods = event => {
    let that = this
    let goodsId = this.data.collectList[event.currentTarget.dataset.index]
      .value_id

    //触摸时间距离页面打开的毫秒数
    var touchTime = that.data.touch_end - that.data.touch_start
    console.log(touchTime)
    //如果按下时间大于350为长按
    if (touchTime > 350) {
      Taro.showModal({
        title: '',
        content: '确定删除吗？',
        success: function(res) {
          if (res.confirm) {
            util
              .request(
                api.CollectAddOrDelete,
                { typeId: that.data.typeId, valueId: goodsId },
                'POST'
              )
              .then(function(res) {
                if (res.errno === 0) {
                  console.log(res.data)
                  Taro.showToast({
                    title: '删除成功',
                    icon: 'success',
                    duration: 2000
                  })
                  that.getCollectList()
                }
              })
          }
        }
      })
    } else {
      Taro.navigateTo({
        url: '/pages/goods/goods?id=' + goodsId
      })
    }
  }
  touchStart = e => {
    let that = this
    that.setData({
      touch_start: e.timeStamp
    })
    console.log(e.timeStamp + '- touch-start')
  }
  touchEnd = e => {
    let that = this
    that.setData({
      touch_end: e.timeStamp
    })
    console.log(e.timeStamp + '- touch-end')
  }
  config = {}

  render() {
    const { collectList: collectList } = this.state
    return (
      <View className="container">
        <View className="collect-list">
          {collectList.map((item, index) => {
            return (
              <View
                className="item"
                onClick={this.openGoods}
                onTouchStart={this.touchStart}
                onTouchEnd={this.touchEnd}
                key={item.id}
                data-index={index}
              >
                <Image className="img" src={item.list_pic_url} />
                <View className="info">
                  <View className="name">{item.name}</View>
                  <View className="subtitle">{item.goods_brief}</View>
                  <View className="price">{'￥' + item.retail_price}</View>
                </View>
              </View>
            )
          })}
        </View>
      </View>
    )
  }
}

export default _C
