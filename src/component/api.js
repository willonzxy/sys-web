/*
 * @Author: 伟龙-Willon qq:1061258787 
 * @Date: 2019-03-19 10:51:36 
 * @Last Modified by: 伟龙
 * @Last Modified time: 2019-05-10 20:21:28
 */
/** 组件所用的所有api都收藏于此，统一管理 */
const baseApi = 'http://localhost:4000',
      resolve = function(path){
          return baseApi + path
      }
export default {
    login:'/user/login',
    companyRegister:"/company",
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
    warn:'/warn',
    power:'/power',
    role:'/role',
    getCollections:'/dir?p_id=C&pageSize=1000',
    getActions:'/dir?p_id=A&pageSize=1000',
    getWarnTags:'/dir?p_id=S&pageSize=1000',
    table_data_set:'/tabledataset',
    getOwnMenu:'/ownMenu?role=domain',
    getSuperDomainMenu:'/ownMenu?role=super_domain',
    company:'/company',
    getSession:'/session',
    sensor_data_api:'http://localhost:3001/data',
    platformRole:'/dir?p_id=R&pageSize=1000',
    dev:'/dev',
    msg:'/msg',
}