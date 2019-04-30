/*
 * @Author: 伟龙-Willon qq:1061258787 
 * @Date: 2019-03-18 17:07:55 
 * @Last Modified by: 伟龙
 * @Last Modified time: 2019-04-23 15:44:41
 */
import React from 'react'
import '../../css/area.css'
import ECTable from '../ectable/index.jsx'
import API from '../api.js'
import {antd_table_required} from '../../tool/map.js'
import dateFormat from 'dateformat'
const {area,upload,dir} = API;

const columns = [{
    title: '区域id',
    dataIndex: '_id',
    key: '_id'
  }, {
    title: '区域名',
    dataIndex: 'area_name',
    key: 'area_name',
  },{
    title:'缩略图',
    dataIndex:'area_pic',
    key:'area_pic',
    type:'pic'
  },
  // {
  //   title: '传感器列表',
  //   dataIndex: 'sensor_list',
  //   key: 'sensor_list',
  // },
  {
    title: '备注',
    dataIndex: 'area_desc',
    key: 'area_desc',
  },{
    title: '创建时间',
    key: 'area_created_date',
    dataIndex: 'area_created_date',
    render:(text,record)=>(
      <span>{dateFormat(record.area_created_date,'yyyy-mm-dd')}</span>
    )
  },{
    title: '操作',
    key: 'action',
    actions:['A1','A2','A3','A4','A5']
  }]

  const addForm = [
    {
      label:'区域名称',
      attr:'area_name',
      type:'input',
      rules:antd_table_required,
    },
    {
      attr:'area_pic',
      type:'uploader',
      api:upload.path,
      scene_id:'area',
      label:'区域缩略图',
    },
    {
      attr:'area_desc',
      type:'textarea',
      label:'描述',
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
    attr:'area_name',
    label:'区域名称',
    icon:'book'
  }
]

const EasyTable = ECTable('areaConfig')
/**
 * @description
 * @author willon
 * @date 2019-04-18
 * @export
 * @class Area
 * @extends {React.PureComponent}
 * 写成这样是想让，内部组件能有个router
 */
export default class Area extends React.PureComponent{
  constructor(){
    super(...arguments)
  }
  render(){
    return (
      <EasyTable
        props={this.props}
        DrawerName={'区域配置'}
        cols={columns}
        tableName='area'
        api={area}
        searchForm={search}
        addForm={addForm}
      />
    )
  }
}