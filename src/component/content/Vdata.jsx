import React from 'react';
import Card from '../card/index.jsx';
import '../../css/vdata.css'
import LineChartWidthBrush from '../vForm/LineWidthBrush.jsx'
import { DatePicker ,Button} from 'antd'
import DateFormat from 'dateformat'
import moment from 'moment'
function random(){
    return Math.random() * 255
}

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';
export default class Vdata extends React.PureComponent {
    constructor(){
        super(...arguments)
    }
    state = {
        dataSource:[
            {type:'溶解氧',value:'20',unit:'m^3'},
        ],
        timeRange:{}
    }
    componentDidMount(){
        console.log(DateFormat(Date.now(),'yyyy/mm/dd'))
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
                <div className="sensor-list-box" style={{justifyContent:'space-between'}}>
                    
                    <div className="dateTool">
                        <span>时间范围：</span>
                        <RangePicker
                            defaultValue={[moment(DateFormat(Date.now(),'yyyy/mm/dd'), dateFormat), moment(DateFormat(Date.now(),'yyyy/mm/dd'), dateFormat)]}
                            format={dateFormat}
                            onChange = {this.onDateChange}
                        />
                        <Button type="default" icon="search" style={{marginLeft:'10px'}} onClick={this.search}>Search</Button>
                    </div>
                    <div><span style={{paddingRight:'20px'}}>{area_name}</span><img width="60px" height="60px" src={pic} alt={area_name}/></div>
                </div>
                <div className="sensor-list">
                    <div className="sensor-list-box">
                    
                    <span>观察参数：</span>
                    {
                        this.state.dataSource.map(item => {
                            let bgcolor = `rgb(${ ~~random()},${~~random()},${~~random()})`
                            return (
                                <Card {...item} bgcolor={bgcolor}/>
                            )
                        })
                    }
                    
                    </div>
                    
                </div>
                <div style={{marginTop:'20px'}}>
                    <span>变化曲线:</span>
                    <LineChartWidthBrush />
                </div>
            </div>
            
        )
    }
}