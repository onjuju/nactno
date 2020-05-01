import React from "react";
import {
  render,
  RenderResult,
  fireEvent,
  wait,
  createEvent,
} from "@testing-library/react";
import axios from "axios";
import Upload, { UploadProps } from "./index";

jest.mock("../Icon", () => {
  return (obj: any) => {
    return <span onClick={obj.onClick}>{obj.icon}</span>;
  };
});
jest.mock("axios");

const mockAxios = axios as jest.Mocked<typeof axios>;

let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement;
const testFile = new File(["xxx", "nnn"], "test.png", {
  type: "image/png",
});

const testProps: UploadProps = {
  action: "/fakeurl.com",
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  onRemove: jest.fn(),
  drag: true,
};

describe("test Upload Component", () => {
  beforeEach(() => {
    wrapper = render(<Upload {...testProps}>Click to upload</Upload>);
    fileInput = wrapper.getByTestId("test-upload") as HTMLInputElement;
    uploadArea = wrapper.getByText("Click to upload");
  });

  it("upload process should works fine", async () => {
    const { queryByText } = wrapper;
    // mockAxios.post.mockImplementation(() => {
    //   return Promise.resolve({
    //     data: "success",
    //   });
    // });
    mockAxios.post.mockResolvedValue({ data: "success" });
    expect(uploadArea).toBeInTheDocument();
    expect(fileInput).not.toBeVisible();
    fireEvent.change(fileInput, {
      target: {
        files: [testFile],
      },
    });
    expect(queryByText("spinner")).toBeInTheDocument();
    await wait(() => {
      expect(queryByText("test.png")).toBeInTheDocument();
    });
    expect(queryByText("check-circle")).toBeInTheDocument();
    expect(testProps.onSuccess).toHaveBeenCalledWith(
      "success",
      expect.objectContaining({
        name: "test.png",
        raw: testFile,
      })
    );

    expect(testProps.onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "test.png",
        raw: testFile,
        status: "success",
      })
    );
    // const closeIcon = wrapper.getByText("times");
    // expect(queryByText("test.png")).toBeInTheDocument();
    // fireEvent.click(closeIcon);
    // expect(queryByText("test.png")).not.toBeInTheDocument();

    // click to remove
    expect(queryByText("times")).toBeInTheDocument();
    fireEvent.click(queryByText("times")!);
    expect(queryByText("test.png")).not.toBeInTheDocument();
    expect(testProps.onRemove).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "test.png",
        raw: testFile,
      })
    );
  });

  it("drag and drop files should works fine", async () => {
    fireEvent.dragOver(uploadArea);
    expect(uploadArea).toHaveClass("is-dragover");
    fireEvent.dragLeave(uploadArea);
    expect(uploadArea).not.toHaveClass("is-dragover");
    const mockDropEvent = createEvent.drop(uploadArea);
    Object.defineProperty(mockDropEvent, "dataTransfer", {
      value: {
        files: [testFile],
      },
    });
    fireEvent(uploadArea, mockDropEvent);
    // fireEvent.drop(uploadArea, { dataTransfer: { files: [testFile] } });
    await wait(() => {
      expect(wrapper.queryByText("test.png")).toBeInTheDocument();
      expect(testProps.onSuccess).toHaveBeenCalledWith(
        "success",
        expect.objectContaining({
          name: "test.png",
          raw: testFile,
        })
      );

      expect(testProps.onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "test.png",
          raw: testFile,
          status: "success",
        })
      );
    });
  });
});
