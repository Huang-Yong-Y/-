import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import './index.scss'

@withRouter
@inject('defaultStore')
@observer

class UserReview extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (           
      <div className="user-review">
        <div className="user-review-container">
            <h1>我是用户审批页面</h1>  
        </div>
      </div>
    )
  }
}
export default UserReview