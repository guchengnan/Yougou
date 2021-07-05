const app = getApp()
import { request } from "../../request/index"
Page({
  data: {
    // 轮播图数组
    swiperList: [],
    // 分类导航数组
    cateList:[],
    // 楼层数组
    floorList:[]
  },
  onLoad() {
    this.getSwiperList()
    this.getCateList()
    this.getFloorList()
  },
  getSwiperList() {
    request({
      url: '/home/swiperdata'
    }).then(result => {
      this.setData({
        swiperList: result.data.message
      })
    })
  },
  // 获取分类导航数据
  getCateList() {
    request({
      url: '/home/catitems'
    }).then(result => {
      this.setData({
        cateList: result.data.message
      })
    })
  },
  // 获取楼层数据
  getFloorList() {
    request({
      url: '/home/floordata'
    }).then(result => {
      this.setData({
        floorList: result.data.message
      })
    })
  },
  onFocus() {
    wx.navigateTo({
      url: '../search/index'
    })
  }
})
