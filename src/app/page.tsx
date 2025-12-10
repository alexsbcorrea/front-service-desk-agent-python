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

        {conversation?.map((item, index) => (
          <div key={index}>
            <p style={{ color: "black" }}>{item.name}</p>
            <p style={{ color: "red" }}>{item.content}</p>
          </div>
        ))}

        <Button label="Buscar" onClick={GetConversation}></Button>
      </main>
    </div>
  );
}
