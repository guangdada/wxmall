// pages/points/points.js
var app = getApp();
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    signState: 0,
    isTopTips: false,//提示信息
    TopTipscontent: '',
    userInfo:null,
    page: 1,
    size: 10,
    totalPages: 1,
    tradeList:[]
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo();
    this.getTradeList();
  },
  /**获取用户信息 */
  getUserInfo() {
    const userInfo = wx.getStorageSync("userInfo");
    if (userInfo) {
      this.setData({
        userInfo: userInfo,
        signState: userInfo.signed
      })
    }
  },
 // 查询积分记录
  getTradeList(){
    wx.showLoading({
      title: '加载中...',
    });
    let that = this;
    util.request(api.PointTrade, { page: that.data.page, size: that.data.size }).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          tradeList: that.data.tradeList.concat(res.data.data),
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

    this.getTradeList();
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

  /**积分签到处理 */
  pointSign: function (e) {
    var that = this
    if (e.currentTarget.dataset.state == "0") {
      //当没签到，点击签到
      util.request(api.Sign, {}).then(function (res) {
        if (res.errno === 0) {
          that.setData({
            signState: 1,
            isTopTips: true,
            TopTipscontent: "签到成功！",
            tradeList:[]
          })
          that.getTradeList();
        }else{
          console.log(res.errmsg);
          that.setData({
            isTopTips: true,
            TopTipscontent: res.errmsg,
          })
        }
        setTimeout(function () {
          that.setData({
            isTopTips: false,
          });
        }, 1000);
      });
    } else if (e.currentTarget.dataset.state == "1") {
      //已签到
      that.setData({
        isTopTips: true,
        TopTipscontent: "今天已签到！",
      });
      setTimeout(function () {
        that.setData({
          isTopTips: false,
        });
      }, 1000);
    }
  }
})