import React from "react";
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";
import DataSet from "@antv/data-set";
import dateFormat from 'dateformat';
import API from '../api.js'
import _fetch from '../../tool/fetch.js'
import DateFormat from 'dateformat';
import PropTypes from 'prop-types'; 
import { message } from "antd";
const { msg,warn } = API;
let timer = '';
// function randomT(){
//     return Math.random() * 42;
// }
// function mockData(){
//     let data = [];
//     let now = Date.now();
//     function date(val){
//         return now - 1000 * 60 * val
//     }
//     for(let len = 10;len--;){
//         data.push({
//             time: dateFormat(date(len),'HH:MM:ss'),
//             Tokyo:~~randomT(),
//             London:~~randomT()
//         })
//     }
//     return data
// }

export default class Curved extends React.Component {
    static propTypes={
        attr:PropTypes.string.isRequired,
        msg_dir_id:PropTypes.string.isRequired,
        msg_dev_id:PropTypes.string.isRequired,
    }
    state = {
        data:[],
        pageNum:1,
        //firstFetch:true,
    }
    componentDidMount(){
        this.initWatchData();
        this.getLimit()
    }
    getLimit = async () => {
        let {msg_dev_id,msg_dir_id} = this.props;
        try {
            let warnConfig = await _fetch.get(`${warn}?warn_dev_id=${msg_dev_id}&warn_d_id=${msg_dir_id}`);
            if(warnConfig.data.list.length === 0){
                return message.warn('该指标没设置预警值')
            }
            let {min_val,max_val,warn_status} = warnConfig.data.list[0];
            if(warn_status != 1){
                return message.warn('该指标预警状态未激活')
            }
            console.log(min_val,max_val)
            if(!min_val || !max_val){
                return message.warn('该指标没有配置预警信息')
            }
            this.setState({
                max_val,
                min_val
            })
        } catch (error) {
           // message.warn(error)
        }
        
    }
    initWatchData = ()=>{
        let timer = setTimeout(()=>{
            clearTimeout(timer)
            this.fetchData()
            this.initWatchData()
        },1000 * 3)
    }
    fetchData = ()=>{
        let {attr,msg_dir_id,msg_dev_id} = this.props;
        let {pageNum} = this.state;
        let api = `${msg}?pageNum=${pageNum}&msg_dir_id=${msg_dir_id}&pageSize=1&msg_dev_id=${msg_dev_id}`
        _fetch.get(api)
        .then(res => {
            if(res.status === 1){
                let data = res.data.list.map(i=>{
                    return {
                        [attr]:i.msg_value,
                        date:DateFormat(Date.now(),'MM:ss')
                    }
                })
                this.setState((prev=>{
                    prev.data.length && prev.data.shift();
                    prev.data.push(...data)
                    if(prev.data.length - 1 >= 0){
                        let old = prev.data;
                        if(prev.data.length >=20){
                            old = prev.data.slice(0,prev.data.length-1)
                        }
                        return {
                            data:old.concat(data),
                            pageNum:++pageNum,
                        }
                    }else{
                        return {
                            data:data,
                            pageNum:++pageNum,
                        }
                    }
                    
                }))
            }
        })

    }
    render() {
        let {attr} = this.props;
        let {data,max_val,min_val} = this.state;
        const cols = {
            [attr]: {
                min: 0
            },
            date: {
                range: [0, 1]
            }
        };
        return (
        <div style={{textAlign:"center",marginTop:'10px'}}>
            <Chart height={300} data={data} scale={cols} forceFit padding={[30, 20, 20, 80]}>
                <Axis name="year" />
                <Axis name="value" />
                <Tooltip
                    crosshairs={{
                        type: "y"
                    }}
                />
                <Geom type="line" position={`date*${attr}`} size={2} 
                    // active={[true, {
                    // highlight: false, // true 是否开启 highlight 效果，开启时没有激活的变灰
                    //     style: {
                    //     fill: '#0def4e'
                    // } // 选中后 shape 的样式
                    // }]}
                    tooltip={[`date*${attr}`, (date, val)=>{
                        if(max_val && ~~val > max_val){
                            return {
                                name:attr,
                                value:`${val}大于预设值${max_val}`
                            }
                        }
                        if(max_val && ~~val < min_val){
                            return {
                                name:attr,
                                value:`${val}小于预设值${min_val}`
                            }
                        }
                        return {
                            name:attr,
                            value:`${val}`
                        }
                    }]}
                />
                <Geom
                    type="point"
                    position={`date*${attr}`}
                    size={5}
                    shape={"smooth"}
                    color={[attr, (cut)=>{
                        //some code
                        if(max_val && ~~cut > max_val){
                            return 'red';
                        }
                        if(max_val && ~~cut < min_val){
                            return '#c9cc36';
                        }
                        return '#0def4e';
                    }]}
                    style={{
                        stroke: "#fff",
                        lineWidth: 2
                    }}
                />
            </Chart>
        </div>
        );
    }
}

