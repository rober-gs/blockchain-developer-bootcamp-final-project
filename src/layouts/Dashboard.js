import React from "react";
import { useWeb3React } from '@web3-react/core';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import { Col,Row, Layout } from "antd";
import { Menu } from "antd";

import { HomeOutlined } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import { MetaMaskButton } from "../components/Butttons/ButtonMetamask";

import { HomePage } from "../views/Home";
import { RegisterView } from "../views/RegisterViews/RegisterView";

// import { RegisterSeller } from "../views/SellerViews/Register";
// import { SalesViews } from "../views/SellerViews/Sales";
// import { ProductList } from "../views/ProductViews/ProductList";
// import { ProductUpload } from "../views/ProductViews/ProductUpload";

import "../assests/css/layouts.css";
import "antd/dist/antd.css";

const { Header, Content, Footer } = Layout;

export const Dashboard = () => {

    const { account }   = useWeb3React();
    
    return (
    <>
      <Layout className="layout">
        <Header>
            <Row>
                <Col span={16}>
                
                    <div className="logo" ></div>
                    <Menu theme="dark" mode="horizontal">
                        <Menu.Item key="home" icon={<HomeOutlined />}>
                            <a href="/home">
                                Home
                            </a>
                        </Menu.Item>     
                        <Menu.Item key="register">
                            <a href="/register">
                                Register
                            </a>
                        </Menu.Item>
                        <Menu.Item key="MetaMask" icon={ account && <UserOutlined />} style={{ background: "#001529" }} >                            
                                <MetaMaskButton />
                        </Menu.Item>   
                    </Menu>                               
                </Col>
                <Col span={8}>
                    {/* <Menu selectable={false} theme="dark" mode="horizontal" style={{position: 'absolute', top: 0, right: 0}}>  */}
                    <Menu selectable={false} theme="dark" mode="horizontal" >
                        { account && <Menu.Item key="account"></Menu.Item> }                                

                    </Menu>
                </Col> 
            </Row>           
        </Header>
        <Content style={{ padding: '0 50px' }}>
          {/* 
            <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item> Home</Breadcrumb.Item>            
          </Breadcrumb> 
          */}
          <div className="site-layout-content">
              <Router>
                  <div>
                      <Switch>
                          <Route exact path="/home" component={ HomePage } />
                          <Route exact path="/register" component={ RegisterView } />                          
                          <Redirect to="/register" />
                      </Switch>
                  </div>
              </Router>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
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
