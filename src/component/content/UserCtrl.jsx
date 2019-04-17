import React from 'react'
import ECTable from '../ectable/index.jsx'
import API from '../api.js'
const {role,upload} = API
/**  
 * 
 * company_id:{type:String,required:true},
        tel:{type:String,required:true},
        name:{type:String,required:true},
        password:{type:String,required:true},
        avatar:{type:String},
        desc:{type:String},
        status:{type:String,required:true}, // 公司审核状态,是否确认
        role_id:{type:String,required:true,default:''}, // 角色id
        role_name:{type:String,required:true}, //角色名称
 */
const columns = [{
    title: '联系电话',
    dataIndex: 'tel',
    key: 'tel'
  },
  {
    title: '姓名',
    dataIndex: 'user_name',
    key: 'user_name',
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    key: 'avatar',
    type:'pic'
  },
  {
    title:'角色',
    dataIndex:'user_role_name',
    key:'user_role_name'
  },
  {
    title:'在职状态',
    key:'changeStatus',
    attr:'user_status'
  },
  {
    title: '操作',
    key: 'action',
    actions:['delete','update']
  }
];

const required = [{
  required:true,
  message:'please insert this item'
}] 

const addForm = [
  {
    attr:'user_company_id',
    label:'公司',
    type:'input',
    rules:required
  },
  {
    attr:'tel',
    label:'电话',
    type:'input',
    rules:required
  },
  {
    attr:'user_name',
    label:'姓名',
    type:'input',
    rules:required
  },
  {
    attr:'avatar',
    label:'头像',
    type:'uploader',
    api:upload.path,
    scene_id:'user',
  },
  {
    attr:'role_id',
    label:'角色名称',
    type:'api-select',
    api:role,
    dataIndex:'_id',
    show:'role_name',
    rules:required
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
    attr:'tel',
    label:'联系电话',
    icon:'phone'
  },
  {
    type:'input',
    attr:'name',
    label:'姓名',
    icon:'user'
  },
]
/** 使用方法
 * const EasyTable = ECTable('tablename')
 * <EasyTable cols={cols} api={/usr} addForm={addForm} search={search}/>
 */
const EasyTable = ECTable('useronfig')
export default () => {
  return (
    <EasyTable
      DrawerName={'新增人员'}
      cols={columns}
      api="/user"
      searchForm={search}
      addForm={addForm}
    />
  )
}