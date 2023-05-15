import React, { useState } from "react";
import "./Register.scss";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { getAPIUrl } from "../../Utilities/UtilityFunctions";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [errorText, setErrorText] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const res = await axios.post(getAPIUrl() + "/register", {
        username: values.username,
        password: values.password,
      });

      navigate("/login");
    } catch (err) {
      console.log(err);
      setErrorText(err.response?.data?.message);
    }
  };

  return (
    <div className="register-page">
      <div className="center-box">
        <Form
          name="normal_register"
          className="register-form"
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
            rules={[
              { required: true, message: "Please input your Password!" },
              {
                min: 8,
                message: "Must be at least 8 characters",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Confirm Password"
            />
          </Form.Item>
          <Form.Item
            name="confirm"
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <span className="register-error"> {errorText}</span>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="register-form-button"
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
