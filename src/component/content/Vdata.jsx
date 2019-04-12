import React from 'react';
import Card from '../card/index.jsx';
import '../../css/vdata.css'
import LineChartWidthBrush from '../vChart/LineWidthBrush.jsx'
import { DatePicker ,Button,Tabs} from 'antd'
import DateFormat from 'dateformat'
import moment from 'moment'
import DashBoard from '../dashboard/index.jsx'
const {TabPane} = Tabs;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';

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
        dataSource:[],
        oxygenData:[],
        timeRange:{}
    }
    componentDidMount(){
        
        let sensor_list = [
            {name:'溶解氧',value:'20',unit:'m^3',_id:'123',attr:'oxygen'},
            {name:'水温',value:'26',unit:'C',_id:'456',attr:'temperature'},
        ]
        let task = sensor_list.map(({name,attr,unit})=>{
            return new Promise((resolve,reject)=>{
                resolve({
                    name,
                    attr,
                    unit,
                    data:randomT(24*7*1,attr) // 两个星期
                })
            })
        })
        Promise.all(task).then(data=>{
            this.setState({
                dataSource:data,
                sensor_list
            })

        })
        
    }
    onDateChange = (date,dateString)=>{
        let start = +new Date(date[0]._d),
            end = +new Date(date[1]._d);
        console.log(start,end)
        this.setState({
            timeRange:{
                start,end
            }
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
        console.log(this.state.timeRange)
    }
    getData = () => {
        return <div>asd</div>
    }
    render(){
        const { _id,pic,area_name} = this.props.location.state;
        return (
            <div className="vdata">
                <div className="sensor-list-box space-between" >
                    <div className="dateTool">
                        <span>时间范围：</span>
                        <RangePicker
                            defaultValue={[moment(DateFormat(Date.now(),'yyyy/mm/dd'), dateFormat), moment(DateFormat(Date.now(),'yyyy/mm/dd'), dateFormat)]}
                            format={dateFormat}
                            onChange = {this.onDateChange}
                        />
                        <Button type="default" icon="search" style={{marginLeft:'10px'}} onClick={this.search}>Search</Button>
                        <Button type="default" icon="download" style={{marginLeft:'10px'}} onClick={this.download}>download</Button>
                    </div>
                    <div>
                        <span style={{paddingRight:'20px'}}>{area_name}</span>
                        <img width="60px" height="60px" src={pic} alt={area_name}/>
                    </div>
                </div>
                <div className="sensor-list gap-t">
                    <div className="sensor-list-box">
                    <span>观察参数：</span>
                    {
                        this.state.sensor_list.map(item => {
                            let bgcolor = `rgb(${ ~~random()},${~~random()},${~~random()})`
                            return (
                                <Card {...item} bgcolor={bgcolor}/>
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
                                    <LineChartWidthBrush data={data} attr={attr}/> 
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