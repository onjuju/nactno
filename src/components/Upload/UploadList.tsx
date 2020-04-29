import React, { FC } from "react";
import { UploadFile } from "./index";
import Icon from "../Icon";
import Progress from "../Progress";

interface UploadListProps {
  fileList: UploadFile[];
  onRemove: (_file: UploadFile) => void;
}

export const UploadList: FC<UploadListProps> = (props) => {
  const { fileList, onRemove } = props;

  return (
    <ul className="nact-upload-list">
      {fileList.map((item) => {
        const { status } = item;
        return (
          <li className="nact-upload-list-item" key={item.uid}>
            <span className={`file-name file-name-${status}`}>
              <Icon icon="file-alt" theme="secondary" />
              {item.name}
            </span>
            <span className="file-status">
              {item.status === "uploading" && (
                <Icon icon="spinner" spin theme="primary" />
              )}
              {item.status === "success" && (
                <Icon icon="check-circle" theme="success" />
              )}
              {item.status === "error" && (
                <Icon icon="times-circle" theme="danger" />
              )}
            </span>
            <span className="file-actions">
              <Icon icon="times" theme="dark" onClick={() => onRemove(item)} />
            </span>
            {item.status === "uploading" && <Progress percent={item.percent || 0} />}
          </li>
        );
      })}
    </ul>
  );
};

export default UploadList;
