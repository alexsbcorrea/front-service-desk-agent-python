"use client";
import React from "react";
import styles from "./style.module.css";

export type OneInputProps = {
  label?: string;
  clear?: () => void;
};

export type OneInputNativeProps = React.ComponentProps<"input">;

const OneInput: React.FC<OneInputProps & OneInputNativeProps> = ({
  label,
  ...rest
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.contLabel}>
        <label htmlFor={label}>{label}</label>
      </div>
      <div className={styles.contInput}>
        <input {...rest} />
      </div>
    </div>
  );
};

export default OneInput;
