//index.js
//获取应用实例
const app = getApp()

Page({
  data:{
    bendi: app.globalData.bendi,
    result :[],
    //下面三个参数是为了获取用户权限抄的
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad(){
    var self = this
    wx.request({
      url: self.data.bendi + '/qingdan', // 仅为示例，并非真实的接口地址
      success({ data }) {
        var result = data.result;
        var newResult = [];
        for (let i = 0; i < result.length; i++) {
          var dtime = new Date(result[i].time).toJSON();
          var date = new Date(+new Date(dtime) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
          newResult[i] = {
            ...result[i],
            time: date
          }
        }
        self.setData({
          result: newResult
        })
      }

    })
    //-------------------------------
    //下面的代码是抄的
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  toShuoshuo(){
    wx.navigateTo({
      url: '/pages/shuoshuo/shuoshuo'
    })
  },
  onPullDownRefresh() {
    var self = this
    wx.request({ 
      url: self.data.bendi + '/qingdan', // 仅为示例，并非真实的接口地址
      success({ data }) {
        var result = data.result;
        var newResult = [];
        for (let i = 0; i < result.length; i++) {
          var dtime = new Date(result[i].time).toJSON();
          var date = new Date(+new Date(dtime) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
          newResult[i] = {
            ...result[i],
            time: date
          }
        }
        self.setData({
          result: newResult
        })
      }

    })
  },
  yulan(e){
    var current = e.currentTarget.dataset.src
    var urls = e.currentTarget.dataset.url
    wx.previewImage({
      current: current,// 当前显示图片的http链接
      urls: [urls] // 需要预览的图片http链接列表
    })
  },
  chenggongyulan(e){
    var index = e.currentTarget.dataset.index
    var urls = e.currentTarget.dataset.url
    var newUrls = urls.map(item=>this.data.bendi+"/"+ item)
    wx.previewImage({
      current: newUrls[index] ,// 当前显示图片的http链接
      urls: newUrls
    })
  } 
})
