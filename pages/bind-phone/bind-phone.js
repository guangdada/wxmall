// pages/bind-phone/bind-phone.js
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
    mobileCode: '',
    referralCode: '',
    randomCode: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.refreshCode();
    //手机号码，如果已经绑定，要修改，则显示原来的号码
    /* this.setData({
      phone:15687876756
    }) */
  },

  /**刷新验证码 */
  refreshCode: function () {
    var that = this;
    var randomCode = "";
    for (var i = 0; i < 4; i++) {
      randomCode += Math.floor(Math.random() * 10)
    }
    that.setData({
      randomCode: randomCode
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

  //点击确定按钮
  onClickConfirmCenterView: function (e) {
    //判断输入的那个验证码是否正确
    console.log(e);
    let that = this;
    var inputCode = that.data.inputCode;
    var mobile = that.data.phone;
    var randomCode = that.data.randomCode;
    console.log(inputCode);
    console.log(mobile);
    if (inputCode == randomCode) {
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
    } else {
      that.setData({
        isTopTips: true,
        TopTipscontent: "验证码输入不正确，请重新输入验证码或请点击图片刷新，重新验证",
      });
      timer = setTimeout(function () {
        that.setData({
          isTopTips: false,
        });
      }, 2000);
    }
    /*  var data = { sessionid: app.globalData.sessionid, code: code, mobile: mobile };
     util.requestGet(config.apiList.validateCode, data, function (res) {
       console.log(res.data);
       if (res.data.code == 200) {
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
       } else {
         that.setData({
           isTopTips: true,
           TopTipscontent: "验证码输入不正确，请重新输入验证码或请点击图片刷新，重新验证",
         });
         timer = setTimeout(function () {
           that.setData({
             isTopTips: false,
           });
         }, 2000);
       } 
     })*/
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
    var data = { sessionid: app.globalData.sessionid, mobile: mobile, mobileCode: mobileCode };
    util.requestPost(config.apiList.memberRegister, data, function (res) {
      if (res.data.code == 200) {
        that.setData({
          isTopTips: true,
          TopTipscontent: "绑定成功",
        });
        timer = setTimeout(function () {
          that.setData({
            isTopTips: false,
          });
        }, 1500);
        wx.navigateTo({
          url: "/pages/index",//url跳转地址
          success: function (res) {
            console.log(res)
          },
          fail: function (res) {
            console.log(res)
          }
        })
      } else {
        that.setData({
          isTopTips: true,
          TopTipscontent: "绑定失败:" + res.data.msg,
        });
        timer = setTimeout(function () {
          that.setData({
            isTopTips: false,
          });
        }, 1500);
        console.log('绑定失败:' + res.data.msg);
        util.showLoading("网络开差了");
      }
    });
  },
})