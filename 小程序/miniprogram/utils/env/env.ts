export interface Env {
  readonly hosturl: string
  readonly omsurl: string
  readonly cloudhost: string
  readonly erphost: string
  readonly tmshost: string
  readonly baseinfo: string
}
export const dev: Env = {
  hosturl: "https://devnewmall.91youxian.com/", //亿成
  omsurl: 'https://dev.oms.91youxian.com/',
  cloudhost: "https://devnewcloud.91youxian.net/", //云端
  erphost: 'https://deverp.91youxian.com/', //ERP
  tmshost: 'https://devtms.91youxian.com/index.php/', //冷链物流
  baseinfo: 'http://devbaseinfo.91youxian.com:8080/'
}
export const beta: Env = {
  hosturl: "https://betabossmall.91youxian.com/", //亿成
  cloudhost: "https://betabosscloud.91youxian.net/", //云端
  erphost: 'https://betaboss.91youxian.com/', //ERP
  omsurl: 'https://beta.oms.91youxian.com/',
  tmshost: 'https://betatms.91youxian.com/index.php/', //冷链物流
  baseinfo: 'http://betabaseinfo.91youxian.com:8080/'
}
export const official: Env = {
  hosturl: "https://betabossmall.91youxian.com/", //亿成
  cloudhost: "https://betabosscloud.91youxian.net/", //云端
  erphost: 'https://betaboss.91youxian.com/', //ERP
  omsurl: 'https://beta.oms.91youxian.com/',
  tmshost: 'https://betatms.91youxian.com/index.php/', //冷链物流
  baseinfo: 'http://betabaseinfo.91youxian.com:8080/'
}