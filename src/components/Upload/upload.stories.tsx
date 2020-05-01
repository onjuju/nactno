import React, { useState } from "react";
import { storiesOf } from "@storybook/react";

import Upload, { UploadProps, UploadFile } from "./index";
import { action } from "@storybook/addon-actions";
import Button from "../Button/button";
import Icon from "../Icon";

const defaultFileList: UploadFile[] = [
  {
    uid: "123",
    size: 1234,
    name: "hello.md",
    status: "uploading",
    percent: 40,
  },
  {
    uid: "1234",
    size: 1234,
    name: "java.md",
    status: "error",
    percent: 40,
  },
  {
    uid: "1235",
    size: 1234,
    name: "end.md",
    status: "success",
    percent: 40,
  },
];

const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 50) {
    alert("file too big");
    return false;
  }
  return true;
};
const filePromise = (file: File) => {
  const newFile = new File([file], "newname", { type: file.type });
  return Promise.resolve(newFile);
};

const SimpleUpload = () => {
  return (
    <Upload
      action="http://www.mocky.io/v2/5ea904032d0000dfcd3a423f"
      onChange={action("changed")}
      onProgress={action("progress")}
      onError={action("error")}
      onSuccess={action("success")}
      onRemove={(file) => {
        console.log(file);
        
      }}
      // defaultFileList={defaultFileList}
      name="fileName"
      data={{"key": "vvv"}}
      headers={{"X-Powered-By": "mine"}}
      accept="image/*"
      multiple
      drag
    >
      {/* <Icon icon="upload" size="5x" theme="info" /> */}
      <br />
      <Button>Drag file over here</Button>
    </Upload>
  );
};

storiesOf("Upload Component", module).add("Upload", SimpleUpload);
