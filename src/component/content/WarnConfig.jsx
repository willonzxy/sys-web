import React from 'react'
import ECTable from '../ectable/index.jsx'
import dateFormat from 'dateformat';
const columns = [{
    title: '字典id',
    dataIndex: 'd_id',
    key: 'd_id'
  }, 
  {
    title: '指标名称',
    dataIndex: 'name',
    key: 'name',
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
    dataIndex:'status',
    key:'status'
  },
  {
    title: '时间',
    key: 'date',
    dataIndex: 'date',
    render:(text,record)=>{
      return (<span>{dateFormat(+record.date,'yyyy-mm-dd')}</span>)
    }
  },
  {
    title:'状态',
    key:'changeStatus'
  },
  {
    title: '操作',
    key: 'action',
    actions:['d','u']
  }
];
const addForm = [
  {
    attr:'name',
    label:'指标名称',
    type:'input',
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