/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Menu, Icon, Badge } from "antd";
import axios from "axios";
import { USER_SERVER } from "../../../Config";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import notify from "../../../utils/toastify";

function RightMenu(props) {
  const [cookies, setCookie, removeCookie] = useCookies(["w_auth"]);
  const user = useSelector((state) => state.user);

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        removeCookie("w_auth");
        props.history.push("/login");
      } else {
        notify("error", "Log Out Failed");
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">
            <Icon type="login" />
            Signin
          </a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">
            <Icon type="form" />
            Signup
          </a>
        </Menu.Item>
      </Menu>
    );
  } else if (user.userData && user.userData.isAdmin && user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="upload">
          <a href="/product/upload">Upload</a>
        </Menu.Item>

        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="history">
          <a href="/history">
            <Icon type="history" />
            History
          </a>
        </Menu.Item>

        <Menu.Item key="cart">
          <a href="/user/cart">
            <Badge count={user.userData && user.userData.cart.length}>
              <Icon type="shopping-cart" style={{ fontSize: 20 }} />
            </Badge>
            Cart
          </a>
        </Menu.Item>

        <Menu.Item key="logout">
          <a onClick={logoutHandler}>
            <Icon type="logout" />
            Logout
          </a>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(RightMenu);
