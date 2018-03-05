var app = getApp();
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponList: [],
    winWidth: 0,
    winHeight: 0,
    nowRole: 0,
    currentIndex: 0,
    // tab切换  
    currentTab: 0,
    page: 1,
    size: 10,
    totalPages: 1,
    orderId:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    /* wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    }); */
    // 判断是否要选择
    var orderId = options.orderId;
    if (orderId){
      that.setData({
        orderId: orderId
      });
    }
    that.getCouponList();
  },
  // 确认选择的优惠券
  selectCoupon:function(e){
    var couponNumber = e.currentTarget.dataset.couponNumber;
    console.log("确认选择的优惠券:" + couponNumber);
    wx.setStorageSync('couponNumber', couponNumber);
    /* wx.redirectTo({
      url: '/pages/settlement/settlement'
    }) */
    wx.navigateBack({})

  },
  // 查询积分记录
  getCouponList() {
    wx.showLoading({
      title: '加载中...',
    });
    let that = this;
    util.request(api.UserCouponList, { orderId:that.data.orderId,page: that.data.page, size: that.data.size }).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          couponList: that.data.couponList.concat(res.data.data),
          totalPages: res.data.totalPages
        });
      }
      wx.hideLoading();
    });
  },
  onReachBottom() {
    if (this.data.totalPages > this.data.page) {
      this.setData({
        page: this.data.page + 1
      });
    } else {
      return false;
    }

    this.getCouponList();
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