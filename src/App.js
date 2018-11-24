import React, { Component } from 'react'
// import DevTools from 'mobx-react-devtools'
import { Switch, Route } from 'react-router-dom'
import Home from './containers/Home'
import ApplicationLayout from './components/ApplicationLayout'
import Role from './components/Role'
import User from './components/User'
import NotFound from './containers/NotFound'
import Cookies from 'js-cookie'
import './theme/app.scss'
import './App.scss'
class App extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props)

  }
  async componentDidMount () {
    if (!Cookies.get('token')) return
    try {
      let params={};
      if(params === undefined){
          params = {}
      }
      // 从cookie中获取当前登录用户的信息
      const userId = Cookies.get('userId');
      const token = Cookies.get('token');
      // 配置请附带的token与userId参数
      params = params || {};
      params.token = token;
      params.userId = userId;
      localStorage.setItem('userId',params.userId)
      localStorage.setItem('token',params.token)
    } catch (e) {
      console.log(e)
    }
  }
  render() {
    
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/application" component={ApplicationLayout}></Route>
          <Route path="/user" component={User}></Route>
          <Route path="/role" component={Role}></Route>
          <Route component={NotFound}></Route>
        </Switch>
        {/* {process.env.NODE_ENV === 'development' && <DevTools />} */}
      </div>
    )
  }
}
export default App
