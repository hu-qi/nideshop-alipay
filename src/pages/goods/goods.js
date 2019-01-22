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
import './goods.scss'
var app = Taro.getApp()
var WxParse = require('../../lib/wxParse/wxParse.js')
var util = require('../../utils/util.js')
var api = require('../../config/api.js')

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    id: 0,
    goods: {},
    gallery: [],
    attribute: [],
    issueList: [],
    comment: [],
    brand: {},
    specificationList: [],
    productList: [],
    relatedGoods: [],
    cartGoodsCount: 0,
    userHasCollect: 0,
    number: 1,
    checkedSpecText: '请选择规格数量',
    openAttr: false,
    noCollectImage: '/static/images/icon_collect.png',
    hasCollectImage: '/static/images/icon_collect_checked.png',
    collectBackImage: '/static/images/icon_collect.png'
  }
  getGoodsInfo = () => {
    let that = this
    util.request(api.GoodsDetail, { id: that.data.id }).then(function(res) {
      if (res.errno === 0) {
        that.setData({
          goods: res.data.info,
          gallery: res.data.gallery,
          attribute: res.data.attribute,
          issueList: res.data.issue,
          comment: res.data.comment,
          brand: res.data.brand,
          specificationList: res.data.specificationList,
          productList: res.data.productList,
          userHasCollect: res.data.userHasCollect
        })

        if (res.data.userHasCollect == 1) {
          that.setData({
            collectBackImage: that.data.hasCollectImage
          })
        } else {
          that.setData({
            collectBackImage: that.data.noCollectImage
          })
        }

        WxParse.wxParse('goodsDetail', 'html', res.data.info.goods_desc, that)

        that.getGoodsRelated()
      }
    })
  }
  getGoodsRelated = () => {
    let that = this
    util.request(api.GoodsRelated, { id: that.data.id }).then(function(res) {
      if (res.errno === 0) {
        that.setData({
          relatedGoods: res.data.goodsList
        })
      }
    })
  }
  clickSkuValue = event => {
    let that = this
    let specNameId = event.currentTarget.dataset.nameId
    let specValueId = event.currentTarget.dataset.valueId

    //判断是否可以点击

    //TODO 性能优化，可在wx:for中添加index，可以直接获取点击的属性名和属性值，不用循环
    let _specificationList = this.data.specificationList
    for (let i = 0; i < _specificationList.length; i++) {
      if (_specificationList[i].specification_id == specNameId) {
        for (let j = 0; j < _specificationList[i].valueList.length; j++) {
          if (_specificationList[i].valueList[j].id == specValueId) {
            //如果已经选中，则反选
            if (_specificationList[i].valueList[j].checked) {
              _specificationList[i].valueList[j].checked = false
            } else {
              _specificationList[i].valueList[j].checked = true
            }
          } else {
            _specificationList[i].valueList[j].checked = false
          }
        }
      }
    }
    this.setData({
      specificationList: _specificationList
    })
    //重新计算spec改变后的信息
    this.changeSpecInfo()

    //重新计算哪些值不可以点击
  }
  getCheckedSpecValue = () => {
    let checkedValues = []
    let _specificationList = this.data.specificationList
    for (let i = 0; i < _specificationList.length; i++) {
      let _checkedObj = {
        nameId: _specificationList[i].specification_id,
        valueId: 0,
        valueText: ''
      }
      for (let j = 0; j < _specificationList[i].valueList.length; j++) {
        if (_specificationList[i].valueList[j].checked) {
          _checkedObj.valueId = _specificationList[i].valueList[j].id
          _checkedObj.valueText = _specificationList[i].valueList[j].value
        }
      }
      checkedValues.push(_checkedObj)
    }

    return checkedValues
  }
  setSpecValueStatus = () => {}
  isCheckedAllSpec = () => {
    return !this.getCheckedSpecValue().some(function(v) {
      if (v.valueId == 0) {
        return true
      }
    })
  }
  getCheckedSpecKey = () => {
    let checkedValue = this.getCheckedSpecValue().map(function(v) {
      return v.valueId
    })

    return checkedValue.join('_')
  }
  changeSpecInfo = () => {
    let checkedNameValue = this.getCheckedSpecValue()

    //设置选择的信息
    let checkedValue = checkedNameValue
      .filter(function(v) {
        if (v.valueId != 0) {
          return true
        } else {
          return false
        }
      })
      .map(function(v) {
        return v.valueText
      })
    if (checkedValue.length > 0) {
      this.setData({
        checkedSpecText: checkedValue.join('　')
      })
    } else {
      this.setData({
        checkedSpecText: '请选择规格数量'
      })
    }
  }
  getCheckedProductItem = key => {
    return this.data.productList.filter(function(v) {
      if (v.goods_specification_ids == key) {
        return true
      } else {
        return false
      }
    })
  }

  componentWillMount(options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      id: parseInt(options.id)
      // id: 1181000
    })
    var that = this
    this.getGoodsInfo()
    util.request(api.CartGoodsCount).then(function(res) {
      if (res.errno === 0) {
        that.setData({
          cartGoodsCount: res.data.cartTotal.goodsCount
        })
      }
    })
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

  switchAttrPop = () => {
    if (this.data.openAttr == false) {
      this.setData({
        openAttr: !this.data.openAttr
      })
    }
  }
  closeAttr = () => {
    this.setData({
      openAttr: false
    })
  }
  addCannelCollect = () => {
    let that = this
    //添加或是取消收藏
    util
      .request(
        api.CollectAddOrDelete,
        { typeId: 0, valueId: this.data.id },
        'POST'
      )
      .then(function(res) {
        let _res = res
        if (_res.errno == 0) {
          if (_res.data.type == 'add') {
            that.setData({
              collectBackImage: that.data.hasCollectImage
            })
          } else {
            that.setData({
              collectBackImage: that.data.noCollectImage
            })
          }
        } else {
          Taro.showToast({
            image: '/static/images/icon_error.png',
            title: _res.errmsg,
            mask: true
          })
        }
      })
  }
  openCartPage = () => {
    Taro.switchTab({
      url: '/pages/cart/cart'
    })
  }
  addToCart = () => {
    var that = this
    if (this.data.openAttr === false) {
      //打开规格选择窗口
      this.setData({
        openAttr: !this.data.openAttr
      })
    } else {
      //提示选择完整规格
      if (!this.isCheckedAllSpec()) {
        Taro.showToast({
          image: '/static/images/icon_error.png',
          title: '请选择规格',
          mask: true
        })
        return false
      }

      //根据选中的规格，判断是否有对应的sku信息
      let checkedProduct = this.getCheckedProductItem(this.getCheckedSpecKey())
      if (!checkedProduct || checkedProduct.length <= 0) {
        //找不到对应的product信息，提示没有库存
        Taro.showToast({
          image: '/static/images/icon_error.png',
          title: '库存不足',
          mask: true
        })
        return false
      }

      //验证库存
      if (checkedProduct.goods_number < this.data.number) {
        //找不到对应的product信息，提示没有库存
        Taro.showToast({
          image: '/static/images/icon_error.png',
          title: '库存不足',
          mask: true
        })
        return false
      }

      //添加到购物车
      util
        .request(
          api.CartAdd,
          {
            goodsId: this.data.goods.id,
            number: this.data.number,
            productId: checkedProduct[0].id
          },
          'POST'
        )
        .then(function(res) {
          let _res = res
          if (_res.errno == 0) {
            Taro.showToast({
              title: '添加成功'
            })
            that.setData({
              openAttr: !that.data.openAttr,
              cartGoodsCount: _res.data.cartTotal.goodsCount
            })
          } else {
            Taro.showToast({
              image: '/static/images/icon_error.png',
              title: _res.errmsg,
              mask: true
            })
          }
        })
    }
  }
  cutNumber = () => {
    this.setData({
      number: this.data.number - 1 > 1 ? this.data.number - 1 : 1
    })
  }
  addNumber = () => {
    this.setData({
      number: this.data.number + 1
    })
  }
  config = {}

  render() {
    const {
      gallery: gallery,
      goods: goods,
      brand: brand,
      comment: comment,
      attribute: attribute,
      goodsDetail: goodsDetail,
      issueList: issueList,
      relatedGoods: relatedGoods,
      openAttr: openAttr,
      productList: productList,
      checkedSpecText: checkedSpecText,
      specificationList: specificationList,
      number: number,
      collectBackImage: collectBackImage,
      cartGoodsCount: cartGoodsCount
    } = this.state
    return (
      <Block>
        <View className="container">
          <Swiper
            className="goodsimgs"
            indicatorDots="true"
            autoplay="true"
            interval="3000"
            duration="1000"
          >
            {gallery.map((item, index) => {
              return (
                <SwiperItem key={item.id}>
                  <Image src={item.img_url} backgroundSize="cover" />
                </SwiperItem>
              )
            })}
          </Swiper>
          <View className="service-policy">
            <View className="item">30天无忧退货</View>
            <View className="item">48小时快速退款</View>
            <View className="item">满88元免邮费</View>
          </View>
          <View className="goods-info">
            <View className="c">
              <Text className="name">{goods.name}</Text>
              <Text className="desc">{goods.goods_brief}</Text>
              <Text className="price">{'￥' + goods.retail_price}</Text>
              {brand.name && (
                <View className="brand">
                  <Navigator
                    url={'../brandDetail/brandDetail?id=' + brand.brandId}
                  >
                    <Text>{brand.name}</Text>
                  </Navigator>
                </View>
              )}
            </View>
          </View>
          <View
            className="section-nav section-attr"
            onClick={this.switchAttrPop}
          >
            <View className="t">请选择规格数量</View>
            <Image
              className="i"
              src={require('../../static/images/address_right.png')}
              backgroundSize="cover"
            />
          </View>
          {/* <view class="section-nav section-act">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          <view class="t">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            <view class="label">1个促销:</view>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            <view class="tag">万圣趴</view>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            <view class="text">全场满499，额外送糖果</view>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          </view>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          <image class="i" src="../../static/images/address_right.png" background-size="cover"></image>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        </view> */}
          {comment.count > 0 && (
            <View className="comments">
              <View className="h">
                <Navigator
                  url={'../comment/comment?valueId=' + goods.id + '&typeId=0'}
                >
                  <Text className="t">
                    {'评价(' +
                      (comment.count > 999 ? '999+' : comment.count) +
                      ')'}
                  </Text>
                  <Text className="i">查看全部</Text>
                </Navigator>
              </View>
              <View className="b">
                <View className="item">
                  <View className="info">
                    <View className="user">
                      <Image src={comment.data.avatar} />
                      <Text>{comment.data.nickname}</Text>
                    </View>
                    <View className="time">{comment.data.add_time}</View>
                  </View>
                  <View className="content">{comment.data.content}</View>
                  {comment.data.pic_list.length > 0 && (
                    <View className="imgs">
                      {comment.data.pic_list.map((item, index) => {
                        return (
                          <Image
                            className="img"
                            key={item.id}
                            src={item.pic_url}
                          />
                        )
                      })}
                    </View>
                  )}
                  {/*  <view class="spec">白色 2件</view>  */}
                </View>
              </View>
            </View>
          )}
          <View className="goods-attr">
            <View className="t">商品参数</View>
            <View className="l">
              {attribute.map((item, index) => {
                return (
                  <View className="item" key={item.name}>
                    <Text className="left">{item.name}</Text>
                    <Text className="right">{item.value}</Text>
                  </View>
                )
              })}
            </View>
          </View>
          <View className="detail">
            <TaroParseTmpl
              data={{
                wxParseData: goodsDetail.nodes
              }}
            />
          </View>
          <View className="common-problem">
            <View className="h">
              <View className="line" />
              <Text className="title">常见问题</Text>
            </View>
            <View className="b">
              {issueList.map((item, index) => {
                return (
                  <View className="item" key={item.id}>
                    <View className="question-box">
                      <Text className="spot" />
                      <Text className="question">{item.question}</Text>
                    </View>
                    <View className="answer">{item.answer}</View>
                  </View>
                )
              })}
            </View>
          </View>
          {relatedGoods.length > 0 && (
            <View className="related-goods">
              <View className="h">
                <View className="line" />
                <Text className="title">大家都在看</Text>
              </View>
              <View className="b">
                {relatedGoods.map((item, index) => {
                  return (
                    <View className="item" key={item.id}>
                      <Navigator url={'/pages/goods/goods?id=' + item.id}>
                        <Image
                          className="img"
                          src={item.list_pic_url}
                          backgroundSize="cover"
                        />
                        <Text className="name">{item.name}</Text>
                        <Text className="price">
                          {'￥' + item.retail_price}
                        </Text>
                      </Navigator>
                    </View>
                  )
                })}
              </View>
            </View>
          )}
        </View>
        <View className="attr-pop-box" hidden={!openAttr}>
          <View className="attr-pop">
            <View className="close" onClick={this.closeAttr}>
              <Image
                className="icon"
                src={require('../../static/images/icon_close.png')}
              />
            </View>
            <View className="img-info">
              <Image className="img" src={gallery[0].img_url} />
              <View className="info">
                <View className="c">
                  <View className="p">{'价格：￥' + goods.retail_price}</View>
                  {productList.length > 0 && (
                    <View className="a">{'已选择：' + checkedSpecText}</View>
                  )}
                </View>
              </View>
            </View>
            <View className="spec-con">
              {specificationList.map((item, index) => {
                return (
                  <View className="spec-item" key={item.specification_id}>
                    <View className="name">{item.name}</View>
                    <View className="values">
                      {item.valueList.map((vitem, index) => {
                        return (
                          <View
                            className={
                              'value ' + (vitem.checked ? 'selected' : '')
                            }
                            onClick={this.clickSkuValue}
                            key={vitem.id}
                            data-value-id={vitem.id}
                            data-name-id={vitem.specification_id}
                          >
                            {vitem.value}
                          </View>
                        )
                      })}
                    </View>
                  </View>
                )
              })}
              <View className="number-item">
                <View className="name">数量</View>
                <View className="selnum">
                  <View className="cut" onClick={this.cutNumber}>
                    -
                  </View>
                  <Input
                    value={number}
                    className="number"
                    disabled="true"
                    type="number"
                  />
                  <View className="add" onClick={this.addNumber}>
                    +
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View className="bottom-btn">
          <View className="l l-collect" onClick={this.addCannelCollect}>
            <Image className="icon" src={collectBackImage} />
          </View>
          <View className="l l-cart">
            <View className="box">
              <Text className="cart-count">{cartGoodsCount}</Text>
              <Image
                onClick={this.openCartPage}
                className="icon"
                src={require('../../static/images/ic_menu_shoping_nor.png')}
              />
            </View>
          </View>
          <View className="c">立即购买</View>
          <View className="r" onClick={this.addToCart}>
            加入购物车
          </View>
        </View>
      </Block>
    )
  }
}

export default _C
