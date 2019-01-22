import { Block, View, Image, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './topicComment.scss'
var app = Taro.getApp()
var util = require('../../utils/util.js')

var api = require('../../config/api.js')

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    comments: [],
    allCommentList: [],
    picCommentList: [],
    typeId: 0,
    valueId: 0,
    showType: 0,
    allCount: 0,
    hasPicCount: 0,
    allPage: 1,
    picPage: 1,
    size: 20
  }
  getCommentCount = () => {
    let that = this
    util
      .request(api.CommentCount, {
        valueId: that.data.valueId,
        typeId: that.data.typeId
      })
      .then(function(res) {
        if (res.errno === 0) {
          that.setData({
            allCount: res.data.allCount,
            hasPicCount: res.data.hasPicCount
          })
        }
      })
  }
  getCommentList = () => {
    let that = this
    util
      .request(api.CommentList, {
        valueId: that.data.valueId,
        typeId: that.data.typeId,
        size: that.data.size,
        page: that.data.showType == 0 ? that.data.allPage : that.data.picPage,
        showType: that.data.showType
      })
      .then(function(res) {
        if (res.errno === 0) {
          if (that.data.showType == 0) {
            that.setData({
              allCommentList: that.data.allCommentList.concat(res.data.data),
              allPage: res.data.currentPage,
              comments: that.data.allCommentList.concat(res.data.data)
            })
          } else {
            that.setData({
              picCommentList: that.data.picCommentList.concat(res.data.data),
              picPage: res.data.currentPage,
              comments: that.data.picCommentList.concat(res.data.data)
            })
          }
        }
      })
  }

  componentWillMount(options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      typeId: options.typeId,
      valueId: options.valueId
    })
    this.getCommentCount()
    this.getCommentList()
  }

  componentDidMount() {
    // 页面渲染完成
  }

  componentDidShow() {
    // 页面显示
  }

  componentDidHide() {
    // 页面隐藏
  }

  componentWillUnmount() {
    // 页面关闭
  }

  switchTab = () => {
    this.setData({
      showType: this.data.showType == 1 ? 0 : 1
    })

    this.getCommentList()
  }
  onReachBottom = () => {
    console.log('onPullDownRefresh')
    if (this.data.showType == 0) {
      if (this.data.allCount / this.data.size < this.data.allPage) {
        return false
      }

      this.setData({
        allPage: this.data.allPage + 1
      })
    } else {
      if (this.data.hasPicCount / this.data.size < this.data.picPage) {
        return false
      }

      this.setData({
        picPage: this.data.picPage + 1
      })
    }

    this.getCommentList()
  }
  config = {}

  render() {
    const { comments: comments } = this.state
    return (
      <View className="comments">
        <View className="b">
          {comments.map((item, index) => {
            return (
              <View className="item" key={item.id}>
                <View className="info">
                  <View className="user">
                    <Image src={item.user_info.avatar} />
                    <Text>{item.user_info.nickname}</Text>
                  </View>
                  <View className="time">{item.add_time}</View>
                </View>
                <View className="comment">{item.content}</View>
                {item.pic_list.length > 0 && (
                  <View className="imgs">
                    {item.pic_list.map((pitem, index) => {
                      return (
                        <Image
                          className="img"
                          key={pitem.id}
                          src={pitem.pic_url}
                        />
                      )
                    })}
                  </View>
                )}
                {/* <view class="customer-service" wx:if="{{item.commentReplyVO}}">
                                  <text class="u">小选回复：</text>
                                  <text class="c">{{item.commentReplyVO.replyContent}}</text>
                                </view> */}
              </View>
            )
          })}
        </View>
      </View>
    )
  }
}

export default _C
