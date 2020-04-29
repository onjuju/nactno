import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import Select from "./index";

const SimpleSelect = () => {
  return <Select></Select>;
};

storiesOf("Select Component", module).add("Select", SimpleSelect);
