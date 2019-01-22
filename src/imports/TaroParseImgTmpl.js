import { Block, View, Video, Image, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
export default class TaroParseImgTmpl extends Taro.Component {
  render() {
    const { data: item } = this.props
    return (
      <Block>
        <Image
          className={item.classStr + ' wxParse-' + item.tag}
          data-from={item.from}
          data-src={item.attr.src}
          data-idx={item.imgIndex}
          src={item.attr.src}
          mode="aspectFit"
          onLoad={this.wxParseImgLoad}
          onClick={this.wxParseImgTap}
          style={
            'width:' +
            item.width +
            'px;height:' +
            item.height +
            'px;' +
            item.attr.style
          }
        />
      </Block>
    )
  }

  static options = {
    addGlobalClass: true
  }
}
