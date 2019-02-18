
// 引入编写好的api
const login = require('./login'); 
const user = require('./user'); 
const goods = require('./goods'); 

const api = {
  login: login,
  user: user,
  goods: goods
};

module.exports = api
