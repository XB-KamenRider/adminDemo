/**
 * Created by liudehua on 18/8/7.
 */

"use strict";

const express = require('express');
const verify = require('./../verify');
const token = require('./../redis/token');
const goods = express.Router();
const models = require('./model/goods_model');

const goodsMethods = function () {
  // 获取商品信息
  goods.get('/api/goods/getDiscountGoodsApi', (req, res) => {
    // 通过模型去查找数据库
    models.GoodsInfo.find((err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send({
          code: 200,
          msg: 'Search goods success',
          data: data
        })
      }
    });
  });

  // 设置商品信息
  goods.post('/api/goods/setDiscountGoodsApi', (req, res) => {
    // 通过模型去查找数据库
    verify.repetition(models, 'GoodsInfo', {
      "name": req.body.name,
      "is_status": 1
    }, () => {
      res.send({
        code: 400,
        msg: 'Name is already in use'
      })
    }, () => {
      // 保存商品参数
      let newGoods = new models.GoodsInfo({
        name: req.body.name,
        price: req.body.price,
        isDiscount: req.body.isDiscount,
        discountRatio: req.body.discountRatio,
        photograph: req.body.photograph,
        inventory: req.body.inventory,
        creatDate: new Date().getTime(),
        dateDue: req.body.dateDue,
        is_status: 1
      });
      // 保存数据newAccount数据进mongoDB
      newGoods.save((err, data) => {
        if (err) {
          res.send(err);
        } else {
          res.send({
            code: 200,
            msg: 'Add goods success',
            data: data
          })
        }
      });
    })
  });
};

goodsMethods();

module.exports = goods;
