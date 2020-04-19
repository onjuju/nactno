import React from "react";
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
  wait,
} from "@testing-library/react";
import Menu, { MenuProps } from "./index";

const testMenuProps: MenuProps = {
  defaultIndex: "0",
  onSelect: jest.fn(),
  className: "test-menu",
};
const testVerticalProps: MenuProps = {
  defaultIndex: "0",
  mode: "vertical",
  // defaultOpenSubMenus: [],
};
const createTestMenuByProps = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <Menu.Item>active</Menu.Item>

      <Menu.Item disabled>disabled</Menu.Item>
      <Menu.Item>xyz</Menu.Item>
      <Menu.SubMenu title="dropdown">
        <Menu.Item>drop1</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};

const createStyleFile = () => {
  const cssFile: string = `
    .nact-submenu {
      display: none;
    }
    .nact-submenu.open {
      display: block;
    }
  `;
  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = cssFile;
  return style;
};

describe("test Menu and MenuItem Component", () => {
  let wrapper: RenderResult,
    menuElement: HTMLElement,
    activeElement: HTMLElement,
    disabledElement: HTMLElement;
  // 每个测试开始之前运行
  beforeEach(() => {
    wrapper = render(createTestMenuByProps(testMenuProps));
    // append css
    wrapper.container.append(createStyleFile());
    menuElement = wrapper.getByTestId("test-menu");
    activeElement = wrapper.getByText("active");
    disabledElement = wrapper.getByText("disabled");
  });
  it("should render correct Menu and MenuItem base on default props", () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass("nact-menu test-menu");
    expect(menuElement.querySelectorAll(":scope > li").length).toBe(4);
    expect(activeElement).toHaveClass("nact-menu-item active");
    expect(disabledElement).toHaveClass("nact-menu-item disabled");
  });
  it("should change active and run callback on click item", () => {
    const thirdItem = wrapper.getByText("xyz");
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass("active");
    expect(activeElement).not.toHaveClass("active");
    expect(testMenuProps.onSelect).toHaveBeenCalledWith("2");
    fireEvent.click(disabledElement);
    expect(testMenuProps.onSelect).toHaveBeenCalledTimes(1);
    expect(disabledElement).not.toHaveClass("active");
  });
  it("should render vertical class when mode is set to vertical", () => {
    cleanup();
    const wrapper = render(createTestMenuByProps(testVerticalProps));
    const menuElement = wrapper.getByTestId("test-menu");
    expect(menuElement).toHaveClass("menu-vertical");
  });
  it("should show dropdown items when mouse hover on SubMenu", async () => {
    expect(wrapper.queryByText("drop1")).toBeFalsy();
    const dropdownEle = wrapper.getByText("dropdown");
    fireEvent.mouseEnter(dropdownEle);

    await wait(() => {
      expect(wrapper.queryByText("drop1")).toBeVisible();
    });
    fireEvent.click(wrapper.getByText("drop1"));
    expect(testMenuProps.onSelect).toHaveBeenCalledWith("3-0");

    fireEvent.mouseLeave(dropdownEle);
    await wait(() => {
      expect(wrapper.getByText("drop1")).not.toBeVisible();
    });
  });

  it("should open submenu when click item on vertical mode", () => {
    cleanup();
    const wrapper = render(createTestMenuByProps(testVerticalProps));
    wrapper.container.append(createStyleFile());
    expect(wrapper.queryByText("drop1")).toBeFalsy();
    fireEvent.click(wrapper.getByText("dropdown"));
    expect(wrapper.queryByText("drop1")).toBeVisible();
  });

  it("should open when defaultOpenSubMenus is passed", () => {
    cleanup();
    const wrapper = render(
      createTestMenuByProps({
        defaultIndex: "0",
        mode: "vertical",
        defaultOpenSubMenus: ["3"],
      })
    );
    wrapper.container.append(createStyleFile());
    expect(wrapper.queryByText("drop1")).toBeVisible();
    fireEvent.click(wrapper.getByText("dropdown"));
    expect(wrapper.queryByText("drop1")).not.toBeVisible();
  });
});
