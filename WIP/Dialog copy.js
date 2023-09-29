import React, { useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import style from "../assets/styles/Dialog.module.scss";

const Dialog = ({ children, icon, title, onClose, onOk }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dialogRef = useRef();
  const showDialog = searchParams.get("showDialog");

  useEffect(() => {
    // console.log(" pppppp ", showDialog);
    if (showDialog !== null) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [showDialog]);

  const closeDialog = () => {
    searchParams.delete("showDialog");
    setSearchParams(searchParams);
    dialogRef.current?.close();
    onClose();
  };

  const clickOk = () => {
    onOk(showDialog);
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
          style={{ display: "flex", justifyContent: "flex-end", gap: ".5rem" }}
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
