import React from 'react';
import Card from '../card/index.jsx';
import '../../css/vdata.css'
import LineForm from '../vForm/Line.jsx'
function random(){
    return Math.random() * 255
}
export default class Vdata extends React.PureComponent {
    constructor(){
        super(...arguments)
    }
    state = {
        dataSource:[
            {type:'溶解氧',value:'20',unit:'m^3'},
            {type:'水温',value:'23',unit:'C'},
        ]
    }
    componentDidMount(){

    }
    getData = () => {
        return <div>asd</div>
    }
    render(){
        return (
            <div className="sensor-list">
                <div className="sensor-list-box">
                {
                    this.state.dataSource.map(item => {
                        let bgcolor = `rgb(${ ~~random()},${~~random()},${~~random()})`
                        return (
                            <Card {...item} bgcolor={bgcolor}/>
                        )
                    })
                }
                </div>
                <LineForm/>
            </div>
        )
    }
}