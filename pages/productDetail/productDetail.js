// pages/product/productDetail/productDetail.js
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
var WxParse = require('../../lib/wxParse/wxParse.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    goods: {},
    gallery: [],
    attribute: [],
    issueList: [],
    comment: [],
    brand: {},
    specificationList: [],
    productList: [],
    
    relatedGoods: [],
    cartGoodsCount: 0,
    userHasCollect: 0,
    number: 1,

    indicatorDots: true,
    indicatorColor: '#fff',
    indicatorActiveColor: '#d2ab44',
    autoplay: true,
    interval: 5000,
    duration: 500,
    circular: true,
    checkedProduct:null // 当前选中的产品
  },

  /**
  * 关闭商品面板
  */
  closePop() {
    this.setData({
      popDisplay: 'none'
    });
  },

  /**
   * 跳转到立即购买页面
   */
  navigateToSettlement() {
    var that = this;
    if (that.checkProduct()) {
      //添加到购物车
      util.request(api.CartAdd, { goodsId: this.data.goods.id, number: this.data.number, productId: that.data.checkedProduct[0].id }, "POST")
        .then(function (res) {
          let _res = res;
          if (_res.errno == 0) {
             that.setData({
              popDisplay: 'none',
              cartGoodsCount: _res.data.cartTotal.goodsCount
            });
            if (that.data.userHasCollect == 1) {
              that.setData({
                'collectBackImage': that.data.hasCollectImage
              });
            } else {
              that.setData({
                'collectBackImage': that.data.noCollectImage
              });
            }
            // 设置立即购买的产品id
            wx.setStorageSync("productId", that.data.checkedProduct[0].id);
            // 跳转至结算页面
            wx.navigateTo({
              url: '/pages/settlement/settlement',
            })
          } else {
            wx.showToast({
              image: '/static/images/icon_error.png',
              title: _res.errmsg,
              mask: true
            });
          }
        });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log("id:" + options.id)
    this.setData({
      id: parseInt(options.id)
    });
    this.getGoodsInfo();
    // 已经登录了才查询购物车数量
    if(app.hasToken()){
      util.request(api.CartGoodsCount).then(function (res) {
        if (res.errno === 0) {
          that.setData({
            cartGoodsCount: res.data.cartTotal.goodsCount
          });
        }
      });
    }
  },
  /**商品详情 */
  getGoodsInfo: function () {
    let that = this;
    util.request(api.GoodsDetail, { id: that.data.id }).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          goods: res.data.info,
          gallery: res.data.gallery,
          attribute: res.data.attribute,
          issueList: res.data.issue,
          comment: res.data.comment,
          brand: res.data.brand,
          specificationList: res.data.specificationList,
          productList: res.data.productList,
          userHasCollect: res.data.userHasCollect
        });

        if (res.data.userHasCollect == 1) {
          that.setData({
            'collectBackImage': that.data.hasCollectImage
          });
        } else {
          that.setData({
            'collectBackImage': that.data.noCollectImage
          });
        }

        WxParse.wxParse('goodsDetail', 'html', res.data.info.goods_desc, that);
      }
    });

  },
  /**选择规格 */
  switchAttrPop: function (e) {
    if (!app.hasToken()) {
      wx.showModal({
        title: '登录提示',
        content: '需要先登录，才可以购买哦',
        success: function (res) {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/center/center',
            })
            console.log('用户确定')
          } else if (res.cancel) {
            console.log('用户取消')
          }
        }
      })
      return;
    }

    var type = e.currentTarget.dataset.type;
    this.setData({
      chooseType: type
    })
    if (this.data.popDisplay != 'block') {
      this.setData({
        popDisplay: 'block',
      });
    }
  },
  /**验证选择的产品信息 */
  checkProduct:function(){
    var that = this;
    if (this.data.popDisplay != 'block') {
      console.log("checkProduct");
      //打开规格选择窗口
      this.setData({
        popDisplay: 'block',
      });
      setTimeout(() => {
        this.setData({
          toast: {
            toastClass: '',
            toastMessage: ''
          }
        });
      }, 2000);
      return false;
    } else {

      //提示选择完整规格
      if (!this.isCheckedAllSpec()) {
        this.setData({
          toast: {
            toastClass: 'yatoast',
            toastMessage: '请选择完整规格'
          }
        });
        setTimeout(() => {
          this.setData({
            toast: {
              toastClass: '',
              toastMessage: ''
            }
          });
        }, 2000);
        return false;
      }

      //根据选中的规格，判断是否有对应的sku信息
      let checkedProduct = this.getCheckedProductItem(this.getCheckedSpecKey());
      if (!checkedProduct || checkedProduct.length <= 0) {
        //找不到对应的product信息，提示没有库存
        this.setData({
          toast: {
            toastClass: 'yatoast',
            toastMessage: '没有库存'
          }
        });
        setTimeout(() => {
          this.setData({
            toast: {
              toastClass: '',
              toastMessage: ''
            }
          });
        }, 2000);
        return false;
      }

      //验证库存
      if (checkedProduct.goods_number < this.data.number) {
        //找不到对应的product信息，提示没有库存
        this.setData({
          toast: {
            toastClass: 'yatoast',
            toastMessage: '没有库存'
          }
        });
        setTimeout(() => {
          this.setData({
            toast: {
              toastClass: '',
              toastMessage: ''
            }
          });
        }, 2000);
        return false;
      }

      // 设置选中的产品
      console.log("设置选中的产品");
      that.setData({
        checkedProduct: checkedProduct
      });
    }
    return true;
  },

  /**添加购物车 */
  addToCart: function () {
    var that = this;
    if (that.checkProduct()) {
      //添加到购物车
      util.request(api.CartAdd, { goodsId: this.data.goods.id, number: this.data.number, productId: that.data.checkedProduct[0].id }, "POST")
        .then(function (res) {
          let _res = res;
          if (_res.errno == 0) {
            wx.showToast({
              title: '添加成功'
            });
            that.setData({
              popDisplay: 'none',
              cartGoodsCount: _res.data.cartTotal.goodsCount
            });
            if (that.data.userHasCollect == 1) {
              that.setData({
                'collectBackImage': that.data.hasCollectImage
              });
            } else {
              that.setData({
                'collectBackImage': that.data.noCollectImage
              });
            }
            // 添加成功
            console.log("添加成功lala");
          } else {
            wx.showToast({
              image: '/static/images/icon_error.png',
              title: _res.errmsg,
              mask: true
            });
          }

        });
    }
  },
  cutNumber: function () {
    this.setData({
      number: (this.data.number - 1 > 1) ? this.data.number - 1 : 1
    });
  },
  addNumber: function () {
    this.setData({
      number: this.data.number + 1
    });
  },
  clickSkuValue: function (event) {
    let that = this;
    let specNameId = event.currentTarget.dataset.nameId;
    let specValueId = event.currentTarget.dataset.valueId;

    //判断是否可以点击

    //TODO 性能优化，可在wx:for中添加index，可以直接获取点击的属性名和属性值，不用循环
    let _specificationList = this.data.specificationList;
    for (let i = 0; i < _specificationList.length; i++) {
      if (_specificationList[i].specification_id == specNameId) {
        for (let j = 0; j < _specificationList[i].valueList.length; j++) {
          if (_specificationList[i].valueList[j].id == specValueId) {
            //如果已经选中，则反选
            if (_specificationList[i].valueList[j].checked) {
              _specificationList[i].valueList[j].checked = false;
            } else {
              _specificationList[i].valueList[j].checked = true;
            }
          } else {
            _specificationList[i].valueList[j].checked = false;
          }
        }
      }
    }
    this.setData({
      'specificationList': _specificationList,
    });
    //重新计算spec改变后的信息
    this.changeSpecInfo();

    //重新计算哪些值不可以点击
  },
  //获取选中的规格信息
  getCheckedSpecValue: function () {
    let checkedValues = [];
    let _specificationList = this.data.specificationList;
    for (let i = 0; i < _specificationList.length; i++) {
      let _checkedObj = {
        nameId: _specificationList[i].specification_id,
        valueId: 0,
        valueText: ''
      };
      for (let j = 0; j < _specificationList[i].valueList.length; j++) {
        if (_specificationList[i].valueList[j].checked) {
          _checkedObj.valueId = _specificationList[i].valueList[j].id;
          _checkedObj.valueText = _specificationList[i].valueList[j].value;
        }
      }
      checkedValues.push(_checkedObj);
    }

    return checkedValues;

  },
  //根据已选的值，计算其它值的状态
  setSpecValueStatus: function () {

  },
  //判断规格是否选择完整
  isCheckedAllSpec: function () {
    return !this.getCheckedSpecValue().some(function (v) {
      if (v.valueId == 0) {
        return true;
      }
    });
  },
  getCheckedSpecKey: function () {
    let checkedValue = this.getCheckedSpecValue().map(function (v) {
      return v.valueId;
    });

    return checkedValue.join('_');
  },
  changeSpecInfo: function () {
    let checkedNameValue = this.getCheckedSpecValue();

    //设置选择的信息
    let checkedValue = checkedNameValue.filter(function (v) {
      if (v.valueId != 0) {
        return true;
      } else {
        return false;
      }
    }).map(function (v) {
      return v.valueText;
    });
    if (checkedValue.length > 0) {
      this.setData({
        'checkedSpecText': checkedValue.join('　')
      });
    } else {
      this.setData({
        'checkedSpecText': '请选择规格数量'
      });
    }

  },
  getCheckedProductItem: function (key) {
    return this.data.productList.filter(function (v) {
      if (v.goods_specification_ids == key) {
        return true;
      } else {
        return false;
      }
    });
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