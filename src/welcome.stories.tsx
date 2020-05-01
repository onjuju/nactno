import React from "react";
import { storiesOf } from "@storybook/react";

storiesOf("Welcome page", module).add(
  "Welcome",
  () => {
    return (
      <div>
        <h2>nactno 组件库</h2>
        <p>多个 React UI 组件</p>
        <h3>安装: </h3>
        <code>npm install nactno --save</code>
      </div>
    );
  },
  {
    info: { disable: true },
  }
);
