Page({
  data: {
    cart: [],
    totalPrice: 0,
    allChecked: true,
    address: ''
  },
  onLoad() {
    this.getAddress()
  },
  onShow() {
    this.getCart()
    this.getTotalPrice()
  },
  // 获取cart商品
  getCart() {
    const cart = wx.getStorageSync('cart') || []
    cart.map(item => {
      item.checked = true
    })
    this.setData({
      cart
    })
  },
  // 获取价格
  getTotalPrice() {
    const cart = this.data.cart
    if (!cart.length) {
      this.setData({
        price: 0
      })
      return
    }
    let totalPrice = 0
    cart.forEach(item => {
      if (item.checked) {
        totalPrice += (item.count * item.goods_price)
      }
    })
    this.setData({
      totalPrice: totalPrice * 100
    })
  },
  // 数量增减
  onChange(event) {
    const {
      detail,
      target
    } = event
    const {
      id
    } = target.dataset
    const cart = this.data.cart
    const findGood = cart.find(item => item.goods_id === id)
    findGood.count = detail
    this.setData({
      cart
    })
    this.getTotalPrice()
  },
  //
  onChecked(event) {
    const {
      detail: checked
    } = event
    const {
      good
    } = event.target.dataset
    const cart = this.data.cart
    const findGood = cart.find(item => item.goods_id === good.goods_id)
    findGood.checked = checked
    const allChecked = cart.every(item => item.checked)
    this.setData({
      cart,
      allChecked
    })
    this.getTotalPrice()
  },
  onAllChecked({
    detail
  }) {
    const cart = this.data.cart
    cart.map(item => {
      item.checked = detail
    })
    this.setData({
      allChecked: detail,
      cart
    })
    this.getTotalPrice()
  },
  // 删除
  onDelete(event) {
    const {
      id
    } = event.target.dataset
    wx.showModal({
      title: '提示',
      content: '该操作删除后不可恢复，确定继续操作吗？',
      success: res => {
        if (res.confirm) {
          const cart = this.data.cart
          const goodIndex = cart.findIndex(item => item.goods_id === id)
          cart.splice(goodIndex, 1)
          this.setData({
            cart
          })
          this.getTotalPrice()
          wx.setStorageSync('cart', cart)
        }
      }
    })
  },
  // 地址
  getAddress() {
    const address = wx.getStorageSync('address')
    if(address) {
      this.setData({
        address
      })
    }
  },
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
  onClickButton() {
    wx.navigateTo({
      url: '../pay/index',
    })
  }
})