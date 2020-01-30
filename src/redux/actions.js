/**
 * 包含n个action creator函数的模块
 * 同步action:对象：{type:'xxx', data:数据值}
 * 异步action:函数：dispatch => {}
 */
import {message} from 'antd'

import { SET_HEAD_TITLE, RECEIVE_USER, SHOW_ERROR_MSG, RESET_USER } from './action-types'
import { reqLogin } from '../api'
import StorageUtils from '../utils/storageUtils'


/**
 * 设置头部标题的同步aciton的action creator 
 * 返回一个对象
 */
export const setHeadTitle = (headTitle) => ({ type: SET_HEAD_TITLE, data: headTitle })

/** 
 * 接收用户信息的同步action的action creator
*/
export const receiveUser = (user) => ({ type: RECEIVE_USER, user })

/**
 * 接收登陆失败信息的同步action的action creator
 */
export const showErrorMsg = (msg) => ({ type: SHOW_ERROR_MSG, msg })

/**
 * 退出登录的同步action
 */
export const logout = () => {
  //删除localStorage中的user
  StorageUtils.removeUser();
  return {type: RESET_USER }
}


/**
 * 登录的异步aciton的action creator
 */
export const login = (username, password) => {
  return async dispatch => {
    //1.执行异步ajax请求
    const result = await reqLogin(username, password)

    if(result.status === 0){
      //2.1 如果成功 分发一个成功的action
      const user = result.data
      //将user保存到localStorage中
      StorageUtils.saveUser(user);

      dispatch(receiveUser(user))

    }else{
      //2.2 如果失败 分发一个失败的action
      const msg = result.msg
      //可以直接在这里输出msg，也可以分发一个失败的action，将msg传回组件，让组件自行处理
      //message.error(msg) 
      dispatch(showErrorMsg(msg))
    }

    
  }
}