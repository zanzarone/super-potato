import React, { useRef, useEffect } from "react";
import style from "../assets/styles/Dialog.module.scss";

const Dialog = ({ children, visible, icon, title, onClose, onOk }) => {
  const dialogRef = useRef();

  useEffect(() => {
    // console.log(" pppppp ", showDialog);
    if (visible === true) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [visible]);

  const closeDialog = () => {
    dialogRef.current?.close();
    onClose();
  };

  const clickOk = () => {
    onOk();
    closeDialog();
  };

  return (
    <dialog ref={dialogRef} className={style.modalContainer}>
      <div className={style.modal}>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: ".3rem",
          }}
        >
          {icon}
          <span style={{ fontSize: 14, fontWeight: "bold" }}>{title}</span>
        </span>
        <span style={{ fontSize: 13, fontWeight: "medium" }}>{children}</span>
        <span
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: ".5rem",
            marginTop: ".5rem",
          }}
        >
          <button onClick={clickOk}>Ok</button>
          <button onClick={closeDialog} className="danger">
            Cancel
          </button>
        </span>
      </div>
    </dialog>
  );
};

export default Dialog;
