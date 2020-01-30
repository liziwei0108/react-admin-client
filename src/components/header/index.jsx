/**
 * 头部组件
 */

import React, { Component } from 'react';
import './index.less';
import { formateDate } from '../../utils/dateUtils';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import { reqWeather } from '../../api';
import { withRouter } from 'react-router-dom';
import menuList from '../../config/menuConfig';
import LinkButton from '../link-button'
import { Modal } from 'antd';
import { connect } from 'react-redux'
import { logout } from '../../redux/actions'

class Header extends Component {

  state = {
    currentTime : formateDate(Date.now()),         //当前时间 字符串
    dayPictureUrl : '',              //天气图片
    weather : '',                 //天气文本
  }


  getTime = () => {
    //每隔一秒获取当前时间并更新状态
    this.intervalID = setInterval(() => {
      const currentTime = formateDate(Date.now());
      this.setState({currentTime})
      
    }, 1000)
  }

  getWeather = async () => {
    const response = await reqWeather('北京');
    const { dayPictureUrl, weather } = response;

    this.setState({ dayPictureUrl, weather });


  }

  //获得当前路径作为标题
  getTitle = () => {
    //需要用withRouter包装当前组件
    const path = this.props.location.pathname;
    let title;

    menuList.forEach(item => {
      if(item.key===path) {
        //如果当前item的key与当前路由匹配，则说明当前item的title就是要找的title
        title = item.title
      }else if(item.children){
        //在所有子item中查找，如果当前子item的key与当前路由匹配，则说明当前子item的title就是要找的title
        const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
        if(cItem){
          title = cItem.title
        }
      }  
    })
    return title
  }


  //退出登录
  logout = () => {
    //确认退出
    Modal.confirm(
      {
        title: '您确认退出登录吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          // //删除用户数据
          // storageUtils.removeUser();
          // memoryUtils.user = {};
          // //跳转到登录页面
          // this.props.history.replace('/login');
          this.props.logout()
        },
        onCancel() {
          console.log('取消');
        },
      }
    )
  }


  //当前组件第一次render()之后
  componentDidMount(){
    //获取当前时间
    this.getTime();
    //获取当前天气
    this.getWeather();
  }

  //当前组件卸载之前
  componentWillUnmount(){
    clearInterval(this.intervalID)
  }

  render(){

    const { currentTime, dayPictureUrl, weather } = this.state;
    const username = this.props.user.username;
    //const title = this.getTitle();
    const title = this.props.headTitle

    return(
      <div className="header">
        <div className="header-top">
          <span>欢迎，{username}</span>
          <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
            <img src={dayPictureUrl} alt="天气icon"></img>
            <span>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
};

export default connect(
  state => ({headTitle: state.headTitle, user: state.user}),
  {logout}
)(withRouter(Header))