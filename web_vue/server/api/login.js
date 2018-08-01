"use strict";
const mongoose = require('mongoose');
const express = require('express');
const verify = require('./../verify');
const token = require('./../redis/token');
const router = express.Router();
const md5 = require('js-md5');

/************* 定义模式userSchems */
const userSchems = mongoose.Schema({
  account: String,
  password: String,
  phone: String,
  is_status: Number
})

/************** 定义模型Model **************/
const models = {
  UserInfo: mongoose.model('t_user', userSchems, 't_user'),
}

/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/

// 创建账号接口
router.post('/api/login/registerApi', (req, res) => {
  // console.log(req.headers.cookie);
  // 验证参数
  if (!verify.accountPattern(req.body.account)) {
    res.send({
      code: 400,
      msg: 'Account format is wrong'
    })
    return
  }
  if (req.body.password.length != 32) {
    res.send({
      code: 400,
      msg: 'Password format is wrong'
    })
    return
  }
  if (!verify.phone(req.body.phone)) {
    res.send({
      code: 400,
      msg: 'Phone format is wrong'
    })
    return
  }
  verify.repetition(models, 'UserInfo', {
    "account": req.body.account,
    "is_status": 1
  }, () => {
    res.send({
      code: 400,
      msg: 'Account has already existed'
    })
  }, () => {
    verify.repetition(models, 'UserInfo', {
      "phone": req.body.phone,
      "is_status": 1
    }, () => {
      res.send({
        code: 400,
        msg: 'Phone has already existed'
      })
    }, () => {
      // 保存注册参数
      let newAccount = new models.UserInfo({
        account: req.body.account,
        password: req.body.password,
        phone: req.body.phone,
        is_status: 1
      });
      // 保存数据newAccount数据进mongoDB
      newAccount.save((err, data) => {
        if (err) {
          res.send(err);
        } else {
          res.send({
            code: 200,
            msg: 'Login was successful',
            data: data
          })
        }
      });
    })
  })
});
// 获取已有账号接口
router.get('/api/login/getAccountApi', (req, res) => {
  // 通过模型去查找数据库
  models.UserInfo.find((err, data) => {
    console.log(data);
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

// 登录账号
router.post('/api/login/loginApi', (req, res) => {
  // console.log(req.headers.cookie);
  // 验证参数
  if (!req.body.account) {
    res.send({
      code: 400,
      msg: 'Account format is wrong'
    })
    return
  }
  if (!req.body.password) {
    res.send({
      code: 400,
      msg: 'Password format is wrong'
    })
    return
  }
  verify.repetition(models, 'UserInfo', {
    $or: [{
      account: req.body.account,
      is_status: 1
    }, {
      phone: req.body.account,
      is_status: 1
    }]
  }, () => {
    verify.repetition(models, 'UserInfo', {
      $or: [{
        account: req.body.account,
        password: req.body.password,
        is_status: 1
      }, {
        phone: req.body.account,
        password: req.body.password,
        is_status: 1
      }]
    }, (data) => {
      let key = md5(new Date().getTime() + data[0]._id + parseInt(Math.random() * 10000));
      token.setToken(data[0]._id, key);
      data[0].token = key;
      let obj = {
        token: key
      }
      res.send({
        code: 200,
        data: obj,
        msg: 'success'
      })
    }, () => {
      res.send({
        code: 400,
        msg: 'ERROR Incorrect account or password '
      });
    })
  }, () => {
    res.send({
      code: 400,
      msg: 'Account nonentity'
    });
  })
});

module.exports = router;
