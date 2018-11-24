import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import UserList from '../UserList'
import UserAccess from '../UserAccess'
import './index.scss'

@withRouter
@inject('defaultStore')
@observer

class UserListLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (           
      <div className="user-listlayout">
        <div className="user-listlayout-container">
            <Switch>
              <Route exact path="/user/userlist" component={UserList}/>
              <Route path="/user/userlist/access" component={UserAccess} />
            </Switch>
        </div>
      </div>
    )
  }
}
export default UserListLayout