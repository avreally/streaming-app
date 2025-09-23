import { Button } from "../Button/Button";
import styles from "./DeleteConfirmation.module.css";

type DeleteConfirmationProps = {
  itemType: "track" | "playlist";
  itemName: string;
  onConfirm?: () => void | undefined;
  onCancel: () => void;
};

function DeleteConfirmation({
  itemType,
  itemName,
  onConfirm,
  onCancel,
}: DeleteConfirmationProps) {
  return (
    <>
      <h3 className={styles.title}>Delete {itemType}</h3>
      <p className={styles.text}>
        Are you sure you want to delete &quot;{itemName}&quot;?
      </p>
      <div className={styles.buttons}>
        <Button className={styles.button} onClick={onCancel}>
          Cancel
        </Button>
        <Button className={styles.button} onClick={onConfirm} variant="danger">
          Delete
        </Button>
      </div>
    </>
  );
}

export default DeleteConfirmation;
