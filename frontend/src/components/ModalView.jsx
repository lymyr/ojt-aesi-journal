import { useEffect, useRef } from "react";
import s from "./ModalView.module.css";
import Button from "./Button";

function ModalView({ text, open, onCancel, onConfirm, setclickedEdit }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (open && dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    } else if (!open && dialogRef.current?.open) {
      dialogRef.current.close();
    }
  }, [open]);

  return (
    <dialog ref={dialogRef} className={s.modal}>
      <p>{text}</p>
      <div className={s.buttonGroup}>
        <Button text="Cancel" onClick={onCancel} />
        <Button text="OK" onClick={() => {onConfirm(); setclickedEdit(false)}} />
      </div>
    </dialog>
  );
}

export default ModalView;
