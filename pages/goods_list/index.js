import { request } from '../../request/index'
Page({
  data: {
    goodList: [],
    cid: null,
    currentPage: 1,
    totalPage: 0,
  },
  onLoad(options) {
    this.setData({
      cid: options.cid
    })
    this.getGoodList()
  },
  getGoodList(pagenum = 1, pagesize = 10) {
    const { cid } = this.data
    request({
      url: `/goods/search?cid=${cid}&pagenum=${pagenum}&pagesize=${pagesize}`
    }).then(result => {
      const { goods, pagenum, total } = result.data.message
      this.setData({
        goodList: this.data.goodList.concat(goods),
        totalPage: Math.ceil(total/10)
      })
    })
  },
  onFocus() {
    wx.navigateTo({
      url: '../search/index'
    })
  },
  onJump(event) {
    const { goods_id } = event.target.dataset
    wx.navigateTo({
      url: `../goods_detail/index?goods_id=${goods_id}`,
    })
  },
  onReachBottom() {
    this.setData({
      currentPage: ++this.data.currentPage
    })
    const { currentPage, totalPage } = this.data
    if(currentPage <= totalPage){
      this.getGoodList(currentPage)
    }else{
      wx.showToast({
        title: '我是有底线的',
        icon: 'none'
      })
    }
  },
  onShareAppMessage() {
    return {
        title: '弹出分享时显示的分享标题',
        desc: '分享页面的内容',
        path: '/pages/index' // 路径，传递参数到指定页面。
    }
  }
})