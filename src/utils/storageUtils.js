/**
 * 进行local数据存储管理的工具模块
 */

export default {
  //保存user
  saveUser (user) {
    localStorage.setItem('user_key', JSON.stringify(user))
  },
  //读取user
  getUser () {
    return JSON.parse(localStorage.getItem('user_key') || '{}' )
  },

  //删除user
  removeUser () {
    localStorage.removeItem('user_key')
    
  }

}