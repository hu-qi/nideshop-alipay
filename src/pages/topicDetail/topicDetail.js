import { Block, View, Video, Image, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import TaroParseaaTmpl from '../../imports/TaroParseaaTmpl.js'
import TaroParseazTmpl from '../../imports/TaroParseazTmpl.js'
import TaroParseiTmpl from '../../imports/TaroParseiTmpl.js'
import TaroParsehTmpl from '../../imports/TaroParsehTmpl.js'
import TaroParsegTmpl from '../../imports/TaroParsegTmpl.js'
import TaroParsefTmpl from '../../imports/TaroParsefTmpl.js'
import TaroParseeTmpl from '../../imports/TaroParseeTmpl.js'
import TaroParsedTmpl from '../../imports/TaroParsedTmpl.js'
import TaroParsecTmpl from '../../imports/TaroParsecTmpl.js'
import TaroParsebTmpl from '../../imports/TaroParsebTmpl.js'
import TaroParseaTmpl from '../../imports/TaroParseaTmpl.js'
import TaroParsezTmpl from '../../imports/TaroParsezTmpl.js'
import TaroParseTmpl from '../../imports/TaroParseTmpl.js'
import TaroEmojiViewTmpl from '../../imports/TaroEmojiViewTmpl.js'
import TaroParseImgTmpl from '../../imports/TaroParseImgTmpl.js'
import TaroParseVideoTmpl from '../../imports/TaroParseVideoTmpl.js'
import './topicDetail.scss'
var app = Taro.getApp()
var WxParse = require('../../lib/wxParse/wxParse.js')
var util = require('../../utils/util.js')
var api = require('../../config/api.js')

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    id: 0,
    topic: {},
    topicList: [],
    commentCount: 0,
    commentList: []
  }

  componentWillMount(options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    that.setData({
      id: parseInt(options.id)
    })

    util.request(api.TopicDetail, { id: that.data.id }).then(function(res) {
      if (res.errno === 0) {
        that.setData({
          topic: res.data
        })

        WxParse.wxParse('topicDetail', 'html', res.data.content, that)
      }
    })

    util.request(api.TopicRelated, { id: that.data.id }).then(function(res) {
      if (res.errno === 0) {
        that.setData({
          topicList: res.data
        })
      }
    })
  }

  getCommentList = () => {
    let that = this
    util
      .request(api.CommentList, { valueId: that.data.id, typeId: 1, size: 5 })
      .then(function(res) {
        if (res.errno === 0) {
          that.setData({
            commentList: res.data.data,
            commentCount: res.data.count
          })
        }
      })
  }
  postComment = () => {
    Taro.navigateTo({
      url:
        '/pages/commentPost/commentPost?valueId=' + this.data.id + '&typeId=1'
    })
  }

  componentDidMount() {}

  componentDidShow() {
    // 页面显示
    this.getCommentList()
  }

  componentDidHide() {
    // 页面隐藏
  }

  componentWillUnmount() {
    // 页面关闭
  }

  config = {}

  render() {
    const {
      topicDetail: topicDetail,
      commentList: commentList,
      commentCount: commentCount,
      topic: topic,
      topicList: topicList
    } = this.state
    return (
      <ScrollView className="container">
        <ScrollView className="content">
          <TaroParseTmpl
            data={{
              wxParseData: topicDetail.nodes
            }}
          />
        </ScrollView>
        <View className="topic-goods" />
        <ScrollView className="comments">
          <View className="h">
            <Text className="t">精选留言</Text>
            <Image
              onClick={this.postComment}
              className="i"
              src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/comment-add-2aca147c3f.png"
            />
          </View>
          {commentList.length > 0 && (
            <View className="has-comments">
              <View className="b">
                {commentList.map((item, index) => {
                  return (
                    <View className="item" key={item.id}>
                      <View className="info">
                        <View className="user">
                          <Image
                            className="avatar"
                            src={item.user_info.avatar}
                          />
                          <Text className="nickname">
                            {item.user_info.nickname}
                          </Text>
                        </View>
                        <View className="time">{item.add_time}</View>
                      </View>
                      <View className="comment">{item.content}</View>
                    </View>
                  )
                })}
              </View>
              {commentCount > 5 && (
                <View className="load">
                  <Navigator
                    url={
                      '/pages/topicComment/topicComment?valueId=' +
                      topic.id +
                      '&typeId=1'
                    }
                  >
                    查看更多
                  </Navigator>
                </View>
              )}
            </View>
          )}
          {commentList.length <= 0 && (
            <View className="no-comments">
              <View className="b">
                <Image
                  className="icon"
                  src="http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/no-comment-560f87660a.png"
                />
                <Text className="txt">等你来留言</Text>
              </View>
            </View>
          )}
        </ScrollView>
        <ScrollView className="rec-box">
          <View className="h">
            <Text className="txt">专题推荐</Text>
          </View>
          <View className="b">
            {topicList.map((item, index) => {
              return (
                <Navigator
                  className="item"
                  url={'../topicDetail/topicDetail?id=' + item.id}
                >
                  <Image className="img" src={item.scene_pic_url} />
                  <Text className="title">{item.title}</Text>
                </Navigator>
              )
            })}
          </View>
        </ScrollView>
      </ScrollView>
    )
  }
}

export default _C
