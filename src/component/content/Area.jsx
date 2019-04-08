/*
 * @Author: 伟龙-Willon qq:1061258787 
 * @Date: 2019-03-18 17:07:55 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-04-08 22:30:02
 */
import React from 'react'
import Card from '../card/index.jsx'
import '../../css/area.css'
import { Table,Input,Icon,Button,Drawer,Form,InputNumber,message,Select,Spin,Popconfirm} from 'antd';
import API from '../api.js'
import Uploader from '../uploader/index.jsx'
import _fetch from '../../tool/fetch.js'
import dateFormat from 'dateformat'
const {upload,area} = API
const {TextArea} = Input;
const {Option} = Select;
const lay = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
  }
class Area extends React.PureComponent {
    constructor(){
        super(...arguments)
    }
    state = {
      area_name:'',
      visible:false,
      fetching:false,
      dataList:[],
      data:[],
      value:'',
      columns:[{
        title: '区域id',
        dataIndex: '_id',
        key: '_id'
      }, {
        title: '区域名',
        dataIndex: 'area_name',
        key: 'area_name',
      },{
        title:'缩略图',
        dataIndex:'pic',
        key:'pic',
        render:(text,record)=>(
          <div>
            <img src={record.pic} width="65px" height="65px" alt=''/>
          </div>
        )
      },{
        title: '传感器列表',
        dataIndex: 'sensor_list',
        key: 'sensor_list',
      },
      {
        title: '备注',
        dataIndex: 'desc',
        key: 'desc',
      },{
        title: '创建时间',
        key: 'date',
        dataIndex: 'date',
        render:(text,record)=>(
          <span>{dateFormat(record.date,'yyyy-mm-dd')}</span>
        )
      },{
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <div>
            <Popconfirm title="Are you sure delete this info?" onConfirm={this.del.bind(this,record._id)} okText="Yes" cancelText="No">
              <Button type="danger">删除</Button>
            </Popconfirm>
            <Button type="default" className="gap-l" onClick={this.gotoDetail.bind(this,record)}>详情</Button>
            <Button type="dashed" className="gap-l" onClick={this.gotoDetail.bind(this,record)}>修改</Button>
          </div>
        ),
      }]
    }
    componentDidMount(){
      this.getAreaData();
    }
    changeDrawerState = () => {
      this.setState(prev=>({visible:!prev.visible}))
    }
    onTypeChange = (val) =>{
      this.setState({
        area_name:val.target.value
      })
    }
    onSearch = (value)=>{
      console.log('fetching user', value);
      this.lastFetchId += 1;
      const fetchId = this.lastFetchId;
      this.setState({ data: [], fetching: true });
      _fetch.get('/warehouse/selectbyname')
        .then((body) => {
          if (fetchId !== this.lastFetchId) { // for fetch callback order
            return;
          }
          const data = body.results.map(user => ({
            text: `${user.name.first} ${user.name.last}`,
            value: user.login.username,
          }));
          this.setState({ data, fetching: false });
      });
    }
    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err,data) => {
          if (!err) {
              let { path,method } = area.add;
              if(!data.pic.file.response || !data.pic.file.response.path){
                return message.error('文件上传失败')
              }
              data.pic = data.pic.file.response.path
              _fetch[method](path,data)
              .then(res=>{
                if(res.status === 1){
                  message.success('添加成功')
                  return this.getAreaData()
                }
                message.warn('添加失败')
              })
          }
      });
    }
    search = () => {
      this.getAreaData(this.state.area_name)
    }
    gotoDetail = data =>{
      this.props.history.push({
        pathname:`/domain/area/vdata/${data._id}`,
        state:data
      })
    }
    del = _id =>{
      let { path } = area.del;
      _fetch.del(`${path}/${_id}`).then(res=>{
        if(res.status === 1){
          return this.getAreaData()
        }
      })
    }
    getAreaData = val  =>{
      let { path,method } = area.get;
      val && (path = `${path}?area_name=${val}`) 
      _fetch[method](path)
      .then(res=>{
        if(res.status === 1){
          return this.setState({
            dataList:res.data.list
          })
        }
      })
    }
    handleChange = (value) => {
      this.setState({
        value,
        data: [],
        fetching: false,
      });
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const { fetching, data, value } = this.state;

        return (
        <div className="area">
            <div className="search-tools">
                <Input
                    placeholder="输入传感器型号"
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    value={this.state.area_name}
                    onChange={this.onTypeChange}
                    // ref={node => this.userNameInput = node}
                />
                <Button type="default" icon="search" className="gap-l" onClick={this.search}>Search</Button>
                <Button type="default" icon="plus" className="gap-l" onClick={this.changeDrawerState}>新增</Button>
                <Drawer
                    title="新增区域"
                    placement="right"
                    closable={false}
                    onClose={this.changeDrawerState}
                    visible={this.state.visible}
                    width='400px'
                    ><Form onSubmit={this.handleSubmit} className="login-form" layout="horizontal">
                      <Form.Item
                        label="类型"
                        {...lay}
                      >
                          {getFieldDecorator('area_name', {
                              initialValue:"匿名区域",
                              rules: [{ required: true, message: 'Please input area!' }],
                          })(
                            <Input placeholder="区域名称" />
                          )}
                      </Form.Item>
                      <Form.Item
                        label="传感器装载"
                        {...lay}
                      >
                          {getFieldDecorator('sensor_list', {
                              rules: [{ required: true, message: 'Please input and select your sensor_list!' }],
                          })(
                            
                            <Input placeholder="传感器列表" />
                          )}
                      </Form.Item>
                      <Form.Item
                        label={(<span>
                          图片
                          </span>)}
                        {...lay}
                      >
                        {getFieldDecorator('pic')(
                          <Uploader name="pic" action={`${upload.path}?scene_id=area&attr=pic`} listType="picture">
                            <Button>
                              <Icon type="upload" /> Click to upload
                            </Button>
                          </Uploader>
                        )}
                      </Form.Item>
                      <Form.Item
                        label="描述"
                        {...lay}
                      >
                          {getFieldDecorator('desc')(
                            <TextArea rows={4} />
                          )}
                      </Form.Item>
                      <Form.Item 
                        label='提交'
                        {...lay}
                      >
                        <Button type="primary" htmlType="submit">确认</Button>
                      </Form.Item>
                  </Form>
                </Drawer>
            </div>
            <Table className="gap-t" columns={this.state.columns} dataSource={this.state.dataList}/>
        </div>)
    }
}
const WrappedArea = Form.create({ name: 'new_area' })(Area);

export default WrappedArea