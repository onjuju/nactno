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
    ...restProps
  } = props;

  const classes = classnames("nact-input", {
    [`input-${size}`]: size,
  });

  const valueProps = value ? { value } : {};

  const inputStyle = icon
    ? { ...restProps.style, paddingRight: "20px" }
    : { ...restProps.style };

  return (
    <div className={classes}>
      {prepand && <span>{prepand}</span>}
      <input
        disabled={disabled}
        {...valueProps}
        {...restProps}
        style={inputStyle}
      />
      {icon && (
        <Icon {...icon} className={classnames("input-icon", icon.className)} />
      )}
      {append && <span>{append}</span>}
    </div>
  );
};

export default Input;
