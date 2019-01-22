import {
  Block,
  View,
  Input,
  Image,
  Button,
  Navigator
} from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './login.scss'
var api = require('../../../config/api.js')
var app = Taro.getApp()

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    username: '',
    password: '',
    code: '',
    loginErrorCount: 0
  }

  componentWillMount(options) {
    // 页面初始化 options为页面跳转所带来的参数
    // 页面渲染完成
  }

  componentDidMount() {}

  componentDidShow() {
    // 页面显示
  }

  componentDidHide() {
    // 页面隐藏
  }

  componentWillUnmount() {
    // 页面关闭
  }

  startLogin = () => {
    var that = this

    if (that.data.password.length < 1 || that.data.username.length < 1) {
      Taro.showModal({
        title: '错误信息',
        content: '请输入用户名和密码',
        showCancel: false
      })
      return false
    }

    Taro.request({
      url: api.ApiRootUrl + 'auth/login',
      data: {
        username: that.data.username,
        password: that.data.password
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        if (res.data.code == 200) {
          that.setData({
            loginErrorCount: 0
          })
          Taro.setStorage({
            key: 'token',
            data: res.data.data.token,
            success: function() {
              Taro.switchTab({
                url: '/pages/ucenter/index/index'
              })
            }
          })
        }
      }
    })
  }
  bindUsernameInput = e => {
    this.setData({
      username: e.detail.value
    })
  }
  bindPasswordInput = e => {
    this.setData({
      password: e.detail.value
    })
  }
  bindCodeInput = e => {
    this.setData({
      code: e.detail.value
    })
  }
  clearInput = e => {
    switch (e.currentTarget.id) {
      case 'clear-username':
        this.setData({
          username: ''
        })
        break
      case 'clear-password':
        this.setData({
          password: ''
        })
        break
      case 'clear-code':
        this.setData({
          code: ''
        })
        break
    }
  }
  config = {}

  render() {
    const {
      username: username,
      password: password,
      loginErrorCount: loginErrorCount,
      code: code
    } = this.state
    return (
      <View className="container">
        <View className="form-box">
          <View className="form-item">
            <Input
              className="username"
              value={username}
              onInput={this.bindUsernameInput}
              placeholder="账号"
              autoFocus
            />
            {username.length > 0 && (
              <Image
                id="clear-username"
                className="clear"
                src={require('../../../static/images/clear_input.png')}
                onClick={this.clearInput}
              />
            )}
          </View>
          <View className="form-item">
            <Input
              className="password"
              value={password}
              password
              onInput={this.bindPasswordInput}
              placeholder="密码"
            />
            {password.length > 0 && (
              <Image
                className="clear"
                id="clear-password"
                src={require('../../../static/images/clear_input.png')}
                onClick={this.clearInput}
              />
            )}
          </View>
          <View className="form-item-code" wx-if={loginErrorCount >= 3}>
            <View className="form-item code-item">
              <Input
                className="code"
                value={code}
                onInput={this.bindCodeInput}
                placeholder="验证码"
              />
              {code.length > 0 && (
                <Image
                  className="clear"
                  id="clear-code"
                  src={require('../../../static/images/clear_input.png')}
                  onClick={this.clearInput}
                />
              )}
            </View>
            <Image
              className="code-img"
              src="https://dl.reg.163.com/cp?pd=yanxuan_web&pkid=SkeBZeG&random=1489903563234"
            />
          </View>
          <Button
            type="default"
            className="login-btn"
            onClick={this.startLogin}
          >
            登录
          </Button>
          <View className="form-item-text">
            <Navigator url="/pages/auth/register/register" className="register">
              注册账号
            </Navigator>
            <Navigator url="/pages/auth/reset/reset" className="reset">
              忘记密码
            </Navigator>
          </View>
        </View>
      </View>
    )
  }
}

export default _C
