import Taro from "@tarojs/taro";

export async function login() {
  // 判断用户是否登录
  let logined = Taro.getStorageSync('userInfo') && Taro.getStorageSync('token')

  if (logined) {
    // 已登录
    // 检查登录状态是否过期
    let hasSession = await Taro.checkSession()
    // 未过期
    if (hasSession) {
      return Taro.getStorageSync('userInfo')
    }
  }

  // 登录状态过期，或未登录时，继续登录
  let codeData = await Taro.login()  // code = codeData.code
  // 获取用户信息 {userInfo, rawData, signature, encryptedData, iv, cloudID}
  let res = await Taro.getUserInfo({withCredentials: true, lang: 'zh_CN'})

  // 通过code和加密数据，换取用户信息
  let userInfo = await getUserInfo({...res, ...codeData})
  // 存储用户信息
  Taro.setStorageSync('userInfo', userInfo)

}
