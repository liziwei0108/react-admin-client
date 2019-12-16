/**
 * 左侧导航组件
 */

import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom';
import { Menu, Icon } from 'antd';
import './index.less'
import logo from '../../assets/images/logo.png';
import menuList from '../../config/menuConfig';

const { SubMenu } = Menu;

class LeftNav extends Component {

  constructor(props){
    super(props);
    this.menuNodes = this.getMenuNodes(menuList);
  }

  /**
   * 根据Menu的数据数组生成对应的标签数组
   * 使用map+递归调用
   */
  getMenuNodes = (menuList) => {
    const path = this.props.location.pathname;
    return menuList.map(item => {
      if(!item.children){
        return(
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      }else{
        //确认当前需要展开的二级菜单
        const cItem = item.children.find(cItem => cItem.key===path);
        //如果cItem有值，则说明当前有要展开的二级菜单
        if(cItem){
          this.openKey = item.key;
        }

        return(
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
    })

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