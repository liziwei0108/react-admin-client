import React, { Component } from 'react';
import { Form, Input, Tree } from 'antd';
import menuList from '../../config/menuConfig'

const Item = Form.Item;
const { TreeNode } = Tree;

export default class AuthForm extends Component {

  constructor(props) {
    super(props);
    this.treeNodes = this.getTreeNodes(menuList);
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



  render() {

    const { role } = this.props
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
        >
          <TreeNode title="平台权限" key="all">
            {this.treeNodes}
          </TreeNode>
        </Tree>
      </div>
    )
  }
}


