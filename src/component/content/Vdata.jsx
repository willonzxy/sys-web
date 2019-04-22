import React from 'react';
import Card from '../card/index.jsx';
import '../../css/vdata.css'
import LineChartWidthBrush from '../vChart/LineWidthBrush.jsx'
import { DatePicker ,Button,Tabs, message,Progress} from 'antd'
import DateFormat from 'dateformat'
import moment from 'moment'
import Loading from '../loading/index.jsx'
import DashBoard from '../dashboard/index.jsx'
import API from '../api.js'
import qs from 'querystring'
import _fetch from '../../tool/fetch.js'
const { area,sensor_data_api } =  API;
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
    }
    state = {
        sensor_list:[
            
        ],
        initialDate:[DateFormat(Date.now() - 1000 * 60 * 60 * 24 ,mysqlDateFormat),DateFormat(Date.now(),mysqlDateFormat)],
        dataSource:[],
        oxygenData:[],
        timeRange:{}
    }
    componentDidMount(){
        this.fetchData()
        /** 
         * 1、请求该company_id 对应的传感器列表，ids 
         * 2、获取时间区间，加载对应区间数据
         */
        // let id = this.props.match.params.id;
        // let sensor_list = [
        //     {name:'溶解氧',value:'20',unit:'m^3',_id:'123',attr:'oxygen'},
        //     {name:'水温',value:'26',unit:'C',_id:'456',attr:'temperature'},
        // ]
        // let task = sensor_list.map(({name,attr,unit})=>{
        //     return new Promise((resolve,reject)=>{
        //         resolve({
        //             name,
        //             attr,
        //             unit,
        //             data:randomT(24*7*1,attr) // 两个星期
        //         })
        //     })
        // })
        // Promise.all(task).then(data=>{
        //     this.setState({
        //         dataSource:data,
        //         sensor_list
        //     })

        // })
        
    }
    fetchData = async (date)=>{
        /** 
         * 1、请求该company_id 对应的传感器列表，ids 
         * 2、获取时间区间，加载对应区间数据
         */
        try {
            let area_id = this.props.match.params.id;
            let data = await _fetch.get(`${area}?_id=${area_id}`)
            let sensor_list = data.data.list[0].sensor_list,attrs=JSON.stringify(['acquisition_time','processed_data']);
                date || (date = this.state.initialDate);
            let result = [],s_list = [];
            for(let len = sensor_list.length ;len--;){
                let dirs = await _fetch.get(`/dir?d_id=${sensor_list[len]}`)
                let name = dirs.data.list[0].dir_name,unit = dirs.data.list[0].dir_desc;
                let info = await _fetch.get(`${sensor_data_api}?pageNum=1&tableName=ift_data_record&attrs=${attrs}&as=${JSON.stringify(['date',`${name}`])}&check_item_id='${sensor_list[len].toString()}'&date=${JSON.stringify(date)}`);
                if(info.length > 0){
                    info.forEach(item=>{
                        item.date = + new Date(item.date) 
                    })
                    s_list.push({
                        name,
                        attr:name,
                        unit,
                        value:info[0][name]
                    })
                    result.push({
                        name,
                        attr:name,
                        unit,
                        data:info
                    })
                }else{
                    message.warn(`该时间区间没有${name}数据哟`)
                }
                
            }
            this.setState({
                dataSource:result,
                sensor_list:s_list,
                // timeRange:{
                //     start:+ new Date(date[0]),
                //     end:+ new Date(date[1]),
                // }
            })
        } catch (error) {
            message.warn('没有该时间端的数据喔😯，换个时间试试呗')
        }
       
    }
    onDateChange = (date,dateString)=>{
        let start = +new Date(date[0]._d),
            end = +new Date(date[1]._d);
        console.log(DateFormat(start,mysqlDateFormat),DateFormat(end,mysqlDateFormat))
        //let d1 = DateFormat(start,mysqlDateFormat),d2 = DateFormat(end,mysqlDateFormat)
      
        this.setState({
            timeRange:{
                start,end
            }
        },()=>{
            this.fetchData([DateFormat(start,mysqlDateFormat),DateFormat(end,mysqlDateFormat)])
        })
        
    }
    download = ()=>{
        // window.open('/download','_blank')
        let nd_a = window.document.createElement('a');
            nd_a.href = '/download'
            nd_a.download = 'package.json';
        window.document.body.appendChild(nd_a)
            nd_a.click()
        //window.document.body.removeChild(nd_a)
    }
    search = ()=>{
        let timeRange = this.state;
        console.log(timeRange)
        this.fetchData([DateFormat(timeRange.start,mysqlDateFormat),DateFormat(timeRange.end,mysqlDateFormat)])
    }
    
    render(){
        const { _id,area_pic,area_name} = this.props.location.state;
        const {dataSource} = this.state;
        return (
            dataSource ? <div className="vdata">
                <div className="sensor-list-box space-between" >
                    <div className="dateTool">
                        <span>时间范围：</span>
                        <RangePicker
                            defaultValue={[moment(DateFormat(Date.now(),'yyyy/mm/dd'), dateFormat), moment(DateFormat(Date.now(),'yyyy/mm/dd'), dateFormat)]}
                            format={dateFormat}
                            onChange = {this.onDateChange}
                        />
                        {/* <Button type="default" icon="search" style={{marginLeft:'10px'}} onClick={this.search}>Search</Button> */}
                        <Button type="default" icon="download" style={{marginLeft:'10px'}} onClick={this.download}>download</Button>
                    </div>
                    <div>
                        <span style={{paddingRight:'20px'}}>{area_name}</span>
                        <img width="60px" height="60px" src={area_pic} alt={area_name}/>
                    </div>
                </div>
                <div className="sensor-list gap-t">
                    <div className="sensor-list-box">
                    
                    {
                        this.state.sensor_list.map(item => {
                            //let bgcolor = `rgb(${ ~~random()},${~~random()},${~~random()})`
                            return (
                                <div>
                                    <span style={{marginRight:'20px'}}>{item.name} :</span>
                                    <Progress style={{marginRight:'20px'}} type="circle" percent={item.value} format={percent => `${percent}${item.unit} `} />
                                </div>
                            )
                        })
                    }            
                    </div>
                </div>
                
                
                
                {/* tabs图表 */}
                <div style={{marginTop:'20px'}}>
                    <Tabs defaultActiveKey="1" >
                    {
                        this.state.dataSource.map(({data,attr,name})=>{
                            return (
                                <TabPane tab={name} key={attr}>
                                    <LineChartWidthBrush data={data} attr={attr} /> 
                                </TabPane>
                            )
                        })
                    }
                    </Tabs>
                </div>
            </div> : <Loading />
            
        )
    }
}