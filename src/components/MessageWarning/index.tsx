"use client";
import React, { useState, Dispatch, SetStateAction } from "react";
import styles from "./style.module.css";
import { Check, X, TriangleAlert } from "lucide-react";

import Separator from "@/components/Separator";
import Button from "@/components/Button";
import IconCenter from "@/components/IconCenter";

interface MessageWarningProps {
  message?: string;
  closeModal: () => void;
}

export default function MessageWarning(props: MessageWarningProps) {
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.close} onClick={async () => props.closeModal()}>
          <X />
        </div>
        <Separator />
        <Separator />
        <IconCenter
          icon={<TriangleAlert size={50} color="#fff" />}
          type="warning"
        />

        <Separator />
        <Separator />
        <Separator />
        <p>{props.message}</p>
        <Separator />
        <Separator />

        <div className={styles.buttons}>
          {/* <Button
            label="OK"
            variant="v6"
            onClick={async () => props.closeModal()}
          /> */}
        </div>
      </div>
    </div>
  );
}
