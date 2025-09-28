import { PropsWithChildren } from "react";
import clsx from "clsx";
import styles from "./Button.module.css";

type ButtonProps = {
  onClick?: () => void;
  variant?: "primary" | "secondary" | "tertiary" | "danger";
  size?: "default" | "fullWidth" | "small";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export const Button = ({
  onClick,
  variant = "secondary",
  size,
  type,
  disabled,
  className,
  children,
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      className={clsx(styles.button, className, {
        [styles.primary]: variant === "primary",
        [styles.secondary]: variant === "secondary",
        [styles.tertiary]: variant === "tertiary",
        [styles.danger]: variant === "danger",
        [styles.fullWidth]: size === "fullWidth",
        [styles.small]: size === "small",
      })}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
