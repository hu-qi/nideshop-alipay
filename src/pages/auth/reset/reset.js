import { Block, View, Input, Image, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './reset.scss'
var app = Taro.getApp()

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    username: '',
    code: ''
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
  }
  bindUsernameInput = e => {
    this.setData({
      username: e.detail.value
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
      case 'clear-code':
        this.setData({
          code: ''
        })
        break
    }
  }
  config = {}

  render() {
    const { username: username, code: code } = this.state
    return (
      <View className="container">
        <View className="form-box">
          <View className="form-item">
            <Input
              className="username"
              value={username}
              onInput={this.bindUsernameInput}
              placeholder="请输入账号"
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
          <Button type="default" className="login-btn" onClick={this.startNext}>
            下一步
          </Button>
        </View>
      </View>
    )
  }
}

export default _C
