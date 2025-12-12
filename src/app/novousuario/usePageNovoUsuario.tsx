import React, { useState } from "react";
import { api } from "@/services/api";

import { useFlashMessage } from "../../utils/useFlashMessage/useFlashMessage";

export function usePageNovoUsuario() {
  const { setFlashMessage } = useFlashMessage();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  async function CreateUser() {
    try {
      const response = await api.post(
        "/users",
        { name, email },
        {
          headers: {
            Authorization: `Bearer Aex`,
          },
        }
      );
      setFlashMessage(
        "success",
        `O usuário ${name} foi criado com sucesso.`,
        5000
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function Teste() {
    console.log("CHAMOOOOOOU");
    setFlashMessage("success", `O usuário XXXXX foi criado com sucesso.`, 5000);
  }

  return { name, setName, email, setEmail, CreateUser, Teste };
}
