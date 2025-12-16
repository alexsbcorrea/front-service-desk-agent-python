"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

import OneInput from "@/components/OneInput";
import Button from "@/components/Button";
import Header from "@/components/Header";
import OneTextArea from "@/components/TextArea";

import { usePageChats } from "./usePageChats";
import { Pointer } from "lucide-react";

export default function Chats() {
  const {
    threads,
    setThreads,
    conversation,
    content,
    setContent,
    idUser,
    setIdUser,
    profile,
    setProfile,
    idThead,
    setIdThread,
    setConversation,
    GetThreads,
    GetConversation,
    CreateMessage,
  } = usePageChats();
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Header></Header>
      </header>
      <section className={styles.center}>
        <div className={styles.panel}>
          {threads.map((item, index) => (
            <div key={index}>
              <p>{item.user}</p>
              <p>{item.operator}</p>
              <Button onClick={() => GetConversation(item.id)}></Button>
            </div>
          ))}
        </div>
        <div className={styles.form}>
          <div className={styles.conversation}>
            {conversation?.map((item, index) => (
              <div key={index}>
                <p style={{ color: "black" }}>{item.name}</p>
                <p style={{ color: "red" }}>{item.content}</p>
              </div>
            ))}
          </div>
          <div className={styles.message}>
            <OneTextArea
              value={content}
              rows={5}
              cols={150}
              onChange={(e) => setContent(e.target.value)}
            ></OneTextArea>
            <Button label="Enviar" onClick={CreateMessage}></Button>
          </div>
        </div>
      </section>
      <footer className={styles.footer}></footer>
    </div>
  );
}
