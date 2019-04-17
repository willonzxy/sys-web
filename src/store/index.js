/*
 * @Author: 伟龙-Willon qq:1061258787 
 * @Date: 2018-11-14 18:10:01 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-04-17 23:32:18
 */
import { createStore , combineReducers , applyMiddleware,compose } from "redux"
import thunkMiddleware  from "redux-thunk"
import PermissionReducer from "./reducer/permissions.js"
const reducer = combineReducers({
    permission:PermissionReducer
})
const middlewares = [
    thunkMiddleware
]

/* const storeEnhancers = compose(
    applyMiddleware(...middlewares),
    f => f
) */
/**
 * 写成函数的形式是有原因的
 * 1、可以方便状态的初始化
 * 2、同步所有组件的状态
 */

export default (initState) => createStore(reducer,initState,applyMiddleware(thunkMiddleware)) 


