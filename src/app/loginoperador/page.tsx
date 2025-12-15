"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { User } from "lucide-react";

import OneInput from "@/components/OneInput";
import Button from "@/components/Button";
import Header from "@/components/Header";

import { usePageLoginOperador } from "./usePageLoginOperador";
import { Pointer } from "lucide-react";
import IconCenter from "@/components/IconCenter";

export default function Login() {
  const {
    id,
    setId,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    profile,
    setProfile,
    Login,
  } = usePageLoginOperador();
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Header></Header>
      </header>
      <section className={styles.center}>
        <div className={styles.form}>
          <IconCenter icon={<User size={100} color="#55489b" />} />
          <OneInput
            label="E-mail"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></OneInput>

          <Button
            label="Entrar"
            onClick={Login}
            style={{ cursor: "pointer" }}
          ></Button>
        </div>
      </section>
      <footer className={styles.footer}></footer>
    </div>
  );
}
