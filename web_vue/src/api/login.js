/**
 * Created by liudehua on 18/7/30.
 */

const Login = {
  login:(data)=> {
    return window.server_path.login+"/loginApi";
  },
  register:()=> {
    return window.server_path.login+"/registerApi";
  }
}

module.exports = Login