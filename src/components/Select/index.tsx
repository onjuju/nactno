import React, { FC, useState } from "react";
import Option, { OptionProps } from "./Option";
import Transition from "../Transition";
import Icon from "../Icon";
import { Input } from "../Input";

interface SelectProps {
  value?: any;
  onChange?: (value: any) => void;
}

interface ISelect extends React.FC<SelectProps> {
  Option: React.FC<OptionProps>;
}

const Select: ISelect = (props) => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="nact-select">
      <Input />
      <Icon icon="angle-down" className="select-angle" style={{ color: "#ced4da" }} />

      <ul className="option-list"></ul>
    </div>
  );
};

Select.Option = Option;

export default Select;
