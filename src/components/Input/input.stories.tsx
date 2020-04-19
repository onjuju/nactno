import React from "react";
import { storiesOf } from "@storybook/react";

import Input from "./index";

const defaultInput = () => {
  return <Input />;
};

storiesOf("Input Component", module).add("Input", defaultInput);
