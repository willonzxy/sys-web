import React from 'react'
import ECTable from '../ectable/index.jsx'
import dateFormat from 'dateformat';
import {antd_table_required} from '../../tool/map.js'
import API from '../api.js'
const {getWarnTags,warn,area,dev,user} = API;
const columns = [{
    title: '字典id',
    dataIndex: "warn_d_id",
    key: 'warn_d_id'
  }, 
  {
    title: '指标名称',
    dataIndex: 'warn_name',
    key: 'warn_name',
  }, 
  {
    title:'接收者',
    dataIndex:'receive',
    key:'receive'
  },
  {
    title: '阈值',
    dataIndex: 'threshold',
    key: 'threshold',
  },
  {
    title:'预警通知',
    dataIndex:'msg',
    key:'msg',
  },
  {
    title:'状态',
    dataIndex:'warn_status',
    key:'warn_status'
  },
  {
    title: '时间',
    key: 'warn_created_date',
    dataIndex: 'warn_created_date',
    render:(text,record)=>{
      return (<span>{dateFormat(+record.warn_created_date,'yyyy-mm-dd')}</span>)
    }
  },
  {
    title:'状态',
    key:'changeStatus',
    attr:'warn_status'
  },
  {
    title: '操作',
    key: 'action',
    actions:['A2','A3','A1','A4']
  }
];
const addForm = [
  {
    attr:'warn_area_id',
    label:'区域名称',
    type:'api-select',
    dataIndex:'_id',
    show:'area_name',
    api:area,
    rules:antd_table_required
  },
  {
    attr:'warn_dev_id',
    label:'设备名称',
    type:'api-select',
    dataIndex:'dev_id',
    show:'dev_name',
    api:dev,
    rules:antd_table_required
  },
  {
    attr:'warn_d_id',
    label:'指标名称',
    type:'api-select',
    dataIndex:'d_id',
    show:'dir_name',
    api:getWarnTags,
    rules:antd_table_required
  },
  {
    attr:'min_val',
    label:'阈值下限',
    type:'number',
    rules:antd_table_required
  },
  {
    attr:'max_val',
    label:'阈值上限',
    type:'number',
    rules:antd_table_required
  },
  {
    attr:'receive',
    label:'接收者',
    type:'api-select',
    dataIndex:'_id',
    show:'user_name',
    api:user,
    mode:"multiple",
    rules:antd_table_required
  },
  {
    attr:'msg',
    label:'备注信息',
    type:'textarea',
  },
  {
    type:'action',
    actions:['submit','reset'],
    label:'操作'
  }
]
const search = [
  {
    type:'input',
    attr:'name',
    label:'指标名称',
    icon:'tag'
  }
]
/** 使用方法
 * const EasyTable = ECTable('tablename')
 * <EasyTable cols={cols} api={/usr} addForm={addForm} search={search}/>
 */
const tableName = 'warn';
const EasyTable = ECTable(tableName)
export default () => {
  return (
    <EasyTable 
      DrawerName={'指标监控'}
      cols={columns} 
      tableName={tableName}
      api={warn}
      searchForm={search}
      addForm={addForm}
    />
  )
}