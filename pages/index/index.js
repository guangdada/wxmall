const util = require('../../utils/util.js');
const api = require('../../config/api.js');
//获取应用实例
const app = getApp()
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

    hotGoods: [],
    banner: [],
    goodsList:[],
    groupAd:[],
    navList: [{ id:1, name: "今拼团" }, { id: 2, name: "今f拼团" }, { id: 3, name: "今f拼团" }, { id: 4, name: "今f拼团" }, { id: 5, name: "今f拼团" }, { id: 6, name: "今f拼团" }, { id: 7, name: "今f拼团" }, { id: 8, name: "今f拼团" }],
    groupGoods: [],
    id: 1,
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

    // 获得首页展示的数据
    that.getIndexData();
  },
  /**首页轮播数据 */
  getIndexData: function () {
    let that = this;
    util.request(api.IndexUrl).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          hotGoods: res.data.hotGoodsList,
          banner: res.data.banner,
          navList: res.data.categoryList,
          groupGoods: res.data.groupGoodsList,
          groupAd: res.data.groupAd,
          id: res.data.categoryList[0].id
        });
      }
    });
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
    currentIndex = event.currentTarget.dataset.index;
    that.setData({
      currentIndex,
      id: event.currentTarget.dataset.id
    })
    var clientX = event.detail.x;
    var currentTarget = event.currentTarget;
    if (clientX < 60) {
      that.setData({
        scrollLeft: currentTarget.offsetLeft - 60
      });
    } else if (clientX > 330) {
      that.setData({
        scrollLeft: currentTarget.offsetLeft
      });
    }
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
