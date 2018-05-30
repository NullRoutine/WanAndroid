// pages/knowledge/knowledge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      firstList:[],
      childrenList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getTree(function (d) {
      that.setData({ firstList: d.data })
      console.log(that.data.firstList)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
     
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 获取知识体系数据
   */
  getTree: function (fn) {
    wx.request({
      url: getApp().globalData.URL+'/tree/json',
      method: 'GET',
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log(res)
        fn(res.data)
      }
    })
  }
})