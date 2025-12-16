"use client";
import React from "react";
import styles from "./style.module.css";
import { CircleUser } from "lucide-react";

export type ConversationProps = {
  name?: string;
  content?: string;
  onClick?: () => Promise<void>;
};

const MessageItemLeft: React.FC<ConversationProps> = ({
  name,
  content,
  onClick,
}) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.contUser}>
        <p>{name}</p>
      </div>
      <div className={styles.contMessage}>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default MessageItemLeft;
