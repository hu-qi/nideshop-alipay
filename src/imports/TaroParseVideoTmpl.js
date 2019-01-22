import { Block, View, Video, Image, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
export default class TaroParseVideoTmpl extends Taro.Component {
  render() {
    const { data: item } = this.props
    return (
      <Block>
        {/* 增加video标签支持，并循环添加 */}
        <View
          className={item.classStr + ' wxParse-' + item.tag}
          style={item.styleStr}
        >
          <Video
            className={item.classStr + ' wxParse-' + item.tag + '-video'}
            src={item.attr.src}
          />
        </View>
      </Block>
    )
  }

  static options = {
    addGlobalClass: true
  }
}
