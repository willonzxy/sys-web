import React from 'react'
import ECTable from '../ectable/index.jsx'
import API from '../api.js'
const {company,upload,role} = API
/**  
 *  company:{
        company_name:{type:String,default:'未填写',required:true},
        leader:{type:String,default:'未填写',required:true},
        licence:{type:String,required:true},
        password:{type:String,required:true},
        site:{type:String,required:true}, // 公司的位置
        tel:{type:String,required:true}, // 公司负责人电话
        companyinfo_created_date:{type:Number,required:true}, // 创建监控申请的时间
        deadline:{type:Number}, // 平台使用截止日期
        company_status:{type:Number,default:0}, // active ，平台使用已过有效期timeout
        power_list:{type:Array,default:[]}, // [power_id}]
        table_data_list:{type:Array,default:[]},// [{colletion_id
    },
 */
const columns = [{
    title: '公司名称',
    dataIndex: 'company_name',
    key: 'company_name'
  },
  {
    title: '公司管理员',
    dataIndex: 'company_leader',
    key: 'company_leader',
  },
  {
    title: '公司管理员邮箱',
    dataIndex: 'company_email',
    key: 'company_email',
  },
  {
    title: '公司管理员手机',
    dataIndex: 'company_tel',
    key: 'company_tel',
  },
  {
    title: '营业执照',
    dataIndex: 'licence',
    key: 'licence',
    type:'pic'
  },
  {
    title:'公司地址',
    dataIndex:'site',
    key:'site'
  },
  {
    title:'审核状态',
    key:'changeStatus',
    attr:'company_status'
  },
  {
    title: '操作',
    key: 'action',
    actions:['A2','A3','A1','A4']
  }
];

const required = [{
  required:true,
  message:'please insert this item'
}] 

const addForm = [
  {
    attr:'company_name',
    label:'公司名称',
    type:'input',
    rules:required
  },
  // {
  //   attr:'site',
  //   label:'地址',
  //   type:'input',
  //   rules:required
  // },
  {
    attr:'site',
    type:'map',
    label:'地址',
  },
  {
    attr:'company_leader',
    label:'公司管理员',
    type:'input',
    rules:required
  },
  {
    attr:'company_tel',
    label:'联系方式',
    type:'input',
    rules:required
  },
  {
    attr:'company_email',
    label:'联系邮箱',
    type:'input',
    rules:required
  },
  {
    attr:'licence',
    label:'头像',
    type:'uploader',
    api:upload.path,
    scene_id:'licence',
  },
  {
    attr:'company_role_list',
    label:'角色名称列表',
    type:'api-select',
    api:role,
    dataIndex:'_id',
    show:'role_name',
    mode:"multiple"
    //rules:required
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
    label:'公司管理员联系电话',
    icon:'phone'
  },
  {
    type:'input',
    attr:'company_name',
    label:'公司名',
    icon:'aliwangwang'
  },
]
/** 使用方法
 * const EasyTable = ECTable('tablename')
 * <EasyTable cols={cols} api={/usr} addForm={addForm} search={search}/>
 */
const EasyTable = ECTable('company')
export default () => {
  return (
    <EasyTable
      DrawerName={'公司'}
      width={'600px'}
      cols={columns}
      api={company}
      searchForm={search}
      addForm={addForm}
    />
  )
}