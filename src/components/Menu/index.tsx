import React, {
  useContext,
  useState,
  createContext,
  useCallback,
  Children,
} from "react";
import classnames from "classnames";
import MenuItem, { MenuItemProps } from "./MenuItem";

type MenuMode = "horizontal" | "vertical";
type SelectCallBack = (index: number) => void;
export interface MenuProps {
  defaultIndex?: number; // selected item index
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallBack;
}

interface IMenuContext {
  index: number;
  onSelect?: SelectCallBack;
}

interface IMenu extends React.FC<MenuProps> {
  Item: React.FC<MenuItemProps>;
}

export const MenuContext = createContext<IMenuContext>({ index: 0 });

const Menu: IMenu = (props) => {
  const { defaultIndex, className, mode, style, onSelect, children } = props;
  const [currentActive, setCurrentActive] = useState(defaultIndex);
  const classes = classnames("nact-menu", className, {
    "menu-vertical": mode === "vertical",
  });
  const handleSelect = useCallback(
    (index) => {
      setCurrentActive(index);
      onSelect && onSelect(index);
    },
    [onSelect]
  );
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : 0,
    onSelect: handleSelect,
  };

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<
        MenuItemProps
      >;
      try {
        const { displayName } = childElement.type;
        if (displayName === "MenuItem") {
          return React.cloneElement(childElement, { index });
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

Menu.defaultProps = {
  defaultIndex: 0,
  mode: "horizontal",
};

export default Menu;
