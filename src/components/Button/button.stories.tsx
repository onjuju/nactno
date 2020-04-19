import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Button from "./button";

const defaultButton = () => (
  <Button onClick={action("clicked")}>default button</Button>
);

const diffSizeButton = () => (
  <>
    <Button size="lg">lg button</Button>
    <Button>default button</Button>
    <Button size="sm">sm button</Button>
  </>
);

const diffTypeButton = () => (
  <>
    <Button btnType="default">default button</Button>
    <Button btnType="primary">primary button</Button>
    <Button btnType="danger">primary button</Button>
    <Button btnType="link" href={window.location.href}>
      link button
    </Button>
  </>
);

storiesOf("Button Component", module)
  .add("Button", defaultButton)
  .add("设置不同尺寸", diffSizeButton)
  .add("设置不同样式", diffTypeButton);
