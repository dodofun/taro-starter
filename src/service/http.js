import Taro from '@tarojs/taro'
import {HTTP_STATUS} from '../const/status'
import logError from '../utils/error'
import interceptor from './interceptor'

export default {
  baseOptions(params, method = 'GET') {
    let {url, data} = params

    let token = Taro.getStorageSync('token')
    let contentType = 'application/json'
    contentType = params.contentType || contentType

    const option = {
      isShowLoading: false,
      loadingText: 'Loading...',
      url: url,
      data: data,
      method: method,
      header: {'content-type': contentType, 'X-Litemall-Token': token, 'Accept': 'application/json'},
      success(res) {
        if (res.statusCode === HTTP_STATUS.SUCCESS) {
          return res.data
        } else if (res.statusCode >= HTTP_STATUS.SERVER_ERROR) {
          return logError('api', '服务端错误')
        } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
          return logError('api', '没有权限')
        } else if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
          return logError('api', '资源不存在')
        }
      },
      error(e) {
        logError('api', '请求接口出现问题', e)
      }
    }
    
    if (process.env.TARO_ENV === 'weapp') {

      // 添加拦截器
      if (process.env.NODE_ENV !== 'production') {
        console.log('Taro.interceptors', Taro.interceptors, Taro)
        // 打印请求
        Taro.addInterceptor(Taro.interceptors.logInterceptor)
      }
      // 请求超时
      Taro.addInterceptor(Taro.interceptors.timeoutInterceptor)
      // 自定义拦截器
      // Taro.addInterceptor(interceptor)
      
    }

    return Taro.request(option)
  },
  get(url, data = '') {
    let params = {url, data}
    return this.baseOptions(params)
  },
  post(url, data, contentType) {
    let params = {url, data, contentType}
    return this.baseOptions(params, 'POST')
  },
  put(url, data, contentType) {
    let params = {url, data, contentType}
    return this.baseOptions(params, 'PUT')
  },
  del(url, data = '') {
    let params = {url, data}
    return this.baseOptions(params, 'DELETE')
  }
}
