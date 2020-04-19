import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  RenderResult,
} from "@testing-library/react";
import Tabs, { TabsProps } from "./index";

const defaultProps: TabsProps = {
  onSelect: jest.fn(),
  className: "test-tab",
};
const cardProps: TabsProps = {
  mode: "card",
  onSelect: jest.fn(),
  defaultIndex: 3,
};

const createTabsByProps = (props: TabsProps) => {
  return (
    <Tabs {...props}>
      <Tabs.TabItem label="tab1">content1</Tabs.TabItem>
      <Tabs.TabItem label="tab2" disabled>
        disabled
      </Tabs.TabItem>
      <Tabs.TabItem label="tab3">content3</Tabs.TabItem>
    </Tabs>
  );
};

describe("test Tabs and TabItem Component", () => {
  let wrapper: RenderResult,
    tabsElement: HTMLElement,
    activeElement: HTMLElement;

  beforeEach(() => {
    wrapper = render(createTabsByProps(defaultProps));
    tabsElement = wrapper.getByTestId("test-tabs");
    activeElement = wrapper.getByText("content1");
  });

  it("should render default mode Tabs and TabItem on not sending mode props", () => {
    expect(tabsElement).toHaveClass("nact-tabs nact-tabs-default");
    expect(wrapper.getByText("content1")).toBeVisible();
    const disabledElement = wrapper.queryByText("disabled");
    expect(disabledElement).toBeFalsy();
  });

  it("should render content correctly when click its item", () => {
    const thridTabItemEle = wrapper.getByText("tab3");
    expect(wrapper.queryByText("content3")).toBeNull();

    fireEvent.click(thridTabItemEle);
    expect(wrapper.queryByText("content3")).toBeVisible();
  });

  it("should change nothing when click disabled item", () => {
    const disabledTabItem = wrapper.getByText("tab2");
    expect(wrapper.queryByText("content1")).toBeVisible();
    expect(wrapper.queryByText("disabled")).toBeNull();
    fireEvent.click(disabledTabItem);
    expect(wrapper.queryByText("disabled")).toBeNull();
    expect(wrapper.queryByText("content1")).toBeTruthy();

    fireEvent.click(wrapper.getByText("tab3"));
    expect(wrapper.queryByText("content3")).toBeVisible();
    expect(wrapper.queryByText("content1")).toBeNull();
  });

  // card mode
  it("should not render default className on sending card mode", () => {
    cleanup();
    wrapper = render(createTabsByProps(cardProps));
    tabsElement = wrapper.getByTestId("test-tabs");
    expect(tabsElement).toHaveClass("nact-tabs nact-tabs-card");
    expect(tabsElement).not.toHaveClass("nact-tabs-default");
  });
});
