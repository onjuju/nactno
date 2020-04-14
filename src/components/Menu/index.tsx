import React, { useState, createContext, useCallback } from "react";
import classnames from "classnames";
import MenuItem, { MenuItemProps } from "./MenuItem";
import SubMenu, { SubMenuProps } from "./SubMenu";

type MenuMode = "horizontal" | "vertical";
type SelectCallBack = (index: string) => void;
export interface MenuProps {
  defaultIndex?: string; // selected item index
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallBack;
  defaultOpenSubMenus?: string[];
}

interface IMenuContext {
  index: string;
  onSelect?: SelectCallBack;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}

interface IMenu extends React.FC<MenuProps> {
  Item: React.FC<MenuItemProps>;
  SubMenu: React.FC<SubMenuProps>;
}

export const MenuContext = createContext<IMenuContext>({ index: "0" });

const Menu: IMenu = (props) => {
  const {
    defaultIndex,
    className,
    mode,
    style,
    onSelect,
    children,
    defaultOpenSubMenus,
  } = props;
  const [currentActive, setCurrentActive] = useState(defaultIndex);
  const classes = classnames("nact-menu", className, {
    "menu-vertical": mode === "vertical",
    "menu-horizontal": mode === "horizontal",
  });
  const handleSelect = useCallback(
    (index: string) => {
      setCurrentActive(index);
      onSelect && onSelect(index);
    },
    [onSelect]
  );

  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : "0",
    onSelect: handleSelect,
    mode,
    defaultOpenSubMenus,
  };

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<
        MenuItemProps
      >;
      try {
        const { displayName } = childElement.type;
        if (displayName === "MenuItem" || displayName === "SubMenu") {
          return React.cloneElement(childElement, { index: index.toString() });
        } else {
          console.error(`Warning: Menu's child must be MenuItem Component`);
          return null;
        }
      } catch (e) {
        console.error(`Warning: Menu's child must be MenuItem Component`);
        return null;
      }
    });
  };

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.Item = MenuItem;
Menu.SubMenu = SubMenu;

Menu.defaultProps = {
  defaultIndex: "0",
  mode: "horizontal",
  defaultOpenSubMenus: [],
};

export default Menu;
