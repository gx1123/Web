type Method = "OPTIONS" | "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT" | undefined

export default function myRequest(url: string, method: Method , data?: object): Promise<object> {
  wx.showLoading({
    title: '加载中'
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      method,
      data,
      success: (res) => {
        wx.hideLoading()
        resolve(res)
      },
      fail: err => {
        wx.hideLoading()
        wx.showToast({
          title: '出错了!',
          icon: 'none'
        })
        reject(err)
      },
      complete: () => {
       
      }
    })
  })
}