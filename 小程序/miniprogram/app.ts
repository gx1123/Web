//app.ts
import { dev as domain, Env } from './utils/env/env'
import api from './utils/api/api'
import VApi from './utils/api/apiVerifier'
export interface IMyApp {
  globalData: {
    location: wx.GetLocationSuccessCallbackResult,
    readonly sysMark: string,
    readonly domain: Env,
    systemInfo: wx.GetSystemInfoSuccessCallbackResult
  }
  readonly $service: VApi
   /**
   * 微信更新机制
   */
  getUpdateManager(): void
  /**
   * 获取支付所需参数（我猜的）
   */
  getWxPayInfo(): void
  /**
   * 设置购物车数量 
   */
  setShoppingNum(num: number): void
   /**
   * 获取购物车数量
   */
  getShoppingNum(): void
  /**
   * 用户是否被禁用
   */
  isForbidden(): void
}
App<IMyApp>({
  globalData: {
    domain,   // all域名
    location: {} as wx.GetLocationSuccessCallbackResult,   // 当前位置信息
    sysMark: 'newddc',   // 服务请求来源表示 newddc 代表优鲜
    systemInfo: {} as wx.GetSystemInfoSuccessCallbackResult  // 设备信息
  },
  $service: api(domain),  // 服务接口
  onLaunch() {
    // 微信更新机制
    this.getUpdateManager()
    // 获取当前经纬度 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
    wx.getLocation({
      type: 'wgs84',
      success: res => {
        this.globalData.location = res
      }
    })
    // 获取设备信息
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.systemInfo = res
      }
    });
    // 获取用户相关信息
    let token = wx.getStorageSync("token")
    if (!token) {
      this.getWxPayInfo()
    } else {
      this.getShoppingNum()
    }
  },
  isForbidden() {
    let token: string = wx.getStorageSync("token") || ''
    let params = {
      Authorization: token
    }
    this.$service.apiIsForbidden(params).then((res: any) => {
      if (res.data.status === 403) {
        wx.removeStorageSync("token")
        wx.showToast({
          title: '该账号已被禁用',
          icon: 'none'
        })
      }
    })
  },
  getWxPayInfo() {
    wx.login({
      success: res => {
        if (res.code) {
          this.$service.apiGetWxPayInfo(res.code).then((tokenInfo: any) => {
            wx.setStorageSync('wxPayInfo', tokenInfo.data.result)
          })
        }
      }
    })
  },
  getShoppingNum() {
    this.$service.apiGetShoppingNum().then((res: any) => {
      if (res.data) {
        this.setShoppingNum(res.data.allBuyNum)
      }
    })
  },
  setShoppingNum(num) {
    if (num > 0 && num <= 99) {
      wx.setTabBarBadge({
        index: 2,
        text: `${num}`
      })
    } else if (num > 99) {
      wx.setTabBarBadge({
        index: 2,
        text: '99+'
      })
    } else {
      wx.removeTabBarBadge({
        index: 2
      })
    }
  },
  getUpdateManager() {
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                if (res.confirm) {
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            wx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
            })
          })
        }
      })
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  }
})