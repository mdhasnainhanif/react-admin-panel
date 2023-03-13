import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Layout, Button, Typography, Form, Input, Switch } from "antd";
// import signinbg from "../assets/images/img-signin.jpg";
import login from "../assets/images/login.png";
import axios from "axios";
import BaseUrl from "../API/BaseUrl/BaseUrl";
import Swal from "sweetalert2";
import { TailSpin } from "react-loader-spinner";
// import {
//   DribbbleOutlined,
//   TwitterOutlined,
//   InstagramOutlined,
//   GithubOutlined,
// } from "@ant-design/icons";
function onChange(checked) {
  console.log(`switch to ${checked}`);
}
const { Title } = Typography;

const SignIn = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);

  const submit = async () => {
    setLoader(true);
    const loginData = new FormData();
    loginData.append("email", email);
    loginData.append("password", password);

    try {
      const response = await axios.post(
        `${BaseUrl.baseurl}superadmin/login`,
        loginData
      );
      setLoader(false);
      console.log(response, "response");
      localStorage.setItem("token", response?.data?.token);
      if (response?.data?.message === "SuperAdmin Successfully Login") {
        history.push("/dashbaord");
      } else {
        setLoader(false);
        Swal.fire({
          title: "Oops",
          text: "Invalid Email & Password",
          icon: "error",
          confirmButtonColor: "#40ADF4",
        });
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  return (
    <>
      <Layout className="layout-default layout-signin login-bg">
        <div className="signin container">
          <div className="row only-login">
            <div className="col-md-6">
              <Title className="mb-15">Login</Title>
              <Title className="font-regular text-muted" level={5}>
                Enter your email and password to Login
              </Title>
              <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                className="row-col"
              >
                <Form.Item
                  className="username w-75"
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                </Form.Item>

                <Form.Item
                  className="username w-75"
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                </Form.Item>

                <Form.Item
                  name="remember"
                  className="aligin-center"
                  valuePropName="checked"
                >
                  <Switch defaultChecked onChange={onChange} />
                  Remember me
                </Form.Item>

                <Form.Item>
                  <Button className="d-flex align-items-center" onClick={submit} type="primary" htmlType="submit">
                    Login &nbsp;
                    {loader ? (
                      <TailSpin
                      height="20"
                      width="20"
                      color="#fff"
                      ariaLabel="tail-spin-loading"
                      radius="1"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                    />
                    ) : null}
                  </Button>
                </Form.Item>
                <p className="font-semibold text-muted">
                  Don't have an account?&nbsp;
                  <Link to="/sign-up" className="text-dark font-bold navlink">
                    Sign Up
                  </Link>
                </p>
              </Form>
            </div>
            <png className="col-md-6">
              <img className="img-fluid mx-auto d-block" src={login} alt="" />
            </png>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default SignIn;
