/*
 * @Author: 伟龙-Willon qq:1061258787 
 * @Date: 2019-03-18 14:41:51 
 * @Last Modified by: 伟龙
 * @Last Modified time: 2019-04-23 00:52:46
 */
import React from 'react'
import {Layout, Menu, Icon,message} from 'antd'
import Breadcrumb from '../../router/breadcrumb/index.jsx'
import { Link } from 'react-router-dom'
import '../../css/layout.css'
import _fetch from '../../tool/fetch.js'
import API from '../api.js'
const {getSuperDomainMenu,getSession,getOwnMenu} = API;
const {SubMenu} = Menu;
const {Header, Content, Footer, Sider} = Layout;
class DomainLayout extends React.Component {

    constructor(){
        super(...arguments)
    }

    state = {
        collapsed: false,
        ownMenu:[],
    };

    componentDidMount = ()=>{
        let role = '',tel = '';
        try {
            _fetch.get(getSession)
            .then((res)=>{
                if(res.status === 1){
                    message.success('拉取用户菜单数据')
                    role = res.session.role;
                    tel = res.session.user.tel;
                }else{
                    this.props.history.push({
                        pathname:'/'
                    })
                }
            }).then(()=>{
                return _fetch.get(role === 'platform_admin' ? getSuperDomainMenu:getOwnMenu)
            })
            .then(res=>{
                this.setState({
                    ownMenu:res,
                    tel,
                    role
                })
            })
        } catch(e){
            message.warn('请登陆')
            setTimeout(()=>{
                window.open('/','_top')
            },1000)
        }
    }

    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    }

    render() {
        const {ownMenu,tel,role} = this.state;
        return (
        <Layout style={{ minHeight: '100vh',minWidth:'1200px' }}>
            <Sider
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse}
            >
                <div className="domain-logo" ><h1>气象监控平台</h1></div>
                <Menu theme="dark" defaultSelectedKeys={['1']}  defaultOpenKeys={['1']} mode="inline">
                {
                    ownMenu.map(({to,label,key,icon})=>{
                        return (
                            <Menu.Item key={key}>
                                <Link to={to}>
                                    <Icon type={icon} />
                                    <span>{label}</span>
                                </Link>
                            </Menu.Item>
                        )
                    })
                }
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ background: '#fff', padding: 0 }} >
                    <div style={{textAlign:'right',paddingRight:'20px'}}>
                        <Icon type='user' /> : {tel}
                        <Icon type='tool' style={{marginLeft:'20px'}}/> : {role === 'platform_admin'?'平台超级管理员':role === 'company_admin'?'公司管理员':'平台使用者'}
                    </div>
                </Header>
                <Content style={{ margin: '0 16px' }}>
                    <div style={{ padding: 24, background: '#fff', minHeight: 360,marginTop:'16px' }}>
                        {
                            this.props.children
                        }
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    IOT System ©2019 Created by Willon
                </Footer>
            </Layout>
        </Layout>
        );
    }
}

export default DomainLayout