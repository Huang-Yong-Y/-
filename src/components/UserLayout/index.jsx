import React, { Component } from 'react'
import { Route, Switch, Link, withRouter, Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import UserCount from '../UserCount'
import UserListLayout from '../UserListLayout'
import UserReview from '../UserReview'
import { Breadcrumb , Row, Col ,Menu } from 'antd'

import './index.scss'

const breadcrumbNameMap = {
  '/user': '用户管理',
  '/user/usercount': '用户统计',
  '/user/userlist': '用户列表',
  '/user/userlist/access': '权限配置',
  '/user/userreview': '用户审批',
}
const BreadRouter = withRouter((props) => {
  const { location } = props;
  const pathSnippets = location.pathname.split('/').filter(i => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>
          {breadcrumbNameMap[url]}
        </Link>
      </Breadcrumb.Item>
    )
  })
  const breadcrumbItems = [(
    <Breadcrumb.Item key="home"></Breadcrumb.Item>
  )].concat(extraBreadcrumbItems);
  return (
    <div className="bread-header">
      <Breadcrumb>
        {breadcrumbItems}
      </Breadcrumb>
    </div>
  )
})

@withRouter
@inject('defaultStore')
@observer

class UserLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeMenu: props.location.pathname === "/user/usercount" ? "/user/usercount":props.location.pathname
    }
  }
  componentWillMount(){
    if(this.state.activeMenu === "/user"){
      this.setState({
        activeMenu: "/user/usercount"
      }) 
    }
    if(this.state.activeMenu === "/user/userlist/access"){
      this.setState({
        activeMenu: "/user/userlist"
      }) 
    }
  }
  render() {
    const { activeMenu } = this.state
    return (
      <div className="user-layout">
        <div className="container">
          {/* 头部的面包屑 */}
          <BreadRouter/>
          <Row className="user-layout-detail">
            {/* 目录 */}
            <Col className="user-layout-left" span={4}>
              <Menu
                style={{ width: '100%' }}
                defaultSelectedKeys={[activeMenu]}
                mode="inline"
              >
                <Menu.Item key="/user/usercount">
                  <Link to="/user/usercount">用户统计</Link>
                </Menu.Item>
                <Menu.Item key="/user/userlist">
                  <Link to="/user/userlist">用户列表</Link>
                </Menu.Item>
                <Menu.Item key="/user/userreview">
                  <Link to="/user/userreview">用户审批</Link>
                </Menu.Item>
              </Menu>
            </Col>
            {/* 内容 */}
            <Col className="user-layout-right" span={20}>
              <Switch>
                <Route path="/user/usercount" component={UserCount} />
                <Route path="/user/userlist" component={UserListLayout}/>
                <Route path="/user/userreview" component={UserReview} />
                <Redirect from="/user" to="/user/usercount" />
              </Switch>
            </Col>
          </Row>
          
        </div>
      </div>
    )
  }
}
export default UserLayout