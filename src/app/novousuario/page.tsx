"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

import OneInput from "@/components/OneInput";
import Button from "@/components/Button";
import Header from "@/components/Header";
import IconCenter from "@/components/IconCenter";

import { usePageNovoUsuario } from "./usePageNovoUsuario";
import { Pointer, User } from "lucide-react";

export default function NovoUsuario() {
  const { name, email, setName, setEmail, CreateUser } = usePageNovoUsuario();
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Header></Header>
      </header>
      <section className={styles.center}>
        <div className={styles.form}>
          <IconCenter icon={<User size={100} color="#55489b" />} />
          <OneInput
            label="Nome"
            placeholder="João Silva"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></OneInput>
          <OneInput
            label="E-mail"
            placeholder="joao.silva@teste.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></OneInput>
          <Button
            label="Criar Conta"
            onClick={CreateUser}
            style={{ cursor: "pointer" }}
          ></Button>
        </div>
      </section>
      <footer className={styles.footer}></footer>
    </div>
  );
}
