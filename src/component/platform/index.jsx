/*
 * @Author: 伟龙-Willon qq:1061258787 
 * @Date: 2019-03-18 20:03:50 
 * @Last Modified by: 伟龙
 * @Last Modified time: 2019-05-05 16:45:46
 */
import React from 'react'
import { Route } from 'react-router-dom'
import DomainLayout from './DomainLayout.jsx'
import routes from './routes.js'

export default () => (
    <DomainLayout>
        {
            routes.map(item=><Route key={item.path} { ...item}/>)
        }
    </DomainLayout>
)