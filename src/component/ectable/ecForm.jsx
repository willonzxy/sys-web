import React from 'react'
import { Table,Input,Icon,Button,Drawer,Form,InputNumber,message,Popconfirm, Switch} from 'antd';
import Uploader from '../uploader/index.jsx'
import _fetch from '../../tool/fetch.js'
import qs from 'querystring'
import dateFormat from 'dateformat'
const {TextArea} = Input;

/** 使用方法
 * const EasyTable = ECTable('tablename')
 * <EasyTable cols={cols} api={/usr} addForm={addForm} search={search}/>
 */
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

class ECForm extends React.PureComponent{
    constructor(){
        super(...arguments)
        let { api,addForm } = this.props;
        this.state = {
            addForm, // 新增配置
            api, // 最终的curd api
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.props)
        let { getTableData } = this.props;
        this.props.form.validateFields((err, data) => {
            if (!err) {
                console.log('Received values of form: ', data);
                let {api} = this.state;
                _fetch.post(api,data)
                .then(res=>{
                    if(res.status === 1){
                        message.success('添加成功')
                        return getTableData()
                    }
                    message.warn('添加失败')
                })
            }
        });
    }
    render(){
        console.log(this.props)
        const { getFieldDecorator } = this.props.form;
        const { addForm} = this.state;
        return (
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
        )
    }
}
export default Form.create({ name: 'initial' })(ECForm);