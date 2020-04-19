import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button, { ButtonProps } from "./button";

const clickProps = {
  onClick: jest.fn(),
};
const testProps: ButtonProps = {
  btnType: "primary",
  size: "sm",
  className: "ibtn",
};

describe("test Button Component base", () => {
  it("should render the correct default button", () => {
    const wrapper = render(
      <Button className="mybtn" {...clickProps}>
        test
      </Button>
    );
    const ele = wrapper.getByText("test");
    expect(ele).toBeInTheDocument();
    expect(ele.tagName).toMatch(/button/i);
    expect(ele).toHaveClass("mybtn");
    fireEvent.click(ele);
    expect(clickProps.onClick).toBeCalledTimes(1);
  });

  it("should render the correct component base on different props", () => {
    const wrapper = render(
      <Button className="mybtn" {...testProps}>
        test
      </Button>
    );
    const ele = wrapper.getByText("test");
    expect(ele).toBeInTheDocument();
    expect(ele).toHaveClass("btn-sm btn-primary ibtn");
  });

  it("shoild render a link wher btnType equals link and href is provided", () => {
    const testMsg = "testttt";
    render(
      <Button btnType="link" href="www.baidu.com">
        {testMsg}
      </Button>
    );
    expect(screen.queryByText(testMsg)).not.toBeNull();
    expect(screen.getByText(testMsg).tagName).toMatch(/^a$/i);
    expect(screen.getByText(testMsg)).toHaveAttribute("href");
  });

  const disabledProps = {
    disabled: true,
    onClick: jest.fn(),
  };
  it("show render disabled button when disabled props is true", () => {
    const testMsg = "testttt";
    render(<Button {...disabledProps}>{testMsg}</Button>);
    const ele = screen.getByText(testMsg) as HTMLButtonElement;
    fireEvent.click(ele);
    expect(ele.disabled).toBeTruthy();
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  });
});
