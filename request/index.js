let requestCount = 0
export const request = params => {
  return new Promise((resolve,reject)=>{
    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";
    // 加载动画
    requestCount++
    wx.showLoading({
      title: '加载中···'
    })
    wx.request({
        ...params,
        url: baseUrl + params.url,
        success: (result) => {
            resolve(result); 
        },
        fail: (error) => {
            reject(error);
        },
        complete: () => {
            requestCount--
            if(!requestCount) {
                wx.hideLoading()
            }
        }
    })
  })
}