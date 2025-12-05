"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { usePage } from "./usePage";
import Button from "@/components/Button";

export default function Home() {
  const { conversation, setConversation, GetConversation, currentUser } =
    usePage();
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Conversa</h1>

        {currentUser == "8e9de819c7134c9096f73620474df7c0" &&
          conversation?.map((item, index) => (
            <p style={{ color: "red" }} key={index}>
              {item.content}
            </p>
          ))}

        <Button label="Buscar" onClick={GetConversation}></Button>
      </main>
    </div>
  );
}
