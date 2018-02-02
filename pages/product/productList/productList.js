// pages/product/productList/productList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeNav: '',//顶部激活条目
    barTitle: '', //导航条
    scrollTop: 0,
    floorstatus: false,
    topItems: [{ title: "推荐", alias: "recommend", type: 3 }, { title: "户外", alias: "outdoors", type: 1 }, { title: "运动", alias: "sports", type: 1 }, { title: "瑜伽", currentClass: "yoga", type: 1 }, { title: "男鞋", alias: "mshoes", type: 1 }, { title: "女鞋", alias: "wshoes", type: 1 }, { title: "女装", alias: "wdress", type: 1 }, { title: "男装", alias: "mdress", type: 1 }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //导航条条目点击处理
    var alias = options.alias;
    console.log("alias11:" + alias)
    if (alias !== that.data.activeNav) {
      that.setData({
        activeNav: alias
      });
    }

    console.log("title" + options.title)
    var activityTitle = options.title
    var activityType=options.type
    that.setData({
      barTitle: options.title,//options为页面路由过程中传递的参数
    })
    var topItems = that.data.topItems
    for (var x in topItems) {
      if (topItems[x].title == activityTitle) {
        topItems[x].currentClass = 'active'
      } else {
        topItems[x].currentClass = 'unActive'
      }
    }
    if (activityType==4){
      topItems[0].currentClass='active'
    }
    that.setData({
      topItems: topItems
    })

    wx.setNavigationBarTitle({
      title: that.data.barTitle//页面标题为路由参数
    })
  },

  navigateToActivity(event) {
    //导航条条目点击处理
    var alias = event.currentTarget.dataset.alias;
    console.log("alias:"+alias)
    if (alias !== this.data.activeNav) {
      this.setData({
        activeNav: event.currentTarget.dataset.alias
      });
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
        activityUrl = "/pages/product/productList/productList?id=" + activityId + '&title=' + activityTitle + '&alias=' + alias;
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
    if (activityType == 3) {
      this.setData({
        activeNav: 'recommend'
      })
      console.log("activeNav43:"+this.data.activeNav)
      wx.switchTab({
        url: '/pages/index/index',
      })
      return;
      
    } else {
      wx.navigateTo({
        url: activityUrl
      });
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
  //底部导航，调到顶部
  goTop: function (e) {
    this.setData({
      scrollTop: 0
    })
  },
  scroll: function (e) {
    if (e.detail.scrollTop > 300) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },

  /*   setMoreData: function (res) {
      var that = this;
      if (res.data.code == 200) {
        // 返回查询结果
        var records = res.data.content;
        console.log(records);
        if (records.length === 0 || records.length < config.pageSize) {
          console.log(' 没有更多数据了');
          that.setData({
            hasMore: false
          });
        }
        if (records.length > 0) {
          that.setData({
            records: that.data.records.concat(records),
            start: that.data.start + records.length
          });
        }
      } else {
        console.log('查询失败:' + res.data.msg);
        util.showLoading("网络开差了");
      }
    } */
})