/*
 * @Author: willon 伟龙 
 * @Date: 2019-04-27 14:18:10 
 * @Last Modified by: 伟龙
 * @Last Modified time: 2019-05-11 18:53:15
 */
import React, { PureComponent } from 'react';
import '../map/index.css'
let BMap = window.BMap;
export default class BaiduMap extends PureComponent{
    constructor(){
        super(...arguments)
    }
    componentDidMount() {
        let that = this;
        function G(id) {
            return document.getElementById(id);
        }
        var map = new BMap.Map("l-map");
        if(that.props.readyValue){
            let pp = that.props.readyValue;
            map.centerAndZoom(pp, 18);
            map.addOverlay(new BMap.Marker(pp));    //添加标注
        }else{
            map.centerAndZoom("广州",12);                   // 初始化地图,设置城市和地图级别。
        }
        var ac = G("suggestId") && new BMap.Autocomplete(    //建立一个自动完成的对象
            {"input" : "suggestId"
            ,"location" : map
        });
        G("searchResultPanel") && ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
        var str = "";
            var _value = e.fromitem.value;
            var value = "";
            if (e.fromitem.index > -1) {
                value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
            }    
            str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
            
            value = "";
            if (e.toitem.index > -1) {
                _value = e.toitem.value;
                value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
            }    
            str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
            G("searchResultPanel").innerHTML = str;
        });
    
        var myValue;
        G("searchResultPanel") && ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
        var _value = e.item.value;
            myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
            G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
            setPlace();
        });
    
        function setPlace(){
            map.clearOverlays();    //清除地图上所有覆盖物
            function myFun(){
                let site = local.getResults().getPoi(0).site;
                let pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
                let { lat,lng } = pp; // 纬度、经度
                let { attr,onSiteChange } = that.props;
                onSiteChange(attr,pp);
                //onSiteChange('site',site);
                map.centerAndZoom(pp, 18);
                map.addOverlay(new BMap.Marker(pp));    //添加标注
            }
            var local = new BMap.LocalSearch(map, { //智能搜索
              onSearchComplete: myFun
            });
            local.search(myValue);
        }
    }
    render(){
        return (
            <div>
                <div id="l-map" style={{width:'100%',minHeight:'250px',height:'100%'}}></div>
            </div>
        )
    }
}