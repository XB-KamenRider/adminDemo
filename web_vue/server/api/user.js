/**
 * Created by liudehua on 18/8/6.
 */

"use strict";

const express = require('express');
const verify = require('./../verify');
const token = require('./../redis/token');
const user = express.Router();
const models = require('./model/user_model');

const userMethods = function () {
  // 获取用户信息
  user.get('/api/user/getUserInfoApi', (req, res) => {
    // 通过模型去查找数据库
    models.UserInfo.find((err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    });
  });
};

userMethods();

module.exports = user;
