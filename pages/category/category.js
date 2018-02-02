// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeNav:"outdoors",
    categoryItems: [{ title: "户外", alias: "outdoors", type: 1 }, { title: "运动", alias: "sports", type: 1 }, { title: "瑜伽", alias: "yoga", type: 1 }, { title: "男鞋", alias: "mshoes", type: 1 }, { title: "女鞋", alias: "wshoes", type: 1 }, { title: "女装", alias: "wdress", type: 1 }, { title: "男装", alias: "mdress", type: 1 }, { title: "童装", alias: "cdress", type: 1 }],
  },


  clickCategoryItem(event) {
    var alias=event.currentTarget.dataset.alias;
    if(alias!=this.data.activeNav){
      this.setData({
        activeNav:event.currentTarget.dataset.alias
      })
    }
    var activityType = event.currentTarget.dataset.activityType;
    var activityId = event.currentTarget.dataset.activityId;
    var activityTitle = event.currentTarget.dataset.activityTitle;
    var activityUrl = '';
    console.log("activityType" + activityType)
    switch (activityType) {
      case 1:
        //查询数据
        /*  var data = { sessionid: app.globalData.sessionid, start: that.data.start };
         util.requestGet(config.apiList.productList, data, function (res) {
          this.setMoreData(res);
         }); */
        activityUrl = "/pages/product/productList/productList?id=" + activityId + '&title=' + activityTitle;
        break;
      case 2:
        /*  activityUrl = "../products/products?id=" + activityId; */
        activityUrl = "/pages/product/productDetail/productDetail?id=" + activityId;
        break;
      case 3:
        activityUrl = "/pages/index/index";
        break;
      case 4:
        activityUrl = event.currentTarget.dataset.activityUrl;
        break;
      default:
        break;
    }
    console.log("activityUrl:" + activityUrl);
      wx.navigateTo({
        url: activityUrl
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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