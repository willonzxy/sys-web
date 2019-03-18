/*
 * @Author: 伟龙-Willon qq:1061258787 
 * @Date: 2019-03-18 14:49:46 
 * @Last Modified by: 伟龙-Willon
 * @Last Modified time: 2019-03-18 18:31:52
 */
/* import LazyComp from '../component/HOC/LazyComponent.jsx' */
import DomainLayout from '../component/DomainLayout.jsx'
import Area from '../component/content/Area.jsx'
export default [
    {
        path:'/domain',
        /* component:LazyComp(DomainLayout) */
        component:DomainLayout
    },
    {
        path:'/domain/area',
        component:Area,
    },
]