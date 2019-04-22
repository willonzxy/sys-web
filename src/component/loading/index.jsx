import React from 'react'
import {Spin} from 'antd'
export default ({tip='Loading...'})=>{
    return (
        <div style={{display:'flex',height:'100vh',justifyContent:'center',alignItems:'center'}}><Spin tip={tip} ></Spin></div>
    )
}