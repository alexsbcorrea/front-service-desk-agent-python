"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { usePage } from "./usePage";
import Button from "@/components/Button";

import Header from "@/components/Header";

export default function Home() {
  const { conversation, setConversation, GetConversation, currentUser } =
    usePage();
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Header></Header>
      </header>
      <section className={styles.center}>
        <div className={styles.form}></div>
      </section>
      <footer className={styles.footer}></footer>
    </div>
  );
}
