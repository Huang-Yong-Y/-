import React, { Component } from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import ApplicationRole from '../ApplicationRole'
import ApplicationRoleAdd from '../ApplicationRoleAdd'
import './index.scss'

@withRouter
@inject('defaultStore')
@observer

class ApplicationRoleLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (           
      <div className="application-role-layout">
        <Switch>
          <Route exact path="/application/role" component={ApplicationRole} />
          <Route exact path="/application/role/addnew" component={ApplicationRoleAdd} />
          {/* <Route path="/application/role/editrole" component={ApplicationEditRole} /> */}
        </Switch>
      </div>
    )
  }
}
export default ApplicationRoleLayout