/**
 * 用来根据旧的state和特定action生成并返回新的state
 */

import {combineReducers} from 'redux'

import storageUtils from '../utils/storageUtils'
import { SET_HEAD_TITLE, RECEIVE_USER, SHOW_ERROR_MSG, RESET_USER } from './action-types'

/**
 * 用来管理头部标题的reducer
 */
const initHeadTitle = '首页'
function headTitle(state = initHeadTitle, action) {
  switch(action.type){
    case SET_HEAD_TITLE:
      return action.data
    default:
      return state
  }
}

/**
 * 用来管理当前登录用户的reducer
 */
const initUser = storageUtils.getUser()
function user(state = initUser, action) {
  switch(action.type){
    case RECEIVE_USER:
      return action.user
    case SHOW_ERROR_MSG:
      const msg = action.msg
      return {...state, msg}
    case RESET_USER:
      return {}
    default:
      return state
  }

}

/**
 * 向外暴露的是合并之后产生的总的reducer函数
 * 管理的总的state结构(以初始值举例）：
 * {
 * headTitle: '首页',
 * user: {...}
 * }
 */
export default combineReducers({
  headTitle,
  user
})
