import {
  request
} from "../../request/index.js"
Page({
  data: {
    menuIndex: 0,
    // 左侧菜单数组
    leftMenuList: [],
    // 右侧商品数组
    rightContent: []
  },
  // 定义变量接受server返回整体数据
  Cates: [],
  onLoad() {
    this.getCates()
  },
  // 加载分类数据
  getCates() {
    request({
      url: "/categories"
    }).then(result => {
      this.Cates = result.data.message;
      // 构造左侧大菜单数据
      let leftMenuList = this.Cates.map(v => v.cat_name);
      // 构造右侧商品数据
      let rightContent = this.Cates[0].children;
      this.setData({
        leftMenuList,
        rightContent
      })
    })
  },
  onMenu(e) {
    const { index: menuIndex } = e.target.dataset
    const rightContent = this.Cates[menuIndex].children
    this.setData({
      menuIndex,
      rightContent
    })
  },
  onFocus() {
    wx.navigateTo({
      url: '../search/index'
    })
  }
})