"use client";
import React from "react";
import styles from "./style.module.css";
import { CircleUser, LibraryBig, MessageCircleMore } from "lucide-react";

export type CardSolutionProps = {
  title?: string;
  initial_msg?: string;
  startDate?: string;
  endDate?: string;
  onClick1?: () => Promise<void>;
  onClick2?: () => Promise<void>;
  label1?: string;
  label2?: string;
};

import { useCalcDate } from "../../utils/useCalcDate";
import Button from "../Button";

const WaitingTime: React.FC<CardSolutionProps> = ({
  title,
  initial_msg,
  startDate,
  endDate,
  onClick1,
  onClick2,
  label1,
  label2,
}) => {
  const {
    differenceInYears,
    differenceInMonths,
    differenceInWeeks,
    differenceInDays,
    differenceInHours,
    differenceInMinutes,
    differenceInSeconds,
  } = useCalcDate();

  const formatted = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // formato 24h
    timeZone: "America/Sao_Paulo", // opcional, garante fuso
  });

  return (
    <div className={styles.container} style={{ cursor: "pointer" }}>
      <div className={styles.contLabel}>
        <MessageCircleMore size={40} color="#55489b" />
      </div>
      <div className={styles.contInput}>
        <p>{title}</p>
        <br />
        <p>{initial_msg}</p>
        <br />
        {
          <p
            className={styles.text}
          >{`Aguardando atendimento há ${"X"} minuto(s)`}</p>
        }
      </div>
      <div className={styles.contInput}>
        <div className={styles.button}>
          <Button label={label1} onClick={onClick1}></Button>
          <Button label={label2} onClick={onClick2}></Button>
        </div>
      </div>
    </div>
  );
};

export default WaitingTime;
