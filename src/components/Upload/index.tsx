import React, { FC, useRef, useState, ChangeEvent } from "react";
import UploadList from "./UploadList";
import Dragger from "./Dragger";
import axios from "axios";

export type UploadFileStatus = "ready" | "uploading" | "success" | "error";
export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: UploadFileStatus;
  percent?: number;
  raw?: File;
  response?: any;
  error?: any;
}

export interface UploadProps {
  action: string;
  defaultFileList?: UploadFile[];
  onProgress?: (percentage: number, file: UploadFile) => void;
  /** @param data 服务器返回对象 */
  onSuccess?: (data: any, file: UploadFile) => void;
  onError?: (err: any, file: UploadFile) => void;
  beforeUpload?: (file: File) => boolean | Promise<File>;
  onChange?: (file: UploadFile) => void;
  onRemove?: (file: UploadFile) => void;
  /** 请求的header */
  headers?: { [key: string]: any };
  /** 文件参数的name */
  name?: string;
  /** 请求携带的参数 */
  data?: { [key: string]: any };
  /** 请求是否携带cookie */
  withCredentials?: boolean;
  accept?: string;
  multiple?: boolean;
  /** 是否开启拖动上传 */
  drag?: boolean;
}

const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    defaultFileList = [],
    onRemove,
    onProgress,
    onSuccess,
    onError,
    beforeUpload,
    onChange,
    headers,
    name,
    data,
    withCredentials,
    accept,
    multiple,
    children,
    drag,
  } = props;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList);

  // 更新某个file
  const updateFileList = (
    updateFile: UploadFile,
    updateObj: Partial<UploadFile>
  ) => {
    setFileList((prevList) => {
      return prevList.map((file) => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj };
        } else {
          return { ...file };
        }
      });
    });
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    uploadFiles(files);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemove = (file: UploadFile) => {
    // console.log("remove: ", file);
    setFileList((prevList) => prevList.filter((item) => item.uid !== file.uid));
    if (onRemove) {
      onRemove(file);
    }
  };

  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files);
    postFiles.forEach((file) => {
      if (!beforeUpload) {
        post(file);
      } else {
        const result = beforeUpload(file);
        if (result && result instanceof Promise) {
          result.then((processedFile) => post(processedFile));
        } else if (result !== false) {
          post(file);
        }
      }
    });
  };

  const post = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + "upload-file",
      status: "uploading",
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    };
    setFileList((prevList) => [_file, ...prevList]);
    const formData = new FormData();
    formData.append(name || "file", file);
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    }
    axios
      .post(action, formData, {
        withCredentials,
        headers: {
          "Content-Type": "multipart/form-data",
          ...headers,
        },
        onUploadProgress: (e) => {
          console.log("uploading event: ", e);
          let percentage = Math.round((e.loaded * 100) / e.total) || 0;
          if (percentage < 100) {
            updateFileList(_file, { percent: percentage, status: "uploading" });
            setFileList((prevList) => {
              return prevList;
            });
            if (onProgress) {
              onProgress(percentage, _file);
            }
          }
        },
      })
      .then((res) => {
        updateFileList(_file, {
          status: "success",
          percent: 100,
          response: res.data,
        });
        _file.status = "success";
        _file.percent = 100;
        if (onSuccess) {
          onSuccess(res.data, _file);
        }
        if (onChange) {
          onChange(_file);
        }
      })
      .catch((err) => {
        console.log("error: ", err);
        updateFileList(_file, {
          status: "error",
          error: err,
        });
        if (onError) {
          onError(err, _file);
        }
        if (onChange) {
          onChange(_file);
        }
      });
  };

  
  return (
    <div className="nact-upload">
      <div className="nact-upload-input" onClick={handleClick}>
        {drag ? <Dragger onFile={files => uploadFiles(files)}>{children}</Dragger> : children}
      </div>

      <input
        className="nact-file-input"
        ref={fileInputRef}
        style={{ display: "none" }}
        type="file"
        onChange={handleFileChange}
        accept={accept}
        multiple={multiple}
        data-testid="test-upload"
      />
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  );
};

Upload.defaultProps = {
  name: "file",
};

export default Upload;
