import React, { useContext } from "react";
import classnames from "classnames";
import { TabsContext } from "./index";

export interface TabItemProps {
  label: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  index?: number;
}

const TabItem: React.FC<TabItemProps> = (props) => {
  const { label, disabled, className, style, index } = props;
  const context = useContext(TabsContext);
  const { onSelect, active } = context;
  const classes = classnames(
    "nact-tabs-item",
    {
      active: active === index,
      disabled,
    },
    className
  );

  const handleClick = () => {
    !disabled && onSelect && onSelect(index!);
  };

  return (
    <li className={classes} style={{ ...style }} onClick={handleClick}>
      {label}
    </li>
  );
};

TabItem.defaultProps = {
  disabled: false,
};
TabItem.displayName = "TabItem";

export default TabItem;
