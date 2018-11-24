import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { Menu, Row, Col, Dropdown, Icon  } from 'antd'
import './index.scss'

@withRouter
@inject('defaultStore')
@observer

class Headers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeMenu: props.location.pathname === "/" ? "/application" : props.location.pathname
        }
        this.toHome = this.toHome.bind(this);
    }

    componentWillMount(){
      // 对路由的判断进行menu默认选择的加载事件在componentDidMount之前
      if(this.state.activeMenu === "/user/userlist" || this.state.activeMenu === "/user/usercount" || this.state.activeMenu === "/user/userreview"){
        this.setState({
          activeMenu: "/user"
        }) 
      }
      if(this.state.activeMenu === "/application" || 
      this.state.activeMenu === "/application/layout"|| 
      this.state.activeMenu === "/application/user"|| 
      this.state.activeMenu === "/application/role"|| 
      this.state.activeMenu === "/application/access"     
    ){
        this.setState({
          activeMenu: "/application"
        }) 
      }
    }
    toHome(){
      this.props.history.push('/');
    }
    render() {
        //头部下拉菜单
        const menu = (
            <Menu>
              <Menu.Item>
                <span>退出登录</span> 
              </Menu.Item>
            </Menu>
        )
        const { activeMenu } = this.state
        
        return (
            <div className="ABCheader">
              <Row className="header_container">
                <Col span={5}>
                  <div className="header_logo" onClick={this.toHome}>
                    <img className="logo" src={require('../../images/logo.png')} alt="头像" />
                    <span className="logo_span"><i className="logo_shu">| </i> &nbsp;权限管理平台</span>
                  </div>
                </Col>
                <Col span={17}>
                  <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={[activeMenu]}
                    style={{ lineHeight: '3.64rem' }}
                  >
                    <Menu.Item key="/application"><Link to="/application">应用管理</Link></Menu.Item>
                    <Menu.Item key="/user"><Link to="/user">用户管理</Link></Menu.Item>
                    <Menu.Item key="/role"><Link to="/role">角色管理</Link></Menu.Item>
                  </Menu>
                </Col>
                <Col span={2}>
                  <div className="header_user">
                    <img className="user_img" src={require('../../images/liqin.jpg')} alt="头像" />
                    <Dropdown overlay={menu}>
                      <span style={{ cursor: "pointer" }}>
                        mcai <Icon type="down" />
                      </span>
                    </Dropdown>
                  </div>
                </Col>
              </Row>
            </div>
        )
    }
}
export default Headers