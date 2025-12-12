"use client";
import React, { useState, Dispatch, SetStateAction } from "react";
import styles from "./style.module.css";
import { Library, X } from "lucide-react";

import Header from "@/components/Header";
import OneInput from "@/components/OneInput";
import TitleSection from "@/components/TitleSection";
import Separator from "@/components/Separator";
import Button from "@/components/Button";
import IconCenter from "@/components/IconCenter";
import TitleSectionCenter from "@/components/TitleSectionCenter";
import Loading from "@/components/Loading";
import OneSelect from "../OneSelect";
import ErrorLine from "../ErrorLine";

interface ModalProps {
  labelField01?: string;
  field01?: string;
  setField01: Dispatch<SetStateAction<string>>;
  labelField02?: string;
  field02?: string;
  setField02: Dispatch<SetStateAction<string>>;
  loading?: boolean;
  Submit?: () => Promise<void>;
  closeModal: () => void;
  titleModal?: string;
  labelButton?: string;
  errorMessage?: string;
}

export default function Modal(props: ModalProps) {
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.close} onClick={async () => props.closeModal()}>
          <X />
        </div>
        <Separator />
        <Separator />
        <IconCenter icon={<Library size={100} color="#55489b" />} />
        <TitleSectionCenter title={props.titleModal} align="center" />
        <Separator />
        <Separator />
        <Separator />
        <OneInput
          type="text"
          name="name"
          label={props.labelField01}
          placeholder=""
          value={props.field01}
          onChange={(e) => props.setField01(e.target.value)}
        ></OneInput>
        <Separator />
        <OneInput
          type="text"
          name="description"
          label={props.labelField02}
          placeholder=""
          value={props.field02}
          onChange={(e) => props.setField02(e.target.value)}
        ></OneInput>
        <Separator />
        <Separator />
        {props.loading && <Loading />}
        <Separator />
        <Separator />
        {props.errorMessage && <ErrorLine message={props.errorMessage} />}
        <Separator />
        <div className={styles.buttons}>
          <Button
            label={props.labelButton}
            variant="v1"
            onClick={props.Submit}
          />
          <Button
            label="Cancelar"
            variant="v2"
            onClick={async () => props.closeModal()}
          />
        </div>
        <Separator />
        <Separator />
      </div>
    </div>
  );
}
