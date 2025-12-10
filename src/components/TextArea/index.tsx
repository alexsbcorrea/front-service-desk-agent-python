"use client";
import React from "react";
import styles from "./style.module.css";

export type TextAreaProps = {
  label?: string;
  clear?: () => void;
};

export type TextAreaNativeProps = React.ComponentProps<"textarea">;

const OneTextArea: React.FC<TextAreaProps & TextAreaNativeProps> = ({
  label,
  ...rest
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.contLabel}>
        <label htmlFor={label}>{label}</label>
      </div>
      <div className={styles.contInput}>
        <textarea {...rest} />
      </div>
    </div>
  );
};

export default OneTextArea;
