var util = require('../../utils/util.js');
var api = require('../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    size: 10,
    totalPages: 1,
    serviceList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getServiceList()
  },

  // 查询记录
  getServiceList() {
    wx.showLoading({
      title: '加载中...',
    });
    let that = this;
    util.request(api.ServiceList, {page: that.data.page, size: that.data.size }).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          serviceList: that.data.serviceList.concat(res.data.data),
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

    this.getServiceList();
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
  consult:function(e){
    var phone = e.currentTarget.dataset.phone;
    var id = e.currentTarget.dataset.id;
    console.log("id:" + id);
    wx.makePhoneCall({
      phoneNumber: phone,
      success:function(){
        console.log("makePhoneCall success");
        //保存咨询人数
        util.request(api.ServiceVisits, {id:id},'POST').then(function (res) {
          if (res.errno === 0) {
           
          }
        });
      }
    })
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