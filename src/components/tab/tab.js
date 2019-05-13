/* eslint-disable no-unused-vars */
import Taro, { Component } from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'
import { observable } from 'mobx';
import {observer, inject} from '@tarojs/mobx'

import './tab.scss'


@inject('demoStore')
@observer
class Tab extends Component {

  @observable name = 'Tab Component';
  
  constructor (props) {
    super(props)
    this.store = props.demoStore
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentWillReceiveProps () { }

  render () {
    return (
      <View className='tab'>
        Name: {this.store.name}
      </View>
    )
  }
}
