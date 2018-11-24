import React, { Component } from 'react'
import {  withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { Input, Radio  } from 'antd';
import './index.scss'
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
function onChange(e) {
  console.log(`radio checked:${e.target.value}`);
}
@withRouter
@inject('defaultStore')
@observer


class UserAccessTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.value,
      editable: false,
    }
  }
  render() {
    const { value } = this.state;
    return (           
      <div className="user-access-table">
        <div className="access-table-container">
          <div className="editable-cell">
              <div style={{ paddingRight: 24 }}>
              <Input
                defaultValue={value}
                className="funtcion-frequency"
              /><span>/</span>
                <RadioGroup onChange={onChange} defaultValue="a">
                  <RadioButton value="日">日</RadioButton>
                  <RadioButton value="月">月</RadioButton>
                  <RadioButton value="年">年</RadioButton>
                </RadioGroup>
              </div>
          </div>
        </div>
      </div>
    )
  }
}
export default UserAccessTable