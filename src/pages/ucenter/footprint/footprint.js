import { Block, View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './footprint.scss'
var util = require('../../../utils/util.js')
var api = require('../../../config/api.js')

var app = Taro.getApp()

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    footprintList: []
  }
  getFootprintList = () => {
    let that = this
    util.request(api.FootprintList).then(function(res) {
      if (res.errno === 0) {
        console.log(res.data)
        that.setData({
          footprintList: res.data.data
        })
      }
    })
  }
  deleteItem = event => {
    let that = this
    let footprint = event.currentTarget.dataset.footprint
    var touchTime = that.data.touch_end - that.data.touch_start
    console.log(touchTime)
    //如果按下时间大于350为长按
    if (touchTime > 350) {
      Taro.showModal({
        title: '',
        content: '要删除所选足迹？',
        success: function(res) {
          if (res.confirm) {
            util
              .request(
                api.FootprintDelete,
                { footprintId: footprint.id },
                'POST'
              )
              .then(function(res) {
                if (res.errno === 0) {
                  Taro.showToast({
                    title: '删除成功',
                    icon: 'success',
                    duration: 2000
                  })
                  that.getFootprintList()
                }
              })
            console.log('用户点击确定')
          }
        }
      })
    } else {
      Taro.navigateTo({
        url: '/pages/goods/goods?id=' + footprint.goods_id
      })
    }
  }

  componentWillMount(options) {
    this.getFootprintList()
  }

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {
    // 页面隐藏
  }

  componentWillUnmount() {
    // 页面关闭
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
    const { footprintList: footprintList } = this.state
    return (
      <View className="container">
        <View className="footprint">
          {footprintList.map((item, index) => {
            return (
              <View className="day-item" key={index}>
                <View className="day-hd">{item[0].add_time}</View>
                <View className="day-list">
                  {item.map((iitem, index) => {
                    return (
                      <View
                        className="item"
                        data-footprint={iitem}
                        onTouchStart={this.touchStart}
                        onTouchEnd={this.touchEnd}
                        onClick={this.deleteItem}
                        key={iitem.id}
                      >
                        <Image className="img" src={iitem.list_pic_url} />
                        <View className="info">
                          <View className="name">{iitem.name}</View>
                          <View className="subtitle">{iitem.goods_brief}</View>
                          <View className="price">
                            {'￥' + iitem.retail_price}
                          </View>
                        </View>
                      </View>
                    )
                  })}
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
