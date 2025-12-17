"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

import OneInput from "@/components/OneInput";
import Button from "@/components/Button";
import Header from "@/components/Header";
import OneTextArea from "@/components/TextArea";
import CardSolution from "@/components/CardSolution";

import { usePageSolutions } from "./usePageSolutions";
import { Pointer } from "lucide-react";

export default function Login() {
  const { initialMsg, setInitialMsg, StartService } = usePageSolutions();
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Header></Header>
      </header>
      <section className={styles.center}>
        <div className={styles.form}>
          <CardSolution title="Solictação de Toner"></CardSolution>
          <CardSolution title="Solictação de Etiquetas/Ribons"></CardSolution>
          <CardSolution title="Overmind"></CardSolution>
          <CardSolution title="Fin-X"></CardSolution>
          <OneTextArea
            value={initialMsg}
            rows={5}
            cols={150}
            onChange={(e) => setInitialMsg(e.target.value)}
          ></OneTextArea>
          <Button
            label="Entrar no Chat"
            onClick={StartService}
            style={{ cursor: "pointer" }}
          ></Button>
        </div>
      </section>
      <footer className={styles.footer}></footer>
    </div>
  );
}
