// pages/product/productDetail/productDetail.js
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
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
    checkedSpecText: '请选择规格数量',
    openAttr: false,
    noCollectImage: "/static/images/icon_collect.png",
    hasCollectImage: "/static/images/icon_collect_checked.png",
    collectBackImage: "/static/images/icon_collect.png",

    scrollTop: 0,
    imgUrls: [
      'https://img01.camel.com.cn/product/image/A712357085/6fb33911-3ca6-4487-87b0-ce954573b6dd.jpg',
      'https://img01.camel.com.cn/product/image/A712357085/c8568bbd-5fcf-4c15-b143-f8e022ddbc18.jpg',
      'https://img01.camel.com.cn/product/image/A712357085/e9e1b0dc-c431-486a-a410-5dcd1c6b7c21.jpg'
    ],
    indicatorDots: true,
    indicatorColor: '#fff',
    indicatorActiveColor: '#d2ab44',
    autoplay: true,
    interval: 5000,
    duration: 500,
    circular: true,
    choseArr: [
      {
        spec_id: 2,
        value_id: ''
      },
      {
        spec_id: 4,
        value_id: ''
      }],
    product: {
      _id: "57ee7d7253411848528b4567",
      id: 2,
      goods_name: "爱奇果 陕西眉县 徐香猕猴桃 12粒装 单果100-120g",
      shop_id: 1,
      first_cate_id: 1,
      second_cate_id: 0,
      is_real: 1,
      is_advance: 0,
      advance_send_begintime: "0000-00-00 00:00:00",
      advance_send_endtime: "0000-00-00 00:00:00",
      advance_endtime: "0000-00-00 00:00:00",
      is_privilege: 0,
      is_member_discount: false,
      purchase_limit: 0,
      picture: [
        "http://img13.360buyimg.com/n1/jfs/t3655/151/1971152678/274261/fb508f8c/5840d683Na2190edd.jpg",
        "http://img13.360buyimg.com/n1/jfs/t3619/270/2066693637/130324/872511e6/583b993cNf8b30bcd.jpg",
        "http://img13.360buyimg.com/n1/jfs/t3988/154/78996704/392074/4a9edd9f/583b993cN1f0f62d1.jpg",
        "http://img13.360buyimg.com/n1/jfs/t3370/315/1984719501/142392/2f47d380/583b993cN67ee086a.jpg",
      ],
      goods_price: 0.01,
      cost_price: 12,
      market_price: 34,
      delivery: 0,
      delivery_id: 0,
      supplier_id: 0,
      related_products: [],
      goods_detail: '<p><img src="http://img13.360buyimg.com/n1/jfs/t3619/270/2066693637/130324/872511e6/583b993cNf8b30bcd.jpg"/><img src="http://img13.360buyimg.com/n1/jfs/t3988/154/78996704/392074/4a9edd9f/583b993cN1f0f62d1.jpg" title="1475890246934902.jpg" alt="2.jpg"/><img src="http://img13.360buyimg.com/n1/jfs/t3370/315/1984719501/142392/2f47d380/583b993cN67ee086a.jpg" title="1475890251162294.jpg" alt="3.jpg"/></p>',
      spec: [
        {
          spec_id: 4,
          spec_name: "尺寸",
          value: [
            {
              value_id: 4,
              value_text: "S",
              imgUrl: "",
            },
            {
              value_id: 3,
              value_text: "L",
              imgUrl: "",
            }
          ]
        },
        {
          spec_id: 2,
          spec_name: "口味",
          value: [
            {
              value_id: 2,
              value_text: "咸",
              imgUrl: "",
              class: ''
            },
            {
              value_id: 1,
              value_text: "甜",
              imgUrl: "",
              class: ''
            }
          ]
        }
      ],
      stock: [
        {
          stock_id: 7,
          stock_price: 0.4,
          stock_num: 16,
          stock_spec_str: "4,2",
          stock_spec: [
            {
              spec_id: 4,
              spec_name: "尺寸",
              value_id: 4,
              value_text: "S"
            },
            {
              spec_id: 2,
              spec_name: "口味",
              value_id: 2,
              value_text: "咸"
            }
          ],
          sold_num: 2
        },
        {
          stock_id: 8,
          stock_price: 0.03,
          stock_num: 0,
          stock_spec_str: "4,1",
          stock_spec: [
            {
              spec_id: 4,
              spec_name: "尺寸",
              value_id: 4,
              value_text: "S"
            },
            {
              spec_id: 2,
              spec_name: "口味",
              value_id: 1,
              value_text: "甜"
            }
          ],
          sold_num: 2
        },
        {
          stock_id: 9,
          stock_price: 0.02,
          stock_num: 8,
          stock_spec_str: "3,2",
          stock_spec: [
            {
              spec_id: 4,
              spec_name: "尺寸",
              value_id: 3,
              value_text: "L"
            },
            {
              spec_id: 2,
              spec_name: "口味",
              value_id: 2,
              value_text: "咸"
            }
          ],
          sold_num: 4
        },
        {
          stock_id: 10,
          stock_price: 0.01,
          stock_num: 8,
          stock_spec_str: "3,1",
          stock_spec: [
            {
              spec_id: 4,
              spec_name: "尺寸",
              value_id: 3,
              value_text: "L"
            },
            {
              spec_id: 2,
              spec_name: "口味",
              value_id: 1,
              value_text: "甜"
            }
          ],
          sold_num: 3
        }
      ],
      stock_show: false,
      published_time: "2016-11-22 17:49:50",
      goods_status: 2,
      related_info: [],
      goods_image: "http://iasimg.cccwei.com/info_manager/2016/09/30/banner1.jpg",
      total_stock: 16,
      sold_count: 11,
      cover: "",
      goods_code: "",
      published_time_num: 1479808190
    },//产品详细细节

  },
  /**
    * 滚动条
    */
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
  /**
     * 商品添加购物车
     */
  addCar(e) {
    var type = e.currentTarget.dataset.type;
    console.log("type+" + type)
    this.setData({
      chooseType: type
    })
    const specData = this.data.product.spec;
    console.log("specData:" + specData)
    const stockData = this.data.product.stock; // 对应的库存量
    specData.forEach((specValue) => {
      (specValue.value).forEach((spec) => {
        spec.disabled = '';
        spec.class = 'class';
        let stockNum = 0;
        stockData.forEach((stock) => {
          if (typeof (stock.stock_spec_str) === 'string') {
            stock.stock_spec_str = stock.stock_spec_str.split(',');
          }
          (stock.stock_spec).forEach((stockSpex) => {
            if (Number(spec.value_id) === Number(stockSpex.value_id)) {
              // 累加对应口味的库存量
              stockNum += Number(stock.stock_num);
              spec.stock_num = stockNum;
            }
          });
        });
        if (Number(spec.stock_num) === 0) {
          // 库存量为0，则不可以点击
          spec.disabled = 'disabled';
          spec.class = 'disabled';
        }
      });
    })
    this.setData({
      product: this.data.product,
      popDisplay: 'block',
      subButton: {
        disabled: 'disabled',
        class: 'disabled'
      },
      addButton: {
        disabled: 'disabled',
        class: 'disabled'
      },
      buyNum: 1,
      buyNumClass: 'disabled',
      totalStock: this.data.product.total_stock,
      oldStockNum: this.data.product.total_stock,
      goodsPrice: this.data.product.goods_price,
      oldGoodsPrice: this.data.product.goods_price
    });

  },
  /**
  * 关闭商品面板
  */
  closePop() {
    this.setData({
      popDisplay: 'none'
    });
  },

  /**选择尺寸重量*/
  choseSpec(e) {
    const valueId = e.currentTarget.dataset.valueId; // 属性id
    const specId = e.currentTarget.dataset.specId; // 点击分类的id
    const product = this.data.product;
    const stockData = product.stock;
    const specData = product.spec;
    let totalNum = false;
    let goodsPrice = false;
    let skuId = 0;
    specData.forEach((spec) => {
      (spec.value).forEach((value) => {
        let choseId = '';
        if (Number(value.value_id) === Number(valueId)) {
          console.log("进入点击")
          // 点击遍历分类属性，选中效果切换
          if (value.class === 'selected') {
            console.log("进入选择尺寸：" + value.class);
            value.class = '';
            this.data.buyNumClass = 'disabled';
            this.data.buyNum = 1;
            // 点击修改已选中的规格参数，删除对应的value_id
            this.data.choseArr.forEach((citem, index) => {
              console.log("citem.spec_id:" + citem.spec_id + "specId:" + specId)
              if (specId === citem.spec_id) {
                citem.value_id = '';
              }
              if (index === 0) {
                choseId += citem.value_id;
              } else {
                choseId += `,${citem.value_id}`;
              }
            });
            specData.forEach((specValue) => {
              (specValue.value).forEach((specdata) => {
                if (Number(specdata.stock_num) === 0) {
                  // 库存量为0，则不可以点击
                  specdata.disabled = 'disabled';
                } else if (Number(specValue.spec_id) === Number(specId)) {
                  specdata.disabled = '';
                  specdata.class = '';
                }
              });
            });
            totalNum = this.data.oldStockNum;
            goodsPrice = this.data.oldGoodsPrice;
            this.data.addButton.class = 'disabled';
            this.data.addButton.disabled = 'disabled';
            this.data.subButton.class = 'disabled';
            this.data.subButton.disabled = 'disabled';
            skuId = 0;
          } else {
            value.class = 'selected';
            let weightId = '';
            const arritem = {};
            let isCon = false;
            // 点击修改已选中的规格参数，修改对应的value_id
            this.data.choseArr.forEach((citem) => {
              if (specId === citem.spec_id) {
                isCon = true;
                citem.value_id = valueId;
              }
            });
            if (!isCon) {
              arritem.spec_id = specId;
              arritem.value_id = valueId;
              this.data.choseArr.push(arritem);
            }
            const arrArr = [];
            this.data.choseArr.forEach((citem) => {
              arrArr.push(citem.value_id);
            });
            arrArr.sort((a, b) => b - a);
            arrArr.forEach((citem, index) => {
              if (index === 0) {
                choseId += citem;
              } else {
                choseId += `,${citem}`;
              }
            });
            // 选中去修改该属性下对应的规格是否还有库存
            // 规格选完全后实时修改库存量
            stockData.forEach((stock) => {
              if (typeof (stock.stock_spec_str) === 'object') {
                let stockSpecStr = '';
                stock.stock_spec_str.sort((a, b) => b - a);
                stock.stock_spec_str.forEach((sitem, index) => {
                  if (index === 0) {
                    stockSpecStr += sitem;
                  } else {
                    stockSpecStr += `,${sitem}`;
                  }
                });
                stock.stock_spec_str = stockSpecStr;
              }
              if (stock.stock_spec_str === choseId) {
                totalNum = stock.stock_num;
                goodsPrice = stock.stock_price;
                skuId = stock.stock_id;
                this.data.buyNumClass = '';
                this.data.buyNum = 1;
                if (totalNum > 1) {
                  this.data.addButton.disabled = '';
                  this.data.addButton.class = '';
                } else {
                  this.data.addButton.disabled = 'disabled';
                  this.data.addButton.class = 'disabled';
                  this.data.subButton.disabled = 'disabled';
                  this.data.subButton.class = 'disabled';
                }
              }
              if (stock.stock_spec_str.indexOf(value.value_id) !== -1 &&
                Number(stock.stock_num) === 0) {
                const idArray = stock.stock_spec_str.split(',');
                idArray.forEach((dataId) => {
                  if (Number(dataId) !== Number(valueId)) {
                    weightId = dataId;
                  }
                });
              }
              // 拿到库存为0的value_id，设置为不可以点击
              specData.forEach((specValue) => {
                (specValue.value).forEach((valueItem) => {
                  if (weightId !== '' && Number(valueItem.value_id) === Number(weightId)) {
                    valueItem.disabled = 'disabled';
                    valueItem.class = 'disabled';
                  }
                });
              });
            });
          }
        } else if (Number(spec.spec_id) === Number(specId) && value.stock_num !== 0) {
          // 属于同个属性并且库存不为0的去除选中样式
          console.log("属于同个属性并且库存不为0的去除选中样式")
          value.class = '';
          value.disabled = '';
        } else if (value.stock_num === 0) {
          console.log("库存为0")
          value.class = 'disabled';
          value.disabled = 'disabled';
        }
      });
    });
    let price = (goodsPrice && goodsPrice.toFixed(2)) || this.data.oldGoodsPrice;
    this.setData({
      product,
      totalStock: totalNum || this.data.oldStockNum,
      goodsPrice: price,
      addButton: this.data.addButton,
      subButton: this.data.subButton,
      buyNum: this.data.buyNum,
      buyNumClass: this.data.buyNumClass,
      skuId
    });
  },

  addShopNum() {
    let buyNum = this.data.buyNum;
    const totalNum = this.data.totalStock;
    buyNum += 1;
    if (buyNum < totalNum && buyNum !== 1) {
      this.data.subButton.class = '';
      this.data.subButton.disabled = '';
    } else {
      this.data.addButton.class = 'disabled';
      this.data.addButton.disabled = 'disabled';
    }

    this.setData({
      buyNum,
      addButton: this.data.addButton,
      subButton: this.data.subButton
    });
  },
  subShopNum() {
    let buyNum = this.data.buyNum;
    buyNum -= 1;
    if (buyNum === 1) {
      this.data.addButton.class = '';
      this.data.addButton.disabled = '';
      this.data.subButton.class = 'disabled';
      this.data.subButton.disabled = 'disabled';
    } else {
      this.data.addButton.class = '';
      this.data.addButton.disabled = '';
    }

    this.setData({
      buyNum,
      addButton: this.data.addButton,
      subButton: this.data.subButton
    });
  },
  submitCart() {
    const data = {
      goods_id: this.data.product.id,
      sku_id: this.data.skuId,
      goods_number: this.data.buyNum
    };

    if (data.sku_id) {
      request({ path: '/cart/addCart', data, method: 'post' }).then((res) => {
        if (res) {
          this.setData({
            popDisplay: 'none',
            cartNum: this.data.cartNum + this.data.buyNum
          });
        }
      });
    } else {
      this.setData({
        toast: {
          toastClass: 'yatoast',
          toastMessage: '请先选择属性'
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
  },
  navigateToCart() {
    this.setData({
      popDisplay: 'none',
      toast: {
        toastClass: 'yatoast',
        toastMessage: '已成功加入购物车'
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
  },
  navigateToSettlement() {
    wx.navigateTo({
      url: '/pages/settlement/settlement',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("id:" + options.id)
    this.setData({
      id: parseInt(options.id)
    });
    var that = this;
    this.getGoodsInfo();
    util.request(api.CartGoodsCount).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          //cartGoodsCount: res.data.cartTotal.goodsCount
        });

      }
    });
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

        that.getGoodsRelated();
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