import clsx from "clsx";
import { PropsWithChildren, useCallback, useEffect } from "react";
import styles from "./Modal.module.css";

type ModalProps = {
  isShown: boolean;
  onCancel: () => void;
  variant?: "danger" | "playlist-selector";
};

export const Modal = ({
  isShown,
  onCancel,
  variant,
  children,
}: PropsWithChildren<ModalProps>) => {
  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCancel();
      }
    },
    [onCancel],
  );

  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyUp]);

  return (
    <div className={styles.wrapper}>
      <div
        className={clsx(styles.overlay, { [styles.visible]: isShown })}
        onClick={onCancel}
      ></div>
      <div
        className={clsx(styles.modal, {
          [styles.shown]: isShown,
          [styles.danger]: variant === "danger",
          [styles.selector]: variant === "playlist-selector",
        })}
      >
        {children}
      </div>
    </div>
  );
};
