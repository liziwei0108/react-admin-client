import React, { Component } from 'react';
import { Card, Table, Button, message, Modal } from 'antd';
import { reqRoles, reqAddRole, reqUpdateRole } from '../../api'
import MemoryUtils from '../../utils/memoryUtils'
import {formateDate} from '../../utils/dateUtils'
import AddForm from './add-form'
import AuthForm from './auth-form'

/**
 * 角色管理
 */

export default class Role extends Component {


  constructor(props) {
    super(props);
    this.state = {
      roles: [],    //所有角色的列表
      role: {},      //当前选中的角色
      isShowAdd: false,    //是否显示添加角色modal
      isShowAuth: false,   //是否显示设置权限modal

    }

    //初始化表格的列名
    this.columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render: (create_time) => formateDate(create_time)

      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        render: (auth_time) => formateDate(auth_time)
      },
      {
        title: '授权人',
        dataIndex: 'auth_name',
      },

    ]

    //创建存放authForm实例对象的容器
    this.auth = React.createRef();
  }

  //展示添加角色modal
  showAdd = () => {
    this.setState({
      isShowAdd: true
    })
  }

  //展示更新角色modal
  showUpdate = () => {
    this.setState({
      isShowAuth: true
    })
  }

  //添加角色
  addRole = () => {
    //进行表单验证
    this.form.validateFields(async (err, values) => {
      if (!err) {
        //隐藏modal
        this.setState({
          isShowAdd: false
        })

        //获取表单数据
        const { roleName } = values;

        //清除表单数据
        this.form.resetFields();

        //发请求
        const response = await reqAddRole(roleName);
        if (response.status === 0) {

          //更新roles：基于原本的状态数据
          const role = response.data;
          this.setState(state => ({
            roles: [...state.roles, role]
          }))

          //更新表单数据
          //this.getRoles();

          message.success('添加角色成功！')

        }

      } else {
        message.error('表单校验失败！')
      }

    })
  }
  
  //更新角色（为角色设置权限）
  updateRole = async() => {
    this.setState({
      isShowAuth: false
    })

    const { role } = this.state;
    //current得到组件的实例对象，并调用该对象中的函数来获取更新后的menus数据
    const menus = this.auth.current.getMenus()
    role.menus = menus;
    role.auth_time = Date.now()
    role.auth_name = MemoryUtils.user.username;

    //请求更新
    const response = await reqUpdateRole(role);
    if(response.status===0){
      message.success('权限设置成功！')
      //更新角色列表
      this.setState({
        roles: [...this.state.roles]
      })
      
    }else{
      message.error('权限设置失败！')
    }
  }

  //隐藏添加角色modal
  handleCancelAdd = () => {
    //清除数据
    this.form.resetFields();
    //隐藏确认框
    this.setState({
      isShowAdd: false,
    })
  }

  //隐藏更新角色modal
  handleCancelUpdate = () => {
    //隐藏确认框
    this.setState({
      isShowAuth: false
    })
  }

  //发送异步ajax请求，获取表格数据
  getRoles = async () => {
    const response = await reqRoles();
    if (response.status === 0) {

      this.setState({
        roles: response.data
      })
    } else {
      message.error("获取角色列表失败！")
    }
  }

  //点击表格中某一行的回调函数
  //具体格式查看antd中表格组件的onRow函数
  onRow = (record) => {
    return {
      onClick: (e) => {
        //alert('点击行')
        this.setState({
          role: record
        })
      }
    }
  }

  componentDidMount() {
    this.getRoles();
  }



  render() {
    const { roles, role, isShowAdd, isShowAuth } = this.state;
    const title = (
      <span>
        <Button type="primary" onClick={this.showAdd}>创建角色</Button> &nbsp;&nbsp;
        <Button type="primary" disabled={!role._id} onClick={this.showUpdate}>设置角色权限</Button>
      </span>
    )
    return (
      <Card title={title}>
        <Table
          bordered rowKey='_id'
          dataSource={roles}
          columns={this.columns}
          onRow={this.onRow}
          rowSelection={{ type: 'radio', selectedRowKeys: [role._id] }}
          pagination={{ defaultPageSize: 5 }}
        />

        <Modal
          title="创建角色"
          visible={isShowAdd}
          onOk={this.addRole}
          onCancel={this.handleCancelAdd}
        >
          <AddForm setForm={(form) => { this.form = form }} />
        </Modal>

        <Modal
          title="设置角色权限"
          visible={isShowAuth}
          onOk={this.updateRole}
          onCancel={this.handleCancelUpdate}
        >
          <AuthForm role={role} ref={this.auth}/>
        </Modal>

      </Card>
    )
  }
}