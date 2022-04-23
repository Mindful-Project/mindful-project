import { useState } from "react";
import { Layout, Menu, Breadcrumb, Button } from "antd";
import {
  LogoutOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import "./Dashboard.css";
import Logo from "../components/assets/mindful logo.png";
import Events from "../components/Events/Events";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const history = useNavigate();
  // const search = window.location.search;
  // const params = new URLSearchParams(search);

  const { username } = useParams();

  const date = new Date();
  const hrs = date.getHours();

  let greet;

  if (hrs < 12) greet = "Good Morning";
  else if (hrs >= 12 && hrs < 17) greet = "Good Afternoon";
  else if (hrs >= 17 && hrs < 19) greet = "Good Evening";
  else greet = "Good Night";

  const onCollapse = (collapsed) => {
    console.log(collapsed);
    setCollapsed(collapsed);
  };


  const logoutHandler = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("authTaken");
    localStorage.removeItem("email");
    history("/");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        {collapsed === false ? (
          <div className="logo">
            <center>
              <img src={Logo} className="img" />
              <p
                style={{ cursor: "pointer" }}
              >
                MindFul Events
              </p>
            </center>
          </div>
        ) : (
          <center>
            <HomeOutlined
              style={{ color: "white", marginTop: "50px", cursor: "pointer" }}
            />
          </center>
        )}

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        {collapsed === false ? (
          <center>
            <Button icon={<LogoutOutlined />} onClick={logoutHandler}>
              Sign Out
            </Button>
          </center>
        ) : (
          <center>
            <LogoutOutlined
              style={{ color: "white" }}
              onClick={logoutHandler}
            />
          </center>
        )}
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, textAlign: "center" }}
        >
          <h1 id="header" style={{ fontFamily: "serif", fontSize: "20px" }}>
            Events
          </h1>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>{greet}</Breadcrumb.Item>
            <Breadcrumb.Item>
              <span>{localStorage.getItem("username")}</span>
            </Breadcrumb.Item>
          </Breadcrumb>
          <Events />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Copyright © {date.getFullYear()} MindFul Events
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
