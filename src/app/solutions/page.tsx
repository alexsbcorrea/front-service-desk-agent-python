"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

import OneInput from "@/components/OneInput";
import Button from "@/components/Button";
import Header from "@/components/Header";

import { usePageSolutions } from "./usePageSolutions";
import { Pointer } from "lucide-react";

export default function Login() {
  const { StartService } = usePageSolutions();
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Header></Header>
      </header>
      <section className={styles.center}>
        <div className={styles.form}>
          <h1>Solução Comuns</h1>
          <h3>Solictação de Toner</h3>
          <h3>Solictação de Etiquetas/Ribons</h3>
          <h3>Erro de Integração</h3>
          <h3>Overmind</h3>
          <h3>Fin-X</h3>
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
