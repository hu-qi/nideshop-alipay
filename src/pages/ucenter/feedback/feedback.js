import {
  Block,
  View,
  Picker,
  Image,
  Textarea,
  Input,
  Button
} from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './feedback.scss'
var util = require('../../../utils/util.js')
var api = require('../../../config/api.js')

var app = Taro.getApp()

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    array: [
      '请选择反馈类型',
      '商品相关',
      '物流状况',
      '客户服务',
      '优惠活动',
      '功能异常',
      '产品建议',
      '其他'
    ],
    index: 0
  }
  bindPickerChange = e => {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  }

  componentWillMount(options) {}

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {
    // 页面隐藏
  }

  componentWillUnmount() {
    // 页面关闭
  }

  config = {}

  render() {
    const { index: index, array: array } = this.state
    return (
      <View className="container">
        <Picker onChange={this.bindPickerChange} value={index} range={array}>
          <View className="picker">
            <View className="fb-type">
              <View className="type-label">{array[index]}</View>
              <Image
                className="type-icon"
                src="http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/pickerArrow-a8b918f05f.png"
              />
            </View>
          </View>
        </Picker>
        <View className="fb-body">
          <Textarea
            className="content"
            placeholder="对我们网站、商品、服务，你还有什么建议吗？你还希望在严选上买到什么？请告诉我们..."
          />
          <View className="text-count">0/500</View>
        </View>
        <View className="fb-mobile">
          <View className="label">手机号码</View>
          <View className="mobile-box">
            <Input className="mobile" placeholder="方便我们与你联系" />
            <Image
              className="clear-icon"
              src="http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/clear-fb-dd9d604f86.png"
            />
          </View>
        </View>
        <Button className="fb-btn">提交</Button>
      </View>
    )
  }
}

export default _C
