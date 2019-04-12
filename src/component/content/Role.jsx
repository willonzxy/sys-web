import React from 'react'
import ECTable from '../ectable/index.jsx'
const columns = [{
    title: '字典id',
    dataIndex: 'd_id',
    key: 'd_id'
  }, 
  {
    title: '字典名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '描述',
    dataIndex: 'desc',
    key: 'desc',
  },
  {
    title: '操作',
    key: 'action',
    actions:['d','u']
  }
];
const addForm = [
  {
    attr:'d_id',
    label:'字典id',
    type:'input',
    rules:[{
      required:true,
      message:'please insert'
    }]
  },
  {
    attr:'name',
    label:'含义',
    type:'input',
    rules:[{
      required:true,
      message:'please insert '
    }]
  },
  {
    attr:'desc',
    label:'描述',
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
    attr:'d_id',
    label:'字典id',
    icon:'book'
  },
  {
    type:'input',
    attr:'name',
    label:'字典名称',
    icon:'tag'
  },
]
/** 使用方法
 * const EasyTable = ECTable('tablename')
 * <EasyTable cols={cols} api={/usr} addForm={addForm} search={search}/>
 */

export default () => {
  const EasyTable = ECTable('warnconfig')
  return (
    <EasyTable 
      DrawerName={'新增字典项'}
      cols={columns} 
      api="/dir" 
      searchForm={search}
      addForm={addForm}
    />
  )
}