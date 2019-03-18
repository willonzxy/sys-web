/*
 * @Author: 伟龙-Willon qq:1061258787 
 * @Date: 2019-03-18 20:03:50 
 * @Last Modified by: 伟龙-Willon
 * @Last Modified time: 2019-03-18 20:08:38
 */
import React from 'react'
import { Route } from 'react-router-dom'
import DomainLayout from './DomainLayout.jsx'
import Area from '../content/Area.jsx'
export default () => (
    <DomainLayout>
        <Route path="/domain/area" component={Area}/>
    </DomainLayout>
)