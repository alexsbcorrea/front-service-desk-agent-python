"use client";
import React from "react";
import styles from "./style.module.css";

export interface IconCenterProps {
  icon?: React.ReactNode;
  type?: "normal" | "success" | "error" | "warning";
}

export default function IconCenter(props: IconCenterProps) {
  return (
    <div className={styles.container}>
      <div className={`${props.type ? styles[props.type] : styles.normal}`}>
        {props.icon}
      </div>
    </div>
  );
}
