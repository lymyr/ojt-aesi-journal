import s from "./ModalView.module.css";
import Button from "./Button";

function ModalView () {
  return (
    <dialog className={s.modal}>
      <p>are you sure you want to delete this journal entry?</p>
      <div>
        <Button text="Cancel" />
        <Button text="OK" />
      </div>
    </dialog>
  );
};

export default ModalView;
