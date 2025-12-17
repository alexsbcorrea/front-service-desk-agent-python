"use client";
import React from "react";
import styles from "./style.module.css";
import { CircleUser } from "lucide-react";
import Link from "next/link";

export type ConversationProps = {
  user?: string;
  link?: string;
  onClick?: () => Promise<void>;
};

const Conversation: React.FC<ConversationProps> = ({ user, link, onClick }) => {
  return (
    <Link
      href={link ? link : "#"}
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
    </Link>
  );
};

export default Conversation;
