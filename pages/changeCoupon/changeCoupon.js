// pages/changeCoupon/changeCoupon.js
var app = getApp();
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponList:[],
    isTopTips: false,
    TopTipscontent: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCouponList();
  },

  //获得优惠券列表
  getCouponList:function(){
    let that = this;
    util.request(api.CouponList).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          couponList: res.data
        });
      }
    });
  },

  // 兑换优惠券
  exchange:function(e){
    let that = this;
    var couponId = e.currentTarget.dataset.couponId;
    util.request(api.CouponExchange, { couponId: couponId}, 'POST').then(function (res) {
      if (res.errno === 0) {
        wx.showToast({
          title: '兑换成功',
        })
      }else{
        that.setData({
          isTopTips: true,
          TopTipscontent: res.errmsg
        });
        setTimeout(function () {
          that.setData({
            isTopTips: false,
          });
        }, 1500);
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
  
  }
})