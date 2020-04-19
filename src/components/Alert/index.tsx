import React, { useRef, useState } from "react";
import classnames from "classnames";
import { ReactComponent as CloseIconSvg } from "./close.svg";
import Transition from "../Transition";

type AlertType = "success" | "default" | "danger" | "warning";
export interface AlertProps {
  className?: string;
  title?: string;
  content?: string | React.ReactElement;
  type?: AlertType;
  closable?: boolean;
  closeText?: string | React.ReactElement;
  onClose?: (e: React.MouseEvent) => void;
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
    afterClose,
  } = props;

  const classes = classnames("nact-alert", className, {
    [`nact-alert-${type}`]: type,
  });

  const [show, setShow] = useState(true);

  const rootRef = useRef<HTMLDivElement>(null);

  const handleCloseClick = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    setShow(false);
    // const divEle = rootRef.current;
    // onClose && onClose(e);
    // if (divEle) {
    //   divEle.style.opacity = "0";
    //   setTimeout(() => {
    //     divEle.style.display = "none";
    //     afterClose && afterClose();
    //   }, closeDuration * 1000);
    // }
  };

  return (
    <Transition in={show} timeout={300} animation="zoom-in-top">
      <div
        className={classes}
        ref={rootRef}
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
    </Transition>
  );
};

Alert.defaultProps = {
  type: "default",
  closable: false,
  closeText: <CloseIconSvg />
};

export default Alert;
