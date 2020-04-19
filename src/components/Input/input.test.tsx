import React from "react";
import Input, { InputProps } from "./index";
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
  wait,
} from "@testing-library/react";

const empty = {};

const valueProps = {
  onChange: jest.fn(),
};
const disabledProps = {
  onChange: jest.fn(),
  disabled: true,
};

const createInputByProps = (props: InputProps) => {
  return <Input {...props} />;
};

describe("test Input Component base", () => {
  let wrapper: RenderResult, inputElement: HTMLInputElement;

  beforeEach(() => {
    wrapper = render(createInputByProps(empty));
    inputElement = wrapper.getByTestId("test-input") as HTMLInputElement;
  });

  it("should render the correct default Input", () => {
    expect(inputElement).toBeTruthy();
  });
  it("should received value on typing", () => {
    const value = "xxx";
    cleanup();
    wrapper = render(createInputByProps(valueProps));
    inputElement = wrapper.getByTestId("test-input") as HTMLInputElement;
    expect(inputElement).toBeInTheDocument();
    fireEvent.change(inputElement, { target: { value } });
    expect(valueProps.onChange).toHaveBeenCalled();
    expect(inputElement.value).toEqual(value);
  });
  it("should not received value on Input disabled", () => {
    cleanup();
    wrapper = render(createInputByProps(disabledProps));
    inputElement = wrapper.getByTestId("test-input") as HTMLInputElement;
    expect(inputElement).toHaveAttribute("disabled");
  });
  it("should render correct size classnames", () => {
    cleanup();
    wrapper = render(
      createInputByProps({
        size: "lg",
      })
    );
    inputElement = wrapper.getByTestId("test-input") as HTMLInputElement;
    expect(inputElement.parentElement).toHaveClass("input-lg");
  });
  it("should render prepand & append node", () => {
    cleanup();
    wrapper = render(
      createInputByProps({
        append: "http:",
        prepand: ".com",
      })
    );
    expect(wrapper.queryByText("http:")).toBeInTheDocument();
    expect(wrapper.queryByText(".com")).toBeInTheDocument();
  });
});
