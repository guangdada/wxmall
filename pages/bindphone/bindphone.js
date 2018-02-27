var api = require('../../config/api.js');
var util = require('../../utils/util.js');
let timer = null;
var app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    isTopTips: false,
    TopTipscontent: '',
    showCenterDialog: false,
    inputCode: '',
    codeSrc: '',
    mobileCode: '', //短信码
    referralCode: '', // 推荐码
    randomCode: '' // 验证码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.refreshCode();
  },

  /**刷新验证码 */
  refreshCode: function () {
    var that = this;
    var token = wx.getStorageSync("token");
    var codeSrc = api.UserImgCodeSrc + "?X-Nideshop-Token=" + token + "&t="  + new Date().getTime();
    console.log(codeSrc);
    that.setData({
      codeSrc: codeSrc
    });
    console.log("randomCode:" + that.data.randomCode)
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
    clearTimeout(timer);
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
   * 监听手机号输入
   */
  listenerPhoneInput: function (e) {
    this.data.phone = e.detail.value;
  },
  /**
   * 判断验证码是否正确
   */
  checkPhone: function () {
    var phone = this.data.phone;
    console.log("Phone" + phone);
    let that = this;
    //手机号码校验
    if (phone === '') {
      that.setData({
        isTopTips: true,
        TopTipscontent: "手机号码不能为空",
      });
      timer = setTimeout(function () {
        that.setData({
          isTopTips: false,
        });
      }, 1500);
      return;
    }
    if (!/^(1)\d{10}$/.test(phone)) {
      that.setData({
        isTopTips: true,
        TopTipscontent: "请输入有效的手机号码",
      });
      timer = setTimeout(function () {
        that.setData({
          isTopTips: false,
        });
      }, 1500);
      return;
    }
    that.setData({
      showCenterDialog: !this.data.showCenterDialog
    });
    //刷新验证框验证码
    this.refreshCode();
  },

  //点击取消按钮
  onClickCancelCenterView: function () {
    this.setData({
      showCenterDialog: !this.data.showCenterDialog
    });
  },

  /**
 * 监听弹框验证码输入
 */
  listenerCodeInput: function (e) {
    console.log(e.detail.value);
    var that = this
    that.setData({
      inputCode: e.detail.value
    });
  },

  /**
* 监听手机验证码输入
*/
  listenerMobileCodeInput: function (e) {
    console.log(e.detail.value);
    this.data.mobileCode = e.detail.value;
  },

  /**
* 监听手机验证码输入
*/
  listenerReferralCodeInput: function (e) {
    console.log(e.detail.value);
    this.data.referralCode = e.detail.value;
  },
  /**
   * 验证图形吗是否输入正确，正确才发送短信码
   */
  validateImgCode:function(){
    var that = this;
    console.log("mobile:"+ that.data.phone);
    console.log("inputCode:" + that.data.inputCode);
    util.request(api.UserValidtecode, { randomCode: that.data.inputCode, mobile: that.data.phone}, 'POST').then(function (res) {
      if (res.errno === 0) {
        that.setData({
          isTopTips: true,
          TopTipscontent: "短信验证码已发送",
          showCenterDialog: false,
        });
        timer = setTimeout(function () {
          that.setData({
            isTopTips: false,
          });
        }, 1500);
      }else{
        that.setData({
          isTopTips: true,
          TopTipscontent: "验证码输入不正确",
        });
        timer = setTimeout(function () {
          that.setData({
            isTopTips: false,
          });
        }, 1500);
      }
    });
  },
  /**
   * 绑定手机号
   */
  bindPhone:function(){
    var that = this;
    util.request(api.UserBindphone, { mobile: that.data.phone, mobileCode: that.data.mobileCode, referralCode: that.data.referralCode }, 'POST').then(function (res) {
      if (res.errno === 0) {
        that.setData({
          isTopTips: true,
          TopTipscontent: "绑定成功",
        });
        timer = setTimeout(function () {
          that.setData({
            isTopTips: false,
          });
          wx.setStorageSync("mobile", that.data.phone);
          wx.navigateBack();
        }, 1500);
      } else {
        that.setData({
          isTopTips: true,
          TopTipscontent: "绑定失败:" + res.errmsg,
        });
        timer = setTimeout(function () {
          that.setData({
            isTopTips: false,
          });
        }, 1500);
        console.log('绑定失败:' + res.errmsg);
      }
    });
  },
  //点击确定按钮
  onClickConfirmCenterView: function (e) {
    //判断输入的那个验证码是否正确
    let that = this;
    var inputCode = that.data.inputCode;
    var mobile = that.data.phone;
    //var randomCode = that.data.randomCode;
    console.log(inputCode);
    console.log(mobile);
    if (!inputCode || inputCode.length != 4){
      that.setData({
        isTopTips: true,
        TopTipscontent: "验证码输入不正确",
      });
      timer = setTimeout(function () {
        that.setData({
          isTopTips: false,
        });
      }, 2000);
      // 刷新验证码
      that.refreshCode();
      return;
    }

    // 调用后台发送短信码
    that.validateImgCode();
    
  },

  /**点击激活按钮 */
  memberRegister: function (e) {
    var mobile = this.data.phone;
    var mobileCode = this.data.mobileCode;
    var referralCode = this.data.referralCode;
    console.log(mobileCode);
    let that = this;
    //手机号码校验
    if (mobile === '') {
      that.setData({
        isTopTips: true,
        TopTipscontent: "手机号码不能为空",
      });
      timer = setTimeout(function () {
        that.setData({
          isTopTips: false,
        });
      }, 1500);
      return;
    }
    if (!/^(1)\d{10}$/.test(mobile)) {
      that.setData({
        isTopTips: true,
        TopTipscontent: "请输入有效的手机号码",
      });
      timer = setTimeout(function () {
        that.setData({
          isTopTips: false,
        });
      }, 1500);
      return;
    }
    //手机短信验证码
    if (mobileCode === '') {
      that.setData({
        isTopTips: true,
        TopTipscontent: "手机短信验证码不能为空",
      });
      timer = setTimeout(function () {
        that.setData({
          isTopTips: false,
        });
      }, 1500);
      return;
    }
    // 发起绑定
    that.bindPhone();
  },
})