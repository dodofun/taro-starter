/***
 * ACTIONS
 */
import http from '../service/http'
import * as api from '../const/api'

export const getId = async payload => {
  console.log('payload', payload)
  let result = await http.get(api.CREATE_ID)
  console.log('result2', result)
  return result.data.body.data
}
