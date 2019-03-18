/*
 * @Author: 伟龙-Willon qq:1061258787 
 * @Date: 2019-03-18 15:07:20 
 * @Last Modified by: 伟龙-Willon
 * @Last Modified time: 2019-03-18 20:21:26
 */
import React from 'react'
import { BrowserRouter,Route,Switch,Redirect } from 'react-router-dom'
/* import routes from './routes.js' */
import Domain from '../component/layout/index.jsx'

export default ()=>{
    return (
        <BrowserRouter>
            <Route path="/" exact component={ () => <div>login.........</div> } />
            <Route path="/domain" exact component={ Domain }/>
        </BrowserRouter>
    )
}