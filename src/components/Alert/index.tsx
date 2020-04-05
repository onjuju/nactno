import React, { useRef } from "react";
import classnames from "classnames";
import { ReactComponent as CloseIconSvg } from "./close.svg";

type AlertType = "success" | "default" | "danger" | "warning";
export interface AlertProps {
  className?: string;
  title?: string;
  content?: string | React.ReactElement;
  type?: AlertType;
  closable?: boolean;
  closeText?: string | React.ReactElement;
  onClose?: (e: React.MouseEvent) => void;
  closeDuration?: number;
  afterClose?: () => void;
}

const Alert: React.FC<AlertProps> = (props) => {
  const {
    className,
    title,
    content,
    type,
    closable,
    closeText,
    onClose,
    closeDuration = 0.4,
    afterClose,
  } = props;

  const classes = classnames("nact-alert", className, {
    [`nact-alert-${type}`]: type,
  });

  const rootRef = useRef<HTMLDivElement>(null);

  const handleCloseClick = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    const divEle = rootRef.current;
    onClose && onClose(e);
    if (divEle) {
      divEle.style.opacity = "0";
      setTimeout(() => {
        divEle.style.display = "none";
        afterClose && afterClose();
      }, closeDuration * 1000);
    }
  };

  return (
    <div
      className={classes}
      ref={rootRef}
      style={{ transition: `opacity ${closeDuration}s` }}
      data-testid="alert-wrapper"
    >
      {closable && (
        <span className="nact-alert-close-icon" onClick={handleCloseClick}>
          {closeText}
        </span>
      )}

      {title && <div className="nact-alert-title">{title}</div>}
      <div className="nact-alert-content">{content}</div>
    </div>
  );
};

Alert.defaultProps = {
  type: "default",
  closable: false,
  closeText: <CloseIconSvg />,
  closeDuration: 0.4,
};

export default Alert;
