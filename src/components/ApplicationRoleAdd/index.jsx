import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { Button, Form, Select, Input, Radio, } from 'antd';

import './index.scss'
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

@withRouter
@inject('defaultStore')
@observer

class ApplicationRoleAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 10 },
    };

    return (           
      <div className="application-role-add">
        <div className="container">
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label="角色名称"
            hasFeedback
          >
            {getFieldDecorator('rolename', {
              rules: [
                { required: true, message: '请输入角色名称' },
              ],
            })(
              <Input className="role_name" placeholder="请输入角色名称"/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="角色描述"
            hasFeedback
          >
            {getFieldDecorator('roledescript', {
              rules: [
                { required: true, message: '请输入角色描述' },
              ],
            })(
              <Input className="role_name" placeholder="请输入角色描述"/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="颜色标记"
          >
            {getFieldDecorator('radio-button')(
              <RadioGroup>
                <RadioButton value="a"></RadioButton>
                <RadioButton value="b"></RadioButton>
                <RadioButton value="c"></RadioButton>
                <RadioButton value="d"></RadioButton>
                <RadioButton value="e"></RadioButton>
                <RadioButton value="f"></RadioButton>
                <RadioButton value="g"></RadioButton>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="继承角色"
            hasFeedback
          >
            {getFieldDecorator('inherit', {
              rules: [
                { required: true, message: '请选择继承角色' },
              ],
            })(
              <Select className="role_name" placeholder="请选择">
                <Option value="inherit1">继承角色1</Option>
                <Option value="inherit2">继承角色2</Option>
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="互斥角色"
            hasFeedback
          >
            {getFieldDecorator('mutex', {
              rules: [
                { required: true, message: '请选择互斥角色' },
              ],
            })(
              <Select className="role_name" placeholder="请选择">
                <Option value="mutex1">互斥角色1</Option>
                <Option value="mutex2">互斥角色2</Option>
              </Select>
            )}
          </FormItem>    
          <FormItem
            wrapperCol={{ span: 12, offset: 6 }}
          >
            <Button type="primary" htmlType="submit">Submit</Button>
          </FormItem>
        </Form>
        </div>
      </div>
    )
  }
}
const WrappedNormalLoginForm = Form.create()(ApplicationRoleAdd);
export default WrappedNormalLoginForm