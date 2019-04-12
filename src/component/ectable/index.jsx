import React from 'react'
import { Table,Input,Icon,Button,Drawer,Form,InputNumber,message,Popconfirm, Switch} from 'antd';
import Uploader from '../uploader/index.jsx'
import _fetch from '../../tool/fetch.js'
import qs from 'querystring'
import dateFormat from 'dateformat'
import './index.css'
const {TextArea} = Input;

const lay = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
}
class DOM extends React.Component{
    constructor(){
        super(...arguments);
        let { cols,api,searchForm,addForm,DrawerName } = this.props;
        cols.forEach(item => {
            if(item.key === 'action'){
                let {actions} = item;
                item.render = (text,record)=>{
                    return (<div className="btn-group-gap">
                        {
                            actions.map(item=>{
                                switch(item){
                                    case 'd':return (
                                            <Popconfirm key={item} title="Are you sure delete this info?" onConfirm={this.del.bind(this,record._id)} okText="Yes" cancelText="No">
                                                <Button type="danger">删除</Button>
                                            </Popconfirm>
                                    );
                                    case 'u':return (
                                        <Button  key={item} type="dash" >修改</Button>
                                    );
                                    default:return (<div>don't have this component</div>)
                                }
                                
                            })
                        }
                    </div>)
                }
            }
            if(item.key === 'changeStatus'){
                item.render = (text,record)=>{
                    let {_id,status} = record;
                    return (
                        <Switch key={item} onChange={this.onChangeStatus.bind(this,_id,status)} checked={!!(+record.status)}/>
                    );
                }
            }
        });
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
    onChangeStatus = (_id,status) =>{
        let { api } = this.state;
        _fetch.patch(`${api}/${_id}`,{status:status == '0' ? '1' : '0' })
        .then(res=>{
            if(res.status === 1){
                message.success('更改状态成功')
                return this.getTableData()
            }
            message.warn('更改状态成功')
        })
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
        let query = {...searchFormData};
        for(let key in query){
            !query[key] && (delete query[key])
        }
        Object.keys(query).length > 0 && (api = `${api}?${qs.stringify(query)}`)
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
                ...this.state.searchFormData,
                [attr]:e.target.value,
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
                    <Form onSubmit={this.handleSubmit} className="addForm" layout="horizontal">
                    {
                        addForm.map(item=>{
                            var {attr='',initialValue="",rules,type,label} = item;
                            if(type === "action"){
                                return (
                                    <Form.Item 
                                        label={label}
                                        {...lay}
                                        key={attr}
                                    >{
                                        item.actions.map(ele=>{
                                            switch(ele){
                                                case 'submit':return <Button type="primary" htmlType="submit">提交</Button>;
                                                case 'reset':return <Button type="default" htmlType="reset">重置</Button>;
                                                default:return (<div>no this component</div>)
                                            }
                                        })
                                    }
                                        
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
                                            (function(){switch(type){
                                                case 'input': var { placeholder='insert here',icon='tag',style } = item; return (
                                                    <Input
                                                        placeholder={placeholder} 
                                                        prefix={<Icon type={icon} style={style} />}
                                                    />
                                                );
                                                case 'uploader':var {attr,uploadApi,placeholder="click here upload",scene_id} = item; return (
                                                    <Uploader name={attr} action={`${uploadApi}?scene_id=${scene_id}`} listType="picture">
                                                        <Button>
                                                            <Icon type="upload" /> {placeholder}
                                                        </Button>
                                                    </Uploader>
                                                );
                                                case 'textarea': var {rows} = item;return (
                                                    <TextArea rows={rows} />
                                                );
                                                case 'number' :  var {min=0 ,max} = item; return (
                                                    <InputNumber min={min} max={max}  />
                                                );
                                                default:return <div>no this component</div>
                                            }})()
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