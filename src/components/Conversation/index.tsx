"use client";
import React from "react";
import styles from "./style.module.css";
import { CircleUser } from "lucide-react";

export type ConversationProps = {
  user?: string;
  onClick: () => Promise<void>;
};

const Conversation: React.FC<ConversationProps> = ({ user, onClick }) => {
  return (
    <div
      className={styles.container}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <div className={styles.contLabel}>
        <CircleUser size={40} color="#55489b" />
      </div>
      <div className={styles.contInput}>
        <p>{user}</p>
      </div>
    </div>
  );
};

export default Conversation;
