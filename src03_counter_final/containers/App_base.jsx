import {React,Component} from 'react'
import {connect} from 'react-redux'

import Counter from '../components/Counter'
import {increment, decrement} from '../redux/actions'

/**
 * 容器组件：通过connect包装UI组件产生的容器组件
 * connect()：高阶函数
 * connect()返回的函数是一个高阶组件，接受一个UI组件，返回一个容器组件
 * 容器组件的责任：向UI组件传递特定的属性
 * 初始版本
 */

//用来将redux管理的状态数据映射成UI组件的一般属性
function mapStateToProps(state){
  return {
    count: state
  }

}

//用来将包含dispatch代码的函数映射成UI组件的函数属性
function mapDispatchToProps(dispatch) {
  return {
    increment: number => dispatch(increment(number)),
    decrement: number => dispatch(decrement(number))
  }

}

export default connect(
  mapStateToProps,      //指定一般属性
  mapDispatchToProps    //指定函数属性
  )(Counter)