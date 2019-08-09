import { Env } from '../env/env'
import myRequest from '../myRequest/myRequest'
import VApi from './apiVerifier'
const api = (domain: Env): VApi => {
  let { cloudhost, omsurl, baseinfo } = domain
  return {
    apiGetWxPayInfo(code) {
      return myRequest(`${cloudhost}v2/baseinfo/wechat/small/openid/${code}`, 'GET')
    },
    apiGetShoppingNum() {
      return myRequest(`${omsurl}app/cart`, 'GET')
    },
    apiIsForbidden(params) {
      return myRequest(`${baseinfo}open/customer/status`, 'POST', params)
    }
  }
}
export default api