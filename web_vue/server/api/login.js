"use strict";
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

/************** 定义模式loginSchema **************/
const loginSchema = mongoose.Schema({
  account: String,
  password: String,
  is_status: Number
});

/************** 定义模型Model **************/
const models = {
  Login: mongoose.model('t_login', loginSchema, 't_login')
}

/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/

// 创建账号接口
router.post('/api/login/createAccountApi', (req, res) => {
	// console.log(req.headers.cookie);
  // 验证参数
  var pattern = /^[a-zA-Z0-9_]{4,20}$/
  if (!pattern.test(req.body.account)) {
    res.send({
      code: 400,
      msg: 'Account format is wrong'
    })
    return
  }
  if (!pattern.test(req.body.password)) {
    res.send({
      code: 400,
      msg: 'Password format is wrong'
    })
    return
  }
  models.Login.find({
    "account": req.body.account,
    "is_status": 1
  }, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      if (data.length) {
				res.send({
					code: 400,
					msg: '账号已存在'
				})
      } else {
        // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
        let newAccount = new models.Login({
          account: req.body.account,
          password: req.body.password,
          is_status: 1
        });
        // 保存数据newAccount数据进mongoDB
        newAccount.save((err, data) => {
          if (err) {
            res.send(err);
          } else {
            res.send({
              code: 200,
              msg: '创建成功',
              data: data
            })
          }
        });
      }
    }
  });
});
// 获取已有账号接口
router.get('/api/login/getAccountApi', (req, res) => {
  // 通过模型去查找数据库
  models.Login.find((err, data) => {
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
  var pattern = /^[a-zA-Z0-9_]{4,20}$/
  if (!pattern.test(req.body.account)) {
    res.send({
      code: 400,
      msg: '输入账号格式有误'
    })
    return
  }
  if (!pattern.test(req.body.password)) {
    res.send({
      code: 400,
      msg: '输入密码格式有误'
    })
    return
  }
  models.Login.find({
		"account": req.body.account,
		"password": req.body.password,
    "is_status": 1
  }, (err, data) => {
		if (err) {
      res.send(err);
    } else {
      if (data.length) {
				res.send({
					code: 200,
					data: data,
					msg: 'success'
				})
      }else {
				res.send({
					code: 400,
					msg: '账号或密码错误'
				});
			}
    }
  });
});
module.exports = router;
