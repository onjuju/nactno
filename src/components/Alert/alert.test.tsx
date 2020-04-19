import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Alert, { AlertProps } from "./index";

const testId = "alert-wrapper";
describe("test Alert Component base", () => {
  it("should render alert", () => {
    const wrapper = render(<Alert content="123" />);
    const ele = wrapper.getByTestId(testId);
    expect(ele).toBeInTheDocument();
  });
  it("should render props correctly", () => {
    const props = {
      content: "内容",
      title: "标题",
    };
    render(<Alert {...props} />);
    const ele = screen.getByTestId(testId);
    const titleEle = ele.getElementsByClassName("nact-alert-title");
    const contentEle = ele.getElementsByClassName("nact-alert-content");
    const closeEle = ele.getElementsByClassName("nact-alert-close-icon")[0];
    expect(titleEle.item(0)).toContainHTML(props.title);
    expect(contentEle.item(0)).toContainHTML(props.content);
    expect(closeEle).toBeFalsy();
  });
  it("should show close when closable and close alert on close icon clicked", () => {
    jest.useFakeTimers();
    const props: AlertProps = {
      closable: true,
      afterClose: jest.fn(),
      onClose: jest.fn(),
    };
    render(<Alert {...props} />);
    const ele = screen.getByTestId(testId);
    const closeEle = ele.getElementsByClassName("nact-alert-close-icon")[0];
    expect(closeEle).toBeTruthy();

    fireEvent.click(closeEle);
    expect(props.onClose).toBeCalledTimes(1);
    jest.runOnlyPendingTimers();
    expect(props.afterClose).toBeCalledTimes(1);
    expect(screen.queryByTestId(testId)).toBeFalsy();
  });
  it("should render close test current", () => {
    const closeText = Math.random() + "";
    render(<Alert closable closeText={closeText} />);
    const ele = screen.getByTestId(testId);
    const closeEle = ele.getElementsByClassName("nact-alert-close-icon")[0];
    expect(closeEle).toContainHTML(closeText);
  });
});
