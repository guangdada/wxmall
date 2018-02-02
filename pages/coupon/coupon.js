// pages/coupon/coupon.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponList: [{couponName:''}],
    winWidth: 0,
    winHeight: 0,
    nowRole: 0,
    currentIndex: 0,
    // tab切换  
    currentTab: 0,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });

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
  //toggleView
  toggleView: function (event) {
    let that = this;
    let currentIndex = that.data;
    currentIndex = event.target.dataset.index;
    that.setData({
      currentIndex
    })
  },
  //swiper切换
  toggleSwiper: function (event) {
    let that = this;
    let nowRole = that.data;
    nowRole = event.detail.current;
    that.setData({
      nowRole
    })
  },
})