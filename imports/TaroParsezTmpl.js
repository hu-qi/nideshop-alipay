"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2;

var _index = require("../npm/_tarojs/taro-alipay/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TaroParsezTmpl = (_temp2 = _class = function (_Taro$Component) {
  _inherits(TaroParsezTmpl, _Taro$Component);

  function TaroParsezTmpl() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TaroParsezTmpl);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TaroParsezTmpl.__proto__ || Object.getPrototypeOf(TaroParsezTmpl)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["data"], _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TaroParsezTmpl, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(TaroParsezTmpl.prototype.__proto__ || Object.getPrototypeOf(TaroParsezTmpl.prototype), "_constructor", this).call(this, props);
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      ;

      var item = this.__props.data;

      Object.assign(this.__state, {});
      return this.__state;
    }
  }]);

  return TaroParsezTmpl;
}(_index2.default.Component), _class.$$events = ["wxParseTagATap"], _class.options = {
  addGlobalClass: true
}, _temp2);
exports.default = TaroParsezTmpl;

Component(require('../npm/_tarojs/taro-alipay/index.js').default.createComponent(TaroParsezTmpl));