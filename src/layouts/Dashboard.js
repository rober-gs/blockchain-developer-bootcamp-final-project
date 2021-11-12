import React, { useState } from "react";
// import { Routes, Route, Link } from "react-router-dom";

import { Layout, Menu, Breadcrumb } from "antd";

import { WalletOutlined } from "@ant-design/icons";
// import { DesktopOutlined } from "@ant-design/icons";
// import { FileOutlined } from "@ant-design/icons";
// import { TeamOutlined } from "@ant-design/icons";
// import { UserOutlined } from "@ant-design/icons";

import "../assests/css/layouts.css";
import "antd/dist/antd.css";
import { Metamask } from "../views/Metamask";

const { Header, Content, Footer, Sider } = Layout;
//const { SubMenu } = Menu;

export const Dashboard = () => {
  const [state, setState] = useState({
    collapsed: true,
  });

  const onCollapse = (collapsed) => {    
    setState({
      ...state,
      collapsed,
    });    
  };

  return (
    <>

      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={state.collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1" icon={<WalletOutlined />}>Metamask</Menu.Item>
            {/* <Menu.Item key="2" icon={<DesktopOutlined />}>
                    Option 2
                </Menu.Item>
                <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                    <Menu.Item key="3">Tom</Menu.Item>
                    <Menu.Item key="4">Bill</Menu.Item>
                    <Menu.Item key="5">Alex</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                    <Menu.Item key="6">Team 1</Menu.Item>
                    <Menu.Item key="8">Team 2</Menu.Item>
                </SubMenu>
                <Menu.Item key="9" icon={<FileOutlined />}>
                    Files
                </Menu.Item> */}
          </Menu>
        </Sider>
        <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} >
                
            </ Header>
            <Content style={{ margin: "0 16px" }}>
                <Breadcrumb style={{ margin: "16px 0" }}>
                    <Breadcrumb.Item>Meta Mask</Breadcrumb.Item>                   
                </Breadcrumb>
                <div
                    className="site-layout-background"
                    style={{ padding: 24, minHeight: 360 }}
                >
                    <Metamask />                    
                </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
                Ant Design ©2018 Created by Ant UED
            </Footer>
        </Layout>
      </Layout>
    </>
  );
};

// #components-layout-demo-side .logo {
//     height: 32px;
//     margin: 16px;
//     background: rgba(255, 255, 255, 0.3);
//   }

//   .site-layout .site-layout-background {
//     background: #fff;
//   }
