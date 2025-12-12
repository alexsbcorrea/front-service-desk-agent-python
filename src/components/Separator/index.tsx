"use client";
import React from "react";
import styles from "./style.module.css";

export interface SeparatorProps {
  height?:
    | "rem1"
    | "rem12"
    | "rem13"
    | "rem14"
    | "rem15"
    | "rem16"
    | "rem17"
    | "rem18"
    | "rem19"
    | "rem2";
}

export default function Separator(props: SeparatorProps) {
  return (
    <div
      className={`${styles.container} ${
        styles[!props.height ? "1rem" : props.height]
      }`}
    ></div>
  );
}
