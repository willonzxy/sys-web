/*
 * @Author: 伟龙-Willon qq:1061258787 
 * @Date: 2019-03-18 20:10:58 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-04-12 20:40:30
 */

/* content页的路由 */
import Area from "../content/Area.jsx";
import Warehouse from '../content/Warehouse.jsx'
import Vdata from '../content/Vdata.jsx'
import WarnConfig from '../content/WarnConfig.jsx'
import Role from '../content/Area.jsx'
import Dir from '../content/Dir.jsx'
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
    {
        path:base + '/warnsetting',
        exact:true,
        component:WarnConfig
    },
    {
        path:base + '/role',
        exact:true,
        component:Role
    },
    {
        path:base + '/dir',
        exact:true,
        component:Dir
    }
    /* {
        path:base + '/area/:area_id',
        exact:true,
        component:AreaInfo
    } */
]