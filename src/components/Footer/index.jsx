import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { Layout } from 'antd'

import './index.scss'
const { Footer } = Layout
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
            <div>
                <Footer style={{ textAlign: 'center' }}>
                    Copyright © 2016-2018   北京阿博茨科技有限公司
                </Footer>
            </div>
        )
    }
}
export default Role