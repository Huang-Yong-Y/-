import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import './index.scss'
import { Table, Modal, Form, Menu, Dropdown, Tabs  } from 'antd';

const TabPane = Tabs.TabPane;

function callback(key) {
  console.log(key);
}
// 禁用modal
const DisableModel = Form.create()(props => {
  // 从父节点处获取到props属性包括state的状态和函数
  const { disableModelVisible, handelDisableCancel, handelDisableOk } =props
  return (
    <Modal 
      visible={disableModelVisible}
      title="禁用"
      onOk={handelDisableOk}
      onCancel={handelDisableCancel}
      okText="确认"
      cancelText="取消"
      className="operateModel"
    >
      <span>确定要禁用该用户吗？</span> 
    </Modal>
  )
})

// 启用modal
const StartModel = Form.create()(props => {
  // 从父节点处获取到props属性包括state的状态和函数
  const { startModelVisible, handelStartCancel, handelStartOk } =props
  return (
    <Modal 
      visible={startModelVisible}
      title="启用"
      onOk={handelStartOk}
      onCancel={handelStartCancel}
      okText="确认"
      cancelText="取消"
      className="operateModel"
    >
      <span>确定要启用该用户吗？</span> 
    </Modal>
  )
})
// 功能模块格式
const functionColumns = [{
    title: '功能名称',
    dataIndex: 'functionname',
    className: 'function-color',
  }, {
    title: 'id',
    className: 'function-color',
    dataIndex: 'id',
  }, {
    title: '频次（次数/频率）',
    dataIndex: 'frequency',
    className: 'function-colorgrey',
  },{
    title: '截止时间',
    dataIndex: 'endtime',
    className: 'function-colorgrey',
  }
];
// 功能模块数据
const functionData = [{
    key: '1',
    functionname: '高级搜索',
    id: 'X2877712',
    frequency: '不限 / 日 ',
    endtime:"永久"
  }, {
    key: '2',
    functionname: '编辑图表',
    id: 'X2877712',
    frequency: '不限 / 日 ',
    endtime:"永久"
  }, {
    key: '3',
    functionname: '应用管理',
    id: 'X2877712',
    frequency: '不限 / 日 ',
    endtime:"永久"
  }, {
    key: '4',
    functionname: '用户管理',
    id: 'X2877712',
    frequency: '不限 / 日 ',
    endtime:"永久"
  }, {
    key: '5',
    functionname: '角色管理',
    id: 'X2877712',
    frequency: '不限 / 日 ',
    endtime:"永久"
}];
// 模块权限格式
const moduleColumns = [
  { title: '功能名称',
    dataIndex: 'modulename',
    className: 'module-color',
  }, {
    title: 'id',
    className: 'module-color',
    dataIndex: 'id',
  }, {
    title: '频次（次数/频率）',
    dataIndex: 'frequency',
    className: 'module-colorgrey',
  },{
    title: '截止时间',
    dataIndex: 'endtime',
    className: 'module-colorgrey',
  }
];
// 模块权限数据
const moduleData = [
  { 
    key: '1',
    modulename: '综合',
    id: 'X2877712',
    frequency: '不限 / 日 ',
    endtime:"永久",
    
  },
  { 
    key: '2',
    modulename: '资讯',
    id: 'X2877712',
    frequency: '不限 / 日 ',
    endtime:"永久",
  },
  { 
    key: '3', 
    modulename: '数据',
    id: 'X2877712',
    frequency: '不限 / 日 ',
    endtime:"永久",
    children: [{
        key: 31,
        modulename: '数据图',
        id:'X2877712',
        frequency: '不限 / 日 ',
        endtime:"永久"
      }, {
        key: 32,
        modulename: '数据表',
        id:'X2877712',
        frequency: '不限 / 日 ',
        endtime:"永久",
      }, {
        key: 33,
        modulename: '数据搜索',
        id:'X2877712',
        frequency: '不限 / 日 ',
        endtime:"永久",
      }
    ]
  },
  { 
    key: '4',
    modulename: '公告',
    id: 'X2877712',
    frequency: '不限 / 日 ',
    endtime:"永久",
    children:[{
        key: 41,
        modulename: '研报',
        id:'X2877712',
        frequency: '不限 / 日 ',
        endtime:"永久"
      }
    ]
  },
]
// 预览modal
const PreviewModel = Form.create()(props => {
  // 从父节点处获取到props属性包括state的状态和函数
  const { previewModelVisible, handelPreviewCancel } =props
  return (
    <Modal 
      visible={previewModelVisible}
      header={null}
      onCancel={handelPreviewCancel}
      className="previewModel"
      footer={null}
      width='57.14rem'
    >
      <p className="choosed-user">已选用户: <span>王硕</span></p>
      <Tabs defaultActiveKey="2" onChange={callback}>
        <TabPane tab="EVERSIGHT.AI（试用客户）" key="1">
          EVERSIGHT.AI（试用客户）
        </TabPane>
        <TabPane className="user-official" tab="ANALYST.AI（正式客户）" key="2">
          <div className="function-access">
            <p>功能权限</p>
            <Table
              columns={functionColumns}
              dataSource={functionData}
              className="function-table"
              pagination={false}
            />
          </div>
          <div className="module-access">
            <p>模块权限</p>
            <Table
              className="module-table"
              columns={moduleColumns} 
              dataSource={moduleData} 
              pagination={false}
            />
          </div>
        </TabPane>
      </Tabs>
    </Modal>
  )
})
@withRouter
@inject('defaultStore')
@observer

