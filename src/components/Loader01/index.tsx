"use client";
import { Activity } from "lucide-react";
import styles from "./style.module.css";

type LoaderProps = {
  label?: string;
  variant?: "v1" | "v2" | "v3" | "v4" | "v5" | "v6";
};

type ButtonPropsNative = React.ComponentProps<"button">;

const Loader01: React.FC<LoaderProps> = ({ label, variant, ...rest }) => {
  return (
    <div className={styles.container}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default Loader01;
