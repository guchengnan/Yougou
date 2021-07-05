import { request } from '../../request/index'
Page({
  data: {
    goodList: []
  },
  getGoodList(value) {
    request({
      url: `/goods/qsearch?query=${value}`
    }).then(result => {
      const goodList = result.data.message
      this.setData({
        goodList
      })
    })
  },
  onSearch(event) {
    this.getGoodList(event.detail)
  }
})