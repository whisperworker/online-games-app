import React from "react";
import { clsx } from "clsx";
import styles from "./UiButton.module.css";

type Props = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

const UiButton: React.FC<Props> = ({ className, children, onClick }) => {
  return (
    <button
      className={clsx(styles.UiButton, className ?? "")}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default UiButton;
