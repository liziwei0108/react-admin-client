import {React,Component} from 'react'
import {connect} from 'react-redux'

import Counter from '../components/Counter'
import { increment, decrement, incrementAsync} from '../redux/actions'

/**
 * 容器组件：通过connect包装UI组件产生的容器组件
 * connect()：高阶函数
 * connect()返回的函数是一个高阶组件，接受一个UI组件，返回一个容器组件
 * 容器组件的责任：向UI组件传递特定的属性
 * 最终版-简化版
 */



export default connect(
  state => ({count:state}), //指定一般属性
  {increment, decrement, incrementAsync}    //指定函数属性
  )(Counter)