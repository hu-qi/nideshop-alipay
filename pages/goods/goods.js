"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _class, _class2, _temp2;

var _index = require("../../npm/_tarojs/taro-alipay/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../npm/_tarojs/with-weapp/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var app = _index2.default.getApp();
var WxParse = require('../../lib/wxParse/wxParse.js');
var util = require('../../utils/util.js');
var api = require('../../config/api.js');

var _C = (_dec = (0, _index4.default)('Page'), _dec(_class = (_temp2 = _class2 = function (_Taro$Component) {
  _inherits(_C, _Taro$Component);

  function _C() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, _C);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _C.__proto__ || Object.getPrototypeOf(_C)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "anonymousState__temp2", "anonymousState__temp3", "anonymousState__temp4", "comment", "gallery", "brand", "goods", "attribute", "issueList", "relatedGoods", "openAttr", "productList", "specificationList", "number", "collectBackImage", "checkedSpecText", "cartGoodsCount", "id", "userHasCollect", "noCollectImage", "hasCollectImage"], _this.state = {
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
    }, _this.getGoodsInfo = function () {
      var that = _this;
      util.request(api.GoodsDetail, { id: that.data.id }).then(function (res) {
        if (res.errno === 0) {
          that.setData({
            goods: res.data.info,
            gallery: res.data.gallery.concat({'img_url': res.data.info.list_pic_url}),
            attribute: res.data.attribute,
            issueList: res.data.issue,
            comment: res.data.comment,
            brand: res.data.brand,
            specificationList: res.data.specificationList,
            productList: res.data.productList,
            userHasCollect: res.data.userHasCollect
          });

          if (res.data.userHasCollect == 1) {
            that.setData({
              collectBackImage: that.data.hasCollectImage
            });
          } else {
            that.setData({
              collectBackImage: that.data.noCollectImage
            });
          }

          WxParse.wxParse('goodsDetail', 'html', res.data.info.goods_desc, that);

          that.getGoodsRelated();
        }
      });
    }, _this.getGoodsRelated = function () {
      var that = _this;
      util.request(api.GoodsRelated, { id: that.data.id }).then(function (res) {
        if (res.errno === 0) {
          that.setData({
            relatedGoods: res.data.goodsList
          });
        }
      });
    }, _this.clickSkuValue = function (event) {
      var that = _this;
      var specNameId = event.currentTarget.dataset.nameId;
      var specValueId = event.currentTarget.dataset.valueId;

      //判断是否可以点击

      //TODO 性能优化，可在wx:for中添加index，可以直接获取点击的属性名和属性值，不用循环
      var _specificationList = _this.data.specificationList;
      for (var i = 0; i < _specificationList.length; i++) {
        if (_specificationList[i].specification_id == specNameId) {
          for (var j = 0; j < _specificationList[i].valueList.length; j++) {
            if (_specificationList[i].valueList[j].id == specValueId) {
              //如果已经选中，则反选
              if (_specificationList[i].valueList[j].checked) {
                _specificationList[i].valueList[j].checked = false;
              } else {
                _specificationList[i].valueList[j].checked = true;
              }
            } else {
              _specificationList[i].valueList[j].checked = false;
            }
          }
        }
      }
      _this.setData({
        specificationList: _specificationList
      });
      //重新计算spec改变后的信息
      _this.changeSpecInfo();

      //重新计算哪些值不可以点击
    }, _this.getCheckedSpecValue = function () {
      var checkedValues = [];
      var _specificationList = _this.data.specificationList;
      for (var i = 0; i < _specificationList.length; i++) {
        var _checkedObj = {
          nameId: _specificationList[i].specification_id,
          valueId: 0,
          valueText: ''
        };
        for (var j = 0; j < _specificationList[i].valueList.length; j++) {
          if (_specificationList[i].valueList[j].checked) {
            _checkedObj.valueId = _specificationList[i].valueList[j].id;
            _checkedObj.valueText = _specificationList[i].valueList[j].value;
          }
        }
        checkedValues.push(_checkedObj);
      }

      return checkedValues;
    }, _this.setSpecValueStatus = function () {}, _this.isCheckedAllSpec = function () {
      return !_this.getCheckedSpecValue().some(function (v) {
        if (v.valueId == 0) {
          return true;
        }
      });
    }, _this.getCheckedSpecKey = function () {
      var checkedValue = _this.getCheckedSpecValue().map(function (v) {
        return v.valueId;
      });

      return checkedValue.join('_');
    }, _this.changeSpecInfo = function () {
      var checkedNameValue = _this.getCheckedSpecValue();

      //设置选择的信息
      var checkedValue = checkedNameValue.filter(function (v) {
        if (v.valueId != 0) {
          return true;
        } else {
          return false;
        }
      }).map(function (v) {
        return v.valueText;
      });
      if (checkedValue.length > 0) {
        _this.setData({
          checkedSpecText: checkedValue.join('　')
        });
      } else {
        _this.setData({
          checkedSpecText: '请选择规格数量'
        });
      }
    }, _this.getCheckedProductItem = function (key) {
      return _this.data.productList.filter(function (v) {
        if (v.goods_specification_ids == key) {
          return true;
        } else {
          return false;
        }
      });
    }, _this.switchAttrPop = function () {
      if (_this.data.openAttr == false) {
        _this.setData({
          openAttr: !_this.data.openAttr
        });
      }
    }, _this.closeAttr = function () {
      _this.setData({
        openAttr: false
      });
    }, _this.addCannelCollect = function () {
      var that = _this;
      //添加或是取消收藏
      util.request(api.CollectAddOrDelete, { typeId: 0, valueId: _this.data.id }, 'POST').then(function (res) {
        var _res = res;
        if (_res.errno == 0) {
          if (_res.data.type == 'add') {
            that.setData({
              collectBackImage: that.data.hasCollectImage
            });
          } else {
            that.setData({
              collectBackImage: that.data.noCollectImage
            });
          }
        } else {
          _index2.default.showToast({
            image: '/static/images/icon_error.png',
            title: _res.errmsg,
            mask: true
          });
        }
      });
    }, _this.openCartPage = function () {
      _index2.default.switchTab({
        url: '/pages/cart/cart'
      });
    }, _this.addToCart = function () {
      var that = _this;
      if (_this.data.openAttr === false) {
        //打开规格选择窗口
        _this.setData({
          openAttr: !_this.data.openAttr
        });
      } else {
        //提示选择完整规格
        if (!_this.isCheckedAllSpec()) {
          _index2.default.showToast({
            image: '/static/images/icon_error.png',
            title: '请选择规格',
            mask: true
          });
          return false;
        }

        //根据选中的规格，判断是否有对应的sku信息
        var checkedProduct = _this.getCheckedProductItem(_this.getCheckedSpecKey());
        if (!checkedProduct || checkedProduct.length <= 0) {
          //找不到对应的product信息，提示没有库存
          _index2.default.showToast({
            image: '/static/images/icon_error.png',
            title: '库存不足',
            mask: true
          });
          return false;
        }

        //验证库存
        if (checkedProduct.goods_number < _this.data.number) {
          //找不到对应的product信息，提示没有库存
          _index2.default.showToast({
            image: '/static/images/icon_error.png',
            title: '库存不足',
            mask: true
          });
          return false;
        }

        //添加到购物车
        util.request(api.CartAdd, {
          goodsId: _this.data.goods.id,
          number: _this.data.number,
          productId: checkedProduct[0].id
        }, 'POST').then(function (res) {
          var _res = res;
           console.log(res)
          if (_res.errno == 0) {
            _index2.default.showToast({
              title: '添加成功'
            });
            console.log(_res.data)
            that.setData({
              openAttr: !that.data.openAttr,
              cartGoodsCount: _res.data.cartTotal.goodsCount
            });
          } else {
            _index2.default.showToast({
              image: '/static/images/icon_error.png',
              title: _res.errmsg,
              mask: true
            });
          }
        });
      }
    }, _this.cutNumber = function () {
      _this.setData({
        number: _this.data.number - 1 > 1 ? _this.data.number - 1 : 1
      });
    }, _this.addNumber = function () {
      _this.setData({
        number: _this.data.number + 1
      });
    }, _this.config = {}, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(_C, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(_C.prototype.__proto__ || Object.getPrototypeOf(_C.prototype), "_constructor", this).call(this, props);
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount(options) {
      // 页面初始化 options为页面跳转所带来的参数
      this.setData({
        id: parseInt(options.id)
        // id: 1181000
      });
      var that = this;
      this.getGoodsInfo();
      util.request(api.CartGoodsCount).then(function (res) {
        if (res.errno === 0) {
          that.setData({
            cartGoodsCount: res.data.cartTotal.goodsCount
          });
        }
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      // 页面渲染完成
    }
  }, {
    key: "componentDidShow",
    value: function componentDidShow() {
      // 页面显示
    }
  }, {
    key: "componentDidHide",
    value: function componentDidHide() {
      // 页面隐藏
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      // 页面关闭
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      ;

      var _state = this.__state,
          gallery = _state.gallery,
          goods = _state.goods,
          brand = _state.brand,
          comment = _state.comment,
          attribute = _state.attribute,
          goodsDetail = _state.goodsDetail,
          issueList = _state.issueList,
          relatedGoods = _state.relatedGoods,
          openAttr = _state.openAttr,
          productList = _state.productList,
          checkedSpecText = _state.checkedSpecText,
          specificationList = _state.specificationList,
          number = _state.number,
          collectBackImage = _state.collectBackImage,
          cartGoodsCount = _state.cartGoodsCount;

      var anonymousState__temp = "/static/images/address_right.png";
      var anonymousState__temp2 = {
        // wxParseData: goodsDetail.nodes
      };
      var anonymousState__temp3 = "/static/images/icon_close.png";
      var anonymousState__temp4 = "/static/images/ic_menu_shoping_nor.png";
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp,
        anonymousState__temp2: anonymousState__temp2,
        anonymousState__temp3: anonymousState__temp3,
        anonymousState__temp4: anonymousState__temp4
      });
      return this.__state;
    }
  }]);

  return _C;
}(_index2.default.Component), _class2.$$events = ["switchAttrPop", "closeAttr", "clickSkuValue", "cutNumber", "addNumber", "addCannelCollect", "openCartPage", "addToCart"], _temp2)) || _class);

exports.default = _C;

Page(require('../../npm/_tarojs/taro-alipay/index.js').default.createComponent(_C, true));