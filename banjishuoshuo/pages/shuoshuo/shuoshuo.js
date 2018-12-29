// pages/shuoshuo/shuoshuo.js
const app = getApp()
Page({
  data:{
    bendi: app.globalData.bendi,
    picArr:[],
    content : ""

  },
  changeContent(e){  
    this.setData({
      content : e.detail.value
    })
  },
  choosePic(){
    var self = this 
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        self.setData({
          picArr: tempFilePaths
        })
      }
    })
   
  },
  //点击发布按钮
  shangchuan(){
    var content = this.data.content // 获取发布的内容
    var picArr = this.data.picArr //获取图片数组
    var nickName = app.globalData.userInfo.nickName //用户的昵称
    var avatarUrl = app.globalData.userInfo.avatarUrl //用户的头像
    var fwqPics = [] 
    var self = this
    for (let i = 0; i < picArr.length; i++) {
      wx.uploadFile({
        url: self.data.bendi + "/upload", // 仅为示例，非真实的接口地址
        filePath: picArr[i],
        name: 'file',
        formData: {
          user: 'test'
        },
        success(res) {
          //因为data是字符串，所以需要转为JSON
          const dataO= JSON.parse(res.data)
          fwqPics[i] = dataO.result;
          if (picArr.length == fwqPics.length){
            wx.request({
              url: self.data.bendi +'/shuoshuo', // 仅为示例，并非真实的接口地址
              method : "POST",
              data:{
                content,
                fwqPics,
                nickName,
                avatarUrl
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success(res) {
                
                wx.showToast({
                  title: '成功',
                  icon: 'success',
                  duration: 2000
                })
                wx.navigateBack({})
               
                
              }
            })
            
          }
         
        }
      })
    }
  },
  chenggongyulan(e){
    var urls = this.data.picArr
    var index = e.currentTarget.dataset.index
    
    
    wx.previewImage({
      current: urls[index],// 当前显示图片的http链接
      urls: urls
    })
  }
 
})