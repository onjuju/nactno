import React from "react";
import { config } from "react-transition-group";
import {
  render,
  RenderResult,
  fireEvent,
  wait,
  cleanup,
} from "@testing-library/react";
import AutoComplete, { AutoCompleteProps } from "./index";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);


config.disabled = true;

const testArray = [
  { value: "ab", number: 11 },
  { value: "abc", number: 1 },
  { value: "b", number: 4 },
  { value: "c", number: 5 },
];
const testProps: AutoCompleteProps = {
  fetchSuggestions: (query) =>
    testArray.filter((item) => item.value.includes(query)),
  onSelect: jest.fn(),
  placeholder: "auto-complete",
};

let wrapper: RenderResult, inputNode: HTMLInputElement;
describe("test AutoComplete component", () => {
  beforeEach(() => {
    wrapper = render(<AutoComplete {...testProps} />);
    inputNode = wrapper.getByPlaceholderText(
      "auto-complete"
    ) as HTMLInputElement;
  });

  it("test basic AutoComplete behavior", async () => {
    fireEvent.change(inputNode, {
      target: { value: "a" },
    });
    await wait(() => {
      expect(wrapper.queryByText("ab")).toBeInTheDocument();
    });
    // have 2 item
    expect(wrapper.container.querySelectorAll(".suggestion-item").length).toBe(
      2
    );
    // click the first item
    fireEvent.click(wrapper.getByText("ab"));
    expect(testProps.onSelect).toHaveBeenCalledWith({
      value: "ab",
      number: 11,
    });
    expect(wrapper.queryByText("ab")).not.toBeInTheDocument();
    expect(inputNode.value).toBe("ab");
  });

  it("test keyboard event support", async () => {
    fireEvent.change(inputNode, {
      target: { value: "a" },
    });
    await wait(() => {
      expect(wrapper.queryByText("ab")).toBeInTheDocument();
    });
    const firstResult = wrapper.queryByText("ab");
    const secondResult = wrapper.queryByText("abc");

    // press down
    fireEvent.keyDown(inputNode, { keyCode: 40 });
    expect(firstResult).toHaveClass("is-active");
    // press down
    fireEvent.keyDown(inputNode, { keyCode: 40 });
    expect(secondResult).toHaveClass("is-active");
    expect(firstResult).not.toHaveClass("is-active");
    // press up
    fireEvent.keyDown(inputNode, { keyCode: 38 });
    expect(firstResult).toHaveClass("is-active");
    expect(secondResult).not.toHaveClass("is-active");
    // press enter
    fireEvent.keyDown(inputNode, { keyCode: 13 });
    expect(testProps.onSelect).toHaveBeenCalledWith({
      value: "ab",
      number: 11,
    });
    expect(wrapper.queryByText("ab")).not.toBeInTheDocument();
    expect(inputNode.value).toBe("ab");
  });

  it("test click outside to close dropdown", async () => {
    fireEvent.change(inputNode, {
      target: { value: "a" },
    });
    await wait(() => {
      expect(wrapper.queryByText("ab")).toBeInTheDocument();
    });
    fireEvent.click(document);
    expect(wrapper.queryByText("ab")).not.toBeInTheDocument();
  });

  it("renderOption should generate the right template", async () => {
    cleanup();
    const testProps: AutoCompleteProps = {
      renderOption: (item) => {
        return (
          <div>
            <span>testrender</span>
            {item.value}
          </div>
        );
      },
      fetchSuggestions: (query) =>
        testArray.filter((item) => item.value.includes(query)),
      onSelect: jest.fn(),
      placeholder: "auto-complete",
    };
    const wrapper = render(
      <AutoComplete {...testProps} placeholder="testinput" />
    );
    const inputNode = wrapper.getByPlaceholderText("testinput");
    fireEvent.change(inputNode, {
      target: { value: "a" },
    });
    await wait(() => {
      expect(wrapper.queryByText("ab")).toBeInTheDocument();
      expect(wrapper.queryAllByText("testrender").length).toBe(2);
    });
  });

  it("test async fetchSuggestion works", async () => {
    cleanup();
    const testProps: AutoCompleteProps = {
      renderOption: (item) => {
        return (
          <div>
            <span>testrender</span>
            {item.value}
          </div>
        );
      },
      fetchSuggestions: (query) => {
        return Promise.resolve(testArray.filter((item) => item.value.includes(query)))
      },
      onSelect: jest.fn(),
      placeholder: "auto-complete",
    };
    const wrapper = render(
      <AutoComplete {...testProps} placeholder="testinput" />
    );
    const inputNode = wrapper.getByPlaceholderText("testinput");
    fireEvent.change(inputNode, {
      target: { value: "a" },
    });
    await wait(() => {
      expect(wrapper.queryByText("ab")).toBeInTheDocument();
      expect(wrapper.queryAllByText("testrender").length).toBe(2);
    });
  });
});
