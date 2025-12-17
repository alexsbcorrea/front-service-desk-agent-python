"use client";
import React from "react";
import styles from "./style.module.css";
import { CircleUser, LibraryBig } from "lucide-react";

export type CardSolutionProps = {
  title?: string;
  onClick?: () => Promise<void>;
};

const CardSolution: React.FC<CardSolutionProps> = ({ title, onClick }) => {
  return (
    <div
      className={styles.container}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <div className={styles.contLabel}>
        <LibraryBig size={40} color="#55489b" />
      </div>
      <div className={styles.contInput}>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default CardSolution;
