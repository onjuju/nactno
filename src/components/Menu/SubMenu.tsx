import React, {
  useState,
  createContext,
  useCallback,
  useContext,
  FunctionComponentElement,
} from "react";
import classnames from "classnames";
import { MenuContext } from "./index";
import { MenuItemProps } from "./MenuItem";

export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
}

const SubMenu: React.FC<SubMenuProps> = ({
  index,
  title,
  className,
  children,
}) => {
  const context = useContext(MenuContext);
  const openedSubMenus = context.defaultOpenSubMenus as string[];
  const isOpen =
    openedSubMenus.includes(index as string) && context.mode === "vertical";
  const [menuOpen, setMenuOpen] = useState(isOpen);

  const classes = classnames("nact-menu-item submenu-item", className, {
    active: context.index === index,
  });

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen((open) => !open);
  };
  // toggle: on / off
  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setMenuOpen(toggle);
    }, 300);
  };

  const clickEvent =
    context.mode === "vertical"
      ? {
          onClick: handleClick,
        }
      : {};
  // 横向
  const hoverEvents =
    context.mode !== "vertical"
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true);
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false);
          },
        }
      : {};

  const renderChildren = () => {
    const subMenuClasses = classnames("nact-submenu", { open: menuOpen });
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      try {
        if (childElement.type.displayName === "MenuItem") {
          return React.cloneElement(childElement, {
            index: `${index}-${i}`,
          });
        } else {
          console.error(`Warning: Menu's child must be MenuItem Component`);
          return null;
        }
      } catch (e) {
        console.error(`Warning: Menu's child must be MenuItem Component`);
        return null;
      }
    });
    return <ul className={subMenuClasses}>{childrenComponent}</ul>;
  };

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvent}>
        {title}
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = "SubMenu";

export default SubMenu;
