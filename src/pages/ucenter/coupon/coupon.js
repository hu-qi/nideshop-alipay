import { Block, View, Input, Image, Button, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './coupon.scss'
var util = require('../../../utils/util.js')
var api = require('../../../config/api.js')

var app = Taro.getApp()

@withWeapp('Page')
class _C extends Taro.Component {
  state = {}

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
    return (
      <View className="container">
        <View className="coupon-form">
          <View className="input-box">
            <Input className="coupon-sn" placeholder="请输入优惠码" />
            <Image
              className="clear-icon"
              src="http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/clear-fb-dd9d604f86.png"
            />
          </View>
          <Button className="add-btn disabled">兑换</Button>
        </View>
        <View className="help">使用说明</View>
        <View className="coupon-list">
          <View className="item">
            <View className="tag">新人专享</View>
            <View className="content">
              <View className="left">
                <View className="name">限时免单券</View>
                <View className="time">2017.06.08-2017.06.11</View>
              </View>
              <View className="right">
                <Button className="go">去使用</Button>
              </View>
            </View>
            <View className="condition">
              <Text className="txt">
                简约陶瓷马克杯专享；小米用户福利；限时购、三石福利价、礼品卡及详情页标注不可用券特殊商品除外
              </Text>
              <Image
                src="https://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/couponArrow-71315b4145.png"
                className="icon"
              />
            </View>
          </View>
          <View className="item">
            <View className="tag">新人专享</View>
            <View className="content">
              <View className="left">
                <View className="name">限时免单券</View>
                <View className="time">2017.06.08-2017.06.11</View>
              </View>
              <View className="right">
                <Button className="go">去使用</Button>
              </View>
            </View>
            <View className="condition">
              <Text className="txt">
                简约陶瓷马克杯专享；小米用户福利；限时购、三石福利价、礼品卡及详情页标注不可用券特殊商品除外
              </Text>
              <Image
                src="https://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/couponArrow-71315b4145.png"
                className="icon"
              />
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default _C
