import React, { useState } from "react";
import "./Login.scss";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";
import { getAPIUrl } from "../../Utilities/UtilityFunctions";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [errorText, setErrorText] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["jwt-token"]);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const res = await axios.post(getAPIUrl() + "/login", values);
      setCookie("jwt-token", res.data.token, {
        path: "/",
        sameSite: true,
      });
      navigate("/todo");
    } catch (err) {
      console.log(err);
      setErrorText(err.response?.data?.message);
    }
  };

  return (
    <div className="login-page">
      <div className="center-box">
        <Form
          name="normal_login"
          className="login-form"
          size="large"
          initialValues={{ remember: true }}
          onFinish={onSubmit}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <span className="login-error"> {errorText}</span>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
