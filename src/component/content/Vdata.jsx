import React from 'react';
import Card from '../card/index.jsx';
import '../../css/vdata.css'
import LineChartWidthBrush from '../vChart/LineWidthBrush.jsx'
import Line from '../vChart/Line.jsx'
import { DatePicker ,Button,Tabs, message,Progress} from 'antd'
import DateFormat from 'dateformat'
import moment from 'moment'
import Loading from '../loading/index.jsx'
import DashBoard from '../dashboard/index.jsx'
import API from '../api.js'
import qs from 'querystring'
import _fetch from '../../tool/fetch.js'
import { Label } from 'bizcharts';
import LazySelect from '../ectable/LazySelect.jsx';
import BaiduMap from '../map/index.jsx';
const { area,sensor_data_api,dev,company,msg } =  API;
const {TabPane} = Tabs;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';
const mysqlDateFormat = 'yyyy-mm-dd hh:mm:ss';

function random(){
    return Math.random() * 255
}

function randomT(len = 24 * 7,attr){
    let data = [],
        ts = Date.now();
    for(; len-- ;){
        data.push({
            [attr]:Math.random()*36,
            date:DateFormat(ts - 1000 * 60 * 60 * len,'yyyy/mm/dd HH:MM')
        })
    }
    return data
}


export default class Vdata extends React.PureComponent {
    constructor(){
        super(...arguments)
        this.state = {
            sensor_list:[
                
            ],
            initialDate:[DateFormat(Date.now() - 1000 * 60 * 60 * 24 ,mysqlDateFormat),DateFormat(Date.now(),mysqlDateFormat)],
            dataSource:[],
            oxygenData:[],
            dev_id:'',
            pp:'',
            timeRange:{},
            lazy_select_config:{
                attr:'dev_id',
                dataIndex:'dev_id',
                show:'dev_name', // option 显示的字段
                api:`/dev?dev_area_id=${this.props.match.params.id}`
            }
        }
    }
    
    componentDidMount(){
        this.fetchData()

        // 场地定位
        _fetch.get(`${area}?_id=${this.props.match.params.id}`)
        .then(res=>_fetch.get(`${company}?_id=${res.data.list[0].area_company_id}`))
        .then(res=>{
            let {site} = res.data.list[0];
            this.setState({
                pp:site
            })
        })
    }
    fetchData = async (date,dev_id)=>{
        /** 
         * 1、请求该company_id 对应的传感器列表，ids 
         * 2、获取时间区间，加载对应区间数据
         */
        try {
            // let area_id = this.props.match.params.id;
            // let data = await _fetch.get(`${dev}?dev_area_id=${area_id}`);
            // console.log(data)
            // if(data.length < 1){
            //     return message.warn('该区域没有录入相关设备')
            // }
            // let dev_list = data.data.list.map(i=>{
            //     return i.dev_id
            // })
            let devID = dev_id || this.state.dev_id;
            if(!devID){
                return message.error('该区域没有注册设备,或未选取设备')
            }
            let sensor_list = await _fetch.get(`/dir?p_id=S&pageSize=1000`) // 获取监控指标
            let sensor_list_info = sensor_list.data.list; // 指标数组
            let attrs = JSON.stringify(['acquisition_time','processed_data']);
            if(!date){
                let {start,end} = this.state.timeRange;
                if(start){
                    //date = [DateFormat(start,mysqlDateFormat),DateFormat(end,mysqlDateFormat)]
                    date = [start,end]
                }else{
                    return message.error('请选择日期范围')
                }
            }
            let result = [],s_list = [];
            for(let len = sensor_list_info.length ;len--;){ // 设备遍历
                let temp = sensor_list_info[len];
                let d_id = temp.d_id;
                let name = temp.dir_name;
                let unit = temp.dir_desc;
                //let info = await _fetch.get(`${sensor_data_api}?pageNum=1&tableName=ift_data_record&attrs=${attrs}&as=${JSON.stringify(['date',`${name}`])}&equipment_id=${devID}&check_item_id='${d_id}'&date=${JSON.stringify(date)}`);
                // for(let info_len = info.length;info_len--;){
                //     await _fetch.post(msg,{
                //         msg_dir_id:d_id,
                //         msg_dir_name:name,
                //         msg_dev_id:devID,
                //         msg_date:+new Date(info[info_len].date),
                //         msg_value:info[info_len][name],
                //         msg_unit:unit,
                //     })
                // }
                // console.log(name + '入库完成，条数：'+ info.length);
                let info = await _fetch.get(`${msg}?pageSize=100000000&msg_dir_id=${d_id}&msg_dev_id=${devID}&msg_date=${JSON.stringify(date)}`);
                info = info.data.list;
                if(info.length > 0){
                    //let newInfo = info;
                    let newInfo = info.map(item=>{
                        //item.date = +new Date(item.msg_date);
                        return {
                            [name]:item.msg_value,
                            date:item.msg_date,
                        }
                    })
                    console.log(newInfo)
                    // console.log(newInfo.map(v=>v[name]).reduce((prev,next)=>+prev + +next))
                    s_list.push({ // 指标平均值展示
                        name,
                        attr:name,
                        unit,
                        value:(newInfo.map(v=>v[name]).reduce((prev,next)=>{
                            return (+prev) + (+next)
                        }) / newInfo.length).toFixed(2)
                    })
                    result.push({
                        name,
                        attr:name,
                        unit,
                        data:newInfo,
                        msg_dir_id:d_id,
                        msg_dev_id:devID,
                    })
                }else{
                    message.warn(`该时间区间没有${name}数据哟`)
                }
                
            }
            this.setState({
                dataSource:result,
                sensor_list:s_list,
            })
        } catch (error) {
            message.warn('没有该时间端的数据喔😯，换个时间试试呗')
        }
       
    }
    onDevChange = (attr,val)=>{
        console.log(val)
        this.setState({
            dev_id:val
        },()=>{
            this.fetchData()
        })
    }
    onDateChange = (date,dateString)=>{
        let start = +new Date(date[0]._d),
            end = +new Date(date[1]._d);
        console.log(DateFormat(start,mysqlDateFormat),DateFormat(end,mysqlDateFormat))
        // let d1 = DateFormat(start,mysqlDateFormat),d2 = DateFormat(end,mysqlDateFormat)
        this.setState({
            timeRange:{
                start,end
            }
        },()=>{
            let dev_id = this.state.dev_id;
            //this.fetchData([DateFormat(start,mysqlDateFormat),DateFormat(end,mysqlDateFormat)],dev_id)
            this.fetchData([start,end],dev_id)
        })
    }

