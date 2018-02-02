//index.js
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
//获取应用实例
const app = getApp()
//var app = getApp();

Page({
  data: {
    /** 
    * 顶部导航配置 
    */
    winWidth: 0,
    winHeight: 0,
    nowRole: 0,
    currentIndex: 0,
    // tab切换  
    currentTab: 0,
    activeNav: 'recommend',//激活条目
    userInfo: {},
    hasUserInfo: false,
    scrollTop: 0,
    floorstatus: false,

    newGoods: [],
    hotGoods: [],
    topics: [],
    brands: [],
    floorGoods: [],
    banner: [],
    channel: [],


    navList: [],
    goodsList: [],
    id: 0,
    currentCategory: {},
    scrollLeft: 0,
    scrollTop: 0,
    scrollHeight: 0,
    page: 1,
    size: 10000
  },

  //产品详情点击处理事件
  navigateToProduct(event) {
    var activityId = event.currentTarget.dataset.activityId;
    var activityUrl = event.currentTarget.dataset.activityUrl;
    console.log("activityId:" + activityId)
    /*  var activityUrl = "/pages/product/productDetail/productDetail?id=" + activityId + '&activityType=' + activityType; */
    wx.navigateTo({
      url: activityUrl
    });
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })

  },
  onLoad: function () {
    /** 
     * 获取系统信息 
     */
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });

    if (app.globalData.userInfo) {
      that.getIndexData();
      // 页面初始化 options为页面跳转所带来的参数
      that.setData({
        id: parseInt(1019000)
      });
      that.getCategoryInfo();

      that.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (that.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        that.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          that.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    that.setData({
      end_time: '2018-02-03'
    })
    countdown(that);
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /**首页轮播数据 */
  getIndexData: function () {
    let that = this;
    util.request(api.IndexUrl).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          newGoods: res.data.newGoodsList,
          hotGoods: res.data.hotGoodsList,
          topics: res.data.topicList,
          brand: res.data.brandList,
          floorGoods: res.data.categoryList,
          banner: res.data.banner,
          channel: res.data.channel
        });
      }
    });
    console.log("newGood" + that.data.newGoods)
  },
  //底部导航，跳到顶部
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
  getCategoryInfo: function () {
    let that = this;
    console.log("id:" + that.data.id)
    util.request(api.GoodsCategory, { id: that.data.id })
      .then(function (res) {
        if (res.errno == 0) {
          that.setData({
            navList: res.data.brotherCategory,
            currentCategory: res.data.currentCategory
          });
          console.log("navList:" + that.data.navList)
          //nav位置
          let currentIndex = 0;
          let navListCount = that.data.navList.length;
          for (let i = 0; i < navListCount; i++) {
            currentIndex += 1;
            if (that.data.navList[i].id == that.data.id) {
              break;
            }
          }
          if (currentIndex > navListCount / 2 && navListCount > 5) {
            that.setData({
              scrollLeft: currentIndex * 60
            });
          }
          that.getGoodsList();
        } else {
          //显示错误信息
        }
      });
  },

  getGoodsList: function () {
    var that = this;
    util.request(api.GoodsList, { categoryId: that.data.id, page: that.data.page, size: that.data.size })
      .then(function (res) {
        that.setData({
          goodsList: res.data.goodsList,
        });
      });
  },

  //toggleView
  toggleView: function (event) {
    console.log("toggleView id:" + event.currentTarget.dataset.id)
    if (this.data.id == event.currentTarget.dataset.id) {
      return false;
    }
    let that = this;
    let currentIndex = that.data;
    currentIndex = event.target.dataset.index;
    that.setData({
      currentIndex
    })
    that.setData({
      id: event.currentTarget.dataset.id
    });

    that.getCategoryInfo();
  },

  //下拉刷新
  onPullDownRefresh: function () {
    console.log("下拉刷新")
    wx.showNavigationBarLoading() //在标题栏中显示加载

    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },
})
//倒计时
function countdown(that) {
  /* var EndTime = that.data.end_time || []; */
  var date = new Date(that.data.end_time || []);
  var EndTime = date.getTime().toString();
  var NowTime = new Date().getTime();
  //console.log("NowTime:"+NowTime)
  var total_micro_second = EndTime - NowTime || [];
  //console.log('剩余时间：' + total_micro_second);
  // 渲染倒计时时钟
  that.setData({
    clock: dateformat(total_micro_second)
  });
  if (total_micro_second <= 0) {
    that.setData({
      clock: "已经截止",
      total_micro_second: total_micro_second
    });
    return;
  }
  setTimeout(function () {
    total_micro_second -= 1000;
    countdown(that);
  }
    , 1000)
}

// 时间格式化输出，如11:03 25:19 每1s都会调用一次
function dateformat(micro_second) {
  // 总秒数
  var second = Math.floor(micro_second / 1000);
  // 天数
  var day = Math.floor(second / 3600 / 24);
  // 小时
  var hr = Math.floor(second / 3600 % 24);
  // 分钟
  var min = Math.floor(second / 60 % 60);
  // 秒
  var sec = Math.floor(second % 60);
  return day + "天" + hr + "时" + min + "分" + sec + "秒";
}
