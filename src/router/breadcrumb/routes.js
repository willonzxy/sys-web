/*
 * @Author: 伟龙-Willon qq:1061258787 
 * @Date: 2019-03-18 16:37:24 
 * @Last Modified by: 伟龙-Willon
 * @Last Modified time: 2019-03-18 17:19:30
 */
import React from "react"
import { Link } from 'react-router-dom'

const routes = [
    {
        path: '/domain',
        breadcrumbName: '首页'
    }
]

function itemRender(route, params, routes, paths) {
  const last = routes.indexOf(route) === routes.length - 1;
  return last ? <span>{route.breadcrumbName}</span> : <Link to={paths.join('/')}>{route.breadcrumbName}</Link>;
}

export { itemRender,routes }