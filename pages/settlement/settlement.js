// pages/settlement/settlement.js
import Promise from '../../lib/promiseEs6Fix';
import request from '../../lib/request';
import resource from '../../lib/resource';

const app = getApp();
Page({
  data: {
    shop_id: app.globalData.shop_id,
    address: [],
    cartList: [],
    freight: 0,
    totalPay: 0,
    ok: 1,
    loading: true,
    exec: false,
    payWay: '1',
    dispatchedWay: '1',
    ticketWay: 'false'
  },
  //页面刷新重新
  onShow() {
    resource.fetchAddresses().then(res => {
      res.data.forEach(item => {
        if (item.is_default) {
          this.setData({ address: item })
        }
      });

    })
  },
  onLoad() {
    var loading = false;
    this.setData({ loading});
    /*     const requests = ['/balance', '/cart/indexCart',
          '/users/addresses'
        ]
          .map(path => (
            request({ path })
              .then(response => response.data)
              .catch(() => [])
          ));
        Promise.all(requests).then(([balance, carInfo, addressList]) => {
          let address = [];
          let cartList = [];
          let buyNumber = 0;
          let totalPay = 0;
          let ok = 0;
          addressList.forEach((item) => {
            if (item.is_default) {
              ok = 1;
              address = item;
            }
          });
          carInfo.forEach((item) => {
            item.real_price = item.real_price.toFixed(2);
            item.market_price = item.market_price.toFixed(2);
            if (item.status) {
              buyNumber += item.goods_number;
              totalPay += item.goods_number * item.real_price;
              cartList.push(item);
            }
          });
          let freight = 0;
          resource.getShipping(this.data.shop_id, address.city).then((res) => {
            if (Number(res.statusCode) !== 200) {
              ok = 1 && ok;
            } else {
              freight = res;
              ok = 0 && ok;
            }
          });
          totalPay = totalPay.toFixed(2);
          freight = freight.toFixed(2);
          var loading = false;
          this.setData({ loading, address, ok, cartList, freight, totalPay });
        }); */
  },
  postOrder() {
    this.setData({ exec: true });
    resource.postOrder({
      address_id: this.data.address.address_id,
      pay_way: 'wx',
      shop_id: this.data.shop_id
    }).then(res => {
      app.globalData.subOrderSn = res.data.order_sn;
      app.globalData.price = res.data.total_fee;
      resource.getPaySign({ out_trade_no: res.data.order_sn, AppID: app.globalData.appId }).then(payRes => {
        console.log(payRes);
        if (payRes.statusCode == 200) {
          const wechatData = payRes.data.payment;
          wx.requestPayment({
            'appId': wechatData.appId,
            'timeStamp': wechatData.timeStamp,
            'nonceStr': wechatData.nonceStr,
            'package': wechatData.package,
            'signType': 'MD5',
            'paySign': wechatData.paySign,
            'success': function (res) {
              if (res.errMsg === 'requestPayment:ok') {
                console.log('success');
                app.globalData.type = 'success';
                wx.navigateTo({
                  url: '../result/result'
                });
              } else if (res.errMsg === 'requestPayment:cancel') {
                app.globalData.type = 'fail';
                wx.navigateTo({
                  url: '../orders/orders?t=unpaid'
                });
              }
            },
            'fail': function (res) {
              app.globalData.type = 'fail';
              wx.navigateTo({
                url: '../orders/orders?t=unpaid'
              });
              console.log('fail');
            },
            'complete': function (res) {
              console.log('complete');
            }
          });
          this.setData({ exec: false });
        } else {
          this.setData({
            exec: false,
            toast: {
              toastClass: 'yatoast',
              toastMessage: '获取支付验证错误!'
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
        }
      });
    });
  },

  navigateToAddress() {
    wx.navigateTo({
      url: '../addresses/addresses',
    });
  },
  radioNavigate: function (e) {
    var payWay = e.currentTarget.dataset.type;
    if (payWay == '1') {
      this.setData({
        payWay: payWay
      })
    } else if (payWay == '2') {
      this.setData({
        payWay: payWay
      })
    } else if (payWay == '3') {
      this.setData({
        payWay: payWay
      })
    }
  },
  /**配送方式 */
  dispatchedNavigate: function (e) {
    var dispatchedWay = e.currentTarget.dataset.type;
    if (dispatchedWay == '1') {
      this.setData({
        dispatchedWay: dispatchedWay
      })
    } else if (dispatchedWay == '2') {
      this.setData({
        dispatchedWay: dispatchedWay
      })
    } else if (dispatchedWay == '3') {
      this.setData({
        dispatchedWay: dispatchedWay
      })
    }
  },
  /**发票选择 */
  ticketNavigate: function (e) {
    var ticketWay = e.currentTarget.dataset.type;
    console.log("ticketWay:" + ticketWay)
    if (ticketWay == 'true') {
      this.setData({
        ticketWay: 'false'
      })
    } else {
      this.setData({
        ticketWay: 'true'
      })
    }
  },
  /**打开优惠券面板 */
  openCoupon(e) {
    this.setData({
      popDisplay: 'block',
    })
  },
  selectCoupon(e) {
    this.setData({
      popDisplay: 'none',
    })
  },
  /**
 * 关闭优惠券面板
 */
  closePop() {
    this.setData({
      popDisplay: 'none'
    });
  },

});
