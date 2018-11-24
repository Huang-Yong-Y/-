import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { Button, Upload,message } from 'antd';
import { AccessList } from '../../config/baseApi';
import './index.scss'
import Cookies from 'js-cookie';
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
@withRouter
@inject('defaultStore')
@observer

class ApplicationAccess extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    // 功能权限导入
    const funtctionProps = {
      name:"file",
      multiple: true,      
      action: AccessList+"?token="+params.token+"&userId="+params.userId,
      data:params,  
      onChange(info) {
        const status = info.file.status;
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      }
    };
    // 模块权限导入
    const moduleProps = {
      name:"file",
      multiple: true,      
      action: '//api.researchreport.cn/api/auth/user/importUserFile',
      onChange(info) {
        console.log(info);
      }
    };
    return (           
      <div className="application-access">
        <div className="container">
            <div className="function-access">
              <div className="function">
                功能权限
              </div>
              <div className="function-button">
                <Upload className="function-upload" {...funtctionProps}>
                  <Button>导入</Button>
                </Upload>
                <Button className="function-add">新增</Button>
              </div>
            </div>
            <div className="module-access">
            <div className="module">
                模块权限
              </div>
              <div className="module-button">
                <Upload className="module-upload" {...moduleProps}>
                  <Button>导入</Button>
                </Upload>
                <Button className="module-add">新增</Button>
              </div>
            </div>
        </div>
      </div>
    )
  }
}
export default ApplicationAccess