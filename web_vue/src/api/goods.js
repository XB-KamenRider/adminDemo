/**
 * Created by liudehua on 18/8/6.
 */

const Goods = {
  getDiscount:(data)=> {
    return "/goods/getDiscountGoodsApi";
  },
  setDiscount:(data)=> {
    return "/goods/setDiscountGoodsApi";
  }
}

module.exports = Goods