/*
 * @Author: 伟龙-Willon qq:1061258787 
 * @Date: 2019-03-19 10:51:36 
 * @Last Modified by: 伟龙
 * @Last Modified time: 2019-04-18 09:43:05
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
            path:'/company',
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
    user:'/user',
    warn:'/warnconfig',
    power:'/power',
    role:'/role',
    getCollections:'/dir?p_id=C&pageSize=1000',
    getActions:'/dir?p_id=A&pageSize=1000',
    getWarnTags:'/dir?p_id=W&pageSize=1000',
    table_data_set:'/tabledataset',
    getOwnMenu:'/ownMenu?role=domain',
    getSuperDomainMenu:'/ownMenu?role=super_domain',
    company:'/company',
    getSession:'/session'
}