import Taro from '@tarojs/taro'
import dayjs from 'dayjs'

const logError = (name, action, info) => {
  info = info || ''

  let device = ''
  
  try {
    let deviceInfo = Taro.getSystemInfoSync()
    device = JSON.stringify(deviceInfo)
  } catch (e) {
    console.error('not support getSystemInfoSync api', e.message)
  }

  let time = dayjs().format('YYYY-MM-DD HH:mm:ss')
  
  if (typeof info === 'object') {
    info = JSON.stringify(info)
  }

  if (process.env.NODE_ENV === 'production') {
    // TODO 上报日志系统
    console.error(time, name, action, info, device)
  } else {
    console.error(time, name, action, info, device)
  }
  
}

export default logError
