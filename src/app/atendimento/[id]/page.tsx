"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

import OneInput from "@/components/OneInput";
import Button from "@/components/Button";
import Header from "@/components/Header";
import Slider from "@/components/Slider";
import Loader01 from "@/components/Loader01";

import { usePageAtendimento } from "./usePageAtendimento";
import { Pointer, MessageSquareLock } from "lucide-react";
import WaitingTime from "@/components/WaitingTime";

export default function Login() {
  const { fila, CancelService, currentTime, preservice } = usePageAtendimento();
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Header></Header>
      </header>
      <section className={styles.center}>
        <div className={styles.form}>
          <Slider></Slider>

          {preservice?.initial_msg && <p>Em breve você será atendido...</p>}
          {!preservice?.initial_msg && (
            <p>Este atendimento já foi finalizado/cancelado...</p>
          )}

          <Button label="Cancelar Atendimento" onClick={CancelService}></Button>
          {/* {fila?.map((item, index) => (
            <WaitingTime
              key={index}
              title={item.user}
              initial_msg={item.initial_msg}
              startDate={item.created_at}
              endDate={currentTime}
              onClick={() =>
                StartService(
                  item.id,
                  item.id_user,
                  item.profile,
                  item.initial_msg
                )
              }
            ></WaitingTime>
          ))} */}
        </div>
      </section>
      <footer className={styles.footer}></footer>
    </div>
  );
}
