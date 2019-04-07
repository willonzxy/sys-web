/*
 * @Author: 伟龙-Willon qq:1061258787 
 * @Date: 2019-03-18 20:10:58 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-04-07 16:08:39
 */

/* content页的路由 */
import Area from "../content/Area.jsx";
import Warehouse from '../content/Warehouse.jsx'
import Vdata from '../content/Vdata.jsx'
const base = '/domain' // basepath 写这里会好点
export default [
    {
        path:base + '/area',
        exact:true,
        component:Area
    },
    {
        path:base + '/area/vdata/:id',
        exact:true,
        component:Vdata,
    },
    {
        path:base + '/warehouse',
        exact:true,
        component:Warehouse
    },
    /* {
        path:base + '/area/:area_id',
        exact:true,
        component:AreaInfo
    } */
]