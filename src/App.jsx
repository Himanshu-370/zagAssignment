import React from "react";
import { Layout, Menu, theme } from "antd";
import "./App.css";

import Logo from "./assets/logo.svg";
import reports from "./assets/reports.svg";
import workspaces from "./assets/workspaces.svg";
import settings from "./assets/settings.svg";

import Heading from "./components/Heading";
import Dashboard from "./components/Dashboard";

// Bringing in the Layout components from antd
const { Header, Content, Sider } = Layout;

const App = () => {
  // Using the theme hook to get the colorBgContainer token
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
            <img src={Logo} width={73} height="auto" alt="logo" />
          </div>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["2"]}
            items={[
              {
                key: "1",
                icon: (
                  <img src={reports} width={20} height="auto" alt="reports" />
                ),
                label: "Reports",
              },
              {
                key: "2",
                icon: (
                  <img
                    src={workspaces}
                    width={20}
                    height="auto"
                    alt="workspaces"
                  />
                ),
                label: "Workspaces",
              },
              {
                key: "3",
                icon: (
                  <img src={settings} width={20} height="auto" alt="settings" />
                ),
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
