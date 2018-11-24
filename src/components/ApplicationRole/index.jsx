import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { Button } from 'antd';
import './index.scss'
@withRouter
@inject('defaultStore')
@observer

class ApplicationRole extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  addNewRole = () =>{
    this.props.history.push( '/application/role/addnew');
  }
  addManyRole = () =>{
    console.log("我是导入大量数据")
  }
  render() {
    const { addNewRole, addManyRole } =this;

    return (           
      <div className="application-role">
        <div className="container">
          <div className="role_none">
            <img 
              className="role_img" 
              src={require('../../images/liqin.jpg')} 
              alt="logo" 
            />
            <p>当前无任何角色</p>
            <Button onClick={addNewRole} className="add_new">
              新建角色
            </Button>
            <Button onClick={addManyRole}className="import_many">批量导入</Button>
          </div>
        </div>
      </div>
    )
  }
}
export default ApplicationRole