import { Button } from "../Button/Button";
import clsx from "clsx";
import styles from "./Modal.module.css";

type ModalProps = {
  itemType: "track" | "playlist";
  itemName: string;
  onConfirm: () => void;
  onCancel: () => void;
  isShown: boolean;
};

function Modal({
  itemType,
  itemName,
  onConfirm,
  onCancel,
  isShown,
}: ModalProps) {
  return (
    <div
      className={clsx(styles.overlay, { [styles.visible]: isShown })}
      data-testid="delete-modal"
    >
      <div className={clsx(styles.modal, { [styles.shown]: isShown })}>
        <h3>Delete {itemType}</h3>
        <p>Are you sure you want to delete &quot;{itemName}&quot;?</p>
        <div className={styles.buttons}>
          <Button className={styles.button} onClick={onCancel}>
            Cancel
          </Button>
          <Button
            className={styles.button}
            onClick={onConfirm}
            variant="danger"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
