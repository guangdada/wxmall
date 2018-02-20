var QR = require("../../lib/qrcode.js");
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
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
    //this.getUserInfo();
    //绘制二维码
    var size = this.setCanvasSize();//动态设置画布大小
   // var initUrl = res.data.content.cardNum;
    //console.log("initUrl:" + initUrl)
    var initUrl='12354'
    this.createQrCode(initUrl, "mycanvas", size.w, size.h);
    console.log("onload");
    this.getUserInfo();
  },
  login : function(){
    let that = this;
    // 如果没有登录信息，显示的购物车界面有登录按钮
    // 点击登录按钮，发起用户授权
    // 用户同意授权，发回购物车页面
    if (!app.hasToken()) {
      // 如果用户同意授权，那么处理成功
      // 如果用户不同意授权，那么跳转到登录页面
      let code = null;
      util.login().then((res) => {
        console.log("code:" + res.code);
        code = res.code;
        return util.getUserInfo();
      }).then((userInfo) => {
        console.log("用户同意授权");
        //登录远程服务器
        util.request(api.AuthLoginByWeixin, { code: code, userInfo: userInfo }, 'POST').then(res => {
          if (res.errno === 0) {
            //存储用户信息
            console.log("存储用户信息");
            wx.setStorageSync('userInfo', res.data.userInfo);
            wx.setStorageSync('token', res.data.token);
            app.globalData.userInfo = res.data.userInfo;
            that.getUserInfo();
          } else {
            console.log("请求后台登录失败" + JSON.stringify(res));
          }})
      }).catch((err) => {
        // 用户不同意授权，返回上一个页面
        console.log("用户不同意授权");
        wx.showModal({
          title: '授权提示',
          content: '小程序需要您的授权才能使用',
          success: function (res) {
            if (res.confirm) {
              wx.openSetting({
                success:function(res){
                  console.log("打开授权页面");
                }
              })
              console.log('用户确定')
            } else if (res.cancel) {
              console.log('用户取消')
            }
          }
        })
      });
    } else {
      console.log("已经登录过了");
    }
  },
  /**获取用户信息 */
  getUserInfo() {
    const userInfo = app.globalData.userInfo || wx.getStorageSync("userInfo");
    if (userInfo) {
      this.setData({
        userInfo: userInfo
      })
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
    console.log("onReady");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.login();
    console.log("onShow");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("onHide");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("onUnload");
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