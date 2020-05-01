import React, { FC, useState, DragEvent } from "react";
import classnames from "classnames";

interface DraggerProps {
  onFile: (files: FileList) => void;
}

export const Dragger: FC<DraggerProps> = (props) => {
  const { onFile, children } = props;
  const [dragOver, setDragOver] = useState(false);
  const classes = classnames("nact-upload-dragger", {
    "is-dragover": dragOver,
  });

  const handleDrag = (e: DragEvent<HTMLDivElement>, over: boolean) => {
    // console.log(over);
    e.preventDefault();
    setDragOver(over);
  };
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    onFile(e.dataTransfer.files);
  }

  return (
    <div
      className={classes}
      onDragOver={(e) => handleDrag(e, true)}
      onDragLeave={(e) => handleDrag(e, false)}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
};

export default Dragger;
