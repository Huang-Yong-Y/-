import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import Header from '../Header'
import Footer from '../Footer'
import UserLayout from '../UserLayout'

import './index.scss'

@withRouter
@inject('defaultStore')
@observer

class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }    
  }

  render() {
    return (
      <div className="user">
        <Header/>
          <UserLayout/>
        <Footer/>
      </div>
    )
  }
}
export default User