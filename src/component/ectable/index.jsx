import React from 'react'
import { Table,Input,Icon,Button,Drawer,Form,InputNumber,message,Popconfirm, Switch} from 'antd';
import Uploader from '../uploader/index.jsx'
import _fetch from '../../tool/fetch.js'
import qs from 'querystring'
import dateFormat from 'dateformat'
const {TextArea} = Input;

function makeComponent(type,config){
    switch(type){
        case 'input': var { placeholder='insert here',icon='tag',style } = config; return ()=>(
            <Input
                placeholder={placeholder} 
                prefix={<Icon type={icon} style={style} />}
            />
        );
        case 'uploader':var {attr,uploadApi,placeholder="click here upload",scene_id} = config; return ()=>(
            <Uploader name={attr} action={`${uploadApi}?scene_id=${scene_id}`} listType="picture">
                <Button>
                    <Icon type="upload" /> {placeholder}
                </Button>
            </Uploader>
        );
        case 'textarea': var {rows} = config;return ()=>(
            <TextArea rows={rows} />
        );
        case 'number' :  var {min=0 ,max} = config; return ()=>(
            <InputNumber min={min} max={max}  />
        );
        case 'submit' : var {htmlType='submit',label='提交'} = config; return ()=>(
            <Button type="primary" htmlType={htmlType}>{label}</Button>
        );
        default:return ()=><div>no this component</div>
    }
}
const lay = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
}
class DOM extends React.Component{
    constructor(){
        super(...arguments);
        let { cols,api,searchForm,addForm,DrawerName } = this.props;
        this.state = {
            searchFormData:{}, 
            visible:false,
            dataSource:[],
            DrawerName,
            searchForm, // 搜索配置
            addForm, // 新增配置
            cols, // table 表格配置
            api, // 最终的curd api
        }
    }
    componentDidMount(){
        this.getTableData()
    }
    del = (id) => {
        let { api } = this.state;
        _fetch.del(`${api}/${id}`).then(res=>{
            if(res.status === 1){
                return this.getTableData()
            }
        })
    }
    handleSubmit = (e) => {
        console.log('asdadasdasd')
        e.preventDefault();
        this.props.form.validateFields((err, data) => {
            console.log(data)
            if (!err) {
                console.log('Received values of form: ', data);
                let {api} = this.state;
                _fetch.post(api,data)
                .then(res=>{
                    if(res.status === 1){
                        message.success('添加成功')
                        return this.getTableData()
                    }
                    message.warn('添加失败')
                })
            }
        });
    }
    // search = ()=>{
    //     this.getTableData()
    // }
    getTableData = () => {
        let { api,searchForm,searchFormData} = this.state;
        Object.keys(searchForm).length > 0 && (api = `${api}?${qs.stringify(searchFormData)}`)
        _fetch.get(api)
        .then(res => {
            if(res.status === 1){
                return this.setState({
                    dataSource:res.data.list
                })
            }
            message.warn('获取数据失败')
        })
    }
    
    onChange = (attr,e) =>{
        this.setState({
            searchFormData:{
                [attr]:e.target.value
            }
        })
    }
    changeDrawerState = () => {
        this.setState(prev=>({visible:!prev.visible}))
    }
    render(){
    const { cols,searchForm,searchFormData,DrawerName,addForm} = this.state;
    const { getFieldDecorator } = this.props.form;
        return (
            <div className="warehouse">
                <div className="search-tools">
                    {
                        searchForm.map(({type,...config})=>{
                            switch(type){
                                case 'input': let { label='insert here',icon='',style,attr } = config; return (
                                    <Input
                                        placeholder={label}
                                        prefix={<Icon type={icon} style={style} />}
                                        value={searchFormData[attr]}
                                        onChange={this.onChange.bind(this,attr)}
                                        key={attr}
                                        // ref={node => this.userNameInput = node}
                                    />
                                );
                                default:return (<div>no this component</div>)
                            }
                        })
                    }
                    {/* <Input
                        placeholder="输入传感器型号"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        value={this.state.type}
                        onChange={this.onTypeChange}
                        // ref={node => this.userNameInput = node}
                    /> */}
                    <Button type="default" icon="search" className="gap-l" onClick={this.getTableData}>Search</Button>
                    <Button type="default" icon="plus" className="gap-l" onClick={this.changeDrawerState}>新增</Button>
                </div>
                <Table columns={cols} dataSource={this.state.dataSource}/>
                <Drawer
                    title={DrawerName}
                    placement="right"
                    closable={false}
                    onClose={this.changeDrawerState}
                    visible={this.state.visible}
                    width='400px'
                >
                    <Form onSubmit={this.handleSubmit} className="login-form" layout="horizontal">
                    {
                        addForm.map(item=>{
                            var {attr='',initialValue="",rules,type,label} = item;
                            var Sub = makeComponent(type,item);
                            if(type === "submit"){
                                return (
                                    <Form.Item 
                                        label={label}
                                        {...lay}
                                    >
                                        <Sub />
                                    </Form.Item>
                                )
                            }else{
                                return (
                                    <Form.Item 
                                        label={label}
                                        {...lay}
                                        key={attr}
                                    >
                                        {getFieldDecorator(attr,{
                                            initialValue,
                                            rules
                                        })(
                                            <Sub />
                                        )}
                                    </Form.Item>
                                )
                            }
                            
                        })
                    }
                    </Form>
                </Drawer>
            </div>
        )
    }
}
const ECTable = (tablename)=>{
    return Form.create({name:tablename})(DOM)
}

export default ECTable