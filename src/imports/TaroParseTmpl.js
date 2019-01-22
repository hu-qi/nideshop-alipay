import TaroParsezTmpl from './TaroParsezTmpl'
import { Block, View, Video, Image, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
export default class TaroParseTmpl extends Taro.Component {
  render() {
    const { data: wxParseData } = this.props
    return (
      <Block>
        {wxParseData.map((item, index) => {
          return (
            <Block key>
              <TaroParsezTmpl data={item} />
            </Block>
          )
        })}
      </Block>
    )
  }

  static options = {
    addGlobalClass: true
  }
}
