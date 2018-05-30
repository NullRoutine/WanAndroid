// pages/navigation/navigation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classifyList: [],
    rightList: [],
    currentSelect: 0,
    scrollTop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getClassify(function (d) {
      that.setData({ classifyList: d.data, rightList: d.data[0].articles, currentSelect: 0 })
      console.log(that.data.rightList)
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
   * 获取导航数据
   */
  getClassify: function (fn) {
    wx.request({
      url: getApp().globalData.URL+'/navi/json',
      method: 'GET',
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log(res)
        fn(res.data)
      }
    })
  },
  /**
   * 这里涉及动态计算设置滚动条在合适的位置
   */
  selectTab: function (e) {
    var that = this;
    let index = parseInt(e.target.dataset.index)
    console.log(index);
    var contentlist = this.data.classifyList;
    if (index < 5) {
      that.data.scrollTop = 0;
    } else {
      that.data.scrollTop = (index - 5) * 42;
    }
    that.setData({
      currentSelect: index,
      rightList: contentlist[index].articles,
      scrollTop: that.data.scrollTop
    })
    console.log(that.data.rightList);
  },
  itemClick:function(e){
    var url=e.currentTarget.dataset.url;
    wx.navigateTo({
      url: '../detail/detail?url=' + url,
    })
  }
})