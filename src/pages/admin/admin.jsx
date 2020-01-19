import React, { Component } from 'react';
import MemoryUtils from '../../utils/memoryUtils'
import { Redirect, Route, Switch } from 'react-router-dom'

import Header from '../../components/header';
import LeftNav from '../../components/left-nav';
import { Layout } from 'antd';

import Home from '../home/home';
import Category from '../category/category';
import Product from '../product/product';
import User from '../user/user';
import Role from '../role/role';
import Bar from '../charts/bar';
import Line from '../charts/line';
import Pie from '../charts/pie';

const { Sider, Footer, Content } = Layout;

export default class Admin extends Component{
  render(){
    const user = MemoryUtils.user;
    //如果内存中没有存储user，说明当前没有登录
    if(!user||!user._id){
      //自动跳转到登录
      return <Redirect to='/login' />
    }
    return(
      <Layout style={{height: '100%'}}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header />
          <Content style={{margin:20, backgroundColor: '#fff'}}>
            <Switch>
              <Route path='/home' component={Home} />
              <Route path='/category' component={Category} /> 
              <Route path='/product' component={Product} /> 
              <Route path='/role' component={Role} /> 
              <Route path='/user' component={User} /> 
              <Route path='/charts/bar' component={Bar} /> 
              <Route path='/charts/line' component={Line} /> 
              <Route path='/charts/pie' component={Pie} />
              <Redirect to='/home' />
            </Switch>
          </Content>
          <Footer style={{textAlign: 'center', color: '#cccccc'}}>推荐使用谷歌浏览器，可以获得更佳阅读体验</Footer>
        </Layout>
      </Layout>
    )
  }
}