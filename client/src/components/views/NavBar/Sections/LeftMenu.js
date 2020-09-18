import React from "react";
import { Menu, Icon } from "antd";

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="mail">
        <a href="/">
          <Icon type="home" />
          Home
        </a>
      </Menu.Item>
    </Menu>
  );
}

export default LeftMenu;
