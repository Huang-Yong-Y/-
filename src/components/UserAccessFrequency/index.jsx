import React, { Component } from 'react'
import {  withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { Radio,DatePicker   } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN'
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
    return (           
      <div className="user-access-table">
        <div className="access-table-container">
          <div className="editable-cell">
              <div style={{ paddingRight: 24 }}>
              <RadioGroup onChange={onChange} defaultValue="a">
                  <RadioButton value="3个月">3个月</RadioButton>
                  <RadioButton value="1年">1年</RadioButton>
                  <RadioButton value="永久">永久</RadioButton>
                </RadioGroup><span>/</span>
                <DatePicker
                  locale={locale}
                  dateRender={(current) => {
                    const style = {};
                    if (current.date() === 1) {
                      style.border = '1px solid #1890ff';
                      style.borderRadius = '50%';
                    }
                    return (
                      <div className="ant-calendar-date" style={style}>
                        {current.date()}
                      </div>
                    );
                  }}
                />
              </div>
          </div>
        </div>
      </div>
    )
  }
}
export default UserAccessTable