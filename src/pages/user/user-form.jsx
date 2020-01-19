import React, { PureComponent } from 'react';
import { Form, Input, Select } from 'antd';
// import PropTypes from 'prop-types';

const Item = Form.Item;
const Option = Select.Option;

class UserForm extends PureComponent {
  // static PropTypes = {
  //   categoryName: PropTypes.string.isRequired
  // };

  constructor(props) {
    super(props);
    this.props.setForm(this.props.form);
  }

  render() {
    const {roles, user} = this.props;
    const { getFieldDecorator } = this.props.form;

    //指定Item布局的配置对象
    const formItemLayout = {
      labelCol: { span: 6 },    //左侧label的宽度
      wrapperCol: { span: 14 }   //右侧包裹的宽度
    }

    return (
      <Form>
        <Item label="用户名" {...formItemLayout}>
          {
            getFieldDecorator('username', {
              initialValue: user ? user.username : '',
              rules: [{
                required: true, message: '用户名必须输入！'
              }]
            })(
              <Input placeholder='请输入用户名' />
            )
          }
        </Item>
        {
          user ? null : (
            <Item label="密码" {...formItemLayout}>
              {
                getFieldDecorator('password', {
                  initialValue: '',
                  rules: [{
                    required: true, message: '密码必须输入！'
                  }]
                })(
                  <Input type='password' placeholder='请输入密码' />
                )
              }
            </Item>
          )
        }
        <Item label="手机号" {...formItemLayout}>
          {
            getFieldDecorator('phone', {
              initialValue: user ? user.phone : '',
              rules: [{
                required: true, message: '手机号必须输入！'
              }]
            })(
              <Input placeholder='请输入手机号' />
            )
          }
        </Item>
        <Item label="邮箱" {...formItemLayout}>
          {
            getFieldDecorator('email', {
              initialValue: user ? user.email : '',
              rules: [{
                required: true, message: '邮箱必须输入！'
              }]
            })(
              <Input placeholder='请输入邮箱' />
            )
          }
        </Item>
        <Item label="角色" {...formItemLayout}>
          {
            getFieldDecorator('role_id', {
              initialValue: user ? user.role_id : '',
              rules: [{
                required: true, message: '角色必须选择！'
              }]
            })(
              <Select placeholder='请选择角色'>
                {
                  roles.map(role => <Option key={role._id} value={role._id}>{role.name}</Option>)
                }
              </Select>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default Form.create()(UserForm)

