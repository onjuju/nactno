import React, {
  PropsWithChildren,
  useState,
  createContext,
  useMemo,
} from "react";
import classnames from "classnames";
import TabItem, { TabItemProps } from "./TabItem";

type TabsMode = "default" | "card";
export interface TabsProps {
  className?: string;
  onSelect?: (index: number) => void;
  defaultIndex?: number;
  mode?: TabsMode;
}

interface ITabs extends React.FC<TabsProps> {
  TabItem: React.FC<TabItemProps>;
}

interface IContext {
  active: number;
  onSelect?: (active: number) => void;
  mode: TabsMode;
}

export const TabsContext = createContext<IContext>({
  active: 0,
  mode: "default",
});

const Tabs: ITabs = (props) => {
  const { className, onSelect, defaultIndex, children, mode } = props;
  const classes = classnames("nact-tabs", `nact-tabs-${mode}`, className);

  const [active, setActive] = useState(defaultIndex);

  const passedContext = useMemo<IContext>(
    () => ({
      active: active!,
      onSelect: (active) => {
        setActive(active);
        onSelect && onSelect(active);
      },
      mode: mode!,
    }),
    [active, onSelect, mode]
  );

  const renderTabItem = () => {
    const items = React.Children.map(children, (item, index) => {
      const childElement = item as React.FunctionComponentElement<TabItemProps>;
      try {
        if (childElement.type.displayName === "TabItem") {
          return React.cloneElement(childElement, { index });
        } else {
          console.error(`1Warning: Tabs's child must be TabItem Component`);
          return null;
        }
      } catch {
        console.error(`2Warning: Tabs's child must be TabItem Component`);
        return null;
      }
    });
    return items;
  };
  const renderContent = () => {
    let renderNode = null;
    React.Children.forEach(children, (item, index) => {
      if (item && index === active) {
        renderNode = (item as React.FunctionComponentElement<
          PropsWithChildren<TabItemProps>
        >).props.children;
      }
    });
    return renderNode;
  };

  return (
    <div className={classes} data-testid="test-tabs">
      <TabsContext.Provider value={passedContext}>
        <ul>{renderTabItem()}</ul>
        <div className="nact-tabs-content">{renderContent()}</div>
      </TabsContext.Provider>
    </div>
  );
};

Tabs.defaultProps = {
  defaultIndex: 0,
  mode: "default",
};

Tabs.TabItem = TabItem;

export default Tabs;
