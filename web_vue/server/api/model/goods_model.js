/**
 * Created by liudehua on 18/8/6.
 */
const mongoose = require('mongoose');

/************* 定义模式userSchems */
const goodsSchems = mongoose.Schema({
  name: String,
  price: String,
  isDiscount: Number,
  discountRatio: Number,
  photograph: Array,
  inventory: Number,
  creatDate: Number,
  dateDue: Number,
  is_status: Number
})

/************** 定义模型Model **************/
const models = {
  GoodsInfo: mongoose.model('t_goods', goodsSchems, 't_goods'),
}

module.exports = models;