import React, { useContext } from "react";
import "./TopBar.scss";
import { UserOutlined } from "@ant-design/icons";
import { useCookies } from "react-cookie";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
const TopBar = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["jwt-token"]);
  const navigate = useNavigate();

  const Logout = () => {
    setCookie("jwt_token", "none", {
      path: "/",
      sameSite: true,
    });
    navigate("/login");
  };

  return (
    <div className="top-bar">
      <div className="user-button">
        <UserOutlined />
        {cookies?.username}
      </div>
      <Button onClick={Logout}>Log Out</Button>
    </div>
  );
};

export default TopBar;