class UserListTable extends Component {
  constructor(props) {
    super(props)
    // 用户操作的弹窗
    const content = (
      <Menu className="user-list-menu">
        <Menu.Item onClick={ () => this.handelDisableModeVisible() }>
          <span className="setting">禁用</span>
        </Menu.Item>
        <Menu.Item onClick={ () => this.handelStartModeVisible() }>
          <span className="setting">启用</span>
        </Menu.Item>
        <Menu.Item onClick={ () => this.handelPreviewModeVisible() }>
          <span className="setting">权限预览</span>
        </Menu.Item>
        <Menu.Item>
          <span className="setting">
            <Link to="/user/userlist/access">权限配置</Link>
          </span>
        </Menu.Item>
      </Menu>
    );
    // 用户列表操作的格式
    this.columns = [
      {
        title: '用户名',
        dataIndex: 'name',
        width: '15%',
      }, 
      {
        title: '用户ID',
        dataIndex: 'id',
        width: '15%',
      }, 
      {
        title: '所属应用',
        dataIndex: 'apply',
        width: '25%',
      }, 
      {
        title: '用户来源',
        dataIndex: 'from',
        width: '25%',
      },
      {
        title: '状态',
        dataIndex: 'state',
        width: '10%',
      }, 
      {
        title: '操作',
        dataIndex: 'operation',
        width: '10%',
        render: (text, record) => {
          return (
            this.state.dataSource.length > 1 ?
            (
              <Dropdown placement="bottomCenter" overlay={content} trigger={['click']}>
                <i style={{fontStyle:'normal',cursor:'pointer'}}>┊</i>
              </Dropdown> 
            ) : null
          );
        },
      }
    ];
    this.state = {
      // 用户列表数据
      dataSource: [
        {
          key: '0',
          name: '张国华0',
          id: '20180032',
          apply: 'ANALYST.AI0',
          from:"EVERSIGHT.AI",
          state:"正常",
        }, 
        {
          key: '1',
          name: '张国华1',
          id: '20180032',
          apply: 'ANALYST.AI1',
          from:"EVERSIGHT.AI",
          state:"正常",
        }, 
        {
          key: '3',
          name: '张国华2',
          id: '20180033',
          apply: 'ANALYST.AI2',
          from:"ANALYST.AI",
          state:"禁用",
        }, 
        {
          key: '4',
          name: '张国华3',
          id: '20180035',
          apply: 'ANALYST.AI3',
          from:"ANALYST.AI",
          state:"禁用",
        }, 
        {
          key: '5',
          name: '张国华4',
          id: '20180035',
          apply: 'ANALYST.AI3',
          from:"ANALYST.AI",
          state:"禁用",
        }, 
        {
          key: '6',
          name: '张国华5',
          id: '20180035',
          apply: 'ANALYST.AI3',
          from:"ANALYST.AI",
          state:"禁用",
        }, 
        {
          key: '7',
          name: '张国华6',
          id: '20180035',
          apply: 'ANALYST.AI3',
          from:"ANALYST.AI",
          state:"禁用",
        }, 
        {
          key: '8',
          name: '张国华7',
          id: '20180035',
          apply: 'ANALYST.AI3',
          from:"ANALYST.AI",
          state:"禁用",
        }, 
        {
          key: '9',
          name: '张国华8',
          id: '20180035',
          apply: 'ANALYST.AI3',
          from:"ANALYST.AI",
          state:"禁用",
        }, 
        {
          key: '10',
          name: '张国华9',
          id: '20180035',
          apply: 'ANALYST.AI3',
          from:"ANALYST.AI",
          state:"禁用",
        },
        {
          key: '11',
          name: '张国华10',
          id: '20180035',
          apply: 'ANALYST.AI3',
          from:"ANALYST.AI",
          state:"禁用",
        }, 
      ],
      disableModelVisible:false, //禁用弹窗
      startModelVisible:false,  //启用弹窗
      previewModelVisible:false, //权限预览弹窗
    }
  }

  //禁用模型调用函数
  handelDisableModeVisible=()=>{
    this.setState({
      disableModelVisible: true,
    });
  }
  // 禁用模型取消函数
  handelDisableCancel = () =>{
    this.setState({
      disableModelVisible: false,
    });    
  }
  // 禁用模型确定函数
  handelDisableOk = () =>{
    this.setState({
      disableModelVisible: false,
    });    
  }

  // 启用模型调用函数
  handelStartModeVisible=()=>{
    this.setState({
      startModelVisible: true,
    });
  }
  // 启用模型取消函数
  handelStartCancel = () =>{
    this.setState({
      startModelVisible: false,
    });    
  }
  // 启用模型确定函数
  handelStartOk = () =>{
    this.setState({
      startModelVisible: false,
    });    
  }
  // 预览模型调用函数
  handelPreviewModeVisible=()=>{
    this.setState({
      previewModelVisible: true,
    });
  }
  // 预览模型取消函数
  handelPreviewCancel = () =>{
    this.setState({
      previewModelVisible: false,
    });    
  }
  // 权限配置调用函数
  handelAccessModeVisible=()=>{
    console.log("handelAccessModeVisible")
  }
  render() {
    const { dataSource, disableModelVisible, startModelVisible, previewModelVisible } = this.state;
    const columns = this.columns;
    return (           
      <div className="user-list-table">
        <Table className="user-table-list" dataSource={dataSource} columns={columns} />
        <DisableModel
          disableModelVisible={disableModelVisible} 
          handelDisableCancel={this.handelDisableCancel} 
          handelDisableOk={this.handelDisableOk}
        />
        <StartModel
          startModelVisible={startModelVisible} 
          handelStartCancel={this.handelStartCancel} 
          handelStartOk={this.handelStartOk}
        />
        <PreviewModel
          previewModelVisible={previewModelVisible} 
          handelPreviewCancel={this.handelPreviewCancel} 
        />
      </div>
    )
  }
}
export default UserListTable