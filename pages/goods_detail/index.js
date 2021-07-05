import {
  request
} from '../../request/index'
Page({
  data: {
    // 购物车
    cart: [],
    // 商品详情
    goodDetail: {},
    // 购物车数量
    cartCount: 0
  },
  onLoad(options) {
    this.getGoodDetail(options)
    this.getCartCount()
  },
  // 获取详情
  getGoodDetail(options) {
    const {
      goods_id
    } = options
    request({
      url: `/goods/detail?goods_id=${goods_id}`
    }).then(result => {
      const goodDetail = result.data.message
      this.setData({
        goodDetail
      })
    })
  },
  // 图片预览
  onPreview(e) {
    const pics = this.data.goodDetail.pics
    const urls = []
    const {
      src: current
    } = e.target.dataset
    pics.forEach(element => {
      urls.push(element.pics_mid)
    });
    wx.previewImage({
      urls,
      current
    })
  },
  // 获取购物车数量
  getCartCount() {
    const cart = wx.getStorageSync('cart') || []
    if(!cart.length){
      this.setData({
        cartCount: 0
      })
      return
    }
    let cartCount = 0
    cart.forEach(item => {
      cartCount += item.count
    })
    this.setData({
      cartCount
    })
  },
  // 加入购物车
  onAddCart() {
    const cart = wx.getStorageSync('cart') || []
    const {
      goodDetail
    } = this.data
    const findCart = cart.find(item => {
      return item.goods_id === goodDetail.goods_id
    })
    if(findCart) {
      findCart.count++
    }else{
      cart.push({
        ...goodDetail,
        count: 1
      })
    }
    wx.setStorageSync('cart', cart)
    this.getCartCount()
  },
  // 跳转购物车
  onCart() {
    wx.switchTab({
      url: '../cart/index',
    })
  },
  // 店铺
  onShop() {
    wx.showToast({
      icon: 'error',
      mask: true,
      title: '暂未开放'
    })
  }
})