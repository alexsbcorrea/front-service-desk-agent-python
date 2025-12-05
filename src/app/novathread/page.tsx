"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

import OneInput from "@/components/OneInput";
import Button from "@/components/Button";

import { usePageNovaThread } from "./usePageNovaThread";
import { Pointer } from "lucide-react";

export default function NovaThread() {
  const { incident, setIncident, CreateThread } = usePageNovaThread();
  return (
    <div className={styles.page}>
      <header className={styles.header}>HEADER</header>
      <section className={styles.center}>
        <div className={styles.form}>
          <h1>{incident}</h1>
          <OneInput
            label="Nome"
            placeholder="Número do Incidente"
            value={incident}
            onChange={(e) => setIncident(e.target.value)}
          ></OneInput>

          <Button
            label="Enviar"
            onClick={CreateThread}
            style={{ cursor: "pointer" }}
          ></Button>
        </div>
      </section>
      <footer className={styles.footer}></footer>
    </div>
  );
}
