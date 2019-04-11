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
function randomT(){
    return Math.random() * 42;
}
function mockData(){
    let data = [];
    let now = Date.now();
    function date(val){
        return now - 1000 * 60 * val
    }
    for(let len = 100;len--;){
        data.push({
            time: dateFormat(date(len),'HH:MM:ss'),
            Tokyo:~~randomT(),
            London:~~randomT()
        })
    }
    return data
}

export default class Curved extends React.Component {
    state = {
        data:mockData()
    }
    render() {
        const data = this.state.data;
        console.log(data)
        const ds = new DataSet();
        const dv = ds.createView().source(data);
        dv.transform({
            type: "fold",
            fields: ["Tokyo", "London"],
            // 展开字段集
            key: "city",
            // key字段
            value: "temperature" // value字段
        });
        const cols = {
            time: {
                range: [0, 1]
            }
        };
        let {title} = this.props;
        return (
        <div style={{textAlign:"center",marginTop:'20px'}}>
            <Chart height={400} data={dv} scale={cols} forceFit >
            <span style={{color:'#908e8e'}}>--{title}--</span>
            <Legend/>
            <Axis name="time" />
            <Axis
                name="temperature"
                label={{
                    formatter: val => `${val}°C`
                }}
            />
            <Tooltip
                crosshairs={{
                    type: "y"
                }}
            />
            <Geom
                type="line"
                position="time*temperature"
                size={2}
                color={"city"}
                shape={"smooth"}
            />
            <Geom
                type="point"
                position="time*temperature"
                size={4}
                shape={"circle"}
                color={"city"}
                style={{
                    stroke: "#fff",
                    lineWidth: 1
                }}
            />
            </Chart>
        </div>
        );
    }
}

