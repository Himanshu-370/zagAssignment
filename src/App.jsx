import React from "react";
import { Layout, Menu, theme } from "antd";
import "./App.css";

import Logo from "./assets/logo.svg";
import sidebar1 from "./assets/s1.svg";
// import sidebar2 from "./assets/s2.svg";
import sidebar3 from "./assets/s3.svg";
import Heading from "./components/Heading";
import Dashboard from "./components/Dashboard";

const { Header, Content, Sider } = Layout;

const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <React.Fragment>
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="demo-logo-vertical">
            <img src={Logo} alt="" />
          </div>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["2"]}
            items={[
              {
                key: "1",
                icon: <img src={sidebar1} />,
                label: "Reports",
              },
              {
                key: "2",
                icon: <img src={sidebar1} />,
                label: "Workspaces",
              },
              {
                key: "3",
                icon: <img src={sidebar3} />,
                label: "Settings",
              },
            ]}
          />
        </Sider>

        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Heading />
          </Header>
          <Content
            style={{
              margin: "24px 16px 0",
            }}
          >
            <div
              style={{
                padding: 24,
                minHeight: 1000,
                background: colorBgContainer,
                borderRadius: "10px",
                margin: "0 20px",
              }}
            >
              <Dashboard />
            </div>
          </Content>
        </Layout>
      </Layout>
    </React.Fragment>
  );
};

export default App;
