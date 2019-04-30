import React from 'react'
import ECTable from '../ectable/index.jsx'
import API from '../api.js'
import {antd_table_required} from '../../tool/map.js'
const {dev,area} = API;
const columns = [{
    title: '设备所在区域',
    dataIndex: 'dev_area_name',
    key: 'dev_area_name'
  }, 
  {
    title: '设备编号',
    dataIndex: 'dev_id',
    key: 'dev_id',
  },
  {
    title: '设备名',
    dataIndex: 'dev_name',
    key: 'dev_name',
  },
  {
    title:'设备描述',
    dataIndex:'dev_desc',
    key:'dev_desc'
  },
  {
    title: '操作',
    key: 'action',
    actions:['A2','A3','A1','A4']
  }
];
const addForm = [
  {
    attr:'dev_area_id',
    label:'区域',
    type:'api-select',
    api:area,
    dataIndex:'_id',
    show:'area_name',
    rules:antd_table_required
  },
  {
    attr:'dev_id',
    label:'设备编号',
    type:'input',
    rules:antd_table_required
  },
  {
    attr:'dev_name',
    label:'设备名',
    type:'input',
    rules:antd_table_required
  },
  {
    attr:'dir_desc',
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
    attr:'dev_area_name',
    label:'设备所在区域',
    icon:'tag'
  },
  {
    type:'input',
    attr:'dev_id',
    label:'设备id',
    icon:'book'
  },
  {
    type:'input',
    attr:'dev_name',
    label:'设备名',
    icon:'tag'
  },
  {
    attr:'regExpSearch',
    type:'regExpSearch',
    label:'正则查找'
  }
]
/** 使用方法
 * const EasyTable = ECTable('tablename')
 * <EasyTable cols={cols} api={/usr} addForm={addForm} search={search}/>
 */
const tableName = 'dev';
const EasyTable = ECTable(tableName)
export default () => {
  return (
    <EasyTable 
      DrawerName={'设备'}
      tableName={tableName}
      cols={columns} 
      api={dev}
      searchForm={search}
      addForm={addForm}
    />
  )
}