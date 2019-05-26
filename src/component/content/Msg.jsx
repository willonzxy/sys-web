import React from 'react'
import ECTable from '../ectable/index.jsx'
import API from '../api.js'
import {antd_table_required} from '../../tool/map.js'
const {dir,msg} = API;
const columns = [{
    title: '字典id',
    dataIndex: 'd_id',
    key: 'd_id'
  }, 
  {
    title: '字典名称',
    dataIndex: 'dir_name',
    key: 'dir_name',
  },
  {
    title:'父级id',
    dataIndex:'p_id',
    key:'p_id'
  },
  {
    title:'父级名称',
    dataIndex:'p_name',
    key:'p_name',
  },
  {
    title: '描述',
    dataIndex: 'dir_desc',
    key: 'dir_desc',
  },
  {
    title: '操作',
    key: 'action',
    actions:['A2','A4']
  }
];
const addForm = [
//   {
//     attr:'p_id',
//     label:'父级名称',
//     type:'api-select',
//     api:`${dir}?p_id=DIR`,
//     dataIndex:'d_id',
//     show:'dir_name',
//     //rules:antd_table_required
//   },
//   {
//     attr:'d_id',
//     label:'字典id',
//     type:'input',
//     rules:antd_table_required
//   },
//   {
//     attr:'dir_name',
//     label:'含义',
//     type:'input',
//     rules:antd_table_required
//   },
//   {
//     attr:'dir_desc',
//     label:'描述',
//     type:'textarea',
//   },
//   {
//     type:'action',
//     actions:['submit','reset'],
//     label:'操作'
//   }
]

const search = [
 
]
/** 使用方法
 * const EasyTable = ECTable('tablename')
 * <EasyTable cols={cols} api={/usr} addForm={addForm} search={search}/>
 */
const EasyTable = ECTable('msg')
export default () => {
  return (
    <EasyTable
      DrawerName={'消息项'}
      cols={columns} 
      api={msg}
      searchForm={search}
      addForm={addForm}
    />
  )
}