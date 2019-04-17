/*
 * @Author: 伟龙-Willon qq:1061258787 
 * @Date: 2019-03-18 20:10:58 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-04-16 22:56:01
 */

/* content页的路由 */
import Dir from '../content/Dir.jsx'
import PowerCtrl from "../content/PowerCtrl.jsx";
import Company from '../content/Company.jsx'
import RoleCtrl from '../content/RoleCtrl.jsx'
const base = '/superdomain' // basepath 写这里会好点
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
    }
    /* {
        path:base + '/area/:area_id',
        exact:true,
        component:AreaInfo
    } */
]