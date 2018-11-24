import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import Header from '../Header'
import Footer from '../Footer'
import './index.scss'

@withRouter
@inject('defaultStore')
@observer

class Role extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (           
      <div className="role">
        <Header/>
        <div className="container">
            我是role
        </div>
        <Footer/>
      </div>
    )
  }
}
export default Role