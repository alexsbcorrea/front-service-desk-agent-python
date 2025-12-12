"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./style.module.css";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import Link from "next/link";

import { useAuth } from "../../contexts/UserContext";

import {
  House,
  Search,
  LogIn,
  LogOut,
  UserPlus,
  LibraryBig,
  BookCheck,
  UsersRound,
  ShieldCheck,
  Handshake,
  FilePlus2,
} from "lucide-react";

interface HeaderProps {
  store?: string;
  open?: boolean;
  minOrder?: string;
}

export default function Header(props: HeaderProps) {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState<string>("closed");

  const { userInfo, authenticated, logoutUser } = useAuth();
  function Menu() {
    if (openMenu == "open") {
      setOpenMenu("closed");
    } else {
      setOpenMenu("open");
    }
  }
  function changeStatusMenu() {
    if (openMenu == "open") {
      setOpenMenu("closed");
    } else {
      setOpenMenu("open");
    }
  }
  function Logout() {
    if (window) {
      window.localStorage.removeItem("authTokenKB");
      window.localStorage.removeItem("userInfo");
    }
    deleteCookie("authTokenKB");
    deleteCookie("authUser");
    deleteCookie("idUser");
    logoutUser();
    router.push("/");
  }
  return (
    <>
      <header className={styles.container}>
        <div className={styles.subcontainer}>
          <Link href="/">
            <div className={styles.logo}>
              <Image
                className={styles.img}
                src={require("../../../public/logo.png")}
                alt="Logo BP"
              />
            </div>
          </Link>

          <div className={styles.info}></div>
        </div>

        <ul
          className={`${styles.menu} ${styles[openMenu]}`}
          onClick={changeStatusMenu}
        >
          {" "}
          {authenticated && (
            <>
              <li>
                <div className={styles.icon}>
                  <House size={20} />
                </div>
                <Link className={styles.link} href="/">
                  Página Inicial
                </Link>
              </li>
              <li>
                <div className={styles.icon}>
                  <Search size={20} />
                </div>
                <Link className={styles.link} href="/search">
                  Pesquisa
                </Link>
              </li>
            </>
          )}
          {!authenticated && (
            <>
              <li>
                <div className={styles.icon}>
                  <LogIn size={20} />
                </div>
                <Link className={styles.link} href="/login">
                  Entrar
                </Link>
              </li>
              <li>
                <div className={styles.icon}>
                  <LogIn size={20} />
                </div>
                <Link className={styles.link} href="/novousuario">
                  Cadastre-se
                </Link>
              </li>
            </>
          )}
          {authenticated && (
            <li onClick={Logout}>
              <div className={styles.icon}>
                <LogOut size={20} />
              </div>
              <Link className={styles.link} href="#">
                Sair
              </Link>
            </li>
          )}
        </ul>
        <div className={styles.hamburguer} onClick={Menu}>
          <div
            className={`${styles.line1} ${
              openMenu == "open" ? styles.openR1 : styles.closedR1
            }`}
          ></div>
          <div
            className={`${styles.line2} ${
              openMenu == "open" ? styles.openR2 : styles.closedR2
            }`}
          ></div>
          <div
            className={`${styles.line3} ${
              openMenu == "open" ? styles.openR3 : styles.closedR3
            }`}
          ></div>
        </div>
        {authenticated && (
          <div className={styles.identification}>
            <p className={styles.name}>Olá {userInfo?.name}</p>
            <p className={styles.email}>Perfil: {userInfo?.profile}</p>
          </div>
        )}
      </header>
    </>
  );
}
