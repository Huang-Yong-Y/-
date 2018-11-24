import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { Row, Col, Modal, Menu, Input, Dropdown, Form, Upload, Icon,message  } from 'antd'
import { get, post }from "../../lib/axios";
import { AplicationList } from '../../config/baseApi';
import './index.scss'
import Cookies from 'js-cookie';
const FormItem = Form.Item
  // 删除弹框
  const DeleteModel = Form.create()(props => {
    // 从父节点处获取到props属性包括state的状态和函数
    const { deleteModeVisible, handelCancel, handelOk } =props
    return (
      <Modal 
        visible={deleteModeVisible}
        title="删除"
        onOk={handelOk}
        onCancel={handelCancel}
        okText="确认"
        cancelText="取消"
        className="deleteMode"
      >
        <span>确定要删除吗？删除后将无法恢复。</span> 
      </Modal>
    )
  })
  // 设置应用弹框
  const SettingModel = Form.create()(props => {
    // 从父节点处获取到props属性包括state的状态和函数
    const { settingModeVisible, handelSetCancel, handelSetOk, 
      displayChange, 
      displayLogoChange,
      changeCover,
      changeLogoCover,
      changeDisplay,
      changeDisplayNone,
      changeLogoDisplay,
      changeLogoDisplayNone} =props
    return (
      <Modal 
        visible={settingModeVisible}
        title="设置应用"
        onOk={handelSetOk}
        onCancel={handelSetCancel}
        okText="完成"
        cancelText="取消"
        className="settingMode"
      >
        <Row className="settingDiv">
          <Col span={6} className="setting-left">设置应用名称</Col>
          <Col span={18}>
            <Input className="settingInput" placeholder="EVERSIGHT.AI"/>
          </Col>
        </Row>
        <Row className="settingDiv">
          <Col span={6} className="setting-left">Appsecret</Col>
          <Col span={18}>
            <Input className="settingInput" placeholder="12345678900000"/>
          </Col>
        </Row>
        <Row className="settingDiv">
          <Col span={6} className="setting-left">Appkey</Col>
          <Col span={18}>
            <Input className="settingInput" placeholder="12345678900000"/>
          </Col>
        </Row>
        <Row className="settingCover">
          <Col span={6} className="setting-left">设置应用封面</Col>
          <Col span={18} className="setting-right">
            <div onMouseEnter={ () => changeDisplay("setting") } onMouseLeave={ () => changeDisplayNone() } className="setting-top">
              {
                displayChange ? <div onClick={ () => changeCover("setting")} className="setting-hover">更换封面</div> :""
              }
            </div> 
            <div className="setting-bottm">建议尺寸380*180px</div>
          </Col>
        </Row>
        <Row className="settingCover">
          <Col span={6} className="setting-left">上传logo</Col>
          <Col span={18} className="setting-logo-right">
            <div onMouseEnter={ () => changeLogoDisplay() } onMouseLeave={ () => changeLogoDisplayNone() }  className="setting-logo-top">
              {
                displayLogoChange ? <div onClick={ () => changeLogoCover("setting")} className="setting-logo-hover">更换logo</div> :""
              }
            </div> 
            <div className="setting-logo-bottm">建议尺寸60*60px</div>
          </Col>
        </Row>
      </Modal>
    )
  })
  // 新建应用弹框
  const AddNewModel = Form.create()(props => {
    // 从父节点处获取到props属性包括state的状态和函数
    const { addNewApp, handelAddSetCancel, 
      handelAddSetOk,
      form,
      previewVisible, previewImage, imgList,
      handleChange,handleCancel,handlePreview,
      previewLogoVisible, previewLogoImage, imglogoList,
      handleLogoCancel,handleLogoPreview,handleLogoChange,
      imgData,logoData
    } =props
    
    //上传图片api 目前需要写死
    // const uploadCover = ApplicationUploadImage || ''

    const uploadCover = "//api.researchreport.cn/api/auth/application/uploadImage"  
    const confirmHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        if(imgData !== "" && logoData !== ""){
            fieldsValue.appCoverUrl=imgData
            fieldsValue.appLogoUrl=logoData
            handelAddSetOk(fieldsValue);      
        }else{
          alert("请上传封面照片请上传logo照片")
        }    
      }) 
    }
    //弹窗的表单布局
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
    
    const uploadLogoButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">UploadLogo</div>
      </div>
    );

    // 上传封面的按钮
    const uploadCoverButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">UploadCover</div>
      </div>
    );
    return (
      <Modal 
        visible={addNewApp}
        title="新建应用"
        onOk={confirmHandle}
        onCancel={handelAddSetCancel}
        okText="完成"
        cancelText="取消"
        className="settingMode"
      >
        <FormItem {...formItemLayout} label="设置应用名称" className="settingDiv">
            {form.getFieldDecorator('appName',{
            rules: [{
              required: true,
              message: '应用名称不能为空',
            }],
          })(
            <Input className="settingInput" placeholder="请输入应用名称"/>
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="Appsecret" className="settingDiv">
            {form.getFieldDecorator('appSecretKey', {
            rules: [{
              required: true,
              message: 'Appsecret不能为空',
            }],
          }
          )(
            <Input className="settingInput" placeholder="请输入Appsecret"/>
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="Appkey" className="settingDiv">
            {form.getFieldDecorator('appPublicKey',{
            rules: [{
              required: true,
              message: 'Appkey不能为空',
            }],
          }
          )(
            <Input className="settingInput" placeholder="请输入Appkey"/>
            )}
        </FormItem>
        <Row className="settingCover">
          <Col span={6} className="setting-left">设置应用封面</Col>
          <Col span={18} className="setting-right">
            <Upload
                action={uploadCover}
                listType="picture-card"
                fileList={imgList}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {imgList.length >= 1 ? null : uploadCoverButton}
              </Upload>
              <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
              </Modal>
            <div className="setting-bottm">建议尺寸380*180px</div>
          </Col>
        </Row>
        <Row className="settingCover">
          <Col span={6} className="setting-left">上传logo</Col>
          <Col span={18} className="setting-logo-right">
            <Upload
                action={uploadCover}
                listType="picture-card"
                fileList={imglogoList}
                onPreview={handleLogoPreview}
                onChange={handleLogoChange}
              >
                {imglogoList.length >= 1 ? null : uploadLogoButton}
              </Upload>
              <Modal visible={previewLogoVisible} footer={null} onCancel={handleLogoCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewLogoImage} />
              </Modal>
            <div className="setting-logo-bottm">建议尺寸60*60px</div>
          </Col>
        </Row>
      </Modal>
    )
  })
@withRouter
@inject('defaultStore')
@observer

class Application extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deleteModeVisible:false, //删除模块的显示隐藏
      settingModeVisible:false, //设置模块的显示隐藏
      displayChange:false, //显示改变
      displayLogoChange:false, //显示logo的改变hover效果
      addNewApp:false, //新建应用的显示隐藏
      listDatas:[],
      // cover
      previewVisible: false,
      previewImage: '',
      imgList: [],
      imgData:"",
      //logo
      previewLogoVisible: false,
      previewLogoImage: '',
      imglogoList: [],
      logoData:"",
    }
  } 
  
  componentDidMount() {
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
    get(AplicationList,params,(data,err)=>{   
          if(err){
             console.log(err)
          }
          else{    
            console.log(data);
            this.setState({
              listDatas:data
            })
          }
      });      
    }
   //删除模型的函数
   handelDeleteModeVisible = (appId) => {
     console.log(appId)
    this.setState({
      deleteModeVisible: true,
    });
  }
  //删除模型的取消函数
  handelCancel = () =>{
    this.setState({
      deleteModeVisible: false,
    });    
  }
  //删除模型的确定函数
  handelOk = () => {
    this.setState({
      deleteModeVisible: false,
    });
  }
  // 设置模型弹出函数
  handleSetting = () => {
    this.setState({
      settingModeVisible: true,
    });
  }
  // 设置模型取消函数
  handelSetCancel = () => {
    this.setState({
      settingModeVisible: false,
    });
  }
  // 设置模型确定函数
  handelSetOk = () =>{
    this.setState({
      settingModeVisible: false,
    });
  }
  // 设置模型改变封面函数
  changeCover = (value) => {
    console.log(value)    
    alert("改变封面")
  }
  // 设置模型改变logo封面的函数
  changeLogoCover = (value) => {
    console.log(value)    
    alert("改变logo封面")
  }
  // 设置模型改变显示隐藏的hover效果
  changeDisplay = (value) =>{
    console.log(value)
    this.setState({
      displayChange: true,
    });
  }
  // 设置模型改变显示隐藏的hover效果
  changeDisplayNone = () =>{
    this.setState({
      displayChange: false,
    });
  }
  // 设置模型改变显示隐藏的hover效果
  changeLogoDisplay = () =>{
    this.setState({
      displayLogoChange: true,
    });
  }
  // 设置模型改变显示隐藏的hover效果
  changeLogoDisplayNone = () =>{
    this.setState({
      displayLogoChange: false,
    });
  }
  // 新建一个应用模型弹出函数
  addApp = () =>{
    this.setState({
      addNewApp: true,
    });
  }
  // 新建一个应用模型确定函数
  handelAddSetOk = (fieldsValue) => {
    if(fieldsValue === "") return;
    post("//api.researchreport.cn/api/auth/application/insert",fieldsValue,(data,err)=>{       
      if(err){
        console.log(err)
      }
      else{
        window.location.reload()
        this.setState({
          addNewApp: false,
        });
      }
    })
  }
  // 新建一个应用模型取消函数
  handelAddSetCancel = () => {
    this.setState({
      addNewApp: false,
    });
  }

  // 跳转到新详情页 
  appListToDetail = (appId) => {
    localStorage.setItem('appId',appId)
    this.props.history.push( '/application/user?appId='+appId);
  }
  // 上传封面照片的取消
  handleCancel = () => this.setState({ previewVisible: false })
  // 上传封面照片的预览
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  // 上传封面照片的函数
  handleChange = (info) => {
    this.setState({ 
      imgData:""
    }) 
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} 应用封面上传成功.`);     
    } else if (status === 'error') {
      message.error(`${info.file.name} 应用封面上传失败.`);
    } else if (status === 'removed') {
      this.setState({ 
        imgData:""
      }) 
      message.success(`${info.file.name} 应用封面 removed.`);
    }
    if(info.file.response !== undefined && info.file.response.message ==="success"){
      this.setState({ 
        imgData:info.file.response.data 
      }) 
    } 
    this.setState({ 
      imgList:info.fileList 
    }) 
  }
  // 上传logo照片的取消函数
  handleLogoCancel = () => this.setState({ previewLogoVisible: false })
  // 上传logo照片的预览函数
  handleLogoPreview = (file) => {
    this.setState({
      previewLogoImage: file.url || file.thumbUrl,
      previewLogoVisible: true,
    });
  }
  // 上传logo照片的函数
  handleLogoChange = (info) => {
    this.setState({ 
      logoData:""
    }) 
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} Logo上传成功.`); 
       
    } else if (status === 'error') {
      message.error(`${info.file.name} Logo上传失败.`);
    } else if (status === 'removed') {
      this.setState({ 
        logoData:""
      }) 
      message.success(`${info.file.name} Logo removed.`);
    }
    if(info.file.response !== undefined && info.file.response.message ==="success"){
      this.setState({ 
        logoData:info.file.response.data 
      }) 
    } 
    this.setState({ 
      imglogoList:info.fileList 
    }) 
  }
  render() {

    const { deleteModeVisible, settingModeVisible, displayChange, displayLogoChange, addNewApp ,listDatas,
      previewVisible, previewImage, imgList,
      previewLogoVisible,previewLogoImage,imglogoList,imgData,logoData
     } = this.state
    const content = (
      <Menu className="popmenu">
        <Menu.Item onClick={ (appId) => this.handelDeleteModeVisible(appId) } data-id={this.props.appId}>
          <span className="delate-name">删除</span>
        </Menu.Item>
        <Menu.Item onClick={ () => this.handleSetting() }>
          <span className="setting" >设置</span>
        </Menu.Item>
      </Menu>
    );
    return (
      <div className="application">
          <div className="container">
            <div className="application-container">
              {/* 我是application */}
              <Row gutter={40}>
                {
                  listDatas.length=== 0 ?
                "":
                  listDatas.map((item, index) => {
                    return (
                      <Col className="list-data" span={8} key={item.appId}>
                        <div className="mydiv">
                          <img 
                            onClick={()=>this.appListToDetail(item.appId)} 
                            className="mylogo" 
                            src={ item.appCoverUrl !==null ? item.appCoverUrl:require('../../images/liqin.jpg')} 
                            alt="logo" 
                          />
                          <div className="myname">
                            <span>{item.appName}</span>
                            <Dropdown className="popdiv" placement="bottomRight" overlay={content} trigger={['click']}>
                              <i>┊</i>
                            </Dropdown> 
                          </div>
                        </div>
                      </Col>
                    )
                  })
                }
                <Col className="list-data" span={8} key="unique">
                  <div className="mydiv">
                    <div className="mydiv-addnew">
                      <img onClick={this.addApp} className="addapp" src={require('../../images/addapp.jpg')} alt="addapp" />
                    </div>
                    <div className="my-addapp">
                      新建应用
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          {/* 删除弹窗 DeleteModel*/}
          <DeleteModel 
            deleteModeVisible={deleteModeVisible} 
            handelCancel={this.handelCancel} 
            handelOk={this.handelOk}
          />
          {/* 设置弹窗SettingModel */}
          <SettingModel 
            settingModeVisible={settingModeVisible} 
            displayChange={displayChange} 
            displayLogoChange={displayLogoChange} 
            handelSetCancel={this.handelSetCancel}         
            handelSetOk={this.handelSetOk}         
            changeCover={this.changeCover}
            changeLogoCover={this.changeLogoCover}
            changeDisplay={this.changeDisplay}
            changeDisplayNone={this.changeDisplayNone}
            changeLogoDisplay={this.changeLogoDisplay}
            changeLogoDisplayNone={this.changeLogoDisplayNone}
          />   
          {/* 新建弹窗AddNewModel */}
          <AddNewModel
            addNewApp={addNewApp} 
            handelAddSetOk={this.handelAddSetOk}                
            handelAddSetCancel={this.handelAddSetCancel}                
            //上传cover和logo的state和函数
            //cover
            previewVisible={previewVisible} 
            previewImage={previewImage} 
            imgList={imgList} 
            imgData={imgData}           
            handleCancel={this.handleCancel}  
            handlePreview={this.handlePreview}  
            handleChange={this.handleChange}
            //logo
            previewLogoVisible={previewLogoVisible} 
            previewLogoImage={previewLogoImage} 
            imglogoList={imglogoList} 
            logoData={logoData} 
            handleLogoCancel={this.handleLogoCancel}  
            handleLogoPreview={this.handleLogoPreview}  
            handleLogoChange={this.handleLogoChange}   
          />

      </div>
    )
  }
}
export default Application