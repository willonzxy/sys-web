/*
 * @Author: 伟龙-Willon qq:1061258787 
 * @Date: 2019-03-19 14:50:30 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-04-07 19:40:57
 */
 /* 卡片 */
import React from 'react';
import '../../css/vdata.css';

export default class Card extends React.PureComponent {
    constructor(){
        super(...arguments)
    }
    componentDidMount(){

    }
    animation(end){

    }
    render(){
        let {type,value,unit,bgcolor} = this.props;
        return (
            <div className="sensor-item gap-l" style={{backgroundColor:bgcolor}}>
                <h3>{type}</h3>
                <span className="font-35px gap-r">{value}</span><sup>{unit}</sup>
            </div>
        )
    }
}