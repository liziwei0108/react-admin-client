/**
 * 包含n个用来创建action的工厂函数(action creator)
 */

import {INCREMENT, DECREMENT} from './action-types'

//增加的同步action creator,返回的是action对象
export const increment = number => ({ type: INCREMENT, data: number })

//减少的同步action creator,返回的是action对象
export const decrement = number => ({ type: DECREMENT, data: number })

//增加的异步action creator,返回的是函数
export const incrementAsync = number => {
  return dispatch => {
    //执行异步任务（定时器、ajax请求、promise等）
    setTimeout(() => {
      //当前异步任务执行完成，分发一个同步action
      dispatch(increment(number))
    }, 1000)
  }
  
}