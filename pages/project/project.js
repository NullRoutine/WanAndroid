// pages/project/project.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headList: [],
    currentSelect: 0,
    page: 1,
    scrollLeftValue: 0,
    hasMore: [],
    swiperHeight:1000,
    articleList: [],//articleList所有页面的数据，按下标存放，每个元素里面是独立的集合
    screenWidth: wx.getSystemInfoSync().windowWidth 
  },
  headSelcet: function (e) {
    var that = this;
    var idx = e.currentTarget.dataset.idx;
    console.log(idx)
    that.autoScrollTopNav(idx)
    that.setData({
      currentSelect: idx
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({ swiperHeight: res.windowHeight - that.data.screenWidth/750*80})
        console.log(that.data.swiperHeight)
      },
    })
    that.getProjectHeadList(function (d) {
      that.setData({ headList: d.data })
      //然后默认请求 全部 分类
      for (var i in that.data.headList) {
        that.data.articleList.push([]);
        that.data.hasMore[i] = true;
      }
      that.data.articleList[0] = that.getArticleList(that.data.headList[0].id, that.data.page, function (d) {
        var idx = that.data.currentSelect;
        var hasMoreNew = that.data.hasMore;
        hasMoreNew[idx] = !d.data.over;
        that.data.articleList[0] = d.data.datas;
        that.setData({ articleList: that.data.articleList, hasMore: hasMoreNew})
        if(that.data.hasMore[idx]){
          that.setData({page:that.data.page+1})
        }
        console.log(that.data.articleList)
      })

    })
  },
  swiperChange: function (e) {
    var that = this;
    var idx = e.detail.current;
      that.setData({
        currentSelect: idx,
        page: 1,
      })
    console.log(e.detail)
    that.autoScrollTopNav(idx)
    //若无数据，自动加载
    if (that.data.articleList[idx].length == 0) {
      that.downloadMoreItem();
    }
  },
  /**
   * 上拉刷新
   */
  updateItem: function (e) {
    console.log('刷新')
    var that = this;
    var idx = that.data.currentSelect;
    var hasMoreNew = that.data.hasMore;
    hasMoreNew[idx] = true;
    that.setData({
      page: 1,
      hasMore: hasMoreNew
    })
    var idx = that.data.currentSelect;
    this.data.articleList[idx] = [];
    this.downloadMoreItem();
  },
  /**
   * 下拉加载更多
   */
  downloadMoreItem: function (e) {
    console.log('下拉加载更多')
    var that = this;
    var idx = that.data.currentSelect;
    var articleListNow = that.data.articleList;
    //请求数据
    if (that.data.hasMore[idx]) {
      that.getArticleList(that.data.headList[idx].id, that.data.page, function (d) {
        articleListNow[idx] = articleListNow[idx].concat(d.data.datas);
        var hasMoreNew = that.data.hasMore;
        hasMoreNew[idx] = !d.data.over;
        that.setData({ articleList: articleListNow, hasModre: hasMoreNew, page: that.data.page + 1 })
        console.log(that.data.articleList)
      })
    }
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
   * 获取头部项目分类
   */
  getProjectHeadList: function (fn) {
    wx.request({
      url: getApp().globalData.URL+'/project/tree/json',
      method: 'GET',
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log(res)
        fn(res.data)
      }
    })
  },
  /**
   * 获取分类文章
   */
  getArticleList: function (cid, page, fn) {
    wx.request({
      url: getApp().globalData.URL+'/project/list/' + page + '/json?cid=' + cid,
      method: 'GET',
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log(res)
        fn(res.data)
      }
    })

  },

  autoScrollTopNav: function (idx) {
    if (idx < 2) {
      this.data.scrollLeftValue = 0;
    } else {
      this.data.scrollLeftValue = (idx - 1) * (this.data.screenWidth)/750*220 ;
      console.log(wx.getSystemInfoSync().windowWidth)
    }
    this.setData({
      scrollLeftValue: this.data.scrollLeftValue
    })
  }
})