import React, { Component } from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';

import './login.less';
import logo from '../../assets/images/logo.png';
import {login} from '../../redux/actions'



class Login extends Component {

  handleSubmit = (e) => {

    //阻止事件的默认行为 在本事件中是表单的自动提交
    e.preventDefault();

    //对要提交的所有字段数据进行校验
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { username, password } = values;

        //调用分发异步action的函数 =>有结果后更新redux中的user
        this.props.login(username, password)

      } else {
        console.log('校验失败！');
      }
    });

    // const { form } = this.props;
    // const values = form.getFieldsValue();
    // console.log(values);

  }

  /*
  验证密码的校验规则
  1). 必 须 输 入
  2). 必 须 大 于 等 于 4 位
  3). 必 须 小 于 等 于 12 位
  4). 必 须 是 英 文 、 数 字 或 下 划 线 组 成
  */
  validatePwd = (rule, value, callback) => {
    if (!value) {
      callback('密码必须输入！');
    } else if (value.length < 4) {
      callback('密码最少4个字符！')
    } else if (value.length > 12) {
      callback('密码最多12个字符！')
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback('密码必须是英文、数字或下划线组成');
    } else {
      callback();         //验证通过
    }

  }

  render() {

    const user = this.props.user;
    if(user._id){
      return <Redirect to='/home' />
    }else{
      message.error(this.props.user.msg)
    }

    const form = this.props.form;
    const { getFieldDecorator } = form;

    return (
      <div className="login">
        <header className="login__header">
          <img src={logo} alt="logo"></img>
          <div className="login__header__name">React项目-后台管理系统</div>
        </header>
        <div className="login__content">
          <div className="login__content__name">用户登录</div>
          <div>
            {
              /* 用 户 名 / 密 码 的 合 法 性 要 求 
              1). 必 须 输 入 
              2). 必 须 大 于 等 于 4 位 
              3). 必 须 小 于 等 于 12 位 
              4). 必 须 是 英 文 、 数 字 或 下 划 线 组 成 */
            }
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [{ required: true, whitespace: true, message: '请输入用户名！' }
                    , { min: 4, message: '用户名最少4个字符！' }
                    , { max: 12, message: '用户名最多12个字符！' }
                    , { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须由英文、数字或下划线组成！' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="用户名"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ validator: this.validatePwd }],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    )
  }

}

const WrapLogin = Form.create()(Login)
export default connect(
  state => ({
    user:state.user
  }),
  {login}
)(WrapLogin)