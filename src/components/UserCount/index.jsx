import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import './index.scss'

@withRouter
@inject('defaultStore')
@observer

class UserCount extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (           
      <div className="user-count">
        <div className="user-count-container"> 
          <h1>我是用户统计页面</h1> 
        </div>
      </div>
    )
  }
}
export default UserCount