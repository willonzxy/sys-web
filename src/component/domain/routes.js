/*
 * @Author: 伟龙-Willon qq:1061258787 
 * @Date: 2019-03-18 20:10:58 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-04-15 22:30:47
 */

/* content页的路由 */
import Area from "../content/Area.jsx";
import Warehouse from '../content/Warehouse.jsx'
import Vdata from '../content/Vdata.jsx'
import WarnConfig from '../content/WarnConfig.jsx'
import UserCtrl from '../content/UserCtrl.jsx'
import Dir from '../content/Dir.jsx'
import PowerCtrl from "../content/PowerCtrl.jsx";
import RoleCtrl from "../content/RoleCtrl.jsx";

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
    // {
    //     path:base + '/warehouse',
    //     exact:true,
    //     component:Warehouse
    // },
    {
        path:base + '/warn',
        exact:true,
        component:WarnConfig
    },
    {
        path:base + '/userctrl',
        exact:true,
        component:UserCtrl
    },
    {
        path:base + '/dir',
        exact:true,
        component:Dir
    },
    {
        path:base + '/powerctrl',
        exact:true,
        component:PowerCtrl
    },
    {
        path:base + '/rolectrl',
        exact:true,
        component:RoleCtrl
    }
    /* {
        path:base + '/area/:area_id',
        exact:true,
        component:AreaInfo
    } */
]