/*
 * @Author: 伟龙-Willon qq:1061258787 
 * @Date: 2019-03-19 10:51:36 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-04-15 21:10:47
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
    warehouse:{
        add:{
            path:'/warehouse',
            method:'post',
        },
        get:{
            path:'/warehouse',
            method:'get'
        },
        del:{
            path:'/warehouse/:id',
            method:'delete'
        }
    },
    area:'/area',
    dir:'/dir',
    upload:{
        path:'/upload',
        method:'post'
    },
    power:'/power',
    role:'/role',
    getCollections:'/dir?p_id=C',
    getActions:'/dir?p_id=A',
    getWarnTags:'/dir?p_id=W',
    table_data_set:'/tabledataset'
}