/*
 * @Author: 伟龙-Willon qq:1061258787 
 * @Date: 2019-03-18 15:07:20 
 * @Last Modified by: 伟龙
 * @Last Modified time: 2019-04-22 21:55:34
 */
import React from 'react'
import { BrowserRouter,Route,Switch,Redirect } from 'react-router-dom'
import Login from '../component/login/index.jsx'
import Register from '../component/register/index.jsx'
// import Domain from '../component/domain/index.jsx'
import Platform from '../component/platform/index.jsx'
export default ()=>{
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={ Login } />
                <Route path="/register" exact component={ Register } />
                {/* <Route path="/domain" component={ Domain } /> */}
                <Route path="/platform" component={ Platform } />
                <Redirect to="/" />
            </Switch>
        </BrowserRouter>
    )
}