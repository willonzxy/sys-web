import React from 'react'
import { TreeSelect,message } from 'antd';
import _fetch from '../../tool/fetch.js'
const SHOW_PARENT = TreeSelect.SHOW_PARENT;
 
export default class LazyTreeSelect extends React.Component {
  state = {
    value: ['0-0-0'],
  }

  onChange = (value) => {
    console.log('onChange ', value);
    this.setState({ value });
  }

  constructor(){
    super(...arguments)
    this.state = {
        data:[]
    }
}
componentDidMount(){
    let {api,label,groupBy,show,dataIndex,handleData=1} = this.props;
    let arr = [],temp = [];
    _fetch.get(api)
    .then(res=>{
        if(res.status === 1){
          let data = res.data.list;
          if(!handleData){
            return this.setState({
              data
            })
          }
          data.forEach((item,index) => {
              if(!temp.includes(item[groupBy])){ // 新的分组
                  temp.push(item[groupBy])
                  arr.push({
                    title:item[groupBy],
                    value:data.filter(i=>i[groupBy] === item[groupBy]).map(i=>i[dataIndex]),
                    key:index,
                    children:[{
                      title:item[show],
                      value:item[dataIndex],
                      key:item[dataIndex],
                    }]
                  });
              }else{
                arr.forEach(k=>{
                    if(k.title === item[groupBy]){
                        k.children.push({
                          title:item[show],
                          value:item[dataIndex],
                          key:item[dataIndex],
                        }) // 看到的是power_name，选的是power_id
                    }
                })
              }
          });
          console.log(arr)
          return this.setState({
                data:arr
          })
        }
        message.warn(`获取${label}数据失败`)
    })
}
onChange = (val)=>{
    let {onSelectChange,attr} = this.props;
    onSelectChange(attr,val)
}

  render() {
    const tProps = {
      treeData:this.state.data,
    //   value: this.state.value,
      onChange: this.onChange,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: 'Please select',
    };
    return <TreeSelect {...tProps} />;
  }
}
