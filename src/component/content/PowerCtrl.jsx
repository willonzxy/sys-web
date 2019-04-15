import React from 'react'
import ECTable from '../ectable/index.jsx'
import {antd_table_required} from '../../tool/map.js'
import API from '../api.js'
const { getCollections ,getActions} = API;
// power:{
//   power_name:{type:String,required:true},
//   action:{type:String,required:true}
// }
const columns = [
  // {
  //   title: '_id',
  //   dataIndex: '_id',
  //   key: '_id'
  // },
  {
    title: '权限名称',
    dataIndex: 'power_name',
    key: 'power_name'
  }, 
  {
    title: '操作集合',
    dataIndex: 'collection_name',
    key: 'collection_name',
  },
  {
    title: '权限动作',
    dataIndex: 'action',
    key: 'powerAction',
  },
  {
    title: '操作',
    key: 'action',
    actions:['delete','update']
  }
];
const addForm = [
  {
    attr:'power_name',
    label:'权限名称',
    type:'input',
    rules:antd_table_required
  },
  {
    attr:'collection_id',
    attr1:'collection_name',
    label:'操作集合',
    type:'api-select',
    dataIndex:'d_id',
    show:'name', // option 显示的字段
    api:getCollections,
    rules:antd_table_required
  },
  {
    attr:'action_id',
    attr1:'action',
    label:'动作权限',
    type:'api-select',
    dataIndex:'d_id',
    show:'name', // option 显示的字段
    api:getActions,
    rules:antd_table_required
  },
  {
    attr:'power_desc',
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
    label:'d_id',
    icon:'book'
  },
  {
    type:'input',
    attr:'power_name',
    label:'权限名称',
    icon:'tag'
  },
]
/** 使用方法
 * const EasyTable = ECTable('tablename')
 * <EasyTable cols={cols} api={/usr} addForm={addForm} search={search}/>
 */

const EasyTable = ECTable('powerConfig')
export default () => {
  return (
    <EasyTable 
      DrawerName={'新增权限'}
      cols={columns}
      api="/power"
      searchForm={search}
      addForm={addForm}
    />
  )
}