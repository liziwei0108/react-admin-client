/**
 * 左侧导航组件
 */

import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom';
import { Menu, Icon } from 'antd';
import './index.less'
import logo from '../../assets/images/logo.png';
import menuList from '../../config/menuConfig';
import memoryUtils from '../../utils/memoryUtils';

const { SubMenu } = Menu;

class LeftNav extends Component {

  constructor(props){
    super(props);
    this.menuNodes = this.getMenuNodes(menuList);
  }

  //判断当前用户是否有某个菜单项的权限
  hasAuth = (item) => {
    const { key, isPublic } = item
    const menus = memoryUtils.user.role.menus
    const username = memoryUtils.user.username

    /*
    1.如果当前用户是admin 返回true
    2.如果当前item是公开的，返回true
    3.如果当前用户有此item的权限：当前的key在menus中，返回true
    */

    if(username === 'admin' || isPublic || menus.indexOf(key)!==-1){
      return true
    }else if(item.children){
      //如果当前用户有此item的某个子item的权限 返回true
      return !!item.children.find(child => menus.indexOf(child.key)!==-1)
    }
    return false

  }

  /**
   * 根据Menu的数据数组生成对应的标签数组
   * 使用map+递归调用
   */
  getMenuNodes = (menuList) => {
    const path = this.props.location.pathname;
    return menuList.map(item => {

      //如果当前用户有这个Item的权限，才会显示这个Item
      if(this.hasAuth(item)){
        if (!item.children) {
          return (
            <Menu.Item key={item.key}>
              <Link to={item.key}>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </Link>
            </Menu.Item>
          )
        } else {
          //确认当前需要展开的二级菜单
          const cItem = item.children.find(cItem => cItem.key === path);
          //如果cItem有值，则说明当前有要展开的二级菜单
          if (cItem) {
            this.openKey = item.key;
          }

          return (
            <SubMenu
              key={item.key}
              title={
                <span>
                  <Icon type={item.icon} />
                  <span>{item.title}</span>
                </span>
              }
            >
              {
                //递归调用
                this.getMenuNodes(item.children)
              }
            </SubMenu>
          )
        }

      }else{

      }
    })
    // return menuList.reduce((pre, item) => {

    //   // 如果当前用户有item对应的权限, 才需要显示对应的菜单项
    //   if (this.hasAuth(item)) {
    //     // 向pre添加<Menu.Item>
    //     if (!item.children) {
    //       pre.push((
    //         <Menu.Item key={item.key}>
    //           <Link to={item.key}>
    //             <Icon type={item.icon} />
    //             <span>{item.title}</span>
    //           </Link>
    //         </Menu.Item>
    //       ))
    //     } else {

    //       // 查找一个与当前请求路径匹配的子Item
    //       const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
    //       // 如果存在, 说明当前item的子列表需要打开
    //       if (cItem) {
    //         this.openKey = item.key
    //       }


    //       // 向pre添加<SubMenu>
    //       pre.push((
    //         <SubMenu
    //           key={item.key}
    //           title={
    //             <span>
    //               <Icon type={item.icon} />
    //               <span>{item.title}</span>
    //             </span>
    //           }
    //         >
    //           {this.getMenuNodes(item.children)}
    //         </SubMenu>
    //       ))
    //     }
    //   }


    //   return pre
    // }, [])

  }

  // UNSAFE_componentWillMount(){
  //   this.menuNodes = this.getMenuNodes(menuList);
  // }

  render() {
    const openKey = this.openKey;
    const path = this.props.location.pathname;
    return (
      <div className="left-nav">
        <Link to="/home"className="left-nav-header">
          <img src={logo} alt="商城logo"></img>
          <div className="left-nav-header-name">商城后台</div>
        </Link>
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[path]}
          defaultOpenKeys={[openKey]}
        >
          {
            
            this.menuNodes
            //console.log(menuList)
          }
        </Menu>
      </div>
    )
  }
};

/**
 * 用withRouter高阶组件包装非组件，向他传递路由组件的3个特定属性
 */
export default withRouter(LeftNav)