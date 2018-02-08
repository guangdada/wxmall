// pages/center/center.js
var QR = require("../../lib/qrcode.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maskHidden: true,
    imagePath: '',
    placeholder: '',//二维码生成文本
    showCenterDialog: false,

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
    //绘制二维码
    var size = this.setCanvasSize();//动态设置画布大小
   // var initUrl = res.data.content.cardNum;
    //console.log("initUrl:" + initUrl)
    var initUrl='12354'
    this.createQrCode(initUrl, "mycanvas", size.w, size.h);
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
  //点击图片放大
  imgView: function () {
    var that = this;
    that.setData({
      showCenterDialog: !this.data.showCenterDialog
    });
  },
  //点击关闭按钮
  onClickCancelCenterView: function () {
    this.setData({
      showCenterDialog: !this.data.showCenterDialog
    });
  },
  //适配不同屏幕大小的canvas
  setCanvasSize: function () {
    var size = {};
    try {
      var res = wx.getSystemInfoSync();
      var scale = 750 / 686;//不同屏幕下canvas的适配比例；设计稿是750宽
      var width = res.windowWidth / scale;
      var height = width;//canvas画布为正方形
      size.w = width;
      size.h = height;
    } catch (e) {
      // Do something when catch error
      console.log("获取设备信息失败" + e);
    }
    return size;
  },
  createQrCode: function (url, canvasId, cavW, cavH) {
    //调用插件中的draw方法，绘制二维码图片
    QR.qrApi.draw(url, canvasId, cavW, cavH);

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