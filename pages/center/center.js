// pages/center/center.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        icon: '/images/coupon.png',
        text: '优惠券',
        tip: '2',
        cut: true,
        url: '../addresses/addresses'
      },
      {
        icon: '/images/point.png',
        text: '积分',
        tip: '2000',
        cut: true,
        url: '../addresses/addresses'
      },
      {
        icon: '/images/phone.png',
        text: '手机号',
        tip: '1380043433',
      }, {
        icon: '/images/businesscard.png',
        text: '业务合作',
        tip: 'xxxxx',
        cut: true,
        url: '../feedback/feedback'
      }, {
        icon: '/images/wang.png',
        text: '关于商城',
        tip: '',
        url: '../about/about'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo();
  },

  /**获取用户信息 */
  getUserInfo() {
    const userInfo = app.globalData.userInfo
    if (userInfo) {
      this.setData({
        userInfo: userInfo
      })
      return
    }
  },
  /**跳转处理 */
  navigateTo: function (e) {
    var navigateUrl = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: navigateUrl,
    })

  },
  /**点击积分 */
  navigateToPoint: function (e) {
    var navigateUrl = e.currentTarget.dataset.url;
    wx.switchTab({
      url: navigateUrl,
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

  }
})