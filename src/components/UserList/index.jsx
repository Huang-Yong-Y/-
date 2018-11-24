import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { Input, Dropdown, Icon, Menu, Checkbox,  } from 'antd'
import UserListTable from '../UserListTable'
import './index.scss'
const CheckboxGroup = Checkbox.Group;

const plainOptions = ['EVERSIGHT.AI', 'ANALYST.AI','ANALYST.AI 2','ANALYST.AI 3','ANALYST.AI 4']
const defaultCheckedList = ['EVERSIGHT.AI', 'ANALYST.AI'];
const Search = Input.Search

@withRouter
@inject('defaultStore')
@observer

class UserList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checkedList: defaultCheckedList,
      indeterminate: true,
      checkAll: false,
      applyList: false,
      stateList: false,
      rootList: false,
    }
  }
  clearAll = () => {
    console.log("清除全部")
  }
  onChange = (checkedList) => {
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
      checkAll: checkedList.length === plainOptions.length,
    });
  }
  onCheckAllChange = (e) => {
    this.setState({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  }
  handleApplyListChange = (flag) => {
    this.setState({ applyList: flag });
  }
  handleStateListChange = (flag) => {
    this.setState({ stateList: flag });
  }
  handleRootListChange = (flag) => {
    this.setState({ rootList: flag });
  }
  render() {
    const apply = (  
        <Menu selectable>
          <Checkbox
            indeterminate={this.state.indeterminate}
            onChange={this.onCheckAllChange}
            checked={this.state.checkAll}
          >
            全部
          </Checkbox>
          <CheckboxGroup options={plainOptions} value={this.state.checkedList} onChange={this.onChange} />
        </Menu>
    );
    const state = (  
      <Menu selectable>
        <Checkbox
          indeterminate={this.state.indeterminate}
          onChange={this.onCheckAllChange}
          checked={this.state.checkAll}
        >
          全部
        </Checkbox>
        <CheckboxGroup options={plainOptions} value={this.state.checkedList} onChange={this.onChange} />
      </Menu>
    );
    const root = (  
      <Menu selectable>
        <Checkbox
          indeterminate={this.state.indeterminate}
          onChange={this.onCheckAllChange}
          checked={this.state.checkAll}
        >
          全部
        </Checkbox>
        <CheckboxGroup options={plainOptions} value={this.state.checkedList} onChange={this.onChange} />
      </Menu>
    );
    return (           
      <div className="user-list">
        <div className="user-list-container">
          <div className="div-search">
            <Search
              placeholder="输入邮箱或用户名查询"
              onSearch={value => console.log(value)}
              enterButton
              className="user-list-search"
            />
          </div> 
          <div className="div-drop">
            <Dropdown overlay={apply} 
              onVisibleChange={this.handleApplyListChange}
              visible={this.state.applyList}
              trigger={['click']}
            >
              <span className="ant-dropdown-link">
                所属应用 <Icon type="down" />
              </span>
            </Dropdown>
            <Dropdown overlay={state} 
              onVisibleChange={this.handleStateListChange}
              visible={this.state.stateList}
              trigger={['click']}
            >
              <span className="ant-dropdown-link">
                状态 <Icon type="down" />
              </span>
            </Dropdown>
            <Dropdown overlay={root} 
              onVisibleChange={this.handleRootListChange}
              visible={this.state.rootList}
              trigger={['click']}
            >
              <span className="ant-dropdown-link">
                用户来源 <Icon type="down" />
              </span>
            </Dropdown>
            <span onClick={this.clearAll} className="ant-dropdown-link">
              清除
            </span>
          </div>
          <div className="div-table">
            <UserListTable />
          </div> 
        </div>
      </div>
    )
  }
}
export default UserList