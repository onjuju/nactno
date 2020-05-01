import React, { useState } from "react";
import { storiesOf } from "@storybook/react";

import Input from "./index";

const ControlledInput = () => {
  const [value, setValue] = useState("");
  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="input~"
      defaultValue="321"
    />
  );
};


storiesOf("Input Component", module).add("Input", ControlledInput);
