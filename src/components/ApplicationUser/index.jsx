import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { Input, Button, Upload, Icon,message  } from 'antd';
import { UserList } from '../../config/baseApi';
import './index.scss'
import Cookies from 'js-cookie';
const Dragger = Upload.Dragger;

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
const props = {
  name:"file",
  multiple: true,
  withCredentials:true,
  data:params,
  action: UserList+"?token="+params.token+"&userId="+params.userId,
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

@withRouter
@inject('defaultStore')
@observer

class ApplicationUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount(){  
    console.log(localStorage.getItem('appId'))
  }
  getUrlParam  (name) {
    let search = document.location.search;
    let pattern = new RegExp("[?&]" + name + "=([^&]+)", "g");
    let matcher = pattern.exec(search);
    let items = null;
    if (null != matcher) {
        try {
            items = decodeURIComponent(decodeURIComponent(matcher[1]));
        } catch (e) {
            try {
                items = decodeURIComponent(matcher[1]);
            } catch (e) {
                items = matcher[1];
            }
        }
    }
    return items;
}
  render() {
    return (           
      <div className="application-user">
        <div className="user-import-div">本地导入</div>
        <div className="user-import">
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text"><span style={{textDecoration:'underline',color:'#407CD5'}}>点击上传文件</span>或者拖拽上传</p>
              <p className="ant-upload-hint">支持Excel、CSV格式文件</p>
            </Dragger>       
        </div>
        <div className="doload-div">下载文件模板</div> 
        <div className="user-api-div">API接入</div>
        <div className="user-api-bottom">
          <div className="user-input">
            <span>地址</span>
            <Input className="input-div" placeholder="Basic usage" />
            <Button className="user-button">开始</Button>
          </div>
          <div className="input-tishi">
            请输入正确的地址和参数，如www.abcfintech.com
          </div>
          <div className="user-in">
            <div className="information-div">
              <div className="information-left">XXX 用户进入系统</div>
              <div className="information-right">2018-05-08 10:23</div>
            </div>
            <div className="information-div">
              <div className="information-left">XXX 用户进入系统</div>
              <div className="information-right">2018-05-08 10:23</div>
            </div>  
            <div className="information-div">
              <div className="information-left">XXX 用户进入系统</div>
              <div className="information-right">2018-05-08 10:23</div>
            </div>  
            <div className="information-div">
              <div className="information-left">XXX 用户进入系统</div>
              <div className="information-right">2018-05-08 10:23</div>
            </div>  
            <div className="information-div">
              <div className="information-left">XXX 用户进入系统</div>
              <div className="information-right">2018-05-08 10:23</div>
            </div>
            <div className="look-more">
              查看更多
            </div>                       
          </div>
        </div>
      </div>
    )
  }
}
export default ApplicationUser