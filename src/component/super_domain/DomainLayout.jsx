/*
 * @Author: 伟龙-Willon qq:1061258787 
 * @Date: 2019-03-18 14:41:51 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-04-16 00:27:15
 */
import React from 'react'
import {Layout, Menu, Icon} from 'antd'
import Breadcrumb from '../../router/breadcrumb/index.jsx'
import { Link } from 'react-router-dom'
import '../../css/layout.css'
const {SubMenu} = Menu;
const {Header, Content, Footer, Sider,} = Layout;
class DomainLayout extends React.Component {

    constructor(){
        super(...arguments)
    }

    state = {
        collapsed: false,
    };

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }

    render() {
        return (
        <Layout style={{ minHeight: '100vh',minWidth:'1200px' }}>
            <Sider
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse}
            >
                <div className="domain-logo" ><h1>IOT</h1></div>
                <Menu theme="dark" defaultSelectedKeys={['1']}  defaultOpenKeys={['1']} mode="inline">
                    {/* <SubMenu
                        key="sub1"
                        title={<span><Icon type="line-chart" /><span>数据监控</span></span>}
                    >
                        <Menu.Item key="1"><Link to="/domain/area">大盘监控</Link></Menu.Item>
                        <Menu.Item key="2"><Link to="/domain/area">区域管理</Link></Menu.Item>

                    </SubMenu> */}
                    {/* <Menu.Item key="1">
                        <Link to="/domain/area"><Icon type="area-chart" />区域监控</Link>
                    </Menu.Item> */}
                    {/* <Menu.Item key="2">
                        <Link to="/domain/warehouse"><Icon type="inbox" />仓储管理</Link>
                    </Menu.Item> */}
                    {/* <Menu.Item key="3">
                        <Link to="/domain/warnsetting"><Icon type="warning" />预警配置</Link>
                    </Menu.Item> */}
                    {/* <SubMenu
                        key="sub1"
                        title={<span><Icon type="line-chart" /><span>人员角色</span></span>}
                    >
                        <Menu.Item key="sub1-1"><Link to="/domain/userctrl">人员管理</Link></Menu.Item>
                        <Menu.Item key="sub1-2"><Link to="/domain/rolectrl">角色权限</Link></Menu.Item>
                        <Menu.Item key="sub1-3"><Link to="/domain/powerctrl">权限管理</Link></Menu.Item>
                    </SubMenu> */}
                    <Menu.Item key="1">
                        <Link to="/superdomain/company"><Icon type="alibaba" />公司审查</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/superdomain/powerctrl"><Icon type="tool" />权限管理</Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to="/superdomain/dir"><Icon type="book" />字典配置</Link>
                    </Menu.Item>
                    {/* <Menu.Item key="1">
                        <Icon type="pie-chart" />
                        <span>区域监控</span>
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        title={<span><Icon type="user" /><span>User</span></span>}
                    >
                        <Menu.Item key="3">Tom</Menu.Item>
                        <Menu.Item key="4">Bill</Menu.Item>
                        <Menu.Item key="5">Alex</Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub2"
                        title={<span><Icon type="team" /><span>Team</span></span>}
                    >
                        <Menu.Item key="6">Team 1</Menu.Item>
                        <Menu.Item key="8">Team 2</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="9">
                        <Icon type="file" />
                        <span>File</span>
                    </Menu.Item> */}
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ background: '#fff', padding: 0 }} />
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