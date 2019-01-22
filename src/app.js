import { Block } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './app.scss'

class App extends Taro.Component {
  componentWillMount() {
    this.$app.globalData = this.globalData

    try {
      this.globalData.userInfo = JSON.parse(Taro.getStorageSync('userInfo'))
      this.globalData.token = Taro.getStorageSync('token')
    } catch (e) {
      console.log(e)
    }
  }

  globalData = {
    userInfo: {
      nickname: '点击登录',
      avatar:
        'http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png'
    },
    token: ''
  }
  config = {
    pages: [
      'pages/index/index',
      'pages/catalog/catalog',
      'pages/newGoods/newGoods',
      'pages/hotGoods/hotGoods',
      'pages/ucenter/address/address',
      'pages/ucenter/addressAdd/addressAdd',
      'pages/ucenter/footprint/footprint',
      'pages/ucenter/order/order',
      'pages/ucenter/orderDetail/orderDetail',
      'pages/ucenter/express/express',
      'pages/ucenter/feedback/feedback',
      'pages/ucenter/coupon/coupon',
      'pages/ucenter/collect/collect',
      'pages/auth/login/login',
      'pages/auth/register/register',
      'pages/auth/reset/reset',
      'pages/pay/pay',
      'pages/payResult/payResult',
      'pages/ucenter/index/index',
      'pages/topic/topic',
      'pages/comment/comment',
      'pages/commentPost/commentPost',
      'pages/topicComment/topicComment',
      'pages/brand/brand',
      'pages/brandDetail/brandDetail',
      'pages/search/search',
      'pages/category/category',
      'pages/cart/cart',
      'pages/shopping/checkout/checkout',
      'pages/shopping/address/address',
      'pages/shopping/addressAdd/addressAdd',
      'pages/goods/goods',
      'pages/topicDetail/topicDetail'
    ],
    window: {
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '仿网易严选',
      navigationBarTextStyle: 'black',
      enablePullDownRefresh: true
    },
    tabBar: {
      backgroundColor: '#fafafa',
      borderStyle: 'white',
      selectedColor: '#b4282d',
      color: '#666',
      list: [
        {
          pagePath: 'pages/index/index',
          iconPath: 'static/images/ic_menu_choice_nor.png',
          selectedIconPath: 'static/images/ic_menu_choice_pressed.png',
          text: '首页'
        },
        {
          pagePath: 'pages/topic/topic',
          iconPath: 'static/images/ic_menu_topic_nor.png',
          selectedIconPath: 'static/images/ic_menu_topic_pressed.png',
          text: '专题'
        },
        {
          pagePath: 'pages/catalog/catalog',
          iconPath: 'static/images/ic_menu_sort_nor.png',
          selectedIconPath: 'static/images/ic_menu_sort_pressed.png',
          text: '分类'
        },
        {
          pagePath: 'pages/cart/cart',
          iconPath: 'static/images/ic_menu_shoping_nor.png',
          selectedIconPath: 'static/images/ic_menu_shoping_pressed.png',
          text: '购物车'
        },
        {
          pagePath: 'pages/ucenter/index/index',
          iconPath: 'static/images/ic_menu_me_nor.png',
          selectedIconPath: 'static/images/ic_menu_me_pressed.png',
          text: '我的'
        }
      ]
    },
    networkTimeout: {
      request: 10000,
      downloadFile: 10000
    },
    debug: true
  }

  render() {
    return null
  }
}

export default App
Taro.render(<App />, document.getElementById('app'))
