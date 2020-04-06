import React from "react";
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
} from "@testing-library/react";
import Menu, { MenuProps } from "./index";
import MenuItem, { MenuItemProps } from "./MenuItem";

const testMenuProps: MenuProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: "test-menu",
};
const testVerticalProps: MenuProps = {
  defaultIndex: 0,
  mode: "vertical",
};
const createTestMenuByProps = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>

      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>xyz</MenuItem>
    </Menu>
  );
};

describe("test Menu and MenuItem Component", () => {
  let wrapper: RenderResult,
    menuElement: HTMLElement,
    activeElement: HTMLElement,
    disabledElement: HTMLElement;
  // 每个测试开始之前运行
  beforeEach(() => {
    wrapper = render(createTestMenuByProps(testMenuProps));
    menuElement = wrapper.getByTestId("test-menu");
    activeElement = wrapper.getByText("active");
    disabledElement = wrapper.getByText("disabled");
  });
  it("should render correct Menu and MenuItem base on default props", () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass("nact-menu test-menu");
    expect(menuElement.getElementsByTagName("li").length).toEqual(3);
    expect(activeElement).toHaveClass("nact-menu-item active");
    expect(disabledElement).toHaveClass("nact-menu-item disabled");
  });
  it("should change active and run callback on click item", () => {
    const thirdItem = wrapper.getByText("xyz");
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass("active");
    expect(activeElement).not.toHaveClass("active");
    expect(testMenuProps.onSelect).toHaveBeenCalledWith(2);
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
});
