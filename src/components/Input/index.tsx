import React, { FC, InputHTMLAttributes, ReactElement } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import classnames from "classnames";
import { useState } from "@storybook/addons";
import Icon, { IconProps } from "../Icon";

type InputSize = "lg" | "sm";
//
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  value?: string;
  disabled?: boolean;
  size?: InputSize;
  icon?: IconProps;
  prepand?: string | ReactElement;
  append?: string | ReactElement;
  className?: string;
}

export const Input: FC<InputProps> = (props) => {
  const {
    value,
    disabled,
    size,
    icon,
    prepand,
    append,
    className,
    onChange,
    ...restProps
  } = props;

  const classes = classnames("nact-input", {
    [`input-${size}`]: size,
  });

  const valueProps = value !== undefined ? { value } : {};

  const inputStyle = icon
    ? { ...restProps.style, paddingRight: "20px" }
    : { ...restProps.style };

  if ("value" in props) {
    delete restProps.defaultValue;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    if (onChange && !disabled) {
      onChange(e);
    }
  };

  return (
    <div className={classes}>
      {prepand && <span>{prepand}</span>}
      <input
        disabled={disabled}
        onChange={handleChange}
        {...valueProps}
        {...restProps}
        style={inputStyle}
        data-testid="test-input"
      />
      {icon && (
        <Icon {...icon} className={classnames("input-icon", icon.className)} />
      )}
      {append && <span>{append}</span>}
    </div>
  );
};

Input.defaultProps = {
  disabled: false,
};

export default Input;
