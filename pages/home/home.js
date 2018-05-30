// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: [],
    articleList: [],
    currentPage: 0,
    hasMoreData: true,
    searchLoading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.getBanner(function (d) {
      that.setData({ banner: d.data })
      console.log(that.data.banner)
    })
    that.data.currentPage = 0;
    that.getArticleList(function (d) {
      that.setData({ articleList: d.data.datas, hasMoreData: !d.data.over })
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
    console.log('--------下拉刷新-------')
    wx.showNavigationBarLoading() //在标题栏中显示加载
    var that = this;
    that.data.currentPage = 0;
    that.getArticleList(function (d) {
      that.setData({ articleList: d.data.datas, hasMoreData: !d.data.over })
      console.log(that.data.articleList)
      console.log(that.data.hasMoreData)
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('--------上啦加载-------')
    var that = this
    if (that.data.hasMoreData) {
      that.getArticleList(function (d) {
        var contentlistTem = that.data.articleList
        var contentlist = d.data.datas
        that.setData({
          articleList: contentlistTem.concat(contentlist), hasMoreData: !d.data.over
          , currentPage: that.data.currentPage + 1, searchLoading:true
        })
        console.log(that.data.currentPage)
      })
    }else{
      that.setData({
        searchLoading: false
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 获取轮播图接口
   */
  getBanner: function (fn) {
    wx.request({
      url: getApp().globalData.URL + '/banner/json',
      method: 'GET',
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log(res)
        fn(res.data)
      }
    })
  },
  /**
   * 获取首页文章（带分页）
   */
  getArticleList: function (fn) {
    var that = this
    wx.request({
      url: getApp().globalData.URL + '/article/list/' + that.data.currentPage + '/json',
      method: 'GET',
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log(res)
        fn(res.data)
      },
      complete: function () {
        // complete
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })
  },
  itemClick: function (e) {
    var url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: '../detail/detail?url=' + url,
    })
  }
})