"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

import OneInput from "@/components/OneInput";
import Button from "@/components/Button";
import Header from "@/components/Header";

import { usePageLogin } from "./usePageLogin";
import { Pointer } from "lucide-react";

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
  } = usePageLogin();
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Header></Header>
      </header>
      <section className={styles.center}>
        <div className={styles.form}>
          <OneInput
            label="ID"
            placeholder=""
            value={id}
            onChange={(e) => setId(e.target.value)}
          ></OneInput>
          <OneInput
            label="Nome"
            placeholder=""
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></OneInput>
          <OneInput
            label="E-mail"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></OneInput>
          <OneInput
            label="Perfil"
            placeholder=""
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
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
