// pages/points/points.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    signState: 0,
    isTopTips: false,//提示信息
    TopTipscontent: '',
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
      that.setData({
        signState: 1
      })
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