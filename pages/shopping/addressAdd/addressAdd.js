"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _class, _class2, _temp2;

var _index = require("../../../npm/_tarojs/taro-alipay/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../../npm/_tarojs/with-weapp/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = _index2.default.getApp();

var _C = (_dec = (0, _index4.default)('Page'), _dec(_class = (_temp2 = _class2 = function (_Taro$Component) {
  _inherits(_C, _Taro$Component);

  function _C() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, _C);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _C.__proto__ || Object.getPrototypeOf(_C)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["address", "openSelectRegion", "regionType", "selectRegionList", "selectRegionDone", "regionList", "addressId"], _this.state = {
      address: {
        id: 0,
        province_id: 0,
        city_id: 0,
        district_id: 0,
        address: '',
        full_region: '',
        name: '',
        mobile: '',
        is_default: 0
      },
      addressId: 0,
      openSelectRegion: false,
      selectRegionList: [{ id: 0, name: '省份', parent_id: 1, type: 1 }, { id: 0, name: '城市', parent_id: 1, type: 2 }, { id: 0, name: '区县', parent_id: 1, type: 3 }],
      regionType: 1,
      regionList: [],
      selectRegionDone: false
    }, _this.bindinputMobile = function (event) {
      var address = _this.data.address;
      address.mobile = event.detail.value;
      _this.setData({
        address: address
      });
    }, _this.bindinputName = function (event) {
      var address = _this.data.address;
      address.name = event.detail.value;
      _this.setData({
        address: address
      });
    }, _this.bindinputAddress = function (event) {
      var address = _this.data.address;
      address.address = event.detail.value;
      _this.setData({
        address: address
      });
    }, _this.bindIsDefault = function () {
      var address = _this.data.address;
      address.is_default = !address.is_default;
      _this.setData({
        address: address
      });
    }, _this.getAddressDetail = function () {
      var that = _this;
      util.request(api.AddressDetail, { id: that.data.addressId }).then(function (res) {
        if (res.errno === 0) {
          that.setData({
            address: res.data
          });
        }
      });
    }, _this.setRegionDoneStatus = function () {
      var that = _this;
      var doneStatus = that.data.selectRegionList.every(function (item) {
        return item.id != 0;
      });

      that.setData({
        selectRegionDone: doneStatus
      });
    }, _this.chooseRegion = function () {
      var that = _this;
      console.log(_this.data.openSelectRegion)
      _this.setData({
        openSelectRegion: !_this.data.openSelectRegion
      });

      //设置区域选择数据
      var address = _this.data.address;
      if (address.province_id > 0 && address.city_id > 0 && address.district_id > 0) {
        var selectRegionList = _this.data.selectRegionList;
        selectRegionList[0].id = address.province_id;
        selectRegionList[0].name = address.province_name;
        selectRegionList[0].parent_id = 1;

        selectRegionList[1].id = address.city_id;
        selectRegionList[1].name = address.city_name;
        selectRegionList[1].parent_id = address.province_id;

        selectRegionList[2].id = address.district_id;
        selectRegionList[2].name = address.district_name;
        selectRegionList[2].parent_id = address.city_id;

        _this.setData({
          selectRegionList: selectRegionList,
          regionType: 3
        });

        _this.getRegionList(address.city_id);
      } else {
        _this.setData({
          selectRegionList: [{ id: 0, name: '省份', parent_id: 1, type: 1 }, { id: 0, name: '城市', parent_id: 1, type: 2 }, { id: 0, name: '区县', parent_id: 1, type: 3 }],
          regionType: 1
        });
        _this.getRegionList(1);
      }

      _this.setRegionDoneStatus();
    }, _this.selectRegionType = function (event) {
      var that = _this;
      var regionTypeIndex = event.target.dataset.regionTypeIndex;
      var selectRegionList = that.data.selectRegionList;

      //判断是否可点击
      if (regionTypeIndex + 1 == _this.data.regionType || regionTypeIndex - 1 >= 0 && selectRegionList[regionTypeIndex - 1].id <= 0) {
        return false;
      }

      _this.setData({
        regionType: regionTypeIndex + 1
      });

      var selectRegionItem = selectRegionList[regionTypeIndex];

      _this.getRegionList(selectRegionItem.parent_id);

      _this.setRegionDoneStatus();
    }, _this.selectRegion = function (event) {
      var that = _this;
      var regionIndex = event.target.dataset.regionIndex;
      var regionItem = _this.data.regionList[regionIndex];
      var regionType = regionItem.type;
      var selectRegionList = _this.data.selectRegionList;
      selectRegionList[regionType - 1] = regionItem;

      if (regionType != 3) {
        _this.setData({
          selectRegionList: selectRegionList,
          regionType: regionType + 1
        });
        _this.getRegionList(regionItem.id);
      } else {
        _this.setData({
          selectRegionList: selectRegionList
        });
      }

      //重置下级区域为空
      selectRegionList.map(function (item, index) {
        if (index > regionType - 1) {
          item.id = 0;
          item.name = index == 1 ? '城市' : '区县';
          item.parent_id = 0;
        }
        return item;
      });

      _this.setData({
        selectRegionList: selectRegionList
      });

      that.setData({
        regionList: that.data.regionList.map(function (item) {
          //标记已选择的
          if (that.data.regionType == item.type && that.data.selectRegionList[that.data.regionType - 1].id == item.id) {
            item.selected = true;
          } else {
            item.selected = false;
          }

          return item;
        })
      });

      _this.setRegionDoneStatus();
    }, _this.doneSelectRegion = function () {
      if (_this.data.selectRegionDone === false) {
        return false;
      }

      var address = _this.data.address;
      var selectRegionList = _this.data.selectRegionList;
      address.province_id = selectRegionList[0].id;
      address.city_id = selectRegionList[1].id;
      address.district_id = selectRegionList[2].id;
      address.province_name = selectRegionList[0].name;
      address.city_name = selectRegionList[1].name;
      address.district_name = selectRegionList[2].name;
      address.full_region = selectRegionList.map(function (item) {
        return item.name;
      }).join('');

      _this.setData({
        address: address,
        openSelectRegion: false
      });
    }, _this.cancelSelectRegion = function () {
      _this.setData({
        openSelectRegion: false,
        regionType: _this.data.regionDoneStatus ? 3 : 1
      });
    }, _this.getRegionList = function (regionId) {
      var that = _this;
      var regionType = that.data.regionType;
      util.request(api.RegionList, { parentId: regionId }).then(function (res) {
        if (res.errno === 0) {
          that.setData({
            regionList: res.data.map(function (item) {
              //标记已选择的
              if (regionType == item.type && that.data.selectRegionList[regionType - 1].id == item.id) {
                item.selected = true;
              } else {
                item.selected = false;
              }

              return item;
            })
          });
        }
      });
    }, _this.cancelAddress = function () {
      _index2.default.reLaunch({
        url: '/pages/shopping/address/address'
      });
    }, _this.saveAddress = function () {
      console.log(_this.data.address);
      var address = _this.data.address;

      if (address.name == '') {
        util.showErrorToast('请输入姓名');

        return false;
      }

      if (address.mobile == '') {
        util.showErrorToast('请输入手机号码');
        return false;
      }

      if (address.district_id == 0) {
        util.showErrorToast('请输入省市区');
        return false;
      }

      if (address.address == '') {
        util.showErrorToast('请输入详细地址');
        return false;
      }

      var that = _this;
      util.request(api.AddressSave, {
        id: address.id,
        name: address.name,
        mobile: address.mobile,
        province_id: address.province_id,
        city_id: address.city_id,
        district_id: address.district_id,
        address: address.address,
        is_default: address.is_default
      }, 'POST').then(function (res) {
        if (res.errno === 0) {
          _index2.default.reLaunch({
            url: '/pages/shopping/address/address'
          });
        }
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
      console.log(options);
      if (options.id) {
        this.setData({
          addressId: options.id
        });
        this.getAddressDetail();
      }

      this.getRegionList(1);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {}
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
          address = _state.address,
          openSelectRegion = _state.openSelectRegion,
          regionType = _state.regionType,
          selectRegionList = _state.selectRegionList,
          selectRegionDone = _state.selectRegionDone,
          regionList = _state.regionList;

      Object.assign(this.__state, {});
      return this.__state;
    }
  }]);

  return _C;
}(_index2.default.Component), _class2.$$events = ["bindinputName", "bindinputMobile", "chooseRegion", "bindinputAddress", "bindIsDefault", "cancelAddress", "saveAddress", "selectRegionType", "doneSelectRegion", "selectRegion", "cancelSelectRegion"], _temp2)) || _class);

exports.default = _C;

Page(require('../../../npm/_tarojs/taro-alipay/index.js').default.createComponent(_C, true));