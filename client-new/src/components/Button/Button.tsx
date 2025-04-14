import { PropsWithChildren } from "react";
import clsx from "clsx";
import styles from "./Button.module.css";

type ButtonProps = {
  onClick?: () => void;
  variant?: "primary" | "secondary" | "tertiary" | "danger";
  size?: "default" | "fullWidth";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

function Button({
  onClick,
  variant = "secondary",
  size,
  type,
  disabled,
  className,
  children,
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={clsx(styles.button, className, {
        [styles.primary]: variant === "primary",
        [styles.secondary]: variant === "secondary",
        [styles.tertiary]: variant === "tertiary",
        [styles.danger]: variant === "danger",
        [styles.fullWidth]: size === "fullWidth",
      })}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
