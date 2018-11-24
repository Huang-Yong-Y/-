import React, { Component } from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import ApplicationLayout from '../../components/ApplicationLayout'
import Role from '../../components/Role'
import User from '../../components/User'
import './index.scss'


@withRouter
@inject('defaultStore')
@observer

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <div className="home_content">
                <Switch>
                    <Route path="/" component={ApplicationLayout}></Route>
                    <Route path="/application" component={ApplicationLayout}></Route>
                    <Route path="/user" component={User}></Route>
                    <Route path="/role" component={Role}></Route>
                </Switch>
            </div>
        )
    }
}
export default Home