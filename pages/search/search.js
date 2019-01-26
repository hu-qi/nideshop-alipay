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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var util = require('../../utils/util.js');
var api = require('../../config/api.js');

var app = _index2.default.getApp();

var _C = (_dec = (0, _index4.default)('Page'), _dec(_class = (_temp2 = _class2 = function (_Taro$Component) {
  _inherits(_C, _Taro$Component);

  function _C() {
    var _ref, _this$state;

    var _temp, _this, _ret;

    _classCallCheck(this, _C);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _C.__proto__ || Object.getPrototypeOf(_C)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["loopArray0", "keyword", "defaultKeyword", "searchStatus", "historyKeyword", "hotKeyword", "helpKeyword", "goodsList", "currentSortType", "currentSortOrder", "categoryFilter", "filterCategory", "keywrod", "page", "size", "categoryId"], _this.state = (_this$state = {
      keywrod: '',
      searchStatus: false,
      goodsList: [],
      helpKeyword: [],
      historyKeyword: [],
      categoryFilter: false,
      currentSortType: 'default',
      currentSortOrder: '',
      filterCategory: [],
      defaultKeyword: {},
      hotKeyword: [],
      page: 1,
      size: 20
    }, _defineProperty(_this$state, "currentSortType", 'id'), _defineProperty(_this$state, "currentSortOrder", 'desc'), _defineProperty(_this$state, "categoryId", 0), _this$state), _this.closeSearch = function () {
      _index2.default.navigateBack();
    }, _this.clearKeyword = function () {
      _this.setData({
        keyword: '',
        searchStatus: false
      });
    }, _this.getSearchKeyword = function () {
      var that = _this;
      util.request(api.SearchIndex).then(function (res) {
        if (res.errno === 0) {
          that.setData({
            historyKeyword: res.data.historyKeywordList,
            defaultKeyword: res.data.defaultKeyword,
            hotKeyword: res.data.hotKeywordList
          });
        }
      });
    }, _this.inputChange = function (e) {
      _this.setData({
        keyword: e.detail.value,
        searchStatus: false
      });
      _this.getHelpKeyword();
    }, _this.getHelpKeyword = function () {
      var that = _this;
      util.request(api.SearchHelper, { keyword: that.data.keyword }).then(function (res) {
        if (res.errno === 0) {
          that.setData({
            helpKeyword: res.data
          });
        }
      });
    }, _this.inputFocus = function () {
      _this.setData({
        searchStatus: false,
        goodsList: []
      });

      if (_this.data.keyword) {
        _this.getHelpKeyword();
      }
    }, _this.clearHistory = function () {
      _this.setData({
        historyKeyword: []
      });

      util.request(api.SearchClearHistory, {}, 'POST').then(function (res) {
        console.log('清除成功');
      });
    }, _this.getGoodsList = function () {
      var that = _this;
      util.request(api.GoodsList, {
        keyword: that.data.keyword,
        page: that.data.page,
        size: that.data.size,
        sort: that.data.currentSortType,
        order: that.data.currentSortOrder,
        categoryId: that.data.categoryId
      }).then(function (res) {
        if (res.errno === 0) {
          that.setData({
            searchStatus: true,
            categoryFilter: false,
            goodsList: res.data.data,
            filterCategory: res.data.filterCategory,
            page: res.data.currentPage,
            size: res.data.numsPerPage
          });
        }

        //重新获取关键词
        that.getSearchKeyword();
      });
    }, _this.onKeywordTap = function (event) {
      _this.getSearchResult(event.target.dataset.keyword);
    }, _this.getSearchResult = function (keyword) {
      _this.setData({
        keyword: keyword,
        page: 1,
        categoryId: 0,
        goodsList: []
      });

      _this.getGoodsList();
    }, _this.openSortFilter = function (event) {
      var currentId = event.currentTarget.id;
      switch (currentId) {
        case 'categoryFilter':
          _this.setData({
            categoryFilter: !_this.data.categoryFilter,
            currentSortOrder: 'asc'
          });
          break;
        case 'priceSort':
          var tmpSortOrder = 'asc';
          if (_this.data.currentSortOrder == 'asc') {
            tmpSortOrder = 'desc';
          }
          _this.setData({
            currentSortType: 'price',
            currentSortOrder: tmpSortOrder,
            categoryFilter: false
          });

          _this.getGoodsList();
          break;
        default:
          //综合排序
          _this.setData({
            currentSortType: 'default',
            currentSortOrder: 'desc',
            categoryFilter: false
          });
          _this.getGoodsList();
      }
    }, _this.selectCategory = function (event) {
      var currentIndex = event.target.dataset.categoryIndex;
      var filterCategory = _this.data.filterCategory;
      var currentCategory = null;
      for (var key in filterCategory) {
        if (key == currentIndex) {
          filterCategory[key].selected = true;
          currentCategory = filterCategory[key];
        } else {
          filterCategory[key].selected = false;
        }
      }
      _this.setData({
        filterCategory: filterCategory,
        categoryFilter: false,
        categoryId: currentCategory.id,
        page: 1,
        goodsList: []
      });
      _this.getGoodsList();
    }, _this.onKeywordConfirm = function (event) {
      _this.getSearchResult(event.detail.value);
    }, _this.config = {}, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(_C, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(_C.prototype.__proto__ || Object.getPrototypeOf(_C.prototype), "_constructor", this).call(this, props);
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      this.getSearchKeyword();
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      ;

      var _state = this.__state,
          keyword = _state.keyword,
          defaultKeyword = _state.defaultKeyword,
          searchStatus = _state.searchStatus,
          historyKeyword = _state.historyKeyword,
          hotKeyword = _state.hotKeyword,
          helpKeyword = _state.helpKeyword,
          goodsList = _state.goodsList,
          currentSortType = _state.currentSortType,
          currentSortOrder = _state.currentSortOrder,
          categoryFilter = _state.categoryFilter,
          filterCategory = _state.filterCategory;

      var loopArray0 = searchStatus && goodsList.length ? filterCategory.map(function (item, index) {
        item = {
          $original: (0, _index.internal_get_original)(item)
        };
        var $loopState__temp2 = searchStatus && goodsList.length ? 'cate-' + item.$original.id : null;
        return {
          $loopState__temp2: $loopState__temp2,
          $original: item.$original
        };
      }) : [];
      Object.assign(this.__state, {
        loopArray0: loopArray0,
        keyword: keyword
      });
      return this.__state;
    }
  }]);

  return _C;
}(_index2.default.Component), _class2.$$events = ["inputChange", "inputFocus", "onKeywordConfirm", "clearKeyword", "closeSearch", "clearHistory", "onKeywordTap", "openSortFilter", "selectCategory"], _temp2)) || _class);

exports.default = _C;

Page(require('../../npm/_tarojs/taro-alipay/index.js').default.createComponent(_C, true));