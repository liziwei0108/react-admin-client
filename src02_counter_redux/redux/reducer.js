/*
reducer函数模块：根据旧的state和指定action返回一个新的state
当前是管理count状态数据的reducer
*/

import { INCREMENT, DECREMENT } from './action-types'

export default function count(state = 1, action) {
  console.log('count()',state,action)
  switch (action.type) {
    case INCREMENT:
      return state + action.data
    case DECREMENT:
      return state - action.data
    default:
      return state
  }

}