import React, { Component } from 'react'
import { withRouter, Link, Switch, Redirect, Route } from 'react-router-dom'
import { Row, Col, Menu, Breadcrumb  } from 'antd'
import ApplicationUser from '../ApplicationUser'
import ApplicationRoleLayout from '../ApplicationRoleLayout'
import ApplicationAccess from '../ApplicationAccess'
import { inject, observer } from 'mobx-react'

import './index.scss'

const breadcrumbNameMap = {
  '/application': '应用管理 / ANALYST.AI',
  '/application/role':'角色',
  '/application/access':'权限',
  '/application/user': '用户',
  '/application/role/addnew':'新建角色',
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

class ApplicationDetailLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeMenu: props.location.pathname
    }
  }
  componentWillMount(){
    if(this.state.activeMenu === "/application/layout"){
      this.setState({
        activeMenu: "/application/user"
      }) 
    }
    if(this.state.activeMenu === "/application/role/addnew"){
      this.setState({
        activeMenu: "/application/role"
      }) 
    }
  }
  render() {
    const { activeMenu } = this.state
    return (           
      <div className="application-detail-layout">
        <div className="container"> 
          <Row className="detail-layout-header">
            <Col span={5} offset={2}>
              <img className="headerlogo" src={require('../../images/liqin.jpg')} alt="logo" />
              <span className="header_span">ANALYST.AI</span>  
            </Col>
            <Col span={14}>
              <Menu
                mode="horizontal"
                defaultSelectedKeys={[activeMenu]}
                style={{ lineHeight: '51px' }}
              >
                <Menu.Item key="/application/user"><Link to="/application/user">用户</Link></Menu.Item>
                <Menu.Item key="/application/role"><Link to="/application/role">角色</Link></Menu.Item>
                <Menu.Item key="/application/access"><Link to="/application/access">权限</Link></Menu.Item>
              </Menu>
            </Col> 
          </Row>
          <div className="application_router">
            <BreadRouter/>
          </div>
          <Switch>
            <Route exact path="/application/user" component={ApplicationUser} />
            <Route path="/application/role" component={ApplicationRoleLayout} />
            <Route path="/application/access" component={ApplicationAccess} />
            <Redirect from="/application/layout" to="/application/user" />
          </Switch>
        </div>
      </div>
    )
  }
}
export default ApplicationDetailLayout