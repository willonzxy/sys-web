/*
 * @Author: 伟龙-Willon qq:1061258787 
 * @Date: 2019-03-18 20:10:58 
 * @Last Modified by: 伟龙-Willon
 * @Last Modified time: 2019-04-01 14:10:55
 */

/* content页的路由 */
import Area from "../content/Area.jsx";
const base = '/domain' // basepath 写这里会好点
export default [
    {
        path:base + '/area',
        exact:true,
        component:Area
    },
    /* {
        path:base + '/area/:area_id',
        exact:true,
        component:AreaInfo
    } */
]