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
import "./Register.scss";
import "antd/dist/antd.css";
import Logo from "../assets/mindful logo.png";
import LoginLogo from "../assets/image.jpg";

import { LoginOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import PasswordResetRequest from "../Dashboard/DashboardSubComponents/PasswordResetRequest";

const { Header } = Layout;

const Login = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [available, setAvailable] = useState("");
  const [loading, setLoading] = useState(false); //additional
  const [isError, setIsError] = useState(false);

  const history = useNavigate();

  const registerHandler = async (e) => {
    //handler method for login

    setLoading(true);
    setIsError(false); //additional

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      //method for cheking the password an confirm password
      setPassword("");
      setConfirmPassword("");
      setLoading(false);
      setIsError(true);
      setTimeout(() => {
        setError("");
      }, 5000);

      return setError("Password did not match");
    }

    try {
      const { data } = await axios.post(
        "/api/auth/register",
        { userName, password, email },
        config
      );

      localStorage.setItem("authToken", data.token); //set the browser caching or local storage for globally accessed anywhere in the application
      localStorage.setItem("username", data.username);
      localStorage.setItem("email", data.email);

      setTimeout(() => {
        // set a 5seconds timeout for authentication
        setLoading(false);
        history("/");
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
    //show password method when checkbox is enabled
    var x = document.getElementById("password");
    var y = document.getElementById("password1");
    if (x.type === "password" && y.type === "password") {
      x.type = "text";
      y.type = "text";
    } else {
      x.type = "password";
      y.type = "password";
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
              <div className="text-block">Create your account today! 😃</div>
              <Form onFinish={registerHandler}>
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
                <label>Email</label>
                <Input
                  label={"Email"}
                  name={"email"}
                  fieldType={"email"}
                  size={"large"}
                  type="email"
                  placeholder="type your email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                <br />
                &nbsp;
                <label>Re-Enter Password</label>
                <Input
                  label={"PASSWORD"}
                  name={"password"}
                  fieldType={"password"}
                  size={"large"}
                  type="password"
                  placeholder="type your password"
                  id="password1"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Checkbox onClick={() => showPassword("Y")}>
                  Show Password
                </Checkbox>
                <br />
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
                        className="submit-btn"
                        htmlType="submit"
                        type={"primary"}
                        disabled={loading}
                        icon={<Spin />}
                      >
                        &nbsp;Registration in Progress...
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
                        Register
                      </Button>
                    )}
                    <br />
                    <Link to={"/"}>
                      <a className="forget-text">Already have an Account?</a>
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
