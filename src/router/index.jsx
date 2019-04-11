/*
 * @Author: 伟龙-Willon qq:1061258787 
 * @Date: 2019-03-18 15:07:20 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-04-09 11:30:43
 */
import React from 'react'
import { BrowserRouter,Route,Switch,Redirect } from 'react-router-dom'
import Login from '../component/login/index.jsx'
import Register from '../component/register/index.jsx'
import Domain from '../component/domain/index.jsx'

export default ()=>{
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={ Login } />
                <Route path="/register" exact component={ Register } />
                <Route path="/domain" component={ Domain } />
                <Redirect to="/" />
            </Switch>
        </BrowserRouter>
    )
}