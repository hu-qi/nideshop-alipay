import { Block, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './express.scss'
var util = require('../../../utils/util.js')
var api = require('../../../config/api.js')
var app = Taro.getApp()

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    orderId: 1,
    expressInfo: {},
    expressTraces: []
  }

  componentWillMount(options) {
    this.setData({
      orderId: options.id
    })
    this.getExpressInfo()
  }

  componentDidMount() {
    // 页面渲染完成
  }

  componentDidShow() {
    // 页面显示
  }

  getExpressInfo = () => {
    let that = this
    util
      .request(api.OrderExpress, { orderId: that.data.orderId })
      .then(function(res) {
        if (res.errno === 0) {
          that.setData({
            expressInfo: res.data,
            expressTraces: res.data.traces
          })
        }
      })
  }
  updateExpress = () => {
    this.getExpressInfo()
  }

  componentDidHide() {
    // 页面隐藏
  }

  componentWillUnmount() {
    // 页面关闭
  }

  config = {
    navigationBarTitleText: '物流详情'
  }

  render() {
    const {
      expressInfo: expressInfo,
      expressTraces: expressTraces,
      key: key
    } = this.state
    return (
      <View className="container">
        <View className="express-header">
          <View className="left">
            <View className="txt">
              {'物流单号：' + expressInfo.logistic_code}
            </View>
            <View className="txt">
              {'物流公司：' + expressInfo.shipper_name}
            </View>
            <View className="txt">
              {'更新时间：' + expressInfo.request_time}
            </View>
          </View>
          {expressInfo.isFinish === 1 && (
            <View className="right">
              <View className="update-btn" onClick={this.updateExpress}>
                更新物流
              </View>
            </View>
          )}
        </View>
        <View className="express-body">
          <View className="current-icon" />
          {expressTraces.map((item, index) => {
            return (
              <View className={'express-item item-' + index} key={key}>
                <View className="left" />
                <View className="right">
                  <View className="info">{item.content}</View>
                  <View className="time">{item.datetime}</View>
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
