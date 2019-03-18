/*
 * @Author: 伟龙-Willon qq:1061258787 
 * @Date: 2019-03-18 14:57:15 
 * @Last Modified by: 伟龙-Willon
 * @Last Modified time: 2019-03-18 15:42:50
 */
import React , { lazy , Suspense }from 'react'

const loading = (font = 'component loading...') =>{
    return ( <div>{font}</div>)
}

export default (component,font)=>{
    const LazyComponent = lazy(()=>component)
    return (
        <Suspense fallback={loading}>
            <LazyComponent />
        </Suspense>
    )
}