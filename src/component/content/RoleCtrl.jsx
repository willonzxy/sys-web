import React from 'react'
import ECTable from '../ectable/index.jsx'
import API from '../api';
const {power,table_data_set} = API;
/*role:{
        role_name:{type:String,required:true},
        role_level:{type:Number,required:true},
        power_list:{type:Array,required:true}, // [{ colletion_name:'',actions:[{ power_id:_id,action:'' }] }]
        table_data_list:{type:Array,required:true},
        desc:{type:String,required:true}
    }
*/

const columns = [
  {
    title: '角色名称',
    dataIndex: 'role_name',
    key: 'role_name',
  },
  {
    title: '角色等级',
    dataIndex: 'role_level',
    key: 'role_level',
  },
  {
    title: '描述',
    dataIndex: 'role_desc',
    key: 'role_desc',
  },
  {
    title: '操作',
    key: 'action',
    actions:['A2','A3','A1','A4']
  }
];

const addForm = [
  {
    attr:'role_name',
    label:'角色名称',
    type:'input',
    rules:[{
      required:true,
      message:'please insert'
    }]
  },
  {
    type:'tree-select', // 选取多个权限
    api:`${power}?pageSize=10000`,
    label:'选取权限',
    attr:'power_list',
    dataIndex:'_id',
    groupBy:'collection_name',
    show:'action',
    
  },
  {
    type:'tree-select', // 高级权限选择
    api:table_data_set,
    label:'高级权限',
    attr:'table_data_list',
    handleData:false,
   
  },
  {
    attr:'role_level',
    label:'角色等级',
    type:'number',
    rules:[{
      required:true,
      message:'please insert'
    }]
  },
  {
    attr:'role_desc',
    label:'描述',
    type:'textarea',
  },
  {
    type:'action',
    actions:['submit','reset'],
    label:'操作'
  }
]

const select = [
  {
    type:'input',
    attr:'power_name',
    label:'角色名称',
    icon:'book'
  }
]
/** 使用方法
 * const EasyTable = ECTable('tablename')
 * <EasyTable cols={cols} api={/usr} addForm={addForm} search={search}/>
 */
const tableName = 'role';
const EasyTable = ECTable(tableName)
export default () => {
  return (
    <EasyTable
      DrawerName={'角色'}
      cols={columns} 
      tableName={tableName}
      api="/role"
      searchForm={select}
      addForm={addForm}
    />
  )
}