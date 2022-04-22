import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Layout,
  Divider,
  Checkbox,
  Spin,
} from "antd";
import "./Login.scss";
import "antd/dist/antd.css";
import Logo from "../assets/mindful logo.png";
import LoginLogo from "../assets/Events.jpg";

import { LoginOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import PasswordResetRequest from "../Dashboard/DashboardSubComponents/PasswordResetRequest";

const { Header } = Layout;

const Login = () => {
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const [available, setAvailable] = useState("");
  const [loading, setLoading] = useState(false); //additional
  const [isError, setIsError] = useState(false);

  const history = useNavigate();

  //   useEffect(() => {
  //     if (localStorage.getItem("authToken")) {
  //       //push a user if he already logged in
  //       if (
  //         window.confirm(
  //           "You are already logged in ! Are you sure you want to proceed?"
  //         )
  //       ) {
  //         history(`/dashboard/${localStorage.getItem("username")}`); // if true navigate to the dashboard
  //         window.location.reload();
  //       } else {
  //         if (window.confirm("Do you need to signout ?")) {
  //           //if true clear the brower caching and signout
  //           localStorage.removeItem("authToken");
  //           localStorage.removeItem("username");
  //           localStorage.removeItem("email");
  //           history("/login");
  //           alert("You are successfully signed out");
  //         } else {
  //           history(`/dashboard/${localStorage.getItem("username")}`); //else redirect to the dashboard
  //           window.location.reload();
  //         }
  //       }
  //     }
  //   }, []);

  const loginHandler = async (e) => {
    //handler method for login

    setLoading(true);
    setIsError(false); //additional

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/login",
        { userName, password },
        config
      );

      localStorage.setItem("authToken", data.token); //set the browser caching or local storage for globally accessed anywhere in the application
      localStorage.setItem("username", data.username);
      //   localStorage.setItem("type", data?.type);
      //   localStorage.setItem("id", data?.empId);
      //   localStorage.setItem("initials", data?.nameWithInitials);

      setTimeout(() => {
        // set a 5seconds timeout for authentication
        setLoading(false);
        history(`/events/${localStorage.getItem("username")}`);
        window.location.reload();
      }, 5000);
    } catch (error) {
      setError(error.response.data.error);
      setAvailable(error.response.data.available);
      setLoading(false);
      setIsError(true);
      setTimeout(() => {
        setError("");
        setAvailable("");
      }, 5000); //5s
    }
  };

  const showPassword = () => {
    //show password method when check box is enabled
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  return (
    <>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, textAlign: "center" }}
        >
          <center>
            <img src={Logo} alt="logo" style={{ maxWidth: "100px" }} />
            <h1 id="header" style={{ fontFamily: "serif", fontSize: "50px" }}>
              MindFul{" "}
            </h1>

            <Divider />
          </center>
        </Header>
      </Layout>

      <div className="login-page">
        <Row>
          <Col className="left-side" xl={15} lg={15} md={24} sm={24}>
            <div className="left-side-inner-wrap">
              <div className="title">MindFul Events</div>
              <center>
                {error && (
                  <span style={{ color: "white", background: "orange" }}>
                    {error}
                  </span>
                )}
                {available && (
                  <span style={{ color: "white", background: "red" }}>
                    {available}
                  </span>
                )}
              </center>
              <div className="text-block">
                Log in to your account if you already have an account! 😊
              </div>
              <Form onFinish={loginHandler}>
                <label>Username</label>
                <Input
                  label={"USERNAME"}
                  name={"userName"}
                  fieldType={"username"}
                  size={"large"}
                  placeholder={"e.g John Doe"}
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <label>Password</label>
                <Input
                  label={"PASSWORD"}
                  name={"password"}
                  fieldType={"password"}
                  size={"large"}
                  type="password"
                  placeholder="type your password"
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Checkbox onClick={showPassword}>Show Password</Checkbox>
                <br /> <br />
                {/* <a className="forget-text">Forgot password?</a> */}
                {/* <PasswordResetRequest /> */}
                <div className="btn-wrap">
                  <center>
                    {isError && (
                      <small style={{ color: "red" }}>
                        Something went wrong. Please try again later.
                      </small>
                    )}
                    {loading ? (
                      <Button
                        label={"SUBMIT"}
                        className="submit-btn1"
                        htmlType="submit"
                        type={"primary"}
                        disabled={loading}
                        icon={<Spin />}
                      >
                        &nbsp;Authenticating...
                      </Button>
                    ) : (
                      <Button
                        label={"SUBMIT"}
                        className="submit-btn"
                        htmlType="submit"
                        type={"primary"}
                        icon={<LoginOutlined />}
                        disabled={loading}
                      >
                        Login
                      </Button>
                    )}
                    <Link to={"/register"}>
                      <a className="forget-text">Create your Account if you haven't?</a>
                    </Link>
                  </center>
                </div>
              </Form>
            </div>
          </Col>
          <Col className="right-side" xl={9} lg={9} md={0} sm={0}>
            {window.innerWidth > 900 && (
              <div
                className="background-img-container"
                style={{ backgroundImage: `url(${LoginLogo})` }}
              />
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Login;
