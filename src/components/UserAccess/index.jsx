import React, { Component } from 'react'
import {  withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { Table, Tabs, Button,Checkbox} from 'antd';
import EditableCell from '../UserAccessTable'
import UserAccessFrequency from '../UserAccessFrequency'
import './index.scss'

const TabPane = Tabs.TabPane;
// function onChange(e) {
//   console.log(`radio checked:${e.target.value}`);
// }

function callback(key) {
  console.log(key);
}
// 功能模块数据
const functionData = [{
    key: '1',
    functionname: '高级搜索',
    id: 'X2866611',
    frequency: '不限',
    endtime:"永久"
  }, {
    key: '2',
    functionname: '编辑图表',
    id: 'X2877712',
    frequency: '不限',
    endtime:"永久"
  }, {
    key: '3',
    functionname: '应用管理',
    id: 'X2877713',
    frequency: '不限',
    endtime:"永久"
  }, {
    key: '4',
    functionname: '用户管理',
    id: 'X2877714',
    frequency: '不限 ',
    endtime:"永久"
  }, {
    key: '5',
    functionname: '角色管理',
    id: 'X2888815',
    frequency: '不限',
    endtime:"永久"
  }];
//   // 模块权限格式
// const moduleColumns = [
//     { title: '功能名称',
//       dataIndex: 'modulename',
//       className: 'module-color',
//     }, {
//       title: 'id',
//       className: 'module-color',
//       dataIndex: 'id',
//     }, {
//       title: '频次（次数/频率）',
//       dataIndex: 'frequency',
//       className: 'module-colorgrey',
//     },{
//       title: '截止时间',
//       dataIndex: 'endtime',
//       className: 'module-colorgrey',
//     }
// ];
// 模块权限数据
const moduleData = [
  { 
    key: '1',
    modulename: '综合',
    id: 'X2866611',
    frequency: '不限 / 日 ',
    endtime:"永久",
    
  },
  { 
    key: '2',
    modulename: '资讯',
    id: 'X2866712',
    frequency: '不限 / 日 ',
    endtime:"永久",
  },
  { 
    key: '3', 
    modulename: '数据',
    id: 'X2866813',
    frequency: '不限 / 日 ',
    endtime:"永久",
    children: [{
        key: 31,
        modulename: '数据图',
        id:'X2877731',
        frequency: '不限 / 日 ',
        endtime:"永久"
      }, {
        key: 32,
        modulename: '数据表',
        id:'X2877732',
        frequency: '不限 / 日 ',
        endtime:"永久",
      }, {
        key: 33,
        modulename: '数据搜索',
        id:'X2877733',
        frequency: '不限 / 日 ',
        endtime:"永久",
      }
    ]
  },
  { 
    key: '4',
    modulename: '公告',
    id: 'X2877714',
    frequency: '不限 / 日 ',
    endtime:"永久",
    children:[{
        key: 41,
        modulename: '研报',
        id:'X2877741',
        frequency: '不限 / 日 ',
        endtime:"永久"
      }
    ]
  },
]


@withRouter
@inject('defaultStore')
@observer


class UserAccess extends Component {
  constructor(props) {
    super(props)
    function onChange(e,id){
      console.log(`checked = ${e.target.checked}   id = ${id}`);
    }
    this.functionColumns = [{
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
        render: (text, record) => (
          <EditableCell
            value={text}
          />
        ),
      },{
        title: '截止时间',
        dataIndex: 'endtime',
        className: 'function-colorgrey',
        render: (text, record) => (
          <UserAccessFrequency
            value={text}
          />
        ),  
      },{
        title: '使用',
        dataIndex: 'use',
        className: 'function-colorgrey',
        render: (text, record) => (
            <Checkbox onChange={(e)=>onChange(e,record.id)}></Checkbox>
        ),
      }
    ];
    // 模块权限格式
    this.moduleColumns = [
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
        render: (text, record) => (
          <EditableCell
            value={text}
          />
        ),
      },{
        title: '截止时间',
        dataIndex: 'endtime',
        className: 'module-colorgrey',
        render: (text, record) => (
          <UserAccessFrequency
            value={text}
          />
        )
      },{
        title: '查看',
        dataIndex: 'look',
        className: 'module-colorgrey',
        render: (text, record) => (
            <Checkbox onChange={(e)=>onChange(e,record.id)}></Checkbox>
        ),
      }
    ];
    this.state = {
    }
  }

  render() {
    const functionColumns = this.functionColumns;
    const moduleColumns = this.moduleColumns;
    return (           
      <div className="user-access">
        <div className="user-access-container">
            <p className="choosed-user">已选用户: <span>王硕</span></p> 
            <Tabs className="choosed-tabs" defaultActiveKey="2" onChange={callback}>
              <TabPane tab="EVERSIGHT.AI（试用客户）" key="1">
                EVERSIGHT.AI（试用客户）
              </TabPane>
              <TabPane className="user-official" tab="ANALYST.AI（正式客户）" key="2">
                <div className="function-access">
                  <p>功能权限</p>
                  <div>
                    <Table 
                      dataSource={functionData} 
                      columns={functionColumns} 
                      pagination={false}
                    />
                  </div>
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
                <div className="official-button">
                  <Button type="primary">取消</Button>                  
                  <Button type="primary">保存</Button>  
                </div>           
              </TabPane>
            </Tabs>
        </div>
      </div>
    )
  }
}
export default UserAccess