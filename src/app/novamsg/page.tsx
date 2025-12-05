"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

import OneInput from "@/components/OneInput";
import Button from "@/components/Button";

import { usePageNovaMSG } from "./usePageNovaMSG";
import { Pointer } from "lucide-react";

export default function NovaMSG() {
  const {
    content,
    setContent,
    idUser,
    setIdUser,
    idThead,
    setIdThread,
    CreateMessage,
  } = usePageNovaMSG();
  return (
    <div className={styles.page}>
      <header className={styles.header}>HEADER</header>
      <section className={styles.center}>
        <div className={styles.form}>
          <OneInput
            label="Digite a sua mensagem"
            placeholder="Olá, gostaria de saber mais sobre..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></OneInput>
          <OneInput
            label="ID do Usuário"
            value={idUser}
            onChange={(e) => setIdUser(e.target.value)}
          ></OneInput>
          <OneInput
            label="ID do Conversa"
            value={idThead}
            onChange={(e) => setIdThread(e.target.value)}
          ></OneInput>
          <Button
            label="Enviar"
            onClick={CreateMessage}
            style={{ cursor: "pointer" }}
          ></Button>
        </div>
      </section>
      <footer className={styles.footer}></footer>
    </div>
  );
}
