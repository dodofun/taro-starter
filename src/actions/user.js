/***
 * ACTIONS
 */
import http from '../service/http'
import * as api from '../const/api'

export const getWxUserInfo = async payload => {
  let result = await http.post(api.GET_WX_USERINFO, payload)
  return result.data.body.data
}
