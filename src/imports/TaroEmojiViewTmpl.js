import { Block, View, Video, Image, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
export default class TaroEmojiViewTmpl extends Taro.Component {
  render() {
    const { data: item } = this.props
    return (
      <Block>
        <View className="WxEmojiView wxParse-inline" style={item.styleStr}>
          {item.textArray.map((item, index) => {
            return (
              <Block key>
                {item.node == 'text' ? (
                  <Block className={item.text == '\\n' ? 'wxParse-hide' : ''}>
                    {item.text}
                  </Block>
                ) : (
                  item.node == 'element' && (
                    <Block>
                      <Image
                        className="wxEmoji"
                        src={item.baseSrc + item.text}
                      />
                    </Block>
                  )
                )}
              </Block>
            )
          })}
        </View>
      </Block>
    )
  }

  static options = {
    addGlobalClass: true
  }
}
