import React, { Component } from 'react';
import {Card, Button, Modal, Table} from 'antd';
import { reqUsers } from '../../api';
import { formateDate } from '../../utils/dateUtils';
import LinkButton from '../../components/link-button'
/**
 * 用户管理
 */

export default class User extends Component {

  constructor(props){
    super(props);
    this.state = {
      users: [],       //所有用户列表
      roles: [],       //所有角色列表
      isShow: false    //是否显示模态框
    }

    //初始化表格的列名
    this.columns = [
      {
        title: '用户名',
        dataIndex: 'username',
      },
      {
        title: '邮箱',
        dataIndex: 'email',

      },
      {
        title: '电话',
        dataIndex: 'phone',

      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        render: (create_time) => formateDate(create_time)
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        render: (role_id) => this.state.roles.find(role => true).name
      },
      {
        title: '操作',
        render: (user) => {
          return(
            <span>
              <LinkButton onClick={() => this.showUpdate(user)}>修改</LinkButton>
              <LinkButton onClick={() => this.showDelete(user)}>删除</LinkButton>
            </span>
          )
        }
      },

    ]
  }

  //添加或更新用户
  addOrUpdate = () => {
    console.log('添加或更新用户')
  }

  //隐藏模态框
  handleCancel = () => {
    this.setState({isShow: false})
  }

  //获取用户列表
  getUsers = async() => {
    const response = await reqUsers();
    if(response.status === 0){
      const {users, roles} = response.data;
      this.setState({users, roles})

    }
  }

  componentDidMount(){
    this.getUsers();
  }

  render(){

    const {users, isShow} = this.state

    const title  = <Button type="primary">创建用户</Button>
    return(
      <Card title={title}>
        <Table
          bordered rowKey='_id'
          dataSource={users}
          columns={this.columns}
          pagination={{ defaultPageSize: 5 }}
        />

        <Modal
          title="添加用户"
          visible={isShow}
          onOk={this.addOrUpdate}
          onCancel={this.handleCancel}
        >
          <div>添加用户</div>
        </Modal>

      </Card>
    )
  }
}