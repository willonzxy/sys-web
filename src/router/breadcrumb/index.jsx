/*
 * @Author: 伟龙-Willon qq:1061258787 
 * @Date: 2019-03-18 16:40:36 
 * @Last Modified by: 伟龙-Willon
 * @Last Modified time: 2019-03-18 16:43:03
 */

import React from 'react'
import { Breadcrumb } from 'antd'
import { itemRender,routes } from './routes.js'

export default props => <Breadcrumb itemRender={itemRender} routes={routes} {...props}/>