"use client";
import { Activity, SendHorizontal } from "lucide-react";
import styles from "./style.module.css";

type ButtonProps = {
  label?: string;
  variant?: "v1" | "v2" | "v3" | "v4" | "v5" | "v6";
};

type ButtonPropsNative = React.ComponentProps<"button">;

const ButtonRound: React.FC<ButtonProps & ButtonPropsNative> = ({
  label,
  variant,
  ...rest
}) => {
  return (
    <div className={styles.container}>
      <button {...rest} className={`${variant ? styles[variant] : styles.v1}`}>
        <div className={styles.label}>
          <SendHorizontal />
        </div>
      </button>
    </div>
  );
};

export default ButtonRound;
