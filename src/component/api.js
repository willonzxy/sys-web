/*
 * @Author: 伟龙-Willon qq:1061258787 
 * @Date: 2019-03-19 10:51:36 
 * @Last Modified by: 伟龙-Willon
 * @Last Modified time: 2019-04-01 15:09:59
 */
/** 组件所用的所有api都收藏于此，统一管理 */
const baseApi = 'http://localhost:4000',
      resolve = function(path){
          return baseApi + path
      }
export default {
    login:{
        signOn:{
            path:'/company/login',
            method:'post',
        }
    },
    register:{
        signIn:{
            path:'/company/register',
            method:'post',
        }
    },
    upload:{
        path:'/upload',
        method:'post'
    }
}