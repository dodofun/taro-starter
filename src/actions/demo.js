/***
 * ACTIONS
 */
import http from '../service/api'

export default http

export const getId = async payload => {
  console.log('payload', payload)
  let result = await http.get('https://portal.weiwuu.com/id')
  console.log('result2', result)
  return result.data.body.data
}
