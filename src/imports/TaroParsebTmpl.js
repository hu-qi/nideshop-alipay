import TaroEmojiViewTmpl from './TaroEmojiViewTmpl'
import TaroParseImgTmpl from './TaroParseImgTmpl'
import TaroParseVideoTmpl from './TaroParseVideoTmpl'
import TaroParsecTmpl from './TaroParsecTmpl'
import { Block, View, Video, Image, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
export default class TaroParsebTmpl extends Taro.Component {
  render() {
    const { data: item } = this.props
    return (
      <Block>
        {/* <template is="wxParse3" data="{{item}}" /> */}
        {/* 判断是否是标签节点 */}
        {item.node == 'element' ? (
          <Block>
            {item.tag == 'button' ? (
              <Block>
                <Button type="default" size="mini">
                  {item.nodes.map((item, index) => {
                    return (
                      <Block key>
                        <TaroParsecTmpl data={item} />
                      </Block>
                    )
                  })}
                </Button>
              </Block>
            ) : item.tag == 'li' ? (
              <Block>
                <View className={item.classStr + ' wxParse-li'}>
                  <View className={item.classStr + ' wxParse-li-inner'}>
                    <View className={item.classStr + ' wxParse-li-text'}>
                      <View className={item.classStr + ' wxParse-li-circle'} />
                    </View>
                    <View className={item.classStr + ' wxParse-li-text'}>
                      {item.nodes.map((item, index) => {
                        return (
                          <Block key>
                            <TaroParsecTmpl data={item} />
                          </Block>
                        )
                      })}
                    </View>
                  </View>
                </View>
              </Block>
            ) : item.tag == 'video' ? (
              <Block>
                <TaroParseVideoTmpl data={item} />
              </Block>
            ) : item.tag == 'img' ? (
              <Block>
                <TaroParseImgTmpl data={item} />
              </Block>
            ) : item.tag == 'a' ? (
              <Block>
                <View
                  onClick={this.wxParseTagATap}
                  className={
                    'wxParse-inline ' + item.classStr + ' wxParse-' + item.tag
                  }
                  data-src={item.attr.href}
                  style={item.styleStr}
                >
                  {item.nodes.map((item, index) => {
                    return (
                      <Block key>
                        <TaroParsecTmpl data={item} />
                      </Block>
                    )
                  })}
                </View>
              </Block>
            ) : item.tagType == 'block' ? (
              <Block>
                <View
                  className={item.classStr + ' wxParse-' + item.tag}
                  style={item.styleStr}
                >
                  {item.nodes.map((item, index) => {
                    return (
                      <Block key>
                        <TaroParsecTmpl data={item} />
                      </Block>
                    )
                  })}
                </View>
              </Block>
            ) : (
              <View
                className={
                  item.classStr +
                  ' wxParse-' +
                  item.tag +
                  ' wxParse-' +
                  item.tagType
                }
                style={item.styleStr}
              >
                {item.nodes.map((item, index) => {
                  return (
                    <Block key>
                      <TaroParsecTmpl data={item} />
                    </Block>
                  )
                })}
              </View>
            )}
            {/* li类型 */}
            {/* video类型 */}
            {/* img类型 */}
            {/* a类型 */}
            {/* 其他块级标签 */}
            {/* 内联标签 */}
          </Block>
        ) : (
          item.node == 'text' && (
            <Block>
              {/* 如果是，直接进行 */}
              <TaroEmojiViewTmpl data={item} />
            </Block>
          )
        )}
        {/* 判断是否是文本节点 */}
      </Block>
    )
  }

  static options = {
    addGlobalClass: true
  }
}
