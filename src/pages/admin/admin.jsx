import React, { Component } from 'react';
import MemoryUtils from '../../utils/memoryUtils'
import { Redirect } from 'react-router-dom'

export default class Admin extends Component{
  render(){
    const user = MemoryUtils.user;
    //如果内存中没有存储user，说明当前没有登录
    if(!user||!user._id){
      //自动跳转到登录
      return <Redirect to='/login' />
    }
    return(
      <div>Hello,{user.username}</div>
    )
  }
}