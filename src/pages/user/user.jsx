import React, { Component } from 'react';
import { Card, Button, Modal, Table, message } from 'antd';
import { reqUsers, reqDeleteUser, reqAddOrUpdateUser } from '../../api';
import { formateDate } from '../../utils/dateUtils';
import LinkButton from '../../components/link-button';
import UserForm from './user-form'
/**
 * 用户管理
 */

export default class User extends Component {

  constructor(props) {
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
        render: (role_id) => this.roleNames[role_id]
      },
      {
        title: '操作',
        render: (user) => {
          return (
            <span>
              <LinkButton onClick={() => this.showUpdate(user)}>修改</LinkButton>
              <LinkButton onClick={() => this.showDelete(user)}>删除</LinkButton>
            </span>
          )
        }
      },

    ]
  }

  //获取角色id和角色名的键值对并存入对象
  initRoleNames = (roles) => {
    const roleNames = roles.reduce((pre, role) => {
      pre[role._id] = role.name
      return pre;
    }, {})
    this.roleNames = roleNames;
  }

  handleCancel = () => {
    this.setState({
      isShow: false
    })
  }


  //添加或更新用户
  addOrUpdate = async () => {
    console.log('添加或更新用户')
    this.setState({
      isShow: false
    });
    //收集数据
    const user = this.form.getFieldsValue()
    this.form.resetFields();

    let messageText;

    //若this.user存在 说明是更新用户，给user中添加userid
    if (this.user) {
      user._id = this.user._id
      messageText = '修改用户'
    } else {
      messageText = '添加用户'
    }

    //提交添加/更新请求请求
    const response = await reqAddOrUpdateUser(user)
    if (response.status === 0) {
      message.success(messageText + '成功！');
      //更新列表显示
      this.getUsers();
    } else {
      message.error(messageText + '失败！')
    }
  }

  //隐藏模态框
  handleCancel = () => {
    this.form.resetFields();
    this.setState({ isShow: false })
  }

  //获取用户列表
  getUsers = async () => {
    const response = await reqUsers();
    if (response.status === 0) {

      const { users, roles } = response.data;
      this.initRoleNames(roles);
      this.setState({ users, roles })

    }
  }

  //显示删除模态框
  showDelete = (user) => {
    Modal.confirm(
      {
        title: `确认删除${user.username}吗？`,
        okText: '确认',
        cancelText: '取消',
        onOk: async () => {
          const response = await reqDeleteUser(user._id);
          if (response.status === 0) {
            message.success('删除用户成功！');
            this.getUsers();
          }
        },
        onCancel() {
          console.log('取消');
        }
      }
    )

  }

  //显示修改用户modal
  showUpdate = (user) => {
    //将user存入this.user,帮助区分是添加用户还是修改用户
    this.user = user;
    this.setState({
      isShow: true
    })

  }

  componentDidMount() {
    this.getUsers();
  }

  render() {

    const { users, isShow, roles } = this.state;
    const user = this.user;

    const title = <Button type="primary" onClick={() => {
      this.user = null;
      this.setState({ isShow: true })
    }}>创建用户</Button>
    return (
      <Card title={title}>
        <Table
          bordered rowKey='_id'
          dataSource={users}
          columns={this.columns}
          pagination={{ defaultPageSize: 5 }}
        />

        <Modal
          title={user ? '修改用户' : '添加用户'}
          visible={isShow}
          onOk={this.addOrUpdate}
          onCancel={this.handleCancel}
        >
          <UserForm setForm={(form) => { this.form = form }} roles={roles} user={user} />
        </Modal>

      </Card>
    )
  }
}