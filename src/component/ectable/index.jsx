import React from 'react'
import { Table,Input,Icon,Button,Drawer,Form,InputNumber,message,Popconfirm, Switch, Select} from 'antd';
import Uploader from '../uploader/index.jsx'
import LazySelect from './LazySelect.jsx'
import LazyTreeSelect from './LazyTreeSelect.jsx'
import _fetch from '../../tool/fetch.js'
import filter from '../../tool/filter.js'
import qs from 'querystring'
import dateFormat from 'dateformat'
import './index.css'
const {TextArea} = Input;
const {Option} = Switch;

const lay = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
}
class ECCOM extends React.Component{
    constructor(){
        super(...arguments);
        let { cols,api,searchForm,addForm,DrawerName,tableName } = this.props;
        let actions = [];
        cols = filter.tableFilter(tableName,cols);
        cols.forEach(item => {
            if(item.key === 'action'){
                actions = item.actions
                console.log(actions)
                item.render = (text,record)=>{
                    return (<div className="btn-group-gap">
                        {
                            actions.map(item=>{
                                switch(item){
                                    case 'A2':return (
                                            <Popconfirm key={item} title="Are you sure delete this info?" onConfirm={this.del.bind(this,record._id)} okText="Yes" cancelText="No">
                                                <Button type="danger">删除</Button>
                                            </Popconfirm>
                                    );
                                    case 'A3':return (
                                        <Button  key={item} type="dashed" onClick={this.onReadyUpdate.bind(this,record)}>修改</Button>
                                    );
                                    case 'A5':return (
                                        <Button type="default" className="gap-l" onClick={this.gotoDetail.bind(this,record)}>详情</Button>
                                    );
                                    default:return ''
                                }
                            })
                        }
                    </div>)
                }
            }
            if(item.type === 'pic'){
                item.render = (text,record)=>{
                    return (
                        <div><img src={record[item.key]} alt={item.title} width={item.width||'50px'} height={item.height || '50px'} /></div>
                    )
                }
            }
            if(item.key === 'changeStatus'){
                item.render = (text,record)=>{
                    let {_id} = record;
                    return (
                        <Switch key={_id} onChange={this.onChangeStatus.bind(this,_id,record[item.attr],item.attr)} checked={!!(+record[item.attr])}/>
                    );
                }
            }
        });
        this.state = {
            searchFormData:{}, 
            visible:false,
            dataSource:[],
            regExpSearch:false,
            readyUpdateData:{},
            isAdd:true,
            total:0,
            current:0,
            actions,
            DrawerName,
            searchForm, // 搜索配置
            addForm, // 新增配置
            cols, // table 表格配置
            api, // 最终的curd api
        }
    }
    componentDidMount(){
        // 获取列表数据
        this.getTableData()
        // 获取所要的配置数据，贴别是select模块
    }
    onChangeStatus = (_id,status,attr) =>{
        let { api } = this.state;
        _fetch.patch(`${api}/${_id}`,{[attr]:status == 0 ? 1 : 0 })
        .then(res=>{
            if(res.status === 1){
                message.success('更改状态成功')
                return this.getTableData()
            }
            message.warn('更改状态成功')
        })
    }
    gotoDetail = data =>{
        console.log(this.props.props.history)
        this.props.props.history.push({
          pathname:`/domain/area/vdata/${data._id}`, // 显示区域id的详情页
          state:data
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
        e.preventDefault();
        this.props.form.validateFields((err, data) => {
            if (!err) {
                this.state.addForm.forEach(item=>{
                    if(item.type==='uploader'){
                        if(isAdd && !data[item.attr] || !data[item.attr].file || !data[item.attr].file.response || !data[item.attr].file.response.path){
                            return message.warn('注意⚠️ 无文件上传')
                        }else{
                            data[item.attr] = data[item.attr].file.response.path
                        }
                        
                    }
                })
                let {api,isAdd,readyUpdateData} = this.state,p1 = null;
                if(!isAdd){
                    api = `${api}/${readyUpdateData._id}`;
                    p1 = _fetch.put(api,{...readyUpdateData,...data})
                }else{
                    p1 = _fetch.post(api,data)
                }
                p1.then(res=>{
                    if(res.status === 1){
                        message.success('操作成功')
                        return this.getTableData({pageNum:this.state.current})
                    }
                    message.warn('操作失败')
                })
            }
        });
    }
    search = ()=>{
        console.log(this.props)
        this.getTableData()
    }
    getTableData = (search = {}) => {
        let { api,searchFormData,regExpSearch} = this.state;
        let query = {...searchFormData,...search};
        regExpSearch && (query.regExp=Object.keys(searchFormData))
        for(let key in query){
            !query[key] && (delete query[key])
        }
        Object.keys(query).length > 0 && (api = `${api}?${qs.stringify(query)}`)
        _fetch.get(api)
        .then(res => {
            if(res.status === 1){
                let {list,numTotal,currentPage,pageSize} = res.data;
                return this.setState({
                    dataSource:list,
                    total:numTotal,
                    current:currentPage,
                    pageSize
                })
            }
            message.warn('获取数据失败')
        })
    }
    onRestForm = () =>{
        this.props.form.resetFields()
    }
    onReadyUpdate = (data) =>{
       
        this.setState({
            readyUpdateData:data,
            isAdd:false,
            visible:true,
        },()=>{
            this.onRestForm()
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
    changeState = (attr,value) =>{
        this.setState({
            [attr]:value
        })
    }
    /**
     * 给api-select
     */
    onFormDataChange = (attr,value)=>{
        let {form} = this.props;
        form.setFieldsValue({
            [attr]:value
        })
    }
    onPageChange = (current)=>{
        this.setState({
            current,
        },this.getTableData({
            pageNum:current
        }))
    }
    changeDrawerState = () => {
        this.setState(prev=>({visible:!prev.visible,isAdd:prev.isAdd || true }))
    }

    onRegExpSearchChange = () => {
        this.setState(prev=>({regExpSearch:!prev.regExpSearch}))
    }

    render(){
    const { cols,searchForm,searchFormData,DrawerName,addForm,readyUpdateData,isAdd,total,current,pageSize,actions} = this.state;
    const { getFieldDecorator } = this.props.form;
        return (
            <div className="warehouse">
            {
                actions.includes('A4') && (
                    <div className="search-tools">
                    {
                        searchForm.map(({type,...config})=>{
                            switch(type){
                                case 'input': var { label='insert here',icon='',style,attr } = config; return (
                                    <Input
                                        placeholder={label}
                                        prefix={<Icon type={icon} style={style} />}
                                        value={searchFormData[attr]}
                                        onChange={this.onChange.bind(this,attr)}
                                        key={attr}
                                        // ref={node => this.userNameInput = node}
                                    />
                                );
                                case 'regExpSearch':var { label='insert here',icon='',style,attr } = config; return (
                                    <div key={attr} className="gap">
                                        <span>{label}:</span>
                                        <Switch onChange={this.onRegExpSearchChange} checked={!!this.state[attr]}/>
                                    </div>
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
                    <Button type="default" icon="search" className="gap-l" onClick={this.search}>Search</Button>
                    {addForm && addForm.length && actions.includes('A1') && <Button type="default" icon="plus" className="gap-l" onClick={this.changeDrawerState}>新增</Button>}
                </div>
                )
            }
                
                {actions.includes('A4') && <Table columns={cols} dataSource={this.state.dataSource} pagination={{onChange:this.onPageChange,pageSize,total,current}}/>}
                {
                    ( (addForm && addForm.length) || (readyUpdateData && readyUpdateData.length))&& <Drawer
                    title={isAdd ? `新增${DrawerName}` :`修改${DrawerName}`}
                    placement="right"
                    closable={false}
                    onClose={this.changeDrawerState}
                    visible={this.state.visible}
                    width='400px'
                >
                    <Form onSubmit={this.handleSubmit} className="addForm" layout="horizontal">
                    {
                        addForm.map(item=>{
                            var {attr='',initialValue="",rules,type,label,dataIndex} = item;
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
                                            initialValue:!isAdd ? readyUpdateData[attr] : initialValue,
                                            rules
                                        })(
                                            (()=>{
                                                switch(type){
                                                    case 'input': var { icon='tag',style } = item; return (
                                                        <Input
                                                            placeholder={placeholder||label} 
                                                            prefix={<Icon type={icon} style={style} />}
                                                        />
                                                    );
                                                    case 'uploader':var {api,placeholder="click here upload",scene_id} = item; return (
                                                        <Uploader name={attr} action={`${api}?scene_id=${scene_id}&attr=${attr}`} listType="picture" >
                                                            <Button>
                                                                <Icon type="upload" /> {placeholder}
                                                            </Button>
                                                        </Uploader>
                                                    );
                                                    case 'textarea': return (
                                                        <TextArea {...item}/>
                                                    );
                                                    case 'number' : return (
                                                        <InputNumber {...item} />
                                                    );
                                                    case 'api-select':return (
                                                        <LazySelect {...item} onSelectChange={this.onFormDataChange} />
                                                    );
                                                    case 'tree-select':return(
                                                        <LazyTreeSelect {...item} onSelectChange={this.onFormDataChange}/>
                                                    );
                                                    default:return <div>no this component</div>
                                                }
                                            })()
                                        )}
                                    </Form.Item>
                                )
                            }
                            
                        })
                    }
                    </Form>
                </Drawer>
                }
                
            </div>
        )
    }
}
const ECTable = (tablename)=>{
    return Form.create({name:tablename})(ECCOM)
}

export default ECTable