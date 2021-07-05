import { request } from '../../request/index'
Page({
  data: {
    isLogin: false,
    token: null
  },
  onShow() {
    this.getToken()
  },
  getToken() {
    const token = wx.getStorageSync('token')
    this.setData({
      isLogin: token ? true : false
    })
  },
  onLogin() {
    wx.login({
      success: (result) => {
        const { code } = result
        if(code) {
          wx.getUserInfo({
            success: (result) => {
              const { encryptedData, iv, rawData, signature } = result
              const params = { encryptedData, iv, rawData, signature, code }
              this.setData({
                isLogin: true
              })
              wx.setStorageSync('token', 'token')
              request({
                url: '/users/wxlogin',
                method: 'POST',
                data: params,
                success: data => {
                  this.setData({
                    token: data
                  })
                }
              })
            }
          })
        }
      }
    })
  },
  // 收获地址
  onAddress() {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.address']) {
          wx.chooseAddress({
            success: res => {
              const address = {
                ...res
              }
              this.setData({
                address
              })
              wx.setStorageSync('address', address)
            }
          })
        } else {
          if (res.authSetting['scope.address'] == false) {
            wx.openSetting({
              success(res) {
                console.log(res.authSetting)
              }
            })
          } else {
            wx.chooseAddress({
              success: res => {
                const address = {
                  ...res
                }
                this.setData({
                  address
                })
                wx.setStorageSync('address', address)
              }
            })
          }
        }
      }
    })
  },
  // 退出登录
  onLogout() {
    wx.setStorageSync('token', false)
    this.getToken()
  }
})