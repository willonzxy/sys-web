/*
 * @Author: 伟龙-Willon qq:1061258787 
 * @Date: 2019-03-18 20:10:58 
 * @Last Modified by: 伟龙
 * @Last Modified time: 2019-04-23 16:00:56
 */

/* content页的路由 */
import Dir from '../content/Dir.jsx'
import PowerCtrl from "../content/PowerCtrl.jsx";
import Company from '../content/Company.jsx'
import RoleCtrl from '../content/RoleCtrl.jsx'
import Dev from '../content/Dev.jsx'
import Area from "../content/Area.jsx";
import Warehouse from '../content/Warehouse.jsx'
import Vdata from '../content/Vdata.jsx'
import WarnConfig from '../content/WarnConfig.jsx'
import UserCtrl from '../content/UserCtrl.jsx'

const base = '/platform' // basepath 写这里会好点
export default [
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
        path:base + '/company',
        exact:true,
        component:Company
    },
    {
        path:base + '/rolectrl',
        exact:true,
        component:RoleCtrl
    },
    {
        path:base + '/userctrl',
        exact:true,
        component:UserCtrl
    },
    {
        path:base + '/dev',
        exact:true,
        component:Dev
    },


    // ----- 以下是非平台管理员的路由 -----
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
    }
]