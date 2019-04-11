import React from 'react'
import { Table,Input,Icon,Button,Drawer,Form,InputNumber,message,Popconfirm} from 'antd';
import '../../css/warehouse.css'
import Uploader from '../uploader/index.jsx'
import API from '../api.js'
import _fetch from '../../tool/fetch.js'
import dateFormat from 'dateformat'
const {upload,warehouse} = API
const {TextArea} = Input;

const lay = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
}

class Warehouse extends React.PureComponent{
    constructor(){
        super(...arguments);
        this.state = {
            type:'',
            visible:false,
            dataSource:[],
            columns:[{
              title: '类型',
              dataIndex: 'name',
              key: 'name'
            }, {
              title: '库存',
              dataIndex: 'inventory',
              key: 'inventory',
            }, {
              title: '已用',
              dataIndex: 'used',
              key: 'used',
            }, {
              title: '日期',
              key: 'date',
              dataIndex: 'date',
              render:(text,record)=>(
                <span>{dateFormat(record.date,'yyyy-mm-dd')}</span>
              )
            },{
              title: '操作',
              key: 'action',
              render: (text, record) => (
                <Popconfirm title="Are you sure delete this info?" onConfirm={this.del.bind(this,record._id)} okText="Yes" cancelText="No">
                  <Button type="danger">删除</Button>
                </Popconfirm>
              ),
            }]
        }
    }
    componentDidMount(){
      this.getWarehouseData()
    }
    del = (id) => {
      console.log(id)
      _fetch.del(`${warehouse.get.path}/${id}`).then(res=>{
        if(res.status === 1){
          return this.getWarehouseData()
        }
      })
    }
    search = ()=>{
      this.getWarehouseData(this.state.type)
    }
    getWarehouseData = (val) => {
      let {path,method} = warehouse.get;
      val && (path = `${path}?=type${val}`);
      _fetch[method](path)
      .then(res=>{
        if(res.status === 1){
          return this.setState({
            dataSource:res.data.list
          })
        }
        message.warn('获取数据失败')
      })
    }
    handleSubmit = (e) => {
      e.preventDefault();
      
      this.props.form.validateFields((err, {remember,...data}) => {
          if (!err) {
              console.log('Received values of form: ', data);
              let { path } = warehouse.add;
              _fetch.post(path,data)
              .then(res=>{
                if(res.status === 1){
                  message.success('添加成功')
                  return this.getWarehouseData()
                }
                message.warn('添加失败')
              })
          }
      });
    }
    onTypeChange = e =>{
        this.setState({
          type:e.target.value
        })
    }
    changeDrawerState = () => {
      this.setState(prev=>({visible:!prev.visible}))
    }
    render(){
      const { getFieldDecorator } = this.props.form;
        return (
            <div className="warehouse">
                <div className="search-tools">
                    <Input
                        placeholder="输入传感器型号"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        value={this.state.type}
                        onChange={this.onTypeChange}
                        // ref={node => this.userNameInput = node}
                    />
                    <Button type="default" icon="search" className="gap-l" onClick={this.search}>Search</Button>
                    <Button type="default" icon="plus" className="gap-l" onClick={this.changeDrawerState}>新增</Button>
                    <Drawer
                        title="新增物料"
                        placement="right"
                        closable={false}
                        onClose={this.changeDrawerState}
                        visible={this.state.visible}
                        width='400px'
                        >
                        <Form onSubmit={this.handleSubmit} className="login-form" layout="horizontal">
                          <Form.Item
                            label="类型"
                            {...lay}
                          >
                              {getFieldDecorator('name', {
                                  initialValue:"lucy",
                                  rules: [{ required: true, message: 'Please select name!' }],
                              })(
                                <Input placeholder="类型" />
                              )}
                          </Form.Item>
                          <Form.Item
                            label="入库量"
                            {...lay}
                          >
                              {getFieldDecorator('inventory', {
                                  initialValue:20,
                                  rules: [{ required: true, message: 'Please input your inventory!' }],
                              })(
                                <InputNumber min={1} max={1000}  />
                              )}
                          </Form.Item>
                          <Form.Item
                            label={(<span>
                              图片
                              </span>)}
                            {...lay}
                          >
                            {getFieldDecorator('pic')(
                              <Uploader name="pic" action={`${upload.path}?scene_id=wareshouse`} listType="picture">
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
                <Table columns={this.state.columns} dataSource={this.state.dataSource}/>
            </div>
        )
    }
}
const WrappedWarehouse = Form.create({ name: 'new_warehouse' })(Warehouse);

export default WrappedWarehouse