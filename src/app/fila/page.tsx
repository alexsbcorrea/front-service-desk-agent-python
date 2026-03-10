"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

import OneInput from "@/components/OneInput";
import Button from "@/components/Button";
import Header from "@/components/Header";

import { usePageFila } from "./usePageFila";
import { Pointer } from "lucide-react";
import WaitingTime from "@/components/WaitingTime";

export default function Login() {
  const { fila, StartService, currentTime, CancelService } = usePageFila();
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Header></Header>
      </header>
      <h1>Fila de Atendimento</h1>
      <section className={styles.center}>
        
        <div className={styles.form}>
          {fila?.map((item, index) => (
            <WaitingTime
              key={index}
              title={item.user}
              initial_msg={item.initial_msg}
              startDate={item.created_at}
              endDate={currentTime}
              onClick1={() =>
                StartService(
                  item.id,
                  item.id_user,
                  item.profile,
                  item.initial_msg
                )
              }
              onClick2={() => CancelService(item.id)}
              label1="Atender"
              label2="Cancelar"
            ></WaitingTime>
          ))}
        </div>
      </section>
      <footer className={styles.footer}></footer>
    </div>
  );
}
