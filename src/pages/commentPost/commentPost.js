import { Block, View, Textarea, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './commentPost.scss'
var app = Taro.getApp()
var util = require('../../utils/util.js')
var api = require('../../config/api.js')

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    typeId: 0,
    valueId: 0,
    content: ''
  }

  componentWillMount(options) {
    var that = this
    that.setData({
      typeId: parseInt(options.typeId),
      valueId: parseInt(options.valueId)
    })
  }

  onClose = () => {
    Taro.navigateBack({
      delta: 1
    })
  }
  onPost = () => {
    let that = this

    if (!this.data.content) {
      util.showErrorToast('请填写评论')
      return false
    }

    util
      .request(
        api.CommentPost,
        {
          typeId: that.data.typeId,
          valueId: that.data.valueId,
          content: that.data.content
        },
        'POST'
      )
      .then(function(res) {
        if (res.errno === 0) {
          Taro.showToast({
            title: '评论成功',
            complete: function() {
              Taro.navigateBack({
                delta: 1
              })
            }
          })
        }
        console.log(res)
      })
  }
  bindInpuntValue = event => {
    let value = event.detail.value

    //判断是否超过140个字符
    if (value && value.length > 140) {
      return false
    }

    this.setData({
      content: event.detail.value
    })
    console.log(event.detail)
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

  config = {
    navigationBarTitleText: '填写留言'
  }

  render() {
    const { content: content } = this.state
    return (
      <View className="container">
        <View className="post-comment">
          <View className="input-box">
            <Textarea
              className="content"
              focus="true"
              onInput={this.bindInpuntValue}
              maxlength="140"
              placeholder="留言经过筛选后，对所有人可见"
            />
            <Text className="count">{140 - content.length}</Text>
          </View>
          <View className="btns">
            <View className="close" onClick={this.onClose}>
              取消
            </View>
            <View className="post" onClick={this.onPost}>
              发表
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default _C
