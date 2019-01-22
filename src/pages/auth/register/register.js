import { Block, View, Input, Image, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './register.scss'
var api = require('../../../config/api.js')
var app = Taro.getApp()

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    username: '',
    password: '',
    confirmPassword: '',
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

  startRegister = () => {
    var that = this

    if (that.data.password.length < 3 || that.data.username.length < 3) {
      Taro.showModal({
        title: '错误信息',
        content: '用户名和密码不得少于3位',
        showCancel: false
      })
      return false
    }

    if (that.data.password != that.data.confirmPassword) {
      Taro.showModal({
        title: '错误信息',
        content: '确认密码不一致',
        showCancel: false
      })
      return false
    }

    Taro.request({
      url: api.ApiRootUrl + 'auth/register',
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
        console.log(res.data.data.token)
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
  bindConfirmPasswordInput = e => {
    this.setData({
      confirmPassword: e.detail.value
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
      case 'clear-confirm-password':
        this.setData({
          confirmPassword: ''
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
      confirmPassword: confirmPassword,
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
              placeholder="用户名"
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
          <View className="form-item">
            <Input
              className="password"
              value={confirmPassword}
              password
              onInput={this.bindConfirmPasswordInput}
              placeholder="确认密码"
            />
            {confirmPassword.length > 0 && (
              <Image
                className="clear"
                id="clear-confirm-password"
                src={require('../../../static/images/clear_input.png')}
                onClick={this.clearInput}
              />
            )}
          </View>
          <View className="form-item-code">
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
            onClick={this.startRegister}
          >
            注册
          </Button>
        </View>
      </View>
    )
  }
}

export default _C
