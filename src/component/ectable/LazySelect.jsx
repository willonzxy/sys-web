import React from 'react';
import {Select,message} from 'antd'
import _fetch from '../../tool/fetch.js'
const {Option} = Select

export default class LazySelect extends React.PureComponent {
    constructor(){
        super(...arguments)
        let {attr} = this.props;
        this.state = {
            [attr+'_list']:[],
        }
    }
    componentDidMount(){
        this.getData()
    }
    getData = (followAttr,followValue)=>{
        let { attr,api,label} = this.props;
        if(followAttr){
            api = `${api}?${followAttr}=${followValue}`
        }
        _fetch.get(api)
        .then((res={})=>{
            if(res.status === 1){
                return this.setState({
                    [attr+'_list']:res.data.list,
                })
            }
            message.warn(`获取${label}数据失败`)
        })
    }
    componentWillReceiveProps(props){
        let { followAttr,followValue } = props;
        console.log(followAttr,followValue)
    }
    onChange = (val)=>{
        let {onSelectChange,attr} = this.props;
        // onSelectChange(attr,{
        //     [attr]:val, //d_id
        //     [attr1]:this.state[attr+'_list'].filter(i=>i[dataIndex]===val)[0][show], // name
        // })
        this.setState({
            value:val
        })
        onSelectChange && onSelectChange(attr,val)
    }
    render(){
        let {attr,show,dataIndex,mode,defaultValue,...rest} = this.props
        return (
            <Select 
                onChange={this.onChange}
                mode={mode}
                defaultValue={defaultValue || this.state[attr+'_list'][0]}
                {...rest}
            >
                {
                    this.state[attr+'_list'] && this.state[attr+'_list'].map((data,index)=>{
                        return (
                            <Option key={index} value={data[dataIndex]}>{data[show]}</Option>
                        )
                    })
                }
            </Select>
        )
    }
    
}