/**
 * Created by liudehua on 18/8/6.
 */
const mongoose = require('mongoose');

/************* 定义模式userSchems */
const userSchems = mongoose.Schema({
  account: String,
  password: String,
  phone: String,
  token: String,
  name: String,
  sex: Number,
  birthday: Number,
  address: String,
  signature: String,
  is_status: Number
})

/************** 定义模型Model **************/
const models = {
  UserInfo: mongoose.model('t_user', userSchems, 't_user'),
}

module.exports = models;