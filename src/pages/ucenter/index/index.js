import { Block, View, Image, Text, Navigator, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'
const util = require('../../../utils/util.js')
const api = require('../../../config/api.js')
const user = require('../../../services/user.js')
const app = Taro.getApp()

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    userInfo: {},
    showLoginDialog: false
  }

  componentWillMount(options) {
    // 页面初始化 options为页面跳转所带来的参数
  }

  componentDidMount() {}

  componentDidShow() {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  }

  componentDidHide() {
    // 页面隐藏
  }

  componentWillUnmount() {
    // 页面关闭
  }

  onUserInfoClick = () => {
    if (Taro.getStorageSync('token')) {
    } else {
      this.showLoginDialog()
    }
  }
  showLoginDialog = () => {
    this.setData({
      showLoginDialog: true
    })
  }
  onCloseLoginDialog = () => {
    this.setData({
      showLoginDialog: false
    })
  }
  onDialogBody = () => {
    // 阻止冒泡
  }
  onWechatLogin = e => {
    if (e.detail.errMsg !== 'getUserInfo:ok') {
      if (e.detail.errMsg === 'getUserInfo:fail auth deny') {
        return false
      }
      Taro.showToast({
        title: '微信登录失败'
      })
      return false
    }
    util
      .login()
      .then(res => {
        return util.request(
          api.AuthLoginByWeixin,
          {
            code: res,
            userInfo: e.detail
          },
          'POST'
        )
      })
      .then(res => {
        console.log(res)
        if (res.errno !== 0) {
          Taro.showToast({
            title: '微信登录失败'
          })
          return false
        }
        // 设置用户信息
        this.setData({
          userInfo: res.data.userInfo,
          showLoginDialog: false
        })
        app.globalData.userInfo = res.data.userInfo
        app.globalData.token = res.data.token
        Taro.setStorageSync('userInfo', JSON.stringify(res.data.userInfo))
        Taro.setStorageSync('token', res.data.token)
      })
      .catch(err => {
        console.log(err)
      })
  }
  onOrderInfoClick = event => {
    Taro.navigateTo({
      url: '/pages/ucenter/order/order'
    })
  }
  onSectionItemClick = event => {}
  exitLogin = () => {
    Taro.showModal({
      title: '',
      confirmColor: '#b4282d',
      content: '退出登录？',
      success: function(res) {
        if (res.confirm) {
          Taro.removeStorageSync('token')
          Taro.removeStorageSync('userInfo')
          Taro.switchTab({
            url: '/pages/index/index'
          })
        }
      }
    })
  }
  config = {
    navigationBarBackgroundColor: '#333',
    navigationBarTitleText: '我的',
    navigationBarTextStyle: 'white',
    backgroundColor: '#f4f4f4'
  }

  render() {
    const { userInfo: userInfo, showLoginDialog: showLoginDialog } = this.state
    return (
      <Block>
        <View className="container">
          <View className="profile-info">
            <Image
              onClick={this.onUserInfoClick}
              className="avatar"
              src={userInfo.avatar}
            />
            <View className="info">
              <Text className="name" onClick={this.onUserInfoClick}>
                {userInfo.nickname || '点击登录'}
              </Text>
              {/*  <text class='level' bindtap='onUserInfoClick'></text>  */}
            </View>
            <Image
              onClick={this.onUserInfoClick}
              className="btn"
              src={require('../../../static/images/address_right.png')}
            />
          </View>
          <View className="user-menu">
            <View className="item">
              <Navigator url="/pages/ucenter/order/order" className="a">
                <Text className="icon order" />
                <Text className="txt">我的订单</Text>
              </Navigator>
            </View>
            <View className="item">
              <Navigator url="/pages/ucenter/coupon/coupon" className="a">
                <Text className="icon coupon" />
                <Text className="txt">优惠券</Text>
              </Navigator>
            </View>
            <View className="item no-border">
              <Navigator url="url" className="a">
                <Text className="icon gift" />
                <Text className="txt">礼品卡</Text>
              </Navigator>
            </View>
            <View className="item">
              <Navigator url="/pages/ucenter/collect/collect" className="a">
                <Text className="icon address" />
                <Text className="txt">我的收藏</Text>
              </Navigator>
            </View>
            <View className="item">
              <Navigator url="/pages/ucenter/footprint/footprint" className="a">
                <Text className="icon security" />
                <Text className="txt">我的足迹</Text>
              </Navigator>
            </View>
            <View className="item no-border">
              <Navigator url="url" className="a">
                <Text className="icon kefu" />
                <Text className="txt">会员福利</Text>
              </Navigator>
            </View>
            <View className="item">
              <Navigator url="../address/address" className="a">
                <Text className="icon address" />
                <Text className="txt">地址管理</Text>
              </Navigator>
            </View>
            <View className="item">
              <Navigator url="url" className="a">
                <Text className="icon security" />
                <Text className="txt">账号安全</Text>
              </Navigator>
            </View>
            <View className="item no-border">
              <Navigator url="url" className="a">
                <Text className="icon kefu" />
                <Text className="txt">联系客服</Text>
              </Navigator>
            </View>
            <View className="item item-bottom">
              <Navigator url="url" className="a">
                <Text className="icon help" />
                <Text className="txt">帮助中心</Text>
              </Navigator>
            </View>
            <View className="item item-bottom">
              <Navigator url="/pages/ucenter/feedback/feedback" className="a">
                <Text className="icon feedback" />
                <Text className="txt">意见反馈</Text>
              </Navigator>
            </View>
          </View>
          {/*  <view class="logout" bindtap="exitLogin">退出登录</view>  */}
        </View>
        {showLoginDialog && (
          <View className="dialog-login" onClick={this.onCloseLoginDialog}>
            <View className="dialog-body" onClick={this.onDialogBody}>
              <View className="title">请选择登录方式</View>
              <View className="content">
                <Button
                  type="primary"
                  openType="getUserInfo"
                  onGetuserinfo={this.onWechatLogin}
                >
                  微信登录
                </Button>
                <Button
                  openType="getUserInfo"
                  lang="zh_CN"
                  onGetuserinfo={this.onWechatLogin}
                >
                  手机号登录
                </Button>
              </View>
            </View>
          </View>
        )}
      </Block>
    )
  }
}

export default _C
