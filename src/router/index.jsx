/*
 * @Author: 伟龙-Willon qq:1061258787 
 * @Date: 2019-03-18 15:07:20 
 * @Last Modified by: 伟龙
 * @Last Modified time: 2019-05-05 16:40:40
 */
import React, { PureComponent } from 'react'
import { BrowserRouter,Route,Switch,Redirect } from 'react-router-dom'
import Login from '../component/login/index.jsx'
import Register from '../component/register/index.jsx'
import BaiduMap from '../component/map/index.jsx' 
import Platform from '../component/platform/index.jsx'
import _fetch from '../tool/fetch.js';
import API from '../component/api.js'
export default class MyRouter extends PureComponent{
    render(){
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={ Login } />
                    <Route path="/register" exact component={ Register } />
                    <Route path="/platform" component={ Platform } />
                    <Route path="/map" component={BaiduMap}/>
                    <Redirect to="/" />
                </Switch>
            </BrowserRouter>
        )
    }
}
