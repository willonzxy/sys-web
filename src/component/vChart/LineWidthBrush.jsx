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

import Brush from "@antv/g2-brush";
import $ from "jquery";


function getComponent(data,attr) {
  $("#mountNode").html('<div id="canvas1"></div><div id="canvas2"></div>');
  const ds = new DataSet({
    state: {
      dates: null
    }
  });
  const totalDv = ds.createView().source(data);
  const dv = ds.createView();
  dv.source(data).transform({
    type: "filter",
    callback: obj => {
      if (ds.state.dates) {
        return ds.state.dates.indexOf(obj.date) > -1;
      }

      return obj;
    }
  });
  let scale1 = {
    date: {
      tickCount: 10,
      type: "time",
      mask: "MM/D hh:mm" // 这边的年月日要大写
    },
    [attr]: {
      min: totalDv.min(attr),
      max: totalDv.max(attr)
    }
  };
  let scale2 = {
    date: {
      tickCount: 10,
      type: "time",
      mask: "YYYY/MM/D hh:mm"
    }
  };
  let chart2;

  class DoubleChart extends React.Component {
    componentDidMount() {
      new Brush({
        canvas: chart2.get("canvas"),
        chart: chart2,
        type: "X",
        dragable: true,

        onBrushmove(ev) {
          const { date } = ev;
          ds.setState("dates", date);
        },

        onDragmove(ev) {
          const { date } = ev;
          ds.setState("dates", date);
        }
      });
    }

    render() {
      return (
        <div>
          <Chart
            height={window.innerHeight * (3 / 5)}
            data={dv}
            padding={[30, 20, 20, 80]}
            scale={scale1}
            animate={false}
            forceFit
          >
            <Axis />
            <Tooltip />
            <Geom
              type="line"
              position={`date*${attr}`}
              shape="smooth"
              opacity={0.85}
            />
          </Chart>
          <Chart
            height={window.innerHeight * (1 / 8)}
            data={data}
            padding={[30, 20, 20, 80]}
            scale={scale2}
            onGetG2Instance={g2Chart => {
              chart2 = g2Chart;
            }}
            forceFit
          >
            <Axis name={attr} visible={false} />
            <Geom
              type="area"
              position={`date*${attr}`}
              shape="smooth"
              acitve={false}
              opacity={0.85}
            />
          </Chart>
        </div>
      );
    }
  }
  return DoubleChart;
}

export default class Brushdsstate extends React.Component {
  constructor(){
    super(...arguments)
  }
  render() {
    let { attr,data } = this.props;
    const DoubleChart = getComponent(data,attr);
    return (
      <DoubleChart />
    );
  }
}

