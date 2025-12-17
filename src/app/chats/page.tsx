"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

import OneInput from "@/components/OneInput";
import Button from "@/components/Button";
import Header from "@/components/Header";
import OneTextArea from "@/components/TextArea";
import Conversation from "@/components/Conversation";

import { usePageChats } from "./usePageChats";
import { Pointer } from "lucide-react";
import MessageItemLeft from "@/components/MessageItemLeft";
import MessageItemRight from "@/components/MessageItemRight";

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
    CreateMessageSocket,
  } = usePageChats();
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Header></Header>
      </header>
      <section className={styles.center}>
        <div className={styles.panel}>
          {threads.map((item, index) => (
            <Conversation
              key={index}
              user={item.user}
              onClick={() => GetConversation(item.id)}
            ></Conversation>
          ))}
        </div>
        <div className={styles.conversation}>
          <div className={styles.chat}>
            {conversation?.map((item, index) =>
              item.profile === "user" ? (
                <MessageItemRight
                  key={index}
                  name={item.name}
                  content={item.content}
                ></MessageItemRight>
              ) : (
                <MessageItemLeft
                  key={index}
                  name={item.name}
                  content={item.content}
                ></MessageItemLeft>
              )
            )}
          </div>
          <div className={styles.message}>
            <OneTextArea
              value={content}
              rows={6}
              onChange={(e) => setContent(e.target.value)}
            ></OneTextArea>
            <Button label="Enviar" onClick={CreateMessageSocket}></Button>
          </div>
        </div>
      </section>
      <footer className={styles.footer}></footer>
    </div>
  );
}
