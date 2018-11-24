import React, { Component } from 'react'
import { Route, Switch, withRouter,Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import Header from '../Header'
import Footer from '../Footer'
import Application from '../Application'
import ApplicationDetailLayout from '../ApplicationDetailLayout'
import './index.scss'

@withRouter
@inject('defaultStore')
@observer

class ApplicationLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeMenu: props.location.pathname
    }
  }

  render() {
    return (
      <div className="application-layout">
       <Header/>
       <div className="container">       
        <Switch>
          <Route exact path="/application" component={Application} />
          <Route path="/application/layout" component={ApplicationDetailLayout} />
          <Route path="/application/user" component={ApplicationDetailLayout} />          
          <Route path="/application/role" component={ApplicationDetailLayout} />
          <Route path="/application/access" component={ApplicationDetailLayout} />
          <Redirect from="/" to="/application" />              
        </Switch>
       </div>
       
        <Footer/>  
      </div>
    )
  }
}
export default ApplicationLayout