    download = () => {
        _fetch.post('/file',this.state.dataSource)
        .then(res=>{
            if(res.status === 1){
                let nd_a = window.document.createElement('a');
                console.log(res.url)
                nd_a.href = res.url;
                nd_a.download = res.attr+'.json';
                nd_a.target = '_blank';
                document.body.appendChild(nd_a)
                nd_a.click()
            }else{
                message.warn('下载失败')
            }
        })
        

    }
    // search = ()=>{
    //     let timeRange = this.state;
    //     console.log(timeRange)
    //     this.fetchData([DateFormat(timeRange.start,mysqlDateFormat),DateFormat(timeRange.end,mysqlDateFormat)])
    // }
    
    render(){
        const { _id,area_pic,area_name } = this.props.location.state;
        const {dataSource,pp} = this.state;
        return (
            <div className="vdata">
                <div className="sensor-list-box space-between" >
                    <div style={{alignSelf:'flex-start',flex:2,height:"362px"}} className="border">
                        <div className="dateTool">
                            <span>时间范围：</span>
                            <RangePicker
                                defaultValue={[moment(DateFormat(Date.now(),'yyyy/mm/dd'), dateFormat), moment(DateFormat(Date.now(),'yyyy/mm/dd'), dateFormat)]}
                                format={dateFormat}
                                onChange = {this.onDateChange}
                            />
                            {/* <Button type="default" icon="search" style={{marginLeft:'10px'}} onClick={this.search}>Search</Button> */}
                            <span style={{marginLeft:'10px'}}>设备列表：</span>
                            <LazySelect {...this.state.lazy_select_config} style={{width:'150px'}} onSelectChange={this.onDevChange} />
                            <Button type="default" icon="download" style={{marginLeft:'10px'}} onClick={this.download}></Button>
                        </div>
                        <div className="sensor-list gap-t" style={{marginTop:'80px'}}>
                            <div className="sensor-list-box">
                                {
                                    this.state.sensor_list.map(item => {
                                        return (
                                            <div style={{textAlign:'center'}}>
                                                <span style={{marginRight:'20px'}}>{item.name} :</span>
                                                <Progress style={{marginRight:'20px'}} type="circle" percent={item.value} format={percent => `${percent}${item.unit} `} />
                                            </div>
                                        )
                                    })
                                }       
                            </div>
                        </div>
                        
                    </div>
                    <div style={{flex:1}} className="border">
                        <div >
                            {pp && <BaiduMap readyValue={pp} />}
                        </div>
                        <div className="gap-t sensor-list-box space-between">
                            <span style={{paddingRight:'20px'}}>区域名称：{area_name}</span>
                            <img width="80px" height="80px" src={area_pic} alt={area_name} />
                        </div>
                    </div>
                    
                </div>
                
                {/* tabs图表 */}
                <div style={{marginTop:'20px'}} className="border">
                    <Tabs defaultActiveKey="1" >
                    {
                        dataSource.map(({data,attr,name})=>{
                            return (
                                <TabPane tab={name} key={attr}>
                                    <LineChartWidthBrush data={data} attr={attr} /> 
                                </TabPane>
                            )
                        })
                    }
                    </Tabs>
                </div>
                <div style={{marginTop:'20px'}} className="border">
                    <Tabs defaultActiveKey="1" >
                    {
                        dataSource.map(({msg_dir_id,attr,name,msg_dev_id})=>{
                            return (
                                <TabPane tab={name} key={msg_dir_id}>
                                    <Line attr={attr} msg_dir_id={msg_dir_id} msg_dev_id={msg_dev_id}/> 
                                </TabPane>
                            )
                        })
                    }
                    </Tabs>
                </div>
            </div>
        )
    }
}