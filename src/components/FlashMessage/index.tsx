"use client";
import { useState, useEffect } from "react";
import styles from "./style.module.css";
import { X, Library } from "lucide-react";

import bus from "../../utils/useFlashMessage/bus";

import MessageSucess from "../MessageSuccess";
import MessageError from "../MessageError";
import MessageWarning from "../MessageWarning";

export default function FlashMessage() {
  const [visibility, setVisibility] = useState(false);
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [time, setTime] = useState();

  useEffect(() => {
    console.log("Evento captado com sucesso.");
    bus.addListener("flash", ({ type, message, time }) => {
      console.log("Flash Message");
      setVisibility(true);
      setType(type);
      setMessage(message);
      setTime(time);

      setTimeout(() => {
        setVisibility(false);
      }, time);
    });
  }, []);

  return (
    <>
      {visibility && type == "success" && (
        <MessageSucess
          message={message}
          closeModal={() => setVisibility(false)}
        />
      )}
      {visibility && type == "error" && (
        <MessageError
          message={message}
          closeModal={() => setVisibility(false)}
        />
      )}
      {visibility && type == "warning" && (
        <MessageWarning
          message={message}
          closeModal={() => setVisibility(false)}
        />
      )}
    </>
  );
}
