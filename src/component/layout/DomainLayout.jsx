/*
 * @Author: 伟龙-Willon qq:1061258787 
 * @Date: 2019-03-18 14:41:51 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-04-06 22:33:32
 */
import React from 'react'
import {Layout, Menu, Icon,} from 'antd'
import Breadcrumb from '../../router/breadcrumb/index.jsx'
import { Link } from 'react-router-dom'
import '../../css/layout.css'
const {Header, Content, Footer, Sider,} = Layout;
const SubMenu = Menu.SubMenu;
  
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
                <Menu theme="dark" defaultSelectedKeys={['1']}  defaultOpenKeys={['sub1']} mode="inline">
                    {/* <SubMenu
                        key="sub1"
                        title={<span><Icon type="pie-chart" /><span>区域管理</span></span>}
                    >
                        <Menu.Item key="1"><Link to="/domain/area">数据监控</Link></Menu.Item>
                        <Menu.Item key="2"><Link to="/domain/area">新增区域配置</Link></Menu.Item>
                    </SubMenu> */}
                    <Menu.Item key="1">
                        <Link to="/domain/area"><Icon type="line-chart" />区域管理</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/domain/warehouse"><Icon type="pie-chart" />仓储管理</Link>
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
                    <Breadcrumb style={{ margin: '16px 0' }} />
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
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