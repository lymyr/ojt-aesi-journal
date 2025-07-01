// ModalView.jsx
import s from "./ModalView.module.css";
import Button from "./Button";

const ModalView = ({ text, onOk, onCancel }) => {
  return (
    <dialog className={s.modal} open>
      <p>{text}</p>
      <div className={s.buttonGroup}>
        <Button text="Cancel" onClick={onCancel} />
        <Button text="OK" onClick={onOk} />
      </div>
    </dialog>
  );
};

export default ModalView;
