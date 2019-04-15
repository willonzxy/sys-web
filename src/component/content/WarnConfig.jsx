import React from 'react'
import ECTable from '../ectable/index.jsx'
import dateFormat from 'dateformat';
import API from '../api.js'
const {getWarnTags} = API;
const columns = [{
    title: '字典id',
    dataIndex: "warnconfig_d_id",
    key: 'warnconfig_d_id'
  }, 
  {
    title: '指标名称',
    dataIndex: 'warnconfig_name',
    key: 'warnconfig_name',
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
    dataIndex:'warnconfig_status',
    key:'warnconfig_status'
  },
  {
    title: '时间',
    key: 'warnconfig_created_date',
    dataIndex: 'warnconfig_created_date',
    render:(text,record)=>{
      return (<span>{dateFormat(+record.warnconfig_created_date,'yyyy-mm-dd')}</span>)
    }
  },
  {
    title:'状态',
    key:'changeStatus',
    attr:'warnconfig_status'
  },
  {
    title: '操作',
    key: 'action',
    actions:['delete','update']
  }
];
const addForm = [
  {
    attr:'warnconfig_d_id',
    label:'指标名称',
    type:'api-select',
    dataIndex:'d_id',
    show:'dir_name',
    api:getWarnTags,
    rules:[{
      required:true,
      message:'please insert'
    }]
  },
  {
    attr:'threshold',
    label:'阈值',
    type:'number',
    rules:[{
      required:true,
      message:'please insert '
    }]
  },
  {
    attr:'msg',
    label:'预警信息',
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

export default () => {
  const EasyTable = ECTable('warnconfig')
  return (
    <EasyTable 
      DrawerName={'新增指标监控'}
      cols={columns} 
      api="/warnconfig" 
      searchForm={search}
      addForm={addForm}
    />
  )
}