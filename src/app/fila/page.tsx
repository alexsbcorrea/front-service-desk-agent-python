"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

import OneInput from "@/components/OneInput";
import Button from "@/components/Button";
import Header from "@/components/Header";

import { usePageFila } from "./usePageFila";
import { Pointer } from "lucide-react";

export default function Login() {
  const { fila, StartService } = usePageFila();
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Header></Header>
      </header>
      <section className={styles.center}>
        <div className={styles.form}>
          {fila?.map((item, index) => (
            <div key={index}>
              <p>ID: {item.id}</p>
              <p>ID Usuário: {item.id_user}</p>
              <p>Nome: {item.user}</p>
              <Button
                label="Atender"
                onClick={() => StartService(item.id, item.id_user)}
              ></Button>
            </div>
          ))}
        </div>
      </section>
      <footer className={styles.footer}></footer>
    </div>
  );
}
