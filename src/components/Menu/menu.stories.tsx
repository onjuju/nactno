import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withInfo } from "@storybook/addon-info";

import Menu from "./index";

const defaultMenu = () => (
  <Menu>
    <Menu.Item>item1</Menu.Item>
    <Menu.Item disabled>item2</Menu.Item>
    <Menu.Item>item3</Menu.Item>
  </Menu>
);

storiesOf("Menu Component", module)
  .add("Menu", defaultMenu)
