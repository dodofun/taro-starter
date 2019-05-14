import Taro, {Component} from '@tarojs/taro'
import {View, Button, Text} from '@tarojs/components'
import {observer, inject} from '@tarojs/mobx'
import {observable} from 'mobx'
import dayjs from 'dayjs'
import { AtFab } from 'taro-ui'

import './index.scss'
import Tab from '../../components/tab/tab'

@inject('demoStore')
@observer
export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  @observable date = new Date()
  @observable timerID = 0
  @observable showText = 'Hello World'
  
  constructor (props) {
    super(props)
    this.store = props.demoStore
  }
  
  componentWillMount() {
    clearInterval(this.timerID)
  }

  componentWillReact() {
    // console.log('componentWillReact', this.props)
  }

  componentDidMount() {
    let that = this
    this.timerID = setInterval(
      () => that.date = new Date(),
      1000
    );
  }

  // 在已经装载的组件接收到新属性前调用
  componentWillReceiveProps() {}
  
  shouldComponentUpdate(nextProps, nextState) {}

  componentWillUpdate(nextProps, nextState) {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  onPullDownRefresh() {}

  onReachBottom() {}

  onPageScroll(res) {
    console.log(res.scrollTop)
  }

  onShareAppMessage(res) {
    let {from, target, webViewUrl} = res
    return {
      title: '',
      path: '',
      imageUrl: ''
    }
  }

  getName = () => {
    this.showText = this.store.fullName
  }

  getAge = (num, e) => {
    console.log('getAge num', num, e)
    this.showText = this.store.age + num
  }

  getId = async (num, e) => {
    console.log('getId num', num, e)
    this.showText = await this.store.getId()
  }

  render() {
    const {demoStore: {fullName}} = this.props
    return (
      <View className='index'>
        <Text>现在的时间是 {dayjs(this.date).format('YYYY-MM-DD HH:mm:ss')}</Text>
        <Button onClick={this.getName}>姓名</Button>
        <Button onClick={this.getAge.bind(this, 2)}>两年后年龄</Button>
        <Button onClick={this.getId.bind(this, 2)}>异步获取ID</Button>
        <Text>{this.showText}</Text>
        <Tab />

        <AtFab>
          <Text className='at-fab__icon at-icon at-icon-menu'></Text>
        </AtFab>
        
      </View>
    )
  }
}
