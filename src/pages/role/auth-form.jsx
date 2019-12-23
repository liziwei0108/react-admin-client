import React, { Component } from 'react';
import { Form, Input, Tree } from 'antd';
import menuList from '../../config/menuConfig'

const Item = Form.Item;
const { TreeNode } = Tree;

export default class AuthForm extends Component {

  constructor(props) {
    super(props);
    this.treeNodes = this.getTreeNodes(menuList);
    const { menus } = this.props.role;
    this.state = {
      checkedKeys: menus
    }
  }

  //根据menuList生成树形权限图
  getTreeNodes = (menuList) => {
    return menuList.map(node => {
      return (
        <TreeNode title={node.title} key={node.key}>
          {
            node.children ? this.getTreeNodes(node.children) : null
          }
        </TreeNode>
      )
    })
  }

  //为父组件获取该组件的最新menus
  getMenus = () => this.state.checkedKeys

  onCheck = checkedKeys => {
    console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys });
  };

  //根据新传入的role来更新checkedKeys状态
  //当组件接收到新的props时自动调用
  componentWillReceiveProps(nextProps){
    const checkedKeys = nextProps.role.menus;
    this.setState({
      checkedKeys
    })

  }



  render() {

    const { role } = this.props;
    const { checkedKeys } = this.state;
    console.log(role.name)

    //指定Item布局的配置对象
    const formItemLayout = {
      labelCol: { span: 6 },    //左侧label的宽度
      wrapperCol: { span: 14 }   //右侧包裹的宽度
    }

    return (
      <div>
        <Item label="角色名称" {...formItemLayout}>
          <Input value={role.name} disabled />
        </Item>
        <Tree
          checkable
          defaultExpandAll={true}
          checkedKeys={checkedKeys}
          onCheck={this.onCheck}
        >
          <TreeNode title="平台权限" key="all">
            {this.treeNodes}
          </TreeNode>
        </Tree>
      </div>
    )
  }
}


