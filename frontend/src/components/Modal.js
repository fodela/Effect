import React from "react";
import { createPortal } from "react-dom";

const Modal = ({ children, modalId, open, onClose, dark }) => {
  if (!open) return null;
  return createPortal(
    <>
      <div
        className={`fixed top-0 bottom-0 left-0 right-0 z-40 ${
          dark && "bg-black"
        } opacity-50`}
        onClick={onClose}
      ></div>
      {children}
    </>,
    document.getElementById(`${modalId}`)
  );
};

export default Modal;
